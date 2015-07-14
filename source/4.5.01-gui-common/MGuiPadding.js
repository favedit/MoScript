//==========================================================
// <T>填充接口。</T>
//
// @face
// @author maocy
// @version 150611
//==========================================================
MO.MGuiPadding = function MGuiPadding(o){
   o = MO.RClass.inherits(this, o);
   //..........................................................
   // @property 填充结构
   o._padding   = MO.RClass.register(o, [new MO.APtyPadding('_padding'), new MO.AGetter('_padding')]);
   //..........................................................
   // @method
   o.construct  = MO.MGuiPadding_construct;
   // @method
   o.setPadding = MO.MGuiPadding_setPadding;
   // @method
   o.dispose    = MO.MGuiPadding_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MGuiPadding_construct = function MGuiPadding_construct(){
   var o = this;
   o._padding = new MO.SPadding();
}

//==========================================================
// <T>设置填充空白。</T>
//
// @method
// @param left:Integer 左空白
// @param top:Integer 上空白
// @param right:Integer 右空白
// @param bottom:Integer 下空白
//==========================================================
MO.MGuiPadding_setPadding = function MGuiPadding_setPadding(left, top, right, bottom){
   this._padding.set(left, top, right, bottom);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MGuiPadding_dispose = function MGuiPadding_dispose(){
   var o = this;
   // 释放属性
   o._padding = MO.RObject.dispose(o._padding);
}
