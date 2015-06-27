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
   o._code             = MO.EEaiScene.ChartHistory;
   // @attribute
   o._ready            = false;
   o._playing          = false;
   o._lastTick         = 0;
   o._interval         = 10;
   o._lastDateTick    = 0;
   o._dateInterval    = 100;
   o._startDate        = null;
   o._endDate          = null;
   o._currentDate      = null;
   // @attribute
   o._playButton       = null;
   o._pauseButton      = null;
   o._buttonTransform  = null;
   o._timeline         = null;
   o._milestoneFrame  = null;
   // @attribute
   o._buttonAudio      = null;
   o._statusStart      = false;
   o._statusLayerCount = 150;
   o._statusLayerLevel = 150;
   //..........................................................
   // @event
   o.onLoadData       = MO.FEaiChartHistoryScene_onLoadData;
   o.onDateSelect     = MO.FEaiChartHistoryScene_onDateSelect;
   o.onMilestoneDone  = MO.FEaiChartHistoryScene_onMilestoneDone;
   o.onOperationPlay  = MO.FEaiChartHistoryScene_onOperationPlay;
   o.onOperationPause = MO.FEaiChartHistoryScene_onOperationPause;
   //..........................................................
   // @method
   o.testReady         = MO.FEaiChartHistoryScene_testReady;
   // @method
   o.setup             = MO.FEaiChartHistoryScene_setup;
   o.selectDate        = MO.FEaiChartHistoryScene_selectDate;
   o.switchPlay        = MO.FEaiChartHistoryScene_switchPlay;
   // @method
   o.active            = MO.FEaiChartHistoryScene_active;
   o.process           = MO.FEaiChartHistoryScene_process;
   o.deactive          = MO.FEaiChartHistoryScene_deactive;
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
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onMilestoneDone = function FEaiChartHistoryScene_onMilestoneDone(event) {
   var o = this;
   o.switchPlay(true);
}

//==========================================================
// <T>点击播放处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onOperationPlay = function FEaiChartHistoryScene_onOperationPlay(event){
   var o = this;
   // 设置时间
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if(code == endCode) {
      MO.RDate.autoParse(o._currentDate, '20140701');
   }
   // 开始播放
   o.switchPlay(true);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onOperationPause = function FEaiChartHistoryScene_onOperationPause(event){
   var o = this;
   // 停止播放
   o.switchPlay(false);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_testReady = function FEaiChartHistoryScene_testReady(){
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
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var faceLayer = o._activeStage.faceLayer();
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   //..........................................................
   // 创建播放按键
   var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/player.png');
   control.psInitialize();
   control.build();
   control.setVisible(true);
   control.addOperationDownListener(o, o.onOperationPlay);
   o._desktop.register(control);
   faceLayer.push(control);
   // 创建播放按键
   var control = o._pauseButton = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.setLocation(40, 730);
   control.setSize(196, 196);
   control.setBackResource('url:/script/ars/eai/pause.png');
   control.psInitialize();
   control.build();
   control.setVisible(false);
   control.addOperationDownListener(o, o.onOperationPause);
   o._desktop.register(control);
   faceLayer.push(control);
   // 创建按键声音
   var audio = o._buttonAudio = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/button.mp3');
   // 创建交换器
   var transform = o._buttonTransform = MO.Class.create(MO.FGuiChangeTransform);
   transform.setInterval(10);
   transform.setScale(0.1);
   //..........................................................
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   // 创建里程碑
   var milestoneBars = o._milestoneBars = new MO.TObjects();
   var count = milestones.count();
   for(var i = 0; i < count; i++){
      var milestone = milestones.at(i);
      var frame = MO.Console.find(MO.FGuiFrameConsole).create(o, 'eai.chart.MilestoneBar');
      frame.setLocation(0, 25 + 90 * i);
      var date = new MO.TDate();
      date.parse(milestone.code());
      frame.findComponent('date').setLabel(date.format('YYYY/MM/DD'));
      frame.findComponent('total').setLabel(parseInt(milestone.investmentTotal()) + '亿');
      faceLayer.push(frame);
      o._desktop.register(frame);
      milestoneBars.push(frame);
   }
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
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
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
   var milestone = historyConsole.milestones().get(code);
   if (milestone) {
      o._milestoneFrame.setData(milestone);
      o._milestoneFrame.show();
      o._milestoneFrame.repaint();
      o.switchPlay(false);
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
MO.FEaiChartHistoryScene_switchPlay = function FEaiChartHistoryScene_switchPlay(flag){
   var o = this;
   var transform = o._buttonTransform;
   o._playing = flag;
   o._buttonAudio.play(0);
   if(flag){
      //transform.setSourceControl(o._playButton);
      //transform.setTargetControl(o._pauseButton);
      o._playButton.setVisible(false);
      o._pauseButton.setVisible(true);
   }else{
      //transform.setSourceControl(o._pauseButton);
      //transform.setTargetControl(o._playButton);
      o._playButton.setVisible(true);
      o._pauseButton.setVisible(false);
   }
   //o._desktop.transformStart(transform);
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
      var currentTick = MO.Timer.current();
      if (currentTick - o._lastTick > o._interval) {
         //计时切换日期
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if (code == endCode) {
               o.switchPlay(false);
            }
            o._lastDateTick = currentTick;
         }
         //调用重绘
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.repaint();
         //记录lastTick
         o._lastTick = currentTick;
      }
      // 上传数据
      var citysRenderables = o._citysRenderables;
      var count = citysRenderables.count()
      for (var i = 0; i < count; i++) {
         var citysRenderable = citysRenderables.at(i);
         citysRenderable.upload();
      }
      o._citysRangeRenderable.upload();
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.repaint();
   }
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
