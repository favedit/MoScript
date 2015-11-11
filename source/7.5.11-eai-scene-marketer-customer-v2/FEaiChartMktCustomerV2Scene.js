//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartMktCustomerV2Scene = function FEaiChartMktCustomerV2Scene(o) {
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
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
   o._liveTable              = null;
   o.doughnut                = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.onOperationDown         = MO.FEaiChartMktCustomerV2Scene_onOperationDown;
   o.onInvestmentDataChanged = MO.FEaiChartMktCustomerV2Scene_onInvestmentDataChanged;
   o.on24HDataChanged        = MO.FEaiChartMktCustomerV2Scene_on24HDataChanged;
   o.onOperationVisibility   = MO.FEaiChartMktCustomerV2Scene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartMktCustomerV2Scene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktCustomerV2Scene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartMktCustomerV2Scene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktCustomerV2Scene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiChartMktCustomerV2Scene_setup;
   o.showFace                = MO.FEaiChartMktCustomerV2Scene_showFace;
   o.fixMatrix               = MO.FEaiChartMktCustomerV2Scene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartMktCustomerV2Scene_processResize;
   o.onCurvesChanged         = MO.FEaiChartMktCustomerV2Scene_onCurvesChanged;
   o._curvesCanvas           = null;
   o._flag = 0;
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_onOperationDown = function FEaiChartMktCustomerV2Scene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}

//==========================================================
// <T>24小时曲线数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_on24HDataChanged = function FEaiChartMktCustomerV2Scene_on24HDataChanged(event) {
   var o = this;
   // 设置表格数据
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();

}

//==========================================================
// <T>甜甜圈线数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_onCurvesChanged = function FEaiChartMktCustomerV2Scene_onCurvesChanged(event) {
   var o = this;
   // 设置数据
   var doughnut = o._doughnut;
   doughnut.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   // var trend = doughnut._trendInfo ;
   // trend = doughnut.trendInfos().units();
   doughnut.dirty();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_onInvestmentDataChanged = function FEaiChartMktCustomerV2Scene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   // 设置表格数据
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table._rankdata = event;
   table.pushUnit(unit);
   table.dirty();
   var curves  = MO.Class.create(MO.FEaiChartMktCustomerV2TransferCurve);
   o._flag++;
   switch (o._flag%5){
      case 0:
      curves._sx = 260;
      curves._sy = 360;
      curves._ex = 500;
      curves._ey = 600;
      break;
      case 1:
      curves._sx = 300;
      curves._sy = 400;
      curves._ex = 500;
      curves._ey = 600;
      break;
      case 2:
      curves._sx = 100;
      curves._sy = 200;
      curves._ex = 500;
      curves._ey = 600;
      break;
      case 3:
      curves._sx = 260;
      curves._sy = 360;
      curves._ex = 360;
      curves._ey = 470;
      break;
      case 4:
      curves._sx = 300;
      curves._sy = 400;
      curves._ex = 500;
      curves._ey = 600;
      break;

   }
   if (o._flag ==0) {o._curvesCanvas._curves.push(curves);}else{
   o._curvesCanvas._curves.pop();
   o._curvesCanvas._curves.push(curves);
}
   o._curvesCanvas.dirty();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_onOperationVisibility = function FEaiChartMktCustomerV2Scene_onOperationVisibility(event) {
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
MO.FEaiChartMktCustomerV2Scene_onProcessReady = function FEaiChartMktCustomerV2Scene_onProcessReady() {
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
MO.FEaiChartMktCustomerV2Scene_onProcess = function FEaiChartMktCustomerV2Scene_onProcess() {
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
MO.FEaiChartMktCustomerV2Scene_onSwitchProcess = function FEaiChartMktCustomerV2Scene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_onSwitchComplete = function FEaiChartMktCustomerV2Scene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Scene_setup = function FEaiChartMktCustomerV2Scene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBarV2');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktCustomerV2Processor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   invement.addCurvesChangedListener(o,o.onCurvesChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktCustomerV2Timeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktCustomerV2Table);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
  //创建产品数据
   var doughnut = o._doughnut= MO.Class.create(MO.FEaiChartMktCustomerV2Doughnut);
   doughnut.setName('doughnut');
   doughnut.linkGraphicContext(o);
   liveTable.build();
   o._guiManager.register(doughnut);

   //创建曲线
   var curves =  o._curvesCanvas = MO.Class.create(MO.FEaiChartMktCustomerV2CurvesCanvas);
   curves.setName('curves');
   curves.linkGraphicContext(o);
   curves.build();
   o._guiManager.register(curves);



   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
   // 加载世界数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Scene_showFace = function FEaiChartMktCustomerV2Scene_showFace() {
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
MO.FEaiChartMktCustomerV2Scene_fixMatrix = function FEaiChartMktCustomerV2Scene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -30.9;
      matrix.ty = -9.5;
      matrix.tz = 0;
      matrix.setScale(0.26, 0.28, 0.26);
   }
   matrix.update();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Scene_processResize = function FEaiChartMktCustomerV2Scene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical();
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
      control.setRight(80);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(680);
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
      timeline.setBottom(10);
      //timeline.setRight(780);
      timeline.setRight(680);
      timeline.setHeight(300);
   }
   //..........................................................
   // 设置表格
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
      //liveTable.setWidth(760);
      liveTable.setWidth(660);
   }
   var doughnut = o._doughnut;
   if (isVertical) {
      doughnut.setDockCd(MO.EUiDock.Bottom);
      doughnut.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      doughnut.setLeft(10);
      doughnut.setRight(10);
      doughnut.setBottom(10);
      doughnut.setHeight(900);
   } else {
     // doughnut.setDockCd(MO.EUiDock.Left);
     // doughnut.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      //doughnut.setAnchorCd(MO.EUiAnchor.All);
      doughnut.setTop(220);
      doughnut.setLeft(0);
      doughnut.setBottom(10);
      doughnut.setWidth(240);
      doughnut.setHeight(580);
   }
   var curvesCanvas = o._curvesCanvas;
   if (isVertical) {
      curvesCanvas.setDockCd(MO.EUiDock.Bottom);
      curvesCanvas.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      curvesCanvas.setLeft(10);
      curvesCanvas.setRight(10);
      curvesCanvas.setBottom(10);
      curvesCanvas.setHeight(900);
   } else {
     // doughnut.setDockCd(MO.EUiDock.Left);
     // doughnut.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      //doughnut.setAnchorCd(MO.EUiAnchor.All);
      curvesCanvas.setTop(200);
      curvesCanvas.setLeft(0);
      curvesCanvas.setBottom(10);
      curvesCanvas.setWidth(1060);
      curvesCanvas.setHeight(960);
   }
   //..........................................................
   // 重新设置矩阵
   o.fixMatrix(o._processor.display().matrix());
}
