//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FE3sFrame(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   //..........................................................
   // @method
   o.translation  = FE3sFrame_translation;
   o.quaternion   = FE3sFrame_quaternion;
   o.scale        = FE3sFrame_scale;
   return o;
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FE3sFrame_tick(){
   return this._tick;
}

//==========================================================
// <T>获得位移信息。</T>
//
// @method
// @return SPoint3 位移信息
//==========================================================
function FE3sFrame_translation(){
   return this._translation;
}

//==========================================================
// <T>获得旋转信息。</T>
//
// @method
// @return SQuaternion 旋转信息
//==========================================================
function FE3sFrame_quaternion(){
   return this._quaternion;
}

//==========================================================
// <T>获得缩放信息。</T>
//
// @method
// @return SVector3 缩放信息
//==========================================================
function FE3sFrame_scale(){
   return this._scale;
}
