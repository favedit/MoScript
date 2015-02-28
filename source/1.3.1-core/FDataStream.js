//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FDataStream = function FDataStream(o){
   o = RClass.inherits(this, o, MO.FObject, MO.MDataView, MO.MDataStream);
   //..........................................................
   // @method
   o.construct = FDataStream_construct;
   o.dispose   = FDataStream_dispose;
   return o;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   function FDataStream_construct(){
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
   function FDataStream_dispose(){
      var o = this;
      o._memory = null;
      o._viewer = null;
      o.__base.FObject.dispose.call(o);
   }
}
