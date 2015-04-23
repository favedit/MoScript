//==========================================================
// <T>配置事件信息类。</T>
//
// @struct
// @author maocy
// @version 150120
//==========================================================
function SXmlEvent(){
   var o = this;
   SEvent.call(o);
   //..........................................................
   // @attribute
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
