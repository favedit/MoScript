with(MO){
   //==========================================================
   // <T>横向部署控件。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.MUiHorizontal = function MUiHorizontal(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @method
      o.setVisible = MUiHorizontal_setVisible;
      return o;
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @method
   // @param p:visible:Boolean 是否可见
   //==========================================================
   MO.MUiHorizontal_setVisible = function MUiHorizontal_setVisible(p){
      var o = this;
      // 布局行
      var h = o.hPanelLine;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
}
