//==========================================================
// <T>界面标签控件。</T>
//
// @class
// @author maocy
// @version 150623
//==========================================================
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   //..........................................................
   // @attribute
   o._value        = MO.Class.register(o, new MO.AGetter('_value'), '0');
   o._originValue = '0';
   // @attribute
   o._startTick    = 0;
   o._rolling      = false;
   o._rollingDuration = 1000;
   o._rollingPages = null;
   //..........................................................
   // @method
   o.onPaintLabel  = MO.FEaiStatisticsLabel_onPaintLabel;
   //..........................................................
   // @process
   o.oeUpdate      = MO.FEaiStatisticsLabel_oeUpdate;
   //..........................................................
   // @method
   o.construct     = MO.FEaiStatisticsLabel_construct;
   // @method
   o.setValue      = MO.FEaiStatisticsLabel_setValue;
   // @method
   o.dispose       = MO.FEaiStatisticsLabel_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //设置剪裁范围
   graphic.clip(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   // 设置字体
   var textFont = 'bold 38px Microsoft YaHei';
   var unitFont = 'bold 28px Microsoft YaHei';
   graphic.setFont(textFont);
   //graphic._handle.textBaseline = 'bottom';

   var baseX = rectangle.left;
   var baseY = rectangle.top + rectangle.height;
   var unitTextX = baseX + 6;
   var unitTextY = baseY - 4;
   var drawedText = '';
   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick > o._rollingDuration) {
      passedTick = o._rollingDuration;
      o._rolling = false;
   }

   for (var i = 0; i < o._value.length; i++) {
      var passedValue = o._rollingPages.get(i) * (passedTick / o._rollingDuration);
      var numString = (parseInt(o._originValue.charAt(i)) + parseInt(passedValue)).toString();
      var currentNum = parseInt(numString.charAt(numString.length - 1));
      var nextNum = currentNum == 9 ? 0 : currentNum + 1;
      var rate = passedValue - parseInt(passedValue);

      graphic.setFont(textFont);
      var drawedTextWidth = graphic.textWidth(drawedText);
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
      graphic.drawText(currentNum, baseX + drawedTextWidth, baseY - 38 * rate, textColor);
      graphic.drawText(nextNum, baseX + drawedTextWidth, baseY + 38 - 38 * rate, textColor);
      drawedText += currentNum;


      if (i == o._originValue.length - 9) {
         drawedTextWidth = graphic.textWidth(drawedText);
         graphic.setFont(unitFont);
         graphic.drawText('亿', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
         drawedText += '亿';
      }
      else if (i == o._originValue.length - 5) {
         drawedTextWidth = graphic.textWidth(drawedText);
         graphic.setFont(unitFont);
         graphic.drawText('万', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
         drawedText += '万';
      }
      else if (i == o._originValue.length -1) {
         drawedTextWidth = graphic.textWidth(drawedText);
         graphic.setFont(unitFont);
         graphic.drawText('元', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
         drawedText += '元';
      }

   }

   if (o._rolling == false) {
      o._originValue = o._value;
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
   for (var i = 0; i < value.length; i++) {
      //var pages = parseInt(value.substring(0, i + 1)) - parseInt(originValue.substring(0, i + 1));
      var pages = parseInt(value.substring(i, i + 1)) - parseInt(originValue.substring(i, i + 1));
      pages = pages < 0 ? pages + 10 : pages;
      o._rollingPages.set(i, pages);
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
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event){
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
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);

   o._rollingPages = new MO.TArray();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose(){
   var o = this;
   // 计时器
   o._ticker = MO.RObject.dispose(o._ticker);
   // 父处理
   o.__base.FGuiLabel.dispose.call(o);
}
