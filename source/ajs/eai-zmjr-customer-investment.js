MO.FEaiChartSesameFinancialScene = function FEaiChartSesameFinancialScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                     = MO.EEaiScene.ChartCustomer;
   o._processor                = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent         = 0;
   o._ready                    = false;
   o._mapReady                 = false;
   o._playing                  = false;
   o._lastTick                 = 0;
   o._interval                 = 10;
   o._logoBar                  = null;
   o._timeline                 = null;
   o._provinceTable            = null;
   o._statusStart              = false;
   o._statusLayerCount         = 100;
   o._statusLayerLevel         = 100;
   o.onOperationDown           = MO.FEaiChartSesameFinancialScene_onOperationDown;
   o.on24HDataChanged          = MO.FEaiChartSesameFinancialScene_on24HDataChanged;
   o.onInfoProvinceDataChanged = MO.FEaiChartSesameFinancialScene_onInfoProvinceDataChanged;
   o.onOperationVisibility     = MO.FEaiChartSesameFinancialScene_onOperationVisibility;
   o.onProcessReady            = MO.FEaiChartSesameFinancialScene_onProcessReady;
   o.onProcess                 = MO.FEaiChartSesameFinancialScene_onProcess;
   o.onSwitchProcess           = MO.FEaiChartSesameFinancialScene_onSwitchProcess;
   o.onSwitchComplete          = MO.FEaiChartSesameFinancialScene_onSwitchComplete;
   o.setup                     = MO.FEaiChartSesameFinancialScene_setup;
   o.showParticle              = MO.FEaiChartSesameFinancialScene_showParticle;
   o.showFace                  = MO.FEaiChartSesameFinancialScene_showFace;
   o.fixMatrix                 = MO.FEaiChartSesameFinancialScene_fixMatrix;
   o.processResize             = MO.FEaiChartSesameFinancialScene_processResize;
   return o;
}
MO.FEaiChartSesameFinancialScene_onOperationDown = function FEaiChartSesameFinancialScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}
MO.FEaiChartSesameFinancialScene_on24HDataChanged = function FEaiChartSesameFinancialScene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.dirty();
}
MO.FEaiChartSesameFinancialScene_onInfoProvinceDataChanged = function FEaiChartSesameFinancialScene_onInfoProvinceDataChanged(event) {
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
MO.FEaiChartSesameFinancialScene_showParticle = function FEaiChartSesameFinancialScene_showParticle(provinceEntity, cityResource) {
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
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setLeft(10);
      provinceTable.setRight(10);
      provinceTable.setBottom(10);
      provinceTable.setWidth(1060);
      provinceTable.setHeight(900);
   } else {
      provinceTable.setDockCd(MO.EUiDock.Right);
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setTop(10);
      provinceTable.setRight(0);
      provinceTable.setBottom(10);
      provinceTable.setWidth(640);
   }
}
