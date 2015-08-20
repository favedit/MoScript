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
   o._code                 = 'statistics';
   // @attribute
   o._customerDynamicFirst = true;
   o._marketerDynamicFirst = true;
   // @attribute
   o._customer             = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer             = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department           = MO.Class.register(o, new MO.AGetter('_department'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiLogicStatistics_construct;
   // @method
   o.calculateAmountLevel  = MO.FEaiLogicStatistics_calculateAmountLevel;
   // @method
   //o.doInvestmentDynamic   = MO.FEaiLogicStatistics_doInvestmentDynamic;
   //o.doInvestmentTrend     = MO.FEaiLogicStatistics_doInvestmentTrend;
   // @method
   //o.doCustomerDynamic     = MO.FEaiLogicStatistics_doCustomerDynamic;
   //o.doCustomerTrend       = MO.FEaiLogicStatistics_doCustomerTrend;
   // @method
   //o.doMarketerDynamic     = MO.FEaiLogicStatistics_doMarketerDynamic;
   //o.doMarketerTrend       = MO.FEaiLogicStatistics_doMarketerTrend;
   // @method
   //o.doDepartmentDynamic   = MO.FEaiLogicStatistics_doDepartmentDynamic;
   //o.doDepartmentTrend     = MO.FEaiLogicStatistics_doDepartmentTrend;
   // @method
   o.doPerformenceDynamic  = MO.FEaiLogicStatistics_doPerformenceDynamic;
   // @method
   o.dispose               = MO.FEaiLogicStatistics_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicStatistics_construct = function FEaiLogicStatistics_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 创建逻辑控制器
   o._customer = MO.Class.create(MO.FEaiLogicStatisticsCustomer);
   o._marketer = MO.Class.create(MO.FEaiLogicStatisticsMarketer);
   o._department = MO.Class.create(MO.FEaiLogicStatisticsDepartment);
}

//==========================================================
// <T>计算资金级别。</T>
//
// @method
//==========================================================
MO.FEaiLogicStatistics_calculateAmountLevel = function FEaiLogicStatistics_calculateAmountLevel(amount){
   var o = this;
   if(amount >= 5000000){
      return 5;
   }else if(amount >= 1000000){
      return 4;
   }else if(amount >= 100000){
      return 3;
   }else if(amount >= 10000){
      return 2;
   }else if(amount >= 1000){
      return 1;
   }
   return 0;
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
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
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
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
   o._marketerDynamicFirst = false;
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
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=trend', parameters, owner, callback);
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

//==========================================================
// <T>获取业绩。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatistics_doPerformenceDynamic = function FEaiLogicStatistics_doPerformenceDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.wv?do=dynamic', parameters, owner, callback);
}


//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicStatistics_dispose = function FEaiLogicStatistics_dispose(){
   var o = this;
   // 释放属性
   o._customer = MO.Lang.Object.dispose(o._customer);
   o._marketer = MO.Lang.Object.dispose(o._marketer);
   o._department = MO.Lang.Object.dispose(o._department);
   // 父处理
   o.__base.FEaiLogic.dispose.call(o);
}
