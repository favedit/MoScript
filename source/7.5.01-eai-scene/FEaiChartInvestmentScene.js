//==========================================================
// <T>图表投资场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._code            = MO.EEaiScene.ChartInvestment;
   // @attribute
   o._countryTemplate = null;
   // @attribute
   o._countryLogoBar  = null;
   //..........................................................
   // @method
   o.onTemplateLoad   = MO.FEaiChartInvestmentScene_onTemplateLoad;
   //..........................................................
   // @method
   o.setup            = MO.FEaiChartInvestmentScene_setup;
   // @method
   o.active           = MO.FEaiChartInvestmentScene_active;
   o.deactive         = MO.FEaiChartInvestmentScene_deactive;
   return o;
}

//==========================================================
// <T>模板加载处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_onTemplateLoad = function FEaiChartInvestmentScene_onTemplateLoad(event){
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
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   // 创建标志栏
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
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
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   // 创建标志栏
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   // 创建标志栏
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
