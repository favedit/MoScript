//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartDptMarketerScene = function FEaiChartDptMarketerScene(o) {
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                   = MO.EEaiScene.ChartDepartmentMarketer;
   // @attribute
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   // @attribute
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick               = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   // @attribute
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.onOperationDown         = MO.FEaiChartDptMarketerScene_onOperationDown;
   o.onInvestmentDataChanged = MO.FEaiChartDptMarketerScene_onInvestmentDataChanged;
   o.onOperationVisibility   = MO.FEaiChartDptMarketerScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartDptMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartDptMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartDptMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartDptMarketerScene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiChartDptMarketerScene_setup;
   o.showParticle            = MO.FEaiChartDptMarketerScene_showParticle;
   o.showFace                = MO.FEaiChartDptMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartDptMarketerScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartDptMarketerScene_processResize;
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_onOperationDown = function FEaiChartDptMarketerScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_onInvestmentDataChanged = function FEaiChartDptMarketerScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;

   // 设置表格数据
   var table = o._liveTable;
   table.setRankDayUnits(event.rankDayUnits);
   table.setRankWeekUnits(event.rankWeekUnits);
   table.setRankMonthUnits(event.rankMonthUnits);

   table.pushUnit(unit);
   table.dirty();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_onOperationVisibility = function FEaiChartDptMarketerScene_onOperationVisibility(event) {
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

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_onProcessReady = function FEaiChartDptMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示城市
   o._mapEntity.showCity();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_onProcess = function FEaiChartDptMarketerScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   // 检测首次播放
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
   // 重复播放
   if (o._playing) {
      // 播放地图
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         return;
      }
      // 显示界面
      if (!o._mapReady) {
         o._guiManager.show();
         // 淡出显示界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 刷新时间
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      // 投资处理
      o._processor.process();
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 获取所有信息
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         // MO.Class.create(MO.FEaiChartDptMarketerProcessor);
          // 投资总金额
         var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         investmentTotalCount.setValue(parseInt(processor.investmentTotal()).toString());
         // 赎回总金额
         var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
         redemptionTotalCount.setValue(parseInt(processor.redemptionTotal()).toString());
         // 净投总金额 
         var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
         netinvestmentTotalCount.setValue(parseInt(processor.netinvestmentTotal()).toString());
        
         // 当日投资总金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementDayCurrent()).toString());
         // 当日赎回总金额
         var redemptionTotal = logoBar.findComponent('redemptionTotal');
         redemptionTotal.setValue(parseInt(processor.redemptionDayCurrent()).toString());
         // 当日净投总金额     
         var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
         netinvestmentTotal.setValue(parseInt(processor.netinvestmentDayCurrent()).toString());
         // 利息总金额
         //var interestTotal = logoBar.findComponent('interestTotal');
         //interestTotal.setValue(parseInt(processor.interestDayCurrent()).toString());
       

      }
      //..........................................................
      // 更新时间
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

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_onSwitchProcess = function FEaiChartDptMarketerScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_onSwitchComplete = function FEaiChartDptMarketerScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_setup = function FEaiChartDptMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.marketer.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartDptMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartDptMarketerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartDptMarketerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 创建粒子
   //var context = o._graphicContext;
   //var particle = o._particle = context.createObject(MO.FE3dFireworksParticle);
   //var particleData = context.createObject(MO.FE3dParticleData);
   //particleData.loadUrl('{eai.resource}/particle/6.png');
   //particle.setData(particleData);
   //o.fixMatrix(particle.matrix());
   //o._activeStage.spriteLayer().pushRenderable(particle);
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
   // 加载世界数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}

//==========================================================
// <T>显示粒子处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_showParticle = function FEaiChartDptMarketerScene_showParticle(provinceEntity, cityResource) {
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   //particle.color().set(Math.random(), Math.random(), Math.random(), 1);
   particle.color().set(1, 1, 0, 1);
   for (var i = 0; i < count; i++) {
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      //particle.color().set(Math.random(), Math.random(), Math.random(), 1);
      //particle.position().set((x - 5) * 2, 0, 0);
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      //particle.setSpeed(Math.random() * 6 + 0.2 * i);
      particle.setSpeed(4 + 0.4 * i);
      //particle.setSpeed(speed);
      //particle.setAngle(Math.PI * 2 / 90 * i);
      //particle.setAcceleration(-Math.random() );
      particle.setAcceleration(0);
      //particle.setAttenuation(attenuation);
      particle.setAttenuation(0.8);
      particle.start();
   }
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_showFace = function FEaiChartDptMarketerScene_showFace() {
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 显示画板
   var desktop = o._application.desktop();
   desktop.show();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartDptMarketerScene_fixMatrix = function FEaiChartDptMarketerScene_fixMatrix(matrix) {
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

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartDptMarketerScene_processResize = function FEaiChartDptMarketerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
      // 重新设置矩阵
   o.fixMatrix(o._processor.display().matrix());
   //..........................................................
   // 设置大小
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   //..........................................................
   // 设置南海
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
   //..........................................................
   // 设置时间轴
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
   //..........................................................
   // 设置表格
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