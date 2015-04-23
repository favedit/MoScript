//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   // @attribute
   o._ready       = false;
   o._dataReady   = false;
   //..........................................................
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   //..........................................................
   // @method
   o.construct    = FE3rBitmapPack_construct;
   // @method
   o.texture      = FE3rBitmapPack_texture;
   // @method
   o.testReady    = FE3rBitmapPack_testReady;
   o.loadUrl      = RMethod.virtual(o, 'loadUrl');
   // @method
   o.dispose      = FE3rBitmapPack_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>获得纹理。</T>
//
// @method
// @return 纹理
//==========================================================
function FE3rBitmapPack_texture(){
   return this._texture;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
function FE3rBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
