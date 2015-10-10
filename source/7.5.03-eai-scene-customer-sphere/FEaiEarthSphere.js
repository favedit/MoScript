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
   // @attribute
   o._sourcePoint      = MO.Class.register(o, new MO.AGetter('_sourcePoint'));
   o._sourceTouch      = MO.Class.register(o, new MO.AGetter('_sourceTouch'));
   o._targetTouch      = MO.Class.register(o, new MO.AGetter('_targetTouch'));
   o._sourceDirection  = MO.Class.register(o, new MO.AGetter('_sourceDirection'));
   o._targetDirection  = MO.Class.register(o, new MO.AGetter('_targetDirection'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiEarthSphere_construct;
   // @method
   o.setSource         = MO.FEaiEarthSphere_setSource;
   o.setTarget         = MO.FEaiEarthSphere_setTarget;
   // @method
   o.process           = MO.FEaiEarthSphere_process;
   // @method
   o.dispose           = MO.FEaiEarthSphere_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_construct = function FEaiEarthSphere_construct(){
   var o = this;
   o.__base.FE3dSphere.construct.call(o);
   // 设置属性
   o._sourcePoint = new MO.SEaiEarthTouchPoint();
   o._sourceTouch = new MO.SEaiEarthTouch();
   o._targetTouch = new MO.SEaiEarthTouch();
   o._sourceDirection = new MO.SVector3();
   o._targetDirection = new MO.SVector3();
}

//==========================================================
// <T>设置来源处理。</T>
//
// @method
// @param info:FEaiChartCustomerSphereInfo 信息
//==========================================================
MO.FEaiEarthSphere_setSource = function FEaiEarthSphere_setSource(info){
   var o = this;
   o._sourceTouch.setInfo(info);
}

//==========================================================
// <T>设置目标处理。</T>
//
// @method
// @param info:FEaiChartCustomerSphereInfo 信息
//==========================================================
MO.FEaiEarthSphere_setTarget = function FEaiEarthSphere_setTarget(info){
   var o = this;
   o._targetTouch.setInfo(info);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_process = function FEaiEarthSphere_process(){
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
MO.FEaiEarthSphere_dispose = function FEaiEarthSphere_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dSphere.dispose.call(o);
}
