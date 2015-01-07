function FDisplay3d(o){
   o = RClass.inherits(this, o, FDisplay);
   o._materials = null;
   o.construct  = FDisplay3d_construct;
   o.materials  = FDisplay3d_materials;
   o.dispose    = FDisplay3d_dispose;
   return o;
}
function FDisplay3d_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._materials = new TDictionary();
}
function FDisplay3d_materials(){
   return this._materials;
}
function FDisplay3d_dispose(){
   var o = this;
   o._materials = null;
   o.__base.FDisplay.dispose.call(o);
}
function FGeometry3d(o){
   o = RClass.inherits(this, o, FRenderable3d);
   o._renderable      = null;
   o.construct        = FGeometry3d_construct;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.load             = FGeometry3d_load;
   return o;
}
function FGeometry3d_construct(){
   var o = this;
   o.__base.FRenderable3d.construct.call(o);
}
function FGeometry3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FGeometry3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FGeometry3d_load(p){
   var o = this;
   o._renderable = p;
}
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._statusReady = false;
   o._renderables = null;
   o._resource    = null;
   o.construct    = FModel3d_construct;
   o.testReady    = FModel3d_testReady;
   o.load         = FModel3d_load;
   return o;
}
function FModel3d_construct(){
   var o = this;
   o.__base.FDisplay3d.construct.call(o);
   o._renderables = new TObjects();
}
function FModel3d_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}
function FModel3d_testReady(){
   var o = this;
   if(!o._statusReady){
      if(o._resource.testReady()){
         o.load(o._resource);
         o._statusReady = true;
      }
   }
   return o._statusReady;
}
function FModel3d_load(p){
   var o = this;
   var c = o._context;
   var gs = p.geometrys();
   var gc = gs.count();
   for(var n = 0; n < gc; n++){
      var rg = gs.get(n);
      var g = RClass.create(FGeometry3d);
      g.load(rg);
      o._renderables.push(g);
   }
}
function FModel3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FModel3dConsole_onProcess;
   o.construct   = FModel3dConsole_construct;
   o.models      = FModel3dConsole_models;
   o.alloc       = FModel3dConsole_alloc;
   return o;
}
function FModel3dConsole_construct(){
   var o = this;
   o._loadModels = new TObjects();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FModel3dConsole_models(){
   return this._models;
}
function FModel3dConsole_alloc(pc, pn){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   var rm = rmc.load(pc, pn);
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._resource = rm;
   if(rm.testReady()){
      m.load(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FModel3dConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   var c = ms.count();
   for(var n = 0; n < c; n++){
      var m = ms.get(n);
      if(m.testReady()){
         ms.erase(n);
         break;
      }
   }
}
function FRenderable3d(o){
   o = RClass.inherits(this, o, FRenderable);
   o._matrix        = null;
   o._effectName    = null;
   o._effect        = null;
   o._materialName  = null;
   o._referMaterial = null;
   o._material      = null;
   o.construct      = FRenderable3d_construct;
   o.matrix         = FRenderable3d_matrix;
   o.material       = FRenderable3d_material;
   o.update         = FRenderable3d_update;
   return o;
}
function FRenderable3d_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}
function FRenderable3d_matrix(){
   return this._matrix;
}
function FRenderable3d_material(){
   return this._material;
}
function FRenderable3d_update(p){
   var o = this;
   o.__base.FRenderable.update.call(o, p);
   o._matrix.assign(p);
}
function FSimpleStage3d(o){
   o = RClass.inherits(this, o, FStage3d);
   o,_skyLayer    = null;
   o,_mapLayer    = null;
   o,_spriteLayer = null;
   o,_faceLayer   = null;
   o.construct    = FSimpleStage3d_construct;
   o.skyLayer     = FSimpleStage3d_skyLayer;
   o.mapLayer     = FSimpleStage3d_mapLayer;
   o.spriteLayer  = FSimpleStage3d_spriteLayer;
   o.faceLayer    = FSimpleStage3d_faceLayer;
   return o;
}
function FSimpleStage3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', l);
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('face', l);
}
function FSimpleStage3d_skyLayer(){
   return this._skyLayer;
}
function FSimpleStage3d_mapLayer(){
   return this._mapLayer;
}
function FSimpleStage3d_spriteLayer(){
   return this._spriteLayer;
}
function FSimpleStage3d_faceLayer(){
   return this._faceLayer;
}
function FSprite3d(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._visible    = true;
   o.linkContext = FSprite3d_linkContext;
   o.testVisible = FSprite3d_testVisible;
   return o;
}
function FSprite3d_linkContext(p){
   this._context = p;
}
function FSprite3d_testVisible(p){
   return this._visible;
}
function FStage3d(o){
   o = RClass.inherits(this, o, FStage);
   o._camera         = null;
   o._projection     = null;
   o._technique      = null;
   o.construct       = FStage3d_construct;
   o.technique       = FStage3d_technique;
   o.selectTechnique = FStage3d_selectTechnique;
   o.camera          = FStage3d_camera;
   o.projection      = FStage3d_projection;
   return o;
}
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   var rc = o._camera = RClass.create(FG3dCamera);
   rc.position.set(0, 0, -100);
   rc.lookAt(0, 0, 0);
   rc.update();
   var rp = o._projection = RClass.create(FG3dProjection);
   rp.update();
   rc._projection = rp;
}
function FStage3d_technique(){
   return this._technique;
}
function FStage3d_selectTechnique(p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(null, p);
}
function FStage3d_camera(){
   return this._camera;
}
function FStage3d_projection(){
   return this._projection;
}
