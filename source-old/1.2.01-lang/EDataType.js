//==========================================================
// <T>数据类型的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
var EDataType = new function EDataType(){
   var o = this;
   //..........................................................
   // @member 未知
   o.Unknown = 0;
   // @member 8位有符号整数
   o.Int8 = 1;
   // @member 16位有符号整数
   o.Int16 = 2;
   // @member 32位有符号整数
   o.Int32 = 3;
   // @member 64位有符号整数
   o.Int64 = 4;
   // @member 8位无符号整数
   o.Uint8 = 5;
   // @member 16位无符号整数
   o.Uint16 = 6;
   // @member 32位无符号整数
   o.Uint32 = 7;
   // @member 64位无符号整数
   o.Uint64 = 8;
   // @member 16位浮点数
   o.Float16 = 9;
   // @member 32位浮点数
   o.Float32 = 10;
   // @member 64位浮点数
   o.Float64 = 11;
   // @member 字符串
   o.String = 12;
   return o;
}
