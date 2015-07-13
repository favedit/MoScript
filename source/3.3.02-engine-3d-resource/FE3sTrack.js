//==========================================================
// <T>资源跟踪信息。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sTrack = function FE3sTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._meshCode     = MO.Class.register(o, new MO.AGetter('_meshCode'));
   o._boneIndex    = MO.Class.register(o, new MO.AGetter('_boneIndex'), 0);
   o._frameTick    = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._matrixInvert = MO.Class.register(o, new MO.AGetter('_matrixInvert'));
   o._frameCount   = MO.Class.register(o, new MO.AGetter('_frameCount'));
   o._frames       = MO.Class.register(o, new MO.AGetter('_frames'));
   //..........................................................
   // @method
   o.construct     = MO.FE3sTrack_construct;
   // @method
   o.calculate     = MO.FE3sTrack_calculate;
   // @method
   o.unserialize   = MO.FE3sTrack_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sTrack_construct = function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._matrixInvert = new MO.SMatrix3d();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
// @param info:SE3rPlayInfo 信息
// @param tick:Integer 时刻
//==========================================================
MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
   var o = this;
   // 检查帧数
   var frameCount = info.frameCount;
   if(frameCount == 0){
      throw new MO.TError('Frame count is invalid.');
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
MO.FE3sTrack_unserialize = function FE3sTrack_unserialize(input){
   var o = this;
   // 读取属性
   o._meshCode = input.readString();
   o._boneIndex = input.readUint16();
   o._frameTick = input.readUint16();
   o._matrix.unserialize(input);
   // 计算逆矩阵
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   // 读取帧集合
   o._frameCount = input.readInt16();
   o._frames = new MO.TObjects();
}
