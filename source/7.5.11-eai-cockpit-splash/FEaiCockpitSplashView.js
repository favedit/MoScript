//==========================================================
// <T>启动模块视图。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitSplashView = function FEaiCockpitSplashView(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._name          = 'cockpit.splash.view';
   // o._backgroundUri = '{eai.resource}/cockpit/splash/view.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitSplashView_onPaintBegin;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitSplashView_construct;
   // @method
   o.setup          = MO.FEaiCockpitSplashView_setup;
   o.processLogic   = MO.FEaiCockpitSplashView_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitSplashView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashView_onPaintBegin = function FEaiCockpitSplashView_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashView_construct = function FEaiCockpitSplashView_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 8);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashView_setup = function FEaiCockpitSplashView_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashView_processLogic = function FEaiCockpitSplashView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplashView_dispose = function FEaiCockpitSplashView_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
