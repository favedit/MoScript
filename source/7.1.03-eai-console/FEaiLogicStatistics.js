//==========================================================
// <T>统计控制台。</T>
//
// @class
// @author maocy
// @history 150629
//==========================================================
MO.FEaiLogicStatistics = function FEaiLogicStatistics(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code               = 'statistics';
   //..........................................................
   // @method
   o.doInvestmentDynamic = MO.FEaiLogicStatistics_doInvestmentDynamic;
   o.doInvestmentTrend   = MO.FEaiLogicStatistics_doInvestmentTrend;
   return o;
}

//==========================================================
// <T>获取投资动态数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doInvestmentDynamic = function FEaiLogicStatistics_doInvestmentDynamic(owner, callback, startDate, endDate){
   var parameters = 'begin=' + startDate + '&end=' + endDate;
   return this.send('investment_dynamic', parameters, owner, callback);
}

//==========================================================
// <T>获取投资趋势数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doInvestmentTrend = function FEaiLogicStatistics_doInvestmentTrend(owner, callback, startDate, endDate, interval){
   if(!interval){
      interval = 600000;
   }
   var parameters = 'begin=' + startDate + '&end=' + endDate + '&interval=' + interval;
   return this.send('investment_trend', parameters, owner, callback);
}
