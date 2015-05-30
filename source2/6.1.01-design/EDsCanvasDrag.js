//==========================================================
// <T>画板拖拽枚举。</T>
//
// @enum
// @author maocy
// @version 150203
//==========================================================
MO.EDsCanvasDrag = new function EDsCanvasDrag(){
   var o = this;
   // @member 未知
   o.Unknown = 0;
   // @member 拖拽
   o.X       = 1;
   // @member 选择
   o.Y       = 2;
   // @member 位移
   o.Z       = 3;
   // @member 全部
   o.All     = 4;
   return o;
}
