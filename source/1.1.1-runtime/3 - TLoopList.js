//===========================================================
// <T>自循环链表。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
function TLoopList(o){
   if(!o){o = this;}
   // @property
   o.count      = 0;
   o.size       = 0;
   o.start      = new Object();
   // @method
   o.ensureSize = TLoopList_ensureSize;
   o.find       = TLoopList_find;
   o.contains   = TLoopList_contains;
   o.indexOf    = TLoopList_indexOf;
   o.get        = TLoopList_get;
   o.set        = TLoopList_set;
   o.push       = TLoopList_push;
   o.sync       = TLoopList_sync;
   o.erase      = TLoopList_erase;
   o.remove     = TLoopList_remove;
   o.clear      = TLoopList_clear;
   o.dump       = TLoopList_dump;
   return o;
}

//===========================================================
// <T>确保容量。</T>
//
// @method
// @param v:size:Integer 容量
//===========================================================
function TLoopList_ensureSize(v){
   var o = this;
   var l = v - 1;
   var e = o.start;
   for(var n = 0; n < l; n++){
      if(!e.next){
         e.next = new Object();
         e.value = null;
      }
      e = e.next;
   }
   e.next = o.start;
   o.size = v;
}

//===========================================================
// <T>查找指定索引的节点。</T>
//
// @method
// @param i:index:Integer 要查找的索引
// @return Object 节点
//===========================================================
function TLoopList_find(i){
   var o = this;
   var e = o.start;
   if((i >= 0) && (i < o.count)){
      for(var n = 0; n < o.count; n++){
         if(n == i){
            return e;
         }
         e = e.next;
      }
   }
   return null;
}

//===========================================================
// <T>判断列表是否为空。</T>
//
// @method
// @return Boolean 是否为空
//===========================================================
function TLoopList_isEmpty(){
   return (this.count == 0);
}

//===========================================================
// <T>判断列表是否含有指定的对象。</T>
//
// @method
// @param v:value:Object 对象
// @return Boolean 是否含有
//===========================================================
function TLoopList_contains(v){
   return this.indexOf(v) != -1;
}

//===========================================================
// <T>查找对象索引。</T>
//
// @method
// @param obj:object:Object 对象
// @return Integer 索引位置
//===========================================================
function TLoopList_indexOf(v){
   if(v != null){
      var o = this;
      var c = o.count;
      var e = o.start;
      for(var n = 0; n < c; n++){
         if(e.value == v){
            return n;
         }
         e = e.next;
      }
   }
   return -1;
}

//===========================================================
// <T>取得指定索引的节点值。</T>
//
// @method
// @param idx:index:Integer 要查找的索引
// @return Object 索引的节点对象的值
//===========================================================
function TLoopList_get(i){
   var item = this.find(idx);
   return (item != null) ? item.value : null;
}

//===========================================================
// <T>设置置顶索引的节点值。</T>
//
// @method
// @param idx:index:Integer 要查找的索引
//===========================================================
function TLoopList_set(i, obj){
   var item = this.find(i);
   if(item != null){
      item.value = obj;
   }
}

//===========================================================
// 把这个对象压放到链表的最后
//
// @method
// @param obj:object:Object 压入链表的对象
//===========================================================
function TLoopList_push(obj){
   if(this.count + 1 > this.size){
      this.start.value = obj;
      this.start = this.start.next;
   }else{
      this.set(this.count++, obj);
   }
}

//===========================================================
// 把对象放到链表里。存在就返回存储位置
//
// @method
// @param idx:index:Integer 要查找的索引
// @return Object 索引的节点对象的值
//===========================================================
function TLoopList_sync(obj){
   var idx = this.indexOf(obj);
   return (idx == -1) ? this.push(obj) : idx;
}

//===========================================================
// <T>移除指定索引的存储对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return Object 被删除的对象
//===========================================================
function TLoopList_erase(i){
   var o = this;
   var obj = null;
   var item = this.find(i);
   if(item != null){
      obj = item.value;
      for(var n = idx; n < this.count; n++){
         item.value = item.next.value;
      }
   }
   return obj;
}

//===========================================================
// <T>移除所有指定对象。</T>
//
// @method
// @param v:value:Object 指定对象
//===========================================================
function TLoopList_remove(v){
   var o = this;
   var i = o.indexOf(v);
   if(i != -1){
      o.remove(i);
   }
}

//===========================================================
// <T>清除所有内容。</T>
//
// @method
//===========================================================
function TLoopList_clear(){
   this.count = 0;
}

//===========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//===========================================================
function TLoopList_dump(){
   var o = this;
   var r = new TString();
   var c = this.count;
   r.append(RClass.name(this), ': ', c, '/', o.size);
   var item = o.start;
   for(var n = 0; n < c; n++){
      r.append(' [', item.value, ']');
      item = item.next;
   }
   return r.toString();
}
