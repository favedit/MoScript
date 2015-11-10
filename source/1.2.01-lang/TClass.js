﻿//==========================================================
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
   o._abstract      = false;
   o._annotations   = new Object();
   o._attributes    = new Object();
   o._styles        = new Array();
   // @attribute
   o._base          = null;
   o._clazz         = null;
   o._parent        = null;
   // @attribute
   o._instance      = null;
   o._pool          = new MO.TMemoryPool();
   // @attribute
   o.name           = null;
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
// @param annotation:AAnnotation 描述对象
//==========================================================
MO.TClass_register = function TClass_register(annotation){
   var o = this;
   annotation._clazz = o;
   // 检查类型和名称的合法性
   var annotationCd = annotation.annotationCd();
   var ordered = annotation.isOrdered();
   var name = annotation.name();
   var code = annotation.code();
   if(!annotationCd || !code){
      throw new MO.TError(o, "Unknown annotation. (class={1}, annotation={2}, name={3}, code={4})", MO.Class.dump(o), annotation, name, code);
   }
   // 获得一个Annotation的类型容器
   var annotations = o._annotations[annotationCd];
   if(!annotations){
      if(ordered){
         annotations = new MO.TObjects();
      }else{
         annotations = new Object();
      }
      o._annotations[annotationCd] = annotations;
   }
   // 检查重复
   if(!annotation._duplicate){
      var duplicate = false;
      if(ordered){
         var acount = annotations.count();
         for(var i = 0; i < acount; i++){
            var afind = annotations.at(i);
            if(afind.code() == code){
               duplicate = true;
               break;
            }
         }
      }else{
         if(annotations[code]){
            duplicate = true;
         }
      }
      if(duplicate){
         throw new MO.TError(o, "Duplicate annotation. (class={1}, annotation={2}, name={3}, code={4}, value={5})", MO.Class.dump(o), annotation, name, code, annotation.toString());
      }
   }
   // 设置内容
   if(ordered){
      annotations.push(annotation);
   }else{
      annotations[code] = annotation;
   }
   o._attributes[name] = annotation;
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
      var clazzAnnotations = clazz._annotations[annotationName];
      // 在自己当前对象内查找描述的类型容器
      var annotations = o._annotations[annotationName];
      if(!annotations){
         annotations = o._annotations[annotationName] = new clazzAnnotations.constructor();
      }
      // 复制指定对象内的类型到自己对象内
      if(clazzAnnotations.constructor == MO.TObjects){
         annotations.append(clazzAnnotations);
      }else{
         for(var name in clazzAnnotations){
            var annotation = clazzAnnotations[name];
            // 检查重复
            if(!annotation.isDuplicate()){
               if(annotations[name]){
                  throw new MO.TError(o, "Duplicate annotation. (annotation={1}, {2}.{3}={4}.{5}, source={6})", annotationName, o.name, name, clazz.name, name, annotation.toString());
               }
            }
            // 复制描述器
            if(annotation._inherit){
               annotations[name] = annotation;
            }
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
// @param annotationCd:EAnnotation 描述类型
// @return Object 描述对象集合
//==========================================================
MO.TClass_annotations = function TClass_annotations(annotationCd){
   var o = this;
   var annotation = o._annotations[annotationCd];
   if(!annotation){
      MO.Logger.fatal(o, null, "Can't find annotations. (annotation_cd={1}, class={2})", annotationCd, o.name);
   }
   return annotation;
}

//==========================================================
// <T>获得一个描述类型下的一个描述对象。</T>
//
// @method
// @param annotationCd:EAnnotation 描述类型
// @param name:String 名称
// @return Object 描述对象
//==========================================================
MO.TClass_annotation = function TClass_annotation(annotationCd, name){
   var o = this;
   var annotation = null;
   var annotations = o._annotations[annotationCd];
   if(annotations){
      annotation = annotations[name];
   }
   if(!annotation){
      MO.Logger.fatal(o, null, "Can't find annotation. (annotation_cd={1}, name={2}, class={3})", annotationCd, name, o.name);
   }
   return annotation;
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
   for(var name in o._annotations){
      var annotations = o._annotations[name];
      if(annotations){
         var annotation = annotations[p];
         if(annotation != null){
            if(annotation.constructor != Function){
               return annotation;
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
   var attribute = this._attributes[p];
   if(attribute){
      if(attribute.constructor != Function){
         return attribute;
      }
   }
   return null;
}

//==========================================================
// <T>获得一个类关联的样式描述。</T>
//
// @method
// @param name:String 名称
// @return String 样式名称
//==========================================================
MO.TClass_style = function TClass_style(name){
   var o = this;
   // 从缓冲中获得样式名称，如果存在，则直接返回
   var styles = o._styles;
   if(styles[name]){
      return styles[name];
   }
   // 递规找到自己或父类上注册的名称
   var annotation = null;
   var find = o;
   while(find){
      var annotations = find._annotations[MO.EAnnotation.Style];
      if(annotations){
         annotation = annotations[name];
         if(annotation){
            break;
         }
      }
      find = find._parent;
   }
   // 如果未注册，则告诉用户错误
   if(!annotation){
      MO.Logger.fatal(o, null, "No register style annotation. (class={1}, name={2})", o.name, o.name + '_' + name);
   }
   // 生成样式名称
   var styleName = find.name + '_' + annotation.style();
   styles[name] = styleName;
   return styleName;
}

//==========================================================
// <T>类对象构建处理。</T>
//
// @method
//==========================================================
MO.TClass_build = function TClass_build(){
   var o = this;
   var instance = o._instance;
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
   var instance = null;
   // 判断是否为虚类
   if(o._abstract){
      var message = new MO.TString();
      for(var name in o._instance){
         var value = o._instance[name];
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
   var template = o._instance;
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
   return instance;
}

//==========================================================
// <T>收集一个实例。</T>
//
// @method
// @return FObject 实例
//==========================================================
MO.TClass_alloc = function TClass_alloc(){
   return this._pool.alloc();
}

//==========================================================
// <T>释放一个实例。</T>
//
// @method
// @param instance:FObject 实例
//==========================================================
MO.TClass_free = function TClass_free(instance){
   this._pool.free(instance);
}
