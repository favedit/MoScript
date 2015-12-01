﻿//==========================================================
// <T>三维数据。</T>
//
// @struct
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
// @author maocy
// @version 150208
//==========================================================
MO.SValue3 = function SValue3(x, y, z){
   var o = this;
   //..........................................................
   // @attribute
   o.x              = MO.Runtime.nvl(x, 0);
   o.y              = MO.Runtime.nvl(y, 0);
   o.z              = MO.Runtime.nvl(z, 0);
   //..........................................................
   // @method
   o.isEmpty        = MO.SValue3_isEmpty;
   // @method
   o.equals         = MO.SValue3_equals;
   o.equalsData     = MO.SValue3_equalsData;
   // @method
   o.assign         = MO.SValue3_assign;
   o.setMin         = MO.SValue3_setMin;
   o.setMax         = MO.SValue3_setMax;
   o.set            = MO.SValue3_set;
   o.setAll         = MO.SValue3_setAll;
   // @method
   o.add            = MO.SValue3_add;
   o.addValue3      = MO.SValue3_addValue3;
   o.mul            = MO.SValue3_mul;
   o.mulAll         = MO.SValue3_mulAll;
   // @method
   o.length         = MO.SValue3_absolute;
   o.lengthTo       = MO.SValue3_lengthTo;
   o.lengthToValue3 = MO.SValue3_lengthToValue3;
   o.absolute       = MO.SValue3_absolute;
   o.normalize      = MO.SValue3_normalize;
   o.negative       = MO.SValue3_negative;
   // @method
   o.serialize      = MO.SValue3_serialize;
   o.unserialize    = MO.SValue3_unserialize3;
   o.unserialize2   = MO.SValue3_unserialize2;
   o.unserialize3   = MO.SValue3_unserialize3;
   // @method
   o.parse          = MO.SValue3_parse;
   o.toDisplay      = MO.SValue3_toDisplay;
   o.toString       = MO.SValue3_toString;
   o.dispose        = MO.SValue3_dispose;
   return o;
}

