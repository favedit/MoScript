//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   //..........................................................
   // @method
   o.construct   = MO.FE3sTemplateConsole_construct;
   // @method
   o.unserialize = MO.FE3sTemplateConsole_unserialize;
   o.loadByGuid  = MO.FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = MO.FE3sTemplateConsole_loadByCode;
   // @method
   o.update      = MO.FE3sTemplateConsole_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new MO.TDictionary();
}

//==========================================================
// <T>反序列化一个模板。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sTemplate 材质
//==========================================================
MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = MO.Class.create(MO.FE3sTemplate);
   r._dataReady = true;
   r.unserialize(p);
   // 存储材质组
   o._templates.set(r.guid(), r);
   return r;
}

//==========================================================
// <T>加载指定模板。</T>
//
// @param guid:String 唯一编码
// @return FE3sTemplate 模板
//==========================================================
MO.FE3sTemplateConsole_loadByGuid = function FE3sTemplateConsole_loadByGuid(guid){
   var o = this;
   var templates = o._templates;
   // 查找模板
   var template = templates.get(guid);
   if(template){
      return template;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建模板
   template = MO.Class.create(MO.FE3sTemplate);
   template.setGuid(guid);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
   templates.set(guid, template);
   return template;
}

//==========================================================
// <T>加载指定模板。</T>
//
// @param code:String 代码
// @return FE3sTemplate 模板
//==========================================================
MO.FE3sTemplateConsole_loadByCode = function FE3sTemplateConsole_loadByCode(code){
   var o = this;
   var templates = o._templates;
   // 查找模板
   var template = templates.get(code);
   if(template){
      return template;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('code', code);
   var url = vendor.makeUrl();
   // 创建模板
   template = MO.Class.create(MO.FE3sTemplate);
   template.setCode(code);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
   templates.set(code, template);
   return template;
}

//==========================================================
// <T>更新处理。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
   var o = this;
   // 生成地址
   var u = MO.RBrowser.hostPath(o._serviceUrl + '?action=update');
   // 发送数据
   MO.Console.find(MO.FXmlConsole).send(u, p);
}
