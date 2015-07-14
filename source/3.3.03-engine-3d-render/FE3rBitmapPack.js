//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rBitmapPack = function FE3rBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._image       = null;
   o._texture     = MO.Class.register(o, new AGetter('_texture'));
   // @attribute
   o._ready       = false;
   o._dataReady   = false;
   //..........................................................
   o.onLoad       = MO.Method.virtual(o, 'onLoad');
   //..........................................................
   // @method
   o.construct    = MO.FE3rBitmapPack_construct;
   // @method
   o.testReady    = MO.FE3rBitmapPack_testReady;
   o.loadUrl      = MO.Method.virtual(o, 'loadUrl');
   // @method
   o.dispose      = MO.FE3rBitmapPack_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rBitmapPack_construct = function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FE3rBitmapPack_testReady = function FE3rBitmapPack_testReady(){
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
MO.FE3rBitmapPack_dispose = function FE3rBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
