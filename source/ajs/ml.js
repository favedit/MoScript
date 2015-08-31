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
MO.EScope = new function EScope(){
   var o = this;
   MO.TEnum.call(o);
   o.Unknown = 0;
   o.Local   = 1;
   o.Session = 2;
   o.Global  = 3;
   return o;
}
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
                  throw new MO.TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", annotationName, o.name, name, clazz.name, name, annotation.toString());
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
   MO.Lang.Object.free(o);
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
   var c = arguments.length;
   for(var n = 2; n < c; n++){
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
   var c = arguments.length;
   for(var n = 2; n < c; n++){
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
      if(parameter == null){
         parameter = '';
      }else if(typeof(parameter) == 'function'){
         parameter = MO.Method.name(parameter);
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
MO.RString.prototype.decodeUtf = function RString_decodeUtf(data){
   var i = 0;
   var j = 0;
   var x = 0;
   var y = 0;
   var z = 0;
   var l = data.length;
   var result = [];
   var codes = [];
   for(; i < l; ++i, ++j){
      x = data[i] & 255;
      if(!(x & 128)){
         if(!x){
            return data;
         }
         codes[j] = x;
      }else if((x & 224) == 192){
         if(i + 1 >= l){
            return data;
         }
         y = data[++i] & 255;
         if ((y & 192) != 128) {
            return data;
         }
         codes[j] = ((x & 31) << 6) | (y & 63);
      }else if ((x & 240) == 224){
         if(i + 2 >= l){
            return data;
         }
         y = data[++i] & 255;
         if((y & 192) != 128){
            return data;
         }
         z = data[++i] & 255;
         if((z & 192) != 128){
            return data;
         }
         codes[j] = ((x & 15) << 12) | ((y & 63) << 6) | (z & 63);
      }else{
         return data;
      }
      if(j == 65535){
         var charLength = codes.length;
         for(var index = 0; index < charLength; index++){
            result.push(String.fromCharCode(codes[index]));
         }
         j = -1;
      }
   }
   if(j > 0){
      codes.length = j;
      var charLength = codes.length;
      for(var index = 0; index < charLength; index++){
         result.push(String.fromCharCode(codes[index]));
      }
   }
   return result.join("");
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
MO.AConstructor = function AConstructor(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Constructor;
   o._inherit      = true;
   o._ordered      = true;
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   o.dataCd        = MO.AConstructor_dataCd;
   o.dataClass     = MO.AConstructor_dataClass;
   return o;
}
MO.AConstructor_dataCd = function AConstructor_dataCd(){
   return this._dataCd;
}
MO.AConstructor_dataClass = function AConstructor_dataClass(){
   return this._dataClass;
}
MO.ADispose = function ADispose(name, disposeCd){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Dispose;
   o._inherit      = true;
   o._ordered      = true;
   o._disposeCd    = disposeCd;
   o.disposeCd     = MO.ADispose_disposeCd;
   return o;
}
MO.ADispose_disposeCd = function ADispose_disposeCd(){
   return this._disposeCd;
}
MO.AEnum = function AEnum(name, linker){
   var o = this;
   o.inherit    = true;
   o.annotation = MO.EAnnotation.Enum;
   o.name       = name;
   o.linker     = linker;
   return o;
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
MO.EDispose = new function EDispose(){
   var o = this;
   o.Null    = 0;
   o.Dispose = 1;
   o.Release = 2;
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
MO.RByte.prototype.encodeBytes = function RByte_encodeBytes(data, offset, length, key){
   var o = this;
   var sign = new Uint8Array(8);
   sign[0] = (key >> 16) & 0xFF;
   sign[1] = (key >>  8) & 0xFF;
   sign[2] = (key      ) & 0xFF;
   sign[3] = (key >> 24) & 0xFF;
   sign[4] = (key      ) & 0xFF;
   sign[5] = (key >> 24) & 0xFF;
   sign[6] = (key >> 16) & 0xFF;
   sign[7] = (key >>  8) & 0xFF;
   for(var i = 0; i < length; i++){
      data[offset + i] ^= sign[i % 8];
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
   o.Chars    = '0123456789-.%';
   o.NUMBER   = '0123456789-.%';
   o.PAD_CHAR = '0';
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
MO.RFloat.prototype.format = function RFloat_format(value, leftLength, leftPad, rightLength, rightPad){
   var o = this;
   if(value == null){
      return '';
   }
   if(leftLength == null){
      leftLength = 0;
   }
   if(leftPad == null){
      leftPad = o.PAD_CHAR;
   }
   if(rightLength == null){
      rightLength = 6;
   }
   if(rightPad == null){
      rightPad = o.PAD_CHAR;
   }
   var leftSource = null;
   var rightSource = null;
   var text = value.toString();
   var index = text.indexOf('.');
   if(index == -1){
      leftSource = text;
      rightSource = '';
   }else{
      leftSource = text.substring(0, index);
      rightSource = text.substring(index + 1, index + rightLength + 1);
   }
   var left = MO.Lang.String.lpad(leftSource, leftLength, leftPad);
   var right = MO.Lang.String.rpad(rightSource, rightLength, rightPad);
   return left + '.' + right;
}
MO.RFloat.prototype.formatParttern = function RFloat_formatParttern(value, parttern){
   var floatVal = parseFloat(value);
   if (!isNaN(floatVal) && isFinite(value)) {
      var partternStr = parttern.toString();
      var partternLe = partternStr.length;
      var indexOf = partternStr.indexOf(".");
      var after = partternLe - indexOf - 1;
      var str = '';
      var string = null;
      var round = Math.round(floatVal * Math.pow(10, after)) / Math.pow(10, after);
      var roundStr = round.toString();
      var roundLe = roundStr.length;
      var roundIndex = roundStr.indexOf(".");
      var roundAfter = roundLe - roundIndex - 1;
      var poor = after - roundAfter;
      if(indexOf != -1){
         if(roundIndex == -1){
            for(var i = 0; i < after; i++){
               str += '0';
            }
            string = round + '.' + str;
         }else{
            if(after == roundAfter){
               string = round;
            }else{
               for(var i = 0; i < poor; i++){
                  str += '0';
               }
               string = round + str;
            }
         }
      }else{
         string = Math.round(round);
      }
      return string;
   }
}
MO.RFloat.prototype.unitFormat = function RFloat_unitFormat(v, l, lp, r, rp, divide, unit) {
   var o = this;
   if (l == null) {
      l = 0;
   }
   if (lp == null) {
      lp = o.PAD_CHAR;
   }
   if (r == null) {
      r = 6;
   }
   if (rp == null) {
      rp = o.PAD_CHAR;
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
MO.SPoint2_serialize = function SPoint2_serialize(output){
   var o = this;
   output.writeFloat(o.x);
   output.writeFloat(o.y);
}
MO.SPoint2_unserialize = function SPoint2_unserialize(input){
   var o = this;
   o.x = input.readFloat();
   o.y = input.readFloat();
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
MO.AListener = function AListener(name, linker){
   var o = this;
   MO.Assert.debugNotEmpty(name);
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   o.build = MO.AListener_build;
   if(linker == null){
      var name = o._name;
      if(MO.Lang.String.startsWith(name, '_listeners')){
         name = name.substring(10);
      }else{
         throw new MO.TError('Linker is invalid.');
      }
      o._linker = name;
   }else{
      o._linker = linker;
   }
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
   o.OperationDown    = 'OperationDown';
   o.OperationMove    = 'OperationMove';
   o.OperationUp      = 'OperationUp';
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
   o._attributes          = MO.Class.register(o, new MO.AGetter('_attributes'));
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
   var attributes = o._attributes;
   var count = attributes.count();
   for(var i = 0; i < count; i++){
      var name = attributes.name(i);
      var value = attributes.value(i);
      event[name] = value;
   }
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FHttpConnection_construct = function FHttpConnection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._heads = new MO.TAttributes();
   o._attributes = new MO.TAttributes();
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
   o._attributes.clear();
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
   o._attributes = MO.Lang.Object.dispose(o._attributes);
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
MO.APersistence = function APersistence(name, dataCd, dataClass){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Persistence;
   o._inherit      = true;
   o._ordered      = true;
   o._dataCd       = dataCd;
   o._dataClass    = dataClass;
   o.dataCd        = MO.APersistence_dataCd;
   o.dataClass     = MO.APersistence_dataClass;
   o.newStruct     = MO.APersistence_newStruct;
   o.newInstance   = MO.APersistence_newInstance;
   o.toString      = MO.APersistence_toString;
   return o;
}
MO.APersistence_dataCd = function APersistence_dataCd(){
   return this._dataCd;
}
MO.APersistence_dataClass = function APersistence_dataClass(){
   return this._dataClass;
}
MO.APersistence_newStruct = function APersistence_newStruct(){
   return new this._dataClass();
}
MO.APersistence_newInstance = function APersistence_newInstance(){
   return MO.Class.create(this._dataClass);
}
MO.APersistence_toString = function APersistence_toString(){
   return '<' + this._annotationCd + ',name=' + this._name + '>';
}
MO.AStyle = function AStyle(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._duplicate    = true;
   o._style        = style;
   o.code          = MO.AStyle_code;
   o.style         = MO.AStyle_style;
   o.build         = MO.AStyle_build;
   o.toString      = MO.AStyle_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyle_code = function AStyle_code(){
   return this._style;
}
MO.AStyle_style = function AStyle_style(){
   return this._style;
}
MO.AStyle_build = function AStyle_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyle_toString = function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.AStyleIcon = function AStyleIcon(name, style){
   var o = this;
   MO.AAnnotation.call(o, name);
   o._annotationCd = MO.EAnnotation.Style;
   o._style        = style;
   o.code          = MO.AStyleIcon_code;
   o.style         = MO.AStyleIcon_style;
   o.build         = MO.AStyleIcon_build;
   o.toString      = MO.AStyleIcon_toString;
   if(style == null){
      var value = null;
      if(MO.Lang.String.startsWith(name, '_style')){
         value = name.substring(6);
      }else if(MO.Lang.String.startsWith(name, 'style')){
         value = name.substring(5);
      }
      if(value == null){
         throw new MO.TError('Style name is empty.');
      }
      o._style = value;
   }
   return o;
}
MO.AStyleIcon_code = function AStyleIcon_code(){
   return this._style;
}
MO.AStyleIcon_style = function AStyleIcon_style(){
   return this._style;
}
MO.AStyleIcon_build = function AStyleIcon_build(value){
   var o = this;
   value[o._name] = null;
}
MO.AStyleIcon_toString = function AStyleIcon_toString(){
   var o = this;
   return 'style=' + o._style;
}
MO.EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
MO.EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
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
MO.MClone = function MClone(o){
   o = MO.Class.inherits(this, o);
   o.clone  = MO.MClone_clone;
   return o;
}
MO.MClone_clone = function MClone_clone(){
   var o = this;
   var result = MO.Class.create(o.constructor);
   for(var name in o){
      var value = o[name];
      if(value != null){
         if(!MO.Class.isBaseDataType(value.constructor)){
            result[name] = value.clone();
         }
      }
      result[name] = value;
   }
   return result;
}
MO.MDataStream = function MDataStream(o){
   o = MO.Class.inherits(this, o);
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   o.testString   = MO.MDataStream_testString;
   o.readBoolean  = MO.MDataStream_readBoolean;
   o.readInt8     = MO.MDataStream_readInt8;
   o.readInt16    = MO.MDataStream_readInt16;
   o.readInt32    = MO.MDataStream_readInt32;
   o.readInt64    = MO.MDataStream_readInt64;
   o.readUint8    = MO.MDataStream_readUint8;
   o.readUint16   = MO.MDataStream_readUint16;
   o.readUint32   = MO.MDataStream_readUint32;
   o.readUint64   = MO.MDataStream_readUint64;
   o.readFloat    = MO.MDataStream_readFloat;
   o.readDouble   = MO.MDataStream_readDouble;
   o.readString   = MO.MDataStream_readString;
   o.readBytes    = MO.MDataStream_readBytes;
   o.readData     = MO.MDataStream_readData;
   o.writeBoolean = MO.MDataStream_writeBoolean;
   o.writeInt8    = MO.MDataStream_writeInt8;
   o.writeInt16   = MO.MDataStream_writeInt16;
   o.writeInt32   = MO.MDataStream_writeInt32;
   o.writeInt64   = MO.MDataStream_writeInt64;
   o.writeUint8   = MO.MDataStream_writeUint8;
   o.writeUint16  = MO.MDataStream_writeUint16;
   o.writeUint32  = MO.MDataStream_writeUint32;
   o.writeUint64  = MO.MDataStream_writeUint64;
   o.writeFloat   = MO.MDataStream_writeFloat;
   o.writeDouble  = MO.MDataStream_writeDouble;
   o.writeString  = MO.MDataStream_writeString;
   o.writeBytes   = MO.MDataStream_writeBytes;
   o.writeData    = MO.MDataStream_writeData;
   return o;
}
MO.MDataStream_testString = function MDataStream_testString(){
   var o = this;
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
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
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var character = viewer.getUint16(position, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
}
MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
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
MO.MDataStream_readData = function MDataStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
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
      throw new MO.TError('Unsupport.');
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
MO.MDataStream_writeData = function MDataStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MDataView = function MDataView(o){
   o = MO.Class.inherits(this, o);
   o._viewer     = null;
   o._endianCd   = MO.Class.register(o, new MO.AGetSet('_endianCd'), false);
   o.getInt8     = MO.MDataView_getInt8;
   o.getInt16    = MO.MDataView_getInt16;
   o.getInt32    = MO.MDataView_getInt32;
   o.getInt64    = MO.MDataView_getInt64;
   o.getUint8    = MO.MDataView_getUint8;
   o.getUint16   = MO.MDataView_getUint16;
   o.getUint32   = MO.MDataView_getUint32;
   o.getUint64   = MO.MDataView_getUint64;
   o.getFloat    = MO.MDataView_getFloat;
   o.getDouble   = MO.MDataView_getDouble;
   o.setInt8     = MO.MDataView_setInt8;
   o.setInt16    = MO.MDataView_setInt16;
   o.setInt32    = MO.MDataView_setInt32;
   o.setInt64    = MO.MDataView_setInt64;
   o.setUint8    = MO.MDataView_setUint8;
   o.setUint16   = MO.MDataView_setUint16;
   o.setUint32   = MO.MDataView_setUint32;
   o.setUint64   = MO.MDataView_setUint64;
   o.setFloat    = MO.MDataView_setFloat;
   o.setDouble   = MO.MDataView_setDouble;
   return o;
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
MO.MEncryptedStream = function MEncryptedStream(o){
   o = MO.Class.inherits(this, o, MO.MDataStream);
   o._sign        = null;
   o._signLength  = null;
   o._data        = null;
   o._dataViewer  = null;
   o.testString   = MO.MEncryptedStream_testString;
   o.readBoolean  = MO.MEncryptedStream_readBoolean;
   o.readInt8     = MO.MEncryptedStream_readInt8;
   o.readInt16    = MO.MEncryptedStream_readInt16;
   o.readInt32    = MO.MEncryptedStream_readInt32;
   o.readInt64    = MO.MEncryptedStream_readInt64;
   o.readUint8    = MO.MEncryptedStream_readUint8;
   o.readUint16   = MO.MEncryptedStream_readUint16;
   o.readUint32   = MO.MEncryptedStream_readUint32;
   o.readUint64   = MO.MEncryptedStream_readUint64;
   o.readFloat    = MO.MEncryptedStream_readFloat;
   o.readDouble   = MO.MEncryptedStream_readDouble;
   o.readString   = MO.MEncryptedStream_readString;
   o.readBytes    = MO.MEncryptedStream_readBytes;
   o.readData     = MO.MEncryptedStream_readData;
   o.writeBoolean = MO.MEncryptedStream_writeBoolean;
   o.writeInt8    = MO.MEncryptedStream_writeInt8;
   o.writeInt16   = MO.MEncryptedStream_writeInt16;
   o.writeInt32   = MO.MEncryptedStream_writeInt32;
   o.writeInt64   = MO.MEncryptedStream_writeInt64;
   o.writeUint8   = MO.MEncryptedStream_writeUint8;
   o.writeUint16  = MO.MEncryptedStream_writeUint16;
   o.writeUint32  = MO.MEncryptedStream_writeUint32;
   o.writeUint64  = MO.MEncryptedStream_writeUint64;
   o.writeFloat   = MO.MEncryptedStream_writeFloat;
   o.writeDouble  = MO.MEncryptedStream_writeDouble;
   o.writeString  = MO.MEncryptedStream_writeString;
   o.writeBytes   = MO.MEncryptedStream_writeBytes;
   o.writeData    = MO.MEncryptedStream_writeData;
   return o;
}
MO.MEncryptedStream_testString = function MEncryptedStream_testString(){
   var o = this;
   debugger
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
}
MO.MEncryptedStream_readBoolean = function MEncryptedStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value > 0;
}
MO.MEncryptedStream_readInt8 = function MEncryptedStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value;
}
MO.MEncryptedStream_readInt16 = function MEncryptedStream_readInt16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt16(0, endianCd);
   o._position += 2;
   return value;
}
MO.MEncryptedStream_readInt32 = function MEncryptedStream_readInt32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readInt64 = function MEncryptedStream_readInt64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readUint8 = function MEncryptedStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd) ^ o._sign[0];
   o._position += 1;
   return value;
}
MO.MEncryptedStream_readUint16 = function MEncryptedStream_readUint16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint16(0, endianCd);
   o._position += 2;
   return value;
}
MO.MEncryptedStream_readUint32 = function MEncryptedStream_readUint32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readUint64 = function MEncryptedStream_readUint64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readFloat = function MEncryptedStream_readFloat(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat32(0, endianCd);
   o._position += 4;
   return value;
}
MO.MEncryptedStream_readDouble = function MEncryptedStream_readDouble(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat64(0, endianCd);
   o._position += 8;
   return value;
}
MO.MEncryptedStream_readString = function MEncryptedStream_readString(){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var dataViewer = o._dataViewer;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var length = o.readUint16();
   if(length == 0){
      return '';
   }
   var dataBuffer = new Uint8Array(o._data);
   var buffer = new Uint8Array(o._memory);
   var position = o._position;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var index = i << 1;
      dataViewer.setUint8(0, viewer.getUint8(position    , endianCd) ^ sign[(index    ) % signLength], endianCd);
      dataViewer.setUint8(1, viewer.getUint8(position + 1, endianCd) ^ sign[(index + 1) % signLength], endianCd);
      var character = dataViewer.getUint16(0, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
}
MO.MEncryptedStream_readBytes = function MEncryptedStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
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
MO.MEncryptedStream_readData = function MEncryptedStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MEncryptedStream_writeBoolean = function MEncryptedStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}
MO.MEncryptedStream_writeInt8 = function MEncryptedStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}
MO.MEncryptedStream_writeInt16 = function MEncryptedStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MEncryptedStream_writeInt32 = function MEncryptedStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeInt64 = function MEncryptedStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeUint8 = function MEncryptedStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}
MO.MEncryptedStream_writeUint16 = function MEncryptedStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}
MO.MEncryptedStream_writeUint32 = function MEncryptedStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeUint64 = function MEncryptedStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeFloat = function MEncryptedStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}
MO.MEncryptedStream_writeDouble = function MEncryptedStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}
MO.MEncryptedStream_writeString = function MEncryptedStream_writeString(value){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length ^ sign[0], endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i) ^ sign[i % signLength], endianCd);
      position += 2;
   }
   o._position = position;
}
MO.MEncryptedStream_writeBytes = function MEncryptedStream_writeBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   if(length <= 0){
      return;
   }
   if(offset != 0){
      throw new MO.TError('Unsupport.');
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
MO.MEncryptedStream_writeData = function MEncryptedStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
MO.MListenerLoad = function MListenerLoad(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addLoadListener     = MO.MListenerLoad_addLoadListener;
   o.removeLoadListener  = MO.MListenerLoad_removeLoadListener;
   o.clearLoadListeners  = MO.MListenerLoad_clearLoadListeners;
   o.processLoadListener = MO.MListenerLoad_processLoadListener;
   return o;
}
MO.MListenerLoad_addLoadListener = function MListenerLoad_addLoadListener(w, m){
   return this.addListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_removeLoadListener = function MListenerLoad_removeLoadListener(w, m){
   this.removeListener(MO.EEvent.Load, w, m);
}
MO.MListenerLoad_clearLoadListeners = function MListenerLoad_clearLoadListeners(){
   this.clearListeners(MO.EEvent.Load);
}
MO.MListenerLoad_processLoadListener = function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Load, p1, p2, p3, p4, p5);
}
MO.MListenerProcess = function MListenerProcess(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addProcessListener     = MO.MListenerProcess_addProcessListener;
   o.removeProcessListener  = MO.MListenerProcess_removeProcessListener;
   o.clearProcessListeners  = MO.MListenerProcess_clearProcessListeners;
   o.processProcessListener = MO.MListenerProcess_processProcessListener;
   return o;
}
MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(owner, process){
   return this.addListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(owner, process){
   this.removeListener(MO.EEvent.Process, owner, process);
}
MO.MListenerProcess_clearProcessListeners = function MListenerProcess_clearProcessListeners(){
   this.clearListeners(MO.EEvent.Process);
}
MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Process, p1, p2, p3, p4, p5);
}
MO.MListenerTouchZoom = function MListenerTouchZoom(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addTouchZoomListener     = MO.MListenerTouchZoom_addTouchZoomListener;
   o.removeTouchZoomListener  = MO.MListenerTouchZoom_removeTouchZoomListener;
   o.clearTouchZoomListeners  = MO.MListenerTouchZoom_clearTouchZoomListeners;
   o.processTouchZoomListener = MO.MListenerTouchZoom_processTouchZoomListener;
   return o;
}
MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
   return this.addListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
   this.removeListener(MO.EEvent.TouchZoom, w, m);
}
MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
   this.clearListeners(MO.EEvent.TouchZoom);
}
MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.TouchZoom, p1, p2, p3, p4, p5);
}
MO.MMouseCapture = function MMouseCapture(o){
   o = MO.Class.inherits(this, o);
   o.onMouseCaptureStart = MO.Method.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = MO.Method.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = MO.Method.virtual(o, 'onMouseCaptureStop');
   o.testMouseCapture    = MO.Method.emptyTrue;
   return o;
}
MO.MMouseWheel = function MMouseWheel(o){
   o = MO.Class.inherits(this, o);
   o.onMouseWheel = MO.Class.register(o, new MO.AEventMouseWheel('onMouseWheel'), MO.Method.empty);
   return o;
}
MO.MParent = function MParent(o){
   o = MO.Class.inherits(this, o);
   o._parent    = MO.Class.register(o, new MO.AGetSet('_parent'));
   o.isParent   = MO.MParent_isParent;
   o.findParent = MO.MParent_findParent;
   o.dispose    = MO.MParent_dispose;
   return o;
}
MO.MParent_isParent = function MParent_isParent(value){
   while(value){
      if(value == this){
         return true;
      }
      value = value.parent();
   }
}
MO.MParent_findParent = function MParent_findParent(clazz){
   var find = this;
   if(clazz){
      while(MO.Class.isClass(find._parent, clazz)){
         find = find.parent();
      }
   }else{
      while(find._parent){
         find = find.parent();
      }
   }
   return find;
}
MO.MParent_dispose = function MParent_dispose(){
   var o = this;
   o._parent = null;
}
MO.MPersistence = function MPersistence(o){
   o = MO.Class.inherits(this, o);
   o.unserialize                = MO.MPersistence_unserialize;
   o.unserializeBuffer          = MO.MPersistence_unserializeBuffer;
   o.unserializeSignBuffer      = MO.MPersistence_unserializeSignBuffer;
   o.unserializeEncryptedBuffer = MO.MPersistence_unserializeEncryptedBuffer;
   o.serialize                  = MO.MPersistence_serialize;
   o.serializeBuffer            = MO.MPersistence_serializeBuffer;
   o.serializeSignBuffer        = MO.MPersistence_serializeSignBuffer;
   o.serializeEncryptedBuffer   = MO.MPersistence_serializeEncryptedBuffer;
   return o;
}
MO.MPersistence_unserialize = function MPersistence_unserialize(input){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var n = 0; n < count; n++){
      var annotation = annotations.at(n);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      if(dateCd == MO.EDataType.Struct){
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newStruct();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Object){
         var item = o[name];
         if(!item){
            item = o[name] = annotation.newInstance();
         }
         item.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TObjects();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.push(item);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         var items = o[name];
         if(!items){
            items = o[name] = new MO.TDictionary();
         }
         items.clear();
         var itemCount = input.readInt32();
         for(var i = 0; i < itemCount; i++){
            var item = annotation.newInstance();
            item.unserialize(input);
            items.set(item.code(), item);
         }
      }else{
         o[name] = input.readData(dateCd);
      }
   }
}
MO.MPersistence_unserializeBuffer = function MPersistence_unserializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistence_unserializeSignBuffer = function MPersistence_unserializeSignBuffer(sign, buffer, endianCd){
   var o = this;
   var bytes = new Uint8Array(buffer);
   MO.Lang.Byte.encodeBytes(bytes, 0, bytes.length, sign);
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistence_unserializeEncryptedBuffer = function MPersistence_unserializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.unserialize(view);
   view.dispose();
}
MO.MPersistence_serialize = function MPersistence_serialize(output){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Persistence);
   var count = annotations.count();
   for(var i = 0; i < count; i++){
      var annotation = annotations.at(i);
      var dateCd = annotation.dataCd();
      var name = annotation.name();
      var value = o[name];
      if(dateCd == MO.EDataType.Object){
         value.unserialize(input);
      }else if(dateCd == MO.EDataType.Objects){
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else if(dateCd == MO.EDataType.Dictionary){
         var items = o[name];
         var itemCount = value.count();
         input.writeInt32(itemCount);
         for(var i = 0; i < itemCount; i++){
            var item = value.at(i);
            item.serialize(input);
         }
      }else{
         input.writeData(dateCd, value);
      }
   }
}
MO.MPersistence_serializeBuffer = function MPersistence_serializeBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MPersistence_serializeSignBuffer = function MPersistence_serializeSignBuffer(buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MPersistence_serializeEncryptedBuffer = function MPersistence_serializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   o.serialize(view);
   view.dispose();
}
MO.MProperty = function MProperty(o){
   o = MO.Class.inherits(this, o);
   o.propertyAssign = MO.MProperty_propertyAssign;
   o.propertyLoad   = MO.MProperty_propertyLoad;
   o.propertySave   = MO.MProperty_propertySave;
   return o;
}
MO.MProperty_propertyAssign = function MProperty_propertyAssign(value){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         o[annotation._name] = value[annotation._name];
      }
   }
}
MO.MProperty_propertyLoad = function MProperty_propertyLoad(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         if(annotation._force){
            annotation.load(o, xconfig);
         }else{
            if(xconfig.contains(annotation._linker)){
               annotation.load(o, xconfig);
            }else if(o[annotation._name] == null){
               o[annotation._name] = annotation._value;
            }
         }
      }
   }
}
MO.MProperty_propertySave = function MProperty_propertySave(xconfig){
   var o = this;
   var clazz = MO.Class.find(o.constructor);
   var annotations = clazz.annotations(MO.EAnnotation.Property);
   for(var name in annotations){
      var annotation = annotations[name];
      if(annotation.constructor != Function){
         annotation.save(o, xconfig);
      }
   }
}
MO.SClickEvent = function SClickEvent(sender){
   var o = this;
   MO.SEvent.call(o, sender);
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   MO.SEvent.call(o);
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
MO.THtmlItem = function THtmlItem(){
   var o = this;
   o._link  = null;
   o._links = new Object();
   o.get    = MO.THtmlItem_get;
   o.set    = MO.THtmlItem_set;
   return o;
}
MO.THtmlItem_get = function THtmlItem_get(name){
   return this._links[name];
}
MO.THtmlItem_set = function THtmlItem_set(name, value){
   this._links[name] = value;
}
MO.TXmlDocument = function TXmlDocument(){
   var o = this;
   o._root   = null;
   o.create  = MO.TXmlDocument_create;
   o.root    = MO.TXmlDocument_root;
   o.setRoot = MO.TXmlDocument_setRoot;
   o.xml     = MO.TXmlDocument_xml;
   o.dump    = MO.TXmlDocument_dump;
   return o;
}
MO.TXmlDocument_create = function TXmlDocument_create(n, a, v){
   var r = new MO.TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
MO.TXmlDocument_root = function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new MO.TXmlNode();
      r._name = 'Configuration';
   }
   return r;
}
MO.TXmlDocument_setRoot = function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new MO.TError(o, 'Root node is already exists.');
   }
}
MO.TXmlDocument_xml = function TXmlDocument_xml(){
   var xml = new MO.TString();
   xml.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlDocument_dump = function TXmlDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.RClass.name(o));
   o.root().dump(r);
   return r.flush();
}
MO.TXmlNode = function TXmlNode(name){
   var o = this;
   MO.TNode.call(o, name);
   o.create   = MO.TXmlNode_create;
   o.innerXml = MO.TXmlNode_innerXml;
   o.xml      = MO.TXmlNode_xml;
   o.toString = MO.TXmlNode_toString;
   return o;
}
MO.TXmlNode_create = function TXmlNode_create(name, attribtues){
   var o = this;
   var xnode = new MO.TXmlNode();
   xnode._name = name;
   xnode._attributes = attribtues;
   if(!MO.Class.isClass(attribtues, MO.TAttributes)){
      var a = arguments;
      var len = a.length;
      for(var n = 1; n < len; n += 2){
         if(n + 1 < len){
            xnode.set(a[n], a[n+1]);
         }else{
            xnode.setValue(a[n]);
         }
      }
   }
   o.push(xnode);
   return xnode;
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
         MO.RXml.buildText(s, as.value(n));
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
   MO.RXml.buildText(s, o._value)
   if(o._nodes || o._value != null){
      s.appendRepeat('   ', l);
      s.append('</', o._name, '>');
      s.append('\n');
   }
   return s;
}
MO.TXmlNode_xml = function TXmlNode_xml(){
   var xml = new MO.TString();
   this.innerXml(xml, 0);
   return xml.flush();
}
MO.TXmlNode_toString = function TXmlNode_toString(){
   return this.xml().toString();
}
MO.FBufferedSocket = function FBufferedSocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   o._bufferSends    = MO.Class.register(o, new MO.AGetter('_bufferSends'));
   o._bufferReceives = MO.Class.register(o, new MO.AGetter('_bufferReceives'));
   o.onOpen          = MO.FBufferedSocket_onOpen;
   o.construct       = MO.FBufferedSocket_construct;
   o.push            = MO.FBufferedSocket_push;
   o.process         = MO.FBufferedSocket_process;
   o.dispose         = MO.FBufferedSocket_dispose;
   return o;
}
MO.FBufferedSocket_onOpen = function FBufferedSocket_onOpen(event){
   var o = this;
   o.__base.FSocket.onOpen.call(o, event);
   o.process();
}
MO.FBufferedSocket_ohError = function FBufferedSocket_ohError(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohMessage = function FBufferedSocket_ohMessage(event){
   var o = this._linker;
}
MO.FBufferedSocket_ohClose = function FBufferedSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}
MO.FBufferedSocket_construct = function FBufferedSocket_construct(){
   var o = this;
   o.__base.FSocket.construct.call(o);
   o._bufferSends = new MO.TObjects();
   o._bufferReceives = new MO.TObjects();
}
MO.FBufferedSocket_push = function FBufferedSocket_push(message){
   this._bufferSends.push(message);
}
MO.FBufferedSocket_process = function FBufferedSocket_process(){
   var o = this;
   if(!o._connected){
      return false;
   }
   var sends = o._bufferSends;
   if(!sends.isEmpty()){
      var count = sends.count();
      for(var i = 0; i < count; i++){
         var message = sends.at(i);
         o.send(message);
      }
      sends.clear();
   }
   return true;
}
MO.FBufferedSocket_dispose = function FBufferedSocket_dispose(){
   var o = this;
   o._bufferSends = MO.Lang.Object.dispose(o._bufferSends);
   o._bufferReceives = MO.Lang.Object.dispose(o._bufferReceives);
   o.__base.FSocket.dispose.call(o);
}
MO.FBytes = function FBytes(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o.construct = MO.FBytes_construct;
   o.dispose   = MO.FBytes_dispose;
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
MO.FClassFactory = function FClassFactory(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._classes   = null;
   o.construct  = MO.FClassFactory_construct;
   o.register   = MO.FClassFactory_register;
   o.unregister = MO.FClassFactory_unregister;
   o.create     = MO.FClassFactory_create;
   o.dispose    = MO.FClassFactory_dispose;
   return o;
}
MO.FClassFactory_construct = function FClassFactory_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._classes = new MO.TDictionary();
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
      throw new MO.TError('Create unregister class. (name={1})', n);
   }
   return MO.Class.create(c);
}
MO.FClassFactory_dispose = function FClassFactory_dispose(){
   var o = this;
   o._classes = MO.Lang.Object.dispose(o._classes);
   o.__base.FObject.dispose.call(o);
}
MO.FComponent = function FComponent(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o.dispose = MO.FComponent_dispose;
   return o;
}
MO.FComponent_dispose = function FComponent_dispose(){
   var o = this;
   o.__base.MParent.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FDataStream = function FDataStream(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o._length   = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory   = MO.Class.register(o, new MO.AGetter('_memory'));
   o._viewer   = null;
   o.construct = MO.FDataStream_construct;
   o.setLength = MO.FDataStream_setLength;
   o.flip      = MO.FDataStream_flip;
   o.dispose   = MO.FDataStream_dispose;
   return o;
}
MO.FDataStream_construct = function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FDataStream_setLength = function FDataStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new ArrayBuffer(length);
   o._viewer = new DataView(o._memory);
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
MO.FDataView = function FDataView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   o.link    = MO.FDataView_link;
   o.dispose = MO.FDataView_dispose;
   return o;
}
MO.FDataView_link = function FDataView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}
MO.FDataView_dispose = function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FEncryptedView = function FEncryptedView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MEncryptedStream);
   o.construct = MO.FEncryptedView_construct;
   o.setSign   = MO.FEncryptedView_setSign;
   o.link      = MO.FEncryptedView_link;
   o.dispose   = MO.FEncryptedView_dispose;
   return o;
}
MO.FEncryptedView_construct = function FEncryptedView_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._data = new ArrayBuffer(8);
   o._dataViewer = new DataView(o._data);
}
MO.FEncryptedView_setSign = function FEncryptedView_setSign(value){
   var o = this;
   var sign = o._sign = new Uint8Array(8);
   sign[0] = (value      ) & 0xFF;
   sign[1] = (value >>  8) & 0xFF;
   sign[2] = (value >> 16) & 0xFF;
   sign[3] = (value >> 24) & 0xFF;
   sign[4] = (value >> 24) & 0xFF;
   sign[5] = (value >> 16) & 0xFF;
   sign[6] = (value >>  8) & 0xFF;
   sign[7] = (value      ) & 0xFF;
   o._signLength = sign.length;
}
MO.FEncryptedView_link = function FEncryptedView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}
MO.FEncryptedView_dispose = function FEncryptedView_dispose(){
   var o = this;
   o._sign = null;
   o._data = null;
   o._dataViewer.buffer = null;
   o._dataViewer = null;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FFileReader = function FFileReader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._reader        = null;
   o._fileName      = MO.Class.register(o, new MO.AGetter('_fileName'));
   o._length        = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._data          = MO.Class.register(o, new MO.AGetter('_data'));
   o._statusLoading = false;
   o.ohloadStart    = MO.FFileReader_ohLoadStart;
   o.ohLoad         = MO.FFileReader_ohLoad;
   o.ohLoadEnd      = MO.FFileReader_ohLoadEnd;
   o.ohProgress     = MO.FFileReader_ohProgress;
   o.construct      = MO.FFileReader_construct;
   o.loadFile       = MO.FFileReader_loadFile;
   o.dispose        = MO.FFileReader_dispose;
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
      MO.Logger.error(o, 'Load file failure. (error={1])', reader.error);
   }else{
      o._length = reader.result.byteLength;
      o._data = reader.result;
      var event = new MO.SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
}
MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   var o = this.__linker;
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
MO.FFileReader_loadFile = function FFileReader_loadFile(file){
   var o = this;
   o._fileName = file.name;
   o._length = file.size;
   var reader = o._reader;
   reader.readAsArrayBuffer(file);
}
MO.FFileReader_dispose = function FFileReader_dispose(){
   var o = this;
   var reader = o._reader;
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
MO.FJsonConnection = function FJsonConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._content             = null;
   o.onConnectionComplete = MO.FJsonConnection_onConnectionComplete;
   o.content              = MO.FJsonConnection_content;
   return o;
}
MO.FJsonConnection_onConnectionComplete = function FJsonConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   var content = null;
   var data = o._outputData;
   if(data){
      content = o._content = JSON.parse(data);
   }
   var event = o._event;
   event.connection = o;
   event.data = data;
   event.content = content;
   o.processLoadListener(event);
   o.processCompleteListener(event);
}
MO.FJsonConnection_content = function FJsonConnection_content(){
   return this._content;
}
MO.FSocket = function FSocket(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._connected = MO.Class.register(o, new MO.AGetter('_connected'), false);
   o._handle    = MO.Class.register(o, new MO.AGetter('_handle'));
   o.onOpen     = MO.FSocket_onOpen;
   o.ohOpen     = MO.FSocket_ohOpen;
   o.ohError    = MO.FSocket_ohError;
   o.ohMessage  = MO.FSocket_ohMessage;
   o.ohClose    = MO.FSocket_ohClose;
   o.construct  = MO.FSocket_construct;
   o.connect    = MO.FSocket_connect;
   o.send       = MO.FSocket_send;
   o.disconnect = MO.FSocket_disconnect;
   o.dispose    = MO.FSocket_dispose;
   return o;
}
MO.FSocket_onOpen = function FSocket_onOpen(event){
   var o = this;
   o._connected = true;
}
MO.FSocket_ohOpen = function FSocket_ohOpen(event){
   this._linker.onOpen(event);
}
MO.FSocket_ohError = function FSocket_ohError(event){
   var o = this._linker;
}
MO.FSocket_ohMessage = function FSocket_ohMessage(event){
   var o = this._linker;
}
MO.FSocket_ohClose = function FSocket_ohClose(event){
   var o = this._linker;
   o._connected = false;
}
MO.FSocket_construct = function FSocket_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FSocket_connect = function FSocket_connect(url){
   var o = this;
   var handle = o._handle = new WebSocket(url);
   handle._linker = o;
   handle.onopen = o.ohOpen;
   handle.onerror = o.ohError
   handle.onmessage = o.ohMessage;
   handle.onclose = o.ohClose;
}
MO.FSocket_send = function FSocket_send(message){
   var o = this;
   o._handle.send(message);
}
MO.FSocket_disconnect = function FSocket_disconnect(){
   var o = this;
   o._handle.close();
}
MO.FSocket_dispose = function FSocket_dispose(){
   var o = this;
   o._handle = null;
   o.__base.FObject.dispose.call(o);
}
MO.FXmlConnection = function FXmlConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   o._contentCd           = MO.EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = MO.FXmlConnection_onConnectionSend;
   o.onConnectionComplete = MO.FXmlConnection_onConnectionComplete;
   o.content              = MO.FXmlConnection_content;
   return o;
}
MO.FXmlConnection_onConnectionSend = function FXmlConnection_onConnectionSend(){
   var o = this;
   var data = o._input;
   if(data){
      var xml = null;
      if(data.constructor == String){
         xml = data;
         o._inputNode = null;
      }else if(data.constructor == MO.TXmlNode){
         var document = new MO.TXmlDocument();
         document.setRoot(data);
         xml = document.xml();
         o._inputNode = data;
      }else if(data.constructor == MO.TXmlDocument){
         xml = data.xml();
         o._inputNode = data.root();
      }else{
         throw new MO.TError('Unknown send data type.');
      }
      o._inputData = xml;
      o._contentLength = xml.length;
   }
}
MO.FXmlConnection_onConnectionComplete = function FXmlConnection_onConnectionComplete(){
   var o = this;
   var handle = o._handle;
   var element = null;
   if(handle.responseXML){
      element = handle.responseXML.documentElement;
   }else if(handle.responseXml){
      element = handle.responseXml.documentElement;
   }else{
      throw new MO.TError(o, "Fetch xml data failure.");
   }
   if(!element){
      return MO.Logger.fatal(o, 'Read xml error. (url={1})\n{2}', o._url, c._outputText)
   }
   var document = new MO.TXmlDocument();
   MO.Lang.Xml.buildNode(document, null, element);
   var root = o._outputNode = document.root();
   o._statusFree = true;
   var event = o._event;
   event.connection = o;
   event.document = document;
   event.root = root;
   event.content = root;
   event.parameters = o._parameters;
   o.processLoadListener(event);
   event.dispose();
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
MO.FXmlData = function FXmlData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._ready    = null;
   o._config   = null;
   o.testReady = MO.FXmlData_testReady;
   return o;
}
MO.FXmlData_testReady = function FXmlData_testReady(){
   return this._ready;
}
MO.REngine = function REngine(){
   var o = this;
   o._spaces    = new Object();
   o.Global     = new Object();
   o.Top        = new Object();
   o.Local      = new Object();
   o.onRelease  = MO.REngine_onRelease;
   o.register   = MO.REngine_register;
   o.initialize = MO.REngine_initialize;
   o.connect    = MO.REngine_connect;
   o.buildSpace = MO.REngine_buildSpace;
   o.find       = MO.REngine_find;
   o.findGlobal = MO.REngine_findGlobal;
   o.findTop    = MO.REngine_findTop;
   o.findLocal  = MO.REngine_findLocal;
   return o;
}
MO.REngine_onRelease = function REngine_onRelease(){
   MO.RConsole.release();
   MO.REvent.release();
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
   MO.RConsole.initialize();
}
MO.REngine_connect = function REngine_connect(){
   var o = this;
   MO.RConsole.initialize();
}
MO.REngine_buildSpace = function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(MO.Lang.String.startsWith(n, 'R')){
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
   return this.find(MO.ESpace.Global, n);
}
MO.REngine_findTop = function REngine_findTop(n){
   return top.MO.REngine.find(MO.ESpace.Top, n);
}
MO.REngine_findLocal = function REngine_findLocal(n){
   return this.find(MO.ESpace.Local, n);
}
MO.REngine = new MO.REngine();
MO.RLoader = function RLoader(){
   var o = this;
   o._loading      = new MO.TArray();
   o._loaded       = new MO.TArray()
   o._waits        = new MO.TArray()
   o._intervalId   = null;
   o.hWindow       = null;
   o.onInterval    = MO.RLoader_onInterval;
   o.intervalStart = MO.RLoader_intervalStart;
   o.intervalStop  = MO.RLoader_intervalStop;
   o.loadJsFile    = MO.RLoader_loadJsFile;
   o.loadJs        = MO.RLoader_loadJs;
   o.loaded        = MO.RLoader_loaded;
   o.wait          = MO.RLoader_wait;
   o.waitJs        = MO.RLoader_waitJs;
   o.dispose       = MO.RLoader_dispose;
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
   var d = MO.RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   if(document.getElementById(id) == null){
      var url = top.MO.RContext.location(src);
      var hs = MO.RWindow.createElement('SCRIPT');
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
   var l = new MO.TLoaderListener();
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
   var l = new MO.TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   o.intervalStart();
}
MO.RLoader = new MO.RLoader();
MO.RMessage = function RMessage(){
   var o = this;
   o._hasError     = false;
   o._messages     = null;
   o.push          = MO.RMessage_push;
   o.fatal         = MO.RMessage_fatal;
   o.confirmResult = false;
   o.error         = MO.RMessage_error;
   o.warn          = MO.RMessage_warn;
   o.onWindowClose = MO.RMessage_onWindowClose;
   o.confirm       = MO.RMessage_confirm;
   o.info          = MO.RMessage_info;
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
   var s = new MO.TString();
   var t = new Array();
   var f = MO.RMessage_fatal.caller;
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
   var m = new MO.TString();
   m.appendLine(MO.RContext.get('RMessage:fatal'));
   m.appendLine(MO.Lang.String.repeat('-', 60));
   m.append(MO.Class.dump(sf), ': ');
   if(ms){
      var ag = arguments;
      c = ag.length;
      for(var n = 3; n < c; n++){
         var p = ag[n];
         if('function' == typeof(p)){
            p = MO.Method.name(p);
         }
         var pi = n - 2;
         ms = ms.replace('{' + pi + '}', p);
      }
   }
   m.appendLine(ms);
   m.appendLine(MO.String.repeat('-', 60));
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
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FAlertWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_info = function RMessage_info(self, message, params){
   var s = new MO.TString();
   var n = 0;
   var aw = top.MO.RControl.create(MO.FInfoWindow);
   aw.setText(message);
   aw.show();
}
MO.RMessage_confirm = function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.MO.RControl.create(MO.FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
MO.RMessage_onWindowClose = function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
MO.RMessage = new MO.RMessage();
MO.RStyle = function RStyle(){
   var o = this;
   o._connected = false;
   o._rules     = new MO.TMap();
   o.connect    = MO.RStyle_connect;
   o.has        = MO.RStyle_has;
   o.nvl        = MO.RStyle_nvl;
   o.style      = MO.RStyle_style;
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
   return MO.Class.name(c) + '_' + n;
}
MO.RStyle = new MO.RStyle();
MO.RTypeArray = function RTypeArray(){
   var o = this;
   o._float3 = null;
   o._float4 = null;
   o._data   = new Object();
   return o;
}
MO.RTypeArray.prototype.float3 = function RTypeArray_float3(){
   var o = this;
   var value = o._float3;
   if(value == null){
      value = o._float3 = new Float32Array(3);
   }
   return value;
}
MO.RTypeArray.prototype.float4 = function RTypeArray_float4(){
   var o = this;
   var value = o._float4;
   if(value == null){
      value = o._float4 = new Float32Array(4);
   }
   return value;
}
MO.RTypeArray.prototype.createArray = function RTypeArray_createArray(typeCd, length){
   switch(typeCd){
      case MO.EDataType.Boolean:
      case MO.EDataType.Int8:
         return new Int8Array(length);
      case MO.EDataType.Int16:
         return new Int16Array(length);
      case MO.EDataType.Int32:
         return new Int32Array(length);
      case MO.EDataType.Int64:
         return new Int64Array(length);
      case MO.EDataType.Uint8:
         return new Uint8Array(length);
      case MO.EDataType.Uint16:
         return new Uint16Array(length);
      case MO.EDataType.Uint32:
         return new Uint32Array(length);
      case MO.EDataType.Float32:
         return new Float32Array(length);
      case MO.EDataType.Float64:
         return new Float64Array(length);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', typeCd, length);
}
MO.RTypeArray.prototype.findTemp = function RTypeArray_findTemp(typeCd, length){
   var o = this;
   var data = o._data;
   var collection = data[typeCd];
   if(collection == null){
      collection = data[typeCd] = new Object();
   }
   var result = collection[length];
   if(result == null){
      result = collection[length] = o.createArray(typeCd, length);
   }
   return result;
}
MO.Lang.TypeArray = new MO.RTypeArray();
MO.RXml = function RXml(){
   return this;
}
MO.RXml.prototype.isNode = function RXml_isNode(n){
   return MO.Class.isName(n, 'TNode');
}
MO.RXml.prototype.formatText = function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
MO.RXml.prototype.buildText = function RXml_buildText(s, v){
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
MO.RXml.prototype.buildNode = function RXml_buildNode(pd, pn, pe){
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
MO.RXml.prototype.makeNode = function RXml_makeNode(p){
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
MO.RXml.prototype.makeDocument = function RXml_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}
MO.RXml.prototype.unpack = function RXml_unpack(s, n){
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
MO.RXml.prototype.saveObject = function RXml_saveObject(xconfig, tag, item){
   var o = this;
   for(var name in item){
      var value = item[name];
      if(value != null){
         var xtag = xconfig.create(tag);
         xtag.set('name', name);
         var typeName = typeof(value);
         switch(typeName){
            case 'boolean':
            case 'number':
            case 'date':
            case 'string':
               xtag.setValue(value);
               break;
            case 'function':
               xtag.setValue(MO.Method.name(value));
               break;
            case 'object':
               o.saveObject(xtag, 'Property', value);
               break;
            default:
               throw new MO.TError('Invalid object.');
         }
      }
   }
}
MO.Lang.Xml = new MO.RXml();
MO.FTag = function FTag(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name      = 'Tag';
   o._children  = null;
   o._trimLeft  = false;
   o._trimRight = false;
   o.onBegin    = MO.FTag_onBegin;
   o.onEnd      = MO.FTag_onEnd;
   o.name       = MO.FTag_name;
   o.set        = MO.FTag_set;
   o.push       = MO.FTag_push;
   o.parse      = MO.FTag_parse;
   o.toString   = MO.FTag_toString;
   o.innerDump  = MO.FTag_innerDump;
   o.dump       = MO.FTag_dump;
   return o;
}
MO.FTag_onBegin = function FTag_onBegin(p){
   return MO.EResult.Continue;
}
MO.FTag_onEnd = function FTag_onEnd(p){
   return MO.EResult.Continue;
}
MO.FTag_name = function FTag_name(){
   return this._name;
}
MO.FTag_set = function FTag_set(n, v){
   throw new MO.TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}
MO.FTag_push = function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new MO.TObjects();
   }
   ts.push(p);
}
MO.FTag_parse = function FTag_parse(p){
   var o = this;
   var r = o.onBegin(p);
   if(r == MO.EResult.Continue){
      var ts = o._children;
      if(ts){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.get(i);
            r = t.parse(p);
            if(r == MO.EResult.Cancel){
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
   ps.append(MO.Class.dump(pt));
   var s = pt.toString();
   if(!MO.MO.Lang.String.isEmpty(s)){
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
   var result = new MO.TString();
   this.innerDump(result, this, 0);
   return result.toString();
}
MO.FTagContext = function FTagContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MInstance);
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._source         = null;
   o.construct       = MO.FTagContext_construct;
   o.instanceAlloc   = MO.FTagContext_instanceAlloc;
   o.get             = MO.FTagContext_get;
   o.set             = MO.FTagContext_set;
   o.setBoolean      = MO.FTagContext_setBoolean;
   o.source          = MO.FTagContext_source;
   o.write           = MO.FTagContext_write;
   o.resetSource     = MO.FTagContext_resetSource;
   o.dispose         = MO.FTagContext_dispose;
   return o;
}
MO.FTagContext_construct = function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._source = new MO.TString();
}
MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(){
   this._attributes.clear();
}
MO.FTagContext_get = function FTagContext_get(name, value){
   return this._attributes.get(name, value);
}
MO.FTagContext_set = function FTagContext_set(name, value){
   this._attributes.set(name, value);
}
MO.FTagContext_setBoolean = function FTagContext_setBoolean(name, value){
   this._attributes.set(name, MO.RBoolean.toString(value));
}
MO.FTagContext_source = function FTagContext_source(){
   return this._source.toString();
}
MO.FTagContext_write = function FTagContext_write(p){
   if(!MO.Lang.String.isEmpty(p)){
      this._source.append(p);
   }
}
MO.FTagContext_resetSource = function FTagContext_resetSource(p){
   this._source.clear();
}
MO.FTagContext_dispose = function FTagContext_dispose(){
   var o = this;
   o._attributes = RObject.dispose(o._attributes);
   o._source = RObject.dispose(o._source);
   o.__base.FObject.dispose.call(o);
}
MO.FTagDocument = function FTagDocument(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._space  = MO.Class.register(o, MO.AGetSet('_space'));
   o._root   = MO.Class.register(o, MO.AGetter('_root'));
   o.create   = MO.FTagDocument_create;
   o.loadNode = MO.FTagDocument_loadNode;
   o.load     = MO.FTagDocument_load;
   o.parse    = MO.FTagDocument_parse;
   o.dump     = MO.FTagDocument_dump;
   return o;
}
MO.FTagDocument_create = function FTagDocument_create(p){
   var o = this;
   var sn = o._space + '_';
   var n = null;
   if(MO.RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   var t = null;
   switch(n){
      case 'source':
         t = MO.Class.create(MO.FTag);
         break;
      case 'write':
         t = MO.Class.create(MO.FTagWrite);
         break;
      case 'true':
         t = MO.Class.create(MO.FTagTrue);
         break;
      case 'false':
         t = MO.Class.create(MO.FTagFalse);
         break;
      case 'equals':
         t = MO.Class.create(MO.FTagEquals);
         break;
      case 'notEquals':
         t = MO.Class.create(MO.FTagNotEquals);
         break;
      default:
         throw new MO.TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
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
            x.set(ea.nodeName, MO.RXml.formatText(ea.value));
         }
      }
   }
   var ens = pe.childNodes
   if(ens){
      var c = ens.length;
      for(var i = 0; i < c; i++){
         var en = ens[i];
         switch(en.nodeType){
            case MO.ENodeType.Text:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case MO.ENodeType.Data:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case MO.ENodeType.Node:
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
   var xr = MO.RXml.makeString(s);
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
   var r = new MO.TString();
   r.appendLine(MO.Class.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
MO.FTagEquals = function FTagEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagEquals_onBegin;
   o.set       = MO.FTagEquals_set;
   o.toString  = MO.FTagEquals_toString;
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
   return r ? MO.EResult.Continue : MO.EResult.Skip;
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
MO.FTagFalse = function FTagFalse(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagFalse_onBegin;
   o.set       = MO.FTagFalse_set;
   o.toString  = MO.FTagFalse_toString;
   return o;
}
MO.FTagFalse_onBegin = function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return MO.RBoolean.parse(v) ? MO.EResult.Skip : MO.EResult.Continue;
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
MO.FTagNotEquals = function FTagNotEquals(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = MO.FTagNotEquals_onBegin;
   o.set       = MO.FTagNotEquals_set;
   o.toString  = MO.FTagNotEquals_toString;
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
   return r ? MO.EResult.Continue : MO.EResult.Skip;
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
MO.FTagText = function FTagText(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._text    = MO.Class.register(o, new MO.AGetSet('_text'));
   o.onBegin  = MO.FTagText_onBegin;
   o.toString = MO.FTagText_toString;
   return o;
}
MO.FTagText_onBegin = function FTagText_onBegin(p){
   var t = this._text;
   if(p._trimLeft){
      if(MO.RString.startsWith(t, '\r')){
         t = t.substring(1);
      }
      if(MO.RString.startsWith(t, '\n')){
         t = t.substring(1);
      }
   }
   if(p._trimRight){
      if(MO.RString.endsWith(t, '\r')){
         t = t.substring(0, t.length - 1);
      }
      if(MO.RString.endsWith(t, '\n')){
         t = t.substring(0, t.length - 1);
      }
   }
   p.write(t);
   return MO.EResult.Skip;
}
MO.FTagText_toString = function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
MO.FTagTrue = function FTagTrue(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = MO.FTagTrue_onBegin;
   o.set       = MO.FTagTrue_set;
   o.toString  = MO.FTagTrue_toString;
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
      if(MO.Lang.Boolean.parse(v)){
         r = true;
         break;
      }
   }
   return r ? MO.EResult.Continue : MO.EResult.Skip;
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
MO.FTagWrite = function FTagWrite(o){
   o = MO.Class.inherits(this, o, MO.FTag);
   o._source  = null;
   o.onBegin  = MO.FTagWrite_onBegin;
   o.set      = MO.FTagWrite_set;
   o.toString = MO.FTagWrite_toString;
   return o;
}
MO.FTagWrite_onBegin = function FTagWrite_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   p.write(v);
   return MO.EResult.Skip;
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
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
MO.SProcessEvent = function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   o.process        = MO.SXmlEvent_process;
   o.dispose        = MO.SXmlEvent_dispose;
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
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FContentConsole = function FContentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FContentConsole_onLoad;
   o.construct    = MO.FContentConsole_construct;
   o.alloc        = MO.FContentConsole_alloc;
   o.process      = MO.FContentConsole_process;
   o.send         = MO.FContentConsole_send;
   return o;
}
MO.FContentConsole_construct = function FContentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._connections = new MO.TObjects();
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
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = MO.Class.create(MO.FXmlConnection);
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
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
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
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
MO.FDragConsole = function FDragConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = MO.EScope.Local;
   o._activeDragable = null;
   o._dragables      = null;
   o.onMouseDown     = MO.FDragConsole_onMouseDown;
   o.onMouseMove     = MO.FDragConsole_onMouseMove;
   o.onMouseUp       = MO.FDragConsole_onMouseUp;
   o.construct       = MO.FDragConsole_construct;
   o.register        = MO.FDragConsole_register;
   o.unregister      = MO.FDragConsole_unregister;
   o.clear           = MO.FDragConsole_clear;
   return o;
}
MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
   var o = this;
   var es = p.source;
   if(!es){
      return;
   }
   if(!MO.Class.isClass(es, MO.MUiDragable)){
      return;
   }
   MO.RWindow.setOptionSelect(false);
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
   MO.RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
MO.FDragConsole_construct = function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new MO.TObjects();
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
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
MO.FEnvironment = function FEnvironment(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name  = MO.Class.register(o, new MO.AGetSet('_name'));
   o._value = MO.Class.register(o, new MO.AGetSet('_value'));
   o.set    = MO.FEnvironment_set;
   return o;
}
MO.FEnvironment_set = function FEnvironment_set(name, value){
   var o = this;
   o._name = name;
   o._value = value;
}
MO.FEnvironmentConsole = function FEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
   o.construct     = MO.FEnvironmentConsole_construct;
   o.register      = MO.FEnvironmentConsole_register;
   o.registerValue = MO.FEnvironmentConsole_registerValue;
   o.find          = MO.FEnvironmentConsole_find;
   o.findValue     = MO.FEnvironmentConsole_findValue;
   o.parse         = MO.FEnvironmentConsole_parse;
   o.dispose       = MO.FEnvironmentConsole_dispose;
   return o;
}
MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._environments = new MO.TDictionary();
}
MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
   var o = this;
   var name = environment.name();
   o._environments.set(name, environment);
}
MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
   var o = this;
   var environment = MO.RClass.create(MO.FEnvironment);
   environment.set(name, value);
   o._environments.set(name, environment);
   return environment;
}
MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
   return this._environments.get(name);
}
MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
   var o = this;
   var value = null;
   var environment = o._environments.get(name);
   if(environment){
      value = environment.value();
   }
   return value;
}
MO.FEnvironmentConsole_parse = function FEnvironmentConsole_parse(value){
   var o = this;
   var result = value;
   var environments = o._environments;
   var count = environments.count();
   for(var i = 0; i < count; i++){
      var environment = environments.at(i);
      result = MO.Lang.String.replace(result, '{' + environment.name() + '}', environment.value());
   }
   return result;
}
MO.FEnvironmentConsole_dispose = function FEnvironmentConsole_dispose(){
   var o = this;
   o._environments = new TDictionary();
   o.__base.FConsole.dispose.call(o);
}
MO.FEvent = function FEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._owner      = MO.Class.register(o, new MO.AGetSet('_owner'));
   o._callback   = MO.Class.register(o, new MO.AGetSet('_callback'));
   o._valid      = MO.Class.register(o, new MO.AGetSet('_valid'), true);
   o.process     = MO.FEvent_process;
   return o;
}
MO.FEvent_process = function FEvent_process(){
   var o = this;
   if(o._valid){
      var owner = o._owner;
      if(owner){
         o._callback.call(owner, o);
      }else{
         o._callback(o);
      }
   }
}
MO.FEventConsole = function FEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._thread        = null;
   o._interval      = 100;
   o._processEvents = null;
   o._events        = null;
   o.onProcess      = MO.FEventConsole_onProcess;
   o.construct      = MO.FEventConsole_construct;
   o.register       = MO.FEventConsole_register;
   o.push           = MO.FEventConsole_push;
   o.clear          = MO.FEventConsole_clear;
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
   o._processEvents = new MO.TObjects();
   o._events = new MO.TObjects();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.lsnsProcess.register(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(thread));
}
MO.FEventConsole_register = function FEventConsole_register(po, pc){
   var o = this;
   var e = MO.Class.create(FEvent);
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
MO.FHttpConsole = function FHttpConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._pool      = null;
   o.onComplete = MO.FHttpConsole_onComplete;
   o.construct  = MO.FHttpConsole_construct;
   o.create     = MO.FHttpConsole_create;
   o.alloc      = MO.FHttpConsole_alloc;
   o.free       = MO.FHttpConsole_free;
   o.send       = MO.FHttpConsole_sendAsync;
   o.sendSync   = MO.FHttpConsole_sendSync;
   o.sendAsync  = MO.FHttpConsole_sendAsync;
   o.fetch      = MO.FHttpConsole_fetchAsync;
   o.fetchSync  = MO.FHttpConsole_fetchSync;
   o.fetchAsync = MO.FHttpConsole_fetchAsync;
   o.dispose    = MO.FHttpConsole_dispose;
   return o;
}
MO.FHttpConsole_onComplete = function FHttpConsole_onComplete(event){
   var o = this;
   var connection = event.connection;
   o._pool.free(connection);
}
MO.FHttpConsole_construct = function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = MO.Class.create(MO.FObjectPool);
}
MO.FHttpConsole_create = function FHttpConsole_create(){
   return MO.Class.create(MO.FHttpConnection);
}
MO.FHttpConsole_alloc = function FHttpConsole_alloc(clazz){
   var o = this;
   var pool = o._pool;
   if(!pool.hasFree()){
      o._pool.push(o.create());
   }
   var connection = pool.alloc();
   connection.reset();
   connection.addCompleteListener(o, o.onComplete);
   return connection;
}
MO.FHttpConsole_free = function FHttpConsole_free(connection){
   this._pool.free(connection);
}
MO.FHttpConsole_sendSync = function FHttpConsole_sendSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_fetchSync = function FHttpConsole_fetchSync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection.content();
}
MO.FHttpConsole_fetchAsync = function FHttpConsole_fetchAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FIdleConsole = function FIdleConsole(o){
   o = MO.Class.inherits(this, o, FConsole);
   o.scope    = MO.EScope.Page;
   o.register = MO.FIdleConsole_register;
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
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FJsonConsole_create;
   return o;
}
MO.FJsonConsole_create = function FJsonConsole_create(){
   return MO.Class.create(MO.FJsonConnection);
}
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Global;
   o._socket    = null;
   o.onOutput   = MO.FLoggerConsole_onOutput;
   o.construct  = MO.FLoggerConsole_construct;
   o.connect    = MO.FLoggerConsole_connect;
   o.output     = MO.FLoggerConsole_output;
   o.disconnect = MO.FLoggerConsole_disconnect;
   o.dispose    = MO.FLoggerConsole_dispose;
   return o;
}
MO.FLoggerConsole_onOutput = function FLoggerConsole_onOutput(event){
   var message = event.message;
   this.output(message);
}
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Logger.lsnsOutput.register(o, o.onOutput);
}
MO.FLoggerConsole_connect = function FLoggerConsole_connect(url){
   var o = this;
   var socket = o._socket = MO.Class.create(MO.FBufferedSocket);
   socket.connect(url);
}
MO.FLoggerConsole_output = function FLoggerConsole_output(message){
   var socket = this._socket;
   if(socket){
      var url = window.location.toString();
      socket.push('[' + url + '] - ' + message);
      socket.process();
   }
}
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   var socket = this._socket;
   if(socket){
      socket.close();
   }
}
MO.FLoggerConsole_dispose = function FLoggerConsole_dispose(){
   var o = this;
   o._socket = MO.Lang.Object.dispose(o._socket);
   o.__base.FConsole.dispose.call(o);
}
MO.FMonitorConsole = function FMonitorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope      = MO.EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new MO.TList();
   o.hWindow    = null;
   o.doInterval = MO.FMonitorConsole_doInterval;
   o.push       = MO.FMonitorConsole_push;
   o.process    = MO.FMonitorConsole_process;
   o.processAll = MO.FMonitorConsole_processAll;
   o.startup    = MO.FMonitorConsole_startup;
   o.wait       = MO.FMonitorConsole_wait;
   o.release    = MO.FMonitorConsole_release;
   return o;
}
MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + MO.Lang.String.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case MO.EMonitor.Sleep:
            break;
         case MO.EMonitor.Active:
            monitor.process(this.interval);
            break;
         case MO.EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n = 0; n < monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
   var con = MO.RGlobal.get(FMonitorConsole);
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
MO.FMouseConsole = function FMouseConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeCapture = null;
   o.onMouseDown    = MO.FMouseConsole_onMouseDown;
   o.onMouseMove    = MO.FMouseConsole_onMouseMove;
   o.onMouseUp      = MO.FMouseConsole_onMouseUp;
   o.construct      = MO.FMouseConsole_construct;
   o.captureStart   = MO.FMouseConsole_captureStart;
   o.capture        = MO.FMouseConsole_capture;
   o.captureStop    = MO.FMouseConsole_captureStop;
   o.register       = MO.FMouseConsole_register;
   o.unregister     = MO.FMouseConsole_unregister;
   o.clear          = MO.FMouseConsole_clear;
   return o;
}
MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
   var o = this;
   var s = MO.RHtml.searchLinker(p.hSource, MO.MMouseCapture);
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
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      MO.RWindow.setOptionSelect(false);
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
   MO.RWindow.setOptionSelect(true);
}
MO.FMouseConsole_register = function FMouseConsole_register(p){
}
MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
}
MO.FMouseConsole_clear = function FMouseConsole_clear(){
}
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
MO.FProcess = function FProcess(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcess_ohMessage;
   o.onMessage = MO.FProcess_onMessage;
   o.construct = MO.FProcess_construct;
   o.name      = MO.FProcess_name;
   o.start     = MO.FProcess_start;
   o.process   = MO.FProcess_process;
   return o;
}
MO.FProcess_ohMessage = function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcess_onMessage = function FProcess_onMessage(p){
}
MO.FProcess_construct = function FProcess_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcess_start = function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
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
   var e = new MO.SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
