with(MO){
   //==========================================================
   // <T>布尔操作的管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.RBoolean = function RBoolean(){
      var o = this;
      //..........................................................
      // @method
      o.format   = RBoolean_format;
      o.parse    = RBoolean_parse;
      o.toString = RBoolean_toString;
      return o;
   }

   //==========================================================
   // <T>把布尔值转化为字符串。</T>
   //
   // @method
   // @param v:value:Boolean 
   // @return String 字符串
   //==========================================================
   MO.RBoolean_format = function RBoolean_format(v){
      return v ? EBoolean.True : EBoolean.False;
   }

   //==========================================================
   // <T>解析字符串为布尔值。</T>
   //
   // @method
   // @param v:value:String 
   // @return Boolean 
   //==========================================================
   MO.RBoolean_parse = function RBoolean_parse(v){
      if(v != null){
         if(v.constructor == Boolean){
            return v;
         }else if(v.constructor == String){
            return (v == EBoolean.True);
         }else if(v.constructor == Number){
            return v > 0;
         }else{
            throw new TError(this, 'Unknown type.');
         }
      }
      return false;
   }

   //==========================================================
   // <T>把布尔值转化为字符串。</T>
   //
   // @method
   // @param value:Boolean 布尔值
   // @param valueTrue:String 真字符串
   // @param valueFalse:String 假字符串
   // @return String 字符串
   //==========================================================
   MO.RBoolean_toString = function RBoolean_toString(value, valueTrue, valueFalse){
      if(valueTrue == null){
         valueTrue = EBoolean.True;
      }
      if(valueFalse == null){
         valueFalse = EBoolean.False;
      }
      return value ? valueTrue : valueFalse;
   }
   //..........................................................
   // 实例化内容
   MO.Boolean = new RBoolean();
}
