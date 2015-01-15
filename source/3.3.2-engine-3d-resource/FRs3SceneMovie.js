//==========================================================
// <T>资源场景动画。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneMovie(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._typeName   = null;
   o._interval   = null;
   o._rotation   = null;
   //..........................................................
   // @method
   o.construct   = FRs3SceneMovie_construct;
   o.typeName    = FRs3SceneMovie_typeName;
   o.unserialize = FRs3SceneMovie_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FRs3SceneMovie_typeName(){
   return this._typeName;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3SceneMovie_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
