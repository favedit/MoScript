//==========================================================
// <T>预测目录模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicNewest = function FEaiCockpitWarningLogicNewest(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.newest';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogicNewest_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogicNewest_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogicNewest_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogicNewest_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewest_construct = function FEaiCockpitWarningLogicNewest_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewest_setup = function FEaiCockpitWarningLogicNewest_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogicNewestSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogicNewestView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogicNewest_process = function FEaiCockpitWarningLogicNewest_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewest_dispose = function FEaiCockpitWarningLogicNewest_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
