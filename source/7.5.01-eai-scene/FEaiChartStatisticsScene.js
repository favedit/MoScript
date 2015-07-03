//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartStatisticsScene = function FEaiChartStatisticsScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code              = MO.EEaiScene.ChartStatistics;
   // @attribute
   o._investment        = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent = 0;
   // @attribute
   o._ready             = false;
   o._playing           = false;
   o._lastTick          = 0;
   o._interval          = 10;
   o._24HLastTick       = 0;
   o._24HTrendInterval  = 1000 * 60 * 5;
   o._startDate         = null;
   o._endDate           = null;
   o._currentDate       = null;
   // @attribute
   o._timeline          = null;
   o._liveTable         = null;
   // @attribute
   o._statusStart       = false;
   o._statusLayerCount  = 150;
   o._statusLayerLevel  = 150;
   o._statusDesktopShow = false;
   // @attribute
   o._groundAutioUrl    = '/script/ars/eai/music/statistics.mp3';
   //..........................................................
   // @method
   o.testReady          = MO.FEaiChartStatisticsScene_testReady;
   // @method
   o.setup              = MO.FEaiChartStatisticsScene_setup;
   o.fixMatrix          = MO.FEaiChartStatisticsScene_fixMatrix;
   // @method
   o.process            = MO.FEaiChartStatisticsScene_process;
   o.onTableEntitiesChanged = MO.FEaiChartStatisticsScene_onTableEntitiesChanged;
   return o;
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_testReady = function FEaiChartStatisticsScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._readyProvince){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_setup = function FEaiChartStatisticsScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var faceLayer = o._activeStage.faceLayer();
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   //..........................................................
   // 创建投资数据
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onTableEntitiesChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGui24HTimeline);
   timeline.setName('Timeline');
   timeline.setDockCd(MO.EGuiDock.Bottom);
   timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
   timeline.setLeft(20);
   timeline.setBottom(30);
   timeline.setRight(640);
   timeline.setHeight(250);
   timeline.sync();
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   liveTable.setDockCd(MO.EGuiDock.Right);
   liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Bottom);
   liveTable.setTop(20);
   liveTable.setRight(20);
   liveTable.setBottom(20);
   liveTable.setWidth(580);
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._desktop.register(liveTable);
   //..........................................................
   // 隐藏全部界面
   o._desktop.hide();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_fixMatrix = function FEaiChartStatisticsScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -38;
   matrix.ty = -13.2;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_process = function FEaiChartStatisticsScene_process() {
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   // 检测首次播放
   if(!o._statusStart){
      if(o.testReady()){
         var hLoading = document.getElementById('id_loading');
         if(hLoading){
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if(o._statusLayerLevel == 0){
            if(hLoading){
               document.body.removeChild(hLoading);
            }
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   // 重复播放
   if (o._playing) {
      if(!o._mapEntity._countryEntity.introAnimeDone()){
         o._mapEntity._countryEntity.process();
         return;
      }
      //..........................................................
      // 隐藏全部界面
      if(!o._statusDesktopShow){
         // 显示桌面
         o._desktop.show();
         o._statusDesktopShow = true;
      }
      //..........................................................
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      // 投资处理
      o._investment.process();
      // 设置资金
      var invementDayCurrent = o._investment.invementDayCurrent();
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      if((invementDayCurrent != null) && (invementTotalCurrent != null)){
         var logoBar = o._logoBar;
         // 设置当前金额
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(invementDayCurrent).toString());
         if(investmentDay.process()){
            logoBar.dirty();
         }
         // 设置全部金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
         if(investmentTotal.process()){
            logoBar.dirty();
         }
      }
   }
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onTableEntitiesChanged = function FEaiChartStatisticsScene_onTableEntitiesChanged(event) {
   var o = this;
   o._liveTable.setData(event.data);
   o._liveTable.dirty();
}
