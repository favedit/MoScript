// ============================================================
// FWindowConsole
// ============================================================
function FWindowConsole(o, create){
   if(!create){return this;}
   o = IClass.inherits(this, o, FConsole);
   // Attribute
   o.activeWindow = null;
   o.windows      = null;
   o.defines      = null;
   // Method
   o.construct    = FWindowConsole_construct;
   o.create       = FWindowConsole_create;
   o.loadDefine   = FWindowConsole_loadDefine;
   return o;

   o.focusWinCtl = null;
   o.activeForm = null;
   o.activeControl = null;
   o.maxFlag = false;
   o.m_oDefinePool = new FList();
   o.clientWindow = null;
   // Constant
   o.EVENT_MAX = 101;
   o.EVENT_CLOSE = 102;
   o.EVENT_CLOSEALL = 103;
   // Event
   this.onEventMousedown = FWindowConsole_onEventMousedown;
   this.onSaveDefineAfter = FWindowConsole_onSaveDefineAfter;
   this.onEventRelease = FWindowConsole_onEventRelease;
   this.initialize = FWindowConsole_initialize;
   this.hasWindow = FWindowConsole_hasWindow;
   this.focus = FWindowConsole_focus;
   this.saveDefine = FWindowConsole_saveDefine;
   this.findWindow = FWindowConsole_findWindow;
   this.releaseWindowName = FWindowConsole_releaseWindowName;
   this.releaseWindow = FWindowConsole_releaseWindow;
   this.doFrameAction = FWindowConsole_doFrameAction;
   this.setMaxWindow = FWindowConsole_setMaxWindow;
   this.restore = FWindowConsole_restore;
   this.doProperties = FWindowConsole_doProperties;
   this.clear = FWindowConsole_clear;
   this.hideAll = FWindowConsole_hideAll;
   this.dump = FWindowConsole_dump;
   return this;
}
// ------------------------------------------------------------
function FWindowConsole_construct(){
   this.windows = new TList();
   this.defines = new TNameList();
}
// ------------------------------------------------------------
function FWindowConsole_create(name, hWin){
   var config = this.loadDefine(name);

   var win = IClass.create(FWindow);

   //var win = IControl.create(config);
   
IDump.dump(_id1, win);

   win.linkHtml(window);
   win.build();
   return win;

   if(this.windowList.isEmpty()){
      MoveManager.resetPosition();
   }
   var oWindow = new FCfgWindowCtl();
   oWindow.name = sWinName;
   oWindow.clientWindow = oClientWindow;
   if(sWinName){
      oWindow.show();
      oWindow.focus();
      if(this.maxFlag){oWindow.max();}
      this.windowList.add(sWinName, oWindow);
   }
   return oWindow;
}
// ------------------------------------------------------------
function FWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);

      var cnn = new TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);

      return doc.root();

      // Find node
      var oNode = null;
      var sNodeName = null;
      var arNodes = oConnect.rootNode.nodes;
      for(var n=0; n<arNodes.length; n++){
         var oNode = arNodes[n];
         sNodeName = oNode.name.toLowerCase();
         if(sNodeName == 'window'){
            var sFullName = oNode.attribute('name');
            this.m_oDefinePool.setNameValue(sFullName, oNode);
            if(sFullName == sWinName){
               oWinNode = oNode;
            }
         }else if(sNodeName == 'dataset'){
            DatasetManager.addDefine(oNode.attribute('name'), oNode);
         }else if(sNodeName == 'searchlist'){
            SearchManager.addDefine(oNode);
         }
      }
   }
   if(!config){
      return ILogger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}


// ------------------------------------------------------------
function FWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
// ------------------------------------------------------------
function FWindowConsole_clear(){
   this.focusWinCtl = null;
   this.activeWindow = null;
   this.activeForm = null;
   this.activeControl = null;
   this.m_oDefinePool = new FList();
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      this.windowList.value(n).release();
   }
   this.windowList = new FList();
   IEngine.process(this, this.EVENT_CLOSEALL);
}
// ------------------------------------------------------------
function FWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
// ------------------------------------------------------------
function FWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
// ------------------------------------------------------------
function FWindowConsole_restore(){
   var nSize = this.windowList.size();
   this.hideAll(null, true);
   for(var n=0; n<nSize; n++){
      var oWin = this.windowList.value(n);
      if(oWin.maxFlag){
         this.windowList.value(n).restore();
      }
   }
   this.maxFlag = false;
}
// ------------------------------------------------------------
function FWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
// ------------------------------------------------------------
function FWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
// ------------------------------------------------------------
function FWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
// ------------------------------------------------------------
function FWindowConsole_saveDefine(oWinNode, oClientWindow){
   if(oClientWindow){this.clientWindow.document.body.disabled = true;}
   if(!oWinNode){
      return LoggerUtil.fatal(this, 'saveDefine', 'Window node is null.');
   }
   var sFullName = oWinNode.attribute('full_name');
   if(!sFullName){
      return ILogger.fatal(this, 'saveDefine', 'Window full name is null.');
   }
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode('Action');
   oActNode.setAttribute('name', 'define.save');
   oDoc.rootNode.push(oWinNode);
   // Connect
   var oConnect = new FXMLConnect(SystemManager.serviceURL('window'), oDoc);
   oConnect.clientWindow = oClientWindow;
   oConnect.onload = this.onSaveDefineAfter;
   oConnect.send();
}
// ------------------------------------------------------------
function FWindowConsole_onEventMousedown(oCWin){
}
// ------------------------------------------------------------
function FWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
// ------------------------------------------------------------
function FWindowConsole_findWindow(sWinName){
   return this.windowList.nameValue(sWinName);
}
// ------------------------------------------------------------
function FWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
function FWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
function FWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
// ------------------------------------------------------------
function FWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
// ------------------------------------------------------------
function FWindowConsole_onEventRelease(oCWin){
   if(oCWin){
      var oSubWin = null;
      var oRemoves = new Array();
      var nSize = this.windowList.size();
      for(var n=0; n<nSize; n++){
         oSubWin = this.windowList.value(n);
         if(oSubWin.clientWindow == oCWin){
            if(oSubWin == MoveManager.focusBorder){
               MoveManager.focus(null);
            }
            oRemoves.push(oSubWin);
         }
      }
      for(var n=0; n<oRemoves.length; n++){
         this.windowList.removeValue(oRemoves[n]);
      }
   }else{
      this.windowList.clear();
      MoveManager.focus(null);
   }
}
