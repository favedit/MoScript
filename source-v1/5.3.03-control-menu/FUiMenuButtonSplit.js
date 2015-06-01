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
   o._stylePanelHorizontal = RClass.register(o, new AStyle('_stylePanelHorizontal'));
   o._stylePanelVertical   = RClass.register(o, new AStyle('_stylePanelVertical'));
   //..........................................................
   // @method
   o.onBuild               = FUiMenuButtonSplit_onBuild;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FUiMenuButtonSplit_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   if(RClass.isClass(o._parent, FUiMenuBar)){
      hPanel.className = o.styleName('PanelVertical');
   }else{
      hPanel.className = o.styleName('PanelHorizontal');
   }
}
