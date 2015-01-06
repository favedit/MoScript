function FGeometry3d(o){
   o = RClass.inherits(this, o, FRenderable);
   o._renderable      = null;
   o.construct        = FGeometry3d_construct;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.load             = FGeometry3d_load;
   return o;
}
function FGeometry3d_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
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
function FInstanceTexture(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._ready      = false;
   o._image      = null;
   o._texture    = null;
   o.onLoad      = FInstanceTexture_onLoad;
   o.construct   = FInstanceTexture_construct;
   o.linkContext = FInstanceTexture_linkContext;
   o.image       = FInstanceTexture_image;
   o.texture     = FInstanceTexture_texture;
   o.testReady   = FInstanceTexture_testReady;
   o.load        = FInstanceTexture_load;
   o.dispose     = FInstanceTexture_dispose;
   return o;
}
function FInstanceTexture_onLoad(p){
   var o = this;
   var t = o._texture = o._context.createFlatTexture();
   t.upload(p.image());
   o._ready  = true;
}
function FInstanceTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FInstanceTexture_linkContext(p){
   this._context = p;
}
function FInstanceTexture_image(){
   return this._image;
}
function FInstanceTexture_texture(){
   return this._texture;
}
function FInstanceTexture_testReady(){
   return this._ready;
}
function FInstanceTexture_load(u){
   var o = this;
   var g = o._image = RClass.create(FImage);
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u);
}
function FInstanceTexture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = null;
   o._texture = null;
}
function FInstanceTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._images   = null;
   o._textures = null;
   o._path     = '/assets/texture/';
   o.construct = FInstanceTextureConsole_construct;
   o.textures  = FInstanceTextureConsole_textures;
   o.load      = FInstanceTextureConsole_load;
   return o;
}
function FInstanceTextureConsole_construct(){
   var o = this;
   o._images = new TDictionary();
   o._textures = new TDictionary();
}
function FInstanceTextureConsole_textures(){
   return this._textures;
}
function FInstanceTextureConsole_load(pc, pn){
   var o = this;
   var t = o._textures.get(pn);
   if(t != null){
      return t;
   }
   var u = RBrowser.contentPath() + o._path + pn;
   t = RClass.create(FInstanceTexture);
   t.linkContext(pc);
   t._name = pn;
   t.load(u);
   o._textures.set(pn, t);
   return t;
}
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay);
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
   o.__base.FDisplay.construct.call(o);
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
   var tc = RConsole.find(FThreadConsole);
   var t = o._thread = RClass.create(FThread);
   t._interval = 0;
   t.lsnsProcess.register(o, o.onProcess);
   tc.start(t);
}
function FModel3dConsole_models(){
   return this._models;
}
function FModel3dConsole_alloc(pc, pn){
   var o = this;
   var rmc = RConsole.find(FRenderModelConsole);
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
function FRenderCube(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRenderCube_setup;
   return o;
}
function FRenderCube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
}
function FRenderGeometry(o){
   o = RClass.inherits(this, o, FRenderable);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FRenderGeometry_construct;
   o.findVertexBuffer = FRenderGeometry_findVertexBuffer;
   o.indexBuffer      = FRenderGeometry_indexBuffer;
   o.loadResource     = FRenderGeometry_loadResource;
   return o;
}
function FRenderGeometry_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRenderGeometry_findVertexBuffer(p){
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
function FRenderGeometry_indexBuffer(){
   return this._indexBuffer;
}
function FRenderGeometry_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
function FRenderModel(o){
   o = RClass.inherits(this, o, FRenderable);
   o._context    = null;
   o._dataReady  = false;
   o._geometrys  = null;
   o.onDataLoad  = FRenderModel_onDataLoad;
   o.construct   = FRenderModel_construct;
   o.geometrys   = FRenderModel_geometrys;
   o.testReady   = FRenderModel_testReady;
   o.testVisible = FRenderModel_testVisible;
   o.load        = FRenderModel_load;
   return o;
}
function FRenderModel_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._geometrys = new TObjects();
}
function FRenderModel_geometrys(){
   return this._geometrys;
}
function FRenderModel_testReady(){
   return this._dataReady;
}
function FRenderModel_testVisible(p){
   var o = this;
   return o._dataReady && o._visible;
}
function FRenderModel_onDataLoad(c){
   var o = this;
   var v = RClass.create(FDataView);
   v._endianCd = true;
   v.link(c.outputData());
   var rm = RClass.create(FRs3Model);
   rm.unserialize(v);
   var gs = rm.geometrys();
   var gc = gs.count();
   for(var n = 0; n < gc; n++){
      var g = gs.get(n);
      var mg = RClass.create(FRenderGeometry);
      mg.linkContext(o._context);
      mg.loadResource(g);
      o._geometrys.push(mg);
   }
   o._dataReady  = true;
}
function FRenderModel_load(u){
   var o = this;
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
function FRenderModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._models   = null;
   o._path     = '/assets/model/';
   o.construct = FRenderModelConsole_construct;
   o.models    = FRenderModelConsole_models;
   o.load      = FRenderModelConsole_load;
   return o;
}
function FRenderModelConsole_construct(){
   var o = this;
   o._models = new TDictionary();
}
function FRenderModelConsole_models(){
   return this._models;
}
function FRenderModelConsole_load(pc, pn){
   var o = this;
   var m = o._models.get(pn);
   if(m != null){
      return m;
   }
   var u = RBrowser.contentPath() + o._path + pn + '.ser'
   m = RClass.create(FRenderModel);
   m._context = pc;
   m._name = pn;
   m.load(u);
   o._models.set(pn, m);
   return m;
}
function FRenderPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FRenderPipeline_construct;
   o.findVertexBuffer = FRenderPipeline_findVertexBuffer;
   o.loadResource     = FRenderPipeline_loadResource;
   return o;
}
function FRenderPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRenderPipeline_findVertexBuffer(p){
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
function FRenderPipeline_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
function FRenderRectangle(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRenderRectangle_setup;
   return o;
}
function FRenderRectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 6);
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
   o._camera     = null;
   o,_projection = null;
   o.construct   = FStage3d_construct;
   o.camera      = FStage3d_camera;
   o.projection  = FStage3d_projection;
   return o;
}
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   var rc = o._camera = RClass.create(FRenderCamera);
   rc.position.set(0, 0, -100);
   rc.lookAt(0, 0, 0);
   rc.update();
   var rp = o._projection = RClass.create(FRenderProjection);
   rp.update();
   rc._projection = rp;
}
function FStage3d_camera(){
   return this._camera;
}
function FStage3d_projection(){
   return this._projection;
}
