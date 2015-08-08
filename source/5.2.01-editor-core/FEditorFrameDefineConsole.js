//==========================================================
// <T>页面定义控制台。</T>
//
// @console
// @author maocy
// @version 150124
//==========================================================
MO.FEditorFrameDefineConsole = function FEditorFrameDefineConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Global;
   // @attribute
   o._service       = 'editor.design.frame';
   o._defines       = null;
   //..........................................................
   // @listeners
   o.lsnsLoaded     = null;
   //..........................................................
   // @method
   o.construct      = MO.FEditorFrameDefineConsole_construct;
   // @method
   o.load           = MO.FEditorFrameDefineConsole_load;


   o.events         = null;
   o.formId         = 0;
   // Method
   o.createFromName = MO.FEditorFrameDefineConsole_createFromName;
   o.loadNode       = MO.FEditorFrameDefineConsole_loadNode;
   o.loadService    = MO.FEditorFrameDefineConsole_loadService;
   o.nextFormId     = MO.FEditorFrameDefineConsole_nextFormId;
   o.get            = MO.FEditorFrameDefineConsole_get;
   o.find           = MO.FEditorFrameDefineConsole_find;
   o.getLov         = MO.FEditorFrameDefineConsole_getLov;
   o.findLov        = MO.FEditorFrameDefineConsole_findLov;
   o.getEvents      = MO.FEditorFrameDefineConsole_getEvents;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FEditorFrameDefineConsole_construct = function FEditorFrameDefineConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
   //o.events = new TMap();
}

//==========================================================
// <T>根据名称加载一个表单定义。</T>
//
// @method
// @param name:String 名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_load = function FEditorFrameDefineConsole_load(name){
   var o = this;
   var defines = o._defines;
   // 查找页面
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   //..........................................................
   // 创建数据
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   // 发送内容
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   // 检查数据结果
   //if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
   //   return null;
   //}
   //..........................................................
   // 读取结果
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   //..........................................................
   // 查找结果
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}









//==========================================================
// <T>根据表单名称创建一个表单XML对象，并添加到XML管理容器中。</T>
//
// @method
// @param name:FormName:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_createFromName = function FEditorFrameDefineConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(MO.EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}

//==========================================================
// <T>加载指定的xml节点，</T>
//
// @method
// @param x:XML:TXmlDocument XML节点
//==========================================================
MO.FEditorFrameDefineConsole_loadNode = function FEditorFrameDefineConsole_loadNode(x){
   var o = this;
   var nns = x.root();
   if(nns.hasNode()){
      var nodes = nns.nodes;
      var ct = nodes.count;
      for(var n = 0; n < ct; n++){
         var node = nodes.get(n);
         var fn = node.get('name');
         var tp = node.get('type');
         if(node.hasNode()){
            var nfds = node.nodes;
            for(var k = 0; k < nfds.count; k++){
               var dd = nfds.get(k);
               if(dd.isName('Define')){
                  if(dd.hasNode()){
                     var fds = dd.nodes;
                     for(var m = 0; m < fds.count; m++){
                        var nd = fds.get(m);
                        var mp = o._defines.get(tp);
                        mp.set(fn, nd);
                     }
                  }
               }else if(dd.isName('Events')){
                  o.events.set(fn, dd);
                  //RConsole.find(FEventEngineConsole).loadConfig(dd);
               }
            }
         }
      }
   }
}

//==========================================================
// <T>从服务器取得指定名称的表单XML结构。</T>
//
// @method
// @param n:name:String 表单名称
// @param t:type:String 表单类型
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_loadService = function FEditorFrameDefineConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = MO.EForm.Form;
   }
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = MO.RDuiService.url('logic.webform');
   var doc = MO.Console.find(MO.FXmlConsole).send(url, doc);
   var r = doc.root();
   // 检查数据结果
   if(!MO.Console.find(MO.FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}

//==========================================================
// <T>获得一个新的表单ID。</T>
//
// @method
// @return Integer 获得的表单ID
//==========================================================
MO.FEditorFrameDefineConsole_nextFormId = function FEditorFrameDefineConsole_nextFormId(){
   return ++this.formId;
}

//==========================================================
// <T>获得指定表单名称的表单xml结构对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_get = function FEditorFrameDefineConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_find = function FEditorFrameDefineConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(MO.Class.isMode(MO.ERun.Debug)){
      MO.Memory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_getLov = function FEditorFrameDefineConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_findLov = function FEditorFrameDefineConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
MO.FEditorFrameDefineConsole_getEvents = function FEditorFrameDefineConsole_getEvents(n){
   return this.events.get(n);
}
