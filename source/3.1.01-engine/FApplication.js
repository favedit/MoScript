with(MO){
   //==========================================================
   // <T>应用对象。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FApplication = function FApplication(o){
      o = RClass.inherits(this, o, FComponent);
      //..........................................................
      // @attribute
      o._activeStage    = RClass.register(o, new AGetter('_activeStage'));
      o._stages         = RClass.register(o, new AGetter('_stages'));
      //..........................................................
      // @method
      o.construct       = FApplication_construct;
      // @method
      o.registerStage   = FApplication_registerStage;
      o.unregisterStage = FApplication_unregisterStage;
      o.selectStage     = FApplication_selectStage;
      // @method
      o.dispose         = FApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FApplication_construct = function FApplication_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      // 设置变量
      o._stages = new TDictionary();
   }

   //==========================================================
   // <T>注册一个舞台。</T>
   //
   // @method
   // @param stage:FStage 舞台
   //==========================================================
   MO.FApplication_registerStage = function FApplication_registerStage(stage){
      var o = this;
      var code = stage.code();
      o._stages.set(code, stage);
   }

   //==========================================================
   // <T>注销一个舞台。</T>
   //
   // @method
   // @param stage:FStage 舞台
   //==========================================================
   MO.FApplication_unregisterStage = function FApplication_unregisterStage(stage){
      var o = this;
      var code = stage.code();
      o._stages.set(code, null);
   }

   //==========================================================
   // <T>根据代码选择舞台。</T>
   //
   // @method
   // @param code:String 代码
   // @return FStage 舞台
   //==========================================================
   MO.FApplication_selectStage = function FApplication_selectStage(code){
      var o = this;
      var stage = o._stages.get(code);
      if(o._activeStage != stage){
         // 注销舞台
         var activeStage = o._activeStage;
         if(activeStage){
            RStage.unregister(activeStage);
            activeStage.deactive();
         }
         // 激活舞台
         stage.active();
         RStage.register(stage.code(), stage);
         o._activeStage = stage;
      }
      return stage;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FApplication_dispose = function FApplication_dispose(){
      var o = this;
      o._stages = RObject.dispose(o._stages, true);
      o._activeStage = null;
      // 父处理
      o.__base.FComponent.dispose.call(o);
   }
}
