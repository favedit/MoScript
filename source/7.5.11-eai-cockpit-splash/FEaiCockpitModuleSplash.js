//==========================================================
// <T>启动模块。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitModuleSplash = function FEaiCockpitModuleSplash(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'splash';
   o._typeCd       = MO.EEaiCockpitModule.Logo;
   o._dataTicker   = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitModuleSplash_construct;
   // @method
   o.setup         = MO.FEaiCockpitModuleSplash_setup;
   // @method
   o.processResize = MO.FEaiCockpitModuleSplash_processResize;
   o.process       = MO.FEaiCockpitModuleSplash_process;
   // @method
   o.dispose       = MO.FEaiCockpitModuleSplash_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleSplash_construct = function FEaiCockpitModuleSplash_construct(){
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
MO.FEaiCockpitModuleSplash_setup = function FEaiCockpitModuleSplash_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitModuleSplashSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setModuleManager(o._moduleManager);
   snapshot.setModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitModuleSplashView);
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
MO.FEaiCockpitModuleSplash_processResize = function FEaiCockpitModuleSplash_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleSplash_process = function FEaiCockpitModuleSplash_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleSplash_dispose = function FEaiCockpitModuleSplash_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
