function SE3rPlayInfo(o){
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
   o.update       = SE3rPlayInfo_update;
   return o;
}
function SE3rPlayInfo_update(){
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
function FE3rAnimation(o){
   o = RClass.inherits(this, o, FObject);
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
   o._tracks = new TObjects();
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
function FE3rAnimation_loadResource(p){
   var o = this;
   o._resource = p;
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FE3rTrack);
      t._animation = o;
      t.loadResource(rt);
      o._tracks.push(t);
   }
}
function FE3rAnimation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
}
function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.content.texture.bitmap.wv'
   o.construct = FE3rBitmapConsole_construct;
   o.bitmaps   = FE3rBitmapConsole_bitmaps;
   o.load      = FE3rBitmapConsole_load;
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
function FE3rBitmapConsole_load(pc, pg, pt){
   var o = this;
   var t = o._bitmaps.get(pg);
   if(t){
      return t;
   }
   var u = RBrowser.hostPath(o._dataUrl + '?code=' + pg);
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   if(RString.toLower(pt) == 'environment'){
      t = RClass.create(FE3rTextureCube);
   }else{
      t = RClass.create(FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
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
function FE3rBone_update(pi, pt){
   var o = this;
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   var m = o._matrix;
   m.assign(t.matrixInvert());
   m.append(pi.matrix);
}
function FE3rBone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FE3rDynamicMesh(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = FE3rDynamicMesh_construct;
   o.mergeCount        = FE3rDynamicMesh_mergeCount;
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
function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}
function FE3rDynamicMesh_syncVertexBuffer(p){
   var o = this;
   var r = p._resource;
   var rc = r._code;
   var b = o._vertexBuffers.get(rc);
   if(!b){
      var vt = o._vertexTotal;
      b = o._graphicContext.createVertexBuffer();
      b._name = rc;
      b._formatCd = p._formatCd;
      b._stride = p._stride;
      switch(p._formatCd){
         case EG3dAttributeFormat.Float2:
            b._data = new Float32Array(2 * vt);
            break;
         case EG3dAttributeFormat.Float3:
            b._data = new Float32Array(3 * vt);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            b._data = new Uint8Array(4 * vt);
            break;
         default:
            throw new TError("Unknown code");
      }
      o._vertexBuffers.set(rc, b);
   }
   return b;
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
   var vt = o._vertexTotal;
   var ft = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   var b = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   b._name = 'instance';
   b._stride = 4;
   b._formatCd = EG3dAttributeFormat.Float1;
   var vdi = b._data = new Float32Array(vt);
   o._vertexBuffers.set(b._name, b);
   var b = o._indexBuffer = gc.createIndexBuffer();
   if(gp.optionIndex32){
      b._strideCd = EG3dIndexStride.Uint32;
      b._data = new Uint32Array(ft);
   }else{
      b._strideCd = EG3dIndexStride.Uint16;
      b._data = new Uint16Array(ft);
   }
   b._count = ft;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      var vc = r.vertexCount();
      var vbs = r.vertexBuffers();
      var vbc = vbs.count();
      for(var vbi = 0; vbi < vbc; vbi++){
         var vb = vbs.valueAt(vbi);
         var vbr = vb._resource;
         var vbrc = vbr._code
         var b = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(r, vbrc, b, vbr);
      }
      RFloat.fill(vdi, o._vertexPosition, vc, i);
      var ib = r.indexBuffer();
      var ic = ib.count();
      var ir = ib._resource;
      o.mergeIndexBuffer(ir);
      o._vertexPosition += vc;
      o._indexPosition += ic;
   }
   var vbs = o._vertexBuffers;
   var vbc = vbs.count();
   for(var vbi = 0; vbi < vbc; vbi++){
      var vb = vbs.valueAt(vbi);
      vb.upload(vb._data, vb._stride, vt);
      vb._data = null;
   }
   o._indexBuffer.upload(o._indexBuffer._data, ft);
   o._indexBuffer._data = null;
}
function FE3rDynamicModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._renderables      = null;
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
   var mc = ms.count();
   for(var i = 0; i < mc; i++){
      ms.getAt(i).build();
   }
}
function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = RTimer.current();
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
   o = RClass.inherits(this, o, FG3dObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._material        = null;
   o.construct        = FE3rMaterial_construct;
   o.findVertexBuffer = FE3rMaterial_findVertexBuffer;
   o.indexBuffer      = FE3rMaterial_indexBuffer;
   o.loadResource     = FE3rMaterial_loadResource;
   return o;
}
function FE3rMaterial_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rMaterial_findVertexBuffer(p){
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
function FE3rMaterial_indexBuffer(){
   return this._indexBuffer;
}
function FE3rMaterial_loadResource(p){
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
   var themeConsole = RConsole.find(FE3sThemeConsole);
   var material = o._material = themeConsole.find(materialCode);
   var textures = material.textures();
   var textureCount = textures.count();
   for(var n = 0; n < textureCount; n++){
      var texture = textures.get(n);
   }
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
   o._skins            = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FE3rMesh_construct;
   o.testReady         = FE3rMesh_testReady;
   o.guid              = FE3rMesh_guid;
   o.vertexCount       = FE3rMesh_vertexCount;
   o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rMesh_vertexBuffers;
   o.indexBuffer       = FE3rMesh_indexBuffer;
   o.material          = FE3rMesh_material;
   o.skins             = FE3rMesh_skins;
   o.pushSkin          = FE3rMesh_pushSkin;
   o.findTexture       = FE3rMesh_findTexture;
   o.textures          = FE3rMesh_textures;
   o.boneIds           = FE3rMesh_boneIds;
   o.resource          = FE3rMesh_resource;
   o.loadResource      = FE3rMesh_loadResource;
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
function FE3rMesh_guid(){
   return this._resource.guid();
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
function FE3rMesh_skins(){
   return this._skins;
}
function FE3rMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}
function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}
function FE3rMesh_textures(){
   return this._textures;
}
function FE3rMesh_boneIds(p){
   return this._boneIds;
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_loadResource(p){
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
         b._resource = rs;
         b.upload(rs._data, 3 * rs._dataCount);
      }else{
         var b = c.createVertexBuffer();
         b._name = rc;
         b._resource = rs;
         o._vertexCount = rs._dataCount;
         var d = null;
         switch(rc){
            case "position":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError("Unknown code");
         }
         b.upload(d, rs._dataStride, rs._dataCount);
         o._vertexBuffers.push(b);
      }
   }
}
function FE3rMeshAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rMeshAnimation_process;
   return o;
}
function FE3rMeshAnimation_process(p){
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
function FE3rModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._name                = null;
   o._resource            = null;
   o._meshes              = null;
   o._skeletons           = null;
   o._dataReady           = false;
   o.name                 = FE3rModel_name;
   o.setName              = FE3rModel_setName;
   o.findMeshByGuid       = FE3rModel_findMeshByGuid;
   o.geometrys            = FE3rModel_geometrys;
   o.resource             = FE3rModel_resource;
   o.resource             = FE3rModel_resource;
   o.setResource          = FE3rModel_setResource;
   o.testReady            = FE3rModel_testReady;
   o.loadResource         = FE3rModel_loadResource;
   o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
   o.processLoad          = FE3rModel_processLoad;
   o.dispose              = FE3rModel_dispose;
   return o;
}
function FE3rModel_name(){
   return this._name;
}
function FE3rModel_setName(p){
   this._name = p;
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
function FE3rModel_loadSkeletonResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   var ss = p.skins();
   if(ss){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         var rs = RClass.create(FE3rSkin);
         rs.linkGraphicContext(o);
         rs.loadResource(s)
         var m = rmc.findMesh(s.meshGuid());
         m.pushSkin(rs);
      }
   }
}
function FE3rModel_loadResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FE3rMesh);
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
   o._scopeCd      = EScope.Local;
   o._loadModels   = null;
   o._models       = null;
   o._meshs        = null;
   o._dynamicMeshs = null;
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = FE3rModelConsole_onProcess;
   o.construct     = FE3rModelConsole_construct;
   o.findModel     = FE3rModelConsole_findModel;
   o.models        = FE3rModelConsole_models;
   o.findMesh      = FE3rModelConsole_findMesh;
   o.meshs         = FE3rModelConsole_meshs;
   o.load          = FE3rModelConsole_load;
   o.merge         = FE3rModelConsole_merge;
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
   t.lsnsProcess.register(o, o.onProcess);
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
function FE3rModelConsole_load(pc, pn){
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
   var rmc = RConsole.find(FE3sModelConsole);
   var rm = rmc.load(pn);
   m = RClass.create(FE3rModel);
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
function FE3rModelConsole_merge(pe, pg, pi, pc){
   var o = this;
   var f = 'merge';
   var rs = pg.renderables();
   for(var i = 0; i < pc; i++){
      var r = rs.getAt(pi + i);
      f += '|' + r.hashCode();
   }
   var md = o._dynamicMeshs.get(f);
   if(!md){
      md = RClass.create(FE3rDynamicModel);
      for(var i = 0; i < pc; i++){
         var r = rs.getAt(pi + i);
         md.pushRenderable(r);
      }
      md.linkGraphicContext(pg);
      md.build();
      o._dynamicMeshs.set(f, md);
   }
   md.update();
   return md;
}
function FE3rObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
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
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._bones       = null;
   o._skins       = null;
   o.resource     = FE3rSkeleton_resource;
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}
function FE3rSkeleton_resource(){
   return this._resource;
}
function FE3rSkeleton_bones(){
   return this._bones;
}
function FE3rSkeleton_skins(){
   return this._skins;
}
function FE3rSkeleton_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p._bones;
   var c = rs.count();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.value(i);
         var b = RClass.create(FE3rBone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
function FE3rSkeletonAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rSkeletonAnimation_process;
   return o;
}
function FE3rSkeletonAnimation_process(p){
   var o = this;
   var ct = o._currentTick;
   var bs = p.bones();
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.get(i).update(o._playInfo, ct);
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
function FE3rSkin_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p.streams();
   if(rs){
      var ss = o._streams = new TObjects();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3rStream);
         s.linkGraphicContext(o);
         s.loadResource(rs.get(i));
         ss.push(s);
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
function FE3rStream_loadResource(p){
   var o = this;
   var c = p._code;
   o._resource = p;
   o._vertexCount = p._dataCount;
   var b = o._buffer = o._graphicContext.createVertexBuffer();
   b._name = c;
   b._resource = p;
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
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   for(var i = 0; i < 6; i++){
      var m = is[i];
      window.URL.revokeObjectURL(m.url());
      is[i] = RObject.dispose(m);
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
   var d = p.data();
   var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var b = new Blob([d[i]], {type: 'image/' + t});
      var u = window.URL.createObjectURL(b);
      var g = o._images[i] = RClass.create(FImage);
      g.setOptionAlpha(false);
      g.loadUrl(u);
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
   var u = RBrowser.hostPath('/cloud.content.texture.bitmap.wv?guid=' + rt._guid + '&code=' + c);
   if(RRuntime.isDebug()){
      u += '&date=' + RDate.format();
   }
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
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
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rTextureConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rTextureConsole_textures(){
   return this._textures;
}
function FE3rTextureConsole_load(pc, pt){
   var o = this;
   var t = o._textures.get(pt);
   if(t){
      return t;
   }
   var rc = RConsole.find(FE3sTextureConsole);
   var r = rc.load(pt);
   t = RClass.create(FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   o._textures.set(pt, t);
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
