//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModuleAchievement = function FEaiCockpitModuleAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'achievement';
   o._typeCd       = MO.EEaiCockpitModule.Logic;
   o._slideshow    = true;
   o._dataTicker   = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitModuleAchievement_construct;
   // @method
   o.setup         = MO.FEaiCockpitModuleAchievement_setup;
   // @method
   o.processResize = MO.FEaiCockpitModuleAchievement_processResize;
   o.process       = MO.FEaiCockpitModuleAchievement_process;
   // @method
   o.dispose       = MO.FEaiCockpitModuleAchievement_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievement_construct = function FEaiCockpitModuleAchievement_construct(){
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
MO.FEaiCockpitModuleAchievement_setup = function FEaiCockpitModuleAchievement_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitModuleAchievementSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setParentModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitModuleAchievementView);
   view.linkGraphicContext(o);
   view.setParentModule(o);
   view.setup();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleAchievement_showSnapshot = function FEaiCockpitModuleAchievement_showSnapshot(layer){
   var o = this;
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleAchievement_processResize = function FEaiCockpitModuleAchievement_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleAchievement_process = function FEaiCockpitModuleAchievement_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievement_dispose = function FEaiCockpitModuleAchievement_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
