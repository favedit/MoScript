with(MO){
   //==========================================================
   // <T>渲染顶点缓冲。</T>
   //
   // @class
   // @author maocy
   // @history 150512
   //==========================================================
   MO.FE3rVertexBuffer = function FE3rVertexBuffer(o){
      o = RClass.inherits(this, o, FWglVertexBuffer, MLinkerResource);
      //..........................................................
      // @method
      o.dispose = FE3rVertexBuffer_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rVertexBuffer_dispose = function FE3rVertexBuffer_dispose(){
      var o = this;
      o.__base.MLinkerResource.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
