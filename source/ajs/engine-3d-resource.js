function SE3sMaterialInfo(){
   var o = this;
   SG3dMaterialInfo.call(o);
   o.unserialize = SE3sMaterialInfo_unserialize;
   o.saveConfig  = SE3sMaterialInfo_saveConfig;
   return o;
}
function SE3sMaterialInfo_unserialize(p){
   var o = this;
   o.effectCode = p.readString();
   o.optionDepth = p.readBoolean();
   o.optionAlpha = p.readBoolean();
   o.optionDouble = p.readBoolean();
   o.optionView = p.readBoolean();
   o.optionNormalInvert = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.ambientColor.unserialize(p);
   o.diffuseColor.unserialize(p);
   o.diffuseViewColor.unserialize(p);
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularLevel = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewLevel = p.readFloat();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.emissiveColor.unserialize(p);
}
function SE3sMaterialInfo_saveConfig(p){
   var o = this;
   p.set('effect_code', o.effectCode);
   p.setBoolean('option_alpha', o.optionAlpha);
   p.setBoolean('option_double', o.optionDouble);
   p.setBoolean('option_view', o.optionView);
   p.setBoolean('option_normal_invert', o.optionNormalInvert);
   p.setBoolean('option_shadow', o.optionShadow);
   p.setBoolean('option_shadow_self', o.optionShadowSelf);
   var x = p.create('Alpha');
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = p.create('Color');
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('rate', o.colorRate);
   x.setFloat('merge', o.colorMerge);
   o.ambientColor.savePower(p.create('Ambient'));
   o.diffuseColor.savePower(p.create('Diffuse'));
   o.diffuseViewColor.savePower(p.create('DiffuseView'));
   var x = p.create('Specular');
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = p.create('SpecularView');
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = p.create('Reflect');
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   o.refractFrontColor.savePower(p.create('RefractFront'));
   o.refractBackColor.savePower(p.create('RefractBack'));
   o.emissiveColor.savePower(p.create('Emissive'));
}
function SE3sSceneShadow(){
   var o = this;
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = SE3sSceneShadow_unserialize;
   return o;
}
function SE3sSceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
function FE3sAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._skeletonGuid = null;
   o._skeleton     = null;
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   o._tracks       = null;
   o.skeletonGuid  = FE3sAnimation_skeletonGuid;
   o.skeleton      = FE3sAnimation_skeleton;
   o.tracks        = FE3sAnimation_tracks;
   o.unserialize   = FE3sAnimation_unserialize;
   return o;
}
function FE3sAnimation_skeletonGuid(){
   return this._skeletonGuid;
}
function FE3sAnimation_skeleton(){
   var o = this;
   var r = o._skeleton;
   if(!r){
      var g = o._skeletonGuid;
      if(g){
         r = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(g);
      }
   }
   return r;
}
function FE3sAnimation_tracks(){
   return this._tracks;
}
function FE3sAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var ts = null;
   var c = p.readUint16();
   if(c > 0){
      ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sTrack);
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
function FE3sBone(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   o.index       = FE3sBone_index;
   o.track       = FE3sBone_track;
   o.setTrack    = FE3sBone_setTrack;
   o.bones       = FE3sBone_bones;
   o.unserialize = FE3sBone_unserialize;
   return o;
}
function FE3sBone_index(){
   return this._index;
}
function FE3sBone_track(){
   return this._track;
}
function FE3sBone_setTrack(p){
   this._track = p;
}
function FE3sBone_bones(){
   return this._bones;
}
function FE3sBone_unserialize(p){
   var o = this;
   o._index = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FE3sBoneRefer(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._bone       = null;
   o._track      = null;
   o.index       = FE3sBoneRefer_index;
   o.bone        = FE3sBoneRefer_bone;
   o.setBone     = FE3sBoneRefer_setBone;
   o.track       = FE3sBoneRefer_track;
   o.setTrack    = FE3sBoneRefer_setTrack;
   o.unserialize = FE3sBoneRefer_unserialize;
   return o;
}
function FE3sBoneRefer_index(){
   return this._index;
}
function FE3sBoneRefer_bone(){
   return this._bone;
}
function FE3sBoneRefer_setBone(p){
   this._bone = p;
}
function FE3sBoneRefer_track(){
   return this._track;
}
function FE3sBoneRefer_setTrack(p){
   this._track = p;
}
function FE3sBoneRefer_unserialize(p){
   var o = this;
   o._index = p.readUint8();
}
function FE3sDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._template       = null;
   o._typeName       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   o.construct       = FE3sDisplay_construct;
   o.typeName        = FE3sDisplay_typeName;
   o.modelGuid       = FE3sDisplay_modelGuid;
   o.model           = FE3sDisplay_model;
   o.meshGuid        = FE3sDisplay_meshGuid;
   o.mesh            = FE3sDisplay_mesh;
   o.matrix          = FE3sDisplay_matrix;
   o.materials       = FE3sDisplay_materials;
   o.unserialize     = FE3sDisplay_unserialize;
   return o;
}
function FE3sDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sDisplay_typeName(){
   return this._typeName;
}
function FE3sDisplay_modelGuid(){
   return this._modelGuid;
}
function FE3sDisplay_model(){
   return RConsole.find(FE3sModelConsole).findModel(this._modelGuid);
}
function FE3sDisplay_meshGuid(){
   return this._meshGuid;
}
function FE3sDisplay_mesh(){
   return RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
}
function FE3sDisplay_matrix(){
   return this._matrix;
}
function FE3sDisplay_materials(){
   return this._materials;
}
function FE3sDisplay_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._modelGuid = p.readString();
   o._meshGuid = p.readString();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sDisplayMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
