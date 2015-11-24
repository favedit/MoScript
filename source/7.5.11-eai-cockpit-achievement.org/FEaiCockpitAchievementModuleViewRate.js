//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementModulViewRate = function FEaiCockpitAchievementModulViewRate(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'achievement.rate';
   o._typeCd       = MO.EEaiCockpitModule.Logic;
   o._dataTicker   = null;
   o._slideshow    = true;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitAchievementModulViewRate_construct;
   // @method
   o.setup         = MO.FEaiCockpitAchievementModulViewRate_setup;
   // @method
   o.processResize = MO.FEaiCockpitAchievementModulViewRate_processResize;
   o.process       = MO.FEaiCockpitAchievementModulViewRate_process;
   // @method
   o.dispose       = MO.FEaiCockpitAchievementModulViewRate_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulViewRate_construct = function FEaiCockpitAchievementModulViewRate_construct(){
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
MO.FEaiCockpitAchievementModulViewRate_setup = function FEaiCockpitAchievementModulViewRate_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitAchievementModuleViewRateSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setParentModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitAchievementModulViewRateView);
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
MO.FEaiCockpitAchievementModulViewRate_processResize = function FEaiCockpitAchievementModulViewRate_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitAchievementModulViewRate_process = function FEaiCockpitAchievementModulViewRate_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulViewRate_dispose = function FEaiCockpitAchievementModulViewRate_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
