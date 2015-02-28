//==========================================================
// <T>实例对象。</T>
// <P>可以被回收和重复使用的对象。</P>
//
// @face
// @author maocy
// @version 150116
//==========================================================
function MInstance(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.__free          = false;
   //..........................................................
   // @method
   o.instanceCreate  = RMethod.empty;
   o.instanceAlloc   = RMethod.empty;
   o.instanceFree    = RMethod.empty;
   o.instanceRelease = RMethod.empty;
   return o;
}
