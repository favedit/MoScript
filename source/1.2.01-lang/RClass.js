//==========================================================
// <T>对象类的管理工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RClass = function RClass(){
   var o = this;
   //..........................................................
   // @attribute
   o._codes   = new Array();
   o._classes = new Object();
   return o;
}

//==========================================================
// <T>判断某个对象是否为基础类型。</T>
//
// @method
// @param value:Object 对象
// @return Boolean 是否基础类型
//==========================================================
MO.RClass.prototype.isBase = function RClass_isBase(value){
   if(value != null){
      var typeName = typeof(value);
      return MO.Class.isBaseName(typeName);
   }
   return false;
}

//==========================================================
// <T>判断某个名称是否为基础类型。</T>
//
// @method
// @param typeName:String 名称
// @return Boolean 是否基础类型
//==========================================================
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

//==========================================================
// <T>判断某个名称是否为基础数据类型。</T>
//
// @method
// @param typeName:String 名称
// @return Boolean 是否基础数据类型
//==========================================================
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

//==========================================================
// <T>判断某个类型是否为基础类型。</T>
//
// @method
// @param clazz:Object 类型
// @return Boolean 是否基础类型
//==========================================================
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

//==========================================================
// <T>判断某个类型是否为基础数据类型。</T>
//
// @method
// @param clazz:Object 类型
// @return Boolean 是否基础数据类型
//==========================================================
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

//==========================================================
// <T>判断某个实例的类名是指定名称。</T>
//
// @method
// @param value:Object 实例对象
// @param name:String 类名称
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.RClass.prototype.isName = function RClass_isName(value, name){
   return (this.name(value) == name);
}

