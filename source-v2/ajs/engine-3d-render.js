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
   o.__base.FConsole.construct.call(o);
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
   }else{
      t = RClass.create(FRd3Texture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
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
   o._effectCode           = 'control';
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
   ib._lineWidth = 1;
   ib.upload(id, 48);
   o.update();
   var mi = o.material().info();
   mi.effectCode = o._effectCode;
   mi.ambientColor.set(1, 1, 1, 1);
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
   o._effectCode           = 'automatic';
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
   var mi = o.material().info();
   mi.ambientColor.set(1, 1, 1, 1);
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
   o.resource          = FRd3Mesh_resource;
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
function FRd3Mesh_resource(){
   return this._resource;
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
            case "color":
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
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
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._ready    = false;
   o._image    = null;
   o._texture  = null;
   o.onLoad    = FRd3Texture_onLoad;
   o.construct = FRd3Texture_construct;
   o.image     = FRd3Texture_image;
   o.texture   = FRd3Texture_texture;
   o.testReady = FRd3Texture_testReady;
   o.load      = FRd3Texture_load;
   o.dispose   = FRd3Texture_dispose;
   return o;
}
function FRd3Texture_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._ready  = true;
}
function FRd3Texture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
   if(o._image){
      throw new TError('Loading image.');
   }
   var g = o._image = RClass.create(FImage);
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u);
}
function FRd3Texture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = RObject.dispose(o._image);
   o._texture = RObject.dispose(o._texture);
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
   o._imageX1 = null;
   o._imageX2 = null;
   o._imageY1 = null;
   o._imageY2 = null;
   o._imageZ1 = null;
   o._imageZ2 = null;
   o.onLoad   = FRd3TextureCube_onLoad;
   o.load     = FRd3TextureCube_load;
   return o;
}
function FRd3TextureCube_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   if(!o._imageX1.testReady()){
      return;
   }
   if(!o._imageX2.testReady()){
      return;
   }
   if(!o._imageY1.testReady()){
      return;
   }
   if(!o._imageY2.testReady()){
      return;
   }
   if(!o._imageZ1.testReady()){
      return;
   }
   if(!o._imageZ2.testReady()){
      return;
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(o._imageX1, o._imageX2, o._imageY1, o._imageY2, o._imageZ1, o._imageZ2);
   o._ready  = true;
}
function FRd3TextureCube_load(u){
   var o = this;
   var g = o._imageX1 = RClass.create(FImage);
   g._name = 'x1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-x1");
   var g = o._imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-x2");
   var g = o._imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-y1");
   var g = o._imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-y2");
   var g = o._imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-z1");
   var g = o._imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.addLoadListener(o, o.onLoad);
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
