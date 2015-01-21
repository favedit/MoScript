//==========================================================
// <T>页面。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FFrame(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @event
   o.onBuildContainer = FFrame_onBuildContainer
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrame_onBuildContainer(e){
   var o = this;
   var h = o._hContainer = RBuilder.createDiv(e.hDocument, o.styleName('Container'));
   h.style.width = '100%';
   h.style.height = '100%';
}
