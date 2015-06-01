//===========================================================
// <T>视截体平面类型枚举。</T>
//
// @enum
// @author maocy
// @version 141229
 //===========================================================
MO.EFrustumPlane = new function EFrustumPlane(){
   var o = this;
   // 近平面
   o.Near = 0;
   // 远平面
   o.Far = 1;
   // 左平面
   o.Left = 2;
   // 右平面
   o.Right = 3;
   // 上平面
   o.Top = 4;
   // 下平面
   o.Bottom = 5;
   // 平面总数
   o.Count = 6;
   return o;
}
