with(MO){
   //==========================================================
   // <T>简单三维舞台对象。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3dSimpleStage = function FE3dSimpleStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      //..........................................................
      // @attribute
      o._optionKeyboard = true;
      o._skyLayer       = null;
      o._mapLayer       = null;
      o._spriteLayer    = null;
      o._faceLayer      = null;
      //..........................................................
      // @method
      o.construct       = FE3dSimpleStage_construct;
      // @method
      o.skyLayer        = FE3dSimpleStage_skyLayer;
      o.mapLayer        = FE3dSimpleStage_mapLayer;
      o.spriteLayer     = FE3dSimpleStage_spriteLayer;
      o.faceLayer       = FE3dSimpleStage_faceLayer;
      // @method
      o.active          = FE3dSimpleStage_active;
      o.deactive        = FE3dSimpleStage_deactive;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dSimpleStage_construct = function FE3dSimpleStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      // 创建天空层
      var l = o._skyLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SkyLayer', l);
      // 创建地图层
      var l = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', l);
      // 创建精灵层
      var l = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', l);
      // 创建界面层
      var l = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', l);
   }

   //==========================================================
   // <T>获得天空层。</T>
   //
   // @method
   // @return FDisplayLayer 天空层
   //==========================================================
   MO.FE3dSimpleStage_skyLayer = function FE3dSimpleStage_skyLayer(){
      return this._skyLayer;
   }

   //==========================================================
   // <T>获得地图层。</T>
   //
   // @method
   // @return FDisplayLayer 地图层
   //==========================================================
   MO.FE3dSimpleStage_mapLayer = function FE3dSimpleStage_mapLayer(){
      return this._mapLayer;
   }

   //==========================================================
   // <T>获得精灵层。</T>
   //
   // @method
   // @return FDisplayLayer 精灵层
   //==========================================================
   MO.FE3dSimpleStage_spriteLayer = function FE3dSimpleStage_spriteLayer(){
      return this._spriteLayer;
   }

   //==========================================================
   // <T>获得界面层。</T>
   //
   // @method
   // @return FDisplayLayer 界面层
   //==========================================================
   MO.FE3dSimpleStage_faceLayer = function FE3dSimpleStage_faceLayer(){
      return this._faceLayer;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dSimpleStage_active = function FE3dSimpleStage_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
      // 注册事件
      //if(o._optionKeyboard){
      //   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
      //}
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dSimpleStage_deactive = function FE3dSimpleStage_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
      // 注销事件
      //if(o._optionKeyboard){
      //   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
      //}
   }
}
