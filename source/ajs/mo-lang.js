var MO = new function MoSpace(){
   var o = this;
   o.version = '0.3.0';
   o.info    = new Object();
   o.Lang    = new function MoLangSpace(){return this;}
   o.Stream  = new function MoStreamSpace(){return this;}
   o.Core    = new function MoCoreSpace(){return this;}
   o.Gui     = new function MoGuiSpace(){return this;}
   o.Dui     = new function MoDuiSpace(){return this;}
   return o;
}
MO.initialize = function MO_initialize(){
   var o = this;
   var count = 0;
   for(var name in o){
      var value = o[name];
      if(value){
         if(value.constructor == Function){
            value.__name = name;
         }
      }
      count++;
   }
   o.info.count = count;
}
MO.release = function MO_release(){
   var o = this;
}
MO.RSingleton = function RSingleton(){
   var o = this;
   o._singleton = true;
   return o;
}
MO.TEnum = function TEnum(){
   var o = this;
   o.toDisplay = MO.TEnum_toDisplay;
   o.toValue   = MO.TEnum_toValue;
   return o;
}
MO.TEnum_toDisplay = function TEnum_toDisplay(value, defaultValue){
   var o = this;
   for(var name in o){
      var nameValue = o[name];
      if(nameValue.constructor != Function){
         if(nameValue == value){
            return name;
         }
      }
   }
   return defaultValue;
}
MO.TEnum_toValue = function TEnum_toValue(value, defaultValue){
   var o = this;
   var lowerValue = value.toLowerCase();
   for(var name in o){
      var nameValue = o[name];
      if(nameValue.constructor != Function){
         if(name.toLowerCase() == lowerValue){
            return o[name];
         }
      }
   }
   return defaultValue;
}
MO.ELogger = new function ELogger(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Debug   = 1;
   o.Info    = 2;
   o.Warn    = 3;
   o.Error   = 4;
   o.Fatal   = 5;
   return o;
}
MO.EPlatform = new function EPlatform(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Pc      = 1;
   o.Mobile  = 2;
   return o;
}
MO.EProcess = new function EProcess(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Debug   = 1;
   o.Release = 2;
   return o;
}
MO.EScope = new function EScope(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Local   = 1;
   o.Session = 2;
   o.Global  = 3;
   return o;
}
MO.RRuntime = function RRuntime(){
   var o = MO.RSingleton.call(this);
   o._processCd  = MO.EProcess.Release;
   o._platformCd = MO.EPlatform.Pc;
   return o;
}
MO.RRuntime.prototype.isDebug = function RRuntime_isDebug(){
   return this._processCd == MO.EProcess.Debug;
}
MO.RRuntime.prototype.isRelease = function RRuntime_isRelease(){
   return this._processCd == MO.EProcess.Release;
}
MO.RRuntime.prototype.processCd = function RRuntime_processCd(){
   return this._processCd;
}
MO.RRuntime.prototype.setProcessCd = function RRuntime_setProcessCd(processCd){
   this._processCd = processCd;
}
MO.RRuntime.prototype.isPlatformPc = function RRuntime_isPlatformPc(){
   return this._platformCd == MO.EPlatform.Pc;
}
MO.RRuntime.prototype.isPlatformMobile = function RRuntime_isPlatformMobile(){
   return this._platformCd == MO.EPlatform.Mobile;
}
MO.RRuntime.prototype.platformCd = function RRuntime_platformCd(){
   return this._platformCd;
}
MO.RRuntime.prototype.setPlatformCd = function RRuntime_setPlatformCd(platformCd){
   this._platformCd = platformCd;
}
MO.RRuntime.prototype.empty = function RRuntime_empty(){
}
MO.RRuntime.prototype.nvl = function RRuntime_nvl(value, defaultValue){
   return (value != null) ? value : defaultValue;
}
MO.RRuntime.prototype.subString = function RRuntime_subString(value, begin, end){
   if(value == null){
      return value;
   }
   var left = 0;
   if(begin != null){
      var find = value.indexOf(begin);
      if(find != -1){
         left = find + begin.length;
      }
   }
   var right = value.length;
   if(end != null){
      var find = value.indexOf(end, length);
      if(find != -1){
         right = find;
      }
   }
   if(left >= right){
      return '';
   }
   return value.substring(left, right);
}
MO.RRuntime.prototype.className = function RRuntime_className(value){
   if(value){
      if(typeof(value) == 'function'){
         return this.subString(value.toString(), 'function ', '(');
      }
      var clazz = value.constructor;
      if(clazz){
         return this.subString(clazz.toString(), 'function ', '(');
      }
   }
   return null;
}
MO.RRuntime.prototype.sortComparerAsc = function RArray_sortComparerAsc(source, target, parameters){
   if(source > target){
      return 1;
   }else if(source < target){
      return -1;
   }else{
      return 0;
   }
}
MO.RRuntime.prototype.sortComparerDesc = function RArray_sortComparerDesc(source, target, parameters){
   if(source > target){
      return -1;
   }else if(source < target){
      return 1;
   }else{
      return 0;
   }
}
MO.RRuntime.prototype.pairSortMid = function RArray_pairSortMid(names, values, begin, end, comparer, parameters){
   var name = names[begin];
   if(values){
      var value = values[begin];
   }
   while(begin < end){
      while((begin < end) && (comparer(names[end], name, parameters) >= 0)){
         end--;
      }
      names[begin] = names[end];
      if(values){
         values[begin] = values[end];
      }
      while((begin < end) && (comparer(names[begin], name, parameters) <= 0)){
         begin++;
      }
      names[end] = names[begin];
      if(values){
         values[end] = values[begin];
      }
   }
   names[begin] = name;
   if(values){
      values[begin] = value;
   }
   return begin;
}
MO.RRuntime.prototype.pairSortSub = function RArray_pairSortSub(names, values, begin, end, comparer, parameters){
   var o = this;
   if(begin < end){
      var mid = o.pairSortMid(names, values, begin, end, comparer, parameters);
      o.pairSortSub(names, values, begin, mid - 1, comparer, parameters);
      o.pairSortSub(names, values, mid + 1, end, comparer, parameters);
   }
}
MO.RRuntime.prototype.pairSort = function RArray_pairSort(names, values, offset, count, comparer, parameters){
   var o = this;
   var begin = offset;
   var end = offset + count - 1;
   o.pairSortSub(names, values, begin, end, MO.Runtime.nvl(comparer, o.sortComparerAsc), parameters);
}
MO.Runtime = new MO.RRuntime();
MO.TArray = function TArray(length){
   var o = this;
   o._length   = MO.Runtime.nvl(length, 0);
   o._memory   = new Array();
   o.isEmpty   = MO.TArray_isEmpty;
   o.length    = MO.TArray_length;
   o.setLength = MO.TArray_setLength;
   o.memory    = MO.TArray_memory;
   o.contains  = MO.TArray_contains;
   o.indexOf   = MO.TArray_indexOf;
   o.get       = MO.TArray_get;
   o.set       = MO.TArray_set;
   o.push      = MO.TArray_push;
   o.swap      = MO.TArray_swap;
   o.sort      = MO.TArray_sort;
   o.erase     = MO.TArray_erase;
   o.remove    = MO.TArray_remove;
   o.compress  = MO.TArray_compress;
   o.clear     = MO.TArray_clear;
   o.dispose   = MO.TArray_dispose;
   o.dump      = MO.TArray_dump;
   return o;
}
MO.TArray_isEmpty = function TArray_isEmpty(){
   return this._length == 0;
}
MO.TArray_length = function TArray_length(){
   return this._length;
}
MO.TArray_setLength = function TArray_setLength(length){
   this._length = length;
}
MO.TArray_memory = function TArray_memory(){
   return this._memory;
}
MO.TArray_contains = function TArray_contains(value){
   return this.indexOf(value) != -1;
}
MO.TArray_indexOf = function TArray_indexOf(value){
   var o = this;
   var count = o._length;
   for(var i = 0; i < count; i++){
      if(o._memory[i] == value){
         return i;
      }
   }
   return -1;
}
MO.TArray_get = function TArray_get(index){
   return ((index >= 0) && (index < this._length)) ? this._memory[index] : null;
}
MO.TArray_set = function TArray_set(index, value){
   var o = this;
   if ((index >= 0) && (index < o._length)) {
      o._memory[index] = value;
   }
}
MO.TArray_push = function TArray_push(){
   var o = this;
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      o._memory[o._length++] = arguments[i];
   }
}
MO.TArray_swap = function TArray_swap(left, right){
   var o = this;
   var count = o._length;
   if((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)){
      var memory = o._memory;
      var value = memory[left];
      memory[left] = memory[right];
      memory[right] = value;
   }
}
MO.TArray_sort = function TArray_sort(){
   this._memory.sort();
}
MO.TArray_erase = function TArray_erase(index){
   var o = this;
   var value = null;
   var count = o._count;
   if((index >= 0) && (index < count)){
      value = o._memory[index];
      for(var i = index; i < count; i++){
         o._memory[i] = o._memory[i + 1];
      }
      o._length--;
   }
   return value;
}
MO.TArray_remove = function TArray_remove(value){
   var o = this;
   var index = 0;
   var memory = o._memory;
   var count = o._length;
   for(var i = 0; i < count; i++){
      if(memory[i] != value){
         memory[index++] = memory[i];
      }
   }
   o._length = index;
}
MO.TArray_compress = function TArray_compress(){
   var o = this;
   var index = 0;
   var count = o._length;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      var value = memory[i];
      if(value != null){
         memory[index++] = value;
      }
   }
   o._length = index;
}
MO.TArray_clear = function TArray_clear(){
   this._length = 0;
}
MO.TArray_dispose = function TArray_dispose(){
   var o = this;
   o._length = 0;
   o._memory = null;
}
MO.TArray_dump = function TArray_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._length;
   result.append(MO.Runtime.className(o), ':', count);
   if(count > 0){
      var memory = o._memory;
      for(var i = 0; i < count; i++){
         result.append(' [', memory[i], ']');
      }
   }
   return result.flush();
}
MO.TAttributes = function TAttributes(){
   var o = this;
   MO.TDictionary.call(o);
   o.joinValue  = MO.TAttributes_joinValue;
   o.join       = MO.TAttributes_join;
   o.split      = MO.TAttributes_split;
   o.pack       = MO.TAttributes_pack;
   o.unpack     = MO.TAttributes_unpack;
   o.dump       = MO.TAttributes_dump;
   return o;
}
MO.TAttributes_joinValue = function TAttributes_joinValue(split){
   var o = this;
   var source = new MO.TString();
   var count = o._count;
   for(var i = 0; i < count; i++){
      if(i > 0){
         source.append(split);
      }
      source.append(o._values[i]);
   }
   return source.flush();
}
MO.TAttributes_join = function TAttributes_join(name, value){
   var o = this;
   var source = new MO.TString();
   if(!name){
      name = '=';
   }
   if(!value){
      value = ',';
   }
   var count = o._count;
   for(var i = 0; i < count; i++){
      if(i > 0){
         source.append(value);
      }
      source.append(o._names[i]);
      source.append(name);
      source.append(o._values[i]);
   }
   return source.flush();
}
MO.TAttributes_split = function TAttributes_split(source, name, value){
   var o = this;
   var items = source.split(value);
   var count = items.length;
   for(var i = 0; i < count; i++){
      var item = items[i];
      if(item.length){
         var codes = item.split(name);
         if(codes.length == 2){
            o.set(MO.Lang.String.trim(codes[0]), MO.Lang.String.trim(codes[1]));
         }else{
            o.set(MO.Lang.String.trim(item), '');
         }
      }
   }
}
MO.TAttributes_pack = function TAttributes_pack(){
   var o = this;
   var source = new MO.TString();
   var count = o._count;
   var names = o._names;
   var values = o._values;
   for(var i = 0; i < count; i++){
      var name = names[i];
      var value = values[i];
      var nameLength = name.length;
      source.append(nameLength.toString().length, nameLength, name);
      if(value != null){
         var value = value + '';
         var valueLength = value.length;
         source.append(valueLength.toString().length, valueLength, value);
      }else{
         source.append('0');
      }
   }
   return source.flush();
}
MO.TAttributes_unpack = function TAttributes_unpack(source){
   var o = this;
   o.count = 0;
   var position = 0;
   var sourceLength = source.length;
   while(position < sourceLength){
      var lengthLength = parseInt(source.substr(position++, 1));
      var length = parseInt(source.substr(position, lengthLength));
      var name = source.substr(position + lengthLength, length);
      position += lengthLength + length;
      lengthLength = parseInt(source.substr(position++, 1));
      var value = null;
      if(lengthLength > 0){
         length = parseInt(source.substr(position, lengthLength));
         value = source.substr(position + lengthLength, length);
         position += lengthLength + length;
      }
      o.set(name, value);
   }
}
MO.TAttributes_dump = function TAttributes_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._count;
   result.append(MO.Runtime.className(o), ' : ', count);
   if(count > 0){
      var names = o._names;
      var values = o._values;
      result.append(' (');
      for(var i = 0; i < count; i++){
         if(i > 0){
            result.append(', ');
         }
         result.append(names[i], '=', values[i]);
      }
      result.append(')');
   }
   return result.flush();
}
MO.TDictionary = function TDictionary(){
   var o = this;
   MO.TMap.call(o);
   o.sortByName = MO.TDictionary_sortByName;
   o.joinName   = MO.TDictionary_joinName;
   o.dump       = MO.TDictionary_dump;
   return o;
}
MO.TDictionary_sortByName = function TDictionary_sortByName(comparer, parameters){
   var o = this;
   MO.Runtime.pairSort(o._names, o._values, 0, o._count, comparer, parameters);
   o.rebuild();
}
MO.TDictionary_joinName = function TDictionary_joinName(split){
   var o = this;
   var source = new MO.TString();
   var count = o._count;
   for(var i = 0; i < count; i++){
      if(i > 0){
         source.append(split);
      }
      source.append(o._names[i]);
   }
   return source.flush();
}
MO.TDictionary_dump = function TDictionary_dump(){
   var o = this;
   var result = new MO.TString();
   var count = o._count;
   result.append(MO.Runtime.className(o), ': ', count);
   if(count > 0){
      var names = o._names;
      var values = o._values;
      result.append(' {\n');
      for(var i = 0; i < count; i++){
         result.append('   ', names[i], '=[', values[i], ']\n');
      }
      result.append('}');
   }
   return result.flush();
}
MO.TMap = function TMap(){
   var o = this;
   o._count        = 0;
   o._table        = new Object();
   o._names        = new Array();
   o._values       = new Array();
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
MO.TMap_isEmpty = function TMap_isEmpty(){
   return this._count == 0;
}
MO.TMap_count = function TMap_count(){
   return this._count;
}
MO.TMap_contains = function TMap_contains(name){
   if(name != null){
      var index = this._table[name.toString().toLowerCase()]
      if(index != null){
         return true;
      }
   }
   return false;
}
MO.TMap_containsValue = function TMap_containsValue(value){
   var index = this.indexOfValue(value);
   return (index != -1);
}
MO.TMap_indexOf = function TMap_indexOf(name){
   if(name != null){
      var index = this._table[name.toString().toLowerCase()];
      if(index != null){
         return index;
      }
   }
   return -1;
}
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
MO.TMap_first = function TMap_first(){
   var o = this;
   if(o._count > 0){
      return o._values[0];
   }
   return null;
}
MO.TMap_last = function TMap_last(){
   var o = this;
   if(o._count > 0){
      return o._values[o._count - 1];
   }
   return null;
}
MO.TMap_nameAt = function TMap_nameAt(index){
   return this._names[index];
}
MO.TMap_name = function TMap_name(index){
   return ((index >= 0) && (index < this._count)) ? this._names[index] : null;
}
MO.TMap_valueAt = function TMap_valueAt(index){
   return this._values[index];
}
MO.TMap_value = function TMap_value(index){
   var o = this;
   return ((index >= 0) && (index < o._count)) ? o._values[index] : null;
}
MO.TMap_setValueAt = function TMap_setValueAt(index, value){
   this._values[index] = value;
}
MO.TMap_setValue = function TMap_setValue(index, value){
   var o = this;
   if((index >= 0) && (index < o._count)){
      o._values[index] = value;
   }
}
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
MO.TMap_set = function TMap_set(name, value){
   var o = this;
   if(name != null){
      var code = name.toString().toLowerCase();
      var index = o._table[code];
      if((index == null) || (index >= o._count)){
         index = o._count++;
         o._names[index] = name;
         o._table[code] = index;
      }
      o._values[index] = value;
   }
}
MO.TMap_assign = function TMap_assign(map){
   var o = this;
   o.clear();
   o.append(map);
}
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
MO.TMap_removeName = function TMap_removeName(name){
   var o = this;
   var index = o.indexOf(name);
   if(index != -1){
      return o.remove(index);
   }
   return null;
}
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
MO.TMap_rebuild = function TMap_rebuild(){
   var o = this;
   var table = o._table;
   for(var name in table){
      delete table[name];
   }
   var count = o._count;
   var names = o._names;
   for(var i = 0; i < count; i++){
      var code = names[i].toLowerCase();
      table[code] = i;
   }
}
MO.TMap_clear = function TMap_clear(){
   var o = this;
   o._count = 0;
   var table = o._table;
   for(var name in table){
      delete table[name];
   }
}
MO.TMap_toString = function TMap_toString(){
   return this.dump().toString();
}
MO.TMap_dispose = function TMap_dispose(flag){
   var o = this;
   var count = o._count;
   var table = o._table;
   if(table){
      for(var name in table){
         table[name] = null;
      }
      o._table = null;
   }
   var names = o._names;
   if(names){
      for(var i = 0; i < count; i++){
         names[i] = null;
      }
      o._names = null;
   }
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
   o._count = 0;
}
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
MO.TObjects = function TObjects(){
   var o = this;
   o._count     = 0;
   o._items     = new Array();
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
   o.clear      = MO.TObjects_clear;
   o.dispose    = MO.TObjects_dispose;
   o.dump       = MO.TObjects_dump;
   return o;
}
MO.TObjects_isEmpty = function TObjects_isEmpty(){
   return (this._count == 0);
}
MO.TObjects_count = function TObjects_count(){
   return this._count;
}
MO.TObjects_items = function TObjects_items(){
   return this._items;
}
MO.TObjects_contains = function TObjects_contains(value){
   return this.indexOf(value) != -1;
}
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
MO.TObjects_first = function TObjects_first(){
   var o = this;
   return o._count ? o._items[0] : null;
}
MO.TObjects_last = function TObjects_last(){
   var o = this;
   return o._count ? o._items[o._count - 1] : null;
}
MO.TObjects_getAt = function TObjects_getAt(index){
   return this._items[index];
}
MO.TObjects_get = function TObjects_get(index){
   var o = this;
   return ((index >= 0) && (index < o._count)) ? o._items[index] : null;
}
MO.TObjects_setAt = function TObjects_setAt(index, value){
   this._items[index] = value;
}
MO.TObjects_set = function TObjects_set(index, value){
   var o = this;
   var items = o._items;
   if((index >= 0) && (index < o._count)){
      items[index] = value;
   }
}
MO.TObjects_assign = function TObjects_assign(values){
   var o = this;
   var items = o._items;
   var count = o._count = values.count();
   var valueItems = values.items();
   for(var i = 0; i < count; i++){
      items[i] = valueItems[i];
   }
}
MO.TObjects_append = function TObjects_append(values){
   var o = this;
   var count = values.count();
   for(var i = 0; i < count; i++){
      o.push(values.at(i));
   }
}
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
MO.TObjects_shift = function TObjects_shift(){
   return this.erase(0);
}
MO.TObjects_unshift = function TObjects_unshift(value){
   return this.insert(0, value);
}
MO.TObjects_pop = function TObjects_pop(){
   var o = this;
   var value = null;
   if(o._count){
      value = o._items[--o._count];
   }
   return value;
}
MO.TObjects_push = function TObjects_push(value){
   var o = this;
   var index = o._count++;
   o._items[index] = value;
   return index;
}
MO.TObjects_pushUnique = function TObjects_pushUnique(value){
   var o = this;
   var index = o.indexOf(value);
   if(value == -1){
      o.push(value);
   }
}
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
MO.TObjects_sort = function TObjects_sort(callback){
   var o = this;
   var items = o._items;
   if(items.length != o._count){
      items.length = o._count;
   }
   items.sort(callback);
}
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
MO.TObjects_remove = function TObjects_remove(value){
   var o = this;
   var count = o._count;
   if(count){
      var index = 0;
      var items = o._items;
      for(var i = index; i < count; i++){
         if(items[i] != value){
            items[index++] = items[i];
         }
      }
      for(var i = index; i < count; i++){
         items[i] = null;
      }
      o._count = index;
   }
   return value;
}
MO.TObjects_clear = function TObjects_clear(){
   this._count = 0;
}
MO.TObjects_dispose = function TObjects_dispose(){
   var o = this;
   var items = o._items;
   for(var name in items){
      items[name] = null;
   }
   o._count = 0;
   o._items = null;
}
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
MO.TString = function TString(){
   var o = this;
   o._count       = 0;
   o._memory      = new Array();
   o.isEmpty      = MO.TString_isEmpty;
   o.assign       = MO.TString_assign;
   o.append       = MO.TString_append;
   o.appendIf     = MO.TString_appendIf;
   o.appendArray  = MO.TString_appendArray;
   o.appendLine   = MO.TString_appendLine;
   o.appendRepeat = MO.TString_appendRepeat;
   o.push         = MO.TString_push;
   o.clear        = MO.TString_clear;
   o.toString     = MO.TString_toString;
   o.flush        = MO.TString_flush;
   o.dispose      = MO.TString_dispose;
   o.dump         = MO.TString_dump;
   return o;
}
MO.TString_isEmpty = function TString_isEmpty(){
   return this._count == 0;
}
MO.TString_assign = function TString_assign(){
   var o = this;
   o.clear();
   o.appendArray(arguments, 0, arguments.length);
}
MO.TString_append = function TString_append(){
   this.appendArray(arguments, 0, arguments.length);
}
MO.TString_appendIf = function TString_appendIf(flag){
   if(flag){
      this.appendArray(arguments, 1, arguments.length - 1);
   }
}
MO.TString_appendArray = function TString_appendArray(values, offset, count){
   var o = this;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      var value = values[offset++];
      if(value != null){
         memory[o._count++] = value;
      }
   }
}
MO.TString_appendRepeat = function TString_appendRepeat(value, count){
   var o = this;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      memory[o._count++] = value;
   }
}
MO.TString_appendLine = function TString_appendLine(){
   var o = this;
   o.appendArray(arguments, 0, arguments.length);
   o._memory[o._count++] = '\r\n';
}
MO.TString_push = function TString_push(){
   this.appendArray(arguments, 0, arguments.length);
}
MO.TString_clear = function TString_clear(){
   this._count = 0;
}
MO.TString_toString = function TString_toString(){
   var o = this;
   var memory = o._memory;
   if(memory.length != o._count){
      memory = memory.slice(0, this._count);
   }
   return memory.join('');
}
MO.TString_flush = function TString_flush(){
   var o = this;
   var result = o.toString();
   o.dispose();
   return result;
}
MO.TString_dispose = function TString_dispose(){
   var o = this;
   o._count = 0;
   var memory = o._memory;
   if(memory){
      var count = memory.length;
      for(var i = 0; i < count; i++){
         memory[i] = null;
      }
      o._memory = null;
   }
}
MO.TString_dump = function TString_dump(){
   var source = this.toString();
   return MO.Runtime.className(o) + ':' + source.length + '[' + source + ']';
}
MO.RAssert = function RAssert(){
   var o = MO.RSingleton.call(this);
   o.debugBegin = MO.Runtime.empty;
   o.debug      = MO.Runtime.empty;
   o.debugEnd   = MO.Runtime.empty;
   return o;
}
MO.RAssert.prototype.isTrue = function RAssert_isTrue(value){
   if(!value){
      throw new Error('Assert ture failure.');
   }
}
MO.RAssert.prototype.isFalse = function RAssert_isFalse(value){
   if(value){
      throw new Error('Assert false failure.');
   }
}
MO.RAssert.prototype.debugTrue = function RAssert_debugTrue(value){
   if(!value){
      throw new Error('Assert true failure.');
   }
}
MO.RAssert.prototype.debugFalse = function RAssert_debugFalse(value){
   if(value){
      throw new Error('Assert false failure.');
   }
}
MO.RAssert.prototype.debugNull = function RAssert_debugNull(value){
   if(value != null){
      throw new Error('Assert null failure.');
   }
}
MO.RAssert.prototype.debugNotNull = function RAssert_debugNotNull(value){
   if(value == null){
      throw new Error('Assert not null failure.');
   }
}
MO.RAssert.prototype.debugEmpty = function RAssert_debugEmpty(value){
   if((value != null) && (value.length != 0)){
      throw new Error('Assert empty failure.');
   }
}
MO.RAssert.prototype.debugNotEmpty = function RAssert_debugNotEmpty(value){
   if(value == null){
      throw new Error('Assert not empty failure, value is null.');
   }
   if(value.length == 0){
      throw new Error('Assert not empty failure, value length is empty.');
   }
}
MO.Assert = new MO.RAssert();
MO.RMemory = function RMemory(){
   var o = MO.RSingleton.call(this);
   o._entryUnused = null;;
   o._pools       = new Object();
   return o;
}
MO.RMemory.prototype.entryAlloc = function RMemory_entryAlloc(){
   var o = this;
   var entry = null;
   var unused = o._entryUnused;
   if(unused){
      entry = unused;
      o._entryUnused = unused.next;
   }else{
      entry = new MO.SMemoryPoolEntry();
   }
   return entry;
}
MO.RMemory.prototype.entryFree = function RMemory_entryFree(entry){
   var o = this;
   MO.Assert.debugNotNull(entry);
   entry.next = o._entryUnused;
   o._entryUnused = entry;
}
MO.RMemory.prototype.alloc = function RMemory_alloc(clazz){
   var o = this;
   MO.Assert.debugNotNull(clazz);
   var className = MO.Runtime.className(clazz);
   var pools = o._pools;
   var pool = pools[className];
   if(!pool){
      pool = new MO.TMemoryPool();
      pool._constructor = clazz;
      pools[className] = pool;
   }
   var value = pool.alloc();
   return value;
}
MO.RMemory.prototype.free = function RMemory_free(value){
   MO.Assert.debugNotNull(value);
   var pool = value.__pool;
   MO.Assert.debugNotNull(pool);
   pool.free(value);
   if(value.free){
      value.free();
   }
}
MO.RMemory.prototype.refresh = function RMemory_refresh(){
   CollectGarbage();
}
MO.Memory = new MO.RMemory();
MO.SMemoryPoolEntry = function SMemoryPoolEntry(){
   var o = this;
   o.next    = null;
   o.value   = null;
   o.dispose = MO.SMemoryPoolEntry_dispose;
   return o;
}
MO.SMemoryPoolEntry_dispose = function SMemoryPoolEntry_dispose(){
   var o = this;
   var value = o.value;
   if(value){
      value.__pool = null;
      value.dispose();
   }
   o.next = null;
   o.value = null;
}
MO.TMemoryPool = function TMemoryPool(){
   var o = this;
   o._constructor = null;
   o._unused      = null;
   o._createCount = 0;
   o._allocCount  = 0;
   o._freeCount   = 0;
   o.alloc        = MO.TMemoryPool_alloc;
   o.free         = MO.TMemoryPool_free;
   o.dispose      = MO.TMemoryPool_dispose;
   o.dump         = MO.TMemoryPool_dump
   return o;
}
MO.TMemoryPool_alloc = function TMemoryPool_alloc(){
   var o = this;
   var value = null;
   var unused = o._unused;
   if(unused){
      value = unused.value;
      o._unused = unused.next;
      MO.Memory.entryFree(unused);
   }else{
      value = new o._constructor();
      value.__pool = o;
      o._createCount++;
   }
   o._allocCount++;
   return value;
}
MO.TMemoryPool_free = function TMemoryPool_free(value){
   var o = this;
   MO.Assert.debugNotNull(value);
   var entry = MO.Memory.entryAlloc();
   entry.value = value;
   entry.next = o._unused;
   o._unused = entry;
   o._freeCount++;
}
MO.TMemoryPool_dispose = function TMemoryPool_dispose(){
   var entry = this._unused;
   while(entry){
      var current = entry;
      entry = current.next;
      current.dispose();
      MO.Memory.entryFree(current);
   }
}
MO.TMemoryPool_dump = function TMemoryPool_dump(){
   var o = this;
   var result = new MO.TString();
   result.append('Pool:');
   result.append('create=', o._createCount);
   result.append(', alloc=', o._allocCount);
   result.append(', free=', o._freeCount);
   return result.flush();
}
MO.SLooperEntry = function SLooperEntry(){
   var o = this;
   o.prior   = null;
   o.next    = null;
   o.value   = null;
   o.dispose = MO.SLooperEntry_dispose;
   return o;
}
MO.SLooperEntry_dispose = function SLooperEntry_dispose(){
   var o = this;
   o.prior = null;
   o.next = null;
   o.value = null;
}
MO.TLooper = function TLooper(){
   var o = this;
   o._count             = 0;
   o._recordCount       = 0;
   o._current           = null;
   o.innerPush          = MO.TLooper_innerPush;
   o.innerRemove        = MO.TLooper_innerRemove;
   o.innerRemoveCurrent = MO.TLooper_innerRemoveCurrent;
   o.innerRemoveValue   = MO.TLooper_innerRemoveValue;
   o.isEmpty            = MO.TLooper_isEmpty;
   o.count              = MO.TLooper_count;
   o.record             = MO.TLooper_record;
   o.unrecord           = MO.TLooper_unrecord;
   o.contains           = MO.TLooper_contains;
   o.current            = MO.TLooper_current;
   o.next               = MO.TLooper_next;
   o.push               = MO.TLooper_push;
   o.pushUnique         = MO.TLooper_pushUnique;
   o.removeCurrent      = MO.TLooper_removeCurrent;
   o.remove             = MO.TLooper_remove;
   o.clear              = MO.TLooper_clear;
   o.dispose            = MO.TLooper_dispose;
   o.dump               = MO.TLooper_dump;
   return o;
}
MO.TLooper_innerPush = function TLooper_innerPush(entry){
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
MO.TLooper_innerRemove = function TLooper_innerRemove(entry){
   var o = this;
   var prior = entry.prior;
   var next = entry.next;
   prior.next = next;
   next.prior = prior;
   o._count--;
   if(o._count > 0){
      o._current = next;
   }else{
      o._current = null;
   }
   MO.Memory.free(entry);
}
MO.TLooper_innerRemoveCurrent = function TLooper_innerRemoveCurrent(){
   var o = this;
   var value = null;
   if(o._count > 0){
      var current = o._current;
      value = current.value;
      o.innerRemove(current);
   }
   return value;
}
MO.TLooper_innerRemoveValue = function TLooper_innerRemoveValue(value){
   var o = this;
   if(o._count > 0){
      if(o._current.value == value){
         o.innerRemoveCurrent();
         return;
      }
      var current = o._current;
      var entry = current.next;
      while(entry != current){
         if(entry.value == value){
            o.innerRemove(entry);
            o._current = current;
            return;
         }
         entry = entry.next;
      }
   }
}
MO.TLooper_isEmpty = function TLooper_isEmpty(){
   return this._count == 0;
}
MO.TLooper_count = function TLooper_count(){
   return this._count;
}
MO.TLooper_record = function TLooper_record(){
   var o = this;
   o._recordCount = o._count;
}
MO.TLooper_unrecord = function TLooper_unrecord(v){
   this._recordCount = -1;
}
MO.TLooper_contains = function TLooper_contains(value){
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
MO.TLooper_current = function TLooper_current(){
   var entry = this._current;
   return entry ? entry.value : null;
}
MO.TLooper_next = function TLooper_next(){
   var o = this;
   if(o._current){
      o._current = o._current.next;
   }
   var count = o._recordCount;
   if(count > 0){
      o._recordCount--;
   }else if(count == 0){
      return null;
   }
   return o._current ? o._current.value : null;
}
MO.TLooper_push = function TLooper_push(value){
   var entry = MO.Memory.alloc(MO.SLooperEntry);
   entry.value = value;
   this.innerPush(entry);
}
MO.TLooper_pushUnique = function TLooper_pushUnique(value){
   var o = this;
   if(!o.contains(value)){
      o.push(value);
   }
}
MO.TLooper_removeCurrent = function TLooper_removeCurrent(){
   return this.innerRemoveCurrent();
}
MO.TLooper_remove = function TLooper_remove(p){
   this.innerRemoveValue(p);
}
MO.TLooper_clear = function TLooper_clear(){
   var o = this;
   var entry = o._current;
   if(entry){
      entry.prior.next = null;
      while(entry){
         var next = entry.next;
         MO.Memory.free(next);
         entry = next;
      }
   }
   o._count = 0;
   o._current = null;
}
MO.TLooper_dispose = function TLooper_dispose(){
   this.clear();
}
MO.TLooper_dump = function TLooper_dump(){
   var o = this;
   var count = o._count;
   var result = new MO.TString();
   result.append(MO.Class.name(this), ': ', count);
   if(count > 0){
      var entry = o._current;
      for(var i = 0; i < count; i++){
         result.append(' [', entry.value, ']');
         entry = entry.next;
      }
   }
   return result.flush();
}
MO.RGlobal = function RGlobal(){
   var o = MO.RSingleton.call(this);
   o._instances = new MO.TDictionary();
   return o;
}
MO.RGlobal.prototype.get = function RGlobal_get(name){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   }
   return global._instances.get(name);
}
MO.RGlobal.prototype.set = function RGlobal_set(name, value){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   }
   return global._instances.set(name, value);
}
MO.Global = new MO.RGlobal();
MO.AAnnotation = function AAnnotation(name){
   var o = this;
   o._annotationCd = null;
   o._inherit      = false;
   o._duplicate    = false;
   o._name         = name;
   o.annotationCd  = MO.AAnnotation_annotationCd;
   o.name          = MO.AAnnotation_name;
   o.code          = MO.AAnnotation_code;
   o.value         = MO.AAnnotation_value;
   return o;
}
MO.AAnnotation_annotationCd = function AAnnotation_annotationCd(){
   return this._annotationCd;
}
MO.AAnnotation_name = function AAnnotation_name(){
   return this._name;
}
MO.AAnnotation_code = function AAnnotation_code(){
   return this._name;
}
MO.AAnnotation_value = function AAnnotation_value(){
   return null;
}
MO.AEnum = function AEnum(name, linker){
   var o = this;
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Enum;
   o.name       = name;
   o.linker     = linker;
   return o;
}
MO.AGetSet = function AGetSet(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.GetSet, linker);
   o.build = MO.AGetSet_build;
   return o;
}
MO.AGetSet_build = function AGetSet_build(clazz, instance){
   var o = this;
   var getName = o._code;
   instance[getName] = MO.Method.makePropertyGet(o._name, getName);
   var setName = 'set' + o._linker;
   instance[setName] = MO.Method.makePropertySet(o._name, setName);
}
MO.AGetter = function AGetter(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Get, linker);
   o._linker = linker;
   o.build   = MO.AGetter_build;
   return o;
}
MO.AGetter_build = function AGetter_build(clazz, instance){
   var o = this;
   var getName = o._linker ? o._linker : o._code;
   instance[getName] = MO.Method.makePropertyGet(o._name, getName);
}
MO.AGetterSource = function AGetterSource(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Get, linker);
   o._linker = linker;
   o.build   = MO.AGetterSource_build;
   return o;
}
MO.AGetterSource_build = function AGetterSource_build(clazz, instance){
   var o = this;
   var getName = o._linker ? o._linker : o._code;
   instance[getName] = MO.Method.makePropertyGetSource(o._name, getName);
}
MO.ALinker = function ALinker(name, linker){
   var o = this;
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Linker;
   o.name       = name;
   o.linker     = linker;
   return o;
}
MO.AProperty = function AProperty(name, linker){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._inherit      = true;
   o._annotationCd = MO.EAnnotation.Property;
   o._linker       = null;
   o._force        = false;
   o.code          = MO.AProperty_code;
   o.build         = MO.AProperty_build;
   o.load          = MO.AProperty_load;
   o.save          = MO.AProperty_save;
   o.toString      = MO.AProperty_toString;
   var code = null;
   if(linker == null){
      if(MO.Lang.String.startsWith(name, '_')){
         code = name.substring(1);
      }else{
         code = name;
      }
      code = MO.Lang.String.toUnderline(code);
   }else{
      code = linker;
   }
   o._linker = code;
   return o;
}
MO.AProperty_code = function AProperty_code(){
   return this._linker;
}
MO.AProperty_build = function AProperty_build(){
}
MO.AProperty_load = function AProperty_load(v, x){
   v[this._name] = x.get(this._linker);
}
MO.AProperty_save = function AProperty_save(v, x){
   x.set(this._linker, v[this._name]);
}
MO.AProperty_toString = function AProperty_toString(){
   return '<' + this._annotationCd + ',linker=' + this._linker + '>';
}
MO.ASetter = function ASetter(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Set, linker);
   o.build = MO.ASetter_build;
   return o;
}
MO.ASetter_build = function ASetter_build(clazz, instance){
   var o = this;
   var setName = 'set' + o._linker;
   instance[setName] = MO.Method.makePropertySet(o._name, setName);
}
MO.ASource = function ASource(name, typeCd, linker){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._inherit      = false;
   o._annotationCd = MO.EAnnotation.Source;
   o._typeCd       = typeCd;
   o._code         = null;
   o._linker       = null;
   o.build         = MO.ASource_build;
   o.toString      = MO.ASource_toString;
   var name = o._name;
   if(MO.Lang.String.startsWith(name, '_')){
      name = name.substring(1);
   }
   o._code = name;
   if(linker == null){
      o._linker = MO.Lang.String.firstUpper(name);
   }else{
      o._linker = linker;
   }
   return o;
}
MO.ASource_build = function ASource_build(){
}
MO.ASource_toString = function ASource_toString(){
   return '<' + this._annotationCd + ',linker=' + this._linker + '>';
}
MO.EAnnotation = new function EAnnotation(){
   var o = this;
   o.Source    = 'source';
   o.Property  = 'property';
   o.Event     = 'enum';
   o.Event     = 'event';
   o.Linker    = 'linker';
   o.Style     = 'style';
   o.StyleIcon = 'icon';
   return o;
}
MO.EBoolean = new function EBoolean(){
   var o = this;
   o.True   = 'Y';
   o.False  = 'N';
   return o;
}
MO.ECharCase = new function ECharCase(){
   var o = this;
   o.Upper = 'U';
   o.Lower = 'L';
   o.Word  = 'W';
   return o;
}
MO.EDataType = new function EDataType(){
   var o = this;
   o.Unknown = 0;
   o.Int8 = 1;
   o.Int16 = 2;
   o.Int32 = 3;
   o.Int64 = 4;
   o.Uint8 = 5;
   o.Uint16 = 6;
   o.Uint32 = 7;
   o.Uint64 = 8;
   o.Float16 = 9;
   o.Float32 = 10;
   o.Float64 = 11;
   o.String = 12;
   return o;
}
MO.EEndian = new function EEndian(){
   var o = this;
   o.Big    = 0;
   o.Little = 1;
   return o;
}
MO.ENodeType = new function ENodeType(){
   var o = this;
   o.Node = 1;
   o.Text = 3;
   o.Data = 4;
   return o;
}
MO.ENumber = new function ENumber(){
   var o = this;
   o.Integer         = 'I';
   o.PositiveInteger = 'PI';
   o.NegativeInteger = 'NI';
   o.Float           = 'F';
   o.PositiveFloat   = 'PF';
   o.NegativeFloat   = 'NF';
   return o;
}
MO.ERegExp = new function ERegExp(){
   var o = this;
   o.I  = /^-?[1-9]\d*|0$/;
   o.PI = /^[1-9]\d*$/;
   o.NI = /^-[1-9]\d*$/;
   o.F  = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
   o.PF = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
   o.NF = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;
   o.U  = /[1-9]{1}[0-9]/;
   o.E  = /^\w{1,}[@]{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}$/;
   return o;
}
MO.EResult = new function EResult(){
   var o = this;
   o.Success  = 0;
   o.Continue = 1;
   o.Skip     = 2;
   o.Finish   = 3;
   o.Failure  = -1;
   o.Cancel   = -2;
   return o;
}
MO.ESource = new function ESource(){
   var o = this;
   o.Get    = 'get';
   o.Set    = 'set';
   o.GetSet = 'getset';
   o.Listener = 'listener';
   return o;
}
MO.MInstance = function MInstance(o){
   o = MO.Class.inherits(this, o);
   o.__free          = false;
   o.instanceCreate  = MO.Method.empty;
   o.instanceAlloc   = MO.Method.empty;
   o.instanceFree    = MO.Method.empty;
   o.instanceRelease = MO.Method.empty;
   return o;
}
MO.MInvoke = function MInvoke(o){
   o = MO.Class.inherits(this, o);
   o.invoke = MO.Method.virtual(o, 'invoke');
   return o;
}
MO.MPoolAble = function MPoolAble(o){
   o = MO.Class.inherits(this, o);
   o._poolCode = MO.Class.register(o, new MO.AGetSet('_poolCode'));
   return o;
}
MO.SArguments = function SArguments(){
   var o = this;
   o.owner = null;
   return o;
}
MO.SEnumItem = function SEnumItem(){
   var o = this;
   o.name  = null;
   o.value = 0;
   return o;
}
MO.SLogger = function SLogger(){
   var o = this;
   o.message = null;
   return o;
}
MO.TClass = function TClass(){
   var o = this;
   o.__disposed     = true;
   o._unused        = null;
   o._annotations   = new Object();
   o._attributes    = new Object();
   o.name           = null;
   o.parent         = null;
   o.base           = null;
   o.clazz          = null;
   o.instance       = null;
   o._abstract      = false;
   o.styles         = new Array();
   o.instances      = new Array();
   o.register       = MO.TClass_register;
   o.assign         = MO.TClass_assign;
   o.annotations    = MO.TClass_annotations;
   o.annotation     = MO.TClass_annotation;
   o.annotationFind = MO.TClass_annotationFind;
   o.attributeFind  = MO.TClass_attributeFind;
   o.style          = MO.TClass_style;
   o.build          = MO.TClass_build;
   o.newInstance    = MO.TClass_newInstance;
   o.free           = MO.TClass_free;
   o.alloc          = MO.TClass_alloc;
   return o;
}
MO.TClass_register = function TClass_register(p){
   var o = this;
   var a = p.annotationCd();
   var n = p.name();
   var c = p.code();
   if(!a || !c){
      throw new MO.TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", MO.Class.dump(o), a, n, c);
   }
   var as = o._annotations[a];
   if(!as){
      as = o._annotations[a] = new Object();
   }
   if(!p._duplicate){
      if(as[c]){
         throw new MO.TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", MO.Class.dump(o), a, n, c, p.toString());
      }
   }
   as[c] = p;
   o._attributes[n] = p;
}
MO.TClass_assign = function TClass_assign(clazz){
   var o = this;
   for(var annotationName in clazz._annotations){
      var annotations = o._annotations[annotationName];
      if(!annotations){
         annotations = o._annotations[annotationName] = new Object();
      }
      var clazzAnnotations = clazz._annotations[annotationName];
      for(var name in clazzAnnotations){
         var annotation = clazzAnnotations[name];
         if(!annotation._duplicate){
            if(annotations[name]){
               throw new MO.TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, clazz.name, n, annotation.toString());
            }
         }
         if(annotation._inherit){
            annotations[name] = annotation;
         }
      }
   }
   for(var name in clazz._attributes){
      var attribute = clazz._attributes[name];
      if(attribute.construct != Function){
         o._attributes[name] = clazz._attributes[name];
      }
   }
}
MO.TClass_annotations = function TClass_annotations(a){
   var o = this;
   var r = o._annotations[a];
   if(!r){
      MO.Logger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
   }
   return r;
}
MO.TClass_annotation = function TClass_annotation(a, n){
   var o = this;
   var r = null;
   var as = o._annotations[a];
   if(as){
      r = as[n];
   }
   if(!r){
      MO.Logger.fatal(o, null, "Can't find annotation. (annotation={1}, name={2}, class={3})", a, n, o.name);
   }
   return r;
}
MO.TClass_annotationFind = function TClass_annotationFind(p){
   var o = this;
   var r = null;
   for(var n in o._annotations){
      var as = o._annotations[n];
      if(as){
         var a = as[p];
         if(a != null){
            if(a.constructor != Function){
               return a;
            }
         }
      }
   }
   return null;
}
MO.TClass_attributeFind = function TClass_attributeFind(p){
   var a = this._attributes[p];
   if(a){
      if(a.constructor != Function){
         return a;
      }
   }
   return null;
}
MO.TClass_style = function TClass_style(n){
   var o = this;
   if(o.styles[n]){
      return o.styles[n];
   }
   var a = null;
   var p = o;
   while(p){
      var as = p._annotations[MO.EAnnotation.Style];
      if(as){
         a = as[n];
         if(a){
            break;
         }
      }
      p = p.parent;
   }
   if(!a){
      MO.Logger.fatal(o, null, "No register style annotation. (name={1}, linker={2}, class={3})", o.name + '_' + n, o.liner, o.name);
   }
   var sn = p.name + '_' + a.style();
   o.styles[n] = sn;
   return sn;
}
MO.TClass_build = function TClass_build(){
   var o = this;
   var instance = o.instance;
   for(var name in instance){
      var value = instance[name];
      if(value != null){
         if((value.constructor == Function) && value.__virtual){
            o._abstract = true;
            break;
         }
      }
   }
   var properties = o._annotations[MO.EAnnotation.Property];
   if(properties){
      for(var name in properties){
         var property = properties[name];
         property.build(instance);
      }
   }
   var sources = o._annotations[MO.EAnnotation.Source];
   if(sources){
      for(var name in sources){
         var source = sources[name];
         source.build(o, instance);
      }
   }
}
MO.TClass_newInstance = function TClass_newInstance(){
   var o = this;
   var instance = o.alloc();
   if(!instance){
      if(o._abstract){
         var message = new MO.TString();
         for(var name in o.instance){
            var value = o.instance[name];
            if(MO.Method.isVirtual(value)){
               if(!message.isEmpty()){
                  message.append(',');
               }
               message.append(value._name);
            }
         }
         throw new MO.TError(o, "Abstract Class can't be create.(name={1})\n[{2}]", o.name, message);
      }
      var template = o.instance;
      if(!template){
         return MO.Logger.fatal(o, null, "Class instance is empty. (name={1})", o.name);
      }
      instance = new template.constructor();
      for(var name in template){
         var value = template[name];
         if(value != null){
            if((name == '__base') || (name == '__inherits')){
               instance[name] = template[name];
               continue;
            }
            if(!MO.Class.isBase(value)){
               value = MO.Lang.Object.clone(value);
            }
         }
         instance[name] = value;
      }
      instance.__class = o;
      if(instance.construct){
         instance.construct();
      }
   }
   return instance;
}
MO.TClass_alloc = function TClass_alloc(){
   var o = this;
   var e = o._unused;
   if(e){
      o._unused = e.cnext;
      e.cnext = null;
      e._using = true;
   }
   return e;
}
MO.TClass_free = function TClass_free(v){
   var o = this;
   if(v._using){
      var u = o._unused;
      v.cnext = u;
      o._unused = v;
      v._using = false;
      for(var n in v){
         var cv = v[n];
         if(cv){
            if(!RClass.isBase(cv)){
               if(cv._class){
                  o.free(cv);
               }else if(o.isClass(cv, Array)){
                  for(var i = 0; i < cv.length; i++){
                     var mv = cv[i];
                     if(mv._class){
                        o.free(mv);
                     }
                  }
               }
            }
         }
      }
   }
}
MO.TClassBase = function TClassBase(){
   var o = this;
   o.__disposed = true;
   return o;
}
MO.TContext = function TContext(n, c, t){
   var o = this;
   o.name = n;
   o.code = c;
   o.text = t;
   return o;
}
MO.TDataset = function TDataset(){
   var o = this;
   o._code      = null;
   o._pageSize  = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total     = 0;
   o._rows      = new MO.TObjects();
   o.isEmpty    = MO.TDataset_isEmpty;
   o.createRow  = MO.TDataset_createRow;
   o.count      = MO.TDataset_count;
   o.row        = MO.TDataset_row;
   o.rows       = MO.TDataset_rows;
   o.find       = MO.TDataset_find;
   o.push       = MO.TDataset_push;
   o.loadConfig = MO.TDataset_loadConfig;
   o.clear      = MO.TDataset_clear;
   return o;
}
MO.TDataset_isEmpty = function TDataset_isEmpty(){
   var o = this;
   return o._rows.isEmpty();
}
MO.TDataset_createRow = function TDataset_createRow(){
   var o = this;
   var r = new MO.TRow();
   r._dataset = o;
   o._rows.push(r);
   return r;
}
MO.TDataset_count = function TDataset_count(){
   return this._rows.count();
}
MO.TDataset_row = function TDataset_row(p){
   return this._rows.get(p);
}
MO.TDataset_rows = function TDataset_rows(){
   return this._rows;
}
MO.TDataset_find = function TDataset_find(p){
   var o = this;
   var a = arguments;
   var l = a.length;
   if((l % 2) != 0){
      throw new MO.TError(o, 'Parameters must is pairs (length={1})', l);
   }
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var f = true;
      for(var i = 0; i < l; i += 2){
         if(r.get(a[n]) != a[n + 1]){
            f = false;
            break;
         }
      }
      if(f){
         return r;
      }
   }
   return null;
}
MO.TDataset_push = function TDataset_push(r){
   this._rows.push(r);
}
MO.TDataset_loadConfig = function TDataset_loadConfig(x){
   var o = this;
   o._code = x.get('name');
   o._pageSize = MO.Lang.Integer.parse(x.get('page_size', 1000));
   o._pageIndex = MO.Lang.Integer.parse(x.get('page', 0));
   o._pageCount = MO.Lang.Integer.parse(x.get('page_count', 1));
   o._total = MO.Lang.Integer.parse(x.get('total'));
   var xns = x.nodes();
   if(xns){
      var rs = o._rows;
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('Row')){
            var r = o.createRow();
            r.loadConfig(xn);
         }
      }
   }
}
MO.TDataset_clear = function TDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}
MO.TDataset_findIndex = function TDataset_findIndex(p){
   var o = this;
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      if(r._index = p){
         return r;
      }
   }
   return null;
}
MO.TDataset_remove = function TDataset_remove(i){
   return this._rows.remove(i);
}
MO.TDataset_removeRow = function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o._rows.remove(i);
   }
}
MO.TDataset_saveViewer = function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o._code;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v._count = o._rows._count;
   v._rows = o._rows;
   v.dataset = o;
}
MO.TDataset_pack = function TDataset_pack(){
   var o = this;
   var rs = o._rows;
   var ss = new MO.TStrings();
   for(var n = 0; n < rs._count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}
MO.TDataset_dump = function TDataset_dump(){
   var o = this;
   var r = new MO.TString();
   r.append(MO.Class._code(o));
   r.append(' count=', o._count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o._rows){
      var c = o._count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o._rows.get(n).dump(s);
         if(n != o._count-1){
            r.appendLine();
         }
      }
   }
   return r.toString();
}
MO.TDatasetViewer = function TDatasetViewer(){
   var o = this;
   o._datasetId = null;
   o._position  = 0;
   o._start     = 0;
   o._count     = 0;
   e._values   = null;
   o._rows      = null;
   o._ouids     = null;
   o.isEmpty   = MO.TDatasetViewer_isEmpty;
   o.count     = MO.TDatasetViewer_count;
   o.current   = MO.TDatasetViewer_current;
   o.reset     = MO.TDatasetViewer_reset;
   o.move      = MO.TDatasetViewer_move;
   o.moveToRow = MO.TDatasetViewer_moveToRow;
   o.first     = MO.TDatasetViewer_first;
   o.prior     = MO.TDatasetViewer_prior;
   o.next      = MO.TDatasetViewer_next;
   o.last      = MO.TDatasetViewer_last;
   return o;
}
MO.TDatasetViewer_isEmpty = function TDatasetViewer_isEmpty(){
   return (this._count == null);
}
MO.TDatasetViewer_count = function TDatasetViewer_count(){
   return this._count;
}
MO.TDatasetViewer_current = function TDatasetViewer_current(){
   var o = this;
   var s = o._rows;
   return s ? s.get(o._position - o._start) : null;
}
MO.TDatasetViewer_reset = function TDatasetViewer_reset(){
   this._position = -1;
}
MO.TDatasetViewer_move = function TDatasetViewer_move(p){
   this._position = p;
}
MO.TDatasetViewer_moveToRow = function TDatasetViewer_moveToRow(r){
   var o = this;
   var p = o._rows.indexOf(r);
   if(p != -1){
      o._position = p - o._start;
   }
}
MO.TDatasetViewer_first = function TDatasetViewer_first(r){
   this._position = r ? -1 : 0;
}
MO.TDatasetViewer_prior = function TDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}
MO.TDatasetViewer_next = function TDatasetViewer_next(){
   var o = this;
   if(o._position < o._count-1){
      o._position++;
      return true;
   }
   return false;
}
MO.TDatasetViewer_last = function TDatasetViewer_last(){
   this._position = this._count-1;
}
MO.TDate = function TDate(date){
   var o = this;
   o.date         = date ? date : new Date();
   o.year         = null;
   o.month        = null;
   o.day          = null;
   o.hour         = null;
   o.minute       = null;
   o.second       = null;
   o.ms           = null;
   o.equals       = MO.TDate_equals;
   o.isBefore     = MO.TDate_isBefore;
   o.isAfter      = MO.TDate_isAfter;
   o.monthDays    = MO.TDate_monthDays;
   o.monthWeekDay = MO.TDate_monthWeekDay;
   o.weekDay      = MO.TDate_weekDay;
   o.assign       = MO.TDate_assign;
   o.refresh      = MO.TDate_refresh;
   o.setYear      = MO.TDate_setYear;
   o.setMonth     = MO.TDate_setMonth;
   o.setDay       = MO.TDate_setDay;
   o.setHour      = MO.TDate_setHour;
   o.setMinute    = MO.TDate_setMinute;
   o.setSecond    = MO.TDate_setSecond;
   o.setDate      = MO.TDate_setDate;
   o.setNow       = MO.TDate_setNow;
   o.addYear      = MO.TDate_addYear;
   o.addMonth     = MO.TDate_addMonth;
   o.addDay       = MO.TDate_addDay;
   o.addHour      = MO.TDate_addHour;
   o.addMinute    = MO.TDate_addMinute;
   o.addSecond    = MO.TDate_addSecond;
   o.add          = MO.TDate_add;
   o.truncDay     = MO.TDate_truncDay;
   o.truncHour    = MO.TDate_truncHour;
   o.truncMinute  = MO.TDate_truncMinute;
   o.truncSecond  = MO.TDate_truncSecond;
   o.trunc        = MO.TDate_trunc;
   o.get          = MO.TDate_get;
   o.set          = MO.TDate_set;
   o.parse        = MO.TDate_parse;
   o.parseAuto    = MO.TDate_parseAuto;
   o.format       = MO.TDate_format;
   o.clone        = MO.TDate_clone;
   o.dump         = MO.TDate_dump;
   o.refresh();
   return o;
}
MO.TDate_equals = function TDate_equals(date){
   return this.date.getTime() == date.date.getTime();
}
MO.TDate_isBefore = function TDate_isBefore(date){
   return this.date.getTime() < date.date.getTime();
}
MO.TDate_isAfter = function TDate_isAfter(date){
   return this.date.getTime() > date.date.getTime();
}
MO.TDate_monthDays = function TDate_monthDays(){
   return RDate.monthDays(this.year, this.month);
}
MO.TDate_monthWeekDay = function TDate_monthWeekDay(){
   return (8 - (this.day - this.weekDay()) % 7) % 7;
}
MO.TDate_assign = function TDate_assign(value){
   var o = this;
   o.date.setTime(value.date.getTime());
   o.refresh();
}
MO.TDate_refresh = function TDate_refresh(){
   var o = this;
   var date = o.date;
   if(date){
      o.year = date.getFullYear();
      o.month = date.getMonth() + 1;
      o.day = date.getDate();
      o.hour = date.getHours();
      o.minute = date.getMinutes();
      o.second = date.getSeconds();
      o.ms = date.getMilliseconds();
   }
}
MO.TDate_weekDay = function TDate_weekDay(){
   return this.date.getDay();
}
MO.TDate_setYear = function TDate_setYear(value){
   var o = this;
   o.date.setFullYear(value);
   o.refresh();
}
MO.TDate_setMonth = function TDate_setMonth(value){
   var o = this;
   o.date.setMonth(parseInt(value, 10) - 1);
   o.refresh();
}
MO.TDate_setDay = function TDate_setDay(value){
   var o = this;
   o.date.setDate(value);
   o.refresh();
}
MO.TDate_setHour = function TDate_setHour(value){
   var o = this;
   o.date.setHours(value);
   o.refresh();
}
MO.TDate_setMinute = function TDate_setMinute(value){
   var o = this;
   o.date.setMinutes(value);
   o.refresh();
}
MO.TDate_setSecond = function TDate_setSecond(value){
   var o = this;
   o.date.setSeconds(value);
   o.refresh();
}
MO.TDate_setDate = function TDate_setDate(value){
   var o = this;
   o.date = value;
   o.refresh();
}
MO.TDate_setNow = function TDate_setNow(){
   var o = this;
   o.date = new Date();
   o.refresh();
}
MO.TDate_addYear = function TDate_addYear(value){
   var o = this;
   var year = o.date.getFullYear();
   o.date.setFullYear(year + MO.Lang.Integer.nvl(value, 1));
   o.refresh();
}
MO.TDate_addMonth = function TDate_addMonth(value){
   var o = this;
   var month = o.date.getMonth();
   o.date.setMonth(month + MO.Lang.Integer.nvl(value, 1));
   o.refresh();
}
MO.TDate_addDay = function TDate_addDay(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * 60 * 24 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_addHour = function TDate_addHour(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * 60 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_addMinute = function TDate_addMinute(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * 60 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_addSecond = function TDate_addSecond(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + (1000 * MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_add = function TDate_add(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time + MO.Lang.Integer.nvl(value, 1);
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_truncDay = function TDate_truncDay(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * 60 * 24 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_truncHour = function TDate_truncHour(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * 60 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_truncMinute = function TDate_truncMinute(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * 60 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_truncSecond = function TDate_truncSecond(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % (1000 * MO.Lang.Integer.nvl(value, 1)));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_trunc = function TDate_trunc(value){
   var o = this;
   var time = o.date.getTime();
   var tick = time - (time % MO.Lang.Integer.nvl(value, 1));
   o.date.setTime(tick);
   o.refresh();
}
MO.TDate_get = function TDate_get(value){
   return this.date.getTime();
}
MO.TDate_set = function TDate_set(value){
   var o = this;
   o.date.setTime(value);
   o.refresh();
}
MO.TDate_parse = function TDate_parse(value, format){
   return MO.Lang.Date.parse(this, value, format);
}
MO.TDate_parseAuto = function TDate_parseAuto(value){
   return MO.Lang.Date.autoParse(this, value);
}
MO.TDate_format = function TDate_format(format){
   return MO.Lang.Date.formatDate(this, format);
}
MO.TDate_clone = function TDate_clone(){
   var value = new Date();
   value.setTime(this.date.getTime());
   return new MO.TDate(value);
}
MO.TDate_dump = function TDate_dump(){
   return MO.Class.dump(this) + ' ' + MO.Lang.Date.formatDate(this);
}
MO.TError = function TError(po, pm, pp){
   var o = this;
   var r = new MO.TString();
   var f = MO.TError.caller;
   var s = new MO.TString();
   var t = new Array();
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 2; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = MO.Method.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   var info = r.flush();
   alert(info);
}
MO.TFatalError = function TFatalError(po, pe, pm, pp){
   var o = this;
   var r = new MO.TString();
   var f = TFatalError.caller;
   var s = new MO.TString();
   var t = new Array();
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 2; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = MO.Method.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
MO.TInstancePool = function TInstancePool(){
   var o = this;
   MO.TObjects.call(o);
   o._instance = null;
   o.instance  = MO.TInstancePool_instance;
   o.alloc     = MO.TInstancePool_alloc;
   o.free      = MO.TInstancePool_free;
   return o;
}
MO.TInstancePool_instance = function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = MO.Class.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}
MO.TInstancePool_alloc = function TInstancePool_alloc(p){
   var o = this;
   var r = null;
   if(o._count == 0){
      r = MO.Class.create(p);
      r.instanceCreate();
   }else{
      r = o.pop();
   }
   r.instanceAlloc();
   return r;
}
MO.TInstancePool_free = function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
MO.TInvoke = function TInvoke(){
   var o = this;
   o.owner    = null;
   o.callback = null;
   o.invoke   = MO.TInvoke_invoke;
   return o;
}
MO.TInvoke_invoke = function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
   var o = this;
   if(o.callback){
      var c = o.owner ? o.owner : o;
      try{
         o.callback.call(c, p1, p2, p3, p4, p5, p6);
      }catch(e){
         MO.Logger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
      }
   }
}
MO.TListener = function TListener(){
   var o = this;
   o._owner    = null;
   o._callback = null;
   o.process   = MO.TListener_process;
   o.toString  = MO.TListener_toString;
   o.dispose   = MO.TListener_dispose;
   return o;
}
MO.TListener_process = function TListener_process(sender, parameter1, parameter2, parameter3, parameter4, parameter5){
   var o = this;
   var owner = o._owner ? o._owner : o;
   try{
      o._callback.call(owner, sender, parameter1, parameter2, parameter3, parameter4, parameter5);
   }catch(error){
      MO.Logger.fatal(o, error, 'Listener process failure. (owner={1})', owner);
   }
}
MO.TListener_toString = function TListener_toString(){
   var o = this;
   return MO.Class.name(o) + '(owner=' + MO.Class.name(o._owner) + ', callback=' + MO.Method.name(o._callback) + ')';
}
MO.TListener_dispose = function TListener_dispose(){
   var o = this;
   o._owner = null;
   o._callback = null;
   MO.Lang.Object.free(o);
}
MO.TListeners = function TListeners(){
   var o = this;
   o._listeners = null;
   o.isEmpty    = MO.TListeners_isEmpty;
   o.find       = MO.TListeners_find;
   o.register   = MO.TListeners_register;
   o.unregister = MO.TListeners_unregister;
   o.push       = MO.TListeners_push;
   o.remove     = MO.TListeners_remove;
   o.process    = MO.TListeners_process;
   o.clear      = MO.TListeners_clear;
   o.dispose    = MO.TListeners_dispose;
   o.dump       = MO.TListeners_dump;
   return o;
}
MO.TListeners_isEmpty = function TListeners_isEmpty(){
   var listeners = this._listeners;
   return listeners ? listeners.isEmpty() : true;
}
MO.TListeners_find = function TListeners_find(owner, callback){
   var listeners = this._listeners;
   if(listeners){
      var count = listeners.count();
      for(var i = 0; i < count; i++){
         var listener = listeners.at(i);
         if(listener._owner == owner){
            if(listener._callback == callback){
               return listener;
            }
         }
      }
   }
   return null;
}
MO.TListeners_register = function TListeners_register(owner, callback){
   var o = this;
   var listener = o.find(owner, callback);
   if(listener){
      throw new MO.TError(o, 'Listener is already register. (owner={1}, process={2})', owner, callback);
   }
   listener = new MO.TListener();
   listener._owner = owner;
   listener._callback = callback;
   o.push(listener);
   return listener;
}
MO.TListeners_unregister = function TListeners_unregister(owner, callback){
   var o = this;
   var listener = o.find(owner, callback);
   if(!listener){
      throw new MO.TError(o, 'Listener is not register. (owner={1}, process={2})', owner, callback);
   }
   o.remove(listener);
   listener.dispose();
}
MO.TListeners_push = function TListeners_push(listener){
   var o = this;
   if(!listener){
      throw new MO.TError(o, 'Listener is null.');
   }
   if(!listener._callback){
      throw new MO.TError(o, 'Listener process is null.');
   }
   var listeners = o._listeners;
   if(!listeners){
      listeners = o._listeners = new MO.TObjects();
   }
   listeners.push(listener);
}
MO.TListeners_remove = function TListeners_remove(listener){
   var o = this;
   if(!listener){
      throw new MO.TError(o, 'Listener is null.');
   }
   o._listeners.remove(listener);
}
MO.TListeners_process = function TListeners_process(ps, p1, p2, p3, p4, p5){
   var listeners = this._listeners;
   if(listeners){
      var count = listeners.count();
      for(var i = 0; i < count; i++){
         listeners.at(i).process(ps, p1, p2, p3, p4, p5);
      }
   }
}
MO.TListeners_clear = function TListeners_clear(){
   var listeners = this._listeners;
   if(listeners){
      listeners.clear();
   }
}
MO.TListeners_dispose = function TListeners_dispose(){
   var o = this;
   var listeners = o._listeners;
   if(listeners){
      for(var i = listeners.count() - 1; i >= 0; i--){
         listeners.at(i).dispose();
      }
      o._listeners = MO.Lang.Object.dispose(listeners);
   }
   MO.Lang.Object.free(o);
}
MO.TListeners_dump = function TListeners_dump(){
   var o = this;
   var result = new MO.TString();
   result.append(MO.Class.name(o));
   var listeners = o._listeners;
   var count = listeners.count();
   for(var i = 0; i < count; i++){
      result.append('\n   ' + listeners.at(i));
   }
   return result.flush();
}
MO.TLoaderListener = function TLoaderListener(){
   var o = this;
   o.invoke = null;
   o.ids    = new MO.TArray();
   o.check  = MO.TLoaderListener_check;
   return o;
}
MO.TLoaderListener_check = function TLoaderListener_check(l){
   var s = this.ids;
   if(!s.isEmpty()){
      var c = s.length;
      for(var n = 0; n < c; n++){
         if(!l.contains(s.get(n))){
            return false;
         }
      }
   }
   return true;
}
MO.TLocker = function TLocker(){
   var o = this;
   o._lock = false;
   o.enter = MO.TLocker_enter;
   o.leave = MO.TLocker_leave;
   return o;
}
MO.TLocker_enter = function TLocker_enter(){
   this._lock = true;
}
MO.TLocker_leave = function TLocker_leave(){
   this._lock = false;
}
MO.TMessage = function TMessage(){
   var o = this;
   o.typeCd      = MO.EMessage.None;
   o.attrType    = null;
   o.message     = null;
   o.description = null;
   o.redirect    = null;
   o.loadConfig = MO.TMessage_loadConfig;
   o.saveConfig = MO.TMessage_saveConfig;
   o.icon       = MO.TMessage_icon;
   return o;
}
MO.TMessage_loadConfig = function TMessage_loadConfig(config){
   var o = this;
   o.typeCd      = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}
MO.TMessage_saveConfig = function TMessage_saveConfig(config){
   var o = this;
   config.name = o.typeCd;
   config.set('message', o.message);
   config.set('description', o.description);
}
MO.TMessage_icon = function TMessage_icon(){
   return 'sys.msg.' + this.typeCd;
}
MO.TMessages = function TMessages(){
   var o = this;
   o._items     = new MO.TObjects();
   o.hasMessage = MO.TMessages_hasMessage;
   o.message    = MO.TMessages_message;
   o.messages   = MO.TMessages_messages;
   o.type       = MO.TMessages_type;
   o.push       = MO.TMessages_push;
   return o;
}
MO.TMessages_hasMessage = function TMessages_hasMessage(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}
MO.TMessages_message = function TMessages_message(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
MO.TMessages_messages = function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this._items.count; n++){
      var msg = this._items.get(n);
      if(msg && msg.type == type){
         if(!rs){
            rs = new TList();
         }
         rs.push(msg);
      }
   }
   return rs;
}
MO.TMessages_type = function TMessages_type(){
   if(this.hasMessage(EMessage.Fatal)){
      return EMessage.Fatal;
   }
   if(this.hasMessage(EMessage.Error)){
      return EMessage.Error;
   }
   if(this.hasMessage(EMessage.Warn)){
      return EMessage.Warn;
   }
   if(this.hasMessage(EMessage.Valid)){
      return EMessage.Valid;
   }
   if(this.hasMessage(EMessage.Info)){
      return EMessage.Info;
   }
   return EMessage.None;
}
MO.TMessages_push = function TMessages_push(msg){
   if(msg){
      this._items.push(msg);
   }
}
MO.TNode = function TNode(name){
   var o = this;
   o._name        = MO.Lang.String.nvl(name, 'Node');
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   o.isName       = MO.TNode_isName;
   o.name         = MO.TNode_name;
   o.setName      = MO.TNode_setName;
   o.value        = MO.TNode_value;
   o.setValue     = MO.TNode_setValue;
   o.contains     = MO.TNode_contains;
   o.hasAttribute = MO.TNode_hasAttribute;
   o.attributes   = MO.TNode_attributes;
   o.hasNode      = MO.TNode_hasNode;
   o.nodeCount    = MO.TNode_nodeCount;
   o.node         = MO.TNode_node;
   o.nodes        = MO.TNode_nodes;
   o.get          = MO.TNode_get;
   o.getInteger   = MO.TNode_getInteger;
   o.set          = MO.TNode_set;
   o.setNvl       = MO.TNode_setNvl;
   o.setBoolean   = MO.TNode_setBoolean;
   o.setFloat     = MO.TNode_setFloat;
   o.find         = MO.TNode_find;
   o.findNode     = MO.TNode_findNode;
   o.searchNode   = MO.TNode_searchNode;
   o.push         = MO.TNode_push;
   o.toString     = MO.TNode_toString;
   o.innerDump    = MO.TNode_innerDump;
   o.dump         = MO.TNode_dump;
   return o;
}
MO.TNode_isName = function TNode_isName(n){
   return MO.Lang.String.equals(this._name, n);
}
MO.TNode_name = function TNode_name(){
   return this._name;
}
MO.TNode_setName = function TNode_setName(p){
   this._name = p;
}
MO.TNode_value = function TNode_value(){
   return this._value;
}
MO.TNode_setValue = function TNode_setValue(p){
   this._value = p;
}
MO.TNode_contains = function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}
MO.TNode_hasAttribute = function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}
MO.TNode_attributes = function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new MO.TAttributes();
   }
   return r;
}
MO.TNode_hasNode = function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}
MO.TNode_nodeCount = function TNode_nodeCount(){
   var nodes = this._nodes;
   return nodes ? nodes.count() : 0;
}
MO.TNode_node = function TNode_node(index){
   var nodes = this._nodes;
   return nodes ? nodes.at(index) : null;
}
MO.TNode_nodes = function TNode_nodes(){
   var o = this;
   var nodes = o._nodes;
   if(!nodes){
      nodes = o._nodes = new MO.TObjects();
   }
   return nodes;
}
MO.TNode_get = function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}
MO.TNode_getInteger = function TNode_getInteger(n, v){
   return MO.Lang.Integer.parse(this.get(n, v));
}
MO.TNode_set = function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}
MO.TNode_setNvl = function TNode_setNvl(name, value){
   if(!MO.Lang.String.isEmpty(value)){
      this.attributes().set(name, value);
   }
}
MO.TNode_setBoolean = function TNode_setBoolean(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Boolean.format(v));
   }
}
MO.TNode_setFloat = function TNode_setFloat(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Float.format(v));
   }
}
MO.TNode_find = function TNode_find(p){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n.isName(p)){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_findNode = function TNode_findNode(pn, pv){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var nc = ns.count();
      var as = arguments;
      var ac = as.length;
      if((ac - 1) % 2){
         throw new MO.TError('Attributes is not pair. (length={1})', ac);
      }
      for(var ni = 0; ni < nc; ni++){
         var n = ns.get(ni);
         if(pn != null){
            if(!n.isName(pn)){
               continue;
            }
         }
         var f = true;
         for(var ai = 1; ai < ac; ai += 2){
            if(n.get(as[ai]) != as[ai + 1]){
               f = false;
               break;
            }
         }
         if(f){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_searchNode = function TNode_searchNode(pn, pv){
   var o = this;
   if(o.hasAttribute()){
      if(o._attributes.get(pn) == pv){
         return o;
      }
   }
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; ni++){
         var n = ns.get(n).searchNode(pn, pv);
         if(n != null){
            return n;
         }
      }
   }
   return null;
}
MO.TNode_push = function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}
MO.TNode_toString = function TNode_toString(){
   return this.dump();
}
MO.TNode_innerDump = function TNode_innerDump(dump, node, space){
   if(space == null){
      space = '';
   }
   dump.append(space, node._name, '(', RClass.name(node), ')');
   var attributes = node._attributes;
   if(attributes){
      var count = attributes.count();
      dump.append(' [', count, ':');
      for(var n = 0; n < count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(attributes.name(n), '=', attributes.value(n));
         if(n < count - 1){
            dump.append(',');
         }
      }
      dump.append(']');
   }
   if(node._value){
      var value = node._value.toString();
      if(!MO.Lang.String.isEmpty(value)){
         dump.append(' {', value.length, ':', value, '}');
      }
   }
   var nodes = node._nodes;
   if(nodes){
      var count = nodes.count();
      dump.append('\n');
      for(var n = 0; n < count; n++){
         nodes.get(n).dump(dump, space + '   ');
         if(n < count - 1){
            dump.append('\n');
         }
      }
   }
   return dump;
}
MO.TNode_dump = function TNode_dump(d, space){
   return this.innerDump(MO.Lang.String.nvlString(d), this, space);
}
MO.TRow = function TRow(){
   var o = this;
   MO.TAttributes.call(o);
   o._dataset   = null;
   o._index     = null;
   o._uniqueId  = null;
   o._statusCd  = null;
   o.loadConfig = MO.TRow_loadConfig;
   o.saveConfig = MO.TRow_saveConfig;
   return o;
}
MO.TRow_loadConfig = function TRow_loadConfig(x){
   var o = this;
   o._index = x.get('_id');
   o._statusCd = x.get('_status');
   o._uniqueId = x.get('ouid');
   if(x.hasAttribute()){
      o.append(x.attributes());
   }
}
MO.TRow_saveConfig = function TRow_saveConfig(x){
   var o = this;
   x.set('_id', o._index);
   x.set('_status', o._statusCd);
   var c = o.count();
   for(var i = 0; i < c; i++){
      x.set(o._names[i], o._values[i]);
   }
}
MO.TRow_copy = function TRow_copy(){
   var o = this;
   var r = new TRow();
   r._dataset = o._dataset;
   r._index = o._index;
   r._statusCd = o._statusCd;
   r._uniqueId = o._uniqueId;
   var c = o.count;
   for(var n = 0; n < c; n++){
      r.set(o.names[n], o.values[n]);
   }
   return r;
}
MO.TRow_toAttributes = function TRow_toAttributes(a){
   var o = this;
   if(!a){
      a = new MO.TAttributes();
   }
   a.set(RDataset.ROW_STATUS, o._statusCd);
   a.append(o);
   return a;
}
MO.TRow_dump = function TRow_dump(s){
   var o = this;
   var c = o.count;
   s = MO.Lang.String.nvlStr(s);
   s.append(MO.Class.name(o), ' [', o._statusCd, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
MO.TSpeed = function TSpeed(){
   var o = this;
   o.arguments  = arguments;
   o._start     = 0;
   o._end       = 0;
   o._span      = 0;
   o._spanMin   = Number.MAX_VALUE;
   o._spanMax   = 0;
   o.start      = new Date().getTime();
   o.callerName = MO.Method.name(MO.TSpeed.caller);
   o.reset      = MO.TSpeed_reset;
   o.begin      = MO.TSpeed_begin;
   o.end        = MO.TSpeed_end;
   o.record     = MO.TSpeed_record;
   o.toString   = MO.TSpeed_toString;
   return o;
}
MO.TSpeed_reset = function TSpeed_reset(){
   var o = this;
   o._start = 0;
   o._end = 0;
   o._span = 0;
}
MO.TSpeed_begin = function TSpeed_begin(){
   var o = this;
   o._start = new Date().getTime();
}
MO.TSpeed_end = function TSpeed_end(){
   var o = this;
   o._end = new Date().getTime();
   o._span += o._end - o._start;
   if(o._span < o._spanMin){
      o._spanMin = o._span;
   }
   if(o._span > o._spanMax){
      o._spanMax = o._span;
   }
}
MO.TSpeed_record = function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   MO.Logger.debug(o, 'Speed test. (caller={1}, speed={2}, arguments={3})', o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
MO.TSpeed_toString = function TSpeed_toString(){
   var o = this;
   return o._span + ' (' + o._spanMin + ' - ' + o._spanMax + ')';
}
MO.TTicker = function TTicker(interval){
   var o = this;
   o.interval = interval;
   o.lastTick = 0;
   o.process  = MO.TTicker_process;
}
MO.TTicker_process = function TTicker_process(){
   var o = this;
   var tick = MO.Timer.current();
   var span = tick - o.lastTick;
   if(span > o.interval){
      o.lastTick = tick;
      return true;
   }
   return false;
}
MO.TUnsupportError = function TUnsupportError(po, pp){
   var o = this;
   var pm = 'Unsupport method. (name={1})'
   var r = new MO.TString();
   var f = TUnsupportError.caller;
   var s = new MO.TString();
   var t = new Array();
   while(f){
      if(MO.Lang.Array.contains(t, f)){
         break;
      }
      t.push(f);
      f = f.caller;
   }
   var c = t.length;
   for(var n = 0; n < c; n++){
      f = t[n];
      if(n > 0){
         s.appendLine();
      }
      s.append('   ' + (c - n) + ': ' + MO.Method.name(f));
   }
   var a = arguments;
   var c = a.length;
   for(var n = 1; n < c; n++){
      var v = a[n];
      var vs = null;
      if(typeof(v) == 'function'){
         vs = MO.Method.name(v);
      }else{
         vs = v;
      }
      pm = pm.replace('{' + (n - 1) + '}', vs);
   }
   r.appendLine(pm);
   r.appendLine('------------------------------------------------------------');
   r.append(s);
   throw new Error(r);
}
MO.FConsole = function FConsole(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._scopeCd     = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   o._statusSetup = false;
   o.onSetup      = MO.Method.empty;
   o.setup        = MO.FConsole_setup;
   return o;
}
MO.FConsole_setup = function FConsole_setup(){
   var o = this;
   if(!o._statusSetup){
      o.onSetup();
      o._statusSetup = true;
   }
}
MO.FObject = function FObject(o){
   if(!o){o = this;}
   o.__class   = null;
   o.__dispose = false;
   o.__hash    = 0;
   o.construct = MO.FObject_construct;
   o.hashCode  = MO.FObject_hashCode;
   o.toString  = MO.FObject_toString;
   o.dispose   = MO.FObject_dispose;
   o.innerDump = MO.FObject_innerDump;
   o.dump      = MO.FObject_dump;
   return o;
}
MO.FObject_construct = function FObject_construct(){
   this.__dispose = false;
}
MO.FObject_hashCode = function FObject_hashCode(){
   var o = this;
   var hash = o.__hash;
   if(!hash){
      hash = o.__hash = MO.RObject.nextId();
   }
   return hash;
}
MO.FObject_toString = function FObject_toString(){
   return MO.Class.dump(this);
}
MO.FObject_dispose = function FObject_dispose(){
   var o = this;
   MO.RObject.free(o);
   o.__dispose = true;
}
MO.FObject_innerDump = function FObject_innerDump(dump, level){
   dump.append(MO.Class.dump(this));
}
MO.FObject_dump = function FObject_dump(){
   var result = new MO.TString();
   this.innerDump(result, 0);
   return result.flush();
}
MO.FObjectPool = function FObjectPool(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._items      = MO.Class.register(o, new MO.AGetter('_items'));
   o._frees      = MO.Class.register(o, new MO.AGetter('_frees'));
   o._allocCount = 0;
   o._freeCount  = 0;
   o.construct   = MO.FObjectPool_construct;
   o.hasFree     = MO.FObjectPool_hasFree;
   o.alloc       = MO.FObjectPool_alloc;
   o.free        = MO.FObjectPool_free;
   o.push        = MO.FObjectPool_push;
   o.dispose     = MO.FObjectPool_dispose;
   o.innerDump   = MO.FObjectPool_innerDump;
   return o;
}
MO.FObjectPool_construct = function FObjectPool_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new MO.TObjects();
   o._frees = new MO.TObjects();
}
MO.FObjectPool_hasFree = function FObjectPool_hasFree(){
   return !this._frees.isEmpty();
}
MO.FObjectPool_alloc = function FObjectPool_alloc(){
   var o = this;
   var item = null;
   if(!o._frees.isEmpty()){
      item = o._frees.pop();
   }
   o._allocCount++;
   return item;
}
MO.FObjectPool_free = function FObjectPool_free(item){
   var o = this;
   o._frees.push(item);
   o._freeCount++;
}
MO.FObjectPool_push = function FObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}
MO.FObjectPool_dispose = function FObjectPool_dispose(){
   var o = this;
   o._items = MO.RObject.dispose(o._items);
   o._frees = MO.RObject.dispose(o._frees);
   o.__base.FObject.dispose.call(o);
}
MO.FObjectPool_innerDump = function FObjectPool_innerDump(result, level){
   var o = this;
   result.append('Pool:');
   result.append('total=', o._items.count());
   result.append(', free=', o._frees.count());
   result.append(', alloc_count=', o._allocCount);
   result.append(', free_count=', o._freeCount);
}
MO.FObjectPools = function FObjectPools(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._pools    = null;
   o.construct = MO.FObjectPools_construct;
   o.pool      = MO.FObjectPools_pool;
   o.alloc     = MO.FObjectPools_alloc;
   o.free      = MO.FObjectPools_free;
   o.dispose   = MO.FObjectPools_dispose;
   return o;
}
MO.FObjectPools_construct = function FObjectPools_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._pools = new MO.TDictionary();
}
MO.FObjectPools_pool = function FObjectPools_pool(code){
   var o = this;
   var pool = o._pools.get(code);
   if(!pool){
      pool = MO.Class.create(MO.FObjectPool);
      o._pools.set(code, pool);
   }
   return pool;
}
MO.FObjectPools_alloc = function FObjectPools_alloc(code){
   var o = this;
   var pool = o.pool(code);
   return pool.alloc();
}
MO.FObjectPools_free = function FObjectPools_free(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.free(instance);
}
MO.FObjectPools_push = function FObjectPools_push(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.push(instance);
}
MO.FObjectPools_dispose = function FObjectPools_dispose(){
   var o = this;
   var pools = o._pools;
   var count = pools.count();
   for(var i = 0; i < count; i++){
      var pool = pools.at(i);
      pool.dispose();
   }
   pools.dispose();
   o.__base.FObject.dispose.call(o);
}
MO.FTimer = function FTimer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._count      = 0;
   o._startTime  = 0;
   o._beginTime  = 0;
   o._endTime    = 0;
   o._stopTime   = 0;
   o._span       = MO.Class.register(o, new MO.AGetter('_span'), 0);
   o._spanSecond = MO.Class.register(o, new MO.AGetter('_spanSecond'), 0);
   o.setup       = MO.FTimer_setup;
   o.current     = MO.FTimer_current;
   o.rate        = MO.FTimer_rate;
   o.update      = MO.FTimer_update;
   return o;
}
MO.FTimer_setup = function FTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._beginTime = n;
   o._endTime = n;
}
MO.FTimer_current = function FTimer_current(){
   return this._lastTime;
}
MO.FTimer_rate = function FTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
MO.FTimer_update = function FTimer_update(){
   var o = this;
   o._count++;
   var b = o._beginTime = o._endTime;
   var e = o._endTime = new Date().getTime();
   var s = o._span = e - b;
   o._spanSecond = s / 1000;
}
MO.RArray = function RArray(){
   var o = this;
   o.array1           = new Array(1);
   o.array2           = new Array(2);
   o.array3           = new Array(3);
   o.array4           = new Array(4);
   o.array9           = new Array(9);
   o.array12          = new Array(12);
   o.array16          = new Array(16);
   o.sortComparerAsc  = MO.Runtime.sortComparerAsc;
   o.sortComparerDesc = MO.Runtime.sortComparerDesc;
   o.pairSortMid      = MO.Runtime.pairSortMid;
   o.pairSortSub      = MO.Runtime.pairSortSub;
   o.pairSort         = MO.Runtime.pairSort;
   return o;
}
MO.RArray.prototype.equals = function RArray_equals(s, t){
   if(s && t){
      if(s.length == t.length){
         var c = s.length;
         for(var n = 0; n < c; n++){
            if(s[n] != t[n]){
               return false;
            }
         }
         return true;
      }
   }
   return false;
}
MO.RArray.prototype.count = function RArray_count(value){
   var count = 0;
   for(var name in value){
      count++;
   }
   return count;
}
MO.RArray.prototype.contains = function RArray_contains(array, v){
   var c = array.length;
   for(var n = 0; n < c; n++){
      if(array[n] == v){
         return true;
      }
   }
   return false;
}
MO.RArray.prototype.find = function RArray_find(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return n;
      }
   }
   return -1;
}
MO.RArray.prototype.search = function RArray_search(a, v){
   for(var n in a){
      if(a[n] == v){
         return n;
      }
   }
   return null;
}
MO.RArray.prototype.reverse = function RArray_reverse(a, s, e){
   var c = (e + 1 - s) >> 1;
   for(var n = 0; n < c; n++){
      var t = a[s + n];
      a[s + n] = a[e - n];
      a[e - n] = t;
   }
}
MO.RArray.prototype.copy = function RArray_copy(source, sourceOffset, sourceCount, target, targetOffset){
   MO.Assert.debugNotNull(source);
   MO.Assert.debugTrue((sourceOffset >= 0) && (sourceOffset + sourceCount <= source.length));
   MO.Assert.debugTrue(sourceCount <= source.length);
   MO.Assert.debugNotNull(target);
   MO.Assert.debugTrue((targetOffset >= 0) && (targetOffset + sourceCount <= target.length));
   for(var i = 0; i < sourceCount; i++){
      target[i + targetOffset] = source[i + sourceOffset];
   }
   return target;
}
MO.RArray.prototype.move = function RArray_move(array, offset, count, target){
   if(offset > target){
      for(var n = 0; n < count; n++){
         array[target - n] = array[offset + n];
      }
   }else if(offset < target){
      for(var n = 0; n < count; n++){
         array[target + count - n - 1] = array[offset + count - n - 1];
      }
   }
}
MO.RArray.prototype.remove = function RArray_remove(a, n){
   return a.slice(0, n).concat(a.slice(n + 1));
}
MO.RArray.prototype.sortPartition = function RArray_sortPartition(a, l, r){
   var s = l;
   var e = r + 1;
   var t = a[s];
   while(true){
      while(a[++s] < t){
      }
      while(a[--e] > t){
      }
      if(s > e){
         break;
      }
      var v = a[s];
      a[s] = a[e];
      a[e] = v;
   }
   a[l] = a[e];
   a[e] = t;
   return e;
}
MO.RArray.prototype.sortArray = function RArray_sortArray(a, s, e){
   if(s < e){
      var o = this;
      var p = o.sortPartition(a, s, e);
      o.sortArray(a, s, p - 1);
      o.sortArray(a, p + 1, e);
   }
}
MO.RArray.prototype.sort = function RArray_sort(a, t){
   var o = this;
   var c = a.length - 1;
   o.sortArray(a, 0, c);
   if(t){
      o.reverse(a, 0, c);
   }
   return a;
}
MO.RArray.prototype.nameMaxLength = function RArray_nameMaxLength(a){
   var r = 0;
   for(var n in a){
      var l = n.length;
      if(l > n){
         n = l;
      }
   }
   return r;
}
MO.RArray.prototype.quickSort = function RArray_quickSort(items, offset, count, comparer, parameters){
   this.pairSort(items, null, offset, count, comparer, parameters);
}
MO.RArray = new MO.RArray();
MO.Lang.Array = MO.RArray;
MO.RBlob = function RBlob(){
   return this;
}
MO.RBlob.prototype.fromText = function RBlob_fromText(value){
   var length = value.length;
   var data = new Uint8Array(length);
   for (var i = 0; i < length; i++) {
      data[i] = value.charCodeAt(i);
   }
   var blob = new Blob([data]);
   return blob;
}
MO.Lang.Blob = new MO.RBlob();
MO.RBoolean = function RBoolean(){
   return this;
}
MO.RBoolean.prototype.format = function RBoolean_format(value){
   return value ? MO.EBoolean.True : MO.EBoolean.False;
}
MO.RBoolean.prototype.parse = function RBoolean_parse(value){
   if(value != null){
      if(value.constructor == Boolean){
         return value;
      }else if(value.constructor == String){
         return (value == MO.EBoolean.True);
      }else if(value.constructor == Number){
         return value > 0;
      }else{
         throw new MO.TError(this, 'Unknown type.');
      }
   }
   return false;
}
MO.RBoolean.prototype.toString = function RBoolean_toString(value, valueTrue, valueFalse){
   if(valueTrue == null){
      valueTrue = MO.EBoolean.True;
   }
   if(valueFalse == null){
      valueFalse = MO.EBoolean.False;
   }
   return value ? valueTrue : valueFalse;
}
MO.RBoolean = new MO.RBoolean();
MO.Lang.Boolean = MO.RBoolean;
MO.RByte = function RByte(){
   return this;
}
MO.RByte.prototype.copy = function RByte_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
MO.RByte = new MO.RByte();
MO.Lang.Byte = MO.RByte;
MO.RChar = function RChar(){
   return this;
}
MO.RChar.prototype.parse = function RChar_parse(n){
   return String.fromCharCode(n);
}
MO.RChar.prototype.toString = function RChar_toString(value){
   return value;
}
MO.RChar = new MO.RChar();
MO.Lang.Char = MO.RChar;
MO.RClass = function RClass(){
   var o = this;
   o._codes   = new Array();
   o._classes = new Object();
   return o;
}
MO.RClass.prototype.isBase = function RClass_isBase(value){
   if(value != null){
      var typeName = typeof(value);
      return MO.Class.isBaseName(typeName);
   }
   return false;
}
MO.RClass.prototype.isBaseName = function RClass_isBaseName(typeName){
   if(typeName != null){
      if(typeName == 'boolean'){
         return true;
      }else if(typeName == 'number'){
         return true;
      }else if(typeName == 'date'){
         return true;
      }else if(typeName == 'string'){
         return true;
      }else if(typeName == 'function'){
         return true;
      }
   }
   return false;
}
MO.RClass.prototype.isBaseDataName = function RClass_isBaseDataName(typeName){
   if(typeName != null){
      if(typeName == 'boolean'){
         return true;
      }else if(typeName == 'number'){
         return true;
      }else if(typeName == 'date'){
         return true;
      }else if(typeName == 'string'){
         return true;
      }
   }
   return false;
}
MO.RClass.prototype.isBaseType = function RClass_isBaseType(clazz){
   if(clazz != null){
      if(clazz == Boolean){
         return true;
      }else if(clazz == Number){
         return true;
      }else if(clazz == Date){
         return true;
      }else if(clazz == String){
         return true;
      }else if(clazz == Function){
         return true;
      }
   }
   return false;
}
MO.RClass.prototype.isBaseDataType = function RClass_isBaseDataType(clazz){
   if(clazz != null){
      if(clazz == Boolean){
         return true;
      }else if(clazz == Number){
         return true;
      }else if(clazz == Date){
         return true;
      }else if(clazz == String){
         return true;
      }
   }
   return false;
}
MO.RClass.prototype.isName = function RClass_isName(value, name){
   return (this.name(value) == name);
}
MO.RClass.prototype.isClass = function RClass_isClass(v, c){
   if(v && c){
      var o = this;
      var n = o.name(c);
      if(v.__base){
         return (v.__base[n] != null);
      }else{
         return (o.name(v) == n);
      }
   }
   return false;
}
MO.RClass.prototype.typeOf = function RClass_typeOf(o){
   if(o && o.constructor){
      return MO.Lang.String.mid(o.constructor.toString(), 'function ', '(');
   }
   return 'Null';
}
MO.RClass.prototype.safeTypeOf = function RClass_safeTypeOf(value, safe){
   if(value == null){
      return 'Null';
   }
   try{
      var c = value.constructor;
      if(c == Boolean){
         return 'Boolean';
      }
      if(c == Number){
         return 'Number';
      }
      if(c == String){
         return 'String';
      }
      if(c == Function){
         return MO.Lang.String.mid(c.toString(), 'function ', '(');
      }
      if(c.constructor == Function){
         return MO.Lang.String.mid(c.toString(), 'function ', '(');
      }
      if(value.__class){
         return value.__class.name;
      }
      if(value.tagName){
         return 'Html';
      }
      for(var name in value){
         return 'Object';
      }
   }catch(e){
   }
   return 'Unknown';
}
MO.RClass.prototype.checkClass = function RClass_checkClass(v, c){
   if(!this.isClass(v, c)){
      throw new Error('Invalid class ' + o.name(o) + '<>' + o.name(c));
   }
}
MO.RClass.prototype.code = function RClass_code(v){
   var c = this._codes;
   var l = c.length;
   for(var n = 0; n < l; n++){
      if(c[n] == v){
         return n;
      }
   }
   c[l] = v;
   return l;
}
MO.RClass.prototype.name = function RClass_name(value){
   if(value){
      if(value.__name){
         return value.__name;
      }
      if(value.__class){
         return value.__class.name;
      }
      if(typeof(value) == 'function'){
         return MO.Method.name(value);
      }
      var method = value.constructor;
      if(method){
         return MO.Lang.String.mid(method.toString(), 'function ', '(');
      }
   }
   return null;
}
MO.RClass.prototype.inherits = function RClass_inherits(s, p){
   var base = MO.Runtime.nvl(p, s);
   base.__inherits = new Array();
   var count = arguments.length;
   for(var i = 2; i < count; i++){
      base.__inherits.push(MO.Method.name(arguments[i]));
   }
   return base;
}
MO.RClass.prototype.forName = function RClass_forName(name){
   var o = this;
   var clazz = null;
   if(name){
      clazz = o._classes[name];
      if(!clazz){
         clazz = o.createClass(name);
         o.build(clazz);
      }
   }
   return clazz;
}
MO.RClass.prototype.find = function RClass_find(v){
   var o = this;
   var n = null;
   if(v != null){
      if(v.__class){
         n = v.__class.name;
      }else if(v.constructor == Function){
         n = MO.Method.name(v);
      }else if(v.constructor != String){
         MO.Logger.fatal(o, null, 'Find class failure. (value={1})', v);
      }
   }
   return o._classes[n];
}
MO.RClass.prototype.register = function RClass_register(instance, annotations, defaultValue){
   var o = this;
   var name = MO.Method.name(instance.constructor);
   var clazz = o._classes[name];
   var annotation = null;
   if(annotations.constructor == Array){
      var count = annotations.length;
      for(var i = 0; i < count; i++){
         annotation = annotations[i];
         clazz.register(annotation);
      }
   }else{
      annotation = annotations;
      clazz.register(annotation);
   }
   var value = annotation.value();
   return (defaultValue != null) ? defaultValue : value;
}
MO.RClass.prototype.createBase = function RClass_createBase(name){
   var base = null;
   if(name){
      var source = 'function ' + name + '(){return this;} new ' + name + '();';
      base = eval(source);
   }
   return base;
}
MO.RClass.prototype.createClass = function RClass_createClass(className){
   var o = this;
   var clazz = o._classes[className] = new MO.TClass();
   clazz.name = className;
   clazz.base = o.createBase(className);
   clazz.clazz = new clazz.base.constructor();
   eval('MO.' + className)(clazz.clazz);
   return clazz;
}
MO.RClass.prototype.create = function RClass_create(clazz){
   var o = this;
   var className = null;
   var typeName = typeof(clazz);
   if(typeName == 'function'){
      className = MO.Method.name(clazz);
   }else if(typeName == 'string'){
      className = clazz;
   }else{
      throw new MO.TError(o, 'Param is invlid (clazz={1})', clazz);
   }
   return o.createByName(className);
}
MO.RClass.prototype.createByName = function RClass_createByName(className){
   var o = this;
   var clazz = o.forName(className);
   if(!clazz){
      throw new MO.TError(o, 'Cant find class. (name={1})', clazz);
   }
   return clazz.newInstance();
}
MO.RClass.prototype.innerCopy = function RClass_innerCopy(source, target){
   if((source != null) && (target != null)){
      for(var n in source){
         var value = source[n];
         if(value != null){
            var typeName = typeof(value)
            if(typeName == 'function'){
               var targetValue = target[n];
               if(targetValue == null){
                  target[n] = value;
               }else if(MO.Method.isVirtual(targetValue)){
                  target[n] = value;
               }else if(!MO.Method.isVirtual(value) && MO.Method.isEmpty(targetValue)){
                  target[n] = value;
               }else if(!MO.Method.isVirtual(value) && !MO.Method.isEmpty(value)){
                  target[n] = value;
               }
               continue;
            }else if(!MO.Class.isBaseName(typeName)){
               if(target[n] == null){
                  target[n] = new value.constructor();
               }
               this.innerCopy(value, target[n]);
               continue;
            }
         }
         target[n] = value;
      }
   }
}
MO.RClass.prototype.build = function RClass_build(clazz){
   var o = this;
   var inherits = clazz.clazz.__inherits;
   if(inherits && (inherits.constructor == Array)){
      var finded = false;
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         if(MO.Lang.String.startsWith(name, 'F')){
            if(finded){
               MO.Logger.fatal(o, null, 'Parent class is too many. (name={1})', name);
            }
            clazz.parent = MO.Class.forName(name);
            finded = true;
         }
      }
   }
   var instance = clazz.instance = new clazz.base.constructor();
   if(inherits && (inherits.constructor == Array)){
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         if(!MO.Lang.String.startsWith(name, 'F')){
            var findClass = MO.Class.forName(name);
            if(findClass == null){
               MO.Logger.fatal(o, null, 'Parent class is not exists. (name={1})', name);
            }
            MO.Class.innerCopy(findClass.instance, instance);
            clazz.assign(findClass);
         }
      }
   }
   if(clazz.parent){
      o.innerCopy(clazz.parent.instance, instance);
      clazz.assign(clazz.parent);
   }
   if(!instance.__base){
      instance.__base = new MO.TClassBase();
   }
   instance.__base[clazz.name] = new clazz.base.constructor();
   var cf = clazz.clazz;
   for(var name in cf){
      if(name != '__base'){
         if((cf[name] == null) && (instance[name] == null)){
            instance[name] = null;
         }else if(cf[name] != null){
            if((instance[name] == null) || ((instance[name] != null) && cf[name] != instance[name])){
               instance[name] = cf[name];
            }
         }
      }
   }
   if(inherits && (inherits.constructor == Array)){
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         var baseClass = MO.Class.forName(name);
         var base = instance.__base[name] = new baseClass.base.constructor();
         var baseInstance = baseClass.instance;
         for(var name in baseInstance){
            if(name != '__base'){
               var cfn = baseInstance[name];
               var ofn = instance[name];
               if((cfn != null) && (ofn != null) && (cfn != ofn)){
                  if((cfn.constructor == Function) && (ofn.constructor == Function)){
                     base[name] = baseInstance[name];
                  }
               }
            }
         }
      }
   }
   clazz.build();
   if(MO.Runtime.isRelease()){
      var instance = clazz.instance;
      for(var name in instance){
         var value = instance[name];
         if(value == null){
            delete clazz.instance[name];
         }
      }
   }
}
MO.RClass.prototype.free = function RClass_free(o){
   var c = o.__class;
   if(c){
      c.free(o);
   }
}
MO.RClass.prototype.dump = function RClass_dump(v){
   var o = this;
   if(v == null){
      return '@null';
   }
   var t = o.safeTypeOf(v);
   switch(t){
      case 'Boolean':
         return 'Boolean:' + v;
      case 'Number':
         return 'Number:' + v;
      case 'String':
         return t + '<' + v.length + '>:' + v;
      case 'Function':
         return t + '<' + MO.Method.name(v) + '>@' + o.code(v);
      case 'Html':
         return t + '<' + v.tagName + '>@' + o.code(v);
      default:
         if(v.__name){
            return t + '<' + v.__name + '>@' + o.code(v);
         }
   }
   return t + '@' + o.code(v);
}
MO.RClass = new MO.RClass();
MO.Class = MO.RClass;
MO.RConsole = function RConsole(){
   var o = this;
   o.ConsolePreFix = 'console:';
   o._registers     = new MO.TObjects();
   o._consoles      = new MO.TDictionary();
   o._localConsoles = new MO.TDictionary();
   return o;
}
MO.RConsole.prototype.initialize = function RConsole_initialize(){
   var o = this;
   var registers = o._registers;
   var count = registers.count();
   for(var n = 0; n < count; n++){
      var register = registers.get(n);
      if(register.force){
         o.find(register.clazz);
      }
   }
}
MO.RConsole.prototype.register = function RConsole_register(p){
   this._registers.push(p);
}
MO.RConsole.prototype.create = function RConsole_create(n){
   var r = null;
   if(n){
      r = MO.Class.create(n);
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
MO.RConsole.prototype.createByName = function RConsole_createByName(n){
   var r = null;
   if(n){
      r = MO.Class.createByName(n);
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.Message.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}
MO.RConsole.prototype.get = function RConsole_get(v){
   var o = this;
   var n = MO.Class.name(v);
   var r = o._consoles.get(n);
   return r;
}
MO.RConsole.prototype.find = function RConsole_find(value){
   var o = this;
   MO.Assert.debugNotNull(value);
   var name = null;
   if(value.constructor == String){
      name = value;
   }else if(value.constructor == Function){
      name = MO.Class.name(value);
   }else{
      return MO.Logger.fatal(o, null, 'Parameter type is invalid. (console={1})', value);
   }
   var console = MO.Global.get(o.ConsolePreFix + name);
   if(console){
      return console;
   }
   console = o._consoles.get(name);
   if(console){
      return console;
   }
   var template = MO.Class.forName(name);
   var scopeCd = template.instance.scopeCd();
   switch(scopeCd){
      case MO.EScope.Global:
         console = top.MO.Console.createByName(name);
         MO.Global.set(o.ConsolePreFix + name, console);
         o._consoles.set(name, console);
         break;
      case MO.EScope.Local:
         console = o.createByName(name);
         o._localConsoles.set(name, console);
         o._consoles.set(name, console);
         break;
      default:
         return MO.Logger.fatal(o, 'Unknown scope code. (name={1})', name);
   }
   MO.Logger.debug(o, 'Create console. (name={1}, scope={2})', name, MO.EScope.toDisplay(scopeCd));
   return console;
}
MO.RConsole.prototype.release = function RConsole_release(){
   var o = this;
   if(o._registers){
      o._registers.dispose();
      o._registers = null;
   }
   var cs = o._localConsoles;
   if(cs){
      var c = cs.count();
      for(var n = 0; n < c; n++){
         cs.value(n).dispose();
      }
      cs.dispose();
   }
   o._localConsoles = null;
   if(o._consoles){
      o._consoles.dispose();
   }
   o._consoles = null;
}
MO.RConsole = new MO.RConsole();
MO.Console = MO.RConsole;
MO.RConst = function RConst(){
   var o = this;
   o.PI_2         = Math.PI / 2;
   o.PI           = Math.PI;
   o.PI2          = Math.PI * 2;
   o.RADIAN_RATE  = 180 / Math.PI;
   o.DEGREE_RATE  = Math.PI / 180;
   o.PERCENT_10   = 1 / 10;
   o.PERCENT_100  = 1 / 100;
   o.PERCENT_1000 = 1 / 1000;
   o.identity3x3  = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   o.identity4x4  = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   return o;
}
MO.RConst = new MO.RConst();
MO.Const = MO.RConst;
MO.Lang.Const = MO.RConst;
MO.RDate = function RDate(){
   var o = this;
   o.MinYear       = 1800;
   o.MaxYear       = 2400;
   o.Pattern       = 'n-: /';
   o.Chars         = '0123456789-:/';
   o.DisplayFormat = 'yyyy-mm-dd hh24:mi:ss';
   o.DataFormat    = 'yyyymmddhh24miss';
   o.MonthDays     = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
   o.Parts         = new Array('YYYY','MM','DD','HH24','MI','SS');
   o.PartsDefine   = {'YYYY':['Year',4],'MM':['Month',2],'DD':['Day',2],'HH24':['Hour',2],'MI':['Minute',2],'SS':['Second',2]};
   return o;
}
MO.RDate.prototype.nvl = function RDate_nvl(value){
   return value ? value : new MO.TDate();
}
MO.RDate.prototype.format = function RDate_format(format){
   return this.formatDate(new MO.TDate(), format);
}
MO.RDate.prototype.formatText = function RDate_formatText(date, format){
   if(!date){
      return false;
   }
   var value = format.toLowerCase();
   value = value.replace(/yyyy/g, date.substring(0, 4));
   date = date.substring(4);
   value = value.replace(/mm/g, date.substring(0, 2));
   date = date.substring(2);
   value = value.replace(/dd/g, date.substring(0, 2));
   date = date.substring(2);
   value = value.replace(/hh24/g, date.substring(0, 4));
   date = date.substring(4);
   value = value.replace(/mi/g, date.substring(0, 2));
   date = date.substring(2);
   value = value.replace(/ss/g, date.substring(0, 2));
   date = date.substring(2);
   return value;
}
MO.RDate.prototype.formatDate = function RDate_formatDate(date, format){
   if(!date){
      return '';
   }
   var value = format ? format.toLowerCase() : this.DataFormat;
   value = value.replace(/yyyy/g, MO.Lang.Integer.format(date.year, 4));
   value = value.replace(/yy/g, MO.Lang.Integer.format(date.year % 100, 2));
   value = value.replace(/mm/g, MO.Lang.Integer.format(date.month, 2));
   value = value.replace(/dd/g, MO.Lang.Integer.format(date.day, 2));
   value = value.replace(/hh24/g, MO.Lang.Integer.format(date.hour, 2));
   value = value.replace(/mi/g, MO.Lang.Integer.format(date.minute, 2));
   value = value.replace(/ss/g, MO.Lang.Integer.format(date.second, 2));
   value = value.replace(/ms/g, MO.Lang.Integer.format(date.ms, 3));
   return value;
}
MO.RDate.prototype.monthDays = function RDate_monthDays(year, month){
   if(!year || !month){
      return 0;
   }
   year = parseInt(year);
   month = parseInt(month);
   this.MonthDays[2] = (((year % 4 == 0) || (year % 400 == 0)) && (year % 100 != 0)) ? 29 : 28 ;
   return this.MonthDays[month];
}
MO.RDate.prototype.splitFormat = function RDate_splitFormat(value, format){
   if(!value){
      return false;
   }
   format = format.toLowerCase();
   var items = new Array();
   while(format.length > 0){
      if(format.indexOf('yyyy') == 0){
         items['year'] = value.substring(0, 4);
         format = format.substring(4);
         value = value.substring(4);
      }else if(format.indexOf('mm') == 0){
         items['month'] = value.substring(0, 2);
         format = format.substring(2);
         value = value.substring(2);
      }else if(format.indexOf('dd') == 0){
         items['day'] = value.substring(0, 2);
         format = format.substring(2);
         value = value.substring(2);
      }else if(format.indexOf('hh24') == 0){
         items['hour'] = value.substring(0, 2);
         format = format.substring(4);
         value = value.substring(2);
      }else if(format.indexOf('mi') == 0){
         items['minute'] = value.substring(0, 2);
         format = format.substring(2);
         value = value.substring(2);
      }else if(format.indexOf('ss') == 0){
         items['second'] = value.substring(0, 2);
         format = format.substring(2);
         value = value.substring(2);
      }else if(format.indexOf('ms') == 0){
         items['ms'] = value.substring(0, 2);
         format = format.substring(2);
         value = value.substring(3);
      }else{
         format = format.substring(1);
         value = value.substring(1);
      }
   }
   return items;
}
MO.RDate.prototype.splitTime = function RDate_splitTime(date, value){
   if(!value){
      return;
   }
   if(value.indexOf(':') != -1){
      var items = value.split(':');
      if(items.length >= 1){
         date.hour = MO.Lang.Integer.parse(items[0]);
      }
      if(items.length >= 2){
         date.minute = MO.Lang.Integer.parse(items[1]);
      }
      if(items.length >= 3){
         date.second = MO.Lang.Integer.parse(items[2]);
      }
   }else if(value.length == 6){
      date.hour = MO.Lang.Integer.parse(value.substr(0, 2));
      date.minute = MO.Lang.Integer.parse(value.substr(2, 2));
      date.second = MO.Lang.Integer.parse(value.substr(4, 2));
   }else if(value.length == 4){
      date.hour = MO.Lang.Integer.parse(value.substr(0, 2));
      date.minute = MO.Lang.Integer.parse(value.substr(2, 2));
   }else if(value.length == 2){
      date.hour = MO.Lang.Integer.parse(value.substr(0, 2));
   }
}
MO.RDate.prototype.splitDate = function RDate_splitDate(date, value){
   if(!value){
      return;
   }
   if(value.indexOf('-') != -1 || value.indexOf('/') != -1){
      var items = null;
      if(value.indexOf('-') != -1){
         items = value.split('-');
      }else if(value.indexOf('/') != -1){
         items = value.split('/');
      }
      if(items.length >= 1){
         date.year = MO.Lang.Integer.parse(items[0]);
      }
      if(items.length >= 2){
         date.month = MO.Lang.Integer.parse(items[1]);
      }
      if(items.length >= 3){
         date.day = MO.Lang.Integer.parse(items[2]);
      }
   }else if(value.indexOf(':') != -1){
      this.splitTime(date, value);
   }else if(value.length == 14){
      date.year = MO.Lang.Integer.parse(value.substr(0, 4));
      date.month = MO.Lang.Integer.parse(value.substr(4, 2));
      date.day = MO.Lang.Integer.parse(value.substr(6, 2));
      date.hour = MO.Lang.Integer.parse(value.substr(8, 2));
      date.minute = MO.Lang.Integer.parse(value.substr(10, 2));
      date.second = MO.Lang.Integer.parse(value.substr(12, 2));
   }else if(value.length == 8){
      date.year = MO.Lang.Integer.parse(value.substr(0, 4));
      date.month = MO.Lang.Integer.parse(value.substr(4, 2));
      date.day = MO.Lang.Integer.parse(value.substr(6, 2));
   }else if(value.length == 6){
      date.year = MO.Lang.Integer.parse(value.substr(0, 4));
      date.month = MO.Lang.Integer.parse(value.substr(4, 2));
   }else if(value.length == 4){
      date.year = MO.Lang.Integer.parse(value);
   }
}
MO.RDate.prototype.checkItems = function RDate_checkItems(items){
   var o = this;
   if(!items){
      return false;
   }
   var year = MO.Lang.Integer.parse(items["year"]);
   if(year < o.MinYear || year > o.MaxYear){
      return false;
   }
   var month = MO.Lang.Integer.parse(items["month"]);
   if(month < 1 || month > 12){
      return false;
   }
   var day = MO.Lang.Integer.parse(items["day"]);
   if(day < 1 || day > o.monthDays(year, month)){
      return false;
   }
   var hour = MO.Lang.Integer.parse(items["hour"]);
   if(hour < 0 || hour > 23){
      return false;
   }
   var second = MO.Lang.Integer.parse(items["second"]);
   if(second < 0 || second > 59){
      return false;
   }
   var ms = MO.Lang.Integer.parse(items["ms"]);
   if(ms < 0 || ms > 99){
      return false;
   }
   return true;
}
MO.RDate.prototype.check = function RDate_check(value, format){
   return this.checkItems(this.splitFormat(value, format));
}
MO.RDate.prototype.make = function RDate_make(yyyy, mm, dd, hh, mi, ss){
   return new MO.TDate(new Date(yyyy, mm, dd));
}
MO.RDate.prototype.makeDate = function RDate_makeDate(value, items){
   var year = MO.Lang.Integer.parse(items.year);
   var month = MO.Lang.Integer.parse(items.month) - 1;
   var day = MO.Lang.Integer.parse(items.day);
   var hour = MO.Lang.Integer.parse(items.hour);
   var minute = MO.Lang.Integer.parse(items.minute);
   var second = MO.Lang.Integer.parse(items.second);
   var ms = MO.Lang.Integer.parse(items.ms);
   var date = new Date(year, month, day, hour, minute, second, ms);
   if(value){
      value.setDate(date);
      return value;
   }
   return new MO.TDate(date);
}
MO.RDate.prototype.parse = function RDate_parse(date, value, format){
   if(!format){
      format = this.DataFormat;
   }
   var items = this.splitFormat(value, format);
   if(this.checkItems(items)){
      return this.makeDate(date, items);
   }
   return null;
}
MO.RDate.prototype.autoParse = function RDate_autoParse(date, value){
   if(!value){
      return null;
   }
   var o = this;
   date = o.nvl(date);
   var items = new Array();
   items['year'] = 2000;
   items['month'] = 1;
   items['day'] = 1;
   items['hour'] = 0;
   items['minute'] = 0;
   items['second'] = 0;
   value = MO.Lang.String.trim(value);
   if(value.indexOf(' ') == -1){
      o.splitDate(items, value);
   }else{
      var valueItems = value.split(' ');
      if(valueItems.length == 2){
         o.splitDate(items, valueItems[0]);
         o.splitTime(items, valueItems[1]);
      }
   }
   if(o.checkItems(items)){
      return o.makeDate(date, items);
   }
   return null;
}
MO.RDate = new MO.RDate();
MO.Lang.Date = MO.RDate;
MO.REnum = function REnum(){
   return this;
}
MO.REnum.prototype.contains = function REnum_contains(){
}
MO.REnum.prototype.tryEncode = function REnum_tryEncode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(name.toLowerCase() == value.toLowerCase()){
            return instance[name];
         }
      }
   }
   return defaultValue;
}
MO.REnum.prototype.encode = function REnum_encode(instance, value){
   var o = this;
   var result = o.tryEncode(instance, value);
   if(result == null){
      throw new MO.TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
   }
   return result;
}
MO.REnum.prototype.tryDecode = function REnum_tryDecode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(instance[name] == value){
            return name;
         }
      }
   }
   return defaultValue;
}
MO.REnum.prototype.decode = function REnum_decode(instance, value){
   var o = this;
   var result = o.tryDecode(instance, value);
   if(result == null){
      throw new MO.TError(o, 'Invalid value (enum={1}, value={2})', MO.Class.dump(instance), value);
   }
   return result;
}
MO.REnum.prototype.parse = MO.REnum.prototype.encode;
MO.REnum = new MO.REnum();
MO.Lang.Enum = MO.REnum;
MO.RFile = function RFile(){
   var o = this;
   o.pictures = ['jpg', 'png', 'gif', 'bmp'];
   o.knowns   = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
   return o;
}
MO.RFile.prototype.inPicture = function RFile_inPicture(v){
   var o = this;
   if(v){
      v = v.toLowerCase();
      for(var n in o.pictures){
         if(o.pictures[n] == v){
            return true;
         }
      }
   }
}
MO.RFile.prototype.isPicture = function RFile_isPicture(v){
   return this.inPicture(this.extension(v));
}
MO.RFile.prototype.isKnown = function RFile_isKnown(v){
   var o = this;
   v = o.extension(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}
MO.RFile.prototype.name = function RFile_name(value){
   if(value){
      value = value.replace(/\\/g, '/');
      var p1 = value.lastIndexOf('/');
      if(p1 != -1){
         value = value.substring(p1 + 1);
      }
      var p2 = value.lastIndexOf('.');
      if(p2 != -1){
         return value.substring(0, p2);
      }
      return value;
   }
   return '';
}
MO.RFile.prototype.extension = function RFile_extension(v){
   if(v){
      v = v.replace(/\\/g, '/');
      var p1 = v.lastIndexOf('/');
      if(-1 != p1){
         v = v.substring(p1 + 1);
      }
      var p2 = v.lastIndexOf('.');
      if(-1 != p2){
         return v.substring(p2 + 1);
      }
      return v;
   }
   return '';
}
MO.RFile = new MO.RFile();
MO.Stream.File = MO.File;
MO.RFloat = function RFloat(){
   var o = this;
   o.Chars     = '0123456789-.%';
   o.NUMBER    = '0123456789-.%';
   o.LEFT_CHAR = '0';
   return o;
}
MO.RFloat.prototype.isFloat = function RFloat_isFloat(p){
   return MO.Lang.String.isPattern(p, 'n');
}
MO.RFloat.prototype.parse = function RFloat_parse(source){
   if(source == null){
      return 0;
   }
   if(source == ''){
      return 0;
   }
   var value = MO.Lang.String.trim(source.toString());
   if(value == null){
      return 0;
   }
   while(true){
      if(value.charAt(0) != "0"){
         break;
      }
      value = value.substr(1);
   }
   var result = (value.length > 0) ? parseFloat(value) : 0;
   if(MO.Lang.String.findChars(result, '%') != -1){
      result = result / 100;
   }
   return isNaN(result) ? 0 : result;
}
MO.RFloat.prototype.format = function RFloat_format(v, l, lp, r, rp){
   var o = this;
   if(l == null){
      l = 0;
   }
   if(lp == null){
      lp = o.LEFT_CHAR;
   }
   if(r == null){
      r = 6;
   }
   if(rp == null){
      rp = o.LEFT_CHAR;
   }
   var s = v.toString();
   var f = s.indexOf('.');
   if(f == -1){
      var sl = s;
      var sr = '';
   }else{
      var sl = s.substring(0, f);
      var sr = s.substring(f + 1, f + r + 1);
   }
   var fl = MO.Lang.String.lpad(sl, l, lp);
   var fr = MO.Lang.String.rpad(sr, r, rp);
   return fl + '.' + fr;
}
MO.RFloat.prototype.unitFormat = function RFloat_unitFormat(v, l, lp, r, rp, divide, unit) {
   var o = this;
   if (l == null) {
      l = 0;
   }
   if (lp == null) {
      lp = o.LEFT_CHAR;
   }
   if (r == null) {
      r = 6;
   }
   if (rp == null) {
      rp = o.LEFT_CHAR;
   }
   if (divide == null || unit == null) {
      divide = 1;
      unit = '';
   }
   v /= divide;
   var s = v.toString();
   var f = s.indexOf('.');
   if (f == -1) {
      var sl = s;
      var sr = '';
   } else {
      var sl = s.substring(0, f);
      var sr = s.substring(f + 1, f + r + 1);
   }
   var fl = MO.Lang.String.lpad(sl, l, lp);
   var flc = new MO.TString();
   for (var i = 1; i - 1 < fl.length; i++) {
      flc.append(fl.substring(i - 1, i));
      if (fl.length - i > 0 && (fl.length - i) % 3 == 0) {
         flc.append(',');
      }
   }
   var fr = MO.Lang.String.rpad(sr, r, rp);
   return flc + '.' + fr + unit;
}
MO.RFloat.prototype.nvl = function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}
MO.RFloat.prototype.toRange = function RFloat_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   return Math.min(Math.max(v, i), a);
}
MO.RFloat.prototype.sum = function RFloat_sum(){
   var a = arguments;
   var r = 0;
   for(var i = a.length -1 ; i >= 0; i--){
      var v = a[n];
      if(v != null){
         r += parseFloat(v);
      }
   }
   return r;
}
MO.RFloat.prototype.calculate = function RFloat_calculate(f,a,b){
  var a = RFloat.nvl(a);
  var b = RFloat.nvl(b);
  a = parseFloat(a);
  b = parseFloat(b);
  if(f){
     return (a + b).toString();
  }else{
     return (a - b).toString();
  }
}
MO.RFloat.prototype.attach = function RFloat_attach(t, s, c){
   var r = false;
   for(var i = 0; i < c; i++){
      if(t[i] != s[i]){
         t[i] = s[i];
         r = true;
      }
   }
   return r;
}
MO.RFloat.prototype.fill = function RFloat_fill(d, i, c, v){
   for(var n = 0; n < c; n++){
      d[i++] = v;
   }
}
MO.RFloat.prototype.copy = function RFloat_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
MO.RFloat = new MO.RFloat();
MO.Lang.Float = MO.RFloat;
MO.RHex = function RHex(){
   var o = this;
   o.NUMBER = '0x123456789ABCDEF';
   o.PAD    = '0';
   return o;
}
MO.RHex.prototype.isValid = function RHex_isValid(value){
   return MO.String.isPattern(value, this.NUMBER);
}
MO.RHex.prototype.parse = function RHex_parse(value){
   return value ? parseInt('0x' + value) : 0;
}
MO.RHex.prototype.format = function RHex_format(value, length){
   var result = null;
   if(value){
      result = value.toString(16);
   }else{
      result = '0';
   }
   return length ? MO.String.lpad(result, length, this.PAD) : result;
}
MO.RHex = new MO.RHex();
MO.Lang.Hex = MO.RHex;
MO.RInstance = function RInstance(){
   var o = this;
   o._pools = new MO.TDictionary();
   return o;
}
MO.RInstance.prototype.pool = function RInstance_pool(p){
   var o = this;
   var n = MO.Class.name(p);
   var v = o._pools.get(n);
   if(v == null){
      v = new MO.TInstancePool();
      o._pools.set(n, v);
   }
   return v;
}
MO.RInstance.prototype.get = function RInstance_get(p){
   return this.pool(p).instance(p);
}
MO.RInstance.prototype.alloc = function RInstance_alloc(n){
   return this.pool(p).alloc(p);
}
MO.RInstance.prototype.free = function RInstance_free(n){
   this.pool(p).free(p);
}
MO.RInstance = new MO.RInstance();
MO.Instance = MO.RInstance;
MO.RInteger = function RInteger(){
   var o = this;
   o.Chars      = '0123456789-%';
   o.NUMBER     = '0123456789-%';
   o.LEFT_CHAR  = '0';
   o.MAX_UINT16 = 65535;
   o.MAX_UINT32 = 4294967295;
   return o;
}
MO.RInteger.prototype.isInt = function RInteger_isInt(v){
   return MO.Lang.String.isPattern(v, 'n');
}
MO.RInteger.prototype.nvl = function RInteger_nvl(value, defaultValue){
   if(value != null){
      return parseInt(value);
   }
   if(defaultValue != null){
      return defaultValue;
   }
   return 0;
}
MO.RInteger.prototype.strideByte = function RInteger_strideByte(value){
   if(value > 65535){
      return 4;
   }else if(value > 255){
      return 2;
   }else{
      return 1;
   }
}
MO.RInteger.prototype.strideBit = function RInteger_strideBit(value){
   if(value > 65535){
      return 32;
   }else if(value > 255){
      return 16;
   }else{
      return 8;
   }
}
MO.RInteger.prototype.parse = function RInteger_parse(v, d){
   if(d == null){
      d = 0;
   }
   if(v == null){
      return d;
   }
   if(v == ''){
      return d;
   }
   v = MO.Lang.String.trim(v.toString());
   while(true){
      if(v.charAt(0) != '0'){
         break;
      }
      v = v.substr(1);
   }
   var r = (v.length > 0) ? parseInt(v) : d;
   return isNaN(r) ? d : r;
}
MO.RInteger.prototype.format = function RInteger_format(v, l, p){
   if(!p){
      p = this.LEFT_CHAR;
   }
   var v = v.toString();
   for(var i = parseInt(l) - v.length - 1; i >= 0; i--){
      v = p + v;
   }
   return v;
}
MO.RInteger.prototype.toRange = function RInteger_toRange(value, min, max){
   if(value == null){
      value = 0;
   }
   if(isNaN(value)){
      value = 0;
   }
   if(value < min){
      value = min;
   }
   if(value > max){
      value = max;
   }
   return value;
}
MO.RInteger.prototype.pow2 = function RInteger_pow2(value){
   if(value > 4096){
      return 8192;
   }else if(value > 2048){
      return 4096;
   }else if(value > 1024){
      return 2048;
   }else if(value > 512){
      return 1024;
   }else if(value > 256){
      return 512;
   }else if(value > 128){
      return 256;
   }else if(value > 64){
      return 128;
   }else if(value > 32){
      return 64;
   }else if(value > 16){
      return 32;
   }else if(value > 8){
      return 16;
   }else if(value > 4){
      return 8;
   }else if(value > 2){
      return 4;
   }else if(value > 1){
      return 2;
   }
   return 1;
}
MO.RInteger.prototype.sum = function RInteger_sum(){
   var r = 0;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         r += parseInt(a[n]);
      }
   }
   return r;
}
MO.RInteger.prototype.calculate = function RInteger_calculate(f, a, b){
   var a = RInteger.parse(a);
   var b = RInteger.parse(b);
   var r = '';
   if(f == '+'){
      r = a + b;
   }else if(f == '-'){
      r = a - b;
   }else if(f == 'x'){
      r = a * b;
   }else if(f == '/'){
     r = a / b;
   }
   return r.toString();
}
MO.RInteger.prototype.copy = function RInteger_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
MO.RInteger.prototype.toString = function RInteger_toString(p){
   return (p == null) ? '0' : p.toString();
}
MO.RInteger = new MO.RInteger();
MO.Lang.Integer = MO.RInteger;
MO.RJson = function RJson(){
   return this;
}
MO.RJson.prototype.parse = function RJson_parse(value, clazz){
   var result = null;
   try{
      result = JSON.parse(value)
   }catch(e){
      if(clazz){
         result = new clazz();
      }
   }
   return result;
}
MO.RJson.prototype.toString = function RJson_toString(value){
   return JSON.stringify(value);
}
MO.Json = new MO.RJson();
MO.RLogger = function RLogger(){
   var o = this;
   o._labelLength = 40;
   o._logger       = new MO.SLogger();
   o.lsnsOutput   = new MO.TListeners();
   return o;
}
MO.RLogger.prototype.output = function RLogger_output(sender, message){
   var o = this;
   var logger = o._logger;
   logger.sender = sender
   logger.message = message;
   o.lsnsOutput.process(logger);
}
MO.RLogger.prototype.debug = function RLogger_debug(owner, message, params){
   var o = this;
   var name = null;
   var caller = MO.Logger.debug.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|D [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
   }
   result.append(message);
   o.output(owner, result.flush());
}
MO.RLogger.prototype.info = function RLogger_info(owner, message, params){
   var o = this;
   var name = null;
   var caller = MO.Logger.info.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|I [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
   }
   result.append(message);
   o.output(owner, result.flush());
}
MO.RLogger.prototype.warn = function RLogger_warn(owner, message, params){
   var o = this;
   var name = null;
   var caller = MO.Logger.warn.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|W [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
   }
   result.append(message);
   o.output(owner, result.flush());
}
MO.RLogger.prototype.error = function RLogger_error(owner, message, params){
   var o = this;
   var name = null;
   var caller = MO.Logger.error.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner && owner.hashCode){
      name += '@' + owner.hashCode();
   }
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|E [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = '';
      if(a != null){
         if(typeof(a) == 'function'){
            s = MO.Method.name(a);
         }else{
            s = a.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', s);
   }
   result.append(message);
   o.output(owner, result.flush());
}
MO.RLogger.prototype.fatal = function RLogger_fatal(owner, error, message, params){
   var o = this;
   var stack = new MO.TString();
   var stacks = new Array();
   var caller = MO.Logger.fatal.caller;
   while(caller){
      if(MO.Lang.Array.contains(stacks, caller)){
         break;
      }
      stacks.push(caller);
      caller = caller.caller;
   }
   var count = stacks.length;
   for(var i = 0; i < count; i++){
      caller = stacks[i];
      if(i > 0){
         stack.appendLine();
      }
      stack.append('   ' + (count - i) + ': ' + MO.Method.name(caller));
   }
   var result = new MO.TString();
   result.appendLine(MO.RContext.get('RMessage:fatal'));
   result.appendLine(MO.Lang.String.repeat('-', 60));
   result.append(MO.Class.dump(owner), ': ');
   if(message){
      var count = arguments.length;
      for(var i = 3; i < count; i++){
         var parameter = arguments[i];
         if('function' == typeof(parameter)){
            parameter = MO.Method.name(parameter);
         }
         message = message.replace('{' + (i - 2) + '}', parameter);
      }
   }
   result.appendLine(message);
   result.appendLine(MO.Lang.String.repeat('-', 60));
   result.appendLine('Stack:');
   result.append(stack.flush());
   var text = result.flush();
   o.output(owner, text);
   if(MO.Runtime.isPlatformPc() && !MO.Runtime.isRelease()){
      throw new Error(text);
   }
}
MO.RLogger.prototype.show = function RLogger_show(sf, message, params){
   var o = this;
   var name = null;
   var caller = MO.Logger.show.caller;
   if(caller){
      name = MO.Method.name(caller);
   }else if(arguments.caller){
      name = MO.Method.name(arguments.caller[0]);
   }
   if(name == null){
      name = 'unknown';
   }else{
      name = name.replace('_', '.');
   }
   if(owner.hashCode){
      name += '@' + owner.hashCode();
   }
   var result = new MO.TString();
   result.append(MO.Lang.Date.format('yymmdd-hh24miss.ms'));
   result.append('|I [' + MO.Lang.String.rpad(name, o._labelLength) + '] ');
   var count = arguments.length;
   for(var n = 2; n < count; n++){
      var parameter = arguments[n];
      var value = '';
      if(parameter != null){
         if(typeof(parameter) == 'function'){
            value = MO.Method.name(parameter);
         }else{
            value = parameter.toString();
         }
      }
      message = message.replace('{' + (n - 1) + '}', value);
   }
   result.append(message);
   alert(result.flush());
}
MO.Logger = new MO.RLogger();
MO.RMethod = function RMethod(){
   var o = this;
   o._virtuals   = new Object();
   o._properties = new Object();
   return o;
}
MO.RMethod.prototype.construct = function RMethod_construct(){
   var o = this;
   o.empty.__empty = true;
   o.emptyTrue.__empty = true;
   o.emptyFalse.__empty = true;
}
MO.RMethod.prototype.isFunction = function RMethod_isFunction(value){
   return typeof(value) == 'function';
}
MO.RMethod.prototype.isEmpty = function RMethod_isEmpty(value){
   return (value && value.__empty);
}
MO.RMethod.prototype.isVirtual = function RMethod_isVirtual(value){
   return (value && value.__virtual);
}
MO.RMethod.prototype.name = function RMethod_name(value){
   if(value){
      if(typeof(value) == 'function'){
         if(value.__name){
            return value.__name;
         }
         var source = value.toString();
         var name = value.__name = MO.Lang.String.mid(source, 'function ', '(');
         return name;
      }
   }
   return null;
}
MO.RMethod.prototype.fullName = function RMethod_fullName(value){
   if(value && (value.constructor == Function)){
      if(value.__fullname){
         return value.__fullname;
      }
      var source = value.toString();
      var name = value.__fullname = MO.Lang.String.mid(source, 'function ', ')') + ')';
      return name;
   }
   return null;
}
MO.RMethod.prototype.empty = function RMethod_empty(){
}
MO.RMethod.prototype.emptyTrue = function RMethod_emptyTrue(){
   return true;
}
MO.RMethod.prototype.emptyFalse = function RMethod_emptyFalse(){
   return false;
}
MO.RMethod.prototype.emptyCall = function RMethod_emptyCall(){
}
MO.RMethod.prototype.virtual = function RMethod_virtual(value, name){
   var o = this;
   var method = null;
   var code = MO.Class.name(value) + '.' + name;
   if(o._virtuals[code]){
      method = o._virtuals[code];
   }else{
      var source = 'throw new Error(\'Virtual method be called.(' + code + ')\');';
      method = new Function(source);
      method.__virtual = true;
      method.__name = code;
      o._virtuals[code] = method;
   }
   return method;
}
MO.RMethod.prototype.makePropertyGet = function RMethod_makePropertyGet(name, methodName){
   var o = this;
   var code = name + '|' + methodName;
   var method = null;
   if(o._properties[code]){
      method = o._properties[code];
   }else{
      var source = 'return this.' + name + ';';
      method = new Function(source);
      o._properties[code] = method;
   }
   return method;
}
MO.RMethod.prototype.makePropertyGetSource = function RMethod_makePropertyGet(name, methodName){
   var o = this;
   var source = 'return this.' + name + ';';
   var method = new Function(source);
   return method;
}
MO.RMethod.prototype.makePropertySet = function RMethod_makePropertySet(name, methodName){
   var o = this;
   var code = name + '|' + methodName;
   var method = null;
   if(o._properties[code]){
      method = o._properties[code];
   }else{
      var source = 'this.' + name + '=value;';
      method = new Function('value', source);
      o._properties[code] = method;
   }
   return method;
}
MO.RMethod = new MO.RMethod();
MO.Method = MO.RMethod;
MO.Method.construct();
MO.RObject = function RObject(){
   var o = this;
   o._hash = 1;
   return o;
}
MO.RObject.prototype.nextId = function RObject_nextId(v){
   return this._hash++;
}
MO.RObject.prototype.nvl = function RObject_nvl(v){
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         return a[n];
      }
   }
   return null;
}
MO.RObject.prototype.clone = function RObject_clone(o){
   var r = new o.constructor();
   for(var n in o){
      var v = o[n];
      if(v != null){
         if(!MO.Class.isBaseType(v.constructor)){
            v = MO.Lang.Object.clone(v);
         }
      }
      r[n] = v;
   }
   return r;
}
MO.RObject.prototype.copy = function RObject_copy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            if(!MO.Class.isBaseType(v.constructor)){
               if(t[n] == null){
                  t[n] = new c();
               }
               MO.Lang.Object.copy(v, t[n]);
            }
         }
         t[n] = v;
      }
   }
}
MO.RObject.prototype.free = function RObject_free(item){
   if(item){
      if(MO.Runtime.isDebug()){
         for(var name in item){
            if((name == '__base') || (name == '__inherits') || (name == '__class')){
               item[name] = null;
               continue;
            }
            var value = item[name];
            if(value != null){
               if(!MO.Class.isBaseType(value.constructor)){
                  throw new MO.TError(MO.Lang.Object, 'Free object is not base object.');
               }
               item[name] = null;
            }
         }
      }else{
         for(var name in item){
            item[name] = null;
         }
      }
   }
}
MO.RObject.prototype.dispose = function RObject_dispose(item, flag){
   if(item){
      if(!item.__dispose){
         item.dispose(flag);
         item.__dispose = true;
      }else{
         throw new MO.TError(MO.Lang.Object, 'Object has disposed.');
      }
   }
   return null;
}
MO.RObject.prototype.release = function RObject_release(item){
   if(item){
      for(var name in item){
         var value = item[name];
         if(typeof(value) == 'Object'){
            this.release(value)
         }
         item[n] = null;
      }
   }
   return null;
}
MO.RObject = new MO.RObject();
MO.Lang.Object = MO.RObject;
MO.RRect = function RRect(){
   return this;
}
MO.RRect.prototype.nvl = function RRect_nvl(rect){
   return rect ? rect : new TRect();
}
MO.RRect.prototype.pack = function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}
MO.RRect.prototype.unpack = function RRect_unpack(pack, rect){
   rect = this.nvl(rect);
   if(pack){
      var items = pack.split(',');
      if(items.length == 4){
         rect.left = RInt.parse(items[0]);
         rect.top = RInt.parse(items[1]);
         rect.right = RInt.parse(items[2])
         rect.bottom = RInt.parse(items[3]);
      }
   }
   return rect;
}
MO.RRect = new MO.RRect();
MO.RRegExp = function RRegExp(){
   return this;
}
MO.RRegExp.prototype.test = function RRegExp_test(r,s){
   if(r && s != null){
      return r.test(s);
   }
   return false;
}
MO.RRegExp.prototype.testRgexp = function RRegExp_testRgexp(eps,s){
   if(eps && s){
      var r = new R
      return eps.test(s);
   }
   return false;
}
MO.RRegExp = new MO.RRegExp();
MO.RSet = function RSet(){
   return this;
}
MO.RSet.prototype.contains = function RSet_contains(v, d){
   return (v & d) == d;
}
MO.RSet.prototype.containsString = function RSet_containsString(v, d){
   if((v != null) && (s != null)){
      return v.indexOf(s) != -1;
   }
   return false;
}
MO.RSet = new MO.RSet();
MO.Lang.Set = MO.RSet;
MO.RString = function RString(){
   var o = this;
   o.EMPTY      = '';
   o.SPACE      = '   ';
   o.PAD        = ' ';
   o.TRIM       = ' \t\r\n';
   o.LOWER      = 'abcdefghijklmnopqrstuvwxyz';
   o.UPPER      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   o.CodeLowerA = 'a'.charCodeAt(0);
   o.CodeLowerZ = 'z'.charCodeAt(0);
   o.CodeUpperA = 'A'.charCodeAt(0);
   o.CodeUpperZ = 'Z'.charCodeAt(0);
   return o;
}
MO.RString.prototype.isEmpty = function RString_isEmpty(v){
   if(v != null){
      return (v.length == 0);
   }
   return true;
}
MO.RString.prototype.isBlank = function RString_isBlank(v){
   if(v != null){
      return (v.trim().length == 0);
   }
   return true;
}
MO.RString.prototype.isAnsi = function RString_isAnsi(v){
   if(v != null){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(v.charCodeAt(n) > 255){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.isDbcs = function RString_isDbcs(v){
   if(v == null){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(value.charCodeAt(n) < 256){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.isPattern = function RString_isPattern(v, p){
   if(v != null){
      var o = this;
      if(p == null){
         p = '$a$A$f';
      }
      p = p.replace(/\a/g, o.LOWER);
      p = p.replace(/\A/g, o.UPPER);
      p = p.replace(/\f/g, MO.Lang.Float.NUMBER);
      p = p.replace(/\n/g, MO.Lang.Integer.NUMBER);
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(p.indexOf(v.charAt(n)) == -1){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.inChars = function RString_inChars(v, p){
   var o = this;
   var b = o.findChars(p, v);
   if(b != -1){
      return true;
   }
   return false;
}
MO.RString.prototype.equals = function RString_equals(s, t, f){
   if(s == null){
      s = '';
   }else if(s.constructor != String){
      s = s.toString();
   }
   if(t == null){
      t = '';
   }else if(t.constructor != String){
      t = t.toString();
   }
   if(f){
      return (s == t);
   }else{
      return (s.toLowerCase() == t.toLowerCase());
   }
}
MO.RString.prototype.contains = function RString_contains(source, values){
   if(source != null){
      if(source.constructor != String){
         source = source.toString();
      }
      var count = arguments.length;
      for(var i = 1; i < count; i++){
         var value = arguments[i];
         if(source.indexOf(value) != -1){
            return true;
         }
      }
   }
   return false;
}
MO.RString.prototype.startsWith = function RString_startsWith(v, s){
   if(s == null){
      return true;
   }
   return (v != null) ? (v.indexOf(s) == 0) : false;
}
MO.RString.prototype.endsWith = function RString_endsWith(v, s){
   if(s == null){
      return true;
   }
   var n = (v != null) ? v.indexOf(s) : -1;
   return (n != -1) ? (n == (v.length - s.length)) : false;
}
MO.RString.prototype.findChars = function RString_findChars(v, s){
   if((v != null) && (s != null)){
      var c = v.length;
      for(var n = 0; n < c; n++){
         if(s.indexOf(v.charAt(n)) != -1){
            return n;
         }
      }
   }
   return -1;
}
MO.RString.prototype.inRange = function RString_inRange(v, rs, f){
   if(v && rs){
      if(!f){
         v = v.toLowerCase();
      }
      var c = rs.length;
      for(var n = 0; n < c; n++){
         var r = rs[n];
         if(r != null){
            if(f){
               if(v == r){
                  return true;
               }
            }else{
               if(v == r.toLowerCase()){
                  return true;
               }
            }
         }
      }
   }
   return false;
}
MO.RString.prototype.nvl = function RString_nvl(v, d){
   if(v != null){
      var s = null;
      if(v.constructor != String){
         s = v.toString();
      }else{
         s = v;
      }
      if(s.length > 0){
         return s;
      }
   }
   if(d != null){
      return d;
   }
   return this.EMPTY;
}
MO.RString.prototype.nvlString = function RString_nvlString(p){
   if(p == null){
      p = new MO.TString();
   }
   return p;
}
MO.RString.prototype.empty = function RString_empty(v){
   if(v != null){
      var s = null;
      if(v.constructor != String){
         s = v.toString();
      }else{
         s = v;
      }
      if(s.length > 0){
         return s;
      }
   }
   return null;
}
MO.RString.prototype.firstUpper = function RString_firstUpper(v){
   return (v != null) ? v.charAt(0).toUpperCase() + v.substr(1) : v;
}
MO.RString.prototype.firstLower = function RString_firstLower(){
   return (v != null) ? v.charAt(0).toLowerCase() + v.substr(1) : v;
}
MO.RString.prototype.firstLine = function RString_firstLine(v){
   if(v){
      var n = Math.min(v.indexOf('\r'), v.indexOf('\n'));
      if(-1 != n){
         return v.substr(0, n);
      }
      return v;
   }
   return '';
}
MO.RString.prototype.format = function RString_format(value, parameters){
   var count = arguments.length;
   for(var i = 1; i < count; i++){
      var parameter = arguments[i];
      if(typeof(parameter) == 'function'){
         parameter = MO.Method.name(parameter);
      }else if(parameter == null){
         parameter = '';
      }
      value = value.replace('{' + i + '}', parameter);
   }
   return value;
}
MO.RString.prototype.formatLines = function RString_formatLines(p){
   var o = this;
   p = p.replace(/\\r/g, '');
   var ls = p.split('\n');
   var c = ls.length;
   var r = new MO.TString();
   for(var i = 0; i < c; i++){
      var l = ls[i]
      l = o.trim(l);
      if(o.isEmpty(l)){
         continue;
      }
      if(o.startsWith(l, '//')){
         continue;
      }
      r.appendLine(l);
   }
   return r.flush();
}
MO.RString.prototype.repeat = function RString_repeat(v, c){
   return new Array(c + 1).join(v);
}
MO.RString.prototype.pad = function RString_pad(v, l, p){
   v = (v != null) ? v.toString() : this.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = this.PAD;
      }
      var r = (n % 2 == 0) ? n / 2 : (n - 1) / 2;
      return new Array(r + 1).join(p) + v + new Array(n - r + 1).join(p);
   }
   return v;
}
MO.RString.prototype.lpad = function RString_lpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      var a = new Array(n);
      a[a.length] = v;
      return a.join(p);
   }
   return v;
}
MO.RString.prototype.rpad = function RString_rpad(v, l, p){
   var o = this;
   v = (v != null) ? v.toString() : o.EMPTY;
   var n = l - v.length;
   if(n > 0){
      if(p == null){
         p = o.PAD;
      }
      return v + new Array(n + 1).join(p);
   }
   return v;
}
MO.RString.prototype.trim = function RString_trim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   for(; r >= l; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(l == r + 1){
      return null;
   }
   if((l != 0) || (r != v.length-1)){
      return v.substring(l, r + 1);
   }
   return v;
}
MO.RString.prototype.ltrim = function RString_ltrim(v, ts){
   var o = this;
   v = o.nvl(value);
   ts = o.nvl(trims, o.TRIM);
   var l = 0;
   var r = v.length - 1;
   for(; l < r; l++){
      if(-1 == ts.indexOf(v.charAt(l))){
         break;
      }
   }
   if(0 != l){
      return v.substring(l, r + 1);
   }
   return v;
}
MO.RString.prototype.rtrim = function RString_rtrim(v, ts){
   var o = this;
   v = o.nvl(v);
   ts = o.nvl(ts, o.TRIM);
   var r = v.length - 1;
   for(; r >= 0; r--){
      if(-1 == ts.indexOf(v.charAt(r))){
         break;
      }
   }
   if(r != v.length-1){
      return v.substring(0, r + 1);
   }
   return v;
}
MO.RString.prototype.mid = function RString_mid(v, b, e){
   if(v == null){
      return v;
   }
   var l = 0;
   if(b != null){
      var f = v.indexOf(b);
      if(f != -1){
         l = f + b.length;
      }
   }
   var r = v.length;
   if(e != null){
      var f = v.indexOf(e, l);
      if(f != -1){
         r = f;
      }
   }
   return v.substring(l, r);
}
MO.RString.prototype.toLine = function RString_toLine(v){
   return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
}
MO.RString.prototype.toUnderline = function RString_toUnderline(v){
   var r = null;
   if(v){
      var s = new MO.TString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var h = v.charAt(i);
         if(h.toUpperCase() == h){
            if(i > 0){
               s.append('_');
            }
            s.append(h.toLowerCase());
         }else{
            s.append(h);
         }
      }
      r = s.flush();
   }
   return r;
}
MO.RString.prototype.toLower = function RString_toLower(v){
   return (v != null) ? v.toLowerCase() : this.EMPTY;
}
MO.RString.prototype.toUpper = function RString_toUpper(v){
   return (v != null) ? v.toUpperCase() : this.EMPTY;
}
MO.RString.prototype.split = function RString_split(s, p){
   return (s && p) ? s.split(p) : null;
}
MO.RString.prototype.splitTwo = function RString_splitTwo(s, p){
   if(s && p){
      var r = new Array();
      var n = s.indexOf(p);
      if(n == -1){
         r.push(s);
      }else{
         r.push(s.substring(0, n));
         r.push(s.substring(n+p.length));
      }
      return r;
   }
   return null;
}
MO.RString.prototype.splitParts = function RString_splitParts(s, p){
   var o = this;
   var b = new Array();
   var k = 0;
   var l = s.length;
   for(var i = 0; i < l; i++){
      for(var j in p){
         if(o.startsWith(p[j], s.charAt(i))){
            if(o.equals(s.substr(i, p[j].length), p[j])){
               b[k++] = p[j];
               i = i + p[j].length - 1;
               break;
            }
         }
      }
   }
   return b;
}
MO.RString.prototype.splitPattern = function RString_splitPattern(s, p){
   var r = new Array();
   if(s){
      var sl = s.length;
      var pl = p.length;
      var t = '';
      for(var n = 0; n < sl; n++){
         var v = false;
         for(var i = 0; i < pl; i++){
            var f = p[i];
            if(s.indexOf(f) == -1){
               if(t.length){
                  r[r.length] = t;
                  t = '';
               }
               r[r.length] = f;
               s = s.substring(f.length);
               v = true;
               break;
            }
         }
         if(!v){
            t += s.charAt(0);
            s = s.substring(1);
         }
      }
   }
   return r;
}
MO.RString.prototype.replace = function RString_replace(value, source, target){
   return value.replace(new RegExp(source, 'g'), target);
}
MO.RString.prototype.replaceChar = function RString_replaceChar(v, s, t){
   if(v != null){
      var c = v.length;
      var r = new Array();
      for(var n = 0; n < c; n++){
         var a = v.charAt(n);
         if(a == s){
            r[r.length] = t;
         }else{
            r[r.length] = a;
         }
      }
      return r.join('');
   }
   return v;
}
MO.RString.prototype.remove = function RString_remove(s, t){
   return s.replace(t, '');
}
MO.RString.prototype.removeChars = function RString_removeChars(v, s){
   if(v != null){
      var c = v.length;
      var r = new Array();
      for(var n = 0; n < c; n++){
         var a = v.charAt(n);
         if(s.indexOf(a) != -1){
            continue;
         }
         r[r.length] = a;
      }
      return r.join('');
   }
   return v;
}
MO.RString = new MO.RString();
MO.Lang.String = MO.RString;
MO.RTimer = function RTimer(){
   var o = this;
   o._startTime = 0;
   o._lastTime  = 0;
   o._count     = 0;
   return o;
}
MO.RTimer.prototype.setup = function RTimer_setup(){
   var o = this;
   var tick = new Date().getTime();
   o._startTime = tick;
   o._lastTime = tick;
}
MO.RTimer.prototype.now = function RTimer_now(){
   return new Date().getTime();
}
MO.RTimer.prototype.current = function RTimer_current(){
   return this._lastTime;
}
MO.RTimer.prototype.rate = function RTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
MO.RTimer.prototype.update = function RTimer_update(){
   var o = this;
   o._count++;
   o._lastTime = new Date().getTime();
}
MO.RTimer = new MO.RTimer();
MO.Timer = MO.RTimer;
MO.EFrustumPlane = new function EFrustumPlane(){
   var o = this;
   o.Near = 0;
   o.Far = 1;
   o.Left = 2;
   o.Right = 3;
   o.Top = 4;
   o.Bottom = 5;
   o.Count = 6;
   return o;
}
MO.SColor4 = function SColor4(red, green, blue, alpha){
   var o = this;
   o.red          = red ? red : 0;
   o.green        = green ? green : 0;
   o.blue         = blue ? blue : 0;
   o.alpha        = alpha ? alpha : 1;
   o.assign       = MO.SColor4_assign;
   o.assignPower  = MO.SColor4_assignPower;
   o.set          = MO.SColor4_set;
   o.setInteger   = MO.SColor4_setInteger;
   o.setIntAlpha  = MO.SColor4_setIntAlpha;
   o.setHex       = MO.SColor4_setHex;
   o.serialize    = MO.SColor4_serialize;
   o.unserialize  = MO.SColor4_unserialize;
   o.unserialize3 = MO.SColor4_unserialize3;
   o.saveConfig   = MO.SColor4_saveConfig;
   o.savePower    = MO.SColor4_savePower;
   o.copyArray    = MO.SColor4_copyArray;
   o.toString     = MO.SColor4_toString;
   return o;
}
MO.SColor4_assign = function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
MO.SColor4_assignPower = function SColor4_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
MO.SColor4_set = function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
MO.SColor4_setInteger = function SColor4_setInteger(value){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = ((value >> 24) & 0xFF) / 255;
}
MO.SColor4_setIntAlpha = function SColor4_setIntAlpha(value, alpha){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = alpha;
}
MO.SColor4_setHex = function SColor4_setHex(value){
   var o = this;
   if(value.indexOf('#') == 0){
      value = value.substring(1);
   }
   if(value.indexOf('0x') == 0){
      value = value.substring(2);
   }
   if(value.length == 6){
      o.red = MO.Lang.Hex.parse(value.substring(0, 2)) / 255;
      o.green = MO.Lang.Hex.parse(value.substring(2, 4)) / 255;
      o.blue = MO.Lang.Hex.parse(value.substring(4, 6)) / 255;
   }else{
      throw new MO.TError(o, 'Invalid value.');
   }
}
MO.SColor4_serialize = function SColor4_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
MO.SColor4_unserialize = function SColor4_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
MO.SColor4_unserialize3 = function SColor4_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
MO.SColor4_saveConfig = function SColor4_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
MO.SColor4_savePower = function SColor4_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
MO.SColor4_copyArray = function SColor4_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
MO.SColor4_toString = function SColor4_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}
MO.SCorners = function SCorners(){
   var o = this;
   o.red          = 0;
   o.green        = 0;
   o.blue         = 0;
   o.alpha        = 1;
   o.assign       = MO.SCorners_assign;
   o.assignPower  = MO.SCorners_assignPower;
   o.set          = MO.SCorners_set;
   o.serialize    = MO.SCorners_serialize;
   o.unserialize  = MO.SCorners_unserialize;
   o.unserialize3 = MO.SCorners_unserialize3;
   o.saveConfig   = MO.SCorners_saveConfig;
   o.savePower    = MO.SCorners_savePower;
   o.copyArray    = MO.SCorners_copyArray;
   o.toString     = MO.SCorners_toString;
   return o;
}
MO.SCorners_assign = function SCorners_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
MO.SCorners_assignPower = function SCorners_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
MO.SCorners_set = function SCorners_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
MO.SCorners_serialize = function SCorners_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
MO.SCorners_unserialize = function SCorners_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
MO.SCorners_unserialize3 = function SCorners_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
MO.SCorners_saveConfig = function SCorners_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
MO.SCorners_savePower = function SCorners_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
MO.SCorners_copyArray = function SCorners_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
MO.SCorners_toString = function SCorners_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}
MO.SFrustum = function SFrustum(){
   var o = this;
   o.center       = new MO.SPoint3();
   o.radius       = null;
   o.minX         = null;
   o.maxX         = null;
   o.minY         = null;
   o.maxY         = null;
   o.minZ         = null;
   o.maxZ         = null;
   o.points       = new Array(24);
   o.coners       = new Array(24);
   o.updateCenter = MO.SFrustum_updateCenter;
   o.update       = MO.SFrustum_update;
   o.updateFlat   = MO.SFrustum_updateFlat;
   return o;
}
MO.SFrustum_updateCenter = function SFrustum_updateCenter(){
   var o = this;
   var cs = o.coners;
   o.minX = o.minY = o.minZ = Number.MAX_VALUE;
   o.maxX = o.maxY = o.maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = cs[i++];
      if(x < o.minX){
         o.minX = x;
      }
      if(x > o.maxX){
         o.maxX = x;
      }
      var y = cs[i++];
      if(y < o.minY){
         o.minY = y;
      }
      if(y > o.maxY){
         o.maxY = y;
      }
      var z = cs[i++];
      if(z < o.minZ){
         o.minZ = z;
      }
      if(z > o.maxZ){
         o.maxZ = z;
      }
   }
   o.center.x = (o.minX + o.maxX) * 0.5;
   o.center.y = (o.minY + o.maxY) * 0.5;
   o.center.z = (o.minZ + o.maxZ) * 0.5;
   var cx = o.maxX - o.minX;
   var cy = o.maxY - o.minY;
   var cz = o.maxZ - o.minZ;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SFrustum_update = function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn;
   var zfar = pvf;
   var fov = Math.tan(MO.Const.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var matrix = MO.Lang.Math.matrix;
   matrix.assign(pm);
   matrix.invert();
   matrix.transform(o.coners, ps, 8);
   o.updateCenter();
}
MO.SFrustum_updateFlat = function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn * pbr;
   var zfar = pvf * pfr;
   var fov = Math.tan(MO.Const.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var m = MO.Lang.Math.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, 0, ps, 0, 8);
   o.coners[ 1] = 0.0;
   o.coners[ 4] = 0.0;
   o.coners[ 7] = 0.0;
   o.coners[10] = 0.0;
   o.coners[13] = 0.0;
   o.coners[16] = 0.0;
   o.coners[19] = 0.0;
   o.coners[22] = 0.0;
   o.updateCenter();
}
MO.SFrustumPlanes = function SFrustumPlanes(){
   var o = this;
   o.planes            = new Array();
   o.containsPoint     = MO.SFrustumPlanes_containsPoint;
   o.containsCube      = MO.SFrustumPlanes_containsCube;
   o.containsRectangle = MO.SFrustumPlanes_containsRectangle;
   o.containsCorners   = MO.SFrustumPlanes_containsCorners;
   o.containsSphere    = MO.SFrustumPlanes_containsSphere;
   o.updateVision      = MO.SFrustumPlanes_updateVision;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      o.planes.push(new MO.SPlane());
   }
   return o;
}
MO.SFrustumPlanes_containsPoint = function SFrustumPlanes_containsPoint(x, y, z){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      if(ps[n].dot(x, y, z) < 0){
         return false;
      }
   }
   return true;
}
MO.SFrustumPlanes_containsCube = function SFrustumPlanes_containsCube(cx, cy, cz, size){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz + l) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsRectangle = function SFrustumPlanes_containsRectangle(cx, cy, cz, sx, sy, sz){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsCorners = function SFrustumPlanes_containsCorners(p){
   var o = this;
   var s = o.planes;
   for(var i = MO.EFrustumPlane.Count - 1; i >= 0; i--){
      var l = s[i];
      if(l.dot(p[ 0], p[ 1], p[ 2]) >= 0){
         continue;
      }
      if(l.dot(p[ 3], p[ 4], p[ 5]) >= 0){
         continue;
      }
      if(l.dot(p[ 6], p[ 7], p[ 8]) >= 0){
         continue;
      }
      if(l.dot(p[ 9], p[10], p[11]) >= 0){
         continue;
      }
      if(l.dot(p[12], p[13], p[14]) >= 0){
         continue;
      }
      if(l.dot(p[15], p[16], p[17]) >= 0){
         continue;
      }
      if(l.dot(p[18], p[19], p[20]) >= 0){
         continue;
      }
      if(l.dot(p[21], p[22], p[23]) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsSphere = function SFrustumPlanes_containsSphere(px, py, pz, pr){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      if(ps[n].dot(px, py, pz) < -pr){
         return false;
      }
   }
   return true;
}
MO.SFrustumPlanes_updateVision = function SFrustumPlanes_updateVision(p){
   var o = this;
   var ps = o.planes;
   var pn = ps[MO.EFrustumPlane.Near];
   pn.a = p[ 0 + 3] + p[ 0 + 2];
   pn.b = p[ 4 + 3] + p[ 4 + 2];
   pn.c = p[ 8 + 3] + p[ 8 + 2];
   pn.d = p[12 + 3] + p[12 + 2];
   pn.normalize();
   var pf = ps[MO.EFrustumPlane.Far];
   pf.a = p[ 0 + 3] - p[ 0 + 2];
   pf.b = p[ 4 + 3] - p[ 4 + 2];
   pf.c = p[ 8 + 3] - p[ 8 + 2];
   pf.d = p[12 + 3] - p[12 + 2];
   pf.normalize();
   var pl = ps[MO.EFrustumPlane.Left];
   pl.a = p[ 0 + 3] - p[ 0 + 0];
   pl.b = p[ 4 + 3] - p[ 4 + 0];
   pl.c = p[ 8 + 3] - p[ 8 + 0];
   pl.d = p[12 + 3] - p[12 + 0];
   pl.normalize();
   var pr = ps[MO.EFrustumPlane.Right];
   pr.a = p[ 0 + 3] + p[ 0 + 0];
   pr.b = p[ 4 + 3] + p[ 4 + 0];
   pr.c = p[ 8 + 3] + p[ 8 + 0];
   pr.d = p[12 + 3] + p[12 + 0];
   pr.normalize();
   var pt = ps[MO.EFrustumPlane.Top];
   pt.a = p[ 0 + 3] - p[ 0 + 1];
   pt.b = p[ 4 + 3] - p[ 4 + 1];
   pt.c = p[ 8 + 3] - p[ 8 + 1];
   pt.d = p[12 + 3] - p[12 + 1];
   pt.normalize();
   var pb = ps[MO.EFrustumPlane.Bottom];
   pb.a = p[ 0 + 3] + p[ 0 + 1];
   pb.b = p[ 4 + 3] + p[ 4 + 1];
   pb.c = p[ 8 + 3] + p[ 8 + 1];
   pb.d = p[12 + 3] + p[12 + 1];
   pb.normalize();
}
MO.SMatrix3d = function SMatrix3d(){
   var o = this;
   MO.SMatrix4x4.call(o);
   o._dirty         = false;
   o.tx             = 0;
   o.ty             = 0;
   o.tz             = 0;
   o.rx             = 0;
   o.ry             = 0;
   o.rz             = 0;
   o.sx             = 1;
   o.sy             = 1;
   o.sz             = 1;
   o.isIdentity     = MO.SMatrix3d_isIdentity;
   o.identity       = MO.SMatrix3d_identity;
   o.setTranslate   = MO.SMatrix3d_setTranslate;
   o.setRotation    = MO.SMatrix3d_setRotation;
   o.setScale       = MO.SMatrix3d_setScale;
   o.setScaleAll    = MO.SMatrix3d_setScaleAll;
   o.set            = MO.SMatrix3d_set;
   o.setAll         = MO.SMatrix3d_setAll;
   o.equals         = MO.SMatrix3d_equals;
   o.assign         = MO.SMatrix3d_assign;
   o.attach         = MO.SMatrix3d_attach;
   o.append         = MO.SMatrix3d_append;
   o.updateForce    = MO.SMatrix3d_updateForce;
   o.update         = MO.SMatrix3d_update;
   o.merge          = MO.SMatrix3d_merge;
   o.serialize      = MO.SMatrix3d_serialize;
   o.unserialize    = MO.SMatrix3d_unserialize;
   o.saveConfig     = MO.SMatrix3d_saveConfig;
   o.identity();
   return o;
}
MO.SMatrix3d_isIdentity = function SMatrix3d_isIdentity(){
   var o = this;
   if((o.tx != 0) || (o.ty != 0) || (o.tz != 0)){
      return false;
   }
   if((o.rx != 0) || (o.ry != 0) || (o.rz != 0)){
      return false;
   }
   if((o.sx != 1) || (o.sy != 1) || (o.sz != 1)){
      return false;
   }
   return o.isIdentityData();
}
MO.SMatrix3d_identity = function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   return o.identityData();
}
MO.SMatrix3d_setTranslate = function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}
MO.SMatrix3d_setRotation = function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}
MO.SMatrix3d_setScale = function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}
MO.SMatrix3d_setScaleAll = function SMatrix3d_setScaleAll(p){
   var o = this;
   o.sz = o.sy = o.sx = p;
   o._dirty = true;
}
MO.SMatrix3d_set = function SMatrix3d_set(pt, pr, ps){
   var o = this;
   o.tx = pt.x;
   o.ty = pt.y;
   o.tz = pt.z;
   o.rx = pr.x;
   o.ry = pr.y;
   o.rz = pr.z;
   o.sx = ps.x;
   o.sy = ps.y;
   o.sz = ps.z;
   o._dirty = true;
}
MO.SMatrix3d_setAll = function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
   var o = this;
   o.tx = ptx;
   o.ty = pty;
   o.tz = ptz;
   o.rx = prx;
   o.ry = pry;
   o.rz = prz;
   o.sx = psx;
   o.sy = psy;
   o.sz = psz;
   o._dirty = true;
}
MO.SMatrix3d_equals = function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}
MO.SMatrix3d_assign = function SMatrix3d_assign(p){
   var o = this;
   o.tx = p.tx;
   o.ty = p.ty;
   o.tz = p.tz;
   o.rx = p.rx;
   o.ry = p.ry;
   o.rz = p.rz;
   o.sx = p.sx;
   o.sy = p.sy;
   o.sz = p.sz;
   o.assignData(p._data);
}
MO.SMatrix3d_attach = function SMatrix3d_attach(p){
   var o = this;
   o.tx = p.tx;
   o.ty = p.ty;
   o.tz = p.tz;
   o.rx = p.rx;
   o.ry = p.ry;
   o.rz = p.rz;
   o.sx = p.sx;
   o.sy = p.sy;
   o.sz = p.sz;
   return o.attachData(p._data);
}
MO.SMatrix3d_append = function SMatrix3d_append(p){
   this.appendData(p._data);
}
MO.SMatrix3d_updateForce = function SMatrix3d_updateForce(){
   var o = this;
   var d = o._data;
   var rsx = Math.sin(o.rx);
   var rcx = Math.cos(o.rx);
   var rsy = Math.sin(o.ry);
   var rcy = Math.cos(o.ry);
   var rsz = Math.sin(o.rz);
   var rcz = Math.cos(o.rz);
   d[ 0] = rcy * rcz * o.sx;
   d[ 1] = rcy * rsz * o.sx;
   d[ 2] = -rsy * o.sx;
   d[ 3] = 0;
   d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o.sy;
   d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o.sy;
   d[ 6] = rsx * rcy * o.sy;
   d[ 7] = 0;
   d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o.sz;
   d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o.sz;
   d[10] = rcx * rcy * o.sz;
   d[11] = 0;
   d[12] = o.tx;
   d[13] = o.ty;
   d[14] = o.tz;
   d[15] = 1;
}
MO.SMatrix3d_update = function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}
MO.SMatrix3d_merge = function SMatrix3d_merge(bm, am){
   var o = this;
   o.tx = bm.tx + am.tx;
   o.ty = bm.ty + am.ty;
   o.tz = bm.tz + am.tz;
   o.rx = bm.rx + am.rx;
   o.ry = bm.ry + am.ry;
   o.rz = bm.rz + am.rz;
   o.sx = bm.sx * am.sx;
   o.sy = bm.sy * am.sy;
   o.sz = bm.sz * am.sz;
   o.updateForce();
}
MO.SMatrix3d_serialize = function SMatrix3d_serialize(p){
   var o = this;
   p.writeFloat(o.tx);
   p.writeFloat(o.ty);
   p.writeFloat(o.tz);
   p.writeFloat(o.rx);
   p.writeFloat(o.ry);
   p.writeFloat(o.rz);
   p.writeFloat(o.sx);
   p.writeFloat(o.sy);
   p.writeFloat(o.sz);
}
MO.SMatrix3d_unserialize = function SMatrix3d_unserialize(p){
   var o = this;
   o.tx = p.readFloat();
   o.ty = p.readFloat();
   o.tz = p.readFloat();
   o.rx = p.readFloat();
   o.ry = p.readFloat();
   o.rz = p.readFloat();
   o.sx = p.readFloat();
   o.sy = p.readFloat();
   o.sz = p.readFloat();
   o.updateForce();
}
MO.SMatrix3d_saveConfig = function SMatrix3d_saveConfig(p){
   var o = this;
   p.set('tx', MO.Lang.Float.format(o.tx));
   p.set('ty', MO.Lang.Float.format(o.ty));
   p.set('tz', MO.Lang.Float.format(o.tz));
   p.set('rx', MO.Lang.Float.format(o.rx));
   p.set('ry', MO.Lang.Float.format(o.ry));
   p.set('rz', MO.Lang.Float.format(o.rz));
   p.set('sx', MO.Lang.Float.format(o.sx));
   p.set('sy', MO.Lang.Float.format(o.sy));
   p.set('sz', MO.Lang.Float.format(o.sz));
}
MO.SMatrix3x3 = function SMatrix3x3(){
   var o = this;
   o._data           = new Array(9);
   o.data            = MO.SMatrix3x3_data;
   o.equalsData      = MO.SMatrix3x3_equalsData;
   o.assignData      = MO.SMatrix3x3_assignData;
   o.appendData      = MO.SMatrix3x3_appendData;
   o.rotationX       = MO.SMatrix3x3_rotationX;
   o.rotationY       = MO.SMatrix3x3_rotationY;
   o.rotationZ       = MO.SMatrix3x3_rotationZ;
   o.rotation        = MO.SMatrix3x3_rotation;
   o.invert          = MO.SMatrix3x3_invert;
   o.transform       = MO.SMatrix3x3_transform;
   o.transformPoint3 = MO.SMatrix3x3_transformPoint3;
   o.build           = MO.SMatrix3x3_build;
   o.writeData       = MO.SMatrix3x3_writeData;
   o.toString        = MO.SMatrix3x3_toString;
   return o;
}
MO.SMatrix3x3_data = function SMatrix3x3_data(){
   return this._data;
}
MO.SMatrix3x3_equalsData = function SMatrix3x3_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 9; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix3x3_assignData = function SMatrix3x3_assignData(p){
   var d = this._data;
   for(var n = 0; n < 9; n++){
      d[n] = p[n];
   }
}
MO.SMatrix3x3_appendData = function SMatrix3x3_appendData(p){
   var d = this._data;
   var v0 = (d[0] * p[0]) + (d[1] * p[3]) + (d[2] * p[6]);
   var v1 = (d[0] * p[1]) + (d[1] * p[4]) + (d[2] * p[7]);
   var v2 = (d[0] * p[2]) + (d[1] * p[5]) + (d[2] * p[8]);
   var v3 = (d[3] * p[0]) + (d[4] * p[3]) + (d[5] * p[6]);
   var v4 = (d[3] * p[1]) + (d[4] * p[4]) + (d[5] * p[7]);
   var v5 = (d[3] * p[2]) + (d[4] * p[5]) + (d[5] * p[8]);
   var v6 = (d[6] * p[0]) + (d[7] * p[3]) + (d[8] * p[6]);
   var v7 = (d[6] * p[1]) + (d[7] * p[4]) + (d[8] * p[7]);
   var v8 = (d[6] * p[2]) + (d[7] * p[5]) + (d[8] * p[8]);
   d[0] = v0;
   d[1] = v1;
   d[2] = v2;
   d[3] = v3;
   d[4] = v4;
   d[5] = v5;
   d[6] = v6;
   d[7] = v7;
   d[8] = v8;
}
MO.SMatrix3x3_rotationX = function SMatrix3x3_rotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Math.value9;
   v[0] = 1;
   v[1] = 0;
   v[2] = 0;
   v[3] = 0;
   v[4] = rc;
   v[5] = rs;
   v[6] = 0;
   v[7] = -rs;
   v[8] = rc;
   this.appendData(v);
}
MO.SMatrix3x3_rotationY = function SMatrix3x3_rotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.value9;
   v[0] = rc;
   v[1] = 0;
   v[2] = rs;
   v[3] = 0;
   v[4] = 1;
   v[5] = 0;
   v[6] = -rs;
   v[7] = 0;
   v[8] = rc;
   this.appendData(v);
}
MO.SMatrix3x3_rotationZ = function SMatrix3x3_rotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.value9;
   v[0] = rc;
   v[1] = rs;
   v[2] = 0;
   v[3] = -rs;
   v[4] = rc;
   v[5] = 1;
   v[6] = 0;
   v[7] = 0;
   v[8] = 1;
   this.appendData(v);
}
MO.SMatrix3x3_rotation = function SMatrix3x3_rotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = RMath.value9;
   v[0] = rcy * rcz;
   v[1] = rcy * rsz;
   v[2] = -rsy;
   v[3] = rsx * rsy * rcz - rcx * rsz;
   v[4] = rsx * rsy * rsz + rcx * rcz;
   v[5] = rsx * rcy;
   v[6] = rcx * rsy * rcz + rsx * rsz;
   v[7] = rcx * rsy * rsz - rsx * rcx;
   v[8] = rcx * rcy;
   this.appendData(v);
}
MO.SMatrix3x3_invert = function SMatrix3x3_invert(){
   var o = this;
   var d = o._data;
   var v = RValue.value9;
   v[0] = (d[4] * d[8]) - (d[5] * d[7]);
   v[1] = (d[2] * d[7]) - (d[1] * d[8]);
   v[2] = (d[1] * d[5]) - (d[2] * d[4]);
   v[3] = (d[5] * d[6]) - (d[3] * d[8]);
   v[4] = (d[0] * d[8]) - (d[2] * d[6]);
   v[5] = (d[2] * d[3]) - (d[0] * d[5]);
   v[6] = (d[3] * d[7]) - (d[4] * d[6]);
   v[7] = (d[1] * d[6]) - (d[0] * d[7]);
   v[8] = (d[0] * d[4]) - (d[1] * d[3]);
   var r = (d[0] * v[0]) + (d[1] * v[3]) + (d[2] * v[6]);
   if(r == 0){
      return false;
   }
   r = 1 / r;
   for(var i = 0; i < 9; i++){
      d[i] = v[i] * r;
   }
   return true;
}
MO.SMatrix3x3_transform = function SMatrix3x3_transform(po, pi, pc){
   var d = this._data;
   for(var i = 0; i < pc; i++){
      var n = (i << 1) + i;
      po[n    ] = (pi[n] * d[0]) + (pi[n + 1] * d[3]) +(pi[n + 2] * d[6]);
      po[n + 1] = (pi[n] * d[1]) + (pi[n + 1] * d[4]) +(pi[n + 2] * d[7]);
      po[n + 2] = (pi[n] * d[2]) + (pi[n + 1] * d[5]) +(pi[n + 2] * d[8]);
   }
}
MO.SMatrix3x3_transformPoint3 = function SMatrix3x3_transformPoint3(pi, po){
   var d = this._data;
   var x = (pi.x * d[0]) + (pi.y * d[3]) +(pi.z * d[6]);
   var y = (pi.x * d[1]) + (pi.y * d[4]) +(pi.z * d[7]);
   var z = (pi.x * d[2]) + (pi.y * d[5]) +(pi.z * d[8]);
   var r = null;
   if(po){
      r = po;
   }else{
      r = new SPoint3();
   }
   r.set(x, y, z);
   return r;
}
MO.SMatrix3x3_build = function SMatrix3x3_build(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[0] = 1 - 2 * (y2 + z2);
   d[1] = 2 * (xy - wz);
   d[2] = 2 * (xz + wy);
   d[3] = 2 * (xy + wz);
   d[4] = 1 - 2 * (x2 + z2);
   d[5] = 2 * (yz - wx);
   d[6] = 2 * (xz - wy);
   d[7] = 2 * (yz + wx);
   d[8] = 1 - 2 * (x2 + y2);
}
MO.SMatrix3x3_writeData = function SMatrix3x3_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[0];
   d[i++] = pd[3];
   d[i++] = pd[6];
   d[i++] = pd[1];
   d[i++] = pd[4];
   d[i++] = pd[7];
   d[i++] = pd[2];
   d[i++] = pd[5];
   d[i++] = pd[8];
}
MO.SMatrix3x3_toString = function SMatrix3x3_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 3; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 3; x++){
         var i = y * 3 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
MO.SMatrix4x4 = function SMatrix4x4(){
   var o = this;
   o._data           = new Array(16);
   o.data            = MO.SMatrix4x4_data;
   o.isIdentityData  = MO.SMatrix4x4_isIdentityData;
   o.identityData    = MO.SMatrix4x4_identityData;
   o.equalsData      = MO.SMatrix4x4_equalsData;
   o.assignData      = MO.SMatrix4x4_assignData;
   o.attachData      = MO.SMatrix4x4_attachData;
   o.appendData      = MO.SMatrix4x4_appendData;
   o.addTranslate    = MO.SMatrix4x4_addTranslate;
   o.addRotationX    = MO.SMatrix4x4_addRotationX;
   o.addRotationY    = MO.SMatrix4x4_addRotationY;
   o.addRotationZ    = MO.SMatrix4x4_addRotationZ;
   o.addRotation     = MO.SMatrix4x4_addRotation;
   o.addScale        = MO.SMatrix4x4_addScale;
   o.invert          = MO.SMatrix4x4_invert;
   o.transform       = MO.SMatrix4x4_transform;
   o.transformPoint3 = MO.SMatrix4x4_transformPoint3;
   o.buildQuaternion = MO.SMatrix4x4_buildQuaternion;
   o.build           = MO.SMatrix4x4_build;
   o.writeData       = MO.SMatrix4x4_writeData;
   o.writeData4x3    = MO.SMatrix4x4_writeData4x3;
   o.toString        = MO.SMatrix4x4_toString;
   return o;
}
MO.SMatrix4x4_data = function SMatrix4x4_data(){
   return this._data;
}
MO.SMatrix4x4_isIdentityData = function SMatrix4x4_isIdentityData(){
   var d = this._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      if(d[i] != v[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix4x4_identityData = function SMatrix4x4_identityData(){
   var o = this;
   var d = o._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      d[i] = v[i];
   }
   return o;
}
MO.SMatrix4x4_equalsData = function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix4x4_assignData = function SMatrix4x4_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}
MO.SMatrix4x4_attachData = function SMatrix4x4_attachData(p){
   var r = false;
   var d = this._data;
   for(var i = 0; i < 16; i++){
      var v = p[i];
      if(!r){
         if(d[i] != v){
            r = true;
         }
      }
      d[i] = v;
   }
   return r;
}
MO.SMatrix4x4_appendData = function SMatrix4x4_appendData(p){
   var d = this._data;
   var v00 = (d[ 0] * p[0]) + (d[ 1] * p[4]) + (d[ 2] * p[ 8]) + (d[ 3] * p[12]);
   var v01 = (d[ 0] * p[1]) + (d[ 1] * p[5]) + (d[ 2] * p[ 9]) + (d[ 3] * p[13]);
   var v02 = (d[ 0] * p[2]) + (d[ 1] * p[6]) + (d[ 2] * p[10]) + (d[ 3] * p[14]);
   var v03 = (d[ 0] * p[3]) + (d[ 1] * p[7]) + (d[ 2] * p[11]) + (d[ 3] * p[15]);
   var v04 = (d[ 4] * p[0]) + (d[ 5] * p[4]) + (d[ 6] * p[ 8]) + (d[ 7] * p[12]);
   var v05 = (d[ 4] * p[1]) + (d[ 5] * p[5]) + (d[ 6] * p[ 9]) + (d[ 7] * p[13]);
   var v06 = (d[ 4] * p[2]) + (d[ 5] * p[6]) + (d[ 6] * p[10]) + (d[ 7] * p[14]);
   var v07 = (d[ 4] * p[3]) + (d[ 5] * p[7]) + (d[ 6] * p[11]) + (d[ 7] * p[15]);
   var v08 = (d[ 8] * p[0]) + (d[ 9] * p[4]) + (d[10] * p[ 8]) + (d[11] * p[12]);
   var v09 = (d[ 8] * p[1]) + (d[ 9] * p[5]) + (d[10] * p[ 9]) + (d[11] * p[13]);
   var v10 = (d[ 8] * p[2]) + (d[ 9] * p[6]) + (d[10] * p[10]) + (d[11] * p[14]);
   var v11 = (d[ 8] * p[3]) + (d[ 9] * p[7]) + (d[10] * p[11]) + (d[11] * p[15]);
   var v12 = (d[12] * p[0]) + (d[13] * p[4]) + (d[14] * p[ 8]) + (d[15] * p[12]);
   var v13 = (d[12] * p[1]) + (d[13] * p[5]) + (d[14] * p[ 9]) + (d[15] * p[13]);
   var v14 = (d[12] * p[2]) + (d[13] * p[6]) + (d[14] * p[10]) + (d[15] * p[14]);
   var v15 = (d[12] * p[3]) + (d[13] * p[7]) + (d[14] * p[11]) + (d[15] * p[15]);
   d[ 0] = v00;
   d[ 1] = v01;
   d[ 2] = v02;
   d[ 3] = v03;
   d[ 4] = v04;
   d[ 5] = v05;
   d[ 6] = v06;
   d[ 7] = v07;
   d[ 8] = v08;
   d[ 9] = v09;
   d[10] = v10;
   d[11] = v11;
   d[12] = v12;
   d[13] = v13;
   d[14] = v14;
   d[15] = v15;
}
MO.SMatrix4x4_addTranslate = function SMatrix4x4_addTranslate(x, y, z){
   var v = MO.Lang.Array.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = x;
   v[13] = y;
   v[14] = z;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationX = function SMatrix4x4_addRotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = rc;
   v[ 6] = rs;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = -rs;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationY = function SMatrix4x4_addRotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = rc;
   v[ 1] = 0;
   v[ 2] = rs;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = -rs;
   v[ 9] = 0;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationZ = function SMatrix4x4_addRotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = rc;
   v[ 1] = rs;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = -rs;
   v[ 5] = rc;
   v[ 6] = 1;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotation = function SMatrix4x4_addRotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = MO.Lang.Array.array16;
   v[ 0] = rcy * rcz;
   v[ 1] = rcy * rsz;
   v[ 2] = -rsy;
   v[ 3] = 0;
   v[ 4] = rsx * rsy * rcz - rcx * rsz;
   v[ 5] = rsx * rsy * rsz + rcx * rcz;
   v[ 6] = rsx * rcy;
   v[ 7] = 0;
   v[ 8] = rcx * rsy * rcz + rsx * rsz;
   v[ 9] = rcx * rsy * rsz - rsx * rcx;
   v[10] = rcx * rcy;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addScale = function SMatrix4x4_addScale(x, y, z){
   var v = MO.Lang.Array.array16;
   v[ 0] = x;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = y;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = z;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_invert = function SMatrix4x4_invert(){
   var o = this;
   var d = o._data;
   var v = MO.Lang.Array.array16;
   v[ 0] =  (d[ 5] * d[10] * d[15]) - (d[ 5] * d[11] * d[14]) - (d[ 9] * d[ 6] * d[15]) + (d[ 9] * d[ 7] * d[14]) + (d[13] * d[ 6] * d[11]) - (d[13] * d[ 7] * d[10]);
   v[ 4] = -(d[ 4] * d[10] * d[15]) + (d[ 4] * d[11] * d[14]) + (d[ 8] * d[ 6] * d[15]) - (d[ 8] * d[ 7] * d[14]) - (d[12] * d[ 6] * d[11]) + (d[12] * d[ 7] * d[10]);
   v[ 8] =  (d[ 4] * d[ 9] * d[15]) - (d[ 4] * d[11] * d[13]) - (d[ 8] * d[ 5] * d[15]) + (d[ 8] * d[ 7] * d[13]) + (d[12] * d[ 5] * d[11]) - (d[12] * d[ 7] * d[ 9]);
   v[12] = -(d[ 4] * d[ 9] * d[14]) + (d[ 4] * d[10] * d[13]) + (d[ 8] * d[ 5] * d[14]) - (d[ 8] * d[ 6] * d[13]) - (d[12] * d[ 5] * d[10]) + (d[12] * d[ 6] * d[ 9]);
   v[ 1] = -(d[ 1] * d[10] * d[15]) + (d[ 1] * d[11] * d[14]) + (d[ 9] * d[ 2] * d[15]) - (d[ 9] * d[ 3] * d[14]) - (d[13] * d[ 2] * d[11]) + (d[13] * d[ 3] * d[10]);
   v[ 5] =  (d[ 0] * d[10] * d[15]) - (d[ 0] * d[11] * d[14]) - (d[ 8] * d[ 2] * d[15]) + (d[ 8] * d[ 3] * d[14]) + (d[12] * d[ 2] * d[11]) - (d[12] * d[ 3] * d[10]);
   v[ 9] = -(d[ 0] * d[ 9] * d[15]) + (d[ 0] * d[11] * d[13]) + (d[ 8] * d[ 1] * d[15]) - (d[ 8] * d[ 3] * d[13]) - (d[12] * d[ 1] * d[11]) + (d[12] * d[ 3] * d[ 9]);
   v[13] =  (d[ 0] * d[ 9] * d[14]) - (d[ 0] * d[10] * d[13]) - (d[ 8] * d[ 1] * d[14]) + (d[ 8] * d[ 2] * d[13]) + (d[12] * d[ 1] * d[10]) - (d[12] * d[ 2] * d[ 9]);
   v[ 2] =  (d[ 1] * d[ 6] * d[15]) - (d[ 1] * d[ 7] * d[14]) - (d[ 5] * d[ 2] * d[15]) + (d[ 5] * d[ 3] * d[14]) + (d[13] * d[ 2] * d[ 7]) - (d[13] * d[ 3] * d[ 6]);
   v[ 6] = -(d[ 0] * d[ 6] * d[15]) + (d[ 0] * d[ 7] * d[14]) + (d[ 4] * d[ 2] * d[15]) - (d[ 4] * d[ 3] * d[14]) - (d[12] * d[ 2] * d[ 7]) + (d[12] * d[ 3] * d[ 6]);
   v[10] =  (d[ 0] * d[ 5] * d[15]) - (d[ 0] * d[ 7] * d[13]) - (d[ 4] * d[ 1] * d[15]) + (d[ 4] * d[ 3] * d[13]) + (d[12] * d[ 1] * d[ 7]) - (d[12] * d[ 3] * d[ 5]);
   v[14] = -(d[ 0] * d[ 5] * d[14]) + (d[ 0] * d[ 6] * d[13]) + (d[ 4] * d[ 1] * d[14]) - (d[ 4] * d[ 2] * d[13]) - (d[12] * d[ 1] * d[ 6]) + (d[12] * d[ 2] * d[ 5]);
   v[ 3] = -(d[ 1] * d[ 6] * d[11]) + (d[ 1] * d[ 7] * d[10]) + (d[ 5] * d[ 2] * d[11]) - (d[ 5] * d[ 3] * d[10]) - (d[ 9] * d[ 2] * d[ 7]) + (d[ 9] * d[ 3] * d[ 6]);
   v[ 7] =  (d[ 0] * d[ 6] * d[11]) - (d[ 0] * d[ 7] * d[10]) - (d[ 4] * d[ 2] * d[11]) + (d[ 4] * d[ 3] * d[10]) + (d[ 8] * d[ 2] * d[ 7]) - (d[ 8] * d[ 3] * d[ 6]);
   v[11] = -(d[ 0] * d[ 5] * d[11]) + (d[ 0] * d[ 7] * d[ 9]) + (d[ 4] * d[ 1] * d[11]) - (d[ 4] * d[ 3] * d[ 9]) - (d[ 8] * d[ 1] * d[ 7]) + (d[ 8] * d[ 3] * d[ 5]);
   v[15] =  (d[ 0] * d[ 5] * d[10]) - (d[ 0] * d[ 6] * d[ 9]) - (d[ 4] * d[ 1] * d[10]) + (d[ 4] * d[ 2] * d[ 9]) + (d[ 8] * d[ 1] * d[ 6]) - (d[ 8] * d[ 2] * d[ 5]);
   var r = d[ 0] * v[ 0] + d[ 1] * v[ 4] + d[ 2] * v[ 8] + d[ 3] * v[12];
   if(r == 0){
     return false;
   }
   r = 1 / r;
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}
MO.SMatrix4x4_transform = function SMatrix4x4_transform(outputData, outputIndex, inputData, inputIndex, count){
   var data = this._data;
   for(var i = 0; i < count; i++){
      var x = inputData[inputIndex++];
      var y = inputData[inputIndex++];
      var z = inputData[inputIndex++];
      outputData[outputIndex++] = (x * data[ 0]) + (y * data[ 4]) +(z * data[ 8]) + data[12];
      outputData[outputIndex++] = (x * data[ 1]) + (y * data[ 5]) +(z * data[ 9]) + data[13];
      outputData[outputIndex++] = (x * data[ 2]) + (y * data[ 6]) +(z * data[10]) + data[14];
   }
}
MO.SMatrix4x4_transformPoint3 = function SMatrix4x4_transformPoint3(input, output){
   var data = this._data;
   var x = (input.x * data[ 0]) + (input.y * data[ 4]) +(input.z * data[ 8]) + data[12];
   var y = (input.x * data[ 1]) + (input.y * data[ 5]) +(input.z * data[ 9]) + data[13];
   var z = (input.x * data[ 2]) + (input.y * data[ 6]) +(input.z * data[10]) + data[14];
   var result = null;
   if(output){
      result = output;
   }else{
      result = new MO.SPoint3();
   }
   result.set(x, y, z);
   return result;
}
MO.SMatrix4x4_build = function SMatrix4x4_build(t, r, s){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = (1 - 2 * (y2 + z2)) * s.x;
   d[ 1] = 2 * (xy - wz) * s.x;
   d[ 2] = 2 * (xz + wy) * s.x;
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz) * s.y;
   d[ 5] = (1 - 2 * (x2 + z2)) * s.y;
   d[ 6] = 2 * (yz - wx) * s.y;
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy) * s.z;
   d[ 9] = 2 * (yz + wx) * s.z;
   d[10] = (1 - 2 * (x2 + y2)) * s.z;
   d[11] = 0;
   d[12] = t.x;
   d[13] = t.y;
   d[14] = t.z;
   d[15] = 1;
}
MO.SMatrix4x4_buildQuaternion = function SMatrix4x4_buildQuaternion(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = 1 - 2 * (y2 + z2);
   d[ 1] = 2 * (xy - wz);
   d[ 2] = 2 * (xz + wy);
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz);
   d[ 5] = 1 - 2 * (x2 + z2);
   d[ 6] = 2 * (yz - wx);
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy);
   d[ 9] = 2 * (yz + wx);
   d[10] = 1 - 2 * (x2 + y2);
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
}
MO.SMatrix4x4_writeData = function SMatrix4x4_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
   d[i++] = pd[ 3];
   d[i++] = pd[ 7];
   d[i++] = pd[11];
   d[i++] = pd[15];
}
MO.SMatrix4x4_writeData4x3 = function SMatrix4x4_writeData4x3(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
}
MO.SMatrix4x4_toString = function SMatrix4x4_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 4; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 4; x++){
         var i = y * 4 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
MO.SOutline3 = function SOutline3(){
   var o = this;
   o.min         = new MO.SPoint3();
   o.max         = new MO.SPoint3();
   o.isEmpty     = MO.SOutline3_isEmpty;
   o.assign      = MO.SOutline3_assign;
   o.setMin      = MO.SOutline3_setMin;
   o.setMax      = MO.SOutline3_setMax;
   o.set         = MO.SOutline3_set;
   o.mergeMin    = MO.SOutline3_mergeMin;
   o.mergeMax    = MO.SOutline3_mergeMax;
   o.mergePoint  = MO.SOutline3_mergePoint;
   o.serialize   = MO.SOutline3_serialize;
   o.unserialize = MO.SOutline3_unserialize;
   o.toString    = MO.SOutline3_toString;
   return o;
}
MO.SOutline3_isEmpty = function SOutline3_isEmpty(p){
   var o = this;
   return o.min.isEmpty() && o.max.isEmpty();
}
MO.SOutline3_assign = function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
}
MO.SOutline3_setMin = function SOutline3_setMin(){
   var o = this;
   o.min.setMax();
   o.max.setMin();
}
MO.SOutline3_setMax = function SOutline3_setMax(){
   var o = this;
   o.min.setMin();
   o.max.setMax();
}
MO.SOutline3_set = function SOutline3_set(minX, minY, minZ, maxX, maxY, maxZ){
   var o = this;
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
}
MO.SOutline3_mergeMin = function SOutline3_mergeMin(p){
   var o = this;
   o.min.mergeMax(p.min);
   o.max.mergeMin(p.max);
}
MO.SOutline3_mergeMax = function SOutline3_mergeMax(p){
   var o = this;
   o.min.mergeMin(p.min);
   o.max.mergeMax(p.max);
}
MO.SOutline3_mergePoint = function SOutline3_mergePoint(x, y, z){
   var o = this;
   o.min.mergeMin3(x, y, z);
   o.max.mergeMax3(x, y, z);
}
MO.SOutline3_serialize = function SOutline3_serialize(p){
   var o = this;
   o.min.serialize(p);
   o.max.serialize(p);
}
MO.SOutline3_unserialize = function SOutline3_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}
MO.SOutline3_toString = function SOutline3_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
MO.SOutline3d = function SOutline3d(){
   var o = this;
   MO.SOutline3.call(o);
   o.center        = new MO.SPoint3();
   o.distance      = new MO.SPoint3();
   o.radius        = 0;
   o.points        = new Array(24);
   o.assign        = MO.SOutline3d_assign;
   o.update        = MO.SOutline3d_update;
   o.calculateFrom = MO.SOutline3d_calculateFrom;
   o.calculate     = MO.SOutline3d_calculate;
   return o;
}
MO.SOutline3d_assign = function SOutline3d_assign(value){
   var o = this;
   o.center.assign(value.center);
   o.distance.assign(value.distance);
   o.radius = value.radius;
   for(var i = 0; i < 24; i++){
      o.points[i] = value.points[i];
   }
}
MO.SOutline3d_update = function SOutline3d_update(){
   var o = this;
   var min = o.min;
   var minX = min.x;
   var minY = min.y;
   var minZ = min.z;
   var max = o.max;
   var maxX = max.x;
   var maxY = max.y;
   var maxZ = max.z;
   var ps = o.points;
   ps[ 0] = minX;
   ps[ 1] = maxY;
   ps[ 2] = minZ;
   ps[ 3] = maxX;
   ps[ 4] = maxY;
   ps[ 5] = minZ;
   ps[ 6] = maxX;
   ps[ 7] = minY;
   ps[ 8] = minZ;
   ps[ 9] = minX;
   ps[10] = minY;
   ps[11] = minZ;
   ps[12] = minX;
   ps[13] = maxY;
   ps[14] = maxZ;
   ps[15] = maxX;
   ps[16] = maxY;
   ps[17] = maxZ;
   ps[18] = maxX;
   ps[19] = minY;
   ps[20] = maxZ;
   ps[21] = minX;
   ps[22] = minY;
   ps[23] = maxZ;
   var center = o.center;
   center.x = (minX + maxX) * 0.5;
   center.y = (minY + maxY) * 0.5;
   center.z = (minZ + maxZ) * 0.5;
   var distance = o.distance;
   distance.x = maxX - minX;
   distance.y = maxY - minY;
   distance.z = maxZ - minZ;
   var cx = maxX - minX;
   var cy = maxY - minY;
   var cz = maxZ - minZ;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SOutline3d_calculateFrom = function SOutline3d_calculateFrom(outline, matrix){
   var o = this;
   var points = o.points;
   matrix.transform(points, 0, outline.points, 0, 8);
   var minX = minY = minZ = Number.MAX_VALUE;
   var maxX = maxY = maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = points[i++];
      if(x < minX){
         minX = x;
      }
      if(x > maxX){
         maxX = x;
      }
      var y = points[i++];
      if(y < minY){
         minY = y;
      }
      if(y > maxY){
         maxY = y;
      }
      var z = points[i++];
      if(z < minZ){
         minZ = z;
      }
      if(z > maxZ){
         maxZ = z;
      }
   }
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
   o.update();
}
MO.SOutline3d_calculate = function SOutline3d_calculate(p){
   var o = this;
   var vix = viy = viz = Number.MAX_VALUE;
   var vax = vay = vaz = -Number.MAX_VALUE;
   var i = 0;
   var d = o.points;
   while(i < 24){
      var x = d[i++];
      if(x < vix){
         vix = x;
      }
      if(x > vax){
         vax = x;
      }
      var y = d[i++];
      if(y < viy){
         viy = y;
      }
      if(y > vay){
         vay = y;
      }
      var z = d[i++];
      if(z < viz){
         viz = z;
      }
      if(z > vaz){
         vaz = z;
      }
   }
   o.min.set(vix, viy, viz);
   o.max.set(vax, vay, vaz);
   o.center.x = (vix + vax) * 0.5;
   o.center.y = (viy + vay) * 0.5;
   o.center.z = (viz + vaz) * 0.5;
   var cx = vax - vix;
   var cy = vay - viy;
   var cz = vaz - viz;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SPadding = function SPadding(l, t, r, b){
   var o = this;
   o.left     = MO.Lang.Integer.nvl(l);
   o.top      = MO.Lang.Integer.nvl(t);
   o.right    = MO.Lang.Integer.nvl(r);
   o.bottom   = MO.Lang.Integer.nvl(b);
   o.isEmpty  = MO.SPadding_isEmpty;
   o.reset    = MO.SPadding_reset;
   o.assign   = MO.SPadding_assign;
   o.set      = MO.SPadding_set;
   o.parse    = MO.SPadding_parse;
   o.toString = MO.SPadding_toString;
   o.dispose  = MO.SPadding_dispose;
   o.dump     = MO.SPadding_dump;
   return o;
}
MO.SPadding_isEmpty = function SPadding_isEmpty(){
   var o = this;
   return (o.left == 0) && (o.top == 0) && (o.right == 0) && (o.bottom == 0);
}
MO.SPadding_reset = function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SPadding_assign = function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}
MO.SPadding_set = function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}
MO.SPadding_parse = function SPadding_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 4){
      o.left = parseInt(r[0]);
      o.top = parseInt(r[1]);
      o.right = parseInt(r[2]);
      o.bottom = parseInt(r[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SPadding_toString = function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SPadding_dispose = function SPadding_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.right = null;
   o.bottom = null;
}
MO.SPadding_dump = function SPadding_dump(d){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}
MO.SPlane = function SPlane(){
   var o = this;
   o.a         = 0;
   o.b         = 0;
   o.c         = 0;
   o.d         = 0;
   o.assign    = MO.SPlane_assign;
   o.set       = MO.SPlane_set;
   o.normalize = MO.SPlane_normalize;
   o.dot       = MO.SPlane_dot;
   o.toString  = MO.SPlane_toString;
   o.dump      = MO.SPlane_dump;
   return o;
}
MO.SPlane_assign = function SPlane_assign(p){
   var o = this;
   o.a = p.a;
   o.b = p.b;
   o.c = p.c;
   o.d = p.d;
}
MO.SPlane_set = function SPlane_set(pa, pb, pc, pd){
   var o = this;
   o.a = pa;
   o.b = pb;
   o.c = pc;
   o.d = pd;
}
MO.SPlane_normalize = function SPlane_normalize(){
   var o = this;
   var r = 1 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}
MO.SPlane_dot = function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + o.d;
}
MO.SPlane_toString = function SPlane_toString(){
   var o = this;
   return o.a + ',' + o.b + ',' + o.c + ',' + o.d;
}
MO.SPlane_dump = function SPlane_dump(){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.toString() + ']';
}
MO.SPoint2 = function SPoint2(x, y){
   var o = this;
   o.x           = MO.Lang.Integer.nvl(x);
   o.y           = MO.Lang.Integer.nvl(y);
   o.isEmpty     = MO.SPoint2_isEmpty;
   o.equals      = MO.SPoint2_equals;
   o.assign      = MO.SPoint2_assign;
   o.set         = MO.SPoint2_set;
   o.serialize   = MO.SPoint2_serialize;
   o.unserialize = MO.SPoint2_unserialize;
   o.parse       = MO.SPoint2_parse;
   o.toString    = MO.SPoint2_toString;
   o.dispose     = MO.SPoint2_dispose;
   o.dump        = MO.SPoint2_dump;
   return o;
}
MO.SPoint2_isEmpty = function SPoint2_isEmpty(){
   var o = this;
   return (o.x == 0) && (o.y == 0);
}
MO.SPoint2_equals = function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}
MO.SPoint2_assign = function SPoint2_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
}
MO.SPoint2_set = function SPoint2_set(x, y){
   var o = this;
   o.x = x;
   o.y = y;
}
MO.SPoint2_serialize = function SPoint2_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
}
MO.SPoint2_unserialize = function SPoint2_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
}
MO.SPoint2_parse = function SPoint2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      o.x = parseInt(items[0]);
      o.y = parseInt(items[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", source);
   }
}
MO.SPoint2_toString = function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}
MO.SPoint2_dispose = function SPoint2_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
}
MO.SPoint2_dump = function SPoint2_dump(){
   return MO.Class.dump(this) + ' [' + this.x + ',' + this.y + ']';
}
MO.SPoint3 = function SPoint3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   o.conjugate = MO.SPoint3_conjugate;
   o.mergeMin  = MO.SPoint3_mergeMin;
   o.mergeMin3 = MO.SPoint3_mergeMin3;
   o.mergeMax  = MO.SPoint3_mergeMax;
   o.mergeMax3 = MO.SPoint3_mergeMax3;
   o.resize    = MO.SPoint3_resize;
   o.slerp     = MO.SPoint3_slerp;
   return o;
}
MO.SPoint3_conjugate = function SPoint3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SPoint3();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}
MO.SPoint3_mergeMin = function SPoint3_mergeMin(p){
   var o = this;
   o.x = Math.min(o.x, p.x);
   o.y = Math.min(o.y, p.y);
   o.z = Math.min(o.z, p.z);
}
MO.SPoint3_mergeMin3 = function SPoint3_mergeMin3(x, y, z){
   var o = this;
   o.x = Math.min(o.x, x);
   o.y = Math.min(o.y, y);
   o.z = Math.min(o.z, z);
}
MO.SPoint3_mergeMax = function SPoint3_mergeMax(p){
   var o = this;
   o.x = Math.max(o.x, p.x);
   o.y = Math.max(o.y, p.y);
   o.z = Math.max(o.z, p.z);
}
MO.SPoint3_mergeMax3 = function SPoint3_mergeMax3(x, y, z){
   var o = this;
   o.x = Math.max(o.x, x);
   o.y = Math.max(o.y, y);
   o.z = Math.max(o.z, z);
}
MO.SPoint3_resize = function SPoint3_resize(x, y, z){
   var o = this;
   if(x != null){
      o.x += x;
   }
   if(y != null){
      o.y += y;
   }
   if(z != null){
      o.z += z;
   }
}
MO.SPoint3_slerp = function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
MO.SPoint4 = function SPoint4(x, y, z, w){
   var o = this;
   MO.SValue4.call(o, x, y, z, w);
   o.serialize3   = MO.SPoint4_serialize3;
   o.unserialize3 = MO.SPoint4_unserialize3;
   return o;
}
MO.SPoint4_serialize3 = function SPoint4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
MO.SPoint4_unserialize3 = function SPoint4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
MO.SQuaternion = function SQuaternion(){
   var o = this;
   o.x             = 0;
   o.y             = 0;
   o.z             = 0;
   o.w             = 1;
   o.identity      = MO.SQuaternion_identity;
   o.assign        = MO.SQuaternion_assign;
   o.set           = MO.SQuaternion_set;
   o.absolute      = MO.SQuaternion_absolute;
   o.normalize     = MO.SQuaternion_normalize;
   o.conjugate     = MO.SQuaternion_conjugate;
   o.mul           = MO.SQuaternion_mul;
   o.mul2          = MO.SQuaternion_mul2;
   o.translate     = MO.SQuaternion_translate;
   o.slerp         = MO.SQuaternion_slerp;
   o.fromAxisAngle = MO.SQuaternion_fromAxisAngle;
   o.fromEuler     = MO.SQuaternion_fromEuler;
   o.parseEuler    = MO.SQuaternion_parseEuler;
   o.serialize     = MO.SQuaternion_serialize;
   o.unserialize   = MO.SQuaternion_unserialize;
   o.clone         = MO.SQuaternion_clone;
   o.toString      = MO.SQuaternion_toString;
   return o;
}
MO.SQuaternion_identity = function SQuaternion_identity(){
   var o = this;
   o.x = o.y = o.z = 0;
   o.w = 1;
   return o;
}
MO.SQuaternion_assign = function SQuaternion_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
MO.SQuaternion_set = function SQuaternion_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
MO.SQuaternion_absolute = function SQuaternion_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
MO.SQuaternion_normalize = function SQuaternion_normalize(){
   var o = this;
   var a = o.absolute();
   if(a != 0){
      var v = 1 / a;
      o.x *= v;
      o.y *= v;
      o.z *= v;
      o.w *= v;
   }
}
MO.SQuaternion_conjugate = function SQuaternion_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SQuaternion();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   r.w = o.w;
   return r;
}
MO.SQuaternion_mul = function SQuaternion_mul(p){
   var o = this;
   var x = o.x;
   var y = o.y;
   var z = o.z;
   var w = o.w;
   o.x = (w * p.x) + (x * p.w) + (y * p.z) - (z * p.y);
   o.y = (w * p.y) + (y * p.w) + (z * p.x) - (x * p.z);
   o.z = (w * p.z) + (z * p.w) + (x * p.y) - (y * p.x);
   o.w = (w * p.w) - (x * p.x) - (y * p.y) - (z * p.z);
}
MO.SQuaternion_mul2 = function SQuaternion_mul2(p1, p2){
   var o = this;
   o.x = (p1.w * p2.x) + (p1.x * p2.w) + (p1.y * p2.z) - (p1.z * p2.y);
   o.y = (p1.w * p2.y) + (p1.y * p2.w) + (p1.z * p2.x) - (p1.x * p2.z);
   o.z = (p1.w * p2.z) + (p1.z * p2.w) + (p1.x * p2.y) - (p1.y * p2.x);
   o.w = (p1.w * p2.w) - (p1.x * p2.x) - (p1.y * p2.y) - (p1.z * p2.z);
}
MO.SQuaternion_translate = function SQuaternion_translate(pi, po){
   var o = this;
   var q1 = new MO.SQuaternion();
   q1.set(pi.x, pi.y, pi.z, 0);
   q1.normalize();
   var q2 = o.conjugate();
   q1.mul(q2);
   var q = o.clone();
   q.mul(q1);
   var r = null;
   if(po){
      r = po;
   }else{
      r = new MO.SVector3();
   }
   r.set(q.x, q.y, q.z);
   return r;
}
MO.SQuaternion_slerp = function SQuaternion_slerp(v1, v2, r){
   var o = this;
   var rv = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
   var rf = false;
   if (rv < 0){
      rf = true;
      rv = -rv;
   }
   var r1 = 0;
   var r2 = 0;
   if(rv > 0.999999){
      r1 = 1 - r;
      r2 = rf ? -r : r;
   }else{
      var ra = Math.acos(rv);
      var rb = 1 / Math.sin(ra);
      r1 = Math.sin((1 - r) * ra) * rb;
      r2 = rf ? (-Math.sin(r * ra) * rb) : (Math.sin(r * ra) * rb);
   }
   o.x = (r1 * v1.x) + (r2 * v2.x);
   o.y = (r1 * v1.y) + (r2 * v2.y);
   o.z = (r1 * v1.z) + (r2 * v2.z);
   o.w = (r1 * v1.w) + (r2 * v2.w);
}
MO.SQuaternion_fromAxisAngle = function SQuaternion_fromAxisAngle(a, g){
   var o = this;
   var r = g * 0.5;
   var s = Math.sin(r);
   o.x = a.x * s;
   o.y = a.y * s;
   o.z = a.z * s;
   o.w = Math.cos(r);
}
MO.SQuaternion_fromEuler = function SQuaternion_fromEuler(p, y, r){
   var o = this;
   var sr = Math.sin(r * 0.5);
   var cr = Math.cos(r * 0.5);
   var sp = Math.sin(p * 0.5);
   var cp = Math.cos(p * 0.5);
   var sy = Math.sin(y * 0.5);
   var cy = Math.cos(y * 0.5);
   o.x = cr * sp * cy + sr * cp * sy;
   o.y = cr * cp * sy - sr * sp * cy;
   o.z = sr * cp * cy - cr * sp * sy;
   o.w = cr * cp * cy + sr * sp * sy;
}
MO.SQuaternion_parseEuler = function SQuaternion_parseEuler(p){
   var o = this;
   var x2 = o.x * o.x;
   var y2 = o.y * o.y;
   var z2 = o.z * o.z;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector3();
   }
   r.x = Math.asin(RFloat.toRange((o.w * o.x - o.y * o.z) * 2, -1, 1));
   r.y = Math.atan2(2 * (o.w * o.y + o.z * o.x) , 1 - 2 * (x2 + y2));
   r.z = Math.atan2(2 * (o.w * o.z + o.x * o.y) , 1 - 2 * (z2 + x2));
   return r;
}
MO.SQuaternion_serialize = function SQuaternion_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
MO.SQuaternion_unserialize = function SQuaternion_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
MO.SQuaternion_clone = function SQuaternion_clone(){
   var o = this;
   var r = new MO.SQuaternion();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   r.w = o.w;
   return r;
}
MO.SQuaternion_toString = function SQuaternion_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
MO.SRange = function SRange(x, y, w, h){
   var o = this;
   o.x         = x;
   o.y         = y;
   o.width     = w;
   o.height    = h;
   o.dump      = SRange_dump;
   return o;
}
MO.SRange_reset = function SRange_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SRange_assign = function SRange_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
MO.SRange_set = function SRange_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
MO.SRange_setBounds = function SRange_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
MO.SRange_width = function SRange_width(){
   return this.right - this.left + 1;
}
MO.SRange_setWidth = function SRange_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
MO.SRange_height = function SRange_height(){
   return this.bottom - this.top + 1;
}
MO.SRange_setHeight = function SRange_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
MO.SRange_move = function SRange_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
MO.SRange_inc = function SRange_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
MO.SRange_dec = function SRange_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
MO.SRange_dump = function SRange_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.append(RClass.name(o));
   d.append(' [', o.x, ',', o.y, '-', o.width, ',', o.height, '] ');
   return d;
}
MO.SRectangle = function SRectangle(left, top, width, height){
   var o = this;
   o.left            = MO.Lang.Integer.nvl(left);
   o.top             = MO.Lang.Integer.nvl(top);
   o.width           = MO.Lang.Integer.nvl(width);
   o.height          = MO.Lang.Integer.nvl(height);
   o.right           = MO.SRectangle_right;
   o.bottom          = MO.SRectangle_bottom;
   o.isEmpty         = MO.SRectangle_isEmpty;
   o.testRange       = MO.SRectangle_testRange;
   o.testRectangle   = MO.SRectangle_testRectangle;
   o.reset           = MO.SRectangle_reset;
   o.assign          = MO.SRectangle_assign;
   o.setLocation     = MO.SRectangle_setLocation;
   o.setSize         = MO.SRectangle_setSize;
   o.setLocationSize = MO.SRectangle_setLocationSize;
   o.set             = MO.SRectangle_set;
   o.toString        = MO.SRectangle_toString;
   o.dispose         = MO.SRectangle_dispose;
   return o;
}
MO.SRectangle_right = function SRectangle_right(){
   return this.left + this.width;
}
MO.SRectangle_bottom = function SRectangle_bottom(){
   return this.top + this.height;
}
MO.SRectangle_isEmpty = function SRectangle_isEmpty(){
   var o = this;
   if((o.width > 0) && (o.height > 0)){
      return false;
   }
   return true;
}
MO.SRectangle_testRange = function SRectangle_testRange(x, y){
   var o = this;
   if(x < o.left){
      return false;
   }
   if(y < o.top){
      return false;
   }
   if(x - o.left > o.width){
      return false;
   }
   if(y - o.top > o.height){
      return false;
   }
   return true;
}
MO.SRectangle_testRectangle = function SRectangle_testRectangle(value) {
   var o = this;
   return (o.left < value.left + value.width && o.left + o.width > value.left && o.top < value.top + value.height && o.top + o.height > value.top);
}
MO.SRectangle_reset = function SRectangle_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.width = 0;
   o.height = 0;
}
MO.SRectangle_assign = function SRectangle_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.width = value.width;
   o.height = value.height;
}
MO.SRectangle_setLocation = function SRectangle_setLocation(left, top){
   var o = this;
   o.left = left;
   o.top = top;
}
MO.SRectangle_setSize = function SRectangle_setSize(width, height){
   var o = this;
   o.width = width;
   o.height = height;
}
MO.SRectangle_setLocationSize = function SRectangle_setLocationSize(location, size){
   var o = this;
   o.left = location.x;
   o.top = location.y;
   o.width = size.width;
   o.height = size.height;
}
MO.SRectangle_set = function SRectangle_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height = height;
}
MO.SRectangle_toString = function SRectangle_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.width + ',' + o.height;
}
MO.SRectangle_dispose = function SRectangle_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.width = null;
   o.height = null;
}
MO.SSize2 = function SSize2(width, height){
   var o = this;
   o.width       = MO.Lang.Integer.nvl(width);
   o.height      = MO.Lang.Integer.nvl(height);
   o.isEmpty     = MO.SSize2_isEmpty;
   o.equalsData  = MO.SSize2_equalsData;
   o.equals      = MO.SSize2_equals;
   o.square      = MO.SSize2_square;
   o.assign      = MO.SSize2_assign;
   o.set         = MO.SSize2_set;
   o.serialize   = MO.SSize2_serialize;
   o.unserialize = MO.SSize2_unserialize;
   o.parse       = MO.SSize2_parse;
   o.toDisplay   = MO.SSize2_toDisplay;
   o.toString    = MO.SSize2_toString;
   o.dispose     = MO.SSize2_dispose;
   o.dump        = MO.SSize2_dump;
   return o;
}
MO.SSize2_isEmpty = function SSize2_isEmpty(){
   var o = this;
   return (o.width == 0) && (o.height == 0);
}
MO.SSize2_equalsData = function SSize2_equalsData(width, height){
   var o = this;
   if(o.width != width){
      return false;
   }
   if(o.height != height){
      return false;
   }
   return true;
}
MO.SSize2_equals = function SSize2_equals(p){
   var o = this;
   if(o.width != p.width){
      return false;
   }
   if(o.height != p.height){
      return false;
   }
   return true;
}
MO.SSize2_square = function SSize2_square(){
   return this.width * this.height;
}
MO.SSize2_assign = function SSize2_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
}
MO.SSize2_set = function SSize2_set(w, h){
   var o = this;
   o.width = w;
   o.height = h;
}
MO.SSize2_serialize = function SSize2_serialize(output){
   var o = this;
   output.writeFloat(o.width);
   output.writeFloat(o.height);
}
MO.SSize2_unserialize = function SSize2_unserialize(input, dataCd){
   var o = this;
   if(!dataCd){
      dataCd = MO.EDataType.Float16;
   }
   o.width = input.readData(dataCd);
   o.height = input.readData(dataCd);
}
MO.SSize2_parse = function SSize2_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 2){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SSize2_toDisplay = function SSize2_toDisplay(){
   var o = this;
   return o.width + 'x' + o.height;
}
MO.SSize2_toString = function SSize2_toString(){
   var o = this;
   return o.width + ',' + o.height;
}
MO.SSize2_dispose = function SSize2_dispose(){
   var o = this;
   o.width = null;
   o.height = null;
}
MO.SSize2_dump = function SSize2_dump(){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.width + ',' + o.height + ']';
}
MO.SSize3 = function SSize3(w, h, d){
   var o = this;
   o.width    = MO.Lang.Integer.nvl(w);
   o.height   = MO.Lang.Integer.nvl(h);
   o.deep     = MO.Lang.Integer.nvl(d);
   o.assign   = MO.SSize3_assign;
   o.set      = MO.SSize3_set;
   o.parse    = MO.SSize3_parse;
   o.toString = MO.SSize3_toString;
   o.dump     = MO.SSize3_dump;
   return o;
}
MO.SSize3_assign = function SSize3_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
   o.deep = v.deep;
}
MO.SSize3_set = function SSize3_set(w, h, d){
   var o = this;
   o.width = w;
   o.height = h;
   o.deep = d;
}
MO.SSize3_parse = function SSize3_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 3){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
      o.deep = parseInt(r[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SSize3_toString = function SSize3_toString(){
   var o = this;
   return o.width + ',' + o.height + ',' + o.deep;
}
MO.SSize3_dump = function SSize3_dump(){
   var o = this;
   return MO.Lang.Class.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
}
MO.SSquare = function SSquare(l, t, r, b){
   var o = this;
   o.left      = MO.Lang.Integer.nvl(left);
   o.top       = MO.Lang.Integer.nvl(top);
   o.right     = MO.Lang.Integer.nvl(right);
   o.bottom    = MO.Lang.Integer.nvl(bottom);
   o.reset     = MO.SSquare_reset;
   o.assign    = MO.SSquare_assign;
   o.set       = MO.SSquare_set;
   o.setBounds = MO.SSquare_setBounds;
   o.width     = MO.SSquare_width;
   o.setWidth  = MO.SSquare_setWidth;
   o.height    = MO.SSquare_height;
   o.setHeight = MO.SSquare_setHeight;
   o.move      = MO.SSquare_move;
   o.inc       = MO.SSquare_inc;
   o.dec       = MO.SSquare_dec;
   o.pack      = MO.SSquare_dump;
   o.unpack    = MO.SSquare_dump;
   o.dump      = MO.SSquare_dump;
   return o;
}
MO.SSquare_reset = function SSquare_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SSquare_assign = function SSquare_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.right = value.right;
   o.bottom = value.bottom;
}
MO.SSquare_set = function SSquare_set(left, top, right, bottom){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = right;
   o.bottom = bottom;
}
MO.SSquare_setBounds = function SSquare_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
MO.SSquare_width = function SSquare_width(){
   return this.right - this.left + 1;
}
MO.SSquare_setWidth = function SSquare_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
MO.SSquare_height = function SSquare_height(){
   return this.bottom - this.top + 1;
}
MO.SSquare_setHeight = function SSquare_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
MO.SSquare_move = function SSquare_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
MO.SSquare_inc = function SSquare_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
MO.SSquare_dec = function SSquare_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
MO.SSquare_dump = function SSquare_dump(d){
   d = MO.Lang.String.nvlStr(d);
   d.append(MO.Class.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
MO.SValue3 = function SValue3(x, y, z){
   var o = this;
   o.x            = MO.Runtime.nvl(x, 0);
   o.y            = MO.Runtime.nvl(y, 0);
   o.z            = MO.Runtime.nvl(z, 0);
   o.isEmpty      = MO.SValue3_isEmpty;
   o.equals       = MO.SValue3_equals;
   o.equalsData   = MO.SValue3_equalsData;
   o.assign       = MO.SValue3_assign;
   o.setMin       = MO.SValue3_setMin;
   o.setMax       = MO.SValue3_setMax;
   o.set          = MO.SValue3_set;
   o.setAll       = MO.SValue3_setAll;
   o.length       = MO.SValue3_absolute;
   o.absolute     = MO.SValue3_absolute;
   o.normalize    = MO.SValue3_normalize;
   o.negative     = MO.SValue3_negative;
   o.serialize    = MO.SValue3_serialize;
   o.unserialize  = MO.SValue3_unserialize3;
   o.unserialize2 = MO.SValue3_unserialize2;
   o.unserialize3 = MO.SValue3_unserialize3;
   o.parse        = MO.SValue3_parse;
   o.toString     = MO.SValue3_toString;
   return o;
}
MO.SValue3_isEmpty = function SValue3_isEmpty(p){
   return (this.x == 0) && (this.y == 0) && (this.z == 0);
}
MO.SValue3_equals = function SValue3_equals(value){
   return (this.x == value.x) && (this.y == value.y) && (this.z == value.z);
}
MO.SValue3_equalsData = function SValue3_equalsData(x, y, z){
   return (this.x == x) && (this.y == y) && (this.z == z);
}
MO.SValue3_assign = function SValue3_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
}
MO.SValue3_setMin = function SValue3_setMin(){
   this.x = Number.MIN_VALUE;
   this.y = Number.MIN_VALUE;
   this.z = Number.MIN_VALUE;
}
MO.SValue3_setMax = function SValue3_setMax(){
   this.x = Number.MAX_VALUE;
   this.y = Number.MAX_VALUE;
   this.z = Number.MAX_VALUE;
}
MO.SValue3_set = function SValue3_set(x, y, z){
   this.x = x;
   this.y = y;
   this.z = z;
}
MO.SValue3_setAll = function SValue3_set(value){
   this.x = value;
   this.y = value;
   this.z = value;
}
MO.SValue3_normalize = function SValue3_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
   }
   return this;
}
MO.SValue3_absolute = function SValue3_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}
MO.SValue3_negative = function SValue3_negative(value){
   var result = null;
   if(p){
      result = value;
   }else{
      result = new this.constructor();
   }
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   return result;
}
MO.SValue3_serialize = function SValue3_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
}
MO.SValue3_unserialize2 = function SValue3_unserialize2(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
}
MO.SValue3_unserialize3 = function SValue3_unserialize3(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
}
MO.SValue3_parse = function SValue3_parse(value){
   var items = value.split(',')
   if(items.length == 3){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}
MO.SValue3_toString = function SValue3_toString(){
   return this.x + ',' + this.y + ',' + this.z;
}
MO.SValue4 = function SValue4(x, y, z, w){
   var o = this;
   o.x           = MO.Runtime.nvl(x, 0);
   o.y           = MO.Runtime.nvl(y, 0);
   o.z           = MO.Runtime.nvl(z, 0);
   o.w           = MO.Runtime.nvl(w, 1);
   o.assign      = MO.SValue4_assign;
   o.set         = MO.SValue4_set;
   o.absolute    = MO.SValue4_absolute;
   o.normalize   = MO.SValue4_normalize;
   o.negative    = MO.SValue4_negative;
   o.serialize   = MO.SValue4_serialize;
   o.unserialize = MO.SValue4_unserialize;
   o.parse       = MO.SValue4_parse;
   o.toString    = MO.SValue4_toString;
   return o;
}
MO.SValue4_assign = function SValue4_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
   this.w = value.w;
}
MO.SValue4_set = function SValue4_set(x, y, z, w){
   this.x = x;
   this.y = y;
   this.z = z;
   this.w = w;
}
MO.SValue4_absolute = function SValue4_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
}
MO.SValue4_normalize = function SValue4_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
      this.w *= rate;
   }
}
MO.SValue4_negative = function SValue4_negative(value){
   var result = null;
   if(value){
      result = value;
   }else{
      result = new this.constructor();
   }
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   result.w = -this.w;
   return result;
}
MO.SValue4_serialize = function SValue4_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
   output.writeFloat(this.w);
}
MO.SValue4_unserialize = function SValue4_unserialize(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
   this.w = input.readFloat();
}
MO.SValue4_parse = function SValue4_parse(value){
   var items = value.split(',')
   if(items.length == 4){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
      this.w = parseFloat(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}
MO.SValue4_toString = function SValue4_toString(){
   return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
}
MO.SVector3 = function SVector3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   o.length    = o.absolute;
   o.direction = MO.SVector3_direction;
   o.conjugate = MO.SVector3_conjugate;
   o.dotPoint3 = MO.SVector3_dotPoint3;
   o.cross     = MO.SVector3_cross;
   o.cross2    = MO.SVector3_cross2;
   o.slerp     = MO.SVector3_slerp;
   o.clone     = MO.SVector3_clone;
   return o;
}
MO.SVector3_direction = function SVector3_direction(startPoint, endPoint){
   var o = this;
   o.x = endPoint.x - startPoint.x;
   o.y = endPoint.y - startPoint.y;
   o.z = endPoint.z - startPoint.z;
   return o;
}
MO.SVector3_conjugate = function SVector3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector3();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}
MO.SVector3_dotPoint3 = function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}
MO.SVector3_cross = function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}
MO.SVector3_cross2 = function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
MO.SVector3_slerp = function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
MO.SVector3_clone = function SVector3_clone(){
   var o = this;
   var r = new MO.SVector3();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   return r;
}
MO.SVector4 = function SVector4(x, y, z, w){
   var o = this;
   MO.SValue4.call(o, x, y, z, w);
   o.serialize3   = MO.SVector4_serialize3;
   o.unserialize3 = MO.SVector4_unserialize3;
   return o;
}
MO.SVector4_serialize3 = function SVector4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
MO.SVector4_unserialize3 = function SVector4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
MO.RMath = function RMath(){
   var o = this;
   o.value1         = new Array(1);
   o.value2         = new Array(2);
   o.value3         = new Array(3);
   o.value4         = new Array(4);
   o.value9         = new Array(9);
   o.value12        = new Array(12);
   o.value16        = new Array(16);
   o.vectorAxisX    = null;
   o.vectorAxisY    = null;
   o.vectorAxisZ    = null;
   o.vectorScale    = null;
   o.vectorForward  = null;
   o.vectorBackward = null;
   o.vector3        = null;
   o.rectangle      = null;
   o.matrix         = null;
   o.faceCenterPositions = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];
   return o;
}
MO.RMath.prototype.construct = function RMath_construct(){
   var o = this;
   o.vectorAxisX = new MO.SVector3(1, 0, 0);
   o.vectorAxisY = new MO.SVector3(0, 1, 0);
   o.vectorAxisZ = new MO.SVector3(0, 0, 1);
   o.vectorScale = new MO.SVector3(1, 1, 1);
   o.vectorForward = new MO.SVector3(0, 0, 1);
   o.vectorBackward = new MO.SVector3(0, 0, -1);
   o.vector3 = new MO.SVector3();
   o.rectangle = new MO.SRectangle();
   o.matrix = new MO.SMatrix3d();
}
MO.RMath.prototype.min = function RMath_min(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MAX_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value < result){
            result = value;
         }
      }
   }
   return result;
}
MO.RMath.prototype.max = function RMath_max(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MIN_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value > result){
            result = value;
         }
      }
   }
   return result;
}
MO.RMath.prototype.sign = function RMath_sign(value){
   if(value > 0){
      return 1;
   }else if(value < 0){
      return -1;
   }
   return 0;
}
MO.RMath = new MO.RMath();
MO.RMath.construct();
MO.Lang.Math = MO.RMath;
MO.RMatrix = function RMatrix(){
   var o = this;
   o.identity3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   o.identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   return o;
}
MO.RMatrix.prototype.perspectiveLH = function RMatrix_perspectiveLH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveRH = function RMatrix_perspectiveRH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveFieldOfViewLH = function RMatrix_perspectiveFieldOfViewLH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveFieldOfViewRH = function RMatrix_perspectiveFieldOfViewRH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (zfar - znear);
   data[15] = 0;
}
MO.RMatrix.prototype.orthoLH = function RMatrix_orthoLH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = znear / distance;
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = 1 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}
MO.RMatrix.prototype.orthoRH = function RMatrix_orthoRH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = (znear + zfar) / distance;
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = -2 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}
MO.Lang.Matrix = new MO.RMatrix();
MO.RRandom = function RRandom(){
   var o = this;
   o._seed = (new Date()).getTime();
   return o;
}
MO.RRandom.prototype.get = function RRandom_get(){
   var o = this;
   o._seed = (o._seed * 9301 + 49297) % 233280;
   return o._seed/(233280.0);
}
MO.RRandom.prototype.rand = function RRandom_rand(seed){
   var o = this;
   var value = o.get() * seed;
   return Math.ceil(value);
}
MO.RRandom = new MO.RRandom();
MO.Lang.Random = MO.RRandom;
