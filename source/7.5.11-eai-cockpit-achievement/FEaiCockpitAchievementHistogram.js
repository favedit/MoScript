//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementHistogram = function FEaiCockpitAchievementHistogram(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.histogram';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementHistogram_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementHistogram_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementHistogram_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementHistogram_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogram_construct = function FEaiCockpitAchievementHistogram_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogram_setup = function FEaiCockpitAchievementHistogram_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementHistogramSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementHistogramView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementHistogram_process = function FEaiCockpitAchievementHistogram_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogram_dispose = function FEaiCockpitAchievementHistogram_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
