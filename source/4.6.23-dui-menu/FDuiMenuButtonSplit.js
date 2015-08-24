//==========================================================
// <T>菜单分割按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
MO.FDuiMenuButtonSplit = function FDuiMenuButtonSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @style
   o._stylePanelHorizontal = MO.Class.register(o, new MO.AStyle('_stylePanelHorizontal'));
   o._stylePanelVertical   = MO.Class.register(o, new MO.AStyle('_stylePanelVertical'));
   //..........................................................
   // @method
   o.onBuild               = MO.FDuiMenuButtonSplit_onBuild;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiMenuButtonSplit_onBuild = function FDuiMenuButtonSplit_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   if(MO.Class.isClass(o._parent, MO.FDuiMenuBar)){
      hPanel.className = o.styleName('PanelVertical');
   }else{
      hPanel.className = o.styleName('PanelHorizontal');
   }
}
