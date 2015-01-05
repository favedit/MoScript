//==========================================================
// <T>对象类的管理工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RClass = new function RClass(){
   var o = this;
   //..........................................................
   // @attribute Boolean 运行模式
   o.codes          = new Array();
   o.classes        = new Object();
   //..........................................................
   // @method
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

//==========================================================
// <T>判断某个对象是否为基础类型。</T>
//
// @method
// @param v:value:Object 对象
// @return Boolean 是否基础类型
//==========================================================
function RClass_isBase(v){
   if(v != null){
      var n = typeof(v);
      return RClass.isBaseName(n);
   }
   return false;
}

//==========================================================
// <T>判断某个名称是否为基础类型。</T>
//
// @method
// @param n:typeName:String 名称
// @return Boolean 是否基础类型
//==========================================================
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

//==========================================================
// <T>判断某个名称是否为基础数据类型。</T>
//
// @method
// @param n:typeName:String 名称
// @return Boolean 是否基础数据类型
//==========================================================
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

//==========================================================
// <T>判断某个类型是否为基础类型。</T>
//
// @method
// @param c:class:Object 类型
// @return Boolean 是否基础类型
//==========================================================
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

//==========================================================
// <T>判断某个类型是否为基础数据类型。</T>
//
// @method
// @param c:class:Object 类型
// @return Boolean 是否基础数据类型
//==========================================================
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

//==========================================================
// <T>判断某个实例的类名是指定名称。</T>
//
// @method
// @param v:value:Object 实例对象
// @param n:name:String 类名称
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
function RClass_isName(v, n){
   return (this.name(v) == n);
}

//==========================================================
// <T>判断某个实例的类对象是指定类对象。</T>
//
// @method
// @param v:value:Object 实例对象
// @param c:constructor:Fcuntion 类函数
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//=========================================================
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

//==========================================================
// <T>获得对象实例的类型名称。</T>
//
// @method
// @param v:value:Object 对象实例
// @return String 类型名称
//==========================================================
function RClass_typeOf(o){
   if(o && o.constructor){
      return RString.mid(o.constructor.toString(), 'function ', '(');
   }
   return 'Null';
}

//==========================================================
// <T>安全获得对象实例的类型名称，不产生任何例外。</T>
//
// @method
// @param v:value:Object 对象实例
// @param safe:safe:String 安全类型
// @return String 类型名称字符串
//==========================================================
function RClass_safeTypeOf(v, safe){
   if(v != null){
      try{
         // 一般类实例对象
         if(v.__class){
            return v.__class.name;
         }
         // 页面对象的情况
         if(v.tagName){
            return 'Html';
         }
         // 一般对象的情况
         if(v.constructor){
            return RString.mid(v.constructor.toString(), 'function ', '(');
         }
         // 普通对象的情况
         for(var name in obj){
            return 'Object';
         }
      }catch(e){}
      // 未知类型的情况
      return 'Unknown';
   }
   // 空对象的情况
   return 'Null';
}

//==========================================================
// <T>检查某个实例的类对象是指定类对象。</T>
// <P>如果不是类对象时，产生例外。</P>
//
// @method
// @param v:value:Object 实例对象
// @param c:constructor:Fcuntion 类函数
//==========================================================
function RClass_checkClass(v, c){
   if(!this.isClass(v, c)){
      throw new Error('Invalid class ' + o.name(o) + '<>' + o.name(c));
   }
}

//==========================================================
// <T>获得对象实例的唯一编号。</T>
//
// @method
// @param v:value:Object 对象实例
// @return Integer 编号
//==========================================================
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

//==========================================================
// <T>获得对象实例的类名称。</T>
//
// @method
// @param v:value:Object 函数对象
// @return String 类名称
//==========================================================
function RClass_name(v){
   if(v){
      // 如果对象是标准类的情况
      if(v.__name){
         return v.__name;
      }
      if(v.__class){
         return v.__class.name;
      }
      // 如果对象是函数的情况
      if(typeof(v) == 'function'){
         return RMethod.name(v);
      }
      // 如果对象是普通对象的情况
      var c = v.constructor;
      if(c){
         return RString.mid(c.toString(), 'function ', '(');
      }
   }
   return null;
}

//==========================================================
// <T>指定当前对象继承自其他类。</T>
//
// @method
// @param s:self:Object 当前对象
// @param p:parent:Object 父类传递对象
// @param c:classes:Function... 继承类函数的列表
// @return Object 含有类继承关系的对象实例
//==========================================================
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

//==========================================================
// <T>根据一个类名称，获得一个类的实例。</T>
// <P>如果类不存在，则尝试创建并初始化这个类对象。</P>
//
// @method
// @param n:name:String 类名称
// @return String 类对象的实例
//==========================================================
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

//==========================================================
// <T>根据类名查找一个类对象。</T>
// <P>如果类不存在，则返回空。</P>
//
// @method
// @param v:value:Object 类名称或类函数
// @return String 类对象的实例
//==========================================================
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

