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
   // @attribute Integer 定义Left按键
   o.Left      = 37;
   // @attribute Integer 定义Up按键
   o.Up        = 38;
   // @attribute Integer 定义Right按键
   o.Right     = 39;
   // @attribute Integer 定义Down按键
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
   // @attribute Integer 定义F1按键
   o.F1        = 112;
   // @attribute Integer 定义F2按键
   o.F2        = 113;
   // @attribute Integer 定义F3按键
   o.F3        = 114;
   // @attribute Integer 定义F4按键
   o.F4        = 115;
   // @attribute Integer 定义F5按键
   o.F5        = 116;
   // @attribute Integer 定义F6按键
   o.F6        = 117;
   // @attribute Integer 定义F7按键
   o.F7        = 118;
   // @attribute Integer 定义F8按键
   o.F8        = 119;
   // @attribute Integer 定义F9按键
   o.F9        = 120;
   // @attribute Integer 定义F10按键
   o.F10       = 121;
   // @attribute Integer 定义F11按键
   o.F11       = 122;
   // @attribute Integer 定义F12按键
   o.F12       = 123;
   // @attribute Integer 定义A按键
   o.A         = 65;
   // @attribute Integer 定义B按键
   o.B         = 66;
   ///@attribute Integer 定义L按键
   o.L         = 76;
   ///@attribute Integer 定义Q按键
   o.Q         = 81;
   ///@attribute Integer 定义S按键
   o.S         = 83;
   ///@attribute Integer 定义F按键
   o.F         = 70;
   ///@attribute Integer 定义I按键
   o.I         = 73;
   ///@attribute Integer 定义D按键
   o.D           = 68;
   // @attribute Enum 各个按键的枚举
   o.ControlKeys = [
      o.Tab, o.Enter, o.BackSpace, o.Shift, o.Left, o.Up, o.Right, o.Down,
      o.Insert, o.Delete, o.Home, o.End, o.PageUp, o.PageDown,o.Ctrl,
      o.F1, o.F2, o.F3, o.F4, o.F5, o.F6, o.F7, o.F8, o.F9, o.F10, o.F11, o.F12];
   // @attribute Enum 浮点数的枚举
   o.floatCodes  = new Object();
   // 控制符
   var f = o.floatCodes;
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
   for(var n = 48; n <= 57; n++){
      f[n] = true;
   }
   return o;
}
