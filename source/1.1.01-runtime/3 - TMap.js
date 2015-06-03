with(MO){
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
      o.isEmpty       = TMap_isEmpty;
      o.count         = TMap_count;
      o.contains      = TMap_contains;
      o.containsValue = TMap_containsValue;
      o.indexOf       = TMap_indexOf;
      o.indexOfValue  = TMap_indexOfValue;
      o.first         = TMap_first;
      o.last          = TMap_last;
      o.nameAt        = TMap_nameAt;
      o.name          = TMap_name;
      o.valueAt       = TMap_valueAt;
      o.at            = TMap_valueAt;
      o.value         = TMap_value;
      o.setValueAt    = TMap_setValueAt;
      o.setValue      = TMap_setValue;
      o.get           = TMap_get;
      o.set           = TMap_set;
      o.assign        = TMap_assign;
      o.append        = TMap_append;
      o.insert        = TMap_insert;
      o.remove        = TMap_remove;
      o.removeName    = TMap_removeName;
      o.removeValue   = TMap_removeValue;
      o.rebuild       = TMap_rebuild;
      o.clear         = TMap_clear;
      o.toString      = TMap_toString;
      o.dispose       = TMap_dispose;
      o.dump          = TMap_dump;
      return o;
   }

   //==========================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   MO.TMap_isEmpty = function TMap_isEmpty(){
      return (this._count == 0);
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
      var count = this._count;
      for(var i = 0; i < count; i++){
         if(this._values[n] == value){
            return n;
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
      if(this._count > 0){
         return this._values[0];
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
      if(this._count > 0){
         return this._values[this._count - 1];
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
      return ((index >= 0) && (index < this._count)) ? this._values[index] : null;
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
      if((index >= 0) && (index < this._count)){
         this._values[index] = value;
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
      if(name != null){
         var i = this._table[name.toString().toLowerCase()];
         if(i != null){
            return this._values[i];
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
      if(name != null){
         var code = name.toString().toLowerCase();
         var index = this._table[code];
         if((index == null) || (index >= this._count)){
            index = this._count++;
            this._names[index] = name;
            this._table[code] = index;
         }
         this._values[index] = value;
      }
   }

   //==========================================================
   // <T>将当前表内容全部置为另一个表的全部内容。</T>
   //
   // @method
   // @param map:TMap 表
   //==========================================================
   MO.TMap_assign = function TMap_assign(map){
      this.clear();
      this.append(map);
   }

   //==========================================================
   // <T>在当前表中追加另一个表的全部内容。</T>
   //
   // @method
   // @param map:TMap 表
   //==========================================================
   MO.TMap_append = function TMap_append(map){
      if(map){
         var count = map.count();
         for(var i = 0; i < count; i++){
            var name = map.nameAt(i);
            var value = map.valueAt(i);
            this.set(name, value);
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
      var count = this._count;
      if((index >= 0) && (index <= count)){
         for(var i = count; i > index; i--){
            this._names[i] = this._names[i - 1];
            this._values[i] = this._values[i - 1];
         }
         this._names[index] = name;
         this._values[index] = value;
         this._count++;
         this.rebuild();
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
      var value = null;
      var count = this._count;
      if((index >= 0) && (index < count)){
         value = this._values[index];
         for(var i = index; i < count; i++){
            this._names[i] = this._names[i + 1];
            this._values[i] = this._values[i + 1];
         }
         this._count--;
         this.rebuild();
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
      var index = this.indexOf(name);
      if(index != -1){
         return this.remove(index);
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
      var index = 0;
      var count = this._count;
      for(var i = 0; i < count; i++){
         var find = this._values[i];
         if(find != value){
            if(index != i){
               this._names[index] = this._names[i];
               this._values[index] = find;
            }
            index++;
         }
      }
      this._count = index;
      this.rebuild();
   }

   //==========================================================
   // <T>根据对象内名称数组和内容数组重新建立对照表。</T>
   //
   // @method
   //==========================================================
   MO.TMap_rebuild = function TMap_rebuild(){
      // 清除对照表数据
      var table = this._table;
      for(var name in table){
         delete table[name];
      }
      // 重建对照表数据
      var count = this._count;
      for(var i = 0; i < count; i++){
         var code = this._names[i].toLowerCase();
         table[code] = i;
      }
   }

   //==========================================================
   // <T>清除所有内容。</T>
   //
   // @method
   //==========================================================
   MO.TMap_clear = function TMap_clear(){
      this._count = 0;
      // 清除对照表数据
      for(var name in this._table){
         delete this._table[name];
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
   //==========================================================
   MO.TMap_disposeAll = function TMap_disposeAll(){
   }

   //==========================================================
   // <T>释放所有内容。</T>
   //
   // @method
   // @param flag:Boolean 标志
   //==========================================================
   MO.TMap_dispose = function TMap_dispose(flag){
      // 释放所有数据
      if(flag){
         var count = this._count;
         var values = this._values;
         for(var i = 0; i < count; i++){
            var value = values[i];
            values[i] = RObject.dispose(value);
         }
      }
      //..........................................................
      // 清除对照表数据
      var table = this._table;
      if(table){
         for(var name in table){
            table[name] = null;
         }
         this._table = null;
      }
      // 清空名称集合
      var names = this._names;
      if(names){
         for(var i = names.length - 1; i >= 0; i--){
            names[i] = null;
         }
         this._names = null;
      }
      // 清空数据集合
      var values = this._values;
      if(values){
         for(var i = values.length - 1; i >= 0; i--){
            values[i] = null;
         }
         this._values = null;
      }
      // 清空属性
      this._count = 0;
   }

   //==========================================================
   // <T>获得数组的内部信息。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   MO.TMap_dump = function TMap_dump(){
      var info = new TString();
      var count = this._count;
      info.appendLine(MO.Runtime.className(o), ': ', count);
      if(count > 0){
         info.append(' {');
         for(var i = 0; i < count; i++){
            info.appendLine(this._names[i], '=[', this._values[i], ']');
         }
         info.append('}');
      }
      return info.flush();
   }
}
