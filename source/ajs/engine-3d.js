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
            g._display = o;
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
   o.update            = FModelRenderable3d_update;
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
function FModelRenderable3d_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
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
   var rcv = rc.viewport();
   var c = o._camera;
   var cp = c._projection;
   c.position().assign(rc.position());
   c.direction().assign(rc.direction());
   c.update();
   cp.size().assign(o._context.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar() * 0.6;
   cp.update();
   var l = o._directionalLight
   var lc = l._camera;
   var lp = lc._projection;
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.viewport();
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   lc.position().assign(rlc.position());
   lc.update();
   lp.size().set(2048, 2048);
   lp._angle = 80;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
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
function FSimpleStage3d_onKeyDown(e){
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
   var c = o._camera = RClass.create(FG3dPerspectiveCamera);
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
   r._backgroundColor = o._backgroundColor;
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
