//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementDayCurve = function FEaiCockpitAchievementDayCurve(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.dayCurve';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementDayCurve_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementDayCurve_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementDayCurve_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementDayCurve_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurve_construct = function FEaiCockpitAchievementDayCurve_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurve_setup = function FEaiCockpitAchievementDayCurve_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementDayCurveSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementDayCurveView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementDayCurve_process = function FEaiCockpitAchievementDayCurve_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurve_dispose = function FEaiCockpitAchievementDayCurve_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
