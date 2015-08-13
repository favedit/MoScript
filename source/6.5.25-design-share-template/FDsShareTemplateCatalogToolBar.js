with(MO){
   //==========================================================
   // <T>共享模板目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150420
   //==========================================================
   MO.FDsShareTemplateCatalogToolBar = function FDsShareTemplateCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.share.template.CatalogToolBar';
      return o;
   }
}
