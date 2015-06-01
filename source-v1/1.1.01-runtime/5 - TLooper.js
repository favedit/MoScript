//==========================================================
// <T>自循环链表。</T>
//
// @tool
// @author maocy
// @version 150110
//==========================================================
function TLooper(){
   var o = this;
   //..........................................................
   // @attribute
   o._count             = 0;
   o._recordCount       = 0;
   o._current           = null;
   //..........................................................
   // @method
   o.innerPush          = TLooper_innerPush;
   o.innerRemove        = TLooper_innerRemove;
   o.innerRemoveCurrent = TLooper_innerRemoveCurrent;
   o.innerRemoveValue   = TLooper_innerRemoveValue;
   // @method
   o.isEmpty            = TLooper_isEmpty;
   o.count              = TLooper_count;
   o.record             = TLooper_record;
   o.unrecord           = TLooper_unrecord;
   o.contains           = TLooper_contains;
   o.current            = TLooper_current;
   o.next               = TLooper_next;
   o.push               = TLooper_push;
   o.pushUnique         = TLooper_pushUnique;
   o.removeCurrent      = TLooper_removeCurrent;
   o.remove             = TLooper_remove;
   o.clear              = TLooper_clear;
   o.dispose            = TLooper_dispose;
   o.dump               = TLooper_dump;
   return o;
}

//==========================================================
// <T>内部增加一个节点。</T>
//
// @method
// @param entry:SLooperEntry 节点
//==========================================================
function TLooper_innerPush(entry){
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

//==========================================================
// <T>内部移除一个节点。</T>
//
// @method
// @param entry:SLooperEntry 节点
//==========================================================
function TLooper_innerRemove(entry){
   var o = this;
   // 删除入口
   var prior = entry.prior;
   var next = entry.next;
   prior.next = next;
   next.prior = prior;
   // 设置数据
   o._count--;
   if(o._count > 0){
      o._current = next;
   }else{
      o._current = null;
   }
   // 释放入口
   RMemory.free(entry);
}

//==========================================================
// <T>内部移除当前节点。</T>
//
// @method
// @return Object 对象
//==========================================================
function TLooper_innerRemoveCurrent(){
   var o = this;
   var value = null;
   if(o._count > 0){
      // 获得内容
      var current = o._current;
      value = current.value;
      // 移除节点
      o.innerRemove(current);
   }
   return value;
}

//==========================================================
// <T>内部移除指定对象的节点。</T>
//
// @method
// @param value:Object 对象
//==========================================================
function TLooper_innerRemoveValue(value){
   if(o._count > 0){
      // 删除首个对象
      if(o._current.value == value){
         o.innerRemoveCurrent();
         return;
      }
      // 删除其他对象
      var current = o._current;
      var entry = current.next;
      while(entry != current){
         if(entry.value == value){
            o.innerRemove(entry);
            // 重置到原始位置
            o._current = current;
            return;
         }
         entry = entry.next;
      }
   }
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return 是否为空
//==========================================================
function TLooper_isEmpty(){
   return this._count == 0;
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
function TLooper_count(){
   return this._count;
}

//==========================================================
// <T>记录当前刻录点。</T>
//
// @method
//==========================================================
function TLooper_record(){
   this._recordCount = this._count;
}

//==========================================================
// <T>消除当前刻录点。</T>
//
// @method
//==========================================================
function TLooper_unrecord(v){
   this._recordCount = -1;
}

//==========================================================
// <T>判断是否含有指定对象。</T>
//
// @method
// @param value:Object 对象
// @return Boolean 是否含有
//==========================================================
function TLooper_contains(value){
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

//==========================================================
// <T>获得当前对象。</T>
//
// @method
// @return Object 对象
//==========================================================
function TLooper_current(){
   var entry = this._current;
   return entry ? entry.value : null;
}

//==========================================================
// <T>获得下个对象。</T>
//
// @method
// @return Object 对象
//==========================================================
function TLooper_next(){
   var o = this;
   // 移动当前点
   if(o._current){
      o._current = o._current.next;
   }
   // 检查刻录点（当只有一个元素时，刻录点无效）
   var c = o._recordCount;
   if(c > 0){
      o._recordCount--;
   }else if(c == 0){
      return null;
   }
   // 返回内容
   return o._current ? o._current.value : null;
}

//==========================================================
// <T>增加一个对象到尾部。</T>
//
// @method
// @param value:Object 对象
//==========================================================
function TLooper_push(value){
   var o = this;
   var entry = RMemory.alloc(SLooperEntry);
   entry.value = value;
   o.innerPush(entry);
}

//==========================================================
// <T>插入一个唯一内容到尾部。</T>
//
// @method
// @param value:Object 对象
//==========================================================
function TLooper_pushUnique(value){
   var o = this;
   if(!o.contains(value)){
      o.push(value);
   }
}

//==========================================================
// <T>移除当前的节点，并返回该元素的对象。</T>
//
// @method
// @return Object 对象
//==========================================================
function TLooper_removeCurrent(){
   return this.innerRemoveCurrent();
}

//==========================================================
// <T>移除所有指定对象。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function TLooper_remove(p){
   this.innerRemoveValue(p);
}

//==========================================================
// <T>清除所有内容。</T>
//
// @method
//==========================================================
function TLooper_clear(){
   var o = this;
   // 释放所有节点
   var entry = o._current;
   if(entry){
      entry.prior.next = null;
      while(entry){
         var next = entry.next;
         RMemory.free(next);
         entry = next;
      }
   }
   // 释放属性
   o._count = 0;
   o._current = null;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function TLooper_dispose(){
   this.clear();
}

//==========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//==========================================================
function TLooper_dump(){
   var o = this;
   var count = o._count;
   var result = new TString();
   result.append(RClass.name(this), ': ', count);
   if(count > 0){
      var entry = o._current;
      for(var i = 0; i < count; i++){
         result.append(' [', entry.value, ']');
         entry = entry.next;
      }
   }
   return result.flush();
}
