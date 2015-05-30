with(MO){
   //==========================================================
   // <T>私有模型目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsPrivateModelCatalogToolBar = function FDsPrivateModelCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsModelCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.model.CatalogToolBar';
      return o;
   }
}
