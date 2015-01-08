function AAnnotation(o, n){
   if(!o){o = this;}
   o._annotationCd = null;
   o._inherit      = false;
   o._name         = n;
   o.annotationCd  = AProperty_annotationCd;
   o.name          = AProperty_name;
   o.code          = AProperty_code;
   return o;
}
function AProperty_annotationCd(){
   return this._annotationCd;
}
function AProperty_name(){
   return this._name;
}
function AProperty_code(){
   return this._name;
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
function AProperty(o, n, l){
   if(!o){o = this;}
   AAnnotation(o, n);
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
   AProperty(o, n, l);
   o._value    = v ? v : false;
   o.build    = APtyBoolean_build;
   o.load     = APtyBoolean_load;
   o.save     = APtyBoolean_save;
   o.toString = APtyBoolean_toString;
   return o;
}
function APtyBoolean_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = RBoolean.parse(x.get(o._linker));
}
function APtyBoolean_save(o, c){
   var o = this;
   x.set(o._linker, RBoolean.toString(v[o._name]));
}
function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyInteger(n, l, v){
   var o = this;
   AProperty(o, n, l);
   o.value    = RInteger.nvl(v);
   o.build    = APtyInteger_build;
   o.toString = APtyInteger_toString;
   return o;
}
function APtyInteger_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyNode(o, n, l){
   if(!o){o = this;}
   AProperty(o, n, l);
   o.force = true;
   o.load  = APtyNode_load;
   o.save  = RMethod.empty;
   return o;
}
function APtyNode_load(v, x){
   v[this.name] = x;
}
function APtyPadding(n, l, vl, vt, vr, vb){
   var o = this;
   AProperty(o, n, l);
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
   x.set(o._name, v[o._name].toString());
}
function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
function APtyPoint2(n, l, x, y){
   var o = this;
   AProperty(o, n, l);
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
   x.set(o._name, v[o._name].toString());
}
function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
function APtySet(o, n, l, s, v){
   if(!o){o = this;}
   AProperty(o, n, l);
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
   v[o.name] = o._value;
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
   return '<SetProperty:linker=' + o.linker + ',value=' + o._value + ',search=' + o._search +  '>';
}
function APtySize2(n, l, w, h){
   var o = this;
   AProperty(o, n, l);
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
   x.set(o._name, v[o._name].toString());
}
function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
function APtyString(n, l, v){
   var o = this;
   AProperty(o, n, l);
   o._value    = v ? v : null;
   o.build    = APtyString_build;
   o.toString = APtyString_toString;
   return o;
}
function APtyString_build(v){
   var o = this;
   v[o._name] = o._value;
}
function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function AStyle(n, s){
   var o = this;
   AAnnotation(o, n);
   o._annotationCd = EAnnotation.Style;
   o._style        = s;
   o.code          = AStyle_code;
   o.style         = AStyle_style;
   o.build         = AStyle_build;
   o.toString      = AStyle_toString;
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
var EBool = new function EBool(){
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
   o.A         = 65;
   o.B         = 66;
   o.L         = 76;
   o.Q         = 81;
   o.S         = 83;
   o.F         = 70;
   o.I         = 73;
   o.D           = 68;
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Shift, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,o.Ctrl,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   o.floatCodes  = new Object();
   var f = o.floatCodes;
   f[o.Tab] = true;
   f[o.Enter] = true;
   f[o.BackSpace] = true;
   f[o.Left] = true;
   f[o.Right] = true;
   f[o.Esc] = true;
   f[o.Delete] = true;
   f[o.Home] = true;
   f[o.End] = true;
   f[45] = true;
   f[190] = true;
   f[46] = true;
   f[189] = true;
   for(var n = 48; n <= 57; n++){
      f[n] = true;
   }
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
   o.Integer              = 'I';
   o.PositiveInteger      = 'PI';
   o.NegativeInteger      = 'NI';
   o.Float                = 'F';
   o.PositiveFloat        = 'PF';
   o.NegativeFloat        = 'NF';
   return o;
}
var ERegExp = new function ERegExp(){
   var o = this;
   o.I                   = /^-?[1-9]\d*|0$/;
   o.PI                  = /^[1-9]\d*$/;
   o.NI                  = /^-[1-9]\d*$/;
   o.F                   = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
   o.PF                  = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
   o.NF                  = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;
   o.U                   = /[1-9]{1}[0-9]/;
   o.E                   = /^\w{1,}[@]{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}$/;
   return o;
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
   o.construct = FObject_construct;
   o.toString  = FObject_toString;
   o.dispose   = FObject_dispose;
   o.innerDump = FObject_innerDump;
   o.dump      = FObject_dump;
   return o;
}
function FObject_construct(){
}
function FObject_toString(){
   return RClass.dump(this);
}
function FObject_dispose(){
   this.__class = null;
}
function FObject_innerDump(s, l){
   s.append(RClass.dump(this));
}
function FObject_dump(){
   var r = new TString();
   this.innerDump(r, 0);
   return r.toString();
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
function MProperty(o){
   o = RClass.inherits(this, o);
   o.propertyAssign = MProperty_propertyAssign;
   o.propertyLoad   = MProperty_propertyLoad;
   o.propertySave   = MProperty_propertySave;
   return o;
}
function MProperty_propertyAssign(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         o[a._name] = c[a._name];
      }
   }
}
function MProperty_propertyLoad(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         if(a._force){
            a.load(o, v);
         }else{
            if(v.contains(a._linker)){
               a.load(o, v);
            }else if(o[p._name] == null){
               o[a._name] = a._value;
            }
         }
      }
   }
}
function MProperty_propertySave(v){
   var o = this;
   var c = RClass.find(o.constructor);
   var as = c.annotations(EAnnotation.Property);
   for(var n in as){
      var a = as[n];
      if(a.constructor != Function){
         a.save(o, v);
      }
   }
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
var RBool = new function RBool(){
   var o = this;
   o.parse    = RBool_parse;
   o.toString = RBool_toString;
   return o;
}
function RBool_parse(v){
   return (v == EBool.True);
}
function RBool_toString(v){
   return v ? EBool.True : EBool.False;
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
   o.dump           = RClass_dump;
   o.free           = RClass_free;
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
   if(v != null){
      try{
         if(v.__class){
            return v.__class.name;
         }
         if(v.tagName){
            return 'Html';
         }
         if(v.constructor){
            return RString.mid(v.constructor.toString(), 'function ', '(');
         }
         for(var name in obj){
            return 'Object';
         }
      }catch(e){}
      return 'Unknown';
   }
   return 'Null';
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
   return r;
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
         return t + '<' + v.tagName + '>@' + RRuntime.uid(v);
      default:
         if(v.__name){
            return t + '<' + v.__name + '>@' + o.code(v);
         }
   }
   return t + '@' + o.code(v);
}
function RClass_free(o){
   var c = o.__class;
   if(c){
      c.free(o);
   }
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
      throw new TError(o, 'Invalid value (enum={0}, value={1})', RClass.dump(e), v);
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
      throw new TError(o, 'Invalid value (enum={0}, value={1})', RClass.dump(e), v);
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
   o.alg       = RFloat_alg;
   return o;
}
function RFloat_isFloat(value){
   return RString.isPattern(value, 'n');
}
function RFloat_parse(value){
   if(value == null){
      return 0;
   }
   value = RString.trim(value.toString());
   while(true){
      if(value.charAt(0) != "0"){
         break;
      }
      value = value.substr(1);
   }
   var rs = (value.length > 0) ? parseFloat(value) : 0;
   if(-1 != RString.findChars(value, '%')){
      rs = rs / 100;
   }
   return isNaN(rs) ? 0 : rs;
}
function RFloat_format(value, len, pad){
   if(!pad){
      pad = this.LEFT_CHAR;
   }
   var value = value.toString();
   var left = parseFloat(len) - value.length;
   for(var i=0; i<left; i++){
      value = pad + value;
   }
   return value;
}
function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}
function RFloat_toRange(v, min, max){
   if(null == v){
      v = 0;
   }
   return Math.min(Math.max(v, min), max);
}
function RFloat_sum(){
   var sum = 0;
   for(var n=0; n<arguments.length; n++){
      if(null != arguments[n]){
         sum += parseFloat(arguments[n]);
      }
   }
   return sum;
}
function RFloat_alg(f,a,b){
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
var RHex = new function(o){
   if(!o){o=this};
   o.NUMBER  = '0x123456789ABCDEF';
   o.PAD     = '0';
   o.isValid = RHex_isValid;
   o.parse   = RHex_parse;
   o.format  = RHex_format;
   RMemory.register('RHex', o);
   return o;
}
function RHex_isValid(v){
   return RString.isPattern(v, this.NUMBER);
}
function RHex_parse(v){
   return v ? parseInt('0x'+v) : '0';
}
function RHex_format(v, l){
   v = RString.nvl(v, '0').toString(16);
   return l ? RString.lpad(v, l, this.PAD) : v;
}
var RInteger = new function RInteger(){
   var o = this;
   o.Chars     = '0123456789-%';
   o.NUMBER    = '0123456789-%';
   o.LEFT_CHAR = '0';
   o.isInt     = RInteger_isInt;
   o.nvl       = RInteger_nvl;
   o.parse     = RInteger_parse;
   o.format    = RInteger_format;
   o.toRange   = RInteger_toRange;
   o.sum       = RInteger_sum;
   o.calculate = RInteger_calculate;
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
   o.lsnsOutput   = new TListeners();
   o.output       = RLogger_output;
   o.fatal        = RLogger_fatal;
   o.error        = RLogger_error;
   o.warn         = RLogger_warn;
   o.info         = RLogger_info;
   return o;
}
function RLogger_output(p){
   this.lsnsOutput.process(p);
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
function RLogger_error(self, method, msg, params){
   if(this._statusError){
      return;
   }
   this._statusError = true;
   throw new Error(msg);
}
function RLogger_warn(sf, ms, pm){
}
function RLogger_info(sf, ms, pm){
   var n = RMethod.name(RLogger_info.caller);
   n = n.replace('_', '.');
   var r = new TString();
   r.append(RDate.format('yymmdd-hh24miss.ms'));
   r.append('|I [' + RString.rpad(n, 40) + '] ');
   var as = arguments;
   var c = as.length;
   for(var n = 2; n < c; n++){
      var a = as[n];
      var s = null;
      if(typeof(a) == 'function'){
         s = RMethod.name(a);
      }else{
         s = a.toString();
      }
      ms = ms.replace('{' + (n - 1) + '}', s);
   }
   r.append(ms);
   RLogger.output(r.toString());
}
var RMath = new function RMath(){
   var o = this;
   o.PI          = null;
   o.PI2         = null;
   o.RADIAN_RATE = null;
   o.DEGREE_RATE = null;
   o.construct = RMath_construct;
   o.construct();
   return o;
}
function RMath_construct(){
   var o = this;
   o.PI = Math.PI;
   o.PI2 = Math.PI * 2;
   o.RADIAN_RATE = 180.0 / Math.PI;
   o.DEGREE_RATE = Math.PI / 180.0;
}
var RMethod = new function RMethod(){
   var o = this;
   o.virtuals   = new Object();
   o.events     = new Object();
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
   if(o.virtuals[n]){
      return o.virtuals[n];
   }
   var f = function(){throw new Error('Virtual method be called.(' + n + ')');};
   f.__virtual = true;
   f.__name = n;
   o.virtuals[n] = f;
   return f;
}
var RObject = new function RObject(){
   var o = this;
   o.nvl   = RObject_nvl;
   o.clone = RObject_clone;
   o.copy  = RObject_copy;
   return o;
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
var RRandom = new function(o){
   if(!o){o=this};
   o.seed = (new Date()).getTime();
   o.get  = RRandom_get;
   o.rand = RRandom_rand;
   RMemory.register('RRandom', o);
   return o;
}
function RRandom_get(){
   var o = this;
   o.seed = (o.seed * 9301 + 49297) % 233280;
   return o.seed/(233280.0);
}
function RRandom_rand(n){
   return Math.ceil(this.get()*n);
}
var RRect = new function(){
   var o = this;
   o.nvl    = RRect_nvl;
   o.pack   = RRect_pack;
   o.unpack = RRect_unpack;
   RMemory.register('RRect', o);
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
   o.test        = RRegExp_test;
   o.testRgexp   = RRegExp_testRgexp;
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
function RRegExp_test1(t,s,c){
   return  1;
}
function RStr_testRgexp2(){
   return 2;
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
   o.firstUpper   = RString_firstUpper;
   o.firstLower   = RString_firstLower;
   o.firstLine    = RString_firstLine;
   o.format       = RString_format;
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
   if((s != null) && (t != null)){
      if(s.constructor != String){
         s = s.toString();
      }
      if(t.constructor != String){
         t = t.toString();
      }
      if(f){
         return (s == t);
      }else{
         return (s.toLowerCase() == t.toLowerCase());
      }
   }
   return false;
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
   if(typeof(v) == 'string'){
      if(v.length > 0){
         return v;
      }
   }
   return (d != null) ? d : this.EMPTY;
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
function SMatrix4x4(o){
   if(o){o = this}
   return o;
}
function SPadding(l, t, r, b){
   var o = this;
   o.left     = RInteger.nvl(l);
   o.top      = RInteger.nvl(t);
   o.right    = RInteger.nvl(r);
   o.bottom   = RInteger.nvl(b);
   o.reset    = SPadding_reset;
   o.assign   = SPadding_assign;
   o.set      = SPadding_set;
   o.parse    = SPadding_parse;
   o.toString = SPadding_toString;
   o.dump     = SPadding_dump;
   return o;
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
function SPadding_dump(d){
   var o = this;
   return RClass.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}
function SPoint2(x, y){
   var o = this;
   o.x = RInteger.nvl(x);
   o.y = RInteger.nvl(y);
   o.equals   = SPoint2_equals;
   o.assign   = SPoint2_assign;
   o.set      = SPoint2_set;
   o.toString = SPoint2_toString;
   o.dump     = SPoint2_dump;
   return o;
}
function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}
function SPoint2_assign(pos){
   this.x = pos.x;
   this.y = pos.y;
}
function SPoint2_set(x, y){
   this.x = x;
   this.y = y;
}
function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}
function SPoint2_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ']';
}
function SPoint3(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.set    = SPoint3_set;
   o.resize = SPoint3_resize;
   o.dump   = SPoint3_dump;
   return o;
}
function SPoint3_set(x, y, z){
   var o = this;
   if(x != null){
      o.x = x;
   }
   if(y != null){
      o.y = y;
   }
   if(z != null){
      o.z = z;
   }
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
function SPoint3_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ',' + this.z + ']';
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
function SRectangle(l, t, r, b){
   var o = this;
   o.left      = RInteger.nvl(left);
   o.top       = RInteger.nvl(top);
   o.right     = RInteger.nvl(right);
   o.bottom    = RInteger.nvl(bottom);
   o.reset     = SRectangle_reset;
   o.assign    = SRectangle_assign;
   o.set       = SRectangle_set;
   o.setBounds = SRectangle_setBounds;
   o.width     = SRectangle_width;
   o.setWidth  = SRectangle_setWidth;
   o.height    = SRectangle_height;
   o.setHeight = SRectangle_setHeight;
   o.move      = SRectangle_move;
   o.inc       = SRectangle_inc;
   o.dec       = SRectangle_dec;
   o.pack      = SRectangle_dump;
   o.unpack    = SRectangle_dump;
   o.dump      = SRectangle_dump;
   return o;
}
function SRectangle_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
function SRectangle_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
function SRectangle_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
function SRectangle_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
function SRectangle_width(){
   return this.right - this.left + 1;
}
function SRectangle_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
function SRectangle_height(){
   return this.bottom - this.top + 1;
}
function SRectangle_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
function SRectangle_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
function SRectangle_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
function SRectangle_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
function SRectangle_dump(d){
   d = RString.nvlStr(d);
   d.append(RClass.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
function SSize2(w, h){
   var o = this;
   o.width    = RInteger.nvl(w);
   o.height   = RInteger.nvl(h);
   o.assign   = SSize2_assign;
   o.set      = SSize2_set;
   o.parse    = SSize2_parse;
   o.toString = SSize2_toString;
   o.dump     = SSize2_dump;
   return o;
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
function TClass(o){
   if(!o){o = this;}
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
function TClass_register(v){
   var o = this;
   var a = v.annotationCd();
   var n = v.name();
   var c = v.code();
   if(!a || !c){
      throw new TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", RClass.dump(o), a, n, c);
   }
   var as = o._annotations[a];
   if(!as){
      as = o._annotations[a] = new Object();
   }
   if(as[c]){
      throw new TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", RClass.dump(o), a, n, c, v.toString());
   }
   as[c] = v;
   o._attributes[n] = v;
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
         if(ls[n]){
            RLogger.fatal(o, null, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, c.name, n, a.toString());
         }
         var a = as[n];
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
function TClassBase(o){
   if(!o){o = this;}
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
   if(!o){o = this;}
   o.name       = null;
   o.count      = 0;
   o.pageSize   = 20;
   o.pageIndex  = 0;
   o.pageCount  = 0;
   o.total      = 0;
   o.rows       = new TList();
   o.createRow  = TDataset_createRow;
   o.row        = TDataset_row;
   o.find       = TDataset_find;
   o.findIndex  = TDataset_findIndex;
   o.push       = TDataset_push;
   o.remove     = TDataset_remove;
   o.removeRow  = TDataset_removeRow;
   o.loadNode   = TDataset_loadNode;
   o.saveViewer = TDataset_saveViewer;
   o.clear      = TDataset_clear;
   o.pack       = TDataset_pack;
   o.dump       = TDataset_dump;
   return o;
}
function TDataset_createRow(){
   var o = this;
   var r = new TRow();
   r.dataset = o;
   o.rows.push(r);
   return r;
}
function TDataset_row(n){
   return (n >= 0 && n < this.count) ? this.rows.get(n) : null;
}
function TDataset_find(){
   var o = this;
   var a = arguments;
   var l = a.length;
   if(0 != l % 2){
      RMessage.fatal(o, null, 'Parameters must is pairs (length={0})', l);
   }
   var rs = o.rows;
   for(var n=rs.count-1; n>=0; n--){
      var r = rs.get(n);
      var f = true;
      for(var i=0; i<l; i+=2){
         if(r.get(a[n]) != a[n+1]){
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
function TDataset_findIndex(id){
   var o = this;
   var rs = o.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.index = id){
         return r;
      }
   }
   return null;
}
function TDataset_push(r){
   this.rows.push(r);
}
function TDataset_remove(i){
   return this.rows.remove(i);
}
function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o.rows.remove(i);
   }
}
function TDataset_loadNode(x){
   var o = this;
   o.name = x.get('name');
   o.pageSize = RInteger.parse(x.get('page_size', 1000));
   o.pageIndex = RInteger.parse(x.get('page', 0));
   o.pageCount = RInteger.parse(x.get('page_count', 1));
   o.total = RInteger.parse(x.get('total'));
   var xrs = x.nodes;
   if(xrs){
      var rs = o.rows;
      var xrc = o.count = xrs.count;
      for(var n=0; n<xrc; n++){
         var xr = xrs.get(n);
         if(xr.isName(RDataset.ROW)){
            var r = rs.memory[n];
            if(!r){
               var r = new TRow();
               r.dataset = o;
               rs.count = n;
               rs.push(r);
            }else{
               r.release();
            }
            r.loadNode(xr);
         }
      }
      rs.count = xrc;
   }
}
function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o.name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v.count = o.rows.count;
   v.rows = o.rows;
   v.dataset = o;
}
function TDataset_clear(){
   var o = this;
   o.rows.clear();
   o.pageSize = 20;
   o.pageIndex = 0;
   o.count = 0;
   o.pageCount = 0;
   o.total = 0;
}
function TDataset_pack(){
   var o = this;
   var rs = o.rows;
   var ss = new TStrings();
   for(var n = 0; n < rs.count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}
function TDataset_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   r.append(' count=', o.count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o.rows){
      var c = o.count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o.rows.get(n).dump(s);
         if(n != o.count-1){
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
function TInvoke(o, w, p){
   if(!o){o = this;}
   o.owner    = w;
   o.callback = p;
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
function TListener(o){
   if(!o){o = this;}
   o.owner    = null;
   o.callback = null;
   o.process  = TListener_process;
   o.dump     = TListener_dump;
   return o;
}
function TListener_process(s, p1, p2, p3, p4, p5){
   var o = this;
   if(o.callback){
      o.callback.call(o.owner ? o.owner : o, s, p1, p2, p3, p4, p5);
   }
}
function TListener_dump(){
   var o = this;
   return RClass.name(o) + ' owner=' + RClass.name(o.owner);
}
function TListeners(o){
   if(!o){o = this;}
   o.listeners = null;
   o.isEmpty   = TListeners_isEmpty;
   o.register  = TListeners_register;
   o.push      = TListeners_push;
   o.process   = TListeners_process;
   o.clear     = TListeners_clear;
   o.dump      = TListeners_dump;
   return o;
}
function TListeners_isEmpty(){
   var ls = this.listeners;
   return ls ? (ls.count == 0) : false;
}
function TListeners_register(w, p){
   var l = new TListener();
   l.owner = w;
   l.callback = p;
   this.push(l);
   return l;
}
function TListeners_push(l){
   var o = this;
   if(!l){
      return RLogger.fatal(o, null, 'Listener is null.');
   }
   if(!l.callback){
      return RLogger.fatal(o, null, 'Listener process is null.');
   }
   if(!o.listeners){
      o.listeners = new TList();
   }
   o.listeners.push(l);
}
function TListeners_process(s, p1, p2, p3, p4, p5){
   var ls = this.listeners;
   if(ls){
      var c = ls.count;
      for(var n = 0; n < c; n++){
         var l = ls.get(n);
         l.process(s, p1, p2, p3, p4, p5);
      }
   }
}
function TListeners_clear(){
   var o = this;
   if(o.listeners){
      o.listeners.clear();
   }
}
function TListeners_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   var ls = o.listeners;
   var c = ls.length;
   for(var n = 0; n < c; n++){
      r.append('\n   ' + ls[n].dump());
   }
   return r;
}
function TLoaderListener(o){
   if(!o){o = this;}
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
function TLocker(o){
   if(!o){o = this;}
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
   o.type        = EMessage.None;
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
   o.type        = RString.toLower(config.name);
   o.message     = config.nvl('message');
   o.attrType    = config.nvl('type');
   o.redirect    = config.nvl('redirect');
   var desc = config.nvl('description');
   o.description = desc.replace(/\\n/g, '\n');
}
function TMessage_saveConfig(config){
   var o = this;
   config.name = o.type;
   config.set('message', o.message);
   config.set('description', o.description);
}
function TMessage_icon(){
   return 'sys.msg.' + this.type;
}
function TMessages(){
   var o = this;
   o.items      = new TList();
   o.hasMessage = TMessages_hasMessage;
   o.message    = TMessages_message;
   o.messages   = TMessages_messages;
   o.type       = TMessages_type;
   o.push       = TMessages_push;
   return o;
}
function TMessages_hasMessage(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}
function TMessages_message(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this.items.count; n++){
      var msg = this.items.get(n);
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
      this.items.push(msg);
   }
}
function TNode(o){
   if(!o){o = this;}
   o._name        = 'Node';
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   o.isName       = TNode_isName;
   o.name         = TNode_name;
   o.value        = TNode_value;
   o.contains     = TNode_contains;
   o.hasAttribute = TNode_hasAttribute;
   o.attributes   = TNode_attributes;
   o.hasNode      = TNode_hasNode;
   o.node         = TNode_node;
   o.nodes        = TNode_nodes;
   o.get          = TNode_get;
   o.set          = TNode_set;
   o.find         = TNode_find;
   o.findNode     = TNode_findNode;
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
function TNode_value(){
   return this._value;
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
function TNode_find(name, attrs){
   if(this._nodes){
      var c = this._nodes.count;
      if(name != null){
         name = name.toLowerCase();
      }
      var len = arguments.length;
      for(var n = 0; n < c; n++){
         var node = this._nodes.get(n);
         if(name != null && name != node._name.toLowerCase()){
            continue;
         }
         var finded = true;
         for(var i = 1; i < len; i += 2){
            if(i+1 < len){
               if(node._attributes.get(arguments[n]) != arguments[n+1]){
                  finded = false;
                  break;
               }
            }else{
               if(node._value != arguments[n]){
                  finded = false;
                  break;
               }
            }
         }
         if(finded){
            return node;
         }
      }
   }
   return null;
}
function TNode_findNode(name, value){
   var o = this;
   var at = new TAttributes();
   var nd = null;
   if(o._attributes != null){
      at = o._attributes;
   }
   if(at.get(name) == value){
      nd = o;
   }else{
     if(o.hasNode()){
        for(var n = 0; n< o._nodes.count; n++){
           nd = o._nodes.get(n).findNode(name, value);
           if(nd != null){
              break;
           }
        }
     }
   }
   return nd;
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
function TRow(o){
   if(!o){o = this;}
   TAttributes(o);
   o.dataset       = ds;
   o.index         = null;
   o.uniqueId      = null;
   o.status        = null;
   o.loadNode      = TRow_loadNode;
   o.saveNode      = TRow_saveNode;
   o.copy          = TRow_copy;
   o.toAttributes  = TRow_toAttributes;
   o.dump          = TRow_dump;
   return o;
}
function TRow_loadNode(x){
   if(x && x.attrs){
      var o = this;
      o.index = x.get('_id');
      o.status = x.get('_status');
      o.uniqueId = x.get('ouid');
      o.append(x.attrs);
   }
}
function TRow_saveNode(x){
   if(x){
      var o = this;
      x.set('_id', o.index);
      x.set('_status', o.status);
      var c = o.count;
      for(var n=0; n<c; n++){
         x.set(o.names[n], o.values[n]);
      }
   }
}
function TRow_copy(){
   var o = this;
   var r = new TRow();
   r.dataset = o.dataset;
   r.index = o.index;
   r.status = o.status;
   r.uniqueId = o.uniqueId;
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
   a.set(RDataset.ROW_STATUS, o.status);
   a.append(o);
   return a;
}
function TRow_dump(s){
   var o = this;
   var c = o.count;
   s = RString.nvlStr(s);
   s.append(RClass.name(o), ' [', o.status, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
function TSpeed(o){
   if(!o){o = this;}
   o.arguments  = arguments;
   o.start      = new Date().getTime();
   o.callerName = RMethod.name(TSpeed.caller);
   o.record     = TSpeed_record
   return o;
}
function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   RLogger.log(ELogger.Debug, o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
