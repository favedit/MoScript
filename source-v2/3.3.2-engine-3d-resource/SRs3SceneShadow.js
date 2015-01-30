//==========================================================
// <T>资源场景影子。</T>
//
// @author maocy
// @history 150115
//==========================================================
function SRs3SceneShadow(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   //..........................................................
   // @method
   o.unserialize = SRs3SceneShadow_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SRs3SceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
