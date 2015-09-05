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
MO.FDuiIconPicker = function FDuiIconPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   //..........................................................
   // @event
   o.onBuildEditValue      = MO.FDuiIconPicker_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiIconPicker_onInputEdit);
   //..........................................................
   // @method
   o.construct             = MO.FDuiIconPicker_construct;
   // @method
   o.formatText            = MO.FDuiIconPicker_formatText;
   o.formatValue           = MO.FDuiIconPicker_formatValue;
   // @method
   o.get                   = MO.FDuiIconPicker_get;
   o.set                   = MO.FDuiIconPicker_set;
   o.setEditAble           = MO.FDuiIconPicker_setEditAble;
   o.refreshValue          = MO.FDuiIconPicker_refreshValue;
   o.refreshStyle          = MO.FDuiIconPicker_refreshStyle;
   // @method
   o.dispose               = MO.FDuiIconPicker_dispose;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiIconPicker_onBuildEditValue = function FDuiIconPicker_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(event);
   //..........................................................
   // 建立输入栏
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
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
MO.FDuiIconPicker_onInputEdit = function FDuiIconPicker_onInputEdit(p){
   var o = this;
   // 刷新数据
   o.refreshValue();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiIconPicker_construct = function FDuiIconPicker_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new MO.SSize2(0, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param value:String 数据
// @return 内容
//==========================================================
MO.FDuiIconPicker_formatText = function FDuiIconPicker_formatText(value){
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
MO.FDuiIconPicker_formatValue = function FDuiIconPicker_formatValue(value){
   return value;
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiIconPicker_get = function FDuiIconPicker_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.FDuiIconPicker_set = function FDuiIconPicker_set(value){
   var o = this;
   // 设置数据
   o._dataValue = value;
   // 设置文本
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param flag:Boolean 可编辑性
//==========================================================
MO.FDuiIconPicker_setEditAble = function FDuiIconPicker_setEditAble(flag){
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
MO.FDuiIconPicker_refreshValue = function FDuiIconPicker_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}

//==========================================================
// <T>根据当前状态刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiIconPicker_refreshStyle = function FDuiIconPicker_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   // 计算样式
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   // 设置样式
   var hInput = o._hInput;
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}
