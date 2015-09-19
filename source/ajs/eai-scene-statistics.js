MO.FEaiChartStatMarketerBarChart = function FEaiChartStatMarketerBarChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._infoProvince = MO.Class.register(o, new MO.AGetSet('_infoProvince'));
   o._provinceTextFont = MO.Class.register(o, new MO.AGetSet('_provinceTextFont'));
   o._ready = false;
   o._investmentTotal = 0;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate = MO.FEaiChartStatMarketerBarChart_oeUpdate;
   o.construct = MO.FEaiChartStatMarketerBarChart_construct;
   o.sync = MO.FEaiChartStatMarketerBarChart_sync;
   o.drawTrend = MO.FEaiChartStatMarketerBarChart_drawTrend;
   o.onPaintBegin = MO.FEaiChartStatMarketerBarChart_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartStatMarketerBarChart_on24HDataFetch;
   return o;
}
MO.FEaiChartStatMarketerBarChart_construct = function FEaiChartStatMarketerBarChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMktCustomerTrendInfo);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
   o._provinceTextFont = new MO.SUiFont();
   o._provinceTextFont.size = 24;
   o._provinceTextFont.bold = true;
   o._provinceTextFont.color = '#59FDE9'
}
MO.FEaiChartStatMarketerBarChart_oeUpdate = function FEaiChartStatMarketerBarChart_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartStatMarketerBarChart_onPaintBegin = function FEaiChartStatMarketerBarChart_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   var provincesarr = o._infoProvince._provinces;
   if (!provincesarr) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var handle = graphic._handle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var provinceCount = 10;
   var width = (rectangle.width + rectangle.left) / 71;
   var intervalWidth = (rectangle.width + rectangle.left) / 33;
   var maxInverstment = 0;
   graphic._handle.beginPath();
   for (var i = 0 ; i < provincesarr.count() ; i++) {
      var province = provincesarr.get(i);
      if (maxInverstment < province.investmentTotal()) {
         maxInverstment = province.investmentTotal();
      }
   }
   graphic.drawLine(decoLeft, bottom - 70, decoRight, bottom - 70, '#F8CB3D', 3);
   var realityCount = 0;
   var provinceTextFont = o._provinceTextFont;
   if (provincesarr) {
      for (var i = 0 ; i < provincesarr.count() ; i++) {
         var province = provincesarr.get(i);
         var code = province.code();
         var provincename = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findByCode(code);
         var provinceLabel = '';
         var hight = 0;
         var color = '#F8CB3D'
         if (provincename && provincename.label()) {
            provinceLabel = provincename.label();
            realityCount++;
            hight = 17/25*  rectangle.height* (province.investmentTotal()+maxInverstment/70) / maxInverstment
            graphic.setFont('9px Microsoft YaHei');
            var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
            var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
            var bottomColor = '#' + hexColor.substring(2);
            graphic.drawTextVertical(provinceLabel, decoLeft + realityCount * intervalWidth - 4, bottom - 45, provinceTextFont);
            graphic._handle.rect(decoLeft + realityCount * intervalWidth, bottom - 80 - hight, width, hight);
         }
      }
      var gradient = graphic.createLinearGradient(0,  rectangle.top+30, 0,bottom -80);
      gradient.addColorStop('0', '#fb2609');
      gradient.addColorStop('1', '#1c12a5');
      graphic._handle.fillStyle = gradient;
      graphic._handle.fill();
   }
}
MO.FEaiChartStatMarketerInfo = function FEaiChartStatMarketerInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   o._investmentAvg   = MO.Class.register(o, [new MO.AGetter('_investmentAvg'), new MO.APersistence('_investmentAvg', MO.EDataType.Double)]);
   o._provinces       = MO.Class.register(o, [new MO.AGetter('_provinces'), new MO.APersistence('_provinces', MO.EDataType.Objects, MO.FEaiChartStatMarketerInfoProvince)]);
   return o;
}
MO.FEaiChartStatMarketerInfoProvince = function FEaiChartStatMarketerInfoProvince(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._code            = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label           = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerCount   = MO.Class.register(o, [new MO.AGetter('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   o._investmentAvg   = MO.Class.register(o, [new MO.AGetter('_investmentAvg'), new MO.APersistence('_investmentAvg', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartStatMarketerProcessor = function FEaiChartStatMarketerProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
   o._infoProvince            = MO.Class.register(o, new MO.AGetter('_infoProvince'));
   o._365BeginDate            = MO.Class.register(o, new MO.AGetter('_365BeginDate'));
   o._365EndDate              = MO.Class.register(o, new MO.AGetter('_365EndDate'));
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
   o._eventInfoProvinceChanged= null;
   o._listenersInfoProvinceDataChanged = MO.Class.register(o, new MO.AListener('_listenersInfoProvinceDataChanged', 'InfoProvinceDataChanged'));
   o._event24HDataChanged     = null;
   o._listeners24HDataChanged = MO.Class.register(o, new MO.AListener('_listeners24HDataChanged', '24H' + MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartStatMarketerProcessor_onDynamicData;
   o.onInfoProvince           = MO.FEaiChartStatMarketerProcessor_onInfoProvince;
   o.construct                = MO.FEaiChartStatMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartStatMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartStatMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartStatMarketerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartStatMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartStatMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartStatMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartStatMarketerProcessor_dispose;
   o._peopleCounts            = MO.Class.register(o, new MO.AGetter('_peopleCounts'));
   return o;
}
MO.FEaiChartStatMarketerProcessor_onInfoProvince = function FEaiChartStatMarketerProcessor_onInfoProvince(event){
   var o = this;
   var infoProvince = o._infoProvince;
   infoProvince.unserializeSignBuffer(event.sign, event.content, true);
   o.processInfoProvinceDataChangedListener(infoProvince);
}
MO.FEaiChartStatMarketerProcessor_onDynamicData = function FEaiChartStatMarketerProcessor_onDynamicData(event){
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
MO.FEaiChartStatMarketerProcessor_construct = function FEaiChartStatMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._24HBeginDate = new MO.TDate();
   o._24HEndDate = new MO.TDate();
   o._365BeginDate = new MO.TDate();
   o._365EndDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktCustomerDynamicInfo);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
   o._peopleCounts = new MO.TDate();
}
MO.FEaiChartStatMarketerProcessor_allocUnit = function FEaiChartStatMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartStatMarketerProcessor_setup = function FEaiChartStatMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartStatMarketerProcessor_calculateCurrent = function FEaiChartStatMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var infoprovince = o._infoProvince;
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
MO.FEaiChartStatMarketerProcessor_focusEntity = function FEaiChartStatMarketerProcessor_focusEntity(unit){
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
MO.FEaiChartStatMarketerProcessor_process = function FEaiChartStatMarketerProcessor_process(){
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
      statistics.customer().doProvince(o, o.onInfoProvince);
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
MO.FEaiChartStatMarketerProcessor_dispose = function FEaiChartStatMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartStatMarketerScene = function FEaiChartStatMarketerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartCustomer;
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._logoBar                = null;
   o._timeline               = null;
   o._provinceTable          = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o.onOperationDown         = MO.FEaiChartStatMarketerScene_onOperationDown;
   o.on24HDataChanged        = MO.FEaiChartStatMarketerScene_on24HDataChanged;
   o.onInfoProvinceDataChanged = MO.FEaiChartStatMarketerScene_onInfoProvinceDataChanged;
   o.onOperationVisibility   = MO.FEaiChartStatMarketerScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartStatMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartStatMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartStatMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartStatMarketerScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartStatMarketerScene_setup;
   o.showParticle            = MO.FEaiChartStatMarketerScene_showParticle;
   o.showFace                = MO.FEaiChartStatMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartStatMarketerScene_fixMatrix;
   o.processResize           = MO.FEaiChartStatMarketerScene_processResize;
   return o;
}
MO.FEaiChartStatMarketerScene_onOperationDown = function FEaiChartStatMarketerScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}
MO.FEaiChartStatMarketerScene_on24HDataChanged = function FEaiChartStatMarketerScene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.dirty();
}
MO.FEaiChartStatMarketerScene_onInfoProvinceDataChanged = function FEaiChartStatMarketerScene_onInfoProvinceDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   var provinces = event.provinces();
   var count = provinces.count();
   var customerTotal = 0;
   for (var i = 0; i < count; i++) {
      var pInfo = provinces.at(i);
      customerTotal += pInfo.customerCount();
   }
   var investmentDay = o._logoBar.findComponent('investmentDay');
   investmentDay.setValue(customerTotal.toString());
   timeline.setInfoProvince(event);
   timeline.dirty();
   var table = o._provinceTable;
   table.setInfoProvince(event);
   table.setRankUnits();
   table.dirty();
}
MO.FEaiChartStatMarketerScene_onOperationVisibility = function FEaiChartStatMarketerScene_onOperationVisibility(event) {
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
MO.FEaiChartStatMarketerScene_onProcessReady = function FEaiChartStatMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartStatMarketerScene_onProcess = function FEaiChartStatMarketerScene_onProcess() {
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
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
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
MO.FEaiChartStatMarketerScene_onSwitchProcess = function FEaiChartStatMarketerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartStatMarketerScene_onSwitchComplete = function FEaiChartStatMarketerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartStatMarketerScene_setup = function FEaiChartStatMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.statistic.LogoBar');
   var investmentTotal = frame.findComponent('investmentDay');
   investmentTotal.setBasicUnitText('人');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartStatMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   invement.addInfoProvinceDataChangedListener(o, o.onInfoProvinceDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartStatMarketerBarChart);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiChartStatMarketerTable);
   provinceTable.setName('LiveTable');
   provinceTable.linkGraphicContext(o);
   provinceTable.setup();
   provinceTable.build();
   o._guiManager.register(provinceTable);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}
MO.FEaiChartStatMarketerScene_showParticle = function FEaiChartStatMarketerScene_showParticle(provinceEntity, cityResource) {
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
MO.FEaiChartStatMarketerScene_showFace = function FEaiChartStatMarketerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartStatMarketerScene_fixMatrix = function FEaiChartStatMarketerScene_fixMatrix(matrix) {
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
MO.FEaiChartStatMarketerScene_processResize = function FEaiChartStatMarketerScene_processResize() {
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
      control.setRight(660);
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
      timeline.setRight(660);
      timeline.setHeight(250);
   }
   var provinceTable = o._provinceTable;
   if (isVertical) {
      provinceTable.setDockCd(MO.EUiDock.Bottom);
      provinceTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      provinceTable.setLeft(10);
      provinceTable.setRight(10);
      provinceTable.setBottom(10);
      provinceTable.setWidth(1060);
      provinceTable.setHeight(900);
   } else {
      provinceTable.setDockCd(MO.EUiDock.Right);
      provinceTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      provinceTable.setTop(10);
      provinceTable.setRight(0);
      provinceTable.setBottom(10);
      provinceTable.setWidth(640);
   }
}
MO.FEaiChartStatMarketerTable = function FEaiChartStatMarketerTable(o) {
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
   o.onImageLoad = MO.FEaiChartStatMarketerTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartStatMarketerTable_onPaintBegin;
   o.construct = MO.FEaiChartStatMarketerTable_construct;
   o.setup = MO.FEaiChartStatMarketerTable_setup;
   o.setRankUnits = MO.FEaiChartStatMarketerTable_setRankUnits;
   o.pushUnit = MO.FEaiChartStatMarketerTable_pushUnit;
   o.drawRow = MO.FEaiChartStatMarketerTable_drawRow;
   o.dispose = MO.FEaiChartStatMarketerTable_dispose;
   o._infoProvince = MO.Class.register(o, new MO.AGetSet('_infoProvince'));
   return o;
}
MO.FEaiChartStatMarketerTable_onImageLoad = function FEaiChartStatMarketerTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartStatMarketerTable_onPaintBegin = function FEaiChartStatMarketerTable_onPaintBegin(event) {
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
   var titleText = '全国各省投资总额展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
}
MO.FEaiChartStatMarketerTable_construct = function FEaiChartStatMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
}
MO.FEaiChartStatMarketerTable_setup = function FEaiChartStatMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 120);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(28);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 20;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('provinceName');
   column.setLabel('省份');
   column.setDataName('provinceName');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('总投资额(元)');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setLowerColor('#EB6C03');
   column.setHighColor('#FF7200');
   column.setHighestColor('#FED826');
   column.setNegativeColor('#FF0000');
   column.setWidth(160);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('投资人数');
   column.setDataName('customerCount');
   column.setTextAlign(MO.EUiAlign.Right);
   column.setWidth(100);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentAvg');
   column.setLabel('人均投资(元)');
   column.setDataName('investmentAvg');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}
MO.FEaiChartStatMarketerTable_setRankUnits = function FEaiChartStatMarketerTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridControl;
   grid.clearRows();
   var pronvinceDate = o._infoProvince;
   var pronvinceDatearr = pronvinceDate._provinces;
   var realityCount = 0;
   if (pronvinceDatearr) {
      for (var i = 0; i < pronvinceDatearr.count(); i++) {
         var province = pronvinceDatearr.get(i);
         var code = province.code();
         var row = grid.allocRow();
         var provincename = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findByCode(code);
         var provinceLabel = '' ;
         if(provincename&&provincename.label()){
             provinceLabel= provincename.label();
             row.set('provinceName', provincename.label());
             row.set('investment', province.investmentTotal().toFixed(2));
             row.set('customerCount', province.customerCount());
             row.set('investmentAvg', province.investmentAvg().toFixed(2));
             grid.pushRow(row);
         }
      }
   }
}
MO.FEaiChartStatMarketerTable_pushUnit = function FEaiChartStatMarketerTable_pushUnit(unit) {
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
   row.set('bank_gain', unit.bankGain());
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if (entities.count() > o._tableCount) {
      entities.pop();
   }
}
MO.FEaiChartStatMarketerTable_dispose = function FEaiChartStatMarketerTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
