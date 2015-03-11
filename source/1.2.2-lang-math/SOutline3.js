//==========================================================
// <T>三维轮廓。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SOutline3(){
   var o = this;
   //..........................................................
   // @attribute
   o.min         = new SPoint3();
   o.max         = new SPoint3();
   //..........................................................
   // @method
   o.assign      = SOutline3_assign;
   o.set         = SOutline3_set;
   o.serialize   = SOutline3_serialize
   o.unserialize = SOutline3_unserialize
   o.toString    = SOutline3_toString;
   return o;
}

//============================================================
// <T>接收一个三维轮廓。</T>
//
// @method
// @param p:value:SOutline3 三维轮廓
//============================================================
function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
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
function SOutline3_set(ix, iy, iz, ax, ay, az){
   var o = this;
   o.min.set(ix, iy, iz);
   o.max.set(ax, ay, az);
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SOutline3_serialize(p){
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
function SOutline3_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
function SOutline3_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
