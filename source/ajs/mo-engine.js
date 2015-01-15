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
      for(var i = 0; i < c; i++){
         rs.get(i).process();
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
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         ds.get(i).process(p);
      }
   }
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
   o._statusActive = false;
   o.construct     = FDisplayLayer_construct;
   o.active        = FDisplayLayer_active;
   o.deactive      = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
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
function FStage(o){
   o = RClass.inherits(this, o, FObject);
   o._statusActive  = false;
   o._layers        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.construct     = FStage_construct;
   o.registerLayer = RStage_registerLayer;
   o.layers        = FStage_layers;
   o.active        = FStage_active;
   o.deactive      = FStage_deactive;
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
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).active();
      }
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).deactive();
      }
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).process();
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
            var g = RClass.create(FModelRenderable3d);
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
function FModelRenderable3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FModelRenderable3d_construct;
   o.testVisible       = FModelRenderable3d_testVisible;
   o.findVertexBuffer  = FModelRenderable3d_findVertexBuffer;
   o.vertexBuffers     = FModelRenderable3d_vertexBuffers;
   o.indexBuffer       = FModelRenderable3d_indexBuffer;
   o.findTexture       = FModelRenderable3d_findTexture;
   o.textures          = FModelRenderable3d_textures;
   o.bones             = FModelRenderable3d_bones;
   o.load              = FModelRenderable3d_load;
   o.build             = FModelRenderable3d_build;
   return o;
}
function FModelRenderable3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}
function FModelRenderable3d_testVisible(p){
   var o = this;
   var r = o._ready;
   if(!r){
      var d = o._renderable;
      if(d){
         r = o._ready = d.testReady();
      }
   }
   return r;
}
function FModelRenderable3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FModelRenderable3d_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FModelRenderable3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FModelRenderable3d_findTexture(p){
   return this._renderable.findTexture(p);
}
function FModelRenderable3d_textures(){
   return this._renderable.textures();
}
function FModelRenderable3d_bones(p){
   return this._bones;
}
function FModelRenderable3d_load(p){
   var o = this;
   var m = o._material;
   var mr = o._materialResource = p.material();
   m.assignInfo(mr.info());
   o._effectName = m.info().effectName;
   o._renderable = p;
}
function FModelRenderable3d_build(p){
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
function FScene3d(o){
   o = RClass.inherits(this, o, FStage3d);
   o._dataReady            = false;
   o._resource             = null;
   o._skyLayer             = null;
   o._mapLayer             = null;
   o._spaceLayer           = null;
   o._lsnsLoad             = null;
   o.onKeyDown             = FScene3d_onKeyDown;
   o.construct             = FScene3d_construct;
   o.loadListener          = FScene3d_loadListener;
   o.loadTechniqueResource = FScene3d_loadTechniqueResource;
   o.loadRegionResource    = FScene3d_loadRegionResource
   o.loadDisplayResource   = FScene3d_loadDisplayResource
   o.loadSkyResource       = FScene3d_loadSkyResource
   o.loadMapResource       = FScene3d_loadMapResource
   o.loadSpaceResource     = FScene3d_loadSpaceResource
   o.loadResource          = FScene3d_loadResource
   o.processLoad           = FScene3d_processLoad;
   o.active                = FScene3d_active;
   o.deactive              = FScene3d_deactive;
   return o;
}
function FScene3d_onKeyDown(e){
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
function FScene3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spaceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('space', l);
}
function FScene3d_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FScene3d_loadTechniqueResource(p){
}
function FScene3d_loadRegionResource(p){
   var o = this;
   o._backgroundColor.assign(p.color());
   var rc = p.camera();
   var c = o._camera;
   c.position().assign(rc.position());
   c.direction().assign(rc.direction());
   c.update();
   var rv = rc.viewport();
   var v = o._projection;
   v.angle = rv.angle();
   v.znear = rv.znear();
   v.zfar = rv.zfar();
}
function FScene3d_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RClass.create(FSceneDisplay3d);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FTemplate3dConsole).load(d3, pd.code());
   pl.pushDisplay(d3);
}
function FScene3d_loadSkyResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}
function FScene3d_loadMapResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._mapLayer, d);
      }
   }
}
function FScene3d_loadSpaceResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}
function FScene3d_loadResource(p){
   var o = this;
   o.loadTechniqueResource(p.technique());
   o.loadRegionResource(p.region());
   o.loadSkyResource(p.sky());
   o.loadMapResource(p.map());
   o.loadSpaceResource(p.space());
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FScene3d_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FScene3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FScene3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
}
function FScene3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadScenes = null;
   o._scenes     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FScene3dConsole_onProcess;
   o.construct   = FScene3dConsole_construct;
   o.scenes      = FScene3dConsole_scenes;
   o.alloc       = FScene3dConsole_alloc;
   return o;
}
function FScene3dConsole_onProcess(){
   var o = this;
   var ms = o._loadScenes;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FScene3dConsole_construct(){
   var o = this;
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FScene3dConsole_scenes(){
   return this._scenes;
}
function FScene3dConsole_alloc(pc, pn){
   var o = this;
   var rsc = RConsole.find(FRs3SceneConsole);
   var rs = rsc.load(pn);
   var s = RClass.create(FScene3d);
   s._context = pc;
   s._name = pn;
   s._resource = rs;
   if(rs.testReady()){
      s.load(rs);
   }else{
      o._loadScenes.push(s);
   }
   return s;
}
function FSceneDisplay3d(o){
   o = RClass.inherits(this, o, FTemplate3d);
   o._dataReady        = false;
   o._movieMatrix      = null;
   o._modelMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._movies           = null;
   o.construct         = FSceneDisplay3d_construct;
   o.loadSceneResource = FSceneDisplay3d_loadSceneResource;
   o.loadResource      = FSceneDisplay3d_loadResource;
   o.process           = FSceneDisplay3d_process;
   return o;
}
function FSceneDisplay3d_construct(){
   var o = this;
   o.__base.FTemplate3d.construct.call(o);
   o._movieMatrix = new SMatrix3d();
   o._modelMatrix = new SMatrix3d();
}
function FSceneDisplay3d_loadSceneResource(p){
   var o = this;
   o._resource = p;
   o._modelMatrix.assign(p.matrix());
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneMaterial3d);
         m.loadSceneResource(rm);
         ms.set(rm.code(), m);
      }
   }
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FSceneDisplayMovie3d);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}
function FSceneDisplay3d_loadResource(p){
   var o = this;
   var ms = o._materials;
   var rds = p.renderables();
   var c = rds.count();
   if(c > 0){
      var rs = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var mc = rd.materialCode();
         var r = RClass.create(FSceneDisplayRenderable3d);
         r._display = o;
         r._context = o._context;
         r.loadResource(rd);
         rs.push(r);
         var m = ms.get(mc);
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}
function FSceneDisplay3d_process(p){
   var o = this;
   o.__base.FTemplate3d.process.call(o, p);
   o._matrix.identity();
   var ms = o._movies;
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         ms.get(i).process(o._movieMatrix);
      }
      o._matrix.append(o._movieMatrix);
   }
   o._matrix.append(o._modelMatrix);
}
function FSceneDisplayMovie3d(o){
   o = RClass.inherits(this, o, FObject);
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   o.loadResource = FSceneDisplayMovie3d_loadResource;
   o.process      = FSceneDisplayMovie3d_process;
   return o;
}
function FSceneDisplayMovie3d_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}
function FSceneDisplayMovie3d_process(p){
   var o = this;
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
   }
   var ct = RTimer.current();
   var sp = ct - o._lastTick;
   if(sp > o._interval){
      if(o._resource._typeName == 'rotation'){
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
function FSceneDisplayRenderable3d(o){
   o = RClass.inherits(this, o, FTemplateRenderable3d);
   o.loadMaterial = FSceneDisplayRenderable3d_loadMaterial;
   return o;
}
function FSceneDisplayRenderable3d_loadMaterial(p){
   var o = this;
   var pi = p.info();
   o._material.info().assign(pi);
}
function FSceneMaterial3d(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._resource         = null;
   o.loadSceneResource = FSceneMaterial3d_loadSceneResourcee
   return o;
}
function FSceneMaterial3d_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   o._name = p.code();
   o._info.assign(p.info());
}
function FSimpleStage3d(o){
   o = RClass.inherits(this, o, FStage3d);
   o,_skyLayer    = null;
   o,_mapLayer    = null;
   o,_spriteLayer = null;
   o,_faceLayer   = null;
   o.onKeyDown    = FSimpleStage3d_onKeyDown;
   o.construct    = FSimpleStage3d_construct;
   o.skyLayer     = FSimpleStage3d_skyLayer;
   o.mapLayer     = FSimpleStage3d_mapLayer;
   o.spriteLayer  = FSimpleStage3d_spriteLayer;
   o.faceLayer    = FSimpleStage3d_faceLayer;
   o.active       = FSimpleStage3d_active;
   o.deactive     = FSimpleStage3d_deactive;
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
function FSimpleStage3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FSimpleStage3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
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
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).filterRenderables(r);
      }
   }
   r.update();
   var bc = o._backgroundColor;
   o._technique._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o._technique.drawRegion(r);
}
function FTemplate3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady           = false;
   o._ready               = false;
   o._resource            = null;
   o._animation           = null;
   o._resource            = null;
   o._templateRenderables = null;
   o.testReady            = FTemplate3d_testReady;
   o.setResource          = FTemplate3d_setResource;
   o.loadResource         = FTemplate3d_loadResource;
   o.processLoad          = FTemplate3d_processLoad;
   o.process              = FTemplate3d_process;
   return o;
}
function FTemplate3d_testReady(){
   return this._dataReady;
}
function FTemplate3d_setResource(p){
   this._resource = p;
}
function FTemplate3d_loadResource(p){
   var o = this;
   var rs = p.renderables();
   var c = rs.count();
   if(c > 0){
      var r3s = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var r3 = RClass.create(FTemplateRenderable3d);
         r3._display = o;
         r3._context = o._context;
         r3.loadResource(r);
         r3s.push(r3);
      }
   }
}
function FTemplate3d_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   var r3s = o._templateRenderables;
   var c = r3s.count();
   for(var i = 0; i < c; i++){
      var r3 = r3s.get(i);
      if(!r3.testReady()){
         return false;
      }
   }
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r3 = r3s.get(i);
         r3.load();
         o._renderables.push(r3);
      }
   }
   o._ready = true;
   return o._ready;
}
function FTemplate3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FTemplate3dConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadTemplates = null;
   o._templates     = null;
   o._thread        = null;
   o._interval      = 100;
   o.onProcess      = FTemplate3dConsole_onProcess;
   o.construct      = FTemplate3dConsole_construct;
   o.templates      = FTemplate3dConsole_templates;
   o.alloc          = FTemplate3dConsole_alloc;
   o.load           = FTemplate3dConsole_load;
   return o;
}
function FTemplate3dConsole_onProcess(){
   var o = this;
   var ms = o._loadTemplates;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FTemplate3dConsole_construct(){
   var o = this;
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FTemplate3dConsole_templates(){
   return this._templates;
}
function FTemplate3dConsole_alloc(pc, pn){
   var o = this;
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   var t = RClass.create(FTemplate3d);
   t._context = pc;
   t._name = pn;
   t.setResource(rt);
   o._loadTemplates.push(t);
   return t;
}
function FTemplate3dConsole_load(pt, pn){
   var o = this;
   var rtc = RConsole.find(FRs3TemplateConsole);
   var rt = rtc.load(pn);
   pt._name = pn;
   pt.setResource(rt);
   o._loadTemplates.push(pt);
}
function FTemplateRenderable3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._display          = null;
   o._modelMatrix      = null;
   o._resource         = null;
   o._model            = null;
   o._renderable       = null;
   o._bones            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FTemplateRenderable3d_construct;
   o.testReady         = FTemplateRenderable3d_testReady;
   o.testVisible       = FTemplateRenderable3d_testVisible;
   o.findVertexBuffer  = FTemplateRenderable3d_findVertexBuffer;
   o.vertexBuffers     = FTemplateRenderable3d_vertexBuffers;
   o.indexBuffer       = FTemplateRenderable3d_indexBuffer;
   o.findTexture       = FTemplateRenderable3d_findTexture;
   o.textures          = FTemplateRenderable3d_textures;
   o.bones             = FTemplateRenderable3d_bones;
   o.loadResource      = FTemplateRenderable3d_loadResource;
   o.load              = FTemplateRenderable3d_load;
   o.build             = FTemplateRenderable3d_build;
   o.update            = FTemplateRenderable3d_update;
   return o;
}
function FTemplateRenderable3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
   o._modelMatrix = new SMatrix3d();
}
function FTemplateRenderable3d_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   return true;
}
function FTemplateRenderable3d_testVisible(p){
   return this._ready;
}
function FTemplateRenderable3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FTemplateRenderable3d_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FTemplateRenderable3d_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FTemplateRenderable3d_findTexture(p){
   return this._renderable.findTexture(p);
}
function FTemplateRenderable3d_textures(){
   return this._renderable.textures();
}
function FTemplateRenderable3d_bones(p){
   return this._bones;
}
function FTemplateRenderable3d_loadResource(p){
   var o = this;
   o._resource = p;
   var mc = p.modelCode();
   o._model = RConsole.find(FRd3ModelConsole).load(o._context, mc);
   var mc = p.materialCode();
   var mt = o._materialResource = RConsole.find(FRs3ThemeConsole).find(mc);
   o._effectName = mt.info().effectName;
   o._modelMatrix.assign(p.matrix());
}
function FTemplateRenderable3d_load(){
   var o = this;
   var r = o._resource;
   var gi = r.geometryIndex()
   o._renderable = o._model.geometrys().get(gi);
   o._ready = true;
}
function FTemplateRenderable3d_build(p){
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
function FTemplateRenderable3d_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
function FRs3Animation(o){
   o = RClass.inherits(this, o, FObject);
   o._frameCount = 0;
   o._frameTick  = 0;
   o._frameSpan  = 0;
   o._tracks     = null;
   o.construct   = FRs3Animation_construct;
   o.tracks      = FRs3Animation_tracks;
   o.unserialize = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var c = p.readUint16();
   if(c > 0){
      var ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._id         = 0;
   o._bones      = null;
   o._track      = null;
   o.id          = FRs3Bone_id;
   o.bones       = FRs3Bone_bones;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   o.unserialize = FRs3Bone_unserialize;
   return o;
}
function FRs3Bone_id(){
   return this._id;
}
function FRs3Bone_bones(){
   return this._bones;
}
function FRs3Bone_track(){
   return this._track;
}
function FRs3Bone_setTrack(p){
   this._track = p;
}
function FRs3Bone_unserialize(p){
   var o = this;
   o._id = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         bs.push(b);
      }
   }
}
function FRs3Frame(o){
   o = RClass.inherits(this, o, FObject);
   o._tick        = 0;
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   o.construct    = FRs3Frame_construct;
   o.tick         = FRs3Frame_tick;
   o.translation  = FRs3Frame_translation;
   o.quaternion   = FRs3Frame_quaternion;
   o.scale        = FRs3Frame_scale;
   o.unserialize  = FRs3Frame_unserialize;
   return o;
}
function FRs3Frame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._translation = new SPoint3();
   o._quaternion = new SQuaternion();
   o._scale = new SVector3();
}
function FRs3Frame_tick(){
   return this._tick;
}
function FRs3Frame_translation(){
   return this._translation;
}
function FRs3Frame_quaternion(){
   return this._quaternion;
}
function FRs3Frame_scale(){
   return this._scale;
}
function FRs3Frame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._translation.unserialize(p);
   o._quaternion.unserialize(p);
   o._scale.unserialize(p);
}
function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._matrix          = null;
   o._outline         = null;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   o.construct        = FRs3Geometry_construct;
   o.materialCode     = FRs3Geometry_materialCode;
   o.findVertexBuffer = FRs3Geometry_findVertexBuffer;
   o.vertexBuffers    = FRs3Geometry_vertexBuffers;
   o.indexBuffer      = FRs3Geometry_indexBuffer;
   o.boneIds          = FRs3Geometry_boneIds;
   o.track            = FRs3Geometry_track;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
   o._vertexBuffers = new TObjects();
}
function FRs3Geometry_materialCode(){
   return this._materialCode;
}
function FRs3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   if(vs){
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
   }
   return null;
}
function FRs3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRs3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRs3Geometry_boneIds(){
   return this._boneIds;
}
function FRs3Geometry_track(){
   return this._track;
}
function FRs3Geometry_unserialize(p){
   var o = this;
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._matrix.unserialize(p);
   o._outline.unserialize(p);
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   if(vc > 0){
      var vs = o._vertexBuffers = new TObjects();
      for(var i = 0; i < vc; i++){
         var vb = RClass.create(FRs3VertexBuffer);
         vb._vertexCount = o._vertexCount;
         vb.unserialize(p)
         vs.push(vb);
      }
   }
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
   var bc = p.readInt8();
   if(bc > 0){
      var bs = o._boneIds = new TArray();
      for(var i = 0; i < bc; i++){
         bs.push(p.readUint8());
      }
   }
   if(p.readBoolean()){
      var k = o._track = RClass.create(FRs3Track);
      k.unserialize(p);
   }
}
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = EG3dIndexStride.Unknown;
   o._memory      = null;
   o._data        = null;
   o.count        = FRs3IndexBuffer_count;
   o.strideCd     = FRs3IndexBuffer_strideCd;
   o.memory       = FRs3IndexBuffer_memory;
   o.data         = FRs3IndexBuffer_data;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}
