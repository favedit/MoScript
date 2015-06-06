//==========================================================
// <T>渲染填充枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.EG3dDrawMode = new function EG3dDrawMode(){
   var o = this;
   // @member 未知
   o.Unknown = 0;
   // @member 点
   o.Points = 1;
   // @member 线
   o.Lines = 2;
   // @member 线条
   o.LineStrip = 3;
   // @member 线关联
   o.LineLoop = 4;
   // @member 三角形
   o.Triangles = 5;
   // @member 三角形条
   o.TriangleStrip = 6;
   // @member 三角形扇
   o.TriangleFan = 7;
   // @member 四边面（未支持）
   o.Quads = 8;
   // @member 四边面（未支持）
   o.QuadStrip = 9;
   return o;
}
