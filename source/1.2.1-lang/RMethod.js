//==========================================================
// <T>对象类的函数处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RMethod = new function RMethod(){
   var o = this;
   //..........................................................
   // @attribute
   o._virtuals  = new Object();
   //..........................................................
   // @method
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
   //..........................................................
   // @construct
   o.empty.__empty = true;
   o.emptyTrue.__empty = true;
   o.emptyFalse.__empty = true;
   return o;
}

//==========================================================
// <T>测试对象是否是为函数。</T>
//
// @method
// @param v:value:Object 函数对象
// @return Boolean 否是为函数
//==========================================================
function RMethod_isFunction(v){
   return typeof(v) == 'function';
}

//==========================================================
// <T>测试对象是否是为空函数。</T>
//
// @method
// @param v:value:Object 函数对象
// @return Boolean 否是为空函数
//==========================================================
function RMethod_isEmpty(v){
   return (v && v.__empty);
}

//==========================================================
// <T>测试对象是否是为虚函数。</T>
//
// @method
// @param v:value:Object 函数对象
// @return Boolean 否是为虚函数
//==========================================================
function RMethod_isVirtual(v){
   return (v && v.__virtual);
}

//==========================================================
// <T>获得函数的字符串名称。</T>
//
// @method
// @param p:value:Function 函数对象
// @return String 字符串名称
//==========================================================
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

//==========================================================
// <T>获得含有参数信息的函数的字符串名称。</T>
//
// @method
// @param p:value:Function 函数对象
// @return String 字符串名称
//==========================================================
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

//==========================================================
// <T>没有返回值的空函数定义。</T>
//
// @method
//==========================================================
function RMethod_empty(){
}

//==========================================================
// <T>返回值为真的空函数定义。</T>
//
// @method
// @return Boolean 真值
//==========================================================
function RMethod_emptyTrue(){
   return true;
}

//==========================================================
// <T>返回值为假的空函数定义。</T>
//
// @method
// @return Boolean 假值
//==========================================================
function RMethod_emptyFalse(){
   return false;
}

//==========================================================
// <T>空调用。</T>
//
// @method
// @return Boolean 假值
//==========================================================
function RMethod_emptyCall(){
}

//==========================================================
// <T>创建一个虚函数。</T>
//
// @method
// @param v:value:Object 对象实例
// @param m:method:String 函数名称
// @return Function 虚函数
//==========================================================
function RMethod_virtual(v, m){
   var o = this;
   var n = RClass.name(v) + '.' + m;
   if(o._virtuals[n]){
      return o._virtuals[n];
   }
   // 创建虚函数对象
   var f = function(){throw new Error('Virtual method be called.(' + n + ')');};
   f.__virtual = true;
   f.__name = n;
   o._virtuals[n] = f;
   return f;
}
