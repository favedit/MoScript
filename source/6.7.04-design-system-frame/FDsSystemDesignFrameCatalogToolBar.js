with(MO){
   //==========================================================
   // <T>私有资源目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsSystemDesignFrameCatalogToolBar = function FDsSystemDesignFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsResourceCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'system.design.frame.CatalogToolBar';
      return o;
   }
}
