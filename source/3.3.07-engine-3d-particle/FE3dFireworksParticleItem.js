 //==========================================================
// <T>粒子项目。</T>
//
// @class
// @author maocy
// @history 150707
//==========================================================
MO.FE3dFireworksParticleItem = function FE3dFireworksParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   //..........................................................
   // @attibute
   o._direction    = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed        = MO.Class.register(o, new MO.AGetSet('_speed'));
   o._acceleration = MO.Class.register(o, new MO.AGetSet('_acceleration'), 1);
   o._attenuation  = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._startTick    = 0;
   // @attibute
   o._currentAlpha = MO.Class.register(o, new MO.AGetSet('_currentAlpha'), 0);
   o._currentSpeed = 0;
   //..........................................................
   // @method
   o.construct    = MO.FE3dFireworksParticleItem_construct;
   // @method
   o.start        = MO.FE3dFireworksParticleItem_start;
   o.processFrame = MO.FE3dFireworksParticleItem_processFrame;
   // @method
   o.dispose      = MO.FE3dFireworksParticleItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_construct = function FE3dFireworksParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   // 矩阵
   o._direction = new MO.SVector3();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_start = function FE3dFireworksParticleItem_start(){
   var o = this;
   o._currentSpeed = o._speed;
   o._currentAlpha = 1;
   o._startTick = MO.Timer.current();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_processFrame = function FE3dFireworksParticleItem_processFrame(second){
   var o = this;
   //var currentTick = MO.Timer.current();
   //var time = (currentTick - o._startTick) / 1000;
   o._currentAlpha -= o._attenuation * second;
   o._currentSpeed += o._acceleration * second;
   var distance = o._currentSpeed * second;
   var position = o._position;
   var direction = o._direction;
   position.x += direction.x * distance;
   position.y += direction.y * distance;
   position.z += direction.z * distance;
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_dispose = function FE3dFireworksParticleItem_dispose(){
   var o = this;
   o._direction = MO.Lang.Object.dispose(o._direction);
   // 父处理
   o.__base.FE3dParticleItem.dispose.call(o);
}
