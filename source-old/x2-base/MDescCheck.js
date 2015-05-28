//==========================================================
// <T>复选框接口。</T>
//
// @manager
// @history 091105 MAOCY 创建
//==========================================================
function MDescCheck(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o.editTrue   = RClass.register(o, new TPtyStr('editTrue'), EBoolean.True);
   o.editFalse  = RClass.register(o, new TPtyStr('editFalse'), EBoolean.False);
   //..........................................................
   // @method
   o.clearValue = MDescCheck_clearValue;
   o.resetValue = MDescCheck_resetValue;
   o.text       = MDescCheck_text;
   o.setText    = MDescCheck_setText;
   return o;
}

//==========================================================
// <T>清除数据。</T>
//
// @method
//==========================================================
function MDescCheck_clearValue(){
   this.set(this.editFalse);
}

//==========================================================
// <T>重置数据。</T>
//
// @method
//==========================================================
function MDescCheck_resetValue(){
   this.set(this.dataDefault);
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return 文本内容
//==========================================================
function MDescCheck_text(){
   return this.hEdit.checked ? this.editTrue : this.editFalse;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function MDescCheck_setText(t){
   this.hEdit.checked = (this.editTrue == t);
}
