with(MO){
   //==========================================================
   // <T>私有资源目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateResourceCatalogToolBar = function FDsPrivateResourceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsResourceCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.resource.CatalogToolBar';
      return o;
   }
}
