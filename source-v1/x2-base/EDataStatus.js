/**************************************************************
 * 数据状态枚举类型
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EDataStatusFace(){
   var o = this;
   // Member
   o.Normal = 'N';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   return o;
}
var EDataStatus = new EDataStatusFace();
