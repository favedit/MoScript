﻿//==========================================================
// <T>数组的操作类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TArray(){
   var o = this;
   //..........................................................
   // @attribute
   o._length  = 0;
   o._memory  = new Array();
   //..........................................................
   // @method
   o.isEmpty  = TArray_isEmpty;
   o.length   = TArray_length;
   o.memory   = TArray_memory;
   o.contains = TArray_contains;
   o.indexOf  = TArray_indexOf;
   o.get      = TArray_get;
   o.set      = TArray_set;
   o.push     = TArray_push;
   o.swap     = TArray_swap;
   o.sort     = TArray_sort;
   o.erase    = TArray_erase;
   o.remove   = TArray_remove;
   o.compress = TArray_compress;
   o.clear    = TArray_clear;
   o.dispose  = TArray_dispose;
   o.dump     = TArray_dump;
   return o;
}

//==========================================================
// <T>判断数组是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
function TArray_isEmpty(){
   return this._length == 0;
}

//==========================================================
// <T>获得数据长度。</T>
//
// @method
// @return Integer 数据长度
//==========================================================
function TArray_length(){
   return this._length;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Array 数据
//==========================================================
function TArray_memory(){
   return this._memory;
}

//==========================================================
// <T>判断数组是否含有指定的对象。</T>
//
// @method
// @param v:value:Object 对象
// @return Boolean 是否含有
//==========================================================
function TArray_contains(v){
   return this.indexOf(v) != -1;
}

//==========================================================
// <T>查找指定对象在数组中的索引位置，不存在则返回-1。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引位置
//==========================================================
function TArray_indexOf(v){
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
function TArray_get(n){
   return ((n >= 0) && (n < this._length)) ? this._memory[n] : null;
}

//==========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 对象
//==========================================================
function TArray_set(n, v){
   if((n >= 0) && (n < this._length)){
      this._memory[n] = v;
   }
}

//==========================================================
// <T>把对象追加到数组的最后位置。</T>
//
// @method
// @param values:Object 对象
//==========================================================
function TArray_push(){
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
function TArray_swap(l, r){
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
function TArray_sort(){
   this._memory.sort();
}

//==========================================================
// <T>移除指定索引的存储对象。</T>
//
// @method
// @param i:index:Integer 索引位置
// @return Object 被删除的对象
//==========================================================
function TArray_erase(i){
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
function TArray_remove(v){
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
function TArray_compress(){
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
function TArray_clear(){
   this._length = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function TArray_dispose(){
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
function TArray_dump(){
   var o = this;
   var r = new TString();
   var c = o._length;
   r.append(RRuntime.className(o), ':', c);
   if(c > 0){
      for(var i = 0; i < c; i++){
         r.append(' [', o._memory[i], ']');
      }
   }
   return r.flush();
}
