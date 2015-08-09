//==========================================================
// <T>配置事件信息类。</T>
//
// @struct
// @author maocy
// @version 150120
//==========================================================
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   MO.SEvent.call(o);
   //..........................................................
   // @attribute
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
