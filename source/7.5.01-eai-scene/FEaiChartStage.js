//==========================================================
// <T>图表舞台。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   //..........................................................
   // @attribute
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer    = MO.RClass.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer = MO.RClass.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer      = MO.RClass.register(o, new MO.AGetter('_cityLayer'));
   o._dataLayer      = MO.RClass.register(o, new MO.AGetter('_dataLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartStage_construct;
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
   // 创建地图层
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   // 创建边框层
   var layer = o._borderLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   // 创建城市层
   var layer = o._cityLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   // 创建城市层
   var layer = o._cityRangeLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   // 创建数据层
   var layer = o._dataLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('DataLayer', layer);
   // 创建界面层
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
