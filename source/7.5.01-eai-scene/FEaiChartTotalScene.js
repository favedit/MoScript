//==========================================================
// <T>图表总计场景。</T>
//
// @class
// @author maocy
// @history 150715
//==========================================================
MO.FEaiChartTotalScene = function FEaiChartTotalScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._optionMapCountry = false;
   // @attribute
   o._code             = MO.EEaiScene.ChartTotal;
   // @attribute
   o._currentDate      = null;
   // @attribute
   o._statusStart      = false;
   o._statusLayerCount = 100;
   o._statusLayerLevel = 100;
   // @attribute
   o._chartTotal       = null;
   //..........................................................
   // @event
   o.onInvestment      = MO.FEaiChartTotalScene_onInvestment;
   o.onProcess         = MO.FEaiChartTotalScene_onProcess;
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartTotalScene_construct;
   o.setup             = MO.FEaiChartTotalScene_setup;
   // @method
   o.testReady         = MO.FEaiChartTotalScene_testReady;
   return o;
}

//==========================================================
// <T>统计投资数据获取处理。</T>
//
// @method
//==========================================================
MO.FEaiChartTotalScene_onInvestment = function FEaiChartTotalScene_onInvestment(event){
   var o = this;
   var content = event.content;
   o._chartTotal.setValue(parseInt(content.investment_total).toString());
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartTotalScene_onProcess = function FEaiChartTotalScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
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
      //..........................................................
      // 每间隔一段时间获取数据
      if(o._dataTicker.process()){
         var system = MO.Console.find(MO.FEaiLogicConsole).system();
         if(system.testReady()){
            var systemDate = system.currentDate();
            var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
            statistics.doInvestmentDynamic(o, o.onInvestment, systemDate.format(), systemDate.format());
         }
      }

      if (o._chartTotal.rolling()) {
         o._chartTotal.dirty();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartTotalScene_construct = function FEaiChartTotalScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 配置属性
   o._currentDate = new MO.TDate();
   o._dataTicker = new MO.TTicker(1000 * 30);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartTotalScene_setup = function FEaiChartTotalScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   // 隐藏全部界面
   o._guiManager.hide();

   var chartTotal = o._chartTotal = MO.Class.create(MO.FGuiChartTotal);
   chartTotal.setup();
   chartTotal.build();
   o._guiManager.register(chartTotal);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartTotalScene_testReady = function FEaiChartTotalScene_testReady(){
   var o = this;
   if(!o._ready){
      if (!o._countryReady || !o._chartTotal.ready()) {
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}
