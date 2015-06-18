//==========================================================
// <T>集团舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   //..........................................................
   // @attribute
   o._code             = MO.EEaiStage.Chart;
   // @attribute
   o._sceneHistory     = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneIndustry    = MO.Class.register(o, new MO.AGetter('_sceneIndustry'));
   o._sceneInvestment  = MO.Class.register(o, new MO.AGetter('_sceneInvestment'));
   o._sceneCustomer    = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartStage_construct;
   // @method
   o.setup             = MO.FEaiChartStage_setup;
   o.process           = MO.FEaiChartStage_process;
   // @method
   o.dispose           = MO.FEaiChartStage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FEaiStage.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStage_setup = function FEaiChartStage_setup(){
   var o = this;
   // 创建国家场景
   var scene = o._sceneHistory = MO.RClass.create(MO.FEaiChartHistoryScene);
   scene.setup();
   o.registerScene(scene);
   // 创建集团场景
   var scene = o._sceneIndustry = MO.RClass.create(MO.FEaiChartIndustryScene);
   scene.setup();
   o.registerScene(scene);
   // 创建集团报告场景
   var scene = o._sceneInvestment = MO.RClass.create(MO.FEaiChartInvestmentScene);
   scene.setup();
   o.registerScene(scene);
   // 创建公司场景
   var scene = o._sceneCustomer = MO.RClass.create(MO.FEaiChartCustomerScene);
   scene.setup();
   o.registerScene(scene);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStage_process = function FEaiChartStage_process(){
   var o = this;
   o.__base.FEaiStage.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStage_dispose = function FEaiChartStage_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiStage.dispose.call(o);
}
