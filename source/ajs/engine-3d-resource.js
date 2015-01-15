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
   o.track            = FRs3Geometry_track;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
   o._vertexBuffers = new TObjects();
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
function FRs3Geometry_track(){
   return this._track;
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
   if(p.readBoolean()){
      var k = o._track = RClass.create(FRs3Track);
      k.unserialize(p);
   }
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
   o._code       = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3Material_code(){
   return this._code;
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
   o._code = p.readString();
   o._info.unserialize(p);
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
   var tc = 0;
   if(p.readBoolean()){
      var am = o._animation = RClass.create(FRs3Animation);
      am.unserialize(p);
      var ts = am.tracks();
      tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         var b = sk.find(t.boneId());
         b.setTrack(t);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, geometry_count={2}, track_count={3})", o._name, gc, tc);
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
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._sky        = null;
   o._map        = null;
   o._space      = null;
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.sky         = FRs3Scene_sky;
   o.map         = FRs3Scene_map;
   o.space       = FRs3Scene_space;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._sky = RClass.create(FRs3SceneSky);
   o._map = RClass.create(FRs3SceneMap);
   o._space = RClass.create(FRs3SceneSpace);
}
function FRs3Scene_technique(){
   return this._technique;
}
function FRs3Scene_region(){
   return this._region;
}
function FRs3Scene_sky(){
   return this._sky;
}
function FRs3Scene_map(){
   return this._map;
}
function FRs3Scene_space(){
   return this._space;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   o._sky.unserialize(p);
   o._map.unserialize(p);
   o._space.unserialize(p);
}
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._viewport    = null;
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.viewport     = FRs3SceneCamera_viewport;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._viewport = RClass.create(FRs3SceneViewport);
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
function FRs3SceneCamera_viewport(){
   return this._viewport;
}
function FRs3SceneCamera_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._centerFront = p.readFloat();
   o._centerBack = p.readFloat();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._focalNear = p.readFloat();
   o._focalFar = p.readFloat();
   o._viewport.unserialize(p);
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
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FObject);
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
   o.__base.FObject.construct.call(o);
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
   o._code = p.readString();
   o._optionMergeVertex = p.readBoolean();
   o._optionMergeMaterial = p.readBoolean();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMovie);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var ms = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         ms.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
function FRs3SceneLight(o){
   o = RClass.inherits(this, o, FObject);
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
   o.unserialize         = FRs3SceneLight_unserialize;
   return o;
}
function FRs3SceneLight_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._shadow1 = new SRs3SceneShadow();
   o._shadow2 = new SRs3SceneShadow();
   o._shadow3 = new SRs3SceneShadow();
   o._material = RClass.create(FRs3SceneMaterial);
   o._camera = RClass.create(FRs3SceneCamera);
}
function FRs3SceneLight_typeName(){
   return this._typeName;
}
function FRs3SceneLight_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._optionTrack = p.readInt32();
   o._shadow1.unserialize(p);
   o._shadow2.unserialize(p);
   o._shadow3.unserialize(p);
   o._shadowAmbientMin = p.readFloat();
   o._shadowAmbientMax = p.readFloat();
   o._shadowAmbientThick = p.readFloat();
   o._shadowAmbientRange = p.readFloat();
   o._shadowMerge1Base = p.readFloat();
   o._shadowMerge1Rate = p.readFloat();
   o._shadowMerge2Base = p.readFloat();
   o._shadowMerge2Rate = p.readFloat();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FRs3SceneMap(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._code               = null;
   o._label              = null;
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
   o.code                = FRs3SceneMaterial_code;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
   return o;
}
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3SceneMaterial_code(){
   return this._code;
}
function FRs3SceneMaterial_info(){
   return this._info;
}
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._label = p.readString();
   o._info.unserialize(p);
   o._heightDepth = p.readFloat();
   o._surfaceRate = p.readFloat();
   o._surfaceReflect = p.readFloat();
   o._surfaceBright = p.readFloat();
   o._surfaceBrightLevel = p.readFloat();
   o._surfaceCoarse = p.readFloat();
   o._surfaceCoarseLevel = p.readFloat();
   o._surfaceMerge = p.readFloat();
   o._surfacePower = p.readFloat();
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
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FObject);
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
   o.__base.FObject.construct.call(o);
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
   o._color.unserialize(p);
   o._colorLevel.unserialize(p);
   o._fogNear = p.readFloat();
   o._fogFar = p.readFloat();
   o._fogRate = p.readFloat();
   o._fogAttenuation = p.readFloat();
   o._fogColor.unserialize(p);
   o._edgeRate = p.readFloat();
   o._edgeLevel = p.readFloat();
   o._edgeWidth = p.readFloat();
   o._edgeColor.unserialize(p);
   o._faceRange = p.readFloat();
   o._faceLimit = p.readFloat();
   o._faceRate = p.readFloat();
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._code       = null;
   o.code        = FRs3SceneRenderable_code;
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}
function FRs3SceneRenderable_code(){
   return this._code;
}
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o._code = p.readString();
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
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._passes     = null;
   o.name        = FRs3SceneTechnique_name;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}
