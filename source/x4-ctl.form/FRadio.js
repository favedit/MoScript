//==========================================================
// <T>表单单选框控件。</T>
//
// @calss FEditControl
// @history 091110 MAOCY 创建
//==========================================================
function FRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @attribute
   o.groupName    = RClass.register(o, new TPtyStr('groupName'));
   o.editChecked  = RClass.register(o, new TPtyBool('editChecked', false));
   //..........................................................
   // @event
   o.onClick      = RMethod.emptyCall;
   o.onDataClick  = RMethod.emptyCall;
   o.onBuildEdit  = FRadio_onBuildEdit;
   //..........................................................
   // @method
   o.clearValue   = FRadio_clearValue;
   o.resetValue   = FRadio_resetValue;
   o.saveValue    = FRadio_saveValue;
   o.text         = FRadio_text;
   o.setText      = FRadio_setText;
   o.refreshStyle = FRadio_refreshStyle;
   return o;
}

//==========================================================
// <T>建立编辑页面控件。</T>
//
// @method
// @param h:hPanel:<HTML> 页面容器
//==========================================================
function FRadio_onBuildEdit(h){
   var o = this;
   var he = o.hEdit = RBuilder.append(h, '<INPUT type=radio name=' + o.dataName + '>');
   he.style.border = 0;
   he.style.cursor = 'hand';
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
   this.hEdit.checked = this.editChecked;
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
