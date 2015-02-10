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
function SValue3(x, y, z){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = RRuntime.nvl(x, 0);
   o.y           = RRuntime.nvl(y, 0);
   o.z           = RRuntime.nvl(z, 0);
   //..........................................................
   // @method
   o.assign      = SValue3_assign;
   o.set         = SValue3_set;
   // @method
   o.absolute    = SValue3_absolute;
   o.normalize   = SValue3_normalize;
   o.negative    = SValue3_negative;
   // @method
   o.serialize   = SValue3_serialize;
   o.unserialize = SValue3_unserialize;
   // @method
   o.parse       = SValue3_parse;
   o.toString    = SValue3_toString;
   return o;
}

//==========================================================
// <T>接收数据内容。</T>
//
// @method
// @param p:value:SValue3 三维数据
//==========================================================
function SValue3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param x:Number X分量
// @param y:Number Y分量
// @param z:Number Z分量
//==========================================================
function SValue3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}

//==========================================================
// <T>单位化处理。</T>
//
// @method
//==========================================================
function SValue3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}

//==========================================================
// <T>获得绝对值。</T>
//
// @method
// @return Number 绝对值
//==========================================================
function SValue3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}

//============================================================
// <T>获得负数据内容。</T>
//
// @method
// @param p:value:SValue3 数据内容
// @return SValue3 数据内容
//============================================================
function SValue3_negative(p){
   var o = this;
   // 生成内容
   var r = null;
   if(p){
      r = p;
   }else{
      r = new o.constructor();
   }
   // 设置内容
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SValue3_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SValue3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}

//============================================================
// <T>解析字符串。</T>
//
// @method
// @param p:value:String 字符串
//============================================================
function SValue3_parse(p){
   var o = this;
   var r = p.split(',')
   if(r.length == 3){
      o.x = parseFloat(r[0]);
      o.y = parseFloat(r[1]);
      o.z = parseFloat(r[2]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", p);
   }
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
function SValue3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}
