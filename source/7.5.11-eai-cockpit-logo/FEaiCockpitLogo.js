//==========================================================
// <T>标志模块。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitLogo = function FEaiCockpitLogo(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name     = 'logo';
   o._typeCd   = MO.EEaiCockpitModule.Logic;
   //..........................................................
   // @method
   o.construct = MO.FEaiCockpitLogo_construct;
   // @method
   o.setup     = MO.FEaiCockpitLogo_setup;
   // @method
   o.process   = MO.FEaiCockpitLogo_process;
   // @method
   o.dispose   = MO.FEaiCockpitLogo_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogo_construct = function FEaiCockpitLogo_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogo_setup = function FEaiCockpitLogo_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitLogoSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitLogoView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitLogo_process = function FEaiCockpitLogo_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogo_dispose = function FEaiCockpitLogo_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
