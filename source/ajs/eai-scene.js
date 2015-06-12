MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Company;
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.Country;
   o._countryTemplate = null;
   o.onTemplateLoad   = MO.FEaiCountryScene_onTemplateLoad;
   o.setup            = MO.FEaiCountryScene_setup;
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
   stage.mapLayer().pushDisplay(sprite);
}
MO.FEaiCountryScene_setup = function FEaiCountryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var templateConsole = MO.RConsole.find(MO.FE3dTemplateConsole);
   var template = o._countryTemplate = templateConsole.allocByCode(MO.Eai.Canvas, 'eai.world.china');
   template.addLoadListener(o, o.onTemplateLoad);
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
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = null;
      o._spriteLayer = null;
      o._faceLayer   = null;
      o.construct    = FEaiScene_construct;
      o.mapLayer     = FEaiScene_mapLayer;
      o.spriteLayer  = FEaiScene_spriteLayer;
      o.faceLayer    = FEaiScene_faceLayer;
      o.active       = FEaiScene_active;
      o.deactive     = FEaiScene_deactive;
      return o;
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
   }
   MO.FEaiScene_mapLayer = function FEaiScene_mapLayer(){
      return this._mapLayer;
   }
   MO.FEaiScene_spriteLayer = function FEaiScene_spriteLayer(){
      return this._spriteLayer;
   }
   MO.FEaiScene_faceLayer = function FEaiScene_faceLayer(){
      return this._faceLayer;
   }
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
