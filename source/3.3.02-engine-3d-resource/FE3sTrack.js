//==========================================================
// <T>资源跟踪信息。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sTrack(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._meshCode     = null;
   o._boneIndex    = 0;
   o._frameTick    = 0;
   o._matrix       = null;
   o._matrixInvert = null;
   o._frameCount   = null;
   o._frames       = null;
   //..........................................................
   // @method
   o.construct     = FE3sTrack_construct;
   // @method
   o.boneIndex     = FE3sTrack_boneIndex;
   o.frameTick     = FE3sTrack_frameTick;
   o.matrix        = FE3sTrack_matrix;
   o.matrixInvert  = FE3sTrack_matrixInvert;
   o.frames        = FE3sTrack_frames;
   // @method
   o.calculate     = FE3sTrack_calculate;
   // @method
   o.unserialize   = FE3sTrack_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}

//==========================================================
// <T>获得骨头编号。</T>
//
// @method
// @return Integer 骨头编号
//==========================================================
function FE3sTrack_boneIndex(){
   return this._boneIndex;
}

//==========================================================
// <T>获得帧间隔。</T>
//
// @method
// @return Integer 帧间隔
//==========================================================
function FE3sTrack_frameTick(){
   return this._frameTick;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sTrack_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得逆矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sTrack_matrixInvert(){
   return this._matrixInvert;
}

//==========================================================
// <T>获得帧信息集合。</T>
//
// @method
// @return TObjects 帧信息集合
//==========================================================
function FE3sTrack_frames(){
   return this._frames;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
// @param info:SE3rPlayInfo 信息
// @param tick:Integer 时刻
//==========================================================
function FE3sTrack_calculate(info, tick){
   var o = this;
   // 检查帧数
   var frameCount = info.frameCount;
   if(frameCount == 0){
      throw new TError('Frame count is invalid.');
   }
   var beginIndex = info.beginIndex;
   // 计算间隔
   var frameTick = o._frameTick;
   var index = parseInt(tick / frameTick) % frameCount;
   // 获得当前帧和下一帧
   var frames = o._frames;
   var currentFrame = frames.get(beginIndex + index);
   var nextFrame = null;
   if(index < frameCount - 1){
      nextFrame = frames.get(beginIndex + index + 1);
   }else{
      nextFrame = frames.get(beginIndex);
   }
   // 设置结果
   info.tick = tick;
   info.rate = (tick % frameTick) / frameTick;
   info.currentFrame = currentFrame;
   info.nextFrame = nextFrame;
   return true;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
function FE3sTrack_unserialize(input){
   var o = this;
   // 读取属性
   o._meshCode = input.readString();
   o._boneIndex = input.readUint8();
   o._frameTick = input.readUint16();
   o._matrix.unserialize(input);
   // 计算逆矩阵
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   // 读取帧集合
   var count = input.readInt16();
   if(count > 0){
      o._frameCount = count;
      var frames = o._frames = new TObjects();
      for(var i = 0; i < count; i++){
         var frame = RClass.create(FE3sFrame);
         frame.unserialize(input)
         frames.push(frame);
      }
   }
}