function FRs3IndexBuffer_count(){
   return this._count;
}
function FRs3IndexBuffer_strideCd(){
   return this._strideCd;
}
function FRs3IndexBuffer_memory(){
   return this._memory;
}
function FRs3IndexBuffer_data(){
   return this._data;
}
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   var c = o._count = p.readInt32();
   var sc = o._strideCd = p.readInt8();
   if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(2 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint16();
      }
   }else if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(4 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint32();
      }
   }else{
      throw new TError('Unknown stride type. (stride_cd={1})', sc);
   }
}
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code       = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3Material_code(){
   return this._code;
}
function FRs3Material_effectName(){
   return this._info.effectName;
}
function FRs3Material_info(){
   return this._info;
}
function FRs3Material_textures(){
   return this._textures;
}
function FRs3Material_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._info.unserialize(p);
   var c = p.readInt8();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code        = null;
   o._textureCode = null;
   o._bitmapCode  = null;
   o.code         = FRs3MaterialTexture_code;
   o.textureCode  = FRs3MaterialTexture_textureCode;
   o.bitmapCode   = FRs3MaterialTexture_bitmapCode;
   o.unserialize  = FRs3MaterialTexture_unserialize;
   return o;
}
function FRs3MaterialTexture_code(){
   return this._code;
}
function FRs3MaterialTexture_textureCode(){
   return this._textureCode;
}
function FRs3MaterialTexture_bitmapCode(){
   return this._bitmapCode;
}
function FRs3MaterialTexture_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._textureCode = p.readString();
   o._bitmapCode = p.readString();
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.geometrys   = FRs3Model_geometrys;
   o.skeleton    = FRs3Model_skeleton;
   o.animation   = FRs3Model_animation;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_geometrys(){
   return this._geometrys;
}
function FRs3Model_skeleton(){
   return this._skeleton;
}
function FRs3Model_animation(){
   return this._animation;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   if(gc > 0){
      var gs = o._geometrys = new TObjects();
      for(var i = 0; i < gc; i++){
         var g = RClass.create(FRs3Geometry);
         g.unserialize(p);
         gs.push(g);
      }
   }
   var sk = null;
   if(p.readBoolean()){
      sk = o._skeleton = RClass.create(FRs3Skeleton);
      sk.unserialize(p);
   }
   var tc = 0;
   if(p.readBoolean()){
      var am = o._animation = RClass.create(FRs3Animation);
      am.unserialize(p);
      var ts = am.tracks();
      tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         var b = sk.find(t.boneId());
         b.setTrack(t);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, geometry_count={2}, track_count={3})", o._name, gc, tc);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models   = null;
   o._path     = '/assets/model/'
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
}
function FRs3ModelConsole_load(p){
   var o = this;
   var r = o._models.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Model);
      r.load(u);
      o._models.set(p, r);
   }
   return r;
}
function FRs3Resource(o){
   o = RClass.inherits(this, o, FResource);
   o._dataReady   = false;
   o._dataSize    = 0;
   o._lsnsLoad    = null;
   o.onLoad       = FRs3Resource_onLoad;
   o.loadListener = FRs3Resource_loadListener;
   o.testReady    = FRs3Resource_testReady;
   o.unserialize  = FRs3Resource_unserialize;
   o.load         = FRs3Resource_load;
   return o;
}
function FRs3Resource_onLoad(p){
   var o = this;
   var v = RClass.create(FDataView);
   v.setEndianCd(true);
   v.link(p.outputData());
   o.unserialize(v);
   v.dispose();
   o._dataReady = true;
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FRs3Resource_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FRs3Resource_testReady(){
   return this._dataReady;
}
function FRs3Resource_unserialize(p){
   this._name = p.readString();
}
function FRs3Resource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._sky        = null;
   o._map        = null;
   o._space      = null;
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.sky         = FRs3Scene_sky;
   o.map         = FRs3Scene_map;
   o.space       = FRs3Scene_space;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._sky = RClass.create(FRs3SceneSky);
   o._map = RClass.create(FRs3SceneMap);
   o._space = RClass.create(FRs3SceneSpace);
}
function FRs3Scene_technique(){
   return this._technique;
}
function FRs3Scene_region(){
   return this._region;
}
function FRs3Scene_sky(){
   return this._sky;
}
function FRs3Scene_map(){
   return this._map;
}
function FRs3Scene_space(){
   return this._space;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   o._sky.unserialize(p);
   o._map.unserialize(p);
   o._space.unserialize(p);
}
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._viewport    = null;
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.viewport     = FRs3SceneCamera_viewport;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._viewport = RClass.create(FRs3SceneViewport);
}
function FRs3SceneCamera_typeName(){
   return this._typeName;
}
function FRs3SceneCamera_position(){
   return this._position;
}
function FRs3SceneCamera_direction(){
   return this._direction;
}
function FRs3SceneCamera_viewport(){
   return this._viewport;
}
function FRs3SceneCamera_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._centerFront = p.readFloat();
   o._centerBack = p.readFloat();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._focalNear = p.readFloat();
   o._focalFar = p.readFloat();
   o._viewport.unserialize(p);
}
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes   = null;
   o._path     = '/assets/scene/'
   o.construct = FRs3SceneConsole_construct;
   o.load      = FRs3SceneConsole_load;
   return o;
}
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FRs3SceneConsole_load(p){
   var o = this;
   var r = o._scenes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Scene);
      r.load(u);
      o._scenes.set(p, r);
   }
   return r;
}
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._code                = null;
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   o._matrix              = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   o.construct            = FRs3SceneDisplay_construct;
   o.code                 = FRs3SceneDisplay_code;
   o.matrix               = FRs3SceneDisplay_matrix;
   o.movies               = FRs3SceneDisplay_movies;
   o.materials            = FRs3SceneDisplay_materials;
   o.renderables          = FRs3SceneDisplay_renderables;
   o.unserialize          = FRs3SceneDisplay_unserialize;
   return o;
}
function FRs3SceneDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3SceneDisplay_code(){
   return this._code;
}
function FRs3SceneDisplay_matrix(){
   return this._matrix;
}
function FRs3SceneDisplay_movies(){
   return this._movies;
}
function FRs3SceneDisplay_materials(){
   return this._materials;
}
function FRs3SceneDisplay_renderables(){
   return this._renderables;
}
function FRs3SceneDisplay_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._optionMergeVertex = p.readBoolean();
   o._optionMergeMaterial = p.readBoolean();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMovie);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var ms = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
