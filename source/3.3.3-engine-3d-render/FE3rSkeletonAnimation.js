//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3rSkeletonAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   //..........................................................
   // @method
   o.process = FE3rSkeletonAnimation_process;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FE3rSkeletonAnimation_process(p){
   var o = this;
   // 获得间隔
   var ct = o._currentTick;
   // 计算间隔
   var s = p.bones();
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.getAt(i).update(o._playInfo, ct);
   }
}
