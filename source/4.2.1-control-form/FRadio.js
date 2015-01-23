//==========================================================
// <T>单选框控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @property
   o._groupName         = RClass.register(o, new APtyString('_groupName'));
   //..........................................................
   // @style
   o._styleInput        = RClass.register(o, new AStyle('_styleInput', 'Input'));
   //..........................................................
   // @html
   o._hInput            = null;
   //..........................................................
   // @event
   o.onBuildEditorValue = FRadio_onBuildEditorValue;
   //..........................................................
   // @attribute
   //o._editChecked = RClass.register(o, new APtyBoolean('_editChecked'), false);
   //..........................................................
   // @event
   //o.onClick      = RMethod.emptyCall;
   //o.onDataClick  = RMethod.emptyCall;
   //..........................................................
   // @method
   //o.clearValue   = FRadio_clearValue;
   //o.resetValue   = FRadio_resetValue;
   //o.saveValue    = FRadio_saveValue;
   //o.text         = FRadio_text;
   //o.setText      = FRadio_setText;
   //o.refreshStyle = FRadio_refreshStyle;
   return o;
}

//==========================================================
// <T>建立编辑页面控件。</T>
//
// @method
// @param h:hPanel:<HTML> 页面容器
//==========================================================
function FRadio_onBuildEditorValue(p){
   var o = this;
   // 建立编辑控件
   o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
}









//==========================================================
// <T>清除数据内容。</T>
//
// @method
//==========================================================
function FRadio_clearValue(){
   this.hEdit.checked = false;
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
function FRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @param vs:values:TAttributes 数据集合
//==========================================================
function FRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return 文本内容
//==========================================================
function FRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
function FRadio_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
