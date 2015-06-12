with(MO){
   //==========================================================
   // <T>简单三维舞台对象。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FE3dStage);
      //..........................................................
      // @attribute
      o._mapLayer       = null;
      o._spriteLayer    = null;
      o._faceLayer      = null;
      // @attribute
      o._frames         = null;
      //..........................................................
      // @method
      o.construct       = FEaiScene_construct;
      // @method
      o.mapLayer        = FEaiScene_mapLayer;
      o.spriteLayer     = FEaiScene_spriteLayer;
      o.faceLayer       = FEaiScene_faceLayer;
      // @method
      o.registerFrame   = FEaiScene_registerFrame;
      o.unregisterFrame = FEaiScene_unregisterFrame;
      // @method
      o.active          = FEaiScene_active;
      o.deactive        = FEaiScene_deactive;
      o.process         = FEaiScene_process;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      // 创建地图层
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      // 创建精灵层
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      // 创建界面层
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
      // 创建界面集合
      o._frames = new TObjects();
   }

   //==========================================================
   // <T>获得地图层。</T>
   //
   // @method
   // @return FDisplayLayer 地图层
   //==========================================================
   MO.FEaiScene_mapLayer = function FEaiScene_mapLayer(){
      return this._mapLayer;
   }

   //==========================================================
   // <T>获得精灵层。</T>
   //
   // @method
   // @return FDisplayLayer 精灵层
   //==========================================================
   MO.FEaiScene_spriteLayer = function FEaiScene_spriteLayer(){
      return this._spriteLayer;
   }

   //==========================================================
   // <T>获得界面层。</T>
   //
   // @method
   // @return FDisplayLayer 界面层
   //==========================================================
   MO.FEaiScene_faceLayer = function FEaiScene_faceLayer(){
      return this._faceLayer;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
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
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_process = function FEaiScene_process(){
      var o = this;
      var count = o._frames.count();
      for(var i = 0; i < count; i++){
         var frame = o._frames.at(i);
         frame.psUpdate();
      }
   }
}
