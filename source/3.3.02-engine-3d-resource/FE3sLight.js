//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sLight = function FE3sLight(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   // @attribute 配置
   //o._optionTrack        = null;
   // @attribute 阴影
   //o._shadow1            = null;
   //o._shadow2            = null;
   //o._shadow3            = null;
   //o._shadowAmbientMin   = null;
   //o._shadowAmbientMax   = null;
   //o._shadowAmbientThick = null;
   //o._shadowAmbientRange = null;
   //o._shadowMerge1Base   = null;
   //o._shadowMerge1Rate   = null;
   //o._shadowMerge2Base   = null;
   //o._shadowMerge2Rate   = null;
   // @attribute 材质
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   // @attribute 相机
   o._camera     = MO.Class.register(o, new MO.AGetter('_camera'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sLight_construct;
   // @method
   o.unserialize = MO.FE3sLight_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sLight_construct = function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   // 设置变量
   //o._shadow1 = new SE3sSceneShadow();
   //o._shadow2 = new SE3sSceneShadow();
   //o._shadow3 = new SE3sSceneShadow();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
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
