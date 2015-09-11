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
   o._code                = 'statistics';
   // @attribute
   o._achievement         = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._customer            = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer            = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department          = MO.Class.register(o, new MO.AGetter('_department'));
   //..........................................................
   // @method
   o.construct            = MO.FEaiLogicStatistics_construct;
   // @method
   o.calculateAmountLevel = MO.FEaiLogicStatistics_calculateAmountLevel;
   // @method
   o.doPerformenceDynamic = MO.FEaiLogicStatistics_doPerformenceDynamic;
   // @method
   o.dispose              = MO.FEaiLogicStatistics_dispose;
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
   o._achievement = MO.Class.create(MO.FEaiLogicStatisticsAchievement);
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
   o._achievement = MO.Lang.Object.dispose(o._achievement);
   o._customer = MO.Lang.Object.dispose(o._customer);
   o._marketer = MO.Lang.Object.dispose(o._marketer);
   o._department = MO.Lang.Object.dispose(o._department);
   // 父处理
   o.__base.FEaiLogic.dispose.call(o);
}
