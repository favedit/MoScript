//==========================================================
// <T>工具栏复选按键。</T>
//
// @class
// @author maocy
// @history 150326
//==========================================================
function FUiToolButtonEdit(o){
   o = RClass.inherits(this, o, FUiToolButton, MListenerDataChanged);
   //..........................................................
   // @property
   o._editSize      = RClass.register(o, new APtySize2('_editSize'));
   //..........................................................
   // @html
   o._hEdit         = null;
   //..........................................................
   // @event
   o.onBuildButton  = FUiToolButtonEdit_onBuildButton;
   o.onEnter        = RMethod.empty;
   o.onLeave        = RMethod.empty;
   o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiToolButtonEdit_onInputEdit);
   o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FUiToolButtonEdit_onInputKeyDown);
   //..........................................................
   // @method
   o.construct      = FUiToolButtonEdit_construct;
   // @method
   o.text           = FUiToolButtonEdit_text;
   o.setText        = FUiToolButtonEdit_setText;
   return o;
}

//==========================================================
// <T>建立按键布局。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiToolButtonEdit_onBuildButton(p){
   var o = this;
   // 设置面板
   var hPanel = o._hPanel;
   // 建立表单
   var hForm = o._hForm = RBuilder.appendTable(hPanel);
   var hLine = o._hLine = RBuilder.appendTableRow(hForm);
   // 建立输入框
   var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hLine);
   var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
   o.attachEvent('onInputKeyDown', hEdit);
   o._hEditSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
   // 建立图标
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
      o.attachEvent('onMouseDown', hLabelPanel);
      o.attachEvent('onMouseUp', hLabelPanel);
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   // 建立热键
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   // 建立提示
   if(o._hint){
      o.setHint(o._hint);
   }
}

//==========================================================
// <T>输入框修改处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onInputEdit(event){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}

//==========================================================
// <T>输入框按键按下处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onInputKeyDown(event){
   var o = this;
   if(event.keyCode == EKeyCode.Enter){
      o.doClick();
   }
}

//==========================================================
// <T>获得分组名称。</T>
//
// @method
// @return String 分组名称
//==========================================================
function FUiToolButtonEdit_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   o._editSize = new SSize2();
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
function FUiToolButtonEdit_text(){
   return this._hEdit.value;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
function FUiToolButtonEdit_setText(text){
   this._hEdit.value = text;
}
