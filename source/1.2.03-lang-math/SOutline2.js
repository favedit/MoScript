//==========================================================
// <T>二维轮廓。</T>
//
// @struct
// @author maocy
// @version 150912
//==========================================================
MO.SOutline2 = function SOutline2(){
   var o = this;
   //..........................................................
   // @attribute
   o.min         = new MO.SPoint2();
   o.max         = new MO.SPoint2();
   //..........................................................
   // @method
   o.isEmpty     = MO.SOutline2_isEmpty;
   // @method
   o.assign      = MO.SOutline2_assign;
   o.setMin      = MO.SOutline2_setMin;
   o.setMax      = MO.SOutline2_setMax;
   o.set         = MO.SOutline2_set;
   // @method
   o.mergeMin    = MO.SOutline2_mergeMin;
   o.mergeMax    = MO.SOutline2_mergeMax;
   o.mergeMax2   = MO.SOutline2_mergeMax2;
   o.mergePoint  = MO.SOutline2_mergePoint;
   // @method
   o.serialize   = MO.SOutline2_serialize;
   o.unserialize = MO.SOutline2_unserialize;
   // @method
   o.toString    = MO.SOutline2_toString;
   return o;
}

//============================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//============================================================
MO.SOutline2_isEmpty = function SOutline2_isEmpty(p){
   var o = this;
   return o.min.isEmpty() && o.max.isEmpty();
}

//============================================================
// <T>接收一个三维轮廓。</T>
//
// @method
// @param p:value:SOutline2 三维轮廓
//============================================================
MO.SOutline2_assign = function SOutline2_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
}

//==========================================================
// <T>设置最小轮廓。</T>
//
// @method
//==========================================================
MO.SOutline2_setMin = function SOutline2_setMin(){
   var o = this;
   o.min.setMax();
   o.max.setMin();
}

//==========================================================
// <T>设置最大轮廓。</T>
//
// @method
//==========================================================
MO.SOutline2_setMax = function SOutline2_setMax(){
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
MO.SOutline2_set = function SOutline2_set(minX, minY, minZ, maxX, maxY, maxZ){
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
MO.SOutline2_mergeMin = function SOutline2_mergeMin(p){
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
MO.SOutline2_mergeMax = function SOutline2_mergeMax(p){
   var o = this;
   o.min.mergeMin(p.min);
   o.max.mergeMax(p.max);
}

//==========================================================
// <T>合并最大轮廓。</T>
//
// @method
// @param x:Number 横坐标
// @param y:Number 纵坐标
//==========================================================
MO.SOutline2_mergeMax2 = function SOutline2_mergeMax2(x, y){
   var o = this;
   o.min.mergeMin2(x, y);
   o.max.mergeMax2(x, y);
}

//==========================================================
// <T>合并点。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
//==========================================================
MO.SOutline2_mergePoint = function SOutline2_mergePoint(x, y, z){
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
MO.SOutline2_serialize = function SOutline2_serialize(p){
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
MO.SOutline2_unserialize = function SOutline2_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SOutline2_toString = function SOutline2_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
