//==========================================================
// <T>公司用统计控制台。</T>
//
// @class
// @author maocy
// @history 150820
//==========================================================
MO.FEaiLogicStatisticsDepartment = function FEaiLogicStatisticsDepartment(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._customerDynamicFirst   = true;
   o._marketerDynamicFirst   = true;
   o._departmentDynamicFirst = true;
   //..........................................................
   // @method
   o.doCustomerDynamic       = MO.FEaiLogicStatisticsDepartment_doCustomerDynamic;
   o.doCustomerTrend         = MO.FEaiLogicStatisticsDepartment_doCustomerTrend;
   // @method
   o.doMarketerDynamic       = MO.FEaiLogicStatisticsDepartment_doMarketerDynamic;
   o.doMarketerTrend         = MO.FEaiLogicStatisticsDepartment_doMarketerTrend;
   // @method
   o.doDepartmentDynamic     = MO.FEaiLogicStatisticsDepartment_doDepartmentDynamic;
   o.doDepartmentTrend       = MO.FEaiLogicStatisticsDepartment_doDepartmentTrend;
   return o;
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
MO.FEaiLogicStatisticsDepartment_doCustomerDynamic = function FEaiLogicStatisticsDepartment_doCustomerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.customer.wv?do=dynamic', parameters, owner, callback);
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
MO.FEaiLogicStatisticsDepartment_doCustomerTrend = function FEaiLogicStatisticsDepartment_doCustomerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.customer.wv?do=trend', parameters, owner, callback);
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
MO.FEaiLogicStatisticsDepartment_doMarketerDynamic = function FEaiLogicStatisticsDepartment_doMarketerDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._marketerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.marketer.wv?do=dynamic', parameters, owner, callback);
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
MO.FEaiLogicStatisticsDepartment_doMarketerTrend = function FEaiLogicStatisticsDepartment_doMarketerTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.marketer.wv?do=trend', parameters, owner, callback);
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
MO.FEaiLogicStatisticsDepartment_doDepartmentDynamic = function FEaiLogicStatisticsDepartment_doDepartmentDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.department.wv?do=dynamic', parameters, owner, callback);
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
MO.FEaiLogicStatisticsDepartment_doDepartmentTrend = function FEaiLogicStatisticsDepartment_doDepartmentTrend(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.department.department.wv?do=trend', parameters, owner, callback);
}
