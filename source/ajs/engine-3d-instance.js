MO.EE3dInstance = new function EE3dInstance(){
   var o = this;
   o.ModelRenderable    = 'model.renderable';
   o.TemplateRenderable = 'template.renderable';
   o.Scene              = 'scene';
   o.SceneLayer         = 'scene.layer';
   o.SceneDisplay       = 'scene.display';
   o.SceneMaterial      = 'scene.material';
   o.SceneMovie         = 'scene.movie';
   o.SceneRenderable    = 'scene.renderable';
   return o;
}
with(MO){
   MO.FE3dAnimation = function FE3dAnimation(o){
      o = RClass.inherits(this, o, FObject, ME3dObject, MLinkerResource);
      return o;
   }
}
with(MO){
   MO.FE3dCamera = function FE3dCamera(o){
      o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
      o._rotation       = null;
      o._rotationMatrix = null;
      o._quaternion     = null;
      o._quaternionX    = null;
      o._quaternionY    = null;
      o._quaternionZ    = null;
      o.construct       = FE3dCamera_construct;
      o.rotation        = FE3dCamera_rotation;
      o.doMoveX         = FE3dCamera_doMoveX;
      o.doMoveY         = FE3dCamera_doMoveY;
      o.doMoveZ         = FE3dCamera_doMoveZ;
      o.doForward       = FE3dCamera_doForward;
      o.doPitch         = FE3dCamera_doPitch;
      o.doYaw           = FE3dCamera_doYaw;
      o.doRoll          = FE3dCamera_doRoll;
      o.loadResource    = FE3dCamera_loadResource;
      o.commitResource  = FE3dCamera_commitResource;
      o.update          = FE3dCamera_update;
      return o;
   }
   MO.FE3dCamera_construct = function FE3dCamera_construct(){
      var o = this;
      o.__base.FG3dPerspectiveCamera.construct.call(o);
      o._rotation = new SVector3();
      o._rotationMatrix = new SMatrix3x3();
      o._quaternion = new SQuaternion();
      o._quaternionX = new SQuaternion();
      o._quaternionY = new SQuaternion();
      o._quaternionZ = new SQuaternion();
   }
   MO.FE3dCamera_rotation = function FE3dCamera_rotation(){
      return this._rotation;
   }
   MO.FE3dCamera_doMoveX = function FE3dCamera_doMoveX(value){
      this._position.x += value;
   }
   MO.FE3dCamera_doMoveY = function FE3dCamera_doMoveY(value){
      this._position.y += value;
   }
   MO.FE3dCamera_doMoveZ = function FE3dCamera_doMoveZ(value){
      this._position.z += value;
   }
   MO.FE3dCamera_doForward = function FE3dCamera_doForward(value){
      var o = this;
      o._position.x += o._direction.x * value;
      o._position.y += o._direction.y * value;
      o._position.z += o._direction.z * value;
   }
   MO.FE3dCamera_doPitch = function FE3dCamera_doPitch(p){
      this._rotation.x += p;
   }
   MO.FE3dCamera_doYaw = function FE3dCamera_doYaw(p){
      this._rotation.y += p;
   }
   MO.FE3dCamera_doRoll = function FE3dCamera_doRoll(p){
      this._rotation.z += p;
   }
   MO.FE3dCamera_loadResource = function FE3dCamera_loadResource(resource){
      var o = this;
      var resourceProjection = resource.projection();
      o._resource = resource;
      o.position().assign(resource.position());
      o.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
      o.update();
      var projection = o.projection();
      projection._angle = resourceProjection.angle();
      projection._znear = resourceProjection.znear();
      projection._zfar = resourceProjection.zfar();
      projection.update();
   }
   MO.FE3dCamera_commitResource = function FE3dCamera_commitResource(){
      var o = this;
      var resource = o._resource;
      resource._position.assign(o._position);
      resource._direction.assign(o._direction);
   }
   MO.FE3dCamera_update = function FE3dCamera_update(){
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
      o.__base.FG3dPerspectiveCamera.update.call(o);
   }
}
with(MO){
   MO.FE3dDirectionalLight = function FE3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
      o._material    = null;
      o.construct    = FE3dDirectionalLight_construct;
      o.material     = FE3dDirectionalLight_material;
      o.loadResource = FE3dDirectionalLight_loadResource;
      o.dispose      = FE3dDirectionalLight_dispose;
      return o;
   }
   MO.FE3dDirectionalLight_construct = function FE3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dDirectionalLight.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dDirectionalLight_material = function FE3dDirectionalLight_material(){
      return this._material;
   }
   MO.FE3dDirectionalLight_loadResource = function FE3dDirectionalLight_loadResource(resource){
      var o = this;
      o.__base.MLinkerResource.loadResource.call(o, resource);
      o._material.loadResource(resource.material());
   }
   MO.FE3dDirectionalLight_dispose = function FE3dDirectionalLight_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FG3dDirectionalLight.dispose.call(o);
   }
}
with(MO){
   MO.FE3dFlatStage = function FE3dFlatStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._layer    = null;
      o.construct = FE3dFlatStage_construct;
      o.layer     = FE3dFlatStage_layer;
      return o;
   }
   MO.FE3dFlatStage_construct = function FE3dFlatStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
   }
   MO.FE3dFlatStage_layer = function FE3dFlatStage_layer(){
      return this._layer;
   }
}
with(MO){
   MO.FE3dInstanceConsole = function FE3dInstanceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._factory   = null;
      o.construct  = FE3dInstanceConsole_construct;
      o.factory    = FE3dInstanceConsole_factory;
      o.register   = FE3dInstanceConsole_register;
      o.unregister = FE3dInstanceConsole_unregister;
      o.create     = FE3dInstanceConsole_create;
      return o;
   }
   MO.FE3dInstanceConsole_construct = function FE3dInstanceConsole_construct(){
      var o = this;
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register(EE3dInstance.ModelRenderable, FE3dModelRenderable);
      factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
      factory.register(EE3dInstance.Scene, FE3dScene);
      factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
      factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
      factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
      factory.register(EE3dInstance.SceneMovie, FE3dMovie);
      factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
   }
   MO.FE3dInstanceConsole_factory = function FE3dInstanceConsole_factory(){
      return this._factory;
   }
   MO.FE3dInstanceConsole_register = function FE3dInstanceConsole_register(code, clazz){
      this._factory.register(code, clazz);
   }
   MO.FE3dInstanceConsole_unregister = function FE3dInstanceConsole_unregister(code){
      this._factory.unregister(code, clazz);
   }
   MO.FE3dInstanceConsole_create = function FE3dInstanceConsole_create(code){
      return this._factory.create(code);
   }
}
with(MO){
   MO.FE3dMaterial = function FE3dMaterial(o){
      o = RClass.inherits(this, o, FE3rMaterial);
      o._parent    = null;
      o.loadParent = FE3dRenderable_loadParent;
      return o;
   }
   MO.FE3dRenderable_loadParent = function FE3dRenderable_loadParent(material){
      var o = this;
      o._parent = material;
   }
}
with(MO){
   MO.FE3dMesh = function FE3dMesh(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready         = false;
      o._display       = null;
      o._renderable    = null;
      o._layer         = null;
      o.construct      = FE3dMesh_construct;
      o.testReady      = FE3dMesh_testReady;
      o.loadRenderable = FE3dMesh_loadRenderable;
      o.processLoad    = FE3dMesh_processLoad;
      o.process        = FE3dMesh_process;
      return o;
   }
   MO.FE3dMesh_construct = function FE3dMesh_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var l = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', l);
   }
   MO.FE3dMesh_testReady = function FE3dMesh_testReady(){
      return this._ready;
   }
   MO.FE3dMesh_loadRenderable = function FE3dMesh_loadRenderable(p){
      var o = this;
      var resource = p.resource();
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.loadResource(resource);
      var m = RClass.create(FE3dMeshRenderable);
      m.setResource(resource._renderable);
      m._material.loadResource(resource._display._material);
      m._renderable = p;
      var vbs = p._vertexBuffers;
      var vbc = vbs.count();
      for(var i = 0; i < vbc; i++){
         var vb = vbs.getAt(i);
         m._vertexBuffers.set(vb._name, vb);
      }
      m._indexBuffer = p._indexBuffer;
      m.matrix().assign(m.resource().matrix());
      var display = o._display = RClass.create(FE3dMeshDisplay);
      display._renderable = m;
      display.load(resource._display);
      display.pushRenderable(m);
      o._layer.pushDisplay(display);
      o._ready = true;
      o.processLoadListener(o);
   }
   MO.FE3dMesh_processLoad = function FE3dMesh_processLoad(){
      var o = this;
      if(!o._renderable.testReady()){
         return false;
      }
      o.loadRenderable(o._renderable);
      return true;
   }
   MO.FE3dMesh_process = function FE3dMesh_process(){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
}
with(MO){
   MO.FE3dMeshConsole = function FE3dMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadMeshs  = null;
      o._meshs      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dMeshConsole_onProcess;
      o.construct   = FE3dMeshConsole_construct;
      o.meshs       = FE3dMeshConsole_meshs;
      o.allocByGuid = FE3dMeshConsole_allocByGuid;
      o.allocByCode = FE3dMeshConsole_allocByCode;
      o.free        = FE3dMeshConsole_free;
      return o;
   }
   MO.FE3dMeshConsole_onProcess = function FE3dMeshConsole_onProcess(){
      var o = this;
      var ms = o._loadMeshs;
      ms.record();
      while(ms.next()){
         var m = ms.current();
         if(m.processLoad()){
            ms.removeCurrent();
         }
      }
   }
   MO.FE3dMeshConsole_construct = function FE3dMeshConsole_construct(){
      var o = this;
      o._loadMeshs = new TLooper();
      o._meshs = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dMeshConsole_meshs = function FE3dMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3dMeshConsole_allocByGuid = function FE3dMeshConsole_allocByGuid(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByGuid(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_allocByCode = function FE3dMeshConsole_allocByCode(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByCode(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_free = function FE3dMeshConsole_free(p){
      var o = this;
      p._display.remove();
   }
}
with(MO){
   MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._renderable    = null;
      o.renderable     = FE3dMeshDisplay_renderable;
      o.load           = FE3dMeshDisplay_load;
      o.reloadResource = FE3dMeshDisplay_reloadResource;
      return o;
   }
   MO.FE3dMeshDisplay_renderable = function FE3dMeshDisplay_renderable(){
      return this._renderable;
   }
   MO.FE3dMeshDisplay_load = function FE3dMeshDisplay_load(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
   }
   MO.FE3dMeshDisplay_reloadResource = function FE3dMeshDisplay_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
}
with(MO){
   MO.FE3dMeshRenderable = function FE3dMeshRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._renderable      = RClass.register(o, AGetSet('_renderable'));
      o._activeTrack     = null;
      o.vertexCount      = FE3dMeshRenderable_vertexCount;
      o.findVertexBuffer = FE3dMeshRenderable_findVertexBuffer;
      o.vertexBuffers    = FE3dMeshRenderable_vertexBuffers;
      o.indexBuffers     = FE3dMeshRenderable_indexBuffers;
      o.findTexture      = FE3dMeshRenderable_findTexture;
      o.textures         = FE3dMeshRenderable_textures;
      o.reloadResource   = FE3dMeshRenderable_reloadResource;
      o.process          = FE3dMeshRenderable_process;
      o.processDelay     = FE3dMeshRenderable_processDelay;
      o.update           = FE3dMeshRenderable_update;
      o.dispose          = FE3dMeshRenderable_dispose;
      return o;
   }
   MO.FE3dMeshRenderable_vertexCount = function FE3dMeshRenderable_vertexCount(){
      return this._renderable.vertexCount();
   }
   MO.FE3dMeshRenderable_findVertexBuffer = function FE3dMeshRenderable_findVertexBuffer(code){
      var o = this;
      var buffer = o._vertexBuffers.get(code);
      if(buffer){
         return buffer;
      }
      return o._renderable.findVertexBuffer(code);
   }
   MO.FE3dMeshRenderable_vertexBuffers = function FE3dMeshRenderable_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }
   MO.FE3dMeshRenderable_indexBuffers = function FE3dMeshRenderable_indexBuffers(){
      return this._renderable.indexBuffers();
   }
   MO.FE3dMeshRenderable_findTexture = function FE3dMeshRenderable_findTexture(code){
      var o = this;
      var textures = o._textures.get(code);
      if(textures){
         return textures;
      }
      return o._renderable.findTexture(p);
   }
   MO.FE3dMeshRenderable_textures = function FE3dMeshRenderable_textures(){
      var o = this;
      var textures = o._textures;
      if(textures){
         return textures;
      }
      return o._renderable.textures();
   }
   MO.FE3dMeshRenderable_reloadResource = function FE3dMeshRenderable_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
   MO.FE3dMeshRenderable_process = function FE3dMeshRenderable_process(region){
      var o = this;
      o.__base.FE3dRenderable.process.call(o, region);
      var track = o._activeTrack;
      if(track){
         if(o._display._optionPlay){
            var animation = track._animation;
            if(animation){
               animation.process(track);
            }
         }
      }
   }
   MO.FE3dMeshRenderable_processDelay = function FE3dMeshRenderable_processDelay(p){
      var o = this;
      o.__base.FE3dRenderable.processDelay.call(o, p);
   }
   MO.FE3dMeshRenderable_update = function FE3dMeshRenderable_update(region){
      var o = this;
      var display = o._display;
      var matrix = o._matrix;
      var track = o._activeTrack;
      var calculateMatrix = o._calculateMatrix;
      if(track){
         calculateMatrix.assign(track.matrix());
         calculateMatrix.append(matrix);
      }else{
         calculateMatrix.assign(matrix);
      }
      if(display){
         var displayMatrix = o._display.currentMatrix();
         calculateMatrix.append(displayMatrix);
      }
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed){
         region.change();
      }
   }
   MO.FE3dMeshRenderable_dispose = function FE3dMeshRenderable_dispose(){
      var o = this;
      o._modelMatrix = RObject.dispose(o._modelMatrix);
      o._vertexBuffers = RObject.dispose(o._vertexBuffers);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModel = function FE3dModel(o){
      o = RClass.inherits(this, o, FE3dSpace, MPoolAble, MLinkerResource, MListenerLoad);
      o._dataReady     = false;
      o._renderable    = null;
      o._display       = null;
      o.construct      = FE3dModel_construct;
      o.display        = FE3dModel_display;
      o.testReady      = FE3dModel_testReady;
      o.renderable     = FE3dModel_renderable;
      o.setRenderable  = FE3dModel_setRenderable;
      o.loadRenderable = FE3dModel_loadRenderable;
      o.processLoad    = FE3dModel_processLoad;
      return o;
   }
   MO.FE3dModel_construct = function FE3dModel_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('sprite', layer);
      var display = o._display = RClass.create(FE3dModelDisplay);
      layer.pushDisplay(display);
   }
   MO.FE3dModel_display = function FE3dModel_display(){
      return this._display;
   }
   MO.FE3dModel_testReady = function FE3dModel_testReady(){
      return this._dataReady;
   }
   MO.FE3dModel_renderable = function FE3dModel_renderable(){
      return this._renderable;
   }
   MO.FE3dModel_setRenderable = function FE3dModel_setRenderable(renderable){
      this._renderable = renderable;
   }
   MO.FE3dModel_loadRenderable = function FE3dModel_loadRenderable(renderable){
      var o = this;
      o._renderable = renderable;
      var resource = renderable.resource();
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadResource(resource);
      o._display.load(renderable);
      o._dataReady = true;
   }
   MO.FE3dModel_processLoad = function FE3dModel_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      var renderable = o._renderable;
      if(!renderable.testReady()){
         return false;
      }
      o.loadRenderable(renderable);
      o.processLoadListener(o);
      return true;
   }
}
with(MO){
   MO.FE3dModelConsole = function FE3dModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._looper     = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dModelConsole_onProcess;
      o.construct   = FE3dModelConsole_construct;
      o.pools       = FE3dModelConsole_pools;
      o.allocByGuid = FE3dModelConsole_allocByGuid;
      o.allocByCode = FE3dModelConsole_allocByCode;
      o.free        = FE3dModelConsole_free;
      return o;
   }
   MO.FE3dModelConsole_onProcess = function FE3dModelConsole_onProcess(){
      var o = this;
      var looper = o._looper;
      looper.record();
      while(looper.next()){
         var item = looper.current();
         if(item.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dModelConsole_construct = function FE3dModelConsole_construct(){
      var o = this;
      o._looper = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dModelConsole_pools = function FE3dModelConsole_pools(){
      return this._pools;
   }
   MO.FE3dModelConsole_allocByGuid = function FE3dModelConsole_allocByGuid(context, guid){
      var o = this;
      var model = o._pools.alloc(guid);
      if(model){
         return model;
      }
      var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
      var model = RClass.create(FE3dModel);
      model.linkGraphicContext(context);
      model.setPoolCode(guid);
      model.setRenderable(renderable);
      o._looper.push(model);
      return model;
   }
   MO.FE3dModelConsole_allocByCode = function FE3dModelConsole_allocByCode(context, code){
      var o = this;
      var model = o._pools.alloc(code);
      if(model){
         return model;
      }
      return model;
   }
   MO.FE3dModelConsole_free = function FE3dModelConsole_free(model){
      var o = this;
      var code = model.poolCode();
      o._pools.free(code, model);
   }
}
with(MO){
   MO.FE3dModelDisplay = function FE3dModelDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._shapes        = null;
      o.construct      = FE3dModelDisplay_construct;
      o.material       = FE3dModelDisplay_material;
      o.shapes         = FE3dModelDisplay_shapes;
      o.load           = FE3dModelDisplay_load;
      o.reloadResource = FE3dModelDisplay_reloadResource;
      o.dispose        = FE3dModelDisplay_dispose;
      return o;
   }
   MO.FE3dModelDisplay_construct = function FE3dModelDisplay_construct(){
      var o = this;
      o.__base.FE3dDisplay.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dModelDisplay_material = function FE3dModelDisplay_material(){
      return this._material;
   }
   MO.FE3dModelDisplay_shapes = function FE3dModelDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dModelDisplay_load = function FE3dModelDisplay_load(renderable){
      var o = this;
      var material = o._material;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      var modelResource = renderable.resource();
      var resource = o._resource = modelResource.display();
      o._matrix.assign(resource.matrix());
      material.loadResource(resource.material());
      var geometryRenderables = renderable.geometrys();
      if(geometryRenderables){
         var geometryCount = geometryRenderables.count();
         var shapes = o._shapes = new TObjects();
         for(var i = 0; i < geometryCount; i++){
            var geometryRenderable = geometryRenderables.get(i);
            var shape = instanceConsole.create(EE3dInstance.ModelRenderable);
            shape.setDisplay(o);
            shape.setMaterial(material);
            shape.load(geometryRenderable);
            shapes.push(shape);
            o.pushRenderable(shape);
         }
      }
   }
   MO.FE3dModelDisplay_reloadResource = function FE3dModelDisplay_reloadResource(){
      var o = this;
      var resource = o._resource;
      o._matrix.assign(resource.matrix());
      o._material.loadResource(resource.material());
   }
   MO.FE3dModelDisplay_dispose = function FE3dModelDisplay_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FE3dDisplay.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModelRenderable = function FE3dModelRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable);
      o._ready            = false;
      o._materialResource = null;
      o.testVisible       = FE3dModelRenderable_testVisible;
      o.load              = FE3dModelRenderable_load;
      return o;
   }
   MO.FE3dModelRenderable_testVisible = function FE3dModelRenderable_testVisible(p){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
         }
      }
      return o._ready;
   }
   MO.FE3dModelRenderable_load = function FE3dModelRenderable_load(renderable){
      var o = this;
      var material = o._material;
      var materialResource = o._materialResource = renderable.material();
      if(materialResource){
         material.assignInfo(materialResource.info());
      }
      o._effectCode = material.info().effectCode;
      o._renderable = renderable;
   }
}
with(MO){
   MO.FE3dMovie = function FE3dMovie(o){
      o = RClass.inherits(this, o, FObject, MLinkerResource);
      o._interval      = null;
      o._firstTick     = 0;
      o._lastTick      = 0;
      o._matrix        = null;
      o.construct      = FE3dMovie_construct;
      o.loadResource   = FE3dMovie_loadResource;
      o.reloadResource = FE3dMovie_reloadResource;
      o.process        = FE3dMovie_process;
      return o;
   }
   MO.FE3dMovie_construct = function FE3dMovie_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3dMovie_loadResource = function FE3dMovie_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._interval = resource._interval;
      o._matrix.setRotation(resource._rotation.x, resource._rotation.y * Math.PI / 180, resource._rotation.z);
      o._matrix.update();
   }
   MO.FE3dMovie_reloadResource = function FE3dMovie_reloadResource(){
      var o = this;
      var resource = o._resource;
      o.loadResource(resource);
   }
   MO.FE3dMovie_process = function FE3dMovie_process(matrix){
      var o = this;
      if(o._firstTick == 0){
         o._firstTick = RTimer.current();
      }
      if(o._lastTick == 0){
         o._lastTick = RTimer.current();
      }
      var tick = RTimer.current();
      var span = tick - o._lastTick;
      if(span > o._interval){
         var resource = o._resource;
         var speed = span / 1000;
         var code = o._resource.code();
         if(code == 'rotation'){
            matrix.ry += resource._rotation.y * speed;
            matrix.updateForce();
         }
         o._lastTick = tick;
      }
   }
}
with(MO){
   MO.FE3dRegion = function FE3dRegion(o){
      o = RClass.inherits(this, o, FRegion, MGraphicObject, MG3dRegion, MLinkerResource);
      o._backgroundColor = null;
      o.construct       = FE3dRegion_construct;
      o.backgroundColor = FE3dRegion_backgroundColor;
      o.loadResource    = FE3dRegion_loadResource;
      o.reloadResource  = FE3dRegion_reloadResource;
      o.prepare         = FE3dRegion_prepare;
      o.dispose         = FE3dRegion_dispose;
      return o;
   }
   MO.FE3dRegion_construct = function FE3dRegion_construct(){
      var o = this;
      o.__base.FRegion.construct.call(o);
      o.__base.MG3dRegion.construct.call(o);
      var camera = o._camera = RClass.create(FE3dCamera);
      camera.position().set(0, 0, -100);
      camera.lookAt(0, 0, 0);
      camera.update();
      camera.projection().update();
      var light = o._directionalLight = RClass.create(FE3dDirectionalLight);
      light.direction().set(0, -1, 0);
      var lightCamera = light.camera();
      lightCamera.position().set(10, 10, -10);
      lightCamera.lookAt(0, 0, 0);
      var backgroundColor = o._backgroundColor = new SColor4();
      backgroundColor.set(0, 0, 0, 1);
      o._calculateCameraMatrix = new SMatrix3d();
   }
   MO.FE3dRegion_backgroundColor = function FE3dRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3dRegion_loadResource = function FE3dRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o._camera.loadResource(p.camera());
      o._directionalLight.loadResource(p.light());
      o.reloadResource();
   }
   MO.FE3dRegion_reloadResource = function FE3dRegion_reloadResource(){
      var o = this;
      var r = o._resource;
      var f = r.optionBackground();
      if(f){
         o._backgroundColor.assignPower(r.backgroundColor());
         o._backgroundColor.alpha = 1;
      }else{
         o._backgroundColor.set(0, 0, 0, 0);
      }
   }
   MO.FE3dRegion_prepare = function FE3dRegion_prepare(){
      var o = this;
      o.__base.MG3dRegion.prepare.call(o);
      var r = o._calculateCameraMatrix.attach(o._camera.matrix());
      if(r){
         o._changed = true;
      }
   }
   MO.FE3dRegion_dispose = function FE3dRegion_dispose(){
      var o = this;
      o.__base.FRegion.dispose.call(o);
      o.__base.MG3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dScene = function FE3dScene(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready                = false;
      o._dataReady            = false;
      o._resource             = null;
      o._dirty                = false;
      o.onProcess             = FE3dScene_onProcess;
      o.construct             = FE3dScene_construct;
      o.createRegion          = FE3dScene_createRegion;
      o.resource              = FE3dScene_resource;
      o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
      o.loadRegionResource    = FE3dScene_loadRegionResource;
      o.loadDisplayResource   = FE3dScene_loadDisplayResource;
      o.loadLayerResource     = FE3dScene_loadLayerResource;
      o.loadResource          = FE3dScene_loadResource;
      o.testReady             = FE3dScene_testReady;
      o.dirty                 = FE3dScene_dirty;
      o.processLoad           = FE3dScene_processLoad;
      o.active                = FE3dScene_active;
      o.deactive              = FE3dScene_deactive;
      return o;
   }
   MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
      var o = this;
      o.__base.FE3dSpace.onProcess.call(o);
      if(o._dirty){
         var s = o._region.allRenderables();
         for(var i = s.count() - 1; i >= 0; i--){
            var r = s.getAt(i);
            r.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dScene_construct = function FE3dScene_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
   }
   MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
      return RClass.create(FE3dSceneRegion);
   }
   MO.FE3dScene_resource = function FE3dScene_resource(p){
      return this._resource;
   }
   MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
      var o = this;
      o._technique._resource = p;
   }
   MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var c = o.camera();
      c._resource = rc;
      var cp = c.projection();
      c.position().assign(rc.position());
      c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
      c.update();
      cp.size().assign(o._graphicContext.size());
      cp._angle = rcv.angle();
      cp._znear = rcv.znear();
      cp._zfar = rcv.zfar();
      cp.update();
      var rl = p.light();
      var rlc = rl.camera();
      var rlv = rlc.projection();
      var l = o.directionalLight();
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
   MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
      var o = this;
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(o);
      display.loadResource(resource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      layer.pushDisplay(display);
   }
   MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
      var o = this;
      var layer = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneLayer);
      layer.loadResource(resource);
      var displays = resource.displays();
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            o.loadDisplayResource(layer, display);
         }
      }
      o.registerLayer(resource.code(), layer)
   }
   MO.FE3dScene_loadResource = function FE3dScene_loadResource(p){
      var o = this;
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadTechniqueResource(p.technique());
      o.loadRegionResource(p.region());
      var layers = p.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dScene_testReady = function FE3dScene_testReady(){
      return this._ready;
   }
   MO.FE3dScene_dirty = function FE3dScene_dirty(){
      this._dirty = true;
   }
   MO.FE3dScene_processLoad = function FE3dScene_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dScene_active = function FE3dScene_active(){
      var o = this;
      o.__base.FE3dSpace.active.call(o);
   }
   MO.FE3dScene_deactive = function FE3dScene_deactive(){
      var o = this;
      o.__base.FE3dSpace.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSceneAnimation = function FE3dSceneAnimation(o){
      o = RClass.inherits(this, o, FE3dAnimation);
      o._animation        = null;
      o._activeClip       = null;
      o._clips            = null;
      o.clips             = FE3dSceneAnimation_clips;
      o.pushClip          = FE3dSceneAnimation_pushClip;
      o.record            = RMethod.empty;
      o.process           = RMethod.empty;
      o.selectClip        = FE3dSceneAnimation_selectClip;
      o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
      o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
      o.reloadResource    = FE3dSceneAnimation_reloadResource;
      return o;
   }
   MO.FE3dSceneAnimation_clips = function FE3dSceneAnimation_clips(){
      return this._clips;
   }
   MO.FE3dSceneAnimation_pushClip = function FE3dSceneAnimation_pushClip(clip){
      var o = this;
      var clips = o._clips;
      if(!clips){
         clips = o._clips = new TDictionary();
      }
      clips.set(clip.code(), clip);
   }
   MO.FE3dSceneAnimation_selectClip = function FE3dSceneAnimation_selectClip(code){
      var o = this;
      var clip = o._clips.get(code);
      if(o._activeClip == clip){
         return;
      }
      var info = o._animation._playInfo;
      info.beginIndex = clip.beginIndex();
      info.endIndex = clip.endIndex();
      info.frameCount = info.endIndex - info.beginIndex + 1;
      o._animation._playRate = clip.playRate();
      o._activeClip = clip;
   }
   MO.FE3dSceneAnimation_loadAnimation = function FE3dSceneAnimation_loadAnimation(animation){
      var o = this;
      o._animation = animation;
   }
   MO.FE3dSceneAnimation_loadSceneResource = function FE3dSceneAnimation_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
   }
   MO.FE3dSceneAnimation_reloadResource = function FE3dSceneAnimation_reloadResource(){
      var o = this;
      var resource = o._resource;
      var animation = o._animation;
      animation._playRate = resource._playRate;
   }
}
with(MO){
   MO.FE3dSceneAnimationClip = function FE3dSceneAnimationClip(o){
      o = RClass.inherits(this, o, FObject, MAttributeCode);
      o._animation  = null;
      o._beginIndex = 0;
      o._endIndex   = 0;
      o._playRate   = 1;
      o.beginIndex  = FE3dSceneAnimationClip_beginIndex;
      o.endIndex    = FE3dSceneAnimationClip_endIndex;
      o.setRange    = FE3dSceneAnimationClip_setRange;
      o.playRate    = FE3dSceneAnimationClip_playRate;
      o.setPlayRate = FE3dSceneAnimationClip_setPlayRate;
      return o;
   }
   MO.FE3dSceneAnimationClip_beginIndex = function FE3dSceneAnimationClip_beginIndex(){
      return this._beginIndex;
   }
   MO.FE3dSceneAnimationClip_endIndex = function FE3dSceneAnimationClip_endIndex(){
      return this._endIndex;
   }
   MO.FE3dSceneAnimationClip_setRange = function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
      var o = this;
      o._beginIndex = beginIndex;
      o._endIndex = endIndex;
   }
   MO.FE3dSceneAnimationClip_playRate = function FE3dSceneAnimationClip_playRate(){
      return this._playRate;
   }
   MO.FE3dSceneAnimationClip_setPlayRate = function FE3dSceneAnimationClip_setPlayRate(rate){
      this._playRate = rate;
   }
}
with(MO){
   MO.FE3dSceneCanvas = function FE3dSceneCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
      o._captureStatus         = false;
      o._capturePosition       = null;
      o._captureCameraPosition = null;
      o._captureCameraRotation = null;
      o._actionFullScreen      = false;
      o._actionPlay            = false;
      o._actionMovie           = false;
      o._actionUp              = false;
      o._actionDown            = false;
      o._actionForward         = false;
      o._actionBack            = false;
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._touchTracker          = null;
      o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
      o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
      o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
      o.onTouchZoom            = FE3dSceneCanvas_onTouchZoom;
      o.onDataLoaded           = FE3dSceneCanvas_onDataLoaded;
      o.onResize               = FE3dSceneCanvas_onResize;
      o.construct              = FE3dSceneCanvas_construct;
      o.testPlay               = FE3dSceneCanvas_testPlay;
      o.switchPlay             = FE3dSceneCanvas_switchPlay;
      o.testMovie              = FE3dSceneCanvas_testMovie;
      o.switchMovie            = FE3dSceneCanvas_switchMovie;
      o.doAction               = FE3dSceneCanvas_doAction;
      o.loadByGuid             = FE3dSceneCanvas_loadByGuid;
      o.loadByCode             = FE3dSceneCanvas_loadByCode;
      o.dispose                = FE3dSceneCanvas_dispose;
      return o;
   }
   MO.FE3dSceneCanvas_onEnterFrame = function FE3dSceneCanvas_onEnterFrame(){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var timer = space.timer();
      var span = timer.spanSecond();
      var camera = space.camera();
      var distance = o._cameraMoveRate * span;
      var rotation = o._cameraKeyRotation * span;
      var keyForward = RKeyboard.isPress(EStageKey.Forward);
      var keyBack = RKeyboard.isPress(EStageKey.Back);
      if((keyForward && !keyBack) || o._actionForward){
         camera.doWalk(distance);
      }
      if((!keyForward && keyBack) || o._actionBack){
         camera.doWalk(-distance);
      }
      var keyUp = RKeyboard.isPress(EStageKey.Up);
      var keyDown = RKeyboard.isPress(EStageKey.Down);
      if((keyUp && !keyDown) || o._actionUp){
         camera.doFly(distance);
      }
      if((!keyUp && keyDown) || o._actionDown){
         camera.doFly(-distance);
      }
      var keyLeft = RKeyboard.isPress(EStageKey.RotationLeft);
      var keyRight = RKeyboard.isPress(EStageKey.RotationRight);
      if(keyLeft && !keyRight){
         camera.doYaw(rotation);
      }
      if(!keyLeft && keyRight){
         camera.doYaw(-rotation);
      }
      var keyRotationUp = RKeyboard.isPress(EStageKey.RotationUp);
      var keyRotationDown = RKeyboard.isPress(EStageKey.RotationDown);
      if(keyRotationUp && !keyRotationDown){
         camera.doPitch(rotation);
      }
      if(!keyRotationUp && keyRotationDown){
         camera.doPitch(-rotation);
      }
      camera.update();
      if(o._optionRotation){
         var rotation = o._rotation;
         var layers = space.layers();
         var count = layers.count();
         for(var i = 0; i < count; i++){
            var layer = layers.at(i);
            var matrix = layer.matrix();
            matrix.setRotation(0, rotation.y, 0);
            matrix.update();
         }
         rotation.y += 0.01;
      }
   }
   MO.FE3dSceneCanvas_onMouseCaptureStart = function FE3dSceneCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSceneCanvas_onMouseCapture = function FE3dSceneCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSceneCanvas_onMouseCaptureStop = function FE3dSceneCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSceneCanvas_onTouchStart = function FE3dSceneCanvas_onTouchStart(event){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var ts = event.touches;
      var c = ts.length;
      if(c == 1){
         event.preventDefault();
         var t = ts[0];
         o._captureStatus = true;
         o._capturePosition.set(t.clientX, t.clientY);
         o._captureCameraPosition.assign(s.camera().position());
         o._captureCameraRotation.assign(s.camera().rotation());
      }else{
         o._touchTracker.eventStart(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchMove = function FE3dSceneCanvas_onTouchMove(event){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var touchs = event.touches;
      var touchCount = touchs.length;
      if(touchCount == 1){
         event.preventDefault();
         var t = touchs[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }else if(touchCount > 1){
         o._touchTracker.eventMove(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchStop = function FE3dSceneCanvas_onTouchStop(event){
      var o = this;
      o._touchTracker.eventStop(event);
      o._captureStatus = false;
   }
   MO.FE3dSceneCanvas_onTouchZoom = function FE3dSceneCanvas_onTouchZoom(event){
      var o = this;
      var delta = event.delta;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var camera = space.camera();
      camera.doForward(delta * 0.006);
   }
   MO.FE3dSceneCanvas_onDataLoaded = function FE3dSceneCanvas_onDataLoaded(event){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      var event = new SEvent(o);
      event.space = s;
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FE3dSceneCanvas_onResize = function FE3dSceneCanvas_onResize(event){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSceneCanvas_construct = function FE3dSceneCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
      o._touchTracker = RClass.create(FTouchTracker);
      o._touchTracker.addTouchZoomListener(o, o.onTouchZoom);
   }
   MO.FE3dSceneCanvas_testPlay = function FE3dSceneCanvas_testPlay(){
      return this._actionPlay;
   }
   MO.FE3dSceneCanvas_switchPlay = function FE3dSceneCanvas_switchPlay(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(RClass.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            if(sprite){
               sprite._optionPlay = flag;
            }
            display._optionPlay = flag;
         }
      }
      o._actionPlay = flag;
   }
   MO.FE3dSceneCanvas_testMovie = function FE3dSceneCanvas_testMovie(){
      return this._actionMovie;
   }
   MO.FE3dSceneCanvas_switchMovie = function FE3dSceneCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionMovie = p;
         }
      }
      o._actionMovie = p;
   }
   MO.FE3dSceneCanvas_doAction = function FE3dSceneCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      e.preventDefault();
      o._actionUp = false;
      o._actionDown = false;
      o._actionForward = false;
      o._actionBack = false;
      switch(p){
         case 'fullscreen':
            var v = o._actionFullScreen = !o._actionFullScreen;
            RHtml.fullscreen(o._hPanel, v);
            break;
         case 'play':
            o.switchMovie(!o._actionMovie);
            o.switchPlay(o._actionMovie);
            break;
         case 'up':
            o._actionUp = f;
            break;
         case 'down':
            o._actionDown = f;
            break;
         case 'forward':
            o._actionForward = f;
            break;
         case 'back':
            o._actionBack = f;
            break;
      }
   }
   MO.FE3dSceneCanvas_loadByGuid = function FE3dSceneCanvas_loadByGuid(guid){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_loadByCode = function FE3dSceneCanvas_loadByCode(code){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByCode(o._graphicContext, code);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_dispose = function FE3dSceneCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSceneConsole = function FE3dSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._loadDisplays = null;
      o._loadScenes   = null;
      o._pools        = null;
      o._thread       = null;
      o._interval     = 100;
      o.onProcess     = FE3dSceneConsole_onProcess;
      o.construct     = FE3dSceneConsole_construct;
      o.scenes        = FE3dSceneConsole_scenes;
      o.loadDisplay   = FE3dSceneConsole_loadDisplay;
      o.allocByGuid   = FE3dSceneConsole_allocByGuid;
      o.allocByCode   = FE3dSceneConsole_allocByCode;
      o.free          = FE3dSceneConsole_free;
      return o;
   }
   MO.FE3dSceneConsole_onProcess = function FE3dSceneConsole_onProcess(){
      var o = this;
      var displays = o._loadDisplays;
      displays.record();
      while(displays.next()){
         var display = displays.current();
         if(display.processLoad()){
            displays.removeCurrent();
         }
      }
      var scenes = o._loadScenes;
      scenes.record();
      while(scenes.next()){
         var scene = scenes.current();
         if(scene.processLoad()){
            scenes.removeCurrent();
         }
      }
   }
   MO.FE3dSceneConsole_construct = function FE3dSceneConsole_construct(){
      var o = this;
      o._loadDisplays = new TLooper();
      o._loadScenes = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dSceneConsole_scenes = function FE3dSceneConsole_scenes(){
      return this._scenes;
   }
   MO.FE3dSceneConsole_loadDisplay = function FE3dSceneConsole_loadDisplay(display){
      this._loadDisplays.push(display);
   }
   MO.FE3dSceneConsole_allocByGuid = function FE3dSceneConsole_allocByGuid(context, guid){
      var o = this;
      var scene = o._pools.alloc(guid);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = guid;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_allocByCode = function FE3dSceneConsole_allocByCode(context, code){
      var o = this;
      var scene = o._pools.alloc(code);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByCode(code);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = code;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_free = function FE3dSceneConsole_free(scene){
      var o = this;
      var code = scene._poolCode;
      o._pools.free(code, scene);
   }
}
with(MO){
   MO.FE3dSceneDisplay = function FE3dSceneDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady        = false;
      o._optionPlay       = false;
      o._optionMovie      = false;
      o._movieMatrix      = null;
      o._resource         = null;
      o._materials        = null;
      o._parentMaterials  = null;
      o._template         = null;
      o._sprite           = null;
      o.construct         = FE3dSceneDisplay_construct;
      o.calculateOutline  = FE3dSceneDisplay_calculateOutline;
      o.meshRenderables   = FE3dSceneDisplay_meshRenderables;
      o.loadResource      = FE3dSceneDisplay_loadResource;
      o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
      o.processLoad       = FE3dSceneDisplay_processLoad;
      o.clone             = FE3dSceneDisplay_clone;
      return o;
   }
   MO.FE3dSceneDisplay_construct = function FE3dSceneDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._movieMatrix = new SMatrix3d();
   }
   MO.FE3dSceneDisplay_calculateOutline = function FE3dSceneDisplay_calculateOutline(){
      return this._sprite.calculateOutline();
   }
   MO.FE3dSceneDisplay_meshRenderables = function FE3dSceneDisplay_meshRenderables(){
      var o = this;
      var sprite = o._template.sprite();
      return sprite.meshRenderables();
   }
   MO.FE3dSceneDisplay_loadResource = function FE3dSceneDisplay_loadResource(resource){
      var o = this;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._resource = resource;
      o._code = resource.code();
      o._matrix.assign(resource.matrix());
      var movieResources = resource.movies();
      if(movieResources){
         var movieCount = movieResources.count();
         for(var i = 0; i < movieCount; i++){
            var movieResource = movieResources.at(i);
            var movie = instanceConsole.create(EE3dInstance.SceneMovie);
            movie.loadResource(movieResource);
            o.pushMovie(movie);
         }
      }
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materials = o._materials = new TDictionary();
         var parentMaterials = o._parentMaterials = new TDictionary();
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var material = instanceConsole.create(EE3dInstance.SceneMaterial);
            material._display = o;
            material.loadSceneResource(materialResource);
            materials.set(materialResource.guid(), material);
            parentMaterials.set(materialResource.parentGuid(), material);
         }
      }
      var templateGuid = resource.templateGuid();
      o._template = RConsole.find(FE3dTemplateConsole).allocByGuid(o, templateGuid);
   }
   MO.FE3dSceneDisplay_loadTemplate = function FE3dSceneDisplay_loadTemplate(template){
      var o = this;
      var resource = o._resource;
      var sprites = template._sprites;
      if(sprites){
         var optionPlay = o._optionPlay;
         var count = sprites.count();
         for(var i = 0; i < count; i++){
            var sprite = sprites.at(i);
            sprite._optionPlay = optionPlay;
            sprite.matrix().identity();
         }
      }
      var materials = o._materials;
      var parentMaterials = o._parentMaterials;
      var sprite = o._sprite = template.sprite();
      var renderables = sprite.renderables();
      var count = renderables.count();
      for(var n = 0; n < count; n++){
         var renderable = renderables.at(n);
         var material = renderable.material();
         var materialGuid = material.guid();
         if(parentMaterials){
            var displayMaterial = parentMaterials.get(materialGuid);
            if(displayMaterial){
               displayMaterial.loadParent(material);
               displayMaterial.reloadResource();
               renderable.setMaterial(displayMaterial);
            }
         }
      }
      o.pushDisplay(sprite);
      var animations = sprite.animations();
      if(animations){
         var animationCount = animations.count();
         for(var n = 0; n < animationCount; n++){
            var animation = animations.at(n);
            var animationResource = animation.resource();
            var animationGuid = animationResource.guid();
            var sceneAnimationResource = resource.findAnimation(animationGuid);
            if(!sceneAnimationResource){
               sceneAnimationResource = resource.syncAnimation(animationGuid);
               sceneAnimationResource._guid = animationResource._guid;
               sceneAnimationResource._code = animationResource._code;
               sceneAnimationResource._label = animationResource._label;
            }
            var sceneAnimation = RClass.create(FE3dSceneAnimation);
            sceneAnimation.loadAnimation(animation);
            sceneAnimation.loadSceneResource(sceneAnimationResource);
            sceneAnimation.reloadResource();
            o.pushAnimation(sceneAnimation);
         }
      }
   }
   MO.FE3dSceneDisplay_processLoad = function FE3dSceneDisplay_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      var template = o._template;
      if(!template.testReady()){
         return false;
      }
      o.loadTemplate(template);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dSceneDisplay_clone = function FE3dSceneDisplay_clone(){
   }
}
with(MO){
   MO.FE3dSceneDisplayRenderable = function FE3dSceneDisplayRenderable(o){
      o = RClass.inherits(this, o, FE3dTemplateRenderable);
      o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
      o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
      return o;
   }
   MO.FE3dSceneDisplayRenderable_loadMaterial = function FE3dSceneDisplayRenderable_loadMaterial(material){
      var o = this;
      o._materialReference = material;
      o._material.calculate(material);
   }
   MO.FE3dSceneDisplayRenderable_reloadResource = function FE3dSceneDisplayRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialReference);
      material.update();
   }
}
with(MO){
   MO.FE3dSceneLayer = function FE3dSceneLayer(o){
      o = RClass.inherits(this, o, FDisplayLayer, MLinkerResource);
      o.makeLabel    = FE3dSceneLayer_makeLabel;
      o.loadResource = FE3dSceneLayer_loadResource;
      o.process      = FE3dSceneLayer_process;
      return o;
   }
   MO.FE3dSceneLayer_makeLabel = function FE3dSceneLayer_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSceneLayer_loadResource = function FE3dSceneLayer_loadResource(p){
      var o = this;
      o._resource = p;
   }
   MO.FE3dSceneLayer_process = function FE3dSceneLayer_process(p){
      var o = this;
      o.__base.FDisplayLayer.process.call(o, p)
      var c = o._resource.transformCd();
      if(c){
         if(c == EDisplayTransform.CameraPosition){
            var cp = p.camera().position();
            o._matrix.setTranslate(cp.x, cp.y, cp.z);
            o._matrix.update();
         }
      }
   }
}
with(MO){
   MO.FE3dSceneMaterial = function FE3dSceneMaterial(o){
      o = RClass.inherits(this, o, FE3dMaterial);
      o._display          = null;
      o._parentMaterial   = null;
      o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
      o.reloadResource    = FE3dSceneMaterial_reloadResource;
      return o;
   }
   MO.FE3dSceneMaterial_loadSceneResource = function FE3dSceneMaterial_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
      o.reloadResource();
   }
   MO.FE3dSceneMaterial_reloadResource = function FE3dSceneMaterial_reloadResource(){
      var o = this;
      o.calculate(o._resource);
      o.update();
   }
}
with(MO){
   MO.FE3dSceneRegion = function FE3dSceneRegion(o){
      o = RClass.inherits(this, o, FE3dRegion);
      o._resource      = null;
      o.construct      = FE3dSceneRegion_construct;
      o.resource       = FE3dSceneRegion_resource;
      o.loadResource   = FE3dSceneRegion_loadResource;
      o.reloadResource = FE3dSceneRegion_reloadResource;
      o.dispose        = FE3dSceneRegion_dispose;
      return o;
   }
   MO.FE3dSceneRegion_construct = function FE3dSceneRegion_construct(){
      var o = this;
      o.__base.FE3dRegion.construct.call(o);
   }
   MO.FE3dSceneRegion_resource = function FE3dSceneRegion_resource(){
      return this._resource;
   }
   MO.FE3dSceneRegion_loadResource = function FE3dSceneRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o.reloadResource();
   }
   MO.FE3dSceneRegion_reloadResource = function FE3dSceneRegion_reloadResource(){
      var o = this;
      var r = o._resource;
      var f = r.optionBackground();
      if(f){
         o._backgroundColor.assignPower(r.backgroundColor());
         o._backgroundColor.alpha = 1;
      }else{
         o._backgroundColor.set(0, 0, 0, 0);
      }
   }
   MO.FE3dSceneRegion_dispose = function FE3dSceneRegion_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FE3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSimpleCanvas = function FE3dSimpleCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
      o._captureStatus         = false;
      o._capturePosition       = null;
      o._captureCameraPosition = null;
      o._captureCameraRotation = null;
      o._actionFullScreen      = false;
      o._actionPlay            = false;
      o._actionMovie           = false;
      o._actionUp              = false;
      o._actionDown            = false;
      o._actionForward         = false;
      o._actionBack            = false;
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._stage                 = RClass.register(o, new AGetter('_stage'));
      o.onEnterFrame           = FE3dSimpleCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSimpleCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSimpleCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSimpleCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSimpleCanvas_onTouchStart;
      o.onTouchMove            = FE3dSimpleCanvas_onTouchMove;
      o.onTouchStop            = FE3dSimpleCanvas_onTouchStop;
      o.onSceneLoad            = FE3dSimpleCanvas_onSceneLoad;
      o.onResize               = FE3dSimpleCanvas_onResize;
      o.construct              = FE3dSimpleCanvas_construct;
      o.build                  = FE3dSimpleCanvas_build;
      o.setPanel               = FE3dSimpleCanvas_setPanel;
      o.switchPlay             = FE3dSimpleCanvas_switchPlay;
      o.switchMovie            = FE3dSimpleCanvas_switchMovie;
      o.doAction               = FE3dSimpleCanvas_doAction;
      o.dispose                = FE3dSimpleCanvas_dispose;
      return o;
   }
   MO.FE3dSimpleCanvas_onEnterFrame = function FE3dSimpleCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var c = s.camera();
      var d = o._cameraMoveRate;
      var r = o._cameraKeyRotation;
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if((kw && !ks) || o._actionForward){
         c.doWalk(d);
      }
      if((!kw && ks) || o._actionBack){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if((kq && !ke) || o._actionUp){
         c.doFly(d);
      }
      if((!kq && ke) || o._actionDown){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var ls = s.layers();
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var m = l.matrix();
            m.setRotation(0, r.y, 0);
            m.update();
         }
         r.y += 0.01;
      }
   }
   MO.FE3dSimpleCanvas_onMouseCaptureStart = function FE3dSimpleCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSimpleCanvas_onMouseCapture = function FE3dSimpleCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSimpleCanvas_onMouseCaptureStop = function FE3dSimpleCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSimpleCanvas_onTouchStart = function FE3dSimpleCanvas_onTouchStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var ts = p.touches;
      var c = ts.length;
      if(c == 1){
         p.preventDefault();
         var t = ts[0];
         o._captureStatus = true;
         o._capturePosition.set(t.clientX, t.clientY);
         o._captureCameraPosition.assign(s.camera().position());
         o._captureCameraRotation.assign(s.camera().rotation());
      }
   }
   MO.FE3dSimpleCanvas_onTouchMove = function FE3dSimpleCanvas_onTouchMove(p){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var ts = p.touches;
      var c = ts.length;
      if(c == 1){
         p.preventDefault();
         var t = ts[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }
   }
   MO.FE3dSimpleCanvas_onTouchStop = function FE3dSimpleCanvas_onTouchStop(p){
      var o = this;
      o._captureStatus = false;
   }
   MO.FE3dSimpleCanvas_onSceneLoad = function FE3dSimpleCanvas_onSceneLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      o.processLoadListener(o, s);
   }
   MO.FE3dSimpleCanvas_onResize = function FE3dSimpleCanvas_onResize(p){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, p);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSimpleCanvas_construct = function FE3dSimpleCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
   }
   MO.FE3dSimpleCanvas_build = function FE3dSimpleCanvas_build(hPanel){
      var o = this;
      o.__base.FE3dCanvas.build.call(o, hPanel);
      var stage = o._stage = o._activeSpace = MO.RClass.create(MO.FE3dSimpleStage);
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      RStage.register('simple.stage', stage);
   }
   MO.FE3dSimpleCanvas_setPanel = function FE3dSimpleCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
      var stage = o._stage;
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   MO.FE3dSimpleCanvas_switchPlay = function FE3dSimpleCanvas_switchPlay(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionPlay = p;
         }
      }
      o._actionPlay = p;
   }
   MO.FE3dSimpleCanvas_switchMovie = function FE3dSimpleCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
      var ds = s.allDisplays();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         if(d._movies){
            d._optionMovie = p;
         }
      }
      o._actionMovie = p;
   }
   MO.FE3dSimpleCanvas_doAction = function FE3dSimpleCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      e.preventDefault();
      o._actionUp = false;
      o._actionDown = false;
      o._actionForward = false;
      o._actionBack = false;
      switch(p){
         case 'fullscreen':
            var v = o._actionFullScreen = !o._actionFullScreen;
            RHtml.fullscreen(o._hPanel, v);
            break;
         case 'play':
            o.switchMovie(!o._actionMovie);
            o.switchPlay(o._actionMovie);
            break;
         case 'up':
            o._actionUp = f;
            break;
         case 'down':
            o._actionDown = f;
            break;
         case 'forward':
            o._actionForward = f;
            break;
         case 'back':
            o._actionBack = f;
            break;
      }
   }
   MO.FE3dSimpleCanvas_dispose = function FE3dSimpleCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
