//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthSphere = function FEaiEarthSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dSphere);
   //..........................................................
   // @attribute
   o._speed            = 0.01;
   // @attribute
   o._currentTick      = 0;
   o._startPosition    = null;
   o._currentPosition  = null;
   o._currentDirection = null;
   o._targetPosition   = null;
   //..........................................................
   // @method
   o.construct         = MO.FEaiEarthFlat_construct;
   // @process
   o.process           = MO.FEaiEarthFlat_process;
   // @method
   o.dispose           = MO.FEaiEarthFlat_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_construct = function FEaiEarthFlat_construct(){
   var o = this;
   o.__base.FE3dSphere.construct.call(o);
   // 设置属性
   o._startPosition = new MO.SPoint3();
   o._currentPosition = new MO.SPoint3();
   o._currentDirection = new MO.SVector3();
   o._targetPosition = new MO.SPoint3();
}
//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_process = function FEaiEarthFlat_process(){
   var o = this;
   o.__base.FE3dSphere.process.call(o);
   // 移动处理
   var currentTick = MO.Timer.current();
   if(o._currentTick != 0){
      var currentPosition = o._currentPosition;
      var currentDirection = o._currentDirection;
      var targetPosition = o._targetPosition;
      if(!currentPosition.equals(targetPosition)){
         var span = (currentTick - o._currentTick) * 0.001;
         var move = o._speed * span;
         var length = currentPosition.lengthTo(targetPosition)
         if(move > length){
            targetPosition.assign(currentPosition);
         }else{
            currentDirection.direction(currentPosition, targetPosition);
            currentPosition.moveTo(targetPosition, move);
         }
      }
   }
   o._currentTick = currentTick;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_dispose = function FEaiEarthFlat_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dSphere.dispose.call(o);
}
