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
      o._mapLayer    = null;
      o._spriteLayer = null;
      o._faceLayer   = null;
      //..........................................................
      // @method
      o.construct    = FEaiScene_construct;
      // @method
      o.mapLayer     = FEaiScene_mapLayer;
      o.spriteLayer  = FEaiScene_spriteLayer;
      o.faceLayer    = FEaiScene_faceLayer;
      // @method
      o.active       = FEaiScene_active;
      o.deactive     = FEaiScene_deactive;
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
}
