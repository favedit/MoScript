with(MO){
   //==========================================================
   // <T>数据流。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FDataStream = function FDataStream(o){
      o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
      //..........................................................
      // @attribute
      o._length   = 0;
      o._memory   = null;
      o._viewer   = null;
      //..........................................................
      // @method
      o.construct = FDataStream_construct;
      // @method
      o.length    = FDataStream_length;
      o.setLength = FDataStream_setLength;
      o.memory    = FDataStream_memory;
      // @method
      o.flip      = FDataStream_flip;
      // @method
      o.dispose   = FDataStream_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FDataStream_construct = function FDataStream_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>获得长度。</T>
   //
   // @method
   // @return Integer 长度
   //==========================================================
   MO.FDataStream_length = function FDataStream_length(){
      return this._length;
   }

   //==========================================================
   // <T>设置长度。</T>
   //
   // @method
   // @param p:length:Integer 长度
   //==========================================================
   MO.FDataStream_setLength = function FDataStream_setLength(p){
      var o = this;
      o._length = p;
      o._memory = new ArrayBuffer(p);
      o._viewer = new DataView(o._memory);
   }

   //==========================================================
   // <T>获得内存。</T>
   //
   // @method
   // @return ArrayBuffer 内存
   //==========================================================
   MO.FDataStream_memory = function FDataStream_memory(){
      return this._memory;
   }

   //==========================================================
   // <T>反转数据处理。</T>
   //
   // @method
   //==========================================================
   MO.FDataStream_flip = function FDataStream_flip(){
      var o = this;
      o._length = o._position;
      o._position = 0;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   MO.FDataStream_dispose = function FDataStream_dispose(){
      var o = this;
      o._viewer = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
