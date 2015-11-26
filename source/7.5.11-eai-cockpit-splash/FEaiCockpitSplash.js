//==========================================================
// <T>启动模块。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitSplash = function FEaiCockpitSplash(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name     = 'splash';
   o._typeCd   = MO.EEaiCockpitModule.Logo;
   //..........................................................
   // @method
   o.construct = MO.FEaiCockpitSplash_construct;
   // @method
   o.setup     = MO.FEaiCockpitSplash_setup;
   // @method
   o.process   = MO.FEaiCockpitSplash_process;
   // @method
   o.dispose   = MO.FEaiCockpitSplash_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplash_construct = function FEaiCockpitSplash_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplash_setup = function FEaiCockpitSplash_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitSplashSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitSplashView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitSplash_process = function FEaiCockpitSplash_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSplash_dispose = function FEaiCockpitSplash_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
