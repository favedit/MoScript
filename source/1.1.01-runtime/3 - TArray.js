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
// @param v:value:Object 对象
// @return Boolean 是否含有
//==========================================================
MO.TArray_contains = function TArray_contains(v){
   return this.indexOf(v) != -1;
}

//==========================================================
// <T>查找指定对象在数组中的索引位置，不存在则返回-1。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引位置
//==========================================================
MO.TArray_indexOf = function TArray_indexOf(v){
   var o = this;
   var c = o._length;
   for(var n = 0; n < c; n++){
      if(o._memory[n] == v){
         return n;
      }
   }
   return -1;
}

//==========================================================
// <T>取得指定索引对应的对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return 当前位置上的对象
//==========================================================
MO.TArray_get = function TArray_get(n){
   return ((n >= 0) && (n < this._length)) ? this._memory[n] : null;
}

//==========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param index:Integer 索引位置
// @param value:Object 对象
//==========================================================
MO.TArray_set = function TArray_set(index, value){
   if((index >= 0) && (n < this._length)){
      this._memory[index] = value;
   }
}

//==========================================================
// <T>把对象追加到数组的最后位置。</T>
//
// @method
// @param values:Object 对象
//==========================================================
MO.TArray_push = function TArray_push(){
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      this._memory[this._length++] = arguments[i];
   }
}

//==========================================================
// <T>在数组中交换两个索引对应的对象。</T>
//
// @method
// @param l:left:Integer 第一个对象的索引值
// @param r:right:Integer 第二个对象的索引值
//==========================================================
MO.TArray_swap = function TArray_swap(l, r){
   if((l >= 0) && (l < this._length) && (r >= 0) && (r < this._length) && (l != r)){
      var v = this._memory[l];
      this._memory[l] = this._memory[r];
      this._memory[r] = v;
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
// @param i:index:Integer 索引位置
// @return Object 被删除的对象
//==========================================================
MO.TArray_erase = function TArray_erase(i){
   var v = null;
   if((i >= 0) && (i < c)){
      var o = this;
      o._length--;
      v = o._memory[i];
      for(var n = i; n < c; n++){
         o._memory[n] = o._memory[n + 1];
      }
   }
   return v;
}

//==========================================================
// <T>移除指定对象的存储对象。</T>
//
// @method
// @param v:value:Object 指定对象
//==========================================================
MO.TArray_remove = function TArray_remove(v){
   if(v != null){
      var o = this;
      var n = 0;
      var c = o._length;
      for(var i = n; i < c; i++){
         if(o._memory[i] != v){
            o._memory[n++] = o._memory[i];
         }
      }
      o._length = n;
   }
   return v;
}

//==========================================================
// <T>将数组内项目为空的位置全部删除。</T>
//
// @method
//==========================================================
MO.TArray_compress = function TArray_compress(){
   var o = this;
   var c = o._length;
   var l = 0;
   for(var n = 0; n < c; n++){
      var v = o._memory[n];
      if(v != null){
         o._memory[l++] = v;
      }
   }
   o._length = l;
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
// @param d:dump:TString 输出字符串
// @return TString 含有数组内部信息的字符串
//==========================================================
MO.TArray_dump = function TArray_dump(){
   var o = this;
   var r = new TString();
   var c = o._length;
   r.append(MO.Runtime.className(o), ':', c);
   if(c > 0){
      for(var i = 0; i < c; i++){
         r.append(' [', o._memory[i], ']');
      }
   }
   return r.flush();
}
