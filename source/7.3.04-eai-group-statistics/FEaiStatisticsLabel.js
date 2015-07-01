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
      var label = o._label;
      var labelLength = label.length;
      var labelH = null;
      if(labelLength > 8){
         labelH = label.substring(0, labelLength - 8);
      }
      var labelM = null;
      if(labelLength > 4){
         labelM = label.substring(labelLength - 8, labelLength - 4);
      }
      var labelL = null;
      if(labelLength > 0){
         labelL = label.substring(labelLength - 4, labelLength);
      }
      var width = graphic.textWidth(label);
      var widthH = graphic.textWidth(labelH);
      var widthM = graphic.textWidth(labelM);
      var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
      var y = rectangle.top + rectangle.height * 0.5 + 3;
      // 绘制文字
      if(labelH != null){
         graphic.drawText(labelH, x, y, '#FD0000');
      }
      if(labelM != null){
         graphic.drawText(labelM, x + widthH, y, '#FF7200');
      }
      if(labelL != null){
         graphic.drawText(labelL, x + widthH + widthM, y, '#FFD926');
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
