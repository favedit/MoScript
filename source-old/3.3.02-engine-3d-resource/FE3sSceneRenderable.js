//==========================================================
// <T>资源场景渲染对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneRenderable(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @method
   o.unserialize = FE3sSceneRenderable_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneRenderable_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
}
