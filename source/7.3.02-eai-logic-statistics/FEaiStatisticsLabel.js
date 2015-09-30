//==========================================================
// <T>界面标签控件。</T>
//
// @class
// @author maocy
// @version 150623
//==========================================================
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o) {
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   //..........................................................
   // @attribute
   o._value = MO.Class.register(o, new MO.AGetter('_value'), '0');
   o._basicUnitText = MO.Class.register(o, new MO.AGetSet('_basicUnitText'), '元');
   o._originValue = '0';
   o._valueSign = 1;
   o._originValueSign = 1;
   o._increasing = false;
   // @attribute
   o._startTick = 0;
   o._rolling = MO.Class.register(o, new MO.AGetSet('_rolling'), false);
   o._rollingDuration = MO.Class.register(o, new MO.AGetSet('_rollingDuration'), 1000);
   o._rollingPages = null;
   o._noRolling = MO.Class.register(o, new MO.AGetSet('_noRolling'), false);
   //..........................................................
   // @method
   o.onPaintLabel = MO.FEaiStatisticsLabel_onPaintLabel;
   //..........................................................
   // @process
   o.oeUpdate = MO.FEaiStatisticsLabel_oeUpdate;
   //..........................................................
   // @method
   o.construct = MO.FEaiStatisticsLabel_construct;
   // @method
   o.setValue = MO.FEaiStatisticsLabel_setValue;
   // @method
   o.dispose = MO.FEaiStatisticsLabel_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //设置剪裁范围
   graphic.clip(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   // 设置字体
   var textFont = o._foreFont;
   var unitFont = o._backFont;
   
   var baseX;
   if (o._alignCd != MO.EUiAlign.Right) {
      baseX = rectangle.left;
   } else {
      graphic.setFont(textFont);
      var valueTextLength = graphic.textWidth(o._value);
      var unitText = o._basicUnitText;
      if (o._value.length > 4) { unitText += '万'; }
      if (o._value.length > 8) { unitText += '亿'; }
      graphic.setFont(unitFont);
      var unitTextLength = graphic.textWidth(unitText);
      baseX = rectangle.right() - valueTextLength - unitTextLength;
   }
   var baseY = rectangle.top + rectangle.height;

   var drawX = baseX;

   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick > o._rollingDuration || o._noRolling) {
      passedTick = o._rollingDuration;
      o._rolling = false;
   }

   var increasing = o._increasing;
   var originValue = o._originValue;
   var originValueSign = o._originValueSign;
   for (var i = 0; i < o._value.length; i++) {
      var passedValue = o._rollingPages.get(i) * (passedTick / o._rollingDuration);
      var currentNum = parseInt(originValue.charAt(i)) * originValueSign + parseInt(passedValue);
      var currentNumString = currentNum.toString();
      var nextNum;
      if (increasing) {
         nextNum = currentNum + 1;
      }
      else {
         nextNum = currentNum - 1;
      }
      var nextNumString = nextNum.toString();
      var currentNumChar = parseInt(currentNumString.charAt(currentNumString.length - 1));
      var nextNumChar = parseInt(nextNumString.charAt(nextNumString.length - 1));

      var rate = passedValue - parseInt(passedValue);
      rate = increasing ? rate : rate * -1;

      graphic.setFont(textFont);
      var textColor = '';
      if (i < o._originValue.length - 8) {
         textColor = '#FFD926';
      }
      else if (i < o._originValue.length - 4) {
         textColor = '#FF7200';
      }
      else if (i < o._originValue.length) {
         textColor = '#FD0000';
      }

      var fontHeight = textFont.size;
      if (increasing) {
         graphic.drawText(currentNumChar, drawX, baseY - fontHeight * rate, textColor);
         graphic.drawText(nextNumChar, drawX, baseY + fontHeight - fontHeight * rate, textColor);
      }
      else {
         graphic.drawText(currentNumChar, drawX, baseY + fontHeight * rate, textColor);
         graphic.drawText(nextNumChar, drawX, baseY - fontHeight + fontHeight * rate, textColor);
      }
      drawX += graphic.textWidth(currentNumChar);
      
      var unitDrawY = baseY - 3;
      if (i == o._originValue.length - 9) {
         graphic.setFont(unitFont);
         graphic.drawText('亿', drawX, unitDrawY-2, '#00B5F6');
         drawX += graphic.textWidth('亿');
      }
      else if (i == o._originValue.length - 5) {
         graphic.setFont(unitFont);
         graphic.drawText('万', drawX, unitDrawY-2, '#00B5F6');
         drawX += graphic.textWidth('万');
      }
      else if (i == o._originValue.length - 1) {
         graphic.setFont(unitFont);
         graphic.drawText(o._basicUnitText, drawX, unitDrawY-2, '#00B5F6');
         drawX += graphic.textWidth(o._basicUnitText);
      }

   }

   if (o._rolling == false) {
      o._originValue = o._value;
      o._originValueSign = o._valueSign;
      o._rollingPages.clear();
   }

}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_setValue = function FEaiStatisticsLabel_setValue(value) {
   var o = this;
   if (o._value == value) {
      return;
   }

   if (value.charAt(0) == '-') {
      o._valueSign = -1;
      value = value.substring(1, value.length - 2);
   }
   else {
      o._valueSign = 1;
   }

   if (o._rolling) {
      o._originValue = o._value;
      o._originValueSign = o._valueSign;
   }

   o._value = value;

   //计算实际需要转过的页数
   var originValue = o._originValue;
   var lengthDiff = value.length - originValue.length;
   while (lengthDiff > 0) {
      originValue = '0' + originValue;
      lengthDiff--;
   }
   o._originValue = originValue;
   o._rollingPages.clear();
   o._rollingPages._length = value.length;
   var valueSign = o._valueSign;
   var originValueSign = o._originValueSign;
   var increasing = o._increasing = parseInt(value) > parseInt(originValue);
   if (increasing) {
      for (var i = 0; i < value.length; i++) {
         var pages = parseInt(value.substring(i, i + 1)) * valueSign - parseInt(originValue.substring(i, i + 1)) * originValueSign;
         if (pages == 0 && valueSign * originValueSign < 0) {
            pages = parseInt(value.substring(i, i + 1)) * 2;
            pages = pages == 0 ? 10 : pages;
         }
         else {
            pages = pages < 0 ? pages + 10 : pages;
         }
         o._rollingPages.set(i, pages);
      }
   }
   else {
      for (var i = 0; i < value.length; i++) {
         var pages = parseInt(value.substring(i, i + 1)) * valueSign - parseInt(originValue.substring(i, i + 1)) * originValueSign;
         if (pages == 0 && valueSign * originValueSign < 0) {
            pages = parseInt(value.substring(i, i + 1)) * -2;
            pages = pages == 0 ? 10 : pages;
         }
         else {
            pages = pages > 0 ? pages - 10 : pages;
         }
         o._rollingPages.set(i, pages);
      }
   }

   o._startTick = MO.Timer.current();
   o._rolling = true;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event) {
   var o = this;
   o.__base.FGuiLabel.oeUpdate.call(o, event);

   if (o._rolling) {
      o.dirty();
   }

   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct() {
   var o = this;
   o.__base.FGuiLabel.construct.call(o);

   o._rollingPages = new MO.TArray();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose() {
   var o = this;
   // 计时器
   o._ticker = MO.Lang.Object.dispose(o._ticker);
   // 父处理
   o.__base.FGuiLabel.dispose.call(o);
}