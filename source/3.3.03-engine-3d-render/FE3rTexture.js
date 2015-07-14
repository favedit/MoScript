//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rTexture = function FE3rTexture(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._resource    = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   // @attribute
   o._ready       = false;
   o._dataReady   = false;
   //..........................................................
   // @method
   o.construct    = MO.FE3rTexture_construct;
   // @method
   o.testReady    = MO.FE3rTexture_testReady;
   o.loadBitmap   = MO.FE3rTexture_loadBitmap;
   o.loadResource = MO.FE3rTexture_loadResource;
   o.load         = MO.FE3rTexture_load;
   o.processLoad  = MO.FE3rTexture_processLoad;
   // @method
   o.dispose      = MO.FE3rTexture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rTexture_construct = function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3rTexture_testReady = function FE3rTexture_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载位图。</T>
//
// @param p:guid:String 位图唯一编号
//==========================================================
MO.FE3rTexture_loadBitmap = function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = MO.Class.create(MO.FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sModel 模型资源
//==========================================================
MO.FE3rTexture_loadResource = function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new MO.TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         // 创建渲染位图打包
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = MO.Class.create(MO.FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = MO.Class.create(MO.FE3rTextureBitmapCubePack);
         }else{
            throw new MO.TError(o, 'Load resource failure.');
         }
         bp.linkGraphicContext(o);
         bp.loadResource(rbp);
         o._bitmapPacks.set(rbp.code(), bp);
      }
   }
   // 加载完成
   o._dataReady = true;
}

//==========================================================
// <T>加载数据。</T>
//
// @method
//==========================================================
MO.FE3rTexture_load = function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   // 加载纹理
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.valueAt(i);
      var b = o.loadBitmap(rb.guid());
      // 关联纹理和位图包
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new MO.TError('Link pack is not eists.');
      }
      b.load(bp);
   }
   // 加载完成
   o._ready = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3rTexture_processLoad = function FE3rTexture_processLoad(){
   var o = this;
   // 检查是否已加载
   if(!o._dataReady){
      // 检查资源是否准备好
      if(!o._resource.testReady()){
         return false;
      }
      // 加载资源
      o.loadResource(o._resource);
   }else{
      // 测试所有位图加载完成
      var s = o._bitmapPacks;
      for(var i = s.count() - 1; i >= 0; i--){
         var b = s.valueAt(i);
         if(!b.testReady()){
            return false;
         }
      }
      // 加载完成
      o.load();
   }
   return o._ready;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rTexture_dispose = function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = MO.Lang.Object.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
