//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rTexture(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   // @attribute
   o._ready       = false;
   o._dataReady   = false;
   //..........................................................
   // @method
   o.construct    = FE3rTexture_construct;
   // @method
   o.resource     = FE3rTexture_resource;
   o.setResource  = FE3rTexture_setResource;
   o.bitmaps      = FE3rTexture_bitmaps;
   // @method
   o.testReady    = FE3rTexture_testReady;
   o.loadBitmap   = FE3rTexture_loadBitmap;
   o.loadResource = FE3rTexture_loadResource;
   o.load         = FE3rTexture_load;
   o.processLoad  = FE3rTexture_processLoad;
   // @method
   o.dispose      = FE3rTexture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new TDictionary();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sTexture 资源
//==========================================================
function FE3rTexture_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @method
// @param p:resource:FE3sTexture 资源
//==========================================================
function FE3rTexture_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>获得位图集合。</T>
//
// @return 位图集合
//==========================================================
function FE3rTexture_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3rTexture_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载位图。</T>
//
// @param p:guid:String 位图唯一编号
//==========================================================
function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = RClass.create(FE3rTextureBitmap);
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
function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         // 创建渲染位图打包
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = RClass.create(FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = RClass.create(FE3rTextureBitmapCubePack);
         }else{
            throw new TError(o, 'Load resource failure.');
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
function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   // 加载纹理
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.value(i);
      var b = o._bitmaps.get(rb.guid());
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new TError('Link pack is not eists.');
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
function FE3rTexture_processLoad(){
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
function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = RObject.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
