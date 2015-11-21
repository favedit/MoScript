//==========================================================
// <T>二维数据。</T>
//
// @struct
// @param x:Number X分量
// @param y:Number Y分量
// @author maocy
// @version 150912
//==========================================================
MO.SValue2 = function SValue2(x, y){
   var o = this;
   //..........................................................
   // @attribute
   o.x            = MO.Runtime.nvl(x, 0);
   o.y            = MO.Runtime.nvl(y, 0);
   //..........................................................
   // @method
   o.isEmpty      = MO.SValue2_isEmpty;
   // @method
   o.equals       = MO.SValue2_equals;
   o.equalsData   = MO.SValue2_equalsData;
   // @method
   o.assign       = MO.SValue2_assign;
   o.setMin       = MO.SValue2_setMin;
   o.setMax       = MO.SValue2_setMax;
   o.set          = MO.SValue2_set;
   o.setAll       = MO.SValue2_setAll;
   // @method
   o.add          = MO.SValue2_add;
   o.mul          = MO.SValue2_mul;
   // @method
   o.mergeMin     = MO.SValue2_mergeMin;
   o.mergeMin2    = MO.SValue2_mergeMin2;
   o.mergeMax     = MO.SValue2_mergeMax;
   o.mergeMax2    = MO.SValue2_mergeMax2;
   // @method
   o.length       = MO.SValue2_length;
   o.length2      = MO.SValue2_length2;
   o.absolute     = MO.SValue2_absolute;
   o.normalize    = MO.SValue2_normalize;
   o.negative     = MO.SValue2_negative;
   // @method
   o.unserialize  = MO.SValue2_unserialize;
   // @method
   o.parse        = MO.SValue2_parse;
   o.toDisplay    = MO.SValue2_toDisplay;
   o.toString     = MO.SValue2_toString;
   o.dispose      = MO.SValue2_dispose;
   return o;
}

//============================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SValue2_isEmpty = function SValue2_isEmpty(){
   return (this.x == 0) && (this.y == 0);
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @return Boolean 是否相等
//============================================================
MO.SValue2_equals = function SValue2_equals(value){
   return (this.x == value.x) && (this.y == value.y);
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @return Boolean 是否相等
//============================================================
MO.SValue2_equalsData = function SValue2_equalsData(x, y){
   return (this.x == x) && (this.y == y);
}

//==========================================================
// <T>接收数据内容。</T>
//
// @method
// @param value:SValue2 二维数据
//==========================================================
MO.SValue2_assign = function SValue2_assign(value){
   this.x = value.x;
   this.y = value.y;
}

//==========================================================
// <T>设置最小数据。</T>
//
// @method
//==========================================================
MO.SValue2_setMin = function SValue2_setMin(){
   this.x = Number.MIN_VALUE;
   this.y = Number.MIN_VALUE;
}

//==========================================================
// <T>设置最大数据。</T>
//
// @method
//==========================================================
MO.SValue2_setMax = function SValue2_setMax(){
   this.x = Number.MAX_VALUE;
   this.y = Number.MAX_VALUE;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
//==========================================================
MO.SValue2_set = function SValue2_set(x, y){
   this.x = x;
   this.y = y;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param value:Number 内容
//==========================================================
MO.SValue2_setAll = function SValue2_set(value){
   this.x = value;
   this.y = value;
}

//==========================================================
// <T>增加数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
//==========================================================
MO.SValue2_add = function SValue2_add(x, y){
   this.x += x;
   this.y += y;
}

//==========================================================
// <T>乘以数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
//==========================================================
MO.SValue2_mul = function SValue2_mul(x, y){
   this.x *= x;
   this.y *= y;
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
MO.SValue2_normalize = function SValue2_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
   }
   return this;
}

//============================================================
// <T>合并最小值。</T>
//
// @method
// @param value:SValue2 二维数据
//============================================================
MO.SValue2_mergeMin = function SValue2_mergeMin(value){
   var o = this;
   o.x = Math.min(o.x, value.x);
   o.y = Math.min(o.y, value.y);
}

//============================================================
// <T>合并最小值。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
//============================================================
MO.SValue2_mergeMin2 = function SValue2_mergeMin2(x, y){
   var o = this;
   o.x = Math.min(o.x, x);
   o.y = Math.min(o.y, y);
}

//============================================================
// <T>合并最大值。</T>
//
// @method
// @param value:SValue2 二维数据
//============================================================
MO.SValue2_mergeMax = function SValue2_mergeMax(value){
   var o = this;
   o.x = Math.max(o.x, value.x);
   o.y = Math.max(o.y, value.y);
}

//============================================================
// <T>合并最大值。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
//============================================================
MO.SValue2_mergeMax2 = function SValue2_mergeMax2(x, y){
   var o = this;
   o.x = Math.max(o.x, x);
   o.y = Math.max(o.y, y);
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Number 长度
//==========================================================
MO.SValue2_length = function SValue2_length(value){
   var cx = this.x - value.x;
   var cy = this.y - value.y;
   return Math.sqrt(cx * cx + cy * cy);
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Number 长度
//==========================================================
MO.SValue2_length2 = function SValue2_length2(x, y){
   var cx = this.x - x;
   var cy = this.y - y;
   return Math.sqrt(cx * cx + cy * cy);
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
MO.SValue2_absolute = function SValue2_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

//============================================================
// <T>获得负数据内容。</T>
//
// @method
// @param value:SValue2 数据内容
// @return SValue2 数据内容
//============================================================
MO.SValue2_negative = function SValue2_negative(value){
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
   return result;
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param value:String 字符串
//============================================================
MO.SValue2_parse = function SValue2_parse(value){
   var items = value.split(',')
   if(items.length == 2){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}

//==========================================================
// <T>获得显示内容。</T>
//
// @return String 字符串
//==========================================================
MO.SValue2_toDisplay = function SValue2_toDisplay(){
   var o = this;
   var x = MO.Lang.Float.format(o.x);
   var y = MO.Lang.Float.format(o.y);
   return x + ',' + y;
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
MO.SValue2_toString = function SValue2_toString(){
   return this.x + ',' + this.y;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SValue2_dispose = function SValue2_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SValue2_unserialize = function SValue2_unserialize(input, dataCd) {
   switch (dataCd) {
      case MO.EDataType.Int32:
         this.x = input.readInt32();
         this.y = input.readInt32();
         break;
      case MO.EDataType.Float:
         this.x = input.readFloat();
         this.y = input.readFloat();
         break;
      case MO.EDataType.Double:
         this.x = input.readDouble();
         this.y = input.readDouble();
         break;
      default:
         break;
   }
}
