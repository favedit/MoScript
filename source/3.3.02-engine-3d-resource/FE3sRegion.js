//==========================================================
// <T>区域资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 颜色
   o._optionBackground     = true;
   o._backgroundColor      = null;
   // @attribute 速率
   o._moveSpeed            = 0.1;
   o._rotationKeySpeed     = 0.005;
   o._rotationMouseSpeed   = 0.003;
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
   o._camera               = null;
   // @attribute 光源
   o._light                = null;
   //..........................................................
   // @method
   o.construct             = FE3sRegion_construct;
   // @method
   o.optionBackground      = FE3sRegion_optionBackground;
   o.setOptionBackground   = FE3sRegion_setOptionBackground;
   o.backgroundColor       = FE3sRegion_backgroundColor;
   o.moveSpeed             = FE3sRegion_moveSpeed;
   o.setMoveSpeed          = FE3sRegion_setMoveSpeed;
   o.rotationKeySpeed      = FE3sRegion_rotationKeySpeed;
   o.setRotationKeySpeed   = FE3sRegion_setRotationKeySpeed;
   o.rotationMouseSpeed    = FE3sRegion_rotationMouseSpeed;
   o.setRotationMouseSpeed = FE3sRegion_setRotationMouseSpeed;
   o.camera                = FE3sRegion_camera;
   o.light                 = FE3sRegion_light;
   // @method
   o.unserialize           = FE3sRegion_unserialize;
   o.saveConfig            = FE3sRegion_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new SColor4();
   //o._colorLevel = new SColor4();
   //o._fogColor = new SColor4();
   //o._edgeColor = new SColor4();
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
   o._light = RClass.create(FE3sLight);
}

//==========================================================
// <T>获得背景配置。</T>
//
// @method
// @return Boolean 背景配置
//==========================================================
function FE3sRegion_optionBackground(){
   return this._optionBackground;
}

//==========================================================
// <T>设置背景配置。</T>
//
// @method
// @param p:flag:Boolean 背景配置
//==========================================================
function FE3sRegion_setOptionBackground(p){
   this._optionBackground = p;
}

//==========================================================
// <T>获得背景颜色。</T>
//
// @method
// @return SColor4 背景颜色
//==========================================================
function FE3sRegion_backgroundColor(){
   return this._backgroundColor;
}

//==========================================================
// <T>获得移动速度。</T>
//
// @method
// @return Float 移动速度
//==========================================================
function FE3sRegion_moveSpeed(){
   return this._moveSpeed;
}

//==========================================================
// <T>设置移动速度。</T>
//
// @method
// @param p:value:Float 移动速度
//==========================================================
function FE3sRegion_setMoveSpeed(p){
   this._moveSpeed = p;
}

//==========================================================
// <T>获得按键旋转速度。</T>
//
// @method
// @return Float 旋转速度
//==========================================================
function FE3sRegion_rotationKeySpeed(){
   return this._rotationKeySpeed;
}

//==========================================================
// <T>设置按键旋转速度。</T>
//
// @method
// @param p:value:Float 旋转速度
//==========================================================
function FE3sRegion_setRotationKeySpeed(p){
   this._rotationKeySpeed = p;
}

//==========================================================
// <T>获得鼠标旋转速度。</T>
//
// @method
// @return Float 旋转速度
//==========================================================
function FE3sRegion_rotationMouseSpeed(){
   return this._rotationMouseSpeed;
}

//==========================================================
// <T>设置鼠标旋转速度。</T>
//
// @method
// @param p:value:Float 旋转速度
//==========================================================
function FE3sRegion_setRotationMouseSpeed(p){
   this._rotationMouseSpeed = p;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FE3sSceneCamera 相机
//==========================================================
function FE3sRegion_camera(){
   return this._camera;
}

//==========================================================
// <T>获得光源。</T>
//
// @method
// @return FE3sSceneLight 光源
//==========================================================
function FE3sRegion_light(){
   return this._light;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sRegion_unserialize(input){
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
function FE3sRegion_saveConfig(xconfig){
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
