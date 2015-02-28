//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sSceneCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeName    = null;
   // @attribute 中心
   o._centerFront = null;
   o._centerBack  = null;
   // @attribute 位置
   o._position    = null;
   // @attribute 方向
   o._direction   = null;
   // @attribute 焦平面
   o._focalNear   = null;
   o._focalFar    = null;
   // @attribute 视角
   o._projection  = null;
   //..........................................................
   // @method
   o.construct    = FE3sSceneCamera_construct;
   // @method
   o.typeName     = FE3sSceneCamera_typeName;
   o.position     = FE3sSceneCamera_position;
   o.direction    = FE3sSceneCamera_direction;
   o.projection   = FE3sSceneCamera_projection;
   // @method
   o.unserialize  = FE3sSceneCamera_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sSceneProjection);
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FE3sSceneCamera_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得坐标。</T>
//
// @method
// @return SPoint3 坐标
//==========================================================
function FE3sSceneCamera_position(){
   return this._position;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FE3sSceneCamera_direction(){
   return this._direction;
}

//==========================================================
// <T>获得视角。</T>
//
// @method
// @return FE3sSceneViewport 视角
//==========================================================
function FE3sSceneCamera_projection(){
   return this._projection;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._typeName = p.readString();
   // 读取中心
   //o._centerFront = p.readFloat();
   //o._centerBack = p.readFloat();
   // 读取位置
   o._position.unserialize(p);
   // 读取方向
   o._direction.unserialize(p);
   // 读取焦平面
   //o._focalNear = p.readFloat();
   //o._focalFar = p.readFloat();
   // 读取视角
   o._projection.unserialize(p);
}
