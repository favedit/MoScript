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
   o.doCustomerDynamic   = MO.FEaiLogicStatistics_doCustomerDynamic;
   o.doCustomerTrend     = MO.FEaiLogicStatistics_doCustomerTrend;
   o.doMarketerDynamic   = MO.FEaiLogicStatistics_doMarketerDynamic;
   o.doMarketerTrend     = MO.FEaiLogicStatistics_doMarketerTrend;
   o.doDepartmentDynamic = MO.FEaiLogicStatistics_doDepartmentDynamic;
   o.doDepartmentTrend   = MO.FEaiLogicStatistics_doDepartmentTrend;
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

//==========================================================
// <T>获取客户动态数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doCustomerDynamic = function FEaiLogicStatistics_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=dynamic', parameters, owner, callback);
}

//==========================================================
// <T>获取客户趋势数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doCustomerTrend = function FEaiLogicStatistics_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=trend', parameters, owner, callback);
}

//==========================================================
// <T>获取理财师动态数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doMarketerDynamic = function FEaiLogicStatistics_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   // 获得地址
   var uri = '{eai.logic.service}/eai.financial.marketer.wv?do=dynamic&begin=' + startDate + '&end=' + endDate;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 发送请求
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
   connection.addLoadListener(owner, callback);
   return connection;
}

//==========================================================
// <T>获取理财师趋势数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doMarketerTrend = function FEaiLogicStatistics_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   // 获得地址
   var uri = '{eai.logic.service}/eai.financial.marketer.wv?do=trend&begin=' + startDate + '&end=' + endDate;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 发送请求
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(url);
   connection.addLoadListener(owner, callback);
   return connection;
}


//==========================================================
// <T>获取部门动态数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doDepartmentDynamic = function FEaiLogicStatistics_doDepartmentDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
}

//==========================================================
// <T>获取部门趋势数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doDepartmentTrend = function FEaiLogicStatistics_doDepartmentTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=trend', parameters, owner, callback);
}
