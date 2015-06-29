with(MO){
    //==========================================================
   // <T>渲染形状。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FE3dShape = function FE3dShape(o){
      o = RClass.inherits(this, o, FE3dFace);
      //..........................................................
      // @attribute
      o._ready    = true;
      //..........................................................
      // @method
      o.construct = FE3dShape_construct;
      // @method
      o.dispose   = FE3dShape_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShape_construct = function FE3dShape_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShape_dispose = function FE3dShape_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFace.dispose.call(o);
   }
}
