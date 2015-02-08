//==========================================================
// <T>画板模式枚举。</T>
//
// @enum
// @author maocy
// @version 150203
//==========================================================
var EDsSceneCanvasMode = new function EDsSceneCanvasMode(){
   var o = this;
   // @member 未知
   o.Unknown   = 0;
   // @member 拖拽
   o.Drop      = 1;
   // @member 选择
   o.Select    = 2;
   // @member 位移
   o.Translate = 3;
   // @member 旋转
   o.Rotation  = 4;
   // @member 缩放
   o.Scale     = 5;
   return o;
}
