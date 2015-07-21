MO.EFrustumPlane = new function EFrustumPlane(){
   var o = this;
   o.Near = 0;
   o.Far = 1;
   o.Left = 2;
   o.Right = 3;
   o.Top = 4;
   o.Bottom = 5;
   o.Count = 6;
   return o;
}
MO.SColor4 = function SColor4(red, green, blue, alpha){
   var o = this;
   o.red          = red ? red : 0;
   o.green        = green ? green : 0;
   o.blue         = blue ? blue : 0;
   o.alpha        = alpha ? alpha : 1;
   o.assign       = MO.SColor4_assign;
   o.assignPower  = MO.SColor4_assignPower;
   o.set          = MO.SColor4_set;
   o.setInteger   = MO.SColor4_setInteger;
   o.setIntAlpha  = MO.SColor4_setIntAlpha;
   o.setHex       = MO.SColor4_setHex;
   o.serialize    = MO.SColor4_serialize;
   o.unserialize  = MO.SColor4_unserialize;
   o.unserialize3 = MO.SColor4_unserialize3;
   o.saveConfig   = MO.SColor4_saveConfig;
   o.savePower    = MO.SColor4_savePower;
   o.copyArray    = MO.SColor4_copyArray;
   o.toString     = MO.SColor4_toString;
   return o;
}
MO.SColor4_assign = function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
MO.SColor4_assignPower = function SColor4_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
MO.SColor4_set = function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
MO.SColor4_setInteger = function SColor4_setInteger(value){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = ((value >> 24) & 0xFF) / 255;
}
MO.SColor4_setIntAlpha = function SColor4_setIntAlpha(value, alpha){
   var o = this;
   o.red = ((value >> 16) & 0xFF) / 255;
   o.green = ((value >> 8) & 0xFF) / 255;
   o.blue = (value & 0xFF) / 255;
   o.alpha = alpha;
}
MO.SColor4_setHex = function SColor4_setHex(value){
   var o = this;
   if(value.indexOf('#') == 0){
      value = value.substring(1);
   }
   if(value.indexOf('0x') == 0){
      value = value.substring(2);
   }
   if(value.length == 6){
      o.red = MO.Lang.Hex.parse(value.substring(0, 2)) / 255;
      o.green = MO.Lang.Hex.parse(value.substring(2, 4)) / 255;
      o.blue = MO.Lang.Hex.parse(value.substring(4, 6)) / 255;
   }else{
      throw new MO.TError(o, 'Invalid value.');
   }
}
MO.SColor4_serialize = function SColor4_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
MO.SColor4_unserialize = function SColor4_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
MO.SColor4_unserialize3 = function SColor4_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
MO.SColor4_saveConfig = function SColor4_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
MO.SColor4_savePower = function SColor4_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
MO.SColor4_copyArray = function SColor4_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
MO.SColor4_toString = function SColor4_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}
MO.SCorners = function SCorners(){
   var o = this;
   o.red          = 0;
   o.green        = 0;
   o.blue         = 0;
   o.alpha        = 1;
   o.assign       = MO.SCorners_assign;
   o.assignPower  = MO.SCorners_assignPower;
   o.set          = MO.SCorners_set;
   o.serialize    = MO.SCorners_serialize;
   o.unserialize  = MO.SCorners_unserialize;
   o.unserialize3 = MO.SCorners_unserialize3;
   o.saveConfig   = MO.SCorners_saveConfig;
   o.savePower    = MO.SCorners_savePower;
   o.copyArray    = MO.SCorners_copyArray;
   o.toString     = MO.SCorners_toString;
   return o;
}
MO.SCorners_assign = function SCorners_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
MO.SCorners_assignPower = function SCorners_assignPower(p){
   var o = this;
   o.red = p.red * p.alpha;
   o.green = p.green * p.alpha;
   o.blue = p.blue * p.alpha;
   o.alpha = p.alpha;
}
MO.SCorners_set = function SCorners_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
MO.SCorners_serialize = function SCorners_serialize(p){
   var o = this;
   p.writeFloat(o.red);
   p.writeFloat(o.green);
   p.writeFloat(o.blue);
   p.writeFloat(o.alpha);
}
MO.SCorners_unserialize = function SCorners_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
MO.SCorners_unserialize3 = function SCorners_unserialize3(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = 1.0;
}
MO.SCorners_saveConfig = function SCorners_saveConfig(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('a', o.alpha);
}
MO.SCorners_savePower = function SCorners_savePower(p){
   var o = this;
   p.setFloat('r', o.red);
   p.setFloat('g', o.green);
   p.setFloat('b', o.blue);
   p.setFloat('power', o.alpha);
}
MO.SCorners_copyArray = function SCorners_copyArray(d, i){
   var o = this;
   d[i++] = o.red;
   d[i++] = o.green;
   d[i++] = o.blue;
   d[i++] = o.alpha;
   return 4;
}
MO.SCorners_toString = function SCorners_toString(){
   var o = this;
   return MO.Lang.Float.format(o.red) + ',' + MO.Lang.Float.format(o.green) + ',' + MO.Lang.Float.format(o.blue) + ',' + MO.Lang.Float.format(o.alpha);
}
MO.SFrustum = function SFrustum(){
   var o = this;
   o.center       = new MO.SPoint3();
   o.radius       = null;
   o.minX         = null;
   o.maxX         = null;
   o.minY         = null;
   o.maxY         = null;
   o.minZ         = null;
   o.maxZ         = null;
   o.points       = new Array(24);
   o.coners       = new Array(24);
   o.updateCenter = MO.SFrustum_updateCenter;
   o.update       = MO.SFrustum_update;
   o.updateFlat   = MO.SFrustum_updateFlat;
   return o;
}
MO.SFrustum_updateCenter = function SFrustum_updateCenter(){
   var o = this;
   var cs = o.coners;
   o.minX = o.minY = o.minZ = Number.MAX_VALUE;
   o.maxX = o.maxY = o.maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = cs[i++];
      if(x < o.minX){
         o.minX = x;
      }
      if(x > o.maxX){
         o.maxX = x;
      }
      var y = cs[i++];
      if(y < o.minY){
         o.minY = y;
      }
      if(y > o.maxY){
         o.maxY = y;
      }
      var z = cs[i++];
      if(z < o.minZ){
         o.minZ = z;
      }
      if(z > o.maxZ){
         o.maxZ = z;
      }
   }
   o.center.x = (o.minX + o.maxX) * 0.5;
   o.center.y = (o.minY + o.maxY) * 0.5;
   o.center.z = (o.minZ + o.maxZ) * 0.5;
   var cx = o.maxX - o.minX;
   var cy = o.maxY - o.minY;
   var cz = o.maxZ - o.minZ;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SFrustum_update = function SFrustum_update(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn;
   var zfar = pvf;
   var fov = Math.tan(MO.Const.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var matrix = MO.Lang.Math.matrix;
   matrix.assign(pm);
   matrix.invert();
   matrix.transform(o.coners, ps, 8);
   o.updateCenter();
}
MO.SFrustum_updateFlat = function SFrustum_updateFlat(pva, pvw, pvh, pvn, pvf, pfr, pbr, pm){
   var o = this;
   var aspect = pvw / pvh;
   var znear = pvn * pbr;
   var zfar = pvf * pfr;
   var fov = Math.tan(MO.Const.DEGREE_RATE * pva * 0.5);
   var nearY = znear * fov;
   var nearX = nearY * aspect;
   var farY = zfar * fov;
   var farX = farY * aspect;
   var ps = o.points;
   ps[ 0] = -nearX;
   ps[ 1] =  nearY;
   ps[ 2] =  znear;
   ps[ 3] =  nearX;
   ps[ 4] =  nearY;
   ps[ 5] =  znear;
   ps[ 6] =  nearX;
   ps[ 7] = -nearY;
   ps[ 8] =  znear;
   ps[ 9] = -nearX;
   ps[10] = -nearY;
   ps[11] =  znear;
   ps[12] = -farX;
   ps[13] =  farY;
   ps[14] =  zfar;
   ps[15] =  farX;
   ps[16] =  farY;
   ps[17] =  zfar;
   ps[18] =  farX;
   ps[19] = -farY;
   ps[20] =  zfar;
   ps[21] = -farX;
   ps[22] = -farY;
   ps[23] =  zfar;
   var m = MO.Lang.Math.matrix;
   m.assign(pm);
   m.invert();
   m.transform(o.coners, 0, ps, 0, 8);
   o.coners[ 1] = 0.0;
   o.coners[ 4] = 0.0;
   o.coners[ 7] = 0.0;
   o.coners[10] = 0.0;
   o.coners[13] = 0.0;
   o.coners[16] = 0.0;
   o.coners[19] = 0.0;
   o.coners[22] = 0.0;
   o.updateCenter();
}
MO.SFrustumPlanes = function SFrustumPlanes(){
   var o = this;
   o.planes            = new Array();
   o.containsPoint     = MO.SFrustumPlanes_containsPoint;
   o.containsCube      = MO.SFrustumPlanes_containsCube;
   o.containsRectangle = MO.SFrustumPlanes_containsRectangle;
   o.containsCorners   = MO.SFrustumPlanes_containsCorners;
   o.containsSphere    = MO.SFrustumPlanes_containsSphere;
   o.updateVision      = MO.SFrustumPlanes_updateVision;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      o.planes.push(new MO.SPlane());
   }
   return o;
}
MO.SFrustumPlanes_containsPoint = function SFrustumPlanes_containsPoint(x, y, z){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      if(ps[n].dot(x, y, z) < 0){
         return false;
      }
   }
   return true;
}
MO.SFrustumPlanes_containsCube = function SFrustumPlanes_containsCube(cx, cy, cz, size){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz - l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy - l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx - l, cy + l, cz + l) >= 0){
         continue;
      }
      if(p.dot(cx + l, cy + l, cz + l) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsRectangle = function SFrustumPlanes_containsRectangle(cx, cy, cz, sx, sy, sz){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      var p = ps[n];
      if(p.dot(cx - sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz - sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy - sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx - sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      if(p.dot(cx + sx, cy + sy, cz + sz) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsCorners = function SFrustumPlanes_containsCorners(p){
   var o = this;
   var s = o.planes;
   for(var i = MO.EFrustumPlane.Count - 1; i >= 0; i--){
      var l = s[i];
      if(l.dot(p[ 0], p[ 1], p[ 2]) >= 0){
         continue;
      }
      if(l.dot(p[ 3], p[ 4], p[ 5]) >= 0){
         continue;
      }
      if(l.dot(p[ 6], p[ 7], p[ 8]) >= 0){
         continue;
      }
      if(l.dot(p[ 9], p[10], p[11]) >= 0){
         continue;
      }
      if(l.dot(p[12], p[13], p[14]) >= 0){
         continue;
      }
      if(l.dot(p[15], p[16], p[17]) >= 0){
         continue;
      }
      if(l.dot(p[18], p[19], p[20]) >= 0){
         continue;
      }
      if(l.dot(p[21], p[22], p[23]) >= 0){
         continue;
      }
      return false;
   }
   return true;
}
MO.SFrustumPlanes_containsSphere = function SFrustumPlanes_containsSphere(px, py, pz, pr){
   var o = this;
   var ps = o.planes;
   for(var i = 0; i < MO.EFrustumPlane.Count; i++){
      if(ps[n].dot(px, py, pz) < -pr){
         return false;
      }
   }
   return true;
}
MO.SFrustumPlanes_updateVision = function SFrustumPlanes_updateVision(p){
   var o = this;
   var ps = o.planes;
   var pn = ps[MO.EFrustumPlane.Near];
   pn.a = p[ 0 + 3] + p[ 0 + 2];
   pn.b = p[ 4 + 3] + p[ 4 + 2];
   pn.c = p[ 8 + 3] + p[ 8 + 2];
   pn.d = p[12 + 3] + p[12 + 2];
   pn.normalize();
   var pf = ps[MO.EFrustumPlane.Far];
   pf.a = p[ 0 + 3] - p[ 0 + 2];
   pf.b = p[ 4 + 3] - p[ 4 + 2];
   pf.c = p[ 8 + 3] - p[ 8 + 2];
   pf.d = p[12 + 3] - p[12 + 2];
   pf.normalize();
   var pl = ps[MO.EFrustumPlane.Left];
   pl.a = p[ 0 + 3] - p[ 0 + 0];
   pl.b = p[ 4 + 3] - p[ 4 + 0];
   pl.c = p[ 8 + 3] - p[ 8 + 0];
   pl.d = p[12 + 3] - p[12 + 0];
   pl.normalize();
   var pr = ps[MO.EFrustumPlane.Right];
   pr.a = p[ 0 + 3] + p[ 0 + 0];
   pr.b = p[ 4 + 3] + p[ 4 + 0];
   pr.c = p[ 8 + 3] + p[ 8 + 0];
   pr.d = p[12 + 3] + p[12 + 0];
   pr.normalize();
   var pt = ps[MO.EFrustumPlane.Top];
   pt.a = p[ 0 + 3] - p[ 0 + 1];
   pt.b = p[ 4 + 3] - p[ 4 + 1];
   pt.c = p[ 8 + 3] - p[ 8 + 1];
   pt.d = p[12 + 3] - p[12 + 1];
   pt.normalize();
   var pb = ps[MO.EFrustumPlane.Bottom];
   pb.a = p[ 0 + 3] + p[ 0 + 1];
   pb.b = p[ 4 + 3] + p[ 4 + 1];
   pb.c = p[ 8 + 3] + p[ 8 + 1];
   pb.d = p[12 + 3] + p[12 + 1];
   pb.normalize();
}
MO.SMatrix3d = function SMatrix3d(){
   var o = this;
   MO.SMatrix4x4.call(o);
   o._dirty         = false;
   o.tx             = 0;
   o.ty             = 0;
   o.tz             = 0;
   o.rx             = 0;
   o.ry             = 0;
   o.rz             = 0;
   o.sx             = 1;
   o.sy             = 1;
   o.sz             = 1;
   o.isIdentity     = MO.SMatrix3d_isIdentity;
   o.identity       = MO.SMatrix3d_identity;
   o.setTranslate   = MO.SMatrix3d_setTranslate;
   o.setRotation    = MO.SMatrix3d_setRotation;
   o.setScale       = MO.SMatrix3d_setScale;
   o.setScaleAll    = MO.SMatrix3d_setScaleAll;
   o.set            = MO.SMatrix3d_set;
   o.setAll         = MO.SMatrix3d_setAll;
   o.equals         = MO.SMatrix3d_equals;
   o.assign         = MO.SMatrix3d_assign;
   o.attach         = MO.SMatrix3d_attach;
   o.append         = MO.SMatrix3d_append;
   o.updateForce    = MO.SMatrix3d_updateForce;
   o.update         = MO.SMatrix3d_update;
   o.merge          = MO.SMatrix3d_merge;
   o.serialize      = MO.SMatrix3d_serialize;
   o.unserialize    = MO.SMatrix3d_unserialize;
   o.saveConfig     = MO.SMatrix3d_saveConfig;
   o.identity();
   return o;
}
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
MO.SMatrix3d_identity = function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   return o.identityData();
}
MO.SMatrix3d_setTranslate = function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}
MO.SMatrix3d_setRotation = function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}
MO.SMatrix3d_setScale = function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}
MO.SMatrix3d_setScaleAll = function SMatrix3d_setScaleAll(p){
   var o = this;
   o.sz = o.sy = o.sx = p;
   o._dirty = true;
}
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
MO.SMatrix3d_equals = function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}
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
MO.SMatrix3d_append = function SMatrix3d_append(p){
   this.appendData(p._data);
}
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
MO.SMatrix3d_update = function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}
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
MO.SMatrix3d_saveConfig = function SMatrix3d_saveConfig(p){
   var o = this;
   p.set('tx', MO.Lang.Float.format(o.tx));
   p.set('ty', MO.Lang.Float.format(o.ty));
   p.set('tz', MO.Lang.Float.format(o.tz));
   p.set('rx', MO.Lang.Float.format(o.rx));
   p.set('ry', MO.Lang.Float.format(o.ry));
   p.set('rz', MO.Lang.Float.format(o.rz));
   p.set('sx', MO.Lang.Float.format(o.sx));
   p.set('sy', MO.Lang.Float.format(o.sy));
   p.set('sz', MO.Lang.Float.format(o.sz));
}
MO.SMatrix3x3 = function SMatrix3x3(){
   var o = this;
   o._data           = new Array(9);
   o.data            = MO.SMatrix3x3_data;
   o.equalsData      = MO.SMatrix3x3_equalsData;
   o.assignData      = MO.SMatrix3x3_assignData;
   o.appendData      = MO.SMatrix3x3_appendData;
   o.rotationX       = MO.SMatrix3x3_rotationX;
   o.rotationY       = MO.SMatrix3x3_rotationY;
   o.rotationZ       = MO.SMatrix3x3_rotationZ;
   o.rotation        = MO.SMatrix3x3_rotation;
   o.invert          = MO.SMatrix3x3_invert;
   o.transform       = MO.SMatrix3x3_transform;
   o.transformPoint3 = MO.SMatrix3x3_transformPoint3;
   o.build           = MO.SMatrix3x3_build;
   o.writeData       = MO.SMatrix3x3_writeData;
   o.toString        = MO.SMatrix3x3_toString;
   return o;
}
MO.SMatrix3x3_data = function SMatrix3x3_data(){
   return this._data;
}
MO.SMatrix3x3_equalsData = function SMatrix3x3_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 9; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix3x3_assignData = function SMatrix3x3_assignData(p){
   var d = this._data;
   for(var n = 0; n < 9; n++){
      d[n] = p[n];
   }
}
MO.SMatrix3x3_appendData = function SMatrix3x3_appendData(p){
   var d = this._data;
   var v0 = (d[0] * p[0]) + (d[1] * p[3]) + (d[2] * p[6]);
   var v1 = (d[0] * p[1]) + (d[1] * p[4]) + (d[2] * p[7]);
   var v2 = (d[0] * p[2]) + (d[1] * p[5]) + (d[2] * p[8]);
   var v3 = (d[3] * p[0]) + (d[4] * p[3]) + (d[5] * p[6]);
   var v4 = (d[3] * p[1]) + (d[4] * p[4]) + (d[5] * p[7]);
   var v5 = (d[3] * p[2]) + (d[4] * p[5]) + (d[5] * p[8]);
   var v6 = (d[6] * p[0]) + (d[7] * p[3]) + (d[8] * p[6]);
   var v7 = (d[6] * p[1]) + (d[7] * p[4]) + (d[8] * p[7]);
   var v8 = (d[6] * p[2]) + (d[7] * p[5]) + (d[8] * p[8]);
   d[0] = v0;
   d[1] = v1;
   d[2] = v2;
   d[3] = v3;
   d[4] = v4;
   d[5] = v5;
   d[6] = v6;
   d[7] = v7;
   d[8] = v8;
}
MO.SMatrix3x3_rotationX = function SMatrix3x3_rotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Math.value9;
   v[0] = 1;
   v[1] = 0;
   v[2] = 0;
   v[3] = 0;
   v[4] = rc;
   v[5] = rs;
   v[6] = 0;
   v[7] = -rs;
   v[8] = rc;
   this.appendData(v);
}
MO.SMatrix3x3_rotationY = function SMatrix3x3_rotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.value9;
   v[0] = rc;
   v[1] = 0;
   v[2] = rs;
   v[3] = 0;
   v[4] = 1;
   v[5] = 0;
   v[6] = -rs;
   v[7] = 0;
   v[8] = rc;
   this.appendData(v);
}
MO.SMatrix3x3_rotationZ = function SMatrix3x3_rotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = RMath.value9;
   v[0] = rc;
   v[1] = rs;
   v[2] = 0;
   v[3] = -rs;
   v[4] = rc;
   v[5] = 1;
   v[6] = 0;
   v[7] = 0;
   v[8] = 1;
   this.appendData(v);
}
MO.SMatrix3x3_rotation = function SMatrix3x3_rotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = RMath.value9;
   v[0] = rcy * rcz;
   v[1] = rcy * rsz;
   v[2] = -rsy;
   v[3] = rsx * rsy * rcz - rcx * rsz;
   v[4] = rsx * rsy * rsz + rcx * rcz;
   v[5] = rsx * rcy;
   v[6] = rcx * rsy * rcz + rsx * rsz;
   v[7] = rcx * rsy * rsz - rsx * rcx;
   v[8] = rcx * rcy;
   this.appendData(v);
}
MO.SMatrix3x3_invert = function SMatrix3x3_invert(){
   var o = this;
   var d = o._data;
   var v = RValue.value9;
   v[0] = (d[4] * d[8]) - (d[5] * d[7]);
   v[1] = (d[2] * d[7]) - (d[1] * d[8]);
   v[2] = (d[1] * d[5]) - (d[2] * d[4]);
   v[3] = (d[5] * d[6]) - (d[3] * d[8]);
   v[4] = (d[0] * d[8]) - (d[2] * d[6]);
   v[5] = (d[2] * d[3]) - (d[0] * d[5]);
   v[6] = (d[3] * d[7]) - (d[4] * d[6]);
   v[7] = (d[1] * d[6]) - (d[0] * d[7]);
   v[8] = (d[0] * d[4]) - (d[1] * d[3]);
   var r = (d[0] * v[0]) + (d[1] * v[3]) + (d[2] * v[6]);
   if(r == 0){
      return false;
   }
   r = 1 / r;
   for(var i = 0; i < 9; i++){
      d[i] = v[i] * r;
   }
   return true;
}
MO.SMatrix3x3_transform = function SMatrix3x3_transform(po, pi, pc){
   var d = this._data;
   for(var i = 0; i < pc; i++){
      var n = (i << 1) + i;
      po[n    ] = (pi[n] * d[0]) + (pi[n + 1] * d[3]) +(pi[n + 2] * d[6]);
      po[n + 1] = (pi[n] * d[1]) + (pi[n + 1] * d[4]) +(pi[n + 2] * d[7]);
      po[n + 2] = (pi[n] * d[2]) + (pi[n + 1] * d[5]) +(pi[n + 2] * d[8]);
   }
}
MO.SMatrix3x3_transformPoint3 = function SMatrix3x3_transformPoint3(pi, po){
   var d = this._data;
   var x = (pi.x * d[0]) + (pi.y * d[3]) +(pi.z * d[6]);
   var y = (pi.x * d[1]) + (pi.y * d[4]) +(pi.z * d[7]);
   var z = (pi.x * d[2]) + (pi.y * d[5]) +(pi.z * d[8]);
   var r = null;
   if(po){
      r = po;
   }else{
      r = new SPoint3();
   }
   r.set(x, y, z);
   return r;
}
MO.SMatrix3x3_build = function SMatrix3x3_build(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[0] = 1 - 2 * (y2 + z2);
   d[1] = 2 * (xy - wz);
   d[2] = 2 * (xz + wy);
   d[3] = 2 * (xy + wz);
   d[4] = 1 - 2 * (x2 + z2);
   d[5] = 2 * (yz - wx);
   d[6] = 2 * (xz - wy);
   d[7] = 2 * (yz + wx);
   d[8] = 1 - 2 * (x2 + y2);
}
MO.SMatrix3x3_writeData = function SMatrix3x3_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[0];
   d[i++] = pd[3];
   d[i++] = pd[6];
   d[i++] = pd[1];
   d[i++] = pd[4];
   d[i++] = pd[7];
   d[i++] = pd[2];
   d[i++] = pd[5];
   d[i++] = pd[8];
}
MO.SMatrix3x3_toString = function SMatrix3x3_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 3; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 3; x++){
         var i = y * 3 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
MO.SMatrix4x4 = function SMatrix4x4(){
   var o = this;
   o._data           = new Array(16);
   o.data            = MO.SMatrix4x4_data;
   o.isIdentityData  = MO.SMatrix4x4_isIdentityData;
   o.identityData    = MO.SMatrix4x4_identityData;
   o.equalsData      = MO.SMatrix4x4_equalsData;
   o.assignData      = MO.SMatrix4x4_assignData;
   o.attachData      = MO.SMatrix4x4_attachData;
   o.appendData      = MO.SMatrix4x4_appendData;
   o.addTranslate    = MO.SMatrix4x4_addTranslate;
   o.addRotationX    = MO.SMatrix4x4_addRotationX;
   o.addRotationY    = MO.SMatrix4x4_addRotationY;
   o.addRotationZ    = MO.SMatrix4x4_addRotationZ;
   o.addRotation     = MO.SMatrix4x4_addRotation;
   o.addScale        = MO.SMatrix4x4_addScale;
   o.invert          = MO.SMatrix4x4_invert;
   o.transform       = MO.SMatrix4x4_transform;
   o.transformPoint3 = MO.SMatrix4x4_transformPoint3;
   o.buildQuaternion = MO.SMatrix4x4_buildQuaternion;
   o.build           = MO.SMatrix4x4_build;
   o.writeData       = MO.SMatrix4x4_writeData;
   o.writeData4x3    = MO.SMatrix4x4_writeData4x3;
   o.toString        = MO.SMatrix4x4_toString;
   return o;
}
MO.SMatrix4x4_data = function SMatrix4x4_data(){
   return this._data;
}
MO.SMatrix4x4_isIdentityData = function SMatrix4x4_isIdentityData(){
   var d = this._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      if(d[i] != v[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix4x4_identityData = function SMatrix4x4_identityData(){
   var o = this;
   var d = o._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      d[i] = v[i];
   }
   return o;
}
MO.SMatrix4x4_equalsData = function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}
MO.SMatrix4x4_assignData = function SMatrix4x4_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}
MO.SMatrix4x4_attachData = function SMatrix4x4_attachData(p){
   var r = false;
   var d = this._data;
   for(var i = 0; i < 16; i++){
      var v = p[i];
      if(!r){
         if(d[i] != v){
            r = true;
         }
      }
      d[i] = v;
   }
   return r;
}
MO.SMatrix4x4_appendData = function SMatrix4x4_appendData(p){
   var d = this._data;
   var v00 = (d[ 0] * p[0]) + (d[ 1] * p[4]) + (d[ 2] * p[ 8]) + (d[ 3] * p[12]);
   var v01 = (d[ 0] * p[1]) + (d[ 1] * p[5]) + (d[ 2] * p[ 9]) + (d[ 3] * p[13]);
   var v02 = (d[ 0] * p[2]) + (d[ 1] * p[6]) + (d[ 2] * p[10]) + (d[ 3] * p[14]);
   var v03 = (d[ 0] * p[3]) + (d[ 1] * p[7]) + (d[ 2] * p[11]) + (d[ 3] * p[15]);
   var v04 = (d[ 4] * p[0]) + (d[ 5] * p[4]) + (d[ 6] * p[ 8]) + (d[ 7] * p[12]);
   var v05 = (d[ 4] * p[1]) + (d[ 5] * p[5]) + (d[ 6] * p[ 9]) + (d[ 7] * p[13]);
   var v06 = (d[ 4] * p[2]) + (d[ 5] * p[6]) + (d[ 6] * p[10]) + (d[ 7] * p[14]);
   var v07 = (d[ 4] * p[3]) + (d[ 5] * p[7]) + (d[ 6] * p[11]) + (d[ 7] * p[15]);
   var v08 = (d[ 8] * p[0]) + (d[ 9] * p[4]) + (d[10] * p[ 8]) + (d[11] * p[12]);
   var v09 = (d[ 8] * p[1]) + (d[ 9] * p[5]) + (d[10] * p[ 9]) + (d[11] * p[13]);
   var v10 = (d[ 8] * p[2]) + (d[ 9] * p[6]) + (d[10] * p[10]) + (d[11] * p[14]);
   var v11 = (d[ 8] * p[3]) + (d[ 9] * p[7]) + (d[10] * p[11]) + (d[11] * p[15]);
   var v12 = (d[12] * p[0]) + (d[13] * p[4]) + (d[14] * p[ 8]) + (d[15] * p[12]);
   var v13 = (d[12] * p[1]) + (d[13] * p[5]) + (d[14] * p[ 9]) + (d[15] * p[13]);
   var v14 = (d[12] * p[2]) + (d[13] * p[6]) + (d[14] * p[10]) + (d[15] * p[14]);
   var v15 = (d[12] * p[3]) + (d[13] * p[7]) + (d[14] * p[11]) + (d[15] * p[15]);
   d[ 0] = v00;
   d[ 1] = v01;
   d[ 2] = v02;
   d[ 3] = v03;
   d[ 4] = v04;
   d[ 5] = v05;
   d[ 6] = v06;
   d[ 7] = v07;
   d[ 8] = v08;
   d[ 9] = v09;
   d[10] = v10;
   d[11] = v11;
   d[12] = v12;
   d[13] = v13;
   d[14] = v14;
   d[15] = v15;
}
MO.SMatrix4x4_addTranslate = function SMatrix4x4_addTranslate(x, y, z){
   var v = MO.Lang.Array.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = x;
   v[13] = y;
   v[14] = z;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationX = function SMatrix4x4_addRotationX(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = rc;
   v[ 6] = rs;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = -rs;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationY = function SMatrix4x4_addRotationY(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = rc;
   v[ 1] = 0;
   v[ 2] = rs;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = -rs;
   v[ 9] = 0;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotationZ = function SMatrix4x4_addRotationZ(p){
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   var v = MO.Lang.Array.array16;
   v[ 0] = rc;
   v[ 1] = rs;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = -rs;
   v[ 5] = rc;
   v[ 6] = 1;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addRotation = function SMatrix4x4_addRotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var v = MO.Lang.Array.array16;
   v[ 0] = rcy * rcz;
   v[ 1] = rcy * rsz;
   v[ 2] = -rsy;
   v[ 3] = 0;
   v[ 4] = rsx * rsy * rcz - rcx * rsz;
   v[ 5] = rsx * rsy * rsz + rcx * rcz;
   v[ 6] = rsx * rcy;
   v[ 7] = 0;
   v[ 8] = rcx * rsy * rcz + rsx * rsz;
   v[ 9] = rcx * rsy * rsz - rsx * rcx;
   v[10] = rcx * rcy;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_addScale = function SMatrix4x4_addScale(x, y, z){
   var v = MO.Lang.Array.array16;
   v[ 0] = x;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = y;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = z;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}
MO.SMatrix4x4_invert = function SMatrix4x4_invert(){
   var o = this;
   var d = o._data;
   var v = MO.Lang.Array.array16;
   v[ 0] =  (d[ 5] * d[10] * d[15]) - (d[ 5] * d[11] * d[14]) - (d[ 9] * d[ 6] * d[15]) + (d[ 9] * d[ 7] * d[14]) + (d[13] * d[ 6] * d[11]) - (d[13] * d[ 7] * d[10]);
   v[ 4] = -(d[ 4] * d[10] * d[15]) + (d[ 4] * d[11] * d[14]) + (d[ 8] * d[ 6] * d[15]) - (d[ 8] * d[ 7] * d[14]) - (d[12] * d[ 6] * d[11]) + (d[12] * d[ 7] * d[10]);
   v[ 8] =  (d[ 4] * d[ 9] * d[15]) - (d[ 4] * d[11] * d[13]) - (d[ 8] * d[ 5] * d[15]) + (d[ 8] * d[ 7] * d[13]) + (d[12] * d[ 5] * d[11]) - (d[12] * d[ 7] * d[ 9]);
   v[12] = -(d[ 4] * d[ 9] * d[14]) + (d[ 4] * d[10] * d[13]) + (d[ 8] * d[ 5] * d[14]) - (d[ 8] * d[ 6] * d[13]) - (d[12] * d[ 5] * d[10]) + (d[12] * d[ 6] * d[ 9]);
   v[ 1] = -(d[ 1] * d[10] * d[15]) + (d[ 1] * d[11] * d[14]) + (d[ 9] * d[ 2] * d[15]) - (d[ 9] * d[ 3] * d[14]) - (d[13] * d[ 2] * d[11]) + (d[13] * d[ 3] * d[10]);
   v[ 5] =  (d[ 0] * d[10] * d[15]) - (d[ 0] * d[11] * d[14]) - (d[ 8] * d[ 2] * d[15]) + (d[ 8] * d[ 3] * d[14]) + (d[12] * d[ 2] * d[11]) - (d[12] * d[ 3] * d[10]);
   v[ 9] = -(d[ 0] * d[ 9] * d[15]) + (d[ 0] * d[11] * d[13]) + (d[ 8] * d[ 1] * d[15]) - (d[ 8] * d[ 3] * d[13]) - (d[12] * d[ 1] * d[11]) + (d[12] * d[ 3] * d[ 9]);
   v[13] =  (d[ 0] * d[ 9] * d[14]) - (d[ 0] * d[10] * d[13]) - (d[ 8] * d[ 1] * d[14]) + (d[ 8] * d[ 2] * d[13]) + (d[12] * d[ 1] * d[10]) - (d[12] * d[ 2] * d[ 9]);
   v[ 2] =  (d[ 1] * d[ 6] * d[15]) - (d[ 1] * d[ 7] * d[14]) - (d[ 5] * d[ 2] * d[15]) + (d[ 5] * d[ 3] * d[14]) + (d[13] * d[ 2] * d[ 7]) - (d[13] * d[ 3] * d[ 6]);
   v[ 6] = -(d[ 0] * d[ 6] * d[15]) + (d[ 0] * d[ 7] * d[14]) + (d[ 4] * d[ 2] * d[15]) - (d[ 4] * d[ 3] * d[14]) - (d[12] * d[ 2] * d[ 7]) + (d[12] * d[ 3] * d[ 6]);
   v[10] =  (d[ 0] * d[ 5] * d[15]) - (d[ 0] * d[ 7] * d[13]) - (d[ 4] * d[ 1] * d[15]) + (d[ 4] * d[ 3] * d[13]) + (d[12] * d[ 1] * d[ 7]) - (d[12] * d[ 3] * d[ 5]);
   v[14] = -(d[ 0] * d[ 5] * d[14]) + (d[ 0] * d[ 6] * d[13]) + (d[ 4] * d[ 1] * d[14]) - (d[ 4] * d[ 2] * d[13]) - (d[12] * d[ 1] * d[ 6]) + (d[12] * d[ 2] * d[ 5]);
   v[ 3] = -(d[ 1] * d[ 6] * d[11]) + (d[ 1] * d[ 7] * d[10]) + (d[ 5] * d[ 2] * d[11]) - (d[ 5] * d[ 3] * d[10]) - (d[ 9] * d[ 2] * d[ 7]) + (d[ 9] * d[ 3] * d[ 6]);
   v[ 7] =  (d[ 0] * d[ 6] * d[11]) - (d[ 0] * d[ 7] * d[10]) - (d[ 4] * d[ 2] * d[11]) + (d[ 4] * d[ 3] * d[10]) + (d[ 8] * d[ 2] * d[ 7]) - (d[ 8] * d[ 3] * d[ 6]);
   v[11] = -(d[ 0] * d[ 5] * d[11]) + (d[ 0] * d[ 7] * d[ 9]) + (d[ 4] * d[ 1] * d[11]) - (d[ 4] * d[ 3] * d[ 9]) - (d[ 8] * d[ 1] * d[ 7]) + (d[ 8] * d[ 3] * d[ 5]);
   v[15] =  (d[ 0] * d[ 5] * d[10]) - (d[ 0] * d[ 6] * d[ 9]) - (d[ 4] * d[ 1] * d[10]) + (d[ 4] * d[ 2] * d[ 9]) + (d[ 8] * d[ 1] * d[ 6]) - (d[ 8] * d[ 2] * d[ 5]);
   var r = d[ 0] * v[ 0] + d[ 1] * v[ 4] + d[ 2] * v[ 8] + d[ 3] * v[12];
   if(r == 0){
     return false;
   }
   r = 1 / r;
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}
MO.SMatrix4x4_transform = function SMatrix4x4_transform(outputData, outputIndex, inputData, inputIndex, count){
   var data = this._data;
   for(var i = 0; i < count; i++){
      var x = inputData[inputIndex++];
      var y = inputData[inputIndex++];
      var z = inputData[inputIndex++];
      outputData[outputIndex++] = (x * data[ 0]) + (y * data[ 4]) +(z * data[ 8]) + data[12];
      outputData[outputIndex++] = (x * data[ 1]) + (y * data[ 5]) +(z * data[ 9]) + data[13];
      outputData[outputIndex++] = (x * data[ 2]) + (y * data[ 6]) +(z * data[10]) + data[14];
   }
}
MO.SMatrix4x4_transformPoint3 = function SMatrix4x4_transformPoint3(input, output){
   var data = this._data;
   var x = (input.x * data[ 0]) + (input.y * data[ 4]) +(input.z * data[ 8]) + data[12];
   var y = (input.x * data[ 1]) + (input.y * data[ 5]) +(input.z * data[ 9]) + data[13];
   var z = (input.x * data[ 2]) + (input.y * data[ 6]) +(input.z * data[10]) + data[14];
   var result = null;
   if(output){
      result = output;
   }else{
      result = new MO.SPoint3();
   }
   result.set(x, y, z);
   return result;
}
MO.SMatrix4x4_build = function SMatrix4x4_build(t, r, s){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = (1 - 2 * (y2 + z2)) * s.x;
   d[ 1] = 2 * (xy - wz) * s.x;
   d[ 2] = 2 * (xz + wy) * s.x;
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz) * s.y;
   d[ 5] = (1 - 2 * (x2 + z2)) * s.y;
   d[ 6] = 2 * (yz - wx) * s.y;
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy) * s.z;
   d[ 9] = 2 * (yz + wx) * s.z;
   d[10] = (1 - 2 * (x2 + y2)) * s.z;
   d[11] = 0;
   d[12] = t.x;
   d[13] = t.y;
   d[14] = t.z;
   d[15] = 1;
}
MO.SMatrix4x4_buildQuaternion = function SMatrix4x4_buildQuaternion(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[ 0] = 1 - 2 * (y2 + z2);
   d[ 1] = 2 * (xy - wz);
   d[ 2] = 2 * (xz + wy);
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz);
   d[ 5] = 1 - 2 * (x2 + z2);
   d[ 6] = 2 * (yz - wx);
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy);
   d[ 9] = 2 * (yz + wx);
   d[10] = 1 - 2 * (x2 + y2);
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
}
MO.SMatrix4x4_writeData = function SMatrix4x4_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
   d[i++] = pd[ 3];
   d[i++] = pd[ 7];
   d[i++] = pd[11];
   d[i++] = pd[15];
}
MO.SMatrix4x4_writeData4x3 = function SMatrix4x4_writeData4x3(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
}
MO.SMatrix4x4_toString = function SMatrix4x4_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 4; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 4; x++){
         var i = y * 4 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
MO.SOutline3 = function SOutline3(){
   var o = this;
   o.min         = new MO.SPoint3();
   o.max         = new MO.SPoint3();
   o.isEmpty     = MO.SOutline3_isEmpty;
   o.assign      = MO.SOutline3_assign;
   o.setMin      = MO.SOutline3_setMin;
   o.setMax      = MO.SOutline3_setMax;
   o.set         = MO.SOutline3_set;
   o.mergeMin    = MO.SOutline3_mergeMin;
   o.mergeMax    = MO.SOutline3_mergeMax;
   o.mergePoint  = MO.SOutline3_mergePoint;
   o.serialize   = MO.SOutline3_serialize;
   o.unserialize = MO.SOutline3_unserialize;
   o.toString    = MO.SOutline3_toString;
   return o;
}
MO.SOutline3_isEmpty = function SOutline3_isEmpty(p){
   var o = this;
   return o.min.isEmpty() && o.max.isEmpty();
}
MO.SOutline3_assign = function SOutline3_assign(p){
   var o = this;
   o.min.assign(p.min);
   o.max.assign(p.max);
}
MO.SOutline3_setMin = function SOutline3_setMin(){
   var o = this;
   o.min.setMax();
   o.max.setMin();
}
MO.SOutline3_setMax = function SOutline3_setMax(){
   var o = this;
   o.min.setMin();
   o.max.setMax();
}
MO.SOutline3_set = function SOutline3_set(minX, minY, minZ, maxX, maxY, maxZ){
   var o = this;
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
}
MO.SOutline3_mergeMin = function SOutline3_mergeMin(p){
   var o = this;
   o.min.mergeMax(p.min);
   o.max.mergeMin(p.max);
}
MO.SOutline3_mergeMax = function SOutline3_mergeMax(p){
   var o = this;
   o.min.mergeMin(p.min);
   o.max.mergeMax(p.max);
}
MO.SOutline3_mergePoint = function SOutline3_mergePoint(x, y, z){
   var o = this;
   o.min.mergeMin3(x, y, z);
   o.max.mergeMax3(x, y, z);
}
MO.SOutline3_serialize = function SOutline3_serialize(p){
   var o = this;
   o.min.serialize(p);
   o.max.serialize(p);
}
MO.SOutline3_unserialize = function SOutline3_unserialize(p){
   var o = this;
   o.min.unserialize(p);
   o.max.unserialize(p);
}
MO.SOutline3_toString = function SOutline3_toString(){
   var o = this;
   return '(' + o.min + ')-(' + o.max + ')';
}
MO.SOutline3d = function SOutline3d(){
   var o = this;
   MO.SOutline3.call(o);
   o.center        = new MO.SPoint3();
   o.distance      = new MO.SPoint3();
   o.radius        = 0;
   o.points        = new Array(24);
   o.assign        = MO.SOutline3d_assign;
   o.update        = MO.SOutline3d_update;
   o.calculateFrom = MO.SOutline3d_calculateFrom;
   o.calculate     = MO.SOutline3d_calculate;
   return o;
}
MO.SOutline3d_assign = function SOutline3d_assign(value){
   var o = this;
   o.center.assign(value.center);
   o.distance.assign(value.distance);
   o.radius = value.radius;
   for(var i = 0; i < 24; i++){
      o.points[i] = value.points[i];
   }
}
MO.SOutline3d_update = function SOutline3d_update(){
   var o = this;
   var min = o.min;
   var minX = min.x;
   var minY = min.y;
   var minZ = min.z;
   var max = o.max;
   var maxX = max.x;
   var maxY = max.y;
   var maxZ = max.z;
   var ps = o.points;
   ps[ 0] = minX;
   ps[ 1] = maxY;
   ps[ 2] = minZ;
   ps[ 3] = maxX;
   ps[ 4] = maxY;
   ps[ 5] = minZ;
   ps[ 6] = maxX;
   ps[ 7] = minY;
   ps[ 8] = minZ;
   ps[ 9] = minX;
   ps[10] = minY;
   ps[11] = minZ;
   ps[12] = minX;
   ps[13] = maxY;
   ps[14] = maxZ;
   ps[15] = maxX;
   ps[16] = maxY;
   ps[17] = maxZ;
   ps[18] = maxX;
   ps[19] = minY;
   ps[20] = maxZ;
   ps[21] = minX;
   ps[22] = minY;
   ps[23] = maxZ;
   var center = o.center;
   center.x = (minX + maxX) * 0.5;
   center.y = (minY + maxY) * 0.5;
   center.z = (minZ + maxZ) * 0.5;
   var distance = o.distance;
   distance.x = maxX - minX;
   distance.y = maxY - minY;
   distance.z = maxZ - minZ;
   var cx = maxX - minX;
   var cy = maxY - minY;
   var cz = maxZ - minZ;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SOutline3d_calculateFrom = function SOutline3d_calculateFrom(outline, matrix){
   var o = this;
   var points = o.points;
   matrix.transform(points, 0, outline.points, 0, 8);
   var minX = minY = minZ = Number.MAX_VALUE;
   var maxX = maxY = maxZ = -Number.MAX_VALUE;
   var i = 0;
   while(i < 24){
      var x = points[i++];
      if(x < minX){
         minX = x;
      }
      if(x > maxX){
         maxX = x;
      }
      var y = points[i++];
      if(y < minY){
         minY = y;
      }
      if(y > maxY){
         maxY = y;
      }
      var z = points[i++];
      if(z < minZ){
         minZ = z;
      }
      if(z > maxZ){
         maxZ = z;
      }
   }
   o.min.set(minX, minY, minZ);
   o.max.set(maxX, maxY, maxZ);
   o.update();
}
MO.SOutline3d_calculate = function SOutline3d_calculate(p){
   var o = this;
   var vix = viy = viz = Number.MAX_VALUE;
   var vax = vay = vaz = -Number.MAX_VALUE;
   var i = 0;
   var d = o.points;
   while(i < 24){
      var x = d[i++];
      if(x < vix){
         vix = x;
      }
      if(x > vax){
         vax = x;
      }
      var y = d[i++];
      if(y < viy){
         viy = y;
      }
      if(y > vay){
         vay = y;
      }
      var z = d[i++];
      if(z < viz){
         viz = z;
      }
      if(z > vaz){
         vaz = z;
      }
   }
   o.min.set(vix, viy, viz);
   o.max.set(vax, vay, vaz);
   o.center.x = (vix + vax) * 0.5;
   o.center.y = (viy + vay) * 0.5;
   o.center.z = (viz + vaz) * 0.5;
   var cx = vax - vix;
   var cy = vay - viy;
   var cz = vaz - viz;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
MO.SPadding = function SPadding(l, t, r, b){
   var o = this;
   o.left     = MO.Lang.Integer.nvl(l);
   o.top      = MO.Lang.Integer.nvl(t);
   o.right    = MO.Lang.Integer.nvl(r);
   o.bottom   = MO.Lang.Integer.nvl(b);
   o.isEmpty  = MO.SPadding_isEmpty;
   o.reset    = MO.SPadding_reset;
   o.assign   = MO.SPadding_assign;
   o.set      = MO.SPadding_set;
   o.parse    = MO.SPadding_parse;
   o.toString = MO.SPadding_toString;
   o.dispose  = MO.SPadding_dispose;
   o.dump     = MO.SPadding_dump;
   return o;
}
MO.SPadding_isEmpty = function SPadding_isEmpty(){
   var o = this;
   return (o.left == 0) && (o.top == 0) && (o.right == 0) && (o.bottom == 0);
}
MO.SPadding_reset = function SPadding_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SPadding_assign = function SPadding_assign(p){
   var o = this;
   o.left = p.left;
   o.top = p.top;
   o.right = p.right;
   o.bottom = p.bottom;
}
MO.SPadding_set = function SPadding_set(l, t, r, b){
   var o = this;
   o.left = l;
   o.top = t;
   o.right = r;
   o.bottom = b;
}
MO.SPadding_parse = function SPadding_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 4){
      o.left = parseInt(r[0]);
      o.top = parseInt(r[1]);
      o.right = parseInt(r[2]);
      o.bottom = parseInt(r[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SPadding_toString = function SPadding_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SPadding_dispose = function SPadding_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.right = null;
   o.bottom = null;
}
MO.SPadding_dump = function SPadding_dump(d){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.left + ',' + o.top + ',' + o.right + ',' + o.bottom + ']';
}
MO.SPlane = function SPlane(){
   var o = this;
   o.a         = 0;
   o.b         = 0;
   o.c         = 0;
   o.d         = 0;
   o.assign    = MO.SPlane_assign;
   o.set       = MO.SPlane_set;
   o.normalize = MO.SPlane_normalize;
   o.dot       = MO.SPlane_dot;
   o.toString  = MO.SPlane_toString;
   o.dump      = MO.SPlane_dump;
   return o;
}
MO.SPlane_assign = function SPlane_assign(p){
   var o = this;
   o.a = p.a;
   o.b = p.b;
   o.c = p.c;
   o.d = p.d;
}
MO.SPlane_set = function SPlane_set(pa, pb, pc, pd){
   var o = this;
   o.a = pa;
   o.b = pb;
   o.c = pc;
   o.d = pd;
}
MO.SPlane_normalize = function SPlane_normalize(){
   var o = this;
   var r = 1 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}
MO.SPlane_dot = function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + o.d;
}
MO.SPlane_toString = function SPlane_toString(){
   var o = this;
   return o.a + ',' + o.b + ',' + o.c + ',' + o.d;
}
MO.SPlane_dump = function SPlane_dump(){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.toString() + ']';
}
MO.SPoint2 = function SPoint2(x, y){
   var o = this;
   o.x           = MO.Lang.Integer.nvl(x);
   o.y           = MO.Lang.Integer.nvl(y);
   o.isEmpty     = MO.SPoint2_isEmpty;
   o.equals      = MO.SPoint2_equals;
   o.assign      = MO.SPoint2_assign;
   o.set         = MO.SPoint2_set;
   o.serialize   = MO.SPoint2_serialize;
   o.unserialize = MO.SPoint2_unserialize;
   o.parse       = MO.SPoint2_parse;
   o.toString    = MO.SPoint2_toString;
   o.dispose     = MO.SPoint2_dispose;
   o.dump        = MO.SPoint2_dump;
   return o;
}
MO.SPoint2_isEmpty = function SPoint2_isEmpty(){
   var o = this;
   return (o.x == 0) && (o.y == 0);
}
MO.SPoint2_equals = function SPoint2_equals(p){
   return p ? (this.x == p.x && this.y == p.y) : false;
}
MO.SPoint2_assign = function SPoint2_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
}
MO.SPoint2_set = function SPoint2_set(x, y){
   var o = this;
   o.x = x;
   o.y = y;
}
MO.SPoint2_serialize = function SPoint2_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
}
MO.SPoint2_unserialize = function SPoint2_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
}
MO.SPoint2_parse = function SPoint2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      o.x = parseInt(items[0]);
      o.y = parseInt(items[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", source);
   }
}
MO.SPoint2_toString = function SPoint2_toString(){
   var o = this;
   return o.x + ',' + o.y;
}
MO.SPoint2_dispose = function SPoint2_dispose(){
   var o = this;
   o.x = null;
   o.y = null;
}
MO.SPoint2_dump = function SPoint2_dump(){
   return MO.Class.dump(this) + ' [' + this.x + ',' + this.y + ']';
}
MO.SPoint3 = function SPoint3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   o.conjugate = MO.SPoint3_conjugate;
   o.mergeMin  = MO.SPoint3_mergeMin;
   o.mergeMin3 = MO.SPoint3_mergeMin3;
   o.mergeMax  = MO.SPoint3_mergeMax;
   o.mergeMax3 = MO.SPoint3_mergeMax3;
   o.resize    = MO.SPoint3_resize;
   o.slerp     = MO.SPoint3_slerp;
   return o;
}
MO.SPoint3_conjugate = function SPoint3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SPoint3();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}
MO.SPoint3_mergeMin = function SPoint3_mergeMin(p){
   var o = this;
   o.x = Math.min(o.x, p.x);
   o.y = Math.min(o.y, p.y);
   o.z = Math.min(o.z, p.z);
}
MO.SPoint3_mergeMin3 = function SPoint3_mergeMin3(x, y, z){
   var o = this;
   o.x = Math.min(o.x, x);
   o.y = Math.min(o.y, y);
   o.z = Math.min(o.z, z);
}
MO.SPoint3_mergeMax = function SPoint3_mergeMax(p){
   var o = this;
   o.x = Math.max(o.x, p.x);
   o.y = Math.max(o.y, p.y);
   o.z = Math.max(o.z, p.z);
}
MO.SPoint3_mergeMax3 = function SPoint3_mergeMax3(x, y, z){
   var o = this;
   o.x = Math.max(o.x, x);
   o.y = Math.max(o.y, y);
   o.z = Math.max(o.z, z);
}
MO.SPoint3_resize = function SPoint3_resize(x, y, z){
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
MO.SPoint3_slerp = function SPoint3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
MO.SPoint4 = function SPoint4(x, y, z, w){
   var o = this;
   MO.SValue4.call(o, x, y, z, w);
   o.serialize3   = MO.SPoint4_serialize3;
   o.unserialize3 = MO.SPoint4_unserialize3;
   return o;
}
MO.SPoint4_serialize3 = function SPoint4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
MO.SPoint4_unserialize3 = function SPoint4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
MO.SQuaternion = function SQuaternion(){
   var o = this;
   o.x             = 0;
   o.y             = 0;
   o.z             = 0;
   o.w             = 1;
   o.identity      = MO.SQuaternion_identity;
   o.assign        = MO.SQuaternion_assign;
   o.set           = MO.SQuaternion_set;
   o.absolute      = MO.SQuaternion_absolute;
   o.normalize     = MO.SQuaternion_normalize;
   o.conjugate     = MO.SQuaternion_conjugate;
   o.mul           = MO.SQuaternion_mul;
   o.mul2          = MO.SQuaternion_mul2;
   o.translate     = MO.SQuaternion_translate;
   o.slerp         = MO.SQuaternion_slerp;
   o.fromAxisAngle = MO.SQuaternion_fromAxisAngle;
   o.fromEuler     = MO.SQuaternion_fromEuler;
   o.parseEuler    = MO.SQuaternion_parseEuler;
   o.serialize     = MO.SQuaternion_serialize;
   o.unserialize   = MO.SQuaternion_unserialize;
   o.clone         = MO.SQuaternion_clone;
   o.toString      = MO.SQuaternion_toString;
   return o;
}
MO.SQuaternion_identity = function SQuaternion_identity(){
   var o = this;
   o.x = o.y = o.z = 0;
   o.w = 1;
   return o;
}
MO.SQuaternion_assign = function SQuaternion_assign(p){
   var o = this;
   o.x = p.x;
   o.y = p.y;
   o.z = p.z;
   o.w = p.w;
}
MO.SQuaternion_set = function SQuaternion_set(x, y, z, w){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
   o.w = w;
}
MO.SQuaternion_absolute = function SQuaternion_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z) + (o.w * o.w));
}
MO.SQuaternion_normalize = function SQuaternion_normalize(){
   var o = this;
   var a = o.absolute();
   if(a != 0){
      var v = 1 / a;
      o.x *= v;
      o.y *= v;
      o.z *= v;
      o.w *= v;
   }
}
MO.SQuaternion_conjugate = function SQuaternion_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SQuaternion();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   r.w = o.w;
   return r;
}
MO.SQuaternion_mul = function SQuaternion_mul(p){
   var o = this;
   var x = o.x;
   var y = o.y;
   var z = o.z;
   var w = o.w;
   o.x = (w * p.x) + (x * p.w) + (y * p.z) - (z * p.y);
   o.y = (w * p.y) + (y * p.w) + (z * p.x) - (x * p.z);
   o.z = (w * p.z) + (z * p.w) + (x * p.y) - (y * p.x);
   o.w = (w * p.w) - (x * p.x) - (y * p.y) - (z * p.z);
}
MO.SQuaternion_mul2 = function SQuaternion_mul2(p1, p2){
   var o = this;
   o.x = (p1.w * p2.x) + (p1.x * p2.w) + (p1.y * p2.z) - (p1.z * p2.y);
   o.y = (p1.w * p2.y) + (p1.y * p2.w) + (p1.z * p2.x) - (p1.x * p2.z);
   o.z = (p1.w * p2.z) + (p1.z * p2.w) + (p1.x * p2.y) - (p1.y * p2.x);
   o.w = (p1.w * p2.w) - (p1.x * p2.x) - (p1.y * p2.y) - (p1.z * p2.z);
}
MO.SQuaternion_translate = function SQuaternion_translate(pi, po){
   var o = this;
   var q1 = new MO.SQuaternion();
   q1.set(pi.x, pi.y, pi.z, 0);
   q1.normalize();
   var q2 = o.conjugate();
   q1.mul(q2);
   var q = o.clone();
   q.mul(q1);
   var r = null;
   if(po){
      r = po;
   }else{
      r = new MO.SVector3();
   }
   r.set(q.x, q.y, q.z);
   return r;
}
MO.SQuaternion_slerp = function SQuaternion_slerp(v1, v2, r){
   var o = this;
   var rv = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z) + (v1.w * v2.w);
   var rf = false;
   if (rv < 0){
      rf = true;
      rv = -rv;
   }
   var r1 = 0;
   var r2 = 0;
   if(rv > 0.999999){
      r1 = 1 - r;
      r2 = rf ? -r : r;
   }else{
      var ra = Math.acos(rv);
      var rb = 1 / Math.sin(ra);
      r1 = Math.sin((1 - r) * ra) * rb;
      r2 = rf ? (-Math.sin(r * ra) * rb) : (Math.sin(r * ra) * rb);
   }
   o.x = (r1 * v1.x) + (r2 * v2.x);
   o.y = (r1 * v1.y) + (r2 * v2.y);
   o.z = (r1 * v1.z) + (r2 * v2.z);
   o.w = (r1 * v1.w) + (r2 * v2.w);
}
MO.SQuaternion_fromAxisAngle = function SQuaternion_fromAxisAngle(a, g){
   var o = this;
   var r = g * 0.5;
   var s = Math.sin(r);
   o.x = a.x * s;
   o.y = a.y * s;
   o.z = a.z * s;
   o.w = Math.cos(r);
}
MO.SQuaternion_fromEuler = function SQuaternion_fromEuler(p, y, r){
   var o = this;
   var sr = Math.sin(r * 0.5);
   var cr = Math.cos(r * 0.5);
   var sp = Math.sin(p * 0.5);
   var cp = Math.cos(p * 0.5);
   var sy = Math.sin(y * 0.5);
   var cy = Math.cos(y * 0.5);
   o.x = cr * sp * cy + sr * cp * sy;
   o.y = cr * cp * sy - sr * sp * cy;
   o.z = sr * cp * cy - cr * sp * sy;
   o.w = cr * cp * cy + sr * sp * sy;
}
MO.SQuaternion_parseEuler = function SQuaternion_parseEuler(p){
   var o = this;
   var x2 = o.x * o.x;
   var y2 = o.y * o.y;
   var z2 = o.z * o.z;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector3();
   }
   r.x = Math.asin(RFloat.toRange((o.w * o.x - o.y * o.z) * 2, -1, 1));
   r.y = Math.atan2(2 * (o.w * o.y + o.z * o.x) , 1 - 2 * (x2 + y2));
   r.z = Math.atan2(2 * (o.w * o.z + o.x * o.y) , 1 - 2 * (z2 + x2));
   return r;
}
MO.SQuaternion_serialize = function SQuaternion_serialize(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
   p.writeFloat(o.w);
}
MO.SQuaternion_unserialize = function SQuaternion_unserialize(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
   o.w = p.readFloat();
}
MO.SQuaternion_clone = function SQuaternion_clone(){
   var o = this;
   var r = new MO.SQuaternion();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   r.w = o.w;
   return r;
}
MO.SQuaternion_toString = function SQuaternion_toString(){
   var o = this;
   return o.x + ',' + o.y + ',' + o.z + ',' + o.w;
}
MO.SRange = function SRange(x, y, w, h){
   var o = this;
   o.x         = x;
   o.y         = y;
   o.width     = w;
   o.height    = h;
   o.dump      = SRange_dump;
   return o;
}
MO.SRange_reset = function SRange_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SRange_assign = function SRange_assign(rect){
   this.left = rect.left;
   this.top = rect.top;
   this.right = rect.right;
   this.bottom = rect.bottom;
}
MO.SRange_set = function SRange_set(left, top, right, bottom){
   this.left = left;
   this.top = top;
   this.right = right;
   this.bottom = bottom;
}
MO.SRange_setBounds = function SRange_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
MO.SRange_width = function SRange_width(){
   return this.right - this.left + 1;
}
MO.SRange_setWidth = function SRange_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
MO.SRange_height = function SRange_height(){
   return this.bottom - this.top + 1;
}
MO.SRange_setHeight = function SRange_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
MO.SRange_move = function SRange_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
MO.SRange_inc = function SRange_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
MO.SRange_dec = function SRange_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
MO.SRange_dump = function SRange_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.append(RClass.name(o));
   d.append(' [', o.x, ',', o.y, '-', o.width, ',', o.height, '] ');
   return d;
}
MO.SRectangle = function SRectangle(left, top, width, height){
   var o = this;
   o.left            = MO.Lang.Integer.nvl(left);
   o.top             = MO.Lang.Integer.nvl(top);
   o.width           = MO.Lang.Integer.nvl(width);
   o.height          = MO.Lang.Integer.nvl(height);
   o.right           = MO.SRectangle_right;
   o.bottom          = MO.SRectangle_bottom;
   o.isEmpty         = MO.SRectangle_isEmpty;
   o.testRange       = MO.SRectangle_testRange;
   o.testRectangle   = MO.SRectangle_testRectangle;
   o.reset           = MO.SRectangle_reset;
   o.assign          = MO.SRectangle_assign;
   o.setLocation     = MO.SRectangle_setLocation;
   o.setSize         = MO.SRectangle_setSize;
   o.setLocationSize = MO.SRectangle_setLocationSize;
   o.set             = MO.SRectangle_set;
   o.toString        = MO.SRectangle_toString;
   o.dispose         = MO.SRectangle_dispose;
   return o;
}
MO.SRectangle_right = function SRectangle_right(){
   return this.left + this.width;
}
MO.SRectangle_bottom = function SRectangle_bottom(){
   return this.top + this.height;
}
MO.SRectangle_isEmpty = function SRectangle_isEmpty(){
   var o = this;
   if((o.width > 0) && (o.height > 0)){
      return false;
   }
   return true;
}
MO.SRectangle_testRange = function SRectangle_testRange(x, y){
   var o = this;
   if(x < o.left){
      return false;
   }
   if(y < o.top){
      return false;
   }
   if(x - o.left > o.width){
      return false;
   }
   if(y - o.top > o.height){
      return false;
   }
   return true;
}
MO.SRectangle_testRectangle = function SRectangle_testRectangle(r) {
   var o = this;
   return (o.left < r.left + r.width && o.left + o.width > r.left && o.top < r.top + r.height && o.top + o.height > r.top);
}
MO.SRectangle_reset = function SRectangle_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.width = 0;
   o.height = 0;
}
MO.SRectangle_assign = function SRectangle_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.width = value.width;
   o.height = value.height;
}
MO.SRectangle_setLocation = function SRectangle_setLocation(left, top){
   var o = this;
   o.left = left;
   o.top = top;
}
MO.SRectangle_setSize = function SRectangle_setSize(width, height){
   var o = this;
   o.width = width;
   o.height = height;
}
MO.SRectangle_setLocationSize = function SRectangle_setLocationSize(location, size){
   var o = this;
   o.left = location.x;
   o.top = location.y;
   o.width = size.width;
   o.height = size.height;
}
MO.SRectangle_set = function SRectangle_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height = height;
}
MO.SRectangle_toString = function SRectangle_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.width + ',' + o.height;
}
MO.SRectangle_dispose = function SRectangle_dispose(){
   var o = this;
   o.left = null;
   o.top = null;
   o.width = null;
   o.height = null;
}
MO.SSize2 = function SSize2(width, height){
   var o = this;
   o.width       = MO.Lang.Integer.nvl(width);
   o.height      = MO.Lang.Integer.nvl(height);
   o.isEmpty     = MO.SSize2_isEmpty;
   o.equalsData  = MO.SSize2_equalsData;
   o.equals      = MO.SSize2_equals;
   o.square      = MO.SSize2_square;
   o.assign      = MO.SSize2_assign;
   o.set         = MO.SSize2_set;
   o.serialize   = MO.SSize2_serialize;
   o.unserialize = MO.SSize2_unserialize;
   o.parse       = MO.SSize2_parse;
   o.toDisplay   = MO.SSize2_toDisplay;
   o.toString    = MO.SSize2_toString;
   o.dispose     = MO.SSize2_dispose;
   o.dump        = MO.SSize2_dump;
   return o;
}
MO.SSize2_isEmpty = function SSize2_isEmpty(){
   var o = this;
   return (o.width == 0) && (o.height == 0);
}
MO.SSize2_equalsData = function SSize2_equalsData(width, height){
   var o = this;
   if(o.width != width){
      return false;
   }
   if(o.height != height){
      return false;
   }
   return true;
}
MO.SSize2_equals = function SSize2_equals(p){
   var o = this;
   if(o.width != p.width){
      return false;
   }
   if(o.height != p.height){
      return false;
   }
   return true;
}
MO.SSize2_square = function SSize2_square(){
   return this.width * this.height;
}
MO.SSize2_assign = function SSize2_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
}
MO.SSize2_set = function SSize2_set(w, h){
   var o = this;
   o.width = w;
   o.height = h;
}
MO.SSize2_serialize = function SSize2_serialize(output){
   var o = this;
   output.writeFloat(o.width);
   output.writeFloat(o.height);
}
MO.SSize2_unserialize = function SSize2_unserialize(input, dataCd){
   var o = this;
   if(!dataCd){
      dataCd = MO.EDataType.Float16;
   }
   o.width = input.readData(dataCd);
   o.height = input.readData(dataCd);
}
MO.SSize2_parse = function SSize2_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 2){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
   }else{
      throw new TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SSize2_toDisplay = function SSize2_toDisplay(){
   var o = this;
   return o.width + 'x' + o.height;
}
MO.SSize2_toString = function SSize2_toString(){
   var o = this;
   return o.width + ',' + o.height;
}
MO.SSize2_dispose = function SSize2_dispose(){
   var o = this;
   o.width = null;
   o.height = null;
}
MO.SSize2_dump = function SSize2_dump(){
   var o = this;
   return MO.Class.dump(o) + ' [' + o.width + ',' + o.height + ']';
}
MO.SSize3 = function SSize3(w, h, d){
   var o = this;
   o.width    = MO.Lang.Integer.nvl(w);
   o.height   = MO.Lang.Integer.nvl(h);
   o.deep     = MO.Lang.Integer.nvl(d);
   o.assign   = MO.SSize3_assign;
   o.set      = MO.SSize3_set;
   o.parse    = MO.SSize3_parse;
   o.toString = MO.SSize3_toString;
   o.dump     = MO.SSize3_dump;
   return o;
}
MO.SSize3_assign = function SSize3_assign(v){
   var o = this;
   o.width = v.width;
   o.height = v.height;
   o.deep = v.deep;
}
MO.SSize3_set = function SSize3_set(w, h, d){
   var o = this;
   o.width = w;
   o.height = h;
   o.deep = d;
}
MO.SSize3_parse = function SSize3_parse(v){
   var o = this;
   var r = v.split(',')
   if(r.length == 3){
      o.width = parseInt(r[0]);
      o.height = parseInt(r[1]);
      o.deep = parseInt(r[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", v);
   }
}
MO.SSize3_toString = function SSize3_toString(){
   var o = this;
   return o.width + ',' + o.height + ',' + o.deep;
}
MO.SSize3_dump = function SSize3_dump(){
   var o = this;
   return MO.Lang.Class.dump(o) + ' [' + o.width + ',' + o.height + ',' + o.deep + ']';
}
MO.SSquare = function SSquare(l, t, r, b){
   var o = this;
   o.left      = MO.Lang.Integer.nvl(left);
   o.top       = MO.Lang.Integer.nvl(top);
   o.right     = MO.Lang.Integer.nvl(right);
   o.bottom    = MO.Lang.Integer.nvl(bottom);
   o.reset     = MO.SSquare_reset;
   o.assign    = MO.SSquare_assign;
   o.set       = MO.SSquare_set;
   o.setBounds = MO.SSquare_setBounds;
   o.width     = MO.SSquare_width;
   o.setWidth  = MO.SSquare_setWidth;
   o.height    = MO.SSquare_height;
   o.setHeight = MO.SSquare_setHeight;
   o.move      = MO.SSquare_move;
   o.inc       = MO.SSquare_inc;
   o.dec       = MO.SSquare_dec;
   o.pack      = MO.SSquare_dump;
   o.unpack    = MO.SSquare_dump;
   o.dump      = MO.SSquare_dump;
   return o;
}
MO.SSquare_reset = function SSquare_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}
MO.SSquare_assign = function SSquare_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.right = value.right;
   o.bottom = value.bottom;
}
MO.SSquare_set = function SSquare_set(left, top, right, bottom){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = right;
   o.bottom = bottom;
}
MO.SSquare_setBounds = function SSquare_setBounds(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = o.left + width - 1;
   o.bottom = o.top + height - 1;
}
MO.SSquare_width = function SSquare_width(){
   return this.right - this.left + 1;
}
MO.SSquare_setWidth = function SSquare_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}
MO.SSquare_height = function SSquare_height(){
   return this.bottom - this.top + 1;
}
MO.SSquare_setHeight = function SSquare_setHeight(height){
   if(height){
      this.bottom = this.top + height - 1;
   }
}
MO.SSquare_move = function SSquare_move(x, y){
   this.left += x;
   this.top += y;
   this.right += x;
   this.bottom += y;
}
MO.SSquare_inc = function SSquare_inc(border){
   var n = RInt.nvl(border, 1);
   this.left -= n;
   this.top -= n;
   this.right += n;
   this.bottom += n;
}
MO.SSquare_dec = function SSquare_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}
MO.SSquare_dump = function SSquare_dump(d){
   d = MO.Lang.String.nvlStr(d);
   d.append(MO.Class.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
MO.SValue3 = function SValue3(x, y, z){
   var o = this;
   o.x            = MO.Runtime.nvl(x, 0);
   o.y            = MO.Runtime.nvl(y, 0);
   o.z            = MO.Runtime.nvl(z, 0);
   o.isEmpty      = MO.SValue3_isEmpty;
   o.equals       = MO.SValue3_equals;
   o.equalsData   = MO.SValue3_equalsData;
   o.assign       = MO.SValue3_assign;
   o.setMin       = MO.SValue3_setMin;
   o.setMax       = MO.SValue3_setMax;
   o.set          = MO.SValue3_set;
   o.setAll       = MO.SValue3_setAll;
   o.length       = MO.SValue3_absolute;
   o.absolute     = MO.SValue3_absolute;
   o.normalize    = MO.SValue3_normalize;
   o.negative     = MO.SValue3_negative;
   o.serialize    = MO.SValue3_serialize;
   o.unserialize  = MO.SValue3_unserialize3;
   o.unserialize2 = MO.SValue3_unserialize2;
   o.unserialize3 = MO.SValue3_unserialize3;
   o.parse        = MO.SValue3_parse;
   o.toString     = MO.SValue3_toString;
   return o;
}
MO.SValue3_isEmpty = function SValue3_isEmpty(p){
   return (this.x == 0) && (this.y == 0) && (this.z == 0);
}
MO.SValue3_equals = function SValue3_equals(value){
   return (this.x == value.x) && (this.y == value.y) && (this.z == value.z);
}
MO.SValue3_equalsData = function SValue3_equalsData(x, y, z){
   return (this.x == x) && (this.y == y) && (this.z == z);
}
MO.SValue3_assign = function SValue3_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
}
MO.SValue3_setMin = function SValue3_setMin(){
   this.x = Number.MIN_VALUE;
   this.y = Number.MIN_VALUE;
   this.z = Number.MIN_VALUE;
}
MO.SValue3_setMax = function SValue3_setMax(){
   this.x = Number.MAX_VALUE;
   this.y = Number.MAX_VALUE;
   this.z = Number.MAX_VALUE;
}
MO.SValue3_set = function SValue3_set(x, y, z){
   this.x = x;
   this.y = y;
   this.z = z;
}
MO.SValue3_setAll = function SValue3_set(value){
   this.x = value;
   this.y = value;
   this.z = value;
}
MO.SValue3_normalize = function SValue3_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
   }
   return this;
}
MO.SValue3_absolute = function SValue3_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
}
MO.SValue3_negative = function SValue3_negative(value){
   var result = null;
   if(p){
      result = value;
   }else{
      result = new this.constructor();
   }
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   return result;
}
MO.SValue3_serialize = function SValue3_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
}
MO.SValue3_unserialize2 = function SValue3_unserialize2(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
}
MO.SValue3_unserialize3 = function SValue3_unserialize3(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
}
MO.SValue3_parse = function SValue3_parse(value){
   var items = value.split(',')
   if(items.length == 3){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}
MO.SValue3_toString = function SValue3_toString(){
   return this.x + ',' + this.y + ',' + this.z;
}
MO.SValue4 = function SValue4(x, y, z, w){
   var o = this;
   o.x           = MO.Runtime.nvl(x, 0);
   o.y           = MO.Runtime.nvl(y, 0);
   o.z           = MO.Runtime.nvl(z, 0);
   o.w           = MO.Runtime.nvl(w, 1);
   o.assign      = MO.SValue4_assign;
   o.set         = MO.SValue4_set;
   o.absolute    = MO.SValue4_absolute;
   o.normalize   = MO.SValue4_normalize;
   o.negative    = MO.SValue4_negative;
   o.serialize   = MO.SValue4_serialize;
   o.unserialize = MO.SValue4_unserialize;
   o.parse       = MO.SValue4_parse;
   o.toString    = MO.SValue4_toString;
   return o;
}
MO.SValue4_assign = function SValue4_assign(value){
   this.x = value.x;
   this.y = value.y;
   this.z = value.z;
   this.w = value.w;
}
MO.SValue4_set = function SValue4_set(x, y, z, w){
   this.x = x;
   this.y = y;
   this.z = z;
   this.w = w;
}
MO.SValue4_absolute = function SValue4_absolute(){
   return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
}
MO.SValue4_normalize = function SValue4_normalize(){
   var value = this.absolute();
   if(value != 0){
      var rate = 1 / value;
      this.x *= rate;
      this.y *= rate;
      this.z *= rate;
      this.w *= rate;
   }
}
MO.SValue4_negative = function SValue4_negative(value){
   var result = null;
   if(value){
      result = value;
   }else{
      result = new this.constructor();
   }
   result.x = -this.x;
   result.y = -this.y;
   result.z = -this.z;
   result.w = -this.w;
   return result;
}
MO.SValue4_serialize = function SValue4_serialize(output){
   output.writeFloat(this.x);
   output.writeFloat(this.y);
   output.writeFloat(this.z);
   output.writeFloat(this.w);
}
MO.SValue4_unserialize = function SValue4_unserialize(input){
   this.x = input.readFloat();
   this.y = input.readFloat();
   this.z = input.readFloat();
   this.w = input.readFloat();
}
MO.SValue4_parse = function SValue4_parse(value){
   var items = value.split(',')
   if(items.length == 4){
      this.x = parseFloat(items[0]);
      this.y = parseFloat(items[1]);
      this.z = parseFloat(items[2]);
      this.w = parseFloat(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", value);
   }
}
MO.SValue4_toString = function SValue4_toString(){
   return this.x + ',' + this.y + ',' + this.z + ',' + this.w;
}
MO.SVector3 = function SVector3(x, y, z){
   var o = this;
   MO.SValue3.call(o, x, y, z);
   o.length    = o.absolute;
   o.direction = MO.SVector3_direction;
   o.conjugate = MO.SVector3_conjugate;
   o.dotPoint3 = MO.SVector3_dotPoint3;
   o.cross     = MO.SVector3_cross;
   o.cross2    = MO.SVector3_cross2;
   o.slerp     = MO.SVector3_slerp;
   o.clone     = MO.SVector3_clone;
   return o;
}
MO.SVector3_direction = function SVector3_direction(startPoint, endPoint){
   var o = this;
   o.x = endPoint.x - startPoint.x;
   o.y = endPoint.y - startPoint.y;
   o.z = endPoint.z - startPoint.z;
   return o;
}
MO.SVector3_conjugate = function SVector3_conjugate(p){
   var o = this;
   var r = null;
   if(p){
      r = p;
   }else{
      r = new MO.SVector3();
   }
   r.x = -o.x;
   r.y = -o.y;
   r.z = -o.z;
   return r;
}
MO.SVector3_dotPoint3 = function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}
MO.SVector3_cross = function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}
MO.SVector3_cross2 = function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
MO.SVector3_slerp = function SVector3_slerp(v1, v2, r){
   var o = this;
   o.x = (v2.x - v1.x) * r + v1.x;
   o.y = (v2.y - v1.y) * r + v1.y;
   o.z = (v2.z - v1.z) * r + v1.z;
}
MO.SVector3_clone = function SVector3_clone(){
   var o = this;
   var r = new MO.SVector3();
   r.x = o.x;
   r.y = o.y;
   r.z = o.z;
   return r;
}
MO.SVector4 = function SVector4(x, y, z, w){
   var o = this;
   MO.SValue4.call(o, x, y, z, w);
   o.serialize3   = MO.SVector4_serialize3;
   o.unserialize3 = MO.SVector4_unserialize3;
   return o;
}
MO.SVector4_serialize3 = function SVector4_serialize3(p){
   var o = this;
   p.writeFloat(o.x);
   p.writeFloat(o.y);
   p.writeFloat(o.z);
}
MO.SVector4_unserialize3 = function SVector4_unserialize3(p){
   var o = this;
   o.x = p.readFloat();
   o.y = p.readFloat();
   o.z = p.readFloat();
}
MO.RMath = function RMath(){
   var o = this;
   o.value1         = new Array(1);
   o.value2         = new Array(2);
   o.value3         = new Array(3);
   o.value4         = new Array(4);
   o.value9         = new Array(9);
   o.value12        = new Array(12);
   o.value16        = new Array(16);
   o.vectorAxisX    = null;
   o.vectorAxisY    = null;
   o.vectorAxisZ    = null;
   o.vectorScale    = null;
   o.vectorForward  = null;
   o.vectorBackward = null;
   o.vector3        = null;
   o.rectangle      = null;
   o.matrix         = null;
   o.faceCenterPositions = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];
   return o;
}
MO.RMath.prototype.construct = function RMath_construct(){
   var o = this;
   o.vectorAxisX = new MO.SVector3(1, 0, 0);
   o.vectorAxisY = new MO.SVector3(0, 1, 0);
   o.vectorAxisZ = new MO.SVector3(0, 0, 1);
   o.vectorScale = new MO.SVector3(1, 1, 1);
   o.vectorForward = new MO.SVector3(0, 0, 1);
   o.vectorBackward = new MO.SVector3(0, 0, -1);
   o.vector3 = new MO.SVector3();
   o.rectangle = new MO.SRectangle();
   o.matrix = new MO.SMatrix3d();
}
MO.RMath.prototype.min = function RMath_min(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MAX_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value < result){
            result = value;
         }
      }
   }
   return result;
}
MO.RMath.prototype.max = function RMath_max(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MIN_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value > result){
            result = value;
         }
      }
   }
   return result;
}
MO.RMath.prototype.sign = function RMath_sign(value){
   if(value > 0){
      return 1;
   }else if(value < 0){
      return -1;
   }
   return 0;
}
MO.RMath = new MO.RMath();
MO.RMath.construct();
MO.Lang.Math = MO.RMath;
MO.RMatrix = function RMatrix(){
   var o = this;
   o.identity3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   o.identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   return o;
}
MO.RMatrix.prototype.perspectiveLH = function RMatrix_perspectiveLH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveRH = function RMatrix_perspectiveRH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveFieldOfViewLH = function RMatrix_perspectiveFieldOfViewLH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
MO.RMatrix.prototype.perspectiveFieldOfViewRH = function RMatrix_perspectiveFieldOfViewRH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (zfar - znear);
   data[15] = 0;
}
MO.RMatrix.prototype.orthoLH = function RMatrix_orthoLH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = znear / distance;
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = 1 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}
MO.RMatrix.prototype.orthoRH = function RMatrix_orthoRH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = (znear + zfar) / distance;
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = -2 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}
MO.Lang.Matrix = new MO.RMatrix();
MO.RRandom = function RRandom(){
   var o = this;
   o._seed = (new Date()).getTime();
   return o;
}
MO.RRandom.prototype.get = function RRandom_get(){
   var o = this;
   o._seed = (o._seed * 9301 + 49297) % 233280;
   return o._seed/(233280.0);
}
MO.RRandom.prototype.rand = function RRandom_rand(seed){
   var o = this;
   var value = o.get() * seed;
   return Math.ceil(value);
}
MO.RRandom = new MO.RRandom();
MO.Lang.Random = MO.RRandom;
