//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementBusinessCard = function FEaiCockpitAchievementBusinessCard(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement.businessCard';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievementBusinessCard_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievementBusinessCard_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievementBusinessCard_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievementBusinessCard_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCard_construct = function FEaiCockpitAchievementBusinessCard_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCard_setup = function FEaiCockpitAchievementBusinessCard_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitAchievementBusinessCardSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitAchievementBusinessCardView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementBusinessCard_process = function FEaiCockpitAchievementBusinessCard_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementBusinessCard_dispose = function FEaiCockpitAchievementBusinessCard_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
