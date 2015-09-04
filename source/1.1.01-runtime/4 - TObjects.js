﻿// =========================================================
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
   o.isEmpty    = MO.TObjects_isEmpty;
   o.count      = MO.TObjects_count;
   o.items      = MO.TObjects_items;
   o.contains   = MO.TObjects_contains;
   o.indexOf    = MO.TObjects_indexOf;
   o.first      = MO.TObjects_first;
   o.last       = MO.TObjects_last;
   o.getAt      = MO.TObjects_getAt;
   o.at         = MO.TObjects_getAt;
   o.get        = MO.TObjects_get;
   o.setAt      = MO.TObjects_setAt;
   o.set        = MO.TObjects_set;
   // @method
   o.assign     = MO.TObjects_assign;
   o.append     = MO.TObjects_append;
   o.insert     = MO.TObjects_insert;
   o.shift      = MO.TObjects_shift;
   o.unshift    = MO.TObjects_unshift;
   o.pop        = MO.TObjects_pop;
   o.push       = MO.TObjects_push;
   o.pushUnique = MO.TObjects_pushUnique;
   o.swap       = MO.TObjects_swap;
   o.sort       = MO.TObjects_sort;
   o.erase      = MO.TObjects_erase;
   o.remove     = MO.TObjects_remove;
   o.invoke     = MO.TObjects_invoke;
   o.clear      = MO.TObjects_clear;
   // @method
   o.dispose    = MO.TObjects_dispose;
   o.dump       = MO.TObjects_dump;
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
   var o = this;
   var count = o._count;
   var items = o._items;
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
   var o = this;
   return o._count ? o._items[0] : null;
}

//===========================================================
// <T>获得集合中最后一个对象。</T>
//
// @method
// @return 最后一个对象
//===========================================================
MO.TObjects_last = function TObjects_last(){
   var o = this;
   return o._count ? o._items[o._count - 1] : null;
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
   var o = this;
   return ((index >= 0) && (index < o._count)) ? o._items[index] : null;
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
   var o = this;
   var items = o._items;
   if((index >= 0) && (index < o._count)){
      items[index] = value;
   }
}

//===========================================================
// <T>接收集合全部内容。</T>
//
// @method
// @param values:TObjects 集合
//===========================================================
MO.TObjects_assign = function TObjects_assign(values){
   var o = this;
   var items = o._items;
   var count = o._count = values.count();
   var valueItems = values.items();
   for(var i = 0; i < count; i++){
      items[i] = valueItems[i];
   }
}

//===========================================================
// <T>追加集合全部内容。</T>
//
// @method
// @param values:TObjects 集合
//===========================================================
MO.TObjects_append = function TObjects_append(values){
   var o = this;
   var count = values.count();
   for(var i = 0; i < count; i++){
      o.push(values.at(i));
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
   var o = this;
   var count = o._count;
   var items = o._items;
   if((index >= 0) && (index <= count)){
      for(var i = count; i > index; i--){
         items[i] = items[i - 1];
      }
      items[index] = value;
      o._count++;
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
   var o = this;
   var value = null;
   if(o._count){
      value = o._items[--o._count];
   }
   return value;
}

//===========================================================
// <T>把对象追加到集合的最后位置。</T>
//
// @method
// @param value:Object 对象
// @return Integer 索引值
//===========================================================
MO.TObjects_push = function TObjects_push(value){
   var o = this;
   var index = o._count++;
   o._items[index] = value;
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
   var o = this;
   var index = o.indexOf(value);
   if(index == -1){
      o.push(value);
   }
}

//===========================================================
// <T>在集合中交换两个索引对应的对象。</T>
//
// @method
// @param left:Integer 第一个对象的索引值
// @param right:Integer 第二个对象的索引值
//===========================================================
MO.TObjects_swap = function TObjects_swap(left, right){
   var o = this;
   var count = o._count;
   if((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)){
      var items = o._items;
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
   var o = this;
   var items = o._items;
   if(items.length != o._count){
      items.length = o._count;
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
   var o = this;
   var value = null;
   if((index >= 0) && (index < o._count)){
      var items = o._items;
      value = items[index];
      var count = --o._count;
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
   var o = this;
   var count = o._count;
   if(count){
      var index = 0;
      var items = o._items;
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
      o._count = index;
   }
   return value;
}

//==========================================================
// <T>调用函数处理。</T>
//
// @method
// @param methodName:String 函数名称
// @param parameter1:Object 参数1
// @param parameter2:Object 参数2
// @param parameter3:Object 参数3
// @param parameter4:Object 参数4
// @param parameter5:Object 参数5
//==========================================================
MO.TObjects_invoke = function TObjects_invoke(methodName, parameter1, parameter2, parameter3, parameter4, parameter5){
   var o = this;
   var count = o._count;
   var items = o._items;
   for(var i = 0; i < count; i++){
      var item = items[i];
      var method = item[methodName];
      method.call(item, parameter1, parameter2, parameter3, parameter4, parameter5);
   }
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
   var o = this;
   var items = o._items;
   for(var name in items){
      items[name] = null;
   }
   o._count = 0;
   o._items = null;
}

//===========================================================
// <T>获得运行时信息。</T>
//
// @method
// @return String 运行字符串
//===========================================================
MO.TObjects_dump = function TObjects_dump(){
   var o = this;
   var count = othis._count;
   var result = new MO.TString();
   result.append(MO.Runtime.className(o), ':', count);
   if(count){
      for(var i = 0; i < count; i++){
         result.append(' [', o._items[i], ']');
      }
   }
   return result.flush();
}
