//==========================================================
// <T>资源存储。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FResourceStorage = function FResourceStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._ready      = false;
   o._dataLength = 0;
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   //..........................................................
   // @method
   o.construct   = MO.FResourceStorage_construct;
   // @method
   o.testReady   = MO.FResourceStorage_testReady;
   // @method
   o.load        = MO.FResourceStorage_load;
   o.complete    = MO.FResourceStorage_complete;
   // @method
   o.dispose     = MO.FResourceStorage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FResourceStorage_construct = function FResourceStorage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FResourceStorage_testReady = function FResourceStorage_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载事件完成后，响应的处理。</T>
//
// @method
// @param buffer:ArrayBuffer 数据
//==========================================================
MO.FResourceStorage_load = function FResourceStorage_load(buffer){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceStorage_complete = function FResourceStorage_complete(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceStorage_dispose = function FResourceStorage_dispose(){
   var o = this;
   // 清空属性
   o._resource = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
