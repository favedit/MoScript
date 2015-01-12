//==========================================================
// <T>布尔操作的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RBool = new function RBool(){
   var o = this;
   // @method
   o.parse    = RBool_parse;
   o.toString = RBool_toString;
   return o;
}

//==========================================================
// <T>解析字符串为布尔值。</T>
//
// @method
// @param v:value:String 
// @return Boolean 
//==========================================================
function RBool_parse(v){
   return (v == EBool.True);
}

//==========================================================
// <T>把布尔值转化为字符串。</T>
//
// @method
// @param v:value:Boolean 
// @return String 字符串
//==========================================================
function RBool_toString(v){
   return v ? EBool.True : EBool.False;
}
