MO.EE3sResource = new function EE3sResource(){
   var o = this;
   o.Unknown  = 'Unknown';
   o.Bitmap   = 'Bitmap';
   o.Material = 'Material';
   o.Mesh     = 'Mesh';
   o.Model    = 'Model';
   o.Template = 'Template';
   o.Scene    = 'Scene';
   o.Project  = 'Project';
   o.All      = 'All';
   return o;
}
MO.ME3sGeometry = function ME3sGeometry(o){
   o = MO.Class.inherits(this, o);
   o._outline         = MO.Class.register(o, new MO.AGetter('_outline'));
   o._streams         = MO.Class.register(o, new MO.AGetter('_streams'));
   o.construct        = MO.ME3sGeometry_construct;
   o.findStream       = MO.ME3sGeometry_findStream;
   o.calculateOutline = MO.ME3sGeometry_calculateOutline;
   o.dispose          = MO.ME3sGeometry_dispose;
   return o;
}
MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
   var o = this;
   o._outline = new MO.SOutline3d();
}
MO.ME3sGeometry_findStream = function ME3sGeometry_findStream(code){
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
MO.ME3sGeometry_calculateOutline = function ME3sGeometry_calculateOutline(){
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
MO.ME3sGeometry_dispose = function ME3sGeometry_dispose(){
   var o = this;
   o._outline = MO.Lang.Object.dispose(o._outline);
   o.__base.FE3sSpace.dispose.call(o);
}
MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
   var o = this;
   o.owner   = w;
   o.process = f;
   o.data    = d;
   return o;
}
MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
   var o = this;
   MO.SG3dMaterialInfo.call(o);
   o.unserialize = MO.SE3sMaterialInfo_unserialize;
   o.saveConfig  = MO.SE3sMaterialInfo_saveConfig;
   return o;
}
MO.SE3sMaterialInfo_unserialize = function SE3sMaterialInfo_unserialize(input){
   var o = this;
   o.effectCode = input.readString();
   o.optionDepth = input.readBoolean();
   o.optionDouble = input.readBoolean();
   o.optionNormalInvert = input.readBoolean();
   o.optionShadow = input.readBoolean();
   o.optionShadowSelf = input.readBoolean();
   o.optionAlpha = input.readBoolean();
   o.alphaBase = input.readFloat();
   o.alphaRate = input.readFloat();
   o.optionColor = input.readBoolean();
   o.colorMin = input.readFloat();
   o.colorMax = input.readFloat();
   o.colorBalance = input.readFloat();
   o.colorRate = input.readFloat();
   o.optionVertex = input.readBoolean();
   o.vertexColor.unserialize(input);
   o.optionAmbient = input.readBoolean();
   o.ambientColor.unserialize(input);
   o.optionDiffuse = input.readBoolean();
   o.diffuseColor.unserialize(input);
   o.optionDiffuseView = input.readBoolean();
   o.diffuseViewColor.unserialize(input);
   o.optionSpecular = input.readBoolean();
   o.specularColor.unserialize(input);
   o.specularBase = input.readFloat();
   o.specularLevel = input.readFloat();
   o.optionSpecularView = input.readBoolean();
   o.specularViewColor.unserialize(input);
   o.specularViewBase = input.readFloat();
   o.specularViewLevel = input.readFloat();
   o.optionReflect = input.readBoolean();
   o.reflectColor.unserialize(input);
   o.reflectMerge = input.readFloat();
   o.optionRefract = input.readBoolean();
   o.refractFrontColor.unserialize(input);
   o.refractBackColor.unserialize(input);
   o.optionOpacity = input.readBoolean();
   o.opacityColor.unserialize(input);
   o.opacityRate = input.readFloat();
   o.opacityAlpha = input.readFloat();
   o.opacityDepth = input.readFloat();
   o.opacityTransmittance = input.readFloat();
   o.optionEmissive = input.readBoolean();
   o.emissiveColor.unserialize(input);
}
MO.SE3sMaterialInfo_saveConfig = function SE3sMaterialInfo_saveConfig(xconfig){
   var o = this;
   xconfig.set('effect_code', o.effectCode);
   xconfig.setBoolean('option_double', o.optionDouble);
   xconfig.setBoolean('option_alpha', o.optionAlpha);
   xconfig.setBoolean('option_normal_invert', o.optionNormalInvert);
   xconfig.setBoolean('option_shadow', o.optionShadow);
   xconfig.setBoolean('option_shadow_self', o.optionShadowSelf);
   var x = xconfig.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = xconfig.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('balance', o.colorBalance);
   x.setFloat('rate', o.colorRate);
   var x = xconfig.create('Vertex')
   x.setBoolean('valid', o.optionVertex);
   o.vertexColor.savePower(x);
   var x = xconfig.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   var x = xconfig.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   var x = xconfig.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   var x = xconfig.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = xconfig.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = xconfig.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   var x = xconfig.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   var x = xconfig.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   var x = xconfig.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
}
MO.SE3sSceneShadow = function SE3sSceneShadow(){
   var o = this;
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = MO.SE3sSceneShadow_unserialize;
   return o;
}
MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(input){
   var o = this;
   o.base = input.readFloat();
   o.rate = input.readFloat();
   o.level = input.readFloat();
   o.range = input.readFloat();
}
MO.FE3sAnimation = function FE3sAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._model           = null;
   o._skeletonGuid    = MO.Class.register(o, new MO.AGetter('_skeletonGuid'));
   o._skeleton        = null;
   o._frameCount      = MO.Class.register(o, new MO.AGetter('_frameCount'), 0);
   o._frameTick       = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._frameSpan       = MO.Class.register(o, new MO.AGetter('_frameSpan'), 0);
   o._frameTranslates = null;
   o._frameRotations  = null;
   o._frameScales     = null;
   o._tracks          = MO.Class.register(o, new MO.AGetter('_tracks'));
   o.skeleton         = MO.FE3sAnimation_skeleton;
   o.tracks           = MO.FE3sAnimation_tracks;
   o.unserialize      = MO.FE3sAnimation_unserialize;
   return o;
}
MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
   var o = this;
   var skeleton = o._skeleton;
   if(!skeleton){
      var guid = o._skeletonGuid;
      if(guid){
         skeleton = o._skeleton = MO.Console.find(MO.FE3sModelConsole).findSkeleton(guid);
      }
   }
   return skeleton;
}
MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._skeletonGuid = input.readString();
   o._frameCount = input.readUint16();
   o._frameTick = input.readUint16();
   o._frameSpan = input.readUint32();
   var translateCount = input.readUint32();
   var translateBytes = MO.Lang.Integer.strideByte(translateCount);
   if(translateCount > 0){
      var translates = o._frameTranslates = new MO.TObjects();
      for(var i = 0; i < translateCount; i++){
         var translate = new MO.SPoint3();
         translate.unserialize(input);
         translates.push(translate);
      }
   }
   var rotationCount = input.readUint32();
   var rotationBytes = MO.Lang.Integer.strideByte(rotationCount);
   if(rotationCount > 0){
      var rotations = o._frameRotations = new MO.TObjects();
      for(var i = 0; i < rotationCount; i++){
         var rotation = new MO.SQuaternion();
         rotation.unserialize(input);
         rotations.push(rotation);
      }
   }
   var scaleCount = input.readUint32();
   var scaleBytes = MO.Lang.Integer.strideByte(scaleCount);
   if(scaleCount > 0){
      var scales = o._frameScales = new MO.TObjects();
      for(var i = 0; i < scaleCount; i++){
         var scale = new MO.SVector3();
         scale.unserialize(input);
         scales.push(scale);
      }
   }
   var tracks = null;
   var trackCount = input.readUint16();
   if(trackCount > 0){
      tracks = o._tracks = new MO.TObjects();
      for(var n = 0; n < trackCount; n++){
         var track = MO.Class.create(MO.FE3sTrack);
         track.unserialize(input);
         tracks.push(track);
         var frameCount = track._frameCount;
         var frames = track._frames;
         for(var i = 0; i < frameCount; i++){
            var frame = MO.Class.create(MO.FE3sFrame);
            var translateIndex = 0;
            if(translateBytes == 4){
               translateIndex = input.readUint32();
            }else if(translateBytes == 2){
               translateIndex = input.readUint16();
            }else{
               translateIndex = input.readUint8();
            }
            frame._translation = translates.at(translateIndex);
            var rotationIndex = 0;
            if(rotationBytes == 4){
               rotationIndex = input.readUint32();
            }else if(rotationBytes == 2){
               rotationIndex = input.readUint16();
            }else{
               rotationIndex = input.readUint8();
            }
            frame._quaternion = rotations.at(rotationIndex);
            var scaleIndex = 0;
            if(scaleBytes == 4){
               scaleIndex = input.readUint32();
            }else if(scaleBytes == 2){
               scaleIndex = input.readUint16();
            }else{
               scaleIndex = input.readUint8();
            }
            frame._scale = scales.at(scaleIndex);
            frames.push(frame);
         }
      }
   }
   if(tracks && o._skeletonGuid){
      var skeleton = o.skeleton();
      for(var i = 0; i < trackCount; i++){
         var track = tracks.at(i);
         var boneIndex = track.boneIndex();
         var bone = skeleton.findBone(boneIndex);
         bone.setTrack(track);
      }
      skeleton.pushAnimation(o);
   }
}
MO.FE3sBone = function FE3sBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   o._bones      = MO.Class.register(o, new MO.AGetter('_bones'));
   o.unserialize = MO.FE3sBone_unserialize;
   return o;
}
MO.FE3sBone_unserialize = function FE3sBone_unserialize(input){
   var o = this;
   o._index = input.readUint8();
   var count = input.readUint8();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var bone = MO.Class.create(MO.FE3sBone);
         bone.unserialize(input);
         bones.push(bone);
      }
   }
}
MO.FE3sBoneRefer = function FE3sBoneRefer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._index      = MO.Class.register(o, new MO.AGetter('_index'));
   o._bone       = MO.Class.register(o, new MO.AGetSet('_bone'));
   o._track      = MO.Class.register(o, new MO.AGetSet('_track'));
   o.unserialize = MO.FE3sBoneRefer_unserialize;
   return o;
}
MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(input){
   var o = this;
   o._index = input.readUint8();
}
MO.FE3sCamera = function FE3sCamera(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeCd     = MO.Class.register(o, new MO.AGetter('_typeCd'));
   o._position   = MO.Class.register(o, new MO.AGetter('_position'));
   o._direction  = MO.Class.register(o, new MO.AGetter('_direction'));
   o._projection = MO.Class.register(o, new MO.AGetter('_projection'));
   o.construct   = MO.FE3sCamera_construct;
   o.unserialize = MO.FE3sCamera_unserialize;
   o.saveConfig  = MO.FE3sCamera_saveConfig;
   return o;
}
MO.FE3sCamera_construct = function FE3sCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._projection = MO.Class.create(MO.FE3sProjection);
}
MO.FE3sCamera_unserialize = function FE3sCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeCd = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
MO.FE3sCamera_saveConfig = function FE3sCamera_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('position', o._position.toString());
   xconfig.set('direction', o._direction.toString());
   o._projection.saveConfig(xconfig.create('Projection'));
}
MO.FE3sComponent = function FE3sComponent(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   return o;
}
MO.FE3sDisplay = function FE3sDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   o._outline         = null;
   o._renderables     = MO.Class.register(o, new MO.AGetter('_renderables'));
   o.construct        = MO.FE3sDisplay_construct;
   o.calculateOutline = MO.FE3sDisplay_calculateOutline;
   o.unserialize      = MO.FE3sDisplay_unserialize;
   o.saveConfig       = MO.FE3sDisplay_saveConfig;
   o.clone            = MO.FE3sDisplay_clone;
   return o;
}
MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   o._outline = new MO.SOutline3d();
}
MO.FE3sDisplay_calculateOutline = function FE3sDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.at(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}
MO.FE3sDisplay_unserialize = function FE3sDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new MO.TObjects();
      for(var i = 0; i < renderableCount; i++){
         var renderable = resourceConsole.unserialize(input);
         renderables.push(renderable);
      }
   }
}
MO.FE3sDisplay_saveConfig = function FE3sDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   var renderables = o._renderables;
   if(renderables){
      var xrenderables = xconfig.create('RenderableCollection');
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.saveConfig(xrenderables.create('Renderable'));
      }
   }
}
MO.FE3sDisplay_clone = function FE3sDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   result._outline.assign(o._outline)
   return result;
}
MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   o._displays        = MO.Class.register(o, new MO.AGetter('_displays'));
   o.construct        = MO.FE3sDisplayContainer_construct;
   o.pushDisplay      = MO.FE3sDisplayContainer_pushDisplay;
   o.calculateOutline = MO.FE3sDisplayContainer_calculateOutline;
   o.unserialize      = MO.FE3sDisplayContainer_unserialize;
   o.saveConfig       = MO.FE3sDisplayContainer_saveConfig;
   o.clone            = MO.FE3sDisplayContainer_clone;
   return o;
}
MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}
MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new MO.TObjects();
   }
   display.setParent(o);
   displays.push(display);
}
MO.FE3sDisplayContainer_calculateOutline = function FE3sDisplayContainer_calculateOutline(){
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
MO.FE3sDisplayContainer_unserialize = function FE3sDisplayContainer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, input);
   var displayCount = input.readUint16();
   if(displayCount > 0){
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = MO.Class.create(MO.FE3sSceneDisplay);
         display.unserialize(input);
         o.pushDisplay(display);
      }
   }
}
MO.FE3sDisplayContainer_saveConfig = function FE3sDisplayContainer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, xconfig);
   var displays = o._displays;
   if(displays){
      var xdisplays = xconfig.create('DisplayCollection');
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
      }
   }
}
MO.FE3sDisplayContainer_clone = function FE3sDisplayContainer_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplay.clone.call(o, instance);
   return result;
}
MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   o._typeCd      = MO.Class.register(o, new MO.AGetSet('_typeCd'));
   o._transformCd = MO.Class.register(o, new MO.AGetSet('_transformCd'));
   o.unserialize  = MO.FE3sDisplayLayer_unserialize;
   o.saveConfig   = MO.FE3sDisplayLayer_saveConfig;
   return o;
}
MO.FE3sDisplayLayer_unserialize = function FE3sDisplayLayer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   o._typeCd = input.readString();
   o._transformCd = input.readString();
}
MO.FE3sDisplayLayer_saveConfig = function FE3sDisplayLayer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
   xconfig.set('type_cd', o._typeCd);
   xconfig.set('transform_cd', o._transformCd);
}
MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._groupGuid  = MO.Class.register(o, new MO.AGetter('_groupGuid'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o.unserialize = MO.FE3sDisplayMaterial_unserialize;
   return o;
}
MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
MO.FE3sDrawable = function FE3sDrawable(o){
   o = MO.Class.inherits(this, o, MO.FE3sComponent);
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   o.construct   = MO.FE3sDrawable_construct;
   o.matrix      = MO.FE3sDrawable_matrix;
   o.unserialize = MO.FE3sDrawable_unserialize;
   o.saveConfig  = MO.FE3sDrawable_saveConfig;
   o.clone       = MO.FE3sDrawable_clone;
   return o;
}
MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
   var o = this;
   o.__base.FE3sComponent.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}
