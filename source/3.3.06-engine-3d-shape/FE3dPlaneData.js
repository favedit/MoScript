//==========================================================
// <T>矩形定点数据。</T>
//
//  00 ── 01 
//  │      │
//  │      │
//  03 ── 02
//
// @class
// @author adu
// @history 150207
//==========================================================
MO.FE3dPlaneData = function FE3dPlaneData(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._vertexs           = MO.Class.register(o, new MO.AGetter('_vertexs'));;
   o._initVertexs       = null;
   o._matrix            = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._centerX           = MO.Class.register(o, new MO.AGetter('_centerX'), 0);
   o._centerY           = MO.Class.register(o, new MO.AGetter('_centerY'), 0);
   o._z                 = MO.Class.register(o, new MO.AGetSet('_z'));
   o._dataLength        = 4 * 3;
   //..........................................................
   // @method
   o.construct          = MO.FE3dPlaneData_construct;
   o.setup              = MO.FE3dPlaneData_setup;
   o.setVertexs         = MO.FE3dPlaneData_setVertexs;
   o.move               = MO.FE3dPlaneData_move;
   o.rotate             = MO.FE3dPlaneData_rotate;
   o.rotateAxis         = MO.FE3dPlaneData_rotateAxis;
   o.update             = MO.FE3dPlaneData_update;
   o.format             = MO.FE3dPlaneData_format;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_construct = function FE3dPlaneData_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._vertexs = new Float32Array(o._dataLength);
   o._initVertexs = new Float32Array(o._dataLength);
   o._matrix = new MO.SMatrix3d();
   o._z = 0;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_setup = function FE3dPlaneData_setup() {
   var o = this;
   
}

//==========================================================
// <T>更新顶点坐标。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_setVertexs = function FE3dPlaneData_setVertexs(centerX, centerY, halfWidth, halfHeight) {
   var o = this;
   o._centerX = centerX;
   o._centerY = centerY;
   var initIndex = 0;
   var index = 0;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = -halfWidth;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = -halfHeight;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = 0;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = halfWidth;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = -halfHeight;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = 0;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = halfWidth;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = halfHeight;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = 0;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = -halfWidth;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = halfHeight;
   o._vertexs[index ++] = o._initVertexs[initIndex ++] = 0;
   o.format();
}

//==========================================================
// <T>平移。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_move = function FE3dPlaneData_move(x, y, z) {
   var o = this;
   o._centerX = x;
   o._centerY = y;
   o._z = z;
}

//==========================================================
// <T>旋转。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_rotate = function FE3dPlaneData_rotate(x, y, z) {
   var o = this;
   var matrix = o._matrix;
   matrix.addRotation(x, y, z);
}

//==========================================================
// <T>轴旋转。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_rotateAxis = function FE3dPlaneData_rotateAxis(axis, angle) {
   var o = this;
   var matrix = o._matrix;
   matrix.addRotationAxis(axis, angle);
}

//==========================================================
// <T>格式化顶点坐标。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_format = function FE3dPlaneData_format() {
   var o = this;
   var vertexs = o._vertexs;
   for(var i = 0; i < o._dataLength; i += 3) {
      vertexs[i] += o._centerX;
      vertexs[i + 1] += o._centerY;
      vertexs[i + 2] += o._z;
   }
}

//==========================================================
// <T>刷新。</T>
//
// @method
//==========================================================
MO.FE3dPlaneData_update = function FE3dPlaneData_update() {
   var o = this;
   var matrix = o._matrix;
   matrix.transform(o._vertexs, 0, o._initVertexs, 0, o._dataLength);
   o.format();
}

