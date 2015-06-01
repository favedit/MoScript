with(MO){
   //==========================================================
   // <T>处理管道。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FPipeline = function FPipeline(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code = null;
      //..........................................................
      // @method
      o.code  = FPipeline_code;
      return o;
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FPipeline_code = function FPipeline_code(){
      return this._code;
   }
}
