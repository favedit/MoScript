//==========================================================
// <T>字符串操作的工具类</T>
//
// @tool
// @author maocy
// @version 141226
//==========================================================
function TString(o){
   if(!o){o = this;}
   // Attribute
   o.count      = 0;
   o.memory     = new Array();
   // Method
   o.isEmpty    = TString_isEmpty;
   o.assign     = TString_assign;
   o.append     = TString_append;
   o.appendIf   = TString_appendIf;
   o.appendLine = TString_appendLine;
   o.push       = TString_push;
   o.clear      = TString_clear;
   o.toString   = TString_toString;
   o.dispose    = TString_dispose;
   o.dump       = TString_dump;
   return o;
}

//==========================================================
// <T>判断字符串内容是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
function TString_isEmpty(){
   return (this.count == 0);
}

//==========================================================
// <T>用另外一个或多个字符串替换当前字符串。</T>
//
// @method
// @param v:values:String... 字符串
//==========================================================
function TString_assign(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   o.count = 0;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}

//==========================================================
// <T>追加一个或多个字符串到当前字符串尾部。</T>
// <P>被追加的内容转换为字符串，放在当前字符串的末尾。</P>
//
// @method
// @param v:values:String... 字符串
//==========================================================
function TString_append(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}

//==========================================================
// <T>当传入条件为真时，追加一个或多个字符串到当前字符串尾部。</T>
//
// @method
// @param f:flag:Boolean 条件标识
// @param v:values:String... 字符串
//==========================================================
function TString_appendIf(f, v){
   var o = this;
   if(f){
      var a = arguments;
      var c = a.length;
      for(var n = 1; n < c; n++){
         if(a[n] != null){
            o.memory[o.count++] = a[n];
         }
      }
   }
   return o;
}

//==========================================================
// <T>追加一行字符串的内容到当前字符串内。</T>
//
// @method
// @param v:values:String... 字符串
//==========================================================
function TString_appendLine(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n] + '';
      }
   }
   o.memory[o.count++] = '\r\n';
   return o;
}

//==========================================================
// <T>将字符串的内容加在当前字符串末尾。</T>
// <P>被追加的内容不做任何转换，放在当前字符串的末尾。</P>
//
// @method
// @param v:values:Object... 字符串
//==========================================================
function TString_push(v){
   var o = this;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         o.memory[o.count++] = a[n];
      }
   }
   return o;
}

//==========================================================
// <T>清除字符串内容。</T>
//
// @method
// @param v:values:Object... 字符串
//==========================================================
function TString_clear(){
   this.count = 0;
}

//==========================================================
// <T>将当前字符串对象转换为字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function TString_toString(){
   var o = this;
   var r = o.memory;
   if(o.memory.length != o.count){
      r = o.memory.slice(0, o.count);
   }
   return r.join('');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function TString_dispose(){
   var o = this;
   o.count = 0;
   o.memory = null;
}

//==========================================================
// <T>获得当前字符串对象的内部信息。</T>
//
// @method
// @return String 字符串
//==========================================================
function TString_dump(){
   var o = this;
   var s = o.toString();
   return RRuntime.className(o) + ':' + s.length + '[' + s + ']';
}
