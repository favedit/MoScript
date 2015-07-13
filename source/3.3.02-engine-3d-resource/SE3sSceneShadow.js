//==========================================================
// <T>资源场景影子。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.SE3sSceneShadow = function SE3sSceneShadow(){
   var o = this;
   //..........................................................
   // @attribute
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   //..........................................................
   // @method
   o.unserialize = MO.SE3sSceneShadow_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(input){
   var o = this;
   o.base = input.readFloat();
   o.rate = input.readFloat();
   o.level = input.readFloat();
   o.range = input.readFloat();
}
