//==========================================================
// <T>对象类的描述信息。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
MO.TClass = function TClass(){
   var o = this;
   //..........................................................
   // @attribute 本类是安全对象，禁止内存管理器自动释放
   o.__disposed     = true;
   // @attribute
   o._unused        = null;
   o._annotations   = new Object();
   o._attributes    = new Object();
   // @attribute
   o.name           = null;
   o.parent         = null;
   o.base           = null;
   o.clazz          = null;
   o.instance       = null;
   o._abstract      = false;
   o.styles         = new Array();
   o.instances      = new Array();
   //..........................................................
   // @method
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

//==========================================================
// <T>向当前类对象注册一个属性。</T>
//
// @method
// @param p:annotation:AAnnotation 描述对象
//==========================================================
MO.TClass_register = function TClass_register(p){
   var o = this;
   // 检查类型和名称的合法性
   var a = p.annotationCd();
   var n = p.name();
   var c = p.code();
   if(!a || !c){
      throw new MO.TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", MO.Class.dump(o), a, n, c);
   }
   // 获得一个Annotation的类型容器
   var as = o._annotations[a];
   if(!as){
      as = o._annotations[a] = new Object();
   }
   // 检查重复
   if(!p._duplicate){
      if(as[c]){
         throw new MO.TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", MO.Class.dump(o), a, n, c, p.toString());
      }
   }
   // 设置内容
   as[c] = p;
   o._attributes[n] = p;
}

//==========================================================
// <T>当前类接收其他类所有的描述信息。</T>
//
// @method
// @param clazz:TClass 类对象
//==========================================================
MO.TClass_assign = function TClass_assign(clazz){
   var o = this;
   //..........................................................
   // 复制描述器
   for(var annotationName in clazz._annotations){
      // 在自己当前对象内查找描述的类型容器
      var annotations = o._annotations[annotationName];
      if(!annotations){
         annotations = o._annotations[annotationName] = new Object();
      }
      // 复制指定对象内的类型到自己对象内
      var clazzAnnotations = clazz._annotations[annotationName];
      for(var name in clazzAnnotations){
         var annotation = clazzAnnotations[name];
         // 检查重复
         if(!annotation._duplicate){
            if(annotations[name]){
               throw new MO.TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", an, o.name, n, clazz.name, n, annotation.toString());
            }
         }
         // 复制描述器
         if(annotation._inherit){
            annotations[name] = annotation;
         }
      }
   }
   //..........................................................
   // 复制属性集合
   for(var name in clazz._attributes){
      var attribute = clazz._attributes[name];
      if(attribute.construct != Function){
         o._attributes[name] = clazz._attributes[name];
      }
   }
}

//==========================================================
// <T>获得一个描述类型的描述对象集合。</T>
//
// @method
// @param a:annotation:EAnnotation 描述类型
// @return Object 描述对象集合
//==========================================================
MO.TClass_annotations = function TClass_annotations(a){
   var o = this;
   var r = o._annotations[a];
   if(!r){
      MO.Logger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
   }
   return r;
}

//==========================================================
// <T>获得一个描述类型下的一个描述对象。</T>
//
// @method
// @param a:annotation:EAnnotation 描述类型
// @param n:name:String 名称
// @return Object 描述对象
//==========================================================
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

//==========================================================
// <T>根据名称查找描述器。</T>
//
// @method
// @param p:name:String 名称
// @return Object 描述对象
//==========================================================
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

//==========================================================
// <T>根据属性查找描述器。</T>
//
// @method
// @param p:name:String 名称
// @return Object 描述对象
//==========================================================
MO.TClass_attributeFind = function TClass_attributeFind(p){
   var a = this._attributes[p];
   if(a){
      if(a.constructor != Function){
         return a;
      }
   }
   return null;
}

//==========================================================
// <T>获得一个类关联的样式描述。</T>
//
// @method
// @param n:name:String 名称
// @return String 样式名称
//==========================================================
MO.TClass_style = function TClass_style(n){
   var o = this;
   // 从缓冲中获得样式名称，如果存在，则直接返回
   if(o.styles[n]){
      return o.styles[n];
   }
   // 递规找到自己或父类上注册的名称
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
   // 如果未注册，则告诉用户错误
   if(!a){
      MO.Logger.fatal(o, null, "No register style annotation. (name={1}, linker={2}, class={3})", o.name + '_' + n, o.liner, o.name);
   }
   // 生成样式名称
   var sn = p.name + '_' + a.style();
   o.styles[n] = sn;
   return sn;
}

//==========================================================
// <T>类对象构建处理。</T>
//
// @method
//==========================================================
MO.TClass_build = function TClass_build(){
   var o = this;
   var instance = o.instance;
   //..........................................................
   // 检查类中是否存在虚函数
   for(var name in instance){
      var value = instance[name];
      if(value != null){
         if((value.constructor == Function) && value.__virtual){
            o._abstract = true;
            break;
         }
      }
   }
   //..........................................................
   // 初始化属性对象
   var properties = o._annotations[MO.EAnnotation.Property];
   if(properties){
      for(var name in properties){
         var property = properties[name];
         property.build(instance);
      }
   }
   //..........................................................
   // 生成自动函数
   var sources = o._annotations[MO.EAnnotation.Source];
   if(sources){
      for(var name in sources){
         var source = sources[name];
         source.build(o, instance);
      }
   }
}

//==========================================================
// <T>创建当前类对象的一个实例。</T>
//
// @method
// @param c:class:TClass 类对象
// @return Object 对象实例
//==========================================================
MO.TClass_newInstance = function TClass_newInstance(){
   var o = this;
   // 检测要实例化的类是否为虚类
   var instance = o.alloc();
   if(!instance){
      // 判断是否为虚类
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
      // 同一个类的实例中全部共享base对象，中间不能存私有树据。
      var template = o.instance;
      if(!template){
         return MO.Logger.fatal(o, null, "Class instance is empty. (name={1})", o.name);
      }
      instance = new template.constructor();
      for(var name in template){
         var value = template[name];
         if(value != null){
            // 特殊属性处理
            if((name == '__base') || (name == '__inherits')){
               instance[name] = template[name];
               continue;
            }
            // 递归创建所有子对象
            if(!MO.Class.isBase(value)){
               value = MO.Lang.Object.clone(value);
            }
         }
         instance[name] = value;
      }
      // 初始化对象
      instance.__class = o;
      if(instance.construct){
         instance.construct();
      }
   }
   return instance;
}

//==========================================================
//<T>获得当前没有使用的对象。</T>
//
//@method
//@param v:value:Object 对象
//==========================================================
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

//==========================================================
//<T>回收对象。</T>
//
//@method
//@param v:value:Object 对象
//==========================================================
MO.TClass_free = function TClass_free(v){
   var o = this;
   if(v._using){
      var u = o._unused;
      v.cnext = u;
      o._unused = v;
      v._using = false;
      // 遍历释放子节点
      for(var n in v){
         var cv = v[n];
         if(cv){
            if(!RClass.isBase(cv)){
               // 如果是含有_class的对象，直接free
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
