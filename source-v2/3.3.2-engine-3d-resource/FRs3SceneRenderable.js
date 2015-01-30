//==========================================================
// <T>资源场景渲染对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._code       = null;
   //..........................................................
   // @method
   o.code        = FRs3SceneRenderable_code;
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return SColor4 颜色
//==========================================================
function FRs3SceneRenderable_code(){
   return this._code;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   // 读取属性
   o._code = p.readString();
}
