var MO = new function MO(){
   var o = this;
   o.version = '0.2.0';
   return o;
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
with(MO){
   MO.RRuntime = function RRuntime(){
      var o = this;
      o.processCd    = EProcess.Release;
      o.isDebug      = RRuntime_isDebug;
      o.isProcess    = RRuntime_isProcess;
      o.isRelease    = RRuntime_isRelease;
      o.setProcessCd = RRuntime_setProcessCd;
      o.empty        = RRuntime_empty;
      o.nvl          = RRuntime_nvl;
      o.subString    = RRuntime_subString;
      o.className    = RRuntime_className;
      return o;
   }
   MO.RRuntime_isDebug = function RRuntime_isDebug(){
      return (this._processCd == EProcess.Debug);
   }
   MO.RRuntime_isProcess = function RRuntime_isProcess(){
      return (this._processCd == EProcess.Process);
   }
   MO.RRuntime_isRelease = function RRuntime_isRelease(){
      return (this._processCd == EProcess.Release);
   }
   MO.RRuntime_setProcessCd = function RRuntime_setProcessCd(processCd){
      this._processCd = processCd;
   }
   MO.RRuntime_empty = function RRuntime_empty(){
   }
   MO.RRuntime_nvl = function RRuntime_nvl(value, defaultValue){
      return (value != null) ? value : defaultValue;
   }
   MO.RRuntime_subString = function RRuntime_subString(value, begin, end){
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
   MO.RRuntime_className = function RRuntime_className(value){
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
   MO.RRuntime = new RRuntime();
   MO.Runtime = MO.RRuntime;
}
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
      r.append(RRuntime.className(o), ':', c);
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
      info.append(RRuntime.className(o), ' : ', count);
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
      info.append(RRuntime.className(o), ': ', count);
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
   MO.TMap_dispose = function TMap_dispose(){
      this._count = 0;
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
   }
   MO.TMap_dump = function TMap_dump(){
      var info = new TString();
      var count = this._count;
      info.appendLine(RRuntime.className(o), ': ', count);
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
         this._items[index] = v;
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
         if(this._items[i] == v){
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
      info.append(RRuntime.className(o), ':', count);
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
      return RRuntime.className(o) + ':' + source.length + '[' + source + ']';
   }
}
with(MO){
   MO.RAssert = function RAssert(){
      var o = this;
      o.isTrue        = RAssert_isTrue;
      o.isFalse       = RAssert_isFalse;
      o.debugBegin    = MO.Runtime.empty;
      o.debug         = MO.Runtime.empty;
      o.debugEnd      = MO.Runtime.empty;
      o.debugTrue     = RAssert_debugTrue;
      o.debugFalse    = RAssert_debugFalse;
      o.debugNull     = RAssert_debugNull;
      o.debugNotNull  = RAssert_debugNotNull;
      o.debugEmpty    = RAssert_debugEmpty;
      o.debugNotEmpty = RAssert_debugNotEmpty;
      return o;
   }
   MO.RAssert_isTrue = function RAssert_isTrue(value){
      if(!value){
         throw new Error('Assert ture failure.');
      }
   }
   MO.RAssert_isFalse = function RAssert_isFalse(value){
      if(value){
         throw new Error('Assert false failure.');
      }
   }
   MO.RAssert_debugTrue = function RAssert_debugTrue(value){
      if(!value){
         throw new Error('Assert true failure.');
      }
   }
   MO.RAssert_debugFalse = function RAssert_debugFalse(value){
      if(value){
         throw new Error('Assert false failure.');
      }
   }
   MO.RAssert_debugNull = function RAssert_debugNull(value){
      if(value != null){
         throw new Error('Assert null failure.');
      }
   }
   MO.RAssert_debugNotNull = function RAssert_debugNotNull(value){
      if(value == null){
         throw new Error('Assert not null failure.');
      }
   }
   MO.RAssert_debugEmpty = function RAssert_debugEmpty(value){
      if(value != null){
         throw new Error('Assert empty failure.');
      }
   }
   MO.RAssert_debugNotEmpty = function RAssert_debugNotEmpty(value){
      if(value == null){
         throw new Error('Assert not empty failure.');
      }
   }
   MO.RAssert = new RAssert();
}
with(MO){
   MO.RMemory = function RMemory(){
      var o = this;
      o._entryUnused = null;;
      o._pools       = new Object();
      o.entryAlloc   = RMemory_entryAlloc;
      o.entryFree    = RMemory_entryFree;
      o.alloc        = RMemory_alloc;
      o.free         = RMemory_free;
      o.refresh      = RMemory_refresh;
      return o;
   }
   MO.RMemory_entryAlloc = function RMemory_entryAlloc(){
      var entry = null;
      var unused = this._entryUnused;
      if(unused){
         entry = unused;
         this._entryUnused = unused.next;
      }else{
         entry = new SMemoryPoolEntry();
      }
      return entry;
   }
   MO.RMemory_entryFree = function RMemory_entryFree(entry){
      RAssert.debugNotNull(entry);
      entry.next = this._entryUnused;
      this._entryUnused = entry;
   }
   MO.RMemory_alloc = function RMemory_alloc(clazz){
      RAssert.debugNotNull(clazz);
      var className = RRuntime.className(clazz);
      var pools = this._pools;
      var pool = pools[className];
      if(!pool){
         pool = new TMemoryPool();
         pool._constructor = clazz;
         pools[className] = pool;
      }
      var value = pool.alloc();
      return value;
   }
   MO.RMemory_free = function RMemory_free(value){
      RAssert.debugNotNull(value);
      var pool = value.__pool;
      RAssert.debugNotNull(pool);
      pool.free(value);
   }
   MO.RMemory_refresh = function RMemory_refresh(){
      CollectGarbage();
   }
   MO.RMemory = new RMemory();
}
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
         RMemory.entryFree(unused);
      }else{
         value = new this._constructor();
         value.__pool = o;
         this._createCount++;
      }
      this._allocCount++;
      return value;
   }
   MO.TMemoryPool_free = function TMemoryPool_free(value){
      RAssert.debugNotNull(value);
      var entry = RMemory.entryAlloc();
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
         RMemory.entryFree(current);
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
      RMemory.free(entry);
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
      var entry = RMemory.alloc(SLooperEntry);
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
with(MO){
   MO.RGlobal = function RGlobal(){
      var o = this;
      o._instances = new TDictionary();
      o.get       = RGlobal_get;
      o.set       = RGlobal_set;
      o.globalGet = RGlobal_globalGet;
      o.globalSet = RGlobal_globalSet;
      return o;
   }
   MO.RGlobal_get = function RGlobal_get(name){
      return this._instances.get(name);
   }
   MO.RGlobal_set = function RGlobal_set(name, value){
      this._instances.set(name, value);
   }
   MO.RGlobal_globalGet = function RGlobal_globalGet(name){
      var value = null;
      if(top.MO.Global){
         value = top.MO.Global.get(name);
      }else{
         value = this._instances.get(name);
      }
      return value;
   }
   MO.RGlobal_globalSet = function RGlobal_globalSet(name, value){
      if(top.MO.Global){
         top.MO.Global.set(name, value);
      }else{
         this._instances.set(name, value);
      }
   }
   MO.RGlobal = new RGlobal();
}
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
      var ln = null;
      if(linker == null){
         if(RString.startsWith(n, '_')){
            ln = n.substring(1);
         }else{
            ln = n;
         }
         ln = RString.toUnderline(ln);
      }else{
         ln = linker;
      }
      o._linker = ln;
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
MO.EAnnotation = new function EAnnotation(){
   var o = this;
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
      for(var n in o.instance){
         var v = o.instance[n];
         if(v != null){
            if((v.constructor == Function) && v.__virtual){
               o._abstract = true;
               break;
            }
         }
      }
      var ps = o._annotations[EAnnotation.Property];
      if(ps){
         for(var n in ps){
            var p = ps[n];
            p.build(o.instance);
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
   MO.FObjectPool = function FObject(o){
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
      o.array1        = new Array(1);
      o.array2        = new Array(2);
      o.array3        = new Array(3);
      o.array4        = new Array(4);
      o.array9        = new Array(9);
      o.array12       = new Array(12);
      o.array16       = new Array(16);
      o.equals        = RArray_equals;
      o.count         = RArray_count;
      o.contains      = RArray_contains;
      o.find          = RArray_find;
      o.search        = RArray_search;
      o.reverse       = RArray_reverse;
      o.copy          = RArray_copy;
      o.move          = RArray_move;
      o.remove        = RArray_remove;
      o.sortPartition = RArray_sortPartition;
      o.sortArray     = RArray_sortArray;
      o.sort          = RArray_sort;
      o.nameMaxLength = RArray_nameMaxLength;
      return o;
   }
   MO.RArray_equals = function RArray_equals(s, t){
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
   MO.RArray_count = function RArray_count(a){
      var c = 0;
      for(var n in a){
         n++;
      }
      return c;
   }
   MO.RArray_contains = function RArray_contains(a, v){
      var c = a.length;
      for(var n = 0; n < c; n++){
         if(a[n] == v){
            return true;
         }
      }
      return false;
   }
   MO.RArray_find = function RArray_find(a, v){
      var c = a.length;
      for(var n = 0; n < c; n++){
         if(a[n] == v){
            return n;
         }
      }
      return -1;
   }
   MO.RArray_search = function RArray_search(a, v){
      for(var n in a){
         if(a[n] == v){
            return n;
         }
      }
      return null;
   }
   MO.RArray_reverse = function RArray_reverse(a, s, e){
      var c = (e + 1 - s) >> 1;
      for(var n = 0; n < c; n++){
         var t = a[s + n];
         a[s + n] = a[e - n];
         a[e - n] = t;
      }
   }
   MO.RArray_copy = function RArray_copy(s, t){
      for(var n in s){
         t[n] = s[n];
      }
   }
   MO.RArray_move = function RArray_move(a, f, c, t){
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
   MO.RArray_remove = function RArray_remove(a, n){
      return a.slice(0, n).concat(a.slice(n + 1));
   }
   MO.RArray_sortPartition = function RArray_sortPartition(a, l, r){
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
   MO.RArray_sortArray = function RArray_sortArray(a, s, e){
      if(s < e){
         var o = this;
         var p = o.sortPartition(a, s, e);
         o.sortArray(a, s, p - 1);
         o.sortArray(a, p + 1, e);
      }
   }
   MO.RArray_sort = function RArray_sort(a, t){
      var o = this;
      var c = a.length - 1;
      o.sortArray(a, 0, c);
      if(t){
         o.reverse(a, 0, c);
      }
      return a;
   }
   MO.RArray_nameMaxLength = function RArray_nameMaxLength(a){
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
      var o = this;
      o.format   = RBoolean_format;
      o.parse    = RBoolean_parse;
      o.toString = RBoolean_toString;
      return o;
   }
   MO.RBoolean_format = function RBoolean_format(v){
      return v ? EBoolean.True : EBoolean.False;
   }
   MO.RBoolean_parse = function RBoolean_parse(v){
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
   MO.RBoolean_toString = function RBoolean_toString(value, valueTrue, valueFalse){
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
      var o = this;
      o.copy = RByte_copy;
      return o;
   }
   MO.RByte_copy = function RByte_copy(po, poi, pi, pii, pc){
      for(var i = 0; i < pc; i++){
         po[poi++] = pi[pii++];
      }
   }
   MO.RByte = new RByte();
}
with(MO){
   MO.RChar = function RChar(){
      var o = this;
      o.parse    = RChar_parse;
      o.toString = RChar_toString;
      return o;
   }
   MO.RChar_parse = function RChar_parse(n){
      return String.fromCharCode(n);
   }
   MO.RChar_toString = function RChar_toString(v){
      return v;
   }
   MO.RChar = new RChar();
}
with(MO){
   MO.RClass = function RClass(){
      var o = this;
      o._codes         = new Array();
      o._classes       = new Object();
      o.isBase         = RClass_isBase;
      o.isBaseName     = RClass_isBaseName;
      o.isBaseDataName = RClass_isBaseDataName;
      o.isBaseType     = RClass_isBaseType;
      o.isBaseDataType = RClass_isBaseDataType;
      o.isName         = RClass_isName;
      o.isClass        = RClass_isClass;
      o.typeOf         = RClass_typeOf;
      o.safeTypeOf     = RClass_safeTypeOf;
      o.checkClass     = RClass_checkClass;
      o.code           = RClass_code;
      o.name           = RClass_name;
      o.inherits       = RClass_inherits;
      o.forName        = RClass_forName;
      o.find           = RClass_find;
      o.register       = RClass_register;
      o.createBase     = RClass_createBase;
      o.createClass    = RClass_createClass;
      o.create         = RClass_create;
      o.createByName   = RClass_createByName;
      o.innerCopy      = RClass_innerCopy;
      o.build          = RClass_build;
      o.free           = RClass_free;
      o.dump           = RClass_dump;
      return o;
   }
   MO.RClass_isBase = function RClass_isBase(v){
      if(v != null){
         var n = typeof(v);
         return RClass.isBaseName(n);
      }
      return false;
   }
   MO.RClass_isBaseName = function RClass_isBaseName(n){
      if(n != null){
         if(n == 'boolean'){
            return true;
         }else if(n == 'number'){
            return true;
         }else if(n == 'date'){
            return true;
         }else if(n == 'string'){
            return true;
         }else if(n == 'function'){
            return true;
         }
      }
      return false;
   }
   MO.RClass_isBaseDataName = function RClass_isBaseDataName(n){
      if(n != null){
         if(n == 'boolean'){
            return true;
         }else if(n == 'number'){
            return true;
         }else if(n == 'date'){
            return true;
         }else if(n == 'string'){
            return true;
         }
      }
      return false;
   }
   MO.RClass_isBaseType = function RClass_isBaseType(c){
      if(c != null){
         if(c == Boolean){
            return true;
         }else if(c == Number){
            return true;
         }else if(c == Date){
            return true;
         }else if(c == String){
            return true;
         }else if(c == Function){
            return true;
         }
      }
      return false;
   }
   MO.RClass_isBaseDataType = function RClass_isBaseDataType(c){
      if(c != null){
         if(c == Boolean){
            return true;
         }else if(c == Number){
            return true;
         }else if(c == Date){
            return true;
         }else if(c == String){
            return true;
         }
      }
      return false;
   }
   MO.RClass_isName = function RClass_isName(v, n){
      return (this.name(v) == n);
   }
   MO.RClass_isClass = function RClass_isClass(v, c){
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
   MO.RClass_typeOf = function RClass_typeOf(o){
      if(o && o.constructor){
         return RString.mid(o.constructor.toString(), 'function ', '(');
      }
      return 'Null';
   }
   MO.RClass_safeTypeOf = function RClass_safeTypeOf(v, safe){
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
   MO.RClass_checkClass = function RClass_checkClass(v, c){
      if(!this.isClass(v, c)){
         throw new Error('Invalid class ' + o.name(o) + '<>' + o.name(c));
      }
   }
   MO.RClass_code = function RClass_code(v){
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
   MO.RClass_name = function RClass_name(v){
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
   MO.RClass_inherits = function RClass_inherits(s, p){
      var r = RRuntime.nvl(p, s);
      r.__inherits = new Array();
      var a = arguments;
      var c = a.length;
      for(var i = 2; i < c; i++){
         r.__inherits.push(RMethod.name(a[i]));
      }
      return r;
   }
   MO.RClass_forName = function RClass_forName(n){
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
   MO.RClass_find = function RClass_find(v){
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
   MO.RClass_register = function RClass_register(v, a, r){
      var n = RMethod.name(v.constructor);
      this._classes[n].register(a);
      var v = a.value();
      return (v != null) ? v : r;
   }
   MO.RClass_createBase = function RClass_createBase(n){
      if(n){
         var s = 'function ' + n + '(){return this;} new ' + n + '();';
         return eval(s);
      }
      return null;
   }
   MO.RClass_createClass = function RClass_createClass(n){
      var o = this;
      var c = o._classes[n] = new TClass();
      c.name = n;
      c.base = o.createBase(n);
      c.clazz = new c.base.constructor();
      eval(n)(c.clazz);
      return c;
   }
   MO.RClass_create = function RClass_create(n){
      var o = this;
      var t = typeof(n);
      if(t == 'function'){
         n = RMethod.name(n);
      }else if(t != 'string'){
         RLogger.fatal(o, null, 'Param is invlid (name={1})', n);
      }
      return o.createByName(n);
   }
   MO.RClass_createByName = function RClass_createByName(n){
      var o = this;
      var c = o.forName(n);
      if(!c){
         RLogger.fatal(o, null, 'Cant find class. (name={1})', c);
      }
      return c.newInstance();
   }
   MO.RClass_innerCopy = function RClass_innerCopy(s, t){
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
   MO.RClass_build = function RClass_build(c){
      var sbs = c.clazz.__inherits;
      if(sbs && (sbs.constructor == Array)){
         var finded = false;
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            if(RString.startsWith(name, 'F')){
               if(finded){
                  RLogger.fatal(this, null, 'Parent class is too many. (name={1})', name);
               }
               c.parent = RClass.forName(name);
               finded = true;
            }
         }
      }
      var o = c.instance = new c.base.constructor();
      if(sbs && (sbs.constructor == Array)){
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            if(!RString.startsWith(name, 'F')){
               var m = RClass.forName(name);
               if(m == null){
                  RLogger.fatal(this, null, 'Parent class is not exists. (name={1})', name);
               }
               RClass.innerCopy(m.instance, o);
               c.assign(m);
            }
         }
      }
      if(c.parent){
         this.innerCopy(c.parent.instance, o);
         c.assign(c.parent);
      }
      if(!o.__base){
         o.__base = new TClassBase();
      }
      o.__base[c.name] = new c.base.constructor();
      var cf = c.clazz;
      for(var n in cf){
         if(n != '__base'){
            if((cf[n] == null) && (o[n] == null)){
               o[n] = null;
            }else if(cf[n] != null){
               if((o[n] == null) || ((o[n] != null) && cf[n] != o[n])){
                  o[n] = cf[n];
               }
            }
         }
      }
      if(sbs && (sbs.constructor == Array)){
         var sbl = sbs.length;
         for(var i = 0; i < sbl; i++){
            var name = sbs[i];
            var bcls = RClass.forName(name);
            var base = o.__base[name] = new bcls.base.constructor();
            var cf = bcls.instance;
            for(var n in cf){
               if(n != '__base'){
                  var cfn = cf[n];
                  var ofn = o[n];
                  if((cfn != null) && (ofn != null) && (cfn != ofn)){
                     if((cfn.constructor == Function) && (ofn.constructor == Function)){
                        base[n] = cf[n];
                     }
                  }
               }
            }
         }
      }
      c.build();
      if(RRuntime.isRelease()){
         for(var n in c.instance){
            var v = c.instance[n];
            if(v == null){
               delete c.instance[n];
            }
         }
      }
   }
   MO.RClass_free = function RClass_free(o){
      var c = o.__class;
      if(c){
         c.free(o);
      }
   }
   MO.RClass_dump = function RClass_dump(v){
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
}
with(MO){
   MO.RConsole = function RConsole(){
      var o = this;
      o.ConsolePreFix = 'console:';
      o._registers     = new TObjects();
      o._consoles      = new TDictionary();
      o._localConsoles = new TDictionary();
      o.initialize     = RConsole_initialize;
      o.register       = RConsole_register;
      o.create         = RConsole_create;
      o.createByName   = RConsole_createByName;
      o.get            = RConsole_get;
      o.find           = RConsole_find;
      o.release        = RConsole_release;
      return o;
   }
   MO.RConsole_initialize = function RConsole_initialize(){
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
   MO.RConsole_register = function RConsole_register(p){
      this._registers.push(p);
   }
   MO.RConsole_create = function RConsole_create(n){
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
   MO.RConsole_createByName = function RConsole_createByName(n){
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
   MO.RConsole_get = function RConsole_get(v){
      var o = this;
      var n = RClass.name(v);
      var r = o._consoles.get(n);
      return r;
   }
   MO.RConsole_find = function RConsole_find(v){
      var o = this;
      var n = null;
      if(v.constructor = String){
         n = RClass.name(v);
      }else if(v.constructor == Function){
         n = v;
      }else{
         return RLogger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
      }
      var r = RGlobal.get(o.ConsolePreFix + n);
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
            r = top.RConsole.createByName(n);
            RGlobal.set(o.ConsolePreFix + n, r);
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
   MO.RConsole_release = function RConsole_release(){
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
      o.nvl           = RDate_nvl;
      o.make          = RDate_make;
      o.format        = RDate_format;
      o.formatDate    = RDate_formatDate;
      o.formatText    = RDate_formatText;
      o.monthDays     = RDate_monthDays;
      o.splitFormat   = RDate_splitFormat;
      o.makeDate      = RDate_makeDate;
      o.checkItems    = RDate_checkItems;
      o.check         = RDate_check;
      o.parse         = RDate_parse;
      o.splitDate     = RDate_splitDate;
      o.splitTime     = RDate_splitTime;
      o.autoParse     = RDate_autoParse;
      o.getFormat     = RDate_getFormat;
      return o;
   }
   MO.RDate_nvl = function RDate_nvl(o){
      return o ? o : new TDate();
   }
   MO.RDate_make = function RDate_make(yyyy, mm, dd, hh, mi, ss){
      return new TDate(new Date(yyyy, mm, dd));
   }
   MO.RDate_format = function RDate_format(fmt){
      return this.formatDate(new TDate(), fmt);
   }
   MO.RDate_formatText = function RDate_formatText(v, f){
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
   MO.RDate_formatDate = function RDate_formatDate(date, fmt){
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
   MO.RDate_monthDays = function RDate_monthDays(year, month){
      if(!year || !month){return 0;}
      year = parseInt(year);
      month = parseInt(month);
      this.MonthDays[2] = (((year%4 == 0) || (year%400 == 0)) && (year%100 != 0)) ? 29 : 28 ;
      return this.MonthDays[month];
   }
   MO.RDate_splitFormat = function RDate_splitFormat(v, f){
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
   MO.RDate_checkItems = function RDate_checkItems(items){
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
   MO.RDate_check = function RDate_check(value, format){
      return this.checkItems(this.splitFormat(value, format));
   }
   MO.RDate_makeDate = function RDate_makeDate(date, da){
      var d = new Date(RInteger.parse(da.year), RInteger.parse(da.month)-1, RInteger.parse(da.day), RInteger.parse(da.hour), RInteger.parse(da.minute), RInteger.parse(da.second), RInteger.parse(da.ms));
      if(date){
         date.setDate(d);
         return date;
      }
      return new TDate(d);
   }
   MO.RDate_parse = function RDate_parse(date, value, format){
      if(!format){
         format = this.DataFormat;
      }
      var items = this.splitFormat(value, format);
      if(this.checkItems(items)){
         return this.makeDate(date, items);
      }
      return null;
   }
   MO.RDate_splitDate = function RDate_splitDate(da, value){
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
   MO.RDate_splitTime = function RDate_splitTime(da, value){
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
   MO.RDate_autoParse = function RDate_autoParse(d, v){
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
   MO.RDate_getFormat = function RDate_getFormat(value){
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
      var o = this;
      o.contains  = REnum_contains;
      o.tryEncode = REnum_tryEncode;
      o.encode    = REnum_encode;
      o.tryDecode = REnum_tryDecode;
      o.decode    = REnum_decode;
      o.parse     = REnum_encode;
      o.format    = REnum_decode;
      return o;
   }
   MO.REnum_contains = function REnum_contains(){
   }
   MO.REnum_tryEncode = function REnum_tryEncode(e, v, d){
      if(e != null){
         for(var n in e){
            if(n.toLowerCase() == v.toLowerCase()){
               return e[n];
            }
         }
      }
      return d;
   }
   MO.REnum_encode = function REnum_encode(e, v){
      var o = this;
      var r = o.tryEncode(e, v);
      if(r == null){
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
      }
      return r;
   }
   MO.REnum_tryDecode = function REnum_tryDecode(e, v, d){
      if(e != null){
         for(var n in e){
            if(e[n] == v){
               return n;
            }
         }
      }
      return d;
   }
   MO.REnum_decode = function REnum_decode(e, v){
      var o = this;
      var r = o.tryDecode(e, v);
      if(r == null){
         throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
      }
      return r;
   }
   MO.REnum = new REnum();
}
with(MO){
   MO.RFile = function RFile(){
      var o = this;
      o.pictures  = ['jpg', 'png', 'gif', 'bmp'];
      o.knowns    = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
      o.inPicture = RFile_inPicture;
      o.isPicture = RFile_isPicture;
      o.isKnown   = RFile_isKnown;
      o.name      = RFile_name;
      o.extension = RFile_extension;
      return o;
   }
   MO.RFile_inPicture = function RFile_inPicture(v){
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
   MO.RFile_isPicture = function RFile_isPicture(v){
      return this.inPicture(this.extension(v));
   }
   MO.RFile_isKnown = function RFile_isKnown(v){
      var o = this;
      v = o.extension(v).toLowerCase();
      for(var n in o.knowns){
         if(o.knowns[n] == v){
            return true;
         }
      }
      return false;
   }
   MO.RFile_name = function RFile_name(value){
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
   MO.RFile_extension = function RFile_extension(v){
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
      o.isFloat   = RFloat_isFloat;
      o.parse     = RFloat_parse;
      o.format    = RFloat_format;
      o.nvl       = RFloat_nvl;
      o.toRange   = RFloat_toRange;
      o.sum       = RFloat_sum;
      o.calculate = RFloat_calculate;
      o.attach    = RFloat_attach;
      o.fill      = RFloat_fill;
      o.copy      = RFloat_copy;
      return o;
   }
   MO.RFloat_isFloat = function RFloat_isFloat(p){
      return RString.isPattern(p, 'n');
   }
   MO.RFloat_parse = function RFloat_parse(source){
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
   MO.RFloat_format = function RFloat_format(v, l, lp, r, rp){
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
   MO.RFloat_nvl = function RFloat_nvl(v, d){
      return v ? v : (d ? d : 0);
   }
   MO.RFloat_toRange = function RFloat_toRange(v, i, a){
      if(v == null){
         v = 0;
      }
      return Math.min(Math.max(v, i), a);
   }
   MO.RFloat_sum = function RFloat_sum(){
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
   MO.RFloat_calculate = function RFloat_calculate(f,a,b){
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
   MO.RFloat_attach = function RFloat_attach(t, s, c){
      var r = false;
      for(var i = 0; i < c; i++){
         if(t[i] != s[i]){
            t[i] = s[i];
            r = true;
         }
      }
      return r;
   }
   MO.RFloat_fill = function RFloat_fill(d, i, c, v){
      for(var n = 0; n < c; n++){
         d[i++] = v;
      }
   }
   MO.RFloat_copy = function RFloat_copy(po, poi, pi, pii, pc){
      for(var i = 0; i < pc; i++){
         po[poi++] = pi[pii++];
      }
   }
   MO.RFloat = new RFloat();
}
with(MO){
   MO.RHex = function RHex(){
      var o = this;
      o.NUMBER  = '0x123456789ABCDEF';
      o.PAD     = '0';
      o.isValid = RHex_isValid;
      o.parse   = RHex_parse;
      o.format  = RHex_format;
      return o;
   }
   MO.RHex_isValid = function RHex_isValid(p){
      return RString.isPattern(p, this.NUMBER);
   }
   MO.RHex_parse = function RHex_parse(p){
      return p ? parseInt('0x' + p) : '0';
   }
   MO.RHex_format = function RHex_format(v, l){
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
      o.pool   = RInstance_pool;
      o.get    = RInstance_get;
      o.alloc  = RInstance_alloc;
      o.free   = RInstance_free;
      return o;
   }
   MO.RInstance_pool = function RInstance_pool(p){
      var o = this;
      var n = RClass.name(p);
      var v = o._pools.get(n);
      if(v == null){
         v = new TInstancePool();
         o._pools.set(n, v);
      }
      return v;
   }
   MO.RInstance_get = function RInstance_get(p){
      return this.pool(p).instance(p);
   }
   MO.RInstance_alloc = function RInstance_alloc(n){
      return this.pool(p).alloc(p);
   }
   MO.RInstance_free = function RInstance_free(n){
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
      o.isInt      = RInteger_isInt;
      o.isInteger  = RInteger_isInt;
      o.nvl        = RInteger_nvl;
      o.strideByte = RInteger_strideByte;
      o.strideBit  = RInteger_strideBit;
      o.parse      = RInteger_parse;
      o.format     = RInteger_format;
      o.toRange    = RInteger_toRange;
      o.pow2       = RInteger_pow2;
      o.sum        = RInteger_sum;
      o.calculate  = RInteger_calculate;
      o.copy       = RInteger_copy;
      o.toString   = RInteger_toString;
      return o;
   }
   MO.RInteger_isInt = function RInteger_isInt(v){
      return RString.isPattern(v, 'n');
   }
   MO.RInteger_nvl = function RInteger_nvl(v, d){
      return v ? v : (d ? d : 0);
   }
   MO.RInteger_strideByte = function RInteger_strideByte(value){
      if(value > 65535){
         return 4;
      }else if(value > 255){
         return 2;
      }else{
         return 1;
      }
   }
   MO.RInteger_strideBit = function RInteger_strideBit(value){
      if(value > 65535){
         return 32;
      }else if(value > 255){
         return 16;
      }else{
         return 8;
      }
   }
   MO.RInteger_parse = function RInteger_parse(v, d){
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
   MO.RInteger_format = function RInteger_format(v, l, p){
      if(!p){
         p = this.LEFT_CHAR;
      }
      var v = v.toString();
      for(var i = parseInt(l) - v.length - 1; i >= 0; i--){
         v = p + v;
      }
      return v;
   }
   MO.RInteger_toRange = function RInteger_toRange(value, min, max){
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
   MO.RInteger_pow2 = function RInteger_pow2(value){
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
   MO.RInteger_sum = function RInteger_sum(){
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
   MO.RInteger_calculate = function RInteger_calculate(f, a, b){
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
   MO.RInteger_copy = function RInteger_copy(po, poi, pi, pii, pc){
      for(var i = 0; i < pc; i++){
         po[poi++] = pi[pii++];
      }
   }
   MO.RInteger_toString = function RInteger_toString(p){
      return (p == null) ? '0' : p.toString();
   }
   MO.RInteger = new RInteger();
}
with(MO){
   MO.RJson = function RJson(){
      var o = this;
      o.parse    = RJson_parse;
      o.toString = RJson_toString;
      return o;
   }
   MO.RJson_parse = function RJson_parse(value, clazz){
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
   MO.RJson_toString = function RJson_toString(value){
      return JSON.stringify(value);
   }
   MO.RJson = new RJson();
}
with(MO){
   MO.RLogger = function RLogger(){
      var o = this;
      o._statusError = false;
      o._labelLength = 40;
      o.lsnsOutput   = new TListeners();
      o.output       = RLogger_output;
      o.debug        = RLogger_debug;
      o.info         = RLogger_info;
      o.warn         = RLogger_warn;
      o.error        = RLogger_error;
      o.fatal        = RLogger_fatal;
      o.show         = RLogger_show;
      return o;
   }
   MO.RLogger_output = function RLogger_output(s, p){
      this.lsnsOutput.process(s, p);
   }
   MO.RLogger_debug = function RLogger_debug(sf, ms, pm){
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
   MO.RLogger_info = function RLogger_info(sf, ms, pm){
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
   MO.RLogger_warn = function RLogger_warn(sf, ms, pm){
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
   MO.RLogger_error = function RLogger_error(sf, ms, pm){
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
   MO.RLogger_fatal = function RLogger_fatal(sf, er, ms, pm){
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
   MO.RLogger_show = function RLogger_show(sf, ms, pm){
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
      o._virtuals  = new Object();
      o.isFunction = RMethod_isFunction;
      o.isEmpty    = RMethod_isEmpty;
      o.isVirtual  = RMethod_isVirtual;
      o.name       = RMethod_name;
      o.fullName   = RMethod_fullName;
      o.empty      = RMethod_empty;
      o.emptyTrue  = RMethod_emptyTrue;
      o.emptyFalse = RMethod_emptyFalse;
      o.emptyCall  = RMethod_emptyCall;
      o.virtual    = RMethod_virtual;
      o.empty.__empty = true;
      o.emptyTrue.__empty = true;
      o.emptyFalse.__empty = true;
      return o;
   }
   MO.RMethod_isFunction = function RMethod_isFunction(v){
      return typeof(v) == 'function';
   }
   MO.RMethod_isEmpty = function RMethod_isEmpty(v){
      return (v && v.__empty);
   }
   MO.RMethod_isVirtual = function RMethod_isVirtual(v){
      return (v && v.__virtual);
   }
   MO.RMethod_name = function RMethod_name(value){
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
   MO.RMethod_fullName = function RMethod_fullName(p){
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
   MO.RMethod_empty = function RMethod_empty(){
   }
   MO.RMethod_emptyTrue = function RMethod_emptyTrue(){
      return true;
   }
   MO.RMethod_emptyFalse = function RMethod_emptyFalse(){
      return false;
   }
   MO.RMethod_emptyCall = function RMethod_emptyCall(){
   }
   MO.RMethod_virtual = function RMethod_virtual(v, m){
      var o = this;
      var n = RClass.name(v) + '.' + m;
      if(o._virtuals[n]){
         return o._virtuals[n];
      }
      var f = function(){throw new Error('Virtual method be called.(' + n + ')');};
      f.__virtual = true;
      f.__name = n;
      o._virtuals[n] = f;
      return f;
   }
   MO.RMethod = new RMethod();
}
with(MO){
   MO.RObject = function RObject(){
      var o = this;
      o._hash   = 1;
      o.nextId  = RObject_nextId;
      o.nvl     = RObject_nvl;
      o.clone   = RObject_clone;
      o.copy    = RObject_copy;
      o.free    = RObject_free;
      o.dispose = RObject_dispose;
      o.release = RObject_release;
      return o;
   }
   MO.RObject_nextId = function RObject_nextId(v){
      return this._hash++;
   }
   MO.RObject_nvl = function RObject_nvl(v){
      var a = arguments;
      var c = a.length;
      for(var n = 0; n < c; n++){
         if(a[n] != null){
            return a[n];
         }
      }
      return null;
   }
   MO.RObject_clone = function RObject_clone(o){
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
   MO.RObject_copy = function RObject_copy(s, t){
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
   MO.RObject_free = function RObject_free(item){
      if(item){
         if(RRuntime.isDebug()){
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
   MO.RObject_dispose = function RObject_dispose(item){
      if(item){
         if(!item.__dispose){
            item.dispose();
         }
      }
      return null;
   }
   MO.RObject_release = function RObject_release(item){
      if(item){
         for(var n in p){
            var value = item[n];
            if(typeof(value) == 'Object'){
               RObject.release(value)
            }
            item[n] = null;
         }
      }
   }
   MO.RObject = new RObject();
}
with(MO){
   MO.RRect = function RRect(){
      var o = this;
      o.nvl    = RRect_nvl;
      o.pack   = RRect_pack;
      o.unpack = RRect_unpack;
      return o;
   }
   MO.RRect_nvl = function RRect_nvl(rect){
      return rect ? rect : new TRect();
   }
   MO.RRect_pack = function RRect_pack(rect){
      var pack = null;
      if(rect){
         pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
      }
      return pack;
   }
   MO.RRect_unpack = function RRect_unpack(pack, rect){
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
      var o = this;
      o.test      = RRegExp_test;
      o.testRgexp = RRegExp_testRgexp;
      return o;
   }
   MO.RRegExp_test = function RRegExp_test(r,s){
      if(r && s != null){
         return r.test(s);
      }
      return false;
   }
   MO.RRegExp_testRgexp = function RRegExp_testRgexp(eps,s){
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
      var o = this;
      o.contains       = RSet_contains;
      o.containsString = RSet_containsString;
      return o;
   }
   MO.RSet_contains = function RSet_contains(v, d){
      return (v & d) == d;
   }
   MO.RSet_containsString = function RSet_containsString(v, d){
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
      o.EMPTY        = '';
      o.SPACE        = '   ';
      o.PAD          = ' ';
      o.TRIM         = ' \t\r\n';
      o.LOWER        = 'abcdefghijklmnopqrstuvwxyz';
      o.UPPER        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      o.CodeLowerA   = 'a'.charCodeAt(0);
      o.CodeLowerZ   = 'z'.charCodeAt(0);
      o.CodeUpperA   = 'A'.charCodeAt(0);
      o.CodeUpperZ   = 'Z'.charCodeAt(0);
      o.isEmpty      = RString_isEmpty;
      o.isBlank      = RString_isBlank;
      o.isAnsi       = RString_isAnsi;
      o.isDbcs       = RString_isDbcs;
      o.isPattern    = RString_isPattern;
      o.inChars      = RString_inChars;
      o.contains     = RString_contains;
      o.equals       = RString_equals;
      o.startsWith   = RString_startsWith;
      o.endsWith     = RString_endsWith;
      o.findChars    = RString_findChars;
      o.inRange      = RString_inRange;
      o.nvl          = RString_nvl;
      o.nvlString    = RString_nvlString;
      o.empty        = RString_empty;
      o.firstUpper   = RString_firstUpper;
      o.firstLower   = RString_firstLower;
      o.firstLine    = RString_firstLine;
      o.format       = RString_format;
      o.formatLines  = RString_formatLines;
      o.repeat       = RString_repeat;
      o.pad          = RString_pad;
      o.lpad         = RString_lpad;
      o.rpad         = RString_rpad;
      o.trim         = RString_trim;
      o.ltrim        = RString_ltrim;
      o.rtrim        = RString_rtrim;
      o.mid          = RString_mid;
      o.toLine       = RString_toLine;
      o.toUnderline  = RString_toUnderline;
      o.toLower      = RString_toLower;
      o.toUpper      = RString_toUpper;
      o.split        = RString_split;
      o.splitTwo     = RString_splitTwo;
      o.splitParts   = RString_splitParts;
      o.splitPattern = RString_splitPattern;
      o.replace      = RString_replace;
      o.replaceChar  = RString_replaceChar;
      o.remove       = RString_remove;
      o.removeChars  = RString_removeChars;
      return o;
   }
   MO.RString_isEmpty = function RString_isEmpty(v){
      if(v != null){
         return (v.length == 0);
      }
      return true;
   }
   MO.RString_isBlank = function RString_isBlank(v){
      if(v != null){
         return (v.trim().length == 0);
      }
      return true;
   }
   MO.RString_isAnsi = function RString_isAnsi(v){
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
   MO.RString_isDbcs = function RString_isDbcs(v){
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
   MO.RString_isPattern = function RString_isPattern(v, p){
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
   MO.RString_inChars = function RString_inChars(v, p){
      var o = this;
      var b = o.findChars(p, v);
      if(b != -1){
         return true;
      }
      return false;
   }
   MO.RString_contains = function RString_contains(v, s){
      if((v != null) && (s != null)){
         return (v.toString().indexOf(s) != -1);
      }
      return false;
   }
   MO.RString_equals = function RString_equals(s, t, f){
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
   MO.RString_startsWith = function RString_startsWith(v, s){
      if(s == null){
         return true;
      }
      return (v != null) ? (v.indexOf(s) == 0) : false;
   }
   MO.RString_endsWith = function RString_endsWith(v, s){
      if(s == null){
         return true;
      }
      var n = (v != null) ? v.indexOf(s) : -1;
      return (n != -1) ? (n == (v.length - s.length)) : false;
   }
   MO.RString_findChars = function RString_findChars(v, s){
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
   MO.RString_inRange = function RString_inRange(v, rs, f){
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
   MO.RString_nvl = function RString_nvl(v, d){
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
   MO.RString_nvlString = function RString_nvlString(p){
      if(p == null){
         p = new TString();
      }
      return p;
   }
   MO.RString_empty = function RString_empty(v){
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
   MO.RString_firstUpper = function RString_firstUpper(v){
      return (v != null) ? v.charAt(0).toUpperCase() + v.substr(1) : v;
   }
   MO.RString_firstLower = function RString_firstLower(){
      return (v != null) ? v.charAt(0).toLowerCase() + v.substr(1) : v;
   }
   MO.RString_firstLine = function RString_firstLine(v){
      if(v){
         var n = Math.min(v.indexOf('\r'), v.indexOf('\n'));
         if(-1 != n){
            return v.substr(0, n);
         }
         return v;
      }
      return '';
   }
   MO.RString_format = function RString_format(s, p){
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
   MO.RString_formatLines = function RString_formatLines(p){
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
   MO.RString_repeat = function RString_repeat(v, c){
      return new Array(c + 1).join(v);
   }
   MO.RString_pad = function RString_pad(v, l, p){
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
   MO.RString_lpad = function RString_lpad(v, l, p){
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
   MO.RString_rpad = function RString_rpad(v, l, p){
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
   MO.RString_trim = function RString_trim(v, ts){
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
   MO.RString_ltrim = function RString_ltrim(v, ts){
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
   MO.RString_rtrim = function RString_rtrim(v, ts){
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
   MO.RString_mid = function RString_mid(v, b, e){
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
   MO.RString_toLine = function RString_toLine(v){
      return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
   }
   MO.RString_toUnderline = function RString_toUnderline(v){
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
   MO.RString_toLower = function RString_toLower(v){
      return (v != null) ? v.toLowerCase() : this.EMPTY;
   }
   MO.RString_toUpper = function RString_toUpper(v){
      return (v != null) ? v.toUpperCase() : this.EMPTY;
   }
   MO.RString_split = function RString_split(s, p){
      return (s && p) ? s.split(p) : null;
   }
   MO.RString_splitTwo = function RString_splitTwo(s, p){
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
   MO.RString_splitParts = function RString_splitParts(s, p){
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
   MO.RString_splitPattern = function RString_splitPattern(s, p){
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
   MO.RString_replace = function RString_replace(v, s, t){
      return v.replace(new RegExp(s, 'g'), t);
   }
   MO.RString_replaceChar = function RString_replaceChar(v, s, t){
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
   MO.RString_remove = function RString_remove(s, t){
      return s.replace(t, '');
   }
   MO.RString_removeChars = function RString_removeChars(v, s){
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
      o.setup      = RTimer_setup;
      o.now        = RTimer_now;
      o.current    = RTimer_current;
      o.rate       = RTimer_rate;
      o.update     = RTimer_update;
      return o;
   }
   MO.RTimer_setup = function RTimer_setup(){
      var o = this;
      var n = new Date().getTime();
      o._startTime = n;
      o._lastTime = n;
   }
   MO.RTimer_now = function RTimer_now(){
      return new Date().getTime();
   }
   MO.RTimer_current = function RTimer_current(){
      return this._lastTime;
   }
   MO.RTimer_rate = function RTimer_rate(){
      var o = this;
      if(o._count == 0){
         return 0;
      }
      var t = o._lastTime - o._startTime;
      var c = o._count * 1000 / t;
      return parseInt(c);
   }
   MO.RTimer_update = function RTimer_update(){
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
      o.update        = SOutline3d_update;
      o.calculateFrom = SOutline3d_calculateFrom;
      o.calculate     = SOutline3d_calculate;
      return o;
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
      o.x           = RRuntime.nvl(x, 0);
      o.y           = RRuntime.nvl(y, 0);
      o.z           = RRuntime.nvl(z, 0);
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
   MO.SValue3 = function SValue4(x, y, z, w){
      var o = this;
      o.x           = RRuntime.nvl(x, 0);
      o.y           = RRuntime.nvl(y, 0);
      o.z           = RRuntime.nvl(z, 0);
      o.w           = RRuntime.nvl(w, 1);
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
with(MO){
   MO.AStyle = function AStyle(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._duplicate    = true;
      o._style        = s;
      o.code          = AStyle_code;
      o.style         = AStyle_style;
      o.build         = AStyle_build;
      o.toString      = AStyle_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyle_code = function AStyle_code(){
      return this._style;
   }
   MO.AStyle_style = function AStyle_style(){
      return this._style;
   }
   MO.AStyle_build = function AStyle_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyle_toString = function AStyle_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
with(MO){
   MO.AStyleIcon = function AStyleIcon(n, s){
      var o = this;
      AAnnotation.call(o, n);
      o._annotationCd = EAnnotation.Style;
      o._style        = s;
      o.code          = AStyleIcon_code;
      o.style         = AStyleIcon_style;
      o.build         = AStyleIcon_build;
      o.toString      = AStyleIcon_toString;
      if(s == null){
         var v = null;
         if(RString.startsWith(n, '_style')){
            v = n.substring(6);
         }else if(RString.startsWith(n, 'style')){
            v = n.substring(5);
         }
         if(v == null){
            throw new TError('Style name is empty.');
         }
         o._style = v;
      }
      return o;
   }
   MO.AStyleIcon_code = function AStyleIcon_code(){
      return this._style;
   }
   MO.AStyleIcon_style = function AStyleIcon_style(){
      return this._style;
   }
   MO.AStyleIcon_build = function AStyleIcon_build(v){
      var o = this;
      v[o._name] = null;
   }
   MO.AStyleIcon_toString = function AStyleIcon_toString(){
      var o = this;
      return 'style=' + o._style;
   }
}
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown     = 0;
   o.Load        = 1;
   o.Process     = 2;
   o.EnterFrame  = 3;
   o.LeaveFrame  = 4;
   o.Enter       = 5;
   o.Leave       = 6;
   o.Focus       = 7;
   o.Blur        = 8;
   o.Click       = 9;
   o.DoubleClick = 10;
   o.ItemClick   = 11;
   o.Selected    = 12;
   o.DataChanged = 13;
   o.Result      = 14;
   o.TouchZoom   = 'touch.zoom';
   return o;
}
MO.EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
MO.EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
MO.EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Uninitialized = 0;
   o.Open          = 1;
   o.Send          = 2;
   o.Receiving     = 3;
   o.Loaded        = 4;
   return o;
}
MO.EKeyCode = new function EKeyCode(){
   var o = this;
   o.None      = 0;
   o.Esc       = 27;
   o.Tab       = 9;
   o.Enter     = 13;
   o.Shift     = 16;
   o.Alt       = 18;
   o.Ctrl      = 17;
   o.BackSpace = 8;
   o.Space     = 32;
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   o.Insert    = 45;
   o.Delete    = 46;
   o.Home      = 36;
   o.End       = 35;
   o.PageUp    = 33;
   o.PageDown  = 34;
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   o.N0        = 48;
   o.N1        = 49;
   o.N2        = 50;
   o.N3        = 51;
   o.N4        = 52;
   o.N5        = 53;
   o.N6        = 54;
   o.N7        = 55;
   o.N8        = 56;
   o.N9        = 57;
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   var f = o.integerCodes  = new Object();
   f[45] = true;
   f[190] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   var f = o.floatCodes  = new Object();
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   return o;
}
MO.EKeyStatus = new function EKeyStatus(){
   var o = this;
   o.Normal = 0;
   o.Press  = 1;
   return o;
}
MO.EMouseButton = new function EMouseButton(){
   var o = this;
   o.Left   = 0;
   o.Right  = 2;
   o.Middle = 3;
   return o;
}
MO.EMouseCursor = new function EMouseCursor(){
   var o = this;
   o.HSize = 'E-resize';
   o.VSize = 'N-resize';
   return o;
}
MO.EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
with(MO){
   MO.MAttributeCode = function MAttributeCode(o){
      o = RClass.inherits(this, o);
      o._code   = null;
      o.isCode  = MAttributeCode_isCode;
      o.code    = MAttributeCode_code;
      o.setCode = MAttributeCode_setCode;
      return o;
   }
   MO.MAttributeCode_isCode = function MAttributeCode_isCode(code){
      return this._code == code;
   }
   MO.MAttributeCode_code = function MAttributeCode_code(){
      return this._code;
   }
   MO.MAttributeCode_setCode = function MAttributeCode_setCode(code){
      this._code = code;
   }
}
with(MO){
   MO.MAttributeGuid = function MAttributeGuid(o){
      o = RClass.inherits(this, o);
      o._guid   = null;
      o.guid    = MAttributeGuid_guid;
      o.setGuid = MAttributeGuid_setGuid;
      return o;
   }
   MO.MAttributeGuid_guid = function MAttributeGuid_guid(){
      return this._guid;
   }
   MO.MAttributeGuid_setGuid = function MAttributeGuid_setGuid(guid){
      this._guid = guid;
   }
}
with(MO){
   MO.MAttributeLabel = function MAttributeLabel(o){
      o = RClass.inherits(this, o);
      o._label   = null;
      o.label    = MAttributeLabel_label;
      o.setLabel = MAttributeLabel_setLabel;
      return o;
   }
   MO.MAttributeLabel_label = function MAttributeLabel_label(){
      return this._label;
   }
   MO.MAttributeLabel_setLabel = function MAttributeLabel_setLabel(label){
      this._label = label;
   }
}
with(MO){
   MO.MAttributeName = function MAttributeName(o){
      o = RClass.inherits(this, o);
      o._name   = null;
      o.name    = MAttributeName_name;
      o.setName = MAttributeName_setName;
      return o;
   }
   MO.MAttributeName_name = function MAttributeName_name(){
      return this._name;
   }
   MO.MAttributeName_setName = function MAttributeName_setName(name){
      this._name = name;
   }
}
with(MO){
   MO.MAttributeParent = function MAttributeParent(o){
      o = RClass.inherits(this, o);
      o._parent    = null;
      o.parent     = MAttributeParent_parent;
      o.findParent = MAttributeParent_findParent;
      o.setParent  = MAttributeParent_setParent;
      o.dispose    = MAttributeParent_dispose;
      return o;
   }
   MO.MAttributeParent_parent = function MAttributeParent_parent(){
      return this._parent;
   }
   MO.MAttributeParent_findParent = function MAttributeParent_findParent(clazz){
      var find = this;
      if(clazz){
         while(RClass.isClass(find._parent, clazz)){
            find = find._parent;
         }
      }else{
         while(find._parent){
            find = find._parent;
         }
      }
      return find;
   }
   MO.MAttributeParent_setParent = function MAttributeParent_setParent(parent){
      this._parent = parent;
   }
   MO.MAttributeParent_dispose = function MAttributeParent_dispose(){
      var o = this;
      o._parent = null;
   }
}
with(MO){
   MO.MClone = function MClone(o){
      o = RClass.inherits(this, o);
      o.clone  = MClone_clone;
      return o;
   }
   MO.MClone_clone = function MClone_clone(){
      var o = this;
      var r = RClass.create(o.constructor);
      for(var n in o){
         v = o[n];
         if(v != null){
            if(!RClass.isBaseDataType(v.constructor)){
               r[n] = v.clone();
            }
         }
         r[n] = v;
      }
      return r;
   }
}
with(MO){
   MO.MDataStream = function MDataStream(o){
      o = RClass.inherits(this, o);
      o._viewer      = null;
      o._endianCd    = false;
      o._position    = 0;
      o.testString   = MDataStream_testString;
      o.readBoolean  = MDataStream_readBoolean;
      o.readInt8     = MDataStream_readInt8;
      o.readInt16    = MDataStream_readInt16;
      o.readInt32    = MDataStream_readInt32;
      o.readInt64    = MDataStream_readInt64;
      o.readUint8    = MDataStream_readUint8;
      o.readUint16   = MDataStream_readUint16;
      o.readUint32   = MDataStream_readUint32;
      o.readUint64   = MDataStream_readUint64;
      o.readFloat    = MDataStream_readFloat;
      o.readDouble   = MDataStream_readDouble;
      o.readString   = MDataStream_readString;
      o.readData     = MDataStream_readData;
      o.readBytes    = MDataStream_readBytes;
      o.writeBoolean = MDataStream_writeBoolean;
      o.writeInt8    = MDataStream_writeInt8;
      o.writeInt16   = MDataStream_writeInt16;
      o.writeInt32   = MDataStream_writeInt32;
      o.writeInt64   = MDataStream_writeInt64;
      o.writeUint8   = MDataStream_writeUint8;
      o.writeUint16  = MDataStream_writeUint16;
      o.writeUint32  = MDataStream_writeUint32;
      o.writeUint64  = MDataStream_writeUint64;
      o.writeFloat   = MDataStream_writeFloat;
      o.writeDouble  = MDataStream_writeDouble;
      o.writeString  = MDataStream_writeString;
      o.writeBytes   = MDataStream_writeBytes;
      return o;
   }
   MO.MDataStream_testString = function MDataStream_testString(){
      var o = this;
      var position = o._position;
      var length = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      var result = new TString();
      for(var i = 0; i < length; i++){
         var value = o._viewer.getUint16(position, o._endianCd);
         position += 2;
         result.push(String.fromCharCode(value));
      }
      return result.toString();
   }
   MO.MDataStream_readBoolean = function MDataStream_readBoolean(){
      var o = this;
      var value = o._viewer.getInt8(o._position, o._endianCd);
      o._position++;
      return value > 0;
   }
   MO.MDataStream_readInt8 = function MDataStream_readInt8(){
      var o = this;
      var value = o._viewer.getInt8(o._position, o._endianCd);
      o._position++;
      return value;
   }
   MO.MDataStream_readInt16 = function MDataStream_readInt16(){
      var o = this;
      var value = o._viewer.getInt16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }
   MO.MDataStream_readInt32 = function MDataStream_readInt32(){
      var o = this;
      var value = o._viewer.getInt32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readInt64 = function MDataStream_readInt64(){
      var o = this;
      var value = o._viewer.getInt64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readUint8 = function MDataStream_readUint8(){
      var o = this;
      var value = o._viewer.getUint8(o._position, o._endianCd);
      o._position += 1;
      return value;
   }
   MO.MDataStream_readUint16 = function MDataStream_readUint16(){
      var o = this;
      var value = o._viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      return value;
   }
   MO.MDataStream_readUint32 = function MDataStream_readUint32(){
      var o = this;
      var value = o._viewer.getUint32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readUint64 = function MDataStream_readUint64(){
      var o = this;
      var value = o._viewer.getUint64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readFloat = function MDataStream_readFloat(){
      var o = this;
      var value = o._viewer.getFloat32(o._position, o._endianCd);
      o._position += 4;
      return value;
   }
   MO.MDataStream_readDouble = function MDataStream_readDouble(){
      var o = this;
      var value = o._viewer.getFloat64(o._position, o._endianCd);
      o._position += 8;
      return value;
   }
   MO.MDataStream_readString = function MDataStream_readString(){
      var o = this;
      var viewer = o._viewer;
      var endianCd = o._endianCd;
      var position = o._position;
      var length = viewer.getUint16(position, endianCd);
      position += 2;
      var value = new TString();
      for(var i = 0; i < length; i++){
         var character = viewer.getUint16(position, endianCd);
         value.push(String.fromCharCode(character));
         position += 2;
      }
      o._position = position;
      return value.flush();
   }
   MO.MDataStream_readData = function MDataStream_readData(dataCd){
      var o = this;
      switch(dataCd){
         case EDataType.Int8:
            return o.readInt8();
         case EDataType.Int16:
            return o.readInt16();
         case EDataType.Int32:
            return o.readInt32();
         case EDataType.Int64:
            return o.readInt64();
         case EDataType.Uint8:
            return o.readUint8();
         case EDataType.Uint16:
            return o.readUint16();
         case EDataType.Uint32:
            return o.readUint32();
         case EDataType.Uint64:
            return o.readUint64();
         case EDataType.Float32:
            return o.readFloat();
         case EDataType.Float64:
            return o.readDouble();
         case EDataType.String:
            return o.readString();
      }
      throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
   }
   MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
      var o = this;
      var viewer = o._viewer;
      if(length <= 0){
         return;
      }
      if(offset != 0){
         throw new TError(o, 'Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      if(length % 8 == 0){
         var array = new Float64Array(data);
         var count = length >> 3;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getFloat64(position, endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      if(length % 4 == 0){
         var array = new Uint32Array(data);
         var count = length >> 2;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getUint32(position, endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      if(length % 2 == 0){
         var array = new Uint16Array(data);
         var count = length >> 1;
         for(var i = 0; i < count; i++){
            array[i] = viewer.getUint16(position, endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      var array = new Uint8Array(data);
      for(var i = 0; i < length; i++){
         array[i] = viewer.getUint8(position++, endianCd);
      }
      o._position = position;
   }
   MO.MDataStream_writeBoolean = function MDataStream_writeBoolean(value){
      var o = this;
      o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
      o._position++;
   }
   MO.MDataStream_writeInt8 = function MDataStream_writeInt8(value){
      var o = this;
      o._viewer.setInt8(o._position, value, o._endianCd);
      o._position++;
   }
   MO.MDataStream_writeInt16 = function MDataStream_writeInt16(value){
      var o = this;
      o._viewer.setInt16(o._position, value, o._endianCd);
      o._position += 2;
   }
   MO.MDataStream_writeInt32 = function MDataStream_writeInt32(value){
      var o = this;
      o._viewer.setInt32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeInt64 = function MDataStream_writeInt64(value){
      var o = this;
      o._viewer.setInt64(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeUint8 = function MDataStream_writeUint8(value){
      var o = this;
      o._viewer.setUint8(o._position, value, o._endianCd);
      o._position += 1;
   }
   MO.MDataStream_writeUint16 = function MDataStream_writeUint16(value){
      var o = this;
      o._viewer.setUint16(o._position, value, o._endianCd);
      o._position += 2;
   }
   MO.MDataStream_writeUint32 = function MDataStream_writeUint32(value){
      var o = this;
      o._viewer.setUint32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeUint64 = function MDataStream_writeUint64(value){
      var o = this;
      o._viewer.setUint64(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeFloat = function MDataStream_writeFloat(value){
      var o = this;
      o._viewer.setFloat32(o._position, value, o._endianCd);
      o._position += 4;
   }
   MO.MDataStream_writeDouble = function MDataStream_writeDouble(value){
      var o = this;
      o._viewer.setDouble(o._position, value, o._endianCd);
      o._position += 8;
   }
   MO.MDataStream_writeString = function MDataStream_writeString(value){
      var o = this;
      var viewer = o._viewer;
      var length = v.length;
      var endianCd = o._endianCd;
      var position = o._position;
      viewer.setUint16(position, length, endianCd);
      position += 2;
      for(var i = 0; i < length; i++){
         viewer.setUint16(position, value.charCodeAt(i), endianCd);
         position += 2;
      }
      o._position = position;
   }
   MO.MDataStream_writeBytes = function MDataStream_writeBytes(data, offset, length){
      var o = this;
      var viewer = o._viewer;
      if(length <= 0){
         return;
      }
      if(offset != 0){
         throw new TError('Unsupport.');
      }
      var position = o._position;
      var endianCd = o._endianCd;
      if(length % 8 == 0){
         var array = new Float64Array(data);
         var count = length >> 3;
         for(var i = 0; i < count; i++){
            viewer.setFloat64(position, array[i], endianCd);
            position += 8;
         }
         o._position = position;
         return;
      }
      if(length % 4 == 0){
         var array = new Uint32Array(data);
         var count = length >> 2;
         for(var i = 0; i < count; i++){
            viewer.setUint32(position, array[i], endianCd);
            position += 4;
         }
         o._position = position;
         return;
      }
      if(length % 2 == 0){
         var array = new Uint16Array(data);
         var count = length >> 1;
         for(var i = 0; i < count; i++){
            viewer.setUint16(position, array[i], endianCd);
            position += 2;
         }
         o._position = position;
         return;
      }
      var array = new Uint8Array(data);
      for(var i = 0; i < length; i++){
         viewer.setUint8(position++, array[i], endianCd);
      }
      o._position = position;
   }
}
with(MO){
   MO.MDataView = function MDataView(o){
      o = RClass.inherits(this, o);
      o._viewer     = null;
      o._endianCd   = 0;
      o.endianCd    = MDataView_endianCd;
      o.setEndianCd = MDataView_setEndianCd;
      o.getInt8     = MDataView_getInt8;
      o.getInt16    = MDataView_getInt16;
      o.getInt32    = MDataView_getInt32;
      o.getInt64    = MDataView_getInt64;
      o.getUint8    = MDataView_getUint8;
      o.getUint16   = MDataView_getUint16;
      o.getUint32   = MDataView_getUint32;
      o.getUint64   = MDataView_getUint64;
      o.getFloat    = MDataView_getFloat;
      o.getDouble   = MDataView_getDouble;
      o.setInt8     = MDataView_setInt8;
      o.setInt16    = MDataView_setInt16;
      o.setInt32    = MDataView_setInt32;
      o.setInt64    = MDataView_setInt64;
      o.setUint8    = MDataView_setUint8;
      o.setUint16   = MDataView_setUint16;
      o.setUint32   = MDataView_setUint32;
      o.setUint64   = MDataView_setUint64;
      o.setFloat    = MDataView_setFloat;
      o.setDouble   = MDataView_setDouble;
      return o;
   }
   MO.MDataView_endianCd = function MDataView_endianCd(p){
      return this._endianCd;
   }
   MO.MDataView_setEndianCd = function MDataView_setEndianCd(p){
      this._endianCd = p;
   }
   MO.MDataView_getInt8 = function MDataView_getInt8(p){
      var o = this;
      return o._viewer.getInt8(p, o._endianCd);
   }
   MO.MDataView_getInt16 = function MDataView_getInt16(p){
      var o = this;
      return o._viewer.getInt16(p, o._endianCd);
   }
   MO.MDataView_getInt32 = function MDataView_getInt32(p){
      var o = this;
      return o._viewer.getInt32(p, o._endianCd);
   }
   MO.MDataView_getInt64 = function MDataView_getInt64(p){
      var o = this;
      return o._viewer.getInt64(p, o._endianCd);
   }
   MO.MDataView_getUint8 = function MDataView_getUint8(p){
      var o = this;
      return o._viewer.getUint8(p, o._endianCd);
   }
   MO.MDataView_getUint16 = function MDataView_getUint16(p){
      var o = this;
      return o._viewer.getUint16(p, o._endianCd);
   }
   MO.MDataView_getUint32 = function MDataView_getUint32(p){
      var o = this;
      return o._viewer.getUint32(p, o._endianCd);
   }
   MO.MDataView_getUint64 = function MDataView_getUint64(p){
      var o = this;
      return o._viewer.getUint64(p, o._endianCd);
   }
   MO.MDataView_getFloat = function MDataView_getFloat(p){
      var o = this;
      return o._viewer.getFloat32(p, o._endianCd);
   }
   MO.MDataView_getDouble = function MDataView_getDouble(p){
      var o = this;
      return o._viewer.getFloat64(p, o._endianCd);
   }
   MO.MDataView_setInt8 = function MDataView_setInt8(p, v){
      var o = this;
      o._viewer.setInt8(p, v, o._endianCd);
   }
   MO.MDataView_setInt16 = function MDataView_setInt16(p, v){
      var o = this;
      o._viewer.setInt16(p, v, o._endianCd);
   }
   MO.MDataView_setInt32 = function MDataView_setInt32(p, v){
      var o = this;
      o._viewer.setInt32(p, v, o._endianCd);
   }
   MO.MDataView_setInt64 = function MDataView_setInt64(p, v){
      var o = this;
      o._viewer.setInt64(p, v, o._endianCd);
   }
   MO.MDataView_setUint8 = function MDataView_setUint8(p, v){
      var o = this;
      o._viewer.setUint8(p, v, o._endianCd);
   }
   MO.MDataView_setUint16 = function MDataView_setUint16(p, v){
      var o = this;
      o._viewer.setUint16(p, v, o._endianCd);
   }
   MO.MDataView_setUint32 = function MDataView_setUint32(p, v){
      var o = this;
      o._viewer.setUint32(p, v, o._endianCd);
   }
   MO.MDataView_setUint64 = function MDataView_setUint64(p, v){
      var o = this;
      o._viewer.setUint64(p, v, o._endianCd);
   }
   MO.MDataView_setFloat = function MDataView_setFloat(p, v){
      var o = this;
      o._viewer.setFloat32(p, v, o._endianCd);
   }
   MO.MDataView_setDouble = function MDataView_setDouble(p, v){
      var o = this;
      o._viewer.setDouble(p, v, o._endianCd);
   }
}
with(MO){
   MO.MListener = function MListener(o){
      o = RClass.inherits(this, o);
      o._listenerss       = null;
      o.addListener       = MListener_addListener;
      o.setListener       = MListener_setListener;
      o.removeListener    = MListener_removeListener;
      o.clearListeners    = MListener_clearListeners;
      o.clearAllListeners = MListener_clearAllListeners;
      o.processListener   = MListener_processListener;
      o.dispose           = MListener_dispose;
      return o;
   }
   MO.MListener_addListener = function MListener_addListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      if(!listenerss){
         listenerss = o._listenerss = new TDictionary();
      }
      var listeners = listenerss.get(name);
      if(!listeners){
         listeners = new TListeners();
         listenerss.set(name, listeners);
      }
      return listeners.register(owner, method);
   }
   MO.MListener_setListener = function MListener_setListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.clear();
         }
      }
      return o.addListener(name, owner, method)
   }
   MO.MListener_removeListener = function MListener_removeListener(name, owner, method){
      var o = this;
      var listenerss = o._listenerss;
      var listeners = listenerss.get(name);
      return listeners.unregister(owner, method);
   }
   MO.MListener_clearListeners = function MListener_clearListeners(name){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.clear();
         }
      }
   }
   MO.MListener_clearAllListeners = function MListener_clearAllListeners(){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var count = listenerss.count();
         for(var i = 0; i < count; i++){
            var listeners = listenerss.at(i);
            if(listeners){
               listeners.clear();
            }
         }
      }
   }
   MO.MListener_processListener = function MListener_processListener(name, p1, p2, p3, p4, p5){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         var listeners = listenerss.get(name);
         if(listeners){
            listeners.process(p1, p2, p3, p4, p5);
         }
      }
   }
   MO.MListener_dispose = function MListener_dispose(){
      var o = this;
      var listenerss = o._listenerss;
      if(listenerss){
         for(var i = listenerss.count() - 1; i >= 0; i--){
            var listeners = listenerss.at(i);
            listeners.dispose();
         }
         o._listenerss = RObject.dispose(listenerss);
      }
   }
}
with(MO){
   MO.MListenerLoad = function MListenerLoad(o){
      o = RClass.inherits(this, o, MListener);
      o.addLoadListener     = MListenerLoad_addLoadListener;
      o.removeLoadListener  = MListenerLoad_removeLoadListener;
      o.clearLoadListeners  = MListenerLoad_clearLoadListeners;
      o.processLoadListener = MListenerLoad_processLoadListener;
      return o;
   }
   MO.MListenerLoad_addLoadListener = function MListenerLoad_addLoadListener(w, m){
      return this.addListener(EEvent.Load, w, m);
   }
   MO.MListenerLoad_removeLoadListener = function MListenerLoad_removeLoadListener(w, m){
      this.removeListener(EEvent.Load, w, m);
   }
   MO.MListenerLoad_clearLoadListeners = function MListenerLoad_clearLoadListeners(){
      this.clearListeners(EEvent.Load);
   }
   MO.MListenerLoad_processLoadListener = function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerProcess = function MListenerProcess(o){
      o = RClass.inherits(this, o, MListener);
      o.addProcessListener     = MListenerProcess_addProcessListener;
      o.removeProcessListener  = MListenerProcess_removeProcessListener;
      o.processProcessListener = MListenerProcess_processProcessListener;
      return o;
   }
   MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(w, m){
      return this.addListener(EEvent.Process, w, m);
   }
   MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(w, m){
      this.removeListener(EEvent.Process, w, m);
   }
   MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Process, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerTouchZoom = function MListenerTouchZoom(o){
      o = RClass.inherits(this, o, MListener);
      o.addTouchZoomListener     = MListenerTouchZoom_addTouchZoomListener;
      o.removeTouchZoomListener  = MListenerTouchZoom_removeTouchZoomListener;
      o.clearTouchZoomListeners  = MListenerTouchZoom_clearTouchZoomListeners;
      o.processTouchZoomListener = MListenerTouchZoom_processTouchZoomListener;
      return o;
   }
   MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
      return this.addListener(EEvent.TouchZoom, w, m);
   }
   MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
      this.removeListener(EEvent.TouchZoom, w, m);
   }
   MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
      this.clearListeners(EEvent.TouchZoom);
   }
   MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.TouchZoom, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MMouseCapture = function MMouseCapture(o){
      o = RClass.inherits(this, o);
      o.onMouseCaptureStart = RMethod.virtual(o, 'onMouseCaptureStart');
      o.onMouseCapture      = RMethod.virtual(o, 'onMouseCapture');
      o.onMouseCaptureStop  = RMethod.virtual(o, 'onMouseCaptureStop');
      o.testMouseCapture    = RMethod.emptyTrue;
      return o;
   }
}
with(MO){
   MO.MMouseWheel = function MMouseWheel(o){
      o = RClass.inherits(this, o);
      o.onMouseWheel = RClass.register(o, new AEventMouseWheel('onMouseWheel'), RMethod.empty);
      return o;
   }
}
with(MO){
   MO.MProperty = function MProperty(o){
      o = RClass.inherits(this, o);
      o.propertyAssign = MProperty_propertyAssign;
      o.propertyLoad   = MProperty_propertyLoad;
      o.propertySave   = MProperty_propertySave;
      return o;
   }
   MO.MProperty_propertyAssign = function MProperty_propertyAssign(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            o[a._name] = p[a._name];
         }
      }
   }
   MO.MProperty_propertyLoad = function MProperty_propertyLoad(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            if(a._force){
               a.load(o, p);
            }else{
               if(p.contains(a._linker)){
                  a.load(o, p);
               }else if(o[a._name] == null){
                  o[a._name] = a._value;
               }
            }
         }
      }
   }
   MO.MProperty_propertySave = function MProperty_propertySave(p){
      var o = this;
      var c = RClass.find(o.constructor);
      var as = c.annotations(EAnnotation.Property);
      for(var n in as){
         var a = as[n];
         if(a.constructor != Function){
            a.save(o, p);
         }
      }
   }
}
with(MO){
   MO.SClickEvent = function SClickEvent(sender){
      var o = this;
      SEvent.call(o, sender);
      return o;
   }
}
with(MO){
   MO.SEvent = function SEvent(sender){
      var o = this;
      o.annotation = null;
      o.listener   = null;
      o.sender     = sender;
      o.source     = null;
      o.hEvent     = null;
      o.hSender    = null;
      o.hSource    = null;
      o.ohProcess  = null;
      o.onProcess  = null;
      o.process    = null;
      o.dispose    = SEvent_dispose;
      return o;
   }
   MO.SEvent_dispose = function SEvent_dispose(){
      var o = this;
      for(var n in o){
         o[n] = null;
      }
   }
}
with(MO){
   MO.SKeyboardEvent = function SKeyboardEvent(){
      var o = this;
      SEvent.call(o);
      o.altKey      = false;
      o.shiftKey    = false;
      o.ctrlKey     = false;
      o.keyCode     = 0;
      o.attachEvent = SKeyboardEvent_attachEvent;
      o.cancel      = SKeyboardEvent_cancel;
      return o;
   }
   MO.SKeyboardEvent_attachEvent = function SKeyboardEvent_attachEvent(p){
      var o = this;
      o.altKey = p.altKey;
      o.shiftKey = p.shiftKey;
      o.ctrlKey = p.ctrlKey;
      o.keyCode = p.keyCode;
   }
   MO.SKeyboardEvent_cancel = function SKeyboardEvent_cancel(){
      var o = this;
      o.hEvent.returnValue = false;
   }
}
with(MO){
   MO.SMouseEvent = function SMouseEvent(){
      var o = this;
      SEvent.call(o);
      o.button      = null;
      o.mouseLeft   = false;
      o.mouseMiddle = false;
      o.mouseRight  = false;
      o.altKey      = false;
      o.ctrlKey     = false;
      o.x           = 0;
      o.y           = 0;
      o.offsetX     = 0;
      o.offsetY     = 0;
      o.clientX     = 0;
      o.clientY     = 0;
      o.deltaX      = 0;
      o.deltaY      = 0;
      o.deltaZ      = 0;
      o.attachEvent = SMouseEvent_attachEvent;
      return o;
   }
   MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(event);
      if(hs){
         o.source = hs.__linker;
      }
      o.button = event.button;
      o.mouseLeft = (event.button == EMouseButton.Left);
      o.mouseMiddle = (event.button == EMouseButton.Middle);
      o.mouseRight = (event.button == EMouseButton.Right);
      o.altKey = event.altKey;
      o.ctrlKey = event.ctrlKey;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         o.x = event.pageX;
         o.y = event.pageY;
         o.offsetX = event.layerX;
         o.offsetY = event.layerY;
      }else{
         o.x = event.x;
         o.y = event.y;
         o.offsetX = event.offsetX;
         o.offsetY = event.offsetY;
      }
      o.clientX = event.clientX;
      o.clientY = event.clientY;
      o.deltaX = event.deltaX;
      o.deltaY = event.deltaY;
      o.deltaZ = event.deltaZ;
   }
}
with(MO){
   MO.SResizeEvent = function SResizeEvent(){
      var o = this;
      SEvent.call(o);
      o.width       = null;
      o.height      = null;
      o.attachEvent = SResizeEvent_attachEvent;
      return o;
   }
   MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(p);
      if(hs){
         o.source = hs.__linker;
      }
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      SEvent.call(o);
      o.connection = null;
      o.document   = null;
      o.root       = null;
      return o;
   }
}
with(MO){
   MO.THtmlItem = function THtmlItem(){
      var o = this;
      o._link  = null;
      o._links = new Object();
      o.get    = THtmlItem_get;
      o.set    = THtmlItem_set;
      return o;
   }
   MO.THtmlItem_get = function THtmlItem_get(n){
      return this._links[n];
   }
   MO.THtmlItem_set = function THtmlItem_set(n, v){
      this._links[n] = v;
   }
}
with(MO){
   MO.TXmlDocument = function TXmlDocument(){
      var o = this;
      o._root   = null;
      o.create  = TXmlDocument_create;
      o.root    = TXmlDocument_root;
      o.setRoot = TXmlDocument_setRoot;
      o.xml     = TXmlDocument_xml;
      o.dump    = TXmlDocument_dump;
      return o;
   }
   MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      r._value = v;
      return r;
   }
   MO.TXmlDocument_root = function TXmlDocument_root(){
      var o = this;
      var r = o._root;
      if(!r){
         r = o._root = new TXmlNode();
         r._name = 'Configuration';
      }
      return r;
   }
   MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
      var o = this;
      if(!o._root){
         o._root = p;
      }else{
         throw new TError(o, 'Root node is already exists.');
      }
   }
   MO.TXmlDocument_xml = function TXmlDocument_xml(){
      var s = new TString();
      s.append("<?xml version='1.0' encoding='UTF-8'?>");
      this.root().innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlDocument_dump = function TXmlDocument_dump(){
      var o = this;
      var r = new TString();
      r.appendLine(RClass.name(o));
      o.root().dump(r);
      return r.flush();
   }
}
with(MO){
   MO.TXmlNode = function TXmlNode(name){
      var o = this;
      TNode.call(o, name);
      o.create   = TXmlNode_create;
      o.innerXml = TXmlNode_innerXml;
      o.xml      = TXmlNode_xml;
      o.toString = TXmlNode_toString;
      return o;
   }
   MO.TXmlNode_create = function TXmlNode_create(n, a){
      var o = this;
      var r = new TXmlNode();
      r._name = n;
      r._attributes = a;
      if(!RClass.isClass(a, TAttributes)){
         var a = arguments;
         var len = a.length;
         for(var n = 1; n < len; n += 2){
            if(n + 1 < len){
               r.set(a[n], a[n+1]);
            }else{
               r._value = a[n];
            }
         }
      }
      o.push(r);
      return r;
   }
   MO.TXmlNode_innerXml = function TXmlNode_innerXml(s, l){
      var o = this;
      s.appendRepeat('   ', l);
      s.append('<', o._name);
      var as = o._attributes;
      if(as){
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            s.append(' ', as.name(n), '="');
            RXml.buildText(s, as.value(n));
            s.append('"');
         }
      }
      if(!o._nodes && (o._value == null)){
         s.append('/');
      }
      s.append('>\n');
      var ns = o._nodes;
      if(ns){
         var c = ns.count();
         for(var n = 0; n < c; n++){
            ns.get(n).innerXml(s, l + 1);
         }
      }
      RXml.buildText(s, o._value)
      if(o._nodes || o._value != null){
         s.appendRepeat('   ', l);
         s.append('</', o._name, '>');
         s.append('\n');
      }
      return s;
   }
   MO.TXmlNode_xml = function TXmlNode_xml(){
      var s = new TString();
      this.innerXml(s, 0);
      return s.flush();
   }
   MO.TXmlNode_toString = function TXmlNode_toString(){
      return this.xml().toString();
   }
}
with(MO){
   MO.FBytes = function FBytes(o){
      o = RClass.inherits(this, o, FObject, MDataView);
      o._memory   = null;
      o.construct = FBytes_construct;
      o.dispose   = FBytes_dispose;
      return o;
   }
   MO.FBytes_construct = function FBytes_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._memory = new ArrayBuffer();
      o._viewer = new DataView(o._memory);
   }
   MO.FBytes_dispose = function FBytes_dispose(){
      var o = this;
      o._memory = null;
      o._viewer = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FClassFactory = function FClassFactory(o){
      o = RClass.inherits(this, o, FObject);
      o._classes   = null;
      o.construct  = FClassFactory_construct;
      o.register   = FClassFactory_register;
      o.unregister = FClassFactory_unregister;
      o.create     = FClassFactory_create;
      o.dispose    = FClassFactory_dispose;
      return o;
   }
   MO.FClassFactory_construct = function FClassFactory_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._classes = new TDictionary();
   }
   MO.FClassFactory_register = function FClassFactory_register(n, c){
      this._classes.set(n, c);
   }
   MO.FClassFactory_unregister = function FClassFactory_unregister(n){
      this._classes.set(n, null);
   }
   MO.FClassFactory_create = function FClassFactory_create(n){
      var o = this;
      var c = o._classes.get(n);
      if(!c){
         throw new TError('Create unregister class. (name={1})', n);
      }
      return RClass.create(c);
   }
   MO.FClassFactory_dispose = function FClassFactory_dispose(){
      var o = this;
      o._classes = RObject.dispose(o._classes);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FComponent = function FComponent(o){
      o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeCode);
      o.dispose = FComponent_dispose;
      return o;
   }
   MO.FComponent_dispose = function FComponent_dispose(){
      var o = this;
      o.__base.MAttributeParent.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDataStream = function FDataStream(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o._length   = 0;
      o._memory   = null;
      o._viewer   = null;
      o.construct = FDataStream_construct;
      o.length    = FDataStream_length;
      o.setLength = FDataStream_setLength;
      o.memory    = FDataStream_memory;
      o.flip      = FDataStream_flip;
      o.dispose   = FDataStream_dispose;
      return o;
   }
   MO.FDataStream_construct = function FDataStream_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FDataStream_length = function FDataStream_length(){
      return this._length;
   }
   MO.FDataStream_setLength = function FDataStream_setLength(p){
      var o = this;
      o._length = p;
      o._memory = new ArrayBuffer(p);
      o._viewer = new DataView(o._memory);
   }
   MO.FDataStream_memory = function FDataStream_memory(){
      return this._memory;
   }
   MO.FDataStream_flip = function FDataStream_flip(){
      var o = this;
      o._length = o._position;
      o._position = 0;
   }
   MO.FDataStream_dispose = function FDataStream_dispose(){
      var o = this;
      o._viewer = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FDataView = function FDataView(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      o.link    = FDataView_link;
      o.dispose = FDataView_dispose;
      return o;
   }
   MO.FDataView_link = function FDataView_link(p){
      var o = this;
      o._memory = p;
      o._viewer = new DataView(p);
   }
   MO.FDataView_dispose = function FDataView_dispose(){
      var o = this;
      o._viewer = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FFileReader = function FFileReader(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      o._reader        = null;
      o._fileName      = null;
      o._length        = 0;
      o._data          = null;
      o._statusLoading = false;
      o.ohloadStart    = FFileReader_ohLoadStart;
      o.ohLoad         = FFileReader_ohLoad;
      o.ohLoadEnd      = FFileReader_ohLoadEnd;
      o.ohProgress     = FFileReader_ohProgress;
      o.construct      = FFileReader_construct;
      o.fileName       = FFileReader_fileName;
      o.length         = FFileReader_length;
      o.data           = FFileReader_data;
      o.loadFile       = FFileReader_loadFile;
      o.dispose        = FFileReader_dispose;
      return o;
   }
   MO.FFileReader_ohLoadStart = function FFileReader_ohLoadStart(){
      var o = this.__linker;
   }
   MO.FFileReader_ohLoad = function FFileReader_ohLoad(){
      var o = this.__linker;
   }
   MO.FFileReader_ohLoadEnd = function FFileReader_ohLoadEnd(){
      var o = this.__linker;
      var reader = o._reader;
      o._statusFree = true;
      if(reader.error){
         debugger
         RLogger.error(o, 'Load file failure. (error={1])', reader.error);
      }else{
         o._length = reader.result.byteLength;
         o._data = reader.result;
         var event = new SEvent(o);
         o.processLoadListener(event);
         event.dispose();
      }
   }
   MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   }
   MO.FFileReader_construct = function FFileReader_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      var reader = o._reader = new FileReader();
      reader.__linker = o;
      reader.onloadstart = o.ohLoadStart;
      reader.onload = o.ohLoad;
      reader.onloadend = o.ohLoadEnd;
      reader.onprogress = o.ohProgress;
   }
   MO.FFileReader_fileName = function FFileReader_fileName(){
      return this._fileName;
   }
   MO.FFileReader_length = function FFileReader_length(){
      return this._length;
   }
   MO.FFileReader_data = function FFileReader_data(){
      return this._data;
   }
   MO.FFileReader_loadFile = function FFileReader_loadFile(file){
      var o = this;
      o._fileName = file.name;
      o._length = file.size;
      var reader = o._reader;
      reader.readAsArrayBuffer(file);
   }
   MO.FFileReader_dispose = function FFileReader_dispose(){
      var o = this;
      var reader = o._reader = new FileReader();
      reader.__linker = null;
      reader.onloadstart = null;
      reader.onload = null;
      reader.onloadend = null;
      reader.onprogress = null;
      o._reader = null;
      o._fileName = null;
      o._data = null;
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FHttpConnection = function FHttpConnection(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      o._asynchronous        = false;
      o._methodCd            = EHttpMethod.Get;
      o._contentCd           = EHttpContent.Binary;
      o._url                 = null;
      o._input               = null;
      o._inputData           = null;
      o._output              = null;
      o._outputData          = null;
      o._connection          = null;
      o._contentLength       = 0;
      o._statusFree          = true;
      o.onConnectionSend     = FHttpConnection_onConnectionSend;
      o.onConnectionReady    = FHttpConnection_onConnectionReady;
      o.onConnectionComplete = FHttpConnection_onConnectionComplete;
      o.construct            = FHttpConnection_construct;
      o.setHeaders           = FHttpConnection_setHeaders;
      o.inputData            = FHttpConnection_inputData;
      o.setInputData         = FHttpConnection_setInputData;
      o.outputData           = FHttpConnection_outputData;
      o.setOutputData        = FHttpConnection_setOutputData;
      o.content              = FHttpConnection_content;
      o.sendSync             = FHttpConnection_sendSync;
      o.sendAsync            = FHttpConnection_sendAsync;
      o.send                 = FHttpConnection_send;
      o.dispose              = FHttpConnection_dispose;
      return o;
   }
   MO.FHttpConnection_onConnectionSend = function FHttpConnection_onConnectionSend(){
      var o = this;
      var input = o._input;
      if(input){
         if(input.constructor == String){
            o._inputData = input;
            o._contentLength = input.length;
         }else if(input.constructor == ArrayBuffer){
            o._inputData = input;
            o._contentLength = input.byteLength;
         }else{
            throw new TError('Unknown send data type.');
         }
      }
   }
   MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
      var o = this._linker;
      if(o._asynchronous){
         var connection = o._connection;
         if(connection.readyState == EHttpStatus.Loaded){
            if(connection.status == 200){
               o.setOutputData();
               o.onConnectionComplete();
            }else{
               throw new TError(o, 'Connection failure. (url={1})', o._url);
            }
         }
      }
   }
   MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
      var o = this;
      o._statusFree = true;
      o.processLoadListener(o);
   }
   MO.FHttpConnection_construct = function FHttpConnection_construct(){
      var o = this;
      var c = o._connection = RXml.createConnection();
      c._linker = o;
      c.onreadystatechange = o.onConnectionReady;
   }
   MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
      var o = this;
      var c = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            c.setRequestHeader('Accept-Charset', 'x-user-defined');
            c.responseType = 'arraybuffer';
         }else{
            c.overrideMimeType('text/plain; charset=x-user-defined');
            if(o._asynchronous){
               c.responseType = 'arraybuffer';
            }
         }
      }else{
         c.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      }
      if(!RBrowser.isBrowser(EBrowser.Chrome)){
         if(o._contentLength > 0){
            c.setRequestHeader('content-length', o._contentLength);
         }
      }
   }
   MO.FHttpConnection_inputData = function FHttpConnection_inputData(){
      return this._inputData;
   }
   MO.FHttpConnection_setInputData = function FHttpConnection_setInputData(p){
      this._inputData = p;
   }
   MO.FHttpConnection_outputData = function FHttpConnection_outputData(){
      return this._outputData;
   }
   MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
      var o = this;
      var connection = o._connection;
      if(o._contentCd == EHttpContent.Binary){
         o._outputData = connection.response;
      }else{
         o._outputData = connection.responseText;
      }
   }
   MO.FHttpConnection_content = function FHttpConnection_content(){
      return this._outputData;
   }
   MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, false);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      o.setOutputData();
      o.onConnectionComplete();
      RLogger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
      var o = this;
      var connection = o._connection;
      connection.open(o._methodCd, o._url, true);
      o.setHeaders(connection, 0);
      connection.send(o._inputData);
      RLogger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
   }
   MO.FHttpConnection_send = function FHttpConnection_send(url, data){
      var o = this;
      o._url = url;
      o._input = data;
      o._methodCd = (data != null) ? EHttpMethod.Post : EHttpMethod.Get;
      o._statusFree = false;
      o.onConnectionSend();
      if(o._asynchronous){
         o.sendAsync();
      }else{
         o.sendSync();
      }
      return o.content();
   }
   MO.FHttpConnection_dispose = function FHttpConnection_dispose(){
      var o = this;
      o._input = null;
      o._inputData = null;
      o._output = null;
      o._outputData = null;
      var connection = o._connection;
      if(connection){
         connection.onreadystatechange = null;
         o._connection = null;
      }
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FXmlConnection = function FXmlConnection(o){
      o = RClass.inherits(this, o, FHttpConnection);
      o._contentCd           = EHttpContent.Text;
      o._inputNode           = null;
      o._outputNode          = null;
      o.onConnectionSend     = FXmlConnection_onConnectionSend;
      o.onConnectionComplete = FXmlConnection_onConnectionComplete;
      o.content              = FXmlConnection_content;
      return o;
   }
   MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
      var o = this;
      var d = o._input;
      if(d){
         var s = null;
         if(d.constructor == String){
            s = d;
            o._inputNode = null;
         }else if(d.constructor == TXmlNode){
            var x = new TXmlDocument();
            x.setRoot(d);
            s = x.xml();
            o._inputNode = d;
         }else if(d.constructor == TXmlDocument){
            s = d.xml();
            o._inputNode = d.root();
         }else{
            throw new TError('Unknown send data type.');
         }
         o._inputData = s;
         o._contentLength = s.length;
      }
   }
   MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
      var o = this;
      var c = o._connection;
      var e = null;
      if(c.responseXML){
         e = c.responseXML.documentElement;
      }else if(c.responseXml){
         e = c.responseXml.documentElement;
      }else{
         throw new TError(o, "Fetch xml data failure.");
      }
      if(!e){
         return RMessage.fatal(o, null, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
      }
      var d = new TXmlDocument();
      RXml.buildNode(d, null, e);
      var r = o._outputNode = d.root();
      o._statusFree = true;
      var e = new SXmlEvent();
      e.connection = o;
      e.document = d;
      e.root = r;
      e.parameters = o._parameters;
      o.processLoadListener(e);
      e.dispose();
      if(o._asynchronous){
         o._input = null;
         o._inputNode = null;
         o._output = null;
         o._outputNode = null;
         o._parameters = null;
      }
   }
   MO.FXmlConnection_content = function FXmlConnection_content(){
      return this._outputNode;
   }
}
with(MO){
   MO.FXmlData = function FXmlData(o){
      o = RClass.inherits(this, o, FObject);
      o._ready    = null;
      o._config   = null;
      o.testReady = FXmlData_testReady;
      return o;
   }
   MO.FXmlData_testReady = function FXmlData_testReady(){
      return this._ready;
   }
}
with(MO){
   MO.REngine = function REngine(){
      var o = this;
      o._spaces    = new Object();
      o.Global     = new Object();
      o.Top        = new Object();
      o.Local      = new Object();
      o.onRelease  = REngine_onRelease;
      o.register   = REngine_register;
      o.initialize = REngine_initialize;
      o.connect    = REngine_connect;
      o.buildSpace = REngine_buildSpace;
      o.find       = REngine_find;
      o.findGlobal = REngine_findGlobal;
      o.findTop    = REngine_findTop;
      o.findLocal  = REngine_findLocal;
      return o;
   }
   MO.REngine_onRelease = function REngine_onRelease(){
      RConsole.release();
      REvent.release();
      CollectGarbage();
   }
   MO.REngine_register = function REngine_register(s){
      var o = this;
      var p = o._spaces[s.space];
      if(!p){
         p = o._spaces[s.space] = new Object();
      }
      p[s.name] = s;
   }
   MO.REngine_initialize = function REngine_initialize(){
      var o = this;
      RConsole.initialize();
   }
   MO.REngine_connect = function REngine_connect(){
      var o = this;
      RConsole.initialize();
   }
   MO.REngine_buildSpace = function REngine_buildSpace(t, p){
      var o = this;
      for(var n in p){
         if(RString.startsWith(n, 'R')){
            t[n.substring(1)] = p[n].instance;
         }
      }
   }
   MO.REngine_find = function REngine_find(s, n){
      var r = null;
      var s = this._spaces[s];
      if(s){
         r = s[n];
         if(r){
            return r.instance;
         }
      }
      return null;
   }
   MO.REngine_findGlobal = function REngine_findGlobal(n){
      return this.find(ESpace.Global, n);
   }
   MO.REngine_findTop = function REngine_findTop(n){
      return top.REngine.find(ESpace.Top, n);
   }
   MO.REngine_findLocal = function REngine_findLocal(n){
      return this.find(ESpace.Local, n);
   }
   MO.REngine = new REngine();
}
with(MO){
   MO.RKeyboard = function RKeyboard(){
      var o = this;
      o._status      = new Array();
      o.onKeyDown    = RKeyboard_onKeyDown;
      o.onKeyUp      = RKeyboard_onKeyUp;
      o.construct    = RKeyboard_construct;
      o.isControlKey = RKeyboard_isControlKey;
      o.isIntegerKey = RKeyboard_isIntegerKey;
      o.isFloatKey   = RKeyboard_isFloatKey;
      o.isNumKey     = RKeyboard_isNumKey;
      o.isPress      = RKeyboard_isPress;
      o.fixCase      = RKeyboard_fixCase;
      o.fixPattern   = RKeyboard_fixPattern;
      o.fixChars     = RKeyboard_fixChars;
      return o;
   }
   MO.RKeyboard_onKeyDown = function RKeyboard_onKeyDown(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Press;
   }
   MO.RKeyboard_onKeyUp = function RKeyboard_onKeyUp(p){
      var o = this;
      var c = p.keyCode;
      o._status[c] = EKeyStatus.Normal;
   }
   MO.RKeyboard_construct = function RKeyboard_construct(){
      var o = this;
      var s = o._status;
      for(var i = 0; i < 256; i++){
         s[i] = EKeyStatus.Normal;
      }
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
      RWindow.lsnsKeyUp.register(o, o.onKeyUp);
   }
   MO.RKeyboard_isControlKey = function RKeyboard_isControlKey(p){
      var s = EKeyCode.ControlKeys;
      for(var i = s.length - 1; i >= 0; i--){
         if(s[i] == p){
            return true;
         }
      }
      return false;
   }
   MO.RKeyboard_isIntegerKey = function RKeyboard_isIntegerKey(c){
      return EKeyCode.integerCodes[c];
   }
   MO.RKeyboard_isFloatKey = function RKeyboard_isFloatKey(c){
      return EKeyCode.floatCodes[c];
   }
   MO.RKeyboard_isNumKey = function RKeyboard_isNumKey(c){
      if(p >= 96 && p <= 105){
         return true;
      }
      return false;
   }
   MO.RKeyboard_isPress = function RKeyboard_isPress(p){
      var o = this;
      var v = o._status[p];
      return v == EKeyStatus.Press;
   }
   MO.RKeyboard_fixCase = function RKeyboard_fixCase(e, c){
      if(e && c){
         var k = e.keyCode;
         if(ECase.Upper == c){
            k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
         }else if(ECase.Lower == c){
            k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
         }
         e.keyCode = k;
      }
   }
   MO.RKeyboard_fixPattern = function RKeyboard_fixPattern(e, p){
      if(p){
         var k = e.keyCode;
         if(!this.isControlKeyPress(k)){
            if(!RString.isPattern(String.fromCharCode(k), p)){
               e.keyCode = 0;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard_fixChars = function RKeyboard_fixChars(e, p){
      if(p){
         var k = e.keyCode;
         if(this.isNumKey(k)){
       	  k = e.keyCode = e.keyCode - 48;
         }
         if(!this.isControlKeyPress(k)){
            if(!RString.inChars(String.fromCharCode(k), p)){
               e.keyCode = 0;
               e.returnValue = false;
               return false;
            }
         }
      }
      return true;
   }
   MO.RKeyboard = new RKeyboard();
}
with(MO){
   MO.RLoader = function RLoader(){
      var o = this;
      o._loading      = new TArray();
      o._loaded       = new TArray()
      o._waits        = new TArray()
      o._intervalId   = null;
      o.hWindow       = null;
      o.onInterval    = RLoader_onInterval;
      o.intervalStart = RLoader_intervalStart;
      o.intervalStop  = RLoader_intervalStop;
      o.loadJsFile    = RLoader_loadJsFile;
      o.loadJs        = RLoader_loadJs;
      o.loaded        = RLoader_loaded;
      o.wait          = RLoader_wait;
      o.waitJs        = RLoader_waitJs;
      o.dispose       = RLoader_dispose;
      return o;
   }
   MO.RLoader_dispose = function RLoader_dispose(){
      var o = this;
      o.intervalStop();
      o.hWindow = null;
   }
   MO.RLoader_onInterval = function RLoader_onInterval(){
      var o = this;
      var ws = o._waits;
      var c = ws.length;
      for(var n=0; n<c; n++){
         var l = ws.get(n);
         if(l){
            if(l.check(o._loaded)){
               l.invoke.invoke();
               ws.set(n, null);
            }
         }
      }
      ws.compress();
      if(ws.isEmpty()){
         o.intervalStop();
      }
   }
   MO.RLoader_intervalStart = function RLoader_intervalStart(){
      var o = this;
      if(!o._intervalId){
         o.hWindow = window;
         o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
      }
   }
   MO.RLoader_intervalStop = function RLoader_intervalStop(){
      var o = this;
      var w = o.hWindow;
      if(w && o._intervalId){
         w.clearInterval(o._intervalId);
         o.hWindow = null;
         o._intervalId = null;
      }
   }
   MO.RLoader_loadJsFile = function RLoader_loadJsFile(id, src){
      var o = this;
      var d = RWindow.hDocument;
      var h = d.getElementsByTagName("head")[0];
      if(document.getElementById(id) == null){
         var url = top.RContext.location(src);
         var hs = RWindow.createElement('SCRIPT');
         hs.id = id;
         hs.type = 'text/javascript';
         hs.src = url;
         if(d.attachEvent){
            hs.onreadystatechange = function(){
               var s = hs.readyState;
               if('loaded' == s || 'complete' == s){
                  hs.onreadystatechange = null;
                  o._loading.extract(id);
                  o._loaded.push(id);
               }
            }
         }else{
            hs.onload = function(){
               if(d.readyState == 'complete'){
                  hs.onload = null;
                  o._loading.extract(id);
                  o._loaded.push(id);
               }
            }
         }
         h.appendChild(hs);
      }
   }
   MO.RLoader_loadJs = function RLoader_loadJs(ps){
      var as = arguments;
      var c = as.length;
      for(var n = 0; n < c; n++){
         var p = as[n];
         this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
      }
   }
   MO.RLoader_loaded = function RLoader_loaded(id){
      var o = this;
      o._loading.extract(id);
      o._loaded.push(id);
   }
   MO.RLoader_wait = function RLoader_wait(invoke, ids){
      var o = this;
      var l = new TLoaderListener();
      l.invoke = invoke;
      var c = arguments.length;
      for(var n = 1; n < c; n++){
         l.ids.push(arguments[n]);
      }
      o._waits.push(l);
      o.intervalStart();
   }
   MO.RLoader_waitJs = function RLoader_waitJs(invoke, ids){
      var o = this;
      var l = new TLoaderListener();
      l.invoke = invoke;
      var as = arguments;
      var c = as.length;
      for(var n = 1; n < c; n++){
         l.ids.push('js:' + as[n]);
      }
      o._waits.push(l);
      o.intervalStart();
   }
   MO.RLoader = new RLoader();
}
with(MO){
   MO.RMessage = function RMessage(){
      var o = this;
      o._hasError     = false;
      o._messages     = null;
      o.push          = RMessage_push;
      o.fatal         = RMessage_fatal;
      o.confirmResult = false;
      o.error         = RMessage_error;
      o.warn          = RMessage_warn;
      o.onWindowClose = RMessage_onWindowClose;
      o.confirm       = RMessage_confirm;
      o.info          = RMessage_info;
      return o;
   }
   MO.RMessage_push = function RMessage_push(msg){
      if(!this._messages){
         this._messages = new FLoopList();
      }
      this._messages.push(msg);
   }
   MO.RMessage_fatal = function RMessage_fatal(sf, er, ms, pm){
      var o = this;
      if(o._hasError){
         return;
      }
      o._hasError = true;
      var s = new TString();
      var t = new Array();
      var f = RMessage_fatal.caller;
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
      alert(m);
   }
   MO.RMessage_error = function RMessage_error(self, method, msg, params){
      if(this._hasError){
         return;
      }
      this._hasError = true;
      throw new Error(msg);
   }
   MO.RMessage_warn = function RMessage_warn(self, message, params){
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FAlertWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_info = function RMessage_info(self, message, params){
      var s = new TString();
      var n = 0;
      var aw = top.RControl.create(FInfoWindow);
      aw.setText(message);
      aw.show();
   }
   MO.RMessage_confirm = function RMessage_confirm(message,callback){
      var o = this;
      var ls = top.RControl.create(FConfirmWindow);
      ls.setText(message);
      ls.lsns.register(o, callback);
      ls.show();
   }
   MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
      this.confirmResult = v;
   }
   MO.RMessage = new RMessage();
}
with(MO){
   MO.RResource = function RResource(){
      var o = this;
      o.uriIcon     = '/ars/icon/';
      o.uriImage    = '/ars/img/';
      o.iconPath    = RResource_iconPath;
      o.iconUrlPath = RResource_iconUrlPath;
      o.imagePath   = RResource_imagePath;
      return o;
   }
   MO.RResource_iconPath = function RResource_iconPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_iconUrlPath = function RResource_iconUrlPath(path, type){
      var o = this;
      path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
      return RBrowser.contentPath('/ars/icon/' + path);
   }
   MO.RResource_imagePath = function RResource_imagePath(path, type){
      var o = this;
   }
   MO.RResource = new RResource();
}
with(MO){
   MO.RStyle = function RStyle(){
      var o = this;
      o._connected = false;
      o._rules     = new TMap();
      o.connect    = RStyle_connect;
      o.has        = RStyle_has;
      o.nvl        = RStyle_nvl;
      o.style      = RStyle_style;
      return o;
   }
   MO.RStyle_connect = function RStyle_connect(){
      var o = this;
      if(o._connected){
         return;
      }
      var s = o._rules;
      var ds = document.styleSheets;
      var dc = ds.length;
      for(var n = 0; n < dc; n++){
         var rs = ds[n].cssRules;
         if(rs){
            var rc = rs.length;
            for(var i = 0; i < rc; i++){
               var r = rs[i];
               s.set(r.selectorText, r);
            }
         }
      }
      o._connected = true;
   }
   MO.RStyle_has = function RStyle_has(s){
      var o = this;
      if(!o._connected){
         o.connect();
      }
      if(s){
         return this._rules.contains('.' + s.toLowerCase());
      }
      return false;
   }
   MO.RStyle_nvl = function RStyle_nvl(s, n){
      var o = this;
      o.connect();
      var a = arguments;
      var c = a.length;
      for(var n = 0; n < c; n++){
         var s = a[n];
         if(s){
            if(o._rules.contains('.' + s.toLowerCase())){
               return s;
            }
         }
      }
      return null;
   }
   MO.RStyle_style = function RStyle_style(c, n){
      return RClass.name(c) + '_' + n;
   }
   MO.RStyle = new RStyle();
}
with(MO){
   MO.RTypeArray = function RTypeArray(){
      var o = this;
      o._float3  = null;
      o._float4  = null;
      o._data    = new Object();
      o.float3      = RTypeArray_float3;
      o.float4      = RTypeArray_float4;
      o.createArray = RTypeArray_createArray;
      o.findTemp    = RTypeArray_findTemp;
      return o;
   }
   MO.RTypeArray_float3 = function RTypeArray_float3(){
      var o = this;
      var v = o._float3;
      if(v == null){
         v = o._float3 = new Float32Array(3);
      }
      return v;
   }
   MO.RTypeArray_float4 = function RTypeArray_float4(){
      var o = this;
      var v = o._float4;
      if(v == null){
         v = o._float4 = new Float32Array(4);
      }
      return v;
   }
   MO.RTypeArray_createArray = function RTypeArray_createArray(t, l){
      switch(t){
         case EDataType.Boolean:
         case EDataType.Int8:
            return new Int8Array(l);
         case EDataType.Int16:
            return new Int16Array(l);
         case EDataType.Int32:
            return new Int32Array(l);
         case EDataType.Int64:
            return new Int64Array(l);
         case EDataType.Uint8:
            return new Uint8Array(l);
         case EDataType.Uint16:
            return new Uint16Array(l);
         case EDataType.Uint32:
            return new Uint32Array(l);
         case EDataType.Float32:
            return new Float32Array(l);
         case EDataType.Float64:
            return new Float64Array(l);
      }
      throw new TError('Create unknown type array. (type={1}, length={2})', t, l);
   }
   MO.RTypeArray_findTemp = function RTypeArray_findTemp(t, l){
      var o = this;
      var d = o._data;
      var s = d[t];
      if(s == null){
         s = d[t] = new Object();
      }
      var r = s[l];
      if(r == null){
         r = s[l] = o.createArray(t, l);
      }
      return r;
   }
   MO.RTypeArray = new RTypeArray();
}
with(MO){
   MO.FTag = function FTag(o){
      o = RClass.inherits(this, o, FObject);
      o._name      = 'Tag';
      o._children  = null;
      o._trimLeft  = false;
      o._trimRight = false;
      o.onBegin    = FTag_onBegin;
      o.onEnd      = FTag_onEnd;
      o.name       = FTag_name;
      o.set        = FTag_set;
      o.push       = FTag_push;
      o.parse      = FTag_parse;
      o.toString   = FTag_toString;
      o.innerDump  = FTag_innerDump;
      o.dump       = FTag_dump;
      return o;
   }
   MO.FTag_onBegin = function FTag_onBegin(p){
      return EResult.Continue;
   }
   MO.FTag_onEnd = function FTag_onEnd(p){
      return EResult.Continue;
   }
   MO.FTag_name = function FTag_name(){
      return this._name;
   }
   MO.FTag_set = function FTag_set(n, v){
      throw new TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
   }
   MO.FTag_push = function FTag_push(p){
      var o = this;
      var ts = o._children;
      if(ts == null){
         ts = o._children = new TObjects();
      }
      ts.push(p);
   }
   MO.FTag_parse = function FTag_parse(p){
      var o = this;
      var r = o.onBegin(p);
      if(r == EResult.Continue){
         var ts = o._children;
         if(ts){
            var c = ts.count();
            for(var i = 0; i < c; i++){
               var t = ts.get(i);
               r = t.parse(p);
               if(r == EResult.Cancel){
                  return r;
               }
               p._trimLeft = t._trimLeft;
               p._trimRight = t._trimRight;
            }
         }
         return o.onEnd(p);
      }
      return r;
   }
   MO.FTag_toString = function FTag_toString(){
      return null;
   }
   MO.FTag_innerDump = function FTag_innerDump(ps, pt, pl){
      var o = this;
      ps.appendRepeat('   ', pl);
      ps.append(RClass.dump(pt));
      var s = pt.toString();
      if(!RString.isEmpty(s)){
         ps.append(' [', s, ']');
      }
      var ts = pt._children;
      if(ts){
         ps.append('\n');
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            o.innerDump(ps, t, pl + 1);
            if(i < c - 1){
               ps.append('\n');
            }
         }
      }
   }
   MO.FTag_dump = function FTag_dump(){
      var r = new TString();
      this.innerDump(r, this, 0);
      return r.toString();
   }
}
with(MO){
   MO.FTagContext = function FTagContext(o){
      o = RClass.inherits(this, o, FObject, MInstance);
      o._trimLeft       = false;
      o._trimRight      = false;
      o._attributes     = null;
      o._source         = null;
      o.construct       = FTagContext_construct;
      o.instanceAlloc   = FTagContext_instanceAlloc; // Implement MInstance
      o.attributes      = FTagContext_attributes;
      o.get             = FTagContext_get;
      o.set             = FTagContext_set;
      o.setBoolean      = FTagContext_setBoolean;
      o.source          = FTagContext_source;
      o.write           = FTagContext_write;
      o.resetSource     = FTagContext_resetSource;
      o.dispose         = FTagContext_dispose;
      return o;
   }
   MO.FTagContext_construct = function FTagContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._attributes = new TAttributes();
      o._source = new TString();
   }
   MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(p){
      this._attributes.clear();
   }
   MO.FTagContext_attributes = function FTagContext_attributes(){
      return this._attributes;
   }
   MO.FTagContext_get = function FTagContext_get(n, v){
      return this._attributes.get(n, v);
   }
   MO.FTagContext_set = function FTagContext_set(n, v){
      this._attributes.set(n, v);
   }
   MO.FTagContext_setBoolean = function FTagContext_setBoolean(n, v){
      this._attributes.set(n, RBoolean.toString(v));
   }
   MO.FTagContext_source = function FTagContext_source(){
      return this._source.toString();
   }
   MO.FTagContext_write = function FTagContext_write(p){
      if(!RString.isEmpty(p)){
         this._source.append(p);
      }
   }
   MO.FTagContext_resetSource = function FTagContext_resetSource(p){
      this._source.clear();
   }
   MO.FTagContext_dispose = function FTagContext_dispose(){
      var o = this;
      o._attributes.dispose();
      o._attributes = null;
      o._source.dispose();
      o._source = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FTagDocument = function FTagDocument(o){
      o = RClass.inherits(this, o, FObject);
      o._space  = null;
      o._root   = null;
      o.space    = FTagDocument_space;
      o.setSpace = FTagDocument_setSpace;
      o.create   = FTagDocument_create;
      o.root     = FTagDocument_root;
      o.loadNode = FTagDocument_loadNode;
      o.load     = FTagDocument_load;
      o.parse    = FTagDocument_parse;
      o.dump     = FTagDocument_dump;
      return o;
   }
   MO.FTagDocument_space = function FTagDocument_space(){
      return this._space;
   }
   MO.FTagDocument_setSpace = function FTagDocument_setSpace(p){
      this._space = p;
   }
   MO.FTagDocument_create = function FTagDocument_create(p){
      var o = this;
      var sn = o._space + '_';
      var n = null;
      if(RString.startsWith(p, sn)){
         n = p.substring(sn.length);
      }else{
         n = p;
      }
      var t = null;
      switch(n){
         case 'source':
            t = RClass.create(FTag);
            break;
         case 'write':
            t = RClass.create(FTagWrite);
            break;
         case 'true':
            t = RClass.create(FTagTrue);
            break;
         case 'false':
            t = RClass.create(FTagFalse);
            break;
         case 'equals':
            t = RClass.create(FTagEquals);
            break;
         case 'notEquals':
            t = RClass.create(FTagNotEquals);
            break;
         default:
            throw new TError(o, 'Unknown tag type. (name={1})', n);
      }
      return t;
   }
   MO.FTagDocument_root = function FTagDocument_root(){
      return this._root;
   }
   MO.FTagDocument_loadNode = function FTagDocument_loadNode(pn, pe){
      var o = this;
      var x = o.create(pe.nodeName);
      if(pn){
         pn.push(x);
      }else{
         o._root = x;
      }
      var eas = pe.attributes;
      if(eas){
         var c = eas.length;
         for(var i = 0; i < c; i++){
            var ea = eas[i];
            if(ea.nodeName){
               x.set(ea.nodeName, RXml.formatText(ea.value));
            }
         }
      }
      var ens = pe.childNodes
      if(ens){
         var c = ens.length;
         for(var i = 0; i < c; i++){
            var en = ens[i];
            switch(en.nodeType){
               case ENodeType.Text:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.nodeValue);
                  x.push(xt);
                  break;
               case ENodeType.Data:
                  var xt = RClass.create(FTagText);
                  xt.setText(en.data);
                  x.push(xt);
                  break;
               case ENodeType.Node:
                  o.loadNode(x, en);
                  break;
            }
         }
      }
   }
   MO.FTagDocument_load = function FTagDocument_load(p){
      var o = this;
      var s = '<source>' + p + '</source>'
      s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
      s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
      s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
      s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
      s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
      var xr = RXml.makeString(s);
      o.loadNode(null, xr.firstChild);
   }
   MO.FTagDocument_parse = function FTagDocument_parse(p){
      var o = this;
      p.resetSource();
      o._root.parse(p);
      return p.source();
   }
   MO.FTagDocument_dump = function FTagDocument_dump(){
      var o = this;
      var r = new TString();
      r.appendLine(RClass.dump(o));
      r.appendLine(o.root().dump(r));
      return r.toString();
   }
}
with(MO){
   MO.FTagEquals = function FTagEquals(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o._value    = null;
      o.onBegin   = FTagEquals_onBegin;
      o.set       = FTagEquals_set;
      o.toString  = FTagEquals_toString;
      return o;
   }
   MO.FTagEquals_onBegin = function FTagEquals_onBegin(p){
      var o = this;
      var r = false;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for(var i = 0; i < c; i++){
         var v = vs[i]
         if(s == v){
            r = true;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagEquals_set = function FTagEquals_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagEquals_toString = function FTagEquals_toString(){
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
with(MO){
   MO.FTagFalse = function FTagFalse(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o.onBegin   = FTagFalse_onBegin;
      o.set       = FTagFalse_set;
      o.toString  = FTagFalse_toString;
      return o;
   }
   MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
      var o = this;
      var v = p.get(o._source);
      return RBoolean.parse(v) ? EResult.Skip : EResult.Continue;
   }
   MO.FTagFalse_set = function FTagFalse_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagFalse_toString = function FTagFalse_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
with(MO){
   MO.FTagNotEquals = function FTagNotEquals(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o._value    = null;
      o.onBegin   = FTagNotEquals_onBegin;
      o.set       = FTagNotEquals_set;
      o.toString  = FTagNotEquals_toString;
      return o;
   }
   MO.FTagNotEquals_onBegin = function FTagNotEquals_onBegin(p){
      var o = this;
      var r = true;
      var s = p.get(o._source);
      var vs = o._value.split('|');
      var c = vs.length;
      for(var i = 0; i < c; i++){
         var v = vs[i]
         if(s == v){
            r = false;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagNotEquals_set = function FTagNotEquals_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
         case 'value':
            o._value = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagNotEquals_toString = function FTagNotEquals_toString(){
      var o = this;
      return 'source=' + o._source + ', value=' + o._value;
   }
}
with(MO){
   MO.FTagText = function FTagText(o){
      o = RClass.inherits(this, o, FTag);
      o._text    = null;
      o.onBegin  = FTagText_onBegin;
      o.text     = FTagText_text;
      o.setText  = FTagText_setText;
      o.toString = FTagText_toString;
      return o;
   }
   MO.FTagText_onBegin = function FTagText_onBegin(p){
      var t = this._text;
      if(p._trimLeft){
         if(RString.startsWith(t, '\r')){
            t = t.substring(1);
         }
         if(RString.startsWith(t, '\n')){
            t = t.substring(1);
         }
      }
      if(p._trimRight){
         if(RString.endsWith(t, '\r')){
            t = t.substring(0, t.length - 1);
         }
         if(RString.endsWith(t, '\n')){
            t = t.substring(0, t.length - 1);
         }
      }
      p.write(t);
      return EResult.Skip;
   }
   MO.FTagText_text = function FTagText_text(){
      return this._text;
   }
   MO.FTagText_setText = function FTagText_setText(p){
      this._text = p;
   }
   MO.FTagText_toString = function FTagText_toString(){
      var o = this;
      return '{' + o._text + '}';
   }
}
with(MO){
   MO.FTagTrue = function FTagTrue(o){
      o = RClass.inherits(this, o, FTag);
      o._trimLeft = true;
      o._source   = null;
      o.onBegin   = FTagTrue_onBegin;
      o.set       = FTagTrue_set;
      o.toString  = FTagTrue_toString;
      return o;
   }
   MO.FTagTrue_onBegin = function FTagTrue_onBegin(p){
      var o = this;
      var r = false;
      var ns = o._source.split('|');
      var c = ns.length;
      for(var i = 0; i < c; i++){
         var n = ns[i]
         var v = p.get(n);
         if(RBoolean.parse(v)){
            r = true;
            break;
         }
      }
      return r ? EResult.Continue : EResult.Skip;
   }
   MO.FTagTrue_set = function FTagTrue_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagTrue_toString = function FTagTrue_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
with(MO){
   MO.FTagWrite = function FTagWrite(o){
      o = RClass.inherits(this, o, FTag);
      o._source  = null;
      o.onBegin  = FTagWrite_onBegin;
      o.set      = FTagWrite_set;
      o.toString = FTagWrite_toString;
      return o;
   }
   MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
      var o = this;
      var v = p.get(o._source);
      p.write(v);
      return EResult.Skip;
   }
   MO.FTagWrite_set = function FTagWrite_set(n, v){
      var o = this;
      switch(n){
         case 'source':
            o._source = v;
            return;
      }
      o.__base.FTag.set.call(o, n, v);
   }
   MO.FTagWrite_toString = function FTagWrite_toString(){
      var o = this;
      return 'source=' + o._source;
   }
}
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
with(MO){
   MO.SProcessEvent = function SProcessEvent(){
      var o = this;
      o.index = null;
      o.code  = null;
      o.data  = null;
      return o;
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
      var o = this;
      o.owner          = null;
      o.url            = null;
      o.action         = null;
      o.parameter      = null;
      o.inputDocument  = null;
      o.outputDocument = null;
      o.callback       = null;
      o.process        = SXmlEvent_process;
      o.dispose        = SXmlEvent_dispose;
      return o;
   }
   MO.SXmlEvent_process = function SXmlEvent_process(p){
      var o = this;
      o.outputDocument = p.document;
      o.outputNode = p.root;
      if(o.owner){
         o.callback.call(o.owner, o);
      }else{
         o.callback(o);
      }
   }
   MO.SXmlEvent_dispose = function SXmlEvent_dispose(){
      var o = this;
      o.owner = null;
      o.url = null;
      o.action = null;
      o.parameter = null;
      o.inputDocument = null;
      o.outputDocument = null;
      o.callback = null;
   }
}
with(MO){
   MO.FContent = function FContent(o){
      o = RClass.inherits(this, o, FObject);
      o._name = null;
      o.name  = FContent_name;
      return o;
   }
   MO.FContent_name = function FContent_name(){
      return this._name;
   }
}
with(MO){
   MO.FContentConsole = function FContentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o.connections = null;
      o.onLoad      = FContentConsole_onLoad;
      o.construct   = FContentConsole_construct;
      o.alloc       = FContentConsole_alloc;
      o.process     = FContentConsole_process;
      o.send        = FContentConsole_send;
      return o;
   }
   MO.FContentConsole_construct = function FContentConsole_construct(){
      var o = this;
      o.connections = new TObjects();
   }
   MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FContentConsole_alloc = function FContentConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o.connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FContentConsole_process = function FContentConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FContentConsole_send = function FContentConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FContentPipeline = function FContentPipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._scopeCd = EScope.Global;
      o.scopeCd  = FContentPipeline_scopeCd;
      return o;
   }
   MO.FContentPipeline_scopeCd = function FContentPipeline_scopeCd(){
      return this._scopeCd;
   }
}
with(MO){
   MO.FDragConsole = function FDragConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd        = EScope.Local;
      o._activeDragable = null;
      o._dragables      = null;
      o.onMouseDown     = FDragConsole_onMouseDown;
      o.onMouseMove     = FDragConsole_onMouseMove;
      o.onMouseUp       = FDragConsole_onMouseUp;
      o.construct       = FDragConsole_construct;
      o.register        = FDragConsole_register;
      o.unregister      = FDragConsole_unregister;
      o.clear           = FDragConsole_clear;
      return o;
   }
   MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
      var o = this;
      var es = p.source;
      if(!es){
         return;
      }
      if(!RClass.isClass(es, MUiDragable)){
         return;
      }
      RWindow.setOptionSelect(false);
      o._activeDragable = es;
      es.onDragStart(p);
   }
   MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      o._activeDragable.onDragMove(p);
   }
   MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
      var o = this;
      if(!o._activeDragable){
         return;
      }
      RWindow.setOptionSelect(true);
      o._activeDragable.onDragStop(p);
      o._activeDragable = null;
   }
   MO.FDragConsole_construct = function FDragConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._dragables = new TObjects();
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FDragConsole_register = function FDragConsole_register(p){
      this._dragables.push(p);
   }
   MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
      this._dragables.remove(p);
   }
   MO.FDragConsole_clear = function FDragConsole_clear(){
      this._dragables.clear();
   }
}
with(MO){
   MO.FEvent = function FEvent(o){
      o = RClass.inherits(this, o, FObject);
      o._owner      = null;
      o._callback   = null;
      o._valid      = true;
      o.owner       = FEvent_owner;
      o.setOwner    = FEvent_setOwner;
      o.callback    = FEvent_callback;
      o.setCallback = FEvent_setCallback;
      o.valid       = FEvent_valid;
      o.setValid    = FEvent_setValid;
      o.process     = FEvent_process;
      return o;
   }
   MO.FEvent_owner = function FEvent_owner(){
      return this._owner;
   }
   MO.FEvent_setOwner = function FEvent_setOwner(p){
      this._owner = p;
   }
   MO.FEvent_callback = function FEvent_callback(){
      return this._callback;
   }
   MO.FEvent_setCallback = function FEvent_setCallback(p){
      this._callback = p;
   }
   MO.FEvent_valid = function FEvent_valid(){
      return this._valid;
   }
   MO.FEvent_setValid = function FEvent_setValid(p){
      this._valid = p;
   }
   MO.FEvent_process = function FEvent_process(){
      var o = this;
      if(o._valid){
         var s = o._owner;
         if(s){
            o._callback.call(s, o);
         }else{
            o._callback(o);
         }
      }
   }
}
with(MO){
   MO.FEventConsole = function FEventConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._thread        = null;
      o._interval      = 100;
      o._processEvents = null;
      o._events        = null;
      o.onProcess      = FEventConsole_onProcess;
      o.construct      = FEventConsole_construct;
      o.register       = FEventConsole_register;
      o.push           = FEventConsole_push;
      o.clear          = FEventConsole_clear;
      return o;
   }
   MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
      var o = this;
      var es = o._events;
      if(es.isEmpty()){
         return;
      }
      var ps = o._processEvents;
      ps.assign(es);
      es.clear();
      var c = ps.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            ps.get(i).process();
         }
         ps.clear();
      }
   }
   MO.FEventConsole_construct = function FEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._processEvents = new TObjects();
      o._events = new TObjects();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.lsnsProcess.register(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }
   MO.FEventConsole_register = function FEventConsole_register(po, pc){
      var o = this;
      var e = RClass.create(FEvent);
      e.owner = po;
      e.callback = pc;
      o._events.push(e);
   }
   MO.FEventConsole_push = function FEventConsole_push(p){
      var o = this;
      var es = o._events;
      if(!es.contains(p)){
         es.push(p);
      }
   }
   MO.FEventConsole_clear = function FEventConsole_clear(){
      this._events.clear();
   }
}
with(MO){
   MO.FHttpConsole = function FHttpConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._pool     = null;
      o.onLoad    = FHttpConsole_onLoad;
      o.construct = FHttpConsole_construct;
      o.alloc     = FHttpConsole_alloc;
      o.send      = FHttpConsole_send;
      o.dispose   = FHttpConsole_dispose;
      return o;
   }
   MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(p){
      var o = this;
      o._pool.free(p);
   }
   MO.FHttpConsole_construct = function FHttpConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pool = RClass.create(FObjectPool);
   }
   MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
      var o = this;
      var p = o._pool;
      if(!p.hasFree()){
         var c = RClass.create(FHttpConnection);
         c._asynchronous = true;
         o._pool.push(c);
      }
      var c = p.alloc();
      c.clearLoadListeners();
      c.addLoadListener(o, o.onLoad);
      return c;
   }
   MO.FHttpConsole_send = function FHttpConsole_send(url, data){
      var o = this;
      var connection = o.alloc();
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FIdleConsole = function FIdleConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope            = EScope.Page;
      o.register         = FIdleConsole_register;
      return o;
   }
   MO.FIdleConsole_register = function FIdleConsole_register(c, cFun){
      var o = this;
      o.active = new TActive(c, cFun);
      o.active.interval = 100;
      RConsole.find(FActiveConsole).push(o.active);
   }
   MO.FIdleConsole_construct = function FIdleConsole_construct(){
      var o = this;
   }
}
with(MO){
   MO.FLoggerConsole = function FLoggerConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope      = EScope.Page;
      o.iLogger    = null;
      o.onKeyDown  = FLoggerConsole_onKeyDown;
      o.construct  = FLoggerConsole_construct;
      o.connect    = FLoggerConsole_connect;
      o.disconnect = FLoggerConsole_disconnect;
      o.output     = FLoggerConsole_output;
      return o;
   }
   MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
      if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
         this.connect();
      }
   }
   MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
      var o = this;
      o.base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
   }
   MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
      this.iLogger = null;
   }
   MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
      var o = this;
      if(o.iLogger){
         var m = RClass.dump(obj);
         if(ms){
            m += ' (' + ms + 'ms)';
         }
         var s = level + ' [' + RString.rpad(m, 36) + '] ';
         if(stack){
            s += RString.rpad(msg, 120) + ' [' + stack + ']';
         }else{
            s += msg;
         }
         o.iLogger.Output(s);
      }
   }
   MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FMonitorConsole = function FMonitorConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope      = EScope.Global;
      o.working    = false;
      o.interval   = 10;
      o.intervalId = null;
      o.monitors   = new TList();
      o.hWindow    = null;
      o.doInterval = FMonitorConsole_doInterval;
      o.push       = FMonitorConsole_push;
      o.process    = FMonitorConsole_process;
      o.processAll = FMonitorConsole_processAll;
      o.startup    = FMonitorConsole_startup;
      o.wait       = FMonitorConsole_wait;
      o.release    = FMonitorConsole_release;
      return o;
   }
   MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
      this.startup();
      monitor.id = this.monitors.sync(monitor);
      monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
      monitor.status = EMonitor.Active;
   }
   MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
      if(monitor){
         switch(monitor.status){
            case EMonitor.Sleep:
               break;
            case EMonitor.Active:
               monitor.process(this.interval);
               break;
            case EMonitor.Cancel:
               this.monitors.removeItem(monitor);
               break;
         }
      }
   }
   MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
      this.working = true;
      var monitors = this.monitors;
      for(var n=0; n<monitors.count; n++){
         this.process(monitors.get(n));
      }
      this.working = false;
   }
   MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
      var con = RGlobal.get(FMonitorConsole);
      if(con && !con.working){
         con.processAll();
      }
   }
   MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
      if(!this.hWindow){
         this.hWindow = window;
         debugger;
         this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
      }
   }
   MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
   }
   MO.FMonitorConsole_release = function FMonitorConsole_release(){
      if(this.hWindow && this.intervalId){
         this.hWindow.clearInterval(this.intervalId);
      }
   }
}
with(MO){
   MO.FMouseConsole = function FMouseConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._activeCapture = null;
      o.onMouseDown    = FMouseConsole_onMouseDown;
      o.onMouseMove    = FMouseConsole_onMouseMove;
      o.onMouseUp      = FMouseConsole_onMouseUp;
      o.construct      = FMouseConsole_construct;
      o.captureStart   = FMouseConsole_captureStart;
      o.capture        = FMouseConsole_capture;
      o.captureStop    = FMouseConsole_captureStop;
      o.register       = FMouseConsole_register;
      o.unregister     = FMouseConsole_unregister;
      o.clear          = FMouseConsole_clear;
      return o;
   }
   MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
      var o = this;
      var s = RHtml.searchLinker(p.hSource, MMouseCapture);
      if(!s){
         return;
      }
      if(!s.testMouseCapture()){
         return;
      }
      o._activeCapture = s;
      o.captureStart(p);
   }
   MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.capture(p);
   }
   MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
      var o = this;
      if(!o._activeCapture){
         return;
      }
      o.captureStop(p);
   }
   MO.FMouseConsole_construct = function FMouseConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         RWindow.setOptionSelect(false);
         c.onMouseCaptureStart(p);
      }
   }
   MO.FMouseConsole_capture = function FMouseConsole_capture(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         if(c.testMouseCapture()){
            c.onMouseCapture(p);
         }else{
            o.captureStop(p)
         }
      }
   }
   MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         c.onMouseCaptureStop(p);
         o._activeCapture = null;
      }
      RWindow.setOptionSelect(true);
   }
   MO.FMouseConsole_register = function FMouseConsole_register(p){
   }
   MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
   }
   MO.FMouseConsole_clear = function FMouseConsole_clear(){
   }
}
with(MO){
   MO.FPipeline = function FPipeline(o){
      o = RClass.inherits(this, o, FObject);
      o._code = null;
      o.code  = FPipeline_code;
      return o;
   }
   MO.FPipeline_code = function FPipeline_code(){
      return this._code;
   }
}
with(MO){
   MO.FProcess = function FProcess(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = null;
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcess_ohMessage;
      o.onMessage = FProcess_onMessage;
      o.construct = FProcess_construct;
      o.name      = FProcess_name;
      o.start     = FProcess_start;
      o.process   = FProcess_process;
      return o;
   }
   MO.FProcess_ohMessage = function FProcess_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcess_onMessage = function FProcess_onMessage(p){
   }
   MO.FProcess_name = function FProcess_name(){
      return this._name;
   }
   MO.FProcess_construct = function FProcess_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcess_start = function FProcess_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcess_process = function FProcess_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessConsole = function FProcessConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o.connections = null;
      o.onLoad      = FProcessConsole_onLoad;
      o.construct   = FProcessConsole_construct;
      o.alloc       = FProcessConsole_alloc;
      o.process     = FProcessConsole_process;
      o.send        = FProcessConsole_send;
      return o;
   }
   MO.FProcessConsole_construct = function FProcessConsole_construct(){
      var o = this;
      o.connections = new TObjects();
   }
   MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
      var o = this;
      var e = o.event;
      e.document = o.document;
      e.process();
      o.event = null;
      o.document = null;
      o._statusFree = true;
   }
   MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o.connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      return a;
   }
   MO.FProcessConsole_process = function FProcessConsole_process(e){
      var o = this;
      var c = o.alloc();
      c.event = e;
      switch(e.code){
         case EXmlEvent.Send:
            c.send(e.url, e.document);
            break;
         case EXmlEvent.Receive:
            c.receive(e.url, e.document);
            break;
         case EXmlEvent.SyncSend:
            return c.syncSend(e.url, e.document);
         case EXmlEvent.SyncReceive:
            return c.syncReceive(e.url, e.document);
      }
   }
   MO.FProcessConsole_send = function FProcessConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FProcessEvent = function FProcessEvent(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o._data      = null;
      o._listeners = null;
      o.code       = FProcessEvent_code;
      o.setCode    = FProcessEvent_setCode;
      o.data       = FProcessEvent_data;
      o.setData    = FProcessEvent_setData;
      o.register   = FProcessEvent_register;
      return o;
   }
   MO.FProcessEvent_name = function FProcessEvent_name(){
      return this._name;
   }
   MO.FProcessEvent_code = function FProcessEvent_code(){
      return this._code;
   }
   MO.FProcessEvent_setCode = function FProcessEvent_setCode(p){
      this._code = p;
   }
   MO.FProcessEvent_data = function FProcessEvent_data(){
      return this._data;
   }
   MO.FProcessEvent_setData = function FProcessEvent_setData(p){
      this._data = p;
   }
   MO.FProcessEvent_register = function FProcessEvent_register(po, pf){
      var o = this;
      if(!o._listeners){
         o._listeners = new TListeners();
      }
      o._listeners.register(po, pf);
   }
}
with(MO){
   MO.FProcessor = function FProcessor(o){
      o = RClass.inherits(this, o, FObject);
      o._name     = null;
      o._source   = null;
      o._worker   = null;
      o._events   = null;
      o.ohMessage = FProcessor_ohMessage;
      o.onMessage = FProcessor_onMessage;
      o.construct = FProcessor_construct;
      o.name      = FProcessor_name;
      o.start     = FProcessor_start;
      o.process   = FProcessor_process;
      return o;
   }
   MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcessor_onMessage = function FProcessor_onMessage(p){
   }
   MO.FProcessor_name = function FProcessor_name(){
      return this._name;
   }
   MO.FProcessor_construct = function FProcessor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcessor_start = function FProcessor_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
      }
      o._source = p;
      var w = o._worker = new Worker(p);
      w.__linker = o;
      w.onmessage = o.ohMessage;
   }
   MO.FProcessor_process = function FProcessor_process(p){
      var o = this;
      var es = o._events;
      var c = es.count();
      es.push(p);
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessServer = function FProcessServer(o){
      o = RClass.inherits(this, o, FObject);
      o._name               = null;
      o._handle             = null;
      o._processors         = null;
      o.ohInterval          = FProcessServer_ohInterval;
      o.onInterval          = FProcessServer_onInterval;
      o.ohMessage           = FProcessServer_ohMessage;
      o.onMessage           = FProcessServer_onMessage;
      o.construct           = FProcessServer_construct;
      o.name                = FProcessServer_name;
      o.registerProcessor   = FProcessServer_registerProcessor;
      o.unregisterProcessor = FProcessServer_unregisterProcessor;
      o.send                = FProcessServer_send;
      o.process             = FProcessServer_process;
      return o;
   }
   MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
      FProcessServer.__linker.onInterval();
   }
   MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
      var o = this;
   }
   MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
      FProcessServer.__linker.onMessage(p.data);
   }
   MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
      var o = this;
      console.log('messgae', this, p);
   }
   MO.FProcessServer_construct = function FProcessServer_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._processors = new TDictionary();
   }
   MO.FProcessServer_name = function FProcessServer_name(){
      return this._name;
   }
   MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
      this._processors.set(c, p);
   }
   MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
      this._processors.set(c, null);
   }
   MO.FProcessServer_send = function FProcessServer_send(p){
      var o = this;
      postMessage(p);
   }
   MO.FProcessServer_process = function FProcessServer_process(){
      var o = this;
      onmessage = o.ohMessage;
      FProcessServer.__linker = o;
   }
}
with(MO){
   MO.FStatistics = function FStatistics(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o.reset      = FStatistics_reset;
      o.resetFrame = FStatistics_resetFrame;
      return o;
   }
   MO.FStatistics_reset = function FStatistics_reset(){
   }
   MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
   }
}
with(MO){
   MO.FStatisticsConsole = function FStatisticsConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._statisticses = null;
      o.construct     = FStatisticsConsole_construct;
      o.register      = FStatisticsConsole_register;
      o.unregister    = FStatisticsConsole_unregister;
      o.find          = FStatisticsConsole_find;
      o.statisticses  = FStatisticsConsole_statisticses;
      o.reset         = FStatisticsConsole_reset;
      o.resetFrame    = FStatisticsConsole_resetFrame;
      return o;
   }
   MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
      var o = this;
      o._statisticses = new TDictionary();
   }
   MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
      this._statisticses.set(n, s);
   }
   MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
      return this._statisticses.remove(n);
   }
   MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
      return this._statisticses.get(n);
   }
   MO.FStatisticsConsole_statisticses = function FStatisticsConsole_statisticses(){
      return this._statisticses;
   }
   MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).reset();
      }
   }
   MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).resetFrame();
      }
   }
}
with(MO){
   MO.FThread = function FThread(o){
      o = RClass.inherits(this, o, FObject, MListenerProcess);
      o._name       = null;
      o._statusCd   = EThreadStatus.Sleep;
      o._interval   = 100;
      o._delay      = 0;
      o.construct   = FThread_construct;
      o.name        = FThread_name;
      o.statusCd    = FThread_statusCd;
      o.interval    = FThread_interval;
      o.setInterval = FThread_setInterval;
      o.start       = FThread_start;
      o.stop        = FThread_stop;
      o.process     = FThread_process;
      return o;
   }
   MO.FThread_construct = function FThread_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FThread_name = function FThread_name(){
      return this._name;
   }
   MO.FThread_statusCd = function FThread_statusCd(){
      return this._statusCd;
   }
   MO.FThread_interval = function FThread_interval(){
      return this._interval;
   }
   MO.FThread_setInterval = function FThread_setInterval(p){
      this._interval = p;
   }
   MO.FThread_start = function FThread_start(){
      this._statusCd = EThreadStatus.Active;
   }
   MO.FThread_stop = function FThread_stop(){
      this._statusCd = EThreadStatus.Finish;
   }
   MO.FThread_process = function FThread_process(p){
      var o = this;
      if(o._delay <= 0){
         o.processProcessListener(o);
         o._delay = o._interval;
      }else{
         o._delay -= p;
      }
   }
}
with(MO){
   MO.FThreadConsole = function FThreadConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._active      = true;
      o._interval    = 5;
      o._threads     = null;
      o._hWindow     = null;
      o._hIntervalId = null;
      o.ohInterval   = FThreadConsole_ohInterval;
      o.construct    = FThreadConsole_construct;
      o.push         = FThreadConsole_push;
      o.start        = FThreadConsole_start;
      o.process      = FThreadConsole_process;
      o.processAll   = FThreadConsole_processAll;
      o.dispose      = FThreadConsole_dispose;
      return o;
   }
   MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
      var c = RConsole.get(FThreadConsole);
      c.processAll();
   }
   MO.FThreadConsole_push = function FThreadConsole_push(p){
      this._threads.push(p);
   }
   MO.FThreadConsole_start = function FThreadConsole_start(p){
      p.start();
      this._threads.push(p);
   }
   MO.FThreadConsole_construct = function FThreadConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._threads = new TObjects();
      o._hWindow = window;
      o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
   }
   MO.FThreadConsole_process = function FThreadConsole_process(p){
      var o = this;
      if(p){
         switch(p.statusCd()){
            case EThreadStatus.Sleep:
               break;
            case EThreadStatus.Active:
               p.process(o._interval);
               break;
            case EThreadStatus.Finish:
               p.dispose();
               o._threads.remove(p);
               break;
         }
      }
   }
   MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
      var o = this;
      if(o._active){
         var ts = o._threads;
         var c = ts.count();
         for(var n = 0; n < c; n++){
            var t = ts.get(n);
            o.process(t);
         }
      }
   }
   MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
      var o = this;
      var hw = o._hWindow;
      if(hw){
         var hi = o._hIntervalId;
         if(hi){
            hw.clearInterval(hi);
            o._hIntervalId = null;
         }
         o._hWindow = null;
      }
   }
}
with(MO){
   MO.FXmlConsole = function FXmlConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._connections = null;
      o._caches      = null;
      o.onLoad       = FXmlConsole_onLoad;
      o.construct    = FXmlConsole_construct;
      o.alloc        = FXmlConsole_alloc;
      o.send         = FXmlConsole_send;
      o.sendAsync    = FXmlConsole_sendAsync;
      o.load         = FXmlConsole_load;
      o.process      = FXmlConsole_process;
      return o;
   }
   MO.FXmlConsole_construct = function FXmlConsole_construct(){
      var o = this;
      o._connections = new TObjects();
      o._caches = new TDictionary();
   }
   MO.FXmlConsole_onLoad = function FXmlConsole_onLoad(p){
      var o = this;
      debugger
   }
   MO.FXmlConsole_alloc = function FXmlConsole_alloc(){
      var o = this;
      var a = null;
      var cs = o._connections;
      for(var n = cs.count - 1; n >= 0; n--){
         var c = cs.get(n);
         if(c._statusFree){
            a = c;
            break;
         }
      }
      if(!a){
         a = RClass.create(FXmlConnection);
         cs.push(a);
         a.onLoad = o.onLoad;
      }
      a._statusFree = false;
      a.clearLoadListeners();
      return a;
   }
   MO.FXmlConsole_send = function FXmlConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      c._asynchronous = false;
      var r = c.send(u, d);
      c._statusFree = true;
      return r;
   }
   MO.FXmlConsole_sendAsync = function FXmlConsole_sendAsync(u, d, p){
      var o = this;
      var c = o.alloc();
      c._asynchronous = true;
      c._parameters = p;
      c.send(u, d);
      return c;
   }
   MO.FXmlConsole_load = function FXmlConsole_load(u, d, p){
      var o = this;
      var v = o._caches.get(u);
      if(v){
         return v;
      }
      var c = o.alloc();
      c._asynchronous = true;
      c._parameters = p;
      v = c._cache = RClass.create(FXmlData);
      c.send(u, d);
      o._caches.set(u, v);
      return v;
   }
   MO.FXmlConsole_process = function FXmlConsole_process(p){
      var o = this;
      if(p.constructor != SXmlEvent){
         throw new TError('Parameter type is invalid.');
      }
      var c = o.alloc();
      c._asynchronous = true;
      c.send(p.url, p.inputDocument);
      c.addLoadListener(p, p.process);
      return c;
   }
}
MO.EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 0;
   o.Explorer = 1;
   o.FireFox = 2;
   o.Chrome = 3;
   o.Safari = 4;
   return o;
}
MO.EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 0;
   o.Pc = 1;
   o.Mobile = 2;
   return o;
}
MO.ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 0;
   o.Window = 1;
   o.Linux = 2;
   o.Android = 3;
   o.Apple = 4;
   return o;
}
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   o.optionProcess = false;
   o.optionStorage = false;
   o.blobCreate    = false;
   return o;
}
with(MO){
   MO.STouchEvent = function STouchEvent(){
      var o = this;
      o.dispose = STouchEvent_dispose;
      return o;
   }
   MO.STouchEvent_dispose = function STouchEvent_dispose(){
      var o = this;
   }
}
with(MO){
   MO.TDumpItem = function TDumpItem(){
      var o = this;
      o.hParent      = null;
      o.hPanel       = null;
      o.hDocument    = null;
      o.hTable       = null;
      o.hText        = null;
      o.hRow         = null;
      o.link         = null;
      o.level        = 0;
      o.caption      = null;
      o.children     = new Array();
      o.items        = new Array();
      o.loaded       = false;
      o.innerDisplay = false;
      o.display      = false;
      o.create       = TDumpItem_create;
      o.push         = TDumpItem_push;
      o.innerShow    = TDumpItem_innerShow;
      o.show         = TDumpItem_show;
      return o;
   }
   MO.TDumpItem_create = function TDumpItem_create(){
      var o = this;
      var r = o.children[o.children.length] = new TDumpItem();
      return r;
   }
   MO.TDumpItem_push = function TDumpItem_push(v){
      var o = this;
      o.items[o.items.length] = v;
   }
   MO.TDumpItem_innerShow = function TDumpItem_innerShow(v){
      var o = this;
      var c = o.items.length;
      for(var n = 0; n < c; n++){
         var tr = o.items[n];
         RHtml.visibleSet(tr, v);
      }
      var c = o.children.length;
      for(var n = 0; n < c; n++){
         var d = o.children[n];
         RHtml.visibleSet(d.hRow, v);
         if(v){
            d.show(d.innerDisplay);
         }else{
            d.innerDisplay = d.display;
            d.show(false);
         }
      }
   }
   MO.TDumpItem_show = function TDumpItem_show(v){
      var o = this;
      o.display = v;
      var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
      o.hText.innerHTML = RHtml.toHtml(label);
      o.innerShow(v);
   }
}
with(MO){
   MO.RBrowser = function RBrowser(){
      var o = this;
      o._capability    = null;
      o._deviceCd      = MO.EDevice.Unknown;
      o._softwareCd    = MO.ESoftware.Unknown;
      o._typeCd        = MO.EBrowser.Unknown;
      o._supportHtml5  = false;
      o._hostPath      = '';
      o._contentPath   = '';
      o.onLog          = RBrowser_onLog;
      o.construct      = RBrowser_construct;
      o.capability     = RBrowser_capability;
      o.supportHtml5   = RBrowser_supportHtml5;
      o.hostPath       = RBrowser_hostPath;
      o.setHostPath    = RBrowser_setHostPath;
      o.contentPath    = RBrowser_contentPath;
      o.setContentPath = RBrowser_setContentPath;
      o.isBrowser      = RBrowser_isBrowser;
      o.encode         = RBrowser_encode;
      o.decode         = RBrowser_decode;
      o.urlEncode      = RBrowser_urlEncode;
      o.urlDecode      = RBrowser_urlDecode;
      return o;
   }
   MO.RBrowser_onLog = function RBrowser_onLog(s, p){
      console.log(p);
   }
   MO.RBrowser_construct = function RBrowser_construct(){
      var o = this;
      var s = window.navigator.userAgent.toLowerCase();
      if(s.indexOf("android") != -1){
         o._typeCd = EDevice.Mobile;
         o._softwareCd = ESoftware.Android;
      }
      if(s.indexOf("chrome") != -1){
         o._typeCd = EBrowser.Chrome;
      }else if(s.indexOf("firefox") != -1){
         o._typeCd = EBrowser.FireFox;
      }else if((s.indexOf("msie") != -1) || (s.indexOf("windows") != -1)){
         o._typeCd = EBrowser.Explorer;
      }else if((s.indexOf("safari") != -1) || (s.indexOf("applewebkit") != -1)){
         o._typeCd = EBrowser.Safari;
      }else{
         alert('Unknown browser.\n' + s);
         return;
      }
      if(o._typeCd == EBrowser.Chrome){
         RLogger.lsnsOutput.register(o, o.onLog);
      }
      RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
      if(window.applicationCache){
         o._supportHtml5 = true;
      }
      var capability = o._capability = new SBrowserCapability();
      if(window.Worker){
         capability.optionProcess = true;
      }
      if(window.localStorage){
         capability.optionStorage = true;
      }
      try{
         new Blob(["Test"], {'type':'text/plain'});
         capability.blobCreate = true;
      }catch(e){
         RLogger.warn(o, 'Browser blob not support.');
      }
   }
   MO.RBrowser_capability = function RBrowser_capability(){
      return this._capability;
   }
   MO.RBrowser_supportHtml5 = function RBrowser_supportHtml5(){
      return this._supportHtml5;
   }
   MO.RBrowser_hostPath = function RBrowser_hostPath(p){
      var o = this;
      if(p){
         return o._hostPath + p;
      }
      return o._hostPath;
   }
   MO.RBrowser_setHostPath = function RBrowser_setHostPath(p){
      this._hostPath = p;
   }
   MO.RBrowser_contentPath = function RBrowser_contentPath(p){
      var o = this;
      if(p){
         return o._contentPath + p;
      }
      return o._contentPath;
   }
   MO.RBrowser_setContentPath = function RBrowser_setContentPath(p){
      this._contentPath = p;
   }
   MO.RBrowser_isBrowser = function RBrowser_isBrowser(p){
      return this._typeCd == p;
   }
   MO.RBrowser_encode = function RBrowser_encode(value){
      return escape(value);
   }
   MO.RBrowser_decode = function RBrowser_decode(value){
      return unescape(value);
   }
   MO.RBrowser_urlEncode = function RBrowser_urlEncode(url, flag){
      if(flag){
         return encodeURIComponent(url);
      }
      return encodeURI(url);
   }
   MO.RBrowser_urlDecode = function RBrowser_urlDecode(url, flag){
      if(flag){
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }
   MO.RBrowser = new RBrowser();
}
with(MO){
   MO.RBuilder = function RBuilder(){
      var o = this;
      o.create             = RBuilder_create;
      o.createIcon         = RBuilder_createIcon;
      o.createImage        = RBuilder_createImage;
      o.createText         = RBuilder_createText;
      o.createButton       = RBuilder_createButton;
      o.createCheck        = RBuilder_createCheck;
      o.createRadio        = RBuilder_createRadio;
      o.createEdit         = RBuilder_createEdit;
      o.createFile         = RBuilder_createFile;
      o.createSpan         = RBuilder_createSpan;
      o.createDiv          = RBuilder_createDiv;
      o.createTable        = RBuilder_createTable;
      o.createTableRow     = RBuilder_createTableRow;
      o.createTableCell    = RBuilder_createTableCell;
      o.createFragment     = RBuilder_createFragment;
      o.append             = RBuilder_append;
      o.appendIcon         = RBuilder_appendIcon;
      o.appendImage        = RBuilder_appendImage;
      o.appendEmpty        = RBuilder_appendEmpty;
      o.appendText         = RBuilder_appendText;
      o.appendButton       = RBuilder_appendButton;
      o.appendCheck        = RBuilder_appendCheck;
      o.appendRadio        = RBuilder_appendRadio;
      o.appendEdit         = RBuilder_appendEdit;
      o.appendFile         = RBuilder_appendFile;
      o.appendSpan         = RBuilder_appendSpan;
      o.appendDiv          = RBuilder_appendDiv;
      o.appendTable        = RBuilder_appendTable;
      o.appendTableRow     = RBuilder_appendTableRow;
      o.appendTableRowCell = RBuilder_appendTableRowCell;
      o.appendTableCell    = RBuilder_appendTableCell;
      return o;
   }
   MO.RBuilder_create = function RBuilder_create(h, t, s){
      var o = this;
      var d = null;
      if(h.ownerDocument){
         d = h.ownerDocument;
      }else if(h.hDocument){
         d = h.hDocument;
      }else{
         d = h;
      }
      var h = d.createElement(t);
      if(s){
         h.className = s;
      }
      return h;
   }
   MO.RBuilder_createIcon = function RBuilder_createIcon(d, s, u, w, h){
      var r = this.create(d, 'IMG', RString.nvl(s, 'Tag_Icon'));
      r.align = 'absmiddle';
      if(u){
         r.src = RResource.iconPath(u);
      }
      if(w){
         r.style.width = w + 'px';
      }
      if(h){
         r.style.height = h + 'px';
      }
      return r;
   }
   MO.RBuilder_createImage = function RBuilder_createImage(d, s, u, w, h){
      var r = this.create(d, 'IMG', u);
      if(u){
         r.src = RResource.imagePath(u);
      }
      if(w){
         r.style.width = w;
      }
      if(h){
         r.style.height = h;
      }
      return r;
   }
   MO.RBuilder_createText = function RBuilder_createText(d, s, v){
      var r = this.create(d, 'SPAN', s);
      if(v){
         r.innerHTML = v;
      }
      return r;
   }
   MO.RBuilder_createButton = function RBuilder_createButton(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'button';
      return r;
   }
   MO.RBuilder_createCheck = function RBuilder_createCheck(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'checkbox';
      return r;
   }
   MO.RBuilder_createRadio = function RBuilder_createRadio(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'radio';
      return r;
   }
   MO.RBuilder_createEdit = function RBuilder_createEdit(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'text';
      return r;
   }
   MO.RBuilder_createFile = function RBuilder_createFile(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'file';
      return r;
   }
   MO.RBuilder_createSpan = function RBuilder_createSpan(d, s){
      return this.create(d, 'SPAN', s);
   }
   MO.RBuilder_createDiv = function RBuilder_createDiv(d, s){
      return this.create(d, 'DIV', s);
   }
   MO.RBuilder_createTable = function RBuilder_createTable(d, s, b, cs, cp){
      var h = this.create(d, 'TABLE', s);
      if(b){
         h.border = RInteger.nvl(b);
      }
      h.cellSpacing = RInteger.nvl(cs);
      h.cellPadding = RInteger.nvl(cp);
      return h;
   }
   MO.RBuilder_createTableRow = function RBuilder_createTableRow(d, s){
      var h = this.create(d, 'TR', s);
      return h;
   }
   MO.RBuilder_createTableCell = function RBuilder_createTableCell(d, s){
      var h = this.create(d, 'TD', s);
      return h;
   }
   MO.RBuilder_createFragment = function RBuilder_createFragment(document){
      var hDocument = null;
      if(document.ownerDocument){
         hDocument = document.ownerDocument;
      }else if(document.hDocument){
         hDocument = document.hDocument;
      }else{
         hDocument = document;
      }
      var hElement = hDocument.createDocumentFragment();
      hElement.__fragment = true;
      return hElement;
   }
   MO.RBuilder_append = function RBuilder_append(p, t, s){
      var r = RBuilder.create(p.ownerDocument, t, s);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder_appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
      var r = this.createIcon(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendImage = function RBuilder_appendImage(p, s, u, w, h){
      var r = this.createImage(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendEmpty = function RBuilder_appendEmpty(p, w, h){
      var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendText = function RBuilder_appendText(p, s, v){
      var r = this.createText(p.ownerDocument, s, v);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendButton = function RBuilder_appendButton(p, s){
      var r = this.createButton(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendCheck = function RBuilder_appendCheck(p, s){
      var r = this.createCheck(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendRadio = function RBuilder_appendRadio(p, s){
      var r = this.createRadio(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendEdit = function RBuilder_appendEdit(p, s){
      var r = this.createEdit(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendFile = function RBuilder_appendFile(p, s){
      var r = this.createFile(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendSpan = function RBuilder_appendSpan(p, s){
      var r = this.createSpan(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendDiv = function RBuilder_appendDiv(p, s){
      var r = this.createDiv(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
      var r = this.createTable(p.ownerDocument, s, b, cs, cp);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder_appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
      var r = null;
      if(i == null){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            r = p.insertRow();
         }else{
            r = p.insertRow(-1);
         }
      }else{
         r = p.insertRow(i);
      }
      if(s){
         r.className = s;
      }
      if(h){
         r.height = h;
      }
      return r;
   }
   MO.RBuilder_appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
      var o = this;
      var hr = o.appendTableRow(p, null, null, w);
      var hc = o.appendTableCell(hr, s, null, h);
      return hc;
   }
   MO.RBuilder_appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
      var o = this;
      var r = null;
      if(i == null){
         r = o.create(p, 'TD', s);
         p.appendChild(r);
      }else{
         r = p.insertCell(i);
      }
      if(s){
         r.className = s;
      }
      if(w){
         r.width = w;
      }
      return r;
   }
   MO.RBuilder = new RBuilder();
}
with(MO){
   MO.RDump = function RDump(){
      var o = this;
      o.LINE_SINGLE = '------------------------------';
      o.LINE_DOUBLE = '==============================';
      o.LINE_DOT    = '..............................';
      o.LINE_STAR   = '******************************';
      o.onclick     = RDump_onclick;
      o.nameInfo    = RDump_nameInfo;
      o.typeInfo    = RDump_typeInfo;
      o.dumpInner   = RDump_dumpInner;
      o.dump        = RDump_dump;
      o.appendLevel = RDump_appendLevel;
      o.stack       = RDump_stack;
      return o;
   }
   MO.RDump_onclick = function RDump_onclick(){
      var o = this;
      var d = o.link;
      if(o.link){
         if(d.loaded){
            d.show(!d.display);
         }else{
            RDump.dumpInner(o.link);
            d.loaded = true;
            d.show(true);
         }
      }
   }
   MO.RDump_nameInfo = function RDump_nameInfo(v){
      var t = RClass.typeOf(v);
      switch(t){
         case 'Unknown':
            return '@unknown';
         case 'Function':
            return RMethod.name(v) + '@Function';
         case 'Array':
            return '@<Array>';
      }
      return v;
   }
   MO.RDump_typeInfo = function RDump_typeInfo(v, t){
      if(v == null){
         return 'null';
      }
      switch(t){
         case 'Unknown':
            return 'unknown';
         case 'Undefined':
            return 'undefined';
         case 'Boolean':
         case 'Number':
            return v.toString();
         case 'String':
            return v.length + ':\'' + RString.toLine(v) + '\'';
         case 'Function':
            if(v.__virtual){
               return 'virtual';
            }
            return RMethod.name(v, true);
         case 'Array':
            return '@<Array@' + RClass.code(v) + '> length=' + v.length;
         case 'Html':
            return '@<' + v.tagName + '>';
         default:
            if(v.constructor == TClass){
               return '@<' + v.name + '@' + RClass.code(v) + '>';
            }
            if(v.constructor == Function){
               return "@" + v.toString();
            }
            try{
               for(var name in v){
                  return '@<Object@' + RClass.code(v) + '>';
               }
            }catch(e){}
            return '<Object@' + RClass.code(v) + '>';
      }
   }
   MO.RDump_dumpInner = function RDump_dumpInner(di){
      var hTable  = di.hTable;
      var hParent = di.hParent;
      var hInsRow = di.hRow;
      var level   = di.level;
      var obj     = di.link;
      var type    = RClass.typeOf(obj, true);
      var vcls    = obj.__class;
      var names = new Array();
      for(var name in obj){
         names[names.length] = name;
      }
      if(RString.endsWith(type, 'Array')){
         RArray.reverse(names, 0, names.length - 1);
      }else{
         RArray.sort(names, true);
      }
      var items = new Array();
      var c = names.length;
      if(c > 2000){
         c = 2000;
      }
      for(var n = 0; n < c; n++){
         var name = names[n];
         var value = '{error}';
         try{
            value = obj[name];
         }catch(e){}
         var stype = RClass.safeTypeOf(value, true);
         var type = RClass.safeTypeOf(value, true);
         var info = null;
         var infoFormat = true;
         if(vcls){
            var ann = vcls.attributeFind(name);
            if(ann){
               type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
               if(value && value.constructor == Function){
                  info = "<FONT color='green'>" + RMethod.name(value) + "</FONT>";
               }else{
                  info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
               }
               infoFormat = false;
            }
         }
         if(info == null){
            info = this.typeInfo(value, type);
         }
         var rdi = null;
         var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
         var hRow = RBuilder.appendTableRow(hTable, null, index);
         hRow.bgColor = '#FFFFFF';
         if(RString.startsWith(info, '@')){
            hRow.style.cursor = 'pointer';
            hRow.onclick = this.onclick;
            hRow.bgColor = '#FFF0E0';
            rdi = hRow.link = di.create();
            rdi.link = value;
            rdi.level = level;
            rdi.caption = name;
            rdi.hTable = hTable;
            rdi.level = level + 1;
            rdi.hRow = hRow;
         }else{
            di.push(hRow);
         }
         if((type == 'Function') && (info == 'virtual')){
            hRow.bgColor = '#E0F0FF';
         }
         var hCell = RBuilder.appendTableCell(hRow);
         var icon = RString.startsWith(info, '@') ? ' +' : '  ';
         var label = RString.repeat('   ', level) + icon + ' ' + name
         hCell.innerHTML = RHtml.toHtml(label);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         hCell.width = '240px'
         if(rdi){
            rdi.hText = hCell;
         }
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.innerHTML = RHtml.toHtml(type);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         if(type == 'Function'){
            hCell.style.color = '#3333FF';
         }else{
            hCell.style.color = '#FF3333';
         }
         hCell.width = '200px'
         var hCell = RBuilder.appendTableCell(hRow);
         if(RString.startsWith(info, '@')){
            info = info.substr(1);
         }
         if(infoFormat){
            hCell.innerHTML = RHtml.toHtml(info);
         }else{
            hCell.innerHTML = info;
         }
         hCell.style.borderBottom = '1px solid #F0F0F0';
      }
      hTable.width = '100%'
   }
   MO.RDump_dump = function RDump_dump(value, hPanel){
      if(!hPanel){
         hPanel = RBuilder.append(null, 'DIV')
      }
      var s = new TString();
      s.append('<', RClass.safeTypeOf(value));
      if(value && value.tagName){
         s.append(' - ', value.tagName);
      }
      s.appendLine('@' + RClass.code(value) + '>');
      var hPanel = RBuilder.append(hPanel, 'DIV');
      hPanel.style.border = '1px solid #BBBBBB';
      hPanel.style.backgroundColor = '#E0E0EB';
      var hTitleTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      var hRow = RBuilder.appendTableRow(hTitleTable);
      var hCell = RBuilder.appendTableCell(hRow);
      hTitleTable.width = '100%'
      hCell.style.padding = 2;
      hCell.style.borderBottom = '1px solid gray';
      hCell.style.backgroundColor = '#E0E0EB';
      RHtml.textSet(hCell, s.toString());
      var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      hTable.style.width = '100%';
      var di = new TDumpItem();
      di.hTable = hTable;
      di.hRow = null;
      di.hParent = hPanel;
      di.link = value;
      di.level = 0;
      this.dumpInner(di);
   }
   MO.RDump_appendLevel = function RDump_appendLevel(r, l){
      for(var n = 0; n < l; n++){
         r.append('   ');
      }
   }
   MO.RDump_stack = function RDump_stack(){
      var o = RDump_stack.caller;
      var s = new TString();
      while(o){
         s.append(RMethod.name(o));
         o = o.caller;
         if(o){
            s.appendLine();
         }
      }
      RLogger.debug(this, s);
   }
   MO.RDump = new RDump();
}
with(MO){
   MO.RHtml = function RHtml(){
      var o = this;
      o._nextUid        = 1;
      o._links          = new Object();
      o._clientPosition = new MO.SPoint2();
      o.uid             = RHtml_uid;
      o.fullscreen      = RHtml_fullscreen;
      o.displayGet      = RHtml_displayGet;
      o.displaySet      = RHtml_displaySet;
      o.visibleGet      = RHtml_visibleGet;
      o.visibleSet      = RHtml_visibleSet;
      o.textGet         = RHtml_textGet;
      o.textSet         = RHtml_textSet;
      o.checkGet        = RHtml_checkGet;
      o.checkSet        = RHtml_checkSet;
      o.radioGet        = RHtml_radioGet;
      o.radioSet        = RHtml_radioSet;
      o.cursorSet       = RHtml_cursorSet;
      o.linkGet         = RHtml_linkGet;
      o.linkSet         = RHtml_linkSet;
      o.clientPosition  = RHtml_clientPosition;
      o.clientX         = RHtml_clientX;
      o.clientY         = RHtml_clientY;
      o.setSize         = RHtml_setSize;
      o.toText          = RHtml_toText;
      o.toHtml          = RHtml_toHtml;
      o.eventSource     = RHtml_eventSource;
      o.get             = RHtml_get;
      o.parent          = RHtml_parent;
      o.searchLinker    = RHtml_searchLinker;
      o.searchObject    = RHtml_searchObject;
      o.tableMoveRow    = RHtml_tableMoveRow;
      o.free            = RHtml_free;
      return o;
   }
   MO.RHtml_uid = function RHtml_uid(v){
      var r = v.__puuid;
      if(r == null){
         r = v.__puuid = RHtml._nextUid++;
      }
      return r;
   }
   MO.RHtml_fullscreen = function RHtml_fullscreen(h, f){
      if(f){
         if (h.requestFullscreen){
            h.requestFullscreen();
         }else if(h.mozRequestFullScreen){
            h.mozRequestFullScreen();
         }else if(h.webkitRequestFullScreen){
            h.webkitRequestFullScreen();
         }
      }else{
         if (h.exitFullscreen){
            h.exitFullscreen();
         }else if(h.mozCancelFullScreen){
            h.mozCancelFullScreen();
         }else if(h.webkitCancelFullScreen){
            h.webkitCancelFullScreen();
         }
      }
   }
   MO.RHtml_displayGet = function RHtml_displayGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'inline');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml_displaySet = function RHtml_displaySet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? 'inline' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml_visibleGet = function RHtml_visibleGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'block');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml_visibleSet = function RHtml_visibleSet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? '' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml_textGet = function RHtml_textGet(h, v){
      var r = null;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         r = h.textContent;
      }else{
         r = h.innerText;
      }
      return r;
   }
   MO.RHtml_textSet = function RHtml_textSet(h, v){
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         h.textContent = v;
      }else{
         h.innerText = v;
      }
   }
   MO.RHtml_checkGet = function RHtml_checkGet(h){
      return RBool.toString(h.checked);
   }
   MO.RHtml_checkSet = function RHtml_checkSet(h, v){
      h.checked = RBool.isTrue(v);
   }
   MO.RHtml_radioGet = function RHtml_radioGet(hs){
      if(hs){
         var c = hs.length;
         for(var n = 0; n < c; n++){
            var h = hs[n];
            if(h.checked){
               return h.value;
            }
         }
      }
      return null;
   }
   MO.RHtml_radioSet = function RHtml_radioSet(hs, v){
      if(hs){
         var c = hs.length;
         for(var n=0; n < c; n++){
            var h = hs[n];
            if(h.value == v){
               h.checked = true;
               break;
            }
         }
      }
   }
   MO.RHtml_cursorSet = function RHtml_cursorSet(h, v){
      if(h){
         h.style.cursor = v;
      }
   }
   MO.RHtml_linkGet = function RHtml_linkGet(h, n){
      var o = this;
      var u = o.uid(h);
      var i = o._links[u];
      return i ? i.get(n) : null;
   }
   MO.RHtml_linkSet = function RHtml_linkSet(h, n, v){
      var o = this;
      var ls = o._links;
      var u = o.uid(h);
      var i = ls[u];
      if(!i){
         i = ls[u] = new THtmlItem();
         i._link = h;
      }
      i.set(n, v);
   }
   MO.RHtml_clientPosition = function RHtml_clientPosition(hTag, hTop){
      var o = this;
      var position = o._clientPosition;
      position.set(0, 0);
      while(hTag != hTop){
         position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
         position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
         hTag = hTag.offsetParent;
      }
      return position;
   }
   MO.RHtml_clientX = function RHtml_clientX(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetLeft - p.scrollLeft;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml_clientY = function RHtml_clientY(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetTop - p.scrollTop;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml_setSize = function RHtml_setSize(h, s){
      if(s.width){
         h.style.width = s.width + 'px';
      }
      if(s.height){
         h.style.height = s.height + 'px';
      }
   }
   MO.RHtml_toText = function RHtml_toText(p){
      if(p != null){
         p = p.toString();
         p = p.replace(/&lt;/, '<');
         p = p.replace(/&gt;/g, '>');
         p = p.replace(/&nbsp;/g, ' ');
         p = p.replace(/<BR>/g, '\n');
      }
      return p;
   }
   MO.RHtml_toHtml = function RHtml_toHtml(p){
      if(p != null){
         p = p.toString();
         p = p.replace(/</g, '&lt;');
         p = p.replace(/>/g, '&gt;');
         p = p.replace(/ /g, '&nbsp;');
         p = p.replace(/\n/g, '<BR>');
         p = p.replace(/\\n/g, '<BR>');
         p = p.replace(/\r/g, '');
         p = p.replace(/\\r/g, '');
      }
      return p;
   }
   MO.RHtml_eventSource = function RHtml_eventSource(p){
      return p.srcElement ? p.srcElement : p.target;
   }
   MO.RHtml_get = function RHtml_get(name){
      return document.getElementById(name);
   }
   MO.RHtml_parent = function RHtml_parent(tag, typeName){
      if(tag && t){
         typeName = typeName.toLowerCase();
         while(tag){
            if(tag.tagName.toLowerCase() == typeName){
               return tag;
            }
            tag = tag.parentElement;
         }
      }
      return null;
   }
   MO.RHtml_searchLinker = function RHtml_searchLinker(h, c){
      while(h){
         var f = h.__linker;
         if(f){
            if(RClass.isClass(f, c)){
               return f;
            }
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml_searchObject = function RHtml_searchObject(h, n){
      while(h){
         var f = h[n];
         if(f){
            return f;
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml_tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
      if(ph.tagName != 'TABLE'){
         throw new TError('Html table is invalid.');
      }
      if(ps == pt){
         return false;
      }
      if(ph.moveRow){
         ph.moveRow(ps, pt);
      }else{
         var hb = ph.getElementsByTagName('tbody')[0];
         var sr = hb.rows[ps];
         var tr = hb.rows[pt];
         if((sr == null) || (tr == null)){
            return false;
         }
         var nr = null;
         if(ps <= pt){
            nr = tr;
            while(nr = nr.nextSibling){
               if(nr.tagName == 'TR'){
                  break;
               }
            }
         }
         if(nr == null){
            hb.insertBefore(sr, tr);
         }else{
            if(nr == null){
               hb.appendChild(sr);
            }else{
               hb.insertBefore(sr, nr);
            }
         }
      }
      return true;
   }
   MO.RHtml_free = function RHtml_free(p){
      return null;
   }
   MO.RHtml_clone = function RHtml_clone(o, s, t){
      if(!t){
         t = s.cloneNode(true);
      }
      if(s._pname){
         o[s._pname] = t;
      }
      if(s._ptyName){
   	  o[s._ptyName] = t;
      }
      var e = REvent.find(s).events;
      t._psource = s;
      for(var n in e){
         t[e[n].handle] = s[e[n].handle];
         if(t[e[n].handle]){
             RHtml.link(t, '_plink', o);
         }
      }
      var p = s.children;
      var n = p.length;
      while(--n >= 0){
         RHtml_clone(o, p[n], t.children[n]);
      }
      return t;
   }
   MO.RHtml_offsetPosition = function RHtml_offsetPosition(h, t){
      var p = new TPoint();
      while(h != t){
         p.x += h.offsetLeft - h.scrollLeft;
         p.y += h.offsetTop - h.scrollTop;
         if('absolute' != RHtml.currentStyle(h).position){
         }
         p.x += h.clientLeft;
         p.y += h.clientTop;
         h = h.offsetParent;
      }
      return p;
   }
   MO.RHtml_offsetX = function RHtml_offsetX(h){
      var x = 0;
      while(h){
         x += h.offsetLeft;
         h = h.offsetParent;
      }
      return x;
   }
   MO.RHtml_offsetY = function RHtml_offsetY(h){
      var y = 0;
      while(h){
         y += h.offsetTop;
         h = h.offsetParent;
      }
      return y;
   }
   MO.RHtml_bodyWidth = function RHtml_bodyWidth(doc){
      return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
   }
   MO.RHtml_bodyHeight = function RHtml_bodyHeight(doc){
      return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
   }
   MO.RHtml_frameHeight = function RHtml_frameHeight(f){
      var hd = f.contentWindow.document;
      var oh = hd.body.scrollHeight;
      var sh = hd.documentElement.scrollHeight;
      return Math.max(oh, sh);
   }
   MO.RHtml_scrollWidth = function RHtml_scrollWidth(h){
      var r = 0;
      if(h.offsetWidth){
         r += h.offsetWidth;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderLeftWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderRightWidth);
      }
      if(h.clientWidth){
         r -= h.clientWidth;
      }
      return r;
   }
   MO.RHtml_scrollHeight = function RHtml_scrollHeight(h){
      var r = 0;
      if(h.offsetHeight){
         r += h.offsetHeight;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderTopWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderBottomWidth);
      }
      if(h.clientHeight){
         r -= h.clientHeight;
      }
      return r;
   }
   MO.RHtml_currentStyle = function RHtml_currentStyle(p){
      if(p.currentStyle){
         return p.currentStyle;
      }
      return window.getComputedStyle(p, null);
   }
   MO.RHtml_point = function RHtml_point(o, p){
      return this.toPoint(new TPoint(), o, p);
   }
   MO.RHtml_toPoint = function RHtml_toPoint(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.x = -RInt.parse(cs.borderLeftWidth);
         r.y = -RInt.parse(cs.borderTopWidth);
         while(o && o != p){
            r.x += o.offsetLeft - o.scrollLeft;
            r.y += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.x += o.clientLeft;
               r.y += o.clientTop;
            }
            o = o.offsetParent;
         }
      }
      return r;
   }
   MO.RHtml_rect = function RHtml_rect(o, p){
      return this.toRect(new TRect(), o, p);
   }
   MO.RHtml_toRect = function RHtml_toRect(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.left = -RInt.parse(cs.borderLeftWidth);
         r.top = -RInt.parse(cs.borderTopWidth);
         var w = o.offsetWidth; w = o.offsetWidth-1;
         var h = o.offsetHeight; h = o.offsetHeight-1;
         while(o && o != p){
            r.left += o.offsetLeft - o.scrollLeft;
            r.top += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.left += o.clientLeft;
               r.top += o.clientTop;
            }
            o = o.offsetParent;
         }
         r.right = r.left + w;
         r.bottom = r.top + h;
      }
      return r;
   }
   MO.RHtml_top = function RHtml_top(h){
      var r = 0;
      if(h){
         var cs = RHtml.currentStyle(o);
         r = -RInteger.parse(cs.borderTopWidth);
         while(h){
            r += h.offsetTop - h.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r += h.clientTop;
            }
            h = h.offsetParent;
         }
      }
      return r;
   }
   MO.RHtml_clientRect = function RHtml_clientRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft;
            y += o.offsetTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }
   MO.RHtml_offsetRect = function RHtml_offsetRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft + o.clientLeft;
            y += o.offsetTop + o.clientTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }
   MO.RHtml_clear = function RHtml_clear(h){
      if(h){
         var cns = h.children;
         if(cns && cns.length){
            for(var n=cns.length-1; n>=0; n--){
               var cn = cns[n];
               if(cn.children && cn.children.length){
                  this.clear(cn);
               }
               h.removeChild(cn);
            }
         }
      }
   }
   MO.RHtml_setRect = function RHtml_setRect(h, r){
      if(h && h.style){
         var s = h.style;
         s.left = r.left;
         s.top = r.top;
         s.width = r.width();
         s.height = r.height();
      }
   }
   MO.RHtml_setBounds = function RHtml_setBounds(r, l, t, w, h){
      if(r && r.style){
         var s = r.style;
         if(null != l){
            s.left = l;
         }
         if(null != t){
            s.top = t;
         }
         if(null != w){
            s.width = w;
         }
         if(null != h){
            s.height = h;
         }
      }
   }
   MO.RHtml_setPixelRect = function RHtml_setPixelRect(o, r){
      if(o && o.style){
         var s = o.style;
         s.pixelLeft = r.left;
         s.pixelTop = r.top;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
      }
   }
   MO.RHtml_setPixelBounds = function RHtml_setPixelBounds(o, l, t, w, h){
      if(o && o.style){
         var s = o.style;
         if(null != l){
            s.pixelLeft = l;
         }
         if(null != t){
            s.pixelTop = t;
         }
         if(null != w){
            s.pixelWidth = w;
         }
         if(null != h){
            s.pixelHeight = h;
         }
      }
   }
   MO.RHtml_changeWidth = function RHtml_changeWidth(s, t){
      if(s && t){
         var ts = RHtml.currentStyle(t);
         var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
         t.style.pixelWidth = s.offsetWidth - tw;
      }
   }
   MO.RHtml_showNodes = function RHtml_showNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }else if(c.nodeName == '#text'){
               c.nodeValue = o[n];
            }
         }
      }
   }
   MO.RHtml_hideNodes = function RHtml_hideNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }else if(c.nodeName == '#text'){
               o[n] = c.nodeValue;
               c.nodeValue = '';
            }
         }
      }
   }
   MO.RHtml_showChildren = function RHtml_showChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }
         }
      }
   }
   MO.RHtml_hideChildren = function RHtml_hideChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }
         }
      }
   }
   MO.RHtml_posParent = function RHtml_posParent(h){
      while(h){
         if('visible' != h.currentStyle.overflow){
            return h;
         }
         h = h.offsetParent;
      }
      return null;
   }
   MO.RHtml_form = function RHtml_form(h){
      if(h){
         var f = this.parent(h, 'FORM');
         return f ? f : h.ownerDocument.forms[0];
      }
      return window.document.forms[0];
   }
   MO.RHtml_popup = function RHtml_popup(u, w, h){
      var l = (screen.width - w)/2;
      var t = (screen.height - h)/2 - 20;
      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
      window.open(u, '_blank', s);
   }
   MO.RHtml_selectText = function RHtml_selectText(){
      var ip = document.getElementById(id);
      ip.select();
      return document.selection.createRange().text;
   }
   MO.getTRNode = function getTRNode(nowTR, sibling) {
      while(nowTR = nowTR[sibling]){
         if(nowTR.tagName == 'TR'){
            break;
         }
      }
      return nowTR;
   }
   MO.RHtml = new RHtml();
}
with(MO){
   MO.RXml = function RXml(){
      var o = this;
      o.httpActiveX      = false;
      o.httpVendor       = null;
      o.domActiveX       = false;
      o.domVendor        = null;
      o.construct        = RXml_construct;
      o.isNode           = RXml_isNode;
      o.createConnection = RXml_createConnection;
      o.createDocument   = RXml_createDocument;
      o.formatText       = RXml_formatText;
      o.buildText        = RXml_buildText;
      o.buildNode        = RXml_buildNode;
      o.makeString       = RXml_makeString;
      o.makeNode         = RXml_makeNode;
      o.makeDocument     = RXml_makeDocument;
      o.unpack           = RXml_unpack;
      o.construct();
      return o;
   }
   MO.RXml_construct = function RXml_construct(){
      var o = this;
      var d = window.document;
      if(window.ActiveXObject && !window.XMLHttpRequest){
         var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
         var c = vs.length;
         for(var n = 0; n < c; n++){
            var v = vs[n];
            try{
               r = new ActiveXObject(v);
               o.httpActiveX = true;
               o.httpVendor = v;
               break;
            }catch(e){
               m = e;
            }
         }
      }else if(window.XMLHttpRequest){
         try{
            var r = new XMLHttpRequest();
            o.httpActiveX = false;
         }catch(e){
            m = e;
         }
      }else{
         alert('Unknown http vendor.');
      }
      if(window.ActiveXObject || !window.DOMParser){
         var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
         var c = vs.length;
         for(var n = 0; n < c; n++){
            var v = vs[n];
            try{
               var r = new ActiveXObject(v);
               o.domActiveX = true;
               o.domVendor = v;
               break;
            }catch(e){
               m = e;
            }
         }
      }else if(window.DOMParser && d && d.implementation && d.implementation.createDocument){
         try{
            var r = document.implementation.createDocument('', '', null);
            o.domActiveX = false;
         }catch(e){
            m = e;
         }
      }else{
         alert('Unknown dom vendor.');
      }
   }
   MO.RXml_isNode = function RXml_isNode(n){
      return RClass.isName(n, 'TNode');
   }
   MO.RXml_createConnection = function RXml_createConnection(){
      var o = this;
      var r = null;
      if(o.httpActiveX){
         r = new ActiveXObject(o.httpVendor);
      }else{
         r = new XMLHttpRequest();
      }
      if(!r){
         alert('Create xml connection failure. (message=' + m + ')');
      }
      return r;
   }
   MO.RXml_createDocument = function RXml_createDocument(){
      var o = this;
      var r = null;
      if(o.domActiveX){
         r = new ActiveXObject(o.domVendor);
      }else{
         r = document.implementation.createDocument('', '', null);
      }
      if(!r){
         alert('Create xml document failure. (message=' + m + ')');
      }
      return r;
   }
   MO.RXml_formatText = function RXml_formatText(s){
      if(s != null){
         s = s.replace(/\\n/g, '\n');
      }
      return s;
   }
   MO.RXml_buildText = function RXml_buildText(s, v){
      if(v != null){
         v = v.toString();
         var c = v.length;
         for(var i = 0; i < c; i++){
            var ch = v.charAt(i);
            switch(ch){
               case '<':
                  s.append('&lt;');
                  break;
               case '>':
                  s.append('&gt;');
                  break;
               case '"':
                  s.append('&quot;');
                  break;
               case '&':
                  s.append('&amp;');
                  break;
               case '\r':
                  continue;
               case '\n':
                  s.append('\\n');
                  break;
               default:
                  s.append(ch);
            }
         }
      }
      return s;
   }
   MO.RXml_buildNode = function RXml_buildNode(pd, pn, pe){
      var xas = null;
      var eas = pe.attributes;
      if(eas){
         var eac = eas.length;
         if(eac > 0){
            xas = new TAttributes();
            for(var n = 0; n < eac; n++){
               var ea = eas[n];
               if(ea.nodeName){
                  xas.set(ea.nodeName, RXml.formatText(ea.value));
               }
            }
         }
      }
      var xt = new TString();
      xt.append(pe.value);
      var ecs = pe.childNodes
      if(ecs){
         var ecc = ecs.length;
         for(var n = 0; n < ecc; n++){
            var en = ecs[n];
            var ect = en.nodeType;
            if(ect == ENodeType.Text){
               xt.append(en.nodeValue);
            }else if(ect == ENodeType.Data){
               xt.append(en.data);
            }
         }
      }
      var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
      if(pn){
         pn.push(xc);
      }else{
         pd._root = xc;
      }
      if(ecs){
         var cc = ecs.length;
         for(var n = 0; n < cc; n++){
            if(ecs[n].nodeType == ENodeType.Node){
               this.buildNode(pd, xc, ecs[n]);
            }
         }
      }
   }
   MO.RXml_makeString = function RXml_makeString(s){
      var o = this;
      var x = null;
      if(o.domActiveX){
         x = new ActiveXObject(o.domVendor);
         x.async = false;
         x.loadXML(s);
      }else{
         var p = new DOMParser();
         x = p.parseFromString(s, 'text/xml');
      }
      return x;
   }
   MO.RXml_makeNode = function RXml_makeNode(p){
      var o = this;
      if(p.documentElement){
         var d = new TXmlDocument();
         o.buildNode(d, null, p.documentElement);
         return d.root();
      }else if(p.tagName == 'SCRIPT'){
         var s = p.textContent;
         if(!s){
            s = p.text;
         }
         if(s){
            var d = new TXmlDocument();
            var xd = o.makeString(s)
            o.buildNode(d, null, xd.documentElement);
            return d.root();
         }
      }
      return null;
   }
   MO.RXml_makeDocument = function RXml_makeDocument(p){
      var d = new TXmlDocument();
      if(p.documentElement){
         RXml.buildNode(d, null, p.documentElement);
      }
      return d;
   }
   MO.RXml_unpack = function RXml_unpack(s, n){
      var o = this;
      if(RString.isEmpty(s)){
         return null;
      }
      if(!n){
         n = new TNode();
      }
      var np = new TAttributes();
      np.unpack(s);
      n.name = np.get('name');
      n.value = np.get('value');
      if(np.contains('attributes')){
         n.attributes().unpack(np.get('attributes'));
      }
      if(np.contains('nodes')){
         var ns = new TStrings();
         ns.unpack(np.get('nodes'));
         for(var i=0; i<ns.count; i++){
            o.unpack(ns.get(i), n.create());
         }
      }
      return n;
   }
   MO.RXml = new RXml();
}
