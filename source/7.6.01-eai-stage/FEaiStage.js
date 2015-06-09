with(MO){
   //==========================================================
   // <T>简单三维舞台对象。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FEaiStage = function FEaiStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      //..........................................................
      // @attribute
      o._mapLayer    = RClass.register(o, new AGetter('_mapLayer'));
      o._spriteLayer = RClass.register(o, new AGetter('_spriteLayer'));
      o._faceLayer   = RClass.register(o, new AGetter('_faceLayer'));
      //..........................................................
      // @method
      o.construct    = FEaiStage_construct;
      // @method
      o.active       = FEaiStage_active;
      o.deactive     = FEaiStage_deactive;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStage_construct = function FEaiStage_construct(){
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
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStage_active = function FEaiStage_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStage_deactive = function FEaiStage_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
