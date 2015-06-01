with(MO){
   //==========================================================
   // <T>渲染区域。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FG3dTrack = function FG3dTrack(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._frames = null;
      //..........................................................
      // @method
      o.construct = FG3dTrack_construct;
      // @method
      o.calculate = FG3dTrack_calculate;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dTrack_construct = function FG3dTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   MO.FG3dTrack_update = function FG3dTrack_update(p){
      var o = this;
      // 计算帧信息
      var info = new SG3dFrameInfo();
      o._trackResource.calculateFrameInfo(info, tick);
      info.update();
      // 计算矩阵
      o._matrix.assign(o._trackResource.matrixInvert());
      o._matrix.append(info.matrix);
      return true;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
      var o = this;
      // 检查帧数
      var frameCount = o._frames.count();
      if(frameCount == 0){
         return false;
      }
      // 去掉负数
      if(tick < 0){
         tick = -tick;
      }
      // 计算间隔
      //TInt span = (TInt)((TFloat)(TInt)tick * info.playRate);
      //TInt index = (span / _frameTick) % frameCount;
      // 获得当前帧和下一帧
      var pCurrentFrame = o._frames.Get(index);
      var pNextFrame = null;
      if(index < frameCount -1){
         pNextFrame = o._frames.Get(index + 1);
      }else{
         pNextFrame = o._frames.Get(0);
      }
      // 设置结果
      info.tick = tick;
      //info.rate = (TFloat)(span % _frameTick) / (TFloat)_frameTick;
      info.currentFrame = pCurrentFrame;
      info.nextFrame = pNextFrame;
      return true;
   }
}
