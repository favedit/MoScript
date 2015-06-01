with(MO){
   //==========================================================
   // <T>共享场景目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsShareSceneCatalogToolBar = function FDsShareSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsSceneCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.scene.CatalogToolBar';
      return o;
   }
}
