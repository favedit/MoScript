with(MO){
   //==========================================================
   // <T>渲染缓冲。</T>
   //
   // @class
   // @author maocy
   // @history 150305
   //==========================================================
   MO.FG3dBuffer = function FG3dBuffer(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._code   = RClass.register(o, new AGetSet('_code'));
      //..........................................................
      // @method
      o.isValid = RMethod.virtual(o, 'isValid');
      return o;
   }
}
