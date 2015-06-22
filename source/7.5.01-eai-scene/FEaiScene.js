with(MO){
   //==========================================================
   // <T>简单三维舞台对象。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FScene);
      //..........................................................
      // @attribute
      o._frames         = RClass.register(o, new AGetter('_frames'));
      //..........................................................
      // @method
      o.construct       = FEaiScene_construct;
      // @method
      o.registerFrame   = FEaiScene_registerFrame;
      o.unregisterFrame = FEaiScene_unregisterFrame;
      // @method
      o.active          = MO.FEaiScene_active;
      o.deactive        = MO.FEaiScene_deactive;
      // @method
      o.process         = FEaiScene_process;
      // @method
      o.disposet        = FEaiScene_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
      // 创建界面集合
      o._frames = new TObjects();
   }

   //==========================================================
   // <T>注册一个页面。</T>
   //
   // @method
   // @param frame:FGuiFrame 页面
   //==========================================================
   MO.FEaiScene_registerFrame = function FEaiScene_registerFrame(frame){
      this._frames.push(frame);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   // @param frame:FGuiFrame 页面
   //==========================================================
   MO.FEaiScene_unregisterFrame = function FEaiScene_unregisterFrame(frame){
      this._frames.remove(frame);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FScene.active.call(o);
      var stage = o._activeStage;
      MO.Eai.Canvas.selectStage(stage);
   }

   //==========================================================
   // <T>注销处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FScene.deactive.call(o);
      var stage = MO.Eai.Canvas.activeStage();
      var layer = stage.faceLayer();
      // 创建标志栏
      //var frame = o._countryDataLogoBar
      //layer.removeRenderable(frame.renderable());
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_process = function FEaiScene_process(){
      var o = this;
      // 更新页面
      var count = o._frames.count();
      for(var i = 0; i < count; i++){
         var frame = o._frames.at(i);
         frame.psUpdate();
      }
      // 父处理
      o.__base.FScene.process.call(o);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._frames = RObject.dispose(o._frames);
      // 父处理
      o.__base.FScene.dispose.call(o);
   }
}
