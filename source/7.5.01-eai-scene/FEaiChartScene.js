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
   o._countryData      = null;
   // @attribute
   o._provinceEntities = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities     = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   // @attribute
   o._logoBar          = null;
   o._titleBar         = null;
   //..........................................................
   // @event
   o.onLoadData        = MO.FEaiChartScene_onLoadData;
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartScene_construct;
   // @method
   o.setup             = MO.FEaiChartScene_setup;
   // @method
   o.active            = MO.FEaiChartScene_active;
   o.deactive          = MO.FEaiChartScene_deactive;
   // @method
   o.dispose           = MO.FEaiChartScene_dispose;
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
   var dataLayer = stage.dataLayer();
   var context = MO.Eai.Canvas.graphicContext();
   //..........................................................
   // 创建省份实体
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      // 创建实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      o._provinceEntities.set(province.code(), provinceEntity);
      // 放入显示层
      mapLayer.pushRenderable(provinceEntity.faceRenderable());
      borderLayer.pushRenderable(provinceEntity.borderRenderable());
   }
   //..........................................................
   // 创建城市实体
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var citys = cityConsole.citys();
   var count = citys.count();
   var citysRenderable = o._citysRenderable;
   var citysRangeRenderable = o._citysRangeRenderable;
   for(var i = 0; i < count; i++){
      var city = citys.at(i);
      var cityLocation = city.location();
      // 创建实体
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(context);
      o._cityEntities.set(city.code(), cityEntity);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
   }
   citysRenderable.upload();
   citysRangeRenderable.upload();
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
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
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
   stage.region().backgroundColor().set(0, 0, 0, 0);
   // 创建城市渲染对象
   var renderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   renderable.linkGraphicContext(o);
   renderable.setup();
   var matrix = renderable.matrix();
   matrix.tx = -20;
   matrix.ty = -8;
   matrix.tz = 0;
   matrix.setScale(0.2, 0.24, 0.2);
   matrix.update();
   stage.cityRangeLayer().push(renderable);
   // 创建城市渲染对象
   var renderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   renderable.linkGraphicContext(o);
   renderable.setup();
   var matrix = renderable.matrix();
   matrix.tx = -20;
   matrix.ty = -8;
   matrix.tz = 0;
   matrix.setScale(0.2, 0.24, 0.2);
   matrix.update();
   stage.dataLayer().push(renderable);
   // 显示左上
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(10, 10);
   stage.faceLayer().push(frame);
   o.registerFrame(frame);
   // 显示左上
   var frame = o._titleBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.TitleBar');
   frame.setLocation(400, 10);
   stage.faceLayer().push(frame);
   o.registerFrame(frame);
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
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinceEntities = RObject.dispose(o._provinceEntities);
   o._cityEntities = RObject.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiScene.dispose.call(o);
}
