 //==========================================================
// <T>粒子项目。</T>
//
// @class
// @author maocy
// @history 150707
//==========================================================
MO.FE3dRainFontParticleItem = function FE3dRainFontParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   //..........................................................
   // @attibute
   o._direction    = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed        = MO.Class.register(o, new MO.AGetSet('_speed'));
   o._acceleration = MO.Class.register(o, new MO.AGetSet('_acceleration'), 1);
   o._attenuation  = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   // @attibute
   o._statusInRange = false;
   o._currentSpeed = 0;
   o._storeSpeed   = 0;
   //..........................................................
   // @method
   o.construct    = MO.FE3dRainFontParticleItem_construct;
   // @method
   o.start        = MO.FE3dRainFontParticleItem_start;
   o.processFrame = MO.FE3dRainFontParticleItem_processFrame;
   // @method
   o.dispose      = MO.FE3dRainFontParticleItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticleItem_construct = function FE3dRainFontParticleItem_construct(){
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
MO.FE3dRainFontParticleItem_start = function FE3dRainFontParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   // 设置参数
   o._statusInRange = false;
   o._currentSpeed = o._speed;
   o._storeSpeed = 0;
   o._currentAlpha = 0.2;
   o._color.set(0.5, 0.5, 0.5, 1);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticleItem_processFrame = function FE3dRainFontParticleItem_processFrame(second){
   var o = this;
   //var currentTick = MO.Timer.current();
   //var time = (currentTick - o._startTick) / 1000;
   // 计算区域
   var size = o._particle._graphicContext.size();
   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   // 计算衰减
   var attenuation = o._attenuation * second;
   //if(r == 0){
   //   if(attenuation > o._currentAlpha){
   //      o._currentAlpha = 0;
   //      o._currentFinish = true;
   //   }else{
   //      //o._currentAlpha -= attenuation;
   //   }
   //}
   // 计算速度
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed = o._currentSpeed;
         o._currentSpeed = 0.2;
         o._color.set(1, 0, 0, 1);
         o._currentAlpha = 1;
      }else{
         o._color.set(1, 1, 1, 1);
         o._currentAlpha = 0.2;
         o._currentSpeed = o._storeSpeed;
      }
      o._statusInRange = inRange;
   }
   // 计算位置
   var distance = o._currentSpeed * second;
   var direction = o._direction;
   position.x += direction.x * distance;
   position.y += direction.y * distance;
   position.z += direction.z * distance;
   // 脏处理
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticleItem_dispose = function FE3dRainFontParticleItem_dispose(){
   var o = this;
   o._direction = MO.Lang.Object.dispose(o._direction);
   // 父处理
   o.__base.FE3dParticleItem.dispose.call(o);
}
