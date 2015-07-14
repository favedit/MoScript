//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3rSkeletonAnimation = function FE3rSkeletonAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3rAnimation);
   //..........................................................
   // @method
   o.process = MO.FE3rSkeletonAnimation_process;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param skeleton:FE3rSkeleton 骨骼
//==========================================================
MO.FE3rSkeletonAnimation_process = function FE3rSkeletonAnimation_process(skeleton){
   var o = this;
   // 检查有效性
   if(!o._valid){
      return;
   }
   // 获得间隔
   var tick = Math.abs(o._currentTick);
   // 计算间隔
   var bones = skeleton.bones();
   var count = bones.count();
   for(var i = 0; i < count; i++){
      var bone = bones.at(i);
      bone.update(o._playInfo, tick);
   }
}
