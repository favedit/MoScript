MO.FEaiChartCustomerScene = function FEaiChartCustomerScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code        = MO.EEaiScene.ChartCustomer;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartCustomerScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartCustomerScene_onKeyDown;
   o.setup        = MO.FEaiChartCustomerScene_setup;
   o.selectDate   = MO.FEaiChartCustomerScene_selectDate;
   o.active       = MO.FEaiChartCustomerScene_active;
   o.process      = MO.FEaiChartCustomerScene_process;
   o.deactive     = MO.FEaiChartCustomerScene_deactive;
   return o;
}
MO.FEaiChartCustomerScene_onLoadData = function FEaiChartCustomerScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartCustomerScene_onKeyDown = function FEaiChartCustomerScene_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   if(keyCode == MO.EKeyCode.N){
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.M){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.L){
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartCustomerScene_selectDate = function FEaiChartCustomerScene_selectDate(code){
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for(var i = 0; i < count; i++){
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartCustomerScene_setup = function FEaiChartCustomerScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
}
MO.FEaiChartCustomerScene_active = function FEaiChartCustomerScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartCustomerScene_process = function FEaiChartCustomerScene_process(){
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if(o._playing){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if(code == endCode){
         o._playing = false;
      }
   }
}
MO.FEaiChartCustomerScene_deactive = function FEaiChartCustomerScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                     = MO.EEaiScene.ChartHistory;
   o._ready                    = false;
   o._mapReady                 = false;
   o._playing                  = false;
   o._lastTick                 = 0;
   o._interval                 = 10;
   o._lastDateTick             = 0;
   o._dateInterval             = 120;
   o._startDate                = null;
   o._endDate                  = null;
   o._currentDate              = null;
   o._logoBar                  = null;
   o._buttonTransform          = null;
   o._timeline                 = null;
   o._milestoneFrame           = null;
   o._statusStart              = false;
   o._statusLayerCount         = 100;
   o._statusLayerLevel         = 100;
   o._milestoneBars            = null;
   o._milestoneShowed          = 0;
   o._milestoneBarShowDuration = 1000;
   o._milestoneBarShowTick     = 0;
   o._milestoneBarShowing      = false;
   o.onLoadData                = MO.FEaiChartHistoryScene_onLoadData;
   o.onDateSelect              = MO.FEaiChartHistoryScene_onDateSelect;
   o.onMilestoneDone           = MO.FEaiChartHistoryScene_onMilestoneDone;
   o.onOperationPlay           = MO.FEaiChartHistoryScene_onOperationPlay;
   o.onOperationPause          = MO.FEaiChartHistoryScene_onOperationPause;
   o.onProcess                 = MO.FEaiChartHistoryScene_onProcess;
   o.onSwitchLiveComplete      = MO.FEaiChartHistoryScene_onSwitchLiveComplete;
   o.testReady                 = MO.FEaiChartHistoryScene_testReady;
   o.setup                     = MO.FEaiChartHistoryScene_setup;
   o.resetDate                 = MO.FEaiChartHistoryScene_resetDate;
   o.selectDate                = MO.FEaiChartHistoryScene_selectDate;
   o.switchPlay                = MO.FEaiChartHistoryScene_switchPlay;
   o.switchLive                = MO.FEaiChartHistoryScene_switchLive;
   o.processResize             = MO.FEaiChartHistoryScene_processResize;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event) {
   var o = this;
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var startDate = historyConsole.dates().first();
   var endDate = historyConsole.dates().last();
   o._currentDate.parseAuto(startDate.code());
   o._startDate.parseAuto(startDate.code());
   o._endDate.parseAuto(endDate.code());
   var milestones = historyConsole.milestones();
   var milestoneBars = o._milestoneBars = new MO.TObjects();
   var count = milestones.count();
   for (var i = count - 1; i >= 0; i--) {
      var milestone = milestones.at(count - i - 1);
      var bar = MO.RClass.create(MO.FGuiHistoryMilestoneBar);
      bar.linkGraphicContext(o);
      bar.setName('MilestoneBar_' + i);
      bar.setVisible(false);
      bar.setDockCd(MO.EUiDock.Right)
      bar.setTop(90 + 100 * i);
      var milestoneInvestmentTotal = milestone.investmentTotal();
      if (milestoneInvestmentTotal >= 10000) {
         bar.setRight(-371);
      } else {
         bar.setRight(-341);
      }
      bar.setup(milestone);
      bar.build();
      o._guiManager.register(bar);
      milestoneBars.push(bar);
   }
}
MO.FEaiChartHistoryScene_onDateSelect = function FEaiChartHistoryScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}
MO.FEaiChartHistoryScene_onMilestoneDone = function FEaiChartHistoryScene_onMilestoneDone(event) {
   var o = this;
   o.switchPlay(true);
   o._milestoneShowed++;
   o._milestoneBarShowTick = MO.Timer.current();
   o._milestoneBarShowing = true;
}
MO.FEaiChartHistoryScene_onOperationPlay = function FEaiChartHistoryScene_onOperationPlay(event){
   var o = this;
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if (code == endCode) {
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var startDate = historyConsole.dates().first();
      MO.Lang.Date.autoParse(o._currentDate, startDate.code());
   }
   o.switchPlay(true);
}
MO.FEaiChartHistoryScene_onOperationPause = function FEaiChartHistoryScene_onOperationPause(event){
   var o = this;
   o.switchPlay(false);
}
MO.FEaiChartHistoryScene_onProcess = function FEaiChartHistoryScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   var mapEntity = o._mapEntity;
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   if (!o._statusStart) {
      if (o.testReady()) {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if (o._statusLayerLevel == 0) {
            if (hLoading) {
               document.body.removeChild(hLoading);
            }
            o.switchPlay(true);
            o._statusStart = true;
         }
      }
   }
   var currentTick = MO.Timer.current();
   if (o._playing) {
      var countryEntity = mapEntity.countryEntity();
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
         return;
      }
      if (!o._mapReady) {
         mapEntity.citysRangeRenderable().setVisible(true);
         mapEntity.citysRenderable().setVisible(true);
         o._guiManager.show();
         o._milestoneFrame.setVisible(false);
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.005);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      if (currentTick - o._lastTick > o._interval) {
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if(code == endCode){
               o.switchPlay(false);
               o.switchLive();
            }
            o._lastDateTick = currentTick;
            o._mapEntity.upload();
         }
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.dirty();
         o._lastTick = currentTick;
      }
   }
   if (o._milestoneBarShowing) {
      var mbPassedTick = currentTick - o._milestoneBarShowTick;
      var p = mbPassedTick / o._milestoneBarShowDuration;
      if (p > 1) {
         p = 1;
         o._milestoneBarShowing = false;
      }
      p = (1 - p) * (1 - p);
      var mBar = o._milestoneBars.at(o._milestoneShowed - 1);
      if (mBar.data().investmentTotal() >= 10000) {
         mBar.setRight(20 + (-371 * p));
      }
      else {
         mBar.setRight(20 + (-341 * p));
      }
      mBar.dirty();
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.dirty();
   }
}
MO.FEaiChartHistoryScene_onSwitchLiveComplete = function FEaiChartHistoryScene_onSwitchLiveComplete(event){
   var o = this;
   var scene = o._chapter.selectSceneByCode(MO.EEaiScene.ChartLive);
   scene.showFace();
}
MO.FEaiChartHistoryScene_testReady = function FEaiChartHistoryScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._countryReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   var mapEntity = o._mapEntity;
   mapEntity.citysRangeRenderable().setVisible(false);
   mapEntity.citysRenderable().setVisible(false);
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.history.LogoBar');
   frame.setLocation(5, 5);
   o._guiManager.register(frame);
   var controlInvestment = o._logoBar.findComponent('investment');
   controlInvestment.setNoRolling(true);
   var transform = o._buttonTransform = MO.Class.create(MO.FGuiChangeTransform);
   transform.setInterval(10);
   transform.setScale(0.1);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiHistoryTimeline);
   timeline.linkGraphicContext(o);
   timeline.setName('Timeline');
   timeline.setDockCd(MO.EUiDock.Bottom);
   timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
   timeline.setLeft(50);
   timeline.setRight(450);
   timeline.setBottom(5);
   timeline.setHeight(600);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.build();
   o._guiManager.register(timeline);
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
   milestoneFrame.setup();
   milestoneFrame.build();
   o._guiManager.register(milestoneFrame);
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var milestoneBG = MO.RClass.create(MO.FGuiPicture);
   milestoneBG.linkGraphicContext(o);
   milestoneBG.setName('MilestoneBG_Top');
   milestoneBG.setDockCd(MO.EUiDock.RightTop);
   milestoneBG.setWidth(468);
   milestoneBG.setHeight(464);
   milestoneBG._displayOrder = -1;
   milestoneBG._backResource = 'url:/script/ars/eai/milestone/bar_bg_top.png';
   milestoneBG.psInitialize();
   milestoneBG.build();
   o._guiManager.register(milestoneBG);
   milestoneBG = MO.RClass.create(MO.FGuiPicture);
   milestoneBG.linkGraphicContext(o);
   milestoneBG.setName('MilestoneBG_Bottom');
   milestoneBG.setDockCd(MO.EUiDock.RightBottom);
   milestoneBG.setWidth(468);
   milestoneBG.setHeight(464);
   milestoneBG._displayOrder = -1;
   milestoneBG._backResource = 'url:/script/ars/eai/milestone/bar_bg_bottom.png';
   milestoneBG.psInitialize();
   milestoneBG.build();
   o._guiManager.register(milestoneBG);
   o._guiManager.hide();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   historyConsole.addLoadListener(o, o.onLoadData);
   historyConsole.load();
}
MO.FEaiChartHistoryScene_resetDate = function FEaiChartHistoryScene_resetDate(){
   var o = this;
   var cityEntities = o._mapEntity.cityEntities();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   var milestone = historyConsole.milestones().get(code);
   if (milestone) {
      o._milestoneFrame.setData(milestone);
      o._milestoneFrame.show();
      o._milestoneFrame.dirty();
      o.switchPlay(false);
   }
   if(dateData){
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.dirty();
      var cityDatas = dateData.citys();
      var cityEntities = o._mapEntity.cityEntities();
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var cityCode = cityEntity.data().code();
         var data = cityDatas.get(cityCode);
         cityEntity.update(data);
      }
      var controlDate = o._logoBar.findComponent('date');
      controlDate.setValue(code);
      var controlInvestment = o._logoBar.findComponent('investment');
      controlInvestment.setValue(parseInt(dateData.investmentTotal()).toString());
   }
}
MO.FEaiChartHistoryScene_switchPlay = function FEaiChartHistoryScene_switchPlay(flag){
   var o = this;
   o._playing = flag;
}
MO.FEaiChartHistoryScene_switchLive = function FEaiChartHistoryScene_switchLive(){
   var o = this;
   var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
   alphaAction.setAlphaBegin(1);
   alphaAction.setAlphaEnd(0);
   alphaAction.setAlphaInterval(-0.005);
   alphaAction.addCompleteListener(o, o.onSwitchLiveComplete);
   alphaAction.push(o._guiManager);
   o._guiManager.mainTimeline().pushAction(alphaAction);
}
MO.FEaiChartHistoryScene_processResize = function FEaiChartHistoryScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var control = o._southSea;
   control.setDockCd(MO.EUiDock.RightBottom);
   control.setRight(520);
   control.setBottom(180);
}
MO.FEaiChartIndustryScene = function FEaiChartIndustryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code        = MO.EEaiScene.ChartIndustry;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartIndustryScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartIndustryScene_onKeyDown;
   o.setup        = MO.FEaiChartIndustryScene_setup;
   o.selectDate   = MO.FEaiChartIndustryScene_selectDate;
   o.active       = MO.FEaiChartIndustryScene_active;
   o.process      = MO.FEaiChartIndustryScene_process;
   o.deactive     = MO.FEaiChartIndustryScene_deactive;
   return o;
}
MO.FEaiChartIndustryScene_onLoadData = function FEaiChartIndustryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartIndustryScene_onKeyDown = function FEaiChartIndustryScene_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   if(keyCode == MO.EKeyCode.N){
      o._currentDate.addDay(-1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.M){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      o.selectDate(code);
      console.log(code);
   }
   if(keyCode == MO.EKeyCode.L){
      MO.RDate.autoParse(o._currentDate, '20140701');
      o._playing = true;
   }
}
MO.FEaiChartIndustryScene_selectDate = function FEaiChartIndustryScene_selectDate(code){
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      var cityDatas = dateData.citys();
      var cityEntities = o._cityEntities;
      var count = cityEntities.count();
      for(var i = 0; i < count; i++){
         var cityEntity = cityEntities.at(i);
         var code = cityEntity.data().code();
         var data = cityDatas.get(code);
         cityEntity.update(data);
      }
      var hTotal = document.getElementById('id_total');
      if(hTotal){
         hTotal.innerHTML = o._currentDate.format('YYYY-MM-DD') + ' '+ dateData.investmentTotal();
      }
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartIndustryScene_setup = function FEaiChartIndustryScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
}
MO.FEaiChartIndustryScene_active = function FEaiChartIndustryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartIndustryScene_process = function FEaiChartIndustryScene_process(){
   var o = this;
   o.__base.FEaiChartScene.process.call(o);
   if(o._playing){
      o._currentDate.addDay(1);
      var code = o._currentDate.format('YYYYMMDD')
      var endCode = o._endDate.format('YYYYMMDD')
      o.selectDate(code);
      if(code == endCode){
         o._playing = false;
      }
   }
}
MO.FEaiChartIndustryScene_deactive = function FEaiChartIndustryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code = MO.EEaiScene.ChartInvestment;
   o._playing = false;
   o._startDate = null;
   o._endDate = null;
   o._currentDate = null;
   o._timeline = null;
   o.onLoadData = MO.FEaiChartInvestmentScene_onLoadData;
   o.onKeyDown = MO.FEaiChartInvestmentScene_onKeyDown;
   o.setup = MO.FEaiChartInvestmentScene_setup;
   o.selectDate = MO.FEaiChartInvestmentScene_selectDate;
   o.active = MO.FEaiChartInvestmentScene_active;
   o.process = MO.FEaiChartInvestmentScene_process;
   o.deactive = MO.FEaiChartInvestmentScene_deactive;
   o.onDateSelect = MO.FEaiChartInvestmentScene_onDateSelect;
   return o;
}
MO.FEaiChartInvestmentScene_onLoadData = function FEaiChartInvestmentScene_onLoadData(event) {
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartInvestmentScene_onKeyDown = function FEaiChartInvestmentScene_onKeyDown(event) {
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
MO.FEaiChartInvestmentScene_selectDate = function FEaiChartInvestmentScene_selectDate(code) {
   var o = this;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   if (dateData) {
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      var invesTable = document.getElementById('id_investment_table');
      while (invesTable.rows.length < count + 1) {
         var row = invesTable.insertRow(invesTable.rows.length);
         row.insertCell(0);
         row.insertCell(1);
         row.insertCell(2);
      }
      for (var i = 0; i < count; i++) {
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
         var provinceResData = provinceConsole.findByCode(provinceData.code());
         var row = invesTable.rows[i + 1];
         row.style.display = '';
         row.className = 'DataGrid_Row';
         var rankCell = row.cells[0];
         var labelCell = row.cells[1];
         var invesCell = row.cells[2];
         if (i > 2) {
            rankCell.innerText = i + 1;
         }
         labelCell.innerText = provinceResData.label();
         if (provinceData.investmentTotal() > 1000) {
            invesCell.innerText = MO.RFloat.unitFormat(provinceData.investmentTotal(), 0, 0, 2, 0, 10000, '万');
         }
         else {
            invesCell.innerText = provinceData.investmentTotal();
         }
         invesCell.align = 'right';
      }
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.repaint();
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
}
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._currentDate.parseAuto('20140701');
   o._startDate.parseAuto('20140701');
   o._endDate.parseAuto('20150618');
   var invesTable = document.getElementById('id_investment_table');
   for (var i = 0; i < 3; i++) {
      var row = invesTable.insertRow(invesTable.rows.length);
      var rankCell = row.insertCell(0);
      row.insertCell(1);
      row.insertCell(2);
      switch (i) {
         case 0:
            row.style.color = '#FFEA01';
            rankCell.innerHTML = "1 <IMG src='/script/ars/eai/medals/gold.png'/>";
            break;
         case 1:
            row.style.color = '#C5D3D6';
            rankCell.innerHTML = "2 <IMG src='/script/ars/eai/medals/silver.png'/>";
            break;
         case 2:
            row.style.color = '#E16A00';
            rankCell.innerHTML = "3 <IMG src='/script/ars/eai/medals/copper.png'/>";
            break;
         default:
            break;
      }
   }
   var stage = o.activeStage();
   var layer = stage.faceLayer();
   var timeline = o._timeline = MO.RClass.create(MO.FGuiHistoryTimeline);
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
MO.FEaiChartInvestmentScene_onDateSelect = function FEaiChartInvestmentScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartInvestmentScene_process = function FEaiChartInvestmentScene_process() {
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
   var citysRenderables = o._citysRenderables;
   var count = citysRenderables.count()
   for(var i = 0; i < count; i++){
      var citysRenderable = citysRenderables.at(i);
      citysRenderable.upload();
   }
   o._citysRangeRenderable.upload();
}
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartLiveScene = function FEaiChartLiveScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartLive;
   o._investment             = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent      = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._livePop                = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartLiveScene_onInvestmentDataChanged;
   o.onProcess               = MO.FEaiChartLiveScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartLiveScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartLiveScene_onSwitchComplete;
   o.testReady               = MO.FEaiChartLiveScene_testReady;
   o.setup                   = MO.FEaiChartLiveScene_setup;
   o.showParticle            = MO.FEaiChartLiveScene_showParticle;
   o.showFace                = MO.FEaiChartLiveScene_showFace;
   o.fixMatrix               = MO.FEaiChartLiveScene_fixMatrix;
   o.processResize           = MO.FEaiChartLiveScene_processResize;
   return o;
}
MO.FEaiChartLiveScene_onInvestmentDataChanged = function FEaiChartLiveScene_onInvestmentDataChanged(event) {
   var o = this;
   var entity = event.entity;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushEntity(entity);
   table.dirty();
   if(entity){
      var pop = o._livePop;
      pop.setData(entity);
      var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
      var cityEntity = o._mapEntity.findCityByCard(entity.card());
      if(cityEntity){
         var provinceEntity = cityEntity.provinceEntity();
         var cityResource = cityEntity.data();
         o.showParticle(provinceEntity, cityResource);
      }
   }
}
MO.FEaiChartLiveScene_onProcess = function FEaiChartLiveScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
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
   if (o._playing) {
      var countryEntity = o._mapEntity.countryEntity();
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
      }
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      o._investment.process();
      var logoBar = o._logoBar;
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
   if (o._livePop.visible()) {
      o._livePop.dirty();
   }
}
MO.FEaiChartLiveScene_onSwitchProcess = function FEaiChartLiveScene_onSwitchProcess(event){
   var o = this;
}
MO.FEaiChartLiveScene_onSwitchComplete = function FEaiChartLiveScene_onSwitchComplete(event){
   var o = this;
}
MO.FEaiChartLiveScene_testReady = function FEaiChartLiveScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._countryReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiChartLiveScene_setup = function FEaiChartLiveScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var faceLayer = o._activeStage.faceLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(5, 5);
   o._guiManager.register(frame);
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGui24HTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   var livePop = o._livePop = MO.Class.create(MO.FGuiLivePop);
   livePop.setName('LivePop');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   o._guiManager.hide();
}
MO.FEaiChartLiveScene_showParticle = function FEaiChartLiveScene_showParticle(provinceEntity, cityResource){
   return;
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartLiveScene_showFace = function FEaiChartLiveScene_showFace(){
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiChartLiveScene_fixMatrix = function FEaiChartLiveScene_fixMatrix(matrix){
   var o = this;
   if(MO.Runtime.isPlatformMobile()){
      if(MO.Window.Browser.isOrientationVertical()){
         matrix.tx = -14.58;
         matrix.ty = -2.2;
         matrix.tz = 0;
         matrix.setScale(0.14, 0.16, 0.14);
      }else{
         matrix.tx = -36.8;
         matrix.ty = -11.6;
         matrix.tz = 0;
         matrix.setScale(0.3, 0.33, 0.3);
      }
   }else{
      matrix.tx = -38.6;
      matrix.ty = -12.8;
      matrix.tz = 0;
      matrix.setScale(0.32, 0.36, 0.32);
   }
   matrix.update();
}
MO.FEaiChartLiveScene_processResize = function FEaiChartLiveScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   o.fixMatrix(o._investment.display().matrix());
   var control = o._southSea;
   control.setDockCd(MO.EUiDock.RightBottom);
   control.setRight(710);
   control.setBottom(220);
   var timeline = o._timeline;
   if(MO.Window.Browser.isOrientationVertical()){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(830);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(680);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(MO.Window.Browser.isOrientationVertical()){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(800);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Top | MO.EGuiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(650);
   }
}
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._optionMapCountry     = true;
   o._readyProvince        = false;
   o._nowDate              = null;
   o._nowTicker            = null;
   o._mapEntity            = null;
   o._citysRangeRenderable = null;
   o._citysRenderable      = null;
   o._flagSprite           = null;
   o._southSea             = null;
   o._groundAutio          = null;
   o.onLoadTemplate        = MO.FEaiChartScene_onLoadTemplate;
   o.onProcess             = MO.FEaiChartScene_onProcess;
   o.construct             = MO.FEaiChartScene_construct;
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
   o.processResize         = MO.FEaiChartScene_processResize;
   o.deactive              = MO.FEaiChartScene_deactive;
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadTemplate = function FEaiChartScene_onLoadTemplate(event){
   var o = this;
   var template = event.template;
}
MO.FEaiChartScene_onProcess = function FEaiChartScene_onProcess(){
   var o = this;
   o.__base.FEaiScene.onProcess.call(o);
   if(!o._countryReady){
      var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
      if(entityConsole.testCountryReady()){
         o._countryReady = true;
         o.processResize();
      }
   }
}
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(10000);
}
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -35;
   matrix.ty = -12.3;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = o._mapEntity = entityConsole.mapEntity();
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   var display = mapEntity.countryDisplay();
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = mapEntity.countryBorderDisplay();
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   var citysRangeRenderable = mapEntity.citysRangeRenderable();
   o.fixMatrix(citysRangeRenderable.matrix());
   stage.cityRangeLayer().push(citysRangeRenderable);
   var citysRenderable = mapEntity.citysRenderable();
   o.fixMatrix(citysRenderable.matrix());
   stage.cityLayer().push(citysRenderable);
   var systemConsole = MO.Console.find(MO.FEaiLogicConsole).system();
   systemConsole.refresh();
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   var audio = o._groundAutio = audioConsole.load('{eai.resource}/ground.mp3');
   audio.setLoop(true);
   audio.setVolume(0.2);
   audio.play();
   if(o._optionMapCountry){
      var control = o._southSea = MO.Class.create(MO.FGuiPicture);
      control.setDisplayOrder(-10);
      control.size().set(134, 203);
      control.setBackResource('url:{eai.resource}/south-sea.png');
      control.psInitialize();
      control.build();
      o._guiManager.register(control);
   }
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiChartScene_resetDate = function FEaiChartScene_resetDate(){
   var o = this;
}
MO.FEaiChartScene_processResize = function FEaiChartScene_processResize(){
   var o = this;
   o.__base.FEaiScene.processResize.call(o);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = entityConsole.mapEntity();
   o.fixMatrix(mapEntity.countryDisplay().matrix());
   o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
   o.fixMatrix(mapEntity.citysRangeRenderable().matrix());
   o.fixMatrix(mapEntity.citysRenderable().matrix());
}
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._nowDate = RObject.dispose(o._nowDate);
   o._nowTicker = RObject.dispose(o._nowTicker);
   o._mapEntity = null;
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._groundLayer    = MO.RClass.register(o, new MO.AGetter('_groundLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer    = MO.RClass.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer = MO.RClass.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer      = MO.RClass.register(o, new MO.AGetter('_cityLayer'));
   o._dataLayer      = MO.RClass.register(o, new MO.AGetter('_dataLayer'));
   o._spriteLayer    = MO.RClass.register(o, new MO.AGetter('_spriteLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct       = MO.FEaiChartStage_construct;
   return o;
}
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._groundLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('GroundLayer', layer);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('MapLayer', layer);
   var layer = o._borderLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   var layer = o._cityRangeLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityRangeLayer', layer);
   var layer = o._cityLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('CityLayer', layer);
   var layer = o._dataLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('DataLayer', layer);
   var layer = o._spriteLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('SpriteLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('FaceLayer', layer);
}
MO.FEaiChartTotalScene = function FEaiChartTotalScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._optionMapCountry = false;
   o._code             = MO.EEaiScene.ChartTotal;
   o._currentDate      = null;
   o._statusStart      = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   o.onInvestment      = MO.FEaiChartTotalScene_onInvestment;
   o.onProcess         = MO.FEaiChartTotalScene_onProcess;
   o.construct         = MO.FEaiChartTotalScene_construct;
   o.setup             = MO.FEaiChartTotalScene_setup;
   o.testReady         = MO.FEaiChartTotalScene_testReady;
   return o;
}
MO.FEaiChartTotalScene_onInvestment = function FEaiChartTotalScene_onInvestment(event){
   var o = this;
   var content = event.content;
   debugger
}
MO.FEaiChartTotalScene_onProcess = function FEaiChartTotalScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
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
   if (o._playing) {
      if (!o._mapReady) {
         o._guiManager.show();
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      if(o._dataTicker.process()){
         var system = MO.Console.find(MO.FEaiLogicConsole).system();
         if(system.testReady()){
            var systemDate = system.currentDate();
            var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
            statistics.doInvestmentDynamic(o, o.onInvestment, systemDate.format(), systemDate.format());
         }
      }
   }
}
MO.FEaiChartTotalScene_construct = function FEaiChartTotalScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._currentDate = new MO.TDate();
   o._dataTicker = new MO.TTicker(1000 * 30);
}
MO.FEaiChartTotalScene_setup = function FEaiChartTotalScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   o._guiManager.hide();
}
MO.FEaiChartTotalScene_testReady = function FEaiChartTotalScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._countryReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Company;
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.Country;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiCountryScene_onTemplateLoad;
   o.setup            = MO.FEaiCountryScene_setup;
   o.active           = MO.FEaiCountryScene_active;
   o.deactive         = MO.FEaiCountryScene_deactive;
   return o;
}
MO.FEaiCountryScene_onTemplateLoad = function FEaiCountryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiCountryScene_setup = function FEaiCountryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiCountryScene_active = function FEaiCountryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiCountryScene_deactive = function FEaiCountryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiDynamicInfo = function FEaiDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   o.onPaintBegin = MO.FEaiDynamicInfo_onPaintBegin;
   o.oeUpdate     = MO.FEaiDynamicInfo_oeUpdate;
   o.construct    = MO.FEaiDynamicInfo_construct;
   return o;
}
MO.FEaiDynamicInfo_onPaintBegin = function FEaiDynamicInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   graphic.drawText('Frame         : ' + MO.Timer.rate() + ' Span [' + stageStatistics._frame.toString() + ']', locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Process : ' + stageStatistics._frameProcess.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Draw    : ' + stageStatistics._frameDraw.toString() + ' | ' + stageStatistics._frameDrawSort.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw          : Count=' + statistics.frameDrawCount() + ' Triangle=' + statistics.frameTriangleCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Const    : Count=' + statistics.frameConstCount() + ' Length=' + statistics.frameConstLength(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Alloc    : Buffer=' + statistics.frameBufferCount() + ' Texture=' + statistics.frameTextureCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Total    : Program=' + statistics.programTotal() + ' Layout=' + statistics.layoutTotal() + ' Vertex=' + statistics.vertexBufferTotal() + ' Index=' + statistics.indexBufferTotal(), locationX, locationY, '#FFFFFF');
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = entityConsole.mapEntity();
   var provinceEntities = mapEntity.provinceEntities();
   var cityEntities = mapEntity.cityEntities();
   locationY += line;
   graphic.drawText('Entity        : Province=' + provinceEntities.count() + ' City=' + cityEntities.count(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Investment    : Entity=' + o._investmentEntityCount + ' Table=' + o._investmentTableEntityCount + ' PoolItem=' + o._investmentPoolItemCount + ' PoolFree=' + o._investmentPoolFreeCount, locationX, locationY, '#FFFFFF');
}
MO.FEaiDynamicInfo_oeUpdate = function FEaiDynamicInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiDynamicInfo_construct = function FEaiDynamicInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(512, 256);
   o._ticker = new MO.TTicker(1000);
}
MO.FEaiGroupReportScene = function FEaiGroupReportScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.GroupReport;
   return o;
}
MO.FEaiGroupScene = function FEaiGroupScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Group;
   return o;
}
MO.FEaiScene = function FEaiScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   o._optionDebug           = false;
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o.onOperationResize      = MO.FEaiScene_onOperationResize;
   o.onOperationOrientation = MO.FEaiScene_onOperationOrientation;
   o.onProcessAfter         = MO.FEaiScene_onProcessAfter;
   o.construct              = MO.FEaiScene_construct;
   o.setup                  = MO.FEaiScene_setup;
   o.active                 = MO.FEaiScene_active;
   o.deactive               = MO.FEaiScene_deactive;
   o.processResize          = MO.FEaiScene_processResize;
   o.processEvent           = MO.FEaiScene_processEvent;
   o.dispose                = MO.FEaiScene_dispose;
   return o;
}
MO.FEaiScene_onOperationResize = function FEaiScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   o.processResize();
}
MO.FEaiScene_onOperationOrientation = function FEaiScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   o.processResize();
}
MO.FEaiScene_onProcessAfter = function FEaiScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   o._guiManager.process();
}
MO.FEaiScene_construct = function FEaiScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}
MO.FEaiScene_setup = function FEaiScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   if(o._optionDebug){
      var control = o._application.dynamicInfo();
      guiManager.register(control);
   }
}
MO.FEaiScene_active = function FEaiScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   if(o._optionDebug){
      var control = o._application.dynamicInfo();
      control.setStage(stage);
   }
   MO.Eai.Canvas.selectStage(stage);
}
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   MO.Eai.Canvas.selectStage(null);
}
MO.FEaiScene_processResize = function FEaiScene_processResize(event){
   var o = this;
   o._guiManager.dirty();
}
MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
   var o = this;
   o.__base.FScene.processEvent.call(o, event);
   o._guiManager.processEvent(event);
}
MO.FEaiScene_dispose = function FEaiScene_dispose(){
   var o = this;
   o._guiManager = MO.RObject.dispose(o._guiManager);
   o.__base.FScene.dispose.call(o);
}
