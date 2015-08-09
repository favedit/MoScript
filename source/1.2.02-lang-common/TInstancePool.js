﻿//==========================================================
// <T>实例缓冲池。</T>
//
// @tool
// @author maocy
// @version 150116
//==========================================================
MO.TInstancePool = function TInstancePool(){
   var o = this;
   MO.TObjects.call(o);
   //..........................................................
   // @attribute
   o._instance = null;
   //..........................................................
   // @method
   o.instance  = MO.TInstancePool_instance;
   o.alloc     = MO.TInstancePool_alloc;
   o.free      = MO.TInstancePool_free;
   return o;
}

//==========================================================
// <T>获得唯一实例。</T>
//
// @method
// @return Object 实例
//==========================================================
MO.TInstancePool_instance = function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = MO.Class.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}


//==========================================================
// <T>收集一个实例。</T>
//
// @method
// @param p:class:Object 类对象
// @return Object 实例
//==========================================================
MO.TInstancePool_alloc = function TInstancePool_alloc(p){
   var o = this;
   var r = null;
   if(o._count == 0){
      r = MO.Class.create(p);
      r.instanceCreate();
   }else{
      r = o.pop();
   }
   r.instanceAlloc();
   return r;
}

//==========================================================
// <T>释放一个实例。</T>
//
// @method
// @param p:class:Object 类对象
//==========================================================
MO.TInstancePool_free = function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
