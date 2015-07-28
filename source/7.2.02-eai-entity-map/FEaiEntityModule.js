//==========================================================
// <T>实体模块。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEaiEntityModule = function FEaiEntityModule(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @method
   o.construct = MO.FEaiEntityModule_construct;
   // @method
   o.dispose   = MO.FEaiEntityModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityModule_construct = function FEaiEntityModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityModule_dispose = function FEaiEntityModule_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
