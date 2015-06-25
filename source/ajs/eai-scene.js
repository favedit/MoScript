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
   o._code        = MO.EEaiScene.ChartHistory;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   o.onLoadData   = MO.FEaiChartHistoryScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartHistoryScene_onKeyDown;
   o.setup        = MO.FEaiChartHistoryScene_setup;
   o.selectDate   = MO.FEaiChartHistoryScene_selectDate;
   o.active       = MO.FEaiChartHistoryScene_active;
   o.process      = MO.FEaiChartHistoryScene_process;
   o.deactive     = MO.FEaiChartHistoryScene_deactive;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var code = o._currentDate.format('YYYYMMDD')
   o.selectDate(code);
}
MO.FEaiChartHistoryScene_onKeyDown = function FEaiChartHistoryScene_onKeyDown(event){
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
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code){
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
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
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
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartHistoryScene_process = function FEaiChartHistoryScene_process(){
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
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
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
         rankCell.innerText = i + 1;
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
            break;
         case 1:
            row.style.color = '#E1A71B';
            break;
         case 2:
            row.style.color = '#E16A00';
            break;
         default:
            break;
      }
   }
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
   timeline.linkGraphicContext(o);
   timeline.build();
   o._desktop.register(timeline);
   layer.push(timeline);
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
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._countryData          = null;
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._countryBorderDisplay = null;
   o._countryDisplay       = null;
   o._citysRenderables     = null;
   o._logoBar              = null;
   o._titleBar             = null;
   o.onLoadData            = MO.FEaiChartScene_onLoadData;
   o.construct             = MO.FEaiChartScene_construct;
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   o.active                = MO.FEaiChartScene_active;
   o.process               = MO.FEaiChartScene_process;
   o.deactive              = MO.FEaiChartScene_deactive;
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var countryDisplay = o._countryDisplay;
   var countryBorderDisplay = o._countryBorderDisplay;
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      o._provinceEntities.set(province.code(), provinceEntity);
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
}
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
   o._citysRenderables = new MO.TDictionary();
}
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -34;
   matrix.ty = -11.6;
   matrix.tz = 0;
   matrix.setScale(0.3, 0.34, 0.3);
   matrix.update();
}
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var context = o.graphicContext();
   var contextSize = context.size();
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   var control = o._background = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.size().assign(contextSize);
   control.setBackResource('url:/script/ars/eai/background.png');
   control.psInitialize();
   control.build();
   o._desktop.register(control);
   stage.groundLayer().push(control);
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRangeRenderable.matrix());
   stage.cityRangeLayer().push(citysRangeRenderable);
   var citysRenderables = o._citysRenderables;
   for(var i = 4; i >= 1; i--){
      var renderable = MO.Class.create(MO.FEaiCitysRenderable);
      renderable.setLevel(i);
      renderable.linkGraphicContext(o);
      o.fixMatrix(renderable.matrix());
      stage.cityLayer().push(renderable);
      citysRenderables.set(i, renderable);
   }
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(context);
      o._cityEntities.set(city.code(), cityEntity);
      var citysRenderable = citysRenderables.get(level);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
   }
   var count = citysRenderables.count()
   for(var i = 0; i < count; i++){
      var citysRenderable = citysRenderables.at(i);
      citysRenderable.setup();
      citysRenderable.upload();
   }
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(10, 10);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   var currentDate = new MO.TDate();
   var dateControl = frame.findComponent('date');
   dateControl.setLabel(currentDate.format('YYYY/MM/DD'));
   var timeControl = frame.findComponent('time');
   timeControl.setLabel(currentDate.format('HH24:MI'));
   var frame = o._totalBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.TotalBar');
   frame.setLocation(590, 10);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}
MO.FEaiChartScene_process = function FEaiChartScene_process(){
   var o = this;
   o.__base.FEaiScene.process.call(o);
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinceEntities = RObject.dispose(o._provinceEntities);
   o._cityEntities = RObject.dispose(o._cityEntities);
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._groundLayer    = MO.RClass.register(o, new MO.AGetter('_groundLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer    = MO.RClass.register(o, new MO.AGetter('_borderLayer'));
   o._cityRangeLayer = MO.RClass.register(o, new MO.AGetter('_cityRangeLayer'));
   o._cityLayer      = MO.RClass.register(o, new MO.AGetter('_cityLayer'));
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
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   layer.setOptionClearDepth(true);
   o.registerLayer('FaceLayer', layer);
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
with(MO){
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FScene);
      o._desktop        = RClass.register(o, new AGetter('_desktop'));
      o._engineInfo     = null;
      o.onProcess       = MO.FEaiScene_onProcess;
      o.construct       = MO.FEaiScene_construct;
      o.setup           = MO.FEaiScene_setup;
      o.active          = MO.FEaiScene_active;
      o.deactive        = MO.FEaiScene_deactive;
      o.processEvent    = FEaiScene_processEvent;
      o.dispose         = MO.FEaiScene_dispose;
      return o;
   }
   MO.FEaiScene_onProcess = function FEaiScene_onProcess(){
      var o = this;
      o._desktop.process();
      o.__base.FScene.onProcess.call(o);
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
      o._desktop = RClass.create(FGuiDesktop);
   }
   MO.FEaiScene_setup = function FEaiScene_setup(){
      var o = this;
      o.__base.FScene.setup.call(o);
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 200);
      control.build();
      o._desktop.register(control);
   }
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FScene.active.call(o);
      var stage = o._activeStage;
      MO.Eai.Canvas.selectStage(stage);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.push(o._engineInfo);
      o._engineInfo.setStage(stage);
   }
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FScene.deactive.call(o);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.remove(o._engineInfo.renderable());
      MO.Eai.Canvas.selectStage(null);
   }
   MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
      var o = this;
      o.__base.FScene.processEvent();
      o._desktop.processEvent(event);
   }
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._desktop = RObject.dispose(o._desktop);
      o.__base.FScene.dispose.call(o);
   }
}
