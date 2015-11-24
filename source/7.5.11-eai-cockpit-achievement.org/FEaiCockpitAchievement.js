//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievement = function FEaiCockpitAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitLogicModule);
   //..........................................................
   // @attribute
   o._name      = 'achievement';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitAchievement_construct;
   // @method
   o.setup      = MO.FEaiCockpitAchievement_setup;
   // @method
   o.process    = MO.FEaiCockpitAchievement_process;
   // @method
   o.dispose    = MO.FEaiCockpitAchievement_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievement_construct = function FEaiCockpitAchievement_construct(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievement_setup = function FEaiCockpitAchievement_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastView);
   // 配置模块管理器
   o.setupModuleManager(MO.FEaiCockpitAchievementModuleManager);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievement_process = function FEaiCockpitAchievement_process(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievement_dispose = function FEaiCockpitAchievement_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitLogicModule.dispose.call(o);
}
