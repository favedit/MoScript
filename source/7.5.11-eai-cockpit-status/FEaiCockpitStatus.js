//==========================================================
// <T>驾驶舱状态模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitStatus = function FEaiCockpitStatus(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'status';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitStatus_construct;
   // @method
   o.setup      = MO.FEaiCockpitStatus_setup;
   // @method
   o.process    = MO.FEaiCockpitStatus_process;
   // @method
   o.dispose    = MO.FEaiCockpitStatus_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatus_construct = function FEaiCockpitStatus_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatus_setup = function FEaiCockpitStatus_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitStatusSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitStatusView);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatus_process = function FEaiCockpitStatus_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatus_dispose = function FEaiCockpitStatus_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
