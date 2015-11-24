//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitLogicModule = function FEaiCockpitLogicModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._moduleManager = MO.Class.register(o, new MO.AGetter('_moduleManager'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitLogicModule_construct;
   // @method
   o.setupModuleManager = MO.FEaiCockpitLogicModule_setupModuleManager;
   // @method
   o.process        = MO.FEaiCockpitLogicModule_process;
   // @method
   o.dispose        = MO.FEaiCockpitLogicModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogicModule_construct = function FEaiCockpitLogicModule_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>配置构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogicModule_setupModuleManager = function FEaiCockpitLogicModule_setupModuleManager(clazz){
   var o = this;
   // 创建模块管理器
   var moduleManager = o._moduleManager = MO.Class.create(clazz);
   moduleManager.linkGraphicContext(o);
   moduleManager.setParentModuleManager(o._parentModuleManager);
   moduleManager.setup();
   // 增加显示对象
   o._viewDisplay.pushDisplay(moduleManager.display());
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogicModule_process = function FEaiCockpitLogicModule_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
   // 模块管理器处理
   var moduleManager = o._moduleManager;
   if(moduleManager){
      moduleManager.process();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogicModule_dispose = function FEaiCockpitLogicModule_dispose(){
   var o = this;
   // 释放属性
   o._moduleManager = MO.Lang.Obejct.dispose(o._moduleManager);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
