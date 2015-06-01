// ============================================================
// FMessageBox
// ============================================================
function FMessageBox(o){
   o = RClass.inherits(this, o, FContainer);
   // Attribute
   o.items          = new TList();
   o.dataEmpty      = true;
   o.type           = null;
   // Html
   o.hForm          = null;
   o.hMessages      = null;
   // Html Event
   o.ohCloseClick   = FMessageBox_ohCloseClick;
   o.ohOkClick      = FMessageBox_ohOkClick;
   o.ohCancelClick  = FMessageBox_ohCancelClick;
   o.ohCopyClick    = FMessageBox_ohCopyClick;
   // Process
   o.oeBuild        = FMessageBox_oeBuild;
   // Event
   o.onBuildPanel   = FMessageBox_onBuildPanel;
   o.onBuildMessage = FMessageBox_onBuildMessage;
   o.onBuildButton  = FMessageBox_onBuildButton;
   // Method
   o.loadConfig     = FMessageBox_loadConfig;
   o.saveConfig     = FMessageBox_saveConfig;
   o.loadMessages   = FMessageBox_loadMessages;
   o.dispose        = FMessageBox_dispose;
   return o;
}
// ------------------------------------------------------------
function FMessageBox_ohCloseClick(){
   RConsole.find(FMessageConsole).closeMessage();
}
// ------------------------------------------------------------
function FMessageBox_ohOkClick(){
}
// ------------------------------------------------------------
function FMessageBox_ohCancelClick(){
}
// ------------------------------------------------------------
function FMessageBox_ohCopyClick(){
}
// ------------------------------------------------------------
function FMessageBox_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   // Form (2colx1row)
   var hTab = RBuilder.appendTable(this.hPanel);
   hTab.width = '100%';
   hTab.height = '100%';
   var hRow = hTab.insertRow();
   // Message Panel
   o.MessagePanel = hRow.insertCell();
   o.onBuildMessage();
   // Button Panel
   var h = o.ButtonPanel = hRow.insertCell();
   h.className = o.style('ButtonPanel');
   o.onBuildButton();
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMessageBox_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
// ------------------------------------------------------------
function FMessageBox_onBuildMessage(){
   var o = this;
   var hTab = o.hForm = RBuilder.appendTable(o.MessagePanel);
   hTab.cellPadding = 2;
   hTab.className = this.style('Panel');
   // Message Caption
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Message:';
   // Messages
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Message');
   o.hMessages = RBuilder.appendTable(hCel);
   o.hMessages.width = '100%';
   // Description Caption
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Description:';
   // Description
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Description');
}
// ------------------------------------------------------------
function FMessageBox_onBuildButton(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.ButtonPanel);
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   //hCel.height = 8;
   // Button - Close
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.align = 'center';
   var h = o.hOk = RBuilder.append(hCel, 'DIV', o.style('Button'));
   h.innerText = 'Close';
   h.onclick = o.ohCloseClick;
   // Button - Cancel
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.align = 'center';
   var h = o.hCancel = RBuilder.append(hCel, 'DIV', o.style('Button'));
   h.innerText = 'Cancel';
   h.onclick = o.ohCloseClick;
   // Button - Copy
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.align = 'center';
   var h = o.hCopy = RBuilder.append(hCel, 'DIV', o.style('Button'));
   h.innerText = 'Copy';
   h.onclick = o.ohCloseClick;
   // End line
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.innerHTML = '&nbsp;';
}
// ------------------------------------------------------------
function FMessageBox_loadConfig(config){
   var o = this;
   o.base.FContainer.loadConfig.call(o, config);
   o.dataEmpty = RBool.isTrue(config.get('data_empty'));
   return EStatus.Stop;
}
// ------------------------------------------------------------
function FMessageBox_saveConfig(config){
   this.base.FContainer.saveConfig.call(this, config)
   config.set('data_empty', RBool.toString(this.dataEmpty));
}
// ------------------------------------------------------------
function FMessageBox_loadMessages(messages){
   var o = this;
   RHtml.clear(o.hMessages);
   if(messages){
      var msgs = messages.items;
      for(var n=0; n<msgs.count; n++){
         var msg = msgs.get(n);
         if(msg){
            var hRow = o.hMessages.insertRow();
            // Icon
            var hCell = hRow.insertCell();
            hCell.className = o.style('MessageIcon');
            RBuilder.appendIcon(hCell, msg.icon());
            // Icon
            var hCell = hRow.insertCell();
            hCell.className = o.style('MessageText');
            RBuilder.appendText(hCell, msg.message);
         }
      }
      o.type = messages.type();
   }
}
// ------------------------------------------------------------
function FMessageBox_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hItmeForm);
   RMemory.freeHtml(o.hDescBody);
   RMemory.freeHtml(o.hDescDiv);
   o.hForm           = null;
   o.hCopy           = null;
   o.hMessages       = null;
}
// ------------------------------------------------------------
