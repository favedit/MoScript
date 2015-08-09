//==========================================================
// <T>16进制工具。</T>
//
// @reference
// @author maocy
// @version 150201
//==========================================================
MO.RHex = function RHex(){
   var o = this;
   //..........................................................
   // @define
   o.NUMBER = '0x123456789ABCDEF';
   o.PAD    = '0';
   return o;
}

//===========================================================
// <T>判断是否有效16进制内容。</T>
//
// @method
// @param value:Object 内容
// @return Boolean 是否有效
//===========================================================
MO.RHex.prototype.isValid = function RHex_isValid(value){
   return MO.String.isPattern(value, this.NUMBER);
}

//===========================================================
// <T>解析16进制内容。</T>
//
// @method
// @param value:Object 内容
// @return String 内容
//===========================================================
MO.RHex.prototype.parse = function RHex_parse(value){
   return value ? parseInt('0x' + value) : 0;
}

//===========================================================
// <T>格式化16进制内容。</T>
//
// @method
// @param value:Number 内容
// @param length:Integer 长度
// @return String 内容
//===========================================================
MO.RHex.prototype.format = function RHex_format(value, length){
   var result = null;
   if(value){
      result = value.toString(16);
   }else{
      result = '0';
   }
   return length ? MO.String.lpad(result, length, this.PAD) : result;
}
//..........................................................
// 实例化内容
MO.RHex = new MO.RHex();
MO.Lang.Hex = MO.RHex;
