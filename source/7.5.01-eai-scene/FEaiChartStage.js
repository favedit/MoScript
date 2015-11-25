
// <T>图表舞台。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage);
   //..........................................................
   // @attribute
   o._groundLayer          = MO.Class.register(o, new MO.AGetter('_groundLayer'));
   o._groundLayerEffect    = MO.Class.register(o, new MO.AGetter('_groundLayerEffect'));
   o._mapLayer             = MO.Class.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer          = MO.Class.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer       = MO.Class.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer            = MO.Class.register(o, new MO.AGetter('_cityLayer'));
   o._dataLayer            = MO.Class.register(o, new MO.AGetter('_dataLayer'));
   o._spriteLayer          = MO.Class.register(o, new MO.AGetter('_spriteLayer'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartStage_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   // 创建背景层
   var layer = o._groundLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('GroundLayer', layer);
   // 创建背景特效层
   var layer = o._groundLayerEffect = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('GroundLayerEffect', layer);
   // 创建地图层
   var layer = o._mapLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('MapLayer', layer);
   // 创建边框层
   var layer = o._borderLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   // 创建城市范围层
   var layer = o._cityRangeLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   // 创建城市层
   var layer = o._cityLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   // 创建数据层
   var layer = o._dataLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('DataLayer', layer);
   // 创建精灵层
   var layer = o._spriteLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('SpriteLayer', layer);
}
