//==========================================================
// <T>渲染深度枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   // @member 未知
   o.None = 0;
   // @member 等于
   o.Equal = 1;
   // @member 不等于
   o.NotEqual = 2;
   // @member 小于
   o.Less = 3;
   // @member 小于等于
   o.LessEqual = 4;
   // @member 大于
   o.Greater = 5;
   // @member 大于等于
   o.GreaterEqual = 6;
   // @member 总是
   o.Always = 7;
   return o;
}
