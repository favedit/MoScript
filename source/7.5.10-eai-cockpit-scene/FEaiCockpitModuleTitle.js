//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModuleTitle = function FEaiCockpitModuleTitle(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'title';
   o._typeCd       = MO.EEaiCockpitModule.Logic;
   o._dataTicker   = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitModuleTitle_construct;
   // @method
   o.setup         = MO.FEaiCockpitModuleTitle_setup;
   // @method
   o.processResize = MO.FEaiCockpitModuleTitle_processResize;
   o.process       = MO.FEaiCockpitModuleTitle_process;
   // @method
   o.dispose       = MO.FEaiCockpitModuleTitle_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitle_construct = function FEaiCockpitModuleTitle_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 60);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitle_setup = function FEaiCockpitModuleTitle_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitModuleTitleSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setModuleManager(o._moduleManager);
   snapshot.setModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitModuleTitleView);
   view.linkGraphicContext(o);
   view.setModuleManager(o._moduleManager);
   view.setModule(o);
   view.setup();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleTitle_processResize = function FEaiCockpitModuleTitle_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleTitle_process = function FEaiCockpitModuleTitle_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitle_dispose = function FEaiCockpitModuleTitle_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