function FRs3SceneLight(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName           = null;
   o._optionTrack        = null;
   o._shadow1            = null;
   o._shadow2            = null;
   o._shadow3            = null;
   o._shadowAmbientMin   = null;
   o._shadowAmbientMax   = null;
   o._shadowAmbientThick = null;
   o._shadowAmbientRange = null;
   o._shadowMerge1Base   = null;
   o._shadowMerge1Rate   = null;
   o._shadowMerge2Base   = null;
   o._shadowMerge2Rate   = null;
   o._material           = null;
   o._camera             = null;
   o.construct           = FRs3SceneLight_construct;
   o.typeName            = FRs3SceneLight_typeName;
   o.unserialize         = FRs3SceneLight_unserialize;
   return o;
}
function FRs3SceneLight_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._shadow1 = new SRs3SceneShadow();
   o._shadow2 = new SRs3SceneShadow();
   o._shadow3 = new SRs3SceneShadow();
   o._material = RClass.create(FRs3SceneMaterial);
   o._camera = RClass.create(FRs3SceneCamera);
}
function FRs3SceneLight_typeName(){
   return this._typeName;
}
function FRs3SceneLight_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._optionTrack = p.readInt32();
   o._shadow1.unserialize(p);
   o._shadow2.unserialize(p);
   o._shadow3.unserialize(p);
   o._shadowAmbientMin = p.readFloat();
   o._shadowAmbientMax = p.readFloat();
   o._shadowAmbientThick = p.readFloat();
   o._shadowAmbientRange = p.readFloat();
   o._shadowMerge1Base = p.readFloat();
   o._shadowMerge1Rate = p.readFloat();
   o._shadowMerge2Base = p.readFloat();
   o._shadowMerge2Rate = p.readFloat();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FRs3SceneMap(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._code               = null;
   o._label              = null;
   o._info               = null;
   o._heightDepth        = null;
   o._surfaceRate        = null;
   o._surfaceReflect     = null;
   o._surfaceBright      = null;
   o._surfaceBrightLevel = null;
   o._surfaceCoarse      = null;
   o._surfaceCoarseLevel = null;
   o._surfaceMerge       = null;
   o._surfacePower       = null;
   o.construct           = FRs3SceneMaterial_construct;
   o.code                = FRs3SceneMaterial_code;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
   return o;
}
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3SceneMaterial_code(){
   return this._code;
}
function FRs3SceneMaterial_info(){
   return this._info;
}
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._label = p.readString();
   o._info.unserialize(p);
   o._heightDepth = p.readFloat();
   o._surfaceRate = p.readFloat();
   o._surfaceReflect = p.readFloat();
   o._surfaceBright = p.readFloat();
   o._surfaceBrightLevel = p.readFloat();
   o._surfaceCoarse = p.readFloat();
   o._surfaceCoarseLevel = p.readFloat();
   o._surfaceMerge = p.readFloat();
   o._surfacePower = p.readFloat();
}
function FRs3SceneMovie(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName   = null;
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FRs3SceneMovie_construct;
   o.typeName    = FRs3SceneMovie_typeName;
   o.unserialize = FRs3SceneMovie_unserialize;
   return o;
}
function FRs3SceneMovie_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
}
function FRs3SceneMovie_typeName(){
   return this._typeName;
}
function FRs3SceneMovie_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._color          = null;
   o._colorLevel     = null;
   o._fogNear        = null;
   o._fogFar         = null;
   o._fogRate        = null;
   o._fogAttenuation = null;
   o._fogColor       = null;
   o._edgeRate       = null;
   o._edgeLevel      = null;
   o._edgeWidth      = null;
   o._edgeColor      = null;
   o._faceRange      = null;
   o._faceLimit      = null;
   o._faceRate       = null;
   o._camera         = null;
   o._light          = null;
   o.construct       = FRs3SceneRegion_construct;
   o.color           = FRs3SceneRegion_color;
   o.camera          = FRs3SceneRegion_camera;
   o.light           = FRs3SceneRegion_light;
   o.unserialize     = FRs3SceneRegion_unserialize;
   return o;
}
function FRs3SceneRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._color = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FRs3SceneCamera);
   o._light = RClass.create(FRs3SceneLight);
}
function FRs3SceneRegion_color(){
   return this._color;
}
function FRs3SceneRegion_camera(){
   return this._camera;
}
function FRs3SceneRegion_light(){
   return this._light;
}
function FRs3SceneRegion_unserialize(p){
   var o = this;
   o._color.unserialize(p);
   o._colorLevel.unserialize(p);
   o._fogNear = p.readFloat();
   o._fogFar = p.readFloat();
   o._fogRate = p.readFloat();
   o._fogAttenuation = p.readFloat();
   o._fogColor.unserialize(p);
   o._edgeRate = p.readFloat();
   o._edgeLevel = p.readFloat();
   o._edgeWidth = p.readFloat();
   o._edgeColor.unserialize(p);
   o._faceRange = p.readFloat();
   o._faceLimit = p.readFloat();
   o._faceRate = p.readFloat();
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._code       = null;
   o.code        = FRs3SceneRenderable_code;
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}
function FRs3SceneRenderable_code(){
   return this._code;
}
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o._code = p.readString();
}
function FRs3SceneSky(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneSpace(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._type       = null;
   o._displays   = null;
   o.displays    = FRs3SceneSpace_displays;
   o.unserialize = FRs3SceneSpace_unserialize;
   return o;
}
function FRs3SceneSpace_displays(){
   return this._displays;
}
function FRs3SceneSpace_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._type = p.readString();
   var c = p.readUint16();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3SceneDisplay);
         d.unserialize(p);
         ds.push(d);
      }
   }
}
function FRs3SceneTechnique(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._passes     = null;
   o.name        = FRs3SceneTechnique_name;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}
