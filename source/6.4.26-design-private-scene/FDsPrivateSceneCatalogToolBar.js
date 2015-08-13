with(MO){
   //==========================================================
   // <T>共享场景目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateSceneCatalogToolBar = function FDsPrivateSceneCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsSceneCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.scene.CatalogToolBar';
      return o;
   }
}
