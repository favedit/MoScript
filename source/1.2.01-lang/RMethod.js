//==========================================================
// <T>对象类的函数处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RMethod = function RMethod(){
   var o = this;
   //..........................................................
   // @attribute
   o._virtuals   = new Object();
   o._properties = new Object();
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.RMethod.prototype.construct = function RMethod_construct(){
   var o = this;
   o.empty.__empty = true;
   o.emptyTrue.__empty = true;
   o.emptyFalse.__empty = true;
}

//==========================================================
// <T>测试对象是否是为函数。</T>
//
// @method
// @param value:Object 函数对象
// @return Boolean 否是为函数
//==========================================================
MO.RMethod.prototype.isFunction = function RMethod_isFunction(value){
   return typeof(value) == 'function';
}

//==========================================================
// <T>测试对象是否是为空函数。</T>
//
// @method
// @param value:Object 函数对象
// @return Boolean 否是为空函数
//==========================================================
MO.RMethod.prototype.isEmpty = function RMethod_isEmpty(value){
   return (value && value.__empty);
}

//==========================================================
// <T>测试对象是否是为虚函数。</T>
//
// @method
// @param value:Object 函数对象
// @return Boolean 否是为虚函数
//==========================================================
MO.RMethod.prototype.isVirtual = function RMethod_isVirtual(value){
   return (value && value.__virtual);
}

//==========================================================
// <T>获得函数的字符串名称。</T>
//
// @method
// @param value:Function 函数对象
// @return String 字符串名称
//==========================================================
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

//==========================================================
// <T>获得含有参数信息的函数的字符串名称。</T>
//
// @method
// @param value:Function 函数对象
// @return String 字符串名称
//==========================================================
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

//==========================================================
// <T>没有返回值的空函数定义。</T>
//
// @method
//==========================================================
MO.RMethod.prototype.empty = function RMethod_empty(){
}

//==========================================================
// <T>返回值为真的空函数定义。</T>
//
// @method
// @return Boolean 真值
//==========================================================
MO.RMethod.prototype.emptyTrue = function RMethod_emptyTrue(){
   return true;
}

//==========================================================
// <T>返回值为假的空函数定义。</T>
//
// @method
// @return Boolean 假值
//==========================================================
MO.RMethod.prototype.emptyFalse = function RMethod_emptyFalse(){
   return false;
}

//==========================================================
// <T>空调用。</T>
//
// @method
// @return Boolean 假值
//==========================================================
MO.RMethod.prototype.emptyCall = function RMethod_emptyCall(){
}

//==========================================================
// <T>创建一个虚函数。</T>
//
// @method
// @param value:Object 对象实例
// @param name:String 函数名称
// @return Function 虚函数
//==========================================================
MO.RMethod.prototype.virtual = function RMethod_virtual(value, name){
   var o = this;
   var method = null;
   var code = MO.Class.name(value) + '.' + name;
   if(o._virtuals[code]){
      method = o._virtuals[code];
   }else{
      // 创建函数对象
      var source = 'throw new Error(\'Virtual method be called.(' + code + ')\');';
      method = new Function(source);
      method.__virtual = true;
      method.__name = code;
      o._virtuals[code] = method;
   }
   return method;
}

//==========================================================
// <T>创建或获得一个属性获取函数。</T>
//
// @method
// @param name:String 变量名称
// @param methodName:String 函数名称
// @return Function 函数
//==========================================================
MO.RMethod.prototype.makePropertyGet = function RMethod_makePropertyGet(name, methodName){
   var o = this;
   var code = name + '|' + methodName;
   var method = null;
   if(o._properties[code]){
      method = o._properties[code];
   }else{
      // 创建函数对象
      var source = 'return this.' + name + ';';
      method = new Function(source);
      o._properties[code] = method;
   }
   return method;
}

//==========================================================
// <T>创建一个属性获取函数。</T>
//
// @method
// @param name:String 变量名称
// @param methodName:String 函数名称
// @return Function 函数
//==========================================================
MO.RMethod.prototype.makePropertyGetSource = function RMethod_makePropertyGet(name, methodName){
   var o = this;
   // 创建函数对象
   var source = 'return this.' + name + ';';
   var method = new Function(source);
   return method;
}

//==========================================================
// <T>创建或获得一个属性设置函数。</T>
//
// @method
// @param name:String 变量名称
// @param methodName:String 函数名称
// @return Function 函数
//==========================================================
MO.RMethod.prototype.makePropertySet = function RMethod_makePropertySet(name, methodName){
   var o = this;
   var code = name + '|' + methodName;
   var method = null;
   if(o._properties[code]){
      method = o._properties[code];
   }else{
      // 创建函数对象
      var source = 'this.' + name + '=value;';
      method = new Function('value', source);
      o._properties[code] = method;
   }
   return method;
}
//..........................................................
// 实例化内容
MO.RMethod = new MO.RMethod();
MO.Method = MO.RMethod;
MO.Method.construct();
