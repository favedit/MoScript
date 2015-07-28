//==========================================================
// <T>资源模块。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEaiResourceModule = function FEaiResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code     = MO.Class.register(o, new MO.AGetSet('_code'));
   //..........................................................
   // @method
   o.construct = MO.FEaiResourceModule_construct;
   // @method
   o.dispose   = MO.FEaiResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiResourceModule_construct = function FEaiResourceModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiResourceModule_dispose = function FEaiResourceModule_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
