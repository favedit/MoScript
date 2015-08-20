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
   o.calculateAmountLevel  = MO.FEaiLogicStatistics_calculateAmountLevel;
   o.doInvestmentDynamic   = MO.FEaiLogicStatistics_doInvestmentDynamic;
   o.doInvestmentTrend     = MO.FEaiLogicStatistics_doInvestmentTrend;
   o.doCustomerDynamic     = MO.FEaiLogicStatistics_doCustomerDynamic;
   o.doCustomerTrend       = MO.FEaiLogicStatistics_doCustomerTrend;
   o.doMarketerDynamic     = MO.FEaiLogicStatistics_doMarketerDynamic;
   o.doMarketerTrend       = MO.FEaiLogicStatistics_doMarketerTrend;
   o.doDepartmentDynamic   = MO.FEaiLogicStatistics_doDepartmentDynamic;
   o.doDepartmentTrend     = MO.FEaiLogicStatistics_doDepartmentTrend;
   o.doPerformenceDynamic  = MO.FEaiLogicStatistics_doPerformenceDynamic;
   return o;
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
