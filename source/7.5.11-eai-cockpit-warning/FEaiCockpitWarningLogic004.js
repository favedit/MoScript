//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic004 = function FEaiCockpitWarningLogic004(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.004';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogic004_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogic004_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogic004_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogic004_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic004_construct = function FEaiCockpitWarningLogic004_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic004_setup = function FEaiCockpitWarningLogic004_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogic004Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogic004View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogic004_process = function FEaiCockpitWarningLogic004_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic004_dispose = function FEaiCockpitWarningLogic004_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
