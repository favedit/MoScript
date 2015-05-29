//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
MO.EStageKey = new function EStageKey(){
   var o = this;
   // @attribute Integer 前进
   o.Forward       = MO.EKeyCode.W;
   // @attribute Integer 后退
   o.Back          = MO.EKeyCode.S;
   // @attribute Integer 左转
   o.Up            = MO.EKeyCode.Q;
   // @attribute Integer 右转
   o.Down          = MO.EKeyCode.E;
   // @attribute Integer 左转
   o.RotationLeft  = MO.EKeyCode.A;
   // @attribute Integer 右转
   o.RotationRight = MO.EKeyCode.D;
   // @attribute Integer 上转
   o.RotationUp    = MO.EKeyCode.Z;
   // @attribute Integer 下转
   o.RotationDown  = MO.EKeyCode.X;
   // @attribute 焦点对象
   o.FocusForward  = MO.EKeyCode.I;
   o.FocusBack     = MO.EKeyCode.K;
   o.FocusLeft     = MO.EKeyCode.J;
   o.FocusRight    = MO.EKeyCode.L;
   return o;
}
