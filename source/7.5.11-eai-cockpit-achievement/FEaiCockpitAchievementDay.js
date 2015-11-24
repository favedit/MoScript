//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementDay = function FEaiCockpitAchievementDay(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.day';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementDay_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementDay_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementDay_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementDay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDay_construct = function FEaiCockpitAchievementDay_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDay_setup = function FEaiCockpitAchievementDay_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementDaySnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementDayView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementDay_process = function FEaiCockpitAchievementDay_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDay_dispose = function FEaiCockpitAchievementDay_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
