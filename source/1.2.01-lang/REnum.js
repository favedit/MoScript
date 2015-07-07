//============================================================
// <T>枚举管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//============================================================
MO.REnum = function REnum(){
   return this;
}

//============================================================
// <T>是否含有当前内容。</T>
//
// @method
//============================================================
MO.REnum.prototype.contains = function REnum_contains(){
}

//============================================================
// <T>尝试获得枚举内容。</T>
//
// @method
// @param instance:Object 枚举对象
// @param value:Object 内容
// @param defaultValue:Object 缺省内容
//============================================================
MO.REnum.prototype.tryEncode = function REnum_tryEncode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(name.toLowerCase() == value.toLowerCase()){
            return instance[name];
         }
      }
   }
   return defaultValue;
}

//============================================================
// <T>获得枚举内容。</T>
//
// @method
// @param instance:Object 枚举对象
// @param value:Object 内容
//============================================================
MO.REnum.prototype.encode = function REnum_encode(instance, value){
   var o = this;
   var result = o.tryEncode(instance, value);
   if(result == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value); 
   }
   return result;
}

//============================================================
// <T>尝试获得枚举描述。</T>
//
// @method
// @param instance:Object 枚举对象
// @param value:Object 描述
// @param defaultValue:Object 缺省描述
//============================================================
MO.REnum.prototype.tryDecode = function REnum_tryDecode(instance, value, defaultValue){
   if(instance){
      for(var name in instance){
         if(instance[name] == value){
            return name;
         }
      }
   }
   return defaultValue;
}

//============================================================
// <T>获得枚举描述。</T>
//
// @method
// @param instance:Object 枚举对象
// @param value:Object 描述
//============================================================
MO.REnum.prototype.decode = function REnum_decode(instance, value){
   var o = this;
   var result = o.tryDecode(instance, value);
   if(result == null){
      throw new TError(o, 'Invalid value (enum={1}, value={2})', RClass.dump(instance), value); 
   }
   return result;
}
//..........................................................
MO.REnum.prototype.parse = MO.REnum.prototype.encode;
//..........................................................
// 实例化内容
MO.REnum = new MO.REnum();
MO.Enum = MO.REnum
