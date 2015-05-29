with(MO){
   //==========================================================
   // <T>画板对象。</T>
   //
   // @face
   // @author maocy
   // @history 150411
   //==========================================================
   MO.MCanvasObject = function MCanvasObject(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @method
      o.htmlCanvas = RMethod.virtual(o, 'htmlCanvas');
      return o;
   }
}
