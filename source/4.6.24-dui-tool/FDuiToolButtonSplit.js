//==========================================================
// <T>工具栏分隔符。</T>
//
// @class
// @author maocy
// @history 150203
//==========================================================
MO.FDuiToolButtonSplit = function FDuiToolButtonSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton, MO.MUiToolButton);
   //..........................................................
   // @style
   o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //..........................................................
   // @event
   o.onBuild     = MO.FDuiToolButtonSplit_onBuild;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiToolButtonSplit_onBuild = function FDuiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