MO.FE3sDrawable_unserialize = function FE3sDrawable_unserialize(input){
   var o = this;
   o.__base.FE3sComponent.unserialize.call(o, input);
   o._matrix.unserialize(input);
}
MO.FE3sDrawable_saveConfig = function FE3sDrawable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sComponent.saveConfig.call(o, xconfig);
   o._matrix.saveConfig(xconfig.create('Matrix'));
}
MO.FE3sDrawable_clone = function FE3sDrawable_clone(instance){
   var o = this;
   var result = o.__base.FE3sComponent.clone.call(o, instance);
   result._matrix.assign(o._matrix);
   return result;
}
MO.FE3sFrame = function FE3sFrame(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._tick        = MO.Class.register(o, new MO.AGetter('_tick'));
   o._translation = MO.Class.register(o, new MO.AGetter('_translation'));
   o._quaternion  = MO.Class.register(o, new MO.AGetter('_quaternion'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   return o;
}
MO.FE3sGeometry = function FE3sGeometry(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable, MO.ME3sGeometry);
   o.construct   = MO.FE3sGeometry_construct;
   o.unserialize = MO.FE3sGeometry_unserialize;
   o.dispose     = MO.FE3sGeometry_dispose;
   return o;
}
MO.FE3sGeometry_construct = function FE3sGeometry_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
}
MO.FE3sGeometry_unserialize = function FE3sGeometry_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   var outline = o._outline;
   outline.unserialize(input);
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   if(outline.isEmpty()){
      o.calculateOutline();
   }
   outline.update();
}
MO.FE3sGeometry_dispose = function FE3sGeometry_dispose(){
   var o = this;
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sRenderable.dispose.call(o);
}
MO.FE3sLight = function FE3sLight(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o._camera     = MO.Class.register(o, new MO.AGetter('_camera'));
   o.construct   = MO.FE3sLight_construct;
   o.unserialize = MO.FE3sLight_unserialize;
   return o;
}
MO.FE3sLight_construct = function FE3sLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
}
MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
MO.FE3sMaterial = function FE3sMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._parentGuid  = MO.Class.register(o, new MO.AGetter('_parentGuid'));
   o._info        = MO.Class.register(o, new MO.AGetter('_info'));
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o.construct    = MO.FE3sMaterial_construct;
   o.effectCode   = MO.FE3sMaterial_effectCode;
   o.unserialize  = MO.FE3sMaterial_unserialize;
   o.saveConfig   = MO.FE3sMaterial_saveConfig;
   o.clone        = MO.FE3sMaterial_clone;
   return o;
}
MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new MO.SE3sMaterialInfo();
}
MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._parentGuid = input.readString();
   o._info.unserialize(input);
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = MO.Class.create(MO.FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new MO.TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = MO.Class.create(MO.FE3sMaterialBitmap);
         bitmap.unserialize(input);
         bitmaps.push(bitmap);
         var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
         bitmap.setBitmapPack(pack);
      }
   }
}
MO.FE3sMaterial_saveConfig = function FE3sMaterial_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('parent_guid', o._parentGuid);
   o._info.saveConfig(xconfig);
}
MO.FE3sMaterial_clone = function FE3sMaterial_clone(instance){
   var o = this;
   var result = o.__base.FE3sObject.clone.call(o, instance);
   result._parentGuid = o._parentGuid;
   result._info.assign(o._info);
   return result;
}
MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._bitmapPackGuid = MO.Class.register(o, new MO.AGetter('_bitmapPackGuid'));
   o._bitmapPack     = MO.Class.register(o, new MO.AGetSet('_bitmapPack'));
   o._bitmapGuid     = MO.Class.register(o, new MO.AGetter('_bitmapGuid'));
   o._index          = 0;
   o.unserialize     = MO.FE3sMaterialBitmap_unserialize;
   return o;
}
MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._bitmapPackGuid = input.readString();
   o._bitmapGuid = input.readString();
   o._index = input.readUint16();
}
MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._typeName   = MO.Class.register(o, new MO.AGetter('_typeName'));
   o._formatName = MO.Class.register(o, new MO.AGetter('_formatName'));
   o._size       = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct   = MO.FE3sMaterialBitmapPack_construct;
   o.unserialize = MO.FE3sMaterialBitmapPack_unserialize;
   o.dispose     = MO.FE3sMaterialBitmapPack_dispose;
   return o;
}
MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._typeName = input.readString();
   o._formatName = input.readString();
   o._size.unserialize(input, MO.EDataType.Uint16);
}
MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FE3sObject.dispose.call(o);
}
MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._resources  = null;
   o._materials  = null;
   o.construct   = MO.FE3sMaterialConsole_construct;
   o.find        = MO.FE3sMaterialConsole_find;
   o.unserialize = MO.FE3sMaterialConsole_unserialize;
   o.loadByGuid  = MO.FE3sMaterialConsole_loadByGuid;
   o.dispose     = MO.FE3sMaterialConsole_dispose;
   return o;
}
MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new MO.TDictionary();
   o._materials = new MO.TDictionary();
}
MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
   var o = this;
   var material = MO.Class.create(MO.FE3sMaterial);
   material.unserialize(input);
   var materialGuid = material.guid();
   if(o._materials.contains(materialGuid)){
      throw new MO.TError(o, 'Material is already exists.');
   }
   o._materials.set(materialGuid, material);
   return material;
}
MO.FE3sMaterialConsole_loadByGuid = function FE3sMaterialConsole_loadByGuid(guid){
   var o = this;
   var resources = o._resources;
   var resource = resources.get(guid);
   if(resource){
      return resource;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('material');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   resource = MO.Class.create(MO.FE3sMaterialResource);
   resource.setGuid(guid);
   resource.setVendor(vendor);
   resource.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(resource);
   resources.set(guid, resource);
   return resource;
}
MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.free(o._resources);
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sMaterialRefer = function FE3sMaterialRefer(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   return o;
}
MO.FE3sMaterialResource = function FE3sMaterialResource(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._typeName     = 'Material';
   o._dataCompress = true;
   o._material     = MO.Class.register(o, new MO.AGetter('_material'));
   o.unserialize   = MO.FE3sMaterialResource_unserialize;
   return o;
}
MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   o._material = MO.Console.find(MO.FE3sMaterialConsole).unserialize(input);
   MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
}
MO.FE3sMesh = function FE3sMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace, MO.ME3sGeometry);
   o._dataCompress = true;
   o._typeName     = 'Mesh';
   o._display      = null;
   o._renderable   = null;
   o.construct     = MO.FE3sMesh_construct;
   o.unserialize   = MO.FE3sMesh_unserialize;
   o.saveConfig    = MO.FE3sMesh_saveConfig;
   o.dispose       = MO.FE3sMesh_dispose;
   return o;
}
MO.FE3sMesh_construct = function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   o.__base.ME3sGeometry.construct.call(o);
   o._display = MO.Class.create(MO.FE3sMeshDisplay);
}
MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   o._outline.unserialize(input);
   o._outline.update();
   var streamCount = input.readInt8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input)
         streams.push(stream);
      }
   }
   o._display.unserialize(input);
   o._renderable = o._display._renderable;
}
MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, config);
   o._display.saveConfig(config.create('Display'));
}
MO.FE3sMesh_dispose = function FE3sMesh_dispose(){
   var o = this;
   o._outline = MO.Lang.Object.dispose(o._outline);
   o._display = MO.Lang.Object.dispose(o._display);
   o.__base.ME3sGeometry.dispose.call(o);
   o.__base.FE3sSpace.dispose.call(o);
}
MO.FE3sMeshConsole = function FE3sMeshConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._venderCode = 'mesh';
   o._serviceUrl = '/cloud.content.mesh.ws'
   o._dataUrl    = '/cloud.content.mesh.wv'
   o._meshs      = MO.Class.register(o, new MO.AGetter('_meshs'));
   o.construct   = MO.FE3sMeshConsole_construct;
   o.find        = MO.FE3sMeshConsole_find;
   o.loadByGuid  = MO.FE3sMeshConsole_loadByGuid;
   o.loadByCode  = MO.FE3sMeshConsole_loadByCode;
   o.dispose     = MO.FE3sMeshConsole_dispose;
   return o;
}
MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._meshs = new MO.TDictionary();
}
MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
   return this._meshs.get(p);
}
MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('guid', p);
   var u = v.makeUrl();
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
MO.FE3sMeshConsole_loadByCode = function FE3sMeshConsole_loadByCode(p){
   var o = this;
   var s = o._meshs;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = MO.Console.find(MO.FE3sVendorConsole).find(o._venderCode);
   v.set('code', p);
   var u = v.makeUrl();
   r = MO.Class.create(MO.FE3sMesh);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
   var o = this;
   o._meshs = MO.Lang.Object.free(o._meshs);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._matrix     = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material   = MO.Class.register(o, new MO.AGetter('_material'));
   o._renderable = MO.Class.register(o, new MO.AGetter('_renderable'));
   o.construct   = MO.FE3sMeshDisplay_construct;
   o.unserialize = MO.FE3sMeshDisplay_unserialize;
   o.saveConfig  = MO.FE3sMeshDisplay_saveConfig;
   return o;
}
MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._renderable = MO.Class.create(MO.FE3sRenderable);
}
MO.FE3sMeshDisplay_unserialize = function FE3sMeshDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._matrix.unserialize(p);
   o._material.unserialize(p);
   o._renderable.unserialize(p);
}
MO.FE3sMeshDisplay_saveConfig = function FE3sMeshDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._matrix.saveConfig(p.create('Matrix'));
   o._material.saveConfig(p.create('Material'));
   o._renderable.saveConfig(p.create('Renderable'));
}
MO.FE3sModel = function FE3sModel(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName      = 'Model';
   o._dataCompress  = true;
   o._dataBlock     = true;
   o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
   o._skeletons     = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations    = MO.Class.register(o, new MO.AGetter('_animations'));
   o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   o.construct      = MO.FE3sModel_construct;
   o.findMeshByCode = MO.FE3sModel_findMeshByCode;
   o.unserialize    = MO.FE3sModel_unserialize;
   o.saveConfig     = MO.FE3sModel_saveConfig;
   return o;
}
MO.FE3sModel_construct = function FE3sModel_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
   var display = o._display = MO.Class.create(MO.FE3sModelDisplay);
   display._model = o;
}
MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.at(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}
MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var modelConsole = MO.Console.find(MO.FE3sModelConsole);
   modelConsole.models().set(o.guid(), o);
   var meshCount = input.readInt16();
   if(meshCount > 0){
      var meshes = o._meshes = new MO.TDictionary();
      for(var i = 0; i < meshCount; i++){
         var mesh = modelConsole.unserialMesh(input)
         var meshGuid = mesh.guid();
         meshes.set(meshGuid, mesh);
      }
   }
   var skeletonCount = input.readInt16();
   if(skeletonCount > 0){
      var s = o._skeletons = new MO.TObjects();
      for(var i = 0; i < skeletonCount; i++){
         var skeleton = modelConsole.unserialSkeleton(input)
         s.push(skeleton);
      }
   }
   var animationCount = input.readInt16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TObjects();
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
   MO.Logger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, xconfig);
   o._display.saveConfig(xconfig.create('Display'));
}
MO.FE3sModelConsole = function FE3sModelConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._models           = MO.Class.register(o, new MO.AGetter('_models'));
   o._meshs            = MO.Class.register(o, new MO.AGetter('_meshs'));
   o._skeletons        = MO.Class.register(o, new MO.AGetter('_skeletons'));
   o._animations       = MO.Class.register(o, new MO.AGetter('_animations'));
   o.construct         = MO.FE3sModelConsole_construct;
   o.findModel         = MO.FE3sModelConsole_findModel;
   o.findMesh          = MO.FE3sModelConsole_findMesh;
   o.findSkeleton      = MO.FE3sModelConsole_findSkeleton;
   o.findAnimation     = MO.FE3sModelConsole_findAnimation;
   o.unserialMesh      = MO.FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = MO.FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = MO.FE3sModelConsole_unserialAnimation;
   o.load              = MO.FE3sModelConsole_load;
   o.dispose           = MO.FE3sModelConsole_dispose;
   return o;
}
MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new MO.TDictionary();
   o._meshs = new MO.TDictionary();
   o._skeletons = new MO.TDictionary();
   o._animations = new MO.TDictionary();
   var rc = MO.Console.find(MO.FResourceConsole);
   var rp = MO.Class.create(MO.FResourcePipeline);
   var rt = MO.Class.create(MO.FResourceType);
   rt.setCode('resource3d.model');
   rt._pipeline = rp;
   rc.registerType(rt);
}
MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}
MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}
MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}
MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sModelMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = MO.Class.create(MO.FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
MO.FE3sModelConsole_load = function FE3sModelConsole_load(guid){
   var o = this;
   var models = o._models;
   var model = models.get(guid);
   if(model){
      return model;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('model');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   model = MO.Class.create(MO.FE3sModel);
   model.setGuid(guid);
   model.setVendor(vendor);
   model.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(model);
   models.set(guid, model);
   return model;
}
MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sModelDisplay = function FE3sModelDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   o._model           = null;
   o._material        = null;
   o.construct        = MO.FE3sModelDisplay_construct;
   o.material         = MO.FE3sModelDisplay_material;
   o.calculateOutline = MO.FE3sModelDisplay_calculateOutline;
   o.unserialize      = MO.FE3sModelDisplay_unserialize;
   o.saveConfig       = MO.FE3sModelDisplay_saveConfig;
   return o;
}
MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = MO.Class.create(MO.FE3sMaterial);
}
MO.FE3sModelDisplay_material = function FE3sModelDisplay_material(){
   return this._material;
}
MO.FE3sModelDisplay_calculateOutline = function FE3sModelDisplay_calculateOutline(){
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
MO.FE3sModelDisplay_unserialize = function FE3sModelDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, p);
   o._material.unserialize(p);
}
MO.FE3sModelDisplay_saveConfig = function FE3sModelDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, p);
   o._material.saveConfig(p.create('Material'));
}
MO.FE3sModelMesh = function FE3sModelMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3sGeometry);
   return o;
}
MO.FE3sModelRenderable = function FE3sModelRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sRenderable);
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._mesh       = MO.Class.register(o, new MO.AGetSet('_mesh'));
   o.construct   = MO.FE3sModelRenderable_construct;
   o.unserialize = MO.FE3sModelRenderable_unserialize;
   o.saveConfig  = MO.FE3sModelRenderable_saveConfig;
   return o;
}
MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
MO.FE3sModelRenderable_unserialize = function FE3sModelRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._meshGuid = input.readString();
}
MO.FE3sModelRenderable_saveConfig = function FE3sModelRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
   xconfig.set('mesh_guid', o._meshGuid);
}
MO.FE3sMovie = function FE3sMovie(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._rotation   = MO.Class.register(o, new MO.AGetter('_rotation'));
   o.construct   = MO.FE3sMovie_construct;
   o.unserialize = MO.FE3sMovie_unserialize;
   o.saveConfig  = MO.FE3sMovie_saveConfig;
   o.dispose     = MO.FE3sMovie_dispose;
   return o;
}
MO.FE3sMovie_construct = function FE3sMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new MO.SVector3();
}
MO.FE3sMovie_unserialize = function FE3sMovie_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._interval = input.readInt32();
   o._rotation.unserialize(input);
}
MO.FE3sMovie_saveConfig = function FE3sMovie_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('interval', o._interval);
   xconfig.set('rotation', o._rotation);
}
MO.FE3sMovie_dispose = function FE3sMovie_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o.__base.FE3sObject.disposet.call(o);
}
MO.FE3sObject = function FE3sObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   o._typeName   = null;
   o._guid       = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label      = MO.Class.register(o, new MO.AGetSet('_label'));
   o._isClone    = false;
   o.makeLabel   = MO.FE3sObject_makeLabel;
   o.unserialize = MO.FE3sObject_unserialize;
   o.saveConfig  = MO.FE3sObject_saveConfig;
   o.clone       = MO.FE3sObject_clone;
   o.dispose     = MO.FE3sObject_dispose;
   return o;
}
MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
   var o = this;
   var result = '';
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}
MO.FE3sObject_unserialize = function FE3sObject_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}
MO.FE3sObject_saveConfig = function FE3sObject_saveConfig(xconfig){
   var o = this;
   if(!MO.Lang.String.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
   if(o._isClone){
      xconfig.set('is_clone', 'Y');
   }
}
MO.FE3sObject_clone = function FE3sObject_clone(instance){
   var o = this;
   var result = null;
   if(instance){
      result = instance;
   }else{
      result = MO.Class.create(o.constructor);
   }
   result._isClone = true;
   result._typeName = o._typeName;
   result._guid = o._guid;
   result._code = o._code;
   result._label = o._label;
   return result;
}
MO.FE3sObject_dispose = function FE3sObject_dispose(){
   var o = this;
   o.__base.MAttributeParent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
MO.FE3sProjection = function FE3sProjection(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._angle      = MO.Class.register(o, MO.AGetter('_angle'), 90);
   o._znear      = MO.Class.register(o, MO.AGetter('_znear'), 1);
   o._zfar       = MO.Class.register(o, MO.AGetter('_zfar'), 200);
   o.unserialize = MO.FE3sProjection_unserialize;
   o.saveConfig  = MO.FE3sProjection_saveConfig;
   return o;
}
MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._angle = input.readFloat();
   o._znear = input.readFloat();
   o._zfar = input.readFloat();
}
MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.setFloat('angle', o._angle);
   xconfig.setFloat('znear', o._znear);
   xconfig.setFloat('zfar', o._zfar);
}
MO.FE3sRegion = function FE3sRegion(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._optionBackground     = MO.Class.register(o, new MO.AGetSet('_optionBackground'), true);
   o._backgroundColor      = MO.Class.register(o, new MO.AGetter('_backgroundColor'));
   o._moveSpeed            = MO.Class.register(o, new MO.AGetSet('_moveSpeed'), 0.1);
   o._rotationKeySpeed     = MO.Class.register(o, new MO.AGetSet('_rotationKeySpeed'), 0.005);
   o._rotationMouseSpeed   = MO.Class.register(o, new MO.AGetSet('_rotationMouseSpeed'), 0.003);
   o._material             = null;
   o._camera               = MO.Class.register(o, new MO.AGetter('_camera'));
   o._light                = MO.Class.register(o, new MO.AGetter('_light'));
   o.construct             = MO.FE3sRegion_construct;
   o.unserialize           = MO.FE3sRegion_unserialize;
   o.saveConfig            = MO.FE3sRegion_saveConfig;
   return o;
}
MO.FE3sRegion_construct = function FE3sRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new MO.SColor4();
   o._material = MO.Class.create(MO.FE3sMaterial);
   o._camera = MO.Class.create(MO.FE3sCamera);
   o._light = MO.Class.create(MO.FE3sLight);
}
MO.FE3sRegion_unserialize = function FE3sRegion_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._backgroundColor.unserialize(input);
   o._moveSpeed = input.readFloat();
   o._rotationKeySpeed = input.readFloat();
   o._rotationMouseSpeed = input.readFloat();
   o._material.unserialize(input);
   o._camera.unserialize(input);
   o._light.unserialize(input);
}
MO.FE3sRegion_saveConfig = function FE3sRegion_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   xconfig.set('color', o._backgroundColor.toString());
   xconfig.setFloat('move_speed', o._moveSpeed);
   xconfig.setFloat('rotation_key_speed', o._rotationKeySpeed);
   xconfig.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
   o._camera.saveConfig(xconfig.create('Camera'));
}
MO.FE3sRenderable = function FE3sRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   o._materialRefers   = MO.Class.register(o, new MO.AGetter('_materialRefers'));
   o.construct         = MO.FE3sRenderable_construct;
   o.syncMaterialRefer = MO.FE3sRenderable_syncMaterialRefer;
   o.pushMaterialRefer = MO.FE3sRenderable_pushMaterialRefer;
   o.unserialize       = MO.FE3sRenderable_unserialize;
   o.saveConfig        = MO.FE3sRenderable_saveConfig;
   o.clone             = MO.FE3sRenderable_clone;
   return o;
}
MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
}
MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.TObjects();
   }
   for(var i = materialRefers.count(); i <= index; i++){
      materialRefers.push(MO.Class.create(MO.FE3sMaterialRefer));
   }
   return materialRefers.at(index);
}
MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.Objects();
   }
   materialRefers.push(materialRefer);
}
MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var count = input.readUint16();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var materialRefer = MO.Class.create(MO.FE3sMaterialRefer);
         materialRefer.unserialize(input);
         o.pushMaterialRefer(materialRefer);
      }
   }
}
MO.FE3sRenderable_saveConfig = function FE3sRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      var xmaterialRefers = xconfig.create('MaterialReferCollection');
      for(var i = 0; i < count; i++){
         materialRefers.at(i).saveConfig(xmaterialRefers.create('MaterialRefer'));
      }
   }
}
MO.FE3sRenderable_clone = function FE3sRenderable_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = materialRefers.at(i);
         result.pushMaterialRefer(materialRefer.clone());
      }
   }
   return result;
}
MO.FE3sResource = function FE3sResource(o){
   o = MO.Class.inherits(this, o, MO.FResource, MO.MListener);
   o._dataLoad      = false;
   o._dataReady     = false;
   o._dataSize      = 0;
   o._blockSize     = 0;
   o._blockCount    = 0;
   o._vendor        = MO.Class.register(o, new MO.AGetSet('_vendor'));
   o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o.onComplete     = MO.FE3sResource_onComplete;
   o.makeLabel      = MO.FE3sResource_makeLabel;
   o.testReady      = MO.FE3sResource_testReady;
   o.unserialize    = MO.FE3sResource_unserialize;
   o.saveConfig     = MO.FE3sResource_saveConfig;
   o.dispose        = MO.FE3sResource_dispose;
   return o;
}
MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
   var o = this;
   if(MO.Class.isClass(input, MO.MDataStream)){
      o.unserialize(input);
   }else{
      var view = MO.Class.create(MO.FDataView);
      view.setEndianCd(true);
      if(input.constructor == Array){
         var inputData = new Uint8Array(input);
         view.link(inputData.buffer);
      }else if(input.constructor == Uint8Array){
         view.link(input.buffer);
      }else{
         view.link(input.outputData());
      }
      o.unserialize(view);
      view.dispose();
   }
   o._dataReady = true;
   o.processLoadListener();
}
MO.FE3sResource_makeLabel = function FE3sResource_makeLabel(){
   var o = this;
   var result = '';
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}
MO.FE3sResource_testReady = function FE3sResource_testReady(){
   return this._dataReady;
}
MO.FE3sResource_unserialize = function FE3sResource_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}
MO.FE3sResource_saveConfig = function FE3sResource_saveConfig(xconfig){
   var o = this;
   if(!MO.Lang.String.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
}
MO.FE3sResource_dispose = function FE3sResource_dispose(){
   var o = this;
   o._vendor = null;
   o.__base.MListener.dispose.call(o);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sResourceConsole = function FE3sResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._factory            = MO.Class.register(o, new MO.AGetter('_factory'));
   o.construct           = MO.FE3sResourceConsole_construct;
   o.create              = MO.FE3sResourceConsole_create;
   o.unserializeResource = MO.FE3sResourceConsole_unserializeResource;
   o.unserialize         = MO.FE3sResourceConsole_unserialize;
   return o;
}
MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var factory = o._factory = MO.Class.create(MO.FClassFactory);
   factory.register('Shape', MO.FE3sShape);
   factory.register('Sprite', MO.FE3sSprite);
   factory.register('ModelMesh', MO.FE3sModelMesh);
   factory.register('ModelRenderable', MO.FE3sModelRenderable);
}
MO.FE3sResourceConsole_create = function FE3sResourceConsole_create(typeName){
   return this._factory.create(typeName);
}
MO.FE3sResourceConsole_unserializeResource = function FE3sResourceConsole_unserializeResource(resource, input){
   var o = this;
   resource.unserialize(input);
}
MO.FE3sResourceConsole_unserialize = function FE3sResourceConsole_unserialize(input){
   var o = this;
   var typeName = input.testString();
   var resource = o._factory.create(typeName);
   resource.unserialize(input);
   return resource;
}
MO.FE3sScene = function FE3sScene(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName     = 'Scene';
   o._dataCompress = true;
   o._templates    = null;
   o.construct     = MO.FE3sScene_construct;
   o.unserialize   = MO.FE3sScene_unserialize;
   o.saveConfig    = MO.FE3sScene_saveConfig;
   return o;
}
MO.FE3sScene_construct = function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
}
MO.FE3sScene_unserialize = function FE3sScene_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   var templateCount = input.readInt16();
   if(templateCount > 0){
      var templateConsole = MO.Console.find(MO.FE3sTemplateConsole);
      var templates = o._templates = new MO.TDictionary();
      for(var i = 0; i < templateCount; i++){
         var template = templateConsole.unserialize(p);
         templates.set(ttemplate.guid(), template);
      }
   }
}
MO.FE3sScene_saveConfig = function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, p);
}
MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._playRate   = MO.Class.register(o, new MO.AGetSet('_playRate'), 1);
   o.construct   = MO.FE3sSceneAnimation_construct;
   o.unserialize = MO.FE3sSceneAnimation_unserialize;
   o.saveConfig  = MO.FE3sSceneAnimation_saveConfig;
   return o;
}
MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
}
MO.FE3sSceneAnimation_unserialize = function FE3sSceneAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._playRate = p.readFloat();
}
MO.FE3sSceneAnimation_saveConfig = function FE3sSceneAnimation_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('play_rate', o._playRate);
}
MO.FE3sSceneConsole = function FE3sSceneConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._vendorCode = 'scene';
   o._dataUrl    = '/cloud.content.scene.wv'
   o._scenes     = null;
   o.construct   = MO.FE3sSceneConsole_construct;
   o.loadByGuid  = MO.FE3sSceneConsole_loadByGuid;
   o.loadByCode  = MO.FE3sSceneConsole_loadByCode;
   return o;
}
MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new MO.TDictionary();
}
MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
   var o = this;
   var scenes = o._scenes;
   var scene = scenes.get(guid);
   if(scene){
      return scene;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   scene = MO.Class.create(MO.FE3sScene);
   scene.setGuid(guid);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   scenes.set(guid, scene);
   return scene;
}
MO.FE3sSceneConsole_loadByCode = function FE3sSceneConsole_loadByCode(code){
   var o = this;
   var scenes = o._scenes;
   var scene = scenes.get(code);
   if(scene){
      return scene;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find(o._vendorCode);
   vendor.set('code', code);
   var url = vendor.makeUrl();
   scene = MO.Class.create(MO.FE3sScene);
   scene.setCode(code);
   scene.setVendor(vendor);
   scene.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(scene);
   scenes.set(code, scene);
   return scene;
}
MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sSprite);
   o._templateGuid        = MO.Class.register(o, new MO.AGetter('_templateGuid'));
   o._animations          = MO.Class.register(o, new MO.AGetter('_animations'));
   o._movies              = MO.Class.register(o, new MO.AGetter('_movies'));
   o._renderables         = MO.Class.register(o, new MO.AGetter('_renderables'));
   o.construct            = MO.FE3sSceneDisplay_construct;
   o.findAnimation        = MO.FE3sSceneDisplay_findAnimation;
   o.syncAnimation        = MO.FE3sSceneDisplay_syncAnimation;
   o.unserialize          = MO.FE3sSceneDisplay_unserialize;
   o.saveConfig           = MO.FE3sSceneDisplay_saveConfig;
   o.clone                = MO.FE3sSceneDisplay_clone;
   return o;
}
MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sSprite.construct.call(o);
}
MO.FE3sSceneDisplay_findAnimation = function FE3sSceneDisplay_findAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(animations){
      return animations.get(guid);
   }
   return null;
}
MO.FE3sSceneDisplay_syncAnimation = function FE3sSceneDisplay_syncAnimation(guid){
   var o = this;
   var animations = o._animations;
   if(!animations){
      animations = o._animations = new MO.TDictionary();
   }
   var animation = animations.get(guid);
   if(!animation){
      animation = MO.Class.create(MO.FE3sSceneAnimation);
      animation._guid = guid;
      animations.set(guid, animation);
   }
   return animation;
}
MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sSprite.unserialize.call(o, input);
   o._templateGuid = input.readString();
   var animationCount = input.readUint16();
   if(animationCount > 0){
      var animations = o._animations = new MO.TDictionary();
      for(var i = 0; i < animationCount; i++){
         var animation = MO.Class.create(MO.FE3sSceneAnimation);
         animation.unserialize(input);
         animations.set(animation.guid(), animation);
      }
   }
   var movieCount = input.readUint16();
   if(movieCount > 0){
      var movies = o._movies = new MO.TObjects();
      for(var i = 0; i < movieCount; i++){
         var movie = MO.Class.create(MO.FE3sMovie);
         movie.unserialize(input);
         movies.push(movie);
      }
   }
}
MO.FE3sSceneDisplay_saveConfig = function FE3sSceneDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sSprite.saveConfig.call(o, xconfig);
   xconfig.set('template_guid', o._templateGuid);
   var animations = o._animations;
   if(animations){
      var count = animations.count();
      var xanimations = xconfig.create('AnimationCollection');
      for(var i = 0; i < count; i++){
         animations.at(i).saveConfig(xanimations.create('Animation'));
      }
   }
}
MO.FE3sSceneDisplay_clone = function FE3sSceneDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sSprite.clone.call(o, instance);
   result._templateGuid = o._templateGuid;
   return result;
}
MO.FE3sSceneLayer = function FE3sSceneLayer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayLayer);
   return o;
}
MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o.unserialize = MO.FE3sSceneRenderable_unserialize;
   return o;
}
MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
}
MO.FE3sShape = function FE3sShape(o){
   o = MO.Class.inherits(this, o, FE3sRenderable);
   o._modelGuid    = MO.Class.register(o, new MO.AGetter('_modelGuid'));
   o._model        = null;
   o._meshGuid     = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._mesh         = null;
   o._materialGuid = MO.Class.register(o, new MO.AGetter('_materialGuid'));
   o._material     = null;
   o.construct     = FE3sShape_construct;
   o.model         = FE3sShape_model;
   o.mesh          = FE3sShape_mesh;
   o.material      = FE3sShape_material;
   o.unserialize   = FE3sShape_unserialize;
   return o;
}
MO.FE3sShape_construct = function FE3sShape_construct(){
   var o = this;
   o.__base.FE3sRenderable.construct.call(o);
}
MO.FE3sShape_model = function FE3sShape_model(){
   var o = this;
   var model = o._model;
   if(!model){
      model = o._model = MO.Console.find(MO.FE3sModelConsole).findModel(o._modelGuid);
   }
   return model;
}
MO.FE3sShape_mesh = function FE3sShape_mesh(){
   var o = this;
   var mesh = o._mesh;
   if(!mesh){
      mesh = o._mesh = MO.Console.find(MO.FE3sModelConsole).findMesh(this._meshGuid);
   }
   return mesh;
}
MO.FE3sShape_material = function FE3sShape_material(){
   var o = this;
   var material = o._material;
   if(!material){
      material = o._material = MO.Console.find(MO.FE3sMaterialConsole).find(this._materialGuid);
   }
   return material;
}
MO.FE3sShape_unserialize = function FE3sShape_unserialize(input){
   var o = this;
   o.__base.FE3sRenderable.unserialize.call(o, input);
   o._modelGuid = input.readString();
   o._meshGuid = input.readString();
   o._materialGuid = input.readString();
}
MO.FE3sSkeleton = function FE3sSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._bones        = MO.Class.register(o, new MO.AGetter('_bones'));
   o._roots        = MO.Class.register(o, new MO.AGetter('_roots'));
   o._skins        = MO.Class.register(o, new MO.AGetter('_skins'));
   o._animations   = MO.Class.register(o, new MO.AGetter('_animations'));
   o.findBone      = MO.FE3sSkeleton_findBone;
   o.pushAnimation = MO.FE3sSkeleton_pushAnimation;
   o.innerFilter   = MO.FE3sSkeleton_innerFilter;
   o.unserialize   = MO.FE3sSkeleton_unserialize;
   return o;
}
MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}
MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new MO.TObjects();
   }
   r.push(p);
}
MO.FE3sSkeleton_innerFilter = function FE3sSkeleton_innerFilter(p){
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
MO.FE3sSkeleton_unserialize = function FE3sSkeleton_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint8();
   if(c > 0){
      o._bones = new MO.TDictionary();
      var s = o._roots = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(MO.FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var k = MO.Class.create(MO.FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._meshGuid   = MO.Class.register(o, new MO.AGetter('_meshGuid'));
   o._streams    = MO.Class.register(o, new MO.AGetter('_streams'));
   o._boneRefers = MO.Class.register(o, new MO.AGetter('_boneRefers'));
   o.find        = MO.FE3sSkeletonSkin_find;
   o.unserialize = MO.FE3sSkeletonSkin_unserialize;
   return o;
}
MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}
MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   o._meshGuid = input.readString();
   var streamCount = input.readUint8();
   if(streamCount > 0){
      var streams = o._streams = new MO.TObjects();
      for(var i = 0; i < streamCount; i++){
         var stream = MO.Class.create(MO.FE3sStream);
         stream.unserialize(input);
         streams.push(stream);
      }
   }
   var boneReferCount = input.readUint8();
   if(boneReferCount > 0){
      var boneRefers = o._boneRefers = new MO.TObjects();
      for(var i = 0; i < boneReferCount; i++){
         var boneRefer = MO.Class.create(MO.FE3sBoneRefer);
         boneRefer.unserialize(input);
         boneRefers.push(boneRefer);
      }
   }
}
MO.FE3sSpace = function FE3sSpace(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._typeName   = null;
   o._technique  = MO.Class.register(o, new MO.AGetter('_technique'));
   o._region     = MO.Class.register(o, new MO.AGetter('_region'));
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   o._displays   = MO.Class.register(o, new MO.AGetter('_displays'));
   o._layers     = MO.Class.register(o, new MO.AGetter('_layers'));
   o.construct   = MO.FE3sSpace_construct;
   o.unserialize = MO.FE3sSpace_unserialize;
   o.saveConfig  = MO.FE3sSpace_saveConfig;
   return o;
}
MO.FE3sSpace_construct = function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = MO.Class.create(MO.FE3sTechnique);
   o._region = MO.Class.create(MO.FE3sRegion);
}
MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
   o._technique.unserialize(input);
   o._region.unserialize(input);
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new MO.TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = MO.Class.create(MO.FE3sDisplayLayer);
         layer.unserialize(input);
         layers.set(layer.code(), layer);
      }
   }
}
MO.FE3sSpace_saveConfig = function FE3sSpace_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
   o._technique.saveConfig(p.create('Technique'));
   o._region.saveConfig(p.create('Region'));
   var materials = o._materials;
   if(materials){
      var xmaterials = p.create('MaterialCollection');
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         material.saveConfig(xmaterials.create('Material'));
      }
   }
   var displays = o._displays;
   if(displays){
      var xdisplays = p.create('DisplayCollection');
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
      }
   }
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
MO.FE3sSprite = function FE3sSprite(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   o._materials   = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct    = MO.FE3sSprite_construct;
   o.pushMaterial = MO.FE3sSprite_pushMaterial;
   o.unserialize  = MO.FE3sSprite_unserialize;
   o.saveConfig   = MO.FE3sSprite_saveConfig;
   o.clone        = MO.FE3sSprite_clone;
   return o;
}
MO.FE3sSprite_construct = function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}
MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new MO.TDictionary();
   }
   materials.set(material.guid(), material);
}
MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         o.pushMaterial(material);
      }
   }
}
MO.FE3sSprite_saveConfig = function FE3sSprite_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      var xmaterials = xconfig.create('MaterialCollection');
      for(var i = 0; i < count; i++){
         var material = materials.at(i);
         material.saveConfig(xmaterials.create('Material'));
      }
   }
   var movies = o._movies;
   if(movies){
      var count = movies.count();
      var xmovies = xconfig.create('MovieCollection');
      for(var i = 0; i < count; i++){
         var movie = movies.at(i);
         movie.saveConfig(xmovies.create('Movie'));
      }
   }
}
MO.FE3sSprite_clone = function FE3sSprite_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplayContainer.clone.call(o, instance);
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      for(var i = 0; i < count; i++){
         var material = materials.at(i);
         result.pushMaterial(material.clone());
      }
   }
   return result;
}
MO.FE3sStream = function FE3sStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code             = MO.Class.register(o, new MO.AGetSet('_code'));
   o._elementDataCd    = MO.Class.register(o, new MO.AGetSet('_elementDataCd'), 0);
   o._elementCount     = MO.Class.register(o, new MO.AGetSet('_elementCount'), 0);
   o._elementNormalize = MO.Class.register(o, new MO.AGetSet('_elementNormalize'), false);
   o._dataStride       = MO.Class.register(o, new MO.AGetSet('_dataStride'), 0);
   o._dataCount        = MO.Class.register(o, new MO.AGetSet('_dataCount'), 0);
   o._dataLength       = MO.Class.register(o, new MO.AGetSet('_dataLength'), 0);
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._formatCd         = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o.unserialize       = MO.FE3sStream_unserialize;
   o.dispose           = MO.FE3sStream_dispose;
   return o;
}
MO.FE3sStream_unserialize = function FE3sStream_unserialize(input){
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
MO.FE3sStream_dispose = function FE3sStream_dispose(){
   var o = this;
   o.data = null;
   o.__base.FObject.dispose.call(o);
}
MO.FE3sTechnique = function FE3sTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._techniqueCode = MO.Class.register(o, new MO.AGetter('_techniqueCode'));
   o._passes        = MO.Class.register(o, new MO.AGetter('_passes'));
   o.passes         = MO.FE3sTechnique_passes;
   o.unserialize    = MO.FE3sTechnique_unserialize;
   o.saveConfig     = MO.FE3sTechnique_saveConfig;
   return o;
}
MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new MO.TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = MO.Class.create(MO.FE3sTechniquePass);
         pass.unserialize(input);
         passes.push(pass);
      }
   }
}
MO.FE3sTechnique_saveConfig = function FE3sTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('technique_code', o._techniqueCode);
}
MO.FE3sTechniquePass = function FE3sTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._targetWidth  = MO.Class.register(o, new MO.AGetter('_targetWidth'));
   o._targetHeight = MO.Class.register(o, new MO.AGetter('_targetHeight'));
   o.unserialize   = MO.FE3sTechniquePass_unserialize;
   return o;
}
MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
MO.FE3sTemplate = function FE3sTemplate(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   o._typeName     = 'Template';
   o._dataCompress = true;
   return o;
}
MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o.construct   = MO.FE3sTemplateConsole_construct;
   o.unserialize = MO.FE3sTemplateConsole_unserialize;
   o.loadByGuid  = MO.FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = MO.FE3sTemplateConsole_loadByCode;
   o.update      = MO.FE3sTemplateConsole_update;
   return o;
}
MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new MO.TDictionary();
}
MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sTemplate);
   r._dataReady = true;
   r.unserialize(p);
   o._templates.set(r.guid(), r);
   return r;
}
MO.FE3sTemplateConsole_loadByGuid = function FE3sTemplateConsole_loadByGuid(guid){
   var o = this;
   var templates = o._templates;
   var template = templates.get(guid);
   if(template){
      return template;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   template = MO.Class.create(MO.FE3sTemplate);
   template.setGuid(guid);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
   templates.set(guid, template);
   return template;
}
MO.FE3sTemplateConsole_loadByCode = function FE3sTemplateConsole_loadByCode(code){
   var o = this;
   var templates = o._templates;
   var template = templates.get(code);
   if(template){
      return template;
   }
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('template');
   vendor.set('code', code);
   var url = vendor.makeUrl();
   template = MO.Class.create(MO.FE3sTemplate);
   template.setCode(code);
   template.setVendor(vendor);
   template.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(template);
   templates.set(code, template);
   return template;
}
MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
   var o = this;
   var u = MO.RBrowser.hostPath(o._serviceUrl + '?action=update');
   MO.Console.find(MO.FXmlConsole).send(u, p);
}
MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._materials   = MO.Class.register(o, new MO.AGetter('_materials'));
   o.findMaterial = MO.FE3sTemplateTheme_findMaterial;
   o.materials    = MO.FE3sTemplateTheme_materials;
   o.unserialize  = MO.FE3sTemplateTheme_unserialize;
   return o;
}
MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = MO.Console.find(MO.FE3sMaterialConsole);
      var s = o._materials = new MO.TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
