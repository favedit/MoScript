//==========================================================
// <T>资源存储。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FResourceSingleStorage = function FResourceSingleStorage(o){
   o = MO.Class.inherits(this, o, MO.FResourceStorage, MO.MResourceData);
   //..........................................................
   // @method
   o.construct   = MO.FResourceSingleStorage_construct;
   // @method
   o.load        = MO.FResourceSingleStorage_load;
   o.complete    = MO.FResourceSingleStorage_complete;
   // @method
   o.dispose     = MO.FResourceSingleStorage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FResourceSingleStorage_construct = function FResourceSingleStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param buffer:ArrayBuffer 数据
//==========================================================
MO.FResourceSingleStorage_load = function FResourceSingleStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   o._compressData = new Uint8Array(buffer);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceSingleStorage_complete = function FResourceSingleStorage_complete(){
   var o = this;
   var resource = o._resource;
   resource.onComplete(o._data);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceSingleStorage_dispose = function FResourceSingleStorage_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FResourceStorage.dispose.call(o);
}
