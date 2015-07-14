//==========================================================
// <T>实例控制台。</T>
//
// @console
// @author maocy
// @version 150417
//==========================================================
MO.FE3dInstanceConsole = function FE3dInstanceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Local;
   // @attribute
   o._factory   = MO.Class.register(o, new MO.AGetter('_factory'));
   //..........................................................
   // @method
   o.construct  = MO.FE3dInstanceConsole_construct;
   // @method
   o.register   = MO.FE3dInstanceConsole_register;
   o.unregister = MO.FE3dInstanceConsole_unregister;
   // @method
   o.create     = MO.FE3dInstanceConsole_create;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dInstanceConsole_construct = function FE3dInstanceConsole_construct(){
   var o = this;
   // 设置属性
   var factory = o._factory = MO.Class.create(MO.FClassFactory);
   factory.register(MO.EE3dInstance.ModelRenderable, MO.FE3dModelRenderable);
   factory.register(MO.EE3dInstance.TemplateRenderable, MO.FE3dTemplateRenderable);
   factory.register(MO.EE3dInstance.Scene, MO.FE3dScene);
   factory.register(MO.EE3dInstance.SceneLayer, MO.FE3dSceneLayer);
   factory.register(MO.EE3dInstance.SceneDisplay, MO.FE3dSceneDisplay);
   factory.register(MO.EE3dInstance.SceneMaterial, MO.FE3dSceneMaterial);
   factory.register(MO.EE3dInstance.SceneMovie, MO.FE3dMovie);
   factory.register(MO.EE3dInstance.SceneRenderable, MO.FE3dSceneDisplayRenderable);
}

//==========================================================
// <T>注册类对象。</T>
//
// @method
// @param code:String 代码
// @param clazz:Function 类函数
//==========================================================
MO.FE3dInstanceConsole_register = function FE3dInstanceConsole_register(code, clazz){
   this._factory.register(code, clazz);
}

//==========================================================
// <T>注销类对象。</T>
//
// @method
// @param code:String 代码
// @param clazz:Function 类函数
//==========================================================
MO.FE3dInstanceConsole_unregister = function FE3dInstanceConsole_unregister(code){
   this._factory.unregister(code, clazz);
}

//==========================================================
// <T>创建一个渲染实例。</T>
//
// @method
// @param code:String 代码
// @return FE3dObject 渲染实例
//==========================================================
MO.FE3dInstanceConsole_create = function FE3dInstanceConsole_create(code){
   return this._factory.create(code);
}
