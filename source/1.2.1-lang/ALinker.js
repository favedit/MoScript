//==========================================================
// <T>关联描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 141231
//==========================================================
function ALinker(n, l){
   var o = this;
   //..........................................................
   // @declare
   o.inherit    = true;
   o.annotation = EAnnotation.Linker;
   //..........................................................
   // @attribute
   o.name       = n;
   o.linker     = l;
   return o;
}
