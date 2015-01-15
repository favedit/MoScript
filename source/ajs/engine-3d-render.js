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
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t.loadResource(rt);
      o._tracks.push(t);
   }
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.value(i);
      var bi = b.id();
      var t = o.findTrack(bi);
      if(t == null){
         throw new TError('Track is not exists. (bone_id={1})', bi);
      }
      b.setTrackResource(t);
   }
}
function FRd3Animation_process(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   var ct = o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
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
   o.matrix           = FRd3Bone_matrix;
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
function FRd3Bone_matrix(){
   return this._matrix;
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
   o._resource         = null;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FRd3Geometry_construct;
   o.testReady         = FRd3Geometry_testReady;
   o.findVertexBuffer  = FRd3Geometry_findVertexBuffer;
   o.vertexBuffers     = FRd3Geometry_vertexBuffers;
   o.indexBuffer       = FRd3Geometry_indexBuffer;
   o.material          = FRd3Geometry_material;
   o.findTexture       = FRd3Geometry_findTexture;
   o.textures          = FRd3Geometry_textures;
   o.boneIds           = FRd3Geometry_boneIds;
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
function FRd3Geometry_textures(){
   return this._textures;
}
function FRd3Geometry_boneIds(p){
   return this._boneIds;
}
function FRd3Geometry_loadResource(p){
   var o = this;
   var c = o._context;
   o._resource = p;
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
   o._boneIds = p.boneIds();
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
   o.matrix       = FRd3Track_matrix;
   o.matrixInvert = FRd3Track_matrixInvert;
   o.loadResource = FRd3Track_loadResource;
   o.calculate    = FRd3Track_calculate;
   o.dispose      = FRd3Track_dispose;
   return o;
}
function FRd3Track_boneId(){
   return this._resource.boneId();
}
function FRd3Track_matrix(){
   return this._resource.matrix();
}
function FRd3Track_matrixInvert(){
   return this._resource.matrixInvert();
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
   if(pt < 0){
      pt = -pt;
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
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
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
   var m = o.matrix;
   var ct = o.currentFrame.translation();
   var cr = o.currentFrame.quaternion();
   var cs = o.currentFrame.scale();
   var r = o.rate;
   if((r > 0) && (r < 1)){
      var nt = o.nextFrame.translation();
      var nr = o.nextFrame.quaternion();
      var ns = o.nextFrame.scale();
      o.translation.slerp(ct, nt, r);
      o.quaternion.slerp(cr, nr, r);
      o.scale.slerp(cs, ns, r);
      m.build(o.translation, o.quaternion, o.scale);
   }else{
      m.build(ct, cr, cs);
   }
   return true;
}
