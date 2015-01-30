//==========================================================
// <T>四维坐标。</T>
//
// @struct
// @author maocy
// @version 150119
//==========================================================
function SPoint4(x, y, z, w){
   var o = this;
   //..........................................................
   // @attribute
   o.x           = x;
   o.y           = y;
   o.z           = z;
   o.w           = w;
   //..........................................................
   // @method
   o.assign      = SPoint4_assign;
   o.set         = SPoint4_set;
   o.serialize   = SPoint4_serialize;
   o.unserialize = SPoint4_unserialize;
   o.toString    = SPoint4_toString;
   return o;
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SPoint4 三维坐标
//==========================================================
function SPoint4_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}

//==========================================================
// <T>设置三维坐标。</T>
//
// @method
// @param x:Integer X坐标
// @param y:Integer Y坐标
// @param z:Integer Z坐标
// @param w:Integer W坐标
//==========================================================
function SPoint4_set(x, y, z, w){
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
   if(w != null){
      o.w = w;
   }
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SPoint4_serialize(p){
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
function SPoint4_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}

//==========================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//==========================================================
function SPoint4_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
