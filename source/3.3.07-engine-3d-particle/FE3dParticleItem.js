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
   o._particle      = MO.Class.register(o, new MO.AGetSet('_particle'));
   o._visible       = MO.Class.register(o, new MO.AGetSet('_visible'), false);
   o._delay         = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._interval      = MO.Class.register(o, new MO.AGetter('_interval'), 1);
   // @attribute
   o._position      = MO.Class.register(o, new MO.AGetter('_position'));
   o._rotation      = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale         = MO.Class.register(o, new MO.AGetter('_scale'));
   o._color         = MO.Class.register(o, new MO.AGetter('_color'));
   // @attribute
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._currentAlpha  = MO.Class.register(o, new MO.AGetSet('_currentAlpha'), 0);
   o._currentFinish = MO.Class.register(o, new MO.AGetSet('_currentFinish'), false);
   // @attribute
   o._startTick     = 0;
   o._lastTick      = 0;
   o._statusDirty   = false;
   //..........................................................
   // @method
   o.construct      = MO.FE3dParticleItem_construct;
   // @method
   o.start          = MO.FE3dParticleItem_start;
   // @method
   o.processFrame   = MO.FE3dParticleItem_processFrame;
   o.process        = MO.FE3dParticleItem_process;
   // @method
   o.dirty          = MO.FE3dParticleItem_dirty;
   // @method
   o.dispose        = MO.FE3dParticleItem_dispose;
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
   o._currentMatrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3(0, 0, 0);
   o._rotation = new MO.SVector3(0, 0, 0);
   o._scale = new MO.SVector3(1, 1, 1);
   o._color = new MO.SColor4(1, 1, 1, 1);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_start = function FE3dParticleItem_start(){
   var o = this;
   o._visible = false;
   o._currentAlpha = 1;
   o._currentFinish = false;
   o._startTick = MO.Timer.current();
   o._lastTick = 0;
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
   var tick = MO.Timer.current();
   // 检查延迟
   if(!o._visible){
      if(tick - o._startTick < o._delay){
         return;
      }
   }
   // 检查开始
   if(o._lastTick == 0){
      o._lastTick = tick;
      return false;
   }
   // 检查间隔
   var span = tick - o._lastTick;
   if(span <= o._interval){
      return false;
   }
   // 检查间隔
   var second = span / 1000;
   o.processFrame(second);
   o._lastTick = tick;
   // 检查脏数据
   if(o._statusDirty){
      var matrix = o._currentMatrix;
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
      o._visible = true;
      o._statusDirty = false;
   }
}

//==========================================================
// <T>逻辑帧处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_dirty = function FE3dParticleItem_dirty(){
   this._statusDirty = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   // 释放属性
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._scale = MO.Lang.Object.dispose(o._scale);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
