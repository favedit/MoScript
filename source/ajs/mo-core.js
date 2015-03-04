var MO = new function MO(){
   return this;
}
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
   o.Global = 4;
   return o;
}
var RRuntime = new function RRuntime(){
   var o = this;
   o._processCd    = EProcess.Release;
   o._supportHtml5 = false;
   o._nextUid      = 1;
   o.construct     = RRuntime_construct;
   o.isDebug       = RRuntime_isDebug;
   o.isRelease     = RRuntime_isRelease;
   o.setProcessCd  = RRuntime_setProcessCd;
   o.supportHtml5  = RRuntime_supportHtml5;
   o.nvl           = RRuntime_nvl;
   o.subString     = RRuntime_subString;
   o.className     = RRuntime_className;
   o.construct();
   return o;
}
function RRuntime_construct(){
   var o = this;
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
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
function APtyBoolean(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value    = v ? v : false;
   o.build    = APtyBoolean_build;
   o.load     = APtyBoolean_load;
   o.save     = APtyBoolean_save;
   o.toString = APtyBoolean_toString;
   return o;
}
function APtyBoolean_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = RBoolean.parse(x.get(o._linker));
}
function APtyBoolean_save(v, x){
   var o = this;
   var d = v[o._name];
   if(d){
      x.set(o._linker, RBoolean.toString(d));
   }
}
function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyConfig(n, l){
   var o = this;
   AProperty.call(o, n, l);
   o.force = true;
   o.load  = APtyConfig_load;
   o.save  = RMethod.empty;
   return o;
}
function APtyConfig_load(v, x){
   v[this.name] = x;
}
function APtyEnum(n, l, e, d){
   var o = this;
   AProperty.call(o, n, l);
   o._enum    = e;
   o._default = d;
   o.build    = APtyEnum_build;
   o.load     = APtyEnum_load;
   o.save     = APtyEnum_save;
   o.toString = APtyEnum_toString;
   return o;
}
function APtyEnum_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._default;
   }
}
function APtyEnum_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
function APtyEnum_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
function APtyEnum_toString(){
   var o = this;
   return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
}
function APtyInteger(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value   = RInteger.nvl(v);
   o.build    = APtyInteger_build;
   o.toString = APtyInteger_toString;
   return o;
}
function APtyInteger_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyNumber(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value   = RInteger.nvl(v);
   o.build    = APtyNumber_build;
   o.toString = APtyNumber_toString;
   return o;
}
function APtyNumber_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyNumber_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyPadding(n, l, vl, vt, vr, vb){
   var o = this;
   AProperty.call(o, n, l);
   o._left    = RInteger.nvl(vl);
   o._top     = RInteger.nvl(vt);
   o._right   = RInteger.nvl(vr);
   o._bottom  = RInteger.nvl(vb);
   o.load     = APtyPadding_load;
   o.save     = APtyPadding_save;
   o.toString = APtyPadding_toString;
   return o;
}
function APtyPadding_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPadding_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
function APtyPoint2(n, l, x, y){
   var o = this;
   AProperty.call(o, n, l);
   o._x       = RInteger.nvl(x);
   o._y       = RInteger.nvl(y);
   o.load     = APtyPoint2_load;
   o.save     = APtyPoint2_save;
   o.toString = APtyPoint2_toString;
   return o;
}
function APtyPoint2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPoint2_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
function APtySet(n, l, s, v){
   var o = this;
   AProperty.call(o, n, l);
   o._search = s;
   o._value  = v;
   o.build    = APtySet_build;
   o.load     = APtySet_load;
   o.save     = APtySet_save;
   o.toString = APtySet_toString;
   return o;
}
function APtySet_build(v){
   var o = this;
   if(v[o.name] == null){
      v[o.name] = o._value;
   }
}
function APtySet_load(v, x){
   var o = this;
   v[o.name] = RSet.containsString(x.get(o.linker), o.search);
}
function APtySet_save(v, x){
   var o = this;
   var n = o.name;
   var vs = v[n];
   var xs = x.get(o.linker);
   var e = RSet.containsString(xs, o._search);
   if(vs && !e){
      x.set(n, vs + o._search);
   }else if(!v && e){
      x.set(n, RString.remove(vs, o._search));
   }
}
function APtySet_toString(){
   var o = this;
   return 'linker=' + o.linker + ',value=' + o._value + ',search=' + o._search;
}
function APtySize2(n, l, w, h){
   var o = this;
   AProperty.call(o, n, l);
   o._width   = RInteger.nvl(w);
   o._height  = RInteger.nvl(h);
   o.load     = APtySize2_load;
   o.save     = APtySize2_save;
   o.toString = APtySize2_toString;
   return o;
}
function APtySize2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtySize2_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
function APtyString(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value    = v ? v : null;
   o.build    = APtyString_build;
   o.toString = APtyString_toString;
   return o;
}
function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
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
   o.Failure  =  -1;
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
   o.abstract       = false;
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
            o.abstract = true;
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
      if(o.abstract){
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
   o._name = x.get('name');
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
   v.datasetName = o._name;
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
   r.append(RClass._name(o));
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
function TNode(){
   var o = this;
   o._name        = 'Node';
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
   o.node         = TNode_node;
   o.nodes        = TNode_nodes;
   o.get          = TNode_get;
   o.set          = TNode_set;
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
function TNode_node(n){
   var s = this._nodes;
   return s ? s.get(n) : null;
}
function TNode_nodes(){
   var o = this;
   var r = o._nodes;
   if(!r){
      r = o._nodes = new TObjects();
   }
   return r;
}
function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}
function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
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
   if(node._attributes){
      var count = node._attributes.count;
      dump.append(' [', count, ':');
      for(var n=0; n<count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(node._attributes.name(n), '=', node._attributes.value(n));
         if(n < count-1){
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
   if(node._nodes){
      var count = node._nodes.count;
      dump.append('\n');
      for(var n = 0; n < count; n++){
         node._nodes.get(n).dump(dump, space + '   ');
         if(n < count-1){
            dump.append('\n');
         }
      }
   }
   return dump;
}
function TNode_dump(d, space){
   d = RString.nvlStr(d);
   return this.innerDump(d, this, space);
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
   for(var n=0; n<c; n++){
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
   o.start      = new Date().getTime();
   o.callerName = RMethod.name(TSpeed.caller);
   o.reset      = TSpeed_reset;
   o.begin      = TSpeed_begin;
   o.end        = TSpeed_end;
   o.record     = TSpeed_record
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
   o._span = o._end - o._start;
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
function FObject_innerDump(s, l){
   s.append(RClass.dump(this));
}
function FObject_dump(){
   var r = new TString();
   this.innerDump(r, 0);
   return r.flush();
}
function FObjectPool(o){
   o = RClass.inherits(this, o, FObject);
   o._items    = null;
   o._frees    = null;
   o.construct = FObjectPool_construct;
   o.hasFree   = FObjectPool_hasFree;
   o.alloc     = FObjectPool_alloc;
   o.free      = FObjectPool_free;
   o.push      = FObjectPool_push;
   o.dispose   = FObjectPool_dispose;
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
function FObjectPool_alloc(p){
   var o = this;
   var r = null;
   if(!o._frees.isEmpty()){
      r = o._frees.pop();
   }
   return r;
}
function FObjectPool_free(p){
   var o = this;
   o._frees.push(p);
}
function FObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}
function FObjectPool_dispose(){
   var o = this;
   if(o._items){
      o._items.dispose();
      o._items = null;
   }
   if(o._frees){
      o._frees.dispose();
      o._frees = null;
   }
   o.__base.FObject.dispose.call(o);
}
var RArray = new function RArray(){
   var o = this;
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
      while(a[++s] < t);
      while(a[--e] > t);
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
function RBoolean_toString(v){
   return v ? EBoolean.True : EBoolean.False;
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
   eval(n + '(c.clazz)');
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
var RContext = new function(){
   var o = this;
   o.optionGarbage = true;
   o._location     = null;
   o._contexts     = new Object();
   o.contextPath   = null;
   o.contextTag    = null;
   o.themeId       = null;
   o.languageId    = null;
   o.construct     = RContext_construct;
   o.initialize    = RContext_initialize;
   o.get           = RContext_get;
   o.find          = RContext_find;
   o.location      = RContext_location;
   o.context       = RContext_context;
   o.construct();
   return o;
}
function RContext_construct(){
   var o = this;
   if(window.ActiveXObject){
      o.optionGarbage = true;
   }else{
      o.optionGarbage = false;
   }
}
function RContext_location(s){
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
function RContext_context(s){
   var o = this;
   if(s != null){
      if(RString.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(RString.startsWith(s, '#')){
         return o.contextPath + o.contextTag + s.substr(1);
      }
      return o.contextPath + s;
   }
   return o.contextPath;
}
function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new TContext(n, nc, v);
      }
   }
}
function RContext_get(p, p1, p2, p3, p4, p5){
   var o = this;
   var r = o._contexts[p];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (path={1})', p);
   }
   return RString.format(r.text, p1, p2, p3, p4, p5)
}
function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (id={1})', id);
   }
   return r.text;
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
var RFile = new function(){
   var o = this;
   o.pictures  = ['jpg', 'png', 'gif', 'bmp'];
   o.knowns    = ['jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'vsd', 'xls', 'xlsx'];
   o.inPicture = RFile_inPicture;
   o.isPicture = RFile_isPicture;
   o.isKnown   = RFile_isKnown;
   o.extend    = RFile_extend;
   RMemory.register('RFile', o);
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
   return this.inPicture(this.extend(v));
}
function RFile_isKnown(v){
   var o = this;
   v = o.extend(v).toLowerCase();
   for(var n in o.knowns){
      if(o.knowns[n] == v){
         return true;
      }
   }
   return false;
}
function RFile_extend(v){
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
   o.fill      = RFloat_fill;
   o.copy      = RFloat_copy;
   return o;
}
function RFloat_isFloat(p){
   return RString.isPattern(p, 'n');
}
function RFloat_parse(p){
   if(p == null){
      return 0;
   }
   if(p == ''){
      return 0;
   }
   var v = RString.trim(p.toString());
   while(true){
      if(v.charAt(0) != "0"){
         break;
      }
      v = v.substr(1);
   }
   var r = (v.length > 0) ? parseFloat(v) : 0;
   if(RString.findChars(v, '%') != -1){
      r = r / 100;
   }
   return isNaN(r) ? 0 : r;
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
      r = 7;
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
   o.nvl        = RInteger_nvl;
   o.parse      = RInteger_parse;
   o.format     = RInteger_format;
   o.toRange    = RInteger_toRange;
   o.sum        = RInteger_sum;
   o.calculate  = RInteger_calculate;
   return o;
}
function RInteger_isInt(v){
   return RString.isPattern(v, 'n');
}
function RInteger_nvl(v, d){
   return v ? v : (d ? d : 0);
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
      if('0' != v.charAt(0)){
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
function RInteger_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   if(isNaN(v)){
      v = 0;
   }
   if(v < i){
      v = i;
   }
   if(v > a){
      v = a;
   }
   return v;
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
function RLogger_error(self, method, msg, params){
   if(this._statusError){
      return;
   }
   this._statusError = true;
   throw new Error(msg);
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
   alert(m);
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
function RMethod_name(p){
   if(p){
      if(typeof(p) == 'function'){
         if(p.__name){
            return p.__name;
         }
         var s = p.toString();
         var n = p.__name = RString.mid(s, 'function ', '(');
         return n;
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
function RObject_free(p){
   if(p){
      if(RRuntime.isDebug()){
         for(var n in p){
            if((n == '__base') || (n == '__inherits') || (n == '__class')){
               p[n] = null;
               continue;
            }
            var v = p[n];
            if(v != null){
               if(!RClass.isBaseType(v.constructor)){
                  throw new TError(RObject, 'Free object is not base object.');
               }
               p[n] = null;
            }
         }
      }else{
         for(var n in p){
            p[n] = null;
         }
      }
   }
}
function RObject_dispose(p){
   if(p){
      p.dispose();
   }
   return null;
}
function RObject_release(p){
   if(p){
      for(var n in p){
         var v = p[n];
         if(typeof(v) == 'Object'){
            RObject.release(v)
         }
         p[n] = null;
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
      p = p.replace(/\n/g, RInt.NUMBER);
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
            if(s.indexOf(f) == 01){
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
function SColor4_toString(){
   var o = this;
   return o.red + ',' + o.green + ',' + o.blue + ',' + o.alpha;
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
   o.radius = Math.sqrt((o.minX - o.minY) * (o.minX - o.minY) + (o.minZ - o.maxX) * (o.minZ - o.maxX) + (o.maxY - o.maxZ) * (o.maxY - o.maxZ)) * 0.5;
}
function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn;
   var zfar = pvf;
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
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
   var fov = Math.tan(RMath.DEGREE_RATE * pva * 0.5);
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
   var ps = o.planes;
   for(var i = 0; i < EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(p[ 0], p[ 1], p[ 2]) >= 0){
         continue;
      }
      if(p.dot(p[ 3], p[ 4], p[ 5]) >= 0){
         continue;
      }
      if(p.dot(p[ 6], p[ 7], p[ 8]) >= 0){
         continue;
      }
      if(p.dot(p[ 9], p[10], p[11]) >= 0){
         continue;
      }
      if(p.dot(p[12], p[13], p[14]) >= 0){
         continue;
      }
      if(p.dot(p[15], p[16], p[17]) >= 0){
         continue;
      }
      if(p.dot(p[18], p[19], p[20]) >= 0){
         continue;
      }
      if(p.dot(p[21], p[22], p[23]) >= 0){
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
   pn.a = p[4 * 0 + 2];
   pn.b = p[4 * 1 + 2];
   pn.c = p[4 * 2 + 2];
   pn.d = p[4 * 3 + 2];
   pn.normalize();
   var pf = ps[EFrustumPlane.Far];
   pf.a = p[4 * 0 + 3] - p[4 * 0 + 2];
   pf.b = p[4 * 1 + 3] - p[4 * 1 + 2];
   pf.c = p[4 * 2 + 3] - p[4 * 2 + 2];
   pf.d = p[4 * 3 + 3] - p[4 * 3 + 2];
   pf.normalize();
   var pl = ps[EFrustumPlane.Left];
   pl.a = p[4 * 0 + 3] + p[4 * 0 + 0];
   pl.b = p[4 * 1 + 3] + p[4 * 1 + 0];
   pl.c = p[4 * 2 + 3] + p[4 * 2 + 0];
   pl.d = p[4 * 3 + 3] + p[4 * 3 + 0];
   pl.normalize();
   var pr = ps[EFrustumPlane.Right];
   pr.a = p[4 * 0 + 3] - p[4 * 0 + 0];
   pr.b = p[4 * 1 + 3] - p[4 * 1 + 0];
   pr.c = p[4 * 2 + 3] - p[4 * 2 + 0];
   pr.d = p[4 * 3 + 3] - p[4 * 3 + 0];
   pr.normalize();
   var pt = ps[EFrustumPlane.Top];
   pt.a = p[4 * 0 + 3] - p[4 * 0 + 1];
   pt.b = p[4 * 1 + 3] - p[4 * 1 + 1];
   pt.c = p[4 * 2 + 3] - p[4 * 2 + 1];
   pt.d = p[4 * 3 + 3] - p[4 * 3 + 1];
   pt.normalize();
   var pb = ps[EFrustumPlane.Bottom];
   pb.a = p[4 * 0 + 3] + p[4 * 0 + 1];
   pb.b = p[4 * 1 + 3] + p[4 * 1 + 1];
   pb.c = p[4 * 2 + 3] + p[4 * 2 + 1];
   pb.d = p[4 * 3 + 3] + p[4 * 3 + 1];
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
   var v = RMath.float9;
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
   var v = RMath.float9;
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
   var v = RMath.float9;
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
   var v = RMath.float9;
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
   var v = RValue.float9;
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
   o.translate       = SMatrix4x4_translate;
   o.rotationX       = SMatrix4x4_rotationX;
   o.rotationY       = SMatrix4x4_rotationY;
   o.rotationZ       = SMatrix4x4_rotationZ;
   o.rotation        = SMatrix4x4_rotation;
   o.scale           = SMatrix4x4_scale;
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
   var v = RMath.identity4x4;
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
   var v = RMath.identity4x4;
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
function SMatrix4x4_translate(x, y, z){
   var v = RMath.float16;
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
function SMatrix4x4_rotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
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
function SMatrix4x4_rotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
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
function SMatrix4x4_rotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.float16;
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
function SMatrix4x4_rotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = RMath.float16;
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
function SMatrix4x4_scale(x, y, z){
   var v = RMath.float16;
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
   var v = RValue.float16;
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
   o.assign      = SOutline3_assign;
   o.serialize   = SOutline3_serialize
   o.unserialize = SOutline3_unserialize
   o.toString    = SOutline3_toString;
   return o;
}
function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
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
   o.a         = 0.0;
   o.b         = 0.0;
   o.c         = 0.0;
   o.d         = 0.0;
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
   var r = 1.0 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}
function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + d;
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
function SSize2(w, h){
   var o = this;
   o.width    = RInteger.nvl(w);
   o.height   = RInteger.nvl(h);
   o.isEmpty  = SSize2_isEmpty;
   o.square   = SSize2_square;
   o.assign   = SSize2_assign;
   o.set      = SSize2_set;
   o.parse    = SSize2_parse;
   o.toString = SSize2_toString;
   o.dispose  = SSize2_dispose;
   o.dump     = SSize2_dump;
   return o;
}
function SSize2_isEmpty(){
   var o = this;
   return (o.width == 0) && (o.height == 0);
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
   o.assign      = SValue3_assign;
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
function SValue3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
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
   o.PI             = Math.PI;
   o.PI2            = Math.PI * 2;
   o.RADIAN_RATE    = 180 / Math.PI;
   o.DEGREE_RATE    = Math.PI / 180;
   o.PERCENT_10     = 1 / 10;
   o.PERCENT_100    = 1 / 100;
   o.PERCENT_1000   = 1 / 1000;
   o.vectorAxisX    = null;
   o.vectorAxisY    = null;
   o.vectorAxisZ    = null;
   o.vectorScale    = null;
   o.vectorForward  = null;
   o.vectorBackward = null;
   o.identity4x4    = null;
   o.construct      = RMath_construct;
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
   o.identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
var RValue = new function RValue(){
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
   o.vector3   = null;
   o.rectangle = null;
   o.matrix    = null;
   o.construct = RValue_construct;
   o.construct();
   return o;
}
function RValue_construct(){
   var o = this;
   if(RRuntime.supportHtml5()){
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
   o.vector3 = new SVector3();
   o.rectangle = new SRectangle();
   o.matrix = new SMatrix3d();
}
function AEvent(n, l, h){
   var o = this;
   AAnnotation.call(o, n);
   o._annotationCd = EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.linker        = AEvent_linker;
   o.handle        = AEvent_handle;
   o.value         = AEvent_value;
   o.create        = AEvent_create;
   o.attach        = RMethod.empty;
   o.bind          = AEvent_bind;
   o.toString      = AEvent_toString;
   return o;
}
function AEvent_linker(){
   return this._linker;
}
function AEvent_handle(){
   return this._handle;
}
function AEvent_value(){
   return this._process;
}
function AEvent_create(){
   return new SEvent();
}
function AEvent_bind(h, u){
   var o = this;
   if(u){
      h.addEventListener(o._linker, REvent.ohEvent, true);
   }else{
      h[o._handle] = REvent.ohEvent;
   }
}
function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
function AEventBlur(n, m){
   var o = this;
   AEvent.call(o, n, 'blur', 'onblur');
   o.attach = AEventBlur_attach;
   return o;
}
function AEventBlur_attach(e, h){
}
function AEventChange(n){
   var o = this;
   AEvent.call(o, n, 'change', 'onchange');
   o.attach = AEventChange_attach;
   return o;
}
function AEventChange_attach(e, h){
}
function AEventClick(n){
   var o = this;
   AEvent.call(o, n, 'click', 'onclick');
   o.attach = AEventClick_attach;
   return o;
}
function AEventClick_attach(e, h){
}
function AEventDoubleClick(n){
   var o = this;
   AEvent.call(o, n, 'dblclick', 'ondblclick');
   o.attach = AEventDoubleClick_attach;
   return o;
}
function AEventDoubleClick_attach(e, h){
}
function AEventFocus(n){
   var o = this;
   AEvent.call(o, n, 'focus', 'onfocus');
   o.attach = AEventFocus_attach;
   return o;
}
function AEventFocus_attach(e, h){
}
function AEventInputChanged(n){
   var o = this;
   AEvent.call(o, n, 'input', 'oninput');
   o.attach = AEventInputChanged_attach;
   o.bind   = AEventInputChanged_bind;
   return o;
}
function AEventInputChanged_attach(e, h){
}
function AEventInputChanged_bind(h, u){
   var o = this;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      h.onpropertychange = REvent.ohEvent;
   }else{
      h.addEventListener('input', REvent.ohEvent);
   }
}
function AEventKeyDown(n){
   var o = this;
   AEvent.call(o, n, 'keydown', 'onkeydown');
   o.attach = AEventKeyDown_attach;
   return o;
}
function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
function AEventKeyPress(n){
   var o = this;
   AEvent.call(o, n, 'keypress', 'onkeypress');
   o.create = AEventKeyPress_create;
   o.attach = AEventKeyPress_attach;
   return o;
}
function AEventKeyPress_create(){
   return new SKeyboardEvent();
}
function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
function AEventKeyUp(n){
   var o = this;
   AEvent.call(o, n, 'keyup', 'onkeyup');
   o.attach = AEventKeyUp_attach;
   return o;
}
function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
function AEventLoad(n){
   var o = this;
   AEvent.call(o, n, 'load', 'onload');
   o.attach = AEventLoad_attach;
   return o;
}
function AEventLoad_attach(e, h){
}
function AEventMouse(n, l, h){
   var o = this;
   AEvent.call(o, n, l, h);
   o.attach = AEventMouse_attach;
   return o;
}
function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == EMouseButton.Left);
   e.mouseMiddle = (h.button == EMouseButton.Middle);
   e.mouseRight = (h.button == EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
      e.offsetX = h.layerX;
      e.offsetY = h.layerY;
   }else{
      e.x = h.x;
      e.y = h.y;
      e.offsetX = h.offsetX;
      e.offsetY = h.offsetY;
   }
   e.clientX = h.clientX;
   e.clientY = h.clientY;
}
function AEventMouseDown(n){
   var o = this;
   AEventMouse.call(o, n, 'mousedown', 'onmousedown');
   return o;
}
function AEventMouseEnter(n){
   var o = this;
   AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   o._logger = false;
   o.attach  = AEventMouseEnter_attach;
   return o;
}
function AEventMouseEnter_attach(e, h){
}
function AEventMouseLeave(n){
   var o = this;
   AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   o._logger = false;
   o.attach  = AEventMouseLeave_attach;
   return o;
}
function AEventMouseLeave_attach(e, h){
}
function AEventMouseMove(n){
   var o = this;
   AEventMouse.call(o, n, 'mousemove', 'onmousemove');
   o._logger = false;
   return o;
}
function AEventMouseOut(n){
   var o = this;
   AEvent.call(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOut_attach;
   return o;
}
function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseOver(n){
   var o = this;
   AEvent.call(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOver_attach;
   return o;
}
function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseUp(n){
   var o = this;
   AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
function AEventMouseWheel(n){
   var o = this;
   AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   o.attach = AEventMouseWheel_attach;
   return o;
}
function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
function AEventReadyStateChange(n){
   var o = this;
   AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
   o.attach = AEventReadyStateChange_attach;
   return o;
}
function AEventReadyStateChange_attach(e, h){
}
function AEventResize(n){
   var o = this;
   AEvent.call(o, n, 'resize', 'onresize');
   o.attach = AEventResize_attach;
   return o;
}
function AEventResize_attach(e, h){
   e.x = h.x;
   e.y = h.y;
}
function AEventScroll(n){
   var o = this;
   AEvent.call(o, n, 'scroll', 'onscroll');
   o.attach = AEventScroll_attach;
   return o;
}
function AEventScroll_attach(e, h){
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
var EDataType = new function EDataType(){
   var o = this;
   o.Unknown =  0;
   o.Boolean =  1;
   o.Int8    =  2;
   o.Int16   =  3;
   o.Int32   =  4;
   o.Int64   =  5;
   o.Uint8   =  6;
   o.Uint16  =  7;
   o.Uint32  =  8;
   o.Uint64  =  9;
   o.Float   = 10;
   o.Double  = 11;
   o.String  = 12;
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
   o.Enter       = 2;
   o.Leave       = 3;
   o.Focus       = 4;
   o.Blur        = 5;
   o.Click       = 6;
   o.DoubleClick = 7;
   o.ItemClick   = 8;
   o.Selected    = 9;
   o.DataChanged = 10;
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
var ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 0;
   o.Window = 1;
   o.Linux = 2;
   o.Android = 3;
   o.Apple = 4;
   return o;
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
   o.readBoolean  = FByteStream_readBoolean;
   o.readInt8     = FByteStream_readInt8;
   o.readInt16    = FByteStream_readInt16;
   o.readInt32    = FByteStream_readInt32;
   o.readInt64    = FByteStream_readInt64;
   o.readUint8    = FByteStream_readUint8;
   o.readUint16   = FByteStream_readUint16;
   o.readUint32   = FByteStream_readUint32;
   o.readUint64   = FByteStream_readUint64;
   o.readFloat    = FByteStream_readFloat;
   o.readDouble   = FByteStream_readDouble;
   o.readString   = FByteStream_readString;
   o.readBytes    = FByteStream_readBytes;
   o.writeBoolean = FByteStream_writeBoolean;
   o.writeInt8    = FByteStream_writeInt8;
   o.writeInt16   = FByteStream_writeInt16;
   o.writeInt32   = FByteStream_writeInt32;
   o.writeInt64   = FByteStream_writeInt64;
   o.writeUint8   = FByteStream_writeUint8;
   o.writeUint16  = FByteStream_writeUint16;
   o.writeUint32  = FByteStream_writeUint32;
   o.writeUint64  = FByteStream_writeUint64;
   o.writeFloat   = FByteStream_writeFloat;
   o.writeDouble  = FByteStream_writeDouble;
   o.writeString  = FByteStream_writeString;
   return o;
}
function FByteStream_readBoolean(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return r > 0;
}
function FByteStream_readInt8(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_readInt16(){
   var o = this;
   var r = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readInt32(){
   var o = this;
   var r = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readInt64(){
   var o = this;
   var r = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readUint8(){
   var o = this;
   var r = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_readUint16(){
   var o = this;
   var r = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_readUint32(){
   var o = this;
   var r = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readUint64(){
   var o = this;
   var r = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readFloat(){
   var o = this;
   var r = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_readDouble(){
   var o = this;
   var r = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_readString(){
   var o = this;
   var l = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   var r = new TString();
   for(var i = 0; i < l; i++){
      var v = o._viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      r.push(String.fromCharCode(v));
   }
   return r.toString();
}
function FByteStream_readBytes(pd, po, pl){
   var o = this;
   if(pl <= 0){
      return;
   }
   if(po != 0){
      throw new TError('Unsupport.');
   }
   if(pl % 8 == 0){
      var a = new Float64Array(pd);
      var c = pl >> 3;
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getFloat64(o._position, o._endianCd);
         o._position += 8;
      }
      return;
   }
   if(pl % 4 == 0){
      var c = pl >> 2;
      var a = new Uint32Array(pd);
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getUint32(o._position, o._endianCd);
         o._position += 4;
      }
      return;
   }
   if(pl % 2 == 0){
      var c = pl >> 1;
      var a = new Uint16Array(pd);
      for(var i = 0; i < c; i++){
         a[i] = o._viewer.getUint16(o._position, o._endianCd);
         o._position += 2;
      }
      return;
   }
   var a = new Uint8Array(pd);
   for(var i = 0; i < pl; i++){
      a[i] = o._viewer.getUint8(o._position++, o._endianCd);
   }
}
function FByteStream_writeBoolean(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, (v > 0) ? 1 : 0, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_writeInt8(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, v, o._endianCd);
   o._position++;
   return r;
}
function FByteStream_writeInt16(v){
   var o = this;
   var r = o._viewer.setInt16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeInt32(v){
   var o = this;
   var r = o._viewer.setInt32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeInt64(v){
   var o = this;
   var r = o._viewer.setInt64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeUint8(v){
   var o = this;
   var r = o._viewer.setUint8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}
function FByteStream_writeUint16(v){
   var o = this;
   var r = o._viewer.setUint16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}
function FByteStream_writeUint32(v){
   var o = this;
   var r = o._viewer.setUint32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeUint64(v){
   var o = this;
   var r = o._viewer.setUint64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeFloat(v){
   var o = this;
   var r = o._viewer.setFloat32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}
function FByteStream_writeDouble(v){
   var o = this;
   var r = o._viewer.setDouble(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
function FByteStream_writeString(v){
   var o = this;
   var l = v.length;
   o._viewer.setUint16(o._position, l, o._endianCd);
   o._position += 2;
   for(var i = 0; i < l; i++){
      o._viewer.setUint16(o._position, v.charCodeAt(i), o._endianCd)
      o._position += 2;
   }
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
   o._listeners      = null;
   o.addListener     = MListener_addListener;
   o.removeListener  = MListener_removeListener;
   o.processListener = MListener_processListener;
   o.dispose         = MListener_dispose;
   return o;
}
function MListener_addListener(n, w, m){
   var o = this;
   var lss = o._listeners;
   if(!lss){
      lss = o._listeners = new TDictionary();
   }
   var ls = lss.get(n);
   if(!ls){
      ls = new TListeners();
      lss.set(n, ls);
   }
   return ls.register(w, m);
}
function MListener_removeListener(n, w, m){
   var o = this;
   var lss = o._listeners;
   var ls = lss.get(n);
   return ls.unregister(w, m);
}
function MListener_processListener(n, p1, p2, p3, p4, p5){
   var o = this;
   var lss = o._listeners;
   if(lss){
      var ls = lss.get(n);
      if(ls){
         ls.process(p1, p2, p3, p4, p5);
      }
   }
}
function MListener_dispose(){
   var o = this;
   var lss = o._listeners;
   if(lss){
      for(var i = lss.count() - 1; i >= 0; i--){
         lss.valueAt(i).dispose();
      }
      o._listeners = RObject.dispose(lss);
   }
}
function MListenerLoad(o){
   o = RClass.inherits(this, o, MListener);
   o.addLoadListener     = MListenerLoad_addLoadListener;
   o.processLoadListener = MListenerLoad_processLoadListener;
   return o;
}
function MListenerLoad_addLoadListener(w, m){
   return this.addListener(EEvent.Load, w, m);
}
function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
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
function SEvent(){
   var o = this;
   o.annotation = null;
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
   o.attachEvent = SMouseEvent_attachEvent;
   return o;
}
function SMouseEvent_attachEvent(p){
   var o = this;
   var hs = o.hSource = RHtml.eventSource(p);
   if(hs){
      o.source = hs.__linker;
   }
   o.button = p.button;
   o.mouseLeft = (p.button == EMouseButton.Left);
   o.mouseMiddle = (p.button == EMouseButton.Middle);
   o.mouseRight = (p.button == EMouseButton.Right);
   o.altKey = p.altKey;
   o.ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o.x = p.pageX;
      o.y = p.pageY;
      o.offsetX = p.layerX;
      o.offsetY = p.layerY;
   }else{
      o.x = p.x;
      o.y = p.y;
      o.offsetX = p.offsetX;
      o.offsetY = p.offsetY;
   }
   o.clientX = p.clientX;
   o.clientY = p.clientY;
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
function SServiceInfo(){
   var o = this;
   o.service = null;
   o.action  = null;
   o.url     = null;
   return o;
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
   o.root().innerDump(r);
   return r.flush();
}
function TXmlNode(){
   var o = this;
   TNode.call(o);
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
function FDataStream(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   o.construct = FDataStream_construct;
   o.dispose   = FDataStream_dispose;
   return o;
}
function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}
function FDataStream_dispose(){
   var o = this;
   o._memory = null;
   o._viewer = null;
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
function FHttpConnection(o){
   o = RClass.inherits(this, o, FObject);
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
   o.lsnsLoad             = null;
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
   return o;
}
function FHttpConnection_onConnectionSend(){
   var o = this;
   if(o._inputData){
      o._contentLength = o._inputData.length;
   }
}
function FHttpConnection_onConnectionReady(){
   var o = this._linker;
   if(o._asynchronous){
      var c = o._connection;
      if(c.readyState == EHttpStatus.Finish){
         if(c.status == 200){
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
   o.lsnsLoad.process(o);
}
function FHttpConnection_construct(){
   var o = this;
   o.lsnsLoad = new TListeners();
   var c = o._connection = RXml.createConnection();
   c._linker = o;
   c.onreadystatechange = o.onConnectionReady;
}
function FHttpConnection_setHeaders(){
   var o = this;
   var c = o._connection;
   if(o._contentCd == EHttpContent.Binary){
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         c.overrideMimeType('text/plain; charset=x-user-defined');
         if(o._asynchronous){
            c.responseType = 'arraybuffer';
         }
      }else{
         c.setRequestHeader('Accept-Charset', 'x-user-defined');
         c.responseType = 'arraybuffer';
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
      if(RBrowser.isBrowser(EBrowser.Chrome)){
         o._outputData = c.response;
      }else{
         o._outputData = c.response;
      }
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
function FHttpConnection_send(p, d){
   var o = this;
   o._url = p;
   o._input = d;
   o._methodCd = (d != null) ? EHttpMethod.Post : EHttpMethod.Get;
   o._statusFree = false;
   o.onConnectionSend();
   if(o._asynchronous){
      o.sendAsync();
   }else{
      o.sendSync();
   }
   return o.content();
}
function FImage(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad);
   o._optionAlpha   = true;
   o._ready         = false;
   o._size          = null;
   o._url           = null;
   o._hImage        = null;
   o.ohLoad         = FImage_ohLoad;
   o.ohError        = FImage_ohError;
   o.construct      = FImage_construct;
   o.optionAlpha    = FImage_optionAlpha;
   o.setOptionAlpha = FImage_setOptionAlpha;
   o.size           = FImage_size;
   o.image          = FImage_image;
   o.url            = FImage_url;
   o.testReady      = FImage_testReady;
   o.loadUrl        = FImage_loadUrl;
   o.dispose        = FImage_dispose;
   return o;
}
function FImage_ohLoad(){
   var o = this.__linker;
   var m = o._hImage;
   o._size.set(m.naturalWidth, m.naturalHeight);
   o._ready = true;
   o.processLoadListener(o);
}
function FImage_ohError(p){
   var o = this.__linker;
   debugger;
}
function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FImage_optionAlpha(){
   return this._optionAlpha;
}
function FImage_setOptionAlpha(p){
   this._optionAlpha = p;
}
function FImage_size(){
   return this._size;
}
function FImage_image(){
   return this._hImage;
}
function FImage_url(){
   return this._url;
}
function FImage_testReady(){
   return this._ready;
}
function FImage_loadUrl(p){
   var o = this;
   o._url = p;
   var g = o._hImage;
   if(!g){
      g = o._hImage = new Image();
      g.__linker = o;
      g.onload = o.ohLoad;
      g.onerror = o.ohError;
   }
   g.src = p;
}
function FImage_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._hImage = RHtml.free(o._hImage);
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
   o.lsnsLoad.process(e);
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
var RBrowser = new function RBrowser(){
   var o = this;
   o._deviceCd      = EDevice.Unknown;
   o._softwareCd    = ESoftware.Unknown;
   o._typeCd        = EBrowser.Unknown;
   o._hostPath      = '';
   o._contentPath   = '';
   o.onLog          = RBrowser_onLog;
   o.construct      = RBrowser_construct;
   o.hostPath       = RBrowser_hostPath;
   o.setHostPath    = RBrowser_setHostPath;
   o.contentPath    = RBrowser_contentPath;
   o.setContentPath = RBrowser_setContentPath;
   o.isBrowser      = RBrowser_isBrowser;
   return o;
}
function RBrowser_onLog(s, p){
   console.log(p);
}
function RBrowser_construct(){
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
   }else if(s.indexOf("msie") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("windows") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("safari") != -1){
      o._typeCd = EBrowser.Safari;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.onLog);
   }
   RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
}
function RBrowser_hostPath(p){
   var o = this;
   if(p){
      return o._hostPath + p;
   }
   return o._hostPath;
}
function RBrowser_setHostPath(p){
   this._hostPath = p;
}
function RBrowser_contentPath(p){
   var o = this;
   if(p){
      return o._contentPath + p;
   }
   return o._contentPath;
}
function RBrowser_setContentPath(p){
   this._contentPath = p;
}
function RBrowser_isBrowser(p){
   return this._typeCd == p;
}
var RBuilder = new function RBuilder(){
   var o = this;
   o.create             = RBuilder_create;
   o.createIcon         = RBuilder_createIcon;
   o.createImage        = RBuilder_createImage;
   o.createText         = RBuilder_createText;
   o.createCheck        = RBuilder_createCheck;
   o.createRadio        = RBuilder_createRadio;
   o.createEdit         = RBuilder_createEdit;
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
   o.appendCheck        = RBuilder_appendCheck;
   o.appendRadio        = RBuilder_appendRadio;
   o.appendEdit         = RBuilder_appendEdit;
   o.appendSpan         = RBuilder_appendSpan;
   o.appendDiv          = RBuilder_appendDiv;
   o.appendTable        = RBuilder_appendTable;
   o.appendTableRow     = RBuilder_appendTableRow;
   o.appendTableRowCell = RBuilder_appendTableRowCell;
   o.appendTableCell    = RBuilder_appendTableCell;
   return o;
}
function RBuilder_create(h, t, s){
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
function RBuilder_createIcon(d, s, u, w, h){
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
function RBuilder_createImage(d, s, u, w, h){
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
function RBuilder_createText(d, s, v){
   var r = this.create(d, 'SPAN', s);
   if(v){
      r.innerHTML = v;
   }
   return r;
}
function RBuilder_createCheck(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'checkbox';
   return r;
}
function RBuilder_createRadio(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'radio';
   return r;
}
function RBuilder_createEdit(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'text';
   return r;
}
function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   if(b){
      h.border = RInteger.nvl(b);
   }
   h.cellSpacing = RInteger.nvl(cs);
   h.cellPadding = RInteger.nvl(cp);
   return h;
}
function RBuilder_createTableRow(d, s){
   var h = this.create(d, 'TR', s);
   return h;
}
function RBuilder_createTableCell(d, s){
   var h = this.create(d, 'TD', s);
   return h;
}
function RBuilder_createFragment(d){
   return d.createDocumentFragment();
}
function RBuilder_append(p, t, s){
   var r = RBuilder.create(p.ownerDocument, t, s);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendIcon(p, s, u, w, h){
   var r = this.createIcon(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendImage(p, s, u, w, h){
   var r = this.createImage(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEmpty(p, w, h){
   var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
   p.appendChild(r);
   return r;
}
function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
   p.appendChild(r);
   return r;
}
function RBuilder_appendCheck(p, s){
   var r = this.createCheck(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendRadio(p, s){
   var r = this.createRadio(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendEdit(p, s){
   var r = this.createEdit(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendSpan(p, s){
   var r = this.createSpan(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendDiv(p, s){
   var r = this.createDiv(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
function RBuilder_appendTable(p, s, b, cs, cp){
   var r = this.createTable(p.ownerDocument, s, b, cs, cp);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
function RBuilder_appendTableRow(p, s, i, h){
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
function RBuilder_appendTableRowCell(p, s, w, h){
   var o = this;
   var hr = o.appendTableRow(p, null, null, w);
   var hc = o.appendTableCell(hr, s, null, h);
   return hc;
}
function RBuilder_appendTableCell(p, s, i, w){
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
   return v;
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
   o.linkGet        = RHtml_linkGet;
   o.linkSet        = RHtml_linkSet;
   o.clientPosition = RHtml_clientPosition;
   o.clientX        = RHtml_clientX;
   o.clientY        = RHtml_clientY;
   o.setSize        = RHtml_setSize;
   o.toText         = RHtml_toText;
   o.toHtml         = RHtml_toHtml;
   o.eventSource    = RHtml_eventSource;
   o.searchLinker   = RHtml_searchLinker;
   o.searchObject   = RHtml_searchObject;
   o.free           = RHtml_free;
   o.offsetPosition = RHtml_offsetPosition;
   o.offsetX        = RHtml_offsetX;
   o.offsetY        = RHtml_offsetY;
   o.scrollWidth    = RHtml_scrollWidth;
   o.scrollHeight   = RHtml_scrollHeight;
   o.radioSet       = RHtml_radioSet;
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
   o.get            = RHtml_get;
   o.parent         = RHtml_parent;
   o.posParent      = RHtml_posParent;
   o.form           = RHtml_form;
   o.popup          = RHtml_popup;
   o.bodyWidth      = RHtml_bodyWidth;
   o.bodyHeight     = RHtml_bodyHeight;
   o.frameHeight    = RHtml_frameHeight;
   o.selectText     = RHtml_selectText;
   o.currentStyle   = RHtml_currentStyle;
   o.tableMoveRow   = RHtml_tableMoveRow;
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
function RHtml_clientPosition(h, t){
   var o = this;
   var p = o._clientPosition;
   p.set(0, 0);
   while(h != t){
      p.x += h.offsetLeft + h.clientLeft - h.scrollLeft;
      p.y += h.offsetTop + h.clientTop - h.scrollTop;
      h = h.offsetParent;
   }
   return p;
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
function RHtml_setBounds(h, l, t, w, h){
   if(h && h.style){
      var s = o.style;
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
function RHtml_get(name){
   return document.getElementById(name);
}
function RHtml_parent(o, t){
   if(o, t){
      t = t.toLowerCase();
      while(o){
         if(o.tagName.toLowerCase() == t){
            return o;
         }
         o = o.parentElement;
      }
   }
   return null;
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
function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      return false;
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
var RService = new function RService(){
   var o = this;
   o._services = new TDictionary();
   o.url       = RService_url;
   o.parse     = RService_parse;
   return o;
}
function RService_url(p){
   if(RString.startsWith(p, 'http://')){
      return p;
   }
   if(RString.startsWith(p, '#')){
      return p.substr(1);
   }
   if(!RString.startsWith(p, '/')){
      p = '/' + p;
   }
   return p + '.ws';
}
function RService_parse(p){
   var o = this;
   var s = null;
   var ss = o._services;
   if(p){
      s = ss.get(p);
      if(s == null){
         var ps = p.split('@');
         if(ps.length == 1){
            if(ps[0]){
               s = new SServiceInfo();
               s.service = ps[0];
               s.action = null;
               s.url = o.url(ps[0]);
            }
         }else if(ps.length == 2){
            if(ps[0] && ps[1]){
               s = new SServiceInfo();
               s.service = ps[1];
               s.action = ps[0];
               s.url = o.url(ps[1]) + '?action=' + ps[0];
            }
         }
      }
      if(s == null){
         throw new TError(o, 'Unknown service format. (source={1})', p);
      }
      ss.set(p, s);
   }
   return s;
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
      case EDataType.Float:
         return new Float32Array(l);
      case EDataType.Double:
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
var RWindow = new function RWindow(){
   var o = this;
   o._optionSelect     = true;
   o._mouseEvent       = new SMouseEvent();
   o._keyEvent         = new SKeyboardEvent();
   o._resizeEvent      = new SResizeEvent();
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o.lsnsLoad          = new TListeners();
   o.lsnsUnload        = new TListeners();
   o.lsnsMouseDown     = new TListeners();
   o.lsnsMouseUp       = new TListeners();
   o.lsnsMouseOver     = new TListeners();
   o.lsnsMouseMove     = new TListeners();
   o.lsnsMouseWheel    = new TListeners();
   o.lsnsKeyDown       = new TListeners();
   o.lsnsKeyUp         = new TListeners();
   o.lsnsKeyPress      = new TListeners();
   o.lsnsResize        = new TListeners();
   o.ohMouseDown       = RWindow_ohMouseDown;
   o.ohMouseMove       = RWindow_ohMouseMove;
   o.ohMouseUp         = RWindow_ohMouseUp;
   o.ohKeyDown         = RWindow_ohKeyDown;
   o.ohKeyUp           = RWindow_ohKeyUp;
   o.ohKeyPress        = RWindow_ohKeyPress;
   o.ohResize          = RWindow_ohResize;
   o.ohSelect          = RWindow_ohSelect;
   o.connect           = RWindow_connect;
   o.optionSelect      = RWindow_optionSelect;
   o.setOptionSelect   = RWindow_setOptionSelect;
   o.setCaption        = RWindow_setCaption;
   o.setStatus         = RWindow_setStatus;
   o._builder          = null;
   o._disableDeep      = 0;
   o.panels            = new TMap();
   o.inDisable         = false;
   o.inMoving          = false;
   o.inSizing          = false;
   o.hDisablePanel     = null;
   o.hShadow           = null;
   o.onUnload          = RWindow_onUnload;
   o.onResize          = RWindow_onResize;
   o.createElement     = RWindow_createElement;
   o.event             = RWindow_event;
   o.source            = RWindow_source;
   o.getElement        = RWindow_getElement;
   o.getDisablePanel   = RWindow_getDisablePanel;
   o.findElement       = RWindow_findElement;
   o.panel             = RWindow_panel;
   o.screenPos         = RWindow_screenPos;
   o.clientPos         = RWindow_clientPos;
   o.offsetPos         = RWindow_offsetPos;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;
   o.showShadow        = RWindow_showShadow;
   o.moveCenter        = RWindow_moveCenter;
   o.appendControl     = RWindow_appendControl;
   o.appendElement     = RWindow_appendElement;
   o.appendContainer   = RWindow_appendContainer;
   o.containerTop      = RWindow_containerTop;
   o.dispose           = RWindow_dispose;
   return o;
}
function RWindow_ohMouseDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseDown.process(e);
}
function RWindow_ohMouseMove(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseMove.process(e);
}
function RWindow_ohMouseUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseUp.process(e);
}
function RWindow_ohKeyDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyDown.process(e);
}
function RWindow_ohKeyUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyUp.process(e);
}
function RWindow_ohKeyPress(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyPress.process(e);
}
function RWindow_ohResize(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._resizeEvent;
   e.attachEvent(p);
   o.lsnsResize.process(e);
}
function RWindow_ohSelect(p){
   return RWindow._optionSelect;
}
function RWindow_connect(w){
   var o = this;
   var hw = o._hWindow = w;
   var hd = o._hDocument = hw.document;
   var hc = o._hContainer = hd.body;
   if(RRuntime.supportHtml5()){
      hc.addEventListener('mousedown', o.ohMouseDown, true);
      hc.addEventListener('mousemove', o.ohMouseMove, true);
      hc.addEventListener('mouseup', o.ohMouseUp, true);
      hc.addEventListener('keydown', o.ohKeyDown, true);
      hc.addEventListener('keyup', o.ohKeyUp, true);
      hc.addEventListener('keypress', o.ohKeyPress, true);
   }else{
      hc.onmousedown = o.ohMouseDown;
      hc.onmousemove = o.ohMouseMove;
      hc.onmouseup = o.ohMouseUp;
      hc.onkeydown = o.ohKeyDown;
      hc.onkeyup = o.ohKeyUp;
      hc.onkeypress = o.ohKeyPress;
   }
   hc.onselectstart = o.ohSelect;
}
function RWindow_optionSelect(){
   return this._optionSelect;
}
function RWindow_setOptionSelect(p){
   var o = this;
   o._optionSelect = p;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = p ? '' : 'none';
   }
}
function RWindow_setCaption(p){
   top.document.title = p;
}
function RWindow_setStatus(p){
   window.status = RString.nvl(p);
}
function RWindow_onUnload(){
   RMemory.release();
}
function RWindow_onResize(){
   var o = this;
   var h = o.hDisablePanel;
   if(h){
      if('block' == h.style.display){
         var s = h.style;
         var hd = o.hDocument;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = hd.all ? o.hBody.scrollWidth : hd.documentElement.scrollWidth;
         s.pixelHeight = hd.all ? o.hBody.scrollHeight : hd.documentElement.scrollHeight;
      }
   }
}
function RWindow_connect2(w){
   var o = this;
   o.hWindow = w;
   var hd = o.hDocument = w.document;
   var hb = o.hBody = o.hContainer = hd.body;
   o.processUnload = hb.onunload;
   hb.onunload = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsUnload.process(e);
      o.onUnload();
   };
   hb.onmouseover = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseOver.process(e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseWheel.process(e);
   };
   hb.onkeydown = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKeyCode.BackSpace == e.keyCode){
         if('INPUT' == t){
            if(s.readOnly || 'checkbox' == s.type){
               return RKey.eventClear(e);
            }
         }else if('TEXTAREA' == t){
            if(s.readOnly){
               return RKey.eventClear(e);
            }
         }else{
            return RKey.eventClear(e);
         }
      }
      o.__keyDownEvent.attach(e);
      o.lsnsKeyDown.process(o.__keyDownEvent);
      if(EKeyCode.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsKeyUp.process(e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key press. (key_code={1})', e.keyCode);
      o.lsnsKeyPress.process(e);
   };
   hb.onresize = function(e){
      if(!e){
         e = w.event;
      }
      if(o.oldBodyWidth == o.hBody.offsetWidth && o.oldBodyHeight == o.hBody.offsetHeight){
         return;
      }
      o.oldBodyWidth = o.hBody.offsetWidth;
      o.oldBodyHeight = o.hBody.offsetHeight;
      o.onResize();
      o.lsnsResize.process(e);
   };
}
function RWindow_createElement(n){
   return this.hDocument.createElement(n);
}
function RWindow_event(){
   return this.hWindow.event;
}
function RWindow_source(h){
   return h ? h.ownerDocument.parentWindow.event.srcElement : this.hWindow.event.srcElement;
}
function RWindow_getElement(n){
   var o = this;
   var e = o.hDocument.getElementById(n);
   if(!e){
      RMessage.fatal(o, null, "Can't get html element. (name={0})", n);
   }
   return e;
}
function RWindow_getDisablePanel(f){
   var o = this;
   var h = o.hDisablePanel;
   if(!h){
      var h = o.hDisablePanel = o.builder().newDiv();
      h.style.backgroundColor = "#CCCCCC";
      h.style.position = 'absolute';
      h.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=60)";
      o.hBody.appendChild(h);
      h.style.zIndex = 8000;
      h.style.display = 'none';
   }
   var hImg = o.hImg;
   if(!hImg){
      hImg = o.hImg = o.builder().appendImage(h);
      hImg.src = top.RContext.context('/ats/00/rs/icon/ctl/RWindow_Loading.gif');
      hImg.style.margin = document.body.offsetHeight / 2;
      hImg.style.display = 'none';
   }
   if(f){
      hImg.style.display = 'none';
   }else{
      hImg.style.display = 'block';
   }
   return h;
}
function RWindow_findElement(n){
   return this.hDocument.getElementById(n);
}
function RWindow_panel(t){
   var o = this;
   if(EPanel.Disable == t){
      var h = o.hDisablePanel;
      if(!h){
         h = o.hDisablePanel = RBuilder.append(o.hBody, 'DIV', 'RWindow_Disable');
         var hi = RBuilder.append(h, 'IMG')
         hi.src = RRes.iconPath('#ctl.RWindow_Loading');
         hi.style.margin = document.body.offsetHeight / 2;
         h.style.zIndex = ELayer.Disable;
      }
      return h;
   }
}
function RWindow_screenPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.screenX;
      p.y = e.screenY;
      return p;
   }
   return new TPoint(e.screenX, e.screenY);
}
function RWindow_clientPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
   }
   return new TPoint(e.clientX, e.clientY);
}
function RWindow_offsetPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.offsetX;
      p.y = e.offsetY;
      return p;
   }
   return new TPoint(e.offsetX, e.offsetY);
}
function RWindow_windowDisable(){
   this.hWindow.document.body.disabled = true;
}
function RWindow_windowEnable(){
   this.hWindow.document.body.disabled = false;
}
function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(0 == o._disableDeep){
      o.setEnable(true);
   }
}
function RWindow_disable(){
   var o = this;
   if(0 == o._disableDeep){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function RWindow_setEnable(v, f){
   var o = this;
   var h = o.getDisablePanel(f);
   var st = h.style;
   if(!v){
      var s = o.hDisablePanel.style;
      s.pixelLeft = 0;
      s.pixelTop = 0
      s.pixelWidth = o.hDocument.all ? o.hBody.scrollWidth : o.hDocument.documentElement.scrollWidth;
      s.pixelHeight = o.hDocument.all ? o.hBody.scrollHeight : o.hDocument.documentElement.scrollHeight;
      s.display = 'block';
   }else{
      o.windowEnable();
      st.display = 'none';
   }
}
function RWindow_showShadow(v, r){
   var o = this;
   if(!o.hShadow){
      o.hShadow = RBuilder.append(o.hBody, 'DIV', 'RWindow_Shadow');
      o.hShadow.style.zIndex = ELayer.Shadow;
   }
   var st = o.hShadow.style;
   if(v == false){
      st.display = 'none';
   }else{
      st.display = 'block';
      st.pixelLeft = r.left+3;
      st.pixelTop = r.top+3;
      st.pixelWidth = r.width();
      st.pixelHeight = r.height();
   }
}
function RWindow_moveCenter(h){
   var o = this;
   if(h){
      h.style.pixelLeft = Math.max(parseInt((o.hBody.offsetWidth - h.offsetWidth)/2), 0);
      h.style.pixelTop = Math.max(parseInt((o.hBody.offsetHeight - h.offsetHeight)/2), 0) + o.hBody.scrollTop;
   }
}
function RWindow_appendControl(ctl){
   this.hBody.appendChild(ctl.hPanel);
}
function RWindow_appendElement(h){
   this.hBody.appendChild(h);
}
function RWindow_appendContainer(h){
   this.hContainer.appendChild(h);
}
function RWindow_containerTop(h){
   var o = this;
   var hc = o.hContainer;
   var r = RHtml.top(h) + h.offsetHeight;
   if('auto' == hc.currentStyle.overflow){
      r -= RHtml.top(hc);
   }
   return r - hc.scrollTop;
}
function RWindow_dispose(){
   var o = this;
   o.hBody.onload = null;
   o.hBody.onunload = null;
   o.hBody.onmousedown = null;
   o.hBody.onmouseup = null;
   o.hBody.onmousemove = null;
   o.hBody.onmouseover = null;
   o.hBody.onmousewheel = null;
   o.hBody.onkeydown = null;
   o.hBody.onkeyup = null;
   o.hBody.onkeypress = null;
   o.hBody.onresize = null;
   RMemory.freeHtml(o.hBody);
   o.panels.release();
   o.panels = null;
   o.hWindow = null;
   o.hDocument = null;
   o.hBody = null;
   o.hDisablePanel = null;
   o.hImg = null;
   o.hShadow = null;
}
var RXml = new function RXml(){
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
function RXml_construct(){
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
function RXml_isNode(n){
   return RClass.isName(n, 'TNode');
}
function RXml_createConnection(){
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
function RXml_createDocument(){
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
function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}
function RXml_buildText(s, v){
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
function RXml_buildNode(pd, pn, pe){
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
function RXml_makeString(s){
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
function RXml_makeNode(p){
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
function RXml_makeDocument(p){
   var d = new TXmlDocument();
   if(p.documentElement){
      RXml.buildNode(d, null, p.documentElement);
   }
   return d;
}
function RXml_unpack(s, n){
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
   if(!RClass.isClass(es, MDragable)){
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
function FEnvironmentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope       = EScope.Local;
   o.environment = null;
   o.connect     = FEnvironmentConsole_connect;
   o.build       = FEnvironmentConsole_build;
   o.buildValue  = FEnvironmentConsole_buildValue;
   o.xml         = FEnvironmentConsole_xml;
   return o;
}
function FEnvironmentConsole_connect(){
   var xData = RHtml.get('xEnvironment');
   if(xData){
      this.environment = RXml.makeNode(xData);
   }
}
function FEnvironmentConsole_build(config){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
function FEnvironmentConsole_buildValue(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var env = RHtml.get('_environment');
      if(env){
         env.value = this.environment.xml();
      }
   }
}
function FEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
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
   return o;
}
function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = RClass.create(FObjectPool);
}
function FHttpConsole_onLoad(p){
   var o = this;
   o._pool.free(p);
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
   c.lsnsLoad.clear();
   c.lsnsLoad.register(o, o.onLoad);
   return c;
}
function FHttpConsole_send(u){
   var o = this;
   var c = o.alloc();
   c.send(u);
   return c;
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
   var o = this;
   if(!o.iLogger){
   }
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
   o._captures      = null;
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
   o._captures = new TObjects();
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
   this._captures.push(p);
}
function FMouseConsole_unregister(p){
   this._captures.remove(p);
}
function FMouseConsole_clear(){
   this._captures.clear();
}
function FPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FPipeline_name;
   return o;
}
function FPipeline_name(){
   return this._name;
}
function FProcess(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = FProcess_name;
   return o;
}
function FProcess_name(){
   return this._name;
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
function FResource(o){
   o = RClass.inherits(this, o, FObject);
   o._guid  = null;
   o._code  = null;
   o._label = null;
   o.guid   = FResource_guid;
   o.code   = FResource_code;
   o.label  = FResource_label;
   return o;
}
function FResource_guid(){
   return this._guid;
}
function FResource_code(){
   return this._code;
}
function FResource_label(){
   return this._label;
}
function FResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._resources  = null;
   o.onLoad      = FResourceConsole_onLoad;
   o.construct   = FResourceConsole_construct;
   o.alloc       = FResourceConsole_alloc;
   o.process     = FResourceConsole_process;
   o.send        = FResourceConsole_send;
   return o;
}
function FResourceConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FResourceConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FResourceConsole_alloc(){
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
function FResourceConsole_process(e){
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
function FResourceConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FResourceGroup_name;
   return o;
}
function FResourceGroup_name(){
   return this._name;
}
function FResourceType(o){
   o = RClass.inherits(this, o, FObject);
   o._name      = null;
   o._pipeline  = null;
   o._resources = null;
   o.construct  = FResourceType_construct;
   o.name       = FResourceType_name;
   o.resource   = FResourceType_resource;
   o.resources  = FResourceType_resources;
   return o;
}
function FResourceType_construct(){
   var o = this;
   o.__base.construct.call(o);
   o._resources = new TDictionary();
}
function FResourceType_name(){
   return this._name;
}
function FResourceType_resource(p){
   return this._resources.get(p);
}
function FResourceType_resources(){
   return this._resources;
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
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._statusCd   = EThreadStatus.Sleep;
   o._interval   = 100;
   o._delay      = 0;
   o.lsnsProcess = null;
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
   o.lsnsProcess = new TListeners();
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
      o.lsnsProcess.process(o);
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
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FXmlConsole_onLoad;
   o.construct   = FXmlConsole_construct;
   o.alloc       = FXmlConsole_alloc;
   o.send        = FXmlConsole_send;
   o.sendAsync   = FXmlConsole_sendAsync;
   o.process     = FXmlConsole_process;
   return o;
}
function FXmlConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FXmlConsole_onLoad(p){
   var o = this;
   debugger
}
function FXmlConsole_alloc(){
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
function FXmlConsole_process(p){
   var o = this;
   if(p.constructor != SXmlEvent){
      throw new TError('Parameter type is invalid.');
   }
   var c = o.alloc();
   c._asynchronous = true;
   c.send(p.url, p.inputDocument);
   c.lsnsLoad.register(p, p.process);
   return c;
}
