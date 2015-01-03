// ============================================================
// FHtmlEditor
// ============================================================
function FHtmlEditor(o){
   o = RClass.inherits(this, o, FEditControl, MValidator, MEditBorder);
   // Property
   o.editComplete   = RClass.register(o, new TPtyStr('editComplete'));
   o.editCase       = RClass.register(o, new TPtyStr('editCase'));
   o.editPattern    = RClass.register(o, new TPtyStr('editPattern'));
   o.editLength     = RClass.register(o, new TPtyInt('editLength'));
   o.validLenmin    = RClass.register(o, new TPtyStr('validLenmin'));
   o.validLenmax    = RClass.register(o, new TPtyStr('validLenmax'));
   o.editOverflow   = RClass.register(o, new TPtyStr('editOverflow'));
   o.onEditClick    = RClass.register(o, new HClick('onEditClick'), FHtmlEditor_onEditClick);
   o.onCodeClick    = RClass.register(o, new HClick('onCodeClick'), FHtmlEditor_onCodeClick);
   o.onDispClick    = RClass.register(o, new HClick('onDispClick'), FHtmlEditor_onDispClick);
   o.onEditBlur     = RClass.register(o, new HBlur('onEditBlur'), FHtmlEditor_onEditBlur);
   //Attribute
   o.hUnit          = null;
   o.borderStyle    = EBorder.Round;
   // Event
   o.onBuildEdit    = FHtmlEditor_onBuildEdit;
   o.onEditKeyPress = FHtmlEditor_onEditKeyPress;
   o.onBuildControl = FHtmlEditor_onBuildControl;
   //..........................................................
   // @process
   o.oeResize       = FHtmlEditor_oeResize;
   o.oeValid        = FHtmlEditor_oeValid;
   // Method
   o.text           = FHtmlEditor_text;
   o.set            = FHtmlEditor_set;
   o.setText        = FHtmlEditor_setText;
   o.setVisible     = FHtmlEditor_setVisible;
   o.dispose        = FHtmlEditor_dispose;
   o.doResizeEdit   = FHtmlEditor_doResizeEdit;
   o.refreshStyle   = FHtmlEditor_refreshStyle;
   return o;
}
// ------------------------------------------------------------
function FHtmlEditor_doResizeEdit(){
   var o = this;
   var hp = o.hEditDataCell;
   if(hp.offsetWidth){
      o.hEdit.style.pixelWidth = hp.offsetWidth;
      o.hEdit.style.pixelHeight = hp.offsetHeight - 2;
   }
}
// ------------------------------------------------------------
function FHtmlEditor_oeResize(e){
   var o = this;
   var r = o.base.FEditControl.oeResize.call(o, e);
   o.doResizeEdit();
   return r;
}
//------------------------------------------------------------
function FHtmlEditor_oeValid(e){
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
function FHtmlEditor_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.height = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立编辑区
   var hc = o.hEditDataCell = hr.insertCell();
   var h = o.hEdit = RBuilder.append(hc, 'TEXTAREA', o.style('Edit'));
   h.style.display = "none";
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
   var ht = o.hHtml = RBuilder.append(hc, 'SPAN', o.style('Edit'));
   ht.style.wordWrap='break-word';
   ht.style.wordBreak='break-all';
   ht.style.height = o.editHeight;
   ht.style.display = "block";
   // 创建按键；
   var hbr = htb.insertRow();
   var hbf = hbr.insertCell();
   var hbt = o.hButtonForm = RBuilder.appendTable(hbf);
   hbt.width = '100%';
   hbt.height = 20;
   hbt.style.backgroundColor = '#E4EFFD';
   hbt.style.borderTop='1 solid #24C2DB';
   var hbrr = hbt.insertRow();
   // 创建显示按钮
   var hbrc = o.hDispButton = hbrr.insertCell();
   hbrc.width="10%";
   hbrc.style.textAlign = 'center';
   hbrc.style.cursor = 'hand';
   hbrc.innerText = '预览';
   hbrc.style.borderLeft = '1 solid #eeeeee';
   hbrc.style.borderTop = '1 solid #eeeeee';
   hbrc.style.borderBottom = '1 solid #808080';
   hbrc.style.borderRight = '1 solid #808080';
   hbrc.style.backgroundColor = '#eeeeee';
   // 创建代码按钮
   var hbrc = o.hEditButton = hbrr.insertCell();
   hbrc.width="10%";
   hbrc.style.cursor = 'hand';
   hbrc.style.textAlign = 'center';
   hbrc.innerText = '编辑';
   hbrc.style.borderLeft = '1 solid #eeeeee';
   hbrc.style.borderTop = '1 solid #eeeeee';
   hbrc.style.borderBottom = '1 solid #808080';
   hbrc.style.borderRight = '1 solid #808080';
   hbrc.style.backgroundColor = '#eeeeee';
   var hbrc = hbrr.insertCell();
   hbrc.width="80%";
   // 关联事件
   o.attachEvent('onCodeClick', o.hEditButton, o.onCodeClick);
   o.attachEvent('onDispClick', o.hDispButton, o.onDispClick);
}
//------------------------------------------------------------
function FHtmlEditor_onEditClick(e){
   var o = this;
   if (o.hEdit.innerText == o.editTip) {
	   o.hEdit.innerText = '';
	   o.hEdit.style.color = EColor.TextEdit;
   }
}
//------------------------------------------------------------
function FHtmlEditor_onCodeClick(e){
   var o = this;
   o.hEditButton.style.backgroundColor = '#ccc';
   o.hDispButton.style.backgroundColor = '#eee';
   o.hEdit.style.display = 'block';
   o.hEdit.focus();
   o.hHtml.style.display = 'none';
}
//------------------------------------------------------------
function FHtmlEditor_onDispClick(e){
   var o = this;
   o.hEditButton.style.backgroundColor = '#eee';
   o.hDispButton.style.backgroundColor = '#ccc';
   o.hEdit.style.display = 'none';
   o.hHtml.style.display = 'block';
   o.hHtml.innerHTML = "<pre style='font-family: Tahoma;font-size:8pt;'>" + o.hEdit.value + "</pre>";
}
//------------------------------------------------------------
function FHtmlEditor_onEditBlur(e) {
   var o = this;
   if ('' == o.hEdit.innerText && o.editTip) {
	   o.hEdit.innerText = o.editTip;
	   o.hEdit.style.color = '#ccc';
   }
}
//------------------------------------------------------------
function FHtmlEditor_onBuildControl(){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit; 
   }
}
// ------------------------------------------------------------
function FHtmlEditor_onEditKeyPress(e){
   var o = this;
}
// ------------------------------------------------------------
function FHtmlEditor_text(){
   var o = this;
   if(this.hEdit.value == o.editTip) {
      return null;
   }
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FHtmlEditor_setText(text){
   var o = this;
   if(o.editTip && '' == text) {
      o.hEdit.innerText = o.editTip;
      o.hEdit.style.color = '#ccc';
   }else {
	   this.hEdit.value = text;
   }
}
//------------------------------------------------------------
function FHtmlEditor_set(v){
   var o = this;
   o.hEdit.innerText=v;
   if ('I' == o._emode) {
	   o.hHtml.innerHTML=v;
	   o.hEditButton.style.backgroundColor = '#ccc';
	   o.hDispButton.style.backgroundColor = '#eee';
	   o.hEdit.style.display = 'block';
	   o.hHtml.style.display = 'none';
   } else {
	   o.hHtml.innerHTML="<pre style='font-family: Tahoma;font-size:8pt;'>" + v +"</pre>";
	   o.hDispButton.style.backgroundColor = '#ccc';
	   o.hEditButton.style.backgroundColor = '#eee';
	   o.hEdit.style.display = 'none';
	   o.hHtml.style.display = 'block';
   }
}

//------------------------------------------------------------
function FHtmlEditor_refreshStyle(){
   var o = this;
   if(!o._editable){
	  o.hHtml.style.backgroundColor = EColor.Readonly;
	  o.hButtonForm.style.display = 'none';
   } else {
	   o.hHtml.style.backgroundColor = EColor.Edit;
	   o.hButtonForm.style.display = 'block';
   }
}

// ------------------------------------------------------------
function FHtmlEditor_setVisible(v){
   var o = this;
   var r = o.base.FEditControl.setVisible.call(o, v);
   if(v){
      o.doResizeEdit();
   }
   return r;
}
// ------------------------------------------------------------
function FHtmlEditor_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = null;
}
// ------------------------------------------------------------
