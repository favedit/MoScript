//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitProject = function FEaiCockpitProject(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name      = 'project';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitProject_construct;
   // @method
   o.setup      = MO.FEaiCockpitProject_setup;
   // @method
   o.process    = MO.FEaiCockpitProject_process;
   // @method
   o.dispose    = MO.FEaiCockpitProject_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProject_construct = function FEaiCockpitProject_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProject_setup = function FEaiCockpitProject_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitProjectSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitProjectView);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProject_process = function FEaiCockpitProject_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProject_dispose = function FEaiCockpitProject_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
