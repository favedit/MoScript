//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FG3dFrame(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._boneId = 0;
   o._modeId          = null;
   o._boneResource    = null
   o._trackResource   = null;
   o._tick            = 0;
   o._matrix          = null;
   //..........................................................
   // @method
   o.construct   = FG3dFrame_construct;
   o.tick        = FG3dFrame_tick;
   o.matrix      = FG3dFrame_matrix;
   o.update    = FG3dFrame_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dFrame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FG3dFrame_tick(){
   return this._tick;
}

//==========================================================
// <T>查找矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FG3dFrame_matrix(){
   return this._matrix;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:tick:Integer 时刻
//==========================================================
function FG3dFrame_update(p){
   // 计算帧信息
   //SRs3dFrameInfo info;
   //_pTrackResource->CalculateFrameInfo(info, tick);
   //info.Update();
   // 计算矩阵
   //_matrix.Assign(_pTrackResource->MatrixInvert());
   //_matrix.Append(info.matrix);
   //return ESuccess;
}
