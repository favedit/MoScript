var MO = new function MO(){
   return this;
}
MO.ELogger = new function ELogger(){
   var o = this;
   o.Debug = 'D';
   o.Info  = 'I';
   o.Warn  = 'W';
   o.Error = 'E';
   o.Fatal = 'F';
   return o;
}
MO.EProcess = new function EProcess(){
   var o = this;
   o.Debug = 1;
   o.Release = 2;
   return o;
}
MO.EScope = new function EScope(){
   var o = this;
   o.Local = 1;
   o.Session = 2;
   o.Global = 4;
   return o;
}
MO.RRuntime = new function RRuntime(){
   var o = this;
   o._processCd    = MO.EProcess.Release;
   o._supportHtml5 = false;
   o._nextUid      = 1;
   o.construct     = RRuntime_construct;
   o.isDebug       = RRuntime_isDebug;
   o.isRelease     = RRuntime_isRelease;
   o.supportHtml5  = RRuntime_supportHtml5;
   o.nvl           = RRuntime_nvl;
   o.subString     = RRuntime_subString;
   o.className     = RRuntime_className;
   o.uid           = RRuntime_uid;
   o.construct();
   return o;
   function RRuntime_construct(){
      var o = this;
      if(window.applicationCache){
         o._supportHtml5 = true;
      }
   }
   function RRuntime_isDebug(){
      return (this._processCd == MO.EProcess.Debug);
   }
   function RRuntime_isRelease(){
      return (this._processCd == MO.EProcess.Release);
   }
   function RRuntime_supportHtml5(){
      return this._supportHtml5;
   }
   function RRuntime_nvl(v, d){
      return (v != null) ? v : d;
   }
   function RRuntime_subString(v, b, e){
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
   function RRuntime_className(v){
      if(v){
         if(typeof(v) == 'function'){
            return this.subString(v.toString(), 'function ', '(');
         }
         var c = v.constructor;
         if(c){
            return this.subString(c.toString(), 'function ', '(');
         }
      }
      return null;
   }
   function RRuntime_uid(v){
      var r = v.__puuid;
      if(r == null){
         r = v.__puuid = RRuntime._nextUid++;
      }
      return r;
   }
}
MO.SLooperEntry = function SLooperEntry(){
   var o = this;
   o.prior   = null;
   o.next    = null;
   o.value   = null;
   o.dispose = SLooperEntry_dispose;
   return o;
}
function SLooperEntry_dispose(){
   var o = this;
   o.prior = null;
   o.next = null;
   o.value = null;
}
MO.TArray = function TArray(){
   var o = this;
   o._length  = 0;
   o._memory  = new Array();
   o.isEmpty  = TArray_isEmpty;
   o.length   = TArray_length;
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
   function TArray_isEmpty(){
      return this._length == 0;
   }
   function TArray_length(){
      return this._length;
   }
   function TArray_contains(v){
      return this.indexOf(v) != -1;
   }
   function TArray_indexOf(v){
      var o = this;
      var c = o._length;
      for(var n = 0; n < c; n++){
         if(o._memory[n] == v){
            return n;
         }
      }
      return -1;
   }
   function TArray_get(n){
      return ((n >= 0) && (n < this._length)) ? this._memory[n] : null;
   }
   function TArray_set(n, v){
      if((n >= 0) && (n < this._length)){
         this._memory[n] = v;
      }
   }
   function TArray_push(v){
      this._memory[this._length++] = v;
   }
   function TArray_swap(l, r){
      if((l >= 0) && (l < this._length) && (r >= 0) && (r < this._length) && (l != r)){
         var v = this._memory[l];
         this._memory[l] = this._memory[r];
         this._memory[r] = v;
      }
   }
   function TArray_sort(){
      this._memory.sort();
   }
   function TArray_erase(i){
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
   function TArray_remove(v){
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
   function TArray_compress(){
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
   function TArray_clear(){
      this._length = 0;
   }
   function TArray_dispose(){
      var o = this;
      o._length = 0;
      o._memory = null;
   }
   function TArray_dump(){
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
MO.TAttributes = function TAttributes(o){
   var o = this;
   MO.TDictionary.call(o);
   o.join   = TAttributes_join;
   o.split  = TAttributes_split;
   o.pack   = TAttributes_pack;
   o.unpack = TAttributes_unpack;
   o.dump   = TAttributes_dump;
   return o;
   function TAttributes_join(n, v){
      var o = this;
      var r = new TString();
      if(!n){
         n = '=';
      }
      if(!v){
         v = ',';
      }
      var c = o.count;
      for(var i = 0; i < c; i++){
         if(i > 0){
            r.append(v);
         }
         r.append(o.names[i]);
         r.append(n);
         r.append(o.values[i]);
      }
      return r.toString();
   }
   function TAttributes_split(s, n, v){
      var o = this;
      var ss = s.split(v);
      var c = ss.length;
      for(var i = 0; i < c; i++){
         var ln = ss[i];
         if(ln.length){
            var sb = ln.split(n);
            if(sb.length == 2){
               o.set(sb[0], sb[1]);
            }else{
               o.set(ln, '');
            }
         }
      }
   }
   function TAttributes_pack(){
      var o = this;
      var p = new TString();
      var c = o.count;
      for(var n = 0; n < c; n++){
         var l = o.names[n].length;
         p.append(l.toString().length, l, o.names[n]);
         if(o.values[n] != null){
            var v = o.values[n] + '';
            l = v.length;
            p.append(l.toString().length, l, v);
         }else{
            p.append('0');
         }
      }
      return p.toString();
   }
   function TAttributes_unpack(p){
      if(p && p.length){
         var o = this;
         var n = null;
         var v = null;
         var f = 0;
         o.count = 0;
         var pl = p.length;
         while(f < pl){
            var ll = parseInt(p.substr(f++, 1));
            var l = parseInt(p.substr(f, ll));
            n = p.substr(f + ll, l);
            f += ll + l;
            ll = parseInt(p.substr(f++, 1));
            if(ll == 0){
               v = null;
            }else{
               l = parseInt(p.substr(f, ll));
               v = p.substr(f + ll, l);
               f += ll + l;
            }
            o.set(n, v);
         }
      }
   }
   function TAttributes_dump(){
      var o = this;
      var r = new TString();
      var c = o._count;
      r.append(RRuntime.className(o), ' : ', c);
      if(c > 0){
         r.append(' (');
         for(var i = 0; i < c; i++){
            if(i > 0){
               r.append(', ');
            }
            r.append(o._names[i], '=', o._values[i]);
         }
         r.append(')');
      }
      return r.flush();
   }
}
MO.TDictionary = function TDictionary(o){
   var o = this;
   MO.TMap.call(o);
   o.dump = TDictionary_dump;
   return o;
   function TDictionary_dump(){
      var o = this;
      var r = new TString();
      var c = o._count;
      r.append(RRuntime.className(o), ': ', c);
      if(c > 0){
         r.append(' {\n');
         for(var i = 0; i < c; i++){
            r.append('   ', o._names[i], '=[', o._values[i], ']\n');
         }
         r.append('}');
      }
      return r.flush();
   }
}
MO.TList = function TList(){
   var o = this;
   o.count      = 0;
   o.memory     = new Array();
   o.isEmpty    = TList_isEmpty;
   o.contains   = TList_contains;
   o.indexOf    = TList_indexOf;
   o.first      = TList_first;
   o.last       = TList_last;
   o.get        = TList_get;
   o.set        = TList_set;
   o.append     = TList_append;
   o.insert     = TList_insert;
   o.push       = TList_push;
   o.pushUnique = TList_pushUnique;
   o.pop        = TList_pop;
   o.swap       = TList_swap;
   o.sort       = TList_sort;
   o.erase      = TList_erase;
   o.remove     = TList_remove;
   o.clear      = TList_clear;
   o.compress   = TList_compress;
   o.pack       = TList_pack;
   o.dispose    = TList_dispose;
   o.dump       = TList_dump;
   return o;
   function TList_isEmpty(){
      return (this.count == 0);
   }
   function TList_contains(v){
      return this.indexOf(v) != -1;
   }
   function TList_indexOf(v){
      var o = this;
      var c = o.count;
      for(var n = 0; n < c; n++){
         if(o.memory[n] == v){
            return n;
         }
      }
      return -1;
   }
   function TList_first(){
      var o = this;
      return o.count ? this.memory[0] : null;
   }
   function TList_last(){
      var o = this;
      return o.count ? this.memory[o.count - 1] : null;
   }
   function TList_get(n){
      return ((n >= 0) && (n < this.count)) ? this.memory[n] : null;
   }
   function TList_set(n, v){
      if((n >= 0) && (n < this.count)){
         this.memory[n] = v;
      }
   }
   function TList_append(v){
      var o = this;
      var c = v.count;
      for(var n = 0; n < c; n++){
         o.push(v.get(n));
      }
   }
   function TList_insert(i, v){
      var o = this;
      var c = o.count;
      if((i >= 0) && (i <= c)){
         for(var n = c; n > i; n--){
            o.memory[n] = o.memory[n - 1];
         }
         o.memory[i] = v;
      }
   }
   function TList_push(v){
      var n = this.count++;
      this.memory[n] = v;
      return n;
   }
   function TList_pushUnique(v){
      var o = this;
      for(var n = o.count-1; n >= 0; n--){
         if(o.memory[n] == v){
            return n;
         }
      }
      var n = o.count++;
      o.memory[n] = v;
      return n;
   }
   function TList_pop(){
      var o = this;
      if(o.count){
         return o.memory[--o.count];
      }
   }
   function TList_swap(l, r){
      var o = this;
      if((l >= 0) && (l < o.count) && (r >= 0) && (r < o.count) && (l != r)){
         var v = o.memory[l];
         o.memory[l] = this.memory[r];
         o.memory[r] = v;
      }
   }
   function TList_sort(){
      this.memory.sort();
   }
   function TList_erase(n){
      var v = null;
      var o = this;
      if((n >= 0) && (n < o.count)){
         v = o.memory[n];
         var c = --o.count;
         for(var i = n; i < c; i++){
            o.memory[i] = o.memory[i+1];
         }
      }
      return v;
   }
   function TList_remove(v){
      if(v != null){
         var o = this;
         var c = o.count;
         if(c > 0){
            var n = 0;
            for(var i = n; i < c; i++){
               if(o.memory[i] != v){
                  o.memory[n++] = o.memory[i];
               }
            }
            o.count = n;
         }
      }
      return v;
   }
   function TList_clear(){
      this.count = 0;
   }
   function TList_compress(){
      var o = this;
      var c = o.count;
      if(c > 0){
         var l = 0;
         for(var n = 0; n < c; n++){
            var v = o.memory[n];
            if(v != null){
               o.memory[l++] = v;
            }
         }
         o.count = l;
      }
   }
   function TList_pack(){
      var o = this;
      var ss = new TStrings();
      for(var n = 0; n < o.count; n++){
         ss.push(o.get(n).pack());
      }
      return ss.pack();
   }
   function TList_dispose(){
      var o = this;
      o.count = 0;
      for(var n in o.memory){
         delete o.memory[n];
      }
      o.memory = null;
   }
   function TList_dump(){
      var o = this;
      var c = o.count;
      var r = new TString();
      r.append(RClass.name(o), ':', c);
      if(c > 0){
         for(var n = 0; n < c; n++){
            r.append(' [', o.memory[n], ']');
         }
      }
      return r.toString();
   }
}
MO.TLooper = function TLooper(){
   var o = this;
   o._count             = 0;
   o._recordCount       = 0;
   o._current           = null;
   o._unused            = null;
   o.innerCreate        = TLooper_innerCreate;
   o.innerFree          = TLooper_innerFree;
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
   function TLooper_innerCreate(){
      var o = this;
      var e = o._unused;
      if(e == null){
         e = new SLooperEntry();
      }else{
         o._unused = e.next;
      }
      return e;
   }
   function TLooper_innerFree(p){
      var o = this;
      p.next = o._unused;
      o._unused = p;
   }
   function TLooper_innerPush(p){
      var o = this;
      var ec = o._current;
      if(ec){
         var ep = ec.prior;
         p.prior = ep;
         p.next = ec;
         ep.next = p;
         ec.prior = p;
      }else{
         p.prior = p;
         p.next = p;
         o._current = p;
      }
      o._count++;
   }
   function TLooper_innerRemove(p){
      var o = this;
      var ep = p.prior;
      var en = p.next;
      ep.next = en;
      en.prior = ep;
      o._count--;
      if(o._count > 0){
         o._current = en;
      }else{
         o._current = null;
      }
      o.innerFree(p);
   }
   function TLooper_innerRemoveCurrent(){
      var o = this;
      var r = null;
      if(o._count > 0){
         r = o._current.value;
         o.innerRemove(o._current);
      }
      return r;
   }
   function TLooper_innerRemoveValue(p){
      if(o._count > 0){
         if(o._current.value == p){
            o.innerRemoveCurrent();
            return;
         }
         var ec = o._current;
         var en = ec.next;
         while(en != ec){
            if(en.value == p){
               o.innerRemove(en);
               o._current = ec;
               return;
            }
            en = en.next;
         }
      }
   }
   function TLooper_isEmpty(v){
      return this._count == 0;
   }
   function TLooper_count(){
      return this._count;
   }
   function TLooper_record(){
      this._recordCount = this._count;
   }
   function TLooper_unrecord(v){
      this._recordCount = -1;
   }
   function TLooper_contains(p){
      var o = this;
      if(o._current){
         var c = o._count;
         var e = o._current;
         for(var i = 0; i < c; i++){
            if(e.value == p){
               return true;
            }
            e = e.next;
         }
      }
      return false;
   }
   function TLooper_current(){
      var e = this._current;
      return e ? e.value : null;
   }
   function TLooper_next(){
      var o = this;
      if(o._current){
         o._current = o._current.next;
      }
      var c = o._recordCount;
      if(c > 0){
         o._recordCount--;
      }else if(c == 0){
         return null;
      }
      return o._current ? o._current.value : null;
   }
   function TLooper_push(p){
      var o = this;
      var e = o.innerCreate();
      e.value = p;
      o.innerPush(e);
   }
   function TLooper_pushUnique(p){
      var o = this;
      if(!o.contains(p)){
         o.push(p);
      }
   }
   function TLooper_removeCurrent(){
      return this.innerRemoveCurrent();
   }
   function TLooper_remove(p){
      this.innerRemoveValue(p);
   }
   function TLooper_clear(){
      var o = this;
      var c = o._current;
      if(c){
         c.prior.next = null;
         c.prior = o._unused;
         o._unused = c;
         o._current = null;
      }
      o._count = 0;
   }
   function TLooper_dispose(){
      var o = this;
      o.clear();
      var e = o._unused;
      while(e){
         var n = e.next;
         e.dispose();
         e = n;
      }
      o._unused = null;
   }
   function TLooper_dump(){
      var o = this;
      var c = o._count;
      var r = new TString();
      r.append(RClass.name(this), ': ', c);
      if(c > 0){
         var e = o._current;
         for(var i = 0; i < c; i++){
            r.append(' [', e.value, ']');
            e = e.next;
         }
      }
      return r.toString();
   }
}
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
   function TMap_isEmpty(){
      return (this._count == 0);
   }
   function TMap_count(){
      return this._count;
   }
   function TMap_contains(n){
      if(n != null){
         var i = this._table[n.toString().toLowerCase()]
         if(i != null){
            return true;
         }
      }
      return false;
   }
   function TMap_containsValue(v){
      var i = this.indexOfValue(v);
      return (i != -1);
   }
   function TMap_indexOf(n){
      if(n != null){
         var i = this._table[n.toString().toLowerCase()];
         if(i != null){
            return i;
         }
      }
      return -1;
   }
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
   function TMap_first(){
      var o = this;
      if(o._count > 0){
         return o._values[0];
      }
      return null;
   }
   function TMap_last(){
      var o = this;
      if(o._count > 0){
         return o._values[o._count - 1];
      }
      return null;
   }
   function TMap_nameAt(n){
      return this._names[n];
   }
   function TMap_name(n){
      return ((n >= 0) && (n < this._count)) ? this._names[n] : null;
   }
   function TMap_valueAt(n){
      return this._values[n];
   }
   function TMap_value(n){
      return ((n >= 0) && (n < this._count)) ? this._values[n] : null;
   }
   function TMap_setValueAt(n, v){
      this._values[n] = v;
   }
   function TMap_setValue(n, v){
      if((n >= 0) && (n < this._count)){
         this._values[n] = v;
      }
   }
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
   function TMap_assign(m){
      this.clear();
      this.append(m);
   }
   function TMap_append(m){
      if(m){
         var c = m._count;
         for(var n = 0; n < c; n++){
            this.set(m.name(n), m.value(n));
         }
      }
   }
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
   function TMap_removeName(n){
      var o = this;
      var i = o.indexOf(n);
      if(i != -1){
         return o.remove(i);
      }
      return null;
   }
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
   function TMap_rebuild(){
      var o = this;
      var t = o._table;
      for(var n in t){
         delete t[n];
      }
      var c = o._count;
      for(var n = 0; n < c; n++){
         t[o._names[n].toLowerCase()] = n;
      }
   }
   function TMap_clear(){
      var o = this;
      o._count = 0;
      for(var n in o._table){
         delete o._table[n];
      }
   }
   function TMap_toString(){
      return this.dump().toString();
   }
   function TMap_dispose(){
      var o = this;
      o._count = 0;
      var t = o._table;
      if(t){
         for(var i in t){
            t[i] = null;
         }
         o._table = null;
      }
      var n = o._names;
      if(n){
         for(var i = n.length - 1; i >= 0; i--){
            n[i] = null;
         }
         o._names = null;
      }
      var v = o._values;
      if(v){
         for(var i = v.length - 1; i >= 0; i--){
            v[i] = null;
         }
         o._values = null;
      }
   }
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
}
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
   o.get        = TObjects_get;
   o.setAt      = TObjects_setAt;
   o.set        = TObjects_set;
   o.assign     = TObjects_assign;
   o.append     = TObjects_append;
   o.insert     = TObjects_insert;
   o.push       = TObjects_push;
   o.pushUnique = TObjects_pushUnique;
   o.pop        = TObjects_pop;
   o.swap       = TObjects_swap;
   o.sort       = TObjects_sort;
   o.erase      = TObjects_erase;
   o.remove     = TObjects_remove;
   o.clear      = TObjects_clear;
   o.dispose    = TObjects_dispose;
   o.dump       = TObjects_dump;
   return o;
   function TObjects_isEmpty(){
      return (this._count == 0);
   }
   function TObjects_count(){
      return this._count;
   }
   function TObjects_items(){
      return this._items;
   }
   function TObjects_contains(v){
      return this.indexOf(v) != -1;
   }
   function TObjects_indexOf(v){
      var o = this;
      var c = o._count;
      var s = o._items;
      for(var i = 0; i < c; i++){
         if(s[i] == v){
            return i;
         }
      }
      return -1;
   }
   function TObjects_first(){
      var o = this;
      return o._count ? this._items[0] : null;
   }
   function TObjects_last(){
      var o = this;
      return o._count ? this._items[o._count - 1] : null;
   }
   function TObjects_getAt(n){
      return this._items[n];
   }
   function TObjects_get(n){
      var o = this;
      return ((n >= 0) && (n < o._count)) ? o._items[n] : null;
   }
   function TObjects_setAt(n, v){
      this._items[n] = v;
   }
   function TObjects_set(n, v){
      var o = this;
      if((n >= 0) && (n < o._count)){
         o._items[n] = v;
      }
   }
   function TObjects_assign(p){
      var o = this;
      var c = o._count = p._count;
      for(var i = 0; i < c; i++){
         o._items[i] = p._items[i];
      }
   }
   function TObjects_append(v){
      var o = this;
      var c = v._count;
      for(var i = 0; i < c; i++){
         o.push(v.get(i));
      }
   }
   function TObjects_insert(i, v){
      var o = this;
      var c = o._count;
      if((i >= 0) && (i <= c)){
         for(var n = c; n > i; n--){
            o._items[n] = o._items[n - 1];
         }
         o._items[i] = v;
      }
   }
   function TObjects_push(v){
      var o = this;
      var n = o._count++;
      o._items[n] = v;
      return n;
   }
   function TObjects_pushUnique(v){
      var o = this;
      for(var n = o._count - 1; n >= 0; n--){
         if(o._items[n] == v){
            return n;
         }
      }
      var n = o._count++;
      o._items[n] = v;
      return n;
   }
   function TObjects_pop(){
      var o = this;
      if(o._count){
         return o._items[--o._count];
      }
   }
   function TObjects_swap(l, r){
      var o = this;
      if((l >= 0) && (l < o._count) && (r >= 0) && (r < o._count) && (l != r)){
         var s = o._items;
         var v = s[l];
         s[l] = s[r];
         s[r] = v;
      }
   }
   function TObjects_sort(p){
      this._items.sort(p);
   }
   function TObjects_erase(n){
      var v = null;
      var o = this;
      if((n >= 0) && (n < o._count)){
         v = o._items[n];
         var c = --o._count;
         var s = o._items;
         for(var i = n; i < c; i++){
            s[i] = s[i+1];
         }
         s[c] = null;
      }
      return v;
   }
   function TObjects_remove(v){
      var o = this;
      var c = o._count;
      if(c){
         var n = 0;
         var s = o._items;
         for(var i = n; i < c; i++){
            if(s[i] != v){
               s[n++] = s[i];
            }
         }
         for(var i = n; i < c; i++){
            s[i] = null;
         }
         o._count = n;
      }
      return v;
   }
   function TObjects_clear(){
      var o = this;
      o._items.length = 0;
      o._count = 0;
   }
   function TObjects_dispose(){
      var o = this;
      for(var n in o._items){
         o._items[n] = null;
      }
      o._count = 0;
      o._items = null;
   }
   function TObjects_dump(){
      var o = this;
      var c = o._count;
      var r = new TString();
      r.append(RRuntime.className(o), ':', c);
      if(c > 0){
         for(var i = 0; i < c; i++){
            r.append(' [', o._items[i], ']');
         }
      }
      return r.flush();
   }
}
MO.TString = function TString(){
   var o = this;
   o._count       = 0;
   o._memory      = new Array();
   o.isEmpty      = TString_isEmpty;
   o.assign       = TString_assign;
   o.append       = TString_append;
   o.appendIf     = TString_appendIf;
   o.appendLine   = TString_appendLine;
   o.appendRepeat = TString_appendRepeat;
   o.push         = TString_push;
   o.clear        = TString_clear;
   o.toString     = TString_toString;
   o.flush        = TString_flush;
   o.dispose      = TString_dispose;
   o.dump         = TString_dump;
   return o;
   function TString_isEmpty(){
      return this._count == 0;
   }
   function TString_assign(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      o._count = 0;
      for(var i = 0; i < c; i++){
         var v = a[n];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
   }
   function TString_append(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
   }
   function TString_appendIf(f, v){
      var o = this;
      if(f){
         var a = arguments;
         var c = a.length;
         for(var i = 1; i < c; i++){
            var v = a[i];
            if(v != null){
               o._memory[o._count++] = v;
            }
         }
      }
   }
   function TString_appendRepeat(v, c){
      var o = this;
      for(var i = 0; i < c; i++){
         o._memory[o._count++] = v;
      }
   }
   function TString_appendLine(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
      o._memory[o._count++] = '\r\n';
   }
   function TString_push(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
   }
   function TString_clear(){
      this._count = 0;
   }
   function TString_toString(){
      var o = this;
      var r = o._memory;
      if(o._memory.length != o._count){
         r = o._memory.slice(0, o._count);
      }
      return r.join('');
   }
   function TString_flush(){
      var o = this;
      var r = o.toString();
      o.dispose();
      return r;
   }
   function TString_dispose(){
      var o = this;
      o._count = 0;
      var m = o._memory;
      if(m){
         for(var i = m.length - 1; i >= 0; i--){
            m[i] = null;
         }
         o._memory = null;
      }
   }
   function TString_dump(){
      var o = this;
      var s = o.toString();
      return RRuntime.className(o) + ':' + s.length + '[' + s + ']';
   }
}
MO.TStrings = function TStrings(o){
   if(!o){o = this;}
   TList(o);
   o.pack   = TStrings_pack;
   o.unpack = TStrings_unpack;
   return o;
   function TStrings_pack(){
      var o = this;
      var r = new TString();
      var c = o.count;
      for(var n = 0; n < c; n++){
         var s = o.get(n);
         var sl = s.length.toString();
         var sll = sl.length;
         sa = sll + sl + s;
         r.append(sa);
      }
      return r.toString();
   }
   function TStrings_unpack(p){
      var o = this;
      if(!RString.isEmpty(p)){
         var c = p.length;
         for(var n = 0; n < c;){
            var ll = parseInt(p.charAt(n++));
            var l = parseInt(p.substr(n, ll));
            n += ll;
            var s = p.substr(n, l);
            n += l;
            o.push(s);
         }
      }
   }
}
MO.RGlobal = new function RGlobal(){
   var o = this;
   o._instances = new MO.TDictionary();
   o.get        = RGlobal_get;
   o.set        = RGlobal_set;
   o.globalGet  = RGlobal_globalGet;
   o.globalSet  = RGlobal_globalSet;
   return o;
   function RGlobal_get(n){
      return this._instances.get(n);
   }
   function RGlobal_set(n, v){
      this._instances.set(n, v);
   }
   function RGlobal_globalGet(n){
      if(top.RGlobal){
         return top.RGlobal.get(n);
      }
      return this._instances.get(n);
   }
   function RGlobal_globalSet(n, v){
      if(top.RGlobal){
         top.RGlobal.set(n, v);
      }else{
         this._instances.set(n, v);
      }
   }
}
MO.RMemory = new function RMemory(){
   var o = this;
   o.objects       = new Array();
   o.instances     = new Object();
   o.isObject      = RMemory_isObject;
   o.create        = RMemory_create;
   o.register      = RMemory_register;
   o.disposeObject = RMemory_disposeObject;
   o.dispose       = RMemory_dispose;
   o.unlink        = RMemory_unlink;
   o.free          = RMemory_free;
   o.freeHtml      = RMemory_freeHtml;
   o.release       = RMemory_release;
   o.refresh       = RMemory_refresh;
   return o;
   function RMemory_isObject(o){
      var t = typeof(o);
      return ('boolean' != t) && ('number' != t) && ('string' != t) && ('date' != t) && ('function' != t) && (o instanceof Object);
   }
   function RMemory_create(c){
      var o = new c();
      this.objects.push(o);
      return o;
   }
   function RMemory_register(n, o){
      if(this.isObject(o)){
         this.objects.push(o);
         this.instances[n] = o;
      }
   }
   function RMemory_disposeObject(o){
   }
   function RMemory_dispose(o){
      if(null != o && this.isObject(o)){
         if(!o._disposed){
            o._disposed = true;
            if(o.dispose instanceof Function){
               o.dispose();
            }
            this.disposeObject(o);
         }
      }
   }
   function RMemory_unlink(o){
      for(var n in o){
         var v = o[n];
         o[n] = null;
         if(null != v && this.isObject(v)){
            this.unlink(o);
         }
      }
   }
   function RMemory_free(o){
      this.dispose(o);
      this.unlink(o);
   }
   function RMemory_freeHtml(h){
      if(h){
         h.removeNode(true);
      }
   }
   function RMemory_release(){
      var o = this;
      o.free(o.objects);
      o.free(o.instances);
      o.refresh();
   }
   function RMemory_refresh(){
      if(RContext.optionGarbage){
         CollectGarbage();
      }
   }
}
