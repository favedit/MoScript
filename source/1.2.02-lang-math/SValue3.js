//==========================================================
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
   o.x           = MO.Runtime.nvl(x, 0);
   o.y           = MO.Runtime.nvl(y, 0);
   o.z           = MO.Runtime.nvl(z, 0);
   //..........................................................
   // @method
   o.isEmpty     = MO.SValue3_isEmpty;
   // @method
   o.assign      = MO.SValue3_assign;
   o.setMin      = MO.SValue3_setMin;
   o.setMax      = MO.SValue3_setMax;
   o.set         = MO.SValue3_set;
   // @method
   o.absolute    = MO.SValue3_absolute;
   o.normalize   = MO.SValue3_normalize;
   o.negative    = MO.SValue3_negative;
   // @method
   o.serialize   = MO.SValue3_serialize;
   o.unserialize = MO.SValue3_unserialize;
   // @method
   o.parse       = MO.SValue3_parse;
   o.toString    = MO.SValue3_toString;
   return o;
}

//============================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SValue3_isEmpty = function SValue3_isEmpty(p){
   return (this.x == 0) && (this.y == 0) && (this.z == 0);
}

//==========================================================
// <T>接收数据内容。</T>
//
// @method
// @param value:SValue3 三维数据
//==========================================================
MO.SValue3_assign = function SValue3_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
}

//==========================================================
// <T>设置最小数据。</T>
//
// @method
//==========================================================
MO.SValue3_setMin = function SValue3_setMin(){
   this.x = Number.MIN_VALUE;
   this.y = Number.MIN_VALUE;
   this.z = Number.MIN_VALUE;
}

//==========================================================
// <T>设置最大数据。</T>
//
// @method
//==========================================================
MO.SValue3_setMax = function SValue3_setMax(){
   this.x = Number.MAX_VALUE;
   this.y = Number.MAX_VALUE;
   this.z = Number.MAX_VALUE;
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
   this.x = x;
   this.y = y;
   this.z = z;
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
MO.SValue3_normalize = function SValue3_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
   }
   return this;
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue3_absolute = function SValue3_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}

//============================================================
// <T>获得负数据内容。</T>
//
// @method
// @param value:SValue3 数据内容
// @return SValue3 数据内容
//============================================================
MO.SValue3_negative = function SValue3_negative(value){
   // 生成内容
   var result = null;
   if(p){
      result = value;
   }else{
      result = new this.constructor();
   }
   // 设置内容
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   return result;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param output:FByteStream 数据流
//==========================================================
MO.SValue3_serialize = function SValue3_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SValue3_unserialize = function SValue3_unserialize(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param value:String 字符串
//============================================================
MO.SValue3_parse = function SValue3_parse(value){
   var items = value.split(',')
   if(items.length == 3){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
MO.SValue3_toString = function SValue3_toString(){
   return this.x + ',' + this.y + ',' + this.z;
}
