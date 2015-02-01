//===========================================================
// <T>按键代码枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
var EKeyCode = new function EKeyCode(){
   var o = this;
   // @attribute Integer 
   o.None      = 0;
   // @attribute Integer 定义Esc按键
   o.Esc       = 27;
   // @attribute Integer 定义Tab按键
   o.Tab       = 9;
   // @attribute Integer 定义Enter按键
   o.Enter     = 13;
   // @attribute Integer 定义Shift按键
   o.Shift     = 16;
   // @attribute Integer 定义Alt按键
   o.Alt       = 18;
   // @attribute Integer 定义Ctrl按键
   o.Ctrl      = 17;
   // @attribute Integer 定义BackSpace按键
   o.BackSpace = 8;
   // @attribute Integer 方向按键
   o.Left      = 37;
   o.Up        = 38;
   o.Right     = 39;
   o.Down      = 40;
   // @attribute Integer 定义Insert按键
   o.Insert    = 45;
   // @attribute Integer 定义Delete按键
   o.Delete    = 46;
   // @attribute Integer 定义Home按键
   o.Home      = 36;
   // @attribute Integer 定义End按键
   o.End       = 35;
   // @attribute Integer 定义PageUp按键
   o.PageUp    = 33;
   // @attribute Integer 定义PageDown按键
   o.PageDown  = 34;
   // @attribute Integer 定义F1~F12按键
   o.F1        = 112;
   o.F2        = 113;
   o.F3        = 114;
   o.F4        = 115;
   o.F5        = 116;
   o.F6        = 117;
   o.F7        = 118;
   o.F8        = 119;
   o.F9        = 120;
   o.F10       = 121;
   o.F11       = 122;
   o.F12       = 123;
   // @attribute Integer 定义0~9按键
   o.N0        = 48;
   o.N1        = 49;
   o.N2        = 50;
   o.N3        = 51;
   o.N4        = 52;
   o.N5        = 53;
   o.N6        = 54;
   o.N7        = 55;
   o.N8        = 56;
   o.N9        = 57;
   // @attribute Integer 定义A~Z按键
   o.A         = 65;
   o.B         = 66;
   o.C         = 67;
   o.D         = 68;
   o.E         = 69;
   o.F         = 70;
   o.G         = 71;
   o.H         = 72;
   o.I         = 73;
   o.J         = 74;
   o.K         = 75;
   o.L         = 76;
   o.M         = 77;
   o.N         = 78;
   o.O         = 79;
   o.P         = 80;
   o.Q         = 81;
   o.R         = 82;
   o.S         = 83;
   o.T         = 84;
   o.U         = 85;
   o.V         = 86;
   o.W         = 87;
   o.X         = 88;
   o.Y         = 89;
   o.Z         = 90;
   //..........................................................
   // @attribute 控制按键
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Shift, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,o.Ctrl,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   //..........................................................
   // @attribute 浮点数按键
   var f = o.floatCodes  = new Object();
   f[o.Tab] = true;
   f[o.Enter] = true;
   f[o.BackSpace] = true;
   f[o.Left] = true;
   f[o.Right] = true;
   f[o.Esc] = true;
   f[o.Delete] = true;
   f[o.Home] = true;
   f[o.End] = true;
   // 减号(-)
   f[45] = true;
   f[190] = true;
   // 小数点(.)
   f[46] = true;
   f[189] = true;
   // 数字键
   for(var n = o.N0; n <= o.N9; n++){
      f[n] = true;
   }
   return o;
}
