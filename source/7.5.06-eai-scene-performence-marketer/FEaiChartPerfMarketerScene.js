//==========================================================
// <T>理财师分布场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartPerfMarketerScene = function FEaiChartPerfMarketerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                   = MO.EEaiScene.ChartCustomer;
   // @attribute
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   // @attribute
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   // @attribute
   o._logoBar                = null;
   o._timeline               = null;
   o._head                   = null;
   o._charts                 = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.on24HDataChanged        = MO.FEaiChartPerfMarketerScene_on24HDataChanged;
   o.onOperationVisibility   = MO.FEaiChartPerfMarketerScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartPerfMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartPerfMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartPerfMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartPerfMarketerScene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiChartPerfMarketerScene_setup;
   o.showParticle            = MO.FEaiChartPerfMarketerScene_showParticle;
   o.showFace                = MO.FEaiChartPerfMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartPerfMarketerScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartPerfMarketerScene_processResize;
   return o;
}

//==========================================================
// <T>24小时曲线数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_on24HDataChanged = function FEaiChartPerfMarketerScene_on24HDataChanged(event) {
   var o = this;
   // 设置表格数据
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_onOperationVisibility = function FEaiChartPerfMarketerScene_onOperationVisibility(event) {
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
MO.FEaiChartPerfMarketerScene_onProcessReady = function FEaiChartPerfMarketerScene_onProcessReady() {
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
MO.FEaiChartPerfMarketerScene_onProcess = function FEaiChartPerfMarketerScene_onProcess() {
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
         // return;
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
      // 投资处理
      o._processor.process();
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 获取所有信息
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         // // MO.Class.create(MO.FEaiChartDptMarketerProcessor);
         // // 投资总金额
         // var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         // investmentTotalCount.setValue(parseInt(processor.investmentTotal()).toString());
         // // 赎回总金额
         // var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
         // redemptionTotalCount.setValue(parseInt(processor.redemptionTotal()).toString());
         // // 净投总金额 
         // var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
         // netinvestmentTotalCount.setValue(parseInt(processor.netinvestmentTotal()).toString());

         // // 当日投资总金额
         // var investmentTotal = logoBar.findComponent('investmentTotal');
         // investmentTotal.setValue(parseInt(processor.invementDayCurrent()).toString());
         // // 当日赎回总金额
         // var redemptionTotal = logoBar.findComponent('redemptionTotal');
         // redemptionTotal.setValue(parseInt(processor.redemptionDayCurrent()).toString());
         // // 当日净投总金额     
         // var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
         // netinvestmentTotal.setValue(parseInt(processor.netinvestmentDayCurrent()).toString());
         // // 利息总金额
         // //var interestTotal = logoBar.findComponent('interestTotal');
         // //interestTotal.setValue(parseInt(processor.interestDayCurrent()).toString());
       

         // 投资总金额
         var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
         investmentTotalCount.setValue(parseInt(processor.invementTotalCurrent()).toString());
         // 日投资金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      //..........................................................
      // 更新时间
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         // var dateControl = bar.findComponent('date');
         // dateControl.setLabel(date.format('YYYY/MM/DD'));
         // var timeControl = bar.findComponent('time');
         // timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_onSwitchProcess = function FEaiChartPerfMarketerScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_onSwitchComplete = function FEaiChartPerfMarketerScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerScene_setup = function FEaiChartPerfMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.performence-marketer.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartPerfMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);

   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartPerfMarketerChart);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建头部 标题
   var head = o._head = MO.Class.create(MO.FEaiChartPerfMarketerHead);
   timeline.setName('head');
   head.linkGraphicContext(o);
   head.setup();
   head.build();
   o._guiManager.register(head);

   //..........................................................
   // 多张图表
   var charts = o._charts = MO.Class.create(MO.FEaiChartPerfMarketerCharts);
   charts.linkGraphicContext(o);
   charts.setup();
   charts.build();
   o._guiManager.register(charts);
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
MO.FEaiChartPerfMarketerScene_showParticle = function FEaiChartPerfMarketerScene_showParticle(provinceEntity, cityResource) {
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
MO.FEaiChartPerfMarketerScene_showFace = function FEaiChartPerfMarketerScene_showFace() {
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
MO.FEaiChartPerfMarketerScene_fixMatrix = function FEaiChartPerfMarketerScene_fixMatrix(matrix) {
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

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_processResize = function FEaiChartPerfMarketerScene_processResize() {
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
      control.setBottom(280);
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
      // timeline.setLeft(457);
      // timeline.setTop(279);
      // // timeline.setBottom(30);
      // // timeline.setRight(780);
      // timeline.setHeight(236)
   }
   //..........................................................
   // 设置头部
   var heads = o._head;
   if (isVertical) {
      // wap
      heads.setDockCd(MO.EUiDock.RightTop);
      heads.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      heads.setLeft(10);
      heads.setRight(10);
      heads.setBottom(10);
      heads.setWidth(1060);
      heads.setHeight(900);
   } else {
      // pc
      heads.setDockCd(MO.EUiDock.Right);
      heads.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      heads.setTop(26);
      heads.setRight(0);
      heads.setLeft(11);
      heads.setBottom(0);
      heads.setHeight(176);
      heads.setWidth(1894);
   }
   //..........................................................
   // 设置图表
   var charts = o._charts;
   if (isVertical) {
      charts.setDockCd(MO.EUiDock.Bottom);
      charts.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      charts.setLeft(10);
      charts.setRight(10);
      charts.setBottom(10);
      charts.setWidth(1060);
      charts.setHeight(900);
   } else {
      charts.setDockCd(MO.EUiDock.Bottom);
      charts.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      charts.setTop(0);
      charts.setRight(24);
      charts.setLeft(24);
      charts.setBottom(20);
      charts.setHeight(862);
      charts.setWidth(1876);
   }

}