//==========================================================
// <T>内存对象池。</T>
//
// @tool
// @author maocy
// @version 150523
//==========================================================
MO.TMemoryPool = function TMemoryPool(){
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
   o.alloc        = MO.TMemoryPool_alloc;
   o.free         = MO.TMemoryPool_free;
   // @method
   o.dispose      = MO.TMemoryPool_dispose;
   o.dump         = MO.TMemoryPool_dump
   return o;
}

//==========================================================
// <T>收集一个自由对象。</T>
//
// @method
// @return FObject 对象
//==========================================================
MO.TMemoryPool_alloc = function TMemoryPool_alloc(){
   var value = null;
   var unused = this._unused;
   if(unused){
      value = unused.value;
      this._unused = unused.next;
      // 释放节点
      MO.Memory.entryFree(unused);
   }else{
      value = new this._constructor();
      value.__pool = this;
      this._createCount++;
   }
   this._allocCount++;
   return value;
}

//==========================================================
// <T>释放 一个自由对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
MO.TMemoryPool_free = function TMemoryPool_free(value){
   MO.Assert.debugNotNull(value);
   var entry = MO.Memory.entryAlloc();
   entry.value = value;
   entry.next = this._unused;
   this._unused = entry;
   this._freeCount++;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.TMemoryPool_dispose = function TMemoryPool_dispose(){
   var entry = this._unused;
   while(entry){
      var current = entry;
      entry = current.next;
      current.dispose();
      // 释放节点
      MO.Memory.entryFree(current);
   }
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
MO.TMemoryPool_dump = function TMemoryPool_dump(){
   var info = new MO.TString();
   info.append('Pool:');
   info.append('create=', this._createCount);
   info.append(', alloc=', this._allocCount);
   info.append(', free=', this._freeCount);
   return info.flush();
}
