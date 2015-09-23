//==========================================================
// <T>理财师用统计控制台。</T>
//
// @class
// @author maocy
// @history 150820
//==========================================================
MO.FEaiLogicStatisticsTender = function FEaiLogicStatisticsTender(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doInfo    = MO.FEaiLogicStatisticsTender_doInfo;
   o.doDynamic = MO.FEaiLogicStatisticsTender_doDynamic;
   return o;
}

//==========================================================
// <T>获取项目信息数据。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicStatisticsTender_doInfo = function FEaiLogicStatisticsTender_doInfo(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.financial.tender.wv?do=info', parameters, owner, callback);
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
MO.FEaiLogicStatisticsTender_doDynamic = function FEaiLogicStatisticsTender_doDynamic(owner, callback, startDate, endDate){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();
   if(first){
      parameters.set('first', first);
   }
   parameters.set('begin', startDate);
   parameters.set('end', endDate);
   o.sendService('{eai.logic.service}/eai.financial.tender.wv?do=dynamic', parameters, owner, callback);
   o._customerDynamicFirst = false;
}
