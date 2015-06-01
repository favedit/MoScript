with(MO){
   //==========================================================
   // <T>三维轮廓。</T>
   //
   // @struct
   // @author maocy
   // @version 141231
   //==========================================================
   MO.SOutline3 = function SOutline3(){
      var o = this;
      //..........................................................
      // @attribute
      o.min         = new SPoint3();
      o.max         = new SPoint3();
      //..........................................................
      // @method
      o.isEmpty     = SOutline3_isEmpty;
      o.assign      = SOutline3_assign;
      o.setMin      = SOutline3_setMin;
      o.setMax      = SOutline3_setMax;
      o.set         = SOutline3_set;
      o.mergeMin    = SOutline3_mergeMin;
      o.mergeMax    = SOutline3_mergeMax;
      o.mergePoint  = SOutline3_mergePoint;
      o.serialize   = SOutline3_serialize;
      o.unserialize = SOutline3_unserialize;
      o.toString    = SOutline3_toString;
      return o;
   }

   //============================================================
   // <T>判断是否为空。</T>
   //
   // @method
   // @return Boolean 是否为空
   //============================================================
   MO.SOutline3_isEmpty = function SOutline3_isEmpty(p){
      var o = this;
      return o.min.isEmpty() && o.max.isEmpty();
   }

   //============================================================
   // <T>接收一个三维轮廓。</T>
   //
   // @method
   // @param p:value:SOutline3 三维轮廓
   //============================================================
   MO.SOutline3_assign = function SOutline3_assign(p){
      var o = this;
      o.min.assign(p.min);
      o.max.assign(p.max);
   }

   //==========================================================
   // <T>设置最小轮廓。</T>
   //
   // @method
   //==========================================================
   MO.SOutline3_setMin = function SOutline3_setMin(){
      var o = this;
      o.min.setMax();
      o.max.setMin();
   }

   //==========================================================
   // <T>设置最大轮廓。</T>
   //
   // @method
   //==========================================================
   MO.SOutline3_setMax = function SOutline3_setMax(){
      var o = this;
      o.min.setMin();
      o.max.setMax();
   }

   //==========================================================
   // <T>设置参数。</T>
   //
   // @method
   // @param ix:minX:Number 最小X坐标
   // @param iy:minY:Number 最小Y坐标
   // @param iz:minZ:Number 最小Z坐标
   // @param ax:maxX:Number 最大X坐标
   // @param ay:maxY:Number 最大Y坐标
   // @param az:maxZ:Number 最大Z坐标
   //==========================================================
   MO.SOutline3_set = function SOutline3_set(minX, minY, minZ, maxX, maxY, maxZ){
      var o = this;
      o.min.set(minX, minY, minZ);
      o.max.set(maxX, maxY, maxZ);
   }

   //==========================================================
   // <T>合并最小轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   MO.SOutline3_mergeMin = function SOutline3_mergeMin(p){
      var o = this;
      o.min.mergeMax(p.min);
      o.max.mergeMin(p.max);
   }

   //==========================================================
   // <T>合并最大轮廓。</T>
   //
   // @method
   // @param p:outline:SOutline 轮廓
   //==========================================================
   MO.SOutline3_mergeMax = function SOutline3_mergeMax(p){
      var o = this;
      o.min.mergeMin(p.min);
      o.max.mergeMax(p.max);
   }

   //==========================================================
   // <T>合并点。</T>
   //
   // @method
   // @param x:Number X坐标
   // @param y:Number Y坐标
   // @param z:Number Z坐标
   //==========================================================
   MO.SOutline3_mergePoint = function SOutline3_mergePoint(x, y, z){
      var o = this;
      o.min.mergeMin3(x, y, z);
      o.max.mergeMax3(x, y, z);
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.SOutline3_serialize = function SOutline3_serialize(p){
      var o = this;
      o.min.serialize(p);
      o.max.serialize(p);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.SOutline3_unserialize = function SOutline3_unserialize(p){
      var o = this;
      o.min.unserialize(p);
      o.max.unserialize(p);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   MO.SOutline3_toString = function SOutline3_toString(){
      var o = this;
      return '(' + o.min + ')-(' + o.max + ')';
   }
}
