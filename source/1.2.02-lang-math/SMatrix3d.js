with(MO){
   //==========================================================
   // <T>三维矩阵。</T>
   //
   // @struct
   // @author maocy
   // @version 141231
   //==========================================================
   MO.SMatrix3d = function SMatrix3d(){
      var o = this;
      SMatrix4x4.call(o);
      //..........................................................
      // @attribute
      o._dirty         = false;
      // @attribute
      o.tx             = 0;
      o.ty             = 0;
      o.tz             = 0;
      o.rx             = 0;
      o.ry             = 0;
      o.rz             = 0;
      o.sx             = 1;
      o.sy             = 1;
      o.sz             = 1;
      //..........................................................
      // @method
      o.isIdentity     = SMatrix3d_isIdentity;
      o.identity       = SMatrix3d_identity;
      o.setTranslate   = SMatrix3d_setTranslate;
      o.setRotation    = SMatrix3d_setRotation;
      o.setScale       = SMatrix3d_setScale;
      o.setScaleAll    = SMatrix3d_setScaleAll;
      o.set            = SMatrix3d_set;
      o.setAll         = SMatrix3d_setAll;
      o.equals         = SMatrix3d_equals;
      o.assign         = SMatrix3d_assign;
      o.attach         = SMatrix3d_attach;
      o.append         = SMatrix3d_append;
      o.updateForce    = SMatrix3d_updateForce;
      o.update         = SMatrix3d_update;
      o.merge          = SMatrix3d_merge;
      o.serialize      = SMatrix3d_serialize;
      o.unserialize    = SMatrix3d_unserialize;
      o.saveConfig     = SMatrix3d_saveConfig;
      //..........................................................
      // @construct
      o.identity();
      return o;
   }

   //============================================================
   // <T>是否为单位化数据。</T>
   //
   // @method
   // @return 是否单位化
   //============================================================
   MO.SMatrix3d_isIdentity = function SMatrix3d_isIdentity(){
      var o = this;
      if((o.tx != 0) || (o.ty != 0) || (o.tz != 0)){
         return false;
      }
      if((o.rx != 0) || (o.ry != 0) || (o.rz != 0)){
         return false;
      }
      if((o.sx != 1) || (o.sy != 1) || (o.sz != 1)){
         return false;
      }
      return o.isIdentityData();
   }

   //============================================================
   // <T>单位化处理。</T>
   //
   // @method
   //============================================================
   MO.SMatrix3d_identity = function SMatrix3d_identity(){
      var o = this;
      o.tx = o.ty = o.tz = 0;
      o.rx = o.ry = o.rz = 0;
      o.sx = o.sy = o.sz = 1;
      return o.identityData();
   }

   //============================================================
   // <T>设置平移内容。</T>
   //
   // @method
   // @param x:Float X坐标
   // @param y:Float Y坐标
   // @param z:Float Z坐标
   //============================================================
   MO.SMatrix3d_setTranslate = function SMatrix3d_setTranslate(x, y, z){
      var o = this;
      o.tx = x;
      o.ty = y;
      o.tz = z;
      o._dirty = true;
   }

   //============================================================
   // <T>设置旋转内容。</T>
   //
   // @method
   // @param x:Float X旋转
   // @param y:Float Y旋转
   // @param z:Float Z旋转
   //============================================================
   MO.SMatrix3d_setRotation = function SMatrix3d_setRotation(x, y, z){
      var o = this;
      o.rx = x;
      o.ry = y;
      o.rz = z;
      o._dirty = true;
   }

   //============================================================
   // <T>设置缩放内容。</T>
   //
   // @method
   // @param x:Float X缩放
   // @param y:Float Y缩放
   // @param z:Float Z缩放
   //============================================================
   MO.SMatrix3d_setScale = function SMatrix3d_setScale(x, y, z){
      var o = this;
      o.sx = x;
      o.sy = y;
      o.sz = z;
      o._dirty = true;
   }

   //============================================================
   // <T>设置全部缩放内容。</T>
   //
   // @method
   // @param p:value:Float 缩放
   //============================================================
   MO.SMatrix3d_setScaleAll = function SMatrix3d_setScaleAll(p){
      var o = this;
      o.sz = o.sy = o.sx = p;
      o._dirty = true;
   }

   //============================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param pt:SPoint3 坐标
   // @param pr:SVector3 旋转
   // @param ps:SVector3 缩放
   //============================================================
   MO.SMatrix3d_set = function SMatrix3d_set(pt, pr, ps){
      var o = this;
      o.tx = pt.x;
      o.ty = pt.y;
      o.tz = pt.z;
      o.rx = pr.x;
      o.ry = pr.y;
      o.rz = pr.z;
      o.sx = ps.x;
      o.sy = ps.y;
      o.sz = ps.z;
      o._dirty = true;
   }

   //============================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param ptx:Float X坐标
   // @param pty:Float Y坐标
   // @param ptz:Float Z坐标
   // @param prx:Float X旋转
   // @param pry:Float Y旋转
   // @param prz:Float Z旋转
   // @param psx:Float X缩放
   // @param psy:Float Y缩放
   // @param psz:Float Z缩放
   //============================================================
   MO.SMatrix3d_setAll = function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
      var o = this;
      o.tx = ptx;
      o.ty = pty;
      o.tz = ptz;
      o.rx = prx;
      o.ry = pry;
      o.rz = prz;
      o.sx = psx;
      o.sy = psy;
      o.sz = psz;
      o._dirty = true;
   }

   //============================================================
   // <T>判断是否相等。</T>
   //
   // @method
   // @param p:matrix:SMatrix3d 矩阵
   // @return Boolean 是否相等
   //============================================================
   MO.SMatrix3d_equals = function SMatrix3d_equals(p){
      return this.equalsData(p._data);
   }

   //============================================================
   // <T>接收一个矩阵。</T>
   //
   // @method
   // @param p:matrix:SMatrix3d 矩阵
   //============================================================
   MO.SMatrix3d_assign = function SMatrix3d_assign(p){
      var o = this;
      o.tx = p.tx;
      o.ty = p.ty;
      o.tz = p.tz;
      o.rx = p.rx;
      o.ry = p.ry;
      o.rz = p.rz;
      o.sx = p.sx;
      o.sy = p.sy;
      o.sz = p.sz;
      o.assignData(p._data);
   }

   //============================================================
   // <T>接收一个矩阵，返回是否修改。</T>
   //
   // @method
   // @param p:matrix:SMatrix3d 矩阵
   //============================================================
   MO.SMatrix3d_attach = function SMatrix3d_attach(p){
      var o = this;
      o.tx = p.tx;
      o.ty = p.ty;
      o.tz = p.tz;
      o.rx = p.rx;
      o.ry = p.ry;
      o.rz = p.rz;
      o.sx = p.sx;
      o.sy = p.sy;
      o.sz = p.sz;
      return o.attachData(p._data);
   }

   //============================================================
   // <T>追加一个矩阵。</T>
   //
   // @method
   // @param p:value:SMatrix3d 矩阵
   //============================================================
   MO.SMatrix3d_append = function SMatrix3d_append(p){
      this.appendData(p._data);
   }

   //============================================================
   // <T>强制更新数据。</T>
   //
   // @method
   //============================================================
   MO.SMatrix3d_updateForce = function SMatrix3d_updateForce(){
      var o = this;
      var d = o._data;
      var rsx = Math.sin(o.rx);
      var rcx = Math.cos(o.rx);
      var rsy = Math.sin(o.ry);
      var rcy = Math.cos(o.ry);
      var rsz = Math.sin(o.rz);
      var rcz = Math.cos(o.rz);
      d[ 0] = rcy * rcz * o.sx;
      d[ 1] = rcy * rsz * o.sx;
      d[ 2] = -rsy * o.sx;
      d[ 3] = 0;
      d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o.sy;
      d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o.sy;
      d[ 6] = rsx * rcy * o.sy;
      d[ 7] = 0;
      d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o.sz;
      d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o.sz;
      d[10] = rcx * rcy * o.sz;
      d[11] = 0;
      d[12] = o.tx;
      d[13] = o.ty;
      d[14] = o.tz;
      d[15] = 1;
   }

   //============================================================
   // <T>更新数据。</T>
   //
   // @method
   //============================================================
   MO.SMatrix3d_update = function SMatrix3d_update(){
      var o = this;
      if(o._dirty){
         o.updateForce();
         o._dirty = false;
      }
   }

   //============================================================
   // <T>合并数据。</T>
   //
   // @method
   //============================================================
   MO.SMatrix3d_merge = function SMatrix3d_merge(bm, am){
      var o = this;
      o.tx = bm.tx + am.tx;
      o.ty = bm.ty + am.ty;
      o.tz = bm.tz + am.tz;
      o.rx = bm.rx + am.rx;
      o.ry = bm.ry + am.ry;
      o.rz = bm.rz + am.rz;
      o.sx = bm.sx * am.sx;
      o.sy = bm.sy * am.sy;
      o.sz = bm.sz * am.sz;
      o.updateForce();
   }

   //==========================================================
   // <T>序列化数据到输出流里。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.SMatrix3d_serialize = function SMatrix3d_serialize(p){
      var o = this;
      p.writeFloat(o.tx);
      p.writeFloat(o.ty);
      p.writeFloat(o.tz);
      p.writeFloat(o.rx);
      p.writeFloat(o.ry);
      p.writeFloat(o.rz);
      p.writeFloat(o.sx);
      p.writeFloat(o.sy);
      p.writeFloat(o.sz);
   }

   //==========================================================
   // <T>从输入流里反序列化数据。</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.SMatrix3d_unserialize = function SMatrix3d_unserialize(p){
      var o = this;
      o.tx = p.readFloat();
      o.ty = p.readFloat();
      o.tz = p.readFloat();
      o.rx = p.readFloat();
      o.ry = p.readFloat();
      o.rz = p.readFloat();
      o.sx = p.readFloat();
      o.sy = p.readFloat();
      o.sz = p.readFloat();
      o.updateForce();
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param p:config:TXmlNode 配置节点
   //==========================================================
   MO.SMatrix3d_saveConfig = function SMatrix3d_saveConfig(p){
      var o = this;
      p.set('tx', RFloat.format(o.tx));
      p.set('ty', RFloat.format(o.ty));
      p.set('tz', RFloat.format(o.tz));
      p.set('rx', RFloat.format(o.rx));
      p.set('ry', RFloat.format(o.ry));
      p.set('rz', RFloat.format(o.rz));
      p.set('sx', RFloat.format(o.sx));
      p.set('sy', RFloat.format(o.sy));
      p.set('sz', RFloat.format(o.sz));
   }
}
