//==========================================================
// <T>实例控制台。</T>
//
// @console
// @author maocy
// @version 150417
//==========================================================
function FE3dInstanceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = EScope.Local;
   // @attribute
   o._factory   = null;
   //..........................................................
   // @method
   o.construct  = FE3dInstanceConsole_construct;
   // @method
   o.factory    = FE3dInstanceConsole_factory;
   o.register   = FE3dInstanceConsole_register;
   o.unregister = FE3dInstanceConsole_unregister;
   // @method
   o.create     = FE3dInstanceConsole_create;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dInstanceConsole_construct(){
   var o = this;
   // 设置属性
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register(EE3dInstance.ModelRenderable, FE3dModelRenderable);
   factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
   factory.register(EE3dInstance.Scene, FE3dScene);
   factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
   factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
   factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
   factory.register(EE3dInstance.SceneMovie, FE3dMovie);
   factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
}

//==========================================================
// <T>获得类工厂。</T>
//
// @method
// @return FClassFactory 类工厂
//==========================================================
function FE3dInstanceConsole_factory(){
   return this._factory;
}

//==========================================================
// <T>注册类对象。</T>
//
// @method
// @param code:String 代码
// @param clazz:Function 类函数
//==========================================================
function FE3dInstanceConsole_register(code, clazz){
   this._factory.register(code, clazz);
}

//==========================================================
// <T>注销类对象。</T>
//
// @method
// @param code:String 代码
// @param clazz:Function 类函数
//==========================================================
function FE3dInstanceConsole_unregister(code){
   this._factory.unregister(code, clazz);
}

//==========================================================
// <T>创建一个渲染实例。</T>
//
// @method
// @param code:String 代码
// @return FE3dObject 渲染实例
//==========================================================
function FE3dInstanceConsole_create(code){
   return this._factory.create(code);
}
