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
   o.DefaultCountry = "china";
   o.LogicService   = "eai.logic.service";
   o.ServiceHost    = "eai.host.service";
   o.Resource       = "eai.resource";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line            = 0;
   o.Map             = 1;
   o.Investment      = 2;
   o.InvestmentRange = 3;
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartTotal      = 'chart.total';
   o.ChartHistory    = 'chart.history';
   o.ChartCustomer   = 'chart.customer';
   o.ChartMarketer   = 'chart.marketer';
   o.ChartDepartment = 'chart.department';
   o.ChartLive       = 'chart.live';
   o.ChartWorld      = 'chart.world';
   o.ChartSales      = 'chart.sales';
   o.ChartIndustry    = 'chart.industry';
   o.ChartInvestment  = 'chart.investment';
   o.ChartPerformence = 'chart.performence';
   o.ChartCustomer             = 'chart.customer';
   o.ChartMarketerCustomer     = 'chart.marketer.customer';
   o.ChartMarketerMarketer     = 'chart.marketer.marketer';
   o.ChartDepartmentCustomer   = 'chart.department.customer';
   o.ChartDepartmentMarketer   = 'chart.department.marketer';
   o.ChartDepartmentDepartment = 'chart.department.department';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
MO.FEaiCardResource = function FEaiCardResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._code     = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.Uint16)]);
   o._cityCode = MO.Class.register(o, [new MO.AGetter('_cityCode'), new MO.APersistence('_cityCode', MO.EDataType.Uint16)]);
   return o;
}
MO.FEaiCardResourceModule = function FEaiCardResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   o._cards       = MO.Class.register(o, new MO.AGetter('_cards'));
   o.construct    = MO.FEaiCardResourceModule_construct;
   o.find         = MO.FEaiCardResourceModule_find;
   o.findCityCode = MO.FEaiCardResourceModule_findCityCode;
   o.unserialize  = MO.FEaiCardResourceModule_unserialize;
   o.dispose      = MO.FEaiCardResourceModule_dispose;
   return o;
}
MO.FEaiCardResourceModule_construct = function FEaiCardResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._cards = new MO.TDictionary();
}
MO.FEaiCardResourceModule_find = function FEaiCardResourceModule_find(code){
   return this._cards.get(code);
}
MO.FEaiCardResourceModule_findCityCode = function FEaiCardResourceModule_findCityCode(code){
   var cityCode = null;
   var card = this._cards.get(code);
   if(card){
      cityCode = card.cityCode();
   }
   return cityCode;
}
MO.FEaiCardResourceModule_unserialize = function FEaiCardResourceModule_unserialize(input){
   var o = this;
   var cards = o._cards;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var card = MO.Class.create(MO.FEaiCardResource);
      card.unserialize(input);
      cards.set(card.code(), card);
   }
}
MO.FEaiCardResourceModule_dispose = function FEaiCardResourceModule_dispose(){
   var o = this;
   o._cards = MO.Lang.Object.dispose(o._cards);
   o.__base.FEaiResourceModule.dispose.call(o);
}
MO.FEaiCityResource = function FEaiCityResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._provinceCode = MO.Class.register(o, [new MO.AGetter('_provinceCode'), new MO.APersistence('_provinceCode', MO.EDataType.Uint16)]);
   o._code         = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.Uint16)]);
   o._label        = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._level        = MO.Class.register(o, [new MO.AGetter('_level'), new MO.APersistence('_level', MO.EDataType.Uint16)]);
   o._location     = MO.Class.register(o, [new MO.AGetter('_location'), new MO.APersistence('_location', MO.EDataType.Struct, MO.SPoint2)]);
   return o;
}
MO.FEaiCityResourceModule = function FEaiCityResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   o._resourceConsole = MO.Class.register(o, new MO.AGetSet('_resourceConsole'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct        = MO.FEaiCityResourceModule_construct;
   o.find             = MO.FEaiCityResourceModule_find;
   o.findByCard       = MO.FEaiCityResourceModule_findByCard;
   o.unserialize      = MO.FEaiCityResourceModule_unserialize;
   o.dispose          = MO.FEaiCityResourceModule_dispose;
   return o;
}
MO.FEaiCityResourceModule_construct = function FEaiCityResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._citys = new MO.TDictionary();
}
MO.FEaiCityResourceModule_find = function FEaiCityResourceModule_find(code){
   return this._citys.get(code);
}
MO.FEaiCityResourceModule_findByCard = function FEaiCityResourceModule_findByCard(card) {
   var o = this;
   var city = null;
   var cardModule = o._resourceConsole.cardModule();
   var cityCode = cardModule.findCityCode(card);
   if(cityCode){
      city = o._citys.get(cityCode);
   }
   return city;
}
MO.FEaiCityResourceModule_unserialize = function FEaiCityResourceModule_unserialize(input){
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
MO.FEaiCityResourceModule_dispose = function FEaiCityResourceModule_dispose(){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   o.__base.FEaiResourceModule.dispose.call(o);
}
MO.FEaiDepartmentResource = function FEaiDepartmentResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._code      = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label     = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._fullLabel = MO.Class.register(o, [new MO.AGetter('_fullLabel'), new MO.APersistence('_fullLabel', MO.EDataType.String)]);
   return o;
}
MO.FEaiDepartmentResourceModule = function FEaiDepartmentResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule, MO.MPersistence);
   o._departments     = MO.Class.register(o, [new MO.AGetter('_departments'), new MO.APersistence('_departments', MO.EDataType.Objects, MO.FEaiDepartmentResource)]);
   o.construct        = MO.FEaiDepartmentResourceModule_construct;
   o.find             = MO.FEaiDepartmentResourceModule_find;
   o.findByFullLabel  = MO.FEaiDepartmentResourceModule_findByFullLabel;
   o.dispose          = MO.FEaiDepartmentResourceModule_dispose;
   return o;
}
MO.FEaiDepartmentResourceModule_construct = function FEaiDepartmentResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._departments = new MO.TObjects();
}
MO.FEaiDepartmentResourceModule_find = function FEaiDepartmentResourceModule_find(code){
   return this._departments.get(code);
}
MO.FEaiDepartmentResourceModule_findByFullLabel = function FEaiDepartmentResourceModule_findByFullLabel(fullLabel) {
   var o = this;
   var departments = o._departments;
   var count = departments.count();
   for(var i = 0; i < count; i++){
      var department = departments.at(i);
      if(department.fullLabel() == fullLabel){
         return department;
      }
   }
   return null;
}
MO.FEaiDepartmentResourceModule_dispose = function FEaiDepartmentResourceModule_dispose(){
   var o = this;
   o._departments = MO.Lang.Object.dispose(o._departments);
   o.__base.FEaiResourceModule.dispose.call(o);
}
MO.FEaiHistoryCityResource = function FEaiHistoryCityResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code            = MO.Class.register(o, new MO.AGetSet('_code'));
   o._investmentDay   = MO.Class.register(o, new MO.AGetSet('_investmentDay'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   o.unserialize      = MO.FEaiHistoryCityResource_unserialize;
   return o;
}
MO.FEaiHistoryCityResource_unserialize = function FEaiHistoryCityResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
}
MO.FEaiHistoryDateResource = function FEaiHistoryDateResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code            = MO.Class.register(o, new MO.AGetter('_code'));
   o._investmentDay   = MO.Class.register(o, new MO.AGetter('_investmentDay'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._provinces       = MO.Class.register(o, new MO.AGetter('_provinces'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct        = MO.FEaiHistoryDateResource_construct;
   o.unserialize      = MO.FEaiHistoryDateResource_unserialize;
   o.dispose          = MO.FEaiHistoryDateResource_dispose;
   return o;
}
MO.FEaiHistoryDateResource_construct = function FEaiHistoryDateResource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._provinces = new MO.TDictionary();
   o._citys = new MO.TDictionary();
}
MO.FEaiHistoryDateResource_unserialize = function FEaiHistoryDateResource_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
   var provinces = o._provinces;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   var citys = o._citys;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
   }
}
MO.FEaiHistoryDateResource_dispose = function FEaiHistoryDateResource_dispose(){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o._citys = MO.Lang.Object.dispose(o._citys);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiHistoryMilestoneResource = function FEaiHistoryMilestoneResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code            = MO.Class.register(o, new MO.AGetSet('_code'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   o._dayCount        = MO.Class.register(o, new MO.AGetSet('_dayCount'));
   o._companyCount    = MO.Class.register(o, new MO.AGetSet('_companyCount'));
   o._staffCount      = MO.Class.register(o, new MO.AGetSet('_staffCount'));
   o.unserialize      = MO.FEaiHistoryMilestoneResource_unserialize;
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
MO.FEaiHistoryProvinceResource = function FEaiHistoryProvinceResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code            = MO.Class.register(o, new MO.AGetSet('_code'));
   o._investmentDay   = MO.Class.register(o, new MO.AGetSet('_investmentDay'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   o.unserialize      = MO.FEaiHistoryProvinceResource_unserialize;
   return o;
}
MO.FEaiHistoryProvinceResource_unserialize = function FEaiHistoryProvinceResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
}
MO.FEaiHistoryResourceModule = function FEaiHistoryResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule, MO.MListener);
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
   o.onLoad                   = MO.FEaiHistoryResourceModule_onLoad;
   o.construct                = MO.FEaiHistoryResourceModule_construct;
   o.unserialize              = MO.FEaiHistoryResourceModule_unserialize;
   o.load                     = MO.FEaiHistoryResourceModule_load;
   o.dispose                  = MO.FEaiHistoryResourceModule_dispose;
   return o;
}
MO.FEaiHistoryResourceModule_onLoad = function FEaiHistoryResourceModule_onLoad(event){
   var o = this;
   var data = event.content;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
   var event = new MO.SEvent();
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiHistoryResourceModule_construct = function FEaiHistoryResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._provinces = new MO.TDictionary();
   o._citys = new MO.TDictionary();
   o._milestones = new MO.TDictionary();
   o._dates = new MO.TDictionary();
}
MO.FEaiHistoryResourceModule_unserialize = function FEaiHistoryResourceModule_unserialize(input){
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
MO.FEaiHistoryResourceModule_load = function FEaiHistoryResourceModule_load(){
   var o = this;
   var uri = '{eai.resource}/investment.dat?date=' + MO.Lang.Date.format();
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiHistoryResourceModule_dispose = function FEaiHistoryResourceModule_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o._citys = RObject.dispose(o._citys);
   o._milestones = RObject.dispose(o._milestones);
   o._dates = RObject.dispose(o._dates);
   o.__base.FEaiResourceModule.dispose.call(o);
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
MO.FEaiMapCountryResource = function FEaiMapCountryResource(o){
   o = MO.Class.inherits(this, o, MO.FResourcePackage);
   o._data       = MO.Class.register(o, new MO.AGetter('_data'));
   o.construct   = MO.FEaiMapCountryResource_construct;
   o.unserialize = MO.FEaiMapCountryResource_unserialize;
   o.dispose     = MO.FEaiMapCountryResource_dispose;
   return o;
}
MO.FEaiMapCountryResource_construct = function FEaiMapCountryResource_construct(){
   var o = this;
   o.__base.FResourcePackage.construct.call(o);
   o._data = MO.Class.create(MO.FEaiMapCountryData);
}
MO.FEaiMapCountryResource_unserialize = function FEaiMapCountryResource_unserialize(input){
   this._data.unserialize(input);
}
MO.FEaiMapCountryResource_dispose = function FEaiMapCountryResource_dispose(){
   var o = this;
   o._data = MO.Lang.Object.dispose(o._data);
   o.__base.FResourcePackage.dispose.call(o);
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
MO.FEaiMapResourceModule = function FEaiMapResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   o._world            = MO.Class.register(o, new MO.AGetter('_world'));
   o._countries        = MO.Class.register(o, new MO.AGetter('_countries'));
   o.construct         = MO.FEaiMapResourceModule_construct;
   o.findCountryByCode = MO.FEaiMapResourceModule_findCountryByCode;
   o.loadCountry       = MO.FEaiMapResourceModule_loadCountry;
   o.loadWorld         = MO.FEaiMapResourceModule_loadWorld;
   o.dispose           = MO.FEaiMapResourceModule_dispose;
   return o;
}
MO.FEaiMapResourceModule_construct = function FEaiMapResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._countries = new MO.TDictionary();
}
MO.FEaiMapResourceModule_findCountryByCode = function FEaiMapResourceModule_findCountryByCode(code){
   return this._countries.get(code);
}
MO.FEaiMapResourceModule_loadCountry = function FEaiMapResourceModule_loadCountry(code){
   var o = this;
   var countries = o._countries;
   var country = countries.get(name);
   if(!country){
      country = MO.Class.create(MO.FEaiMapCountryResource);
      country.setCode(code);
      country.setUri('{eai.resource}-{device.type}/map/country/' + code + '.dat');
      country.load();
      countries.set(code, country);
   }
   return country;
}
MO.FEaiMapResourceModule_loadWorld = function FEaiMapResourceModule_loadWorld(){
   var o = this;
   var world = o._world;
   if(!world){
      world = o._world = MO.Class.create(MO.FEaiMapWorldResource);
      world.load();
   }
   return world;
}
MO.FEaiMapResourceModule_dispose = function FEaiMapResourceModule_dispose(){
   var o = this;
   o._world = MO.Lang.Object.dispose(o._world);
   o._countries = MO.Lang.Object.dispose(o._countries, true);
   o.__base.FEaiResourceModule.dispose.call(o);
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
   o._uri        = '{eai.resource}-{device.type}/map/world.dat';
   o._data       = MO.Class.register(o, new MO.AGetter('_data'));
   o.construct   = MO.FEaiMapWorldResource_construct;
   o.unserialize = MO.FEaiMapWorldResource_unserialize;
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
MO.FEaiProvinceResource = function FEaiProvinceResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._code         = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.Uint16)]);
   o._name         = MO.Class.register(o, [new MO.AGetter('_name'), new MO.APersistence('_name', MO.EDataType.String)]);
   o._label        = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._typeCd       = MO.Class.register(o, [new MO.AGetter('_typeCd'), new MO.APersistence('_typeCd', MO.EDataType.String)]);
   o._displayOrder = MO.Class.register(o, [new MO.AGetter('_displayOrder'), new MO.APersistence('_displayOrder', MO.EDataType.Uint16)]);
   return o;
}
MO.FEaiProvinceResourceModule = function FEaiProvinceResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   o._provinceCodes = MO.Class.register(o, new MO.AGetter('_provinceCodes'));
   o._provinceNames = MO.Class.register(o, new MO.AGetter('_provinceNames'));
   o.construct      = MO.FEaiProvinceResourceModule_construct;
   o.findByCode     = MO.FEaiProvinceResourceModule_findByCode;
   o.findByName     = MO.FEaiProvinceResourceModule_findByName;
   o.unserialize    = MO.FEaiProvinceResourceModule_unserialize;
   o.dispose        = MO.FEaiProvinceResourceModule_dispose;
   return o;
}
MO.FEaiProvinceResourceModule_construct = function FEaiProvinceResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._provinceCodes = new MO.TDictionary();
   o._provinceNames = new MO.TDictionary();
}
MO.FEaiProvinceResourceModule_findByCode = function FEaiProvinceResourceModule_findByCode(code){
   return this._provinceCodes.get(code);
}
MO.FEaiProvinceResourceModule_findByName = function FEaiProvinceResourceModule_findByName(name){
   return this._provinceNames.get(name);
}
MO.FEaiProvinceResourceModule_unserialize = function FEaiProvinceResourceModule_unserialize(input){
   var o = this;
   var provinceCodes = o._provinceCodes;
   var provinceNames = o._provinceNames;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceResource);
      province.unserialize(input);
      provinceCodes.set(province.code(), province);
      provinceNames.set(province.name(), province);
   }
}
MO.FEaiProvinceResourceModule_dispose = function FEaiProvinceResourceModule_dispose(){
   var o = this;
   o._provinceCodes = MO.Lang.Object.dispose(o._provinceCodes);
   o._provinceNames = MO.Lang.Object.dispose(o._provinceNames);
   o.__base.FEaiResourceModule.dispose.call(o);
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
MO.FEaiRateResourceModule = function FEaiRateResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule);
   o._rates      = MO.Class.register(o, new MO.AGetter('_rates'));
   o.construct   = MO.FEaiRateResourceModule_construct;
   o.find        = MO.FEaiRateResourceModule_find;
   o.unserialize = MO.FEaiRateResourceModule_unserialize;
   o.dispose     = MO.FEaiRateResourceModule_dispose;
   return o;
}
MO.FEaiRateResourceModule_construct = function FEaiRateResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   o._rates = new MO.TObjects();
}
MO.FEaiRateResourceModule_find = function FEaiRateResourceModule_find(code){
   return this._rates.get(code);
}
MO.FEaiRateResourceModule_unserialize = function FEaiRateResourceModule_unserialize(input){
   var o = this;
   var count = o._count = input.readInt32();
   for(var i = 0; i < count; i++){
      var rate = MO.Class.create(MO.FEaiRateResource);
      rate.unserialize(input)
      o._rates.push(rate);
   }
}
MO.FEaiRateResourceModule_dispose = function FEaiRateResourceModule_dispose(){
   var o = this;
   o._rates = MO.Lang.Object.dispose(o._rates);
   o.__base.FEaiResourceModule.dispose.call(o);
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
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener);
   o._scopeCd          = MO.EScope.Local;
   o._rateModule       = MO.Class.register(o, new MO.AGetter('_rateModule'));
   o._provinceModule   = MO.Class.register(o, new MO.AGetter('_provinceModule'));
   o._cityModule       = MO.Class.register(o, new MO.AGetter('_cityModule'));
   o._cardModule       = MO.Class.register(o, new MO.AGetter('_cardModule'));
   o._departmentModule = MO.Class.register(o, new MO.AGetter('_departmentModule'));
   o._historyModule    = MO.Class.register(o, new MO.AGetter('_historyModule'));
   o._mapModule        = MO.Class.register(o, new MO.AGetter('_mapModule'));
   o._loadListeners    = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o._looper           = null;
   o._thread           = null;
   o._interval         = 100;
   o.onLoad            = MO.FEaiResourceConsole_onLoad;
   o.onProcess         = MO.FEaiResourceConsole_onProcess;
   o.construct         = MO.FEaiResourceConsole_construct;
   o.unserialize       = MO.FEaiResourceConsole_unserialize;
   o.load              = MO.FEaiResourceConsole_load;
   o.dispose           = MO.FEaiResourceConsole_dispose;
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
   var data = event.content;
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
   o._rateModule = MO.Class.create(MO.FEaiRateResourceModule);
   o._provinceModule = MO.Class.create(MO.FEaiProvinceResourceModule);
   var cityConsole = o._cityModule = MO.Class.create(MO.FEaiCityResourceModule);
   o._cardModule = MO.Class.create(MO.FEaiCardResourceModule);
   o._departmentModule = MO.Class.create(MO.FEaiDepartmentResourceModule);
   o._historyModule = MO.Class.create(MO.FEaiHistoryResourceModule);
   o._mapModule = MO.Class.create(MO.FEaiMapResourceModule);
   cityConsole.setResourceConsole(o);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._rateModule.unserialize(input);
   o._provinceModule.unserialize(input);
   o._cityModule.unserialize(input);
   o._cardModule.unserialize(input);
   o._departmentModule.unserialize(input);
}
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiResourceConsole_dispose = function FEaiResourceConsole_dispose(monitor){
   var o = this;
   o._rateModule = MO.Lang.Object.dispose(o._rateModule);
   o._provinceModule = MO.Lang.Object.dispose(o._provinceModule);
   o._cityModule = MO.Lang.Object.dispose(o._cityModule);
   o._cardModule = MO.Lang.Object.dispose(o._cardModule);
   o._historyModule = MO.Lang.Object.dispose(o._historyModule);
   o._mapModule = MO.Lang.Object.dispose(o._mapModule);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiResourceModule = function FEaiResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code     = MO.Class.register(o, new MO.AGetSet('_code'));
   o.construct = MO.FEaiResourceModule_construct;
   o.dispose   = MO.FEaiResourceModule_dispose;
   return o;
}
MO.FEaiResourceModule_construct = function FEaiResourceModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiResourceModule_dispose = function FEaiResourceModule_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
MO.FEaiFinancialData = function FEaiFinancialData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._provinceCode  = MO.Class.register(o, new MO.AGetter('_provinceCode'));
   o._code          = MO.Class.register(o, new MO.AGetter('_code'));
   o._label         = MO.Class.register(o, new MO.AGetter('_label'));
   o._level         = MO.Class.register(o, new MO.AGetter('_level'));
   o._location      = MO.Class.register(o, new MO.AGetter('_location'));
   o.construct      = MO.FEaiFinancialData_construct;
   o.unserialize    = MO.FEaiFinancialData_unserialize;
   o.dispose        = MO.FEaiFinancialData_dispose;
   return o;
}
MO.FEaiFinancialData_construct = function FEaiFinancialData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._location = new MO.SPoint3();
}
MO.FEaiFinancialData_unserialize = function FEaiFinancialData_unserialize(input){
   var o = this;
   o._provinceCode = input.readUint16();
   o._code = input.readUint16();
   o._label = input.readString();
   o._level = input.readUint16();
   o._location.unserialize2(input);
}
MO.FEaiFinancialData_dispose = function FEaiFinancialData_dispose(){
   var o = this;
   o._location = RObject.dispose(o._location);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiFinancialData = function FEaiFinancialData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._provinceCode  = MO.Class.register(o, new MO.AGetter('_provinceCode'));
   o._code          = MO.Class.register(o, new MO.AGetter('_code'));
   o._label         = MO.Class.register(o, new MO.AGetter('_label'));
   o._level         = MO.Class.register(o, new MO.AGetter('_level'));
   o._location      = MO.Class.register(o, new MO.AGetter('_location'));
   o.construct      = MO.FEaiFinancialData_construct;
   o.unserialize    = MO.FEaiFinancialData_unserialize;
   o.dispose        = MO.FEaiFinancialData_dispose;
   return o;
}
MO.FEaiFinancialData_construct = function FEaiFinancialData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._location = new MO.SPoint3();
}
MO.FEaiFinancialData_unserialize = function FEaiFinancialData_unserialize(input){
   var o = this;
   o._provinceCode = input.readUint16();
   o._code = input.readUint16();
   o._label = input.readString();
   o._level = input.readUint16();
   o._location.unserialize2(input);
}
MO.FEaiFinancialData_dispose = function FEaiFinancialData_dispose(){
   var o = this;
   o._location = RObject.dispose(o._location);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiFinancialMarketerDynamic = function FEaiFinancialMarketerDynamic(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._provinceCode  = MO.Class.register(o, new MO.AGetter('_provinceCode'));
   o._code          = MO.Class.register(o, new MO.AGetter('_code'));
   o._label         = MO.Class.register(o, new MO.AGetter('_label'));
   o._level         = MO.Class.register(o, new MO.AGetter('_level'));
   o._location      = MO.Class.register(o, new MO.AGetter('_location'));
   o.construct      = MO.FEaiFinancialMarketerDynamic_construct;
   o.unserialize    = MO.FEaiFinancialMarketerDynamic_unserialize;
   o.dispose        = MO.FEaiFinancialMarketerDynamic_dispose;
   return o;
}
MO.FEaiFinancialMarketerDynamic_construct = function FEaiFinancialMarketerDynamic_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._location = new MO.SPoint3();
}
MO.FEaiFinancialMarketerDynamic_unserialize = function FEaiFinancialMarketerDynamic_unserialize(input){
   var o = this;
   o._provinceCode = input.readUint16();
   o._code = input.readUint16();
   o._label = input.readString();
   o._level = input.readUint16();
   o._location.unserialize2(input);
}
MO.FEaiFinancialMarketerDynamic_dispose = function FEaiFinancialMarketerDynamic_dispose(){
   var o = this;
   o._location = RObject.dispose(o._location);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiLogic = function FEaiLogic(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code             = null;
   o._parameters       = null;
   o._urlParameters    = null;
   o.construct         = MO.FEaiLogic_construct;
   o.makeUrl           = MO.FEaiLogic_makeUrl;
   o.prepareParemeters = MO.FEaiLogic_prepareParemeters;
   o.send              = MO.FEaiLogic_send;
   o.sendService       = MO.FEaiLogic_sendService;
   o.dispose           = MO.FEaiLogic_dispose;
   return o;
}
MO.FEaiLogic_construct = function FEaiLogic_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._parameters    = new MO.TAttributes();
   o._urlParameters = new MO.TAttributes();
}
MO.FEaiLogic_prepareParemeters = function FEaiLogic_prepareParemeters(){
   var o = this;
   var parameters = o._parameters;
   parameters.clear();
   return parameters;
}
MO.FEaiLogic_makeUrl = function FEaiLogic_makeUrl(method, parameters){
   var o = this;
   var uri = '{eai.host.service}/eai/' + o._code + '/' + method;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   if(parameters){
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      var signCode = systemLogic.sign();
      var currentDate = systemLogic.currentDate();
      var tick = currentDate.format();
      var pack = o._urlParameters;
      pack.clear();
      pack.set('tick', currentDate.format());
      pack.split(parameters, '=', '&');
      pack.sortByName();
      var signSource = pack.joinValue();
      var sign = hex_md5(signSource + signCode);
      url += '?' + parameters + '&tick=' + tick + '&sign=' + sign;
   }
   return url;
}
MO.FEaiLogic_send = function FEaiLogic_send(method, parameters, owner, callback){
   var o = this;
   var url = o.makeUrl(method, parameters);
   var connection = MO.Console.find(MO.FJsonConsole).sendAsync(url);
   connection.addLoadListener(owner, callback);
   return connection;
}
MO.FEaiLogic_sendService = function FEaiLogic_sendService(uri, parameters, owner, callback){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var count = parameters.count();
   for(var i = 0; i < count; i++){
      var name = parameters.name(i);
      var value = parameters.value(i);
      url += '&' + name + '=' + value;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   var token = systemLogic.token();
   var tick = systemLogic.currentDate().daySecond();
   parameters.set('tick', tick);
   url += '&tick=' + tick;
   parameters.sortByName();
   var signSource = parameters.joinValue();
   var sign = MO.Lang.String.calculateHash(signSource, token);
   url += '&sign=' + sign;
   var application = MO.Desktop.application();
   var sessionId = application.findSessionId();
   if(!MO.Lang.String.isEmpty(sessionId)){
      url += '&sid=' + sessionId;
   }
   var connection = MO.Console.find(MO.FHttpConsole).alloc();
   connection.setAsynchronous(true);
   connection.attributes().set('sign', sign);
   connection.addLoadListener(owner, callback);
   connection.send(url);
}
MO.FEaiLogic_dispose = function FEaiLogic_dispose(){
   var o = this;
   o._urlParameters = MO.Lang.Object.dispose(o._urlParameters);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiLogicAchievement = function FEaiLogicAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code   = 'achievement';
   o.doGroup = MO.FEaiLogicAchievement_doGroup;
   o.doSort  = MO.FEaiLogicAchievement_doSort;
   o.doQuery = MO.FEaiLogicAchievement_doQuery;
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
MO.FEaiLogicConsole = function FEaiLogicConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._system             = MO.Class.register(o, new MO.AGetter('_system'));
   o._organization       = MO.Class.register(o, new MO.AGetter('_organization'));
   o._achievement        = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._schedule           = MO.Class.register(o, new MO.AGetter('_schedule'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._thread             = null;
   o._interval           = 1000 * 60 * 10;
   o.onProcess           = MO.FEaiLogicConsole_onProcess;
   o.construct           = MO.FEaiLogicConsole_construct;
   o.dispose             = MO.FEaiLogicConsole_dispose;
   return o;
}
MO.FEaiLogicConsole_onProcess = function FEaiLogicConsole_onProcess(event){
   var o = this;
   o._system.refresh();
}
MO.FEaiLogicConsole_construct = function FEaiLogicConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._system = MO.Class.create(MO.FEaiLogicSystem);
   o._organization = MO.Class.create(MO.FEaiLogicOrganization);
   o._achievement = MO.Class.create(MO.FEaiLogicAchievement);
   o._schedule = MO.Class.create(MO.FEaiLogicSchedule);
   o._statistics = MO.Class.create(MO.FEaiLogicStatistics);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEaiLogicConsole_dispose = function FEaiLogicConsole_dispose(){
   var o = this;
   o._system = MO.Lang.Object.dispose(o._system);
   o._organization = MO.Lang.Object.dispose(o._organization);
   o._achievement = MO.Lang.Object.dispose(o._achievement);
   o._schedule = MO.Lang.Object.dispose(o._schedule);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiLogicOrganization = function FEaiLogicOrganization(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code           = 'organization';
   o._pIdMIndexDict  = MO.Class.register(o, new MO.AGetter('_pIdMIndexDict'));
   o._cityIdNameDict = MO.Class.register(o, new MO.AGetter('_cityIdNameDict'));
   o._provinceColors = MO.Class.register(o, new MO.AGetter('_provinceColors'));
   o.doFetch         = MO.FEaiLogicOrganization_doFetch;
   o.getMeshIndex    = MO.FEaiLogicOrganization_getMeshIndex;
   o.construct       = MO.FEaiLogicOrganization_construct;
   return o;
}
MO.FEaiLogicOrganization_construct = function FEaiLogicOrganization_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   var pmDict = o._pIdMIndexDict = new MO.TDictionary();
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
   var cinDict = o._cityIdNameDict = new MO.TDictionary();
   var colors = o._provinceColors = new MO.TObjects();
   colors.push(new MO.SColor4(0.25, 0.50, 0.60));
   colors.push(new MO.SColor4(0.30, 0.60, 0.75));
   colors.push(new MO.SColor4(0.35, 0.70, 0.80));
   colors.push(new MO.SColor4(0.40, 0.75, 0.85));
   colors.push(new MO.SColor4(0.45, 0.85, 1.00));
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
MO.FEaiLogicSchedule = function FEaiLogicSchedule(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code   = 'schedule';
   o.doFetch = MO.FEaiLogicSchedule_doFetch;
   return o;
}
MO.FEaiLogicSchedule_doFetch = function FEaiLogicSchedule_doFetch(owner, callback){
   return this.send('fetch', null, owner, callback);
}
MO.FEaiLogicStatistics = function FEaiLogicStatistics(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code                 = 'statistics';
   o._customerDynamicFirst = true;
   o._marketerDynamicFirst = true;
   o._customer             = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer             = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department           = MO.Class.register(o, new MO.AGetter('_department'));
   o.construct             = MO.FEaiLogicStatistics_construct;
   o.calculateAmountLevel  = MO.FEaiLogicStatistics_calculateAmountLevel;
   o.doPerformenceDynamic  = MO.FEaiLogicStatistics_doPerformenceDynamic;
   o.dispose               = MO.FEaiLogicStatistics_dispose;
   return o;
}
MO.FEaiLogicStatistics_construct = function FEaiLogicStatistics_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   o._customer = MO.Class.create(MO.FEaiLogicStatisticsCustomer);
   o._marketer = MO.Class.create(MO.FEaiLogicStatisticsMarketer);
   o._department = MO.Class.create(MO.FEaiLogicStatisticsDepartment);
}
MO.FEaiLogicStatistics_calculateAmountLevel = function FEaiLogicStatistics_calculateAmountLevel(amount){
   var o = this;
   if(amount >= 5000000){
      return 5;
   }else if(amount >= 1000000){
      return 4;
   }else if(amount >= 100000){
      return 3;
   }else if(amount >= 10000){
      return 2;
   }else if(amount >= 1000){
      return 1;
   }
   return 0;
}
MO.FEaiLogicStatistics_doInvestmentDynamic = function FEaiLogicStatistics_doInvestmentDynamic(owner, callback, startDate, endDate){
   var parameters = 'begin=' + startDate + '&end=' + endDate;
   return this.send('investment_dynamic', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doInvestmentTrend = function FEaiLogicStatistics_doInvestmentTrend(owner, callback, startDate, endDate, interval){
   if(!interval){
      interval = 600000;
   }
   var parameters = 'begin=' + startDate + '&end=' + endDate + '&interval=' + interval;
   return this.send('investment_trend', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doCustomerDynamic = function FEaiLogicStatistics_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicStatistics_doCustomerTrend = function FEaiLogicStatistics_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doMarketerDynamic = function FEaiLogicStatistics_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
   o._marketerDynamicFirst = false;
}
MO.FEaiLogicStatistics_doMarketerTrend = function FEaiLogicStatistics_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doDepartmentDynamic = function FEaiLogicStatistics_doDepartmentDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doDepartmentTrend = function FEaiLogicStatistics_doDepartmentTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatistics_doPerformenceDynamic = function FEaiLogicStatistics_doPerformenceDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
}
MO.FEaiLogicStatistics_dispose = function FEaiLogicStatistics_dispose(){
   var o = this;
   o._customer = MO.Lang.Object.dispose(o._customer);
   o._marketer = MO.Lang.Object.dispose(o._marketer);
   o._department = MO.Lang.Object.dispose(o._department);
   o.__base.FEaiLogic.dispose.call(o);
}
MO.FEaiLogicStatisticsCustomer = function FEaiLogicStatisticsCustomer(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._customerDynamicFirst   = true;
   o.doCustomerDynamic = MO.FEaiLogicStatisticsCustomer_doCustomerDynamic;
   o.doCustomerTrend   = MO.FEaiLogicStatisticsCustomer_doCustomerTrend;
   return o;
}
MO.FEaiLogicStatisticsCustomer_doCustomerDynamic = function FEaiLogicStatisticsCustomer_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicStatisticsCustomer_doCustomerTrend = function FEaiLogicStatisticsCustomer_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatisticsDepartment = function FEaiLogicStatisticsDepartment(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._customerDynamicFirst   = true;
   o._marketerDynamicFirst   = true;
   o._departmentDynamicFirst = true;
   o.doCustomerDynamic       = MO.FEaiLogicStatisticsDepartment_doCustomerDynamic;
   o.doCustomerTrend         = MO.FEaiLogicStatisticsDepartment_doCustomerTrend;
   o.doMarketerDynamic       = MO.FEaiLogicStatisticsDepartment_doMarketerDynamic;
   o.doMarketerTrend         = MO.FEaiLogicStatisticsDepartment_doMarketerTrend;
   o.doDepartmentDynamic     = MO.FEaiLogicStatisticsDepartment_doDepartmentDynamic;
   o.doDepartmentTrend       = MO.FEaiLogicStatisticsDepartment_doDepartmentTrend;
   return o;
}
MO.FEaiLogicStatisticsDepartment_doCustomerDynamic = function FEaiLogicStatisticsDepartment_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicStatisticsDepartment_doCustomerTrend = function FEaiLogicStatisticsDepartment_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.customer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatisticsDepartment_doMarketerDynamic = function FEaiLogicStatisticsDepartment_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.marketer.wv?do=dynamic', parameters, owner, callback);
   o._marketerDynamicFirst = false;
}
MO.FEaiLogicStatisticsDepartment_doMarketerTrend = function FEaiLogicStatisticsDepartment_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.marketer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatisticsDepartment_doDepartmentDynamic = function FEaiLogicStatisticsDepartment_doDepartmentDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.department.wv?do=dynamic', parameters, owner, callback);
}
MO.FEaiLogicStatisticsDepartment_doDepartmentTrend = function FEaiLogicStatisticsDepartment_doDepartmentTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.department.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatisticsMarketer = function FEaiLogicStatisticsMarketer(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._customerDynamicFirst = true;
   o._marketerDynamicFirst = true;
   o.doCustomerDynamic     = MO.FEaiLogicStatisticsMarketer_doCustomerDynamic;
   o.doCustomerTrend       = MO.FEaiLogicStatisticsMarketer_doCustomerTrend;
   o.doMarketerDynamic     = MO.FEaiLogicStatisticsMarketer_doMarketerDynamic;
   o.doMarketerTrend       = MO.FEaiLogicStatisticsMarketer_doMarketerTrend;
   return o;
}
MO.FEaiLogicStatisticsMarketer_doCustomerDynamic = function FEaiLogicStatisticsMarketer_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicStatisticsMarketer_doCustomerTrend = function FEaiLogicStatisticsMarketer_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.customer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicStatisticsMarketer_doMarketerDynamic = function FEaiLogicStatisticsMarketer_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.marketer.wv?do=dynamic', parameters, owner, callback);
   o._marketerDynamicFirst = false;
}
MO.FEaiLogicStatisticsMarketer_doMarketerTrend = function FEaiLogicStatisticsMarketer_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.marketer.wv?do=trend', parameters, owner, callback);
}
MO.FEaiLogicSystem = function FEaiLogicSystem(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code          = 'system';
   o._ready         = false;
   o._info          = null;
   o._token          = MO.Class.register(o, new MO.AGetter('_token'), 0);
   o._currentDate   = null;
   o._localDate     = null;
   o._systemDate    = MO.Class.register(o, new MO.AGetter('_systemDate'));
   o.onInfo         = MO.FEaiLogicSystem_onInfo;
   o.construct      = MO.FEaiLogicSystem_construct;
   o.doInfo         = MO.FEaiLogicSystem_doInfo;
   o.doDeviceAccess = MO.FEailogicSystem_doDeviceAccess;
   o.testReady      = MO.FEaiLogicSystem_testReady;
   o.currentDate    = MO.FEaiLogicSystem_currentDate;
   o.refresh        = MO.FEaiLogicSystem_refresh;
   o.dispose        = MO.FEaiLogicSystem_dispose;
   return o;
}
MO.FEaiLogicSystem_onInfo = function FEaiLogicSystem_onInfo(event){
   var o = this;
   var info = o._info;
   info.unserializeSignBuffer(event.sign, event.content, true);
   o._token = info.token();
   o._localDate.setNow();
   o._systemDate.parse(info.date());
   o._ready = true;
}
MO.FEaiLogicSystem_construct = function FEaiLogicSystem_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   o._info = MO.Class.create(MO.FEaiLogicSystemInfo);
   o._currentDate = new MO.TDate();
   o._localDate = new MO.TDate();
   o._systemDate = new MO.TDate();
}
MO.FEaiLogicSystem_doInfo = function FEaiLogicSystem_doInfo(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   this.sendService('{eai.logic.service}/eai.system.wv?do=info', parameters, owner, callback);
}
MO.FEailogicSystem_doDeviceAccess = function FEailogicSystem_doDeviceAccess(){
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   var xbrowser = xroot.create('Browser')
   MO.Window.Browser.saveConfig(xbrowser);
   var application = MO.Desktop.application();
   var desktop = application.desktop();
   if(desktop){
      var xdesktop = xbrowser.create('Desktop')
      var canvas2d = desktop.canvas2d();
      if(canvas2d){
         var xcontext2d = xdesktop.create('Context2d')
      }
      var canvas3d = desktop.canvas3d();
      if(canvas3d){
         var context3d = canvas3d.graphicContext();
         var parameter = context3d.parameter('VERSION');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var xcontext3d = xdesktop.create('Context3d')
         context3d.saveConfig(xcontext3d);
      }
   }
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot)
}
MO.FEaiLogicSystem_testReady = function FEaiLogicSystem_testReady(){
   return this._ready;
}
MO.FEaiLogicSystem_currentDate = function FEaiLogicSystem_currentDate(){
   var o = this;
   var date = o._currentDate;
   var span = o._systemDate.get() - o._localDate.get();
   date.set(MO.Timer.current() + span);
   return date;
}
MO.FEaiLogicSystem_refresh = function FEaiLogicSystem_refresh(){
   var o = this;
   return o.doInfo(o, o.onInfo);
}
MO.FEaiLogicSystem_dispose = function FEaiLogicSystem_dispose() {
   var o = this;
   o._info = MO.Lang.Object.dispose(o._info);
   o._localDate = MO.Lang.Object.dispose(o._localDate);
   o._systemDate = MO.Lang.Object.dispose(o._systemDate);
   o.__base.FEaiLogic.consturct.call(o);
}
MO.FEaiLogicSystemInfo = function FEaiLogicSystemInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._sessionId = MO.Class.register(o, [new MO.AGetter('_sessionId'), new MO.APersistence('_sessionId', MO.EDataType.String)]);
   o._date      = MO.Class.register(o, [new MO.AGetter('_date'), new MO.APersistence('_date', MO.EDataType.String)]);
   o._token     = MO.Class.register(o, [new MO.AGetter('_token'), new MO.APersistence('_token', MO.EDataType.Uint32)]);
   return o;
}
MO.FEaiCityEntity = function FEaiCityEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._provinceEntity         = MO.Class.register(o, new MO.AGetSet('_provinceEntity'));
   o._visible                = MO.Class.register(o, new MO.AGetter('_visible'), false);
   o._location               = MO.Class.register(o, new MO.AGetter('_location'));
   o._size                   = MO.Class.register(o, new MO.AGetter('_size'));
   o._color                  = MO.Class.register(o, new MO.AGetter('_color'));
   o._range                  = MO.Class.register(o, new MO.AGetter('_range'), 1);
   o._rangeColor             = MO.Class.register(o, new MO.AGetter('_rangeColor'));
   o._cityTotal              = 0;
   o._investmentCount        = 0;
   o._investmentTotal        = MO.Class.register(o, new MO.AGetSet('_investmentTotal'), 0);
   o._investmentLevel        = 0;
   o._investmentLast         = 0;
   o._investmentRateTotal    = 0;
   o._investmentRate         = 0;
   o._investmentAlpha        = 0;
   o._investmentRange        = 0;
   o._investmentDirection    = 1;
   o._stage                  = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._renderable             = MO.Class.register(o, new MO.AGetSet('_renderable'));
   o._data                   = MO.Class.register(o, new MO.AGetSet('_data'));
   o._inputPoint             = null;
   o._outputPoint            = null;
   o.construct               = MO.FEaiCityEntity_construct;
   o.calculateScreenPosition = MO.FEaiCityEntity_calculateScreenPosition;
   o.build                   = MO.FEaiCityEntity_build;
   o.addInvestmentTotal      = MO.FEaiCityEntity_addInvestmentTotal;
   o.reset                   = MO.FEaiCityEntity_reset;
   o.update                  = MO.FEaiCityEntity_update;
   o.process                 = MO.FEaiCityEntity_process;
   o.dispose                 = MO.FEaiCityEntity_dispose;
   return o;
}
MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._location = new MO.SPoint2();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4(0, 0, 0, 0);
   o._rangeColor = new MO.SColor4(0, 0, 0, 0);
   o._inputPoint = new MO.SPoint3();
   o._outputPoint = new MO.SPoint3();
}
MO.FEaiCityEntity_calculateScreenPosition = function FEaiCityEntity_calculateScreenPosition(){
   var o = this;
   var region = o._stage.region();
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var mMatrix = o._renderable.matrix();
   var matrix = MO.Lang.Math.matrix;
   matrix.identity();
   matrix.append(mMatrix);
   matrix.append(vpMatrix);
   o._inputPoint.set(o._location.x, o._location.y, 0);
   matrix.transformPoint3(o._inputPoint, o._outputPoint);
   return o._outputPoint;
}
MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
   var o = this;
   o._location.assign(o._data.location());
   o._size.set(2, 2);
}
MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(level, investment){
   var o = this;
   o._investmentCount++;
   o._investmentTotal += investment;
   if(investment < o._investmentLast){
      return;
   }
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.InvestmentRange);
   var range = 200000;
   var color = rateResource.findRate(investment / range);
   o._color.set(1, 1, 1, 1);
   o._rangeColor.setInteger(color);
   o._rangeColor.alpha = 1;
   o._investmentLast = investment;
   o._investmentRateTotal = (level + 1) * 100000;
   o._investmentRate = o._investmentRateTotal;
   o._investmentRange = Math.log(investment * investment) / 10;
   o._investmentAlpha = 8;
   o._visible = true;
}
MO.FEaiCityEntity_reset = function FEaiCityEntity_reset(){
   var o = this;
   o._visible = false;
   o._cityTotal = 0;
   o._color.set(0, 0, 0, 0);
   o._rangeColor.set(0, 0, 0, 0);
}
MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
   var o = this;
   var range = 1;
   o._color.set(1, 1, 1, 1);
   o._rangeColor.set(1, 1, 1, 1);
   if(data){
      o._cityTotal = data.investmentTotal();
   }
   var total = o._cityTotal;
   if(total > 0){
      o._visible = true;
   }
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var investmentCityTotal = historyModule.investmentCityTotal();
   var rateInfo = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Map);
   var rate = Math.sqrt(total / investmentCityTotal) * 4;
   var color = rateInfo.findRate(rate);
   range = rate * 6;
   rate = MO.Lang.Float.toRange(rate, 0, 1);
   o._rangeColor.setIntAlpha(color, rate * 0.6);
   o._range = MO.Lang.Float.toRange(Math.sqrt(range), 1, 6);
}
MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
   var o = this;
   if(o._investmentRate > 0){
      var rate = o._investmentRate / o._investmentRateTotal;
      o._range = o._investmentRange * rate;
      var alpha = Math.min(o._investmentAlpha * rate, 1);
      o._color.alpha = alpha;
      o._rangeColor.alpha = alpha;
      o._investmentRate--;
      return true;
   }else{
      o._investmentLast = 0;
      o._investmentRate = 0;
      o._investmentRange = 0;
      o._investmentAlpha = 0;
      o._visible = false;
      return false;
   }
}
MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
   var o = this;
   o._location = MO.Lang.Object.dispose(o._location);
   o._size = MO.Lang.Object.dispose(o._size);
   o._color = MO.Lang.Object.dispose(o._color);
   o._rangeColor = MO.Lang.Object.dispose(o._rangeColor);
   o._inputPoint = MO.Lang.Object.dispose(o._inputPoint);
   o._outputPoint = MO.Lang.Object.dispose(o._outputPoint);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiCityEntityModule = function FEaiCityEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   o._citys     = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct     = MO.FEaiCityEntityModule_construct;
   o.findByCode    = MO.FEaiCityEntityModule_findByCode;
   o.findByCard    = MO.FEaiCityEntityModule_findByCard;
   o.push          = MO.FEaiCityEntityModule_push;
   o.build         = MO.FEaiCityEntityModule_build;
   o.linkProvinces = MO.FEaiCityEntityModule_linkProvinces;
   o.dispose       = MO.FEaiCityEntityModule_dispose;
   return o;
}
MO.FEaiCityEntityModule_construct = function FEaiCityEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   o._citys = new MO.TDictionary();
}
MO.FEaiCityEntityModule_findByCode = function FEaiCityEntityModule_findByCode(code){
   return this._citys.get(code);
}
MO.FEaiCityEntityModule_findByCard = function FEaiCityEntityModule_findByCard(card){
   var o = this;
   var cardModule = MO.Console.find(MO.FEaiResourceConsole).cardModule();
   var cityCode = cardModule.findCityCode(card);
   return o._citys.get(cityCode);
}
MO.FEaiCityEntityModule_push = function FEaiCityEntityModule_push(entity){
   var code = entity.data().code();
   MO.Assert.debugNotEmpty(code);
   this._citys.set(code, entity);
}
MO.FEaiCityEntityModule_build = function FEaiCityEntityModule_build(context){
   var o = this;
   var citys = MO.Console.find(MO.FEaiResourceConsole).cityModule().citys();
   var cityEntities = o._citys;
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var code = city.code();
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(o);
      cityEntities.set(code, cityEntity);
   }
}
MO.FEaiCityEntityModule_linkProvinces = function FEaiCityEntityModule_linkProvinces(){
   var o = this;
   var provinceModule = MO.Console.find(MO.FEaiEntityConsole).provinceModule();
   var cityEntities = o._citys;
   var cityCount = cityEntities.count();
   for(var i = 0; i < cityCount; i++){
      var cityEntity = cityEntities.at(i);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = provinceModule.findByCode(provinceCode);
      cityEntity.setProvinceEntity(provinceEntity);
   }
}
MO.FEaiCityEntityModule_dispose = function FEaiCityEntityModule_dispose(monitor){
   var o = this;
   o._citys = MO.Lang.Object.dispose(o._citys);
   o.__base.FEaiEntityModule.dispose.call(o);
}
MO.FEaiCountryEntity = function FEaiCountryEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._enterSELoaded           = false;
   o._enterSEPlaying          = false;
   o._cameraDirection         = MO.Class.register(o, new MO.AGetSet('_cameraDirection'));
   o._startDelay              = MO.Class.register(o, new MO.AGetSet('_startDelay'), 0);
   o._riseDuration            = MO.Class.register(o, new MO.AGetSet('_riseDuration'), 5000);
   o._riseDistance            = MO.Class.register(o, new MO.AGetSet('_riseDistance'), 600);
   o._fallDuration            = MO.Class.register(o, new MO.AGetSet('_fallDuration'), 200);
   o._fallDistance            = MO.Class.register(o, new MO.AGetSet('_fallDistance'), 3);
   o._blockInterval           = MO.Class.register(o, new MO.AGetSet('_blockInterval'), 200);
   o._mouseOverRiseHeight     = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseHeight'), 3);
   o._mouseMoveCheckInterval  = MO.Class.register(o, new MO.AGetSet('_mouseMoveCheckInterval'), 100);
   o._cameraMoveDuration      = MO.Class.register(o, new MO.AGetSet('_cameraMoveDuration'), 500);
   o._data                    = MO.Class.register(o, new MO.AGetter('_data'));
   o._worldEntity             = MO.Class.register(o, new MO.AGetSet('_worldEntity'));
   o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities            = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._boundaryShape           = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._faceShape               = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape             = MO.Class.register(o, new MO.AGetter('_borderShape'));
   o._provinceArray           = null;
   o._playing                 = false;
   o._lastTick                = 0;
   o._interval                = 10;
   o._template                = MO.Class.register(o, new MO.AGetSet('_template'));
   o._introAnimeDone          = MO.Class.register(o, new MO.AGetSet('_introAnimeDone'), false);
   o._startTime               = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._mouseOverRiseRenderable = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseRenderable'));
   o._mouseOverFallArray      = MO.Class.register(o, new MO.AGetSet('_mouseOverFallArray'));
   o._mouseMoveLastCheck      = MO.Class.register(o, new MO.AGetSet('_mouseMoveLastCheck'));
   o._cameraMoving            = MO.Class.register(o, new MO.AGetSet('_cameraMoving'), false);
   o._cameraFrom              = MO.Class.register(o, new MO.AGetSet('_cameraFrom'));
   o._cameraTo                = MO.Class.register(o, new MO.AGetSet('_cameraTo'));
   o._audioContext            = null;
   o._audioMapEnter           = null;
   o.onOrganizationFetch      = MO.FEaiCountryEntity_onOrganizationFetch;
   o.onMouseMove              = MO.FEaiCountryEntity_onMouseMove;
   o.onMouseDown              = MO.FEaiCountryEntity_onMouseDown;
   o.construct                = MO.FEaiCountryEntity_construct;
   o.setup                    = MO.FEaiCountryEntity_setup;
   o.build                    = MO.FEaiCountryEntity_build;
   o.provinceShowOrderSort    = MO.FEaiCountryEntity_provinceShowOrderSort;
   o.setupProvinces           = MO.FEaiCountryEntity_setupProvinces;
   o.loadData                 = MO.FEaiCountryEntity_loadData;
   o.loadResource             = MO.FEaiCountryEntity_loadResource;
   o.start                    = MO.FEaiCountryEntity_start;
   o.process                  = MO.FEaiCountryEntity_process;
   o.processLoad              = MO.FEaiCountryEntity_processLoad;
   o.introAnime               = MO.FEaiCountryEntity_introAnime;
   o.mouseOverFallAnime       = MO.FEaiCountryEntity_mouseOverFallAnime;
   o.cameraMoveAnime          = MO.FEaiCountryEntity_cameraMoveAnime;
   o.isReady                  = MO.FEaiCountryEntity_isReady;
   o.dispose                  = MO.FEaiCountryEntity_dispose;
   return o;
}
MO.FEaiCountryEntity_construct = function FEaiCountryEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup() {
   var o = this;
   var shape = o._boundaryShape = MO.Class.create(MO.EE3dBoundaryShape);
   shape.linkGraphicContext(o);
}
MO.FEaiCountryEntity_build = function FEaiCountryEntity_build(){
   var o = this;
   var shape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   shape.linkGraphicContext(o);
   var shape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   shape.linkGraphicContext(o);
   var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
   var audioContext = o._audioContext = audioContextConsole.create();
   o._audioMapEnter = audioContext.createBuffer('{eai.resource}/map_entry/enter.mp3');
}
MO.FEaiCountryEntity_setupProvinces = function FEaiCountryEntity_setupProvinces() {
   var o = this;
   var provinceEntities = o._provinceEntities;
   for (var i = 0; i < provinceEntities.count(); i++) {
      var provinceEntity = provinceEntities.at(i);
      var fr = provinceEntity.faceRenderable();
      var br = provinceEntity.borderRenderable();
      var frm = fr.matrix();
      var brm = br.matrix();
      frm.tz = o.riseDistance();
      frm.updateForce();
      brm.tz = o.riseDistance();
      brm.updateForce();
   }
   var provinceArray = o._provinceArray = new Array(provinceEntities.count());
   for (var i = 0; i < provinceEntities.count() ; i++) {
      provinceArray[i] = provinceEntities.at(i);
   }
   provinceArray.sort(o.provinceShowOrderSort);
}
MO.FEaiCountryEntity_loadData = function FEaiCountryEntity_loadData(data){
   var o = this;
   o._data = data;
   o._code = data.code();
   var shape = o._boundaryShape;
   var boundaries = data.boundaries();
   var count = boundaries.count()
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      shape.pushPolygon(boundary);
   }
   shape.build();
}
MO.FEaiCountryEntity_loadResource = function FEaiCountryEntity_loadResource(resource){
   var o = this;
   var data = resource.data();
   var provinceEntities = o._provinceEntities;
   var faceShape = o._faceShape;
   var borderShape = o._borderShape;
   o.loadData(data);
   var provinceModule = MO.Console.find(MO.FEaiResourceConsole).provinceModule();
   var provinceEntityModule = MO.Console.find(MO.FEaiEntityConsole).provinceModule();
   var provincesData = data.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var provinceResource = provinceModule.findByCode(provinceCode);
      MO.Assert.debugNotNull(provinceResource);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setResource(provinceResource);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      provinceEntities.set(provinceCode, provinceEntity);
      provinceEntityModule.push(provinceEntity);
      var faceRenderable = provinceEntity.faceRenderable();
      faceShape.pushMergeRenderable(faceRenderable);
      var borderRenderable = provinceEntity.borderRenderable();
      borderShape.pushMergeRenderable(borderRenderable);
   }
   faceShape.build();
   borderShape.build();
   o.setupProvinces(provinceEntities);
   MO.Console.find(MO.FEaiEntityConsole).cityModule().linkProvinces();
}
MO.FEaiCountryEntity_isReady = function FEaiCountryEntity_isReady() {
   var o = this;
   if(o._audioMapEnter.testFinish()){
      o._startTime = MO.Timer.current();
      return true;
   }
   return false;
}
MO.FEaiCountryEntity_provinceShowOrderSort = function FEaiCountryEntity_provinceShowOrderSort(p1, p2) {
   var provinceModule = MO.Console.find(MO.FEaiResourceConsole).provinceModule();
   var p1Res = provinceModule.findByCode(p1.data().code());
   var p2Res = provinceModule.findByCode(p2.data().code())
   if (p1Res.displayOrder() > p2Res.displayOrder()) {
      return 1;
   }
   return -1;
}
MO.FEaiCountryEntity_start = function FEaiCountryEntity_start(){
   this._startTime = MO.Timer.current();
}
MO.FEaiCountryEntity_process = function FEaiCountryEntity_process() {
   var o = this;
   if (!o._provinceEntities) {
      return;
   }
   o.introAnime();
}
MO.FEaiCountryEntity_processLoad = function FEaiCountryEntity_processLoad(){
   var o = this;
   var resource = o._resource;
   if(resource.testReady()){
      o.loadResource(resource);
      o._statusReady = true;
      return true;
   }
   return false;
}
MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime() {
   var o = this;
   var now = MO.Timer.current();
   var timePassed = now - o._startTime;
   if (timePassed < o.startDelay()) {
      return;
   }
   else {
      timePassed -= o.startDelay();
      if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * o._provinceEntities.count()) {
         o.setIntroAnimeDone(true);
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseMove;
         MO.Window.lsnsMouseMove.push(listener);
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseDown;
         MO.Window.lsnsMouseDown.push(listener);
      }
   }
   if (!o._enterSEPlaying) {
      o._audioMapEnter.play(0);
      o._enterSEPlaying = true;
   }
   var idxCap = timePassed / o.blockInterval();
   for (var i = 0; i < o._provinceArray.length && i < idxCap; i++) {
      var fr = o._provinceArray[i].faceRenderable();
      var br = o._provinceArray[i].borderRenderable();
      var frm = fr.matrix();
      var brm = br.matrix();
      var risePercentage = (timePassed - o.blockInterval() * i) / (o.riseDuration() - i * i);
      var fallPercentage = 0;
      if (risePercentage > 1) {
         risePercentage = 1;
         fallPercentage = (timePassed - o.blockInterval() * i - (o.riseDuration() - i * i)) / o.fallDuration();
         if (fallPercentage > 1) {
            fallPercentage = 1;
         }
      }
      frm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
      frm.updateForce();
      brm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
      brm.updateForce();
   }
   idxCap = idxCap > o._provinceArray.length - 1 ? o._provinceArray.length - 1 : parseInt(idxCap);
}
MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
   var o = this;
}
MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
   var o = this;
}
MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
   var o = this;
}
MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
   var o = this;
}
MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
   var o = this;
}
MO.FEaiCountryEntity_dispose = function FEaiCountryEntity_dispose(){
   var o = this;
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiCountryEntityModule = function FEaiCountryEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   o.construct   = MO.FEaiCountryEntityModule_construct;
   o.findByCode  = MO.FEaiCountryEntityModule_findByCode;
   o.push        = MO.FEaiCountryEntityModule_push;
   o.load        = MO.FEaiCountryEntityModule_load;
   o.dispose     = MO.FEaiCountryEntityModule_dispose;
   return o;
}
MO.FEaiCountryEntityModule_construct = function FEaiCountryEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   o._countries = new MO.TDictionary();
}
MO.FEaiCountryEntityModule_findByCode = function FEaiCountryEntityModule_findByCode(code){
   return this._countries.get(code);
}
MO.FEaiCountryEntityModule_push = function FEaiCountryEntityModule_push(country){
   var code = country.code();
   this._countries.set(code, country);
}
MO.FEaiCountryEntityModule_load = function FEaiCountryEntityModule_load(context, code){
   var o = this;
   var entities = o._countries;
   var entity = entities.get(code);
   if(entity){
      return entity;
   }
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadCountry(code);
   entity = MO.Class.create(MO.FEaiCountryEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}
MO.FEaiCountryEntityModule_dispose = function FEaiCountryEntityModule_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   o.__base.FEaiEntityModule.dispose.call(o);
}
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
MO.FEaiEntityModule = function FEaiEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.construct = MO.FEaiEntityModule_construct;
   o.dispose   = MO.FEaiEntityModule_dispose;
   return o;
}
MO.FEaiEntityModule_construct = function FEaiEntityModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FEaiEntityModule_dispose = function FEaiEntityModule_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._cityCenterRenderable = MO.Class.register(o, new MO.AGetter('_cityCenterRenderable'));
   o._cityRangeRenderable  = MO.Class.register(o, new MO.AGetter('_cityRangeRenderable'));
   o._countryFaceDisplay   = MO.Class.register(o, new MO.AGetter('_countryFaceDisplay'));
   o._countryBorderDisplay = MO.Class.register(o, new MO.AGetter('_countryBorderDisplay'));
   o.construct             = MO.FEaiMapEntity_construct;
   o.setup                 = MO.FEaiMapEntity_setup;
   o.upload                = MO.FEaiMapEntity_upload;
   o.showCity              = MO.FEaiMapEntity_showCity;
   o.showCountry           = MO.FEaiMapEntity_showCountry;
   o.showWorld             = MO.FEaiMapEntity_showWorld;
   o.process               = MO.FEaiMapEntity_process;
   o.reset                 = MO.FEaiMapEntity_reset;
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
}
MO.FEaiMapEntity_setup = function FEaiMapEntity_setup(){
   var o = this;
   var citysRenderable = o._cityCenterRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   var citysRangeRenderable = o._cityRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   var display = o._countryFaceDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
}
MO.FEaiMapEntity_upload = function FEaiMapEntity_upload(){
   var o = this;
   o._cityCenterRenderable.upload();
   o._cityRangeRenderable.upload();
}
MO.FEaiMapEntity_process = function FEaiMapEntity_process(card){
   var o = this;
   var changed = false;
   var provinceEntities = MO.Console.find(MO.FEaiEntityConsole).provinceModule().provinces();
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      if(provinceEntity.process()){
         changed = true;
      }
   }
   var changed = false;
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for (var i = 0; i < count; i++) {
      var cityEntity = cityEntities.at(i);
      if(cityEntity.process()){
         changed = true;
      }
   }
   if(changed){
      o.upload();
   }
}
MO.FEaiMapEntity_showCity = function FEaiMapEntity_showCity(){
   var o = this;
   var centerRenderable = o._cityCenterRenderable;
   var rangeRenderable = o._cityRangeRenderable;
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      centerRenderable.citys().push(cityEntity);
      rangeRenderable.citys().push(cityEntity);
   }
   centerRenderable.setup();
   centerRenderable.upload();
   rangeRenderable.setup();
   rangeRenderable.upload();
}
MO.FEaiMapEntity_showCountry = function FEaiMapEntity_showCountry(countryEntity){
   var o = this;
   o._countryFaceDisplay.push(countryEntity.faceShape());
   o._countryBorderDisplay.push(countryEntity.borderShape());
}
MO.FEaiMapEntity_showWorld = function FEaiMapEntity_showWorld(){
   var o = this;
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().worldEntity();
   o._countryFaceDisplay.push(worldEntity.sphere());
   o._countryFaceDisplay.push(worldEntity._sphere2);
   o._countryFaceDisplay.push(worldEntity._sphere3);
   o._countryFaceDisplay.push(worldEntity.faceShape());
   o._countryBorderDisplay.push(worldEntity.borderShape());
}
MO.FEaiMapEntity_reset = function FEaiMapEntity_reset(){
   var o = this;
   var provinceEntities = MO.Console.find(MO.FEaiEntityConsole).provinceModule().provinces();
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      provinceEntity.reset();
   }
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._cityCenterRenderable = MO.Lang.Object.dispose(o._cityCenterRenderable);
   o._cityRangeRenderable = MO.Lang.Object.dispose(o._cityRangeRenderable);
   o._countryFaceDisplay = MO.Lang.Object.dispose(o._countryFaceDisplay);
   o._countryBorderDisplay = MO.Lang.Object.dispose(o._countryBorderDisplay);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiMapEntityModule = function FEaiMapEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntityModule);
   o._worldEntity      = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._countryEntities  = MO.Class.register(o, new MO.AGetter('_countryEntities'));
   o._provinceEntities = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities     = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o.construct         = MO.FEaiMapEntityModule_construct;
   o.loadCountry       = MO.FEaiMapEntityModule_loadCountry;
   o.loadWorld         = MO.FEaiMapEntityModule_loadWorld;
   o.dispose           = MO.FEaiMapEntityModule_dispose;
   return o;
}
MO.FEaiMapEntityModule_construct = function FEaiMapEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   o._countryEntities = new MO.TDictionary();
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiMapEntityModule_loadCountry = function FEaiMapEntityModule_loadCountry(context, code){
   var o = this;
  var entities = o._countryEntities;
   var entity = entities.get(code);
   if(entity){
      return entity;
   }
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapModule().loadCountry(code);
   entity = MO.Class.create(MO.FEaiCountryEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   entity.build();
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}
MO.FEaiMapEntityModule_loadWorld = function FEaiMapEntityModule_loadWorld(context){
   var o = this;
   var entity = o._worldEntity;
   if(entity){
      return entity;
   }
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapModule().loadWorld();
   entity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEntityConsole).loadEntity(entity);
   return entity;
}
MO.FEaiMapEntityModule_dispose = function FEaiMapEntityModule_dispose(){
   var o = this;
   o._countryEntities = MO.Lang.Object.dispose(o._countryEntities);
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   o.__base.FEaiEntityModule.dispose.call(o);
}
MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._resource         = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._boundaryShape    = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   o._layerDepth       = 3;
   o._currentZ         = MO.Class.register(o, new MO.AGetter('_currentZ'), 0);
   o._focusTick        = 0;
   o._focusInterval    = 10;
   o._focusCurrent     = 0;
   o._focusColor       = null;
   o._focusCount       = 200;
   o.construct         = MO.FEaiProvinceEntity_construct;
   o.setup             = MO.FEaiProvinceEntity_setup;
   o.buildFace         = MO.FEaiProvinceEntity_buildFace;
   o.buildBorder       = MO.FEaiProvinceEntity_buildBorder;
   o.build             = MO.FEaiProvinceEntity_build;
   o.doInvestment      = MO.FEaiProvinceEntity_doInvestment;
   o.updateColor       = MO.FEaiProvinceEntity_updateColor;
   o.update            = MO.FEaiProvinceEntity_update;
   o.process           = MO.FEaiProvinceEntity_process;
   o.reset             = MO.FEaiProvinceEntity_reset;
   o.dispose           = MO.FEaiProvinceEntity_dispose;
   return o;
}
MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   var colors = o._focusColors = new Array();
   colors[0] = [0x28, 0x42, 0xB4];
   colors[1] = [0x28, 0x42, 0xB4];
   colors[2] = [0x1B, 0xA2, 0xBC];
   colors[3] = [0xFF, 0xDF, 0x6F];
   colors[4] = [0xFF, 0x6B, 0x49];
   colors[5] = [0xFF, 0x6B, 0x49];
}
MO.FEaiProvinceEntity_setup = function FEaiProvinceEntity_setup() {
   var o = this;
   var shape = o._boundaryShape = MO.Class.create(MO.FE3dBoundary);
   shape.linkGraphicContext(o);
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
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
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
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
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
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.color().setHex('#080D19');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
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
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0xB5;
      colors[colorIndex++] = 0xF6;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x0B;
      colors[colorIndex++] = 0x11;
      colors[colorIndex++] = 0x23;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
   renderable.indexBuffer().setLineWidth(1);
   renderable.indexBuffer().upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
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
      indexTotal += boundary.indexCount();
   }
   o._vertexTotal = vertexTotal;
   o._indexTotal = indexTotal;
   o.buildFace(context);
   o.buildBorder(context);
}
MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(level, investment){
   var o = this;
   o._focusTick = 0;
   o._focusCurrent = o._focusCount;
   o._focusColor = o._focusColors[level];
}
MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
   var o = this;
   var investmentTotal = data.investmentTotal();
   var rate = Math.sqrt(investmentTotal) / 100;
   if(rate > 255){
      rate = 255;
   }
}
MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
   var o = this;
   var color = o._focusColor;
   var rate = o._focusCurrent / o._focusCount;
   var red = 0x08 + ((color[0] - 0x08)* rate);
   var green = 0x0D + ((color[1] - 0x0D)* rate);
   var blue = 0x19 + ((color[2] - 0x19)* rate);
   var alpha = 0xFF;
   o._faceRenderable.color().set(red / 255, green / 255, blue / 255, alpha / 255);
}
MO.FEaiProvinceEntity_process = function FEaiProvinceEntity_process(){
   var o = this;
   if(o._focusCurrent > 0){
      var tick = MO.Timer.current();
      if(tick - o._focusTick > o._focusInterval){
         var z = o._currentZ = -o._focusCurrent / 60;
         faceRenderable = o._faceRenderable;
         matrix = faceRenderable.matrix();
         matrix.tz = z;
         matrix.updateForce();
         borderRenderable = o._borderRenderable;
         matrix = borderRenderable.matrix();
         matrix.tz = z;
         matrix.updateForce();
         o.updateColor(o._focusCurrent);
         o._focusCurrent--;
         o._focusTick = tick;
      }
   }
}
MO.FEaiProvinceEntity_reset = function FEaiProvinceEntity_reset(){
   var o = this;
   o._currentZ = 0;
   o._focusTick = 0;
   o._focusCurrent = 0;
}
MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
   var o = this;
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiProvinceEntityModule = function FEaiProvinceEntityModule(o){
   o = MO.RClass.inherits(this, o, MO.FEaiEntityModule);
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.construct  = MO.FEaiProvinceEntityModule_construct;
   o.findByCode = MO.FEaiProvinceEntityModule_findByCode;
   o.push       = MO.FEaiProvinceEntityModule_push;
   o.dispose    = MO.FEaiProvinceEntityModule_dispose;
   return o;
}
MO.FEaiProvinceEntityModule_construct = function FEaiProvinceEntityModule_construct(){
   var o = this;
   o.__base.FEaiEntityModule.construct.call(o);
   o._provinces = new MO.TDictionary();
}
MO.FEaiProvinceEntityModule_findByCode = function FEaiProvinceEntityModule_findByCode(code){
   return this._provinces.get(code);
}
MO.FEaiProvinceEntityModule_push = function FEaiProvinceEntityModule_push(entity){
   var code = entity.data().code();
   this._provinces.set(code, entity);
}
MO.FEaiProvinceEntityModule_dispose = function FEaiProvinceEntityModule_dispose(monitor){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o.__base.FEaiEntityModule.dispose.call(o);
}
MO.FEaiWorldEntity = function FEaiWorldEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity, MO.MListener);
   o._data        = MO.Class.register(o, new MO.AGetSet('_data'));
   o._material    = MO.Class.register(o, new MO.AGetter('_material'));
   o._countries   = MO.Class.register(o, new MO.AGetter('_countries'));
   o._sphere      = MO.Class.register(o, new MO.AGetter('_sphere'));
   o._faceShape   = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape = MO.Class.register(o, new MO.AGetter('_borderShape'));
   o._imageGround = null;
   o.construct    = MO.FEaiWorldEntity_construct;
   o.setup        = MO.FEaiWorldEntity_setup;
   o.loadResource = MO.FEaiWorldEntity_loadResource;
   o.processLoad  = MO.FEaiWorldEntity_processLoad;
   o.dispose      = MO.FEaiWorldEntity_dispose;
   return o;
}
MO.FEaiWorldEntity_construct = function FEaiWorldEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._countries = new MO.TObjects();
   var material = o._material = MO.Class.create(MO.FE3dMaterial);
   material.info().effectCode = 'eai.world.face';
}
MO.FEaiWorldEntity_setup = function FEaiWorldEntity_setup(){
   var o = this;
   var context = o._graphicContext;
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(context);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(context);
   var sphere = o._sphere2 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.98);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = false;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 1.0
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var sphere = o._sphere = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.99);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.alphaRate = 0.6;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var sphere = o._sphere3 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(1.2);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = false;
   info.alphaRate = 0.05;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var texture = o._texture = context.createFlatTexture();
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o._material.setTexture('diffuse', texture);
   o._imageGround = MO.Console.find(MO.FImageConsole).load('{eai.resource}/world/color.jpg');
}
MO.FEaiWorldEntity_loadResource = function FEaiWorldEntity_loadResource(resource){
   var o = this;
   var data = resource.data();
   var countryModule = MO.Console.find(MO.FEaiEntityConsole).countryModule();
   var countries = o._countries
   var countriesData = data.countries();
   var count = countriesData.count();
   for(var i = 0; i < count; i++){
      var countryData = countriesData.at(i);
      var country = MO.Class.create(MO.FEaiCountryEntity);
      country.linkGraphicContext(o);
      country.setWorldEntity(o);
      country.setup();
      country.loadData(countryData);
      var faceRenderable = country.boundaryShape().faceRenderable();
      faceRenderable._material = o._material;
      faceRenderable._texture = o._material.textures();
      countries.push(country);
      countryModule.push(country);
   }
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(o);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(o);
   for(var i = 0; i < count; i++){
      var countryEntity = countries.at(i);
      var boundaryShape = countryEntity.boundaryShape();
      faceShape.pushMergeRenderable(boundaryShape.faceRenderable());
      borderShape.pushMergeRenderable(boundaryShape.borderRenderable());
   }
   faceShape.build();
   borderShape.build();
}
MO.FEaiWorldEntity_processLoad = function FEaiWorldEntity_processLoad(){
   var o = this;
   var image = o._imageGround;
   if(image){
      if(image.testReady()){
         o._texture.upload(image);
         o._imageGround = null;
      }
      return false;
   }
   var resource = o._resource;
   if(resource.testReady()){
      o.loadResource(resource);
      o._statusReady = true;
      return true;
   }
   return false;
}
MO.FEaiWorldEntity_dispose = function FEaiWorldEntity_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries, true);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiCityEffect = function FEaiCityEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.city';
   o.drawRenderable = MO.FEaiCityEffect_drawRenderable;
   return o;
}
MO.FEaiCityEffect_drawRenderable = function FEaiCityEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
   program.setParameter('fc_ambient_color', info.ambientColor);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiCityRangeEffect = function FEaiCityRangeEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.city.range';
   o.drawRenderable = MO.FEaiCityRangeEffect_drawRenderable;
   return o;
}
MO.FEaiCityRangeEffect_drawRenderable = function FEaiCityRangeEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._image                = null;
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.onImageLoad           = MO.FEaiCitysRangeRenderable_onImageLoad;
   o.construct             = MO.FEaiCitysRangeRenderable_construct;
   o.testReady             = MO.FEaiCitysRangeRenderable_testReady;
   o.setup                 = MO.FEaiCitysRangeRenderable_setup;
   o.upload                = MO.FEaiCitysRangeRenderable_upload;
   o.dispose               = MO.FEaiCitysRangeRenderable_dispose;
   return o;
}
MO.FEaiCitysRangeRenderable_onImageLoad = function FEaiCitysRangeRenderable_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FEaiCitysRangeRenderable_testReady = function FEaiCitysRangeRenderable_testReady(){
   return this._ready;
}
MO.FEaiCitysRangeRenderable_setup = function FEaiCitysRangeRenderable_setup(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var position = 0;
   var data = new Float32Array(2 * vertexCount);
   for(var i = 0; i < count; i++){
      data[position++] = 0;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 0;
      data[position++] = 0;
      data[position++] = 0;
   }
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexCount = 3 * 2 * count;
   var position = 0;
   var data = new Uint16Array(indexCount);
   for(var i = 0; i < count; i++){
      var index = 4 * i;
      data[position++] = index + 0;
      data[position++] = index + 1;
      data[position++] = index + 2;
      data[position++] = index + 0;
      data[position++] = index + 2;
      data[position++] = index + 3;
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, indexCount);
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'eai.citys.range';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   o._material._textures = o._textures;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/dot.png');
   o._ready = false;
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
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPosition = 0;
   var vertexData = new Float32Array(3 * vertexCount);
   var colorPosition = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         var location = city.location();
         var range = city.range();
         var size = city.size();
         var width = size.width / 2;
         var height = size.height / 2;
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         vertexData[vertexPosition++] = location.x - range;
         vertexData[vertexPosition++] = location.y + range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + range;
         vertexData[vertexPosition++] = location.y + range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + range;
         vertexData[vertexPosition++] = location.y - range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x - range;
         vertexData[vertexPosition++] = location.y - range;
         vertexData[vertexPosition++] = z;
         var color = city.rangeColor();
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
   o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
   o._indexBuffer.setCount(3 * 2 * count);
}
MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
   var o = this;
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._image                = null;
   o._levelCoordLeft       = null;
   o._levelCoordRight      = null;
   o._levelScale           = null;
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._level                = MO.Class.register(o, new MO.AGetSet('_level'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.onImageLoad           = MO.FEaiCitysRenderable_onImageLoad;
   o.construct             = MO.FEaiCitysRenderable_construct;
   o.testReady             = MO.FEaiCitysRenderable_testReady;
   o.setup                 = MO.FEaiCitysRenderable_setup;
   o.upload                = MO.FEaiCitysRenderable_upload;
   o.dispose               = MO.FEaiCitysRenderable_dispose;
   return o;
}
MO.FEaiCitysRenderable_onImageLoad = function FEaiCitysRenderable_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
   var data = o._levelCoordLeft = new Object();
   data[1] = 0.0;
   data[2] = 0.25;
   data[3] = 0.5;
   data[4] = 0.75;
   var data = o._levelCoordRight = new Object();
   data[1] = 0.25;
   data[2] = 0.5;
   data[3] = 0.75;
   data[4] = 1.0;
   var data = o._levelScale = new Object();
   data[1] = 0.7;
   data[2] = 0.5;
   data[3] = 0.4;
   data[4] = 0.2;
}
MO.FEaiCitysRenderable_testReady = function FEaiCitysRenderable_testReady(){
   return this._ready;
}
MO.FEaiCitysRenderable_setup = function FEaiCitysRenderable_setup(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexCount = 3 * 2 * count;
   var position = 0;
   var data = new Uint16Array(indexCount);
   for(var i = 0; i < count; i++){
      var index = 4 * i;
      data[position++] = index + 0;
      data[position++] = index + 1;
      data[position++] = index + 2;
      data[position++] = index + 0;
      data[position++] = index + 2;
      data[position++] = index + 3;
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, indexCount);
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'eai.citys';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   materialInfo.ambientColor.setHex('#FFFFFF');
   o._material._textures = o._textures;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/citys.png');
   o._ready = false;
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
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPosition = 0;
   var vertexData = new Float32Array(3 * vertexCount);
   var coordPosition = 0;
   var coordData = new Float32Array(2 * vertexCount);
   var colorPosition = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         var range = city.range() * 255;
         var location = city.location();
         var level = city.data().level();
         if((level != 1) && (level != 2) && (level != 3) && (level != 4)){
            throw new TError('Invalid level.');
         }
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         var coordLeft = o._levelCoordLeft[level];
         var coordRight = o._levelCoordRight[level];
         var scale = o._levelScale[level];
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         coordData[coordPosition++] = coordLeft;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 0;
         coordData[coordPosition++] = coordLeft;
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
   o._indexBuffer.setCount(3 * 2 * count);
}
MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
   var o = this;
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._vertexColorBuffer = MO.Lang.Object.dispose(o._vertexColorBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FEaiMapFaceEffect = function FEaiMapFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.map.face';
   o.drawRenderable = MO.FEaiMapFaceEffect_drawRenderable;
   return o;
}
MO.FEaiMapFaceEffect_drawRenderable = function FEaiMapFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = 16 * i;
      var mergeRenderable = mergeRenderables.at(i);
      var matrix = mergeRenderable.matrix();
      var color = mergeRenderable.color();
      matrix.writeData(data, index);
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      data[index + 15] = color.alpha;
   }
   program.setParameter('vc_data', data);
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiWorldFaceEffect = function FEaiWorldFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.world.face';
   o.drawRenderable = MO.FEaiWorldFaceEffect_drawRenderable;
   return o;
}
MO.FEaiWorldFaceEffect_drawRenderable = function FEaiWorldFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = 16 * i;
      var mergeRenderable = mergeRenderables.at(i);
      var matrix = mergeRenderable.matrix();
      var color = mergeRenderable.color();
      matrix.writeData(data, index);
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      data[index + 15] = color.alpha;
   }
   program.setParameter('vc_data', data);
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   program.setSampler('fs_diffuse', renderable.material().textures().get('diffuse'));
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiDynamicInfo = function FEaiDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._guiManager  = MO.Class.register(o, new MO.AGetSet('_guiManager'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   o.onPaintBegin = MO.FEaiDynamicInfo_onPaintBegin;
   o.oeUpdate     = MO.FEaiDynamicInfo_oeUpdate;
   o.construct    = MO.FEaiDynamicInfo_construct;
   return o;
}
MO.FEaiDynamicInfo_onPaintBegin = function FEaiDynamicInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   var browser = MO.Window.Browser;
   var browserCapability = browser.capability();
   graphic.drawText(MO.Lang.String.format('Agent         : {1}', browser.code), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Browser    : type={1}, orientation={2}, canvas_scale={3}', browser.typeCd(), browser.orientationCd(), browserCapability.canvasScale), locationX, locationY, '#FFFFFF');
   locationY += line;
   var desktop = o._guiManager.desktop();
   var canvas2d = desktop.canvas2d();
   var canvas3d = desktop.canvas3d();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   graphic.drawText(MO.Lang.String.format('Screen        : ratio={1}, screen_size={2}, size={3}', pixelRatio, desktop.screenSize().toDisplay(), desktop.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas2d = canvas2d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas2d   : size={1}x{2}, inner_size={3}x{4}', hCanvas2d.offsetWidth, hCanvas2d.offsetHeight, hCanvas2d.width, hCanvas2d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas3d = canvas3d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas3d   : size={1}x{2}, inner_size={3}x{4}', hCanvas3d.offsetWidth, hCanvas3d.offsetHeight, hCanvas3d.width, hCanvas3d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var context3d = canvas3d.graphicContext();
   graphic.drawText(MO.Lang.String.format('   - Context  : {1}', context3d.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('   - Viewport : {1}', context3d.viewportRectangle()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var camera = o._stage.camera();
   var projection = camera.projection();
   graphic.drawText(MO.Lang.String.format('Stage         :'), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Camera     : position={1}', camera.position()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Projection : size={1}, znear={2}, zfar={3}', projection.size(), projection.znear(), projection.zfar()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Frame         : rate={1}, span=[{2}]', MO.Timer.rate(), stageStatistics._frame), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Process    : {1}', stageStatistics._frameProcess), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Draw       : draw={1}, sort={2}', stageStatistics._frameDraw, stageStatistics._frameDrawSort), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Draw          : count={1}, triangle={2}', statistics.frameDrawCount(), statistics.frameTriangleCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Const      : count={1}, length={2}', statistics.frameConstCount(), statistics.frameConstLength()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Alloc      : buffer={1}, texture={2}', statistics.frameBufferCount(), statistics.frameTextureCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Total      : program={1}, layout={2}, vertex={3}, index={4}', statistics.programTotal(), statistics.layoutTotal(), statistics.vertexBufferTotal(), statistics.indexBufferTotal()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Investment    : entity={1}, table={2}, pool_item={3}, pool_free={4}', o._investmentEntityCount, o._investmentTableEntityCount, o._investmentPoolItemCount, o._investmentPoolFreeCount), locationX, locationY, '#FFFFFF');
   desktop.resize();
}
MO.FEaiDynamicInfo_oeUpdate = function FEaiDynamicInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiDynamicInfo_construct = function FEaiDynamicInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(1024, 512);
   o._ticker = new MO.TTicker(1000);
}
with (MO) {
   MO.FGui24HTimeline = function FGui24HTimeline(o) {
      o = MO.Class.inherits(this, o, FGuiControl);
      o._startTime        = MO.Class.register(o, new AGetSet('_startTime'));
      o._endTime          = MO.Class.register(o, new AGetSet('_endTime'));
      o._data             = null;
      o._ready            = false;
      o._investmentTotal  = 0;
      o._intervalMiniute  = 10;
      o._baseHeight = 5;
      o._degreeLineHeight = MO.Class.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = MO.Class.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = MO.Class.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = MO.Class.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = MO.Class.register(o, new AGetSet('_decoLineWidth'), 30);
      o.oeUpdate          = FGui24HTimeline_oeUpdate;
      o.construct         = FGui24HTimeline_construct;
      o.sync              = FGui24HTimeline_sync;
      o.onPaintBegin      = FGui24HTimeline_onPaintBegin;
      o.on24HDataFetch    = FGui24HTimeline_on24HDataFetch;
      return o;
   }
   MO.FGui24HTimeline_construct = function FGui24HTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }
   MO.FGui24HTimeline_sync = function FGui24HTimeline_sync() {
      var o = this;
      if (!o._ready) {
         return;
      }
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      if(!systemLogic.testReady()){
         return;
      }
      var currentDate = systemLogic.currentDate();
      currentDate.truncMinute(o._intervalMiniute);
      var startTime = o._startTime;
      startTime.assign(currentDate);
      startTime.addDay(-1);
      var endTime = o._endTime;
      endTime.assign(currentDate);
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, startTime.format(), endTime.format(), 60 * o._intervalMiniute);
   }
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
      var o = this;
      o._investmentTotal  = 0;
      var data = o._data = event.content.collection;
      if(data){
         var count = data.length;
         for(var i = 0; i < count; i++){
            var row = data[i];
            o._investmentTotal += parseFloat(row.investment);
         }
      }
      o.dirty();
   }
   MO.FGui24HTimeline_oeUpdate = function FGui24HTimeline_oeUpdate(event) {
      var o = this;
      o.__base.FGuiControl.oeUpdate.call(o, event);
      if (o._ready) {
         return;
      }
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      if (systemLogic.testReady()) {
         o._ready = true;
         o.sync();
      }
      return MO.EEventStatus.Stop;
   }
   MO.FGui24HTimeline_onPaintBegin = function FGui24HTimeline_onPaintBegin(event) {
      var o = this;
      if (!o._ready) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      var dataTop = top + 60;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
      var startTime = o.startTime();
      var endTime = o.endTime();
      var timeSpan = endTime.date.getTime() - startTime.date.getTime();
      var bakTime = startTime.date.getTime();
      var text;
      var drawText = false;
      var textWidth = 0;
      while (!startTime.isAfter(endTime)) {
         var span = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
         graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
         text = startTime.format('HH24:00');
         startTime.addHour(1);
         drawText = !drawText;
         if (drawText) {
            graphic.setFont('bold 20px Microsoft YaHei');
            textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
         }
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var data = o._data;
      if (!data || data.length < 1) {
         return;
      }
      var maxInves = 0;
      for (var i = 0; i < data.length; i++) {
         var inves = parseInt(data[i].investment);
         if (inves > maxInves) {
            maxInves = inves;
         }
      }
      var pixPer10k = dataHeight * 10000 / maxInves;
      var inves = parseInt(data[0].investment);
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var ctx = graphic._handle;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         y -= o._baseHeight;
         ctx.lineTo(x, y);
      }
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
      var bottomColor = '#' + hexColor.substring(2);
      var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
      var topColor = '#' + hexColor.substring(2);
      var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
      var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
      gradient.addColorStop('0', bottomColor);
      gradient.addColorStop('1', topColor);
      var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
      opGradient.addColorStop('0', opBottomColor);
      opGradient.addColorStop('1', opTopColor);
      ctx.strokeStyle = gradient;
      ctx.fillStyle = opGradient;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.lineTo(x, dataBottom);
      ctx.lineTo(dataLeft, dataBottom);
      ctx.lineTo(dataLeft, lastY);
      ctx.fill();
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
      startTime.parseAuto(data[0].date);
      startTime.refresh();
      lastHour = startTime.date.getHours();
      for (var i = 0; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var hour = startTime.date.getHours();
         if (lastHour == hour) {
            hourInves += parseInt(data[i].investment);
         }else{
            if(hourInves > maxHourInves){
               maxHourInves = hourInves;
               hourInves = 0;
            }
            lastHour = hour;
         }
      }
      graphic.setFont('bold 24px Microsoft YaHei');
      graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
      graphic.setFont('22px Microsoft YaHei');
      var rowStart = top + 30;
      var rowHeight = 22;
      var textWidth = graphic.textWidth('小时峰值：');
      var textHourPeakValue = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
      var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
      var textDayTotalValue = MO.Lang.Float.unitFormat(o._investmentTotal, 0, 0, 2, 0, 10000, '万');
      var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
      var textHourAvrgValue = MO.Lang.Float.unitFormat(o._investmentTotal / 24, 0, 0, 2, 0, 10000, '万');
      var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
      var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
      graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
      graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
      graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
      graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
      graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
      graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
}
MO.FGui2DMap = function FGui2DMap(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._bgImage       = null;
   o._countryRes    = MO.Class.register(o, new MO.AGetSet('_countryRes'));
   o.construct      = MO.FGui2DMap_construct;
   o.onPaintBegin   = MO.FGui2DMap_onPaintBegin;
   o.onPaintCity    = MO.FGui2DMap_onPaintCity;
   o.dispose        = MO.FGui2DMap_dispose;
   return o;
}
MO.FGui2DMap_construct = function FGui2DMap_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}
MO.FGui2DMap_onPaintBegin = function FGui2DMap_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if (!o._countryRes) {
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var countryRes = o._countryRes;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, '#FF0000', 2);
   var ctx = graphic._handle;
       ctx.lineCap = 'round';
       ctx.beginPath();
   var provinces = countryRes.data().provinces(),
      count = provinces.count(),
      province,boundaries,boundary,positions,items,panX,panY,x,y,scale;
   for(var n = 0 ;  n < count ; n++){
      province = provinces.at(n);
      boundaries = province.boundaries();
     for(var i = 0 ; i < boundaries._count ; i++){
        items         = boundaries.items()[i];
        positionCount = items._positionCount;
        position      = items._positions;
        panX          = -1000;
        panY          = -400;
        scale         = 14;
        ctx.moveTo(position[0] * scale + panX,(90-position[1])*scale + panY);
        for(var j=0; j < positionCount; j++){
              x = position [0+j*2] * scale + panX;
              y = (90-position[1+j*2]) * scale + panY;
              ctx.lineTo( x , y );
        }
     }
   }
   ctx.fillStyle = "rgba(8, 13, 25, 0.63)";
   ctx.strokeStyle = "#00B5F6";
   ctx.lineWidth = 1;
   ctx.stroke();
   ctx.fill();
   o.onPaintCity(event);
}
MO.FGui2DMap_onPaintCity = function FGui2DMap_onPaintCity(event,card){
   var o = this;
   var graphic     = event.graphic;
   var rectangle   = event.rectangle;
   var panX        = -1000;
   var panY        = -400;
   var scale       = 14;
   var ctx = graphic._handle;
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityModule();
   var cityData =  cityConsole.findByCard("1410"),
       x = cityData._location.x * scale + panX,
       y = (90 - cityData._location.y) * scale + panY;
  var cityEntity = MO.Class.create(MO.FEaiCityEntity),
      centerColor = "rgba(" + cityEntity._color.red + "," + cityEntity._color.green + "," + cityEntity._color.blue + "," +cityEntity._color.alpha + ")",
      outerColor = "rgba(" + cityEntity._rangeColor.red + ", " + cityEntity._rangeColor.green + "," + cityEntity._rangeColor.blue + ", " + cityEntity._rangeColor.alpha + ")",
      gradient = ctx.createRadialGradient(x, y, 1, x, y, 20);
      gradient.addColorStop(0, "red");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      graphic.drawCircle(x, y,20,1,"rgba(255, 255, 255, 0)",gradient);
      graphic.drawCircle(x, y,2,1,"rgba(255, 255, 255, 0)","#f96");
}
MO.FGui2DMap_dispose = function FGui2DMap_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiFPCCTable = function FGuiFPCCTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._frameTime = MO.Class.register(o, new MO.AGetSet('_frameTime'));
   o._ready = MO.Class.register(o, new MO.AGetSet('_ready'), false);
   o._padding = 0;
   o._headFontText = null;
   o._headFontStyle = null;
   o._headFontHeight = 0;
   o._rankHeight = 0;
   o._rankCount = 0;
   o._tableTitleTexts = null;
   o._tableTitleTextHeight = 0;
   o._tableTextPadding = 0;
   o.setup = MO.FGuiFPCCTable_setup;
   o.onPaintBegin = MO.FGuiFPCCTable_onPaintBegin;
   o.onImageLoad = MO.FGuiFPCCTable_onImageLoad;
   o.drawRectangleByText = MO.FGuiFPCCTable_drawRectangleByText;
   return o;
}
MO.FGuiFPCCTable_setup = function FGuiFPCCTable_setup() {
   var o = this;
   o._headFontText = "理财师业绩展示中心";
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   o._headFontHeight = 30;
   o._padding = 6;
   o._rankHeight = 40;
   o._rankCount = 3;
   o._tableTitleTexts = new Array('时间', '公司', '理财师', '理财师业绩', '注册/投资', '投资/赎回');
   o._tableTitleFontStyle = '16px Microsoft songti';
   o._tableTitleTextHeight = 16;
   o._tableTextPadding = 7;
}
MO.FGuiFPCCTable_onImageLoad = function FGuiFPCCTable_onImageLoad() {
   var o = this;
   if (--o._imageToLoad == 0) {
      o._ready = true;
      o._lastTick = MO.Timer.current();
      o.dirty();
   }
}
MO.FGuiFPCCTable_onPaintBegin = function FGuiFPCCTable_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var height = rectangle.height;
   var width = rectangle.width;
   graphic.drawRectangle(left, top, width, height, "#fff", 1);
   graphic.setFont(o._headFontStyle);
   var headWidth = graphic.textWidth(o._headFontText);
   var headLeft = left + (width - headWidth) * 0.5;
   var headTop = top + o._padding + o._headFontHeight;
   graphic.setFont(o._headFontStyle);
   graphic.drawText(o._headFontText, headLeft, headTop, '#55FFED');
   var rankLeft = left + o._padding;
   var rankTop = headTop + o._padding * 2;
   var rankWidth = width - o._padding * 2;
   var rankLastTop = 0;
   for (var i = 1; i <= o._rankCount; i++) {
      if (i == 1)
         graphic.drawRectangle(rankLeft, rankTop, rankWidth, o._rankHeight, "#fff", 1);
      else
         graphic.drawRectangle(rankLeft, rankTop + o._rankHeight * (i - 1), rankWidth, o._rankHeight, "#fff", 1);
      if (i == 3) {
         rankLastTop = rankTop + o._rankHeight * (i - 1) + o._rankHeight;
      }
   }
   var realtimeListTop = rankLastTop + o._padding;
   var realtimeListHeight = height - rankLastTop - o._padding;
   graphic.drawRectangle(rankLeft, realtimeListTop, rankWidth, realtimeListHeight, "#fff", 1);
   var tableTitleTextLeft = rankLeft + o._padding;
   graphic.setFont(o._tableTitleFontStyle);
   for (var j = 0; j < o._tableTitleTexts.length; j++) {
      var tableText = o._tableTitleTexts[j];
      var tableTextWidth = graphic.textWidth(tableText);
      var tableTextTop = realtimeListTop + o._tableTitleTextHeight + o._tableTextPadding;
      if (j == 0) {
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, o._tableTitleTextHeight, "#7798f2", 1, tableTitleTextLeft, tableTextTop, 1);
      } else {
         var tableTextWidthBefore = graphic.textWidth(o._tableTitleTexts[j - 1]);
         tableTitleTextLeft = tableTitleTextLeft + tableTextWidthBefore + o._tableTextPadding;
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, o._tableTitleTextHeight, "#ff6d4b", 1, tableTitleTextLeft, tableTextTop, 1);
      }
   }
}
MO.FGuiFPCCTable_drawRectangleByText = function FGuiFPCCTable_drawRectangleByText(graphic, text, textHeight, color, lineWidth, x, y, padding) {
   padding = padding * 1.5;
   var left = x - padding;
   var top = y - padding - textHeight;
   var textWidth = graphic.textWidth(text);
   var width = padding*2 + textWidth;
   var height = textHeight + padding * 4;
   graphic.drawRectangle(left, top, width, height, color, lineWidth);
}
with (MO) {
   MO.FGuiHistoryMilestoneBar = function FGuiHistoryMilestoneBar(o) {
      o = MO.Class.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._wanBGImage = null;
      o._yiBGImage = null;
      o._numImages = null;
      o._wanImage = null;
      o._yiImage = null;
      o._data = MO.Class.register(o, new AGetSet('_data'));
      o._fullWidth = 0;
      o._fullHeight = 0;
      o.setup = FGuiHistoryMilestoneBar_setup;
      o.onPaintBegin = FGuiHistoryMilestoneBar_onPaintBegin;
      o.dispose = FGuiHistoryMilestoneBar_dispose;
      return o;
   }
   MO.FGuiHistoryMilestoneBar_setup = function FGuiHistoryMilestoneBar_setup(data) {
      var o = this;
      o._data = data;
      var imageConsole = MO.Console.find(MO.FImageConsole);
      o._wanBGImage = imageConsole.load('{eai.resource}/milestone/bar_wan.png');
      o._yiBGImage = imageConsole.load('{eai.resource}/milestone/bar_yi.png');
      o._wanImage = imageConsole.load('{eai.resource}/number_2/wan.png');
      o._yiImage = imageConsole.load('{eai.resource}/number_2/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         o._numImages[i] = imageConsole.load('{eai.resource}/number_2/' + i + '.png');
      }
      var milestoneInvestmentTotal = data.investmentTotal();
      if (milestoneInvestmentTotal >= 10000) {
         o._bgImage = o._yiBGImage;
         o.setWidth(371);
         o.setHeight(80);
      } else {
         o._bgImage = o._wanBGImage;
         o.setWidth(341);
         o.setHeight(76);
      }
   }
   MO.FGuiHistoryMilestoneBar_onPaintBegin = function FGuiHistoryMilestoneBar_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, bgSize.width, bgSize.height);
      var textLeft = rectangle.left + 25;
      var textTop = rectangle.top + rectangle.height / 2;
      var drawFactor = 1;
      var invesText = o.data().investmentTotal().toString();
      if (invesText.length > 4) {
         drawFactor = 0.53;
         graphic.setFont('22px Microsoft YaHei');
         textTop += 10;
         invesText = invesText.substring(0, invesText.length - 4);
         var unitImage = o._yiImage;
      }
      else {
         drawFactor = 0.35;
         graphic.setFont('18px Microsoft YaHei');
         textTop += 6;
         var unitImage = o._wanImage;
      }
      var codeText = o.data().code();
      var dataText = codeText.substring(0, 4) + "年" + codeText.substring(4, 6) + "月" + codeText.substring(6, 8) + "日";
      var textWidth = graphic.textWidth(dataText);
      graphic.drawText(dataText, textLeft, textTop, '#FFEE78');
      var numImgSize = o._numImages[0]._size;
      var unitImgSize = o._yiImage._size;
      var numWidth = invesText.length * numImgSize.width * drawFactor + unitImgSize.width * drawFactor;
      var numLeft = rectangle.left + rectangle.width - numWidth - 55;
      var numTop = rectangle.top + (rectangle.height - numImgSize.height * drawFactor) / 2;
      for (var i = 0; i < invesText.length; i++) {
         graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width * drawFactor, numTop, numImgSize.width * drawFactor, numImgSize.height * drawFactor);
      }
      graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width * drawFactor, numTop, unitImgSize.width * drawFactor, unitImgSize.height * drawFactor);
   }
   MO.FGuiHistoryMilestoneBar_dispose = function FGuiHistoryMilestoneBar_dispose() {
      var o = this;
      o.__base.FGuiControl.dispose.call(o);
   }
}
with (MO) {
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = MO.Class.inherits(this, o, FGuiControl);
      o._bgImage              = null;
      o._numImages            = null;
      o._wanImage             = null;
      o._yiImage              = null;
      o._data                 = MO.Class.register(o, new AGetSet('_data'));
      o._startTick            = 0;
      o._popDuration          = 400;
      o._showDuration         = 3000;
      o._closeDuration        = 400;
      o._fullWidth            = 953;
      o._fullHeight           = 896;
      o._popupSE              = null;
      o._100yiSE              = null;
      o._listenersDataChanged = MO.Class.register(o, new AListener('_listenersDataChanged', MO.EEvent.DataChanged));
      o.setup                 = FGuiHistoryMilestoneFrame_setup;
      o.onPaintBegin          = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad           = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show                  = FGuiHistoryMilestoneFrame_show;
      o.dispose               = FGuiHistoryMilestoneFrame_dispose;
      return o;
   }
   MO.FGuiHistoryMilestoneFrame_setup = function FGuiHistoryMilestoneFrame_setup() {
      var o = this;
      o.setWidth(o._fullWidth);
      o.setHeight(o._fullHeight);
      o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 2);
      o.setTop((MO.Eai.Canvas.logicSize().height));
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('{eai.resource}/milestone/bg.png');
      o._wanImage = MO.Class.create(MO.FImage);
      o._wanImage.addLoadListener(o, o.onImageLoad);
      o._wanImage.loadUrl('{eai.resource}/number/wan.png');
      o._yiImage = MO.Class.create(MO.FImage);
      o._yiImage.addLoadListener(o, o.onImageLoad);
      o._yiImage.loadUrl('{eai.resource}/number/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         var img = MO.Class.create(MO.FImage);
         img.addLoadListener(o, o.onImageLoad);
         img.loadUrl('{eai.resource}/number/' + i + '.png');
         o._numImages[i] = img;
      }
      var audioConsole = MO.Console.find(MO.FAudioConsole);
      o._popupSE = audioConsole.load('{eai.resource}/milestone/popup.mp3');
      o._100yiSE = audioConsole.load('{eai.resource}/milestone/100yi.mp3');
   }
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;
      var textLeft = hCenter - 135;
      var textTop = rectangle.top + 520;
      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var slideDistance = (MO.Eai.Canvas.logicSize().height + o._fullHeight) / 2 + 50 - o._fullHeight;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         p = 1 - (1 - p) * (1 - p);
         graphic._handle.globalAlpha = p;
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight - slideDistance * p);
      }
      else if (showTick < o._showDuration) {
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         p = p * p;
         graphic._handle.globalAlpha = 1 - p;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - 50 - slideDistance * p);
      }
      else {
         o._data = null;
         o.setVisible(false);
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight)
         o.dirty();
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         o.processDataChangedListener(dsEvent);
         return;
      }
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top, bgSize.width, bgSize.height);
      graphic.setFont('bold 28px Microsoft YaHei');
      graphic.drawText('达成日数：', textLeft, textTop + 50, '#FF9103');
      graphic.drawText('分公司数：', textLeft, textTop + 100, '#FF9103');
      graphic.drawText('理财师数：', textLeft, textTop + 150, '#FF9103');
      if (o.data()) {
         var invesText = o.data().investmentTotal().toString();
         if (invesText.length > 4) {
            invesText = invesText.substring(0, invesText.length - 4);
            var unitImage = o._yiImage;
         }
         else {
            var unitImage = o._wanImage;
         }
         var numImgSize = o._numImages[0]._size;
         var unitImgSize = o._yiImage._size;
         var numWidth = invesText.length * numImgSize.width + unitImgSize.width;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
         }
         graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width, rectangle.top + 320, unitImgSize.width, unitImgSize.height);
         var dataText = '';
         var textWidth = 0;
         graphic.setFont('48px Microsoft YaHei');
         var dateTextTop = rectangle.top + 280;
         var codeText = o.data().code();
         dataText = codeText.substring(0, 4) + "年" + codeText.substring(4, 6) + "月" + codeText.substring(6, 8) + "日达成";
         textWidth = graphic.textWidth(dataText);
         var dateTextLeft = hCenter - textWidth / 2 - 10;
         dataText = codeText.substring(0, 4);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '年';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         dataText = codeText.substring(4, 6);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '月';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         dataText = codeText.substring(6, 8);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '日达成';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         graphic.setFont('bold 28px Microsoft YaHei');
         dataText = o.data().dayCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 50, '#FFEE78');
         dataText = o.data().companyCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 100, '#FFEE78');
         dataText = o.data().staffCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 150, '#FFEE78');
      }
      graphic._handle.globalAlpha = 1;
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
      var inves = o.data().investmentTotal();
      if (inves == 1000000) {
         o._100yiSE.play(0);
      }
      o._popupSE.play(0);
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose() {
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiTimeline);
   o._startHeight     = 30;
   o._lineWidth       = 5;
   o._circleRadius    = 5;
   o._timeFontColor   = '#00B5F6';
   o._cursorFontColor = '#59FDE9';
   o.onPaintBegin     = MO.FGuiHistoryTimeline_onPaintBegin;
   return o;
}
MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiTimeline.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.bottom();
   var dataTop = top + 30 + o._startHeight;
   var dataBottom = bottom - 50;
   var dataHeight = dataBottom - dataTop;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
   var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();
   var startDate = o.startTime();
   var endDate = o.endTime();
   var degreeDate = o.degreeTime();
   var bakTime = startDate.date.getTime();
   var timeSpan = endDate.date.getTime() - startDate.date.getTime();
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var investmentTotal = historyModule.investmentTotal();
   var dateData = historyModule.dates().get(endDate.format('YYYYMMDD'));
   var maxInves = dateData.investmentTotal();
   var degreeData = historyModule.dates().get(degreeDate.format('YYYYMMDD'));
   if (degreeData.investmentTotal() * 3 < investmentTotal) {
      maxInves *= (degreeData.investmentTotal() / investmentTotal) * 3;
   }
   var pixPer10k = dataHeight * 10000 / maxInves;
   var rateModule = MO.Console.find(MO.FEaiResourceConsole).rateModule();
   var rateResource = rateModule.find(MO.EEaiRate.Line);
   var ctx = graphic._handle;
   ctx.lineCap = 'round';
   ctx.beginPath();
   ctx.moveTo(lastX, lastY);
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   var inves = dateData.investmentTotal();
   var lastX = dataLeft;
   var lastY = dataBottom - inves / 10000 * pixPer10k;
   lastY -= o._startHeight;
   while (startDate.isBefore(degreeDate)) {
      var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var dayInvestmentTotal = dateData.investmentTotal();
         var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
         y -= o._startHeight;
         ctx.lineTo(x, y);
         lastX = x;
         lastY = y;
         startDate.addDay(1);
      }else{
         break;
      }
   }
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   if (dateData) {
      var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      var inves = dateData.investmentTotal();
      var y = dataBottom - inves / 10000 * pixPer10k;
      y -= o._startHeight;
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(inves / investmentTotal));
      var color = '#' + hexColor.substring(2);
      var opColor = MO.GuiColor.makeRgbString(hexColor, 0.3);
      ctx.lineTo(x, lastY + (y - lastY) * o.progress());
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   ctx.strokeStyle = gradient;
   ctx.fillStyle = opGradient;
   ctx.lineWidth = o._lineWidth;
   ctx.stroke();
   ctx.lineTo(x, dataBottom);
   ctx.lineTo(dataLeft, dataBottom);
   ctx.lineTo(dataLeft, lastY);
   ctx.fill();
   startDate.date.setTime(bakTime);
   startDate.refresh();
   while (startDate.isBefore(degreeDate)) {
      var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var dayInvestmentTotal = dateData.investmentTotal();
         var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
         y -= o._startHeight;
         var hexColor = MO.Lang.Hex.format(rateResource.findRate(dayInvestmentTotal / investmentTotal));
         var color = '#' + hexColor.substring(2);
         if (startDate.date.getDate() == 1) {
            graphic.drawCircle(x, y, o._circleRadius, 0, color, color);
            graphic.setFont('bold 22px Microsoft YaHei');
            if (dayInvestmentTotal > 100000000) {
               var text = MO.Lang.Float.unitFormat(dayInvestmentTotal, 0, 0, 2, 0, 100000000, '亿');
               var textWidth = graphic.textWidth(text);
               graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
            } else {
               var text = parseInt(dayInvestmentTotal / 10000) + '万';
               var textWidth = graphic.textWidth(text);
               graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
            }
         }
         lastX = x;
         lastY = y;
         startDate.addDay(1);
      } else {
         break;
      }
   }
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   if (dateData) {
      var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      var inves = dateData.investmentTotal();
      var y = dataBottom - inves / 10000 * pixPer10k;
      y -= o._startHeight;
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(inves / investmentTotal));
      var color = '#' + hexColor.substring(2);
      graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), o._circleRadius, 0, color, color);
      graphic.setFont('bold 22px Microsoft YaHei');
      if (inves > 100000000) {
         var text = MO.Lang.Float.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
         var textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
      } else {
         var text = parseInt(inves / 10000) + '万';
         var textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
      }
   }
   startDate.date.setTime(bakTime);
   startDate.refresh();
}
MO.FGuiLivePop = function FGuiLivePop(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._bgImage       = null;
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));
   o._startTick     = 0;
   o._popDuration   = 500;
   o._showDuration  = 2000;
   o._closeDuration = 500;
   o._fullWidth     = 910;
   o._fullHeight    = 140;
   o._riseHeight    = 50;
   o._date          = null;
   o.construct      = MO.FGuiLivePop_construct;
   o.setup          = MO.FGuiLivePop_setup;
   o.onPaintBegin   = MO.FGuiLivePop_onPaintBegin;
   o.onImageLoad    = MO.FGuiLivePop_onImageLoad;
   o.show           = MO.FGuiLivePop_show;
   o.dispose        = MO.FGuiLivePop_dispose;
   return o;
}
MO.FGuiLivePop_construct = function FGuiLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._date = new MO.TDate();
}
MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
   var o = this;
   o.setWidth(o._fullWidth);
   o.setHeight(o._fullHeight);
   o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
   o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
   o._bgImage = MO.Class.create(MO.FImage);
   o._bgImage.addLoadListener(o, o.onImageLoad);
   o._bgImage.loadUrl('{eai.resource}/invespop.png');
}
MO.FGuiLivePop_onImageLoad = function FGuiLivePop_onImageLoad() {
   this.dirty();
}
MO.FGuiLivePop_onPaintBegin = function FGuiLivePop_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if (!o._data) {
      return;
   }
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;
   var entity = o._data;
   var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityModule();
   var cityEntity = cityConsole.findByCard(entity.card());
   var popText = '';
   o._date.parse(entity.date());
   popText += o._date.format('HH24:MI:SS');
   popText += '    ';
   if (cityEntity) {
      popText += cityEntity.data().label();
   }
   popText += '    ';
   popText += entity.customer() + ' - ' + entity.phone();
   popText += '    ';
   popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   graphic.setFont('36px Microsoft YaHei');
   popTextWidth = graphic.textWidth(popText);
   var passedTick = MO.Timer.current() - o._startTick;
   var showTick = passedTick - o._popDuration;
   var closeTick = passedTick - o._showDuration - o._popDuration;
   var p = 0;
   if (passedTick < o._popDuration) {
      p = passedTick / o._popDuration;
      graphic._handle.globalAlpha = p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
   }
   else if (showTick < o._showDuration) {
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
   }
   else if (closeTick < o._closeDuration) {
      p = closeTick / o._closeDuration;
      graphic._handle.globalAlpha = 1 - p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
   }
   else {
      o._data = null;
      o.setVisible(false);
      o.dirty();
      return;
   }
}
MO.FGuiLivePop_show = function FGuiLivePop_show() {
   o = this;
   o.setVisible(true);
   o._startTick = MO.Timer.current();
   o.dirty();
}
MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiLiveTable = function FGuiLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   o._tableCount           = 0;
   o._entities             = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   o.oeUpdate              = MO.FGuiLiveTable_oeUpdate;
   o.construct             = MO.FGuiLiveTable_construct;
   o.setup                 = MO.FGuiLiveTable_setup;
   o.pushEntity            = MO.FGuiLiveTable_pushEntity;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}
MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var calculateRate = event.calculateRate;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   var widthDefine = 0;
   for(var i = 0; i < 4; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 7;
   }
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 167, 40);
   var rankEntity = o._rank;
   if(rankEntity){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankEntity.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < 4; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i] - 4, o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + (o._columnWidths[i] - headTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i];
   }
   var entities = o._entities;
   if(!entities.isEmpty()){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      graphic.clip(drawLeft, tableTop, drawWidth - 38, o._rowHeight * (o._tableCount - 1));
      tableTop += 24;
      var count = entities.count();
      for(var i = 0; i < count; i++) {
         var entity = entities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + o._rowHeight * i + o._lineScroll, drawWidth);
      }
   }
}
MO.FGuiLiveTable_oeUpdate = function FGuiLiveTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._lineScroll < 0){
         o._lineScroll += 1;
         if(o._lineScroll < -o._rowHeight){
            o._lineScroll = 0;
         }
         if(o._lineScroll >= 0){
            var entities = o._entities;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
            o._lineScroll = 0;
         }
         o.dirty();
      }
   }
}
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._entities = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._columnLabels = new Array('时间', '城市', '用户-手机', '投资额(元)');
   if(MO.Runtime.isPlatformMobile()){
      o._columnDefines = new Array(130, 130, 180, 186);
   }else{
      o._columnDefines = new Array(110, 110, 160, 166);
   }
   o._columnWidths = new Array();
}
MO.FGuiLiveTable_setup = function FGuiLiveTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   o._headFontStyle = 'bold 36px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
      o._rowHeight = 46;
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '24px Microsoft YaHei';
      o._rowStart = 384;
      o._rowHeight = 36;
   }
}
MO.FGuiLiveTable_pushEntity = function FGuiLiveTable_pushEntity(entity){
   var o = this;
   if(!entity){
      return null;
   }
   var entities = o._entities;
   entities.unshift(entity);
   o._lineScroll -= o._rowHeight;
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}
MO.FGuiLiveTable_drawRow = function FGuiLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#E5BD1D';
   }else{
      fontColor = '#59FDE9';
   }
   if(flag){
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX - 6, imageY - 28, 58, 65);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   y += o._rankTextStart;
   var textWidth = 0;
   if(!flag){
      o._currentDate.parse(entity.date());
      var text = o._currentDate.format('HH24:MI:SS');
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] * 0.5 - textWidth * 0.5, y, fontColor);
   }
   x += widths[0];
   var cityResource = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(entity.card());
   text = '';
   if(cityResource){
      text = cityResource.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[1];
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[2];
   var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   var investmentRight = x + widths[3] - 15;
   if (investment.length > 7) {
      var highColor = null;
      if(investment.length > 9){
         highColor = '#FDEF01';
      }else{
         highColor = '#EB6C03';
      }
      var high = investment.substring(0, investment.length - 7);
      var low = investment.substring(investment.length - 7, investment.length);
      var highWidth = graphic.textWidth(high);
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high, investmentRight - lowWidth - highWidth, y, highColor);
      graphic.drawText(low, investmentRight - lowWidth, y, '#59FDE9');
   } else {
      textWidth = graphic.textWidth(investment);
      graphic.drawText(investment, investmentRight - textWidth, y, fontColor);
   }
}
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiStatisticsDate = function FEaiStatisticsDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   o._value       = MO.Class.register(o, new MO.AGetter('_value'));
   o.onPaintLabel = MO.FEaiStatisticsDate_onPaintLabel;
   o.construct    = MO.FEaiStatisticsDate_construct;
   o.setValue     = MO.FEaiStatisticsDate_setValue;
   o.dispose      = MO.FEaiStatisticsDate_dispose;
   return o;
}
MO.FEaiStatisticsDate_onPaintLabel = function FEaiStatisticsDate_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var textFont = 'bold 36px Microsoft YaHei';
   var unitFont = 'bold 28px Microsoft YaHei';
   graphic.setFont(textFont);
   var year = o._value.format('YYYY');
   var month = o._value.format('MM');
   var day = o._value.format('DD');
   var label = o._label;
   var labelLength = label.length;
   var yearValue = year + '年';
   var monthValue = month + '月';
   var dayValue = day + '日';
   var text = yearValue + monthValue + dayValue;
   var width = graphic.textWidth(text);
   var widthYear = graphic.textWidth(yearValue);
   var widthMonth = graphic.textWidth(monthValue);
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   var unitBaseX = x + 4;
   var unitBaseY = y - 5;
   graphic.setFont(textFont);
   var textWidth = graphic.textWidth(year);
   graphic.drawText(year, x, y, '#FFD926');
   graphic.setFont(unitFont);
   graphic.drawText('年', unitBaseX + textWidth, unitBaseY, '#00B5F6');
   graphic.setFont(textFont);
   var textWidth = graphic.textWidth(month);
   graphic.drawText(month, x + widthYear, y, '#FFD926');
   graphic.setFont(unitFont);
   graphic.drawText('月', unitBaseX + widthYear + textWidth, unitBaseY, '#00B5F6');
   graphic.setFont(textFont);
   var textWidth = graphic.textWidth(day);
   graphic.drawText(day, x + widthYear + widthMonth, y, '#FFD926');
   graphic.setFont(unitFont);
   graphic.drawText('日', unitBaseX + widthYear + widthMonth + textWidth, unitBaseY, '#00B5F6');
}
MO.FEaiStatisticsDate_construct = function FEaiStatisticsDate_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   o._value = new MO.TDate();
}
MO.FEaiStatisticsDate_setValue = function FEaiStatisticsDate_setValue(value){
   var o = this;
   o._value.parse(value, 'YYYYMMDD');
   o.dirty()
}
MO.FEaiStatisticsDate_dispose = function FEaiStatisticsDate_dispose(){
   var o = this;
   o._value = MO.Lang.Object.dispose(o._value);
   o.__base.FGuiLabel.dispose.call(o);
}
MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankEntities            = MO.Class.register(o, new MO.AGetter('_rankEntities'));
   o._entities                = MO.Class.register(o, new MO.AGetter('_entities'));
   o._tableEntities           = MO.Class.register(o, new MO.AGetter('_tableEntities'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._entityPool              = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onInvestment             = MO.FEaiStatisticsInvestment_onInvestment;
   o.construct                = MO.FEaiStatisticsInvestment_construct;
   o.allocEntity              = MO.FEaiStatisticsInvestment_allocEntity;
   o.allocShape               = MO.FEaiStatisticsInvestment_allocShape;
   o.setup                    = MO.FEaiStatisticsInvestment_setup;
   o.calculateInvestmentLevel = MO.FEaiStatisticsInvestment_calculateInvestmentLevel;
   o.calculateCurrent         = MO.FEaiStatisticsInvestment_calculateCurrent;
   o.focusEntity              = MO.FEaiStatisticsInvestment_focusEntity;
   o.process                  = MO.FEaiStatisticsInvestment_process;
   o.dispose                  = MO.FEaiStatisticsInvestment_dispose;
   return o;
}
MO.FEaiStatisticsInvestment_onInvestment = function FEaiStatisticsInvestment_onInvestment(event){
   var o = this;
   var content = event.content;
   o._invementDay = content.investment_day;
   o._invementTotal = content.investment_total;
   var rankEntities = o._rankEntities;
   var count = rankEntities.count();
   for(var i = 0; i < count; i++){
      var entity = rankEntities.at(i);
      o._entityPool.free(entity);
   }
   rankEntities.clear();
   var dataset = content.rank;
   if(dataset){
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         rankEntities.push(entity);
      }
   }
   var dataset = content.collection;
   var entities = o._entities;
   if(dataset){
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         entities.push(entity);
      }
   }
   o.calculateCurrent();
   var dsEvent = o._eventDataChanged;
   dsEvent.entity = null;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   var entityCount = entities.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
   o._tableTick = 0;
}
MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._entities = new MO.TObjects();
   o._tableEntities = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._rankEntities = new MO.TObjects();
   o._entityPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
   var o = this;
   var entity = o._entityPool.alloc();
   if(!entity){
      entity = MO.Class.create(MO.FEaiStatisticsInvestmentEntity);
   }
   return entity;
}
MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiStatisticsInvestment_calculateInvestmentLevel = function FEaiStatisticsInvestment_calculateInvestmentLevel(investment){
   var o = this;
   if(investment >= 5000000){
      return 5;
   }else if(investment >= 1000000){
      return 4;
   }else if(investment >= 100000){
      return 3;
   }else if(investment >= 10000){
      return 2;
   }else if(investment >= 1000){
      return 1;
   }
   return 0;
}
MO.FEaiStatisticsInvestment_calculateCurrent = function FEaiStatisticsInvestment_calculateCurrent(){
   var o = this;
   var invementDay = o._invementDay;
   var invementTotal = o._invementTotal;
   var entities = o._entities;
   var count = entities.count();
   for(var i = 0; i < count; i++){
      var entity = entities.at(i);
      var investment = entity.investment();
      invementDay -= investment;
      invementTotal -= investment;
   }
   o._invementDayCurrent = Math.max(invementDay, 0);
   o._invementTotalCurrent = Math.max(invementTotal, 0);
}
MO.FEaiStatisticsInvestment_focusEntity = function FEaiStatisticsInvestment_focusEntity(entity){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = entity.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = entity.investment();
      var level = o.calculateInvestmentLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   var dsEvent = o._eventDataChanged;
   dsEvent.entity = entity;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
}
MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.doInvestmentDynamic(o, o.onInvestment, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.RTimer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      if(o._tableEntities.count() >= o._tableCount){
         var entity = o._tableEntities.pop();
         o._entityPool.free(entity);
      }
      var entities = o._entities;
      if(!entities.isEmpty()){
         var entity = entities.shift();
         o._tableEntities.unshift(entity);
         o.focusEntity(entity);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._entities.count();
   dynamicInfo._investmentTableEntityCount = o._tableEntities.count();
   dynamicInfo._investmentPoolItemCount = o._entityPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._entityPool.frees().count();
}
MO.FEaiStatisticsInvestment_dispose = function FEaiStatisticsInvestment_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiStatisticsInvestmentEntity = function FEaiStatisticsInvestmentEntity(o){
      o = MO.Class.inherits(this, o, FEaiEntity);
      o._date       = MO.Class.register(o, new AGetter('_date'));
      o._customer   = MO.Class.register(o, new AGetter('_customer'));
      o._phone      = MO.Class.register(o, new AGetter('_phone'));
      o._card       = MO.Class.register(o, new AGetter('_card'));
      o._investment = MO.Class.register(o, new AGetter('_investment'));
      o._shape      = MO.Class.register(o, new AGetSet('_shape'));
      o.construct   = FEaiStatisticsInvestmentEntity_construct;
      o.loadData    = FEaiStatisticsInvestmentEntity_loadData;
      o.update      = FEaiStatisticsInvestmentEntity_update;
      o.dispose     = FEaiStatisticsInvestmentEntity_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestmentEntity_construct = function FEaiStatisticsInvestmentEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiStatisticsInvestmentEntity_loadData = function FEaiStatisticsInvestmentEntity_loadData(data){
      var o = this;
      o._date = data.date;
      o._customer = data.customer;
      o._phone = data.phone;
      o._card = data.card;
      o._investment = data.investment;
   }
   MO.FEaiStatisticsInvestmentEntity_build = function FEaiStatisticsInvestmentEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiStatisticsInvestmentEntity_update = function FEaiStatisticsInvestmentEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 5;
         var color = rateInfo.findRate(rate);
         range = rate * 10;
         rate = RFloat.toRange(rate, 0, 1);
         o._color.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 4);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = o._range = RFloat.toRange(Math.sqrt(range), 1, 4);
      o._size.set(range, range);
   }
   MO.FEaiStatisticsInvestmentEntity_dispose = function FEaiStatisticsInvestmentEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvestmentShape = function FEaiStatisticsInvestmentShape(o){
      o = MO.Class.inherits(this, o, FE3dShape);
      o._ready         = false;
      o._playing       = false;
      o._finish        = false;
      o._image         = null;
      o._statusPaint   = false;
      o._cityEntity    = MO.Class.register(o, new AGetSet('_cityEntity'));
      o._entity        = MO.Class.register(o, new AGetter('_entity'));
      o._customerLabel = null;
      o._cityLabel     = null;
      o._investment    = null;
      o._interval      = 10;
      o._moveRate      = 0;
      o._lastTick      = 0;
      o.onImageLoad    = FEaiStatisticsInvestmentShape_onImageLoad;
      o.construct      = FEaiStatisticsInvestmentShape_construct;
      o.setup          = FEaiStatisticsInvestmentShape_setup;
      o.setEntity      = FEaiStatisticsInvestmentShape_setEntity;
      o.paint          = FEaiStatisticsInvestmentShape_paint;
      o.process        = FEaiStatisticsInvestmentShape_process;
      o.dispose        = FEaiStatisticsInvestmentShape_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestmentShape_onImageLoad = function FEaiStatisticsInvestmentShape_onImageLoad(event){
      var o = this;
      o._ready = true;
   }
   MO.FEaiStatisticsInvestmentShape_construct = function FEaiStatisticsInvestmentShape_construct(){
      var o = this;
      o.__base.FE3dShape.construct.call(o);
   }
   MO.FEaiStatisticsInvestmentShape_setup = function FEaiStatisticsInvestmentShape_setup(){
      var o = this;
      o.__base.FE3dShape.setup.call(o);
      var renderable = o._renderable = MO.Class.create(FE3dShapeData);
      renderable.linkGraphicContext(o);
      renderable.setOptionCenter(true);
      renderable.size().set(128, 64);
      renderable.setup();
      var image = o._image = MO.Class.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl('/script/ars/eai/investment.png');
      o._ready = false;
   }
   MO.FEaiStatisticsInvestmentShape_setEntity = function FEaiStatisticsInvestmentShape_setEntity(entity){
      var o = this;
      o._customerLabel = entity.customer();
      o._cityLabel = o._cityEntity.data().label();
      o._investment = entity.investment();
      o._finish = false;
   }
   MO.FEaiStatisticsInvestmentShape_paint = function FEaiStatisticsInvestmentShape_paint(){
      var o = this;
      var cityEntity = o._cityEntity;
      var location = cityEntity.location();
      var material = o.material();
      material.info().optionAlpha = true;
      material.info().ambientColor.set(1, 1, 1, 1);
      var matrix = o._matrix;
      matrix.tx = location.x;
      matrix.ty = location.y;
      matrix.tz = 0;
      matrix.setScale(10, 5, 1);
      matrix.update();
      var renderable = o._renderable;
      var graphic = renderable.beginDraw();
      graphic.drawImage(o._image, 0, 0, 128, 64);
      graphic.setFont('bold 18px Microsoft YaHei');
      graphic.drawText(o._cityLabel, 15, 25, '#FF00FF');
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText(o._customerLabel, 30, 50, '#FFFF00');
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText(o._investment, 55, 50, '#FF0000');
      renderable.endDraw();
      o._statusPaint = true;
      o._playing = true;
      o._lastTick = 0;
      o._moveRate = 0;
   }
   MO.FEaiStatisticsInvestmentShape_process = function FEaiStatisticsInvestmentShape_process(region){
      var o = this;
      o.__base.FE3dShape.process.call(o, region);
      if(o._statusDirty){
         if(o.testReady()){
            if(!o._statusPaint){
               o.paint();
               o._statusPaint = true;
            }
            o._statusDirty = false;
         }
      }
      if(o._statusPaint && !o._finish){
         var tick = RTimer.current();
         var matrix = o._matrix;
         if(tick - o._lastTick > o._interval){
            matrix.ty += o._moveRate + 0.01;
            o._moveRate += 0.01;
            matrix.updateForce();
            o._lastTick = tick;
         }
         if(matrix.ty > 100){
            o._finish = true;
         }
      }
   }
   MO.FEaiStatisticsInvestmentShape_dispose = function FEaiStatisticsInvestmentShape_dispose(){
      var o = this;
      o.__base.FE3dShape.dispose.call(o);
   }
}
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o) {
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   o._value = MO.Class.register(o, new MO.AGetter('_value'), '0');
   o._originValue = '0';
   o._valueSign = 1;
   o._originValueSign = 1;
   o._increasing = false;
   o._startTick = 0;
   o._rolling = MO.Class.register(o, new MO.AGetSet('_rolling'), false);
   o._rollingDuration = MO.Class.register(o, new MO.AGetSet('_rollingDuration'), 1000);
   o._rollingPages = null;
   o._noRolling = MO.Class.register(o, new MO.AGetSet('_noRolling'), false);
   o.onPaintLabel = MO.FEaiStatisticsLabel_onPaintLabel;
   o.oeUpdate = MO.FEaiStatisticsLabel_oeUpdate;
   o.construct = MO.FEaiStatisticsLabel_construct;
   o.setValue = MO.FEaiStatisticsLabel_setValue;
   o.dispose = MO.FEaiStatisticsLabel_dispose;
   return o;
}
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   graphic.clip(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   var textFont = o._foreFont;
   var unitFont = o._backFont;
   var baseX;
   if (o._alignCd != MO.EUiAlign.Right) {
      baseX = rectangle.left;
   } else {
      graphic.setFont(textFont);
      var valueTextLength = graphic.textWidth(o._value);
      var unitText = '元';
      if (o._value.length > 4) { unitText += '万'; }
      if (o._value.length > 8) { unitText += '亿'; }
      graphic.setFont(unitFont);
      var unitTextLength = graphic.textWidth(unitText);
      baseX = rectangle.right() - valueTextLength - unitTextLength;
   }
   var baseY = rectangle.top + rectangle.height;
   var drawX = baseX;
   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick > o._rollingDuration || o._noRolling) {
      passedTick = o._rollingDuration;
      o._rolling = false;
   }
   var increasing = o._increasing;
   var originValue = o._originValue;
   var originValueSign = o._originValueSign;
   for (var i = 0; i < o._value.length; i++) {
      var passedValue = o._rollingPages.get(i) * (passedTick / o._rollingDuration);
      var currentNum = parseInt(originValue.charAt(i)) * originValueSign + parseInt(passedValue);
      var currentNumString = currentNum.toString();
      var nextNum;
      if (increasing) {
         nextNum = currentNum + 1;
      }
      else {
         nextNum = currentNum - 1;
      }
      var nextNumString = nextNum.toString();
      var currentNumChar = parseInt(currentNumString.charAt(currentNumString.length - 1));
      var nextNumChar = parseInt(nextNumString.charAt(nextNumString.length - 1));
      var rate = passedValue - parseInt(passedValue);
      rate = increasing ? rate : rate * -1;
      graphic.setFont(textFont);
      var textColor = '';
      if (i < o._originValue.length - 8) {
         textColor = '#FFD926';
      }
      else if (i < o._originValue.length - 4) {
         textColor = '#FF7200';
      }
      else if (i < o._originValue.length) {
         textColor = '#FD0000';
      }
      var fontHeight = textFont.size;
      if (increasing) {
         graphic.drawText(currentNumChar, drawX, baseY - fontHeight * rate, textColor);
         graphic.drawText(nextNumChar, drawX, baseY + fontHeight - fontHeight * rate, textColor);
      }
      else {
         graphic.drawText(currentNumChar, drawX, baseY + fontHeight * rate, textColor);
         graphic.drawText(nextNumChar, drawX, baseY - fontHeight + fontHeight * rate, textColor);
      }
      drawX += graphic.textWidth(currentNumChar);
      var unitDrawY = baseY - 3;
      if (i == o._originValue.length - 9) {
         graphic.setFont(unitFont);
         graphic.drawText('亿', drawX, unitDrawY, '#00B5F6');
         drawX += graphic.textWidth('亿');
      }
      else if (i == o._originValue.length - 5) {
         graphic.setFont(unitFont);
         graphic.drawText('万', drawX, unitDrawY, '#00B5F6');
         drawX += graphic.textWidth('万');
      }
      else if (i == o._originValue.length - 1) {
         graphic.setFont(unitFont);
         graphic.drawText('元', drawX, unitDrawY, '#00B5F6');
         drawX += graphic.textWidth('元');
      }
   }
   if (o._rolling == false) {
      o._originValue = o._value;
      o._originValueSign = o._valueSign;
      o._rollingPages.clear();
   }
}
MO.FEaiStatisticsLabel_setValue = function FEaiStatisticsLabel_setValue(value) {
   var o = this;
   if (o._value == value) {
      return;
   }
   if (value.charAt(0) == '-') {
      o._valueSign = -1;
      value = value.substring(1, value.length - 2);
   }
   else {
      o._valueSign = 1;
   }
   if (o._rolling) {
      o._originValue = o._value;
      o._originValueSign = o._valueSign;
   }
   o._value = value;
   var originValue = o._originValue;
   var lengthDiff = value.length - originValue.length;
   while (lengthDiff > 0) {
      originValue = '0' + originValue;
      lengthDiff--;
   }
   o._originValue = originValue;
   o._rollingPages.clear();
   o._rollingPages._length = value.length;
   var valueSign = o._valueSign;
   var originValueSign = o._originValueSign;
   var increasing = o._increasing = parseInt(value) > parseInt(originValue);
   if (increasing) {
      for (var i = 0; i < value.length; i++) {
         var pages = parseInt(value.substring(i, i + 1)) * valueSign - parseInt(originValue.substring(i, i + 1)) * originValueSign;
         if (pages == 0 && valueSign * originValueSign < 0) {
            pages = parseInt(value.substring(i, i + 1)) * 2;
            pages = pages == 0 ? 10 : pages;
         }
         else {
            pages = pages < 0 ? pages + 10 : pages;
         }
         o._rollingPages.set(i, pages);
      }
   }
   else {
      for (var i = 0; i < value.length; i++) {
         var pages = parseInt(value.substring(i, i + 1)) * valueSign - parseInt(originValue.substring(i, i + 1)) * originValueSign;
         if (pages == 0 && valueSign * originValueSign < 0) {
            pages = parseInt(value.substring(i, i + 1)) * -2;
            pages = pages == 0 ? 10 : pages;
         }
         else {
            pages = pages > 0 ? pages - 10 : pages;
         }
         o._rollingPages.set(i, pages);
      }
   }
   o._startTick = MO.Timer.current();
   o._rolling = true;
}
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event) {
   var o = this;
   o.__base.FGuiLabel.oeUpdate.call(o, event);
   if (o._rolling) {
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct() {
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   o._rollingPages = new MO.TArray();
}
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose() {
   var o = this;
   o._ticker = MO.RObject.dispose(o._ticker);
   o.__base.FGuiLabel.dispose.call(o);
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
   o._timeline = null;
   o.onLoadData = MO.FEaiChartInvestmentScene_onLoadData;
   o.onKeyDown = MO.FEaiChartInvestmentScene_onKeyDown;
   o.setup = MO.FEaiChartInvestmentScene_setup;
   o.selectDate = MO.FEaiChartInvestmentScene_selectDate;
   o.active = MO.FEaiChartInvestmentScene_active;
   o.process = MO.FEaiChartInvestmentScene_process;
   o.deactive = MO.FEaiChartInvestmentScene_deactive;
   o.onDateSelect = MO.FEaiChartInvestmentScene_onDateSelect;
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
      var invesTable = document.getElementById('id_investment_table');
      for (var i = 1; i < invesTable.rows.length; i++) {
         var row = invesTable.rows[i];
         row.style.display = 'none';
      }
      o._playing = true;
   }
}
MO.FEaiChartInvestmentScene_selectDate = function FEaiChartInvestmentScene_selectDate(code) {
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   if (dateData) {
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      var invesTable = document.getElementById('id_investment_table');
      while (invesTable.rows.length < count + 1) {
         var row = invesTable.insertRow(invesTable.rows.length);
         row.insertCell(0);
         row.insertCell(1);
         row.insertCell(2);
      }
      for (var i = 0; i < count; i++) {
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
         var provinceResData = provinceConsole.findByCode(provinceData.code());
         var row = invesTable.rows[i + 1];
         row.style.display = '';
         row.className = 'DataGrid_Row';
         var rankCell = row.cells[0];
         var labelCell = row.cells[1];
         var invesCell = row.cells[2];
         if (i > 2) {
            rankCell.innerText = i + 1;
         }
         labelCell.innerText = provinceResData.label();
         if (provinceData.investmentTotal() > 1000) {
            invesCell.innerText = MO.RFloat.unitFormat(provinceData.investmentTotal(), 0, 0, 2, 0, 10000, '万');
         }
         else {
            invesCell.innerText = provinceData.investmentTotal();
         }
         invesCell.align = 'right';
      }
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.repaint();
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var total = o._totalBar.findComponent('total');
      total.setLabel(MO.RFloat.unitFormat(dateData.investmentTotal(), 0, 0, 2, 0, 10000, '万'));
      o._totalBar.repaint();
   }
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
   var invesTable = document.getElementById('id_investment_table');
   for (var i = 0; i < 3; i++) {
      var row = invesTable.insertRow(invesTable.rows.length);
      var rankCell = row.insertCell(0);
      row.insertCell(1);
      row.insertCell(2);
      switch (i) {
         case 0:
            row.style.color = '#FFEA01';
            rankCell.innerHTML = "1 <IMG src='/script/ars/eai/medals/gold.png'/>";
            break;
         case 1:
            row.style.color = '#C5D3D6';
            rankCell.innerHTML = "2 <IMG src='/script/ars/eai/medals/silver.png'/>";
            break;
         case 2:
            row.style.color = '#E16A00';
            rankCell.innerHTML = "3 <IMG src='/script/ars/eai/medals/copper.png'/>";
            break;
         default:
            break;
      }
   }
   var stage = o.activeStage();
   var layer = stage.faceLayer();
   var timeline = o._timeline = MO.RClass.create(MO.FGuiHistoryTimeline);
   timeline.setName('Timeline');
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas._size.height - 400);
   timeline.setWidth(MO.Eai.Canvas._size.width - 500);
   timeline.setHeight(350);
   timeline.setTimeUnit(MO.EUiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   layer.push(timeline);
}
MO.FEaiChartInvestmentScene_onDateSelect = function FEaiChartInvestmentScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
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
   var citysRenderables = o._citysRenderables;
   var count = citysRenderables.count()
   for(var i = 0; i < count; i++){
      var citysRenderable = citysRenderables.at(i);
      citysRenderable.upload();
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartLiveScene = function FEaiChartLiveScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartLive;
   o._investment             = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent      = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._livePop                = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartLiveScene_onInvestmentDataChanged;
   o.onOperationVisibility   = MO.FEaiChartLiveScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartLiveScene_onProcessReady;
   o.onProcess               = MO.FEaiChartLiveScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartLiveScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartLiveScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartLiveScene_setup;
   o.showParticle            = MO.FEaiChartLiveScene_showParticle;
   o.showFace                = MO.FEaiChartLiveScene_showFace;
   o.fixMatrix               = MO.FEaiChartLiveScene_fixMatrix;
   o.processResize           = MO.FEaiChartLiveScene_processResize;
   return o;
}
MO.FEaiChartLiveScene_onInvestmentDataChanged = function FEaiChartLiveScene_onInvestmentDataChanged(event) {
   var o = this;
   var entity = event.entity;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushEntity(entity);
   table.dirty();
   if(entity){
      var pop = o._livePop;
      pop.setData(entity);
   }
}
MO.FEaiChartLiveScene_onOperationVisibility = function FEaiChartLiveScene_onOperationVisibility(event){
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if(event.visibility){
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   }else{
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartLiveScene_onProcessReady = function FEaiChartLiveScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartLiveScene_onProcess = function FEaiChartLiveScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if(!o._statusStart){
      if(MO.Window.Browser.capability().soundConfirm){
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      }else{
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
         return;
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._investment.process();
      var logoBar = o._logoBar;
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
   if (o._livePop.visible()) {
      o._livePop.dirty();
   }
}
MO.FEaiChartLiveScene_onSwitchProcess = function FEaiChartLiveScene_onSwitchProcess(event){
   var o = this;
}
MO.FEaiChartLiveScene_onSwitchComplete = function FEaiChartLiveScene_onSwitchComplete(event){
   var o = this;
}
MO.FEaiChartLiveScene_setup = function FEaiChartLiveScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   o._guiManager.register(frame);
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGui24HTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   var livePop = o._livePop = MO.Class.create(MO.FGuiLivePop);
   livePop.setName('LivePop');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartLiveScene_showParticle = function FEaiChartLiveScene_showParticle(provinceEntity, cityResource){
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartLiveScene_showFace = function FEaiChartLiveScene_showFace(){
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartLiveScene_fixMatrix = function FEaiChartLiveScene_fixMatrix(matrix){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   }else{
      matrix.tx = -38.6;
      matrix.ty = -12.8;
      matrix.tz = 0;
      matrix.setScale(0.32, 0.36, 0.32);
   }
   matrix.update();
}
MO.FEaiChartLiveScene_processResize = function FEaiChartLiveScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._investment.display().matrix());
   var logoBar = o._logoBar;
   if(isVertical){
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   }else{
      logoBar.setLocation(5, 5);
      logoBar.setScale(1, 1);
   }
   var control = o._southSea;
   if(isVertical){
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   }else{
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(710);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if(isVertical){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(680);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(isVertical){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(650);
   }
}
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiScene);
   o._optionMapCountry     = true;
   o._readyProvince        = false;
   o._countryReady         = false;
   o._nowDate              = null;
   o._nowTicker            = null;
   o._mapEntity            = null;
   o._citysRangeRenderable = null;
   o._citysRenderable      = null;
   o._flagSprite           = null;
   o._southSea             = null;
   o._groundAutio          = null;
   o.onLoadTemplate        = MO.FEaiChartScene_onLoadTemplate;
   o.onProcess             = MO.FEaiChartScene_onProcess;
   o.construct             = MO.FEaiChartScene_construct;
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
   o.processResize         = MO.FEaiChartScene_processResize;
   o.deactive              = MO.FEaiChartScene_deactive;
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadTemplate = function FEaiChartScene_onLoadTemplate(event){
   var o = this;
   var template = event.template;
}
MO.FEaiChartScene_onProcess = function FEaiChartScene_onProcess(){
   var o = this;
   o.__base.FEaiScene.onProcess.call(o);
   if(!o._countryReady){
      var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
      if(entityConsole.testCountryReady()){
         o._countryReady = true;
         o.processResize();
      }
   }
}
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(10000);
}
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -35;
   matrix.ty = -12.3;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.linkGraphicContext(o);
   entityConsole.setup();
   var mapEntity = o._mapEntity = entityConsole.mapEntity();
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   var display = mapEntity.countryFaceDisplay();
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = mapEntity.countryBorderDisplay();
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   var cityRangeRenderable = mapEntity.cityRangeRenderable();
   o.fixMatrix(cityRangeRenderable.matrix());
   stage.cityRangeLayer().push(cityRangeRenderable);
   var cityCenterRenderable = mapEntity.cityCenterRenderable();
   o.fixMatrix(cityCenterRenderable.matrix());
   stage.cityLayer().push(cityCenterRenderable);
   var systemConsole = MO.Console.find(MO.FEaiLogicConsole).system();
   systemConsole.refresh();
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   var audio = o._groundAutio = audioConsole.load('{eai.resource}-{device.type}/chart/ground.mp3');
   audio.setLoop(true);
   audio.setVolume(0.2);
   if(o._optionMapCountry){
      var control = o._southSea = MO.Class.create(MO.FGuiPicture);
      control.setDisplayOrder(-10);
      control.size().set(134, 203);
      control.setBackResource('url:{eai.resource}/south-sea.png');
      control.psInitialize();
      control.build();
      o._guiManager.register(control);
   }
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiChartScene_resetDate = function FEaiChartScene_resetDate(){
   var o = this;
}
MO.FEaiChartScene_processResize = function FEaiChartScene_processResize(){
   var o = this;
   o.__base.FEaiScene.processResize.call(o);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = entityConsole.mapEntity();
   o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
   o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
   o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
   o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
}
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._nowDate = RObject.dispose(o._nowDate);
   o._nowTicker = RObject.dispose(o._nowTicker);
   o._mapEntity = null;
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._groundLayer    = MO.Class.register(o, new MO.AGetter('_groundLayer'));
   o._mapLayer       = MO.Class.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer    = MO.Class.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer = MO.Class.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer      = MO.Class.register(o, new MO.AGetter('_cityLayer'));
   o._dataLayer      = MO.Class.register(o, new MO.AGetter('_dataLayer'));
   o._spriteLayer    = MO.Class.register(o, new MO.AGetter('_spriteLayer'));
   o.construct       = MO.FEaiChartStage_construct;
   return o;
}
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._groundLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('GroundLayer', layer);
   var layer = o._mapLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('MapLayer', layer);
   var layer = o._borderLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   var layer = o._cityRangeLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   var layer = o._cityLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   var layer = o._dataLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('DataLayer', layer);
   var layer = o._spriteLayer = MO.Class.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('SpriteLayer', layer);
}
MO.FEaiChartTotalScene = function FEaiChartTotalScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._optionMapCountry = false;
   o._code             = MO.EEaiScene.ChartTotal;
   o._currentDate      = null;
   o._statusStart      = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o._chartTotal       = null;
   o.onInvestment      = MO.FEaiChartTotalScene_onInvestment;
   o.onProcess         = MO.FEaiChartTotalScene_onProcess;
   o.construct         = MO.FEaiChartTotalScene_construct;
   o.setup             = MO.FEaiChartTotalScene_setup;
   o.testReady         = MO.FEaiChartTotalScene_testReady;
   return o;
}
MO.FEaiChartTotalScene_onInvestment = function FEaiChartTotalScene_onInvestment(event){
   var o = this;
   var content = event.content;
   o._chartTotal.setValue(parseInt(content.investment_total).toString());
}
MO.FEaiChartTotalScene_onProcess = function FEaiChartTotalScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if(!o._statusStart){
      if(o.testReady()){
         var hLoading = document.getElementById('id_loading');
         if(hLoading){
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if(o._statusLayerLevel == 0){
            if(hLoading){
               document.body.removeChild(hLoading);
            }
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   if (o._playing) {
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      if(o._dataTicker.process()){
         var system = MO.Console.find(MO.FEaiLogicConsole).system();
         if(system.testReady()){
            var systemDate = system.currentDate();
            var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
            statistics.doInvestmentDynamic(o, o.onInvestment, systemDate.format(), systemDate.format());
         }
      }
      if (o._chartTotal.rolling()) {
         o._chartTotal.dirty();
      }
   }
}
MO.FEaiChartTotalScene_construct = function FEaiChartTotalScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._currentDate = new MO.TDate();
   o._dataTicker = new MO.TTicker(1000 * 30);
}
MO.FEaiChartTotalScene_setup = function FEaiChartTotalScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   o._guiManager.hide();
   var chartTotal = o._chartTotal = MO.Class.create(MO.FGuiChartTotal);
   chartTotal.setup();
   chartTotal.build();
   o._guiManager.register(chartTotal);
}
MO.FEaiChartTotalScene_testReady = function FEaiChartTotalScene_testReady(){
   var o = this;
   if(!o._ready){
      if (!o._countryReady || !o._chartTotal.ready()) {
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiChartWorldScene = function FEaiChartWorldScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartWorld;
   o._investment             = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent      = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._livePop                = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._operationFlag          = false;
   o._operationPoint         = null;
   o._operationRotationX     = 0;
   o._operationRotationY     = 0;
   o._rotationX              = 0;
   o._rotationY              = 0;
   o._worldScale             = 500;
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartWorldScene_onInvestmentDataChanged;
   o.onProcessReady          = MO.FEaiChartWorldScene_onProcessReady;
   o.onProcess               = MO.FEaiChartWorldScene_onProcess;
   o.onOperationDown         = MO.FEaiChartWorldScene_onOperationDown;
   o.onOperationMove         = MO.FEaiChartWorldScene_onOperationMove;
   o.onOperationUp           = MO.FEaiChartWorldScene_onOperationUp;
   o.onOperationWheel        = MO.FEaiChartWorldScene_onOperationWheel;
   o.onSwitchProcess         = MO.FEaiChartWorldScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartWorldScene_onSwitchComplete;
   o.construct               = MO.FEaiChartWorldScene_construct;
   o.setup                   = MO.FEaiChartWorldScene_setup;
   o.testReady               = MO.FEaiChartWorldScene_testReady;
   o.showParticle            = MO.FEaiChartWorldScene_showParticle;
   o.showFace                = MO.FEaiChartWorldScene_showFace;
   o.fixMatrix               = MO.FEaiChartWorldScene_fixMatrix;
   o.processResize           = MO.FEaiChartWorldScene_processResize;
   return o;
}
MO.FEaiChartWorldScene_onInvestmentDataChanged = function FEaiChartWorldScene_onInvestmentDataChanged(event) {
   var o = this;
   var entity = event.entity;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushEntity(entity);
   table.dirty();
   if(entity){
      var pop = o._livePop;
      pop.setData(entity);
   }
}
MO.FEaiChartWorldScene_onProcessReady = function FEaiChartWorldScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showWorld();
}
MO.FEaiChartWorldScene_onProcess = function FEaiChartWorldScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if(!o._statusStart){
      if(o.testReady()){
         var hLoading = document.getElementById('id_loading');
         if(hLoading){
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if(o._statusLayerLevel <= 0){
            if(hLoading){
               document.body.removeChild(hLoading);
            }
            o.processLoaded();
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   if (o._playing) {
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._investment.process();
      var logoBar = o._logoBar;
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
   }
   if (o._livePop.visible()) {
      o._livePop.dirty();
   }
}
MO.FEaiChartWorldScene_onOperationDown = function FEaiChartWorldScene_onOperationDown(event){
   var o = this;
   o._operationFlag = true;
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}
MO.FEaiChartWorldScene_onOperationMove = function FEaiChartWorldScene_onOperationMove(event){
   var o = this;
   if(o._operationFlag){
      var cx = event.x - o._operationPoint.x;
      var cy = event.y - o._operationPoint.y;
      o._rotationX = o._operationRotationX - cy * 0.001;
      o._rotationY = o._operationRotationY - cx * 0.002;
   }
}
MO.FEaiChartWorldScene_onOperationUp = function FEaiChartWorldScene_onOperationUp(event){
   var o = this;
   o._operationFlag = false;
}
MO.FEaiChartWorldScene_onOperationWheel = function FEaiChartWorldScene_onOperationWheel(event){
   var o = this;
   var delta = event.deltaY
   if(delta > 0){
      o._worldScale /= 1.05;
   }else if(delta < 0){
      o._worldScale *= 1.05;
   }
}
MO.FEaiChartWorldScene_onSwitchProcess = function FEaiChartWorldScene_onSwitchProcess(event){
   var o = this;
}
MO.FEaiChartWorldScene_onSwitchComplete = function FEaiChartWorldScene_onSwitchComplete(event){
   var o = this;
}
MO.FEaiChartWorldScene_construct = function FEaiChartWorldScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._operationPoint = new MO.SPoint2();
}
MO.FEaiChartWorldScene_setup = function FEaiChartWorldScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   o._guiManager.register(frame);
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGui24HTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   var livePop = o._livePop = MO.Class.create(MO.FGuiLivePop);
   livePop.setName('LivePop');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   o._guiManager.hide();
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(1000);
   projection.update();
   var region = o._activeStage.region();
   region.selectCamera(camera);
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
}
MO.FEaiChartWorldScene_testReady = function FEaiChartWorldScene_testReady(){
   return true;
}
MO.FEaiChartWorldScene_showParticle = function FEaiChartWorldScene_showParticle(provinceEntity, cityResource){
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartWorldScene_showFace = function FEaiChartWorldScene_showFace(){
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiChartWorldScene_fixMatrix = function FEaiChartWorldScene_fixMatrix(matrix){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   }else{
      matrix.tx = -320;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   o._rotationY += 0.001;
}
MO.FEaiChartWorldScene_processResize = function FEaiChartWorldScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._investment.display().matrix());
   var logoBar = o._logoBar;
   if(isVertical){
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   }else{
      logoBar.setLocation(5, 5);
      logoBar.setScale(1, 1);
   }
   var control = o._southSea;
   if(isVertical){
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   }else{
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(710);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if(isVertical){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(680);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(isVertical){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(650);
   }
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
MO.FEaiScene = function FEaiScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o.onOperationKeyDown     = MO.FEaiScene_onOperationKeyDown;
   o.onOperationResize      = MO.FEaiScene_onOperationResize;
   o.onOperationOrientation = MO.FEaiScene_onOperationOrientation;
   o.onProcessAfter         = MO.FEaiScene_onProcessAfter;
   o.construct              = MO.FEaiScene_construct;
   o.setup                  = MO.FEaiScene_setup;
   o.active                 = MO.FEaiScene_active;
   o.deactive               = MO.FEaiScene_deactive;
   o.processLoaded          = MO.FEaiScene_processLoaded;
   o.processResize          = MO.FEaiScene_processResize;
   o.processEvent           = MO.FEaiScene_processEvent;
   o.dispose                = MO.FEaiScene_dispose;
   return o;
}
MO.FEaiScene_onOperationKeyDown = function FEaiScene_onOperationKeyDown(event){
   var o = this;
   o.__base.FScene.onOperationKeyDown.call(o, event);
   if(event.altKey && (event.keyCode == MO.EKeyCode.P)){
      var control = o._application.dynamicInfo();
      control.setVisible(!control.visible());
   }
}
MO.FEaiScene_onOperationResize = function FEaiScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   o.processResize();
}
MO.FEaiScene_onOperationOrientation = function FEaiScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   o.processResize();
}
MO.FEaiScene_onProcessAfter = function FEaiScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   o._guiManager.process();
}
MO.FEaiScene_construct = function FEaiScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}
MO.FEaiScene_setup = function FEaiScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   desktop.hide();
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   var control = o._application.dynamicInfo();
   guiManager.register(control);
}
MO.FEaiScene_active = function FEaiScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   var control = o._application.dynamicInfo();
   control.setVisible(false);
   control.setDisplayOrder(10000);
   control.setStage(stage);
   control.setGuiManager(o._guiManager);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(stage);
}
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(null);
}
MO.FEaiScene_processLoaded = function FEaiScene_processLoaded(){
   var o = this;
   var event = new MO.SEvent(o);
   MO.Window.lsnsLoaded.process(event);
   event.dispose();
   var desktop = o._application.desktop();
   desktop.show();
}
MO.FEaiScene_processResize = function FEaiScene_processResize(event){
   var o = this;
   o._guiManager.dirty();
}
MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
   var o = this;
   o.__base.FScene.processEvent.call(o, event);
   o._guiManager.processEvent(event);
}
MO.FEaiScene_dispose = function FEaiScene_dispose(){
   var o = this;
   o._guiManager = MO.RObject.dispose(o._guiManager);
   o.__base.FScene.dispose.call(o);
}
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                     = MO.EEaiScene.ChartHistory;
   o._ready                    = false;
   o._mapReady                 = false;
   o._dataReady                = false;
   o._playing                  = false;
   o._lastTick                 = 0;
   o._interval                 = 10;
   o._lastDateTick             = 0;
   o._dateInterval             = 120;
   o._startDate                = null;
   o._endDate                  = null;
   o._currentDate              = null;
   o._logoBar                  = null;
   o._buttonTransform          = null;
   o._timeline                 = null;
   o._milestoneFrame           = null;
   o._statusStart              = false;
   o._statusLayerCount         = 100;
   o._statusLayerLevel         = 100;
   o._milestoneBars            = null;
   o._milestoneShowed          = 0;
   o._milestoneBarShowDuration = 1000;
   o._milestoneBarShowTick     = 0;
   o._milestoneBarShowing      = false;
   o.onLoadData                = MO.FEaiChartHistoryScene_onLoadData;
   o.onDateSelect              = MO.FEaiChartHistoryScene_onDateSelect;
   o.onMilestoneDone           = MO.FEaiChartHistoryScene_onMilestoneDone;
   o.onOperationPlay           = MO.FEaiChartHistoryScene_onOperationPlay;
   o.onOperationPause          = MO.FEaiChartHistoryScene_onOperationPause;
   o.onOperationVisibility     = MO.FEaiChartHistoryScene_onOperationVisibility;
   o.onProcessReady            = MO.FEaiChartHistoryScene_onProcessReady;
   o.onProcess                 = MO.FEaiChartHistoryScene_onProcess;
   o.onSwitchLiveComplete      = MO.FEaiChartHistoryScene_onSwitchLiveComplete;
   o.testReady                 = MO.FEaiChartHistoryScene_testReady;
   o.setup                     = MO.FEaiChartHistoryScene_setup;
   o.resetDate                 = MO.FEaiChartHistoryScene_resetDate;
   o.selectDate                = MO.FEaiChartHistoryScene_selectDate;
   o.switchPlay                = MO.FEaiChartHistoryScene_switchPlay;
   o.switchLive                = MO.FEaiChartHistoryScene_switchLive;
   o.processResize             = MO.FEaiChartHistoryScene_processResize;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event) {
   var o = this;
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var startDate = historyModule.dates().first();
   var endDate = historyModule.dates().last();
   o._currentDate.parseAuto(startDate.code());
   o._startDate.parseAuto(startDate.code());
   o._endDate.parseAuto(endDate.code());
   var milestones = historyModule.milestones();
   var milestoneBars = o._milestoneBars = new MO.TObjects();
   var count = milestones.count();
   for (var i = count - 1; i >= 0; i--) {
      var milestone = milestones.at(count - i - 1);
      var bar = MO.RClass.create(MO.FGuiHistoryMilestoneBar);
      bar.linkGraphicContext(o);
      bar.setName('MilestoneBar_' + i);
      bar.setVisible(false);
      bar.setDockCd(MO.EUiDock.Right)
      bar.setTop(90 + 100 * i);
      var milestoneInvestmentTotal = milestone.investmentTotal();
      if (milestoneInvestmentTotal >= 10000) {
         bar.setRight(-371);
      } else {
         bar.setRight(-341);
      }
      bar.setup(milestone);
      bar.build();
      o._guiManager.register(bar);
      milestoneBars.push(bar);
   }
   o._dataReady = true;
}
MO.FEaiChartHistoryScene_onDateSelect = function FEaiChartHistoryScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}
MO.FEaiChartHistoryScene_onMilestoneDone = function FEaiChartHistoryScene_onMilestoneDone(event) {
   var o = this;
   o.switchPlay(true);
   o._milestoneShowed++;
   o._milestoneBarShowTick = MO.Timer.current();
   o._milestoneBarShowing = true;
}
MO.FEaiChartHistoryScene_onOperationPlay = function FEaiChartHistoryScene_onOperationPlay(event){
   var o = this;
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if (code == endCode) {
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var startDate = historyConsole.dates().first();
      MO.Lang.Date.autoParse(o._currentDate, startDate.code());
   }
   o.switchPlay(true);
}
MO.FEaiChartHistoryScene_onOperationPause = function FEaiChartHistoryScene_onOperationPause(event){
   var o = this;
   o.switchPlay(false);
}
MO.FEaiChartHistoryScene_onOperationVisibility = function FEaiChartHistoryScene_onOperationVisibility(event){
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if(event.visibility){
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   }else{
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartHistoryScene_onProcessReady = function FEaiChartHistoryScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartHistoryScene_onProcess = function FEaiChartHistoryScene_onProcess(){
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   var countryEntity = o._countryEntity;
   var mapEntity = o._mapEntity;
   if (!o._statusStart) {
      if (o.testReady()) {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if (o._statusLayerLevel == 0) {
            if (hLoading) {
               document.body.removeChild(hLoading);
            }
            countryEntity.start();
            o._mapEntity.showCountry(countryEntity);
            o.switchPlay(true);
            o.processLoaded();
            o._statusStart = true;
         }
      }
   }
   var currentTick = MO.Timer.current();
   if (o._playing) {
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
      }
      if (!o._mapReady) {
         mapEntity.cityRangeRenderable().setVisible(true);
         mapEntity.cityCenterRenderable().setVisible(true);
         o._guiManager.show();
         o._milestoneFrame.setVisible(false);
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.005);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      if (currentTick - o._lastTick > o._interval) {
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if(code == endCode){
               o.switchPlay(false);
               o.switchLive();
            }
            o._lastDateTick = currentTick;
            o._mapEntity.upload();
         }
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.dirty();
         o._lastTick = currentTick;
      }
   }
   if (o._milestoneBarShowing) {
      var mbPassedTick = currentTick - o._milestoneBarShowTick;
      var p = mbPassedTick / o._milestoneBarShowDuration;
      if (p > 1) {
         p = 1;
         o._milestoneBarShowing = false;
      }
      p = (1 - p) * (1 - p);
      var mBar = o._milestoneBars.at(o._milestoneShowed - 1);
      if (mBar.data().investmentTotal() >= 10000) {
         mBar.setRight(20 + (-371 * p));
      }
      else {
         mBar.setRight(20 + (-341 * p));
      }
      mBar.dirty();
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.dirty();
   }
}
MO.FEaiChartHistoryScene_onSwitchLiveComplete = function FEaiChartHistoryScene_onSwitchLiveComplete(event){
   var o = this;
   var scene = o._chapter.selectSceneByCode(MO.EEaiScene.ChartLive);
   scene.showFace();
}
MO.FEaiChartHistoryScene_testReady = function FEaiChartHistoryScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._dataReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   var audio = o._groundAutio;
   audio.pause();
   audio = null;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   var audio = o._groundAutio = audioConsole.load('{eai.resource}/historyBGM.mp3');
   audio.setLoop(true);
   audio.setVolume(0.2);
   audio.play();
   var mapEntity = o._mapEntity;
   mapEntity.cityRangeRenderable().setVisible(false);
   mapEntity.cityCenterRenderable().setVisible(false);
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.history.LogoBar');
   frame.setLocation(5, 5);
   o._guiManager.register(frame);
   var controlInvestment = o._logoBar.findComponent('investment');
   controlInvestment.setNoRolling(true);
   var transform = o._buttonTransform = MO.Class.create(MO.FGuiChangeTransform);
   transform.setInterval(10);
   transform.setScale(0.1);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiHistoryTimeline);
   timeline.linkGraphicContext(o);
   timeline.setName('Timeline');
   timeline.setDockCd(MO.EUiDock.Bottom);
   timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   timeline.setLeft(50);
   timeline.setRight(450);
   timeline.setBottom(5);
   timeline.setHeight(600);
   timeline.setTimeUnit(MO.EUiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.build();
   o._guiManager.register(timeline);
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
   milestoneFrame.setup();
   milestoneFrame.build();
   o._guiManager.register(milestoneFrame);
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var milestoneBG = MO.RClass.create(MO.FGuiPicture);
   milestoneBG.linkGraphicContext(o);
   milestoneBG.setName('MilestoneBG_Top');
   milestoneBG.setDockCd(MO.EUiDock.RightTop);
   milestoneBG.setWidth(468);
   milestoneBG.setHeight(464);
   milestoneBG._displayOrder = -1;
   milestoneBG._backResource = 'url:/script/ars/eai/milestone/bar_bg_top.png';
   milestoneBG.psInitialize();
   milestoneBG.build();
   o._guiManager.register(milestoneBG);
   milestoneBG = MO.RClass.create(MO.FGuiPicture);
   milestoneBG.linkGraphicContext(o);
   milestoneBG.setName('MilestoneBG_Bottom');
   milestoneBG.setDockCd(MO.EUiDock.RightBottom);
   milestoneBG.setWidth(468);
   milestoneBG.setHeight(464);
   milestoneBG._displayOrder = -1;
   milestoneBG._backResource = 'url:/script/ars/eai/milestone/bar_bg_bottom.png';
   milestoneBG.psInitialize();
   milestoneBG.build();
   o._guiManager.register(milestoneBG);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   historyModule.addLoadListener(o, o.onLoadData);
   historyModule.load();
}
MO.FEaiChartHistoryScene_resetDate = function FEaiChartHistoryScene_resetDate(){
   var o = this;
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var dateData = historyModule.dates().get(code);
   var milestone = historyModule.milestones().get(code);
   if (milestone) {
      o._milestoneFrame.setData(milestone);
      o._milestoneFrame.show();
      o._milestoneFrame.dirty();
      o.switchPlay(false);
   }
   if(dateData){
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.dirty();
      var cityDatas = dateData.citys();
      var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var cityCode = cityEntity.data().code();
         var data = cityDatas.get(cityCode);
         cityEntity.update(data);
      }
      var controlDate = o._logoBar.findComponent('date');
      controlDate.setValue(code);
      var controlInvestment = o._logoBar.findComponent('investment');
      controlInvestment.setValue(parseInt(dateData.investmentTotal()).toString());
   }
}
MO.FEaiChartHistoryScene_switchPlay = function FEaiChartHistoryScene_switchPlay(flag){
   var o = this;
   o._playing = flag;
}
MO.FEaiChartHistoryScene_switchLive = function FEaiChartHistoryScene_switchLive(){
   var o = this;
   var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
   alphaAction.setAlphaBegin(1);
   alphaAction.setAlphaEnd(0);
   alphaAction.setAlphaInterval(-0.005);
   alphaAction.addCompleteListener(o, o.onSwitchLiveComplete);
   alphaAction.push(o._guiManager);
   o._guiManager.mainTimeline().pushAction(alphaAction);
}
MO.FEaiChartHistoryScene_processResize = function FEaiChartHistoryScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var control = o._southSea;
   control.setDockCd(MO.EUiDock.RightBottom);
   control.setRight(520);
   control.setBottom(180);
}
MO.FEaiChartCustomerDynamicInfo = function FEaiChartCustomerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   o._rankUnits       = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiChartCustomerDynamicRankUnit)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartCustomerDynamicUnit)]);
   return o;
}
MO.FEaiChartCustomerDynamicRankUnit = function FEaiChartCustomerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartCustomerDynamicUnit = function FEaiChartCustomerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._modelLabel = MO.Class.register(o, [new MO.AGetter('_modelLabel'), new MO.APersistence('_modelLabel', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._gain       = MO.Class.register(o, [new MO.AGetter('_gain'), new MO.APersistence('_gain', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartCustomerProcessor = function FEaiChartCustomerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartCustomerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartCustomerProcessor_construct;
   o.allocUnit                = MO.FEaiChartCustomerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartCustomerProcessor_allocShape;
   o.setup                    = MO.FEaiChartCustomerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartCustomerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartCustomerProcessor_focusEntity;
   o.process                  = MO.FEaiChartCustomerProcessor_process;
   o.dispose                  = MO.FEaiChartCustomerProcessor_dispose;
   return o;
}
MO.FEaiChartCustomerProcessor_onDynamicData = function FEaiChartCustomerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartCustomerProcessor_construct = function FEaiChartCustomerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartCustomerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartCustomerProcessor_allocUnit = function FEaiChartCustomerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartCustomerProcessor_setup = function FEaiChartCustomerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartCustomerProcessor_calculateCurrent = function FEaiChartCustomerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      investmentCurrent -= unit.investment();
      investmentTotalCurrent -= unit.investment();
   }
   o._invementTotalCurrent = investmentTotalCurrent;
   o._invementDayCurrent = investmentCurrent;
}
MO.FEaiChartCustomerProcessor_focusEntity = function FEaiChartCustomerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartCustomerProcessor_process = function FEaiChartCustomerProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartCustomerProcessor_dispose = function FEaiChartCustomerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartCustomerScene = function FEaiChartCustomerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartCustomer;
   o._processor = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent = 0;
   o._ready = false;
   o._mapReady = false;
   o._playing = false;
   o._lastTick = 0;
   o._interval = 10;
   o._24HLastTick = 0;
   o._24HTrendInterval = 1000 * 60 * 5;
   o._logoBar = null;
   o._timeline = null;
   o._liveTable = null;
   o._statusStart = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o.onInvestmentDataChanged = MO.FEaiChartCustomerScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartCustomerScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartCustomerScene_onProcessReady;
   o.onProcess = MO.FEaiChartCustomerScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartCustomerScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartCustomerScene_onSwitchComplete;
   o.setup = MO.FEaiChartCustomerScene_setup;
   o.showParticle = MO.FEaiChartCustomerScene_showParticle;
   o.showFace = MO.FEaiChartCustomerScene_showFace;
   o.fixMatrix = MO.FEaiChartCustomerScene_fixMatrix;
   o.processResize = MO.FEaiChartCustomerScene_processResize;
   return o;
}
MO.FEaiChartCustomerScene_onInvestmentDataChanged = function FEaiChartCustomerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartCustomerScene_onOperationVisibility = function FEaiChartCustomerScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartCustomerScene_onProcessReady = function FEaiChartCustomerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartCustomerScene_onProcess = function FEaiChartCustomerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         return;
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartCustomerScene_onSwitchProcess = function FEaiChartCustomerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartCustomerScene_onSwitchComplete = function FEaiChartCustomerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartCustomerScene_setup = function FEaiChartCustomerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartCustomerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartCustomerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartCustomerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartCustomerScene_showParticle = function FEaiChartCustomerScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartCustomerScene_showFace = function FEaiChartCustomerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartCustomerScene_fixMatrix = function FEaiChartCustomerScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.8;
      matrix.ty = -11.0;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartCustomerScene_processResize = function FEaiChartCustomerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(750);
   }
}
MO.FEaiChartCustomerTable = function FEaiChartCustomerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage = null;
   o._rankTitleImage = null;
   o._rankLineImage = null;
   o._rankLinePadding = null;
   o._rank1Image = null;
   o._rank2Image = null;
   o._rank3Image = null;
   o._backgroundImage = null;
   o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiChartCustomerTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartCustomerTable_onPaintBegin;
   o.construct = MO.FEaiChartCustomerTable_construct;
   o.setup = MO.FEaiChartCustomerTable_setup;
   o.setRankUnits = MO.FEaiChartCustomerTable_setRankUnits;
   o.pushUnit = MO.FEaiChartCustomerTable_pushUnit;
   o.drawRow = MO.FEaiChartCustomerTable_drawRow;
   o.dispose = MO.FEaiChartCustomerTable_dispose;
   return o;
}
MO.FEaiChartCustomerTable_onImageLoad = function FEaiChartCustomerTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartCustomerTable_onPaintBegin = function FEaiChartCustomerTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 198, 40);
   var rankUnits = o._rank;
   if (rankUnits) {
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for (var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}
MO.FEaiChartCustomerTable_construct = function FEaiChartCustomerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartCustomerTable_setup = function FEaiChartCustomerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(50, 170);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('image');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('card');
   column.setLabel('');
   column.setDataName('card');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label_phone');
   column.setLabel('');
   column.setDataName('label_phone');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 332);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(30);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCity');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_info');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartCustomerTable_setRankUnits = function FEaiChartCustomerTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
      row.set('card', unit.card());
      row.set('label_phone', unit.label() + " - " + unit.phone());
      row.set('investment', unit.investment());
      grid.pushRow(row);
   }
}
MO.FEaiChartCustomerTable_pushUnit = function FEaiChartCustomerTable_pushUnit(unit) {
   var o = this;
   if (!unit) {
      return null;
   }
   var card = unit.card();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if (city) {
      cityLabel = city.label();
   }
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.label() + ' - ' + unit.phone());
   row.set('customer_amount', unit.investment());
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if (entities.count() > o._tableCount) {
      entities.pop();
   }
}
MO.FEaiChartCustomerTable_dispose = function FEaiChartCustomerTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartCustomerTimeline = function FEaiChartCustomerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready = false;
   o._investmentTotal = 0;
   o._intervalMiniute = 10;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate = MO.FEaiChartCustomerTimeline_oeUpdate;
   o.construct = MO.FEaiChartCustomerTimeline_construct;
   o.sync = MO.FEaiChartCustomerTimeline_sync;
   o.drawTrend = MO.FEaiChartCustomerTimeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartCustomerTimeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartCustomerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartCustomerTimeline_construct = function FEaiChartCustomerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartCustomerTrendInfo);
}
MO.FEaiChartCustomerTimeline_sync = function FEaiChartCustomerTimeline_sync() {
   var o = this;
   if (!o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (!systemLogic.testReady()) {
      return;
   }
   var currentDate = systemLogic.currentDate();
   currentDate.truncMinute(o._intervalMiniute);
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   var endTime = o._endTime;
   endTime.assign(currentDate);
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.marketer().doCustomerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartCustomerTimeline_on24HDataFetch = function FEaiChartCustomerTimeline_on24HDataFetch(event) {
   var o = this;
   o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
   o.dirty();
}
MO.FEaiChartCustomerTimeline_oeUpdate = function FEaiChartCustomerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
      o.sync();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartCustomerTimeline_drawTrend = function FEaiChartCustomerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for (var i = 1; i < count; i++) {
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   handle.fillStyle = opGradient;
   handle.lineTo(x, dataBottom);
   handle.lineTo(dataLeft, dataBottom);
   handle.lineTo(dataLeft, lastY);
   handle.fill();
}
MO.FEaiChartCustomerTimeline_onPaintBegin = function FEaiChartCustomerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 1);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:00');
      startTime.addHour(1);
      drawText = !drawText;
      if (drawText) {
         graphic.setFont('bold 20px Microsoft YaHei');
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
   if (!units) {
      return;
   }
   if (units.isEmpty()) {
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.investment();
      } else {
         if (hourInves > maxHourInves) {
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 30;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var investmentMaxWidth = graphic.textWidth(investmentMaxText);
   var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
   var investmentAvgWidth = graphic.textWidth(investmentAvgText);
   var maxWidth = investmentTotalWidth;
   graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
   graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
   graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartCustomerTrendInfo = function FEaiChartCustomerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartCustomerTrendUnit)]);
   return o;
}
MO.FEaiChartCustomerTrendUnit = function FEaiChartCustomerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._customerCount = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   return o;
}
MO.FEaiChartMktCustomerDynamicInfo = function FEaiChartMktCustomerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   o._rankUnits       = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiChartMktCustomerDynamicRankUnit)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktCustomerDynamicUnit)]);
   return o;
}
MO.FEaiChartMktCustomerDynamicRankUnit = function FEaiChartMktCustomerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartMktCustomerDynamicUnit = function FEaiChartMktCustomerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._modelLabel = MO.Class.register(o, [new MO.AGetter('_modelLabel'), new MO.APersistence('_modelLabel', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._gain       = MO.Class.register(o, [new MO.AGetter('_gain'), new MO.APersistence('_gain', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartMktCustomerProcessor = function FEaiChartMktCustomerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartMktCustomerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartMktCustomerProcessor_construct;
   o.allocUnit                = MO.FEaiChartMktCustomerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMktCustomerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMktCustomerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartMktCustomerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMktCustomerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMktCustomerProcessor_process;
   o.dispose                  = MO.FEaiChartMktCustomerProcessor_dispose;
   return o;
}
MO.FEaiChartMktCustomerProcessor_onDynamicData = function FEaiChartMktCustomerProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartMktCustomerProcessor_construct = function FEaiChartMktCustomerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktCustomerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartMktCustomerProcessor_allocUnit = function FEaiChartMktCustomerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartMktCustomerProcessor_setup = function FEaiChartMktCustomerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartMktCustomerProcessor_calculateCurrent = function FEaiChartMktCustomerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      investmentCurrent -= unit.investment();
      investmentTotalCurrent -= unit.investment();
   }
   o._invementTotalCurrent = investmentTotalCurrent;
   o._invementDayCurrent = investmentCurrent;
}
MO.FEaiChartMktCustomerProcessor_focusEntity = function FEaiChartMktCustomerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartMktCustomerProcessor_process = function FEaiChartMktCustomerProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartMktCustomerProcessor_dispose = function FEaiChartMktCustomerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMktCustomerScene = function FEaiChartMktCustomerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartCustomer;
   o._processor = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent = 0;
   o._ready = false;
   o._mapReady = false;
   o._playing = false;
   o._lastTick = 0;
   o._interval = 10;
   o._24HLastTick = 0;
   o._24HTrendInterval = 1000 * 60 * 5;
   o._logoBar = null;
   o._timeline = null;
   o._liveTable = null;
   o._statusStart = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o.onInvestmentDataChanged = MO.FEaiChartMktCustomerScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartMktCustomerScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartMktCustomerScene_onProcessReady;
   o.onProcess = MO.FEaiChartMktCustomerScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartMktCustomerScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartMktCustomerScene_onSwitchComplete;
   o.setup = MO.FEaiChartMktCustomerScene_setup;
   o.showParticle = MO.FEaiChartMktCustomerScene_showParticle;
   o.showFace = MO.FEaiChartMktCustomerScene_showFace;
   o.fixMatrix = MO.FEaiChartMktCustomerScene_fixMatrix;
   o.processResize = MO.FEaiChartMktCustomerScene_processResize;
   return o;
}
MO.FEaiChartMktCustomerScene_onInvestmentDataChanged = function FEaiChartMktCustomerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartMktCustomerScene_onOperationVisibility = function FEaiChartMktCustomerScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartMktCustomerScene_onProcessReady = function FEaiChartMktCustomerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartMktCustomerScene_onProcess = function FEaiChartMktCustomerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartMktCustomerScene_onSwitchProcess = function FEaiChartMktCustomerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartMktCustomerScene_onSwitchComplete = function FEaiChartMktCustomerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartMktCustomerScene_setup = function FEaiChartMktCustomerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktCustomerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktCustomerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktCustomerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartMktCustomerScene_showParticle = function FEaiChartMktCustomerScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartMktCustomerScene_showFace = function FEaiChartMktCustomerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartMktCustomerScene_fixMatrix = function FEaiChartMktCustomerScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.9;
      matrix.ty = -10.9;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartMktCustomerScene_processResize = function FEaiChartMktCustomerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(280);
   }
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(760);
   }
}
MO.FEaiChartMktCustomerTable = function FEaiChartMktCustomerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage = null;
   o._rankTitleImage = null;
   o._rankLineImage = null;
   o._rankLinePadding = null;
   o._rank1Image = null;
   o._rank2Image = null;
   o._rank3Image = null;
   o._backgroundImage = null;
   o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiChartMktCustomerTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartMktCustomerTable_onPaintBegin;
   o.construct = MO.FEaiChartMktCustomerTable_construct;
   o.setup = MO.FEaiChartMktCustomerTable_setup;
   o.setRankUnits = MO.FEaiChartMktCustomerTable_setRankUnits;
   o.pushUnit = MO.FEaiChartMktCustomerTable_pushUnit;
   o.drawRow = MO.FEaiChartMktCustomerTable_drawRow;
   o.dispose = MO.FEaiChartMktCustomerTable_dispose;
   return o;
}
MO.FEaiChartMktCustomerTable_onImageLoad = function FEaiChartMktCustomerTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartMktCustomerTable_onPaintBegin = function FEaiChartMktCustomerTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 198, 40);
   var rankUnits = o._rank;
   if (rankUnits) {
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for (var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}
MO.FEaiChartMktCustomerTable_construct = function FEaiChartMktCustomerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartMktCustomerTable_setup = function FEaiChartMktCustomerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(50, 170);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('image');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('card');
   column.setLabel('');
   column.setDataName('card');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label_phone');
   column.setLabel('');
   column.setDataName('label_phone');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 332);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(30);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 21;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCity');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_info');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('modelLabel');
   column.setLabel('投资产品');
   column.setDataName('model_label');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentAmount');
   column.setLabel('投资额(元)');
   column.setDataName('investment_amount');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentGain');
   column.setLabel('到期盈利(元)');
   column.setDataName('investment_gain');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartMktCustomerTable_setRankUnits = function FEaiChartMktCustomerTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
      row.set('card', unit.card());
      row.set('label_phone', unit.label() + " - " + unit.phone());
      row.set('investment', unit.investment());
      grid.pushRow(row);
   }
}
MO.FEaiChartMktCustomerTable_pushUnit = function FEaiChartMktCustomerTable_pushUnit(unit) {
   var o = this;
   if (!unit) {
      return null;
   }
   var card = unit.card();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if (city) {
      cityLabel = city.label();
   }
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.label() + ' - ' + unit.phone());
   row.set('model_label', unit.modelLabel());
   row.set('investment_amount', unit.investment());
   row.set('investment_gain', unit.gain());
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if (entities.count() > o._tableCount) {
      entities.pop();
   }
}
MO.FEaiChartMktCustomerTable_dispose = function FEaiChartMktCustomerTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartMktCustomerTimeline = function FEaiChartMktCustomerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready = false;
   o._investmentTotal = 0;
   o._intervalMiniute = 10;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate = MO.FEaiChartMktCustomerTimeline_oeUpdate;
   o.construct = MO.FEaiChartMktCustomerTimeline_construct;
   o.sync = MO.FEaiChartMktCustomerTimeline_sync;
   o.drawTrend = MO.FEaiChartMktCustomerTimeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartMktCustomerTimeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartMktCustomerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartMktCustomerTimeline_construct = function FEaiChartMktCustomerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMktCustomerTrendInfo);
}
MO.FEaiChartMktCustomerTimeline_sync = function FEaiChartMktCustomerTimeline_sync() {
   var o = this;
   if (!o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (!systemLogic.testReady()) {
      return;
   }
   var currentDate = systemLogic.currentDate();
   currentDate.truncMinute(o._intervalMiniute);
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   var endTime = o._endTime;
   endTime.assign(currentDate);
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.marketer().doCustomerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartMktCustomerTimeline_on24HDataFetch = function FEaiChartMktCustomerTimeline_on24HDataFetch(event) {
   var o = this;
   o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
   o.dirty();
}
MO.FEaiChartMktCustomerTimeline_oeUpdate = function FEaiChartMktCustomerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
      o.sync();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartMktCustomerTimeline_drawTrend = function FEaiChartMktCustomerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for (var i = 1; i < count; i++) {
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   handle.fillStyle = opGradient;
   handle.lineTo(x, dataBottom);
   handle.lineTo(dataLeft, dataBottom);
   handle.lineTo(dataLeft, lastY);
   handle.fill();
}
MO.FEaiChartMktCustomerTimeline_onPaintBegin = function FEaiChartMktCustomerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 1);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:00');
      startTime.addHour(1);
      drawText = !drawText;
      if (drawText) {
         graphic.setFont('bold 20px Microsoft YaHei');
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
   if (!units) {
      return;
   }
   if (units.isEmpty()) {
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.investment();
      } else {
         if (hourInves > maxHourInves) {
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 30;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var investmentMaxWidth = graphic.textWidth(investmentMaxText);
   var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
   var investmentAvgWidth = graphic.textWidth(investmentAvgText);
   var maxWidth = investmentTotalWidth;
   graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
   graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
   graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartMktCustomerTrendInfo = function FEaiChartMktCustomerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktCustomerTrendUnit)]);
   return o;
}
MO.FEaiChartMktCustomerTrendUnit = function FEaiChartMktCustomerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._customerCount = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   return o;
}
MO.FEaiChartMktMarketerDynamicInfo = function FEaiChartMktMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionCount    = MO.Class.register(o, [new MO.AGetter('_redemptionCount'), new MO.APersistence('_redemptionCount', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentCount = MO.Class.register(o, [new MO.AGetter('_netinvestmentCount'), new MO.APersistence('_netinvestmentCount', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestCount      = MO.Class.register(o, [new MO.AGetter('_interestCount'), new MO.APersistence('_interestCount', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceCount   = MO.Class.register(o, [new MO.AGetter('_performanceCount'), new MO.APersistence('_performanceCount', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   o._rankDayUnits       = MO.Class.register(o, [new MO.AGetter('_rankDayUnits'), new MO.APersistence('_rankDayUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._rankWeekUnits      = MO.Class.register(o, [new MO.AGetter('_rankWeekUnits'), new MO.APersistence('_rankWeekUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._rankMonthUnits     = MO.Class.register(o, [new MO.AGetter('_rankMonthUnits'), new MO.APersistence('_rankMonthUnits', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicRankUnit)]);
   o._units              = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktMarketerDynamicUnit)]);
   return o;
}
MO.FEaiChartMktMarketerDynamicRankUnit = function FEaiChartMktMarketerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._departmentLabel    = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel      = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   return o;
}
MO.FEaiChartMktMarketerDynamicUnit = function FEaiChartMktMarketerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate             = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._departmentLabel        = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel          = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._customerLabel          = MO.Class.register(o, [new MO.AGetter('_customerLabel'), new MO.APersistence('_customerLabel', MO.EDataType.String)]);
   o._customerCard           = MO.Class.register(o, [new MO.AGetter('_customerCard'), new MO.APersistence('_customerCard', MO.EDataType.String)]);
   o._customerPhone          = MO.Class.register(o, [new MO.AGetter('_customerPhone'), new MO.APersistence('_customerPhone', MO.EDataType.String)]);
   o._customerActionCd       = MO.Class.register(o, [new MO.AGetter('_customerActionCd'), new MO.APersistence('_customerActionCd', MO.EDataType.Uint8)]);
   o._customerActionAmount   = MO.Class.register(o, [new MO.AGetter('_customerActionAmount'), new MO.APersistence('_customerActionAmount', MO.EDataType.Double)]);
   o._customerActionInterest = MO.Class.register(o, [new MO.AGetter('_customerActionInterest'), new MO.APersistence('_customerActionInterest', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartMktMarketerProcessor = function FEaiChartMktMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._investmentTotal         = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._redemptionTotal         = MO.Class.register(o, new MO.AGetter('_redemptionTotal'));
   o._netinvestmentTotal       = MO.Class.register(o, new MO.AGetter('_netinvestmentTotal'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartMktMarketerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartMktMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartMktMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMktMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMktMarketerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartMktMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMktMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMktMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartMktMarketerProcessor_dispose;
   return o;
}
MO.FEaiChartMktMarketerProcessor_onDynamicData = function FEaiChartMktMarketerProcessor_onDynamicData(event){
   var o = this;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankDayUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.rankDayUnits = dynamicInfo._rankDayUnits;
   changeEvent.rankWeekUnits = dynamicInfo._rankWeekUnits;
   changeEvent.rankMonthUnits = dynamicInfo._rankMonthUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartMktMarketerProcessor_construct = function FEaiChartMktMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartMktMarketerProcessor_allocUnit = function FEaiChartMktMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktMarketerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartMktMarketerProcessor_setup = function FEaiChartMktMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartMktMarketerProcessor_calculateCurrent = function FEaiChartMktMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var redemptionCurrent = info.redemptionCount();
   var interestCount = info.interestCount();
   var performanceCurrent = info.performanceCount();
   var investmentTotal = info.investmentTotal();
   var redemptionTotal = info.redemptionTotal();
   var netinvestmentTotal = info.netinvestmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var actionCd = unit.customerActionCd();
      var amount = unit.customerActionAmount();
      var interest = unit.customerActionInterest();
      if(actionCd == 1){
         investmentCurrent -= amount;
         performanceCurrent -= amount;
         investmentTotal -= amount;
      }else if(actionCd == 2){
         redemptionCurrent -= amount;
         interestCount -= interest;
         redemptionTotal -= amount;
      }
   }
   o._investmentTotal = investmentTotal;
   o._redemptionTotal = redemptionTotal;
   o._netinvestmentTotal = investmentTotal - redemptionTotal;
   o._invementDayCurrent = investmentCurrent;
   o._redemptionDayCurrent = redemptionCurrent;
   o._netinvestmentDayCurrent = investmentCurrent - redemptionCurrent;
   o._interestDayCurrent = interestCount;
   o._performanceDayCurrent = performanceCurrent;
}
MO.FEaiChartMktMarketerProcessor_focusEntity = function FEaiChartMktMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var actionCd = unit.customerActionCd();
   if(actionCd == 1){
      var card = unit.customerCard();
      var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
      if(cityEntity){
         var amount = unit.customerActionAmount();
         var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(amount);
         var provinceCode = cityEntity.data().provinceCode();
         var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
         if(provinceEntity){
            provinceEntity.doInvestment(level, amount);
         }
         cityEntity.addInvestmentTotal(level, amount);
         o._mapEntity.upload();
         var autio = o._autios[level];
         if(autio){
            autio.play(0);
         }
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartMktMarketerProcessor_process = function FEaiChartMktMarketerProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doMarketerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartMktMarketerProcessor_dispose = function FEaiChartMktMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMktMarketerScene = function FEaiChartMktMarketerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartMarketerMarketer;
   o._processor = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent = 0;
   o._ready = false;
   o._mapReady = false;
   o._playing = false;
   o._lastTick = 0;
   o._interval = 10;
   o._24HLastTick = 0;
   o._24HTrendInterval = 1000 * 60 * 5;
   o._logoBar = null;
   o._timeline = null;
   o._liveTable = null;
   o._statusStart = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o.onInvestmentDataChanged = MO.FEaiChartMktMarketerScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartMktMarketerScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartMktMarketerScene_onProcessReady;
   o.onProcess = MO.FEaiChartMktMarketerScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartMktMarketerScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartMktMarketerScene_onSwitchComplete;
   o.setup = MO.FEaiChartMktMarketerScene_setup;
   o.showParticle = MO.FEaiChartMktMarketerScene_showParticle;
   o.showFace = MO.FEaiChartMktMarketerScene_showFace;
   o.fixMatrix = MO.FEaiChartMktMarketerScene_fixMatrix;
   o.processResize = MO.FEaiChartMktMarketerScene_processResize;
   return o;
}
MO.FEaiChartMktMarketerScene_onInvestmentDataChanged = function FEaiChartMktMarketerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankDayUnits(event.rankDayUnits);
   table.setRankWeekUnits(event.rankWeekUnits);
   table.setRankMonthUnits(event.rankMonthUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartMktMarketerScene_onOperationVisibility = function FEaiChartMktMarketerScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartMktMarketerScene_onProcessReady = function FEaiChartMktMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartMktMarketerScene_onProcess = function FEaiChartMktMarketerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         return;
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         investmentTotalCount.setValue(parseInt(processor.investmentTotal()).toString());
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartMktMarketerScene_onSwitchProcess = function FEaiChartMktMarketerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartMktMarketerScene_onSwitchComplete = function FEaiChartMktMarketerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartMktMarketerScene_setup = function FEaiChartMktMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.marketer-marketer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktMarketerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartMktMarketerScene_showParticle = function FEaiChartMktMarketerScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartMktMarketerScene_showFace = function FEaiChartMktMarketerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartMktMarketerScene_fixMatrix = function FEaiChartMktMarketerScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.8;
      matrix.ty = -11.0;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartMktMarketerScene_processResize = function FEaiChartMktMarketerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(750);
   }
}
MO.FEaiChartMktMarketerTable = function FEaiChartMktMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineMonthImage   = null;
   o._rankLineWeeksImage   = null;
   o._rankLineDayImage     = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._dayImage             = null;
   o._weeksImage           = null;
   o._monthImage           = null;
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiChartMktMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMktMarketerTable_onPaintBegin;
   o.construct             = MO.FEaiChartMktMarketerTable_construct;
   o.setup                 = MO.FEaiChartMktMarketerTable_setup;
   o.pushUnit              = MO.FEaiChartMktMarketerTable_pushUnit;
   o.setRankDayUnits       = MO.FEaiChartMktMarketerTable_setRankDayUnits;
   o.setRankWeekUnits      = MO.FEaiChartMktMarketerTable_setRankWeekUnits;
   o.setRankMonthUnits     = MO.FEaiChartMktMarketerTable_setRankMonthUnits;
   o.drawRow               = MO.FEaiChartMktMarketerTable_drawRow;
   o.dispose               = MO.FEaiChartMktMarketerTable_dispose;
   return o;
}
MO.FEaiChartMktMarketerTable_onImageLoad = function FEaiChartMktMarketerTable_onImageLoad(){
   this.dirty();
}
MO.FEaiChartMktMarketerTable_onPaintBegin = function FEaiChartMktMarketerTable_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '理财师业绩展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   var timeX = left + 6;
   graphic.drawGridImage(o._rankLineMonthImage, timeX, tableTop + o._rankTitleStart, width - 22, o._rankWeeksHeight, o._rankLinePadding);
   graphic.drawGridImage(o._rankLineWeeksImage, timeX, tableTop + o._rankTitleStart + 174, width - 22, 139, o._rankLinePadding);
   graphic.drawGridImage(o._rankLineDayImage, timeX, tableTop + o._rankTitleStart + 175 + 139, width - 22, 137, o._rankLinePadding);
   graphic.drawImage(o._dayImage, timeX, tableTop + 44, 56, 130);
   graphic.drawImage(o._weeksImage, timeX, tableTop + 177, 56, 137);
   graphic.drawImage(o._monthImage, timeX, tableTop + 317, 56, 130);
   var rankUnits = o._rank;
   if(rankUnits){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}
MO.FEaiChartMktMarketerTable_construct = function FEaiChartMktMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartMktMarketerTable_setup = function FEaiChartMktMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/marketer/right.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/marketer/title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineMonthImage = imageConsole.load('{eai.resource}/marketer/rank2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineWeeksImage = imageConsole.load('{eai.resource}/marketer/rank3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineDayImage = imageConsole.load('{eai.resource}/marketer/rank4.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._dayImage = imageConsole.load('{eai.resource}/marketer/day.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._weeksImage = imageConsole.load('{eai.resource}/marketer/weeks.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._monthImage = imageConsole.load('{eai.resource}/marketer/month.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridMonthRank = MO.Class.create(MO.FGuiGridControl);
   grid.setLocation(50, 112);
   grid.setSize(800, 900);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.headPadding().set(0,0,0,10);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('month_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('month_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('month_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('monthInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('month_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthCustomerCount');
   column.setLabel('客户数');
   column.setDataName('month_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 0, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridWeeksRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 290)
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('weeksRank');
   column.setLabel();
   column.setDataName('weeks_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('weeks_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('weeks_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('weeksInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('weeks_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksCustomerCount');
   column.setLabel('客户数');
   column.setDataName('weeks_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridDayRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 430)
   grid.setSize(800, 130);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentTotal');
   column.setLabel('投资');
   column.setDataName('investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('客户数');
   column.setDataName('customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setLocation(50,570);
   grid.setSize(800, 430);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(30);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCard');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_info');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 174;
      o._rankWeeksHeight = 174;
      o._rankMonthHeight = 139;
      o._rankDayHeight = 137;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartMktMarketerTable_setRankDayUnits = function FEaiChartMktMarketerTable_setRankDayUnits(units){
   var o = this;
   var grid = o._gridDayRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('department_label', departmentLabel);
      row.set('marketer_label', unit.marketerLabel());
      row.set('investment_total', unit.investmentTotal());
      row.set('customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartMktMarketerTable_setRankWeekUnits = function FEaiChartMktMarketerTable_setRankWeekUnits(units){
   var o = this;
   var grid = o._gridWeeksRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("weeks_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('weeks_department_label', departmentLabel);
      row.set('weeks_marketer_label', unit.marketerLabel());
      row.set('weeks_investment_total', unit.investmentTotal());
      row.set('weeks_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartMktMarketerTable_setRankMonthUnits = function FEaiChartMktMarketerTable_setRankMonthUnits(units){
   var o = this;
   var grid = o._gridMonthRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("month_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('month_department_label', departmentLabel);
      row.set('month_marketer_label', unit.marketerLabel());
      row.set('month_investment_total', unit.investmentTotal());
      row.set('month_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartMktMarketerTable_pushUnit = function FEaiChartMktMarketerTable_pushUnit(unit){
   var o = this;
   if(!unit){
      return null;
   }
   var departmentLabel = unit.departmentLabel();
   var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
   if(department){
      departmentLabel = department.label();
   }
   var card = unit.customerCard();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if(city){
      cityLabel = city.label();
   }
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('department_label', departmentLabel);
   row.set('marketer_label', unit.marketerLabel());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.customerLabel() + ' - ' + unit.customerPhone());
   row.set('customer_amount', unit.customerActionAmount());
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}
MO.FEaiChartMktMarketerTable_dispose = function FEaiChartMktMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartMktMarketerTimeline = function FEaiChartMktMarketerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready            = false;
   o._investmentTotal  = 0;
   o._intervalMiniute  = 10;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate          = MO.FEaiChartMktMarketerTimeline_oeUpdate;
   o.construct         = MO.FEaiChartMktMarketerTimeline_construct;
   o.sync              = MO.FEaiChartMktMarketerTimeline_sync;
   o.drawTrend         = MO.FEaiChartMktMarketerTimeline_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMktMarketerTimeline_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMktMarketerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartMktMarketerTimeline_construct = function FEaiChartMktMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMktMarketerTrendInfo);
}
MO.FEaiChartMktMarketerTimeline_sync = function FEaiChartMktMarketerTimeline_sync() {
   var o = this;
   if (!o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!systemLogic.testReady()){
      return;
   }
   var currentDate = systemLogic.currentDate();
   currentDate.truncMinute(o._intervalMiniute);
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   var endTime = o._endTime;
   endTime.assign(currentDate);
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.marketer().doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartMktMarketerTimeline_on24HDataFetch = function FEaiChartMktMarketerTimeline_on24HDataFetch(event) {
   var o = this;
   o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
   o.dirty();
}
MO.FEaiChartMktMarketerTimeline_oeUpdate = function FEaiChartMktMarketerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
      o.sync();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartMktMarketerTimeline_drawTrend = function FEaiChartMktMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor){
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for(var i = 1; i < count; i++){
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
}
MO.FEaiChartMktMarketerTimeline_onPaintBegin = function FEaiChartMktMarketerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:00');
      startTime.addHour(1);
      drawText = !drawText;
      if (drawText) {
         graphic.setFont('bold 20px Microsoft YaHei');
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
   if(!units){
      return;
   }
   if(units.isEmpty()){
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
      var redemption = unit.redemption();
      if (redemption > maxAmount) {
         maxAmount = redemption;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.redemption();
      }else{
         if(hourInves > maxHourInves){
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 30;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var investmentMaxWidth = graphic.textWidth(investmentMaxText);
   var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
   var investmentAvgWidth = graphic.textWidth(investmentAvgText);
   var maxWidth =Math.max(investmentTotalWidth);
   graphic.drawText('投资总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
   graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
   graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartMktMarketerTrendInfo = function FEaiChartMktMarketerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktMarketerTrendUnit)]);
   return o;
}
MO.FEaiChartMktMarketerTrendUnit = function FEaiChartMktMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._interest      = MO.Class.register(o, [new MO.AGetter('_interest'), new MO.APersistence('_interest', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartDptMarketerDynamicInfo = function FEaiChartDptMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionCount    = MO.Class.register(o, [new MO.AGetter('_redemptionCount'), new MO.APersistence('_redemptionCount', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentCount = MO.Class.register(o, [new MO.AGetter('_netinvestmentCount'), new MO.APersistence('_netinvestmentCount', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestCount      = MO.Class.register(o, [new MO.AGetter('_interestCount'), new MO.APersistence('_interestCount', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceCount   = MO.Class.register(o, [new MO.AGetter('_performanceCount'), new MO.APersistence('_performanceCount', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   o._rankDayUnits       = MO.Class.register(o, [new MO.AGetter('_rankDayUnits'), new MO.APersistence('_rankDayUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._rankWeekUnits      = MO.Class.register(o, [new MO.AGetter('_rankWeekUnits'), new MO.APersistence('_rankWeekUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._rankMonthUnits     = MO.Class.register(o, [new MO.AGetter('_rankMonthUnits'), new MO.APersistence('_rankMonthUnits', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicRankUnit)]);
   o._units              = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartDptMarketerDynamicUnit)]);
   return o;
}
MO.FEaiChartDptMarketerDynamicRankUnit = function FEaiChartDptMarketerDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._departmentLabel    = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel      = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._customerCount      = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal      = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   return o;
}
MO.FEaiChartDptMarketerDynamicUnit = function FEaiChartDptMarketerDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate             = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._departmentLabel        = MO.Class.register(o, [new MO.AGetter('_departmentLabel'), new MO.APersistence('_departmentLabel', MO.EDataType.String)]);
   o._marketerLabel          = MO.Class.register(o, [new MO.AGetter('_marketerLabel'), new MO.APersistence('_marketerLabel', MO.EDataType.String)]);
   o._customerLabel          = MO.Class.register(o, [new MO.AGetter('_customerLabel'), new MO.APersistence('_customerLabel', MO.EDataType.String)]);
   o._customerCard           = MO.Class.register(o, [new MO.AGetter('_customerCard'), new MO.APersistence('_customerCard', MO.EDataType.String)]);
   o._customerPhone          = MO.Class.register(o, [new MO.AGetter('_customerPhone'), new MO.APersistence('_customerPhone', MO.EDataType.String)]);
   o._customerActionCd       = MO.Class.register(o, [new MO.AGetter('_customerActionCd'), new MO.APersistence('_customerActionCd', MO.EDataType.Uint8)]);
   o._customerActionAmount   = MO.Class.register(o, [new MO.AGetter('_customerActionAmount'), new MO.APersistence('_customerActionAmount', MO.EDataType.Double)]);
   o._customerActionInterest = MO.Class.register(o, [new MO.AGetter('_customerActionInterest'), new MO.APersistence('_customerActionInterest', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartDptMarketerProcessor = function FEaiChartDptMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._investmentTotal         = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._redemptionTotal         = MO.Class.register(o, new MO.AGetter('_redemptionTotal'));
   o._netinvestmentTotal       = MO.Class.register(o, new MO.AGetter('_netinvestmentTotal'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartDptMarketerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartDptMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartDptMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartDptMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartDptMarketerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartDptMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartDptMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartDptMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartDptMarketerProcessor_dispose;
   return o;
}
MO.FEaiChartDptMarketerProcessor_onDynamicData = function FEaiChartDptMarketerProcessor_onDynamicData(event){
   var o = this;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankDayUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.rankDayUnits = dynamicInfo._rankDayUnits;
   changeEvent.rankWeekUnits = dynamicInfo._rankWeekUnits;
   changeEvent.rankMonthUnits = dynamicInfo._rankMonthUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartDptMarketerProcessor_construct = function FEaiChartDptMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartDptMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartDptMarketerProcessor_allocUnit = function FEaiChartDptMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartDptMarketerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartDptMarketerProcessor_setup = function FEaiChartDptMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartDptMarketerProcessor_calculateCurrent = function FEaiChartDptMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var redemptionCurrent = info.redemptionCount();
   var interestCount = info.interestCount();
   var performanceCurrent = info.performanceCount();
   var investmentTotal = info.investmentTotal();
   var redemptionTotal = info.redemptionTotal();
   var netinvestmentTotal = info.netinvestmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var actionCd = unit.customerActionCd();
      var amount = unit.customerActionAmount();
      var interest = unit.customerActionInterest();
      if(actionCd == 1){
         investmentCurrent -= amount;
         performanceCurrent -= amount;
         investmentTotal -= amount;
      }else if(actionCd == 2){
         redemptionCurrent -= amount;
         interestCount -= interest;
         redemptionTotal -= amount;
      }
   }
   o._investmentTotal = investmentTotal;
   o._redemptionTotal = redemptionTotal;
   o._netinvestmentTotal = investmentTotal - redemptionTotal;
   o._invementDayCurrent = investmentCurrent;
   o._redemptionDayCurrent = redemptionCurrent;
   o._netinvestmentDayCurrent = investmentCurrent - redemptionCurrent;
   o._interestDayCurrent = interestCount;
   o._performanceDayCurrent = performanceCurrent;
}
MO.FEaiChartDptMarketerProcessor_focusEntity = function FEaiChartDptMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var actionCd = unit.customerActionCd();
   if(actionCd == 1){
      var card = unit.customerCard();
      var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
      if(cityEntity){
         var amount = unit.customerActionAmount();
         var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(amount);
         var provinceCode = cityEntity.data().provinceCode();
         var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
         if(provinceEntity){
            provinceEntity.doInvestment(level, amount);
         }
         cityEntity.addInvestmentTotal(level, amount);
         o._mapEntity.upload();
         var autio = o._autios[level];
         if(autio){
            autio.play(0);
         }
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartDptMarketerProcessor_process = function FEaiChartDptMarketerProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doMarketerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartDptMarketerProcessor_dispose = function FEaiChartDptMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartDptMarketerScene = function FEaiChartDptMarketerScene(o) {
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartDepartmentMarketer;
   o._processor = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent = 0;
   o._ready = false;
   o._mapReady = false;
   o._playing = false;
   o._lastTick = 0;
   o._interval = 10;
   o._24HLastTick = 0;
   o._24HTrendInterval = 1000 * 60 * 5;
   o._logoBar = null;
   o._timeline = null;
   o._liveTable = null;
   o._statusStart = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o.onInvestmentDataChanged = MO.FEaiChartDptMarketerScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartDptMarketerScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartDptMarketerScene_onProcessReady;
   o.onProcess = MO.FEaiChartDptMarketerScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartDptMarketerScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartDptMarketerScene_onSwitchComplete;
   o.setup = MO.FEaiChartDptMarketerScene_setup;
   o.showParticle = MO.FEaiChartDptMarketerScene_showParticle;
   o.showFace = MO.FEaiChartDptMarketerScene_showFace;
   o.fixMatrix = MO.FEaiChartDptMarketerScene_fixMatrix;
   o.processResize = MO.FEaiChartDptMarketerScene_processResize;
   return o;
}
MO.FEaiChartDptMarketerScene_onInvestmentDataChanged = function FEaiChartDptMarketerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankDayUnits(event.rankDayUnits);
   table.setRankWeekUnits(event.rankWeekUnits);
   table.setRankMonthUnits(event.rankMonthUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartDptMarketerScene_onOperationVisibility = function FEaiChartDptMarketerScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartDptMarketerScene_onProcessReady = function FEaiChartDptMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartDptMarketerScene_onProcess = function FEaiChartDptMarketerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         return;
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         investmentTotalCount.setValue(parseInt(processor.investmentTotal()).toString());
         var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
         redemptionTotalCount.setValue(parseInt(processor.redemptionTotal()).toString());
         var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
         netinvestmentTotalCount.setValue(parseInt(processor.netinvestmentTotal()).toString());
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementDayCurrent()).toString());
         var redemptionTotal = logoBar.findComponent('redemptionTotal');
         redemptionTotal.setValue(parseInt(processor.redemptionDayCurrent()).toString());
         var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
         netinvestmentTotal.setValue(parseInt(processor.netinvestmentDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartDptMarketerScene_onSwitchProcess = function FEaiChartDptMarketerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartDptMarketerScene_onSwitchComplete = function FEaiChartDptMarketerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartDptMarketerScene_setup = function FEaiChartDptMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.marketer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartDptMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartDptMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartDptMarketerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartDptMarketerScene_showParticle = function FEaiChartDptMarketerScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartDptMarketerScene_showFace = function FEaiChartDptMarketerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartDptMarketerScene_fixMatrix = function FEaiChartDptMarketerScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.8;
      matrix.ty = -11.0;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartDptMarketerScene_processResize = function FEaiChartDptMarketerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(750);
   }
}
MO.FEaiChartDptMarketerTable = function FEaiChartDptMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._dayImage             = null;
   o._weeksImage           = null;
   o._monthImage           = null;
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiChartDptMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartDptMarketerTable_onPaintBegin;
   o.construct             = MO.FEaiChartDptMarketerTable_construct;
   o.setup                 = MO.FEaiChartDptMarketerTable_setup;
   o.pushUnit              = MO.FEaiChartDptMarketerTable_pushUnit;
   o.setRankDayUnits       = MO.FEaiChartDptMarketerTable_setRankDayUnits;
   o.setRankWeekUnits      = MO.FEaiChartDptMarketerTable_setRankWeekUnits;
   o.setRankMonthUnits     = MO.FEaiChartDptMarketerTable_setRankMonthUnits;
   o.drawRow               = MO.FEaiChartDptMarketerTable_drawRow;
   o.dispose               = MO.FEaiChartDptMarketerTable_dispose;
   return o;
}
MO.FEaiChartDptMarketerTable_onImageLoad = function FEaiChartDptMarketerTable_onImageLoad(){
   this.dirty();
}
MO.FEaiChartDptMarketerTable_onPaintBegin = function FEaiChartDptMarketerTable_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '理财师业绩展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   var timeX = left + 6;
   graphic.drawGridImage(o._rankLineImage, timeX, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._dayImage, timeX, tableTop + 44, 56, 130);
   graphic.drawImage(o._weeksImage, timeX, tableTop + 177, 56, 137);
   graphic.drawImage(o._monthImage, timeX, tableTop + 317, 56, 130);
   var rankUnits = o._rank;
   if(rankUnits){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}
MO.FEaiChartDptMarketerTable_construct = function FEaiChartDptMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartDptMarketerTable_setup = function FEaiChartDptMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/marketer/right.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/marketer/title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/marketer/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._dayImage = imageConsole.load('{eai.resource}/marketer/day.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._weeksImage = imageConsole.load('{eai.resource}/marketer/weeks.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._monthImage = imageConsole.load('{eai.resource}/marketer/month.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridMonthRank = MO.Class.create(MO.FGuiGridControl);
   grid.setLocation(50, 112);
   grid.setSize(800, 900);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.headPadding().set(0,0,0,10);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('month_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('month_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('month_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('monthInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('month_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('monthRedemptionTotal');
   column.setLabel('赎回');
   column.setDataName('month_redemption_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(118);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('monthNetinvestmentTotal');
   column.setLabel('净投');
   column.setDataName('month_netinvestment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(127);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthCustomerCount');
   column.setLabel('客户数');
   column.setDataName('month_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 0, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridWeeksRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 290)
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('weeksRank');
   column.setLabel();
   column.setDataName('weeks_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('weeks_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('weeks_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('weeksInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('weeks_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('weeksRedemptionTotal');
   column.setLabel('赎回');
   column.setDataName('weeks_redemption_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(118);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('weeksNetinvestmentTotal');
   column.setLabel('净投');
   column.setDataName('weeks_netinvestment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(127);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksCustomerCount');
   column.setLabel('客户数');
   column.setDataName('weeks_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridDayRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 430)
   grid.setSize(800, 130);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentTotal');
   column.setLabel('投资');
   column.setDataName('investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('redemptionTotal');
   column.setLabel('赎回');
   column.setDataName('redemption_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(118);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('netinvestmentTotal');
   column.setLabel('净投');
   column.setDataName('netinvestment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(127);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('客户数');
   column.setDataName('customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setLocation(50,570);
   grid.setSize(800, 430);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(30);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCard');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_info');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 450;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartDptMarketerTable_setRankDayUnits = function FEaiChartDptMarketerTable_setRankDayUnits(units){
   var o = this;
   var grid = o._gridDayRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('department_label', departmentLabel);
      row.set('marketer_label', unit.marketerLabel());
      row.set('investment_total', unit.investmentTotal());
      row.set('redemption_total', unit.redemptionTotal());
      row.set('netinvestment_total', unit.netinvestmentTotal());
      row.set('customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartDptMarketerTable_setRankWeekUnits = function FEaiChartDptMarketerTable_setRankWeekUnits(units){
   var o = this;
   var grid = o._gridWeeksRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("weeks_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('weeks_department_label', departmentLabel);
      row.set('weeks_marketer_label', unit.marketerLabel());
      row.set('weeks_investment_total', unit.investmentTotal());
      row.set('weeks_redemption_total', unit.redemptionTotal());
      row.set('weeks_netinvestment_total', unit.netinvestmentTotal());
      row.set('weeks_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartDptMarketerTable_setRankMonthUnits = function FEaiChartDptMarketerTable_setRankMonthUnits(units){
   var o = this;
   var grid = o._gridMonthRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("month_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('month_department_label', departmentLabel);
      row.set('month_marketer_label', unit.marketerLabel());
      row.set('month_investment_total', unit.investmentTotal());
      row.set('month_redemption_total', unit.redemptionTotal());
      row.set('month_netinvestment_total', unit.netinvestmentTotal());
      row.set('month_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartDptMarketerTable_pushUnit = function FEaiChartDptMarketerTable_pushUnit(unit){
   var o = this;
   if(!unit){
      return null;
   }
   var departmentLabel = unit.departmentLabel();
   var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
   if(department){
      departmentLabel = department.label();
   }
   var card = unit.customerCard();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if(city){
      cityLabel = city.label();
   }
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('department_label', departmentLabel);
   row.set('marketer_label', unit.marketerLabel());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.customerLabel() + ' - ' + unit.customerPhone());
   if(unit.customerActionCd() == 1){
      row.set('customer_amount', unit.customerActionAmount());
   }else{
      row.set('customer_amount', -unit.customerActionAmount());
   }
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}
MO.FEaiChartDptMarketerTable_dispose = function FEaiChartDptMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartDptMarketerTimeline = function FEaiChartDptMarketerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready            = false;
   o._investmentTotal  = 0;
   o._intervalMiniute  = 10;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate          = MO.FEaiChartDptMarketerTimeline_oeUpdate;
   o.construct         = MO.FEaiChartDptMarketerTimeline_construct;
   o.sync              = MO.FEaiChartDptMarketerTimeline_sync;
   o.drawTrend         = MO.FEaiChartDptMarketerTimeline_drawTrend;
   o.onPaintBegin      = MO.FEaiChartDptMarketerTimeline_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartDptMarketerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartDptMarketerTimeline_construct = function FEaiChartDptMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartDptMarketerTrendInfo);
}
MO.FEaiChartDptMarketerTimeline_sync = function FEaiChartDptMarketerTimeline_sync() {
   var o = this;
   if (!o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!systemLogic.testReady()){
      return;
   }
   var currentDate = systemLogic.currentDate();
   currentDate.truncMinute(o._intervalMiniute);
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   var endTime = o._endTime;
   endTime.assign(currentDate);
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.marketer().doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartDptMarketerTimeline_on24HDataFetch = function FEaiChartDptMarketerTimeline_on24HDataFetch(event) {
   var o = this;
   o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
   o.dirty();
}
MO.FEaiChartDptMarketerTimeline_oeUpdate = function FEaiChartDptMarketerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
      o.sync();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartDptMarketerTimeline_drawTrend = function FEaiChartDptMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor){
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for(var i = 1; i < count; i++){
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
}
MO.FEaiChartDptMarketerTimeline_onPaintBegin = function FEaiChartDptMarketerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:00');
      startTime.addHour(1);
      drawText = !drawText;
      if (drawText) {
         graphic.setFont('bold 20px Microsoft YaHei');
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
   if(!units){
      return;
   }
   if(units.isEmpty()){
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
      var redemption = unit.redemption();
      if (redemption > maxAmount) {
         maxAmount = redemption;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   o.drawTrend(graphic, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#0088FF', '#0000FF');
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.redemption();
      }else{
         if(hourInves > maxHourInves){
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 30;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var redemptionTotalText = MO.Lang.Float.unitFormat(trendInfo.redemptionTotal(), 0, 0, 2, 0, 10000, '万');
   var redemptionTotalWidth = graphic.textWidth(redemptionTotalText);
   var netinvestmentTotalText = MO.Lang.Float.unitFormat(trendInfo.netinvestmentTotal(), 0, 0, 2, 0, 10000, '万');
   var netinvestmentTotalWidth = graphic.textWidth(netinvestmentTotalText);
   var interestTotalText = MO.Lang.Float.unitFormat(trendInfo.interestTotal(), 0, 0, 2, 0, 10000, '万');
   var interestTotalWidth = graphic.textWidth(interestTotalText);
   var maxWidth = Math.max(Math.max(Math.max(investmentTotalWidth, redemptionTotalWidth), netinvestmentTotalWidth), interestTotalWidth);
   graphic.drawText('投资总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
   graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
   graphic.drawText('赎回总额：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   graphic.drawText(redemptionTotalText, decoLeft + textWidth + maxWidth - redemptionTotalWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
   graphic.drawText('净投总额：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
   graphic.drawText(netinvestmentTotalText, decoLeft + textWidth + maxWidth - netinvestmentTotalWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
   graphic.drawText('利息总额：', decoLeft, rowStart + rowHeight * 3 + 15, '#00CFFF');
   graphic.drawText(interestTotalText, decoLeft + textWidth + maxWidth - interestTotalWidth, rowStart + rowHeight * 3 + 15, '#00B5F6');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartDptMarketerTrendInfo = function FEaiChartDptMarketerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartDptMarketerTrendUnit)]);
   return o;
}
MO.FEaiChartDptMarketerTrendUnit = function FEaiChartDptMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._interest      = MO.Class.register(o, [new MO.AGetter('_interest'), new MO.APersistence('_interest', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartPerformenceDynamicInfo = function FEaiChartPerformenceDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Int32)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetter('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Int32)]);
   o._rankUnits       = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiChartPerformenceDynamicRankUnit)]);
   o._units           = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartPerformenceDynamicUnit)]);
   return o;
}
MO.FEaiChartPerformenceDynamicRankUnit = function FEaiChartPerformenceDynamicRankUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartPerformenceDynamicUnit = function FEaiChartPerformenceDynamicUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._label      = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._card       = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.String)]);
   o._phone      = MO.Class.register(o, [new MO.AGetter('_phone'), new MO.APersistence('_phone', MO.EDataType.String)]);
   o._investment = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartPerformenceProcessor = function FEaiChartPerformenceProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartPerformenceProcessor_onDynamicData;
   o.construct                = MO.FEaiChartPerformenceProcessor_construct;
   o.allocUnit                = MO.FEaiChartPerformenceProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartPerformenceProcessor_allocShape;
   o.setup                    = MO.FEaiChartPerformenceProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartPerformenceProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartPerformenceProcessor_focusEntity;
   o.process                  = MO.FEaiChartPerformenceProcessor_process;
   o.dispose                  = MO.FEaiChartPerformenceProcessor_dispose;
   return o;
}
MO.FEaiChartPerformenceProcessor_onDynamicData = function FEaiChartPerformenceProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeEncryptedBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartPerformenceProcessor_construct = function FEaiChartPerformenceProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartPerformenceDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartPerformenceProcessor_allocUnit = function FEaiChartPerformenceProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartPerformenceDynamicUnit);
   }
   return unit;
}
MO.FEaiChartPerformenceProcessor_setup = function FEaiChartPerformenceProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartPerformenceProcessor_calculateCurrent = function FEaiChartPerformenceProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      investmentCurrent -= unit.investment();
      investmentTotalCurrent += unit.investment();
   }
   o._invementTotalCurrent = investmentTotalCurrent;
   o._invementDayCurrent = investmentCurrent;
}
MO.FEaiChartPerformenceProcessor_focusEntity = function FEaiChartPerformenceProcessor_focusEntity(unit){
   var o = this;
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartPerformenceProcessor_process = function FEaiChartPerformenceProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.doPerformenceDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartPerformenceProcessor_dispose = function FEaiChartPerformenceProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartPerformenceScene = function FEaiChartPerformenceScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartPerformence;
   o._processor = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent = 0;
   o._ready = false;
   o._mapReady = false;
   o._playing = false;
   o._lastTick = 0;
   o._interval = 10;
   o._24HLastTick = 0;
   o._24HTrendInterval = 1000 * 60 * 5;
   o._logoBar = null;
   o._timeline = null;
   o._liveTable = null;
   o._statusStart = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o._groundAutioUrl = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartPerformenceScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartPerformenceScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartPerformenceScene_onProcessReady;
   o.onProcess = MO.FEaiChartPerformenceScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartPerformenceScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartPerformenceScene_onSwitchComplete;
   o.setup = MO.FEaiChartPerformenceScene_setup;
   o.showParticle = MO.FEaiChartPerformenceScene_showParticle;
   o.showFace = MO.FEaiChartPerformenceScene_showFace;
   o.fixMatrix = MO.FEaiChartPerformenceScene_fixMatrix;
   o.processResize = MO.FEaiChartPerformenceScene_processResize;
   return o;
}
MO.FEaiChartPerformenceScene_onInvestmentDataChanged = function FEaiChartPerformenceScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartPerformenceScene_onOperationVisibility = function FEaiChartPerformenceScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartPerformenceScene_onProcessReady = function FEaiChartPerformenceScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartPerformenceScene_onProcess = function FEaiChartPerformenceScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
   }
   if (o._playing) {
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartPerformenceScene_onSwitchProcess = function FEaiChartPerformenceScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartPerformenceScene_onSwitchComplete = function FEaiChartPerformenceScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartPerformenceScene_setup = function FEaiChartPerformenceScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.performence.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartPerformenceProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartPerformenceTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
}
MO.FEaiChartPerformenceScene_showParticle = function FEaiChartPerformenceScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartPerformenceScene_showFace = function FEaiChartPerformenceScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartPerformenceScene_fixMatrix = function FEaiChartPerformenceScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.8;
      matrix.ty = -11.0;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartPerformenceScene_processResize = function FEaiChartPerformenceScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(750);
   }
}
MO.FEaiChartPerformenceTable = function FEaiChartPerformenceTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage = null;
   o._rankTitleImage = null;
   o._backgroundImage = null;
   o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiChartPerformenceTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartPerformenceTable_onPaintBegin;
   o.construct = MO.FEaiChartPerformenceTable_construct;
   o.setup = MO.FEaiChartPerformenceTable_setup;
   o.setRankUnits = MO.FEaiChartPerformenceTable_setRankUnits;
   o.pushUnit = MO.FEaiChartPerformenceTable_pushUnit;
   o.drawRow = MO.FEaiChartPerformenceTable_drawRow;
   o.dispose = MO.FEaiChartPerformenceTable_dispose;
   return o;
}
MO.FEaiChartPerformenceTable_onImageLoad = function FEaiChartPerformenceTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartPerformenceTable_onPaintBegin = function FEaiChartPerformenceTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
}
MO.FEaiChartPerformenceTable_construct = function FEaiChartPerformenceTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartPerformenceTable_setup = function FEaiChartPerformenceTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/performence/logo.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/performence/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(50, 170);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('image');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('card');
   column.setLabel('');
   column.setDataName('card');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label_phone');
   column.setLabel('');
   column.setDataName('label_phone');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartPerformenceTable_setRankUnits = function FEaiChartPerformenceTable_setRankUnits(units) {
}
MO.FEaiChartPerformenceTable_pushUnit = function FEaiChartPerformenceTable_pushUnit(unit) {
}
MO.FEaiChartPerformenceTable_dispose = function FEaiChartPerformenceTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChapter = function FEaiChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   return o;
}
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code                    = MO.EEaiChapter.Chart;
   o._sceneTotal              = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory            = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneCustomer           = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o._sceneMarketerMarketer   = MO.Class.register(o, new MO.AGetter('_sceneMarketerMarketer'));
   o._sceneDepartmentMarketer = MO.Class.register(o, new MO.AGetter('_sceneDepartmentMarketer'));
   o._scenePerformence        = MO.Class.register(o, new MO.AGetter('_scenePerformence'));
   o._sceneDepartment         = MO.Class.register(o, new MO.AGetter('_sceneDepartment'));
   o._sceneLive               = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   o._sceneWorld              = MO.Class.register(o, new MO.AGetter('_sceneWorld'));
   o._sceneSales              = MO.Class.register(o, new MO.AGetter('_sceneSales'));
   o.construct                = MO.FEaiChartChapter_construct;
   o.createScene              = MO.FEaiChartChapter_createScene;
   o.process                  = MO.FEaiChartChapter_process;
   o.dispose                  = MO.FEaiChartChapter_dispose;
   return o;
}
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiChartChapter_createScene = function FEaiChartChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      case MO.EEaiScene.ChartMarketerCustomer:
         scene = o._sceneMarketerCustomer = MO.Class.create(MO.FEaiChartMktCustomerScene);
         break;
      case MO.EEaiScene.ChartMarketerMarketer:
         scene = o._sceneMarketerMarketer = MO.Class.create(MO.FEaiChartMktMarketerScene);
         break;
      case MO.EEaiScene.ChartDepartmentMarketer:
         scene = o._sceneDepartmentMarketer = MO.Class.create(MO.FEaiChartDptMarketerScene);
         break;
      case MO.EEaiScene.ChartPerformence:
         scene = o._scenePerformence = MO.Class.create(MO.FEaiChartPerformenceScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
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
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Loading;
   return o;
}
MO.FEaiLoginChapter = function FEaiLoginChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
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
   var scene = o._sceneCountry = MO.Class.create(MO.FEaiCountryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroup = MO.Class.create(MO.FEaiGroupScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroupReport = MO.Class.create(MO.FEaiGroupReportScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCompany = MO.Class.create(MO.FEaiCompanyScene);
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
MO.FEaiApplication = function FEaiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   o.setup         = MO.FEaiApplication_setup;
   o.processResize = MO.FEaiApplication_processResize;
   o.processEvent  = MO.FEaiApplication_processEvent;
   return o;
}
MO.FEaiApplication_setup = function FEaiApplication_setup(hPanel){
   var o = this;
   if(!MO.Window.Browser.supportHtml5()){
      var event = new MO.SEvent();
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.eai.world.face', MO.FEaiWorldFaceEffect);
   effectConsole.register('general.color.eai.map.face', MO.FEaiMapFaceEffect);
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
   return true;
}
MO.FEaiApplication_processResize = function FEaiApplication_processResize(event){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}
MO.FEaiApplication_processEvent = function FEaiApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}
MO.FEaiCanvas = function FEaiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._scaleRate       = 1;
   o._optionAlpha     = false;
   o._optionAntialias = false;
   o._activeStage     = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition = null;
   o._captureRotation = null;
   o.construct        = MO.FEaiCanvas_construct;
   o.resize           = MO.FEaiCanvas_resize;
   o.selectStage      = MO.FEaiCanvas_selectStage;
   o.dispose          = MO.FEaiCanvas_dispose;
   return o;
}
MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
}
MO.FEaiCanvas_resize = function FEaiCanvas_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
   var context = o._graphicContext;
   var size = context.size();
   var stage = o._activeStage;
   if(stage){
      var projection = stage.camera().projection();
      projection.size().set(size.width, size.height);
      projection.update();
   }
}
MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, MO.FE3dGeneralTechnique);
   }
   o._activeStage = stage;
}
MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FEaiChartApplication = function FEaiChartApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   o._sceneCode      = MO.Class.register(o, new MO.AGetSet('_sceneCode'), MO.EEaiScene.ChartCustomer);
   o._chapterLoading = MO.Class.register(o, new MO.AGetter('_chapterLoading'));
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o.onLoadResource  = MO.FEaiChartApplication_onLoadResource;
   o.construct       = MO.FEaiChartApplication_construct;
   o.setup           = MO.FEaiChartApplication_setup;
   o.dispose         = MO.FEaiChartApplication_dispose;
   return o;
}
MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
   var o = this;
   var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
   chapter.selectSceneByCode(o._sceneCode);
   o.processResize();
}
MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
   var o = this;
   o.__base.FEaiApplication.construct.call(o);
}
MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FEaiApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   var desktop = o._desktop = MO.Class.create(MO.FEaiChartDesktop);
   desktop.build(hPanel);
   var canvas = MO.Eai.Canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   var control = o._dynamicInfo = MO.Class.create(MO.FEaiDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   var chapter = o._chapterChart = MO.Class.create(MO.FEaiChartChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load('{eai.resource}/resource.dat');
   return true;
}
MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
   var o = this;
   o._chapterLoading = MO.Lang.Object.dispose(o._chapterLoading);
   o._chapterChart = MO.Lang.Object.dispose(o._chapterChart);
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   o.__base.FEaiApplication.dispose.call(o);
}
MO.FEaiChartCanvas = function FEaiChartCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o.construct           = MO.FEaiChartCanvas_construct;
   o.setPanel            = MO.FEaiChartCanvas_setPanel;
   o.dispose             = MO.FEaiChartCanvas_dispose;
   return o;
}
MO.FEaiChartCanvas_construct = function FEaiChartCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FEaiChartCanvas_setPanel = function FEaiChartCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}
MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
   var o = this;
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   o.__base.FEaiCanvas.dispose.call(o);
}
MO.FEaiChartDesktop = function FEaiChartDesktop(o){
   o = MO.Class.inherits(this, o, MO.FEaiDesktop);
   o._orientationCd         = null;
   o._visible               = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FEaiChartDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEaiChartDesktop_onOperationOrientation;
   o.construct              = MO.FEaiChartDesktop_construct;
   o.build                  = MO.FEaiChartDesktop_build;
   o.resize                 = MO.FEaiChartDesktop_resize;
   o.show                   = MO.FEaiChartDesktop_show;
   o.hide                   = MO.FEaiChartDesktop_hide;
   o.setVisible             = MO.FEaiChartDesktop_setVisible;
   o.selectStage            = MO.FEaiChartDesktop_selectStage;
   o.dispose                = MO.FEaiChartDesktop_dispose;
   return o;
}
MO.FEaiChartDesktop_onOperationResize = function FEaiChartDesktop_onOperationResize(event){
   var o = this;
   o.__base.FEaiDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FEaiChartDesktop_onOperationOrientation = function FEaiChartDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FEaiDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FEaiChartDesktop_construct = function FEaiChartDesktop_construct(){
   var o = this;
   o.__base.FEaiDesktop.construct.call(o);
}
MO.FEaiChartDesktop_build = function FEaiChartDesktop_build(hPanel){
   var o = this;
   o.__base.FEaiDesktop.build.call(o, hPanel);
   var canvas3d = o._canvas3d = MO.Class.create(MO.FEaiChartCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.Class.create(MO.FGuiCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FEaiChartDesktop_resize = function FEaiChartDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var browser = MO.Window.Browser;
   var sourceWidth = (targetWidth != null) ? targetWidth : window.innerWidth;
   var sourceHeight = (targetHeight != null) ? targetHeight : window.innerHeight;
   var orientationCd = browser.orientationCd();
   if(o._screenSize.equalsData(sourceWidth, sourceHeight) && (o._orientationCd == orientationCd)){
      return;
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   o._orientationCd = orientationCd;
   var pixelRatio = browser.capability().pixelRatio;
   var width = parseInt(sourceWidth * pixelRatio);
   var height = parseInt(sourceHeight * pixelRatio);
   o._size.set(width, height);
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   var isVertical = browser.isOrientationVertical()
   if(isVertical){
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }else{
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   MO.Logger.debug(o, 'Change screen size. (orientation={1}, ratio={2}, screen_size={3}, size={4}, rate={5}, calculate_rate={6})', browser.orientationCd(), pixelRatio, o._screenSize.toDisplay(), o._size.toDisplay(), sizeRate, o._calculateRate.toDisplay());
   var canvas3d = o._canvas3d;
   if(browser.capability().canvasScale){
      canvas3d.resize(width, height);
   }else{
      canvas3d.resize(sourceWidth, sourceHeight);
   }
   var context3d = canvas3d.graphicContext();
   context3d.setViewport(0, 0, width, height)
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setGlobalScale(sizeRate, sizeRate);
   var stage = o._canvas3d.activeStage();
   o.selectStage(stage);
}
MO.FEaiChartDesktop_show = function FEaiChartDesktop_show(){
   this.setVisible(true);
}
MO.FEaiChartDesktop_hide = function FEaiChartDesktop_hide(){
   this.setVisible(false);
}
MO.FEaiChartDesktop_setVisible = function FEaiChartDesktop_setVisible(visible){
   var o = this;
   o._visible = visible;
   o._canvas2d.setVisible(visible);
   o._canvas3d.setVisible(visible);
}
MO.FEaiChartDesktop_selectStage = function FEaiChartDesktop_selectStage(stage){
   var o = this;
   o._canvas3d.selectStage(stage);
   if(stage){
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().assign(o._size);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   o._activeStage = stage;
}
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o.__base.FEaiDesktop.dispose.call(o);
}
MO.FEaiDesktop = function FEaiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o.construct = MO.FEaiDesktop_construct;
   o.dispose   = MO.FEaiDesktop_dispose;
   return o;
}
MO.FEaiDesktop_construct = function FEaiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
}
MO.FEaiDesktop_dispose = function FEaiDesktop_dispose(){
   var o = this;
   o.__base.FDesktop.dispose.call(o);
}
MO.FEaiFlatCanvas = function FEaiFlatCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o.onEnterFrame        = MO.FEaiFlatCanvas_onEnterFrame;
   o.onMouseCaptureStart = MO.FEaiFlatCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEaiFlatCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEaiFlatCanvas_onMouseCaptureStop;
   o.construct           = MO.FEaiFlatCanvas_construct;
   o.setPanel            = MO.FEaiFlatCanvas_setPanel;
   o.dispose             = MO.FEaiFlatCanvas_dispose;
   return o;
}
MO.FEaiFlatCanvas_onEnterFrame = function FEaiFlatCanvas_onEnterFrame(){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var camera = stage.camera();
   var distance = 0.5;
   var r = 0.05;
   var keyW = RKeyboard.isPress(EKeyCode.W);
   var keyS = RKeyboard.isPress(EKeyCode.S);
   if(keyW && !keyS){
      camera.doMoveY(distance);
   }
   if(!keyW && keyS){
      camera.doMoveY(-distance);
   }
   var keyA = RKeyboard.isPress(EKeyCode.A);
   var keyD = RKeyboard.isPress(EKeyCode.D);
   if(keyA && !keyD){
      camera.doMoveX(-distance);
   }
   if(!keyA && keyD){
      camera.doMoveX(distance);
   }
   camera.update();
}
MO.FEaiFlatCanvas_onMouseCaptureStart = function FEaiFlatCanvas_onMouseCaptureStart(event){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._cameraPosition.assign(stage.camera().position());
}
MO.FEaiFlatCanvas_onMouseCapture = function FEaiFlatCanvas_onMouseCapture(event){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var camera = stage.camera();
   var position = camera.position();
   position.x = o._cameraPosition.x - cx * 0.03;
   position.y = o._cameraPosition.y + cy * 0.03;
}
MO.FEaiFlatCanvas_onMouseCaptureStop = function FEaiFlatCanvas_onMouseCaptureStop(p){
}
MO.FEaiFlatCanvas_construct = function FEaiFlatCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
   o._logicSize = new SSize2(1920, 1080);
   o._cameraPosition = new SPoint3();
}
MO.FEaiFlatCanvas_setPanel = function FEaiFlatCanvas_setPanel(hPanel){
   var o = this;
   o.__base.FEaiCanvas.setPanel.call(o, hPanel);
}
MO.FEaiFlatCanvas_dispose = function FEaiFlatCanvas_dispose(){
   var o = this;
   o._cameraPosition = RObject.dispose(o._cameraPosition);
   o.__base.FEaiCanvas.dispose.call(o);
}
MO.FEaiPlatformApplication = function FEaiPlatformApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   o._chapterLoading = MO.Class.register(o, new MO.AGetter('_chapterLoading'));
   o._chapterLogin   = MO.Class.register(o, new MO.AGetter('_chapterLogin'));
   o._chapterScene   = MO.Class.register(o, new MO.AGetter('_chapterScene'));
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   o._thread         = null;
   o._interval       = 10;
   o.onLoadResource  = MO.FEaiPlatformApplication_onLoadResource;
   o.construct       = MO.FEaiPlatformApplication_construct;
   o.createCanvas    = MO.FEaiPlatformApplication_createCanvas;
   o.setup           = MO.FEaiPlatformApplication_setup;
   o.dispose         = MO.FEaiPlatformApplication_dispose;
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
MO.FEaiPlatformApplication_createCanvas = function FEaiPlatformApplication_createCanvas(){
   return RClass.create(FEaiPlatformCanvas);
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
MO.FEaiPlatformCanvas = function FEaiPlatformCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FEaiPlatformCanvas_onEnterFrame;
   o.onMouseCaptureStart = MO.FEaiPlatformCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEaiPlatformCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEaiPlatformCanvas_onMouseCaptureStop;
   o.construct           = MO.FEaiPlatformCanvas_construct;
   o.dispose             = MO.FEaiPlatformCanvas_dispose;
   return o;
}
MO.FEaiPlatformCanvas_onEnterFrame = function FEaiPlatformCanvas_onEnterFrame(){
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
MO.FEaiPlatformCanvas_onMouseCaptureStart = function FEaiPlatformCanvas_onMouseCaptureStart(p){
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
MO.FEaiPlatformCanvas_onMouseCapture = function FEaiPlatformCanvas_onMouseCapture(p){
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
MO.FEaiPlatformCanvas_onMouseCaptureStop = function FEaiPlatformCanvas_onMouseCaptureStop(p){
}
MO.FEaiPlatformCanvas_construct = function FEaiPlatformCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
}
MO.FEaiPlatformCanvas_dispose = function FEaiPlatformCanvas_dispose(){
   var o = this;
   o.__base.FEaiCanvas.dispose.call(o);
}
MO.Eai.setup = function Eai_setup(clazz, hPanel){
}
