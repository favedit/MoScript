 //==========================================================
// <T>粒子项目。</T>
//
// @class
// @author maocy
// @history 150707
//==========================================================
MO.FE3dParticleItem = function FE3dParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._dirty       = false;
   o._lastTick    = 0;
   o._interval    = 10;
   // @attribute
   o._delay       = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._position    = MO.Class.register(o, new MO.AGetter('_position'));
   o._rotation    = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   // @attribute
   o._data        = MO.Class.register(o, new MO.AGetSet('_data'));
   //..........................................................
   // @method
   o.construct    = MO.FE3dParticleItem_construct;
   // @method
   o.dirty        = MO.FE3dParticleItem_dirty;
   // @method
   o.processFrame = MO.FE3dParticleItem_processFrame;
   o.process      = MO.FE3dParticleItem_process;
   // @method
   o.dispose      = MO.FE3dParticleItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_construct = function FE3dParticleItem_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3(0, 0, 0);
   o._rotation = new MO.SVector3(0, 0, 0);
   o._scale = new MO.SVector3(1, 1, 1);
}

//==========================================================
// <T>逻辑帧处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_dirty = function FE3dParticleItem_dirty(){
   this._dirty = true;
}

//==========================================================
// <T>逻辑帧处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_processFrame = function FE3dParticleItem_processFrame(second){
   var o = this;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_process = function FE3dParticleItem_process(){
   var o = this;
   // 检查开始
   var tick = MO.Timer.current();
   if(o._lastTick == 0){
      o._lastTick = tick;
      return false;
   }
   // 检查延迟
   var span = tick - o._lastTick;
   if(span < o._delay){
      return false;
   }
   // 检查间隔
   if(span > o._interval){
      var second = span / 1000;
      o.processFrame(second);
      o._lastTick = tick;
      if(o._dirty){
         var matrix = o._matrix;
         matrix.tx = o._position.x;
         matrix.ty = o._position.y;
         matrix.tz = o._position.z;
         matrix.rx = o._rotation.x;
         matrix.ry = o._rotation.y;
         matrix.rz = o._rotation.z;
         matrix.sx = o._scale.x;
         matrix.sy = o._scale.y;
         matrix.sz = o._scale.z;
         matrix.updateForce();
         o._dirty = false;
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   // 释放属性
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._scale = MO.Lang.Object.dispose(o._scale);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
