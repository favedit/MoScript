//==========================================================
// <T>调用接口。</T>
//
// @face
// @author maocy
// @version 150319
//==========================================================
MO.MInvoke = function MInvoke(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.invoke = MO.Method.virtual(o, 'invoke');
   return o;
}
