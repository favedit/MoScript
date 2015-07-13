//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sCamera = function FE3sCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeCd     = MO.Class.register(o, new MO.AGetter('_typeCd'));
   // @attribute 中心
   //o._centerFront = null;
   //o._centerBack  = null;
   // @attribute 位置
   o._position   = MO.Class.register(o, new MO.AGetter('_position'));
   // @attribute 方向
   o._direction  = MO.Class.register(o, new MO.AGetter('_direction'));
   // @attribute 焦平面
   //o._focalNear   = null;
   //o._focalFar    = null;
   // @attribute 视角
   o._projection = MO.Class.register(o, new MO.AGetter('_projection'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sCamera_construct;
   // @method
   o.unserialize = MO.FE3sCamera_unserialize;
   o.saveConfig  = MO.FE3sCamera_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sCamera_construct = function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   // 设置变量
   o._position = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._projection = MO.Class.create(MO.FE3sProjection);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sCamera_unserialize = function FE3sCamera_unserialize(p){
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
MO.FE3sCamera_saveConfig = function FE3sCamera_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('position', o._position.toString());
   xconfig.set('direction', o._direction.toString());
   // 存储相机
   o._projection.saveConfig(xconfig.create('Projection'));
}
