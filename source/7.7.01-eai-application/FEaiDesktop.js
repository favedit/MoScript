//==========================================================
// <T>桌面。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FEaiDesktop = function FEaiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   //..........................................................
   // @method
   o.construct = MO.FEaiDesktop_construct;
   // @method
   o.dispose   = MO.FEaiDesktop_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiDesktop_construct = function FEaiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
   o._screenSize.set(0, 0);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiDesktop_dispose = function FEaiDesktop_dispose(){
   var o = this;
   // 父处理
   o.__base.FDesktop.dispose.call(o);
}
