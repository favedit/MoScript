//==========================================================
// <T>四维数据。</T>
//
// @struct
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
// @param w:Number W分量
// @author maocy
// @version 150208
//==========================================================
MO.SValue4 = function SValue4(x, y, z, w){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = MO.Runtime.nvl(x, 0);
   o.y           = MO.Runtime.nvl(y, 0);
   o.z           = MO.Runtime.nvl(z, 0);
   o.w           = MO.Runtime.nvl(w, 1);
   //..........................................................
   // @method
   o.assign      = MO.SValue4_assign;
   o.set         = MO.SValue4_set;
   // @method
   o.absolute    = MO.SValue4_absolute;
   o.normalize   = MO.SValue4_normalize;
   o.negative    = MO.SValue4_negative;
   // @method
   o.serialize   = MO.SValue4_serialize;
   o.unserialize = MO.SValue4_unserialize;
   // @method
   o.parse       = MO.SValue4_parse;
   o.toString    = MO.SValue4_toString;
   return o;
}

//==========================================================
// <T>接收数据内容。</T>
//
// @method
// @param value:SValue4 四维数据
//==========================================================
MO.SValue4_assign = function SValue4_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
   this.w = value.w;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
// @param w:Number W分量
//==========================================================
MO.SValue4_set = function SValue4_set(x, y, z, w){
   this.x = x;
   this.y = y;
   this.z = z;
   this.w = w;
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue4_absolute = function SValue4_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
MO.SValue4_normalize = function SValue4_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
      this.w *= rate;
   }
}

//============================================================
// <T>获得负数据内容。</T>
//
// @method
// @param value:SValue4 数据内容
// @return SValue4 数据内容
//============================================================
MO.SValue4_negative = function SValue4_negative(value){
   // 生成内容
   var result = null;
   if(value){
      result = value;
   }else{
      result = new this.constructor();
   }
   // 设置内容
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   result.w = -this.w;
   return result;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param output:FByteStream 数据流
//==========================================================
MO.SValue4_serialize = function SValue4_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
   output.writeFloat(this.w);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SValue4_unserialize = function SValue4_unserialize(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
   this.w = input.readFloat();
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param value:String 字符串
//============================================================
MO.SValue4_parse = function SValue4_parse(value){
   var items = value.split(',')
   if(items.length == 4){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
      this.w = parseFloat(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.SValue4_toString = function SValue4_toString(){
   return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
}
