//==========================================================
// <T>资源跟踪信息。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Track(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._optionBoneScale = false;
   o._boneIndex       = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frameCount      = null;
   o._frames          = null;
   //..........................................................
   // @method
   o.construct        = FRs3Track_construct;
   // @method
   o.boneIndex        = FRs3Track_boneIndex;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
   // @method
   o.calculate        = FRs3Track_calculate;
   // @method
   o.unserialize      = FRs3Track_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Track_construct(){
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
function FRs3Track_boneIndex(){
   return this._boneIndex;
}

//==========================================================
// <T>获得帧间隔。</T>
//
// @method
// @return Integer 帧间隔
//==========================================================
function FRs3Track_frameTick(){
   return this._frameTick;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3Track_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得逆矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3Track_matrixInvert(){
   return this._matrixInvert;
}

//==========================================================
// <T>获得帧信息集合。</T>
//
// @method
// @return TObjects 帧信息集合
//==========================================================
function FRs3Track_frames(){
   return this._frames;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
// @param p:tick:Integer 时刻
//==========================================================
function FRs3Track_calculate(pi, pt){
   var o = this;
   // 检查帧数
   var fc = o._frameCount;
   if(fc == 0){
      return false;
   }
   // 去掉负数
   if(pt < 0){
      pt = -pt;
   }
   // 计算间隔
   var ft = o._frameTick;
   var i = parseInt(pt / ft) % fc;
   // 获得当前帧和下一帧
   var fs = o.frames();
   var cf = fs.get(i);
   var nf = null;
   if(i < fc -1){
      nf = fs.get(i + 1);
   }else{
      nf = fs.get(0);
   }
   // 设置结果
   pi.tick = pt;
   pi.rate = (pt % ft) / ft;
   pi.currentFrame = cf;
   pi.nextFrame = nf;
   return true;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Track_unserialize(p){
   var o = this;
   // 读取属性
   //o._optionBoneScale = p.readBoolean();
   o._boneIndex = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   // 计算逆矩阵
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   // 读取帧集合
   var c = p.readInt16();
   if(c > 0){
      o._frameCount = c;
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
