MO.FEaiChartSesameFinancialProcessor = function FEaiChartSesameFinancialProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
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
   o._event24HDataChanged     = null;
   o._listeners24HDataChanged = MO.Class.register(o, new MO.AListener('_listeners24HDataChanged', '24H' + MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartSesameFinancialProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartSesameFinancialProcessor_on24HDataFetch;
   o.onJsonData               = MO.FEaiChartSesameFinancialProcessor_onJsonData;
   o.onhehe                   = MO.FEaiChartSesameFinancialProcessor_onhehe;
   o.onCurrentInvest          = MO.FEaiChartSesameFinancialProcessor_onCurrentInvest;
   o.construct                = MO.FEaiChartSesameFinancialProcessor_construct;
   o.allocUnit                = MO.FEaiChartSesameFinancialProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartSesameFinancialProcessor_allocShape;
   o.setup                    = MO.FEaiChartSesameFinancialProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartSesameFinancialProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartSesameFinancialProcessor_focusEntity;
   o.process                  = MO.FEaiChartSesameFinancialProcessor_process;
   o.dispose                  = MO.FEaiChartSesameFinancialProcessor_dispose;
   o._jsonSystem              = MO.Class.register(o, new MO.AGetter('_jsonSystem'));
   o._jsonTimerData           = MO.Class.register(o, new MO.AGetter('_jsonTimerData'));
   o._jsonTableData           = MO.Class.register(o, new MO.AGetter('_jsonTableData'));
   return o;
}
MO.FEaiChartSesameFinancialProcessor_onJsonData = function FEaiChartSesameFinancialProcessor_onJsonData(event) {
   var o = this;
   var data = event;
   var content = event.content;
}
MO.FEaiChartSesameFinancialProcessor_onhehe = function FEaiChartSesameFinancialProcessor_onhehe(event){
    var data = event.data;
}
MO.FEaiChartSesameFinancialProcessor_onCurrentInvest = function FEaiChartSesameFinancialProcessor_onCurrentInvest(event){
   var data = event.data;
}
MO.FEaiChartSesameFinancialProcessor_on24HDataFetch = function FEaiChartSesameFinancialProcessor_on24HDataFetch(event) {
   var o = this;
   event.beginDate = o._24HBeginDate;
   event.endDate = o._24HEndDate;
   o.process24HDataChangedListener(event);
}
MO.FEaiChartSesameFinancialProcessor_onDynamicData = function FEaiChartSesameFinancialProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo._rankUnits = content.rank;         //table实时数据  suiming
   dynamicInfo._units     = content.collection;  //前三名排行信息
   var investment_day   = dynamicInfo._investmentCount  = content.investment_day ;   //投资人数
   var investment_total = dynamicInfo._investmentTotal  = content.investment_total;  // 总投资额度
   var rankUnits = o._rankUnits;
   var items =  rankUnits._items;
   var rankUnitsLength = content.rank.length;
   for (var i= 0;i<rankUnitsLength;i++){
   items[i] = content.rank[i];
   }
   var units = o._units;
   var unitsitems =  units._items;
   var UnitsLength = content.collection.length;
   for (var i= 0;i<UnitsLength;i++){
   unitsitems[i] = content.collection[i];
   }
   var unitCount = units._items.length;
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
MO.FEaiChartSesameFinancialProcessor_construct = function FEaiChartSesameFinancialProcessor_construct(){
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
   o._dynamicInfo = MO.Class.create(MO.FEaiLogicInfoCustomerDynamic);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
   o._jsonSystem = MO.Class.create(MO.FEaiLogicJsonSystem);
   o._jsonTableData = MO.Class.create(MO.FEaiLogicJsonTableData);
   o._jsonTimerData = MO.Class.create(MO.FEaiLogicJsonTimerLineData);
}
MO.FEaiChartSesameFinancialProcessor_allocUnit = function FEaiChartSesameFinancialProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartSesameFinancialProcessor_setup = function FEaiChartSesameFinancialProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartSesameFinancialProcessor_calculateCurrent = function FEaiChartSesameFinancialProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units.items();
   var count = units.length;
   for(var i = 0; i < count; i++){
      var unit = units[i];
      investmentCurrent -= unit.investment;
      investmentTotalCurrent -= unit.investment;
   }
   o._invementTotalCurrent = investmentTotalCurrent ;
   o._invementDayCurrent = investmentCurrent ;
}
MO.FEaiChartSesameFinancialProcessor_focusEntity = function FEaiChartSesameFinancialProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = unit.card;
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment;
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      if (o._mapEntity != null) {
         o._mapEntity.upload();
      }
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
MO.FEaiChartSesameFinancialProcessor_process = function FEaiChartSesameFinancialProcessor_process(){
   var o = this;
   var system = o._jsonSystem;
   if(!system.testReady()){
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var JsonData = o._jsonTableData;
      var JsonData = MO.Console.find(MO.FEaiLogicConsole).jsonTableData();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      JsonData.doInvestment(o,o.onDynamicData,beginDate.format(),endDate.format());
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
      var JsonTimerData = o._jsonTimerData;
      JsonTimerData.do24TimeData(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units._items;
      if(!units.length==0){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   if (o._mapEntity != null) {
      o._mapEntity.process();
   }
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartSesameFinancialProcessor_dispose = function FEaiChartSesameFinancialProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartSesameFinancialScene = function FEaiChartSesameFinancialScene(o) {
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
   o._liveTable              = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o.onOperationDown         = MO.FEaiChartSesameFinancialScene_onOperationDown;
   o.onInvestmentDataChanged = MO.FEaiChartSesameFinancialScene_onInvestmentDataChanged;
   o.on24HDataChanged        = MO.FEaiChartSesameFinancialScene_on24HDataChanged;
   o.onOperationVisibility   = MO.FEaiChartSesameFinancialScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartSesameFinancialScene_onProcessReady;
   o.onProcess               = MO.FEaiChartSesameFinancialScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartSesameFinancialScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartSesameFinancialScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartSesameFinancialScene_setup;
   o.showFace                = MO.FEaiChartSesameFinancialScene_showFace;
   o.fixMatrix               = MO.FEaiChartSesameFinancialScene_fixMatrix;
   o.processResize           = MO.FEaiChartSesameFinancialScene_processResize;
   return o;
}
MO.FEaiChartSesameFinancialScene_onOperationDown = function FEaiChartSesameFinancialScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}
MO.FEaiChartSesameFinancialScene_on24HDataChanged = function FEaiChartSesameFinancialScene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo()._investmentTotal = event.content.investment_total;
   timeline.trendInfo()._units = event.content.collection;
   timeline.dirty();
}
MO.FEaiChartSesameFinancialScene_onInvestmentDataChanged = function FEaiChartSesameFinancialScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartSesameFinancialScene_onOperationVisibility = function FEaiChartSesameFinancialScene_onOperationVisibility(event) {
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
MO.FEaiChartSesameFinancialScene_onProcessReady = function FEaiChartSesameFinancialScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartSesameFinancialScene_onProcess = function FEaiChartSesameFinancialScene_onProcess() {
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
      if (processor.invementTotalCurrent() > 0) {
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
      }
      if (processor.invementDayCurrent() > 0) {
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
MO.FEaiChartSesameFinancialScene_onSwitchProcess = function FEaiChartSesameFinancialScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartSesameFinancialScene_onSwitchComplete = function FEaiChartSesameFinancialScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartSesameFinancialScene_setup = function FEaiChartSesameFinancialScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartSesameFinancialProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartSesameFinancialTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartSesameFinancialTable);
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
MO.FEaiChartSesameFinancialScene_showFace = function FEaiChartSesameFinancialScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartSesameFinancialScene_fixMatrix = function FEaiChartSesameFinancialScene_fixMatrix(matrix) {
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
MO.FEaiChartSesameFinancialScene_processResize = function FEaiChartSesameFinancialScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
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
      control.setRight(80);
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
      timeline.setBottom(10);
      timeline.setRight(780);
      timeline.setHeight(300);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.All);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(760);
   }
   o.fixMatrix(o._processor.display().matrix());
}
MO.FEaiChartSesameFinancialTable = function FEaiChartSesameFinancialTable(o) {
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
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiChartSesameFinancialTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartSesameFinancialTable_onPaintBegin;
   o.construct             = MO.FEaiChartSesameFinancialTable_construct;
   o.setup                 = MO.FEaiChartSesameFinancialTable_setup;
   o.setRankUnits          = MO.FEaiChartSesameFinancialTable_setRankUnits;
   o.pushUnit              = MO.FEaiChartSesameFinancialTable_pushUnit;
   o.drawRow               = MO.FEaiChartSesameFinancialTable_drawRow;
   o.dispose               = MO.FEaiChartSesameFinancialTable_dispose;
   return o;
}
MO.FEaiChartSesameFinancialTable_onImageLoad = function FEaiChartSesameFinancialTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartSesameFinancialTable_onPaintBegin = function FEaiChartSesameFinancialTable_onPaintBegin(event) {
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
   var titleText = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.layout.table.title}');
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
MO.FEaiChartSesameFinancialTable_construct = function FEaiChartSesameFinancialTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartSesameFinancialTable_setup = function FEaiChartSesameFinancialTable_setup() {
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
   column.setName('customer_city');
   column.setLabel('');
   column.setDataName('customer_city');
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
   grid.setTop(332);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(32);
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
   column.setName('investmentAmount');
   column.setLabel('投资额');
   column.setDataName('investment_amount');
   column.cellPadding().right = 10;
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
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
MO.FEaiChartSesameFinancialTable_setRankUnits = function FEaiChartSesameFinancialTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var count = units._items.length;
   var units = units._items;
   for (var i = 0; i < count; i++) {
      var unit = units[i];
      var row = grid.allocRow();
      var card = unit.card;
      var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
      var cityLabel = '';
      if (city) {
         cityLabel = city.label();
      }
      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
      row.set('customer_city', cityLabel);
      row.set('label_phone', unit.customer+ " - " + unit.phone);
      row.set('investment', unit.investment);
      grid.pushRow(row);
   }
}
MO.FEaiChartSesameFinancialTable_pushUnit = function FEaiChartSesameFinancialTable_pushUnit(unit) {
   var o = this;
   if (!unit) {
      return null;
   }
   var card = unit.card;
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if (city) {
      cityLabel = city.label();
   }
   var grid = o._gridControl;
   var row = grid.allocRow();
   var phone =unit.phone;
   var customer = unit.customer+'-'+phone;
   var investment = unit.investment;
   row.set('record_date', unit.date);
   row.set('customer_city', cityLabel);
   row.set('customer_info', customer);
   row.set('investment_Amount', investment);
   grid.insertRow(row);
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if (entities.count > o._tableCount) {
      entities.pop();
   }
}
MO.FEaiChartSesameFinancialTable_dispose = function FEaiChartSesameFinancialTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartSesameFinancialTimeline = function FEaiChartSesameFinancialTimeline(o) {
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
   o.oeUpdate = MO.FEaiChartSesameFinancialTimeline_oeUpdate;
   o.construct = MO.FEaiChartSesameFinancialTimeline_construct;
   o.sync = MO.FEaiChartSesameFinancialTimeline_sync;
   o.drawTrend = MO.FEaiChartSesameFinancialTimeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartSesameFinancialTimeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartSesameFinancialTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartSesameFinancialTimeline_construct = function FEaiChartSesameFinancialTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoCustomerTrend);
}
MO.FEaiChartSesameFinancialTimeline_oeUpdate = function FEaiChartSesameFinancialTimeline_oeUpdate(event) {
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
MO.FEaiChartSesameFinancialTimeline_drawTrend = function FEaiChartSesameFinancialTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.length;
   var unitFirst = units[0];
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
      var unit = units[i];
      var value = unit.investment;
      startTime.parseAuto(unit.date);
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
MO.FEaiChartSesameFinancialTimeline_onPaintBegin = function FEaiChartSesameFinancialTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 50;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 90;
   var dataBottom = bottom - 50;
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
   var endText = endTime.format('HH24:MI');
   if (endText != text) {
      textWidth = graphic.textWidth(endText);
      graphic.drawText(endText, dataRight - textWidth / 2, middle + 40, '#59FDE9');
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo._units;
   if (!units) {
      return;
   }
   if (units.length==0) {
      return;
   }
   var unitFirst = units[0];
   var maxAmount = 0;
   var count = units.length;
   for (var i = 0; i < count; i++) {
      var unit = units[i];
      var investment = unit.investment;
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.data);
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units[i];
      startTime.parseAuto(unit.date);
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.investment;
      } else {
         if (hourInves > maxHourInves) {
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top + 30, '#54F0FF');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 60;
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
MO.FEaiLogicJsonInfoCustomerTrend = function FEaiLogicJsonInfoCustomerTrend(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal = MO.Class.register(o, [new MO.AGetSet('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._customerTotal   = MO.Class.register(o, [new MO.AGetSet('_customerTotal'), new MO.APersistence('_customerTotal', MO.EDataType.Uint32)]);
   o._units           = MO.Class.register(o, [new MO.AGetSet('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiLogicJsonInfoCustomerTrendUnit)]);
   return o;
}
MO.FEaiLogicJsonInfoCustomerTrendUnit = function FEaiLogicJsonInfoCustomerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetSet('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetSet('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._customerCount = MO.Class.register(o, [new MO.AGetSet('_customerCount'), new MO.APersistence('_customerCount', MO.EDataType.Uint32)]);
   return o;
}
MO.FEaiLogicJsonSystem = function FEaiLogicJsonSystem(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code          = 'system';
   o._ready         = false;
   o._info          = null;
   o._token          = MO.Class.register(o, new MO.AGetter('_token'), 0);
   o._currentDate   = null;
   o._localDate     = null;
   o._systemDate    = MO.Class.register(o, new MO.AGetter('_systemDate'));
   o.onInfo         = MO.FEaiLogicJsonSystem_onInfo;
   o.construct      = MO.FEaiLogicJsonSystem_construct;
   o.doInfo         = MO.FEaiLogicJsonSystem_doInfo;
   o.doDeviceAccess = MO.FEaiLogicJsonSystem_doDeviceAccess;
   o.testReady      = MO.FEaiLogicJsonSystem_testReady;
   o.currentDate    = MO.FEaiLogicJsonSystem_currentDate;
   o.refresh        = MO.FEaiLogicJsonSystem_refresh;
   o.dispose        = MO.FEaiLogicJsonSystem_dispose;
   return o;
}
MO.FEaiLogicJsonSystem_onInfo = function FEaiLogicJsonSystem_onInfo(event){
   var o = this;
   var info = o._info;
   info._data=event.data.data;
   o._localDate.setNow();
   o._systemDate.parse(info.date());
   o._ready = true;
}
MO.FEaiLogicJsonSystem_construct = function FEaiLogicJsonSystem_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   o._info = MO.Class.create(MO.FEaiLogicSystemInfo);
   o._currentDate = new MO.TDate();
   o._localDate = new MO.TDate();
   o._systemDate = new MO.TDate();
}
MO.FEaiLogicJsonSystem_doInfo = function FEaiLogicJsonSystem_doInfo(owner, callback){
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.time}');
   var connection = MO.Console.find(MO.FJsonConsole).send(url);
   connection.addLoadListener(owner, callback);
}
MO.FEaiLogicJsonSystem_doDeviceAccess = function FEaiLogicJsonSystem_doDeviceAccess(){
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
MO.FEaiLogicJsonSystem_testReady = function FEaiLogicJsonSystem_testReady(){
   return this._ready;
}
MO.FEaiLogicJsonSystem_currentDate = function FEaiLogicJsonSystem_currentDate(){
   var o = this;
   var date = o._currentDate;
   var span = o._systemDate.get() - o._localDate.get();
   date.set(MO.Timer.current() + span);
   return date;
}
MO.FEaiLogicJsonSystem_refresh = function FEaiLogicJsonSystem_refresh(){
   var o = this;
   return o.doInfo(o, o.onInfo);
}
MO.FEaiLogicJsonSystem_dispose = function FEaiLogicJsonSystem_dispose() {
   var o = this;
   o._info = MO.Lang.Object.dispose(o._info);
   o._localDate = MO.Lang.Object.dispose(o._localDate);
   o._systemDate = MO.Lang.Object.dispose(o._systemDate);
   o.__base.FEaiLogic.consturct.call(o);
}
MO.FEaiLogicJsonTableData = function FEaiLogicJsonTableData(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code                = 'statistics';
   o._tender              = MO.Class.register(o, new MO.AGetter('_tender'));
   o._achievement         = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._customer            = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer            = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department          = MO.Class.register(o, new MO.AGetter('_department'));
   o.construct            = MO.FEaiLogicJsonTableData_construct;
   o.doServerTime         = MO.FEaiLogicJsonTableData_doServerTime;
   o.doTimeData           = MO.FEaiLogicJsonTableData_doTimeData;
   o.doInvestment         = MO.FEaiLogicJsonTableData_doInvestment;
   o.do24TimeData         = MO.FEaiLogicJsonTableData_do24TimeData;
   o.dispose              = MO.FEaiLogicJsonTableData_dispose;
   o.sendJsonSever        = MO.FEaiLogicJsonTableData_sendJsonService;
   o._doFirst             = true;
   return o;
}
MO.FEaiLogicJsonTableData_construct = function FEaiLogicJsonTableData_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
}
MO.FEaiLogicJsonTableData_doServerTime = function FEaiLogicJsonTableData_doServerTime(owner, callback){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.time}');
   o.sendJsonSever(url, parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicJsonTableData_doTimeData = function FEaiLogicJsonTableData_doTimeData(owner, callback){
   var o = this;
   var url = "http://182.92.6.158:8089/zm_external.wisdom.get.currentInvest?do=currentInvest";
   var connection = MO.Console.find(MO.FJsonConsole).alloc();
   connection.setAsynchronous(true);
   connection._contentCd = MO.EHttpContent.Text;
   connection.addLoadListener(owner, callback);
   connection.send(url);
}
MO.FEaiLogicJsonTableData_sendJsonService = function FEaiLogic_sendJsonService(uri, parameters, owner, callback){
   var o = this;
   var url = uri;
   var connection = MO.Console.find(MO.FHttpConsole).alloc();
   connection._asynchronous = true;
   connection.addLoadListener(owner, callback);
   connection.send(url);
}
MO.FEaiLogicJsonTableData_do24TimeData = function FEaiLogicJsonTableData_do24TimeData(owner, callback, startTime, endTime) {
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.24h}');
   var start = startTime;
   var end = endTime;
   url += 'begin=' + start + '&end=' + end;
   var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
   connection1.addLoadListener(owner, callback);
}
MO.FEaiLogicJsonTableData_doInvestment = function FEaiLogicJsonTableData_doInvestment(owner, callback, startTime, endTime) {
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.live}');
   var start = startTime;
   var end = endTime;
   var o = this;
   url += 'first=' + o._doFirst + '&begin=' + start + '&end=' + end;
   var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
   connection1.addLoadListener(owner, callback);
   o._doFirst = false;
}
MO.FEaiLogicJsonTableData_dispose = function FEaiLogicJsonTableData_dispose(){
   var o = this;
   o.__base.FEaiLogic.dispose.call(o);
}
MO.FEaiLogicJsonTimerLineData = function FEaiLogicJsonTimerLineData(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   o._code                = 'statistics';
   o._tender              = MO.Class.register(o, new MO.AGetter('_tender'));
   o._achievement         = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._customer            = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer            = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department          = MO.Class.register(o, new MO.AGetter('_department'));
   o.construct            = MO.FEaiLogicJsonTimerLineData_construct;
   o.doServerTime         = MO.FEaiLogicJsonTimerLineData_doServerTime;
   o.doTimeData           = MO.FEaiLogicJsonTimerLineData_doTimeData;
   o.doInvestment         = MO.FEaiLogicJsonTimerLineData_doInvestment;
   o.do24TimeData         = MO.FEaiLogicJsonTimerLineData_do24TimeData;
   o.dispose              = MO.FEaiLogicJsonTimerLineData_dispose;
   o.sendJsonSever       = MO.FEaiLogicJsonTimerLineData_sendJsonService;
   o._doFirst = true;
   return o;
}
MO.FEaiLogicJsonTimerLineData_construct = function FEaiLogicJsonTimerLineData_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
}
MO.FEaiLogicJsonTimerLineData_doServerTime = function FEaiLogicJsonTimerLineData_doServerTime(owner, callback){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.time}');
   o.sendJsonSever(url, parameters, owner, callback);
   o._customerDynamicFirst = false;
}
MO.FEaiLogicJsonTimerLineData_doTimeData = function FEaiLogicJsonTimerLineData_doTimeData(owner, callback){
   var o = this;
   var url = "http://182.92.6.158:8089/zm_external.wisdom.get.currentInvest?do=currentInvest";
   var connection = MO.Console.find(MO.FJsonConsole).alloc();
   connection.setAsynchronous(true);
   connection._contentCd = MO.EHttpContent.Text;
   connection.addLoadListener(owner, callback);
   connection.send(url);
}
MO.FEaiLogicJsonTimerLineData_sendJsonService = function FEaiLogic_sendJsonService(uri, parameters, owner, callback){
   var o = this;
   var url = uri;
   var connection = MO.Console.find(MO.FHttpConsole).alloc();
   connection._asynchronous = true;
   connection.addLoadListener(owner, callback);
   connection.send(url);
}
MO.FEaiLogicJsonTimerLineData_do24TimeData = function FEaiLogicJsonTimerLineData_do24TimeData(owner, callback,startTime,endTime){
      var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.24h}');
      var start= startTime;
      var end = endTime;
      url +='begin='+ start + '&end='+end;
      var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
      connection1.setAsynchronous(true);
      connection1.addLoadListener(owner,callback);
}
MO.FEaiLogicJsonTimerLineData_doInvestment = function FEaiLogicJsonTimerLineData_doInvestment(owner, callback,startTime,endTime){
      var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.live}');
      var start= startTime;
      var end = endTime;
      var o = this;
      var firstbool = o._doFirst;
      if(firstbool){
      url += 'first='+firstbool+'&begin='+ start + '&end='+end;
      firstbool=false;
      }else{
      url += 'first='+firstbool+'&begin='+ start + '&end='+end;
      }
      var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
      connection1.setAsynchronous(true);
      connection1.addLoadListener(owner,callback);
}
MO.FEaiLogicJsonTimerLineData_dispose = function FEaiLogicJsonTimerLineData_dispose(){
   var o = this;
   o.__base.FEaiLogic.dispose.call(o);
}
