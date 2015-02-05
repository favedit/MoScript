function FRs3Animation(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._frameCount = 0;
   o._frameTick  = 0;
   o._frameSpan  = 0;
   o._tracks     = null;
   o.tracks      = FRs3Animation_tracks;
   o.unserialize = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
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
   o._template   = null;
   o._typeName   = null;
   o._modelGuid  = null;
   o._meshGuid   = null;
   o._matrix     = null;
   o._activeMaterial = null;
   o._materials  = null;
   o.construct   = FRs3Display_construct;
   o.typeName    = FRs3Display_typeName;
   o.modelGuid   = FRs3Display_modelGuid;
   o.meshGuid    = FRs3Display_meshGuid;
   o.matrix      = FRs3Display_matrix;
   o.materials   = FRs3Display_materials;
   o.unserialize = FRs3Display_unserialize;
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
function FRs3Display_meshGuid(){
   return this._meshGuid;
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
   return RConsole.find(FRs3MaterialGroupConsole).find(this._groupGuid);
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
   o._materials  = null;
   o.construct   = FRs3MaterialConsole_construct;
   o.unserialize = FRs3MaterialConsole_unserialize;
   o.find        = FRs3MaterialConsole_find;
   return o;
}
function FRs3MaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new TDictionary();
}
function FRs3MaterialConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FRs3Material);
   r.unserialize(p);
   o._materials.set(r.guid(), r);
   return r;
}
function FRs3MaterialConsole_find(p){
   return this._materials.get(p);
}
function FRs3MaterialGroup(o){
   o = RClass.inherits(this, o, FRs3Object);
   return o;
}
function FRs3MaterialGroupConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._materialGroups = null;
   o.construct       = FRs3MaterialGroupConsole_construct;
   o.unserialize     = FRs3MaterialGroupConsole_unserialize;
   o.find            = FRs3MaterialGroupConsole_find;
   return o;
}
function FRs3MaterialGroupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
}
function FRs3MaterialGroupConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FRs3MaterialGroup);
   r.unserialize(p);
   o._materialGroups.set(r.guid(), r);
   return r;
}
function FRs3MaterialGroupConsole_find(p){
   return this._materialGroups.get(p);
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
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._matrix     = null;
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   o.construct   = FRs3Mesh_construct;
   o.guid        = FRs3Mesh_guid;
   o.streams     = FRs3Mesh_streams;
   o.tracks      = FRs3Mesh_tracks;
   o.unserialize = FRs3Mesh_unserialize;
   return o;
}
function FRs3Mesh_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
}
function FRs3Mesh_guid(){
   return this._guid;
}
function FRs3Mesh_streams(){
   return this._streams;
}
function FRs3Mesh_tracks(){
   return this._tracks;
}
function FRs3Mesh_unserialize(p){
   var o = this;
   o._guid = p.readString();
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
   debugger
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3Mesh);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FRs3Skeleton);
         k.unserialize(p);
         s.push(k);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         var a = RClass.create(FRs3Animation);
         a.unserialize(p);
         s.push(a);
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models   = null;
   o._dataUrl  = '/cloud.content.model.wv'
   o.construct = FRs3ModelConsole_construct;
   o.load      = FRs3ModelConsole_load;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
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
   o.material            = FRs3SceneLight_material;
   o.camera              = FRs3SceneLight_camera;
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
function FRs3SceneLight_material(){
   return this._material;
}
function FRs3SceneLight_camera(){
   return this._camera;
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
   o = RClass.inherits(this, o, FRs3Object);
   o._bones      = null
   o._roots      = null
   o._skins      = null
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
         s.push(b);
      }
   }
}
function FRs3SkeletonSkin(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._streams     = null
   o._boneRefers  = null
   o.find        = FRs3SkeletonSkin_find;
   o.streams     = FRs3SkeletonSkin_streams;
   o.boneRefers  = FRs3SkeletonSkin_boneRefers;
   o.unserialize = FRs3SkeletonSkin_unserialize;
   return o;
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
   var mgc = RConsole.find(FRs3MaterialGroupConsole);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materialGroups = new TDictionary();
      for(var i = 0; i < c; i++){
         var g = mgc.unserialize(p);
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
   o._frameCount      = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneId           = FRs3Track_boneId;
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
   o._boneId = p.readUint8();
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
