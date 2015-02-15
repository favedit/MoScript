//==========================================================
// <T>布尔操作的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RBoolean = new function RBoolean(){
   var o = this;
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
function RBoolean_format(v){
   return v ? EBoolean.True : EBoolean.False;
}

//==========================================================
// <T>解析字符串为布尔值。</T>
//
// @method
// @param v:value:String 
// @return Boolean 
//==========================================================
function RBoolean_parse(v){
   return (v == EBoolean.True);
}

//==========================================================
// <T>把布尔值转化为字符串。</T>
//
// @method
// @param v:value:Boolean 
// @return String 字符串
//==========================================================
function RBoolean_toString(v){
   return v ? EBoolean.True : EBoolean.False;
}
