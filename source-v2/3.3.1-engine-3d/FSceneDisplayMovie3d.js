 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FSceneDisplayMovie3d(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   //..........................................................
   // @method
   o.loadResource = FSceneDisplayMovie3d_loadResource;
   o.process      = FSceneDisplayMovie3d_process;
   return o;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3SceneMovie 资源
//==========================================================
function FSceneDisplayMovie3d_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FSceneDisplayMovie3d_process(p){
   var o = this;
   // 最后更新
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
   }
   // 更新间隔
   var ct = RTimer.current();
   var sp = ct - o._lastTick;
   if(sp > o._interval){
      // 数据处理
      if(o._resource._typeName == 'rotation'){
         //var t = (ct - o._firstTick) / 1000;
         //var r = o._resource._rotation;
         //o._matrix.setRotation((r.x * t), (r.y * t) % (Math.PI * 2.0), (r.z * t));
         //o._matrix.update();
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
