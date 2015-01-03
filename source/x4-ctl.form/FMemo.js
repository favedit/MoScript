// ============================================================
// FMemo
// ============================================================
function FMemo(o){
   o = RClass.inherits(this, o, FEditControl, MValidator, MEditBorder);
   // Property
   o.editComplete   = RClass.register(o, new TPtyStr('editComplete'));
   o.editCase       = RClass.register(o, new TPtyStr('editCase'));
   o.editPattern    = RClass.register(o, new TPtyStr('editPattern'));
   o.editLength     = RClass.register(o, new TPtyInt('editLength'));
   o.validLenmin    = RClass.register(o, new TPtyStr('validLenmin'));
   o.validLenmax    = RClass.register(o, new TPtyStr('validLenmax'));
   o.editOverflow   = RClass.register(o, new TPtyStr('editOverflow'));
   o.onEditClick    = RClass.register(o, new HClick('onEditClick'), FMemo_onEditClick);
   o.onEditBlur     = RClass.register(o, new HBlur('onEditBlur'), FMemo_onEditBlur);
   //Attribute
   o.hUnit          = null;
   o.borderStyle    = EBorder.Round;
   // Event
   o.onBuildEdit    = FMemo_onBuildEdit;
   o.onEditKeyPress = FMemo_onEditKeyPress;
   o.onBuildControl = FMemo_onBuildControl;
   //..........................................................
   // @process
   o.oeResize       = FMemo_oeResize;
   o.oeValid        = FMemo_oeValid;
   // Method
   o.text           = FMemo_text;
   o.setText        = FMemo_setText;
   o.setVisible     = FMemo_setVisible;
   o.dispose        = FMemo_dispose;
   o.doResizeEdit   = FMemo_doResizeEdit;
   return o;
}
// ------------------------------------------------------------
function FMemo_doResizeEdit(){
   var o = this;
   var hp = o.hEditDataCell;
   if(hp.offsetWidth){
      o.hEdit.style.pixelWidth = hp.offsetWidth;
      o.hEdit.style.pixelHeight = hp.offsetHeight - 2;
   }
}
// ------------------------------------------------------------
function FMemo_oeResize(e){
   var o = this;
   var r = o.base.FEditControl.oeResize.call(o, e);
   o.doResizeEdit();
   return r;
}
// ------------------------------------------------------------
function FMemo_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.height = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell());
   // 建立编辑区
   var hc = o.hEditDataCell = hr.insertCell();
   var h = o.hEdit = RBuilder.append(hc, 'TEXTAREA', o.style('Edit'));
   o.attachEvent('onEditClick', o.hEdit, o.onEditClick);
   o.attachEvent('onEditBlur', o.hEdit, o.onEditBlur);
   b.hPanel.style.border = '1 solid #FFFFFF';
   h.style.overflowY = 'auto';
   if(RBoolean.isTrue(o.editOverflow)){
      h.wrap = 'off';
      h.style.overflowX = 'auto';
   }else{
      h.wrap = 'soft';
      h.style.overflowX = 'hidden';
   }
}
//------------------------------------------------------------
function FMemo_onEditClick(e){
   var o = this;
   if (o.hEdit.innerText == o.editTip) {
	   o.hEdit.innerText = '';
	   o.hEdit.style.color = EColor.TextEdit;
   }
}
//------------------------------------------------------------
function FMemo_onEditBlur(e) {
   var o = this;
   if ('' == o.hEdit.innerText && o.editTip) {
	   o.hEdit.innerText = o.editTip;
	   o.hEdit.style.color = '#ccc';
   }
}
//------------------------------------------------------------
function FMemo_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit; 
   }
}
// ------------------------------------------------------------
function FMemo_onEditKeyPress(e){
   var o = this;
   //o.base.FEditControl.onEditKeyPress.call(o, e);
   //if(o.editCase){
      //RKey.fixCase(e, o.editCase);
   //}
}
// ------------------------------------------------------------
function FMemo_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   // 判断是否需要检查
   if(o._visible){
      var t = o.text();
      // 必须性检查
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      // 最大长度检查
      if(!RValidator.validTextLength(o, t, o.validLenmax)){
    	  e.controls.push(o);
          return r;
      }
   }
   return r;
}
// ------------------------------------------------------------
function FMemo_text(){
   var o = this;
   if(this.hEdit.value == o.editTip) {
      return null;
   }
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FMemo_setText(text){
   var o = this;
   if(o.editTip && '' == text) {
      o.hEdit.innerText = o.editTip;
      o.hEdit.style.color = '#ccc';
   }else {
	   this.hEdit.value = text;
   }
}
// ------------------------------------------------------------
function FMemo_setVisible(v){
   var o = this;
   var r = o.base.FEditControl.setVisible.call(o, v);
   if(v){
      o.doResizeEdit();
   }
   return r;
}
// ------------------------------------------------------------
function FMemo_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = null;
}
// ------------------------------------------------------------