MO.FE3sTexture = function FE3sTexture(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._dataCompress = true;
   o._bitmaps      = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks  = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   o.construct     = MO.FE3sTexture_construct;
   o.unserialize   = MO.FE3sTexture_unserialize;
   o.dispose       = MO.FE3sTexture_dispose;
   return o;
}
MO.FE3sTexture_construct = function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}
MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmapPack);
         b._texture = o;
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}
MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = MO.Lang.Object.free(o._bitmaps);
   o._bitmapPacks = MO.Lang.Object.free(o._bitmapPacks);
   o.__base.FE3sResource.dispose.call(o);
}
MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._packCode   = MO.Class.register(o, new MO.AGetter('_packCode'));
   o.packCode    = MO.FE3sTextureBitmap_packCode;
   o.unserialize = MO.FE3sTextureBitmap_unserialize;
   return o;
}
MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._packCode = p.readString();
}
MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   o._optionCompress = MO.Class.register(o, new MO.AGetter('_optionCompress'));
   o._size           = MO.Class.register(o, new MO.AGetter('_size'));
   o._data           = MO.Class.register(o, new MO.AGetter('_data'));
   o._typeName       = null;
   o._formatName     = null;
   o.construct       = MO.FE3sTextureBitmapPack_construct;
   o.unserialize     = MO.FE3sTextureBitmapPack_unserialize;
   o.dispose         = MO.FE3sTextureBitmapPack_dispose;
   return o;
}
MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FE3sTextureBitmapPack_unserialize = function FE3sTextureBitmapPack_unserialize(p){
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
      throw new MO.TError(o, 'Unserial texture failure ');
   }
}
MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   o.__base.FE3sObject.dispose.call(o);
}
MO.FE3sTextureConsole = function FE3sTextureConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._textures   = null;
   o.construct   = MO.FE3sTextureConsole_construct;
   o.unserialize = MO.FE3sTextureConsole_unserialize;
   o.load        = MO.FE3sTextureConsole_load;
   o.loadBitmap  = MO.FE3sTextureConsole_loadBitmap;
   o.dispose     = MO.FE3sModelConsole_dispose;
   return o;
}
MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new MO.TDictionary();
}
MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
   var o = this;
   var r = MO.Class.create(MO.FE3sTexture);
   r._dataReady = true;
   r.unserialize(p);
   o._textures.set(r.guid(), r);
   return r;
}
MO.FE3sTextureConsole_load = function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var r = s.get(p);
   if(r){
      return r;
   }
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture');
   var u = v.makeUrl(p);
   r = MO.Class.create(MO.FE3sTexture);
   r.setGuid(p);
   r.setVendor(v);
   r.setSourceUrl(u);
   MO.Console.find(MO.FResourceConsole).load(r);
   s.set(p, r);
   return r;
}
MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   var v = MO.Console.find(MO.FE3sVendorConsole).find('texture.bitmap');
   v.set('guid', pg);
   v.set('code', pc);
   v.set('format', pf);
   var u = v.makeUrl();
   var g = o._image = MO.Class.create(MO.FImage);
   g.loadUrl(u);
   return g;
}
MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = MO.Lang.Object.free(o._textures);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3sTheme = function FE3sTheme(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   o.find        = MO.FE3sTheme_find;
   o.unserialize = MO.FE3sTheme_unserialize;
   return o;
}
MO.FE3sTheme_find = function FE3sTheme_find(name){
   var materials = this._materials;
   return materials ? materials.get(name) : null;
}
MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(input){
   var o = this;
   var count = input.readInt32();
   if(count > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var n = 0; n < c; n++){
         var material = MO.Class.create(FE3sMaterial);
         material.unserialize(input);
         materials.set(material.code(), material);
      }
   }
}
MO.FE3sThemeConsole = function FE3sThemeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = MO.Class.register(o, new MO.AGetter('_activeTheme'));
   o._themes      = null;
   o.construct    = MO.FE3sThemeConsole_construct;
   o.find         = MO.FE3sThemeConsole_find;
   o.select       = MO.FE3sThemeConsole_select;
   return o;
}
MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new MO.TDictionary();
}
MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(name){
   var theme = this._activeTheme;
   if(theme == null){
      throw new MO.TError('Active theme is empty.');
   }
   return theme.find(name);
}
MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(name){
   var o = this;
   var theme = o._themes.get(name);
   if(theme == null){
      var url = MO.RBrowser.contentPath(o._path + name + '.ser');
      theme = MO.Class.create(MO.FE3sTheme);
      theme.load(url);
      o._themes.set(name, theme);
   }
   o._activeTheme = theme;
   return theme;
}
MO.FE3sTrack = function FE3sTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._meshCode     = MO.Class.register(o, new MO.AGetter('_meshCode'));
   o._boneIndex    = MO.Class.register(o, new MO.AGetter('_boneIndex'), 0);
   o._frameTick    = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._matrix       = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._matrixInvert = MO.Class.register(o, new MO.AGetter('_matrixInvert'));
   o._frameCount   = MO.Class.register(o, new MO.AGetter('_frameCount'));
   o._frames       = MO.Class.register(o, new MO.AGetter('_frames'));
   o.construct     = MO.FE3sTrack_construct;
   o.calculate     = MO.FE3sTrack_calculate;
   o.unserialize   = MO.FE3sTrack_unserialize;
   return o;
}
MO.FE3sTrack_construct = function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._matrixInvert = new MO.SMatrix3d();
}
MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
   var o = this;
   var frameCount = info.frameCount;
   if(frameCount == 0){
      throw new MO.TError('Frame count is invalid.');
   }
   var beginIndex = info.beginIndex;
   var frameTick = o._frameTick;
   var index = parseInt(tick / frameTick) % frameCount;
   var frames = o._frames;
   var currentFrame = frames.get(beginIndex + index);
   var nextFrame = null;
   if(index < frameCount - 1){
      nextFrame = frames.get(beginIndex + index + 1);
   }else{
      nextFrame = frames.get(beginIndex);
   }
   info.tick = tick;
   info.rate = (tick % frameTick) / frameTick;
   info.currentFrame = currentFrame;
   info.nextFrame = nextFrame;
   return true;
}
MO.FE3sTrack_unserialize = function FE3sTrack_unserialize(input){
   var o = this;
   o._meshCode = input.readString();
   o._boneIndex = input.readUint16();
   o._frameTick = input.readUint16();
   o._matrix.unserialize(input);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   o._frameCount = input.readInt16();
   o._frames = new MO.TObjects();
}
MO.FE3sVendor = function FE3sVendor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._contentUrl   = MO.Class.register(o, new MO.AGetSet('_contentUrl'));
   o._parameters   = null;
   o.construct     = MO.FE3sVendor_construct;
   o.get           = MO.FE3sVendor_get;
   o.set           = MO.FE3sVendor_set;
   o.makeSource    = MO.Method.virtual(o, 'makeSource');
   o.makeUrl       = MO.FE3sVendor_makeUrl;
   o.reset         = MO.FE3sVendor_reset;
   o.dispose       = MO.FE3sVendor_dispose;
   return o;
}
MO.FE3sVendor_construct = function FE3sVendor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._parameters = new MO.TAttributes();
}
MO.FE3sVendor_get = function FE3sVendor_get(n){
   return this._parameters.get(n);
}
MO.FE3sVendor_set = function FE3sVendor_set(n, v){
   this._parameters.set(n, v);
}
MO.FE3sVendor_makeUrl = function FE3sVendor_makeUrl(){
   var o = this;
   var r = o.makeSource();
   if(MO.Runtime.isDebug()){
      if(r.indexOf('?') == -1){
         r += '?';
      }else{
         r += '&';
      }
      r += 'date=' + MO.Lang.Date.format();
   }
   return r;
}
MO.FE3sVendor_reset = function FE3sVendor_reset(){
   this._parameters.clear();
}
MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
   var o = this;
   o._parameters = MO.Lang.Object.dispose(o._parameters);
   o.__base.FObject.dispose.call(o);
}
MO.FE3sVendorConsole = function FE3sVendorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._setuped     = false;
   o._vendors     = null;
   o.construct    = MO.FE3sVendorConsole_construct;
   o.createVendor = MO.FE3sVendorConsole_createVendor;
   o.register     = MO.FE3sVendorConsole_register;
   o.find         = MO.FE3sVendorConsole_find;
   o.setup        = MO.FE3sVendorConsole_setup;
   return o;
}
MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._vendors = new MO.TDictionary();
}
MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
   var v = MO.Class.create(c);
   v.setContentUrl(u);
   return v;
}
MO.FE3sVendorConsole_register = function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}
MO.FE3sVendorConsole_find = function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   var v = o._vendors.get(p);
   v.reset();
   return v;
}
MO.FE3sVendorConsole_setup = function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorNet, MO.RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
   }else if(p == 'local'){
      o._vendors.set('bitmap', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
      o._vendors.set('material', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/material/{guid}.bin')));
      o._vendors.set('mesh', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
      o._vendors.set('model', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/model/{guid}.bin')));
      o._vendors.set('template', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/template/{guid}.bin')));
      o._vendors.set('scene', o.createVendor(MO.FE3sVendorLocal, MO.RBrowser.contentPath('/ar3/scene/{guid}.bin')));
   }else{
      throw new MO.TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
MO.FE3sVendorLocal = function FE3sVendorLocal(o){
   o = MO.Class.inherits(this, o, MO.FE3sVendor);
   o.makeSource = MO.FE3sVendorLocal_makeSource;
   return o;
}
MO.FE3sVendorLocal_makeSource = function FE3sVendorLocal_makeSource(){
   var o = this;
   var u = o._contentUrl;
   var s = o._parameters;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      u = MO.Lang.String.replace(u, '{' + n + '}', v);
   }
   return u;
}
MO.FE3sVendorNet = function FE3sVendorNet(o){
   o = MO.Class.inherits(this, o, MO.FE3sVendor);
   o.makeSource = MO.FE3sVendorNet_makeSource;
   return o;
}
MO.FE3sVendorNet_makeSource = function FE3sVendorNet_makeSource(){
   var o = this;
   var url = o._contentUrl;
   if(url.indexOf('?') == -1){
      url += '?';
   }else{
      url += '&';
   }
   var parameters = o._parameters;
   var count = parameters.count();
   var first = false;
   for(var i = 0; i < count; i++){
      var name = parameters.name(i);
      var value = parameters.value(i);
      if(!MO.Lang.String.isEmpty(value)){
         if(first){
            url += '&';
         }else{
            first = true;
         }
         url += name + '=' + value;
      }
   }
   return url;
}
