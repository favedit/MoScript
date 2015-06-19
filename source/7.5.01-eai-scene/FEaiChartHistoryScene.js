//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._code            = MO.EEaiScene.ChartHistory;
   // @attribute
   o._countryTemplate = null;
   // @attribute
   o._country         = null;
   //..........................................................
   // @method
   o.onTemplateLoad   = MO.FEaiChartHistoryScene_onTemplateLoad;
   //..........................................................
   // @method
   o.setup            = MO.FEaiChartHistoryScene_setup;
   // @method
   o.active           = MO.FEaiChartHistoryScene_active;
   o.deactive         = MO.FEaiChartHistoryScene_deactive;
   return o;
}

//==========================================================
// <T>模板加载处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onTemplateLoad = function FEaiChartHistoryScene_onTemplateLoad(event){
   var o = this;
   // 显示精灵
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   //matrix.setScaleAll(1.01);
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
   //stage.mapLayer().pushDisplay(sprite);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   // 激活舞台
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0.1, 1);
   //MO.Eai.Canvas._activeStage = stage;
   MO.Eai.Canvas.selectStage(stage);
   //
   var country = o._country = MO.Class.create(MO.FEaiCountryData);
   country.load();
   // 创建标志栏
   //var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   //var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   //o.registerFrame(frame);
   // 创建国家模板
   //var templateConsole = MO.RConsole.find(MO.FE3dTemplateConsole);
   //var template = o._countryTemplate = templateConsole.allocByCode(MO.Eai.Canvas, 'eai.world.china');
   //template.addLoadListener(o, o.onTemplateLoad);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   //var stage = o._activeStage;
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   // 创建标志栏
   //var frame = o._countryLogoBar
   //layer.removeRenderable(frame.renderable());
}
