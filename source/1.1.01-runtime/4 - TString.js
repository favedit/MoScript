//==========================================================
// <T>字符串操作的工具类</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
MO.TString = function TString(){
   var o = this;
   //..........................................................
   // @attribute
   o._count       = 0;
   o._memory      = new Array();
   //..........................................................
   // @method
   o.isEmpty      = MO.TString_isEmpty;
   o.assign       = MO.TString_assign;
   o.append       = MO.TString_append;
   o.appendIf     = MO.TString_appendIf;
   o.appendArray  = MO.TString_appendArray;
   o.appendLine   = MO.TString_appendLine;
   o.appendRepeat = MO.TString_appendRepeat;
   o.push         = MO.TString_push;
   o.clear        = MO.TString_clear;
   o.toString     = MO.TString_toString;
   o.flush        = MO.TString_flush;
   o.dispose      = MO.TString_dispose;
   o.dump         = MO.TString_dump;
   return o;
}

//==========================================================
// <T>判断字符串内容是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.TString_isEmpty = function TString_isEmpty(){
   return this._count == 0;
}

//==========================================================
// <T>接收字符串集合。</T>
//
// @method
// @param values:String... 字符串集合
//==========================================================
MO.TString_assign = function TString_assign(){
   var o = this;
   o.clear();
   o.appendArray(arguments, 0, arguments.length);
}

//==========================================================
// <T>追加字符串集合。</T>
//
// @method
// @param values:String... 字符串集合
//==========================================================
MO.TString_append = function TString_append(v){
   this.appendArray(arguments, 0, arguments.length);
}

//==========================================================
// <T>当传入条件为真时，追加字符串集合。</T>
//
// @method
// @param flag:Boolean 条件标识
// @param values:String... 字符串集合
//==========================================================
MO.TString_appendIf = function TString_appendIf(flag){
   if(flag){
      this.appendArray(arguments, 1, arguments.length - 1);
   }
}

//==========================================================
// <T>追加字符串集合。</T>
//
// @method
// @param values:Array 字符串集合
// @param offset:Integer 位置
// @param count:Integer 总数
//==========================================================
MO.TString_appendArray = function TString_appendArray(values, offset, count){
   var o = this;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      var value = values[offset++];
      if(value != null){
         memory[o._count++] = value;
      }
   }
}

//==========================================================
// <T>追加重复字符串。</T>
//
// @method
// @param value:String 字符串
// @param count:Integer 次数
//==========================================================
MO.TString_appendRepeat = function TString_appendRepeat(value, count){
   var o = this;
   var memory = o._memory;
   for(var i = 0; i < count; i++){
      memory[o._count++] = value;
   }
}

//==========================================================
// <T>追加一行字符串的内容到当前字符串内。</T>
//
// @method
// @param values:String... 字符串
//==========================================================
MO.TString_appendLine = function TString_appendLine(){
   var o = this;
   o.appendArray(arguments, 0, arguments.length);
   o._memory[o._count++] = '\r\n';
}

//==========================================================
// <T>将字符串的内容加在当前字符串末尾。</T>
// <P>被追加的内容不做任何转换，放在当前字符串的末尾。</P>
//
// @method
// @param values:Object... 字符串
//==========================================================
MO.TString_push = function TString_push(){
   this.appendArray(arguments, 0, arguments.length);
}

//==========================================================
// <T>清除字符串内容。</T>
//
// @method
//==========================================================
MO.TString_clear = function TString_clear(){
   this._count = 0;
}

//==========================================================
// <T>将当前字符串对象转换为字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TString_toString = function TString_toString(){
   var o = this;
   var memory = o._memory;
   if(memory.length != o._count){
      memory = memory.slice(0, this._count);
   }
   return memory.join('');
}

//==========================================================
// <T>获得字符串内容，释放所有内容。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TString_flush = function TString_flush(){
   var o = this;
   var result = o.toString();
   o.dispose();
   return result;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.TString_dispose = function TString_dispose(){
   var o = this;
   // 清空属性
   o._count = 0;
   // 清空内存
   var memory = o._memory;
   if(memory){
      for(var i = memory.length - 1; i >= 0; i--){
         memory[i] = null;
      }
      o._memory = null;
   }
}

//==========================================================
// <T>获得当前字符串对象的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.TString_dump = function TString_dump(){
   var source = this.toString();
   return MO.Runtime.className(o) + ':' + source.length + '[' + source + ']';
}
