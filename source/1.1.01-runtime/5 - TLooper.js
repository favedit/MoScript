with(MO){
   //==========================================================
   // <T>自循环链表。</T>
   //
   // @tool
   // @author maocy
   // @version 150110
   //==========================================================
   MO.TLooper = function TLooper(){
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
   MO.TLooper_innerPush = function TLooper_innerPush(entry){
      var current = this._current;
      if(current){
         var prior = current.prior;
         entry.prior = prior;
         entry.next = current;
         prior.next = entry;
         current.prior = entry;
      }else{
         entry.prior = entry;
         entry.next = entry;
         this._current = entry;
      }
      this._count++;
   }

   //==========================================================
   // <T>内部移除一个节点。</T>
   //
   // @method
   // @param entry:SLooperEntry 节点
   //==========================================================
   MO.TLooper_innerRemove = function TLooper_innerRemove(entry){
      // 删除入口
      var prior = entry.prior;
      var next = entry.next;
      prior.next = next;
      next.prior = prior;
      // 设置数据
      this._count--;
      if(this._count > 0){
         this._current = next;
      }else{
         this._current = null;
      }
      // 释放入口
      MO.Memory.free(entry);
   }

   //==========================================================
   // <T>内部移除当前节点。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   MO.TLooper_innerRemoveCurrent = function TLooper_innerRemoveCurrent(){
      var value = null;
      if(this._count > 0){
         // 获得内容
         var current = this._current;
         value = current.value;
         // 移除节点
         this.innerRemove(current);
      }
      return value;
   }

   //==========================================================
   // <T>内部移除指定对象的节点。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   MO.TLooper_innerRemoveValue = function TLooper_innerRemoveValue(value){
      if(this._count > 0){
         // 删除首个对象
         if(this._current.value == value){
            this.innerRemoveCurrent();
            return;
         }
         // 删除其他对象
         var current = this._current;
         var entry = current.next;
         while(entry != current){
            if(entry.value == value){
               this.innerRemove(entry);
               // 重置到原始位置
               this._current = current;
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
   MO.TLooper_isEmpty = function TLooper_isEmpty(){
      return this._count == 0;
   }

   //==========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return Integer 总数
   //==========================================================
   MO.TLooper_count = function TLooper_count(){
      return this._count;
   }

   //==========================================================
   // <T>记录当前刻录点。</T>
   //
   // @method
   //==========================================================
   MO.TLooper_record = function TLooper_record(){
      this._recordCount = this._count;
   }

   //==========================================================
   // <T>消除当前刻录点。</T>
   //
   // @method
   //==========================================================
   MO.TLooper_unrecord = function TLooper_unrecord(v){
      this._recordCount = -1;
   }

   //==========================================================
   // <T>判断是否含有指定对象。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Boolean 是否含有
   //==========================================================
   MO.TLooper_contains = function TLooper_contains(value){
      if(this._current){
         var entry = this._current;
         var count = this._count;
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
   MO.TLooper_current = function TLooper_current(){
      var entry = this._current;
      return entry ? entry.value : null;
   }

   //==========================================================
   // <T>获得下个对象。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   MO.TLooper_next = function TLooper_next(){
      // 移动当前点
      if(this._current){
         this._current = this._current.next;
      }
      // 检查刻录点（当只有一个元素时，刻录点无效）
      var c = this._recordCount;
      if(c > 0){
         this._recordCount--;
      }else if(c == 0){
         return null;
      }
      // 返回内容
      return this._current ? this._current.value : null;
   }

   //==========================================================
   // <T>增加一个对象到尾部。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   MO.TLooper_push = function TLooper_push(value){
      var entry = MO.Memory.alloc(SLooperEntry);
      entry.value = value;
      this.innerPush(entry);
   }

   //==========================================================
   // <T>插入一个唯一内容到尾部。</T>
   //
   // @method
   // @param value:Object 对象
   //==========================================================
   MO.TLooper_pushUnique = function TLooper_pushUnique(value){
      if(!this.contains(value)){
         this.push(value);
      }
   }

   //==========================================================
   // <T>移除当前的节点，并返回该元素的对象。</T>
   //
   // @method
   // @return Object 对象
   //==========================================================
   MO.TLooper_removeCurrent = function TLooper_removeCurrent(){
      return this.innerRemoveCurrent();
   }

   //==========================================================
   // <T>移除所有指定对象。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.TLooper_remove = function TLooper_remove(p){
      this.innerRemoveValue(p);
   }

   //==========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //==========================================================
   MO.TLooper_clear = function TLooper_clear(){
      // 释放所有节点
      var entry = this._current;
      if(entry){
         entry.prior.next = null;
         while(entry){
            var next = entry.next;
            MO.Memory.free(next);
            entry = next;
         }
      }
      // 释放属性
      this._count = 0;
      this._current = null;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.TLooper_dispose = function TLooper_dispose(){
      this.clear();
   }

   //==========================================================
   // <T>获得运行时信息。</T>
   //
   // @method
   // @return String 运行字符串
   //==========================================================
   MO.TLooper_dump = function TLooper_dump(){
      var count = this._count;
      var info = new TString();
      info.append(RClass.name(this), ': ', count);
      if(count > 0){
         var entry = this._current;
         for(var i = 0; i < count; i++){
            info.append(' [', entry.value, ']');
            entry = entry.next;
         }
      }
      return info.flush();
   }
}
