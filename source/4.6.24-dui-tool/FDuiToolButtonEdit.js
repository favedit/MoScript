//==========================================================
// <T>工具栏复选按键。</T>
//
// @class
// @author maocy
// @history 150326
//==========================================================
MO.FDuiToolButtonEdit = function FDuiToolButtonEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton, MO.MListenerDataChanged);
   //..........................................................
   // @property
   o._editSize      = MO.Class.register(o, new MO.APtySize2('_editSize'));
   //..........................................................
   // @html
   o._hEdit         = null;
   //..........................................................
   // @event
   o.onBuildButton  = MO.FDuiToolButtonEdit_onBuildButton;
   o.onEnter        = MO.Method.empty;
   o.onLeave        = MO.Method.empty;
   o.onInputEdit    = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiToolButtonEdit_onInputEdit);
   o.onInputKeyDown = MO.Class.register(o, new MO.AEventKeyDown('onInputKeyDown'), MO.FDuiToolButtonEdit_onInputKeyDown);
   //..........................................................
   // @method
   o.construct      = MO.FDuiToolButtonEdit_construct;
   // @method
   o.text           = MO.FDuiToolButtonEdit_text;
   o.setText        = MO.FDuiToolButtonEdit_setText;
   return o;
}

//==========================================================
// <T>建立按键布局。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiToolButtonEdit_onBuildButton = function FDuiToolButtonEdit_onBuildButton(p){
   var o = this;
   // 设置面板
   var hPanel = o._hPanel;
   // 建立表单
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   // 建立输入框
   var hEditPanel = o._hEditPanel = MO.Window.Builder.appendTableCell(hLine);
   var hEdit = o._hEdit = MO.Window.Builder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
   o.attachEvent('onInputKeyDown', hEdit);
   o._hEditSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
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
      o.attachEvent('onMouseDown', hLabelPanel);
      o.attachEvent('onMouseUp', hLabelPanel);
      hLabelPanel.noWrap = true;
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
// <T>输入框修改处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiToolButtonEdit_onInputEdit = function FDuiToolButtonEdit_onInputEdit(event){
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
MO.FDuiToolButtonEdit_onInputKeyDown = function FDuiToolButtonEdit_onInputKeyDown(event){
   var o = this;
   if(event.keyCode == MO.EKeyCode.Enter){
      o.doClick();
   }
}

//==========================================================
// <T>获得分组名称。</T>
//
// @method
// @return String 分组名称
//==========================================================
MO.FDuiToolButtonEdit_construct = function FDuiToolButtonEdit_construct(){
   var o = this;
   o.__base.FDuiToolButton.construct.call(o);
   o._editSize = new MO.SSize2();
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
MO.FDuiToolButtonEdit_text = function FDuiToolButtonEdit_text(){
   return this._hEdit.value;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FDuiToolButtonEdit_setText = function FDuiToolButtonEdit_setText(text){
   this._hEdit.value = text;
}
