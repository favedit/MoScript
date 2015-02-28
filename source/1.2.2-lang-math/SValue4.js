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
   o.x           = RRuntime.nvl(x, 0);
   o.y           = RRuntime.nvl(y, 0);
   o.z           = RRuntime.nvl(z, 0);
   o.w           = RRuntime.nvl(w, 1);
   //..........................................................
   // @method
   o.assign      = SValue4_assign;
   o.set         = SValue4_set;
   // @method
   o.absolute    = SValue4_absolute;
   o.normalize   = SValue4_normalize;
   o.negative    = SValue4_negative;
   // @method
   o.serialize   = SValue4_serialize;
   o.unserialize = SValue4_unserialize;
   // @method
   o.parse       = SValue4_parse;
   o.toString    = SValue4_toString;
   return o;

   //==========================================================
   // <T>接收数据内容。</T>
   //
   // @method
   // @param p:value:SValue4 四维数据
   //==========================================================
   function SValue4_assign(p){
      var o = this;
      o.x = p.x;
      o.y = p.y;
      o.z = p.z;
      o.w = p.w;
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
   function SValue4_set(x, y, z, w){
      var o = this;
      o.x = x;
      o.y = y;
      o.z = z;
      o.w = w;
   }

   //==========================================================
   // <T>获得绝对值。</T>
   //
   // @method
   // @return Number 绝对值
   //==========================================================
   function SValue4_absolute(){
      var o = this;
      return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
   }

   //==========================================================
   // <T>单位化处理。</T>
   //
   // @method
   //==========================================================
   function SValue4_normalize(){
      var o = this;
      var v = o.absolute();
      if(v != 0){
         o.x /= v;
         o.y /= v;
         o.z /= v;
         o.w /= w;
      }
   }

   //============================================================
   // <T>获得负数据内容。</T>
   //
   // @method
   // @param p:value:SValue4 数据内容
   // @return SValue4 数据内容
   //============================================================
   function SValue4_negative(p){
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
      r.w = -o.w;
      return r;
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   function SValue4_serialize(p){
      var o = this;
      p.writeFloat(o.x);
      p.writeFloat(o.y);
      p.writeFloat(o.z);
      p.writeFloat(o.w);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   function SValue4_unserialize(p){
      var o = this;
      o.x = p.readFloat();
      o.y = p.readFloat();
      o.z = p.readFloat();
      o.w = p.readFloat();
   }

   //============================================================
   // <T>解析字符串。</T>
   //
   // @method
   // @param p:value:String 字符串
   //============================================================
   function SValue4_parse(p){
      var o = this;
      var r = p.split(',')
      if(r.length == 4){
         o.x = parseFloat(r[0]);
         o.y = parseFloat(r[1]);
         o.z = parseFloat(r[2]);
         o.w = parseFloat(r[3]);
      }else{
         throw new TError(o, "Parse value failure. (value={1})", p);
      }
   }

   //==========================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //==========================================================
   function SValue4_toString(){
      var o = this;
      return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
   }
}
