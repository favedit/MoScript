//==========================================================
// <T>横向部署控件。</T>
//
// @manager
//==========================================================
function MHorizontal(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.setVisible = MHorizontal_setVisible;
   return o;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param v:visible:Boolean 是否可见
//==========================================================
function MHorizontal_setVisible(v){
   var o = this;
   // 布局行
   var hl = o.hPanelLine;
   if(hl){
      //hl.style.display = v ? 'inline' : 'none';
   }
}
