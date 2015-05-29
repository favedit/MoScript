with(MO){
    //==========================================================
   // <T>游戏精灵对象。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmSpriteEntity = function FGmSpriteEntity(o){
      o = RClass.inherits(this, o, FGmEntity);
      //..........................................................
      // @method
      o._birthLocation   = null;
      // @method
      o._targetLocation  = null;
      o._targetDirection = null;
      o._targetScale     = null;
      // @method
      o._moveInterval    = 25;
      o._moveLastTick    = 0;
      o._moveSpeed       = 1;
      //..........................................................
      // @method
      o.construct        = FGmSpriteEntity_construct;
      // @method
      o.moveForward      = FGmSpriteEntity_moveForward;
      o.moveRotation     = FGmSpriteEntity_moveRotation;
      // @method
      o.dispose          = FGmSpriteEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmSpriteEntity_construct = function FGmSpriteEntity_construct(){
      var o = this;
      o.__base.FGmEntity.construct.call(o);
      // 设置属性
      o._targetLocation = new SPoint3(0, 0, 0);
      o._targetDirection = new SVector3(0, -1, 0);
      o._scale = new SVector3(1, 1, 1);
   }

   //==========================================================
   // <T>获得方向。</T>
   //
   // @method
   // @return SVector3 方向
   //==========================================================
   MO.FGmEntity_setTargetDirection = function FGmEntity_setTargetDirection(x, y, z){
      var direction = this._targetDirection;
      direction.set(x, y, z);
      direction.normalize();
   }

   //==========================================================
   // <T>在挡墙方向上移动处理。</T>
   //
   // @method
   // @param distance:Number 距离
   //==========================================================
   MO.FGmSpriteEntity_moveForward = function FGmSpriteEntity_moveForward(distance){
      var o = this;
      o._location.x += o._targetDirection.x * distance;
      o._location.y += o._targetDirection.y * distance;
      o._location.z += o._targetDirection.z * distance;
   }

   //==========================================================
   // <T>在挡墙方向上移动处理。</T>
   //
   // @method
   // @param distance:Number 距离
   //==========================================================
   MO.FGmSpriteEntity_moveRotation = function FGmSpriteEntity_moveRotation(angle){
      var o = this;
      o._rotation.z += angle;
      var value = o._rotation.z + Math.PI;
      var direction = o._targetDirection;
      direction.x = Math.sin(value);
      direction.y = Math.cos(value);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmSpriteEntity_dispose = function FGmSpriteEntity_dispose(){
      var o = this;
      // 释放对象
      o._targetLocation = RObject.dispose(o._targetLocation);
      o._targetDirection = RObject.dispose(o._targetDirection);
      o._targetScale = RObject.dispose(o._targetScale);
      // 父处理
      o.__base.FGmEntity.dispose.call(o);
   }
}
