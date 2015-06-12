//==========================================================
// <T>外空白接口。</T>
//
// @face
// @author maocy
// @version 150611
//==========================================================
MO.MGuiMargin = function MGuiMargin(o){
   o = MO.RClass.inherits(this, o);
   //..........................................................
   // @property 填充结构
   o._margin   = MO.RClass.register(o, [new MO.APtyPadding('_margin'), new MO.AGetter('_margin')]);
   //..........................................................
   // @method
   o.construct = MO.MGuiMargin_construct;
   // @method
   o.setMargin = MO.MGuiMargin_setMargin;
   // @method
   o.dispose   = MO.MGuiMargin_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MGuiMargin_construct = function MGuiMargin_construct(){
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
MO.MGuiMargin_setMargin = function MGuiMargin_setMargin(left, top, right, bottom){
   this._margin.set(left, top, right, bottom);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MGuiMargin_dispose = function MGuiMargin_dispose(){
   var o = this;
   // 释放属性
   o._margin = MO.RObject.dispose(o._margin);
}
