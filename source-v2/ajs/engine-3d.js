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
function FE3dCanvasCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera);
   o._rotation       = null;
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   o.construct       = FE3dCanvasCamera_construct;
   o.rotation        = FE3dCanvasCamera_rotation;
   o.doPitch         = FE3dCanvasCamera_doPitch;
   o.doYaw           = FE3dCanvasCamera_doYaw;
   o.doRoll          = FE3dCanvasCamera_doRoll;
   o.update          = FE3dCanvasCamera_update;
   return o;
}
function FE3dCanvasCamera_construct(){
   var o = this;
   o.__base.FG3dPerspectiveCamera.construct.call(o);
   o._rotation = new SVector3();
   o._rotationMatrix = new SMatrix3x3();
   o._quaternion = new SQuaternion();
   o._quaternionX = new SQuaternion();
   o._quaternionY = new SQuaternion();
   o._quaternionZ = new SQuaternion();
}
function FE3dCanvasCamera_rotation(){
   return this._rotation;
}
function FE3dCanvasCamera_doPitch(p){
   this._rotation.x += p;
}
function FE3dCanvasCamera_doYaw(p){
   this._rotation.y += p;
}
function FE3dCanvasCamera_doRoll(p){
   this._rotation.z += p;
}
function FE3dCanvasCamera_update(){
   var o = this;
   var r = o._rotation;
   o._quaternionX.fromAxisAngle(RMath.vectorAxisX, r.x);
   o._quaternionY.fromAxisAngle(RMath.vectorAxisY, r.y);
   o._quaternionZ.fromAxisAngle(RMath.vectorAxisZ, r.z);
   var q = o._quaternion.identity();
   q.mul(o._quaternionX);
   q.mul(o._quaternionY);
   q.mul(o._quaternionZ);
   var m = o._rotationMatrix;
   m.build(q);
   var t = o._target;
   m.transformPoint3(RMath.vectorForward, t);
   m.transformPoint3(RMath.vectorAxisY, o.__axisUp);
   var d = o._direction;
   d.assign(t);
   d.normalize();
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FRd3Renderable);
   o._renderable      = null;
   o._activeSkin      = null;
   o._activeTrack     = null;
   o._bones           = null;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.bones            = FE3dMeshRenderable_bones;
   o.update           = FE3dMeshRenderable_update;
   o.process          = FE3dMeshRenderable_process;
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}
function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}
function FE3dMeshRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dMeshRenderable_findTexture(p){
   return this._textures.get(p);
}
function FE3dMeshRenderable_textures(){
   return this._textures;
}
function FE3dMeshRenderable_bones(p){
   return this._bones;
}
function FE3dMeshRenderable_update(p){
   var o = this;
   var d = o._display;
   var mm = o._matrix
   var t = o._activeTrack;
   var m = o._currentMatrix;
   if(t){
      m.assign(t.matrix());
      m.append(mm);
   }else{
      m.assign(mm);
   }
   if(d){
      var dm = o._display.currentMatrix();
      m.append(dm);
   }
}
function FE3dMeshRenderable_process(p){
   var o = this;
   o.__base.FRd3Renderable.process.call(p)
   var t = o._activeTrack;
   if(t){
      var a = t._animation;
      if(a){
         a.process(t);
      }
   }
}
function FE3dMeshRenderable_dispose(){
   var o = this;
   var v = o._modelMatrix;
   if(v){
      v.dispose();
      o._modelMatrix = null;
   }
   var v = o._vertexBuffers;
   if(v){
      v.dispose();
      o._vertexBuffers = null;
   }
   o.__base.FRd3Renderable.dispose.call(o);
}
function FE3dScene(o){
   o = RClass.inherits(this, o, FStage3d);
   o._dataReady            = false;
   o._resource             = null;
   o._skyLayer             = null;
   o._mapLayer             = null;
   o._spaceLayer           = null;
   o._lsnsLoad             = null;
   o.construct             = FE3dScene_construct;
   o.loadListener          = FE3dScene_loadListener;
   o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = FE3dScene_loadRegionResource
   o.loadDisplayResource   = FE3dScene_loadDisplayResource
   o.loadSkyResource       = FE3dScene_loadSkyResource
   o.loadMapResource       = FE3dScene_loadMapResource
   o.loadSpaceResource     = FE3dScene_loadSpaceResource
   o.loadResource          = FE3dScene_loadResource
   o.processLoad           = FE3dScene_processLoad;
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}
function FE3dScene_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spaceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('space', l);
}
function FE3dScene_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FE3dScene_loadTechniqueResource(p){
}
function FE3dScene_loadRegionResource(p){
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
   cp._zfar = rcv.zfar();
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
   lp.size().set(1024, 1024);
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}
function FE3dScene_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RClass.create(FSceneDisplay3d);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FTemplate3dConsole).load(d3, pd.code());
   pl.pushDisplay(d3);
}
function FE3dScene_loadSkyResource(p){
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
function FE3dScene_loadMapResource(p){
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
function FE3dScene_loadSpaceResource(p){
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
function FE3dScene_loadResource(p){
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
function FE3dScene_processLoad(){
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
function FE3dScene_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
}
function FE3dScene_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
}
function FE3dSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadScenes = null;
   o._scenes     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dSceneConsole_onProcess;
   o.construct   = FE3dSceneConsole_construct;
   o.scenes      = FE3dSceneConsole_scenes;
   o.alloc       = FE3dSceneConsole_alloc;
   return o;
}
function FE3dSceneConsole_onProcess(){
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
function FE3dSceneConsole_construct(){
   var o = this;
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dSceneConsole_scenes(){
   return this._scenes;
}
function FE3dSceneConsole_alloc(pc, pn){
   var o = this;
   var rsc = RConsole.find(FRs3SceneConsole);
   var rs = rsc.load(pn);
   return;
   var s = RClass.create(FE3dScene);
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
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FDisplay3d, MListenerLoad);
   o._dataReady     = false;
   o._ready         = false;
   o._resource      = null;
   o._skeletons     = null;
   o._animations    = null;
   o._resource      = null;
   o.testReady      = FE3dTemplate_testReady;
   o.skeletons      = FE3dTemplate_skeletons;
   o.pushSkeleton   = FE3dTemplate_pushSkeleton;
   o.findAnimation  = FE3dTemplate_findAnimation;
   o.animations     = FE3dTemplate_animations;
   o.pushAnimation  = FE3dTemplate_pushAnimation;
   o.setResource    = FE3dTemplate_setResource;
   o.loadSkeletons  = FE3dTemplate_loadSkeletons;
   o.linkAnimation  = FE3dTemplate_linkAnimation;
   o.loadAnimations = FE3dTemplate_loadAnimations;
   o.loadResource   = FE3dTemplate_loadResource;
   o.reloadResource = FE3dTemplate_reloadResource;
   o.processLoad    = FE3dTemplate_processLoad;
   o.process        = FE3dTemplate_process;
   return o;
}
function FE3dTemplate_testReady(){
   return this._dataReady;
}
function FE3dTemplate_skeletons(){
   return this._skeletons;
}
function FE3dTemplate_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = p;
   }
   r.set(p._resource.guid(), p);
}
function FE3dTemplate_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}
function FE3dTemplate_animations(){
   return this._animations;
}
function FE3dTemplate_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TDictionary();
   }
   var pr = p.resource();
   r.set(pr.guid(), p);
}
function FE3dTemplate_setResource(p){
   this._resource = p;
}
function FE3dTemplate_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         var s = RClass.create(FRd3Skeleton);
         s.loadResource(r);
         o.pushSkeleton(s);
      }
   }
}
function FE3dTemplate_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      var r = o._renderables.get(i);
      r._activeTrack = t;
   }
}
function FE3dTemplate_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         var a = o.findAnimation(r.guid());
         if(a){
            continue;
         }
         var a = null;
         if(r.skeleton() == null){
            a = RClass.create(FRd3MeshAnimation);
         }else{
            a = RClass.create(FRd3SkeletonAnimation);
         }
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}
function FE3dTemplate_loadResource(p){
   var o = this;
   var ds = p.displays();
   var c = ds.count();
   if(c > 0){
      var rs = o.renderables();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var r = RClass.create(FE3dTemplateRenderable);
         r._display = o;
         r._context = o._context;
         r.loadResource(d);
         rs.push(r);
      }
   }
}
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).reloadResource();
      }
   }
}
function FE3dTemplate_processLoad(){
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
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         if(!s.get(i).testReady()){
            return false;
         }
      }
      for(var i = 0; i < c; i++){
         s.get(i).load();
      }
   }
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         var a = as.value(i);
         if(a.resource().skeleton() == null){
            o.linkAnimation(a);
         }
      }
   }
   o._ready = true;
   o.processLoadListener(o);
   return o._ready;
}
function FE3dTemplate_process(){
   var o = this;
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).record();
      }
   }
   o.__base.FDisplay3d.process.call(o);
   var k = o._activeSkeleton;
   if(k && as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).process(k);
      }
   }
}
function FE3dTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadTemplates = null;
   o._templates     = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = FE3dTemplateConsole_onProcess;
   o.construct      = FE3dTemplateConsole_construct;
   o.alloc          = FE3dTemplateConsole_alloc;
   o.free           = FE3dTemplateConsole_free;
   return o;
}
function FE3dTemplateConsole_onProcess(){
   var o = this;
   var s = o._loadTemplates;
   s.record();
   while(s.next()){
      var t = s.current();
      if(t.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3dTemplateConsole_construct(){
   var o = this;
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dTemplateConsole_alloc(c, n){
   var o = this;
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   var rc = RConsole.find(FRs3TemplateConsole);
   var r = rc.load(n);
   var t = RClass.create(FE3dTemplate);
   t._context = c;
   t.setName(n);
   t._resourceGuid = n;
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_free(p){
   var o = this;
   p.remove();
   var n = p._resourceGuid;
   var ts = o._templates.get(n);
   if(ts == null){
      ts = new TObjects();
      o._templates.set(n, ts);
   }
   ts.push(p);
}
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   o._ready            = false;
   o._resource         = null;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FE3dTemplateRenderable_construct;
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
   o.resource          = FE3dTemplateRenderable_resource;
   o.loadResource      = FE3dTemplateRenderable_loadResource;
   o.reloadResource    = FE3dTemplateRenderable_reloadResource;
   o.load              = FE3dTemplateRenderable_load;
   o.dispose           = FE3dTemplateRenderable_dispose;
   return o;
}
function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}
function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   var ts = o._textures;
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.value(i);
         if(!t.testReady()){
            return false;
         }
      }
   }
   return true;
}
function FE3dTemplateRenderable_testVisible(p){
   return this._ready;
}
function FE3dTemplateRenderable_resource(p){
   return this._resource;
}
function FE3dTemplateRenderable_loadResource(p){
   var o = this;
   o._resource = p;
   o._matrix.assign(p.matrix());
   o._model = RConsole.find(FRd3ModelConsole).load(o._context, p.modelGuid());
   var m = o._materialResource = p._activeMaterial._material;
   var mi = o._material.info();
   mi.assign(m.info());
   o._effectName = mi.effectName;
   var rs = m.textures();
   if(rs){
      var bc = RConsole.find(FRd3BitmapConsole)
      var c = rs.count();
      var ts = o._textures = new TDictionary();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var t = bc.load(o._context, r.bitmapGuid(), r.code());
         ts.set(r.code(), t);
      }
   }
}
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var m = o._materialResource;
   var mi = o._material.info();
   mi.assign(m.info());
}
function FE3dTemplateRenderable_load(){
   var o = this;
   var d = o._display;
   var r = o._resource;
   var rd = r.model();
   var rds = rd.skeletons();
   if(rds){
      d.loadSkeletons(rds);
   }
   var rda = rd.animations();
   if(rda){
      d.loadAnimations(rda);
   }
   var rm = r.mesh();
   var rd = o._renderable = RConsole.find(FRd3ModelConsole).findMesh(r.meshGuid());
   var vbs = rd._vertexBuffers;
   var c = vbs.count();
   for(var i = 0; i < c; i++){
      var vb = vbs.get(i);
      o._vertexBuffers.set(vb._name, vb);
   }
   var ss = rd.skins();
   if(ss){
      var dk = d._activeSkeleton;
      var k = o._activeSkin = ss.first();
      var ss = k.streams();
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         var vb = s.buffer();
         o._vertexBuffers.set(vb._name, vb);
      }
      var kr = k.resource();
      var brs = kr.boneRefers();
      var c = brs.count();
      if(c > 0){
         var bs = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var br = brs.get(i);
            var b = dk.bones().get(br.index());
            if(b == null){
               throw new TError(o, 'Bone is not exist.');
            }
            bs.push(b);
         }
      }
   }
   o._ready = true;
}
function FE3dTemplateRenderable_dispose(){
   var o = this;
   o.__base.FE3dMeshRenderable.dispose.call(o);
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
   o.free        = FModel3dConsole_free;
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
   var ms = o._models.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   var rmc = RConsole.find(FRd3ModelConsole);
   var rm = rmc.load(pc, pn);
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._modelName = pn;
   m._renderable = rm;
      o._loadModels.push(m);
   return m;
}
function FModel3dConsole_free(p){
   var o = this;
   p.remove();
   var n = p._modelName;
   var ms = o._models.get(n);
   if(ms == null){
      ms = new TObjects();
      o._models.set(n, ms);
   }
   ms.push(p);
}
function FModelRenderable3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FModelRenderable3d_construct;
   o.testVisible       = FModelRenderable3d_testVisible;
   o.vertexCount       = FModelRenderable3d_vertexCount;
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
function FModelRenderable3d_vertexCount(){
   return this._renderable.vertexCount();
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
   if(mr){
      m.assignInfo(mr.info());
   }
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
   o._optionKeyboard = true;
   o._skyLayer       = null;
   o._mapLayer       = null;
   o._spriteLayer    = null;
   o._faceLayer      = null;
   o.onKeyDown       = FSimpleStage3d_onKeyDown;
   o.construct       = FSimpleStage3d_construct;
   o.skyLayer        = FSimpleStage3d_skyLayer;
   o.mapLayer        = FSimpleStage3d_mapLayer;
   o.spriteLayer     = FSimpleStage3d_spriteLayer;
   o.faceLayer       = FSimpleStage3d_faceLayer;
   o.active          = FSimpleStage3d_active;
   o.deactive        = FSimpleStage3d_deactive;
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
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
}
function FSimpleStage3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
   }
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
   var c = o._camera = RClass.create(FE3dCanvasCamera);
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
   r._backgroundColor = o._backgroundColor;
   o._technique.updateRegion(r);
   r.prepare();
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).filterRenderables(r);
      }
   }
   r.update();
   o._technique.drawRegion(r);
}
