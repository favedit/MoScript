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
// @param p:track:FE3rTrack 跟踪器
//==========================================================
function FE3rMeshAnimation_process(p){
   var o = this;
   // 获得间隔
   var ct = o._currentTick;
   // 计算间隔
   var r = p._resource;
   var pi = o._playInfo;
   r.calculate(pi, ct);
   pi.update();
   // 更新跟踪
   var m = p._matrix;
   m.assign(r.matrixInvert());
   m.append(pi.matrix);
}
