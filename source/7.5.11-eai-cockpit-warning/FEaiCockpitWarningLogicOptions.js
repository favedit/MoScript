//==========================================================
// <T>预测目录模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicOptions = function FEaiCockpitWarningLogicOptions(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.options';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogicOptions_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogicOptions_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogicOptions_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogicOptions_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptions_construct = function FEaiCockpitWarningLogicOptions_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptions_setup = function FEaiCockpitWarningLogicOptions_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogicOptionsSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogicOptionsView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogicOptions_process = function FEaiCockpitWarningLogicOptions_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptions_dispose = function FEaiCockpitWarningLogicOptions_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
