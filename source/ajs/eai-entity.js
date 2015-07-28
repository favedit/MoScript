MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FEntity, MO.MGraphicObject, MO.MLinkerResource);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   o._scopeCd              = MO.EScope.Local;
   o._cityModule           = MO.Class.register(o, new MO.AGetter('_cityModule'));
   o._provinceModule       = MO.Class.register(o, new MO.AGetter('_provinceModule'));
   o._countryModule        = MO.Class.register(o, new MO.AGetter('_countryModule'));
   o._mapModule            = MO.Class.register(o, new MO.AGetter('_mapModule'));
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   o._worldData            = null;
   o._worldReady           = false;
   o._countryData          = null;
   o._countryReady         = false;
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._listenersLoadWorld   = MO.Class.register(o, new MO.AListener('_listenersLoadWorld', 'LoadWorld'));
   o._listenersLoadCountry = MO.Class.register(o, new MO.AListener('_listenersLoadCountry', 'LoadCountry'));
   o.onSetup               = MO.FEaiEntityConsole_onSetup;
   o.onLoadCountry         = MO.FEaiEntityConsole_onLoadCountry;
   o.construct             = MO.FEaiEntityConsole_construct;
   o.testWorldReady        = MO.FEaiEntityConsole_testWorldReady;
   o.loadWorldData         = MO.FEaiEntityConsole_loadWorldData;
   o.testCountryReady      = MO.FEaiEntityConsole_testCountryReady;
   o.loadCountryData       = MO.FEaiEntityConsole_loadCountryData;
   o.dispose               = MO.FEaiEntityConsole_dispose;
   return o;
}
MO.FEaiEntityConsole_onSetup = function FEaiEntityConsole_onSetup(){
   var o = this;
   o.__base.FConsole.onSetup.call(o);
   var mapEntity = o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
   mapEntity.linkGraphicContext(o);
   mapEntity.setup();
}
MO.FEaiEntityConsole_onLoadCountry = function FEaiEntityConsole_onLoadCountry(event){
   var o = this;
   var data = event.sender;
   var mapEntity = o._mapEntity;
   var countryEntity = mapEntity.countryEntity();
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   var citysRangeRenderable = mapEntity.citysRangeRenderable();
   var citysRenderable = mapEntity.citysRenderable();
   countryEntity.loadProvinceData(data);
   var provinceEntities = countryEntity.provinceEntities();
   var count = provinceEntities.count();
   for(var i = 0; i < count; i++){
      var provinceEntity = provinceEntities.at(i);
      mapEntity.pushProvince(provinceEntity);
   }
   var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntities = mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setRenderable(citysRenderable);
      cityEntity.setData(city);
      cityEntity.build(o);
      cityEntities.set(city.code(), cityEntity);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
      cityEntityConsole.push(cityEntity);
   }
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   mapEntity.setupCityEntities();
   o._countryReady = true;
   var event = new MO.SEvent();
   o.processLoadCountryListener(event);
}
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._cityModule = MO.Class.create(MO.FEaiCityEntityModule);
   o._provinceModule = MO.Class.create(MO.FEaiProvinceEntityModule);
   o._countryModule = MO.Class.create(MO.FEaiCountryEntityModule);
   o._mapModule = MO.Class.create(MO.FEaiMapEntityModule);
}
MO.FEaiEntityConsole_testWorldReady = function FEaiEntityConsole_testWorldReady(){
   return this._countryReady && this._mapEntity.countryEntity().isReady();
}
MO.FEaiEntityConsole_testCountryReady = function FEaiEntityConsole_testCountryReady(){
   return this._countryReady && this._mapEntity.countryEntity().isReady();
}
MO.FEaiEntityConsole_loadCountryData = function FEaiEntityConsole_loadCountryData(){
   var o = this;
   var country = o._countryData;
   if(!country){
      country = o._countryData = MO.Class.create(MO.FEaiCountryData);
      country.addLoadListener(o, o.onLoadCountry);
      country.load();
   }
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._cityModule = MO.Lang.Object.dispose(o._cityModule);
   o._provinceModule = MO.Lang.Object.dispose(o._provinceModule);
   o._countryModule = MO.Lang.Object.dispose(o._countryModule);
   o._mapModule = MO.Lang.Object.dispose(o._mapModule);
   o._mapEntity = MO.Lang.Object.dispose(o._mapEntity);
   o.__base.FConsole.dispose.call(o);
}
