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
      o._stageChart   = RClass.register(o, new AGetter('_stageChart'));
      //..........................................................
      // @event
      o.onProcess     = FEaiApplication_onProcess;
      //..........................................................
      // @method
      o.construct     = FEaiApplication_construct;
      // @method
      o.setup         = FEaiApplication_setup;
      o.selectStage   = FEaiApplication_selectStage;
      // @method
      o.dispose       = FEaiApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>执行处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_onProcess = function FEaiApplication_onProcess(){
      var o = this;
      //if(o._activeStage){
      //   o._activeStage.process();
      //}
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_setup = function FEaiApplication_setup(){
      var o = this;
      // 创建加载中舞台
      var stage = o._stageLoading = MO.RClass.create(MO.FEaiLoadingStage);
      stage.setup();
      o.registerStage(stage);
      // 创建登录舞台
      var stage = o._stageLogin = MO.RClass.create(MO.FEaiLoginStage);
      stage.setup();
      o.registerStage(stage);
      // 创建场景舞台
      var stage = o._stageScene = MO.RClass.create(MO.FEaiSceneStage);
      stage.setup();
      o.registerStage(stage);
      // 创建表格舞台
      var stage = o._stageChart = MO.RClass.create(MO.FEaiChartStage);
      stage.setup();
      o.registerStage(stage);
      // 注册处理
      RStage.lsnsEnterFrame.register(o, o.onProcess);
   }

   //==========================================================
   // <T>选择舞台。</T>
   //
   // @method
   // @param code:String 代码
   // @return FStage 舞台
   //==========================================================
   MO.FEaiApplication_selectStage = function FEaiApplication_selectStage(code){
      var o = this;
      o.__base.FApplication.selectStage.call(o, code);
      // 设置激活内容
      MO.Eai.Canvas.selectStage(o._activeStage);
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
