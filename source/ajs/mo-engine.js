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
   o = RClass.inherits(this, o, FG3dRenderable);
   o._renderable      = null;
   o.construct        = FGeometry3d_construct;
   o.testVisible      = FGeometry3d_testVisible;
   o.findVertexBuffer = FGeometry3d_findVertexBuffer;
   o.indexBuffer      = FGeometry3d_indexBuffer;
   o.findTexture      = FGeometry3d_findTexture;
   o.load             = FGeometry3d_load;
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
function FGeometry3d_load(p){
   var o = this;
   o._effectName = p.material().effectName();
   o._renderable = p;
}
function FModel3d(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady   = false;
   o._renderables   = null;
   o._animation     = null;
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
         var rs = o.renderables();
         for(var i = 0; i < c; i++){
            var rg = rgs.get(i);
            var g = RClass.create(FGeometry3d);
            g.load(rg);
            rs.push(g);
         }
      }
   }
   var ra = r.animation();
   if(ra){
      var a = o._animation = RClass.create(FRd3Animation);
      a.loadResource(ra);
      var rk = r.skeleton();
      var rbs = rk.bones();
      var c = rbs.count();
      for(var i = 0; i < c; i++){
         var rb = c = rbs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(rb);
         a.bones().set(rb.id(), rb);
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
      var rt = c = rts.get(i);
      var t = RClass.create(FRd3Track);
      t.loadResource(rt);
      o._tracks.push(t);
   }
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.value(i);
      var t = o.findTrack(b.id());
      b.setTrackResource(t);
   }
}
function FRd3Animation_process(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   var ct = o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * RMath.PERCENT_1000;
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
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._bones            = null;
   o._textures         = null;
   o.construct         = FRd3Geometry_construct;
   o.testReady         = FRd3Geometry_testReady;
   o.findVertexBuffer  = FRd3Geometry_findVertexBuffer;
   o.vertexBuffers     = FRd3Geometry_vertexBuffers;
   o.indexBuffer       = FRd3Geometry_indexBuffer;
   o.material          = FRd3Geometry_material;
   o.findTexture       = FRd3Geometry_findTexture;
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
   alert(p.boneIds().length());
   o._bones            = null;
   var mc = p.materialCode();
   var mtl = o._material = RConsole.find(FRs3ThemeConsole).find(mc);
   var mts = mtl.textures();
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
   o.loadResource = FRd3Track_loadResource;
   o.calculate    = FRd3Track_calculate;
   o.dispose      = FRd3Track_dispose;
   return o;
}
function FRd3Track_boneId(){
   return this._resource.boneId();
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
   if(p < 0){
      p = -p;
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
   var currentMatrix = o.currentFrame.matrix();
   if(rate != 0){
      o.matrix.assign(currentMatrix);
   }else{
      o.matrix.assign(currentMatrix);
   }
   return true;
}
