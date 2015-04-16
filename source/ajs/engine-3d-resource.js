var EE3sResource = new function EE3sResource(){
   var o = this;
   o.Unknown  = 'Unknown';
   o.Bitmap   = 'Bitmap';
   o.Material = 'Material';
   o.Mesh     = 'Mesh';
   o.Model    = 'Model';
   o.Template = 'Template';
   o.Scene    = 'Scene';
   o.Project  = 'Project';
   return o;
}
function ME3sGeometry(o){
   o = RClass.inherits(this, o);
   o._outline         = null;
   o._streams         = null;
   o.construct        = ME3sGeometry_construct;
   o.outline          = ME3sGeometry_outline;
   o.findStream       = ME3sGeometry_findStream;
   o.streams          = ME3sGeometry_streams;
   o.calculateOutline = ME3sGeometry_calculateOutline;
   o.dispose          = ME3sGeometry_dispose;
   return o;
}
function ME3sGeometry_construct(){
   var o = this;
   o._outline = new SOutline3d();
}
function ME3sGeometry_outline(){
   return this._outline;
}
function ME3sGeometry_findStream(code){
   var o = this;
   var streams = o._streams;
   var count = streams.count();
   for(n = 0; n < count; n++){
      var stream = streams.getAt(n);
      if(stream.code() == code){
         return stream;
      }
   }
   return null;
}
function ME3sGeometry_streams(){
   return this._streams;
}
function ME3sGeometry_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var stream = o.findStream('position');
      var dataCount = stream.dataCount();
      var data = new Float32Array(stream.data())
      var index = 0;
      for(var i = 0; i < dataCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}
