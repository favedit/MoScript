//==========================================================
// <T>外空白接口。</T>
//
// @face
// @author maocy
// @version 150611
//==========================================================
MO.MUiMargin = function MUiMargin(o){
   o = MO.RClass.inherits(this, o);
   //..........................................................
   // @property 填充结构
   o._margin   = MO.RClass.register(o, [new MO.APtyPadding('_margin'), new MO.AGetter('_margin')]);
   //..........................................................
   // @method
   o.construct = MO.MUiMargin_construct;
   // @method
   o.setMargin = MO.MUiMargin_setMargin;
   // @method
   o.dispose   = MO.MUiMargin_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiMargin_construct = function MUiMargin_construct(){
   var o = this;
   o._margin = new MO.SPadding();
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
MO.MUiMargin_setMargin = function MUiMargin_setMargin(left, top, right, bottom){
   this._margin.set(left, top, right, bottom);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiMargin_dispose = function MUiMargin_dispose(){
   var o = this;
   // 释放属性
   o._margin = MO.Lang.Object.dispose(o._margin);
}
