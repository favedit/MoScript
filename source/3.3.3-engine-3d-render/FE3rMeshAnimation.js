//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3rMeshAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   //..........................................................
   // @method
   o.process = FE3rMeshAnimation_process;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param track:FE3rTrack 跟踪器
//==========================================================
function FE3rMeshAnimation_process(track){
   var o = this;
   // 获得间隔
   var tick = o._currentTick;
   // 计算间隔
   var resource = track._resource;
   var playInfo = o._playInfo;
   resource.calculate(playInfo, tick);
   playInfo.update();
   // 更新跟踪
   var matrix = track._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(playInfo.matrix);
}
