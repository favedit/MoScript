var ELogger = new function ELogger(){
   var o = this;
   o.Debug = 'D';
   o.Info  = 'I';
   o.Warn  = 'W';
   o.Error = 'E';
   o.Fatal = 'F';
   return o;
}
var EProcess = new function EProcess(){
   var o = this;
   o.Debug = 1;
   o.Release = 2;
   return o;
}
var EScope = new function EScope(){
   var o = this;
   o.Local = 1;
   o.Session = 2;
   o.Global = 3;
   return o;
}
var RRuntime = new function RRuntime(){
   var o = this;
   o._processCd   = EProcess.Release;
   o.isDebug      = RRuntime_isDebug;
   o.isRelease    = RRuntime_isRelease;
   o.setProcessCd = RRuntime_setProcessCd;
   o.nvl          = RRuntime_nvl;
   o.subString    = RRuntime_subString;
   o.className    = RRuntime_className;
   return o;
}
function RRuntime_isDebug(){
   return (this._processCd == EProcess.Debug);
}
function RRuntime_isRelease(){
   return (this._processCd == EProcess.Release);
}
function RRuntime_setProcessCd(p){
   this._processCd = p;
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
   var o = this;
   if(v){
      if(typeof(v) == 'function'){
         return o.subString(v.toString(), 'function ', '(');
      }
      var c = v.constructor;
      if(c){
         return o.subString(c.toString(), 'function ', '(');
      }
   }
   return null;
}
function SLooperEntry(){
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
function TArray(){
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
function TArray_isEmpty(){
   return this._length == 0;
}
function TArray_length(){
   return this._length;
}
function TArray_memory(){
   return this._memory;
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
function TArray_push(){
   var count = arguments.length;
   for(var i = 0; i < count; i++){
      this._memory[this._length++] = arguments[i];
   }
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
function TAttributes(){
   var o = this;
   TDictionary.call(o);
   o.join   = TAttributes_join;
   o.split  = TAttributes_split;
   o.pack   = TAttributes_pack;
   o.unpack = TAttributes_unpack;
   o.dump   = TAttributes_dump;
   return o;
}
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
            o.set(RString.trim(sb[0]), RString.trim(sb[1]));
         }else{
            o.set(RString.trim(ln), '');
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
function TDictionary(){
   var o = this;
   TMap.call(o);
   o.dump = TDictionary_dump;
   return o;
}
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
function TList(){
   var o = this;
   o._count     = 0;
   o._memory    = new Array();
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
}
function TList_isEmpty(){
   return (this._count == 0);
}
function TList_contains(v){
   return this.indexOf(v) != -1;
}
function TList_indexOf(v){
   var o = this;
   var c = o._count;
   for(var n = 0; n < c; n++){
      if(o._memory[n] == v){
         return n;
      }
   }
   return -1;
}
function TList_first(){
   var o = this;
   return o._count ? this._memory[0] : null;
}
function TList_last(){
   var o = this;
   return o._count ? this._memory[o._count - 1] : null;
}
function TList_get(n){
   return ((n >= 0) && (n < this._count)) ? this._memory[n] : null;
}
function TList_set(n, v){
   if((n >= 0) && (n < this._count)){
      this._memory[n] = v;
   }
}
function TList_append(v){
   var o = this;
   var c = v._count;
   for(var n = 0; n < c; n++){
      o.push(v.get(n));
   }
}
function TList_insert(i, v){
   var o = this;
   var c = o._count;
   if((i >= 0) && (i <= c)){
      for(var n = c; n > i; n--){
         o._memory[n] = o._memory[n - 1];
      }
      o._memory[i] = v;
   }
}
function TList_push(v){
   var n = this._count++;
   this._memory[n] = v;
   return n;
}
function TList_pushUnique(v){
   var o = this;
   for(var n = o._count-1; n >= 0; n--){
      if(o._memory[n] == v){
         return n;
      }
   }
   var n = o._count++;
   o._memory[n] = v;
   return n;
}
function TList_pop(){
   var o = this;
   if(o._count){
      return o._memory[--o._count];
   }
}
function TList_swap(l, r){
   var o = this;
   if((l >= 0) && (l < o._count) && (r >= 0) && (r < o._count) && (l != r)){
      var v = o._memory[l];
      o._memory[l] = this._memory[r];
      o._memory[r] = v;
   }
}
function TList_sort(){
   this._memory.sort();
}
function TList_erase(n){
   var v = null;
   var o = this;
   if((n >= 0) && (n < o._count)){
      v = o._memory[n];
      var c = --o._count;
      for(var i = n; i < c; i++){
         o._memory[i] = o._memory[i+1];
      }
   }
   return v;
}
function TList_remove(v){
   if(v != null){
      var o = this;
      var c = o._count;
      if(c > 0){
         var n = 0;
         for(var i = n; i < c; i++){
            if(o._memory[i] != v){
               o._memory[n++] = o._memory[i];
            }
         }
         o._count = n;
      }
   }
   return v;
}
function TList_clear(){
   this._count = 0;
}
function TList_compress(){
   var o = this;
   var c = o._count;
   if(c > 0){
      var l = 0;
      for(var n = 0; n < c; n++){
         var v = o._memory[n];
         if(v != null){
            o._memory[l++] = v;
         }
      }
      o._count = l;
   }
}
function TList_pack(){
   var o = this;
   var ss = new TStrings();
   for(var n = 0; n < o._count; n++){
      ss.push(o.get(n).pack());
   }
   return ss.pack();
}
function TList_dispose(){
   var o = this;
   o._count = 0;
   for(var n in o._memory){
      delete o._memory[n];
   }
   o._memory = null;
}
function TList_dump(){
   var o = this;
   var c = o._count;
   var r = new TString();
   r.append(RClass.name(o), ':', c);
   if(c > 0){
      for(var n = 0; n < c; n++){
         r.append(' [', o._memory[n], ']');
      }
   }
   return r.toString();
}
function TLooper(){
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
}
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
function TMap(){
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
      var v = o._names[n] + '';
      t[v.toLowerCase()] = n;
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
function TObjects(){
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
function TObjects_shift(){
   return this.erase(0);
}
function TObjects_unshift(p){
   return this.insert(0, p);
}
function TObjects_pop(){
   var o = this;
   if(o._count){
      return o._items[--o._count];
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
   var o = this;
   var s = o._items;
   if(s.length != o._count){
      s.length = o._count;
   }
   s.sort(p);
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
function TString(){
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
}
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
function TStrings(){
   var o = this;
   TList(o);
   o.pack   = TStrings_pack;
   o.unpack = TStrings_unpack;
   return o;
}
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
   return r.flush();
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
var RGlobal = new function RGlobal(){
   var o = this;
   o.instances = new TDictionary();
   o.get       = RGlobal_get;
   o.set       = RGlobal_set;
   o.globalGet = RGlobal_globalGet;
   o.globalSet = RGlobal_globalSet;
   return o;
}
function RGlobal_get(n){
   return this.instances.get(n);
}
function RGlobal_set(n, v){
   this.instances.set(n, v);
}
function RGlobal_globalGet(n){
   if(top.RGlobal){
      return top.RGlobal.get(n);
   }
   return this.instances.get(n);
}
function RGlobal_globalSet(n, v){
   if(top.RGlobal){
      top.RGlobal.set(n, v);
   }else{
      this.instances.set(n, v);
   }
}
var RMemory = new function RMemory(){
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
}
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
function AAnnotation(n){
   var o = this;
   o._annotationCd = null;
   o._inherit      = false;
   o._duplicate    = false;
   o._name         = n;
   o.annotationCd  = AAnnotation_annotationCd;
   o.name          = AAnnotation_name;
   o.code          = AAnnotation_code;
   o.value         = AAnnotation_value;
   return o;
}
function AAnnotation_annotationCd(){
   return this._annotationCd;
}
function AAnnotation_name(){
   return this._name;
}
function AAnnotation_code(){
   return this._name;
}
function AAnnotation_value(){
   return null;
}
function AEnum(n, l){
   var o = this;
   o.inherit    = true;
   o.annotation = EAnnotation.Enum;
   o.name       = n;
   o.linker     = l;
   return o;
}
function ALinker(n, l){
   var o = this;
   o.inherit    = true;
   o.annotation = EAnnotation.Linker;
   o.name       = n;
   o.linker     = l;
   return o;
}
function AProperty(n, l){
   var o = this;
   AAnnotation.call(o, n);
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
   if(l == null){
      if(RString.startsWith(n, '_')){
         ln = n.substring(1);
      }else{
         ln = n;
      }
      ln = RString.toUnderline(ln);
   }else{
      ln = l;
   }
   o._linker = ln;
   return o;
}
function AProperty_code(){
   return this._linker;
}
function AProperty_build(){
}
function AProperty_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
function AProperty_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
function AProperty_toString(){
   var o = this;
   return '<' + o._annotationCd + ',linker=' + o._linker + '>';
}
var EAnnotation = new function EAnnotation(){
   var o = this;
   o.Property  = 'property';
   o.Event     = 'enum';
   o.Event     = 'event';
   o.Linker    = 'linker';
   o.Style     = 'style';
   o.StyleIcon = 'icon';
   return o;
}
var EBoolean = new function EBoolean(){
   var o = this;
   o.True   = 'Y';
   o.False  = 'N';
   return o;
}
var ECharCase = function ECharCase(){
   var o = this;
   o.Upper = 'U';
   o.Lower = 'L';
   o.Word  = 'W';
   return o;
}
var EDataType = new function EDataType(){
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
var EEndian = new function EEndian(){
   var o = this;
   o.Big    = 0;
   o.Little = 1;
   return o;
}
var ENodeType = new function ENodeType(){
   var o = this;
   o.Node = 1;
   o.Text = 3;
   o.Data = 4;
   return o;
}
var ENumber = new function ENumber(){
   var o = this;
   o.Integer         = 'I';
   o.PositiveInteger = 'PI';
   o.NegativeInteger = 'NI';
   o.Float           = 'F';
   o.PositiveFloat   = 'PF';
   o.NegativeFloat   = 'NF';
   return o;
}
var ERegExp = new function ERegExp(){
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
var EResult = new function EResult(){
   var o = this;
   o.Success  = 0;
   o.Continue = 1;
   o.Skip     = 2;
   o.Finish   = 3;
   o.Failure  = -1;
   o.Cancel   = -2;
   return o;
}
function MInstance(o){
   o = RClass.inherits(this, o);
   o.__free          = false;
   o.instanceCreate  = RMethod.empty;
   o.instanceAlloc   = RMethod.empty;
   o.instanceFree    = RMethod.empty;
   o.instanceRelease = RMethod.empty;
   return o;
}
function MInvoke(o){
   o = RClass.inherits(this, o);
   o.invoke = RMethod.virtual(o, 'invoke');
   return o;
}
function MPoolAble(o){
   o = RClass.inherits(this, o);
   o._poolCode   = null;
   o.poolCode    = MPoolAble_poolCode;
   o.setPoolCode = MPoolAble_setPoolCode;
   return o;
}
function MPoolAble_poolCode(){
   return this._code;
}
function MPoolAble_setPoolCode(poolCode){
   this._poolCode = poolCode;
}
function SArguments(){
   var o = this;
   o.owner = null;
   return o;
}
function SEnumItem(){
   var o = this;
   o.name  = null;
   o.value = 0;
   return o;
}
function TClass(){
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
function TClass_register(p){
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
function TClass_assign(c){
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
function TClass_annotations(a){
   var o = this;
   var r = o._annotations[a];
   if(!r){
      RLogger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
   }
   return r;
}
function TClass_annotation(a, n){
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
function TClass_annotationFind(p){
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
function TClass_attributeFind(p){
   var a = this._attributes[p];
   if(a){
      if(a.constructor != Function){
         return a;
      }
   }
   return null;
}
function TClass_style(n){
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
function TClass_build(){
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
function TClass_newInstance(){
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
function TClass_alloc(){
   var o = this;
   var e = o._unused;
   if(e){
      o._unused = e.cnext;
      e.cnext = null;
      e._using = true;
   }
   return e;
}
function TClass_free(v){
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
function TClassBase(){
   var o = this;
   o.__disposed = true;
   return o;
}
function TContext(n, c, t){
   var o = this;
   o.name = n;
   o.code = c;
   o.text = t;
   return o;
}
function TDataset(){
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
function TDataset_isEmpty(){
   var o = this;
   return o._rows.isEmpty();
}
function TDataset_createRow(){
   var o = this;
   var r = new TRow();
   r._dataset = o;
   o._rows.push(r);
   return r;
}
function TDataset_count(){
   return this._rows.count();
}
function TDataset_row(p){
   return this._rows.get(p);
}
function TDataset_rows(){
   return this._rows;
}
function TDataset_find(p){
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
function TDataset_push(r){
   this._rows.push(r);
}
function TDataset_loadConfig(x){
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
function TDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}
function TDataset_findIndex(p){
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
function TDataset_remove(i){
   return this._rows.remove(i);
}
function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o._rows.remove(i);
   }
}
function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o._code;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v._count = o._rows._count;
   v._rows = o._rows;
   v.dataset = o;
}
function TDataset_pack(){
   var o = this;
   var rs = o._rows;
   var ss = new TStrings();
   for(var n = 0; n < rs._count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}
function TDataset_dump(){
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
function TDatasetViewer(){
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
function TDatasetViewer_isEmpty(){
   return (this._count == null);
}
function TDatasetViewer_count(){
   return this._count;
}
function TDatasetViewer_current(){
   var o = this;
   var s = o._rows;
   return s ? s.get(o._position - o._start) : null;
}
function TDatasetViewer_reset(){
   this._position = -1;
}
function TDatasetViewer_move(p){
   this._position = p;
}
function TDatasetViewer_moveToRow(r){
   var o = this;
   var p = o._rows.indexOf(r);
   if(p != -1){
      o._position = p - o._start;
   }
}
function TDatasetViewer_first(r){
   this._position = r ? -1 : 0;
}
function TDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}
function TDatasetViewer_next(){
   var o = this;
   if(o._position < o._count-1){
      o._position++;
      return true;
   }
   return false;
}
function TDatasetViewer_last(){
   this._position = this._count-1;
}
function TDate(date){
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
function TDate_clone(){
   var d = new Date();
   d.setTime(this.date.getTime());
   return new TDate(d);
}
function TDate_equals(d){
   return this.date.getTime() == d.date.getTime();
}
function TDate_isBefore(d){
   return this.date.getTime() < d.date.getTime();
}
function TDate_isAfter(d){
   return this.date.getTime() > d.date.getTime();
}
function TDate_monthDays(){
   return RDate.monthDays(this.year, this.month);
}
function TDate_monthWeekDay(){
   return (8-(this.day-this.weekDay())%7)%7;
}
function TDate_weekDay(){
   return this.date.getDay();
}
function TDate_setYear(n){
   this.date.setFullYear(n);
   this.refresh();
}
function TDate_setMonth(n){
   this.date.setMonth(parseInt(n, 10)-1);
   this.refresh();
}
function TDate_setDay(n){
   this.date.setDate(n);
   this.refresh();
}
function TDate_setHour(n){
   this.date.setHours(n);
   this.refresh();
}
function TDate_setMinute(n){
   this.date.setMinutes(n);
   this.refresh();
}
function TDate_setSecond(n){
   this.date.setSeconds(n);
   this.refresh();
}
function TDate_addYear(n){
   this.date.setFullYear(this.date.getFullYear()+parseInt(n));
   this.refresh();
}
function TDate_addMonth(n){
   this.date.setMonth(this.date.getMonth()+parseInt(n));
   this.refresh();
}
function TDate_addDay(n){
   this.date.setTime(this.date.getTime()+parseInt(n)*1000*60*60*24);
   this.refresh();
}
function TDate_addMseconds(n){
   this.date.setTime(this.date.getTime()+parseInt(n));
   this.refresh();
}
function TDate_refresh(){
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
function TDate_setDate(d){
   var o = this;
   o.date = d;
   o.refresh();
}
function TDate_now(){
   var o = this;
   o.date = new Date();
   o.refresh();
}
function TDate_dump(){
   return RClass.dump(this) + ' ' + RDate.formatDate(this);
}
function TError(po, pm, pp){
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
   throw new Error(r);
}
function TFatalError(po, pe, pm, pp){
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
function TInstancePool(){
   var o = this;
   TObjects.call(o);
   o._instance = null;
   o.instance  = TInstancePool_instance;
   o.alloc     = TInstancePool_alloc;
   o.free      = TInstancePool_free;
   return o;
}
function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = RClass.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}
function TInstancePool_alloc(p){
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
function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
function TInvoke(){
   var o = this;
   o.owner    = null;
   o.callback = null;
   o.invoke   = TInvoke_invoke;
   return o;
}
function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
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
function TListener(){
   var o = this;
   o._owner    = null;
   o._callback = null;
   o.process   = TListener_process;
   o.toString  = TListener_toString;
   o.dispose   = TListener_dispose;
   return o;
}
function TListener_process(s, p1, p2, p3, p4, p5){
   var o = this;
   var c = o._callback;
   var w = o._owner ? o._owner : o;
   o._callback.call(w, s, p1, p2, p3, p4, p5);
}
function TListener_toString(){
   var o = this;
   return RClass.name(o) + '(owner=' + RClass.name(o._owner) + ', callback=' + RMethod.name(o._callback) + ')';
}
function TListener_dispose(){
   var o = this;
   o._owner = null;
   o._callback = null;
   RObject.free(o);
}
function TListeners(){
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
function TListeners_isEmpty(){
   var s = this._listeners;
   return s ? s.isEmpty() : true;
}
function TListeners_find(w, p){
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
function TListeners_register(w, p){
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
function TListeners_unregister(w, p){
   var o = this;
   var l = o.find(w, p);
   if(!l){
      throw new TError(o, 'Listener is not register. (owner={1}, process={2})', w, p);
   }
   o.remove(l);
   l.dispose();
}
function TListeners_push(l){
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
function TListeners_remove(l){
   var o = this;
   if(!l){
      throw new TError(o, 'Listener is null.');
   }
   o._listeners.remove(l);
}
function TListeners_process(ps, p1, p2, p3, p4, p5){
   var s = this._listeners;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).process(ps, p1, p2, p3, p4, p5);
      }
   }
}
function TListeners_clear(){
   var s = this._listeners;
   if(s){
      s.clear();
   }
}
function TListeners_dispose(){
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
function TListeners_dump(){
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
function TLoaderListener(){
   var o = this;
   o.invoke = null;
   o.ids    = new TArray();
   o.check  = TLoaderListener_check;
   return o;
}
function TLoaderListener_check(l){
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
function TLocker(){
   var o = this;
   o._lock = false;
   o.enter = TLocker_enter;
   o.leave = TLocker_leave;
   return o;
}
function TLocker_enter(){
   this._lock = true;
}
function TLocker_leave(){
   this._lock = false;
}
function TMessage(){
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
function TMessage_loadConfig(config){
   var o = this;
   o.typeCd      = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}
function TMessage_saveConfig(config){
   var o = this;
   config.name = o.typeCd;
   config.set('message', o.message);
   config.set('description', o.description);
}
function TMessage_icon(){
   return 'sys.msg.' + this.typeCd;
}
function TMessages(){
   var o = this;
   o._items     = new TObjects();
   o.hasMessage = TMessages_hasMessage;
   o.message    = TMessages_message;
   o.messages   = TMessages_messages;
   o.type       = TMessages_type;
   o.push       = TMessages_push;
   return o;
}
function TMessages_hasMessage(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}
function TMessages_message(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
function TMessages_messages(type){
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
function TMessages_type(){
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
function TMessages_push(msg){
   if(msg){
      this._items.push(msg);
   }
}
function TNode(name){
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
function TNode_isName(n){
   return RString.equals(this._name, n);
}
function TNode_name(){
   return this._name;
}
function TNode_setName(p){
   this._name = p;
}
function TNode_value(){
   return this._value;
}
function TNode_setValue(p){
   this._value = p;
}
function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}
function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}
function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new TAttributes();
   }
   return r;
}
function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}
function TNode_nodeCount(){
   var nodes = this._nodes;
   return nodes ? nodes.count() : 0;
}
function TNode_node(index){
   var nodes = this._nodes;
   return nodes ? nodes.at(index) : null;
}
function TNode_nodes(){
   var o = this;
   var nodes = o._nodes;
   if(!nodes){
      nodes = o._nodes = new TObjects();
   }
   return nodes;
}
function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}
function TNode_getInteger(n, v){
   return RInteger.parse(this.get(n, v));
}
function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}
function TNode_setNvl(name, value){
   if(!RString.isEmpty(value)){
      this.attributes().set(name, value);
   }
}
function TNode_setBoolean(n, v){
   if(v != null){
      this.attributes().set(n, RBoolean.format(v));
   }
}
function TNode_setFloat(n, v){
   if(v != null){
      this.attributes().set(n, RFloat.format(v));
   }
}
function TNode_find(p){
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
function TNode_findNode(pn, pv){
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
function TNode_searchNode(pn, pv){
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
function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}
function TNode_toString(){
   return this.dump();
}
function TNode_innerDump(dump, node, space){
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
function TNode_dump(d, space){
   return this.innerDump(RString.nvlString(d), this, space);
}
function TRow(){
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
function TRow_loadConfig(x){
   var o = this;
   o._index = x.get('_id');
   o._statusCd = x.get('_status');
   o._uniqueId = x.get('ouid');
   if(x.hasAttribute()){
      o.append(x.attributes());
   }
}
function TRow_saveConfig(x){
   var o = this;
   x.set('_id', o._index);
   x.set('_status', o._statusCd);
   var c = o.count();
   for(var i = 0; i < c; i++){
      x.set(o._names[i], o._values[i]);
   }
}
function TRow_copy(){
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
function TRow_toAttributes(a){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   a.set(RDataset.ROW_STATUS, o._statusCd);
   a.append(o);
   return a;
}
function TRow_dump(s){
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
function TSpeed(){
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
function TSpeed_reset(){
   var o = this;
   o._start = 0;
   o._end = 0;
   o._span = 0;
}
function TSpeed_begin(){
   var o = this;
   o._start = new Date().getTime();
}
function TSpeed_end(){
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
function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   RLogger.debug(o, 'Speed test. (caller={1}, speed={2}, arguments={3})', o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
function TSpeed_toString(){
   var o = this;
   return o._span + ' (' + o._spanMin + ' - ' + o._spanMax + ')';
}
function TUnsupportError(po, pp){
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
function FConsole(o){
   o = RClass.inherits(this, o, FObject);
   o._scopeCd = EScope.Global;
   o.scopeCd  = FConsole_scopeCd;
   return o;
}
function FConsole_scopeCd(){
   return this._scopeCd;
}
function FObject(o){
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
function FObject_construct(){
   var o = this;
   o.__dispose = false;
}
function FObject_hashCode(){
   var o = this;
   var v = o.__hash;
   if(!v){
      v = o.__hash = RObject.nextId();
   }
   return v;
}
function FObject_toString(){
   return RClass.dump(this);
}
function FObject_dispose(){
   var o = this;
   RObject.free(o);
   o.__dispose = true;
}
function FObject_innerDump(dump, level){
   dump.append(RClass.dump(this));
}
function FObject_dump(){
   var r = new TString();
   this.innerDump(r, 0);
   return r.flush();
}
function FObjectPool(o){
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
function FObjectPool_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new TObjects();
   o._frees = new TObjects();
}
function FObjectPool_hasFree(){
   return !this._frees.isEmpty();
}
function FObjectPool_alloc(){
   var o = this;
   var r = null;
   if(!o._frees.isEmpty()){
      r = o._frees.pop();
   }
   o._allocCount++;
   return r;
}
function FObjectPool_free(p){
   var o = this;
   o._frees.push(p);
   o._freeCount++;
}
function FObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}
function FObjectPool_dispose(){
   var o = this;
   o._items = RObject.dispose(o._items);
   o._frees = RObject.dispose(o._frees);
   o.__base.FObject.dispose.call(o);
}
function FObjectPool_innerDump(s, l){
   var o = this;
   s.append('Pool:');
   s.append('total=', o._items.count());
   s.append(', free=', o._frees.count());
   s.append(', alloc_count=', o._allocCount);
   s.append(', free_count=', o._freeCount);
}
function FObjectPools(o){
   o = RClass.inherits(this, o, FObject);
   o._pools    = null;
   o.construct = FObjectPools_construct;
   o.pool      = FObjectPools_pool;
   o.alloc     = FObjectPools_alloc;
   o.free      = FObjectPools_free;
   o.dispose   = FObjectPools_dispose;
   return o;
}
function FObjectPools_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._pools = new TDictionary();
}
function FObjectPools_pool(code){
   var o = this;
   var pool = o._pools.get(code);
   if(!pool){
      pool = RClass.create(FObjectPool);
      o._pools.set(code, pool);
   }
   return pool;
}
function FObjectPools_alloc(code){
   var o = this;
   var pool = o.pool(code);
   return pool.alloc();
}
function FObjectPools_free(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.free(instance);
}
function FObjectPools_push(code, instance){
   var o = this;
   var pool = o.pool(code);
   return pool.push(instance);
}
function FObjectPools_dispose(){
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
function FTimer(o){
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
function FTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._beginTime = n;
   o._endTime = n;
}
function FTimer_current(){
   return this._lastTime;
}
function FTimer_span(){
   return this._span;
}
function FTimer_spanSecond(){
   return this._spanSecond;
}
function FTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
function FTimer_update(){
   var o = this;
   o._count++;
   var b = o._beginTime = o._endTime;
   var e = o._endTime = new Date().getTime();
   var s = o._span = e - b;
   o._spanSecond = s / 1000;
}
var RArray = new function RArray(){
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
function RArray_equals(s, t){
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
function RArray_count(a){
   var c = 0;
   for(var n in a){
      n++;
   }
   return c;
}
function RArray_contains(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return true;
      }
   }
   return false;
}
function RArray_find(a, v){
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] == v){
         return n;
      }
   }
   return -1;
}
function RArray_search(a, v){
   for(var n in a){
      if(a[n] == v){
         return n;
      }
   }
   return null;
}
function RArray_reverse(a, s, e){
   var c = (e + 1 - s) >> 1;
   for(var n = 0; n < c; n++){
      var t = a[s + n];
      a[s + n] = a[e - n];
      a[e - n] = t;
   }
}
function RArray_copy(s, t){
   for(var n in s){
      t[n] = s[n];
   }
}
function RArray_move(a, f, c, t){
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
function RArray_remove(a, n){
   return a.slice(0, n).concat(a.slice(n + 1));
}
function RArray_sortPartition(a, l, r){
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
function RArray_sortArray(a, s, e){
   if(s < e){
      var o = this;
      var p = o.sortPartition(a, s, e);
      o.sortArray(a, s, p - 1);
      o.sortArray(a, p + 1, e);
   }
}
function RArray_sort(a, t){
   var o = this;
   var c = a.length - 1;
   o.sortArray(a, 0, c);
   if(t){
      o.reverse(a, 0, c);
   }
   return a;
}
function RArray_nameMaxLength(a){
   var r = 0;
   for(var n in a){
      var l = n.length;
      if(l > n){
         n = l;
      }
   }
   return r;
}
var RAssert = new function RAssert(){
   var o = this;
   o.isTrue     = RAssert_isTrue;
   o.isFalse    = RAssert_isFalse;
   o.debugBegin = RAssert_empty;
   o.debug      = RAssert_empty;
   o.debugEnd   = RAssert_empty;
   o.debugTrue  = RAssert_isTrue;
   o.debugFalse = RAssert_isFalse;
   return o;
}
function RAssert_empty(){
}
function RAssert_isTrue(p){
   if(!p){
      throw new TError(p, 'Assert failure.');
   }
}
function RAssert_isFalse(a){
   if(p){
      throw new TError(p, 'Assert failure.');
   }
}
var RBoolean = new function RBoolean(){
   var o = this;
   o.format   = RBoolean_format;
   o.parse    = RBoolean_parse;
   o.toString = RBoolean_toString;
   return o;
}
function RBoolean_format(v){
   return v ? EBoolean.True : EBoolean.False;
}
function RBoolean_parse(v){
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
function RBoolean_toString(value, valueTrue, valueFalse){
   if(valueTrue == null){
      valueTrue = EBoolean.True;
   }
   if(valueFalse == null){
      valueFalse = EBoolean.False;
   }
   return value ? valueTrue : valueFalse;
}
var RByte = new function RByte(){
   var o = this;
   o.copy = RByte_copy;
   return o;
}
function RByte_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
var RChar = new function RChar(){
   var o = this;
   o.parse    = RChar_parse;
   o.toString = RChar_toString;
   return o;
}
function RChar_parse(n){
   return String.fromCharCode(n);
}
function RChar_toString(v){
   return v;
}
var RClass = new function RClass(){
   var o = this;
   o.codes          = new Array();
   o.classes        = new Object();
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
function RClass_isBase(v){
   if(v != null){
      var n = typeof(v);
      return RClass.isBaseName(n);
   }
   return false;
}
function RClass_isBaseName(n){
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
function RClass_isBaseDataName(n){
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
function RClass_isBaseType(c){
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
function RClass_isBaseDataType(c){
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
function RClass_isName(v, n){
   return (this.name(v) == n);
}
function RClass_isClass(v, c){
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
function RClass_typeOf(o){
   if(o && o.constructor){
      return RString.mid(o.constructor.toString(), 'function ', '(');
   }
   return 'Null';
}
function RClass_safeTypeOf(v, safe){
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
function RClass_checkClass(v, c){
   if(!this.isClass(v, c)){
      throw new Error('Invalid class ' + o.name(o) + '<>' + o.name(c));
   }
}
function RClass_code(v){
   var c = this.codes;
   var l = c.length;
   for(var n = 0; n < l; n++){
      if(c[n] == v){
         return n;
      }
   }
   c[l] = v;
   return l;
}
function RClass_name(v){
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
function RClass_inherits(s, p){
   var r = RRuntime.nvl(p, s);
   r.__inherits = new Array();
   var a = arguments;
   var c = a.length;
   for(var i = 2; i < c; i++){
      r.__inherits.push(RMethod.name(a[i]));
   }
   return r;
}
function RClass_forName(n){
   var r = null;
   if(n != null){
      var o = this;
      r = o.classes[n];
      if(!r){
         r = o.createClass(n);
         o.build(r);
      }
   }
   return r;
}
function RClass_find(v){
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
   return o.classes[n];
}
function RClass_register(v, a, r){
   var n = RMethod.name(v.constructor);
   this.classes[n].register(a);
   var v = a.value();
   return (v != null) ? v : r;
}
function RClass_createBase(n){
   if(n){
      var s = 'function ' + n + '(){return this;} new ' + n + '();';
      return eval(s);
   }
   return null;
}
function RClass_createClass(n){
   var o = this;
   var c = o.classes[n] = new TClass();
   c.name = n;
   c.base = o.createBase(n);
   c.clazz = new c.base.constructor();
   eval(n)(c.clazz);
   return c;
}
function RClass_create(n){
   var o = this;
   var t = typeof(n);
   if(t == 'function'){
      n = RMethod.name(n);
   }else if(t != 'string'){
      RLogger.fatal(o, null, 'Param is invlid (name={1})', n);
   }
   return o.createByName(n);
}
function RClass_createByName(n){
   var o = this;
   var c = o.forName(n);
   if(!c){
      RLogger.fatal(o, null, 'Cant find class. (name={1})', c);
   }
   return c.newInstance();
}
function RClass_innerCopy(s, t){
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
function RClass_build(c){
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
function RClass_free(o){
   var c = o.__class;
   if(c){
      c.free(o);
   }
}
function RClass_dump(v){
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
var RConsole = new function RConsole(){
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
function RConsole_initialize(){
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
function RConsole_register(p){
   this._registers.push(p);
}
function RConsole_create(n){
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
function RConsole_createByName(n){
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
function RConsole_get(v){
   var o = this;
   var n = RClass.name(v);
   var r = o._consoles.get(n);
   return r;
}
function RConsole_find(v){
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
function RConsole_release(){
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
var RConst = new function RConst(){
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
var RDate = new function RDate(){
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
function RDate_nvl(o){
   return o ? o : new TDate();
}
function RDate_make(yyyy, mm, dd, hh, mi, ss){
   return new TDate(new Date(yyyy, mm, dd));
}
function RDate_format(fmt){
   return this.formatDate(new TDate(), fmt);
}
function RDate_formatText(v, f){
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
function RDate_formatDate(date, fmt){
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
function RDate_monthDays(year, month){
   if(!year || !month){return 0;}
   year = parseInt(year);
   month = parseInt(month);
   this.MonthDays[2] = (((year%4 == 0) || (year%400 == 0)) && (year%100 != 0)) ? 29 : 28 ;
   return this.MonthDays[month];
}
function RDate_splitFormat(v, f){
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
function RDate_checkItems(items){
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
function RDate_check(value, format){
   return this.checkItems(this.splitFormat(value, format));
}
function RDate_makeDate(date, da){
   var d = new Date(RInteger.parse(da.year), RInteger.parse(da.month)-1, RInteger.parse(da.day), RInteger.parse(da.hour), RInteger.parse(da.minute), RInteger.parse(da.second), RInteger.parse(da.ms));
   if(date){
      date.setDate(d);
      return date;
   }
   return new TDate(d);
}
function RDate_parse(date, value, format){
   if(!format){
      format = this.DataFormat;
   }
   var items = this.splitFormat(value, format);
   if(this.checkItems(items)){
      return this.makeDate(date, items);
   }
   return null;
}
function RDate_splitDate(da, value){
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
function RDate_splitTime(da, value){
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
function RDate_autoParse(d, v){
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
function RDate_getFormat(value){
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
var REnum = new function REnum(){
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
function REnum_contains(){
}
function REnum_tryEncode(e, v, d){
   if(e != null){
      for(var n in e){
         if(n.toLowerCase() == v.toLowerCase()){
            return e[n];
         }
      }
   }
   return d;
}
function REnum_encode(e, v){
   var o = this;
   var r = o.tryEncode(e, v);
   if(r == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
   }
   return r;
}
function REnum_tryDecode(e, v, d){
   if(e != null){
      for(var n in e){
         if(e[n] == v){
            return n;
         }
      }
   }
   return d;
}
function REnum_decode(e, v){
   var o = this;
   var r = o.tryDecode(e, v);
   if(r == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(e), v);
   }
   return r;
}
var RFile = new function RFile(){
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
function RFile_inPicture(v){
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
function RFile_isPicture(v){
   return this.inPicture(this.extension(v));
}
function RFile_isKnown(v){
   var o = this;
   v = o.extension(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}
function RFile_name(value){
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
function RFile_extension(v){
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
var RFloat = new function RFloat(){
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
function RFloat_isFloat(p){
   return RString.isPattern(p, 'n');
}
function RFloat_parse(source){
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
function RFloat_format(v, l, lp, r, rp){
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
function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}
function RFloat_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   return Math.min(Math.max(v, i), a);
}
function RFloat_sum(){
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
function RFloat_calculate(f,a,b){
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
function RFloat_attach(t, s, c){
   var r = false;
   for(var i = 0; i < c; i++){
      if(t[i] != s[i]){
         t[i] = s[i];
         r = true;
      }
   }
   return r;
}
function RFloat_fill(d, i, c, v){
   for(var n = 0; n < c; n++){
      d[i++] = v;
   }
}
function RFloat_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
var RHex = new function RHex(){
   var o = this;
   o.NUMBER  = '0x123456789ABCDEF';
   o.PAD     = '0';
   o.isValid = RHex_isValid;
   o.parse   = RHex_parse;
   o.format  = RHex_format;
   return o;
}
function RHex_isValid(p){
   return RString.isPattern(p, this.NUMBER);
}
function RHex_parse(p){
   return p ? parseInt('0x' + p) : '0';
}
function RHex_format(v, l){
   var r = null;
   if(v){
      r = v.toString(16);
   }else{
      r = '0'
   }
   return l ? RString.lpad(r, l, this.PAD) : r;
}
var RInstance = new function RInstance(){
   var o = this;
   o._pools = new TDictionary();
   o.pool   = RInstance_pool;
   o.get    = RInstance_get;
   o.alloc  = RInstance_alloc;
   o.free   = RInstance_free;
   return o;
}
function RInstance_pool(p){
   var o = this;
   var n = RClass.name(p);
   var v = o._pools.get(n);
   if(v == null){
      v = new TInstancePool();
      o._pools.set(n, v);
   }
   return v;
}
function RInstance_get(p){
   return this.pool(p).instance(p);
}
function RInstance_alloc(n){
   return this.pool(p).alloc(p);
}
function RInstance_free(n){
   this.pool(p).free(p);
}
var RInteger = new function RInteger(){
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
function RInteger_isInt(v){
   return RString.isPattern(v, 'n');
}
function RInteger_nvl(v, d){
   return v ? v : (d ? d : 0);
}
function RInteger_strideByte(value){
   if(value > 65535){
      return 4;
   }else if(value > 255){
      return 2;
   }else{
      return 1;
   }
}
function RInteger_strideBit(value){
   if(value > 65535){
      return 32;
   }else if(value > 255){
      return 16;
   }else{
      return 8;
   }
}
function RInteger_parse(v, d){
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
function RInteger_format(v, l, p){
   if(!p){
      p = this.LEFT_CHAR;
   }
   var v = v.toString();
   for(var i = parseInt(l) - v.length - 1; i >= 0; i--){
      v = p + v;
   }
   return v;
}
function RInteger_toRange(value, min, max){
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
function RInteger_pow2(value){
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
function RInteger_sum(){
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
function RInteger_calculate(f, a, b){
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
function RInteger_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}
function RInteger_toString(p){
   return (p == null) ? '0' : p.toString();
}
var RJson = new function RJson(){
   var o = this;
   o.parse    = RJson_parse;
   o.toString = RJson_toString;
   return o;
}
function RJson_parse(value, clazz){
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
function RJson_toString(value){
   return JSON.stringify(value);
}
var RLogger = new function RLogger(){
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
   return o;
}
function RLogger_output(s, p){
   this.lsnsOutput.process(s, p);
}
function RLogger_debug(sf, ms, pm){
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
function RLogger_info(sf, ms, pm){
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
function RLogger_warn(sf, ms, pm){
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
function RLogger_error(sf, ms, pm){
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
function RLogger_fatal(sf, er, ms, pm){
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
var RMethod = new function RMethod(){
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
function RMethod_isFunction(v){
   return typeof(v) == 'function';
}
function RMethod_isEmpty(v){
   return (v && v.__empty);
}
function RMethod_isVirtual(v){
   return (v && v.__virtual);
}
function RMethod_name(value){
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
function RMethod_fullName(p){
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
function RMethod_empty(){
}
function RMethod_emptyTrue(){
   return true;
}
function RMethod_emptyFalse(){
   return false;
}
function RMethod_emptyCall(){
}
function RMethod_virtual(v, m){
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
var RObject = new function RObject(){
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
function RObject_nextId(v){
   return this._hash++;
}
function RObject_nvl(v){
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         return a[n];
      }
   }
   return null;
}
function RObject_clone(o){
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
function RObject_copy(s, t){
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
function RObject_free(item){
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
function RObject_dispose(item){
   if(item){
      if(!item.__dispose){
         item.dispose();
      }
   }
   return null;
}
function RObject_release(item){
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
var RRandom = new function(){
   var o = this;
   o._seed = (new Date()).getTime();
   o.get  = RRandom_get;
   o.rand = RRandom_rand;
   RMemory.register('RRandom', o);
   return o;
}
function RRandom_get(){
   var o = this;
   o._seed = (o._seed * 9301 + 49297) % 233280;
   return o._seed/(233280.0);
}
function RRandom_rand(n){
   return Math.ceil(this.get()*n);
}
var RRect = new function(){
   var o = this;
   o.nvl    = RRect_nvl;
   o.pack   = RRect_pack;
   o.unpack = RRect_unpack;
   return o;
}
function RRect_nvl(rect){
   return rect ? rect : new TRect();
}
function RRect_pack(rect){
   var pack = null;
   if(rect){
      pack = rect.left + ',' + rect.top + ',' + rect.right + ',' + rect.bottom;
   }
   return pack;
}
function RRect_unpack(pack, rect){
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
var RRegExp = new function RRegExp(){
   var o = this;
   o.test      = RRegExp_test;
   o.testRgexp = RRegExp_testRgexp;
   return o;
}
function RRegExp_test(r,s){
   if(r && s != null){
      return r.test(s);
   }
   return false;
}
function RRegExp_testRgexp(eps,s){
   if(eps && s){
      var r = new R
      return eps.test(s);
   }
   return false;
}
var RSet = new function RSet(){
   var o = this;
   o.contains       = RSet_contains;
   o.containsString = RSet_containsString;
   return o;
}
function RSet_contains(v, d){
   return (v & d) == d;
}
function RSet_containsString(v, d){
   if((v != null) && (s != null)){
      return v.indexOf(s) != -1;
   }
   return false;
}
var RString = new function RString(){
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
function RString_isEmpty(v){
   if(v != null){
      return (v.length == 0);
   }
   return true;
}
function RString_isBlank(v){
   if(v != null){
      return (v.trim().length == 0);
   }
   return true;
}
function RString_isAnsi(v){
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
function RString_isDbcs(v){
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
function RString_isPattern(v, p){
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
function RString_inChars(v, p){
   var o = this;
   var b = o.findChars(p, v);
   if(b != -1){
      return true;
   }
   return false;
}
function RString_contains(v, s){
   if((v != null) && (s != null)){
      return (v.toString().indexOf(s) != -1);
   }
   return false;
}
function RString_equals(s, t, f){
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
function RString_startsWith(v, s){
   if(s == null){
      return true;
   }
   return (v != null) ? (v.indexOf(s) == 0) : false;
}
function RString_endsWith(v, s){
   if(s == null){
      return true;
   }
   var n = (v != null) ? v.indexOf(s) : -1;
   return (n != -1) ? (n == (v.length - s.length)) : false;
}
function RString_findChars(v, s){
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
function RString_inRange(v, rs, f){
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
function RString_nvl(v, d){
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
function RString_nvlString(p){
   if(p == null){
      p = new TString();
   }
   return p;
}
function RString_empty(v){
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
function RString_firstUpper(v){
   return (v != null) ? v.charAt(0).toUpperCase() + v.substr(1) : v;
}
function RString_firstLower(){
   return (v != null) ? v.charAt(0).toLowerCase() + v.substr(1) : v;
}
function RString_firstLine(v){
   if(v){
      var n = Math.min(v.indexOf('\r'), v.indexOf('\n'));
      if(-1 != n){
         return v.substr(0, n);
      }
      return v;
   }
   return '';
}
function RString_format(s, p){
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
function RString_formatLines(p){
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
function RString_repeat(v, c){
   return new Array(c + 1).join(v);
}
function RString_pad(v, l, p){
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
function RString_lpad(v, l, p){
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
function RString_rpad(v, l, p){
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
function RString_trim(v, ts){
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
function RString_ltrim(v, ts){
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
function RString_rtrim(v, ts){
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
function RString_mid(v, b, e){
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
function RString_toLine(v){
   return v.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
}
function RString_toUnderline(v){
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
function RString_toLower(v){
   return (v != null) ? v.toLowerCase() : this.EMPTY;
}
function RString_toUpper(v){
   return (v != null) ? v.toUpperCase() : this.EMPTY;
}
function RString_split(s, p){
   return (s && p) ? s.split(p) : null;
}
function RString_splitTwo(s, p){
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
function RString_splitParts(s, p){
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
function RString_splitPattern(s, p){
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
function RString_replace(v, s, t){
   return v.replace(new RegExp(s, 'g'), t);
}
function RString_replaceChar(v, s, t){
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
function RString_remove(s, t){
   return s.replace(t, '');
}
function RString_removeChars(v, s){
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
var RTimer = new function RTimer(){
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
function RTimer_setup(){
   var o = this;
   var n = new Date().getTime();
   o._startTime = n;
   o._lastTime = n;
}
function RTimer_now(){
   return new Date().getTime();
}
function RTimer_current(){
   return this._lastTime;
}
function RTimer_rate(){
   var o = this;
   if(o._count == 0){
      return 0;
   }
   var t = o._lastTime - o._startTime;
   var c = o._count * 1000 / t;
   return parseInt(c);
}
function RTimer_update(){
   var o = this;
   o._count++;
   o._lastTime = new Date().getTime();
}
var EFrustumPlane = new function EFrustumPlane(){
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
function SColor4(){
   var o = this;
   o.red          = 0;
   o.green        = 0;
   o.blue         = 0;
   o.alpha        = 1;
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
function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
function SColor4_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
function SColor4_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
function SColor4_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
function SColor4_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
function SColor4_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
function SColor4_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
function SColor4_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
function SColor4_toString(){
   var o = this;
   return RFloat.format(o.red) + ',' + RFloat.format(o.green) + ',' + RFloat.format(o.blue) + ',' + RFloat.format(o.alpha);
}
function SCorners(){
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
function SCorners_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
function SCorners_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
function SCorners_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
function SCorners_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
function SCorners_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
function SCorners_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
function SCorners_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
function SCorners_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
function SCorners_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
function SCorners_toString(){
   var o = this;
   return RFloat.format(o.red) + ',' + RFloat.format(o.green) + ',' + RFloat.format(o.blue) + ',' + RFloat.format(o.alpha);
}
function SFrustum(){
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
function SFrustum_updateCenter(){
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
function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
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
function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
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
function SFrustumPlanes(){
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
function SFrustumPlanes_containsPoint(x, y, z){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(x, y, z) < 0){
         return false;
      }
   }
   return true;
}
function SFrustumPlanes_containsCube(cx, cy, cz, size){
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
function SFrustumPlanes_containsRectangle(cx, cy, cz, sx, sy, sz){
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
function SFrustumPlanes_containsCorners(p){
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
function SFrustumPlanes_containsSphere(px, py, pz, pr){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      if(ps[n].dot(px, py, pz) < -pr){
         return false;
      }
   }
   return true;
}
function SFrustumPlanes_updateVision(p){
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
function SMatrix3d(){
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
function SMatrix3d_isIdentity(){
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
function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   return o.identityData();
}
function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}
function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}
function SMatrix3d_setScaleAll(p){
   var o = this;
   o.sz = o.sy = o.sx = p;
   o._dirty = true;
}
function SMatrix3d_set(pt, pr, ps){
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
function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
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
function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}
function SMatrix3d_assign(p){
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
function SMatrix3d_attach(p){
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
function SMatrix3d_append(p){
   this.appendData(p._data);
}
function SMatrix3d_updateForce(){
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
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}
function SMatrix3d_merge(bm, am){
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
function SMatrix3d_serialize(p){
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
function SMatrix3d_unserialize(p){
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
function SMatrix3d_saveConfig(p){
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
function SMatrix3x3(){
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
function SMatrix3x3_data(){
   return this._data;
}
function SMatrix3x3_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 9; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
function SMatrix3x3_assignData(p){
   var d = this._data;
   for(var n = 0; n < 9; n++){
      d[n] = p[n];
   }
}
function SMatrix3x3_appendData(p){
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
function SMatrix3x3_rotationX(p){
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
function SMatrix3x3_rotationY(p){
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
function SMatrix3x3_rotationZ(p){
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
function SMatrix3x3_rotation(x, y, z){
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
function SMatrix3x3_invert(){
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
function SMatrix3x3_transform(po, pi, pc){
   var d = this._data;
   for(var i = 0; i < pc; i++){
      var n = (i << 1) + i;
      po[n    ] = (pi[n] * d[0]) + (pi[n + 1] * d[3]) +(pi[n + 2] * d[6]);
      po[n + 1] = (pi[n] * d[1]) + (pi[n + 1] * d[4]) +(pi[n + 2] * d[7]);
      po[n + 2] = (pi[n] * d[2]) + (pi[n + 1] * d[5]) +(pi[n + 2] * d[8]);
   }
}
function SMatrix3x3_transformPoint3(pi, po){
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
function SMatrix3x3_build(r){
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
function SMatrix3x3_writeData(d, i){
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
function SMatrix3x3_toString(){
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
function SMatrix4x4(){
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
   o.toString        = SMatrix4x4_toString;
   return o;
}
function SMatrix4x4_data(){
   return this._data;
}
function SMatrix4x4_isIdentityData(){
   var d = this._data;
   var v = RConst.identity4x4;
   for(var i = 0; i < 16; i++){
      if(d[i] != v[i]){
         return false;
      }
   }
   return true;
}
function SMatrix4x4_identityData(){
   var o = this;
   var d = o._data;
   var v = RConst.identity4x4;
   for(var i = 0; i < 16; i++){
      d[i] = v[i];
   }
   return o;
}
function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
function SMatrix4x4_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}
function SMatrix4x4_attachData(p){
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
function SMatrix4x4_appendData(p){
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
function SMatrix4x4_addTranslate(x, y, z){
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
function SMatrix4x4_addRotationX(p){
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
function SMatrix4x4_addRotationY(p){
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
function SMatrix4x4_addRotationZ(p){
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
function SMatrix4x4_addRotation(x, y, z){
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
function SMatrix4x4_addScale(x, y, z){
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
function SMatrix4x4_invert(){
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
function SMatrix4x4_transform(po, poi, pi, pii, pc){
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
function SMatrix4x4_transformPoint3(pi, po){
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
function SMatrix4x4_build(t, r, s){
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
function SMatrix4x4_buildQuaternion(r){
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
function SMatrix4x4_writeData(d, i){
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
function SMatrix4x4_toString(){
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
function SOrthoMatrix3d(){
   var o = this;
   SMatrix3d.call(o);
   o.perspectiveLH            = SOrthoMatrix3d_perspectiveLH;
   o.perspectiveRH            = SOrthoMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SOrthoMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SOrthoMatrix3d_perspectiveFieldOfViewRH;
   return o;
}
function SOrthoMatrix3d_perspectiveLH(pw, ph, pn, pf){
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
function SOrthoMatrix3d_perspectiveRH(pw, ph, pn, pf){
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
function SOrthoMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
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
function SOrthoMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
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
function SOutline3(){
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
function SOutline3_isEmpty(p){
   var o = this;
   return o.min.isEmpty() && o.max.isEmpty();
}
function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
}
function SOutline3_setMin(){
   var o = this;
   o.min.setMax();
   o.max.setMin();
}
function SOutline3_setMax(){
   var o = this;
   o.min.setMin();
   o.max.setMax();
}
function SOutline3_set(minX, minY, minZ, maxX, maxY, maxZ){
   var o = this;
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
}
function SOutline3_mergeMin(p){
   var o = this;
   o.min.mergeMax(p.min);
   o.max.mergeMin(p.max);
}
function SOutline3_mergeMax(p){
   var o = this;
   o.min.mergeMin(p.min);
   o.max.mergeMax(p.max);
}
function SOutline3_mergePoint(x, y, z){
   var o = this;
   o.min.mergeMin3(x, y, z);
   o.max.mergeMax3(x, y, z);
}
function SOutline3_serialize(p){
   var o = this;
   o.min.serialize(p);
   o.max.serialize(p);
}
function SOutline3_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}
function SOutline3_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
function SOutline3d(){
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
function SOutline3d_update(){
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
function SOutline3d_calculateFrom(outline, matrix){
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
function SOutline3d_calculate(p){
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
function SPadding(l, t, r, b){
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
function SPadding_isEmpty(){
   var o = this;
   return (o.left == 0) && (o.top == 0) && (o.right == 0) && (o.bottom == 0);
}
function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}
function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}
function SPadding_parse(v){
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
function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
function SPadding_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.right = null;
   o.bottom = null;
}
function SPadding_dump(d){
   var o = this;
   return RClass.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}
function SPerspectiveMatrix3d(){
   var o = this;
   SMatrix3d.call(o);
   o.perspectiveLH            = SPerspectiveMatrix3d_perspectiveLH;
   o.perspectiveRH            = SPerspectiveMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SPerspectiveMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SPerspectiveMatrix3d_perspectiveFieldOfViewRH;
   return o;
}
function SPerspectiveMatrix3d_perspectiveLH(pw, ph, pn, pf){
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
function SPerspectiveMatrix3d_perspectiveRH(pw, ph, pn, pf){
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
function SPerspectiveMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
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
function SPerspectiveMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
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
function SPlane(o){
   if(!o){o = this;}
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
function SPlane_assign(p){
   var o = this;
   o.a = p.a;
   o.b = p.b;
   o.c = p.c;
   o.d = p.d;
}
function SPlane_set(pa, pb, pc, pd){
   var o = this;
   o.a = pa;
   o.b = pb;
   o.c = pc;
   o.d = pd;
}
function SPlane_normalize(){
   var o = this;
   var r = 1 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}
function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + o.d;
}
function SPlane_toString(){
   var o = this;
   return o.a + ',' + o.b + ',' + o.c + ',' + o.d;
}
function SPlane_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.toString() + ']';
}
function SPoint2(x, y){
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
function SPoint2_isEmpty(){
   var o = this;
   return (o.x == 0) && (o.y == 0);
}
function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}
function SPoint2_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
}
function SPoint2_set(x, y){
   var o = this;
   o.x = x;
   o.y = y;
}
function SPoint2_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
}
function SPoint2_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
}
function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}
function SPoint2_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
}
function SPoint2_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ']';
}
function SPoint3(x, y, z){
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
function SPoint3_conjugate(p){
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
function SPoint3_mergeMin(p){
   var o = this;
   o.x = Math.min(o.x, p.x);
   o.y = Math.min(o.y, p.y);
   o.z = Math.min(o.z, p.z);
}
function SPoint3_mergeMin3(x, y, z){
   var o = this;
   o.x = Math.min(o.x, x);
   o.y = Math.min(o.y, y);
   o.z = Math.min(o.z, z);
}
function SPoint3_mergeMax(p){
   var o = this;
   o.x = Math.max(o.x, p.x);
   o.y = Math.max(o.y, p.y);
   o.z = Math.max(o.z, p.z);
}
function SPoint3_mergeMax3(x, y, z){
   var o = this;
   o.x = Math.max(o.x, x);
   o.y = Math.max(o.y, y);
   o.z = Math.max(o.z, z);
}
function SPoint3_resize(x, y, z){
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
function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
function SPoint4(x, y, z, w){
   var o = this;
   SValue4.call(o, x, y, z, w);
   o.serialize3   = SPoint4_serialize3;
   o.unserialize3 = SPoint4_unserialize3;
   return o;
}
function SPoint4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
function SPoint4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
function SQuaternion(o){
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
function SQuaternion_identity(){
   var o = this;
   o.x = o.y = o.z = 0;
   o.w = 1;
   return o;
}
function SQuaternion_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
function SQuaternion_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
function SQuaternion_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
function SQuaternion_normalize(){
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
function SQuaternion_conjugate(p){
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
function SQuaternion_mul(p){
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
function SQuaternion_mul2(p1, p2){
   var o = this;
   o.x = (p1.w * p2.x) + (p1.x * p2.w) + (p1.y * p2.z) - (p1.z * p2.y);
   o.y = (p1.w * p2.y) + (p1.y * p2.w) + (p1.z * p2.x) - (p1.x * p2.z);
   o.z = (p1.w * p2.z) + (p1.z * p2.w) + (p1.x * p2.y) - (p1.y * p2.x);
   o.w = (p1.w * p2.w) - (p1.x * p2.x) - (p1.y * p2.y) - (p1.z * p2.z);
}
function SQuaternion_translate(pi, po){
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
function SQuaternion_slerp(v1, v2, r){
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
function SQuaternion_fromAxisAngle(a, g){
   var o = this;
   var r = g * 0.5;
   var s = Math.sin(r);
   o.x = a.x * s;
   o.y = a.y * s;
   o.z = a.z * s;
   o.w = Math.cos(r);
}
function SQuaternion_fromEuler(p, y, r){
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
function SQuaternion_parseEuler(p){
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
function SQuaternion_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
function SQuaternion_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
function SQuaternion_clone(){
   var o = this;
   var r = new SQuaternion();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   r.w = o.w;
   return r;
}
function SQuaternion_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
function SRange(x, y, w, h){
   var o = this;
   o.x         = x;
   o.y         = y;
   o.width     = w;
   o.height    = h;
   o.dump      = SRange_dump;
   return o;
}
function SRange_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SRange_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
function SRange_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
function SRange_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
function SRange_width(){
   return this.right - this.left + 1;
}
function SRange_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
function SRange_height(){
   return this.bottom - this.top + 1;
}
function SRange_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
function SRange_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
function SRange_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
function SRange_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
function SRange_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.append(RClass.name(o));
   d.append(' [', o.x, ',', o.y, '-', o.width, ',', o.height, '] ');
   return d;
}
function SRectangle(){
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
function SRectangle_left(){
   return this.position.x;
}
function SRectangle_top(){
   return this.position.y;
}
function SRectangle_right(){
   return this.position.x + this.size.width;
}
function SRectangle_bottom(){
   return this.position.y + this.size.height;
}
function SRectangle_width(){
   return this.size.width;
}
function SRectangle_height(){
   return this.size.height;
}
function SRectangle_assign(p){
   var o = this;
   o.position.assign(p.position);
   o.size.assign(p.size);
}
function SRectangle_setPosition(l, t, w, h){
   this.position.set(l, t);
}
function SRectangle_setSize(w, h){
   this.size.set(w, h);
}
function SRectangle_set(l, t, w, h){
   var o = this;
   o.position.set(l, t);
   o.size.set(w, h);
}
function SRectangle_toString(){
   var o = this;
   return o.position.x + ',' + o.position.y + ',' + o.size.width + ',' + o.size.height;
}
function SRectangle_dispose(){
   var o = this;
   o.position = o.position.dispose();
   o.size = o.size.dispose();
}
function SRectangle_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.position.x + ',' + o.position.y + '-' + o.size.width + ',' + o.size.height + ']';
}
function SSize2(width, height){
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
function SSize2_isEmpty(){
   var o = this;
   return (o.width == 0) && (o.height == 0);
}
function SSize2_equalsData(w, h){
   var o = this;
   if(o.width != w){
      return false;
   }
   if(o.height != h){
      return false;
   }
   return true;
}
function SSize2_equals(p){
   var o = this;
   if(o.width != p.width){
      return false;
   }
   if(o.height != p.height){
      return false;
   }
   return true;
}
function SSize2_square(){
   return this.width * this.height;
}
function SSize2_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
}
function SSize2_set(w, h){
   var o = this;
   o.width = w;
   o.height = h;
}
function SSize2_serialize(output){
   var o = this;
   output.writeFloat(o.width);
   output.writeFloat(o.height);
}
function SSize2_unserialize(input, dataCd){
   var o = this;
   if(!dataCd){
      dataCd = EDataType.Float16;
   }
   o.width = input.readData(dataCd);
   o.height = input.readData(dataCd);
}
function SSize2_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 2){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
function SSize2_toString(){
   var o = this;
   return o.width + ',' + o.height;
}
function SSize2_dispose(){
   var o = this;
   o.width = null;
   o.height = null;
}
function SSize2_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.width + ',' + o.height + ']';
}
function SSize3(w, h, d){
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
function SSize3_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
   o.deep = v.deep;
}
function SSize3_set(w, h, d){
   var o = this;
   o.width = w;
   o.height = h;
   o.deep = d;
}
function SSize3_parse(v){
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
function SSize3_toString(){
   var o = this;
   return o.width + ',' + o.height + ',' + o.deep;
}
function SSize3_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
}
function SSquare(l, t, r, b){
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
function SSquare_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SSquare_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
function SSquare_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
function SSquare_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
function SSquare_width(){
   return this.right - this.left + 1;
}
function SSquare_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
function SSquare_height(){
   return this.bottom - this.top + 1;
}
function SSquare_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
function SSquare_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
function SSquare_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
function SSquare_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
function SSquare_dump(d){
   d = RString.nvlStr(d);
   d.append(RClass.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
function SValue3(x, y, z){
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
function SValue3_isEmpty(p){
   var o = this;
   return (o.x == 0) && (o.y == 0) && (o.z == 0);
}
function SValue3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}
function SValue3_setMin(){
   var o = this;
   o.x = Number.MIN_VALUE;
   o.y = Number.MIN_VALUE;
   o.z = Number.MIN_VALUE;
}
function SValue3_setMax(){
   var o = this;
   o.x = Number.MAX_VALUE;
   o.y = Number.MAX_VALUE;
   o.z = Number.MAX_VALUE;
}
function SValue3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}
function SValue3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}
function SValue3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}
function SValue3_negative(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new o.constructor();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}
function SValue3_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
function SValue3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
function SValue3_parse(p){
   var o = this;
   var r = p.split(',')
   if(r.length == 3){
      o.x = parseFloat(r[0]);
      o.y = parseFloat(r[1]);
      o.z = parseFloat(r[2]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", p);
   }
}
function SValue3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}
function SValue4(x, y, z, w){
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
function SValue4_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
function SValue4_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
function SValue4_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
function SValue4_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
      o.w /= w;
   }
}
function SValue4_negative(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new o.constructor();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   r.w = -o.w;
   return r;
}
function SValue4_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
function SValue4_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
function SValue4_parse(p){
   var o = this;
   var r = p.split(',')
   if(r.length == 4){
      o.x = parseFloat(r[0]);
      o.y = parseFloat(r[1]);
      o.z = parseFloat(r[2]);
      o.w = parseFloat(r[3]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", p);
   }
}
function SValue4_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
function SVector3(x, y, z){
   var o = this;
   SValue3.call(o, x, y, z);
   o.conjugate = SVector3_conjugate;
   o.dotPoint3 = SVector3_dotPoint3;
   o.cross     = SVector3_cross;
   o.cross2    = SVector3_cross2;
   o.slerp     = SVector3_slerp;
   o.clone     = SVector3_clone;
   return o;
}
function SVector3_conjugate(p){
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
function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}
function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}
function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
function SVector3_clone(){
   var o = this;
   var r = new SVector3();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   return r;
}
function SVector4(x, y, z, w){
   var o = this;
   SValue4.call(o, x, y, z, w);
   o.serialize3   = SVector4_serialize3;
   o.unserialize3 = SVector4_unserialize3;
   return o;
}
function SVector4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
function SVector4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
var RMath = new function RMath(){
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
function RMath_construct(){
   var o = this;
   o.vectorAxisX = new SVector3(1, 0, 0);
   o.vectorAxisY = new SVector3(0, 1, 0);
   o.vectorAxisZ = new SVector3(0, 0, 1);
   o.vectorScale = new SVector3(1, 1, 1);
   o.vectorForward = new SVector3(0, 0, 1);
   o.vectorBackward = new SVector3(0, 0, -1);
   o.vector3 = new SVector3();
   o.rectangle = new SRectangle();
   o.matrix = new SMatrix3d();
}
function RMath_min(){
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
function RMath_max(){
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
function RMath_sign(value){
   if(value > 0){
      return 1;
   }else if(value < 0){
      return -1;
   }
   return 0;
}
function AStyle(n, s){
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
function AStyle_code(){
   return this._style;
}
function AStyle_style(){
   return this._style;
}
function AStyle_build(v){
   var o = this;
   v[o._name] = null;
}
function AStyle_toString(){
   var o = this;
   return 'style=' + o._style;
}
function AStyleIcon(n, s){
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
function AStyleIcon_code(){
   return this._style;
}
function AStyleIcon_style(){
   return this._style;
}
function AStyleIcon_build(v){
   var o = this;
   v[o._name] = null;
}
function AStyleIcon_toString(){
   var o = this;
   return 'style=' + o._style;
}
var EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 0;
   o.Explorer = 1;
   o.FireFox = 2;
   o.Chrome = 3;
   o.Safari = 4;
   return o;
}
var EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 0;
   o.Pc = 1;
   o.Mobile = 2;
   return o;
}
var EEvent = new function EEvent(){
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
   return o;
}
var EHttpContent = new function EHttpContent(){
   var o = this;
   o.Binary = 1;
   o.Text  = 2;
   return o;
}
var EHttpMethod = new function EHttpMethod(){
   var o = this;
   o.Get  = 'GET';
   o.Post = 'POST';
   return o;
}
var EHttpStatus = new function EHttpStatus(){
   var o = this;
   o.Begin   = 0;
   o.Build   = 1;
   o.Send    = 2;
   o.Receive = 3;
   o.Finish  = 4;
   return o;
}
var EKeyCode = new function EKeyCode(){
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
var EKeyStatus = new function EKeyStatus(){
   var o = this;
   o.Normal = 0;
   o.Press  = 1;
   return o;
}
var EMouseButton = new function EMouseButton(){
   var o = this;
   o.Left   = 0;
   o.Right  = 2;
   o.Middle = 3;
   return o;
}
var EMouseCursor = new function EMouseCursor(){
   var o = this;
   o.HSize = 'E-resize';
   o.VSize = 'N-resize';
   return o;
}
var EOrientation = new function EOrientation(){
   var o = this;
   o.Unknown = 0;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
var ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 0;
   o.Window = 1;
   o.Linux = 2;
   o.Android = 3;
   o.Apple = 4;
   return o;
}
function MAttributeCode(o){
   o = RClass.inherits(this, o);
   o._code   = null;
   o.isCode  = MAttributeCode_isCode;
   o.code    = MAttributeCode_code;
   o.setCode = MAttributeCode_setCode;
   return o;
}
function MAttributeCode_isCode(code){
   return this._code == code;
}
function MAttributeCode_code(){
   return this._code;
}
function MAttributeCode_setCode(code){
   this._code = code;
}
function MAttributeGuid(o){
   o = RClass.inherits(this, o);
   o._guid   = null;
   o.guid    = MAttributeGuid_guid;
   o.setGuid = MAttributeGuid_setGuid;
   return o;
}
function MAttributeGuid_guid(){
   return this._guid;
}
function MAttributeGuid_setGuid(guid){
   this._guid = guid;
}
function MAttributeLabel(o){
   o = RClass.inherits(this, o);
   o._label   = null;
   o.label    = MAttributeLabel_label;
   o.setLabel = MAttributeLabel_setLabel;
   return o;
}
function MAttributeLabel_label(){
   return this._label;
}
function MAttributeLabel_setLabel(label){
   this._label = label;
}
function MAttributeName(o){
   o = RClass.inherits(this, o);
   o._name   = null;
   o.name    = MAttributeName_name;
   o.setName = MAttributeName_setName;
   return o;
}
function MAttributeName_name(){
   return this._name;
}
function MAttributeName_setName(name){
   this._name = name;
}
function MAttributeParent(o){
   o = RClass.inherits(this, o);
   o._parent    = null;
   o.parent     = MAttributeParent_parent;
   o.findParent = MAttributeParent_findParent;
   o.setParent  = MAttributeParent_setParent;
   o.dispose    = MAttributeParent_dispose;
   return o;
}
function MAttributeParent_parent(){
   return this._parent;
}
function MAttributeParent_findParent(clazz){
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
function MAttributeParent_setParent(parent){
   this._parent = parent;
}
function MAttributeParent_dispose(){
   var o = this;
   o._parent = null;
}
function MClone(o){
   o = RClass.inherits(this, o);
   o.clone  = MClone_clone;
   return o;
}
function MClone_clone(){
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
function MDataStream(o){
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
function MDataStream_testString(){
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
function MDataStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value > 0;
}
function MDataStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value;
}
function MDataStream_readInt16(){
   var o = this;
   var value = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
function MDataStream_readInt32(){
   var o = this;
   var value = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
function MDataStream_readInt64(){
   var o = this;
   var value = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
function MDataStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return value;
}
function MDataStream_readUint16(){
   var o = this;
   var value = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return value;
}
function MDataStream_readUint32(){
   var o = this;
   var value = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
function MDataStream_readUint64(){
   var o = this;
   var value = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
function MDataStream_readFloat(){
   var o = this;
   var value = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return value;
}
function MDataStream_readDouble(){
   var o = this;
   var value = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return value;
}
function MDataStream_readString(){
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
function MDataStream_readData(dataCd){
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
function MDataStream_readBytes(data, offset, length){
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
function MDataStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}
function MDataStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}
function MDataStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}
function MDataStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}
function MDataStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}
function MDataStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}
function MDataStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}
function MDataStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}
function MDataStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}
function MDataStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}
function MDataStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}
function MDataStream_writeString(value){
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
function MDataStream_writeBytes(data, offset, length){
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
function MDataView(o){
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
function MDataView_endianCd(p){
   return this._endianCd;
}
function MDataView_setEndianCd(p){
   this._endianCd = p;
}
function MDataView_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}
function MDataView_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}
function MDataView_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}
function MDataView_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}
function MDataView_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}
function MDataView_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}
function MDataView_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}
function MDataView_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}
function MDataView_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}
function MDataView_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}
function MDataView_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}
function MDataView_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}
function MDataView_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}
function MDataView_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}
function MDataView_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}
function MDataView_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}
function MDataView_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}
function MDataView_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}
function MDataView_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}
function MDataView_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
function MListener(o){
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
function MListener_addListener(name, owner, method){
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
function MListener_setListener(name, owner, method){
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
function MListener_removeListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   var listeners = listenerss.get(name);
   return listeners.unregister(owner, method);
}
function MListener_clearListeners(name){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
}
function MListener_clearAllListeners(){
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
function MListener_processListener(name, p1, p2, p3, p4, p5){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.process(p1, p2, p3, p4, p5);
      }
   }
}
function MListener_dispose(){
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
function MListenerLoad(o){
   o = RClass.inherits(this, o, MListener);
   o.addLoadListener     = MListenerLoad_addLoadListener;
   o.removeLoadListener  = MListenerLoad_removeLoadListener;
   o.clearLoadListeners  = MListenerLoad_clearLoadListeners;
   o.processLoadListener = MListenerLoad_processLoadListener;
   return o;
}
function MListenerLoad_addLoadListener(w, m){
   return this.addListener(EEvent.Load, w, m);
}
function MListenerLoad_removeLoadListener(w, m){
   this.removeListener(EEvent.Load, w, m);
}
function MListenerLoad_clearLoadListeners(){
   this.clearListeners(EEvent.Load);
}
function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
}
function MListenerProcess(o){
   o = RClass.inherits(this, o, MListener);
   o.addProcessListener     = MListenerProcess_addProcessListener;
   o.removeProcessListener  = MListenerProcess_removeProcessListener;
   o.processProcessListener = MListenerProcess_processProcessListener;
   return o;
}
function MListenerProcess_addProcessListener(w, m){
   return this.addListener(EEvent.Process, w, m);
}
function MListenerProcess_removeProcessListener(w, m){
   this.removeListener(EEvent.Process, w, m);
}
function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Process, p1, p2, p3, p4, p5);
}
function MMouseCapture(o){
   o = RClass.inherits(this, o);
   o.onMouseCaptureStart = RMethod.virtual(o, 'onMouseCaptureStart');
   o.onMouseCapture      = RMethod.virtual(o, 'onMouseCapture');
   o.onMouseCaptureStop  = RMethod.virtual(o, 'onMouseCaptureStop');
   o.testMouseCapture    = RMethod.emptyTrue;
   return o;
}
function MMouseWheel(o){
   o = RClass.inherits(this, o);
   o.onMouseWheel = RClass.register(o, new AEventMouseWheel('onMouseWheel'), RMethod.empty);
   return o;
}
function MProperty(o){
   o = RClass.inherits(this, o);
   o.propertyAssign = MProperty_propertyAssign;
   o.propertyLoad   = MProperty_propertyLoad;
   o.propertySave   = MProperty_propertySave;
   return o;
}
function MProperty_propertyAssign(p){
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
function MProperty_propertyLoad(p){
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
function MProperty_propertySave(p){
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
function SClickEvent(sender){
   var o = this;
   SEvent.call(o, sender);
   return o;
}
function SEvent(sender){
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
function SEvent_dispose(){
   var o = this;
   for(var n in o){
      o[n] = null;
   }
}
function SKeyboardEvent(){
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
function SKeyboardEvent_attachEvent(p){
   var o = this;
   o.altKey = p.altKey;
   o.shiftKey = p.shiftKey;
   o.ctrlKey = p.ctrlKey;
   o.keyCode = p.keyCode;
}
function SKeyboardEvent_cancel(){
   var o = this;
   o.hEvent.returnValue = false;
}
function SMouseEvent(){
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
function SMouseEvent_attachEvent(event){
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
function SResizeEvent(){
   var o = this;
   SEvent.call(o);
   o.width       = null;
   o.height      = null;
   o.attachEvent = SResizeEvent_attachEvent;
   return o;
}
function SResizeEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
}
function SXmlEvent(){
   var o = this;
   SEvent.call(o);
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
function TDumpItem(){
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
function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new TDumpItem();
   return r;
}
function TDumpItem_push(v){
   var o = this;
   o.items[o.items.length] = v;
}
function TDumpItem_innerShow(v){
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
function TDumpItem_show(v){
   var o = this;
   o.display = v;
   var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = RHtml.toHtml(label);
   o.innerShow(v);
}
function THtmlItem(){
   var o = this;
   o._link  = null;
   o._links = new Object();
   o.get    = THtmlItem_get;
   o.set    = THtmlItem_set;
   return o;
}
function THtmlItem_get(n){
   return this._links[n];
}
function THtmlItem_set(n, v){
   this._links[n] = v;
}
function TXmlDocument(){
   var o = this;
   o._root   = null;
   o.create  = TXmlDocument_create;
   o.root    = TXmlDocument_root;
   o.setRoot = TXmlDocument_setRoot;
   o.xml     = TXmlDocument_xml;
   o.dump    = TXmlDocument_dump;
   return o;
}
function TXmlDocument_create(n, a, v){
   var r = new TXmlNode();
   r._name = n;
   r._attributes = a;
   r._value = v;
   return r;
}
function TXmlDocument_root(){
   var o = this;
   var r = o._root;
   if(!r){
      r = o._root = new TXmlNode();
      r._name = 'Configuration';
   }
   return r;
}
function TXmlDocument_setRoot(p){
   var o = this;
   if(!o._root){
      o._root = p;
   }else{
      throw new TError(o, 'Root node is already exists.');
   }
}
function TXmlDocument_xml(){
   var s = new TString();
   s.append("<?xml version='1.0' encoding='UTF-8'?>");
   this.root().innerXml(s, 0);
   return s.flush();
}
function TXmlDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.name(o));
   o.root().dump(r);
   return r.flush();
}
function TXmlNode(name){
   var o = this;
   TNode.call(o, name);
   o.create   = TXmlNode_create;
   o.innerXml = TXmlNode_innerXml;
   o.xml      = TXmlNode_xml;
   o.toString = TXmlNode_toString;
   return o;
}
function TXmlNode_create(n, a){
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
function TXmlNode_innerXml(s, l){
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
function TXmlNode_xml(){
   var s = new TString();
   this.innerXml(s, 0);
   return s.flush();
}
function TXmlNode_toString(){
   return this.xml().toString();
}
function FBytes(o){
   o = RClass.inherits(this, o, FObject, MDataView);
   o._memory   = null;
   o.construct = FBytes_construct;
   o.dispose   = FBytes_dispose;
   return o;
}
function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
function FBytes_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
   o.__base.FObject.dispose.call(o);
}
function FClassFactory(o){
   o = RClass.inherits(this, o, FObject);
   o._classes   = null;
   o.construct  = FClassFactory_construct;
   o.register   = FClassFactory_register;
   o.unregister = FClassFactory_unregister;
   o.create     = FClassFactory_create;
   o.dispose    = FClassFactory_dispose;
   return o;
}
function FClassFactory_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._classes = new TDictionary();
}
function FClassFactory_register(n, c){
   this._classes.set(n, c);
}
function FClassFactory_unregister(n){
   this._classes.set(n, null);
}
function FClassFactory_create(n){
   var o = this;
   var c = o._classes.get(n);
   if(!c){
      throw new TError('Create unregister class. (name={1})', n);
   }
   return RClass.create(c);
}
function FClassFactory_dispose(){
   var o = this;
   o._classes = RObject.dispose(o._classes);
   o.__base.FObject.dispose.call(o);
}
function FComponent(o){
   o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeCode);
   o.dispose = FComponent_dispose;
   return o;
}
function FComponent_dispose(){
   var o = this;
   o.__base.MAttributeParent.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FDataStream(o){
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
function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FDataStream_length(){
   return this._length;
}
function FDataStream_setLength(p){
   var o = this;
   o._length = p;
   o._memory = new ArrayBuffer(p);
   o._viewer = new DataView(o._memory);
}
function FDataStream_memory(){
   return this._memory;
}
function FDataStream_flip(){
   var o = this;
   o._length = o._position;
   o._position = 0;
}
function FDataStream_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
function FDataView(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   o.link    = FDataView_link;
   o.dispose = FDataView_dispose;
   return o;
}
function FDataView_link(p){
   var o = this;
   o._memory = p;
   o._viewer = new DataView(p);
}
function FDataView_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
function FFileReader(o){
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
function FFileReader_ohLoadStart(){
   var o = this.__linker;
}
function FFileReader_ohLoad(){
   var o = this.__linker;
}
function FFileReader_ohLoadEnd(){
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
function FFileReader_ohProgress(){
}
function FFileReader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   var reader = o._reader = new FileReader();
   reader.__linker = o;
   reader.onloadstart = o.ohLoadStart;
   reader.onload = o.ohLoad;
   reader.onloadend = o.ohLoadEnd;
   reader.onprogress = o.ohProgress;
}
function FFileReader_fileName(){
   return this._fileName;
}
function FFileReader_length(){
   return this._length;
}
function FFileReader_data(){
   return this._data;
}
function FFileReader_loadFile(file){
   var o = this;
   o._fileName = file.name;
   o._length = file.size;
   var reader = o._reader;
   reader.readAsArrayBuffer(file);
}
function FFileReader_dispose(){
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
function FHttpConnection(o){
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
function FHttpConnection_onConnectionSend(){
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
function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var connection = o._connection;
      if(connection.readyState == EHttpStatus.Finish){
         if(connection.status == 200){
            o.setOutputData();
            o.onConnectionComplete();
         }else{
            throw new TError(o, 'Connection failure. (url={1})', o._url);
         }
      }
   }
}
function FHttpConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   o.processLoadListener(o);
}
function FHttpConnection_construct(){
   var o = this;
   var c = o._connection = RXml.createConnection();
   c._linker = o;
   c.onreadystatechange = o.onConnectionReady;
}
function FHttpConnection_setHeaders(){
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
function FHttpConnection_inputData(){
   return this._inputData;
}
function FHttpConnection_setInputData(p){
   this._inputData = p;
}
function FHttpConnection_outputData(){
   return this._outputData;
}
function FHttpConnection_setOutputData(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      o._outputData = c.response;
   }else{
      o._outputData = c.responseText;
   }
}
function FHttpConnection_content(){
   return this._outputData;
}
function FHttpConnection_sendSync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, false);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   o.setOutputData();
   o.onConnectionComplete();
   RLogger.info(this, 'Send http sync request. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_sendAsync(){
   var o = this;
   var c = o._connection;
   c.open(o._methodCd, o._url, true);
   o.setHeaders(c, 0);
   c.send(o._inputData);
   RLogger.info(this, 'Send http asynchronous request. (method={1}, url={2})', o._methodCd, o._url);
}
function FHttpConnection_send(url, data){
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
function FHttpConnection_dispose(){
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
function FXmlConnection(o){
   o = RClass.inherits(this, o, FHttpConnection);
   o._contentCd           = EHttpContent.Text;
   o._inputNode           = null;
   o._outputNode          = null;
   o.onConnectionSend     = FXmlConnection_onConnectionSend;
   o.onConnectionComplete = FXmlConnection_onConnectionComplete;
   o.content              = FXmlConnection_content;
   return o;
}
function FXmlConnection_onConnectionSend(){
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
function FXmlConnection_onConnectionComplete(){
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
function FXmlConnection_content(){
   return this._outputNode;
}
function FXmlData(o){
   o = RClass.inherits(this, o, FObject);
   o._ready    = null;
   o._config   = null;
   o.testReady = FXmlData_testReady;
   return o;
}
function FXmlData_testReady(){
   return this._ready;
}
var RDump = new function RDump(){
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
function RDump_onclick(){
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
function RDump_nameInfo(v){
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
function RDump_typeInfo(v, t){
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
function RDump_dumpInner(di){
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
      var value = obj[name];
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
function RDump_dump(v, h){
   if(!h){
      h = RBuilder.append(null, 'DIV')
   }
   var s = new TString();
   s.append('<', RClass.safeTypeOf(v));
   if(v && v.tagName){
      s.append(' - ', v.tagName);
   }
   s.appendLine('@' + RClass.code(v) + '>');
   var hPanel = RBuilder.append(h, 'DIV');
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
   di.hParent = h;
   di.link = v;
   di.level = 0;
   this.dumpInner(di);
}
function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}
function RDump_stack(){
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
var REngine = new function REngine(){
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
function REngine_onRelease(){
   RConsole.release();
   REvent.release();
   CollectGarbage();
}
function REngine_register(s){
   var o = this;
   var p = o._spaces[s.space];
   if(!p){
      p = o._spaces[s.space] = new Object();
   }
   p[s.name] = s;
}
function REngine_initialize(){
   var o = this;
   RConsole.initialize();
}
function REngine_connect(){
   var o = this;
   RConsole.initialize();
}
function REngine_buildSpace(t, p){
   var o = this;
   for(var n in p){
      if(RString.startsWith(n, 'R')){
         t[n.substring(1)] = p[n].instance;
      }
   }
}
function REngine_find(s, n){
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
function REngine_findGlobal(n){
   return this.find(ESpace.Global, n);
}
function REngine_findTop(n){
   return top.REngine.find(ESpace.Top, n);
}
function REngine_findLocal(n){
   return this.find(ESpace.Local, n);
}
var RHtml = new function RHtml(){
   var o = this;
   o._nextUid        = 1;
   o._links          = new Object();
   o._clientPosition = new SPoint2();
   o.uid            = RHtml_uid;
   o.fullscreen     = RHtml_fullscreen;
   o.displayGet     = RHtml_displayGet;
   o.displaySet     = RHtml_displaySet;
   o.visibleGet     = RHtml_visibleGet;
   o.visibleSet     = RHtml_visibleSet;
   o.textGet        = RHtml_textGet;
   o.textSet        = RHtml_textSet;
   o.checkGet       = RHtml_checkGet;
   o.checkSet       = RHtml_checkSet;
   o.radioGet       = RHtml_radioGet;
   o.radioSet       = RHtml_radioSet;
   o.cursorSet      = RHtml_cursorSet;
   o.linkGet        = RHtml_linkGet;
   o.linkSet        = RHtml_linkSet;
   o.clientPosition = RHtml_clientPosition;
   o.clientX        = RHtml_clientX;
   o.clientY        = RHtml_clientY;
   o.setSize        = RHtml_setSize;
   o.toText         = RHtml_toText;
   o.toHtml         = RHtml_toHtml;
   o.eventSource    = RHtml_eventSource;
   o.get            = RHtml_get;
   o.parent         = RHtml_parent;
   o.searchLinker   = RHtml_searchLinker;
   o.searchObject   = RHtml_searchObject;
   o.tableMoveRow   = RHtml_tableMoveRow;
   o.free           = RHtml_free;
   o.offsetPosition = RHtml_offsetPosition;
   o.offsetX        = RHtml_offsetX;
   o.offsetY        = RHtml_offsetY;
   o.scrollWidth    = RHtml_scrollWidth;
   o.scrollHeight   = RHtml_scrollHeight;
   o.point          = RHtml_point;
   o.toPoint        = RHtml_toPoint;
   o.rect           = RHtml_rect;
   o.toRect         = RHtml_toRect;
   o.top            = RHtml_top;
   o.clientRect     = RHtml_clientRect;
   o.offsetRect     = RHtml_offsetRect;
   o.changeWidth    = RHtml_changeWidth;
   o.clear          = RHtml_clear;
   o.setRect        = RHtml_setRect;
   o.setBounds      = RHtml_setBounds;
   o.setPixelRect   = RHtml_setPixelRect;
   o.setPixelBounds = RHtml_setPixelBounds;
   o.showNodes      = RHtml_showNodes;
   o.hideNodes      = RHtml_hideNodes;
   o.showChildren   = RHtml_showChildren;
   o.hideChildren   = RHtml_hideChildren;
   o.posParent      = RHtml_posParent;
   o.form           = RHtml_form;
   o.popup          = RHtml_popup;
   o.bodyWidth      = RHtml_bodyWidth;
   o.bodyHeight     = RHtml_bodyHeight;
   o.frameHeight    = RHtml_frameHeight;
   o.selectText     = RHtml_selectText;
   o.currentStyle   = RHtml_currentStyle;
   o.clone          = RHtml_clone;
   return o;
}
function RHtml_uid(v){
   var r = v.__puuid;
   if(r == null){
      r = v.__puuid = RHtml._nextUid++;
   }
   return r;
}
function RHtml_fullscreen(h, f){
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
function RHtml_displayGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'inline');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_displaySet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? 'inline' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_visibleGet(h){
   var r = null;
   var s = h.style.display;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      r = (s == 'block');
   }else{
      r = (s != 'none');
   }
   return r;
}
function RHtml_visibleSet(h, v){
   var s = null;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      s = v ? '' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}
function RHtml_textGet(h, v){
   var r = null;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      r = h.textContent;
   }else{
      r = h.innerText;
   }
   return r;
}
function RHtml_textSet(h, v){
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      h.textContent = v;
   }else{
      h.innerText = v;
   }
}
function RHtml_checkGet(h){
   return RBool.toString(h.checked);
}
function RHtml_checkSet(h, v){
   h.checked = RBool.isTrue(v);
}
function RHtml_radioGet(hs){
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
function RHtml_radioSet(hs, v){
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
function RHtml_cursorSet(h, v){
   if(h){
      h.style.cursor = v;
   }
}
function RHtml_linkGet(h, n){
   var o = this;
   var u = o.uid(h);
   var i = o._links[u];
   return i ? i.get(n) : null;
}
function RHtml_linkSet(h, n, v){
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
function RHtml_clientPosition(hTag, hTop){
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
function RHtml_clientX(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetLeft - p.scrollLeft;
      p = p.offsetParent;
   }
   return r;
}
function RHtml_clientY(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetTop - p.scrollTop;
      p = p.offsetParent;
   }
   return r;
}
function RHtml_setSize(h, s){
   if(s.width){
      h.style.width = s.width + 'px';
   }
   if(s.height){
      h.style.height = s.height + 'px';
   }
}
function RHtml_toText(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/&lt;/, '<');
      p = p.replace(/&gt;/g, '>');
      p = p.replace(/&nbsp;/g, ' ');
      p = p.replace(/<BR>/g, '\n');
   }
   return p;
}
function RHtml_toHtml(p){
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
function RHtml_eventSource(p){
   return p.srcElement ? p.srcElement : p.target;
}
function RHtml_get(name){
   return document.getElementById(name);
}
function RHtml_parent(tag, typeName){
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
function RHtml_searchLinker(h, c){
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
function RHtml_searchObject(h, n){
   while(h){
      var f = h[n];
      if(f){
         return f;
      }
      h = h.parentElement;
   }
   return null;
}
function RHtml_tableMoveRow(ph, ps, pt){
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
function RHtml_free(p){
   return null;
}
function RHtml_clone(o, s, t){
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
function RHtml_offsetPosition(h, t){
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
function RHtml_offsetX(h){
   var x = 0;
   while(h){
      x += h.offsetLeft;
      h = h.offsetParent;
   }
   return x;
}
function RHtml_offsetY(h){
   var y = 0;
   while(h){
      y += h.offsetTop;
      h = h.offsetParent;
   }
   return y;
}
function RHtml_bodyWidth(doc){
   return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
}
function RHtml_bodyHeight(doc){
   return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
}
function RHtml_frameHeight(f){
   var hd = f.contentWindow.document;
   var oh = hd.body.scrollHeight;
   var sh = hd.documentElement.scrollHeight;
   return Math.max(oh, sh);
}
function RHtml_scrollWidth(h){
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
function RHtml_scrollHeight(h){
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
function RHtml_currentStyle(p){
   if(p.currentStyle){
      return p.currentStyle;
   }
   return window.getComputedStyle(p, null);
}
function RHtml_point(o, p){
   return this.toPoint(new TPoint(), o, p);
}
function RHtml_toPoint(r, o, p){
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
function RHtml_rect(o, p){
   return this.toRect(new TRect(), o, p);
}
function RHtml_toRect(r, o, p){
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
function RHtml_top(h){
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
function RHtml_clientRect(o){
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
function RHtml_offsetRect(o){
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
function RHtml_clear(h){
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
function RHtml_setRect(h, r){
   if(h && h.style){
      var s = h.style;
      s.left = r.left;
      s.top = r.top;
      s.width = r.width();
      s.height = r.height();
   }
}
function RHtml_setBounds(r, l, t, w, h){
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
function RHtml_setPixelRect(o, r){
   if(o && o.style){
      var s = o.style;
      s.pixelLeft = r.left;
      s.pixelTop = r.top;
      s.pixelWidth = r.width();
      s.pixelHeight = r.height();
   }
}
function RHtml_setPixelBounds(o, l, t, w, h){
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
function RHtml_changeWidth(s, t){
   if(s && t){
      var ts = RHtml.currentStyle(t);
      var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
      t.style.pixelWidth = s.offsetWidth - tw;
   }
}
function RHtml_showNodes(h, o){
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
function RHtml_hideNodes(h, o){
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
function RHtml_showChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'block';
         }
      }
   }
}
function RHtml_hideChildren(h){
   if(h && h.children){
      for(var n=0; n<h.children.length; n++){
         var c = h.children(n);
         if(c.tagName && c.style){
            c.style.display = 'none';
         }
      }
   }
}
function RHtml_posParent(h){
   while(h){
      if('visible' != h.currentStyle.overflow){
         return h;
      }
      h = h.offsetParent;
   }
   return null;
}
function RHtml_form(h){
   if(h){
      var f = this.parent(h, 'FORM');
      return f ? f : h.ownerDocument.forms[0];
   }
   return window.document.forms[0];
}
function RHtml_popup(u, w, h){
   var l = (screen.width - w)/2;
   var t = (screen.height - h)/2 - 20;
   var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
   window.open(u, '_blank', s);
}
function RHtml_selectText(){
   var ip = document.getElementById(id);
   ip.select();
   return document.selection.createRange().text;
}
function getTRNode(nowTR, sibling) {
   while(nowTR = nowTR[sibling]){
      if(nowTR.tagName == 'TR'){
         break;
      }
   }
   return nowTR;
}
var RKeyboard = new function RKeyboard(){
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
function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = EKeyStatus.Press;
}
function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = EKeyStatus.Normal;
}
function RKeyboard_construct(){
   var o = this;
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = EKeyStatus.Normal;
   }
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}
function RKeyboard_isControlKey(p){
   var s = EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}
function RKeyboard_isIntegerKey(c){
   return EKeyCode.integerCodes[c];
}
function RKeyboard_isFloatKey(c){
   return EKeyCode.floatCodes[c];
}
function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}
function RKeyboard_isPress(p){
   var o = this;
   var v = o._status[p];
   return v == EKeyStatus.Press;
}
function RKeyboard_fixCase(e, c){
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
function RKeyboard_fixPattern(e, p){
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
function RKeyboard_fixChars(e, p){
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
var RLoader = new function RLoader(){
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
function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}
function RLoader_onInterval(){
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
function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}
function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}
function RLoader_loadJsFile(id, src){
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
function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}
function RLoader_loaded(id){
   var o = this;
   o._loading.extract(id);
   o._loaded.push(id);
}
function RLoader_wait(invoke, ids){
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
function RLoader_waitJs(invoke, ids){
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
var RMessage = new function(){
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
function RMessage_push(msg){
   if(!this._messages){
      this._messages = new FLoopList();
   }
   this._messages.push(msg);
}
function RMessage_fatal(sf, er, ms, pm){
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
function RMessage_error(self, method, msg, params){
   if(this._hasError){
      return;
   }
   this._hasError = true;
   throw new Error(msg);
}
function RMessage_warn(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FAlertWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_info(self, message, params){
   var s = new TString();
   var n = 0;
   var aw = top.RControl.create(FInfoWindow);
   aw.setText(message);
   aw.show();
}
function RMessage_confirm(message,callback){
   var o = this;
   var ls = top.RControl.create(FConfirmWindow);
   ls.setText(message);
   ls.lsns.register(o, callback);
   ls.show();
}
function RMessage_onWindowClose(v){
   this.confirmResult = v;
}
var RResource = new function RResource(){
   var o = this;
   o.uriIcon     = '/ars/icon/';
   o.uriImage    = '/ars/img/';
   o.iconPath    = RResource_iconPath;
   o.iconUrlPath = RResource_iconUrlPath;
   o.imagePath   = RResource_imagePath;
   return o;
}
function RResource_iconPath(path, type){
   var o = this;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   return RBrowser.contentPath('/ars/icon/' + path);
}
function RResource_iconUrlPath(path, type){
   var o = this;
   path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   return RBrowser.contentPath('/ars/icon/' + path);
}
function RResource_imagePath(path, type){
   var o = this;
}
var RStyle = new function RStyle(){
   var o = this;
   o._connected = false;
   o._rules     = new TMap();
   o.connect    = RStyle_connect;
   o.has        = RStyle_has;
   o.nvl        = RStyle_nvl;
   o.style      = RStyle_style;
   return o;
}
function RStyle_connect(){
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
function RStyle_has(s){
   var o = this;
   if(!o._connected){
      o.connect();
   }
   if(s){
      return this._rules.contains('.' + s.toLowerCase());
   }
   return false;
}
function RStyle_nvl(s, n){
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
function RStyle_style(c, n){
   return RClass.name(c) + '_' + n;
}
var RTypeArray = new function RTypeArray(){
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
function RTypeArray_float3(){
   var o = this;
   var v = o._float3;
   if(v == null){
      v = o._float3 = new Float32Array(3);
   }
   return v;
}
function RTypeArray_float4(){
   var o = this;
   var v = o._float4;
   if(v == null){
      v = o._float4 = new Float32Array(4);
   }
   return v;
}
function RTypeArray_createArray(t, l){
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
function RTypeArray_findTemp(t, l){
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
function FTag(o){
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
function FTag_onBegin(p){
   return EResult.Continue;
}
function FTag_onEnd(p){
   return EResult.Continue;
}
function FTag_name(){
   return this._name;
}
function FTag_set(n, v){
   throw new TError(this, 'Unknown attribute name. (name={1}, value={2})', n, v);
}
function FTag_push(p){
   var o = this;
   var ts = o._children;
   if(ts == null){
      ts = o._children = new TObjects();
   }
   ts.push(p);
}
function FTag_parse(p){
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
function FTag_toString(){
   return null;
}
function FTag_innerDump(ps, pt, pl){
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
function FTag_dump(){
   var r = new TString();
   this.innerDump(r, this, 0);
   return r.toString();
}
function FTagContext(o){
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
function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new TAttributes();
   o._source = new TString();
}
function FTagContext_instanceAlloc(p){
   this._attributes.clear();
}
function FTagContext_attributes(){
   return this._attributes;
}
function FTagContext_get(n, v){
   return this._attributes.get(n, v);
}
function FTagContext_set(n, v){
   this._attributes.set(n, v);
}
function FTagContext_setBoolean(n, v){
   this._attributes.set(n, RBoolean.toString(v));
}
function FTagContext_source(){
   return this._source.toString();
}
function FTagContext_write(p){
   if(!RString.isEmpty(p)){
      this._source.append(p);
   }
}
function FTagContext_resetSource(p){
   this._source.clear();
}
function FTagContext_dispose(){
   var o = this;
   o._attributes.dispose();
   o._attributes = null;
   o._source.dispose();
   o._source = null;
   o.__base.FObject.dispose.call(o);
}
function FTagDocument(o){
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
function FTagDocument_space(){
   return this._space;
}
function FTagDocument_setSpace(p){
   this._space = p;
}
function FTagDocument_create(p){
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
function FTagDocument_root(){
   return this._root;
}
function FTagDocument_loadNode(pn, pe){
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
function FTagDocument_load(p){
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
function FTagDocument_parse(p){
   var o = this;
   p.resetSource();
   o._root.parse(p);
   return p.source();
}
function FTagDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
function FTagEquals(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = FTagEquals_onBegin;
   o.set       = FTagEquals_set;
   o.toString  = FTagEquals_toString;
   return o;
}
function FTagEquals_onBegin(p){
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
function FTagEquals_set(n, v){
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
function FTagEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
function FTagFalse(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = FTagFalse_onBegin;
   o.set       = FTagFalse_set;
   o.toString  = FTagFalse_toString;
   return o;
}
function FTagFalse_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   return RBoolean.parse(v) ? EResult.Skip : EResult.Continue;
}
function FTagFalse_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagFalse_toString(){
   var o = this;
   return 'source=' + o._source;
}
function FTagNotEquals(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o._value    = null;
   o.onBegin   = FTagNotEquals_onBegin;
   o.set       = FTagNotEquals_set;
   o.toString  = FTagNotEquals_toString;
   return o;
}
function FTagNotEquals_onBegin(p){
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
function FTagNotEquals_set(n, v){
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
function FTagNotEquals_toString(){
   var o = this;
   return 'source=' + o._source + ', value=' + o._value;
}
function FTagText(o){
   o = RClass.inherits(this, o, FTag);
   o._text    = null;
   o.onBegin  = FTagText_onBegin;
   o.text     = FTagText_text;
   o.setText  = FTagText_setText;
   o.toString = FTagText_toString;
   return o;
}
function FTagText_onBegin(p){
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
function FTagText_text(){
   return this._text;
}
function FTagText_setText(p){
   this._text = p;
}
function FTagText_toString(){
   var o = this;
   return '{' + o._text + '}';
}
function FTagTrue(o){
   o = RClass.inherits(this, o, FTag);
   o._trimLeft = true;
   o._source   = null;
   o.onBegin   = FTagTrue_onBegin;
   o.set       = FTagTrue_set;
   o.toString  = FTagTrue_toString;
   return o;
}
function FTagTrue_onBegin(p){
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
function FTagTrue_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagTrue_toString(){
   var o = this;
   return 'source=' + o._source;
}
function FTagWrite(o){
   o = RClass.inherits(this, o, FTag);
   o._source  = null;
   o.onBegin  = FTagWrite_onBegin;
   o.set      = FTagWrite_set;
   o.toString = FTagWrite_toString;
   return o;
}
function FTagWrite_onBegin(p){
   var o = this;
   var v = p.get(o._source);
   p.write(v);
   return EResult.Skip;
}
function FTagWrite_set(n, v){
   var o = this;
   switch(n){
      case 'source':
         o._source = v;
         return;
   }
   o.__base.FTag.set.call(o, n, v);
}
function FTagWrite_toString(){
   var o = this;
   return 'source=' + o._source;
}
var EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
function SXmlEvent(){
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
function SXmlEvent_process(p){
   var o = this;
   o.outputDocument = p.document;
   o.outputNode = p.root;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
function SXmlEvent_dispose(){
   var o = this;
   o.owner = null;
   o.url = null;
   o.action = null;
   o.parameter = null;
   o.inputDocument = null;
   o.outputDocument = null;
   o.callback = null;
}
function FContent(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FContent_name;
   return o;
}
function FContent_name(){
   return this._name;
}
function FContentConsole(o){
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
function FContentConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FContentConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FContentConsole_alloc(){
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
function FContentConsole_process(e){
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
function FContentConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FContentPipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   o._scopeCd = EScope.Global;
   o.scopeCd  = FContentPipeline_scopeCd;
   return o;
}
function FContentPipeline_scopeCd(){
   return this._scopeCd;
}
function FDragConsole(o){
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
function FDragConsole_onMouseDown(p){
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
function FDragConsole_onMouseMove(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   o._activeDragable.onDragMove(p);
}
function FDragConsole_onMouseUp(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new TObjects();
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
function FDragConsole_register(p){
   this._dragables.push(p);
}
function FDragConsole_unregister(po, pc){
   this._dragables.remove(p);
}
function FDragConsole_clear(){
   this._dragables.clear();
}
function FEvent(o){
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
function FEvent_owner(){
   return this._owner;
}
function FEvent_setOwner(p){
   this._owner = p;
}
function FEvent_callback(){
   return this._callback;
}
function FEvent_setCallback(p){
   this._callback = p;
}
function FEvent_valid(){
   return this._valid;
}
function FEvent_setValid(p){
   this._valid = p;
}
function FEvent_process(){
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
function FEventConsole(o){
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
function FEventConsole_onProcess(){
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
function FEventConsole_construct(){
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
function FEventConsole_register(po, pc){
   var o = this;
   var e = RClass.create(FEvent);
   e.owner = po;
   e.callback = pc;
   o._events.push(e);
}
function FEventConsole_push(p){
   var o = this;
   var es = o._events;
   if(!es.contains(p)){
      es.push(p);
   }
}
function FEventConsole_clear(){
   this._events.clear();
}
function FHttpConsole(o){
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
function FHttpConsole_onLoad(p){
   var o = this;
   o._pool.free(p);
}
function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = RClass.create(FObjectPool);
}
function FHttpConsole_alloc(){
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
function FHttpConsole_send(url, data){
   var o = this;
   var connection = o.alloc();
   connection.send(url, data);
   return connection;
}
function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope            = EScope.Page;
   o.register         = FIdleConsole_register;
   return o;
}
function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}
function FIdleConsole_construct(){
   var o = this;
}
function FLoggerConsole(o){
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
function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FLoggerConsole_connect(){
}
function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
function FLoggerConsole_output(level, obj, method, ms, msg, stack){
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
function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FMonitorConsole(o){
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
function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
function FMonitorConsole_process(monitor){
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
function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n=0; n<monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
function FMonitorConsole_doInterval(){
   var con = RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
function FMonitorConsole_wait(request){
}
function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
function FMouseConsole(o){
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
function FMouseConsole_onMouseDown(p){
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
function FMouseConsole_onMouseMove(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.capture(p);
}
function FMouseConsole_onMouseUp(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.captureStop(p);
}
function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}
function FMouseConsole_capture(p){
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
function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   RWindow.setOptionSelect(true);
}
function FMouseConsole_register(p){
}
function FMouseConsole_unregister(p){
}
function FMouseConsole_clear(){
}
function FPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._code = null;
   o.code  = FPipeline_code;
   return o;
}
function FPipeline_code(){
   return this._code;
}
function FProcess(o){
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
function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
function FProcess_onMessage(p){
}
function FProcess_name(){
   return this._name;
}
function FProcess_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new TObjects();
}
function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
function FProcess_process(p){
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
function FProcessConsole(o){
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
function FProcessConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FProcessConsole_alloc(){
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
function FProcessConsole_process(e){
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
function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FProcessEvent(o){
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
function FProcessEvent_name(){
   return this._name;
}
function FProcessEvent_code(){
   return this._code;
}
function FProcessEvent_setCode(p){
   this._code = p;
}
function FProcessEvent_data(){
   return this._data;
}
function FProcessEvent_setData(p){
   this._data = p;
}
function FProcessEvent_register(po, pf){
   var o = this;
   if(!o._listeners){
      o._listeners = new TListeners();
   }
   o._listeners.register(po, pf);
}
function FProcessor(o){
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
function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
function FProcessor_onMessage(p){
}
function FProcessor_name(){
   return this._name;
}
function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new TObjects();
}
function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
function FProcessor_process(p){
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
function FProcessServer(o){
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
function FProcessServer_ohInterval(){
   FProcessServer.__linker.onInterval();
}
function FProcessServer_onInterval(){
   var o = this;
}
function FProcessServer_ohMessage(p){
   FProcessServer.__linker.onMessage(p.data);
}
function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new TDictionary();
}
function FProcessServer_name(){
   return this._name;
}
function FProcessServer_registerProcessor(c, p){
   this._processors.set(c, p);
}
function FProcessServer_unregisterProcessor(c){
   this._processors.set(c, null);
}
function FProcessServer_send(p){
   var o = this;
   postMessage(p);
}
function FProcessServer_process(){
   var o = this;
   onmessage = o.ohMessage;
   FProcessServer.__linker = o;
}
function FStatistics(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = null;
   o.reset      = FStatistics_reset;
   o.resetFrame = FStatistics_resetFrame;
   return o;
}
function FStatistics_reset(){
}
function FStatistics_resetFrame(){
}
function FStatisticsConsole(o){
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
function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new TDictionary();
}
function FStatisticsConsole_register(n, s){
   this._statisticses.set(n, s);
}
function FStatisticsConsole_unregister(n){
   return this._statisticses.remove(n);
}
function FStatisticsConsole_find(n){
   return this._statisticses.get(n);
}
function FStatisticsConsole_statisticses(){
   return this._statisticses;
}
function FStatisticsConsole_reset(e){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).reset();
   }
}
function FStatisticsConsole_resetFrame(u, d){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).resetFrame();
   }
}
function FThread(o){
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
function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FThread_name(){
   return this._name;
}
function FThread_statusCd(){
   return this._statusCd;
}
function FThread_interval(){
   return this._interval;
}
function FThread_setInterval(p){
   this._interval = p;
}
function FThread_start(){
   this._statusCd = EThreadStatus.Active;
}
function FThread_stop(){
   this._statusCd = EThreadStatus.Finish;
}
function FThread_process(p){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= p;
   }
}
function FThreadConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._active      = true;
   o._interval    = 20;
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
function FThreadConsole_ohInterval(){
   var c = RConsole.get(FThreadConsole);
   c.processAll();
}
function FThreadConsole_push(p){
   this._threads.push(p);
}
function FThreadConsole_start(p){
   p.start();
   this._threads.push(p);
}
function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new TObjects();
   o._hWindow = window;
   o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
}
function FThreadConsole_process(p){
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
function FThreadConsole_processAll(){
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
function FThreadConsole_dispose(){
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
function FXmlConsole(o){
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
function FXmlConsole_construct(){
   var o = this;
   o._connections = new TObjects();
   o._caches = new TDictionary();
}
function FXmlConsole_onLoad(p){
   var o = this;
   debugger
}
function FXmlConsole_alloc(){
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
function FXmlConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   c._asynchronous = false;
   var r = c.send(u, d);
   c._statusFree = true;
   return r;
}
function FXmlConsole_sendAsync(u, d, p){
   var o = this;
   var c = o.alloc();
   c._asynchronous = true;
   c._parameters = p;
   c.send(u, d);
   return c;
}
function FXmlConsole_load(u, d, p){
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
function FXmlConsole_process(p){
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
function MCanvasObject(o){
   o = RClass.inherits(this, o);
   o.htmlCanvas = RMethod.virtual(o, 'htmlCanvas');
   return o;
}
function MGraphicObject(o){
   o = RClass.inherits(this, o);
   o._graphicContext    = null;
   o.graphicContext     = MGraphicObject_graphicContext;
   o.linkGraphicContext = MGraphicObject_linkGraphicContext;
   o.dispose            = MGraphicObject_dispose;
   return o;
}
function MGraphicObject_graphicContext(){
   return this._graphicContext;
}
function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(RClass.isClass(context, FGraphicContext)){
      o._graphicContext = context;
   }else if(RClass.isClass(context, MGraphicObject)){
      o._graphicContext = context._graphicContext;
   }else{
      throw new TError(o, 'Link graphic context failure. (context={1})', context);
   }
}
function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
function MGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = RMethod.empty;
   return o;
}
function FFloatStream(o){
   o = RClass.inherits(this, o, FObject);
   o._length     = 0;
   o._memory     = null;
   o._position   = 0;
   o.construct   = FFloatStream_construct;
   o.length      = FFloatStream_length;
   o.setLength   = FFloatStream_setLength;
   o.memory      = FFloatStream_memory;
   o.writeFloat4 = FFloatStream_writeFloat4;
   o.writeColor4 = FFloatStream_writeColor4;
   o.reset       = FFloatStream_reset;
   o.clear       = FFloatStream_clear;
   o.dispose     = FFloatStream_dispose;
   return o;
}
function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FFloatStream_length(){
   return this._length;
}
function FFloatStream_setLength(p){
   var o = this;
   o._length = p;
   o._memory = new Float32Array(p);
}
function FFloatStream_memory(){
   return this._memory;
}
function FFloatStream_writeFloat4(a, b, c, d){
   var o = this;
   o._memory[o._position++] = a;
   o._memory[o._position++] = b;
   o._memory[o._position++] = c;
   o._memory[o._position++] = d;
}
function FFloatStream_writeColor4(p){
   this.writeFloat4(p.red, p.green, p.blue, p.alpha);
}
function FFloatStream_reset(){
   this._position = 0;
}
function FFloatStream_clear(){
   this._position = 0;
}
function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}
function FG2dContext_drawText(x, y, t){
   var o = this;
   o._native.fillText(t, x, y);
}
function FG2dContext_drawImage(image, x, y){
   var o = this;
   o._native.drawImage(image, 0, 0);
}
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._size      = null;
   o.construct  = FG2dContext_construct;
   o.linkCanvas = FG2dContext_linkCanvas;
   o.size       = FG2dContext_size;
   o.dispose    = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG2dContext_size(){
   return this._size;
}
function FG2dContext_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o.__base.FGraphicContext.dispose.call(o);
}
function FG2dCanvasContext(o){
   o = RClass.inherits(this, o, FG2dContext);
   o._native       = null;
   o.construct     = FG2dCanvasContext_construct;
   o.linkCanvas    = FG2dCanvasContext_linkCanvas;
   o.clear         = FG2dCanvasContext_clear;
   o.drawLine      = FG2dCanvasContext_drawLine;
   o.drawRectangle = FG2dCanvasContext_drawRectangle;
   o.drawText      = FG2dCanvasContext_drawText;
   o.drawImage     = FG2dCanvasContext_drawImage;
   o.fillRectangle = FG2dCanvasContext_fillRectangle;
   o.toBytes       = FG2dCanvasContext_toBytes;
   return o;
}
function FG2dCanvasContext_construct(){
   var o = this;
   o.__base.FG2dContext.construct.call(o);
}
function FG2dCanvasContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   if(hCanvas.getContext){
      var graphic = hCanvas.getContext('2d');
      if(!graphic){
         throw new TError(o, "Current browser can't support Context2D technique.");
      }
      o._native = graphic;
   }
   o._hCanvas = hCanvas;
}
function FG2dCanvasContext_clear(r, g, b, a, d){
   var o = this;
   var g = o._native;
   var size = o._size;
   g.clearRect(0, 0, size.width, size.height);
}
function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.moveTo(x1, y1);
   g.lineTo(x2, y2);
   g.stroke();
}
function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.strokeRect(x, y, width, height);
}
function FG2dCanvasContext_drawText(text, x, y, color){
   var o = this;
   var g = o._native;
   g.fillStyle = color;
   g.fillText(text, x, y);
}
function FG2dCanvasContext_drawImage(data, x, y){
   var o = this;
   var g = o._native;
   var pixels = null
   if(data.tagName == 'IMG'){
      pixels = data;
   }else if(RClass.isClass(data, FImage)){
      pixels = data.image();
   }else{
      throw new TError(o, 'Unknown data type');
   }
   g.drawImage(pixels, x, y, o._size.width, o._size.height);
}
function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
   var o = this;
   var g = o._native;
   g.fillStyle = color;
   g.fillRect(x, y, width, height);
}
function FG2dCanvasContext_toBytes(){
   var o = this;
   var s = o._size;
   return o._native.getImageData(0, 0, s.width, s.height);
}
var EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
var EG3dRegionParameter = new function EG3dRegionParameter(){
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
var EG3dTechniqueMode = new function EG3dTechniqueMode(){
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
function MG3dRegion(o){
   o = RClass.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = null;
   o._technique                  = null;
   o._techniquePass              = null;
   o._camera                     = null;
   o._projection                 = null;
   o._directionalLight           = null
   o._lights                     = null
   o._allRenderables             = null;
   o._renderables                = null;
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
   o._materialMap                = null;
   o.construct                   = MG3dRegion_construct;
   o.isChanged                   = MG3dRegion_isChanged;
   o.spaceName                   = MG3dRegion_spaceName;
   o.technique                   = MG3dRegion_technique;
   o.setTechnique                = MG3dRegion_setTechnique;
   o.techniquePass               = MG3dRegion_techniquePass;
   o.setTechniquePass            = MG3dRegion_setTechniquePass;
   o.camera                      = MG3dRegion_camera;
   o.directionalLight            = MG3dRegion_directionalLight;
   o.lights                      = MG3dRegion_lights;
   o.materialMap                 = MG3dRegion_materialMap;
   o.allRenderables              = MG3dRegion_allRenderables;
   o.renderables                 = MG3dRegion_renderables;
   o.pushRenderable              = MG3dRegion_pushRenderable;
   o.setup                       = MG3dRegion_setup;
   o.change                      = MG3dRegion_change;
   o.prepare                     = MG3dRegion_prepare;
   o.reset                       = MG3dRegion_reset;
   o.calculate                   = MG3dRegion_calculate;
   o.update                      = MG3dRegion_update;
   o.dispose                     = MG3dRegion_dispose;
   return o;
}
function MG3dRegion_construct(){
   var o = this;
   o._lights = new TObjects();
   o._renderables = new TObjects();
   o._allRenderables = new TObjects();
   o._cameraPosition = new SPoint3();
   o._cameraDirection = new SVector3();
   o._cameraViewMatrix = new SMatrix3d();
   o._cameraProjectionMatrix = new SMatrix3d();
   o._cameraViewProjectionMatrix = new SMatrix3d();
   o._lightPosition = new SPoint3();
   o._lightDirection = new SVector3();
   o._lightViewMatrix = new SMatrix3d();
   o._lightProjectionMatrix = new SMatrix3d();
   o._lightViewProjectionMatrix = new SMatrix3d();
   o._lightInfo = new SVector4();
}
function MG3dRegion_isChanged(){
   return this._changed;
}
function MG3dRegion_spaceName(){
   return this._spaceName;
}
function MG3dRegion_technique(){
   return this._technique;
}
function MG3dRegion_setTechnique(p){
   this._technique = p;
}
function MG3dRegion_techniquePass(){
   return this._techniquePass;
}
function MG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
function MG3dRegion_camera(){
   return this._camera;
}
function MG3dRegion_directionalLight(){
   return this._directionalLight;
}
function MG3dRegion_lights(){
   return this._lights;
}
function MG3dRegion_materialMap(){
   return this._materialMap;
}
function MG3dRegion_allRenderables(p){
   return this._allRenderables;
}
function MG3dRegion_renderables(p){
   return this._renderables;
}
function MG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
function MG3dRegion_setup(){
   var o = this;
}
function MG3dRegion_change(){
   this._changed = true;
}
function MG3dRegion_prepare(){
   var o = this;
   o._changed = false;
   var c = o._camera;
   var cp = c.projection();
   c.updateFrustum();
   o._cameraPosition.assign(c.position());
   o._cameraDirection.assign(c.direction());
   o._cameraViewMatrix.assign(c.matrix());
   o._cameraProjectionMatrix.assign(cp.matrix());
   o._cameraViewProjectionMatrix.assign(c.matrix());
   o._cameraViewProjectionMatrix.append(cp.matrix());
   var l = o._directionalLight;
   var lc = l.camera();
   var lcp = lc.position();
   var lp = lc.projection();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._lightProjectionMatrix.assign(lp.matrix());
   o._lightViewProjectionMatrix.assign(lc.matrix());
   o._lightViewProjectionMatrix.append(lp.matrix());
   o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
   o._allRenderables.clear();
}
function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
function MG3dRegion_calculate(p){
   var o = this;
   switch(p){
      case EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
}
function MG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      rs.getAt(i).update(o);
   }
}
function MG3dRegion_dispose(){
   var o = this;
   o._renderables = RObject.free(o._renderables);
   o._allRenderables = RObject.free(o._allRenderables);
}
function MG3dRenderable(o){
   o = RClass.inherits(this, o, MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = null;
   o._matrix        = null;
   o._material      = null;
   o._activeInfo    = null;
   o._infos         = null;
   o.construct      = MG3dRenderable_construct;
   o.currentMatrix  = MG3dRenderable_currentMatrix;
   o.matrix         = MG3dRenderable_matrix;
   o.material       = MG3dRenderable_material;
   o.setMaterial    = MG3dRenderable_setMaterial;
   o.activeEffect   = MG3dRenderable_activeEffect;
   o.activeInfo     = MG3dRenderable_activeInfo;
   o.effectFind     = MG3dRenderable_effectFind;
   o.effectSet      = MG3dRenderable_effectSet;
   o.infos          = MG3dRenderable_infos;
   o.selectInfo     = MG3dRenderable_selectInfo;
   o.resetInfos     = MG3dRenderable_resetInfos;
   o.testVisible    = RMethod.emptyTrue;
   o.update         = RMethod.empty;
   o.dispose        = MG3dRenderable_dispose;
   return o;
}
function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
}
function MG3dRenderable_currentMatrix(){
   return this._currentMatrix;
}
function MG3dRenderable_matrix(){
   return this._matrix;
}
function MG3dRenderable_activeEffect(){
   var info = this._activeInfo;
   return info ? info.effect : null;
}
function MG3dRenderable_activeInfo(){
   return this._activeInfo;
}
function MG3dRenderable_effectFind(code){
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
function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}
function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new TDictionary();
   }
   return infos;
}
function MG3dRenderable_selectInfo(p){
   var o = this;
   var infos = o.infos();
   var info = infos.get(p);
   if(!info){
      info = new SG3dRenderableInfo();
      infos.set(p, info)
   }
   o._activeInfo = info;
   return info;
}
function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      for(var i = infos.count() - 1; i >= 0; i--){
         infos.at(i).reset();
      }
   }
}
function MG3dRenderable_material(){
   return this._material;
}
function MG3dRenderable_setMaterial(material){
   this._material = material;
}
function MG3dRenderable_dispose(){
   var o = this;
   o._currentMatrix = RObject.dispose(o._currentMatrix);
   o._matrix = RObject.dispose(o._matrix);
   o._material = RObject.dispose(o._material);
   o._activeInfo = null;
   o._infos = RObject.dispose(o._infos);
}
function SG3dEffectInfo(){
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
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   o.reset();
   return o;
}
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.optionMerge = false;
   o.mergeCount = 0;
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
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
function SG3dMaterialInfo(o){
   if(!o){o = this;}
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
   o.vertexColor          = new SColor4();
   o.optionAmbient        = null;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new SColor4();
   o.assign               = SG3dMaterialInfo_assign;
   o.calculate            = SG3dMaterialInfo_calculate;
   o.reset                = SG3dMaterialInfo_reset;
   o.reset();
   return o;
}
function SG3dMaterialInfo_assign(info){
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
   o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
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
function SG3dMaterialInfo_calculate(info){
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
   o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
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
function SG3dMaterialInfo_reset(){
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
function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = SG3dRenderableInfo_reset;
   return o;
}
function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = RObject.dispose(o.layout);
}
function FG3dAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = FG3dAnimation_construct;
   o.findBone     = FG3dAnimation_findBone;
   o.process      = FG3dAnimation_process;
   o.dispose      = FG3dAnimation_dispose;
   return o;
}
function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TObjects();
}
function FG3dAnimation_findBone(p){
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
function FG3dAnimation_process(){
   var o = this;
   var t = RTimer.current();
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
function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._info       = null;
   o.construct   = FG3dBaseMaterial_construct;
   o.info        = FG3dBaseMaterial_info;
   o.assignInfo  = FG3dBaseMaterial_assignInfo;
   o.assign      = FG3dBaseMaterial_assign;
   o.calculate   = FG3dBaseMaterial_calculate;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SG3dMaterialInfo();
}
function FG3dBaseMaterial_info(){
   return this._info;
}
function FG3dBaseMaterial_assignInfo(info){
   this._info.assign(info);
}
function FG3dBaseMaterial_assign(material){
   var o = this;
   o._info.assign(material.info());
}
function FG3dBaseMaterial_calculate(material){
   var o = this;
   o._info.calculate(material.info());
}
function FG3dBone(o){
   o = RClass.inherits(this, o, FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = FG3dBone_update;
   return o;
}
function FG3dBone_update(p){
}
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix          = null;
   o._position        = null;
   o._target          = null;
   o._direction       = null;
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = null;
   o._planes          = null;
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = FG3dCamera_construct;
   o.matrix           = FG3dCamera_matrix;
   o.position         = FG3dCamera_position;
   o.setPosition      = FG3dCamera_setPosition;
   o.direction        = FG3dCamera_direction;
   o.setDirection     = FG3dCamera_setDirection;
   o.frustum          = FG3dCamera_frustum;
   o.planes           = FG3dCamera_planes;
   o.doWalk           = FG3dCamera_doWalk;
   o.doStrafe         = FG3dCamera_doStrafe;
   o.doFly            = FG3dCamera_doFly;
   o.doPitch          = FG3dCamera_doPitch;
   o.doYaw            = FG3dCamera_doYaw;
   o.doRoll           = FG3dCamera_doRoll;
   o.lookAt           = FG3dCamera_lookAt;
   o.update           = FG3dCamera_update;
   o.updateFrustum    = FG3dCamera_updateFrustum;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._position = new SPoint3();
   o._target = new SPoint3();
   o._direction = new SVector3();
   o._directionTarget = new SVector3();
   o._frustum = new SFrustum();
   o._planes = new SFrustumPlanes();
   o._viewport = RClass.create(FG3dViewport);
   o.__axisUp = new SVector3();
   o.__axisUp.set(0, 1, 0);
   o.__axisX = new SVector3();
   o.__axisY = new SVector3();
   o.__axisZ = new SVector3();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_direction(){
   return this._direction;
}
function FG3dCamera_setDirection(x, y, z){
   var o = this;
   o._direction.set(x, y, z);
   o._directionTarget.set(x, y, z);
}
function FG3dCamera_frustum(){
   return this._frustum;
}
function FG3dCamera_planes(){
   return this._planes;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
function FG3dCamera_doPitch(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doYaw(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_doRoll(p){
   throw new TFatal(o, 'Unsupport.')
}
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   var d = o._direction;
   o._target.set(x, y, z);
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
   o._directionTarget.assign(d);
}
function FG3dCamera_update(){
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
function FG3dCamera_updateFrustum(){
   var o = this;
   var m = RMath.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   o._camera     = null;
   o._viewport   = null;
   o._direction  = null;
   o.construct   = FG3dDirectionalLight_construct;
   o.camera      = FG3dDirectionalLight_camera;
   o.projection  = FG3dDirectionalLight_projection;
   o.viewport    = FG3dDirectionalLight_viewport;
   o.direction   = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
   o._camera = RClass.create(FG3dPerspectiveCamera);
}
function FG3dDirectionalLight_camera(){
   return this._camera;
}
function FG3dDirectionalLight_projection(){
   return this._projection;
}
function FG3dDirectionalLight_viewport(){
   return this._viewport;
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._ready              = null;
   o._code               = null;
   o._stateFillCd        = EG3dFillMode.Face;
   o._stateCullCd        = EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = null;
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = RMethod.empty;
   o.testReady           = FG3dEffect_testReady;
   o.code                = FG3dEffect_code;
   o.program             = FG3dEffect_program;
   o.setParameter        = FG3dEffect_setParameter;
   o.setSampler          = FG3dEffect_setSampler;
   o.drawRenderable      = FG3dEffect_drawRenderable;
   o.drawRenderables     = FG3dEffect_drawRenderables;
   o.drawGroup           = FG3dEffect_drawGroup;
   o.drawRegion          = FG3dEffect_drawRegion;
   o.buildInfo           = FG3dEffect_buildInfo;
   o.loadConfig          = FG3dEffect_loadConfig;
   o.load                = FG3dEffect_load;
   o.build               = FG3dEffect_build;
   return o;
}
function FG3dEffect_testReady(){
   return this._ready;
}
function FG3dEffect_code(){
   return this._code;
}
function FG3dEffect_program(){
   return this._program;
}
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dEffect_buildInfo(f, r){
}
function FG3dEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(!vb){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib.count());
}
function FG3dEffect_drawRenderables(pg, pr, pi, pc){
   var o = this;
   o._graphicContext.setProgram(o._program);
   for(var i = 0; i < pc; i++){
      o.drawRenderable(pg, pr.getAt(pi + i));
   }
}
function FG3dEffect_drawGroup(region, pr, pi, pc){
   this.drawRenderables(region, pr, pi, pc);
}
function FG3dEffect_drawRegion(region, offset, count){
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
function FG3dEffect_loadConfig(p){
   var o = this;
   var c = o._graphicContext;
   var g = o._program = c.createProgram();
   var xs = p.nodes();
   var c = xs.count();
   for(var i = 0; i < c; i++){
      var x = xs.get(i);
      if(x.isName('State')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'fill_mode'){
            o._stateFillCd = REnum.parse(EG3dFillMode, v);
         }else if(n == 'cull_mode'){
            o._stateCullCd = REnum.parse(EG3dCullMode, v);
         }else if(n == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
         }else if(n == 'depth_write'){
            o._stateDepthWrite = RBoolean.parse(v);
         }else if(n == 'blend_mode'){
            o._stateBlend = RBoolean.parse(v);
            if(o._stateBlend){
               o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
               o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
            }
         }else if(n == 'alpha_test'){
            o._stateAlphaTest = RBoolean.parse(v);
         }
      }else if(x.isName('Option')){
         var n = x.get('name');
         var v = x.get('value');
         if(n == 'shadow'){
            o._optionShadow = RBoolean.parse(v);
         }else if(n == 'lightmap'){
            o._optionLightMap = RBoolean.parse(v);
         }else if(n == 'fog'){
            o._optionFog = RBoolean.parse(v);
         }
      }else if(x.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(x);
         g.parameters().set(pp.name(), pp);
      }else if(x.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(x);
         g.attributes().set(pa.name(), pa);
      }else if(x.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(x);
         g.samplers().set(ps.name(), ps);
      }else if(x.isName('Source')){
         var st = x.get('name');
         if(st == 'vertex'){
            o._vertexSource = x.value();
         }else if(st == 'fragment'){
            o._fragmentSource = x.value();
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', x.name());
      }
   }
   var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
   vt.load(o._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
   ft.load(o._fragmentSource);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var ms = g._parameters
   var mc = ms.count();
   var c = RInstance.get(FTagContext);
   o.buildInfo(c, p);
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   var fs = o._fragmentTemplate.parse(c);
   for(var i = 0; i < mc; i++){
      var m = ms.value(i);
      var mn = m.name();
      var md = m.define();
      if(md){
         fs = fs.replace(new RegExp(mn, 'g'), md);
      }
   }
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffect_load(){
   var o = this;
   var x = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(x);
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/ars/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = FG3dEffectConsole_onProcess;
   o.construct        = FG3dEffectConsole_construct;
   o.path             = FG3dEffectConsole_path;
   o.register         = FG3dEffectConsole_register;
   o.unregister       = FG3dEffectConsole_unregister;
   o.create           = FG3dEffectConsole_create;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   o.loadConfig       = FG3dEffectConsole_loadConfig;
   return o;
}
function FG3dEffectConsole_onProcess(){
   var o = this;
   var s = o._loadEffects;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new TDictionary();
   o._loadEffects = new TLooper();
   o._registerEffects = new TDictionary();
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}
function FG3dEffectConsole_path(){
   return this._path;
}
function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}
function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}
function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = RClass.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}
function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
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
      var vertexName = vertexBuffer.name();
      if(vertexName == 'normal'){
         var stride = vertexBuffer.stride();
         if(stride == 4){
            effectInfo.optionNormalCompress = true;
         }else{
            effectInfo.optionNormalCompress = false;
         }
      }
      effectInfo.attributes.push(vertexBuffer.name());
   }
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         effectInfo.samplers.push(textures.name(i));
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
function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      var effect = o.create(context, code);
      effect.load();
      RLogger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
      effects.set(code, effect);
   }
   return effect;
}
function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   if(!RClass.isClass(context, FGraphicContext)){
      context = context.graphicContext();
   }
   if(!RClass.isClass(context, FGraphicContext)){
      throw new TError(o, 'Unknown context.');
   }
   var effectCode = renderable.material().info().effectCode;
   if(RString.isEmpty(effectCode)){
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
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
      }
      effects.set(flag, effect);
   }
   return effect;
}
function FG3dEffectConsole_loadConfig(p){
   var o = this;
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   var u = RBrowser.contentPath(o._path + p + ".xml");
   if(RRuntime.isDebug()){
      u += '?' + RDate.format();
   }
   x = RClass.create(FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
}
function FG3dLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FG3dLightMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   return o;
}
function FG3dMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   o._dirty    = true;
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   o.update    = FG3dMaterial_update;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
}
function FG3dMaterial_update(){
   this._dirty = true;
}
function FG3dMaterialMap(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._size      = null;
   o._data      = null;
   o._texture   = null;
   o._stride    = null;
   o._dirty     = false;
   o.construct  = FG3dMaterialMap_construct;
   o.size       = FG3dMaterialMap_size;
   o.data       = FG3dMaterialMap_data;
   o.texture    = FG3dMaterialMap_texture;
   o.setup      = FG3dMaterialMap_setup;
   o.resize     = FG3dMaterialMap_resize;
   o.setUint8   = FG3dMaterialMap_setUint8;
   o.setUint16  = FG3dMaterialMap_setUint16;
   o.setUint32  = FG3dMaterialMap_setUint32;
   o.setFloat16 = FG3dMaterialMap_setFloat16;
   o.setFloat32 = FG3dMaterialMap_setFloat32;
   o.update     = FG3dMaterialMap_update;
   return o;
}
function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FG3dMaterialMap_size(){
   return this._size;
}
function FG3dMaterialMap_data(){
   return this._data;
}
function FG3dMaterialMap_texture(){
   return this._texture;
}
function FG3dMaterialMap_setup(w, h){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   o.resize(w, h);
   t.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
   t.uploadData(o._data, w, h);
}
function FG3dMaterialMap_resize(w, h){
   var o = this;
   var s = o._size;
   if(h > 2048){
      h = 4096;
   }else if(h > 1024){
      h = 2048;
   }else if(h > 512){
      h = 1024;
   }else if(h > 256){
      h = 512;
   }else if(h > 128){
      h = 256;
   }else if(h > 64){
      h = 128;
   }else if(h > 32){
      h = 64;
   }else if(h > 16){
      h = 32;
   }
   if(h < s.height){
      h = s.height;
   }
   if((s.width == w) && (s.height == h)){
      return;
   }
   s.set(w, h);
   o._stride = 4 * w;
   var t = 4 * w * h;
   o._data = new Uint8Array(t);
}
function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == SColor4){
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
function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_setFloat16(n, i, v1, v2){
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
function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}
function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._texture  = null;
   o.construct = FG3dMaterialTexture_construct;
   return o;
}
function FG3dMaterialTexture_construct(){
   var o = this;
}
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o.setup   = FG3dObject_setup;
   o.dispose = FG3dObject_dispose;
   return o;
}
function FG3dObject_setup(){
}
function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FG3dOrthoCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection      = null;
   o.construct        = FG3dOrthoCamera_construct;
   o.projection       = FG3dOrthoCamera_projection;
   o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
   o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
   o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
   return o;
}
function FG3dOrthoCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dOrthoProjection);
}
function FG3dOrthoCamera_projection(){
   return this._projection;
}
function FG3dOrthoCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dOrthoCamera_updateFromCamera(p){
   var o = this;
   var pf = p.updateFrustum();
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * pf.radius;
   var vy = pf.center.y - d.y * pf.radius;
   var vz = pf.center.z - d.z * pf.radius;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   var f = o._frustum;
   o._matrix.transform(f.coners, pf.coners, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dOrthoCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum
   var pf = p.updateFlatFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.3;
   o._projection._zfar = distance * 1.5;
   o._projection.update();
}
function FG3dOrthoProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dOrthoProjection_construct;
   o.matrix        = FG3dOrthoProjection_matrix;
   o.update        = FG3dOrthoProjection_update;
   o.updateFrustum = FG3dOrthoProjection_updateFrustum;
   return o;
}
function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SOrthoMatrix3d();
}
function FG3dOrthoProjection_matrix(){
   return this._matrix;
}
function FG3dOrthoProjection_update(){
   var o = this;
   var s = o._size;
   o._matrix.identity();
   var d = o._matrix.data();
   d[ 0] = 2.0 / s.width * 8.0;
   d[ 4] = d[ 8] = d[12] = 0.0;
   d[ 5] = 2.0 / s.height * 8.0;
   d[ 1] = d[ 9] = d[13] = 0.0;
   d[10] = 1.0 / (o._znear - o._zfar);
   d[ 2] = d[ 6] = d[14] = 0.0;
   d[ 3] = d[ 7] = 0.0;
   d[11] = o._znear / (o._znear - o._zfar);
   d[15] = 1.0;
}
function FG3dOrthoProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPerspectiveCamera(o){
   o = RClass.inherits(this, o, FG3dCamera);
   o._projection       = null;
   o._centerFront      = 0.4;
   o.construct         = FG3dPerspectiveCamera_construct;
   o.projection        = FG3dPerspectiveCamera_projection;
   o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
   o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
   o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
   o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
   return o;
}
function FG3dPerspectiveCamera_construct(){
   var o = this;
   o.__base.FG3dCamera.construct.call(o);
   o._projection = RClass.create(FG3dPerspectiveProjection);
}
function FG3dPerspectiveCamera_projection(){
   return this._projection;
}
function FG3dPerspectiveCamera_updateFrustum(){
   var o = this;
   o.__base.FG3dCamera.updateFrustum.call(o);
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFlatFrustum(){
   var o = this;
   var p = o._projection;
   var s = p._size;
   var f = o._frustum;
   f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
   return f;
}
function FG3dPerspectiveCamera_updateFromCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance;
   var vy = pf.center.y - d.y * distance;
   var vz = pf.center.z - d.z * distance;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._matrix.transform(f.coners, 0, pf.coners, 0, 8);
   f.updateCenter();
   o._projection.updateFrustum(f);
}
function FG3dPerspectiveCamera_updateFlatCamera(p){
   var o = this;
   var f = o._frustum;
   var pf = p.updateFlatFrustum();
   var angle = RConst.DEGREE_RATE * o._projection.angle();
   var distance = pf.radius / Math.sin(angle * 0.5);
   distance = Math.max(distance, p._projection._zfar);
   var d = o._direction;
   d.normalize();
   var vx = pf.center.x - d.x * distance * o._centerFront;
   var vy = pf.center.y - d.y * distance * o._centerFront;
   var vz = pf.center.z - d.z * distance * o._centerFront;
   o._position.set(vx, vy, vz);
   o.lookAt(pf.center.x, pf.center.y, pf.center.z);
   o.update();
   o._projection._znear = 0.1;
   o._projection._zfar = distance;
   o._projection.update();
}
function FG3dPerspectiveProjection(o){
   o = RClass.inherits(this, o, FG3dProjection);
   o._matrix       = null;
   o.construct     = FG3dPerspectiveProjection_construct;
   o.matrix        = FG3dPerspectiveProjection_matrix;
   o.update        = FG3dPerspectiveProjection_update;
   o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
   return o;
}
function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dPerspectiveProjection_matrix(){
   return this._matrix;
}
function FG3dPerspectiveProjection_update(){
   var o = this;
   var s = o._size;
   o._fieldOfView = RConst.DEGREE_RATE * o._angle;
   o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
}
function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o._size        = null;
   o._angle       = 60.0;
   o._fieldOfView = 0;
   o._znear       = 0.1;
   o._zfar        = 200.0;
   o._scale       = 0;
   o.construct   = FG3dProjection_construct;
   o.size        = FG3dProjection_size;
   o.angle       = FG3dProjection_angle;
   o.znear       = FG3dProjection_znear;
   o.zfar        = FG3dProjection_zfar;
   o.distance    = FG3dProjection_distance;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FG3dProjection_size(){
   return this._size;
}
function FG3dProjection_angle(){
   return this._angle;
}
function FG3dProjection_znear(){
   return this._znear;
}
function FG3dProjection_zfar(){
   return this._zfar;
}
function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
function FG3dShaderTemplate(o){
   o = RClass.inherits(this, o, FTagDocument);
   o._space  = 'shader';
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._code           = null;
   o._activeMode     = null;
   o._modes          = null;
   o._passes         = null;
   o.construct       = FG3dTechnique_construct;
   o.code            = FG3dTechnique_code;
   o.activeMode      = FG3dTechnique_activeMode;
   o.modes           = FG3dTechnique_modes;
   o.passes          = FG3dTechnique_passes;
   o.registerMode    = FG3dTechnique_registerMode;
   o.selectMode      = FG3dTechnique_selectMode;
   o.updateRegion    = RMethod.empty;
   o.clear           = FG3dTechnique_clear;
   o.sortRenderables = FG3dTechnique_sortRenderables;
   o.drawRegion      = FG3dTechnique_drawRegion;
   o.present         = FG3dTechnique_present;
   return o;
}
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new TObjects();
   o._passes = new TObjects();
}
function FG3dTechnique_code(){
   return this._code;
}
function FG3dTechnique_activeMode(){
   return this._activeMode;
}
function FG3dTechnique_modes(){
   return this._modes;
}
function FG3dTechnique_passes(){
   return this._passes;
}
function FG3dTechnique_registerMode(p){
   var o = this;
   var m = RClass.create(FG3dTechniqueMode);
   m.setCode(p);
   o._modes.push(m);
   o._activeMode = m;
   return m;
}
function FG3dTechnique_selectMode(p){
   var o = this;
}
function FG3dTechnique_clear(p){
   var o = this;
   var c = o._graphicContext;
   c.setRenderTarget(null);
   c.clear(p.red, p.green, p.blue, p.alpha, 1);
}
function FG3dTechnique_sortRenderables(a, b){
}
function FG3dTechnique_drawRegion(p){
   var o = this;
   p.setTechnique(o);
   var s = o._passes;
   var c = s.count();
   for(var n = 0; n < c; n++){
      var v = s.get(n);
      p.setTechniquePass(v, (n == c - 1));
      v.drawRegion(p);
   }
}
function FG3dTechnique_present(p){
   this._graphicContext.present();
}
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._techniques = null;
   o.construct   = FG3dTechniqueConsole_construct;
   o.techniques  = FG3dTechniqueConsole_techniques;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}
function FG3dTechniqueConsole_techniques(){
   return this._techniques;
}
function FG3dTechniqueConsole_find(context, clazz){
   var o = this;
   if(!RClass.isClass(context, FGraphicContext)){
      context = context.graphicContext();
   }
   if(!RClass.isClass(context, FGraphicContext)){
      throw new TError(o, 'Unknown context.');
   }
   var code = context.hashCode() + '|' + RClass.name(clazz);
   var techniques = o._techniques;
   var technique = techniques.get(code);
   if(!technique){
      technique = RClass.create(clazz);
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
function FG3dTechniqueMode(o){
   o = RClass.inherits(this, o, FObject);
   o._code   = null;
   o.code    = FG3dTechniqueMode_code;
   o.setCode = FG3dTechniqueMode_setCode;
   return o;
}
function FG3dTechniqueMode_code(){
   return this._code;
}
function FG3dTechniqueMode_setCode(p){
   this._code = p;
}
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._fullCode       = null;
   o._code           = null;
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = FG3dTechniquePass_setup;
   o.fullCode        = FG3dTechniquePass_fullCode;
   o.setFullCode     = FG3dTechniquePass_setFullCode;
   o.code            = FG3dTechniquePass_code;
   o.activeEffects   = FG3dTechniquePass_activeEffects;
   o.sortRenderables = FG3dTechniquePass_sortRenderables;
   o.drawRegion      = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_setup(){
   var o = this;
   var m = o._materialMap = RClass.create(FG3dMaterialMap);
   m.linkGraphicContext(o);
   m.setup(EG3dMaterialMap.Count, 32);
}
function FG3dTechniquePass_fullCode(){
   return this._fullCode;
}
function FG3dTechniquePass_setFullCode(p){
   this._fullCode = p;
}
function FG3dTechniquePass_code(){
   return this._code;
}
function FG3dTechniquePass_sortRenderables(s, t){
   var ms = s.material().info();
   var mt = t.material().info();
   if(ms.optionAlpha && mt.optionAlpha){
      var se = s.activeEffect();
      var te = t.activeEffect();
      if(se == te){
         sm = s._materialReference;
         tm = t._materialReference;
         if(sm && tm){
            return sm.hashCode() - tm.hashCode();
         }
      }
      return se.hashCode() - te.hashCode();
   }else if(ms.optionAlpha && !mt.optionAlpha){
      return 1;
   }else if(!ms.optionAlpha && mt.optionAlpha){
      return -1;
   }else{
      var se = s.activeEffect();
      var te = t.activeEffect();
      if(se == te){
         sm = s._materialReference;
         tm = t._materialReference;
         if(sm && tm){
            return sm.hashCode() - tm.hashCode();
         }
      }
      return se.hashCode() - te.hashCode();
   }
}
function FG3dTechniquePass_activeEffects(p, rs){
   var o = this;
   var sn = p.spaceName();
   for(var i = rs.count() - 1; i >= 0; i--){
      var r = rs.get(i);
      var f = r.selectInfo(sn);
      if(!f.effect){
         f.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, p, r);
      }
   }
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var rs = p.renderables();
   var c = rs.count();
   if(c == 0){
      return;
   }
   p._statistics._frameDrawSort.begin();
   o.activeEffects(p, rs);
   rs.sort(o.sortRenderables);
   p._statistics._frameDrawSort.end();
   var cb = o._graphicContext.capability();
   if(cb.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(EG3dMaterialMap.Count, c);
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      }
      mm.update();
      p._materialMap = mm;
   }
   for(var n = 0; n < c; ){
      var gb = n;
      var ge = c;
      var ga = rs.getAt(gb).activeEffect();
      for(var i = n; i < c; i++){
         var a = rs.getAt(i).activeEffect();
         if(ga != a){
            ge = i;
            break;
         }
         n++;
      }
      ga.drawRegion(p, gb, ge - gb);
   }
}
function FG3dTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._frames = null;
   o.construct = FG3dTrack_construct;
   o.calculate = FG3dTrack_calculate;
   return o;
}
function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FG3dTrack_update(p){
   var o = this;
   var info = new SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
function FG3dTrack_calculate(tick){
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
function FG3dViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FG3dViewport_set;
   return o;
}
function FG3dViewport_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
   o.width = w;
   o.height= h;
}
var REngine3d = new function REngine3d(){
   var o = this;
   o.contexts = new TObjects();
   o.createContext = REngine3d_createContext;
   return o;
}
function REngine3d_createContext(c, h, a){
   var o = this;
   var r = RClass.create(c);
   if(a){
      r._optionAlpha = a.alpha;
      r._optionAntialias = a.antialias;
   }
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
var EG3dAttribute = new function EG3dAttribute(){
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
var EG3dAttributeFormat = new function EG3dAttributeFormat(){
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
var EG3dBlendMode = new function EG3dBlendMode(){
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
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
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
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
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
var EG3dSampler = new function EG3dSampler(){
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
var EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function SG3dContextCapability(){
   var o = this;
   o.vendor                 = null;
   o.version                = null;
   o.shaderVersion          = null;
   o.optionDebug            = false;
   o.optionInstance         = false;
   o.optionLayout           = false;
   o.optionMaterialMap      = false;
   o.optionIndex32          = false;
   o.optionShaderSource     = false;
   o.mergeCount             = 0;
   o.attributeCount         = null;
   o.vertexCount            = 65536;
   o.vertexConst            = null;
   o.fragmentConst          = null;
   o.varyingCount           = null;
   o.samplerCount           = null;
   o.samplerSize            = null;
   o.samplerCompressRgb     = null;
   o.samplerCompressRgba    = null;
   o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}
function SG3dContextCapability_calculateBoneCount(bc, vc){
   var o = this;
   var rb = 0;
   var bi = bc % 8;
   if(bi != 0){
      rb = bc + 8 - bi;
   }else{
      rb = bc;
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
function SG3dContextCapability_calculateInstanceCount(bc, vc){
   var o = this;
   var cr = (4 * bc) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vc > 0){
      var iv = o.vertexCount / vc;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
function SG3dLayoutBuffer(){
   var o = this;
   o.slot     = null;
   o.buffer   = null;
   o.index    = null;
   o.formatCd = null;
   o.dispose  = SG3dLayoutBuffer_dispose;
   return o;
}
function SG3dLayoutBuffer_dispose(){
   var o = this;
   o.slot = null;
   o.buffer = null;
   o.index = null;
   o.formatCd = null;
}
function SG3dLayoutSampler(){
   var o = this;
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   o.dispose = SG3dLayoutSampler_dispose;
   return o;
}
function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
function FG3dBuffer(o){
   o = RClass.inherits(this, o, FG3dObject, MAttributeName);
   o.isValid = RMethod.virtual(o, 'isValid');
   return o;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._size               = null;
   o._capability         = null;
   o._statistics         = null;
   o._fillModeCd         = EG3dFillMode.Face;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.linkCanvas          = FG3dContext_linkCanvas;
   o.size                = FG3dContext_size;
   o.capability          = FG3dContext_capability;
   o.statistics          = FG3dContext_statistics;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createLayout        = RMethod.virtual(o, 'createLayout');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
   o.setViewport         = RMethod.virtual(o, 'setViewport');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.prepare             = FG3dContext_prepare;
   o.clear               = RMethod.virtual(o, 'clear');
   o.clearColor          = RMethod.virtual(o, 'clearColor');
   o.clearDepth          = RMethod.virtual(o, 'clearDepth');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._size = new SSize2();
   o._statistics = RClass.create(FG3dStatistics);
   RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
}
function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
function FG3dContext_size(){
   return this._size;
}
function FG3dContext_capability(){
   return this._capability;
}
function FG3dContext_statistics(){
   return this._statistics;
}
function FG3dContext_prepare(){
   this._statistics.resetFrame();
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   o.upload    = RMethod.virtual(o, 'upload');
   o.update    = RMethod.empty;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o._optionFlipY   = false;
   o._size          = null;
   o.construct      = FG3dFlatTexture_construct;
   o.optionFlipY    = FG3dFlatTexture_optionFlipY;
   o.setOptionFlipY = FG3dFlatTexture_setOptionFlipY;
   o.size           = FG3dFlatTexture_size;
   o.uploadData     = RMethod.virtual(o, 'uploadData');
   o.upload         = RMethod.virtual(o, 'upload');
   o.update         = RMethod.empty;
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFlatTexture_optionFlipY(){
   return this._optionFlipY;
}
function FG3dFlatTexture_setOptionFlipY(flag){
   this._optionFlipY = flag;
}
function FG3dFlatTexture_size(){
   return this._size;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dBuffer);
   o._strideCd = EG3dIndexStride.Uint16;
   o._count    = 0;
   o.strideCd  = FG3dIndexBuffer_strideCd;
   o.count     = FG3dIndexBuffer_count;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dIndexBuffer_strideCd(){
   return this._strideCd;
}
function FG3dIndexBuffer_count(){
   return this._count;
}
function FG3dLayout(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._buffers     = null;
   o._samplers    = null;
   o.buffers      = FG3dLayout_buffers;
   o.linkBuffers  = FG3dLayout_linkBuffers;
   o.bindBuffers  = FG3dLayout_bindBuffers;
   o.samplers     = FG3dLayout_samplers;
   o.linkSamplers = FG3dLayout_linkSamplers;
   o.bindSamplers = FG3dLayout_bindSamplers;
   o.unbindSamplers = FG3dLayout_unbindSamplers;
   o.dispose      = FG3dLayout_dispose;
   return o;
}
function FG3dLayout_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
}
function FG3dLayout_buffers(){
   return this._buffers;
}
function FG3dLayout_linkBuffers(buffers){
   var o = this;
   if(!buffers.isEmpty()){
      var items = o._buffers;
      if(!items){
         items = o._buffers = new TObjects();
      }
      items.assign(buffers);
   }
}
function FG3dLayout_bindBuffers(){
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
function FG3dLayout_samplers(){
   return this._samplers;
}
function FG3dLayout_linkSamplers(samplers){
   var o = this;
   if(!samplers.isEmpty()){
      var items = o._samplers;
      if(!items){
         items = o._samplers = new TObjects();
      }
      items.assign(samplers);
   }
}
function FG3dLayout_bindSamplers(){
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
function FG3dLayout_unbindSamplers(){
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
function FG3dLayout_dispose(){
   var o = this;
   o._buffers = RObject.dispose(o._buffers);
   o._samplers = RObject.dispose(o._samplers);
   o.__base.FG3dObject.dispose.call(o);
}
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   o.setAttribute      = FG3dProgram_setAttribute;
   o.setParameter      = FG3dProgram_setParameter;
   o.setParameter4     = FG3dProgram_setParameter4;
   o.setSampler        = FG3dProgram_setSampler;
   o.upload            = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == SColor4){
      d = RTypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == SPoint3) || (t == SVector3)){
      d = RTypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == SPoint4) || (t == SVector4)){
      d = RTypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   if(p.attachData(d)){
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
}
function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._graphicContext.bindTexture(p._slot, p._index, pt);
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._define     = null;
   o._statusUsed = false;
   o._slot       = null;
   o._size       = 0;
   o._buffer     = null;
   o._memory     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.define      = FG3dProgramParameter_define;
   o.attachData  = FG3dProgramParameter_attachData;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_define(){
   return this._define;
}
function FG3dProgramParameter_attachData(p){
   var o = this;
   var r = false;
   var c = p.constructor;
   if(c == SMatrix3d){
      var m = o._memory;
      if(!m){
         m = o._memory = new Float32Array(16);
      }
      r = RFloat.attach(m, p._data, 16);
   }else if(c == Float32Array){
      var l = p.length;
      var m = o._memory;
      if(!m){
         m = o._memory = new Float32Array(l);
      }
      r = RFloat.attach(m, p, l);
   }else{
      throw new TError(o, 'Unknown data type.');
   }
   return r;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
   o._define = p.get('define');
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._formatCd   = EG3dTexture.Flat2d;
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_formatCd(){
   return this._formatCd;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._bind = RBoolean.parse(p.get('bind', 'Y'));
   o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
}
function FG3dRenderTarget(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._size     = null;
   o._color    = null;
   o._textures = null;
   o.construct = FG3dRenderTarget_construct;
   o.size      = FG3dRenderTarget_size;
   o.color     = FG3dRenderTarget_color;
   o.textures  = FG3dRenderTarget_textures;
   return o;
}
function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
function FG3dRenderTarget_size(){
   return this._size;
}
function FG3dRenderTarget_color(){
   return this._color;
}
function FG3dRenderTarget_textures(){
   var o = this;
   var r = o._textures;
   if(r == null){
      r = o._textures = new TObjects();
   }
   return r;
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._source = null;
   o.source  = FG3dShader_source;
   o.upload  = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dShader_source(){
   return this._source;
}
function FG3dStatistics(o){
   o = RClass.inherits(this, o, FStatistics);
   o._frameClearCount     = 0;
   o._frameFillModeCount  = 0;
   o._frameDepthModeCount = 0;
   o._frameCullModeCount  = 0;
   o._frameBlendModeCount = 0;
   o._frameProgramCount   = 0;
   o._frameConstCount     = 0;
   o._frameConstLength    = 0;
   o._frameBufferCount    = 0;
   o._frameTextureCount   = 0;
   o._frameTargetCount    = 0;
   o._frameDrawCount      = 0;
   o._frameTriangleCount  = 0;
   o._programTotal        = 0;
   o._layoutTotal         = 0;
   o._vertexBufferTotal   = 0;
   o._indexBufferTotal    = 0;
   o._flatTextureTotal    = 0;
   o._cubeTextureTotal    = 0;
   o._targetTotal         = 0;
   o.reset                = FG3dStatistics_reset;
   o.resetFrame           = FG3dStatistics_resetFrame;
   return o;
}
function FG3dStatistics_reset(){
   o._programTotal = 0;
   o._layoutTotal = 0;
   o._vertexBufferTotal = 0;
   o._indexBufferTotal = 0;
   o._flatTextureTotal = 0;
   o._cubeTextureTotal = 0;
   o._targetTotal = 0;
}
function FG3dStatistics_resetFrame(){
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
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd   = EG3dTexture.Unknown;
   o._filterMinCd = EG3dSamplerFilter.Linear;
   o._filterMagCd = EG3dSamplerFilter.Linear;
   o._wrapS       = EG3dSamplerFilter.Unknown;
   o._wrapT       = EG3dSamplerFilter.Unknown;
   o._statusLoad  = false;
   o.isValid      = RMethod.virtual(o, 'isValid');
   o.textureCd    = FG3dTexture_textureCd;
   o.filterMinCd  = FG3dTexture_filterMinCd;
   o.filterMagCd  = FG3dTexture_filterMagCd;
   o.setFilterCd  = FG3dTexture_setFilterCd;
   o.wrapS        = FG3dTexture_wrapS;
   o.wrapT        = FG3dTexture_wrapT;
   o.setWrapCd    = FG3dTexture_setWrapCd;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTexture_filterMinCd(){
   return this._filterMinCd;
}
function FG3dTexture_filterMagCd(){
   return this._filterMagCd;
}
function FG3dTexture_setFilterCd(minCd, magCd){
   var o = this;
   o._filterMinCd = minCd;
   o._filterMagCd = magCd;
}
function FG3dTexture_wrapS(){
   return this._wrapS;
}
function FG3dTexture_wrapT(){
   return this._wrapT;
}
function FG3dTexture_setWrapCd(wrapS, wrapT){
   var o = this;
   o._wrapS = wrapS;
   o._wrapT = wrapT;
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dBuffer);
   o._formatCd = EG3dAttributeFormat.Unknown;
   o._stride   = 0;
   o._count    = 0;
   o.formatCd  = FG3dVertexBuffer_formatCd;
   o.stride    = FG3dVertexBuffer_stride;
   o.count     = FG3dVertexBuffer_count;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_formatCd(){
   return this._formatCd;
}
function FG3dVertexBuffer_stride(){
   return this._stride;
}
function FG3dVertexBuffer_count(){
   return this._count;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
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
   o.setup                        = FG3dAutomaticEffect_setup;
   o.buildInfo                    = FG3dAutomaticEffect_buildInfo;
   o.bindAttributes               = FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers                 = FG3dAutomaticEffect_bindSamplers;
   o.bindMaterialSamplers         = FG3dAutomaticEffect_bindMaterialSamplers;
   o.bindMaterial                 = FG3dAutomaticEffect_bindMaterial;
   o.drawRenderable               = FG3dAutomaticEffect_drawRenderable;
   return o;
}
function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}
function FG3dAutomaticEffect_buildInfo(tagContext, pc){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var flag = new TString();
   flag.append(pc.techniqueModeCode)
   tagContext.set("technique.mode", pc.techniqueModeCode);
   var om = o._optionMerge = pc.optionMerge;
   if(om){
      var mc = pc.mergeCount;
      flag.append("|OI" + mc);
      tagContext.setBoolean("option.instance", true);
      tagContext.set("instance.count", mc);
   }
   if(capability.optionMaterialMap){
      flag.append("|OM");
      tagContext.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   if(pc.optionNormalInvert){
      flag.append("|ON");
      tagContext.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   if(pc.optionColor){
      flag.append("|OC");
      tagContext.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   if(pc.optionAmbient){
      flag.append("|OA");
      tagContext.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   if(pc.optionDiffuse){
      flag.append("|OD");
      tagContext.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   if(pc.optionSpecular){
      flag.append("|OS");
      tagContext.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   if(pc.optionReflect){
      flag.append("|ORL");
      tagContext.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   if(pc.optionRefract){
      flag.append("|ORF");
      tagContext.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      flag.append("|AC");
      tagContext.setBoolean("vertex.attribute.color", true);
   }
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      flag.append("|AD");
      tagContext.setBoolean("vertex.attribute.coord", true);
   }
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      flag.append("|AN");
      tagContext.setBoolean("vertex.attribute.normal", true);
   }
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      flag.append("|ANF");
      tagContext.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicVertexNormalCompress = pc.optionNormalCompress;
   if(o._dynamicVertexNormalCompress){
      flag.append("|ANC");
      tagContext.setBoolean("vertex.attribute.normal.compress", true);
   }
   o._dynamicInstance = (o._supportInstance && capability.optionInstance);
   if(o._dynamicInstance){
      flag.append("|SI");
      if(pc){
         tagContext.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      flag.append("|SS");
      if(pc){
         tagContext.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      flag.append("|RA");
      if(pc){
         tagContext.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      flag.append("|TA");
      if(pc){
         tagContext.setBoolean("support.ambient", true);
      }
      if(sdf){
         flag.append("|TAS");
         if(pc){
            tagContext.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   if(pc.samplerContains(EG3dSampler.Alpha)){
      tagContext.setBoolean("support.alpha.sampler", true);
   }
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         tagContext.setBoolean("support.diffuse", true);
      }
      if(snr){
         flag.append("|TDD");
         if(pc){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDN");
         if(pc){
            tagContext.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         tagContext.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         flag.append("|TDVD");
         if(pc){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDVN");
         if(pc){
            tagContext.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      flag.append("|TS");
      if(pc){
         tagContext.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSC");
         if(pc){
            tagContext.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSL");
         if(pc){
            tagContext.setBoolean("support.specular.level", true);
         }
      }else{
         flag.append("|NSL");
         if(pc){
            tagContext.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      flag.append("|TSV");
      if(pc){
         tagContext.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSVC");
         if(pc){
            tagContext.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSVL");
         if(pc){
            tagContext.setBoolean("support.specular.view.level", true);
         }
      }else{
         flag.append("|NSVL");
         if(pc){
            tagContext.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      flag.append("|TL");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.light", true);
      }
   }
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      flag.append("|TRL");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.reflect", true);
      }
   }
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      flag.append("|TRF");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.refract", true);
      }
   }
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      flag.append("|TLE");
      if(pc){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.emissive", true);
      }
   }
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      flag.append("|TH");
      if(pc){
         tagContext.setBoolean("support.height", true);
      }
   }
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      flag.append("|TE");
      if(pc){
         tagContext.setBoolean("support.environment", true);
      }
   }
   if(o._dynamicSkeleton){
      var boneCount = capability.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
      flag.append("|B" + boneCount);
      tagContext.set("bone.count", boneCount);
      tagContext.setBoolean("support.bone.weight.1", true);
      tagContext.setBoolean("support.bone.weight.2", true);
      tagContext.setBoolean("support.bone.weight.3", true);
      tagContext.setBoolean("support.bone.weight.4", true);
   }
   tagContext.code = flag.flush();
}
function FG3dAutomaticEffect_bindAttributes(renderable){
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
function FG3dAutomaticEffect_bindSamplers(renderable){
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
function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
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
function FG3dAutomaticEffect_bindMaterial(material){
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
function FG3dAutomaticEffect_drawRenderable(region, renderable){
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
   }else{
      context.drawTriangles(renderable.indexBuffer());
   }
   if(o._supportLayout){
      layout.deactive();
   }
}
function FG3dSelectAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = FG3dSelectAutomaticEffect_drawRenderable;
   return o;
}
function FG3dSelectAutomaticEffect_drawRenderable(pg, pr, pi){
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
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
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
function FG3dSelectPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code         = 'select';
   o._texture      = null;
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   o.construct     = FG3dSelectPass_construct;
   o.setup         = FG3dSelectPass_setup;
   o.textureDepth  = FG3dSelectPass_texture;
   o.drawRegion    = FG3dSelectPass_drawRegion;
   return o;
}
function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._data = new Uint8Array(4);
   o._position = new SPoint2();
}
function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var T = o._texture = c.createFlatTexture();
   T.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
   T.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1, 1);
   t.textures().push(T);
   t.build();
}
function FG3dSelectPass_texture(){
   return this._texture;
}
function FG3dSelectPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   c.setRenderTarget(o._renderTarget);
   c.clear(0, 0, 0, 0, 1, 1);
   var rs = p.allRenderables();
   o.activeEffects(p, rs);
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      c.setProgram(e.program());
      var d = r.display();
      if(!d){
         e.drawRenderable(p, r, i);
      }else if(!d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   c.clearDepth(1);
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      c.setProgram(e.program());
      var d = r.display();
      if(d && d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, o._data);
   var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(v != 0){
      o._selectRenderable = rs.get(v - 1);
   }
}
function FG3dSelectSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = FG3dSelectSkeletonEffect_drawRenderable;
   return o;
}
function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
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
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
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
function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code       = 'select';
   o._passSelect = null;
   o.setup       = FG3dSelectTechnique_setup;
   o.passSelect  = FG3dSelectTechnique_passSelect;
   o.test        = FG3dSelectTechnique_test;
   return o;
}
function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(EG3dTechniqueMode.Result);
   var pd = o._passSelect = RClass.create(FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}
function FG3dSelectTechnique_passSelect(){
   return this._passSelect;
}
function FG3dSelectTechnique_test(p, x, y){
   var o = this;
   p._selectX = x;
   p._selectY = y;
   p.setTechnique(o);
   o.drawRegion(p);
   return o._passSelect._selectRenderable;
}
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   o._native             = null;
   o._nativeInstance     = null;
   o._nativeLayout       = null;
   o._nativeDebugShader  = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = null;
   o._parameters         = null;
   o._extensions         = null;
   o._statusRecord       = false;
   o._recordBuffers      = null;
   o._recordSamplers     = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.recordBuffers       = FWglContext_recordBuffers;
   o.recordSamplers      = FWglContext_recordSamplers;
   o.recordBegin         = FWglContext_recordBegin;
   o.recordEnd           = FWglContext_recordEnd;
   o.createProgram       = FWglContext_createProgram;
   o.createLayout        = FWglContext_createLayout;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   o.setViewport         = FWglContext_setViewport;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.clearColor          = FWglContext_clearColor;
   o.clearDepth          = FWglContext_clearDepth;
   o.readPixels          = FWglContext_readPixels;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new TObjects();
   o._recordSamplers = new TObjects();
}
function FWglContext_linkCanvas(h){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, h)
   o._hCanvas = h;
   if(h.getContext){
      var a = new Object();
      a.alpha = o._optionAlpha;
      a.antialias = o._optionAntialias;
      var n = h.getContext('experimental-webgl', a);
      if(n == null){
         n = h.getContext('webgl', a);
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
      o._contextAttributes = n.getContextAttributes();
   }
   var g = o._native;
   o.setViewport(0, 0, h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
   var e = o._nativeInstance = g.getExtension('ANGLE_instanced_arrays');
   if(e){
      c.optionInstance = true;
   }
   c.mergeCount = parseInt((c.vertexConst - 32) / 4);
   var e = o._nativeLayout = g.getExtension('OES_vertex_array_object');
   if(e){
      c.optionLayout = true;
   }
   var e = g.getExtension('OES_element_index_uint');
   if(e){
      c.optionIndex32 = true;
   }
   var e = o._nativeSamplerS3tc = g.getExtension('WEBGL_compressed_texture_s3tc');
   if(e){
      c.samplerCompressRgb = e.COMPRESSED_RGB_S3TC_DXT1_EXT;
      c.samplerCompressRgba = e.COMPRESSED_RGBA_S3TC_DXT5_EXT;
   }
   var s = c.shader = new Object();
   var sv = s.vertexPrecision = new Object();
   if(g.getShaderPrecisionFormat){
      sv.floatLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_FLOAT);
      sv.floatMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_FLOAT);
      sv.floatHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_FLOAT);
      sv.intLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_INT);
      sv.intMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_INT);
      sv.intHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_INT);
   }
   var sf = s.fragmentPrecision = new Object();
   if(g.getShaderPrecisionFormat){
      sf.floatLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_FLOAT);
      sf.floatMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_FLOAT);
      sf.floatHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT);
      sf.intLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_INT);
      sf.intMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_INT);
      sf.intHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_INT);
   }
   var e = o._nativeDebugShader = g.getExtension('WEBGL_debug_shaders');
   if(e){
      c.optionShaderSource = true;
   }
}
function FWglContext_parameters(){
   var o = this;
   var r = o._parameters;
   if(r){
      return r;
   }
   var ns =['ACTIVE_TEXTURE',
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
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   var e = g.getExtension('WEBGL_debug_renderer_info');
   if(e){
      r['UNMASKED_RENDERER_WEBGL'] = g.getParameter(e.UNMASKED_RENDERER_WEBGL);
      r['UNMASKED_VENDOR_WEBGL'] = g.getParameter(e.UNMASKED_VENDOR_WEBGL);
   }
   o._parameters = r;
   return r;
}
function FWglContext_extensions(){
   var o = this;
   var r = o._extensions;
   if(!r){
      r = o._extensions = new Object();
      var g = o._native;
      var s = g.getSupportedExtensions();
      var c = s.length;
      for(var i = 0; i < c; i++){
         var n = s[i];
         r[n] = g.getExtension(n);
      }
   }
   return r;
}
function FWglContext_recordBuffers(){
   return this._recordBuffers;
}
function FWglContext_recordSamplers(){
   return this._recordSamplers;
}
function FWglContext_recordBegin(){
   var o = this;
   o._recordBuffers.clear();
   o._recordSamplers.clear();
   o._statusRecord = true;
}
function FWglContext_recordEnd(){
   this._statusRecord = false;
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._programTotal++;
   return r;
}
function FWglContext_createLayout(){
   var o = this;
   var r = RClass.create(FWglLayout);
   r.linkGraphicContext(o);
   if(o._capability.optionLayout){
      r.setup();
   }
   o._statistics._layoutTotal++;
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._vertexBufferTotal++;
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._indexBufferTotal++;
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._flatTextureTotal++;
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._cubeTextureTotal++;
   return r;
}
function FWglContext_createRenderTarget(){
   var o = this;
   var r = RClass.create(FWglRenderTarget);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._targetTotal++;
   return r;
}
function FWglContext_setViewport(l, t, w, h){
   var o = this;
   o._size.set(w, h);
   o._native.viewport(l, t, w, h);
}
function FWglContext_setFillMode(p){
   var o = this;
   var g = o._native;
   if(o._fillModeCd == p){
      return;
   }
   o._statistics._frameFillModeCount++;
   switch(p){
      case EG3dFillMode.Point:
         g.polygonMode(g.FRONT_AND_BACK, g.POINT);
         break;
      case EG3dFillMode.Line:
         g.polygonMode(g.FRONT_AND_BACK, g.LINE);
         break;
      case EG3dFillMode.Face:
         g.polygonMode(g.FRONT, g.FILL);
         break;
      default:
         throw new TError('Invalid parameter. (fill_mode={1})', p);
   }
   o._fillModeCd = p;
   return true;
}
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   o._statistics._frameDepthModeCount++;
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionCull == f) && (o._cullModeCd == v)){
      return true;
   }
   o._statistics._frameCullModeCount++;
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   o._statistics._frameBlendModeCount++;
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = f;
   }
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
   if(o._activeRenderTarget == p){
      return;
   }
   o._statistics._frameTargetCount++;
   var r = true;
   if(p == null){
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!r){
         return r;
      }
      g.viewport(0, 0, o._size.width, o._size.height);
   }else{
      g.bindFramebuffer(g.FRAMEBUFFER, p._native);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
      if(!r){
         return r;
      }
      var s = p.size();
      g.viewport(0, 0, s.width, s.height);
   }
   o._activeRenderTarget = p;
}
function FWglContext_setProgram(p){
   var o = this;
   var g = o._native;
   if(o._program == p){
      return;
   }
   o._statistics._frameProgramCount++;
   if(p){
      g.useProgram(p._native);
   }else{
      g.useProgram(null);
   }
   o._program = p;
   return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", p, p._native);
}
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameConstCount++;
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         g.uniform1fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         g.uniform2fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         g.uniform3fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         g.uniform4fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         var dt = o._data9;
         dt[ 0] = pdt[ 0];
         dt[ 1] = pdt[ 4];
         dt[ 2] = pdt[ 8];
         dt[ 3] = pdt[ 1];
         dt[ 4] = pdt[ 5];
         dt[ 5] = pdt[ 9];
         dt[ 6] = pdt[ 2];
         dt[ 7] = pdt[ 6];
         dt[ 8] = pdt[10];
         g.uniformMatrix3fv(psl, g.FALSE, dt);
         o._statistics._frameConstLength += dt.byteLength;
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         g.uniform4fv(psl, g.FALSE, pd);
         o._statistics._frameConstLength += dt.byteLength;
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         var d = null;
         if(pdt.constructor == Float32Array){
            d = pdt;
         }else if(pdt.writeData){
            d = o._data16;
            pdt.writeData(d, 0);
         }else{
            throw new TError('Unknown data type.');
         }
         g.uniformMatrix4fv(psl, g.FALSE, d);
         o._statistics._frameConstLength += d.byteLength;
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameBufferCount++;
   if(o._statusRecord){
      var l = new SG3dLayoutBuffer();
      l.slot = s;
      l.buffer = b;
      l.index = i;
      l.formatCd = f;
      o._recordBuffers.push(l);
   }
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
   if(b != null){
      g.enableVertexAttribArray(s);
      r = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", s);
      if(!r){
         return r;
      }
   }else{
      g.disableVertexAttribArray(s);
      r = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", s);
      return r;
   }
   var bs = b._stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         throw new TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameTextureCount++;
   if(o._statusRecord){
      var l = new SG3dLayoutSampler();
      l.slot = ps;
      l.index = pi;
      l.texture = pt;
      o._recordSamplers.push(l);
   }
   if(o._activeTextureSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._activeTextureSlot = ps;
   }
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   var gt = null;
   var gn = pt._native;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", gn);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", gn);
         if(!r){
            return r;
         }
         break;
      }
      default:{
         RLogger.fatal(o, null, "Unknown texture type.");
         break;
      }
   }
   return r;
}
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
function FWglContext_clearColor(r, g, b, a){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clear(c.COLOR_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
function FWglContext_clearDepth(d){
   var o = this;
   var c = o._native;
   c.clearDepth(d);
   c.clear(c.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
function FWglContext_readPixels(left, top, width, height){
   var o = this;
   var graphic = o._native;
   var data = new Uint8Array(4 * width * height);
   graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
   return data;
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count();
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
   if(b._fillMode == EG3dFillMode.Line){
      g.drawElements(g.LINES, c, strideCd, 2 * i);
   }else{
      g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
   }
   o._statistics._frameTriangleCount += c;
   o._statistics._frameDrawCount++;
   r = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   return r;
}
function FWglContext_present(){
}
function FWglContext_checkError(c, m, p1){
   var o = this;
   if(!o._capability.optionDebug){
      return true;
   }
   if(!RRuntime.isDebug()){
      return true;
   }
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
      switch(e){
         case g.INVALID_OPERATION:
            es = "Invalid operation.";
            break;
         case g.INVALID_ENUM:
            es = "Invalid enum.";
            break;
         case g.INVALID_VALUE:
            es = "Invalid value.";
            break;
         case g.INVALID_FRAMEBUFFER_OPERATION:
            es = "Invalid paramebuffer opeartion.";
            break;
         case g.OUT_OF_MEMORY:
            es = "Out of memory.";
            break;
         default:
            es = "Unknown";
            break;
      }
   }
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   o._native    = null;
   o.setup      = FWglCubeTexture_setup;
   o.isValid    = FWglCubeTexture_isValid;
   o.makeMipmap = FWglCubeTexture_makeMipmap;
   o.upload     = FWglCubeTexture_upload;
   o.update     = FWglCubeTexture_update;
   o.dispose    = FWglCubeTexture_dispose;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._graphicContext._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_isValid(){
   var o = this;
   var g = o._graphicContext._native;
   return g.isTexture(o._native);
}
function FWglCubeTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.generateMipmap(g.TEXTURE_CUBE_MAP);
}
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
   o.update();
}
function FWglCubeTexture_update(){
   var o = this;
   o.__base.FG3dCubeTexture.update.call(o);
   var g = o._graphicContext._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
   }
   var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
   }
}
function FWglCubeTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteTexture(n);
      o._native = null;
   }
   o.__base.FG3dCubeTexture.dispose.call(o);
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   o._native    = null;
   o.setup      = FWglFlatTexture_setup;
   o.isValid    = FWglFlatTexture_isValid;
   o.texture    = FWglFlatTexture_texture;
   o.makeMipmap = FWglFlatTexture_makeMipmap;
   o.uploadData = FWglFlatTexture_uploadData;
   o.upload     = FWglFlatTexture_upload;
   o.update     = FWglFlatTexture_update;
   o.dispose    = FWglFlatTexture_dispose;
   return o;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_isValid(){
   var o = this;
   var g = o._graphicContext._native;
   return g.isTexture(o._native);
}
function FWglFlatTexture_texture(){
   return this;
}
function FWglFlatTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.generateMipmap(g.TEXTURE_2D);
}
function FWglFlatTexture_uploadData(d, w, h){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var m = null;
   if(d.constructor == ArrayBuffer){
      m = new Uint8Array(d);
   }else if(d.constructor == Uint8Array){
      m = d;
   }else{
      throw new TError('Invalid data format.');
   }
   o.width = w;
   o.height = h;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, m);
   o._statusLoad = c.checkError("texImage2D", "Upload data failure.");
   o.update();
}
function FWglFlatTexture_upload(data){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var g = c._native;
   var pixels = null;
   if((data.tagName == 'IMG') || (data.tagName == 'CANVAS')){
      pixels = data;
   }else if(RClass.isClass(data, FImage)){
      pixels = data.image();
   }else if(RClass.isClass(data, MCanvasObject)){
      pixels = data.htmlCanvas();
   }else{
      throw new TError('Invalid image format.');
   }
   g.bindTexture(g.TEXTURE_2D, o._native);
   if(o._optionFlipY){
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
   }
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, pixels);
   o.update();
   o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
}
function FWglFlatTexture_update(){
   var o = this;
   o.__base.FG3dFlatTexture.update.call(o);
   var g = o._graphicContext._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, c);
   }
   var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
   if(c){
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, c);
   }
}
function FWglFlatTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteTexture(n);
      o._native = null;
   }
   o.__base.FG3dFlatTexture.dispose.call(o);
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   o._native      = null;
   o.setup        = FWglFragmentShader_setup;
   o.targetSource = FWglFragmentShader_targetSource;
   o.upload       = FWglFragmentShader_upload;
   o.dispose      = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_targetSource(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   if(cp.optionShaderSource){
      return c._nativeDebugShader.getTranslatedShaderSource(o._native);
   }
   return o._source;
}
function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._native;
   var shader = o._native;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._native = null;
      throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteShader(n);
      o._native = null;
   }
   o.__base.FG3dFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   o._native = null;
   o.setup   = FWglIndexBuffer_setup;
   o.isValid = FWglIndexBuffer_isValid;
   o.upload  = FWglIndexBuffer_upload;
   o.dispose = FWglIndexBuffer_dispose;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._native = o._graphicContext._native.createBuffer();
}
function FWglIndexBuffer_isValid(){
   var o = this;
   var g = o._graphicContext._native;
   return g.isBuffer(o._native);
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   o._count = pc;
   var d = null;
   if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
      if(o._strideCd == EG3dIndexStride.Uint16){
         d = new Uint16Array(pd);
      }else if(o._strideCd == EG3dIndexStride.Uint32){
         d = new Uint32Array(pd);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(pd.constructor == Uint16Array){
      if(o._strideCd != EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      d = pd;
   }else if(pd.constructor == Uint32Array){
      if(o._strideCd != EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      d = pd;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bind buffer failure.');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
}
function FWglIndexBuffer_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteBuffer(n);
      o._native = null;
   }
   o.__base.FG3dIndexBuffer.dispose.call(o);
}
function FWglLayout(o){
   o = RClass.inherits(this, o, FG3dLayout);
   o._native  = null;
   o.setup    = FWglLayout_setup;
   o.bind     = FWglLayout_bind;
   o.unbind   = FWglLayout_unbind;
   o.active   = FWglLayout_active;
   o.deactive = FWglLayout_deactive;
   o.dispose  = FWglLayout_dispose;
   return o;
}
function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._native = c._nativeLayout.createVertexArrayOES();
}
function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}
function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}
function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}
function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}
function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._nativeLayout.deleteVertexArrayOES(n);
      o._native = null;
   }
   o.__base.FG3dLayout.dispose.call(o);
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var c = g = o._graphicContext;
   o._native = c._native.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(!s){
      s = o._vertexShader = RClass.create(FWglVertexShader);
      s.linkGraphicContext(o);
      s.setup();
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(!s){
      s = o._fragmentShader = RClass.create(FWglFragmentShader);
      s.linkGraphicContext(o);
      s.setup();
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   if(t == EG3dShader.Vertex){
      o.vertexShader().upload(s);
   }else if(t == EG3dShader.Fragment){
      o.fragmentShader().upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var pn = o._native;
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   if(o.hasAttribute()){
      var as = o.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}
function FWglProgram_link(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteProgram(n);
      o._native = null;
   }
   o.__base.FProgram3d.dispose.call(o);
}
function FWglRenderTarget(o){
   o = RClass.inherits(this, o, FG3dRenderTarget);
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   o.setup        = FWglRenderTarget_setup;
   o.build        = FWglRenderTarget_build;
   o.dispose      = FWglRenderTarget_dispose;
   return o;
}
function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._native;
   o._native = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
function FWglRenderTarget_build(){
   var o = this;
   var s = o._size;
   var c = o._graphicContext;
   var g = c._native;
   g.bindFramebuffer(g.FRAMEBUFFER, o._native);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._nativeDepth = g.createRenderbuffer();
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
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._native);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._native, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
      if(!r){
         return r;
      }
   }
}
function FWglRenderTarget_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._nativeDepth;
   if(n){
      c._native.deleteRenderbuffer(n);
      o._nativeDepth = null;
   }
   var n = o._native;
   if(n){
      c._native.deleteFramebuffer(n);
      o._native = null;
   }
   o.__base.FG3dRenderTarget.dispose.call(o);
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   o._native = null;
   o.setup   = FWglVertexBuffer_setup;
   o.isValid = FWglVertexBuffer_isValid;
   o.upload  = FWglVertexBuffer_upload;
   o.dispose = FWglVertexBuffer_dispose;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_isValid(){
   var o = this;
   var g = o._graphicContext._native;
   return g.isBuffer(o._native);
}
function FWglVertexBuffer_upload(data, stride, count){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._native;
   o._stride = stride;
   o._count = count;
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      arrays = new Float32Array(data);
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._native);
   context.checkError('bindBuffer', 'Bindbuffer');
   graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
   context.checkError('bufferData', 'bufferData');
}
function FWglVertexBuffer_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteBuffer(n);
      o._native = null;
   }
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   o._native = null;
   o.setup        = FWglVertexShader_setup;
   o.targetSource = FWglVertexShader_targetSource;
   o.upload       = FWglVertexShader_upload;
   o.dispose      = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_targetSource(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   if(cp.optionShaderSource){
      return c._nativeDebugShader.getTranslatedShaderSource(o._native);
   }
   return o._source;
}
function FWglVertexShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._native;
   var shader = o._native;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._native = null;
      throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._native.deleteShader(n);
      o._native = null;
   }
   o.__base.FG3dVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
}
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
}
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
}
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
}
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.Zero:
         return g.ZERO;
      case EG3dBlendMode.One:
         return g.ONE;
      case EG3dBlendMode.SrcColor:
         return g.SRC_COLOR;
      case EG3dBlendMode.OneMinusSrcColor:
         return g.ONE_MINUS_SRC_COLOR;
      case EG3dBlendMode.DstColor:
         return g.DST_COLOR;
      case EG3dBlendMode.OneMinusDstColor:
         return g.ONE_MINUS_DST_COLOR;
      case EG3dBlendMode.SrcAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSrcAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      case EG3dBlendMode.DstAlpha:
         return g.DST_ALPHA;
      case EG3dBlendMode.OneMinusDstAlpha:
         return g.ONE_MINUS_DST_ALPHA;
      case EG3dBlendMode.SrcAlphaSaturate:
         return g.SRC_ALPHA_SATURATE;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
}
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
}
function RWglUtility_convertSamplerFilter(g, v){
   switch(v){
      case EG3dSamplerFilter.Unknown:
         return 0;
      case EG3dSamplerFilter.Nearest:
         return g.NEAREST;
      case EG3dSamplerFilter.Linear:
         return g.LINEAR;
      case EG3dSamplerFilter.Repeat:
         return g.REPEAT;
      case EG3dSamplerFilter.ClampToEdge:
         return g.CLAMP_TO_EDGE;
      case EG3dSamplerFilter.ClampToBorder:
         return g.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
}
var EDisplayTransform = new function EDisplayTransform(){
   var o = this;
   o.CameraPosition     = 'camera.position';
   o.CameraDirection    = 'camera.direction';
   o.BilboardedSphere   = 'bilboarded.sphere';
   o.BilboardedCylinder = 'bilboarded.cylinder';
   return o;
}
var EResourceCompress = new function EResourceCompress(){
   var o = this;
   o.None    = 'none';
   o.Deflate = 'deflate';
   o.Lzma    = 'lzma';
   return o;
}
var EStageKey = new function EStageKey(){
   var o = this;
   o.Forward       = EKeyCode.W;
   o.Back          = EKeyCode.S;
   o.Up            = EKeyCode.Q;
   o.Down          = EKeyCode.E;
   o.RotationLeft  = EKeyCode.A;
   o.RotationRight = EKeyCode.D;
   o.RotationUp    = EKeyCode.Z;
   o.RotationDown  = EKeyCode.X;
   o.FocusForward  = EKeyCode.I;
   o.FocusBack     = EKeyCode.K;
   o.FocusLeft     = EKeyCode.J;
   o.FocusRight    = EKeyCode.L;
   return o;
}
function MListenerEnterFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addEnterFrameListener     = MListenerEnterFrame_addEnterFrameListener;
   o.removeEnterFrameListener  = MListenerEnterFrame_removeEnterFrameListener;
   o.processEnterFrameListener = MListenerEnterFrame_processEnterFrameListener;
   return o;
}
function MListenerEnterFrame_addEnterFrameListener(w, m){
   return this.addListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_removeEnterFrameListener(w, m){
   this.removeListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_processEnterFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.EnterFrame, p1, p2, p3, p4, p5);
}
function MListenerLeaveFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addLeaveFrameListener     = MListenerLeaveFrame_addLeaveFrameListener;
   o.removeLeaveFrameListener  = MListenerLeaveFrame_removeLeaveFrameListener;
   o.processLeaveFrameListener = MListenerLeaveFrame_processLeaveFrameListener;
   return o;
}
function MListenerLeaveFrame_addLeaveFrameListener(w, m){
   return this.addListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_removeLeaveFrameListener(w, m){
   this.removeListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_processLeaveFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.LeaveFrame, p1, p2, p3, p4, p5);
}
function MResourceData(o){
   o = RClass.inherits(this, o);
   o._ready          = false;
   o._guid           = null;
   o._index          = -1;
   o._compressData   = null;
   o._data           = null;
   o.compressData    = MResourceData_compressData;
   o.setCompressData = MResourceData_setCompressData;
   o.testReady       = MResourceData_testReady;
   o.completeData    = MResourceData_completeData;
   o.dispose         = MResourceData_dispose;
   return o;
}
function MResourceData_compressData(){
   return this._compressData;
}
function MResourceData_setCompressData(data){
   this._compressData = data;
}
function MResourceData_testReady(){
   return this._ready;
}
function MResourceData_completeData(data){
   var o = this;
   o._data = data;
   o._ready = true;
}
function MResourceData_dispose(){
   var o = this;
   o._compressData = null;
   o._data = null;
}
function FDisplay(o){
   o = RClass.inherits(this, o, FComponent, MGraphicObject);
   o._currentMatrix    = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.currentMatrix     = FDisplay_currentMatrix;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   o.clearRenderables  = FDisplay_clearRenderables;
   o.filterDisplays    = FDisplay_filterDisplays;
   o.filterRenderables = FDisplay_filterRenderables;
   o.show              = FDisplay_show;
   o.hide              = FDisplay_hide;
   o.setVisible        = FDisplay_setVisible;
   o.update            = FDisplay_update;
   o.updateMatrix      = FDisplay_updateMatrix;
   o.process           = FDisplay_process;
   o.remove            = FDisplay_remove;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_currentMatrix(){
   return this._currentMatrix;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var renderables = this._renderables;
   return renderables ? !renderables.isEmpty() : false;
}
function FDisplay_renderables(){
   var o = this;
   var renderables = o._renderables;
   if(!renderables){
      renderables = o._renderables = new TObjects();
   }
   return renderables;
}
function FDisplay_pushRenderable(renderable){
   var o = this;
   renderable._display = o;
   o.renderables().push(renderable);
}
function FDisplay_removeRenderable(renderable){
   var renderables = this._renderables;
   if(renderables){
      renderables.remove(renderable);
   }
}
function FDisplay_clearRenderables(){
   var renderables = this._renderables;
   if(renderables){
      renderables.clear();
   }
}
function FDisplay_filterDisplays(p){
   var o = this;
   if(o._visible){
      p.push(o);
   }
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterDrawables(p);
      }
   }
   return true;
}
function FDisplay_show(){
   this.setVisible(true);
}
function FDisplay_hide(){
   this.setVisible(false);
}
function FDisplay_setVisible(p){
   this._visible = p;
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_updateMatrix(region){
   var o = this;
   o._currentMatrix.assign(o._matrix);
   var parent = o._parent;
   if(parent){
      o._currentMatrix.append(parent._currentMatrix);
   }
}
function FDisplay_process(region){
   var o = this;
   o.updateMatrix(region);
   var renderables = o._renderables;
   if(renderables){
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.process(region);
      }
   }
}
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}
function FDisplay_dispose(){
   var o = this;
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   RObject.dispose(o._renderables)
   o.__base.FComponent.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   o.filterDisplays    = FDisplayContainer_filterDisplays;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_hasDisplay(){
   var displays = this._displays;
   if(displays){
      return !displays.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(code){
   var o = this;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(display.code() == code){
            return display;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var displays = o._displays;
   if(displays){
      var c = displays.count();
      for(var i = 0; i < c; i++){
         var f = displays.at(i);
         if(f.isName(p)){
            return f;
         }
         var r = f.searchDisplay(p);
         if(r){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_displays(){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new TObjects();
   }
   return displays;
}
function FDisplayContainer_pushDisplay(display){
   var o = this;
   display.setParent(o);
   o.displays().push(display);
}
function FDisplayContainer_removeDisplay(display){
   var o = this;
   o.displays().remove(display);
   display.setParent(null);
}
function FDisplayContainer_filterDisplays(region){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, region);
   if(!o._visible){
      return false;
   }
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterDisplays(region);
      }
   }
}
function FDisplayContainer_filterRenderables(region){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, region);
   if(!o._visible){
      return false;
   }
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterRenderables(region);
      }
   }
   return true;
}
function FDisplayContainer_process(region){
   var o = this;
   o.__base.FDisplay.process.call(o, region);
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.process(region);
      }
   }
}
function FDisplayContainer_dispose(){
   var o = this;
   var displays = o._displays;
   if(displays){
      for(var i = v.count() - 1; i >= 0; i--){
         displays.at(i).dispose();
      }
      o._displays = RObject.dispose(displays);
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive       = false;
   o._technique          = null;
   o._visibleRenderables = null;
   o.construct           = FDisplayLayer_construct;
   o.technique           = FDisplayLayer_technique;
   o.setTechnique        = FDisplayLayer_setTechnique;
   o.selectTechnique     = FDisplayLayer_selectTechnique;
   o.visibleRenderables  = FDisplayLayer_visibleRenderables;
   o.filterRenderables   = FDisplayLayer_filterRenderables;
   o.active              = FDisplayLayer_active;
   o.deactive            = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new TObjects();
}
function FDisplayLayer_technique(){
   return this._technique;
}
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}
function FDisplayLayer_visibleRenderables(){
   return this._visibleRenderables;
}
function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   o._visibleRenderables.assign(p.renderables());
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDisplayUiLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   return o;
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o._visible    = true;
   o.testVisible = FDrawable_testVisible;
   o.visible     = FDrawable_visible;
   o.setVisible  = FDrawable_setVisible;
   o.process     = RMethod.empty;
   return o;
}
function FDrawable_testVisible(){
   return this._visible;
}
function FDrawable_visible(){
   return this._visible;
}
function FDrawable_setVisible(p){
   this._visible = p;
}
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FRenderable(o){
   o = RClass.inherits(this, o, FDrawable);
   o._drawables      = null;
   o.hasDrawable     = FRenderable_hasDrawable;
   o.drawables       = FRenderable_drawables;
   o.pushDrawable    = FRenderable_pushDrawable;
   o.removeDrawable  = FRenderable_removeDrawable;
   o.filterDrawables = FRenderable_filterDrawables;
   o.process         = FRenderable_process;
   return o;
}
function FRenderable_hasDrawable(){
   var drawables = this._drawables;
   return drawables ? !drawables.isEmpty() : false;
}
function FRenderable_drawables(){
   var o = this;
   var drawables = o._drawables;
   if(!drawables){
      drawables = o._drawables = new TObjects();
   }
   return drawables;
}
function FRenderable_pushDrawable(drawable){
   var o = this;
   drawable._drawable = o;
   drawable._parent = o;
   o.drawables().push(drawable);
}
function FRenderable_removeDrawable(drawable){
   this._drawables.remove(drawable);
}
function FRenderable_filterDrawables(region){
   var o = this;
   if(!o.testVisible()){
      return false;
   }
   region.pushRenderable(o);
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         if(drawable.testVisible()){
            region.pushRenderable(drawable);
         }
      }
   }
   return true;
}
function FRenderable_process(region){
   var o = this;
   o.__base.FDrawable.process.call(o, region);
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         drawable.process(region);
      }
   }
}
function FStage(o){
   o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
   o._statusActive   = false;
   o._layers         = null;
   o._timer          = null;
   o.onProcess       = FStage_onProcess;
   o.construct       = FStage_construct;
   o.timer           = FStage_timer;
   o.registerLayer   = FStage_registerLayer;
   o.unregisterLayer = FStage_unregisterLayer;
   o.layers          = FStage_layers;
   o.active          = FStage_active;
   o.deactive        = FStage_deactive;
   o.process         = FStage_process;
   o.dispose         = FStage_dispose;
   return o;
}
function FStage_onProcess(){
   var o = this;
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.valueAt(i).process();
   }
}
function FStage_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._timer = RClass.create(FTimer);
   o._layers = new TDictionary();
}
function FStage_timer(){
   return this._timer;
}
function FStage_registerLayer(n, l){
   l.setCode(n);
   this._layers.set(n, l);
}
function FStage_unregisterLayer(n){
   this._layers.set(n, null);
}
function FStage_layers(){
   return this._layers;
}
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).active();
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).deactive();
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   var t = o._timer;
   if(!t){
      t = RClass.create(FTimer);
      t.setup();
   }
   o.processEnterFrameListener(o);
   o.onProcess();
   o.processLeaveFrameListener(o);
   t.update();
}
function FStage_dispose(){
   var o = this;
   o._timer = RObject.dispose(o._timer);
   o._layers = RObject.dispose(o._layers);
   o.__base.MListenerEnterFrame.dispose.call(o);
   o.__base.MListenerLeaveFrame.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
var RStage = new function RStage(){
   var o = this;
   o._started       = false;
   o._active        = true;
   o._interval      = 1000 / 40;
   o._stages        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess      = RStage_onProcess;
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.unregister     = RStage_unregister;
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
   o.process        = RStage_process;
   o.start          = RStage_start;
   o.construct();
   return o;
}
function RStage_onProcess(){
   RStage.process();
}
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_register(name, stage){
   var o = this;
   var stages = o._stages;
   if(!stages){
      stages = o._stages = new TDictionary();
   }
   stages.set(name , stage);
}
function RStage_unregister(stage){
   this._stages.removeValue(stage);
}
function RStage_active(){
   var o = this;
   var stages = o._stages;
   if(stages){
      var count = stages.count();
      for(var i = 0; i < count; i++){
         var stage = stages.at(i);
         stage.active();
      }
   }
}
function RStage_deactive(){
   var o = this;
   var stages = o._stages;
   if(stages){
      var count = stages.count();
      for(var i = 0; i < count; i++){
         var stage = stages.at(i);
         stage.deactive();
      }
   }
}
function RStage_process(){
   var o = this;
   if(!o._active){
      return;
   }
   try{
      o.lsnsEnterFrame.process(o);
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.process();
         }
      }
      o.lsnsLeaveFrame.process(o);
      RTimer.update();
   }catch(e){
      alert(e);
   }
}
function RStage_start(interval){
   var o = this;
   if(o._started){
      return;
   }
   RE3dEngine.setup();
   o.active();
   o.process();
   if(interval == null){
      interval = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(interval));
   o._started = true;
}
function MLinkerResource(o){
   o = RClass.inherits(this, o);
   o._resource    = null;
   o.resource     = MLinkerResource_resource;
   o.setResource  = MLinkerResource_setResource;
   o.loadResource = MLinkerResource_loadResource;
   return o;
}
function MLinkerResource_resource(){
   return this._resource;
}
function MLinkerResource_setResource(resource){
   this._resource = resource;
}
function MLinkerResource_loadResource(resource){
   this._resource = resource;
}
function FResource(o){
   o = RClass.inherits(this, o, FObject);
   o._typeCode     = null;
   o._type         = null;
   o._dataCompress = false;
   o._dataBlock    = false;
   o._guid         = null;
   o._code         = null;
   o._label        = null;
   o._sourceUrl    = null;
   o.typeCode      = FResource_typeCode;
   o.type          = FResource_type;
   o.guid          = FResource_guid;
   o.setGuid       = FResource_setGuid;
   o.code          = FResource_code;
   o.setCode       = FResource_setCode;
   o.label         = FResource_label;
   o.setLabel      = FResource_setLabel;
   o.sourceUrl     = FResource_sourceUrl;
   o.setSourceUrl  = FResource_setSourceUrl;
   return o;
}
function FResource_typeCode(){
   return this._typeCode;
}
function FResource_type(){
   return this._type;
}
function FResource_guid(){
   return this._guid;
}
function FResource_setGuid(p){
   this._guid = p;
}
function FResource_code(){
   return this._code;
}
function FResource_setCode(p){
   this._code = p;
}
function FResource_label(){
   return this._label;
}
function FResource_setLabel(p){
   this._label = p;
}
function FResource_sourceUrl(){
   return this._sourceUrl;
}
function FResource_setSourceUrl(p){
   this._sourceUrl = p;
}
function FResourceBlockStorage(o){
   o = RClass.inherits(this, o, FResourceStorage);
   o._ready      = false;
   o._dataLength = 0;
   o._blockSize  = 0;
   o._blockCount = 0;
   o._blocks     = null;
   o._resource   = null;
   o.construct   = FResourceBlockStorage_construct;
   o.testReady   = FResourceBlockStorage_testReady;
   o.blocks      = FResourceBlockStorage_blocks;
   o.load        = FResourceBlockStorage_load;
   o.complete    = FResourceBlockStorage_complete;
   o.dispose     = FResourceBlockStorage_dispose;
   return o;
}
function FResourceBlockStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
   o._blocks = new TObjects();
}
function FResourceBlockStorage_testReady(){
   var o = this;
   if(!o._ready){
      var blocks = o._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         if(!block.testReady()){
            return false;
         }
      }
      o._ready = true;
   }
   return o._ready;
}
function FResourceBlockStorage_blocks(){
   return this._blocks;
}
function FResourceBlockStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   var view = RClass.create(FDataView);
   view.setEndianCd(true);
   view.link(buffer);
   var compressCode = view.readString();
   var length = o._dataLength = view.readInt32();
   var blockSize = o._blockSize = view.readInt32();
   var blockCount = o._blockCount = view.readInt32();
   var blocks = o._blocks;
   for(var i = 0; i < blockCount; i++){
      var size = view.readInt32();
      var blockData = new ArrayBuffer(size);
      view.readBytes(blockData, 0, size);
      var block = RClass.create(FResourceBlockStorageData);
      block._guid = resource.guid();
      block._index = i;
      block.setCompressData(blockData);
      blocks.push(block)
   }
   view.dispose();
}
function FResourceBlockStorage_complete(){
   var o = this;
   var resource = o._resource;
   var stream = RClass.create(FDataStream);
   stream.setEndianCd(true);
   stream.setLength(o._dataLength);
   var blocks = o._blocks;
   var count = blocks.count();
   for(var i = 0; i < count; i++){
      var block = blocks.at(i);
      var data = block._data;
      stream.writeBytes(data.buffer, 0, data.byteLength);
   }
   stream.flip();
   var span = RTimer.current() - resource._compressStartTick;
   RLogger.info(o, 'Process resource storage. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, o._compressLength, o._dataLength, span);
   resource.onComplete(stream);
   stream.dispose();
}
function FResourceBlockStorage_dispose(){
   var o = this;
   o._resource = null;
   var blocks = o._blocks;
   if(blocks){
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         block.dispose();
      }
      o._blocks = RObject.dispose(blocks);
   }
   o.__base.FResourceStorage.dispose.call(o);
}
function FResourceBlockStorageData(o){
   o = RClass.inherits(this, o, FObject, MResourceData);
   o.dispose = FResourceBlockStorageData_dispose;
   return o;
}
function FResourceBlockStorageData_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
function FResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd          = EScope.Global;
   o._factory          = null;
   o._types            = null;
   o._resources        = null;
   o._loadResources    = null;
   o._loadingResources = null;
   o._processStorages  = null;
   o._thread           = null;
   o._loadLimit        = 8;
   o._interval         = 150;
   o.onComplete        = FResourceConsole_onComplete;
   o.onLoad            = FResourceConsole_onLoad;
   o.onBlockLoad       = FResourceConsole_onBlockLoad;
   o.onProcess         = FResourceConsole_onProcess;
   o.construct         = FResourceConsole_construct;
   o.registerType      = FResourceConsole_registerType;
   o.factory           = FResourceConsole_factory;
   o.load              = FResourceConsole_load;
   return o;
}
function FResourceConsole_onComplete(resource, data){
   var o = this;
   resource._data = null;
   o._loadingResources.remove(resource);
   resource.onComplete(data);
}
function FResourceConsole_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   var storage = RClass.create(FResourceSingleStorage);
   storage.setResource(resource);
   storage.load(data);
   RConsole.find(FResourceDataConsole).load(storage);
   o._loadingResources.remove(resource);
   o._processStorages.push(storage);
}
function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
   var storage = RClass.create(FResourceBlockStorage);
   storage.setResource(resource);
   storage.load(data);
   var dataConsole = RConsole.find(FResourceDataConsole);
   var blocks = storage.blocks();
   var count = blocks.count();
   for(var i = 0; i < count; i++){
      var block = blocks.at(i);
      dataConsole.load(block);
   }
   o._loadingResources.remove(resource);
   o._processStorages.push(storage);
}
function FResourceConsole_onProcess(){
   var o = this;
   var httpConsole = RConsole.find(FHttpConsole);
   var loadResources = o._loadResources;
   var loadingResources = o._loadingResources;
   var pc = loadingResources.count();
   if(!loadResources.isEmpty()){
      for(var i = o._loadLimit - pc; i > 0; i--){
         var resource = loadResources.shift();
         var sourceUrl = resource.sourceUrl();
         var connection = httpConsole.send(sourceUrl);
         connection._resource = resource;
         if(resource._dataCompress){
            if(resource._dataBlock){
               connection.addLoadListener(o, o.onBlockLoad);
            }else{
               connection.addLoadListener(o, o.onLoad);
            }
         }else{
            connection.addLoadListener(o, o.onComplete);
         }
         resource._dataLoad = true;
         loadingResources.push(resource);
         if(loadResources.isEmpty()){
            break;
         }
      }
   }
   var storages = o._processStorages;
   storages.record();
   while(storages.next()){
      var storage = storages.current();
      if(storage.testReady()){
         storages.removeCurrent();
         storage.complete();
         storage.dispose();
      }
   }
}
function FResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._factory = RClass.create(FClassFactory);
   o._types = new TDictionary();
   o._resources = new TDictionary();
   o._loadResources  = new TObjects();
   o._loadingResources = new TObjects();
   o._processStorages = new TLooper();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FResourceConsole_registerType(type){
   var o = this;
   var code = type.code();
   return o._types.set(code, type);
}
function FResourceConsole_factory(){
   return this._factory;
}
function FResourceConsole_load(resource){
   var o = this;
   var guid = resource.guid();
   var resources = o._resources;
   if(resources.contains(guid)){
      throw new TError(o, 'Resource is already loaded. (guid={1})', guid);
   }
   resources.set(guid, resource);
   o._loadResources.push(resource);
   resource._dataLoad = true;
}
function FResourceDataConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd           = EScope.Global;
   o._loadDatas         = null;
   o._processDatas      = null;
   o._pipeline          = null;
   o._pipelinePool      = null;
   o._thread            = null;
   o._processLimit      = 4;
   o._interval          = 200;
   o.onPipelineComplete = FResourceDataConsole_onPipelineComplete;
   o.onProcess          = FResourceDataConsole_onProcess;
   o.construct          = FResourceDataConsole_construct;
   o.allocPipeline      = FResourceDataConsole_allocPipeline;
   o.freePipeline       = FResourceDataConsole_freePipeline;
   o.load               = FResourceDataConsole_load;
   return o;
}
function FResourceDataConsole_onPipelineComplete(pipeline, data){
   var o = this;
   if(pipeline){
      o.freePipeline(pipeline);
   }
   o._processDatas.remove(data);
}
function FResourceDataConsole_onProcess(){
   var o = this;
   var loadDatas = o._loadDatas;
   var loadCount = loadDatas.count();
   if(loadCount == 0){
      return;
   }
   var pipeline = o._pipeline;
   if(pipeline){
      if(!pipeline.testBusy()){
         var data = loadDatas.shift();
         pipeline.decompress(data);
      }
   }else{
      var processDatas = o._processDatas;
      var processCount = processDatas.count();
      var idleCount = o._processLimit - processCount;
      if(idleCount <= 0){
         return;
      }
      var freeCount = Math.min(loadCount, idleCount);
      for(var i = 0; i < freeCount; i++){
         var data = loadDatas.shift();
         var pipeline = o.allocPipeline();
         pipeline.decompress(data);
         processDatas.push(data);
      }
   }
}
function FResourceDataConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadDatas  = new TObjects();
   o._processDatas = new TObjects();
   o._pipelinePool  = RClass.create(FObjectPool);
   var capability = RBrowser.capability();
   if(!capability.optionProcess){
      var pipeline = o._pipeline = RClass.create(FResourceSinglePipeline);
      pipeline.setConsole(o);
   }
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}
function FResourceDataConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = RClass.create(FResourceThreadPipeline);
      pipeline.setConsole(o);
      pool.push(pipeline);
   }
   return pool.alloc();
}
function FResourceDataConsole_freePipeline(pipeline){
   this._pipelinePool.free(pipeline);
}
function FResourceDataConsole_load(data){
   this._loadDatas.push(data);
}
function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = null;
   o._resources = null;
   o.code       = FResourceGroup_code;
   return o;
}
function FResourceGroup_code(){
   return this._code;
}
function FResourcePipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   o._console    = null;
   o._compressCd = null;
   o._resource   = null;
   o.console     = FResourcePipeline_console;
   o.setConsole  = FResourcePipeline_setConsole;
   o.compressCd  = FResourcePipeline_compressCd;
   o.resource    = FResourcePipeline_resource;
   o.setResource = FResourcePipeline_setResource;
   o.dispose     = FResourcePipeline_dispose;
   return o;
}
function FResourcePipeline_console(){
   return this._console;
}
function FResourcePipeline_setConsole(p){
   this._console = p;
}
function FResourcePipeline_compressCd(){
   return this._compressCd;
}
function FResourcePipeline_resource(){
   return this._resource;
}
function FResourcePipeline_setResource(p){
   this._resource = p;
}
function FResourcePipeline_dispose(){
   var o = this;
   o._console = null;
   o._resource = null;
   o.__base.FPipeline.dispose.call(o);
}
function FResourceSinglePipeline(o){
   o = RClass.inherits(this, o, FResourcePipeline);
   o._startTime  = 0;
   o._statusBusy = false;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = FResourceSinglePipeline_onComplete;
   o.construct   = FResourceSinglePipeline_construct;
   o.testBusy    = FResourceSinglePipeline_testBusy;
   o.decompress  = FResourceSinglePipeline_decompress;
   o.dispose     = FResourceSinglePipeline_dispose;
   return o;
}
function FResourceSinglePipeline_onComplete(buffer){
   var o = this;
   var bufferData = null;
   if(buffer.constructor == Array){
      bufferData = new Uint8Array(buffer);
   }else if(buffer.constructor == ArrayBuffer){
      bufferData = buffer;
   }else{
      throw new TError(o, 'Unknown buffer type.');
   }
   var data = o._data;
   data.completeData(bufferData);
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, bufferData.byteLength, span);
   o._console.onPipelineComplete(null, data);
   o._data = null;
   o._statusBusy = false;
}
function FResourceSinglePipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}
function FResourceSinglePipeline_testBusy(){
   return this._statusBusy;
}
function FResourceSinglePipeline_decompress(data){
   var o = this;
   o._startTime = RTimer.current();
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   var processData = null;
   if(compressData.constructor == ArrayBuffer){
      processData = new Uint8Array(compressData);
   }else if(compressData.constructor == Uint8Array){
      processData = compressData;
   }else{
      throw new TError(o, 'Unknown data type.');
   }
   o._statusBusy = true;
   LZMA.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
}
function FResourceSinglePipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
}
function FResourceSingleStorage(o){
   o = RClass.inherits(this, o, FResourceStorage, MResourceData);
   o.construct   = FResourceSingleStorage_construct;
   o.load        = FResourceSingleStorage_load;
   o.complete    = FResourceSingleStorage_complete;
   o.dispose     = FResourceSingleStorage_dispose;
   return o;
}
function FResourceSingleStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
}
function FResourceSingleStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   o._compressData = new Uint8Array(buffer);
}
function FResourceSingleStorage_complete(){
   var o = this;
   var resource = o._resource;
   resource.onComplete(o._data);
}
function FResourceSingleStorage_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FResourceStorage.dispose.call(o);
}
function FResourceStorage(o){
   o = RClass.inherits(this, o, FObject);
   o._ready      = false;
   o._dataLength = 0;
   o._resource   = null;
   o.construct   = FResourceStorage_construct;
   o.testReady   = FResourceStorage_testReady;
   o.resource    = FResourceStorage_resource;
   o.setResource = FResourceStorage_setResource;
   o.load        = FResourceStorage_load;
   o.complete    = FResourceStorage_complete;
   o.dispose     = FResourceStorage_dispose;
   return o;
}
function FResourceStorage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FResourceStorage_testReady(){
   return this._ready;
}
function FResourceStorage_resource(){
   return this._resource;
}
function FResourceStorage_setResource(resource){
   this._resource = resource;
}
function FResourceStorage_load(buffer){
}
function FResourceStorage_complete(){
}
function FResourceStorage_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FResourceThreadPipeline(o){
   o = RClass.inherits(this, o, FResourcePipeline);
   o._startTime  = 0;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = FResourceThreadPipeline_onComplete;
   o.construct   = FResourceThreadPipeline_construct;
   o.worker      = FResourceThreadPipeline_worker;
   o.decompress  = FResourceThreadPipeline_decompress;
   o.dispose     = FResourceThreadPipeline_dispose;
   return o;
}
function FResourceThreadPipeline_onComplete(buffer){
   var o = this;
   var bufferData = null;
   if(buffer.constructor == Array){
      bufferData = new Uint8Array(buffer);
   }else if(buffer.constructor == Uint8Array){
      bufferData = buffer;
   }else{
      throw new TError(o, 'Unknown buffer type.');
   }
   var data = o._data;
   data.completeData(bufferData);
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, buffer.byteLength, span);
   o._console.onPipelineComplete(o, data);
   o._data = null;
}
function FResourceThreadPipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}
function FResourceThreadPipeline_worker(){
   var o = this;
   var worker = o._worker;
   if(!worker){
      var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA_WORKER(uri);
   }
   return worker;
}
function FResourceThreadPipeline_decompress(data){
   var o = this;
   o._startTime = RTimer.current();
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   var worker = o.worker();
   debugger
   worker.decompress(compressData, function(buffer){o.onComplete(buffer);}, null);
}
function FResourceThreadPipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
}
function FResourceType(o){
   o = RClass.inherits(this, o, FObject);
   o._code        = null;
   o._pipeline    = null;
   o._resources   = null;
   o.construct    = FResourceType_construct;
   o.code         = FResourceType_code;
   o.setCode      = FResourceType_setCode;
   o.pipeline     = FResourceType_pipeline;
   o.setPipeline  = FResourceType_setPipeline;
   o.findResource = FResourceType_findResource;
   o.resources    = FResourceType_resources;
   return o;
}
function FResourceType_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._resources = new TDictionary();
}
function FResourceType_code(){
   return this._code;
}
function FResourceType_setCode(p){
   this._code = p;
}
function FResourceType_pipeline(){
   return this._pipeline;
}
function FResourceType_setPipeline(p){
   this._pipeline = p;
}
function FResourceType_findResource(p){
   return this._resources.get(p);
}
function FResourceType_resources(){
   return this._resources;
}
function FE2dCanvas(o){
   o = RClass.inherits(this, o, FObject, MCanvasObject);
   o._size      = null;
   o._context   = null;
   o._hCanvas   = null;
   o.onResize   = FE2dCanvas_onResize;
   o.construct  = FE2dCanvas_construct;
   o.htmlCanvas = FE2dCanvas_htmlCanvas;
   o.size       = FE2dCanvas_size;
   o.context    = FE2dCanvas_context;
   o.build      = FE2dCanvas_build;
   o.setPanel   = FE2dCanvas_setPanel;
   o.dispose    = FE2dCanvas_dispose;
   return o;
}
function FE2dCanvas_onResize(p){
   var o = this;
}
function FE2dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}
function FE2dCanvas_size(){
   return this._size;
}
function FE2dCanvas_context(){
   return this._context;
}
function FE2dCanvas_build(hDocument){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = RBuilder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var style = hCanvas.style;
   style.width = width + 'px';
   style.height = height + 'px';
   var context = o._context = RClass.create(FG2dCanvasContext);
   context.linkCanvas(hCanvas);
}
function FE2dCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE2dCanvas_dispose(){
   var o = this;
   o._context = RObject.dispose(o._context);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   o.__base.FObject.dispose.call(o);
}
function FE2dCanvasConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._pools      = null;
   o.construct   = FE2dCanvasConsole_construct;
   o.allocBySize = FE2dCanvasConsole_allocBySize;
   o.free        = FE2dCanvasConsole_free;
   return o;
}
function FE2dCanvasConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pools = RClass.create(FObjectPools);
}
function FE2dCanvasConsole_allocBySize(width, height){
   var o = this;
   var pools = o._pools;
   var code = width + 'x' + height;
   var canvas = pools.alloc(code);
   if(canvas){
      return canvas;
   }
   canvas = RClass.create(FE2dCanvas);
   canvas.size().set(width, height);
   canvas.build(RWindow._hDocument);
   return canvas;
}
function FE2dCanvasConsole_free(canvas){
   var o = this;
   var pools = o._pools;
   var size = canvas.size();
   var code = size.width + 'x' + size.height;
   pools.free(code, canvas);
}
function FE2dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
function ME3dObject(o){
   o = RClass.inherits(this, o, MGraphicObject, MAttributeGuid, MAttributeCode);
   return o;
}
function FE3dCanvas(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerLoad, MMouseCapture);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._scaleRate          = 1;
   o._size               = null;
   o._interval           = 1000 / 60;
   o._hPanel             = null;
   o._hCanvas            = null;
   o.onEnterFrame        = RMethod.empty;
   o.ohTouchStart        = FE3dCanvas_ohTouchStart;
   o.ohTouchMove         = FE3dCanvas_ohTouchMove;
   o.ohTouchStop         = FE3dCanvas_ohTouchStop;
   o.onMouseCaptureStart = RMethod.empty;
   o.onMouseCapture      = RMethod.empty;
   o.onMouseCaptureStop  = RMethod.empty;
   o.onTouchStart        = RMethod.empty;
   o.onTouchMove         = RMethod.empty;
   o.onTouchStop         = RMethod.empty;
   o.onResize            = FE3dCanvas_onResize;
   o.construct           = FE3dCanvas_construct;
   o.build               = FE3dCanvas_build;
   o.resize              = FE3dCanvas_resize;
   o.setPanel            = FE3dCanvas_setPanel;
   o.dispose             = FE3dCanvas_dispose;
   return o;
}
function FE3dCanvas_ohTouchStart(p){
   this.__linker.onTouchStart(p);
}
function FE3dCanvas_ohTouchMove(p){
   this.__linker.onTouchMove(p);
}
function FE3dCanvas_ohTouchStop(p){
   this.__linker.onTouchStop(p);
}
function FE3dCanvas_onResize(p){
   var o = this;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   if(o._size.equalsData(w, h)){
      return;
   }
   o._size.set(w, h);
   var hc = o._hCanvas;
   var sw = hc.width = w * o._scaleRate;
   var sh = hc.height = h * o._scaleRate;
   o._graphicContext.setViewport(0, 0, sw, sh);
}
function FE3dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FE3dCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   if(!RMethod.isEmpty(o.onTouchStart)){
      h.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!RMethod.isEmpty(o.onTouchMove)){
      h.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!RMethod.isEmpty(o.onTouchStop)){
      h.addEventListener('touchend', o.ohTouchStop, false);
   }
   var a = new Object();
   a.alpha = o._optionAlpha;
   a.antialias = o._optionAntialias;
   var c = o._graphicContext = REngine3d.createContext(FWglContext, h, a);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(o._interval);
   RWindow.lsnsResize.register(o, o.onResize);
   RWindow.lsnsOrientation.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dCanvas_resize(){
   this.onResize();
}
function FE3dCanvas_setPanel(p){
   var o = this;
   var c = o._graphicContext;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE3dCanvas_dispose(){
   var o = this;
   var h = o._hCanvas;
   if(h){
      h.__linker = null;
      h.removeEventListener('touchstart', o.ohTouchStart);
      h.removeEventListener('touchmove', o.ohTouchMove);
      h.removeEventListener('touchend', o.ohTouchStop);
   }
   o._graphicContext = RObject.dispose(o._graphicContext);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   o.__base.FObject.dispose.call(o);
}
function FE3dDisplay(o){
   o = RClass.inherits(this, o, FDisplay);
   o._outline         = null;
   o._materials       = null;
   o.construct        = FE3dDisplay_construct;
   o.materials        = FE3dDisplay_materials;
   o.calculateOutline = FE3dDisplay_calculateOutline;
   o.dispose          = FE3dDisplay_dispose;
   return o;
}
function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dDisplay_materials(){
   return this._materials;
}
function FE3dDisplay_calculateOutline(){
   var o = this;
   return o._outline;
}
function FE3dDisplay_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
}
function FE3dDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._outline         = null;
   o._materials       = null;
   o.construct        = FE3dDisplayContainer_construct;
   o.materials        = FE3dDisplayContainer_materials;
   o.calculateOutline = FE3dDisplayContainer_calculateOutline;
   o.dispose          = FE3dDisplayContainer_dispose;
   return o;
}
function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dDisplayContainer_materials(){
   return this._materials;
}
function FE3dDisplayContainer_calculateOutline(){
   var o = this;
   return o._outline;
}
function FE3dDisplayContainer_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplayContainer.dispose.call(o);
}
function FE3dRenderable(o){
   o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject, MLinkerResource);
   o._display           = null;
   o._outline           = null;
   o._outlineVisible    = true;
   o._calculateMatrix   = null;
   o._vertexCount       = 0;
   o._vertexBuffers     = null;
   o._indexBuffer       = null;
   o._indexBuffers      = null;
   o._materialReference = null;
   o._materials         = null;
   o._bones             = null;
   o._textures          = null;
   o.construct          = FE3dRenderable_construct;
   o.setup              = RMethod.empty;
   o.testReady          = RMethod.emptyTrue;
   o.testVisible        = FE3dRenderable_testVisible;
   o.display            = FE3dRenderable_display;
   o.setDisplay         = FE3dRenderable_setDisplay;
   o.vertexCount        = FE3dRenderable_vertexCount;
   o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
   o.vertexBuffers      = FE3dRenderable_vertexBuffers;
   o.indexBuffer        = FE3dRenderable_indexBuffer;
   o.indexBuffers       = FE3dRenderable_indexBuffers;
   o.materialReference  = FE3dRenderable_materialReference;
   o.materials          = FE3dRenderable_materials;
   o.pushMaterial       = FE3dRenderable_pushMaterial;
   o.bones              = FE3dRenderable_bones;
   o.findTexture        = FE3dRenderable_findTexture;
   o.pushTexture        = FE3dRenderable_pushTexture;
   o.textures           = FE3dRenderable_textures;
   o.processDelay       = RMethod.empty;
   o.update             = FE3dRenderable_update;
   o.remove             = FE3dRenderable_remove;
   return o;
}
function FE3dRenderable_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   o._outline = new SOutline3d();
   o._calculateMatrix = new SMatrix3d();
   o._vertexBuffers = new TDictionary();
   o._materialReference = o;
}
function FE3dRenderable_testVisible(){
   var o = this;
   var ready = o.testReady();
   if(!ready){
      return false;
   }
   var visible = o.__base.FRenderable.testVisible.call(o);
   if(!visible){
      return false;
   }
   if(!o._outlineVisible){
      return false;
   }
   var material = o._material;
   if(material){
      if(!material.testVisible()){
         return false;
      }
   }
   return true;
}
function FE3dRenderable_display(){
   return this._display;
}
function FE3dRenderable_setDisplay(p){
   this._display = p;
}
function FE3dRenderable_vertexCount(){
   return this._vertexCount;
}
function FE3dRenderable_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
function FE3dRenderable_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3dRenderable_materialReference(){
   return this._materialReference;
}
function FE3dRenderable_materials(){
   return this._materials;
}
function FE3dRenderable_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new TObjects();
   }
   materials.push(material);
}
function FE3dRenderable_indexBuffer(){
   return this._indexBuffer;
}
function FE3dRenderable_indexBuffers(){
   return this._indexBuffers;
}
function FE3dRenderable_bones(){
   return this._bones;
}
function FE3dRenderable_findTexture(p){
   return this._textures.get(p);
}
function FE3dRenderable_textures(){
   return this._textures;
}
function FE3dRenderable_pushTexture(texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new TDictionary();
   }
   var code = texture.code();
   textures.set(code, texture);
}
function FE3dRenderable_update(region){
   var o = this;
   var calculateMatrix = o._calculateMatrix;
   calculateMatrix.assign(o._matrix);
   var drawable = o._drawable;
   if(drawable){
      calculateMatrix.append(drawable.currentMatrix());
   }
   var display = o._display;
   if(display){
      calculateMatrix.append(display.currentMatrix());
   }
   var changed = o._currentMatrix.attachData(calculateMatrix.data());
   if(changed && region){
      region.change();
   }
}
function FE3dRenderable_remove(){
   var o = this;
   var display = o._display;
   if(display){
      display.removeRenderable(o);
      o._display = null;
   }
}
function FE3dStage(o){
   o = RClass.inherits(this, o, FStage, MGraphicObject);
   o._statistics       = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o._allDisplays      = null;
   o.onProcess         = FE3dStage_onProcess;
   o.construct         = FE3dStage_construct;
   o.createRegion      = FE3dStage_createRegion;
   o.setup             = FE3dStage_setup;
   o.statistics        = FE3dStage_statistics;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   o.filterDisplays    = FE3dStage_filterDisplays;
   o.allDisplays       = FE3dStage_allDisplays;
   return o;
}
function FE3dStage_onProcess(){
   var o = this;
   var region = o._region;
   if(!region){
      return;
   }
   var technique = o._technique;
   if(!technique){
      return;
   }
   var g = technique._graphicContext;
   var ss = region._statistics = o._statistics;
   ss.resetFrame();
   ss._frame.begin();
   ss._frameProcess.begin();
   g.prepare();
   technique.updateRegion(region);
   region.prepare();
   region.change();
   var layers = o._layers;
   var layerCount = layers.count();
   for(var i = 0; i < layerCount; i++){
      var layer = layers.at(i);
      region.reset();
      layer.process(region);
      layer.filterRenderables(region);
      region.update();
   }
   RConsole.find(FE3dStageConsole).process(region);
   ss._frameProcess.end();
   ss._frameDraw.begin();
   if(region.isChanged()){
      technique.clear(region.backgroundColor());
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         var layerTechnique = layer.technique();
         if(!layerTechnique){
            layerTechnique = technique;
         }
         region.reset();
         region.renderables().assign(layer.visibleRenderables());
         layerTechnique.drawRegion(region);
      }
      technique.present(region);
   }
   ss._frameDraw.end();
   ss._frame.end();
}
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._statistics = RClass.create(FE3dStageStatistics);
   RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
   o._allDisplays = new TObjects();
   var r = o._region = o.createRegion();
   r._timer = o._timer;
}
function FE3dStage_createRegion(){
   return RClass.create(FE3dRegion);
}
function FE3dStage_setup(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._region.linkGraphicContext(o);
   o._region.setup();
}
function FE3dStage_statistics(){
   return this._statistics;
}
function FE3dStage_camera(){
   return this._region._camera;
}
function FE3dStage_projection(){
   return this._region._camera._projection;
}
function FE3dStage_directionalLight(){
   return this._region._directionalLight;
}
function FE3dStage_technique(){
   return this._technique;
}
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
   var technique = o._technique = techniqueConsole.find(c, p);
   return technique;
}
function FE3dStage_region(){
   return this._region;
}
function FE3dStage_filterDisplays(p){
   var o = this;
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.value(i).filterDisplays(p);
   }
}
function FE3dStage_allDisplays(){
   var o = this;
   var s = o._allDisplays;
   s.clear();
   o.filterDisplays(s);
   return s;
}
function FE3dStageConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._looper   = null;
   o._thread   = null;
   o._interval = 25;
   o._limit    = 8;
   o.onProcess = FE3dStageConsole_onProcess;
   o.construct = FE3dStageConsole_construct;
   o.process   = FE3dStageConsole_process;
   return o;
}
function FE3dStageConsole_onProcess(){
   var o = this;
   var s = o._looper;
   s.record();
   for(var i = o._limit - 1; i >= 0; i--){
      var r = s.next();
      if(r){
         r.processDelay(r._linkRegion);
      }else{
         break;
      }
   }
}
function FE3dStageConsole_construct(){
   var o = this;
   o._looper = new TLooper();
   o._renderables = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dStageConsole_process(p){
   var o = this;
   var s = p.allRenderables();
   for(var i = s.count() - 1; i >= 0; i--){
      var r = s.getAt(i);
      if(!r._linkStageLooper){
         o._looper.push(r);
         r._linkRegion = p;
         r._linkStageLooper = o._looper;
      }
   }
}
function FE3dStageStatistics(o){
   o = RClass.inherits(this, o, FStatistics);
   o._frame         = null;
   o._frameProcess  = null;
   o._frameDraw     = null;
   o._frameDrawSort = null;
   o._frameDrawRenderable = null;
   o.construct      = FE3dStageStatistics_construct;
   o.reset          = FE3dStageStatistics_reset;
   o.resetFrame     = FE3dStageStatistics_resetFrame;
   return o;
}
function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new TSpeed();
   o._frameProcess = new TSpeed();
   o._frameDraw = new TSpeed();
   o._frameDrawSort = new TSpeed();
   o._frameDrawRenderable = new TSpeed();
}
function FE3dStageStatistics_reset(){
}
function FE3dStageStatistics_resetFrame(){
   var o = this;
   o._frame.reset();
   o._frameProcess.reset();
   o._frameDraw.reset();
   o._frameDrawSort.reset();
   o._frameDrawRenderable.reset();
}
function FE3dTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique, MLinkerResource);
   return o;
}
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   o._setuped = false;
   o.onSetup  = RE3dEngine_onSetup;
   o.setup    = RE3dEngine_setup;
   return o;
}
function RE3dEngine_onSetup(){
   var effectConsole = RConsole.find(FG3dEffectConsole);
   effectConsole.register('select.select.control', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   effectConsole.register('control.control.automatic', FE3dControlAutomaticEffect);
   effectConsole.register('control.control.control', FE3dControlAutomaticEffect);
   effectConsole.register('general.color.control', FE3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skin', FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.parallax', FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skeleton', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton.4', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('shadow.depth.automatic', FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', FE3dShadowColorSkeletonEffect);
}
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
var EE3sResource = new function EE3sResource(){
   var o = this;
   o.Unknown  = 'Unknown';
   o.Bitmap   = 'Bitmap';
   o.Material = 'Material';
   o.Mesh     = 'Mesh';
   o.Model    = 'Model';
   o.Template = 'Template';
   o.Scene    = 'Scene';
   o.Project  = 'Project';
   o.All      = 'All';
   return o;
}
function ME3sGeometry(o){
   o = RClass.inherits(this, o);
   o._outline         = null;
   o._streams         = null;
   o.construct        = ME3sGeometry_construct;
   o.outline          = ME3sGeometry_outline;
   o.findStream       = ME3sGeometry_findStream;
   o.streams          = ME3sGeometry_streams;
   o.calculateOutline = ME3sGeometry_calculateOutline;
   o.dispose          = ME3sGeometry_dispose;
   return o;
}
function ME3sGeometry_construct(){
   var o = this;
   o._outline = new SOutline3d();
}
function ME3sGeometry_outline(){
   return this._outline;
}
function ME3sGeometry_findStream(code){
   var o = this;
   var streams = o._streams;
   var count = streams.count();
   for(n = 0; n < count; n++){
      var stream = streams.getAt(n);
      if(stream.code() == code){
         return stream;
      }
   }
   return null;
}
function ME3sGeometry_streams(){
   return this._streams;
}
function ME3sGeometry_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var stream = o.findStream('position');
      var dataCount = stream.dataCount();
      var data = new Float32Array(stream.data())
      var index = 0;
      for(var i = 0; i < dataCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}
function ME3sGeometry_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   o.__base.FE3sSpace.dispose.call(o);
}
function SE3sCompressEvent(w, f, d){
   var o = this;
   o.owner   = w;
   o.process = f;
   o.data    = d;
   return o;
}
function SE3sMaterialInfo(){
   var o = this;
   SG3dMaterialInfo.call(o);
   o.unserialize = SE3sMaterialInfo_unserialize;
   o.saveConfig  = SE3sMaterialInfo_saveConfig;
   return o;
}
function SE3sMaterialInfo_unserialize(input){
   var o = this;
   o.effectCode = input.readString();
   o.optionDepth = input.readBoolean();
   o.optionDouble = input.readBoolean();
   o.optionNormalInvert = input.readBoolean();
   o.optionShadow = input.readBoolean();
   o.optionShadowSelf = input.readBoolean();
   o.optionAlpha = input.readBoolean();
   o.alphaBase = input.readFloat();
   o.alphaRate = input.readFloat();
   o.optionColor = input.readBoolean();
   o.colorMin = input.readFloat();
   o.colorMax = input.readFloat();
   o.colorBalance = input.readFloat();
   o.colorRate = input.readFloat();
   o.optionVertex = input.readBoolean();
   o.vertexColor.unserialize(input);
   o.optionAmbient = input.readBoolean();
   o.ambientColor.unserialize(input);
   o.optionDiffuse = input.readBoolean();
   o.diffuseColor.unserialize(input);
   o.optionDiffuseView = input.readBoolean();
   o.diffuseViewColor.unserialize(input);
   o.optionSpecular = input.readBoolean();
   o.specularColor.unserialize(input);
   o.specularBase = input.readFloat();
   o.specularLevel = input.readFloat();
   o.optionSpecularView = input.readBoolean();
   o.specularViewColor.unserialize(input);
   o.specularViewBase = input.readFloat();
   o.specularViewLevel = input.readFloat();
   o.optionReflect = input.readBoolean();
   o.reflectColor.unserialize(input);
   o.reflectMerge = input.readFloat();
   o.optionRefract = input.readBoolean();
   o.refractFrontColor.unserialize(input);
   o.refractBackColor.unserialize(input);
   o.optionOpacity = input.readBoolean();
   o.opacityColor.unserialize(input);
   o.opacityRate = input.readFloat();
   o.opacityAlpha = input.readFloat();
   o.opacityDepth = input.readFloat();
   o.opacityTransmittance = input.readFloat();
   o.optionEmissive = input.readBoolean();
   o.emissiveColor.unserialize(input);
}
function SE3sMaterialInfo_saveConfig(xconfig){
   var o = this;
   xconfig.set('effect_code', o.effectCode);
   xconfig.setBoolean('option_double', o.optionDouble);
   xconfig.setBoolean('option_alpha', o.optionAlpha);
   xconfig.setBoolean('option_normal_invert', o.optionNormalInvert);
   xconfig.setBoolean('option_shadow', o.optionShadow);
   xconfig.setBoolean('option_shadow_self', o.optionShadowSelf);
   var x = xconfig.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = xconfig.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('balance', o.colorBalance);
   x.setFloat('rate', o.colorRate);
   var x = xconfig.create('Vertex')
   x.setBoolean('valid', o.optionVertex);
   o.vertexColor.savePower(x);
   var x = xconfig.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   var x = xconfig.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   var x = xconfig.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   var x = xconfig.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = xconfig.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = xconfig.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   var x = xconfig.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   var x = xconfig.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   var x = xconfig.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
}
function SE3sSceneShadow(){
   var o = this;
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = SE3sSceneShadow_unserialize;
   return o;
}
function SE3sSceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
function FE3sAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._model           = null;
   o._skeletonGuid    = null;
   o._skeleton        = null;
   o._frameCount      = 0;
   o._frameTick       = 0;
   o._frameSpan       = 0;
   o._frameTranslates = null;
   o._frameRotations  = null;
   o._frameScales     = null;
   o._tracks          = null;
   o.skeletonGuid     = FE3sAnimation_skeletonGuid;
   o.skeleton         = FE3sAnimation_skeleton;
   o.frameCount       = FE3sAnimation_frameCount;
   o.frameTick        = FE3sAnimation_frameTick;
   o.frameSpan        = FE3sAnimation_frameSpan;
   o.tracks           = FE3sAnimation_tracks;
   o.unserialize      = FE3sAnimation_unserialize;
   return o;
}
function FE3sAnimation_skeletonGuid(){
   return this._skeletonGuid;
}
function FE3sAnimation_skeleton(){
   var o = this;
   var skeleton = o._skeleton;
   if(!skeleton){
      var guid = o._skeletonGuid;
      if(guid){
         skeleton = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(guid);
      }
   }
   return skeleton;
}
function FE3sAnimation_frameCount(){
   return this._frameCount;
}
function FE3sAnimation_frameTick(){
   return this._frameTick;
}
function FE3sAnimation_frameSpan(){
   return this._frameSpan;
}
function FE3sAnimation_tracks(){
   return this._tracks;
}
function FE3sAnimation_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._skeletonGuid = input.readString();
   o._frameCount = input.readUint16();
   o._frameTick = input.readUint16();
   o._frameSpan = input.readUint32();
   var translateCount = input.readUint32();
   var translateBytes = RInteger.strideByte(translateCount);
   if(translateCount > 0){
      var translates = o._frameTranslates = new TObjects();
      for(var i = 0; i < translateCount; i++){
         var translate = new SPoint3();
         translate.unserialize(input);
         translates.push(translate);
      }
   }
   var rotationCount = input.readUint32();
   var rotationBytes = RInteger.strideByte(rotationCount);
   if(rotationCount > 0){
      var rotations = o._frameRotations = new TObjects();
      for(var i = 0; i < rotationCount; i++){
         var rotation = new SQuaternion();
         rotation.unserialize(input);
         rotations.push(rotation);
      }
   }
   var scaleCount = input.readUint32();
   var scaleBytes = RInteger.strideByte(scaleCount);
   if(scaleCount > 0){
      var scales = o._frameScales = new TObjects();
      for(var i = 0; i < scaleCount; i++){
         var scale = new SVector3();
         scale.unserialize(input);
         scales.push(scale);
      }
   }
   var tracks = null;
   var trackCount = input.readUint16();
   if(trackCount > 0){
      tracks = o._tracks = new TObjects();
      for(var n = 0; n < trackCount; n++){
         var track = RClass.create(FE3sTrack);
         track.unserialize(input);
         tracks.push(track);
         var frameCount = track._frameCount;
         var frames = track._frames;
         for(var i = 0; i < frameCount; i++){
            var frame = RClass.create(FE3sFrame);
            var translateIndex = 0;
            if(translateBytes == 4){
               translateIndex = input.readUint32();
            }else if(translateBytes == 2){
               translateIndex = input.readUint16();
            }else{
               translateIndex = input.readUint8();
            }
            frame._translation = translates.at(translateIndex);
            var rotationIndex = 0;
            if(rotationBytes == 4){
               rotationIndex = input.readUint32();
            }else if(rotationBytes == 2){
               rotationIndex = input.readUint16();
            }else{
               rotationIndex = input.readUint8();
            }
            frame._quaternion = rotations.at(rotationIndex);
            var scaleIndex = 0;
            if(scaleBytes == 4){
               scaleIndex = input.readUint32();
            }else if(scaleBytes == 2){
               scaleIndex = input.readUint16();
            }else{
               scaleIndex = input.readUint8();
            }
            frame._scale = scales.at(scaleIndex);
            frames.push(frame);
         }
      }
   }
   if(tracks && o._skeletonGuid){
      var skeleton = o.skeleton();
      for(var i = 0; i < trackCount; i++){
         var track = tracks.at(i);
         var boneIndex = track.boneIndex();
         var bone = skeleton.findBone(boneIndex);
         bone.setTrack(track);
      }
      skeleton.pushAnimation(o);
   }
}
function FE3sBone(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   o.index       = FE3sBone_index;
   o.track       = FE3sBone_track;
   o.setTrack    = FE3sBone_setTrack;
   o.bones       = FE3sBone_bones;
   o.unserialize = FE3sBone_unserialize;
   return o;
}
function FE3sBone_index(){
   return this._index;
}
function FE3sBone_track(){
   return this._track;
}
function FE3sBone_setTrack(p){
   this._track = p;
}
function FE3sBone_bones(){
   return this._bones;
}
function FE3sBone_unserialize(p){
   var o = this;
   o._index = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FE3sBoneRefer(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._bone       = null;
   o._track      = null;
   o.index       = FE3sBoneRefer_index;
   o.bone        = FE3sBoneRefer_bone;
   o.setBone     = FE3sBoneRefer_setBone;
   o.track       = FE3sBoneRefer_track;
   o.setTrack    = FE3sBoneRefer_setTrack;
   o.unserialize = FE3sBoneRefer_unserialize;
   return o;
}
function FE3sBoneRefer_index(){
   return this._index;
}
function FE3sBoneRefer_bone(){
   return this._bone;
}
function FE3sBoneRefer_setBone(p){
   this._bone = p;
}
function FE3sBoneRefer_track(){
   return this._track;
}
function FE3sBoneRefer_setTrack(p){
   this._track = p;
}
function FE3sBoneRefer_unserialize(p){
   var o = this;
   o._index = p.readUint8();
}
function FE3sCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeCd     = null;
   o._position   = null;
   o._direction  = null;
   o._projection = null;
   o.construct   = FE3sCamera_construct;
   o.typeCd      = FE3sCamera_typeCd;
   o.position    = FE3sCamera_position;
   o.direction   = FE3sCamera_direction;
   o.projection  = FE3sCamera_projection;
   o.unserialize = FE3sCamera_unserialize;
   o.saveConfig  = FE3sCamera_saveConfig;
   return o;
}
function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sProjection);
}
function FE3sCamera_typeCd(){
   return this._typeCd;
}
function FE3sCamera_position(){
   return this._position;
}
function FE3sCamera_direction(){
   return this._direction;
}
function FE3sCamera_projection(){
   return this._projection;
}
function FE3sCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeCd = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FE3sCamera_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('position', o._position.toString());
   xconfig.set('direction', o._direction.toString());
   o._projection.saveConfig(xconfig.create('Projection'));
}
function FE3sComponent(o){
   o = RClass.inherits(this, o, FE3sObject);
   return o;
}
function FE3sDisplay(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   o._outline         = null;
   o._renderables     = null;
   o.construct        = FE3sDisplay_construct;
   o.renderables      = FE3sDisplay_renderables;
   o.calculateOutline = FE3sDisplay_calculateOutline;
   o.unserialize      = FE3sDisplay_unserialize;
   o.saveConfig       = FE3sDisplay_saveConfig;
   o.clone            = FE3sDisplay_clone;
   return o;
}
function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o._outline = new SOutline3d();
}
function FE3sDisplay_renderables(){
   return this._renderables;
}
function FE3sDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.getAt(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new TObjects();
      for(var i = 0; i < renderableCount; i++){
         var renderable = resourceConsole.unserialize(input);
         renderables.push(renderable);
      }
   }
}
function FE3sDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   var renderables = o._renderables;
   if(renderables){
      var xrenderables = xconfig.create('RenderableCollection');
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.saveConfig(xrenderables.create('Renderable'));
      }
   }
}
function FE3sDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   result._outline.assign(o._outline)
   return result;
}
function FE3sDisplayContainer(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   o._displays        = null;
   o.construct        = FE3sDisplayContainer_construct;
   o.displays         = FE3sDisplayContainer_displays;
   o.pushDisplay      = FE3sDisplayContainer_pushDisplay;
   o.calculateOutline = FE3sDisplayContainer_calculateOutline;
   o.unserialize      = FE3sDisplayContainer_unserialize;
   o.saveConfig       = FE3sDisplayContainer_saveConfig;
   o.clone            = FE3sDisplayContainer_clone;
   return o;
}
function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}
function FE3sDisplayContainer_displays(){
   return this._displays;
}
function FE3sDisplayContainer_pushDisplay(display){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new TObjects();
   }
   display.setParent(o);
   displays.push(display);
}
function FE3sDisplayContainer_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.getAt(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sDisplayContainer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, input);
   var displayCount = input.readUint16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = RClass.create(FE3sSceneDisplay);
         display.unserialize(input);
         o.pushDisplay(display);
      }
   }
}
function FE3sDisplayContainer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, xconfig);
   var displays = o._displays;
   if(displays){
      var xdisplays = xconfig.create('DisplayCollection');
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
      }
   }
}
function FE3sDisplayContainer_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplay.clone.call(o, instance);
   return result;
}
function FE3sDisplayLayer(o){
   o = RClass.inherits(this, o, FE3sDisplayContainer);
   o._typeCd        = null;
   o._transformCd   = null;
   o.typeCd         = FE3sDisplayLayer_typeCd;
   o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
   o.transformCd    = FE3sDisplayLayer_transformCd;
   o.setTransformCd = FE3sDisplayLayer_setTransformCd;
   o.unserialize    = FE3sDisplayLayer_unserialize;
   o.saveConfig     = FE3sDisplayLayer_saveConfig;
   return o;
}
function FE3sDisplayLayer_typeCd(){
   return this._typeCd;
}
function FE3sDisplayLayer_setTypeCd(p){
   this._typeCd = p;
}
function FE3sDisplayLayer_transformCd(){
   return this._transformCd;
}
function FE3sDisplayLayer_setTransformCd(p){
   this._transformCd = p;
}
function FE3sDisplayLayer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   o._typeCd = input.readString();
   o._transformCd = input.readString();
}
function FE3sDisplayLayer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
   xconfig.set('type_cd', o._typeCd);
   xconfig.set('transform_cd', o._transformCd);
}
function FE3sDisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._groupGuid  = null;
   o._material   = null;
   o.groupGuid   = FE3sDisplayMaterial_groupGuid;
   o.material    = FE3sDisplayMaterial_material;
   o.unserialize = FE3sDisplayMaterial_unserialize;
   return o;
}
function FE3sDisplayMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sDisplayMaterial_material(){
   return this._material;
}
function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
function FE3sDrawable(o){
   o = RClass.inherits(this, o, FE3sComponent);
   o._matrix     = null;
   o.construct   = FE3sDrawable_construct;
   o.matrix      = FE3sDrawable_matrix;
   o.unserialize = FE3sDrawable_unserialize;
   o.saveConfig  = FE3sDrawable_saveConfig;
   o.clone       = FE3sDrawable_clone;
   return o;
}
function FE3sDrawable_construct(){
   var o = this;
   o.__base.FE3sComponent.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sDrawable_matrix(){
   return this._matrix;
}
function FE3sDrawable_unserialize(input){
   var o = this;
   o.__base.FE3sComponent.unserialize.call(o, input);
   o._matrix.unserialize(input);
}
function FE3sDrawable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sComponent.saveConfig.call(o, xconfig);
   o._matrix.saveConfig(xconfig.create('Matrix'));
}
function FE3sDrawable_clone(instance){
   var o = this;
   var result = o.__base.FE3sComponent.clone.call(o, instance);
   result._matrix.assign(o._matrix);
   return result;
}
function FE3sFrame(o){
   o = RClass.inherits(this, o, FObject);
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   o.translation  = FE3sFrame_translation;
   o.quaternion   = FE3sFrame_quaternion;
   o.scale        = FE3sFrame_scale;
   return o;
}
function FE3sFrame_tick(){
   return this._tick;
}
function FE3sFrame_translation(){
   return this._translation;
}
function FE3sFrame_quaternion(){
   return this._quaternion;
}
function FE3sFrame_scale(){
   return this._scale;
}
function FE3sGeometry(o){
   o = RClass.inherits(this, o, FE3sRenderable, ME3sGeometry);
   o.construct     = FE3sGeometry_construct;
   o.unserialize   = FE3sGeometry_unserialize;
   o.dispose       = FE3sGeometry_dispose;
   return o;
}
function FE3sGeometry_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}
function FE3sGeometry_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   var outline = o._outline;
   outline.unserialize(input);
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   if(outline.isEmpty()){
      o.calculateOutline();
   }
   outline.update();
}
function FE3sGeometry_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sRenderable.dispose.call(o);
}
function FE3sLight(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName   = null;
   o._material   = null;
   o._camera     = null;
   o.construct   = FE3sLight_construct;
   o.typeName    = FE3sLight_typeName;
   o.material    = FE3sLight_material;
   o.camera      = FE3sLight_camera;
   o.unserialize = FE3sLight_unserialize;
   return o;
}
function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
}
function FE3sLight_typeName(){
   return this._typeName;
}
function FE3sLight_material(){
   return this._material;
}
function FE3sLight_camera(){
   return this._camera;
}
function FE3sLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._parentGuid  = null;
   o._info        = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o.construct    = FE3sMaterial_construct;
   o.parentGuid   = FE3sMaterial_parentGuid;
   o.effectCode   = FE3sMaterial_effectCode;
   o.info         = FE3sMaterial_info;
   o.bitmaps      = FE3sMaterial_bitmaps;
   o.bitmapPacks  = FE3sMaterial_bitmapPacks;
   o.unserialize  = FE3sMaterial_unserialize;
   o.saveConfig   = FE3sMaterial_saveConfig;
   o.clone        = FE3sMaterial_clone;
   return o;
}
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sMaterial_parentGuid(){
   return this._parentGuid;
}
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
function FE3sMaterial_info(){
   return this._info;
}
function FE3sMaterial_bitmaps(){
   return this._bitmaps;
}
function FE3sMaterial_bitmapPacks(){
   return this._bitmapPacks;
}
function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._parentGuid = input.readString();
   o._info.unserialize(input);
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = RClass.create(FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = RClass.create(FE3sMaterialBitmap);
         bitmap.unserialize(input);
         bitmaps.push(bitmap);
         var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
         bitmap.setBitmapPack(pack);
      }
   }
}
function FE3sMaterial_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('parent_guid', o._parentGuid);
   o._info.saveConfig(xconfig);
}
function FE3sMaterial_clone(instance){
   var o = this;
   var result = o.__base.FE3sObject.clone.call(o, instance);
   result._parentGuid = o._parentGuid;
   result._info.assign(o._info);
   return result;
}
function FE3sMaterialBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._bitmapPackGuid = null;
   o._bitmapPack     = null;
   o._bitmapGuid     = null;
   o._index          = 0;
   o.bitmapPackGuid  = FE3sMaterialBitmap_bitmapPackGuid;
   o.bitmapPack      = FE3sMaterialBitmap_bitmapPack;
   o.setBitmapPack   = FE3sMaterialBitmap_setBitmapPack;
   o.bitmapGuid      = FE3sMaterialBitmap_bitmapGuid;
   o.unserialize     = FE3sMaterialBitmap_unserialize;
   return o;
}
function FE3sMaterialBitmap_bitmapPackGuid(){
   return this._bitmapPackGuid;
}
function FE3sMaterialBitmap_bitmapPack(){
   return this._bitmapPack;
}
function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
   this._bitmapPack = bitmapPack;
}
function FE3sMaterialBitmap_bitmapGuid(){
   return this._bitmapGuid;
}
function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
function FE3sMaterialBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName       = null;
   o._formatName     = null;
   o._size           = null;
   o.construct       = FE3sMaterialBitmapPack_construct;
   o.typeName        = FE3sMaterialBitmapPack_typeName;
   o.formatName      = FE3sMaterialBitmapPack_formatName;
   o.size            = FE3sMaterialBitmapPack_size;
   o.unserialize     = FE3sMaterialBitmapPack_unserialize;
   o.dispose         = FE3sMaterialBitmapPack_dispose;
   return o;
}
function FE3sMaterialBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}
function FE3sMaterialBitmapPack_typeName(){
   return this._typeName;
}
function FE3sMaterialBitmapPack_formatName(){
   return this._formatName;
}
function FE3sMaterialBitmapPack_size(){
   return this._size;
}
function FE3sMaterialBitmapPack_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._typeName = input.readString();
   o._formatName = input.readString();
   o._size.unserialize(input, EDataType.Uint16);
}
function FE3sMaterialBitmapPack_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o.__base.FE3sObject.dispose.call(o);
}
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._resources  = null;
   o._materials  = null;
   o.construct   = FE3sMaterialConsole_construct;
   o.find        = FE3sMaterialConsole_find;
   o.unserialize = FE3sMaterialConsole_unserialize;
   o.loadByGuid  = FE3sMaterialConsole_loadByGuid;
   o.dispose     = FE3sMaterialConsole_dispose;
   return o;
}
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new TDictionary();
   o._materials = new TDictionary();
}
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
function FE3sMaterialConsole_unserialize(input){
   var o = this;
   var material = RClass.create(FE3sMaterial);
   material.unserialize(input);
   var materialGuid = material.guid();
   if(o._materials.contains(materialGuid)){
      throw new TError(o, 'Material is already exists.');
   }
   o._materials.set(materialGuid, material);
   return material;
}
function FE3sMaterialConsole_loadByGuid(guid){
   var o = this;
   var resources = o._resources;
   var resource = resources.get(guid);
   if(resource){
      return resource;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find('material');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   resource = RClass.create(FE3sMaterialResource);
   resource.setGuid(guid);
   resource.setVendor(vendor);
   resource.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(resource);
   resources.set(guid, resource);
   return resource;
}
function FE3sMaterialConsole_dispose(){
   var o = this;
   o._resources = RObject.free(o._resources);
   o._materials = RObject.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
function FE3sMaterialRefer(o){
   o = RClass.inherits(this, o, FE3sObject);
   return o;
}
function FE3sMaterialResource(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._typeName     = 'Material';
   o._dataCompress = true;
   o._material     = null;
   o.material      = FE3sMaterialResource_material;
   o.unserialize   = FE3sMaterialResource_unserialize;
   return o;
}
function FE3sMaterialResource_material(){
   return this._material;
}
function FE3sMaterialResource_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   o._material = RConsole.find(FE3sMaterialConsole).unserialize(input);
   RLogger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
}
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sSpace, ME3sGeometry);
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   o._display      = null;
   o._renderable   = null;
   o.construct     = FE3sMesh_construct;
   o.unserialize   = FE3sMesh_unserialize;
   o.saveConfig    = FE3sMesh_saveConfig;
   o.dispose       = FE3sMesh_dispose;
   return o;
}
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   o._display = RClass.create(FE3sMeshDisplay);
}
function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   o._outline.unserialize(input);
   o._outline.update();
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   o._display.unserialize(input);
   o._renderable = o._display._renderable;
}
function FE3sMesh_saveConfig(config){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, config);
   o._display.saveConfig(config.create('Display'));
}
function FE3sMesh_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   o._display = RObject.dispose(o._display);
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
function FE3sMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   o._meshs      = null;
   o.construct   = FE3sMeshConsole_construct;
   o.find        = FE3sMeshConsole_find;
   o.meshs       = FE3sMeshConsole_meshs;
   o.loadByGuid  = FE3sMeshConsole_loadByGuid;
   o.loadByCode  = FE3sMeshConsole_loadByCode;
   o.dispose     = FE3sMeshConsole_dispose;
   return o;
}
function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._meshs = new TDictionary();
}
function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}
function FE3sMeshConsole_meshs(){
   return this._meshs;
}
function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sMeshConsole_loadByCode(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = RObject.free(o._meshs);
   o.__base.FConsole.dispose.call(o);
}
function FE3sMeshDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._matrix     = null;
   o._material   = null;
   o._renderable = null;
   o.construct   = FE3sMeshDisplay_construct;
   o.matrix      = FE3sMeshDisplay_matrix;
   o.material    = FE3sMeshDisplay_material;
   o.renderable  = FE3sMeshDisplay_renderable;
   o.unserialize = FE3sMeshDisplay_unserialize;
   o.saveConfig  = FE3sMeshDisplay_saveConfig;
   return o;
}
function FE3sMeshDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FE3sMaterial);
   o._renderable = RClass.create(FE3sRenderable);
}
function FE3sMeshDisplay_matrix(){
   return this._matrix;
}
function FE3sMeshDisplay_material(){
   return this._material;
}
function FE3sMeshDisplay_renderable(){
   return this._renderable;
}
function FE3sMeshDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._matrix.unserialize(p);
   o._material.unserialize(p);
   o._renderable.unserialize(p);
}
function FE3sMeshDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._matrix.saveConfig(p.create('Matrix'));
   o._material.saveConfig(p.create('Material'));
   o._renderable.saveConfig(p.create('Renderable'));
}
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._typeName      = 'Model';
   o._dataCompress  = true;
   o._dataBlock     = true;
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   o._display       = null;
   o.construct      = FE3sModel_construct;
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   o.display        = FE3sModel_display;
   o.unserialize    = FE3sModel_unserialize;
   o.saveConfig     = FE3sModel_saveConfig;
   return o;
}
function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   var display = o._display = RClass.create(FE3sModelDisplay);
   display._model = o;
}
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}
function FE3sModel_meshes(){
   return this._meshes;
}
function FE3sModel_skeletons(){
   return this._skeletons;
}
function FE3sModel_animations(){
   return this._animations;
}
function FE3sModel_display(){
   return this._display;
}
function FE3sModel_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var modelConsole = RConsole.find(FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new TDictionary();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         var meshGuid = mesh.guid();
         meshes.set(meshGuid, mesh);
      }
   }
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new TObjects();
      for(var i = 0; i < animationCount; i++){
         var animation = modelConsole.unserialAnimation(o, input)
         animations.push(animation);
      }
   }
   var display = o._display;
   display.unserialize(input);
   var renderables = display.renderables();
   if(renderables){
      var renderableCount = renderables.count();
      for(var i = 0; i < renderableCount; i++){
         var renderable = renderables.get(i);
         var meshGuid = renderable.meshGuid();
         var mesh = meshes.get(meshGuid);
         renderable.setMesh(mesh);
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FE3sModel_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   o._display.saveConfig(xconfig.create('Display'));
}
function FE3sModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   o.construct         = FE3sModelConsole_construct;
   o.findModel         = FE3sModelConsole_findModel;
   o.models            = FE3sModelConsole_models;
   o.findMesh          = FE3sModelConsole_findMesh;
   o.meshs             = FE3sModelConsole_meshs;
   o.findSkeleton      = FE3sModelConsole_findSkeleton;
   o.skeletons         = FE3sModelConsole_skeletons;
   o.findAnimation     = FE3sModelConsole_findAnimation;
   o.animations        = FE3sModelConsole_animations;
   o.unserialMesh      = FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = FE3sModelConsole_unserialAnimation;
   o.load              = FE3sModelConsole_load;
   o.dispose           = FE3sModelConsole_dispose;
   return o;
}
function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
   var rc = RConsole.find(FResourceConsole);
   var rp = RClass.create(FResourcePipeline);
   var rt = RClass.create(FResourceType);
   rt.setCode('resource3d.model');
   rt._pipeline = rp;
   rc.registerType(rt);
}
function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3sModelConsole_models(){
   return this._models;
}
function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3sModelConsole_meshs(){
   return this._meshs;
}
function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
function FE3sModelConsole_skeletons(){
   return this._skeletons;
}
function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}
function FE3sModelConsole_animations(){
   return this._animations;
}
function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FE3sModelMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = RClass.create(FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_load(guid){
   var o = this;
   var models = o._models;
   var model = models.get(guid);
   if(model){
      return model;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find('model');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   model = RClass.create(FE3sModel);
   model.setGuid(guid);
   model.setVendor(vendor);
   model.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(model);
   models.set(guid, model);
   return model;
}
function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
function FE3sModelDisplay(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   o._model           = null;
   o._material        = null;
   o.construct        = FE3sModelDisplay_construct;
   o.material         = FE3sModelDisplay_material;
   o.calculateOutline = FE3sModelDisplay_calculateOutline;
   o.unserialize      = FE3sModelDisplay_unserialize;
   o.saveConfig       = FE3sModelDisplay_saveConfig;
   return o;
}
function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = RClass.create(FE3sMaterial);
}
function FE3sModelDisplay_material(){
   return this._material;
}
function FE3sModelDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var meshes = o._model.meshes();
      if(meshes){
         outline.setMin();
         var count = meshes.count();
         for(var i = 0; i < count; i++){
            var mesh = meshes.at(i);
            var meshOutline = mesh.calculateOutline();
            outline.mergeMax(meshOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sModelDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, p);
   o._material.unserialize(p);
}
function FE3sModelDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, p);
   o._material.saveConfig(p.create('Material'));
}
function FE3sModelMesh(o){
   o = RClass.inherits(this, o, FE3sGeometry);
   return o;
}
function FE3sModelRenderable(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   o._meshGuid   = null;
   o._mesh       = null;
   o.construct   = FE3sModelRenderable_construct;
   o.meshGuid    = FE3sModelRenderable_meshGuid;
   o.mesh        = FE3sModelRenderable_mesh;
   o.setMesh     = FE3sModelRenderable_setMesh;
   o.unserialize = FE3sModelRenderable_unserialize;
   o.saveConfig  = FE3sModelRenderable_saveConfig;
   return o;
}
function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
function FE3sModelRenderable_meshGuid(){
   return this._meshGuid;
}
function FE3sModelRenderable_mesh(){
   return this._mesh;
}
function FE3sModelRenderable_setMesh(mesh){
   this._mesh = mesh;
}
function FE3sModelRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._meshGuid = input.readString();
}
function FE3sModelRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
   xconfig.set('mesh_guid', o._meshGuid);
}
function FE3sMovie(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FE3sMovie_construct;
   o.interval    = FE3sMovie_interval;
   o.rotation    = FE3sMovie_rotation;
   o.unserialize = FE3sMovie_unserialize;
   return o;
}
function FE3sMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new SVector3();
}
function FE3sMovie_interval(){
   return this._interval;
}
function FE3sMovie_rotation(){
   return this._rotation;
}
function FE3sMovie_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeGuid, MAttributeCode, MAttributeLabel);
   o._typeName   = null;
   o._isClone    = false;
   o.makeLabel   = FE3sObject_makeLabel;
   o.unserialize = FE3sObject_unserialize;
   o.saveConfig  = FE3sObject_saveConfig;
   o.clone       = FE3sObject_clone;
   o.dispose     = FE3sObject_dispose;
   return o;
}
function FE3sObject_makeLabel(){
   var o = this;
   var result = '';
   if(!RString.isEmpty(o._code)){
      result += o._code;
   }
   if(!RString.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}
function FE3sObject_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}
function FE3sObject_saveConfig(xconfig){
   var o = this;
   if(!RString.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
   if(o._isClone){
      xconfig.set('is_clone', 'Y');
   }
}
function FE3sObject_clone(instance){
   var o = this;
   var result = null;
   if(instance){
      result = instance;
   }else{
      result = RClass.create(o.constructor);
   }
   result._isClone = true;
   result._typeName = o._typeName;
   result._guid = o._guid;
   result._code = o._code;
   result._label = o._label;
   return result;
}
function FE3sObject_dispose(){
   var o = this;
   o.__base.MAttributeParent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
function FE3sProjection(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FE3sProjection_angle;
   o.znear       = FE3sProjection_znear;
   o.zfar        = FE3sProjection_zfar;
   o.unserialize = FE3sProjection_unserialize;
   o.saveConfig  = FE3sProjection_saveConfig;
   return o;
}
function FE3sProjection_angle(){
   return this._angle;
}
function FE3sProjection_znear(){
   return this._znear;
}
function FE3sProjection_zfar(){
   return this._zfar;
}
function FE3sProjection_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FE3sProjection_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.setFloat('angle', o._angle);
   xconfig.setFloat('znear', o._znear);
   xconfig.setFloat('zfar', o._zfar);
}
function FE3sRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._optionBackground     = true;
   o._backgroundColor      = null;
   o._moveSpeed            = 0.1;
   o._rotationKeySpeed     = 0.005;
   o._rotationMouseSpeed   = 0.003;
   o._material             = null;
   o._camera               = null;
   o._light                = null;
   o.construct             = FE3sRegion_construct;
   o.optionBackground      = FE3sRegion_optionBackground;
   o.setOptionBackground   = FE3sRegion_setOptionBackground;
   o.backgroundColor       = FE3sRegion_backgroundColor;
   o.moveSpeed             = FE3sRegion_moveSpeed;
   o.setMoveSpeed          = FE3sRegion_setMoveSpeed;
   o.rotationKeySpeed      = FE3sRegion_rotationKeySpeed;
   o.setRotationKeySpeed   = FE3sRegion_setRotationKeySpeed;
   o.rotationMouseSpeed    = FE3sRegion_rotationMouseSpeed;
   o.setRotationMouseSpeed = FE3sRegion_setRotationMouseSpeed;
   o.camera                = FE3sRegion_camera;
   o.light                 = FE3sRegion_light;
   o.unserialize           = FE3sRegion_unserialize;
   o.saveConfig            = FE3sRegion_saveConfig;
   return o;
}
function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new SColor4();
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
   o._light = RClass.create(FE3sLight);
}
function FE3sRegion_optionBackground(){
   return this._optionBackground;
}
function FE3sRegion_setOptionBackground(p){
   this._optionBackground = p;
}
function FE3sRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3sRegion_moveSpeed(){
   return this._moveSpeed;
}
function FE3sRegion_setMoveSpeed(p){
   this._moveSpeed = p;
}
function FE3sRegion_rotationKeySpeed(){
   return this._rotationKeySpeed;
}
function FE3sRegion_setRotationKeySpeed(p){
   this._rotationKeySpeed = p;
}
function FE3sRegion_rotationMouseSpeed(){
   return this._rotationMouseSpeed;
}
function FE3sRegion_setRotationMouseSpeed(p){
   this._rotationMouseSpeed = p;
}
function FE3sRegion_camera(){
   return this._camera;
}
function FE3sRegion_light(){
   return this._light;
}
function FE3sRegion_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._backgroundColor.unserialize(input);
   o._moveSpeed = input.readFloat();
   o._rotationKeySpeed = input.readFloat();
   o._rotationMouseSpeed = input.readFloat();
   o._material.unserialize(input);
   o._camera.unserialize(input);
   o._light.unserialize(input);
}
function FE3sRegion_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('color', o._backgroundColor.toString());
   xconfig.setFloat('move_speed', o._moveSpeed);
   xconfig.setFloat('rotation_key_speed', o._rotationKeySpeed);
   xconfig.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
   o._camera.saveConfig(xconfig.create('Camera'));
}
function FE3sRenderable(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   o._materialRefers   = null;
   o.construct         = FE3sRenderable_construct;
   o.materialRefers    = FE3sRenderable_materialRefers;
   o.syncMaterialRefer = FE3sRenderable_syncMaterialRefer;
   o.pushMaterialRefer = FE3sRenderable_pushMaterialRefer;
   o.unserialize       = FE3sRenderable_unserialize;
   o.saveConfig        = FE3sRenderable_saveConfig;
   o.clone             = FE3sRenderable_clone;
   return o;
}
function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
}
function FE3sRenderable_materialRefers(){
   return this._materialRefers;
}
function FE3sRenderable_syncMaterialRefer(index){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new TObjects();
   }
   for(var i = materialRefers.count(); i <= index; i++){
      materialRefers.push(RClass.create(FE3sMaterialRefer));
   }
   return materialRefers.at(index);
}
function FE3sRenderable_pushMaterialRefer(materialRefer){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new TObjects();
   }
   materialRefers.push(materialRefer);
}
function FE3sRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var count = input.readUint16();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var materialRefer = RClass.create(FE3sMaterialRefer);
         materialRefer.unserialize(input);
         o.pushMaterialRefer(materialRefer);
      }
   }
}
function FE3sRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      var xmaterialRefers = xconfig.create('MaterialReferCollection');
      for(var i = 0; i < count; i++){
         materialRefers.at(i).saveConfig(xmaterialRefers.create('MaterialRefer'));
      }
   }
}
function FE3sRenderable_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = materialRefers.at(i);
         result.pushMaterialRefer(materialRefer.clone());
      }
   }
   return result;
}
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource, MListenerLoad);
   o._dataLoad   = false;
   o._dataReady  = false;
   o._dataSize   = 0;
   o._blockSize  = 0;
   o._blockCount = 0;
   o._vendor     = null;
   o.onComplete  = FE3sResource_onComplete;
   o.makeLabel   = FE3sResource_makeLabel;
   o.vendor      = FE3sResource_vendor;
   o.setVendor   = FE3sResource_setVendor;
   o.testReady   = FE3sResource_testReady;
   o.unserialize = FE3sResource_unserialize;
   o.saveConfig  = FE3sResource_saveConfig;
   o.dispose     = FE3sResource_dispose;
   return o;
}
function FE3sResource_onComplete(input){
   var o = this;
   if(RClass.isClass(input, MDataStream)){
      o.unserialize(input);
   }else{
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      if(input.constructor == Array){
         var inputData = new Uint8Array(input);
         view.link(inputData.buffer);
      }else if(input.constructor == Uint8Array){
         view.link(input.buffer);
      }else{
         view.link(input.outputData());
      }
      o.unserialize(view);
      view.dispose();
   }
   o._dataReady = true;
   o.processLoadListener();
}
function FE3sResource_makeLabel(){
   var o = this;
   var result = '';
   if(!RString.isEmpty(o._code)){
      result += o._code;
   }
   if(!RString.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}
function FE3sResource_vendor(){
   return this._vendor;
}
function FE3sResource_setVendor(p){
   this._vendor = p;
}
function FE3sResource_testReady(){
   return this._dataReady;
}
function FE3sResource_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}
function FE3sResource_saveConfig(xconfig){
   var o = this;
   if(!RString.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
}
function FE3sResource_dispose(){
   var o = this;
   o._vendor = null;
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FConsole.dispose.call(o);
}
function FE3sResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._factory            = null;
   o.construct           = FE3sResourceConsole_construct;
   o.factory             = FE3sResourceConsole_factory;
   o.create              = FE3sResourceConsole_create;
   o.unserializeResource = FE3sResourceConsole_unserializeResource;
   o.unserialize         = FE3sResourceConsole_unserialize;
   return o;
}
function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register('Shape', FE3sShape);
   factory.register('Sprite', FE3sSprite);
   factory.register('ModelMesh', FE3sModelMesh);
   factory.register('ModelRenderable', FE3sModelRenderable);
}
function FE3sResourceConsole_factory(){
   return this._factory;
}
function FE3sResourceConsole_create(typeName){
   return this._factory.create(typeName);
}
function FE3sResourceConsole_unserializeResource(resource, input){
   var o = this;
   resource.unserialize(input);
}
function FE3sResourceConsole_unserialize(input){
   var o = this;
   var typeName = input.testString();
   var resource = o._factory.create(typeName);
   resource.unserialize(input);
   return resource;
}
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._typeName     = 'Scene';
   o._dataCompress = true;
   o._templates    = null;
   o.construct     = FE3sScene_construct;
   o.unserialize   = FE3sScene_unserialize;
   o.saveConfig    = FE3sScene_saveConfig;
   return o;
}
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
}
function FE3sScene_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var templateCount = input.readInt16();
   if(templateCount > 0){
      var templateConsole = RConsole.find(FE3sTemplateConsole);
      var templates = o._templates = new TDictionary();
      for(var i = 0; i < templateCount; i++){
         var template = templateConsole.unserialize(p);
         templates.set(ttemplate.guid(), template);
      }
   }
}
function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, p);
}
function FE3sSceneAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._playRate   = 1;
   o.construct   = FE3sSceneAnimation_construct;
   o.playRate    = FE3sSceneAnimation_playRate;
   o.setPlayRate = FE3sSceneAnimation_setPlayRate;
   o.unserialize = FE3sSceneAnimation_unserialize;
   o.saveConfig  = FE3sSceneAnimation_saveConfig;
   return o;
}
function FE3sSceneAnimation_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
}
function FE3sSceneAnimation_playRate(){
   return this._playRate;
}
function FE3sSceneAnimation_setPlayRate(playRate){
   this._playRate = playRate;
}
function FE3sSceneAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._playRate = p.readFloat();
}
function FE3sSceneAnimation_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('play_rate', o._playRate);
}
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   o._scenes     = null;
   o.construct   = FE3sSceneConsole_construct;
   o.loadByGuid  = FE3sSceneConsole_loadByGuid;
   o.loadByCode  = FE3sSceneConsole_loadByCode;
   return o;
}
function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var scenes = o._scenes;
   var scene = scenes.get(guid);
   if(scene){
      return scene;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   scene = RClass.create(FE3sScene);
   scene.setGuid(guid);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(scene);
   scenes.set(guid, scene);
   return scene;
}
function FE3sSceneConsole_loadByCode(code){
   var o = this;
   var scenes = o._scenes;
   var scene = scenes.get(code);
   if(scene){
      return scene;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
   vendor.set('code', code);
   var url = vendor.makeUrl();
   scene = RClass.create(FE3sScene);
   scene.setCode(code);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(scene);
   scenes.set(code, scene);
   return scene;
}
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sSprite);
   o._templateGuid        = null;
   o._animations          = null;
   o._movies              = null;
   o._renderables         = null;
   o.construct            = FE3sSceneDisplay_construct;
   o.templateGuid         = FE3sSceneDisplay_templateGuid;
   o.findAnimation        = FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
   o.animations           = FE3sSceneDisplay_animations;
   o.movies               = FE3sSceneDisplay_movies;
   o.renderables          = FE3sSceneDisplay_renderables;
   o.unserialize          = FE3sSceneDisplay_unserialize;
   o.saveConfig           = FE3sSceneDisplay_saveConfig;
   o.clone                = FE3sSceneDisplay_clone;
   return o;
}
function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sSprite.construct.call(o);
}
function FE3sSceneDisplay_templateGuid(){
   return this._templateGuid;
}
function FE3sSceneDisplay_findAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(animations){
      return animations.get(guid);
   }
   return null;
}
function FE3sSceneDisplay_syncAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new TDictionary();
   }
   var animation = animations.get(guid);
   if(!animation){
      animation = RClass.create(FE3sSceneAnimation);
      animation._guid = guid;
      animations.set(guid, animation);
   }
   return animation;
}
function FE3sSceneDisplay_animations(){
   return this._animations;
}
function FE3sSceneDisplay_movies(){
   return this._movies;
}
function FE3sSceneDisplay_renderables(){
   return this._renderables;
}
function FE3sSceneDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sSprite.unserialize.call(o, input);
   o._templateGuid = input.readString();
   var animationCount = input.readUint16();
   if(animationCount > 0){
      var animations = o._animations = new TDictionary();
      for(var i = 0; i < animationCount; i++){
         var animation = RClass.create(FE3sSceneAnimation);
         animation.unserialize(input);
         animations.set(animation.guid(), animation);
      }
   }
   var movieCount = input.readUint16();
   if(movieCount > 0){
      var movies = o._movies = new TObjects();
      for(var i = 0; i < movieCount; i++){
         var movie = RClass.create(FE3sMovie);
         movie.unserialize(input);
         movies.push(movie);
      }
   }
}
function FE3sSceneDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSprite.saveConfig.call(o, xconfig);
   xconfig.set('template_guid', o._templateGuid);
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      var xanimations = xconfig.create('AnimationCollection');
      for(var i = 0; i < count; i++){
         animations.at(i).saveConfig(xanimations.create('Animation'));
      }
   }
}
function FE3sSceneDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sSprite.clone.call(o, instance);
   result._templateGuid = o._templateGuid;
   return result;
}
function FE3sSceneLayer(o){
   o = RClass.inherits(this, o, FE3sDisplayLayer);
   return o;
}
function FE3sSceneRenderable(o){
   o = RClass.inherits(this, o, FE3sObject);
   o.unserialize = FE3sSceneRenderable_unserialize;
   return o;
}
function FE3sSceneRenderable_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
}
function FE3sShape(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   o._modelGuid    = null;
   o._model        = null;
   o._meshGuid     = null;
   o._mesh         = null;
   o._materialGuid = null;
   o._material     = null;
   o.construct     = FE3sShape_construct;
   o.modelGuid     = FE3sShape_modelGuid;
   o.model         = FE3sShape_model;
   o.meshGuid      = FE3sShape_meshGuid;
   o.mesh          = FE3sShape_mesh;
   o.materialGuid  = FE3sShape_materialGuid;
   o.material      = FE3sShape_material;
   o.unserialize   = FE3sShape_unserialize;
   return o;
}
function FE3sShape_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
function FE3sShape_modelGuid(){
   return this._modelGuid;
}
function FE3sShape_model(){
   var o = this;
   var model = o._model;
   if(!model){
      model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
   }
   return model;
}
function FE3sShape_meshGuid(){
   return this._meshGuid;
}
function FE3sShape_mesh(){
   var o = this;
   var mesh = o._mesh;
   if(!mesh){
      mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
   }
   return mesh;
}
function FE3sShape_materialGuid(){
   return this._materialGuid;
}
function FE3sShape_material(){
   var o = this;
   var material = o._material;
   if(!material){
      material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
   }
   return material;
}
function FE3sShape_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._modelGuid = input.readString();
   o._meshGuid = input.readString();
   o._materialGuid = input.readString();
}
function FE3sSkeleton(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   o.findBone      = FE3sSkeleton_findBone;
   o.bones         = FE3sSkeleton_bones;
   o.roots         = FE3sSkeleton_roots;
   o.skins         = FE3sSkeleton_skins;
   o.animations    = FE3sSkeleton_animations;
   o.pushAnimation = FE3sSkeleton_pushAnimation;
   o.innerFilter   = FE3sSkeleton_innerFilter;
   o.unserialize   = FE3sSkeleton_unserialize;
   return o;
}
function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}
function FE3sSkeleton_bones(){
   return this._bones;
}
function FE3sSkeleton_roots(){
   return this._roots;
}
function FE3sSkeleton_skins(){
   return this._skins;
}
function FE3sSkeleton_animations(){
   return this._animations;
}
function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}
function FE3sSkeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.index(), p);
   var bs = p.bones();
   if(bs){
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         o.innerFilter(b)
      }
   }
}
function FE3sSkeleton_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var s = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
function FE3sSkeletonSkin(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   o.meshGuid    = FE3sSkeletonSkin_meshGuid;
   o.find        = FE3sSkeletonSkin_find;
   o.streams     = FE3sSkeletonSkin_streams;
   o.boneRefers  = FE3sSkeletonSkin_boneRefers;
   o.unserialize = FE3sSkeletonSkin_unserialize;
   return o;
}
function FE3sSkeletonSkin_meshGuid(){
   return this._meshGuid;
}
function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}
function FE3sSkeletonSkin_streams(){
   return this._streams;
}
function FE3sSkeletonSkin_boneRefers(){
   return this._boneRefers;
}
function FE3sSkeletonSkin_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._meshGuid = input.readString();
   var streamCount = input.readUint8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(input);
         streams.push(stream);
      }
   }
   var boneReferCount = input.readUint8();
   if(boneReferCount > 0){
      var boneRefers = o._boneRefers = new TObjects();
      for(var i = 0; i < boneReferCount; i++){
         var boneRefer = RClass.create(FE3sBoneRefer);
         boneRefer.unserialize(input);
         boneRefers.push(boneRefer);
      }
   }
}
function FE3sSpace(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._typeName   = null;
   o._technique  = null;
   o._region     = null;
   o._materials  = null;
   o._displays   = null;
   o._layers     = null;
   o.construct   = FE3sSpace_construct;
   o.technique   = FE3sSpace_technique;
   o.region      = FE3sSpace_region;
   o.materials   = FE3sSpace_materials;
   o.displays    = FE3sSpace_displays;
   o.layers      = FE3sSpace_layers;
   o.unserialize = FE3sSpace_unserialize;
   o.saveConfig  = FE3sSpace_saveConfig;
   return o;
}
function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sTechnique);
   o._region = RClass.create(FE3sRegion);
}
function FE3sSpace_technique(){
   return this._technique;
}
function FE3sSpace_region(){
   return this._region;
}
function FE3sSpace_materials(){
   return this._materials;
}
function FE3sSpace_displays(){
   return this._displays;
}
function FE3sSpace_layers(){
   return this._layers;
}
function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   var materialConsole = RConsole.find(FE3sMaterialConsole);
   o._technique.unserialize(input);
   o._region.unserialize(input);
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = RClass.create(FE3sDisplayLayer);
         layer.unserialize(input);
         layers.set(layer.code(), layer);
      }
   }
}
function FE3sSpace_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
   o._technique.saveConfig(p.create('Technique'));
   o._region.saveConfig(p.create('Region'));
   var materials = o._materials;
   if(materials){
      var xmaterials = p.create('MaterialCollection');
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         material.saveConfig(xmaterials.create('Material'));
      }
   }
   var displays = o._displays;
   if(displays){
      var xdisplays = p.create('DisplayCollection');
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
      }
   }
   var layers = o._layers;
   if(layers){
      var xlayers = p.create('LayerCollection');
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.valueAt(i);
         layer.saveConfig(xlayers.create('Layer'));
      }
   }
}
function FE3sSprite(o){
   o = RClass.inherits(this, o, FE3sDisplayContainer);
   o._materials   = null;
   o.construct    = FE3sSprite_construct;
   o.materials    = FE3sSprite_materials;
   o.pushMaterial = FE3sSprite_pushMaterial;
   o.unserialize  = FE3sSprite_unserialize;
   o.saveConfig   = FE3sSprite_saveConfig;
   o.clone        = FE3sSprite_clone;
   return o;
}
function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}
function FE3sSprite_materials(){
   return this._materials;
}
function FE3sSprite_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new TDictionary();
   }
   materials.set(material.guid(), material);
}
function FE3sSprite_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = RConsole.find(FE3sMaterialConsole);
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         o.pushMaterial(material);
      }
   }
}
function FE3sSprite_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      var xmaterials = xconfig.create('MaterialCollection');
      for(var i = 0; i < count; i++){
         materials.at(i).saveConfig(xmaterials.create('Material'));
      }
   }
}
function FE3sSprite_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplayContainer.clone.call(o, instance);
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      for(var i = 0; i < count; i++){
         var material = materials.at(i);
         result.pushMaterial(material.clone());
      }
   }
   return result;
}
function FE3sStream(o){
   o = RClass.inherits(this, o, FObject);
   o._code             = null;
   o._elementDataCd    = 0;
   o._elementCount     = 0;
   o._elementNormalize = false;
   o._dataStride       = 0;
   o._dataCount        = 0;
   o._dataLength       = 0;
   o._data             = null;
   o._formatCd         = EG3dAttributeFormat.Unknown;
   o.code              = FE3sStream_code;
   o.elementDataCd     = FE3sStream_elementDataCd;
   o.formatCd          = FE3sStream_formatCd;
   o.dataStride        = FE3sStream_dataStride;
   o.dataCount         = FE3sStream_dataCount;
   o.data              = FE3sStream_data;
   o.unserialize       = FE3sStream_unserialize;
   o.dispose           = FE3sStream_dispose;
   return o;
}
function FE3sStream_code(){
   return this._code;
}
function FE3sStream_elementDataCd(){
   return this._elementDataCd;
}
function FE3sStream_formatCd(){
   return this._formatCd;
}
function FE3sStream_dataStride(){
   return this._dataStride;
}
function FE3sStream_dataCount(){
   return this._dataCount;
}
function FE3sStream_data(){
   return this._data;
}
function FE3sStream_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._elementDataCd = input.readUint8();
   o._elementCount = input.readUint8();
   o._elementNormalize = input.readBoolean();
   var dataStride = o._dataStride = input.readUint8();
   var dataCount = o._dataCount = input.readInt32();
   var dataLength = o._dataLength = dataStride * dataCount;
   var data = o._data = new ArrayBuffer(dataLength);
   input.readBytes(data, 0, dataLength);
}
function FE3sStream_dispose(){
   var o = this;
   o.data = null;
   o.__base.FObject.dispose.call(o);
}
function FE3sTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._techniqueCode = null;
   o._passes        = null;
   o.passes         = FE3sTechnique_passes;
   o.unserialize    = FE3sTechnique_unserialize;
   o.saveConfig     = FE3sTechnique_saveConfig;
   return o;
}
function FE3sTechnique_passes(){
   return this._passes;
}
function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = RClass.create(FE3sTechniquePass);
         pass.unserialize(input);
         passes.push(pass);
      }
   }
}
function FE3sTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('technique_code', o._techniqueCode);
}
function FE3sTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FE3sTechniquePass_targetWidth;
   o.targetHeight  = FE3sTechniquePass_targetHeight;
   o.unserialize   = FE3sTechniquePass_unserialize;
   return o;
}
function FE3sTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FE3sTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
function FE3sTemplate(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._typeName     = 'Template';
   o._dataCompress = true;
   return o;
}
function FE3sTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o.construct   = FE3sTemplateConsole_construct;
   o.unserialize = FE3sTemplateConsole_unserialize;
   o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = FE3sTemplateConsole_loadByCode;
   o.update      = FE3sTemplateConsole_update;
   return o;
}
function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FE3sTemplateConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sTemplate);
   r._dataReady = true;
   r.unserialize(p);
   o._templates.set(r.guid(), r);
   return r;
}
function FE3sTemplateConsole_loadByGuid(guid){
   var o = this;
   var templates = o._templates;
   var template = templates.get(guid);
   if(template){
      return template;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find('template');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   template = RClass.create(FE3sTemplate);
   template.setGuid(guid);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(template);
   templates.set(guid, template);
   return template;
}
function FE3sTemplateConsole_loadByCode(code){
   var o = this;
   var templates = o._templates;
   var template = templates.get(code);
   if(template){
      return template;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find('template');
   vendor.set('code', code);
   var url = vendor.makeUrl();
   template = RClass.create(FE3sTemplate);
   template.setCode(code);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(template);
   templates.set(code, template);
   return template;
}
function FE3sTemplateConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   RConsole.find(FXmlConsole).send(u, p);
}
function FE3sTemplateTheme(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._materials   = null;
   o.findMaterial = FE3sTemplateTheme_findMaterial;
   o.materials    = FE3sTemplateTheme_materials;
   o.unserialize  = FE3sTemplateTheme_unserialize;
   return o;
}
function FE3sTemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
function FE3sTemplateTheme_materials(){
   return this._materials;
}
function FE3sTemplateTheme_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = RConsole.find(FE3sMaterialConsole);
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
function FE3sTexture(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._dataCompress = true;
   o._bitmaps      = null;
   o._bitmapPacks  = null;
   o.construct     = FE3sTexture_construct;
   o.bitmaps       = FE3sTexture_bitmaps;
   o.bitmapPacks   = FE3sTexture_bitmapPacks;
   o.unserialize   = FE3sTexture_unserialize;
   o.dispose       = FE3sTexture_dispose;
   return o;
}
function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}
function FE3sTexture_bitmaps(){
   return this._bitmaps;
}
function FE3sTexture_bitmapPacks(){
   return this._bitmapPacks;
}
function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmapPack);
         b._texture = o;
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}
function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = RObject.free(o._bitmaps);
   o._bitmapPacks = RObject.free(o._bitmapPacks);
   o.__base.FE3sResource.dispose.call(o);
}
function FE3sTextureBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._packCode   = null;
   o.packCode    = FE3sTextureBitmap_packCode;
   o.unserialize = FE3sTextureBitmap_unserialize;
   return o;
}
function FE3sTextureBitmap_packCode(){
   return this._packCode;
}
function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._packCode = p.readString();
}
function FE3sTextureBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._optionCompress = null;
   o._size           = null;
   o._data           = null;
   o._typeName       = null;
   o._formatName     = null;
   o.construct       = FE3sTextureBitmapPack_construct;
   o.optionCompress  = FE3sTextureBitmapPack_optionCompress;
   o.size            = FE3sTextureBitmapPack_size;
   o.data            = FE3sTextureBitmapPack_data;
   o.unserialize     = FE3sTextureBitmapPack_unserialize;
   o.dispose         = FE3sTextureBitmapPack_dispose;
   return o;
}
function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}
function FE3sTextureBitmapPack_optionCompress(){
   return this._optionCompress;
}
function FE3sTextureBitmapPack_size(){
   return this._size;
}
function FE3sTextureBitmapPack_data(){
   return this._data;
}
function FE3sTextureBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._formatName = p.readString();
   o._size.width = p.readUint16();
   o._size.height = p.readUint16();
   if(o._typeName == 'flat'){
      var c = p.readInt32();
   }else if(o._typeName == 'cube'){
      o._data = new Array();
      for(var i = 0; i < 6; i++){
         var c = p.readInt32();
         var d = o._data[i] = new ArrayBuffer(c);
         p.readBytes(d, 0, c);
      }
   }else{
      throw new TError(o, 'Unserial texture failure ');
   }
}
function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   o.__base.FE3sObject.dispose.call(o);
}
function FE3sTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._textures   = null;
   o.construct   = FE3sTextureConsole_construct;
   o.unserialize = FE3sTextureConsole_unserialize;
   o.load        = FE3sTextureConsole_load;
   o.loadBitmap  = FE3sTextureConsole_loadBitmap;
   o.dispose     = FE3sModelConsole_dispose;
   return o;
}
function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new TDictionary();
}
function FE3sTextureConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sTexture);
   r._dataReady = true;
   r.unserialize(p);
   o._textures.set(r.guid(), r);
   return r;
}
function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   r = RClass.create(FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
   return g;
}
function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = RObject.free(o._textures);
   o.__base.FConsole.dispose.call(o);
}
function FE3sTheme(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._materials  = null;
   o.materials   = FE3sTheme_materials;
   o.find        = FE3sTheme_find;
   o.unserialize = FE3sTheme_unserialize;
   return o;
}
function FE3sTheme_materials(){
   return this._materials;
}
function FE3sTheme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}
function FE3sTheme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FE3sMaterial);
         m.unserialize(p);
         s.set(m.code(), m);
      }
   }
}
function FE3sThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   o.construct    = FE3sThemeConsole_construct;
   o.activeTheme  = FE3sThemeConsole_activeTheme;
   o.find         = FE3sThemeConsole_find;
   o.select       = FE3sThemeConsole_select;
   return o;
}
function FE3sThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FE3sThemeConsole_activeTheme(){
   return this._activeTheme;
}
function FE3sThemeConsole_find(p){
   var t = this._activeTheme;
   if(t == null){
      throw new TError('Active theme is empty.');
   }
   return t.find(p);
}
function FE3sThemeConsole_select(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FE3sTheme);
      r.load(u);
      o._themes.set(p, r);
   }
   o._activeTheme = r;
   return r;
}
function FE3sTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._meshCode     = null;
   o._boneIndex    = 0;
   o._frameTick    = 0;
   o._matrix       = null;
   o._matrixInvert = null;
   o._frameCount   = null;
   o._frames       = null;
   o.construct     = FE3sTrack_construct;
   o.boneIndex     = FE3sTrack_boneIndex;
   o.frameTick     = FE3sTrack_frameTick;
   o.matrix        = FE3sTrack_matrix;
   o.matrixInvert  = FE3sTrack_matrixInvert;
   o.frames        = FE3sTrack_frames;
   o.calculate     = FE3sTrack_calculate;
   o.unserialize   = FE3sTrack_unserialize;
   return o;
}
function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FE3sTrack_boneIndex(){
   return this._boneIndex;
}
function FE3sTrack_frameTick(){
   return this._frameTick;
}
function FE3sTrack_matrix(){
   return this._matrix;
}
function FE3sTrack_matrixInvert(){
   return this._matrixInvert;
}
function FE3sTrack_frames(){
   return this._frames;
}
function FE3sTrack_calculate(info, tick){
   var o = this;
   var frameCount = info.frameCount;
   if(frameCount == 0){
      throw new TError('Frame count is invalid.');
   }
   var beginIndex = info.beginIndex;
   var frameTick = o._frameTick;
   var index = parseInt(tick / frameTick) % frameCount;
   var frames = o._frames;
   var currentFrame = frames.get(beginIndex + index);
   var nextFrame = null;
   if(index < frameCount - 1){
      nextFrame = frames.get(beginIndex + index + 1);
   }else{
      nextFrame = frames.get(beginIndex);
   }
   info.tick = tick;
   info.rate = (tick % frameTick) / frameTick;
   info.currentFrame = currentFrame;
   info.nextFrame = nextFrame;
   return true;
}
function FE3sTrack_unserialize(input){
   var o = this;
   o._meshCode = input.readString();
   o._boneIndex = input.readUint16();
   o._frameTick = input.readUint16();
   o._matrix.unserialize(input);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   o._frameCount = input.readInt16();
   o._frames = new TObjects();
}
function FE3sVendor(o){
   o = RClass.inherits(this, o, FObject);
   o._contentUrl   = null;
   o._parameters   = null;
   o.construct     = FE3sVendor_construct;
   o.contentUrl    = FE3sVendor_contentUrl;
   o.setContentUrl = FE3sVendor_setContentUrl;
   o.get           = FE3sVendor_get;
   o.set           = FE3sVendor_set;
   o.makeSource    = RMethod.virtual(o, 'makeSource');
   o.makeUrl       = FE3sVendor_makeUrl;
   o.reset         = FE3sVendor_reset;
   o.dispose       = FE3sVendor_dispose;
   return o;
}
function FE3sVendor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._parameters = new TAttributes();
}
function FE3sVendor_contentUrl(p){
   return this._contentUrl;
}
function FE3sVendor_setContentUrl(p){
   this._contentUrl = p;
}
function FE3sVendor_get(n){
   return this._parameters.get(n);
}
function FE3sVendor_set(n, v){
   this._parameters.set(n, v);
}
function FE3sVendor_makeUrl(){
   var o = this;
   var r = o.makeSource();
   if(RRuntime.isDebug()){
      if(r.indexOf('?') == -1){
         r += '?';
      }else{
         r += '&';
      }
      r += 'date=' + RDate.format();
   }
   return r;
}
function FE3sVendor_reset(){
   this._parameters.clear();
}
function FE3sVendor_dispose(){
   var o = this;
   o._parameters = RObject.dispose(o._parameters);
   o.__base.FObject.dispose.call(o);
}
function FE3sVendorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._setuped     = false;
   o._vendors     = null;
   o.construct    = FE3sVendorConsole_construct;
   o.createVendor = FE3sVendorConsole_createVendor;
   o.register     = FE3sVendorConsole_register;
   o.find         = FE3sVendorConsole_find;
   o.setup        = FE3sVendorConsole_setup;
   return o;
}
function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._vendors = new TDictionary();
}
function FE3sVendorConsole_createVendor(c, u){
   var v = RClass.create(c);
   v.setContentUrl(u);
   return v;
}
function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}
function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   var v = o._vendors.get(p);
   v.reset();
   return v;
}
function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
      o._vendors.set('material', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
      o._vendors.set('mesh', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
      o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
      o._vendors.set('material', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/material/{guid}.bin')));
      o._vendors.set('mesh', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
      o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
function FE3sVendorLocal(o){
   o = RClass.inherits(this, o, FE3sVendor);
   o.makeSource = FE3sVendorLocal_makeSource;
   return o;
}
function FE3sVendorLocal_makeSource(){
   var o = this;
   var u = o._contentUrl;
   var s = o._parameters;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      u = RString.replace(u, '{' + n + '}', v);
   }
   return u;
}
function FE3sVendorNet(o){
   o = RClass.inherits(this, o, FE3sVendor);
   o.makeSource = FE3sVendorNet_makeSource;
   return o;
}
function FE3sVendorNet_makeSource(){
   var o = this;
   var url = o._contentUrl;
   if(url.indexOf('?') == -1){
      url += '?';
   }else{
      url += '&';
   }
   var parameters = o._parameters;
   var count = parameters.count();
   var first = false;
   for(var i = 0; i < count; i++){
      var name = parameters.name(i);
      var value = parameters.value(i);
      if(!RString.isEmpty(value)){
         if(first){
            url += '&';
         }else{
            first = true;
         }
         url += name + '=' + value;
      }
   }
   return url;
}
function SE3rPlayInfo(o){
   if(!o){o = this;}
   o.tick         = 0;
   o.playRate     = 1.0;
   o.beginIndex   = 0;
   o.endIndex     = 0;
   o.frameCount   = 0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   o.update       = SE3rPlayInfo_update;
   return o;
}
function SE3rPlayInfo_update(){
   var o = this;
   var currentFrame = o.currentFrame;
   if(!currentFrame){
      return false;
   }
   var nextFrame = o.nextFrame;
   if(!nextFrame){
      return false;
   }
   var matrix = o.matrix;
   var currentTranslation = currentFrame.translation();
   var currentQuaternion = currentFrame.quaternion();
   var currentScale = currentFrame.scale();
   var rate = o.rate;
   if((rate > 0) && (rate < 1)){
      o.translation.slerp(currentTranslation, nextFrame.translation(), rate);
      o.quaternion.slerp(currentQuaternion, nextFrame.quaternion(), rate);
      o.scale.slerp(currentScale, nextFrame.scale(), rate);
      matrix.build(o.translation, o.quaternion, o.scale);
   }else{
      matrix.build(currentTranslation, currentQuaternion, currentScale);
   }
   return true;
}
function FE3rAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FE3rAnimation_construct;
   o.findTrack    = FE3rAnimation_findTrack;
   o.tracks       = FE3rAnimation_tracks;
   o.resource     = FE3rAnimation_resource;
   o.loadResource = FE3rAnimation_loadResource;
   o.record       = FE3rAnimation_record;
   o.process      = RMethod.virtual(o, 'process');
   o.dispose      = FE3rAnimation_dispose;
   return o;
}
function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new SE3rPlayInfo();
}
function FE3rAnimation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneIndex() == p){
         return t;
      }
   }
   return null;
}
function FE3rAnimation_tracks(){
   return this._tracks;
}
function FE3rAnimation_resource(){
   return this._resource;
}
function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   o._resource = resource;
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = RClass.create(FE3rTrack);
         track._animation = o;
         track.loadResource(trackResource);
         tracks.push(track);
      }
   }
   if(frameCount > 0){
      var info = o._playInfo;
      info.beginIndex = 0;
      info.endIndex = (frameCount > 0) ? frameCount - 1 : 0;
      info.frameCount = frameCount;
      o._valid = true;
   }
}
function FE3rAnimation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
}
function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rBitmap(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._pack        = null;
   o.construct    = FE3rBitmap_construct;
   o.testReady    = FE3rBitmap_testReady;
   o.texture      = FE3rBitmap_texture;
   o.loadResource = FE3rBitmap_loadResource;
   o.dispose      = FE3rBitmap_dispose;
   return o;
}
function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
}
function FE3rBitmap_testReady(){
   return this._pack.testReady();
}
function FE3rBitmap_texture(){
   return this._pack.texture();
}
function FE3rBitmap_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._guid = resource.guid();
   o._code = resource.code();
}
function FE3rBitmap_dispose(){
   var o = this;
   o.__base.FE3rObject.dispose.call(o);
}
function FE3rBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.resource.material.wv'
   o.construct = FE3rBitmapConsole_construct;
   o.bitmaps   = FE3rBitmapConsole_bitmaps;
   o.load      = FE3rBitmapConsole_load;
   o.loadUrl   = FE3rBitmapConsole_loadUrl;
   return o;
}
function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rBitmapConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rBitmapConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   RLogger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = RClass.create(FE3rBitmapCubePack);
   }else{
      bitmap = RClass.create(FE3rBitmapFlatPack);
   }
   bitmap.linkGraphicContext(context);
   bitmap.loadUrl(url);
   o._bitmaps.set(flag, bitmap);
   return bitmap;
}
function FE3rBitmapConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = RBrowser.contentPath(url);
   RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = RClass.create(FE3rBitmap);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
function FE3rBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = FE3rBitmapCubePack_onLoad;
   o.construct    = FE3rBitmapCubePack_construct;
   o.loadUrl      = FE3rBitmapCubePack_loadUrl;
   o.dispose      = FE3rBitmapCubePack_dispose;
   return o;
}
function FE3rBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   var capability = RBrowser.capability();
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   if(capability.blobCreate){
      for(var i = 0; i < 6; i++){
         var m = is[i];
         window.URL.revokeObjectURL(m.url());
         is[i] = RObject.dispose(m);
      }
   }
   o._images = RObject.dispose(o._images);
   o._dataReady = true;
}
function FE3rBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
function FE3rBitmapCubePack_loadUrl(url){
   var o = this;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var image = o._images[i] = RClass.create(FImage);
      image._index = i;
      image.setOptionAlpha(false);
      image.loadUrl(url + "&index=" + i);
      image.addLoadListener(o, o.onLoad);
   }
}
function FE3rBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
function FE3rBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = FE3rBitmapFlatPack_onLoad;
   o.construct    = FE3rBitmapFlatPack_construct;
   o.loadUrl      = FE3rBitmapFlatPack_loadUrl;
   o.dispose      = FE3rBitmapFlatPack_dispose;
   return o;
}
function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   var context = o._graphicContext;
   var texture = o._texture = context.createFlatTexture();
   texture.upload(o._image);
   texture.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._dataReady = true;
}
function FE3rBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
function FE3rBitmapFlatPack_loadUrl(url){
   var o = this;
   var image = o._image = RClass.create(FImage);
   image.addLoadListener(o, o.onLoad);
   image.loadUrl(url);
}
function FE3rBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
function FE3rBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   o.construct    = FE3rBitmapPack_construct;
   o.texture      = FE3rBitmapPack_texture;
   o.testReady    = FE3rBitmapPack_testReady;
   o.loadUrl      = RMethod.virtual(o, 'loadUrl');
   o.dispose      = FE3rBitmapPack_dispose;
   return o;
}
function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rBitmapPack_texture(){
   return this._texture;
}
function FE3rBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
function FE3rBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
function FE3rBone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   o.construct      = FE3rBone_construct;
   o.matrix         = FE3rBone_matrix;
   o.trackResource  = FE3rBone_trackResource;
   o.loadResource   = FE3rBone_loadResource;
   o.update         = FE3rBone_update;
   o.dispose        = FE3rBone_dispose;
   return o;
}
function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rBone_matrix(){
   return this._matrix;
}
function FE3rBone_trackResource(){
   return this._trackResource;
}
function FE3rBone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}
function FE3rBone_update(info, tick){
   var o = this;
   var resource = o._trackResource;
   resource.calculate(info, tick);
   info.update();
   var matrix = o._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(info.matrix);
}
function FE3rBone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FE3rDynamicMesh(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._model            = null;
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = FE3rDynamicMesh_construct;
   o.mergeCount        = FE3rDynamicMesh_mergeCount;
   o.mergeMaxCount     = FE3rDynamicMesh_mergeMaxCount;
   o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = FE3rDynamicMesh_build;
   return o;
}
function FE3rDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new TObjects();
}
function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
function FE3rDynamicMesh_mergeMaxCount(){
   return this._model._mergeMaxCount;
}
function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}
function FE3rDynamicMesh_syncVertexBuffer(p){
   var o = this;
   var r = p._resource;
   var rc = r._code;
   var b = o._vertexBuffers.get(rc);
   if(!b){
      var vt = o._vertexTotal;
      b = o._graphicContext.createVertexBuffer();
      b._name = rc;
      b._formatCd = p._formatCd;
      b._stride = p._stride;
      switch(p._formatCd){
         case EG3dAttributeFormat.Float2:
            b._data = new Float32Array(2 * vt);
            break;
         case EG3dAttributeFormat.Float3:
            b._data = new Float32Array(3 * vt);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            b._data = new Uint8Array(4 * vt);
            break;
         default:
            throw new TError("Unknown code");
      }
      o._vertexBuffers.set(rc, b);
   }
   return b;
}
function FE3rDynamicMesh_mergeRenderable(p){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var vc = p.vertexCount();
   var ic = p.indexBuffer().count();
   var mc = cp.mergeCount;
   if(o._mergeRenderables.count() >= mc){
      return false;
   }
   var vt = o._vertexTotal + vc;
   if(cp.optionIndex32){
      if(vt > RInteger.MAX_UINT32){
         return false;
      }
   }else{
      if(vt > RInteger.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vc;
   o._indexTotal += ic;
   o._mergeRenderables.push(p);
   return true;
}
function FE3rDynamicMesh_mergeVertexBuffer(r, bc, b, rs){
   var o = this;
   var vp = o._vertexPosition;
   var vd = b._data;
   var c = rs._dataCount;
   switch(bc){
      case 'position':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 3 * vp, d, 0, 3 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 2 * vp, d, 0, 2 * c);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(rs._data);
         RByte.copy(vd, 4 * vp, d, 0, 4 * c);
         break;
      default:
         throw new TError("Unknown code");
   }
}
function FE3rDynamicMesh_mergeIndexBuffer(ir){
   var o = this;
   var vp = o._vertexPosition;
   var ip = o._indexPosition;
   var id = o._indexBuffer._data;
   var rd = new Uint16Array(ir._data);
   var rc = 3 * ir._dataCount;
   for(var i = 0; i < rc; i++){
      id[ip++] = vp + rd[i]
   }
}
function FE3rDynamicMesh_build(){
   var o = this;
   var gc = o._graphicContext;
   var gp = gc.capability();
   var vt = o._vertexTotal;
   var ft = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   var b = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   b._name = 'instance';
   b._stride = 4;
   b._formatCd = EG3dAttributeFormat.Float1;
   var vdi = b._data = new Float32Array(vt);
   o._vertexBuffers.set(b._name, b);
   var b = o._indexBuffer = gc.createIndexBuffer();
   if(gp.optionIndex32){
      b._strideCd = EG3dIndexStride.Uint32;
      b._data = new Uint32Array(ft);
   }else{
      b._strideCd = EG3dIndexStride.Uint16;
      b._data = new Uint16Array(ft);
   }
   b._count = ft;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      var vc = r.vertexCount();
      var vbs = r.vertexBuffers();
      var vbc = vbs.count();
      for(var vbi = 0; vbi < vbc; vbi++){
         var vb = vbs.valueAt(vbi);
         var vbr = vb._resource;
         var vbrc = vbr._code
         var b = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(r, vbrc, b, vbr);
      }
      RFloat.fill(vdi, o._vertexPosition, vc, i);
      var ib = r.indexBuffer();
      var ic = ib.count();
      var ir = ib._resource;
      o.mergeIndexBuffer(ir);
      o._vertexPosition += vc;
      o._indexPosition += ic;
   }
   var vbs = o._vertexBuffers;
   var vbc = vbs.count();
   for(var vbi = 0; vbi < vbc; vbi++){
      var vb = vbs.valueAt(vbi);
      vb.upload(vb._data, vb._stride, vt);
      vb._data = null;
   }
   o._indexBuffer.upload(o._indexBuffer._data, ft);
   o._indexBuffer._data = null;
}
function FE3rDynamicModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._renderables      = null;
   o._mergeMaxCount    = 0;
   o._meshes           = null;
   o._updateDate       = 0;
   o.construct         = FE3rDynamicModel_construct;
   o.createMesh        = FE3rDynamicModel_createMesh;
   o.renderables       = FE3rDynamicModel_renderables;
   o.meshes            = FE3rDynamicModel_meshes;
   o.pushRenderable    = FE3rDynamicModel_pushRenderable;
   o.build             = FE3rDynamicModel_build;
   o.update            = FE3rDynamicModel_update;
   return o;
}
function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new TObjects();
   o._meshes = new TObjects();
}
function FE3rDynamicModel_createMesh(){
   var o = this;
   var m = RClass.create(FE3rDynamicMesh);
   m._model = o;
   m.linkGraphicContext(o);
   o._meshes.push(m);
   return m;
}
function FE3rDynamicModel_renderables(){
   return this._renderables;
}
function FE3rDynamicModel_meshes(){
   return this._meshes;
}
function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}
function FE3rDynamicModel_build(){
   var o = this;
   var rs = o._renderables;
   var ms = o._meshes;
   var rc = rs.count();
   if(rc > 0){
      var mr = o.createMesh();
      for(var i = 0; i < rc; i++){
         var r = rs.getAt(i);
         if(!mr.mergeRenderable(r)){
            mr = o.createMesh();
            if(!mr.mergeRenderable(r)){
               throw new TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   var mx = 0;
   var mc = ms.count();
   for(var i = 0; i < mc; i++){
      var m = ms.getAt(i);
      m.build();
      mx = Math.max(mx, m.mergeCount());
   }
   o._mergeMaxCount = mx;
}
function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = RTimer.current();
}
function FE3rGeometry(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._indexBuffers     = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._textures         = null;
   o.construct         = FE3rGeometry_construct;
   o.testReady         = FE3rGeometry_testReady;
   o.resource          = FE3rGeometry_resource;
   o.setResource       = FE3rGeometry_setResource;
   o.vertexCount       = FE3rGeometry_vertexCount;
   o.findVertexBuffer  = FE3rGeometry_findVertexBuffer;
   o.vertexBuffers     = FE3rGeometry_vertexBuffers;
   o.indexBuffer       = FE3rGeometry_indexBuffer;
   o.indexBuffers      = FE3rGeometry_indexBuffers;
   o.material          = FE3rGeometry_material;
   o.findTexture       = FE3rGeometry_findTexture;
   o.textures          = FE3rGeometry_textures;
   o.resource          = FE3rGeometry_resource;
   o.loadResource      = FE3rGeometry_loadResource;
   o.processLoad       = FE3rGeometry_processLoad;
   return o;
}
function FE3rGeometry_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TDictionary();
   o._indexBuffers = new TObjects();
}
function FE3rGeometry_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._resource.testReady()){
         return false;
      }
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
   }
   return o._ready;
}
function FE3rGeometry_guid(){
   return this._resource.guid();
}
function FE3rGeometry_resource(){
   return this._resource;
}
function FE3rGeometry_setResource(p){
   this._resource = p;
}
function FE3rGeometry_vertexCount(){
   return this._vertexCount;
}
function FE3rGeometry_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
function FE3rGeometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3rGeometry_indexBuffer(){
   return this._indexBuffer;
}
function FE3rGeometry_indexBuffers(){
   return this._indexBuffers;
}
function FE3rGeometry_material(){
   return this._material;
}
function FE3rGeometry_findTexture(p){
   return this._textures.get(p);
}
function FE3rGeometry_textures(){
   return this._textures;
}
function FE3rGeometry_resource(){
   return this._resource;
}
function FE3rGeometry_loadResource(resource){
   var o = this;
   var context = o._graphicContext;
   o._resource = resource;
   var streamResources = resource.streams();
   var streamCount = streamResources.count();
   for(var i = 0; i < streamCount; i++){
      var streamResource = streamResources.get(i);
      var code = streamResource._code;
      var dataCount = streamResource._dataCount;
      var data = streamResource._data;
      if((code == 'index16') || (code == 'index32')){
         var buffer = o._indexBuffer = context.createIndexBuffer();
         buffer._resource = streamResource;
         var dataCd = streamResource.elementDataCd();
         if(dataCd == EDataType.Uint16){
            buffer._strideCd = EG3dIndexStride.Uint16;
         }else if(dataCd == EDataType.Uint32){
            buffer._strideCd = EG3dIndexStride.Uint32;
         }else{
            throw new TError(o, "Unknown data type.");
         }
         buffer.upload(data, 3 * dataCount);
         o._indexBuffers.push(buffer);
      }else{
         var buffer = context.createVertexBuffer();
         buffer._name = code;
         buffer._resource = streamResource;
         buffer._vertexCount = dataCount;
         var pixels = null;
         switch(code){
            case "position":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float3;
               o._vertexCount = dataCount;
               break;
            case "coord":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError(o, "Unknown code");
         }
         buffer.upload(pixels, streamResource._dataStride, dataCount);
         o._vertexBuffers.set(code, buffer);
      }
   }
   o._ready = true;
}
function FE3rGeometry_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FE3rInstanceMesh(o){
   o = RClass.inherits(this, o, FE3rMesh);
   o._merges         = null;
   o.construct       = FE3rInstanceMesh_construct;
   o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
   o.build           = FE3rInstanceMesh_build;
   return o;
}
function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new TObjects();
}
function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}
function FE3rInstanceMesh_build(){
}
function FE3rMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial, MAttributeGuid, MGraphicObject, MLinkerResource);
   o._ready         = false;
   o._visible       = true;
   o._bitmaps       = null;
   o._reference     = null;
   o.visible        = FE3rMaterial_visible;
   o.setVisible     = FE3rMaterial_setVisible;
   o.findBitmap     = FE3rMaterial_findBitmap;
   o.bitmaps        = FE3rMaterial_bitmaps;
   o.reference      = FE3rMaterial_reference;
   o.testReady      = FE3rMaterial_testReady;
   o.testVisible    = FE3rMaterial_testVisible;
   o.loadResource   = FE3rMaterial_loadResource;
   o.reloadResource = FE3rMaterial_reloadResource;
   o.load           = FE3rMaterial_load;
   return o;
}
function FE3rMaterial_visible(){
   return this._visible;
}
function FE3rMaterial_setVisible(visible){
   this._visible = visible;
}
function FE3rMaterial_findBitmap(code){
   return this._bitmaps.get(code);
}
function FE3rMaterial_bitmaps(){
   return this._bitmaps;
}
function FE3rMaterial_reference(){
   return this._reference;
}
function FE3rMaterial_testReady(){
   var o = this;
   if(!o._ready){
      var bitmaps = o._bitmaps;
      if(bitmaps){
         var count = bitmaps.count();
         for(var i = 0; i < count; i++){
            var bitmap = bitmaps.at(i);
            if(!bitmap.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
function FE3rMaterial_testVisible(){
   var o = this;
   var visible = o._visible;
   if(visible && o._reference){
      visible = o._reference.testVisible();
   }
   return visible;
}
function FE3rMaterial_loadResource(resource){
   var o = this;
   o._guid = resource.guid();
   o._resource = resource;
   o._info.calculate(resource.info());
   o._dirty = true;
}
function FE3rMaterial_reloadResource(){
   var o = this;
   o._info.calculate(o._resource.info());
   o._dirty = true;
}
function FE3rMaterial_load(){
   var o = this;
   var resource = o._resource;
   var bitmapResources = resource.bitmaps();
   if(bitmapResources){
      var bitmapConsole = RConsole.find(FE3rBitmapConsole)
      var bitmaps = o._bitmaps = new TDictionary();
      var count = bitmapResources.count();
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapCode = bitmapResource.code();
         var bitmapPackResource = bitmapResource.bitmapPack();
         var packCode = bitmapPackResource.code();
         var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
         var bitmap = RClass.create(FE3rBitmap);
         bitmap._pack  = bitmapPack;
         bitmap.loadResource(bitmapResource);
         bitmaps.set(bitmapCode, bitmap);
      }
   }
}
function FE3rMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._materials = null;
   o.construct  = FE3rMaterialConsole_construct;
   o.load       = FE3rMaterialConsole_load;
   return o;
}
function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new TDictionary();
}
function FE3rMaterialConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Material guid is empty');
   }
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   var resource = RConsole.find(FE3sMaterialConsole).find(guid);
   material = RClass.create(FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}
function FE3rMesh(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._textures         = null;
   o.construct         = FE3rMesh_construct;
   o.testReady         = FE3rMesh_testReady;
   o.resource          = FE3rMesh_resource;
   o.setResource       = FE3rMesh_setResource;
   o.vertexCount       = FE3rMesh_vertexCount;
   o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rMesh_vertexBuffers;
   o.indexBuffer       = FE3rMesh_indexBuffer;
   o.material          = FE3rMesh_material;
   o.findTexture       = FE3rMesh_findTexture;
   o.textures          = FE3rMesh_textures;
   o.resource          = FE3rMesh_resource;
   o.loadResource      = FE3rMesh_loadResource;
   o.processLoad       = FE3rMesh_processLoad;
   return o;
}
function FE3rMesh_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rMesh_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._resource.testReady()){
         return false;
      }
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
   }
   return o._ready;
}
function FE3rMesh_guid(){
   return this._resource.guid();
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_setResource(p){
   this._resource = p;
}
function FE3rMesh_vertexCount(){
   return this._vertexCount;
}
function FE3rMesh_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FE3rMesh_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3rMesh_indexBuffer(){
   return this._indexBuffer;
}
function FE3rMesh_material(){
   return this._material;
}
function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}
function FE3rMesh_textures(){
   return this._textures;
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_loadResource(resource){
   var o = this;
   var context = o._graphicContext;
   o._resource = resource;
   var streamResources = resource.streams();
   var streamCount = streamResources.count();
   for(var i = 0; i < streamCount; i++){
      var streamResource = streamResources.get(i);
      var code = streamResource._code;
      var dataCount = streamResource._dataCount;
      var data = streamResource._data;
      if((code == 'index16') || (code == 'index32')){
         var buffer = o._indexBuffer = context.createIndexBuffer();
         buffer._resource = streamResource;
         var dataCd = streamResource.elementDataCd();
         if(dataCd == EDataType.Uint16){
            buffer._strideCd = EG3dIndexStride.Uint16;
         }else if(dataCd == EDataType.Uint32){
            buffer._strideCd = EG3dIndexStride.Uint32;
         }else{
            throw new TError(o, "Unknown data type.");
         }
         buffer.upload(data, 3 * dataCount);
      }else{
         var buffer = context.createVertexBuffer();
         buffer._name = code;
         buffer._resource = streamResource;
         buffer._vertexCount = dataCount;
         var pixels = null;
         switch(code){
            case "position":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError(o, "Unknown code");
         }
         buffer.upload(pixels, streamResource._dataStride, dataCount);
         o._vertexBuffers.push(buffer);
      }
   }
   o._ready = true;
}
function FE3rMesh_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FE3rMeshAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rMeshAnimation_process;
   return o;
}
function FE3rMeshAnimation_process(track){
   var o = this;
   if(!o._valid){
      return;
   }
   var tick = Math.abs(o._currentTick);
   var resource = track._resource;
   var playInfo = o._playInfo;
   resource.calculate(playInfo, tick);
   playInfo.update();
   var matrix = track._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(playInfo.matrix);
}
function FE3rMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._loadMeshs = null;
   o._meshs     = null;
   o._thread    = null;
   o._interval  = 200;
   o.onProcess  = FE3rMeshConsole_onProcess;
   o.construct  = FE3rMeshConsole_construct;
   o.findMesh   = FE3rMeshConsole_findMesh;
   o.meshs      = FE3rMeshConsole_meshs;
   o.loadByGuid = FE3rMeshConsole_loadByGuid;
   o.loadByCode = FE3rMeshConsole_loadByCode;
   return o;
}
function FE3rMeshConsole_onProcess(){
   var o = this;
   var s = o._loadMeshs;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3rMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadMeshs = new TLooper();
   o._meshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3rMeshConsole_meshs(){
   return this._meshs;
}
function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh guid is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FE3sMeshConsole);
   var rm = rmc.loadByGuid(pg);
   m = RClass.create(FE3rMesh);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadMeshs.push(m);
   }
   return m;
}
function FE3rMeshConsole_loadByCode(pc, pg){
   var o = this;
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh code is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FE3sMeshConsole);
   var rm = rmc.loadByCode(pg);
   m = RClass.create(FE3rMesh);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadMeshs.push(m);
   }
   return m;
}
function FE3rModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource            = null;
   o._meshes              = null;
   o._skeletons           = null;
   o._dataReady           = false;
   o.findMeshByGuid       = FE3rModel_findMeshByGuid;
   o.geometrys            = FE3rModel_geometrys;
   o.resource             = FE3rModel_resource;
   o.setResource          = FE3rModel_setResource;
   o.testReady            = FE3rModel_testReady;
   o.loadResource         = FE3rModel_loadResource;
   o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
   o.processLoad          = FE3rModel_processLoad;
   o.dispose              = FE3rModel_dispose;
   return o;
}
function FE3rModel_findMeshByGuid(p){
   var o = this;
   var s = o._meshes;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var m = s.get(i);
      if(m._guid == p){
         return m;
      }
   }
   return null;
}
function FE3rModel_geometrys(){
   return this._meshes;
}
function FE3rModel_resource(){
   return this._resource;
}
function FE3rModel_setResource(p){
   this._resource = p;
}
function FE3rModel_testReady(){
   return this._dataReady;
}
function FE3rModel_loadSkeletonResource(resource){
   var o = this;
   var modelConsole = RConsole.find(FE3rModelConsole);
   var skinResources = resource.skins();
   if(skinResources){
      var skinCount = skinResources.count();
      for(var i = 0; i < skinCount; i++){
         var skinResource = skinResources.at(i);
         var skin = RClass.create(FE3rSkin);
         skin.linkGraphicContext(o);
         skin.loadResource(skinResource)
         var meshGuid = skinResource.meshGuid();
         var mesh = modelConsole.findMesh(meshGuid);
         mesh.pushSkin(skin);
      }
   }
}
function FE3rModel_loadResource(resource){
   var o = this;
   var modelConsole = RConsole.find(FE3rModelConsole);
   var meshResources = resource.meshes();
   if(meshResources){
      var meshes = o._meshes = new TObjects();
      var meshCount = meshResources.count();
      for(var i = 0; i < meshCount; i++){
         var meshResource = meshResources.valueAt(i);
         var mesh = RClass.create(FE3rModelMesh);
         mesh.linkGraphicContext(o);
         mesh.loadResource(meshResource);
         meshes.push(mesh);
         modelConsole.meshs().set(mesh.guid(), mesh);
      }
   }
   var skeletonResources = resource.skeletons();
   if(skeletonResources){
      var skeletonCount = skeletonResources.count();
      for(var i = 0; i < skeletonCount; i++){
         var skeletonResource = skeletonResources.get(i);
         o.loadSkeletonResource(skeletonResource);
      }
   }
   o._dataReady = true;
}
function FE3rModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = RObject.dispose(o._meshes);
   o._skeletons = RObject.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
function FE3rModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadModels    = null;
   o._models        = null;
   o._meshs         = null;
   o._dynamicMeshs  = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = FE3rModelConsole_onProcess;
   o.construct      = FE3rModelConsole_construct;
   o.findModel      = FE3rModelConsole_findModel;
   o.models         = FE3rModelConsole_models;
   o.findMesh       = FE3rModelConsole_findMesh;
   o.meshs          = FE3rModelConsole_meshs;
   o.load           = FE3rModelConsole_load;
   o.loadMeshByGuid = FE3rModelConsole_loadMeshByGuid;
   o.loadMeshByCode = FE3rModelConsole_loadMeshByCode;
   o.merge          = FE3rModelConsole_merge;
   return o;
}
function FE3rModelConsole_onProcess(){
   var o = this;
   var s = o._loadModels;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3rModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._dynamicMeshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3rModelConsole_models(){
   return this._models;
}
function FE3rModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3rModelConsole_meshs(){
   return this._meshs;
}
function FE3rModelConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Model guid is empty');
   }
   var model = o._models.get(guid);
   if(model){
      return model;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   model = RClass.create(FE3rModel);
   model.linkGraphicContext(context);
   model.setCode(guid);
   model.setResource(resource);
   o._models.set(guid, model);
   o._loadModels.push(model);
   return model;
}
function FE3rModelConsole_loadMeshByGuid(context, pg){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Model guid is empty');
   }
   var m = o._models.get(pg);
   if(m){
      return m;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   m = RClass.create(FE3rModel);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._models.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FE3rModelConsole_loadMeshByCode(context, pg){
   var o = this;
   if(!RClass.isClass(context, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Model guid is empty');
   }
   var model = o._models.get(pg);
   if(model){
      return model;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   model = RClass.create(FE3rModel);
   model.linkGraphicContext(pc);
   model.setCode(pg);
   model.setResource(resource);
   o._models.set(pg, model);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FE3rModelConsole_merge(effect, region, offset, count){
   var o = this;
   var flag = 'merge';
   var renderables = region.renderables();
   for(var i = 0; i < count; i++){
      var renderable = renderables.getAt(offset + i);
      flag += '|' + renderable.hashCode();
   }
   var model = o._dynamicMeshs.get(flag);
   if(!model){
      model = RClass.create(FE3rDynamicModel);
      model.linkGraphicContext(region);
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         model.pushRenderable(renderable);
      }
      model.build();
      o._dynamicMeshs.set(flag, model);
      RLogger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
   }
   model.update();
   return model;
}
function FE3rModelMesh(o){
   o = RClass.inherits(this, o, FE3rGeometry);
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = null;
   o._boneIds          = null;
   o.construct         = FE3rModelMesh_construct;
   o.testReady         = FE3rModelMesh_testReady;
   o.guid              = FE3rModelMesh_guid;
   o.skins             = FE3rModelMesh_skins;
   o.pushSkin          = FE3rModelMesh_pushSkin;
   o.boneIds           = FE3rModelMesh_boneIds;
   return o;
}
function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rGeometry.construct.call(o);
}
function FE3rModelMesh_testReady(){
   var o = this;
   if(!o._ready){
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
function FE3rModelMesh_guid(){
   return this._resource.guid();
}
function FE3rModelMesh_skins(){
   return this._skins;
}
function FE3rModelMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}
function FE3rModelMesh_boneIds(p){
   return this._boneIds;
}
function FE3rObject(o){
   o = RClass.inherits(this, o, FObject, MAttributeGuid, MAttributeCode, MGraphicObject);
   return o;
}
function FE3rPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FE3rPipeline_construct;
   o.findVertexBuffer = FE3rPipeline_findVertexBuffer;
   o.loadResource     = FE3rPipeline_loadResource;
   return o;
}
function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rPipeline_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FE3rPipeline_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
function FE3rSkeleton(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._bones       = null;
   o._skins       = null;
   o.resource     = FE3rSkeleton_resource;
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}
function FE3rSkeleton_resource(){
   return this._resource;
}
function FE3rSkeleton_bones(){
   return this._bones;
}
function FE3rSkeleton_skins(){
   return this._skins;
}
function FE3rSkeleton_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p._bones;
   var c = rs.count();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.value(i);
         var b = RClass.create(FE3rBone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
function FE3rSkeletonAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rSkeletonAnimation_process;
   return o;
}
function FE3rSkeletonAnimation_process(skeleton){
   var o = this;
   if(!o._valid){
      return;
   }
   var tick = Math.abs(o._currentTick);
   var bones = skeleton.bones();
   var count = bones.count();
   for(var i = 0; i < count; i++){
      var bone = bones.at(i);
      bone.update(o._playInfo, tick);
   }
}
function FE3rSkin(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._streams     = null;
   o.resource     = FE3rSkin_resource;
   o.streams      = FE3rSkin_streams;
   o.loadResource = FE3rSkin_loadResource;
   return o;
}
function FE3rSkin_resource(){
   return this._resource;
}
function FE3rSkin_streams(){
   return this._streams;
}
function FE3rSkin_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p.streams();
   if(rs){
      var ss = o._streams = new TObjects();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3rStream);
         s.linkGraphicContext(o);
         s.loadResource(rs.get(i));
         ss.push(s);
      }
   }
}
function FE3rStream(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._buffer      = null;
   o._resource    = null;
   o.resource     = FE3rStream_resource;
   o.buffer       = FE3rStream_buffer;
   o.loadResource = FE3rStream_loadResource;
   return o;
}
function FE3rStream_resource(){
   return this._resource;
}
function FE3rStream_buffer(){
   return this._buffer;
}
function FE3rStream_loadResource(resource){
   var o = this;
   var code = resource._code;
   o._resource = resource;
   o._vertexCount = resource._dataCount;
   var buffer = o._buffer = o._graphicContext.createVertexBuffer();
   buffer._name = code;
   buffer._resource = resource;
   switch(code){
      case "bone_index":
         buffer._formatCd = EG3dAttributeFormat.Byte4;
         break;
      case "bone_weight":
         buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
         break;
      default:
         throw new TError("Unknown code");
   }
   buffer.upload(resource._data, resource._dataStride, resource._dataCount);
}
function FE3rTexture(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o._ready       = false;
   o._dataReady   = false;
   o.construct    = FE3rTexture_construct;
   o.resource     = FE3rTexture_resource;
   o.setResource  = FE3rTexture_setResource;
   o.bitmaps      = FE3rTexture_bitmaps;
   o.testReady    = FE3rTexture_testReady;
   o.loadBitmap   = FE3rTexture_loadBitmap;
   o.loadResource = FE3rTexture_loadResource;
   o.load         = FE3rTexture_load;
   o.processLoad  = FE3rTexture_processLoad;
   o.dispose      = FE3rTexture_dispose;
   return o;
}
function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rTexture_resource(){
   return this._resource;
}
function FE3rTexture_setResource(p){
   this._resource = p;
}
function FE3rTexture_bitmaps(){
   return this._bitmaps;
}
function FE3rTexture_testReady(){
   return this._ready;
}
function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = RClass.create(FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}
function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = RClass.create(FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = RClass.create(FE3rTextureBitmapCubePack);
         }else{
            throw new TError(o, 'Load resource failure.');
         }
         bp.linkGraphicContext(o);
         bp.loadResource(rbp);
         o._bitmapPacks.set(rbp.code(), bp);
      }
   }
   o._dataReady = true;
}
function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.valueAt(i);
      var b = o.loadBitmap(rb.guid());
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new TError('Link pack is not eists.');
      }
      b.load(bp);
   }
   o._ready = true;
}
function FE3rTexture_processLoad(){
   var o = this;
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
   }else{
      var s = o._bitmapPacks;
      for(var i = s.count() - 1; i >= 0; i--){
         var b = s.valueAt(i);
         if(!b.testReady()){
            return false;
         }
      }
      o.load();
   }
   return o._ready;
}
function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = RObject.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmap(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._ready      = false;
   o._bitmapPack = null;
   o.construct   = FE3rTextureBitmap_construct;
   o.texture     = FE3rTextureBitmap_texture;
   o.testReady   = FE3rTextureBitmap_testReady;
   o.load        = FE3rTextureBitmap_load;
   o.dispose     = FE3rTextureBitmap_dispose;
   return o;
}
function FE3rTextureBitmap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmap_texture(){
   return this._bitmapPack.texture();
}
function FE3rTextureBitmap_testReady(){
   return this._ready;
}
function FE3rTextureBitmap_load(p){
   var o = this;
   o._bitmapPack = p;
   o._ready = true;
}
function FE3rTextureBitmap_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._bitmapPack = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
   o.construct    = FE3rTextureBitmapCubePack_construct;
   o.loadResource = FE3rTextureBitmapCubePack_loadResource;
   o.dispose      = FE3rTextureBitmapCubePack_dispose;
   return o;
}
function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   var capability = RBrowser.capability();
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   if(capability.blobCreate){
      for(var i = 0; i < 6; i++){
         var m = is[i];
         window.URL.revokeObjectURL(m.url());
         is[i] = RObject.dispose(m);
      }
   }
   o._images = RObject.dispose(o._images);
   o._dataReady = true;
}
function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   var texture = p._texture;
   var capability = RBrowser.capability();
   var d = p.data();
   var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var g = o._images[i] = RClass.create(FImage);
      g._index = i;
      g.setOptionAlpha(false);
      if(capability.blobCreate){
         var blob = new Blob([d[i]], {'type' : 'image/' + t});
         var url = window.URL.createObjectURL(blob);
         g.loadUrl(url);
      }else{
         var url = RBrowser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         g.loadUrl(url);
      }
      g.addLoadListener(o, o.onLoad);
   }
}
function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
   o.construct    = FE3rTextureBitmapFlatPack_construct;
   o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
   o.dispose      = FE3rTextureBitmapFlatPack_dispose;
   return o;
}
function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._dataReady = true;
}
function FE3rTextureBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapFlatPack_loadResource(p){
   var o = this;
   o._resource = p;
   var rt = p._texture;
   var c = p.code();
   var g = o._image = RConsole.find(FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
   g.addLoadListener(o, o.onLoad);
}
function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   o.construct    = FE3rTextureBitmapPack_construct;
   o.texture      = FE3rTextureBitmapPack_texture;
   o.testReady    = FE3rTextureBitmapPack_testReady;
   o.loadResource = RMethod.virtual(o, 'loadResource');
   o.dispose      = FE3rTextureBitmapPack_dispose;
   return o;
}
function FE3rTextureBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmapPack_texture(){
   return this._texture;
}
function FE3rTextureBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
function FE3rTextureBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadTextures = null;
   o._bitmaps      = null;
   o._textures     = null;
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = FE3rTextureConsole_onProcess;
   o.construct     = FE3rTextureConsole_construct;
   o.bitmaps       = FE3rTextureConsole_bitmaps;
   o.textures      = FE3rTextureConsole_textures;
   o.load          = FE3rTextureConsole_load;
   o.loadBitmap    = FE3rTextureConsole_loadBitmap;
   return o;
}
function FE3rTextureConsole_onProcess(){
   var o = this;
   var s = o._loadTextures;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3rTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadTextures = new TLooper();
   o._bitmaps = new TDictionary();
   o._textures = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rTextureConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rTextureConsole_textures(){
   return this._textures;
}
function FE3rTextureConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var texture = o._textures.get(flag);
   if(texture){
      return texture;
   }
   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   RLogger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = RClass.create(FE3rTextureCube);
   }else{
      bitmap = RClass.create(FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
}
function FE3rTextureConsole_load2(pc, pt){
   var o = this;
   var s = o._textures;
   var t = s.get(pt);
   if(t){
      return t;
   }
   var rc = RConsole.find(FE3sTextureConsole);
   var r = rc.load(pt);
   t = RClass.create(FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   s.set(pt, t);
   o._loadTextures.push(t);
   return t;
}
function FE3rTextureConsole_loadBitmap(pc, pt, pb){
   var o = this;
   var b = o._bitmaps.get(pb);
   if(b){
      return b;
   }
   var t = o.load(pc, pt);
   return t.loadBitmap(pb);
}
function FE3rTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix      = null
   o._resource    = null;
   o.construct    = FE3rTrack_construct;
   o.matrix       = FE3rTrack_matrix;
   o.resource     = FE3rTrack_resource;
   o.loadResource = FE3rTrack_loadResource;
   o.dispose      = FE3rTrack_dispose;
   return o;
}
function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rTrack_matrix(){
   return this._matrix;
}
function FE3rTrack_resource(){
   return this._resource;
}
function FE3rTrack_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
function FE3rTrack_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
function FE3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o.drawGroup = FE3dAutomaticEffect_drawGroup;
   return o;
}
function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
   var o = this;
   if(count > 1){
      var modelConsole = RConsole.find(FE3rModelConsole);
      var model = modelConsole.merge(o, region, offset, count);
      if(model){
         var context = o._graphicContext;
         var meshes = model.meshes();
         var meshCount = meshes.count();
         var spaceName = region.spaceName();
         var mesh = meshes.first();
         var info = mesh.selectInfo(spaceName);
         var effect = info.effect;
         if(!effect){
            effect = info.effect = RConsole.find(FG3dEffectConsole).find(context, region, mesh);
         }
         for(var i = 1; i < meshCount; i++){
            var mesh = meshes.getAt(i);
            var info = mesh.selectInfo(spaceName);
            info.effect = effect;
         }
         return effect.drawRenderables(region, meshes, 0, meshCount);
      }
   }
   o.drawRenderables(region, renderables, offset, count);
}
function FE3dControlAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'control.automatic';
   o.drawRenderable = FE3dControlAutomaticEffect_drawRenderable;
   return o;
}
function FE3dControlAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FE3dControlFrameEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'control.frame';
   o.drawRenderable = FE3dControlFrameEffect_drawRenderable;
   return o;
}
function FE3dControlFrameEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
   p.setParameter('fc_emissive_color', mi.emissiveColor);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FE3dControlPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code = 'control';
   return o;
}
function FE3dControlTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code        = 'control';
   o._passControl = null;
   o.setup       = FE3dControlTechnique_setup;
   o.passControl = FE3dControlTechnique_passControl;
   o.drawRegion  = FE3dControlTechnique_drawRegion;
   return o;
}
function FE3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(EG3dTechniqueMode.Result);
   var pd = o._passControl = RClass.create(FE3dControlPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}
function FE3dControlTechnique_passControl(){
   return this._passControl;
}
function FE3dControlTechnique_drawRegion(p){
   var o = this;
   if(p.renderables().isEmpty()){
      return;
   }
   o._graphicContext.clearDepth(1);
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FE3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   return o;
}
function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
   var o = this;
   var material = renderable.material();
   var data = effectInfo.material;
   if(!data){
      data = effectInfo.material = RClass.create(FFloatStream);
      data.setLength(40);
      material._dirty = true;
   }
   if(material._dirty){
      var info = material.info();
      data.reset();
      if(info.optionAlpha){
         data.writeFloat4(info.alphaBase, info.alphaRate, 0, 0);
      }else{
         data.writeFloat4(info.alphaBase, 1, 0, 0);
      }
      data.writeFloat4(info.colorMin, info.colorMax, info.colorBalance, info.colorRate);
      data.writeColor4(info.vertexColor);
      data.writeColor4(info.ambientColor);
      data.writeColor4(info.diffuseColor);
      data.writeColor4(info.specularColor);
      data.writeFloat4(info.specularBase, info.specularLevel, info.specularAverage, info.specularShadow);
      data.writeColor4(info.reflectColor);
      data.writeFloat4(0, 0, 1 - info.reflectMerge, info.reflectMerge);
      data.writeColor4(info.emissiveColor);
      material._dirty = false;
   }
}
function FE3dGeneralColorAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var program = o._program;
   var cameraPosition = region.calculate(EG3dRegionParameter.CameraPosition);
   var lightDirection = region.calculate(EG3dRegionParameter.LightDirection);
   var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix)
   var material = renderable.material();
   o.bindMaterial(material);
   if(renderable._optionMerge){
      var mergeRenderables = renderable.mergeRenderables();
      var mergeCount = mergeRenderables.count();
      var data = RTypeArray.findTemp(EDataType.Float32, 16 * mergeCount);
      for(var i = 0; i < mergeCount; i++){
         var mergeRenderable = mergeRenderables.at(i);
         var matrix = mergeRenderable.currentMatrix();
         matrix.writeData(data, 16 * i);
      }
      program.setParameter('vc_model_matrix', data);
   }else{
      var matrix = renderable.currentMatrix();
      program.setParameter('vc_model_matrix', matrix);
   }
   program.setParameter('vc_vp_matrix', vpMatrix);
   program.setParameter('vc_camera_position', cameraPosition);
   program.setParameter('vc_light_direction', lightDirection);
   program.setParameter('fc_camera_position', cameraPosition);
   program.setParameter('fc_light_direction', lightDirection);
   if(o._supportMaterialMap){
      var materialId = renderable._materialId;
      program.setParameter4('fc_material', 1 / 32, materialId / 512, 0, 0);
   }else{
      var info = renderable.activeInfo();
      o.buildMaterial(info, renderable);
      program.setParameter('fc_materials', info.material.memory());
   }
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
function FE3dGeneralColorFlatEffect(o){
   o = RClass.inherits(this, o, FE3dAutomaticEffect);
   o._code          = 'general.color.flat';
   o.drawRenderable = FE3dGeneralColorFlatEffect_drawRenderable;
   return o;
}
function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var size = context.size();
   var program = o._program;
   var material = renderable.material();
   o.bindMaterial(material);
   if(renderable._optionMerge){
      var meshs = renderable.mergeRenderables();
      var meshCount = meshs.count();
      var data = RTypeArray.findTemp(EDataType.Float32, 4 * meshCount);
      var index = 0;
      for(var i = 0; i < meshCount; i++){
         var mesh = meshs.getAt(i);
         var matrix = mesh.matrix();
         data[index++] = matrix.sx / size.width * 2;
         data[index++] = matrix.sy / size.height * 2;
         data[index++] = matrix.tx / size.width * 2 - 1;
         data[index++] = 1 - matrix.ty / size.height * 2;
         mesh.currentMatrix().writeData(data, 4 * i);
      }
      program.setParameter('vc_position', data);
   }else{
      var matrix = renderable.matrix();
      var cx = matrix.sx / size.width * 2;
      var cy = matrix.sy / size.height * 2;
      var tx = matrix.tx / size.width * 2 - 1;
      var ty = 1 - matrix.ty / size.height * 2;
      program.setParameter4('vc_position', cx, cy, tx, ty);
   }
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
function FE3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code = 'color';
   return o;
}
function FE3dGeneralColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FE3dAutomaticEffect);
   o._code            = 'general.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FE3dGeneralColorSkeletonEffect_drawRenderable;
   return o;
}
function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = region.calculate(EG3dRegionParameter.CameraPosition);
   var vld = region.calculate(EG3dRegionParameter.LightDirection);
   var m = renderable.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', renderable.currentMatrix());
   p.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bones = renderable.bones();
   if(bones){
      var boneCount = renderable._boneLimit;
      var data = RTypeArray.findTemp(EDataType.Float32, 16 * boneCount);
      for(var i = 0; i < boneCount; i++){
         var bone = bones.get(i);
         var boneMatrix = bone.matrix();
         boneMatrix.writeData(data, 16 * i);
      }
      p.setParameter('vc_bone_matrix', data);
   }
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
function FE3dGeneralTechnique(o){
   o = RClass.inherits(this, o, FE3dTechnique);
   o._code      = 'general';
   o._passColor = null;
   o.setup      = FE3dGeneralTechnique_setup;
   o.passColor  = FE3dGeneralTechnique_passColor;
   return o;
}
function FE3dGeneralTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(EG3dTechniqueMode.Ambient);
   o.registerMode(EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(EG3dTechniqueMode.DiffuseColor);
   o.registerMode(EG3dTechniqueMode.SpecularLevel);
   o.registerMode(EG3dTechniqueMode.SpecularColor);
   o.registerMode(EG3dTechniqueMode.Result);
   var p = o._passColor = RClass.create(FE3dGeneralColorPass);
   p.linkGraphicContext(o);
   p.setup();
   o._passes.push(p);
}
function FE3dGeneralTechnique_passColor(){
   return this._passColor;
}
function FE3dShadowColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.color.automatic';
   o.drawRenderable = FE3dShadowColorAutomaticEffect_drawRenderable;
   return o;
}
function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
   var tp = pg.techniquePass();
   var m = pr.material();
   o.bindMaterial(m);
   p.setParameter('vc_light_depth', vlci);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', vcvpm);
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('vc_light_view_matrix', vlvm);
   p.setParameter('vc_light_vp_matrix', vlvpm);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   o.bindAttributes(pr);
   p.setSampler('fs_light_depth', tp.textureDepth());
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FE3dShadowColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code           = 'color';
   o._textureDepth   = null;
   o.textureDepth    = FE3dShadowColorPass_textureDepth;
   o.setTextureDepth = FE3dShadowColorPass_setTextureDepth;
   o.drawRegion      = FE3dShadowColorPass_drawRegion;
   return o;
}
function FE3dShadowColorPass_textureDepth(){
   return this._textureDepth;
}
function FE3dShadowColorPass_setTextureDepth(p){
   this._textureDepth = p;
}
function FE3dShadowColorPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FE3dShadowColorSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.color.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FE3dShadowColorSkeletonEffect_drawRenderable;
   return o;
}
function FE3dShadowColorSkeletonEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
               throw new TError("Can't find sampler. (linker={1})", ln);
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.currentMatrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = r.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FE3dShadowDepthAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'shadow.depth.automatic';
   o.drawRenderable = FE3dShadowDepthAutomaticEffect_drawRenderable;
   return o;
}
function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
   var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
   var lci = pg.calculate(EG3dRegionParameter.LightInfo);
   c.setBlendFactors(false);
   p.setParameter('vc_camera', lci);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_view_matrix', lvm);
   p.setParameter('vc_vp_matrix', lvpm);
   p.setParameter('fc_camera', lci);
   p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FE3dShadowDepthPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   o._code         = 'depth';
   o._renderTarget = null;
   o._textureDepth = null;
   o._renderTarget = null;
   o.setup         = FE3dShadowDepthPass_setup;
   o.textureDepth  = FE3dShadowDepthPass_textureDepth;
   o.drawRegion    = FE3dShadowDepthPass_drawRegion;
   return o;
}
function FE3dShadowDepthPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var d = o._textureDepth = c.createFlatTexture();
   d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
   d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(2048, 2048);
   t.textures().push(d);
   t.build();
}
function FE3dShadowDepthPass_textureDepth(){
   return this._textureDepth;
}
function FE3dShadowDepthPass_drawRegion(p){
   var o = this;
   var c = o._graphicContext;
   if(o._finish){
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   }else{
      c.setRenderTarget(o._renderTarget);
      c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
   }
   p._textureDepth = o._textureDepth;
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
function FE3dShadowDepthSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code            = 'shadow.depth.skeleton';
   o._supportSkeleton = true;
   o.drawRenderable   = FE3dShadowDepthSkeletonEffect_drawRenderable;
   return o;
}
function FE3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   p.setParameter('vc_model_matrix', r.currentMatrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameter('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameter('fc_ambient_color', mi.ambientColor);
   p.setParameter('fc_diffuse_color', mi.diffuseColor);
   p.setParameter('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameter('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameter('fc_reflect_color', mi.reflectColor);
   var bs = pr.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
function FE3dShadowTechnique(o){
   o = RClass.inherits(this, o, FE3dTechnique);
   o._code        = 'shadow';
   o._passDepth   = null;
   o._passColor   = null;
   o.setup        = FE3dShadowTechnique_setup;
   o.passDepth    = FE3dShadowTechnique_passDepth;
   o.passColor    = FE3dShadowTechnique_passColor;
   o.updateRegion = FE3dShadowTechnique_updateRegion;
   return o;
}
function FE3dShadowTechnique_setup(){
   var o = this;
   o.__base.FE3dTechnique.setup.call(o);
   o.registerMode(EG3dTechniqueMode.Ambient);
   o.registerMode(EG3dTechniqueMode.DiffuseLevel);
   o.registerMode(EG3dTechniqueMode.DiffuseColor);
   o.registerMode(EG3dTechniqueMode.SpecularLevel);
   o.registerMode(EG3dTechniqueMode.SpecularColor);
   o.registerMode(EG3dTechniqueMode.Result);
   var ps = o._passes;
   var pd = o._passDepth = RClass.create(FE3dShadowDepthPass);
   pd.linkGraphicContext(o);
   pd.setup();
   var pc = o._passColor = RClass.create(FE3dShadowColorPass);
   pc.linkGraphicContext(o);
   pc.setup();
   ps.push(pc);
   pc.setTextureDepth(pd.textureDepth());
}
function FE3dShadowTechnique_passDepth(){
   return this._passDepth;
}
function FE3dShadowTechnique_passColor(){
   return this._passColor;
}
function FE3dShadowTechnique_updateRegion(p){
   var o = this;
   o.__base.FE3dTechnique.updateRegion.call(o, p);
   var g = o._graphicContext;
   var gs = g.size();
   var c = p.camera();
   var l = p.directionalLight();
   var lc = l.camera();
}
var EE3dInstance = new function EE3dInstance(){
   var o = this;
   o.ModelRenderable    = 'model.renderable';
   o.TemplateRenderable = 'template.renderable';
   o.Scene              = 'scene';
   o.SceneLayer         = 'scene.layer';
   o.SceneDisplay       = 'scene.display';
   o.SceneMaterial      = 'scene.material';
   o.SceneMovie         = 'scene.movie';
   o.SceneRenderable    = 'scene.renderable';
   return o;
}
function FE3dAnimation(o){
   o = RClass.inherits(this, o, FObject, ME3dObject, MLinkerResource);
   return o;
}
function FE3dBitmap(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
   o._ready           = false;
   o._size            = null;
   o._renderable      = null;
   o.construct        = FE3dBitmap_construct;
   o.testReady        = FE3dBitmap_testReady;
   o.size             = FE3dBitmap_size;
   o.setSize          = FE3dBitmap_setSize;
   o.renderable       = FE3dBitmap_renderable;
   o.setRenderable    = FE3dBitmap_setRenderable;
   o.vertexBuffers    = FE3dBitmap_vertexBuffers;
   o.indexBuffer      = FE3dBitmap_indexBuffer;
   o.findVertexBuffer = FE3dBitmap_findVertexBuffer;
   o.findTexture      = FE3dBitmap_findTexture;
   o.textures         = FE3dBitmap_textures;
   o.processLoad      = FE3dBitmap_processLoad;
   o.process          = FE3dBitmap_process;
   o.loadUrl          = FE3dBitmap_loadUrl;
   o.dispose          = FE3dBitmap_dispose;
   return o;
}
function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
   o._size = new SSize2();
}
function FE3dBitmap_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
         if(o._ready){
            var size = renderable.size();
            var adjustSize = renderable.adjustSize();
            var matrix = o.matrix();
            matrix.sz = adjustSize.height / size.height;
            matrix.updateForce();
            var event = new SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
      }
   }
   return o._ready;
}
function FE3dBitmap_size(){
   return this._size;
}
function FE3dBitmap_setSize(width, height){
   var o = this;
   o._size.set(width, height);
   o._scale.set(width, height, 1);
}
function FE3dBitmap_renderable(p){
   return this._renderable;
}
function FE3dBitmap_setRenderable(p){
   var o = this;
   this._renderable= p;
   o._ready = true;
   o.processLoadListener(o);
}
function FE3dBitmap_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FE3dBitmap_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dBitmap_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FE3dBitmap_findTexture(p){
   return this._renderable.findTexture(p);
}
function FE3dBitmap_textures(){
   return this._renderable.textures();
}
function FE3dBitmap_processLoad(){
   var o = this;
   return true;
}
function FE3dBitmap_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}
function FE3dBitmap_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3dBitmapConsole).loadUrl(context, url);
   o._ready = false;
}
function FE3dBitmap_dispose(){
   var o = this;
   o._material = RObject.dispoe(o._material);
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
function FE3dBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.resource.bitmap.wv'
   o.construct = FE3dBitmapConsole_construct;
   o.bitmaps   = FE3dBitmapConsole_bitmaps;
   o.load      = FE3dBitmapConsole_load;
   o.loadUrl   = FE3dBitmapConsole_loadUrl;
   return o;
}
function FE3dBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3dBitmapConsole_bitmaps(){
   return this._bitmaps;
}
function FE3dBitmapConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   RLogger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = RClass.create(FE3rBitmapCubePack);
   }else{
      bitmap = RClass.create(FE3rBitmapFlatPack);
   }
   bitmap.linkGraphicContext(context);
   bitmap.loadUrl(url);
   o._bitmaps.set(flag, bitmap);
   return bitmap;
}
function FE3dBitmapConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = RBrowser.contentPath(url);
   RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = RClass.create(FE3dBitmapData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
function FE3dBitmapData(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._vertexCount      = 4;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._indexBuffers     = null;
   o._material         = null;
   o._textures         = null;
   o._image            = null;
   o._size             = null;
   o._adjustSize       = null;
   o.onImageLoad       = FE3dBitmapData_onImageLoad;
   o.construct         = FE3dBitmapData_construct;
   o.testReady         = FE3dBitmapData_testReady;
   o.size              = FE3dBitmapData_size;
   o.adjustSize        = FE3dBitmapData_adjustSize;
   o.vertexCount       = FE3dBitmapData_vertexCount;
   o.findVertexBuffer  = FE3dBitmapData_findVertexBuffer;
   o.vertexBuffers     = FE3dBitmapData_vertexBuffers;
   o.indexBuffer       = FE3dBitmapData_indexBuffer;
   o.indexBuffers      = FE3dBitmapData_indexBuffers;
   o.material          = FE3dBitmapData_material;
   o.findTexture       = FE3dBitmapData_findTexture;
   o.textures          = FE3dBitmapData_textures;
   o.setup             = FE3dBitmapData_setup;
   o.loadUrl           = FE3dBitmapData_loadUrl;
   o.dispose           = FE3dBitmapData_dispose;
   return o;
}
function FE3dBitmapData_onImageLoad(event){
   var o = this;
   var context = o._graphicContext;
   var image = event.sender;
   var size = image.size();
   var width = size.width;
   var height = size.height;
   o._size.set(width, height);
   var adjustWidth = RInteger.pow2(width);
   var adjustHeight = RInteger.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   var canvasConsole = RConsole.find(FE2dCanvasConsole);
   var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
   var context2d = canvas.context();
   context2d.drawImage(image, 0, 0);
   var texture = o._imageTexture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.upload(canvas);
   o._textures.set('diffuse', texture);
   canvasConsole.free(canvas);
   image.dispose();
   o._ready = true;
}
function FE3dBitmapData_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._size = new SSize2();
   o._adjustSize = new SSize2();
   o._vertexBuffers = new TDictionary();
   o._textures = new TDictionary();
}
function FE3dBitmapData_testReady(){
   return this._ready;
}
function FE3dBitmapData_size(){
   return this._size;
}
function FE3dBitmapData_adjustSize(){
   return this._adjustSize;
}
function FE3dBitmapData_vertexCount(){
   return this._vertexCount;
}
function FE3dBitmapData_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
function FE3dBitmapData_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3dBitmapData_indexBuffer(){
   return this._indexBuffer;
}
function FE3dBitmapData_indexBuffers(){
   return this._indexBuffers;
}
function FE3dBitmapData_material(){
   return this._material;
}
function FE3dBitmapData_findTexture(p){
   return this._textures.get(p);
}
function FE3dBitmapData_textures(){
   return this._textures;
}
function FE3dBitmapData_setup(){
   var o = this;
   var context = o._graphicContext;
   var data = [
      0,  0, 0,
      1,  0, 0,
      1, -1, 0,
      0, -1, 0 ];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setName('position');
   buffer._formatCd = EG3dAttributeFormat.Float3;
   buffer.upload(data, 4 * 3, 4);
   o._vertexBuffers.set(buffer.name(), buffer);
   var data = [
      0, 1,
      1, 1,
      1, 0,
      0, 0];
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setName('coord');
   buffer._formatCd = EG3dAttributeFormat.Float2;
   buffer.upload(data, 4 * 2, 4);
   o._vertexBuffers.set(buffer.name(), buffer);
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
}
function FE3dBitmapData_loadUrl(url){
   var o = this;
   var texture = o._imageTexture;
   if(texture){
      texture.dispose();
      o._imageTexture = null;
      o._textures.clear();
   }
   var image = RClass.create(FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   o._ready = false;
}
function FE3dBitmapData_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._adjustSize = RObject.dispose(o._adjustSize);
   o._vertexBuffers = RObject.dispose(o._vertexBuffers);
   o._indexBuffer = RObject.dispose(o._indexBuffer);
   o._imageTexture = RObject.dispose(o._imageTexture);
   o._textures = RObject.dispose(o._textures);
   o.__base.FE3rObject.dispose.call(o);
}
function FE3dBoundBox(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._outline              = null;
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dBoundBox_construct;
   o.outline               = FE3dBoundBox_outline;
   o.setup                 = FE3dBoundBox_setup;
   o.upload                = FE3dBoundBox_upload;
   return o;
}
function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
   o._outline = new SOutline3();
}
function FE3dBoundBox_outline(){
   return this._outline;
}
function FE3dBoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   o._vertexBuffers.set(vb._name, vb);
   var vd = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vd[n] = 0xFF;
   }
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vd, 1 * 4, 32);
   o._vertexBuffers.set(vb._name, vb);
   o._vertexCount = 32;
   var id = [
       0,  1,  0,  4,  0, 12,
       3,  2,  3,  5,  3, 13,
       8,  6,  8,  9,  8, 14,
      11,  7, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib._lineWidth = 1;
   ib.upload(id, 48);
   o.update();
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dBoundBox_upload(){
   var o = this;
   var l = o._outline;
   var a = l.max;
   var ax = a.x;
   var ay = a.y;
   var az = a.z;
   var i = l.min;
   var ix = i.x;
   var iy = i.y;
   var iz = i.z;
   var r = o._rate;
   var cx = (ax - ix) * r;
   var cy = (ay - iy) * r;
   var cz = (az - iz) * r;
   var vd = [
      ix,       ay,      iz,
      ix + cx,  ay,      iz,
      ax - cx,  ay,      iz,
      ax,       ay,      iz,
      ix,       ay - cy, iz,
      ax,       ay - cy, iz,
      ix,       iy + cy, iz,
      ax,       iy + cy, iz,
      ix,       iy,      iz,
      ix + cx,  iy,      iz,
      ax - cx,  iy,      iz,
      ax,       iy,      iz,
      ix,       ay,      iz + cz,
      ax,       ay,      iz + cz,
      ix,       iy,      iz + cz,
      ax,       iy,      iz + cz,
      ix,       ay,      az - cz,
      ax,       ay,      az - cz,
      ix,       iy,      az - cz,
      ax,       iy,      az - cz,
      ix,       ay,      az,
      ix + cx,  ay,      az,
      ax - cx,  ay,      az,
      ax,       ay,      az,
      ix,       ay - cy, az,
      ax,       ay - cy, az,
      ix,       iy + cy, az,
      ax,       iy + cy, az,
      ix,       iy,      az,
      ix + cx,  iy,      az,
      ax - cx,  iy,      az,
      ax,       iy,      az];
   o._vertexPositionBuffer.upload(vd, 4 * 3, 32);
}
function FE3dCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
   o._rotation       = null;
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   o.construct       = FE3dCamera_construct;
   o.rotation        = FE3dCamera_rotation;
   o.doPitch         = FE3dCamera_doPitch;
   o.doYaw           = FE3dCamera_doYaw;
   o.doRoll          = FE3dCamera_doRoll;
   o.loadResource    = FE3dCamera_loadResource;
   o.commitResource  = FE3dCamera_commitResource;
   o.update          = FE3dCamera_update;
   return o;
}
function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dPerspectiveCamera.construct.call(o);
   o._rotation = new SVector3();
   o._rotationMatrix = new SMatrix3x3();
   o._quaternion = new SQuaternion();
   o._quaternionX = new SQuaternion();
   o._quaternionY = new SQuaternion();
   o._quaternionZ = new SQuaternion();
}
function FE3dCamera_rotation(){
   return this._rotation;
}
function FE3dCamera_doPitch(p){
   this._rotation.x += p;
}
function FE3dCamera_doYaw(p){
   this._rotation.y += p;
}
function FE3dCamera_doRoll(p){
   this._rotation.z += p;
}
function FE3dCamera_loadResource(resource){
   var o = this;
   var resourceProjection = resource.projection();
   o._resource = resource;
   o.position().assign(resource.position());
   o.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
   o.update();
   var projection = o.projection();
   projection._angle = resourceProjection.angle();
   projection._znear = resourceProjection.znear();
   projection._zfar = resourceProjection.zfar();
   projection.update();
}
function FE3dCamera_commitResource(){
   var o = this;
   var resource = o._resource;
   resource._position.assign(o._position);
   resource._direction.assign(o._direction);
}
function FE3dCamera_update(){
   var o = this;
   var r = o._rotation;
   o._quaternionX.fromAxisAngle(RMath.vectorAxisX, r.x);
   o._quaternionY.fromAxisAngle(RMath.vectorAxisY, r.y);
   o._quaternionZ.fromAxisAngle(RMath.vectorAxisZ, r.z);
   var q = o._quaternion.identity();
   q.mul(o._quaternionX);
   q.mul(o._quaternionY);
   q.mul(o._quaternionZ);
   var m = o._rotationMatrix;
   m.build(q);
   var d = o._direction;
   m.transformPoint3(o._directionTarget, d);
   d.normalize();
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
function FE3dCube(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup                = FE3dCube_setup;
   return o;
}
function FE3dCube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dDimensional(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dDimensional_construct;
   o.setup                 = FE3dDimensional_setup;
   return o;
}
function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
   o._cellSize = new SSize2();
   o._cellSize.set(1, 1);
   o._size = new SSize2();
   o._size.set(16, 16);
}
function FE3dDimensional_setup(){
   var o = this;
   var c = o._graphicContext;
   var cw = o._cellSize.width;
   var ch = o._cellSize.height;
   var sw = o._size.width;
   var sw2 = sw / 2;
   var sh = o._size.height;
   var sh2 = sh / 2;
   var vc = 2 * ((sw + 2) + (sh + 2));
   var v = 0;
   var vi = 0;
   var vd = new Float32Array(3 * vc);
   var vci = 0;
   var vcd = new Uint8Array(4 * vc);
   var i = 0;
   var it = vc;
   var id = new Uint16Array(it);
   for(var y = 0; y <= sh; y++){
      var r = 1;
      if(y - sh2 == 0){
         r = 0
      }
      vd[v++] = cw * -sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      vd[v++] = cw * sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = cw * -sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = cw * sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   for(var x = 0; x <= sw; x++){
      var r = 1;
      if(x - sw2 == 0){
         r = 0
      }
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * - sh2 * r;
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * sh2 * r;
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * -sh2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   o._vertexCount = vc;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   vb.upload(vd, 4 * 3, vc);
   o._vertexBuffers.set(vb._name, vb);
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vcd, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib.upload(id, it);
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
   o._material    = null;
   o.construct    = FE3dDirectionalLight_construct;
   o.material     = FE3dDirectionalLight_material;
   o.loadResource = FE3dDirectionalLight_loadResource;
   o.dispose      = FE3dDirectionalLight_dispose;
   return o;
}
function FE3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dDirectionalLight.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
}
function FE3dDirectionalLight_material(){
   return this._material;
}
function FE3dDirectionalLight_loadResource(resource){
   var o = this;
   o.__base.MLinkerResource.loadResource.call(o, resource);
   o._material.loadResource(resource.material());
}
function FE3dDirectionalLight_dispose(){
   var o = this;
   o._material = RObject.dispose(o._material);
   o.__base.FG3dDirectionalLight.dispose.call(o);
}
function FE3dFlatStage(o){
   o = RClass.inherits(this, o, FE3dStage);
   o._layer    = null;
   o.construct = FE3dFlatStage_construct;
   o.layer     = FE3dFlatStage_layer;
   return o;
}
function FE3dFlatStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', layer);
}
function FE3dFlatStage_layer(){
   return this._layer;
}
function FE3dInstanceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._factory   = null;
   o.construct  = FE3dInstanceConsole_construct;
   o.factory    = FE3dInstanceConsole_factory;
   o.register   = FE3dInstanceConsole_register;
   o.unregister = FE3dInstanceConsole_unregister;
   o.create     = FE3dInstanceConsole_create;
   return o;
}
function FE3dInstanceConsole_construct(){
   var o = this;
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register(EE3dInstance.ModelRenderable, FE3dModelRenderable);
   factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
   factory.register(EE3dInstance.Scene, FE3dScene);
   factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
   factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
   factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
   factory.register(EE3dInstance.SceneMovie, FE3dSceneDisplayMovie);
   factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
}
function FE3dInstanceConsole_factory(){
   return this._factory;
}
function FE3dInstanceConsole_register(code, clazz){
   this._factory.register(code, clazz);
}
function FE3dInstanceConsole_unregister(code){
   this._factory.unregister(code, clazz);
}
function FE3dInstanceConsole_create(code){
   return this._factory.create(code);
}
function FE3dMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial);
   o._parent    = null;
   o.loadParent = FE3dRenderable_loadParent;
   return o;
}
function FE3dRenderable_loadParent(material){
   var o = this;
   o._parent = material;
}
function FE3dMesh(o){
   o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
   o._ready         = false;
   o._display       = null;
   o._renderable    = null;
   o._layer         = null;
   o.construct      = FE3dMesh_construct;
   o.testReady      = FE3dMesh_testReady;
   o.loadRenderable = FE3dMesh_loadRenderable;
   o.processLoad    = FE3dMesh_processLoad;
   o.process        = FE3dMesh_process;
   return o;
}
function FE3dMesh_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var l = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', l);
}
function FE3dMesh_testReady(){
   return this._ready;
}
function FE3dMesh_loadRenderable(p){
   var o = this;
   var resource = p.resource();
   var technique = o.selectTechnique(o, FE3dGeneralTechnique);
   technique.setResource(resource.technique());
   o.loadResource(resource);
   var m = RClass.create(FE3dMeshRenderable);
   m.setResource(resource._renderable);
   m._material.loadResource(resource._display._material);
   m._renderable = p;
   var vbs = p._vertexBuffers;
   var vbc = vbs.count();
   for(var i = 0; i < vbc; i++){
      var vb = vbs.getAt(i);
      m._vertexBuffers.set(vb._name, vb);
   }
   m._indexBuffer = p._indexBuffer;
   m.matrix().assign(m.resource().matrix());
   var display = o._display = RClass.create(FE3dMeshDisplay);
   display._renderable = m;
   display.load(resource._display);
   display.pushRenderable(m);
   o._layer.pushDisplay(display);
   o._ready = true;
   o.processLoadListener(o);
}
function FE3dMesh_processLoad(){
   var o = this;
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}
function FE3dMesh_process(){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
}
function FE3dMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadMeshs  = null;
   o._meshs      = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dMeshConsole_onProcess;
   o.construct   = FE3dMeshConsole_construct;
   o.meshs       = FE3dMeshConsole_meshs;
   o.allocByGuid = FE3dMeshConsole_allocByGuid;
   o.allocByCode = FE3dMeshConsole_allocByCode;
   o.free        = FE3dMeshConsole_free;
   return o;
}
function FE3dMeshConsole_onProcess(){
   var o = this;
   var ms = o._loadMeshs;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FE3dMeshConsole_construct(){
   var o = this;
   o._loadMeshs = new TLooper();
   o._meshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dMeshConsole_meshs(){
   return this._meshs;
}
function FE3dMeshConsole_allocByGuid(pc, pn){
   var o = this;
   var ms = o._meshs.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   var rmc = RConsole.find(FE3rMeshConsole);
   var rm = rmc.loadByGuid(pc, pn);
   var m = RClass.create(FE3dMesh);
   m.linkGraphicContext(pc);
   m._name = pn;
   m._renderable = rm;
   o._loadMeshs.push(m);
   return m;
}
function FE3dMeshConsole_allocByCode(pc, pn){
   var o = this;
   var ms = o._meshs.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   var rmc = RConsole.find(FE3rMeshConsole);
   var rm = rmc.loadByCode(pc, pn);
   var m = RClass.create(FE3dMesh);
   m.linkGraphicContext(pc);
   m._name = pn;
   m._renderable = rm;
   o._loadMeshs.push(m);
   return m;
}
function FE3dMeshConsole_free(p){
   var o = this;
   p._display.remove();
}
function FE3dMeshDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   o._material      = null;
   o._renderable    = null;
   o.renderable     = FE3dMeshDisplay_renderable;
   o.load           = FE3dMeshDisplay_load;
   o.reloadResource = FE3dMeshDisplay_reloadResource;
   return o;
}
function FE3dMeshDisplay_renderable(){
   return this._renderable;
}
function FE3dMeshDisplay_load(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
}
function FE3dMeshDisplay_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._renderable      = null;
   o._activeTrack     = null;
   o.renderable       = FE3dMeshRenderable_renderable;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.findVertexBuffer = FE3dMeshRenderable_findVertexBuffer;
   o.vertexBuffers    = FE3dMeshRenderable_vertexBuffers;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.indexBuffers     = FE3dMeshRenderable_indexBuffers;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.reloadResource   = FE3dMeshRenderable_reloadResource;
   o.process          = FE3dMeshRenderable_process;
   o.processDelay     = FE3dMeshRenderable_processDelay;
   o.update           = FE3dMeshRenderable_update;
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}
function FE3dMeshRenderable_renderable(){
   return this._renderable;
}
function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}
function FE3dMeshRenderable_findVertexBuffer(code){
   var o = this;
   var buffer = o._vertexBuffers.get(code);
   if(buffer){
      return buffer;
   }
   return o._renderable.findVertexBuffer(code);
}
function FE3dMeshRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FE3dMeshRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dMeshRenderable_indexBuffers(){
   return this._renderable.indexBuffers();
}
function FE3dMeshRenderable_findTexture(code){
   var o = this;
   var textures = o._textures.get(code);
   if(textures){
      return textures;
   }
   return o._renderable.findTexture(p);
}
function FE3dMeshRenderable_textures(){
   var o = this;
   var textures = o._textures;
   if(textures){
      return textures;
   }
   return o._renderable.textures();
}
function FE3dMeshRenderable_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
function FE3dMeshRenderable_process(region){
   var o = this;
   o.__base.FE3dRenderable.process.call(o, region);
   var track = o._activeTrack;
   if(track){
      if(o._display._optionPlay){
         var animation = track._animation;
         if(animation){
            animation.process(track);
         }
      }
   }
}
function FE3dMeshRenderable_processDelay(p){
   var o = this;
   o.__base.FE3dRenderable.processDelay.call(o, p);
}
function FE3dMeshRenderable_update(region){
   var o = this;
   var display = o._display;
   var matrix = o._matrix;
   var track = o._activeTrack;
   var calculateMatrix = o._calculateMatrix;
   if(track){
      calculateMatrix.assign(track.matrix());
      calculateMatrix.append(matrix);
   }else{
      calculateMatrix.assign(matrix);
   }
   if(display){
      var displayMatrix = o._display.currentMatrix();
      calculateMatrix.append(displayMatrix);
   }
   var changed = o._currentMatrix.attachData(calculateMatrix.data());
   if(changed){
      region.change();
   }
}
function FE3dMeshRenderable_dispose(){
   var o = this;
   o._modelMatrix = RObject.dispose(o._modelMatrix);
   o._vertexBuffers = RObject.dispose(o._vertexBuffers);
   o.__base.FE3dRenderable.dispose.call(o);
}
function FE3dModel(o){
   o = RClass.inherits(this, o, FE3dSpace, MPoolAble, MLinkerResource, MListenerLoad);
   o._dataReady     = false;
   o._renderable    = null;
   o._display       = null;
   o.construct      = FE3dModel_construct;
   o.display        = FE3dModel_display;
   o.testReady      = FE3dModel_testReady;
   o.renderable     = FE3dModel_renderable;
   o.setRenderable  = FE3dModel_setRenderable;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   return o;
}
function FE3dModel_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', layer);
   var display = o._display = RClass.create(FE3dModelDisplay);
   layer.pushDisplay(display);
}
function FE3dModel_display(){
   return this._display;
}
function FE3dModel_testReady(){
   return this._dataReady;
}
function FE3dModel_renderable(){
   return this._renderable;
}
function FE3dModel_setRenderable(renderable){
   this._renderable = renderable;
}
function FE3dModel_loadRenderable(renderable){
   var o = this;
   o._renderable = renderable;
   var resource = renderable.resource();
   o.selectTechnique(o, FE3dGeneralTechnique);
   o.loadResource(resource);
   o._display.load(renderable);
   o._dataReady = true;
}
function FE3dModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   var renderable = o._renderable;
   if(!renderable.testReady()){
      return false;
   }
   o.loadRenderable(renderable);
   o.processLoadListener(o);
   return true;
}
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._looper     = null;
   o._pools      = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dModelConsole_onProcess;
   o.construct   = FE3dModelConsole_construct;
   o.pools       = FE3dModelConsole_pools;
   o.allocByGuid = FE3dModelConsole_allocByGuid;
   o.allocByCode = FE3dModelConsole_allocByCode;
   o.free        = FE3dModelConsole_free;
   return o;
}
function FE3dModelConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   while(looper.next()){
      var item = looper.current();
      if(item.processLoad()){
         looper.removeCurrent();
      }
   }
}
function FE3dModelConsole_construct(){
   var o = this;
   o._looper = new TLooper();
   o._pools = RClass.create(FObjectPools);
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}
function FE3dModelConsole_pools(){
   return this._pools;
}
function FE3dModelConsole_allocByGuid(context, guid){
   var o = this;
   var model = o._pools.alloc(guid);
   if(model){
      return model;
   }
   var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
   var model = RClass.create(FE3dModel);
   model.linkGraphicContext(context);
   model.setPoolCode(guid);
   model.setRenderable(renderable);
   o._looper.push(model);
   return model;
}
function FE3dModelConsole_allocByCode(context, code){
   var o = this;
   var model = o._pools.alloc(code);
   if(model){
      return model;
   }
   return model;
}
function FE3dModelConsole_free(model){
   var o = this;
   var code = model.poolCode();
   o._pools.free(code, model);
}
function FE3dModelDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   o._material      = null;
   o._shapes        = null;
   o.construct      = FE3dModelDisplay_construct;
   o.material       = FE3dModelDisplay_material;
   o.shapes         = FE3dModelDisplay_shapes;
   o.load           = FE3dModelDisplay_load;
   o.reloadResource = FE3dModelDisplay_reloadResource;
   o.dispose        = FE3dModelDisplay_dispose;
   return o;
}
function FE3dModelDisplay_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
}
function FE3dModelDisplay_material(){
   return this._material;
}
function FE3dModelDisplay_shapes(){
   return this._shapes;
}
function FE3dModelDisplay_load(renderable){
   var o = this;
   var material = o._material;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   var modelResource = renderable.resource();
   var resource = o._resource = modelResource.display();
   o._matrix.assign(resource.matrix());
   material.loadResource(resource.material());
   var geometryRenderables = renderable.geometrys();
   if(geometryRenderables){
      var geometryCount = geometryRenderables.count();
      var shapes = o._shapes = new TObjects();
      for(var i = 0; i < geometryCount; i++){
         var geometryRenderable = geometryRenderables.get(i);
         var shape = instanceConsole.create(EE3dInstance.ModelRenderable);
         shape.setDisplay(o);
         shape.setMaterial(material);
         shape.load(geometryRenderable);
         shapes.push(shape);
         o.pushRenderable(shape);
      }
   }
}
function FE3dModelDisplay_reloadResource(){
   var o = this;
   var resource = o._resource;
   o._matrix.assign(resource.matrix());
   o._material.loadResource(resource.material());
}
function FE3dModelDisplay_dispose(){
   var o = this;
   o._material = RObject.dispose(o._material);
   o.__base.FE3dDisplay.dispose.call(o);
}
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   o._ready            = false;
   o._materialResource = null;
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.load              = FE3dModelRenderable_load;
   return o;
}
function FE3dModelRenderable_testVisible(p){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
      }
   }
   return o._ready;
}
function FE3dModelRenderable_load(renderable){
   var o = this;
   var material = o._material;
   var materialResource = o._materialResource = renderable.material();
   if(materialResource){
      material.assignInfo(materialResource.info());
   }
   o._effectCode = material.info().effectCode;
   o._renderable = renderable;
}
function FE3dPolygon(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   return o;
}
function FE3dRectangle(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.setup                 = FE3dRectangle_setup;
   return o;
}
function FE3dRectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o._vertexPositionBuffer = p.createVertexBuffer();
   o._vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o._vertexColorBuffer = p.createVertexBuffer();
   o._vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o._indexBuffer = context.createIndexBuffer();
   o._indexBuffer.upload(id, 6);
}
function FE3dRegion(o){
   o = RClass.inherits(this, o, FRegion, MGraphicObject, MG3dRegion, MLinkerResource);
   o._backgroundColor = null;
   o.construct       = FE3dRegion_construct;
   o.backgroundColor = FE3dRegion_backgroundColor;
   o.loadResource    = FE3dRegion_loadResource;
   o.reloadResource  = FE3dRegion_reloadResource;
   o.prepare         = FE3dRegion_prepare;
   o.dispose         = FE3dRegion_dispose;
   return o;
}
function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   var camera = o._camera = RClass.create(FE3dCamera);
   camera.position().set(0, 0, -100);
   camera.lookAt(0, 0, 0);
   camera.update();
   camera.projection().update();
   var light = o._directionalLight = RClass.create(FE3dDirectionalLight);
   light.direction().set(0, -1, 0);
   var lightCamera = light.camera();
   lightCamera.position().set(10, 10, -10);
   lightCamera.lookAt(0, 0, 0);
   var backgroundColor = o._backgroundColor = new SColor4();
   backgroundColor.set(0, 0, 0, 1);
   o._calculateCameraMatrix = new SMatrix3d();
}
function FE3dRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3dRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o._camera.loadResource(p.camera());
   o._directionalLight.loadResource(p.light());
   o.reloadResource();
}
function FE3dRegion_reloadResource(){
   var o = this;
   var r = o._resource;
   var f = r.optionBackground();
   if(f){
      o._backgroundColor.assignPower(r.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}
function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   var r = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(r){
      o._changed = true;
   }
}
function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
function FE3dScene(o){
   o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
   o._ready                = false;
   o._dataReady            = false;
   o._resource             = null;
   o._dirty                = false;
   o.onProcess             = FE3dScene_onProcess;
   o.construct             = FE3dScene_construct;
   o.createRegion          = FE3dScene_createRegion;
   o.resource              = FE3dScene_resource;
   o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = FE3dScene_loadRegionResource;
   o.loadDisplayResource   = FE3dScene_loadDisplayResource;
   o.loadLayerResource     = FE3dScene_loadLayerResource;
   o.loadResource          = FE3dScene_loadResource;
   o.testReady             = FE3dScene_testReady;
   o.dirty                 = FE3dScene_dirty;
   o.processLoad           = FE3dScene_processLoad;
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}
function FE3dScene_onProcess(){
   var o = this;
   o.__base.FE3dSpace.onProcess.call(o);
   if(o._dirty){
      var s = o._region.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         r.resetInfos();
      }
      o._dirty = false;
   }
}
function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
}
function FE3dScene_createRegion(){
   return RClass.create(FE3dSceneRegion);
}
function FE3dScene_resource(p){
   return this._resource;
}
function FE3dScene_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}
function FE3dScene_loadRegionResource(p){
   var o = this;
   o._region.loadResource(p);
   var rc = p.camera();
   var rcv = rc.projection();
   var c = o.camera();
   c._resource = rc;
   var cp = c.projection();
   c.position().assign(rc.position());
   c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   c.update();
   cp.size().assign(o._graphicContext.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o.directionalLight();
   l._resource = rl;
   var lc = l._camera;
   var lp = lc._projection;
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   lc.position().assign(rlc.position());
   lc.update();
   lp.size().set(1024, 1024);
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}
function FE3dScene_loadDisplayResource(layer, resource){
   var o = this;
   var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
   display.linkGraphicContext(o);
   display.loadResource(resource);
   RConsole.find(FE3dSceneConsole).loadDisplay(display);
   layer.pushDisplay(display);
}
function FE3dScene_loadLayerResource(resource){
   var o = this;
   var layer = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneLayer);
   layer.loadResource(resource);
   var displays = resource.displays();
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         o.loadDisplayResource(layer, display);
      }
   }
   o.registerLayer(resource.code(), layer)
}
function FE3dScene_loadResource(p){
   var o = this;
   o.selectTechnique(o, FE3dGeneralTechnique);
   o.loadTechniqueResource(p.technique());
   o.loadRegionResource(p.region());
   var layers = p.layers();
   if(layers){
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.loadLayerResource(layer);
      }
   }
}
function FE3dScene_testReady(){
   return this._ready;
}
function FE3dScene_dirty(){
   this._dirty = true;
}
function FE3dScene_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   o._ready = true;
   o.processLoadListener(o);
   return true;
}
function FE3dScene_active(){
   var o = this;
   o.__base.FE3dSpace.active.call(o);
}
function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dSpace.deactive.call(o);
}
function FE3dSceneAnimation(o){
   o = RClass.inherits(this, o, FE3dAnimation);
   o._animation        = null;
   o._activeClip       = null;
   o._clips            = null;
   o.clips             = FE3dSceneAnimation_clips;
   o.pushClip          = FE3dSceneAnimation_pushClip;
   o.record            = RMethod.empty;
   o.process           = RMethod.empty;
   o.selectClip        = FE3dSceneAnimation_selectClip;
   o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
   o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
   o.reloadResource    = FE3dSceneAnimation_reloadResource;
   return o;
}
function FE3dSceneAnimation_clips(){
   return this._clips;
}
function FE3dSceneAnimation_pushClip(clip){
   var o = this;
   var clips = o._clips;
   if(!clips){
      clips = o._clips = new TDictionary();
   }
   clips.set(clip.code(), clip);
}
function FE3dSceneAnimation_selectClip(code){
   var o = this;
   var clip = o._clips.get(code);
   if(o._activeClip == clip){
      return;
   }
   var info = o._animation._playInfo;
   info.beginIndex = clip.beginIndex();
   info.endIndex = clip.endIndex();
   info.frameCount = info.endIndex - info.beginIndex + 1;
   o._animation._playRate = clip.playRate();
   o._activeClip = clip;
}
function FE3dSceneAnimation_loadAnimation(animation){
   var o = this;
   o._animation = animation;
}
function FE3dSceneAnimation_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
}
function FE3dSceneAnimation_reloadResource(){
   var o = this;
   var resource = o._resource;
   var animation = o._animation;
   animation._playRate = resource._playRate;
}
function FE3dSceneAnimationClip(o){
   o = RClass.inherits(this, o, FObject, MAttributeCode);
   o._animation  = null;
   o._beginIndex = 0;
   o._endIndex   = 0;
   o._playRate   = 1;
   o.beginIndex  = FE3dSceneAnimationClip_beginIndex;
   o.endIndex    = FE3dSceneAnimationClip_endIndex;
   o.setRange    = FE3dSceneAnimationClip_setRange;
   o.playRate    = FE3dSceneAnimationClip_playRate;
   o.setPlayRate = FE3dSceneAnimationClip_setPlayRate;
   return o;
}
function FE3dSceneAnimationClip_beginIndex(){
   return this._beginIndex;
}
function FE3dSceneAnimationClip_endIndex(){
   return this._endIndex;
}
function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
   var o = this;
   o._beginIndex = beginIndex;
   o._endIndex = endIndex;
}
function FE3dSceneAnimationClip_playRate(){
   return this._playRate;
}
function FE3dSceneAnimationClip_setPlayRate(rate){
   this._playRate = rate;
}
function FE3dSceneCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeSpace           = null;
   o._captureStatus         = false;
   o._capturePosition       = null;
   o._captureCameraPosition = null;
   o._captureCameraRotation = null;
   o._actionFullScreen      = false;
   o._actionPlay            = false;
   o._actionMovie           = false;
   o._actionUp              = false;
   o._actionDown            = false;
   o._actionForward         = false;
   o._actionBack            = false;
   o._cameraMoveRate        = 0.4;
   o._cameraKeyRotation     = 0.03;
   o._cameraMouseRotation   = 0.005;
   o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
   o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
   o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
   o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
   o.onDataLoaded           = FE3dSceneCanvas_onDataLoaded;
   o.onResize               = FE3dSceneCanvas_onResize;
   o.construct              = FE3dSceneCanvas_construct;
   o.testPlay               = FE3dSceneCanvas_testPlay;
   o.switchPlay             = FE3dSceneCanvas_switchPlay;
   o.testMovie              = FE3dSceneCanvas_testMovie;
   o.switchMovie            = FE3dSceneCanvas_switchMovie;
   o.doAction               = FE3dSceneCanvas_doAction;
   o.loadByGuid             = FE3dSceneCanvas_loadByGuid;
   o.loadByCode             = FE3dSceneCanvas_loadByCode;
   o.dispose                = FE3dSceneCanvas_dispose;
   return o;
}
function FE3dSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var st = s.timer();
   var ss = st.spanSecond();
   var c = s.camera();
   var d = o._cameraMoveRate * ss;
   var r = o._cameraKeyRotation * ss;
   var kw = RKeyboard.isPress(EStageKey.Forward);
   var ks = RKeyboard.isPress(EStageKey.Back);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var kq = RKeyboard.isPress(EStageKey.Up);
   var ke = RKeyboard.isPress(EStageKey.Down);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var ka = RKeyboard.isPress(EStageKey.RotationLeft);
   var kd = RKeyboard.isPress(EStageKey.RotationRight);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kz = RKeyboard.isPress(EStageKey.RotationUp);
   var kw = RKeyboard.isPress(EStageKey.RotationDown);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FE3dSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}
function FE3dSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeSpace.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}
function FE3dSceneCanvas_onMouseCaptureStop(p){
}
function FE3dSceneCanvas_onTouchStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      o._captureStatus = true;
      o._capturePosition.set(t.clientX, t.clientY);
      o._captureCameraPosition.assign(s.camera().position());
      o._captureCameraRotation.assign(s.camera().rotation());
   }
}
function FE3dSceneCanvas_onTouchMove(p){
   var o = this;
   if(!o._captureStatus){
      return;
   }
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      var cm = o._activeSpace.camera();
      var cr = cm.rotation();
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}
function FE3dSceneCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}
function FE3dSceneCanvas_onDataLoaded(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeSpace;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   var gr = s._region._resource;
   o._cameraMoveRate = gr.moveSpeed();
   o._cameraKeyRotation = gr.rotationKeySpeed();
   o._cameraMouseRotation = gr.rotationMouseSpeed();
   var event = new SEvent(o);
   event.space = s;
   o.processLoadListener(event);
   event.dispose();
}
function FE3dSceneCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeSpace;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
function FE3dSceneCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
   o._captureCameraRotation = new SVector3();
}
function FE3dSceneCanvas_testPlay(){
   return this._actionPlay;
}
function FE3dSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
   o._actionPlay = p;
}
function FE3dSceneCanvas_testMovie(){
   return this._actionMovie;
}
function FE3dSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
   o._actionMovie = p;
}
function FE3dSceneCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   e.preventDefault();
   o._actionUp = false;
   o._actionDown = false;
   o._actionForward = false;
   o._actionBack = false;
   switch(p){
      case 'fullscreen':
         var v = o._actionFullScreen = !o._actionFullScreen;
         RHtml.fullscreen(o._hPanel, v);
         break;
      case 'play':
         o.switchMovie(!o._actionMovie);
         o.switchPlay(o._actionMovie);
         break;
      case 'up':
         o._actionUp = f;
         break;
      case 'down':
         o._actionDown = f;
         break;
      case 'forward':
         o._actionForward = f;
         break;
      case 'back':
         o._actionBack = f;
         break;
   }
}
function FE3dSceneCanvas_loadByGuid(guid){
   var o = this;
   var sceneConsole = RConsole.find(FE3dSceneConsole);
   if(o._activeSpace){
      sceneConsole.free(o._activeSpace);
   }
   var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
   scene.addLoadListener(o, o.onDataLoaded);
   RStage.register('canvas.space', scene);
}
function FE3dSceneCanvas_loadByCode(code){
   var o = this;
   var sceneConsole = RConsole.find(FE3dSceneConsole);
   if(o._activeSpace){
      sceneConsole.free(o._activeSpace);
   }
   var scene = o._activeSpace = sceneConsole.allocByCode(o._graphicContext, code);
   scene.addLoadListener(o, o.onDataLoaded);
   RStage.register('canvas.space', scene);
}
function FE3dSceneCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FE3dCanvas.dispose.call(o);
}
function FE3dSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadDisplays = null;
   o._loadScenes   = null;
   o._pools        = null;
   o._thread       = null;
   o._interval     = 100;
   o.onProcess     = FE3dSceneConsole_onProcess;
   o.construct     = FE3dSceneConsole_construct;
   o.scenes        = FE3dSceneConsole_scenes;
   o.loadDisplay   = FE3dSceneConsole_loadDisplay;
   o.allocByGuid   = FE3dSceneConsole_allocByGuid;
   o.allocByCode   = FE3dSceneConsole_allocByCode;
   o.free          = FE3dSceneConsole_free;
   return o;
}
function FE3dSceneConsole_onProcess(){
   var o = this;
   var displays = o._loadDisplays;
   displays.record();
   while(displays.next()){
      var display = displays.current();
      if(display.processLoad()){
         displays.removeCurrent();
      }
   }
   var scenes = o._loadScenes;
   scenes.record();
   while(scenes.next()){
      var scene = scenes.current();
      if(scene.processLoad()){
         scenes.removeCurrent();
      }
   }
}
function FE3dSceneConsole_construct(){
   var o = this;
   o._loadDisplays = new TLooper();
   o._loadScenes = new TLooper();
   o._pools = RClass.create(FObjectPools);
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}
function FE3dSceneConsole_scenes(){
   return this._scenes;
}
function FE3dSceneConsole_loadDisplay(display){
   this._loadDisplays.push(display);
}
function FE3dSceneConsole_allocByGuid(context, guid){
   var o = this;
   var scene = o._pools.alloc(guid);
   if(scene){
      return scene;
   }
   var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
   scene = RClass.create(FE3dScene);
   scene.linkGraphicContext(context);
   scene.setResource(resource);
   scene._poolCode = guid;
   scene.setup();
   o._loadScenes.push(scene);
   return scene;
}
function FE3dSceneConsole_allocByCode(context, code){
   var o = this;
   var scene = o._pools.alloc(code);
   if(scene){
      return scene;
   }
   var resource = RConsole.find(FE3sSceneConsole).loadByCode(code);
   scene = RClass.create(FE3dScene);
   scene.linkGraphicContext(context);
   scene.setResource(resource);
   scene._poolCode = code;
   scene.setup();
   o._loadScenes.push(scene);
   return scene;
}
function FE3dSceneConsole_free(scene){
   var o = this;
   var code = scene._poolCode;
   o._pools.free(code, scene);
}
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._parentMaterials  = null;
   o._movies           = null;
   o._template         = null;
   o._sprite           = null;
   o.construct         = FE3dSceneDisplay_construct;
   o.meshRenderables   = FE3dSceneDisplay_meshRenderables;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
   o.processLoad       = FE3dSceneDisplay_processLoad;
   o.clone             = FE3dSceneDisplay_clone;
   return o;
}
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}
function FE3dSceneDisplay_meshRenderables(){
   var o = this;
   var sprite = o._template.sprite();
   return sprite.meshRenderables();
}
function FE3dSceneDisplay_loadResource(resource){
   var o = this;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   o._resource = resource;
   o._code = resource.code();
   o._matrix.assign(resource.matrix());
   var movieResources = resource.movies();
   if(movieResources){
      var movieCount = movieResources.count();
      var movies = o._movies = new TObjects();
      for(var i = 0; i < movieCount; i++){
         var movieResource = movieResources.at(i);
         var movie = instanceConsole.create(EE3dInstance.SceneMovie);
         movie.loadResource(movieResource);
         movies.push(movie);
      }
   }
   var materialResources = resource.materials();
   if(materialResources){
      var materialCount = materialResources.count();
      var materials = o._materials = new TDictionary();
      var parentMaterials = o._parentMaterials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var materialResource = materialResources.at(i);
         var material = instanceConsole.create(EE3dInstance.SceneMaterial);
         material._display = o;
         material.loadSceneResource(materialResource);
         materials.set(materialResource.guid(), material);
         parentMaterials.set(materialResource.parentGuid(), material);
      }
   }
   var templateGuid = resource.templateGuid();
   o._template = RConsole.find(FE3dTemplateConsole).allocByGuid(o, templateGuid);
}
function FE3dSceneDisplay_loadTemplate(template){
   var o = this;
   var resource = o._resource;
   var sprites = template._sprites;
   if(sprites){
      var count = sprites.count();
      for(var i = 0; i < count; i++){
         var sprite = sprites.at(i);
         sprite.matrix().identity();
      }
   }
   var materials = o._materials;
   var parentMaterials = o._parentMaterials;
   var sprite = o._sprite = template.sprite();
   var renderables = sprite.renderables();
   var count = renderables.count();
   for(var n = 0; n < count; n++){
      var renderable = renderables.at(n);
      var material = renderable.material();
      var materialGuid = material.guid();
      var displayMaterial = parentMaterials.get(materialGuid);
      if(displayMaterial){
         displayMaterial.loadParent(material);
         displayMaterial.reloadResource();
         renderable.setMaterial(displayMaterial);
      }
   }
   o.pushDisplay(sprite);
   var animations = sprite.animations();
   if(animations){
      var animationCount = animations.count();
      for(var n = 0; n < animationCount; n++){
         var animation = animations.at(n);
         var animationResource = animation.resource();
         var animationGuid = animationResource.guid();
         var sceneAnimationResource = resource.findAnimation(animationGuid);
         if(!sceneAnimationResource){
            sceneAnimationResource = resource.syncAnimation(animationGuid);
            sceneAnimationResource._guid = animationResource._guid;
            sceneAnimationResource._code = animationResource._code;
            sceneAnimationResource._label = animationResource._label;
         }
         var sceneAnimation = RClass.create(FE3dSceneAnimation);
         sceneAnimation.loadAnimation(animation);
         sceneAnimation.loadSceneResource(sceneAnimationResource);
         sceneAnimation.reloadResource();
         o.pushAnimation(sceneAnimation);
      }
   }
}
function FE3dSceneDisplay_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   var template = o._template;
   if(!template.testReady()){
      return false;
   }
   o.loadTemplate(template);
   o._ready = true;
   o.processLoadListener(o);
   return true;
}
function FE3dSceneDisplay_clone(){
}
function FE3dSceneDisplayMovie(o){
   o = RClass.inherits(this, o, FObject);
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   o.loadResource = FE3dSceneDisplayMovie_loadResource;
   o.process      = FE3dSceneDisplayMovie_process;
   return o;
}
function FE3dSceneDisplayMovie_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}
function FE3dSceneDisplayMovie_process(p){
   var o = this;
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
   }
   var ct = RTimer.current();
   var sp = ct - o._lastTick;
   if(sp > o._interval){
      var c = o._resource.code();
      if(c == 'rotation'){
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
   return o;
}
function FE3dSceneDisplayRenderable_loadMaterial(material){
   var o = this;
   o._materialReference = material;
   o._material.calculate(material);
}
function FE3dSceneDisplayRenderable_reloadResource(){
   var o = this;
   var material = o._material;
   material.calculate(o._materialReference);
   material.update();
}
function FE3dSceneLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer, MLinkerResource);
   o.makeLabel    = FE3dSceneLayer_makeLabel;
   o.loadResource = FE3dSceneLayer_loadResource;
   o.process      = FE3dSceneLayer_process;
   return o;
}
function FE3dSceneLayer_makeLabel(){
   var o = this;
   var resource = o.resource();
   var code = resource.code();
   var label = resource.label();
   if(label){
      return code + '[' + label + ']';
   }
   return code;
}
function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}
function FE3dSceneLayer_process(p){
   var o = this;
   o.__base.FDisplayLayer.process.call(o, p)
   var c = o._resource.transformCd();
   if(c){
      if(c == EDisplayTransform.CameraPosition){
         var cp = p.camera().position();
         o._matrix.setTranslate(cp.x, cp.y, cp.z);
         o._matrix.update();
      }
   }
}
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FE3dMaterial);
   o._display          = null;
   o._parentMaterial   = null;
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = FE3dSceneMaterial_reloadResource;
   return o;
}
function FE3dSceneMaterial_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
   o.reloadResource();
}
function FE3dSceneMaterial_reloadResource(){
   var o = this;
   o.calculate(o._resource);
   o.update();
}
function FE3dSceneRegion(o){
   o = RClass.inherits(this, o, FE3dRegion);
   o._resource      = null;
   o.construct      = FE3dSceneRegion_construct;
   o.resource       = FE3dSceneRegion_resource;
   o.loadResource   = FE3dSceneRegion_loadResource;
   o.reloadResource = FE3dSceneRegion_reloadResource;
   o.dispose        = FE3dSceneRegion_dispose;
   return o;
}
function FE3dSceneRegion_construct(){
   var o = this;
   o.__base.FE3dRegion.construct.call(o);
}
function FE3dSceneRegion_resource(){
   return this._resource;
}
function FE3dSceneRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o.reloadResource();
}
function FE3dSceneRegion_reloadResource(){
   var o = this;
   var r = o._resource;
   var f = r.optionBackground();
   if(f){
      o._backgroundColor.assignPower(r.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}
function FE3dSceneRegion_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FE3dRegion.dispose.call(o);
}
function FE3dSimpleCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeSpace           = null;
   o._captureStatus         = false;
   o._capturePosition       = null;
   o._captureCameraPosition = null;
   o._captureCameraRotation = null;
   o._actionFullScreen      = false;
   o._actionPlay            = false;
   o._actionMovie           = false;
   o._actionUp              = false;
   o._actionDown            = false;
   o._actionForward         = false;
   o._actionBack            = false;
   o._cameraMoveRate        = 0.4;
   o._cameraKeyRotation     = 0.03;
   o._cameraMouseRotation   = 0.005;
   o.onEnterFrame           = FE3dSimpleCanvas_onEnterFrame;
   o.onMouseCaptureStart    = FE3dSimpleCanvas_onMouseCaptureStart;
   o.onMouseCapture         = FE3dSimpleCanvas_onMouseCapture;
   o.onMouseCaptureStop     = FE3dSimpleCanvas_onMouseCaptureStop;
   o.onTouchStart           = FE3dSimpleCanvas_onTouchStart;
   o.onTouchMove            = FE3dSimpleCanvas_onTouchMove;
   o.onTouchStop            = FE3dSimpleCanvas_onTouchStop;
   o.onSceneLoad            = FE3dSimpleCanvas_onSceneLoad;
   o.onResize               = FE3dSimpleCanvas_onResize;
   o.construct              = FE3dSimpleCanvas_construct;
   o.switchPlay             = FE3dSimpleCanvas_switchPlay;
   o.switchMovie            = FE3dSimpleCanvas_switchMovie;
   o.doAction               = FE3dSimpleCanvas_doAction;
   o.dispose                = FE3dSimpleCanvas_dispose;
   return o;
}
function FE3dSimpleCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var c = s.camera();
   var d = o._cameraMoveRate;
   var r = o._cameraKeyRotation;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FE3dSimpleCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}
function FE3dSimpleCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeSpace.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}
function FE3dSimpleCanvas_onMouseCaptureStop(p){
}
function FE3dSimpleCanvas_onTouchStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      o._captureStatus = true;
      o._capturePosition.set(t.clientX, t.clientY);
      o._captureCameraPosition.assign(s.camera().position());
      o._captureCameraRotation.assign(s.camera().rotation());
   }
}
function FE3dSimpleCanvas_onTouchMove(p){
   var o = this;
   if(!o._captureStatus){
      return;
   }
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      var cm = o._activeSpace.camera();
      var cr = cm.rotation();
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}
function FE3dSimpleCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}
function FE3dSimpleCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeSpace;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   var gr = s._region._resource;
   o._cameraMoveRate = gr.moveSpeed();
   o._cameraKeyRotation = gr.rotationKeySpeed();
   o._cameraMouseRotation = gr.rotationMouseSpeed();
   o.processLoadListener(o, s);
}
function FE3dSimpleCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeSpace;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
function FE3dSimpleCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
   o._captureCameraRotation = new SVector3();
}
function FE3dSimpleCanvas_switchPlay(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
   o._actionPlay = p;
}
function FE3dSimpleCanvas_switchMovie(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
   o._actionMovie = p;
}
function FE3dSimpleCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   e.preventDefault();
   o._actionUp = false;
   o._actionDown = false;
   o._actionForward = false;
   o._actionBack = false;
   switch(p){
      case 'fullscreen':
         var v = o._actionFullScreen = !o._actionFullScreen;
         RHtml.fullscreen(o._hPanel, v);
         break;
      case 'play':
         o.switchMovie(!o._actionMovie);
         o.switchPlay(o._actionMovie);
         break;
      case 'up':
         o._actionUp = f;
         break;
      case 'down':
         o._actionDown = f;
         break;
      case 'forward':
         o._actionForward = f;
         break;
      case 'back':
         o._actionBack = f;
         break;
   }
}
function FE3dSimpleCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FE3dCanvas.dispose.call(o);
}
function FE3dSimpleStage(o){
   o = RClass.inherits(this, o, FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = null;
   o._mapLayer       = null;
   o._spriteLayer    = null;
   o._faceLayer      = null;
   o.construct       = FE3dSimpleStage_construct;
   o.skyLayer        = FE3dSimpleStage_skyLayer;
   o.mapLayer        = FE3dSimpleStage_mapLayer;
   o.spriteLayer     = FE3dSimpleStage_spriteLayer;
   o.faceLayer       = FE3dSimpleStage_faceLayer;
   o.active          = FE3dSimpleStage_active;
   o.deactive        = FE3dSimpleStage_deactive;
   return o;
}
function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('SkyLayer', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('MapLayer', l);
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('SpriteLayer', l);
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('FaceLayer', l);
}
function FE3dSimpleStage_skyLayer(){
   return this._skyLayer;
}
function FE3dSimpleStage_mapLayer(){
   return this._mapLayer;
}
function FE3dSimpleStage_spriteLayer(){
   return this._spriteLayer;
}
function FE3dSimpleStage_faceLayer(){
   return this._faceLayer;
}
function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
function FE3dSpace(o){
   o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
   o._dataReady            = false;
   o._resource             = null;
   o._materials            = null;
   o._dirty                = false;
   o.onProcess             = FE3dSpace_onProcess;
   o.construct             = FE3dSpace_construct;
   o.linkGraphicContext    = FE3dSpace_linkGraphicContext;
   o.createRegion          = FE3dSpace_createRegion;
   o.resource              = FE3dSpace_resource;
   o.findMaterial          = FE3dSpace_findMaterial;
   o.materials             = FE3dSpace_materials;
   o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
   o.loadRegionResource    = FE3dSpace_loadRegionResource;
   o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
   o.loadLayerResource     = FE3dSpace_loadLayerResource;
   o.loadResource          = FE3dSpace_loadResource;
   o.commitResource        = FE3dSpace_commitResource;
   o.dirty                 = FE3dSpace_dirty;
   o.processLoad           = FE3dSpace_processLoad;
   o.active                = FE3dSpace_active;
   o.deactive              = FE3dSpace_deactive;
   return o;
}
function FE3dSpace_onProcess(){
   var o = this;
   o.__base.FE3dStage.onProcess.call(o);
   if(o._dirty){
      var s = o._region.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         r.resetInfos();
      }
      o._dirty = false;
   }
}
function FE3dSpace_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   o._materials = new TDictionary();
}
function FE3dSpace_linkGraphicContext(context){
   var o = this;
   o.__base.FE3dStage.linkGraphicContext.call(o, context);
   o._region.linkGraphicContext(context);
}
function FE3dSpace_createRegion(){
   return RClass.create(FE3dRegion);
}
function FE3dSpace_resource(p){
   return this._resource;
}
function FE3dSpace_findMaterial(guid){
   return this._materials.get(guid);
}
function FE3dSpace_materials(p){
   return this._materials;
}
function FE3dSpace_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}
function FE3dSpace_loadRegionResource(p){
   var o = this;
   o._region.loadResource(p);
   var rc = p.camera();
   var rcv = rc.projection();
   var camera = o.camera();
   camera.projection().size().assign(o._graphicContext.size());
   camera.loadResource(rc);
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o.directionalLight();
   l._resource = rl;
   var lc = l._camera;
   var lp = lc._projection;
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   lc.position().assign(rlc.position());
   lc.update();
   lp.size().set(1024, 1024);
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}
function FE3dSpace_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   pl.pushDisplay(d3);
}
function FE3dSpace_loadLayerResource(p){
   var o = this;
   var l = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Layer);
   l.loadResource(p);
   var s = p.displays();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         o.loadDisplayResource(l, d);
      }
   }
   o.registerLayer(p.code(), l)
}
function FE3dSpace_loadResource(resource){
   var o = this;
   o._resource = resource;
   o.loadTechniqueResource(resource.technique());
   o.loadRegionResource(resource.region());
   var materialResources = resource.materials();
   if(materialResources){
      var materialCount = materialResources.count();
      var materialConsole = RConsole.find(FE3rMaterialConsole);
      for(var i = 0; i < materialCount; i++){
         var materialResource = materialResources.at(i);
         var materialGuid = materialResource.guid();
         var material = materialConsole.load(o, materialGuid);
         o._materials.set(materialGuid, material);
      }
   }
   var layers = resource.layers();
   if(layers){
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.loadLayerResource(layer);
      }
   }
}
function FE3dSpace_commitResource(){
   var o = this;
   var camera = o._region.camera();
   camera.commitResource();
}
function FE3dSpace_dirty(){
   this._dirty = true;
}
function FE3dSpace_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   o.processLoadListener(o);
   return true;
}
function FE3dSpace_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
function FE3dSpace_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
function FE3dSphere(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._outline              = null;
   o._splitCount           = 8;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dSphere_construct;
   o.splitCount            = FE3dSphere_splitCount;
   o.setSplitCount         = FE3dSphere_setSplitCount;
   o.setup                 = FE3dSphere_setup;
   return o;
}
function FE3dSphere_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
   o._outline = new SOutline3();
}
function FE3dSphere_splitCount(){
   return this._splitCount;
}
function FE3dSphere_setSplitCount(count){
   this._splitCount = count;
}
function FE3dSphere_setup(){
   var o = this;
   var context = o._graphicContext;
   var positions = new TArray();
   var normals = new TArray();
   var cr = o._splitCount * 2;
   var cz = o._splitCount;
   var stepr = Math.PI * 2 / cr;
   var stepz = Math.PI / cz;
   var count = 0;
   for(var rz = 0; rz <= cz; rz++){
      for(var r = 0; r < cr; r++){
         var radius = stepr * r - Math.PI;
         var radiusZ = stepz * rz - RConst.PI_2;
         var x = Math.sin(radius) * Math.cos(radiusZ);
         var y = Math.sin(radiusZ);
         var z = -Math.cos(radius) * Math.cos(radiusZ);
         positions.push(x, y, z);
         normals.push(x, y, z);
         count++;
      }
   }
   o._vertexCount = count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer._name = 'position';
   buffer._formatCd = EG3dAttributeFormat.Float3;
   buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
   o._vertexBuffers.set(buffer._name, buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer._name = 'normal';
   buffer._formatCd = EG3dAttributeFormat.Float3;
   buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
   o._vertexBuffers.set(buffer._name, buffer);
   var indexes = new TArray();
   for(var rz = 0; rz < cz; rz++){
      for(var r = 0; r < cr; r++){
         var i = cr * rz;
         var ci = i + r;
         var ni = i + r + cr;
         if(r == cr - 1){
            indexes.push(ci, ni, i);
            indexes.push(ni, i + cr, i);
         }else{
            indexes.push(ci, ni, ci + 1);
            indexes.push(ni, ni + 1, ci + 1);
         }
      }
   }
   var ib = o._indexBuffer = context.createIndexBuffer();
   ib.upload(new Uint16Array(indexes.memory()), indexes.length());
   o.update();
   var info = o.material().info();
   info.ambientColor.set(0.2, 0.2, 0.2, 1);
   info.diffuseColor.set(0.8, 0.8, 0.8, 1);
   info.specularColor.set(0.8, 0.8, 0.8, 1);
   info.specularLevel = 64;
}
function FE3dSprite(o){
   o = RClass.inherits(this, o, FE3dDisplayContainer, MGraphicObject, MLinkerResource);
   o._dataReady       = false;
   o._ready           = false;
   o._shapes          = null;
   o._skeletons       = null;
   o._animations      = null;
   o._resource        = null;
   o.construct        = FE3dSprite_construct;
   o.testReady        = FE3dSprite_testReady;
   o.makeLabel        = FE3dSprite_makeLabel;
   o.findMeshByCode   = FE3dSprite_findMeshByCode;
   o.meshRenderables  = FE3dSprite_shapes;
   o.skeletons        = FE3dSprite_skeletons;
   o.pushSkeleton     = FE3dSprite_pushSkeleton;
   o.findAnimation    = FE3dSprite_findAnimation;
   o.animations       = FE3dSprite_animations;
   o.pushAnimation    = FE3dSprite_pushAnimation;
   o.loadSkeletons    = FE3dSprite_loadSkeletons;
   o.linkAnimation    = FE3dSprite_linkAnimation;
   o.loadAnimations   = FE3dSprite_loadAnimations;
   o.loadResource     = FE3dSprite_loadResource;
   o.reloadResource   = FE3dSprite_reloadResource;
   o.load             = FE3dSprite_load;
   o.updateMatrix     = FE3dSprite_updateMatrix;
   o.selectClip       = FE3dSprite_selectClip;
   o.process          = FE3dSprite_process;
   o.dispose          = FE3dSprite_dispose;
   return o;
}
function FE3dSprite_construct(){
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   o._shapes = new TObjects();
}
function FE3dSprite_testReady(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         if(!shape.testReady()){
            return false;
         }
      }
   }
   return true;
}
function FE3dSprite_makeLabel(){
   var o = this;
   var resource = o.resource();
   var code = resource.code();
   var label = resource.label();
   if(label){
      return code + '[' + label + ']';
   }
   return code;
}
function FE3dSprite_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dSprite_shapes(){
   return this._shapes;
}
function FE3dSprite_skeletons(){
   return this._skeletons;
}
function FE3dSprite_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = p;
   }
   r.set(p._resource.guid(), p);
}
function FE3dSprite_findAnimation(guid){
   var animations = this._animations;
   return animations ? animations.get(guid) : null;
}
function FE3dSprite_animations(){
   return this._animations;
}
function FE3dSprite_pushAnimation(animation){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new TDictionary();
   }
   var animationResource = animation.resource();
   animations.set(animationResource.guid(), animation);
}
function FE3dSprite_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
         var s = RClass.create(FE3rSkeleton);
         s.loadResource(r);
         o.pushSkeleton(s);
      }
   }
}
function FE3dSprite_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.getAt(i);
      var mc = t._resource._meshCode;
      if(mc){
         var m = o.findMeshByCode(mc);
         m._activeTrack = t;
      }
   }
}
function FE3dSprite_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
         var a = o.findAnimation(r.guid());
         if(a){
            continue;
         }
         var a = null;
         if(r.skeleton()){
            a = RClass.create(FE3rSkeletonAnimation);
         }else{
            a = RClass.create(FE3rMeshAnimation);
         }
         a._display = o;
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}
function FE3dSprite_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
   var renderableResources = resource.renderables();
   var renderableCount = renderableResources.count();
   if(renderableCount > 0){
      var shapes = o._shapes;
      for(var i = 0; i < renderableCount; i++){
         var renderableResource = renderableResources.at(i);
         var renderable = RClass.create(FE3dTemplateRenderable);
         renderable._display = o;
         renderable.linkGraphicContext(o);
         renderable.loadResource(renderableResource);
         shapes.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}
function FE3dSprite_reloadResource(){
   var o = this;
   var s = o._shapes;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dSprite_load(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         shapes.at(i).load();
      }
   }
}
function FE3dSprite_updateMatrix(region){
   var o = this;
   var matrix = o._currentMatrix.identity();
   var movies = o._movies;
   if(movies){
      if(o._optionMovie){
         var c = movies.count();
         for(var i = 0; i < c; i++){
            var movie = movies.at(i);
            movie.process(o._movieMatrix);
         }
      }
      matrix.append(o._movieMatrix);
   }
   matrix.append(o._matrix);
   var parent = o._parent;
   if(parent){
      o._currentMatrix.append(parent._currentMatrix);
   }
}
function FE3dSprite_selectClip(code){
   var o = this;
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.selectClip(code);
      }
   }
}
function FE3dSprite_process(region){
   var o = this;
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.record();
      }
   }
   o.__base.FE3dDisplayContainer.process.call(o, region);
   var skeleton = o._activeSkeleton;
   if(skeleton && animations){
      var count = animations.count();
      for(var i = 0; i < count; i++){
         var animation = animations.at(i);
         animation.process(skeleton);
      }
   }
}
function FE3dSprite_dispose(){
   var o = this;
   o._shapes = RObject.dispose(o._shapes);
   o.__base.FE3dDisplayContainer.dispose.call(o);
}
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FE3dSpace, MGraphicObject, MListenerLoad);
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   o._sprites         = null;
   o._skeletons       = null;
   o._animations      = null;
   o._resource        = null;
   o.construct        = FE3dTemplate_construct;
   o.testReady        = FE3dTemplate_testReady;
   o.sprite           = FE3dTemplate_sprite;
   o.findMeshByCode   = FE3dTemplate_findMeshByCode;
   o.meshRenderables  = FE3dTemplate_sprites;
   o.skeletons        = FE3dTemplate_skeletons;
   o.pushSkeleton     = FE3dTemplate_pushSkeleton;
   o.findAnimation    = FE3dTemplate_findAnimation;
   o.animations       = FE3dTemplate_animations;
   o.pushAnimation    = FE3dTemplate_pushAnimation;
   o.visible          = FE3dTemplate_visible;
   o.setVisible       = FE3dTemplate_setVisible;
   o.resource         = FE3dTemplate_resource;
   o.setResource      = FE3dTemplate_setResource;
   o.loadSkeletons    = FE3dTemplate_loadSkeletons;
   o.linkAnimation    = FE3dTemplate_linkAnimation;
   o.loadAnimations   = FE3dTemplate_loadAnimations;
   o.loadResource     = FE3dTemplate_loadResource;
   o.reloadResource   = FE3dTemplate_reloadResource;
   o.processLoad      = FE3dTemplate_processLoad;
   o.process          = FE3dTemplate_process;
   o.dispose          = FE3dTemplate_dispose;
   return o;
}
function FE3dTemplate_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', layer);
   o._sprites = new TObjects();
}
function FE3dTemplate_testReady(){
   return this._ready;
}
function FE3dTemplate_sprite(){
   return this._sprites.first();
}
function FE3dTemplate_findMeshByCode(p){
   var s = this._sprites;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dTemplate_sprites(){
   return this._sprites;
}
function FE3dTemplate_skeletons(){
   return this._skeletons;
}
function FE3dTemplate_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = p;
   }
   r.set(p._resource.guid(), p);
}
function FE3dTemplate_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}
function FE3dTemplate_animations(){
   return this._animations;
}
function FE3dTemplate_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TDictionary();
   }
   var pr = p.resource();
   r.set(pr.guid(), p);
}
function FE3dTemplate_visible(){
   return this.sprite().visible();
}
function FE3dTemplate_setVisible(visible){
   this.sprite().setVisible(visible);
}
function FE3dTemplate_resource(p){
   return this._resource;
}
function FE3dTemplate_setResource(p){
   this._resource = p;
}
function FE3dTemplate_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
         var s = RClass.create(FE3rSkeleton);
         s.loadResource(r);
         o.pushSkeleton(s);
      }
   }
}
function FE3dTemplate_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.getAt(i);
      var mc = t._resource._meshCode;
      if(mc){
         var m = o.findMeshByCode(mc);
         m._activeTrack = t;
      }
   }
}
function FE3dTemplate_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.getAt(i);
         var a = o.findAnimation(r.guid());
         if(a){
            continue;
         }
         var a = null;
         if(r.skeleton()){
            a = RClass.create(FE3rSkeletonAnimation);
         }else{
            a = RClass.create(FE3rMeshAnimation);
         }
         a._display = o;
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}
function FE3dTemplate_loadResource(resource){
   var o = this;
   var technique = o.selectTechnique(o, FE3dGeneralTechnique);
   technique.setResource(resource.technique());
   o.__base.FE3dSpace.loadResource.call(o, resource);
   var displayResources = resource.displays();
   if(displayResources){
      var displayCount = displayResources.count();
      if(displayCount > 0){
         for(var i = 0; i < displayCount; i++){
            var displayResource = displayResources.at(i);
            var display = RClass.create(FE3dTemplateDisplay);
            display._parent = o;
            display.linkGraphicContext(o);
            display.loadResource(displayResource);
            o._sprites.push(display);
         }
      }
   }
}
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._sprites;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dTemplate_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   if(!o._dataReady){
      var resource = o._resource;
      if(!resource.testReady()){
         return false;
      }
      o.loadResource(resource);
      o._dataReady = true;
   }
   var sprites = o._sprites;
   if(sprites){
      var spriteCount = sprites.count();
      for(var i = 0; i < spriteCount; i++){
         var sprite = sprites.at(i);
         if(!sprite.testReady()){
            return false;
         }
      }
      for(var i = 0; i < spriteCount; i++){
         var sprite = sprites.at(i);
         sprite.load();
         o._layer.pushDisplay(sprite);
      }
   }
   var animations = o._animations;
   if(animations){
      var animationCount = animations.count();
      for(var i = 0; i < animationCount; i++){
         var animation = animations.at(i);
         if(animation.resource().skeleton() == null){
            o.linkAnimation(animation);
         }
      }
   }
   o._ready = true;
   o.processLoadListener(o);
   return o._ready;
}
function FE3dTemplate_process(event){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
}
function FE3dTemplate_dispose(){
   var o = this;
   o._sprites = RObject.dispose(o._sprites);
   o.__base.FE3dSpace.dispose.call(o);
}
function FE3dTemplateCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeTemplate     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = FDsSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
   o.onResize            = FE3dTemplateCanvas_onResize;
   o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
   o.construct           = FE3dTemplateCanvas_construct;
   o.build               = FE3dTemplateCanvas_build;
   o.load                = FE3dTemplateCanvas_load;
   o.setPanel            = FE3dTemplateCanvas_setPanel;
   o.dispose             = FE3dTemplateCanvas_dispose;
   return o;
}
function FE3dTemplateCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var c = s.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FE3dTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var r = o._activeTemplate.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
function FE3dTemplateCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeTemplate.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}
function FE3dTemplateCanvas_onMouseCaptureStop(p){
}
function FE3dTemplateCanvas_onResize(){
   var o = this;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   var c = o._context;
   c.setViewport(0, 0, w, h);
}
function FE3dTemplateCanvas_onTemplateLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeTemplate;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   o.processLoadListener(o, s);
}
function FE3dTemplateCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureRotation = new SVector3();
}
function FE3dTemplateCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   var c = o._context = REngine3d.createContext(FWglContext, h);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   RWindow.lsnsResize.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dTemplateCanvas_load(p){
   var o = this;
   var c = o._context;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeTemplate != null){
      sc.free(o._activeTemplate);
   }
   var s = sc.alloc(o._context, p);
   s.addLoadListener(o, o.onTemplateLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeTemplate = s;
   RStage.register('stage3d', s);
}
function FE3dTemplateCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE3dTemplateCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FObject.dispose.call(o);
}
function FE3dTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadQueue  = null;
   o._pools      = null;
   o._thread     = null;
   o._interval   = 200;
   o.onProcess   = FE3dTemplateConsole_onProcess;
   o.construct   = FE3dTemplateConsole_construct;
   o.allocByGuid = FE3dTemplateConsole_allocByGuid;
   o.allocByCode = FE3dTemplateConsole_allocByCode;
   o.free        = FE3dTemplateConsole_free;
   return o;
}
function FE3dTemplateConsole_onProcess(){
   var o = this;
   var looper = o._loadQueue;
   looper.record();
   while(looper.next()){
      var template = looper.current();
      if(template.processLoad()){
         looper.removeCurrent();
      }
   }
}
function FE3dTemplateConsole_construct(){
   var o = this;
   o._loadQueue = new TLooper();
   o._pools = RClass.create(FObjectPools);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dTemplateConsole_allocByGuid(context, guid){
   var o = this;
   var template = o._pools.alloc(guid);
   if(template){
      return template;
   }
   var resource = RConsole.find(FE3sTemplateConsole).loadByGuid(guid);
   template = RClass.create(FE3dTemplate);
   template.linkGraphicContext(context);
   template.setResource(resource);
   template._poolCode = guid;
   o._loadQueue.push(template);
   return template;
}
function FE3dTemplateConsole_allocByCode(context, code){
   var o = this;
   var template = o._pools.alloc(code);
   if(template){
      return template;
   }
   var resource = RConsole.find(FE3sTemplateConsole).loadByCode(code);
   template = RClass.create(FE3dTemplate);
   template.linkGraphicContext(context);
   template.setResource(resource);
   template._poolCode = code;
   o._loadQueue.push(template);
   return template;
}
function FE3dTemplateConsole_free(template){
   var o = this;
   var code = template._poolCode;
   o._pools.free(code, template);
}
function FE3dTemplateDisplay(o){
   o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
   o._dataReady       = false;
   o._ready           = false;
   o._shapes          = null;
   o._skeletons       = null;
   o.construct        = FE3dTemplateDisplay_construct;
   o.testReady        = FE3dTemplateDisplay_testReady;
   o.findMeshByCode   = FE3dTemplateDisplay_findMeshByCode;
   o.meshRenderables  = FE3dTemplateDisplay_shapes;
   o.skeletons        = FE3dTemplateDisplay_skeletons;
   o.pushSkeleton     = FE3dTemplateDisplay_pushSkeleton;
   o.loadSkeletons    = FE3dTemplateDisplay_loadSkeletons;
   o.linkAnimation    = FE3dTemplateDisplay_linkAnimation;
   o.loadAnimations   = FE3dTemplateDisplay_loadAnimations;
   o.loadResource     = FE3dTemplateDisplay_loadResource;
   o.reloadResource   = FE3dTemplateDisplay_reloadResource;
   o.load             = FE3dTemplateDisplay_load;
   o.dispose          = FE3dTemplateDisplay_dispose;
   return o;
}
function FE3dTemplateDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._shapes = new TObjects();
}
function FE3dTemplateDisplay_testReady(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         if(!shape.testReady()){
            return false;
         }
      }
   }
   return true;
}
function FE3dTemplateDisplay_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dTemplateDisplay_shapes(){
   return this._shapes;
}
function FE3dTemplateDisplay_skeletons(){
   return this._skeletons;
}
function FE3dTemplateDisplay_pushSkeleton(skeleton){
   var o = this;
   var resource = skeleton.resource();
   var skeletonGuid = resource.guid();
   var skeletons = o._skeletons;
   if(!skeletons){
      skeletons = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = skeleton;
   }
   skeletons.set(skeletonGuid, skeleton);
}
function FE3dTemplateDisplay_loadSkeletons(skeletonResources){
   var o = this;
   var count = skeletonResources.count();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var skeletonResource = skeletonResources.at(i);
         var skeleton = RClass.create(FE3rSkeleton);
         skeleton.loadResource(skeletonResource);
         o.pushSkeleton(skeleton);
      }
   }
}
function FE3dTemplateDisplay_linkAnimation(animation){
   var o = this;
   var tracks = animation.tracks();
   var count = tracks.count();
   for(var i = 0; i < count; i++){
      var track = tracks.at(i);
      var meshCode = track._resource._meshCode;
      if(meshCode){
         var mesh = o.findMeshByCode(meshCode);
         mesh._activeTrack = track;
      }
   }
}
function FE3dTemplateDisplay_loadAnimations(animationResources){
   var o = this;
   var animationCount = animationResources.count();
   for(var i = 0; i < animationCount; i++){
      var animationResource = animationResources.at(i);
      var guid = animationResource.guid();
      var animation = o.findAnimation(guid);
      if(animation){
         continue;
      }
      if(animationResource.skeleton()){
         animation = RClass.create(FE3rSkeletonAnimation);
      }else{
         animation = RClass.create(FE3rMeshAnimation);
      }
      animation._display = o;
      animation.loadResource(animationResource);
      o.pushAnimation(animation);
   }
}
function FE3dTemplateDisplay_loadResource(resource){
   var o = this;
   o._resource = resource;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   o._matrix.assign(resource.matrix());
   var renderableResources = resource.renderables();
   if(renderableResources){
      var shapes = o._shapes;
      var renderableCount = renderableResources.count();
      for(var i = 0; i < renderableCount; i++){
         var renderableResource = renderableResources.at(i);
         var renderable = instanceConsole.create(EE3dInstance.TemplateRenderable);
         renderable._display = o;
         renderable.linkGraphicContext(o);
         renderable.loadResource(renderableResource);
         shapes.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}
function FE3dTemplateDisplay_reloadResource(){
   var o = this;
   var s = o._shapes;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dTemplateDisplay_load(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         shape.load();
      }
   }
   var animations = o._animations;
   if(animations){
      var animationCount = animations.count();
      for(var i = 0; i < animationCount; i++){
         var animation = animations.at(i);
         if(animation.resource().skeleton() == null){
            o.linkAnimation(animation);
         }
      }
   }
}
function FE3dTemplateDisplay_dispose(){
   var o = this;
   o._shapes = RObject.dispose(o._shapes);
   o.__base.FE3dSprite.dispose.call(o);
}
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
   o._ready            = false;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FE3dTemplateRenderable_construct;
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
   o.loadResource      = FE3dTemplateRenderable_loadResource;
   o.reloadResource    = FE3dTemplateRenderable_reloadResource;
   o.load              = FE3dTemplateRenderable_load;
   o.dispose           = FE3dTemplateRenderable_dispose;
   return o;
}
function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}
function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._model.testReady()){
         return false;
      }
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            if(material){
               if(!material.testReady()){
                  return false;
               }
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
function FE3dTemplateRenderable_testVisible(p){
   var o = this;
   var r = false;
   if(o._ready){
      r = o.__base.FE3dMeshRenderable.testVisible.call(o);
   }
   return r;
}
function FE3dTemplateRenderable_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
   var modelGuid = resource.modelGuid();
   o._model = RConsole.find(FE3rModelConsole).load(o, modelGuid);
   var materialGuid = resource.materialGuid();
   if(!RString.isEmpty(materialGuid)){
      var material = o._material = o._materialReference = RConsole.find(FE3rMaterialConsole).load(o, materialGuid);
      o._materialResource = material.resource();
      o.pushMaterial(material);
   }
   var template = o._display._parent;
   var materialRefers = resource.materialRefers();
   if(materialRefers){
      var count = materialRefers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = materialRefers.at(i);
         var materialGuid = materialRefer.guid();
         var material = template.findMaterial(materialGuid);
         o.pushMaterial(material);
         o._material = material;
      }
   }
   if(!o._material){
      o._material = o._materialReference = RClass.create(FE3dMaterial);
   }
}
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var material = o._material;
   material.calculate(o._materialResource);
   material.update();
}
function FE3dTemplateRenderable_load(){
   var o = this;
   var display = o._display;
   var resource = o._resource;
   var modelResource = resource.model();
   var bitmaps = o._material.bitmaps();
   if(bitmaps){
      var count = bitmaps.count();
      for(var i = 0; i < count; i++){
         var bitmap = bitmaps.at(i);
         o.pushTexture(bitmap);
      }
   }
   var skeletonResources = modelResource.skeletons();
   if(skeletonResources){
      display.loadSkeletons(skeletonResources);
   }
   var animationResources = modelResource.animations();
   if(animationResources){
      display.loadAnimations(animationResources);
   }
   var meshResource = resource.mesh();
   var meshGuid = resource.meshGuid();
   var renderable = o._renderable = RConsole.find(FE3rModelConsole).findMesh(meshGuid);
   var vertexBuffers = renderable.vertexBuffers();
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      o._vertexBuffers.set(vertexBuffer._name, vertexBuffer);
   }
   var skins = renderable.skins();
   if(skins){
      var displaySkeleton = display._activeSkeleton;
      var skin = o._activeSkin = skins.first();
      var streams = skin.streams();
      var streamCount = streams.count();
      for(var i = 0; i < streamCount; i++){
         var stream = streams.at(i);
         var buffer = stream.buffer();
         o._vertexBuffers.set(buffer._name, buffer);
      }
      var skinResource = skin.resource();
      var boneReferResources = skinResource.boneRefers();
      var c = boneReferResources.count();
      if(c > 0){
         var bones = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var boneReferResource = boneReferResources.at(i);
            var boneReferIndex = boneReferResource.index();
            var bone = displaySkeleton.bones().get(boneReferIndex);
            if(!bone){
               throw new TError(o, 'Bone is not exist.');
            }
            bones.push(bone);
         }
      }
   }
   o._ready = true;
}
function FE3dTemplateRenderable_dispose(){
   var o = this;
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
function FE3dMeshMergeProcessor(o){
   o = RClass.inherits(this, o, FProcessor);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FE3dMeshMergeProcessor_name;
   return o;
}
function FE3dMeshMergeProcessor_name(){
   return this._name;
}
function FE3dProcessServer(o){
   o = RClass.inherits(this, o, FProcessServer);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FE3dProcessServer_name;
   return o;
}
function FE3dProcessServer_name(){
   return this._name;
}
var server = RClass.create(FE3dProcessServer);
server.registerProcessor('engine3d.mesh.merge', RClass.create(FE3dMeshMergeProcessor));
server.process();
