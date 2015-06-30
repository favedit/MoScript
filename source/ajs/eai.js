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
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line = 0;
   o.Map  = 1;
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
with(MO){
   MO.FEaiHistoryResourceConsole = function FEaiHistoryResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._investmentDay           = RClass.register(o, new AGetter('_investmentDay'));
      o._investmentTotal         = RClass.register(o, new AGetter('_investmentTotal'));
      o._investmentProvinceDay   = RClass.register(o, new AGetter('_investmentProvinceDay'));
      o._investmentProvinceTotal = RClass.register(o, new AGetter('_investmentProvinceTotal'));
      o._investmentCityDay       = RClass.register(o, new AGetter('_investmentCityDay'));
      o._investmentCityTotal     = RClass.register(o, new AGetter('_investmentCityTotal'));
      o._provinces               = RClass.register(o, new AGetter('_provinces'));
      o._citys                   = RClass.register(o, new AGetter('_citys'));
      o._milestones              = RClass.register(o, new AGetter('_milestones'));
      o._dates                   = RClass.register(o, new AGetter('_dates'));
      o.construct                = FEaiHistoryResourceConsole_construct;
      o.unserialize              = FEaiHistoryResourceConsole_unserialize;
      o.dispose                  = FEaiHistoryResourceConsole_dispose;
      return o;
   }
   MO.FEaiHistoryResourceConsole_construct = function FEaiHistoryResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._provinces = new TDictionary();
      o._citys = new TDictionary();
      o._milestones = new TDictionary();
      o._dates = new TDictionary();
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
         var province = RClass.create(FEaiHistoryProvinceResource);
         province.unserialize(input);
         o._provinces.set(province.code(), province);
      }
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiHistoryCityResource);
         city.unserialize(input);
         o._citys.set(city.code(), city);
      }
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var milestone = RClass.create(FEaiHistoryMilestoneResource);
         milestone.unserialize(input);
         o._milestones.set(milestone.code(), milestone);
      }
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var date = RClass.create(FEaiHistoryDateResource);
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
   o._rateConsole = MO.RClass.create(MO.FEaiRateResourceConsole);
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceResourceConsole);
   o._cityConsole = MO.RClass.create(MO.FEaiCityResourceConsole);
   o._historyConsole = MO.RClass.create(MO.FEaiHistoryResourceConsole);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._rateConsole.unserialize(input);
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
   o._rateConsole = RObject.dispose(o._rateConsole);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._historyConsole = RObject.dispose(o._historyConsole);
   o.__base.FConsole.dispose.call(o);
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
      if(parameters){
         url += '?' + parameters;
      }
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
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._visible              = RClass.register(o, new AGetter('_visible'), false);
      o._location             = RClass.register(o, new AGetter('_location'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._color                = RClass.register(o, new AGetter('_color'));
      o._range                = RClass.register(o, new AGetter('_range'), 1);
      o._rangeColor           = RClass.register(o, new AGetter('_rangeColor'));
      o._investmentCount      = 0;
      o._investmentTotal      = RClass.register(o, new AGetSet('_investmentTotal'));
      o._investmentLevelTotal = 10000;
      o._investmentLevel      = 0;
      o._data                 = RClass.register(o, new AGetSet('_data'));
      o.construct             = FEaiCityEntity_construct;
      o.build                 = FEaiCityEntity_build;
      o.addInvestmentTotal    = FEaiCityEntity_addInvestmentTotal;
      o.update                = FEaiCityEntity_update;
      o.process               = FEaiCityEntity_process;
      o.dispose               = FEaiCityEntity_dispose;
      return o;
   }
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(0, 0, 0, 0);
      o._rangeColor = new SColor4(0, 0, 0, 0);
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
      o._visible = true;
   }
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var range = 1;
      o._visible = true;
      o._color.set(1, 1, 1, 1);
      o._rangeColor.set(1, 1, 1, 1);
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 4;
         var color = rateInfo.findRate(rate);
         range = rate * 6;
         rate = RFloat.toRange(rate, 0, 1);
         o._rangeColor.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 1);
      }else{
         o._rangeColor.set(0, 0, 0, 0);
      }
      o._range = RFloat.toRange(Math.sqrt(range), 1, 6);
   }
   MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
      var o = this;
      if(o._investmentLevel > 0){
         var rate = o._investmentLevel / o._investmentLevelTotal;
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
      o.__base.FEaiEntity.dispose.call(o);
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
         var range = city._range * 255;
         if(city.visible()){
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
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   o.construct             = MO.FEaiMapEntity_construct;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.upload                = MO.FEaiMapEntity_upload;
   o.process               = MO.FEaiMapEntity_process;
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
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
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o._layerDepth       = 3;
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
         colors[colorIndex++] = 0xC1;
         colors[colorIndex++] = 0xED;
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
with(MO){
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
      o.construct = FGuiHistoryMilestoneFrame_construct;
      o.onPaintBegin = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show = FGuiHistoryMilestoneFrame_show;
      o.dispose = FGuiHistoryMilestoneFrame_dispose;
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
      return o;
   }
   MO.FGuiHistoryMilestoneFrame_construct = function FGuiHistoryMilestoneFrame_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
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
      var o = this;
      o.repaint();
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
         var passedTick = MO.Timer.current() - o._startTick;
         var showTick = passedTick - o._popDuration;
         var closeTick = passedTick - o._showDuration - o._popDuration;
         var slideDistance = (MO.Eai.Canvas.logicSize().width + rectangle.width) / 2;
         if (passedTick < o._popDuration) {
            p = passedTick / o._popDuration;
            p = 1 - (1 - p) * (1 - p);
            o.setLeft(-rectangle.width + slideDistance * p);
         }
         else if (showTick < o._showDuration) {
         }
         else if (closeTick < o._closeDuration) {
            p = closeTick / o._closeDuration;
            p = p * p;
            o.setLeft((MO.Eai.Canvas.logicSize().width - rectangle.width) / 2 + slideDistance * p);
         }
         else {
            o._data = null;
            o.setVisible(false);
            var dsEvent = MO.Memory.alloc(SEvent);
            dsEvent.sender = o;
            o.processDataChangedListener(dsEvent);
         }
      }
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvestment = function FEaiStatisticsInvestment(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._dateSetup       = false;
      o._beginDate       = MO.Class.register(o, new AGetter('_beginDate'));
      o._endDate         = MO.Class.register(o, new AGetter('_endDate'));
      o._invementCurrent = MO.Class.register(o, new AGetter('_invementCurrent'), 0);
      o._invementTotal   = MO.Class.register(o, new AGetter('_invementTotal'));
      o._intervalMinute  = 1;
      o._mapEntity       = MO.Class.register(o, new AGetSet('_mapEntity'));
      o._display         = MO.Class.register(o, new AGetter('_display'));
      o._entities        = MO.Class.register(o, new AGetter('_entities'));
      o._tableEntities   = MO.Class.register(o, new AGetter('_tableEntities'));
      o._showShapes      = MO.Class.register(o, new AGetter('_showShapes'));
      o._tableCount      = 22;
      o._tableInterval   = 1000;
      o._tableTick       = 1;
      o._dataTicker      = null;
      o._entityPool      = null;
      o._shapePool       = null;
      o.onInvestment     = FEaiStatisticsInvestment_onInvestment;
      o.construct        = FEaiStatisticsInvestment_construct;
      o.allocEntity      = FEaiStatisticsInvestment_allocEntity;
      o.allocShape       = FEaiStatisticsInvestment_allocShape;
      o.setup            = FEaiStatisticsInvestment_setup;
      o.focusEntity      = FEaiStatisticsInvestment_focusEntity;
      o.process          = FEaiStatisticsInvestment_process;
      o.dispose          = FEaiStatisticsInvestment_dispose;
      return o;
   }
   MO.FEaiStatisticsInvestment_onInvestment = function FEaiStatisticsInvestment_onInvestment(event){
      var o = this;
      var content = event.content;
      o._invementTotal = content.investment_total;
      var dataset = content.collection;
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = o.allocEntity();
         entity.loadData(row);
         o._entities.push(entity);
      }
      var entityCount = o._entities.count();
      o._tableInterval = 1000 * 60 * o._intervalMinute / entityCount;
      o._tableTick = 0;
   }
   MO.FEaiStatisticsInvestment_construct = function FEaiStatisticsInvestment_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._beginDate = new TDate();
      o._endDate = new TDate();
      o._entities = new TObjects();
      o._showShapes = new TObjects();
      o._tableEntities = new TObjects();
      o._tableTicker = new TTicker(1000 * o._tableInterval);
      o._dataTicker = new TTicker(1000 * 60 * o._intervalMinute);
      var table = o._dataTable = MO.Class.create(MO.FEaiStatisticsTable);
      table._hTable = document.getElementById('id_investment');
      table._headLineCount = 1;
      o._entityPool = RClass.create(FObjectPool);
      o._shapePool = RClass.create(FObjectPool);
   }
   MO.FEaiStatisticsInvestment_allocEntity = function FEaiStatisticsInvestment_allocEntity(){
      var o = this;
      var entity = o._entityPool.alloc();
      if(!entity){
         entity = RClass.create(FEaiStatisticsInvestmentEntity);
      }
      return entity;
   }
   MO.FEaiStatisticsInvestment_allocShape = function FEaiStatisticsInvestment_allocShape(){
      var o = this;
      var shape = o._shapePool.alloc();
      if(!shape){
         shape = RClass.create(FEaiStatisticsInvestmentShape);
         shape.linkGraphicContext(o);
         shape.setup();
      }
      return shape;
   }
   MO.FEaiStatisticsInvestment_setup = function FEaiStatisticsInvestment_setup(){
      var o = this;
      var display = o._display = RClass.create(FE3dDisplay);
      display.linkGraphicContext(o);
   }
   MO.FEaiStatisticsInvestment_focusEntity = function FEaiStatisticsInvestment_focusEntity(entity){
      var o = this;
      var card = entity.card();
      var investment = entity.investment();
      var cityConsole = RConsole.find(FEaiResourceConsole).cityConsole();
      var cityEntity = o._mapEntity.findCityByCard(card);
      if(cityEntity){
         cityEntity.addInvestmentTotal(investment);
         o._mapEntity.upload();
      }
   }
   MO.FEaiStatisticsInvestment_process = function FEaiStatisticsInvestment_process(){
      var o = this;
      var system = RConsole.find(FEaiLogicConsole).system();
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
         var statistics = RConsole.find(FEaiLogicConsole).statistics();
         var beginDate = o._beginDate;
         var endDate = o._endDate;
         beginDate.assign(endDate);
         endDate.assign(systemDate);
         statistics.doInvestmentDynamic(o, o.onInvestment, beginDate.format(), endDate.format());
         beginDate.assign(endDate);
      }
      var currentTick = RTimer.current();
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
            var table = o._dataTable;
            var count = o._tableEntities.count();
            table.setDataCount(count);
            var date = new MO.TDate();
            for(var i = 0; i < count; i++){
               var entity = o._tableEntities.at(i);
               var row = table.dataRow(i);
               date.parse(entity.date());
               row.cells[0].innerHTML = date.format('HH24:MI:SS');
               var cityEntity = o._mapEntity.findCityByCard(entity.card());
               if(cityEntity){
                  row.cells[1].innerHTML = cityEntity.data().label();
               }else{
                  row.cells[1].innerHTML = '';
               }
               row.cells[2].innerHTML = entity.customer() + ' - ' + entity.phone();
               var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
               if(investment.length > 7){
                  var high = investment.substring(0, investment.length - 7);
                  var low = investment.substring(investment.length - 7, investment.length);
                  row.cells[3].innerHTML = '<FONT color="#FF4482">' + high + '</FONT>' + low;
               }else{
                  row.cells[3].innerHTML = investment;
               }
            }
         }
         var count = entities.count();
         o._invementCurrent = o._invementTotal;
         for(var i = 0; i < count; i++){
            var entity = entities.at(i);
            o._invementCurrent -= entity.investment()
         }
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
      o._entities = RObject.dispose(o._entities);
      o._showShapes = RObject.dispose(o._showShapes);
      o._dataTicker = RObject.dispose(o._dataTicker);
      o.__base.FObject.dispose.call(o);
   }
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
with(MO){
   MO.FEaiStatisticsLabel = function FEaiStatisticsLabel(o){
      o = RClass.inherits(this, o, FGuiLabel);
      o._value        = RClass.register(o, new AGetSet('_value'), '0');
      o._currentValue = '0';
      o._ticker       = null;
      o.onPaintLabel = FEaiStatisticsLabel_onPaintLabel;
      o.construct    = FEaiStatisticsLabel_construct;
      o.updateValue  = FEaiStatisticsLabel_updateValue;
      o.process      = FEaiStatisticsLabel_process;
      return o;
   }
   MO.FEaiStatisticsLabel_onPaintLabel = function FEaiStatisticsLabel_onPaintLabel(event){
      var o = this;
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      if(o._foreFont){
         graphic.setFont(o._foreFont);
      }
      var label = o._label;
      var labelLength = label.length;
      var labelH = null;
      if(labelLength > 8){
         labelH = label.substring(0, labelLength - 8);
      }
      var labelM = null;
      if(labelLength > 4){
         labelM = label.substring(labelLength - 8, labelLength - 4);
      }
      var labelL = null;
      if(labelLength > 0){
         labelL = label.substring(labelLength - 4, labelLength);
      }
      var width = graphic.textWidth(label);
      var widthH = graphic.textWidth(labelH);
      var widthM = graphic.textWidth(labelM);
      var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
      var y = rectangle.top + rectangle.height * 0.5 + 3;
      if(labelH != null){
         graphic.drawText(labelH, x, y, '#FD0000');
      }
      if(labelM != null){
         graphic.drawText(labelM, x + widthH, y, '#FF7200');
      }
      if(labelL != null){
         graphic.drawText(labelL, x + widthH + widthM, y, '#FFD926');
      }
   }
   MO.FEaiStatisticsLabel_construct = function FEaiStatisticsLabel_construct(){
      var o = this;
      o.__base.FGuiLabel.construct.call(o);
      o._ticker = new TTicker(200);
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
   MO.FEaiStatisticsLabel_process = function FEaiStatisticsLabel_process(event){
      var o = this;
      var value = o._value;
      var currentValue = o._currentValue;
      if(value != currentValue){
         if(o._ticker.process()){
            o.updateValue();
            return true;
         }
      }
      return false;
   }
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
   o._playing          = false;
   o._lastTick         = 0;
   o._interval         = 10;
   o._lastDateTick     = 0;
   o._dateInterval     = 100;
   o._startDate        = null;
   o._endDate          = null;
   o._currentDate      = null;
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
   var faceLayer = o._activeStage.faceLayer();
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var startDD = historyConsole.dates().at(0);
   var endDD = historyConsole.dates().at(historyConsole.dates().count() - 1);
   o._currentDate.parseAuto(startDD._code);
   o._startDate.parseAuto(startDD._code);
   o._endDate.parseAuto(endDD._code);
   var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/player.png');
   control.psInitialize();
   control.build();
   control.setVisible(true);
   control.addOperationDownListener(o, o.onOperationPlay);
   o._desktop.register(control);
   faceLayer.push(control);
   var control = o._pauseButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/pause.png');
   control.psInitialize();
   control.build();
   control.setVisible(false);
   control.addOperationDownListener(o, o.onOperationPause);
   o._desktop.register(control);
   faceLayer.push(control);
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
      frame.setLocation(0, 25 + 90 * i);
      var date = new MO.TDate();
      date.parse(milestone.code());
      frame.findComponent('date').setLabel(date.format('YYYY/MM/DD'));
      frame.findComponent('total').setLabel(parseInt(milestone.investmentTotal()) + '亿');
      faceLayer.push(frame);
      o._desktop.register(frame);
      milestoneBars.push(frame);
   }
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiChartTimeline);
   timeline.setName('Timeline');
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas.logicSize().height - 550);
   timeline.setWidth(MO.Eai.Canvas.logicSize().width - 300);
   timeline.setHeight(500);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   faceLayer.push(timeline);
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.setLeft(MO.Eai.Canvas.logicSize().width / 2 - 360);
   milestoneFrame.setTop(50);
   milestoneFrame.setWidth(720);
   milestoneFrame.setHeight(700);
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.build();
   o._desktop.register(milestoneFrame);
   faceLayer.push(milestoneFrame);
   milestoneFrame.setVisible(false);
}
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   var milestone = historyConsole.milestones().get(code);
   if (milestone) {
      o._milestoneFrame.setData(milestone);
      o._milestoneFrame.show();
      o._milestoneFrame.repaint();
      o.switchPlay(false);
   }
   if (dateData) {
      o._timeline.setDegreeTime(o._currentDate);
      var cityDatas = dateData.citys();
      var cityEntities = o._mapEntity.cityEntities();
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var total = o._totalBar.findComponent('total');
      total.setLabel(parseInt(dateData.investmentTotal()).toString());
      o._totalBar.repaint();
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
      var currentTick = MO.Timer.current();
      if (currentTick - o._lastTick > o._interval) {
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if (code == endCode) {
               o.switchPlay(false);
            }
            o._lastDateTick = currentTick;
         }
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.repaint();
         o._lastTick = currentTick;
      }
      o._mapEntity.upload();
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.repaint();
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
   var timeline = o._timeline = MO.RClass.create(MO.FGuiChartTimeline);
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
   o._logoBar              = null;
   o._titleBar             = null;
   o._totalBar             = null;
   o._groundAutioUrl       = '/script/ars/eai/ground.mp3';
   o._groundAutio          = null;
   o.onLoadData            = MO.FEaiChartScene_onLoadData;
   o.construct             = MO.FEaiChartScene_construct;
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
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
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntities = o._mapEntity.provinceEntities();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      provinceEntities.set(province.code(), provinceEntity);
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   o._readyProvince = true;
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
   var control = o._background = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.size().assign(MO.Eai.Canvas.screenSize());
   control.size().set(1920, 1080);
   control.setBackResource('url:/script/ars/eai/background.png');
   control.psInitialize();
   control.build();
   control.renderable().setOptionFull(true);
   o._desktop.register(control);
   stage.groundLayer().push(control);
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
   var cityEntities = o._mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(context);
      cityEntities.set(city.code(), cityEntity);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
   }
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(10, 10);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   var frame = o._totalBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.TotalBar');
   frame.setLocation(650, 20);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   var audio = o._groundAutio = MO.Class.create(MO.FAudio);
   audio.loadUrl(o._groundAutioUrl);
   audio.setVolume(0.5);
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
MO.FEaiChartScene_process = function FEaiChartScene_process(){
   var o = this;
   o.__base.FEaiScene.process.call(o);
   if(o._nowTicker.process()){
      var bar = o._logoBar;
      var date = o._nowDate;
      date.setNow();
      var dateControl = bar.findComponent('date');
      dateControl.setLabel(date.format('YYYY/MM/DD'));
      var timeControl = bar.findComponent('time');
      timeControl.setLabel(date.format('HH24:MI'));
      bar.repaint();
   }
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
   o._code              = MO.EEaiScene.ChartStatistics;
   o._investment        = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent = 0;
   o._ready             = false;
   o._playing           = false;
   o._lastTick          = 0;
   o._interval          = 10;
   o._startDate         = null;
   o._endDate           = null;
   o._currentDate       = null;
   o._timeline          = null;
   o._statusStart       = false;
   o._statusLayerCount  = 150;
   o._statusLayerLevel  = 150;
   o._groundAutioUrl    = '/script/ars/eai/music/statistics.mp3';
   o.onLoadData         = MO.FEaiChartStatisticsScene_onLoadData;
   o.onDateSelect       = MO.FEaiChartStatisticsScene_onDateSelect;
   o.onOperationPlay    = MO.FEaiChartStatisticsScene_onOperationPlay;
   o.onOperationPause   = MO.FEaiChartStatisticsScene_onOperationPause;
   o.testReady          = MO.FEaiChartStatisticsScene_testReady;
   o.setup              = MO.FEaiChartStatisticsScene_setup;
   o.fixMatrix          = MO.FEaiChartStatisticsScene_fixMatrix;
   o.selectDate         = MO.FEaiChartStatisticsScene_selectDate;
   o.active             = MO.FEaiChartStatisticsScene_active;
   o.process            = MO.FEaiChartStatisticsScene_process;
   o.deactive           = MO.FEaiChartStatisticsScene_deactive;
   return o;
}
MO.FEaiChartStatisticsScene_onLoadData = function FEaiChartStatisticsScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartStatisticsScene_onDateSelect = function FEaiChartStatisticsScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}
MO.FEaiChartStatisticsScene_onOperationPlay = function FEaiChartStatisticsScene_onOperationPlay(event){
   var o = this;
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if(code == endCode) {
      MO.RDate.autoParse(o._currentDate, '20140701');
   }
}
MO.FEaiChartStatisticsScene_onOperationPause = function FEaiChartStatisticsScene_onOperationPause(event){
   var o = this;
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
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   o._totalBar.setLocation(600, 20);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiChartTimeline);
   timeline.setName('Timeline');
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas.logicSize().height - 400);
   timeline.setWidth(MO.Eai.Canvas.logicSize().width - 580);
   timeline.setHeight(350);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   faceLayer.push(timeline);
}
MO.FEaiChartStatisticsScene_fixMatrix = function FEaiChartStatisticsScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -38;
   matrix.ty = -13;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}
