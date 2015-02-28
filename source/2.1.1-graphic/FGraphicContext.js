//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.Graphic.FGraphicContext = function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._hCanvas   = null;
   //..........................................................
   // @method
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   function FGraphicContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   function FGraphicContext_dispose(){
      var o = this;
      o._hCanvas = null;
      o.__base.FObject.dispose.call(o);
   }
}
