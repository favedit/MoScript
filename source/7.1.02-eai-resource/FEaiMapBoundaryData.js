//==========================================================
// <T>边界地图数据。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapBoundaryData = function FEaiMapBoundaryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.ME3dBoundaryPolygon);
   //..........................................................
   // @method
   o.construct   = MO.FEaiMapBoundaryData_construct;
   // @method
   o.unserialize = MO.FEaiMapBoundaryData_unserialize;
   // @method
   o.dispose     = MO.FEaiMapBoundaryData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapBoundaryData_construct = function FEaiMapBoundaryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.ME3dBoundaryPolygon.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapBoundaryData_unserialize = function FEaiMapBoundaryData_unserialize(input){
   var o = this;
   // 读取顶点数据
   var index = 0;
   var vertexCount = o._positionCount = input.readInt32();
   var positions = o._positions = new Float32Array(2 * vertexCount);
   for(var i = 0; i < vertexCount; i++){
      positions[index++] = input.readFloat();
      positions[index++] = input.readFloat();
   }
   // 读取索引数据
   var indexCount = o._indexCount = input.readInt32();
   var indexes = o._indexes = new Uint16Array(indexCount);
   for(var i = 0; i < indexCount; i++){
      indexes[i] = input.readUint16();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapBoundaryData_dispose = function FEaiMapBoundaryData_dispose(){
   var o = this;
   // 父处理
   o.__base.ME3dBoundaryPolygon.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
