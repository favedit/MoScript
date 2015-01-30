//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FObject);
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
   o._viewport    = null;
   //..........................................................
   // @method
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.viewport     = FRs3SceneCamera_viewport;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._viewport = RClass.create(FRs3SceneViewport);
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FRs3SceneCamera_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得坐标。</T>
//
// @method
// @return SPoint3 坐标
//==========================================================
function FRs3SceneCamera_position(){
   return this._position;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FRs3SceneCamera_direction(){
   return this._direction;
}

//==========================================================
// <T>获得视角。</T>
//
// @method
// @return FRs3SceneViewport 视角
//==========================================================
function FRs3SceneCamera_viewport(){
   return this._viewport;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneCamera_unserialize(p){
   var o = this;
   // 读取属性
   o._typeName = p.readString();
   // 读取中心
   o._centerFront = p.readFloat();
   o._centerBack = p.readFloat();
   // 读取位置
   o._position.unserialize(p);
   // 读取方向
   o._direction.unserialize(p);
   // 读取焦平面
   o._focalNear = p.readFloat();
   o._focalFar = p.readFloat();
   // 读取视角
   o._viewport.unserialize(p);
}
