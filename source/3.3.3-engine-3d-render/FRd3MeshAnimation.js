//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3MeshAnimation(o){
   o = RClass.inherits(this, o, FRd3Animation);
   //..........................................................
   // @method
   o.process = FRd3MeshAnimation_process;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:track:FRd3Track 跟踪器
//==========================================================
function FRd3MeshAnimation_process(p){
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
