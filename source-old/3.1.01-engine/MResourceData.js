//==========================================================
// <T>资源数据。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
function MResourceData(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._ready          = false;
   o._guid           = null;
   o._index          = -1;
   o._compressData   = null;
   o._data           = null;
   //..........................................................
   // @method
   o.compressData    = MResourceData_compressData;
   o.setCompressData = MResourceData_setCompressData;
   // @method
   o.testReady       = MResourceData_testReady;
   o.completeData    = MResourceData_completeData;
   // @method
   o.dispose         = MResourceData_dispose;
   return o;
}

//==========================================================
// <T>获得压缩数据。</T>
//
// @method
// @return ArrayBuffer 压缩数据
//==========================================================
function MResourceData_compressData(){
   return this._compressData;
}

//==========================================================
// <T>设置压缩数据。</T>
//
// @method
// @param data:ArrayBuffer 压缩数据
//==========================================================
function MResourceData_setCompressData(data){
   this._compressData = data;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
function MResourceData_testReady(){
   return this._ready;
}

//==========================================================
// <T>数据完成处理。</T>
//
// @method
// @param data:ArrayBuffer 数据
//==========================================================
function MResourceData_completeData(data){
   var o = this;
   o._data = data;
   o._ready = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MResourceData_dispose(){
   var o = this;
   o._compressData = null;
   o._data = null;
}
