//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
var EStageKey = new function EStageKey(){
   var o = this;
   // @attribute Integer 前进
   o.Forward       = EKeyCode.W;
   // @attribute Integer 后退
   o.Back          = EKeyCode.S;
   // @attribute Integer 左转
   o.Up            = EKeyCode.Q;
   // @attribute Integer 右转
   o.Down          = EKeyCode.E;
   // @attribute Integer 左转
   o.RotationLeft  = EKeyCode.A;
   // @attribute Integer 右转
   o.RotationRight = EKeyCode.D;
   // @attribute Integer 上转
   o.RotationUp    = EKeyCode.Z;
   // @attribute Integer 下转
   o.RotationDown  = EKeyCode.X;
   // @attribute 焦点对象
   o.FocusForward  = EKeyCode.I;
   o.FocusBack     = EKeyCode.K;
   o.FocusLeft     = EKeyCode.J;
   o.FocusRight    = EKeyCode.L;
   return o;
}
