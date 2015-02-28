//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.Graphic3d.FG3dBone = function FG3dBone(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._boneId   = 0;
   o._modeId   = null;
   //..........................................................
   // @method
   o.update    = FG3dBone_update;
   return o;

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   // @param p:tick:Integer 时刻
   //==========================================================
   function FG3dBone_update(p){
      // 计算帧信息
      //SRs3dFrameInfo info;
      //_pTrackResource->CalculateFrameInfo(info, tick);
      //info.Update();
      // 计算矩阵
      //_matrix.Assign(_pTrackResource->MatrixInvert());
      //_matrix.Append(info.matrix);
      //return ESuccess;
   }
}
