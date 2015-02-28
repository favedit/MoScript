//==========================================================
// <T>资源场景动画。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneMovie(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._interval   = null;
   o._rotation   = null;
   //..........................................................
   // @method
   o.construct   = FRs3SceneMovie_construct;
   // @method
   o.interval    = FRs3SceneMovie_interval;
   o.rotation    = FRs3SceneMovie_rotation;
   // @method
   o.unserialize = FRs3SceneMovie_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneMovie_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._rotation = new SVector3();
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FRs3SceneMovie_interval(){
   return this._interval;
}

//==========================================================
// <T>获得旋转。</T>
//
// @method
// @return SVector3 旋转
//==========================================================
function FRs3SceneMovie_rotation(){
   return this._rotation;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3SceneMovie_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
