//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sSceneRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 颜色
   o._optionBackground   = true;
   o._backgroundColor    = null;
   o._colorLevel         = null;
   // @attribute 雾化
   o._fogNear            = null;
   o._fogFar             = null;
   o._fogRate            = null;
   o._fogAttenuation     = null;
   o._fogColor           = null;
   // @attribute 边界
   o._edgeRate           = null;
   o._edgeLevel          = null;
   o._edgeWidth          = null;
   o._edgeColor          = null;
   // @attribute 平面
   o._faceRange          = null;
   o._faceLimit          = null;
   o._faceRate           = null;
   // @attribute 相机
   o._camera             = null;
   // @attribute 光源
   o._light              = null;
   //..........................................................
   // @method
   o.construct           = FE3sSceneRegion_construct;
   // @method
   o.optionBackground    = FE3sSceneRegion_optionBackground;
   o.setOptionBackground = FE3sSceneRegion_setOptionBackground;
   o.backgroundColor     = FE3sSceneRegion_backgroundColor;
   o.camera              = FE3sSceneRegion_camera;
   o.light               = FE3sSceneRegion_light;
   // @method
   o.unserialize         = FE3sSceneRegion_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FE3sSceneCamera);
   o._light = RClass.create(FE3sSceneLight);
}

//==========================================================
// <T>获得背景配置。</T>
//
// @method
// @return Boolean 背景配置
//==========================================================
function FE3sSceneRegion_optionBackground(){
   return this._optionBackground;
}

//==========================================================
// <T>设置背景配置。</T>
//
// @method
// @param p:flag:Boolean 背景配置
//==========================================================
function FE3sSceneRegion_setOptionBackground(p){
   this._optionBackground = p;
}

//==========================================================
// <T>获得背景颜色。</T>
//
// @method
// @return SColor4 背景颜色
//==========================================================
function FE3sSceneRegion_backgroundColor(){
   return this._backgroundColor;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FE3sSceneCamera 相机
//==========================================================
function FE3sSceneRegion_camera(){
   return this._camera;
}

//==========================================================
// <T>获得光源。</T>
//
// @method
// @return FE3sSceneLight 光源
//==========================================================
function FE3sSceneRegion_light(){
   return this._light;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneRegion_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取颜色
   o._backgroundColor.unserialize(p);
   // 读取颜色级别
   //o._colorLevel.unserialize(p);
   // 读取雾化
   //o._fogNear = p.readFloat();
   //o._fogFar = p.readFloat();
   //o._fogRate = p.readFloat();
   //o._fogAttenuation = p.readFloat();
   //o._fogColor.unserialize(p);
   // 读取边界
   //o._edgeRate = p.readFloat();
   //o._edgeLevel = p.readFloat();
   //o._edgeWidth = p.readFloat();
   //o._edgeColor.unserialize(p);
   // 读取平面
   //o._faceRange = p.readFloat();
   //o._faceLimit = p.readFloat();
   //o._faceRate = p.readFloat();
   // 读取相机
   o._camera.unserialize(p);
   // 读取光源
   o._light.unserialize(p);
}
