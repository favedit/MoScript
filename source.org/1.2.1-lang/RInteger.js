//==========================================================
// <T>整型对象的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RInteger = new function RInteger(){
   var o = this;
   // Define
   o.Chars     = '0123456789-%';
   o.NUMBER    = '0123456789-%';
   o.LEFT_CHAR = '0';
   // Method
   o.isInt     = RInteger_isInt;
   o.nvl       = RInteger_nvl;
   o.parse     = RInteger_parse;
   o.format    = RInteger_format;
   o.toRange   = RInteger_toRange;
   o.sum       = RInteger_sum;
   o.calculate = RInteger_calculate;
   return o;
}

//==========================================================
// <T>检验传入值是否是整型值。</T>
//
// @method
// @param v:value:String 待检验的字符串
// @return Boolean 是否整数
//==========================================================
function RInteger_isInt(v){
   return RString.isPattern(v, 'n');
}

//==========================================================
// <T>获取非空内容。</T>
//
// @method
// @param v:value:Integer 数字
// @param d:default:Integer 默认内容
// @return Integer 非空内容
//==========================================================
function RInteger_nvl(v, d){
   return v ? v : (d ? d : 0);
}
 
//==========================================================
// <T>将传入值转换为整型值。</T>
//
// @method
// @param value:value:String 待转换的字符串
// @return int 转换后的整型值 
//==========================================================
function RInteger_parse(v, d){
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
   v = RString.trim(v.toString());
   // 去掉左边0字符
   while(true){
      if('0' != v.charAt(0)){
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
function RInteger_format(v, l, p){
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
// @param v:value:Integer 数字
// @param i:min:Integer 最小数字
// @param a:max:Integer 最大数字
// @return Integer 数字
//==========================================================
function RInteger_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   if(isNaN(v)){
      v = 0;
   }
   if(v < i){
      v = i;
   }
   if(v > a){
      v = a;
   }
   return v;
}

//==========================================================
// <T>计算参数集合的和。</T>
//
// @method
// @param a:arguments:Object[] 参数集合
// @return Integer 合计数字
//==========================================================
function RInteger_sum(){
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
function RInteger_calculate(f, a, b){
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
