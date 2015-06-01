with(MO){
   //==========================================================
   // <T>渲染程序模板。</T>
   //
   // @author maocy
   // @history 150116
   //==========================================================
   MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
      o = RClass.inherits(this, o, FTagDocument);
      //..........................................................
      // @attribute
      o._space  = 'shader';
      return o;
   }
}