function FRs3SceneTechnique_name(){
   return this._name;
}
function FRs3SceneTechnique_passes(){
   return this._passes;
}
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o._name = p.readString();
   var c = p.readUint8();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3SceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
function FRs3SceneTechniquePass(o){
   o = RClass.inherits(this, o, FObject);
   o._name         = null;
   o._targetWidth  = null;
   o._targetHeight = null;
   o.name          = FRs3SceneTechniquePass_name;
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}
function FRs3SceneTechniquePass_name(){
   return this._name;
}
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FRs3SceneViewport(o){
   o = RClass.inherits(this, o, FObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FRs3SceneViewport_angle;
   o.znear       = FRs3SceneViewport_znear;
   o.zfar        = FRs3SceneViewport_zfar;
   o.unserialize = FRs3SceneViewport_unserialize;
   return o;
}
function FRs3SceneViewport_angle(){
   return this._angle;
}
function FRs3SceneViewport_znear(){
   return this._znear;
}
function FRs3SceneViewport_zfar(){
   return this._zfar;
}
function FRs3SceneViewport_unserialize(p){
   var o = this;
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FObject);
   o._bones      = null
   o._roots      = null
   o.find        = FRs3Skeleton_find;
   o.bones       = FRs3Skeleton_bones;
   o.roots       = FRs3Skeleton_roots;
   o.innerFilter = FRs3Skeleton_innerFilter;
   o.unserialize = FRs3Skeleton_unserialize;
   return o;
}
function FRs3Skeleton_find(p){
   return this._bones.get(p);
}
function FRs3Skeleton_bones(){
   return this._bones;
}
function FRs3Skeleton_roots(){
   return this._roots;
}
function FRs3Skeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.id(), p);
   var bs = p.bones();
   if(bs){
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         o.innerFilter(b)
      }
   }
}
function FRs3Skeleton_unserialize(p){
   var o = this;
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var bs = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         bs.push(b);
      }
   }
}
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._renderables = null;
   o.renderables  = FRs3Template_renderables;
   o.unserialize  = FRs3Template_unserialize;
   return o;
}
function FRs3Template_renderables(){
   return this._renderables;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var n = 0; n < c; n++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates = null;
   o._path      = '/assets/template/'
   o.construct = FRs3TemplateConsole_construct;
   o.load      = FRs3TemplateConsole_load;
   return o;
}
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FRs3TemplateConsole_load(p){
   var o = this;
   var r = o._templates.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Template);
      r.load(u);
      o._templates.set(p, r);
   }
   return r;
}
function FRs3TemplateRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._modelCode       = null;
   o._geometryIndex   = null;
   o._materialCode    = null;
   o._optionInstnaced = false;
   o._instanceCount   = 1;
   o._optionDynamic   = false;
   o._optionMerge     = false;
   o._optionBoneScale = false;
   o._optionSelect    = false;
   o._optionVisible   = false;
   o._optionGround    = false;
   o._matrix          = null;
   o.construct        = FRs3TemplateRenderable_construct;
   o.modelCode        = FRs3TemplateRenderable_modelCode;
   o.geometryIndex    = FRs3TemplateRenderable_geometryIndex;
   o.materialCode     = FRs3TemplateRenderable_materialCode;
   o.matrix           = FRs3TemplateRenderable_matrix;
   o.unserialize      = FRs3TemplateRenderable_unserialize;
   return o;
}
function FRs3TemplateRenderable_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3TemplateRenderable_modelCode(){
   return this._modelCode;
}
function FRs3TemplateRenderable_geometryIndex(p){
   return this._geometryIndex;
}
function FRs3TemplateRenderable_materialCode(){
   return this._materialCode;
}
function FRs3TemplateRenderable_matrix(){
   return this._matrix;
}
function FRs3TemplateRenderable_unserialize(p){
   var o = this;
   o._modelCode = p.readString();
   o._geometryIndex = p.readUint16();
   o._materialCode = p.readString();
   o._optionInstnaced = p.readBoolean();
   o._instanceCount = p.readUint8();
   o._optionDynamic = p.readBoolean();
   o._optionMerge = p.readBoolean();
   o._optionBoneScale = p.readBoolean();
   o._optionSelect = p.readBoolean();
   o._optionVisible = p.readBoolean();
   o._optionGround = p.readBoolean();
   o._matrix.unserialize(p);
}
function FRs3Texture(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3Texture_construct;
   o.load      = FRs3Texture_load;
   return o;
}
function FRs3Texture_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3Texture_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3TextureBitmap(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3TextureBitmap_construct;
   o.load      = FRs3TextureBitmap_load;
   return o;
}
function FRs3TextureBitmap_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3TextureBitmap_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3TextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._themes   = null;
   o._path     = '/assets/theme/'
   o.construct = FRs3TextureConsole_construct;
   o.load      = FRs3TextureConsole_load;
   return o;
}
function FRs3TextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3TextureConsole_load(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   return r;
}
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._materials  = null;
   o.materials   = FRs3Theme_materials;
   o.find        = FRs3Theme_find;
   o.unserialize = FRs3Theme_unserialize;
   return o;
}
function FRs3Theme_materials(){
   return this._materials;
}
function FRs3Theme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}
function FRs3Theme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var ms = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         ms.set(m.code(), m);
      }
   }
}
function FRs3ThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   o.construct    = FRs3ThemeConsole_construct;
   o.activeTheme  = FRs3ThemeConsole_activeTheme;
   o.find         = FRs3ThemeConsole_find;
   o.select       = FRs3ThemeConsole_select;
   return o;
}
function FRs3ThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FRs3ThemeConsole_activeTheme(){
   return this._activeTheme;
}
function FRs3ThemeConsole_find(p){
   var t = this._activeTheme;
   if(t == null){
      throw new TError('Active theme is empty.');
   }
   return t.find(p);
}
function FRs3ThemeConsole_select(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Theme);
      r.load(u);
      o._themes.set(p, r);
   }
   o._activeTheme = r;
   return r;
}
function FRs3Track(o){
   o = RClass.inherits(this, o, FObject);
   o._optionBoneScale = false;
   o._boneId          = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneId           = FRs3Track_boneId;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
   o.unserialize      = FRs3Track_unserialize;
   return o;
}
function FRs3Track_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FRs3Track_boneId(){
   return this._boneId;
}
function FRs3Track_frameTick(){
   return this._frameTick;
}
function FRs3Track_matrix(){
   return this._matrix;
}
function FRs3Track_matrixInvert(){
   return this._matrixInvert;
}
function FRs3Track_frames(){
   return this._frames;
}
function FRs3Track_unserialize(p){
   var o = this;
   o._optionBoneScale = p.readBoolean();
   o._boneId = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   var c = p.readInt16();
   if(c > 0){
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = EG3dAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   o.name         = FRs3VertexBuffer_name;
   o.formatCd     = FRs3VertexBuffer_formatCd;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   o.dispose      = FRs3VertexBuffer_dispose;
   return o;
}
function FRs3VertexBuffer_name(){
   return this._name;
}
function FRs3VertexBuffer_formatCd(){
   return this._formatCd;
}
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   p.readBytes(o._data, 0, t);
}
function FRs3VertexBuffer_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
   o._geometry = null;
   o._name = null;
   o._formatCd = null;
   o._vertexCount = null;
   o._stride = null;
   o._data = null;
}
function SRs3MaterialInfo(o){
   if(!o){o = this;}
   SG3dMaterialInfo(o);
   o.unserialize = SRs3MaterialInfo_unserialize;
   return o;
}
function SRs3MaterialInfo_unserialize(p){
   var o = this;
   o.effectName = p.readString();
   o.transformName = p.readString();
   o.optionLight = p.readBoolean();
   o.optionMerge = p.readBoolean();
   o.optionSort = p.readBoolean();
   o.sortLevel = p.readInt32();
   o.optionAlpha = p.readBoolean();
   o.optionDepth = p.readBoolean();
   o.optionCompare = p.readString();
   o.optionDouble = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionDynamic = p.readBoolean();
   o.optionTransmittance = p.readBoolean();
   o.optionOpacity = p.readBoolean();
   o.coordRateWidth = p.readFloat();
   o.coordRateHeight = p.readFloat();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.alphaLevel = p.readFloat();
   o.alphaMerge = p.readFloat();
   o.ambientColor.unserialize(p);
   o.ambientShadow = p.readFloat();
   o.diffuseColor.unserialize(p);
   o.diffuseShadow = p.readFloat();
   o.diffuseViewColor.unserialize(p);
   o.diffuseViewShadow = p.readFloat();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularRate = p.readFloat();
   o.specularAverage = p.readFloat();
   o.specularShadow = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewRate = p.readFloat();
   o.specularViewAverage = p.readFloat();
   o.specularViewShadow = p.readFloat();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.reflectShadow = p.readFloat();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   o.emissiveColor.unserialize(p);
}
function SRs3SceneShadow(o){
   if(!o){o = this;}
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = SRs3SceneShadow_unserialize;
   return o;
}
function SRs3SceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
function FRd3Animation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._bones       = null;
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FRd3Animation_construct;
   o.findBone     = FRd3Animation_findBone;
   o.bones        = FRd3Animation_bones;
   o.findTrack    = FRd3Animation_findTrack;
   o.tracks       = FRd3Animation_tracks;
   o.loadResource = FRd3Animation_loadResource;
   o.process      = FRd3Animation_process;
   o.dispose      = FRd3Animation_dispose;
   return o;
}
function FRd3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TDictionary();
   o._tracks = new TObjects();
   o._playInfo = new SRd3PlayInfo();
}
function FRd3Animation_findBone(p){
   return this._bones.get(p);
}
function FRd3Animation_bones(){
   return this._bones;
}
function FRd3Animation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneId() == p){
         return t;
      }
   }
   return null;
}
function FRd3Animation_tracks(){
   return this._tracks;
}
function FRd3Animation_loadResource(p){
   var o = this;
   o._resource = p;
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t.loadResource(rt);
      o._tracks.push(t);
   }
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.value(i);
      var bi = b.id();
      var t = o.findTrack(bi);
      if(t == null){
         throw new TError('Track is not exists. (bone_id={1})', bi);
      }
      b.setTrackResource(t);
   }
}
function FRd3Animation_process(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   var ct = o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.value(i).update(o._playInfo, ct);
   }
}
function FRd3Animation_dispose(){
   var o = this;
   o._bones = null;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FRd3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix          = null
   o._boneResource    = null
   o._trackResource   = null;
   o.construct        = FRd3Bone_construct;
   o.id               = FRd3Bone_id;
   o.matrix           = FRd3Bone_matrix;
   o.trackResource    = FRd3Bone_trackResource;
   o.setTrackResource = FRd3Bone_setTrackResource;
   o.loadResource     = FRd3Bone_loadResource;
   o.update           = FRd3Bone_update;
   o.dispose          = FRd3Bone_dispose;
   return o;
}
function FRd3Bone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRd3Bone_id(){
   return this._boneResource.id();
}
function FRd3Bone_matrix(){
   return this._matrix;
}
function FRd3Bone_trackResource(){
   return this._trackResource;
}
function FRd3Bone_setTrackResource(p){
   this._trackResource = p;
}
function FRd3Bone_loadResource(p){
   this._boneResource = p;
}
function FRd3Bone_update(pi, pt){
   var o = this;
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   o._matrix.assign(t.matrixInvert());
   o._matrix.append(pi.matrix);
}
function FRd3Bone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
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
   o = RClass.inherits(this, o, FG3dObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FRd3Geometry_construct;
   o.testReady         = FRd3Geometry_testReady;
   o.findVertexBuffer  = FRd3Geometry_findVertexBuffer;
   o.vertexBuffers     = FRd3Geometry_vertexBuffers;
   o.indexBuffer       = FRd3Geometry_indexBuffer;
   o.material          = FRd3Geometry_material;
   o.findTexture       = FRd3Geometry_findTexture;
   o.textures          = FRd3Geometry_textures;
   o.boneIds           = FRd3Geometry_boneIds;
   o.loadResource      = FRd3Geometry_loadResource;
   return o;
}
function FRd3Geometry_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Geometry_testReady(){
   var o = this;
   if(!o._ready){
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
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
function FRd3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRd3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Geometry_material(){
   return this._material;
}
function FRd3Geometry_findTexture(p){
   return this._textures.get(p);
}
function FRd3Geometry_textures(){
   return this._textures;
}
function FRd3Geometry_boneIds(p){
   return this._boneIds;
}
function FRd3Geometry_loadResource(p){
   var o = this;
   var c = o._context;
   o._resource = p;
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
   o._boneIds = p.boneIds();
   var mc = p.materialCode();
   var mtl = o._material = RConsole.find(FRs3ThemeConsole).find(mc);
   var mts = mtl.textures();
   if(mts){
      var mtc = mts.count();
      if(mtc > 0){
         var rts = o._textures = new TDictionary();
         var txc = RConsole.find(FRd3TextureConsole)
         for(var n = 0; n < mtc; n++){
            var mt = mts.get(n);
            var rt = txc.load(o._context, mt.bitmapCode(), mt.code());
            rts.set(mt.code(), rt);
         }
      }
   }
}
function FRd3Material(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._material        = null;
   o.construct        = FRd3Material_construct;
   o.findVertexBuffer = FRd3Material_findVertexBuffer;
   o.indexBuffer      = FRd3Material_indexBuffer;
   o.loadResource     = FRd3Material_loadResource;
   return o;
}
function FRd3Material_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Material_findVertexBuffer(p){
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
function FRd3Material_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Material_loadResource(p){
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
   var materialCode = p.materialCode();
   var themeConsole = RConsole.find(FRs3ThemeConsole);
   var material = o._material = themeConsole.find(materialCode);
   var textures = material.textures();
   var textureCount = textures.count();
   for(var n = 0; n < textureCount; n++){
      var texture = textures.get(n);
   }
}
function FRd3Model(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name        = null;
   o._geometrys   = null;
   o._resource    = null;
   o._dataReady       = false;
   o.name         = FRd3Model_name;
   o.setName      = FRd3Model_setName;
   o.geometrys    = FRd3Model_geometrys;
   o.resource     = FRd3Model_resource;
   o.resource     = FRd3Model_resource;
   o.setResource  = FRd3Model_setResource;
   o.testReady    = FRd3Model_testReady;
   o.loadResource = FRd3Model_loadResource;
   o.processLoad  = FRd3Model_processLoad;
   return o;
}
function FRd3Model_name(){
   return this._name;
}
function FRd3Model_setName(p){
   this._name = p;
}
function FRd3Model_geometrys(){
   return this._geometrys;
}
function FRd3Model_resource(){
   return this._resource;
}
function FRd3Model_setResource(p){
   this._resource = p;
}
function FRd3Model_testReady(){
   return this._dataReady;
}
function FRd3Model_loadResource(p){
   var o = this;
   var rgs = p.geometrys();
   if(rgs){
      var gs = o._geometrys = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FRd3Geometry);
         g.linkContext(o._context);
         g.loadResource(rg);
         gs.push(g);
      }
   }
   o._dataReady = true;
}
function FRd3Model_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FRd3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 200;
   o.onProcess   = FRd3ModelConsole_onProcess;
   o.construct   = FRd3ModelConsole_construct;
   o.models      = FRd3ModelConsole_models;
   o.load        = FRd3ModelConsole_load;
   return o;
}
function FRd3ModelConsole_onProcess(){
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
function FRd3ModelConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FRd3ModelConsole_models(){
   return this._models;
}
function FRd3ModelConsole_load(pc, pn){
   var o = this;
   if(pc == null){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pn)){
      throw new TError('Model name is empty');
   }
   var m = o._models.get(pn);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FRs3ModelConsole);
   var rm = rmc.load(pn);
   m = RClass.create(FRd3Model);
   m.linkContext(pc);
   m.setName(pn);
   m.setResource(rm);
   o._models.set(pn, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
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
function FRd3TextureConsole_load(pc, pt, pb){
   var o = this;
   var c = RString.toLower(pt + '/' + pb);
   var t = o._textures.get(c);
   if(t != null){
      return t;
   }
   var u = RBrowser.contentPath(o._path + c + '.jpg');
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   if(RString.toLower(pb) == 'environment'){
      t = RClass.create(FRd3TextureCube);
      t.linkContext(pc);
      t._name = c;
      t.load(RBrowser.contentPath(o._path + c));
   }else{
      t = RClass.create(FRd3Texture);
      t.linkContext(pc);
      t._name = c;
      t.load(u);
   }
   o._textures.set(c, t);
   return t;
}
function FRd3TextureCube(o){
   o = RClass.inherits(this, o, FRd3Texture);
   o.imageX1 = null;
   o.imageX2 = null;
   o.imageY1 = null;
   o.imageY2 = null;
   o.imageZ1 = null;
   o.imageZ2 = null;
   o.onLoad      = FRd3TextureCube_onLoad;
   o.load        = FRd3TextureCube_load;
   return o;
}
function FRd3TextureCube_onLoad(p){
   var o = this;
   if(!o.imageX1.testReady()){
      return;
   }
   if(!o.imageX2.testReady()){
      return;
   }
   if(!o.imageY1.testReady()){
      return;
   }
   if(!o.imageY2.testReady()){
      return;
   }
   if(!o.imageZ1.testReady()){
      return;
   }
   if(!o.imageZ2.testReady()){
      return;
   }
   var t = o._texture = o._context.createCubeTexture();
   t.upload(o.imageX1, o.imageX2, o.imageY1, o.imageY2, o.imageZ1, o.imageZ2);
   o._ready  = true;
}
function FRd3TextureCube_load(u){
   var o = this;
   var g = o.imageX1 = RClass.create(FImage);
   g._name = 'x1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x1.jpg");
   var g = o.imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x2.jpg");
   var g = o.imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y1.jpg");
   var g = o.imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y2.jpg");
   var g = o.imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z1.jpg");
   var g = o.imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z2.jpg");
}
function FRd3Track(o){
   o = RClass.inherits(this, o, FObject);
   o._frameCount  = 0;
   o._frameTick   = 0;
   o._resource    = null;
   o.boneId       = FRd3Track_boneId;
   o.matrix       = FRd3Track_matrix;
   o.matrixInvert = FRd3Track_matrixInvert;
   o.loadResource = FRd3Track_loadResource;
   o.calculate    = FRd3Track_calculate;
   o.dispose      = FRd3Track_dispose;
   return o;
}
function FRd3Track_boneId(){
   return this._resource.boneId();
}
function FRd3Track_matrix(){
   return this._resource.matrix();
}
function FRd3Track_matrixInvert(){
   return this._resource.matrixInvert();
}
function FRd3Track_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
function FRd3Track_calculate(pi, pt){
   var o = this;
   var fc = o._frameCount;
   if(fc == 0){
      return false;
   }
   if(pt < 0){
      pt = -pt;
   }
   var ft = o._frameTick;
   var i = parseInt(pt / ft) % fc;
   var r = o._resource;
   var fs = r.frames();
   var cf = fs.get(i);
   var nf = null;
   if(i < fc -1){
      nf = fs.get(i + 1);
   }else{
      nf = fs.get(0);
   }
   pi.tick = pt;
   pi.rate = (pt % ft) / ft;
   pi.currentFrame = cf;
   pi.nextFrame = nf;
   return true;
}
function FRd3Track_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
function SRd3PlayInfo(o){
   if(!o){o = this;}
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   o.update       = SRd3PlayInfo_update;
   return o;
}
function SRd3PlayInfo_update(){
   var o = this;
   if(o.currentFrame == null){
      return false;
   }
   if(o.nextFrame == null){
      return false;
   }
   var m = o.matrix;
   var ct = o.currentFrame.translation();
   var cr = o.currentFrame.quaternion();
   var cs = o.currentFrame.scale();
   var r = o.rate;
   if((r > 0) && (r < 1)){
      var nt = o.nextFrame.translation();
      var nr = o.nextFrame.quaternion();
      var ns = o.nextFrame.scale();
      o.translation.slerp(ct, nt, r);
      o.quaternion.slerp(cr, nr, r);
      o.scale.slerp(cs, ns, r);
      m.build(o.translation, o.quaternion, o.scale);
   }else{
      m.build(ct, cr, cs);
   }
   return true;
}
