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
   o._code             = MO.EEaiScene.ChartStatistics;
   // @attribute
   o._investment       = MO.Class.register(o, new MO.AGetter('_investment'));
   // @attribute
   o._ready            = false;
   o._playing          = false;
   o._lastTick         = 0;
   o._interval         = 10;
   o._lastDateTick     = 0;
   o._dateInterval     = 100;
   o._startDate        = null;
   o._endDate          = null;
   o._currentDate      = null;
   // @attribute
   o._timeline         = null;
   o._milestoneFrame   = null;
   // @attribute
   o._buttonAudio      = null;
   o._statusStart      = false;
   o._statusLayerCount = 150;
   o._statusLayerLevel = 150;
   o._investmentCurrent  = 0;
   //..........................................................
   // @event
   o.onLoadData        = MO.FEaiChartStatisticsScene_onLoadData;
   o.onDateSelect      = MO.FEaiChartStatisticsScene_onDateSelect;
   o.onOperationPlay   = MO.FEaiChartStatisticsScene_onOperationPlay;
   o.onOperationPause  = MO.FEaiChartStatisticsScene_onOperationPause;
   //..........................................................
   // @method
   o.testReady          = MO.FEaiChartStatisticsScene_testReady;
   // @method
   o.setup              = MO.FEaiChartStatisticsScene_setup;
   o.selectDate         = MO.FEaiChartStatisticsScene_selectDate;
   // @method
   o.active             = MO.FEaiChartStatisticsScene_active;
   o.process            = MO.FEaiChartStatisticsScene_process;
   o.deactive           = MO.FEaiChartStatisticsScene_deactive;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onLoadData = function FEaiChartStatisticsScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}

//==========================================================
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_onDateSelect = function FEaiChartStatisticsScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}

//==========================================================
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_onMilestoneDone = function FEaiChartStatisticsScene_onMilestoneDone(event) {
   var o = this;
   //o.switchPlay(true);
}

//==========================================================
// <T>点击播放处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onOperationPlay = function FEaiChartStatisticsScene_onOperationPlay(event){
   var o = this;
   // 设置时间
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if(code == endCode) {
      MO.RDate.autoParse(o._currentDate, '20140701');
   }
   // 开始播放
   //o.switchPlay(true);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_onOperationPause = function FEaiChartStatisticsScene_onOperationPause(event){
   var o = this;
   // 停止播放
   //o.switchPlay(false);
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
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiChartTimeline);
   timeline.setName('Timeline');
   //timeline.setDockCd(MO.EGuiDock.Fill);
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas.logicSize().height - 400);
   timeline.setWidth(MO.Eai.Canvas.logicSize().width - 300);
   timeline.setHeight(350);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   faceLayer.push(timeline);
   //创建里程碑框
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.setLeft(MO.Eai.Canvas.logicSize().width / 2 - 360);
   milestoneFrame.setTop(50);
   milestoneFrame.setWidth(720);
   milestoneFrame.setHeight(700);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.build();
   o._desktop.register(milestoneFrame);
   faceLayer.push(milestoneFrame);
   milestoneFrame.setVisible(false);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatisticsScene_selectDate = function FEaiChartStatisticsScene_selectDate(code) {
   var o = this;
   return;
   // 构建画面
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   var milestone = historyConsole.milestones().get(code);
   if (milestone) {
      //o._milestoneFrame.setData(milestone);
      //o._milestoneFrame.show();
      //o._milestoneFrame.repaint();
      //o.switchPlay(false);
   }
   if (dateData) {
      // 更新时间轴
      o._timeline.setDegreeTime(o._currentDate);
      //o._timeline.repaint();
      // 设置城市数据
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var total = o._totalBar.findComponent('total');
      total.setLabel(MO.RFloat.unitFormat(dateData.investmentTotal(), 0, 0, 2, 0, 10000, '万'));
      o._totalBar.repaint();
   }
   o._citysRangeRenderable.upload();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_active = function FEaiChartStatisticsScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
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
            var hTable = document.getElementById('id_table');
            hTable.style.display = '';
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   // 重复播放
   if (o._playing){
      // 投资处理
      o._investment.process();
      // 设置资金
      var invementCurrent = o._investment.invementCurrent();
      if(invementCurrent != o._investmentCurrent){
         var total = o._totalBar.findComponent('total');
         total.setLabel(MO.RFloat.unitFormat(invementCurrent, 0, 0, 2, 0, 10000, '万'));
         o._totalBar.repaint();
         o._investmentCurrent = invementCurrent;
      }
   }
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_deactive = function FEaiChartStatisticsScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
