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
   o._value           = MO.Class.register(o, new MO.AGetter('_value'), '0');
   o._originValue     = '0';
   // @attribute
   o._startTick       = 0;
   o._textFontW       = "0";
   o._unitFontW       = "0";
   o._negative        = "0";
   o._origin          = "0";
   o._rolling         = MO.Class.register(o, new MO.AGetSet('_rolling'), false);
   o._rollingDuration = MO.Class.register(o, new MO.AGetSet('_rollingDuration'), 1000);
   o._rollingPages    = null;
   o._noRolling       = MO.Class.register(o, new MO.AGetSet('_noRolling'), false);
   //..........................................................
   // @method
   o.onPaintLabel     = MO.FEaiStatisticsLabel_onPaintLabel;
   //..........................................................
   // @process
   o.oeUpdate         = MO.FEaiStatisticsLabel_oeUpdate;
   //..........................................................
   // @method
   o.construct        = MO.FEaiStatisticsLabel_construct;
   // @method
   o.setValue         = MO.FEaiStatisticsLabel_setValue;
   // @method
   o.dispose          = MO.FEaiStatisticsLabel_dispose;
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
   var textFont = o._foreFont;
   var unitFont = o._backFont;

   graphic.setFont(textFont);
   var baseX;
   var unitTextX;
   if( o._alignCd == "right" ){
       baseX =  rectangle.left;
       unitTextX = baseX + 4;
   }else{
       baseX =  rectangle.right() - o._unitFontW + (o._textFontW - o._unitFontW) - 65;
       unitTextX = baseX ;
   }
   var baseY = rectangle.top + rectangle.height;
   var unitTextY = baseY - 2;
   var drawedText = '';
   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick > o._rollingDuration || o._noRolling) {
      passedTick = o._rollingDuration;
      o._rolling = false;
   }
   
   for (var i = 0; i < o._value.length; i++) {
         var passedValue = o._rollingPages.get(i) * (passedTick / o._rollingDuration);
         var numString = (parseInt(o._originValue.charAt(i)) + parseInt(passedValue)).toString();
         var currentNum = parseInt(numString.charAt(numString.length - 1));
         var nextNum = currentNum == 9 ? 0 : currentNum + 1;
         var prevNum = currentNum == 0 ? 9 : currentNum - 1;
         var reg = /^[0-9]+$/;
         var rate = passedValue - parseInt(passedValue);
         graphic.setFont(textFont);
         var drawedTextWidth;
         var textColor = '';
         if (i < o._originValue.length - 8) {
            textColor = '#FFD926';
         }else if (i < o._originValue.length - 4) {
            textColor = '#FF7200';
         }else if (i < o._originValue.length) {
            textColor = '#FD0000';
         }
         
         if( !reg.test(o._negative) ){
            var negativeColor ="";
            if ( o._negative.length <= 5) {
               negativeColor = '#FD0000';
            }else if ( o._negative.length <= 9) {
               negativeColor = '#FF7200';
            }else if ( o._negative.length <= 13) {
               negativeColor = '#FFD926';
            }
            graphic.setFont(textFont);
            graphic.drawText("-", baseX - 10, baseY , negativeColor);
         }

         drawedTextWidth = graphic.textWidth(drawedText);
         o._textFontW = drawedTextWidth;
         // 字宽 ;  
         graphic.drawText(prevNum, baseX + drawedTextWidth, baseY - 38 - 38 * rate, textColor);
         graphic.drawText(currentNum, baseX + drawedTextWidth, baseY - 38 * rate, textColor);
         graphic.drawText(nextNum, baseX + drawedTextWidth, baseY + 38 - 38 * rate, textColor);
         drawedText += currentNum;
         if (i == o._originValue.length - 9) {
            drawedTextWidth = graphic.textWidth(drawedText);
            graphic.setFont(unitFont);
            graphic.drawText('亿', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
            drawedText += '亿';
         }else if (i == o._originValue.length - 5) {
            drawedTextWidth = graphic.textWidth(drawedText);
            graphic.setFont(unitFont);
            graphic.drawText('万', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
            drawedText += '万';
         }else if (i == o._originValue.length -1) {
            drawedTextWidth = graphic.textWidth(drawedText);
            graphic.setFont(unitFont);
            graphic.drawText('元', unitTextX + drawedTextWidth, unitTextY, '#00B5F6');
            drawedText += '元';
            o._unitFontW = drawedTextWidth;
         }
      
   }
   if (o._rolling == false) {
      o._originValue = o._value;
      o._origin = o._negative;
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
   var fetch;
   o._negative = value;
   if (o._value == value) {
      return;
   }
   if (o._rolling) {
      o._originValue = o._value;
      o._origin = o._negative;
   }
   o._negative = value;
   fetch = value - o._origin;
   var value = Math.abs(value).toString();
   o._value = value;
   
   console.log(o._originValue +"-"+ o._origin +"-"+value);
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

   if( fetch < 0  ){
      for (var i = 0; i < value.length; i++) {
         var pages = parseInt(value.substring(i, i + 1)) - parseInt(originValue.substring(i, i + 1));
         pages = pages > 0 ? pages - 10 : pages;
         o._rollingPages.set(i, pages);
       }
   }else{
      for (var i = 0; i < value.length; i++) {
            //var pages = parseInt(value.substring(0, i + 1)) - parseInt(originValue.substring(0, i + 1));
            var pages = parseInt(value.substring(i, i + 1)) - parseInt(originValue.substring(i, i + 1));
            pages = pages < 0 ? pages + 10 : pages;
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
