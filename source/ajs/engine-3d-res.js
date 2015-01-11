function FRs3Animation(o){
   o = RClass.inherits(this, o, FObject);
   o._frameCount = 0;
   o._frameTick  = 0;
   o._frameSpan  = 0;
   o._tracks     = null;
   o.construct   = FRs3Animation_construct;
   o.tracks      = FRs3Animation_tracks;
   o.unserialize = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var c = p.readUint16();
   if(c > 0){
      var ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._id         = 0;
   o._bones      = null;
   o._track      = null;
   o.id          = FRs3Bone_id;
   o.bones       = FRs3Bone_bones;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   o.unserialize = FRs3Bone_unserialize;
   return o;
}
function FRs3Bone_id(){
   return this._id;
}
function FRs3Bone_bones(){
   return this._bones;
}
function FRs3Bone_track(){
   return this._track;
}
function FRs3Bone_setTrack(p){
   this._track = p;
}
function FRs3Bone_unserialize(p){
   var o = this;
   o._id = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         bs.push(b);
      }
   }
}
function FRs3Frame(o){
   o = RClass.inherits(this, o, FObject);
   o._tick       = 0;
   o._matrix     = null;
   o.construct   = FRs3Frame_construct;
   o.tick        = FRs3Frame_tick;
   o.matrix      = FRs3Frame_matrix;
   o.unserialize = FRs3Frame_unserialize;
   return o;
}
function FRs3Frame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3Frame_tick(){
   return this._tick;
}
function FRs3Frame_matrix(){
   return this._matrix;
}
function FRs3Frame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._matrix.unserialize(p);
}
function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._matrix          = null;
   o._outline         = null;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   o.construct        = FRs3Geometry_construct;
   o.materialCode     = FRs3Geometry_materialCode;
   o.findVertexBuffer = FRs3Geometry_findVertexBuffer;
   o.vertexBuffers    = FRs3Geometry_vertexBuffers;
   o.indexBuffer      = FRs3Geometry_indexBuffer;
   o.boneIds          = FRs3Geometry_boneIds;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
   o._vertexBuffers = new TObjects();
   o._track = RClass.create(FRs3Track);
}
function FRs3Geometry_materialCode(){
   return this._materialCode;
}
function FRs3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   if(vs){
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
   }
   return null;
}
function FRs3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}
function FRs3Geometry_indexBuffer(){
   return this._indexBuffer;
}
function FRs3Geometry_boneIds(){
   return this._boneIds;
}
function FRs3Geometry_unserialize(p){
   var o = this;
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._matrix.unserialize(p);
   o._outline.unserialize(p);
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   if(vc > 0){
      var vs = o._vertexBuffers = new TObjects();
      for(var i = 0; i < vc; i++){
         var vb = RClass.create(FRs3VertexBuffer);
         vb._vertexCount = o._vertexCount;
         vb.unserialize(p)
         vs.push(vb);
      }
   }
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
   var bc = p.readInt8();
   if(bc > 0){
      var bs = o._boneIds = new TArray();
      for(var i = 0; i < bc; i++){
         bs.push(p.readUint8());
      }
   }
   o._track.unserialize(p);
}
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = EG3dIndexStride.Unknown;
   o._memory      = null;
   o._data        = null;
   o.count        = FRs3IndexBuffer_count;
   o.strideCd     = FRs3IndexBuffer_strideCd;
   o.memory       = FRs3IndexBuffer_memory;
   o.data         = FRs3IndexBuffer_data;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}
