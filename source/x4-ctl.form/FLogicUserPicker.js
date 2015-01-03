// ============================================================
// FMemo
// ============================================================
function FLogicUserPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   // Property
   o.service        = RClass.register(o, new TPtyStr('service', 'logic.webform.weblogic'));
   o.editStyle      = RClass.register(o, new TPtyBool('editStyle', false));
   o.onButtonClick  = RClass.register(o, new HClick('onButtonClick'), FLogicUserPicker_onButtonClick);
   o.onButtonEnter  = RClass.register(o, new HMouseEnter('onButtonEnter'), FLogicUserPicker_onButtonEnter);
   o.onButtonLeave  = RClass.register(o, new HMouseLeave('onButtonLeave'), FLogicUserPicker_onButtonLeave);
   o.onEditClick    = RClass.register(o, new HClick('onEditClick'), FLogicUserPicker_onEditClick);
   o.onEditBlur     = RClass.register(o, new HBlur('onEditBlur'), FLogicUserPicker_onEditBlur);
   //Attribute
   o.hUnit          = null;
   o.lable          = null;
   o.borderStyle    = EBorder.Round;
   // Event
   o.onBuildEdit    = FLogicUserPicker_onBuildEdit;
   o.onEditKeyPress = FLogicUserPicker_onEditKeyPress;
   o.onDataLoaded   = FLogicUserPicker_onDataLoaded;
   // Method
   o.formatValue    = FLogicUserPicker_formatValue;
   o.text           = FLogicUserPicker_text;
   o.setText        = FLogicUserPicker_setText;
   o.appendItem     = FLogicUserPicker_appendItem;
   o.validText      = RMethod.empty;
   o.set            = FLogicUserPicker_set;
   o.get            = FLogicUserPicker_get;
   o.reget          = FLogicUserPicker_reget;
   o.refreshStyle   = FLogicUserPicker_refreshStyle;
   o.dispose        = FLogicUserPicker_dispose;
   return o;
}

//==========================================================
//<T>鼠标进入按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FLogicUserPicker_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	   o.hButton.style.cursor='hand';
	   o.hButton.title ='click here to translate the user information';
   }
}

//==========================================================
//<T>鼠标离开按键事件。</T>
//
//@method
//@param event:event:TEvent
//@return EEventStatus.Stop
//==========================================================
function FLogicUserPicker_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	   o.hButton.style.cursor='default';
   }
}

