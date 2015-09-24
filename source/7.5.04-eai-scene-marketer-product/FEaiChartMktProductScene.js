//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartMktProductScene = function FEaiChartMktProductScene(o) {
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
 //  o._timeline               = null;
   o._liveTable              = null;
   o._circleProduct          = null;
   o._bubbleCanvas           = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.onOperationDown         = MO.FEaiChartMktProductScene_onOperationDown;
   o.onInvestmentDataChanged = MO.FEaiChartMktProductScene_onInvestmentDataChanged;
   o.onTrendDataChanged      = MO.FEaiChartMktProductScene_onTrendDataChanged;
   o.onOperationVisibility   = MO.FEaiChartMktProductScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartMktProductScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktProductScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartMktProductScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktProductScene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiChartMktProductScene_setup;
   o.showParticle            = MO.FEaiChartMktProductScene_showParticle;
   o.showFace                = MO.FEaiChartMktProductScene_showFace;
   o.fixMatrix               = MO.FEaiChartMktProductScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartMktProductScene_processResize;
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktProductScene_onOperationDown = function FEaiChartMktProductScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}

//==========================================================
// <T>产品数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
// //==========================================================
MO.FEaiChartMktProductScene_onTrendDataChanged = function FEaiChartMktProductScene_onTrendDataChanged(event) {
   var o = this;
   o._circleProduct.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   o._circleProduct.dirty();
 }

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktProductScene_onInvestmentDataChanged = function FEaiChartMktProductScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   // 设置表格数据
   var table = o._liveTable;
//   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
   var circle= o._circleProduct;
   circle.dirty();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
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

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktProductScene_onProcessReady = function FEaiChartMktProductScene_onProcessReady() {
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
MO.FEaiChartMktProductScene_onProcess = function FEaiChartMktProductScene_onProcess() {
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
         //return;
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
         // 投资总金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         // 日投资金额
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
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
MO.FEaiChartMktProductScene_onSwitchProcess = function FEaiChartMktProductScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktProductScene_onSwitchComplete = function FEaiChartMktProductScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktProductScene_setup = function FEaiChartMktProductScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktProductProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.addTrenderDataChangedListener(o, o.onTrendDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   // 创建时间轴
   // var stage = o.activeStage();
   // var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktProductTimeline);
   // timeline.setName('Timeline');
   // timeline.linkGraphicContext(o);
   // timeline.build();
   // o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktProductTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   // 创建产品泡泡画板
   var bubbleCanvas = o._bubbleCanvas = MO.Class.create(MO.FGuiBubbleCanvas);
   bubbleCanvas.setName('BubbleCanvas');
   bubbleCanvas.linkGraphicContext(o);
   bubbleCanvas.build();
   o._guiManager.register(bubbleCanvas);
   //..........................................................
   
   //创建产品空心圈
    var circleProduct = o._circleProduct = MO.Class.create(MO.FEaiChartMktProductCircle);
    circleProduct.setName('circleProduct');
    circleProduct.linkGraphicContext(o);
    circleProduct.build();
    o._guiManager.register(circleProduct);


   //..........................................................

   // 隐藏全部界面
   o._guiManager.hide();
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
MO.FEaiChartMktProductScene_showParticle = function FEaiChartMktProductScene_showParticle(provinceEntity, cityResource) {
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
MO.FEaiChartMktProductScene_showFace = function FEaiChartMktProductScene_showFace() {
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

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktProductScene_processResize = function FEaiChartMktProductScene_processResize() {
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

   var circleProduct = o._circleProduct;
      if (isVertical) {
      circleProduct.setDockCd(MO.EUiDock.Bottom);
      circleProduct.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      circleProduct.setLeft(10);
      circleProduct.setRight(10);
      circleProduct.setBottom(10);
      circleProduct.setWidth(1060);
      circleProduct.setHeight(900);
   } else {
      circleProduct.setDockCd(MO.EUiDock.Right);
      circleProduct.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      circleProduct.setTop(10);
      circleProduct.setRight(0);
      circleProduct.setBottom(10);
      circleProduct.setWidth(750);
   }
   //..........................................................
   // // 设置时间轴
   // var timeline = o._timeline;
   // if (isVertical) {
   //    timeline.setDockCd(MO.EUiDock.Bottom);
   //    timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   //    timeline.setLeft(10);
   //    timeline.setRight(10);
   //    timeline.setBottom(920);
   //    timeline.setHeight(250);
   // } else {
   //    timeline.setDockCd(MO.EUiDock.Bottom);
   //    timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   //    timeline.setLeft(20);
   //    timeline.setBottom(30);
   //    timeline.setRight(780);
   //    timeline.setHeight(250);
   // }
   //..........................................................
   // 设置表格
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
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      liveTable.setLeft(20);
      liveTable.setBottom(20);
      liveTable.setRight(780);
      liveTable.setHeight(250);
   }
   //..........................................................
   // 设置泡泡画布
   var canvas = o._bubbleCanvas;
   if (isVertical) {
      canvas.setDockCd(MO.EUiDock.Right);
      canvas.setAnchorCd(MO.EUiAnchor.Top | MO.EUiAnchor.Bottom | MO.EUiAnchor.Right);
      canvas.setTop(10);
      canvas.setBottom(20);
      canvas.setRight(10);
      canvas.setWidth(800);
      canvas.setHeight(1050);
   } else {
      canvas.setDockCd(MO.EUiDock.Right);
      canvas.setAnchorCd(MO.EUiAnchor.Top | MO.EUiAnchor.Bottom | MO.EUiAnchor.Right);
      canvas.setTop(10);
      canvas.setBottom(20);
      canvas.setRight(10);
      canvas.setWidth(800);
      canvas.setHeight(1050);
   }
}