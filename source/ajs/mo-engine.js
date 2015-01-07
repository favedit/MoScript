function FDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.filterRenderables = FDisplay_filterRenderables;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.process           = FDisplay_process;
   o.update            = FDisplay_update;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_isName(p){
   return this._name == p;
}
function FDisplay_name(){
   return this._name;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var r = this._renderables;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         var r = rs.get(n);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
   return true;
}
function FDisplay_renderables(){
   var o = this;
   var r = o._renderables;
   if(r == null){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDisplay_pushRenderable(p){
   this.renderables().push(p);
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.setTranslate(o._location.x, o._location.y, o._location.z);
   m.setRotation(o._rotation.x, o._rotation.y, o._rotation.z);
   m.setScale(o._scale.x, o._scale.y, o._scale.z);
   m.updateForce();
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         rs.get(n).update(m);
      }
   }
}
function FDisplay_process(){
   var o = this;
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         rs.get(n).process();
      }
   }
   return true;
}
function FDisplay_dispose(){
   var o = this;
   o._matrix = null;
   o._position = null;
   o._direction = null;
   o._scale = null;
   var rs = o._renderables;
   if(rs != null){
      rs.dispose();
      o._renderables = null
   }
   o.__base.FObject.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.construct         = FDisplayContainer_construct;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
}
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         if(c.isName(p)){
            return c;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         if(c.isName(p)){
            return c;
         }
         var r = c.searchDisplay(p);
         if(r != null){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_filterRenderables(p){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, p);
   if(!o._visible){
      return false;
   }
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var n = 0; n < c; n++){
         var d = ds.get(n);
         d.filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_process(){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var n = 0; n < c; n++){
         var d = ds.get(n);
         d.filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(r == null){
      r = o._displays = new TObjects();
   }
   return r;
}
function FDisplayContainer_pushDisplay(p){
   this.displays().push(p);
}
function FDisplayContainer_dispose(){
   var o = this;
   var cs = o._displays;
   if(cs != null){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         c.dispose();
      }
      cs.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o.construct = FDisplayLayer_construct;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.set    = FDrawable_set;
   return o;
}
function FDrawable_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
}
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._renderables = null;
   o.construct      = FRegion_construct;
   o.renderables    = FRegion_renderables;
   o.pushRenderable = FRegion_pushRenderable;
   o.clear          = FRegion_clear;
   o.dispose        = FRegion_dispose;
   return o;
}
function FRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = RClass.create(FRenderables);
}
function FRegion_renderables(p){
   return this._renderables;
}
function FRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FRegion_clear(){
   this._renderables.clear();
}
function FRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
function FRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._display    = null;
   o._context    = null;
   o._visible    = true;
   o.construct   = FRenderable_construct;
   o.linkContext = FRenderable_linkContext;
   o.testVisible = FRenderable_testVisible;
   o.update      = FRenderable_update;
   return o;
}
function FRenderable_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRenderable_linkContext(p){
   this._context = p;
}
function FRenderable_testVisible(p){
   return this._visible;
}
function FRenderable_update(p){
}
function FRenderables(o){
   o = RClass.inherits(this, o, FObject);
   o._renderables = null;
   o.construct    = FRenderables_construct;
   o.count        = FRenderables_count;
   o.get          = FRenderables_get;
   o.push         = FRenderables_push;
   o.clear        = FRenderables_clear;
   o.dispose      = FRenderables_dispose;
   return o;
}
function FRenderables_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
}
function FRenderables_count(p){
   return this._renderables.count();
}
function FRenderables_get(p){
   return this._renderables.get(p);
}
function FRenderables_push(p){
   this._renderables.push(p);
}
function FRenderables_clear(){
   this._renderables.clear();
}
function FRenderables_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
function FStage(o){
   o = RClass.inherits(this, o, FObject);
   o._layers   = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.construct     = FStage_construct;
   o.registerLayer = RStage_registerLayer;
   o.layers        = FStage_layers;
   o.process       = FStage_process;
   o.dispose       = FStage_dispose;
   return o;
}
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct(o);
   o._layers = new TDictionary();
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_registerLayer(n, l){
   var o = this;
   var ls = o._layers;
   if(ls == null){
      ls = o._layers = new TDictionary();
   }
   ls.set(n , l);
}
function FStage_layers(){
   return this._layers;
}
function FStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   var ss = o._stages;
   if(ss != null){
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         ss.value(n).process();
      }
   }
   o.lsnsLeaveFrame.process(o);
}
function FStage_dispose(){
   var o = this;
   if(o._layers){
      o._layers.dispose();
      o._layers = null;
   }
   o.__base.FObject.dispose(o);
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
function FRd3Cube(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRd3Cube_setup;
   return o;
}
function FRd3Cube_setup(p){
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
function FRd3Geometry(o){
   o = RClass.inherits(this, o, FRenderable);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FRd3Geometry_construct;
   o.findVertexBuffer = FRd3Geometry_findVertexBuffer;
   o.indexBuffer      = FRd3Geometry_indexBuffer;
   o.loadResource     = FRd3Geometry_loadResource;
   return o;
}
function FRd3Geometry_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Geometry_findVertexBuffer(p){
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
function FRd3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Geometry_loadResource(p){
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
function FRd3Model(o){
   o = RClass.inherits(this, o, FRenderable);
   o._context    = null;
   o._dataReady  = false;
   o._geometrys  = null;
   o.onDataLoad  = FRd3Model_onDataLoad;
   o.construct   = FRd3Model_construct;
   o.geometrys   = FRd3Model_geometrys;
   o.testReady   = FRd3Model_testReady;
   o.testVisible = FRd3Model_testVisible;
   o.load        = FRd3Model_load;
   return o;
}
function FRd3Model_onDataLoad(c){
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
      var mg = RClass.create(FRd3Geometry);
      mg.linkContext(o._context);
      mg.loadResource(g);
      o._geometrys.push(mg);
   }
   o._dataReady  = true;
}
function FRd3Model_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._geometrys = new TObjects();
}
function FRd3Model_geometrys(){
   return this._geometrys;
}
function FRd3Model_testReady(){
   return this._dataReady;
}
function FRd3Model_testVisible(p){
   var o = this;
   return o._dataReady && o._visible;
}
function FRd3Model_load(u){
   var o = this;
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
function FRd3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._models   = null;
   o._path     = '/assets/model/';
   o.construct = FRd3ModelConsole_construct;
   o.models    = FRd3ModelConsole_models;
   o.load      = FRd3ModelConsole_load;
   return o;
}
function FRd3ModelConsole_construct(){
   var o = this;
   o._models = new TDictionary();
}
function FRd3ModelConsole_models(){
   return this._models;
}
function FRd3ModelConsole_load(pc, pn){
   var o = this;
   var m = o._models.get(pn);
   if(m != null){
      return m;
   }
   var u = RBrowser.contentPath() + o._path + pn + '.ser'
   m = RClass.create(FRd3Model);
   m._context = pc;
   m._name = pn;
   m.load(u);
   o._models.set(pn, m);
   return m;
}
function FRd3Pipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FRd3Pipeline_construct;
   o.findVertexBuffer = FRd3Pipeline_findVertexBuffer;
   o.loadResource     = FRd3Pipeline_loadResource;
   return o;
}
function FRd3Pipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Pipeline_findVertexBuffer(p){
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
function FRd3Pipeline_loadResource(p){
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
function FRd3Rectangle(o){
   o = RClass.inherits(this, o, FObject);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup  = FRd3Rectangle_setup;
   return o;
}
function FRd3Rectangle_setup(p){
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
function FRd3Texture(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._ready      = false;
   o._image      = null;
   o._texture    = null;
   o.onLoad      = FRd3Texture_onLoad;
   o.construct   = FRd3Texture_construct;
   o.linkContext = FRd3Texture_linkContext;
   o.image       = FRd3Texture_image;
   o.texture     = FRd3Texture_texture;
   o.testReady   = FRd3Texture_testReady;
   o.load        = FRd3Texture_load;
   o.dispose     = FRd3Texture_dispose;
   return o;
}
function FRd3Texture_onLoad(p){
   var o = this;
   var t = o._texture = o._context.createFlatTexture();
   t.upload(p.image());
   o._ready  = true;
}
function FRd3Texture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRd3Texture_linkContext(p){
   this._context = p;
}
function FRd3Texture_image(){
   return this._image;
}
function FRd3Texture_texture(){
   return this._texture;
}
function FRd3Texture_testReady(){
   return this._ready;
}
function FRd3Texture_load(u){
   var o = this;
   var g = o._image = RClass.create(FImage);
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u);
}
function FRd3Texture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = null;
   o._texture = null;
}
function FRd3TextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._images   = null;
   o._textures = null;
   o._path     = '/assets/texture/';
   o.construct = FRd3TextureConsole_construct;
   o.textures  = FRd3TextureConsole_textures;
   o.load      = FRd3TextureConsole_load;
   return o;
}
function FRd3TextureConsole_construct(){
   var o = this;
   o._images = new TDictionary();
   o._textures = new TDictionary();
}
function FRd3TextureConsole_textures(){
   return this._textures;
}
function FRd3TextureConsole_load(pc, pn){
   var o = this;
   var t = o._textures.get(pn);
   if(t != null){
      return t;
   }
   var u = RBrowser.contentPath() + o._path + pn;
   t = RClass.create(FRd3Texture);
   t.linkContext(pc);
   t._name = pn;
   t.load(u);
   o._textures.set(pn, t);
   return t;
}
