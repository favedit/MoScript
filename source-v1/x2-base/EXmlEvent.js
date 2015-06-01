/**************************************************************
 * XML接收发送方式枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function EXmlEventFace(){
   var o = this;
   // Attribute
   o.Send        = 1;
   o.Receive     = 2;
   o.SyncSend    = 3;
   o.SyncReceive = 4;
   return o;
}
EXmlEvent = new EXmlEventFace();
