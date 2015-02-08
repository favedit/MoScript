//==========================================================
// <T>三维坐标结构。</T>
//
// @struct
// @author maocy
// @version 141230
//==========================================================
function SPoint3(x, y, z){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = RInteger.nvl(x);
   o.y           = RInteger.nvl(y);
   o.z           = RInteger.nvl(z);
   //..........................................................
   // @method
   o.assign      = SPoint3_assign;
   o.set         = SPoint3_set;
   o.conjugate   = SPoint3_conjugate;
   o.resize      = SPoint3_resize;
   o.slerp       = SPoint3_slerp;
   o.serialize   = SPoint3_serialize;
   o.unserialize = SPoint3_unserialize;
   o.toString    = SPoint3_toString;
   o.dump        = SPoint3_dump;
   return o;
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SPoint3 三维坐标
//==========================================================
function SPoint3_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
}

//==========================================================
// <T>设置三维坐标。</T>
//
// @method
// @param x:Integer X坐标
// @param y:Integer Y坐标
// @param z:Integer Z坐标
//==========================================================
function SPoint3_set(x, y, z){
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

//============================================================
// <T>获得反方向。</T>
//
// @method
// @param p:value:SQuaternion 四元数
// @return SQuaternion 四元数
//============================================================
function SPoint3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new SPoint3();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}

//==========================================================
// <T>修改坐标偏移。</T>
// 
//
// @method
// @param x:Integer X坐标
// @param y:Integer Y坐标
// @param z:Integer Z坐标
//==========================================================
function SPoint3_resize(x, y, z){
   var o = this;
   if(x != null){
      o.x += x;
   }
   if(y != null){
      o.y += y;
   }
   if(z != null){
      o.z += z;
   }
}

//==========================================================
// <T>计算插值。</T>
//
// @method
// @param v1:value1:SPoint3 开始坐标
// @param v2:value2:SPoint3 结束坐标
// @param r:rate:Float 比率
//==========================================================
function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SPoint3_serialize(p){
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
function SPoint3_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
function SPoint3_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z;
}

//==========================================================
// <T>获得运行内容。</T>
//
// @method
// @return String 运行内容
//==========================================================
function SPoint3_dump(){
   return RClass.dump(this) + ' [' + this.x + ',' + this.y + ',' + this.z + ']';
}
