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
   o.Listener = 'listener';
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
   MO.TClass_assign = function TClass_assign(clazz){
      var o = this;
      for(var annotationName in clazz._annotations){
         var annotations = o._annotations[annotationName];
         if(!annotations){
            annotations = o._annotations[annotationName] = new Object();
         }
         var clazzAnnotations = clazz._annotations[annotationName];
         for(var name in clazzAnnotations){
            var annotation = clazzAnnotations[name];
            if(!annotation._duplicate){
               if(annotations[name]){
                  throw new TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, clazz.name, n, annotation.toString());
               }
            }
            if(annotation._inherit){
               annotations[name] = annotation;
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
      var instance = o.alloc();
      if(!instance){
         if(o._abstract){
            var message = new TString();
            for(var name in o.instance){
               var value = o.instance[name];
               if(RMethod.isVirtual(value)){
                  if(!message.isEmpty()){
                     message.append(',');
                  }
                  message.append(value._name);
               }
            }
            throw new TError(o, "Abstract Class can't be create.(name={1})\n[{2}]", o.name, message);
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
               if(!RClass.isBase(value)){
                  value = RObject.clone(value);
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
      o.refresh      = TDate_refresh;
      o.setYear      = TDate_setYear;
      o.setMonth     = TDate_setMonth;
      o.setDay       = TDate_setDay;
      o.setHour      = TDate_setHour;
      o.setMinute    = TDate_setMinute;
      o.setSecond    = TDate_setSecond;
      o.setDate      = TDate_setDate;
      o.addYear      = TDate_addYear;
      o.addMonth     = TDate_addMonth;
      o.addDay       = TDate_addDay;
      o.addMseconds  = TDate_addMseconds;
      o.now          = TDate_now;
      o.parse        = TDate_parse;
      o.parseAuto    = TDate_parseAuto;
      o.format       = TDate_format;
      o.clone        = TDate_clone;
      o.dump         = TDate_dump;
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
   MO.TDate_addYear = function TDate_addYear(value){
      var o = this;
      o.date.setFullYear(o.date.getFullYear() + parseInt(value));
      o.refresh();
   }
   MO.TDate_addMonth = function TDate_addMonth(value){
      var o = this;
      o.date.setMonth(o.date.getMonth() + parseInt(value));
      o.refresh();
   }
   MO.TDate_addDay = function TDate_addDay(value){
      var o = this;
      o.date.setTime(o.date.getTime() + parseInt(value) * 1000 * 60 * 60 * 24);
      o.refresh();
   }
   MO.TDate_addMseconds = function TDate_addMseconds(value){
      var o = this;
      o.date.setTime(o.date.getTime() + parseInt(value));
      o.refresh();
   }
   MO.TDate_now = function TDate_now(){
      var o = this;
      o.date = new Date();
      o.refresh();
   }
   MO.TDate_parse = function TDate_parse(value, format){
      return RDate.parse(this, value, format);
   }
   MO.TDate_parseAuto = function TDate_parseAuto(value){
      return RDate.autoParse(this, value);
   }
   MO.TDate_format = function TDate_format(format){
      return RDate.formatDate(this, format);
   }
   MO.TDate_clone = function TDate_clone(){
      var value = new Date();
      value.setTime(this.date.getTime());
      return new TDate(value);
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
            MO.Logger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
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
      o._scopeCd = RClass.register(o, new AGetter('_scopeCd'), EScope.Global);
      return o;
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
      o._span       = RClass.register(o, new AGetter('_span'), 0);
      o._spanSecond = RClass.register(o, new AGetter('_spanSecond'), 0);
      o.setup       = FTimer_setup;
      o.current     = FTimer_current;
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
   MO.RArray = new RArray();
}
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
MO.RBlob = new MO.RBlob();
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
      var base = MO.Runtime.nvl(p, s);
      base.__inherits = new Array();
      var count = arguments.length;
      for(var i = 2; i < count; i++){
         base.__inherits.push(RMethod.name(arguments[i]));
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
            n = RMethod.name(v);
         }else if(v.constructor != String){
            MO.Logger.fatal(o, null, 'Find class failure. (value={1})', v);
         }
      }
      return o._classes[n];
   }
   MO.RClass.prototype.register = function RClass_register(instance, annotations, defaultValue){
      var o = this;
      var name = RMethod.name(instance.constructor);
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
   MO.RClass.prototype.create = function RClass_create(clazz){
      var o = this;
      var className = null;
      var typeName = typeof(clazz);
      if(typeName == 'function'){
         className = RMethod.name(clazz);
      }else if(typeName == 'string'){
         className = clazz;
      }else{
         throw new TError(o, 'Param is invlid (clazz={1})', clazz);
      }
      return o.createByName(className);
   }
   MO.RClass.prototype.createByName = function RClass_createByName(className){
      var o = this;
      var clazz = o.forName(className);
      if(!clazz){
         throw new TError(o, 'Cant find class. (name={1})', clazz);
      }
      return clazz.newInstance();
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
                  MO.Logger.fatal(o, null, 'Parent class is too many. (name={1})', name);
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
                  MO.Logger.fatal(o, null, 'Parent class is not exists. (name={1})', name);
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
         return MO.Logger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
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
            return MO.Logger.fatal(o, 'Unknown scope code. (name={1})', n);
      }
      MO.Logger.info(o, 'Create console. (name={1}, scope={2})', n, REnum.decode(EScope, s));
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
   MO.Console = MO.RConsole;
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
   MO.RFloat.prototype.unitFormat = function RFloat_unitFormat(v, l, lp, r, rp, divide, unit) {
      var o = this;
      if (l == null) {
         l = 0;
      }
      if (lp == null) {
         lp = o.LEFT_CHAR;
      }
      if (r == null) {
         r = 6;
      }
      if (rp == null) {
         rp = o.LEFT_CHAR;
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
      var fl = RString.lpad(sl, l, lp);
      var flc = new TString();
      for (var i = 1; i - 1 < fl.length; i++) {
         flc.append(fl.substring(i - 1, i));
         if (fl.length - i > 0 && (fl.length - i) % 3 == 0) {
            flc.append(',');
         }
      }
      var fr = RString.rpad(sr, r, rp);
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
   MO.RFloat = new RFloat();
}
with(MO){
   MO.RHex = function RHex(){
      var o = this;
      o.NUMBER = '0x123456789ABCDEF';
      o.PAD    = '0';
      return o;
   }
   MO.RHex.prototype.isValid = function RHex_isValid(value){
      return RString.isPattern(value, this.NUMBER);
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
      return length ? RString.lpad(result, length, this.PAD) : result;
   }
   MO.RHex = new RHex();
   MO.Lang.Hex = MO.RHex;
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
   MO.Lang.Integer = MO.RInteger;
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
      var name = null;
      var caller = RLogger_debug.caller;
      if(caller){
         name = RMethod.name(caller);
      }else if(arguments.caller){
         name = RMethod.name(arguments.caller[0]);
      }
      if(name == null){
         name = 'unknown';
      }else{
         name = name.replace('_', '.');
      }
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|D [' + RString.rpad(name, o._labelLength) + '] ');
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
   MO.RLogger.prototype.info = function RLogger_info(owner, message, params){
      var o = this;
      var name = null;
      var caller = RLogger_info.caller;
      if(caller){
         name = RMethod.name(caller);
      }else if(arguments.caller){
         name = RMethod.name(arguments.caller[0]);
      }
      if(name == null){
         name = 'unknown';
      }else{
         name = name.replace('_', '.');
      }
      var result = new TString();
      result.append(RDate.format('yymmdd-hh24miss.ms'));
      result.append('|I [' + RString.rpad(name, o._labelLength) + '] ');
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
         message = message.replace('{' + (n - 1) + '}', s);
      }
      result.append(message);
      o.output(owner, result.flush());
   }
   MO.RLogger.prototype.warn = function RLogger_warn(owner, message, params){
      var o = this;
      var name = null;
      var caller = RLogger_warn.caller;
      if(caller){
         name = RMethod.name(caller);
      }else if(arguments.caller){
         name = RMethod.name(arguments.caller[0]);
      }
      if(name == null){
         name = 'unknown';
      }else{
         name = name.replace('_', '.');
      }
      var result = new TString();
      result.append(RDate.format('yymmdd-hh24miss.ms'));
      result.append('|W [' + RString.rpad(name, o._labelLength) + '] ');
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
         message = message.replace('{' + (n - 1) + '}', s);
      }
      result.append(message);
      o.output(owner, result.flush());
   }
   MO.RLogger.prototype.error = function RLogger_error(sf, ms, params){
      var o = this;
      var name = null;
      var caller = RLogger_error.caller;
      if(caller){
         name = RMethod.name(caller);
      }else if(arguments.caller){
         name = RMethod.name(arguments.caller[0]);
      }
      if(name == null){
         name = 'unknown';
      }else{
         name = name.replace('_', '.');
      }
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|E [' + RString.rpad(name, o._labelLength) + '] ');
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
   MO.RLogger.prototype.fatal = function RLogger_fatal(sf, er, ms, params){
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
   MO.RLogger.prototype.show = function RLogger_show(sf, ms, params){
      var o = this;
      var name = null;
      var caller = RLogger_show.caller;
      if(caller){
         name = RMethod.name(caller);
      }else if(arguments.caller){
         name = RMethod.name(arguments.caller[0]);
      }
      if(name == null){
         name = 'unknown';
      }else{
         name = name.replace('_', '.');
      }
      var r = new TString();
      r.append(RDate.format('yymmdd-hh24miss.ms'));
      r.append('|I [' + RString.rpad(name, o._labelLength) + '] ');
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
   MO.Logger = new RLogger();
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
   MO.Method = MO.RMethod;
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
   MO.Lang.String = MO.RString;
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
