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
   o = RClass.inherits(this, o, FG3dRenderable);
   o._renderable      = null;
   o._bones           = null;
   o.construct        = FGeometry3d_construct;
   o.testVisible      = FGeometry3d_testVisible;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.findTexture      = FGeometry3d_findTexture;
   o.bones            = FGeometry3d_bones;
   o.load             = FGeometry3d_load;
   o.build            = FGeometry3d_build;
   return o;
}
function FGeometry3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}
function FGeometry3d_testVisible(p){
   var r = this._renderable;
   return r ? r.testReady() : false;
}
function FGeometry3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FGeometry3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FGeometry3d_findTexture(p){
   return this._renderable.findTexture(p);
}
function FGeometry3d_bones(p){
   return this._bones;
}
function FGeometry3d_load(p){
   var o = this;
   o._effectName = p.material().effectName();
   o._renderable = p;
}
function FGeometry3d_build(p){
   var o = this;
   var r = o._renderable;
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   o._geometrys     = null;
   o._renderable    = null;
   o.testReady      = FModel3d_testReady;
   o.loadRenderable = FModel3d_loadRenderable;
   o.processLoad    = FModel3d_processLoad;
   o.process        = FModel3d_process;
   return o;
}
function FModel3d_testReady(){
   return this._dataReady;
}
function FModel3d_loadRenderable(p){
   var o = this;
   var c = o._context;
   var r = p.resource();
   var rgs = p.geometrys();
   if(rgs){
      var c = rgs.count();
      if(c > 0){
         var gs = o._geometrys = new TObjects();
         var rs = o.renderables();
         for(var i = 0; i < c; i++){
            var rg = rgs.get(i);
            var g = RClass.create(FGeometry3d);
            g.load(rg);
            gs.push(g);
            rs.push(g);
         }
      }
   }
   var a = null;
   var ra = r.animation();
   if(ra){
      a = o._animation = RClass.create(FRd3Animation);
      var rk = r.skeleton();
      var rbs = rk.bones();
      var c = rbs.count();
      for(var i = 0; i < c; i++){
         var rb = rbs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(rb);
         a.bones().set(b.id(), b);
      }
      a.loadResource(ra);
   }
   var gs = o._geometrys;
   if(gs){
      var c = gs.count();
      for(var i = 0; i < c; i++){
         gs.get(i).build(a);
      }
   }
   o._dataReady = true;
}
function FModel3d_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}
function FModel3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
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
function FModel3dConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FModel3dConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
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
   m._renderable = rm;
   if(rm.testReady()){
      m.load(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
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
   o._backgroundColor  = null;
   o._camera           = null;
   o._projection       = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o.construct         = FStage3d_construct;
   o.backgroundColor   = FStage3d_backgroundColor;
   o.camera            = FStage3d_camera;
   o.projection        = FStage3d_projection;
   o.directionalLight  = FStage3d_directionalLight;
   o.technique         = FStage3d_technique;
   o.selectTechnique   = FStage3d_selectTechnique;
   o.process           = FStage3d_process;
   return o;
}
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
   var rc = o._camera = RClass.create(FG3dCamera);
   rc.position().set(0, 0, -100);
   rc.lookAt(0, 0, 0);
   rc.update();
   var rp = o._projection = RClass.create(FG3dProjection);
   rp.update();
   rc._projection = rp;
   var dl = o._directionalLight = RClass.create(FG3dDirectionalLight);
   dl.direction().set(0, -1, 0);
   var r = o._region = RClass.create(FG3dRegion);
   r._camera = rc;
   r._projection = rp;
   r._directionalLight = dl;
}
function FStage3d_backgroundColor(){
   return this._backgroundColor;
}
function FStage3d_camera(){
   return this._camera;
}
function FStage3d_projection(){
   return this._projection;
}
function FStage3d_directionalLight(){
   return this._directionalLight;
}
function FStage3d_technique(){
   return this._technique;
}
function FStage3d_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}
function FStage3d_process(){
   var o = this;
   var r = o._region;
   o.__base.FStage.process.call(o);
   r.prepare();
   layer.filterRenderables(r);
   r.update();
   var bc = o._backgroundColor;
   o._technique._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o._technique.drawRegion(r);
}
