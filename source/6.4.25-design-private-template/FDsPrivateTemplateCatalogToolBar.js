with(MO){
   //==========================================================
   // <T>私有模板目录工具栏。</T>
   //
   // @method
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsPrivateTemplateCatalogToolBar = function FDsPrivateTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
      //..........................................................
      // @property
      o._frameName = 'resource.private.template.CatalogToolBar';
      return o;
   }
}
