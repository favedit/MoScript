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
   o.setNvl        = MO.TMap_setNvl;
   o.assign        = MO.TMap_assign;
   o.append        = MO.TMap_append;
   o.insert        = MO.TMap_insert;
   o.remove        = MO.TMap_remove;
   o.removeName    = MO.TMap_removeName;
   o.removeValue   = MO.TMap_removeValue;
   o.rebuild       = MO.TMap_rebuild;
   o.invoke        = MO.TMap_invoke;
   o.clear         = MO.TMap_clear;
   o.toString      = MO.TMap_toString;
   o.dispose       = MO.TMap_dispose;
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
MO.TMap_setNvl = function TMap_setNvl(name, value){
   if(value){
      this.set(name, value);
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
MO.TMap_invoke = function TMap_invoke(methodName, parameter1, parameter2, parameter3, parameter4, parameter5){
   var o = this;
   var count = o._count;
   var values = o._values;
   for(var i = 0; i < count; i++){
      var value = values[i];
      var method = value[methodName];
      method.call(value, parameter1, parameter2, parameter3, parameter4, parameter5);
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
   o.invoke     = MO.TObjects_invoke;
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
   if(index == -1){
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
MO.RAssert.prototype.debug = function RAssert_debug(value){
   return value;
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
