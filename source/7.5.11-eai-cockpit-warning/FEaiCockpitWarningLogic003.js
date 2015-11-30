//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic003 = function FEaiCockpitWarningLogic003(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'Warning.logic.003';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitWarningLogic003_construct;
   // @method
   o.setup       = MO.FEaiCockpitWarningLogic003_setup;
   // @method
   o.process     = MO.FEaiCockpitWarningLogic003_process;
   // @method
   o.dispose     = MO.FEaiCockpitWarningLogic003_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic003_construct = function FEaiCockpitWarningLogic003_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic003_setup = function FEaiCockpitWarningLogic003_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningLogic003Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningLogic003View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarningLogic003_process = function FEaiCockpitWarningLogic003_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic003_dispose = function FEaiCockpitWarningLogic003_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
