//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rBitmap = function FE3rBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   //..........................................................
   // @attribute
   o._pack        = null;
   //..........................................................
   // @method
   o.construct    = MO.FE3rBitmap_construct;
   // @method
   o.testReady    = MO.FE3rBitmap_testReady;
   // @method
   // @method
   o.texture      = MO.FE3rBitmap_texture;
   o.loadResource = MO.FE3rBitmap_loadResource;
   // @method
   o.dispose      = MO.FE3rBitmap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rBitmap_construct = function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FE3rBitmap_testReady = function FE3rBitmap_testReady(){
   return this._pack.testReady();
}

//==========================================================
// <T>获得纹理。</T>
//
// @method
// @return 纹理
//==========================================================
MO.FE3rBitmap_texture = function FE3rBitmap_texture(){
   return this._pack.texture();
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
MO.FE3rBitmap_loadResource = function FE3rBitmap_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._guid = resource.guid();
   o._code = resource.code();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rBitmap_dispose = function FE3rBitmap_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3rObject.dispose.call(o);
}
