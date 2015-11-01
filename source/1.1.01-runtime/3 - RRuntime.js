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
   o._version    = 'mo';
   o._processCd  = MO.EProcess.Release;
   o._platformCd = MO.EPlatform.Pc;
   return o;
}

//==========================================================
// <T>获得版本。</T>
//
// @method
// @return String 版本
//==========================================================
MO.RRuntime.prototype.version = function RRuntime_version(){
   return this._version;
}

//==========================================================
// <T>设置版本。</T>
//
// @method
// @param version:String 版本
//==========================================================
MO.RRuntime.prototype.setVersion = function RRuntime_setVersion(version){
   this._version = version;
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

//==========================================================
// <T>正序排列比较器。</T>
//
// @method
// @param source:Object 来源对象
// @param target:Object 目标对象
// @param parameters:Obejct 参数对象
//==========================================================
MO.RRuntime.prototype.sortComparerAsc = function RArray_sortComparerAsc(source, target, parameters){
   if(source > target){
      return 1;
   }else if(source < target){
      return -1;
   }else{
      return 0;
   }
}

//==========================================================
// <T>倒序排列比较器。</T>
//
// @method
// @param source:Object 来源对象
// @param target:Object 目标对象
// @param parameters:Obejct 参数对象
//==========================================================
MO.RRuntime.prototype.sortComparerDesc = function RArray_sortComparerDesc(source, target, parameters){
   if(source > target){
      return -1;
   }else if(source < target){
      return 1;
   }else{
      return 0;
   }
}

//==========================================================
// <T>对值对快速排序。</T>
//
// @method
// @param names:Array 名称数组
// @param values:Array 内容数组
// @param begin:Integer 开始位置
// @param end:Integer 结束位置
// @param comparer:Function 比较器
// @param parameters:Object 参数
//==========================================================
MO.RRuntime.prototype.pairSortMid = function RArray_pairSortMid(names, values, begin, end, comparer, parameters){
   var name = names[begin];
   if(values){
      var value = values[begin];
   }
   while(begin < end){
      while((begin < end) && (comparer(names[end], name, parameters) >= 0)){
         end--;
      }
      names[begin] = names[end];
      if(values){
         values[begin] = values[end];
      }
      while((begin < end) && (comparer(names[begin], name, parameters) <= 0)){
         begin++;
      }
      names[end] = names[begin];
      if(values){
         values[end] = values[begin];
      }
   }
   names[begin] = name;
   if(values){
      values[begin] = value;
   }
   return begin;
}

//==========================================================
// <T>对值对快速排序。</T>
//
// @method
// @param names:Array 名称数组
// @param values:Array 内容数组
// @param begin:Integer 开始位置
// @param end:Integer 结束位置
// @param comparer:Function 比较器
// @param parameters:Object 参数
//==========================================================
MO.RRuntime.prototype.pairSortSub = function RArray_pairSortSub(names, values, begin, end, comparer, parameters){
   var o = this;
   if(begin < end){
      var mid = o.pairSortMid(names, values, begin, end, comparer, parameters);
      o.pairSortSub(names, values, begin, mid - 1, comparer, parameters);
      o.pairSortSub(names, values, mid + 1, end, comparer, parameters);
   }
}

//==========================================================
// <T>对值对快速排序。</T>
//
// @method
// @param names:Array 名称数组
// @param values:Array 内容数组
// @param offset:Integer 位置
// @param count:Integer 总数
// @param comparer:Function 比较器
// @param parameters:Object 参数
//==========================================================
MO.RRuntime.prototype.pairSort = function RArray_pairSort(names, values, offset, count, comparer, parameters){
   var o = this;
   var begin = offset;
   var end = offset + count - 1;
   o.pairSortSub(names, values, begin, end, MO.Runtime.nvl(comparer, o.sortComparerAsc), parameters);
}
//..........................................................
// 实例化内容
MO.Runtime = new MO.RRuntime();
