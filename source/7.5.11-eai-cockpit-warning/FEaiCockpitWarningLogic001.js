//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic001 = function FEaiCockpitWarningLogic001(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.001';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogic001_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogic001_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogic001_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogic001_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001_construct = function FEaiCockpitWarningLogic001_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001_setup = function FEaiCockpitWarningLogic001_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogic001Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogic001View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogic001_process = function FEaiCockpitWarningLogic001_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001_dispose = function FEaiCockpitWarningLogic001_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
