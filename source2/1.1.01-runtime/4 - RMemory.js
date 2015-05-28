with(MO){
   //==========================================================
   // <T>内存管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.RMemory = function RMemory(){
      var o = this;
      //..........................................................
      // @attribute
      o._entryUnused = null;;
      o._pools       = new Object();
      //..........................................................
      // @method
      o.entryAlloc   = RMemory_entryAlloc;
      o.entryFree    = RMemory_entryFree;
      // @method
      o.alloc        = RMemory_alloc;
      o.free         = RMemory_free;
      o.refresh      = RMemory_refresh;
      return o;
   }

   //============================================================
   // <T>内部收集一个节点。</T>
   //
   // @return 节点
   //============================================================
   MO.RMemory_entryAlloc = function RMemory_entryAlloc(){
      var entry = null;
      var unused = this._entryUnused;
      if(unused){
         entry = unused;
         this._entryUnused = unused.next;
      }else{
         entry = new SMemoryPoolEntry();
      }
      return entry;
   }

   //============================================================
   // <T>内部释放一个节点。</T>
   //
   // @param entry 节点
   //============================================================
   MO.RMemory_entryFree = function RMemory_entryFree(entry){
      RAssert.debugNotNull(entry);
      entry.next = this._entryUnused;
      this._entryUnused = entry;
   }

   //==========================================================
   // <T>收集一个类对象的实例。</T>
   //
   // @method
   // @param clazz:Function 类函数
   // @return Object 实例
   //==========================================================
   MO.RMemory_alloc = function RMemory_alloc(clazz){
      // 获得类名
      RAssert.debugNotNull(clazz);
      var className = RRuntime.className(clazz);
      // 获得缓冲池
      var pools = this._pools;
      var pool = pools[className];
      if(!pool){
         pool = new TMemoryPool();
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
   MO.RMemory_free = function RMemory_free(value){
      RAssert.debugNotNull(value);
      var pool = value.__pool;
      RAssert.debugNotNull(pool);
      pool.free(value);
   }

   //==========================================================
   // <T>强制释放当前内存中所有对象实例。</T>
   //
   // @method
   //==========================================================
   MO.RMemory_refresh = function RMemory_refresh(){
      CollectGarbage();
   }
   //..........................................................
   // 实例化内容
   MO.Memory = new RMemory();
}
