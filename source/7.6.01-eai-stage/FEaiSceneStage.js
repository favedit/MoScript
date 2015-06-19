//==========================================================
// <T>集团舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiSceneStage = function FEaiSceneStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   //..........................................................
   // @attribute
   o._code             = MO.EEaiStage.Scene;
   // @attribute
   o._sceneCountry     = null;
   o._sceneGroup       = null;
   o._sceneGroupReport = null;
   o._sceneCompany     = null;
   //..........................................................
   // @method
   o.construct         = MO.FEaiSceneStage_construct;
   // @method
   o.setup             = MO.FEaiSceneStage_setup;
   o.process           = MO.FEaiSceneStage_process;
   // @method
   o.dispose           = MO.FEaiSceneStage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiSceneStage_construct = function FEaiSceneStage_construct(){
   var o = this;
   o.__base.FEaiStage.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiSceneStage_setup = function FEaiSceneStage_setup(){
   var o = this;
   // 创建国家场景
   var scene = o._sceneCountry = MO.RClass.create(MO.FEaiCountryScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   // 创建集团场景
   var scene = o._sceneGroup = MO.RClass.create(MO.FEaiGroupScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   // 创建集团报告场景
   var scene = o._sceneGroupReport = MO.RClass.create(MO.FEaiGroupReportScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   // 创建公司场景
   var scene = o._sceneCompany = MO.RClass.create(MO.FEaiCompanyScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiSceneStage_process = function FEaiSceneStage_process(){
   var o = this;
   o.__base.FEaiStage.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiSceneStage_dispose = function FEaiSceneStage_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiStage.dispose.call(o);
}
