//==========================================================
// <T>实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._scopeCd              = MO.EScope.Local;
   // @attribute
   // @attribute
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   // @attribute
   o._worldData            = null;
   o._worldReady           = false;
   o._countryData          = null;
   o._countryReady         = false;
   // @attribute
   o._provinceConsole      = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole          = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   // @attribute
   o._listenersLoadWorld   = MO.Class.register(o, new MO.AListener('_listenersLoadWorld', 'LoadWorld'));
   o._listenersLoadCountry = MO.Class.register(o, new MO.AListener('_listenersLoadCountry', 'LoadCountry'));
   //..........................................................
   // @event
   o.onSetup               = MO.FEaiEntityConsole_onSetup;
   o.onLoadWorld           = MO.FEaiEntityConsole_onLoadWorld;
   o.onLoadCountry         = MO.FEaiEntityConsole_onLoadCountry;
   //..........................................................
   // @method
   o.construct             = MO.FEaiEntityConsole_construct;
   // @method
   o.testWorldReady        = MO.FEaiEntityConsole_testWorldReady;
   o.loadWorldData         = MO.FEaiEntityConsole_loadWorldData;
   o.testCountryReady      = MO.FEaiEntityConsole_testCountryReady;
   o.loadCountryData       = MO.FEaiEntityConsole_loadCountryData;
   // @method
   o.dispose               = MO.FEaiEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_onSetup = function FEaiEntityConsole_onSetup(){
   var o = this;
   o.__base.FConsole.onSetup.call(o);
   // 创建地图实体
   var worldEntity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   worldEntity.linkGraphicContext(o);
   //worldEntity.setup();
   // 创建地图实体
   var mapEntity = o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
   mapEntity.linkGraphicContext(o);
   mapEntity.setup();
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiEntityConsole_onLoadWorld = function FEaiEntityConsole_onLoadWorld(event){
   var o = this;
   // 加载数据
   var worldData = event.sender;
   var worldEntity = o._worldEntity;
   worldEntity.load(worldData);
   // 数据准备好
   o._worldReady = true;
   // 分发事件
   var event = new MO.SEvent();
   o.processLoadWorldListener(event);
   event.dispose();
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiEntityConsole_onLoadCountry = function FEaiEntityConsole_onLoadCountry(event){
   var o = this;
   var countryData = event.sender;
   var mapEntity = o._mapEntity;
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   var citysRangeRenderable = mapEntity.citysRangeRenderable();
   var citysRenderable = mapEntity.citysRenderable();
   //..........................................................
   // 创建省份实体
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntityConsole = MO.Console.find(MO.FEaiEntityConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var province = provinceConsole.findByCode(provinceCode);
      // 创建省份实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setMapEntity(mapEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      mapEntity.pushProvince(provinceEntity);
      provinceEntityConsole.push(provinceEntity);
      // 放入显示层
      //countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      //countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   //..........................................................
   // 创建城市实体
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntities = mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      // 创建实体
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      //cityEntity.setStage(stage);
      cityEntity.setRenderable(citysRenderable);
      cityEntity.setData(city);
      cityEntity.build(o);
      cityEntities.set(city.code(), cityEntity);
      // 放入渲染对象
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
      cityEntityConsole.push(cityEntity);
   }
   // 上传数据
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   //..........................................................
   mapEntity.setupCityEntities();
   //..........................................................
   // 数据准备好
   o._countryReady = true;
   // 分法时间
   var event = new MO.SEvent();
   o.processLoadCountryListener(event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceEntityConsole);
   o._cityConsole = MO.Class.create(MO.FEaiCityEntityConsole);
}

//==========================================================
// <T>测试国家数据是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FEaiEntityConsole_testWorldReady = function FEaiEntityConsole_testWorldReady(){
   return this._countryReady && this._mapEntity.countryEntity().isReady();
}

//==========================================================
// <T>加载国家数据。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_loadWorldData = function FEaiEntityConsole_loadWorldData(){
   var o = this;
   // 加载数据
   var world = o._worldData;
   if(!world){
      world = o._worldData = MO.Class.create(MO.FEaiWorldData);
      world.addLoadListener(o, o.onLoadWorld);
      world.load();
   }
}

//==========================================================
// <T>测试国家数据是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FEaiEntityConsole_testCountryReady = function FEaiEntityConsole_testCountryReady(){
   return this._countryReady && this._mapEntity.countryEntity().isReady();
}

//==========================================================
// <T>加载国家数据。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_loadCountryData = function FEaiEntityConsole_loadCountryData(){
   var o = this;
   // 加载数据
   var country = o._countryData;
   if(!country){
      country = o._countryData = MO.Class.create(MO.FEaiCountryData);
      country.addLoadListener(o, o.onLoadCountry);
      country.load();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   // 释放属性
   o._mapEntity = RObject.dispose(o._mapEntity);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
