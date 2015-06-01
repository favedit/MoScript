with(MO){
    //==========================================================
   // <T>材质。</T>
   //
   // @class
   // @author maocy
   // @history 150417
   //==========================================================
   MO.FE3rMaterial = function FE3rMaterial(o){
      o = RClass.inherits(this, o, FG3dMaterial, MAttributeGuid, MGraphicObject, MLinkerResource);
      //..........................................................
      // @method
      o._ready         = false;
      o._visible       = true;
      // @method
      o._bitmaps       = null;
      // @attribute 材质引用
      o._reference     = null;
     //..........................................................
      // @method
      o.visible        = FE3rMaterial_visible;
      o.setVisible     = FE3rMaterial_setVisible;
      o.findBitmap     = FE3rMaterial_findBitmap;
      o.bitmaps        = FE3rMaterial_bitmaps;
      o.reference      = FE3rMaterial_reference;
      // @method
      o.testReady      = FE3rMaterial_testReady;
      o.testVisible    = FE3rMaterial_testVisible;
      // @method
      o.loadResource   = FE3rMaterial_loadResource;
      o.reloadResource = FE3rMaterial_reloadResource;
      // @method
      o.load           = FE3rMaterial_load;
      return o;
   }

   //==========================================================
   // <T>获得可见性。</T>
   //
   // @method
   // @return Boolean 可见性
   //==========================================================
   MO.FE3rMaterial_visible = function FE3rMaterial_visible(){
      return this._visible;
   }

   //==========================================================
   // <T>设置可见性。</T>
   //
   // @method
   // @param visible:Boolean 可见性
   //==========================================================
   MO.FE3rMaterial_setVisible = function FE3rMaterial_setVisible(visible){
      this._visible = visible;
   }

   //==========================================================
   // <T>根据代码查找位图。</T>
   //
   // @method
   // @param code:String 代码
   // @return FE3rBitmap 位图
   //==========================================================
   MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
      return this._bitmaps.get(code);
   }

   //==========================================================
   // <T>获得位图集合。</T>
   //
   // @method
   // @param TDictionary 位图集合
   //==========================================================
   MO.FE3rMaterial_bitmaps = function FE3rMaterial_bitmaps(){
      return this._bitmaps;
   }

   //==========================================================
   // <T>获得材质引用。</T>
   //
   // @method
   // @return FE3rMaterial 材质引用
   //==========================================================
   MO.FE3rMaterial_reference = function FE3rMaterial_reference(){
      return this._reference;
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   MO.FE3rMaterial_testReady = function FE3rMaterial_testReady(){
      var o = this;
      if(!o._ready){
         var bitmaps = o._bitmaps;
         if(bitmaps){
            var count = bitmaps.count();
            for(var i = 0; i < count; i++){
               var bitmap = bitmaps.at(i);
               if(!bitmap.testReady()){
                  return false;
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }

   //==========================================================
   // <T>测试可见性。</T>
   //
   // @method
   // @return Boolean 可见性
   //==========================================================
   MO.FE3rMaterial_testVisible = function FE3rMaterial_testVisible(){
      var o = this;
      var visible = o._visible;
      if(visible && o._reference){
         visible = o._reference.testVisible();
      }
      return visible;
   }

   //==========================================================
   // <T>加载材质资源。</T>
   //
   // @method
   // @param resource:FE3sMaterial 材质资源
   //==========================================================
   MO.FE3rMaterial_loadResource = function FE3rMaterial_loadResource(resource){
      var o = this;
      o._guid = resource.guid();
      o._resource = resource;
      o._info.calculate(resource.info());
      o._dirty = true;
   }

   //==========================================================
   // <T>重新加载数据。</T>
   //
   // @method
   //==========================================================
   MO.FE3rMaterial_reloadResource = function FE3rMaterial_reloadResource(){
      var o = this;
      o._info.calculate(o._resource.info());
      o._dirty = true;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rMaterial_load= function FE3rMaterial_load(){
      var o = this;
      var resource = o._resource;
      // 加载位图
      var bitmapResources = resource.bitmaps();
      if(bitmapResources){
         var bitmapConsole = RConsole.find(FE3rBitmapConsole)
         var bitmaps = o._bitmaps = new TDictionary();
         var count = bitmapResources.count();
         for(var i = 0; i < count; i++){
            // 获得位图资源
            var bitmapResource = bitmapResources.at(i);
            var bitmapCode = bitmapResource.code();
            // 获得打包资源
            var bitmapPackResource = bitmapResource.bitmapPack();
            var packCode = bitmapPackResource.code();
            var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
            // 创建位图
            var bitmap = RClass.create(FE3rBitmap);
            bitmap._pack  = bitmapPack;
            bitmap.loadResource(bitmapResource);
            bitmaps.set(bitmapCode, bitmap);
         }
      }
   }
}
