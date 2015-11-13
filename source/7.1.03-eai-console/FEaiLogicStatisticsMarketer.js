//==========================================================
// <T>理财师用统计控制台。</T>
//
// @class
// @author maocy
// @history 150820
//==========================================================
MO.FEaiLogicStatisticsMarketer = function FEaiLogicStatisticsMarketer(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._customerDynamicFirst = true;
   o._marketerDynamicFirst = true;
   //..........................................................
   // @method
   o.doCustomerDynamic     = MO.FEaiLogicStatisticsMarketer_doCustomerDynamic;
   o.doCustomerTrend       = MO.FEaiLogicStatisticsMarketer_doCustomerTrend;
   o.doCustomerTender      = MO.FEaiLogicStatisticsMarketer_doCustomerTender;
   // @method
   o.doMarketerDynamic     = MO.FEaiLogicStatisticsMarketer_doMarketerDynamic;
   o.doMarketerTrend       = MO.FEaiLogicStatisticsMarketer_doMarketerTrend;
   return o;
}

//==========================================================
// <T>获取客户动态数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsMarketer_doCustomerDynamic = function FEaiLogicStatisticsMarketer_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.customer.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}

//==========================================================
// <T>获取客户趋势数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsMarketer_doCustomerTrend = function FEaiLogicStatisticsMarketer_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.customer.wv?do=trend', parameters, owner, callback);
}

//==========================================================
// <T>获取投标信息数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsMarketer_doCustomerTender = function FEaiLogicStatisticsMarketer_doCustomerTender(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.financial.marketer.customer.wv?do=tender', parameters, owner, callback);
}

//==========================================================
// <T>获取理财师动态数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsMarketer_doMarketerDynamic = function FEaiLogicStatisticsMarketer_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.marketer.wv?do=dynamic', parameters, owner, callback);
   o._marketerDynamicFirst = false;
}

//==========================================================
// <T>获取理财师趋势数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsMarketer_doMarketerTrend = function FEaiLogicStatisticsMarketer_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.marketer.marketer.wv?do=trend', parameters, owner, callback);
}
