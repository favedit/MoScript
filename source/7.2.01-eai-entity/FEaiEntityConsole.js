//==========================================================
// <T>实体控制台。</T>
//
// @class
// @author maocy
// @history 150703
//==========================================================
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._scopeCd              = MO.EScope.Local;
   // @attribute
   o._cityModule           = MO.Class.register(o, new MO.AGetter('_cityModule'));
   o._provinceModule       = MO.Class.register(o, new MO.AGetter('_provinceModule'));
   o._countryModule        = MO.Class.register(o, new MO.AGetter('_countryModule'));
   o._mapModule            = MO.Class.register(o, new MO.AGetter('_mapModule'));
   // @attribute
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   // @attribute
   o._worldData            = null;
   o._worldReady           = false;
   o._countryData          = null;
   o._countryReady         = false;
   // @attribute
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   // @attribute
   o._listenersLoadWorld   = MO.Class.register(o, new MO.AListener('_listenersLoadWorld', 'LoadWorld'));
   o._listenersLoadCountry = MO.Class.register(o, new MO.AListener('_listenersLoadCountry', 'LoadCountry'));
   //..........................................................
   // @event
   o.onSetup               = MO.FEaiEntityConsole_onSetup;
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
MO.FEaiEntityConsole_onLoadCountry = function FEaiEntityConsole_onLoadCountry(event){
   var o = this;
   var data = event.sender;
   var mapEntity = o._mapEntity;
   var countryEntity = mapEntity.countryEntity();
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   var citysRangeRenderable = mapEntity.citysRangeRenderable();
   var citysRenderable = mapEntity.citysRenderable();
   //..........................................................
   // 创建省份实体
   countryEntity.loadProvinceData(data);
   var provinceEntities = countryEntity.provinceEntities();
   var count = provinceEntities.count();
   for(var i = 0; i < count; i++){
      var provinceEntity = provinceEntities.at(i);
      mapEntity.pushProvince(provinceEntity);
   }
   //..........................................................
   // 创建城市实体
   var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
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
   // 设置属性
   o._cityModule = MO.Class.create(MO.FEaiCityEntityModule);
   o._provinceModule = MO.Class.create(MO.FEaiProvinceEntityModule);
   o._countryModule = MO.Class.create(MO.FEaiCountryEntityModule);
   o._mapModule = MO.Class.create(MO.FEaiMapEntityModule);
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
   o._cityModule = MO.Lang.Object.dispose(o._cityModule);
   o._provinceModule = MO.Lang.Object.dispose(o._provinceModule);
   o._countryModule = MO.Lang.Object.dispose(o._countryModule);
   o._mapModule = MO.Lang.Object.dispose(o._mapModule);
   // 释放属性
   o._mapEntity = MO.Lang.Object.dispose(o._mapEntity);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
