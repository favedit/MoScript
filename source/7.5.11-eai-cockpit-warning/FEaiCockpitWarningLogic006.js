//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic006 = function FEaiCockpitWarningLogic006(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.006';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogic006_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogic006_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogic006_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogic006_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic006_construct = function FEaiCockpitWarningLogic006_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic006_setup = function FEaiCockpitWarningLogic006_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogic006Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogic006View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogic006_process = function FEaiCockpitWarningLogic006_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic006_dispose = function FEaiCockpitWarningLogic006_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
