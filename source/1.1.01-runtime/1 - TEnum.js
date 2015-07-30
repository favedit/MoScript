//============================================================
// <T>枚举基类。</T>
//
// @reference
// @author maocy
// @version 150730
//============================================================
MO.TEnum = function TEnum(){
   var o = this;
   //..........................................................
   // @method
   o.toDisplay = MO.TEnum_toDisplay;
   o.toValue   = MO.TEnum_toValue;
   return o;
}

//============================================================
// <T>获得显示内容。</T>
//
// @method
// @param value:Object 内容
// @param defaultValue:String 缺省内容
// @return String 显示内容
//============================================================
MO.TEnum_toDisplay = function TEnum_toDisplay(value, defaultValue){
   var o = this;
   for(var name in o){
      var nameValue = o[name];
      if(nameValue.constructor != Function){
         if(nameValue == value){
            return name;
         }
      }
   }
   return defaultValue;
}

//============================================================
// <T>获得数据内容。</T>
//
// @method
// @param value:Object 描述
// @param defaultValue:Object 缺省描述
// @return Object 数据内容
//============================================================
MO.TEnum_toValue = function TEnum_toValue(value, defaultValue){
   var o = this;
   var lowerValue = value.toLowerCase();
   for(var name in o){
      var nameValue = o[name];
      if(nameValue.constructor != Function){
         if(name.toLowerCase() == lowerValue){
            return o[name];
         }
      }
   }
   return defaultValue;
}
