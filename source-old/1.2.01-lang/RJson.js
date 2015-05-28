//==========================================================
// <T>JSON字符串处理的工具类。</T>
//
// @reference
// @author maocy
// @version 150409
//==========================================================
var RJson = new function RJson(){
   var o = this;
   //..........................................................
   // @method
   o.parse    = RJson_parse;
   o.toString = RJson_toString;
   return o;
}

//==========================================================
// <T>解析JSON字符串为对象。</T>
//
// @method
// @param value:String 字符串
// @param clazz:Function 类对象
// @return Object 对象
//==========================================================
function RJson_parse(value, clazz){
   var result = null;
   try{
      result = JSON.parse(value)
   }catch(e){
      if(clazz){
         result = new clazz();
      }
   }
   return result;
}

//==========================================================
// <T>解析对象为JSON字符串。</T>
//
// @method
// @param value:Object 对象
// @return String 字符串
//==========================================================
function RJson_toString(value){
   return JSON.stringify(value);
}
