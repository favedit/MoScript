//==========================================================
// <T>界面颜色管理类。</T>
//
// @reference
// @author maocy
// @version 150712
//==========================================================
MO.RGuiColor = function RGuiColor(){
   var o = this;
   return o;
}

//==========================================================
// <T>根据16进制颜色生成字符串。</T>
//
// @method
// @param color:String 颜色
// @param alpha:Number 透明
// @return String 字符串
//==========================================================
MO.RGuiColor.prototype.makeRgbString = function RGuiColor_makeRgbString(color, alpha){
   var red = color.substring(2, 4);
   var green = color.substring(4, 6);
   var blue = color.substring(6, 8);
   var result = 'rgba(' + MO.Lang.Hex.parse(red) + ',' + MO.Lang.Hex.parse(green) + ',' + MO.Lang.Hex.parse(blue) + ',' + alpha + ')';
   return result;
}
//..........................................................
// 实例化内容
MO.GuiColor = new MO.RGuiColor();
