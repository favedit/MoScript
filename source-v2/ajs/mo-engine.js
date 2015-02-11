function FDisplay(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._parent           = null;
   o._currentMatrix    = null;
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.parent            = FDisplay_parent;
   o.setParent         = FDisplay_setParent;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.setName           = FDisplay_setName;
   o.currentMatrix     = FDisplay_currentMatrix;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.filterRenderables = FDisplay_filterRenderables;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   o.show              = FDisplay_show;
   o.hide              = FDisplay_hide;
   o.setVisible        = FDisplay_setVisible;
   o.update            = FDisplay_update;
   o.updateMatrix      = FDisplay_updateMatrix;
   o.process           = FDisplay_process;
   o.remove            = FDisplay_remove;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_parent(){
   return this._parent;
}
function FDisplay_setParent(p){
   this._parent = p;
}
function FDisplay_isName(p){
   return this._name == p;
}
function FDisplay_name(){
   return this._name;
}
function FDisplay_setName(p){
   this._name = p;
}
function FDisplay_currentMatrix(){
   return this._currentMatrix;
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
   return r ? !r.isEmpty() : false;
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var rs = o._renderables;
   if(rs){
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
   if(!r){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDisplay_pushRenderable(p){
   var o = this;
   p._display = o;
   o.renderables().push(p);
}
function FDisplay_removeRenderable(p){
   var s = this._renderables;
   if(s){
      s.remove(p);
   }
}
function FDisplay_show(){
   this.setVisible(true);
}
function FDisplay_hide(){
   this.setVisible(false);
}
function FDisplay_setVisible(p){
   this._visible = p;
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_updateMatrix(){
   var o = this;
   o._currentMatrix.assign(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
function FDisplay_process(p){
   var o = this;
   o.updateMatrix();
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).process(p);
      }
   }
}
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}
function FDisplay_dispose(){
   var o = this;
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   RObject.dispose(o._renderables)
   o.__base.FObject.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r){
      return !r.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
         var r = f.searchDisplay(p);
         if(r){
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
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         d.process(p);
      }
   }
}
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(!r){
      r = o._displays = new TObjects();
   }
   return r;
}
function FDisplayContainer_pushDisplay(p){
   var o = this;
   p._parent = o;
   o.displays().push(p);
}
function FDisplayContainer_removeDisplay(p){
   var o = this;
   o.displays().remove(p);
   p._parent = null;
}
function FDisplayContainer_dispose(){
   var o = this;
   var v = o._displays;
   if(v){
      for(var i = v.count() - 1; i >= 0; i--){
         v.get(i).dispose();
      }
      v.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive   = false;
   o._technique      = null;
   o.construct       = FDisplayLayer_construct;
   o.technique       = FDisplayLayer_technique;
   o.setTechnique    = FDisplayLayer_setTechnique;
   o.selectTechnique = FDisplayLayer_selectTechnique;
   o.active          = FDisplayLayer_active;
   o.deactive        = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
function FDisplayLayer_technique(){
   return this._technique;
}
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDisplayUiLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   return o;
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
   var s = o._layers;
   if(!s){
      s = o._layers = new TDictionary();
   }
   s.set(n , l);
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
function FE3dCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera);
   o._rotation       = null;
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   o.construct       = FE3dCamera_construct;
   o.rotation        = FE3dCamera_rotation;
   o.doPitch         = FE3dCamera_doPitch;
   o.doYaw           = FE3dCamera_doYaw;
   o.doRoll          = FE3dCamera_doRoll;
   o.update          = FE3dCamera_update;
   return o;
}
function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dPerspectiveCamera.construct.call(o);
   o._rotation = new SVector3();
   o._rotationMatrix = new SMatrix3x3();
   o._quaternion = new SQuaternion();
   o._quaternionX = new SQuaternion();
   o._quaternionY = new SQuaternion();
   o._quaternionZ = new SQuaternion();
}
function FE3dCamera_rotation(){
   return this._rotation;
}
function FE3dCamera_doPitch(p){
   this._rotation.x += p;
}
function FE3dCamera_doYaw(p){
   this._rotation.y += p;
}
function FE3dCamera_doRoll(p){
   this._rotation.z += p;
}
function FE3dCamera_update(){
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
   var d = o._direction;
   m.transformPoint3(o._directionTarget, d);
   d.normalize();
   m.transformPoint3(RMath.vectorAxisY, o.__axisUp);
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
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
   o._materials = null;
   o.__base.FDisplay.dispose.call(o);
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
function FE3dModel(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   o._geometrys     = null;
   o._renderable    = null;
   o.testReady      = FE3dModel_testReady;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   o.process        = FE3dModel_process;
   return o;
}
function FE3dModel_testReady(){
   return this._dataReady;
}
function FE3dModel_loadRenderable(p){
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
function FE3dModel_processLoad(){
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
function FE3dModel_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dModelConsole_onProcess;
   o.construct   = FE3dModelConsole_construct;
   o.models      = FE3dModelConsole_models;
   o.alloc       = FE3dModelConsole_alloc;
   o.free        = FE3dModelConsole_free;
   return o;
}
function FE3dModelConsole_onProcess(){
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
function FE3dModelConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dModelConsole_models(){
   return this._models;
}
function FE3dModelConsole_alloc(pc, pn){
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
function FE3dModelConsole_free(p){
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
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FE3dModelRenderable_construct;
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.vertexCount       = FE3dModelRenderable_vertexCount;
   o.findVertexBuffer  = FE3dModelRenderable_findVertexBuffer;
   o.vertexBuffers     = FE3dModelRenderable_vertexBuffers;
   o.indexBuffer       = FE3dModelRenderable_indexBuffer;
   o.findTexture       = FE3dModelRenderable_findTexture;
   o.textures          = FE3dModelRenderable_textures;
   o.bones             = FE3dModelRenderable_bones;
   o.load              = FE3dModelRenderable_load;
   o.build             = FE3dModelRenderable_build;
   o.update            = FE3dModelRenderable_update;
   return o;
}
function FE3dModelRenderable_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}
function FE3dModelRenderable_testVisible(p){
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
function FE3dModelRenderable_vertexCount(){
   return this._renderable.vertexCount();
}
function FE3dModelRenderable_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FE3dModelRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FE3dModelRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dModelRenderable_findTexture(p){
   return this._renderable.findTexture(p);
}
function FE3dModelRenderable_textures(){
   return this._renderable.textures();
}
function FE3dModelRenderable_bones(p){
   return this._bones;
}
function FE3dModelRenderable_load(p){
   var o = this;
   var m = o._material;
   var mr = o._materialResource = p.material();
   if(mr){
      m.assignInfo(mr.info());
   }
   o._effectName = m.info().effectName;
   o._renderable = p;
}
function FE3dModelRenderable_build(p){
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
function FE3dModelRenderable_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
function FE3dScene(o){
   o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
   o._dataReady            = false;
   o._resource             = null;
   o.construct             = FE3dScene_construct;
   o.resource              = FE3dScene_resource;
   o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = FE3dScene_loadRegionResource;
   o.loadDisplayResource   = FE3dScene_loadDisplayResource;
   o.loadLayerResource     = FE3dScene_loadLayerResource;
   o.loadResource          = FE3dScene_loadResource;
   o.processLoad           = FE3dScene_processLoad;
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}
function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
}
function FE3dScene_resource(p){
   return this._resource;
}
function FE3dScene_loadTechniqueResource(p){
}
function FE3dScene_loadRegionResource(p){
   var o = this;
   o._backgroundColor.assign(p.color());
   var rc = p.camera();
   var rcv = rc.projection();
   var c = o._camera;
   c._resource = rc;
   var cp = c._projection;
   c.position().assign(rc.position());
   c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   c.update();
   cp.size().assign(o._context.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o._directionalLight
   l._resource = rl;
   var lc = l._camera;
   var lp = lc._projection;
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
   var d3 = RClass.create(FE3dSceneDisplay);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).load(d3, pd.code());
   pl.pushDisplay(d3);
}
function FE3dScene_loadLayerResource(p){
   var o = this;
   var l = RClass.create(FE3dSceneLayer);
   l.loadResource(p);
   var s = p.displays();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         o.loadDisplayResource(l, d);
      }
   }
   o.registerLayer(p.code(), l)
}
function FE3dScene_loadResource(p){
   var o = this;
   o.loadTechniqueResource(p.technique());
   o.loadRegionResource(p.region());
   var ls = p.layers();
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      o.loadLayerResource(l);
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
   o.processLoadListener(o);
   return true;
}
function FE3dScene_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
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
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dTemplate);
   o._dataReady        = false;
   o._movieMatrix      = null;
   o._resourceScene    = null;
   o._materials        = null;
   o._movies           = null;
   o.construct         = FE3dSceneDisplay_construct;
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.updateMatrix      = FE3dSceneDisplay_updateMatrix;
   return o;
}
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dTemplate.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}
function FE3dSceneDisplay_resourceScene(){
   return this._resourceScene;
}
function FE3dSceneDisplay_loadSceneResource(p){
   var o = this;
   o._resourceScene = p;
   o._matrix.assign(p.matrix());
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneMaterial);
         m.loadSceneResource(rm);
         ms.set(rm.groupGuid(), m);
      }
   }
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var r = RClass.create(FE3dSceneDisplayRenderable);
         r._display = o;
         r._context = o._context;
         r.loadResource(rd);
         o.pushRenderable(r);
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}
function FE3dSceneDisplay_updateMatrix(p){
   var o = this;
   var m = o._currentMatrix.identity();
   var ms = o._movies;
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         ms.get(i).process(o._movieMatrix);
      }
      m.append(o._movieMatrix);
   }
   m.append(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
function FE3dSceneDisplayMovie(o){
   o = RClass.inherits(this, o, FObject);
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   o.loadResource = FE3dSceneDisplayMovie_loadResource;
   o.process      = FE3dSceneDisplayMovie_process;
   return o;
}
function FE3dSceneDisplayMovie_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}
function FE3dSceneDisplayMovie_process(p){
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
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   o.loadMaterial = FE3dSceneDisplayRenderable_loadMaterial;
   return o;
}
function FE3dSceneDisplayRenderable_loadMaterial(p){
   var o = this;
   var pi = p.info();
   o._material.info().assign(pi);
}
function FE3dSceneLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   o._resource    = null;
   o.resource     = FE3dSceneLayer_resource;
   o.loadResource = FE3dSceneLayer_loadResource;
   return o;
}
function FE3dSceneLayer_resource(){
   return this._resource;
}
function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._resource         = null;
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResourcee
   return o;
}
function FE3dSceneMaterial_groupGuid(p){
   return this._resource.groupGuid();
}
function FE3dSceneMaterial_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   o._info.assign(p.info());
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
   o = RClass.inherits(this, o, FStage);
   o._backgroundColor  = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o.construct         = FE3dStage_construct;
   o.backgroundColor   = FE3dStage_backgroundColor;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   o.process           = FE3dStage_process;
   return o;
}
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
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
function FE3dStage_process(){
   var o = this;
   var r = o._region;
   var t = o._technique;
   o.__base.FStage.process.call(o);
   t.updateRegion(r);
   r.prepare();
   t.clear(o._backgroundColor);
   var ls = o._layers;
   if(ls){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var lt = l.technique();
         if(!lt){
            lt = t;
         }
         r.reset();
         l.filterRenderables(r);
         r.update();
         lt.drawRegion(r);
      }
   }
   t.present(r);
}
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FE3dDisplay, MListenerLoad);
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
   o.resource       = FE3dTemplate_resource;
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
function FE3dTemplate_resource(p){
   return this._resource;
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
   o.__base.FE3dDisplay.process.call(o);
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
   o.load           = FE3dTemplateConsole_load;
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
function FE3dTemplateConsole_load(t, n){
   var o = this;
   var rc = RConsole.find(FRs3TemplateConsole);
   var r = rc.load(n);
   t._resourceGuid = n;
   t.setName(n);
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
function FRs3Animation(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._skeletonGuid = null;
   o._skeleton     = null;
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   o._tracks       = null;
   o.skeletonGuid  = FRs3Animation_skeletonGuid;
   o.skeleton      = FRs3Animation_skeleton;
   o.tracks        = FRs3Animation_tracks;
   o.unserialize   = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_skeletonGuid(){
   return this._skeletonGuid;
}
function FRs3Animation_skeleton(){
   var o = this;
   var r = o._skeleton;
   if(!r){
      var g = o._skeletonGuid;
      if(g){
         r = o._skeleton = RConsole.find(FRs3ModelConsole).findSkeleton(g);
      }
   }
   return r;
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
   o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var ts = null;
   var c = p.readUint16();
   if(c > 0){
      ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
         if(k){
            var bi = t.boneIndex();
            var b = k.findBone(bi);
            b.setTrack(t);
         }
      }
   }
   if(ts && o._skeletonGuid){
      var k = o.skeleton();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         var b = k.findBone(t.boneIndex());
         b.setTrack(t);
      }
      k.pushAnimation(o);
   }
}
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   o.index       = FRs3Bone_index;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   o.bones       = FRs3Bone_bones;
   o.unserialize = FRs3Bone_unserialize;
   return o;
}
function FRs3Bone_index(){
   return this._index;
}
function FRs3Bone_track(){
   return this._track;
}
function FRs3Bone_setTrack(p){
   this._track = p;
}
function FRs3Bone_bones(){
   return this._bones;
}
function FRs3Bone_unserialize(p){
   var o = this;
   o._index = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FRs3BoneRefer(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._bone       = null;
   o._track      = null;
   o.index       = FRs3BoneRefer_index;
   o.bone        = FRs3BoneRefer_bone;
   o.setBone     = FRs3BoneRefer_setBone;
   o.track       = FRs3BoneRefer_track;
   o.setTrack    = FRs3BoneRefer_setTrack;
   o.unserialize = FRs3BoneRefer_unserialize;
   return o;
}
function FRs3BoneRefer_index(){
   return this._index;
}
function FRs3BoneRefer_bone(){
   return this._bone;
}
function FRs3BoneRefer_setBone(p){
   this._bone = p;
}
function FRs3BoneRefer_track(){
   return this._track;
}
function FRs3BoneRefer_setTrack(p){
   this._track = p;
}
function FRs3BoneRefer_unserialize(p){
   var o = this;
   o._index = p.readUint8();
}
function FRs3Display(o){
   o = RClass.inherits(this, o, FObject);
   o._template       = null;
   o._typeName       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   o.construct       = FRs3Display_construct;
   o.typeName        = FRs3Display_typeName;
   o.modelGuid       = FRs3Display_modelGuid;
   o.model           = FRs3Display_model;
   o.meshGuid        = FRs3Display_meshGuid;
   o.mesh            = FRs3Display_mesh;
   o.matrix          = FRs3Display_matrix;
   o.materials       = FRs3Display_materials;
   o.unserialize     = FRs3Display_unserialize;
   return o;
}
function FRs3Display_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3Display_typeName(){
   return this._typeName;
}
function FRs3Display_modelGuid(){
   return this._modelGuid;
}
function FRs3Display_model(){
   return RConsole.find(FRs3ModelConsole).findModel(this._modelGuid);
}
function FRs3Display_meshGuid(){
   return this._meshGuid;
}
function FRs3Display_mesh(){
   return RConsole.find(FRs3ModelConsole).findMesh(this._meshGuid);
}
function FRs3Display_matrix(){
   return this._matrix;
}
function FRs3Display_materials(){
   return this._materials;
}
function FRs3Display_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._modelGuid = p.readString();
   o._meshGuid = p.readString();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3DisplayMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
function FRs3DisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._groupGuid  = null;
   o.groupGuid   = FRs3DisplayMaterial_groupGuid;
   o.unserialize = FRs3DisplayMaterial_unserialize;
   return o;
}
function FRs3DisplayMaterial_groupGuid(){
   return this._groupGuid;
}
function FRs3DisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
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
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._groupGuid  = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FRs3Material_construct;
   o.groupGuid   = FRs3Material_groupGuid;
   o.group       = FRs3Material_group;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   o.saveConfig  = FRs3Material_saveConfig;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3Material_groupGuid(){
   return this._groupGuid;
}
function FRs3Material_group(){
   return RConsole.find(FRs3MaterialConsole).findGroup(this._groupGuid);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3Material_saveConfig(p){
   var o = this;
   var mi = o._info;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
   p.set('alpha_base', mi.alphaBase);
   p.set('alpha_rate', mi.alphaRate);
   p.set('ambient_color', mi.ambientColor.toString());
   p.set('diffuse_color', mi.diffuseColor.toString());
   p.set('specular_color', mi.specularColor.toString());
   p.set('specular_level', mi.specularLevel);
   p.set('reflect_color', mi.reflectColor.toString());
   p.set('reflect_merge', mi.reflectMerge);
   p.set('emissive_color', mi.emissiveColor.toString());
}
function FRs3MaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._materialGroups  = null;
   o._materials       = null;
   o.construct        = FRs3MaterialConsole_construct;
   o.findGroup        = FRs3MaterialConsole_findGroup;
   o.find             = FRs3MaterialConsole_find;
   o.unserializeGroup = FRs3MaterialConsole_unserializeGroup;
   o.unserialize      = FRs3MaterialConsole_unserialize;
   return o;
}
function FRs3MaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}
function FRs3MaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}
function FRs3MaterialConsole_find(p){
   return this._materials.get(p);
}
function FRs3MaterialConsole_unserializeGroup(p){
   var o = this;
   var r = RClass.create(FRs3MaterialGroup);
   r.unserialize(p);
   o._materialGroups.set(r.guid(), r);
   return r;
}
function FRs3MaterialConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FRs3Material);
   r.unserialize(p);
   o._materials.set(r.guid(), r);
   return r;
}
function FRs3MaterialGroup(o){
   o = RClass.inherits(this, o, FRs3Object);
   return o;
}
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._bitmapGuid = null;
   o.bitmapGuid  = FRs3MaterialTexture_bitmapGuid;
   o.unserialize = FRs3MaterialTexture_unserialize;
   return o;
}
function FRs3MaterialTexture_bitmapGuid(){
   return this._bitmapGuid;
}
function FRs3MaterialTexture_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._bitmapGuid = p.readString();
}
function FRs3Mesh(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   o.construct   = FRs3Mesh_construct;
   o.outline     = FRs3Mesh_outline;
   o.streams     = FRs3Mesh_streams;
   o.tracks      = FRs3Mesh_tracks;
   o.unserialize = FRs3Mesh_unserialize;
   return o;
}
function FRs3Mesh_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._outline = new SOutline3();
}
function FRs3Mesh_outline(){
   return this._outline;
}
function FRs3Mesh_streams(){
   return this._streams;
}
function FRs3Mesh_tracks(){
   return this._tracks;
}
function FRs3Mesh_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._outline.unserialize(p);
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3Stream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._meshes     = null;
   o._skeletons  = null;
   o._animations = null;
   o.meshes      = FRs3Model_meshes;
   o.skeletons   = FRs3Model_skeletons;
   o.animations  = FRs3Model_animations;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_meshes(){
   return this._meshes;
}
function FRs3Model_skeletons(){
   return this._skeletons;
}
function FRs3Model_animations(){
   return this._animations;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var mc = RConsole.find(FRs3ModelConsole);
   mc.models().set(o.guid(), o);
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialMesh(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialSkeleton(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialAnimation(p));
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   o._dataUrl          = '/cloud.content.model.wv';
   o.construct         = FRs3ModelConsole_construct;
   o.findModel         = FRs3ModelConsole_findModel;
   o.models            = FRs3ModelConsole_models;
   o.findMesh          = FRs3ModelConsole_findMesh;
   o.meshs             = FRs3ModelConsole_meshs;
   o.findSkeleton      = FRs3ModelConsole_findSkeleton;
   o.skeletons         = FRs3ModelConsole_skeletons;
   o.findAnimation     = FRs3ModelConsole_findAnimation;
   o.animations        = FRs3ModelConsole_animations;
   o.unserialMesh      = FRs3ModelConsole_unserialMesh;
   o.unserialSkeleton  = FRs3ModelConsole_unserialSkeleton;
   o.unserialAnimation = FRs3ModelConsole_unserialAnimation;
   o.load              = FRs3ModelConsole_load;
   o.dispose           = FRs3ModelConsole_dispose;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
}
function FRs3ModelConsole_findModel(p){
   return this._models.get(p);
}
function FRs3ModelConsole_models(){
   return this._models;
}
function FRs3ModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FRs3ModelConsole_meshs(){
   return this._meshs;
}
function FRs3ModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
function FRs3ModelConsole_skeletons(){
   return this._skeletons;
}
function FRs3ModelConsole_findAnimation(p){
   return this._animations.get(p);
}
function FRs3ModelConsole_animations(){
   return this._animations;
}
function FRs3ModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FRs3Mesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
function FRs3ModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FRs3Skeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
function FRs3ModelConsole_unserialAnimation(p){
   var o = this;
   var r = RClass.create(FRs3Animation);
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
function FRs3ModelConsole_load(c, v){
   var o = this;
   var ms = o._models;
   var m = ms.get(c);
   if(m == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      m = RClass.create(FRs3Model);
      m.load(u);
      ms.set(c, m);
   }
   return m;
}
function FRs3ModelConsole_dispose(){
   var o = this;
   o._materials = null;
   o.__base.FDisplay.dispose.call(o);
}
function FRs3Object(o){
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FRs3Object_guid;
   o.code        = FRs3Object_code;
   o.label       = FRs3Object_label;
   o.unserialize = FRs3Object_unserialize;
   return o;
}
function FRs3Object_guid(){
   return this._guid;
}
function FRs3Object_code(){
   return this._code;
}
function FRs3Object_label(){
   return this._label;
}
function FRs3Object_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
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
   var o = this;
   var r = p.readInt32();
   if(r != EResult.Success){
      var s = p.readString();
      throw new TError('Unserial resource failure.\n{1}', s);
   }
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
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
   o._layers     = null;
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.layers      = FRs3Scene_layers;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._layers = new TDictionary();
}
function FRs3Scene_technique(){
   return this._technique;
}
function FRs3Scene_region(){
   return this._region;
}
function FRs3Scene_layers(){
   return this._layers;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FRs3SceneLayer);
      l.unserialize(p);
      o._layers.set(l.code(), l);
   }
}
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._projection  = null;
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.projection   = FRs3SceneCamera_projection;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FRs3SceneProjection);
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
function FRs3SceneCamera_projection(){
   return this._projection;
}
function FRs3SceneCamera_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._typeName = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes     = null;
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   o.construct   = FRs3SceneConsole_construct;
   o.load        = FRs3SceneConsole_load;
   o.update      = FRs3SceneConsole_update;
   return o;
}
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FRs3SceneConsole_load(p){
   var o = this;
   var s = o._scenes;
   var r = s.get(p);
   if(r == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + p + '&date=' + RDate.format());
      r = RClass.create(FRs3Scene);
      r.load(u);
      s.set(p, r);
   }
   return r;
}
function FRs3SceneConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update&date=' + RDate.format());
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.__base.FRs3Object.construct.call(o);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}
function FRs3SceneLayer(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._displays   = null;
   o.displays    = FRs3SceneLayer_displays;
   o.unserialize = FRs3SceneLayer_unserialize;
   return o;
}
function FRs3SceneLayer_displays(){
   return this._displays;
}
function FRs3SceneLayer_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3SceneDisplay);
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FRs3SceneLight(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.material            = FRs3SceneLight_material;
   o.camera              = FRs3SceneLight_camera;
   o.unserialize         = FRs3SceneLight_unserialize;
   return o;
}
function FRs3SceneLight_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._shadow1 = new SRs3SceneShadow();
   o._shadow2 = new SRs3SceneShadow();
   o._shadow3 = new SRs3SceneShadow();
   o._material = RClass.create(FRs3SceneMaterial);
   o._camera = RClass.create(FRs3SceneCamera);
}
function FRs3SceneLight_typeName(){
   return this._typeName;
}
function FRs3SceneLight_material(){
   return this._material;
}
function FRs3SceneLight_camera(){
   return this._camera;
}
function FRs3SceneLight_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FRs3SceneMap(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._groupGuid          = null;
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
   o.groupGuid           = FRs3SceneMaterial_groupGuid;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
   return o;
}
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3SceneMaterial_groupGuid(){
   return this._groupGuid;
}
function FRs3SceneMaterial_info(){
   return this._info;
}
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
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
function FRs3SceneProjection(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FRs3SceneProjection_angle;
   o.znear       = FRs3SceneProjection_znear;
   o.zfar        = FRs3SceneProjection_zfar;
   o.unserialize = FRs3SceneProjection_unserialize;
   return o;
}
function FRs3SceneProjection_angle(){
   return this._angle;
}
function FRs3SceneProjection_znear(){
   return this._znear;
}
function FRs3SceneProjection_zfar(){
   return this._zfar;
}
function FRs3SceneProjection_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.__base.FRs3Object.construct.call(o);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._color.unserialize(p);
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FRs3Object);
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
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
   o = RClass.inherits(this, o, FRs3Object);
   o._passes     = null;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}
