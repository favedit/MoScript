//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementTitleAchieve = function FEaiCockpitAchievementTitleAchieve(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.titleAmchievement';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementTitleAchieve_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementTitleAchieve_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementTitleAchieve_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementTitleAchieve_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieve_construct = function FEaiCockpitAchievementTitleAchieve_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieve_setup = function FEaiCockpitAchievementTitleAchieve_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementTitleAchieveSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementTitleAchieveView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementTitleAchieve_process = function FEaiCockpitAchievementTitleAchieve_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleAchieve_dispose = function FEaiCockpitAchievementTitleAchieve_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
