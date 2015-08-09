//==========================================================
// <T>枚举v描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @author maocy
// @version 141231
//==========================================================
MO.AEnum = function AEnum(name, linker){
   var o = this;
   //..........................................................
   // @declare
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Enum;
   //..........................................................
   // @attribute
   o.name       = name;
   o.linker     = linker;
   return o;
}
