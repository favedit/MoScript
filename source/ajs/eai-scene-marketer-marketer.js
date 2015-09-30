MO.FEaiChartMktMarketerDynamicInfo = function FEaiChartMktMarketerDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentCount    = MO.Class.register(o, [new MO.AGetter('_investmentCount'), new MO.APersistence('_investmentCount', MO.EDataType.Double)]);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
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
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._investmentTotal         = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
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
   o._event24HDataChanged     = null;
   o._listeners24HDataChanged = MO.Class.register(o, new MO.AListener('_listeners24HDataChanged', '24H' + MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartMktMarketerProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartMktMarketerProcessor_on24HDataFetch;
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
MO.FEaiChartMktMarketerProcessor_on24HDataFetch = function FEaiChartMktMarketerProcessor_on24HDataFetch(event) {
   var o = this;
   event.beginDate = o._24HBeginDate;
   event.endDate = o._24HEndDate;
   o.process24HDataChangedListener(event);
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
   o._24HBeginDate = new MO.TDate();
   o._24HEndDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
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
   var investmentTotal = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var actionCd = unit.customerActionCd();
      var amount = unit.customerActionAmount();
      if(actionCd == 1){
         investmentCurrent -= amount;
         investmentTotal -= amount;
      }
   }
   o._investmentTotal = investmentTotal;
   o._invementDayCurrent = investmentCurrent;
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
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
      statistics.marketer().doMarketerTrend(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());
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
   o._code                   = MO.EEaiScene.ChartMarketerMarketer;
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o.onOperationDown         = MO.FEaiChartMktMarketerScene_onOperationDown;
   o.onInvestmentDataChanged = MO.FEaiChartMktMarketerScene_onInvestmentDataChanged;
   o.on24HDataChanged        = MO.FEaiChartMktMarketerScene_on24HDataChanged;
   o.onOperationVisibility   = MO.FEaiChartMktMarketerScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartMktMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartMktMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktMarketerScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartMktMarketerScene_setup;
   o.showFace                = MO.FEaiChartMktMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartMktMarketerScene_fixMatrix;
   o.processResize           = MO.FEaiChartMktMarketerScene_processResize;
   return o;
}
MO.FEaiChartMktMarketerScene_onOperationDown = function FEaiChartMktMarketerScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}
MO.FEaiChartMktMarketerScene_on24HDataChanged = function FEaiChartMktMarketerScene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
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
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
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
      liveTable.setAnchorCd(MO.EUiAnchor.All);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.All);
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
   grid.setSize(800, 200);
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
   grid.setPadding(0,0,0,10);
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
      o._rankTitleStart = 5;
      o._rankHeight = 174;
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
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._ready = false;
   o._investmentTotal = 0;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate = MO.FEaiChartMktMarketerTimeline_oeUpdate;
   o.construct = MO.FEaiChartMktMarketerTimeline_construct;
   o.sync = MO.FEaiChartMktMarketerTimeline_sync;
   o.drawTrend = MO.FEaiChartMktMarketerTimeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartMktMarketerTimeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartMktMarketerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartMktMarketerTimeline_construct = function FEaiChartMktMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMktMarketerTrendInfo);
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
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartMktMarketerTimeline_drawTrend = function FEaiChartMktMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
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
   graphic.setFont('bold 20px Microsoft YaHei');
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:MI');
      startTime.addHour(1);
      startTime.truncHour();
      drawText = !drawText;
      if (drawText) {
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
   text = endTime.format('HH24:MI');
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, dataRight - textWidth / 2, middle + 40, '#59FDE9');
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
      if (lastHour != hour) {
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
   var maxWidth = Math.max(investmentTotalWidth);
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
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMktMarketerTrendUnit)]);
   return o;
}
MO.FEaiChartMktMarketerTrendUnit = function FEaiChartMktMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   return o;
}
