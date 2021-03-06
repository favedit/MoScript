﻿//==========================================================
// <T>对象池集合。</T>
//
// @class
// @author maocy
// @version 150411
//==========================================================
function FObjectPools(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._pools    = null;
   //..........................................................
   // @method
   o.construct = FObjectPools_construct;
   // @method
   o.pool      = FObjectPools_pool;
   o.alloc     = FObjectPools_alloc;
   o.free      = FObjectPools_free;
   // @method
   o.dispose   = FObjectPools_dispose;
   return o;
}

//==========================================================
// <T>构建当前对象的实例。</T>
//
// @method
//==========================================================
function FObjectPools_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._pools = new TDictionary();
}

//==========================================================
// <T>获得一个对象池。</T>
//
// @method
// @param code:String 代码
// @return FObjectPool 对象池
//==========================================================
function FObjectPools_pool(code){
   var o = this;
   var pool = o._pools.get(code);
   if(!pool){
      pool = RClass.create(FObjectPool);
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
function FObjectPools_alloc(code){
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
function FObjectPools_free(code, instance){
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
function FObjectPools_push(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.push(instance);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function FObjectPools_dispose(){
   var o = this;
   // 释放缓冲池集合
   var pools = o._pools;
   var count = pools.count();
   for(var i = 0; i < count; i++){
      var pool = pools.valueAt(i);
      pool.dispose();
   }
   pools.dispose();
   // 父处理
   o.__base.FObject.dispose.call(o);
}
