//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneProjection(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute 属性
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   //..........................................................
   // @method
   o.angle       = FRs3SceneProjection_angle;
   o.znear       = FRs3SceneProjection_znear;
   o.zfar        = FRs3SceneProjection_zfar;
   o.unserialize = FRs3SceneProjection_unserialize;
   return o;
}

//==========================================================
// <T>获得张角。</T>
//
// @method
// @return Float 张角
//==========================================================
function FRs3SceneProjection_angle(){
   return this._angle;
}

//==========================================================
// <T>获得近平面距离。</T>
//
// @method
// @return Float 近平面距离
//==========================================================
function FRs3SceneProjection_znear(){
   return this._znear;
}

//==========================================================
// <T>获得远平面距离。</T>
//
// @method
// @return Float 远平面距离
//==========================================================
function FRs3SceneProjection_zfar(){
   return this._zfar;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneProjection_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取属性
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
