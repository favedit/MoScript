var RMO = function RMO(){
   var o = this;
   o.version = '0.2.0';
   return o;
}
RMO.prototype.initialize = function RMO_initialize(){
}
RMO.prototype.release = function RMO_release(){
}
MO = new RMO();
MO.ELogger = new function ELogger(){
   var o = this;
   o.Debug = 0;
   o.Info  = 1;
   o.Warn  = 2;
   o.Error = 3;
   o.Fatal = 4;
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
   o._processCd = MO.EProcess.Release;
   return o;
}
MO.RRuntime.prototype.isDebug = function RRuntime_isDebug(){
   return (this._processCd == MO.EProcess.Debug);
}
MO.RRuntime.prototype.isProcess = function RRuntime_isProcess(){
   return (this._processCd == MO.EProcess.Process);
}
MO.RRuntime.prototype.isRelease = function RRuntime_isRelease(){
   return (this._processCd == MO.EProcess.Release);
}
MO.RRuntime.prototype.setProcessCd = function RRuntime_setProcessCd(processCd){
   this._processCd = processCd;
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
with(MO){
   MO.TArray = function TArray(){
      var o = this;
      o._length  = 0;
      o._memory  = new Array();
      o.isEmpty  = TArray_isEmpty;
      o.length   = TArray_length;
      o.memory   = TArray_memory;
      o.contains = TArray_contains;
      o.indexOf  = TArray_indexOf;
      o.get      = TArray_get;
      o.set      = TArray_set;
      o.push     = TArray_push;
      o.swap     = TArray_swap;
      o.sort     = TArray_sort;
      o.erase    = TArray_erase;
      o.remove   = TArray_remove;
      o.compress = TArray_compress;
      o.clear    = TArray_clear;
      o.dispose  = TArray_dispose;
      o.dump     = TArray_dump;
      return o;
   }
   MO.TArray_isEmpty = function TArray_isEmpty(){
      return this._length == 0;
   }
   MO.TArray_length = function TArray_length(){
      return this._length;
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
   MO.TArray_set = function TArray_set(n, v){
      if((n >= 0) && (n < this._length)){
         this._memory[n] = v;
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
}
with(MO){
   MO.TAttributes = function TAttributes(){
      var o = this;
      TDictionary.call(o);
      o.join   = TAttributes_join;
      o.split  = TAttributes_split;
      o.pack   = TAttributes_pack;
      o.unpack = TAttributes_unpack;
      o.dump   = TAttributes_dump;
      return o;
   }
   MO.TAttributes_join = function TAttributes_join(name, value){
      var source = new TString();
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
               this.set(RString.trim(codes[0]), RString.trim(codes[1]));
            }else{
               this.set(RString.trim(item), '');
            }
         }
      }
   }
   MO.TAttributes_pack = function TAttributes_pack(){
      var source = new TString();
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
      var info = new TString();
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
}
with(MO){
   MO.TDictionary = function TDictionary(){
      var o = this;
      TMap.call(o);
      o.dump = TDictionary_dump;
      return o;
   }
   MO.TDictionary_dump = function TDictionary_dump(){
      var info = new TString();
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
}
with(MO){
   MO.TMap = function TMap(){
      var o = this;
      o._count        = 0;
      o._table        = new Object();
      o._names        = new Array();
      o._values       = new Array();
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
      var count = this._count;
      for(var i = 0; i < count; i++){
         if(this._values[n] == value){
            return n;
         }
      }
      return -1;
   }
   MO.TMap_first = function TMap_first(){
      if(this._count > 0){
         return this._values[0];
      }
      return null;
   }
   MO.TMap_last = function TMap_last(){
      if(this._count > 0){
         return this._values[this._count - 1];
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
      return ((index >= 0) && (index < this._count)) ? this._values[index] : null;
   }
   MO.TMap_setValueAt = function TMap_setValueAt(index, value){
      this._values[index] = value;
   }
   MO.TMap_setValue = function TMap_setValue(index, value){
      if((index >= 0) && (index < this._count)){
         this._values[index] = value;
      }
   }
   MO.TMap_get = function TMap_get(name, defaultValue){
      if(name != null){
         var i = this._table[name.toString().toLowerCase()];
         if(i != null){
            return this._values[i];
         }
      }
      return defaultValue;
   }
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
   MO.TMap_assign = function TMap_assign(map){
      this.clear();
      this.append(map);
   }
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
   MO.TMap_removeName = function TMap_removeName(name){
      var index = this.indexOf(name);
      if(index != -1){
         return this.remove(index);
      }
      return null;
   }
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
   MO.TMap_rebuild = function TMap_rebuild(){
      var table = this._table;
      for(var name in table){
         delete table[name];
      }
      var count = this._count;
      for(var i = 0; i < count; i++){
         var code = this._names[i].toLowerCase();
         table[code] = i;
      }
   }
   MO.TMap_clear = function TMap_clear(){
      this._count = 0;
      for(var name in this._table){
         delete this._table[name];
      }
   }
   MO.TMap_toString = function TMap_toString(){
      return this.dump().toString();
   }
   MO.TMap_disposeAll = function TMap_disposeAll(){
   }
   MO.TMap_dispose = function TMap_dispose(flag){
      if(flag){
         var count = this._count;
         var values = this._values;
         for(var i = 0; i < count; i++){
            var value = values[i];
            values[i] = RObject.dispose(value);
         }
      }
      var table = this._table;
      if(table){
         for(var name in table){
            table[name] = null;
         }
         this._table = null;
      }
      var names = this._names;
      if(names){
         for(var i = names.length - 1; i >= 0; i--){
            names[i] = null;
         }
         this._names = null;
      }
      var values = this._values;
      if(values){
         for(var i = values.length - 1; i >= 0; i--){
            values[i] = null;
         }
         this._values = null;
      }
      this._count = 0;
   }
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
with(MO){
   MO.TObjects = function TObjects(){
      var o = this;
      o._count     = 0;
      o._items     = new Array();
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
      o.dispose    = TObjects_dispose;
      o.dump       = TObjects_dump;
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
      var count = this._count = values._count;
      for(var i = 0; i < count; i++){
         this._items[i] = values._items[i];
      }
   }
   MO.TObjects_append = function TObjects_append(values){
      var count = values._count;
      for(var i = 0; i < count; i++){
         this.push(values.at(i));
      }
   }
   MO.TObjects_insert = function TObjects_insert(index, value){
      var count = this._count;
      if((index >= 0) && (index <= count)){
         for(var i = count; i > index; i--){
            this._items[i] = this._items[i - 1];
         }
         this._items[index] = value;
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
   MO.TObjects_remove = function TObjects_remove(value){
      var count = this._count;
      if(count){
         var index = 0;
         var items = this._items;
         for(var i = index; i < count; i++){
            if(items[i] != value){
               items[index++] = items[i];
            }
         }
         for(var i = index; i < count; i++){
            items[i] = null;
         }
         this._count = index;
      }
      return value;
   }
   MO.TObjects_clear = function TObjects_clear(){
      this._count = 0;
   }
   MO.TObjects_dispose = function TObjects_dispose(){
      for(var name in this._items){
         this._items[name] = null;
      }
      this._count = 0;
      this._items = null;
   }
   MO.TObjects_dump = function TObjects_dump(){
      var count = this._count;
      var info = new TString();
      info.append(MO.Runtime.className(o), ':', count);
      if(count){
         for(var i = 0; i < count; i++){
            info.append(' [', this._items[i], ']');
         }
      }
      return info.flush();
   }
}
with(MO){
   MO.TString = function TString(){
      var o = this;
      o._count       = 0;
      o._memory      = new Array();
      o.isEmpty      = TString_isEmpty;
      o.assign       = TString_assign;
      o.append       = TString_append;
      o.appendIf     = TString_appendIf;
      o.appendArray  = TString_appendArray;
      o.appendLine   = TString_appendLine;
      o.appendRepeat = TString_appendRepeat;
      o.push         = TString_push;
      o.clear        = TString_clear;
      o.toString     = TString_toString;
      o.flush        = TString_flush;
      o.dispose      = TString_dispose;
      o.dump         = TString_dump;
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
   if(value.dispose){
      value.dispose();
   }
}
MO.RMemory.prototype.refresh = function RMemory_refresh(){
   CollectGarbage();
}
MO.Memory = new MO.RMemory();
with(MO){
   MO.SMemoryPoolEntry = function SMemoryPoolEntry(){
      var o = this;
      o.next    = null;
      o.value   = null;
      o.dispose = SMemoryPoolEntry_dispose;
      return o;
   }
   MO.SMemoryPoolEntry_dispose = function SMemoryPoolEntry_dispose(){
      var value = this.value;
      if(value){
         value.__pool = null;
         value.dispose();
      }
      this.next = null;
      this.value = null;
   }
}
with(MO){
   MO.TMemoryPool = function TMemoryPool(){
      var o = this;
      o._constructor = null;
      o._unused      = null;
      o._createCount = 0;
      o._allocCount  = 0;
      o._freeCount   = 0;
      o.alloc        = TMemoryPool_alloc;
      o.free         = TMemoryPool_free;
      o.dispose      = TMemoryPool_dispose;
      o.dump         = TMemoryPool_dump
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
      var info = new TString();
      info.append('Pool:');
      info.append('create=', this._createCount);
      info.append(', alloc=', this._allocCount);
      info.append(', free=', this._freeCount);
      return info.flush();
   }
}
with(MO){
   MO.SLooperEntry = function SLooperEntry(){
      var o = this;
      o.prior   = null;
      o.next    = null;
      o.value   = null;
      o.dispose = SLooperEntry_dispose;
      return o;
   }
   MO.SLooperEntry_dispose = function SLooperEntry_dispose(){
      this.prior = null;
      this.next = null;
      this.value = null;
   }
}
with(MO){
   MO.TLooper = function TLooper(){
      var o = this;
      o._count             = 0;
      o._recordCount       = 0;
      o._current           = null;
      o.innerPush          = TLooper_innerPush;
      o.innerRemove        = TLooper_innerRemove;
      o.innerRemoveCurrent = TLooper_innerRemoveCurrent;
      o.innerRemoveValue   = TLooper_innerRemoveValue;
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
      var entry = MO.Memory.alloc(SLooperEntry);
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
with(MO){
   MO.AAnnotation = function AAnnotation(name){
      var o = this;
      o._annotationCd = null;
      o._inherit      = false;
      o._duplicate    = false;
      o._name         = name;
      o.annotationCd  = AAnnotation_annotationCd;
      o.name          = AAnnotation_name;
      o.code          = AAnnotation_code;
      o.value         = AAnnotation_value;
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
}
with(MO){
   MO.AEnum = function AEnum(name, linker){
      var o = this;
      o.inherit    = true;
      o.annotation = EAnnotation.Enum;
      o.name       = name;
      o.linker     = linker;
      return o;
   }
}
with(MO){
   MO.AGetSet = function AGetSet(name, linker){
      var o = this;
      ASource.call(o, name, ESource.GetSet, linker);
      o.build = AGetSet_build;
      return o;
   }
   MO.AGetSet_build = function AGetSet_build(clazz, instance){
      var o = this;
      var getName = o._code;
      instance[getName] = RMethod.makePropertyGet(o._name, getName);
      var setName = 'set' + o._linker;
      instance[setName] = RMethod.makePropertySet(o._name, setName);
   }
}
with(MO){
   MO.AGetter = function AGetter(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Get, linker);
      o.build = AGetter_build;
      return o;
   }
   MO.AGetter_build = function AGetter_build(clazz, instance){
      var o = this;
      var getName = o._code;
      instance[getName] = RMethod.makePropertyGet(o._name, getName);
   }
}
with(MO){
   MO.ALinker = function ALinker(name, linker){
      var o = this;
      o.inherit    = true;
      o.annotation = EAnnotation.Linker;
      o.name       = name;
      o.linker     = linker;
      return o;
   }
}
with(MO){
   MO.AProperty = function AProperty(name, linker){
      var o = this;
      AAnnotation.call(o, name);
      o._inherit      = true;
      o._annotationCd = EAnnotation.Property;
      o._linker       = null;
      o._force        = false;
      o.code          = AProperty_code;
      o.build         = AProperty_build;
      o.load          = AProperty_load;
      o.save          = AProperty_save;
      o.toString      = AProperty_toString;
      var code = null;
      if(linker == null){
         if(RString.startsWith(name, '_')){
            code = name.substring(1);
         }else{
            code = name;
         }
         code = RString.toUnderline(code);
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
}
with(MO){
   MO.ASetter = function ASetter(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Set, linker);
      o.build = ASetter_build;
      return o;
   }
   MO.ASetter_build = function ASetter_build(clazz, instance){
      var o = this;
      var setName = 'set' + o._linker;
      instance[setName] = RMethod.makePropertySet(o._name, setName);
   }
}
with(MO){
   MO.ASource = function ASource(name, typeCd, linker){
      var o = this;
      AAnnotation.call(o, name);
      o._inherit      = false;
      o._annotationCd = EAnnotation.Source;
      o._typeCd       = typeCd;
      o._code         = null;
      o._linker       = null;
      o.build         = ASource_build;
      o.toString      = ASource_toString;
      var name = o._name;
      if(RString.startsWith(name, '_')){
         name = name.substring(1);
      }
      o._code = name;
      if(linker == null){
         o._linker = RString.firstUpper(name);
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
   return o;
}
with(MO){
   MO.MInstance = function MInstance(o){
      o = RClass.inherits(this, o);
      o.__free          = false;
      o.instanceCreate  = RMethod.empty;
      o.instanceAlloc   = RMethod.empty;
      o.instanceFree    = RMethod.empty;
      o.instanceRelease = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.MInvoke = function MInvoke(o){
      o = RClass.inherits(this, o);
      o.invoke = RMethod.virtual(o, 'invoke');
      return o;
   }
}
with(MO){
   MO.MPoolAble = function MPoolAble(o){
      o = RClass.inherits(this, o);
      o._poolCode   = null;
      o.poolCode    = MPoolAble_poolCode;
      o.setPoolCode = MPoolAble_setPoolCode;
      return o;
   }
   MO.MPoolAble_poolCode = function MPoolAble_poolCode(){
      return this._code;
   }
   MO.MPoolAble_setPoolCode = function MPoolAble_setPoolCode(poolCode){
      this._poolCode = poolCode;
   }
}
with(MO){
   MO.SArguments = function SArguments(){
      var o = this;
      o.owner = null;
      return o;
   }
}
with(MO){
   MO.SEnumItem = function SEnumItem(){
      var o = this;
      o.name  = null;
      o.value = 0;
      return o;
   }
}
with(MO){
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
      o.register       = TClass_register;
      o.assign         = TClass_assign;
      o.annotations    = TClass_annotations;
      o.annotation     = TClass_annotation;
      o.annotationFind = TClass_annotationFind;
      o.attributeFind  = TClass_attributeFind;
      o.style          = TClass_style;
      o.build          = TClass_build;
      o.newInstance    = TClass_newInstance;
      o.free           = TClass_free;
      o.alloc          = TClass_alloc;
      return o;
   }
   MO.TClass_register = function TClass_register(p){
      var o = this;
      var a = p.annotationCd();
      var n = p.name();
      var c = p.code();
      if(!a || !c){
         throw new TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", RClass.dump(o), a, n, c);
      }
      var as = o._annotations[a];
      if(!as){
         as = o._annotations[a] = new Object();
      }
      if(!p._duplicate){
         if(as[c]){
            throw new TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", RClass.dump(o), a, n, c, p.toString());
         }
      }
      as[c] = p;
      o._attributes[n] = p;
   }
   MO.TClass_assign = function TClass_assign(c){
      var o = this;
      for(var an in c._annotations){
         var ls = o._annotations[an];
         if(!ls){
            ls = o._annotations[an] = new Object();
         }
         var as = c._annotations[an];
         for(var n in as){
            var a = as[n];
            if(!a._duplicate){
               if(ls[n]){
                  throw new TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, c.name, n, a.toString());
               }
            }
            if(a._inherit){
               ls[n] = a;
            }
         }
      }
      for(var n in c._attributes){
         var a = c._attributes[n];
         if(a.construct != Function){
            o._attributes[n] = c._attributes[n];
         }
      }
   }
   MO.TClass_annotations = function TClass_annotations(a){
      var o = this;
      var r = o._annotations[a];
      if(!r){
         RLogger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
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
         RLogger.fatal(o, null, "Can't find annotation. (annotation={1}, name={2}, class={3})", a, n, o.name);
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
         var as = p._annotations[EAnnotation.Style];
         if(as){
            a = as[n];
            if(a){
               break;
            }
         }
         p = p.parent;
      }
      if(!a){
         RLogger.fatal(o, null, "No register style annotation. (name={1}, linker={2}, class={3})", o.name + '_' + n, o.liner, o.name);
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
      var properties = o._annotations[EAnnotation.Property];
      if(properties){
         for(var name in properties){
            var property = properties[name];
            property.build(instance);
         }
      }
      var sources = o._annotations[EAnnotation.Source];
      if(sources){
         for(var name in sources){
            var source = sources[name];
            source.build(o, instance);
         }
      }
   }
   MO.TClass_newInstance = function TClass_newInstance(){
      var o = this;
      var r = o.alloc();
      if(!r){
         if(o._abstract){
            var s = new TString();
            for(var n in o.instance){
               var v = o.instance[n];
               if(RMethod.isVirtual(v)){
                  if(!s.isEmpty()){
                     s.append(',');
                  }
                  s.append(v._name);
               }
            }
            return RLogger.fatal(o, null, "Abstract Class can't be create.(name={1})\n[{2}]", o.name, s);
         }
         var ro = o.instance;
         if(!ro){
            return RLogger.fatal(o, null, "Class instance is empty. (name={1})", o.name);
         }
         r = new ro.constructor();
         for(var n in ro){
            var v = ro[n];
            if(v != null){
               if((n == '__base') || (n == '__inherits')){
                  r[n] = ro[n];
                  continue;
               }
               if(!RClass.isBase(v)){
                  v = RObject.clone(v);
               }
            }
            r[n] = v;
         }
         r.__class = o;
         if(r.construct){
            r.construct();
         }
      }
      return r;
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
}
with(MO){
   MO.TClassBase = function TClassBase(){
      var o = this;
      o.__disposed = true;
      return o;
   }
}
with(MO){
   MO.TContext = function TContext(n, c, t){
      var o = this;
      o.name = n;
      o.code = c;
      o.text = t;
      return o;
   }
}
with(MO){
   MO.TDataset = function TDataset(){
      var o = this;
      o._code      = null;
      o._pageSize  = 20;
      o._pageIndex = 0;
      o._pageCount = 0;
      o._total     = 0;
      o._rows      = new TObjects();
      o.isEmpty    = TDataset_isEmpty;
      o.createRow  = TDataset_createRow;
      o.count      = TDataset_count;
      o.row        = TDataset_row;
      o.rows       = TDataset_rows;
      o.find       = TDataset_find;
      o.push       = TDataset_push;
      o.loadConfig = TDataset_loadConfig;
      o.clear      = TDataset_clear;
      return o;
   }
   MO.TDataset_isEmpty = function TDataset_isEmpty(){
      var o = this;
      return o._rows.isEmpty();
   }
   MO.TDataset_createRow = function TDataset_createRow(){
      var o = this;
      var r = new TRow();
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
         throw new TError(o, 'Parameters must is pairs (length={1})', l);
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
      o._pageSize = RInteger.parse(x.get('page_size', 1000));
      o._pageIndex = RInteger.parse(x.get('page', 0));
      o._pageCount = RInteger.parse(x.get('page_count', 1));
      o._total = RInteger.parse(x.get('total'));
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
      var ss = new TStrings();
      for(var n = 0; n < rs._count; n++){
         ss.push(rs.get(n).pack());
      }
      return ss.pack();
   }
   MO.TDataset_dump = function TDataset_dump(){
      var o = this;
      var r = new TString();
      r.append(RClass._code(o));
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
}
with(MO){
   MO.TDatasetViewer = function TDatasetViewer(){
      var o = this;
      o._datasetId = null;
      o._position  = 0;
      o._start     = 0;
      o._count     = 0;
      e._values   = null;
      o._rows      = null;
      o._ouids     = null;
      o.isEmpty   = TDatasetViewer_isEmpty;
      o.count     = TDatasetViewer_count;
      o.current   = TDatasetViewer_current;
      o.reset     = TDatasetViewer_reset;
      o.move      = TDatasetViewer_move;
      o.moveToRow = TDatasetViewer_moveToRow;
      o.first     = TDatasetViewer_first;
      o.prior     = TDatasetViewer_prior;
      o.next      = TDatasetViewer_next;
      o.last      = TDatasetViewer_last;
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
}
with(MO){
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
      o.equals       = TDate_equals;
      o.isBefore     = TDate_isBefore;
      o.isAfter      = TDate_isAfter;
      o.monthDays    = TDate_monthDays;
      o.monthWeekDay = TDate_monthWeekDay;
      o.weekDay      = TDate_weekDay;
      o.setYear      = TDate_setYear;
      o.setMonth     = TDate_setMonth;
      o.setDay       = TDate_setDay;
      o.setHour      = TDate_setHour;
      o.setMinute    = TDate_setMinute;
      o.setSecond    = TDate_setSecond;
      o.addYear      = TDate_addYear;
      o.addMonth     = TDate_addMonth;
      o.addDay       = TDate_addDay;
      o.addMseconds  = TDate_addMseconds;
      o.refresh      = TDate_refresh;
      o.setDate      = TDate_setDate;
      o.now          = TDate_now;
      o.clone        = TDate_clone;
      o.dump         = TDate_dump;
      o.refresh();
      return o;
   }
   MO.TDate_clone = function TDate_clone(){
      var d = new Date();
      d.setTime(this.date.getTime());
      return new TDate(d);
   }
   MO.TDate_equals = function TDate_equals(d){
      return this.date.getTime() == d.date.getTime();
   }
   MO.TDate_isBefore = function TDate_isBefore(d){
      return this.date.getTime() < d.date.getTime();
   }
   MO.TDate_isAfter = function TDate_isAfter(d){
      return this.date.getTime() > d.date.getTime();
   }
   MO.TDate_monthDays = function TDate_monthDays(){
      return RDate.monthDays(this.year, this.month);
   }
   MO.TDate_monthWeekDay = function TDate_monthWeekDay(){
      return (8-(this.day-this.weekDay())%7)%7;
   }
   MO.TDate_weekDay = function TDate_weekDay(){
      return this.date.getDay();
   }
   MO.TDate_setYear = function TDate_setYear(n){
      this.date.setFullYear(n);
      this.refresh();
   }
   MO.TDate_setMonth = function TDate_setMonth(n){
      this.date.setMonth(parseInt(n, 10)-1);
      this.refresh();
   }
   MO.TDate_setDay = function TDate_setDay(n){
      this.date.setDate(n);
      this.refresh();
   }
   MO.TDate_setHour = function TDate_setHour(n){
      this.date.setHours(n);
      this.refresh();
   }
   MO.TDate_setMinute = function TDate_setMinute(n){
      this.date.setMinutes(n);
      this.refresh();
   }
   MO.TDate_setSecond = function TDate_setSecond(n){
      this.date.setSeconds(n);
      this.refresh();
   }
   MO.TDate_addYear = function TDate_addYear(n){
      this.date.setFullYear(this.date.getFullYear()+parseInt(n));
      this.refresh();
   }
   MO.TDate_addMonth = function TDate_addMonth(n){
      this.date.setMonth(this.date.getMonth()+parseInt(n));
      this.refresh();
   }
   MO.TDate_addDay = function TDate_addDay(n){
      this.date.setTime(this.date.getTime()+parseInt(n)*1000*60*60*24);
      this.refresh();
   }
   MO.TDate_addMseconds = function TDate_addMseconds(n){
      this.date.setTime(this.date.getTime()+parseInt(n));
      this.refresh();
   }
   MO.TDate_refresh = function TDate_refresh(){
      var o = this;
      var d = o.date;
      if(d){
         o.year = d.getFullYear();
         o.month = d.getMonth() + 1;
         o.day = d.getDate();
         o.hour = d.getHours();
         o.minute = d.getMinutes();
         o.second = d.getSeconds();
         o.ms = d.getMilliseconds();
      }
   }
   MO.TDate_setDate = function TDate_setDate(d){
      var o = this;
      o.date = d;
      o.refresh();
   }
   MO.TDate_now = function TDate_now(){
      var o = this;
      o.date = new Date();
      o.refresh();
   }
   MO.TDate_dump = function TDate_dump(){
      return RClass.dump(this) + ' ' + RDate.formatDate(this);
   }
}
with(MO){
   MO.TError = function TError(po, pm, pp){
      var o = this;
      var r = new TString();
      var f = TError.caller;
      var s = new TString();
      var t = new Array();
      while(f){
         if(RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var a = arguments;
      var c = a.length;
      for(var n = 2; n < c; n++){
         var v = a[n];
         var vs = null;
         if(typeof(v) == 'function'){
            vs = RMethod.name(v);
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
}
with(MO){
   MO.TFatalError = function TFatalError(po, pe, pm, pp){
      var o = this;
      var r = new TString();
      var f = TFatalError.caller;
      var s = new TString();
      var t = new Array();
      while(f){
         if(RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var a = arguments;
      var c = a.length;
      for(var n = 2; n < c; n++){
         var v = a[n];
         var vs = null;
         if(typeof(v) == 'function'){
            vs = RMethod.name(v);
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
}
with(MO){
   MO.TInstancePool = function TInstancePool(){
      var o = this;
      TObjects.call(o);
      o._instance = null;
      o.instance  = TInstancePool_instance;
      o.alloc     = TInstancePool_alloc;
      o.free      = TInstancePool_free;
      return o;
   }
   MO.TInstancePool_instance = function TInstancePool_instance(p){
      var o = this;
      var r = o._instance;
      if(r == null){
         r = o._instance = RClass.create(p);
         r.instanceCreate();
      }
      r.instanceAlloc();
      return r;
   }
   MO.TInstancePool_alloc = function TInstancePool_alloc(p){
      var o = this;
      var r = null;
      if(o._count == 0){
         r = RClass.create(p);
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
}
with(MO){
   MO.TInvoke = function TInvoke(){
      var o = this;
      o.owner    = null;
      o.callback = null;
      o.invoke   = TInvoke_invoke;
      return o;
   }
   MO.TInvoke_invoke = function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
      var o = this;
      if(o.callback){
         var c = o.owner ? o.owner : o;
         try{
            o.callback.call(c, p1, p2, p3, p4, p5, p6);
         }catch(e){
            RLogger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
         }
      }
   }
}
with(MO){
   MO.TListener = function TListener(){
      var o = this;
      o._owner    = null;
      o._callback = null;
      o.process   = TListener_process;
      o.toString  = TListener_toString;
      o.dispose   = TListener_dispose;
      return o;
   }
   MO.TListener_process = function TListener_process(s, p1, p2, p3, p4, p5){
      var o = this;
      var c = o._callback;
      var w = o._owner ? o._owner : o;
      o._callback.call(w, s, p1, p2, p3, p4, p5);
   }
   MO.TListener_toString = function TListener_toString(){
      var o = this;
      return RClass.name(o) + '(owner=' + RClass.name(o._owner) + ', callback=' + RMethod.name(o._callback) + ')';
   }
   MO.TListener_dispose = function TListener_dispose(){
      var o = this;
      o._owner = null;
      o._callback = null;
      RObject.free(o);
   }
}
with(MO){
   MO.TListeners = function TListeners(){
      var o = this;
      o._listeners = null;
      o.isEmpty    = TListeners_isEmpty;
      o.find       = TListeners_find;
      o.register   = TListeners_register;
      o.unregister = TListeners_unregister;
      o.push       = TListeners_push;
      o.remove     = TListeners_remove;
      o.process    = TListeners_process;
      o.clear      = TListeners_clear;
      o.dispose    = TListeners_dispose;
      o.dump       = TListeners_dump;
      return o;
   }
   MO.TListeners_isEmpty = function TListeners_isEmpty(){
      var s = this._listeners;
      return s ? s.isEmpty() : true;
   }
   MO.TListeners_find = function TListeners_find(w, p){
      var s = this._listeners;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var l = s.getAt(i);
            if(l._owner == w){
               if(l._callback == p){
                  return l;
               }
            }
         }
      }
      return null;
   }
   MO.TListeners_register = function TListeners_register(w, p){
      var o = this;
      var l = o.find(w, p);
      if(l){
         throw new TError(o, 'Listener is already register. (owner={1}, process={2})', w, p);
      }
      l = new TListener();
      l._owner = w;
      l._callback = p;
      o.push(l);
      return l;
   }
   MO.TListeners_unregister = function TListeners_unregister(w, p){
      var o = this;
      var l = o.find(w, p);
      if(!l){
         throw new TError(o, 'Listener is not register. (owner={1}, process={2})', w, p);
      }
      o.remove(l);
      l.dispose();
   }
   MO.TListeners_push = function TListeners_push(l){
      var o = this;
      if(!l){
         throw new TError(o, 'Listener is null.');
      }
      if(!l._callback){
         throw new TError(o, 'Listener process is null.');
      }
      var s = o._listeners;
      if(!s){
         s = o._listeners = new TObjects();
      }
      s.push(l);
   }
   MO.TListeners_remove = function TListeners_remove(l){
      var o = this;
      if(!l){
         throw new TError(o, 'Listener is null.');
      }
      o._listeners.remove(l);
   }
   MO.TListeners_process = function TListeners_process(ps, p1, p2, p3, p4, p5){
      var s = this._listeners;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).process(ps, p1, p2, p3, p4, p5);
         }
      }
   }
   MO.TListeners_clear = function TListeners_clear(){
      var s = this._listeners;
      if(s){
         s.clear();
      }
   }
   MO.TListeners_dispose = function TListeners_dispose(){
      var o = this;
      var s = o._listeners;
      if(s){
         for(var i = s.count() - 1; i >= 0; i--){
            s.getAt(i).dispose();
         }
         o._listeners = RObject.dispose(s);
      }
      RObject.free(o);
   }
   MO.TListeners_dump = function TListeners_dump(){
      var o = this;
      var r = new TString();
      r.append(RClass.name(o));
      var s = o._listeners;
      var c = s.count();
      for(var i = 0; i < c; i++){
         r.append('\n   ' + s.getAt(i));
      }
      return r.flush();
   }
}
with(MO){
   MO.TLoaderListener = function TLoaderListener(){
      var o = this;
      o.invoke = null;
      o.ids    = new TArray();
      o.check  = TLoaderListener_check;
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
}
with(MO){
   MO.TLocker = function TLocker(){
      var o = this;
      o._lock = false;
      o.enter = TLocker_enter;
      o.leave = TLocker_leave;
      return o;
   }
   MO.TLocker_enter = function TLocker_enter(){
      this._lock = true;
   }
   MO.TLocker_leave = function TLocker_leave(){
      this._lock = false;
   }
}
with(MO){
   MO.TMessage = function TMessage(){
      var o = this;
      o.typeCd      = EMessage.None;
      o.attrType    = null;
      o.message     = null;
      o.description = null;
      o.redirect    = null;
      o.loadConfig = TMessage_loadConfig;
      o.saveConfig = TMessage_saveConfig;
      o.icon       = TMessage_icon;
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
}
with(MO){
   MO.TMessages = function TMessages(){
      var o = this;
      o._items     = new TObjects();
      o.hasMessage = TMessages_hasMessage;
      o.message    = TMessages_message;
      o.messages   = TMessages_messages;
      o.type       = TMessages_type;
      o.push       = TMessages_push;
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
}
with(MO){
   MO.TNode = function TNode(name){
      var o = this;
      o._name        = RString.nvl(name, 'Node');
      o._value       = null;
      o._attributes  = null;
      o._nodes       = null;
      o.isName       = TNode_isName;
      o.name         = TNode_name;
      o.setName      = TNode_setName;
      o.value        = TNode_value;
      o.setValue     = TNode_setValue;
      o.contains     = TNode_contains;
      o.hasAttribute = TNode_hasAttribute;
      o.attributes   = TNode_attributes;
      o.hasNode      = TNode_hasNode;
      o.nodeCount    = TNode_nodeCount;
      o.node         = TNode_node;
      o.nodes        = TNode_nodes;
      o.get          = TNode_get;
      o.getInteger   = TNode_getInteger;
      o.set          = TNode_set;
      o.setNvl       = TNode_setNvl;
      o.setBoolean   = TNode_setBoolean;
      o.setFloat     = TNode_setFloat;
      o.find         = TNode_find;
      o.findNode     = TNode_findNode;
      o.searchNode   = TNode_searchNode;
      o.push         = TNode_push;
      o.toString     = TNode_toString;
      o.innerDump    = TNode_innerDump;
      o.dump         = TNode_dump;
      return o;
   }
   MO.TNode_isName = function TNode_isName(n){
      return RString.equals(this._name, n);
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
         r = o._attributes = new TAttributes();
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
         nodes = o._nodes = new TObjects();
      }
      return nodes;
   }
   MO.TNode_get = function TNode_get(n, v){
      return this._attributes ? this._attributes.get(n, v) : null;
   }
   MO.TNode_getInteger = function TNode_getInteger(n, v){
      return RInteger.parse(this.get(n, v));
   }
   MO.TNode_set = function TNode_set(n, v){
      if(v != null){
         this.attributes().set(n, v);
      }
   }
   MO.TNode_setNvl = function TNode_setNvl(name, value){
      if(!RString.isEmpty(value)){
         this.attributes().set(name, value);
      }
   }
   MO.TNode_setBoolean = function TNode_setBoolean(n, v){
      if(v != null){
         this.attributes().set(n, RBoolean.format(v));
      }
   }
   MO.TNode_setFloat = function TNode_setFloat(n, v){
      if(v != null){
         this.attributes().set(n, RFloat.format(v));
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
            throw new TError('Attributes is not pair. (length={1})', ac);
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
         if(!RString.isEmpty(value)){
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
      return this.innerDump(RString.nvlString(d), this, space);
   }
}
with(MO){
   MO.TRow = function TRow(){
      var o = this;
      TAttributes.call(o);
      o._dataset   = null;
      o._index     = null;
      o._uniqueId  = null;
      o._statusCd  = null;
      o.loadConfig = TRow_loadConfig;
      o.saveConfig = TRow_saveConfig;
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
         a = new TAttributes();
      }
      a.set(RDataset.ROW_STATUS, o._statusCd);
      a.append(o);
      return a;
   }
   MO.TRow_dump = function TRow_dump(s){
      var o = this;
      var c = o.count;
      s = RString.nvlStr(s);
      s.append(RClass.name(o), ' [', o._statusCd, ': ');
      for(var n=0; n<c; n++){
         if(n > 0){
            s.append(',');
         }
         s.append(o.names[n], '=', o.values[n]);
      }
      s.append(']');
      return s;
   }
}
with(MO){
   MO.TSpeed = function TSpeed(){
      var o = this;
      o.arguments  = arguments;
      o._start     = 0;
      o._end       = 0;
      o._span      = 0;
      o._spanMin   = Number.MAX_VALUE;
      o._spanMax   = 0;
      o.start      = new Date().getTime();
      o.callerName = RMethod.name(TSpeed.caller);
      o.reset      = TSpeed_reset;
      o.begin      = TSpeed_begin;
      o.end        = TSpeed_end;
      o.record     = TSpeed_record;
      o.toString   = TSpeed_toString;
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
      RLogger.debug(o, 'Speed test. (caller={1}, speed={2}, arguments={3})', o.callerName, sp, o.arguments);
      o.arguments = null;
      o.start = null;
      o.callerName = null;
      o.record = null;
   }
   MO.TSpeed_toString = function TSpeed_toString(){
      var o = this;
      return o._span + ' (' + o._spanMin + ' - ' + o._spanMax + ')';
   }
}
with(MO){
   MO.TUnsupportError = function TUnsupportError(po, pp){
      var o = this;
      var pm = 'Unsupport method. (name={1})'
      var r = new TString();
      var f = TUnsupportError.caller;
      var s = new TString();
      var t = new Array();
      while(f){
         if(RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var a = arguments;
      var c = a.length;
      for(var n = 1; n < c; n++){
         var v = a[n];
         var vs = null;
         if(typeof(v) == 'function'){
            vs = RMethod.name(v);
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
}
with(MO){
   MO.FConsole = function FConsole(o){
      o = RClass.inherits(this, o, FObject);
      o._scopeCd = EScope.Global;
      o.scopeCd  = FConsole_scopeCd;
      return o;
   }
   MO.FConsole_scopeCd = function FConsole_scopeCd(){
      return this._scopeCd;
   }
}
with(MO){
   MO.FObject = function FObject(o){
      if(!o){o = this;}
      o.__class   = null;
      o.__hash    = 0;
      o.__dispose = false;
      o.construct = FObject_construct;
      o.hashCode  = FObject_hashCode;
      o.toString  = FObject_toString;
      o.dispose   = FObject_dispose;
      o.innerDump = FObject_innerDump;
      o.dump      = FObject_dump;
      return o;
   }
   MO.FObject_construct = function FObject_construct(){
      var o = this;
      o.__dispose = false;
   }
   MO.FObject_hashCode = function FObject_hashCode(){
      var o = this;
      var v = o.__hash;
      if(!v){
         v = o.__hash = RObject.nextId();
      }
      return v;
   }
   MO.FObject_toString = function FObject_toString(){
      return RClass.dump(this);
   }
   MO.FObject_dispose = function FObject_dispose(){
      var o = this;
      RObject.free(o);
      o.__dispose = true;
   }
   MO.FObject_innerDump = function FObject_innerDump(dump, level){
      dump.append(RClass.dump(this));
   }
   MO.FObject_dump = function FObject_dump(){
      var r = new TString();
      this.innerDump(r, 0);
      return r.flush();
   }
}
with(MO){
   MO.FObjectPool = function FObjectPool(o){
      o = RClass.inherits(this, o, FObject);
      o._items      = null;
      o._frees      = null;
      o._allocCount = 0;
      o._freeCount  = 0;
      o.construct   = FObjectPool_construct;
      o.hasFree     = FObjectPool_hasFree;
      o.alloc       = FObjectPool_alloc;
      o.free        = FObjectPool_free;
      o.push        = FObjectPool_push;
      o.dispose     = FObjectPool_dispose;
      o.innerDump   = FObjectPool_innerDump;
      return o;
   }
   MO.FObjectPool_construct = function FObjectPool_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._items = new TObjects();
      o._frees = new TObjects();
   }
   MO.FObjectPool_hasFree = function FObjectPool_hasFree(){
      return !this._frees.isEmpty();
   }
   MO.FObjectPool_alloc = function FObjectPool_alloc(){
      var o = this;
      var r = null;
      if(!o._frees.isEmpty()){
         r = o._frees.pop();
      }
      o._allocCount++;
      return r;
   }
   MO.FObjectPool_free = function FObjectPool_free(p){
      var o = this;
      o._frees.push(p);
      o._freeCount++;
   }
   MO.FObjectPool_push = function FObjectPool_push(p){
      var o = this;
      o._items.push(p);
      o._frees.push(p);
   }
   MO.FObjectPool_dispose = function FObjectPool_dispose(){
      var o = this;
      o._items = RObject.dispose(o._items);
      o._frees = RObject.dispose(o._frees);
      o.__base.FObject.dispose.call(o);
   }
   MO.FObjectPool_innerDump = function FObjectPool_innerDump(s, l){
      var o = this;
      s.append('Pool:');
      s.append('total=', o._items.count());
      s.append(', free=', o._frees.count());
      s.append(', alloc_count=', o._allocCount);
      s.append(', free_count=', o._freeCount);
   }
}
with(MO){
   MO.FObjectPools = function FObjectPools(o){
      o = RClass.inherits(this, o, FObject);
      o._pools    = null;
      o.construct = FObjectPools_construct;
      o.pool      = FObjectPools_pool;
      o.alloc     = FObjectPools_alloc;
      o.free      = FObjectPools_free;
      o.dispose   = FObjectPools_dispose;
      return o;
   }
   MO.FObjectPools_construct = function FObjectPools_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._pools = new TDictionary();
   }
   MO.FObjectPools_pool = function FObjectPools_pool(code){
      var o = this;
      var pool = o._pools.get(code);
      if(!pool){
         pool = RClass.create(FObjectPool);
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
         var pool = pools.valueAt(i);
         pool.dispose();
      }
      pools.dispose();
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FTimer = function FTimer(o){
      o = RClass.inherits(this, o, FObject);
      o._count      = 0;
      o._startTime  = 0;
      o._beginTime  = 0;
      o._endTime    = 0;
      o._stopTime   = 0;
      o._span       = 0;
      o._spanSecond = 0;
      o.setup       = FTimer_setup;
      o.current     = FTimer_current;
      o.span        = FTimer_span;
      o.spanSecond  = FTimer_spanSecond;
      o.rate        = FTimer_rate;
      o.update      = FTimer_update;
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
   MO.FTimer_span = function FTimer_span(){
      return this._span;
   }
   MO.FTimer_spanSecond = function FTimer_spanSecond(){
      return this._spanSecond;
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
}
with(MO){
   MO.RArray = function RArray(){
      var o = this;
      o.array1  = new Array(1);
      o.array2  = new Array(2);
      o.array3  = new Array(3);
      o.array4  = new Array(4);
      o.array9  = new Array(9);
      o.array12 = new Array(12);
      o.array16 = new Array(16);
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
   MO.RArray.prototype.count = function RArray_count(a){
      var c = 0;
      for(var n in a){
         n++;
      }
      return c;
   }
   MO.RArray.prototype.contains = function RArray_contains(a, v){
      var c = a.length;
      for(var n = 0; n < c; n++){
         if(a[n] == v){
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
   MO.RArray.prototype.copy = function RArray_copy(s, t){
      for(var n in s){
         t[n] = s[n];
      }
   }
   MO.RArray.prototype.move = function RArray_move(a, f, c, t){
      if(f > t){
         for(var n = 0; n < c; n++){
            a[t - n] = a[f + n];
         }
      }else if(f < t){
         for(var n = 0; n < c; n++){
            a[t + c - n - 1] = a[f + c - n - 1];
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
   MO.RArray = new RArray();
}
with(MO){
   MO.RBoolean = function RBoolean(){
      return this;
   }
   MO.RBoolean.prototype.format = function RBoolean_format(v){
      return v ? EBoolean.True : EBoolean.False;
   }
   MO.RBoolean.prototype.parse = function RBoolean_parse(v){
      if(v != null){
         if(v.constructor == Boolean){
            return v;
         }else if(v.constructor == String){
            return (v == EBoolean.True);
         }else if(v.constructor == Number){
            return v > 0;
         }else{
            throw new TError(this, 'Unknown type.');
         }
      }
      return false;
   }
   MO.RBoolean.prototype.toString = function RBoolean_toString(value, valueTrue, valueFalse){
      if(valueTrue == null){
         valueTrue = EBoolean.True;
      }
      if(valueFalse == null){
         valueFalse = EBoolean.False;
      }
      return value ? valueTrue : valueFalse;
   }
   MO.RBoolean = new RBoolean();
}
with(MO){
   MO.RByte = function RByte(){
      return this;
   }
   MO.RByte.prototype.copy = function RByte_copy(po, poi, pi, pii, pc){
      for(var i = 0; i < pc; i++){
         po[poi++] = pi[pii++];
      }
   }
   MO.RByte = new RByte();
}
with(MO){
   MO.RChar = function RChar(){
      return this;
   }
   MO.RChar.prototype.parse = function RChar_parse(n){
      return String.fromCharCode(n);
   }
   MO.RChar.prototype.toString = function RChar_toString(v){
      return v;
   }
   MO.RChar = new RChar();
}
with(MO){
   MO.RClass = function RClass(){
      var o = this;
      o._codes   = new Array();
      o._classes = new Object();
      return o;
   }
   MO.RClass.prototype.isBase = function RClass_isBase(value){
      if(value != null){
         var typeName = typeof(value);
         return RClass.isBaseName(typeName);
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
         return RString.mid(o.constructor.toString(), 'function ', '(');
      }
      return 'Null';
   }
   MO.RClass.prototype.safeTypeOf = function RClass_safeTypeOf(v, safe){
      if(v == null){
         return 'Null';
      }
      try{
         var c = v.constructor;
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
            return RString.mid(c.toString(), 'function ', '(');
         }
         if(c.constructor == Function){
            return RString.mid(c.toString(), 'function ', '(');
         }
         if(v.__class){
            return v.__class.name;
         }
         if(v.tagName){
            return 'Html';
         }
         for(var n in v){
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
   MO.RClass.prototype.name = function RClass_name(v){
      if(v){
         if(v.__name){
            return v.__name;
         }
         if(v.__class){
            return v.__class.name;
         }
         if(typeof(v) == 'function'){
            return RMethod.name(v);
         }
         var c = v.constructor;
         if(c){
            return RString.mid(c.toString(), 'function ', '(');
         }
      }
      return null;
   }
   MO.RClass.prototype.inherits = function RClass_inherits(s, p){
      var r = MO.Runtime.nvl(p, s);
      r.__inherits = new Array();
      var a = arguments;
      var c = a.length;
      for(var i = 2; i < c; i++){
         r.__inherits.push(RMethod.name(a[i]));
      }
      return r;
   }
   MO.RClass.prototype.forName = function RClass_forName(n){
      var r = null;
      if(n != null){
         var o = this;
         r = o._classes[n];
         if(!r){
            r = o.createClass(n);
            o.build(r);
         }
      }
      return r;
   }
   MO.RClass.prototype.find = function RClass_find(v){
      var o = this;
      var n = null;
      if(v != null){
         if(v.__class){
            n = v.__class.name;
         }else if(v.constructor == Function){
            n = RMethod.name(v);
         }else if(v.constructor != String){
            RLogger.fatal(o, null, 'Find class failure. (value={1})', v);
         }
      }
      return o._classes[n];
   }
   MO.RClass.prototype.register = function RClass_register(v, a, r){
      var n = RMethod.name(v.constructor);
      this._classes[n].register(a);
      var v = a.value();
      return (v != null) ? v : r;
   }
   MO.RClass.prototype.createBase = function RClass_createBase(n){
      if(n){
         var s = 'function ' + n + '(){return this;} new ' + n + '();';
         return eval(s);
      }
      return null;
   }
   MO.RClass.prototype.createClass = function RClass_createClass(className){
      var o = this;
      var clazz = o._classes[className] = new TClass();
      clazz.name = className;
      clazz.base = o.createBase(className);
      clazz.clazz = new clazz.base.constructor();
      eval(className)(clazz.clazz);
      return clazz;
   }
   MO.RClass.prototype.create = function RClass_create(n){
      var o = this;
      var t = typeof(n);
      if(t == 'function'){
         n = RMethod.name(n);
      }else if(t != 'string'){
         RLogger.fatal(o, null, 'Param is invlid (name={1})', n);
      }
      return o.createByName(n);
   }
   MO.RClass.prototype.createByName = function RClass_createByName(n){
      var o = this;
      var c = o.forName(n);
      if(!c){
         RLogger.fatal(o, null, 'Cant find class. (name={1})', c);
      }
      return c.newInstance();
   }
   MO.RClass.prototype.innerCopy = function RClass_innerCopy(s, t){
      if((s != null) && (t != null)){
         for(var n in s){
            var v = s[n];
            if(v != null){
               var p = typeof(v)
               if(p == 'function'){
                  var f = t[n];
                  if(f == null){
                     t[n] = v;
                  }else if(RMethod.isVirtual(f)){
                     t[n] = v;
                  }else if(!RMethod.isVirtual(v) && RMethod.isEmpty(f)){
                     t[n] = v;
                  }else if(!RMethod.isVirtual(v) && !RMethod.isEmpty(v)){
                     t[n] = v;
                  }
                  continue;
               }else if(!RClass.isBaseName(p)){
                  if(t[n] == null){
                     t[n] = new v.constructor();
                  }
                  this.innerCopy(v, t[n]);
                  continue;
               }
            }
            t[n] = v;
         }
      }
   }
   MO.RClass.prototype.build = function RClass_build(clazz){
      var o = this;
      var sbs = clazz.clazz.__inherits;
      if(sbs && (sbs.constructor == Array)){
         var finded = false;
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            if(RString.startsWith(name, 'F')){
               if(finded){
                  RLogger.fatal(o, null, 'Parent class is too many. (name={1})', name);
               }
               clazz.parent = RClass.forName(name);
               finded = true;
            }
         }
      }
      var instance = clazz.instance = new clazz.base.constructor();
      if(sbs && (sbs.constructor == Array)){
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            if(!RString.startsWith(name, 'F')){
               var m = RClass.forName(name);
               if(m == null){
                  RLogger.fatal(o, null, 'Parent class is not exists. (name={1})', name);
               }
               RClass.innerCopy(m.instance, instance);
               clazz.assign(m);
            }
         }
      }
      if(clazz.parent){
         o.innerCopy(clazz.parent.instance, instance);
         clazz.assign(clazz.parent);
      }
      if(!instance.__base){
         instance.__base = new TClassBase();
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
      if(sbs && (sbs.constructor == Array)){
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            var bcls = RClass.forName(name);
            var base = instance.__base[name] = new bcls.base.constructor();
            var cf = bcls.instance;
            for(var name in cf){
               if(name != '__base'){
                  var cfn = cf[name];
                  var ofn = instance[name];
                  if((cfn != null) && (ofn != null) && (cfn != ofn)){
                     if((cfn.constructor == Function) && (ofn.constructor == Function)){
                        base[name] = cf[name];
                     }
                  }
               }
            }
         }
      }
      clazz.build();
      if(MO.Runtime.isRelease()){
         for(var name in clazz.instance){
            var value = clazz.instance[name];
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
            return t + '<' + RMethod.name(v) + '>@' + o.code(v);
         case 'Html':
            return t + '<' + v.tagName + '>@' + o.code(v);
         default:
            if(v.__name){
               return t + '<' + v.__name + '>@' + o.code(v);
            }
      }
      return t + '@' + o.code(v);
   }
   MO.RClass = new RClass();
   MO.Class = MO.RClass;
}
with(MO){
   MO.RConsole = function RConsole(){
      var o = this;
      o.ConsolePreFix = 'console:';
      o._registers     = new TObjects();
      o._consoles      = new TDictionary();
      o._localConsoles = new TDictionary();
      return o;
   }
   MO.RConsole.prototype.initialize = function RConsole_initialize(){
      var o = this;
      var rs = o._registers;
      var c = rs.count;
      for(var n = 0; n < rs; n++){
         var r = rs.get(n);
         if(r.force){
            o.find(r.clazz);
         }
      }
   }
   MO.RConsole.prototype.register = function RConsole_register(p){
      this._registers.push(p);
   }
   MO.RConsole.prototype.create = function RConsole_create(n){
      var r = null;
      if(n){
         r = RClass.create(n);
         var o = this;
         for(var rn in r){
            if(RString.startsWith(rn, 'lnk')){
               var v = r[rn];
               if('string' == typeof(v) && RString.startsWith(v, '&')){
                  var c = o.find(v.substr(1));
                  if(!c){
                     return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
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
         r = RClass.createByName(n);
         var o = this;
         for(var rn in r){
            if(RString.startsWith(rn, 'lnk')){
               var v = r[rn];
               if('string' == typeof(v) && RString.startsWith(v, '&')){
                  var c = o.find(v.substr(1));
                  if(!c){
                     return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
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
      var n = RClass.name(v);
      var r = o._consoles.get(n);
      return r;
   }
   MO.RConsole.prototype.find = function RConsole_find(v){
      var o = this;
      var n = null;
      if(v.constructor = String){
         n = RClass.name(v);
      }else if(v.constructor == Function){
         n = v;
      }else{
         return RLogger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
      }
      var r = MO.Global.get(o.ConsolePreFix + n);
      if(r){
         return r;
      }
      r = o._consoles.get(n);
      if(r){
         return r;
      }
      var c = RClass.forName(n);
      var s = c.instance.scopeCd();
      switch(s){
         case EScope.Global:
            r = top.MO.RConsole.createByName(n);
            MO.Global.set(o.ConsolePreFix + n, r);
            o._consoles.set(n, r);
            break;
         case EScope.Local:
            r = o.createByName(n);
            o._localConsoles.set(n, r);
            o._consoles.set(n, r);
            break;
         default:
            return RLogger.fatal(o, 'Unknown scope code. (name={1})', n);
      }
      RLogger.info(o, 'Create console. (name={1}, scope={2})', n, REnum.decode(EScope, s));
      return r;
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
   MO.RConsole = new RConsole();
}
with(MO){
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
   MO.RConst = new RConst();
}
with(MO){
   MO.RDate = function RDate(){
      var o = this;
      o.MinYear       = 1800;
      o.MaxYear       = 2400;
      o.Pattern       = 'n-: /';
      o.Chars         = '0123456789-:/';
      o.DisplayFormat = 'yyyy-mm-dd hh24:mi:ss';
      o.DataFormat    = 'yyyymmddhh24miss';
      o.MonthDays     = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
      o.DaySeconds    = 1000// 60// 60// 24;
      o.Parts         = new Array('YYYY','MM','DD','HH24','MI','SS');
      o.PartsDefine   = {'YYYY':['Year',4],'MM':['Month',2],'DD':['Day',2],'HH24':['Hour',2],'MI':['Minute',2],'SS':['Second',2]};
      return o;
   }
   MO.RDate.prototype.nvl = function RDate_nvl(o){
      return o ? o : new TDate();
   }
   MO.RDate.prototype.make = function RDate_make(yyyy, mm, dd, hh, mi, ss){
      return new TDate(new Date(yyyy, mm, dd));
   }
   MO.RDate.prototype.format = function RDate_format(fmt){
      return this.formatDate(new TDate(), fmt);
   }
   MO.RDate.prototype.formatText = function RDate_formatText(v, f){
      if(!v){
         return false;
      }
      f = f.toLowerCase();
      f = f.replace(/yyyy/g, v.substring(0, 4));
      v = v.substring(4);
      f = f.replace(/mm/g, v.substring(0, 2));
      v = v.substring(2);
      f = f.replace(/dd/g, v.substring(0, 2));
      v = v.substring(2);
      f = f.replace(/hh24/g, v.substring(0, 4));
      v = v.substring(4);
      f = f.replace(/mi/g, v.substring(0, 2));
      v = v.substring(2);
      f = f.replace(/ss/g, v.substring(0, 2));
      v = v.substring(2);
      return f;
   }
   MO.RDate.prototype.formatDate = function RDate_formatDate(date, fmt){
      if(!date){return '';}
      fmt = fmt ? fmt.toLowerCase() : this.DataFormat;
      fmt = fmt.replace(/yyyy/g, RInteger.format(date.year, 4));
      fmt = fmt.replace(/yy/g, RInteger.format(date.year%100, 2));
      fmt = fmt.replace(/mm/g, RInteger.format(date.month, 2));
      fmt = fmt.replace(/dd/g, RInteger.format(date.day, 2));
      fmt = fmt.replace(/hh24/g, RInteger.format(date.hour, 2));
      fmt = fmt.replace(/mi/g, RInteger.format(date.minute, 2));
      fmt = fmt.replace(/ss/g, RInteger.format(date.second, 2));
      fmt = fmt.replace(/ms/g, RInteger.format(date.ms, 3));
      return fmt;
   }
   MO.RDate.prototype.monthDays = function RDate_monthDays(year, month){
      if(!year || !month){return 0;}
      year = parseInt(year);
      month = parseInt(month);
      this.MonthDays[2] = (((year%4 == 0) || (year%400 == 0)) && (year%100 != 0)) ? 29 : 28 ;
      return this.MonthDays[month];
   }
   MO.RDate.prototype.splitFormat = function RDate_splitFormat(v, f){
      if(!v){
         return false;
      }
      f = f.toLowerCase();
      var a = new Array();
      while(f.length > 0){
         if(f.indexOf('yyyy') == 0){
            a['year'] = v.substring(0, 4);
            f = f.substring(4);
            v = v.substring(4);
         }else if(f.indexOf('mm') == 0){
            a['month'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('dd') == 0){
            a['day'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('hh24') == 0){
            a['hour'] = v.substring(0, 2);
            f = f.substring(4);
            v = v.substring(2);
         }else if(f.indexOf('mi') == 0){
            a['minute'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('ss') == 0){
            a['second'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(2);
         }else if(f.indexOf('ms') == 0){
            a['ms'] = v.substring(0, 2);
            f = f.substring(2);
            v = v.substring(3);
         }else{
            f = f.substring(1);
            v = v.substring(1);
         }
      }
      return a;
   }
   MO.RDate.prototype.checkItems = function RDate_checkItems(items){
      if(!items){
         return false;
      }
      var year = RInteger.parse(items["year"]);
      if(year < this.MinYear || year > this.MaxYear){
         return false;
      }
      var month = RInteger.parse(items["month"]);
      if(month < 1 || month > 12){
         return false;
      }
      var day = RInteger.parse(items["day"]);
      if(day < 1 || day > this.monthDays(year, month)){
         return false;
      }
      var hour = RInteger.parse(items["hour"]);
      if(hour < 0 || hour > 23){
         return false;
      }
      var second = RInteger.parse(items["second"]);
      if(second < 0 || second > 59){
         return false;
      }
      var ms = RInteger.parse(items["ms"]);
      if(ms < 0 || ms > 99){
         return false;
      }
      return true;
   }
   MO.RDate.prototype.check = function RDate_check(value, format){
      return this.checkItems(this.splitFormat(value, format));
   }
   MO.RDate.prototype.makeDate = function RDate_makeDate(date, da){
      var d = new Date(RInteger.parse(da.year), RInteger.parse(da.month)-1, RInteger.parse(da.day), RInteger.parse(da.hour), RInteger.parse(da.minute), RInteger.parse(da.second), RInteger.parse(da.ms));
      if(date){
         date.setDate(d);
         return date;
      }
      return new TDate(d);
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
   MO.RDate.prototype.splitDate = function RDate_splitDate(da, value){
      if(!value){ return; }
      var arDate = null;
      if(value.indexOf('-') != -1 || value.indexOf('/') != -1){
         if(value.indexOf('-') != -1){
            arDate = value.split('-');
         }else if(value.indexOf('/') != -1){
            arDate = value.split('/');
         }
         if(arDate.length >= 1){
            da.year = RInteger.parse(arDate[0]);
         }
         if(arDate.length >= 2){
            da.month = RInteger.parse(arDate[1]);
         }
         if(arDate.length >= 3){
            da.day = RInteger.parse(arDate[2]);
         }
      }else if(value.indexOf(':') != -1){
         this.splitTime(da, value);
      }else if(value.length == 14){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
         da.day = RInteger.parse(value.substr(6, 2));
         da.hour = RInteger.parse(value.substr(8, 2));
         da.minute = RInteger.parse(value.substr(10, 2));
         da.second = RInteger.parse(value.substr(12, 2));
      }else if(value.length == 8){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
         da.day = RInteger.parse(value.substr(6, 2));
      }else if(value.length == 6){
         da.year = RInteger.parse(value.substr(0, 4));
         da.month = RInteger.parse(value.substr(4, 2));
      }else if(value.length == 4){
         da.year = RInteger.parse(value);
      }
   }
   MO.RDate.prototype.splitTime = function RDate_splitTime(da, value){
      if(!value){ return; }
      if(value.indexOf(':') != -1){
         var ar = value.split(':');
         if(ar.length >= 1){
            da.hour = RInteger.parse(ar[0]);
         }
         if(ar.length >= 2){
            da.minute = RInteger.parse(ar[1]);
         }
         if(ar.length >= 3){
            da.second = RInteger.parse(ar[2]);
         }
      }else if(value.length == 6){
         da.hour = RInteger.parse(value.substr(0, 2));
         da.minute = RInteger.parse(value.substr(2, 2));
         da.second = RInteger.parse(value.substr(4, 2));
      }else if(value.length == 4){
         da.hour = RInteger.parse(value.substr(0, 2));
         da.minute = RInteger.parse(value.substr(2, 2));
      }else if(value.length == 2){
         da.hour = RInteger.parse(value.substr(0, 2));
      }
   }
   MO.RDate.prototype.autoParse = function RDate_autoParse(d, v){
      if(!v){
         return null;
      }
      var o = this;
      d = o.nvl(d);
      var items = new Array();
      items['year'] = 2000;
      items['month'] = 1;
      items['day'] = 1;
      items['hour'] = 0;
      items['minute'] = 0;
      items['second'] = 0;
      v = RString.trim(v);
      if(v.indexOf(' ') == -1){
         o.splitDate(items, v);
      }else{
         var ar = v.split(' ');
         if(ar.length == 2){
            o.splitDate(items, ar[0]);
            o.splitTime(items, ar[1]);
         }
      }
      return o.checkItems(items) ? o.makeDate(d, items) : null ;
   }
   MO.RDate.prototype.getFormat = function RDate_getFormat(value){
      var o = this;
      var da = new Object();
      var f = '';
      var v = '';
      if(!value){ return; }
      if(value.indexOf(':') != -1){
         var as = RString.split(value, ' ');
         if(as.length == 1){
            var as1 = RString.split(as[0], ':');
            if(as1.length == 1){
               f += 'HH24';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else{
                  v += as1[0];
               }
            }else if(as1.length == 2){
               f += 'HH24MI';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
            }else if(as1.length == 3){
               f += 'HH24MISS';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
               if(as1[2].length == 1){
                  v += ('0'+as1[2]);
               }else if(as1[2].length == 2){
                  v += as1[2];
               }
            }
         }else if(as.length == 2){
            var as0 = RString.split(as[0], '-');
            if(as0.length == 3){
               f += 'YYYYMMDD';
               if(as0[0].length == 4){
                  v += as0[0];
               }
               if(as0[1].length == 1){
                  v += ('0'+as0[1]);
               }else if(as0[1].length == 2){
                  v += as0[1];
               }
               if(as0[2].length == 1){
                  v += ('0'+as0[2]);
               }else if(as0[2].length == 2){
                  v += as0[2];
               }
            }else if(as0.length == 2){
               f += 'YYYYMM';
               if(as0[0].length == 1){
                  v += as0[0];
               }
               if(as0[1].length == 1){
                  v += ('0'+as0[1]);
               }else if(as0[1].length == 2){
                  v += as0[1];
               }
            }else if(as0.length == 1){
               f += 'YYYY';
               if(as0[0].length == 4){
                  v += as0[0];
               }
            }
            var as1 = RString.split(as[1], ':');
            if(as1.length == 1){
               f += 'HH24';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else{
                  v += as1[0];
               }
            }else if(as1.length == 2){
               f += 'HH24MI';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
            }else if(as1.length == 3){
               f += ' HH24MISS';
               if(as1[0].length == 1){
                  v += ('0'+as1[0]);
               }else if(as1[0].length == 2){
                  v += as1[0];
               }
               if(as1[1].length == 1){
                  v += ('0'+as1[1]);
               }else if(as1[1].length == 2){
                  v += as1[1];
               }
               if(as1[2].length == 1){
                  v += ('0'+as1[2]);
               }else if(as1[2].length == 2){
                  v += as1[2];
               }
            }
         }
      }else{
         var as = RString.split(value, '-');
         if(as.length == 3){
            f += 'YYYYMMDD';
            if(as[0].length == 4){
               v += as[0];
            }
            if(as[1].length == 1){
               v += ('0'+as[1]);
            }else if(as[1].length == 2){
               v += as[1];
            }
            if(as[2].length == 1){
               v += ('0'+as[2]);
            }else if(as[2].length == 2){
               v += as[2];
            }
         }else if(as.length == 2){
            f = 'YYYYMM';
            if(as[0].length == 4){
               v += as[0];
            }
            if(as[1].length == 1){
               v += ('0'+as[1]);
            }else if(as[1].length == 2){
               v += as[1];
            }
         }else if(as.length == 1){
            f += 'YYYY';
            if(as[0].length == 4){
               v += as[0];
            }
         }
      }
      var ar = new Array(2);
      ar[0] = f;
      ar[1] = v;
      return ar;
   }
   MO.RDate = new RDate();
}
with(MO){
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
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
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
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value);
      }
      return result;
   }
   MO.REnum.prototype.parse = MO.REnum.prototype.encode;
   MO.REnum = new MO.REnum();
   MO.Enum = MO.REnum
}
with(MO){
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
   MO.RFile = new RFile();
}
with(MO){
   MO.RFloat = function RFloat(){
      var o = this;
      o.Chars     = '0123456789-.%';
      o.NUMBER    = '0123456789-.%';
      o.LEFT_CHAR = '0';
      return o;
   }
   MO.RFloat.prototype.isFloat = function RFloat_isFloat(p){
      return RString.isPattern(p, 'n');
   }
   MO.RFloat.prototype.parse = function RFloat_parse(source){
      if(source == null){
         return 0;
      }
      if(source == ''){
         return 0;
      }
      var value = RString.trim(source.toString());
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
      if(RString.findChars(result, '%') != -1){
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
      var fl = RString.lpad(sl, l, lp);
      var fr = RString.rpad(sr, r, rp);
      return fl + '.' + fr;
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
   MO.RFloat = new RFloat();
}
with(MO){
   MO.RHex = function RHex(){
      var o = this;
      o.NUMBER = '0x123456789ABCDEF';
      o.PAD    = '0';
      return o;
   }
   MO.RHex.prototype.isValid = function RHex_isValid(p){
      return RString.isPattern(p, this.NUMBER);
   }
   MO.RHex.prototype.parse = function RHex_parse(p){
      return p ? parseInt('0x' + p) : '0';
   }
   MO.RHex.prototype.format = function RHex_format(v, l){
      var r = null;
      if(v){
         r = v.toString(16);
      }else{
         r = '0'
      }
      return l ? RString.lpad(r, l, this.PAD) : r;
   }
   MO.RHex = new RHex();
}
with(MO){
   MO.RInstance = function RInstance(){
      var o = this;
      o._pools = new TDictionary();
      return o;
   }
   MO.RInstance.prototype.pool = function RInstance_pool(p){
      var o = this;
      var n = RClass.name(p);
      var v = o._pools.get(n);
      if(v == null){
         v = new TInstancePool();
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
   MO.RInstance = new RInstance();
}
with(MO){
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
      return RString.isPattern(v, 'n');
   }
   MO.RInteger.prototype.nvl = function RInteger_nvl(v, d){
      return v ? v : (d ? d : 0);
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
      v = RString.trim(v.toString());
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
   MO.RInteger = new RInteger();
}
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
with(MO){
   MO.RLogger = function RLogger(){
      var o = this;
      o._statusError = false;
      o._labelLength = 40;
      o.lsnsOutput   = new TListeners();
      return o;
   }
   MO.RLogger.prototype.output = function RLogger_output(s, p){
      this.lsnsOutput.process(s, p);
   }
   MO.RLogger.prototype.debug = function RLogger_debug(sf, ms, pm){
      var o = this;
      var n = RMethod.name(RLogger_debug.caller);
      n = n.replace('_', '.');
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|D [' + RString.rpad(n, o._labelLength) + '] ');
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a != null){
            if(typeof(a) == 'function'){
               s = RMethod.name(a);
            }else{
               s = a.toString();
            }
         }
         ms = ms.replace('{' + (n - 1) + '}', s);
      }
      r.append(ms);
      o.output(sf, r.flush());
   }
   MO.RLogger.prototype.info = function RLogger_info(sf, ms, pm){
      var o = this;
      var n = RMethod.name(RLogger_info.caller);
      n = n.replace('_', '.');
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|I [' + RString.rpad(n, o._labelLength) + '] ');
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a != null){
            if(typeof(a) == 'function'){
               s = RMethod.name(a);
            }else{
               s = a.toString();
            }
         }
         ms = ms.replace('{' + (n - 1) + '}', s);
      }
      r.append(ms);
      o.output(sf, r.flush());
   }
   MO.RLogger.prototype.warn = function RLogger_warn(sf, ms, pm){
      var o = this;
      var n = RMethod.name(RLogger_warn.caller);
      n = n.replace('_', '.');
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|W [' + RString.rpad(n, o._labelLength) + '] ');
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a != null){
            if(typeof(a) == 'function'){
               s = RMethod.name(a);
            }else{
               s = a.toString();
            }
         }
         ms = ms.replace('{' + (n - 1) + '}', s);
      }
      r.append(ms);
      o.output(sf, r.flush());
   }
   MO.RLogger.prototype.error = function RLogger_error(sf, ms, pm){
      var o = this;
      var n = RMethod.name(RLogger_error.caller);
      n = n.replace('_', '.');
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|E [' + RString.rpad(n, o._labelLength) + '] ');
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a != null){
            if(typeof(a) == 'function'){
               s = RMethod.name(a);
            }else{
               s = a.toString();
            }
         }
         ms = ms.replace('{' + (n - 1) + '}', s);
      }
      r.append(ms);
      o.output(sf, r.flush());
   }
   MO.RLogger.prototype.fatal = function RLogger_fatal(sf, er, ms, pm){
      var o = this;
      if(o._statusError){
         return;
      }
      o._statusError = true;
      var s = new TString();
      var t = new Array();
      var f = RLogger_fatal.caller;
      while(f){
         if(RArray.contains(t, f)){
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
         s.append('   ' + (c - n) + ': ' + RMethod.name(f));
      }
      var m = new TString();
      m.appendLine(RContext.get('RMessage:fatal'));
      m.appendLine(RString.repeat('-', 60));
      m.append(RClass.dump(sf), ': ');
      if(ms){
         var ag = arguments;
         c = ag.length;
         for(var n = 3; n < c; n++){
            var p = ag[n];
            if('function' == typeof(p)){
               p = RMethod.name(p);
            }
            var pi = n - 2;
            ms = ms.replace('{' + pi + '}', p);
         }
      }
      m.appendLine(ms);
      m.appendLine(RString.repeat('-', 60));
      m.appendLine('Stack:');
      m.append(s);
      var text = m.toString();
      throw new Error(text);
   }
   MO.RLogger.prototype.show = function RLogger_show(sf, ms, pm){
      var o = this;
      var n = RMethod.name(RLogger_show.caller);
      n = n.replace('_', '.');
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|I [' + RString.rpad(n, o._labelLength) + '] ');
      var as = arguments;
      var c = as.length;
      for(var n = 2; n < c; n++){
         var a = as[n];
         var s = '';
         if(a != null){
            if(typeof(a) == 'function'){
               s = RMethod.name(a);
            }else{
               s = a.toString();
            }
         }
         ms = ms.replace('{' + (n - 1) + '}', s);
      }
      r.append(ms);
      alert(r.flush());
   }
   MO.RLogger = new RLogger();
}
with(MO){
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
   MO.RMethod.prototype.isFunction = function RMethod_isFunction(v){
      return typeof(v) == 'function';
   }
   MO.RMethod.prototype.isEmpty = function RMethod_isEmpty(v){
      return (v && v.__empty);
   }
   MO.RMethod.prototype.isVirtual = function RMethod_isVirtual(v){
      return (v && v.__virtual);
   }
   MO.RMethod.prototype.name = function RMethod_name(value){
      if(value){
         if(typeof(value) == 'function'){
            if(value.__name){
               return value.__name;
            }
            var source = value.toString();
            var name = value.__name = RString.mid(source, 'function ', '(');
            return name;
         }
      }
      return null;
   }
   MO.RMethod.prototype.fullName = function RMethod_fullName(p){
      if(p){
         if(p.constructor == Function){
            if(p.__fullname){
               return p.__fullname;
            }
            var s = p.toString();
            var n = p.__fullname = RString.mid(s, 'function ', ')') + ')';
            return n;
         }
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
      var code = RClass.name(value) + '.' + name;
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
      var method = null;
      if(o._properties[methodName]){
         method = o._properties[methodName];
      }else{
         var source = 'return this.'+ name +';';
         method = new Function(source);
         o._properties[methodName] = method;
      }
      return method;
   }
   MO.RMethod.prototype.makePropertySet = function RMethod_makePropertySet(name, methodName){
      var o = this;
      var method = null;
      if(o._properties[methodName]){
         method = o._properties[methodName];
      }else{
         var source = 'this.'+ name +'=value;';
         method = new Function('value', source);
         o._properties[methodName] = method;
      }
      return method;
   }
   MO.RMethod = new RMethod();
   MO.RMethod.construct();
}
with(MO){
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
            if(!RClass.isBaseType(v.constructor)){
               v = RObject.clone(v);
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
               if(!RClass.isBaseType(v.constructor)){
                  if(t[n] == null){
                     t[n] = new c();
                  }
                  RObject.copy(v, t[n]);
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
                  if(!RClass.isBaseType(value.constructor)){
                     throw new TError(RObject, 'Free object is not base object.');
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
            throw new TError(RObject, 'Object has disposed.');
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
   MO.RObject = new RObject();
}
with(MO){
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
   MO.RRect = new RRect();
}
with(MO){
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
   MO.RRegExp = new RRegExp();
}
with(MO){
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
   MO.RSet = new RSet();
}
with(MO){
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
         p = p.replace(/\f/g, RFloat.NUMBER);
         p = p.replace(/\n/g, RInteger.NUMBER);
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
   MO.RString.prototype.contains = function RString_contains(v, s){
      if((v != null) && (s != null)){
         return (v.toString().indexOf(s) != -1);
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
         p = new TString();
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
   MO.RString.prototype.format = function RString_format(s, p){
      var a = arguments;
      var c = a.length;
      for(var n = 1; n < c; n++){
         var p = a[n];
         if(typeof(p) == 'function'){
            p = RMethod.name(p);
         }else if(p == null){
            p = '';
         }
         s = s.replace('{' + (n-1) + '}', p);
      }
      return s;
   }
   MO.RString.prototype.formatLines = function RString_formatLines(p){
      var o = this;
      p = p.replace(/\\r/g, '');
      var ls = p.split('\n');
      var c = ls.length;
      var r = new TString();
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
      return r.toString();
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
         var s = new TString();
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
         r = s.toString();
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
   MO.RString.prototype.replace = function RString_replace(v, s, t){
      return v.replace(new RegExp(s, 'g'), t);
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
   MO.RString = new RString();
}
with(MO){
   MO.RTimer = function RTimer(){
      var o = this;
      o._startTime = 0;
      o._lastTime  = 0;
      o._count     = 0;
      return o;
   }
   MO.RTimer.prototype.setup = function RTimer_setup(){
      var o = this;
      var n = new Date().getTime();
      o._startTime = n;
      o._lastTime = n;
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
   MO.RTimer = new RTimer();
}
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
with(MO){
   MO.SColor4 = function SColor4(red, green, blue, alpha){
      var o = this;
      o.red          = red ? red : 0;
      o.green        = green ? green : 0;
      o.blue         = blue ? blue : 0;
      o.alpha        = alpha ? alpha : 1;
      o.assign       = SColor4_assign;
      o.assignPower  = SColor4_assignPower;
      o.set          = SColor4_set;
      o.serialize    = SColor4_serialize;
      o.unserialize  = SColor4_unserialize;
      o.unserialize3 = SColor4_unserialize3;
      o.saveConfig   = SColor4_saveConfig;
      o.savePower    = SColor4_savePower;
      o.copyArray    = SColor4_copyArray;
      o.toString     = SColor4_toString;
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
      return RFloat.format(o.red) + ',' + RFloat.format(o.green) + ',' + RFloat.format(o.blue) + ',' + RFloat.format(o.alpha);
   }
}
with(MO){
   MO.SCorners = function SCorners(){
      var o = this;
      o.red          = 0;
      o.green        = 0;
      o.blue         = 0;
      o.alpha        = 1;
      o.assign       = SCorners_assign;
      o.assignPower  = SCorners_assignPower;
      o.set          = SCorners_set;
      o.serialize    = SCorners_serialize;
      o.unserialize  = SCorners_unserialize;
      o.unserialize3 = SCorners_unserialize3;
      o.saveConfig   = SCorners_saveConfig;
      o.savePower    = SCorners_savePower;
      o.copyArray    = SCorners_copyArray;
      o.toString     = SCorners_toString;
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
      return RFloat.format(o.red) + ',' + RFloat.format(o.green) + ',' + RFloat.format(o.blue) + ',' + RFloat.format(o.alpha);
   }
}
with(MO){
   MO.SFrustum = function SFrustum(){
      var o = this;
      o.center       = new SPoint3();
      o.radius       = null;
      o.minX         = null;
      o.maxX         = null;
      o.minY         = null;
      o.maxY         = null;
      o.minZ         = null;
      o.maxZ         = null;
      o.points       = new Array(24);
      o.coners       = new Array(24);
      o.updateCenter = SFrustum_updateCenter;
      o.update       = SFrustum_update;
      o.updateFlat   = SFrustum_updateFlat;
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
      var fov = Math.tan(RConst.DEGREE_RATE * pva * 0.5);
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
      var m = RMath.matrix;
      m.assign(pm);
      m.invert();
      m.transform(o.coners, ps, 8);
      o.updateCenter();
   }
   MO.SFrustum_updateFlat = function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
      var o = this;
      var aspect = pvw / pvh;
      var znear = pvn * pbr;
      var zfar = pvf * pfr;
      var fov = Math.tan(RConst.DEGREE_RATE * pva * 0.5);
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
      var m = RMath.matrix;
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
}
with(MO){
   MO.SFrustumPlanes = function SFrustumPlanes(){
      var o = this;
      o.planes            = new Array();
      o.containsPoint     = SFrustumPlanes_containsPoint;
      o.containsCube      = SFrustumPlanes_containsCube;
      o.containsRectangle = SFrustumPlanes_containsRectangle;
      o.containsCorners   = SFrustumPlanes_containsCorners;
      o.containsSphere    = SFrustumPlanes_containsSphere;
      o.updateVision      = SFrustumPlanes_updateVision;
      for(var i = 0; i < EFrustumPlane.Count; i++){
         o.planes.push(new SPlane());
      }
      return o;
   }
   MO.SFrustumPlanes_containsPoint = function SFrustumPlanes_containsPoint(x, y, z){
      var o = this;
      var ps = o.planes;
      for(var i = 0; i < EFrustumPlane.Count; i++){
         if(ps[n].dot(x, y, z) < 0){
            return false;
         }
      }
      return true;
   }
   MO.SFrustumPlanes_containsCube = function SFrustumPlanes_containsCube(cx, cy, cz, size){
      var o = this;
      var ps = o.planes;
      for(var i = 0; i < EFrustumPlane.Count; i++){
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
      for(var i = 0; i < EFrustumPlane.Count; i++){
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
      for(var i = EFrustumPlane.Count - 1; i >= 0; i--){
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
      for(var i = 0; i < EFrustumPlane.Count; i++){
         if(ps[n].dot(px, py, pz) < -pr){
            return false;
         }
      }
      return true;
   }
   MO.SFrustumPlanes_updateVision = function SFrustumPlanes_updateVision(p){
      var o = this;
      var ps = o.planes;
      var pn = ps[EFrustumPlane.Near];
      pn.a = p[ 0 + 3] + p[ 0 + 2];
      pn.b = p[ 4 + 3] + p[ 4 + 2];
      pn.c = p[ 8 + 3] + p[ 8 + 2];
      pn.d = p[12 + 3] + p[12 + 2];
      pn.normalize();
      var pf = ps[EFrustumPlane.Far];
      pf.a = p[ 0 + 3] - p[ 0 + 2];
      pf.b = p[ 4 + 3] - p[ 4 + 2];
      pf.c = p[ 8 + 3] - p[ 8 + 2];
      pf.d = p[12 + 3] - p[12 + 2];
      pf.normalize();
      var pl = ps[EFrustumPlane.Left];
      pl.a = p[ 0 + 3] - p[ 0 + 0];
      pl.b = p[ 4 + 3] - p[ 4 + 0];
      pl.c = p[ 8 + 3] - p[ 8 + 0];
      pl.d = p[12 + 3] - p[12 + 0];
      pl.normalize();
      var pr = ps[EFrustumPlane.Right];
      pr.a = p[ 0 + 3] + p[ 0 + 0];
      pr.b = p[ 4 + 3] + p[ 4 + 0];
      pr.c = p[ 8 + 3] + p[ 8 + 0];
      pr.d = p[12 + 3] + p[12 + 0];
      pr.normalize();
      var pt = ps[EFrustumPlane.Top];
      pt.a = p[ 0 + 3] - p[ 0 + 1];
      pt.b = p[ 4 + 3] - p[ 4 + 1];
      pt.c = p[ 8 + 3] - p[ 8 + 1];
      pt.d = p[12 + 3] - p[12 + 1];
      pt.normalize();
      var pb = ps[EFrustumPlane.Bottom];
      pb.a = p[ 0 + 3] + p[ 0 + 1];
      pb.b = p[ 4 + 3] + p[ 4 + 1];
      pb.c = p[ 8 + 3] + p[ 8 + 1];
      pb.d = p[12 + 3] + p[12 + 1];
      pb.normalize();
   }
}
with(MO){
   MO.SMatrix3d = function SMatrix3d(){
      var o = this;
      SMatrix4x4.call(o);
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
      o.isIdentity     = SMatrix3d_isIdentity;
      o.identity       = SMatrix3d_identity;
      o.setTranslate   = SMatrix3d_setTranslate;
      o.setRotation    = SMatrix3d_setRotation;
      o.setScale       = SMatrix3d_setScale;
      o.setScaleAll    = SMatrix3d_setScaleAll;
      o.set            = SMatrix3d_set;
      o.setAll         = SMatrix3d_setAll;
      o.equals         = SMatrix3d_equals;
      o.assign         = SMatrix3d_assign;
      o.attach         = SMatrix3d_attach;
      o.append         = SMatrix3d_append;
      o.updateForce    = SMatrix3d_updateForce;
      o.update         = SMatrix3d_update;
      o.merge          = SMatrix3d_merge;
      o.serialize      = SMatrix3d_serialize;
      o.unserialize    = SMatrix3d_unserialize;
      o.saveConfig     = SMatrix3d_saveConfig;
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
      p.set('tx', RFloat.format(o.tx));
      p.set('ty', RFloat.format(o.ty));
      p.set('tz', RFloat.format(o.tz));
      p.set('rx', RFloat.format(o.rx));
      p.set('ry', RFloat.format(o.ry));
      p.set('rz', RFloat.format(o.rz));
      p.set('sx', RFloat.format(o.sx));
      p.set('sy', RFloat.format(o.sy));
      p.set('sz', RFloat.format(o.sz));
   }
}
with(MO){
   MO.SMatrix3x3 = function SMatrix3x3(){
      var o = this;
      o._data           = new Array(9);
      o.data            = SMatrix3x3_data;
      o.equalsData      = SMatrix3x3_equalsData;
      o.assignData      = SMatrix3x3_assignData;
      o.appendData      = SMatrix3x3_appendData;
      o.rotationX       = SMatrix3x3_rotationX;
      o.rotationY       = SMatrix3x3_rotationY;
      o.rotationZ       = SMatrix3x3_rotationZ;
      o.rotation        = SMatrix3x3_rotation;
      o.invert          = SMatrix3x3_invert;
      o.transform       = SMatrix3x3_transform;
      o.transformPoint3 = SMatrix3x3_transformPoint3;
      o.build           = SMatrix3x3_build;
      o.writeData       = SMatrix3x3_writeData;
      o.toString        = SMatrix3x3_toString;
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
      var v = RMath.value9;
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
      var r = new TString();
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
            r.append(RFloat.format(v, 0, null, 3, null));
         }
      }
      return r.flush();
   }
}
with(MO){
   MO.SMatrix4x4 = function SMatrix4x4(){
      var o = this;
      o._data           = new Array(16);
      o.data            = SMatrix4x4_data;
      o.isIdentityData  = SMatrix4x4_isIdentityData;
      o.identityData    = SMatrix4x4_identityData;
      o.equalsData      = SMatrix4x4_equalsData;
      o.assignData      = SMatrix4x4_assignData;
      o.attachData      = SMatrix4x4_attachData;
      o.appendData      = SMatrix4x4_appendData;
      o.addTranslate    = SMatrix4x4_addTranslate;
      o.addRotationX    = SMatrix4x4_addRotationX;
      o.addRotationY    = SMatrix4x4_addRotationY;
      o.addRotationZ    = SMatrix4x4_addRotationZ;
      o.addRotation     = SMatrix4x4_addRotation;
      o.addScale        = SMatrix4x4_addScale;
      o.invert          = SMatrix4x4_invert;
      o.transform       = SMatrix4x4_transform;
      o.transformPoint3 = SMatrix4x4_transformPoint3;
      o.buildQuaternion = SMatrix4x4_buildQuaternion;
      o.build           = SMatrix4x4_build;
      o.writeData       = SMatrix4x4_writeData;
      o.writeData4x3    = SMatrix4x4_writeData4x3;
      o.toString        = SMatrix4x4_toString;
      return o;
   }
   MO.SMatrix4x4_data = function SMatrix4x4_data(){
      return this._data;
   }
   MO.SMatrix4x4_isIdentityData = function SMatrix4x4_isIdentityData(){
      var d = this._data;
      var v = RConst.identity4x4;
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
      var v = RConst.identity4x4;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
      var v = RArray.array16;
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
   MO.SMatrix4x4_transform = function SMatrix4x4_transform(po, poi, pi, pii, pc){
      var d = this._data;
      for(var i = 0; i < pc; i++){
         var x = pi[pii++];
         var y = pi[pii++];
         var z = pi[pii++];
         po[poi++] = (x * d[ 0]) + (y * d[ 4]) +(z * d[ 8]) + d[12];
         po[poi++] = (x * d[ 1]) + (y * d[ 5]) +(z * d[ 9]) + d[13];
         po[poi++] = (x * d[ 2]) + (y * d[ 6]) +(z * d[10]) + d[14];
      }
   }
   MO.SMatrix4x4_transformPoint3 = function SMatrix4x4_transformPoint3(pi, po){
      var d = this._data;
      var x = (pi.x * d[ 0]) + (pi.y * d[ 4]) +(pi.z * d[ 8]) + d[12];
      var y = (pi.x * d[ 1]) + (pi.y * d[ 5]) +(pi.z * d[ 9]) + d[13];
      var z = (pi.x * d[ 2]) + (pi.y * d[ 6]) +(pi.z * d[10]) + d[14];
      var r = null;
      if(po){
         r = po;
      }else{
         r = new SPoint3();
      }
      r.set(x, y, z);
      return r;
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
      var r = new TString();
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
            r.append(RFloat.format(v, 0, null, 3, null));
         }
      }
      return r.flush();
   }
}
with(MO){
   MO.SOrthoMatrix3d = function SOrthoMatrix3d(){
      var o = this;
      SMatrix3d.call(o);
      o.perspectiveLH            = SOrthoMatrix3d_perspectiveLH;
      o.perspectiveRH            = SOrthoMatrix3d_perspectiveRH;
      o.perspectiveFieldOfViewLH = SOrthoMatrix3d_perspectiveFieldOfViewLH;
      o.perspectiveFieldOfViewRH = SOrthoMatrix3d_perspectiveFieldOfViewRH;
      return o;
   }
   MO.SOrthoMatrix3d_perspectiveLH = function SOrthoMatrix3d_perspectiveLH(pw, ph, pn, pf){
      var d = this._data;
      d[ 0] = 2.0 * pn / pw;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = 2.0 * pn / ph;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pf - pn);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SOrthoMatrix3d_perspectiveRH = function SOrthoMatrix3d_perspectiveRH(pw, ph, pn, pf){
      var d = this._data;
      d[ 0] = 2.0 * pn / pw;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = 2.0 * pn / ph;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pn - pf);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SOrthoMatrix3d_perspectiveFieldOfViewLH = function SOrthoMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
      var d = this._data;
      var sy = 1.0 / Math.tan(pv * 0.5);
      var sx = sy / pr;
      d[ 0] = sx;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = sy;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pf - pn);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SOrthoMatrix3d_perspectiveFieldOfViewRH = function SOrthoMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
      var d = this._data;
      var sy = 1.0 / Math.tan(pv * 0.5);
      var sx = sy / pr;
      d[ 0] = sx;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = sy;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pn - pf);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pf - pn);
      d[15] = 0.0;
   }
}
with(MO){
   MO.SOutline3 = function SOutline3(){
      var o = this;
      o.min         = new SPoint3();
      o.max         = new SPoint3();
      o.isEmpty     = SOutline3_isEmpty;
      o.assign      = SOutline3_assign;
      o.setMin      = SOutline3_setMin;
      o.setMax      = SOutline3_setMax;
      o.set         = SOutline3_set;
      o.mergeMin    = SOutline3_mergeMin;
      o.mergeMax    = SOutline3_mergeMax;
      o.mergePoint  = SOutline3_mergePoint;
      o.serialize   = SOutline3_serialize;
      o.unserialize = SOutline3_unserialize;
      o.toString    = SOutline3_toString;
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
}
with(MO){
   MO.SOutline3d = function SOutline3d(){
      var o = this;
      SOutline3.call(o);
      o.center        = new SPoint3();
      o.distance      = new SPoint3();
      o.radius        = 0;
      o.points        = new Array(24);
      o.assign        = SOutline3d_assign;
      o.update        = SOutline3d_update;
      o.calculateFrom = SOutline3d_calculateFrom;
      o.calculate     = SOutline3d_calculate;
      return o;
   }
   MO.SOutline3d_assign = function SOutline3d_assign(value){
      var o = this;
      MO.SOutline3.call(o, value);
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
}
with(MO){
   MO.SPadding = function SPadding(l, t, r, b){
      var o = this;
      o.left     = RInteger.nvl(l);
      o.top      = RInteger.nvl(t);
      o.right    = RInteger.nvl(r);
      o.bottom   = RInteger.nvl(b);
      o.isEmpty  = SPadding_isEmpty;
      o.reset    = SPadding_reset;
      o.assign   = SPadding_assign;
      o.set      = SPadding_set;
      o.parse    = SPadding_parse;
      o.toString = SPadding_toString;
      o.dispose  = SPadding_dispose;
      o.dump     = SPadding_dump;
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
         throw new TError(o, "Parse value failure. (value={1})", v);
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
      return RClass.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
   }
}
with(MO){
   MO.SPerspectiveMatrix3d = function SPerspectiveMatrix3d(){
      var o = this;
      SMatrix3d.call(o);
      o.perspectiveLH            = SPerspectiveMatrix3d_perspectiveLH;
      o.perspectiveRH            = SPerspectiveMatrix3d_perspectiveRH;
      o.perspectiveFieldOfViewLH = SPerspectiveMatrix3d_perspectiveFieldOfViewLH;
      o.perspectiveFieldOfViewRH = SPerspectiveMatrix3d_perspectiveFieldOfViewRH;
      return o;
   }
   MO.SPerspectiveMatrix3d_perspectiveLH = function SPerspectiveMatrix3d_perspectiveLH(pw, ph, pn, pf){
      var d = this._data;
      d[ 0] = 2.0 * pn / pw;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = 2.0 * pn / ph;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pf - pn);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SPerspectiveMatrix3d_perspectiveRH = function SPerspectiveMatrix3d_perspectiveRH(pw, ph, pn, pf){
      var d = this._data;
      d[ 0] = 2.0 * pn / pw;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = 2.0 * pn / ph;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pn - pf);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SPerspectiveMatrix3d_perspectiveFieldOfViewLH = function SPerspectiveMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
      var d = this._data;
      var sy = 1.0 / Math.tan(pv * 0.5);
      var sx = sy / pr;
      d[ 0] = sx;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = sy;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pf - pn);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pn - pf);
      d[15] = 0.0;
   }
   MO.SPerspectiveMatrix3d_perspectiveFieldOfViewRH = function SPerspectiveMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
      var d = this._data;
      var sy = 1.0 / Math.tan(pv * 0.5);
      var sx = sy / pr;
      d[ 0] = sx;
      d[ 1] = 0.0;
      d[ 2] = 0.0;
      d[ 3] = 0.0;
      d[ 4] = 0.0;
      d[ 5] = sy;
      d[ 6] = 0.0;
      d[ 7] = 0.0;
      d[ 8] = 0.0;
      d[ 9] = 0.0;
      d[10] = pf / (pn - pf);
      d[11] = 1.0;
      d[12] = 0.0;
      d[13] = 0.0;
      d[14] = (pn * pf) / (pf - pn);
      d[15] = 0.0;
   }
}
with(MO){
   MO.SPlane = function SPlane(){
      var o = this;
      o.a         = 0;
      o.b         = 0;
      o.c         = 0;
      o.d         = 0;
      o.assign    = SPlane_assign;
      o.set       = SPlane_set;
      o.normalize = SPlane_normalize;
      o.dot       = SPlane_dot;
      o.toString  = SPlane_toString;
      o.dump      = SPlane_dump;
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
      return RClass.dump(o) + ' [' + o.toString() + ']';
   }
}
with(MO){
   MO.SPoint2 = function SPoint2(x, y){
      var o = this;
      o.x           = RInteger.nvl(x);
      o.y           = RInteger.nvl(y);
      o.isEmpty     = SPoint2_isEmpty;
      o.equals      = SPoint2_equals;
      o.assign      = SPoint2_assign;
      o.set         = SPoint2_set;
      o.serialize   = SPoint2_serialize;
      o.unserialize = SPoint2_unserialize;
      o.toString    = SPoint2_toString;
      o.dispose     = SPoint2_dispose;
      o.dump        = SPoint2_dump;
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
      return RClass.dump(this) + ' [' + this.x + ',' + this.y + ']';
   }
}
with(MO){
   MO.SPoint3 = function SPoint3(x, y, z){
      var o = this;
      SValue3.call(o, x, y, z);
      o.conjugate = SPoint3_conjugate;
      o.mergeMin  = SPoint3_mergeMin;
      o.mergeMin3 = SPoint3_mergeMin3;
      o.mergeMax  = SPoint3_mergeMax;
      o.mergeMax3 = SPoint3_mergeMax3;
      o.resize    = SPoint3_resize;
      o.slerp     = SPoint3_slerp;
      return o;
   }
   MO.SPoint3_conjugate = function SPoint3_conjugate(p){
      var o = this;
      var r = null;
      if(p){
         r = p;
      }else{
         r = new SPoint3();
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
}
with(MO){
   MO.SPoint4 = function SPoint4(x, y, z, w){
      var o = this;
      SValue4.call(o, x, y, z, w);
      o.serialize3   = SPoint4_serialize3;
      o.unserialize3 = SPoint4_unserialize3;
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
}
with(MO){
   MO.SQuaternion = function SQuaternion(o){
      if(!o){o = this;}
      o.x             = 0;
      o.y             = 0;
      o.z             = 0;
      o.w             = 1;
      o.identity      = SQuaternion_identity;
      o.assign        = SQuaternion_assign;
      o.set           = SQuaternion_set;
      o.absolute      = SQuaternion_absolute;
      o.normalize     = SQuaternion_normalize;
      o.conjugate     = SQuaternion_conjugate;
      o.mul           = SQuaternion_mul;
      o.mul2          = SQuaternion_mul2;
      o.translate     = SQuaternion_translate;
      o.slerp         = SQuaternion_slerp;
      o.fromAxisAngle = SQuaternion_fromAxisAngle;
      o.fromEuler     = SQuaternion_fromEuler;
      o.parseEuler    = SQuaternion_parseEuler;
      o.serialize     = SQuaternion_serialize;
      o.unserialize   = SQuaternion_unserialize;
      o.clone         = SQuaternion_clone;
      o.toString      = SQuaternion_toString;
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
         r = new SQuaternion();
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
      var q1 = new SQuaternion();
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
         r = new SVector3();
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
         r = new SVector3();
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
      var r = new SQuaternion();
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
}
with(MO){
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
}
with(MO){
   MO.SRectangle = function SRectangle(){
      var o = this;
      o.position    = new SPoint2();
      o.size        = new SSize2();
      o.left        = SRectangle_left;
      o.top         = SRectangle_top;
      o.right       = SRectangle_right;
      o.bottom      = SRectangle_bottom;
      o.width       = SRectangle_width;
      o.height      = SRectangle_height;
      o.assign      = SRectangle_assign;
      o.setPosition = SRectangle_setPosition;
      o.setSize     = SRectangle_setSize;
      o.set         = SRectangle_set;
      o.toString    = SRectangle_toString;
      o.dispose     = SRectangle_dispose;
      o.dump        = SRectangle_dump;
      return o;
   }
   MO.SRectangle_left = function SRectangle_left(){
      return this.position.x;
   }
   MO.SRectangle_top = function SRectangle_top(){
      return this.position.y;
   }
   MO.SRectangle_right = function SRectangle_right(){
      return this.position.x + this.size.width;
   }
   MO.SRectangle_bottom = function SRectangle_bottom(){
      return this.position.y + this.size.height;
   }
   MO.SRectangle_width = function SRectangle_width(){
      return this.size.width;
   }
   MO.SRectangle_height = function SRectangle_height(){
      return this.size.height;
   }
   MO.SRectangle_assign = function SRectangle_assign(p){
      var o = this;
      o.position.assign(p.position);
      o.size.assign(p.size);
   }
   MO.SRectangle_setPosition = function SRectangle_setPosition(l, t, w, h){
      this.position.set(l, t);
   }
   MO.SRectangle_setSize = function SRectangle_setSize(w, h){
      this.size.set(w, h);
   }
   MO.SRectangle_set = function SRectangle_set(l, t, w, h){
      var o = this;
      o.position.set(l, t);
      o.size.set(w, h);
   }
   MO.SRectangle_toString = function SRectangle_toString(){
      var o = this;
      return o.position.x + ',' + o.position.y + ',' + o.size.width + ',' + o.size.height;
   }
   MO.SRectangle_dispose = function SRectangle_dispose(){
      var o = this;
      o.position = o.position.dispose();
      o.size = o.size.dispose();
   }
   MO.SRectangle_dump = function SRectangle_dump(){
      var o = this;
      return RClass.dump(o) + ' [' + o.position.x + ',' + o.position.y + '-' + o.size.width + ',' + o.size.height + ']';
   }
}
with(MO){
   MO.SSize2 = function SSize2(width, height){
      var o = this;
      o.width       = RInteger.nvl(width);
      o.height      = RInteger.nvl(height);
      o.isEmpty     = SSize2_isEmpty;
      o.equalsData  = SSize2_equalsData;
      o.equals      = SSize2_equals;
      o.square      = SSize2_square;
      o.assign      = SSize2_assign;
      o.set         = SSize2_set;
      o.serialize   = SSize2_serialize;
      o.unserialize = SSize2_unserialize;
      o.parse       = SSize2_parse;
      o.toString    = SSize2_toString;
      o.dispose     = SSize2_dispose;
      o.dump        = SSize2_dump;
      return o;
   }
   MO.SSize2_isEmpty = function SSize2_isEmpty(){
      var o = this;
      return (o.width == 0) && (o.height == 0);
   }
   MO.SSize2_equalsData = function SSize2_equalsData(w, h){
      var o = this;
      if(o.width != w){
         return false;
      }
      if(o.height != h){
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
         dataCd = EDataType.Float16;
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
      return RClass.dump(o) + ' [' + o.width + ',' + o.height + ']';
   }
}
with(MO){
   MO.SSize3 = function SSize3(w, h, d){
      var o = this;
      o.width    = RInteger.nvl(w);
      o.height   = RInteger.nvl(h);
      o.deep     = RInteger.nvl(d);
      o.assign   = SSize3_assign;
      o.set      = SSize3_set;
      o.parse    = SSize3_parse;
      o.toString = SSize3_toString;
      o.dump     = SSize3_dump;
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
         throw new TError(o, "Parse value failure. (value={1})", v);
      }
   }
   MO.SSize3_toString = function SSize3_toString(){
      var o = this;
      return o.width + ',' + o.height + ',' + o.deep;
   }
   MO.SSize3_dump = function SSize3_dump(){
      var o = this;
      return RClass.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
   }
}
with(MO){
   MO.SSquare = function SSquare(l, t, r, b){
      var o = this;
      o.left      = RInteger.nvl(left);
      o.top       = RInteger.nvl(top);
      o.right     = RInteger.nvl(right);
      o.bottom    = RInteger.nvl(bottom);
      o.reset     = SSquare_reset;
      o.assign    = SSquare_assign;
      o.set       = SSquare_set;
      o.setBounds = SSquare_setBounds;
      o.width     = SSquare_width;
      o.setWidth  = SSquare_setWidth;
      o.height    = SSquare_height;
      o.setHeight = SSquare_setHeight;
      o.move      = SSquare_move;
      o.inc       = SSquare_inc;
      o.dec       = SSquare_dec;
      o.pack      = SSquare_dump;
      o.unpack    = SSquare_dump;
      o.dump      = SSquare_dump;
      return o;
   }
   MO.SSquare_reset = function SSquare_reset(){
      var o = this;
      o.left = 0;
      o.top = 0;
      o.right = 0;
      o.bottom = 0;
   }
   MO.SSquare_assign = function SSquare_assign(rect){
      this.left = rect.left;
      this.top = rect.top;
      this.right = rect.right;
      this.bottom = rect.bottom;
   }
   MO.SSquare_set = function SSquare_set(left, top, right, bottom){
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
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
      d = RString.nvlStr(d);
      d.append(RClass.name(this));
      d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
      d.append('(', this.width(), '-', this.height(), ')');
      return d;
   }
}
with(MO){
   MO.SValue3 = function SValue3(x, y, z){
      var o = this;
      o.x           = MO.Runtime.nvl(x, 0);
      o.y           = MO.Runtime.nvl(y, 0);
      o.z           = MO.Runtime.nvl(z, 0);
      o.isEmpty     = SValue3_isEmpty;
      o.assign      = SValue3_assign;
      o.setMin      = SValue3_setMin;
      o.setMax      = SValue3_setMax;
      o.set         = SValue3_set;
      o.absolute    = SValue3_absolute;
      o.normalize   = SValue3_normalize;
      o.negative    = SValue3_negative;
      o.serialize   = SValue3_serialize;
      o.unserialize = SValue3_unserialize;
      o.parse       = SValue3_parse;
      o.toString    = SValue3_toString;
      return o;
   }
   MO.SValue3_isEmpty = function SValue3_isEmpty(p){
      return (this.x == 0) && (this.y == 0) && (this.z == 0);
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
   MO.SValue3_unserialize = function SValue3_unserialize(input){
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
         throw new TError(o, "Parse value failure. (value={1})", value);
      }
   }
   MO.SValue3_toString = function SValue3_toString(){
      return this.x + ',' + this.y + ',' + this.z;
   }
}
with(MO){
   MO.SValue4 = function SValue4(x, y, z, w){
      var o = this;
      o.x           = MO.Runtime.nvl(x, 0);
      o.y           = MO.Runtime.nvl(y, 0);
      o.z           = MO.Runtime.nvl(z, 0);
      o.w           = MO.Runtime.nvl(w, 1);
      o.assign      = SValue4_assign;
      o.set         = SValue4_set;
      o.absolute    = SValue4_absolute;
      o.normalize   = SValue4_normalize;
      o.negative    = SValue4_negative;
      o.serialize   = SValue4_serialize;
      o.unserialize = SValue4_unserialize;
      o.parse       = SValue4_parse;
      o.toString    = SValue4_toString;
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
         throw new TError(o, "Parse value failure. (value={1})", value);
      }
   }
   MO.SValue4_toString = function SValue4_toString(){
      return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
   }
}
with(MO){
   MO.SVector3 = function SVector3(x, y, z){
      var o = this;
      SValue3.call(o, x, y, z);
      o.length    = o.absolute;
      o.direction = SVector3_direction;
      o.conjugate = SVector3_conjugate;
      o.dotPoint3 = SVector3_dotPoint3;
      o.cross     = SVector3_cross;
      o.cross2    = SVector3_cross2;
      o.slerp     = SVector3_slerp;
      o.clone     = SVector3_clone;
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
         r = new SVector3();
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
      var r = new SVector3();
      r.x = o.x;
      r.y = o.y;
      r.z = o.z;
      return r;
   }
}
with(MO){
   MO.SVector4 = function SVector4(x, y, z, w){
      var o = this;
      SValue4.call(o, x, y, z, w);
      o.serialize3   = SVector4_serialize3;
      o.unserialize3 = SVector4_unserialize3;
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
}
with(MO){
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
      o.construct      = RMath_construct;
      o.min            = RMath_min;
      o.max            = RMath_max;
      o.sign           = RMath_sign;
      o.construct();
      return o;
   }
   MO.RMath_construct = function RMath_construct(){
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
   MO.RMath_min = function RMath_min(){
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
   MO.RMath_max = function RMath_max(){
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
   MO.RMath_sign = function RMath_sign(value){
      if(value > 0){
         return 1;
      }else if(value < 0){
         return -1;
      }
      return 0;
   }
   MO.RMath = new RMath();
}
with(MO){
   MO.RRandom = function RRandom(){
      var o = this;
      o._seed = (new Date()).getTime();
      o.get  = RRandom_get;
      o.rand = RRandom_rand;
      return o;
   }
   MO.RRandom_get = function RRandom_get(){
      var o = this;
      o._seed = (o._seed * 9301 + 49297) % 233280;
      return o._seed/(233280.0);
   }
   MO.RRandom_rand = function RRandom_rand(seed){
      var o = this;
      var value = o.get() * seed;
      return Math.ceil(value);
   }
   MO.RRandom = new RRandom();
}
