with(MO){
   //==========================================================
   // <T>渲染环境。</T>
   //
   // @author maocy
   // @history 150107
   //==========================================================
   MO.FGraphicContext = function FGraphicContext(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._hCanvas   = null;
      //..........................................................
      // @method
      o.construct  = FGraphicContext_construct;
      o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
      o.dispose    = FGraphicContext_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGraphicContext_construct = function FGraphicContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
      var o = this;
      o._hCanvas = null;
      o.__base.FObject.dispose.call(o);
   }
}
