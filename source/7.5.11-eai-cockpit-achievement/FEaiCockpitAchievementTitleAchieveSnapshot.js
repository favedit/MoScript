//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot = function FEaiCockpitAchievementTitleAchieveSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/achievement/rankleft.png';
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
   o._lineChart            = null;
   //数据
   o._data                 = MO.Class.register(o,new MO.AGetSet('_data'));
   //数据
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementTitleAchieveSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementTitleAchieveSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementTitleAchieveSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementTitleAchieveSnapshot_construct;
   o.onFetchDayData        = MO.FEaiCockpitAchievementTitleAchieveSnapshot_onFetchDayData;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementTitleAchieveSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementTitleAchieveSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementTitleAchieveSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementTitleAchieveSnapshot_dispose;
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
MO.FEaiCockpitAchievementTitleAchieveSnapshot_onFetchDayData = function FEaiCockpitAchievementTitleAchieveSnapshot_onFetchDayData(event){
   var o = this;
   var data  = o._data ;
   data.unserializeSignBuffer(event.sign, event.content, true);
   var logoBar = o._logoBar;
   if(data.investmentAmount()){
      //投资总额
      var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
      investmentTotalCount.setValue(parseInt(data.investmentAmount()).toString());
      // 赎回总金额
      var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
      redemptionTotalCount.setValue(parseInt(data.redemptionAmount()).toString());
      // 净投总金额 
      var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
      netinvestmentTotalCount.setValue(parseInt(data.netinvestmentAmount()).toString());
     
      // 当月投资总金额
      var investmentTotal = logoBar.findComponent('investmentTotal');
      investmentTotal.setValue(parseInt(data.investmentMonth()).toString());
      // 当月赎回总金额
      var redemptionTotal = logoBar.findComponent('redemptionTotal');
      redemptionTotal.setValue(parseInt(data.redemptionMonth()).toString());
      // 当月净投总金额     
      var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
      netinvestmentTotal.setValue(parseInt(data.netinvestmentMonth()).toString());
    
   }

}
//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementTitleAchieveSnapshot_onDataFetch = function FEaiCockpitAchievementTitleAchieveSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据

}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_onPaintBegin = function FEaiCockpitAchievementTitleAchieveSnapshot_onPaintBegin(event) {
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


}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_onPaintEnd = function FEaiCockpitAchievementTitleAchieveSnapshot_onPaintEnd(event) {
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

   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_construct = function FEaiCockpitAchievementTitleAchieveSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(7, 1);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 10);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitAchievementMessageTitleAchieve);

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_setup = function FEaiCockpitAchievementTitleAchieveSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   //
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.cockpit.LogoBarAchievement');
   o.push(frame);

   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_processLogic = function FEaiCockpitAchievementTitleAchieveSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchTitle(o, o.onFetchDayData);
      var data = o._data;
      var logoBar = o._logoBar;
      if(data.investmentAmount()){
      //投资总额
      var investmentTotalCount = logoBar.findComponent('investmentTotalCount');
      investmentTotalCount.setValue(parseInt(data.investmentAmount()).toString());
      // 赎回总金额
      var redemptionTotalCount = logoBar.findComponent('redemptionTotalCount');
      redemptionTotalCount.setValue(parseInt(data.redemptionAmount()).toString());
      // 净投总金额 
      var netinvestmentTotalCount = logoBar.findComponent('netinvestmentTotalCount');
      netinvestmentTotalCount.setValue(parseInt(data.netinvestmentAmount()).toString());
     
      // 当月投资总金额
      var investmentTotal = logoBar.findComponent('investmentTotal');
      investmentTotal.setValue(parseInt(data.investmentMonth()).toString());
      // 当月赎回总金额
      var redemptionTotal = logoBar.findComponent('redemptionTotal');
      redemptionTotal.setValue(parseInt(data.redemptionMonth()).toString());
      // 当月净投总金额     
      var netinvestmentTotal = logoBar.findComponent('netinvestmentTotal');
      netinvestmentTotal.setValue(parseInt(data.netinvestmentMonth()).toString());
      }
   }
   o.dirty();
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieveSnapshot_dispose = function FEaiCockpitAchievementTitleAchieveSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
