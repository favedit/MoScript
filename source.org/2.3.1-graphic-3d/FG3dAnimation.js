//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FG3dAnimation(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   //..........................................................
   // @method
   o.construct    = FG3dAnimation_construct;
   // @method
   o.findBone     = FG3dAnimation_findBone;
   // @method
   o.process      = FG3dAnimation_process;
   o.dispose      = FG3dAnimation_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TObjects();
}

//==========================================================
// <T>根据编号查找骨头。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FG3dBone 骨头
//==========================================================
function FG3dAnimation_findBone(p){
   var o = this;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      if(b.boneId() == p){
         return b;
      }
   }
   return null;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FG3dAnimation_process(){
   var o = this;
   // 获得时间
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
   // 计算间隔
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      b.update(o._currentTick);
   }
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
