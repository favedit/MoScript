//==========================================================
// <T>启动模块预览。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitSplashSnapshot = function FEaiCockpitSplashSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._name          = 'cockpit.splash.snapshot';
   o._backgroundUri = '{eai.resource}/cockpit/splash/ground.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitSplashSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitSplashSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitSplashSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitSplashSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitSplashSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashSnapshot_onPaintBegin = function FEaiCockpitSplashSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashSnapshot_construct = function FEaiCockpitSplashSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashSnapshot_setup = function FEaiCockpitSplashSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashSnapshot_processLogic = function FEaiCockpitSplashSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashSnapshot_dispose = function FEaiCockpitSplashSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
