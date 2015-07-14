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
   var info = o.info;
   var count = 0;
   for(var name in this){
      var value = this[name];
      if(value){
         if(value.constructor == Function){
            value.__name = name;
         }
      }
      count++;
   }
   info.count = count;
}
MO.release = function MO_release(){
   var o = this;
}
MO.ELogger = new function ELogger(){
   var o = this;
   o.Debug = 0;
   o.Info  = 1;
   o.Warn  = 2;
   o.Error = 3;
   o.Fatal = 4;
   return o;
}
MO.EPlatform = new function EPlatform(){
   var o = this;
   o.Pc     = 'pc';
   o.Mobile = 'mobile';
   return o;
}
MO.EProcess = new function EProcess(){
   var o = this;
   o.Release = 0;
   o.Process = 1;
   o.Debug   = 2;
   return o;
}
MO.EScope = new function EScope(){
   var o = this;
   o.Local   = 1;
   o.Session = 2;
   o.Global  = 3;
   return o;
}
MO.RSingleton = function RSingleton(){
   var o = this;
   o._singleton = true;
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
MO.RRuntime.prototype.isProcess = function RRuntime_isProcess(){
   return this._processCd == MO.EProcess.Process;
}
MO.RRuntime.prototype.isRelease = function RRuntime_isRelease(){
   return this._processCd == MO.EProcess.Release;
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
MO.TArray_contains = function TArray_contains(v){
   return this.indexOf(v) != -1;
}
MO.TArray_indexOf = function TArray_indexOf(v){
   var o = this;
   var c = o._length;
   for(var n = 0; n < c; n++){
      if(o._memory[n] == v){
         return n;
      }
   }
   return -1;
}
MO.TArray_get = function TArray_get(n){
   return ((n >= 0) && (n < this._length)) ? this._memory[n] : null;
}
MO.TArray_set = function TArray_set(index, value){
   if ((index >= 0) && (index < this._length)) {
      this._memory[index] = value;
   }
}
MO.TArray_push = function TArray_push(){
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      this._memory[this._length++] = arguments[i];
   }
}
MO.TArray_swap = function TArray_swap(l, r){
   if((l >= 0) && (l < this._length) && (r >= 0) && (r < this._length) && (l != r)){
      var v = this._memory[l];
      this._memory[l] = this._memory[r];
      this._memory[r] = v;
   }
}
MO.TArray_sort = function TArray_sort(){
   this._memory.sort();
}
MO.TArray_erase = function TArray_erase(i){
   var v = null;
   if((i >= 0) && (i < c)){
      var o = this;
      o._length--;
      v = o._memory[i];
      for(var n = i; n < c; n++){
         o._memory[n] = o._memory[n + 1];
      }
   }
   return v;
}
MO.TArray_remove = function TArray_remove(v){
   if(v != null){
      var o = this;
      var n = 0;
      var c = o._length;
      for(var i = n; i < c; i++){
         if(o._memory[i] != v){
            o._memory[n++] = o._memory[i];
         }
      }
      o._length = n;
   }
   return v;
}
MO.TArray_compress = function TArray_compress(){
   var o = this;
   var c = o._length;
   var l = 0;
   for(var n = 0; n < c; n++){
      var v = o._memory[n];
      if(v != null){
         o._memory[l++] = v;
      }
   }
   o._length = l;
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
   var r = new TString();
   var c = o._length;
   r.append(MO.Runtime.className(o), ':', c);
   if(c > 0){
      for(var i = 0; i < c; i++){
         r.append(' [', o._memory[i], ']');
      }
   }
   return r.flush();
}
MO.TAttributes = function TAttributes(){
   var o = this;
   MO.TDictionary.call(o);
   o.join   = MO.TAttributes_join;
   o.split  = MO.TAttributes_split;
   o.pack   = MO.TAttributes_pack;
   o.unpack = MO.TAttributes_unpack;
   o.dump   = MO.TAttributes_dump;
   return o;
}
MO.TAttributes_join = function TAttributes_join(name, value){
   var source = new MO.TString();
   if(!name){
      name = '=';
   }
   if(!value){
      value = ',';
   }
   var count = this._count;
   for(var i = 0; i < count; i++){
      if(i > 0){
         source.append(value);
      }
      source.append(this.names[i]);
      source.append(name);
      source.append(this.values[i]);
   }
   return source.flush();
}
MO.TAttributes_split = function TAttributes_split(source, name, value){
   var items = source.split(value);
   var count = items.length;
   for(var i = 0; i < count; i++){
      var item = items[i];
      if(item.length){
         var codes = item.split(name);
         if(codes.length == 2){
            this.set(MO.Lang.String.trim(codes[0]), MO.Lang.String.trim(codes[1]));
         }else{
            this.set(MO.Lang.String.trim(item), '');
         }
      }
   }
}
MO.TAttributes_pack = function TAttributes_pack(){
   var source = new MO.TString();
   var count = this._count;
   for(var i = 0; i < count; i++){
      var name = this.names[i];
      var value = this.values[i];
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
   this.count = 0;
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
      this.set(name, value);
   }
}
MO.TAttributes_dump = function TAttributes_dump(){
   var info = new MO.TString();
   var count = this._count;
   info.append(MO.Runtime.className(o), ' : ', count);
   if(count > 0){
      info.append(' (');
      for(var i = 0; i < count; i++){
         if(i > 0){
            info.append(', ');
         }
         info.append(this._names[i], '=', this._values[i]);
      }
      info.append(')');
   }
   return info.flush();
}
MO.TDictionary = function TDictionary(){
   var o = this;
   MO.TMap.call(o);
   o.dump = MO.TDictionary_dump;
   return o;
}
MO.TDictionary_dump = function TDictionary_dump(){
   var info = new MO.TString();
   var count = this._count;
   info.append(MO.Runtime.className(o), ': ', count);
   if(count > 0){
      info.append(' {\n');
      for(var i = 0; i < count; i++){
         info.append('   ', this._names[i], '=[', this._values[i], ']\n');
      }
      info.append('}');
   }
   return info.flush();
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
   return (this._count == 0);
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
      for(var i = count; i > index; i--){
         o._names[i] = o._names[i - 1];
         o._values[i] = o._values[i - 1];
      }
      o._names[index] = name;
      o._values[index] = value;
      o._count++;
      o.rebuild();
   }
}
MO.TMap_remove = function TMap_remove(index){
   var o = this;
   var value = null;
   var count = o._count;
   if((index >= 0) && (index < count)){
      value = o._values[index];
      for(var i = index; i < count; i++){
         o._names[i] = o._names[i + 1];
         o._values[i] = o._values[i + 1];
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
   for(var i = 0; i < count; i++){
      var find = o._values[i];
      if(find != value){
         if(index != i){
            o._names[index] = o._names[i];
            o._values[index] = find;
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
   for(var i = 0; i < count; i++){
      var code = o._names[i].toLowerCase();
      table[code] = i;
   }
}
MO.TMap_clear = function TMap_clear(){
   var o = this;
   o._count = 0;
   for(var name in o._table){
      delete o._table[name];
   }
}
MO.TMap_toString = function TMap_toString(){
   return this.dump().toString();
}
MO.TMap_disposeAll = function TMap_disposeAll(){
}
MO.TMap_dispose = function TMap_dispose(flag){
   var o = this;
   if(flag){
      var count = o._count;
      var values = o._values;
      for(var i = 0; i < count; i++){
         var value = values[i];
         values[i] = MO.Lang.Object.dispose(value);
      }
   }
   var table = o._table;
   if(table){
      for(var name in table){
         table[name] = null;
      }
      o._table = null;
   }
   var names = o._names;
   if(names){
      for(var i = names.length - 1; i >= 0; i--){
         names[i] = null;
      }
      o._names = null;
   }
   var values = o._values;
   if(values){
      for(var i = values.length - 1; i >= 0; i--){
         values[i] = null;
      }
      o._values = null;
   }
   o._count = 0;
}
MO.TMap_dump = function TMap_dump(){
   var o = this;
   var info = new MO.TString();
   var count = o._count;
   info.appendLine(MO.Runtime.className(o), ': ', count);
   if(count > 0){
      info.append(' {');
      for(var i = 0; i < count; i++){
         info.appendLine(o._names[i], '=[', o._values[i], ']');
      }
      info.append('}');
   }
   return info.flush();
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
   var count = this._count;
   var items = this._items;
   for(var i = 0; i < count; i++){
      if(items[i] == value){
         return i;
      }
   }
   return -1;
}
MO.TObjects_first = function TObjects_first(){
   return this._count ? this._items[0] : null;
}
MO.TObjects_last = function TObjects_last(){
   return this._count ? this._items[this._count - 1] : null;
}
MO.TObjects_getAt = function TObjects_getAt(index){
   return this._items[index];
}
MO.TObjects_get = function TObjects_get(index){
   return ((index >= 0) && (index < this._count)) ? this._items[index] : null;
}
MO.TObjects_setAt = function TObjects_setAt(index, value){
   this._items[index] = value;
}
MO.TObjects_set = function TObjects_set(index, value){
   if((index >= 0) && (index < this._count)){
      this._items[index] = value;
   }
}
MO.TObjects_assign = function TObjects_assign(values){
   var o = this;
   var count = o._count = values._count;
   for(var i = 0; i < count; i++){
      o._items[i] = values._items[i];
   }
}
MO.TObjects_append = function TObjects_append(values){
   var o = this;
   var count = values._count;
   for(var i = 0; i < count; i++){
      o.push(values.at(i));
   }
}
MO.TObjects_insert = function TObjects_insert(index, value){
   var o = this;
   var count = o._count;
   if((index >= 0) && (index <= count)){
      for(var i = count; i > index; i--){
         o._items[i] = o._items[i - 1];
      }
      o._items[index] = value;
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
   if(this._count){
      return this._items[--this._count];
   }
}
MO.TObjects_push = function TObjects_push(value){
   var index = this._count++;
   this._items[index] = value;
   return index;
}
MO.TObjects_pushUnique = function TObjects_pushUnique(value){
   for(var i = this._count - 1; i >= 0; i--){
      if(this._items[i] == value){
         return i;
      }
   }
   var index = this._count++;
   this._items[index] = value;
   return index;
}
MO.TObjects_swap = function TObjects_swap(left, right){
   if((left >= 0) && (left < this._count) && (right >= 0) && (right < this._count) && (left != right)){
      var items = this._items;
      var value = items[left];
      items[left] = items[right];
      items[right] = value;
   }
}
MO.TObjects_sort = function TObjects_sort(callback){
   var items = this._items;
   if(items.length != this._count){
      items.length = this._count;
   }
   items.sort(callback);
}
MO.TObjects_erase = function TObjects_erase(index){
   var o = this;
   var value = null;
   if((index >= 0) && (index < o._count)){
      value = o._items[index];
      var count = --o._count;
      var items = o._items;
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
   for(var name in o._items){
      o._items[name] = null;
   }
   o._count = 0;
   o._items = null;
}
MO.TObjects_dump = function TObjects_dump(){
   var count = this._count;
   var info = new MO.TString();
   info.append(MO.Runtime.className(o), ':', count);
   if(count){
      for(var i = 0; i < count; i++){
         info.append(' [', this._items[i], ']');
      }
   }
   return info.flush();
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
   this.clear();
   this.appendArray(arguments, 0, arguments.length);
}
MO.TString_append = function TString_append(v){
   this.appendArray(arguments, 0, arguments.length);
}
MO.TString_appendIf = function TString_appendIf(flag){
   if(flag){
      this.appendArray(arguments, 1, arguments.length - 1);
   }
}
MO.TString_appendArray = function TString_appendArray(values, offset, count){
   for(var i = 0; i < count; i++){
      var value = values[offset++];
      if(value != null){
         this._memory[this._count++] = value;
      }
   }
}
MO.TString_appendRepeat = function TString_appendRepeat(value, count){
   for(var i = 0; i < count; i++){
      this._memory[this._count++] = value;
   }
}
MO.TString_appendLine = function TString_appendLine(){
   this.appendArray(arguments, 0, arguments.length);
   this._memory[this._count++] = '\r\n';
}
MO.TString_push = function TString_push(){
   this.appendArray(arguments, 0, arguments.length);
}
MO.TString_clear = function TString_clear(){
   this._count = 0;
}
MO.TString_toString = function TString_toString(){
   var memory = this._memory;
   if(memory.length != this._count){
      memory = memory.slice(0, this._count);
   }
   return memory.join('');
}
MO.TString_flush = function TString_flush(){
   var result = this.toString();
   this.dispose();
   return result;
}
MO.TString_dispose = function TString_dispose(){
   this._count = 0;
   var memory = this._memory;
   if(memory){
      for(var i = memory.length - 1; i >= 0; i--){
         memory[i] = null;
      }
      this._memory = null;
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
   if(value != null){
      throw new Error('Assert empty failure.');
   }
}
MO.RAssert.prototype.debugNotEmpty = function RAssert_debugNotEmpty(value){
   if(value == null){
      throw new Error('Assert not empty failure.');
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
   var entry = null;
   var unused = this._entryUnused;
   if(unused){
      entry = unused;
      this._entryUnused = unused.next;
   }else{
      entry = new MO.SMemoryPoolEntry();
   }
   return entry;
}
MO.RMemory.prototype.entryFree = function RMemory_entryFree(entry){
   MO.Assert.debugNotNull(entry);
   entry.next = this._entryUnused;
   this._entryUnused = entry;
}
MO.RMemory.prototype.alloc = function RMemory_alloc(clazz){
   MO.Assert.debugNotNull(clazz);
   var className = MO.Runtime.className(clazz);
   var pools = this._pools;
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
   var value = null;
   var unused = this._unused;
   if(unused){
      value = unused.value;
      this._unused = unused.next;
      MO.Memory.entryFree(unused);
   }else{
      value = new this._constructor();
      value.__pool = this;
      this._createCount++;
   }
   this._allocCount++;
   return value;
}
MO.TMemoryPool_free = function TMemoryPool_free(value){
   MO.Assert.debugNotNull(value);
   var entry = MO.Memory.entryAlloc();
   entry.value = value;
   entry.next = this._unused;
   this._unused = entry;
   this._freeCount++;
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
   var info = new MO.TString();
   info.append('Pool:');
   info.append('create=', this._createCount);
   info.append(', alloc=', this._allocCount);
   info.append(', free=', this._freeCount);
   return info.flush();
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
MO.TLooper_innerRemove = function TLooper_innerRemove(entry){
   var prior = entry.prior;
   var next = entry.next;
   prior.next = next;
   next.prior = prior;
   this._count--;
   if(this._count > 0){
      this._current = next;
   }else{
      this._current = null;
   }
   MO.Memory.free(entry);
}
MO.TLooper_innerRemoveCurrent = function TLooper_innerRemoveCurrent(){
   var value = null;
   if(this._count > 0){
      var current = this._current;
      value = current.value;
      this.innerRemove(current);
   }
   return value;
}
MO.TLooper_innerRemoveValue = function TLooper_innerRemoveValue(value){
   if(this._count > 0){
      if(this._current.value == value){
         this.innerRemoveCurrent();
         return;
      }
      var current = this._current;
      var entry = current.next;
      while(entry != current){
         if(entry.value == value){
            this.innerRemove(entry);
            this._current = current;
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
   this._recordCount = this._count;
}
MO.TLooper_unrecord = function TLooper_unrecord(v){
   this._recordCount = -1;
}
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
MO.TLooper_current = function TLooper_current(){
   var entry = this._current;
   return entry ? entry.value : null;
}
MO.TLooper_next = function TLooper_next(){
   if(this._current){
      this._current = this._current.next;
   }
   var c = this._recordCount;
   if(c > 0){
      this._recordCount--;
   }else if(c == 0){
      return null;
   }
   return this._current ? this._current.value : null;
}
MO.TLooper_push = function TLooper_push(value){
   var entry = MO.Memory.alloc(MO.SLooperEntry);
   entry.value = value;
   this.innerPush(entry);
}
MO.TLooper_pushUnique = function TLooper_pushUnique(value){
   if(!this.contains(value)){
      this.push(value);
   }
}
MO.TLooper_removeCurrent = function TLooper_removeCurrent(){
   return this.innerRemoveCurrent();
}
MO.TLooper_remove = function TLooper_remove(p){
   this.innerRemoveValue(p);
}
MO.TLooper_clear = function TLooper_clear(){
   var entry = this._current;
   if(entry){
      entry.prior.next = null;
      while(entry){
         var next = entry.next;
         MO.Memory.free(next);
         entry = next;
      }
   }
   this._count = 0;
   this._current = null;
}
MO.TLooper_dispose = function TLooper_dispose(){
   this.clear();
}
MO.TLooper_dump = function TLooper_dump(){
   var count = this._count;
   var info = new MO.TString();
   info.append(MO.Class.name(this), ': ', count);
   if(count > 0){
      var entry = this._current;
      for(var i = 0; i < count; i++){
         info.append(' [', entry.value, ']');
         entry = entry.next;
      }
   }
   return info.flush();
}
MO.RGlobal = function RGlobal(){
   var o = MO.RSingleton.call(this);
   o._instances = new MO.TDictionary();
   return o;
}
MO.RGlobal.prototype.get = function RGlobal_get(name){
   return this._instances.get(name);
}
MO.RGlobal.prototype.set = function RGlobal_set(name, value){
   this._instances.set(name, value);
}
MO.RGlobal.prototype.globalGet = function RGlobal_globalGet(name){
   var value = null;
   if(top.MO.Global){
      value = top.MO.Global.get(name);
   }else{
      value = this._instances.get(name);
   }
   return value;
}
MO.RGlobal.prototype.globalSet = function RGlobal_globalSet(name, value){
   if(top.MO.Global){
      top.MO.Global.set(name, value);
   }else{
      this._instances.set(name, value);
   }
}
MO.Global = new MO.RGlobal();
