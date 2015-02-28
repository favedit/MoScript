//==========================================================
// <T>三维坐标。</T>
//
// @struct
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
// @author maocy
// @version 141230
//==========================================================
MO.SPoint3 = function SPoint3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   //..........................................................
   // @method
   o.conjugate = SPoint3_conjugate;
   o.resize    = SPoint3_resize;
   o.slerp     = SPoint3_slerp;
   return o;

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
}
