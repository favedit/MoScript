//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneLight(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeName           = null;
   // @attribute 配置
   o._optionTrack        = null;
   // @attribute 阴影
   o._shadow1            = null;
   o._shadow2            = null;
   o._shadow3            = null;
   o._shadowAmbientMin   = null;
   o._shadowAmbientMax   = null;
   o._shadowAmbientThick = null;
   o._shadowAmbientRange = null;
   o._shadowMerge1Base   = null;
   o._shadowMerge1Rate   = null;
   o._shadowMerge2Base   = null;
   o._shadowMerge2Rate   = null;
   // @attribute 材质
   o._material           = null;
   // @attribute 相机
   o._camera             = null;
   //..........................................................
   // @method
   o.construct           = FE3sSceneLight_construct;
   o.typeName            = FE3sSceneLight_typeName;
   o.material            = FE3sSceneLight_material;
   o.camera              = FE3sSceneLight_camera;
   o.unserialize         = FE3sSceneLight_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._shadow1 = new SE3sSceneShadow();
   o._shadow2 = new SE3sSceneShadow();
   o._shadow3 = new SE3sSceneShadow();
   o._material = RClass.create(FE3sSceneMaterial);
   o._camera = RClass.create(FE3sSceneCamera);
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FE3sSceneLight_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FE3sSceneMaterial 材质
//==========================================================
function FE3sSceneLight_material(){
   return this._material;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FE3sSceneCamera 相机
//==========================================================
function FE3sSceneLight_camera(){
   return this._camera;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._typeName = p.readString();
   // 读取配置
   //o._optionTrack = p.readInt32();
   // 读取阴影
   //o._shadow1.unserialize(p);
   //o._shadow2.unserialize(p);
   //o._shadow3.unserialize(p);
   //o._shadowAmbientMin = p.readFloat();
   //o._shadowAmbientMax = p.readFloat();
   //o._shadowAmbientThick = p.readFloat();
   //o._shadowAmbientRange = p.readFloat();
   //o._shadowMerge1Base = p.readFloat();
   //o._shadowMerge1Rate = p.readFloat();
   //o._shadowMerge2Base = p.readFloat();
   //o._shadowMerge2Rate = p.readFloat();
   // 读取材质
   o._material.unserialize(p);
   // 读取相机
   o._camera.unserialize(p);
}
