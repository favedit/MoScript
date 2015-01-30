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
   o._boneId          = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frames          = null;
   //..........................................................
   // @method
   o.construct        = FRs3Track_construct;
   o.boneId           = FRs3Track_boneId;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
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
function FRs3Track_boneId(){
   return this._boneId;
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
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Track_unserialize(p){
   var o = this;
   // 读取属性
   o._optionBoneScale = p.readBoolean();
   o._boneId = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   // 计算逆矩阵
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   // 读取帧集合
   var c = p.readInt16();
   if(c > 0){
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
