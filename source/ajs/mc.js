//! © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
/// See LICENSE for more details.

// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, undef:true, unused:strict, browser: true, node: true

/// Does the environment support web workers?  If not, let's load the worker manually (without polluting the global scope).
if (typeof Worker === "undefined" || (typeof location !== "undefined" && location.protocol === "file:")) {
    /// Is this Node.js?
    if (typeof global !== "undefined" && typeof require !== "undefined") {
        this.LZMA = function (lzma_path) {
            return require(lzma_path || "./lzma_worker-min.js").LZMA;
        };
    /// Is this a browser?
    } else if (typeof window !== "undefined" && window.document) {
        (function ()
        {
            var that = this,
                global_var,
                req = function req(path) {
                    var script_tag  = document.createElement("script");
                    script_tag.type ="text/javascript";
                    script_tag.src  = path;
                    script_tag.onload = function () {
                        /// Make sure this LZMA variable doesn't get overwritten by the worker's.
                        that.LZMA = non_worker_lzma;
                    };
                    document.getElementsByTagName("head")[0].appendChild(script_tag);
                };
            
            /// Determine the global variable (it's called "window" in browsers, "global" in Node.js).
            if (typeof window !== "undefined") {
                global_var = window;
            } else if (global) {
                global_var = global;
            }
            
            function non_worker_lzma(path)
            {
                var fake_lzma;
                
                req(path);
                
                fake_lzma = {
                    compress: function compress(mixed, mode, on_finish, on_progress) {
                        if (global_var.LZMA_WORKER) {
                            global_var.LZMA_WORKER.compress(mixed, mode, on_finish, on_progress);
                        } else {
                            /// Wait
                            setTimeout(function ()
                            {
                                fake_lzma.compress(mixed, mode, on_finish, on_progress);
                            }, 50);
                        }
                    },
                    decompress: function decompress(byte_arr, on_finish, on_progress) {
                        if (global_var.LZMA_WORKER) {
                            global_var.LZMA_WORKER.decompress(byte_arr, on_finish, on_progress);
                        } else {
                            /// Wait
                            setTimeout(function ()
                            {
                                fake_lzma.decompress(byte_arr, on_finish, on_progress);
                            }, 50);
                        }
                    }
                };
                
                return fake_lzma;
            }
            
            that.LZMA = non_worker_lzma;
        }());
    } else {
        /// It doesn't seem to be either Node.js or a browser.
        console.log("Can't load the worker. Sorry.");
    }
} else {
    /// Let's use Web Workers.
    ///NOTE: The "this" keyword is the global context ("window" variable) if loaded via a <script> tag
    ///      or the function context if loaded as a module (e.g., in Node.js).
    this.LZMA = function (lzma_path) {
        var action_compress   = 1,
            action_decompress = 2,
            action_progress   = 3,
            
            callback_obj = {},
            
            ///NOTE: Node.js needs something like "./" or "../" at the beginning.
            lzma_worker = new Worker(lzma_path || "./lzma_worker-min.js");
        
        lzma_worker.onmessage = function (e) {
            if (e.data.action === action_progress) {
                if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_progress === "function") {
                    callback_obj[e.data.cbn].on_progress(e.data.result);
                }
            } else {
                if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_finish === "function") {
                    callback_obj[e.data.cbn].on_finish(e.data.result);
                    
                    /// Since the (de)compression is complete, the callbacks are no longer needed.
                    delete callback_obj[e.data.cbn];
                }
            }
        };
        
        /// Very simple error handling.
        lzma_worker.onerror = function(event) {
            throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
        };
        
        return (function () {
            
            function send_to_worker(action, data, mode, on_finish, on_progress) {
                var cbn;
                
                do {
                    cbn = Math.floor(Math.random() * (10000000));
                } while(typeof callback_obj[cbn] !== "undefined");
                
                callback_obj[cbn] = {
                    on_finish:   on_finish,
                    on_progress: on_progress
                };
                
                lzma_worker.postMessage({
                    action: action, /// action_compress = 1, action_decompress = 2, action_progress = 3
                    cbn:    cbn,    /// callback number
                    data:   data,
                    mode:   mode
                });
            }
            
            return {
                compress: function compress(mixed, mode, on_finish, on_progress) {
                    send_to_worker(action_compress, mixed, mode, on_finish, on_progress);
                },
                decompress: function decompress(byte_arr, on_finish, on_progress) {
                    send_to_worker(action_decompress, byte_arr, false, on_finish, on_progress);
                }
            };
        }());
    };
}
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
MO.AAnnotation = function AAnnotation(name){
   var o = this;
   o._annotationCd = null;
   o._inherit      = false;
   o._duplicate    = false;
   o._ordered      = false;
   o._name         = name;
   o.annotationCd  = MO.AAnnotation_annotationCd;
   o.isInherit     = MO.AAnnotation_isInherit;
   o.isDuplicate   = MO.AAnnotation_isDuplicate;
   o.isOrdered     = MO.AAnnotation_isOrdered;
   o.name          = MO.AAnnotation_name;
   o.code          = MO.AAnnotation_code;
   o.value         = MO.AAnnotation_value;
   return o;
}
MO.AAnnotation_annotationCd = function AAnnotation_annotationCd(){
   return this._annotationCd;
}
MO.AAnnotation_isInherit = function AAnnotation_isInherit(){
   return this._inherit;
}
MO.AAnnotation_isDuplicate = function AAnnotation_isDuplicate(){
   return this._duplicate;
}
MO.AAnnotation_isOrdered = function AAnnotation_isOrdered(){
   return this._ordered;
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
   o.Constructor = 'constructor';
   o.Dispose     = 'dispose';
   o.Source      = 'source';
   o.Property    = 'property';
   o.Persistence = 'persistence';
   o.Event       = 'enum';
   o.Event       = 'event';
   o.Linker      = 'linker';
   o.Style       = 'style';
   o.StyleIcon   = 'icon';
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
   o.Float32 = o.Float = 10;
   o.Float64 = o.Double = 11;
   o.String = 12;
   o.Struct = 13;
   o.Object = 14;
   o.Array = 15;
   o.Objects = 16;
   o.Dictionary = 17;
   return o;
}
MO.EEndian = new function EEndian(){
   var o = this;
   o.Big    = 0;
   o.Little = 1;
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
MO.TClass_register = function TClass_register(annotation){
   var o = this;
   var annotationCd = annotation.annotationCd();
   var ordered = annotation.isOrdered();
   var name = annotation.name();
   var code = annotation.code();
   if(!annotationCd || !code){
      throw new MO.TError(o, "Unknown annotation. (class={1}, annotation={2}, name={3}, code={4})", MO.Class.dump(o), annotation, name, code);
   }
   var annotations = o._annotations[annotationCd];
   if(!annotations){
      if(ordered){
         annotations = new MO.TObjects();
      }else{
         annotations = new Object();
      }
      o._annotations[annotationCd] = annotations;
   }
   if(!annotation._duplicate){
      if(annotations[code]){
         throw new MO.TError(o, "Duplicate annotation. (class={1}, annotation={2}, name={3}, code={4}, value={5})", MO.Class.dump(o), annotation, name, code, annotation.toString());
      }
   }
   if(ordered){
      annotations.push(annotation);
   }else{
      annotations[code] = annotation;
   }
   o._attributes[name] = annotation;
}
MO.TClass_assign = function TClass_assign(clazz){
   var o = this;
   for(var annotationName in clazz._annotations){
      var clazzAnnotations = clazz._annotations[annotationName];
      var annotations = o._annotations[annotationName];
      if(!annotations){
         annotations = o._annotations[annotationName] = new clazzAnnotations.constructor();
      }
      if(clazzAnnotations.constructor == MO.TObjects){
         annotations.append(clazzAnnotations);
      }else{
         for(var name in clazzAnnotations){
            var annotation = clazzAnnotations[name];
            if(!annotation.isDuplicate()){
               if(annotations[name]){
                  throw new MO.TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, clazz.name, n, annotation.toString());
               }
            }
            if(annotation._inherit){
               annotations[name] = annotation;
            }
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
   o.totalSecond  = MO.TDate_totalSecond;
   o.daySecond    = MO.TDate_daySecond;
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
MO.TDate_totalSecond = function TDate_totalSecond(){
   return parseInt(this.date.getTime() / 1000);
}
MO.TDate_daySecond = function TDate_daySecond(){
   var o = this;
   return o.hour * 3600 + o.minute * 60 + o.second;
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
      o._callback.call(owner, sender, parameter1, parameter2, parameter3, parameter4, parameter5);
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
   o._hashData  = null;
   return o;
}
MO.RString.prototype.isEmpty = function RString_isEmpty(value){
   if(value != null){
      return (value.length == 0);
   }
   return true;
}
MO.RString.prototype.isBlank = function RString_isBlank(value){
   if(value != null){
      return (value.trim().length == 0);
   }
   return true;
}
MO.RString.prototype.isAnsi = function RString_isAnsi(value){
   if(value != null){
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(value.charCodeAt(i) > 255){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.isDbcs = function RString_isDbcs(value){
   if(value == null){
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(value.charCodeAt(i) < 256){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.isPattern = function RString_isPattern(value, parttern){
   if(value != null){
      var o = this;
      var source = (parttern == null) ? '$a$A$f' : parttern;
      source = source.replace(/\a/g, o.LOWER);
      source = source.replace(/\A/g, o.UPPER);
      source = source.replace(/\f/g, MO.Lang.Float.NUMBER);
      source = source.replace(/\n/g, MO.Lang.Integer.NUMBER);
      var count = value.length;
      for(var i = 0; i < count; i++){
         if(source.indexOf(value.charAt(i)) == -1){
            return false;
         }
      }
      return true;
   }
   return false;
}
MO.RString.prototype.inChars = function RString_inChars(value, parttern){
   var o = this;
   var b = o.findChars(parttern, value);
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
MO.RString.prototype.calculateHash = function RString_calculateHash(source, code){
   var o = this;
   var data = o._hashData;
   if(!data){
      data = o._hashData = new Int32Array(1);
   }
   data[0] = MO.Runtime.nvl(code, 0);
   var length = source.length;
   for(var i = 0; i < length; i++){
      var value = source.charCodeAt(i);
      data[0] = 31 * data[0] + value;
   }
   return Math.abs(data[0]);
}
MO.RString.prototype.firstUpper = function RString_firstUpper(value){
   return (value != null) ? value.charAt(0).toUpperCase() + value.substr(1) : value;
}
MO.RString.prototype.firstLower = function RString_firstLower(){
   return (value != null) ? value.charAt(0).toLowerCase() + value.substr(1) : value;
}
MO.RString.prototype.firstLine = function RString_firstLine(value){
   if(value){
      var n = Math.min(value.indexOf('\r'), value.indexOf('\n'));
      if(-1 != n){
         return value.substr(0, n);
      }
      return value;
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
MO.AListener = function AListener(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   o.build = MO.AListener_build;
   return o;
}
MO.AListener_build = function AListener_build(clazz, instance){
   var o = this;
   var addListener = 'add' + o._linker + 'Listener';
   instance[addListener] = MO.RListener.makeAddListener(addListener, o._linker);
   var setListener = 'set' + o._linker + 'Listener';
   instance[setListener] = MO.RListener.makeSetListener(setListener, o._linker);
   var removeListener = 'remove' + o._linker + 'Listener';
   instance[removeListener] = MO.RListener.makeRemoveListener(removeListener, o._linker);
   var clearListeners = 'clear' + o._linker + 'Listeners';
   instance[clearListeners] = MO.RListener.makeClearListener(clearListeners, o._linker);
   var processListener = 'process' + o._linker + 'Listener';
   instance[processListener] = MO.RListener.makeProcessListener(processListener, o._linker);
}
MO.EEvent = new function EEvent(){
   var o = this;
   o.Unknown          = 'Unknown';
   o.Load             = 'Load';
   o.Loaded           = 'Loaded';
   o.Process          = 'Process';
   o.Complete         = 'Complete';
   o.Change           = 'Change';
   o.EnterFrame       = 'EnterFrame';
   o.LeaveFrame       = 'LeaveFrame';
   o.Enter            = 'Enter';
   o.Leave            = 'Leave';
   o.Resize           = 'Reisze';
   o.Focus            = 'Focus';
   o.Blur             = 'Blur';
   o.MouseDown        = 'MouseDown';
   o.MouseMove        = 'MouseMove';
   o.MouseUp          = 'MouseUp';
   o.MouseWheel       = 'MouseWheel';
   o.KeyDown          = 'KeyDown';
   o.KeyPress         = 'KeyPress';
   o.KeyUp            = 'KeyUp';
   o.Click            = 'Click';
   o.DoubleClick      = 'DoubleClick';
   o.NodeClick        = 'NodeClick';
   o.ItemClick        = 'ItemClick';
   o.Selected         = 'Selected';
   o.DataChanged      = 'DataChanged';
   o.Result           = 'Result';
   o.TouchZoom        = 'TouchZoom';
   o.Visibility       = 'Visibility';
   o.Orientation      = 'Orientation';
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
MO.EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
MO.MListener = function MListener(o){
   o = MO.Class.inherits(this, o);
   o._listenerss       = null;
   o.addListener       = MO.MListener_addListener;
   o.setListener       = MO.MListener_setListener;
   o.removeListener    = MO.MListener_removeListener;
   o.clearListeners    = MO.MListener_clearListeners;
   o.clearAllListeners = MO.MListener_clearAllListeners;
   o.processListener   = MO.MListener_processListener;
   o.dispose           = MO.MListener_dispose;
   return o;
}
MO.MListener_addListener = function MListener_addListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(!listenerss){
      listenerss = o._listenerss = new MO.TDictionary();
   }
   var listeners = listenerss.get(name);
   if(!listeners){
      listeners = new MO.TListeners();
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
      o._listenerss = MO.Lang.Object.dispose(listenerss);
   }
}
MO.SEvent = function SEvent(sender){
   var o = this;
   o.code       = null;
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
   o.dispose    = MO.SEvent_dispose;
   return o;
}
MO.SEvent_dispose = function SEvent_dispose(){
   var o = this;
   for(var name in o){
      o[name] = null;
   }
}
MO.SKeyboardEvent = function SKeyboardEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.altKey      = false;
   o.shiftKey    = false;
   o.ctrlKey     = false;
   o.keyCode     = 0;
   o.attachEvent = MO.SKeyboardEvent_attachEvent;
   o.cancel      = MO.SKeyboardEvent_cancel;
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
MO.SMouseEvent = function SMouseEvent(){
   var o = this;
   MO.SEvent.call(o);
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
   o.attachEvent = MO.SMouseEvent_attachEvent;
   return o;
}
MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(event);
   if(hs){
      o.source = hs.__linker;
   }
   o.button = event.button;
   o.mouseLeft = (event.button == MO.EMouseButton.Left);
   o.mouseMiddle = (event.button == MO.EMouseButton.Middle);
   o.mouseRight = (event.button == MO.EMouseButton.Right);
   o.altKey = event.altKey;
   o.ctrlKey = event.ctrlKey;
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
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
MO.SResizeEvent = function SResizeEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.width       = null;
   o.height      = null;
   o.attachEvent = MO.SResizeEvent_attachEvent;
   return o;
}
MO.SResizeEvent_attachEvent = function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
}
MO.FHttpConnection = function FHttpConnection(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._asynchronous        = MO.Class.register(o, new MO.AGetSet('_asynchronous'), false);
   o._methodCd            = MO.EHttpMethod.Get;
   o._contentCd           = MO.EHttpContent.Binary;
   o._url                 = null;
   o._heads               = MO.Class.register(o, new MO.AGetter('_heads'));
   o._input               = null;
   o._inputData           = MO.Class.register(o, new MO.AGetSet('_inputData'));
   o._output              = null;
   o._outputData          = MO.Class.register(o, new MO.AGetter('_outputData'));
   o._handle              = null;
   o._contentLength       = 0;
   o._statusFree          = true;
   o._event               = null;
   o._listenersLoad       = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._listenersComplete   = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   o.onConnectionSend     = MO.FHttpConnection_onConnectionSend;
   o.onConnectionReady    = MO.FHttpConnection_onConnectionReady;
   o.onConnectionComplete = MO.FHttpConnection_onConnectionComplete;
   o.construct            = MO.FHttpConnection_construct;
   o.header               = MO.FHttpConnection_header;
   o.setHeader            = MO.FHttpConnection_setHeader;
   o.setHeaders           = MO.FHttpConnection_setHeaders;
   o.setOutputData        = MO.FHttpConnection_setOutputData;
   o.content              = MO.FHttpConnection_content;
   o.reset                = MO.FHttpConnection_reset;
   o.sendSync             = MO.FHttpConnection_sendSync;
   o.sendAsync            = MO.FHttpConnection_sendAsync;
   o.send                 = MO.FHttpConnection_send;
   o.post                 = MO.FHttpConnection_post;
   o.dispose              = MO.FHttpConnection_dispose;
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
         throw new MO.TError('Unknown send data type.');
      }
   }
}
MO.FHttpConnection_onConnectionReady = function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var handle = o._handle;
      if(handle.readyState == MO.EHttpStatus.Loaded){
         if(handle.status == 200){
            o.setOutputData();
            o.onConnectionComplete();
         }else{
            MO.Logger.fatal(o, 'Connection failure. (url={1})', o._url);
         }
      }
   }
}
MO.FHttpConnection_onConnectionComplete = function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   var event = o._event;
   event.connection = o;
   event.content = o._outputData;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._heads = new MO.TAttributes();
   o._event = new MO.SEvent();
   var handle = o._handle = MO.Window.Xml.createConnection();
   handle._linker = o;
   handle.onreadystatechange = o.onConnectionReady;
}
MO.FHttpConnection_header = function FHttpConnection_header(name){
   return this._heads.get(name);
}
MO.FHttpConnection_setHeader = function FHttpConnection_setHeader(name, value){
   this._heads.set(name, value);
}
MO.FHttpConnection_setHeaders = function FHttpConnection_setHeaders(){
   var o = this;
   var handle = o._handle;
   if(o._contentCd == MO.EHttpContent.Binary){
      if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
         handle.setRequestHeader('Accept-Charset', 'x-user-defined');
         handle.responseType = 'arraybuffer';
      }else{
         handle.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            handle.responseType = 'arraybuffer';
         }
      }
   }else{
      handle.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   }
   var heads = o._heads;
   var count = heads.count();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var headName = heads.name(i);
         var headValue = heads.value(i);
         handle.setRequestHeader(headName, headValue);
      }
   }
   if(!MO.Window.Browser.isBrowser(MO.EBrowser.Chrome)){
      var contentLength = o._contentLength;
      if(contentLength > 0){
         handle.setRequestHeader('content-length', contentLength);
      }
   }
}
MO.FHttpConnection_setOutputData = function FHttpConnection_setOutputData(){
   var o = this;
   var handle = o._handle;
   if(o._contentCd == MO.EHttpContent.Binary){
      o._outputData = handle.response;
   }else{
      o._outputData = handle.responseText;
   }
}
MO.FHttpConnection_content = function FHttpConnection_content(){
   return this._outputData;
}
MO.FHttpConnection_reset = function FHttpConnection_reset(){
   var o = this;
   o._handle.abort()
   o.clearAllListeners();
}
MO.FHttpConnection_sendSync = function FHttpConnection_sendSync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, false);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   MO.Logger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_sendAsync = function FHttpConnection_sendAsync(){
   var o = this;
   var handle = o._handle;
   handle.open(o._methodCd, o._url, true);
   o.setHeaders(handle, 0);
   handle.send(o._inputData);
   MO.Logger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}
MO.FHttpConnection_send = function FHttpConnection_send(url, data){
   var o = this;
   o._url = url;
   o._input = data;
   o._methodCd = (data != null) ? MO.EHttpMethod.Post : MO.EHttpMethod.Get;
   o._statusFree = false;
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
MO.FHttpConnection_post = function FHttpConnection_send(url, data){
   var o = this;
   o._url = url;
   o._input = data;
   o._methodCd = MO.EHttpMethod.Post;
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
   o._heads = MO.Lang.Object.dispose(o._heads);
   o._event = MO.Lang.Object.dispose(o._event);
   o._input = null;
   o._inputData = null;
   o._output = null;
   o._outputData = null;
   var handle = o._handle;
   if(handle){
      handle.onreadystatechange = null;
      o._handle = null;
   }
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.RListener = function RListener(){
   var o = this;
   o._listeners = new Object();
   return o;
}
MO.RListener.prototype.makeAddListener = function RListener_makeAddListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.addListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeSetListener = function RListener_makeSetListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.setListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeRemoveListener = function RListener_makeRemoveListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.removeListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeClearListener = function RListener_makeClearListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.clearListeners(\''+ code +'\');';
      method = new Function(source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener.prototype.makeProcessListener = function RListener_makeProcessListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      var source = 'return this.processListener(\''+ code +'\', p1, p2, p3, p4, p5, p6);';
      method = new Function('p1', 'p2', 'p3', 'p4', 'p5', 'p6', source);
      o._listeners[methodName] = method;
   }
   return method;
}
MO.RListener = new MO.RListener();
MO.EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 'unknown';
   o.Explorer = 'explorer';
   o.FireFox = 'firefox';
   o.Chrome = 'chrome';
   o.Safari = 'safari';
   return o;
}
MO.EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 'unknown';
   o.Pc = 'pc';
   o.Mobile = 'mobile';
   return o;
}
MO.ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 'unknown';
   o.Window = 'window';
   o.Linux = 'linux';
   o.Android = 'android';
   o.Apple = 'apple';
   return o;
}
MO.RWindow = function RWindow(){
   var o = this;
   o._optionSelect     = true;
   o._statusError      = false;
   o._statusEnable     = true;
   o._disableDeep      = 0;
   o._cookies          = new MO.TAttributes();
   o._localStorage     = null;
   o._sessionStorage   = null;
   o._eventMouse       = new MO.SMouseEvent();
   o._eventKey         = new MO.SKeyboardEvent();
   o._eventResize      = new MO.SResizeEvent();
   o._eventVisibility  = new MO.SEvent();
   o._eventOrientation = new MO.SEvent();
   o._eventUnload      = new MO.SEvent();
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._hDisablePanel    = null;
   o._hDisableImage    = null;
   o.lsnsLoad          = new MO.TListeners();
   o.lsnsLoaded        = new MO.TListeners();
   o.lsnsUnload        = new MO.TListeners();
   o.lsnsMouseDown     = new MO.TListeners();
   o.lsnsMouseUp       = new MO.TListeners();
   o.lsnsMouseOver     = new MO.TListeners();
   o.lsnsMouseMove     = new MO.TListeners();
   o.lsnsMouseWheel    = new MO.TListeners();
   o.lsnsKeyDown       = new MO.TListeners();
   o.lsnsKeyUp         = new MO.TListeners();
   o.lsnsKeyPress      = new MO.TListeners();
   o.lsnsResize        = new MO.TListeners();
   o.lsnsVisibility    = new MO.TListeners();
   o.lsnsOrientation   = new MO.TListeners();
   o.lsnsDeviceError   = new MO.TListeners();
   return o;
}
MO.RWindow.prototype.ohMouseDown = function RWindow_ohMouseDown(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseDown;
   event.attachEvent(hEvent);
   o.lsnsMouseDown.process(event);
}
MO.RWindow.prototype.ohMouseMove = function RWindow_ohMouseMove(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseMove;
   event.attachEvent(hEvent);
   o.lsnsMouseMove.process(event);
}
MO.RWindow.prototype.ohMouseUp = function RWindow_ohMouseUp(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseUp;
   event.attachEvent(hEvent);
   o.lsnsMouseUp.process(event);
}
MO.RWindow.prototype.ohMouseWheel = function RWindow_ohMouseWheel(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseWheel;
   event.attachEvent(hEvent);
   o.lsnsMouseWheel.process(event);
}
MO.RWindow.prototype.ohKeyDown = function RWindow_ohKeyDown(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyDown;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
}
MO.RWindow.prototype.ohKeyUp = function RWindow_ohKeyUp(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyUp;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}
MO.RWindow.prototype.ohKeyPress = function RWindow_ohKeyPress(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.code = MO.EEvent.KeyPress;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}
MO.RWindow.prototype.ohResize = function RWindow_ohResize(hEvent){
   var o = MO.Window;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventResize;
   event.code = MO.EEvent.Resize;
   event.attachEvent(hEvent);
   o.lsnsResize.process(event);
}
MO.RWindow.prototype.ohSelect = function RWindow_ohSelect(event){
   return MO.Window._optionSelect;
}
MO.RWindow.prototype.ohVisibility = function RWindow_ohVisibility(hEvent){
   var o = MO.Window;
   var visibility = MO.Window.Browser.isVisibility();
   var event = o._eventVisibility;
   event.visibility = visibility;
   o.lsnsVisibility.process(event);
   MO.Logger.debug(o, 'Window visibility changed. (visibility={1})', visibility);
}
MO.RWindow.prototype.ohOrientation = function RWindow_ohOrientation(hEvent){
   var o = MO.Window;
   var orientationCd = o.Browser.refreshOrientation();
   var event = o._eventOrientation;
   event.orientationCd = orientationCd;
   o.lsnsOrientation.process(event);
   MO.Logger.debug(o, 'Window orientation changed. (orientation_cd={1})', orientationCd);
}
MO.RWindow.prototype.ohUnload = function RWindow_ohUnload(event){
   var o = MO.Window;
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   o.dispose();
}
MO.RWindow.prototype.connect = function RWindow_connect(hWindow){
   var o = this;
   o._eventVisibility.code = MO.EEvent.Visibility;
   o._eventOrientation.code = MO.EEvent.Orientation;
   var hWindow = o._hWindow = hWindow;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   var visibilitychange = MO.Window.Browser.defineEventGet('visibilitychange');
   if(MO.Window.Browser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hDocument.addEventListener(visibilitychange, o.ohVisibility, true);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
      hDocument['on' + visibilitychange] = o.ohVisibility;
   }
   hWindow.onorientationchange = o.ohOrientation;
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
   o._cookies.split(hDocument.cookie, '=', ';');
   o._requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
   o._cancelAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;
}
MO.RWindow.prototype.htmlWindow = function RWindow_htmlWindow(){
   return this._hWindow;
}
MO.RWindow.prototype.optionSelect = function RWindow_optionSelect(){
   return this._optionSelect;
}
MO.RWindow.prototype.setOptionSelect = function RWindow_setOptionSelect(select){
   var o = this;
   o._optionSelect = select;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = select ? '' : 'none';
   }
}
MO.RWindow.prototype.statusError = function RWindow_statusError(){
   return this._statusError;
}
MO.RWindow.prototype.setStatusError = function RWindow_setStatusError(value){
   this._statusError = value;
}
MO.RWindow.prototype.processDeviceError = function RWindow_processDeviceError(event){
   var o = this;
   o._statusError = true;
   o.lsnsDeviceError.process(event);
}
MO.RWindow.prototype.setCaption = function RWindow_setCaption(value){
   top.document.title = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.setStatus = function RWindow_setStatus(value){
   window.status = MO.Lang.String.nvl(value);
}
MO.RWindow.prototype.cookies = function RWindow_cookies(){
   return this._cookies;
}
MO.RWindow.prototype.cookie = function RWindow_cookie(name){
   return this._cookies.get(name);
}
MO.RWindow.prototype.storage = function RWindow_storage(scopeCd){
   var o = this;
   switch(scopeCd){
      case MO.EScope.Local:
         var storage = o._localStorage;
         if(!storage){
            storage = o._localStorage = MO.Class.create(MO.FWindowStorage);
            storage.link(window.localStorage);
         }
         return storage;
      case MO.EScope.Session:
         var storage = o._sessionStorage;
         if(!storage){
            storage = o._sessionStorage = MO.Class.create(MO.FWindowStorage);
            storage.link(window.sessionStorage);
         }
         return storage;
   }
   throw new TError(o, 'Unknown scope. (scope_cd={1})', scopeCd);
}
MO.RWindow.prototype.makeDisablePanel = function RWindow_makeDisablePanel(f){
   var o = this;
   var h = o._hDisablePanel;
   if(!h){
      h = o._hDisablePanel = MO.RBuilder.createDiv(o._hDocument, 'RWindow_Disable');
      h.style.zIndex = 5000;
   }
   var hi = o._hDisableImage;
   if(!hi){
      hi = o._hDisableImage = MO.RBuilder.appendIcon(h);
      hi.src = MO.RResource.iconPath('control.RWindow_Loading');
      hi.style.margin = o._hContainer.offsetHeight / 2;
      hi.style.display = 'none';
   }
   MO.RHtml.visibleSet(hi, f);
   return h;
}
MO.RWindow.prototype.windowDisable = function RWindow_windowDisable(){
   this._hContainer.disabled = true;
}
MO.RWindow.prototype.windowEnable = function RWindow_windowEnable(){
   this._hContainer.disabled = false;
}
MO.RWindow.prototype.isEnable = function RWindow_isEnable(){
   return this._statusEnable;
}
MO.RWindow.prototype.enable = function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
MO.RWindow.prototype.disable = function RWindow_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
MO.RWindow.prototype.setEnable = function RWindow_setEnable(v, f){
   var o = this;
   var h = o.makeDisablePanel(f);
   var st = h.style;
   if(!v){
      var hd = o._hDocument;
      var s = o._hDisablePanel.style;
      s.left = '0px';
      s.top = '0px';
      s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
      s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
      if(!h._linked){
         o._hContainer.appendChild(h);
         h._linked = true;
      }
   }else{
      o.windowEnable();
      if(h._linked){
         o._hContainer.removeChild(h);
         h._linked = false;
      }
   }
   o._statusEnable = v;
}
MO.RWindow.prototype.appendElement = function RWindow_appendElement(hPanel){
   MO.Assert.debugNotNull(control);
   this._hContainer.appendChild(hPanel);
}
MO.RWindow.prototype.requestAnimationFrame = function RWindow_requestAnimationFrame(callback){
   var method = this._requestAnimationFrame;
   if(method){
      method(callback);
      return true;
   }
   return false;
}
MO.RWindow.prototype.cancelRequestAnimationFrame = function RWindow_cancelRequestAnimationFrame(callback){
   var method = this._cancelAnimationFrame;
   if(method){
      method(callback);
      return true;
   }
   return false;
}
MO.RWindow.prototype.redirect = function RWindow_redirect(){
}
MO.RWindow.prototype.historyForward = function RWindow_historyForward(){
}
MO.RWindow.prototype.historyBack = function RWindow_historyBack(){
}
MO.RWindow.prototype.dispose = function RWindow_dispose(){
   var o = this;
   var hWindow = o._hWindow;
   var hDocument = o._hDocument;
   var hContainer = o._hContainer;
   if(MO.Window.Browser.supportHtml5()){
      hContainer.removeEventListener('mousedown', o.onMouseDown, true);
      hContainer.removeEventListener('mousemove', o.onMouseMove, true);
      hContainer.removeEventListener('mouseup', o.onMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.onMouseWheel, true);
      hContainer.removeEventListener('keydown', o.onKeyDown, true);
      hContainer.removeEventListener('keyup', o.onKeyUp, true);
      hContainer.removeEventListener('keypress', o.onKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.onOrientation);
   }else{
      hContainer.onmousedown = null;
      hContainer.onmousemove = null;
      hContainer.onmouseup = null;
      hContainer.onmousewheel = null;
      hContainer.onkeydown = null;
      hContainer.onkeyup = null;
      hContainer.onkeypress = null;
      hWindow.onorientationchange = null;
   }
   hContainer.onresize = null;
   hContainer.onselectstart = null;
   hContainer.onunload = null;
   o._localStorage = MO.Lang.Object.dispose(o._localStorage);
   o._sessionStorage = MO.Lang.Object.dispose(o._sessionStorage);
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   o._eventMouse = MO.Lang.Object.dispose(o._eventMouse);
   o._eventKey = MO.Lang.Object.dispose(o._eventKey);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventOrientation = MO.Lang.Object.dispose(o._eventOrientation);
   o._eventUnload = MO.Lang.Object.dispose(o._eventUnload);
}
MO.RWindow = new MO.RWindow();
MO.Window = MO.RWindow;
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   o.optionProcess    = false;
   o.optionStorage    = false;
   o.canvasScale      = true;
   o.soundConfirm     = false;
   o.soundFinish      = true;
   o.blobCreate       = false;
   o.pixelRatio       = 1;
   return o;
}
MO.FWindowStorage = function FWindowStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._scopeCd  = MO.Class.register(o, new MO.AGetter('_scopeCd'));
   o._storage  = null;
   o.link      = MO.FWindowStorage_link;
   o.get       = MO.FWindowStorage_get;
   o.set       = MO.FWindowStorage_set;
   o.remove    = MO.FWindowStorage_remove;
   o.clear     = MO.FWindowStorage_clear;
   o.dispose   = MO.FWindowStorage_dispose;
   o.innerDump = MO.FWindowStorage_innerDump;
   return o;
}
MO.FWindowStorage_link = function FWindowStorage_link(storage){
   this._storage = storage;
}
MO.FWindowStorage_get = function FWindowStorage_get(name){
   return this._storage.getItem(name);
}
MO.FWindowStorage_set = function FWindowStorage_set(name, value){
   this._storage.setItem(name, value);
}
MO.FWindowStorage_remove = function FWindowStorage_remove(name){
   this._storage.removeItem(name);
}
MO.FWindowStorage_clear = function FWindowStorage_clear(){
   this._storage.clear();
}
MO.FWindowStorage_dispose = function FWindowStorage_dispose(){
   var o = this;
   o._storage  = null;
   o.__base.FObject.dispose.call(o);
}
MO.FWindowStorage_innerDump = function FWindowStorage_innerDump(dump, level){
   var o = this;
   var storage = o._storage;
   var count = storage.length;
   for(var i = 0; i < count; i++){
      var name = storage.key(i);
      var value = storage.getItem(name);
      if(i > 0){
         dump.append(';');
      }
      dump.append(name + '=' + value);
   }
}
MO.RBrowser = function RBrowser(){
   var o = this;
   o._agent            = null;
   o._capability       = null;
   o._defineProperties = null;
   o._defineEvents     = null;
   o._defineMethods    = null;
   o._deviceCd         = MO.EDevice.Unknown;
   o._softwareCd       = MO.ESoftware.Unknown;
   o._typeCd           = MO.EBrowser.Unknown;
   o._orientationCd    = MO.EOrientation.Horizontal;
   o._supportHtml5     = false;
   o._hostPath         = '';
   o._contentPath      = '';
   return o;
}
MO.RBrowser.prototype.onLog = function RBrowser_onLog(event){
   console.log(event.message);
}
MO.RBrowser.prototype.construct = function RBrowser_construct(){
   var o = this;
   var code = o._agent = window.navigator.userAgent.toString();
   var agent = code.toLowerCase();
   var properties = o._defineProperties = new Object();
   var events = o._defineEvents = new Object();
   var methods = o._defineMethods = new Object();
   var capability = o._capability = new MO.SBrowserCapability();
   if(agent.indexOf("android") != -1){
      o._typeCd = MO.EDevice.Mobile;
      o._softwareCd = MO.ESoftware.Android;
   }
   if(agent.indexOf("chrome") != -1){
      o._typeCd = MO.EBrowser.Chrome;
   }else if(agent.indexOf("firefox") != -1){
      o._typeCd = MO.EBrowser.FireFox;
   }else if((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)){
      o._typeCd = MO.EBrowser.Explorer;
   }else if((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)){
      o._typeCd = MO.EBrowser.Safari;
   }else{
      alert('Unknown browser.\n' + agent);
      return;
   }
   var platformCd = MO.EPlatform.Mobile;
   var environmentConsole = MO.Console.find(MO.FEnvironmentConsole);
   if(MO.Lang.String.contains(agent, 'android', 'ipad', 'iphone', 'midp', 'rv:1.2.3.4', 'windows ce', 'windows mobile')){
      platformCd = MO.EPlatform.Mobile;
      environmentConsole.registerValue(MO.EConstant.DeviceType, 'mb');
   }else{
      platformCd = MO.EPlatform.Pc;
      environmentConsole.registerValue(MO.EConstant.DeviceType, 'pc');
   }
   MO.Runtime.setPlatformCd(platformCd);
   if(MO.Lang.String.contains(agent, 'android 5.1', 'iphone', 'ipad')){
      capability.soundConfirm = true;
   }
   if(MO.Lang.String.contains(agent, 'mqqbrowser')){
      capability.canvasScale = false;
   }
   if(o._typeCd == MO.EBrowser.Chrome){
      MO.Logger.lsnsOutput.register(o, o.onLog);
   }
   MO.Logger.debug(o, 'Parse browser agent. (platform_cd={1}, type_cd={2})', MO.Lang.Enum.decode(MO.EPlatform, platformCd), MO.Lang.Enum.decode(MO.EBrowser, o._typeCd));
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   var external = window.external;
   if(external){
      if(external.twGetRunPath){
         if((agent.indexOf('360chrome') != -1) || (agent.indexOf('360se') != -1)){
            capability.soundFinish = false;
         }else{
            var runPath = external.twGetRunPath().toLowerCase();
            if(runPath.indexOf('360se') != -1){
               capability.soundFinish = false;
            }
         }
      }
   }
   var pixelRatio = window.devicePixelRatio;
   if(pixelRatio){
      if(MO.Runtime.isPlatformMobile()){
         capability.pixelRatio = Math.min(pixelRatio, 3);
         MO.Logger.debug(o, 'Parse browser agent. (pixel_ratio={1}, capability_ratio={2})', pixelRatio, capability.pixelRatio);
      }
   }
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
      MO.Logger.warn(o, 'Browser blob not support.');
   }
   var hDocument = window.document;
   var visibilityChange = null;
   if(typeof hDocument.hidden !== "undefined"){
      properties['hidden'] = 'hidden';
      events['visibilitychange'] = 'visibilitychange';
   } else if (typeof hDocument.mozHidden !== "undefined"){
      properties['hidden'] = 'mozHidden';
      events['visibilitychange'] = 'mozvisibilitychange';
   }else if (typeof hDocument.msHidden !== "undefined"){
      properties['hidden'] = 'msHidden';
      events['visibilitychange'] = 'msvisibilitychange';
   }else if (typeof hDocument.webkitHidden !== "undefined"){
      properties['hidden'] = 'webkitHidden';
      events['visibilitychange'] = 'webkitvisibilitychange';
   }
   o.refreshOrientation();
   MO.Logger.debug(o, 'Browser connect. (agent={1})', o._agent);
}
MO.RBrowser.prototype.agent = function RBrowser_agent(){
   return this._agent;
}
MO.RBrowser.prototype.capability = function RBrowser_capability(){
   return this._capability;
}
MO.RBrowser.prototype.defineProperties = function RBrowser_defineProperties(){
   return this._defineProperties;
}
MO.RBrowser.prototype.definePropertyGet = function RBrowser_definePropertyGet(name){
   return this._defineProperties[name];
}
MO.RBrowser.prototype.defineEvents = function RBrowser_defineEvents(){
   return this._defineEvents;
}
MO.RBrowser.prototype.defineEventGet = function RBrowser_defineEventGet(name){
   return this._defineEvents[name];
}
MO.RBrowser.prototype.defineMethods = function RBrowser_defineMethods(){
   return this._defineMethods;
}
MO.RBrowser.prototype.defineMethodGet = function RBrowser_defineMethodGet(name){
   return this._defineMethods[name];
}
MO.RBrowser.prototype.supportHtml5 = function RBrowser_supportHtml5(){
   return this._supportHtml5;
}
MO.RBrowser.prototype.hostPath = function RBrowser_hostPath(uri){
   var o = this;
   if(uri){
      return o._hostPath + uri;
   }
   return o._hostPath;
}
MO.RBrowser.prototype.setHostPath = function RBrowser_setHostPath(host){
   this._hostPath = host;
}
MO.RBrowser.prototype.contentPath = function RBrowser_contentPath(uri){
   var o = this;
   if(uri){
      return o._contentPath + uri;
   }
   return o._contentPath;
}
MO.RBrowser.prototype.setContentPath = function RBrowser_setContentPath(path){
   this._contentPath = path;
}
MO.RBrowser.prototype.typeCd = function RBrowser_typeCd(){
   return this._typeCd;
}
MO.RBrowser.prototype.isBrowser = function RBrowser_isBrowser(browserCd){
   return this._typeCd == browserCd;
}
MO.RBrowser.prototype.orientationCd = function RBrowser_orientationCd(){
   return this._orientationCd;
}
MO.RBrowser.prototype.setOrientationCd = function RBrowser_setOrientationCd(orientationCd){
   this._orientationCd = orientationCd;
}
MO.RBrowser.prototype.isOrientationHorizontal = function RBrowser_isOrientationHorizontal(){
   return this._orientationCd == MO.EOrientation.Horizontal;
}
MO.RBrowser.prototype.isOrientationVertical = function RBrowser_isOrientationVertical(){
   return this._orientationCd == MO.EOrientation.Vertical;
}
MO.RBrowser.prototype.refreshOrientation = function RBrowser_refreshOrientation(){
   var o = this;
   var orientation = window.orientation;
   if(orientation != null){
      if((window.orientation == 180) || (window.orientation == 0)){
         o._orientationCd = MO.EOrientation.Vertical;
      }else if((window.orientation == 90) || (window.orientation == -90)){
         o._orientationCd = MO.EOrientation.Horizontal;
      }else{
         throw new TError(o, 'Unknown orientation mode.');
      }
   }
   return o._orientationCd;
}
MO.RBrowser.prototype.isVisibility = function RBrowser_isVisibility(){
   var name = this.definePropertyGet('hidden');
   return !window.document[name];
}
MO.RBrowser.prototype.encode = function RBrowser_encode(value){
   return escape(value);
}
MO.RBrowser.prototype.decode = function RBrowser_decode(value){
   return unescape(value);
}
MO.RBrowser.prototype.urlEncode = function RBrowser_urlEncode(url, flag){
   if(flag){
      return encodeURIComponent(url);
   }
   return encodeURI(url);
}
MO.RBrowser.prototype.urlDecode = function RBrowser_urlDecode(url, flag){
   if(flag){
      return decodeURIComponent(url);
   }
   return decodeURI(url);
}
MO.RBrowser.prototype.fullscreen = function RBrowser_fullscreen(hWindow, flag){
   if(flag){
      if (hWindow.requestFullscreen){
         hWindow.requestFullscreen();
      }else if(hWindow.mozRequestFullScreen){
         hWindow.mozRequestFullScreen();
      }else if(hWindow.webkitRequestFullScreen){
         hWindow.webkitRequestFullScreen();
      }else if(hWindow.msRequestFullscreen){
         hWindow.msRequestFullscreen();
      }
   }else{
      if (hWindow.exitFullscreen){
         hWindow.exitFullscreen();
      }else if(hWindow.mozCancelFullScreen){
         hWindow.mozCancelFullScreen();
      }else if(hWindow.webkitCancelFullScreen){
         hWindow.webkitCancelFullScreen();
      }else if(hWindow.msExitFullscreen){
         hWindow.msExitFullscreen();
      }
   }
}
MO.RBrowser.prototype.downloadBlob = function RBrowser_downloadBlob(fileName, blob){
   var link = document.createElement('A');
   var event = document.createEvent("MouseEvents");
   event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   link.download = fileName;
   link.href = URL.createObjectURL(blob);
   link.dispatchEvent(event);
}
MO.RBrowser.prototype.downloadText = function RBrowser_downloadText(fileName, text){
   var blob = MO.Labg.Blob.fromText(text);
   this.downloadBlob(fileName, blob);
}
MO.RBrowser.prototype.saveConfig = function RBrowser_saveConfig(xconfig){
   var o = this;
   var xagent = xconfig.create('Agent');
   xagent.setValue(o._agent);
}
MO.RBrowser = new MO.RBrowser();
MO.Window.Browser = MO.RBrowser;
MO.RXmlUtil = function RXmlUtil(){
   var o = this;
   o.httpActiveX = false;
   o.httpVendor  = null;
   o.domActiveX  = false;
   o.domVendor   = null;
   o.construct();
   return o;
}
MO.RXmlUtil.prototype.construct = function RXmlUtil_construct(){
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
MO.RXmlUtil.prototype.isNode = function RXmlUtil_isNode(n){
   return RClass.isName(n, 'TNode');
}
MO.RXmlUtil.prototype.createConnection = function RXmlUtil_createConnection(){
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
MO.RXmlUtil.prototype.createDocument = function RXmlUtil_createDocument(){
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
MO.RXmlUtil.prototype.formatText = function RXmlUtil_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
MO.RXmlUtil.prototype.buildText = function RXmlUtil_buildText(s, v){
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
            case '&':
               s.append('&amp;');
               break;
            case '\'':
               s.append('&apos;');
               break;
            case '"':
               s.append('&quot;');
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
MO.RXmlUtil.prototype.buildNode = function RXmlUtil_buildNode(pd, pn, pe){
   var xas = null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new MO.TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, this.formatText(ea.value));
            }
         }
      }
   }
   var xt = new MO.TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == MO.ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == MO.ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   var xc = pd.create(pe.nodeName, xas, MO.Lang.String.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == MO.ENodeType.Node){
            this.buildNode(pd, xc, ecs[n]);
         }
      }
   }
}
MO.RXmlUtil.prototype.makeString = function RXmlUtil_makeString(s){
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
MO.RXmlUtil.prototype.makeNode = function RXmlUtil_makeNode(p){
   var o = this;
   if(p.documentElement){
      var d = new MO.TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new MO.TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}
MO.RXmlUtil.prototype.makeDocument = function RXmlUtil_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}
MO.RXmlUtil.prototype.unpack = function RXmlUtil_unpack(s, n){
   var o = this;
   if(MO.Lang.String.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new MO.TNode();
   }
   var np = new MO.TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new MO.TStrings();
      ns.unpack(np.get('nodes'));
      for(var i = 0; i < ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
MO.RXml = new MO.RXmlUtil();
MO.Window.Xml = MO.RXml;
RJsLoader = new function RJsLoader(){
   var o = this;
   o._callback = null;
   o.onFinish  = RJsLoader_onFinish;
   o.onLoad    = RJsLoader_onLoad;
   o.loadUrl   = RJsLoader_loadUrl;
   return o;
}
function RJsLoader_onFinish(buffer){
   eval(buffer);
   top.MO = MO;
   RJsLoader._callback();
}
function RJsLoader_onLoad(event){
   var o = this;
   var content = event.content;
   if(content.constructor != ArrayBuffer){
      return alert('Load script failure.');
   }
   var lzma = new LZMA("../ajs/lzma_worker.js");
   lzma.decompress(new Uint8Array(content), o.onFinish, null);
}
function RJsLoader_loadUrl(url, callback){
   var o = this;
   var connection = MO.Class.create(MO.FHttpConnection);
   connection.setAsynchronous(true);
   connection.addLoadListener(o, o.onLoad);
   connection.send(url);
   o._callback = callback;
}
