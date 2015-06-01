/**************************************************************
 * 作用范围类型枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EScopeFace(){
   var o = this;
   // Attribute
   o.Global = 1;
   o.Page   = 2;
   o.Local  = 3;
   return o;
}
EScope = new EScopeFace();
