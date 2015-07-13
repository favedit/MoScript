//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
MO.FE3sSceneConsole = function FE3sSceneConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   // @attribute
   o._scenes     = null;
   //..........................................................
   // @method
   o.construct   = MO.FE3sSceneConsole_construct;
   o.loadByGuid  = MO.FE3sSceneConsole_loadByGuid;
   o.loadByCode  = MO.FE3sSceneConsole_loadByCode;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new MO.TDictionary();
}

//==========================================================
// <T>根据唯一编号加载资源场景。</T>
//
// @param guid:String 唯一编号
// @return 资源场景
//==========================================================
MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var scenes = o._scenes;
   // 获得场景
   var scene = scenes.get(guid);
   if(scene){
      return scene;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建主题
   scene = MO.Class.create(MO.FE3sScene);
   scene.setGuid(guid);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   scenes.set(guid, scene);
   return scene;
}

//==========================================================
// <T>根据代码加载资源场景。</T>
//
// @param code:String 代码
// @return 资源场景
//==========================================================
MO.FE3sSceneConsole_loadByCode = function FE3sSceneConsole_loadByCode(code){
   var o = this;
   var scenes = o._scenes;
   // 获得场景
   var scene = scenes.get(code);
   if(scene){
      return scene;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('code', code);
   var url = vendor.makeUrl();
   // 创建主题
   scene = MO.Class.create(MO.FE3sScene);
   scene.setCode(code);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   scenes.set(code, scene);
   return scene;
}
