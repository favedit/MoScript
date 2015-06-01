/**************************************************************
 * 消息类型枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EMessageFace(){
   var o = this;
   // Attribute
   o.Fatal = 'fatal';
   o.Error = 'error';
   o.Warn  = 'warn';
   o.Valid = 'valid';
   o.Info  = 'info';
   o.None  = 'none';
   return o;
}
var EMessage = new EMessageFace();
