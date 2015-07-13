//==========================================================
// <T>资源提供商管理器。</T>
//
// @class
// @author maocy
// @history 15031
//==========================================================
MO.FE3sVendorConsole = function FE3sVendorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._setuped     = false;
   o._vendors     = null;
   //..........................................................
   // @method
   o.construct    = MO.FE3sVendorConsole_construct;
   o.createVendor = MO.FE3sVendorConsole_createVendor;
   o.register     = MO.FE3sVendorConsole_register;
   o.find         = MO.FE3sVendorConsole_find;
   o.setup        = MO.FE3sVendorConsole_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._vendors = new MO.TDictionary();
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
   var v = MO.Class.create(c);
   v.setContentUrl(u);
   return v;
}

//==========================================================
// <T>注册一个资源提供商。</T>
//
// @param p:name:String 名称
// @return 主题
//==========================================================
MO.FE3sVendorConsole_register = function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
MO.FE3sVendorConsole_find = function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   var v = o._vendors.get(p);
   v.reset();
   return v;
}

//==========================================================
// <T>根据名称查找资源提供商。</T>
//
// @param p:name:String 名称
// @return FE3sVendor 资源提供商
//==========================================================
MO.FE3sVendorConsole_setup = function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/material/{guid}.bin')));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new MO.TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
