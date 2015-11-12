//==========================================================
// <T>客户用统计控制台。</T>
//
// @class
// @author maocy
// @history 150820
//==========================================================
MO.FEaiLogicStatisticsCustomer = function FEaiLogicStatisticsCustomer(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._customerDynamicFirst   = true;
   //..........................................................
   // @method
   o.doCustomerDynamic = MO.FEaiLogicStatisticsCustomer_doCustomerDynamic;
   o.doCustomerTrend   = MO.FEaiLogicStatisticsCustomer_doCustomerTrend;
   o.doProvince        = MO.FEaiLogicStatisticsCustomer_doProvince;
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
MO.FEaiLogicStatisticsCustomer_doCustomerDynamic = function FEaiLogicStatisticsCustomer_doCustomerDynamic(owner, callback, startDate, endDate){
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
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsCustomer_doCustomerTrend = function FEaiLogicStatisticsCustomer_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=trend', parameters, owner, callback);
}


//==========================================================
// <T>获取省份统计数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsCustomer_doProvince = function FEaiLogicStatisticsCustomer_doProvince(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.setNvl('begin', startDate);
   parameters.setNvl('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.customer.wv?do=province', parameters, owner, callback);
}
