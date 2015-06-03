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
      var r = MO.Runtime.nvl(p, s);
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
   MO.RClass_createClass = function RClass_createClass(className){
      var o = this;
      var clazz = o._classes[className] = new TClass();
      clazz.name = className;
      clazz.base = o.createBase(className);
      clazz.clazz = new clazz.base.constructor();
      eval(className)(clazz.clazz);
      return clazz;
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
      if(MO.Runtime.isRelease()){
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
            r = top.MO.RConsole.createByName(n);
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
   MO.RObject_dispose = function RObject_dispose(item, flag){
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
