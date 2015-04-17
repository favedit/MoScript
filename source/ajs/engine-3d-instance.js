var EE3dInstance = new function EE3dInstance(){
   var o = this;
   o.Scene              = 'scene';
   o.SceneLayer         = 'scene.layer';
   o.SceneDisplay       = 'scene.display';
   o.SceneMaterial      = 'scene.material';
   o.SceneRenderable    = 'scene.renderable';
   o.TemplateRenderable = 'template.renderable';
   return o;
}
function FE3dBitmap(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
   o._ready           = false;
   o._renderable      = null;
   o.construct        = FE3dBitmap_construct;
   o.testReady        = FE3dBitmap_testReady;
   o.renderable       = FE3dBitmap_renderable;
   o.setRenderable    = FE3dBitmap_setRenderable;
   o.vertexBuffers    = FE3dBitmap_vertexBuffers;
   o.indexBuffer      = FE3dBitmap_indexBuffer;
   o.findVertexBuffer = FE3dBitmap_findVertexBuffer;
   o.findTexture      = FE3dBitmap_findTexture;
   o.textures         = FE3dBitmap_textures;
   o.processLoad      = FE3dBitmap_processLoad;
   o.process          = FE3dBitmap_process;
   o.loadUrl          = FE3dBitmap_loadUrl;
   return o;
}
function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}
function FE3dBitmap_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
         if(o._ready){
            var size = renderable.size();
            var adjustSize = renderable.adjustSize();
            var matrix = o.matrix();
            matrix.sz = adjustSize.height / size.height;
            matrix.updateForce();
            var event = new SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
      }
   }
   return o._ready;
}
function FE3dBitmap_renderable(p){
   return this._renderable;
}
function FE3dBitmap_setRenderable(p){
   var o = this;
   this._renderable= p;
   o._ready = true;
   o.processLoadListener(o);
}
function FE3dBitmap_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FE3dBitmap_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dBitmap_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FE3dBitmap_findTexture(p){
   return this._renderable.findTexture(p);
}
function FE3dBitmap_textures(){
   return this._renderable.textures();
}
function FE3dBitmap_processLoad(){
   var o = this;
   return true;
}
function FE3dBitmap_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}
function FE3dBitmap_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3rBitmapConsole).loadUrl(context, url);
   o._ready = false;
}
function FE3dBoundBox(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._outline              = null;
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dBoundBox_construct;
   o.outline               = FE3dBoundBox_outline;
   o.setup                 = FE3dBoundBox_setup;
   o.upload                = FE3dBoundBox_upload;
   return o;
}
function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dBoundBox_outline(){
   return this._outline;
}
function FE3dBoundBox_setup(){
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
       0,  1,  0,  4,  0, 12,
       3,  2,  3,  5,  3, 13,
       8,  6,  8,  9,  8, 14,
      11,  7, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib._lineWidth = 1;
   ib.upload(id, 48);
   o.update();
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dBoundBox_upload(){
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
function FE3dCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
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
   o.loadResource    = FE3dCamera_loadResource;
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
function FE3dCamera_loadResource(resource){
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
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
function FE3dCube(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup                = FE3dCube_setup;
   return o;
}
function FE3dCube_setup(p){
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
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dDimensional(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dDimensional_construct;
   o.setup                 = FE3dDimensional_setup;
   return o;
}
function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._cellSize = new SSize2();
   o._cellSize.set(1, 1);
   o._size = new SSize2();
   o._size.set(16, 16);
}
function FE3dDimensional_setup(){
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
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
   o._material    = null;
   o.construct    = FE3dDirectionalLight_construct;
   o.material     = FE3dDirectionalLight_material;
   o.loadResource = FE3dDirectionalLight_loadResource;
   o.dispose      = FE3dDirectionalLight_dispose;
   return o;
}
function FE3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dDirectionalLight.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
}
function FE3dDirectionalLight_material(){
   return this._material;
}
function FE3dDirectionalLight_loadResource(resource){
   var o = this;
   o.__base.MLinkerResource.loadResource.call(o, resource);
   o._material.loadResource(resource.material());
}
function FE3dDirectionalLight_dispose(){
   var o = this;
   o._material = RObject.dispose(o._material);
   o.__base.FG3dDirectionalLight.dispose.call(o);
}
function FE3dInstanceConsole(o){
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
function FE3dInstanceConsole_construct(){
   var o = this;
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
   factory.register(EE3dInstance.Scene, FE3dScene);
   factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
   factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
   factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
   factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
}
function FE3dInstanceConsole_factory(){
   return this._factory;
}
function FE3dInstanceConsole_register(code, clazz){
   this._factory.register(code, clazz);
}
function FE3dInstanceConsole_unregister(code){
   this._factory.unregister(code, clazz);
}
function FE3dInstanceConsole_create(code){
   return this._factory.create(code);
}
function FE3dMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial, MLinkerResource);
   return o;
}
function FE3dMesh(o){
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
function FE3dMesh_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var l = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', l);
}
function FE3dMesh_testReady(){
   return this._ready;
}
function FE3dMesh_loadRenderable(p){
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
function FE3dMesh_processLoad(){
   var o = this;
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}
function FE3dMesh_process(){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
}
function FE3dMeshConsole(o){
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
function FE3dMeshConsole_onProcess(){
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
function FE3dMeshConsole_construct(){
   var o = this;
   o._loadMeshs = new TLooper();
   o._meshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dMeshConsole_meshs(){
   return this._meshs;
}
function FE3dMeshConsole_allocByGuid(pc, pn){
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
function FE3dMeshConsole_allocByCode(pc, pn){
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
function FE3dMeshConsole_free(p){
   var o = this;
   p._display.remove();
}
function FE3dMeshDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   o._material      = null;
   o._renderable    = null;
   o.renderable     = FE3dMeshDisplay_renderable;
   o.load           = FE3dMeshDisplay_load;
   o.reloadResource = FE3dMeshDisplay_reloadResource;
   return o;
}
function FE3dMeshDisplay_renderable(){
   return this._renderable;
}
function FE3dMeshDisplay_load(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
}
function FE3dMeshDisplay_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FE3dRenderable, MLinkerResource);
   o._renderable      = null;
   o._activeSkin      = null;
   o._activeTrack     = null;
   o._bones           = null;
   o.renderable       = FE3dMeshRenderable_renderable;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.bones            = FE3dMeshRenderable_bones;
   o.reloadResource   = FE3dMeshRenderable_reloadResource;
   o.process          = FE3dMeshRenderable_process;
   o.processDelay     = FE3dMeshRenderable_processDelay;
   o.update           = FE3dMeshRenderable_update;
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}
function FE3dMeshRenderable_renderable(){
   return this._renderable;
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
function FE3dMeshRenderable_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
function FE3dMeshRenderable_process(p){
   var o = this;
   o.__base.FE3dRenderable.process.call(o, p)
   var t = o._activeTrack;
   if(t){
      if(o._display._optionPlay){
         var a = t._animation;
         if(a){
            a.process(t);
         }
      }
   }
}
function FE3dMeshRenderable_processDelay(p){
   var o = this;
   o.__base.FE3dRenderable.processDelay.call(o, p);
}
function FE3dMeshRenderable_update(p){
   var o = this;
   var d = o._display;
   var mm = o._matrix;
   var t = o._activeTrack;
   var m = o._calculateMatrix;
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
   var c = o._currentMatrix.attachData(m.data());
   if(c){
      p.change();
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
   o.__base.FE3dRenderable.dispose.call(o);
}
function FE3dModel(o){
   o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   o._geometrys     = null;
   o._renderable    = null;
   o._display       = null;
   o.construct      = FE3dModel_construct;
   o.display        = FE3dModel_display;
   o.testReady      = FE3dModel_testReady;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   o.process        = FE3dModel_process;
   return o;
}
function FE3dModel_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', layer);
   var display = o._display = RClass.create(FE3dModelDisplay);
   layer.pushDisplay(display);
}
function FE3dModel_display(){
   return this._display;
}
function FE3dModel_testReady(){
   return this._dataReady;
}
function FE3dModel_loadRenderable(renderable){
   var o = this;
   var resource = renderable.resource();
   o.selectTechnique(o, FE3dGeneralTechnique);
   o.loadResource(resource);
   o._display.load(renderable);
   o._dataReady = true;
}
function FE3dModel_processLoad(){
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
function FE3dModel_process(){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._pools      = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dModelConsole_onProcess;
   o.construct   = FE3dModelConsole_construct;
   o.pools       = FE3dModelConsole_pools;
   o.alloc       = FE3dModelConsole_alloc;
   o.free        = FE3dModelConsole_free;
   return o;
}
function FE3dModelConsole_onProcess(){
   var o = this;
   var looper = o._loadModels;
   looper.record();
   while(looper.next()){
      var model = looper.current();
      if(model.processLoad()){
         looper.removeCurrent();
      }
   }
}
function FE3dModelConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._pools = RClass.create(FObjectPools);
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}
function FE3dModelConsole_pools(){
   return this._pools;
}
function FE3dModelConsole_alloc(context, guid){
   var o = this;
   var model = o._pools.alloc(guid);
   if(model){
      return model;
   }
   var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
   var model = RClass.create(FE3dModel);
   model.linkGraphicContext(context);
   model._name = guid;
   model._poolCode = guid;
   model._renderable = renderable;
   o._loadModels.push(model);
   return model;
}
function FE3dModelConsole_free(model){
   var o = this;
   var code = model._poolCode;
   o._pools.free(code, model);
}
function FE3dModelDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   o._material      = null;
   o.construct      = FE3dModelDisplay_construct;
   o.material       = FE3dModelDisplay_material;
   o.load           = FE3dModelDisplay_load;
   o.reloadResource = FE3dModelDisplay_reloadResource;
   o.dispose        = FE3dModelDisplay_dispose;
   return o;
}
function FE3dModelDisplay_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._material = RClass.create(FE3dMaterial);
}
function FE3dModelDisplay_material(){
   return this._material;
}
function FE3dModelDisplay_load(renderable){
   var o = this;
   var modelResource = renderable.resource();
   var resource = o._resource = modelResource._display;
   o._matrix.assign(resource.matrix());
   o._material.loadResource(resource.material());
   var geometryRenderables = renderable.geometrys();
   if(geometryRenderables){
      var geometryCount = geometryRenderables.count();
      var geometrys = o._geometrys = new TObjects();
      for(var i = 0; i < geometryCount; i++){
         var geometryRenderable = geometryRenderables.get(i);
         var renderable = RClass.create(FE3dModelRenderable);
         renderable._display = o;
         renderable._material = o._material;
         renderable.load(geometryRenderable);
         geometrys.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}
function FE3dModelDisplay_reloadResource(){
   var o = this;
   var resource = o._resource;
   o._matrix.assign(resource.matrix());
   o._material.loadResource(resource.material());
}
function FE3dModelDisplay_dispose(){
   var o = this;
   o._material = RObject.dispose(o._material);
   o.__base.FE3dDisplay.dispose.call(o);
}
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FE3dModelRenderable_construct;
   o.createMaterial    = RMethod.empty;
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
   o.__base.FE3dMeshRenderable.construct.call(o);
}
function FE3dModelRenderable_testVisible(p){
   var o = this;
   var ready = o._ready;
   if(!ready){
      var renderable = o._renderable;
      if(renderable){
         ready = o._ready = renderable.testReady();
      }
   }
   return ready;
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
function FE3dModelRenderable_load(renderable){
   var o = this;
   var material = o._material;
   var materialResource = o._materialResource = renderable.material();
   if(materialResource){
      material.assignInfo(materialResource.info());
   }
   o._effectCode = material.info().effectCode;
   o._renderable = renderable;
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
   var d = o._display;
   var mm = o._matrix;
   var t = o._activeTrack;
   var m = o._calculateMatrix;
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
   var c = o._currentMatrix.attachData(m.data());
   if(c){
      p.change();
   }
}
function FE3dPolygon(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   return o;
}
function FE3dRectangle(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.setup                 = FE3dRectangle_setup;
   return o;
}
function FE3dRectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o._vertexPositionBuffer = p.createVertexBuffer();
   o._vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o._vertexColorBuffer = p.createVertexBuffer();
   o._vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o._indexBuffer = context.createIndexBuffer();
   o._indexBuffer.upload(id, 6);
}
function FE3dRegion(o){
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
function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   var c = o._camera = RClass.create(FE3dCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   var l = o._directionalLight = RClass.create(FE3dDirectionalLight);
   l.direction().set(0, -1, 0);
   var c = o._backgroundColor = new SColor4();
   c.set(0, 0, 0, 1);
   o._calculateCameraMatrix = new SMatrix3d();
}
function FE3dRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3dRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o._camera.loadResource(p.camera());
   o._directionalLight.loadResource(p.light());
   o.reloadResource();
}
function FE3dRegion_reloadResource(){
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
function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   var r = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(r){
      o._changed = true;
   }
}
function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
function FE3dScene(o){
   o = RClass.inherits(this, o, FE3dSpace, MListenerLoad);
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
   o.dirty                 = FE3dScene_dirty;
   o.processLoad           = FE3dScene_processLoad;
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}
function FE3dScene_onProcess(){
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
function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
}
function FE3dScene_createRegion(){
   return RClass.create(FE3dSceneRegion);
}
function FE3dScene_resource(p){
   return this._resource;
}
function FE3dScene_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}
function FE3dScene_loadRegionResource(p){
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
function FE3dScene_loadDisplayResource(layer, resource){
   var o = this;
   var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
   display.linkGraphicContext(o);
   display.loadSceneResource(resource);
   RConsole.find(FE3dSceneConsole).loadDisplay(display);
   layer.pushDisplay(display);
}
function FE3dScene_loadLayerResource(resource){
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
function FE3dScene_loadResource(p){
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
function FE3dScene_dirty(){
   this._dirty = true;
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
   o.__base.FE3dSpace.active.call(o);
}
function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dSpace.deactive.call(o);
}
function FE3dSceneCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeScene           = null;
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
   o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
   o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
   o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
   o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
   o.onSceneLoad            = FE3dSceneCanvas_onSceneLoad;
   o.onResize               = FE3dSceneCanvas_onResize;
   o.construct              = FE3dSceneCanvas_construct;
   o.load                   = FE3dSceneCanvas_load;
   o.testPlay               = FE3dSceneCanvas_testPlay;
   o.switchPlay             = FE3dSceneCanvas_switchPlay;
   o.testMovie              = FE3dSceneCanvas_testMovie;
   o.switchMovie            = FE3dSceneCanvas_switchMovie;
   o.doAction               = FE3dSceneCanvas_doAction;
   o.dispose                = FE3dSceneCanvas_dispose;
   return o;
}
function FE3dSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var st = s.timer();
   var ss = st.spanSecond();
   var c = s.camera();
   var d = o._cameraMoveRate * ss;
   var r = o._cameraKeyRotation * ss;
   var kw = RKeyboard.isPress(EStageKey.Forward);
   var ks = RKeyboard.isPress(EStageKey.Back);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var kq = RKeyboard.isPress(EStageKey.Up);
   var ke = RKeyboard.isPress(EStageKey.Down);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var ka = RKeyboard.isPress(EStageKey.RotationLeft);
   var kd = RKeyboard.isPress(EStageKey.RotationRight);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kz = RKeyboard.isPress(EStageKey.RotationUp);
   var kw = RKeyboard.isPress(EStageKey.RotationDown);
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
function FE3dSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}
function FE3dSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeScene.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}
function FE3dSceneCanvas_onMouseCaptureStop(p){
}
function FE3dSceneCanvas_onTouchStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var r = o._activeScene.region();
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
function FE3dSceneCanvas_onTouchMove(p){
   var o = this;
   if(!o._captureStatus){
      return;
   }
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      var cm = o._activeScene.camera();
      var cr = cm.rotation();
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}
function FE3dSceneCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}
function FE3dSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeScene;
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
function FE3dSceneCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeScene;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
function FE3dSceneCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
   o._captureCameraRotation = new SVector3();
}
function FE3dSceneCanvas_load(p){
   var o = this;
   var c = o._graphicContext;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene){
      sc.free(o._activeScene);
   }
   var s = sc.alloc(o._graphicContext, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FE3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
}
function FE3dSceneCanvas_testPlay(){
   return this._actionPlay;
}
function FE3dSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeScene;
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
function FE3dSceneCanvas_testMovie(){
   return this._actionMovie;
}
function FE3dSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeScene;
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
function FE3dSceneCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeScene;
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
function FE3dSceneCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FE3dCanvas.dispose.call(o);
}
function FE3dSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadDisplays = null;
   o._loadScenes   = null;
   o._scenes       = null;
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
function FE3dSceneConsole_onProcess(){
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
function FE3dSceneConsole_construct(){
   var o = this;
   o._loadDisplays = new TLooper();
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   var thread = o._thread = RClass.create(FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(thread);
}
function FE3dSceneConsole_scenes(){
   return this._scenes;
}
function FE3dSceneConsole_loadDisplay(display){
   this._loadDisplays.push(display);
}
function FE3dSceneConsole_allocByGuid(context, guid){
   var o = this;
   var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
   var scene = RClass.create(FE3dScene);
   scene.linkGraphicContext(context);
   scene._guid = guid;
   scene._resource = resource;
   scene.setup();
   if(resource.testReady()){
      scene.load(resource);
   }else{
      o._loadScenes.push(scene);
   }
   return scene;
}
function FE3dSceneConsole_allocByCode(pc, pn){
   var o = this;
   var rsc = RConsole.find(FE3sSceneConsole);
   var rs = rsc.load(pn);
   var s = RClass.create(FE3dScene);
   s.linkGraphicContext(pc);
   s._name = pn;
   s._resource = rs;
   s.setup();
   if(rs.testReady()){
      s.load(rs);
   }else{
      o._loadScenes.push(s);
   }
   return s;
}
function FE3dSceneConsole_free(scene){
}
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._parentMaterials  = null;
   o._movies           = null;
   o._template         = null;
   o.construct         = FE3dSceneDisplay_construct;
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadAnimations    = FE3dSceneDisplay_loadAnimations;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
   o.processLoad       = FE3dSceneDisplay_processLoad;
   return o;
}
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}
function FE3dSceneDisplay_resourceScene(){
   return this._resource;
}
function FE3dSceneDisplay_loadSceneResource(resource){
   var o = this;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   o._resource = resource;
   o._matrix.assign(resource.matrix());
   var rms = resource.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.at(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
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
function FE3dSceneDisplay_loadAnimations(p){
   var o = this;
   o.__base.FE3dSprite.loadAnimations.call(o, p);
   var s = o._animations;
   if(s){
      var sr = o._resource;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var a = s.valueAt(i);
         var ar = a.resource();
         var sar = sr.findAnimation(ar.guid());
         a._resource = sar;
         if(sar){
            a._playRate = sar._playRate;
         }
      }
   }
}
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var r = cf.create(EE3dScene.Renderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(rd);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         r.loadMaterial(m);
      }
   }
}
function FE3dSceneDisplay_loadTemplate(template){
   var o = this;
   var parentMaterials = o._parentMaterials;
   var sprite = template.sprite();
   var renderables = sprite.renderables();
   var count = renderables.count();
   for(var n = 0; n < count; n++){
      var renderable = renderables.at(n);
      var material = renderable.material();
      var materialGuid = material.guid();
      var displayMaterial = parentMaterials.get(materialGuid);
      displayMaterial._parentMaterial = material;
      displayMaterial.reloadResource();
   }
   o.pushDisplay(sprite);
}
function FE3dSceneDisplay_processLoad(){
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
      var c = o._resource.code();
      if(c == 'rotation'){
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   o._materialReference = null;
   o.materialReference  = FE3dSceneDisplayRenderable_materialReference;
   o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
   return o;
}
function FE3dSceneDisplayRenderable_materialReference(p){
   return this._materialReference;
}
function FE3dSceneDisplayRenderable_loadMaterial(p){
   var o = this;
   o._materialReference = p;
   o._material.calculate(p);
}
function FE3dSceneDisplayRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialReference);
   m.update();
}
function FE3dSceneLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   o._resource    = null;
   o.resource     = FE3dSceneLayer_resource;
   o.loadResource = FE3dSceneLayer_loadResource;
   o.process      = FE3dSceneLayer_process;
   return o;
}
function FE3dSceneLayer_resource(){
   return this._resource;
}
function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}
function FE3dSceneLayer_process(p){
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
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial);
   o._display          = null;
   o._resource         = null;
   o._parentMaterial   = null;
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.resource          = FE3dSceneMaterial_resource;
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reloadResource    = FE3dSceneMaterial_reloadResource;
   return o;
}
function FE3dSceneMaterial_groupGuid(p){
   return this._resource.groupGuid();
}
function FE3dSceneMaterial_resource(p){
   return this._resource;
}
function FE3dSceneMaterial_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
   o._info.assign(resource.info());
}
function FE3dSceneMaterial_reloadResource(){
   var o = this;
   var resource = o._resource;
   o.loadResource(resource);
   o._parentMaterial.loadResource(resource);
}
function FE3dSceneRegion(o){
   o = RClass.inherits(this, o, FE3dRegion);
   o._resource      = null;
   o.construct      = FE3dSceneRegion_construct;
   o.resource       = FE3dSceneRegion_resource;
   o.loadResource   = FE3dSceneRegion_loadResource;
   o.reloadResource = FE3dSceneRegion_reloadResource;
   o.dispose        = FE3dSceneRegion_dispose;
   return o;
}
function FE3dSceneRegion_construct(){
   var o = this;
   o.__base.FE3dRegion.construct.call(o);
}
function FE3dSceneRegion_resource(){
   return this._resource;
}
function FE3dSceneRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o.reloadResource();
}
function FE3dSceneRegion_reloadResource(){
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
function FE3dSceneRegion_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FE3dRegion.dispose.call(o);
}
function FE3dSimpleCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeStage           = null;
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
   o.switchPlay             = FE3dSimpleCanvas_switchPlay;
   o.switchMovie            = FE3dSimpleCanvas_switchMovie;
   o.doAction               = FE3dSimpleCanvas_doAction;
   o.dispose                = FE3dSimpleCanvas_dispose;
   return o;
}
function FE3dSimpleCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeStage;
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
function FE3dSimpleCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}
function FE3dSimpleCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeStage.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}
function FE3dSimpleCanvas_onMouseCaptureStop(p){
}
function FE3dSimpleCanvas_onTouchStart(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var r = o._activeStage.region();
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
function FE3dSimpleCanvas_onTouchMove(p){
   var o = this;
   if(!o._captureStatus){
      return;
   }
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      var cm = o._activeStage.camera();
      var cr = cm.rotation();
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}
function FE3dSimpleCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}
function FE3dSimpleCanvas_onSceneLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeStage;
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
function FE3dSimpleCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeStage;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
function FE3dSimpleCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
   o._captureCameraRotation = new SVector3();
}
function FE3dSimpleCanvas_switchPlay(p){
   var o = this;
   var s = o._activeStage;
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
function FE3dSimpleCanvas_switchMovie(p){
   var o = this;
   var s = o._activeStage;
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
function FE3dSimpleCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeStage;
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
function FE3dSimpleCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FE3dCanvas.dispose.call(o);
}
function FE3dSpace(o){
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
   o.materials             = FE3dSpace_materials;
   o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
   o.loadRegionResource    = FE3dSpace_loadRegionResource;
   o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
   o.loadLayerResource     = FE3dSpace_loadLayerResource;
   o.loadResource          = FE3dSpace_loadResource;
   o.dirty                 = FE3dSpace_dirty;
   o.processLoad           = FE3dSpace_processLoad;
   o.active                = FE3dSpace_active;
   o.deactive              = FE3dSpace_deactive;
   return o;
}
function FE3dSpace_onProcess(){
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
function FE3dSpace_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   o._materials = new TDictionary();
}
function FE3dSpace_linkGraphicContext(context){
   var o = this;
   o.__base.FE3dStage.linkGraphicContext.call(o, context);
   o._region.linkGraphicContext(context);
}
function FE3dSpace_createRegion(){
   return RClass.create(FE3dRegion);
}
function FE3dSpace_resource(p){
   return this._resource;
}
function FE3dSpace_materials(p){
   return this._materials;
}
function FE3dSpace_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}
function FE3dSpace_loadRegionResource(p){
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
function FE3dSpace_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   pl.pushDisplay(d3);
}
function FE3dSpace_loadLayerResource(p){
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
function FE3dSpace_loadResource(resource){
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
function FE3dSpace_dirty(){
   this._dirty = true;
}
function FE3dSpace_processLoad(){
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
function FE3dSpace_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
function FE3dSpace_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
function FE3dSprite(o){
   o = RClass.inherits(this, o, FE3dDisplayContainer, MGraphicObject);
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   o._shapes          = null;
   o._skeletons       = null;
   o._animations      = null;
   o._resource        = null;
   o.construct        = FE3dSprite_construct;
   o.testReady        = FE3dSprite_testReady;
   o.findMeshByCode   = FE3dSprite_findMeshByCode;
   o.meshRenderables  = FE3dSprite_shapes;
   o.skeletons        = FE3dSprite_skeletons;
   o.pushSkeleton     = FE3dSprite_pushSkeleton;
   o.findAnimation    = FE3dSprite_findAnimation;
   o.animations       = FE3dSprite_animations;
   o.pushAnimation    = FE3dSprite_pushAnimation;
   o.resource         = FE3dSprite_resource;
   o.setResource      = FE3dSprite_setResource;
   o.loadSkeletons    = FE3dSprite_loadSkeletons;
   o.linkAnimation    = FE3dSprite_linkAnimation;
   o.loadAnimations   = FE3dSprite_loadAnimations;
   o.loadResource     = FE3dSprite_loadResource;
   o.reloadResource   = FE3dSprite_reloadResource;
   o.load             = FE3dSprite_load;
   o.updateMatrix     = FE3dSprite_updateMatrix;
   o.process          = FE3dSprite_process;
   o.dispose          = FE3dSprite_dispose;
   return o;
}
function FE3dSprite_construct(){
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   o._shapes = new TObjects();
}
function FE3dSprite_testReady(){
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
function FE3dSprite_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dSprite_shapes(){
   return this._shapes;
}
function FE3dSprite_skeletons(){
   return this._skeletons;
}
function FE3dSprite_pushSkeleton(p){
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
function FE3dSprite_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}
function FE3dSprite_animations(){
   return this._animations;
}
function FE3dSprite_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TDictionary();
   }
   var pr = p.resource();
   r.set(pr.guid(), p);
}
function FE3dSprite_resource(p){
   return this._resource;
}
function FE3dSprite_setResource(p){
   this._resource = p;
}
function FE3dSprite_loadSkeletons(p){
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
function FE3dSprite_linkAnimation(p){
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
function FE3dSprite_loadAnimations(p){
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
function FE3dSprite_loadResource(resource){
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
function FE3dSprite_reloadResource(){
   var o = this;
   var s = o._shapes;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dSprite_load(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         shapes.at(i).load();
      }
   }
}
function FE3dSprite_updateMatrix(){
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
function FE3dSprite_process(region){
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
function FE3dSprite_dispose(){
   var o = this;
   o._shapes = RObject.dispose(o._shapes);
   o.__base.FE3dDisplayContainer.dispose.call(o);
}
function FE3dTemplate(o){
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
function FE3dTemplate_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', layer);
   o._sprites = new TObjects();
}
function FE3dTemplate_testReady(){
   return this._ready;
}
function FE3dTemplate_sprite(){
   return this._sprites.first();
}
function FE3dTemplate_findMeshByCode(p){
   var s = this._sprites;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dTemplate_sprites(){
   return this._sprites;
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
         var r = p.getAt(i);
         var s = RClass.create(FE3rSkeleton);
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
      var t = ts.getAt(i);
      var mc = t._resource._meshCode;
      if(mc){
         var m = o.findMeshByCode(mc);
         m._activeTrack = t;
      }
   }
}
function FE3dTemplate_loadAnimations(p){
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
function FE3dTemplate_loadResource(resource){
   var o = this;
   var technique = o.selectTechnique(o, FE3dGeneralTechnique);
   technique.setResource(resource.technique());
   o.__base.FE3dSpace.loadResource.call(o, resource);
   var displayResources = resource.displays();
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
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._sprites;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dTemplate_processLoad(){
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
function FE3dTemplate_process(event){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
}
function FE3dTemplate_dispose(){
   var o = this;
   o._sprites = RObject.dispose(o._sprites);
   o.__base.FE3dSpace.dispose.call(o);
}
function FE3dTemplateCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeTemplate     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = FDsSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
   o.onResize            = FE3dTemplateCanvas_onResize;
   o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
   o.construct           = FE3dTemplateCanvas_construct;
   o.build               = FE3dTemplateCanvas_build;
   o.load                = FE3dTemplateCanvas_load;
   o.setPanel            = FE3dTemplateCanvas_setPanel;
   o.dispose             = FE3dTemplateCanvas_dispose;
   return o;
}
function FE3dTemplateCanvas_onEnterFrame(){
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
function FE3dTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var r = o._activeTemplate.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
function FE3dTemplateCanvas_onMouseCapture(p){
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
function FE3dTemplateCanvas_onMouseCaptureStop(p){
}
function FE3dTemplateCanvas_onResize(){
   var o = this;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   var c = o._context;
   c.setViewport(0, 0, w, h);
}
function FE3dTemplateCanvas_onTemplateLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeTemplate;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   o.processLoadListener(o, s);
}
function FE3dTemplateCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureRotation = new SVector3();
}
function FE3dTemplateCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   var c = o._context = REngine3d.createContext(FWglContext, h);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   RWindow.lsnsResize.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dTemplateCanvas_load(p){
   var o = this;
   var c = o._context;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeTemplate != null){
      sc.free(o._activeTemplate);
   }
   var s = sc.alloc(o._context, p);
   s.addLoadListener(o, o.onTemplateLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeTemplate = s;
   RStage.register('stage3d', s);
}
function FE3dTemplateCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE3dTemplateCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FObject.dispose.call(o);
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
   o.allocByGuid    = FE3dTemplateConsole_allocByGuid;
   o.allocByCode    = FE3dTemplateConsole_allocByCode;
   o.loadByGuid     = FE3dTemplateConsole_loadByGuid;
   o.loadByCode     = FE3dTemplateConsole_loadByCode;
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
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dTemplateConsole_allocByGuid(c, n){
   var o = this;
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(n);
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setCode(n);
   t._resourceGuid = n;
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_allocByCode(c, n){
   var o = this;
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(n);
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setCode(n);
   t._resourceGuid = n;
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_loadByGuid(t, p){
   var o = this;
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(p);
   t._resourceGuid = p;
   t.setCode(p);
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_loadByCode(t, p){
   var o = this;
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(g, p);
   t._resourceGuid = g;
   t.setCode(c);
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_free(p){
   var o = this;
   p.remove();
   var n = p._resourceGuid;
   var s = o._templates.get(n);
   if(!s){
      s = new TObjects();
      o._templates.set(n, s);
   }
   s.push(p);
}
function FE3dTemplateDisplay(o){
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
function FE3dTemplateDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._shapes = new TObjects();
}
function FE3dTemplateDisplay_testReady(){
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
function FE3dTemplateDisplay_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dTemplateDisplay_shapes(){
   return this._shapes;
}
function FE3dTemplateDisplay_skeletons(){
   return this._skeletons;
}
function FE3dTemplateDisplay_pushSkeleton(p){
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
function FE3dTemplateDisplay_loadSkeletons(p){
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
function FE3dTemplateDisplay_linkAnimation(p){
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
function FE3dTemplateDisplay_loadAnimations(p){
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
function FE3dTemplateDisplay_loadResource(resource){
   var o = this;
   o._resource = resource;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   o._matrix.assign(resource.matrix());
   var renderableResources = resource.renderables();
   var renderableCount = renderableResources.count();
   if(renderableCount > 0){
      var shapes = o._shapes;
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
function FE3dTemplateDisplay_reloadResource(){
   var o = this;
   var s = o._shapes;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).reloadResource();
      }
   }
}
function FE3dTemplateDisplay_load(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         shapes.at(i).load();
      }
   }
}
function FE3dTemplateDisplay_dispose(){
   var o = this;
   o._shapes = RObject.dispose(o._shapes);
   o.__base.FE3dSprite.dispose.call(o);
}
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
   o._ready            = false;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FE3dTemplateRenderable_construct;
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
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
   var o = this;
   var r = false;
   if(o._ready){
      r = o.__base.FE3dMeshRenderable.testVisible.call(o);
   }
   return r;
}
function FE3dTemplateRenderable_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
   o._model = RConsole.find(FE3rModelConsole).load(o, resource.modelGuid());
   o._material = RConsole.find(FE3rMaterialConsole).load(o, resource.materialGuid());
   var materialResource = o._material.resource();
   var materialGuid = materialResource.guid();
   var bitmapResources = materialResource.bitmaps();
   if(bitmapResources){
      var count = bitmapResources.count();
      var textures = o._textures = new TDictionary();
      var bitmapConsole = RConsole.find(FE3rBitmapConsole)
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapPackResource = bitmapResource.bitmapPack();
         var bitmap = bitmapConsole.load(o, materialGuid, bitmapPackResource.code());
         textures.set(bitmapResource.code(), bitmap);
      }
   }
}
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialResource);
   m.update();
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
   var rd = o._renderable = RConsole.find(FE3rModelConsole).findMesh(r.meshGuid());
   var vbs = rd._vertexBuffers;
   var c = vbs.count();
   for(var i = 0; i < c; i++){
      var vb = vbs.at(i);
      o._vertexBuffers.set(vb._name, vb);
   }
   var ss = rd.skins();
   if(ss){
      var dk = d._activeSkeleton;
      var k = o._activeSkin = ss.first();
      var ss = k.streams();
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.at(i);
         var vb = s.buffer();
         o._vertexBuffers.set(vb._name, vb);
      }
      var kr = k.resource();
      var brs = kr.boneRefers();
      var c = brs.count();
      if(c > 0){
         var bs = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var br = brs.at(i);
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
