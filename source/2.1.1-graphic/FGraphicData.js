//==========================================================
// <T>图形数据。</T>
//
// @class
// @author maocy
// @history 150308
//==========================================================
function FGraphicData(o){
   o = RClass.inherits(this, o, FDataStream);
   //..........................................................
   // @method
   o.writeFloat4 = FDataStream_writeFloat4;
   o.writeColor4 = FDataStream_writeColor4;
   return o;
}

//==========================================================
// <T>写入4个浮点数。</T>
//
// @method
// @param a:value1:Float 浮点数1
// @param b:value2:Float 浮点数2
// @param c:value3:Float 浮点数3
// @param d:value4:Float 浮点数4
//==========================================================
function FDataStream_writeFloat4(a, b, c, d){
   var o = this;
   var p = o._position;
   var v = o._viewer;
   var e = o._endianCd;
   v.setFloat32(p,      a, e);
   v.setFloat32(p +  4, b, e);
   v.setFloat32(p +  8, c, e);
   v.setFloat32(p + 12, d, e);
   p += 16;
}

//==========================================================
// <T>写入颜色。</T>
//
// @method
// @param p:color:SColor4 颜色
//==========================================================
function FDataStream_writeColor4(p){
   this.writeFloat4(p.red, p.green, p.blue, p.alpha);
}
