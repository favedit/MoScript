with(MO){
   // =========================================================
   // <T>对象集合。</T>
   //
   // @tool
   // @author maocy
   // @version 141230
   // =========================================================
   MO.TObjects = function TObjects(){
      var o = this;
      //..........................................................
      // @attribute
      o._count     = 0;
      o._items     = new Array();
      //..........................................................
      // @method
      o.isEmpty    = TObjects_isEmpty;
      o.count      = TObjects_count;
      o.items      = TObjects_items;
      o.contains   = TObjects_contains;
      o.indexOf    = TObjects_indexOf;
      o.first      = TObjects_first;
      o.last       = TObjects_last;
      o.getAt      = TObjects_getAt;
      o.at         = TObjects_getAt;
      o.get        = TObjects_get;
      o.setAt      = TObjects_setAt;
      o.set        = TObjects_set;
      // @method
      o.assign     = TObjects_assign;
      o.append     = TObjects_append;
      o.insert     = TObjects_insert;
      o.shift      = TObjects_shift;
      o.unshift    = TObjects_unshift;
      o.pop        = TObjects_pop;
      o.push       = TObjects_push;
      o.pushUnique = TObjects_pushUnique;
      o.swap       = TObjects_swap;
      o.sort       = TObjects_sort;
      o.erase      = TObjects_erase;
      o.remove     = TObjects_remove;
      o.clear      = TObjects_clear;
      // @method
      o.dispose    = TObjects_dispose;
      o.dump       = TObjects_dump;
      return o;
   }

   //===========================================================
   // <T>判断集合是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //===========================================================
   MO.TObjects_isEmpty = function TObjects_isEmpty(){
      return (this._count == 0);
   }

   //===========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return Integer 总数
   //===========================================================
   MO.TObjects_count = function TObjects_count(){
      return this._count;
   }

   //===========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Array 数据
   //===========================================================
   MO.TObjects_items = function TObjects_items(){
      return this._items;
   }

   //===========================================================
   // <T>判断集合是否含有指定的对象。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Boolean 是否含有
   //===========================================================
   MO.TObjects_contains = function TObjects_contains(value){
      return this.indexOf(value) != -1;
   }

   //===========================================================
   // <T>查找指定对象在集合中的索引位置，不存在则返回-1。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Integer 索引位置
   //===========================================================
   MO.TObjects_indexOf = function TObjects_indexOf(value){
      var count = this._count;
      var items = this._items;
      for(var i = 0; i < count; i++){
         if(items[i] == value){
            return i;
         }
      }
      return -1;
   }

   //===========================================================
   // <T>获得集合中第一个对象。</T>
   //
   // @method
   // @return 第一个对象
   //===========================================================
   MO.TObjects_first = function TObjects_first(){
      return this._count ? this._items[0] : null;
   }

   //===========================================================
   // <T>获得集合中最后一个对象。</T>
   //
   // @method
   // @return 最后一个对象
   //===========================================================
   MO.TObjects_last = function TObjects_last(){
      return this._count ? this._items[this._count - 1] : null;
   }

   //===========================================================
   // <T>取得指定索引对应的对象。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return 当前位置上的对象
   //===========================================================
   MO.TObjects_getAt = function TObjects_getAt(index){
      return this._items[index];
   }

   //===========================================================
   // <T>取得指定索引对应的对象。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return 当前位置上的对象
   //===========================================================
   MO.TObjects_get = function TObjects_get(index){
      return ((index >= 0) && (index < this._count)) ? this._items[index] : null;
   }

   //===========================================================
   // <T>把对象存储在指定的索引处。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 对象
   //===========================================================
   MO.TObjects_setAt = function TObjects_setAt(index, value){
      this._items[index] = value;
   }

   //===========================================================
   // <T>把对象存储在指定的索引处。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @param value:Object 对象
   //===========================================================
   MO.TObjects_set = function TObjects_set(index, value){
      if((index >= 0) && (index < this._count)){
         this._items[index] = v;
      }
   }

   //===========================================================
   // <T>接收集合全部内容。</T>
   //
   // @method
   // @param values:TObjects 集合
   //===========================================================
   MO.TObjects_assign = function TObjects_assign(values){
      var count = this._count = values._count;
      for(var i = 0; i < count; i++){
         this._items[i] = values._items[i];
      }
   }

   //===========================================================
   // <T>追加集合全部内容。</T>
   //
   // @method
   // @param values:TObjects 集合
   //===========================================================
   MO.TObjects_append = function TObjects_append(values){
      var count = values._count;
      for(var i = 0; i < count; i++){
         this.push(values.at(i));
      }
   }

   //===========================================================
   //<T>把对象插入在指定的索引处。</T>
   //
   //@method
   //@param index:Integer 索引位置
   //@param value:Object 对象
   //===========================================================
   MO.TObjects_insert = function TObjects_insert(index, value){
      var count = this._count;
      if((index >= 0) && (index <= count)){
         for(var i = count; i > index; i--){
            this._items[i] = this._items[i - 1];
         }
         this._items[index] = value;
      }
   }

   //===========================================================
   // <T>弹出首对象。</T>
   //
   // @method
   // @return Object 对象
   //===========================================================
   MO.TObjects_shift = function TObjects_shift(){
      return this.erase(0);
   }

   //===========================================================
   // <T>压入首对象。</T>
   //
   // @method
   // @param value:Object 对象
   //===========================================================
   MO.TObjects_unshift = function TObjects_unshift(value){
      return this.insert(0, value);
   }

   //===========================================================
   // <T>将最后一个对象弹出集合。</T>
   //
   // @method
   // @return Object 对象
   //===========================================================
   MO.TObjects_pop = function TObjects_pop(){
      if(this._count){
         return this._items[--this._count];
      }
   }

   //===========================================================
   // <T>把对象追加到集合的最后位置。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Integer 索引值
   //===========================================================
   MO.TObjects_push = function TObjects_push(value){
      var index = this._count++;
      this._items[index] = value;
      return index;
   }

   //===========================================================
   // <T>把唯一对象追加到集合的最后位置。</T>
   //
   // @method
   // @param value:Object 对象
   // @return Integer 索引值
   //===========================================================
   MO.TObjects_pushUnique = function TObjects_pushUnique(value){
      // 查询存在性
      for(var i = this._count - 1; i >= 0; i--){
         if(this._items[i] == v){
            return i;
         }
      }
      // 追加到尾部
      var index = this._count++;
      this._items[index] = value;
      return index;
   }

   //===========================================================
   // <T>在集合中交换两个索引对应的对象。</T>
   //
   // @method
   // @param left:Integer 第一个对象的索引值
   // @param right:Integer 第二个对象的索引值
   //===========================================================
   MO.TObjects_swap = function TObjects_swap(left, right){
      if((left >= 0) && (left < this._count) && (right >= 0) && (right < this._count) && (left != right)){
         var items = this._items;
         var value = items[left];
         items[left] = items[right];
         items[right] = value;
      }
   }

   //===========================================================
   // <T>对集合内容进行排序。</T>
   //
   // @method
   // @param callback:Function 排序函数
   //===========================================================
   MO.TObjects_sort = function TObjects_sort(callback){
      var items = this._items;
      if(items.length != this._count){
         items.length = this._count;
      }
      // 排序处理
      items.sort(callback);
   }

   //===========================================================
   // <T>移除指定索引的存储对象。</T>
   //
   // @method
   // @param index:Integer 索引位置
   // @return Object 被删除的对象
   //===========================================================
   MO.TObjects_erase = function TObjects_erase(index){
      var value = null;
      if((index >= 0) && (index < this._count)){
         value = this._items[index];
         var count = --this._count;
         var items = this._items;
         for(var i = index; i < count; i++){
            items[i] = items[i+1];
         }
         items[count] = null;
      }
      return value;
   }

   //===========================================================
   // <T>移除所有指定对象。</T>
   //
   // @method
   // @param value:Object 指定对象
   //===========================================================
   MO.TObjects_remove = function TObjects_remove(value){
      var count = this._count;
      if(count){
         var index = 0;
         var items = this._items;
         // 移除对象
         for(var i = index; i < count; i++){
            if(items[i] != value){
               items[index++] = items[i];
            }
         }
         // 清除尾部
         for(var i = index; i < count; i++){
            items[i] = null;
         }
         // 设置大小
         this._count = index;
      }
      return value;
   }

   //===========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //===========================================================
   MO.TObjects_clear = function TObjects_clear(){
      this._count = 0;
   }

   //===========================================================
   // <T>释放处理。</T>
   //
   // @method
   //===========================================================
   MO.TObjects_dispose = function TObjects_dispose(){
      for(var name in this._items){
         this._items[name] = null;
      }
      this._count = 0;
      this._items = null;
   }

   //===========================================================
   // <T>获得运行时信息。</T>
   //
   // @method
   // @return String 运行字符串
   //===========================================================
   MO.TObjects_dump = function TObjects_dump(){
      var count = this._count;
      var info = new TString();
      info.append(RRuntime.className(o), ':', count);
      if(count){
         for(var i = 0; i < count; i++){
            info.append(' [', this._items[i], ']');
         }
      }
      return info.flush();
   }
}