function FRs3IndexBuffer_count(){
   return this._count;
}
function FRs3IndexBuffer_strideCd(){
   return this._strideCd;
}
function FRs3IndexBuffer_memory(){
   return this._memory;
}
function FRs3IndexBuffer_data(){
   return this._data;
}
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   var c = o._count = p.readInt32();
   var sc = o._strideCd = p.readInt8();
   if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(2 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint16();
      }
   }else if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(4 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint32();
      }
   }else{
      throw new TError('Unknown stride type. (stride_cd={1})', sc);
   }
}
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code  = null;
   o._effectName = null;
   o._optionLight = null;
   o._optionMerge = null;
   o._optionSort = null;
   o._sortLevel = null;
   o._optionAlpha = null;
   o._optionDepth = null;
   o._optionCompare = null;
   o._optionDouble = null;
   o._optionShadow = null;
   o._optionShadowSelf = null;
   o._optionDynamic = null;
   o._optionTransmittance = null;
   o._optionOpacity = null;
   o._coordRateWidth = null;
   o._coordRateHeight = null;
   o._colorMin = null;
   o._colorMax = null;
   o._colorRate = null;
   o._colorMerge = null;
   o._alphaBase = null;
   o._alphaRate = null;
   o._alphaLevel = null;
   o._alphaMerge = null;
   o._ambientColor = null;
   o._ambientShadow = null;
   o._diffuseColor = null;
   o._diffuseShadow = null;
   o._diffuseViewColor = null;
   o._diffuseViewShadow = null;
   o._specularColor = null;
   o._specularBase = null;
   o._specularRate = null;
   o._specularAverage = null;
   o._specularShadow = null;
   o._specularViewColor = null;
   o._specularViewBase = null;
   o._specularViewRate = null;
   o._specularViewAverage = null;
   o._specularViewShadow = null;
   o._reflectColor = null;
   o._reflectMerge = null;
   o._reflectShadow = null;
   o._refractFrontColor = null;
   o._refractBackColor = null;
   o._opacityColor = null;
   o._opacityRate = null;
   o._opacityAlpha = null;
   o._opacityDepth = null;
   o._opacityTransmittance = null;
   o._emissiveColor = null;
   o._textures   = null;
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._ambientColor = new SColor4()
   o._diffuseColor = new SColor4()
   o._diffuseViewColor = new SColor4()
   o._specularColor = new SColor4()
   o._specularViewColor = new SColor4()
   o._reflectColor = new SColor4()
   o._refractFrontColor = new SColor4()
   o._opacityColor = new SColor4()
   o._emissiveColor = null;
}
function FRs3Material_code(){
   return this._code;
}
function FRs3Material_effectName(){
   return this._effectName;
}
function FRs3Material_textures(){
   return this._textures;
}
function FRs3Material_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._effectName = p.readString();
   var c = p.readInt8();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FRs3MaterialTexture(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._code        = null;
   o._textureCode = null;
   o._bitmapCode  = null;
   o.code         = FRs3MaterialTexture_code;
   o.textureCode  = FRs3MaterialTexture_textureCode;
   o.bitmapCode   = FRs3MaterialTexture_bitmapCode;
   o.unserialize  = FRs3MaterialTexture_unserialize;
   return o;
}
function FRs3MaterialTexture_code(){
   return this._code;
}
function FRs3MaterialTexture_textureCode(){
   return this._textureCode;
}
function FRs3MaterialTexture_bitmapCode(){
   return this._bitmapCode;
}
function FRs3MaterialTexture_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._textureCode = p.readString();
   o._bitmapCode = p.readString();
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.geometrys   = FRs3Model_geometrys;
   o.skeleton    = FRs3Model_skeleton;
   o.animation   = FRs3Model_animation;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_geometrys(){
   return this._geometrys;
}
function FRs3Model_skeleton(){
   return this._skeleton;
}
function FRs3Model_animation(){
   return this._animation;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   if(gc > 0){
      var gs = o._geometrys = new TObjects();
      for(var i = 0; i < gc; i++){
         var g = RClass.create(FRs3Geometry);
         g.unserialize(p);
         gs.push(g);
      }
   }
   var sk = null;
   if(p.readBoolean()){
      sk = o._skeleton = RClass.create(FRs3Skeleton);
      sk.unserialize(p);
   }
   if(p.readBoolean()){
      var am = o._animation = RClass.create(FRs3Animation);
      am.unserialize(p);
      var ts = am.tracks();
      var tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         var b = sk.find(t.boneId());
         b.setTrack(t);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, geometry_count={2}, track_count={3})", o._name, gc, tc);
   RDump.dump(this, _dump);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models   = null;
   o._path     = '/assets/model/'
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
}
function FRs3ModelConsole_load(p){
   var o = this;
   var r = o._models.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Model);
      r.load(u);
      o._models.set(p, r);
   }
   return r;
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
   this._name = p.readString();
}
function FRs3Resource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Scene_construct;
   o.geometrys   = FRs3Scene_geometrys;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Scene_geometrys(){
   return this._geometrys;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes   = null;
   o._path     = '/assets/scene/'
   o.construct = FRs3SceneConsole_construct;
   o.load      = FRs3SceneConsole_load;
   return o;
}
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FRs3SceneConsole_load(p){
   var o = this;
   var r = o._scenes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Scene);
      r.load(u);
      o._scenes.set(p, r);
   }
   return r;
}
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FObject);
   o._bones      = null
   o._roots      = null
   o.find        = FRs3Skeleton_find;
   o.bones       = FRs3Skeleton_bones;
   o.roots       = FRs3Skeleton_roots;
   o.innerFilter = FRs3Skeleton_innerFilter;
   o.unserialize = FRs3Skeleton_unserialize;
   return o;
}
function FRs3Skeleton_find(p){
   return this._bones.get(p);
}
function FRs3Skeleton_bones(){
   return this._bones;
}
function FRs3Skeleton_roots(){
   return this._roots;
}
function FRs3Skeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.id(), p);
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
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var bs = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         bs.push(b);
      }
   }
}
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Template_construct;
   o.geometrys   = FRs3Template_geometrys;
   o.unserialize = FRs3Template_unserialize;
   return o;
}
function FRs3Template_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Template_geometrys(){
   return this._geometrys;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3TemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates = null;
   o._path      = '/assets/template/'
   o.construct = FRs3TemplateConsole_construct;
   o.load      = FRs3TemplateConsole_load;
   return o;
}
function FRs3TemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FRs3TemplateConsole_load(p){
   var o = this;
   var r = o._templates.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FRs3Template);
      r.load(u);
      o._templates.set(p, r);
   }
   return r;
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
      var ms = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         ms.set(m.code(), m);
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
   o._boneId          = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneId           = FRs3Track_boneId;
   o.frameTick        = FRs3Track_frameTick;
   o.matrix           = FRs3Track_matrix;
   o.matrixInvert     = FRs3Track_matrixInvert;
   o.frames           = FRs3Track_frames;
   o.unserialize      = FRs3Track_unserialize;
   return o;
}
function FRs3Track_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FRs3Track_boneId(){
   return this._boneId;
}
function FRs3Track_frameTick(){
   return this._frameTick;
}
function FRs3Track_matrix(){
   return this._matrix;
}
function FRs3Track_matrixInvert(){
   return this.matrixInvert;
}
function FRs3Track_frames(){
   return this._frames;
}
function FRs3Track_unserialize(p){
   var o = this;
   o._optionBoneScale = p.readBoolean();
   o._boneId = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   var c = p.readInt16();
   if(c > 0){
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FRs3Frame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = EG3dAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   o.name         = FRs3VertexBuffer_name;
   o.formatCd     = FRs3VertexBuffer_formatCd;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   o.dispose      = FRs3VertexBuffer_dispose;
   return o;
}
function FRs3VertexBuffer_name(){
   return this._name;
}
function FRs3VertexBuffer_formatCd(){
   return this._formatCd;
}
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   p.readBytes(o._data, 0, t);
}
function FRs3VertexBuffer_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
   o._geometry = null;
   o._name = null;
   o._formatCd = null;
   o._vertexCount = null;
   o._stride = null;
   o._data = null;
}
