function FE3dDisplay(o){
   o = RClass.inherits(this, o, FDisplay);
   o._materials = null;
   o.construct  = FE3dDisplay_construct;
   o.materials  = FE3dDisplay_materials;
   o.dispose    = FE3dDisplay_dispose;
   return o;
}
function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._materials = new TDictionary();
}
function FE3dDisplay_materials(){
   return this._materials;
}
function FE3dDisplay_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
}
function FE3dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
function FE3dSimpleStage(o){
   o = RClass.inherits(this, o, FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = null;
   o._mapLayer       = null;
   o._spriteLayer    = null;
   o._faceLayer      = null;
   o.onKeyDown       = FE3dSimpleStage_onKeyDown;
   o.construct       = FE3dSimpleStage_construct;
   o.skyLayer        = FE3dSimpleStage_skyLayer;
   o.mapLayer        = FE3dSimpleStage_mapLayer;
   o.spriteLayer     = FE3dSimpleStage_spriteLayer;
   o.faceLayer       = FE3dSimpleStage_faceLayer;
   o.active          = FE3dSimpleStage_active;
   o.deactive        = FE3dSimpleStage_deactive;
   return o;
}
function FE3dSimpleStage_onKeyDown(e){
   var o = this;
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}
function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', l);
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('face', l);
}
function FE3dSimpleStage_skyLayer(){
   return this._skyLayer;
}
function FE3dSimpleStage_mapLayer(){
   return this._mapLayer;
}
function FE3dSimpleStage_spriteLayer(){
   return this._spriteLayer;
}
function FE3dSimpleStage_faceLayer(){
   return this._faceLayer;
}
function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
}
function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
   }
}
function FE3dSprite(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._visible    = true;
   o.linkContext = FE3dSprite_linkContext;
   o.testVisible = FE3dSprite_testVisible;
   return o;
}
function FE3dSprite_linkContext(p){
   this._context = p;
}
function FE3dSprite_testVisible(p){
   return this._visible;
}
function FE3dStage(o){
   o = RClass.inherits(this, o, FStage, MGraphicObject);
   o._backgroundColor  = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o._allDisplays      = null;
   o.construct         = FE3dStage_construct;
   o.setup             = FE3dStage_setup;
   o.backgroundColor   = FE3dStage_backgroundColor;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   o.filterDisplays    = FE3dStage_filterDisplays;
   o.allDisplays       = FE3dStage_allDisplays;
   o.process           = FE3dStage_process;
   return o;
}
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
   o._allDisplays = new TObjects();
   var c = o._camera = RClass.create(FE3dCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
   l.direction().set(0, -1, 0);
   var r = o._region = RClass.create(FG3dRegion);
   r._camera = c;
   r._directionalLight = l;
}
function FE3dStage_setup(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._region.linkGraphicContext(o);
   o._region.setup();
}
function FE3dStage_backgroundColor(){
   return this._backgroundColor;
}
function FE3dStage_camera(){
   return this._camera;
}
function FE3dStage_projection(){
   return this._projection;
}
function FE3dStage_directionalLight(){
   return this._directionalLight;
}
function FE3dStage_technique(){
   return this._technique;
}
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}
function FE3dStage_region(){
   return this._region;
}
function FE3dStage_filterDisplays(p){
   var o = this;
   var s = o._layers;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.value(i).filterDisplays(p);
      }
   }
}
function FE3dStage_allDisplays(){
   var o = this;
   var s = o._allDisplays;
   s.clear();
   o.filterDisplays(s);
   return s;
}
function FE3dStage_process(){
   var o = this;
   var r = o._region;
   var t = o._technique;
   o.__base.FStage.process.call(o);
   t.updateRegion(r);
   r.prepare();
   var ls = o._layers;
   if(ls){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         r.reset();
         l.filterRenderables(r);
         l._renderables.assign(r._renderables);
         r.update();
      }
   }
   if(r.isChanged()){
      t.clear(o._backgroundColor);
      if(ls){
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var lt = l.technique();
            if(!lt){
               lt = t;
            }
            r.reset();
            r._renderables.assign(l._renderables);
            lt.drawRegion(r);
         }
      }
      t.present(r);
   }
}
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   o._setuped = false;
   o.onSetup  = RE3dEngine_onSetup;
   o.setup    = RE3dEngine_setup;
   return o;
}
function RE3dEngine_onSetup(){
   var ec = RConsole.find(FG3dEffectConsole);
   ec.register('select.select.control', FG3dSelectAutomaticEffect);
   ec.register('select.select.automatic', FG3dSelectAutomaticEffect);
   ec.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   ec.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   ec.register('control.control.automatic', FG3dControlAutomaticEffect);
   ec.register('general.color.control', FG3dControlAutomaticEffect);
   ec.register('general.color.automatic', FG3dGeneralColorAutomaticEffect);
   ec.register('general.color.skeleton', FG3dGeneralColorSkeletonEffect);
   ec.register('general.color.skeleton.4', FG3dGeneralColorSkeletonEffect);
   ec.register('shadow.depth.automatic', FG3dShadowDepthAutomaticEffect);
   ec.register('shadow.depth.skeleton', FG3dShadowDepthSkeletonEffect);
   ec.register('shadow.color.automatic', FG3dShadowColorAutomaticEffect);
   ec.register('shadow.color.skeleton', FG3dShadowColorSkeletonEffect);
}
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
