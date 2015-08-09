//==========================================================
// <T>JSON字符串处理的工具类。</T>
//
// @reference
// @author maocy
// @version 150409
//==========================================================
MO.RJson = function RJson(){
   return this;
}

//==========================================================
// <T>解析JSON字符串为对象。</T>
//
// @method
// @param value:String 字符串
// @param clazz:Function 类对象
// @return Object 对象
//==========================================================
MO.RJson.prototype.parse = function RJson_parse(value, clazz){
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
MO.RJson.prototype.toString = function RJson_toString(value){
   return JSON.stringify(value);
}
//..........................................................
// 实例化内容
MO.Json = new MO.RJson();
