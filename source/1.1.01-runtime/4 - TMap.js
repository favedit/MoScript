//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
MO.TMap = function TMap(){
   var o = this;
   //..........................................................
   // @attribute
   o._count        = 0;
   o._table        = new Object();
   o._names        = new Array();
   o._values       = new Array();
   //..........................................................
   // @method
   o.isEmpty       = MO.TMap_isEmpty;
   o.count         = MO.TMap_count;
   o.contains      = MO.TMap_contains;
   o.containsValue = MO.TMap_containsValue;
   o.indexOf       = MO.TMap_indexOf;
   o.indexOfValue  = MO.TMap_indexOfValue;
   o.first         = MO.TMap_first;
   o.last          = MO.TMap_last;
   o.nameAt        = MO.TMap_nameAt;
   o.name          = MO.TMap_name;
   o.valueAt       = MO.TMap_valueAt;
   o.at            = MO.TMap_valueAt;
   o.value         = MO.TMap_value;
   o.setValueAt    = MO.TMap_setValueAt;
   o.setValue      = MO.TMap_setValue;
   o.get           = MO.TMap_get;
   o.set           = MO.TMap_set;
   o.assign        = MO.TMap_assign;
   o.append        = MO.TMap_append;
   o.insert        = MO.TMap_insert;
   o.remove        = MO.TMap_remove;
   o.removeName    = MO.TMap_removeName;
   o.removeValue   = MO.TMap_removeValue;
   o.rebuild       = MO.TMap_rebuild;
   o.clear         = MO.TMap_clear;
   o.toString      = MO.TMap_toString;
   o.dispose       = MO.TMap_dispose;
   o.dump          = MO.TMap_dump;
   return o;
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.TMap_isEmpty = function TMap_isEmpty(){
   return this._count == 0;
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return 总数
//==========================================================
MO.TMap_count = function TMap_count(){
   return this._count;
}

//==========================================================
// <T>判断是否含有指定的名称。</T>
//
// @method
// @param name:String 名称
// @return Boolean 是否含有
//==========================================================
MO.TMap_contains = function TMap_contains(name){
   if(name != null){
      var index = this._table[name.toString().toLowerCase()]
      if(index != null){
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>判断是否含有指定的内容。</T>
//
// @method
// @param value:Object 内容
// @return Boolean 是否含有
//==========================================================
MO.TMap_containsValue = function TMap_containsValue(value){
   var index = this.indexOfValue(value);
   return (index != -1);
}

//==========================================================
// <T>查找指定名称在表中的索引位置，不存在则返回-1。</T>
//
// @method
// @param name:String 名称
// @return Integer 索引位置
//==========================================================
MO.TMap_indexOf = function TMap_indexOf(name){
   if(name != null){
      var index = this._table[name.toString().toLowerCase()];
      if(index != null){
         return index;
      }
   }
   return -1;
}

//==========================================================
// <T>查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。</T>
//
// @method
// @param value:Object 内容
// @return Integer 索引位置
//==========================================================
MO.TMap_indexOfValue = function TMap_indexOfValue(value){
   var o = this;
   var count = o._count;
   if(count > 0){
      var values = o._values;
      for(var i = 0; i < count; i++){
         if(values[i] == value){
            return i;
         }
      }
   }
   return -1;
}

//==========================================================
// <T>查找第一个内容。</T>
//
// @method
// @return Object 内容
//==========================================================
MO.TMap_first = function TMap_first(){
   var o = this;
   if(o._count > 0){
      return o._values[0];
   }
   return null;
}

//==========================================================
// <T>查找最后一个内容。</T>
//
// @method
// @return Object 内容
//==========================================================
MO.TMap_last = function TMap_last(){
   var o = this;
   if(o._count > 0){
      return o._values[o._count - 1];
   }
   return null;
}

//==========================================================
// <T>根据索引位置获得名称。</T>
//
// @method
// @param index:Integer 索引位置
// @return String 名称
//==========================================================
MO.TMap_nameAt = function TMap_nameAt(index){
   return this._names[index];
}

//==========================================================
// <T>根据索引位置获得名称。</T>
//
// @method
// @param index:Integer 索引位置
// @return String 名称
//==========================================================
MO.TMap_name = function TMap_name(index){
   return ((index >= 0) && (index < this._count)) ? this._names[index] : null;
}

//==========================================================
// <T>根据索引位置获得内容。</T>
//
// @method
// @param index:Integer 索引位置
// @return Object 内容
//==========================================================
MO.TMap_valueAt = function TMap_valueAt(index){
   return this._values[index];
}

//==========================================================
// <T>根据索引位置获得内容。</T>
//
// @method
// @param index:Integer 索引位置
// @return Object 内容
//==========================================================
MO.TMap_value = function TMap_value(index){
   var o = this;
   return ((index >= 0) && (index < o._count)) ? o._values[index] : null;
}

//==========================================================
// <T>根据索引位置设置内容。</T>
//
// @method
// @param index:Integer 索引位置
// @param value:Object 内容
//==========================================================
MO.TMap_setValueAt = function TMap_setValueAt(index, value){
   this._values[index] = value;
}

//==========================================================
// <T>根据索引位置设置内容。</T>
//
// @method
// @param index:Integer 索引位置
// @param value:Object 内容
//==========================================================
MO.TMap_setValue = function TMap_setValue(index, value){
   var o = this;
   if((index >= 0) && (index < o._count)){
      o._values[index] = value;
   }
}

//==========================================================
// <T>根据名称查找内容。</T>
// <P>如果内容不存在，返回默认内容。</P>
//
// @method
// @param name:String 名称
// @param defaultValue:Object 默认内容
// @return Object 内容
//==========================================================
MO.TMap_get = function TMap_get(name, defaultValue){
   var o = this;
   if(name != null){
      var i = o._table[name.toString().toLowerCase()];
      if(i != null){
         return o._values[i];
      }
   }
   return defaultValue;
}

//==========================================================
// <T>根据名称设置内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 默认内容
// @return Object 内容
//==========================================================
MO.TMap_set = function TMap_set(name, value){
   var o = this;
   MO.Assert.debugNotNull(name);
   var nameString = name.toString();
   var code = nameString.toLowerCase();
   var index = o._table[code];
   if((index == null) || (index >= o._count)){
      index = o._count++;
      o._names[index] = nameString;
      o._table[code] = index;
   }
   o._values[index] = value;
}

//==========================================================
// <T>将当前表内容全部置为另一个表的全部内容。</T>
//
// @method
// @param map:TMap 表
//==========================================================
MO.TMap_assign = function TMap_assign(map){
   var o = this;
   o.clear();
   o.append(map);
}

//==========================================================
// <T>在当前表中追加另一个表的全部内容。</T>
//
// @method
// @param map:TMap 表
//==========================================================
MO.TMap_append = function TMap_append(map){
   var o = this;
   if(map){
      var count = map.count();
      for(var i = 0; i < count; i++){
         var name = map.nameAt(i);
         var value = map.valueAt(i);
         o.set(name, value);
      }
   }
}

//==========================================================
// <T>在索引位置插入一个新的名称和内容。</T>
//
// @method
// @param index:Integer 索引位置
// @param name:String 名称
// @param value:Object 内容
//==========================================================
MO.TMap_insert = function TMap_insert(index, name, value){
   var o = this;
   var count = o._count;
   if((index >= 0) && (index <= count)){
      var names = o._names;
      var values = o._values;
      for(var i = count; i > index; i--){
         names[i] = names[i - 1];
         values[i] = values[i - 1];
      }
      names[index] = name;
      values[index] = value;
      o._count++;
      o.rebuild();
   }
}

//==========================================================
// <T>删除索引位置的内容。</T>
//
// @method
// @param index:Integer 索引位置
// @return Object 删除的内容
//==========================================================
MO.TMap_remove = function TMap_remove(index){
   var o = this;
   var value = null;
   var count = o._count;
   if((index >= 0) && (index < count)){
      var names = o._names;
      var values = o._values;
      value = values[index];
      for(var i = index; i < count; i++){
         names[i] = names[i + 1];
         values[i] = values[i + 1];
      }
      o._count--;
      o.rebuild();
   }
   return value;
}

//==========================================================
// <T>删除指定名称的内容。</T>
//
// @method
// @param name:String 名称
// @return Object 删除的内容
//==========================================================
MO.TMap_removeName = function TMap_removeName(name){
   var o = this;
   var index = o.indexOf(name);
   if(index != -1){
      return o.remove(index);
   }
   return null;
}

//==========================================================
// <T>删除指定的内容。</T>
//
// @method
// @param value:Object 内容
//==========================================================
MO.TMap_removeValue = function TMap_removeValue(value){
   var o = this;
   var index = 0;
   var count = o._count;
   var names = o._names;
   var values = o._values;
   for(var i = 0; i < count; i++){
      var find = values[i];
      if(find != value){
         if(index != i){
            names[index] = names[i];
            values[index] = find;
         }
         index++;
      }
   }
   o._count = index;
   o.rebuild();
}

//==========================================================
// <T>根据对象内名称数组和内容数组重新建立对照表。</T>
//
// @method
//==========================================================
MO.TMap_rebuild = function TMap_rebuild(){
   var o = this;
   // 清除对照表数据
   var table = o._table;
   for(var name in table){
      delete table[name];
   }
   // 重建对照表数据
   var count = o._count;
   var names = o._names;
   for(var i = 0; i < count; i++){
      var code = names[i].toLowerCase();
      table[code] = i;
   }
}

//==========================================================
// <T>清除所有内容。</T>
//
// @method
//==========================================================
MO.TMap_clear = function TMap_clear(){
   var o = this;
   o._count = 0;
   // 清除对照表数据
   var table = o._table;
   for(var name in table){
      delete table[name];
   }
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 信息字符串
//==========================================================
MO.TMap_toString = function TMap_toString(){
   return this.dump().toString();
}

//==========================================================
// <T>释放所有内容。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.TMap_dispose = function TMap_dispose(flag){
   var o = this;
   var count = o._count;
   // 清除对照表数据
   var table = o._table;
   if(table){
      for(var name in table){
         table[name] = null;
      }
      o._table = null;
   }
   // 清空名称集合
   var names = o._names;
   if(names){
      for(var i = 0; i < count; i++){
         names[i] = null;
      }
      o._names = null;
   }
   // 清空数据集合
   var values = o._values;
   if(values){
      for(var i = 0; i < count; i++){
         if(flag){
            MO.Lang.Object.dispose(values[i]);
         }
         values[i] = null;
      }
      o._values = null;
   }
   // 清空属性
   o._count = 0;
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TMap_dump = function TMap_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._count;
   result.appendLine(MO.Runtime.className(o), ': ', count);
   if(count > 0){
      var names = o._names;
      var values = o._values;
      result.append(' {');
      for(var i = 0; i < count; i++){
         result.appendLine(names[i], '=[', values[i], ']');
      }
      result.append('}');
   }
   return result.flush();
}
