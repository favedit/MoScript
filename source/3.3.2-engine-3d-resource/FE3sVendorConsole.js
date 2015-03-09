//==========================================================
// <T>资源主题管理器。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
function FE3sVendorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._setuped     = false;
   o._vendors     = null;
   //..........................................................
   // @method
   o.construct    = FE3sVendorConsole_construct;
   o.createVendor = FE3sVendorConsole_createVendor;
   o.register     = FE3sVendorConsole_register;
   o.find         = FE3sVendorConsole_find;
   o.setup        = FE3sVendorConsole_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._vendors = new TDictionary();
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
function FE3sVendorConsole_createVendor(f, u){
   var v = RClass.create(FE3sVendor);
   v.setOptionFlag(f);
   v.setContentUrl(u);
   return v;
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   return this._vendors.get(p);
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('texture.bitmap', o.createVendor(true, RBrowser.hostPath('/cloud.content.texture.bitmap.wv?guid={1}&code={2}')));
      o._vendors.set('texture', o.createVendor(true, RBrowser.hostPath('/cloud.content.texture.wv?guid={1}')));
      o._vendors.set('model', o.createVendor(true, RBrowser.hostPath('/cloud.content.model.wv?guid={1}')));
      o._vendors.set('template', o.createVendor(true, RBrowser.hostPath('/cloud.content.template.wv?guid={1}&code={2}')));
      o._vendors.set('scene', o.createVendor(true, RBrowser.hostPath('/cloud.content.scene.wv?code={1}')));
   }else if(p == 'local'){
      o._vendors.set('texture.bitmap', o.createVendor(false, RBrowser.contentPath('/ar3/texture/{1}/{2}.{3}')));
      o._vendors.set('texture', o.createVendor(false, RBrowser.contentPath('/ar3/texture/{1}.bin')));
      o._vendors.set('model', o.createVendor(false, RBrowser.contentPath('/ar3/model/{1}.bin')));
      o._vendors.set('template', o.createVendor(false, RBrowser.contentPath('/ar3/template/{1}.bin')));
      o._vendors.set('scene', o.createVendor(false, RBrowser.contentPath('/ar3/scene/{1}.bin')));
   }else{
      throw new TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
