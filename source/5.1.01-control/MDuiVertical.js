//==========================================================
// <T>纵向部署控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.MUiVertical = function MUiVertical(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.setVisible = MO.MUiHorizontal_setVisible;
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
      MO.Window.Html.displaySet(h, p);
   }
}
