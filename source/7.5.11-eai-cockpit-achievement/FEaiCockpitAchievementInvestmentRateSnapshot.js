//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot = function FEaiCockpitAchievementInvestmentRateSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/achievement/investmentRate.png';
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._gridImage            = null;
   o._listBox              = null;
   o._index                = 0;
   o._page                 = 0;
   o._pageItemsTotal       = 0;
   o._pageMax              = 0;
   o._pageItemsMax         = 8;
   o._rollDuration         = 5000;
   o._rollTicker           = null;
   o._rateChart            = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementInvestmentRateSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementInvestmentRateSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementInvestmentRateSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementInvestmentRateSnapshot_construct;
   o.onFetchData           = MO.FEaiCockpitAchievementInvestmentRateSnapshot_onFetchData;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementInvestmentRateSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementInvestmentRateSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementInvestmentRateSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementInvestmentRateSnapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementInvestmentRateSnapshot_onFetchData = function FEaiCockpitAchievementInvestmentRateSnapshot_onFetchData(event){
   var o = this;
   // 读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   var ds = data;
   if(data.investmentAmount()){
      o._rateChart.setData(data);
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_onPaintBegin = function FEaiCockpitAchievementInvestmentRateSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawImage(o._productImage,left+width-150,top+20,107,178);

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_onPaintEnd = function FEaiCockpitAchievementInvestmentRateSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_construct = function FEaiCockpitAchievementInvestmentRateSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 7, 0);
   o._cellSize.set(7, 2);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitAchievementMessageNextRates);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_setup = function FEaiCockpitAchievementInvestmentRateSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 加载图片
   o._productImage = o.loadResourceImage('{eai.resource}/cockpit/achievement/productname.png');

   var rateChart = o._rateChart = MO.Class.create(MO.FEaiCockpitMessageAchievementRateChart);
   rateChart.setLocation(120, 0);
   rateChart.setSize(480, 240);
   o.push(rateChart);

   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_processLogic = function FEaiCockpitAchievementInvestmentRateSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchRate(o, o.onFetchData);
   }
   o._rateChart.dirty();
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRateSnapshot_dispose = function FEaiCockpitAchievementInvestmentRateSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
