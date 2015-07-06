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
   o.Resource    = "eai.resource";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line       = 0;
   o.Map        = 1;
   o.Investment = 2;
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
   o.ChartStatistics = 'chart.statistics';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
with(MO){
   MO.FEaiTable = function FEaiTable(o){
      o = RClass.inherits(this, o, FObject);
      o._headLineCount = 0;
      o._hTable        = null
      o.createRow      = FEaiTable_createRow;
      o.setDataCount   = FEaiTable_setDataCount;
      o.dataRow        = FEaiTable_dataRow;
      return o;
   }
   MO.FEaiTable_createRow = function FEaiTable_createRow(){
      var o = this;
   }
   MO.FEaiTable_setDataCount = function FEaiTable_setDataCount(count){
      var o = this;
      var headLineCount = o._headLineCount;
      var total = headLineCount + count;
      var rowCount = o._hTable.rows.length;
      for(var i = rowCount; i < total; i++){
         o.createRow();
      }
      var rowCount = o._hTable.rows.length;
      for(var i = headLineCount; i < rowCount; i++){
         var hRow = o._hTable.rows[i];
         hRow.style.display = (i - headLineCount < count) ? null : 'none';
      }
   }
   MO.FEaiTable_dataRow = function FEaiTable_dataRow(index){
      var o = this;
      var rowIndex = o._headLineCount + index;
      return o._hTable.rows[rowIndex];
  }
}
MO.FEaiCardResource = function FEaiCardResource(o){
   o = RClass.inherits(this, o, FObject);
   o._cardCode   = MO.Class.register(o, new MO.AGetter('_cardCode'));
   o._cityCode   = MO.Class.register(o, new MO.AGetter('_cityCode'));
   o.unserialize = FEaiCardResource_unserialize;
   return o;
}
MO.FEaiCardResource_unserialize = function FEaiCardResource_unserialize(input){
   var o = this;
   o._cardCode = input.readUint16();
   o._cityCode = input.readUint16();
}
MO.FEaiCardResourceConsole = function FEaiCardResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._cards      = MO.Class.register(o, new MO.AGetter('_cards'));
   o.construct   = MO.FEaiCardResourceConsole_construct;
   o.find        = MO.FEaiCardResourceConsole_find;
   o.unserialize = MO.FEaiCardResourceConsole_unserialize;
   o.dispose     = MO.FEaiCardResourceConsole_dispose;
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
with(MO){
   MO.FEaiCityResource = function FEaiCityResource(o){
      o = RClass.inherits(this, o, FObject);
      o._provinceCode  = RClass.register(o, new AGetter('_provinceCode'));
      o._code          = RClass.register(o, new AGetter('_code'));
      o._label         = RClass.register(o, new AGetter('_label'));
      o._level         = RClass.register(o, new AGetter('_level'));
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
      o._level = input.readUint16();
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
      o.find        = FEaiCityResourceConsole_find;
      o.findCityByCard = FEaiCityResourceConsole_findCityByCard;
      o.unserialize = FEaiCityResourceConsole_unserialize;
      o.dispose     = FEaiCityResourceConsole_dispose;
      return o;
   }
   MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._citys = new TDictionary();
   }
   MO.FEaiCityResourceConsole_find = function FEaiCityResourceConsole_find(code){
      return this._citys.get(code);
   }
   MO.FEaiCityResourceConsole_findCityByCard = function FEaiCityResourceConsole_findCityByCard(card) {
      var o = this;
      if (card.length != 4) {
         return null;
      }
      var cityEntities = o._citys;
      var cityEntity = cityEntities.get(card);
      if (cityEntity) {
         return cityEntity;
      }
      var cityEntities = o._citys;
      var cityEntity = cityEntities.get(card.substring(0, 2));
      if (cityEntity) {
         return cityEntity;
      }
      return null;
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
   o.construct                = MO.FEaiHistoryResourceConsole_construct;
   o.unserialize              = MO.FEaiHistoryResourceConsole_unserialize;
   o.load                     = MO.FEaiHistoryResourceConsole_load;
   o.dispose                  = MO.FEaiHistoryResourceConsole_dispose;
   return o;
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
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      o._provinces.set(province.code(), province);
   }
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      o._citys.set(city.code(), city);
   }
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var milestone = MO.Class.create(MO.FEaiHistoryMilestoneResource);
      milestone.unserialize(input);
      o._milestones.set(milestone.code(), milestone);
   }
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var date = MO.Class.create(MO.FEaiHistoryDateResource);
      date.unserialize(input);
      o._dates.set(date.code(), date);
   }
}
MO.FEaiHistoryResourceConsole_dispose = function FEaiHistoryResourceConsole_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o._citys = RObject.dispose(o._citys);
   o._milestones = RObject.dispose(o._milestones);
   o._dates = RObject.dispose(o._dates);
   o.__base.FConsole.dispose.call(o);
}
with(MO){
   MO.FEaiProvinceResource = function FEaiProvinceResource(o){
      o = RClass.inherits(this, o, FObject);
      o._code         = RClass.register(o, new AGetter('_code'));
      o._name         = RClass.register(o, new AGetter('_name'));
      o._label        = RClass.register(o, new AGetter('_label'));
      o._displayOrder = RClass.register(o, new AGetter('_displayOrder'));
      o.unserialize = FEaiProvinceResource_unserialize;
      return o;
   }
   MO.FEaiProvinceResource_unserialize = function FEaiProvinceResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._name = input.readString();
      o._label = input.readString();
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
with(MO){
   MO.FEaiRateResource = function FEaiRateResource(o){
      o = RClass.inherits(this, o, FObject);
      o._count      = RClass.register(o, new AGetter('_count'));
      o._colors     = RClass.register(o, new AGetter('_colors'));
      o.construct   = FEaiRateResource_construct;
      o.find        = FEaiRateResource_find;
      o.findRate    = FEaiRateResource_findRate;
      o.unserialize = FEaiRateResource_unserialize;
      o.dispose     = FEaiRateResource_dispose;
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
      if(index > o._count){
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
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
   o._scopeCd         = MO.EScope.Local;
   o._rateConsole     = MO.Class.register(o, new MO.AGetter('_rateConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._cardConsole     = MO.Class.register(o, new MO.AGetter('_cardConsole'));
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
   o._rateConsole = MO.Class.create(MO.FEaiRateResourceConsole);
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceResourceConsole);
   o._cityConsole = MO.Class.create(MO.FEaiCityResourceConsole);
   o._cardConsole = MO.Class.create(MO.FEaiCardResourceConsole);
   o._historyConsole = MO.Class.create(MO.FEaiHistoryResourceConsole);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   var code = input.readString();
   if(code == "chart-live"){
      o._rateConsole.unserialize(input);
      o._provinceConsole.unserialize(input);
      o._cityConsole.unserialize(input);
      o._cardConsole.unserialize(input);
   }else if(code == "chart-history"){
      o._rateConsole.unserialize(input);
      o._provinceConsole.unserialize(input);
      o._cityConsole.unserialize(input);
      o._cardConsole.unserialize(input);
      o._historyConsole.unserialize(input);
   }else{
      throw new TError("Unserialize code failure.");
   }
}
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(fileName){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{eai.resource}' + fileName);
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
   o.__base.FConsole.dispose.call(o);
}
with(MO){
   MO.FEaiLogic = function FEaiLogic(o){
      o = RClass.inherits(this, o, FObject);
      o._code   = null;
      o.makeUrl = FEaiLogic_makeUrl;
      o.send    = FEaiLogic_send;
      return o;
   }
   MO.FEaiLogic_makeUrl = function FEaiLogic_makeUrl(method, parameters){
      var o = this;
      var serviceHost = MO.RConsole.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
      var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method;
      if(parameters){
         url += '?' + parameters;
      }
      return url;
   }
   MO.FEaiLogic_send = function FEaiLogic_send(method, parameters, owner, callback){
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
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._system       = MO.Class.register(o, new MO.AGetter('_system'));
   o._organization = MO.Class.register(o, new MO.AGetter('_organization'));
   o._achievement  = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._schedule     = MO.Class.register(o, new MO.AGetter('_schedule'));
   o._statistics   = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._thread       = null;
   o._interval     = 1000 * 60 * 10;
   o.onProcess     = MO.FEaiLogicConsole_onProcess;
   o.construct     = MO.FEaiLogicConsole_construct;
   o.dispose       = MO.FEaiLogicConsole_dispose;
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
   o._system = MO.RObject.dispose(o._system);
   o._organization = MO.RObject.dispose(o._organization);
   o._achievement = MO.RObject.dispose(o._achievement);
   o._schedule = MO.RObject.dispose(o._schedule);
   o._statistics = MO.RObject.dispose(o._statistics);
   o.__base.FConsole.dispose.call(o);
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
MO.FEaiLogicStatistics = function FEaiLogicStatistics(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code               = 'statistics';
   o.doInvestmentDynamic = MO.FEaiLogicStatistics_doInvestmentDynamic;
   o.doInvestmentTrend   = MO.FEaiLogicStatistics_doInvestmentTrend;
   return o;
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
MO.FEaiLogicSystem = function FEaiLogicSystem(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code        = 'system';
   o._ready       = false;
   o._currentDate = null;
   o._localDate   = null;
   o._systemDate  = MO.Class.register(o, new MO.AGetter('_systemDate'))
   o.onInfo       = MO.FEaiLogicSystem_onInfo;
   o.construct    = MO.FEaiLogicSystem_construct;
   o.doInfo       = MO.FEaiLogicSystem_doInfo;
   o.testReady    = MO.FEaiLogicSystem_testReady;
   o.currentDate  = MO.FEaiLogicSystem_currentDate;
   o.refresh      = MO.FEaiLogicSystem_refresh;
   o.dispose      = MO.FEaiLogicSystem_dispose;
   return o;
}
MO.FEaiLogicSystem_onInfo = function FEaiLogicSystem_onInfo(event){
   var o = this;
   var content = event.content;
   o._localDate.setNow();
   o._systemDate.parse(content.date);
   o._ready = true;
}
MO.FEaiLogicSystem_construct = function FEaiLogicSystem_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   o._currentDate = new MO.TDate();
   o._localDate = new MO.TDate();
   o._systemDate = new MO.TDate();
}
MO.FEaiLogicSystem_doInfo = function FEaiLogicSystem_doInfo(owner, callback){
   return this.send('info', null, owner, callback);
}
MO.FEaiLogicSystem_testReady = function FEaiLogicSystem_testReady(){
   return this._ready;
}
MO.FEaiLogicSystem_currentDate = function FEaiLogicSystem_currentDate(){
   var o = this;
   var span = o._systemDate.get() - o._localDate.get();
   o._currentDate.set(MO.Timer.current() + span);
   return o._currentDate;
}
MO.FEaiLogicSystem_refresh = function FEaiLogicSystem_refresh(){
   var o = this;
   return o.doInfo(o, o.onInfo);
}
MO.FEaiLogicSystem_dispose = function FEaiLogicSystem_dispose(){
   var o = this;
   o._localDate = RObject.dispose(o._localDate);
   o._systemDate = RObject.dispose(o._systemDate);
   o.__base.FEaiLogic.consturct.call(o);
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
   MO.FEaiCityEffect = function FEaiCityEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'eai.city';
      o.drawRenderable = FEaiCityEffect_drawRenderable;
      return o;
   }
   MO.FEaiCityEffect_drawRenderable = function FEaiCityEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
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
}
with(MO){
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._visible                = RClass.register(o, new AGetter('_visible'), false);
      o._location               = RClass.register(o, new AGetter('_location'));
      o._size                   = RClass.register(o, new AGetter('_size'));
      o._alpha                  = RClass.register(o, new AGetSet('_alpha'), 1);
      o._color                  = RClass.register(o, new AGetter('_color'));
      o._range                  = RClass.register(o, new AGetter('_range'), 1);
      o._rangeColor             = RClass.register(o, new AGetter('_rangeColor'));
      o._cityTotal              = 0;
      o._investmentCount        = 0;
      o._investmentTotal        = RClass.register(o, new AGetSet('_investmentTotal'));
      o._investmentLevelTotal   = 20000;
      o._investmentLevel        = 0;
      o._investmentRange        = 1;
      o._investmentRate         = 100;
      o._investmentDirection    = 1;
      o._stage                  = RClass.register(o, new AGetSet('_stage'));
      o._renderable             = RClass.register(o, new AGetSet('_renderable'));
      o._data                   = RClass.register(o, new AGetSet('_data'));
      o._inputPoint             = null;
      o._outputPoint            = null;
      o.construct               = FEaiCityEntity_construct;
      o.calculateScreenPosition = FEaiCityEntity_calculateScreenPosition;
      o.build                   = FEaiCityEntity_build;
      o.addInvestmentTotal      = FEaiCityEntity_addInvestmentTotal;
      o.reset                   = FEaiCityEntity_reset;
      o.update                  = FEaiCityEntity_update;
      o.process                 = FEaiCityEntity_process;
      o.dispose                 = FEaiCityEntity_dispose;
      return o;
   }
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(0, 0, 0, 0);
      o._rangeColor = new SColor4(0, 0, 0, 0);
      o._inputPoint = new SPoint3();
      o._outputPoint = new SPoint3();
   }
   MO.FEaiCityEntity_calculateScreenPosition = function FEaiCityEntity_calculateScreenPosition(){
      var o = this;
      var region = o._stage.region();
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var mMatrix = o._renderable.matrix();
      var matrix = MO.RMath.matrix;
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
   MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(investmentTotal){
      var o = this;
      o._investmentCount++;
      o._investmentTotal += investmentTotal;
      o._investmentLevel = o._investmentLevelTotal;
      var rateConsole = RConsole.find(FEaiResourceConsole).rateConsole();
      var color = rateConsole.find(EEaiRate.Line).findRate(o._investmentTotal / 200000);
      o._color.set(1, 1, 1, 1);
      o._range = RFloat.toRange(Math.log(investmentTotal) / 5, 0, 6);
      o._rangeColor.setInteger(color);
      o._rangeColor.alpha = 1;
      o._investmentRange = o._range;
      o._investmentRate = 100;
      o._visible = true;
   }
   MO.FEaiCityEntity_reset = function FEaiCityEntity_reset(){
      var o = this;
      o._visible = false;
      o._alpha = 0;
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
      var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
      var investmentCityTotal = historyConsole.investmentCityTotal();
      var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
      var rate = Math.sqrt(total / investmentCityTotal) * 4;
      var color = rateInfo.findRate(rate);
      range = rate * 6;
      rate = RFloat.toRange(rate, 0, 1);
      o._alpha = RFloat.toRange(rate * 1.5, 0, 1);
      o._rangeColor.setIntAlpha(color, rate * 0.6);
      o._range = RFloat.toRange(Math.sqrt(range), 1, 6);
   }
   MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
      var o = this;
      if(o._investmentLevel > 0){
         var rate = o._investmentLevel / o._investmentLevelTotal;
         if(o._investmentRate < 0){
            o._investmentRate = 0;
            o._investmentDirection = 4;
         }else if(o._investmentRate > 100){
            o._investmentRate = 100;
            o._investmentDirection = -2;
         }
         o._color.alpha = rate;
         o._rangeColor.alpha = rate;
         o._investmentLevel--;
         if(o._investmentLevel == 0){
            o._visible = false;
         }
         return true;
      }
      return false;
   }
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
      o._rangeColor = RObject.dispose(o._rangeColor);
      o._inputPoint = RObject.dispose(o._inputPoint);
      o._outputPoint = RObject.dispose(o._outputPoint);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiCityEntityConsole = function FEaiCityEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   o._citys     = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct  = MO.FEaiCityEntityConsole_construct;
   o.findByCode = MO.FEaiCityEntityConsole_findByCode;
   o.findByCard = MO.FEaiCityEntityConsole_findByCard;
   o.push       = MO.FEaiCityEntityConsole_push;
   o.dispose    = MO.FEaiCityEntityConsole_dispose;
   return o;
}
MO.FEaiCityEntityConsole_construct = function FEaiCityEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._citys = MO.TDictionary();
}
MO.FEaiCityEntityConsole_findByCode = function FEaiCityEntityConsole_findByCode(code){
   return this._citys.get(code);
}
MO.FEaiCityEntityConsole_findByCard = function FEaiCityEntityConsole_findByCard(card){
   var o = this;
   if (card.length != 4) {
      return null;
   }
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card);
   if (cityEntity) {
      return cityEntity;
   }
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if (cityEntity) {
      return cityEntity;
   }
   return null;
}
MO.FEaiCityEntityConsole_push = function FEaiCityEntityConsole_push(entity){
   this._citys.set(entity.data().code(), entity);
}
MO.FEaiCityEntityConsole_dispose = function FEaiCityEntityConsole_dispose(monitor){
   var o = this;
   o._citys = RObject.dispose(o._citys);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiCityRangeEffect = function FEaiCityRangeEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'eai.city.range';
      o.drawRenderable = FEaiCityRangeEffect_drawRenderable;
      return o;
   }
   MO.FEaiCityRangeEffect_drawRenderable = function FEaiCityRangeEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
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
}
with(MO){
   MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
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
      var image = event.sender;
      o._texture.upload(image);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._material = RClass.create(FE3dMaterial);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, vertexCount);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
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
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'eai.citys.range';
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
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
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
   MO.FEaiCitysRangeRenderable_loadUrl = function FEaiCitysRangeRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
      var o = this;
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
      o._levelCoordLeft       = null;
      o._levelCoordRight      = null;
      o._levelScale           = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._level                = RClass.register(o, new AGetSet('_level'));
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
      var image = event.sender;
      o._texture.upload(image);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._material = RClass.create(FE3dMaterial);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
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
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'eai.citys';
      materialInfo.optionAlpha = true;
      materialInfo.ambientColor.setHex('#FFFFFF');
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/citys.png');
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
            var alpha = city.alpha();
            var location = city.location();
            var level = city.data().level();
            if((level != 1) && (level != 2) && (level != 3) && (level != 4)){
               throw new TError('Invalid level.');
            }
            var coordLeft = o._levelCoordLeft[level];
            var coordRight = o._levelCoordRight[level];
            var scale = o._levelScale[level];
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
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
            var alpha = parseInt(color.alpha * alpha * 255);
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
   MO.FEaiCitysRenderable_loadUrl = function FEaiCitysRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
      var o = this;
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._vertexColorBuffer = RObject.dispose(o._vertexColorBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
MO.FEaiCountryData = function FEaiCountryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.onLoaded       = MO.FEaiCountryData_onLoaded;
   o.construct      = MO.FEaiCountryData_construct;
   o.unserialize    = MO.FEaiCountryData_unserialize;
   o.load           = MO.FEaiCountryData_load;
   o.dispose        = MO.FEaiCountryData_dispose;
   return o;
}
MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._provinces = new MO.TDictionary();
}
MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
   var o = this;
   var data = event.outputData();
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
}
MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
   var o = this;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceData);
      province.unserialize(input);
      o._provinces.set(province.name(), province);
   }
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiCountryData_load = function FEaiCountryData_load(){
   var o = this;
   var url = '/script/ars/eai/country.dat';
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoaded);
}
MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._cameraDirection         = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay              = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration            = RClass.register(o, new AGetSet('_riseDuration'), 5000);
      o._riseDistance            = RClass.register(o, new AGetSet('_riseDistance'), 1000);
      o._fallDuration            = RClass.register(o, new AGetSet('_fallDuration'), 200);
      o._fallDistance            = RClass.register(o, new AGetSet('_fallDistance'), 3);
      o._blockInterval           = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight     = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 3);
      o._mouseMoveCheckInterval  = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration      = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
      o._playing = false;
      o._lastTick = 0;
      o._interval = 10;
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o.setup                    = FEaiCountryEntity_setup;
      o.start                    = FEaiCountryEntity_start;
      o.process                  = FEaiCountryEntity_process;
      o.introAnime               = FEaiCountryEntity_introAnime;
      o.onMouseMove              = FEaiCountryEntity_onMouseMove;
      o.onMouseDown              = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime       = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch      = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime          = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup(provinceEntities) {
      var o = this;
      o._provinceEntities = provinceEntities;
      for (var i = 0; i < o._provinceEntities.count(); i++) {
         var fr = o._provinceEntities.at(i).faceRenderable();
         var br = o._provinceEntities.at(i).borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         frm.tz = o.riseDistance();
         frm.updateForce();
         brm.tz = o.riseDistance();
         brm.updateForce();
      }
      o._startTime = MO.Timer.current();
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
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < o._provinceEntities.count() && i < idxCap; i++) {
         var fr = o._provinceEntities.at(i).faceRenderable();
         var br = o._provinceEntities.at(i).borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
            risePercentage = 1;
            fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
            if (fallPercentage > 1) {
               fallPercentage = 1;
            }
         }
         frm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         frm.updateForce();
         brm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         brm.updateForce();
      }
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
}
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o.construct        = MO.FEaiEntityConsole_construct;
   o.dispose          = MO.FEaiEntityConsole_dispose;
   return o;
}
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._cityConsole = MO.RClass.create(MO.FEaiCityEntityConsole);
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceEntityConsole);
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._countryEntity        = MO.Class.register(o, new MO.AGetter('_countryEntity'));
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   o.construct             = MO.FEaiMapEntity_construct;
   o.findProvinceByCard    = MO.FEaiMapEntity_findProvinceByCard;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.upload                = MO.FEaiMapEntity_upload;
   o.process               = MO.FEaiMapEntity_process;
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._countryEntity = MO.Class.create(MO.FEaiCountryEntity);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiMapEntity_findProvinceByCard = function FEaiMapEntity_findProvinceByCard(code){
   var o = this;
   var provinceEntity = o._provinceEntities.get(code);
   return provinceEntity;
}
MO.FEaiMapEntity_findCityByCard = function FEaiMapEntity_findCityByCard(card){
   var o = this;
   if(card.length != 4){
      return null;
   }
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card);
   if(cityEntity){
      return cityEntity;
   }
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if(cityEntity){
      return cityEntity;
   }
   return null;
}
MO.FEaiMapEntity_upload = function FEaiMapEntity_upload(){
   var o = this;
   o._citysRenderable.upload();
   o._citysRangeRenderable.upload();
}
MO.FEaiMapEntity_process = function FEaiMapEntity_process(card){
   var o = this;
   var changed = false;
   var provinceEntities = o._provinceEntities;
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      if(provinceEntity.process()){
         changed = true;
      }
   }
   var changed = false;
   var cityEntities = o._cityEntities;
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
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._countryEntity = MO.RObject.dispose(o._countryEntity);
   o._provinceEntities = MO.RObject.dispose(o._provinceEntities);
   o._cityEntities = MO.RObject.dispose(o._cityEntities);
   o.__base.FEaiEntity.dispose.call(o);
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
      o._mapEntity        = RClass.register(o, new AGetSet('_mapEntity'));
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o._layerDepth       = 3;
      o._focusTick        = 0;
      o._focusInterval    = 10;
      o._focusCurrent     = 0;
      o._focusCount       = 100;
      o.construct         = FEaiProvinceEntity_construct;
      o.buildFace         = FEaiProvinceEntity_buildFace;
      o.buildBorder       = FEaiProvinceEntity_buildBorder;
      o.build             = FEaiProvinceEntity_build;
      o.doInvestment      = FEaiProvinceEntity_doInvestment;
      o.updateColor       = FEaiProvinceEntity_updateColor;
      o.update            = FEaiProvinceEntity_update;
      o.process           = FEaiProvinceEntity_process;
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
         colors[colorIndex++] = 0x08;
         colors[colorIndex++] = 0x0D;
         colors[colorIndex++] = 0x19;
         colors[colorIndex++] = 0xFF;
      }
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
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
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable.indexBuffer().setLineWidth(1);
      renderable.indexBuffer().upload(borderData, borderIndex);
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
   MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(){
      var o = this;
      o._focusTick = 0;
      o._focusCurrent = o._focusCount;
   }
   MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
      var o = this;
      var investmentTotal = data.investmentTotal();
      var rate = Math.sqrt(investmentTotal) / 100;
   }
   MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
      var o = this;
      var rate = o._focusCurrent / 100;
      var vertexTotal = o._vertexTotal;
      var colorIndex = 0;
      var colors = MO.TypeArray.findTemp(EDataType.Uint8, 4 * vertexTotal * 2);
      var positionTotal = vertexTotal * 2;
      for(var i = 0; i < positionTotal; i++){
         colors[colorIndex++] = 0x08 + ((0x08 - 0x08)* rate);
         colors[colorIndex++] = 0x0D + ((0xB5 - 0x0D)* rate);
         colors[colorIndex++] = 0x19 + ((0xF6 - 0x19)* rate);
         colors[colorIndex++] = 0xFF;
      }
      o._faceRenderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
   }
   MO.FEaiProvinceEntity_process = function FEaiProvinceEntity_process(){
      var o = this;
      if(o._focusCurrent > 0){
         var tick = RTimer.current();
         if(tick - o._focusTick > o._focusInterval){
            var z = -o._focusCurrent / 20;
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
   MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiProvinceEntityConsole = function FEaiProvinceEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.construct  = MO.FEaiProvinceEntityConsole_construct;
   o.findByCode = MO.FEaiProvinceEntityConsole_findByCode;
   o.push       = MO.FEaiProvinceEntityConsole_push;
   o.dispose    = MO.FEaiProvinceEntityConsole_dispose;
   return o;
}
MO.FEaiProvinceEntityConsole_construct = function FEaiProvinceEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._provinces = MO.TDictionary();
}
MO.FEaiProvinceEntityConsole_findByCode = function FEaiProvinceEntityConsole_findByCode(code){
   return this._provinces.get(code);
}
MO.FEaiProvinceEntityConsole_push = function FEaiProvinceEntityConsole_push(entity){
   this._provinces.set(entity.data().name(), entity);
}
MO.FEaiProvinceEntityConsole_dispose = function FEaiProvinceEntityConsole_dispose(monitor){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
}
with (MO) {
   MO.FGui24HTimeline = function FGui24HTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._startTime        = RClass.register(o, new AGetSet('_startTime'));
      o._endTime          = RClass.register(o, new AGetSet('_endTime'));
      o._data             = null;
      o._ready            = false;
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
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
      var startTime = o._startTime;
      var endTime = o._endTime;
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      var nowTick = systemLogic.currentDate();
      startTime.assign(nowTick);
      startTime.setSecond(0);
      startTime.setMinute(0);
      startTime.addDay(-1);
      endTime.assign(nowTick);
      endTime.setSecond(0);
      endTime.setMinute(parseInt(endTime.date.getMinutes() / 15) * 15);
      endTime.refresh();
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, o._startTime.format('YYYYMMDDHH24MISS'), o._endTime.format('YYYYMMDDHH24MISS'), 60 * 15);
   }
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
      var o = this;
      o._data = event.content.collection;
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
      var dataTop = top + 30;
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
         startTime.addMseconds(1000 * 60 * 60);
         drawText = !drawText;
         if (drawText) {
            graphic.setFont('bold 20px Microsoft YaHei');
            textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#FFFFFF');
         }
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var data = o._data;
      if (!data) {
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
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         var rate = data[i].investment / maxInves;
         var colorIdx = parseInt((rateResource.count() - 1) * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
         var lastRate = data[i - 1].investment / maxInves;
         var lastColorIdx = parseInt((rateResource.count() - 1) * lastRate);
         var lastHexColor = RHex.format(rateResource.find(lastColorIdx));
         var lastColor = '#' + lastHexColor.substring(2);
         var lastOpColor = 'rgba(' + RHex.parse(lastHexColor.substring(2, 4)) + ',' + RHex.parse(lastHexColor.substring(4, 6)) + ',' + RHex.parse(lastHexColor.substring(6, 8)) + ',' + '0.3)';
         var gradient = graphic.createLinearGradient(lastX, lastY, x, y);
         gradient.addColorStop('0', lastColor);
         gradient.addColorStop('1', color);
         var opGradient = graphic.createLinearGradient(0, dataBottom, 0, y);
         var bottomHexColor = RHex.format(rateResource.find(0));
         var bottomOpColor = 'rgba(' + RHex.parse(bottomHexColor.substring(2, 4)) + ',' + RHex.parse(bottomHexColor.substring(4, 6)) + ',' + RHex.parse(bottomHexColor.substring(6, 8)) + ',' + '0.3)';
         opGradient.addColorStop('0', bottomOpColor);
         opGradient.addColorStop('1', opColor);
         graphic.drawLine(lastX, lastY, x, y, gradient, 3);
         graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
         lastX = x;
         lastY = y;
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
      var dayTotal = 0;
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
               dayTotal += hourInves;
               hourInves = 0;
            }
            lastHour = hour;
         }
      }
      graphic.setFont('bold 22px Microsoft YaHei');
      graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
      graphic.setFont('bold 20px Microsoft YaHei');
      var textWidth = graphic.textWidth('峰值：');
      var textHourPeakValue = MO.RFloat.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
      var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
      var textDayTotalValue = MO.RFloat.unitFormat(dayTotal, 0, 0, 2, 0, 10000, '万');
      var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
      var textHourAvrgValue = MO.RFloat.unitFormat(dayTotal / 24, 0, 0, 2, 0, 10000, '万');
      var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
      var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
      graphic.drawText('峰值：', decoLeft, top + 30, '#00CFFF');
      graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, top + 30, '#00B5F6');
      graphic.drawText('总额：', decoLeft, top + 55, '#00CFFF');
      graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, top + 55, '#00B5F6');
      graphic.drawText('均值：', decoLeft, top + 80, '#00CFFF');
      graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, top + 80, '#00B5F6');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
}
with (MO) {
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._shiningImage = null;
      o._numImages = null;
      o._yiImage = null;
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      o._fullWidth = 713;
      o._fullHeight = 686;
      o.setup = FGuiHistoryMilestoneFrame_setup;
      o.onPaintBegin = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show = FGuiHistoryMilestoneFrame_show;
      o.dispose = FGuiHistoryMilestoneFrame_dispose;
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
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
      o._bgImage.loadUrl('../ars/eai/milestone/bg.png');
      o._shiningImage = MO.Class.create(MO.FImage);
      o._shiningImage.addLoadListener(o, o.onImageLoad);
      o._shiningImage.loadUrl('../ars/eai/milestone/shining.png');
      o._yiImage = MO.Class.create(MO.FImage);
      o._yiImage.addLoadListener(o, o.onImageLoad);
      o._yiImage.loadUrl('../ars/eai/number/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         var img = MO.Class.create(MO.FImage);
         img.addLoadListener(o, o.onImageLoad);
         img.loadUrl('../ars/eai/number/' + i + '.png');
         o._numImages[i] = img;
      }
   }
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var shiningSize = o._shiningImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;
      var textLeft = hCenter - 120;
      var textTop = rectangle.top + 450;
      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var slideDistance = (MO.Eai.Canvas.logicSize().height + o._fullHeight) / 2 + 100;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         p = 1 - (1 - p) * (1 - p);
         graphic._handle.globalAlpha = p;
         o.setTop(MO.Eai.Canvas.logicSize().height - slideDistance * p);
      }
      else if (showTick < o._showDuration) {
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         p = p * p;
         graphic._handle.globalAlpha = 1 - p;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - 100 - slideDistance * p);
      }
      else {
         o._data = null;
         o.setVisible(false);
         o.dirty();
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         o.processDataChangedListener(dsEvent);
      }
      graphic.drawImage(o._shiningImage, hCenter - shiningSize.width / 2, rectangle.top, shiningSize.width, shiningSize.height);
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top + shiningSize.height / 2, bgSize.width, bgSize.height);
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText('达成日数：', textLeft, textTop + 50, '#FFE849');
      graphic.drawText('分公司数：', textLeft, textTop + 100, '#FFE849');
      graphic.drawText('理财师数：', textLeft, textTop + 150, '#FFE849');
      if (o.data()) {
         var invesText = o.data().investmentTotal().toString();
         var numWidth = invesText.length * 60 + 80;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * 60, rectangle.top + shiningSize.height / 2 - 80, o._numImages[0]._size.width, o._numImages[0]._size.height);
         }
         graphic.drawImage(o._yiImage, numLeft + invesText.length * 60, rectangle.top + shiningSize.height / 2 - 80, o._yiImage._size.width, o._yiImage._size.height);
         graphic.drawText(o.data().dayCount(), textLeft + 120, textTop + 50, '#FFA800');
         graphic.drawText(o.data().companyCount(), textLeft + 120, textTop + 100, '#FFA800');
         graphic.drawText(o.data().staffCount(), textLeft + 120, textTop + 150, '#FFA800');
      }
      graphic._handle.globalAlpha = 1;
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose() {
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with (MO) {
   MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      o.onPaintBegin = FGuiHistoryTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.bottom();
      var dataTop = top + 30;
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
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var investmentTotal = historyConsole.investmentTotal();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var pixPer10k = dataHeight * 10000 / maxInves;
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var dayInvestmentTotal = dateData.investmentTotal();
            var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
            var hexColor = RHex.format(rateResource.findRate(dayInvestmentTotal / investmentTotal));
            var color = '#' + hexColor.substring(2);
            graphic.drawLine(lastX, lastY, x, y, color, 3);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, 3, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }else{
            break;
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            if (startDate.date.getDate() == 1) {
               graphic.setFont('bold 16px Microsoft YaHei');
               if(inves > 100000000){
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
                  graphic.drawText(text, x - text.length * 3, y - 16, '#FFE849');
               }else{
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
                  graphic.drawText(text, x - text.length * 3, y - 16, '#FF7200');
               }
            }
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var inves = dateData.investmentTotal();
         var y = dataBottom - inves / 10000 * pixPer10k;
         var rate = 1 - (y / dataHeight);
         var colorIdx = parseInt(rateResource.count() * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, 3);
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), 3, 0, color, color);
         graphic.setFont('bold 16px Microsoft YaHei');
         if(inves > 100000000){
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
            graphic.drawText(text, x - text.length * 3, y - 16, '#FFE849');
         }else{
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
            graphic.drawText(text, x - text.length * 3, y - 16, '#FF7200');
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }
}
with(MO){
   MO.FGuiLivePop = function FGuiLivePop(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      o._fullWidth = 910;
      o._fullHeight = 140;
      o._riseHeight = 50;
      o.setup = FGuiLivePop_setup;
      o.onPaintBegin = FGuiLivePop_onPaintBegin;
      o.onImageLoad = FGuiLivePop_onImageLoad;
      o.show = FGuiLivePop_show;
      o.dispose = FGuiLivePop_dispose;
      return o;
   }
   MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
      var o = this;
      o.setWidth(o._fullWidth);
      o.setHeight(o._fullHeight);
      o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/invespop.png');
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
      var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
      var cityEntity = cityConsole.findByCard(entity.card());
      var popText = '';
      var date = MO.Memory.alloc(TDate);
      date.parse(entity.date());
      popText += date.format('HH24:MI:SS');
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
         graphic.globalAlpha = p;
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.globalAlpha = 1;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
      }
      else if (showTick < o._showDuration) {
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         graphic.globalAlpha = p;
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.globalAlpha = 1;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
      }
      else {
         o._data = null;
         o.setVisible(false);
         return;
      }
   }
   MO.FGuiLivePop_show = function FGuiLivePop_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }
   MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FGuiLiveTable = function FGuiLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._data                 = MO.Class.register(o, new MO.AGetSet('_data'));
   o._rankLogoImage        = null;
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
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   o.construct             = MO.FGuiLiveTable_construct;
   o.setup                 = MO.FGuiLiveTable_setup;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._currentDate = MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(60, 60, 100, 60);
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
   var image = o._logoImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/logo.png');
   var image = o._backgroundImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/grid.png');
   var image = o._rankLineImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/line.png');
   var image = o._rank1Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/1.png');
   var image = o._rank2Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/2.png');
   var image = o._rank3Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/3.png');
   if(MO.Runtime.isPlatformMobile()){
      o._headFontStyle = 'bold 42px Microsoft YaHei';
      o._headStart = 120;
      o._headTextTop = 38;
      o._headHeight = 54;
      o._rankStart = 220;
      o._rankHeight = 60;
      o._rankIconStart = 30;
      o._rankRowUp = 46;
      o._rankRowDown = 68;
      o._rowStart = 400;
      o._rowFontStyle = '36px Microsoft YaHei';
      o._rowHeight = 46;
   }else{
      o._headFontStyle = 'bold 36px Microsoft YaHei';
      o._headStart = 116;
      o._headTextTop = 26;
      o._headHeight = 40;
      o._rankStart = 190;
      o._rankHeight = 44;
      o._rankIconStart = 25;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._rowStart = 320;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowHeight = 32;
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
      if(o._rankLineImage.testReady()){
         graphic.drawGridImage(o._rankLineImage, x - 9, y - o._rankRowUp, width - 42, o._rankRowDown, o._rankLinePadding);
      }
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX, imageY, 46, 37);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   if(!flag){
      o._currentDate.parse(entity.date());
      var text = o._currentDate.format('HH24:MI:SS');
      var textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] / 2 - textWidth / 2, y, fontColor);
   }
   x += widths[0];
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = cityConsole.findCityByCard(entity.card());
   text = '';
   if (cityEntity) {
      text = cityEntity.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] / 2 - textWidth / 2, y, fontColor);
   x += widths[1];
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] / 2 - textWidth / 2, y, fontColor);
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
      text = investment;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, investmentRight - textWidth, y, fontColor);
   }
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
   var drawLeft = left + 29;
   var drawRight = right - 20;
   var drawWidth = right - left;
   var widthDefine = 0;
   for(var i = 0; i < 4; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 14;
   }
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '钰诚控股 - e租宝';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (right - left) / 2 - (titleWidth / 2);
   if(o._logoImage.testReady()){
      graphic.drawImage(o._logoImage, textLeft - 77, top + 35, 62, 62);
   }
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 70
   graphic.setFont(o._rowFontStyle);
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
   var rankEntity = o._rank;
   if(rankEntity){
      var tableTop = top + o._rankStart;
      var tableText = '';
      var tableTextWidth = 0;
      var dataEntities = o._data;
      var count = rankEntity.count();
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + o._rankHeight * i, drawWidth);
      }
   }
   var dataEntities = o._data;
   if(dataEntities){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      var count = dataEntities.count();
      for(var i = 0; i < count; i++) {
         var entity = dataEntities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + o._rowHeight * i, drawWidth);
      }
   }
}
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._backgroundPadding = RObject.dispose(o._backgroundPadding);
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
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
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
   var textWidth = graphic.textWidth(year);
   graphic.drawText(year, x, y, '#FFD926');
   graphic.drawText('年', x + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(month);
   graphic.drawText(month, x + widthYear, y, '#FFD926');
   graphic.drawText('月', x + widthYear + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(day);
   graphic.drawText(day, x + widthYear + widthMonth, y, '#FFD926');
   graphic.drawText('日', x + widthYear + widthMonth + textWidth, y - 1, '#00B5F6');
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
   o._dateSetup              = false;
   o._beginDate              = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._invementDayCurrent     = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._invementDay            = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent   = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal          = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._intervalMinute         = 2;
   o._mapEntity              = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankEntities           = MO.Class.register(o, new MO.AGetter('_rankEntities'));
   o._entities               = MO.Class.register(o, new MO.AGetter('_entities'));
   o._tableEntities          = MO.Class.register(o, new MO.AGetter('_tableEntities'));
   o._showShapes             = MO.Class.register(o, new MO.AGetter('_showShapes'));
   o._tableCount             = 21;
   o._tableInterval          = 1000;
   o._tableTick              = 1;
   o._dataTicker             = null;
   o._entityPool             = null;
   o._shapePool              = null;
   o._autio1                 = null;
   o._autio2                 = null;
   o._autio3                 = null;
   o._autio4                 = null;
   o._listenersEntityChanged = MO.RClass.register(o, new MO.AListener('_listenersEntityChanged', MO.EEvent.DataChanged));
   o.onInvestment            = MO.FEaiStatisticsInvestment_onInvestment;
   o.construct               = MO.FEaiStatisticsInvestment_construct;
   o.allocEntity             = MO.FEaiStatisticsInvestment_allocEntity;
   o.allocShape              = MO.FEaiStatisticsInvestment_allocShape;
   o.setup                   = MO.FEaiStatisticsInvestment_setup;
   o.calculateCurrent        = MO.FEaiStatisticsInvestment_calculateCurrent;
   o.focusEntity             = MO.FEaiStatisticsInvestment_focusEntity;
   o.process                 = MO.FEaiStatisticsInvestment_process;
   o.dispose                 = MO.FEaiStatisticsInvestment_dispose;
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
   if(dataset){
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         o._entities.push(entity);
      }
   }
   o.calculateCurrent();
   var dsEvent = MO.Memory.alloc(MO.SEvent);
   dsEvent.sender = o;
   dsEvent.rank = o._rankEntities;
   dsEvent.data = o._tableEntities;
   o.processDataChangedListener(dsEvent);
   MO.Memory.free(dsEvent);
   var entityCount = o._entities.count();
   o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
   o._tableTick = 0;
}
MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._entities = new MO.TObjects();
   o._showShapes = new MO.TObjects();
   o._tableEntities = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
   table._hTable = document.getElementById('id_investment');
   table._headLineCount = 1;
   o._rankEntities = new MO.TObjects();
   o._entityPool = MO.Class.create(MO.FObjectPool);
   o._shapePool = MO.Class.create(MO.FObjectPool);
}
MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
   var o = this;
   var entity = o._entityPool.alloc();
   if(!entity){
      entity = MO.Class.create(MO.FEaiStatisticsInvestmentEntity);
   }
   return entity;
}
MO.FEaiStatisticsInvestment_allocShape = function FEaiStatisticsInvestment_allocShape(){
   var o = this;
   var shape = o._shapePool.alloc();
   if(!shape){
      shape = MO.Class.create(MO.FEaiStatisticsInvestmentShape);
      shape.linkGraphicContext(o);
      shape.setup();
   }
   return shape;
}
MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      o._tableCount = 12;
   }else{
      o._tableCount = 21;
   }
   var audio = o._autio1 = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/currency/1.mp3');
   var audio = o._autio2 = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/currency/2.mp3');
   var audio = o._autio3 = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/currency/3.mp3');
   var audio = o._autio4 = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/currency/4.mp3');
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
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
   var card = entity.card();
   var investment = entity.investment();
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = o._mapEntity.findCityByCard(card);
   if(cityEntity){
      var provinceCode = cityEntity.data().provinceCode();
      var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
      var province = provinceConsole.findByCode(provinceCode);
      var provinceEntity = o._mapEntity.findProvinceByCard(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment();
      }
      cityEntity.addInvestmentTotal(investment);
      o._mapEntity.upload();
      if(investment >= 1000000){
         o._autio4.play(0);
      }else if(investment >= 100000){
         o._autio3.play(0);
      }else if(investment >= 10000){
         o._autio2.play(0);
      }else if(investment >= 1000){
         o._autio1.play(0);
      }
   }
}
MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
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
      if(o._tableEntities.count() > o._tableCount){
         var entity = o._tableEntities.pop();
         o._entityPool.free(entity);
      }
      var entities = o._entities;
      if(!entities.isEmpty()){
         var entity = entities.shift();
         o._tableEntities.unshift(entity);
         o.focusEntity(entity);
         var dsEvent = MO.Memory.alloc(MO.SEvent);
         dsEvent.sender = o;
         dsEvent.rank = o._rankEntities;
         dsEvent.data = o._tableEntities;
         o.processDataChangedListener(dsEvent);
         MO.Memory.free(dsEvent);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   o._mapEntity.process();
   var shapes = o._showShapes;
   var count = shapes.count();
   for(var i = count - 1; i >= 0; i--){
      var shape = shapes.at(i);
      if(shape._finish){
         shapes.erase(i)
         o._display.removeRenderable(shape);
         o._shapePool.free(shape);
      }
   }
}
MO.FEaiStatisticsInvestment_dispose = function FEaiStatisticsInvestment_dispose(){
   var o = this;
   o._entities = MO.RObject.dispose(o._entities);
   o._showShapes = MO.RObject.dispose(o._showShapes);
   o._dataTicker = MO.RObject.dispose(o._dataTicker);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiStatisticsInvestmentEntity = function FEaiStatisticsInvestmentEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._date       = RClass.register(o, new AGetter('_date'));
      o._customer   = RClass.register(o, new AGetter('_customer'));
      o._phone      = RClass.register(o, new AGetter('_phone'));
      o._card       = RClass.register(o, new AGetter('_card'));
      o._investment = RClass.register(o, new AGetter('_investment'));
      o._shape      = RClass.register(o, new AGetSet('_shape'));
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
      o = RClass.inherits(this, o, FE3dShape);
      o._ready         = false;
      o._playing       = false;
      o._finish        = false;
      o._image         = null;
      o._statusPaint   = false;
      o._cityEntity    = RClass.register(o, new AGetSet('_cityEntity'));
      o._entity        = RClass.register(o, new AGetter('_entity'));
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
      var renderable = o._renderable = RClass.create(FE3dShapeData);
      renderable.linkGraphicContext(o);
      renderable.setOptionCenter(true);
      renderable.size().set(128, 64);
      renderable.setup();
      var image = o._image = RClass.create(FImage);
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
MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   o._value        = MO.Class.register(o, new MO.AGetSet('_value'), '0');
   o._currentValue = '0';
   o._ticker       = null;
   o.onPaintLabel  = MO.FEaiStatisticsLabel_onPaintLabel;
   o.oeUpdate      = MO.FEaiStatisticsLabel_oeUpdate;
   o.construct     = MO.FEaiStatisticsLabel_construct;
   o.updateValue   = MO.FEaiStatisticsLabel_updateValue;
   o.dispose       = MO.FEaiStatisticsLabel_dispose;
   return o;
}
MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   var text = '';
   var label = o._label;
   var labelLength = label.length;
   var labelNumberH = null;
   var labelH = null;
   if(labelLength > 8){
      labelNumberH = label.substring(0, labelLength - 8);
      labelH = labelNumberH + '亿';
      text += labelH;
   }
   var labelNumberM = null;
   var labelM = null;
   if(labelLength > 4){
      labelNumberM = label.substring(labelLength - 8, labelLength - 4);
      labelM = labelNumberM + '万';
      text += labelM;
   }
   var labelNumberL = null;
   var labelL = null;
   if(labelLength > 0){
      labelNumberL = label.substring(labelLength - 4, labelLength);
      labelL = labelNumberL + '元';
      text += labelL;
   }
   var width = graphic.textWidth(text);
   var widthH = graphic.textWidth(labelH);
   var widthM = graphic.textWidth(labelM);
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   if(labelH != null){
      var textWidth = graphic.textWidth(labelNumberH);
      graphic.drawText(labelNumberH, x, y, '#FFD926');
      graphic.drawText('亿', x + textWidth, y - 1, '#00B5F6');
   }
   if(labelM != null){
      var textWidth = graphic.textWidth(labelNumberM);
      graphic.drawText(labelNumberM, x + widthH, y, '#FF7200');
      graphic.drawText('万', x + widthH + textWidth, y - 1, '#00B5F6');
   }
   if(labelL != null){
      var textWidth = graphic.textWidth(labelNumberL);
      graphic.drawText(labelNumberL, x + widthH + widthM, y, '#FD0000');
      graphic.drawText('元', x + widthH + widthM + textWidth, y - 1, '#00B5F6');
   }
}
MO.FEaiStatisticsLabel_oeUpdate = function FEaiStatisticsLabel_oeUpdate(event){
   var o = this;
   o.__base.FGuiLabel.oeUpdate.call(o, event);
   var value = o._value;
   var currentValue = o._currentValue;
   if(value != currentValue){
      if(o._ticker.process()){
         o.updateValue();
         o.dirty();
      }
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   o._ticker = new MO.TTicker(200);
}
MO.FEaiStatisticsLabel_updateValue = function FEaiStatisticsLabel_updateValue(){
   var o = this;
   var value = o._value;
   var currentValue = o._currentValue;
   var length = value.length;
   var result = '';
   var changed = false;
   for(var i = length - 1; i >= 0; i--){
      var vchar = value.charAt(i);
      vchar = parseInt(vchar);
      var cchar = currentValue.charAt(i);
      if(cchar == ''){
         cchar = 0;
      }else{
         cchar = parseInt(cchar);
      }
      if(!changed && vchar != cchar){
         cchar++;
         if(cchar > 9){
            cchar = 0;
         }
         changed = true;
      }
      result = cchar + result;
   }
   o._label = result;
   o._currentValue = result;
}
MO.FEaiStatisticsLabel_dispose = function FEaiStatisticsLabel_dispose(){
   var o = this;
   o._ticker = MO.RObject.dispose(o._ticker);
   o.__base.FGuiLabel.dispose.call(o);
}
with(MO){
   MO.FEaiStatisticsTable = function FEaiStatisticsTable(o){
      o = RClass.inherits(this, o, FEaiTable);
      o.createRow      = FEaiCityEntity_createRow;
      return o;
   }
   MO.FEaiCityEntity_createRow = function FEaiCityEntity_createRow(){
      var o = this;
      var hRow = RBuilder.appendTableRow(o._hTable);
      hRow.className = 'Investment_DataGrid_Row';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'center';
      var hCell = RBuilder.appendTableCell(hRow);
      hCell.className = 'Investment_DataGrid_Cell';
      hCell.align = 'right';
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
   o._code             = MO.EEaiScene.ChartHistory;
   o._ready            = false;
   o._mapReady         = false;
   o._playing          = false;
   o._lastTick         = 0;
   o._interval         = 10;
   o._lastDateTick     = 0;
   o._dateInterval     = 100;
   o._startDate        = null;
   o._endDate          = null;
   o._currentDate      = null;
   o._logoBar          = null;
   o._playButton       = null;
   o._pauseButton      = null;
   o._buttonTransform  = null;
   o._timeline         = null;
   o._milestoneFrame   = null;
   o._buttonAudio      = null;
   o._statusStart      = false;
   o._statusLayerCount = 150;
   o._statusLayerLevel = 150;
   o.onLoadData        = MO.FEaiChartHistoryScene_onLoadData;
   o.onDateSelect      = MO.FEaiChartHistoryScene_onDateSelect;
   o.onMilestoneDone   = MO.FEaiChartHistoryScene_onMilestoneDone;
   o.onOperationPlay   = MO.FEaiChartHistoryScene_onOperationPlay;
   o.onOperationPause  = MO.FEaiChartHistoryScene_onOperationPause;
   o.testReady         = MO.FEaiChartHistoryScene_testReady;
   o.setup             = MO.FEaiChartHistoryScene_setup;
   o.resetDate         = MO.FEaiChartHistoryScene_resetDate;
   o.selectDate        = MO.FEaiChartHistoryScene_selectDate;
   o.switchPlay        = MO.FEaiChartHistoryScene_switchPlay;
   o.active            = MO.FEaiChartHistoryScene_active;
   o.process           = MO.FEaiChartHistoryScene_process;
   o.deactive          = MO.FEaiChartHistoryScene_deactive;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.resetDate(code);
   o.selectDate(code);
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
}
MO.FEaiChartHistoryScene_onOperationPlay = function FEaiChartHistoryScene_onOperationPlay(event){
   var o = this;
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if (code == endCode) {
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var startDD = historyConsole.dates().at(0);
      MO.RDate.autoParse(o._currentDate, startDD._code);
   }
   o.switchPlay(true);
}
MO.FEaiChartHistoryScene_onOperationPause = function FEaiChartHistoryScene_onOperationPause(event){
   var o = this;
   o.switchPlay(false);
}
MO.FEaiChartHistoryScene_testReady = function FEaiChartHistoryScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._readyProvince){
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
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var startDD = historyConsole.dates().at(0);
   var endDD = historyConsole.dates().at(historyConsole.dates().count() - 1);
   o._currentDate.parseAuto(startDD._code);
   o._startDate.parseAuto(startDD._code);
   o._endDate.parseAuto(endDD._code);
   o._citysRangeRenderable.setVisible(false);
   o._citysRenderable.setVisible(false);
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.history.LogoBar');
   frame.setLocation(5, 5);
   o._guiManager.register(frame);
   var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(30, 300);
   control.setSize(120, 120);
   control.setBackResource('url:/script/ars/eai/city-level.png');
   control.psInitialize();
   control.build();
   control.setVisible(true);
   o._guiManager.register(control);
   var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/player.png');
   control.psInitialize();
   control.build();
   control.setVisible(true);
   control.addOperationDownListener(o, o.onOperationPlay);
   var control = o._pauseButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/pause.png');
   control.psInitialize();
   control.build();
   control.setVisible(false);
   control.addOperationDownListener(o, o.onOperationPause);
   var audio = o._buttonAudio = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/button.mp3');
   var transform = o._buttonTransform = MO.Class.create(MO.FGuiChangeTransform);
   transform.setInterval(10);
   transform.setScale(0.1);
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   var milestoneBars = o._milestoneBars = new MO.TObjects();
   var count = milestones.count();
   for(var i = 0; i < count; i++){
      var milestone = milestones.at(i);
      var frame = MO.Console.find(MO.FGuiFrameConsole).create(o, 'eai.chart.MilestoneBar');
      frame.setDockCd(MO.EGuiDock.Right)
      frame.setTop(40 + 100 * i);
      frame.setRight(20);
      var date = new MO.TDate();
      date.parse(milestone.code());
      frame.findComponent('date').setLabel(date.format('YYYY/MM/DD'));
      var label = null;
      var milestoneInvestmentTotal = milestone.investmentTotal();
      if(milestoneInvestmentTotal >= 10000){
         label = parseInt(milestoneInvestmentTotal / 10000) + '亿';
      }else{
         label = parseInt(milestoneInvestmentTotal) + '万';
      }
      frame.findComponent('total').setLabel(label);
      o._guiManager.register(frame);
      milestoneBars.push(frame);
   }
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiHistoryTimeline);
   timeline.linkGraphicContext(o);
   timeline.setName('Timeline');
   timeline.setDockCd(MO.EGuiDock.Bottom);
   timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
   timeline.setLeft(50);
   timeline.setRight(450);
   timeline.setBottom(50);
   timeline.setHeight(500);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.build();
   o._guiManager.register(timeline);
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.setVisible(false);
   milestoneFrame.setLeft(MO.Eai.Canvas.logicSize().width / 2 - 360);
   milestoneFrame.setTop(50);
   milestoneFrame.setWidth(720);
   milestoneFrame.setHeight(700);
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
   milestoneFrame.build();
   milestoneFrame.setup();
   o._guiManager.register(milestoneFrame);
   o._guiManager.hide();
}
MO.FEaiChartHistoryScene_resetDate = function FEaiChartHistoryScene_resetDate(){
   var o = this;
   var cityEntities = o._mapEntity.cityEntities();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   var milestone = historyConsole.milestones().get(code);
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
      var cityEntities = o._mapEntity.cityEntities();
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
      controlInvestment.setLabel(parseInt(dateData.investmentTotal()).toString());
   }
}
MO.FEaiChartHistoryScene_switchPlay = function FEaiChartHistoryScene_switchPlay(flag){
   var o = this;
   var transform = o._buttonTransform;
   o._playing = flag;
   o._buttonAudio.play(0);
   if(flag){
      o._playButton.setVisible(false);
      o._pauseButton.setVisible(true);
   }else{
      o._playButton.setVisible(true);
      o._pauseButton.setVisible(false);
   }
}
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartHistoryScene_process = function FEaiChartHistoryScene_process() {
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
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
            o.switchPlay(true);
            o._statusStart = true;
         }
      }
   }
   if (o._playing) {
      if(!o._mapEntity._countryEntity.introAnimeDone()){
         o._mapEntity._countryEntity.process();
         return;
      }
      if(!o._mapReady){
         o._citysRangeRenderable.setVisible(true);
         o._citysRenderable.setVisible(true);
         o._guiManager.show();
         o._milestoneFrame.setVisible(false);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if(currentTick - o._lastTick > o._interval) {
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if (code == endCode) {
               o.switchPlay(false);
            }
            o._lastDateTick = currentTick;
            o._mapEntity.upload();
         }
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.dirty();
         o._lastTick = currentTick;
      }
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.dirty();
   }
}
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive() {
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
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
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
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._readyProvince        = false;
   o._nowDate              = null;
   o._nowTicker            = null;
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   o._countryData          = null;
   o._countryBorderDisplay = null;
   o._countryDisplay       = null;
   o._citysRangeRenderable = null;
   o._citysRenderable      = null;
   o._titleBar             = null;
   o._flagSprite           = null;
   o._groundAutioUrl       = '/script/ars/eai/ground.mp3';
   o._groundAutio          = null;
   o.onLoadData            = MO.FEaiChartScene_onLoadData;
   o.onLoadTemplate        = MO.FEaiChartScene_onLoadTemplate;
   o.construct             = MO.FEaiChartScene_construct;
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
   o.processResize         = MO.FEaiChartScene_processResize;
   o.process               = MO.FEaiChartScene_process;
   o.deactive              = MO.FEaiChartScene_deactive;
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var countryDisplay = o._countryDisplay;
   var countryBorderDisplay = o._countryBorderDisplay;
   var mapEntity = o._mapEntity;
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntityConsole = MO.Console.find(MO.FEaiEntityConsole).provinceConsole();
   var provinceEntities = mapEntity.provinceEntities();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setMapEntity(mapEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      provinceEntities.set(province.code(), provinceEntity);
      provinceEntityConsole.push(provinceEntity);
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   o._readyProvince = true;
   o._mapEntity.countryEntity().setup(provinceEntities);
   o.processResize();
}
MO.FEaiChartScene_onLoadTemplate = function FEaiChartScene_onLoadTemplate(event){
   var o = this;
   var template = event.template;
}
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(10000);
   o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
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
   var context = o.graphicContext();
   var contextSize = context.size();
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRangeRenderable.matrix());
   stage.cityRangeLayer().push(citysRangeRenderable);
   o._mapEntity.setCitysRangeRenderable(citysRangeRenderable);
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRenderable.matrix());
   stage.cityLayer().push(citysRenderable);
   o._mapEntity.setCitysRenderable(citysRenderable);
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntities = o._mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setStage(o._activeStage);
      cityEntity.setRenderable(citysRenderable);
      cityEntity.setData(city);
      cityEntity.build(context);
      cityEntities.set(city.code(), cityEntity);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
      cityEntityConsole.push(cityEntity);
   }
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   var audio = o._groundAutio = MO.Class.create(MO.FAudio);
   audio.loadUrl(o._groundAutioUrl);
   audio.setVolume(0.2);
   audio.play();
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
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
   o.fixMatrix(o._countryDisplay.matrix());
   o.fixMatrix(o._countryBorderDisplay.matrix());
   o.fixMatrix(o._citysRangeRenderable.matrix());
   o.fixMatrix(o._citysRenderable.matrix());
}
MO.FEaiChartScene_process = function FEaiChartScene_process(){
   var o = this;
   o.__base.FEaiScene.process.call(o);
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._nowDate = RObject.dispose(o._nowDate);
   o._nowTicker = RObject.dispose(o._nowTicker);
   o._mapEntity = RObject.dispose(o._mapEntity);
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._groundLayer    = MO.RClass.register(o, new MO.AGetter('_groundLayer'));
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
   var layer = o._groundLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('GroundLayer', layer);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('MapLayer', layer);
   var layer = o._borderLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   var layer = o._cityRangeLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   var layer = o._cityLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   var layer = o._dataLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('DataLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('FaceLayer', layer);
}
MO.FEaiChartStatisticsScene = function FEaiChartStatisticsScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                  = MO.EEaiScene.ChartStatistics;
   o._investment            = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent     = 0;
   o._ready                 = false;
   o._playing               = false;
   o._lastTick              = 0;
   o._interval              = 10;
   o._24HLastTick           = 0;
   o._24HTrendInterval      = 1000 * 60 * 5;
   o._startDate             = null;
   o._endDate               = null;
   o._currentDate           = null;
   o._logoBar               = null;
   o._timeline              = null;
   o._liveTable             = null;
   o._livePop               = null;
   o._statusStart           = false;
   o._statusLayerCount      = 150;
   o._statusLayerLevel      = 150;
   o._statusDesktopShow     = false;
   o._groundAutioUrl        = '/script/ars/eai/music/statistics.mp3';
   o.onLiveTableChanged     = MO.FEaiChartStatisticsScene_onLiveTableChanged;
   o.testReady              = MO.FEaiChartStatisticsScene_testReady;
   o.setup                  = MO.FEaiChartStatisticsScene_setup;
   o.fixMatrix              = MO.FEaiChartStatisticsScene_fixMatrix;
   o.processResize          = MO.FEaiChartStatisticsScene_processResize;
   o.process                = MO.FEaiChartStatisticsScene_process;
   return o;
}
MO.FEaiChartStatisticsScene_onLiveTableChanged = function FEaiChartStatisticsScene_onLiveTableChanged(event) {
   var o = this;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.setData(event.data);
   table.dirty();
}
MO.FEaiChartStatisticsScene_testReady = function FEaiChartStatisticsScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._readyProvince){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiChartStatisticsScene_setup = function FEaiChartStatisticsScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var faceLayer = o._activeStage.faceLayer();
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(5, 5);
   o._guiManager.register(frame);
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onLiveTableChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
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
}
MO.FEaiChartStatisticsScene_fixMatrix = function FEaiChartStatisticsScene_fixMatrix(matrix){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      if(MO.RBrowser.isOrientationVertical()){
         matrix.tx = -14.58;
         matrix.ty = -2.2;
         matrix.tz = 0;
         matrix.setScale(0.14, 0.16, 0.14);
      }else{
         matrix.tx = -36.8;
         matrix.ty = -11.6;
         matrix.tz = 0;
         matrix.setScale(0.3, 0.33, 0.3);
      }
   }else{
      matrix.tx = -38;
      matrix.ty = -13.2;
      matrix.tz = 0;
      matrix.setScale(0.32, 0.36, 0.32);
   }
   matrix.update();
}
MO.FEaiChartStatisticsScene_processResize = function FEaiChartStatisticsScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   o.fixMatrix(o._investment.display().matrix());
   var frame = o._logoBar;
   if(MO.RBrowser.isOrientationVertical()){
   }else{
   }
   var timeline = o._timeline;
   if(MO.RBrowser.isOrientationVertical()){
      timeline.setDockCd(MO.EGuiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(830);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EGuiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      if(MO.Runtime.isPlatformMobile()){
         timeline.setRight(680);
      }else{
         timeline.setRight(640);
      }
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(MO.RBrowser.isOrientationVertical()){
      liveTable.setDockCd(MO.EGuiDock.Bottom);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(800);
   }else{
      liveTable.setDockCd(MO.EGuiDock.Right);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      if(MO.Runtime.isPlatformMobile()){
         liveTable.setWidth(660);
      }else{
         liveTable.setWidth(600);
      }
   }
}
MO.FEaiChartStatisticsScene_process = function FEaiChartStatisticsScene_process() {
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
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
            o._mapEntity.countryEntity().start();
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   if (o._playing) {
      if(!o._mapEntity._countryEntity.introAnimeDone()){
         o._mapEntity._countryEntity.process();
         return;
      }
      if(!o._statusDesktopShow){
         o._guiManager.show();
         o._statusDesktopShow = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._investment.process();
      var logoBar = o._logoBar;
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
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
   o._optionDebug           = false;
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o._engineInfo            = null;
   o.onOperationResize      = MO.FEaiScene_onOperationResize;
   o.onOperationOrientation = MO.FEaiScene_onOperationOrientation;
   o.onProcess              = MO.FEaiScene_onProcess;
   o.construct              = MO.FEaiScene_construct;
   o.setup                  = MO.FEaiScene_setup;
   o.active                 = MO.FEaiScene_active;
   o.deactive               = MO.FEaiScene_deactive;
   o.processResize          = MO.FEaiScene_processResize;
   o.processEvent           = MO.FEaiScene_processEvent;
   o.dispose                = MO.FEaiScene_dispose;
   return o;
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
MO.FEaiScene_onProcess = function FEaiScene_onProcess(){
   var o = this;
   o.__base.FScene.onProcess.call(o);
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
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   if(o._optionDebug){
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 300);
      control.build();
      guiManager.register(control);
   }
}
MO.FEaiScene_active = function FEaiScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   if(o._optionDebug){
      o._engineInfo.setStage(stage);
   }
   MO.Eai.Canvas.selectStage(stage);
}
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   MO.Eai.Canvas.selectStage(null);
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
   o._sceneStatistics  = MO.Class.register(o, new MO.AGetter('_sceneStatistics'));
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
   var scene = o._sceneStatistics = MO.RClass.create(MO.FEaiChartStatisticsScene);
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
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
}
MO.FEaiApplication_processResize = function FEaiApplication_processResize(){
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
with(MO){
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._scaleRate       = 1;
      o._optionAlpha     = false;
      o._optionAntialias = false;
      o._activeStage     = RClass.register(o, new AGetter('_activeStage'));
      o._capturePosition = null;
      o._captureRotation = null;
      o.construct        = FEaiCanvas_construct;
      o.resize           = FEaiCanvas_resize;
      o.selectStage      = FEaiCanvas_selectStage;
      o.dispose          = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
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
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
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
      o.createCanvas    = FEaiChartApplication_createCanvas;
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
   MO.FEaiChartApplication_createCanvas = function FEaiChartApplication_createCanvas(){
      return RClass.create(FEaiChartCanvas);
   }
   MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
      var o = this;
      o.__base.FEaiApplication.setup.call(o, hPanel);
      o._hPanel = hPanel;
      var desktop = o._desktop = MO.RClass.create(MO.FEaiChartDesktop);
      desktop.build(hPanel);
      var canvas = MO.Eai.Canvas = desktop.canvas3d();
      o.linkGraphicContext(canvas);
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
      resourceConsole.addLoadListener(o, o.onLoadResource);
      if(o._sceneCode == MO.EEaiScene.ChartStatistics){
         resourceConsole.load('/chart-live.dat');
      }else if(o._sceneCode == MO.EEaiScene.ChartHistory){
         resourceConsole.load('/chart-history.dat');
      }else{
         throw new TError('Scene code is invalid.');
      }
      o.processResize();
   }
   MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
      var o = this;
      o._chapterLoading = RObject.dispose(o._chapterLoading);
      o._chapterChart = RObject.dispose(o._chapterChart);
      o.__base.FEaiApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiChartCanvas = function FEaiChartCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      o._optionStageProcess = false;
      o._optionResize       = false;
      o._optionMouseCapture = false;
      o._optionAlpha        = true;
      o._optionAntialias    = true;
      o._capturePosition    = null;
      o._cameraPosition     = null;
      o.construct           = FEaiChartCanvas_construct;
      o.setPanel            = FEaiChartCanvas_setPanel;
      o.dispose             = FEaiChartCanvas_dispose;
      return o;
   }
   MO.FEaiChartCanvas_construct = function FEaiChartCanvas_construct(){
      var o = this;
      o.__base.FEaiCanvas.construct.call(o);
      o._logicSize = new SSize2(1920, 1080);
      o._cameraPosition = new SPoint3();
   }
   MO.FEaiChartCanvas_setPanel = function FEaiChartCanvas_setPanel(hPanel){
      var o = this;
      o._hPanel = hPanel;
      hPanel.appendChild(o._hCanvas);
   }
   MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
      var o = this;
      o._cameraPosition = RObject.dispose(o._cameraPosition);
      o.__base.FEaiCanvas.dispose.call(o);
   }
}
MO.FEaiChartDesktop = function FEaiChartDesktop(o){
   o = MO.Class.inherits(this, o, MO.FEaiDesktop);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FEaiChartDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEaiChartDesktop_onOperationOrientation;
   o.construct              = MO.FEaiChartDesktop_construct;
   o.build                  = MO.FEaiChartDesktop_build;
   o.resize                 = MO.FEaiChartDesktop_resize;
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
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FEaiChartCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FEaiChartDesktop_resize = function FEaiChartDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
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
   o._canvas3d.resize(width, height);
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.context().setScale(sizeRate, sizeRate);
}
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.RObject.dispose(o._canvas3d);
   o._canvas2d = MO.RObject.dispose(o._canvas2d);
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
   o._screenSize.set(0, 0);
}
MO.FEaiDesktop_dispose = function FEaiDesktop_dispose(){
   var o = this;
   o.__base.FDesktop.dispose.call(o);
}
with(MO){
   MO.FEaiFlatCanvas = function FEaiFlatCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      o._capturePosition    = null;
      o._cameraPosition     = null;
      o.onEnterFrame        = FEaiFlatCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiFlatCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiFlatCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiFlatCanvas_onMouseCaptureStop;
      o.construct           = FEaiFlatCanvas_construct;
      o.setPanel            = FEaiFlatCanvas_setPanel;
      o.dispose             = FEaiFlatCanvas_dispose;
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
      o.createCanvas    = FEaiPlatformApplication_createCanvas;
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
}
with(MO){
   MO.FEaiPlatformCanvas = function FEaiPlatformCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FEaiPlatformCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiPlatformCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiPlatformCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiPlatformCanvas_onMouseCaptureStop;
      o.construct           = FEaiPlatformCanvas_construct;
      o.dispose             = FEaiPlatformCanvas_dispose;
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
}
MO.Eai.setup = function Eai_setup(clazz, hPanel){
}
