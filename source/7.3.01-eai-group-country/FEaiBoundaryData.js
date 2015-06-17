with(MO){
   //==========================================================
   // <T>全国地图实体类</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiBoundaryData = function FEaiBoundaryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._positionCount = RClass.register(o, new AGetter('_positionCount'));
      o._positions     = RClass.register(o, new AGetter('_positions'));
      o._indexes       = RClass.register(o, new AGetter('_indexes'));
      //..........................................................
      // @method
      o.construct      = FEaiBoundaryData_construct;
      // @method
      o.unserialize    = FEaiBoundaryData_unserialize;
      // @method
      o.dispose        = FEaiBoundaryData_dispose;
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
      o._positions = new Float32Array(3 * vertexCount);
      for(var i = 0; i < vertexCount; i++){
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
      }
      // 读取索引数据
      var indexCount = input.readInt32();
      o._indexes = new Uint16Array(indexCount);
      for(var i = 0; i < indexCount; i++){
         o._indexes[i] = input.readUint16();
      }
   }
   
   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
      var o = this;
      o._positions = RObject.dispose(o._positions);
      o._indexes = null;
      // 父处理
      o.__base.FEaiEntity.dispose.call(o);
   }
}
