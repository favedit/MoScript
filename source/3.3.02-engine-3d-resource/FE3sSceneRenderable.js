//==========================================================
// <T>资源场景渲染对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @method
   o.unserialize = MO.FE3sSceneRenderable_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
}
