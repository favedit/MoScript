with(MO){
   //==========================================================
   // <T>共享模型目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsShareModelCatalogToolBar = function FDsShareModelCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsModelCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.model.CatalogToolBar';
      return o;
   }
}
