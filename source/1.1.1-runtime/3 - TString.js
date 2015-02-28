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
   o.isEmpty      = TString_isEmpty;
   o.assign       = TString_assign;
   o.append       = TString_append;
   o.appendIf     = TString_appendIf;
   o.appendLine   = TString_appendLine;
   o.appendRepeat = TString_appendRepeat;
   o.push         = TString_push;
   o.clear        = TString_clear;
   o.toString     = TString_toString;
   o.flush        = TString_flush;
   o.dispose      = TString_dispose;
   o.dump         = TString_dump;
   return o;

   //==========================================================
   // <T>判断字符串内容是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //==========================================================
   function TString_isEmpty(){
      return this._count == 0;
   }

   //==========================================================
   // <T>接收一个或多个字符串。</T>
   //
   // @method
   // @param v:values:String... 字符串
   //==========================================================
   function TString_assign(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      o._count = 0;
      for(var i = 0; i < c; i++){
         var v = a[n];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
   }

   //==========================================================
   // <T>追加一个或多个字符串。</T>
   //
   // @method
   // @param v:values:String... 字符串
   //==========================================================
   function TString_append(v){
      var o = this;
      var a = arguments;
      var c = a.length;
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
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
         for(var i = 1; i < c; i++){
            var v = a[i];
            if(v != null){
               o._memory[o._count++] = v;
            }
         }
      }
   }

   //==========================================================
   // <T>追加重复字符串。</T>
   //
   // @method
   // @param v:values:String 字符串
   // @param c:count:Integer 次数
   //==========================================================
   function TString_appendRepeat(v, c){
      var o = this;
      for(var i = 0; i < c; i++){
         o._memory[o._count++] = v;
      }
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
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
      o._memory[o._count++] = '\r\n';
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
      for(var i = 0; i < c; i++){
         var v = a[i];
         if(v != null){
            o._memory[o._count++] = v;
         }
      }
   }

   //==========================================================
   // <T>清除字符串内容。</T>
   //
   // @method
   //==========================================================
   function TString_clear(){
      this._count = 0;
   }

   //==========================================================
   // <T>将当前字符串对象转换为字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   function TString_toString(){
      var o = this;
      var r = o._memory;
      if(o._memory.length != o._count){
         r = o._memory.slice(0, o._count);
      }
      return r.join('');
   }

   //==========================================================
   // <T>获得字符串内容，释放所有内容。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   function TString_flush(){
      var o = this;
      var r = o.toString();
      o.dispose();
      return r;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   function TString_dispose(){
      var o = this;
      // 清空属性
      o._count = 0;
      // 清空内存
      var m = o._memory;
      if(m){
         for(var i = m.length - 1; i >= 0; i--){
            m[i] = null;
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
   function TString_dump(){
      var o = this;
      var s = o.toString();
      return RRuntime.className(o) + ':' + s.length + '[' + s + ']';
   }
}