// ------------------------------------------------------------
function FLogicUserPicker_onBuildEdit(b){

   var o = this;
   var h  = RBuilder.appendTable(b.hPanel);
   h.width = '100%';
   h.height = '100%';
   var hr0 = h.insertRow();
   var hc0 = hr0.insertCell();
   var htb = RBuilder.appendTable(hc0);
   htb.style.tableLayout = 'fixed';
   htb.width = '100%';
   htb.height = '100%';
   var hrr = htb.insertRow();
   hrr.height = 36;
   hrr.bgColor = EColor.Readonly;
   // 内容
   var hc01 =  hrr.insertCell();
   hc01.width = '100%';
   var hdv = o.hText = RBuilder.appendDiv(hc01);
   hdv.style.overflow = 'auto';
   hdv.style.width = '100%';
   hdv.style.height = '100%';
   // 按钮
   var hc02 = hrr.insertCell();
   hc02.width = 36;
   hc02.align = 'center';
   hc02.vAlign = 'middle';
   var ig = o.hButton = RBuilder.appendIcon(hc02, o.styleIcon('check'), null, 24, 24);
   o.linkEvent(o, 'onButtonClick', ig);
   o.linkEvent(o, 'onButtonEnter', ig);
   o.linkEvent(o, 'onButtonLeave', ig);
   // 建立中间的横向分割线
   var hc = h.insertRow().insertCell();
   hc.height = 1;
   hc.bgColor = '#24C2DB';
   // 下面的输入区
   var hr2 = h.insertRow();
   var hc2 = hr2.insertCell();
   if(!o.editStyle){
      hc2.height = 36;
      var hx2 = o.hEdit = RBuilder.append(hc2, 'TEXTAREA', o.style('Edit'));
      hx2.wrap = 'soft';
      hx2.style.overflowX = 'hidden';
   }else{
      var hx2 = o.hEdit = RBuilder.append(hc2, 'INPUT', o.style('Edit'));
      hx2.wrap = 'soft';
      hx2.style.overflowX = 'hidden';
   }
   o.attachEvent('onEditClick', o.hEdit, o.onEditClick);
   o.attachEvent('onEditBlur', o.hEdit, o.onEditBlur);
   // 图片路径
   o.userSrc = o.styleIconPath('user', FLogicUserPicker);
   o.femaleSrc = o.styleIconPath('userFemale', FLogicUserPicker);
   o.errorSrc = o.styleIconPath('unknown', FLogicUserPicker);
   o.orgSrc = o.styleIconPath('organization', FLogicUserPicker);
   o.dutySrc = o.styleIconPath('duty', FLogicUserPicker);
   o.roleSrc = o.styleIconPath('role', FLogicUserPicker);
   o.userUk = o.styleIconPath('userUk', FLogicUserPicker);
}
//------------------------------------------------------------
function FLogicUserPicker_onEditClick(e){
   var o = this;
   if (o.hEdit.innerText == o.editTip) {
	   o.hEdit.innerText = '';
	   o.hEdit.style.color = EColor.TextEdit;
   }
}
//------------------------------------------------------------
function FLogicUserPicker_onEditBlur(e) {
   var o = this;
   if ('' == o.hEdit.innerText && o.editTip) {
	   o.hEdit.innerText = o.editTip;
	   o.hEdit.style.color = '#ccc';
   }
}
// ------------------------------------------------------------
function FLogicUserPicker_onEditKeyPress(e){
   var o = this;
   o.base.FEditControl.onEditKeyPress.call(o, e);
}
// ------------------------------------------------------------
function FLogicUserPicker_formatValue(s){
   return RString.nvl(s);
}
// ------------------------------------------------------------
function FLogicUserPicker_text(){
   return this.hEdit.value;
}
// ------------------------------------------------------------
function FLogicUserPicker_setText(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FLogicUserPicker_set(v){
   var o = this;
   o.hText.innerHTML = '';
   if( !RString.isEmpty(v) ){
      if( !RString.contains(v, '|') ){
         o.hEdit.innerText = v;
         return;
      }
      var vs = RString.splitTwo(v, '|');
      var strs = new TStrings();
      strs.unpack(vs[1]);
      var ss = RString.split(vs[1], ';');
      if( !ss || !ss.length ){
         return;
      }
      var ssl = ss.length;
      for(var n=0; n<ssl; n++){
         var s = ss[n];
         var t = new TAttributes();
         t.unpack(s);
         var spp = RBuilder.append(o.hText, 'SPAN');
         spp.noWrap = false;
         spp.title = t.get('label')+'('+t.get('workNumber')+')';
         var ig = RBuilder.append(spp, 'IMG');
         ig.align = 'absmiddle';
         var sp = RBuilder.append(spp, 'SPAN');
         var s = t.get('label');
         var m = t.get('gender');
         sp.innerText = ' ' + s + (n<ssl-1 ? '; ' : '');
         o.hText.appendChild(spp);
         switch(t.get('type')){
            case 'U':
               if(m == 'M'){
                  ig.src = o.userSrc;
               }else if(m == 'F'){
                  ig.src = o.femaleSrc;
               }else{
                  ig.src = o.userUk;
               }
               break;
            case 'O':
               ig.src = o.orgSrc;
               break;
            case 'D':
               ig.src = o.dutySrc;
               break;
            case 'R':
               ig.src = o.roleSrc;
               break;
         }
      }
      o.hEdit.innerText = vs[0];
   }else{
      if(o.editTip){
    	  o.hEdit.innerText = o.editTip;
      }else {
    	   o.hEdit.innerText = "";
      }
   }
}
// ------------------------------------------------------------
function FLogicUserPicker_get(){
   var o = this;
   if(this.hEdit.value == o.editTip) {
	  return null;
   }
   var s = RString.nvl(this.hEdit.value);
   s = RString.trim(s);
   s = RString.removeChars(s, '\n');
   return s.replace(/；/g, ';');
}
// ------------------------------------------------------------
function FLogicUserPicker_reget(){
   return this.get();
}
// ------------------------------------------------------------
function FLogicUserPicker_onButtonClick(e){
   var o = this;
   var text = o.get();
//   var ss = '';
//   var vs = RString.split(text, ';');
//   var ct = vs.count;
//   for(var n = 0; n < ct; n++){
//      if(!RString.isEmpty(vs[n])){
//         ss += vs[n] + ';';
//      }
//   }
   if(!RString.isEmpty(text)){
      var doc = new TXmlDocument();
      var root = doc.root();
      root.set('action', 'userPicker');
      var d = root.create('Data');
      d.value = text;
      var url = RService.url(o.service);
      var e = new TEvent(o, EXmlEvent.Send, o.onDataLoaded);
      e.url = url;
      e.document = doc;
      e.action = 'userPicker';
      RConsole.find(FXmlConsole).process(e);
   }else{
      o.hText.innerHTML = '';
   }
   
//   if( !RString.isEmpty(text) ){
//      var doc = new TXmlDocument();
//      var root = doc.root();
//      root.set('action', 'userPicker');
//      var d = root.create('Data');
//      d.value = text;
//      var url = RService.url('logic.webform.weblogic');
//      var e = new TEvent(o, EXmlEvent.Send, o.onDataLoaded);
//      e.url = url;
//      e.document = doc;
//      e.action = 'userPicker';
//      RConsole.find(FXmlConsole).process(e);
//   }
}
//------------------------------------------------------------
function FLogicUserPicker_onDataLoaded(e){
   var o = this;
   o.hText.innerHTML = '';
   var root = e.document.root();
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(root))){
      return;
   }
   if(root.hasNode()){
      var nds = root.nodes;
      var ct = nds.count;
      for(var n = 0; n < ct; n++){
         var nd = nds.get(n);
         if(nd.hasNode()){
            var nns = nd.nodes;
            var nnt = nns.count;
            var h = o.hText;
            for(var k=0; k<nnt; k++){
               o.appendItem(nns.get(k), k<nnt-1);
            }
         }
      }
   }
}
//------------------------------------------------------------
function FLogicUserPicker_appendItem(nd, isLast){
   var o = this;
   var h  = o.hText;
   var name = null;
   var spp = RBuilder.append(h, 'SPAN');
   spp.title = nd.get('label')+'('+nd.get('workNumber')+')';
   spp.noWrap = false;
   var ig = RBuilder.append(spp, 'IMG');
   ig.align = 'absmiddle';
   var sp = RBuilder.append(spp, 'SPAN');
   var s = RString.nvl(nd.get('label'), nd.get('message'));
   sp.innerText = ' ' + s + (isLast ? '; ' : '');
   switch(nd.name){
      case 'User':
         var sm = nd.get("gender");
         if(sm == 'M'){
            ig.src = o.userSrc;
         }else if(sm == 'F'){
            ig.src = o.femaleSrc;
         }else{
            ig.src = o.userUk;
         }
         break;
      case 'Unknown':
         ig.src = o.errorSrc;
         spp.title = '记录不存在';
         break;
      case 'Organization':
         ig.src = o.orgSrc;
         break;
      case 'Duty':
         ig.src = o.dutySrc;
         break;
      case 'Role':
         ig.src = o.roleSrc;
         break;
   }
}

//------------------------------------------------------------
function FLogicUserPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   var t = o.hEdit.innerText;
   if(!RString.isEmpty(t)){
      if(t == o.editTip){
    	  o.hEdit.style.color = '#CCCCCC';
      }
   }
   o.hButton.style.display = o._editable ? "block":"none";
}

//------------------------------------------------------------
function FLogicUserPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = null;
   o.hButton = null;
   o.hText = null;
   o.userSrc = null;
   o.femaleSrc = null;
   o.errorSrc = null;
   o.orgSrc = null;
   o.dutySrc = null;
   o.roleSrc = null;
   o.userUk = null;
}