//==========================================================
// <T>判断某个实例的类对象是指定类对象。</T>
//
// @method
// @param value:Object 实例对象
// @param clazz:Function 类函数
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//=========================================================
MO.RClass.prototype.isClass = function RClass_isClass(value, clazz){
   var o = this;
   MO.Assert.debugNotNull(clazz);
   if(value){
      var name = o.name(clazz);
      if(value.__base){
         return (value.__base[name] != null);
      }else{
         return (o.name(value) == name);
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
MO.RClass.prototype.typeOf = function RClass_typeOf(o){
   if(o && o.constructor){
      return MO.Lang.String.mid(o.constructor.toString(), 'function ', '(');
   }
   return 'Null';
}

//==========================================================
// <T>安全获得对象实例的类型名称，不产生任何例外。</T>
//
// @method
// @param value:Object 对象实例
// @param safe:safe:String 安全类型
// @return String 类型名称字符串
//==========================================================
MO.RClass.prototype.safeTypeOf = function RClass_safeTypeOf(value, safe){
   // 空对象的情况
   if(value == null){
      return 'Null';
   }
   try{
      // 普通数据类型
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
      // 一般类实例对象
      if(value.__class){
         return value.__class.name;
      }
      // 页面对象的情况
      if(value.tagName){
         return 'Html';
      }
      // 普通对象的情况
      for(var name in value){
         return 'Object';
      }
   }catch(e){
      // return e.name + ' ' + e.number + ' ' + e.description + ' ' + e.message;
   }
   // 未知类型的情况
   return 'Unknown';
}

//==========================================================
// <T>检查某个实例的类对象是指定类对象。</T>
// <P>如果不是类对象时，产生例外。</P>
//
// @method
// @param v:value:Object 实例对象
// @param c:constructor:Fcuntion 类函数
//==========================================================
MO.RClass.prototype.checkClass = function RClass_checkClass(v, c){
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

//==========================================================
// <T>获得对象实例的类名称。</T>
//
// @method
// @param value:Object 函数对象
// @return String 类名称
//==========================================================
MO.RClass.prototype.name = function RClass_name(value){
   if(value){
      // 如果对象是标准类的情况
      if(value.__name){
         return value.__name;
      }
      if(value.__class){
         return value.__class.name;
      }
      // 如果对象是函数的情况
      if(typeof(value) == 'function'){
         return MO.Method.name(value);
      }
      // 如果对象是普通对象的情况
      var method = value.constructor;
      if(method){
         return MO.Lang.String.mid(method.toString(), 'function ', '(');
      }
   }
   return null;
}

//==========================================================
// <T>指定当前对象继承自其他类。</T>
//
// @method
// @param self:Object 当前对象
// @param parent:Object 父类传递对象
// @param classes:Function... 继承类函数的列表
// @return Object 含有类继承关系的对象实例
//==========================================================
MO.RClass.prototype.inherits = function RClass_inherits(s, p){
   var base = MO.Runtime.nvl(p, s);
   base.__inherits = new Array();
   var count = arguments.length;
   for(var i = 2; i < count; i++){
      base.__inherits.push(MO.Method.name(arguments[i]));
   }
   return base;
}

//==========================================================
// <T>根据一个类名称，获得一个类的实例。</T>
// <P>如果类不存在，则尝试创建并初始化这个类对象。</P>
//
// @method
// @param name:String 类名称
// @return String 类对象的实例
//==========================================================
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

//==========================================================
// <T>根据类名查找一个类对象。</T>
// <P>如果类不存在，则返回空。</P>
//
// @method
// @param v:value:Object 类名称或类函数
// @return String 类对象的实例
//==========================================================
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

//==========================================================
// <T>注册一个属性到类对象中。</T>
//
// @method
// @param instance:Object 实例对象
// @param annotations:Annotation 标签对象
// @param defaultValue:Object 结果对象
// @return Object 结果对象
//==========================================================
MO.RClass.prototype.register = function RClass_register(instance, annotations, defaultValue){
   var o = this;
   // 注册描述
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
   // 返回内容
   var value = annotation.value();
   return (defaultValue != null) ? defaultValue : value;
}

//==========================================================
// <T>创建一个临时的基类对象。</T>
//
// @method
// @param name:String 类名称
// @return Object 基类对象
//==========================================================
MO.RClass.prototype.createBase = function RClass_createBase(name){
   var base = null;
   if(name){
      var source = 'function ' + name + '(){return this;} new ' + name + '();';
      base = eval(source);
   }
   return base;
}

//==========================================================
// <T>创建一个类对象。</T>
//
// @method
// @param className:String 类名称
// @return TClass 类对象
//==========================================================
MO.RClass.prototype.createClass = function RClass_createClass(className){
   var o = this;
   var clazz = o._classes[className] = new MO.TClass();
   clazz.name = className;
   clazz._base = o.createBase(className);
   clazz._clazz = new clazz._base.constructor();
   eval('MO.' + className)(clazz._clazz);
   return clazz;
}

//==========================================================
// <T>根据一个类函数创建类的实例。</T>
//
// @method
// @param clazz:Function 函数对象
// @return Object 类对象的实例
//==========================================================
MO.RClass.prototype.create = function RClass_create(clazz){
   var o = this;
   // 获得类名称
   var className = null;
   var typeName = typeof(clazz);
   if(typeName == 'function'){
      className = MO.Method.name(clazz);
   }else if(typeName == 'string'){
      className = clazz;
   }else{
      throw new MO.TError(o, 'Param is invlid (clazz={1})', clazz);
   }
   // 创建类的实例
   return o.createByName(className);
}

//==========================================================
// <T>根据一个类名称创建类的实例。</T>
//
// @method
// @param className:String 类名称
// @return Object 类对象的实例
//==========================================================
MO.RClass.prototype.createByName = function RClass_createByName(className){
   var o = this;
   // 获得类对象
   var clazz = o.forName(className);
   if(!clazz){
      throw new MO.TError(o, 'Cant find class. (name={1})', clazz);
   }
   // 创建类的实例
   return clazz.newInstance();
}

//==========================================================
// <T>递归复制一个类实例到一个指定实例中。</T>
//
// @method
// @param source:Object 类实例
// @param target:Object 指定实例
//==========================================================
MO.RClass.prototype.innerCopy = function RClass_innerCopy(source, target){
   var o = this;
   if((source != null) && (target != null)){
      for(var name in source){
         var value = source[name];
         if(value != null){
            var typeName = typeof(value)
            if(typeName == 'function'){
               var targetValue = target[name];
               // Over order: method > empty > virtual > null
               if(targetValue == null){
                  target[name] = value;
               }else if(MO.Method.isVirtual(targetValue)){
                  target[name] = value;
               }else if(!MO.Method.isVirtual(value) && MO.Method.isEmpty(targetValue)){
                  target[name] = value;
               }else if(!MO.Method.isVirtual(value) && !MO.Method.isEmpty(value)){
                  target[name] = value;
               }
               continue;
            }else if(!MO.Class.isBaseName(typeName)){
               // Create child object
               if(target[name] == null){
                  target[name] = new value.constructor();
               }
               o.innerCopy(value, target[name]);
               continue;
            }
         }
         target[name] = value;
      }
   }
}

//==========================================================
// <T>根据类名查找一个类对象。</T>
//
// @method
// @param clazz:Object 对象
//==========================================================
MO.RClass.prototype.build = function RClass_build(clazz){
   var o = this;
   // 找到当前类的父名称，即以字母(F)开头的类
   var inherits = clazz._clazz.__inherits;
   if(inherits && (inherits.constructor == Array)){
      var finded = false;
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         if(MO.Lang.String.startsWith(name, 'F')){
            if(finded){
               MO.Logger.fatal(o, null, 'Parent class is too many. (name={1})', name);
            }
            clazz._parent = MO.Class.forName(name);
            finded = true;
         }
      }
   }
   //..........................................................
   // 用基类创建一个实例，当前实例只有当前类里声明的函数，没有任何继承关系
   var instance = clazz._instance = new clazz._base.constructor();
   // 复制除了以(F)开头的实类以外，所有基类信息到当前实例中
   if(inherits && (inherits.constructor == Array)){
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         if(!MO.Lang.String.startsWith(name, 'F')){
            var findClass = MO.Class.forName(name);
            if(findClass == null){
               MO.Logger.fatal(o, null, 'Parent class is not exists. (name={1})', name);
            }
            MO.Class.innerCopy(findClass._instance, instance);
            clazz.assign(findClass);
         }
      }
   }
   // 复制父类到当前实例中
   if(clazz._parent){
      o.innerCopy(clazz._parent._instance, instance);
      clazz.assign(clazz._parent);
   }
   // 检查基类对象是否存在，如果不存在建立一个基类对象
   if(!instance.__base){
      instance.__base = new MO.TClassBase();
   }
   // 为基容器对象(base)中创建一个当前类的空实例
   instance.__base[clazz.name] = new clazz._base.constructor();
   var cf = clazz._clazz;
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
   //..........................................................
   // 建立类的基容器对象(base)
   if(inherits && (inherits.constructor == Array)){
      var inheritCount = inherits.length;
      for(var i = 0; i < inheritCount; i++){
         var name = inherits[i];
         var baseClass = MO.Class.forName(name);
         var base = instance.__base[name] = new baseClass._base.constructor();
         var baseInstance = baseClass._instance;
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
   //..........................................................
   // 构建类对象
   clazz.build();
   //..........................................................
   // 删除类中所有空属性
   if(MO.Runtime.isRelease()){
      var instance = clazz._instance;
      for(var name in instance){
         var value = instance[name];
         if(value == null){
            delete clazz._instance[name];
         }
      }
   }
}

//==========================================================
//<T>释放一个实例。</T>
//
//@method
//@param instance:FObject 实例对象
//==========================================================
MO.RClass.prototype.free = function RClass_free(instance){
   var clazz = instance.__class;
   MO.Assert.debugNotNull(clazz);
   clazz.free(instance);
}

//==========================================================
// <T>获得一个实例的调试信息。</T>
// <P>调试信息的格式：类型名称<辅助信息>@唯一代码:内容。</P>
//
// @method
// @param v:value:Object 数据内容
// @return String 调试信息
//==========================================================
MO.RClass.prototype.dump = function RClass_dump(v){
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
         return t + '<' + MO.Method.name(v) + '>@' + o.code(v);
      case 'Html':
         // HTML对象的情况
         return t + '<' + v.tagName + '>@' + o.code(v);
      default:
         if(v.__name){
            return t + '<' + v.__name + '>@' + o.code(v);
         }
   }
   return t + '@' + o.code(v);
}
//..........................................................
// 实例化内容
MO.RClass = new MO.RClass();
MO.Class = MO.RClass;
