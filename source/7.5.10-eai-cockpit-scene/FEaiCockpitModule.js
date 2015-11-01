//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModule = function FEaiCockpitModule(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.construct = MO.FEaiCockpitModule_construct;
   // @method
   o.setup     = MO.FEaiCockpitModule_setup;
   // @method
   o.process   = MO.FEaiCockpitModule_process;
   // @method
   o.dispose   = MO.FEaiCockpitModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_construct = function FEaiCockpitModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_setup = function FEaiCockpitModule_setup(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModule_process = function FEaiCockpitModule_process(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_dispose = function FEaiCockpitModule_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
