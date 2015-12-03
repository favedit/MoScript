//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicInvestment = function FEaiCockpitWarningLogicInvestment(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.Capita';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogicInvestment_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogicInvestment_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogicInvestment_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogicInvestment_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestment_construct = function FEaiCockpitWarningLogicInvestment_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestment_setup = function FEaiCockpitWarningLogicInvestment_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogicInvestmentSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogicInvestmentView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogicInvestment_process = function FEaiCockpitWarningLogicInvestment_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestment_dispose = function FEaiCockpitWarningLogicInvestment_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
