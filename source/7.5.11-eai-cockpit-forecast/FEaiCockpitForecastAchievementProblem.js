//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastAchievementProblem = function FEaiCockpitForecastAchievementProblem(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.problem.010';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastAchievementProblem_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastAchievementProblem_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastAchievementProblem_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastAchievementProblem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblem_construct = function FEaiCockpitForecastAchievementProblem_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblem_setup = function FEaiCockpitForecastAchievementProblem_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastAchievementProblemSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastAchievementProblemView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastAchievementProblem_process = function FEaiCockpitForecastAchievementProblem_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblem_dispose = function FEaiCockpitForecastAchievementProblem_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
