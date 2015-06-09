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
      o._length   = RClass.register(o, new AGetter('_length'), 0);
      o._memory   = RClass.register(o, new AGetter('_memory'));
      o._viewer   = null;
      //..........................................................
      // @method
      o.construct = FDataStream_construct;
      // @method
      o.setLength = FDataStream_setLength;
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
   // <T>设置长度。</T>
   //
   // @method
   // @param length:Integer 长度
   //==========================================================
   MO.FDataStream_setLength = function FDataStream_setLength(length){
      var o = this;
      o._length = length;
      o._memory = new ArrayBuffer(length);
      o._viewer = new DataView(o._memory);
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
