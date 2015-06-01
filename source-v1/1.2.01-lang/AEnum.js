//==========================================================
// <T>枚举v描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 141231
//==========================================================
function AEnum(n, l){
   var o = this;
   //..........................................................
   // @declare
   o.inherit    = true;
   o.annotation = EAnnotation.Enum;
   //..........................................................
   // @attribute
   o.name       = n;
   o.linker     = l;
   return o;
}
