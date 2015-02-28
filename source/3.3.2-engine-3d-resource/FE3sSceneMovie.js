//==========================================================
// <T>资源场景动画。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneMovie(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._interval   = null;
   o._rotation   = null;
   //..........................................................
   // @method
   o.construct   = FE3sSceneMovie_construct;
   // @method
   o.interval    = FE3sSceneMovie_interval;
   o.rotation    = FE3sSceneMovie_rotation;
   // @method
   o.unserialize = FE3sSceneMovie_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSceneMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new SVector3();
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FE3sSceneMovie_interval(){
   return this._interval;
}

//==========================================================
// <T>获得旋转。</T>
//
// @method
// @return SVector3 旋转
//==========================================================
function FE3sSceneMovie_rotation(){
   return this._rotation;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sSceneMovie_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