function FRs3SceneTechnique_name(){
   return this._name;
}
function FRs3SceneTechnique_passes(){
   return this._passes;
}
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o._name = p.readString();
   var c = p.readUint8();
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
   o = RClass.inherits(this, o, FObject);
   o._name         = null;
   o._targetWidth  = null;
   o._targetHeight = null;
   o.name          = FRs3SceneTechniquePass_name;
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}
function FRs3SceneTechniquePass_name(){
   return this._name;
}
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FRs3SceneViewport(o){
   o = RClass.inherits(this, o, FObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FRs3SceneViewport_angle;
   o.znear       = FRs3SceneViewport_znear;
   o.zfar        = FRs3SceneViewport_zfar;
   o.unserialize = FRs3SceneViewport_unserialize;
   return o;
}
function FRs3SceneViewport_angle(){
   return this._angle;
}
function FRs3SceneViewport_znear(){
   return this._znear;
}
function FRs3SceneViewport_zfar(){
   return this._zfar;
}
function FRs3SceneViewport_unserialize(p){
   var o = this;
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
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
   o._renderables = null;
   o.renderables  = FRs3Template_renderables;
   o.unserialize  = FRs3Template_unserialize;
   return o;
}
function FRs3Template_renderables(){
   return this._renderables;
}
function FRs3Template_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var n = 0; n < c; n++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
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
function FRs3TemplateRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o._modelCode       = null;
   o._geometryIndex   = null;
   o._materialCode    = null;
   o._optionInstnaced = false;
   o._instanceCount   = 1;
   o._optionDynamic   = false;
   o._optionMerge     = false;
   o._optionBoneScale = false;
   o._optionSelect    = false;
   o._optionVisible   = false;
   o._optionGround    = false;
   o._matrix          = null;
   o.construct        = FRs3TemplateRenderable_construct;
   o.modelCode        = FRs3TemplateRenderable_modelCode;
   o.geometryIndex    = FRs3TemplateRenderable_geometryIndex;
   o.materialCode     = FRs3TemplateRenderable_materialCode;
   o.matrix           = FRs3TemplateRenderable_matrix;
   o.unserialize      = FRs3TemplateRenderable_unserialize;
   return o;
}
function FRs3TemplateRenderable_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FRs3TemplateRenderable_modelCode(){
   return this._modelCode;
}
function FRs3TemplateRenderable_geometryIndex(p){
   return this._geometryIndex;
}
function FRs3TemplateRenderable_materialCode(){
   return this._materialCode;
}
function FRs3TemplateRenderable_matrix(){
   return this._matrix;
}
function FRs3TemplateRenderable_unserialize(p){
   var o = this;
   o._modelCode = p.readString();
   o._geometryIndex = p.readUint16();
   o._materialCode = p.readString();
   o._optionInstnaced = p.readBoolean();
   o._instanceCount = p.readUint8();
   o._optionDynamic = p.readBoolean();
   o._optionMerge = p.readBoolean();
   o._optionBoneScale = p.readBoolean();
   o._optionSelect = p.readBoolean();
   o._optionVisible = p.readBoolean();
   o._optionGround = p.readBoolean();
   o._matrix.unserialize(p);
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
   return this._matrixInvert;
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
function SRs3MaterialInfo(o){
   if(!o){o = this;}
   SG3dMaterialInfo(o);
   o.unserialize = SRs3MaterialInfo_unserialize;
   return o;
}
function SRs3MaterialInfo_unserialize(p){
   var o = this;
   o.effectName = p.readString();
   o.transformName = p.readString();
   o.optionLight = p.readBoolean();
   o.optionMerge = p.readBoolean();
   o.optionSort = p.readBoolean();
   o.sortLevel = p.readInt32();
   o.optionAlpha = p.readBoolean();
   o.optionDepth = p.readBoolean();
   o.optionCompare = p.readString();
   o.optionDouble = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionDynamic = p.readBoolean();
   o.optionTransmittance = p.readBoolean();
   o.optionOpacity = p.readBoolean();
   o.coordRateWidth = p.readFloat();
   o.coordRateHeight = p.readFloat();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.alphaLevel = p.readFloat();
   o.alphaMerge = p.readFloat();
   o.ambientColor.unserialize(p);
   o.ambientShadow = p.readFloat();
   o.diffuseColor.unserialize(p);
   o.diffuseShadow = p.readFloat();
   o.diffuseViewColor.unserialize(p);
   o.diffuseViewShadow = p.readFloat();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularRate = p.readFloat();
   o.specularAverage = p.readFloat();
   o.specularShadow = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewRate = p.readFloat();
   o.specularViewAverage = p.readFloat();
   o.specularViewShadow = p.readFloat();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.reflectShadow = p.readFloat();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
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
