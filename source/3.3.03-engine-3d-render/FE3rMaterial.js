with(MO){
    //==========================================================
   // <T>材质。</T>
   //
   // @class
   // @author maocy
   // @history 150417
   //==========================================================
   MO.FE3rMaterial = function FE3rMaterial(o){
      o = RClass.inherits(this, o, FG3dMaterial, MGraphicObject, MLinkerResource);
      //..........................................................
      // @method
      o._ready         = false;
      o._visible       = RClass.register(o, new AGetSet('_visible'), true);
      o._guid          = RClass.register(o, new AGetSet('_guid'));
      // @method
      o._bitmaps       = RClass.register(o, new AGetter('_bitmaps'));
      // @attribute 材质引用
      o._reference     = RClass.register(o, new AGetter('_reference'));
     //..........................................................
      // @method
      o.findBitmap     = FE3rMaterial_findBitmap;
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
