//==========================================================
// <T>布尔操作的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RBoolean = function RBoolean(){
   return this;
}

//==========================================================
// <T>把布尔值转化为字符串。</T>
//
// @method
// @param value:Boolean 布尔值
// @return String 字符串
//==========================================================
MO.RBoolean.prototype.format = function RBoolean_format(value){
   return value ? MO.EBoolean.True : MO.EBoolean.False;
}

//==========================================================
// <T>解析字符串为布尔值。</T>
//
// @method
// @param value:String 字符串
// @return Boolean 布尔值
//==========================================================
MO.RBoolean.prototype.parse = function RBoolean_parse(value){
   if(value != null){
      if(value.constructor == Boolean){
         return value;
      }else if(value.constructor == String){
         return (value == MO.EBoolean.True);
      }else if(value.constructor == Number){
         return value > 0;
      }else{
         throw new MO.TError(this, 'Unknown type.');
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
MO.RBoolean.prototype.toString = function RBoolean_toString(value, valueTrue, valueFalse){
   if(valueTrue == null){
      valueTrue = MO.EBoolean.True;
   }
   if(valueFalse == null){
      valueFalse = MO.EBoolean.False;
   }
   return value ? valueTrue : valueFalse;
}
//..........................................................
// 实例化内容
MO.RBoolean = new MO.RBoolean();
MO.Lang.Boolean = MO.RBoolean;
