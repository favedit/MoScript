//==========================================================
// <T>字符管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RChar = function RChar(){
   return this;
}

//==========================================================
// <T>将一个数字转换为字符</T>
//
// @method
// @param n:number:Number 数字
// @return 字符
//==========================================================
MO.RChar.prototype.parse = function RChar_parse(n){
   return String.fromCharCode(n);
}

//==========================================================
// <T>将一个数字转换为字符</T>
//
// @method
// @param value:Integer 数字
// @return 字符
//==========================================================
MO.RChar.prototype.toString = function RChar_toString(value){
   return value;
}
//..........................................................
// 实例化内容
MO.RChar = new MO.RChar();
MO.Lang.Char = MO.RChar;
