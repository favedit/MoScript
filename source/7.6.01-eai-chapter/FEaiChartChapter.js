//==========================================================
// <T>集团舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   //..........................................................
   // @attribute
   o._code         = MO.EEaiChapter.Chart;
   // @attribute
   o._sceneTotal   = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneLive    = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   //..........................................................
   // @method
   o.construct     = MO.FEaiChartChapter_construct;
   // @method
   o.setup         = MO.FEaiChartChapter_setup;
   o.process       = MO.FEaiChartChapter_process;
   // @method
   o.dispose       = MO.FEaiChartChapter_dispose;
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
   // 创建图表总计
   var scene = o._sceneTotal = MO.RClass.create(MO.FEaiChartTotalScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建图表历史
   var scene = o._sceneHistory = MO.RClass.create(MO.FEaiChartHistoryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   // 创建图表即时
   var scene = o._sceneLive = MO.RClass.create(MO.FEaiChartLiveScene);
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
