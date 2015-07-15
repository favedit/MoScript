//==========================================================
// <T>工作空间页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
MO.FUiWorkspace = function FUiWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FUiContainer, MO.MUiDescribeFrame);
   //..........................................................
   // @style
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //..........................................................
   // @attribute
   o._frames      = null;
   //..........................................................
   // @html
   o._hContainer  = null;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FUiWorkspace_onBuildPanel;
   //..........................................................
   // @method
   o.appendChild  = MO.FUiWorkspace_appendChild;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
MO.FUiWorkspace_onBuildPanel = function FUiWorkspace_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(event, o.styleName('Panel'));
   //o._hPanel = RBuilder.createFragment(event);
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FUiControl 控件
//==========================================================
MO.FUiWorkspace_appendChild = function FUiWorkspace_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FUiFrameSet)){
      o._hPanel.appendChild(control._hPanel);
   }else{
      throw new MO.TError(o, 'Unknown child type.');
   }
}
