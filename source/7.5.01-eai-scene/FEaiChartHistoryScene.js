//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code        = MO.EEaiScene.ChartHistory;
   // @attribute
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o._timeline    = null;
   //..........................................................
   // @event
   o.onLoadData   = MO.FEaiChartHistoryScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartHistoryScene_onKeyDown;
   //..........................................................
   // @method
   o.setup        = MO.FEaiChartHistoryScene_setup;
   o.selectDate   = MO.FEaiChartHistoryScene_selectDate;
   // @method
   o.active       = MO.FEaiChartHistoryScene_active;
   o.process      = MO.FEaiChartHistoryScene_process;
   o.deactive     = MO.FEaiChartHistoryScene_deactive;
   // @method
   o.onDateSelect = MO.FEaiChartHistoryScene_onDateSelect;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onKeyDown = function FEaiChartHistoryScene_onKeyDown(event) {
   var o = this;
   var keyCode = event.keyCode;
   if (keyCode == MO.EKeyCode.N) {
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if (keyCode == MO.EKeyCode.M) {
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if (keyCode == MO.EKeyCode.L) {
      MO.RDate.autoParse(o._currentDate, '20140701');
      var invesTable = document.getElementById('id_investment_table');
      for (var i = 1; i < invesTable.rows.length; i++) {
         var row = invesTable.rows[i];
         row.style.display = 'none';
      }
      o._playing = true;
   }
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   // 构建画面
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   if (dateData) {
      // 更新时间轴
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.repaint();
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
   //o._citysRangeRenderable.upload();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   //时间轴
   var stage = o.activeStage();
   var layer = stage.faceLayer();
   var timeline = o._timeline = MO.RClass.create(MO.FGuiChartTimeline);
   timeline.setName('Timeline');
   timeline.setLeft(50);
   timeline.setTop(MO.Eai.Canvas._size.height - 400);
   timeline.setWidth(MO.Eai.Canvas._size.width - 500);
   timeline.setHeight(350);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   layer.push(timeline);
}

//==========================================================
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onDateSelect = function FEaiChartHistoryScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_process = function FEaiChartHistoryScene_process() {
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if (o._playing) {
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if (code == endCode) {
         o._playing = false;
      }
   }
   // 上传数据
   var citysRenderables = o._citysRenderables;
   var count = citysRenderables.count()
   for(var i = 0; i < count; i++){
      var citysRenderable = citysRenderables.at(i);
      citysRenderable.upload();
   }
   o._citysRangeRenderable.upload();
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