MO.FE3dSimpleStage = function FE3dSimpleStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = MO.RClass.register(o, new MO.AGetter('_skyLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._spriteLayer    = MO.RClass.register(o, new MO.AGetter('_spriteLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct       = MO.FE3dSimpleStage_construct;
   o.active          = MO.FE3dSimpleStage_active;
   o.deactive        = MO.FE3dSimpleStage_deactive;
   return o;
}
MO.FE3dSimpleStage_construct = function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._skyLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SkyLayer', layer);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   var layer = o._spriteLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SpriteLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
MO.FE3dSimpleStage_active = function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
MO.FE3dSimpleStage_deactive = function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
with(MO){
   MO.FE3dSpace = function FE3dSpace(o){
      o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
      o._dataReady            = false;
      o._resource             = null;
      o._materials            = null;
      o._dirty                = false;
      o.onProcess             = FE3dSpace_onProcess;
      o.construct             = FE3dSpace_construct;
      o.linkGraphicContext    = FE3dSpace_linkGraphicContext;
      o.createRegion          = FE3dSpace_createRegion;
      o.resource              = FE3dSpace_resource;
      o.findMaterial          = FE3dSpace_findMaterial;
      o.materials             = FE3dSpace_materials;
      o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
      o.loadRegionResource    = FE3dSpace_loadRegionResource;
      o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
      o.loadLayerResource     = FE3dSpace_loadLayerResource;
      o.loadResource          = FE3dSpace_loadResource;
      o.commitResource        = FE3dSpace_commitResource;
      o.dirty                 = FE3dSpace_dirty;
      o.processLoad           = FE3dSpace_processLoad;
      o.active                = FE3dSpace_active;
      o.deactive              = FE3dSpace_deactive;
      return o;
   }
   MO.FE3dSpace_onProcess = function FE3dSpace_onProcess(){
      var o = this;
      o.__base.FE3dStage.onProcess.call(o);
      if(o._dirty){
         var s = o._region.allRenderables();
         for(var i = s.count() - 1; i >= 0; i--){
            var r = s.getAt(i);
            r.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dSpace_construct = function FE3dSpace_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      o._materials = new TDictionary();
   }
   MO.FE3dSpace_linkGraphicContext = function FE3dSpace_linkGraphicContext(context){
      var o = this;
      o.__base.FE3dStage.linkGraphicContext.call(o, context);
      o._region.linkGraphicContext(context);
   }
   MO.FE3dSpace_createRegion = function FE3dSpace_createRegion(){
      return RClass.create(FE3dRegion);
   }
   MO.FE3dSpace_resource = function FE3dSpace_resource(p){
      return this._resource;
   }
   MO.FE3dSpace_findMaterial = function FE3dSpace_findMaterial(guid){
      return this._materials.get(guid);
   }
   MO.FE3dSpace_materials = function FE3dSpace_materials(p){
      return this._materials;
   }
   MO.FE3dSpace_loadTechniqueResource = function FE3dSpace_loadTechniqueResource(p){
      var o = this;
      o._technique._resource = p;
   }
   MO.FE3dSpace_loadRegionResource = function FE3dSpace_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var camera = o.camera();
      camera.projection().size().assign(o._graphicContext.size());
      camera.loadResource(rc);
      var rl = p.light();
      var rlc = rl.camera();
      var rlv = rlc.projection();
      var l = o.directionalLight();
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
   MO.FE3dSpace_loadDisplayResource = function FE3dSpace_loadDisplayResource(pl, pd){
      var o = this;
      var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
      d3.linkGraphicContext(o);
      d3.loadSceneResource(pd);
      RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
      pl.pushDisplay(d3);
   }
   MO.FE3dSpace_loadLayerResource = function FE3dSpace_loadLayerResource(p){
      var o = this;
      var l = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Layer);
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
   MO.FE3dSpace_loadResource = function FE3dSpace_loadResource(resource){
      var o = this;
      o._resource = resource;
      o.loadTechniqueResource(resource.technique());
      o.loadRegionResource(resource.region());
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materialConsole = RConsole.find(FE3rMaterialConsole);
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var materialGuid = materialResource.guid();
            var material = materialConsole.load(o, materialGuid);
            o._materials.set(materialGuid, material);
         }
      }
      var layers = resource.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dSpace_commitResource = function FE3dSpace_commitResource(){
      var o = this;
      var camera = o._region.camera();
      camera.commitResource();
   }
   MO.FE3dSpace_dirty = function FE3dSpace_dirty(){
      this._dirty = true;
   }
   MO.FE3dSpace_processLoad = function FE3dSpace_processLoad(){
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
   MO.FE3dSpace_active = function FE3dSpace_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FE3dSpace_deactive = function FE3dSpace_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSprite = function FE3dSprite(o){
      o = RClass.inherits(this, o, FE3dDisplayContainer, MGraphicObject, MLinkerResource);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o._animations      = null;
      o._movies          = null;
      o._resource        = null;
      o.construct        = FE3dSprite_construct;
      o.testReady        = FE3dSprite_testReady;
      o.makeLabel        = FE3dSprite_makeLabel;
      o.findMeshByCode   = FE3dSprite_findMeshByCode;
      o.meshRenderables  = FE3dSprite_shapes;
      o.skeletons        = FE3dSprite_skeletons;
      o.pushSkeleton     = FE3dSprite_pushSkeleton;
      o.findAnimation    = FE3dSprite_findAnimation;
      o.animations       = FE3dSprite_animations;
      o.pushAnimation    = FE3dSprite_pushAnimation;
      o.movies           = FE3dSprite_movies;
      o.pushMovie        = FE3dSprite_pushMovie;
      o.loadSkeletons    = FE3dSprite_loadSkeletons;
      o.linkAnimation    = FE3dSprite_linkAnimation;
      o.loadAnimations   = FE3dSprite_loadAnimations;
      o.loadResource     = FE3dSprite_loadResource;
      o.reloadResource   = FE3dSprite_reloadResource;
      o.load             = FE3dSprite_load;
      o.updateMatrix     = FE3dSprite_updateMatrix;
      o.selectClip       = FE3dSprite_selectClip;
      o.process          = FE3dSprite_process;
      o.dispose          = FE3dSprite_dispose;
      return o;
   }
   MO.FE3dSprite_construct = function FE3dSprite_construct(){
      var o = this;
      o.__base.FE3dDisplayContainer.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dSprite_testReady = function FE3dSprite_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dSprite_makeLabel = function FE3dSprite_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSprite_findMeshByCode = function FE3dSprite_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dSprite_shapes = function FE3dSprite_shapes(){
      return this._shapes;
   }
   MO.FE3dSprite_skeletons = function FE3dSprite_skeletons(){
      return this._skeletons;
   }
   MO.FE3dSprite_pushSkeleton = function FE3dSprite_pushSkeleton(p){
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
   MO.FE3dSprite_findAnimation = function FE3dSprite_findAnimation(guid){
      var animations = this._animations;
      return animations ? animations.get(guid) : null;
   }
   MO.FE3dSprite_animations = function FE3dSprite_animations(){
      return this._animations;
   }
   MO.FE3dSprite_pushAnimation = function FE3dSprite_pushAnimation(animation){
      var o = this;
      var animations = o._animations;
      if(!animations){
         animations = o._animations = new TDictionary();
      }
      var animationResource = animation.resource();
      animations.set(animationResource.guid(), animation);
   }
   MO.FE3dSprite_movies = function FE3dSprite_movies(){
      return this._movies;
   }
   MO.FE3dSprite_pushMovie = function FE3dSprite_pushMovie(movie){
      var o = this;
      var movies = o._movies;
      if(!movies){
         movies = o._movies = new TObjects();
      }
      movies.push(movie);
   }
   MO.FE3dSprite_loadSkeletons = function FE3dSprite_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dSprite_linkAnimation = function FE3dSprite_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dSprite_loadAnimations = function FE3dSprite_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var a = o.findAnimation(r.guid());
            if(a){
               continue;
            }
            var a = null;
            if(r.skeleton()){
               a = RClass.create(FE3rSkeletonAnimation);
            }else{
               a = RClass.create(FE3rMeshAnimation);
            }
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dSprite_loadResource = function FE3dSprite_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      var renderableCount = renderableResources.count();
      if(renderableCount > 0){
         var shapes = o._shapes;
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = RClass.create(FE3dTemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dSprite_reloadResource = function FE3dSprite_reloadResource(){
      var o = this;
      var s = o._shapes;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).reloadResource();
         }
      }
   }
   MO.FE3dSprite_load = function FE3dSprite_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            shapes.at(i).load();
         }
      }
   }
   MO.FE3dSprite_updateMatrix = function FE3dSprite_updateMatrix(region){
      var o = this;
      var matrix = o._currentMatrix.identity();
      var movies = o._movies;
      if(movies){
         if(o._optionMovie){
            var c = movies.count();
            for(var i = 0; i < c; i++){
               var movie = movies.at(i);
               movie.process(o._movieMatrix);
            }
         }
         matrix.append(o._movieMatrix);
      }
      matrix.append(o._matrix);
      var parent = o._parent;
      if(parent){
         o._currentMatrix.append(parent._currentMatrix);
      }
   }
   MO.FE3dSprite_selectClip = function FE3dSprite_selectClip(code){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.selectClip(code);
         }
      }
   }
   MO.FE3dSprite_process = function FE3dSprite_process(region){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.record();
         }
      }
      o.__base.FE3dDisplayContainer.process.call(o, region);
      var skeleton = o._activeSkeleton;
      if(skeleton && animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.process(skeleton);
         }
      }
   }
   MO.FE3dSprite_dispose = function FE3dSprite_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dDisplayContainer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplate = function FE3dTemplate(o){
      o = RClass.inherits(this, o, FE3dSpace, MGraphicObject, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._resource        = null;
      o._sprites         = null;
      o._skeletons       = null;
      o._animations      = null;
      o._resource        = null;
      o.construct        = FE3dTemplate_construct;
      o.testReady        = FE3dTemplate_testReady;
      o.sprite           = FE3dTemplate_sprite;
      o.findMeshByCode   = FE3dTemplate_findMeshByCode;
      o.meshRenderables  = FE3dTemplate_sprites;
      o.skeletons        = FE3dTemplate_skeletons;
      o.pushSkeleton     = FE3dTemplate_pushSkeleton;
      o.findAnimation    = FE3dTemplate_findAnimation;
      o.animations       = FE3dTemplate_animations;
      o.pushAnimation    = FE3dTemplate_pushAnimation;
      o.visible          = FE3dTemplate_visible;
      o.setVisible       = FE3dTemplate_setVisible;
      o.resource         = FE3dTemplate_resource;
      o.setResource      = FE3dTemplate_setResource;
      o.loadSkeletons    = FE3dTemplate_loadSkeletons;
      o.linkAnimation    = FE3dTemplate_linkAnimation;
      o.loadAnimations   = FE3dTemplate_loadAnimations;
      o.loadResource     = FE3dTemplate_loadResource;
      o.reloadResource   = FE3dTemplate_reloadResource;
      o.processLoad      = FE3dTemplate_processLoad;
      o.process          = FE3dTemplate_process;
      o.dispose          = FE3dTemplate_dispose;
      return o;
   }
   MO.FE3dTemplate_construct = function FE3dTemplate_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
      o._sprites = new TObjects();
   }
   MO.FE3dTemplate_testReady = function FE3dTemplate_testReady(){
      return this._ready;
   }
   MO.FE3dTemplate_sprite = function FE3dTemplate_sprite(){
      return this._sprites.first();
   }
   MO.FE3dTemplate_findMeshByCode = function FE3dTemplate_findMeshByCode(p){
      var s = this._sprites;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplate_sprites = function FE3dTemplate_sprites(){
      return this._sprites;
   }
   MO.FE3dTemplate_skeletons = function FE3dTemplate_skeletons(){
      return this._skeletons;
   }
   MO.FE3dTemplate_pushSkeleton = function FE3dTemplate_pushSkeleton(p){
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
   MO.FE3dTemplate_findAnimation = function FE3dTemplate_findAnimation(p){
      var s = this._animations;
      return s ? s.get(p) : null;
   }
   MO.FE3dTemplate_animations = function FE3dTemplate_animations(){
      return this._animations;
   }
   MO.FE3dTemplate_pushAnimation = function FE3dTemplate_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TDictionary();
      }
      var pr = p.resource();
      r.set(pr.guid(), p);
   }
   MO.FE3dTemplate_visible = function FE3dTemplate_visible(){
      return this.sprite().visible();
   }
   MO.FE3dTemplate_setVisible = function FE3dTemplate_setVisible(visible){
      this.sprite().setVisible(visible);
   }
   MO.FE3dTemplate_resource = function FE3dTemplate_resource(p){
      return this._resource;
   }
   MO.FE3dTemplate_setResource = function FE3dTemplate_setResource(p){
      this._resource = p;
   }
   MO.FE3dTemplate_loadSkeletons = function FE3dTemplate_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dTemplate_linkAnimation = function FE3dTemplate_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dTemplate_loadAnimations = function FE3dTemplate_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var a = o.findAnimation(r.guid());
            if(a){
               continue;
            }
            var a = null;
            if(r.skeleton()){
               a = RClass.create(FE3rSkeletonAnimation);
            }else{
               a = RClass.create(FE3rMeshAnimation);
            }
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dTemplate_loadResource = function FE3dTemplate_loadResource(resource){
      var o = this;
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.__base.FE3dSpace.loadResource.call(o, resource);
      var displayResources = resource.displays();
      if(displayResources){
         var displayCount = displayResources.count();
         if(displayCount > 0){
            for(var i = 0; i < displayCount; i++){
               var displayResource = displayResources.at(i);
               var display = RClass.create(FE3dTemplateDisplay);
               display._parent = o;
               display.linkGraphicContext(o);
               display.loadResource(displayResource);
               o._sprites.push(display);
            }
         }
      }
   }
   MO.FE3dTemplate_reloadResource = function FE3dTemplate_reloadResource(){
      var o = this;
      var s = o._sprites;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).reloadResource();
         }
      }
   }
   MO.FE3dTemplate_processLoad = function FE3dTemplate_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      if(!o._dataReady){
         var resource = o._resource;
         if(!resource.testReady()){
            return false;
         }
         o.loadResource(resource);
         o._dataReady = true;
      }
      var sprites = o._sprites;
      if(sprites){
         var spriteCount = sprites.count();
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            if(!sprite.testReady()){
               return false;
            }
         }
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            sprite.load();
            o._layer.pushDisplay(sprite);
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
      o._ready = true;
      o.processLoadListener(o);
      return o._ready;
   }
   MO.FE3dTemplate_process = function FE3dTemplate_process(event){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
   MO.FE3dTemplate_dispose = function FE3dTemplate_dispose(){
      var o = this;
      o._sprites = RObject.dispose(o._sprites);
      o.__base.FE3dSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateCanvas = function FE3dTemplateCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeTemplate     = null;
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FE3dTemplateCanvas_onEnterFrame;
      o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
      o.onResize            = FE3dTemplateCanvas_onResize;
      o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
      o.construct           = FE3dTemplateCanvas_construct;
      o.loadByGuid          = FE3dTemplateCanvas_loadByGuid;
      o.loadByCode          = FE3dTemplateCanvas_loadByCode;
      o.dispose             = FE3dTemplateCanvas_dispose;
      return o;
   }
   MO.FE3dTemplateCanvas_onEnterFrame = function FE3dTemplateCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var c = s.camera();
      var d = 0.5;
      var r = 0.05;
      var kw = RKeyboard.isPress(EKeyCode.W);
      var ks = RKeyboard.isPress(EKeyCode.S);
      if(kw && !ks){
         c.doWalk(d);
      }
      if(!kw && ks){
         c.doWalk(-d);
      }
      var ka = RKeyboard.isPress(EKeyCode.A);
      var kd = RKeyboard.isPress(EKeyCode.D);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kq = RKeyboard.isPress(EKeyCode.Q);
      var ke = RKeyboard.isPress(EKeyCode.E);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      var kz = RKeyboard.isPress(EKeyCode.Z);
      var kw = RKeyboard.isPress(EKeyCode.X);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var ls = s.layers();
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            var m = l.matrix();
            m.setRotation(0, r.y, 0);
            m.update();
         }
         r.y += 0.01;
      }
   }
   MO.FE3dTemplateCanvas_onMouseCaptureStart = function FE3dTemplateCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var r = o._activeTemplate.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FE3dTemplateCanvas_onMouseCapture = function FE3dTemplateCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeTemplate.camera();
      var r = c.rotation();
      var cr = o._captureRotation;
      r.x = cr.x + cy * 0.003;
      r.y = cr.y + cx * 0.003;
   }
   MO.FE3dTemplateCanvas_onMouseCaptureStop = function FE3dTemplateCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dTemplateCanvas_onResize = function FE3dTemplateCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dTemplateCanvas_onTemplateLoad = function FE3dTemplateCanvas_onTemplateLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeTemplate;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      o.processLoadListener(o, s);
   }
   MO.FE3dTemplateCanvas_construct = function FE3dTemplateCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }
   MO.FE3dTemplateCanvas_loadByGuid = function FE3dTemplateCanvas_loadByGuid(p){
      var o = this;
      var c = o._graphicContext;
      var sc = RConsole.find(FE3dSceneConsole);
      if(o._activeTemplate != null){
         sc.free(o._activeTemplate);
      }
      var s = sc.alloc(o, p);
      s.addLoadListener(o, o.onTemplateLoad);
      s.selectTechnique(c, FG3dGeneralTechnique);
      o._stage = o._activeTemplate = s;
      RStage.register('stage3d', s);
   }
   MO.FE3dTemplateCanvas_loadByCode = function FE3dTemplateCanvas_loadByCode(code){
      var o = this;
      var context = o._graphicContext;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(o._activeTemplate != null){
         templateConsole.free(o._activeTemplate);
      }
      var template = templateConsole.allocByCode(context, code);
      template.addLoadListener(o, o.onTemplateLoad);
      template.selectTechnique(context, FE3dGeneralTechnique);
      o._stage = o._activeTemplate = template;
      RStage.register('stage.template', template);
   }
   MO.FE3dTemplateCanvas_dispose = function FE3dTemplateCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateConsole = function FE3dTemplateConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadQueue  = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 200;
      o.onProcess   = FE3dTemplateConsole_onProcess;
      o.construct   = FE3dTemplateConsole_construct;
      o.allocByGuid = FE3dTemplateConsole_allocByGuid;
      o.allocByCode = FE3dTemplateConsole_allocByCode;
      o.free        = FE3dTemplateConsole_free;
      return o;
   }
   MO.FE3dTemplateConsole_onProcess = function FE3dTemplateConsole_onProcess(){
      var o = this;
      var looper = o._loadQueue;
      looper.record();
      while(looper.next()){
         var template = looper.current();
         if(template.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dTemplateConsole_construct = function FE3dTemplateConsole_construct(){
      var o = this;
      o._loadQueue = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
      var o = this;
      var template = o._pools.alloc(guid);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByGuid(guid);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = guid;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_allocByCode = function FE3dTemplateConsole_allocByCode(context, code){
      var o = this;
      var template = o._pools.alloc(code);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByCode(code);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = code;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_free = function FE3dTemplateConsole_free(template){
      var o = this;
      var code = template._poolCode;
      o._pools.free(code, template);
   }
}
with(MO){
   MO.FE3dTemplateDisplay = function FE3dTemplateDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o.construct        = FE3dTemplateDisplay_construct;
      o.testReady        = FE3dTemplateDisplay_testReady;
      o.findMeshByCode   = FE3dTemplateDisplay_findMeshByCode;
      o.meshRenderables  = FE3dTemplateDisplay_shapes;
      o.skeletons        = FE3dTemplateDisplay_skeletons;
      o.pushSkeleton     = FE3dTemplateDisplay_pushSkeleton;
      o.loadSkeletons    = FE3dTemplateDisplay_loadSkeletons;
      o.linkAnimation    = FE3dTemplateDisplay_linkAnimation;
      o.loadAnimations   = FE3dTemplateDisplay_loadAnimations;
      o.loadResource     = FE3dTemplateDisplay_loadResource;
      o.reloadResource   = FE3dTemplateDisplay_reloadResource;
      o.load             = FE3dTemplateDisplay_load;
      o.dispose          = FE3dTemplateDisplay_dispose;
      return o;
   }
   MO.FE3dTemplateDisplay_construct = function FE3dTemplateDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dTemplateDisplay_testReady = function FE3dTemplateDisplay_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dTemplateDisplay_findMeshByCode = function FE3dTemplateDisplay_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplateDisplay_shapes = function FE3dTemplateDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dTemplateDisplay_skeletons = function FE3dTemplateDisplay_skeletons(){
      return this._skeletons;
   }
   MO.FE3dTemplateDisplay_pushSkeleton = function FE3dTemplateDisplay_pushSkeleton(skeleton){
      var o = this;
      var resource = skeleton.resource();
      var skeletonGuid = resource.guid();
      var skeletons = o._skeletons;
      if(!skeletons){
         skeletons = o._skeletons = new TDictionary();
      }
      if(!o._activeSkeleton){
         o._activeSkeleton = skeleton;
      }
      skeletons.set(skeletonGuid, skeleton);
   }
   MO.FE3dTemplateDisplay_loadSkeletons = function FE3dTemplateDisplay_loadSkeletons(skeletonResources){
      var o = this;
      var count = skeletonResources.count();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var skeletonResource = skeletonResources.at(i);
            var skeleton = RClass.create(FE3rSkeleton);
            skeleton.loadResource(skeletonResource);
            o.pushSkeleton(skeleton);
         }
      }
   }
   MO.FE3dTemplateDisplay_linkAnimation = function FE3dTemplateDisplay_linkAnimation(animation){
      var o = this;
      var tracks = animation.tracks();
      var count = tracks.count();
      for(var i = 0; i < count; i++){
         var track = tracks.at(i);
         var meshCode = track._resource._meshCode;
         if(meshCode){
            var mesh = o.findMeshByCode(meshCode);
            mesh._activeTrack = track;
         }
      }
   }
   MO.FE3dTemplateDisplay_loadAnimations = function FE3dTemplateDisplay_loadAnimations(animationResources){
      var o = this;
      var animationCount = animationResources.count();
      for(var i = 0; i < animationCount; i++){
         var animationResource = animationResources.at(i);
         var guid = animationResource.guid();
         var animation = o.findAnimation(guid);
         if(animation){
            continue;
         }
         if(animationResource.skeleton()){
            animation = RClass.create(FE3rSkeletonAnimation);
         }else{
            animation = RClass.create(FE3rMeshAnimation);
         }
         animation._display = o;
         animation.loadResource(animationResource);
         o.pushAnimation(animation);
      }
   }
   MO.FE3dTemplateDisplay_loadResource = function FE3dTemplateDisplay_loadResource(resource){
      var o = this;
      o._resource = resource;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      if(renderableResources){
         var shapes = o._shapes;
         var renderableCount = renderableResources.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = instanceConsole.create(EE3dInstance.TemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dTemplateDisplay_reloadResource = function FE3dTemplateDisplay_reloadResource(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var count = shapes.count();
         for(var i = 0; i < count; i++){
            var shape = shapes.at(i);
            shape.reloadResource();
         }
      }
   }
   MO.FE3dTemplateDisplay_load = function FE3dTemplateDisplay_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            shape.load();
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
   }
   MO.FE3dTemplateDisplay_dispose = function FE3dTemplateDisplay_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dSprite.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateRenderable = function FE3dTemplateRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
      o._ready            = false;
      o._model            = null;
      o._materialCode     = null;
      o._materialResource = null;
      o.construct         = FE3dTemplateRenderable_construct;
      o.testReady         = FE3dTemplateRenderable_testReady;
      o.testVisible       = FE3dTemplateRenderable_testVisible;
      o.calculateOutline  = FE3dTemplateRenderable_calculateOutline;
      o.loadResource      = FE3dTemplateRenderable_loadResource;
      o.reloadResource    = FE3dTemplateRenderable_reloadResource;
      o.load              = FE3dTemplateRenderable_load;
      o.dispose           = FE3dTemplateRenderable_dispose;
      return o;
   }
   MO.FE3dTemplateRenderable_construct = function FE3dTemplateRenderable_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
   }
   MO.FE3dTemplateRenderable_testReady = function FE3dTemplateRenderable_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._model.testReady()){
            return false;
         }
         var materials = o._materials;
         if(materials){
            var count = materials.count();
            for(var i = 0; i < count; i++){
               var material = materials.at(i);
               if(material){
                  if(!material.testReady()){
                     return false;
                  }
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3dTemplateRenderable_testVisible = function FE3dTemplateRenderable_testVisible(p){
      var o = this;
      var result = false;
      if(o._ready){
         result = o.__base.FE3dMeshRenderable.testVisible.call(o);
      }
      return result;
   }
   MO.FE3dTemplateRenderable_calculateOutline = function FE3dTemplateRenderable_calculateOutline(flag){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty() || flag){
         var resource = o._resource
         var meshResource = resource.mesh();
         var meshOutline = meshResource.outline();
         outline.calculateFrom(meshOutline, o._currentMatrix);
      }
      return outline;
   }
   MO.FE3dTemplateRenderable_loadResource = function FE3dTemplateRenderable_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var modelGuid = resource.modelGuid();
      o._model = RConsole.find(FE3rModelConsole).load(o, modelGuid);
      var materialGuid = resource.materialGuid();
      if(!RString.isEmpty(materialGuid)){
         var material = o._material = o._materialReference = RConsole.find(FE3rMaterialConsole).load(o, materialGuid);
         o._materialResource = material.resource();
         o.pushMaterial(material);
      }
      var template = o._display._parent;
      var materialRefers = resource.materialRefers();
      if(materialRefers){
         var count = materialRefers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = materialRefers.at(i);
            var materialGuid = materialRefer.guid();
            var material = template.findMaterial(materialGuid);
            o.pushMaterial(material);
            o._material = material;
         }
      }
      if(!o._material){
         o._material = o._materialReference = RClass.create(FE3dMaterial);
      }
   }
   MO.FE3dTemplateRenderable_reloadResource = function FE3dTemplateRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialResource);
      material.update();
   }
   MO.FE3dTemplateRenderable_load = function FE3dTemplateRenderable_load(){
      var o = this;
      var display = o._display;
      var resource = o._resource;
      var modelResource = resource.model();
      var bitmaps = o._material.bitmaps();
      if(bitmaps){
         var count = bitmaps.count();
         for(var i = 0; i < count; i++){
            var bitmap = bitmaps.at(i);
            o.pushTexture(bitmap);
         }
      }
      var skeletonResources = modelResource.skeletons();
      if(skeletonResources){
         display.loadSkeletons(skeletonResources);
      }
      var animationResources = modelResource.animations();
      if(animationResources){
         display.loadAnimations(animationResources);
      }
      var meshResource = resource.mesh();
      var meshGuid = resource.meshGuid();
      var renderable = o._renderable = RConsole.find(FE3rModelConsole).findMesh(meshGuid);
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o._vertexBuffers.set(vertexBuffer.code(), vertexBuffer);
      }
      var skins = renderable.skins();
      if(skins){
         var displaySkeleton = display._activeSkeleton;
         var skin = o._activeSkin = skins.first();
         var streams = skin.streams();
         var streamCount = streams.count();
         for(var i = 0; i < streamCount; i++){
            var stream = streams.at(i);
            var buffer = stream.buffer();
            o._vertexBuffers.set(buffer.code(), buffer);
         }
         var skinResource = skin.resource();
         var boneReferResources = skinResource.boneRefers();
         var c = boneReferResources.count();
         if(c > 0){
            var bones = o._bones = new TObjects();
            for(var i = 0; i < c; i++){
               var boneReferResource = boneReferResources.at(i);
               var boneReferIndex = boneReferResource.index();
               var bone = displaySkeleton.bones().get(boneReferIndex);
               if(!bone){
                  throw new TError(o, 'Bone is not exist.');
               }
               bones.push(bone);
            }
         }
      }
      o._ready = true;
   }
   MO.FE3dTemplateRenderable_dispose = function FE3dTemplateRenderable_dispose(){
      var o = this;
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
