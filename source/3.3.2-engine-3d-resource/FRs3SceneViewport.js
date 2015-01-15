//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneViewport(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 属性
   o._angle      = null;
   o._near       = null;
   o._far        = null;
   //..........................................................
   // @method
   o.angle       = FRs3SceneViewport_angle;
   o.near        = FRs3SceneViewport_near;
   o.far         = FRs3SceneViewport_far;
   o.unserialize = FRs3SceneViewport_unserialize;
   return o;
}

//==========================================================
// <T>获得张角。</T>
//
// @method
// @return Float 张角
//==========================================================
function FRs3SceneViewport_angle(){
   return this._angle;
}

//==========================================================
// <T>获得近平面距离。</T>
//
// @method
// @return Float 近平面距离
//==========================================================
function FRs3SceneViewport_near(){
   return this._near;
}

//==========================================================
// <T>获得远平面距离。</T>
//
// @method
// @return Float 远平面距离
//==========================================================
function FRs3SceneViewport_far(){
   return this._far;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneViewport_unserialize(p){
   var o = this;
   // 读取属性
   o._angle = p.readFloat();
   o._near = p.readFloat();
   o._far = p.readFloat();
}
