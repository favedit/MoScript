function FRs3Animation(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._skeletonGuid = null;
   o._skeleton     = null;
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   o._tracks       = null;
   o.skeletonGuid  = FRs3Animation_skeletonGuid;
   o.skeleton      = FRs3Animation_skeleton;
   o.tracks        = FRs3Animation_tracks;
   o.unserialize   = FRs3Animation_unserialize;
   return o;
}
function FRs3Animation_skeletonGuid(){
   return this._skeletonGuid;
}
function FRs3Animation_skeleton(){
   var o = this;
   var r = o._skeleton;
   if(!r){
      var g = o._skeletonGuid;
      if(g){
         r = o._skeleton = RConsole.find(FRs3ModelConsole).findSkeleton(g);
      }
   }
   return r;
}
function FRs3Animation_tracks(){
   return this._tracks;
}
function FRs3Animation_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
   o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var ts = null;
   var c = p.readUint16();
   if(c > 0){
      ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
         if(k){
            var bi = t.boneIndex();
            var b = k.findBone(bi);
            b.setTrack(t);
         }
      }
   }
   if(ts && o._skeletonGuid){
      var k = o.skeleton();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         var b = k.findBone(t.boneIndex());
         b.setTrack(t);
      }
      k.pushAnimation(o);
   }
}
function FRs3Bone(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   o.index       = FRs3Bone_index;
   o.track       = FRs3Bone_track;
   o.setTrack    = FRs3Bone_setTrack;
   o.bones       = FRs3Bone_bones;
   o.unserialize = FRs3Bone_unserialize;
   return o;
}
function FRs3Bone_index(){
   return this._index;
}
function FRs3Bone_track(){
   return this._track;
}
function FRs3Bone_setTrack(p){
   this._track = p;
}
function FRs3Bone_bones(){
   return this._bones;
}
function FRs3Bone_unserialize(p){
   var o = this;
   o._index = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         s.push(b);
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
   o._template       = null;
   o._typeName       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   o.construct       = FRs3Display_construct;
   o.typeName        = FRs3Display_typeName;
   o.modelGuid       = FRs3Display_modelGuid;
   o.model           = FRs3Display_model;
   o.meshGuid        = FRs3Display_meshGuid;
   o.mesh            = FRs3Display_mesh;
   o.matrix          = FRs3Display_matrix;
   o.materials       = FRs3Display_materials;
   o.unserialize     = FRs3Display_unserialize;
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
function FRs3Display_model(){
   return RConsole.find(FRs3ModelConsole).findModel(this._modelGuid);
}
function FRs3Display_meshGuid(){
   return this._meshGuid;
}
function FRs3Display_mesh(){
   return RConsole.find(FRs3ModelConsole).findMesh(this._meshGuid);
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
   return RConsole.find(FRs3MaterialConsole).findGroup(this._groupGuid);
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
   p.set('option_alpha', mi.optionAlpha);
   p.set('option_double', mi.optionDouble);
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
   o._materialGroups  = null;
   o._materials       = null;
   o.construct        = FRs3MaterialConsole_construct;
   o.findGroup        = FRs3MaterialConsole_findGroup;
   o.find             = FRs3MaterialConsole_find;
   o.unserializeGroup = FRs3MaterialConsole_unserializeGroup;
   o.unserialize      = FRs3MaterialConsole_unserialize;
   return o;
}
function FRs3MaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}
function FRs3MaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}
function FRs3MaterialConsole_find(p){
   return this._materials.get(p);
}
function FRs3MaterialConsole_unserializeGroup(p){
   var o = this;
   var r = RClass.create(FRs3MaterialGroup);
   r.unserialize(p);
   o._materialGroups.set(r.guid(), r);
   return r;
}
function FRs3MaterialConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FRs3Material);
   r.unserialize(p);
   o._materials.set(r.guid(), r);
   return r;
}
function FRs3MaterialGroup(o){
   o = RClass.inherits(this, o, FRs3Object);
   return o;
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
   o = RClass.inherits(this, o, FRs3Object);
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   o.construct   = FRs3Mesh_construct;
   o.outline     = FRs3Mesh_outline;
   o.streams     = FRs3Mesh_streams;
   o.tracks      = FRs3Mesh_tracks;
   o.unserialize = FRs3Mesh_unserialize;
   return o;
}
function FRs3Mesh_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._outline = new SOutline3();
}
function FRs3Mesh_outline(){
   return this._outline;
}
function FRs3Mesh_streams(){
   return this._streams;
}
function FRs3Mesh_tracks(){
   return this._tracks;
}
function FRs3Mesh_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._outline.unserialize(p);
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
   var mc = RConsole.find(FRs3ModelConsole);
   mc.models().set(o.guid(), o);
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialMesh(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialSkeleton(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialAnimation(p));
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FRs3ModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   o._dataUrl          = '/cloud.content.model.wv';
   o.construct         = FRs3ModelConsole_construct;
   o.findModel         = FRs3ModelConsole_findModel;
   o.models            = FRs3ModelConsole_models;
   o.findMesh          = FRs3ModelConsole_findMesh;
   o.meshs             = FRs3ModelConsole_meshs;
   o.findSkeleton      = FRs3ModelConsole_findSkeleton;
   o.skeletons         = FRs3ModelConsole_skeletons;
   o.findAnimation     = FRs3ModelConsole_findAnimation;
   o.animations        = FRs3ModelConsole_animations;
   o.unserialMesh      = FRs3ModelConsole_unserialMesh;
   o.unserialSkeleton  = FRs3ModelConsole_unserialSkeleton;
   o.unserialAnimation = FRs3ModelConsole_unserialAnimation;
   o.load              = FRs3ModelConsole_load;
   o.dispose           = FRs3ModelConsole_dispose;
   return o;
}
function FRs3ModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
}
function FRs3ModelConsole_findModel(p){
   return this._models.get(p);
}
function FRs3ModelConsole_models(){
   return this._models;
}
function FRs3ModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FRs3ModelConsole_meshs(){
   return this._meshs;
}
function FRs3ModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
function FRs3ModelConsole_skeletons(){
   return this._skeletons;
}
function FRs3ModelConsole_findAnimation(p){
   return this._animations.get(p);
}
function FRs3ModelConsole_animations(){
   return this._animations;
}
function FRs3ModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FRs3Mesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
function FRs3ModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FRs3Skeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
function FRs3ModelConsole_unserialAnimation(p){
   var o = this;
   var r = RClass.create(FRs3Animation);
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
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
function FRs3ModelConsole_dispose(){
   var o = this;
   o._materials = null;
   o.__base.FDisplay.dispose.call(o);
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
   o.saveConfig  = FRs3Object_saveConfig;
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
function FRs3Object_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
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
   o.saveConfig   = FRs3Resource_saveConfig;
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
function FRs3Resource_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
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
   o._layers     = null;
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.layers      = FRs3Scene_layers;
   o.unserialize = FRs3Scene_unserialize;
   o.saveConfig  = FRs3Scene_saveConfig;
   return o;
}
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._layers = new TDictionary();
}
function FRs3Scene_technique(){
   return this._technique;
}
function FRs3Scene_region(){
   return this._region;
}
function FRs3Scene_layers(){
   return this._layers;
}
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FRs3SceneLayer);
      l.unserialize(p);
      o._layers.set(l.code(), l);
   }
}
function FRs3Scene_saveConfig(p){
   var o = this;
   o.__base.FRs3Resource.saveConfig.call(o, p);
   p.setName('Scene');
   p.set('theme_code', o._themeCode);
   var xls = p.create('LayerCollection');
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      l.saveConfig(xls.create('Layer'));
   }
}
function FRs3SceneCamera(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._projection  = null;
   o.construct    = FRs3SceneCamera_construct;
   o.typeName     = FRs3SceneCamera_typeName;
   o.position     = FRs3SceneCamera_position;
   o.direction    = FRs3SceneCamera_direction;
   o.projection   = FRs3SceneCamera_projection;
   o.unserialize  = FRs3SceneCamera_unserialize;
   return o;
}
function FRs3SceneCamera_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FRs3SceneProjection);
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
function FRs3SceneCamera_projection(){
   return this._projection;
}
function FRs3SceneCamera_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._typeName = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FRs3SceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes     = null;
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   o.construct   = FRs3SceneConsole_construct;
   o.load        = FRs3SceneConsole_load;
   o.update      = FRs3SceneConsole_update;
   return o;
}
function FRs3SceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FRs3SceneConsole_load(p){
   var o = this;
   var s = o._scenes;
   var r = s.get(p);
   if(r == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + p + '&date=' + RDate.format());
      r = RClass.create(FRs3Scene);
      r.load(u);
      s.set(p, r);
   }
   return r;
}
function FRs3SceneConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update&date=' + RDate.format());
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FRs3SceneDisplay(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.saveConfig           = FRs3SceneDisplay_saveConfig;
   return o;
}
function FRs3SceneDisplay_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMovie);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3SceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}
function FRs3SceneDisplay_saveConfig(p){
   var o = this;
   o.__base.FRs3Object.saveConfig.call(o, p);
   var xms = p.create('MaterialCollection');
   var s = o._materials;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xms.create('Material'));
      }
   }
}
function FRs3SceneLayer(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._displays   = null;
   o.displays    = FRs3SceneLayer_displays;
   o.unserialize = FRs3SceneLayer_unserialize;
   o.saveConfig  = FRs3SceneLayer_saveConfig;
   return o;
}
function FRs3SceneLayer_displays(){
   return this._displays;
}
function FRs3SceneLayer_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3SceneDisplay);
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FRs3SceneLayer_saveConfig(p){
   var o = this;
   o.__base.FRs3Object.saveConfig.call(o, p);
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
}
function FRs3SceneLight(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.__base.FRs3Object.construct.call(o);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FRs3SceneMap(o){
   o = RClass.inherits(this, o, FRs3SceneSpace);
   return o;
}
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._groupGuid          = null;
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
   o.groupGuid           = FRs3SceneMaterial_groupGuid;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
   o.saveConfig          = FRs3SceneMaterial_saveConfig;
   return o;
}
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}
function FRs3SceneMaterial_groupGuid(){
   return this._groupGuid;
}
function FRs3SceneMaterial_info(){
   return this._info;
}
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
}
function FRs3SceneMaterial_saveConfig(p){
   var o = this;
   o.__base.FRs3Object.saveConfig.call(o, p);
   p.set('group_guid', o._groupGuid);
   o._info.saveConfig(p);
}
function FRs3SceneMovie(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FRs3SceneMovie_construct;
   o.interval    = FRs3SceneMovie_interval;
   o.rotation    = FRs3SceneMovie_rotation;
   o.unserialize = FRs3SceneMovie_unserialize;
   return o;
}
function FRs3SceneMovie_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._rotation = new SVector3();
}
function FRs3SceneMovie_interval(){
   return this._interval;
}
function FRs3SceneMovie_rotation(){
   return this._rotation;
}
function FRs3SceneMovie_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FRs3SceneProjection(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FRs3SceneProjection_angle;
   o.znear       = FRs3SceneProjection_znear;
   o.zfar        = FRs3SceneProjection_zfar;
   o.unserialize = FRs3SceneProjection_unserialize;
   return o;
}
function FRs3SceneProjection_angle(){
   return this._angle;
}
function FRs3SceneProjection_znear(){
   return this._znear;
}
function FRs3SceneProjection_zfar(){
   return this._zfar;
}
function FRs3SceneProjection_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FRs3SceneRegion(o){
   o = RClass.inherits(this, o, FRs3Object);
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
   o.__base.FRs3Object.construct.call(o);
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
   o.__base.FRs3Object.unserialize.call(o, p);
   o._color.unserialize(p);
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FRs3SceneRenderable(o){
   o = RClass.inherits(this, o, FRs3Object);
   o.unserialize = FRs3SceneRenderable_unserialize;
   return o;
}
function FRs3SceneRenderable_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
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
   o = RClass.inherits(this, o, FRs3Object);
   o._passes     = null;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}
