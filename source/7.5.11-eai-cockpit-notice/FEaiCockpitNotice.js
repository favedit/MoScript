//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitNotice = function FEaiCockpitNotice(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitLogicModule);
   //..........................................................
   // @attribute
   o._name      = 'notice';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitNotice_construct;
   // @method
   o.setup      = MO.FEaiCockpitNotice_setup;
   // @method
   o.process    = MO.FEaiCockpitNotice_process;
   // @method
   o.dispose    = MO.FEaiCockpitNotice_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNotice_construct = function FEaiCockpitNotice_construct(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNotice_setup = function FEaiCockpitNotice_setup(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitNoticeSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitNoticeView);
   // 配置模块管理器
   o.setupModuleManager(MO.FEaiCockpitNoticeModuleManager);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitNotice_process = function FEaiCockpitNotice_process(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNotice_dispose = function FEaiCockpitNotice_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitLogicModule.dispose.call(o);
}
