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
function FRd3Dimensional(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   //..........................................................
   // @attribute
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexBuffers        = null;
   o._indexBuffer          = null;
   //..........................................................
   // @method
   o.construct             = FRd3Dimensional_construct;
   o.setup                 = FRd3Dimensional_setup;
   o.testVisible           = RMethod.emptyTrue;
   o.vertexCount           = FRd3Dimensional_vertexCount;
   o.findVertexBuffer      = FRd3Dimensional_findVertexBuffer;
   o.vertexBuffers         = FRd3Dimensional_vertexBuffers;
   o.indexBuffer           = FRd3Dimensional_indexBuffer;
   o.textures              = RMethod.empty;
   o.bones                 = RMethod.empty;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Dimensional_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
   o._cellSize = new SSize2();
   o._cellSize.set(1, 1);
   o._size = new SSize2();
   o._size.set(16, 16);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function FRd3Dimensional_setup(p){
   var o = this;
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
   vd[v++] = cw * -sw2 - cw;
   vd[v++] = 0;
   vd[v++] = 0;
   // 结束点
   vd[v++] = cw * sw2 + cw;
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
   vd[v++] = ch * - sh2 - ch;
   // 结束点
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2 + ch;
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
   var vb = o._vertexPositionBuffer = p.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   vb.upload(vd, 4 * 3, vc);
   o._vertexBuffers.push(vb);
   // 上传颜色数据
   var vb = o._vertexColorBuffer = p.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vcd, 4, vc);
   o._vertexBuffers.push(vb);
   // 上传索引数据
   var ib = o._indexBuffer = p.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib.upload(id, it);
}

function FRd3Dimensional_vertexCount(){
   return this._vertexCount;
}
function FRd3Dimensional_findVertexBuffer(p){
   var o = this;
   if(p == 'position'){
      return o._vertexPositionBuffer;
   }else if(p == 'color'){
      return o._vertexColorBuffer;
   }
   return null;
}

function FRd3Dimensional_vertexBuffers(){
   return this._vertexBuffers;
}

function FRd3Dimensional_indexBuffer(){
   return this._indexBuffer;
}
