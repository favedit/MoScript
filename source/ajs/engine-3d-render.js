MO.SE3rPlayInfo = function SE3rPlayInfo(){
   var o = this;
   o.tick         = 0;
   o.playRate     = 1.0;
   o.beginIndex   = 0;
   o.endIndex     = 0;
   o.frameCount   = 0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new MO.SPoint3();
   o.quaternion   = new MO.SQuaternion();
   o.scale        = new MO.SVector3();
   o.matrix       = new MO.SMatrix3d();
   o.update       = MO.SE3rPlayInfo_update;
   return o;
}
MO.SE3rPlayInfo_update = function SE3rPlayInfo_update(){
   var o = this;
   var currentFrame = o.currentFrame;
   if(!currentFrame){
      return false;
   }
   var nextFrame = o.nextFrame;
   if(!nextFrame){
      return false;
   }
   var matrix = o.matrix;
   var currentTranslation = currentFrame.translation();
   var currentQuaternion = currentFrame.quaternion();
   var currentScale = currentFrame.scale();
   var rate = o.rate;
   if((rate > 0) && (rate < 1)){
      o.translation.slerp(currentTranslation, nextFrame.translation(), rate);
      o.quaternion.slerp(currentQuaternion, nextFrame.quaternion(), rate);
      o.scale.slerp(currentScale, nextFrame.scale(), rate);
      matrix.build(o.translation, o.quaternion, o.scale);
   }else{
      matrix.build(currentTranslation, currentQuaternion, currentScale);
   }
   return true;
}
MO.FE3rAnimation = function FE3rAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = MO.Class.register(o, new AGetter('_tracks'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o._playInfo    = null;
   o.construct    = MO.FE3rAnimation_construct;
   o.findTrack    = MO.FE3rAnimation_findTrack;
   o.loadResource = MO.FE3rAnimation_loadResource;
   o.record       = MO.FE3rAnimation_record;
   o.process      = MO.Method.virtual(o, 'process');
   o.dispose      = MO.FE3rAnimation_dispose;
   return o;
}
MO.FE3rAnimation_construct = function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new MO.SE3rPlayInfo();
}
MO.FE3rAnimation_findTrack = function FE3rAnimation_findTrack(p){
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
MO.FE3rAnimation_loadResource = function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   o._resource = resource;
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new MO.TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = MO.Class.create(MO.FE3rTrack);
         track._animation = o;
         track.loadResource(trackResource);
         tracks.push(track);
      }
   }
   if(frameCount > 0){
      var info = o._playInfo;
      info.beginIndex = 0;
      info.endIndex = (frameCount > 0) ? frameCount - 1 : 0;
      info.frameCount = frameCount;
      o._valid = true;
   }
}
MO.FE3rAnimation_record = function FE3rAnimation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
}
MO.FE3rAnimation_dispose = function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
MO.FE3rBitmap = function FE3rBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._pack        = null;
   o.construct    = MO.FE3rBitmap_construct;
   o.testReady    = MO.FE3rBitmap_testReady;
   o.texture      = MO.FE3rBitmap_texture;
   o.loadResource = MO.FE3rBitmap_loadResource;
   o.dispose      = MO.FE3rBitmap_dispose;
   return o;
}
MO.FE3rBitmap_construct = function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
}
MO.FE3rBitmap_testReady = function FE3rBitmap_testReady(){
   return this._pack.testReady();
}
MO.FE3rBitmap_texture = function FE3rBitmap_texture(){
   return this._pack.texture();
}
MO.FE3rBitmap_loadResource = function FE3rBitmap_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._guid = resource.guid();
   o._code = resource.code();
}
MO.FE3rBitmap_dispose = function FE3rBitmap_dispose(){
   var o = this;
   o.__base.FE3rObject.dispose.call(o);
}
MO.FE3rBitmapConsole = function FE3rBitmapConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._bitmaps  = MO.Class.register(o, new AGetter('_bitmaps'));
   o._dataUrl  = '/cloud.resource.material.wv'
   o.construct = MO.FE3rBitmapConsole_construct;
   o.load      = MO.FE3rBitmapConsole_load;
   o.loadUrl   = MO.FE3rBitmapConsole_loadUrl;
   return o;
}
MO.FE3rBitmapConsole_construct = function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3rBitmapConsole_load = function FE3rBitmapConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = context.createObject(MO.FE3rBitmapCubePack);
   }else{
      bitmap = context.createObject(MO.FE3rBitmapFlatPack);
   }
   o._bitmaps.set(flag, bitmap);
   return bitmap;
}
MO.FE3rBitmapConsole_loadUrl = function FE3rBitmapConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = context.createObject(MO.FE3rBitmap);
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
MO.FE3rBitmapCubePack = function FE3rBitmapCubePack(o){
   o = MO.Class.inherits(this, o, MO.FE3rBitmapPack);
   o._images   = MO.Class.register(o, new MO.AGetter('_images'));
   o.onLoad    = MO.FE3rBitmapCubePack_onLoad;
   o.construct = MO.FE3rBitmapCubePack_construct;
   o.loadUrl   = MO.FE3rBitmapCubePack_loadUrl;
   o.dispose   = MO.FE3rBitmapCubePack_dispose;
   return o;
}
MO.FE3rBitmapCubePack_onLoad = function FE3rBitmapCubePack_onLoad(p){
   var o = this;
   var context = o._graphicContext;
   var images = o._images;
   var capability = MO.Window.Browser.capability();
   for(var i = 0; i < 6; i++){
      if(!images.at(i).testReady()){
         return;
      }
   }
   var texture = o._texture = context.createCubeTexture();
   texture.upload(images.at(0), images.at(1), images.at(2), images.at(3), images.at(4), images.at(5));
   for(var i = 0; i < 6; i++){
      var image = images.at(i);
      image.dispose();
   }
   o._images = MO.Lang.Object.dispose(o._images);
   o._dataReady = true;
   o._ready = true;
}
MO.FE3rBitmapCubePack_construct = function FE3rBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
MO.FE3rBitmapCubePack_loadUrl = function FE3rBitmapCubePack_loadUrl(url){
   var o = this;
   var images = o._images = new MO.TObjects();
   for(var i = 0; i < 6; i++){
      var image = MO.Class.create(MO.FImage);
      image._index = i;
      image.setOptionAlpha(false);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(url + "&index=" + i);
      images.push(image);
   }
}
MO.FE3rBitmapCubePack_dispose = function FE3rBitmapCubePack_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images, true);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
MO.FE3rBitmapFlatPack = function FE3rBitmapFlatPack(o){
   o = MO.Class.inherits(this, o, MO.FE3rBitmapPack);
   o._image    = MO.Class.register(o, new MO.AGetter('_image'));
   o.onLoad    = MO.FE3rBitmapFlatPack_onLoad;
   o.construct = MO.FE3rBitmapFlatPack_construct;
   o.loadUrl   = MO.FE3rBitmapFlatPack_loadUrl;
   o.dispose   = MO.FE3rBitmapFlatPack_dispose;
   return o;
}
MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   var texture = o._texture = o._graphicContext.createFlatTexture();
   texture.upload(o._image);
   texture.makeMipmap();
   o._image = MO.Lang.Object.dispose(o._image);
   o._dataReady = true;
}
MO.FE3rBitmapFlatPack_construct = function FE3rBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
MO.FE3rBitmapFlatPack_loadUrl = function FE3rBitmapFlatPack_loadUrl(url){
   var o = this;
   var image = o._image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onLoad);
   image.loadUrl(url);
}
MO.FE3rBitmapFlatPack_dispose = function FE3rBitmapFlatPack_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
MO.FE3rBitmapPack = function FE3rBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MLinkerResource);
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   o._dataReady = false;
   o._ready     = false;
   o.onLoad     = MO.Method.virtual(o, 'onLoad');
   o.construct  = MO.FE3rBitmapPack_construct;
   o.testReady  = MO.FE3rBitmapPack_testReady;
   o.loadUrl    = MO.Method.virtual(o, 'loadUrl');
   o.dispose    = MO.FE3rBitmapPack_dispose;
   return o;
}
MO.FE3rBitmapPack_construct = function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FE3rBitmapPack_testReady = function FE3rBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
MO.FE3rBitmapPack_dispose = function FE3rBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
MO.FE3rBone = function FE3rBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix        = MO.Class.register(o, new AGetter('_matrix'));
   o._boneResource  = MO.Class.register(o, new AGetter('_boneResource'));
   o._trackResource = MO.Class.register(o, new AGetter('_trackResource'));
   o.construct      = MO.FE3rBone_construct;
   o.loadResource   = MO.FE3rBone_loadResource;
   o.update         = MO.FE3rBone_update;
   o.dispose        = MO.FE3rBone_dispose;
   return o;
}
MO.FE3rBone_construct = function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}
MO.FE3rBone_loadResource = function FE3rBone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}
MO.FE3rBone_update = function FE3rBone_update(info, tick){
   var o = this;
   var resource = o._trackResource;
   resource.calculate(info, tick);
   info.update();
   var matrix = o._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(info.matrix);
}
MO.FE3rBone_dispose = function FE3rBone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._model            = null;
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = MO.FE3rDynamicMesh_construct;
   o.mergeCount        = MO.FE3rDynamicMesh_mergeCount;
   o.mergeMaxCount     = MO.FE3rDynamicMesh_mergeMaxCount;
   o.mergeStride       = MO.FE3rDynamicMesh_mergeStride;
   o.mergeRenderables  = MO.FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = MO.FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = MO.FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = MO.FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = MO.FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = MO.FE3rDynamicMesh_build;
   return o;
}
MO.FE3rDynamicMesh_construct = function FE3rDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new MO.TObjects();
}
MO.FE3rDynamicMesh_mergeCount = function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
MO.FE3rDynamicMesh_mergeMaxCount = function FE3rDynamicMesh_mergeMaxCount(){
   return this._model._mergeMaxCount;
}
MO.FE3rDynamicMesh_mergeStride = function FE3rDynamicMesh_mergeStride(){
   return 4;
}
MO.FE3rDynamicMesh_mergeRenderables = function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}
MO.FE3rDynamicMesh_syncVertexBuffer = function FE3rDynamicMesh_syncVertexBuffer(renderableBuffer){
   var o = this;
   var resource = renderableBuffer._resource;
   var code = resource.code();
   var buffer = o._vertexBuffers.get(code);
   if(!buffer){
      var formatCd = renderableBuffer.formatCd();
      var vertexTotal = o._vertexTotal;
      buffer = o._graphicContext.createVertexBuffer();
      buffer.setCode(code);
      buffer.setFormatCd(formatCd);
      buffer.setStride(renderableBuffer.stride());
      switch(formatCd){
         case MO.EG3dAttributeFormat.Float1:
            buffer._data = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            buffer._data = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            buffer._data = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            buffer._data = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            buffer._data = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
      }
      o._vertexBuffers.set(code, buffer);
   }
   return buffer;
}
MO.FE3rDynamicMesh_mergeRenderable = function FE3rDynamicMesh_mergeRenderable(renderable){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexCount = renderable.vertexCount();
   var indexBuffer = renderable.indexBuffers().first();
   var indexCount = indexBuffer.count();
   var mc = capability.mergeCount;
   if(o._mergeRenderables.count() >= mc){
      return false;
   }
   var vt = o._vertexTotal + vertexCount;
   if(capability.optionIndex32){
      if(vt > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vt > MO.Lang.Integer.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vertexCount;
   o._indexTotal += indexCount;
   o._mergeRenderables.push(renderable);
   return true;
}
MO.FE3rDynamicMesh_mergeVertexBuffer = function FE3rDynamicMesh_mergeVertexBuffer(renderable, code, vertexBuffer, resource){
   var o = this;
   var position = o._vertexPosition;
   var data = vertexBuffer._data;
   var dataCount = resource._dataCount;
   switch(code){
      case 'position':
         var d = new Float32Array(resource._data);
         MO.Lang.Float.copy(data, 3 * position, d, 0, 3 * dataCount);
         break;
      case 'coord':
         var d = new Float32Array(resource._data);
         MO.Lang.Float.copy(data, 2 * position, d, 0, 2 * dataCount);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(resource._data);
         MO.Lang.Byte.copy(data, 4 * position, d, 0, 4 * dataCount);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
}
MO.FE3rDynamicMesh_mergeIndexBuffer = function FE3rDynamicMesh_mergeIndexBuffer(resource){
   var o = this;
   var vp = o._vertexPosition;
   var ip = o._indexPosition;
   var id = o._indexBuffer._data;
   var rd = new Uint16Array(resource._data);
   var rc = 3 * resource._dataCount;
   for(var i = 0; i < rc; i++){
      id[ip++] = vp + rd[i]
   }
}
MO.FE3rDynamicMesh_build = function FE3rDynamicMesh_build(){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf.material();
   o._textures = rf.textures();
   var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float1);
   var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
   o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
   var indexBuffer = o._indexBuffer = context.createIndexBuffer(MO.FE3rIndexBuffer);
   if(capability.optionIndex32){
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer._data = new Uint32Array(indexTotal);
   }else{
      indexBuffer.setSstrideCd(MO.EG3dIndexStride.Uint16);
      indexBuffer._data = new Uint16Array(indexTotal);
   }
   indexBuffer._count = indexTotal;
   o.pushIndexBuffer(indexBuffer);
   for(var i = 0; i < rc; i++){
      var renderable = rs.getAt(i);
      var vc = renderable.vertexCount();
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var vbi = 0; vbi < vertexBufferCount; vbi++){
         var vb = vertexBuffers.at(vbi);
         var vertexBufferResource = vb._resource;
         var vbrc = vertexBufferResource.code();
         var vertexBuffer = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(renderable, vbrc, vertexBuffer, vertexBufferResource);
      }
      MO.Lang.Float.fill(vdi, o._vertexPosition, vc, i);
      var indexBuffer = renderable.indexBuffers().first();
      var ic = indexBuffer.count();
      var indexBufferResource = indexBuffer._resource;
      o.mergeIndexBuffer(indexBufferResource);
      o._vertexPosition += vc;
      o._indexPosition += ic;
   }
   var vertexBuffers = o._vertexBuffers;
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      vertexBuffer.upload(vertexBuffer._data, vertexBuffer.stride(), vertexTotal);
      vertexBuffer._data = null;
   }
   o._indexBuffer.upload(o._indexBuffer._data, indexTotal);
   o._indexBuffer._data = null;
}
MO.FE3rDynamicModel = function FE3rDynamicModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._renderables   = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._mergeMaxCount = MO.Class.register(o, new MO.AGetter('_mergeMaxCount'));
   o._mergeStride   = MO.Class.register(o, new MO.AGetter('_mergeStride'), 4);
   o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
   o._updateDate    = 0;
   o.construct      = MO.FE3rDynamicModel_construct;
   o.createMesh     = MO.FE3rDynamicModel_createMesh;
   o.pushRenderable = MO.FE3rDynamicModel_pushRenderable;
   o.build          = MO.FE3rDynamicModel_build;
   o.update         = MO.FE3rDynamicModel_update;
   return o;
}
MO.FE3rDynamicModel_construct = function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
}
MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
   var o = this;
   var m = MO.Class.create(MO.FE3rDynamicMesh);
   m._model = o;
   m.linkGraphicContext(o);
   o._meshes.push(m);
   return m;
}
MO.FE3rDynamicModel_pushRenderable = function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}
MO.FE3rDynamicModel_build = function FE3rDynamicModel_build(){
   var o = this;
   var renderables = o._renderables;
   var meshes = o._meshes;
   var count = renderables.count();
   if(count > 0){
      var mesh = o.createMesh();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(!mesh.mergeRenderable(renderable)){
            mesh = o.createMesh();
            if(!mesh.mergeRenderable(renderable)){
               throw new MO.TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   var mergeMax = 0;
   var count = meshes.count();
   for(var i = 0; i < count; i++){
      var mesh = meshes.at(i);
      mesh.build();
      mergeMax = Math.max(mergeMax, mesh.mergeCount());
   }
   o._mergeMaxCount = mergeMax;
}
MO.FE3rDynamicModel_update = function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = MO.Timer.current();
}
MO.FE3rGeometry = function FE3rGeometry(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._ready            = false;
   o._resource         = MO.Class.register(o, new AGetSet('_resource'));
   o._vertexCount      = MO.Class.register(o, new AGetter('_vertexCount'), 0);
   o._vertexBuffers    = MO.Class.register(o, new AGetter('_vertexBuffers'));
   o._indexBuffer      = MO.Class.register(o, new AGetter('_indexBuffer'));
   o._indexBuffers     = MO.Class.register(o, new AGetter('_indexBuffers'));
   o._resourceMaterial = MO.Class.register(o, new AGetter('_resourceMaterial'));
   o._material         = MO.Class.register(o, new AGetter('_material'));
   o._textures         = MO.Class.register(o, new AGetter('_textures'));
   o.construct         = MO.FE3rGeometry_construct;
   o.testReady         = MO.FE3rGeometry_testReady;
   o.findVertexBuffer  = MO.FE3rGeometry_findVertexBuffer;
   o.findTexture       = MO.FE3rGeometry_findTexture;
   o.loadResource      = MO.FE3rGeometry_loadResource;
   o.processLoad       = MO.FE3rGeometry_processLoad;
   return o;
}
MO.FE3rGeometry_construct = function FE3rGeometry_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new MO.TDictionary();
   o._indexBuffers = new MO.TObjects();
}
MO.FE3rGeometry_testReady = function FE3rGeometry_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._resource.testReady()){
         return false;
      }
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
   }
   return o._ready;
}
MO.FE3rGeometry_guid = function FE3rGeometry_guid(){
   return this._resource.guid();
}
MO.FE3rGeometry_findVertexBuffer = function FE3rGeometry_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
MO.FE3rGeometry_findTexture = function FE3rGeometry_findTexture(p){
   return this._textures.get(p);
}
MO.FE3rGeometry_loadResource = function FE3rGeometry_loadResource(resource){
   var o = this;
   var context = o._graphicContext;
   o._resource = resource;
   var streamResources = resource.streams();
   var streamCount = streamResources.count();
   for(var i = 0; i < streamCount; i++){
      var streamResource = streamResources.at(i);
      var code = streamResource.code();
      var dataCount = streamResource.dataCount();
      var data = streamResource.data();
      if((code == 'index16') || (code == 'index32')){
         var buffer = o._indexBuffer = context.createIndexBuffer(FE3rIndexBuffer);
         buffer._resource = streamResource;
         var dataCd = streamResource.elementDataCd();
         if(dataCd == MO.EDataType.Uint16){
            buffer.setStrideCd(MO.EG3dIndexStride.Uint16);
         }else if(dataCd == MO.EDataType.Uint32){
            buffer.setStrideCd(MO.EG3dIndexStride.Uint32);
         }else{
            throw new MO.TError(o, "Unknown data type.");
         }
         buffer.upload(data, 3 * dataCount);
         o._indexBuffers.push(buffer);
      }else{
         var buffer = context.createVertexBuffer(FE3rVertexBuffer);
         buffer.setCode(code);
         buffer._resource = streamResource;
         buffer._vertexCount = dataCount;
         var pixels = null;
         switch(code){
            case "position":
               pixels = new Float32Array(data);
               buffer.setFormatCd(EG3dAttributeFormat.Float3);
               o._vertexCount = dataCount;
               break;
            case "coord":
               pixels = new Float32Array(data);
               buffer.setFormatCd(EG3dAttributeFormat.Float2);
               break;
            case "color":
               pixels = new Uint8Array(data);
               buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
               break;
            default:
               throw new TError(o, "Unknown code");
         }
         buffer.upload(pixels, streamResource._dataStride, dataCount);
         o._vertexBuffers.set(code, buffer);
      }
   }
   o._ready = true;
}
MO.FE3rGeometry_processLoad = function FE3rGeometry_processLoad(){
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
MO.FE3rIndexBuffer = function FE3rIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FWglIndexBuffer, MO.MLinkerResource);
   o.dispose = MO.FE3rIndexBuffer_dispose;
   return o;
}
MO.FE3rIndexBuffer_dispose = function FE3rIndexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FWglIndexBuffer.dispose.call(o);
}
MO.FE3rInstanceMesh = function FE3rInstanceMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rMesh);
   o._merges         = null;
   o.construct       = MO.FE3rInstanceMesh_construct;
   o.mergeRenderable = MO.FE3rInstanceMesh_mergeRenderable;
   o.build           = MO.FE3rInstanceMesh_build;
   return o;
}
MO.FE3rInstanceMesh_construct = function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new MO.TObjects();
}
MO.FE3rInstanceMesh_mergeRenderable = function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}
MO.FE3rInstanceMesh_build = function FE3rInstanceMesh_build(){
}
MO.FE3rMaterial = function FE3rMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial, MO.MGraphicObject, MO.MLinkerResource);
   o._ready         = false;
   o._visible       = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._guid          = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._reference     = MO.Class.register(o, new MO.AGetter('_reference'));
   o.findBitmap     = MO.FE3rMaterial_findBitmap;
   o.testReady      = MO.FE3rMaterial_testReady;
   o.testVisible    = MO.FE3rMaterial_testVisible;
   o.loadResource   = MO.FE3rMaterial_loadResource;
   o.reloadResource = MO.FE3rMaterial_reloadResource;
   o.load           = MO.FE3rMaterial_load;
   return o;
}
MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
   return this._bitmaps.get(code);
}
MO.FE3rMaterial_testReady = function FE3rMaterial_testReady(){
   var o = this;
   if(!o._ready){
      var bitmaps = o._bitmaps;
      if(bitmaps){
         var count = bitmaps.count();
         for(var i = 0; i < count; i++){
            var bitmap = bitmaps.at(i);
            if(!bitmap.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FE3rMaterial_testVisible = function FE3rMaterial_testVisible(){
   var o = this;
   var visible = o._visible;
   if(visible && o._reference){
      visible = o._reference.testVisible();
   }
   return visible;
}
MO.FE3rMaterial_loadResource = function FE3rMaterial_loadResource(resource){
   var o = this;
   o._guid = resource.guid();
   o._resource = resource;
   o._info.calculate(resource.info());
   o._dirty = true;
}
MO.FE3rMaterial_reloadResource = function FE3rMaterial_reloadResource(){
   var o = this;
   o._info.calculate(o._resource.info());
   o._dirty = true;
}
MO.FE3rMaterial_load= function FE3rMaterial_load(){
   var o = this;
   var resource = o._resource;
   var bitmapResources = resource.bitmaps();
   if(bitmapResources){
      var bitmapConsole = MO.Console.find(MO.FE3rBitmapConsole)
      var bitmaps = o._bitmaps = new MO.TDictionary();
      var count = bitmapResources.count();
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapCode = bitmapResource.code();
         var bitmapPackResource = bitmapResource.bitmapPack();
         var packCode = bitmapPackResource.code();
         var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
         var bitmap = MO.Class.create(MO.FE3rBitmap);
         bitmap._pack  = bitmapPack;
         bitmap.loadResource(bitmapResource);
         bitmaps.set(bitmapCode, bitmap);
      }
   }
}
MO.FE3rMaterialConsole = function FE3rMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._materials = null;
   o.construct  = MO.FE3rMaterialConsole_construct;
   o.load       = MO.FE3rMaterialConsole_load;
   return o;
}
MO.FE3rMaterialConsole_construct = function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new MO.TDictionary();
}
MO.FE3rMaterialConsole_load = function FE3rMaterialConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Material guid is empty');
   }
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   var resource = MO.Console.find(MO.FE3sMaterialConsole).find(guid);
   material = MO.Class.create(MO.FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}
MO.FE3rMesh = function FE3rMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._ready            = false;
   o._resource         = MO.Class.register(o, new AGetSet('_resource'));
   o._vertexCount      = MO.Class.register(o, new AGetter('_vertexCount'), 0);
   o._vertexBuffers    = MO.Class.register(o, new AGetter('_vertexBuffers'));
   o._indexBuffer      = MO.Class.register(o, new AGetter('_indexBuffer'));
   o._resourceMaterial = MO.Class.register(o, new AGetter('_resourceMaterial'));
   o._material         = MO.Class.register(o, new AGetter('_material'));
   o._textures         = MO.Class.register(o, new AGetter('_textures'));
   o.construct         = MO.FE3rMesh_construct;
   o.testReady         = MO.FE3rMesh_testReady;
   o.findVertexBuffer  = MO.FE3rMesh_findVertexBuffer;
   o.findTexture       = MO.FE3rMesh_findTexture;
   o.loadResource      = MO.FE3rMesh_loadResource;
   o.processLoad       = MO.FE3rMesh_processLoad;
   return o;
}
MO.FE3rMesh_construct = function FE3rMesh_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
MO.FE3rMesh_testReady = function FE3rMesh_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._resource.testReady()){
         return false;
      }
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
   }
   return o._ready;
}
MO.FE3rMesh_guid = function FE3rMesh_guid(){
   return this._resource.guid();
}
MO.FE3rMesh_findVertexBuffer = function FE3rMesh_findVertexBuffer(p){
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
MO.FE3rMesh_findTexture = function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}
MO.FE3rMesh_loadResource = function FE3rMesh_loadResource(resource){
   var o = this;
   var context = o._graphicContext;
   o._resource = resource;
   var streamResources = resource.streams();
   var streamCount = streamResources.count();
   for(var i = 0; i < streamCount; i++){
      var streamResource = streamResources.get(i);
      var code = streamResource._code;
      var dataCount = streamResource._dataCount;
      var data = streamResource._data;
      if((code == 'index16') || (code == 'index32')){
         var buffer = o._indexBuffer = context.createIndexBuffer();
         buffer._resource = streamResource;
         var dataCd = streamResource.elementDataCd();
         if(dataCd == EDataType.Uint16){
            buffer._strideCd = EG3dIndexStride.Uint16;
         }else if(dataCd == EDataType.Uint32){
            buffer._strideCd = EG3dIndexStride.Uint32;
         }else{
            throw new TError(o, "Unknown data type.");
         }
         buffer.upload(data, 3 * dataCount);
      }else{
         var buffer = context.createVertexBuffer();
         buffer._name = code;
         buffer._resource = streamResource;
         buffer._vertexCount = dataCount;
         var pixels = null;
         switch(code){
            case "position":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               pixels = new Float32Array(data);
               buffer._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               pixels = new Uint8Array(data);
               buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError(o, "Unknown code");
         }
         buffer.upload(pixels, streamResource._dataStride, dataCount);
         o._vertexBuffers.push(buffer);
      }
   }
   o._ready = true;
}
MO.FE3rMesh_processLoad = function FE3rMesh_processLoad(){
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
MO.FE3rMeshAnimation = function FE3rMeshAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3rAnimation);
   o.process = MO.FE3rMeshAnimation_process;
   return o;
}
MO.FE3rMeshAnimation_process = function FE3rMeshAnimation_process(track){
   var o = this;
   if(!o._valid){
      return;
   }
   var tick = Math.abs(o._currentTick);
   var resource = track._resource;
   var playInfo = o._playInfo;
   resource.calculate(playInfo, tick);
   playInfo.update();
   var matrix = track._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(playInfo.matrix);
}
MO.FE3rMeshConsole = function FE3rMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._loadMeshs = null;
   o._meshs     = MO.Class.register(o, new AGetter('_meshs'));
   o._thread    = null;
   o._interval  = 200;
   o.onProcess  = MO.FE3rMeshConsole_onProcess;
   o.construct  = MO.FE3rMeshConsole_construct;
   o.findMesh   = MO.FE3rMeshConsole_findMesh;
   o.loadByGuid = MO.FE3rMeshConsole_loadByGuid;
   o.loadByCode = MO.FE3rMeshConsole_loadByCode;
   return o;
}
MO.FE3rMeshConsole_onProcess = function FE3rMeshConsole_onProcess(){
   var o = this;
   var s = o._loadMeshs;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
MO.FE3rMeshConsole_construct = function FE3rMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadMeshs = new MO.TLooper();
   o._meshs = new MO.TDictionary();
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}
MO.FE3rMeshConsole_findMesh = function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}
MO.FE3rMeshConsole_loadByGuid = function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh guid is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByGuid(pg);
   m = MO.Class.create(MO.FE3rMesh);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadMeshs.push(m);
   }
   return m;
}
MO.FE3rMeshConsole_loadByCode = function FE3rMeshConsole_loadByCode(pc, pg){
   var o = this;
   if(!MO.Class.isClass(pc, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Mesh code is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = MO.Console.find(MO.FE3sMeshConsole);
   var rm = rmc.loadByCode(pg);
   m = MO.Class.create(MO.FE3rMesh);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._meshs.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadMeshs.push(m);
   }
   return m;
}
MO.FE3rModel = function FE3rModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource            = MO.Class.register(o, new AGetSet('_resource'));
   o._meshes              = MO.Class.register(o, new AGetter('_meshes'));
   o._skeletons           = MO.Class.register(o, new AGetter('_skeletons'));
   o._dataReady           = false;
   o.findMeshByGuid       = MO.FE3rModel_findMeshByGuid;
   o.testReady            = MO.FE3rModel_testReady;
   o.loadResource         = MO.FE3rModel_loadResource;
   o.loadSkeletonResource = MO.FE3rModel_loadSkeletonResource;
   o.processLoad          = MO.FE3rModel_processLoad;
   o.dispose              = MO.FE3rModel_dispose;
   return o;
}
MO.FE3rModel_findMeshByGuid = function FE3rModel_findMeshByGuid(p){
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
MO.FE3rModel_testReady = function FE3rModel_testReady(){
   return this._dataReady;
}
MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
   var o = this;
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   var skinResources = resource.skins();
   if(skinResources){
      var skinCount = skinResources.count();
      for(var i = 0; i < skinCount; i++){
         var skinResource = skinResources.at(i);
         var skin = MO.Class.create(MO.FE3rSkin);
         skin.linkGraphicContext(o);
         skin.loadResource(skinResource)
         var meshGuid = skinResource.meshGuid();
         var mesh = modelConsole.findMesh(meshGuid);
         mesh.pushSkin(skin);
      }
   }
}
MO.FE3rModel_loadResource = function FE3rModel_loadResource(resource){
   var o = this;
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   var meshResources = resource.meshes();
   if(meshResources){
      var meshes = o._meshes = new MO.TObjects();
      var meshCount = meshResources.count();
      for(var i = 0; i < meshCount; i++){
         var meshResource = meshResources.valueAt(i);
         var mesh = MO.Class.create(MO.FE3rModelMesh);
         mesh.linkGraphicContext(o);
         mesh.loadResource(meshResource);
         meshes.push(mesh);
         modelConsole.meshs().set(mesh.guid(), mesh);
      }
   }
   var skeletonResources = resource.skeletons();
   if(skeletonResources){
      var skeletonCount = skeletonResources.count();
      for(var i = 0; i < skeletonCount; i++){
         var skeletonResource = skeletonResources.get(i);
         o.loadSkeletonResource(skeletonResource);
      }
   }
   o._dataReady = true;
}
MO.FE3rModel_processLoad = function FE3rModel_processLoad(){
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
MO.FE3rModel_dispose = function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   o._skeletons = MO.Lang.Object.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
MO.FE3rModelConsole = function FE3rModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._loadModels    = null;
   o._models        = MO.Class.register(o, new MO.AGetter('_models'));
   o._meshs         = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._dynamicMeshs  = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = MO.FE3rModelConsole_onProcess;
   o.construct      = MO.FE3rModelConsole_construct;
   o.findModel      = MO.FE3rModelConsole_findModel;
   o.findMesh       = MO.FE3rModelConsole_findMesh;
   o.load           = MO.FE3rModelConsole_load;
   o.loadMeshByGuid = MO.FE3rModelConsole_loadMeshByGuid;
   o.loadMeshByCode = MO.FE3rModelConsole_loadMeshByCode;
   o.merge          = MO.FE3rModelConsole_merge;
   return o;
}
MO.FE3rModelConsole_onProcess = function FE3rModelConsole_onProcess(){
   var o = this;
   var s = o._loadModels;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
MO.FE3rModelConsole_construct = function FE3rModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadModels = new MO.TLooper();
   o._models = new MO.TDictionary();
   o._meshs = new MO.TDictionary();
   o._dynamicMeshs = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FE3rModelConsole_findModel = function FE3rModelConsole_findModel(guid){
   return this._models.get(guid);
}
MO.FE3rModelConsole_findMesh = function FE3rModelConsole_findMesh(guid){
   return this._meshs.get(guid);
}
MO.FE3rModelConsole_load = function FE3rModelConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Model guid is empty');
   }
   var model = o._models.get(guid);
   if(model){
      return model;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   model = MO.Class.create(MO.FE3rModel);
   model.linkGraphicContext(context);
   model.setCode(guid);
   model.setResource(resource);
   o._models.set(guid, model);
   o._loadModels.push(model);
   return model;
}
MO.FE3rModelConsole_loadMeshByGuid = function FE3rModelConsole_loadMeshByGuid(context, pg){
   var o = this;
   if(!context){
      throw new MO.TError('Graphics context is empty');
   }
   if(!guid){
      throw new MO.TError('Model guid is empty');
   }
   var m = o._models.get(pg);
   if(m){
      return m;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   m = MO.Class.create(MO.FE3rModel);
   m.linkGraphicContext(pc);
   m.setCode(pg);
   m.setResource(rm);
   o._models.set(pg, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
MO.FE3rModelConsole_loadMeshByCode = function FE3rModelConsole_loadMeshByCode(context, pg){
   var o = this;
   if(!MO.Class.isClass(context, MO.MGraphicObject)){
      throw new MO.TError('Graphics context is empty');
   }
   if(MO.Lang.String.isEmpty(pg)){
      throw new MO.TError('Model guid is empty');
   }
   var model = o._models.get(pg);
   if(model){
      return model;
   }
   var resource = MO.Console.find(MO.FE3sModelConsole).load(guid);
   model = MO.Class.create(MO.FE3rModel);
   model.linkGraphicContext(pc);
   model.setCode(pg);
   model.setResource(resource);
   o._models.set(pg, model);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
MO.FE3rModelConsole_merge = function FE3rModelConsole_merge(effect, region, offset, count){
   var o = this;
   var flag = 'merge';
   var renderables = region.renderables();
   for(var i = 0; i < count; i++){
      var renderable = renderables.getAt(offset + i);
      flag += '|' + renderable.hashCode();
   }
   var model = o._dynamicMeshs.get(flag);
   if(!model){
      model = MO.Class.create(MO.FE3rDynamicModel);
      model.linkGraphicContext(region);
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         model.pushRenderable(renderable);
      }
      model.build();
      o._dynamicMeshs.set(flag, model);
      MO.Logger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
   }
   model.update();
   return model;
}
MO.FE3rModelMesh = function FE3rModelMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rGeometry);
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = MO.Class.register(o, new AGetter('_skins'));
   o._boneIds          = MO.Class.register(o, new AGetter('_boneIds'));
   o.construct         = MO.FE3rModelMesh_construct;
   o.testReady         = MO.FE3rModelMesh_testReady;
   o.guid              = MO.FE3rModelMesh_guid;
   o.pushSkin          = MO.FE3rModelMesh_pushSkin;
   return o;
}
MO.FE3rModelMesh_construct = function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rGeometry.construct.call(o);
}
MO.FE3rModelMesh_testReady = function FE3rModelMesh_testReady(){
   var o = this;
   if(!o._ready){
      var textures = o._textures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            if(!texture.testReady()){
               return false;
            }
         }
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FE3rModelMesh_guid = function FE3rModelMesh_guid(){
   return this._resource.guid();
}
MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
   var o = this;
   var skins = o._skins;
   if(!skins){
      skins = o._skins = new MO.TObjects();
   }
   skins.push(skin);
}
MO.FE3rObject = function FE3rObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FE3rPipeline = function FE3rPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o.construct        = MO.FE3rPipeline_construct;
   o.findVertexBuffer = MO.FE3rPipeline_findVertexBuffer;
   o.loadResource     = MO.FE3rPipeline_loadResource;
   return o;
}
MO.FE3rPipeline_construct = function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new MO.TObjects();
}
MO.FE3rPipeline_findVertexBuffer = function FE3rPipeline_findVertexBuffer(p){
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
MO.FE3rPipeline_loadResource = function FE3rPipeline_loadResource(p){
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
MO.FE3rSkeleton = function FE3rSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject, MO.MLinkerResource);
   o._bones       = MO.Class.register(o, new AGetter('_bones'));
   o._skins       = MO.Class.register(o, new AGetter('_skins'));
   o.loadResource = MO.FE3rSkeleton_loadResource;
   return o;
}
MO.FE3rSkeleton_loadResource = function FE3rSkeleton_loadResource(resource){
   var o = this;
   o._resource = resource;
   var boneResources = resource._bones;
   var count = boneResources.count();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var boneResource = boneResources.at(i);
         var bone = MO.Class.create(MO.FE3rBone);
         bone.loadResource(boneResource);
         bones.push(bone);
      }
   }
}
MO.FE3rSkeletonAnimation = function FE3rSkeletonAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3rAnimation);
   o.process = MO.FE3rSkeletonAnimation_process;
   return o;
}
MO.FE3rSkeletonAnimation_process = function FE3rSkeletonAnimation_process(skeleton){
   var o = this;
   if(!o._valid){
      return;
   }
   var tick = Math.abs(o._currentTick);
   var bones = skeleton.bones();
   var count = bones.count();
   for(var i = 0; i < count; i++){
      var bone = bones.at(i);
      bone.update(o._playInfo, tick);
   }
}
MO.FE3rSkin = function FE3rSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o._streams     = MO.Class.register(o, new AGetter('_streams'));
   o.loadResource = MO.FE3rSkin_loadResource;
   return o;
}
MO.FE3rSkin_loadResource = function FE3rSkin_loadResource(resource){
   var o = this;
   o._resource = resource;
   var streamResources = resource.streams();
   if(streamResources){
      var count = streamResources.count();
      if(count > 0){
         var streams = o._streams = new MO.TObjects();
         for(var i = 0; i < count; i++){
            var streamResource = streamResources.at(i);
            var stream = MO.Class.create(MO.FE3rStream);
            stream.linkGraphicContext(o);
            stream.loadResource(streamResource);
            streams.push(stream);
         }
      }
   }
}
MO.FE3rStream = function FE3rStream(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   o._resource    = MO.Class.register(o, new MO.AGetter('_resource'));
   o._buffer      = MO.Class.register(o, new MO.AGetter('_buffer'));
   o.loadResource = MO.FE3rStream_loadResource;
   return o;
}
MO.FE3rStream_loadResource = function FE3rStream_loadResource(resource){
   var o = this;
   var code = resource.code();
   var dataCount = resource._dataCount;
   o._resource = resource;
   o._vertexCount = dataCount;
   var buffer = o._buffer = o._graphicContext.createVertexBuffer(FE3rVertexBuffer);
   buffer.setCode(code);
   buffer.setResource(resource);
   switch(code){
      case "bone_index":
         buffer.setFormatCd(EG3dAttributeFormat.Byte4);
         break;
      case "bone_weight":
         buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
   buffer.upload(resource._data, resource._dataStride, dataCount);
}
MO.FE3rTexture = function FE3rTexture(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._resource    = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o._ready       = false;
   o._dataReady   = false;
   o.construct    = MO.FE3rTexture_construct;
   o.testReady    = MO.FE3rTexture_testReady;
   o.loadBitmap   = MO.FE3rTexture_loadBitmap;
   o.loadResource = MO.FE3rTexture_loadResource;
   o.load         = MO.FE3rTexture_load;
   o.processLoad  = MO.FE3rTexture_processLoad;
   o.dispose      = MO.FE3rTexture_dispose;
   return o;
}
MO.FE3rTexture_construct = function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3rTexture_testReady = function FE3rTexture_testReady(){
   return this._ready;
}
MO.FE3rTexture_loadBitmap = function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = MO.Class.create(MO.FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}
MO.FE3rTexture_loadResource = function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new MO.TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = MO.Class.create(MO.FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = MO.Class.create(MO.FE3rTextureBitmapCubePack);
         }else{
            throw new MO.TError(o, 'Load resource failure.');
         }
         bp.linkGraphicContext(o);
         bp.loadResource(rbp);
         o._bitmapPacks.set(rbp.code(), bp);
      }
   }
   o._dataReady = true;
}
MO.FE3rTexture_load = function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.valueAt(i);
      var b = o.loadBitmap(rb.guid());
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new MO.TError('Link pack is not eists.');
      }
      b.load(bp);
   }
   o._ready = true;
}
MO.FE3rTexture_processLoad = function FE3rTexture_processLoad(){
   var o = this;
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
   }else{
      var s = o._bitmapPacks;
      for(var i = s.count() - 1; i >= 0; i--){
         var b = s.valueAt(i);
         if(!b.testReady()){
            return false;
         }
      }
      o.load();
   }
   return o._ready;
}
MO.FE3rTexture_dispose = function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = MO.Lang.Object.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
MO.FE3rTextureBitmap = function FE3rTextureBitmap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._ready      = false;
   o._bitmapPack = null;
   o.construct   = MO.FE3rTextureBitmap_construct;
   o.texture     = MO.FE3rTextureBitmap_texture;
   o.testReady   = MO.FE3rTextureBitmap_testReady;
   o.load        = MO.FE3rTextureBitmap_load;
   o.dispose     = MO.FE3rTextureBitmap_dispose;
   return o;
}
MO.FE3rTextureBitmap_construct = function FE3rTextureBitmap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FE3rTextureBitmap_texture = function FE3rTextureBitmap_texture(){
   return this._bitmapPack.texture();
}
MO.FE3rTextureBitmap_testReady = function FE3rTextureBitmap_testReady(){
   return this._ready;
}
MO.FE3rTextureBitmap_load = function FE3rTextureBitmap_load(name){
   var o = this;
   o._bitmapPack = name;
   o._ready = true;
}
MO.FE3rTextureBitmap_dispose = function FE3rTextureBitmap_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._bitmapPack = null;
   o.__base.FObject.dispose.call(o);
}
MO.FE3rTextureBitmapCubePack = function FE3rTextureBitmapCubePack(o){
   o = MO.Class.inherits(this, o, MO.FE3rTextureBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = MO.FE3rTextureBitmapCubePack_onLoad;
   o.construct    = MO.FE3rTextureBitmapCubePack_construct;
   o.loadResource = MO.FE3rTextureBitmapCubePack_loadResource;
   o.dispose      = MO.FE3rTextureBitmapCubePack_dispose;
   return o;
}
MO.FE3rTextureBitmapCubePack_onLoad = function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   var capability = MO.Window.Browser.capability();
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   if(capability.blobCreate){
      for(var i = 0; i < 6; i++){
         var m = is[i];
         window.URL.revokeObjectURL(m.url());
         is[i] = MO.Lang.Object.dispose(m);
      }
   }
   o._images = MO.Lang.Object.dispose(o._images);
   o._dataReady = true;
}
MO.FE3rTextureBitmapCubePack_construct = function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
MO.FE3rTextureBitmapCubePack_loadResource = function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   var texture = p._texture;
   var capability = MO.Window.Browser.capability();
   var d = p.data();
   var t = p._formatName;
   o._images = new MO.TObjects();
   for(var i = 0; i < 6; i++){
      var g = o._images[i] = MO.Class.create(FImage);
      g._index = i;
      g.setOptionAlpha(false);
      if(capability.blobCreate){
         var blob = new Blob([d[i]], {'type' : 'image/' + t});
         var url = window.URL.createObjectURL(blob);
         g.loadUrl(url);
      }else{
         var url = MO.Window.Browser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         g.loadUrl(url);
      }
      g.addLoadListener(o, o.onLoad);
   }
}
MO.FE3rTextureBitmapCubePack_dispose = function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
MO.FE3rTextureBitmapFlatPack = function FE3rTextureBitmapFlatPack(o){
   o = MO.Class.inherits(this, o, MO.FE3rTextureBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = MO.FE3rTextureBitmapFlatPack_onLoad;
   o.construct    = MO.FE3rTextureBitmapFlatPack_construct;
   o.loadResource = MO.FE3rTextureBitmapFlatPack_loadResource;
   o.dispose      = MO.FE3rTextureBitmapFlatPack_dispose;
   return o;
}
MO.FE3rTextureBitmapFlatPack_onLoad = function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = MO.Lang.Object.dispose(o._image);
   o._dataReady = true;
}
MO.FE3rTextureBitmapFlatPack_construct = function FE3rTextureBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
MO.FE3rTextureBitmapFlatPack_loadResource = function FE3rTextureBitmapFlatPack_loadResource(p){
   var o = this;
   o._resource = p;
   var rt = p._texture;
   var c = p.code();
   var g = o._image = MO.Console.find(MO.FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
   g.addLoadListener(o, o.onLoad);
}
MO.FE3rTextureBitmapFlatPack_dispose = function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
MO.FE3rTextureBitmapPack = function FE3rTextureBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = MO.Class.register(o, new AGetter('_texture'));
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = MO.Method.virtual(o, 'onLoad');
   o.construct    = MO.FE3rTextureBitmapPack_construct;
   o.testReady    = MO.FE3rTextureBitmapPack_testReady;
   o.loadResource = MO.Method.virtual(o, 'loadResource');
   o.dispose      = MO.FE3rTextureBitmapPack_dispose;
   return o;
}
MO.FE3rTextureBitmapPack_construct = function FE3rTextureBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FE3rTextureBitmapPack_testReady = function FE3rTextureBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
MO.FE3rTextureBitmapPack_dispose = function FE3rTextureBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
MO.FE3rTextureConsole = function FE3rTextureConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._loadTextures = null;
   o._bitmaps      = MO.Class.register(o, new AGetter('_bitmaps'));
   o._textures     = MO.Class.register(o, new AGetter('_textures'));
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = MO.FE3rTextureConsole_onProcess;
   o.construct     = MO.FE3rTextureConsole_construct;
   o.load          = MO.FE3rTextureConsole_load;
   o.loadBitmap    = MO.FE3rTextureConsole_loadBitmap;
   return o;
}
MO.FE3rTextureConsole_onProcess = function FE3rTextureConsole_onProcess(){
   var o = this;
   var s = o._loadTextures;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
MO.FE3rTextureConsole_construct = function FE3rTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadTextures = new MO.TLooper();
   o._bitmaps = new MO.TDictionary();
   o._textures = new MO.TDictionary();
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
}
MO.FE3rTextureConsole_load = function FE3rTextureConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var texture = o._textures.get(flag);
   if(texture){
      return texture;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Window.Class.create(MO.FE3rTextureCube);
   }else{
      bitmap = MO.Window.Class.create(MO.FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
}
MO.FE3rTextureConsole_load2 = function FE3rTextureConsole_load2(pc, pt){
   var o = this;
   var s = o._textures;
   var t = s.get(pt);
   if(t){
      return t;
   }
   var rc = MO.Console.find(MO.FE3sTextureConsole);
   var r = rc.load(pt);
   t = MO.Class.create(MO.FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   s.set(pt, t);
   o._loadTextures.push(t);
   return t;
}
MO.FE3rTextureConsole_loadBitmap = function FE3rTextureConsole_loadBitmap(pc, pt, pb){
   var o = this;
   var b = o._bitmaps.get(pb);
   if(b){
      return b;
   }
   var t = o.load(pc, pt);
   return t.loadBitmap(pb);
}
MO.FE3rTrack = function FE3rTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix      = MO.Class.register(o, new AGetter('_matrix'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   o.construct    = MO.FE3rTrack_construct;
   o.loadResource = MO.FE3rTrack_loadResource;
   o.dispose      = MO.FE3rTrack_dispose;
   return o;
}
MO.FE3rTrack_construct = function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}
MO.FE3rTrack_loadResource = function FE3rTrack_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
MO.FE3rTrack_dispose = function FE3rTrack_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
MO.FE3rVertexBuffer = function FE3rVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FWglVertexBuffer, MO.MLinkerResource);
   o.dispose = MO.FE3rVertexBuffer_dispose;
   return o;
}
MO.FE3rVertexBuffer_dispose = function FE3rVertexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FWglVertexBuffer.dispose.call(o);
}
