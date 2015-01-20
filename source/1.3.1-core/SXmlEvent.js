//==========================================================
// <T>配置事件信息类。</T>
//
// @struct
// @author maocy
// @version 150120
//==========================================================
function SXmlEvent(o){
   if(!o){o = this;}
   SEvent(o);
   //..........................................................
   // @attribute
   o.connection = null;
   o.document   = null;
   o.root       = null;
   return o;
}
