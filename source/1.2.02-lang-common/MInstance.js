//==========================================================
// <T>实例对象。</T>
// <P>可以被回收和重复使用的对象。</P>
//
// @face
// @author maocy
// @version 150116
//==========================================================
MO.MInstance = function MInstance(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.__free          = false;
   //..........................................................
   // @method
   o.instanceCreate  = MO.Method.empty;
   o.instanceAlloc   = MO.Method.empty;
   o.instanceFree    = MO.Method.empty;
   o.instanceRelease = MO.Method.empty;
   return o;
}
