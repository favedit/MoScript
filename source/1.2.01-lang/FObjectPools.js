//==========================================================
// <T>对象池集合。</T>
//
// @class
// @author maocy
// @version 150411
//==========================================================
MO.FObjectPools = function FObjectPools(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._pools    = null;
   //..........................................................
   // @method
   o.construct = MO.FObjectPools_construct;
   // @method
   o.pool      = MO.FObjectPools_pool;
   o.alloc     = MO.FObjectPools_alloc;
   o.free      = MO.FObjectPools_free;
   // @method
   o.dispose   = MO.FObjectPools_dispose;
   return o;
}

//==========================================================
// <T>构建当前对象的实例。</T>
//
// @method
//==========================================================
MO.FObjectPools_construct = function FObjectPools_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._pools = new MO.TDictionary();
}

//==========================================================
// <T>获得一个对象池。</T>
//
// @method
// @param code:String 代码
// @return FObjectPool 对象池
//==========================================================
MO.FObjectPools_pool = function FObjectPools_pool(code){
   var o = this;
   var pool = o._pools.get(code);
   if(!pool){
      pool = MO.Class.create(MO.FObjectPool);
      o._pools.set(code, pool);
   }
   return pool;
}

//==========================================================
// <T>收集一个自由对象。</T>
//
// @method
// @param code:String 代码
// @return FObject 对象
//==========================================================
MO.FObjectPools_alloc = function FObjectPools_alloc(code){
   var o = this;
   var pool = o.pool(code);
   return pool.alloc();
}

//==========================================================
// <T>释放 一个自由对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
MO.FObjectPools_free = function FObjectPools_free(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.free(instance);
}

//==========================================================
// <T>增加一个对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
MO.FObjectPools_push = function FObjectPools_push(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.push(instance);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.FObjectPools_dispose = function FObjectPools_dispose(){
   var o = this;
   // 释放缓冲池集合
   var pools = o._pools;
   var count = pools.count();
   for(var i = 0; i < count; i++){
      var pool = pools.at(i);
      pool.dispose();
   }
   pools.dispose();
   // 父处理
   o.__base.FObject.dispose.call(o);
}
