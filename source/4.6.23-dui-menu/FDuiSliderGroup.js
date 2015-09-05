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
MO.FDuiSliderGroup = function FDuiSliderGroup(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @property EUiMerge 合并枚举
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   //..........................................................
   // @style
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   // @style
   o._styleIconPanel   = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel  = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel  = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   //..........................................................
   // @html
   o._hLine            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiSliderGroup_onBuildPanel;
   o.onBuild           = MO.FDuiSliderGroup_onBuild;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   //..........................................................
   // @method
   o.setIcon           = MO.FDuiSliderGroup_setIcon;
   o.setLabel          = MO.FDuiSliderGroup_setLabel;
   o.appendChild       = MO.FDuiSliderGroup_appendChild;
   o.removeChild       = MO.FDuiSliderGroup_removeChild;
   // @method
   o.dispose           = MO.FDuiSliderGroup_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiSliderGroup_onBuildPanel = function FDuiSliderGroup_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiSliderGroup_onBuild = function FDuiSliderGroup_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   // 设置面板
   var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
   //o.attachEvent('onMouseDown', hCell);
   //o.attachEvent('onMouseUp', hCell);
   // 建立表单
   var hForm = o._hForm = MO.Window.Builder.appendTable(hCell);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   // 建立图标
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      // 设置颜色
      if(o._foreColor){
         hLabelPanel.style.color = o._foreColor;
      }
      // 设置标签
      o.setLabel(o._label);
   }
   // 建立热键
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   // 建立提示
   if(o._hint){
      o.setHint(o._hint);
   }
}

//==========================================================
// <T>设置图标。</T>
//
// @method
// @param icon:String 图标
//==========================================================
MO.FDuiSliderGroup_setIcon = function FDuiSliderGroup_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
MO.FDuiSliderGroup_setLabel = function FDuiSliderGroup_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiSliderGroup_appendChild = function FDuiSliderGroup_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 按键处理
   if(MO.Class.isClass(control, MO.FDuiSliderButton)){
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
MO.FDuiSliderGroup_removeChild = function FDuiSliderGroup_removeChild(p){
   var o = this;
   // 按键处理
   if(MO.Class.isClass(p, FDuiSliderButton)){
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
MO.FDuiSliderGroup_dispose = function FDuiSliderGroup_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
