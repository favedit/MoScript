//==========================================================
// <T>资源数据。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.MResourceData = function MResourceData(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._ready          = false;
   o._guid           = null;
   o._index          = -1;
   o._compressData   = MO.Class.register(o, new MO.AGetSet('_compressData'));
   o._data           = null;
   //..........................................................
   // @method
   o.testReady       = MO.MResourceData_testReady;
   o.completeData    = MO.MResourceData_completeData;
   // @method
   o.dispose         = MO.MResourceData_dispose;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.MResourceData_testReady = function MResourceData_testReady(){
   return this._ready;
}

//==========================================================
// <T>数据完成处理。</T>
//
// @method
// @param data:ArrayBuffer 数据
//==========================================================
MO.MResourceData_completeData = function MResourceData_completeData(data){
   var o = this;
   o._data = data;
   o._ready = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MResourceData_dispose = function MResourceData_dispose(){
   var o = this;
   o._compressData = null;
   o._data = null;
}
