//==========================================================
// <T>单选框控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiRadio = function FDuiRadio(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   //..........................................................
   // @property
   o._groupName       = MO.Class.register(o, new MO.APtyString('_groupName'));
   //..........................................................
   // @style
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput', 'Input'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiRadio_onBuildEditValue;
   //..........................................................
   // @attribute
   //o._editChecked = MO.Class.register(o, new MO.APtyBoolean('_editChecked'), false);
   //..........................................................
   // @event
   //o.onClick      = RMethod.emptyCall;
   //o.onDataClick  = RMethod.emptyCall;
   //..........................................................
   // @method
   //o.clearValue   = FDuiRadio_clearValue;
   //o.resetValue   = FDuiRadio_resetValue;
   //o.saveValue    = FDuiRadio_saveValue;
   //o.text         = FDuiRadio_text;
   //o.setText      = FDuiRadio_setText;
   //o.refreshStyle = FDuiRadio_refreshStyle;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiRadio_onBuildEditValue = function FDuiRadio_onBuildEditValue(p){
   var o = this;
   // 建立编辑控件
   o._hInput = MO.Window.Builder.appendRadio(o._hValuePanel, o.styleName('Input'));
}









//==========================================================
// <T>清除数据内容。</T>
//
// @method
//==========================================================
MO.FDuiRadio_clearValue = function FDuiRadio_clearValue(){
   this.hEdit.checked = false;
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
MO.FDuiRadio_resetValue = function FDuiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @param vs:values:TAttributes 数据集合
//==========================================================
MO.FDuiRadio_saveValue = function FDuiRadio_saveValue(vs){
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
MO.FDuiRadio_text = function FDuiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
MO.FDuiRadio_setText = function FDuiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiRadio_refreshStyle = function FDuiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
