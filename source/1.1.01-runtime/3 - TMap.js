//==========================================================
// <T>名称和内容的关联保存表的工具类。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
function TMap(){
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
function TMap_isEmpty(){
   return (this._count == 0);
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return 总数
//==========================================================
function TMap_count(){
   return this._count;
}

//==========================================================
// <T>判断是否含有指定的名称。</T>
//
// @method
// @param n:name:String 名称
// @return Boolean 是否含有
//==========================================================
function TMap_contains(n){
   if(n != null){
      var i = this._table[n.toString().toLowerCase()]
      if(i != null){
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>判断是否含有指定的内容。</T>
//
// @method
// @param v:value:Object 内容
// @return Boolean 是否含有
//==========================================================
function TMap_containsValue(v){
   var i = this.indexOfValue(v);
   return (i != -1);
}

//==========================================================
// <T>查找指定名称在表中的索引位置，不存在则返回-1。</T>
//
// @method
// @param n:name:String 名称
// @return Integer 索引位置
//==========================================================
function TMap_indexOf(n){
   if(n != null){
      var i = this._table[n.toString().toLowerCase()];
      if(i != null){
         return i;
      }
   }
   return -1;
}

//==========================================================
// <T>查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。</T>
//
// @method
// @param v:value:Object 内容
// @return Integer 索引位置
//==========================================================
function TMap_indexOfValue(v){
   var o = this;
   var c = o._count;
   for(var n = 0; n < c; n++){
      if(o._values[n] == v){
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
function TMap_first(){
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
function TMap_last(){
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
// @param n:index:Integer 索引位置
// @return String 名称
//==========================================================
function TMap_nameAt(n){
   return this._names[n];
}

//==========================================================
// <T>根据索引位置获得名称。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return String 名称
//==========================================================
function TMap_name(n){
   return ((n >= 0) && (n < this._count)) ? this._names[n] : null;
}

//==========================================================
// <T>根据索引位置获得内容。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return Object 内容
//==========================================================
function TMap_valueAt(n){
   return this._values[n];
}

//==========================================================
// <T>根据索引位置获得内容。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return Object 内容
//==========================================================
function TMap_value(n){
   return ((n >= 0) && (n < this._count)) ? this._values[n] : null;
}

//==========================================================
// <T>根据索引位置设置内容。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 内容
//==========================================================
function TMap_setValueAt(n, v){
   this._values[n] = v;
}

//==========================================================
// <T>根据索引位置设置内容。</T>
//
// @method
// @param n:index:Integer 索引位置
// @param v:value:Object 内容
//==========================================================
function TMap_setValue(n, v){
   if((n >= 0) && (n < this._count)){
      this._values[n] = v;
   }
}

//==========================================================
// <T>根据名称查找内容。</T>
// <P>如果内容不存在，返回默认内容。</P>
//
// @method
// @param n:name:String 名称
// @param v:value:Object 默认内容
// @return Object 内容
//==========================================================
function TMap_get(n, v){
   if(n != null){
      var o = this;
      var i = o._table[n.toString().toLowerCase()];
      if(i != null){
         return o._values[i];
      }
   }
   return v;
}

//==========================================================
// <T>根据名称设置内容。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:Object 默认内容
// @return Object 内容
//==========================================================
function TMap_set(n, v){
   if(n != null){
      var o = this;
      var l = n.toString().toLowerCase();
      var i = o._table[l];
      if((i == null) || (i >= o._count)){
         i = o._count++;
         o._names[i] = n;
         o._table[l] = i;
      }
      o._values[i] = v;
   }
}

//==========================================================
// <T>将当前表内容全部置为另一个表的全部内容。</T>
//
// @method
// @param m:map:TMap 表
//==========================================================
function TMap_assign(m){
   this.clear();
   this.append(m);
}

//==========================================================
// <T>在当前表中追加另一个表的全部内容。</T>
//
// @method
// @param m:map:TMap 表
//==========================================================
function TMap_append(m){
   if(m){
      var c = m._count;
      for(var n = 0; n < c; n++){
         this.set(m.name(n), m.value(n));
      }
   }
}

//==========================================================
// <T>在索引位置插入一个新的名称和内容。</T>
//
// @method
// @param i:index:Integer 索引位置
// @param n:name:String 名称
// @param v:value:Object 内容
//==========================================================
function TMap_insert(i, n, v){
   var o = this;
   var c = o._count;
   if((i >= 0) && (i <= c)){
      for(var p = c; p > i; p--){
         o._names[p] = o._names[p - 1];
         o._values[p] = o._values[p - 1];
      }
      o._names[i] = n;
      o._values[i] = v;
      o._count++;
      o.rebuild();
   }
}

//==========================================================
// <T>删除索引位置的内容。</T>
//
// @method
// @param i:index:Integer 索引位置
// @return Object 删除的内容
//==========================================================
function TMap_remove(i){
   var o = this;
   var r = null;
   var c = o._count;
   if((i >= 0) && (i < c)){
      r = o._values[i];
      for(var p = i; p < c; p++){
         o._names[p] = o._names[p + 1];
         o._values[p] = o._values[p + 1];
      }
      o._count--;
      o.rebuild();
   }
   return r;
}

//==========================================================
// <T>删除指定名称的内容。</T>
//
// @method
// @param n:name:String 名称
// @return Object 删除的内容
//==========================================================
function TMap_removeName(n){
   var o = this;
   var i = o.indexOf(n);
   if(i != -1){
      return o.remove(i);
   }
   return null;
}

//==========================================================
// <T>删除指定的内容。</T>
//
// @method
// @param v:value:Object 内容
//==========================================================
function TMap_removeValue(v){
   var o = this;
   var i = 0;
   var c = o._count;
   for(var n = 0; n < c; n++){
      var s = o._values[n];
      if(v != s){
         if(i != n){
            o._names[i] = o._names[n];
            o._values[i] = s;
         }
         i++;
      }
   }
   o._count = i;
   o.rebuild();
}

//==========================================================
// <T>根据对象内名称数组和内容数组重新建立对照表。</T>
//
// @method
//==========================================================
function TMap_rebuild(){
   var o = this;
   // 清除对照表数据
   var t = o._table;
   for(var n in t){
      delete t[n];
   }
   // 重建对照表数据
   var c = o._count;
   for(var n = 0; n < c; n++){
      var v = o._names[n] + '';
      t[v.toLowerCase()] = n;
   }
}

//==========================================================
// <T>清除所有内容。</T>
//
// @method
//==========================================================
function TMap_clear(){
   var o = this;
   o._count = 0;
   // 清除对照表数据
   for(var n in o._table){
      delete o._table[n];
   }
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 信息字符串
//==========================================================
function TMap_toString(){
   return this.dump().toString();
}

//==========================================================
// <T>释放所有内容。</T>
//
// @method
//==========================================================
function TMap_dispose(){
   var o = this;
   o._count = 0;
   // 清除对照表数据
   var t = o._table;
   if(t){
      for(var i in t){
         t[i] = null;
      }
      o._table = null;
   }
   // 清空名称集合
   var n = o._names;
   if(n){
      for(var i = n.length - 1; i >= 0; i--){
         n[i] = null;
      }
      o._names = null;
   }
   // 清空数据集合
   var v = o._values;
   if(v){
      for(var i = v.length - 1; i >= 0; i--){
         v[i] = null;
      }
      o._values = null;
   }
}

//==========================================================
// <T>获得数组的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
function TMap_dump(){
   var o = this;
   var r = new TString();
   var c = o._count;
   r.appendLine(RRuntime.className(o), ': ', c);
   if(c > 0){
      r.append(' {');
      for(var i = 0; i < c; i++){
         r.appendLine(o._names[i], '=[', o._values[i], ']');
      }
      r.append('}');
   }
   return r.flush();
}
