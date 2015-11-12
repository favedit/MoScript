//==========================================================
// <T>业绩用统计控制台。</T>
//
// @class
// @author maocy
// @history 150911
//==========================================================
MO.FEaiLogicStatisticsAchievement = function FEaiLogicStatisticsAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doDynamic = MO.FEaiLogicStatisticsAchievement_doDynamic;
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
MO.FEaiLogicStatisticsAchievement_doDynamic = function FEaiLogicStatisticsAchievement_doDynamic(owner, callback, startDate, endDate){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.financial.achievement.wv?do=dynamic', parameters, owner, callback);
}
