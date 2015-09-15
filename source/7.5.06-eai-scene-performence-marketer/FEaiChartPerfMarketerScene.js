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
   o._optionMapCountry       = false;
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
   o._calculate              = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.on24HDataChanged        = MO.FEaiChartPerfMarketerScene_on24HDataChanged;
   o.onProcessReady          = MO.FEaiChartPerfMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartPerfMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartPerfMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartPerfMarketerScene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiChartPerfMarketerScene_setup;
   o.showFace                = MO.FEaiChartPerfMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartPerfMarketerScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartPerfMarketerScene_processResize;
   //@event 
   o.onPerformanceDataChangedListener = MO.FEaiChartPerfMarketerScene_onPerformanceDataChangedListener;
   return o;
}
//==========================================================
// <T>图标数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerScene_onPerformanceDataChangedListener = function FEaiChartPerfMarketerScene_onPerformanceDataChangedListener(event){
   var o = this;
   var charts = o._charts;
   charts.setStartTime(event.beginDate);
   charts.setEndTime(event.endDate);
   charts.setMonthStart(event.monthStarDate);
   charts.setMonthEnd(event.monthEndDate);
   charts.setYearStart(event.yearStarDate);
   charts.setYearEnd(event.yearEndDate);
   charts.setTrendInfo(event);
   // charts.trendInfos().unserializeSignBuffer(event.sign, event.content, true);
   charts.dirty();
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
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   // 重复播放
   if (o._playing) {
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
      if(processor._yearInvestment > 0){
         // // MO.Class.create(MO.FEaiChartDptMarketerProcessor);
         // 当日
         var dayInvestment = logoBar.findComponent('dayInvestment');
         dayInvestment.setValue(parseInt(processor._dayInvestment).toString());
         var dayNetinvestment = logoBar.findComponent('dayNetinvestment');
         dayNetinvestment.setValue(parseInt(processor._dayNetinvestment).toString());
         var dayRedemption = logoBar.findComponent('dayRedemption');
         dayRedemption.setValue(parseInt(processor._dayRedemption).toString());
         var dayCustomerRegister = logoBar.findComponent('dayCustomerRegister');
         dayCustomerRegister.setValue(parseInt(processor._dayCustomerRegister).toString());
         var dayMemberRegister = logoBar.findComponent('dayMemberRegister');
         dayMemberRegister.setValue(parseInt(processor._dayMemberRegister).toString());
         // 当月
         var monthInvestment = logoBar.findComponent('monthInvestment');
         monthInvestment.setValue(parseInt(processor._monthInvestment).toString());
         var monthNetinvestment = logoBar.findComponent('monthNetinvestment');
         monthNetinvestment.setValue(parseInt(processor._monthNetinvestment).toString());
         var monthRedemption = logoBar.findComponent('monthRedemption');
         monthRedemption.setValue(parseInt(processor._monthRedemption).toString());
         var monthCustomerRegister = logoBar.findComponent('monthCustomerRegister');
         monthCustomerRegister.setValue(parseInt(processor._monthCustomerRegister).toString());
         var monthMemberRegister = logoBar.findComponent('monthMemberRegister');
         monthMemberRegister.setValue(parseInt(processor._monthMemberRegister).toString());

         // 累计
         var yearInvestment = logoBar.findComponent('yearInvestment');
         yearInvestment.setValue(parseInt(processor._yearInvestment).toString());
         var yearNetinvestment = logoBar.findComponent('yearNetinvestment');
         yearNetinvestment.setValue(parseInt(processor._yearNetinvestment).toString());
         var yearRedemption = logoBar.findComponent('yearRedemption');
         yearRedemption.setValue(parseInt(processor._yearRedemption).toString());
         var yearCustomerRegister = logoBar.findComponent('yearCustomerRegister');
         yearCustomerRegister.setValue(parseInt(processor._yearCustomerRegister).toString());
         var yearhMemberRegister = logoBar.findComponent('yearhMemberRegister');
         yearhMemberRegister.setValue(parseInt(processor._yearhMemberRegister).toString());

         // // 日投资金额
         // var investmentTotal = logoBar.findComponent('investmentTotal');
         // investmentTotal.setValue(parseInt(processor.investmentCurrent()).toString());
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
   frame.setDisplayOrder(10);
   // 当日
   var dayCustomerRegister = frame.findComponent('dayCustomerRegister');
   dayCustomerRegister.setBasicUnitText('人');
   var dayMemberRegister = frame.findComponent('dayMemberRegister');
   dayMemberRegister.setBasicUnitText('人');
   // 当月
   var monthCustomerRegister = frame.findComponent('monthCustomerRegister');
   monthCustomerRegister.setBasicUnitText('人');
   var monthMemberRegister = frame.findComponent('monthMemberRegister');
   monthMemberRegister.setBasicUnitText('人');
   // 累计
   var yearCustomerRegister = frame.findComponent('yearCustomerRegister');
   yearCustomerRegister.setBasicUnitText('人');
   var yearhMemberRegister = frame.findComponent('yearhMemberRegister');
   yearhMemberRegister.setBasicUnitText('人');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartPerfMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   invement.addPerformanceDataChangedListener(o, o.onPerformanceDataChangedListener);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);

   // //..........................................................
   // // 创建时间轴
   // var stage = o.activeStage();
   // var timeline = o._timeline = MO.Class.create(MO.FEaiChartPerfMarketerChart);
   // timeline.setName('Timeline');
   // timeline.linkGraphicContext(o);
   // timeline.build();
   // o._guiManager.register(timeline);
   //..........................................................
   // 创建头部 标题
   var head = o._head = MO.Class.create(MO.FEaiChartPerfMarketerHead);
   head.linkGraphicContext(o);
   head.setup();
   head.build();
   o._guiManager.register(head);

   //..........................................................
   // 多张图表
   var charts = o._charts = MO.Class.create(MO.FEaiChartPerfMarketerChart);
   charts.linkGraphicContext(o);
   charts.setup();
   charts.build();
   o._guiManager.register(charts);
   //..........................................................
   // 当月  当日  
   // var calculate = o._calculate = MO.Class.create(MO.FEaiChartPerfMarketerCalculate);
   // calculate.linkGraphicContext(o);
   // calculate.setup();
   // calculate.build();
   // o._guiManager.register(calculate);
   // 
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
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
   // 
   // var calculate = o._calculate;
   // if (isVertical) {
   //    calculate.setDockCd(MO.EUiDock.Bottom);
   //    calculate.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
   //    calculate.setLeft(10);
   //    calculate.setRight(10);
   //    calculate.setBottom(10);
   //    calculate.setWidth(1060);
   //    calculate.setHeight(900);
   // } else {
   //    calculate.setDockCd(MO.EUiDock.Bottom);
   //    calculate.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.bottom );
   //    calculate.setTop(0);
   //    calculate.setLeft(24);
   //    calculate.setBottom(20);
   //    calculate.setHeight(862);
   //    calculate.setWidth(433);
   // }
   

}