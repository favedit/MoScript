//==========================================================
// <T>区域资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sRegion = function FE3sRegion(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute 颜色
   o._optionBackground     = MO.Class.register(o, new MO.AGetSet('_optionBackground'), true);
   o._backgroundColor      = MO.Class.register(o, new MO.AGetter('_backgroundColor'));
   // @attribute 速率
   o._moveSpeed            = MO.Class.register(o, new MO.AGetSet('_moveSpeed'), 0.1);
   o._rotationKeySpeed     = MO.Class.register(o, new MO.AGetSet('_rotationKeySpeed'), 0.005);
   o._rotationMouseSpeed   = MO.Class.register(o, new MO.AGetSet('_rotationMouseSpeed'), 0.003);
   // @attribute 颜色
   //o._colorLevel           = null;
   // @attribute 雾化
   //o._fogNear              = null;
   //o._fogFar               = null;
   //o._fogRate              = null;
   //o._fogAttenuation       = null;
   //o._fogColor             = null;
   // @attribute 边界
   //o._edgeRate             = null;
   //o._edgeLevel            = null;
   //o._edgeWidth            = null;
   //o._edgeColor            = null;
   // @attribute 平面
   //o._faceRange            = null;
   //o._faceLimit            = null;
   //o._faceRate             = null;
   // @attribute 材质
   o._material             = null;
   // @attribute 相机
   o._camera               = MO.Class.register(o, new MO.AGetter('_camera'));
   // @attribute 光源
   o._light                = MO.Class.register(o, new MO.AGetter('_light'));
   //..........................................................
   // @method
   o.construct             = MO.FE3sRegion_construct;
   // @method
   o.unserialize           = MO.FE3sRegion_unserialize;
   o.saveConfig            = MO.FE3sRegion_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sRegion_construct = function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new MO.SColor4();
   //o._colorLevel = new SColor4();
   //o._fogColor = new SColor4();
   //o._edgeColor = new SColor4();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
   o._light = MO.Class.create(MO.FE3sLight);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sRegion_unserialize = function FE3sRegion_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取颜色
   o._backgroundColor.unserialize(input);
   // 读取数据
   o._moveSpeed = input.readFloat();
   o._rotationKeySpeed = input.readFloat();
   o._rotationMouseSpeed = input.readFloat();
   // 读取颜色级别
   //o._colorLevel.unserialize(input);
   // 读取雾化
   //o._fogNear = input.readFloat();
   //o._fogFar = input.readFloat();
   //o._fogRate = input.readFloat();
   //o._fogAttenuation = input.readFloat();
   //o._fogColor.unserialize(input);
   // 读取边界
   //o._edgeRate = input.readFloat();
   //o._edgeLevel = input.readFloat();
   //o._edgeWidth = input.readFloat();
   //o._edgeColor.unserialize(input);
   // 读取平面
   //o._faceRange = input.readFloat();
   //o._faceLimit = input.readFloat();
   //o._faceRate = input.readFloat();
   // 读取材质
   o._material.unserialize(input);
   // 读取相机
   o._camera.unserialize(input);
   // 读取光源
   o._light.unserialize(input);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sRegion_saveConfig = function FE3sRegion_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('color', o._backgroundColor.toString());
   xconfig.setFloat('move_speed', o._moveSpeed);
   xconfig.setFloat('rotation_key_speed', o._rotationKeySpeed);
   xconfig.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
   // 存储相机
   o._camera.saveConfig(xconfig.create('Camera'));
   // 存储光源
   //o._light.saveConfig(xconfig.create('Light'));
}
