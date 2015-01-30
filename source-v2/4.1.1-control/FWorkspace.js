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
// @param p:event:TEventProcess 处理事件
//==========================================================
function FWorkspace_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
