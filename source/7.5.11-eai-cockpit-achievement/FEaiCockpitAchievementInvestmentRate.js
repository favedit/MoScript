//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementInvestmentRate = function FEaiCockpitAchievementInvestmentRate(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.investmentRate';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementInvestmentRate_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementInvestmentRate_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementInvestmentRate_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementInvestmentRate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRate_construct = function FEaiCockpitAchievementInvestmentRate_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRate_setup = function FEaiCockpitAchievementInvestmentRate_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementInvestmentRateSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementInvestmentRateView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementInvestmentRate_process = function FEaiCockpitAchievementInvestmentRate_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementInvestmentRate_dispose = function FEaiCockpitAchievementInvestmentRate_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
