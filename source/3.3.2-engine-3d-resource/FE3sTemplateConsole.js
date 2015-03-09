//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o._dataUrl    = '/cloud.content.template.wv'
   //..........................................................
   // @method
   o.construct   = FE3sTemplateConsole_construct;
   o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = FE3sTemplateConsole_loadByCode;
   o.update      = FE3sTemplateConsole_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}

//==========================================================
// <T>加载指定模板。</T>
//
// @param p:guid:String 唯一编码
// @return FE3sTemplate 模板
//==========================================================
function FE3sTemplateConsole_loadByGuid(p){
   var o = this;
   var s = o._templates;
   var t = s.get(p);
   if(t == null){
      // 生成地址
      var v = RConsole.find(FE3sVendorConsole).find('template');
      var u = v.makeUrl(p, '');
      // 创建主题
      t = RClass.create(FE3sTemplate);
      t.setVendor(v);
      t.load(u);
      s.set(p, t);
   }
   return t;
}

//==========================================================
// <T>加载指定模板。</T>
//
// @param p:guid:String 唯一编码
// @return FE3sTemplate 模板
//==========================================================
function FE3sTemplateConsole_loadByCode(p){
   var o = this;
   var s = o._templates;
   var t = s.get(p);
   if(t == null){
      // 生成地址
      var v = RConsole.find(FE3sVendorConsole).find('template');
      var u = v.makeUrl('', p);
      // 创建主题
      t = RClass.create(FE3sTemplate);
      t.load(u);
      s.set(p, t);
   }
   return t;
}

//==========================================================
// <T>更新处理。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sTemplateConsole_update(p){
   var o = this;
   // 生成地址
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   // 发送数据
   RConsole.find(FXmlConsole).send(u, p);
}
