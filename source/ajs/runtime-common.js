MO.EScope = new function EScope(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Local   = 1;
   o.Session = 2;
   o.Global  = 3;
   return o;
}
MO.TArray = function TArray(length){
   var o = this;
   o._length   = MO.Runtime.nvl(length, 0);
   o._memory   = new Array();
   o.isEmpty   = MO.TArray_isEmpty;
   o.length    = MO.TArray_length;
   o.setLength = MO.TArray_setLength;
   o.memory    = MO.TArray_memory;
   o.contains  = MO.TArray_contains;
   o.indexOf   = MO.TArray_indexOf;
   o.get       = MO.TArray_get;
   o.set       = MO.TArray_set;
   o.push      = MO.TArray_push;
   o.swap      = MO.TArray_swap;
   o.sort      = MO.TArray_sort;
   o.erase     = MO.TArray_erase;
   o.remove    = MO.TArray_remove;
   o.compress  = MO.TArray_compress;
   o.clear     = MO.TArray_clear;
   o.dispose   = MO.TArray_dispose;
   o.dump      = MO.TArray_dump;
   return o;
}
MO.TArray_isEmpty = function TArray_isEmpty(){
   return this._length == 0;
}
MO.TArray_length = function TArray_length(){
   return this._length;
}
MO.TArray_setLength = function TArray_setLength(length){
   this._length = length;
}
MO.TArray_memory = function TArray_memory(){
   return this._memory;
}
MO.TArray_contains = function TArray_contains(value){
   return this.indexOf(value) != -1;
}
MO.TArray_indexOf = function TArray_indexOf(value){
   var o = this;
   var count = o._length;
   for(var i = 0; i < count; i++){
      if(o._memory[i] == value){
         return i;
      }
   }
   return -1;
}
MO.TArray_get = function TArray_get(index){
   return ((index >= 0) && (index < this._length)) ? this._memory[index] : null;
}
MO.TArray_set = function TArray_set(index, value){
   var o = this;
   if ((index >= 0) && (index < o._length)) {
      o._memory[index] = value;
   }
}
MO.TArray_push = function TArray_push(){
   var o = this;
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      o._memory[o._length++] = arguments[i];
   }
}
MO.TArray_swap = function TArray_swap(left, right){
   var o = this;
   var count = o._length;
   if((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)){
      var memory = o._memory;
      var value = memory[left];
      memory[left] = memory[right];
      memory[right] = value;
   }
}
MO.TArray_sort = function TArray_sort(){
   this._memory.sort();
}
MO.TArray_erase = function TArray_erase(index){
   var o = this;
   var value = null;
   var count = o._count;
   if((index >= 0) && (index < count)){
      value = o._memory[index];
      for(var i = index; i < count; i++){
         o._memory[i] = o._memory[i + 1];
      }
      o._length--;
   }
   return value;
}
MO.TArray_remove = function TArray_remove(value){
   var o = this;
   var index = 0;
   var memory = o._memory;
   var count = o._length;
   for(var i = 0; i < count; i++){
      if(memory[i] != value){
         memory[index++] = memory[i];
      }
   }
   o._length = index;
}
MO.TArray_compress = function TArray_compress(){
   var o = this;
   var index = 0;
   var count = o._length;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      var value = memory[i];
      if(value != null){
         memory[index++] = value;
      }
   }
   o._length = index;
}
MO.TArray_clear = function TArray_clear(){
   this._length = 0;
}
MO.TArray_dispose = function TArray_dispose(){
   var o = this;
   o._length = 0;
   o._memory = null;
}
MO.TArray_dump = function TArray_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._length;
   result.append(MO.Runtime.className(o), ':', count);
   if(count > 0){
      var memory = o._memory;
      for(var i = 0; i < count; i++){
         result.append(' [', memory[i], ']');
      }
   }
   return result.flush();
}
MO.RMemory = function RMemory(){
   var o = MO.RSingleton.call(this);
   o._entryUnused = null;;
   o._pools       = new Object();
   return o;
}
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
MO.RMemory.prototype.entryFree = function RMemory_entryFree(entry){
   var o = this;
   MO.Assert.debugNotNull(entry);
   entry.next = o._entryUnused;
   o._entryUnused = entry;
}
MO.RMemory.prototype.alloc = function RMemory_alloc(clazz){
   var o = this;
   MO.Assert.debugNotNull(clazz);
   var className = MO.Runtime.className(clazz);
   var pools = o._pools;
   var pool = pools[className];
   if(!pool){
      pool = new MO.TMemoryPool();
      pool._constructor = clazz;
      pools[className] = pool;
   }
   var value = pool.alloc();
   return value;
}
MO.RMemory.prototype.free = function RMemory_free(value){
   MO.Assert.debugNotNull(value);
   var pool = value.__pool;
   MO.Assert.debugNotNull(pool);
   pool.free(value);
   if(value.free){
      value.free();
   }
}
MO.RMemory.prototype.refresh = function RMemory_refresh(){
   CollectGarbage();
}
MO.Memory = new MO.RMemory();
MO.SMemoryPoolEntry = function SMemoryPoolEntry(){
   var o = this;
   o.next    = null;
   o.value   = null;
   o.dispose = MO.SMemoryPoolEntry_dispose;
   return o;
}
MO.SMemoryPoolEntry_dispose = function SMemoryPoolEntry_dispose(){
   var o = this;
   var value = o.value;
   if(value){
      value.__pool = null;
      value.dispose();
   }
   o.next = null;
   o.value = null;
}
MO.TMemoryPool = function TMemoryPool(){
   var o = this;
   o._constructor = null;
   o._unused      = null;
   o._createCount = 0;
   o._allocCount  = 0;
   o._freeCount   = 0;
   o.alloc        = MO.TMemoryPool_alloc;
   o.free         = MO.TMemoryPool_free;
   o.dispose      = MO.TMemoryPool_dispose;
   o.dump         = MO.TMemoryPool_dump
   return o;
}
MO.TMemoryPool_alloc = function TMemoryPool_alloc(){
   var o = this;
   var value = null;
   var unused = o._unused;
   if(unused){
      value = unused.value;
      o._unused = unused.next;
      MO.Memory.entryFree(unused);
   }else{
      value = new o._constructor();
      value.__pool = o;
      o._createCount++;
   }
   o._allocCount++;
   return value;
}
MO.TMemoryPool_free = function TMemoryPool_free(value){
   var o = this;
   MO.Assert.debugNotNull(value);
   var entry = MO.Memory.entryAlloc();
   entry.value = value;
   entry.next = o._unused;
   o._unused = entry;
   o._freeCount++;
}
MO.TMemoryPool_dispose = function TMemoryPool_dispose(){
   var entry = this._unused;
   while(entry){
      var current = entry;
      entry = current.next;
      current.dispose();
      MO.Memory.entryFree(current);
   }
}
MO.TMemoryPool_dump = function TMemoryPool_dump(){
   var o = this;
   var result = new MO.TString();
   result.append('Pool:');
   result.append('create=', o._createCount);
   result.append(', alloc=', o._allocCount);
   result.append(', free=', o._freeCount);
   return result.flush();
}
MO.SLooperEntry = function SLooperEntry(){
   var o = this;
   o.prior   = null;
   o.next    = null;
   o.value   = null;
   o.dispose = MO.SLooperEntry_dispose;
   return o;
}
MO.SLooperEntry_dispose = function SLooperEntry_dispose(){
   var o = this;
   o.prior = null;
   o.next = null;
   o.value = null;
}
MO.TLooper = function TLooper(){
   var o = this;
   o._count             = 0;
   o._recordCount       = 0;
   o._current           = null;
   o.innerPush          = MO.TLooper_innerPush;
   o.innerRemove        = MO.TLooper_innerRemove;
   o.innerRemoveCurrent = MO.TLooper_innerRemoveCurrent;
   o.innerRemoveValue   = MO.TLooper_innerRemoveValue;
   o.isEmpty            = MO.TLooper_isEmpty;
   o.count              = MO.TLooper_count;
   o.record             = MO.TLooper_record;
   o.unrecord           = MO.TLooper_unrecord;
   o.contains           = MO.TLooper_contains;
   o.current            = MO.TLooper_current;
   o.next               = MO.TLooper_next;
   o.push               = MO.TLooper_push;
   o.pushUnique         = MO.TLooper_pushUnique;
   o.removeCurrent      = MO.TLooper_removeCurrent;
   o.remove             = MO.TLooper_remove;
   o.clear              = MO.TLooper_clear;
   o.dispose            = MO.TLooper_dispose;
   o.dump               = MO.TLooper_dump;
   return o;
}
MO.TLooper_innerPush = function TLooper_innerPush(entry){
   var o = this;
   var current = o._current;
   if(current){
      var prior = current.prior;
      entry.prior = prior;
      entry.next = current;
      prior.next = entry;
      current.prior = entry;
   }else{
      entry.prior = entry;
      entry.next = entry;
      o._current = entry;
   }
   o._count++;
}
MO.TLooper_innerRemove = function TLooper_innerRemove(entry){
   var o = this;
   var prior = entry.prior;
   var next = entry.next;
   prior.next = next;
   next.prior = prior;
   o._count--;
   if(o._count > 0){
      o._current = next;
   }else{
      o._current = null;
   }
   MO.Memory.free(entry);
}
MO.TLooper_innerRemoveCurrent = function TLooper_innerRemoveCurrent(){
   var o = this;
   var value = null;
   if(o._count > 0){
      var current = o._current;
      value = current.value;
      o.innerRemove(current);
   }
   return value;
}
MO.TLooper_innerRemoveValue = function TLooper_innerRemoveValue(value){
   var o = this;
   if(o._count > 0){
      if(o._current.value == value){
         o.innerRemoveCurrent();
         return;
      }
      var current = o._current;
      var entry = current.next;
      while(entry != current){
         if(entry.value == value){
            o.innerRemove(entry);
            o._current = current;
            return;
         }
         entry = entry.next;
      }
   }
}
MO.TLooper_isEmpty = function TLooper_isEmpty(){
   return this._count == 0;
}
MO.TLooper_count = function TLooper_count(){
   return this._count;
}
MO.TLooper_record = function TLooper_record(){
   var o = this;
   o._recordCount = o._count;
}
MO.TLooper_unrecord = function TLooper_unrecord(v){
   this._recordCount = -1;
}
MO.TLooper_contains = function TLooper_contains(value){
   var o = this;
   if(o._current){
      var entry = o._current;
      var count = o._count;
      for(var i = 0; i < count; i++){
         if(entry.value == value){
            return true;
         }
         entry = entry.next;
      }
   }
   return false;
}
MO.TLooper_current = function TLooper_current(){
   var entry = this._current;
   return entry ? entry.value : null;
}
MO.TLooper_next = function TLooper_next(){
   var o = this;
   if(o._current){
      o._current = o._current.next;
   }
   var count = o._recordCount;
   if(count > 0){
      o._recordCount--;
   }else if(count == 0){
      return null;
   }
   return o._current ? o._current.value : null;
}
MO.TLooper_push = function TLooper_push(value){
   var entry = MO.Memory.alloc(MO.SLooperEntry);
   entry.value = value;
   this.innerPush(entry);
}
MO.TLooper_pushUnique = function TLooper_pushUnique(value){
   var o = this;
   if(!o.contains(value)){
      o.push(value);
   }
}
MO.TLooper_removeCurrent = function TLooper_removeCurrent(){
   return this.innerRemoveCurrent();
}
MO.TLooper_remove = function TLooper_remove(p){
   this.innerRemoveValue(p);
}
MO.TLooper_clear = function TLooper_clear(){
   var o = this;
   var entry = o._current;
   if(entry){
      entry.prior.next = null;
      while(entry){
         var next = entry.next;
         MO.Memory.free(next);
         entry = next;
      }
   }
   o._count = 0;
   o._current = null;
}
MO.TLooper_dispose = function TLooper_dispose(){
   this.clear();
}
MO.TLooper_dump = function TLooper_dump(){
   var o = this;
   var count = o._count;
   var result = new MO.TString();
   result.append(MO.Class.name(this), ': ', count);
   if(count > 0){
      var entry = o._current;
      for(var i = 0; i < count; i++){
         result.append(' [', entry.value, ']');
         entry = entry.next;
      }
   }
   return result.flush();
}
MO.RGlobal = function RGlobal(){
   var o = MO.RSingleton.call(this);
   o._instances = new MO.TDictionary();
   return o;
}
MO.RGlobal.prototype.get = function RGlobal_get(name){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   }
   return global._instances.get(name);
}
MO.RGlobal.prototype.set = function RGlobal_set(name, value){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   }
   return global._instances.set(name, value);
}
MO.Global = new MO.RGlobal();
