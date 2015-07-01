//==========================================================
// <T>画板对象。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FCanvas = function FCanvas(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._activeStage = MO.Class.register(o, new MO.AGetter('_activeStage'));
   //..........................................................
   // @method
   o.construct    = MO.FCanvas_construct;
   // @method
   o.dispose      = MO.FCanvas_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FCanvas_construct = function FCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FCanvas_dispose = function FCanvas_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
