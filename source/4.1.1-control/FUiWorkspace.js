//==========================================================
// <T>工作空间页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FUiWorkspace(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   //..........................................................
   // @style
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
   //..........................................................
   // @attribute
   o._frames      = null;
   //..........................................................
   // @html
   o._hContainer  = null;
   //..........................................................
   // @event
   o.onBuildPanel = FUiWorkspace_onBuildPanel;
   //..........................................................
   // @method
   o.appendChild  = FUiWorkspace_appendChild;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FUiWorkspace_onBuildPanel(p){
   var o = this;
   //o._hContainer = p.hDocument.body;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FUiControl 控件
//==========================================================
function FUiWorkspace_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiFrameSet)){
      //o._hContainer.appendChild(p._hPanel);
      o._hPanel.appendChild(p._hPanel);
   }
}
