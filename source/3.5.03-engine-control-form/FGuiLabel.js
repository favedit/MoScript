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
      // @event
      o.onPaintLabel = FGuiLabel_onPaintLabel;
      o.onPaintBegin = FGuiLabel_onPaintBegin;
      //..........................................................
      // @method
      o.setLabel     = FGuiLabel_setLabel;
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLabel_onPaintLabel = function FGuiLabel_onPaintLabel(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
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

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLabel_onPaintBegin = function FGuiLabel_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      // 绘制标签
      if(o._label){
         o.onPaintLabel(event);
      }
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FGuiLabel_setLabel = function FGuiLabel_setLabel(label){
      var o = this;
      // 脏处理
      if(o._label != label){
         o.dirty();
      }
      // 父处理
      o.__base.FGuiControl.setLabel.call(o, label);
   }
}
