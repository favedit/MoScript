//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeCd     = null;
   // @attribute 中心
   //o._centerFront = null;
   //o._centerBack  = null;
   // @attribute 位置
   o._position   = null;
   // @attribute 方向
   o._direction  = null;
   // @attribute 焦平面
   //o._focalNear   = null;
   //o._focalFar    = null;
   // @attribute 视角
   o._projection = null;
   //..........................................................
   // @method
   o.construct   = FE3sCamera_construct;
   // @method
   o.typeCd      = FE3sCamera_typeCd;
   o.position    = FE3sCamera_position;
   o.direction   = FE3sCamera_direction;
   o.projection  = FE3sCamera_projection;
   // @method
   o.unserialize = FE3sCamera_unserialize;
   o.saveConfig  = FE3sCamera_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   // 设置变量
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sProjection);
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FE3sCamera_typeCd(){
   return this._typeCd;
}

//==========================================================
// <T>获得坐标。</T>
//
// @method
// @return SPoint3 坐标
//==========================================================
function FE3sCamera_position(){
   return this._position;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return SVector3 方向
//==========================================================
function FE3sCamera_direction(){
   return this._direction;
}

//==========================================================
// <T>获得视角。</T>
//
// @method
// @return FE3sSceneViewport 视角
//==========================================================
function FE3sCamera_projection(){
   return this._projection;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._typeCd = p.readString();
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

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sCamera_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('position', o._position.toString());
   xconfig.set('direction', o._direction.toString());
   // 存储相机
   o._projection.saveConfig(xconfig.create('Projection'));
}