//==========================================================
// <T>注册一个属性到类对象中。</T>
//
// @method
// @param v:value:Object 实例对象
// @param a:annotation:Annotation 标签对象
// @param r:result:Object 结果对象
// @return Object 结果对象
//==========================================================
function RClass_register(v, a, r){
   var n = RMethod.name(v.constructor);
   this.classes[n].register(a);
   return r;
}

//==========================================================
// <T>创建一个临时的基类对象。</T>
//
// @method
// @param n:name:String 类名称
// @return Object 基类对象
//==========================================================
function RClass_createBase(n){
   if(n){
      var s = 'function ' + n + '(){return this;} new ' + n + '();';
      return eval(s);
   }
   return null;
}

//==========================================================
// <T>创建一个类对象。</T>
//
// @method
// @param n:name:String 类名称
// @return TClass 类对象
//==========================================================
function RClass_createClass(n){
   var o = this;
   var c = o.classes[n] = new TClass();
   c.name = n;
   c.base = o.createBase(n);
   c.clazz = new c.base.constructor();
   eval(n + '(c.clazz)');
   return c;
}

//==========================================================
// <T>根据一个类函数创建类的实例。</T>
//
// @method
// @param f:function:Function 函数对象
// @return Object 类对象的实例
//==========================================================
function RClass_create(n){
   var o = this;
   // 获得类名称
   var t = typeof(n);
   if(t == 'function'){
      n = RMethod.name(n);
   }else if(t != 'string'){
      RLogger.fatal(o, null, 'Param is invlid (name={1})', n);
   }
   // 创建类的实例
   return o.createByName(n);
}

//==========================================================
// <T>根据一个类名称创建类的实例。</T>
//
// @method
// @param n:name:String 类名称
// @return Object 类对象的实例
//==========================================================
function RClass_createByName(n){
   var o = this;
   // 获得类对象
   var c = o.forName(n);
   if(!c){
      RLogger.fatal(o, null, 'Cant find class. (name={1})', c);
   }
   // 创建类的实例
   return c.newInstance();
}

//==========================================================
// <T>递归复制一个类实例到一个指定实例中。</T>
//
// @method
// @param s:source:Object 类实例
// @param t:target:Object 指定实例
//==========================================================
function RClass_innerCopy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            var p = typeof(v)
            if(p == 'function'){
               var f = t[n];
               // Over order: method > empty > virtual > null
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
               // Create child object
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

//==========================================================
// <T>根据类名查找一个类对象。</T>
//
// @method
// @param c:class:Object 对象
//==========================================================
function RClass_build(c){
   // 找到当前类的父名称，即以字母(F)开头的类
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
   //..........................................................
   // 用基类创建一个实例，当前实例只有当前类里声明的函数，没有任何继承关系
   var o = c.instance = new c.base.constructor();
   // 复制除了以(F)开头的实类以外，所有基类信息到当前实例中
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
   // 复制父类到当前实例中
   if(c.parent){
      this.innerCopy(c.parent.instance, o);
      c.assign(c.parent);
   }
   // 检查基类对象是否存在，如果不存在建立一个基类对象
   if(!o.__base){
      o.__base = new TClassBase();
   }
   // 为基容器对象(base)中创建一个当前类的空实例
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
   //..........................................................
   // 建立类的基容器对象(base)
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
   //..........................................................
   // 构建类对象
   c.build();
   //..........................................................
   // 删除类中所有空属性
   if(RRuntime.isRelease()){
      for(var n in c.instance){
         var v = c.instance[n];
         if(v == null){
            delete c.instance[n];
         }
      }
   }
}

//==========================================================
// <T>获得一个实例的调试信息。</T>
// <P>调试信息的格式：类型名称<辅助信息>@唯一代码:内容。</P>
//
// @method
// @param v:value:Object 数据内容
// @return String 调试信息
//==========================================================
function RClass_dump(v){
   var o = this;
   // 对象为空的情况
   if(v == null){
      return '@null';
   }
   // 对象为一般实例的情况
   var t = o.safeTypeOf(v);
   switch(t){
      case 'Boolean':
         // 数字的情况
         return 'Boolean:' + v;
      case 'Number':
         // 数字的情况
         return 'Number:' + v;
      case 'String':
         // 字符串的情况
         return t + '<' + v.length + '>:' + v;
      case 'Function':
         // 字符串的情况
         return t + '<' + RMethod.name(v) + '>@' + o.code(v);
      case 'Html':
         // HTML对象的情况
         return t + '<' + v.tagName + '>@' + RRuntime.uid(v);
      default:
         if(v.__name){
            return t + '<' + v.__name + '>@' + o.code(v);
         }
   }
   return t + '@' + o.code(v);
}

//==========================================================
//<T>获得一个实例的调试信息。</T>
//<P>调试信息的格式：类型名称<辅助信息>@唯一代码:内容。</P>
//
//@method
//@param v:value:Object 数据内容
//@return String 调试信息
//==========================================================
function RClass_free(o){
   var c = o.__class;
   if(c){
      c.free(o);
   }
}
