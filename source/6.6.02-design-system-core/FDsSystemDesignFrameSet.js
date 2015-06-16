with(MO){
   //==========================================================
   // <T>系统设计框架。</T>
   //
   // @class
   // @author maocy
   // @history 150516
   //==========================================================
   MO.FDsSystemDesignFrameSet = function FDsSystemDesignFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      //..........................................................
      // @style
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleSpaceContent    = RClass.register(o, new AStyle('_styleSpaceContent', 'Space_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      //..........................................................
      // @attribute
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSpace           = null;
      o._frameSpaceToolbar    = null;
      o._frameSpaceContent    = null;
      o._frameProperty        = null;
      o._framePropertyToolbar = null;
      o._framePropertyContent = null;
      //..........................................................
      // @method
      o.construct             = FDsSystemDesignFrameSet_construct;
      // @method
      o.dispose               = FDsSystemDesignFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemDesignFrameSet_construct = function FDsSystemDesignFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemDesignFrameSet_dispose = function FDsSystemDesignFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
