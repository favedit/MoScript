//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneProjection(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute 属性
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   //..........................................................
   // @method
   o.angle       = FE3sSceneProjection_angle;
   o.znear       = FE3sSceneProjection_znear;
   o.zfar        = FE3sSceneProjection_zfar;
   o.unserialize = FE3sSceneProjection_unserialize;
   return o;
}

//==========================================================
// <T>获得张角。</T>
//
// @method
// @return Float 张角
//==========================================================
function FE3sSceneProjection_angle(){
   return this._angle;
}

//==========================================================
// <T>获得近平面距离。</T>
//
// @method
// @return Float 近平面距离
//==========================================================
function FE3sSceneProjection_znear(){
   return this._znear;
}

//==========================================================
// <T>获得远平面距离。</T>
//
// @method
// @return Float 远平面距离
//==========================================================
function FE3sSceneProjection_zfar(){
   return this._zfar;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneProjection_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
