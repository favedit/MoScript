// =========================================================
// <T>列表的操作类。</T>
//
// @tool
// @author maocy
// @version 141229
// =========================================================
function TList(){
   var o = this;
   //..........................................................
   // @attribute
   o._count     = 0;
   o._memory    = new Array();
   //..........................................................
   // @method
   o.isEmpty    = TList_isEmpty;
   o.contains   = TList_contains;
   o.indexOf    = TList_indexOf;
   o.first      = TList_first;
   o.last       = TList_last;
   o.get        = TList_get;
   o.set        = TList_set;
   o.append     = TList_append;
   o.insert     = TList_insert;
   o.push       = TList_push;
   o.pushUnique = TList_pushUnique;
   o.pop        = TList_pop;
   o.swap       = TList_swap;
   o.sort       = TList_sort;
   o.erase      = TList_erase;
   o.remove     = TList_remove;
   o.clear      = TList_clear;
   o.compress   = TList_compress;
   o.pack       = TList_pack;
   o.dispose    = TList_dispose;
   o.dump       = TList_dump;
   return o;
}

//===========================================================
// <T>判断列表是否为空。</T>
//
// @method
// @return Boolean 是否为空
//===========================================================
function TList_isEmpty(){
   return (this._count == 0);
}

//===========================================================
// <T>判断列表是否含有指定的对象。</T>
//
// @method
// @param v:value:Object 对象
// @return Boolean 是否含有
//===========================================================
function TList_contains(v){
   return this.indexOf(v) != -1;
}

//===========================================================
// <T>查找指定对象在列表中的索引位置，不存在则返回-1。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引位置
//===========================================================
function TList_indexOf(v){
   var o = this;
   var c = o._count;
   for(var n = 0; n < c; n++){
      if(o._memory[n] == v){
         return n;
      }
   }
   return -1;
}

//===========================================================
// <T>获得列表中第一个对象。</T>
//
// @method
// @return 第一个对象
//===========================================================
function TList_first(){
   var o = this;
   return o._count ? this._memory[0] : null;
}

//===========================================================
// <T>获得列表中最后一个对象。</T>
//
// @method
// @return 最后一个对象
//===========================================================
function TList_last(){
   var o = this;
   return o._count ? this._memory[o._count - 1] : null;
}

//===========================================================
// <T>取得指定索引对应的对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return 当前位置上的对象
//===========================================================
function TList_get(n){
   return ((n >= 0) && (n < this._count)) ? this._memory[n] : null;
}

//===========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 对象
//===========================================================
function TList_set(n, v){
   if((n >= 0) && (n < this._count)){
      this._memory[n] = v;
   }
}

//===========================================================
// <T>追加列表全部内容。</T>
//
// @method
// @param v:value:TList 列表
//===========================================================
function TList_append(v){
   var o = this;
   var c = v._count;
   for(var n = 0; n < c; n++){
      o.push(v.get(n));
   }
}

//===========================================================
//<T>把对象插入在指定的索引处。</T>
//
//@method
//@param i:index:Integer 索引位置
//@param v:value:Object 对象
//===========================================================
function TList_insert(i, v){
   var o = this;
   var c = o._count;
   if((i >= 0) && (i <= c)){
      for(var n = c; n > i; n--){
         o._memory[n] = o._memory[n - 1];
      }
      o._memory[i] = v;
   }
}

//===========================================================
// <T>把对象追加到列表的最后位置。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引值
//===========================================================
function TList_push(v){
   var n = this._count++;
   this._memory[n] = v;
   return n;
}

//===========================================================
// <T>把唯一对象追加到列表的最后位置。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引值
//===========================================================
function TList_pushUnique(v){
   var o = this;
   // 查询存在性
   for(var n = o._count-1; n >= 0; n--){
      if(o._memory[n] == v){
         return n;
      }
   }
   // 追加到尾部
   var n = o._count++;
   o._memory[n] = v;
   return n;
}

//===========================================================
// <T>将最后一个对象弹出列表。</T>
//
// @method
// @return Object 对象
//===========================================================
function TList_pop(){
   var o = this;
   if(o._count){
      return o._memory[--o._count];
   }
}

//===========================================================
// <T>在列表中交换两个索引对应的对象。</T>
//
// @method
// @param l:left:Integer 第一个对象的索引值
// @param r:right:Integer 第二个对象的索引值
//===========================================================
function TList_swap(l, r){
   var o = this;
   if((l >= 0) && (l < o._count) && (r >= 0) && (r < o._count) && (l != r)){
      var v = o._memory[l];
      o._memory[l] = this._memory[r];
      o._memory[r] = v;
   }
}

//===========================================================
// <T>对列表内容进行排序。</T>
//
// @method
//===========================================================
function TList_sort(){
   this._memory.sort();
}

//===========================================================
// <T>移除指定索引的存储对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return Object 被删除的对象
//===========================================================
function TList_erase(n){
   var v = null;
   var o = this;
   if((n >= 0) && (n < o._count)){
      v = o._memory[n];
      var c = --o._count;
      for(var i = n; i < c; i++){
         o._memory[i] = o._memory[i+1];
      }
   }
   return v;
}

//===========================================================
// <T>移除所有指定对象。</T>
//
// @method
// @param v:value:Object 指定对象
//===========================================================
function TList_remove(v){
   if(v != null){
      var o = this;
      var c = o._count;
      if(c > 0){
         var n = 0;
         for(var i = n; i < c; i++){
            if(o._memory[i] != v){
               o._memory[n++] = o._memory[i];
            }
         }
         o._count = n;
      }
   }
   return v;
}

//===========================================================
// <T>清除所有内容。</T>
//
// @method
//===========================================================
function TList_clear(){
   this._count = 0;
}

//===========================================================
// <T>压缩列表内容。</T>
// <P>删除所有空内容。</P>
//
// @method
//===========================================================
function TList_compress(){
   var o = this;
   var c = o._count;
   if(c > 0){
      var l = 0;
      for(var n = 0; n < c; n++){
         var v = o._memory[n];
         if(v != null){
            o._memory[l++] = v;
         }
      }
      o._count = l;
   }
}

//==========================================================
//<T>打包列表中的内容。</T>
//
//@method
//@return String 打包字符串
//==========================================================
function TList_pack(){
   var o = this;
   var ss = new TStrings();
   for(var n = 0; n < o._count; n++){
      ss.push(o.get(n).pack());
   }
   return ss.pack();
}

//===========================================================
// <T>释放处理。</T>
//
// @method
//===========================================================
function TList_dispose(){
   var o = this;
   o._count = 0;
   for(var n in o._memory){
      delete o._memory[n];
   }
   o._memory = null;
}

//===========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//===========================================================
function TList_dump(){
   var o = this;
   var c = o._count;
   var r = new TString();
   r.append(RClass.name(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o._memory[n], ']');
      }
   }
   return r.toString();
}
