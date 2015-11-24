//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementTitleRank = function FEaiCockpitAchievementTitleRank(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.titleRank';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementTitleRank_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementTitleRank_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementTitleRank_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementTitleRank_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRank_construct = function FEaiCockpitAchievementTitleRank_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRank_setup = function FEaiCockpitAchievementTitleRank_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementTitleRankSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementTitleRankView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementTitleRank_process = function FEaiCockpitAchievementTitleRank_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRank_dispose = function FEaiCockpitAchievementTitleRank_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
