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
   o._frames      = null;
   //..........................................................
   // @event
   o.onBuildPanel = FWorkspace_onBuildPanel
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FWorkspace_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Panel'));
}
