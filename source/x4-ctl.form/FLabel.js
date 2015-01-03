//==========================================================
// <T>文本控件。</T>
//
// @class FEditControl
// @history 091111 MAOCY 创建
//==========================================================
function FLabel(o){
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @event
   o.onBuildEdit  = FLabel_onBuildEdit;
   //..........................................................
   // @method
   o.text         = FLabel_text;
   o.setText      = FLabel_setText;
   o.refreshStyle = RMethod.empty;
   return o;
}

//==========================================================
// <T>建立编辑框。</T>
//
// @method
//==========================================================
function FLabel_onBuildEdit(){
   var o = this;
   o.hEdit = o.hEditCell;
   if(o.dataDefault){
      o.hEdit.innerHTML = RString.nvl(o.dataDefault);
   }
}

//==========================================================
// <T>获取文本内容。</T>
//
// @method
// @return String 文本内容
//==========================================================
function FLabel_text(){
   return this.hEdit.innerText;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FLabel_setText(t){
   this.hEdit.innerHTML = RString.nvl(t);
}
