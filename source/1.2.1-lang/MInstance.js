//==========================================================
// <T>实例对象。</T>
// <P>可以被回收和重复使用的对象。</P>
//
// @face
// @author maocy
// @version 150116
//==========================================================
MO.MInstance = function MInstance(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.__free          = false;
   //..........................................................
   // @method
   o.instanceCreate  = MO.RMethod.empty;
   o.instanceAlloc   = MO.RMethod.empty;
   o.instanceFree    = MO.RMethod.empty;
   o.instanceRelease = MO.RMethod.empty;
   return o;
}