function FRs3SceneTechnique_passes(){
   return this._passes;
}
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   var c = p.readInt16();
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
   o = RClass.inherits(this, o, FRs3Object);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   o.findBone      = FRs3Skeleton_findBone;
   o.bones         = FRs3Skeleton_bones;
   o.roots         = FRs3Skeleton_roots;
   o.skins         = FRs3Skeleton_skins;
   o.animations    = FRs3Skeleton_animations;
   o.pushAnimation = FRs3Skeleton_pushAnimation;
   o.innerFilter   = FRs3Skeleton_innerFilter;
   o.unserialize   = FRs3Skeleton_unserialize;
   return o;
}
function FRs3Skeleton_findBone(p){
   return this._bones.get(p);
}
function FRs3Skeleton_bones(){
   return this._bones;
}
function FRs3Skeleton_roots(){
   return this._roots;
}
function FRs3Skeleton_skins(){
   return this._skins;
}
function FRs3Skeleton_animations(){
   return this._animations;
}
function FRs3Skeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}
function FRs3Skeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.index(), p);
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
         s.push(k);
      }
   }
}
function FRs3SkeletonSkin(o){
   o = RClass.inherits(this, o, FRs3Object);
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   o.meshGuid    = FRs3SkeletonSkin_meshGuid;
   o.find        = FRs3SkeletonSkin_find;
   o.streams     = FRs3SkeletonSkin_streams;
   o.boneRefers  = FRs3SkeletonSkin_boneRefers;
   o.unserialize = FRs3SkeletonSkin_unserialize;
   return o;
}
function FRs3SkeletonSkin_meshGuid(){
   return this._meshGuid;
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
   var mc = RConsole.find(FRs3MaterialConsole);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materialGroups = new TDictionary();
      for(var i = 0; i < c; i++){
         var g = mc.unserializeGroup(p);
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
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FRs3Material);
         m.unserialize(p);
         s.set(m.code(), m);
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
   o._boneIndex       = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frameCount      = null;
   o._frames          = null;
   o.construct        = FRs3Track_construct;
   o.boneIndex        = FRs3Track_boneIndex;
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
function FRs3Track_boneIndex(){
   return this._boneIndex;
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
   o._boneIndex = p.readUint8();
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
   o.saveConfig  = SRs3MaterialInfo_saveConfig;
   return o;
}
function SRs3MaterialInfo_unserialize(p){
   var o = this;
   o.effectName = p.readString();
   o.optionAlpha = p.readBoolean();
   o.optionDouble = p.readBoolean();
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
function SRs3MaterialInfo_saveConfig(p){
   var o = this;
   p.set('effect_code', o.effectName);
   p.setBoolean('option_double', o.optionDouble);
   var x = p.create('Alpha');
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   o.ambientColor.savePower(p.create('Ambient'));
   o.diffuseColor.savePower(p.create('Diffuse'));
   o.diffuseViewColor.savePower(p.create('DiffuseView'));
   var x = p.create('Specular');
   o.specularColor.savePower(x);
   x.setFloat('level', o.specularLevel);
   var x = p.create('SpecularView');
   o.specularViewColor.savePower(x);
   x.setFloat('level', o.specularViewLevel);
   var x = p.create('Reflect');
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   o.refractFrontColor.savePower(p.create('RefractFront'));
   o.refractBackColor.savePower(p.create('RefractBack'));
   o.emissiveColor.savePower(p.create('Emissive'));
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
