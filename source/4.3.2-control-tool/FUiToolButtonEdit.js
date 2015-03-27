//==========================================================
// <T>工具栏复选按键。</T>
//
// @class
// @author maocy
// @history 150326
//==========================================================
function FUiToolButtonEdit(o){
   o = RClass.inherits(this, o, FUiToolButton);
   //..........................................................
   // @property
   o._editSize       = RClass.register(o, new APtySize2('_editSize'));
   //..........................................................
   // @html
   o._hEdit          = null;
   //..........................................................
   // @event
   o.onBuildButton   = FUiToolButtonEdit_onBuildButton;
   o.onEnter         = FUiToolButtonEdit_onEnter;
   o.onLeave         = FUiToolButtonEdit_onLeave;
   o.onKeyDown      = RClass.register(o, new AEventKeyDown('onKeyDown'), FUiToolButtonEdit_onKeyDown);
   //..........................................................
   // @method
   o.construct       = FUiToolButtonEdit_construct;
   // @method
   o.text            = FUiToolButtonEdit_text;
   o.setText         = FUiToolButtonEdit_setText;
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
   var h = o._hPanel;
   // 建立表单
   var hf = o._hForm = RBuilder.appendTable(h);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   // 建立输入框
   var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hl);
   var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o.attachEvent('onKeyDown', hEdit);
   o._hEditSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   // 建立图标
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   // 建立分割
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   }
   // 建立标签
   if(o._label){
      var hlp = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
      o.attachEvent('onMouseDown', hlp);
      o.attachEvent('onMouseUp', hlp);
      hlp.noWrap = true;
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
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onEnter(p){
   this._hPanel.className = this.styleName('Hover');
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onLeave(p){
   this._hPanel.className = this.styleName('Normal');
}

//==========================================================
// <T>按键落下处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiToolButtonEdit_onKeyDown(event){
   var o = this;
   if(event.keyCode == EKeyCode.Enter){
      o.click();
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
