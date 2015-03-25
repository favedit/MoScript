//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sLight(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._typeName   = null;
   // @attribute 材质
   o._material   = null;
   // @attribute 相机
   o._camera     = null;
   //..........................................................
   // @method
   o.construct   = FE3sLight_construct;
   // @method
   o.typeName    = FE3sLight_typeName;
   o.material    = FE3sLight_material;
   o.camera      = FE3sLight_camera;
   o.unserialize = FE3sLight_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   // 设置变量
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FE3sLight_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FE3sSceneMaterial 材质
//==========================================================
function FE3sLight_material(){
   return this._material;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FE3sSceneCamera 相机
//==========================================================
function FE3sLight_camera(){
   return this._camera;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._typeName = p.readString();
   // 读取材质
   o._material.unserialize(p);
   // 读取相机
   o._camera.unserialize(p);
}
