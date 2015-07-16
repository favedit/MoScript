//==========================================================
// <T>边框接口。</T>
//
// @face
// @author maocy
// @version 150610
//==========================================================
MO.MGuiBorder = function MGuiBorder(o){
   o = MO.RClass.inherits(this, o);
   //..........................................................
   // @property
   o._borderInner = MO.RClass.register(o, [new MO.APtyBorder('_borderInner'), new MO.AGetter('_borderInner')]);
   o._borderOuter = MO.RClass.register(o, [new MO.APtyBorder('_borderOuter'), new MO.AGetter('_borderOuter')]);
   //..........................................................
   // @method
   o.construct   = MO.MGuiBorder_construct;
   // @method
   o.dispose     = MO.MGuiBorder_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MGuiBorder_construct = function MGuiBorder_construct(){
   var o = this;
   o._borderInner = new MO.SBorder();
   o._borderOuter = new MO.SBorder();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MGuiBorder_dispose = function MGuiBorder_dispose(){
   var o = this;
   o._borderInner = MO.Lang.Object.dispose(o._borderInner);
   o._borderOuter = MO.Lang.Object.dispose(o._borderOuter);
}
