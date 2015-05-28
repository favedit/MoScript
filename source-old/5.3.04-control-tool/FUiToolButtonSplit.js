//==========================================================
// <T>工具栏分隔符。</T>
//
// @class
// @author maocy
// @history 150203
//==========================================================
function FUiToolButtonSplit(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiToolButton);
   //..........................................................
   // @style
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
   //..........................................................
   // @event
   o.onBuild     = FUiToolButtonSplit_onBuild;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
