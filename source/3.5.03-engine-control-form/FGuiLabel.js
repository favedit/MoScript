with(MO){
   //==========================================================
   // <T>界面标签控件。</T>
   //
   // @class
   // @author maocy
   // @version 150623
   //==========================================================
   MO.FGuiLabel = function FGuiLabel(o){
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @method
      o.onPaintBegin = FGuiLabel_onPaintBegin;
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLabel_onPaintBegin = function FGuiLabel_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      // 绘制标签
      if(o._label){
         // 设置字体
         if(o._foreFont){
            graphic.setFont(o._foreFont);
         }
         // 计算位置
         var width = graphic.textWidth(o._label);
         var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
         var y = rectangle.top + rectangle.height * 0.5 + 3;
         // 绘制文字
         graphic.drawText(o._label, x, y, o._foreColor);
      }
   }
}
