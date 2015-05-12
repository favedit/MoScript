//==========================================================
// <T>场景显示对象。</T>
//
// @class
// @author maocy
// @history 150115
//==========================================================
function FE3dMovie(o){
   o = RClass.inherits(this, o, FObject, MLinkerResource);
   //..........................................................
   // @attribute
   o._interval      = null;
   o._firstTick     = 0;
   o._lastTick      = 0;
   o._matrix        = null;
   //..........................................................
   // @method
   o.construct      = FE3dMovie_construct;
   // @method
   o.loadResource   = FE3dMovie_loadResource;
   o.reloadResource = FE3dMovie_reloadResource;
   o.process        = FE3dMovie_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sSceneMovie 资源
//==========================================================
function FE3dMovie_loadResource(resource){
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
function FE3dMovie_reloadResource(){
   var o = this;
   var resource = o._resource;
   o.loadResource(resource);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dMovie_process(matrix){
   var o = this;
   // 最后更新
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
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
