//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute 颜色
   o._color          = null;
   o._colorLevel     = null;
   // @attribute 雾化
   o._fogNear        = null;
   o._fogFar         = null;
   o._fogRate        = null;
   o._fogAttenuation = null;
   o._fogColor       = null;
   // @attribute 边界
   o._edgeRate       = null;
   o._edgeLevel      = null;
   o._edgeWidth      = null;
   o._edgeColor      = null;
   // @attribute 平面
   o._faceRange      = null;
   o._faceLimit      = null;
   o._faceRate       = null;
   // @attribute 相机
   o._camera         = null;
   // @attribute 光源
   o._light          = null;
   //..........................................................
   // @method
   o.construct       = FRs3SceneRegion_construct;
   o.color           = FRs3SceneRegion_color;
   o.camera          = FRs3SceneRegion_camera;
   o.light           = FRs3SceneRegion_light;
   o.unserialize     = FRs3SceneRegion_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneRegion_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._color = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FRs3SceneCamera);
   o._light = RClass.create(FRs3SceneLight);
}

//==========================================================
// <T>获得颜色。</T>
//
// @method
// @return SColor4 颜色
//==========================================================
function FRs3SceneRegion_color(){
   return this._color;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FRs3SceneCamera 相机
//==========================================================
function FRs3SceneRegion_camera(){
   return this._camera;
}

//==========================================================
// <T>获得光源。</T>
//
// @method
// @return FRs3SceneLight 光源
//==========================================================
function FRs3SceneRegion_light(){
   return this._light;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneRegion_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取颜色
   //o._color.unserialize(p);
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
