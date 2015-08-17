//==========================================================
// <T>集团舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   //..........................................................
   // @attribute
   o._code            = MO.EEaiChapter.Chart;
   // @attribute
   o._sceneTotal      = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory    = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneCustomer   = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o._sceneMarketer   = MO.Class.register(o, new MO.AGetter('_sceneMarketer'));
   o._scenePerformence   = MO.Class.register(o, new MO.AGetter('_scenePerformence'));
   o._sceneDepartment = MO.Class.register(o, new MO.AGetter('_sceneDepartment'));
   o._sceneLive       = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   o._sceneWorld      = MO.Class.register(o, new MO.AGetter('_sceneWorld'));
   o._sceneSales      = MO.Class.register(o, new MO.AGetter('_sceneSales'));   
   //..........................................................
   // @method
   o.construct        = MO.FEaiChartChapter_construct;
   // @method
   o.setup            = MO.FEaiChartChapter_setup;
   o.process          = MO.FEaiChartChapter_process;
   // @method
   o.dispose          = MO.FEaiChartChapter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_setup = function FEaiChartChapter_setup(){
   var o = this;
   // 创建总计图表
   var scene = o._sceneTotal = MO.Class.create(MO.FEaiChartTotalScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建历史图表
   var scene = o._sceneHistory = MO.Class.create(MO.FEaiChartHistoryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建客户数据图表
   var scene = o._sceneCustomer = MO.Class.create(MO.FEaiChartCustomerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建理财师数据图表
   var scene = o._sceneMarketer = MO.Class.create(MO.FEaiChartMarketerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建业绩数据图表
//   var scene = o._scenePerformence = MO.Class.create(MO.FEaiChartPerformenceScene);
//   scene.linkGraphicContext(o);
//   o.registerScene(scene);
   // 创建部门数据图表
   var scene = o._sceneDepartment = MO.Class.create(MO.FEaiChartDepartmentScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建即时图表
   var scene = o._sceneLive = MO.Class.create(MO.FEaiChartLiveScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建世界图表
   var scene = o._sceneWorld = MO.Class.create(MO.FEaiChartWorldScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiChapter.dispose.call(o);
}
