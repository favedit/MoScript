function SE3rPlayInfo(o){
   if(!o){o = this;}
   o.tick         = 0;
   o.playRate     = 1.0;
   o.beginIndex   = 0;
   o.endIndex     = 0;
   o.frameCount   = 0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   o.update       = SE3rPlayInfo_update;
   return o;
}
function SE3rPlayInfo_update(){
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
function FE3rAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FE3rAnimation_construct;
   o.findTrack    = FE3rAnimation_findTrack;
   o.tracks       = FE3rAnimation_tracks;
   o.resource     = FE3rAnimation_resource;
   o.loadResource = FE3rAnimation_loadResource;
   o.record       = FE3rAnimation_record;
   o.process      = RMethod.virtual(o, 'process');
   o.dispose      = FE3rAnimation_dispose;
   return o;
}
function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new SE3rPlayInfo();
}
function FE3rAnimation_findTrack(p){
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
function FE3rAnimation_tracks(){
   return this._tracks;
}
function FE3rAnimation_resource(){
   return this._resource;
}
function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   o._resource = resource;
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = RClass.create(FE3rTrack);
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
function FE3rAnimation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
}
function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rBitmap(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._pack        = null;
   o.construct    = FE3rBitmap_construct;
   o.testReady    = FE3rBitmap_testReady;
   o.texture      = FE3rBitmap_texture;
   o.loadResource = FE3rBitmap_loadResource;
   o.dispose      = FE3rBitmap_dispose;
   return o;
}
function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
}
function FE3rBitmap_testReady(){
   return this._pack.testReady();
}
function FE3rBitmap_texture(){
   return this._pack.texture();
}
function FE3rBitmap_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._guid = resource.guid();
   o._code = resource.code();
}
function FE3rBitmap_dispose(){
   var o = this;
   o.__base.FE3rObject.dispose.call(o);
}
function FE3rBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.resource.material.wv'
   o.construct = FE3rBitmapConsole_construct;
   o.bitmaps   = FE3rBitmapConsole_bitmaps;
   o.load      = FE3rBitmapConsole_load;
   o.loadUrl   = FE3rBitmapConsole_loadUrl;
   return o;
}
function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rBitmapConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rBitmapConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   RLogger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = RClass.create(FE3rBitmapCubePack);
   }else{
      bitmap = RClass.create(FE3rBitmapFlatPack);
   }
   bitmap.linkGraphicContext(context);
   bitmap.loadUrl(url);
   o._bitmaps.set(flag, bitmap);
   return bitmap;
}
function FE3rBitmapConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = RBrowser.contentPath(url);
   RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = RClass.create(FE3rBitmap);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