MO.FProcessConsole = function FProcessConsole(o){
   o = MO.Class.inherits(this, o, FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FProcessConsole_onLoad;
   o.construct    = MO.FProcessConsole_construct;
   o.alloc        = MO.FProcessConsole_alloc;
   o.process      = MO.FProcessConsole_process;
   o.send         = MO.FProcessConsole_send;
   return o;
}
MO.FProcessConsole_construct = function FProcessConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
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
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = MO.Class.create(MO.FXmlConnection);
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
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
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
MO.FProcessEvent = function FProcessEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
   o._listeners = null;
   o.register   = MO.FProcessEvent_register;
   return o;
}
MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
   var o = this;
   if(!o._listeners){
      o._listeners = new MO.TListeners();
   }
   o._listeners.register(owner, callback);
}
MO.FProcessor = function FProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcessor_ohMessage;
   o.onMessage = MO.FProcessor_onMessage;
   o.construct = MO.FProcessor_construct;
   o.start     = MO.FProcessor_start;
   o.process   = MO.FProcessor_process;
   return o;
}
MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcessor_onMessage = function FProcessor_onMessage(p){
}
MO.FProcessor_construct = function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcessor_start = function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
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
   var event = new MO.SProcessEvent();
   event.index = c;
   event.code = p.code();
   event.data = p.data();
   o._worker.postMessage(event);
}
MO.FProcessServer = function FProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name               = MO.Class.register(o, new MO.AGetSet('_name'));
   o._handle             = null;
   o._processors         = null;
   o.ohInterval          = MO.FProcessServer_ohInterval;
   o.onInterval          = MO.FProcessServer_onInterval;
   o.ohMessage           = MO.FProcessServer_ohMessage;
   o.onMessage           = MO.FProcessServer_onMessage;
   o.construct           = MO.FProcessServer_construct;
   o.registerProcessor   = MO.FProcessServer_registerProcessor;
   o.unregisterProcessor = MO.FProcessServer_unregisterProcessor;
   o.send                = MO.FProcessServer_send;
   o.process             = MO.FProcessServer_process;
   return o;
}
MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
   MO.FProcessServer.__linker.onInterval();
}
MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
   var o = this;
}
MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
   MO.FProcessServer.__linker.onMessage(p.data);
}
MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
MO.FProcessServer_construct = function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new MO.TDictionary();
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
MO.FServiceConsole = function FServiceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o.construct = MO.FServiceConsole_construct;
   o.send      = MO.FServiceConsole_send;
   o.dispose   = MO.FServiceConsole_dispose;
   return o;
}
MO.FServiceConsole_onLoad = function FServiceConsole_onLoad(connection){
   var o = this;
   o._pool.free(connection);
}
MO.FServiceConsole_construct = function FServiceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FServiceConsole_send = function FServiceConsole_send(code, action, content){
   var o = this;
   var uri = '/' + code + '.ws?action=' + action;
   var url = MO.Window.Browser.hostPath(uri);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, content);
   return connection;
}
MO.FServiceConsole_dispose = function FServiceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FStatistics = function FStatistics(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = null;
   o.reset      = MO.FStatistics_reset;
   o.resetFrame = MO.FStatistics_resetFrame;
   return o;
}
MO.FStatistics_reset = function FStatistics_reset(){
}
MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
}
MO.FStatisticsConsole = function FStatisticsConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
   o.construct     = MO.FStatisticsConsole_construct;
   o.register      = MO.FStatisticsConsole_register;
   o.unregister    = MO.FStatisticsConsole_unregister;
   o.find          = MO.FStatisticsConsole_find;
   o.reset         = MO.FStatisticsConsole_reset;
   o.resetFrame    = MO.FStatisticsConsole_resetFrame;
   return o;
}
MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new MO.TDictionary();
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
MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).reset();
   }
}
MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).resetFrame();
   }
}
MO.FThread = function FThread(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerProcess);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   o._delay      = 0;
   o.construct   = MO.FThread_construct;
   o.start       = MO.FThread_start;
   o.stop        = MO.FThread_stop;
   o.process     = MO.FThread_process;
   return o;
}
MO.FThread_construct = function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FThread_start = function FThread_start(){
   this._statusCd = MO.EThreadStatus.Active;
}
MO.FThread_stop = function FThread_stop(){
   this._statusCd = MO.EThreadStatus.Finish;
}
MO.FThread_process = function FThread_process(interval){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= interval;
   }
}
MO.FThreadConsole = function FThreadConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Global;
   o._active      = true;
   o._requestFlag = false;
   o._interval    = 8;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   o._hIntervalId = null;
   o.ohInterval   = MO.FThreadConsole_ohInterval;
   o.construct    = MO.FThreadConsole_construct;
   o.push         = MO.FThreadConsole_push;
   o.start        = MO.FThreadConsole_start;
   o.process      = MO.FThreadConsole_process;
   o.processAll   = MO.FThreadConsole_processAll;
   o.dispose      = MO.FThreadConsole_dispose;
   return o;
}
MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
   var threadConsole = MO.Console.find(MO.FThreadConsole);
   threadConsole.processAll();
}
MO.FThreadConsole_push = function FThreadConsole_push(thread){
   this._threads.push(thread);
}
MO.FThreadConsole_start = function FThreadConsole_start(thread){
   thread.start();
   this._threads.push(thread);
}
MO.FThreadConsole_construct = function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new MO.TObjects();
      o._hIntervalId = MO.Window.htmlWindow().setInterval(o.ohInterval, o._interval);
}
MO.FThreadConsole_process = function FThreadConsole_process(thread){
   var o = this;
   if(thread){
      var statusCd = thread.statusCd();
      switch(statusCd){
         case MO.EThreadStatus.Sleep:
            break;
         case MO.EThreadStatus.Active:
            thread.process(o._interval);
            break;
         case MO.EThreadStatus.Finish:
            o._threads.remove(thread);
            thread.dispose();
            break;
      }
   }
}
MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var threads = o._threads;
      var count = threads.count();
      try{
         for(var i = 0; i < count; i++){
            var thread = threads.at(i);
            o.process(thread);
         }
      }catch(error){
         MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
      }
   }
   if(o._requestFlag){
      MO.Window.requestAnimationFrame(o.ohInterval);
   }
}
MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
   var o = this;
   if(o._requestFlag){
      MO.Window.cancelRequestAnimationFrame(o.ohInterval);
   }else{
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         MO.Window.htmlWindow().clearInterval(hIntervalId);
         o._hIntervalId = null;
      }
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   o.__base.FConsole.dispose.call(o);
}
MO.FTimeConsole = function FTimeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._date     = null;
   o.construct = MO.FTimeConsole_construct;
   o.dispose   = MO.FTimeConsole_dispose;
   return o;
}
MO.FTimeConsole_construct = function FTimeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FTimeConsole_dispose = function FTimeConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o.create = MO.FXmlConsole_create;
   return o;
}
MO.FXmlConsole_create = function FXmlConsole_create(){
   return MO.Class.create(MO.FXmlConnection);
}
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
   var hPanel = o._hDisablePanel;
   if(!hPanel){
      hPanel = o._hDisablePanel = MO.Window.Builder.createDiv(o._hDocument, 'RWindow_Disable');
      hPanel.style.zIndex = 5000;
   }
   var hImage = o._hDisableImage;
   if(!hImage){
      hImage = o._hDisableImage = MO.Window.Builder.appendIcon(hPanel);
      hImage.src = MO.RResource.iconPath('control.RWindow_Loading');
      hImage.style.margin = o._hContainer.offsetHeight / 2;
      hImage.style.display = 'none';
   }
   MO.Window.Html.visibleSet(hImage, f);
   return hPanel;
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
         throw new MO.TError(o, 'Unknown orientation mode.');
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
MO.EConstant = new function EConstant(){
   var o = this;
   o.DeviceType = 'device.type';
   return o;
}
MO.STouchEvent = function STouchEvent(){
   var o = this;
   o.dispose = MO.STouchEvent_dispose;
   return o;
}
MO.STouchEvent_dispose = function STouchEvent_dispose(){
   var o = this;
}
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
   o.create       = MO.TDumpItem_create;
   o.push         = MO.TDumpItem_push;
   o.innerShow    = MO.TDumpItem_innerShow;
   o.show         = MO.TDumpItem_show;
   return o;
}
MO.TDumpItem_create = function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new MO.TDumpItem();
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
      MO.RHtml.visibleSet(tr, v);
   }
   var c = o.children.length;
   for(var n = 0; n < c; n++){
      var d = o.children[n];
      MO.RHtml.visibleSet(d.hRow, v);
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
   var label = MO.Lang.String.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = MO.RHtml.toHtml(label);
   o.innerShow(v);
}
MO.FImage = function FImage(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._optionAlpha   = MO.Class.register(o, new MO.AGetter('_optionAlpha'), true);
   o._ready         = false;
   o._size          = MO.Class.register(o, new MO.AGetter('_size'));
   o._url           = MO.Class.register(o, new MO.AGetter('_url'));
   o._hImage        = null;
   o.ohLoad         = MO.FImage_ohLoad;
   o.ohError        = MO.FImage_ohError;
   o.construct      = MO.FImage_construct;
   o.image          = MO.FImage_image;
   o.testReady      = MO.FImage_testReady;
   o.loadUrl        = MO.FImage_loadUrl;
   o.dispose        = MO.FImage_dispose;
   return o;
}
MO.FImage_ohLoad = function FImage_ohLoad(){
   var o = this.__linker;
   var hImage = o._hImage;
   o._size.set(hImage.naturalWidth, hImage.naturalHeight);
   o._ready = true;
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FImage_ohError = function FImage_ohError(p){
   var o = this.__linker;
   var url = o._url;
   MO.Logger.error(o, 'Load image failure. (url={1})', url);
}
MO.FImage_construct = function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FImage_image = function FImage_image(){
   return this._hImage;
}
MO.FImage_testReady = function FImage_testReady(){
   return this._ready;
}
MO.FImage_loadUrl = function FImage_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var hImage = o._hImage;
   if(!hImage){
      hImage = o._hImage = new Image();
      hImage.__linker = o;
      hImage.onload = o.ohLoad;
      hImage.onerror = o.ohError;
   }
   o._url = url;
   hImage.src = url;
}
MO.FImage_dispose = function FImage_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._hImage = MO.RHtml.free(o._hImage);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FTouchTracker = function FTouchTracker(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerTouchZoom);
   o._touchsLength   = null;
   o._touchs         = null;
   o._touchPool      = null;
   o._touchZoomEvent = null;
   o.construct       = MO.FTouchTracker_construct;
   o.calculateLength = MO.FTouchTracker_calculateLength;
   o.eventStart      = MO.FTouchTracker_eventStart;
   o.eventMove       = MO.FTouchTracker_eventMove;
   o.eventStop       = MO.FTouchTracker_eventStop;
   o.dispose         = MO.FTouchTracker_dispose;
   return o;
}
MO.FTouchTracker_construct = function FTouchTracker_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._touchs = new MO.TObjects();
   o._touchPool = MO.Class.create(MO.FObjectPool);
   o._touchZoomEvent = new MO.SEvent(o);
}
MO.FTouchTracker_calculateLength = function FTouchTracker_calculateLength(hEvent){
   var o = this;
   var total = 0;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   if(count > 0){
      for(var i = 0; i < count; i++){
         var hTouche1 = hTouches[i];
         var hTouche2 = (i == count - 1) ? hTouches[0] : hTouches[i + 1];
         var cx = hTouche1.clientX - hTouche2.clientX;
         var cy = hTouche1.clientY - hTouche2.clientY;
         var length = Math.sqrt(cx * cx + cy * cy);
         total += length;
      }
   }
   return total;
}
MO.FTouchTracker_eventStart = function FTouchTracker_eventStart(hEvent){
   var o = this;
   var touchs = o._touchs;
   touchs.clear();
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = new STouchEvent();
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
      touchs.push(touch);
   }
   o._touchsLength = o.calculateLength(hEvent);
}
MO.FTouchTracker_eventMove = function FTouchTracker_eventMove(hEvent){
   var o = this;
   var touchs = o._touchs;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = touchs.at(i);
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
   }
   var touchsLength = o.calculateLength(hEvent);
   if(o._touchsLength != touchsLength){
      var event = o._touchZoomEvent;
      event.touchsLength = touchsLength;
      event.delta = touchsLength - o._touchsLength;
      o.processTouchZoomListener(event);
      o._touchsLength = touchsLength;
   }
}
MO.FTouchTracker_eventStop = function FTouchTracker_eventStop(hEvent){
   var o = this;
}
MO.FTouchTracker_dispose = function FTouchTracker_dispose(){
   var o = this;
   o._touchs = MO.Lang.Object.dispose(o._touchs);
   o._touchZoomEvent = MO.Lang.Object.dispose(o._touchZoomEvent);
   o.__base.MListenerTouchZoom.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.RBuilder = function RBuilder(){
   return this;
}
MO.RBuilder.prototype.create = function RBuilder_create(h, t, s){
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
MO.RBuilder.prototype.createIcon = function RBuilder_createIcon(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', MO.Lang.String.nvl(style, 'Tag_Icon'));
   hImage.align = 'absmiddle';
   if(uri){
      hImage.src = MO.Window.Resource.iconPath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
}
MO.RBuilder.prototype.createImage = function RBuilder_createImage(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', style);
   if(uri){
      hImage.src = MO.Window.Resource.imagePath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
}
MO.RBuilder.prototype.createText = function RBuilder_createText(d, s, v){
   var r = this.create(d, 'SPAN', s);
   if(v){
      r.innerHTML = v;
   }
   return r;
}
MO.RBuilder.prototype.createButton = function RBuilder_createButton(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'button';
   return r;
}
MO.RBuilder.prototype.createCheck = function RBuilder_createCheck(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'checkbox';
   return r;
}
MO.RBuilder.prototype.createRadio = function RBuilder_createRadio(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'radio';
   return r;
}
MO.RBuilder.prototype.createEdit = function RBuilder_createEdit(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'text';
   return r;
}
MO.RBuilder.prototype.createFile = function RBuilder_createFile(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'file';
   return r;
}
MO.RBuilder.prototype.createSpan = function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
MO.RBuilder.prototype.createDiv = function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
MO.RBuilder.prototype.createTable = function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   if(b){
      h.border = MO.Lang.Integer.nvl(b);
   }
   h.cellSpacing = MO.Lang.Integer.nvl(cs);
   h.cellPadding = MO.Lang.Integer.nvl(cp);
   return h;
}
MO.RBuilder.prototype.createTableRow = function RBuilder_createTableRow(d, s){
   var h = this.create(d, 'TR', s);
   return h;
}
MO.RBuilder.prototype.createTableCell = function RBuilder_createTableCell(d, s){
   var h = this.create(d, 'TD', s);
   return h;
}
MO.RBuilder.prototype.createFragment = function RBuilder_createFragment(document){
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
MO.RBuilder.prototype.append = function RBuilder_append(p, t, s){
   var r = this.create(p.ownerDocument, t, s);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
MO.RBuilder.prototype.appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
   var r = this.createIcon(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendImage = function RBuilder_appendImage(p, s, u, w, h){
   var r = this.createImage(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendEmpty = function RBuilder_appendEmpty(p, w, h){
   var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendText = function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendButton = function RBuilder_appendButton(p, s){
   var r = this.createButton(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendCheck = function RBuilder_appendCheck(p, s){
   var r = this.createCheck(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendRadio = function RBuilder_appendRadio(p, s){
   var r = this.createRadio(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendEdit = function RBuilder_appendEdit(p, s){
   var r = this.createEdit(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendFile = function RBuilder_appendFile(p, s){
   var r = this.createFile(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendSpan = function RBuilder_appendSpan(p, s){
   var r = this.createSpan(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendDiv = function RBuilder_appendDiv(p, s){
   var r = this.createDiv(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
   var r = this.createTable(p.ownerDocument, s, b, cs, cp);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
MO.RBuilder.prototype.appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
   var r = null;
   if(i == null){
      if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
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
MO.RBuilder.prototype.appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
   var o = this;
   var hr = o.appendTableRow(p, null, null, w);
   var hc = o.appendTableCell(hr, s, null, h);
   return hc;
}
MO.RBuilder.prototype.appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
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
MO.RBuilder = new MO.RBuilder();
MO.Window.Builder = MO.RBuilder;
MO.RContext = function RContext(){
   var o = this;
   o._location   = null;
   o._contexts   = new Object();
   o.contextPath = null;
   o.contextTag  = null;
   o.themeId     = null;
   o.languageId  = null;
   return o;
}
MO.RContext.prototype.location = function RContext_location(s){
   var o = this;
   var r = o._location;
   if(r == null){
      var l = window.location;
      var hr = l.href;
      var pn = l.pathname;
      r = hr.substring(0, hr.indexOf(pn))
      if(o.contextPath){
         r += o.contextPath;
      }
      o._location = r;
   }
   if(s){
      r += s;
   }
   return r;
}
MO.RContext.prototype.context = function RContext_context(s){
   var o = this;
   if(s != null){
      if(MO.Lang.String.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(MO.Lang.String.startsWith(s, '#')){
         return o.contextPath + o.contextTag + s.substr(1);
      }
      return o.contextPath + s;
   }
   return o.contextPath;
}
MO.RContext.prototype.initialize = function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new MO.TContext(n, nc, v);
      }
   }
}
MO.RContext.prototype.get = function RContext_get(code, p1, p2, p3, p4, p5){
   var o = this;
   var context = o._contexts[code];
   if(!context){
      return MO.Logger.warn(o, 'Can not find context (code={1})', code);
   }
   return MO.Lang.String.format(context.text, p1, p2, p3, p4, p5)
}
MO.RContext.prototype.find = function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return MO.Logger.warn(o, 'Can not find context (id={1})', id);
   }
   return r.text;
}
MO.RContext = new MO.RContext();
MO.Context = MO.RContext;
MO.RDump = function RDump(){
   var o = this;
   o.LINE_SINGLE = '------------------------------';
   o.LINE_DOUBLE = '==============================';
   o.LINE_DOT    = '..............................';
   o.LINE_STAR   = '******************************';
   return o;
}
MO.RDump.prototype.onclick = function RDump_onclick(){
   var o = this;
   var d = o.link;
   if(o.link){
      if(d.loaded){
         d.show(!d.display);
      }else{
         MO.RDump.dumpInner(o.link);
         d.loaded = true;
         d.show(true);
      }
   }
}
MO.RDump.prototype.nameInfo = function RDump_nameInfo(v){
   var t = MO.Class.typeOf(v);
   switch(t){
      case 'Unknown':
         return '@unknown';
      case 'Function':
         return MO.Method.name(v) + '@Function';
      case 'Array':
         return '@<Array>';
   }
   return v;
}
MO.RDump.prototype.typeInfo = function RDump_typeInfo(v, t){
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
         return v.length + ':\'' + MO.Lang.String.toLine(v) + '\'';
      case 'Function':
         if(v.__virtual){
            return 'virtual';
         }
         return MO.Method.name(v, true);
      case 'Array':
         return '@<Array@' + MO.Class.code(v) + '> length=' + v.length;
      case 'Html':
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == MO.TClass){
            return '@<' + v.name + '@' + MO.Class.code(v) + '>';
         }
         if(v.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@<Object@' + MO.Class.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + MO.Class.code(v) + '>';
   }
}
MO.RDump.prototype.dumpInner = function RDump_dumpInner(di){
   var hTable  = di.hTable;
   var hParent = di.hParent;
   var hInsRow = di.hRow;
   var level   = di.level;
   var obj     = di.link;
   var type    = MO.Class.typeOf(obj, true);
   var vcls    = obj.__class;
   var names = new Array();
   for(var name in obj){
      names[names.length] = name;
   }
   if(MO.Lang.String.endsWith(type, 'Array')){
      MO.Lang.Array.reverse(names, 0, names.length - 1);
   }else{
      MO.Lang.Array.sort(names, true);
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
      var stype = MO.Class.safeTypeOf(value, true);
      var type = MO.Class.safeTypeOf(value, true);
      var info = null;
      var infoFormat = true;
      if(vcls){
         var ann = vcls.attributeFind(name);
         if(ann){
            type = 'Annotation<' + MO.Method.name(ann.constructor) + '>'
            if(value && value.constructor == Function){
               info = "<FONT color='green'>" + MO.Method.name(value) + "</FONT>";
            }else{
               info = value + "<FONT color='green'> - (" + MO.RHtml.toHtml(ann.toString()) + ")</FONT>";
            }
            infoFormat = false;
         }
      }
      if(info == null){
         info = this.typeInfo(value, type);
      }
      var rdi = null;
      var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
      var hRow = MO.RBuilder.appendTableRow(hTable, null, index);
      hRow.bgColor = '#FFFFFF';
      if(MO.Lang.String.startsWith(info, '@')){
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
      var hCell = MO.RBuilder.appendTableCell(hRow);
      var icon = MO.Lang.String.startsWith(info, '@') ? ' +' : '  ';
      var label = MO.Lang.String.repeat('   ', level) + icon + ' ' + name
      hCell.innerHTML = MO.RHtml.toHtml(label);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      hCell.width = '240px'
      if(rdi){
         rdi.hText = hCell;
      }
      var hCell = MO.RBuilder.appendTableCell(hRow);
      hCell.innerHTML = MO.RHtml.toHtml(type);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      if(type == 'Function'){
         hCell.style.color = '#3333FF';
      }else{
         hCell.style.color = '#FF3333';
      }
      hCell.width = '200px'
      var hCell = MO.RBuilder.appendTableCell(hRow);
      if(MO.Lang.String.startsWith(info, '@')){
         info = info.substr(1);
      }
      if(infoFormat){
         hCell.innerHTML = MO.RHtml.toHtml(info);
      }else{
         hCell.innerHTML = info;
      }
      hCell.style.borderBottom = '1px solid #F0F0F0';
   }
   hTable.width = '100%'
}
MO.RDump.prototype.dump = function RDump_dump(value, hPanel){
   if(!hPanel){
      hPanel = MO.RBuilder.append(null, 'DIV')
   }
   var s = new MO.TString();
   s.append('<', MO.Class.safeTypeOf(value));
   if(value && value.tagName){
      s.append(' - ', value.tagName);
   }
   s.appendLine('@' + MO.Class.code(value) + '>');
   var hPanel = MO.RBuilder.append(hPanel, 'DIV');
   hPanel.style.border = '1px solid #BBBBBB';
   hPanel.style.backgroundColor = '#E0E0EB';
   var hTitleTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   var hRow = MO.RBuilder.appendTableRow(hTitleTable);
   var hCell = MO.RBuilder.appendTableCell(hRow);
   hTitleTable.width = '100%'
   hCell.style.padding = 2;
   hCell.style.borderBottom = '1px solid gray';
   hCell.style.backgroundColor = '#E0E0EB';
   MO.RHtml.textSet(hCell, s.toString());
   var hTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   hTable.style.width = '100%';
   var di = new MO.TDumpItem();
   di.hTable = hTable;
   di.hRow = null;
   di.hParent = hPanel;
   di.link = value;
   di.level = 0;
   this.dumpInner(di);
}
MO.RDump.prototype.appendLevel = function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}
MO.RDump.prototype.stack = function RDump_stack(){
   var o = RDump_stack.caller;
   var s = new MO.TString();
   while(o){
      s.append(MO.Method.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
   MO.Logger.debug(this, s);
}
MO.RDump = new MO.RDump();
MO.RHtml = function RHtml(){
   var o = this;
   o._nextUid        = 1;
   o._links          = new Object();
   o._clientPosition = null;
   return o;
}
MO.RHtml.prototype.uid = function RHtml_uid(value){
   var uuid = value.__puuid;
   if(uuid == null){
      uuid = value.__puuid = this._nextUid++;
   }
   return uuid;
}
MO.RHtml.prototype.displayGet = function RHtml_displayGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'inline');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.displaySet = function RHtml_displaySet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? 'inline' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'block');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? '' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.textGet = function RHtml_textGet(hTag, defaultText){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      text = hTag.textContent;
   }else{
      text = hTag.innerText;
   }
   return text;
}
MO.RHtml.prototype.textSet = function RHtml_textSet(hTag, text){
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      hTag.textContent = text;
   }else{
      hTag.innerText = text;
   }
}
MO.RHtml.prototype.checkGet = function RHtml_checkGet(hTag){
   return MO.Lang.Bool.toString(hTag.checked);
}
MO.RHtml.prototype.checkSet = function RHtml_checkSet(hTag, value){
   hTag.checked = MO.Lang.Bool.isTrue(value);
}
MO.RHtml.prototype.radioGet = function RHtml_radioGet(hs){
   if(hs){
      var count = hs.length;
      for(var n = 0; n < count; n++){
         var hItem = hs[n];
         if(hItem.checked){
            return hItem.value;
         }
      }
   }
   return null;
}
MO.RHtml.prototype.radioSet = function RHtml_radioSet(hTag, value){
   if(hTag){
      var count = hTag.length;
      for(var n = 0; n < count; n++){
         var hItem = hTag[n];
         if(hItem.value == value){
            hItem.checked = true;
            break;
         }
      }
   }
}
MO.RHtml.prototype.cursorSet = function RHtml_cursorSet(hTag, value){
   if(hTag){
      hTag.style.cursor = value;
   }
}
MO.RHtml.prototype.linkGet = function RHtml_linkGet(hTag, name){
   var o = this;
   var uid = o.uid(hTag);
   var item = o._links[uid];
   return item ? item.get(name) : null;
}
MO.RHtml.prototype.linkSet = function RHtml_linkSet(hTag, n, v){
   var o = this;
   var links = o._links;
   var uid = o.uid(hTag);
   var item = links[uid];
   if(!item){
      item = links[uid] = new MO.THtmlItem();
      item._link = hTag;
   }
   item.set(n, v);
}
MO.RHtml.prototype.clientPosition = function RHtml_clientPosition(hTag, hTop){
   var o = this;
   var position = o._clientPosition;
   if(!position){
      position = o._clientPosition = new MO.SPoint2();
   }
   position.set(0, 0);
   while(hTag != hTop){
      position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
      position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
      hTag = hTag.offsetParent;
   }
   return position;
}
MO.RHtml.prototype.clientX = function RHtml_clientX(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetLeft - p.scrollLeft;
      p = p.offsetParent;
   }
   return r;
}
MO.RHtml.prototype.clientY = function RHtml_clientY(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetTop - p.scrollTop;
      p = p.offsetParent;
   }
   return r;
}
MO.RHtml.prototype.setSize = function RHtml_setSize(h, s){
   if(s.width){
      h.style.width = s.width + 'px';
   }
   if(s.height){
      h.style.height = s.height + 'px';
   }
}
MO.RHtml.prototype.toText = function RHtml_toText(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/&lt;/, '<');
      p = p.replace(/&gt;/g, '>');
      p = p.replace(/&nbsp;/g, ' ');
      p = p.replace(/<BR>/g, '\n');
   }
   return p;
}
MO.RHtml.prototype.toHtml = function RHtml_toHtml(p){
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
MO.RHtml.prototype.eventSource = function RHtml_eventSource(p){
   return p.srcElement ? p.srcElement : p.target;
}
MO.RHtml.prototype.get = function RHtml_get(name){
   return document.getElementById(name);
}
MO.RHtml.prototype.parent = function RHtml_parent(tag, typeName){
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
MO.RHtml.prototype.searchLinker = function RHtml_searchLinker(hTag, clazz){
   while(hTag){
      var linker = hTag.__linker;
      if(linker){
         if(MO.Class.isClass(linker, clazz)){
            return linker;
         }
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.searchObject = function RHtml_searchObject(hTag, name){
   while(hTag){
      var flag = hTag[name];
      if(flag){
         return flag;
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      throw new MO.TError('Html table is invalid.');
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
MO.RHtml.prototype.clear = function RHtml_clear(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            hTag.removeChild(hChild);
         }
      }
   }
}
MO.RHtml.prototype.clearAll = function RHtml_clearAll(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            if(hChild.children){
               o.clear(hChild);
            }
            hTag.removeChild(hChild);
         }
      }
   }
}
MO.RHtml.prototype.free = function RHtml_free(p){
   return null;
}
MO.RHtml = new MO.RHtml();
MO.Window.Html = MO.RHtml;
MO.RKeyboard = function RKeyboard(){
   var o = this;
   o._status = new Array();
   return o;
}
MO.RKeyboard.prototype.onKeyDown = function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.onKeyUp = function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Normal;
}
MO.RKeyboard.prototype.construct = function RKeyboard_construct(){
   var o = this;
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = MO.EKeyStatus.Normal;
   }
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   MO.RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}
MO.RKeyboard.prototype.isControlKey = function RKeyboard_isControlKey(p){
   var s = MO.EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}
MO.RKeyboard.prototype.isIntegerKey = function RKeyboard_isIntegerKey(c){
   return MO.EKeyCode.integerCodes[c];
}
MO.RKeyboard.prototype.isFloatKey = function RKeyboard_isFloatKey(c){
   return MO.EKeyCode.floatCodes[c];
}
MO.RKeyboard.prototype.isNumKey = function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}
MO.RKeyboard.prototype.isPress = function RKeyboard_isPress(p){
   var o = this;
   var v = o._status[p];
   return v == MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.fixCase = function RKeyboard_fixCase(e, c){
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
MO.RKeyboard.prototype.fixPattern = function RKeyboard_fixPattern(e, p){
   if(p){
      var k = e.keyCode;
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.isPattern(String.fromCharCode(k), p)){
            e.keyCode = 0;
            return false;
         }
      }
   }
   return true;
}
MO.RKeyboard.prototype.fixChars = function RKeyboard_fixChars(e, p){
   if(p){
      var k = e.keyCode;
      if(this.isNumKey(k)){
    	  k = e.keyCode = e.keyCode - 48;
      }
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.inChars(String.fromCharCode(k), p)){
            e.keyCode = 0;
            e.returnValue = false;
            return false;
         }
      }
   }
   return true;
}
MO.Window.Keyboard = new MO.RKeyboard();
MO.RResource = function RResource(){
   var o = this;
   o.uriIcon  = '/ars/icon/';
   o.uriImage = '/ars/img/';
   return o;
}
MO.RResource.prototype.iconPath = function RResource_iconPath(code, type){
   var o = this;
   var path = null;
   if(code.indexOf('|') != -1){
      var items = code.split('|');
      path = items[0];
      type = items[1];
   }else{
      path = code;
   }
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.Window.Browser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.iconUrlPath = function RResource_iconUrlPath(path, type){
   var o = this;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.RBrowser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.imagePath = function RResource_imagePath(path, type){
   var o = this;
}
MO.RResource = new MO.RResource();
MO.Window.Resource = MO.RResource;
MO.RValue = function RValue(){
   var o = this;
   o.float1    = null;
   o.float2    = null;
   o.float3    = null;
   o.float4    = null;
   o.float9    = null;
   o.float12   = null;
   o.float16   = null;
   o.double1   = null;
   o.double2   = null;
   o.double3   = null;
   o.double4   = null;
   o.double16  = null;
   o.double16  = null;
   o.double64  = null;
   o.construct();
   return o;
}
MO.RValue.prototype.construct = function RValue_construct(){
   var o = this;
   if(MO.RBrowser.supportHtml5()){
      o.float1 = new Float32Array(1);
      o.float2 = new Float32Array(2);
      o.float3 = new Float32Array(3);
      o.float4 = new Float32Array(4);
      o.float9 = new Float32Array(9);
      o.float12 = new Float32Array(12);
      o.float16 = new Float32Array(16);
      o.double1 = new Float64Array(1);
      o.double2 = new Float64Array(2);
      o.double3 = new Float64Array(3);
      o.double4 = new Float64Array(4);
      o.double9 = new Float64Array(9);
      o.double12 = new Float64Array(12);
      o.double16 = new Float64Array(16);
   }
}
MO.RValue = new MO.RValue();
RJsLoader = new function RJsLoader(){
   var o = this;
   o._callback = null;
   o.onFinish  = RJsLoader_onFinish;
   o.onLoad    = RJsLoader_onLoad;
   o.loadUrl   = RJsLoader_loadUrl;
   return o;
}
function RJsLoader_onFinish(buffer){
   var source = MO.Lang.String.decodeUtf(buffer);
   eval(source);
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
MO.EGraphicError = new function EGraphicError(){
   var o = this;
   o.Unsupport2d    = 'unsupport.2d';
   o.UnsupportWebGL = 'unsupport.webgL';
   return o;
}
MO.MCanvasObject = function MCanvasObject(o){
   o = MO.Class.inherits(this, o);
   o.htmlCanvas = MO.Method.virtual(o, 'htmlCanvas');
   return o;
}
MO.MGraphicObject = function MGraphicObject(o){
   o = MO.Class.inherits(this, o);
   o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   o.linkGraphicContext = MO.MGraphicObject_linkGraphicContext;
   o.dispose            = MO.MGraphicObject_dispose;
   return o;
}
MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(MO.Class.isClass(context, MO.FGraphicContext)){
      o._graphicContext = context;
   }else if(MO.Class.isClass(context, MO.MGraphicObject)){
      o._graphicContext = context.graphicContext();
   }else{
      throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
   }
   MO.Assert.debugNotNull(o._graphicContext);
}
MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
MO.MGraphicRenderable = function MGraphicRenderable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.process = MO.Method.empty;
   return o;
}
MO.Graphic = new function MoGraphicSpace(){
   return this;
}
MO.FFloatStream = function FFloatStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._length     = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory     = MO.Class.register(o, new MO.AGetter('_memory'), null);
   o._position   = 0;
   o.construct   = MO.FFloatStream_construct;
   o.setLength   = MO.FFloatStream_setLength;
   o.writeFloat4 = MO.FFloatStream_writeFloat4;
   o.writeColor4 = MO.FFloatStream_writeColor4;
   o.reset       = MO.FFloatStream_reset;
   o.clear       = MO.FFloatStream_clear;
   o.dispose     = MO.FFloatStream_dispose;
   return o;
}
MO.FFloatStream_construct = function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FFloatStream_setLength = function FFloatStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new Float32Array(length);
}
MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(value1, value2, value3, value4){
   var o = this;
   o._memory[o._position++] = value1;
   o._memory[o._position++] = value2;
   o._memory[o._position++] = value3;
   o._memory[o._position++] = value4;
}
MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(value){
   this.writeFloat4(value.red, value.green, value.blue, value.alpha);
}
MO.FFloatStream_reset = function FFloatStream_reset(){
   this._position = 0;
}
MO.FFloatStream_clear = function FFloatStream_clear(){
   this._position = 0;
}
MO.FFloatStream_dispose = function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas   = MO.Class.register(o, new MO.AGetter('_hCanvas', 'htmlCanvas'));
   o.construct  = MO.FGraphicContext_construct;
   o.linkCanvas = MO.Method.virtual(o, 'linkCanvas');
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}
MO.FGraphicContext_construct = function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
}
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
MO.SBorder = function SBorder(){
   var o = this;
   o.valid    = false;
   o.left     = new MO.SBorderLine();
   o.top      = new MO.SBorderLine();
   o.right    = new MO.SBorderLine();
   o.bottom   = new MO.SBorderLine();
   o.parse    = MO.SBorder_parse;
   o.toString = MO.SBorder_toString;
   o.dispose  = MO.SBorder_dispose;
   return o;
}
MO.SBorder_parse = function SBorder_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 4){
      o.left.parse(items[0]);
      o.top.parse(items[1]);
      o.right.parse(items[2]);
      o.bottom.parse(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorder_toString = function SBorder_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SBorder_dispose = function SBorder_dispose(){
   var o = this;
   o.left = MO.RObject.dispose(o.left)
   o.top = MO.RObject.dispose(o.top)
   o.right = MO.RObject.dispose(o.right)
   o.bottom = MO.RObject.dispose(o.bottom)
}
MO.SBorderLine = function SBorderLine(width, style, color){
   var o = this;
   o.width    = MO.Runtime.nvl(width, 1);
   o.style    = MO.Runtime.nvl(style, 'solid');
   o.color    = MO.Runtime.nvl(color, '#FFFFFF');
   o.parse    = MO.SBorderLine_parse;
   o.toString = MO.SBorderLine_toString;
   o.dispose  = MO.SBorderLine_dispose;
   return o;
}
MO.SBorderLine_parse = function SBorderLine_parse(source){
   var o = this;
   var items = source.split(' ')
   if(items.length == 3){
      o.width = parseInt(items[0]);
      o.style = items[1];
      o.color = items[2];
   }else{
      throw new TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorderLine_toString = function SBorderLine_toString(){
   var o = this;
   return o.width + ' ' + o.style + ' ' + o.color;
}
MO.SBorderLine_dispose = function SBorderLine_dispose(){
   var o = this;
   o.width = null;
   o.style = null;
   o.color = null;
}
MO.FG2dObject = function FG2dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG2dObject_setup;
   o.dispose = MO.FG2dObject_dispose;
   return o;
}
MO.FG2dObject_setup = function FG2dObject_setup(){
}
MO.FG2dObject_dispose = function FG2dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FG2dContext = function FG2dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   o.construct    = MO.FG2dContext_construct;
   o.linkCanvas   = MO.FG2dContext_linkCanvas;
   o.dispose      = MO.FG2dContext_dispose;
   return o;
}
MO.FG2dContext_construct = function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._globalScale = new MO.SSize2(1, 1);
   o._scale = new MO.SSize2(1, 1);
}
MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(hCanvas){
   var o = this;
   o._size.set(hCanvas.width, hCanvas.height);
}
MO.FG2dContext_dispose = function FG2dContext_dispose(){
   var o = this;
   o._globalScale = MO.Lang.Object.dispose(o._globalScale);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dContext);
   o._handle              = null;
   o._gridSourceX         = null;
   o._gridSourceY         = null;
   o._gridSourceWidth     = null;
   o._gridSourceHeight    = null;
   o._gridDrawX           = null;
   o._gridDrawY           = null;
   o._gridDrawWidth       = null;
   o._gridDrawHeight      = null;
   o.construct            = MO.FG2dCanvasContext_construct;
   o.linkCanvas           = MO.FG2dCanvasContext_linkCanvas;
   o.setGlobalScale       = MO.FG2dCanvasContext_setGlobalScale;
   o.setScale             = MO.FG2dCanvasContext_setScale;
   o.setAlpha             = MO.FG2dCanvasContext_setAlpha;
   o.setFont              = MO.FG2dCanvasContext_setFont;
   o.store                = MO.FG2dCanvasContext_store;
   o.restore              = MO.FG2dCanvasContext_restore;
   o.prepare              = MO.FG2dCanvasContext_prepare;
   o.clear                = MO.FG2dCanvasContext_clear;
   o.clearRectangle       = MO.FG2dCanvasContext_clearRectangle;
   o.clip                 = MO.FG2dCanvasContext_clip;
   o.textWidth            = MO.FG2dCanvasContext_textWidth;
   o.createLinearGradient = MO.FG2dCanvasContext_createLinearGradient;
   o.drawLine             = MO.FG2dCanvasContext_drawLine;
   o.drawRectangle        = MO.FG2dCanvasContext_drawRectangle;
   o.drawTriangle         = MO.FG2dCanvasContext_drawTriangle;
   o.drawCircle           = MO.FG2dCanvasContext_drawCircle;
   o.drawText             = MO.FG2dCanvasContext_drawText;
   o.drawImage            = MO.FG2dCanvasContext_drawImage;
   o.drawGridImage        = MO.FG2dCanvasContext_drawGridImage;
   o.drawQuadrilateral    = MO.FG2dCanvasContext_drawQuadrilateral;
   o.drawBorderLine       = MO.FG2dCanvasContext_drawBorderLine;
   o.drawBorder           = MO.FG2dCanvasContext_drawBorder;
   o.fillRectangle        = MO.FG2dCanvasContext_fillRectangle;
   o.toBytes              = MO.FG2dCanvasContext_toBytes;
   return o;
}
MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
   var o = this;
   o.__base.FG2dContext.construct.call(o);
   o._gridSourceX = new Array(3);
   o._gridSourceY = new Array(3);
   o._gridSourceWidth = new Array(3);
   o._gridSourceHeight = new Array(3);
   o._gridDrawX = new Array(3);
   o._gridDrawY = new Array(3);
   o._gridDrawWidth = new Array(3);
   o._gridDrawHeight = new Array(3);
}
MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   if (hCanvas.getContext) {
      var handle = hCanvas.getContext('2d');
      if (!handle) {
         throw new MO.TError(o, "Current browser can't support Context2D technique.");
      }
      o._handle = handle;
   }
   o._hCanvas = hCanvas;
}
MO.FG2dCanvasContext_setGlobalScale = function FG2dCanvasContext_setGlobalScale(width, height){
   var o = this;
   o._globalScale.set(width, height);
   o._handle.scale(width, height);
}
MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
   var o = this;
   if(!o._scale.equalsData(width, height)){
      o._handle.scale(width, height);
      o._scale.set(width, height);
   }
}
MO.FG2dCanvasContext_setAlpha = function FG2dCanvasContext_setAlpha(alpha){
   var o = this;
   this._handle.globalAlpha = alpha;
}
MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
   this._handle.font = font;
}
MO.FG2dCanvasContext_store = function FG2dCanvasContext_store(){
   this._handle.save();
}
MO.FG2dCanvasContext_restore = function FG2dCanvasContext_restore(){
   this._handle.restore();
}
MO.FG2dCanvasContext_prepare = function FG2dCanvasContext_prepare(){
   var o = this;
   var scale = o._globalScale;
   o._handle.setTransform(scale.width, 0, 0, scale.height, 0, 0);
}
MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
   var o = this;
   var size = o._size;
   var handle = o._handle;
   var hCanvas = handle.canvas;
   handle.save();
   handle.setTransform(1, 0, 0, 1, 0, 0);
   o._handle.clearRect(0, 0, size.width, size.height);
   handle.restore();
}
MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
   this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_clip = function FG2dCanvasContext_clip(left, top, width, height){
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.rect(left, top, width, height);
   handle.clip();
}
MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
   var info = this._handle.measureText(text);
   return info.width;
}
MO.FG2dCanvasContext_createLinearGradient = function FG2dCanvasContext_createLinearGradient(x1, y1, x2, y2) {
   var o = this;
   var handle = o._handle;
   return handle.createLinearGradient(x1, y1, x2, y2);
}
MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.beginPath();
   handle.moveTo(x1, y1);
   handle.lineTo(x2, y2);
   handle.closePath();
   handle.stroke();
}
MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.strokeRect(x, y, width, height);
}
MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.fillText(text, x, y);
}
MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
   var o = this;
   var handle = o._handle;
   var size = o._size;
   var data = null
   if(content.tagName == 'IMG'){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      if(!content.testReady()){
         return;
      }
      data = content.image();
      if(width == null){
         width = data.size().width;
      }
      if(height == null){
         height = data.size().height;
      }
   }else{
      throw new MO.TError(o, 'Unknown content type');
   }
   handle.drawImage(data, x, y, width, height);
}
MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
   var o = this;
   var handle = o._handle;
   var data = null
   if (MO.Class.isClass(content, MO.FImage)) {
      if(!content.testReady()){
         return;
      }
      data = content.image();
   } else {
      throw new TError(o, 'Unknown content type');
   }
   var ssize = content.size();
   var sx = o._gridSourceX;
   sx[0] = 0;
   sx[1] = padding.left;
   sx[2] = ssize.width - padding.right;
   var sy = o._gridSourceY;
   sy[0] = 0;
   sy[1] = padding.top;
   sy[2] = ssize.height - padding.bottom;
   var dx = o._gridDrawX;
   dx[0] = x;
   dx[1] = x + padding.left;
   dx[2] = x + width - padding.right;
   var dy = o._gridDrawY;
   dy[0] = y;
   dy[1] = y + padding.top;
   dy[2] = y + height - padding.bottom;
   var sw = o._gridSourceWidth;
   sw[0] = padding.left;
   sw[1] = ssize.width - padding.left - padding.right;
   sw[2] = padding.right;
   var sh = o._gridSourceHeight;
   sh[0] = padding.top;
   sh[1] = ssize.height - padding.top - padding.bottom;
   sh[2] = padding.bottom;
   var dw = o._gridDrawWidth;
   dw[0] = padding.left;
   dw[1] = width - padding.left - padding.right;
   dw[2] = padding.right;
   var dh = o._gridDrawHeight;
   dh[0] = padding.top;
   dh[1] = height - padding.top - padding.bottom;
   dh[2] = padding.bottom;
   for (var i = 0; i < 9; i++) {
      var row = parseInt(i / 3);
      var column = i % 3;
      if (dh[row] > 0 && dw[column] > 0) {
         handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
      }
   }
}
MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
   return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine){
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = borderLine.color;
   handle.lineWidth = borderLine.width;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.closePath();
   handle.stroke();
}
MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var right = rectangle.left + rectangle.width - 1;
   var bottom = rectangle.top + rectangle.height - 1;
   o.drawBorderLine(left, bottom, left, top, border.left);
   o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
   o.drawBorderLine(right, top, right, bottom, border.right);
   o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
}
MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.beginPath();
   handle.fillRect(x, y, width, height);
   handle.closePath();
}
MO.FG2dCanvasContext_drawQuadrilateral = function FG2dCanvasContext_drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.lineTo(x4 + 0.5, y4 + 0.5);
   handle.lineTo(x1 + 0.5, y1 + 0.5);
   handle.closePath();
   if(lineWidth != null && strokeColor != null){
      handle.stroke();
   }
   if (fillColor != null) {
      handle.fill();
   }
}
MO.FG2dCanvasContext_drawTriangle = function FG2dCanvasContext_drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.closePath();
   handle.fill();
   handle.stroke();
}
MO.FG2dCanvasContext_drawCircle = function FG2dCanvasContext_drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.arc(x, y, radius, 0, 2 * Math.PI, false);
   handle.closePath();
   handle.fill();
   handle.stroke();
}
MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
   var o = this;
   var size = o._size;
   return o._handle.getImageData(0, 0, size.width, size.height);
}
MO.EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
MO.EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
MO.EG3dTechniqueMode = new function EG3dTechniqueMode(){
   var o = this;
   o.Color         = 'color';
   o.Ambient       = 'ambient';
   o.DiffuseLevel  = 'diffuse.level';
   o.DiffuseColor  = 'diffuse.color';
   o.SpecularLevel = 'specular.level';
   o.SpecularColor = 'specular.color';
   o.Reflect       = 'reflect';
   o.Emissive      = 'emissive';
   o.Result        = 'result';
   return o;
}
MO.MG3dRegion = function MG3dRegion(o){
   o = MO.Class.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = MO.Class.register(o, new MO.AGetter('_spaceName'));
   o._technique                  = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._techniquePass              = MO.Class.register(o, new MO.AGetter('_techniquePass'));
   o._camera                     = MO.Class.register(o, new MO.AGetter('_camera'));
   o._projection                 = null;
   o._directionalLight           = MO.Class.register(o, new MO.AGetter('_directionalLight'));
   o._lights                     = MO.Class.register(o, new MO.AGetter('_lights'));
   o._allRenderables             = MO.Class.register(o, new MO.AGetter('_allRenderables'));
   o._renderables                = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._ratioMatrix                = null;
   o._cameraPosition             = null;
   o._cameraDirection            = null;
   o._cameraViewMatrix           = null;
   o._cameraProjectionMatrix     = null;
   o._cameraViewProjectionMatrix = null;
   o._lightPosition              = null;
   o._lightDirection             = null;
   o._lightViewMatrix            = null;
   o._lightProjectionMatrix      = null;
   o._lightViewProjectionMatrix  = null;
   o._lightInfo                  = null;
   o.construct                   = MO.MG3dRegion_construct;
   o.isChanged                   = MO.MG3dRegion_isChanged;
   o.setTechniquePass            = MO.MG3dRegion_setTechniquePass;
   o.pushRenderable              = MO.MG3dRegion_pushRenderable;
   o.setup                       = MO.MG3dRegion_setup;
   o.change                      = MO.MG3dRegion_change;
   o.prepare                     = MO.MG3dRegion_prepare;
   o.reset                       = MO.MG3dRegion_reset;
   o.calculate                   = MO.MG3dRegion_calculate;
   o.update                      = MO.MG3dRegion_update;
   o.dispose                     = MO.MG3dRegion_dispose;
   return o;
}
MO.MG3dRegion_construct = function MG3dRegion_construct(){
   var o = this;
   o._lights = new MO.TObjects();
   o._renderables = new MO.TObjects();
   o._allRenderables = new MO.TObjects();
   o._ratioMatrix = new MO.SMatrix3d();
   o._cameraPosition = new MO.SPoint3();
   o._cameraDirection = new MO.SVector3();
   o._cameraViewMatrix = new MO.SMatrix3d();
   o._cameraProjectionMatrix = new MO.SMatrix3d();
   o._cameraViewProjectionMatrix = new MO.SMatrix3d();
   o._lightPosition = new MO.SPoint3();
   o._lightDirection = new MO.SVector3();
   o._lightViewMatrix = new MO.SMatrix3d();
   o._lightProjectionMatrix = new MO.SMatrix3d();
   o._lightViewProjectionMatrix = new MO.SMatrix3d();
   o._lightInfo = new MO.SVector4();
}
MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
   return this._changed;
}
MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
MO.MG3dRegion_setup = function MG3dRegion_setup(){
   var o = this;
}
MO.MG3dRegion_change = function MG3dRegion_change(){
   this._changed = true;
}
MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
   var o = this;
   o._changed = false;
   var camera = o._camera;
   var projection = camera.projection();
   camera.updateFrustum();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   var ratioMatrix = o._ratioMatrix.identity();
   o._cameraPosition.assign(camera.position());
   o._cameraDirection.assign(camera.direction());
   o._cameraViewMatrix.assign(camera.matrix());
   o._cameraProjectionMatrix.assign(projection.matrix());
   o._cameraViewProjectionMatrix.assign(camera.matrix());
   o._cameraViewProjectionMatrix.append(projection.matrix());
   var light = o._directionalLight;
   var lc = light.camera();
   var lcp = lc.position();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._allRenderables.clear();
}
MO.MG3dRegion_reset = function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
MO.MG3dRegion_calculate = function MG3dRegion_calculate(parameterCd){
   var o = this;
   switch(parameterCd){
      case MO.EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case MO.EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case MO.EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case MO.EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case MO.EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case MO.EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case MO.EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case MO.EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case MO.EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new MO.TError(o, 'Unknown parameter type. (type_cd={1})', parameterCd);
}
MO.MG3dRegion_update = function MG3dRegion_update(){
   var o = this;
   var renderables = o._renderables;
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      renderable.update(o);
   }
}
MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
   var o = this;
   o._ratioMatrix = MO.Lang.Object.free(o._ratioMatrix);
   o._renderables = MO.Lang.Object.free(o._renderables);
   o._allRenderables = MO.Lang.Object.free(o._allRenderables);
}
MO.MG3dRenderable = function MG3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix        = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material      = MO.Class.register(o, new MO.AGetSet('_material'));
   o._activeInfo    = MO.Class.register(o, new MO.AGetter('_activeInfo'));
   o._infos         = null;
   o.construct      = MO.MG3dRenderable_construct;
   o.activeEffect   = MO.MG3dRenderable_activeEffect;
   o.effectFind     = MO.MG3dRenderable_effectFind;
   o.effectSet      = MO.MG3dRenderable_effectSet;
   o.infos          = MO.MG3dRenderable_infos;
   o.selectInfo     = MO.MG3dRenderable_selectInfo;
   o.resetInfos     = MO.MG3dRenderable_resetInfos;
   o.testVisible    = MO.Method.emptyTrue;
   o.update         = MO.Method.empty;
   o.dispose        = MO.MG3dRenderable_dispose;
   return o;
}
MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
}
MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
   var info = this._activeInfo;
   return info ? info.effect : null;
}
MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
   var o = this;
   var infos = o._infos;
   if(infos){
      var info = infos.get(code);
      if(info){
         return info.effect;
      }
   }
   return null;
}
MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}
MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new MO.TDictionary();
   }
   return infos;
}
MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   o._activeInfo = info;
   return info;
}
MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var info = infos.at(i);
         info.reset();
      }
   }
}
MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
   var o = this;
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._material = MO.Lang.Object.dispose(o._material);
   o._activeInfo = null;
   o._infos = MO.Lang.Object.dispose(o._infos);
}
MO.SG3dEffectInfo = function SG3dEffectInfo(){
   var o = this;
   o.code                  = null;
   o.techniqueCode         = null;
   o.techniqueModeCode     = null;
   o.optionMerge           = null;
   o.mergeCount            = null;
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.optionNormalInvert    = null;
   o.optionNormalCompress  = null;
   o.supportInstance       = null;
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   o.attributes            = new MO.TArray();
   o.samplers              = new MO.TArray();
   o.attributeContains     = MO.SG3dEffectInfo_attributeContains;
   o.samplerContains       = MO.SG3dEffectInfo_samplerContains;
   o.reset                 = MO.SG3dEffectInfo_reset;
   o.reset();
   return o;
}
MO.SG3dEffectInfo_attributeContains = function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
MO.SG3dEffectInfo_samplerContains = function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
MO.SG3dEffectInfo_reset = function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.optionMerge = false;
   o.mergeCount = 0;
   o.fillModeCd = MO.EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = MO.EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = MO.EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = MO.EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.optionNormalInvert = false;
   o.optionNormalCompress = true;
   o.supportInstance = false;
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   o.attributes.clear();
   o.samplers.clear();
}
MO.SG3dMaterialInfo = function SG3dMaterialInfo(){
   var o = this;
   o.effectCode           = 'automatic';
   o.optionDepth          = null;
   o.optionDouble         = null;
   o.optionNormalInvert   = null;
   o.optionShadow         = null;
   o.optionShadowSelf     = null;
   o.optionAlpha          = null;
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   o.optionColor          = null;
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorBalance         = 0.5;
   o.colorRate            = 1.0;
   o.optionVertex         = null;
   o.vertexColor          = new MO.SColor4();
   o.optionAmbient        = null;
   o.ambientColor         = new MO.SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new MO.SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new MO.SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new MO.SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new MO.SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new MO.SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new MO.SColor4();
   o.refractBackColor     = new MO.SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new MO.SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new MO.SColor4();
   o.assign               = MO.SG3dMaterialInfo_assign;
   o.calculate            = MO.SG3dMaterialInfo_calculate;
   o.reset                = MO.SG3dMaterialInfo_reset;
   o.reset();
   return o;
}
MO.SG3dMaterialInfo_assign = function SG3dMaterialInfo_assign(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assign(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assign(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assign(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assign(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assign(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assign(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assign(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assign(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assign(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assign(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assign(info.emissiveColor);
}
MO.SG3dMaterialInfo_calculate = function SG3dMaterialInfo_calculate(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assignPower(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assignPower(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assignPower(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assignPower(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assignPower(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assignPower(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assignPower(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assignPower(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assignPower(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assignPower(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assignPower(info.emissiveColor);
}
MO.SG3dMaterialInfo_reset = function SG3dMaterialInfo_reset(){
   var o = this;
   o.optionDepth = true;
   o.optionDouble = false;
   o.optionNormalInvert = false;
   o.optionShadow = true;
   o.optionShadowSelf = true;
   o.optionAlpha = false;
   o.alphaBase = 0.2;
   o.alphaRate = 1;
   o.alphaLevel = 1;
   o.alphaMerge = 1;
   o.optionColor = true;
   o.colorMin = 0;
   o.colorMax = 1;
   o.colorBalance = 0.5;
   o.colorRate = 1;
   o.optionVertex = true;
   o.vertexColor.set(1, 1, 1, 1);
   o.optionAmbient = true;
   o.ambientColor.set(0.5, 0.5, 0.5, 1);
   o.ambientShadow = 1;
   o.optionDiffuse = true;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1);
   o.diffuseShadow = 1;
   o.optionDiffuseView = true;
   o.diffuseViewColor.set(1, 1, 1, 1);
   o.diffuseViewShadow = 1;
   o.optionSpecular = true;
   o.specularColor.set(0.5, 0.5, 0.5, 1);
   o.specularBase = 0;
   o.specularLevel = 16;
   o.specularAverage = 1;
   o.specularShadow = 1;
   o.optionSpecularView = true;
   o.specularViewColor.set(1, 1, 1, 1);
   o.specularViewBase = 0;
   o.specularViewRate = 16;
   o.specularViewAverage = 1;
   o.specularViewShadow = 1;
   o.optionReflect = true;
   o.reflectColor.set(1, 1, 1, 1);
   o.reflectMerge = 1;
   o.reflectShadow = 1;
   o.optionRefract = true;
   o.refractFrontColor.set(1, 1, 1, 1);
   o.refractFrontMerge = 1;
   o.refractFrontShadow = 1;
   o.refractBackColor.set(1, 1, 1, 1);
   o.refractBackMerge = 1;
   o.refractBackShadow = 1;
   o.optionOpacity = true;
   o.opacityColor.set(1, 1, 1, 1);
   o.opacityRate = 1;
   o.opacityAlpha = 1;
   o.opacityDepth = 1;
   o.opacityTransmittance = 1;
   o.optionEmissive = true;
   o.emissiveColor.set(1, 1, 1, 1);
}
MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = MO.SG3dRenderableInfo_reset;
   return o;
}
MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = MO.Lang.Object.dispose(o.layout);
}
MO.FG3dAnimation = function FG3dAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = MO.FG3dAnimation_construct;
   o.findBone     = MO.FG3dAnimation_findBone;
   o.process      = MO.FG3dAnimation_process;
   o.dispose      = MO.FG3dAnimation_dispose;
   return o;
}
MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new MO.TObjects();
}
MO.FG3dAnimation_findBone = function FG3dAnimation_findBone(p){
   var o = this;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      if(b.boneId() == p){
         return b;
      }
   }
   return null;
}
MO.FG3dAnimation_process = function FG3dAnimation_process(){
   var o = this;
   var t = MO.Timer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      b.update(o._currentTick);
   }
   return true;
}
MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = null;
   o._info       = MO.Class.register(o, new MO.AGetter('_info'));
   o.construct   = MO.FG3dBaseMaterial_construct;
   o.assignInfo  = MO.FG3dBaseMaterial_assignInfo;
   o.assign      = MO.FG3dBaseMaterial_assign;
   o.calculate   = MO.FG3dBaseMaterial_calculate;
   return o;
}
MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new MO.SG3dMaterialInfo();
}
MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
   this._info.assign(info);
}
MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
   this._info.assign(material.info());
}
MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
   this._info.calculate(material.info());
}
MO.FG3dBone = function FG3dBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = MO.FG3dBone_update;
   return o;
}
MO.FG3dBone_update = function FG3dBone_update(p){
}
MO.FG3dCamera = function FG3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix          = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._position        = MO.Class.register(o, new MO.AGetter('_position'));
   o._target          = null;
   o._direction       = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = MO.Class.register(o, new MO.AGetter('_frustum'));
   o._planes          = MO.Class.register(o, new MO.AGetter('_planes'));
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = MO.FG3dCamera_construct;
   o.setPosition      = MO.FG3dCamera_setPosition;
   o.setDirection     = MO.FG3dCamera_setDirection;
   o.doWalk           = MO.FG3dCamera_doWalk;
   o.doStrafe         = MO.FG3dCamera_doStrafe;
   o.doFly            = MO.FG3dCamera_doFly;
   o.doPitch          = MO.FG3dCamera_doPitch;
   o.doYaw            = MO.FG3dCamera_doYaw;
   o.doRoll           = MO.FG3dCamera_doRoll;
   o.lookAt           = MO.FG3dCamera_lookAt;
   o.update           = MO.FG3dCamera_update;
   o.updateFrustum    = MO.FG3dCamera_updateFrustum;
   o.dispose          = MO.FG3dCamera_dispose;
   return o;
}
MO.FG3dCamera_construct = function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3();
   o._target = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._directionTarget = new MO.SVector3();
   o._frustum = new MO.SFrustum();
   o._planes = new MO.SFrustumPlanes();
   o._viewport = MO.Class.create(MO.FG3dViewport);
   o.__axisUp = new MO.SVector3(0, 1, 0);
   o.__axisX = new MO.SVector3();
   o.__axisY = new MO.SVector3();
   o.__axisZ = new MO.SVector3();
}
MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
   var o = this;
   o._direction.set(x, y, z);
   o._directionTarget.set(x, y, z);
}
MO.FG3dCamera_doWalk = function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
MO.FG3dCamera_doStrafe = function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}
MO.FG3dCamera_doFly = function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
MO.FG3dCamera_doPitch = function FG3dCamera_doPitch(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_lookAt = function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   var d = o._direction;
   o._target.set(x, y, z);
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
   o._directionTarget.assign(d);
}
MO.FG3dCamera_update = function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
MO.FG3dCamera_updateFrustum = function FG3dCamera_updateFrustum(){
   var o = this;
   var m = MO.Lang.Math.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
MO.FG3dCamera_dispose = function FG3dCamera_dispose(){
   var o = this;
   o._matrix = MO.Lang.Obejct.dispose(o._matrix);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   o._camera    = MO.Class.register(o, new MO.AGetter('_camera'));
   o._viewport  = MO.Class.register(o, new MO.AGetter('_viewport'));
   o._direction = MO.Class.register(o, new MO.AGetter('_direction'));
   o.construct  = MO.FG3dDirectionalLight_construct;
   o.dispose    = MO.FG3dDirectionalLight_dispose;
   return o;
}
MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._camera = MO.Class.create(MO.FG3dCamera);
   o._direction = new MO.SVector3();
}
MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
   var o = this;
   o._camera = MO.Lang.Object.dispose(o._camera);
   o.__base.FG3dLight.dispose.call(o);
}
MO.FG3dEffect = function FG3dEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._ready              = null;
   o._code               = MO.Class.register(o, new MO.AGetter('_code'));
   o._stateFillCd        = MO.EG3dFillMode.Face;
   o._stateCullCd        = MO.EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = MO.EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = MO.EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = MO.Class.register(o, new MO.AGetter('_program'));
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = MO.Method.empty;
   o.testReady           = MO.FG3dEffect_testReady;
   o.setParameter        = MO.FG3dEffect_setParameter;
   o.setSampler          = MO.FG3dEffect_setSampler;
   o.drawRenderable      = MO.FG3dEffect_drawRenderable;
   o.drawRenderables     = MO.FG3dEffect_drawRenderables;
   o.drawGroup           = MO.FG3dEffect_drawGroup;
   o.drawRegion          = MO.FG3dEffect_drawRegion;
   o.buildInfo           = MO.FG3dEffect_buildInfo;
   o.loadConfig          = MO.FG3dEffect_loadConfig;
   o.load                = MO.FG3dEffect_load;
   o.build               = MO.FG3dEffect_build;
   return o;
}
MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
   return this._ready;
}
MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(name, value, count){
   this._program.setParameter(name, value, count);
}
MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(name, texture){
   this._program.setSampler(name, texture);
}
MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(tagContext, effectInfo){
}
MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var attributeCount = attributes.count();
      for(var i = 0; i < attributeCount; i++){
         var attribute = attributes.value(i);
         if(attribute._statusUsed){
            var linker = attribute._linker;
            var vertexBuffer = renderable.findVertexBuffer(linker);
            if(!vertexBuffer){
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", linker);
            }
            program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
         }
      }
   }
   var indexBuffer = renderable.indexBuffer();
   context.drawTriangles(indexBuffer, 0, indexBuffer.count());
}
MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderables, offset, count){
   var o = this;
   o._graphicContext.setProgram(o._program);
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(offset + i);
      o.drawRenderable(region, renderable);
   }
}
MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, renderables, offset, count){
   this.drawRenderables(region, renderables, offset, count);
}
MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
   var o = this;
   var renderabels = region.renderables();
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var groupRenderable = renderabels.at(offset + groupBegin);
      var groupMaterial = groupRenderable.materialReference();
      for(var i = n; i < count; i++){
         var renderable = renderabels.at(offset + i);
         var material = renderable.materialReference();
         if(groupMaterial != material){
            groupEnd = i;
            break;
         }
         n++;
      }
      o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(xconfig){
   var o = this;
   var context = o._graphicContext;
   var program = o._program = context.createProgram();
   var xnodes = xconfig.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.get(i);
      if(xnode.isName('State')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'fill_mode'){
            o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
         }else if(name == 'cull_mode'){
            o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
         }else if(name == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
         }else if(name == 'depth_write'){
            o._stateDepthWrite = MO.Lang.Boolean.parse(value);
         }else if(name == 'blend_mode'){
            o._stateBlend = MO.Lang.Boolean.parse(value);
            if(o._stateBlend){
               o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
               o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
            }
         }else if(name == 'alpha_test'){
            o._stateAlphaTest = MO.RBoolean.parse(value);
         }
      }else if(xnode.isName('Option')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'shadow'){
            o._optionShadow = MO.Lang.Boolean.parse(value);
         }else if(name == 'lightmap'){
            o._optionLightMap = MO.Lang.Boolean.parse(value);
         }else if(name == 'fog'){
            o._optionFog = MO.Lang.Boolean.parse(value);
         }
      }else if(xnode.isName('Parameter')){
         var parameter = MO.Class.create(MO.FG3dProgramParameter);
         parameter.loadConfig(xnode);
         program.parameters().set(parameter.name(), parameter);
      }else if(xnode.isName('Attribute')){
         var attribute = MO.Class.create(MO.FG3dProgramAttribute);
         attribute.loadConfig(xnode);
         program.attributes().set(attribute.name(), attribute);
      }else if(xnode.isName('Sampler')){
         var sampler = MO.Class.create(MO.FG3dProgramSampler);
         sampler.loadConfig(xnode);
         program.samplers().set(sampler.name(), sampler);
      }else if(xnode.isName('Source')){
         var name = xnode.get('name');
         if(name == 'vertex'){
            o._vertexSource = xnode.value();
         }else if(name == 'fragment'){
            o._fragmentSource = xnode.value();
         }else{
            throw new MO.TError(o, 'Unknown source type. (name={1})', name);
         }
      }else{
         throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
      }
   }
   var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   vertexTemplate.load(o._vertexSource);
   var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   fragmentTemplate.load(o._fragmentSource);
}
MO.FG3dEffect_build = function FG3dEffect_build(p){
   var o = this;
   var program = o._program;
   var parameters = program.parameters();
   var parameterCount = parameters.count();
   var tagContext = MO.RInstance.get(MO.FTagContext);
   o.buildInfo(tagContext, p);
   var source = o._vertexTemplate.parse(tagContext);
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Vertex, formatSource);
   var source = o._fragmentTemplate.parse(tagContext);
   for(var i = 0; i < parameterCount; i++){
      var parameter = parameters.at(i);
      var parameterName = parameter.name();
      var parameterDefine = parameter.define();
      if(parameterDefine){
         source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
      }
   }
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Fragment, formatSource);
   program.build();
   program.link();
}
MO.FG3dEffect_load = function FG3dEffect_load(){
   var o = this;
   var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(xconfig);
}
MO.FG3dEffectConsole = function FG3dEffectConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = MO.Class.register(o, MO.AGetter('_path'), "/ars/shader/");
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = MO.FG3dEffectConsole_onProcess;
   o.construct        = MO.FG3dEffectConsole_construct;
   o.register         = MO.FG3dEffectConsole_register;
   o.unregister       = MO.FG3dEffectConsole_unregister;
   o.create           = MO.FG3dEffectConsole_create;
   o.buildEffectInfo  = MO.FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = MO.FG3dEffectConsole_findTemplate;
   o.find             = MO.FG3dEffectConsole_find;
   o.loadConfig       = MO.FG3dEffectConsole_loadConfig;
   return o;
}
MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
   var o = this;
   var effects = o._loadEffects;
   effects.record();
   while(effects.next()){
      var effect = effects.current();
      if(effect.processLoad()){
         effects.removeCurrent();
      }
   }
}
MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new MO.TDictionary();
   o._loadEffects = new MO.TLooper();
   o._registerEffects = new MO.TDictionary();
   o._templateEffects = new MO.TDictionary();
   o._effects = new MO.TDictionary();
   o._effectInfo = new MO.SG3dEffectInfo();
   o._tagContext = MO.Class.create(MO.FTagContext);
}
MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}
MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}
MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new MO.TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = MO.Class.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}
MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
      effectInfo.mergeStride = renderable.mergeStride();
   }
   var mi = renderable.material().info();
   effectInfo.optionNormalInvert = mi.optionNormalInvert;
   effectInfo.optionColor = mi.optionColor;
   effectInfo.optionAmbient = mi.optionAmbient;
   effectInfo.optionDiffuse = mi.optionDiffuse;
   effectInfo.optionSpecular = mi.optionSpecular;
   effectInfo.optionReflect = mi.optionReflect;
   effectInfo.optionRefract = mi.optionRefract;
   effectInfo.vertexCount = renderable.vertexCount();
   var vertexBuffers = renderable.vertexBuffers();
   var count = vertexBuffers.count();
   for(var i = 0; i < count; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexCode = vertexBuffer.code();
      if(vertexCode == 'normal'){
         var stride = vertexBuffer.stride();
         if(stride == 4){
            effectInfo.optionNormalCompress = true;
         }else{
            effectInfo.optionNormalCompress = false;
         }
      }
      if(MO.Lang.String.isEmpty(vertexCode)){
         throw new MO.TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(MO.Lang.String.isEmpty(textureCode)){
            throw new MO.TError(o, 'Texture code is empty.');
         }
         effectInfo.samplers.push(textureCode);
      }
   }
   var bones = renderable.bones();
   if(bones){
      var boneCount = bones.count();
      effectInfo.vertexBoneCount = boneCount;
      var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
      if(boneCount > boneLimit){
         boneCount = boneLimit;
      }
      renderable._boneLimit = boneCount;
      effectInfo.vertexBoneLimit = boneCount;
   }
}
MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      var effect = o.create(context, code);
      effect.load();
      MO.Logger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
      effects.set(code, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var effectCode = renderable.material().info().effectCode;
   if(MO.Lang.String.isEmpty(effectCode)){
      effectCode = 'automatic'
   }
   if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
      if(renderable.bones() == null){
         effectCode = 'automatic'
      }
   }
   var effectFlag = region.spaceName() + '.' + effectCode;
   var effectTemplate = o.findTemplate(context, effectFlag);
   if(effectTemplate){
      var effectInfo = o._effectInfo;
      effectInfo.reset();
      o.buildEffectInfo(context, effectInfo, region, renderable);
      effectTemplate.buildInfo(o._tagContext, effectInfo);
      var flag = effectFlag + o._tagContext.code;
      var effects = o._effects;
      var effect = effects.get(flag);
      if(!effect){
         effect = o.create(context, effectFlag);
         effect._flag = flag;
         effect.load();
         effect.build(o._effectInfo);
         MO.Logger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
      }
      effects.set(flag, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
   var o = this;
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   var u = MO.RBrowser.contentPath(o._path + p + ".xml");
   if(MO.Runtime.isDebug()){
      u += '?' + MO.Lang.Date.format();
   }
   x = MO.Class.create(MO.FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
}
MO.FG3dLight = function FG3dLight(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FG3dLightMaterial = function FG3dLightMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   return o;
}
MO.FG3dMaterial = function FG3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   o._dirty     = true;
   o._textures  = MO.Class.register(o, new MO.AGetter('_textures'))
   o.setTexture = MO.FG3dMaterial_setTexture;
   o.update     = MO.FG3dMaterial_update;
   return o;
}
MO.FG3dMaterial_setTexture = function FG3dMaterial_setTexture(code, texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TDictionary();
   }
   textures.set(code, texture);
}
MO.FG3dMaterial_update = function FG3dMaterial_update(){
   this._dirty = true;
}
MO.FG3dMaterialMap = function FG3dMaterialMap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._data      = MO.Class.register(o, new MO.AGetter('_data'));
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   o._stride    = null;
   o._dirty     = false;
   o.construct  = MO.FG3dMaterialMap_construct;
   o.setup      = MO.FG3dMaterialMap_setup;
   o.resize     = MO.FG3dMaterialMap_resize;
   o.setUint8   = MO.FG3dMaterialMap_setUint8;
   o.setUint16  = MO.FG3dMaterialMap_setUint16;
   o.setUint32  = MO.FG3dMaterialMap_setUint32;
   o.setFloat16 = MO.FG3dMaterialMap_setFloat16;
   o.setFloat32 = MO.FG3dMaterialMap_setFloat32;
   o.update     = MO.FG3dMaterialMap_update;
   return o;
}
MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
   var o = this;
   var c = o._graphicContext;
   var texture = o._texture = c.createFlatTexture();
   o.resize(width, height);
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.uploadData(o._data, width, height);
}
MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(width, height){
   var o = this;
   var s = o._size;
   if(height > 2048){
      height = 4096;
   }else if(height > 1024){
      height = 2048;
   }else if(height > 512){
      height = 1024;
   }else if(height > 256){
      height = 512;
   }else if(height > 128){
      height = 256;
   }else if(height > 64){
      height = 128;
   }else if(height > 32){
      height = 64;
   }else if(height > 16){
     height = 32;
   }
   if(height < s.height){
      height = s.height;
   }
   if((s.width == width) && (s.height == height)){
      return;
   }
   s.set(width, height);
   o._stride = 4 * width;
   var total = 4 * width * height;
   o._data = new Uint8Array(total);
}
MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == MO.SColor4){
      var v = v1.red * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.green * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.blue * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.alpha * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
   }else{
      d[p++] = v1;
      d[p++] = v2;
      d[p++] = v3;
      d[p++] = v4;
   }
}
MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   var v = parseInt(v1 * 256);
   d[p++] = parseInt(v1) & 0xFF;
   d[p++] = parseInt(v1 * 256) & 0xFF;
   d[p++] = parseInt(v2) & 0xFF;
   d[p++] = parseInt(v2 * 256) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial);
   o._texture = null;
   return o;
}
MO.FG3dObject = function FG3dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG3dObject_setup;
   o.dispose = MO.FG3dObject_dispose;
   return o;
}
MO.FG3dObject_setup = function FG3dObject_setup(){
}
MO.FG3dObject_dispose = function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dOrthoProjection_construct;
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   o.dispose       = MO.FG3dOrthoProjection_dispose;
   return o;
}
MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
   var o = this;
   var size = o._size;
   var left = -size.width * 0.5;
   var top = -size.height * 0.5;
   MO.Lang.Matrix.orthoLH(o._matrix, left, top, size.width, size.height, o._znear, o._zfar);
}
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(frustum){
   var o = this;
   o._znear = frustum.minZ;
   o._zfar = frustum.maxZ;
   o.update();
}
MO.FG3dOrthoProjection_dispose = function FG3dOrthoProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
   o.dispose       = MO.FG3dPerspectiveProjection_dispose;
   return o;
}
MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var size = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   MO.Lang.Matrix.perspectiveFieldOfViewLH(o._matrix, o._fieldOfView, size.width / size.height, o._znear, o._zfar);
}
MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
MO.FG3dPerspectiveProjection_dispose = function FG3dPerspectiveProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPointLight = function FG3dPointLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dProjection = function FG3dProjection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o._angle       = MO.Class.register(o, new MO.AGetSet('_angle'), 60.0);
   o._fieldOfView = MO.Class.register(o, new MO.AGetSet('_fieldOfView'), 0);
   o._znear       = MO.Class.register(o, new MO.AGetSet('_znear'), 0.1);
   o._zfar        = MO.Class.register(o, new MO.AGetSet('_zfar'), 200);
   o._zoom        = MO.Class.register(o, new MO.AGetSet('_zoom'), 1);
   o.construct    = MO.FG3dProjection_construct;
   o.distance     = MO.FG3dProjection_distance;
   o.dispose      = MO.FG3dProjection_dispose;
   return o;
}
MO.FG3dProjection_construct = function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._size = new MO.SSize2();
}
MO.FG3dProjection_distance = function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
MO.FG3dProjection_dispose = function FG3dProjection_dispose(){
   var o = this;
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
   o = MO.Class.inherits(this, o, MO.FTagDocument);
   o._space  = 'shader';
   return o;
}
MO.FG3dSpotLight = function FG3dSpotLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dTechnique = function FG3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._activeMode     = MO.Class.register(o, new MO.AGetter('_activeMode'));
   o._modes          = MO.Class.register(o, new MO.AGetter('_modes'));
   o._passes         = MO.Class.register(o, new MO.AGetter('_passes'));
   o.construct       = MO.FG3dTechnique_construct;
   o.registerMode    = MO.FG3dTechnique_registerMode;
   o.selectMode      = MO.FG3dTechnique_selectMode;
   o.updateRegion    = MO.Method.empty;
   o.clear           = MO.FG3dTechnique_clear;
   o.clearDepth      = MO.FG3dTechnique_clearDepth;
   o.sortRenderables = MO.FG3dTechnique_sortRenderables;
   o.drawRegion      = MO.FG3dTechnique_drawRegion;
   o.present         = MO.FG3dTechnique_present;
   return o;
}
MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new MO.TObjects();
   o._passes = new MO.TObjects();
}
MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
   var o = this;
   var m = MO.Class.create(MO.FG3dTechniqueMode);
   m.setCode(p);
   o._modes.push(m);
   o._activeMode = m;
   return m;
}
MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
   var o = this;
}
MO.FG3dTechnique_clear = function FG3dTechnique_clear(color){
   var o = this;
   var context = o._graphicContext;
   context.setRenderTarget(null);
   context.clear(color.red, color.green, color.blue, color.alpha, 1);
}
MO.FG3dTechnique_clearDepth = function FG3dTechnique_clearDepth(depth){
   var o = this;
   if(depth == null){
      depth = 1;
   }
   var context = o._graphicContext;
   context.clearDepth(depth);
}
MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
}
MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(region){
   var o = this;
   region.setTechnique(o);
   var passes = o._passes;
   var count = passes.count();
   for(var i = 0; i < count; i++){
      var pass = passes.at(i);
      region.setTechniquePass(pass, (i == count - 1));
      pass.drawRegion(region);
   }
}
MO.FG3dTechnique_present = function FG3dTechnique_present(p){
   this._graphicContext.present();
}
MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._techniques = MO.Class.register(o, new MO.AGetter('_techniques'));
   o.construct   = MO.FG3dTechniqueConsole_construct;
   o.find        = MO.FG3dTechniqueConsole_find;
   return o;
}
MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new MO.TDictionary();
}
MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var code = context.hashCode() + '|' + MO.Class.name(clazz);
   var techniques = o._techniques;
   var technique = techniques.get(code);
   if(!technique){
      technique = MO.Class.create(clazz);
      technique.linkGraphicContext(context);
      technique.setup();
      var techniqueCode = technique.code();
      var passes = technique.passes();
      var passCount = passes.count();
      for(var i = 0; i < passCount; i++){
         var pass = passes.at(i);
         var passCode = pass.code();
         pass.setFullCode(techniqueCode + '.' + passCode);
      }
      techniques.set(code, technique);
   }
   return technique;
}
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._fullCode       = MO.Class.register(o, new MO.AGetSet('_fullCode'));
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = MO.FG3dTechniquePass_setup;
   o.activeEffects   = MO.FG3dTechniquePass_activeEffects;
   o.sortRenderables = MO.FG3dTechniquePass_sortRenderables;
   o.drawRegion      = MO.FG3dTechniquePass_drawRegion;
   return o;
}
MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
   var o = this;
   var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
   map.linkGraphicContext(o);
   map.setup(MO.EG3dMaterialMap.Count, 32);
}
MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(source, target){
   var sourceMaterial = source.material().info();
   var targetMaterial = target.material().info();
   if(sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }else if(sourceMaterial.optionAlpha && !targetMaterial.optionAlpha){
      return 1;
   }else if(!sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      return -1;
   }else{
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }
}
MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(region, renderables){
   var o = this;
   var spaceName = region.spaceName();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      var info = renderable.selectInfo(spaceName);
      if(!info.effect){
         info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
      }
   }
}
MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(region){
   var o = this;
   var renderables = region.renderables();
   var count = renderables.count();
   if(count == 0){
      return;
   }
   var statistics = region._statistics;
   statistics._frameDrawSort.begin();
   o.activeEffects(region, renderables);
   renderables.sort(o.sortRenderables);
   statistics._frameDrawSort.end();
   var capability = o._graphicContext.capability();
   if(capability.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(MO.EG3dMaterialMap.Count, count);
      for(var i = 0; i < count; i++){
         var r = renderables.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      }
      mm.update();
      region._materialMap = mm;
   }
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var effect = renderables.at(groupBegin).activeEffect();
      for(var i = n; i < count; i++){
         var activeEffect = renderables.at(i).activeEffect();
         if(effect != activeEffect){
            groupEnd = i;
            break;
         }
         n++;
      }
      effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dTrack = function FG3dTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._frames   = null;
   o.construct = MO.FG3dTrack_construct;
   o.calculate = MO.FG3dTrack_calculate;
   return o;
}
MO.FG3dTrack_construct = function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FG3dTrack_update = function FG3dTrack_update(p){
   var o = this;
   var info = new MO.SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
   var o = this;
   var frameCount = o._frames.count();
   if(frameCount == 0){
      return false;
   }
   if(tick < 0){
      tick = -tick;
   }
   var pCurrentFrame = o._frames.Get(index);
   var pNextFrame = null;
   if(index < frameCount -1){
      pNextFrame = o._frames.Get(index + 1);
   }else{
      pNextFrame = o._frames.Get(0);
   }
   info.tick = tick;
   info.currentFrame = pCurrentFrame;
   info.nextFrame = pNextFrame;
   return true;
}
MO.FG3dViewport = function FG3dViewport(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = MO.FG3dViewport_set;
   return o;
}
MO.FG3dViewport_set = function FG3dViewport_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height= height;
}
MO.REngine3d = function REngine3d(){
   var o = this;
   o._setuped  = false;
   o._contexts = null;
   return o;
}
MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
   this.dispose();
}
MO.REngine3d.prototype.setup = function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      o._contexts = new MO.TObjects();
      MO.Window.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   o.setup();
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   if(!context.linkCanvas(hCanvas)){
      return null;
   }
   o._contexts.push(context);
   return context;
}
MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
MO.REngine3d = new MO.REngine3d();
MO.Graphic.Context3d = MO.REngine3d;
MO.Engine3d = MO.REngine3d;
MO.EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
MO.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.Zero             = 0;
   o.One              = 1;
   o.SrcColor         = 2;
   o.OneMinusSrcColor = 3;
   o.DstColor         = 4;
   o.OneMinusDstColor = 5;
   o.SrcAlpha         = 6;
   o.OneMinusSrcAlpha = 7;
   o.DstAlpha         = 8;
   o.OneMinusDstAlpha = 9;
   o.SrcAlphaSaturate = 10;
   return o;
}
MO.EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
MO.EG3dDrawMode = new function EG3dDrawMode(){
   var o = this;
   o.Unknown = 0;
   o.Points = 1;
   o.Lines = 2;
   o.LineStrip = 3;
   o.LineLoop = 4;
   o.Triangles = 5;
   o.TriangleStrip = 6;
   o.TriangleFan = 7;
   o.Quads = 8;
   o.QuadStrip = 9;
   return o;
}
MO.EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
MO.EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
MO.EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
MO.EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
MO.SG3dContextCapability = function SG3dContextCapability(){
   var o = this;
   o.vendor              = null;
   o.version             = null;
   o.shaderVersion       = null;
   o.optionDebug         = false;
   o.optionInstance      = false;
   o.optionLayout        = false;
   o.optionMaterialMap   = false;
   o.optionIndex32       = false;
   o.optionShaderSource  = false;
   o.mergeCount          = 0;
   o.attributeCount      = null;
   o.vertexCount         = 65536;
   o.vertexConst         = null;
   o.fragmentConst       = null;
   o.varyingCount        = null;
   o.samplerCount        = null;
   o.samplerSize         = null;
   o.samplerCompressRgb  = null;
   o.samplerCompressRgba = null;
   o.shader              = null;
   return o;
}
MO.SG3dContextCapability.prototype.calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
   var o = this;
   var rb = 0;
   var bi = boneCount % 4;
   if(bi != 0){
      rb = boneCount + 4 - bi;
   }else{
      rb = boneCount;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
MO.SG3dContextCapability.prototype.calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
   var o = this;
   var cr = (4 * boneCount) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vertexCount > 0){
      var iv = o.vertexCount / vertexCount;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
MO.SG3dContextCapability.prototype.dispose = function SG3dContextCapability_dispose(){
   var o = this;
   o.shader = null;
   MO.RObject.free(o);
}
MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
   var o = this;
   o.slot     = null;
   o.buffer   = null;
   o.index    = null;
   o.formatCd = null;
   o.dispose  = MO.SG3dLayoutBuffer_dispose;
   return o;
}
MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
   var o = this;
   o.slot = null;
   o.buffer = null;
   o.index = null;
   o.formatCd = null;
}
MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
   var o = this;
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   o.dispose = MO.SG3dLayoutSampler_dispose;
   return o;
}
MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data   = MO.Class.register(o, new MO.AGetSet('_data'));
   o.isValid = MO.Method.virtual(o, 'isValid');
   o.dispose = MO.FG3dBuffer_dispose;
   return o;
}
MO.FG3dBuffer_dispose = function FG3dBuffer_dispose(){
   var o = this;
   o._data = null;
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dContext = function FG3dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._viewportRectangle  = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   o._capability         = MO.Class.register(o, new MO.AGetter('_capability'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._fillModeCd         = MO.EG3dFillMode.Face;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o._storePrograms      = null;
   o._storeLayouts       = null;
   o._storeBuffers       = null;
   o._storeTextures      = null;
   o._storeTargets       = null;
   o.construct           = MO.FG3dContext_construct;
   o.linkCanvas          = MO.FG3dContext_linkCanvas;
   o.createObject        = MO.FG3dContext_createObject;
   o.createProgram       = MO.Method.virtual(o, 'createProgram');
   o.createLayout        = MO.Method.virtual(o, 'createLayout');
   o.createVertexBuffer  = MO.Method.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = MO.Method.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = MO.Method.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = MO.Method.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = MO.Method.virtual(o, 'createRenderTarget');
   o.setViewport         = MO.Method.virtual(o, 'setViewport');
   o.setFillMode         = MO.Method.virtual(o, 'setFillMode');
   o.setDepthMode        = MO.Method.virtual(o, 'setDepthMode');
   o.setCullingMode      = MO.Method.virtual(o, 'setCullingMode');
   o.setBlendFactors     = MO.Method.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = MO.Method.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = MO.Method.virtual(o, 'setRenderTarget');
   o.setProgram          = MO.Method.virtual(o, 'setProgram');
   o.bindVertexBuffer    = MO.Method.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = MO.Method.virtual(o, 'bindTexture');
   o.prepare             = MO.FG3dContext_prepare;
   o.clear               = MO.Method.virtual(o, 'clear');
   o.clearColor          = MO.Method.virtual(o, 'clearColor');
   o.clearDepth          = MO.Method.virtual(o, 'clearDepth');
   o.drawTriangles       = MO.Method.virtual(o, 'drawTriangles');
   o.present             = MO.Method.virtual(o, 'present');
   o.dispose             = MO.FG3dContext_dispose;
   return o;
}
MO.FG3dContext_construct = function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._viewportRectangle = new MO.SRectangle();
   o._statistics = MO.Class.create(MO.FG3dStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
   o._storePrograms = new MO.TObjects();
   o._storeLayouts = new MO.TObjects();
   o._storeBuffers = new MO.TObjects();
   o._storeTextures = new MO.TObjects();
   o._storeTargets = new MO.TObjects();
}
MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
   instance.linkGraphicContext(o);
   instance.setup();
   return instance;
}
MO.FG3dContext_prepare = function FG3dContext_prepare(){
   this._statistics.resetFrame();
}
MO.FG3dContext_dispose = function FG3dContext_dispose(){
   var o = this;
   var programs = o._storePrograms;
   if(programs){
      var count = programs.count();
      for(var i = 0; i < count; i++){
         var program = programs.at(i);
         program.dispose();
      }
      o._storePrograms = MO.Lang.Object.dispose(programs);
   }
   var layouts = o._storeLayouts;
   if(layouts){
      var count = layouts.count();
      for(var i = 0; i < count; i++){
         var layout = layouts.at(i);
         layout.dispose();
      }
      o._storeLayouts = MO.Lang.Object.dispose(layouts);
   }
   var buffers = o._storeBuffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         buffer.dispose();
      }
      o._storeBuffers = MO.Lang.Object.dispose(buffers);
   }
   var textures = o._storeTextures;
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var texture = textures.at(i);
         texture.dispose();
      }
      o._storeTextures = MO.Lang.Object.dispose(textures);
   }
   var targets = o._storeTargets;
   if(targets){
      var count = targets.count();
      for(var i = 0; i < count; i++){
         var target = targets.at(i);
         target.dispose();
      }
      o._storeTargets = MO.Lang.Object.dispose(targets);
   }
   o._program = null;
   o._viewportRectangle = MO.Lang.Object.dispose(o._viewportRectangle);
   o._capability = MO.Lang.Object.dispose(o._capability);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   o._handleInstance = null;
   o._handleLayout = null;
   o._handle = null;
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o.size = 0;
   o.construct = MO.FG3dTexture_construct;
   o.upload    = MO.Method.virtual(o, 'upload');
   o.update    = MO.Method.empty;
   return o;
}
MO.FG3dTexture_construct = function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Cube;
}
MO.FG3dFlatTexture = function FG3dFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct    = MO.FG3dFlatTexture_construct;
   o.uploadData   = MO.Method.virtual(o, 'uploadData');
   o.upload       = MO.Method.virtual(o, 'upload');
   o.update       = MO.Method.empty;
   return o;
}
MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Flat2d;
}
MO.FG3dFragmentShader = function FG3dFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._strideCd   = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   o._count      = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._lineWidth  = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   o.upload      = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dLayout = function FG3dLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
   o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
   o.linkBuffers    = MO.FG3dLayout_linkBuffers;
   o.bindBuffers    = MO.FG3dLayout_bindBuffers;
   o.linkSamplers   = MO.FG3dLayout_linkSamplers;
   o.bindSamplers   = MO.FG3dLayout_bindSamplers;
   o.unbindSamplers = MO.FG3dLayout_unbindSamplers;
   o.dispose        = MO.FG3dLayout_dispose;
   return o;
}
MO.FG3dLayout_construct = function FG3dLayout_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
}
MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
   var o = this;
   if(!buffers.isEmpty()){
      var items = o._buffers;
      if(!items){
         items = o._buffers = new MO.TObjects();
      }
      items.assign(buffers);
   }
}
MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
   var o = this;
   var context = o._graphicContext;
   var buffers = o._buffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
      }
   }
}
MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
   var o = this;
   if(!samplers.isEmpty()){
      var items = o._samplers;
      if(!items){
         items = o._samplers = new MO.TObjects();
      }
      items.assign(samplers);
   }
}
MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
   var o = this;
   var context = o._graphicContext;
   var samplers = o._samplers;
   if(samplers){
      var count = samplers.count();
      for(var i = 0; i < count; i++){
         var sampler = samplers.at(i);
         context.bindTexture(sampler.slot, sampler.index, sampler.texture);
      }
   }
}
MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
   var o = this;
   var context = o._graphicContext;
   var samplers = o._samplers;
   if(samplers){
      var count = samplers.count();
      for(var i = 0; i < count; i++){
         var sampler = samplers.at(i);
         context.bindTexture(sampler.slot, sampler.index, null);
      }
   }
}
MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
   var o = this;
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o._samplers = MO.Lang.Object.dispose(o._samplers);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgram = function FG3dProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = MO.FG3dProgram_hasAttribute;
   o.registerAttribute = MO.FG3dProgram_registerAttribute;
   o.findAttribute     = MO.FG3dProgram_findAttribute;
   o.attributes        = MO.FG3dProgram_attributes;
   o.hasParameter      = MO.FG3dProgram_hasParameter;
   o.registerParameter = MO.FG3dProgram_registerParameter;
   o.findParameter     = MO.FG3dProgram_findParameter;
   o.parameters        = MO.FG3dProgram_parameters;
   o.hasSampler        = MO.FG3dProgram_hasSampler;
   o.registerSampler   = MO.FG3dProgram_registerSampler;
   o.findSampler       = MO.FG3dProgram_findSampler;
   o.samplers          = MO.FG3dProgram_samplers;
   o.vertexShader      = MO.Method.virtual(o, 'vertexShader');
   o.fragmentShader    = MO.Method.virtual(o, 'fragmentShader');
   o.setAttribute      = MO.FG3dProgram_setAttribute;
   o.setParameter      = MO.FG3dProgram_setParameter;
   o.setParameter4     = MO.FG3dProgram_setParameter4;
   o.setSampler        = MO.FG3dProgram_setSampler;
   o.upload            = MO.Method.virtual(o, 'upload');
   o.dispose           = MO.FG3dProgram_dispose;
   return o;
}
MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == MO.SMatrix3d) || (t == MO.SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == MO.SColor4){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == MO.SPoint3) || (t == MO.SVector3)){
      d = MO.Lang.TypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == MO.SPoint4) || (t == MO.SVector4)){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new MO.TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   if(p.attachData(d)){
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
}
MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = MO.Lang.TypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._graphicContext.bindTexture(p._slot, p._index, pt);
}
MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes, true);
   o._parameters = MO.Lang.Object.dispose(o._parameters, true);
   o._samplers = MO.Lang.Object.dispose(o._samplers, true);
   o._vertexShader = MO.Lang.Object.dispose(o._vertexShader);
   o._fragmentShader = MO.Lang.Object.dispose(o._fragmentShader);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._slot       = null;
   o._index      = -1;
   o._formatCd   = MO.EG3dAttributeFormat.Unknown;
   o.loadConfig  = MO.FG3dProgramAttribute_loadConfig;
   o.dispose     = MO.FG3dProgramAttribute_dispose;
   return o;
}
MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.REnum.encode(MO.EG3dAttributeFormat, xconfig.get('format'));
}
MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramParameter = function FG3dProgramParameter(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._formatCd   = MO.EG3dParameterFormat.Unknown;
   o._define     = MO.Class.register(o, new MO.AGetter('_define'));
   o._statusUsed = false;
   o._slot       = null;
   o._size       = 0;
   o._buffer     = null;
   o._memory     = null;
   o.attachData  = MO.FG3dProgramParameter_attachData;
   o.loadConfig  = MO.FG3dProgramParameter_loadConfig;
   o.dispose     = MO.FG3dProgramParameter_dispose;
   return o;
}
MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
   var o = this;
   var result = false;
   var clazz = value.constructor;
   if(clazz == MO.SMatrix3d){
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(16);
      }
      result = MO.Lang.Float.attach(memory, value._data, 16);
   }else if(clazz == Float32Array){
      var length = value.length;
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(length);
      }
      result = MO.Lang.Float.attach(memory, value, length);
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   return result;
}
MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
   o._define = xconfig.get('define');
}
MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
   var o = this;
   o._slot = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramSampler = function FG3dProgramSampler(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._formatCd   = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dTexture.Flat2d);
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.loadConfig  = MO.FG3dProgramSampler_loadConfig;
   o.dispose     = MO.FG3dProgramSampler_dispose;
   return o;
}
MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._bind = MO.Lang.Boolean.parse(xconfig.get('bind', 'Y'));
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
}
MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dRenderTarget = function FG3dRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._size     = MO.Class.register(o, new MO.AGetter('_size'));
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o._textures = null;
   o.construct = MO.FG3dRenderTarget_construct;
   o.textures  = MO.FG3dRenderTarget_textures;
   o.dispose   = MO.FG3dRenderTarget_dispose;
   return o;
}
MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
   var o = this;
   var textures = o._textures;
   if(textures == null){
      textures = o._textures = new TObjects();
   }
   return textures;
}
MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._color = RObject.dispose(o._color);
   o.__base.dispose.construct();
}
MO.FG3dShader = function FG3dShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._source = MO.Class.register(o, new MO.AGetter('_source'));
   o.upload  = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dStatistics = function FG3dStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frameClearCount     = MO.Class.register(o, new MO.AGetter('_frameClearCount'), 0);
   o._frameFillModeCount  = MO.Class.register(o, new MO.AGetter('_frameFillModeCount'), 0);
   o._frameDepthModeCount = MO.Class.register(o, new MO.AGetter('_frameDepthModeCount'), 0);
   o._frameCullModeCount  = MO.Class.register(o, new MO.AGetter('_frameCullModeCount'), 0);
   o._frameBlendModeCount = MO.Class.register(o, new MO.AGetter('_frameBlendModeCount'), 0);
   o._frameProgramCount   = MO.Class.register(o, new MO.AGetter('_frameProgramCount'), 0);
   o._frameConstCount     = MO.Class.register(o, new MO.AGetter('_frameConstCount'), 0);
   o._frameConstLength    = MO.Class.register(o, new MO.AGetter('_frameConstLength'), 0);
   o._frameBufferCount    = MO.Class.register(o, new MO.AGetter('_frameBufferCount'), 0);
   o._frameTextureCount   = MO.Class.register(o, new MO.AGetter('_frameTextureCount'), 0);
   o._frameTargetCount    = MO.Class.register(o, new MO.AGetter('_frameTargetCount'), 0);
   o._frameDrawCount      = MO.Class.register(o, new MO.AGetter('_frameDrawCount'), 0);
   o._frameTriangleCount  = MO.Class.register(o, new MO.AGetter('_frameTriangleCount'), 0);
   o._programTotal        = MO.Class.register(o, new MO.AGetter('_programTotal'), 0);
   o._layoutTotal         = MO.Class.register(o, new MO.AGetter('_layoutTotal'), 0);
   o._vertexBufferTotal   = MO.Class.register(o, new MO.AGetter('_vertexBufferTotal'), 0);
   o._indexBufferTotal    = MO.Class.register(o, new MO.AGetter('_indexBufferTotal'), 0);
   o._flatTextureTotal    = MO.Class.register(o, new MO.AGetter('_flatTextureTotal'), 0);
   o._cubeTextureTotal    = MO.Class.register(o, new MO.AGetter('_cubeTextureTotal'), 0);
   o._targetTotal         = MO.Class.register(o, new MO.AGetter('_targetTotal'), 0);
   o.reset                = MO.FG3dStatistics_reset;
   o.resetFrame           = MO.FG3dStatistics_resetFrame;
   return o;
}
MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
   o._programTotal = 0;
   o._layoutTotal = 0;
   o._vertexBufferTotal = 0;
   o._indexBufferTotal = 0;
   o._flatTextureTotal = 0;
   o._cubeTextureTotal = 0;
   o._targetTotal = 0;
}
MO.FG3dStatistics_resetFrame = function FG3dStatistics_resetFrame(){
   var o = this;
   o._frameClearCount = 0;
   o._frameFillModeCount = 0;
   o._frameDepthModeCount = 0;
   o._frameCullModeCount = 0;
   o._frameBlendModeCount = 0;
   o._frameProgramCount = 0;
   o._frameConstCount = 0;
   o._frameConstLength = 0;
   o._frameBufferCount = 0;
   o._frameTextureCount = 0;
   o._frameTargetCount = 0;
   o._frameTriangleCount = 0;
   o._frameDrawCount = 0;
}
MO.FG3dTexture = function FG3dTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._textureCd   = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   o._filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   o._filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   o._wrapS       = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   o._wrapT       = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   o._statusLoad  = false;
   o.isValid      = MO.Method.virtual(o, 'isValid');
   o.setFilterCd  = MO.FG3dTexture_setFilterCd;
   o.setWrapCd    = MO.FG3dTexture_setWrapCd;
   return o;
}
MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
   var o = this;
   o._filterMinCd = minCd;
   o._filterMagCd = magCd;
}
MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
   var o = this;
   o._wrapS = wrapS;
   o._wrapT = wrapT;
}
MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o._stride   = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o.upload    = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dVertexShader = function FG3dVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dAutomaticEffect = function FG3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dEffect);
   o._optionMerge                 = false;
   o._optionBlendMode             = true;
   o._supportInstance             = false;
   o._supportLayout               = false;
   o._supportMaterialMap          = false;
   o._supportVertexColor          = true;
   o._supportVertexCoord          = true;
   o._supportVertexNormal         = true;
   o._supportVertexNormalFull     = true;
   o._supportVertexNormalCompress = false;
   o._supportSkeleton             = false;
   o._supportAlpha                = true;
   o._supportAmbient              = true;
   o._supportDiffuse              = true;
   o._supportDiffuseView          = true;
   o._supportSpecularColor        = true;
   o._supportSpecularLevel        = true;
   o._supportSpecularView         = true;
   o._supportLight                = true;
   o._supportReflect              = true;
   o._supportRefract              = true;
   o._supportEmissive             = true;
   o._supportHeight               = true;
   o._supportEnvironment          = true;
   o._dynamicSkeleton             = true;
   o.setup                        = MO.FG3dAutomaticEffect_setup;
   o.buildInfo                    = MO.FG3dAutomaticEffect_buildInfo;
   o.bindAttributes               = MO.FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers                 = MO.FG3dAutomaticEffect_bindSamplers;
   o.bindMaterialSamplers         = MO.FG3dAutomaticEffect_bindMaterialSamplers;
   o.bindMaterial                 = MO.FG3dAutomaticEffect_bindMaterial;
   o.drawRenderable               = MO.FG3dAutomaticEffect_drawRenderable;
   return o;
}
MO.FG3dAutomaticEffect_setup = function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}
MO.FG3dAutomaticEffect_buildInfo = function FG3dAutomaticEffect_buildInfo(tagContext, info){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var flag = new MO.TString();
   flag.append(info.techniqueModeCode)
   tagContext.set("technique.mode", info.techniqueModeCode);
   var om = o._optionMerge = info.optionMerge;
   if(om){
      var mergeCount = info.mergeCount;
      var mergeStride = info.mergeStride;
      flag.append("|OI" + mergeCount);
      tagContext.setBoolean("option.instance", true);
      tagContext.set("instance.count", mergeCount);
      tagContext.set("instance.length", mergeStride * mergeCount);
   }
   if(capability.optionMaterialMap){
      flag.append("|OM");
      tagContext.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   if(info.optionNormalInvert){
      flag.append("|ON");
      tagContext.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   if(info.optionColor){
      flag.append("|OC");
      tagContext.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   if(info.optionAmbient){
      flag.append("|OA");
      tagContext.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   if(info.optionDiffuse){
      flag.append("|OD");
      tagContext.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   if(info.optionSpecular){
      flag.append("|OS");
      tagContext.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   if(info.optionReflect){
      flag.append("|ORL");
      tagContext.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   if(info.optionRefract){
      flag.append("|ORF");
      tagContext.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   var ac = info.attributeContains(MO.EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      flag.append("|AC");
      tagContext.setBoolean("vertex.attribute.color", true);
   }
   var ad = info.attributeContains(MO.EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      flag.append("|AD");
      tagContext.setBoolean("vertex.attribute.coord", true);
   }
   var an = info.attributeContains(MO.EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      flag.append("|AN");
      tagContext.setBoolean("vertex.attribute.normal", true);
   }
   var ab = info.attributeContains(MO.EG3dAttribute.Binormal);
   var at = info.attributeContains(MO.EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      flag.append("|ANF");
      tagContext.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicVertexNormalCompress = info.optionNormalCompress;
   if(o._dynamicVertexNormalCompress){
      flag.append("|ANC");
      tagContext.setBoolean("vertex.attribute.normal.compress", true);
   }
   o._dynamicInstance = (o._supportInstance && capability.optionInstance);
   if(o._dynamicInstance){
      flag.append("|SI");
      if(info){
         tagContext.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      flag.append("|SS");
      if(info){
         tagContext.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = info.samplerContains(MO.EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      flag.append("|RA");
      if(info){
         tagContext.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      flag.append("|TA");
      if(info){
         tagContext.setBoolean("support.ambient", true);
      }
      if(sdf){
         flag.append("|TAS");
         if(info){
            tagContext.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   if(info.samplerContains(MO.EG3dSampler.Alpha)){
      tagContext.setBoolean("support.alpha.sampler", true);
   }
   var snr = info.samplerContains(MO.EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(info){
         tagContext.setBoolean("support.diffuse", true);
      }
      if(snr){
         flag.append("|TDD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDN");
         if(info){
            tagContext.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(info){
         tagContext.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         flag.append("|TDVD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDVN");
         if(info){
            tagContext.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = info.samplerContains(MO.EG3dSampler.SpecularColor);
   var spl = info.samplerContains(MO.EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      flag.append("|TS");
      if(info){
         tagContext.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSC");
         if(info){
            tagContext.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSL");
         if(info){
            tagContext.setBoolean("support.specular.level", true);
         }
      }else{
         flag.append("|NSL");
         if(info){
            tagContext.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      flag.append("|TSV");
      if(info){
         tagContext.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSVC");
         if(info){
            tagContext.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.level", true);
         }
      }else{
         flag.append("|NSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = info.samplerContains(MO.EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      flag.append("|TL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.light", true);
      }
   }
   var slr = info.samplerContains(MO.EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      flag.append("|TRL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.reflect", true);
      }
   }
   var slf = info.samplerContains(MO.EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      flag.append("|TRF");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.refract", true);
      }
   }
   var sle = info.samplerContains(MO.EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      flag.append("|TLE");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.emissive", true);
      }
   }
   var shg = info.samplerContains(MO.EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      flag.append("|TH");
      if(info){
         tagContext.setBoolean("support.height", true);
      }
   }
   var sen = info.samplerContains(MO.EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      flag.append("|TE");
      if(info){
         tagContext.setBoolean("support.environment", true);
      }
   }
   if(o._dynamicSkeleton){
      var boneCount = capability.calculateBoneCount(info.vertexBoneCount, info.vertexCount);
      flag.append("|B" + boneCount);
      tagContext.set("bone.count", boneCount);
      tagContext.set("bone.array.count", boneCount * 3);
      tagContext.setBoolean("support.bone.weight.1", true);
      tagContext.setBoolean("support.bone.weight.2", true);
      tagContext.setBoolean("support.bone.weight.3", true);
      tagContext.setBoolean("support.bone.weight.4", true);
   }
   tagContext.code = flag.flush();
}
MO.FG3dAutomaticEffect_bindAttributes = function FG3dAutomaticEffect_bindAttributes(renderable){
   var o = this;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var count = attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = attributes.at(n);
         if(attribute._statusUsed){
            var buffer = renderable.findVertexBuffer(attribute._linker);
            program.setAttribute(attribute._name, buffer, buffer._formatCd);
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindSamplers = function FG3dAutomaticEffect_bindSamplers(renderable){
   var o = this;
   var program = o._program;
   if(o._supportMaterialMap){
      program.setSampler('fs_material', region.materialMap().texture());
   }
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = renderable.findTexture(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindMaterialSamplers = function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
   var o = this;
   var program = o._program;
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = material.findBitmap(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindMaterial = function FG3dAutomaticEffect_bindMaterial(material){
   var o = this;
   var context = o._graphicContext;
   var info = material.info();
   if(info.optionDepth){
      context.setDepthMode(o._stateDepth, o._stateDepthCd);
   }else{
      context.setDepthMode(false);
   }
   if(info.optionAlpha){
      context.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      context.setBlendFactors(false);
   }
   if(info.optionDouble){
      context.setCullingMode(false);
   }else{
      context.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}
MO.FG3dAutomaticEffect_drawRenderable = function FG3dAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var info = renderable.activeInfo();
   var layout = info.layout;
   if(!layout){
      layout = info.layout = context.createLayout();
      if(o._supportLayout){
         layout.bind();
         o.bindAttributes(renderable);
         layout.unbind();
         layout.active();
      }else{
         context.recordBegin();
         o.bindAttributes(renderable);
         context.recordEnd();
         layout.linkBuffers(context.recordBuffers());
      }
      context.recordBegin();
      o.bindSamplers(renderable);
      context.recordEnd();
      layout.linkSamplers(context.recordSamplers());
   }else{
      if(o._supportLayout){
         layout.active();
      }else{
         layout.bindBuffers();
      }
      layout.bindSamplers();
   }
   var indexCount = 0;
   var indexBuffers = renderable.indexBuffers();
   if(indexBuffers){
      indexCount = indexBuffers.count();
   }
   if(indexCount > 1){
      var materials = renderable.materials();
      for(var i = 0; i < indexCount; i++){
         var indexBuffer = indexBuffers.at(i);
         if(materials){
            var material = materials.at(i);
            if(material){
               o.bindMaterialSamplers(renderable, material);
            }
         }
         context.drawTriangles(indexBuffer);
      }
   }else if(indexCount == 1){
      var indexBuffer = indexBuffers.first();
      context.drawTriangles(indexBuffer);
   }else{
      throw new MO.TError(o, 'Index buffer is not found.');
   }
   if(o._supportLayout){
      layout.deactive();
   }
}
MO.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectAutomaticEffect_drawRenderable;
   return o;
}
MO.FG3dSelectAutomaticEffect_drawRenderable = function FG3dSelectAutomaticEffect_drawRenderable(region, renderable, index){
   var o = this;
   var context = o._graphicContext;
   var size = context.size();
   var program = o._program;
   var selectX = region._selectX;
   var selectY = region._selectY;
   var material = renderable.material();
   var materialInfo = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', renderable.currentMatrix());
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   program.setParameter4('vc_offset', size.width, size.height, 1 - (selectX / size.width) * 2, (selectY / size.height) * 2 - 1);
   var i = index + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, materialInfo.alphaBase);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffers = renderable.indexBuffers();
   var count = indexBuffers.count();
   for(var i = 0; i < count; i++){
      var indexBuffer = indexBuffers.at(i);
      context.drawTriangles(indexBuffer);
   }
}
MO.FG3dSelectPass = function FG3dSelectPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'select';
   o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   o.construct     = MO.FG3dSelectPass_construct;
   o.setup         = MO.FG3dSelectPass_setup;
   o.drawRegion    = MO.FG3dSelectPass_drawRegion;
   return o;
}
MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._data = new Uint8Array(4);
   o._position = new MO.SPoint2();
}
MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var T = o._texture = c.createFlatTexture();
   T.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   T.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1, 1);
   t.textures().push(T);
   t.build();
}
MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(p){
   var o = this;
   var context = o._graphicContext;
   var handle = context.handle();
   context.setRenderTarget(o._renderTarget);
   context.clear(0, 0, 0, 0, 1, 1);
   var rs = p.allRenderables();
   o.activeEffects(p, rs);
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      context.setProgram(e.program());
      var d = r.display();
      if(!d){
         e.drawRenderable(p, r, i);
      }else if(!d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   context.clearDepth(1);
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      context.setProgram(e.program());
      var d = r.display();
      if(d && d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
   var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(v != 0){
      o._selectRenderable = rs.get(v - 1);
   }
}
MO.FG3dSelectSkeletonEffect = function FG3dSelectSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectSkeletonEffect_drawRenderable;
   return o;
}
MO.FG3dSelectSkeletonEffect_drawRenderable = function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
   var o = this;
   var c = o._graphicContext;
   var s = c.size();
   var p = o._program;
   var sx = pg._selectX;
   var sy = pg._selectY;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
   var i = pi + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
   o = MO.Class.inherits(this, o, FG3dTechnique);
   o._code       = 'select';
   o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   o.setup       = MO.FG3dSelectTechnique_setup;
   o.test        = MO.FG3dSelectTechnique_test;
   return o;
}
MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pd = o._passSelect = MO.Class.create(MO.FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}
MO.FG3dSelectTechnique_test = function FG3dSelectTechnique_test(region, x, y){
   var o = this;
   region._selectX = x;
   region._selectY = y;
   region.setTechnique(o);
   o.drawRegion(region);
   return o._passSelect._selectRenderable;
}
MO.FWglContext = function FWglContext(o){
   o = MO.Class.inherits(this, o, MO.FG3dContext);
   o._handle             = MO.Class.register(o, new MO.AGetter('_handle'));
   o._handleInstance     = null;
   o._handleLayout       = null;
   o._handleSamplerS3tc  = null;
   o._handleDebugShader  = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = null;
   o._parameters         = null;
   o._extensions         = null;
   o._statusRecord       = false;
   o._recordBuffers      = MO.Class.register(o, new MO.AGetter('_recordBuffers'));
   o._recordSamplers     = MO.Class.register(o, new MO.AGetter('_recordSamplers'));
   o._statusScissor      = false;
   o._data9              = null;
   o._data16             = null;
   o.construct           = MO.FWglContext_construct;
   o.isValid             = MO.FWglContext_isValid;
   o.linkCanvas          = MO.FWglContext_linkCanvas;
   o.parameter           = MO.FWglContext_parameter;
   o.parameters          = MO.FWglContext_parameters;
   o.extension           = MO.FWglContext_extension;
   o.extensions          = MO.FWglContext_extensions;
   o.recordBegin         = MO.FWglContext_recordBegin;
   o.recordEnd           = MO.FWglContext_recordEnd;
   o.createProgram       = MO.FWglContext_createProgram;
   o.createLayout        = MO.FWglContext_createLayout;
   o.createVertexBuffer  = MO.FWglContext_createVertexBuffer;
   o.createIndexBuffer   = MO.FWglContext_createIndexBuffer;
   o.createFlatTexture   = MO.FWglContext_createFlatTexture;
   o.createCubeTexture   = MO.FWglContext_createCubeTexture;
   o.createRenderTarget  = MO.FWglContext_createRenderTarget;
   o.setViewport         = MO.FWglContext_setViewport;
   o.setFillMode         = MO.FWglContext_setFillMode;
   o.setDepthMode        = MO.FWglContext_setDepthMode;
   o.setCullingMode      = MO.FWglContext_setCullingMode;
   o.setBlendFactors     = MO.FWglContext_setBlendFactors;
   o.setScissorRectangle = MO.FWglContext_setScissorRectangle;
   o.setRenderTarget     = MO.FWglContext_setRenderTarget;
   o.setProgram          = MO.FWglContext_setProgram;
   o.bindConst           = MO.FWglContext_bindConst;
   o.bindVertexBuffer    = MO.FWglContext_bindVertexBuffer;
   o.bindTexture         = MO.FWglContext_bindTexture;
   o.clear               = MO.FWglContext_clear;
   o.clearColor          = MO.FWglContext_clearColor;
   o.clearDepth          = MO.FWglContext_clearDepth;
   o.readPixels          = MO.FWglContext_readPixels;
   o.drawTriangles       = MO.FWglContext_drawTriangles;
   o.present             = MO.FWglContext_present;
   o.checkError          = MO.FWglContext_checkError;
   o.saveConfig          = MO.FWglContext_saveConfig;
   o.dispose             = MO.FWglContext_dispose;
   return o;
}
MO.FWglContext_construct = function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new MO.SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new MO.TObjects();
   o._recordSamplers = new MO.TObjects();
}
MO.FWglContext_isValid = function FWglContext_isValid(){
   return this._handle;
}
MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, hCanvas)
   o._hCanvas = hCanvas;
   if(hCanvas.getContext){
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      parameters.depth = true;
      parameters.stencil = false;
      parameters.premultipliedAlpha = false;
      var handle = null;
      var codes = ['experimental-webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
      var count = codes.length;
      for(var i = 0; i < count; i++){
         var code = codes[i];
         handle = hCanvas.getContext(code, parameters);
         if(handle){
            MO.Logger.debug(o, 'Create context3d. (code={1}, handle={2})', code, handle);
            break;
         }
      }
      if(!handle){
         MO.Logger.error(o, 'Create context3d failure.');
         var event = new MO.SEvent(o);
         event.code = MO.EGraphicError.UnsupportWebGL;
         event.message = "Current browser can't support WebGL technique.";
         MO.Window.processDeviceError(event);
         event.dispose();
         return false;
      }
      o._handle = handle;
      o._contextAttributes = handle.getContextAttributes();
   }else{
      var event = new MO.SEvent(o);
      event.code = MO.EGraphicError.UnsupportWebGL;
      event.message = "Canvas can't support WebGL technique.";
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var handle = o._handle;
   o.setDepthMode(true, MO.EG3dDepthMode.LessEqual);
   o.setCullingMode(true, MO.EG3dCullMode.Front);
   var capability = o._capability;
   capability.vendor = handle.getParameter(handle.VENDOR);
   capability.version = handle.getParameter(handle.VERSION);
   capability.shaderVersion = handle.getParameter(handle.SHADING_LANGUAGE_VERSION);
   capability.attributeCount = handle.getParameter(handle.MAX_VERTEX_ATTRIBS);
   capability.vertexConst = handle.getParameter(handle.MAX_VERTEX_UNIFORM_VECTORS);
   capability.varyingCount = handle.getParameter(handle.MAX_VARYING_VECTORS);
   capability.fragmentConst = handle.getParameter(handle.MAX_FRAGMENT_UNIFORM_VECTORS);
   capability.samplerCount = handle.getParameter(handle.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   capability.samplerSize = handle.getParameter(handle.MAX_TEXTURE_SIZE);
   var extension = o._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
   if(extension){
      capability.optionInstance = true;
   }
   capability.mergeCount = parseInt((capability.vertexConst - 32) / 4);
   var extension = o._handleLayout = handle.getExtension('OES_vertex_array_object');
   if(extension){
      capability.optionLayout = true;
   }
   var extension = handle.getExtension('OES_element_index_uint');
   if(extension){
      capability.optionIndex32 = true;
   }
   var extension = o._handleSamplerS3tc = handle.getExtension('WEBGL_compressed_texture_s3tc');
   if(extension){
      capability.samplerCompressRgb = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
      capability.samplerCompressRgba = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
   }
   var shader = capability.shader = new Object();
   var vertexPrecision = shader.vertexPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
      vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
      vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
      vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
      vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
      vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
   }
   var fragmentPrecision = shader.fragmentPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      fragmentPrecision.floatLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_FLOAT);
      fragmentPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_FLOAT);
      fragmentPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_FLOAT);
      fragmentPrecision.intLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_INT);
      fragmentPrecision.intMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_INT);
      fragmentPrecision.intHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_INT);
   }
   var extension = o._handleDebugShader = handle.getExtension('WEBGL_debug_shaders');
   if(extension){
      capability.optionShaderSource = true;
   }
   return true;
}
MO.FWglContext_parameter = function FWglContext_parameter(name){
   var parameters = this.parameters();
   return parameters[name];
}
MO.FWglContext_parameters = function FWglContext_parameters(){
   var o = this;
   var parameters = o._parameters;
   if(parameters){
      return parameters;
   }
   var names =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var handle = o._handle;
   var count = names.length;
   parameters = new Object();
   for(var i = 0; i < count; i++){
      var name = names[i];
      parameters[name] = handle.getParameter(handle[name]);
   }
   var extension = handle.getExtension('WEBGL_debug_renderer_info');
   if(extension){
      parameters['UNMASKED_RENDERER_WEBGL'] = handle.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      parameters['UNMASKED_VENDOR_WEBGL'] = handle.getParameter(extension.UNMASKED_VENDOR_WEBGL);
   }
   o._parameters = parameters;
   return parameters;
}
MO.FWglContext_extension = function FWglContext_extension(name){
   var extensions = this.extensions();
   return extensions[name];
}
MO.FWglContext_extensions = function FWglContext_extensions(){
   var o = this;
   var extensions = o._extensions;
   if(!extensions){
      extensions = o._extensions = new Object();
      var handle = o._handle;
      var names = handle.getSupportedExtensions();
      var count = names.length;
      for(var i = 0; i < count; i++){
         var name = names[i];
         extensions[name] = handle.getExtension(name);
      }
   }
   return extensions;
}
MO.FWglContext_recordBegin = function FWglContext_recordBegin(){
   var o = this;
   o._recordBuffers.clear();
   o._recordSamplers.clear();
   o._statusRecord = true;
}
MO.FWglContext_recordEnd = function FWglContext_recordEnd(){
   this._statusRecord = false;
}
MO.FWglContext_createProgram = function FWglContext_createProgram(){
   var o = this;
   var program = o.createObject(MO.FWglProgram);
   o._storePrograms.push(program);
   o._statistics._programTotal++;
   return program;
}
MO.FWglContext_createLayout = function FWglContext_createLayout(){
   var o = this;
   var layout = MO.Class.create(MO.FWglLayout);
   layout.linkGraphicContext(o);
   if(o._capability.optionLayout){
      layout.setup();
   }
   o._storeLayouts.push(layout);
   o._statistics._layoutTotal++;
   return layout;
}
MO.FWglContext_createVertexBuffer = function FWglContext_createVertexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglVertexBuffer));
   buffer.linkGraphicContext(o);
   buffer.setup();
   o._storeBuffers.push(buffer);
   o._statistics._vertexBufferTotal++;
   return buffer;
}
MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglIndexBuffer));
   o._storeBuffers.push(buffer);
   o._statistics._indexBufferTotal++;
   return buffer;
}
MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglFlatTexture));
   o._storeTextures.push(texture);
   o._statistics._flatTextureTotal++;
   return texture;
}
MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglCubeTexture));
   o._storeTextures.push(texture);
   o._statistics._cubeTextureTotal++;
   return texture;
}
MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglRenderTarget));
   o._storeTargets.push(target);
   o._statistics._targetTotal++;
   return target;
}
MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
   var o = this;
   o._size.set(width, height);
   o._viewportRectangle.set(left, top, width, height);
   o._handle.viewport(left, top, width, height);
   MO.Logger.debug(o, 'Context3d viewport. (location={1},{2}, size={3}x{4})', left, top, width, height);
}
MO.FWglContext_setFillMode = function FWglContext_setFillMode(fillModeCd){
   var o = this;
   var graphic = o._handle;
   if(o._fillModeCd == fillModeCd){
      return false;
   }
   o._statistics._frameFillModeCount++;
   switch(fillModeCd){
      case EG3dFillMode.Point:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
         break;
      case EG3dFillMode.Line:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
         break;
      case EG3dFillMode.Face:
         graphic.polygonMode(graphic.FRONT, graphic.FILL);
         break;
      default:
         throw new MO.TError('Invalid parameter. (fill_mode={1})', fillModeCd);
   }
   o._fillModeCd = fillModeCd;
   return true;
}
MO.FWglContext_setDepthMode = function FWglContext_setDepthMode(depthFlag, depthCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)){
      return false;
   }
   o._statistics._frameDepthModeCount++;
   if(o._optionDepth != depthFlag){
      if(depthFlag){
         graphic.enable(graphic.DEPTH_TEST);
      }else{
         graphic.disable(graphic.DEPTH_TEST);
      }
      o._optionDepth = depthFlag;
   }
   if(depthFlag && (o._depthModeCd != depthCd)){
      var depthCode = MO.RWglUtility.convertDepthMode(graphic, depthCd);
      graphic.depthFunc(depthCode);
      o._depthModeCd = depthCd;
   }
   return true;
}
MO.FWglContext_setCullingMode = function FWglContext_setCullingMode(cullFlag, cullCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)){
      return false;
   }
   o._statistics._frameCullModeCount++;
   if(o._optionCull != cullFlag){
      if(cullFlag){
         graphic.enable(graphic.CULL_FACE);
      }else{
         graphic.disable(graphic.CULL_FACE);
      }
      o._optionCull = cullFlag;
   }
   if(cullFlag && (o._cullModeCd != cullCd)){
      var cullValue = MO.RWglUtility.convertCullMode(graphic, cullCd);
      graphic.cullFace(cullValue);
      o._cullModeCd = cullCd;
   }
   return true;
}
MO.FWglContext_setBlendFactors = function FWglContext_setBlendFactors(blendFlag, sourceCd, tagetCd){
   var o = this;
   var graphic = o._handle;
   if((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)){
      return false;
   }
   o._statistics._frameBlendModeCount++;
   if(o._statusBlend != blendFlag){
      if(blendFlag){
         graphic.enable(graphic.BLEND);
      }else{
         graphic.disable(graphic.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = blendFlag;
   }
   if(blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))){
      var sourceValue = MO.RWglUtility.convertBlendFactors(graphic, sourceCd);
      var tagetValue = MO.RWglUtility.convertBlendFactors(graphic, tagetCd);
      graphic.blendFunc(sourceValue, tagetValue);
      o._blendSourceCd = sourceCd;
      o._blendTargetCd = tagetCd;
   }
   return true;
}
MO.FWglContext_setScissorRectangle = function FWglContext_setScissorRectangle(left, top, width, height){
   var o = this;
   var handle = o._handle;
   var scissorFlag = (width > 0) && (height > 0);
   if(o._statusScissor != scissorFlag){
      if(scissorFlag){
         handle.enable(handle.SCISSOR_TEST);
      }else{
         handle.disable(handle.SCISSOR_TEST);
      }
      o._statusScissor = scissorFlag;
   }
   if(scissorFlag){
      handle.scissor(left, top, width, height);
   }
}
MO.FWglContext_setRenderTarget = function FWglContext_setRenderTarget(renderTarget){
   var o = this;
   var graphic = o._handle;
   if(o._activeRenderTarget == renderTarget){
      return;
   }
   o._statistics._frameTargetCount++;
   var result = true;
   if(renderTarget == null){
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!result){
         return result;
      }
      graphic.viewport(0, 0, o._size.width, o._size.height);
   }else{
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._handle);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._handle);
      if(!result){
         return result;
      }
      var size = renderTarget.size();
      graphic.viewport(0, 0, size.width, size.height);
   }
   o._activeRenderTarget = renderTarget;
   return result;
}
MO.FWglContext_setProgram = function FWglContext_setProgram(program){
   var o = this;
   var graphic = o._handle;
   if(o._program == program){
      return;
   }
   o._statistics._frameProgramCount++;
   if(program){
      graphic.useProgram(program._handle);
   }else{
      graphic.useProgram(null);
   }
   o._program = program;
   return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._handle);
}
MO.FWglContext_bindConst = function FWglContext_bindConst(shaderCd, slot, formatCd, data, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameConstCount++;
   switch(formatCd){
      case MO.EG3dParameterFormat.Float1:{
         graphic.uniform1fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float2:{
         graphic.uniform2fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3:{
         graphic.uniform3fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4:{
         graphic.uniform4fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3x3:{
         var bytes = o._data9;
         bytes[ 0] = data[ 0];
         bytes[ 1] = data[ 4];
         bytes[ 2] = data[ 8];
         bytes[ 3] = data[ 1];
         bytes[ 4] = data[ 5];
         bytes[ 5] = data[ 9];
         bytes[ 6] = data[ 2];
         bytes[ 7] = data[ 6];
         bytes[ 8] = data[10];
         graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4x4:{
         var bytes = null;
         if(data.constructor == Float32Array){
            bytes = data;
         }else if(data.writeData){
            bytes = o._data16;
            data.writeData(bytes, 0);
         }else{
            throw new MO.TError('Unknown data type.');
         }
         graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown format type. (format_cd={1})', formatCd);
      }
   }
   return result;
}
MO.FWglContext_bindVertexBuffer = function FWglContext_bindVertexBuffer(slot, vertexBuffer, offset, formatCd){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameBufferCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutBuffer();
      layout.slot = slot;
      layout.buffer = vertexBuffer;
      layout.index = offset;
      layout.formatCd = formatCd;
      o._recordBuffers.push(layout);
   }
   var handle = null;
   if(vertexBuffer != null){
      handle = vertexBuffer._handle;
   }
   graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
   result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
   if(!result){
      return result;
   }
   if(vertexBuffer){
      graphic.enableVertexAttribArray(slot);
      result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
      if(!result){
         return result;
      }
   }else{
      graphic.disableVertexAttribArray(slot);
      result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
      return result;
   }
   var stride = vertexBuffer._stride;
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
         graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float2:
         graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float3:
         graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float4:
         graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4Normal:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
         break;
      default:
         throw new MO.TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
   }
   result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
   return result;
}
MO.FWglContext_bindTexture = function FWglContext_bindTexture(slot, index, texture){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameTextureCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutSampler();
      layout.slot = slot;
      layout.index = index;
      layout.texture = texture;
      o._recordSamplers.push(layout);
   }
   if(o._activeTextureSlot != slot){
      graphic.uniform1i(slot, index);
      graphic.activeTexture(graphic.TEXTURE0 + index);
      result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
      if(!result){
         return result;
      }
      o._activeTextureSlot = slot;
   }
   if(texture == null){
      graphic.bindTexture(graphic.TEXTURE_2D, null);
      result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
      return result;
   }
   var handle = texture._handle;
   var textureCd = texture.textureCd();
   switch(textureCd){
      case MO.EG3dTexture.Flat2d:{
         graphic.bindTexture(graphic.TEXTURE_2D, handle);
         result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      case MO.EG3dTexture.Cube:{
         graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
         result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown texture type.');
      }
   }
   return result;
}
MO.FWglContext_clear = function FWglContext_clear(red, green, blue, alpha, depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clearDepth(depth);
   graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearColor = function FWglContext_clearColor(red, green, blue, alpha){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clear(graphic.COLOR_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearDepth = function FWglContext_clearDepth(depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearDepth(depth);
   graphic.clear(graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_readPixels = function FWglContext_readPixels(left, top, width, height){
   var o = this;
   var graphic = o._handle;
   var length = 4 * width * height;
   var data = new Uint8Array(length);
   graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
   return data;
}
MO.FWglContext_drawTriangles = function FWglContext_drawTriangles(indexBuffer, offset, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   if(offset == null){
      offset = 0;
   }
   if(count == null){
      count = indexBuffer.count();
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._handle);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._handle);
   if(!result){
       return result;
   }
   var strideCd = indexBuffer.strideCd();
   var strideValue = MO.RWglUtility.convertIndexStride(graphic, strideCd);
   var offsetValue = 0;
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         offsetValue = offset << 1;
         break;
      case MO.EG3dIndexStride.Uint32:
         offsetValue = offset << 2;
         break;
   }
   var drawModeCd = indexBuffer.drawModeCd();
   var drawModeValue = MO.RWglUtility.convertDrawMode(graphic, drawModeCd);
   switch(drawModeCd){
      case MO.EG3dDrawMode.Line:
         break;
   }
   graphic.drawElements(drawModeValue, count, strideValue, offsetValue);
   o._statistics._frameTriangleCount += count;
   o._statistics._frameDrawCount++;
   result = o.checkError("drawElements", "Draw triangles failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   return result;
}
MO.FWglContext_present = function FWglContext_present(){
}
MO.FWglContext_checkError = function FWglContext_checkError(code, message, parameter1){
   var o = this;
   if(!o._capability.optionDebug){
      return true;
   }
   if(!MO.Runtime.isDebug()){
      return true;
   }
   var graphic = o._handle;
   var result = false;
   var error = null;
   var errorInfo = null;
   while(true){
      error = graphic.getError();
      if(error == graphic.NO_ERROR){
         result = true;
         break;
      }
      switch(error){
         case graphic.INVALID_OPERATION:
            errorInfo = "Invalid operation.";
            break;
         case graphic.INVALID_ENUM:
            errorInfo = "Invalid enum.";
            break;
         case graphic.INVALID_VALUE:
            errorInfo = "Invalid value.";
            break;
         case graphic.INVALID_FRAMEBUFFER_OPERATION:
            errorInfo = "Invalid paramebuffer opeartion.";
            break;
         case graphic.OUT_OF_MEMORY:
            errorInfo = "Out of memory.";
            break;
         default:
            errorInfo = "Unknown";
            break;
      }
   }
   if(!result){
      MO.Logger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
   }
   return result;
}
MO.FWglContext_saveConfig = function FWglContext_saveConfig(xconfig){
   var o = this;
   var parameters = o.parameters();
   var xparameters = xconfig.create('Parameters');
   MO.Lang.Xml.saveObject(xparameters, 'Parameter', parameters);
   var extensions = o.extensions();
   var xextensions = xconfig.create('Extensions');
   MO.Lang.Xml.saveObject(xextensions, 'Extension', extensions);
}
MO.FWglContext_dispose = function FWglContext_dispose(){
   var o = this;
   o._data9 = null;
   o._data16 = null;
   o._recordBuffers = MO.Lang.Object.dispose(o._recordBuffers);
   o._recordSamplers = MO.Lang.Object.dispose(o._recordSamplers);
   o._contextAttributes = null;
   o._parameters = null;
   o._extensions = null;
   o._activeTextureSlot = null;
   o._handleSamplerS3tc = null;
   o._handleDebugShader = null;
   o.__base.FG3dContext.dispose.call(o);
}
MO.FWglCubeTexture = function FWglCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dCubeTexture);
   o._handle    = null;
   o.setup      = MO.FWglCubeTexture_setup;
   o.isValid    = MO.FWglCubeTexture_isValid;
   o.makeMipmap = MO.FWglCubeTexture_makeMipmap;
   o.upload     = MO.FWglCubeTexture_upload;
   o.update     = MO.FWglCubeTexture_update;
   o.dispose    = MO.FWglCubeTexture_dispose;
   return o;
}
MO.FWglCubeTexture_setup = function FWglCubeTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglCubeTexture_isValid = function FWglCubeTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglCubeTexture_makeMipmap = function FWglCubeTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.generateMipmap(g.TEXTURE_CUBE_MAP);
}
MO.FWglCubeTexture_upload = function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._graphicContext;
   var g = c._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
   o.update();
}
MO.FWglCubeTexture_update = function FWglCubeTexture_update(){
   var o = this;
   o.__base.FG3dCubeTexture.update.call(o);
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
   }
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMagCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
   }
}
MO.FWglCubeTexture_dispose = function FWglCubeTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._handle;
   if(n){
      c._handle.deleteTexture(n);
      o._handle = null;
   }
   o.__base.FG3dCubeTexture.dispose.call(o);
}
MO.FWglFlatTexture = function FWglFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dFlatTexture);
   o._handle    = null;
   o.setup      = MO.FWglFlatTexture_setup;
   o.isValid    = MO.FWglFlatTexture_isValid;
   o.texture    = MO.FWglFlatTexture_texture;
   o.makeMipmap = MO.FWglFlatTexture_makeMipmap;
   o.uploadData = MO.FWglFlatTexture_uploadData;
   o.upload     = MO.FWglFlatTexture_upload;
   o.update     = MO.FWglFlatTexture_update;
   o.dispose    = MO.FWglFlatTexture_dispose;
   return o;
}
MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
   return this;
}
MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_2D, o._handle);
   g.generateMipmap(g.TEXTURE_2D);
}
MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(content, width, height){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   var data = null;
   if(content.constructor == ArrayBuffer){
      data = new Uint8Array(content);
   }else if(content.constructor == Uint8Array){
      data = content;
   }else{
      throw new MO.TError('Invalid content format.');
   }
   o.width = width;
   o.height = height;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, width, height, 0, handle.RGBA, handle.UNSIGNED_BYTE, data);
   o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
   o.update();
}
MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(content){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var handle = context._handle;
   var data = null;
   var tagName = content.tagName;
   if((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
   }else if(MO.Class.isClass(content, MO.MCanvasObject)){
      data = content.htmlCanvas();
   }else{
      throw new TError('Invalid image format.');
   }
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   if(o._optionFlipY){
      handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
   }
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
   o.update();
   o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
}
MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
   var o = this;
   o.__base.FG3dFlatTexture.update.call(o);
   var handle = o._graphicContext._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapS);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapT);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
   }
}
MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteTexture(handle);
      o._handle = null;
   }
   o.__base.FG3dFlatTexture.dispose.call(o);
}
MO.FWglFragmentShader = function FWglFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dFragmentShader);
   o._handle      = null;
   o.setup        = MO.FWglFragmentShader_setup;
   o.targetSource = MO.FWglFragmentShader_targetSource;
   o.upload       = MO.FWglFragmentShader_upload;
   o.dispose      = MO.FWglFragmentShader_dispose;
   return o;
}
MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.FRAGMENT_SHADER);
}
MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dFragmentShader.dispose.call(o);
}
MO.FWglIndexBuffer = function FWglIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dIndexBuffer);
   o._handle = null;
   o.setup   = MO.FWglIndexBuffer_setup;
   o.isValid = MO.FWglIndexBuffer_isValid;
   o.upload  = MO.FWglIndexBuffer_upload;
   o.dispose = MO.FWglIndexBuffer_dispose;
   return o;
}
MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._handle = o._graphicContext._handle.createBuffer();
}
MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
   var o = this;
   var handle = o._graphicContext._handle;
   return handle.isBuffer(o._handle);
}
MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(data, count, remain){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   if(remain){
      o._data = data;
   }
   o._count = count;
   var memory = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      if(o._strideCd == MO.EG3dIndexStride.Uint16){
         memory = new Uint16Array(data);
      }else if(o._strideCd == MO.EG3dIndexStride.Uint32){
         memory = new Uint32Array(data);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(data.constructor == Uint16Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else if(data.constructor == Uint32Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', data);
   }
   handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bind buffer failure.');
   handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
   context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
}
MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var handle = o._handle;
   if(handle){
      context._handle.deleteBuffer(handle);
      o._handle = null;
   }
   o.__base.FG3dIndexBuffer.dispose.call(o);
}
MO.FWglLayout = function FWglLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dLayout);
   o._handle  = null;
   o.setup    = MO.FWglLayout_setup;
   o.bind     = MO.FWglLayout_bind;
   o.unbind   = MO.FWglLayout_unbind;
   o.active   = MO.FWglLayout_active;
   o.deactive = MO.FWglLayout_deactive;
   o.dispose  = MO.FWglLayout_dispose;
   return o;
}
MO.FWglLayout_setup = function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._handle = c._handleLayout.createVertexArrayOES();
}
MO.FWglLayout_bind = function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_unbind = function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_active = function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_deactive = function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_dispose = function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var layout = o._handle;
   if(layout){
      c._handleLayout.deleteVertexArrayOES(layout);
      o._handle = null;
   }
   o.__base.FG3dLayout.dispose.call(o);
}
MO.FWglProgram = function FWglProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dProgram);
   o._handle        = null;
   o.setup          = MO.FWglProgram_setup;
   o.vertexShader   = MO.FWglProgram_vertexShader;
   o.fragmentShader = MO.FWglProgram_fragmentShader;
   o.upload         = MO.FWglProgram_upload;
   o.build          = MO.FWglProgram_build;
   o.link           = MO.FWglProgram_link;
   o.dispose        = MO.FWglProgram_dispose;
   return o;
}
MO.FWglProgram_setup = function FWglProgram_setup(){
   var o = this;
   var c = g = o._graphicContext;
   o._handle = c._handle.createProgram();
}
MO.FWglProgram_vertexShader = function FWglProgram_vertexShader(){
   var o = this;
   var shader = o._vertexShader;
   if(!shader){
      shader = o._vertexShader = MO.Class.create(MO.FWglVertexShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
   var o = this;
   var shader = o._fragmentShader;
   if(!shader){
      shader = o._fragmentShader = MO.Class.create(MO.FWglFragmentShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_upload = function FWglProgram_upload(shaderCd, source){
   var o = this;
   if(shaderCd == MO.EG3dShader.Vertex){
      o.vertexShader().upload(source);
   }else if(shaderCd == MO.EG3dShader.Fragment){
      o.fragmentShader().upload(source);
   }else{
      throw new Error('Unknown type');
   }
}
MO.FWglProgram_build = function FWglProgram_build(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var pn = o._handle;
   var vertexShader = o.vertexShader();
   g.attachShader(pn, vertexShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vertexShader._handle);
   if(!result){
      return result;
   }
   var fragmentShader = o.fragmentShader();
   g.attachShader(pn, fragmentShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fragmentShader._handle);
   if(!result){
      return result;
   }
   if(o.hasAttribute()){
      var attributes = o.attributes();
      var ac = attributes.count();
      for(var n = 0; n < ac; n++){
         var attribute = attributes.at(n);
         var attributeName = attribute.name();
         g.bindAttribLocation(pn, n, attributeName);
         result = context.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, attributeName);
         if(!result){
            return result;
         }
      }
   }
}
MO.FWglProgram_link = function FWglProgram_link(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var result = false;
   var pn = o._handle;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      MO.Logger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._handle);
      o._handle = null;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   result = context.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!result){
      return result;
   }
   if(o.hasParameter()){
      var count = o._parameters.count();
      for(var n = 0; n < count; n++){
         var parameter = o._parameters.at(n);
         var handle = g.getUniformLocation(pn, parameter.name());
         result = context.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, parameter.name(), handle);
         if(!result){
            return result;
         }
         parameter._slot = handle;
         if(handle != null){
            parameter._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var count = o._attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = o._attributes.at(n);
         var handle = g.getAttribLocation(pn, attribute.name());
         result = context.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, attribute.name(), handle);
         if(!result){
            return result;
         }
         attribute._slot = handle;
         if(handle != -1){
            attribute._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var count = o._samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.at(n);
         var handle = g.getUniformLocation(pn, sampler.name());
         result = context.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, sampler.name(), handle);
         if(!result){
            return result;
         }
         sampler._slot = handle;
         if(handle != null){
            sampler._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.value(n);
         if(sampler._statusUsed){
            sampler._index = si++;
         }
      }
   }
   return result;
}
MO.FWglProgram_dispose = function FWglProgram_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteProgram(handle);
      o._handle = null;
   }
   o.__base.FG3dProgram.dispose.call(o);
}
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   o._optionDepth = true;
   o._handle      = null;
   o._handleDepth = null;
   o.setup        = MO.FWglRenderTarget_setup;
   o.build        = MO.FWglRenderTarget_build;
   o.dispose      = MO.FWglRenderTarget_dispose;
   return o;
}
MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._handle;
   o._handle = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
   var o = this;
   var s = o._size;
   var c = o._graphicContext;
   var g = c._handle;
   g.bindFramebuffer(g.FRAMEBUFFER, o._handle);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._handleDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, s.width, s.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._handle);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._handle, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._handle, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, t._handle);
      if(!r){
         return r;
      }
   }
}
MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._handleDepth;
   if(n){
      c._handle.deleteRenderbuffer(n);
      o._handleDepth = null;
   }
   var n = o._handle;
   if(n){
      c._handle.deleteFramebuffer(n);
      o._handle = null;
   }
   o.__base.FG3dRenderTarget.dispose.call(o);
}
MO.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexBuffer);
   o._handle = null;
   o.setup   = MO.FWglVertexBuffer_setup;
   o.isValid = MO.FWglVertexBuffer_isValid;
   o.upload  = MO.FWglVertexBuffer_upload;
   o.dispose = MO.FWglVertexBuffer_dispose;
   return o;
}
MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createBuffer();
}
MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
   var o = this;
   var graphic = o._graphicContext._handle;
   return graphic.isBuffer(o._handle);
}
MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count, remain){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._handle;
   if(remain){
      o._data = data;
   }
   o._stride = stride;
   o._count = count;
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case MO.EG3dAttributeFormat.Float1:
         case MO.EG3dAttributeFormat.Float2:
         case MO.EG3dAttributeFormat.Float3:
         case MO.EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new MO.TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new MO.TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bindbuffer');
   graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
   context.checkError('bufferData', 'bufferData');
}
MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var buffer = o._handle;
   if(buffer){
      context._handle.deleteBuffer(buffer);
      o._handle = null;
   }
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
MO.FWglVertexShader = function FWglVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexShader);
   o._handle      = null;
   o.setup        = MO.FWglVertexShader_setup;
   o.targetSource = MO.FWglVertexShader_targetSource;
   o.upload       = MO.FWglVertexShader_upload;
   o.dispose      = MO.FWglVertexShader_dispose;
   return o;
}
MO.FWglVertexShader_setup = function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.VERTEX_SHADER);
}
MO.FWglVertexShader_targetSource = function FWglVertexShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglVertexShader_upload = function FWglVertexShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglVertexShader_dispose = function FWglVertexShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dVertexShader.dispose.call(o);
}
MO.RWglUtility = function RWglUtility(){
   return this;
}
MO.RWglUtility.prototype.convertFillMode = function RWglUtility_convertFillMode(graphic, fillCd){
   switch(fillCd){
      case MO.EG3dFillMode.Point:
         return graphic.POINT;
      case MO.EG3dFillMode.Line:
         return graphic.LINE;
      case MO.EG3dFillMode.Face:
         return graphic.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
}
MO.RWglUtility.prototype.convertDrawMode = function RWglUtility_convertDrawMode(graphic, drawCd){
   switch(drawCd){
      case MO.EG3dDrawMode.Point:
         return graphic.POINTS;
      case MO.EG3dDrawMode.Lines:
         return graphic.LINES;
      case MO.EG3dDrawMode.LineStrip:
         return graphic.LINE_STRIP;
      case MO.EG3dDrawMode.LineLoop:
         return graphic.LINE_LOOP;
      case MO.EG3dDrawMode.Triangles:
         return graphic.TRIANGLES;
      case MO.EG3dDrawMode.TriangleStrip:
         return graphic.TRIANGLE_STRIP;
      case MO.EG3dDrawMode.TriangleFan:
         return graphic.TRIANGLE_FAN;
      case MO.EG3dDrawMode.Quads:
         return graphic.QUADS;
      case MO.EG3dDrawMode.QuadStrip:
         return graphic.QUAD_STRIP;
   }
   throw new TError(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
}
MO.RWglUtility.prototype.convertCullMode = function RWglUtility_convertCullMode(graphic, cullCd){
   switch(cullCd){
      case MO.EG3dCullMode.Front:
         return graphic.FRONT;
      case MO.EG3dCullMode.Back:
         return graphic.BACK;
      case MO.EG3dCullMode.Both:
         return graphic.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
}
MO.RWglUtility.prototype.convertDepthMode = function RWglUtility_convertDepthMode(graphic, depthCd){
   switch(depthCd){
      case MO.EG3dDepthMode.Equal:
         return graphic.EQUAL;
      case MO.EG3dDepthMode.NotEqual:
         return graphic.NOTEQUAL;
      case MO.EG3dDepthMode.Less:
         return graphic.LESS;
      case MO.EG3dDepthMode.LessEqual:
         return graphic.LEQUAL;
      case MO.EG3dDepthMode.Greater:
         return graphic.GREATER;
      case MO.EG3dDepthMode.GreaterEqual:
         return graphic.GEQUAL;
      case MO.EG3dDepthMode.Always:
         return graphic.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
}
MO.RWglUtility.prototype.convertBlendFactors = function RWglUtility_convertBlendFactors(graphic, blendCd){
   switch(blendCd){
      case MO.EG3dBlendMode.Zero:
         return graphic.ZERO;
      case MO.EG3dBlendMode.One:
         return graphic.ONE;
      case MO.EG3dBlendMode.SrcColor:
         return graphic.SRC_COLOR;
      case MO.EG3dBlendMode.OneMinusSrcColor:
         return graphic.ONE_MINUS_SRC_COLOR;
      case MO.EG3dBlendMode.DstColor:
         return graphic.DST_COLOR;
      case MO.EG3dBlendMode.OneMinusDstColor:
         return graphic.ONE_MINUS_DST_COLOR;
      case MO.EG3dBlendMode.SrcAlpha:
         return graphic.SRC_ALPHA;
      case MO.EG3dBlendMode.OneMinusSrcAlpha:
         return graphic.ONE_MINUS_SRC_ALPHA;
      case MO.EG3dBlendMode.DstAlpha:
         return graphic.DST_ALPHA;
      case MO.EG3dBlendMode.OneMinusDstAlpha:
         return graphic.ONE_MINUS_DST_ALPHA;
      case MO.EG3dBlendMode.SrcAlphaSaturate:
         return graphic.SRC_ALPHA_SATURATE;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
}
MO.RWglUtility.prototype.convertIndexStride = function RWglUtility_convertIndexStride(graphic, strideCd){
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         return graphic.UNSIGNED_SHORT;
      case MO.EG3dIndexStride.Uint32:
         return graphic.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", strideCd);
}
MO.RWglUtility.prototype.convertSamplerFilter = function RWglUtility_convertSamplerFilter(graphic, filterCd){
   switch(filterCd){
      case MO.EG3dSamplerFilter.Unknown:
         return 0;
      case MO.EG3dSamplerFilter.Nearest:
         return graphic.NEAREST;
      case MO.EG3dSamplerFilter.Linear:
         return graphic.LINEAR;
      case MO.EG3dSamplerFilter.Repeat:
         return graphic.REPEAT;
      case MO.EG3dSamplerFilter.ClampToEdge:
         return graphic.CLAMP_TO_EDGE;
      case MO.EG3dSamplerFilter.ClampToBorder:
         return graphic.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
}
MO.RWglUtility = new MO.RWglUtility();