//============================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SValue3_isEmpty = function SValue3_isEmpty(p){
   var o = this;
   return (o.x == 0) && (o.y == 0) && (o.z == 0);
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @return Boolean 是否相等
//============================================================
MO.SValue3_equals = function SValue3_equals(value){
   var o = this;
   return (o.x == value.x) && (o.y == value.y) && (o.z == value.z);
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @return Boolean 是否相等
//============================================================
MO.SValue3_equalsData = function SValue3_equalsData(x, y, z){
   var o = this;
   return (o.x == x) && (o.y == y) && (o.z == z);
}

//==========================================================
// <T>接收数据内容。</T>
//
// @method
// @param value:SValue3 三维数据
//==========================================================
MO.SValue3_assign = function SValue3_assign(value){
   var o = this;
   o.x = value.x;
   o.y = value.y;
   o.z = value.z;
}

//==========================================================
// <T>设置最小数据。</T>
//
// @method
//==========================================================
MO.SValue3_setMin = function SValue3_setMin(){
   var o = this;
   o.x = o.y = o.z = Number.MIN_VALUE;
}

//==========================================================
// <T>设置最大数据。</T>
//
// @method
//==========================================================
MO.SValue3_setMax = function SValue3_setMax(){
   var o = this;
   o.x = o.y = o.z = Number.MAX_VALUE;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
//==========================================================
MO.SValue3_set = function SValue3_set(x, y, z){
   var o = this;
   if(x != null){
      o.x = x;
   }
   if(y != null){
      o.y = y;
   }
   if(z != null){
      o.z = z;
   }
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param value:Number 内容
//==========================================================
MO.SValue3_setAll = function SValue3_set(value){
   var o = this;
   if(value != null){
      o.x = value;
      o.y = value;
      o.z = value;
   }
}

//==========================================================
// <T>增加数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
//==========================================================
MO.SValue3_add = function SValue3_add(x, y, z){
   var o = this;
   o.x += x;
   o.y += y;
   o.z += z;
}

//==========================================================
// <T>增加数据内容。</T>
//
// @method
// @param value:SVector3 方向
//==========================================================
MO.SValue3_addValue3 = function SValue3_addValue3(value){
   var o = this;
   o.x += value.x;
   o.y += value.y;
   o.z += value.z;
}

//==========================================================
// <T>乘以数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
//==========================================================
MO.SValue3_mul = function SValue3_mul(x, y, z){
   var o = this;
   o.x *= x;
   o.y *= y;
   o.z *= z;
}

//==========================================================
// <T>乘以数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
//==========================================================
MO.SValue3_mulAll = function SValue3_mulAll(value){
   var o = this;
   o.x *= value;
   o.y *= value;
   o.z *= value;
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
MO.SValue3_normalize = function SValue3_normalize(){
   var o = this;
   var value = o.absolute();
   if(value != 0){
      var rate = 1 / value;
      o.x *= rate;
      o.y *= rate;
      o.z *= rate;
   }
   return o;
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue3_lengthTo = function SValue3_lengthTo(x, y, z){
   var o = this;
   var cx = o.x - x;
   var cy = o.y - y;
   var cz = o.z - z;
   return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue3_lengthToValue3 = function SValue3_lengthTo(value){
   var o = this;
   var cx = o.x - value.x;
   var cy = o.y - value.y;
   var cz = o.z - value.z;
   return Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue3_absolute = function SValue3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}

//============================================================
// <T>获得负数据内容。</T>
//
// @method
// @param value:SValue3 数据内容
// @return SValue3 数据内容
//============================================================
MO.SValue3_negative = function SValue3_negative(value){
   var o = this;
   // 生成内容
   var result = null;
   if(p){
      result = value;
   }else{
      result = new o.constructor();
   }
   // 设置内容
   result.x = -o.x;
   result.y = -o.y;
   result.z = -o.z;
   return result;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param output:FByteStream 数据流
//==========================================================
MO.SValue3_serialize = function SValue3_serialize(output){
   var o = this;
   output.writeFloat(o.x);
   output.writeFloat(o.y);
   output.writeFloat(o.z);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SValue3_unserialize2 = function SValue3_unserialize2(input, dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int32:
         o.x = input.readInt32();
         o.y = input.readInt32();
         break;
      case MO.EDataType.Float:
         o.x = input.readFloat();
         o.y = input.readFloat();
         break;
      case MO.EDataType.Double:
         o.x = input.readDouble();
         o.y = input.readDouble();
         break;
      default:
         break;
   }
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SValue3_unserialize3 = function SValue3_unserialize3(input, dataCd) {
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int32:
         o.x = input.readInt32();
         o.y = input.readInt32();
         o.z = input.readInt32();
         break;
      case MO.EDataType.Float:
         o.x = input.readFloat();
         o.y = input.readFloat();
         o.z = input.readFloat();
         break;
      case MO.EDataType.Double:
         o.x = input.readDouble();
         o.y = input.readDouble();
         o.z = input.readDouble();
         break;
      default:
         break;
   }
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param value:String 字符串
//============================================================
MO.SValue3_parse = function SValue3_parse(value){
   var o = this;
   var items = value.split(',')
   if(items.length == 3){
      o.x = parseFloat(items[0]);
      o.y = parseFloat(items[1]);
      o.z = parseFloat(items[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}

//==========================================================
// <T>获得显示内容。</T>
//
// @return String 字符串
//==========================================================
MO.SValue3_toDisplay = function SValue3_toDisplay(){
   var o = this;
   var x = MO.Lang.Float.format(o.x);
   var y = MO.Lang.Float.format(o.y);
   var z = MO.Lang.Float.format(o.z);
   return x + ',' + y + ',' + z;
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
MO.SValue3_toString = function SValue3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SValue3_dispose = function SValue3_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
   o.z = null;
}
