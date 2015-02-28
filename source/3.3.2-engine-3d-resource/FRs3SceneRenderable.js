//==========================================================
// <T>资源场景渲染对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @method
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
}
