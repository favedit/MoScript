with(MO){
   //==========================================================
   // <T>界面标签控件。</T>
   //
   // @class
   // @author maocy
   // @version 150623
   //==========================================================
   MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
      o = RClass.inherits(this, o, FGuiLabel);
      //..........................................................
      // @attribute
      o._value        = RClass.register(o, new AGetSet('_value'), '0');
      o._currentValue = '0';
      // @attribute
      o._ticker       = null;
      //..........................................................
      // @method
      o.onPaintLabel = FEaiStatisticsLabel_onPaintLabel;
      //..........................................................
      // @event
      o.construct    = FEaiStatisticsLabel_construct;
      o.updateValue  = FEaiStatisticsLabel_updateValue;
      o.process      = FEaiStatisticsLabel_process;
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
      // 设置字体
      if(o._foreFont){
         graphic.setFont(o._foreFont);
      }
      // 计算位置
      var text = '';
      var label = o._label;
      var labelLength = label.length;
      var labelNumberH = null;
      var labelH = null;
      if(labelLength > 8){
         labelNumberH = label.substring(0, labelLength - 8);
         labelH = labelNumberH + '亿';
         text += labelH;
      }
      var labelNumberM = null;
      var labelM = null;
      if(labelLength > 4){
         labelNumberM = label.substring(labelLength - 8, labelLength - 4);
         labelM = labelNumberM + '万';
         text += labelM;
      }
      var labelNumberL = null;
      var labelL = null;
      if(labelLength > 0){
         labelNumberL = label.substring(labelLength - 4, labelLength);
         labelL = labelNumberL + '元';
         text += labelL;
      }
      var width = graphic.textWidth(text);
      var widthH = graphic.textWidth(labelH);
      var widthM = graphic.textWidth(labelM);
      var x = rectangle.left;
      var y = rectangle.top + rectangle.height;
      // 绘制文字
      if(labelH != null){
         var textWidth = graphic.textWidth(labelNumberH);
         graphic.drawText(labelNumberH, x, y, '#FD0000');
         graphic.drawText('亿', x + textWidth, y - 1, '#00B5F6');
      }
      if(labelM != null){
         var textWidth = graphic.textWidth(labelNumberM);
         graphic.drawText(labelNumberM, x + widthH, y, '#FF7200');
         graphic.drawText('万', x + widthH + textWidth, y - 1, '#00B5F6');
      }
      if(labelL != null){
         var textWidth = graphic.textWidth(labelNumberL);
         graphic.drawText(labelNumberL, x + widthH + widthM, y, '#FFD926');
         graphic.drawText('元', x + widthH + widthM + textWidth, y - 1, '#00B5F6');
      }
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
      var o = this;
      o.__base.FGuiLabel.construct.call(o);
      // 计时器
      o._ticker = new TTicker(200);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsLabel_updateValue = function FEaiStatisticsLabel_updateValue(){
      var o = this;
      var value = o._value;
      var currentValue = o._currentValue;
      var length = value.length;
      var result = '';
      var changed = false;
      for(var i = length - 1; i >= 0; i--){
         var vchar = value.charAt(i);
         vchar = parseInt(vchar);
         var cchar = currentValue.charAt(i);
         if(cchar == ''){
            cchar = 0;
         }else{
            cchar = parseInt(cchar);
         }
         if(!changed && vchar != cchar){
            cchar++;
            if(cchar > 9){
               cchar = 0;
            }
            changed = true;
         }
         result = cchar + result;
      }
      o._label = result;
      o._currentValue = result;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsLabel_process = function FEaiStatisticsLabel_process(event){
      var o = this;
      var value = o._value;
      var currentValue = o._currentValue;
      if(value != currentValue){
         if(o._ticker.process()){
            o.updateValue();
            return true;
         }
      }
      return false;
   }
}
