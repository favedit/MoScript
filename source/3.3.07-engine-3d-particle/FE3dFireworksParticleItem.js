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
   o._priorPosition     = MO.Class.register(o, new MO.AGetter('_priorPosition'));
   o._direction         = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed             = MO.Class.register(o, new MO.AGetSet('_speed'), 0);
   o._acceleration      = MO.Class.register(o, new MO.AGetter('_acceleration'));
   o._attenuation       = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._splittingDistance = MO.Class.register(o, new MO.AGetSet('_splittingDistance'), 1);
   o._splittingNumber   = MO.Class.register(o, new MO.AGetSet('_splittingNumber'), 0);
   // @attibute
   o._currentDistance   = null;
   o._currentSpeed      = null;
   o._currentDirection  = null;
   o._statusInRange = false;
   o._storeSpeed      = null;
   //..........................................................
   // @method
   o.construct          = MO.FE3dFireworksParticleItem_construct;
   // @method
   o.start              = MO.FE3dFireworksParticleItem_start;
   o.processSplit       = MO.FE3dFireworksParticleItem_processSplit;
   o.processFrame       = MO.FE3dFireworksParticleItem_processFrame;
   // @method
   o.dispose            = MO.FE3dFireworksParticleItem_dispose;
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
   o._priorPosition = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._acceleration = new MO.SVector3();
   o._currentSpeed = new MO.SVector3();
   o._currentDirection = new MO.SVector3();
   o._storeSpeed = new MO.SVector3();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_start = function FE3dFireworksParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   // 设置参数
   o._priorPosition.assign(o._position);
   o._currentDistance = 0;
   o._currentAlpha = 1;
   // 设置速度分量
   var direction = o._direction;
   var speed = o._speed;
   o._currentSpeed.x = direction.x * speed;
   o._currentSpeed.y = direction.y * speed;
   o._currentSpeed.z = direction.z * speed;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_processSplit = function FE3dFireworksParticleItem_processSplit(){
   var o = this;
   var particle = o._particle;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   for(var j = 0; j < 4; j++){
      var count = 16;
      var angleSingle = Math.PI * 2 / count;
      for(var i = 0; i < count; i++){
         var angle = angleSingle * i;
         // 创建粒子项目
         var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
         item.setSplittingNumber(0);
         item.setParticle(particle);
         item.direction().set(Math.sin(angle), Math.cos(angle), 0);
         item.position().assign(position);
         item.color().assign(o._color);
         item.scale().setAll(0.2);
         item.setDelay(0.02 * j);
         item.setSpeed(o._speed);
         item.acceleration().assign(o._acceleration);
         item.setAttenuation(1);
         item.start();
         // 放入处理集合
         particle.pushItem(item);
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_processFrame = function FE3dFireworksParticleItem_processFrame(second){
   var o = this;
   // 保存位置
   var priorPosition = o._priorPosition;
   priorPosition.assign(o._position);

   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   // 计算速度
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed.assign(o._currentSpeed);
         o._currentSpeed.setAll(0.01);
         //o._currentSpeed = 0.2;
         o._color.set(1, 0, 0, 1);
         //o._currentAlpha = 1;
      }else{
         o._color.set(1, 1, 1, 1);
         //o._currentAlpha = 0.2;
         o._currentSpeed.assign(o._storeSpeed);
      }
      o._statusInRange = inRange;
   }
   //if(inRange){
   //}
   // 计算距离
   var speed = o._currentSpeed;
   var distanceX = speed.x * second;
   var distanceY = speed.y * second;
   var distanceZ = speed.z * second;
   // 计算位置
   var position = o._position;
   position.x += distanceX;
   position.y += distanceY;
   position.z += distanceZ;
   // 计算方向
   var direction = o._direction;
   direction.x = position.x - priorPosition.x;
   direction.y = position.y - priorPosition.y;
   direction.z = position.z - priorPosition.z;
   o._currentDistance += direction.length();
   direction.normalize();
   var angle = Math.acos(direction.x);
   if(direction.y > 0){
      o._rotation.z = angle;
   }else{
      o._rotation.z = Math.PI * 2 - angle;
   }
   // 修正速度
   var acceleration = o._acceleration;
   speed.x += acceleration.x * second;
   speed.y += acceleration.y * second;
   speed.z += acceleration.z * second;
   // 计算衰减
   var attenuation = o._attenuation * second;
   if(attenuation > o._currentAlpha){
      o._currentAlpha = 0;
      o._currentFinish = true;
   }else{
      o._currentAlpha -= attenuation;
   }
   // 分裂处理
   if((o._splittingNumber > 0) && (o._currentDistance > o._splittingDistance)){
      o.processSplit();
      o._splittingNumber--;
      if(o._splittingNumber == 0){
         o._currentFinish = true;
      }
   }
   // 脏处理
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticleItem_dispose = function FE3dFireworksParticleItem_dispose(){
   var o = this;
   o._priorPosition = MO.Lang.Object.dispose(o._priorPosition);
   o._direction = MO.Lang.Object.dispose(o._direction);
   // 父处理
   o.__base.FE3dParticleItem.dispose.call(o);
}
