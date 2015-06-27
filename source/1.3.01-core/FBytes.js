with(MO){
   //==========================================================
   // <T>字节数组。</T>
   //
   // @author maocy
   // @history 150105
   //==========================================================
   MO.FBytes = function FBytes(o){
      o = RClass.inherits(this, o, FObject, MDataView);
      //..........................................................
      // @attribute
      o._memory   = RClass.register(o, new AGetter('_memory'));
      //..........................................................
      // @method
      o.construct = FBytes_construct;
      o.dispose   = FBytes_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   //==========================================================
   MO.FBytes_construct = function FBytes_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._memory = new ArrayBuffer();
      o._viewer = new DataView(o._memory);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @author maocy
   //==========================================================
   MO.FBytes_dispose = function FBytes_dispose(){
      var o = this;
      o._memory = null;
      o._viewer = null;
      o.__base.FObject.dispose.call(o);
   }
}
