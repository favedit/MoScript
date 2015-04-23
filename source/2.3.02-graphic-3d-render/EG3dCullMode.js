//==========================================================
// <T>渲染剔除枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   // @member 不剔除
   o.None = 0;
   // @member 前面剔除
   o.Front= 1;
   // @member 背面剔除
   o.Back = 2;
   // @member 都剔除
   o.Both = 3;
   return o;
}
