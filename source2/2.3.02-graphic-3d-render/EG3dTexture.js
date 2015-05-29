﻿//==========================================================
// <T>渲染纹理枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   // @member 未知
   o.Unknown = 0;
   // @member 2D纹理
   o.Flat2d = 1;
   // @member 3D纹理
   o.Flat3d = 2;
   // @member 立方纹理
   o.Cube= 3;
   return o;
}
