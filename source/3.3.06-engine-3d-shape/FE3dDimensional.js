//==========================================================
// <T>渲染立方体。</T>
//
//  00 ─ 01 ─ 02 ─ 03 ─ 04
//  │    │    │    │    │
//  05 ─ 06 ─ 07 ─ 08 ─ 09
//  │    │    │    │    │
//  10 ─ 11 ─ 12 ─ 13 ─ 14 (中线)
//  │    │    │    │    │
//  15 ─ 16 ─ 17 ─ 18 ─ 19
//  │    │    │    │    │
//  20 ─ 21 ─ 22 ─ 23 ─ 24
//             (中线)
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dDimensional = function FE3dDimensional(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   //..........................................................
   // @method
   o.construct             = MO.FE3dDimensional_construct;
   // @method
   o.setup                 = MO.FE3dDimensional_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDimensional_construct = function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._cellSize = new MO.SSize2();
   o._cellSize.set(1, 1);
   o._size = new MO.SSize2();
   o._size.set(16, 16);
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
MO.FE3dDimensional_setup = function FE3dDimensional_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置变量
   var cw = o._cellSize.width;
   var ch = o._cellSize.height;
   var sw = o._size.width;
   var sw2 = sw / 2;
   var sh = o._size.height;
   var sh2 = sh / 2;
   // 设置顶点数据
   var vc = 2 * ((sw + 2) + (sh + 2));
   var v = 0;
   var vi = 0;
   var vd = new Float32Array(3 * vc);
   var vci = 0;
   var vcd = new Uint8Array(4 * vc);
   var i = 0;
   var it = vc;
   var id = new Uint16Array(it);
   //..........................................................
   // 横线数据
   for(var y = 0; y <= sh; y++){
      // 消除中线
      var r = 1;
      if(y - sh2 == 0){
         r = 0
      }
      // 开始点
      vd[v++] = cw * -sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      // 结束点
      vd[v++] = cw * sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      // 颜色设置
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      // 横向索引
      id[i++] = vi++;
      id[i++] = vi++;
   }
   // 中间横线
   vd[v++] = cw * -sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   // 结束点
   vd[v++] = cw * sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   // 颜色设置
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   // 横向索引
   id[i++] = vi++;
   id[i++] = vi++;
   //..........................................................
   // 纵线数据
   for(var x = 0; x <= sw; x++){
      // 消除中线
      var r = 1;
      if(x - sw2 == 0){
         r = 0
      }
      // 开始点
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * - sh2 * r;
      // 结束点
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * sh2 * r;
      // 颜色设置
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      // 纵向索引
      id[i++] = vi++;
      id[i++] = vi++;
   }
   // 中间纵线
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * -sh2;
   // 结束点
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2;
   // 颜色设置
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   // 纵向索引
   id[i++] = vi++;
   id[i++] = vi++;
   //..........................................................
   o._vertexCount = vc;
   // 上传顶点数据
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(vd, 4 * 3, vc);
   o.pushVertexBuffer(buffer);
   // 上传颜色数据
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(vcd, 4, vc);
   o.pushVertexBuffer(buffer);
   // 上传索引数据
   var buffer = context.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   buffer.upload(id, it);
   o.pushIndexBuffer(buffer);
   //..........................................................
   // 设置材质
   var materialInfo = o.material().info();
   materialInfo.effectCode = 'control';
   materialInfo.ambientColor.set(1, 1, 1, 1);
}
