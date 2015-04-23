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
   o._unused            = null;
   //..........................................................
   // @method
   o.innerCreate        = TLooper_innerCreate;
   o.innerFree          = TLooper_innerFree;
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
// <T>内部创建一个节点。</T>
//
// @method
// @return SLooperEntry 节点
//==========================================================
function TLooper_innerCreate(){
   var o = this;
   var e = o._unused;
   if(e == null){
      e = new SLooperEntry();
   }else{
      o._unused = e.next;
   }
   return e;
}

//==========================================================
// <T>内部释放一个节点。</T>
//
// @method
// @param p:entry:SLooperEntry 节点
//==========================================================
function TLooper_innerFree(p){
   var o = this;
   p.next = o._unused;
   o._unused = p;
}

//==========================================================
// <T>内部增加一个节点。</T>
//
// @method
// @param p:entry:SLooperEntry 节点
//==========================================================
function TLooper_innerPush(p){
   var o = this;
   var ec = o._current;
   if(ec){
      var ep = ec.prior;
      p.prior = ep;
      p.next = ec;
      ep.next = p;
      ec.prior = p;
   }else{
      p.prior = p;
      p.next = p;
      o._current = p;
   }
   o._count++;
}

//==========================================================
// <T>内部移除一个节点。</T>
//
// @method
// @param p:entry:SLooperEntry 节点
//==========================================================
function TLooper_innerRemove(p){
   var o = this;
   // 删除入口
   var ep = p.prior;
   var en = p.next;
   ep.next = en;
   en.prior = ep;
   // 设置数据
   o._count--;
   if(o._count > 0){
      o._current = en;
   }else{
      o._current = null;
   }
   // 释放入口
   o.innerFree(p);
}

//==========================================================
// <T>内部移除当前节点。</T>
//
// @method
// @return Object 对象
//==========================================================
function TLooper_innerRemoveCurrent(){
   var o = this;
   var r = null;
   if(o._count > 0){
      // 获得内容
      r = o._current.value;
      // 移除节点
      o.innerRemove(o._current);
   }
   return r;
}

//==========================================================
// <T>内部移除指定对象的节点。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function TLooper_innerRemoveValue(p){
   if(o._count > 0){
      // 删除首个对象
      if(o._current.value == p){
         o.innerRemoveCurrent();
         return;
      }
      // 删除其他对象
      var ec = o._current;
      var en = ec.next;
      while(en != ec){
         if(en.value == p){
            o.innerRemove(en);
            // 重置到原始位置
            o._current = ec;
            return;
         }
         en = en.next;
      }
   }
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return 是否为空
//==========================================================
function TLooper_isEmpty(v){
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
// @param p:value:Object 对象
// @return Boolean 是否含有
//==========================================================
function TLooper_contains(p){
   var o = this;
   if(o._current){
      var c = o._count;
      var e = o._current;
      for(var i = 0; i < c; i++){
         if(e.value == p){
            return true;
         }
         e = e.next;
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
   var e = this._current;
   return e ? e.value : null;
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
// @param p:value:Object 对象
//==========================================================
function TLooper_push(p){
   var o = this;
   var e = o.innerCreate();
   e.value = p;
   o.innerPush(e);
}

//==========================================================
// <T>插入一个唯一内容到尾部。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function TLooper_pushUnique(p){
   var o = this;
   if(!o.contains(p)){
      o.push(p);
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
   var c = o._current;
   if(c){
      c.prior.next = null;
      c.prior = o._unused;
      o._unused = c;
      o._current = null;
   }
   o._count = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function TLooper_dispose(){
   var o = this;
   // 清空处理
   o.clear();
   // 释放所有节点
   var e = o._unused;
   while(e){
      var n = e.next;
      e.dispose();
      e = n;
   }
   o._unused = null;
}

//==========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//==========================================================
function TLooper_dump(){
   var o = this;
   var c = o._count;
   var r = new TString();
   r.append(RClass.name(this), ': ', c);
   if(c > 0){
      var e = o._current;
      for(var i = 0; i < c; i++){
         r.append(' [', e.value, ']');
         e = e.next;
      }
   }
   return r.toString();
}
