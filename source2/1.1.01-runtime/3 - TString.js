with(MO){
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
      o.appendArray  = TString_appendArray;
      o.appendLine   = TString_appendLine;
      o.appendRepeat = TString_appendRepeat;
      o.push         = TString_push;
      o.clear        = TString_clear;
      o.toString     = TString_toString;
      o.flush        = TString_flush;
      o.dispose      = TString_dispose;
      o.dump         = TString_dump;
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
      this.clear();
      this.appendArray(arguments, 0, arguments.length);
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
      for(var i = 0; i < count; i++){
         var value = values[offset++];
         if(value != null){
            this._memory[this._count++] = value;
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
      for(var i = 0; i < count; i++){
         this._memory[this._count++] = value;
      }
   }

   //==========================================================
   // <T>追加一行字符串的内容到当前字符串内。</T>
   //
   // @method
   // @param values:String... 字符串
   //==========================================================
   MO.TString_appendLine = function TString_appendLine(){
      this.appendArray(arguments, 0, arguments.length);
      this._memory[this._count++] = '\r\n';
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
      var memory = this._memory;
      if(memory.length != this._count){
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
      var result = this.toString();
      this.dispose();
      return result;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.TString_dispose = function TString_dispose(){
      // 清空属性
      this._count = 0;
      // 清空内存
      var memory = this._memory;
      if(memory){
         for(var i = memory.length - 1; i >= 0; i--){
            memory[i] = null;
         }
         this._memory = null;
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
      return RRuntime.className(o) + ':' + source.length + '[' + source + ']';
   }
}
