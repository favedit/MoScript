//==========================================================
// <T>数组的操作类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
MO.TArray = function TArray(length){
   var o = this;
   //..........................................................
   // @attribute
   o._length   = MO.Runtime.nvl(length, 0);
   o._memory   = new Array();
   //..........................................................
   // @method
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

//==========================================================
// <T>判断数组是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.TArray_isEmpty = function TArray_isEmpty(){
   return this._length == 0;
}

//==========================================================
// <T>获得数据长度。</T>
//
// @method
// @return Integer 数据长度
//==========================================================
MO.TArray_length = function TArray_length(){
   return this._length;
}

//==========================================================
// <T>设置数据长度。</T>
//
// @method
// @param Integer 数据长度
//==========================================================
MO.TArray_setLength = function TArray_setLength(length){
   this._length = length;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Array 数据
//==========================================================
MO.TArray_memory = function TArray_memory(){
   return this._memory;
}

//==========================================================
// <T>判断数组是否含有指定的对象。</T>
//
// @method
// @param value:Object 对象
// @return Boolean 是否含有
//==========================================================
MO.TArray_contains = function TArray_contains(value){
   return this.indexOf(value) != -1;
}

//==========================================================
// <T>查找指定对象在数组中的索引位置，不存在则返回-1。</T>
//
// @method
// @param value:Object 对象
// @return Integer 索引位置
//==========================================================
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

//==========================================================
// <T>取得指定索引对应的对象。</T>
//
// @method
// @param index:Integer 索引位置
// @return 当前位置上的对象
//==========================================================
MO.TArray_get = function TArray_get(index){
   return ((index >= 0) && (index < this._length)) ? this._memory[index] : null;
}

//==========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param index:Integer 索引位置
// @param value:Object 对象
//==========================================================
MO.TArray_set = function TArray_set(index, value){
   var o = this;
   if ((index >= 0) && (index < o._length)) {
      o._memory[index] = value;
   }
}

//==========================================================
// <T>把对象追加到数组的最后位置。</T>
//
// @method
// @param values:Object 对象
//==========================================================
MO.TArray_push = function TArray_push(){
   var o = this;
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      o._memory[o._length++] = arguments[i];
   }
}

//==========================================================
// <T>在数组中交换两个索引对应的对象。</T>
//
// @method
// @param left:Integer 第一个对象的索引值
// @param right:Integer 第二个对象的索引值
//==========================================================
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

//==========================================================
// <T>对数组内容进行排序。</T>
//
// @method
//==========================================================
MO.TArray_sort = function TArray_sort(){
   this._memory.sort();
}

//==========================================================
// <T>移除指定索引的存储对象。</T>
//
// @method
// @param index:Integer 索引位置
// @return Object 被删除的对象
//==========================================================
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

//==========================================================
// <T>移除指定对象的存储对象。</T>
//
// @method
// @param value:Object 指定对象
//==========================================================
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

//==========================================================
// <T>将数组内项目为空的位置全部删除。</T>
//
// @method
//==========================================================
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

//==========================================================
// <T>清除数组的所有内容。</T>
//
// @method
//==========================================================
MO.TArray_clear = function TArray_clear(){
   this._length = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.TArray_dispose = function TArray_dispose(){
   var o = this;
   o._length = 0;
   o._memory = null;
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 信息字符串
//==========================================================
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
