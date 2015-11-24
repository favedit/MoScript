//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementMonthCurve = function FEaiCockpitAchievementMonthCurve(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.monthCurve';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementMonthCurve_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementMonthCurve_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementMonthCurve_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementMonthCurve_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurve_construct = function FEaiCockpitAchievementMonthCurve_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurve_setup = function FEaiCockpitAchievementMonthCurve_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementMonthCurveSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementMonthCurveView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementMonthCurve_process = function FEaiCockpitAchievementMonthCurve_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurve_dispose = function FEaiCockpitAchievementMonthCurve_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
