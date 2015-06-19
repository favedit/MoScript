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
      o._provinces  = RClass.register(o, new AGetter('_provinces'));
      o.construct   = FEaiProvinceResourceConsole_construct;
      o.unserialize = FEaiProvinceResourceConsole_unserialize;
      o.dispose     = FEaiProvinceResourceConsole_dispose;
      return o;
   }
   MO.FEaiProvinceResourceConsole_construct = function FEaiProvinceResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._provinces = new TDictionary();
   }
   MO.FEaiProvinceResourceConsole_unserialize = function FEaiProvinceResourceConsole_unserialize(input){
      var o = this;
      var provinces = o._provinces;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceResource);
         province.unserialize(input);
         provinces.set(province.code(), province);
      }
   }
   MO.FEaiProvinceResourceConsole_dispose = function FEaiProvinceResourceConsole_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
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
