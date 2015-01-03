/**************************************************************
 * 所在层的位置枚举
 *
 * @enum
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function ELayerFace(){
   var o = this;
   // Attribute
   o.Default = 20000;
   o.Shadow  =  5000;
   o.Disable =  5000;
   o.Window  = 20000;
   o.Drop    = 40000;


   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
var ELayer = new ELayerFace();
