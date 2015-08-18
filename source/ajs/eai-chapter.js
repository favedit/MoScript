MO.FEaiChapter = function FEaiChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   return o;
}
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code            = MO.EEaiChapter.Chart;
   o._sceneTotal      = MO.Class.register(o, new MO.AGetter('_sceneTotal'));
   o._sceneHistory    = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneCustomer   = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o._sceneMarketer   = MO.Class.register(o, new MO.AGetter('_sceneMarketer'));
   o._scenePerformence   = MO.Class.register(o, new MO.AGetter('_scenePerformence'));
   o._sceneDepartment = MO.Class.register(o, new MO.AGetter('_sceneDepartment'));
   o._sceneLive       = MO.Class.register(o, new MO.AGetter('_sceneLive'));
   o._sceneWorld      = MO.Class.register(o, new MO.AGetter('_sceneWorld'));
   o._sceneSales      = MO.Class.register(o, new MO.AGetter('_sceneSales'));
   o.construct        = MO.FEaiChartChapter_construct;
   o.setup            = MO.FEaiChartChapter_setup;
   o.process          = MO.FEaiChartChapter_process;
   o.dispose          = MO.FEaiChartChapter_dispose;
   return o;
}
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiChartChapter_setup = function FEaiChartChapter_setup(){
   var o = this;
   var scene = o._sceneTotal = MO.Class.create(MO.FEaiChartTotalScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneHistory = MO.Class.create(MO.FEaiChartHistoryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCustomer = MO.Class.create(MO.FEaiChartCustomerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneMarketer = MO.Class.create(MO.FEaiChartMarketerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneDepartment = MO.Class.create(MO.FEaiChartDepartmentScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneLive = MO.Class.create(MO.FEaiChartLiveScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneWorld = MO.Class.create(MO.FEaiChartWorldScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
MO.FEaiLoadingChapter = function FEaiLoadingChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Loading;
   return o;
}
MO.FEaiLoginChapter = function FEaiLoginChapter(o){
   o = MO.Class.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Login;
   return o;
}
MO.FEaiSceneChapter = function FEaiSceneChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code             = MO.EEaiChapter.Scene;
   o._sceneCountry     = null;
   o._sceneGroup       = null;
   o._sceneGroupReport = null;
   o._sceneCompany     = null;
   o.construct         = MO.FEaiSceneChapter_construct;
   o.setup             = MO.FEaiSceneChapter_setup;
   o.process           = MO.FEaiSceneChapter_process;
   o.dispose           = MO.FEaiSceneChapter_dispose;
   return o;
}
MO.FEaiSceneChapter_construct = function FEaiSceneChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiSceneChapter_setup = function FEaiSceneChapter_setup(){
   var o = this;
   var scene = o._sceneCountry = MO.Class.create(MO.FEaiCountryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroup = MO.Class.create(MO.FEaiGroupScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneGroupReport = MO.Class.create(MO.FEaiGroupReportScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCompany = MO.Class.create(MO.FEaiCompanyScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}
MO.FEaiSceneChapter_process = function FEaiSceneChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiSceneChapter_dispose = function FEaiSceneChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
