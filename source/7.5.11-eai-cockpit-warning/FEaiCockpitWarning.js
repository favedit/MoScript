//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitWarning = function FEaiCockpitWarning(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitLogicModule);
   //..........................................................
   // @attribute
   o._name      = 'warning';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitWarning_construct;
   // @method
   o.setup      = MO.FEaiCockpitWarning_setup;
   // @method
   o.process    = MO.FEaiCockpitWarning_process;
   // @method
   o.dispose    = MO.FEaiCockpitWarning_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarning_construct = function FEaiCockpitWarning_construct(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarning_setup = function FEaiCockpitWarning_setup(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitWarningSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitWarningView);
      // 配置模块管理器
   o.setupModuleManager(MO.FEaiCockpitWarningModuleManager);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitWarning_process = function FEaiCockpitWarning_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitLogicModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarning_dispose = function FEaiCockpitWarning_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitLogicModule.dispose.call(o);
}
