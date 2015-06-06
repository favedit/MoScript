with(MO){
   //==========================================================
   // <T>应用。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      //..........................................................
      // @attribute
      o._stageLoading = RClass.register(o, new AGetter('_stageLoading'));
      o._stageLogin   = RClass.register(o, new AGetter('_stageLogin'));
      o._stageScene   = RClass.register(o, new AGetter('_stageScene'));
      //..........................................................
      // @method
      o.construct     = FEaiApplication_construct;
      // @method
      o.dispose       = FEaiApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
      // 设置变量
      o._stageLoading = MO.RClass.create(MO.FEaiLoadingStage);
      o._stageLogin = MO.RClass.create(MO.FEaiLoginStage);
      o._stageScene = MO.RClass.create(MO.FEaiSceneStage);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      // 父处理
      o.__base.FApplication.dispose.call(o);
   }
}
