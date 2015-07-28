MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FEntity, MO.MGraphicObject, MO.MLinkerResource);
   return o;
}
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   o._scopeCd              = MO.EScope.Local;
   o._mapConsole           = MO.Class.register(o, new MO.AGetter('_mapConsole'));
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   o._worldData            = null;
   o._worldReady           = false;
   o._countryData          = null;
   o._countryReady         = false;
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._provinceConsole      = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole          = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._listenersLoadWorld   = MO.Class.register(o, new MO.AListener('_listenersLoadWorld', 'LoadWorld'));
   o._listenersLoadCountry = MO.Class.register(o, new MO.AListener('_listenersLoadCountry', 'LoadCountry'));
   o._looper               = null;
   o._thread               = null;
   o._interval             = 100;
   o.onSetup               = MO.FEaiEntityConsole_onSetup;
   o.onLoadWorld           = MO.FEaiEntityConsole_onLoadWorld;
   o.onLoadCountry         = MO.FEaiEntityConsole_onLoadCountry;
   o.onProcess             = MO.FEaiEntityConsole_onProcess;
   o.construct             = MO.FEaiEntityConsole_construct;
   o.testWorldReady        = MO.FEaiEntityConsole_testWorldReady;
   o.loadWorldData         = MO.FEaiEntityConsole_loadWorldData;
   o.testCountryReady      = MO.FEaiEntityConsole_testCountryReady;
   o.loadCountryData       = MO.FEaiEntityConsole_loadCountryData;
   o.loadEntity            = MO.FEaiEntityConsole_loadEntity;
   o.dispose               = MO.FEaiEntityConsole_dispose;
   return o;
}
MO.FEaiEntityConsole_onProcess = function FEaiEntityConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   while(looper.next()){
      var entity = looper.current();
      if(entity.processLoad()){
         looper.removeCurrent();
      }
   }
}
MO.FEaiEntityConsole_onSetup = function FEaiEntityConsole_onSetup(){
   var o = this;
   o.__base.FConsole.onSetup.call(o);
   var worldEntity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   worldEntity.linkGraphicContext(o);
   worldEntity.setup();
   var mapEntity = o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
   mapEntity.linkGraphicContext(o);
   mapEntity.setup();
}
MO.FEaiEntityConsole_onLoadWorld = function FEaiEntityConsole_onLoadWorld(event){
   var o = this;
   var worldData = event.sender;
   var worldEntity = o._worldEntity;
   worldEntity.load(worldData);
   o._worldReady = true;
   var event = new MO.SEvent();
   o.processLoadWorldListener(event);
   event.dispose();
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
   o._mapConsole = MO.Class.create(MO.FEaiMapEntityConsole);
   o._looper = new MO.TLooper();
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceEntityConsole);
   o._cityConsole = MO.Class.create(MO.FEaiCityEntityConsole);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEaiEntityConsole_testWorldReady = function FEaiEntityConsole_testWorldReady(){
   return this._countryReady && this._mapEntity.countryEntity().isReady();
}
MO.FEaiEntityConsole_loadWorldData = function FEaiEntityConsole_loadWorldData(){
   var o = this;
   var world = o._worldData;
   if(!world){
      world = o._worldData = MO.Class.create(MO.FEaiWorldData);
      world.addLoadListener(o, o.onLoadWorld);
      world.load();
   }
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
MO.FEaiEntityConsole_loadEntity = function FEaiEntityConsole_loadEntity(entity){
   this._looper.push(entity);
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._mapEntity = RObject.dispose(o._mapEntity);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   o.__base.FConsole.dispose.call(o);
}
