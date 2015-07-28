//==========================================================
// <T>窗口台控制器。</T>
//
// @console
// @author maocy
// @history 150329
//==========================================================
MO.FDuiWindowConsole = function FDuiWindowConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd      = MO.EScope.Local;
   //..........................................................
   // @attribute
   o._activeWindow = null;
   o._windows      = null;
   //..........................................................
   // @method
   o.construct    = MO.FDuiWindowConsole_construct;
   // @method
   o.create       = MO.FDuiWindowConsole_create;
   o.find         = MO.FDuiWindowConsole_find;
   //o.loadDefine   = FDuiWindowConsole_loadDefine;
   //o.focusWinCtl = null;
   //o.activeForm = null;
   //o.activeControl = null;
   //o.maxFlag = false;
   //o.m_oDefinePool = new FList();
   //o.clientWindow = null;
   // Constant
   //o.EVENT_MAX = 101;
   //o.EVENT_CLOSE = 102;
   //o.EVENT_CLOSEALL = 103;
   // Event
   //o.onEventMousedown = FDuiWindowConsole_onEventMousedown;
   //o.onSaveDefineAfter = FDuiWindowConsole_onSaveDefineAfter;
   //o.onEventRelease = FDuiWindowConsole_onEventRelease;
   //o.initialize = FDuiWindowConsole_initialize;
   //o.hasWindow = FDuiWindowConsole_hasWindow;
   //o.focus = FDuiWindowConsole_focus;
   //o.saveDefine = FDuiWindowConsole_saveDefine;
   //o.releaseWindowName = FDuiWindowConsole_releaseWindowName;
   //o.releaseWindow = FDuiWindowConsole_releaseWindow;
   //o.doFrameAction = FDuiWindowConsole_doFrameAction;
   //o.setMaxWindow = FDuiWindowConsole_setMaxWindow;
   //o.restore = FDuiWindowConsole_restore;
   //o.doProperties = FDuiWindowConsole_doProperties;
   //o.clear = FDuiWindowConsole_clear;
   //o.hideAll = FDuiWindowConsole_hideAll;
   //o.dump = FDuiWindowConsole_dump;
   return this;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FDuiWindowConsole_construct = function FDuiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._windows = new MO.TDictionary();
}

//==========================================================
// <T>根据类型创建窗口。</T>
//
// @method
//==========================================================
MO.FDuiWindowConsole_create = function FDuiWindowConsole_create(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
   instance.buildDefine(MO.Window._hDocument);
   return instance;
}

//==========================================================
// <T>根据类型查找窗口。</T>
//
// @method
//==========================================================
MO.FDuiWindowConsole_find = function FDuiWindowConsole_find(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var find = o._windows.get(name);
   if(find){
      return find;
   }
   // 创建窗口
   var instance = o.create(clazz);
   o._windows.set(name, instance);
   return instance;
}



// ------------------------------------------------------------
MO.FDuiWindowConsole_loadDefine = function FDuiWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new MO.TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);

      var cnn = new MO.TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);
      doc.root();

      // Find node
      //var oNode = null;
      //var sNodeName = null;
      //var arNodes = oConnect.rootNode.nodes;
      //for(var n=0; n<arNodes.length; n++){
      //   var oNode = arNodes[n];
      //   sNodeName = oNode.name.toLowerCase();
      //   if(sNodeName == 'window'){
      //      var sFullName = oNode.attribute('name');
      //      this.m_oDefinePool.setNameValue(sFullName, oNode);
      //      if(sFullName == sWinName){
      //         oWinNode = oNode;
      //      }
      //   }else if(sNodeName == 'dataset'){
      //      DatasetManager.addDefine(oNode.attribute('name'), oNode);
      //   }else if(sNodeName == 'searchlist'){
      //      SearchManager.addDefine(oNode);
      //   }
      //}
   }
   if(!config){
      return MO.Logger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}


// ------------------------------------------------------------
MO.FDuiWindowConsole_dump = function FDuiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_clear = function FDuiWindowConsole_clear(){
   this.focusWinCtl = null;
   this._activeWindow = null;
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
MO.FDuiWindowConsole_hideAll = function FDuiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_setMaxWindow = function FDuiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_restore = function FDuiWindowConsole_restore(){
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
MO.FDuiWindowConsole_initialize = function FDuiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_hasWindow = function FDuiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_focus = function FDuiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_saveDefine = function FDuiWindowConsole_saveDefine(oWinNode, oClientWindow){
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
MO.FDuiWindowConsole_onEventMousedown = function FDuiWindowConsole_onEventMousedown(oCWin){
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_onSaveDefineAfter = function FDuiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_releaseWindowName = function FDuiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_releaseWindow = function FDuiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_doFrameAction = function FDuiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_doProperties = function FDuiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
// ------------------------------------------------------------
MO.FDuiWindowConsole_onEventRelease = function FDuiWindowConsole_onEventRelease(oCWin){
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
