MO.EEaiChapter = new function EEaiChapter(){
   var o = this;
   o.Loading = 'loading';
   o.Login   = 'login';
   o.Scene   = 'scene';
   o.Chart   = 'chart';
   return o;
}
MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartHistory    = 'chart.history';
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
with(MO){
   MO.FEaiEntity = function FEaiEntity(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
   MO.FEaiEntity_dispose = function FEaiEntity_dispose(){
      var o = this;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityResource = function FEaiCityResource(o){
      o = RClass.inherits(this, o, FObject);
      o._provinceCode  = RClass.register(o, new AGetSet('_provinceCode'));
      o._code          = RClass.register(o, new AGetSet('_code'));
      o._label         = RClass.register(o, new AGetSet('_label'));
      o._location      = RClass.register(o, new AGetter('_location'));
      o.construct      = FEaiCityResource_construct;
      o.unserialize    = FEaiCityResource_unserialize;
      o.dispose        = FEaiCityResource_dispose;
      return o;
   }
   MO.FEaiCityResource_construct = function FEaiCityResource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._location = new SPoint3();
   }
   MO.FEaiCityResource_unserialize = function FEaiCityResource_unserialize(input){
      var o = this;
      o._provinceCode = input.readUint16();
      o._code = input.readUint16();
      o._label = input.readString();
      o._location.unserialize(input);
   }
   MO.FEaiCityResource_dispose = function FEaiCityResource_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityResourceConsole = function FEaiCityResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._citys      = RClass.register(o, new AGetter('_citys'));
      o.construct   = FEaiCityResourceConsole_construct;
      o.unserialize = FEaiCityResourceConsole_unserialize;
      o.dispose     = FEaiCityResourceConsole_dispose;
      return o;
   }
   MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._citys = new TDictionary();
   }
   MO.FEaiCityResourceConsole_unserialize = function FEaiCityResourceConsole_unserialize(input){
      var o = this;
      var citys = o._citys;
      var cards = o._cards;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiCityResource);
         city.unserialize(input);
         citys.set(city.code(), city);
      }
   }
   MO.FEaiCityResourceConsole_dispose = function FEaiCityResourceConsole_dispose(){
      var o = this;
      o._citys = RObject.dispose(o._citys);
      o.__base.FConsole.dispose.call(o);
   }
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
with(MO){
   MO.FEaiHistoryResourceConsole = function FEaiHistoryResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._dates      = RClass.register(o, new AGetter('_dates'));
      o.construct   = FEaiHistoryResourceConsole_construct;
      o.unserialize = FEaiHistoryResourceConsole_unserialize;
      o.dispose     = FEaiHistoryResourceConsole_dispose;
      return o;
   }
   MO.FEaiHistoryResourceConsole_construct = function FEaiHistoryResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._dates = new TDictionary();
   }
   MO.FEaiHistoryResourceConsole_unserialize = function FEaiHistoryResourceConsole_unserialize(input){
      var o = this;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var date = RClass.create(FEaiHistoryDateResource);
         date.unserialize(input);
         o._dates.set(date.code(), date);
      }
   }
   MO.FEaiHistoryResourceConsole_dispose = function FEaiHistoryResourceConsole_dispose(){
      var o = this;
      o._dates = RObject.dispose(o._dates);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FEaiProvinceResource = function FEaiProvinceResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._name       = RClass.register(o, new AGetter('_name'));
      o._label      = RClass.register(o, new AGetSet('_label'));
      o.unserialize = FEaiProvinceResource_unserialize;
      return o;
   }
   MO.FEaiProvinceResource_unserialize = function FEaiProvinceResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._name = input.readString();
      o._label = input.readString();
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
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
   o._scopeCd         = MO.EScope.Local;
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._historyConsole  = MO.Class.register(o, new MO.AGetter('_historyConsole'));
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o.onLoad           = MO.FEaiResourceConsole_onLoad;
   o.construct        = MO.FEaiResourceConsole_construct;
   o.unserialize      = MO.FEaiResourceConsole_unserialize;
   o.load             = MO.FEaiResourceConsole_load;
   o.dispose          = MO.FEaiResourceConsole_dispose;
   return o;
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
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceResourceConsole);
   o._cityConsole = MO.RClass.create(MO.FEaiCityResourceConsole);
   o._historyConsole = MO.RClass.create(MO.FEaiHistoryResourceConsole);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._provinceConsole.unserialize(input);
   o._cityConsole.unserialize(input);
   o._historyConsole.unserialize(input);
}
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(){
   var o = this;
   var url = '/script/ars/eai/resource.dat';
   var connection = MO.RConsole.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiResourceConsole_dispose = function FEaiResourceConsole_dispose(monitor){
   var o = this;
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._historyConsole = RObject.dispose(o._historyConsole);
   o.__base.FConsole.dispose.call(o);
}
with(MO){
   MO.FEaiLogic = function FEaiLogic(o){
      o = RClass.inherits(this, o, FObject);
      o._code   = null;
      o.makeUrl = FEaiLogicOrganization_makeUrl;
      o.send    = FEaiLogicOrganization_send;
      return o;
   }
   MO.FEaiLogicOrganization_makeUrl = function FEaiLogicOrganization_makeUrl(method, parameters){
      var o = this;
      var serviceHost = MO.RConsole.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
      var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method;
      return url;
   }
   MO.FEaiLogicOrganization_send = function FEaiLogicOrganization_send(method, parameters, owner, callback){
      var o = this;
      var url = o.makeUrl(method, parameters);
      var connection = RConsole.find(FJsonConsole).sendAsync(url);
      connection.addProcessListener(owner, callback);
      return connection;
   }
}
with(MO){
   MO.FEaiLogicAchievement = function FEaiLogicAchievement(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'achievement';
      o.doGroup = FEaiLogicAchievement_doGroup;
      o.doSort  = FEaiLogicAchievement_doSort;
      o.doQuery = FEaiLogicAchievement_doQuery;
      return o;
   }
   MO.FEaiLogicAchievement_doGroup = function FEaiLogicAchievement_doGroup(owner, callback){
      return this.send('group', null, owner, callback);
   }
   MO.FEaiLogicAchievement_doSort = function FEaiLogicAchievement_doSort(owner, callback){
      return this.send('sort', null, owner, callback);
   }
   MO.FEaiLogicAchievement_doQuery = function FEaiLogicAchievement_doQuery(owner, callback){
      return this.send('query', null, owner, callback);
   }
}
MO.FEaiLogicConsole = function FEaiLogicConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   o._organization = null;
   o._achievement  = null;
   o._schedule     = null;
   o.construct     = MO.FEaiLogicConsole_construct;
   o.organization  = MO.FEaiLogicConsole_organization;
   o.achievement   = MO.FEaiLogicConsole_achievement;
   o.schedule      = MO.FEaiLogicConsole_schedule;
   return o;
}
MO.FEaiLogicConsole_construct = function FEaiLogicConsole_construct(monitor){
   var o = this;
   o._organization = MO.RClass.create(MO.FEaiLogicOrganization);
   o._achievement = MO.RClass.create(MO.FEaiLogicAchievement);
   o._schedule = MO.RClass.create(MO.FEaiLogicSchedule);
}
MO.FEaiLogicConsole_organization = function FEaiLogicConsole_organization(){
   return this._organization;
}
MO.FEaiLogicConsole_achievement = function FEaiLogicConsole_achievement(){
   return this._achievement;
}
MO.FEaiLogicConsole_schedule = function FEaiLogicConsole_schedule(){
   return this._schedule;
}
with(MO){
   MO.FEaiLogicOrganization = function FEaiLogicOrganization(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'organization';
      o._pIdMIndexDict = RClass.register(o, new AGetter('_pIdMIndexDict'));
      o._cityIdNameDict = RClass.register(o, new AGetter('_cityIdNameDict'));
      o._provinceColors = RClass.register(o, new AGetter('_provinceColors'));
      o.doFetch = FEaiLogicOrganization_doFetch;
      o.getMeshIndex = FEaiLogicOrganization_getMeshIndex;
      o.construct = FEaiLogicOrganization_construct;
      return o;
   }
   MO.FEaiLogicOrganization_construct = function FEaiLogicOrganization_construct(){
      var o = this;
      o.__base.FEaiLogic.construct.call(o);
      var pmDict = o._pIdMIndexDict = new TDictionary();
      pmDict.set(11, 6);
      pmDict.set(12, 7);
      pmDict.set(13, 5);
      pmDict.set(14, 8);
      pmDict.set(15, 2);
      pmDict.set(21, 4);
      pmDict.set(22, 3);
      pmDict.set(23, 1);
      pmDict.set(31, -1);
      pmDict.set(32, 21);
      pmDict.set(33, 22);
      pmDict.set(34, 20);
      pmDict.set(35, 30);
      pmDict.set(36, 23);
      pmDict.set(37, 9);
      pmDict.set(41, 10);
      pmDict.set(42, 19);
      pmDict.set(43, 29);
      pmDict.set(44, 24);
      pmDict.set(45, 25);
      pmDict.set(46, 0);
      pmDict.set(50, 18);
      pmDict.set(51, 17);
      pmDict.set(52, 26);
      pmDict.set(53, 27);
      pmDict.set(54, 16);
      pmDict.set(61, 12);
      pmDict.set(62, 13);
      pmDict.set(63, 15);
      pmDict.set(64, 11);
      pmDict.set(65, 14);
      pmDict.set(71, 28);
      pmDict.set(81, -1);
      pmDict.set(82, -1);
      var cinDict = o._cityIdNameDict = new TDictionary();
      var colors = o._provinceColors = new TObjects();
      colors.push(new SColor4(0.25, 0.50, 0.60));
      colors.push(new SColor4(0.30, 0.60, 0.75));
      colors.push(new SColor4(0.35, 0.70, 0.80));
      colors.push(new SColor4(0.40, 0.75, 0.85));
      colors.push(new SColor4(0.45, 0.85, 1.00));
   }
   MO.FEaiLogicOrganization_doFetch = function FEaiLogicOrganization_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
   MO.FEaiLogicOrganization_getMeshIndex = function FEaiLogicOrganization_getMeshIndex(provinceId){
      return this.pIdMIndexDict().value(provinceId);
   }
   MO.FEaiLogicOrganization_getMeshIndex = function FEaiLogicOrganization_getCityName(cityId) {
      return this.cityIdNameDict().value(cityId);
   }
}
with(MO){
   MO.FEaiLogicSchedule = function FEaiLogicSchedule(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'schedule';
      o.doFetch = FEaiLogicSchedule_doFetch;
      return o;
   }
   MO.FEaiLogicSchedule_doFetch = function FEaiLogicSchedule_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
}
with(MO){
   MO.MEaiCityRenderable = function MEaiCityRenderable(o){
      o = RClass.inherits(this, o);
      o._visible  = RClass.register(o, new AGetter('_visible'), true);
      o._location = RClass.register(o, new AGetter('_location'));
      o._size     = RClass.register(o, new AGetter('_size'));
      o._color    = RClass.register(o, new AGetter('_color'));
      o.construct = MEaiCityRenderable_construct;
      o.dispose   = MEaiCityRenderable_dispose;
      return o;
   }
   MO.MEaiCityRenderable_construct = function MEaiCityRenderable_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(1, 1, 1, 1);
   }
   MO.MEaiCityRenderable_dispose = function MEaiCityRenderable_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
   }
}
with(MO){
   MO.FEaiBoundaryData = function FEaiBoundaryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._positionCount = RClass.register(o, new AGetter('_positionCount'));
      o._positions     = RClass.register(o, new AGetter('_positions'));
      o._indexes       = RClass.register(o, new AGetter('_indexes'));
      o.construct      = FEaiBoundaryData_construct;
      o.unserialize    = FEaiBoundaryData_unserialize;
      o.dispose        = FEaiBoundaryData_dispose;
      return o;
   }
   MO.FEaiBoundaryData_construct = function FEaiBoundaryData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiBoundaryData_unserialize = function FEaiBoundaryData_unserialize(input){
      var o = this;
      var index = 0;
      var vertexCount = o._positionCount = input.readInt32();
      o._positions = new Float32Array(2 * vertexCount);
      for(var i = 0; i < vertexCount; i++){
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
      }
      var indexCount = input.readInt32();
      o._indexes = new Uint16Array(indexCount);
      for(var i = 0; i < indexCount; i++){
         o._indexes[i] = input.readUint16();
      }
   }
   MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
      var o = this;
      o._positions = null;
      o._indexes = null;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity, MEaiCityRenderable);
      o._data     = RClass.register(o, new AGetSet('_data'));
      o.construct = FEaiCityEntity_construct;
      o.build     = FEaiCityEntity_build;
      o.update    = FEaiCityEntity_update;
      o.dispose   = FEaiCityEntity_dispose;
      return o;
   }
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o.__base.MEaiCityRenderable.construct.call(o);
   }
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var total = Math.sqrt(data.investmentTotal()) / 100;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         o._color.set(total, 0, total, total);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = Math.sqrt(range);
      if(range < 1){
         range = 1;
      }
      if(range > 3){
         range = 3;
      }
      o._size.set(range, range);
   }
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      o.__base.MEaiCityRenderable.dispose.call(o);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.onImageLoad           = FEaiCitysRangeRenderable_onImageLoad;
      o.construct             = FEaiCitysRangeRenderable_construct;
      o.testReady             = FEaiCitysRangeRenderable_testReady;
      o.setup                 = FEaiCitysRangeRenderable_setup;
      o.upload                = FEaiCitysRangeRenderable_upload;
      o.loadUrl               = FEaiCitysRangeRenderable_loadUrl;
      o.dispose               = FEaiCitysRangeRenderable_dispose;
      return o;
   }
   MO.FEaiCitysRangeRenderable_onImageLoad = function FEaiCitysRangeRenderable_onImageLoad(event){
      var o = this;
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0, width, height);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FEaiCitysRangeRenderable_testReady = function FEaiCitysRangeRenderable_testReady(){
      return this._ready;
   }
   MO.FEaiCitysRangeRenderable_setup = function FEaiCitysRangeRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'control';
      materialInfo.optionAlpha = true;
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/dot.png');
   }
   MO.FEaiCitysRangeRenderable_upload = function FEaiCitysRangeRenderable_upload(){
      var o = this;
      var context = o._graphicContext;
      var citys = o._citys;
      var total = citys.count();
      var count = 0;
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            count++;
         }
      }
      var vertexTotal = o._vertexCount = 4 * count;
      var vertexCount = 4 * count;
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var coordPosition = 0;
      var coordData = new Float32Array(2 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var size = city.size();
            var width = size.width / 2;
            var height = size.height / 2;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            var color = city.color();
            var red = parseInt(color.red * 255);
            var green = parseInt(color.green * 255);
            var blue = parseInt(color.blue * 255);
            var alpha = parseInt(color.alpha * 255);
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = red;
               colorData[colorPosition++] = green;
               colorData[colorPosition++] = blue;
               colorData[colorPosition++] = alpha;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      var n = 0;
      var indexCount = 3 * 2 * count;
      var indexData = new Uint16Array(indexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         var index = 4 * i;
         if(city.visible()){
            indexData[n++] = index + 0;
            indexData[n++] = index + 1;
            indexData[n++] = index + 2;
            indexData[n++] = index + 0;
            indexData[n++] = index + 2;
            indexData[n++] = index + 3;
         }
      }
      o._indexBuffer.upload(indexData, indexCount);
   }
   MO.FEaiCitysRangeRenderable_loadUrl = function FEaiCitysRangeRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.onImageLoad           = FEaiCitysRenderable_onImageLoad;
      o.construct             = FEaiCitysRenderable_construct;
      o.testReady             = FEaiCitysRenderable_testReady;
      o.setup                 = FEaiCitysRenderable_setup;
      o.upload                = FEaiCitysRenderable_upload;
      o.loadUrl               = FEaiCitysRenderable_loadUrl;
      o.dispose               = FEaiCitysRenderable_dispose;
      return o;
   }
   MO.FEaiCitysRenderable_onImageLoad = function FEaiCitysRenderable_onImageLoad(event){
      var o = this;
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0, width, height);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FEaiCitysRenderable_testReady = function FEaiCitysRenderable_testReady(){
      return this._ready;
   }
   MO.FEaiCitysRenderable_setup = function FEaiCitysRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'control';
      materialInfo.optionAlpha = true;
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/dot.png');
   }
   MO.FEaiCitysRenderable_upload = function FEaiCitysRenderable_upload(){
      var o = this;
      var context = o._graphicContext;
      var citys = o._citys;
      var total = citys.count();
      var count = 0;
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            count++;
         }
      }
      var vertexTotal = o._vertexCount = 4 * count;
      var vertexCount = 4 * count;
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var coordPosition = 0;
      var coordData = new Float32Array(2 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var size = city.size();
            var width = 0.4;
            var height = 0.4;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            var color = city.color();
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = color.red * 255;
               colorData[colorPosition++] = color.green * 255;
               colorData[colorPosition++] = color.blue * 255;
               colorData[colorPosition++] = color.alpha * 255;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      var n = 0;
      var indexCount = 3 * 2 * count;
      var indexData = new Uint16Array(indexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         var index = 4 * i;
         if(city.visible()){
            indexData[n++] = index + 0;
            indexData[n++] = index + 1;
            indexData[n++] = index + 2;
            indexData[n++] = index + 0;
            indexData[n++] = index + 2;
            indexData[n++] = index + 3;
         }
      }
      o._indexBuffer.upload(indexData, indexCount);
   }
   MO.FEaiCitysRenderable_loadUrl = function FEaiCitysRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryData = function FEaiCountryData(o){
      o = RClass.inherits(this, o, FObject, MListener);
      o._listenersLoad = RClass.register(o, new AListener('_listenersLoad', EEvent.Load));
      o._provinces     = RClass.register(o, new AGetter('_provinces'));
      o.onLoaded       = FEaiCountryData_onLoaded;
      o.construct      = FEaiCountryData_construct;
      o.unserialize    = FEaiCountryData_unserialize;
      o.load           = FEaiCountryData_load;
      o.dispose        = FEaiCountryData_dispose;
      return o;
   }
   MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._provinces = new TDictionary();
   }
   MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
      var o = this;
      var data = event.outputData();
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(data);
      o.unserialize(view);
      view.dispose();
   }
   MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
      var o = this;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceData);
         province.unserialize(input);
         o._provinces.set(province.name(), province);
      }
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FEaiCountryData_load = function FEaiCountryData_load(){
      var o = this;
      var url = '/script/ars/eai/country.dat';
      var connection = RConsole.find(FHttpConsole).send(url);
      connection.addLoadListener(o, o.onLoaded);
   }
   MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._cameraDirection     = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration  = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.onMouseDown = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setCameraDirection(new SVector3(0.02, -0.9, 0.5));
      o.setCameraFrom(new SPoint3());
      o.setCameraTo(new SPoint3());
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(o.cameraDirection().x, o.cameraDirection().y, o.cameraDirection().z);
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         renderable.material().info().optionAlpha = true;
      }
      o.setStartTime(new Date());
   }
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else if(o.cameraMoving()) {
         o.cameraMoveAnime();
      }
      else{
         o.mouseOverFallAnime();
      }
   }
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime(){
      var o = this;
      var sprite = o.template().sprite();
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      if (timePassed < o.startDelay()) {
         return;
      }
      else{
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * sprite.renderables().count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
         var matrix = renderable.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
			risePercentage = 1;
			fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
			if (fallPercentage > 1) {
				fallPercentage = 1;
			}
         }
         matrix.ty = o.riseDistance() * risePercentage - o.fallDistance() * fallPercentage;
         matrix.updateForce();
      }
   }
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      var now = new Date();
      if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
         return;
      }
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (o.mouseOverRiseRenderable() != renderable) {
         if (o.mouseOverRiseRenderable()) {
            o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
         }
         o.setMouseOverRiseRenderable(renderable);
         if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
         	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
         }
      }
   }
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
         var renderable = o.mouseOverFallArray().at(i);
         var matrix = renderable.matrix();
         if (matrix.ty > o.riseDistance() - o.fallDistance()) {
         	matrix.ty -= 1;
         }
         else {
         	matrix.ty = o.riseDistance() - o.fallDistance();
         	o.mouseOverFallArray().erase(i);
         }
         matrix.updateForce();
      }
      if (o.mouseOverRiseRenderable()) {
         var riseMatrix = o.mouseOverRiseRenderable().matrix();
         if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
         	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
         	riseMatrix.updateForce();
         }
      }
   }
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      var content = event.content;
      var branchCount = new Object();
      for (var i = 0; i < content.collection.length; i++) {
         if(!branchCount[content.collection[i].province_id]){
            if(content.collection[i].province_id == null)
            {
            }
            branchCount[content.collection[i].province_id] = 1;
         }
         else{
            branchCount[content.collection[i].province_id]++;
            if (content.collection[i].province_id == null) {
               content.collection[i].label;
            }
         }
      }
      var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      var dict = logicConsole.organization().dict();
      var colors = logicConsole.organization().provinceColors();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         if (!bc) {
            bc = 0;
         }
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
         var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		 ambientColor.assign(colors.at(colorLv));
         renderable.material().update();
      }
   }
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
      var region = o.template().region();
      var camera = region.camera();
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (!renderable) {
         camera.setPosition(3, 24, -0.5);
         camera.update();
         return;
      }
      var outline = renderable.calculateOutline();
      var relativeOutline = new SOutline3d();
      relativeOutline.calculateFrom(outline, camera.matrix());
      var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
      var currentCenter = outline.center;
      var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
      var cameraPosition = camera.position();
      o.setStartTime(new Date());
      o.cameraFrom().assign(cameraPosition);
      o.cameraTo().assign(cameraTo);
      o.setCameraMoving(true);
   }
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      var p = timePassed / o.cameraMoveDuration();
      if (p >= 1) {
         p = 1;
         o.setCameraMoving(false);
      }
      p = 1-(1-p)*(1-p);
      var movingPosition = new SPoint3();
      movingPosition.slerp(o.cameraFrom(), o.cameraTo(), p);
      var camera = o.template().region().camera();
      camera.position().assign(movingPosition);
      camera.update();
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         if (renderable != o.mouseOverRiseRenderable()) {
            renderable.material().info().alphaRate = 1.5 - p;
            renderable.material().update();
         }
      }
   }
}
with(MO){
   MO.FEaiProvinceData = function FEaiProvinceData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._name             = RClass.register(o, new AGetSet('_name'));
      o._color            = RClass.register(o, new AGetSet('_color'));
      o._boundaries       = RClass.register(o, new AGetter('_boundaries'));
      o.construct         = FEaiProvinceData_construct;
      o.unserialize       = FEaiProvinceData_unserialize;
      o.dispose           = FEaiProvinceData_dispose;
      return o;
   }
   MO.FEaiProvinceData_construct = function FEaiProvinceData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._boundaries = new TObjects();
   }
   MO.FEaiProvinceData_unserialize = function FEaiProvinceData_unserialize(input){
      var o = this;
      o._name = input.readString();
      o._color = input.readUint32();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var boundary = RClass.create(FEaiBoundaryData);
         boundary.unserialize(input);
         o._boundaries.push(boundary);
      }
   }
   MO.FEaiProvinceData_dispose = function FEaiProvinceData_dispose(){
      var o = this;
      o._boundaries = RObject.dispose(o._boundaries);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o._layerDepth       = 1;
      o.construct         = FEaiProvinceEntity_construct;
      o.buildFace         = FEaiProvinceEntity_buildFace;
      o.buildBorder       = FEaiProvinceEntity_buildBorder;
      o.build             = FEaiProvinceEntity_build;
      o.update            = FEaiProvinceEntity_update;
      o.dispose           = FEaiProvinceEntity_dispose;
      return o;
   }
   MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiProvinceEntity_buildFace = function FEaiProvinceEntity_buildFace(context){
      var o = this;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var color = o._color;
      var vertexStart = 0;
      var vertexIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal * 2);
      var faceIndex = 0;
      var faceData = new Uint16Array(indexTotal * 2 + 3 * 2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = 0;
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
         }
         vertexStart += positionCount;
      }
      var layerStart = vertexStart;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = o._layerDepth;
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
         }
         vertexStart += positionCount;
      }
      var vertexStart = 0;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         for(var i = 0; i < positionCount; i++){
            if(i == positionCount - 1){
               faceData[faceIndex++] = vertexStart + i;
               faceData[faceIndex++] = vertexStart + 0;
               faceData[faceIndex++] = vertexStart + i + layerStart;
               faceData[faceIndex++] = vertexStart + 0;
               faceData[faceIndex++] = vertexStart + layerStart;
               faceData[faceIndex++] = vertexStart + i + layerStart;
            }else{
               faceData[faceIndex++] = vertexStart + i;
               faceData[faceIndex++] = vertexStart + i + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart;
               faceData[faceIndex++] = vertexStart + i + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart;
            }
         }
         vertexStart += positionCount;
      }
      var colorIndex = 0;
      var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
      var positionTotal = vertexTotal * 2;
      for(var i = 0; i < positionTotal; i++){
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0x9F;
         colors[colorIndex++] = 0x4F;
         colors[colorIndex++] = 255;
      }
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
   }
   MO.FEaiProvinceEntity_buildBorder = function FEaiProvinceEntity_buildBorder(context){
      var o = this;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var color = o._color;
      var vertexStart = 0;
      var vertexIndex = 0;
      var faceIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal * 2);
      var borderIndex = 0;
      var borderData = new Uint16Array(2 * vertexTotal + 2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = 0;
         }
         for(var i = 0; i < positionCount; i++){
            borderData[borderIndex++] = vertexStart + i;
            if(i == positionCount - 1){
               borderData[borderIndex++] = vertexStart;
            }else{
               borderData[borderIndex++] = vertexStart + i + 1;
            }
         }
         vertexStart += positionCount;
      }
      var layerStart = vertexStart;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = o._layerDepth;
         }
         vertexStart += positionCount;
      }
      var vertexStart = 0;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         for(var i = 0; i < positionCount; i++){
            borderData[borderIndex++] = vertexStart + i;
            borderData[borderIndex++] = vertexStart + i + layerStart;
         }
         vertexStart += positionCount;
      }
      var colorIndex = 0;
      var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x3B;
         colors[colorIndex++] = 0x49;
         colors[colorIndex++] = 0x54;
         colors[colorIndex++] = 255;
      }
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x5B;
         colors[colorIndex++] = 0x69;
         colors[colorIndex++] = 0x74;
         colors[colorIndex++] = 255;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable.indexBuffer().setLineWidth(1);
      renderable.indexBuffer().upload(borderData, borderIndex);
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
   }
   MO.FEaiProvinceEntity_build = function FEaiProvinceEntity_build(context){
      var o = this;
      var vertexTotal = 0;
      var indexTotal = 0;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      for(var i = 0; i < count; i++){
         var boundary = boundaries.at(i);
         vertexTotal += boundary.positionCount();
         indexTotal += boundary.indexes().length;
      }
      o._vertexTotal = vertexTotal;
      o._indexTotal = indexTotal;
      o.buildFace(context);
      o.buildBorder(context);
   }
   MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
      var o = this;
      var investmentTotal = data.investmentTotal();
      var rate = Math.sqrt(investmentTotal) / 100;
   }
   MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiChartCustomerScene = function FEaiChartCustomerScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code        = MO.EEaiScene.ChartCustomer;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartCustomerScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartCustomerScene_onKeyDown;
   o.setup        = MO.FEaiChartCustomerScene_setup;
   o.selectDate   = MO.FEaiChartCustomerScene_selectDate;
   o.active       = MO.FEaiChartCustomerScene_active;
   o.process      = MO.FEaiChartCustomerScene_process;
   o.deactive     = MO.FEaiChartCustomerScene_deactive;
   return o;
}
MO.FEaiChartCustomerScene_onLoadData = function FEaiChartCustomerScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartCustomerScene_onKeyDown = function FEaiChartCustomerScene_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   if(keyCode == MO.EKeyCode.N){
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.M){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.L){
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartCustomerScene_selectDate = function FEaiChartCustomerScene_selectDate(code){
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for(var i = 0; i < count; i++){
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartCustomerScene_setup = function FEaiChartCustomerScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
}
MO.FEaiChartCustomerScene_active = function FEaiChartCustomerScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartCustomerScene_process = function FEaiChartCustomerScene_process(){
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if(o._playing){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if(code == endCode){
         o._playing = false;
      }
   }
}
MO.FEaiChartCustomerScene_deactive = function FEaiChartCustomerScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code        = MO.EEaiScene.ChartHistory;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartHistoryScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartHistoryScene_onKeyDown;
   o.setup        = MO.FEaiChartHistoryScene_setup;
   o.selectDate   = MO.FEaiChartHistoryScene_selectDate;
   o.active       = MO.FEaiChartHistoryScene_active;
   o.process      = MO.FEaiChartHistoryScene_process;
   o.deactive     = MO.FEaiChartHistoryScene_deactive;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartHistoryScene_onKeyDown = function FEaiChartHistoryScene_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   if(keyCode == MO.EKeyCode.N){
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.M){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.L){
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code){
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for(var i = 0; i < count; i++){
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
}
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartHistoryScene_process = function FEaiChartHistoryScene_process(){
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if(o._playing){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if(code == endCode){
         o._playing = false;
      }
   }
}
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartIndustryScene = function FEaiChartIndustryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code        = MO.EEaiScene.ChartIndustry;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartIndustryScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartIndustryScene_onKeyDown;
   o.setup        = MO.FEaiChartIndustryScene_setup;
   o.selectDate   = MO.FEaiChartIndustryScene_selectDate;
   o.active       = MO.FEaiChartIndustryScene_active;
   o.process      = MO.FEaiChartIndustryScene_process;
   o.deactive     = MO.FEaiChartIndustryScene_deactive;
   return o;
}
MO.FEaiChartIndustryScene_onLoadData = function FEaiChartIndustryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartIndustryScene_onKeyDown = function FEaiChartIndustryScene_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   if(keyCode == MO.EKeyCode.N){
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.M){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.L){
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartIndustryScene_selectDate = function FEaiChartIndustryScene_selectDate(code){
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for(var i = 0; i < count; i++){
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartIndustryScene_setup = function FEaiChartIndustryScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
}
MO.FEaiChartIndustryScene_active = function FEaiChartIndustryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartIndustryScene_process = function FEaiChartIndustryScene_process(){
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if(o._playing){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if(code == endCode){
         o._playing = false;
      }
   }
}
MO.FEaiChartIndustryScene_deactive = function FEaiChartIndustryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartInvestment;
   o._playing = false;
   o._startDate = null;
   o._endDate = null;
   o._currentDate = null;
   o._currentRow = 0;
   o._lastDateRowCount = 0;
   o._timeline = null;
   o.onLoadData = MO.FEaiChartInvestmentScene_onLoadData;
   o.onKeyDown = MO.FEaiChartInvestmentScene_onKeyDown;
   o.setup = MO.FEaiChartInvestmentScene_setup;
   o.selectDate = MO.FEaiChartInvestmentScene_selectDate;
   o.active = MO.FEaiChartInvestmentScene_active;
   o.process = MO.FEaiChartInvestmentScene_process;
   o.deactive = MO.FEaiChartInvestmentScene_deactive;
   return o;
}
MO.FEaiChartInvestmentScene_onLoadData = function FEaiChartInvestmentScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartInvestmentScene_onKeyDown = function FEaiChartInvestmentScene_onKeyDown(event) {
   var o = this;
   var keyCode = event.keyCode;
   if (keyCode == MO.EKeyCode.N) {
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if (keyCode == MO.EKeyCode.M) {
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if (keyCode == MO.EKeyCode.L) {
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartInvestmentScene_selectDate = function FEaiChartInvestmentScene_selectDate(code) {
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if (dateData) {
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for (var i = 0; i < count; i++) {
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var invesTable = document.getElementById('id_investment_table');
      for (var i = 0; i < o._lastDateRowCount; i++) {
         var row = invesTable.rows[o._currentRow - i];
         row.style.display = 'none';
      }
      for (var i = 0; i < count; i++) {
         var row = invesTable.rows[o._currentRow + 1 + i];
         row.style.display = '';
      }
      o._currentRow += count;
      o._lastDateRowCount = count;
      o._timeline.setDegreeTime(o._currentDate);
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var invesTable = document.getElementById('id_investment_table');
   var currentDate = o._currentDate;
   while (true) {
      var dateData = historyConsole.dates().get(currentDate.format('YYYYMMDD'));
      if (dateData) {
         var provincesData = dateData.provinces();
         var count = provincesData.count();
         for (var i = 0; i < count; i++) {
            var provinceInvesData = provincesData.at(i);
            var provinceResData = provinceConsole.findByCode(provinceInvesData.code());
            var row = invesTable.insertRow(invesTable.rows.length);
            var labelCol = row.insertCell(0);
            var invesCol = row.insertCell(1);
            labelCol.innerHTML = provinceResData.label();
            if (provinceInvesData.investmentTotal() > 1000) {
               invesCol.innerHTML = MO.RFloat.unitFormat(provinceInvesData.investmentTotal(), 0, 0, 2, 0, 10000, '万');
            }
            else {
               invesCol.innerHTML = provinceInvesData.investmentTotal();
            }
            row.style.display = 'none';
         }
         currentDate.addDay(1);
      }
      else {
         break;
      }
   }
   o._currentDate.parseAuto('20140701');
   var stage = o.activeStage();
   var layer = stage.faceLayer();
   var timeline = o._timeline = MO.RClass.create(MO.FGuiTimeline);
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas._size.height - 100);
   timeline.setWidth(MO.Eai.Canvas._size.width - 50);
   timeline.setHeight(100);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Day);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.linkGraphicContext(o);
   timeline.build();
   layer.push(timeline);
}
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartInvestmentScene_process = function FEaiChartInvestmentScene_process() {
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if (o._playing) {
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if (code == endCode) {
         o._playing = false;
      }
   }
}
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._countryData      = null;
   o._provinceEntities = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities     = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o.onLoadData        = MO.FEaiChartScene_onLoadData;
   o.construct         = MO.FEaiChartScene_construct;
   o.setup             = MO.FEaiChartScene_setup;
   o.active            = MO.FEaiChartScene_active;
   o.deactive          = MO.FEaiChartScene_deactive;
   o.dispose           = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var context = MO.Eai.Canvas.graphicContext();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      o._provinceEntities.set(province.code(), provinceEntity);
      mapLayer.pushRenderable(provinceEntity.faceRenderable());
      borderLayer.pushRenderable(provinceEntity.borderRenderable());
   }
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var citys = cityConsole.citys();
   var count = citys.count();
   var citysRenderable = o._citysRenderable;
   var citysRangeRenderable = o._citysRangeRenderable;
   for(var i = 0; i < count; i++){
      var city = citys.at(i);
      var cityLocation = city.location();
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
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
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
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinceEntities = RObject.dispose(o._provinceEntities);
   o._cityEntities = RObject.dispose(o._cityEntities);
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer    = MO.RClass.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer = MO.RClass.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer      = MO.RClass.register(o, new MO.AGetter('_cityLayer'));
   o._dataLayer      = MO.RClass.register(o, new MO.AGetter('_dataLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct       = MO.FEaiChartStage_construct;
   return o;
}
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   var layer = o._borderLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   var layer = o._cityLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   var layer = o._cityRangeLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   var layer = o._dataLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('DataLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Company;
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.Country;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiCountryScene_onTemplateLoad;
   o.setup            = MO.FEaiCountryScene_setup;
   o.active           = MO.FEaiCountryScene_active;
   o.deactive         = MO.FEaiCountryScene_deactive;
   return o;
}
MO.FEaiCountryScene_onTemplateLoad = function FEaiCountryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiCountryScene_setup = function FEaiCountryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiCountryScene_active = function FEaiCountryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiCountryScene_deactive = function FEaiCountryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiGroupReportScene = function FEaiGroupReportScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.GroupReport;
   return o;
}
MO.FEaiGroupScene = function FEaiGroupScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Group;
   return o;
}
with(MO){
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FScene);
      o._frames         = RClass.register(o, new AGetter('_frames'));
      o._engineInfo     = null;
      o.construct       = FEaiScene_construct;
      o.registerFrame   = FEaiScene_registerFrame;
      o.unregisterFrame = FEaiScene_unregisterFrame;
      o.setup           = MO.FEaiScene_setup;
      o.active          = MO.FEaiScene_active;
      o.deactive        = MO.FEaiScene_deactive;
      o.process         = FEaiScene_process;
      o.disposet        = FEaiScene_dispose;
      return o;
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
      o._frames = new TObjects();
   }
   MO.FEaiScene_registerFrame = function FEaiScene_registerFrame(frame){
      this._frames.push(frame);
   }
   MO.FEaiScene_unregisterFrame = function FEaiScene_unregisterFrame(frame){
      this._frames.remove(frame);
   }
   MO.FEaiScene_setup = function FEaiScene_setup(){
      var o = this;
      o.__base.FScene.setup.call(o);
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 200);
      control.build();
   }
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FScene.active.call(o);
      var stage = o._activeStage;
      MO.Eai.Canvas.selectStage(stage);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.push(o._engineInfo);
      o._engineInfo.setStage(stage);
   }
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FScene.deactive.call(o);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.remove(o._engineInfo.renderable());
      MO.Eai.Canvas.selectStage(null);
   }
   MO.FEaiScene_process = function FEaiScene_process(){
      var o = this;
      if(o._engineInfo){
         o._engineInfo.psUpdate();
      }
      var count = o._frames.count();
      for(var i = 0; i < count; i++){
         var frame = o._frames.at(i);
         frame.psUpdate();
      }
      o.__base.FScene.process.call(o);
   }
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._frames = RObject.dispose(o._frames);
      o.__base.FScene.dispose.call(o);
   }
}
with(MO){
   MO.FEaiChapter = function FEaiChapter(o){
      o = RClass.inherits(this, o, FChapter);
      return o;
   }
}
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code             = MO.EEaiChapter.Chart;
   o._sceneHistory     = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneIndustry    = MO.Class.register(o, new MO.AGetter('_sceneIndustry'));
   o._sceneInvestment  = MO.Class.register(o, new MO.AGetter('_sceneInvestment'));
   o._sceneCustomer    = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o.construct         = MO.FEaiChartChapter_construct;
   o.setup             = MO.FEaiChartChapter_setup;
   o.process           = MO.FEaiChartChapter_process;
   o.dispose           = MO.FEaiChartChapter_dispose;
   return o;
}
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiChartChapter_setup = function FEaiChartChapter_setup(){
   var o = this;
   var scene = o._sceneHistory = MO.RClass.create(MO.FEaiChartHistoryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneIndustry = MO.RClass.create(MO.FEaiChartIndustryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneInvestment = MO.RClass.create(MO.FEaiChartInvestmentScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCustomer = MO.RClass.create(MO.FEaiChartCustomerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
MO.FEaiLoadingChapter = function FEaiLoadingChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Loading;
   return o;
}
MO.FEaiLoginChapter = function FEaiLoginChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Login;
   return o;
}
MO.FEaiSceneChapter = function FEaiSceneChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code             = MO.EEaiChapter.Scene;
   o._sceneCountry     = null;
   o._sceneGroup       = null;
   o._sceneGroupReport = null;
   o._sceneCompany     = null;
   o.construct         = MO.FEaiSceneChapter_construct;
   o.setup             = MO.FEaiSceneChapter_setup;
   o.process           = MO.FEaiSceneChapter_process;
   o.dispose           = MO.FEaiSceneChapter_dispose;
   return o;
}
MO.FEaiSceneChapter_construct = function FEaiSceneChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiSceneChapter_setup = function FEaiSceneChapter_setup(){
   var o = this;
   var scene = o._sceneCountry = MO.RClass.create(MO.FEaiCountryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroup = MO.RClass.create(MO.FEaiGroupScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroupReport = MO.RClass.create(MO.FEaiGroupReportScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCompany = MO.RClass.create(MO.FEaiCompanyScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}
MO.FEaiSceneChapter_process = function FEaiSceneChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiSceneChapter_dispose = function FEaiSceneChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._thread   = null;
      o._interval = 10;
      o.construct = FEaiApplication_construct;
      o.dispose   = FEaiApplication_dispose;
      return o;
   }
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.process);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      o.__base.FApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._scaleRate          = 1;
      o._optionAlpha        = true;
      o._activeStage        = RClass.register(o, new AGetter('_activeStage'));
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FEaiCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiCanvas_onMouseCaptureStop;
      o.onResize            = FEaiCanvas_onResize;
      o.construct           = FEaiCanvas_construct;
      o.build               = FEaiCanvas_build;
      o.setPanel            = FEaiCanvas_setPanel;
      o.selectStage         = FEaiCanvas_selectStage;
      o.dispose             = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onEnterFrame = function FEaiCanvas_onEnterFrame(){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      var c = stage.camera();
      var d = 0.5;
      var r = 0.05;
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if(kw && !ks){
         c.doWalk(d);
      }
      if(!kw && ks){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var ls = stage.layers();
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var m = l.matrix();
            m.setRotation(0, r.y, 0);
            m.update();
         }
         r.y += 0.01;
      }
   }
   MO.FEaiCanvas_onMouseCaptureStart = function FEaiCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeStage;
      if(!s){
         return;
      }
      var r = o._activeStage.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FEaiCanvas_onMouseCapture = function FEaiCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeStage;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeStage.camera();
      var r = c.rotation();
      var cr = o._captureRotation;
      r.x = cr.x + cy * 0.003;
      r.y = cr.y + cx * 0.003;
   }
   MO.FEaiCanvas_onMouseCaptureStop = function FEaiCanvas_onMouseCaptureStop(p){
   }
   MO.FEaiCanvas_onResize = function FEaiCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var context = o._graphicContext;
      var size = context.size();
      var stage = o._activeStage;
      if(stage){
         var projection = stage.camera().projection();
         projection.size().set(size.width, size.height);
         projection.update();
      }
   }
   MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }
   MO.FEaiCanvas_build = function FEaiCanvas_build(hPanel){
      var o = this;
      o.__base.FE3dCanvas.build.call(o, hPanel);
   }
   MO.FEaiCanvas_setPanel = function FEaiCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
   }
   MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
      var o = this;
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      o._activeStage = stage;
   }
   MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FEaiChartApplication = function FEaiChartApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      o._sceneCode      = RClass.register(o, new AGetSet('_sceneCode'), MO.EEaiScene.ChartHistory);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      o._thread         = null;
      o._interval       = 10;
      o.onLoadResource  = FEaiChartApplication_onLoadResource;
      o.construct       = FEaiChartApplication_construct;
      o.setup           = FEaiChartApplication_setup;
      o.dispose         = FEaiChartApplication_dispose;
      return o;
   }
   MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
      var o = this;
      var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
      var scene = chapter.selectSceneByCode(o._sceneCode);
   }
   MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
   }
   MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(){
      var o = this;
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
      resourceConsole.addLoadListener(o, o.onLoadResource);
      resourceConsole.load();
   }
   MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
      var o = this;
      o._chapterLoading = RObject.dispose(o._chapterLoading);
      o._chapterChart = RObject.dispose(o._chapterChart);
      o.__base.FEaiApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiPlatformApplication = function FEaiPlatformApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterLogin   = RClass.register(o, new AGetter('_chapterLogin'));
      o._chapterScene   = RClass.register(o, new AGetter('_chapterScene'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      o._thread         = null;
      o._interval       = 10;
      o.onLoadResource  = FEaiPlatformApplication_onLoadResource;
      o.construct       = FEaiPlatformApplication_construct;
      o.setup           = FEaiPlatformApplication_setup;
      o.dispose         = FEaiPlatformApplication_dispose;
      return o;
   }
   MO.FEaiPlatformApplication_onLoadResource = function FEaiPlatformApplication_onLoadResource(){
      var o = this;
      var chapter = o.selectChapterByCode(MO.EEaiChapter.Scene);
      var scene = chapter.selectSceneByCode(MO.EEaiScene.Country);
   }
   MO.FEaiPlatformApplication_construct = function FEaiPlatformApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
   }
   MO.FEaiPlatformApplication_setup = function FEaiPlatformApplication_setup(){
      var o = this;
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var chapter = o._chapterLogin = MO.RClass.create(MO.FEaiLoginChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var chapter = o._chapterScene = MO.RClass.create(MO.FEaiSceneChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
      resourceConsole.addLoadListener(o, o.onLoadResource);
      resourceConsole.load();
   }
   MO.FEaiPlatformApplication_dispose = function FEaiPlatformApplication_dispose(){
      var o = this;
      o.__base.FEaiApplication.dispose.call(o);
   }
}
MO.Eai.setup = function Eai_setup(clazz, hPanel){
   var o = this;
   o._hPanel = hPanel;
   var application = o.Application = MO.RClass.create(clazz);
   var canvas = o.Canvas = MO.RClass.create(MO.FEaiCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   application.linkGraphicContext(canvas);
   application.setup();
   return application;
}
