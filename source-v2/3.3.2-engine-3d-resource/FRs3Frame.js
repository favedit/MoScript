//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3Frame(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._tick        = 0;
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   //..........................................................
   // @method
   o.construct    = FRs3Frame_construct;
   o.tick         = FRs3Frame_tick;
   o.translation  = FRs3Frame_translation;
   o.quaternion   = FRs3Frame_quaternion;
   o.scale        = FRs3Frame_scale;
   o.unserialize  = FRs3Frame_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Frame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._translation = new SPoint3();
   o._quaternion = new SQuaternion();
   o._scale = new SVector3();
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FRs3Frame_tick(){
   return this._tick;
}

//==========================================================
// <T>获得位移信息。</T>
//
// @method
// @return SPoint3 位移信息
//==========================================================
function FRs3Frame_translation(){
   return this._translation;
}

//==========================================================
// <T>获得旋转信息。</T>
//
// @method
// @return SQuaternion 旋转信息
//==========================================================
function FRs3Frame_quaternion(){
   return this._quaternion;
}

//==========================================================
// <T>获得缩放信息。</T>
//
// @method
// @return SVector3 缩放信息
//==========================================================
function FRs3Frame_scale(){
   return this._scale;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Frame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._translation.unserialize(p);
   o._quaternion.unserialize(p);
   o._scale.unserialize(p);
}