function FRs3SceneTechnique_passes(){
   return this._passes;
}
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readInt16();
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
   o = RClass.inherits(this, o, FRs3Object);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   o.findBone      = FRs3Skeleton_findBone;
   o.bones         = FRs3Skeleton_bones;
   o.roots         = FRs3Skeleton_roots;
   o.skins         = FRs3Skeleton_skins;
   o.animations    = FRs3Skeleton_animations;
   o.pushAnimation = FRs3Skeleton_pushAnimation;
   o.innerFilter   = FRs3Skeleton_innerFilter;
   o.unserialize   = FRs3Skeleton_unserialize;
   return o;
}
function FRs3Skeleton_findBone(p){
   return this._bones.get(p);
}
function FRs3Skeleton_bones(){
   return this._bones;
}
function FRs3Skeleton_roots(){
   return this._roots;
}
function FRs3Skeleton_skins(){
   return this._skins;
}
function FRs3Skeleton_animations(){
   return this._animations;
}
function FRs3Skeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}
function FRs3Skeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.index(), p);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var s = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FRs3SkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
function FRs3SkeletonSkin(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   o.meshGuid    = FRs3SkeletonSkin_meshGuid;
   o.find        = FRs3SkeletonSkin_find;
   o.streams     = FRs3SkeletonSkin_streams;
   o.boneRefers  = FRs3SkeletonSkin_boneRefers;
   o.unserialize = FRs3SkeletonSkin_unserialize;
   return o;
}
function FRs3SkeletonSkin_meshGuid(){
   return this._meshGuid;
}
function FRs3SkeletonSkin_find(p){
   return this._streams.get(p);
}
function FRs3SkeletonSkin_streams(){
   return this._streams;
}
function FRs3SkeletonSkin_boneRefers(){
   return this._boneRefers;
}
function FRs3SkeletonSkin_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
   o._meshGuid = p.readString();
   var c = p.readUint8();
   if(c > 0){
      var s = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Stream);
         t.unserialize(p);
         s.push(t);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._boneRefers = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3BoneRefer);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FRs3Stream(o){
   o = RClass.inherits(this, o, FObject);
   o._code             = null;
   o._elementDataCd    = 0;
   o._elementCount     = 0;
   o._elementNormalize = false;
   o._dataStride       = 0;
   o._dataCount        = 0;
   o._dataLength       = 0;
   o._data             = null;
   o._formatCd      = EG3dAttributeFormat.Unknown;
   o.name              = FRs3Stream_name;
   o.formatCd          = FRs3Stream_formatCd;
   o.unserialize       = FRs3Stream_unserialize;
   o.dispose           = FRs3Stream_dispose;
   return o;
}
function FRs3Stream_name(){
   return this._name;
}
function FRs3Stream_formatCd(){
   return this._formatCd;
}
function FRs3Stream_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._elementDataCd = p.readUint8();
   o._elementCount = p.readUint8();
   o._elementNormalize = p.readBoolean();
   var ds = o._dataStride = p.readUint8();
   var dc = o._dataCount = p.readInt32();
   var dl = o._dataLength = ds * dc;
   var d = o._data = new ArrayBuffer(dl);
   p.readBytes(d, 0, dl);
}
function FRs3Stream_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._materialGroups = null;
   o._themes         = null;
   o._displays       = null;
   o._activeTheme    = null;
   o.materialGroups  = FRs3Template_materialGroups;
   o.themes          = FRs3Template_themes;
   o.displays        = FRs3Template_displays;
   o.unserialize     = FRs3Template_unserialize;
   return o;
}
function FRs3Template_materialGroups(){
   return this._materialGroups;
}
function FRs3Template_themes(){
   return this._themes;
}
function FRs3Template_displays(){
   return this._displays;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var mc = RConsole.find(FRs3MaterialConsole);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materialGroups = new TDictionary();
      for(var i = 0; i < c; i++){
         var g = mc.unserializeGroup(p);
         s.set(g.guid(), g);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._themes = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3TemplateTheme);
         t.unserialize(p);
         s.push(t);
         if(o._activeTheme == null){
            o._activeTheme = t;
         }
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3Display);
         d._template = o;
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o._dataUrl    = '/cloud.content.template.wv'
   o.construct   = FRs3TemplateConsole_construct;
   o.load        = FRs3TemplateConsole_load;
   o.update      = FRs3TemplateConsole_update;
   return o;
}
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FRs3TemplateConsole_load(c, v){
   var o = this;
   var s = o._templates;
   var t = s.get(c);
   if(t == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      t = RClass.create(FRs3Template);
      t.load(u);
      s.set(c, t);
   }
   return t;
}
function FRs3TemplateConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FRs3TemplateTheme(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._materials   = null;
   o.findMaterial = FRs3TemplateTheme_findMaterial;
   o.materials    = FRs3TemplateTheme_materials;
   o.unserialize  = FRs3TemplateTheme_unserialize;
   return o;
}
function FRs3TemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
function FRs3TemplateTheme_materials(){
   return this._materials;
}
function FRs3TemplateTheme_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = RConsole.find(FRs3MaterialConsole);
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
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
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         s.set(m.code(), m);
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
   o._boneIndex       = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frameCount      = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneIndex        = FRs3Track_boneIndex;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
   o.calculate        = FRs3Track_calculate;
   o.unserialize      = FRs3Track_unserialize;
   return o;
}
function FRs3Track_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FRs3Track_boneIndex(){
   return this._boneIndex;
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
function FRs3Track_calculate(pi, pt){
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
   var fs = o.frames();
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
function FRs3Track_unserialize(p){
   var o = this;
   o._boneIndex = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   var c = p.readInt16();
   if(c > 0){
      o._frameCount = c;
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
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
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.ambientColor.unserialize(p);
   o.diffuseColor.unserialize(p);
   o.diffuseViewColor.unserialize(p);
   o.specularColor.unserialize(p);
   o.specularLevel = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewLevel = p.readFloat();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
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
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FRd3Animation_construct;
   o.findTrack    = FRd3Animation_findTrack;
   o.tracks       = FRd3Animation_tracks;
   o.resource     = FRd3Animation_resource;
   o.loadResource = FRd3Animation_loadResource;
   o.record       = FRd3Animation_record;
   o.process      = RMethod.virtual(o, 'process');
   o.dispose      = FRd3Animation_dispose;
   return o;
}
function FRd3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._tracks = new TObjects();
   o._playInfo = new SRd3PlayInfo();
}
function FRd3Animation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneIndex() == p){
         return t;
      }
   }
   return null;
}
function FRd3Animation_tracks(){
   return this._tracks;
}
function FRd3Animation_resource(){
   return this._resource;
}
function FRd3Animation_loadResource(p){
   var o = this;
   o._resource = p;
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t._animation = o;
      t.loadResource(rt);
      o._tracks.push(t);
   }
}
function FRd3Animation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
}
function FRd3Animation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FRd3BitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.content.texture.bitmap.wv'
   o.construct = FRd3BitmapConsole_construct;
   o.bitmaps   = FRd3BitmapConsole_bitmaps;
   o.load      = FRd3BitmapConsole_load;
   return o;
}
function FRd3BitmapConsole_construct(){
   var o = this;
   o._bitmaps = new TDictionary();
}
function FRd3BitmapConsole_bitmaps(){
   return this._bitmaps;
}
function FRd3BitmapConsole_load(pc, pg, pt){
   var o = this;
   var t = o._bitmaps.get(pg);
   if(t){
      return t;
   }
   var u = RBrowser.hostPath(o._dataUrl + '?code=' + pg);
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   if(RString.toLower(pt) == 'environment'){
      t = RClass.create(FRd3TextureCube);
      t.linkContext(pc);
      t._name = pg;
      t.load(u);
   }else{
      t = RClass.create(FRd3Texture);
      t.linkContext(pc);
      t._name = pg;
      t.load(u);
   }
   o._bitmaps.set(pg, t);
   return t;
}
function FRd3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   o.construct      = FRd3Bone_construct;
   o.matrix         = FRd3Bone_matrix;
   o.trackResource  = FRd3Bone_trackResource;
   o.loadResource   = FRd3Bone_loadResource;
   o.update         = FRd3Bone_update;
   o.dispose        = FRd3Bone_dispose;
   return o;
}
function FRd3Bone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRd3Bone_matrix(){
   return this._matrix;
}
function FRd3Bone_trackResource(){
   return this._trackResource;
}
function FRd3Bone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}
function FRd3Bone_update(pi, pt){
   var o = this;
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   var m = o._matrix;
   m.assign(t.matrixInvert());
   m.append(pi.matrix);
}
function FRd3Bone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FRd3BoundBox(o){
   o = RClass.inherits(this, o, FRd3Renderable);
   o._outline              = null;
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FRd3BoundBox_construct;
   o.outline               = FRd3BoundBox_outline;
   o.setup                 = FRd3BoundBox_setup;
   o.upload                = FRd3BoundBox_upload;
   return o;
}
function FRd3BoundBox_construct(){
   var o = this;
   o.__base.FRd3Renderable.construct.call(o);
   o._outline = new SOutline3();
}
function FRd3BoundBox_outline(){
   return this._outline;
}
function FRd3BoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   o._vertexBuffers.set(vb._name, vb);
   var vd = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vd[n] = 0xFF;
   }
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vd, 1 * 4, 32);
   o._vertexBuffers.set(vb._name, vb);
   o._vertexCount = 32;
   var id = [
      00, 01, 00, 04, 00, 12,
      03, 02, 03, 05, 03, 13,
      08, 06, 08, 09, 08, 14,
      11, 07, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib.upload(id, 48);
   o.update();
}
function FRd3BoundBox_upload(){
   var o = this;
   var l = o._outline;
   var a = l.max;
   var ax = a.x;
   var ay = a.y;
   var az = a.z;
   var i = l.min;
   var ix = i.x;
   var iy = i.y;
   var iz = i.z;
   var r = o._rate;
   var cx = (ax - ix) * r;
   var cy = (ay - iy) * r;
   var cz = (az - iz) * r;
   var vd = [
      ix,       ay,      iz,
      ix + cx,  ay,      iz,
      ax - cx,  ay,      iz,
      ax,       ay,      iz,
      ix,       ay - cy, iz,
      ax,       ay - cy, iz,
      ix,       iy + cy, iz,
      ax,       iy + cy, iz,
      ix,       iy,      iz,
      ix + cx,  iy,      iz,
      ax - cx,  iy,      iz,
      ax,       iy,      iz,
      ix,       ay,      iz + cz,
      ax,       ay,      iz + cz,
      ix,       iy,      iz + cz,
      ax,       iy,      iz + cz,
      ix,       ay,      az - cz,
      ax,       ay,      az - cz,
      ix,       iy,      az - cz,
      ax,       iy,      az - cz,
      ix,       ay,      az,
      ix + cx,  ay,      az,
      ax - cx,  ay,      az,
      ax,       ay,      az,
      ix,       ay - cy, az,
      ax,       ay - cy, az,
      ix,       iy + cy, az,
      ax,       iy + cy, az,
      ix,       iy,      az,
      ix + cx,  iy,      az,
      ax - cx,  iy,      az,
      ax,       iy,      az];
   o._vertexPositionBuffer.upload(vd, 4 * 3, 32);
}
function FRd3Cube(o){
   o = RClass.inherits(this, o, FG3dRenderable);
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
function FRd3Dimensional(o){
   o = RClass.inherits(this, o, FRd3Renderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FRd3Dimensional_construct;
   o.setup                 = FRd3Dimensional_setup;
   return o;
}
function FRd3Dimensional_construct(){
   var o = this;
   o.__base.FRd3Renderable.construct.call(o);
   o._cellSize = new SSize2();
   o._cellSize.set(1, 1);
   o._size = new SSize2();
   o._size.set(16, 16);
}
function FRd3Dimensional_setup(){
   var o = this;
   var c = o._graphicContext;
   var cw = o._cellSize.width;
   var ch = o._cellSize.height;
   var sw = o._size.width;
   var sw2 = sw / 2;
   var sh = o._size.height;
   var sh2 = sh / 2;
   var vc = 2 * ((sw + 2) + (sh + 2));
   var v = 0;
   var vi = 0;
   var vd = new Float32Array(3 * vc);
   var vci = 0;
   var vcd = new Uint8Array(4 * vc);
   var i = 0;
   var it = vc;
   var id = new Uint16Array(it);
   for(var y = 0; y <= sh; y++){
      var r = 1;
      if(y - sh2 == 0){
         r = 0
      }
      vd[v++] = cw * -sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      vd[v++] = cw * sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = cw * -sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = cw * sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   for(var x = 0; x <= sw; x++){
      var r = 1;
      if(x - sw2 == 0){
         r = 0
      }
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * - sh2 * r;
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * sh2 * r;
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * -sh2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   o._vertexCount = vc;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   vb.upload(vd, 4 * 3, vc);
   o._vertexBuffers.set(vb._name, vb);
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vcd, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib.upload(id, it);
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
function FRd3Mesh(o){
   o = RClass.inherits(this, o, FRd3Object);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._skins            = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FRd3Mesh_construct;
   o.testReady         = FRd3Mesh_testReady;
   o.guid              = FRd3Mesh_guid;
   o.vertexCount       = FRd3Mesh_vertexCount;
   o.findVertexBuffer  = FRd3Mesh_findVertexBuffer;
   o.vertexBuffers     = FRd3Mesh_vertexBuffers;
   o.indexBuffer       = FRd3Mesh_indexBuffer;
   o.material          = FRd3Mesh_material;
   o.skins             = FRd3Mesh_skins;
   o.pushSkin          = FRd3Mesh_pushSkin;
   o.findTexture       = FRd3Mesh_findTexture;
   o.textures          = FRd3Mesh_textures;
   o.boneIds           = FRd3Mesh_boneIds;
   o.loadResource      = FRd3Mesh_loadResource;
   return o;
}
function FRd3Mesh_construct(){
   var o = this;
   o.__base.FRd3Object.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRd3Mesh_testReady(){
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
function FRd3Mesh_guid(){
   return this._resource.guid();
}
function FRd3Mesh_vertexCount(){
   return this._vertexCount;
}
function FRd3Mesh_findVertexBuffer(p){
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
function FRd3Mesh_vertexBuffers(){
   return this._vertexBuffers;
}
function FRd3Mesh_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Mesh_material(){
   return this._material;
}
function FRd3Mesh_skins(){
   return this._skins;
}
function FRd3Mesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}
function FRd3Mesh_findTexture(p){
   return this._textures.get(p);
}
function FRd3Mesh_textures(){
   return this._textures;
}
function FRd3Mesh_boneIds(p){
   return this._boneIds;
}
function FRd3Mesh_loadResource(p){
   var o = this;
   var c = o._graphicContext;
   o._resource = p;
   var rss = p.streams();
   var rsc = rss.count();
   for(var i = 0; i < rsc; i++){
      var rs = rss.get(i);
      var rc = rs._code;
      if((rc == 'index16') || (rc == 'index32')){
         var b = o._indexBuffer = c.createIndexBuffer();
         b.upload(rs._data, rs._dataCount * 3);
      }else{
         var b = c.createVertexBuffer();
         b._name = rc;
         o._vertexCount = rs._dataCount;
         switch(rc){
            case "position":
               b._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               b._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError("Unknown code");
         }
         b.upload(rs._data, rs._dataStride, rs._dataCount);
         o._vertexBuffers.push(b);
      }
   }
}
function FRd3MeshAnimation(o){
   o = RClass.inherits(this, o, FRd3Animation);
   o.process = FRd3MeshAnimation_process;
   return o;
}
function FRd3MeshAnimation_process(p){
   var o = this;
   var ct = o._currentTick;
   var r = p._resource;
   var pi = o._playInfo;
   r.calculate(pi, ct);
   pi.update();
   var m = p._matrix;
   m.assign(r.matrixInvert());
   m.append(pi.matrix);
}
function FRd3Model(o){
   o = RClass.inherits(this, o, FRd3Object);
   o._name                = null;
   o._resource            = null;
   o._meshes              = null;
   o._skeletons           = null;
   o._dataReady           = false;
   o.name                 = FRd3Model_name;
   o.setName              = FRd3Model_setName;
   o.findMeshByGuid       = FRd3Model_findMeshByGuid;
   o.geometrys            = FRd3Model_geometrys;
   o.resource             = FRd3Model_resource;
   o.resource             = FRd3Model_resource;
   o.setResource          = FRd3Model_setResource;
   o.testReady            = FRd3Model_testReady;
   o.loadResource         = FRd3Model_loadResource;
   o.loadSkeletonResource = FRd3Model_loadSkeletonResource;
   o.processLoad          = FRd3Model_processLoad;
   return o;
}
function FRd3Model_name(){
   return this._name;
}
function FRd3Model_setName(p){
   this._name = p;
}
function FRd3Model_findMeshByGuid(p){
   var o = this;
   var s = o._meshes;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var m = s.get(i);
      if(m._guid == p){
         return m;
      }
   }
   return null;
}
function FRd3Model_geometrys(){
   return this._meshes;
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
function FRd3Model_loadSkeletonResource(p){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   var ss = p.skins();
   if(ss){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         var rs = RClass.create(FRd3Skin);
         rs.linkGraphicContext(o);
         rs.loadResource(s)
         var m = rmc.findMesh(s.meshGuid());
         m.pushSkin(rs);
      }
   }
}
function FRd3Model_loadResource(p){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FRd3Mesh);
         g.linkGraphicContext(o);
         g.loadResource(rg);
         gs.push(g);
         rmc.meshs().set(g.guid(), g);
      }
   }
   var rks = p.skeletons();
   if(rks){
      var c = rks.count();
      for(var i = 0; i < c; i++){
         var rk = rks.get(i);
         o.loadSkeletonResource(rk);
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
   o._meshs      = null;
   o._thread     = null;
   o._interval   = 200;
   o.onProcess   = FRd3ModelConsole_onProcess;
   o.construct   = FRd3ModelConsole_construct;
   o.findModel   = FRd3ModelConsole_findModel;
   o.models      = FRd3ModelConsole_models;
   o.findMesh    = FRd3ModelConsole_findMesh;
   o.meshs       = FRd3ModelConsole_meshs;
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
   o._meshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FRd3ModelConsole_findModel(p){
   return this._models.get(p);
}
function FRd3ModelConsole_models(){
   return this._models;
}
function FRd3ModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FRd3ModelConsole_meshs(){
   return this._meshs;
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
   m.linkGraphicContext(pc);
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
function FRd3Object(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   return o;
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
function FRd3Polygon(o){
   o = RClass.inherits(this, o, FRd3Renderable);
   return o;
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
function FRd3Renderable(o){
   o = RClass.inherits(this, o, FG3dRenderable, MGraphicObject);
   o._display         = null;
   o._vertexCount     = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o.construct        = FRd3Renderable_construct;
   o.setup            = RMethod.empty;
   o.testVisible      = RMethod.emptyTrue;
   o.display          = FRd3Renderable_display;
   o.setDisplay       = FRd3Renderable_setDisplay;
   o.vertexCount      = FRd3Renderable_vertexCount;
   o.findVertexBuffer = FRd3Renderable_findVertexBuffer;
   o.vertexBuffers    = FRd3Renderable_vertexBuffers;
   o.indexBuffer      = FRd3Renderable_indexBuffer;
   o.textures         = RMethod.empty;
   o.bones            = RMethod.empty;
   o.update           = FRd3Renderable_update;
   o.remove           = FRd3Renderable_remove;
   return o;
}
function FRd3Renderable_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
   o._vertexBuffers = new TDictionary();
}
function FRd3Renderable_display(){
   return this._display;
}
function FRd3Renderable_setDisplay(p){
   this._display = p;
}
function FRd3Renderable_vertexCount(){
   return this._vertexCount;
}
function FRd3Renderable_findVertexBuffer(p){
   return this._vertexBuffers.get(p);
}
function FRd3Renderable_vertexBuffers(){
   return this._vertexBuffers;
}
function FRd3Renderable_indexBuffer(){
   return this._indexBuffer;
}
function FRd3Renderable_update(p){
   var o = this;
   var m = o._currentMatrix;
   m.assign(o._matrix);
   var d = o._display;
   if(d){
      m.append(d.currentMatrix());
   }
}
function FRd3Renderable_remove(){
   var o = this;
   var d = o._display;
   if(d){
      d.removeRenderable(o);
      o._display = null;
   }
}
function FRd3Skeleton(o){
   o = RClass.inherits(this, o, FRd3Object);
   o._resource    = null;
   o._bones       = null;
   o._skins       = null;
   o.resource     = FRd3Skeleton_resource;
   o.bones        = FRd3Skeleton_bones;
   o.skins        = FRd3Skeleton_skins;
   o.loadResource = FRd3Skeleton_loadResource;
   return o;
}
function FRd3Skeleton_resource(){
   return this._resource;
}
function FRd3Skeleton_bones(){
   return this._bones;
}
function FRd3Skeleton_skins(){
   return this._skins;
}
function FRd3Skeleton_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p._bones;
   var c = rs.count();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
function FRd3SkeletonAnimation(o){
   o = RClass.inherits(this, o, FRd3Animation);
   o.process = FRd3SkeletonAnimation_process;
   return o;
}
function FRd3SkeletonAnimation_process(p){
   var o = this;
   var ct = o._currentTick;
   var bs = p.bones();
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.get(i).update(o._playInfo, ct);
   }
}
function FRd3Skin(o){
   o = RClass.inherits(this, o, FRd3Object);
   o._resource    = null;
   o._streams     = null;
   o.resource     = FRd3Skin_resource;
   o.streams      = FRd3Skin_streams;
   o.loadResource = FRd3Skin_loadResource;
   return o;
}
function FRd3Skin_resource(){
   return this._resource;
}
function FRd3Skin_streams(){
   return this._streams;
}
function FRd3Skin_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p.streams();
   if(rs){
      var ss = o._streams = new TObjects();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRd3Stream);
         s.linkGraphicContext(o);
         s.loadResource(rs.get(i));
         ss.push(s);
      }
   }
}
function FRd3Stream(o){
   o = RClass.inherits(this, o, FRd3Object);
   o._buffer      = null;
   o._resource    = null;
   o.resource     = FRd3Stream_resource;
   o.buffer       = FRd3Stream_buffer;
   o.loadResource = FRd3Stream_loadResource;
   return o;
}
function FRd3Stream_resource(){
   return this._resource;
}
function FRd3Stream_buffer(){
   return this._buffer;
}
function FRd3Stream_loadResource(p){
   var o = this;
   var c = p._code;
   o._resource = p;
   o._vertexCount = p._dataCount;
   var b = o._buffer = o._graphicContext.createVertexBuffer();
   b._name = c;
   switch(c){
      case "bone_index":
         b._formatCd = EG3dAttributeFormat.Byte4;
         break;
      case "bone_weight":
         b._formatCd = EG3dAttributeFormat.Byte4Normal;
         break;
      default:
         throw new TError("Unknown code");
   }
   b.upload(p._data, p._dataStride, p._dataCount);
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
   g.loadUrl(u + "-x1");
   var g = o.imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x2");
   var g = o.imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y1");
   var g = o.imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y2");
   var g = o.imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z1");
   var g = o.imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z2");
}
function FRd3Track(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix      = null
   o._resource    = null;
   o.construct    = FRd3Track_construct;
   o.matrix       = FRd3Track_matrix;
   o.resource     = FRd3Track_resource;
   o.loadResource = FRd3Track_loadResource;
   o.dispose      = FRd3Track_dispose;
   return o;
}
function FRd3Track_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRd3Track_matrix(){
   return this._matrix;
}
function FRd3Track_resource(){
   return this._resource;
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
   var cf = o.currentFrame;
   if(cf == null){
      return false;
   }
   var nf = o.nextFrame;
   if(nf == null){
      return false;
   }
   var m = o.matrix;
   var ct = cf.translation();
   var cr = cf.quaternion();
   var cs = cf.scale();
   var r = o.rate;
   if((r > 0) && (r < 1)){
      o.translation.slerp(ct, nf.translation(), r);
      o.quaternion.slerp(cr, nf.quaternion(), r);
      o.scale.slerp(cs, nf.scale(), r);
      m.build(o.translation, o.quaternion, o.scale);
   }else{
      m.build(ct, cr, cs);
   }
   return true;
}
