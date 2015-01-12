//==========================================================
// <T>对象类的描述信息。</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
function TClass(o){
   if(!o){o = this;}
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
   o.abstract       = false;
   o.styles         = new Array();
   o.instances      = new Array();
   //..........................................................
   // @method
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

//==========================================================
// <T>向当前类对象注册一个属性。</T>
//
// @method
// @param v:value:Object 描述对象
//==========================================================
function TClass_register(v){
   var o = this;
   // 检查类型和名称的合法性
   var a = v.annotationCd();
   var n = v.name();
   var c = v.code();
   if(!a || !c){
      throw new TError(o, "Unknown annotation. (class={1},annotation={2},name={3},code={4})", RClass.dump(o), a, n, c);
   }
   // 获得一个Annotation的类型容器
   var as = o._annotations[a];
   if(!as){
      as = o._annotations[a] = new Object();
   }
   if(as[c]){
      throw new TError(o, "Duplicate annotation. (class={1},annotation={2},name={3},code={4},value={5})", RClass.dump(o), a, n, c, v.toString());
   }
   as[c] = v;
   // 设置属性
   o._attributes[n] = v;
}

//==========================================================
// <T>当前类接收其他类所有的描述信息。</T>
//
// @method
// @param c:class:TClass 类对象
//==========================================================
function TClass_assign(c){
   var o = this;
   //..........................................................
   // 复制描述器
   for(var an in c._annotations){
      // 在自己当前对象内查找描述的类型容器
      var ls = o._annotations[an];
      if(!ls){
         ls = o._annotations[an] = new Object();
      }
      // 复制指定对象内的类型到自己对象内
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
   //..........................................................
   // 复制属性集合
   for(var n in c._attributes){
      var a = c._attributes[n];
      if(a.construct != Function){
         o._attributes[n] = c._attributes[n];
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
function TClass_annotations(a){
   var o = this;
   var r = o._annotations[a];
   if(!r){
      RLogger.fatal(o, null, "Can't find annotations. (annotation={1}, class={2})", a, o.name);
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

//==========================================================
// <T>根据名称查找描述器。</T>
//
// @method
// @param p:name:String 名称
// @return Object 描述对象
//==========================================================
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

//==========================================================
// <T>根据属性查找描述器。</T>
//
// @method
// @param p:name:String 名称
// @return Object 描述对象
//==========================================================
function TClass_attributeFind(p){
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
function TClass_style(n){
   var o = this;
   // 从缓冲中获得样式名称，如果存在，则直接返回
   if(o.styles[n]){
      return o.styles[n];
   }
   // 递规找到自己或父类上注册的名称
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
   // 如果未注册，则告诉用户错误
   if(!a){
      RLogger.fatal(o, null, "No register style annotation. (name={1}, linker={2}, class={3})", o.name + '_' + n, o.liner, o.name);
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
function TClass_build(){
   var o = this;
   //..........................................................
   // 检查类中是否存在虚函数
   for(var n in o.instance){
      var v = o.instance[n];
      if(v != null){
         if((v.constructor == Function) && v.__virtual){
            o.abstract = true;
            break;
         }
      }
   }
   //..........................................................
   // 初始化属性对象
   var ps = o._annotations[EAnnotation.Property];
   if(ps){
      for(var n in ps){
         var p = ps[n];
         p.build(o.instance);
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
function TClass_newInstance(){
   var o = this;
   // 检测要实例化的类是否为虚类
   var r = o.alloc();
   if(!r){
      // 判断是否为虚类
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
      // 同一个类的实例中全部共享base对象，中间不能存私有树据。
      var ro = o.instance;
      if(!ro){
         return RLogger.fatal(o, null, "Class instance is empty. (name={1})", o.name);
      }
      r = new ro.constructor();
      for(var n in ro){
         var v = ro[n];
         if(v != null){
            // 特殊属性处理
            if((n == '__base') || (n == '__inherits')){
               r[n] = ro[n];
               continue;
            }
            // 递归创建所有子对象
            if(!RClass.isBase(v)){
               v = RObject.clone(v);
            }
         }
         r[n] = v;
      }
      // 初始化对象
      r.__class = o;
      if(r.construct){
         r.construct();
      }
   }
   return r;
}

//==========================================================
//<T>获得当前没有使用的对象。</T>
//
//@method
//@param v:value:Object 对象
//==========================================================
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

//==========================================================
//<T>回收对象。</T>
//
//@method
//@param v:value:Object 对象
//==========================================================
function TClass_free(v){
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
