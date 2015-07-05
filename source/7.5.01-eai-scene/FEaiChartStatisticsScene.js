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
   o._code                  = MO.EEaiScene.ChartStatistics;
   // @attribute
   o._investment            = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent     = 0;
   // @attribute
   o._ready                 = false;
   o._playing               = false;
   o._lastTick              = 0;
   o._interval              = 10;
   o._24HLastTick           = 0;
   o._24HTrendInterval      = 1000 * 60 * 5;
   o._startDate             = null;
   o._endDate               = null;
   o._currentDate           = null;
   // @attribute
   o._timeline              = null;
   o._liveTable             = null;
   o._livePop               = null;
   // @attribute
   o._statusStart           = false;
   o._statusLayerCount      = 150;
   o._statusLayerLevel      = 150;
   o._statusDesktopShow     = false;
   // @attribute
   o._groundAutioUrl        = '/script/ars/eai/music/statistics.mp3';
   //..........................................................
   // @event
   o.onOperationOrientation = MO.FEaiChartStatisticsScene_onOperationOrientation;
   o.onLiveTableChanged     = MO.FEaiChartStatisticsScene_onLiveTableChanged;
   //..........................................................
   // @method
   o.testReady              = MO.FEaiChartStatisticsScene_testReady;
   // @method
   o.setup                  = MO.FEaiChartStatisticsScene_setup;
   o.fixMatrix              = MO.FEaiChartStatisticsScene_fixMatrix;
   // @method
   o.process                = MO.FEaiChartStatisticsScene_process;
   return o;
}

//==========================================================
// <T>屏幕方向改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onOperationOrientation = function FEaiChartStatisticsScene_onOperationOrientation(event) {
   var o = this;
   o._guiManager.dirty();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onLiveTableChanged = function FEaiChartStatisticsScene_onLiveTableChanged(event) {
   var o = this;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.setData(event.data);
   table.dirty();
   //var pop = o._livePop;
   //pop.setData(event.data.at(0));
   //pop.show();
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
   invement.addDataChangedListener(o, o.onLiveTableChanged);
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
   if(MO.RBrowser.isOrientationVertical()){
      timeline.setDockCd(MO.EGuiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(20);
      timeline.setRight(20);
      timeline.setBottom(500);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EGuiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      if(MO.Runtime.isPlatformMobile()){
         timeline.setRight(680);
      }else{
         timeline.setRight(640);
      }
      timeline.setHeight(250);
   }
   timeline.sync();
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   if(MO.RBrowser.isOrientationVertical()){
      liveTable.setDockCd(MO.EGuiDock.Bottom);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Right);
      liveTable.setLeft(20);
      liveTable.setRight(10);
      liveTable.setBottom(0);
      liveTable.setHeight(800);
   }else{
      liveTable.setDockCd(MO.EGuiDock.Right);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Bottom);
      liveTable.setTop(20);
      liveTable.setRight(10);
      liveTable.setBottom(20);
      if(MO.Runtime.isPlatformMobile()){
         liveTable.setWidth(660);
      }else{
         liveTable.setWidth(580);
      }
   }
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   // 创建弹出
   var livePop = o._livePop = MO.Class.create(MO.FGuiLivePop);
   livePop.setName('LiveTable');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_fixMatrix = function FEaiChartStatisticsScene_fixMatrix(matrix){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      if(MO.RBrowser.isOrientationVertical()){
         matrix.tx = -18.8;
         matrix.ty = -3.2;
         matrix.tz = 0;
         matrix.setScale(0.18, 0.2, 0.18);
      }else{
         matrix.tx = -36.8;
         matrix.ty = -11.6;
         matrix.tz = 0;
         matrix.setScale(0.3, 0.33, 0.3);
      }
   }else{
      matrix.tx = -38;
      matrix.ty = -13.2;
      matrix.tz = 0;
      matrix.setScale(0.32, 0.36, 0.32);
   }
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
            o._mapEntity.countryEntity().start();
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
         o._guiManager.show();
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
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 设置当前金额
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      // 设置全部金额
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
   }
}
