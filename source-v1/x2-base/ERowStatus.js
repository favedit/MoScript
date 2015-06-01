//===========================================================
// 该类是一个定义单行状态的枚举类
//
// @enum
// @author maochunyang
// @version 1.0.1
//===========================================================
function ERowStatusFace(){
   var o = this;
   ///@attribute String 行状态为普通，即该行当前无操作
   o.Normal = 'N';
   ///@attribute String 行状态为插入，即该行当前正在进行插入操作
   o.Insert = 'I';
   ///@attribute String 行状态为更新，即该行当前正在进行更新操作
   o.Update = 'U';
   ///@attribute String 行状态为删除，即该行当前正在进行删除操作
   o.Delete  = 'D';
   return o;
}
var ERowStatus = new ERowStatusFace();

