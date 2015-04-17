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
   o._scopeCd      = EScope.Local;
   // @attribute
   o._loadDisplays = null;
   o._loadScenes   = null;
   o._scenes       = null;
   // @attribute
   o._thread       = null;
   o._interval     = 100;
   //..........................................................
   // @event
   o.onProcess     = FE3dSceneConsole_onProcess;
   //..........................................................
   // @method
   o.construct     = FE3dSceneConsole_construct;
   // @method
   o.scenes        = FE3dSceneConsole_scenes;
   // @method
   o.loadDisplay   = FE3dSceneConsole_loadDisplay;
   o.allocByGuid   = FE3dSceneConsole_allocByGuid;
   o.allocByCode   = FE3dSceneConsole_allocByCode;
   o.free          = FE3dSceneConsole_free;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dSceneConsole_onProcess(){
   var o = this;
   //..........................................................
   // 处理加载显示
   var displays = o._loadDisplays;
   displays.record();
   while(displays.next()){
      var display = displays.current();
      if(display.processLoad()){
         displays.removeCurrent();
      }
   }
   //..........................................................
   // 处理加载场景
   var scenes = o._loadScenes;
   scenes.record();
   while(scenes.next()){
      var scene = scenes.current();
      if(scene.processLoad()){
         scenes.removeCurrent();
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
   o._loadDisplays = new TLooper();
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   // 创建线程
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
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
// <T>加载一个显示对象。</T>
//
// @method
// @param display:FE3dSceneDisplay 显示对象
//==========================================================
function FE3dSceneConsole_loadDisplay(display){
   this._loadDisplays.push(display);
}

//==========================================================
// <T>收集一个场景。</T>
//
// @method
// @param context:FGraphicContext 渲染环境
// @param guid:String 唯一编号
// @return FE3dScene 渲染模型
//==========================================================
function FE3dSceneConsole_allocByGuid(context, guid){
   var o = this;
   // 加载渲染对象
   var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
   // 加载模型
   var scene = RClass.create(FE3dScene);
   scene.linkGraphicContext(context);
   scene._guid = guid;
   scene._resource = resource;
   scene.setup();
   // 测试是否已加载
   if(resource.testReady()){
      scene.load(resource);
   }else{
      // 增加加载中
      o._loadScenes.push(scene);
   }
   return scene;
}

//==========================================================
// <T>收集一个场景。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FE3dScene 渲染模型
//==========================================================
function FE3dSceneConsole_allocByCode(pc, pn){
   var o = this;
   // 加载渲染对象
   var rsc = RConsole.find(FE3sSceneConsole);
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

//==========================================================
// <T>释放一个场景。</T>
//
// @method
// @param scene:FE3dScene 场景
//==========================================================
function FE3dSceneConsole_free(scene){
}
