//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3dSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = EScope.Local;
   o._factory    = null;
   // @attribute
   o._loadScenes = null;
   o._scenes     = null;
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = FE3dSceneConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FE3dSceneConsole_construct;
   o.factory     = FE3dSceneConsole_factory;
   o.scenes      = FE3dSceneConsole_scenes;
   o.alloc       = FE3dSceneConsole_alloc;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dSceneConsole_onProcess(){
   var o = this;
   var s = o._loadScenes;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneConsole_construct(){
   var o = this;
   // 设置属性
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   // 注册默认类
   var f = o._factory = RClass.create(FClassFactory);
   f.register(EE3dScene.Scene, FE3dScene);
   f.register(EE3dScene.Layer, FE3dSceneLayer);
   f.register(EE3dScene.Display, FE3dSceneDisplay);
   f.register(EE3dScene.Material, FE3dSceneMaterial);
   f.register(EE3dScene.Renderable, FE3dSceneDisplayRenderable);
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得类工厂。</T>
//
// @method
// @return FClassFactory 类工厂
//==========================================================
function FE3dSceneConsole_factory(){
   return this._factory;
}

//==========================================================
// <T>获得场景集合。</T>
//
// @method
// @return TDictionary 场景集合
//==========================================================
function FE3dSceneConsole_scenes(){
   return this._scenes;
}

//==========================================================
// <T>收集一个场景。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FE3dScene 渲染模型
//==========================================================
function FE3dSceneConsole_alloc(pc, pn){
   var o = this;
   // 加载渲染对象
   var rsc = RConsole.find(FRs3SceneConsole);
   var rs = rsc.load(pn);
   // 加载模型
   var s = RClass.create(FE3dScene);
   s.linkGraphicContext(pc);
   s._name = pn;
   s._resource = rs;
   s.setup();
   // 测试是否已加载
   if(rs.testReady()){
      s.load(rs);
   }else{
      // 增加加载中
      o._loadScenes.push(s);
   }
   return s;
}
