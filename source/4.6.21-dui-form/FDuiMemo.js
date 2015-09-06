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
// @version 150318
//==========================================================
MO.FDuiMemo = function FDuiMemo(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
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
   o.onBuildEditValue      = MO.FDuiMemo_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiMemo_onInputEdit);
   //..........................................................
   // @method
   o.construct             = MO.FDuiMemo_construct;
   // @method
   o.formatDisplay         = MO.FDuiMemo_formatDisplay;
   o.formatValue           = MO.FDuiMemo_formatValue;
   // @method
   o.get                   = MO.FDuiMemo_get;
   o.set                   = MO.FDuiMemo_set;
   // @method
   o.refreshValue          = MO.FDuiMemo_refreshValue;
   o.refreshStyle          = MO.FDuiMemo_refreshStyle;
   // @method
   o.dispose               = MO.FDuiMemo_dispose;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiMemo_onBuildEditValue = function FDuiMemo_onBuildEditValue(event){
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
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hInputPanel.style.padding = '1px';
   var hInput = o._hInput = MO.Window.Builder.append(hInputPanel, 'TEXTAREA');
   hInput.style.height = '100%';
   hInput.wrap = 'off';
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   // 设置可以输入的最大长度
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiMemo_onInputEdit = function FDuiMemo_onInputEdit(event){
   var o = this;
   // 设置滑动栏
   //var value = o._hInput.value;
   // 刷新数据
   o.refreshValue();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiMemo_construct = function FDuiMemo_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new MO.SSize2();
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param value:String 数据
// @return 内容
//==========================================================
MO.FDuiMemo_formatDisplay = function FDuiMemo_formatDisplay(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   //if(ECase.Upper == o.editCase){
   //   r = MO.Lang.String.toUpper(r);
   //}else if(ECase.Lower == o.editCase){
   //   r = MO.Lang.String.toLower(r);
   //}
   o._dataDisplay = text;
   return text;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param value:String 内容
// @return 数据
//==========================================================
MO.FDuiMemo_formatValue = function FDuiMemo_formatValue(value){
   return value;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiMemo_get = function FDuiMemo_get(){
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
MO.FDuiMemo_set = function FDuiMemo_set(value){
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
// <T>刷新数据。</T>
//
// @method
//==========================================================
MO.FDuiMemo_refreshValue = function FDuiMemo_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}

//==========================================================
// <T>根据当前状态刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiMemo_refreshStyle = function FDuiMemo_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   // 设置编辑样式
   var hInput = o._hInput;
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
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiMemo_dispose = function FDuiMemo_dispose(){
   var o = this
   // 释放属性
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   // 父处理
   o.__base.FDuiEditControl.dispose.call(o);
}
