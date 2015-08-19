//==========================================================
// <T>界面菜单栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------┬-----------------┬-----------------┬-----------------┐
// │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
// │(Button1)        │(Button2)        │(Button3)        │                 │
// └-----------------┴-----------------┴-----------------┴-----------------┘
//
// @author maocy
// @history 150121
//==========================================================
MO.FDuiMenuButtonGroup = function FDuiMenuButtonGroup(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @property EUiMerge 合并枚举
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //..........................................................
   // @style
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   //..........................................................
   // @html
   o._hLine            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiMenuButtonGroup_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   //..........................................................
   // @method
   o.appendChild       = MO.FDuiMenuButtonGroup_appendChild;
   o.removeChild       = MO.FDuiMenuButtonGroup_removeChild;
   // @method
   o.dispose           = MO.FDuiMenuButtonGroup_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiMenuButtonGroup_onBuildPanel = function FDuiMenuButtonGroup_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiMenuButtonGroup_appendChild = function FDuiMenuButtonGroup_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 按键处理
   if(MO.Class.isClass(control, MO.MDuiMenuButton)){
      // 建立按键
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
      //hCell._hParentLine = hLine;
      control.setPanel(hCell);
   }
}

//==========================================================
// <T>移除一个子控件。</T>
//
// @method
// @param p:control:FDuiControl 子控件
//==========================================================
MO.FDuiMenuButtonGroup_removeChild = function FDuiMenuButtonGroup_removeChild(p){
   var o = this;
   // 按键处理
   if(MO.Class.isClass(p, FDuiMenuButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   // 父处理
   o.__base.FDuiContainer.removeChild.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiMenuButtonGroup_dispose = function FDuiMenuButtonGroup_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
