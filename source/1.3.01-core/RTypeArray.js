//==========================================================
// <T>类型数组的工具类</T>
//
// @reference
// @author maocy
// @version 150112
//==========================================================
MO.RTypeArray = function RTypeArray(){
   var o = this;
   //..........................................................
   // @attribute
   o._float3 = null;
   o._float4 = null;
   o._data   = new Object();
   return o;
}

//==========================================================
// <T>获得3元素浮点数。</T>
//
// @method
// @return Float32Array 浮点数
//==========================================================
MO.RTypeArray.prototype.float3 = function RTypeArray_float3(){
   var o = this;
   var value = o._float3;
   if(value == null){
      value = o._float3 = new Float32Array(3);
   }
   return value;
}

//==========================================================
// <T>获得4元素浮点数。</T>
//
// @method
// @return Float32Array 浮点数
//==========================================================
MO.RTypeArray.prototype.float4 = function RTypeArray_float4(){
   var o = this;
   var value = o._float4;
   if(value == null){
      value = o._float4 = new Float32Array(4);
   }
   return value;
}

//==========================================================
// <T>创建定长的数组。</T>
//
// @method
// @param typeCd:EDataType 数据类型
// @param length:Integer 数据长度
// @return Array 数组
//==========================================================
MO.RTypeArray.prototype.createArray = function RTypeArray_createArray(typeCd, length){
   switch(typeCd){
      case MO.EDataType.Boolean:
      case MO.EDataType.Int8:
         return new Int8Array(length);
      case MO.EDataType.Int16:
         return new Int16Array(length);
      case MO.EDataType.Int32:
         return new Int32Array(length);
      case MO.EDataType.Int64:
         return new Int64Array(length);
      case MO.EDataType.Uint8:
         return new Uint8Array(length);
      case MO.EDataType.Uint16:
         return new Uint16Array(length);
      case MO.EDataType.Uint32:
         return new Uint32Array(length);
      case MO.EDataType.Float32:
         return new Float32Array(length);
      case MO.EDataType.Float64:
         return new Float64Array(length);
   }
   throw new TError('Create unknown type array. (type={1}, length={2})', typeCd, length);
}

//==========================================================
// <T>获得唯一的临时数组。</T>
//
// @method
// @param typeCd:EDataType 数据类型
// @param length:Integer 数据长度
// @return Array 数组
//==========================================================
MO.RTypeArray.prototype.findTemp = function RTypeArray_findTemp(typeCd, length){
   var o = this;
   var data = o._data;
   // 获得类型集合
   var collection = data[typeCd];
   if(collection == null){
      collection = data[typeCd] = new Object();
   }
   // 获得类型长度
   var result = collection[length];
   if(result == null){
      result = collection[length] = o.createArray(typeCd, length);
   }
   return result;
}
//..........................................................
// 实例化内容
MO.RTypeArray = new MO.RTypeArray();
MO.TypeArray = MO.RTypeArray;
