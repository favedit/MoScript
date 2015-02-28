//===========================================================
// <T>字节顺序枚举。</T>
//
// @enum
// @author maocy
// @version 141231
 //===========================================================
MO.EEndian = new function EEndian(){
   var o = this;
   ///@attribute Integer 大头在前
   o.Big    = 0;
   ///@attribute Integer 小头在前
   o.Little = 1;
   return o;
}
