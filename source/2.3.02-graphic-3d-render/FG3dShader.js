with(MO){
   //==========================================================
   // <T>渲染器。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dShader = function FG3dShader(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._source = RClass.register(o, new AGetter('_source'));
      //..........................................................
      // @method
      o.upload  = RMethod.virtual(o, 'upload');
      return o;
   }
}
