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