function ME3sGeometry_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   o.__base.FE3sSpace.dispose.call(o);
}
function SE3sCompressEvent(w, f, d){
   var o = this;
   o.owner   = w;
   o.process = f;
   o.data    = d;
   return o;
}
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
   o.optionDouble = p.readBoolean();
   o.optionNormalInvert = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionAlpha = p.readBoolean();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.optionColor = p.readBoolean();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.optionAmbient = p.readBoolean();
   o.ambientColor.unserialize(p);
   o.optionDiffuse = p.readBoolean();
   o.diffuseColor.unserialize(p);
   o.optionDiffuseView = p.readBoolean();
   o.diffuseViewColor.unserialize(p);
   o.optionSpecular = p.readBoolean();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularLevel = p.readFloat();
   o.optionSpecularView = p.readBoolean();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewLevel = p.readFloat();
   o.optionReflect = p.readBoolean();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.optionRefract = p.readBoolean();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.optionOpacity = p.readBoolean();
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   o.optionEmissive = p.readBoolean();
   o.emissiveColor.unserialize(p);
}
function SE3sMaterialInfo_saveConfig(p){
   var o = this;
   p.set('effect_code', o.effectCode);
   p.setBoolean('option_double', o.optionDouble);
   p.setBoolean('option_alpha', o.optionAlpha);
   p.setBoolean('option_normal_invert', o.optionNormalInvert);
   p.setBoolean('option_shadow', o.optionShadow);
   p.setBoolean('option_shadow_self', o.optionShadowSelf);
   var x = p.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = p.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('rate', o.colorRate);
   x.setFloat('merge', o.colorMerge);
   var x = p.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   var x = p.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   var x = p.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   var x = p.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = p.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = p.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   var x = p.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   var x = p.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   var x = p.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
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
   o._model        = null;
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
function FE3sCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName    = null;
   o._position    = null;
   o._direction   = null;
   o._projection  = null;
   o.construct    = FE3sCamera_construct;
   o.typeName     = FE3sCamera_typeName;
   o.position     = FE3sCamera_position;
   o.direction    = FE3sCamera_direction;
   o.projection   = FE3sCamera_projection;
   o.unserialize  = FE3sCamera_unserialize;
   return o;
}
function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sProjection);
}
function FE3sCamera_typeName(){
   return this._typeName;
}
function FE3sCamera_position(){
   return this._position;
}
function FE3sCamera_direction(){
   return this._direction;
}
function FE3sCamera_projection(){
   return this._projection;
}
function FE3sCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FE3sComponent(o){
   o = RClass.inherits(this, o, FE3sObject);
   return o;
}
function FE3sDisplay(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   o._outline         = null;
   o._renderables     = null;
   o.construct        = FE3sDisplay_construct;
   o.renderables      = FE3sDisplay_renderables;
   o.calculateOutline = FE3sDisplay_calculateOutline;
   o.unserialize      = FE3sDisplay_unserialize;
   return o;
}
function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o._outline = new SOutline3d();
}
function FE3sDisplay_renderables(){
   return this._renderables;
}
function FE3sDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.getAt(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new TObjects();
      for(var i = 0; i < renderableCount; i++){
         var renderable = resourceConsole.unserialize(input);
         renderables.push(renderable);
      }
   }
}
function FE3sDisplayContainer(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   o._displays        = null;
   o.construct        = FE3sDisplayContainer_construct;
   o.displays         = FE3sDisplayContainer_displays;
   o.calculateOutline = FE3sDisplayContainer_calculateOutline;
   o.unserialize      = FE3sDisplayContainer_unserialize;
   return o;
}
function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}
function FE3sDisplayContainer_displays(){
   return this._displays;
}
function FE3sDisplayContainer_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.getAt(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sDisplayContainer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, input);
}
function FE3sDisplayLayer(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeCd        = null;
   o._transformCd   = null;
   o._displays      = null;
   o.typeCd         = FE3sDisplayLayer_typeCd;
   o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
   o.transformCd    = FE3sDisplayLayer_transformCd;
   o.setTransformCd = FE3sDisplayLayer_setTransformCd;
   o.displays       = FE3sDisplayLayer_displays;
   o.unserialize    = FE3sDisplayLayer_unserialize;
   o.saveConfig     = FE3sDisplayLayer_saveConfig;
   return o;
}
function FE3sDisplayLayer_typeCd(){
   return this._typeCd;
}
function FE3sDisplayLayer_setTypeCd(p){
   this._typeCd = p;
}
function FE3sDisplayLayer_transformCd(){
   return this._transformCd;
}
function FE3sDisplayLayer_setTransformCd(p){
   this._transformCd = p;
}
function FE3sDisplayLayer_displays(){
   return this._displays;
}
function FE3sDisplayLayer_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeCd = p.readString();
   o._transformCd = p.readString();
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
function FE3sDisplayLayer_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('type_cd', o._typeCd);
   p.set('transform_cd', o._transformCd);
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
}
function FE3sDisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._groupGuid  = null;
   o._material   = null;
   o.groupGuid   = FE3sDisplayMaterial_groupGuid;
   o.material    = FE3sDisplayMaterial_material;
   o.unserialize = FE3sDisplayMaterial_unserialize;
   return o;
}
function FE3sDisplayMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sDisplayMaterial_material(){
   return this._material;
}
function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
function FE3sDrawable(o){
   o = RClass.inherits(this, o, FE3sComponent);
   o._matrix     = null;
   o.construct   = FE3sDrawable_construct;
   o.matrix      = FE3sDrawable_matrix;
   o.unserialize = FE3sDrawable_unserialize;
   o.saveConfig  = FE3sDrawable_saveConfig;
   return o;
}
function FE3sDrawable_construct(){
   var o = this;
   o.__base.FE3sComponent.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sDrawable_matrix(){
   return this._matrix;
}
function FE3sDrawable_unserialize(input){
   var o = this;
   o.__base.FE3sComponent.unserialize.call(o, input);
   o._matrix.unserialize(input);
}
function FE3sDrawable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sComponent.saveConfig.call(o, xconfig);
   o._matrix.saveConfig(xconfig.create('Matrix'));
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
function FE3sGeometry(o){
   o = RClass.inherits(this, o, FE3sDrawable, ME3sGeometry);
   o.construct     = FE3sGeometry_construct;
   o.unserialize   = FE3sGeometry_unserialize;
   o.dispose       = FE3sGeometry_dispose;
   return o;
}
function FE3sGeometry_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}
function FE3sGeometry_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   o._outline.unserialize(input);
   o._outline.update();
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
}
function FE3sGeometry_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sDrawable.dispose.call(o);
}
function FE3sLight(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName   = null;
   o._material   = null;
   o._camera     = null;
   o.construct   = FE3sLight_construct;
   o.typeName    = FE3sLight_typeName;
   o.material    = FE3sLight_material;
   o.camera      = FE3sLight_camera;
   o.unserialize = FE3sLight_unserialize;
   return o;
}
function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
}
function FE3sLight_typeName(){
   return this._typeName;
}
function FE3sLight_material(){
   return this._material;
}
function FE3sLight_camera(){
   return this._camera;
}
function FE3sLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._info        = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o.construct    = FE3sMaterial_construct;
   o.effectCode   = FE3sMaterial_effectCode;
   o.info         = FE3sMaterial_info;
   o.bitmaps      = FE3sMaterial_bitmaps;
   o.bitmapPacks  = FE3sMaterial_bitmapPacks;
   o.unserialize  = FE3sMaterial_unserialize;
   o.saveConfig   = FE3sMaterial_saveConfig;
   return o;
}
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
function FE3sMaterial_info(){
   return this._info;
}
function FE3sMaterial_bitmaps(){
   return this._bitmaps;
}
function FE3sMaterial_bitmapPacks(){
   return this._bitmapPacks;
}
function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._info.unserialize(input);
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = RClass.create(FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = RClass.create(FE3sMaterialBitmap);
         bitmap.unserialize(input);
         bitmaps.push(bitmap);
         var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
         bitmap.setBitmapPack(pack);
      }
   }
}
function FE3sMaterial_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._info.saveConfig(p);
}
function FE3sMaterialBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._bitmapPackGuid = null;
   o._bitmapPack     = null;
   o._bitmapGuid     = null;
   o._index          = 0;
   o.bitmapPackGuid  = FE3sMaterialBitmap_bitmapPackGuid;
   o.bitmapPack      = FE3sMaterialBitmap_bitmapPack;
   o.setBitmapPack   = FE3sMaterialBitmap_setBitmapPack;
   o.bitmapGuid      = FE3sMaterialBitmap_bitmapGuid;
   o.unserialize     = FE3sMaterialBitmap_unserialize;
   return o;
}
function FE3sMaterialBitmap_bitmapPackGuid(){
   return this._bitmapPackGuid;
}
function FE3sMaterialBitmap_bitmapPack(){
   return this._bitmapPack;
}
function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
   this._bitmapPack = bitmapPack;
}
function FE3sMaterialBitmap_bitmapGuid(){
   return this._bitmapGuid;
}
function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
function FE3sMaterialBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName       = null;
   o._formatName     = null;
   o._size           = null;
   o.construct       = FE3sMaterialBitmapPack_construct;
   o.typeName        = FE3sMaterialBitmapPack_typeName;
   o.formatName      = FE3sMaterialBitmapPack_formatName;
   o.size            = FE3sMaterialBitmapPack_size;
   o.unserialize     = FE3sMaterialBitmapPack_unserialize;
   o.dispose         = FE3sMaterialBitmapPack_dispose;
   return o;
}
function FE3sMaterialBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}
function FE3sMaterialBitmapPack_typeName(){
   return this._typeName;
}
function FE3sMaterialBitmapPack_formatName(){
   return this._formatName;
}
function FE3sMaterialBitmapPack_size(){
   return this._size;
}
function FE3sMaterialBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._formatName = p.readString();
   o._size.width = p.readUint16();
   o._size.height = p.readUint16();
}
function FE3sMaterialBitmapPack_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o.__base.FE3sObject.dispose.call(o);
}
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._materials  = null;
   o.construct   = FE3sMaterialConsole_construct;
   o.find        = FE3sMaterialConsole_find;
   o.unserialize = FE3sMaterialConsole_unserialize;
   return o;
}
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materials = new TDictionary();
}
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
function FE3sMaterialConsole_unserialize(p){
   var o = this;
   var material = RClass.create(FE3sMaterial);
   material.unserialize(p);
   o._materials.set(material.guid(), material);
   return material;
}
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sSpace, ME3sGeometry);
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   o._display      = null;
   o._renderable   = null;
   o.construct     = FE3sMesh_construct;
   o.unserialize   = FE3sMesh_unserialize;
   o.saveConfig    = FE3sMesh_saveConfig;
   o.dispose       = FE3sMesh_dispose;
   return o;
}
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   o._display = RClass.create(FE3sMeshDisplay);
}
function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   o._outline.unserialize(input);
   o._outline.update();
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = RClass.create(FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   o._display.unserialize(input);
   o._renderable = o._display._renderable;
}
function FE3sMesh_saveConfig(config){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, config);
   o._display.saveConfig(config.create('Display'));
}
function FE3sMesh_dispose(){
   var o = this;
   o._outline = RObject.dispose(o._outline);
   o._display = RObject.dispose(o._display);
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
function FE3sMeshConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   o._meshs      = null;
   o.construct   = FE3sMeshConsole_construct;
   o.find        = FE3sMeshConsole_find;
   o.meshs       = FE3sMeshConsole_meshs;
   o.loadByGuid  = FE3sMeshConsole_loadByGuid;
   o.loadByCode  = FE3sMeshConsole_loadByCode;
   o.dispose     = FE3sMeshConsole_dispose;
   return o;
}
function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._meshs = new TDictionary();
}
function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}
function FE3sMeshConsole_meshs(){
   return this._meshs;
}
function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sMeshConsole_loadByCode(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = RObject.free(o._meshs);
   o.__base.FConsole.dispose.call(o);
}
function FE3sMeshDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._matrix     = null;
   o._material   = null;
   o._renderable = null;
   o.construct   = FE3sMeshDisplay_construct;
   o.matrix      = FE3sMeshDisplay_matrix;
   o.material    = FE3sMeshDisplay_material;
   o.renderable  = FE3sMeshDisplay_renderable;
   o.unserialize = FE3sMeshDisplay_unserialize;
   o.saveConfig  = FE3sMeshDisplay_saveConfig;
   return o;
}
function FE3sMeshDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FE3sMaterial);
   o._renderable = RClass.create(FE3sRenderable);
}
function FE3sMeshDisplay_matrix(){
   return this._matrix;
}
function FE3sMeshDisplay_material(){
   return this._material;
}
function FE3sMeshDisplay_renderable(){
   return this._renderable;
}
function FE3sMeshDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._matrix.unserialize(p);
   o._material.unserialize(p);
   o._renderable.unserialize(p);
}
function FE3sMeshDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._matrix.saveConfig(p.create('Matrix'));
   o._material.saveConfig(p.create('Material'));
   o._renderable.saveConfig(p.create('Renderable'));
}
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._dataCompress  = true;
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   o._display       = null;
   o.construct      = FE3sModel_construct;
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   o.display        = FE3sModel_display;
   o.unserialize    = FE3sModel_unserialize;
   o.saveConfig     = FE3sModel_saveConfig;
   return o;
}
function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   var display = o._display = RClass.create(FE3sModelDisplay);
   display._model = o;
}
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
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
function FE3sModel_display(){
   return this._display;
}
function FE3sModel_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var modelConsole = RConsole.find(FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new TDictionary();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         var meshGuid = mesh.guid();
         meshes.set(meshGuid, mesh);
      }
   }
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new TObjects();
      for(var i = 0; i < animationCount; i++){
         var animation = modelConsole.unserialAnimation(o, input)
         animations.push(animation);
      }
   }
   var display = o._display;
   display.unserialize(input);
   var renderables = display.renderables();
   if(renderables){
      var renderableCount = renderables.count();
      for(var i = 0; i < renderableCount; i++){
         var renderable = renderables.get(i);
         var meshGuid = renderable.meshGuid();
         var mesh = meshes.get(meshGuid);
         renderable.setMesh(mesh);
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FE3sModel_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   o._display.saveConfig(xconfig.create('Display'));
}
function FE3sModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
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
   var rc = RConsole.find(FResourceConsole);
   var rp = RClass.create(FResourcePipeline);
   var rt = RClass.create(FResourceType);
   rt.setCode('resource3d.model');
   rt._pipeline = rp;
   rc.registerType(rt);
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
   var r = RClass.create(FE3sModelMesh);
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
function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = RClass.create(FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_load(guid){
   var o = this;
   var models = o._models;
   var model = models.get(guid);
   if(model){
      return model;
   }
   var vendor = RConsole.find(FE3sVendorConsole).find('model');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   model = RClass.create(FE3sModel);
   model.setGuid(guid);
   model.setVendor(vendor);
   model.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(model);
   models.set(guid, model);
   return model;
}
function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
function FE3sModelDisplay(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   o._model           = null;
   o._material        = null;
   o.construct        = FE3sModelDisplay_construct;
   o.material         = FE3sModelDisplay_material;
   o.calculateOutline = FE3sModelDisplay_calculateOutline;
   o.unserialize      = FE3sModelDisplay_unserialize;
   o.saveConfig       = FE3sModelDisplay_saveConfig;
   return o;
}
function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = RClass.create(FE3sMaterial);
}
function FE3sModelDisplay_material(){
   return this._material;
}
function FE3sModelDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var meshes = o._model.meshes();
      if(meshes){
         outline.setMin();
         var count = meshes.count();
         for(var i = 0; i < count; i++){
            var mesh = meshes.at(i);
            var meshOutline = mesh.calculateOutline();
            outline.mergeMax(meshOutline);
         }
         outline.update();
      }
   }
   return outline;
}
function FE3sModelDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, p);
   o._material.unserialize(p);
}
function FE3sModelDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, p);
   o._material.saveConfig(p.create('Material'));
}
function FE3sModelMesh(o){
   o = RClass.inherits(this, o, FE3sGeometry);
   return o;
}
function FE3sModelRenderable(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   o._meshGuid   = null;
   o._mesh       = null;
   o.construct   = FE3sModelRenderable_construct;
   o.meshGuid    = FE3sModelRenderable_meshGuid;
   o.mesh        = FE3sModelRenderable_mesh;
   o.setMesh     = FE3sModelRenderable_setMesh;
   o.unserialize = FE3sModelRenderable_unserialize;
   o.saveConfig  = FE3sModelRenderable_saveConfig;
   return o;
}
function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
function FE3sModelRenderable_meshGuid(){
   return this._meshGuid;
}
function FE3sModelRenderable_mesh(){
   return this._mesh;
}
function FE3sModelRenderable_setMesh(mesh){
   this._mesh = mesh;
}
function FE3sModelRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._meshGuid = input.readString();
}
function FE3sModelRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
   xconfig.set('mesh_guid', o._meshGuid);
}
function FE3sMovie(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FE3sMovie_construct;
   o.interval    = FE3sMovie_interval;
   o.rotation    = FE3sMovie_rotation;
   o.unserialize = FE3sMovie_unserialize;
   return o;
}
function FE3sMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new SVector3();
}
function FE3sMovie_interval(){
   return this._interval;
}
function FE3sMovie_rotation(){
   return this._rotation;
}
function FE3sMovie_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject);
   o._typeName   = null;
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FE3sObject_guid;
   o.code        = FE3sObject_code;
   o.setCode     = FE3sObject_setCode;
   o.label       = FE3sObject_label;
   o.setLabel    = FE3sObject_setLabel;
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
function FE3sObject_setCode(p){
   this._code = p;
}
function FE3sObject_label(){
   return this._label;
}
function FE3sObject_setLabel(p){
   this._label = p;
}
function FE3sObject_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}
function FE3sObject_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
function FE3sProjection(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FE3sProjection_angle;
   o.znear       = FE3sProjection_znear;
   o.zfar        = FE3sProjection_zfar;
   o.unserialize = FE3sProjection_unserialize;
   return o;
}
function FE3sProjection_angle(){
   return this._angle;
}
function FE3sProjection_znear(){
   return this._znear;
}
function FE3sProjection_zfar(){
   return this._zfar;
}
function FE3sProjection_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FE3sRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._optionBackground     = true;
   o._backgroundColor      = null;
   o._moveSpeed            = 0.1;
   o._rotationKeySpeed     = 0.005;
   o._rotationMouseSpeed   = 0.003;
   o._material             = null;
   o._camera               = null;
   o._light                = null;
   o.construct             = FE3sRegion_construct;
   o.optionBackground      = FE3sRegion_optionBackground;
   o.setOptionBackground   = FE3sRegion_setOptionBackground;
   o.backgroundColor       = FE3sRegion_backgroundColor;
   o.moveSpeed             = FE3sRegion_moveSpeed;
   o.setMoveSpeed          = FE3sRegion_setMoveSpeed;
   o.rotationKeySpeed      = FE3sRegion_rotationKeySpeed;
   o.setRotationKeySpeed   = FE3sRegion_setRotationKeySpeed;
   o.rotationMouseSpeed    = FE3sRegion_rotationMouseSpeed;
   o.setRotationMouseSpeed = FE3sRegion_setRotationMouseSpeed;
   o.camera                = FE3sRegion_camera;
   o.light                 = FE3sRegion_light;
   o.unserialize           = FE3sRegion_unserialize;
   o.saveConfig            = FE3sRegion_saveConfig;
   return o;
}
function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new SColor4();
   o._material = RClass.create(FE3sMaterial);
   o._camera = RClass.create(FE3sCamera);
   o._light = RClass.create(FE3sLight);
}
function FE3sRegion_optionBackground(){
   return this._optionBackground;
}
function FE3sRegion_setOptionBackground(p){
   this._optionBackground = p;
}
function FE3sRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3sRegion_moveSpeed(){
   return this._moveSpeed;
}
function FE3sRegion_setMoveSpeed(p){
   this._moveSpeed = p;
}
function FE3sRegion_rotationKeySpeed(){
   return this._rotationKeySpeed;
}
function FE3sRegion_setRotationKeySpeed(p){
   this._rotationKeySpeed = p;
}
function FE3sRegion_rotationMouseSpeed(){
   return this._rotationMouseSpeed;
}
function FE3sRegion_setRotationMouseSpeed(p){
   this._rotationMouseSpeed = p;
}
function FE3sRegion_camera(){
   return this._camera;
}
function FE3sRegion_light(){
   return this._light;
}
function FE3sRegion_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._backgroundColor.unserialize(p);
   o._moveSpeed = p.readFloat();
   o._rotationKeySpeed = p.readFloat();
   o._rotationMouseSpeed = p.readFloat();
   o._material.unserialize(p);
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FE3sRegion_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('color', o._backgroundColor.toString());
   p.setFloat('move_speed', o._moveSpeed);
   p.setFloat('rotation_key_speed', o._rotationKeySpeed);
   p.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
}
function FE3sRenderable(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   return o;
}
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource);
   o._dataLoad     = false;
   o._dataReady    = false;
   o._dataSize     = 0;
   o._dataCompress = false;
   o._lsnsLoad     = null;
   o._vendor       = null;
   o.onComplete    = FE3sResource_onComplete;
   o.vendor        = FE3sResource_vendor;
   o.setVendor     = FE3sResource_setVendor;
   o.loadListener  = FE3sResource_loadListener;
   o.testReady     = FE3sResource_testReady;
   o.unserialize   = FE3sResource_unserialize;
   o.saveConfig    = FE3sResource_saveConfig;
   o.load          = FE3sResource_load;
   o.dispose       = FE3sResource_dispose;
   return o;
}
function FE3sResource_onComplete(p){
   var o = this;
   var v = RClass.create(FDataView);
   v.setEndianCd(true);
   if(p.constructor == Array){
      var pb = new Uint8Array(p);
      v.link(pb.buffer);
   }else if(p.constructor == Uint8Array){
      v.link(p.buffer);
   }else{
      v.link(p.outputData());
   }
   o.unserialize(v);
   v.dispose();
   o._dataReady = true;
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FE3sResource_vendor(){
   return this._vendor;
}
function FE3sResource_setVendor(p){
   this._vendor = p;
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
   o._typeName = p.readString();
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
   if(o._dataCompress){
      c.lsnsLoad.register(o, o.onLoad);
   }else{
      c.lsnsLoad.register(o, o.onComplete);
   }
   o._dataLoad = true;
}
function FE3sResource_dispose(){
   var o = this;
   o._lsnsLoad = null;
   o._vendor = null;
   o.__base.FConsole.dispose.call(o);
}
function FE3sResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._factory            = null;
   o.construct           = FE3sResourceConsole_construct;
   o.factory             = FE3sResourceConsole_factory;
   o.create              = FE3sResourceConsole_create;
   o.unserializeResource = FE3sResourceConsole_unserializeResource;
   o.unserialize         = FE3sResourceConsole_unserialize;
   return o;
}
function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var factory = o._factory = RClass.create(FClassFactory);
   factory.register('Shape', FE3sShape);
   factory.register('Sprite', FE3sSprite);
   factory.register('ModelMesh', FE3sModelMesh);
   factory.register('ModelRenderable', FE3sModelRenderable);
}
function FE3sResourceConsole_factory(){
   return this._factory;
}
function FE3sResourceConsole_create(typeName){
   return this._factory.create(typeName);
}
function FE3sResourceConsole_unserializeResource(resource, input){
   var o = this;
   resource.unserialize(input);
}
function FE3sResourceConsole_unserialize(input){
   var o = this;
   var typeName = input.testString();
   var resource = o._factory.create(typeName);
   resource.unserialize(input);
   return resource;
}
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._dataCompress = true;
   o._typeName     = 'Scene';
   o._themeGuid    = null;
   o._themeCode    = null;
   o._textures     = null;
   o._templates    = null;
   o.construct     = FE3sScene_construct;
   o.unserialize   = FE3sScene_unserialize;
   o.saveConfig    = FE3sScene_saveConfig;
   return o;
}
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
}
function FE3sScene_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   o._themeGuid = p.readString();
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   var c = p.readInt16();
   if(c > 0){
      var tc = RConsole.find(FE3sTextureConsole);
      var s = o._textures = new TDictionary();
      for(var i = 0; i < c; i++){
         var t = tc.unserialize(p);
         s.set(t.guid(), t);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var tc = RConsole.find(FE3sTemplateConsole);
      var s = o._templates = new TDictionary();
      for(var i = 0; i < c; i++){
         var t = tc.unserialize(p);
         s.set(t.guid(), t);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._layers = new TDictionary();
      for(var i = 0; i < c; i++){
         var l = RClass.create(FE3sSceneLayer);
         l.unserialize(p);
         s.set(l.code(), l);
      }
   }
}
function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, p);
   p.set('theme_guid', o._themeGuid);
   p.set('theme_code', o._themeCode);
}
function FE3sSceneAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._playRate   = null;
   o.construct   = FE3sSceneAnimation_construct;
   o.playRate    = FE3sSceneAnimation_playRate;
   o.setPlayRate = FE3sSceneAnimation_setPlayRate;
   o.unserialize = FE3sSceneAnimation_unserialize;
   o.saveConfig  = FE3sSceneAnimation_saveConfig;
   return o;
}
function FE3sSceneAnimation_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
}
function FE3sSceneAnimation_playRate(){
   return this._playRate;
}
function FE3sSceneAnimation_setPlayRate(p){
   this._playRate = p;
}
function FE3sSceneAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._playRate = p.readFloat();
}
function FE3sSceneAnimation_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('play_rate', o._playRate);
}
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._venderCode = 'scene';
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   o._scenes     = null;
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
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sScene);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sSceneConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=updateTheme&date=' + RDate.format());
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._templateGuid        = null;
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   o._matrix              = null;
   o._animations          = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   o.construct            = FE3sSceneDisplay_construct;
   o.templateGuid         = FE3sSceneDisplay_templateGuid;
   o.matrix               = FE3sSceneDisplay_matrix;
   o.findAnimation        = FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
   o.animations           = FE3sSceneDisplay_animations;
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
function FE3sSceneDisplay_templateGuid(){
   return this._templateGuid;
}
function FE3sSceneDisplay_matrix(){
   return this._matrix;
}
function FE3sSceneDisplay_findAnimation(p){
   var o = this;
   var s = o._animations;
   if(s){
      return s.get(p);
   }
   return null;
}
function FE3sSceneDisplay_syncAnimation(p){
   var o = this;
   var s = o._animations;
   if(!s){
      s = o._animations = new TDictionary();
   }
   var a = s.get(p);
   if(!a){
      a = RClass.create(FE3sSceneAnimation);
      a._guid = p;
      s.set(p, a);
   }
   return a;
}
function FE3sSceneDisplay_animations(){
   return this._animations;
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
   o._templateGuid = p.readString();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._animations = new TDictionary();
      for(var i = 0; i < c; i++){
         var a = RClass.create(FE3sSceneAnimation);
         a.unserialize(p);
         s.set(a.guid(), a);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sMovie);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sMaterial);
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
   var s = o._animations;
   if(s){
      var c = s.count();
      var xs = p.create('AnimationCollection');
      for(var i = 0; i < c; i++){
         s.valueAt(i).saveConfig(xs.create('Animation'));
      }
   }
   var s = o._materials;
   if(s){
      var c = s.count();
      var xs = p.create('MaterialCollection');
      for(var i = 0; i < c; i++){
         s.getAt(i).saveConfig(xs.create('Material'));
      }
   }
}
function FE3sSceneLayer(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeCd        = null;
   o._transformCd   = null;
   o._displays      = null;
   o.typeCd         = FE3sSceneLayer_typeCd;
   o.setTypeCd      = FE3sSceneLayer_setTypeCd;
   o.transformCd    = FE3sSceneLayer_transformCd;
   o.setTransformCd = FE3sSceneLayer_setTransformCd;
   o.displays       = FE3sSceneLayer_displays;
   o.unserialize    = FE3sSceneLayer_unserialize;
   o.saveConfig     = FE3sSceneLayer_saveConfig;
   return o;
}
function FE3sSceneLayer_typeCd(){
   return this._typeCd;
}
function FE3sSceneLayer_setTypeCd(p){
   this._typeCd = p;
}
function FE3sSceneLayer_transformCd(){
   return this._transformCd;
}
function FE3sSceneLayer_setTransformCd(p){
   this._transformCd = p;
}
function FE3sSceneLayer_displays(){
   return this._displays;
}
function FE3sSceneLayer_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeCd = p.readString();
   o._transformCd = p.readString();
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
   p.set('type_cd', o._typeCd);
   p.set('transform_cd', o._transformCd);
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
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
function FE3sShape(o){
   o = RClass.inherits(this, o, FE3sRenderable);
   o._modelGuid    = null;
   o._model        = null;
   o._meshGuid     = null;
   o._mesh         = null;
   o._materialGuid = null;
   o._material     = null;
   o.construct     = FE3sShape_construct;
   o.modelGuid     = FE3sShape_modelGuid;
   o.model         = FE3sShape_model;
   o.meshGuid      = FE3sShape_meshGuid;
   o.mesh          = FE3sShape_mesh;
   o.materialGuid  = FE3sShape_materialGuid;
   o.material      = FE3sShape_material;
   o.unserialize   = FE3sShape_unserialize;
   return o;
}
function FE3sShape_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
function FE3sShape_modelGuid(){
   return this._modelGuid;
}
function FE3sShape_model(){
   var o = this;
   var model = o._model;
   if(!model){
      model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
   }
   return model;
}
function FE3sShape_meshGuid(){
   return this._meshGuid;
}
function FE3sShape_mesh(){
   var o = this;
   var mesh = o._mesh;
   if(!mesh){
      mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
   }
   return mesh;
}
function FE3sShape_materialGuid(){
   return this._materialGuid;
}
function FE3sShape_material(){
   var o = this;
   var material = o._material;
   if(!material){
      material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
   }
   return material;
}
function FE3sShape_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._modelGuid = input.readString();
   o._meshGuid = input.readString();
   o._materialGuid = input.readString();
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
function FE3sSpace(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._typeName   = null;
   o._technique  = null;
   o._region     = null;
   o._materials  = null;
   o._displays   = null;
   o._layers     = null;
   o.construct   = FE3sSpace_construct;
   o.technique   = FE3sSpace_technique;
   o.region      = FE3sSpace_region;
   o.materials   = FE3sSpace_materials;
   o.displays    = FE3sSpace_displays;
   o.layers      = FE3sSpace_layers;
   o.unserialize = FE3sSpace_unserialize;
   o.saveConfig  = FE3sSpace_saveConfig;
   return o;
}
function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sTechnique);
   o._region = RClass.create(FE3sRegion);
}
function FE3sSpace_technique(){
   return this._technique;
}
function FE3sSpace_region(){
   return this._region;
}
function FE3sSpace_materials(){
   return this._materials;
}
function FE3sSpace_displays(){
   return this._displays;
}
function FE3sSpace_layers(){
   return this._layers;
}
function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   var materialConsole = RConsole.find(FE3sMaterialConsole);
   o._technique.unserialize(input);
   o._region.unserialize(input);
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = RClass.create(FE3sDisplayLayer);
         layer.unserialize(input);
         layers.set(layer.code(), layer);
      }
   }
}
function FE3sSpace_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
   p.setName(o._typeName);
   o._technique.saveConfig(p.create('Technique'));
   o._region.saveConfig(p.create('Region'));
   var layers = o._layers;
   if(layers){
      var xlayers = p.create('LayerCollection');
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.valueAt(i);
         layer.saveConfig(xlayers.create('Layer'));
      }
   }
}
function FE3sSprite(o){
   o = RClass.inherits(this, o, FE3sDisplayContainer);
   o._materials  = null;
   o.construct   = FE3sSprite_construct;
   o.materials   = FE3sSprite_materials;
   o.unserialize = FE3sSprite_unserialize;
   return o;
}
function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}
function FE3sSprite_materials(){
   return this._materials;
}
function FE3sSprite_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = RConsole.find(FE3sMaterialConsole);
      var materials = o._materials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
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
   o._formatCd         = EG3dAttributeFormat.Unknown;
   o.code              = FE3sStream_code;
   o.elementDataCd     = FE3sStream_elementDataCd;
   o.formatCd          = FE3sStream_formatCd;
   o.dataStride        = FE3sStream_dataStride;
   o.dataCount         = FE3sStream_dataCount;
   o.data              = FE3sStream_data;
   o.unserialize       = FE3sStream_unserialize;
   o.dispose           = FE3sStream_dispose;
   return o;
}
function FE3sStream_code(){
   return this._code;
}
function FE3sStream_elementDataCd(){
   return this._elementDataCd;
}
function FE3sStream_formatCd(){
   return this._formatCd;
}
function FE3sStream_dataStride(){
   return this._dataStride;
}
function FE3sStream_dataCount(){
   return this._dataCount;
}
function FE3sStream_data(){
   return this._data;
}
function FE3sStream_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._elementDataCd = input.readUint8();
   o._elementCount = input.readUint8();
   o._elementNormalize = input.readBoolean();
   var dataStride = o._dataStride = input.readUint8();
   var dataCount = o._dataCount = input.readInt32();
   var dataLength = o._dataLength = dataStride * dataCount;
   var data = o._data = new ArrayBuffer(dataLength);
   input.readBytes(data, 0, dataLength);
}
function FE3sStream_dispose(){
   var o = this;
   o.data = null;
   o.__base.FObject.dispose.call(o);
}
function FE3sTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._techniqueCode = null;
   o._passes        = null;
   o.passes         = FE3sTechnique_passes;
   o.unserialize    = FE3sTechnique_unserialize;
   o.saveConfig     = FE3sTechnique_saveConfig;
   return o;
}
function FE3sTechnique_passes(){
   return this._passes;
}
function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = RClass.create(FE3sTechniquePass);
         pass.unserialize(input);
         passes.push(pass);
      }
   }
}
function FE3sTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('technique_code', o._techniqueCode);
}
function FE3sTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FE3sTechniquePass_targetWidth;
   o.targetHeight  = FE3sTechniquePass_targetHeight;
   o.unserialize   = FE3sTechniquePass_unserialize;
   return o;
}
function FE3sTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FE3sTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
function FE3sTemplate(o){
   o = RClass.inherits(this, o, FE3sSpace);
   o._dataCompress = true;
   return o;
}
function FE3sTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o.construct   = FE3sTemplateConsole_construct;
   o.unserialize = FE3sTemplateConsole_unserialize;
   o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = FE3sTemplateConsole_loadByCode;
   o.update      = FE3sTemplateConsole_update;
   return o;
}
function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FE3sTemplateConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sTemplate);
   r._dataReady = true;
   r.unserialize(p);
   o._templates.set(r.guid(), r);
   return r;
}
function FE3sTemplateConsole_loadByGuid(p){
   var o = this;
   var s = o._templates;
   var r = s.get(p);
   if(!r){
      var v = RConsole.find(FE3sVendorConsole).find('template');
      v.set('guid', p);
      var u = v.makeUrl();
      r = RClass.create(FE3sTemplate);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
   }
   return r;
}
function FE3sTemplateConsole_loadByCode(p){
   var o = this;
   var s = o._templates;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find('template');
   v.set('code', p);
   var u = v.makeUrl();
   r = RClass.create(FE3sTemplate);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sTemplateConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   RConsole.find(FXmlConsole).send(u, p);
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
   o._dataCompress = true;
   o._bitmaps      = null;
   o._bitmapPacks  = null;
   o.construct     = FE3sTexture_construct;
   o.bitmaps       = FE3sTexture_bitmaps;
   o.bitmapPacks   = FE3sTexture_bitmapPacks;
   o.unserialize   = FE3sTexture_unserialize;
   o.dispose       = FE3sTexture_dispose;
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
         b._texture = o;
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
   o._optionCompress = null;
   o._size           = null;
   o._data           = null;
   o._typeName       = null;
   o._formatName     = null;
   o.construct       = FE3sTextureBitmapPack_construct;
   o.optionCompress  = FE3sTextureBitmapPack_optionCompress;
   o.size            = FE3sTextureBitmapPack_size;
   o.data            = FE3sTextureBitmapPack_data;
   o.unserialize     = FE3sTextureBitmapPack_unserialize;
   o.dispose         = FE3sTextureBitmapPack_dispose;
   return o;
}
function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}
function FE3sTextureBitmapPack_optionCompress(){
   return this._optionCompress;
}
function FE3sTextureBitmapPack_size(){
   return this._size;
}
function FE3sTextureBitmapPack_data(){
   return this._data;
}
function FE3sTextureBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._formatName = p.readString();
   o._size.width = p.readUint16();
   o._size.height = p.readUint16();
   if(o._typeName == 'flat'){
      var c = p.readInt32();
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
   o._textures   = null;
   o.construct   = FE3sTextureConsole_construct;
   o.unserialize = FE3sTextureConsole_unserialize;
   o.load        = FE3sTextureConsole_load;
   o.loadBitmap  = FE3sTextureConsole_loadBitmap;
   o.dispose     = FE3sModelConsole_dispose;
   return o;
}
function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new TDictionary();
}
function FE3sTextureConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sTexture);
   r._dataReady = true;
   r.unserialize(p);
   o._textures.set(r.guid(), r);
   return r;
}
function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = RConsole.find(FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   r = RClass.create(FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   RConsole.find(FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
   return g;
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
   o._meshCode        = null;
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
   o._meshCode = p.readString();
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
function FE3sVendor(o){
   o = RClass.inherits(this, o, FObject);
   o._contentUrl   = null;
   o._parameters   = null;
   o.construct     = FE3sVendor_construct;
   o.contentUrl    = FE3sVendor_contentUrl;
   o.setContentUrl = FE3sVendor_setContentUrl;
   o.get           = FE3sVendor_get;
   o.set           = FE3sVendor_set;
   o.makeSource    = RMethod.virtual(o, 'makeSource');
   o.makeUrl       = FE3sVendor_makeUrl;
   o.reset         = FE3sVendor_reset;
   o.dispose       = FE3sVendor_dispose;
   return o;
}
function FE3sVendor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._parameters = new TAttributes();
}
function FE3sVendor_contentUrl(p){
   return this._contentUrl;
}
function FE3sVendor_setContentUrl(p){
   this._contentUrl = p;
}
function FE3sVendor_get(n){
   return this._parameters.get(n);
}
function FE3sVendor_set(n, v){
   this._parameters.set(n, v);
}
function FE3sVendor_makeUrl(){
   var o = this;
   var r = o.makeSource();
   if(RRuntime.isDebug()){
      if(r.indexOf('?') == -1){
         r += '?';
      }else{
         r += '&';
      }
      r += 'date=' + RDate.format();
   }
   return r;
}
function FE3sVendor_reset(){
   this._parameters.clear();
}
function FE3sVendor_dispose(){
   var o = this;
   o._parameters = RObject.dispose(o._parameters);
   o.__base.FObject.dispose.call(o);
}
function FE3sVendorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._setuped     = false;
   o._vendors     = null;
   o.construct    = FE3sVendorConsole_construct;
   o.createVendor = FE3sVendorConsole_createVendor;
   o.register     = FE3sVendorConsole_register;
   o.find         = FE3sVendorConsole_find;
   o.setup        = FE3sVendorConsole_setup;
   return o;
}
function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._vendors = new TDictionary();
}
function FE3sVendorConsole_createVendor(c, u){
   var v = RClass.create(c);
   v.setContentUrl(u);
   return v;
}
function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}
function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   var v = o._vendors.get(p);
   v.reset();
   return v;
}
function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
      o._vendors.set('mesh', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
      o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/texture/{guid}.bin')));
      o._vendors.set('mesh', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
      o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
function FE3sVendorLocal(o){
   o = RClass.inherits(this, o, FE3sVendor);
   o.makeSource = FE3sVendorLocal_makeSource;
   return o;
}
function FE3sVendorLocal_makeSource(){
   var o = this;
   var u = o._contentUrl;
   var s = o._parameters;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      u = RString.replace(u, '{' + n + '}', v);
   }
   return u;
}
function FE3sVendorNet(o){
   o = RClass.inherits(this, o, FE3sVendor);
   o.makeSource = FE3sVendorNet_makeSource;
   return o;
}
function FE3sVendorNet_makeSource(){
   var o = this;
   var u = o._contentUrl;
   if(u.indexOf('?') == -1){
      u += '?';
   }
   var s = o._parameters;
   var c = s.count();
   var f = false;
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      if(!RString.isEmpty(v)){
         if(f){
            u += '&';
         }else{
            f = true;
         }
         u += n + '=' + v;
      }
   }
   return u
}
