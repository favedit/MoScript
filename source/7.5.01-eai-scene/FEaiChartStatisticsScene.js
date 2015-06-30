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
   o._startDate         = null;
   o._endDate           = null;
   o._currentDate       = null;
   // @attribute
   o._timeline          = null;
   // @attribute
   o._statusStart       = false;
   o._statusLayerCount  = 150;
   o._statusLayerLevel  = 150;
   // @attribute
   o._groundAutioUrl    = '/script/ars/eai/music/statistics.mp3';
   //..........................................................
   // @event
   o.onLoadData         = MO.FEaiChartStatisticsScene_onLoadData;
   //..........................................................
   // @method
   o.testReady          = MO.FEaiChartStatisticsScene_testReady;
   // @method
   o.setup              = MO.FEaiChartStatisticsScene_setup;
   o.fixMatrix          = MO.FEaiChartStatisticsScene_fixMatrix;
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
   // 设置时间
   //var code = o._currentDate.format('YYYYMMDD')
   //o.selectDate(code);
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
   o._totalBar.setLocation(600, 20);
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiChartTimeline);
   timeline.setName('Timeline');
   //timeline.setDockCd(MO.EGuiDock.Fill);
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas.logicSize().height - 400);
   timeline.setWidth(MO.Eai.Canvas.logicSize().width - 580);
   timeline.setHeight(350);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   faceLayer.push(timeline);
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartStatisticsScene_fixMatrix = function FEaiChartStatisticsScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -38;
   matrix.ty = -13;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
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
   if(dateData){
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
      if(invementCurrent != null){
         var bar = o._totalBar;
         var total = bar.findComponent('total');
         total.setValue(parseInt(invementCurrent).toString());
         if(total.process()){
            bar.repaint();
         }
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
