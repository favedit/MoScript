MO.FEaiCardResource = function FEaiCardResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   o._cityCode   = MO.Class.register(o, new MO.AGetter('_cityCode'));
   o.unserialize = MO.FEaiCardResource_unserialize;
   return o;
}
MO.FEaiCardResource_unserialize = function FEaiCardResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
MO.FEaiCardResourceConsole = function FEaiCardResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._cards       = MO.Class.register(o, new MO.AGetter('_cards'));
   o.construct    = MO.FEaiCardResourceConsole_construct;
   o.find         = MO.FEaiCardResourceConsole_find;
   o.findCityCode = MO.FEaiCardResourceConsole_findCityCode;
   o.unserialize  = MO.FEaiCardResourceConsole_unserialize;
   o.dispose      = MO.FEaiCardResourceConsole_dispose;
   return o;
}
MO.FEaiCardResourceConsole_construct = function FEaiCardResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._cards = new MO.TDictionary();
}
MO.FEaiCardResourceConsole_find = function FEaiCardResourceConsole_find(code){
   return this._cards.get(code);
}
MO.FEaiCardResourceConsole_findCityCode = function FEaiCardResourceConsole_findCityCode(code){
   var cityCode = null;
   var card = this._cards.get(code);
   if(card){
      cityCode = card.cityCode();
   }
   return cityCode;
}
MO.FEaiCardResourceConsole_unserialize = function FEaiCardResourceConsole_unserialize(input){
   var o = this;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var card = MO.Class.create(MO.FEaiCardResource);
      card.unserialize(input);
      cards.set(card.code(), card);
   }
}
MO.FEaiCardResourceConsole_dispose = function FEaiCardResourceConsole_dispose(){
   var o = this;
   o._cards = MO.Lang.Object.dispose(o._cards);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiCityResource = function FEaiCityResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._provinceCode  = MO.Class.register(o, new MO.AGetter('_provinceCode'));
   o._code          = MO.Class.register(o, new MO.AGetter('_code'));
   o._label         = MO.Class.register(o, new MO.AGetter('_label'));
   o._level         = MO.Class.register(o, new MO.AGetter('_level'));
   o._location      = MO.Class.register(o, new MO.AGetter('_location'));
   o.construct      = MO.FEaiCityResource_construct;
   o.unserialize    = MO.FEaiCityResource_unserialize;
   o.dispose        = MO.FEaiCityResource_dispose;
   return o;
}
MO.FEaiCityResource_construct = function FEaiCityResource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._location = new MO.SPoint3();
}
MO.FEaiCityResource_unserialize = function FEaiCityResource_unserialize(input){
   var o = this;
   o._provinceCode = input.readUint16();
   o._code = input.readUint16();
   o._label = input.readString();
   o._level = input.readUint16();
   o._location.unserialize2(input);
}
MO.FEaiCityResource_dispose = function FEaiCityResource_dispose(){
   var o = this;
   o._location = RObject.dispose(o._location);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiCityResourceConsole = function FEaiCityResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._resourceConsole = MO.Class.register(o, new MO.AGetSet('_resourceConsole'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct        = MO.FEaiCityResourceConsole_construct;
   o.find             = MO.FEaiCityResourceConsole_find;
   o.findByCard       = MO.FEaiCityResourceConsole_findByCard;
   o.unserialize      = MO.FEaiCityResourceConsole_unserialize;
   o.dispose          = MO.FEaiCityResourceConsole_dispose;
   return o;
}
MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._citys = new MO.TDictionary();
}
MO.FEaiCityResourceConsole_find = function FEaiCityResourceConsole_find(code){
   return this._citys.get(code);
}
MO.FEaiCityResourceConsole_findByCard = function FEaiCityResourceConsole_findByCard(card) {
   var o = this;
   var city = null;
   var cardConsole = o._resourceConsole.cardConsole();
   var cityCode = cardConsole.findCityCode(card);
   if(cityCode){
      city = o._citys.get(cityCode);
   }
   return city;
}
MO.FEaiCityResourceConsole_unserialize = function FEaiCityResourceConsole_unserialize(input){
   var o = this;
   var citys = o._citys;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
   }
}
MO.FEaiCityResourceConsole_dispose = function FEaiCityResourceConsole_dispose(){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   o.__base.FConsole.dispose.call(o);
}
with(MO){
   MO.FEaiHistoryCityResource = function FEaiHistoryCityResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._investmentDay   = RClass.register(o, new AGetSet('_investmentDay'));
      o._investmentTotal = RClass.register(o, new AGetSet('_investmentTotal'));
      o.unserialize      = FEaiHistoryCityResource_unserialize;
      return o;
   }
   MO.FEaiHistoryCityResource_unserialize = function FEaiHistoryCityResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._investmentDay = input.readFloat();
      o._investmentTotal = input.readFloat();
   }
}
with(MO){
   MO.FEaiHistoryDateResource = function FEaiHistoryDateResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code            = RClass.register(o, new AGetter('_code'));
      o._investmentDay   = RClass.register(o, new AGetter('_investmentDay'));
      o._investmentTotal = RClass.register(o, new AGetter('_investmentTotal'));
      o._provinces       = RClass.register(o, new AGetter('_provinces'));
      o._citys           = RClass.register(o, new AGetter('_citys'));
      o.construct        = FEaiHistoryDateResource_construct;
      o.unserialize      = FEaiHistoryDateResource_unserialize;
      o.dispose          = FEaiHistoryDateResource_dispose;
      return o;
   }
   MO.FEaiHistoryDateResource_construct = function FEaiHistoryDateResource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._provinces = new TDictionary();
      o._citys = new TDictionary();
   }
   MO.FEaiHistoryDateResource_unserialize = function FEaiHistoryDateResource_unserialize(input){
      var o = this;
      o._code = input.readString();
      o._investmentDay = input.readFloat();
      o._investmentTotal = input.readFloat();
      var provinces = o._provinces;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiHistoryProvinceResource);
         province.unserialize(input);
         provinces.set(province.code(), province);
      }
      var citys = o._citys;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiHistoryCityResource);
         city.unserialize(input);
         citys.set(city.code(), city);
      }
   }
   MO.FEaiHistoryDateResource_dispose = function FEaiHistoryDateResource_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      o._citys = RObject.dispose(o._citys);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiHistoryMilestoneResource = function FEaiHistoryMilestoneResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._investmentTotal = RClass.register(o, new AGetSet('_investmentTotal'));
      o._dayCount        = RClass.register(o, new AGetSet('_dayCount'));
      o._companyCount    = RClass.register(o, new AGetSet('_companyCount'));
      o._staffCount      = RClass.register(o, new AGetSet('_staffCount'));
      o.unserialize      = FEaiHistoryMilestoneResource_unserialize;
      return o;
   }
   MO.FEaiHistoryMilestoneResource_unserialize = function FEaiHistoryMilestoneResource_unserialize(input){
      var o = this;
      o._code = input.readString();
      o._investmentTotal = input.readFloat();
      o._dayCount = input.readUint16();
      o._companyCount = input.readUint16();
      o._staffCount = input.readUint16();
   }
}
with(MO){
   MO.FEaiHistoryProvinceResource = function FEaiHistoryProvinceResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._investmentDay   = RClass.register(o, new AGetSet('_investmentDay'));
      o._investmentTotal = RClass.register(o, new AGetSet('_investmentTotal'));
      o.unserialize      = FEaiHistoryProvinceResource_unserialize;
      return o;
   }
   MO.FEaiHistoryProvinceResource_unserialize = function FEaiHistoryProvinceResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._investmentDay = input.readFloat();
      o._investmentTotal = input.readFloat();
   }
}
MO.FEaiHistoryResourceConsole = function FEaiHistoryResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener);
   o._investmentDay           = MO.Class.register(o, new MO.AGetter('_investmentDay'));
   o._investmentTotal         = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._investmentProvinceDay   = MO.Class.register(o, new MO.AGetter('_investmentProvinceDay'));
   o._investmentProvinceTotal = MO.Class.register(o, new MO.AGetter('_investmentProvinceTotal'));
   o._investmentCityDay       = MO.Class.register(o, new MO.AGetter('_investmentCityDay'));
   o._investmentCityTotal     = MO.Class.register(o, new MO.AGetter('_investmentCityTotal'));
   o._provinces               = MO.Class.register(o, new MO.AGetter('_provinces'));
   o._citys                   = MO.Class.register(o, new MO.AGetter('_citys'));
   o._milestones              = MO.Class.register(o, new MO.AGetter('_milestones'));
   o._dates                   = MO.Class.register(o, new MO.AGetter('_dates'));
   o._listenersLoad           = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o.onLoad                   = MO.FEaiHistoryResourceConsole_onLoad;
   o.construct                = MO.FEaiHistoryResourceConsole_construct;
   o.unserialize              = MO.FEaiHistoryResourceConsole_unserialize;
   o.load                     = MO.FEaiHistoryResourceConsole_load;
   o.dispose                  = MO.FEaiHistoryResourceConsole_dispose;
   return o;
}
MO.FEaiHistoryResourceConsole_onLoad = function FEaiHistoryResourceConsole_onLoad(event){
   var o = this;
   var data = event.outputData();
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
   var event = new MO.SEvent();
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiHistoryResourceConsole_construct = function FEaiHistoryResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._provinces = new MO.TDictionary();
   o._citys = new MO.TDictionary();
   o._milestones = new MO.TDictionary();
   o._dates = new MO.TDictionary();
}
MO.FEaiHistoryResourceConsole_unserialize = function FEaiHistoryResourceConsole_unserialize(input){
   var o = this;
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
   o._investmentProvinceDay = input.readFloat();
   o._investmentProvinceTotal = input.readFloat();
   o._investmentCityDay = input.readFloat();
   o._investmentCityTotal = input.readFloat();
   var provinces = o._provinces;
   provinces.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   var citys = o._citys;
   citys.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
   }
   var milestones = o._milestones;
   milestones.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var milestone = MO.Class.create(MO.FEaiHistoryMilestoneResource);
      milestone.unserialize(input);
      milestones.set(milestone.code(), milestone);
   }
   var dates = o._dates;
   dates.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var date = MO.Class.create(MO.FEaiHistoryDateResource);
      date.unserialize(input);
      dates.set(date.code(), date);
   }
}
MO.FEaiHistoryResourceConsole_load = function FEaiHistoryResourceConsole_load(){
   var o = this;
   var uri = '{eai.resource}/investment.dat?date=' + MO.Lang.Date.format();
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiHistoryResourceConsole_dispose = function FEaiHistoryResourceConsole_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o._citys = RObject.dispose(o._citys);
   o._milestones = RObject.dispose(o._milestones);
   o._dates = RObject.dispose(o._dates);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiMapBoundaryData = function FEaiMapBoundaryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.ME3dBoundaryPolygon);
   o.construct   = MO.FEaiMapBoundaryData_construct;
   o.unserialize = MO.FEaiMapBoundaryData_unserialize;
   o.dispose     = MO.FEaiMapBoundaryData_dispose;
   return o;
}
MO.FEaiMapBoundaryData_construct = function FEaiMapBoundaryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.ME3dBoundaryPolygon.construct.call(o);
}
MO.FEaiMapBoundaryData_unserialize = function FEaiMapBoundaryData_unserialize(input){
   var o = this;
   var index = 0;
   var vertexCount = o._positionCount = input.readInt32();
   var positions = o._positions = new Float32Array(2 * vertexCount);
   for(var i = 0; i < vertexCount; i++){
      positions[index++] = input.readFloat();
      positions[index++] = input.readFloat();
   }
   var indexCount = o._indexCount = input.readInt32();
   var indexes = o._indexes = new Uint16Array(indexCount);
   for(var i = 0; i < indexCount; i++){
      indexes[i] = input.readUint16();
   }
}
MO.FEaiMapBoundaryData_dispose = function FEaiMapBoundaryData_dispose(){
   var o = this;
   o.__base.ME3dBoundaryPolygon.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiMapCountryData = function FEaiMapCountryData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label      = MO.Class.register(o, new MO.AGetSet('_label'));
   o._boundaries = MO.Class.register(o, new MO.AGetter('_boundaries'));
   o._provinces  = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.construct   = MO.FEaiMapCountryData_construct;
   o.unserialize = MO.FEaiMapCountryData_unserialize;
   o.dispose     = MO.FEaiMapCountryData_dispose;
   return o;
}
MO.FEaiMapCountryData_construct = function FEaiMapCountryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._boundaries = new MO.TObjects();
   o._provinces = new MO.TDictionary();
}
MO.FEaiMapCountryData_unserialize = function FEaiMapCountryData_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._label = input.readString();
   var count = input.readInt32();
   if(count > 0){
      var boundaries = o._boundaries;
      for(var i = 0; i < count; i++){
         var boundary = MO.Class.create(MO.FEaiMapBoundaryData);
         boundary.unserialize(input);
         boundaries.push(boundary);
      }
   }
   var count = input.readInt32();
   if(count > 0){
      var provinces = o._provinces;
      for(var i = 0; i < count; i++){
         var province = MO.Class.create(MO.FEaiMapProvinceData);
         province.unserialize(input);
         provinces.set(province.code(), province);
      }
   }
}
MO.FEaiMapCountryData_dispose = function FEaiMapCountryData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiMapProvinceData = function FEaiMapProvinceData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._boundaries = MO.Class.register(o, new MO.AGetter('_boundaries'));
   o.construct   = MO.FEaiMapProvinceData_construct;
   o.unserialize = MO.FEaiMapProvinceData_unserialize;
   o.dispose     = MO.FEaiMapProvinceData_dispose;
   return o;
}
MO.FEaiMapProvinceData_construct = function FEaiMapProvinceData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._boundaries = new MO.TObjects();
}
MO.FEaiMapProvinceData_unserialize = function FEaiMapProvinceData_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   var count = input.readInt32();
   if(count > 0){
      var boundaries = o._boundaries;
      for(var i = 0; i < count; i++){
         var boundary = MO.Class.create(MO.FEaiMapBoundaryData);
         boundary.unserialize(input);
         boundaries.push(boundary);
      }
   }
}
MO.FEaiMapProvinceData_dispose = function FEaiMapProvinceData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiMapResourceConsole = function FEaiMapResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._world      = MO.Class.register(o, new MO.AGetter('_world'));
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   o.construct   = MO.FEaiMapResourceConsole_construct;
   o.findByCode  = MO.FEaiMapResourceConsole_findByCode;
   o.findByName  = MO.FEaiMapResourceConsole_findByName;
   o.unserialize = MO.FEaiMapResourceConsole_unserialize;
   o.loadCountry = MO.FEaiMapResourceConsole_loadCountry;
   o.loadWorld   = MO.FEaiMapResourceConsole_loadWorld;
   o.dispose     = MO.FEaiMapResourceConsole_dispose;
   return o;
}
MO.FEaiMapResourceConsole_construct = function FEaiMapResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._countries = new MO.TDictionary();
}
MO.FEaiMapResourceConsole_findByCode = function FEaiMapResourceConsole_findByCode(code){
   return this._countries.get(code);
}
MO.FEaiMapResourceConsole_findByName = function FEaiMapResourceConsole_findByName(name){
   return this._world.get(name);
}
MO.FEaiMapResourceConsole_unserialize = function FEaiMapResourceConsole_unserialize(input){
   var o = this;
   var provinceCodes = o._countries;
   var provinceNames = o._world;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(FEaiProvinceResource);
      province.unserialize(input);
      provinceCodes.set(province.code(), province);
      provinceNames.set(province.name(), province);
   }
}
MO.FEaiMapResourceConsole_loadCountry = function FEaiMapResourceConsole_loadCountry(code){
   var o = this;
   var countries = o._countries;
   var country = countries.get(name);
   if(!country){
      country = MO.Class.create(MO.FEaiMapCountryResource);
      country.setCode(code);
      country.load();
      countries.set(code, country);
   }
   return country;
}
MO.FEaiMapResourceConsole_loadWorld = function FEaiMapResourceConsole_loadWorld(){
   var o = this;
   var world = o._world;
   if(!world){
      world = o._world = MO.Class.create(MO.FEaiMapWorldResource);
      world.load();
   }
   return world;
}
MO.FEaiMapResourceConsole_dispose = function FEaiMapResourceConsole_dispose(){
   var o = this;
   o._world = MO.Lang.Object.dispose(o._world);
   o._countries = MO.Lang.Object.dispose(o._countries);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiMapWorldData = function FEaiMapWorldData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   o.construct   = MO.FEaiMapWorldData_construct;
   o.unserialize = MO.FEaiMapWorldData_unserialize;
   o.dispose     = MO.FEaiMapWorldData_dispose;
   return o;
}
MO.FEaiMapWorldData_construct = function FEaiMapWorldData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._countries = new MO.TObjects();
}
MO.FEaiMapWorldData_unserialize = function FEaiMapWorldData_unserialize(input){
   var o = this;
   var count = input.readInt32();
   if(count > 0){
      var countries = o._countries;
      for(var i = 0; i < count; i++){
         var country = MO.Class.create(MO.FEaiMapCountryData);
         country.unserialize(input);
         countries.push(country);
      }
   }
}
MO.FEaiMapWorldData_dispose = function FEaiMapWorldData_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiMapWorldResource = function FEaiMapWorldResource(o){
   o = MO.Class.inherits(this, o, MO.FResourcePackage);
   o._uri        = '{eai.resource}/data/world.dat';
   o._data       = MO.Class.register(o, new MO.AGetter('_data'));
   o.construct   = MO.FEaiMapWorldResource_construct;
   o.unserialize = MO.FEaiMapWorldResource_unserialize;
   o.load        = MO.FEaiMapWorldResource_load;
   o.dispose     = MO.FEaiMapWorldResource_dispose;
   return o;
}
MO.FEaiMapWorldResource_construct = function FEaiMapWorldResource_construct(){
   var o = this;
   o.__base.FResourcePackage.construct.call(o);
   o._data = MO.Class.create(MO.FEaiMapWorldData);
}
MO.FEaiMapWorldResource_unserialize = function FEaiMapWorldResource_unserialize(input){
   this._data.unserialize(input);
}
MO.FEaiMapWorldResource_dispose = function FEaiMapWorldResource_dispose(){
   var o = this;
   o._data = MO.Lang.Object.dispose(o._data);
   o.__base.FResourcePackage.dispose.call(o);
}
with(MO){
   MO.FEaiProvinceResource = function FEaiProvinceResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code         = RClass.register(o, new AGetter('_code'));
      o._name         = RClass.register(o, new AGetter('_name'));
      o._label        = RClass.register(o, new AGetter('_label'));
      o._typeCd       = RClass.register(o, new AGetter('_typeCd'));
      o._displayOrder = RClass.register(o, new AGetter('_displayOrder'));
      o.unserialize = FEaiProvinceResource_unserialize;
      return o;
   }
   MO.FEaiProvinceResource_unserialize = function FEaiProvinceResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._name = input.readString();
      o._label = input.readString();
      o._typeCd = input.readString();
      o._displayOrder = input.readUint16();
   }
}
with(MO){
   MO.FEaiProvinceResourceConsole = function FEaiProvinceResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._provinceCodes = RClass.register(o, new AGetter('_provinceCodes'));
      o._provinceNames = RClass.register(o, new AGetter('_provinceNames'));
      o.construct      = FEaiProvinceResourceConsole_construct;
      o.findByCode     = FEaiProvinceResourceConsole_findByCode;
      o.findByName     = FEaiProvinceResourceConsole_findByName;
      o.unserialize    = FEaiProvinceResourceConsole_unserialize;
      o.dispose        = FEaiProvinceResourceConsole_dispose;
      return o;
   }
   MO.FEaiProvinceResourceConsole_construct = function FEaiProvinceResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._provinceCodes = new TDictionary();
      o._provinceNames = new TDictionary();
   }
   MO.FEaiProvinceResourceConsole_findByCode = function FEaiProvinceResourceConsole_findByCode(code){
      return this._provinceCodes.get(code);
   }
   MO.FEaiProvinceResourceConsole_findByName = function FEaiProvinceResourceConsole_findByName(name){
      return this._provinceNames.get(name);
   }
   MO.FEaiProvinceResourceConsole_unserialize = function FEaiProvinceResourceConsole_unserialize(input){
      var o = this;
      var provinceCodes = o._provinceCodes;
      var provinceNames = o._provinceNames;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceResource);
         province.unserialize(input);
         provinceCodes.set(province.code(), province);
         provinceNames.set(province.name(), province);
      }
   }
   MO.FEaiProvinceResourceConsole_dispose = function FEaiProvinceResourceConsole_dispose(){
      var o = this;
      o._provinceCodes = RObject.dispose(o._provinceCodes);
      o._provinceNames = RObject.dispose(o._provinceNames);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FEaiRateResource = function FEaiRateResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._count      = MO.Class.register(o, new MO.AGetter('_count'));
   o._colors     = MO.Class.register(o, new MO.AGetter('_colors'));
   o.construct   = MO.FEaiRateResource_construct;
   o.find        = MO.FEaiRateResource_find;
   o.findRate    = MO.FEaiRateResource_findRate;
   o.unserialize = MO.FEaiRateResource_unserialize;
   o.dispose     = MO.FEaiRateResource_dispose;
   return o;
}
MO.FEaiRateResource_construct = function FEaiRateResource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiRateResource_find = function FEaiRateResource_find(value){
   var o = this;
   var index = parseInt(value);
   if(index < 0){
      index = 0;
   }
   if(index >= o._count){
      index = o._count - 1;
   }
   return o._colors[index];
}
MO.FEaiRateResource_findRate = function FEaiRateResource_findRate(rate){
   var o = this;
   var index = rate * o._count;
   var color = o.find(index);
   return color;
}
MO.FEaiRateResource_unserialize = function FEaiRateResource_unserialize(input){
   var o = this;
   var count = o._count = input.readInt32();
   var colors = o._colors = new Uint32Array(count);
   for(var i = 0; i < count; i++){
      colors[i] = input.readUint32();
   }
}
MO.FEaiRateResource_dispose = function FEaiRateResource_dispose(){
   var o = this;
   o._colors = null;
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiRateResourceConsole = function FEaiRateResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._rates      = RClass.register(o, new AGetter('_rates'));
      o.construct   = FEaiRateResourceConsole_construct;
      o.find        = FEaiRateResourceConsole_find;
      o.unserialize = FEaiRateResourceConsole_unserialize;
      o.dispose     = FEaiRateResourceConsole_dispose;
      return o;
   }
   MO.FEaiRateResourceConsole_construct = function FEaiRateResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._rates = new TObjects();
   }
   MO.FEaiRateResourceConsole_find = function FEaiRateResourceConsole_find(code){
      return this._rates.get(code);
   }
   MO.FEaiRateResourceConsole_unserialize = function FEaiRateResourceConsole_unserialize(input){
      var o = this;
      var count = o._count = input.readInt32();
      for(var i = 0; i < count; i++){
         var rate = MO.Class.create(FEaiRateResource);
         rate.unserialize(input)
         o._rates.push(rate);
      }
   }
   MO.FEaiRateResourceConsole_dispose = function FEaiRateResourceConsole_dispose(){
      var o = this;
      o._rates = RObject.dispose(o._rates);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FEaiResource = function FEaiResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   o.unserialize = MO.FEaiResource_unserialize;
   o.processLoad = MO.FEaiResource_processLoad;
   return o;
}
MO.FEaiResource_unserialize = function FEaiResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
}
MO.FEaiResource_processLoad = function FEaiResource_processLoad(){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
   o._scopeCd         = MO.EScope.Local;
   o._rateConsole     = MO.Class.register(o, new MO.AGetter('_rateConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._cardConsole     = MO.Class.register(o, new MO.AGetter('_cardConsole'));
   o._historyConsole  = MO.Class.register(o, new MO.AGetter('_historyConsole'));
   o._mapConsole      = MO.Class.register(o, new MO.AGetter('_mapConsole'));
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o._looper          = null;
   o._thread          = null;
   o._interval        = 100;
   o.onLoad           = MO.FEaiResourceConsole_onLoad;
   o.onProcess        = MO.FEaiResourceConsole_onProcess;
   o.construct        = MO.FEaiResourceConsole_construct;
   o.unserialize      = MO.FEaiResourceConsole_unserialize;
   o.load             = MO.FEaiResourceConsole_load;
   o.dispose          = MO.FEaiResourceConsole_dispose;
   return o;
}
MO.FEaiResourceConsole_onProcess = function FEaiResourceConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   while(looper.next()){
      var item = looper.current();
      if(item.processLoad()){
         looper.removeCurrent();
      }
   }
}
MO.FEaiResourceConsole_onLoad = function FEaiResourceConsole_onLoad(event){
   var o = this;
   var data = event.outputData();
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
   var event = new MO.SEvent();
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiResourceConsole_construct = function FEaiResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._looper = new MO.TLooper();
   o._rateConsole = MO.Class.create(MO.FEaiRateResourceConsole);
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceResourceConsole);
   var cityConsole = o._cityConsole = MO.Class.create(MO.FEaiCityResourceConsole);
   cityConsole.setResourceConsole(o);
   o._cardConsole = MO.Class.create(MO.FEaiCardResourceConsole);
   o._historyConsole = MO.Class.create(MO.FEaiHistoryResourceConsole);
   o._mapConsole = MO.Class.create(MO.FEaiMapResourceConsole);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._rateConsole.unserialize(input);
   o._provinceConsole.unserialize(input);
   o._cityConsole.unserialize(input);
   o._cardConsole.unserialize(input);
}
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiResourceConsole_dispose = function FEaiResourceConsole_dispose(monitor){
   var o = this;
   o._rateConsole = MO.Lang.Object.dispose(o._rateConsole);
   o._provinceConsole = MO.Lang.Object.dispose(o._provinceConsole);
   o._cityConsole = MO.Lang.Object.dispose(o._cityConsole);
   o._cardConsole = MO.Lang.Object.dispose(o._cardConsole);
   o._historyConsole = MO.Lang.Object.dispose(o._historyConsole);
   o._mapConsole = MO.Lang.Object.dispose(o._mapConsole);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiResourcePackage = function FEaiResourcePackage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code       = MO.Class.register(o, new MO.AGetter('_code'));
   o.unserialize = MO.FEaiResourcePackage_unserialize;
   o.processLoad = MO.FEaiResourcePackage_processLoad;
   return o;
}
MO.FEaiResourcePackage_unserialize = function FEaiResourcePackage_unserialize(input){
   var o = this;
   o._code = input.readUint16();
}
MO.FEaiResourcePackage_processLoad = function FEaiResourcePackage_processLoad(){
   var o = this;
   o._code = input.readUint16();
   o._cityCode = input.readUint16();
}
