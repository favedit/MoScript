//==========================================================
// <T>运行库。</T>
//
// @reference
// @author maocy
// @version 141226
//==========================================================
var RRuntime = new function RRuntime(){
   var o = this;
   //..........................................................
   // @attribute
   o._processCd    = EProcess.Release;
   o._supportHtml5 = false;
   // @attribute
   o._nextUid      = 1;
   //..........................................................
   // @method
   o.construct     = RRuntime_construct;
   // @method
   o.isDebug       = RRuntime_isDebug;
   o.isRelease     = RRuntime_isRelease;
   o.supportHtml5  = RRuntime_supportHtml5;
   // @method
   o.nvl           = RRuntime_nvl;
   o.subString     = RRuntime_subString;
   o.className     = RRuntime_className;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//===========================================================
// <T>构造处理。</T>
//
// @method
//===========================================================
function RRuntime_construct(){
   var o = this;
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
}

//==========================================================
// <T>测试是否调试模式。</T>
//
// @method
// @return 是否调试模式
//==========================================================
function RRuntime_isDebug(){
   return (this._processCd == EProcess.Debug);
}

//==========================================================
// <T>测试是否运行模式。</T>
//
// @method
// @return 是否运行模式
//==========================================================
function RRuntime_isRelease(){
   return (this._processCd == EProcess.Release);
}

//==========================================================
// <T>测试是否支持HTML5规范。</T>
//
// @method
// @return 是否支持
//==========================================================
function RRuntime_supportHtml5(){
   return this._supportHtml5;
}

//==========================================================
// <T>获得非空对象。</T>
//
// @param v:value:Object 对象A
// @param d:default:Object 对象B
// @return Object 非空对象
//==========================================================
function RRuntime_nvl(v, d){
   return (v != null) ? v : d;
}

//==========================================================
// <T>从字符串中截取开始字符串到结束字符串中间的部分字符串。</T>
// <P>开始字符串不存在的话，从字符串开始位置截取。</P>
// <P>结束字符串不存在的话，截取到字符串的最终位置。</P>
//
// @method
// @param v:value:String 字符传对象
// @param b:begin:String 起始字符串
// @param e:end:String 结束字符串
// @return String 截取后的部分字符串
//==========================================================
function RRuntime_subString(v, b, e){
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

//==========================================================
// <T>获得对象实例的类名称。</T>
//
// @method
// @param v:value:Object 函数对象
// @return String 类名称
//==========================================================
function RRuntime_className(v){
   if(v){
      // 如果对象是函数的情况
      if(typeof(v) == 'function'){
         return this.subString(v.toString(), 'function ', '(');
      }
      // 如果对象是普通对象的情况
      var c = v.constructor;
      if(c){
         return this.subString(c.toString(), 'function ', '(');
      }
   }
   return null;
}
