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
   o._processCd   = EProcess.Release;
   //..........................................................
   // @method
   o.isDebug      = RRuntime_isDebug;
   o.isRelease    = RRuntime_isRelease;
   o.setProcessCd = RRuntime_setProcessCd;
   // @method
   o.nvl          = RRuntime_nvl;
   o.subString    = RRuntime_subString;
   o.className    = RRuntime_className;
   return o;
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
// <T>设置运行模式。</T>
//
// @method
// @param processCd:EProcess 运行模式
//==========================================================
function RRuntime_setProcessCd(processCd){
   this._processCd = processCd;
}

//==========================================================
// <T>获得非空对象。</T>
//
// @param value:Object 对象
// @param defaultValue:Object 默认对象
// @return Object 非空对象
//==========================================================
function RRuntime_nvl(value, defaultValue){
   return (value != null) ? value : defaultValue;
}

//==========================================================
// <T>从字符串中截取开始字符串到结束字符串中间的部分字符串。</T>
// <P>开始字符串不存在的话，从字符串开始位置截取。</P>
// <P>结束字符串不存在的话，截取到字符串的最终位置。</P>
//
// @method
// @param value:String 字符传对象
// @param begin:String 起始字符串
// @param end:String 结束字符串
// @return String 截取后的部分字符串
//==========================================================
function RRuntime_subString(value, begin, end){
   if(value == null){
      return value;
   }
   var left = 0;
   if(begin != null){
      var find = value.indexOf(begin);
      if(find != -1){
         left = find + begin.length;
      }
   }
   var right = value.length;
   if(end != null){
      var find = value.indexOf(end, length);
      if(find != -1){
         right = find;
      }
   }
   return value.substring(left, right);
}

//==========================================================
// <T>获得对象实例的类名称。</T>
//
// @method
// @param value:Object 函数对象
// @return String 类名称
//==========================================================
function RRuntime_className(value){
   var o = this;
   if(value){
      // 如果对象是函数的情况
      if(typeof(value) == 'function'){
         return o.subString(value.toString(), 'function ', '(');
      }
      // 如果对象是普通对象的情况
      var clazz = value.constructor;
      if(clazz){
         return o.subString(clazz.toString(), 'function ', '(');
      }
   }
   return null;
}
