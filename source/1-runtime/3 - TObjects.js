// =========================================================
// <T>对象集合。</T>
//
// @tool
// @author maocy
// @version 141230
// =========================================================
function TObjects(o){
   if(!o){o = this;}
   // @attribute
   o.count      = 0;
   o.memory     = new Array();
   // @method
   o.isEmpty    = TObjects_isEmpty;
   o.contains   = TObjects_contains;
   o.indexOf    = TObjects_indexOf;
   o.first      = TObjects_first;
   o.last       = TObjects_last;
   o.get        = TObjects_get;
   o.set        = TObjects_set;
   o.append     = TObjects_append;
   o.insert     = TObjects_insert;
   o.push       = TObjects_push;
   o.pushUnique = TObjects_pushUnique;
   o.pop        = TObjects_pop;
   o.swap       = TObjects_swap;
   o.sort       = TObjects_sort;
   o.erase      = TObjects_erase;
   o.remove     = TObjects_remove;
   o.clear      = TObjects_clear;
   o.dispose    = TObjects_dispose;
   o.dump       = TObjects_dump;
   return o;
}

//===========================================================
// <T>判断列表是否为空。</T>
//
// @method
// @return Boolean 是否为空
//===========================================================
function TObjects_isEmpty(){
   return (this.count == 0);
}

//===========================================================
// <T>判断列表是否含有指定的对象。</T>
//
// @method
// @param v:value:Object 对象
// @return Boolean 是否含有
//===========================================================
function TObjects_contains(v){
   return this.indexOf(v) != -1;
}

//===========================================================
// <T>查找指定对象在列表中的索引位置，不存在则返回-1。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引位置
//===========================================================
function TObjects_indexOf(v){
   var o = this;
   var c = o.count;
   for(var n = 0; n < c; n++){
      if(o.memory[n] == v){
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
function TObjects_first(){
   var o = this;
   return o.count ? this.memory[0] : null;
}

//===========================================================
// <T>获得列表中最后一个对象。</T>
//
// @method
// @return 最后一个对象
//===========================================================
function TObjects_last(){
   var o = this;
   return o.count ? this.memory[o.count - 1] : null;
}

//===========================================================
// <T>取得指定索引对应的对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return 当前位置上的对象
//===========================================================
function TObjects_get(n){
   return ((n >= 0) && (n < this.count)) ? this.memory[n] : null;
}

//===========================================================
// <T>把对象存储在指定的索引处。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 对象
//===========================================================
function TObjects_set(n, v){
   if((n >= 0) && (n < this.count)){
      this.memory[n] = v;
   }
}

//===========================================================
// <T>追加列表全部内容。</T>
//
// @method
// @param v:value:TObjects 列表
//===========================================================
function TObjects_append(v){
   var o = this;
   var c = v.count;
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
function TObjects_insert(i, v){
   var o = this;
   var c = o.count;
   if((i >= 0) && (i <= c)){
      for(var n = c; n > i; n--){
         o.memory[n] = o.memory[n - 1];
      }
      o.memory[i] = v;
   }
}

//===========================================================
// <T>把对象追加到列表的最后位置。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引值
//===========================================================
function TObjects_push(v){
   var n = this.count++;
   this.memory[n] = v;
   return n;
}

//===========================================================
// <T>把唯一对象追加到列表的最后位置。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 索引值
//===========================================================
function TObjects_pushUnique(v){
   var o = this;
   // 查询存在性
   for(var n = o.count-1; n >= 0; n--){
      if(o.memory[n] == v){
         return n;
      }
   }
   // 追加到尾部
   var n = o.count++;
   o.memory[n] = v;
   return n;
}

//===========================================================
// <T>将最后一个对象弹出列表。</T>
//
// @method
// @return Object 对象
//===========================================================
function TObjects_pop(){
   var o = this;
   if(o.count){
      return o.memory[--o.count];
   }
}

//===========================================================
// <T>在列表中交换两个索引对应的对象。</T>
//
// @method
// @param l:left:Integer 第一个对象的索引值
// @param r:right:Integer 第二个对象的索引值
//===========================================================
function TObjects_swap(l, r){
   var o = this;
   if((l >= 0) && (l < o.count) && (r >= 0) && (r < o.count) && (l != r)){
      var v = o.memory[l];
      o.memory[l] = this.memory[r];
      o.memory[r] = v;
   }
}

//===========================================================
// <T>对列表内容进行排序。</T>
//
// @method
//===========================================================
function TObjects_sort(){
   this.memory.sort();
}

//===========================================================
// <T>移除指定索引的存储对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return Object 被删除的对象
//===========================================================
function TObjects_erase(n){
   var v = null;
   var o = this;
   if((n >= 0) && (n < o.count)){
      v = o.memory[n];
      var c = --o.count;
      for(var i = n; i < c; i++){
         o.memory[i] = o.memory[i+1];
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
function TObjects_remove(v){
   if(v != null){
      var o = this;
      var c = o.count;
      if(c > 0){
         var n = 0;
         for(var i = n; i < c; i++){
            if(o.memory[i] != v){
               o.memory[n++] = o.memory[i];
            }
         }
         o.count = n;
      }
   }
   return v;
}

//===========================================================
// <T>清除所有内容。</T>
//
// @method
//===========================================================
function TObjects_clear(){
   this.count = 0;
}

//===========================================================
// <T>释放处理。</T>
//
// @method
//===========================================================
function TObjects_dispose(){
   var o = this;
   o.count = 0;
   for(var n in o.memory){
      delete o.memory[n];
   }
   o.memory = null;
}

//===========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//===========================================================
function TObjects_dump(){
   var o = this;
   var c = o.count;
   var r = new TString();
   r.append(RClass.name(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o.memory[n], ']');
      }
   }
   return r.toString();
}