MO.FEaiChartStatisticsScene_selectDate = function FEaiChartStatisticsScene_selectDate(code) {
   var o = this;
   return;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
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
      var total = o._totalBar.findComponent('total');
      total.setLabel(MO.RFloat.unitFormat(dateData.investmentTotal(), 0, 0, 2, 0, 10000, '万'));
      o._totalBar.repaint();
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartStatisticsScene_active = function FEaiChartStatisticsScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
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
            var hTable = document.getElementById('id_table');
            hTable.style.display = '';
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   if (o._playing){
      o._investment.process();
      var invementCurrent = o._investment.invementCurrent();
      if(invementCurrent != null){
         var bar = o._totalBar;
         var total = bar.findComponent('total');
         total.setValue(parseInt(invementCurrent).toString());
         if(total.process()){
            bar.repaint();
         }
      }
   }
}
MO.FEaiChartStatisticsScene_deactive = function FEaiChartStatisticsScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
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
      o._desktop        = RClass.register(o, new AGetter('_desktop'));
      o._engineInfo     = null;
      o.onProcess       = MO.FEaiScene_onProcess;
      o.construct       = MO.FEaiScene_construct;
      o.setup           = MO.FEaiScene_setup;
      o.active          = MO.FEaiScene_active;
      o.deactive        = MO.FEaiScene_deactive;
      o.processEvent    = FEaiScene_processEvent;
      o.dispose         = MO.FEaiScene_dispose;
      return o;
   }
   MO.FEaiScene_onProcess = function FEaiScene_onProcess(){
      var o = this;
      o._desktop.process();
      o.__base.FScene.onProcess.call(o);
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
   }
   MO.FEaiScene_setup = function FEaiScene_setup(){
      var o = this;
      o.__base.FScene.setup.call(o);
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 300);
      control.build();
      var desktop = o._desktop = RClass.create(FGuiDesktop);
      desktop.linkGraphicContext(o);
      desktop.setup();
      desktop.register(control);
   }
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FScene.active.call(o);
      var stage = o._activeStage;
      MO.Eai.Canvas.selectStage(stage);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      o._engineInfo.setStage(stage);
   }
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FScene.deactive.call(o);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      MO.Eai.Canvas.selectStage(null);
   }
   MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
      var o = this;
      o.__base.FScene.processEvent();
      o._desktop.processEvent(event);
   }
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._desktop = RObject.dispose(o._desktop);
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
with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._thread      = null;
      o._interval    = 10;
      o.construct    = FEaiApplication_construct;
      o.createCanvas = FEaiApplication_createCanvas;
      o.setup        = FEaiApplication_setup;
      o.dispose      = FEaiApplication_dispose;
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
   MO.FEaiApplication_createCanvas = function FEaiApplication_createCanvas(){
      return RClass.create(FEaiCanvas);
   }
   MO.FEaiApplication_setup = function FEaiApplication_setup(hPanel){
      var o = this;
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('general.color.eai.citys', FEaiCityEffect);
      effectConsole.register('general.color.eai.citys.range', FEaiCityRangeEffect);
   }
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      o.__base.FApplication.dispose.call(o);
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
      o.onResize         = FEaiCanvas_onResize;
      o.construct        = FEaiCanvas_construct;
      o.selectStage      = FEaiCanvas_selectStage;
      o.dispose          = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onResize = function FEaiCanvas_onResize(event){
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
      var canvas = MO.Eai.Canvas = o._canvas = o.createCanvas();
      canvas.build(hPanel);
      canvas.setPanel(hPanel);
      o.linkGraphicContext(canvas);
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
   MO.FEaiChartCanvas = function FEaiChartCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
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
      o.__base.FEaiCanvas.setPanel.call(o, hPanel);
   }
   MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
      var o = this;
      o._cameraPosition = RObject.dispose(o._cameraPosition);
      o.__base.FEaiCanvas.dispose.call(o);
   }
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
