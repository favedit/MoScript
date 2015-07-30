//==========================================================
// <T>内存管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RMemory = function RMemory(){
   var o = MO.RSingleton.call(this);
   //..........................................................
   // @attribute
   o._entryUnused = null;;
   o._pools       = new Object();
   return o;
}

//============================================================
// <T>内部收集一个节点。</T>
//
// @return 节点
//============================================================
MO.RMemory.prototype.entryAlloc = function RMemory_entryAlloc(){
   var o = this;
   var entry = null;
   var unused = o._entryUnused;
   if(unused){
      entry = unused;
      o._entryUnused = unused.next;
   }else{
      entry = new MO.SMemoryPoolEntry();
   }
   return entry;
}

//============================================================
// <T>内部释放一个节点。</T>
//
// @param entry 节点
//============================================================
MO.RMemory.prototype.entryFree = function RMemory_entryFree(entry){
   var o = this;
   MO.Assert.debugNotNull(entry);
   entry.next = o._entryUnused;
   o._entryUnused = entry;
}

//==========================================================
// <T>收集一个类对象的实例。</T>
//
// @method
// @param clazz:Function 类函数
// @return Object 实例
//==========================================================
MO.RMemory.prototype.alloc = function RMemory_alloc(clazz){
   var o = this;
   // 获得类名
   MO.Assert.debugNotNull(clazz);
   var className = MO.Runtime.className(clazz);
   // 获得缓冲池
   var pools = o._pools;
   var pool = pools[className];
   if(!pool){
      pool = new MO.TMemoryPool();
      pool._constructor = clazz;
      pools[className] = pool;
   }
   // 创建对象
   var value = pool.alloc();
   return value;
}

//==========================================================
// <T>释放一个实例。</T>
//
// @method
// @param value:Object 实例
//==========================================================
MO.RMemory.prototype.free = function RMemory_free(value){
   MO.Assert.debugNotNull(value);
   var pool = value.__pool;
   MO.Assert.debugNotNull(pool);
   pool.free(value);
   // 释放资源
   if(value.free){
      value.free();
   }
}

//==========================================================
// <T>强制释放当前内存中所有对象实例。</T>
//
// @method
//==========================================================
MO.RMemory.prototype.refresh = function RMemory_refresh(){
   CollectGarbage();
}

//..........................................................
// 实例化内容
MO.Memory = new MO.RMemory();
