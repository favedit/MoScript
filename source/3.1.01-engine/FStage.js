with(MO){
   //==========================================================
   // <T>舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FStage = function FStage(o){
      o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
      //..........................................................
      // @attribute
      o._statusActive     = false;
      o._timer            = RClass.register(o, AGetter('_timer'));
      o._layers           = RClass.register(o, AGetter('_layers'));
      o._scenes           = RClass.register(o, AGetter('_scenes'));
      o._activeScene      = RClass.register(o, AGetter('_activeScene'));
      //..........................................................
      // @event
      o.onProcess         = FStage_onProcess;
      //..........................................................
      // @method
      o.construct         = FStage_construct;
      // @method
      o.registerLayer     = FStage_registerLayer;
      o.unregisterLayer   = FStage_unregisterLayer;
      o.active            = FStage_active;
      o.deactive          = FStage_deactive;
      // @method
      o.selectScene       = FStage_selectScene;
      o.selectSceneByCode = FStage_selectSceneByCode;
      // @method
      o.process           = FStage_process;
      // @method
      o.dispose           = FStage_dispose;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_onProcess = function FStage_onProcess(){
      var o = this;
      // 舞台处理
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.process();
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_construct = function FStage_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      // 设置变量
      o._timer = RClass.create(FTimer);
      o._layers = new TDictionary();
      o._scenes = new TDictionary();
   }

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @method
   // @param code:String 名称
   // @param layer:FDisplayLayer 显示层
   //==========================================================
   MO.FStage_registerLayer = function FStage_registerLayer(code, layer){
      layer.setCode(code);
      this._layers.set(code, layer);
   }

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @method
   // @param n:name:String 名称
   //==========================================================
   MO.FStage_unregisterLayer = function FStage_unregisterLayer(code){
      this._layers.set(code, null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_active = function FStage_active(){
      var o = this;
      // 设置状态
      o._statusActive = true;
      // 层集合处理
      var layers = o._layers;
      var count = ls.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_deactive = function FStage_deactive(){
      var o = this;
      // 层集合处理
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.deactive();
      }
      // 设置状态
      o._statusActive = false;
   }

   //==========================================================
   // <T>选择场景。</T>
   //
   // @method
   // @param scene:String 代码
   //==========================================================
   MO.FStage_selectScene = function FStage_selectScene(scene){
      var o = this;
      // 层集合处理
      if(o._activeScene == scene){
         return;
      }
      // 注销场景
      if(o._activeScene){
         o._activeScene.deactive();
         o._activeScene = null;
      }
      // 激活场景
      if(scene){
         scene.active();
         o._activeScene = scene;
      }
   }

   //==========================================================
   // <T>选择场景。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FStage_selectSceneByCode = function FStage_selectSceneByCode(code){
      var o = this;
      var scene = o._scene.get(code);
      o.selectScene(scene);
      return scene;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_process = function FStage_process(){
      var o = this;
      // 设置计时器
      var timer = o._timer;
      if(!timer){
         timer = RClass.create(FTimer);
         timer.setup();
      }
      //..........................................................
      // 前处理
      o.processEnterFrameListener(o);
      // 逻辑处理
      o.onProcess();
      // 后处理
      o.processLeaveFrameListener(o);
      //..........................................................
      // 计时器更新
      timer.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_dispose = function FStage_dispose(){
      var o = this;
      o._timer = RObject.dispose(o._timer);
      o._layers = RObject.dispose(o._layers);
      // 父处理
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
