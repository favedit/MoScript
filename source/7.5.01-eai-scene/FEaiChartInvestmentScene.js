//==========================================================
// <T>图表投资场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code        = MO.EEaiScene.ChartInvestment;
   o._playing     = false;
   o._startDate   = null;
   o._endDate     = null;
   o._currentDate = null;
   //..........................................................
   // @event
   o.onLoadData   = MO.FEaiChartInvestmentScene_onLoadData;
   o.onKeyDown    = MO.FEaiChartInvestmentScene_onKeyDown;
   //..........................................................
   // @method
   o.setup        = MO.FEaiChartInvestmentScene_setup;
   o.selectDate   = MO.FEaiChartInvestmentScene_selectDate;
   // @method
   o.active       = MO.FEaiChartInvestmentScene_active;
   o.process      = MO.FEaiChartInvestmentScene_process;
   o.deactive     = MO.FEaiChartInvestmentScene_deactive;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartInvestmentScene_onLoadData = function FEaiChartInvestmentScene_onLoadData(event){
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
MO.FEaiChartInvestmentScene_onKeyDown = function FEaiChartInvestmentScene_onKeyDown(event){
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

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartInvestmentScene_selectDate = function FEaiChartInvestmentScene_selectDate(code){
   var o = this;
   // 构建画面
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get(code);
   if(dateData){
      // 设置省份数据
      var provincesData = dateData.provinces();
      var count = provincesData.count();
      for(var i = 0; i < count; i++){
         var provinceData = provincesData.at(i);
         var provinceEntity = o._provinceEntities.get(provinceData.code());
         provinceEntity.update(provinceData);
      }
      // 设置城市数据
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

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup(){
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

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_process = function FEaiChartInvestmentScene_process(){
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

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
