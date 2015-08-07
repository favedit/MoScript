with(MO){
   MO.FDsSystemDesignFrameSet = function FDsSystemDesignFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleSpaceContent    = RClass.register(o, new AStyle('_styleSpaceContent', 'Space_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSpace           = null;
      o._frameSpaceToolbar    = null;
      o._frameSpaceContent    = null;
      o._frameProperty        = null;
      o._framePropertyToolbar = null;
      o._framePropertyContent = null;
      o.construct             = FDsSystemDesignFrameSet_construct;
      o.dispose               = FDsSystemDesignFrameSet_dispose;
      return o;
   }
   MO.FDsSystemDesignFrameSet_construct = function FDsSystemDesignFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsSystemDesignFrameSet_dispose = function FDsSystemDesignFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
