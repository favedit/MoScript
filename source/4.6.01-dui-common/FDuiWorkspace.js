//==========================================================
// <T>工作空间页面集合。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
MO.FDuiWorkspace = function FDuiWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
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
   o.onBuildPanel = MO.FDuiWorkspace_onBuildPanel;
   //..........................................................
   // @method
   o.appendChild  = MO.FDuiWorkspace_appendChild;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
MO.FDuiWorkspace_onBuildPanel = function FDuiWorkspace_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(event, o.styleName('Panel'));
   //o._hPanel = MO.Window.Builder.createFragment(event);
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FDuiWorkspace_appendChild = function FDuiWorkspace_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FDuiFrameSet)){
      o._hPanel.appendChild(control._hPanel);
   }else{
      throw new MO.TError(o, 'Unknown child type.');
   }
}
