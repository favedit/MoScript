//==========================================================
// <T>运行库。</T>
//
// @reference
// @author maocy
// @version 141226
//==========================================================
MO.RRuntime = function RRuntime(){
   var o = MO.RSingleton.call(this);
   //..........................................................
   // @attribute
   o._processCd  = MO.EProcess.Release;
   o._platformCd = MO.EPlatform.Pc;
   return o;
}

//==========================================================
// <T>测试是否调试模式。</T>
//
// @method
// @return 是否调试模式
//==========================================================
MO.RRuntime.prototype.isDebug = function RRuntime_isDebug(){
   return this._processCd == MO.EProcess.Debug;
}

//==========================================================
// <T>测试是否处理模式。</T>
//
// @method
// @return 是否处理模式
//==========================================================
MO.RRuntime.prototype.isProcess = function RRuntime_isProcess(){
   return this._processCd == MO.EProcess.Process;
}

//==========================================================
// <T>测试是否运行模式。</T>
//
// @method
// @return 是否运行模式
//==========================================================
MO.RRuntime.prototype.isRelease = function RRuntime_isRelease(){
   return this._processCd == MO.EProcess.Release;
}

//==========================================================
// <T>获得运行模式。</T>
//
// @method
// @return EProcess 运行模式
//==========================================================
MO.RRuntime.prototype.processCd = function RRuntime_processCd(){
   return this._processCd;
}

//==========================================================
// <T>设置运行模式。</T>
//
// @method
// @param processCd:EProcess 运行模式
//==========================================================
MO.RRuntime.prototype.setProcessCd = function RRuntime_setProcessCd(processCd){
   this._processCd = processCd;
}

//==========================================================
// <T>测试是否PC平台模式。</T>
//
// @method
// @return 是否PC平台模式
//==========================================================
MO.RRuntime.prototype.isPlatformPc = function RRuntime_isPlatformPc(){
   return this._platformCd == MO.EPlatform.Pc;
}

//==========================================================
// <T>测试是否移动平台模式。</T>
//
// @method
// @return 是否移动平台模式
//==========================================================
MO.RRuntime.prototype.isPlatformMobile = function RRuntime_isPlatformMobile(){
   return this._platformCd == MO.EPlatform.Mobile;
}

//==========================================================
// <T>获得平台模式。</T>
//
// @method
// @return EPlatform 平台模式
//==========================================================
MO.RRuntime.prototype.platformCd = function RRuntime_platformCd(){
   return this._platformCd;
}

//==========================================================
// <T>设置平台模式。</T>
//
// @method
// @param platformCd:EPlatform 平台模式
//==========================================================
MO.RRuntime.prototype.setPlatformCd = function RRuntime_setPlatformCd(platformCd){
   this._platformCd = platformCd;
}

//==========================================================
// <T>空函数调用。</T>
//
// @method
//==========================================================
MO.RRuntime.prototype.empty = function RRuntime_empty(){
}

//==========================================================
// <T>获得非空对象。</T>
//
// @param value:Object 对象
// @param defaultValue:Object 默认对象
// @return Object 非空对象
//==========================================================
MO.RRuntime.prototype.nvl = function RRuntime_nvl(value, defaultValue){
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
MO.RRuntime.prototype.subString = function RRuntime_subString(value, begin, end){
   // 检查变量
   if(value == null){
      return value;
   }
   // 计算左侧位置
   var left = 0;
   if(begin != null){
      var find = value.indexOf(begin);
      if(find != -1){
         left = find + begin.length;
      }
   }
   // 计算右侧位置
   var right = value.length;
   if(end != null){
      var find = value.indexOf(end, length);
      if(find != -1){
         right = find;
      }
   }
   // 截取字符串
   if(left >= right){
      return '';
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
MO.RRuntime.prototype.className = function RRuntime_className(value){
   if(value){
      // 如果对象是函数的情况
      if(typeof(value) == 'function'){
         return this.subString(value.toString(), 'function ', '(');
      }
      // 如果对象是普通对象的情况
      var clazz = value.constructor;
      if(clazz){
         return this.subString(clazz.toString(), 'function ', '(');
      }
   }
   return null;
}
//..........................................................
// 实例化内容
MO.Runtime = new MO.RRuntime();
