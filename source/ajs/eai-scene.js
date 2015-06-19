MO.FEaiChartCustomerScene = function FEaiChartCustomerScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartCustomer;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartCustomerScene_onTemplateLoad;
   o.setup            = MO.FEaiChartCustomerScene_setup;
   o.active           = MO.FEaiChartCustomerScene_active;
   o.deactive         = MO.FEaiChartCustomerScene_deactive;
   return o;
}
MO.FEaiChartCustomerScene_onTemplateLoad = function FEaiChartCustomerScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartCustomerScene_setup = function FEaiChartCustomerScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartCustomerScene_active = function FEaiChartCustomerScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartCustomerScene_deactive = function FEaiChartCustomerScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code      = MO.EEaiScene.ChartHistory;
   o.onLoadData = MO.FEaiChartHistoryScene_onLoadData;
   o.setup      = MO.FEaiChartHistoryScene_setup;
   o.active     = MO.FEaiChartHistoryScene_active;
   o.deactive   = MO.FEaiChartHistoryScene_deactive;
   return o;
}
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event){
   var o = this;
   o.__base.FEaiChartScene.onLoadData.call(o, event);
   var context = o.graphicContext();
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var dataLayer = stage.dataLayer();
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var dateData = historyConsole.dates().get('20150616');
   var cityDatas = dateData.citys();
   var citys = cityConsole.citys();
   var count = citys.count();
   for(var i = 0; i < count; i++){
      var city = citys.at(i);
      var data = cityDatas.get(city.code());
      var bitmapData = context.createObject(MO.FE3dBitmapData);
      bitmapData.loadUrl('../ars/eai/dot.png');
      var bitmap = context.createObject(MO.FE3dBitmap);
      bitmap.setData(bitmapData);
      var material = bitmap.material();
      material.info().optionAlpha = true;
      var range = 1;
      if(data){
         var total = data.investmentTotal() / 10000000;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         material.info().ambientColor.set(total + 0.1, 0, total + 0.1, 1);
      }else{
         material.info().ambientColor.set(0, 0, 0, 1);
      }
      if(range < 1){
         range = 1;
      }
      if(range > 2){
         range = 2;
      }
      var matrix = bitmap.matrix();
      matrix.tx = city.location().x * 0.2 - 20.3 + (0.2 * range / 2);
      matrix.ty = city.location().y * 0.25 - 8 + (0.2 * range / 2);
      matrix.tz = -0.0001;
      matrix.sx = 0.2 * range;
      matrix.sy = 0.2 * range;
      matrix.sz = 0.2 * range;
      matrix.update();
      dataLayer.pushRenderable(bitmap);
   }
}
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
}
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
MO.FEaiChartIndustryScene = function FEaiChartIndustryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartIndustry;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartIndustryScene_onTemplateLoad;
   o.setup            = MO.FEaiChartIndustryScene_setup;
   o.active           = MO.FEaiChartIndustryScene_active;
   o.deactive         = MO.FEaiChartIndustryScene_deactive;
   return o;
}
MO.FEaiChartIndustryScene_onTemplateLoad = function FEaiChartIndustryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartIndustryScene_setup = function FEaiChartIndustryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartIndustryScene_active = function FEaiChartIndustryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartIndustryScene_deactive = function FEaiChartIndustryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartInvestment;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartInvestmentScene_onTemplateLoad;
   o.setup            = MO.FEaiChartInvestmentScene_setup;
   o.active           = MO.FEaiChartInvestmentScene_active;
   o.deactive         = MO.FEaiChartInvestmentScene_deactive;
   return o;
}
MO.FEaiChartInvestmentScene_onTemplateLoad = function FEaiChartInvestmentScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._countryData = null;
   o._provinces   = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.onLoadData   = MO.FEaiChartScene_onLoadData;
   o.construct    = MO.FEaiChartScene_construct;
   o.setup        = MO.FEaiChartScene_setup;
   o.active       = MO.FEaiChartScene_active;
   o.deactive     = MO.FEaiChartScene_deactive;
   o.dispose      = MO.FEaiChartScene_dispose;
   return o;
}
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var stage = o._activeStage;
   var mapLayer = stage.mapLayer();
   var borderLayer = stage.borderLayer();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(MO.Eai.Canvas);
      o._provinces.set(provinceData.name(), provinceEntity);
      mapLayer.pushRenderable(provinceEntity.faceRenderable());
      borderLayer.pushRenderable(provinceEntity.borderRenderable());
   }
}
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   o._provinces = new MO.TDictionary();
}
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0.1, 1);
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = o._activeStage;
   MO.Eai.Canvas.selectStage(stage);
}
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
}
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o.__base.FEaiScene.dispose.call(o);
}
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._mapLayer    = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._borderLayer = MO.RClass.register(o, new MO.AGetter('_borderLayer'));
   o._dataLayer   = MO.RClass.register(o, new MO.AGetter('_dataLayer'));
   o._faceLayer   = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct    = MO.FEaiChartStage_construct;
   return o;
}
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   var layer = o._borderLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('BorderLayer', layer);
   var layer = o._dataLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('DataLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Company;
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.Country;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiCountryScene_onTemplateLoad;
   o.setup            = MO.FEaiCountryScene_setup;
   o.active           = MO.FEaiCountryScene_active;
   o.deactive         = MO.FEaiCountryScene_deactive;
   return o;
}
MO.FEaiCountryScene_onTemplateLoad = function FEaiCountryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiCountryScene_setup = function FEaiCountryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiCountryScene_active = function FEaiCountryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiCountryScene_deactive = function FEaiCountryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiGroupReportScene = function FEaiGroupReportScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.GroupReport;
   return o;
}
MO.FEaiGroupScene = function FEaiGroupScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Group;
   return o;
}
with(MO){
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FScene);
      o._frames         = RClass.register(o, new AGetter('_frames'));
      o.construct       = FEaiScene_construct;
      o.registerFrame   = FEaiScene_registerFrame;
      o.unregisterFrame = FEaiScene_unregisterFrame;
      o.process         = FEaiScene_process;
      o.disposet        = FEaiScene_dispose;
      return o;
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
      o._frames = new TObjects();
   }
   MO.FEaiScene_registerFrame = function FEaiScene_registerFrame(frame){
      this._frames.push(frame);
   }
   MO.FEaiScene_unregisterFrame = function FEaiScene_unregisterFrame(frame){
      this._frames.remove(frame);
   }
   MO.FEaiScene_process = function FEaiScene_process(){
      var o = this;
      var count = o._frames.count();
      for(var i = 0; i < count; i++){
         var frame = o._frames.at(i);
         frame.psUpdate();
      }
      o.__base.FScene.process.call(o);
   }
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._frames = RObject.dispose(o._frames);
      o.__base.FScene.dispose.call(o);
   }
}