function FE3rBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = FE3rBitmapCubePack_onLoad;
   o.construct    = FE3rBitmapCubePack_construct;
   o.loadUrl      = FE3rBitmapCubePack_loadUrl;
   o.dispose      = FE3rBitmapCubePack_dispose;
   return o;
}
function FE3rBitmapCubePack_onLoad(p){
   var o = this;
   var context = o._graphicContext;
   var images = o._images;
   var capability = RBrowser.capability();
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
   o._images = RObject.dispose(o._images);
   o._dataReady = true;
   o._ready = true;
}
function FE3rBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
function FE3rBitmapCubePack_loadUrl(url){
   var o = this;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var image = RClass.create(FImage);
      image._index = i;
      image.setOptionAlpha(false);
      image.loadUrl(url + "&index=" + i);
      image.addLoadListener(o, o.onLoad);
      o._images.push(image);
   }
}
function FE3rBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
function FE3rBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = FE3rBitmapFlatPack_onLoad;
   o.construct    = FE3rBitmapFlatPack_construct;
   o.loadUrl      = FE3rBitmapFlatPack_loadUrl;
   o.dispose      = FE3rBitmapFlatPack_dispose;
   return o;
}
function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   var context = o._graphicContext;
   var texture = o._texture = context.createFlatTexture();
   texture.upload(o._image);
   texture.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._dataReady = true;
}
function FE3rBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}
function FE3rBitmapFlatPack_loadUrl(url){
   var o = this;
   var image = o._image = RClass.create(FImage);
   image.addLoadListener(o, o.onLoad);
   image.loadUrl(url);
}
function FE3rBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
function FE3rBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   o.construct    = FE3rBitmapPack_construct;
   o.texture      = FE3rBitmapPack_texture;
   o.testReady    = FE3rBitmapPack_testReady;
   o.loadUrl      = RMethod.virtual(o, 'loadUrl');
   o.dispose      = FE3rBitmapPack_dispose;
   return o;
}
function FE3rBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rBitmapPack_texture(){
   return this._texture;
}
function FE3rBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
function FE3rBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
function FE3rBone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   o.construct      = FE3rBone_construct;
   o.matrix         = FE3rBone_matrix;
   o.trackResource  = FE3rBone_trackResource;
   o.loadResource   = FE3rBone_loadResource;
   o.update         = FE3rBone_update;
   o.dispose        = FE3rBone_dispose;
   return o;
}
function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rBone_matrix(){
   return this._matrix;
}
function FE3rBone_trackResource(){
   return this._trackResource;
}
function FE3rBone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}
function FE3rBone_update(info, tick){
   var o = this;
   var resource = o._trackResource;
   resource.calculate(info, tick);
   info.update();
   var matrix = o._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(info.matrix);
}
function FE3rBone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FE3rDynamicMesh(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._model            = null;
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = FE3rDynamicMesh_construct;
   o.mergeCount        = FE3rDynamicMesh_mergeCount;
   o.mergeMaxCount     = FE3rDynamicMesh_mergeMaxCount;
   o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = FE3rDynamicMesh_build;
   return o;
}
function FE3rDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new TObjects();
}
function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
function FE3rDynamicMesh_mergeMaxCount(){
   return this._model._mergeMaxCount;
}
function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}
function FE3rDynamicMesh_syncVertexBuffer(renderableBuffer){
   var o = this;
   var resource = renderableBuffer.resource();
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
         case EG3dAttributeFormat.Float1:
            buffer._data = new Float32Array(1 * vertexTotal);
            break;
         case EG3dAttributeFormat.Float2:
            buffer._data = new Float32Array(2 * vertexTotal);
            break;
         case EG3dAttributeFormat.Float3:
            buffer._data = new Float32Array(3 * vertexTotal);
            break;
         case EG3dAttributeFormat.Float4:
            buffer._data = new Float32Array(4 * vertexTotal);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            buffer._data = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new TError("Unknown code");
      }
      o._vertexBuffers.set(code, buffer);
   }
   return buffer;
}
function FE3rDynamicMesh_mergeRenderable(p){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var vc = p.vertexCount();
   var ic = p.indexBuffer().count();
   var mc = cp.mergeCount;
   if(o._mergeRenderables.count() >= mc){
      return false;
   }
   var vt = o._vertexTotal + vc;
   if(cp.optionIndex32){
      if(vt > RInteger.MAX_UINT32){
         return false;
      }
   }else{
      if(vt > RInteger.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vc;
   o._indexTotal += ic;
   o._mergeRenderables.push(p);
   return true;
}
function FE3rDynamicMesh_mergeVertexBuffer(r, bc, b, rs){
   var o = this;
   var vp = o._vertexPosition;
   var vd = b._data;
   var c = rs._dataCount;
   switch(bc){
      case 'position':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 3 * vp, d, 0, 3 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 2 * vp, d, 0, 2 * c);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(rs._data);
         RByte.copy(vd, 4 * vp, d, 0, 4 * c);
         break;
      default:
         throw new TError("Unknown code");
   }
}
function FE3rDynamicMesh_mergeIndexBuffer(ir){
   var o = this;
   var vp = o._vertexPosition;
   var ip = o._indexPosition;
   var id = o._indexBuffer._data;
   var rd = new Uint16Array(ir._data);
   var rc = 3 * ir._dataCount;
   for(var i = 0; i < rc; i++){
      id[ip++] = vp + rd[i]
   }
}
function FE3rDynamicMesh_build(){
   var o = this;
   var gc = o._graphicContext;
   var gp = gc.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(EG3dAttributeFormat.Float1);
   var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
   o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
   var indexBuffer = o._indexBuffer = gc.createIndexBuffer();
   if(gp.optionIndex32){
      indexBuffer.setStrideCd(EG3dIndexStride.Uint32);
      indexBuffer._data = new Uint32Array(indexTotal);
   }else{
      indexBuffer.setSstrideCd(EG3dIndexStride.Uint16);
      indexBuffer._data = new Uint16Array(indexTotal);
   }
   indexBuffer._count = indexTotal;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      var vc = r.vertexCount();
      var vertexBuffers = r.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var vbi = 0; vbi < vertexBufferCount; vbi++){
         var vb = vertexBuffers.at(vbi);
         var vbr = vb._resource;
         var vbrc = vbr._code
         var vertexBuffer = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(r, vbrc, vertexBuffer, vbr);
      }
      RFloat.fill(vdi, o._vertexPosition, vc, i);
      var ib = r.indexBuffer();
      var ic = ib.count();
      var ir = ib._resource;
      o.mergeIndexBuffer(ir);
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
function FE3rDynamicModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._renderables      = null;
   o._mergeMaxCount    = 0;
   o._meshes           = null;
   o._updateDate       = 0;
   o.construct         = FE3rDynamicModel_construct;
   o.createMesh        = FE3rDynamicModel_createMesh;
   o.renderables       = FE3rDynamicModel_renderables;
   o.meshes            = FE3rDynamicModel_meshes;
   o.pushRenderable    = FE3rDynamicModel_pushRenderable;
   o.build             = FE3rDynamicModel_build;
   o.update            = FE3rDynamicModel_update;
   return o;
}
function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new TObjects();
   o._meshes = new TObjects();
}
function FE3rDynamicModel_createMesh(){
   var o = this;
   var m = RClass.create(FE3rDynamicMesh);
   m._model = o;
   m.linkGraphicContext(o);
   o._meshes.push(m);
   return m;
}
function FE3rDynamicModel_renderables(){
   return this._renderables;
}
function FE3rDynamicModel_meshes(){
   return this._meshes;
}
function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}
function FE3rDynamicModel_build(){
   var o = this;
   var rs = o._renderables;
   var ms = o._meshes;
   var rc = rs.count();
   if(rc > 0){
      var mr = o.createMesh();
      for(var i = 0; i < rc; i++){
         var r = rs.getAt(i);
         if(!mr.mergeRenderable(r)){
            mr = o.createMesh();
            if(!mr.mergeRenderable(r)){
               throw new TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   var mx = 0;
   var mc = ms.count();
   for(var i = 0; i < mc; i++){
      var m = ms.getAt(i);
      m.build();
      mx = Math.max(mx, m.mergeCount());
   }
   o._mergeMaxCount = mx;
}
function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = RTimer.current();
}
function FE3rGeometry(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._indexBuffers     = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._textures         = null;
   o.construct         = FE3rGeometry_construct;
   o.testReady         = FE3rGeometry_testReady;
   o.resource          = FE3rGeometry_resource;
   o.setResource       = FE3rGeometry_setResource;
   o.vertexCount       = FE3rGeometry_vertexCount;
   o.findVertexBuffer  = FE3rGeometry_findVertexBuffer;
   o.vertexBuffers     = FE3rGeometry_vertexBuffers;
   o.indexBuffer       = FE3rGeometry_indexBuffer;
   o.indexBuffers      = FE3rGeometry_indexBuffers;
   o.material          = FE3rGeometry_material;
   o.findTexture       = FE3rGeometry_findTexture;
   o.textures          = FE3rGeometry_textures;
   o.resource          = FE3rGeometry_resource;
   o.loadResource      = FE3rGeometry_loadResource;
   o.processLoad       = FE3rGeometry_processLoad;
   return o;
}
function FE3rGeometry_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TDictionary();
   o._indexBuffers = new TObjects();
}
function FE3rGeometry_testReady(){
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
function FE3rGeometry_guid(){
   return this._resource.guid();
}
function FE3rGeometry_resource(){
   return this._resource;
}
function FE3rGeometry_setResource(p){
   this._resource = p;
}
function FE3rGeometry_vertexCount(){
   return this._vertexCount;
}
function FE3rGeometry_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
function FE3rGeometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3rGeometry_indexBuffer(){
   return this._indexBuffer;
}
function FE3rGeometry_indexBuffers(){
   return this._indexBuffers;
}
function FE3rGeometry_material(){
   return this._material;
}
function FE3rGeometry_findTexture(p){
   return this._textures.get(p);
}
function FE3rGeometry_textures(){
   return this._textures;
}
function FE3rGeometry_resource(){
   return this._resource;
}
function FE3rGeometry_loadResource(resource){
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
         var buffer = o._indexBuffer = context.createIndexBuffer();
         buffer._resource = streamResource;
         var dataCd = streamResource.elementDataCd();
         if(dataCd == EDataType.Uint16){
            buffer.setStrideCd(EG3dIndexStride.Uint16);
         }else if(dataCd == EDataType.Uint32){
            buffer.setStrideCd(EG3dIndexStride.Uint32);
         }else{
            throw new TError(o, "Unknown data type.");
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
function FE3rGeometry_processLoad(){
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
function FE3rInstanceMesh(o){
   o = RClass.inherits(this, o, FE3rMesh);
   o._merges         = null;
   o.construct       = FE3rInstanceMesh_construct;
   o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
   o.build           = FE3rInstanceMesh_build;
   return o;
}
function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new TObjects();
}
function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}
function FE3rInstanceMesh_build(){
}
function FE3rMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial, MAttributeGuid, MGraphicObject, MLinkerResource);
   o._ready         = false;
   o._visible       = true;
   o._bitmaps       = null;
   o._reference     = null;
   o.visible        = FE3rMaterial_visible;
   o.setVisible     = FE3rMaterial_setVisible;
   o.findBitmap     = FE3rMaterial_findBitmap;
   o.bitmaps        = FE3rMaterial_bitmaps;
   o.reference      = FE3rMaterial_reference;
   o.testReady      = FE3rMaterial_testReady;
   o.testVisible    = FE3rMaterial_testVisible;
   o.loadResource   = FE3rMaterial_loadResource;
   o.reloadResource = FE3rMaterial_reloadResource;
   o.load           = FE3rMaterial_load;
   return o;
}
function FE3rMaterial_visible(){
   return this._visible;
}
function FE3rMaterial_setVisible(visible){
   this._visible = visible;
}
function FE3rMaterial_findBitmap(code){
   return this._bitmaps.get(code);
}
function FE3rMaterial_bitmaps(){
   return this._bitmaps;
}
function FE3rMaterial_reference(){
   return this._reference;
}
function FE3rMaterial_testReady(){
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
function FE3rMaterial_testVisible(){
   var o = this;
   var visible = o._visible;
   if(visible && o._reference){
      visible = o._reference.testVisible();
   }
   return visible;
}
function FE3rMaterial_loadResource(resource){
   var o = this;
   o._guid = resource.guid();
   o._resource = resource;
   o._info.calculate(resource.info());
   o._dirty = true;
}
function FE3rMaterial_reloadResource(){
   var o = this;
   o._info.calculate(o._resource.info());
   o._dirty = true;
}
function FE3rMaterial_load(){
   var o = this;
   var resource = o._resource;
   var bitmapResources = resource.bitmaps();
   if(bitmapResources){
      var bitmapConsole = RConsole.find(FE3rBitmapConsole)
      var bitmaps = o._bitmaps = new TDictionary();
      var count = bitmapResources.count();
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapCode = bitmapResource.code();
         var bitmapPackResource = bitmapResource.bitmapPack();
         var packCode = bitmapPackResource.code();
         var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
         var bitmap = RClass.create(FE3rBitmap);
         bitmap._pack  = bitmapPack;
         bitmap.loadResource(bitmapResource);
         bitmaps.set(bitmapCode, bitmap);
      }
   }
}
function FE3rMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._materials = null;
   o.construct  = FE3rMaterialConsole_construct;
   o.load       = FE3rMaterialConsole_load;
   return o;
}
function FE3rMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new TDictionary();
}
function FE3rMaterialConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Material guid is empty');
   }
   var material = o._materials.get(guid);
   if(material){
      return material;
   }
   var resource = RConsole.find(FE3sMaterialConsole).find(guid);
   material = RClass.create(FE3rMaterial);
   material.linkGraphicContext(context);
   material.loadResource(resource);
   material.load();
   o._materials.set(guid, material);
   return material;
}
function FE3rMesh(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._textures         = null;
   o.construct         = FE3rMesh_construct;
   o.testReady         = FE3rMesh_testReady;
   o.resource          = FE3rMesh_resource;
   o.setResource       = FE3rMesh_setResource;
   o.vertexCount       = FE3rMesh_vertexCount;
   o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rMesh_vertexBuffers;
   o.indexBuffer       = FE3rMesh_indexBuffer;
   o.material          = FE3rMesh_material;
   o.findTexture       = FE3rMesh_findTexture;
   o.textures          = FE3rMesh_textures;
   o.resource          = FE3rMesh_resource;
   o.loadResource      = FE3rMesh_loadResource;
   o.processLoad       = FE3rMesh_processLoad;
   return o;
}
function FE3rMesh_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rMesh_testReady(){
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
function FE3rMesh_guid(){
   return this._resource.guid();
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_setResource(p){
   this._resource = p;
}
function FE3rMesh_vertexCount(){
   return this._vertexCount;
}
function FE3rMesh_findVertexBuffer(p){
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
function FE3rMesh_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3rMesh_indexBuffer(){
   return this._indexBuffer;
}
function FE3rMesh_material(){
   return this._material;
}
function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}
function FE3rMesh_textures(){
   return this._textures;
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_loadResource(resource){
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
function FE3rMesh_processLoad(){
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
function FE3rMeshAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rMeshAnimation_process;
   return o;
}
function FE3rMeshAnimation_process(track){
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
function FE3rMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._loadMeshs = null;
   o._meshs     = null;
   o._thread    = null;
   o._interval  = 200;
   o.onProcess  = FE3rMeshConsole_onProcess;
   o.construct  = FE3rMeshConsole_construct;
   o.findMesh   = FE3rMeshConsole_findMesh;
   o.meshs      = FE3rMeshConsole_meshs;
   o.loadByGuid = FE3rMeshConsole_loadByGuid;
   o.loadByCode = FE3rMeshConsole_loadByCode;
   return o;
}
function FE3rMeshConsole_onProcess(){
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
function FE3rMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadMeshs = new TLooper();
   o._meshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rMeshConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3rMeshConsole_meshs(){
   return this._meshs;
}
function FE3rMeshConsole_loadByGuid(pc, pg){
   var o = this;
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh guid is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FE3sMeshConsole);
   var rm = rmc.loadByGuid(pg);
   m = RClass.create(FE3rMesh);
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
function FE3rMeshConsole_loadByCode(pc, pg){
   var o = this;
   if(!RClass.isClass(pc, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Mesh code is empty');
   }
   var m = o._meshs.get(pg);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FE3sMeshConsole);
   var rm = rmc.loadByCode(pg);
   m = RClass.create(FE3rMesh);
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
function FE3rModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource            = null;
   o._meshes              = null;
   o._skeletons           = null;
   o._dataReady           = false;
   o.findMeshByGuid       = FE3rModel_findMeshByGuid;
   o.geometrys            = FE3rModel_geometrys;
   o.resource             = FE3rModel_resource;
   o.setResource          = FE3rModel_setResource;
   o.testReady            = FE3rModel_testReady;
   o.loadResource         = FE3rModel_loadResource;
   o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
   o.processLoad          = FE3rModel_processLoad;
   o.dispose              = FE3rModel_dispose;
   return o;
}
function FE3rModel_findMeshByGuid(p){
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
function FE3rModel_geometrys(){
   return this._meshes;
}
function FE3rModel_resource(){
   return this._resource;
}
function FE3rModel_setResource(p){
   this._resource = p;
}
function FE3rModel_testReady(){
   return this._dataReady;
}
function FE3rModel_loadSkeletonResource(resource){
   var o = this;
   var modelConsole = RConsole.find(FE3rModelConsole);
   var skinResources = resource.skins();
   if(skinResources){
      var skinCount = skinResources.count();
      for(var i = 0; i < skinCount; i++){
         var skinResource = skinResources.at(i);
         var skin = RClass.create(FE3rSkin);
         skin.linkGraphicContext(o);
         skin.loadResource(skinResource)
         var meshGuid = skinResource.meshGuid();
         var mesh = modelConsole.findMesh(meshGuid);
         mesh.pushSkin(skin);
      }
   }
}
function FE3rModel_loadResource(resource){
   var o = this;
   var modelConsole = RConsole.find(FE3rModelConsole);
   var meshResources = resource.meshes();
   if(meshResources){
      var meshes = o._meshes = new TObjects();
      var meshCount = meshResources.count();
      for(var i = 0; i < meshCount; i++){
         var meshResource = meshResources.valueAt(i);
         var mesh = RClass.create(FE3rModelMesh);
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
function FE3rModel_processLoad(){
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
function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = RObject.dispose(o._meshes);
   o._skeletons = RObject.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
function FE3rModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadModels    = null;
   o._models        = null;
   o._meshs         = null;
   o._dynamicMeshs  = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = FE3rModelConsole_onProcess;
   o.construct      = FE3rModelConsole_construct;
   o.findModel      = FE3rModelConsole_findModel;
   o.models         = FE3rModelConsole_models;
   o.findMesh       = FE3rModelConsole_findMesh;
   o.meshs          = FE3rModelConsole_meshs;
   o.load           = FE3rModelConsole_load;
   o.loadMeshByGuid = FE3rModelConsole_loadMeshByGuid;
   o.loadMeshByCode = FE3rModelConsole_loadMeshByCode;
   o.merge          = FE3rModelConsole_merge;
   return o;
}
function FE3rModelConsole_onProcess(){
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
function FE3rModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._dynamicMeshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3rModelConsole_models(){
   return this._models;
}
function FE3rModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3rModelConsole_meshs(){
   return this._meshs;
}
function FE3rModelConsole_load(context, guid){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Model guid is empty');
   }
   var model = o._models.get(guid);
   if(model){
      return model;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   model = RClass.create(FE3rModel);
   model.linkGraphicContext(context);
   model.setCode(guid);
   model.setResource(resource);
   o._models.set(guid, model);
   o._loadModels.push(model);
   return model;
}
function FE3rModelConsole_loadMeshByGuid(context, pg){
   var o = this;
   if(!context){
      throw new TError('Graphics context is empty');
   }
   if(!guid){
      throw new TError('Model guid is empty');
   }
   var m = o._models.get(pg);
   if(m){
      return m;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   m = RClass.create(FE3rModel);
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
function FE3rModelConsole_loadMeshByCode(context, pg){
   var o = this;
   if(!RClass.isClass(context, MGraphicObject)){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pg)){
      throw new TError('Model guid is empty');
   }
   var model = o._models.get(pg);
   if(model){
      return model;
   }
   var resource = RConsole.find(FE3sModelConsole).load(guid);
   model = RClass.create(FE3rModel);
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
function FE3rModelConsole_merge(effect, region, offset, count){
   var o = this;
   var flag = 'merge';
   var renderables = region.renderables();
   for(var i = 0; i < count; i++){
      var renderable = renderables.getAt(offset + i);
      flag += '|' + renderable.hashCode();
   }
   var model = o._dynamicMeshs.get(flag);
   if(!model){
      model = RClass.create(FE3rDynamicModel);
      model.linkGraphicContext(region);
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         model.pushRenderable(renderable);
      }
      model.build();
      o._dynamicMeshs.set(flag, model);
      RLogger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
   }
   model.update();
   return model;
}
function FE3rModelMesh(o){
   o = RClass.inherits(this, o, FE3rGeometry);
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = null;
   o._boneIds          = null;
   o.construct         = FE3rModelMesh_construct;
   o.testReady         = FE3rModelMesh_testReady;
   o.guid              = FE3rModelMesh_guid;
   o.skins             = FE3rModelMesh_skins;
   o.pushSkin          = FE3rModelMesh_pushSkin;
   o.boneIds           = FE3rModelMesh_boneIds;
   return o;
}
function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rGeometry.construct.call(o);
}
function FE3rModelMesh_testReady(){
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
function FE3rModelMesh_guid(){
   return this._resource.guid();
}
function FE3rModelMesh_skins(){
   return this._skins;
}
function FE3rModelMesh_pushSkin(skin){
   var o = this;
   var skins = o._skins;
   if(!skins){
      skins = o._skins = new TObjects();
   }
   skins.push(skin);
}
function FE3rModelMesh_boneIds(){
   return this._boneIds;
}
function FE3rObject(o){
   o = RClass.inherits(this, o, FObject, MAttributeGuid, MAttributeCode, MGraphicObject);
   return o;
}
function FE3rPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FE3rPipeline_construct;
   o.findVertexBuffer = FE3rPipeline_findVertexBuffer;
   o.loadResource     = FE3rPipeline_loadResource;
   return o;
}
function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rPipeline_findVertexBuffer(p){
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
function FE3rPipeline_loadResource(p){
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
function FE3rSkeleton(o){
   o = RClass.inherits(this, o, FE3rObject, MLinkerResource);
   o._bones       = null;
   o._skins       = null;
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}
function FE3rSkeleton_bones(){
   return this._bones;
}
function FE3rSkeleton_skins(){
   return this._skins;
}
function FE3rSkeleton_loadResource(resource){
   var o = this;
   o._resource = resource;
   var boneResources = resource._bones;
   var count = boneResources.count();
   if(count > 0){
      var bones = o._bones = new TObjects();
      for(var i = 0; i < count; i++){
         var boneResource = boneResources.at(i);
         var bone = RClass.create(FE3rBone);
         bone.loadResource(boneResource);
         bones.push(bone);
      }
   }
}
function FE3rSkeletonAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rSkeletonAnimation_process;
   return o;
}
function FE3rSkeletonAnimation_process(skeleton){
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
function FE3rSkin(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._streams     = null;
   o.resource     = FE3rSkin_resource;
   o.streams      = FE3rSkin_streams;
   o.loadResource = FE3rSkin_loadResource;
   return o;
}
function FE3rSkin_resource(){
   return this._resource;
}
function FE3rSkin_streams(){
   return this._streams;
}
function FE3rSkin_loadResource(resource){
   var o = this;
   o._resource = resource;
   var streamResources = resource.streams();
   if(streamResources){
      var count = streamResources.count();
      if(count > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < count; i++){
            var streamResource = streamResources.at(i);
            var stream = RClass.create(FE3rStream);
            stream.linkGraphicContext(o);
            stream.loadResource(streamResource);
            streams.push(stream);
         }
      }
   }
}
function FE3rStream(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._buffer      = null;
   o._resource    = null;
   o.resource     = FE3rStream_resource;
   o.buffer       = FE3rStream_buffer;
   o.loadResource = FE3rStream_loadResource;
   return o;
}
function FE3rStream_resource(){
   return this._resource;
}
function FE3rStream_buffer(){
   return this._buffer;
}
function FE3rStream_loadResource(resource){
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
         throw new TError("Unknown code");
   }
   buffer.upload(resource._data, resource._dataStride, dataCount);
}
function FE3rTexture(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o._ready       = false;
   o._dataReady   = false;
   o.construct    = FE3rTexture_construct;
   o.resource     = FE3rTexture_resource;
   o.setResource  = FE3rTexture_setResource;
   o.bitmaps      = FE3rTexture_bitmaps;
   o.testReady    = FE3rTexture_testReady;
   o.loadBitmap   = FE3rTexture_loadBitmap;
   o.loadResource = FE3rTexture_loadResource;
   o.load         = FE3rTexture_load;
   o.processLoad  = FE3rTexture_processLoad;
   o.dispose      = FE3rTexture_dispose;
   return o;
}
function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rTexture_resource(){
   return this._resource;
}
function FE3rTexture_setResource(p){
   this._resource = p;
}
function FE3rTexture_bitmaps(){
   return this._bitmaps;
}
function FE3rTexture_testReady(){
   return this._ready;
}
function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = RClass.create(FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}
function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = RClass.create(FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = RClass.create(FE3rTextureBitmapCubePack);
         }else{
            throw new TError(o, 'Load resource failure.');
         }
         bp.linkGraphicContext(o);
         bp.loadResource(rbp);
         o._bitmapPacks.set(rbp.code(), bp);
      }
   }
   o._dataReady = true;
}
function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.valueAt(i);
      var b = o.loadBitmap(rb.guid());
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new TError('Link pack is not eists.');
      }
      b.load(bp);
   }
   o._ready = true;
}
function FE3rTexture_processLoad(){
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
function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = RObject.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmap(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._ready      = false;
   o._bitmapPack = null;
   o.construct   = FE3rTextureBitmap_construct;
   o.texture     = FE3rTextureBitmap_texture;
   o.testReady   = FE3rTextureBitmap_testReady;
   o.load        = FE3rTextureBitmap_load;
   o.dispose     = FE3rTextureBitmap_dispose;
   return o;
}
function FE3rTextureBitmap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmap_texture(){
   return this._bitmapPack.texture();
}
function FE3rTextureBitmap_testReady(){
   return this._ready;
}
function FE3rTextureBitmap_load(p){
   var o = this;
   o._bitmapPack = p;
   o._ready = true;
}
function FE3rTextureBitmap_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._bitmapPack = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
   o.construct    = FE3rTextureBitmapCubePack_construct;
   o.loadResource = FE3rTextureBitmapCubePack_loadResource;
   o.dispose      = FE3rTextureBitmapCubePack_dispose;
   return o;
}
function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   var capability = RBrowser.capability();
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
         is[i] = RObject.dispose(m);
      }
   }
   o._images = RObject.dispose(o._images);
   o._dataReady = true;
}
function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   var texture = p._texture;
   var capability = RBrowser.capability();
   var d = p.data();
   var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var g = o._images[i] = RClass.create(FImage);
      g._index = i;
      g.setOptionAlpha(false);
      if(capability.blobCreate){
         var blob = new Blob([d[i]], {'type' : 'image/' + t});
         var url = window.URL.createObjectURL(blob);
         g.loadUrl(url);
      }else{
         var url = RBrowser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         g.loadUrl(url);
      }
      g.addLoadListener(o, o.onLoad);
   }
}
function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
   o.construct    = FE3rTextureBitmapFlatPack_construct;
   o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
   o.dispose      = FE3rTextureBitmapFlatPack_dispose;
   return o;
}
function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._dataReady = true;
}
function FE3rTextureBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapFlatPack_loadResource(p){
   var o = this;
   o._resource = p;
   var rt = p._texture;
   var c = p.code();
   var g = o._image = RConsole.find(FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
   g.addLoadListener(o, o.onLoad);
}
function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   o.construct    = FE3rTextureBitmapPack_construct;
   o.texture      = FE3rTextureBitmapPack_texture;
   o.testReady    = FE3rTextureBitmapPack_testReady;
   o.loadResource = RMethod.virtual(o, 'loadResource');
   o.dispose      = FE3rTextureBitmapPack_dispose;
   return o;
}
function FE3rTextureBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmapPack_texture(){
   return this._texture;
}
function FE3rTextureBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
function FE3rTextureBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadTextures = null;
   o._bitmaps      = null;
   o._textures     = null;
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = FE3rTextureConsole_onProcess;
   o.construct     = FE3rTextureConsole_construct;
   o.bitmaps       = FE3rTextureConsole_bitmaps;
   o.textures      = FE3rTextureConsole_textures;
   o.load          = FE3rTextureConsole_load;
   o.loadBitmap    = FE3rTextureConsole_loadBitmap;
   return o;
}
function FE3rTextureConsole_onProcess(){
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
function FE3rTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadTextures = new TLooper();
   o._bitmaps = new TDictionary();
   o._textures = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rTextureConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rTextureConsole_textures(){
   return this._textures;
}
function FE3rTextureConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var texture = o._textures.get(flag);
   if(texture){
      return texture;
   }
   var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   RLogger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = RClass.create(FE3rTextureCube);
   }else{
      bitmap = RClass.create(FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
}
function FE3rTextureConsole_load2(pc, pt){
   var o = this;
   var s = o._textures;
   var t = s.get(pt);
   if(t){
      return t;
   }
   var rc = RConsole.find(FE3sTextureConsole);
   var r = rc.load(pt);
   t = RClass.create(FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   s.set(pt, t);
   o._loadTextures.push(t);
   return t;
}
function FE3rTextureConsole_loadBitmap(pc, pt, pb){
   var o = this;
   var b = o._bitmaps.get(pb);
   if(b){
      return b;
   }
   var t = o.load(pc, pt);
   return t.loadBitmap(pb);
}
function FE3rTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix      = null
   o._resource    = null;
   o.construct    = FE3rTrack_construct;
   o.matrix       = FE3rTrack_matrix;
   o.resource     = FE3rTrack_resource;
   o.loadResource = FE3rTrack_loadResource;
   o.dispose      = FE3rTrack_dispose;
   return o;
}
function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rTrack_matrix(){
   return this._matrix;
}
function FE3rTrack_resource(){
   return this._resource;
}
function FE3rTrack_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
function FE3rTrack_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
function FE3rVertexBuffer(o){
   o = RClass.inherits(this, o, FWglVertexBuffer, MLinkerResource);
   o.dispose = FE3rVertexBuffer_dispose;
   return o;
}
function FE3rVertexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
