//==========================================================
// <T>资源模板管理器。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   // @attribute
   o._scenes     = null;
   //..........................................................
   // @method
   o.construct   = FE3sSceneConsole_construct;
   o.loadByGuid  = FE3sSceneConsole_loadByGuid;
   o.loadByCode  = FE3sSceneConsole_loadByCode;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}

//==========================================================
// <T>根据唯一编号加载资源场景。</T>
//
// @param guid:String 唯一编号
// @return 资源场景
//==========================================================
function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var scenes = o._scenes;
   // 获得场景
   var scene = scenes.get(guid);
   if(scene){
      return scene;
   }
   // 生成地址
   var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建主题
   scene = RClass.create(FE3sScene);
   scene.setGuid(guid);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(scene);
   scenes.set(guid, scene);
   return scene;
}

//==========================================================
// <T>根据代码加载资源场景。</T>
//
// @param code:String 代码
// @return 资源场景
//==========================================================
function FE3sSceneConsole_loadByCode(code){
   var o = this;
   var scenes = o._scenes;
   // 获得场景
   var scene = scenes.get(code);
   if(scene){
      return scene;
   }
   // 生成地址
   var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
   vendor.set('code', code);
   var url = vendor.makeUrl();
   // 创建主题
   scene = RClass.create(FE3sScene);
   scene.setCode(code);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(scene);
   scenes.set(code, scene);
   return scene;
}
