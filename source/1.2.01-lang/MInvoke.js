//==========================================================
// <T>调用接口。</T>
//
// @face
// @author maocy
// @version 150319
//==========================================================
function MInvoke(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.invoke = RMethod.virtual(o, 'invoke');
   return o;
}
