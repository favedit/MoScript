with(MO){
   //==========================================================
   // <T>关联描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联名称
   // @author maocy
   // @version 141231
   //==========================================================
   MO.ALinker = function ALinker(name, linker){
      var o = this;
      //..........................................................
      // @declare
      o.inherit    = true;
      o.annotation = EAnnotation.Linker;
      //..........................................................
      // @attribute
      o.name       = name;
      o.linker     = linker;
      return o;
   }
}
