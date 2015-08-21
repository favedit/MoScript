//==========================================================
// <T>边框接口。</T>
//
// @face
// @author maocy
// @version 150610
//==========================================================
MO.MUiBorder = function MUiBorder(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._borderInner = MO.Class.register(o, [new MO.APtyBorder('_borderInner'), new MO.AGetter('_borderInner')]);
   o._borderOuter = MO.Class.register(o, [new MO.APtyBorder('_borderOuter'), new MO.AGetter('_borderOuter')]);
   //..........................................................
   // @method
   o.construct    = MO.MUiBorder_construct;
   // @method
   o.dispose      = MO.MUiBorder_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiBorder_construct = function MUiBorder_construct(){
   var o = this;
   o._borderInner = new MO.SBorder();
   o._borderOuter = new MO.SBorder();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiBorder_dispose = function MUiBorder_dispose(){
   var o = this;
   o._borderInner = MO.Lang.Object.dispose(o._borderInner);
   o._borderOuter = MO.Lang.Object.dispose(o._borderOuter);
}
