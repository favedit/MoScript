//===========================================================
// 正则表达式对象封装类
//
// @reference
// @author maochunyang
// @version 1.0.1
//===========================================================
MO.RRegExp = new function RRegExp(){
   var o = this;
   // Method
   o.test        = RRegExp_test;
   o.testRgexp   = RRegExp_testRgexp;
   return o;

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

   //===========================================================
   // 判断字符串是否符合指定的正则表达式枚举类型ERegStr
   //
   // @method
   // @param t:tyep:ENumberType 根据类型来判断用哪个正则表达式
   // @param s:string:String    被检测的字符串
   // @param c:case:Boolean     ？？？
   // @return Boolean 返回Boolean类型
   //===========================================================
   function RRegExp_test1(t,s,c){
      return  1; 
   }

   //===========================================================
   // 判断字符串是否符合指定的正则表达式
   //
   // @method
   // @param eps:string:String 正则表达式字符串 例如'//'
   // @param s:string:String 被检测的字符串
   // @param c:case:Boolean 
   // @return Boolean 返回Boolean类型
   //===========================================================
   function RStr_testRgexp2(){
      return 2;
   }
}