function FE3sDisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._groupGuid  = null;
   o.groupGuid   = FE3sDisplayMaterial_groupGuid;
   o.unserialize = FE3sDisplayMaterial_unserialize;
   return o;
}
function FE3sDisplayMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
function FE3sFrame(o){
   o = RClass.inherits(this, o, FObject);
   o._tick        = 0;
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   o.construct    = FE3sFrame_construct;
   o.tick         = FE3sFrame_tick;
   o.translation  = FE3sFrame_translation;
   o.quaternion   = FE3sFrame_quaternion;
   o.scale        = FE3sFrame_scale;
   o.unserialize  = FE3sFrame_unserialize;
   return o;
}
function FE3sFrame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._translation = new SPoint3();
   o._quaternion = new SQuaternion();
   o._scale = new SVector3();
}
function FE3sFrame_tick(){
   return this._tick;
}
function FE3sFrame_translation(){
   return this._translation;
}
function FE3sFrame_quaternion(){
   return this._quaternion;
}
function FE3sFrame_scale(){
   return this._scale;
}
function FE3sFrame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._translation.unserialize(p);
   o._quaternion.unserialize(p);
   o._scale.unserialize(p);
}
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._groupGuid  = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FE3sMaterial_construct;
   o.groupGuid   = FE3sMaterial_groupGuid;
   o.group       = FE3sMaterial_group;
   o.effectCode  = FE3sMaterial_effectCode;
   o.info        = FE3sMaterial_info;
   o.textures    = FE3sMaterial_textures;
   o.unserialize = FE3sMaterial_unserialize;
   o.saveConfig  = FE3sMaterial_saveConfig;
   return o;
}
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sMaterial_group(){
   return RConsole.find(FE3sMaterialConsole).findGroup(this._groupGuid);
}
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
function FE3sMaterial_info(){
   return this._info;
}
function FE3sMaterial_textures(){
   return this._textures;
}
function FE3sMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FE3sMaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FE3sMaterial_saveConfig(p){
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
   p.set('specular_base', mi.specularBase);
   p.set('specular_level', mi.specularLevel);
   p.set('reflect_color', mi.reflectColor.toString());
   p.set('reflect_merge', mi.reflectMerge);
   p.set('emissive_color', mi.emissiveColor.toString());
}
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._materialGroups  = null;
   o._materials       = null;
   o.construct        = FE3sMaterialConsole_construct;
   o.findGroup        = FE3sMaterialConsole_findGroup;
   o.find             = FE3sMaterialConsole_find;
   o.unserializeGroup = FE3sMaterialConsole_unserializeGroup;
   o.unserialize      = FE3sMaterialConsole_unserialize;
   return o;
}
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}
function FE3sMaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
function FE3sMaterialConsole_unserializeGroup(p){
   var o = this;
   var r = RClass.create(FE3sMaterialGroup);
   r.unserialize(p);
   o._materialGroups.set(r.guid(), r);
   return r;
}
function FE3sMaterialConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sMaterial);
   r.unserialize(p);
   o._materials.set(r.guid(), r);
   return r;
}
function FE3sMaterialGroup(o){
   o = RClass.inherits(this, o, FE3sObject);
   return o;
}
function FE3sMaterialTexture(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._textureGuid = null;
   o._bitmapGuid  = null;
   o.textureGuid  = FE3sMaterialTexture_textureGuid;
   o.bitmapGuid   = FE3sMaterialTexture_bitmapGuid;
   o.unserialize  = FE3sMaterialTexture_unserialize;
   return o;
}
function FE3sMaterialTexture_textureGuid(){
   return this._textureGuid;
}
function FE3sMaterialTexture_bitmapGuid(){
   return this._bitmapGuid;
}
function FE3sMaterialTexture_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._textureGuid = p.readString();
   o._bitmapGuid = p.readString();
}
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   o.construct   = FE3sMesh_construct;
   o.outline     = FE3sMesh_outline;
   o.streams     = FE3sMesh_streams;
   o.tracks      = FE3sMesh_tracks;
   o.unserialize = FE3sMesh_unserialize;
   return o;
}
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._outline = new SOutline3();
}
function FE3sMesh_outline(){
   return this._outline;
}
function FE3sMesh_streams(){
   return this._streams;
}
function FE3sMesh_tracks(){
   return this._tracks;
}
function FE3sMesh_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._outline.unserialize(p);
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sStream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._meshes     = null;
   o._skeletons  = null;
   o._animations = null;
   o.meshes      = FE3sModel_meshes;
   o.skeletons   = FE3sModel_skeletons;
   o.animations  = FE3sModel_animations;
   o.unserialize = FE3sModel_unserialize;
   return o;
}
function FE3sModel_meshes(){
   return this._meshes;
}
function FE3sModel_skeletons(){
   return this._skeletons;
}
function FE3sModel_animations(){
   return this._animations;
}
function FE3sModel_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var mc = RConsole.find(FE3sModelConsole);
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
function FE3sModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   o._dataUrl          = '/cloud.content.model.wv';
   o.construct         = FE3sModelConsole_construct;
   o.findModel         = FE3sModelConsole_findModel;
   o.models            = FE3sModelConsole_models;
   o.findMesh          = FE3sModelConsole_findMesh;
   o.meshs             = FE3sModelConsole_meshs;
   o.findSkeleton      = FE3sModelConsole_findSkeleton;
   o.skeletons         = FE3sModelConsole_skeletons;
   o.findAnimation     = FE3sModelConsole_findAnimation;
   o.animations        = FE3sModelConsole_animations;
   o.unserialMesh      = FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = FE3sModelConsole_unserialAnimation;
   o.load              = FE3sModelConsole_load;
   o.dispose           = FE3sModelConsole_dispose;
   return o;
}
function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
}
function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3sModelConsole_models(){
   return this._models;
}
function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3sModelConsole_meshs(){
   return this._meshs;
}
function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
function FE3sModelConsole_skeletons(){
   return this._skeletons;
}
function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}
function FE3sModelConsole_animations(){
   return this._animations;
}
function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FE3sMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialAnimation(p){
   var o = this;
   var r = RClass.create(FE3sAnimation);
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_load(p){
   var o = this;
   var s = o._models;
   var m = s.get(p);
   if(!m){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + p);
      if(RRuntime.isDebug()){
         u += '&date=' + RDate.format();
      }
      m = RClass.create(FE3sModel);
      m.load(u);
      s.set(p, m);
   }
   return m;
}
function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FE3sObject_guid;
   o.code        = FE3sObject_code;
   o.label       = FE3sObject_label;
   o.unserialize = FE3sObject_unserialize;
   o.saveConfig  = FE3sObject_saveConfig;
   return o;
}
function FE3sObject_guid(){
   return this._guid;
}
function FE3sObject_code(){
   return this._code;
}
function FE3sObject_label(){
   return this._label;
}
function FE3sObject_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}
function FE3sObject_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource);
   o._dataReady   = false;
   o._dataSize    = 0;
   o._lsnsLoad    = null;
   o.onLoad       = FE3sResource_onLoad;
   o.loadListener = FE3sResource_loadListener;
   o.testReady    = FE3sResource_testReady;
   o.unserialize  = FE3sResource_unserialize;
   o.saveConfig   = FE3sResource_saveConfig;
   o.load         = FE3sResource_load;
   return o;
}
function FE3sResource_onLoad(p){
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
function FE3sResource_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FE3sResource_testReady(){
   return this._dataReady;
}
function FE3sResource_unserialize(p){
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
function FE3sResource_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
function FE3sResource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._layers     = null;
   o.construct   = FE3sScene_construct;
   o.technique   = FE3sScene_technique;
   o.region      = FE3sScene_region;
   o.layers      = FE3sScene_layers;
   o.unserialize = FE3sScene_unserialize;
   o.saveConfig  = FE3sScene_saveConfig;
   return o;
}
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sSceneTechnique);
   o._region = RClass.create(FE3sSceneRegion);
   o._layers = new TDictionary();
}
function FE3sScene_technique(){
   return this._technique;
}
function FE3sScene_region(){
   return this._region;
}
function FE3sScene_layers(){
   return this._layers;
}
function FE3sScene_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FE3sSceneLayer);
      l.unserialize(p);
      o._layers.set(l.code(), l);
   }
}
function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
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
function FE3sSceneCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._projection  = null;
   o.construct    = FE3sSceneCamera_construct;
   o.typeName     = FE3sSceneCamera_typeName;
   o.position     = FE3sSceneCamera_position;
   o.direction    = FE3sSceneCamera_direction;
   o.projection   = FE3sSceneCamera_projection;
   o.unserialize  = FE3sSceneCamera_unserialize;
   return o;
}
function FE3sSceneCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sSceneProjection);
}
function FE3sSceneCamera_typeName(){
   return this._typeName;
}
function FE3sSceneCamera_position(){
   return this._position;
}
function FE3sSceneCamera_direction(){
   return this._direction;
}
function FE3sSceneCamera_projection(){
   return this._projection;
}
function FE3sSceneCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes     = null;
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   o.construct   = FE3sSceneConsole_construct;
   o.load        = FE3sSceneConsole_load;
   o.update      = FE3sSceneConsole_update;
   return o;
}
function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FE3sSceneConsole_load(p){
   var o = this;
   var s = o._scenes;
   var r = s.get(p);
   if(r == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + p + '&date=' + RDate.format());
      r = RClass.create(FE3sScene);
      r.load(u);
      s.set(p, r);
   }
   return r;
}
function FE3sSceneConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update&date=' + RDate.format());
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._code                = null;
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   o._matrix              = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   o.construct            = FE3sSceneDisplay_construct;
   o.code                 = FE3sSceneDisplay_code;
   o.matrix               = FE3sSceneDisplay_matrix;
   o.movies               = FE3sSceneDisplay_movies;
   o.materials            = FE3sSceneDisplay_materials;
   o.renderables          = FE3sSceneDisplay_renderables;
   o.unserialize          = FE3sSceneDisplay_unserialize;
   o.saveConfig           = FE3sSceneDisplay_saveConfig;
   return o;
}
function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sSceneDisplay_code(){
   return this._code;
}
function FE3sSceneDisplay_matrix(){
   return this._matrix;
}
function FE3sSceneDisplay_movies(){
   return this._movies;
}
function FE3sSceneDisplay_materials(){
   return this._materials;
}
function FE3sSceneDisplay_renderables(){
   return this._renderables;
}
function FE3sSceneDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMovie);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FE3sTemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}
function FE3sSceneDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._matrix.saveConfig(p.create('Matrix'));
   var xs = p.create('MaterialCollection');
   var s = o._materials;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xs.create('Material'));
      }
   }
}
function FE3sSceneLayer(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._displays   = null;
   o.displays    = FE3sSceneLayer_displays;
   o.unserialize = FE3sSceneLayer_unserialize;
   o.saveConfig  = FE3sSceneLayer_saveConfig;
   return o;
}
function FE3sSceneLayer_displays(){
   return this._displays;
}
function FE3sSceneLayer_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sSceneDisplay);
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FE3sSceneLayer_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
}
function FE3sSceneLight(o){
   o = RClass.inherits(this, o, FE3sObject);
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
   o.construct           = FE3sSceneLight_construct;
   o.typeName            = FE3sSceneLight_typeName;
   o.material            = FE3sSceneLight_material;
   o.camera              = FE3sSceneLight_camera;
   o.unserialize         = FE3sSceneLight_unserialize;
   return o;
}
function FE3sSceneLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._shadow1 = new SE3sSceneShadow();
   o._shadow2 = new SE3sSceneShadow();
   o._shadow3 = new SE3sSceneShadow();
   o._material = RClass.create(FE3sSceneMaterial);
   o._camera = RClass.create(FE3sSceneCamera);
}
function FE3sSceneLight_typeName(){
   return this._typeName;
}
function FE3sSceneLight_material(){
   return this._material;
}
function FE3sSceneLight_camera(){
   return this._camera;
}
function FE3sSceneLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FE3sSceneMap(o){
   o = RClass.inherits(this, o, FE3sSceneSpace);
   return o;
}
function FE3sSceneMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
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
   o.construct           = FE3sSceneMaterial_construct;
   o.groupGuid           = FE3sSceneMaterial_groupGuid;
   o.info                = FE3sSceneMaterial_info;
   o.unserialize         = FE3sSceneMaterial_unserialize;
   o.saveConfig          = FE3sSceneMaterial_saveConfig;
   return o;
}
function FE3sSceneMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sSceneMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sSceneMaterial_info(){
   return this._info;
}
function FE3sSceneMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
}
function FE3sSceneMaterial_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('group_guid', o._groupGuid);
   o._info.saveConfig(p);
}
function FE3sSceneMovie(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FE3sSceneMovie_construct;
   o.interval    = FE3sSceneMovie_interval;
   o.rotation    = FE3sSceneMovie_rotation;
   o.unserialize = FE3sSceneMovie_unserialize;
   return o;
}
function FE3sSceneMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new SVector3();
}
function FE3sSceneMovie_interval(){
   return this._interval;
}
function FE3sSceneMovie_rotation(){
   return this._rotation;
}
function FE3sSceneMovie_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FE3sSceneProjection(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FE3sSceneProjection_angle;
   o.znear       = FE3sSceneProjection_znear;
   o.zfar        = FE3sSceneProjection_zfar;
   o.unserialize = FE3sSceneProjection_unserialize;
   return o;
}
function FE3sSceneProjection_angle(){
   return this._angle;
}
function FE3sSceneProjection_znear(){
   return this._znear;
}
function FE3sSceneProjection_zfar(){
   return this._zfar;
}
function FE3sSceneProjection_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FE3sSceneRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
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
   o.construct       = FE3sSceneRegion_construct;
   o.color           = FE3sSceneRegion_color;
   o.camera          = FE3sSceneRegion_camera;
   o.light           = FE3sSceneRegion_light;
   o.unserialize     = FE3sSceneRegion_unserialize;
   return o;
}
function FE3sSceneRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._color = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FE3sSceneCamera);
   o._light = RClass.create(FE3sSceneLight);
}
function FE3sSceneRegion_color(){
   return this._color;
}
function FE3sSceneRegion_camera(){
   return this._camera;
}
function FE3sSceneRegion_light(){
   return this._light;
}
function FE3sSceneRegion_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._color.unserialize(p);
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FE3sSceneRenderable(o){
   o = RClass.inherits(this, o, FE3sObject);
   o.unserialize = FE3sSceneRenderable_unserialize;
   return o;
}
function FE3sSceneRenderable_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
}
function FE3sSceneSky(o){
   o = RClass.inherits(this, o, FE3sSceneSpace);
   return o;
}
function FE3sSceneSpace(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._type       = null;
   o._displays   = null;
   o.displays    = FE3sSceneSpace_displays;
   o.unserialize = FE3sSceneSpace_unserialize;
   return o;
}
function FE3sSceneSpace_displays(){
   return this._displays;
}
function FE3sSceneSpace_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._type = p.readString();
   var c = p.readUint16();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sSceneDisplay);
         d.unserialize(p);
         ds.push(d);
      }
   }
}
function FE3sSceneTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._techniqueCode = null;
   o._passes        = null;
   o.passes         = FE3sSceneTechnique_passes;
   o.unserialize    = FE3sSceneTechnique_unserialize;
   o.saveConfig     = FE3sSceneTechnique_saveConfig;
   return o;
}
function FE3sSceneTechnique_passes(){
   return this._passes;
}
function FE3sSceneTechnique_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sSceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
function FE3sSceneTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('technique_code', o._techniqueCode);
}
function FE3sSceneTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FE3sSceneTechniquePass_targetWidth;
   o.targetHeight  = FE3sSceneTechniquePass_targetHeight;
   o.unserialize   = FE3sSceneTechniquePass_unserialize;
   return o;
}
function FE3sSceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FE3sSceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FE3sSceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FE3sSkeleton(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   o.findBone      = FE3sSkeleton_findBone;
   o.bones         = FE3sSkeleton_bones;
   o.roots         = FE3sSkeleton_roots;
   o.skins         = FE3sSkeleton_skins;
   o.animations    = FE3sSkeleton_animations;
   o.pushAnimation = FE3sSkeleton_pushAnimation;
   o.innerFilter   = FE3sSkeleton_innerFilter;
   o.unserialize   = FE3sSkeleton_unserialize;
   return o;
}
function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}
function FE3sSkeleton_bones(){
   return this._bones;
}
function FE3sSkeleton_roots(){
   return this._roots;
}
function FE3sSkeleton_skins(){
   return this._skins;
}
function FE3sSkeleton_animations(){
   return this._animations;
}
function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}
function FE3sSkeleton_innerFilter(p){
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
function FE3sSkeleton_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var s = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
function FE3sSkeletonSkin(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   o.meshGuid    = FE3sSkeletonSkin_meshGuid;
   o.find        = FE3sSkeletonSkin_find;
   o.streams     = FE3sSkeletonSkin_streams;
   o.boneRefers  = FE3sSkeletonSkin_boneRefers;
   o.unserialize = FE3sSkeletonSkin_unserialize;
   return o;
}
function FE3sSkeletonSkin_meshGuid(){
   return this._meshGuid;
}
function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}
function FE3sSkeletonSkin_streams(){
   return this._streams;
}
function FE3sSkeletonSkin_boneRefers(){
   return this._boneRefers;
}
function FE3sSkeletonSkin_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   o._meshGuid = p.readString();
   var c = p.readUint8();
   if(c > 0){
      var s = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sStream);
         t.unserialize(p);
         s.push(t);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._boneRefers = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBoneRefer);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FE3sStream(o){
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
   o.name              = FE3sStream_name;
   o.formatCd          = FE3sStream_formatCd;
   o.unserialize       = FE3sStream_unserialize;
   o.dispose           = FE3sStream_dispose;
   return o;
}
function FE3sStream_name(){
   return this._name;
}
function FE3sStream_formatCd(){
   return this._formatCd;
}
function FE3sStream_unserialize(p){
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
function FE3sStream_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
function FE3sTemplate(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._materialGroups = null;
   o._themes         = null;
   o._displays       = null;
   o._activeTheme    = null;
   o.materialGroups  = FE3sTemplate_materialGroups;
   o.themes          = FE3sTemplate_themes;
   o.displays        = FE3sTemplate_displays;
   o.unserialize     = FE3sTemplate_unserialize;
   return o;
}
function FE3sTemplate_materialGroups(){
   return this._materialGroups;
}
function FE3sTemplate_themes(){
   return this._themes;
}
function FE3sTemplate_displays(){
   return this._displays;
}
function FE3sTemplate_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var mc = RConsole.find(FE3sMaterialConsole);
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
         var t = RClass.create(FE3sTemplateTheme);
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
         var d = RClass.create(FE3sDisplay);
         d._template = o;
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FE3sTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o._dataUrl    = '/cloud.content.template.wv'
   o.construct   = FE3sTemplateConsole_construct;
   o.load        = FE3sTemplateConsole_load;
   o.update      = FE3sTemplateConsole_update;
   return o;
}
function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FE3sTemplateConsole_load(c, v){
   var o = this;
   var s = o._templates;
   var t = s.get(c);
   if(t == null){
      var u = RBrowser.hostPath(o._dataUrl + '?code=' + c + '&version=' + RString.nvl(v) + '&date=' + RDate.format());
      t = RClass.create(FE3sTemplate);
      t.load(u);
      s.set(c, t);
   }
   return t;
}
function FE3sTemplateConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FE3sTemplateTheme(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._materials   = null;
   o.findMaterial = FE3sTemplateTheme_findMaterial;
   o.materials    = FE3sTemplateTheme_materials;
   o.unserialize  = FE3sTemplateTheme_unserialize;
   return o;
}
function FE3sTemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
function FE3sTemplateTheme_materials(){
   return this._materials;
}
function FE3sTemplateTheme_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = RConsole.find(FE3sMaterialConsole);
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
function FE3sTexture(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o.construct    = FE3sTexture_construct;
   o.bitmaps      = FE3sTexture_bitmaps;
   o.bitmapPacks  = FE3sTexture_bitmapPacks;
   o.unserialize  = FE3sTexture_unserialize;
   o.dispose      = FE3sTexture_dispose;
   return o;
}
function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}
function FE3sTexture_bitmaps(){
   return this._bitmaps;
}
function FE3sTexture_bitmapPacks(){
   return this._bitmapPacks;
}
function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmapPack);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}
function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = RObject.free(o._bitmaps);
   o._bitmapPacks = RObject.free(o._bitmapPacks);
   o.__base.FE3sResource.dispose.call(o);
}
function FE3sTextureBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._packCode   = null;
   o.packCode    = FE3sTextureBitmap_packCode;
   o.unserialize = FE3sTextureBitmap_unserialize;
   return o;
}
function FE3sTextureBitmap_packCode(){
   return this._packCode;
}
function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._packCode = p.readString();
}
function FE3sTextureBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._data       = null;
   o._typeName   = null;
   o._formatName = null;
   o.data        = FE3sTextureBitmapPack_data;
   o.unserialize = FE3sTextureBitmapPack_unserialize;
   o.dispose     = FE3sTextureBitmapPack_dispose;
   return o;
}
function FE3sTextureBitmapPack_data(){
   return this._data;
}
function FE3sTextureBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._formatName = p.readString();
   if(o._typeName == 'flat'){
      var c = p.readInt32();
      var d = o._data = new ArrayBuffer(c);
      p.readBytes(d, 0, c);
   }else if(o._typeName == 'cube'){
      o._data = new Array();
      for(var i = 0; i < 6; i++){
         var c = p.readInt32();
         var d = o._data[i] = new ArrayBuffer(c);
         p.readBytes(d, 0, c);
      }
   }else{
      throw new TError(o, 'Unserial texture failure ');
   }
}
function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   o.__base.FE3sObject.dispose.call(o);
}
function FE3sTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._textures = null;
   o._dataUrl  = '/cloud.content.texture.wv';
   o.construct = FE3sTextureConsole_construct;
   o.load      = FE3sTextureConsole_load;
   o.dispose   = FE3sModelConsole_dispose;
   return o;
}
function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new TDictionary();
}
function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var t = s.get(p);
   if(!t){
      var u = RBrowser.hostPath(o._dataUrl + '?guid=' + p);
      if(RRuntime.isDebug()){
         u += '&date=' + RDate.format();
      }
      t = RClass.create(FE3sTexture);
      t.load(u);
      s.set(p, t);
   }
   return t;
}
function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = RObject.free(o._textures);
   o.__base.FConsole.dispose.call(o);
}
function FE3sTheme(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._materials  = null;
   o.materials   = FE3sTheme_materials;
   o.find        = FE3sTheme_find;
   o.unserialize = FE3sTheme_unserialize;
   return o;
}
function FE3sTheme_materials(){
   return this._materials;
}
function FE3sTheme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}
function FE3sTheme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FE3sMaterial);
         m.unserialize(p);
         s.set(m.code(), m);
      }
   }
}
function FE3sThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   o.construct    = FE3sThemeConsole_construct;
   o.activeTheme  = FE3sThemeConsole_activeTheme;
   o.find         = FE3sThemeConsole_find;
   o.select       = FE3sThemeConsole_select;
   return o;
}
function FE3sThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FE3sThemeConsole_activeTheme(){
   return this._activeTheme;
}
function FE3sThemeConsole_find(p){
   var t = this._activeTheme;
   if(t == null){
      throw new TError('Active theme is empty.');
   }
   return t.find(p);
}
function FE3sThemeConsole_select(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FE3sTheme);
      r.load(u);
      o._themes.set(p, r);
   }
   o._activeTheme = r;
   return r;
}
function FE3sTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._optionBoneScale = false;
   o._boneIndex       = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frameCount      = null;
   o._frames          = null;
   o.construct        = FE3sTrack_construct;
   o.boneIndex        = FE3sTrack_boneIndex;
   o.frameTick        = FE3sTrack_frameTick;
   o.matrix           = FE3sTrack_matrix;
   o.matrixInvert     = FE3sTrack_matrixInvert;
   o.frames           = FE3sTrack_frames;
   o.calculate        = FE3sTrack_calculate;
   o.unserialize      = FE3sTrack_unserialize;
   return o;
}
function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FE3sTrack_boneIndex(){
   return this._boneIndex;
}
function FE3sTrack_frameTick(){
   return this._frameTick;
}
function FE3sTrack_matrix(){
   return this._matrix;
}
function FE3sTrack_matrixInvert(){
   return this._matrixInvert;
}
function FE3sTrack_frames(){
   return this._frames;
}
function FE3sTrack_calculate(pi, pt){
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
function FE3sTrack_unserialize(p){
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
         var f = RClass.create(FE3sFrame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
