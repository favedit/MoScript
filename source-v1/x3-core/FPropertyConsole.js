// ============================================================
// FPropertyManager
// ============================================================
function FPropertyManager(){
   this.className = 'FPropertyManager';
   // Attribute
   this.m_oPropertyList = new FList();
   // Event
   this.onLoadDefineAfter = mgr_pty_onLoadDefineAfter;
   this.onLoadValueAfter = mgr_pty_onLoadValueAfter;
   this.onSaveValueAfter = mgr_pty_onSaveValueAfter;
   // Method
   this.loadDefine = mgr_pty_loadDefine;
   this.loadValue = mgr_pty_loadValue;
   this.saveValue = mgr_pty_saveValue;
   return this;
}
// ------------------------------------------------------------
function mgr_pty_loadDefine(oPtyCtl, sName){
   var oPtyNode = this.m_oPropertyList.nameValue(sName);
   if(oPtyNode){
      oPtyCtl.onLoadDefineAfter(oPtyNode);
   }else{
      oPtyCtl.disableWindow();
      //
      var oDoc = new FXMLDocument('Config');
      var oActNode = oDoc.rootNode.createNode('Action');
      oActNode.value = 'property.define';
      var oDefNode = oDoc.rootNode.createNode('Property');
      oDefNode.setAttribute('name', sName);
      // Load Property define
      var oConnect = new FXMLConnect(SystemManager.serviceURL('sys.pty'), oDoc);
      oConnect.propertyControl = oPtyCtl;
      oConnect.propertyName = sName;
      oConnect.propertyList = this.m_oPropertyList;
      oConnect.onload = this.onLoadDefineAfter;
      oConnect.send();
   }
}
// ------------------------------------------------------------
function mgr_pty_onLoadDefineAfter(){
   var oPtyNode = null;
   var arNodes = this.rootNode.nodes;
   if(arNodes){
      for(var n=0; n<arNodes.length; n++){
         var oNode = arNodes[n];
         if(IString.equals(oNode.name, 'propertyconfig')){
            var sItemName = oNode.attribute('name');
            this.propertyList.setNameValue(sItemName, oNode);
            if(IString.equals(sItemName, this.propertyName)){
               oPtyNode = oNode;
            }
         }
      }
   }
   if(oPtyNode){
      this.propertyControl.onLoadDefineAfter(oPtyNode);
   }else{
      ILogger.fatal(this, 'loadDefine', 'Not find Property define: ' + sPtyName);
   }
   this.propertyControl.enableWindow();
}
// ------------------------------------------------------------
function mgr_pty_loadValue(oPtyCtl, sService, sPtyType, sPtyId){
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode("Action");
   oActNode.value = 'property.value.load';
   var oPtyDefNode = oDoc.rootNode.createNode("PropertyValue");
   oPtyDefNode.setAttribute('pty_type', sPtyType);
   oPtyDefNode.setAttribute('pty_id', sPtyId);
   // Load Property define
   var oConnect = new FXMLConnect(sService, oDoc);
   oConnect.propertyControl = oPtyCtl;
   oConnect.propertyType = sPtyType;
   oConnect.propertyId = sPtyId;
   oConnect.onload = this.onLoadValueAfter;
   oConnect.send();
}
// ------------------------------------------------------------
function mgr_pty_onLoadValueAfter(){
   var oValNode = null;
   var arNodes = this.rootNode.nodes;
   if(arNodes){
      for(var n=0; n<arNodes.length; n++){
         var oNode = arNodes[n];
         if(IString.equals(oNode.attribute('pty_type'), this.propertyType) &&
            IString.equals(oNode.attribute('pty_id'), this.propertyId)){
            oValNode = oNode;
         }
      }
   }
   if(oValNode){
      this.propertyControl.onLoadValueAfter(oValNode);
   }else{
      ILogger.fatal(this, 'loadValue', 'Not load ' + this.propertyType + ' value: ' + this.propertyId);
   }
}
// ------------------------------------------------------------
function mgr_pty_saveValue(oPtyCtl, sService, oPtyNode){
   oPtyCtl.clientWindow.document.body.disabled = true;
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode("Action");
   oActNode.value = 'property.value.save';
   oDoc.rootNode.push(oPtyNode);
   // Save property value
   var oConnect = new FXMLConnect(sService, oDoc);
   oConnect.ptyCtl = oPtyCtl;
   oConnect.clientWindow = oPtyCtl.clientWindow;
   oConnect.onload = this.onSaveValueAfter;
   oConnect.send();
}
// ------------------------------------------------------------
function mgr_pty_onSaveValueAfter(){
   this.ptyCtl.enableWindow();
}
