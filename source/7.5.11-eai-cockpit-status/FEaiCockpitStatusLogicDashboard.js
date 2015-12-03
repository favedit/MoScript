//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitStatusLogicDashboard = function FEaiCockpitStatusLogicDashboard(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.logic.FinishMonth';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitStatusLogicDashboard_construct;
   // @method
   o.setup       = MO.FEaiCockpitStatusLogicDashboard_setup;
   // @method
   o.process     = MO.FEaiCockpitStatusLogicDashboard_process;
   // @method
   o.dispose     = MO.FEaiCockpitStatusLogicDashboard_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboard_construct = function FEaiCockpitStatusLogicDashboard_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboard_setup = function FEaiCockpitStatusLogicDashboard_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitStatusLogicDashboardSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitStatusLogicDashboardView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitStatusLogicDashboard_process = function FEaiCockpitStatusLogicDashboard_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboard_dispose = function FEaiCockpitStatusLogicDashboard_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
