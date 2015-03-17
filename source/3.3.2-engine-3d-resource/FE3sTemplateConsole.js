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
   //..........................................................
   // @method
   o.construct   = FE3sTemplateConsole_construct;
   // @method
   o.unserialize = FE3sTemplateConsole_unserialize;
   o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = FE3sTemplateConsole_loadByCode;
   // @method
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
// <T>反序列化一个模板。</T>
//
// @method
// @param p:input:FByteStream 输入流
// @return FE3sTemplate 材质
//==========================================================
function FE3sTemplateConsole_unserialize(p){
   var o = this;
   // 创建材质组
   var r = RClass.create(FE3sTemplate);
   r._dataReady = true;
   r.unserialize(p);
   // 存储材质组
   o._templates.set(r.guid(), r);
   return r;
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
   var r = s.get(p);
   if(!r){
      // 生成地址
      var v = RConsole.find(FE3sVendorConsole).find('template');
      v.set('guid', p);
      var u = v.makeUrl();
      // 创建主题
      r = RClass.create(FE3sTemplate);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
   }
   return r;
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
   var r = s.get(p);
   if(r){
      return r;
   }
   // 生成地址
   var v = RConsole.find(FE3sVendorConsole).find('template');
   v.set('code', p);
   var u = v.makeUrl();
   // 创建主题
   r = RClass.create(FE3sTemplate);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
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
