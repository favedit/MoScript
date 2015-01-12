//==========================================================
// <T>浮点数管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//==========================================================
var RFloat = new function RFloat(){
   var o = this;
   // Define
   o.Chars     = '0123456789-.%';
   o.NUMBER    = '0123456789-.%';
   o.LEFT_CHAR = '0';
   // Method
   o.isFloat   = RFloat_isFloat;
   o.parse     = RFloat_parse;
   o.format    = RFloat_format;
   o.nvl       = RFloat_nvl;
   o.toRange   = RFloat_toRange;
   o.sum       = RFloat_sum;
   o.alg       = RFloat_alg;
   return o;
}

//===========================================================
//
//===========================================================
function RFloat_isFloat(value){
   return RString.isPattern(value, 'n');
}

//===========================================================
//
//===========================================================
function RFloat_parse(value){
   if(value == null){
      return 0;
   }
   value = RString.trim(value.toString());
   while(true){
      if(value.charAt(0) != "0"){
         break;
      }
      value = value.substr(1);
   }
   var rs = (value.length > 0) ? parseFloat(value) : 0;
   if(-1 != RString.findChars(value, '%')){
      rs = rs / 100;
   }
   return isNaN(rs) ? 0 : rs;
}

//===========================================================
//
//===========================================================
function RFloat_format(value, len, pad){
   if(!pad){
      pad = this.LEFT_CHAR;
   }
   var value = value.toString();
   var left = parseFloat(len) - value.length;
   for(var i=0; i<left; i++){
      value = pad + value;
   }
   return value;
}

//===========================================================
//
//===========================================================
function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}

//===========================================================
//
//===========================================================
function RFloat_toRange(v, min, max){
   if(null == v){
      v = 0;
   }
   return Math.min(Math.max(v, min), max);
}

//===========================================================
// ...
//
//===========================================================
function RFloat_sum(){
   var sum = 0;
   for(var n=0; n<arguments.length; n++){
      if(null != arguments[n]){
         sum += parseFloat(arguments[n]);
      }
   }
   return sum;
}

//===========================================================
//把两个字符串 进行算术运算
//
//===========================================================
function RFloat_alg(f,a,b){
     var a = RFloat.nvl(a);
     var b = RFloat.nvl(b);
     a = parseFloat(a);
     b = parseFloat(b);
     if(f){
        return (a + b).toString();
     }else{
        return (a - b).toString();
     }
}

