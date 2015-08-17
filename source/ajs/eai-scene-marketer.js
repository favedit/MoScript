MO.FEaiChartMarketerDynamicInfo = function FEaiChartMarketerDynamicInfo(o){
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
   o._rankUnits          = MO.Class.register(o, [new MO.AGetter('_rankUnits'), new MO.APersistence('_rankUnits', MO.EDataType.Objects, MO.FEaiChartMarketerDynamicRankUnit)]);
   o._units              = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMarketerDynamicUnit)]);
   return o;
}
MO.FEaiChartMarketerDynamicRankUnit = function FEaiChartMarketerDynamicRankUnit(o){
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
MO.FEaiChartMarketerDynamicUnit = function FEaiChartMarketerDynamicUnit(o){
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
MO.FEaiChartMarketerProcessor = function FEaiChartMarketerProcessor(o){
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
   o.onDynamicData            = MO.FEaiChartMarketerProcessor_onDynamicData;
   o.construct                = MO.FEaiChartMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartMarketerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartMarketerProcessor_dispose;
   return o;
}
MO.FEaiChartMarketerProcessor_onDynamicData = function FEaiChartMarketerProcessor_onDynamicData(event){
   var o = this;
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
MO.FEaiChartMarketerProcessor_construct = function FEaiChartMarketerProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMarketerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
}
MO.FEaiChartMarketerProcessor_allocUnit = function FEaiChartMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMarketerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartMarketerProcessor_setup = function FEaiChartMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartMarketerProcessor_calculateCurrent = function FEaiChartMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var redemptionCurrent = info.redemptionCount();
   var interestCount = info.interestCount();
   var performanceCurrent = info.performanceCount();
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
      }else if(actionCd == 2){
         redemptionCurrent -= amount;
         interestCount -= interest;
      }
   }
   o._invementDayCurrent = investmentCurrent;
   o._redemptionDayCurrent = redemptionCurrent;
   o._netinvestmentDayCurrent = investmentCurrent - redemptionCurrent;
   o._interestDayCurrent = interestCount;
   o._performanceDayCurrent = performanceCurrent;
}
MO.FEaiChartMarketerProcessor_focusEntity = function FEaiChartMarketerProcessor_focusEntity(unit){
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
MO.FEaiChartMarketerProcessor_process = function FEaiChartMarketerProcessor_process(){
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
      statistics.doMarketerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
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
MO.FEaiChartMarketerProcessor_dispose = function FEaiChartMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMarketerScene = function FEaiChartMarketerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartMarketer;
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
   o.onInvestmentDataChanged = MO.FEaiChartMarketerScene_onInvestmentDataChanged;
   o.onOperationVisibility = MO.FEaiChartMarketerScene_onOperationVisibility;
   o.onProcessReady = MO.FEaiChartMarketerScene_onProcessReady;
   o.onProcess = MO.FEaiChartMarketerScene_onProcess;
   o.onSwitchProcess = MO.FEaiChartMarketerScene_onSwitchProcess;
   o.onSwitchComplete = MO.FEaiChartMarketerScene_onSwitchComplete;
   o.setup = MO.FEaiChartMarketerScene_setup;
   o.showParticle = MO.FEaiChartMarketerScene_showParticle;
   o.showFace = MO.FEaiChartMarketerScene_showFace;
   o.fixMatrix = MO.FEaiChartMarketerScene_fixMatrix;
   o.processResize = MO.FEaiChartMarketerScene_processResize;
   return o;
}
MO.FEaiChartMarketerScene_onInvestmentDataChanged = function FEaiChartMarketerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartMarketerScene_onOperationVisibility = function FEaiChartMarketerScene_onOperationVisibility(event) {
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
MO.FEaiChartMarketerScene_onProcessReady = function FEaiChartMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartMarketerScene_onProcess = function FEaiChartMarketerScene_onProcess() {
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
MO.FEaiChartMarketerScene_onSwitchProcess = function FEaiChartMarketerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartMarketerScene_onSwitchComplete = function FEaiChartMarketerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartMarketerScene_setup = function FEaiChartMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.marketer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMarketerTable);
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
MO.FEaiChartMarketerScene_showParticle = function FEaiChartMarketerScene_showParticle(provinceEntity, cityResource) {
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
MO.FEaiChartMarketerScene_showFace = function FEaiChartMarketerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartMarketerScene_fixMatrix = function FEaiChartMarketerScene_fixMatrix(matrix) {
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
MO.FEaiChartMarketerScene_processResize = function FEaiChartMarketerScene_processResize() {
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
MO.FEaiChartMarketerTable = function FEaiChartMarketerTable(o) {
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
   o.onImageLoad           = MO.FEaiChartMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMarketerTable_onPaintBegin;
   o.construct             = MO.FEaiChartMarketerTable_construct;
   o.setup                 = MO.FEaiChartMarketerTable_setup;
   o.setRankUnits          = MO.FEaiChartMarketerTable_setRankUnits;
   o.pushUnit              = MO.FEaiChartMarketerTable_pushUnit;
   o.drawRow               = MO.FEaiChartMarketerTable_drawRow;
   o.dispose               = MO.FEaiChartMarketerTable_dispose;
   return o;
}
MO.FEaiChartMarketerTable_onImageLoad = function FEaiChartMarketerTable_onImageLoad(){
   this.dirty();
}
MO.FEaiChartMarketerTable_onPaintBegin = function FEaiChartMarketerTable_onPaintBegin(event){
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
MO.FEaiChartMarketerTable_construct = function FEaiChartMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartMarketerTable_setup = function FEaiChartMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/marketer/title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setLocation(50, 170);
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
   grid.rowFont().size = 20;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(110);
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
   column.setWidth(140);
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
   column.setWidth(140);
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
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('客户数');
   column.setDataName('customer_count');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
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
   grid.rowFont().size = 20;
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
MO.FEaiChartMarketerTable_setRankUnits = function FEaiChartMarketerTable_setRankUnits(units){
   var o = this;
   var grid = o._gridRank;
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
      row.set('department_label', departmentLabel);
      row.set('marketer_label', unit.marketerLabel());
      row.set('investment_total', unit.investmentTotal());
      row.set('redemption_total', unit.redemptionTotal());
      row.set('netinvestment_total', unit.netinvestmentTotal());
      row.set('customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
MO.FEaiChartMarketerTable_pushUnit = function FEaiChartMarketerTable_pushUnit(unit){
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
MO.FEaiChartMarketerTable_dispose = function FEaiChartMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartMarketerTimeline = function FEaiChartMarketerTimeline(o) {
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
   o.oeUpdate          = MO.FEaiChartMarketerTimeline_oeUpdate;
   o.construct         = MO.FEaiChartMarketerTimeline_construct;
   o.sync              = MO.FEaiChartMarketerTimeline_sync;
   o.drawTrend         = MO.FEaiChartMarketerTimeline_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMarketerTimeline_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMarketerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartMarketerTimeline_construct = function FEaiChartMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMarketerTrendInfo);
}
MO.FEaiChartMarketerTimeline_sync = function FEaiChartMarketerTimeline_sync() {
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
   statisticsLogic.doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}
MO.FEaiChartMarketerTimeline_on24HDataFetch = function FEaiChartMarketerTimeline_on24HDataFetch(event) {
   var o = this;
   o._trendInfo.unserializeEncryptedBuffer(event.sign, event.content, true);
   o.dirty();
}
MO.FEaiChartMarketerTimeline_oeUpdate = function FEaiChartMarketerTimeline_oeUpdate(event) {
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
MO.FEaiChartMarketerTimeline_drawTrend = function FEaiChartMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor){
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
MO.FEaiChartMarketerTimeline_onPaintBegin = function FEaiChartMarketerTimeline_onPaintBegin(event) {
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
MO.FEaiChartMarketerTrendInfo = function FEaiChartMarketerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investmentTotal    = MO.Class.register(o, [new MO.AGetter('_investmentTotal'), new MO.APersistence('_investmentTotal', MO.EDataType.Double)]);
   o._redemptionTotal    = MO.Class.register(o, [new MO.AGetter('_redemptionTotal'), new MO.APersistence('_redemptionTotal', MO.EDataType.Double)]);
   o._netinvestmentTotal = MO.Class.register(o, [new MO.AGetter('_netinvestmentTotal'), new MO.APersistence('_netinvestmentTotal', MO.EDataType.Double)]);
   o._interestTotal      = MO.Class.register(o, [new MO.AGetter('_interestTotal'), new MO.APersistence('_interestTotal', MO.EDataType.Double)]);
   o._performanceTotal   = MO.Class.register(o, [new MO.AGetter('_performanceTotal'), new MO.APersistence('_performanceTotal', MO.EDataType.Double)]);
   o._units = MO.Class.register(o, [new MO.AGetter('_units'), new MO.APersistence('_units', MO.EDataType.Objects, MO.FEaiChartMarketerTrendUnit)]);
   return o;
}
MO.FEaiChartMarketerTrendUnit = function FEaiChartMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._interest      = MO.Class.register(o, [new MO.AGetter('_interest'), new MO.APersistence('_interest', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
