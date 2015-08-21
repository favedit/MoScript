//==========================================================
// <T>界面菜单滑动栏。</T>
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
MO.FDuiSliderMenu = function FDuiSliderMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   //..........................................................
   // @property EUiMerge 合并枚举
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //..........................................................
   // @style
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleMenuPanel   = MO.Class.register(o, new MO.AStyle('_styleMenuPanel'));
   o._styleGroupPanel  = MO.Class.register(o, new MO.AStyle('_styleGroupPanel'));
   //..........................................................
   // @html
   o._hLine            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiSliderMenu_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   //..........................................................
   // @method
   o.appendChild       = MO.FDuiSliderMenu_appendChild;
   o.removeChild       = MO.FDuiSliderMenu_removeChild;
   // @method
   o.dispose           = MO.FDuiSliderMenu_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiSliderMenu_onBuildPanel = function FDuiSliderMenu_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   var hMenuPanel = o._hMenuPanel = MO.Window.Builder.appendTableRowCell(hPanel, o.styleName('MenuPanel'));
   hMenuPanel.align = 'center';
   MO.Window.Builder.appendIcon(hMenuPanel, null, 'editor.design.menuv|png');
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiSliderMenu_appendChild = function FDuiSliderMenu_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 按键处理
   if(MO.Class.isClass(control, MO.FDuiSliderGroup)){
      var hLine = o._hLine;
      // 建立按键
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('GroupPanel'));
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
MO.FDuiSliderMenu_removeChild = function FDuiSliderMenu_removeChild(p){
   var o = this;
   // 按键处理
   if(MO.Class.isClass(p, MO.FDuiSliderGroup)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      //p._hParentLine = null;
      //p._hParent = null;
   }
   // 父处理
   o.__base.FDuiContainer.removeChild.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiSliderMenu_dispose = function FDuiSliderMenu_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
