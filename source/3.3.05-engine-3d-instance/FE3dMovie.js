//==========================================================
// <T>场景显示对象。</T>
//
// @class
// @author maocy
// @history 150115
//==========================================================
MO.FE3dMovie = function FE3dMovie(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._interval      = null;
   o._firstTick     = 0;
   o._lastTick      = 0;
   o._matrix        = null;
   //..........................................................
   // @method
   o.construct      = MO.FE3dMovie_construct;
   // @method
   o.loadResource   = MO.FE3dMovie_loadResource;
   o.reloadResource = MO.FE3dMovie_reloadResource;
   o.process        = MO.FE3dMovie_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dMovie_construct = function FE3dMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sSceneMovie 资源
//==========================================================
MO.FE3dMovie_loadResource = function FE3dMovie_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._interval = resource._interval;
   o._matrix.setRotation(resource._rotation.x, resource._rotation.y * Math.PI / 180, resource._rotation.z);
   o._matrix.update();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dMovie_reloadResource = function FE3dMovie_reloadResource(){
   var o = this;
   var resource = o._resource;
   o.loadResource(resource);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dMovie_process = function FE3dMovie_process(matrix){
   var o = this;
   // 最后更新
   if(o._firstTick == 0){
      o._firstTick = MO.Timer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = MO.Timer.current();
   }
   // 更新间隔
   var tick = RTimer.current();
   var span = tick - o._lastTick;
   if(span > o._interval){
      var resource = o._resource;
      var speed = span / 1000;
      // 数据处理
      var code = o._resource.code();
      if(code == 'rotation'){
         matrix.ry += resource._rotation.y * speed;
         matrix.updateForce();
         //matrix.append(o._matrix);
      }
      o._lastTick = tick;
   }
}
