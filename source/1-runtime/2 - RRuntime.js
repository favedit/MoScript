//==========================================================
// <T>运行库。</T>
//
// @reference
// @author maocy
// @version 141226
//==========================================================
var RRuntime = new function RRuntime(){
   var o = this;
   // Propery
   o._nextUid  = 1;
   o.processCd = EProcess.Release;
   // Method
   o.isDebug   = RRuntime_isDebug;
   o.isRelease = RRuntime_isRelease;
   o.nvl       = RRuntime_nvl;
   o.subString = RRuntime_subString;
   o.className = RRuntime_className;
   o.uid       = RRuntime_uid;
   return o;
}

//==========================================================
// <T>测试是否调试模式。</T>
//
// @method
// @return 是否调试模式
//==========================================================
function RRuntime_isDebug(){
   return (this.processCd == EProcess.Debug);
}

//==========================================================
// <T>测试是否运行模式。</T>
//
// @method
// @return 是否运行模式
//==========================================================
function RRuntime_isRelease(){
   return (this.processCd == EProcess.Release);
}

//==========================================================
// <T>获得两个对象中的第一个非空对象。</T>
//
// @param a:valueA:Object 对象A
// @param b:valueB:Object 对象B
// @return Object 非空对象
//==========================================================
function RRuntime_nvl(a, b){
   return (a != null) ? a : b;
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

//==========================================================
// <T>获得对象的唯一编号。</T>
//
// @method
// @param v:value:Object 对象
// @return Integer 编号
//==========================================================
function RRuntime_uid(v){
   var r = v.uniqueNumber;
   if(r == null){
      r = v.uniqueNumber = RRuntime._nextUid;
      RRuntime._nextUid++;
   }
   return r;
}
