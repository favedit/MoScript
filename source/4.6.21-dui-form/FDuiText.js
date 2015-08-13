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
MO.FDuiText = function FDuiText(o){
   o = MO.Class.inherits(this, o, MO.FDuiTextControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   //..........................................................
   // @style
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiText_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), FDuiText_onInputEdit);
   //..........................................................
   // @method
   o.construct        = MO.FDuiText_construct;
   // @method
   o.formatDisplay    = MO.FDuiText_formatDisplay;
   o.formatValue      = MO.FDuiText_formatValue;
   // @method
   o.get              = MO.FDuiText_get;
   o.set              = MO.FDuiText_set;
   o.refreshValue     = MO.FDuiText_refreshValue;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiText_onBuildEditValue = function FDuiText_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   // 设置大小
   MO.Window.Html.setSize(hep, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiText_onInputEdit = function FDuiText_onInputEdit(p){
   var o = this;
   // 设置滑动栏
   var v = o._hInput.value;
   // 刷新数据
   o.refreshValue();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiText_construct = function FDuiText_construct(){
   var o = this;
   o.__base.FDuiTextControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param p:value:String 数据
// @return 内容
//==========================================================
MO.FDuiText_formatDisplay = function FDuiText_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   //if(ECase.Upper == o.editCase){
   //   r = MO.Lang.String.toUpper(r);
   //}else if(ECase.Lower == o.editCase){
   //   r = MO.Lang.String.toLower(r);
   //}
   o._dataDisplay = r;
   return r;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param p:value:String 内容
// @return 数据
//==========================================================
MO.FDuiText_formatValue = function FDuiText_formatValue(p){
   return p;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiText_get = function FDuiText_get(){
   var o = this;
   var r = o.__base.FDuiTextControl.get.call(o);
   // 获得显示
   var r = o._hInput.value;
   return r;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiText_set = function FDuiText_set(p){
   var o = this;
   o.__base.FDuiTextControl.set.call(o, p);
   // 设置显示
   o._hInput.value = MO.Lang.String.nvl(p);
   //o.finded = v;
   //if(o.hChangeIcon){
   //   o.hChangeIcon.style.display = 'none';
   //}
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
MO.FDuiText_refreshValue = function FDuiText_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}
