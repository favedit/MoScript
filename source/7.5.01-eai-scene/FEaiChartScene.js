//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._countryData = null;
   o._provinces   = MO.Class.register(o, new MO.AGetter('_provinces'));
   //..........................................................
   // @event
   o.onLoadData   = MO.FEaiChartScene_onLoadData;
   //..........................................................
   // @method
   o.construct    = MO.FEaiChartScene_construct;
   // @method
   o.setup        = MO.FEaiChartScene_setup;
   // @method
   o.active       = MO.FEaiChartScene_active;
   o.deactive     = MO.FEaiChartScene_deactive;
   // @method
   o.dispose      = MO.FEaiChartScene_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   // 创建省份实体
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      // 创建实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(MO.Eai.Canvas);
      o._provinces.set(provinceData.name(), provinceEntity);
      // 放入显示层
      mapLayer.pushRenderable(provinceEntity.faceRenderable());
      borderLayer.pushRenderable(provinceEntity.borderRenderable());
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   // 创建属性
   o._provinces = new MO.TDictionary();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0.1, 1);
   // 加载数据
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = o._activeStage;
   MO.Eai.Canvas.selectStage(stage);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   // 创建标志栏
   //var frame = o._countryDataLogoBar
   //layer.removeRenderable(frame.renderable());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   // 父处理
   o.__base.FEaiScene.dispose.call(o);
}
