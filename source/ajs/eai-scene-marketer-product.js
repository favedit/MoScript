MO.EGuiArcDirection = new function EGuiArcDirection(){
   var o = this;
   o.Left         = 'Left';
   o.Top          = 'Top';
   o.Right        = 'Right';
   o.Bottom       = 'Bottom';
   o.Liner        = 'Liner';
   return o;
}
MO.SBezierCurve = function SBezierCurve(){
   var o                   = this;
   o.startPoint            = null;
   o.endPoint              = null;
   o.scp                   = null;
   o.ecp                   = null;
   o.__ax                  = 0;
   o.__bx                  = 0;
   o.__cx                  = 0;
   o.__ay                  = 0;
   o.__by                  = 0;
   o.__cy                  = 0;
   o.calcCoefficient       = MO.SBezierCurve_calcCoefficient;
   o.pointAt               = MO.SBezierCurve_pointAt;
   o.tangentAt             = MO.SBezierCurve_tangentAt;
   o.assign                = MO.SBezierCurve_assign;
   o.dispose               = MO.SBezierCurve_dispose;
   return o;
}
MO.SBezierCurve_calcCoefficient = function SBezierCurve_calcCoefficient() {
   var o = this;
   var cp0 = o.startPoint;
   var cp1 = o.scp;
   var cp2 = o.ecp;
   var cp3 = o.endPoint;
   var cx = 3.0 * (cp1.x - cp0.x);
   var bx = 3.0 * (cp2.x - cp1.x) - cx;
   var ax = cp3.x - cp0.x - cx - bx;
   var cy = 3.0 * (cp1.y - cp0.y);
   var by = 3.0 * (cp2.y - cp1.y) - cy;
   var ay = cp3.y - cp0.y - cy - by;
   o.__cx = cx;
   o.__bx = bx;
   o.__ax = ax;
   o.__cy = cy;
   o.__by = by;
   o.__ay = ay;
}
MO.SBezierCurve_pointAt = function SBezierCurve_pointAt(t, result) {
   var o = this;
   var tSquared = t * t;
   var tCubed = tSquared * t;
   result.x = (o.__ax * tCubed) + (o.__bx * tSquared) + (o.__cx * t) + o.startPoint.x;
   result.y = (o.__ay * tCubed) + (o.__by * tSquared) + (o.__cy * t) + o.startPoint.y;
}
MO.SBezierCurve_tangentAt = function SBezierCurve_tangentAt(t, sPoint, ePoint) {
   var o = this;
   var cp0 = o.startPoint;
   var cp1 = o.scp;
   var cp2 = o.ecp;
   var cp3 = o.endPoint;
   sPoint.x = cp0.x + (cp1.x - cp0.x) * t;
   sPoint.y = cp0.y + (cp1.y - cp0.y) * t;
   ePoint.x = cp2.x + (cp3.x - cp2.x) * t;
   ePoint.y = cp2.y + (cp3.y - cp2.y) * t;
}
MO.SBezierCurve_assign = function SBezierCurve_assign(s) {
   var o = this;
   o.startPoint.assign(s.startPoint);
   o.endPoint.assign(s.endPoint);
   o.scp.assign(s.scp);
   o.ecp.assign(s.ecp);
   o.calcCoefficient();
}
MO.SBezierCurve_dispose = function SBezierCurve_dispose(){
   var o = this;
   o.startPoint = MO.Lang.Object.dispose(o.startPoint);
   o.endPoint = MO.Lang.Object.dispose(o.endPoint);
   o.scp = MO.Lang.Object.dispose(o.scp);
   o.ecp = MO.Lang.Object.dispose(o.ecp);
}
MO.SGuiBubbleStyle = function SGuiBubbleStyle(){
   var o                = this;
   o.radius             = 50;
   o.lineWidth          = 3;
   o.foreFillColor      = '#f9a800';
   o.backFillColor      = '#007cb0';
   o.strokeColor        = '#1f3855';
   o.assign             = MO.SGuiBubbleStyle_assign;
   o.dispose            = MO.SGuiBubbleStyle_dispose;
   return o;
}
MO.SGuiBubbleStyle_assign = function SGuiBubbleStyle_assign(s) {
   var o = this;
   o.radius = s.radius;
   o.lineWidth = s.lineWidth;
   o.foreFillColor = s.foreFillColor;
   o.backFillColor = s.backFillColor;
   o.strokeColor = s.strokeColor;
}
MO.SGuiBubbleStyle_dispose = function SGuiBubbleStyle_dispose(){
   var o = this;
}
MO.SGuiTransferCurveStyle = function SGuiTransferCurveStyle(){
   var o             = this;
   o.lineWidth       = 5;
   o.pointFillStyle  = '#45adbd';
   o.flarePointStyle = '#16a6fd';
   o.arcStepHeight   = 10;
   o.arcDirection    = MO.EUiDock.Left;
   o.flowPeriod      = 2000;
   o.showDuration    = 10000;
   o.arcAngle        = 1;
   o.assign          = MO.SGuiTransferCurveStyle_assign;
   o.dispose         = MO.SGuiTransferCurveStyle_dispose;
   return o;
}
MO.SGuiTransferCurveStyle_assign = function SGuiTransferCurveStyle_assign(s) {
   var o = this;
   o.lineWidth = s.lineWidth;
   o.flareColor = s.flareColor;
   o.lineColor = s.lineColor;
   o.arcStepHeight = s.arcStepHeight;
   o.arcDirection = s.arcDirection;
}
MO.SGuiTransferCurveStyle_dispose = function SGuiTransferCurveStyle_dispose(){
   var o = this;
}
MO.FEaiChartMktProductProcessor = function FEaiChartMktProductProcessor(o){
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
   o.onDynamicData            = MO.FEaiChartMktProductProcessor_onDynamicData;
   o.construct                = MO.FEaiChartMktProductProcessor_construct;
   o.allocUnit                = MO.FEaiChartMktProductProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartMktProductProcessor_allocShape;
   o.setup                    = MO.FEaiChartMktProductProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartMktProductProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartMktProductProcessor_focusEntity;
   o.process                  = MO.FEaiChartMktProductProcessor_process;
   o.dispose                  = MO.FEaiChartMktProductProcessor_dispose;
   return o;
}
MO.FEaiChartMktProductProcessor_onDynamicData = function FEaiChartMktProductProcessor_onDynamicData(event){
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
MO.FEaiChartMktProductProcessor_construct = function FEaiChartMktProductProcessor_construct(){
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
   o._dynamicInfo = MO.Class.create(MO.FEaiChartMktCustomerDynamicInfo);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
}
MO.FEaiChartMktProductProcessor_allocUnit = function FEaiChartMktProductProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartMktProductProcessor_setup = function FEaiChartMktProductProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartMktProductProcessor_calculateCurrent = function FEaiChartMktProductProcessor_calculateCurrent(){
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
MO.FEaiChartMktProductProcessor_focusEntity = function FEaiChartMktProductProcessor_focusEntity(unit){
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
MO.FEaiChartMktProductProcessor_process = function FEaiChartMktProductProcessor_process(){
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
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
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
MO.FEaiChartMktProductProcessor_dispose = function FEaiChartMktProductProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartMktProductScene = function FEaiChartMktProductScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartMarketerProduct;
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
   o.onInvestmentDataChanged = MO.FEaiChartMktProductScene_onInvestmentDataChanged;
   o.onOperationVisibility   = MO.FEaiChartMktProductScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartMktProductScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktProductScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartMktProductScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktProductScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartMktProductScene_setup;
   o.showFace                = MO.FEaiChartMktProductScene_showFace;
   o.fixMatrix               = MO.FEaiChartMktProductScene_fixMatrix;
   o.processResize           = MO.FEaiChartMktProductScene_processResize;
   return o;
}
MO.FEaiChartMktProductScene_onInvestmentDataChanged = function FEaiChartMktProductScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartMktProductScene_onOperationVisibility = function FEaiChartMktProductScene_onOperationVisibility(event) {
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
MO.FEaiChartMktProductScene_onProcessReady = function FEaiChartMktProductScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartMktProductScene_onProcess = function FEaiChartMktProductScene_onProcess() {
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
MO.FEaiChartMktProductScene_onSwitchProcess = function FEaiChartMktProductScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartMktProductScene_onSwitchComplete = function FEaiChartMktProductScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartMktProductScene_setup = function FEaiChartMktProductScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktProductProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktProductTable);
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
MO.FEaiChartMktProductScene_showParticle = function FEaiChartMktProductScene_showParticle(provinceEntity, cityResource) {
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
MO.FEaiChartMktProductScene_showFace = function FEaiChartMktProductScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartMktProductScene_fixMatrix = function FEaiChartMktProductScene_fixMatrix(matrix) {
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
MO.FEaiChartMktProductScene_processResize = function FEaiChartMktProductScene_processResize() {
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
      control.setBottom(380);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
   } else {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
         liveTable.setLeft(20);
         liveTable.setBottom(30);
         liveTable.setRight(780);
         liveTable.setHeight(250);
   }
}
MO.FEaiChartMktProductTable = function FEaiChartMktProductTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
    o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiChartMktProductTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartMktProductTable_onPaintBegin;
   o.construct = MO.FEaiChartMktProductTable_construct;
   o.setup = MO.FEaiChartMktProductTable_setup;
   o.pushUnit = MO.FEaiChartMktProductTable_pushUnit;
   o.drawRow = MO.FEaiChartMktProductTable_drawRow;
   o.dispose = MO.FEaiChartMktProductTable_dispose;
   return o;
}
MO.FEaiChartMktProductTable_onImageLoad = function FEaiChartMktProductTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartMktProductTable_onPaintBegin = function FEaiChartMktProductTable_onPaintBegin(event) {
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
MO.FEaiChartMktProductTable_construct = function FEaiChartMktProductTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartMktProductTable_setup = function FEaiChartMktProductTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 32);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
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
   column.setWidth(120);
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
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('modelLabel');
   column.setLabel('投资产品');
   column.setDataName('model_label');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentGain');
   column.setLabel('年化收益');
   column.setDataName('investment_gain');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('bankGain');
   column.setLabel('银行收益');
   column.setDataName('bank_gain');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.cellPadding().right = 10;
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
MO.FEaiChartMktProductTable_pushUnit = function FEaiChartMktProductTable_pushUnit(unit) {
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
MO.FEaiChartMktProductTable_dispose = function FEaiChartMktProductTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiBubble = function FGuiBubble(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   o._bubbleStyle    = MO.Class.register(o, new MO.AGetSet('_bubbleStyle'));
   o._data           = MO.Class.register(o, new MO.AGetSet('_data'));
   o.construct       = MO.FGuiBubble_construct;
   o.bubbleStyle     = MO.FGuiBubble_bubbleStyle;
   o.setBubbleStyle  = MO.FGuiBubble_setBubbleStyle;
   o.setup           = MO.FGuiBubble_setup;
   o.draw            = MO.FGuiBubble_draw;
   o.dispose         = MO.FGuiBubble_dispose;
   return o;
}
MO.FGuiBubble_construct = function FGuiBubble_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
}
MO.FGuiBubble_setup = function FGuiBubble_setup() {
   var o = this;
}
MO.FGuiBubble_draw = function FGuiBubble_draw(context) {
   var o = this;
   var graphic = context.graphic;
   var hCenter = o.left() + o.width() / 2;
   var vCenter = o.top() + o.height() / 2;
   var style = o._bubbleStyle;
   graphic.drawCircle(hCenter, vCenter, style.radius, style.lineWidth, style.strokeColor, style.backFillColor);
   var handle = graphic._handle;
   handle.save();
   handle.beginPath();
   handle.arc(hCenter, vCenter, style.radius, 0, 2 * Math.PI, false);
   handle.clip();
   var fillY = o.top() + o.height() * (1 - 0.618);
   graphic.fillRectangle(o.left(), fillY, o.width(), o.height(), style.foreFillColor);
   graphic.drawCircle(hCenter, vCenter, style.radius, style.lineWidth, style.strokeColor, '');
   handle.restore();
}
MO.FGuiBubble_dispose = function FGuiBubble_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o._bubbleStyle = MO.Lang.Object.dispose(o._bubbleStyle);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiBubbleCanvas = function FGuiBubbleCanvas(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._gap            = MO.Class.register(o, new MO.AGetter('_gap'), 20);
   o._bubbles        = MO.Class.register(o, new MO.AGetter('_bubbles'));
   o._curves         = MO.Class.register(o, new MO.AGetter('_curves'));
   o.construct       = MO.FGuiBubbleCanvas_construct;
   o.onPaintBegin    = MO.FGuiBubbleCanvas_onPaintBegin;
   o.dispose         = MO.FGuiBubbleCanvas_dispose;
   return o;
}
MO.FGuiBubbleCanvas_construct = function FGuiBubbleCanvas_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._bubbles = new MO.TObjects();
   o._curves = new MO.TObjects();
}
MO.FGuiBubbleCanvas_onPaintBegin = function FGuiBubbleCanvas_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;
   var hCenter = rectangle.left + rectangle.width / 2;
   var vCenter = rectangle.top + rectangle.height / 2;
   var bubbles = o._bubbles;
   var bubbleCount = bubbles.count();
   for (var i = 0; i < bubbleCount; i++) {
      var bubble = bubbles.at(i);
      bubble.draw(event);
   }
   var curves = o._curves;
   var curveCount = curves.count();
   for (var i = 0; i < curveCount; i++) {
      var curve = curves.at(i);
      curve.draw(event);
   }
}
MO.FGuiBubbleCanvas_dispose = function FGuiBubbleCanvas_dispose(){
   var o = this;
   o._bubbles = MO.Lang.Object.dispose(o._bubbles);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiTransferCurve = function FGuiTransferCurve(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   o._curveStyle     = MO.Class.register(o, new MO.AGetSet('_curveStyle'));
   o._curveData      = MO.Class.register(o, new MO.AGetSet('_curveData'));
   o._arcLevel       = 1;
   o._startTick      = 0;
   o._drawPoint      = null;
   o._sTangentPoint  = null;
   o._eTangentPoint  = null;
   o._tangentVector  = null;
   o.construct       = MO.FGuiTransferCurve_construct;
   o.setup           = MO.FGuiTransferCurve_setup;
   o.draw            = MO.FGuiTransferCurve_draw;
   o.dispose         = MO.FGuiTransferCurve_dispose;
   return o;
}
MO.FGuiTransferCurve_construct = function FGuiTransferCurve_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   o._drawPoint = new MO.SPoint2(0, 0);
   o._sTangentPoint = new MO.SPoint2(0, 0);
   o._eTangentPoint = new MO.SPoint2(0, 0);
   o._stPoint3 = new MO.SPoint3(0, 0, 0);
   o._etPoint3 = new MO.SPoint3(0, 0, 0);
   o._tangentVector = new MO.SVector3(0, 0, 0);
}
MO.FGuiTransferCurve_setup = function FGuiTransferCurve_setup(startX, startY, endX, endY) {
   var o = this;
   var startPoint = new MO.SPoint2(startX, startY);
   var endPoint = new MO.SPoint2(endX, endY);
   var distX = (endPoint.x - startPoint.x) * 0.5;
   var distY = (endPoint.y - startPoint.y) * 0.5;
   var cpXC = (startPoint.x + endPoint.x) * 0.5;
   var cpYC = (startPoint.y + endPoint.y) * 0.5;
   var cpX1;
   var cpX2;
   var cpY1;
   var cpY2;
   var style = o._curveStyle;
   switch (style.arcDirection) {
      case MO.EGuiArcDirection.Left:
         cpXC -= style.arcStepHeight * o._arcLevel;
         cpX1 = cpX2 = cpXC;
         cpY1 = cpY2 = cpYC;
         cpY1 -= distY * style.arcAngle;
         cpY2 += distY * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Top:
         cpYC -= style.arcStepHeight * o._arcLevel;
         cpY1 = cpY2 = cpYC;
         cpX1 = cpX2 = cpXC;
         cpX1 -= distX * style.arcAngle;
         cpX2 += distX * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Right:
         cpXC += style.arcStepHeight * o._arcLevel;
         cpX1 = cpX2 = cpXC;
         cpY1 = cpY2 = cpYC;
         cpY1 -= distY * style.arcAngle;
         cpY2 += distY * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Bottom:
         cpYC += style.arcStepHeight * o._arcLevel;
         cpY1 = cpY2 = cpYC;
         cpX1 = cpX2 = cpXC;
         cpX1 -= distX * style.arcAngle;
         cpX2 += distX * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Liner:
      default:
         break;
   }
   var curveData = o._curveData = new MO.SBezierCurve();
   curveData.startPoint = startPoint;
   curveData.endPoint = endPoint;
   curveData.scp = new MO.SPoint2(cpX1, cpY1);
   curveData.ecp = new MO.SPoint2(cpX2, cpY2);
   curveData.calcCoefficient();
   o._startTick = MO.Timer.current();
}
MO.FGuiTransferCurve_draw = function FGuiTransferCurve_draw(context) {
   var o = this;
   var graphic = context.graphic;
   var style = o._curveStyle;
   var curveData = o._curveData;
   var startPoint = curveData.startPoint;
   var endPoint = curveData.endPoint;
   var scp = curveData.scp;
   var ecp = curveData.ecp;
   graphic._handle.beginPath();
   graphic._handle.moveTo(startPoint.x, startPoint.y);
   graphic._handle.bezierCurveTo(scp.x, scp.y, ecp.x, ecp.y, endPoint.x, endPoint.y);
   graphic._handle.lineWidth = style.lineWidth;
   graphic._handle.strokeStyle = style.flarePointStyle;
   graphic._handle.stroke();
   var currentTick = MO.Timer.current() - o._startTick;
   var round = currentTick / style.flowPeriod;
   var t = round - parseInt(round);
   var drawPoint = o._drawPoint;
   curveData.pointAt(t, drawPoint);
   var pointFillStyle = graphic._handle.createRadialGradient(drawPoint.x, drawPoint.y, 0, drawPoint.x, drawPoint.y, 10);
   pointFillStyle.addColorStop("0", 'rgba(255, 0, 0, 1.0');
   pointFillStyle.addColorStop("1", 'rgba(255, 0, 0, 0');
   var stPoint = o._sTangentPoint;
   var etPoint = o._eTangentPoint;
   curveData.tangentAt(t, stPoint, etPoint);
   var stPoint3 = o._stPoint3;
   var etPoint3 = o._etPoint3;
   stPoint3.set(stPoint.x, stPoint.y, 0);
   etPoint3.set(etPoint.x, etPoint.y, 0);
   var tangentVector = o._tangentVector.direction(stPoint3, etPoint3);
   tangentVector.normalize();
   var flareFillStyle = graphic._handle.createRadialGradient(drawPoint.x, drawPoint.y, 0, drawPoint.x, drawPoint.y, 50);
   flareFillStyle.addColorStop("0", 'rgba(255, 156, 0, 1.0');
   flareFillStyle.addColorStop("1", 'rgba(251, 107, 0, 0');
   graphic._handle.save();
   graphic._handle.beginPath();
   graphic._handle.moveTo(startPoint.x, startPoint.y);
   graphic._handle.bezierCurveTo(scp.x + 2, scp.y, ecp.x + 2, ecp.y, endPoint.x + 2, endPoint.y);
   graphic._handle.bezierCurveTo(ecp.x - 2, ecp.y, scp.x -2, scp.y, startPoint.x -2, startPoint.y);
   graphic._handle.closePath();
   graphic._handle.clip();
   graphic.drawCircle(drawPoint.x, drawPoint.y, 50, 0, '', flareFillStyle);
   graphic._handle.restore();
}
MO.FGuiTransferCurve_dispose = function FGuiTransferCurve_dispose(){
   var o = this;
   o._curveStyle = MO.Lang.Object.dispose(o._curveStyle);
   o.__base.FGuiControl.dispose.call(o);
}
