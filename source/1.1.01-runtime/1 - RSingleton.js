//==========================================================
// <T>单件。</T>
//
// @reference
// @author maocy
// @version 150603
//==========================================================
MO.RSingleton = function RSingleton(){
   var o = this;
   //..........................................................
   // @attribute
   o._singleton = true;
   return o;
}
