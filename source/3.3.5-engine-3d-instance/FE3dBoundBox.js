//==========================================================
// <T>渲染立方体。</T>
//
//                     20─21    22─23        
//                   ╱│          ╱│        
//                 16  24        17  25        
//                                             
//                     26            27        
//                     │            │        
//                     28─29    30─31  (D面) 
//                   ╱             ╱         
//                 18             19  (C面)    
//     12             13                       
//   ╱             ╱                         
//  00─01    02─03                           
//  │            │                           
//  04            05                           
//                                             
//  06  14        07   15  (B面)     Y   Z     
//  │╱          │╱               | ╱      
//  08─09    10─11  (A面)          o ─> X   
//
// @class
// @author maocy
// @history 150207
//==========================================================
function FE3dBoundBox(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
   o._outline              = null;
   o._rate                 = 0.2;
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   //..........................................................
   // @method
   o.construct             = FE3dBoundBox_construct;
   // @method
   o.outline               = FE3dBoundBox_outline;
   // @method
   o.setup                 = FE3dBoundBox_setup;
   o.upload                = FE3dBoundBox_upload;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._material = RClass.create(FE3dMaterial);
   o._outline = new SOutline3();
}

//==========================================================
// <T>获得轮廓。</T>
//
// @method
// @return SOutline 轮廓
//==========================================================
function FE3dBoundBox_outline(){
   return this._outline;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dBoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   // 创建顶点缓冲
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   o._vertexBuffers.set(vb._name, vb);
   // 创建颜色缓冲
   var vd = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vd[n] = 0xFF;
   }
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vd, 1 * 4, 32);
   o._vertexBuffers.set(vb._name, vb);
   o._vertexCount = 32;
   //..........................................................
   // 创建索引缓冲
   var id = [
       0,  1,  0,  4,  0, 12,
       3,  2,  3,  5,  3, 13,
       8,  6,  8,  9,  8, 14,
      11,  7, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib._lineWidth = 1;
   ib.upload(id, 48);
   //..........................................................
   // 更新处理
   o.update();
   //..........................................................
   // 设置材质
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}

//==========================================================
// <T>上传处理。</T>
//
// @method
//==========================================================
function FE3dBoundBox_upload(){
   var o = this;
   // 设置变量
   var l = o._outline;
   var a = l.max;
   var ax = a.x;
   var ay = a.y;
   var az = a.z;
   var i = l.min;
   var ix = i.x;
   var iy = i.y;
   var iz = i.z;
   var r = o._rate;
   var cx = (ax - ix) * r;
   var cy = (ay - iy) * r;
   var cz = (az - iz) * r;
   // 设置顶点数据
   var vd = [
      // A面12个点
      ix,       ay,      iz,
      ix + cx,  ay,      iz,
      ax - cx,  ay,      iz,
      ax,       ay,      iz,
      ix,       ay - cy, iz,
      ax,       ay - cy, iz,
      ix,       iy + cy, iz,
      ax,       iy + cy, iz,
      ix,       iy,      iz,
      ix + cx,  iy,      iz,
      ax - cx,  iy,      iz,
      ax,       iy,      iz,
      // B面4个点
      ix,       ay,      iz + cz,
      ax,       ay,      iz + cz,
      ix,       iy,      iz + cz,
      ax,       iy,      iz + cz,
      // C面4个点
      ix,       ay,      az - cz,
      ax,       ay,      az - cz,
      ix,       iy,      az - cz,
      ax,       iy,      az - cz,
      // D面12个点
      ix,       ay,      az,
      ix + cx,  ay,      az,
      ax - cx,  ay,      az,
      ax,       ay,      az,
      ix,       ay - cy, az,
      ax,       ay - cy, az,
      ix,       iy + cy, az,
      ax,       iy + cy, az,
      ix,       iy,      az,
      ix + cx,  iy,      az,
      ax - cx,  iy,      az,
      ax,       iy,      az];
   // 更新数据
   o._vertexPositionBuffer.upload(vd, 4 * 3, 32);
}
