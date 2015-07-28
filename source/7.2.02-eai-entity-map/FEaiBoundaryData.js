//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiBoundaryData = function FEaiBoundaryData(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity, MO.ME3dBoundaryPolygon);
   //..........................................................
   // @method
   o.construct   = MO.FEaiBoundaryData_construct;
   // @method
   o.unserialize = MO.FEaiBoundaryData_unserialize;
   // @method
   o.dispose     = MO.FEaiBoundaryData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiBoundaryData_construct = function FEaiBoundaryData_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o.__base.ME3dBoundaryPolygon.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiBoundaryData_unserialize = function FEaiBoundaryData_unserialize(input){
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
   if(vertexCount > 10000){
      console.log('Boundary: vertex=' + vertexCount + ' index=' + indexCount);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
   var o = this;
   // 父处理
   o.__base.ME3dBoundaryPolygon.dispose.call(o);
   o.__base.FEaiEntity.dispose.call(o);
}
