//==========================================================
// <T>字符管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RChar = new function RChar(){
   var o = this;
   // @method
   o.parse    = RChar_parse;
   o.toString = RChar_toString;
   return o;

   //==========================================================
   // <T>将一个数字转换为字符</T>
   //
   // @method
   // @param n:number:Number 数字
   // @return 字符
   //==========================================================
   function RChar_parse(n){
      return String.fromCharCode(n);
   }

   //==========================================================
   // <T>将一个数字转换为字符</T>
   //
   // @method
   // @param v:value:Integer 数字
   // @return 字符
   //==========================================================
   function RChar_toString(v){
      return v;
   }
}
