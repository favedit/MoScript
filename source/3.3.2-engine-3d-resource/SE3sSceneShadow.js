//==========================================================
// <T>资源场景影子。</T>
//
// @author maocy
// @history 150115
//==========================================================
function SE3sSceneShadow(){
   var o = this;
   //..........................................................
   // @attribute
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   //..........................................................
   // @method
   o.unserialize = SE3sSceneShadow_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SE3sSceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
