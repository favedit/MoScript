//==========================================================
// <T>工作空间页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FWorkspace(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @style
   o._frames          = null;
   //..........................................................
   // @event
   o.onBuildContainer = FWorkspace_onBuildContainer
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FWorkspace_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createDiv(e.hDocument, o.styleName('Container'));
}
