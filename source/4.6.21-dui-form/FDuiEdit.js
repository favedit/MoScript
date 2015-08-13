//==========================================================
// <T>文本编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>      │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│
// │                 ││hInput<INPUT>     ││
// │                 │└------------------┘│
// └-----------------┴----------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiEdit = function FDuiEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @style
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel      = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   //..........................................................
   // @event
   o.onBuildEditValue      = MO.FDuiEdit_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiEdit_onInputEdit);
   //..........................................................
   // @method
   o.construct             = MO.FDuiEdit_construct;
   // @method
   o.formatText            = MO.FDuiEdit_formatText;
   o.formatValue           = MO.FDuiEdit_formatValue;
   // @method
   o.text                  = MO.FDuiEdit_text;
   o.setText               = MO.FDuiEdit_setText;
   o.setEditAble           = MO.FDuiEdit_setEditAble;
   o.refreshValue          = MO.FDuiEdit_refreshValue;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiEdit_onBuildEditValue = function FDuiEdit_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   hValuePanel.className = o.styleName('ValuePanel');
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   hValueForm.width = '100%';
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   // 设置大小
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiEdit_onInputEdit = function FDuiEdit_onInputEdit(p){
   var o = this;
   // 刷新数据
   o.refreshValue();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiEdit_construct = function FDuiEdit_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new MO.SSize2(120, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param value:String 数据
// @return 内容
//==========================================================
MO.FDuiEdit_formatText = function FDuiEdit_formatText(value){
   var o = this;
   var result = MO.Lang.String.nvl(value);
   //if(ECase.Upper == o.editCase){
   //   r = MO.Lang.String.toUpper(r);
   //}else if(ECase.Lower == o.editCase){
   //   r = MO.Lang.String.toLower(r);
   //}
   o._dataDisplay = result;
   return result;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param value:String 内容
// @return 数据
//==========================================================
MO.FDuiEdit_formatValue = function FDuiEdit_formatValue(value){
   return value;
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
MO.FDuiEdit_text = function FDuiEdit_text(){
   return this._hInput.value;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
MO.FDuiEdit_setText = function FDuiEdit_setText(text){
   this._hInput.value = text;
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param flag:Boolean 可编辑性
//==========================================================
MO.FDuiEdit_setEditAble = function FDuiEdit_setEditAble(flag){
   var o = this;
   o.__base.FDuiEditControl.setEditAble.call(o, flag);
   // 设置属性
   o._hInput.readOnly = !flag;
   //if(flag){
   //}else{
   //   o._hInput.style.backgroundColor = EUiColor.ReadonlyBackgroundColor;
   //   o._hValuePanel.style.backgroundColor = EUiColor.ReadonlyBackgroundColor;
   //}
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}
