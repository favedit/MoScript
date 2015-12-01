//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicRedemption = function FEaiCockpitWarningLogicRedemption(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.Redemption';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogicRedemption_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogicRedemption_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogicRedemption_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogicRedemption_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemption_construct = function FEaiCockpitWarningLogicRedemption_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemption_setup = function FEaiCockpitWarningLogicRedemption_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogicRedemptionSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogicRedemptionView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogicRedemption_process = function FEaiCockpitWarningLogicRedemption_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemption_dispose = function FEaiCockpitWarningLogicRedemption_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
