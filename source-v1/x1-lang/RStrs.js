//============================================================
// RStrsFace
//============================================================
var RStrs = new function(o){
   if(!o){o=this};
   // Method
   o.trim        = RStrs_trim;
   o.nvl         = RStrs_nvl;
   o.append      = RStrs_append;
   o.nameMinLen  = RStrs_nameMinLen;
   o.nameMaxLen  = RStrs_nameMaxLen;
   o.valueMinLen = RStrs_valueMinLen;
   o.valueMaxLen = RStrs_valueMaxLen;
   // Construct
   RMemory.register('RStrs', o);
   return o;
}

//===========================================================
// 转化为小写状态，取得第一个字符的 Unicode 编码
//
// @method
// @param c:value:String 字符对象
// @return String 返回转化后的字符串
//===========================================================
function RStrs_trim(values, trims){
   if(values && values.constructor == Array){
      for(var n=0; n<values.length; n++){
         values[n] = RString.trim(values[n], trims);
      }
   }
   return values;
}

//===========================================================
// 转化为小写状态，取得第一个字符的 Unicode 编码
//
// @method
// @param c:value:String 字符对象
// @return String 返回转化后的字符串
//===========================================================
function RStrs_nvl(values, offset, length){
   var result = new Array();
   for(var n=0; n<length; n++){
      if(!RString.isEmpty(values[n])){
         result[result.length] = values[n];
      }
   }
   return result;
}

//===========================================================
// 在
//
// @method
// @param c:value:String 字符对象
// @return String 返回转化后的字符串
//===========================================================
function RStrs_append(s, count, names, values){
   for(var n=0; n<count; n++){
      if(n > 0){
         s.append(',');
      }
      if(values){
         s.append(names[n], '=', values[n]);
      }else{
         s.append(names[n]);
      }
   }
}

//===========================================================
// 取得数组中名字最短的字符串
//
// @method
// @param arr:Array:TStrs  字符串数组
// @return len 最短的字符串个数
//===========================================================
function RStrs_nameMinLen(arr){
   var len = 0;
   if(values && values.constructor == Array){
      for(var name in arr){
         len = Math.min(name.length, len);
      }
   }
   return len;
}

//===========================================================
// 取得数组中名字最长的字符串
//
// @method
// @param arr:Array:TStrs  字符串数组
// @return len 最短的字符串个数
//===========================================================
function RStrs_nameMaxLen(arr){
   var len = 0;
   if(values && values.constructor == Array){
      var first = true;
      for(var name in arr){
         if(first){
            len = name.length;
            first = false;
         }else{
            len = Math.max(name.length, len);
         }
      }
   }
   return len;
}

//===========================================================
// 取得字符串数组里最短的字符串长度
//
// @method
// @param arr:Array:TStrs  字符串数组
// @return len 最短的字符串个数
//===========================================================
function RStrs_valueMinLen(arr){
   var len = 0;
   if(values && values.constructor == Array){
      for(var name in arr){
         if(value != null && value.constructor == String){
            len = Math.min(value.length, len);
         }
      }
   }
   return len;


   //var len = 0;
   //for(var name in arr){
   //   var value = arr.
   //   len = Math.min(len.length, len);
   //}
   //return len;
}

//===========================================================
// 取得字符串数组里最长的字符串长度
//
// @method
// @param arr:Array:TStrs  字符串数组
// @return len 最长的字符串个数
//===========================================================
function RStrs_valueMaxLen(arr){
   var len = 0;
   if(values && values.constructor == Array){
      var first = true;
      for(var name in arr){
         var value = arr[name];
         if(value != null && value.constructor == String){
            if(first){
               len = name.length;
               first = false;
            }else{
               len = Math.max(name.length, len);
            }
         }
      }
   }
   return len;
}
