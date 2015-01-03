//==========================================================
// <T>数组的操作类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TArray(o){
   if(!o){o = this;}
   // Attribute
   o.length   = 0;
   o.memory   = new Array();
   // Method
   o.isEmpty  = TArray_isEmpty;
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
   return this.length == 0;
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
   var c = o.length;
   for(var n = 0; n < c; n++){
      if(o.memory[n] == v){
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
   return ((n >= 0) && (n < this.length)) ? this.memory[n] : null;
}

//==========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 对象
//==========================================================
function TArray_set(n, v){
   if((n >= 0) && (n < this.length)){
      this.memory[n] = v;
   }
}

//==========================================================
// <T>把对象追加到数组的最后位置。</T>
//
// @method
// @param v:value:Object 对象
//==========================================================
function TArray_push(v){
   this.memory[this.length++] = v;
}

//==========================================================
// <T>在数组中交换两个索引对应的对象。</T>
//
// @method
// @param l:left:Integer 第一个对象的索引值
// @param r:right:Integer 第二个对象的索引值
//==========================================================
function TArray_swap(l, r){
   if((l >= 0) && (l < this.length) && (r >= 0) && (r < this.length) && (l != r)){
      var v = this.memory[l];
      this.memory[l] = this.memory[r];
      this.memory[r] = v;
   }
}

//==========================================================
// <T>对数组内容进行排序。</T>
//
// @method
//==========================================================
function TArray_sort(){
   this.memory.sort();
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
      o.length--;
      v = o.memory[i];
      for(var n = i; n < c; n++){
         o.memory[n] = o.memory[n + 1];
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
      var c = o.length;
      for(var i = n; i < c; i++){
         if(o.memory[i] != v){
            o.memory[n++] = o.memory[i];
         }
      }
      o.length = n;
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
   var c = o.length;
   var l = 0;
   for(var n = 0; n < c; n++){
      var v = o.memory[n];
      if(v != null){
         o.memory[l++] = v;
      }
   }
   o.length = l;
}

//==========================================================
// <T>清除数组的所有内容。</T>
//
// @method
//==========================================================
function TArray_clear(){
   this.length = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function TArray_dispose(){
   var o = this;
   o.length = 0;
   o.memory = null;
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
   var c = o.length;
   r.append(RRuntime.className(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o.memory[n], ']');
      }
   }
   return r.toString();
}
