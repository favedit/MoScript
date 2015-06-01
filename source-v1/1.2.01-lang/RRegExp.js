//===========================================================
// 正则表达式对象封装类
//
// @reference
// @author maochunyang
// @version 1.0.1
//===========================================================
var RRegExp = new function RRegExp(){
   var o = this;
   //..........................................................
   // @method
   o.test      = RRegExp_test;
   o.testRgexp = RRegExp_testRgexp;
   return o;
}

//===========================================================
// 判断字符串是否符合指定的正则表达式对象
//
// @method
// @param r:r:RegExp 自定义的正则表达式对象 例如 /d/
// @param s:string:String 被检测的字符串
// @return Boolean 返回Boolean类型
//===========================================================
function RRegExp_test(r,s){
   if(r && s != null){
      return r.test(s);
   }
   return false;
}

//===========================================================
// 判断字符串是否符合指定的正则表达式字符串
//
// @method
// @param eps:eps:RegExp 自定义的正则表达式字符串 例如 "/d/"
// @param s:string:String 被检测的字符串
// @return Boolean 返回Boolean类型
//===========================================================
function RRegExp_testRgexp(eps,s){
   if(eps && s){
      var r = new R
      return eps.test(s);
   }
   return false;
}
