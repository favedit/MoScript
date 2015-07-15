﻿//==========================================================
// <T>整型对象的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RInteger = function RInteger(){
   var o = this;
   //..........................................................
   // @define
   o.Chars      = '0123456789-%';
   o.NUMBER     = '0123456789-%';
   o.LEFT_CHAR  = '0';
   o.MAX_UINT16 = 65535;
   o.MAX_UINT32 = 4294967295;
   return o;
}

//==========================================================
// <T>检验传入值是否是整型值。</T>
//
// @method
// @param v:value:String 待检验的字符串
// @return Boolean 是否整数
//==========================================================
MO.RInteger.prototype.isInt = function RInteger_isInt(v){
   return MO.Lang.String.isPattern(v, 'n');
}

//==========================================================
// <T>获取非空内容。</T>
//
// @method
// @param value:Integer 数字
// @param defaultValue:Integer 默认内容
// @return Integer 非空内容
//==========================================================
MO.RInteger.prototype.nvl = function RInteger_nvl(value, defaultValue){
   if(value != null){
      return parseInt(value);
   }
   if(defaultValue != null){
      return defaultValue;
   }
   return 0;
}

//============================================================
// <T>计算一个整数的字节宽。</T>
//
// @param value 整数
// @return 字节宽
//============================================================
MO.RInteger.prototype.strideByte = function RInteger_strideByte(value){
   if(value > 65535){
      return 4;
   }else if(value > 255){
      return 2;
   }else{
      return 1;
   }
}

//============================================================
// <T>计算一个整数的位宽。</T>
//
// @param value 整数
// @return 位宽
//============================================================
MO.RInteger.prototype.strideBit = function RInteger_strideBit(value){
   if(value > 65535){
      return 32;
   }else if(value > 255){
      return 16;
   }else{
      return 8;
   }
}

//==========================================================
// <T>将传入值转换为整型值。</T>
//
// @method
// @param value:value:String 待转换的字符串
// @return int 转换后的整型值 
//==========================================================
MO.RInteger.prototype.parse = function RInteger_parse(v, d){
   // 设置默认值
   if(d == null){
      d = 0;
   }
   // 判断内容为空
   if(v == null){
      return d;
   }
   if(v == ''){
      return d;
   }
   // 去掉两边不可见字符
   v = MO.Lang.String.trim(v.toString());
   // 去掉左边0字符
   while(true){
      if(v.charAt(0) != '0'){
         break;
      }
      v = v.substr(1);
   }
   // 变换类型
   var r = (v.length > 0) ? parseInt(v) : d;
   return isNaN(r) ? d : r;
}

//==========================================================
// <T>格式化数字。</T>
//
// @method
// @param v:value:Integer 数字
// @param l:length:Integer 格式化长度
// @param p:pad:String 补足字符串
// @return String 格式化内容
//==========================================================
MO.RInteger.prototype.format = function RInteger_format(v, l, p){
   if(!p){
      p = this.LEFT_CHAR;
   }
   var v = v.toString();
   for(var i = parseInt(l) - v.length - 1; i >= 0; i--){
      v = p + v;
   }
   return v;
}

//==========================================================
// <T>返回范围内的数字化。</T>
//
// @method
// @param value:Integer 数字
// @param min:Integer 最小数字
// @param max:Integer 最大数字
// @return Integer 数字
//==========================================================
MO.RInteger.prototype.toRange = function RInteger_toRange(value, min, max){
   if(value == null){
      value = 0;
   }
   if(isNaN(value)){
      value = 0;
   }
   if(value < min){
      value = min;
   }
   if(value > max){
      value = max;
   }
   return value;
}

//==========================================================
// <T>计算最接近2的指数的数字。</T>
//
// @method
// @param value:Integer 数字
// @return Integer 数字
//==========================================================
MO.RInteger.prototype.pow2 = function RInteger_pow2(value){
   if(value > 4096){
      return 8192;
   }else if(value > 2048){
      return 4096;
   }else if(value > 1024){
      return 2048;
   }else if(value > 512){
      return 1024;
   }else if(value > 256){
      return 512;
   }else if(value > 128){
      return 256;
   }else if(value > 64){
      return 128;
   }else if(value > 32){
      return 64;
   }else if(value > 16){
      return 32;
   }else if(value > 8){
      return 16;
   }else if(value > 4){
      return 8;
   }else if(value > 2){
      return 4;
   }else if(value > 1){
      return 2;
   }
   return 1;
}

//==========================================================
// <T>计算参数集合的和。</T>
//
// @method
// @param a:arguments:Object[] 参数集合
// @return Integer 合计数字
//==========================================================
MO.RInteger.prototype.sum = function RInteger_sum(){
   var r = 0;
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         r += parseInt(a[n]);
      }
   }
   return r;
}

//==========================================================
// <T>把两个字符串进行算术运算。</T>
//
// @method
// @param f:function:String 方法
// @param a:value1:String 参数1
// @param b:value2:String 参数2
// @return String 计算内容
//==========================================================
MO.RInteger.prototype.calculate = function RInteger_calculate(f, a, b){
   var a = RInteger.parse(a);
   var b = RInteger.parse(b);
   var r = '';
   if(f == '+'){
      r = a + b;
   }else if(f == '-'){
      r = a - b;
   }else if(f == 'x'){
      r = a * b;
   }else if(f == '/'){
     r = a / b;
   }
   return r.toString();
}

//===========================================================
// <T>复制整数数组。</T>
//
// @method
// @param po:outputData:Array 输出数据
// @param poi:outputIndex:Integer 输出位置
// @param pi:inputData:Array 输入数据
// @param pii:inputIndex:Integer 输入位置
// @param pc:count:Integer 总数
//===========================================================
MO.RInteger.prototype.copy = function RInteger_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}

//==========================================================
// <T>把布尔值转化为字符串。</T>
//
// @method
// @param p:value:Integer 数值
// @return String 字符串
//==========================================================
MO.RInteger.prototype.toString = function RInteger_toString(p){
   return (p == null) ? '0' : p.toString();
}
//..........................................................
// 实例化内容
MO.RInteger = new MO.RInteger();
MO.Lang.Integer = MO.RInteger;
