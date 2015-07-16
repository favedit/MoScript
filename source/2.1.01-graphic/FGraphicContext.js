//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas   = MO.Class.register(o, new MO.AGetter('_hCanvas', 'htmlCanvas'));
   //..........................................................
   // @method
   o.construct  = MO.FGraphicContext_construct;
   // @method
   o.linkCanvas = MO.Method.virtual(o, 'linkCanvas');
   // @method
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGraphicContext_construct = function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2(1280, 720);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   // 释放属性
   o._size = MO.Lang.Object.dispose(o._size);
   o._hCanvas = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
