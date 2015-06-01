with(MO){
   //==========================================================
   // <T>场景控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150106
   //==========================================================
   MO.FE3dSceneConsole = function FE3dSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd      = EScope.Local;
      // @attribute
      o._loadDisplays = null;
      o._loadScenes   = null;
      o._pools        = null;
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
   MO.FE3dSceneConsole_onProcess = function FE3dSceneConsole_onProcess(){
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
   MO.FE3dSceneConsole_construct = function FE3dSceneConsole_construct(){
      var o = this;
      // 设置属性
      o._loadDisplays = new TLooper();
      o._loadScenes = new TLooper();
      o._pools = RClass.create(FObjectPools);
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
   MO.FE3dSceneConsole_scenes = function FE3dSceneConsole_scenes(){
      return this._scenes;
   }

   //==========================================================
   // <T>加载一个显示对象。</T>
   //
   // @method
   // @param display:FE3dSceneDisplay 显示对象
   //==========================================================
   MO.FE3dSceneConsole_loadDisplay = function FE3dSceneConsole_loadDisplay(display){
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
   MO.FE3dSceneConsole_allocByGuid = function FE3dSceneConsole_allocByGuid(context, guid){
      var o = this;
      // 尝试从缓冲池中取出
      var scene = o._pools.alloc(guid);
      if(scene){
         return scene;
      }
      // 加载渲染对象
      var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
      // 加载模型
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = guid;
      scene.setup();
      // 增加加载中
      o._loadScenes.push(scene);
      return scene;
   }

   //==========================================================
   // <T>收集一个场景。</T>
   //
   // @method
   // @param context:FGraphicContext 渲染环境
   // @param context:String 代码
   // @return FE3dScene 渲染模型
   //==========================================================
   MO.FE3dSceneConsole_allocByCode = function FE3dSceneConsole_allocByCode(context, code){
      var o = this;
      // 尝试从缓冲池中取出
      var scene = o._pools.alloc(code);
      if(scene){
         return scene;
      }
      // 加载渲染对象
      var resource = RConsole.find(FE3sSceneConsole).loadByCode(code);
      // 加载模型
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = code;
      scene.setup();
      // 增加加载中
      o._loadScenes.push(scene);
      return scene;
   }

   //==========================================================
   // <T>释放一个场景。</T>
   //
   // @method
   // @param scene:FE3dScene 场景
   //==========================================================
   MO.FE3dSceneConsole_free = function FE3dSceneConsole_free(scene){
      var o = this;
      // 放到缓冲池
      var code = scene._poolCode;
      o._pools.free(code, scene);
   }
}
