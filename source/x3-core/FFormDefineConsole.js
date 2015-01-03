//==========================================================
// <T>主要负责从服务器取指定的表单结构的XML，并管理框架内所有表单XML。</T>
//
// @console
// @author MAOCY
// @version 1.0.1
//==========================================================
function FFormDefineConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope          = EScope.Global;
   o.defines        = null;
   o.events         = null;
   // Listener
   o.lsnsLoaded     = null;
   o.formId         = 0;
   // Method
   o.construct      = FFormDefineConsole_construct;
   o.createFromName = FFormDefineConsole_createFromName;
   o.loadNode       = FFormDefineConsole_loadNode;
   o.loadService    = FFormDefineConsole_loadService;
   o.nextFormId     = FFormDefineConsole_nextFormId;
   o.get            = FFormDefineConsole_get;
   o.find           = FFormDefineConsole_find;
   o.getLov         = FFormDefineConsole_getLov;
   o.findLov        = FFormDefineConsole_findLov;
   o.getEvents      = FFormDefineConsole_getEvents;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FFormDefineConsole_construct(){
   var o = this;
   o.defines = new TMap();
   o.defines.set(EForm.Form, new TMap());
   o.defines.set(EForm.Lov, new TMap());
   o.events = new TMap();
   o.lsnsLoaded = new TListeners();
}

//==========================================================
// <T>根据表单名称创建一个表单XML对象，并添加到XML管理容器中。</T>
//
// @method
// @param name:FormName:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
function FFormDefineConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(EForm.Lov == type){
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
function FFormDefineConsole_loadNode(x){
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
                        var mp = o.defines.get(tp);
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
function FFormDefineConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = EForm.Form;
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = RService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var r = doc.root();
   // 检查数据结果
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
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
function FFormDefineConsole_nextFormId(){
   return ++this.formId;
}

//==========================================================
// <T>获得指定表单名称的表单xml结构对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
function FFormDefineConsole_get(n){
   return this.defines.get(EForm.Form).get(n);
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
function FFormDefineConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(RClass.isMode(ERun.Debug)){
      RMemory.free(fc);
      fc = null;
      o.defines.get(EForm.Form).set(n, null);
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
function FFormDefineConsole_getLov(n){
   return this.defines.get(EForm.Lov).get(n);
}

//==========================================================
// <T>必定获得指定名称的表单结构xml对象。</T>
//
// @method
// @param n:name:String 表单名称
// @return TXmlDocument 节点对象
//==========================================================
function FFormDefineConsole_findLov(n){
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
function FFormDefineConsole_getEvents(n){
   return this.events.get(n);
}
