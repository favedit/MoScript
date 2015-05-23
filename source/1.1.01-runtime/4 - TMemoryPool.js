//==========================================================
// <T>内存对象池。</T>
//
// @tool
// @author maocy
// @version 150523
//==========================================================
function TMemoryPool(){
   var o = this;
   //..........................................................
   // @attribute
   o._constructor = null;
   o._unused      = null;
   // @attribute
   o._createCount = 0;
   o._allocCount  = 0;
   o._freeCount   = 0;
   //..........................................................
   // @method
   o.alloc        = TMemoryPool_alloc;
   o.free         = TMemoryPool_free;
   // @method
   o.dispose      = TMemoryPool_dispose;
   o.dump         = TMemoryPool_dump
   return o;
}

//==========================================================
// <T>收集一个自由对象。</T>
//
// @method
// @return FObject 对象
//==========================================================
function TMemoryPool_alloc(){
   var o = this;
   var value = null;
   var unused = o._unused;
   if(unused){
      value = unused.value;
      o._unused = unused.next;
      RMemory.entryFree(unused);
   }else{
      value = new o._constructor();
      value.__pool = o;
      o._createCount++;
   }
   o._allocCount++;
   return value;
}

//==========================================================
// <T>释放 一个自由对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
function TMemoryPool_free(value){
   var o = this;
   RAssert.debugNotNull(value);
   var entry = RMemory.entryAlloc();
   entry.value = value;
   entry.next = o._unused;
   o._unused = entry;
   o._freeCount++;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function TMemoryPool_dispose(){
   var o = this;
   var entry = o._unused;
   while(entry){
      var current = entry;
      entry = current.next;
      current.dispose();
      RMemory.entryFree(current);
   }
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
function TMemoryPool_dump(){
   var o = this;
   var source = new TString();
   source.append('Pool:');
   source.append('create=', o._createCount);
   source.append(', alloc=', o._allocCount);
   source.append(', free=', o._freeCount);
   return source.flush();
}
