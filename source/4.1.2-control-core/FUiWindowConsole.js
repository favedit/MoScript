//==========================================================
// <T>窗口台控制器。</T>
//
// @console
// @author maocy
// @history 150329
//==========================================================
function FUiWindowConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd      = EScope.Local;
   //..........................................................
   // @attribute
   o._activeWindow = null;
   o._windows      = null;
   //..........................................................
   // @method
   o.construct    = FUiWindowConsole_construct;
   // @method
   o.create       = FUiWindowConsole_create;
   o.find         = FUiWindowConsole_find;
   //o.loadDefine   = FUiWindowConsole_loadDefine;
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
   //o.onEventMousedown = FUiWindowConsole_onEventMousedown;
   //o.onSaveDefineAfter = FUiWindowConsole_onSaveDefineAfter;
   //o.onEventRelease = FUiWindowConsole_onEventRelease;
   //o.initialize = FUiWindowConsole_initialize;
   //o.hasWindow = FUiWindowConsole_hasWindow;
   //o.focus = FUiWindowConsole_focus;
   //o.saveDefine = FUiWindowConsole_saveDefine;
   //o.releaseWindowName = FUiWindowConsole_releaseWindowName;
   //o.releaseWindow = FUiWindowConsole_releaseWindow;
   //o.doFrameAction = FUiWindowConsole_doFrameAction;
   //o.setMaxWindow = FUiWindowConsole_setMaxWindow;
   //o.restore = FUiWindowConsole_restore;
   //o.doProperties = FUiWindowConsole_doProperties;
   //o.clear = FUiWindowConsole_clear;
   //o.hideAll = FUiWindowConsole_hideAll;
   //o.dump = FUiWindowConsole_dump;
   return this;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FUiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._windows = new TDictionary();
}

//==========================================================
// <T>根据类型创建窗口。</T>
//
// @method
//==========================================================
function FUiWindowConsole_create(clazz){
   var o = this;
   var instance = RClass.create(clazz);
   instance.buildDefine(RWindow._hDocument);
   return instance;
}

//==========================================================
// <T>根据类型查找窗口。</T>
//
// @method
//==========================================================
function FUiWindowConsole_find(clazz){
   var o = this;
   var name = RClass.name(clazz);
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
function FUiWindowConsole_loadDefine(name){
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
function FUiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
// ------------------------------------------------------------
function FUiWindowConsole_clear(){
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
function FUiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
// ------------------------------------------------------------
function FUiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
// ------------------------------------------------------------
function FUiWindowConsole_restore(){
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
function FUiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
// ------------------------------------------------------------
function FUiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
// ------------------------------------------------------------
function FUiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
// ------------------------------------------------------------
function FUiWindowConsole_saveDefine(oWinNode, oClientWindow){
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
function FUiWindowConsole_onEventMousedown(oCWin){
}
// ------------------------------------------------------------
function FUiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
// ------------------------------------------------------------
function FUiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
function FUiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
// ------------------------------------------------------------
function FUiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
// ------------------------------------------------------------
function FUiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
// ------------------------------------------------------------
function FUiWindowConsole_onEventRelease(oCWin){
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
