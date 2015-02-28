//==========================================================
// <T>菜单分割按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
function FUiMenuButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl, MUiMenuButton);
   //..........................................................
   // @style
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
   //..........................................................
   // @method
   o.onBuild     = FUiMenuButtonSplit_onBuild;
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
