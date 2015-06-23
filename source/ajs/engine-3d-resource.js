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
with(MO){
   MO.ME3sGeometry = function ME3sGeometry(o){
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
   MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
      var o = this;
      o._outline = new SOutline3d();
   }
   MO.ME3sGeometry_outline = function ME3sGeometry_outline(){
      return this._outline;
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
   MO.ME3sGeometry_streams = function ME3sGeometry_streams(){
      return this._streams;
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
      o._outline = RObject.dispose(o._outline);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
      var o = this;
      o.owner   = w;
      o.process = f;
      o.data    = d;
      return o;
   }
}
with(MO){
   MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
      var o = this;
      SG3dMaterialInfo.call(o);
      o.unserialize = SE3sMaterialInfo_unserialize;
      o.saveConfig  = SE3sMaterialInfo_saveConfig;
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
}
with(MO){
   MO.SE3sSceneShadow = function SE3sSceneShadow(){
      var o = this;
      o.base        = null;
      o.rate        = null;
      o.level       = null;
      o.range       = null;
      o.unserialize = SE3sSceneShadow_unserialize;
      return o;
   }
   MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(p){
      var o = this;
      o.base = p.readFloat();
      o.rate = p.readFloat();
      o.level = p.readFloat();
      o.range = p.readFloat();
   }
}
with(MO){
   MO.FE3sAnimation = function FE3sAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._model           = null;
      o._skeletonGuid    = null;
      o._skeleton        = null;
      o._frameCount      = 0;
      o._frameTick       = 0;
      o._frameSpan       = 0;
      o._frameTranslates = null;
      o._frameRotations  = null;
      o._frameScales     = null;
      o._tracks          = null;
      o.skeletonGuid     = FE3sAnimation_skeletonGuid;
      o.skeleton         = FE3sAnimation_skeleton;
      o.frameCount       = FE3sAnimation_frameCount;
      o.frameTick        = FE3sAnimation_frameTick;
      o.frameSpan        = FE3sAnimation_frameSpan;
      o.tracks           = FE3sAnimation_tracks;
      o.unserialize      = FE3sAnimation_unserialize;
      return o;
   }
   MO.FE3sAnimation_skeletonGuid = function FE3sAnimation_skeletonGuid(){
      return this._skeletonGuid;
   }
   MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
      var o = this;
      var skeleton = o._skeleton;
      if(!skeleton){
         var guid = o._skeletonGuid;
         if(guid){
            skeleton = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(guid);
         }
      }
      return skeleton;
   }
   MO.FE3sAnimation_frameCount = function FE3sAnimation_frameCount(){
      return this._frameCount;
   }
   MO.FE3sAnimation_frameTick = function FE3sAnimation_frameTick(){
      return this._frameTick;
   }
   MO.FE3sAnimation_frameSpan = function FE3sAnimation_frameSpan(){
      return this._frameSpan;
   }
   MO.FE3sAnimation_tracks = function FE3sAnimation_tracks(){
      return this._tracks;
   }
   MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._skeletonGuid = input.readString();
      o._frameCount = input.readUint16();
      o._frameTick = input.readUint16();
      o._frameSpan = input.readUint32();
      var translateCount = input.readUint32();
      var translateBytes = RInteger.strideByte(translateCount);
      if(translateCount > 0){
         var translates = o._frameTranslates = new TObjects();
         for(var i = 0; i < translateCount; i++){
            var translate = new SPoint3();
            translate.unserialize(input);
            translates.push(translate);
         }
      }
      var rotationCount = input.readUint32();
      var rotationBytes = RInteger.strideByte(rotationCount);
      if(rotationCount > 0){
         var rotations = o._frameRotations = new TObjects();
         for(var i = 0; i < rotationCount; i++){
            var rotation = new SQuaternion();
            rotation.unserialize(input);
            rotations.push(rotation);
         }
      }
      var scaleCount = input.readUint32();
      var scaleBytes = RInteger.strideByte(scaleCount);
      if(scaleCount > 0){
         var scales = o._frameScales = new TObjects();
         for(var i = 0; i < scaleCount; i++){
            var scale = new SVector3();
            scale.unserialize(input);
            scales.push(scale);
         }
      }
      var tracks = null;
      var trackCount = input.readUint16();
      if(trackCount > 0){
         tracks = o._tracks = new TObjects();
         for(var n = 0; n < trackCount; n++){
            var track = RClass.create(FE3sTrack);
            track.unserialize(input);
            tracks.push(track);
            var frameCount = track._frameCount;
            var frames = track._frames;
            for(var i = 0; i < frameCount; i++){
               var frame = RClass.create(FE3sFrame);
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
}
with(MO){
   MO.FE3sBone = function FE3sBone(o){
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
   MO.FE3sBone_index = function FE3sBone_index(){
      return this._index;
   }
   MO.FE3sBone_track = function FE3sBone_track(){
      return this._track;
   }
   MO.FE3sBone_setTrack = function FE3sBone_setTrack(p){
      this._track = p;
   }
   MO.FE3sBone_bones = function FE3sBone_bones(){
      return this._bones;
   }
   MO.FE3sBone_unserialize = function FE3sBone_unserialize(p){
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
}
with(MO){
   MO.FE3sBoneRefer = function FE3sBoneRefer(o){
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
   MO.FE3sBoneRefer_index = function FE3sBoneRefer_index(){
      return this._index;
   }
   MO.FE3sBoneRefer_bone = function FE3sBoneRefer_bone(){
      return this._bone;
   }
   MO.FE3sBoneRefer_setBone = function FE3sBoneRefer_setBone(p){
      this._bone = p;
   }
   MO.FE3sBoneRefer_track = function FE3sBoneRefer_track(){
      return this._track;
   }
   MO.FE3sBoneRefer_setTrack = function FE3sBoneRefer_setTrack(p){
      this._track = p;
   }
   MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(p){
      var o = this;
      o._index = p.readUint8();
   }
}
with(MO){
   MO.FE3sCamera = function FE3sCamera(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeCd     = null;
      o._position   = null;
      o._direction  = null;
      o._projection = null;
      o.construct   = FE3sCamera_construct;
      o.typeCd      = FE3sCamera_typeCd;
      o.position    = FE3sCamera_position;
      o.direction   = FE3sCamera_direction;
      o.projection  = FE3sCamera_projection;
      o.unserialize = FE3sCamera_unserialize;
      o.saveConfig  = FE3sCamera_saveConfig;
      return o;
   }
   MO.FE3sCamera_construct = function FE3sCamera_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._position = new SPoint3();
      o._direction = new SVector3();
      o._projection = RClass.create(FE3sProjection);
   }
   MO.FE3sCamera_typeCd = function FE3sCamera_typeCd(){
      return this._typeCd;
   }
   MO.FE3sCamera_position = function FE3sCamera_position(){
      return this._position;
   }
   MO.FE3sCamera_direction = function FE3sCamera_direction(){
      return this._direction;
   }
   MO.FE3sCamera_projection = function FE3sCamera_projection(){
      return this._projection;
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
}
with(MO){
   MO.FE3sComponent = function FE3sComponent(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sDisplay = function FE3sDisplay(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._outline         = null;
      o._renderables     = null;
      o.construct        = FE3sDisplay_construct;
      o.renderables      = FE3sDisplay_renderables;
      o.calculateOutline = FE3sDisplay_calculateOutline;
      o.unserialize      = FE3sDisplay_unserialize;
      o.saveConfig       = FE3sDisplay_saveConfig;
      o.clone            = FE3sDisplay_clone;
      return o;
   }
   MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
      o._outline = new SOutline3d();
   }
   MO.FE3sDisplay_renderables = function FE3sDisplay_renderables(){
      return this._renderables;
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
               var renderable = renderabels.getAt(i);
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
}
with(MO){
   MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
      o = RClass.inherits(this, o, FE3sDisplay);
      o._displays        = null;
      o.construct        = FE3sDisplayContainer_construct;
      o.displays         = FE3sDisplayContainer_displays;
      o.pushDisplay      = FE3sDisplayContainer_pushDisplay;
      o.calculateOutline = FE3sDisplayContainer_calculateOutline;
      o.unserialize      = FE3sDisplayContainer_unserialize;
      o.saveConfig       = FE3sDisplayContainer_saveConfig;
      o.clone            = FE3sDisplayContainer_clone;
      return o;
   }
   MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
   }
   MO.FE3sDisplayContainer_displays = function FE3sDisplayContainer_displays(){
      return this._displays;
   }
   MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
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
         var displays = o._displays = new TObjects();
         for(var i = 0; i < displayCount; i++){
            var display = RClass.create(FE3sSceneDisplay);
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
}
with(MO){
   MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._typeCd        = null;
      o._transformCd   = null;
      o.typeCd         = FE3sDisplayLayer_typeCd;
      o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
      o.transformCd    = FE3sDisplayLayer_transformCd;
      o.setTransformCd = FE3sDisplayLayer_setTransformCd;
      o.unserialize    = FE3sDisplayLayer_unserialize;
      o.saveConfig     = FE3sDisplayLayer_saveConfig;
      return o;
   }
   MO.FE3sDisplayLayer_typeCd = function FE3sDisplayLayer_typeCd(){
      return this._typeCd;
   }
   MO.FE3sDisplayLayer_setTypeCd = function FE3sDisplayLayer_setTypeCd(p){
      this._typeCd = p;
   }
   MO.FE3sDisplayLayer_transformCd = function FE3sDisplayLayer_transformCd(){
      return this._transformCd;
   }
   MO.FE3sDisplayLayer_setTransformCd = function FE3sDisplayLayer_setTransformCd(p){
      this._transformCd = p;
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
}
with(MO){
   MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._groupGuid  = null;
      o._material   = null;
      o.groupGuid   = FE3sDisplayMaterial_groupGuid;
      o.material    = FE3sDisplayMaterial_material;
      o.unserialize = FE3sDisplayMaterial_unserialize;
      return o;
   }
   MO.FE3sDisplayMaterial_groupGuid = function FE3sDisplayMaterial_groupGuid(){
      return this._groupGuid;
   }
   MO.FE3sDisplayMaterial_material = function FE3sDisplayMaterial_material(){
      return this._material;
   }
   MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
      var o = this;
      o._groupGuid = p.readString();
      o._material = o._template._activeTheme.findMaterial(o._groupGuid);
   }
}
with(MO){
   MO.FE3sDrawable = function FE3sDrawable(o){
      o = RClass.inherits(this, o, FE3sComponent);
      o._matrix     = null;
      o.construct   = FE3sDrawable_construct;
      o.matrix      = FE3sDrawable_matrix;
      o.unserialize = FE3sDrawable_unserialize;
      o.saveConfig  = FE3sDrawable_saveConfig;
      o.clone       = FE3sDrawable_clone;
      return o;
   }
   MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
      var o = this;
      o.__base.FE3sComponent.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3sDrawable_matrix = function FE3sDrawable_matrix(){
      return this._matrix;
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
}
with(MO){
   MO.FE3sFrame = function FE3sFrame(o){
      o = RClass.inherits(this, o, FObject);
      o._translation = null;
      o._quaternion  = null;
      o._scale       = null;
      o.translation  = FE3sFrame_translation;
      o.quaternion   = FE3sFrame_quaternion;
      o.scale        = FE3sFrame_scale;
      return o;
   }
   MO.FE3sFrame_tick = function FE3sFrame_tick(){
      return this._tick;
   }
   MO.FE3sFrame_translation = function FE3sFrame_translation(){
      return this._translation;
   }
   MO.FE3sFrame_quaternion = function FE3sFrame_quaternion(){
      return this._quaternion;
   }
   MO.FE3sFrame_scale = function FE3sFrame_scale(){
      return this._scale;
   }
}
with(MO){
   MO.FE3sGeometry = function FE3sGeometry(o){
      o = RClass.inherits(this, o, FE3sRenderable, ME3sGeometry);
      o.construct     = FE3sGeometry_construct;
      o.unserialize   = FE3sGeometry_unserialize;
      o.dispose       = FE3sGeometry_dispose;
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
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
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
}
with(MO){
   MO.FE3sLight = function FE3sLight(o){
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
   MO.FE3sLight_construct = function FE3sLight_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
   }
   MO.FE3sLight_typeName = function FE3sLight_typeName(){
      return this._typeName;
   }
   MO.FE3sLight_material = function FE3sLight_material(){
      return this._material;
   }
   MO.FE3sLight_camera = function FE3sLight_camera(){
      return this._camera;
   }
   MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeName = p.readString();
      o._material.unserialize(p);
      o._camera.unserialize(p);
   }
}
with(MO){
   MO.FE3sMaterial = function FE3sMaterial(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._parentGuid  = null;
      o._info        = null;
      o._bitmaps     = null;
      o._bitmapPacks = null;
      o.construct    = FE3sMaterial_construct;
      o.parentGuid   = FE3sMaterial_parentGuid;
      o.effectCode   = FE3sMaterial_effectCode;
      o.info         = FE3sMaterial_info;
      o.bitmaps      = FE3sMaterial_bitmaps;
      o.bitmapPacks  = FE3sMaterial_bitmapPacks;
      o.unserialize  = FE3sMaterial_unserialize;
      o.saveConfig   = FE3sMaterial_saveConfig;
      o.clone        = FE3sMaterial_clone;
      return o;
   }
   MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._info = new SE3sMaterialInfo();
   }
   MO.FE3sMaterial_parentGuid = function FE3sMaterial_parentGuid(){
      return this._parentGuid;
   }
   MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
      return this._info.effectCode;
   }
   MO.FE3sMaterial_info = function FE3sMaterial_info(){
      return this._info;
   }
   MO.FE3sMaterial_bitmaps = function FE3sMaterial_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sMaterial_bitmapPacks = function FE3sMaterial_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._parentGuid = input.readString();
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
}
with(MO){
   MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
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
   MO.FE3sMaterialBitmap_bitmapPackGuid = function FE3sMaterialBitmap_bitmapPackGuid(){
      return this._bitmapPackGuid;
   }
   MO.FE3sMaterialBitmap_bitmapPack = function FE3sMaterialBitmap_bitmapPack(){
      return this._bitmapPack;
   }
   MO.FE3sMaterialBitmap_setBitmapPack = function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
      this._bitmapPack = bitmapPack;
   }
   MO.FE3sMaterialBitmap_bitmapGuid = function FE3sMaterialBitmap_bitmapGuid(){
      return this._bitmapGuid;
   }
   MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._bitmapPackGuid = input.readString();
      o._bitmapGuid = input.readString();
      o._index = input.readUint16();
   }
}
with(MO){
   MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
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
   MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sMaterialBitmapPack_typeName = function FE3sMaterialBitmapPack_typeName(){
      return this._typeName;
   }
   MO.FE3sMaterialBitmapPack_formatName = function FE3sMaterialBitmapPack_formatName(){
      return this._formatName;
   }
   MO.FE3sMaterialBitmapPack_size = function FE3sMaterialBitmapPack_size(){
      return this._size;
   }
   MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._typeName = input.readString();
      o._formatName = input.readString();
      o._size.unserialize(input, EDataType.Uint16);
   }
   MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._resources  = null;
      o._materials  = null;
      o.construct   = FE3sMaterialConsole_construct;
      o.find        = FE3sMaterialConsole_find;
      o.unserialize = FE3sMaterialConsole_unserialize;
      o.loadByGuid  = FE3sMaterialConsole_loadByGuid;
      o.dispose     = FE3sMaterialConsole_dispose;
      return o;
   }
   MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._resources = new TDictionary();
      o._materials = new TDictionary();
   }
   MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
      return this._materials.get(p);
   }
   MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
      var o = this;
      var material = RClass.create(FE3sMaterial);
      material.unserialize(input);
      var materialGuid = material.guid();
      if(o._materials.contains(materialGuid)){
         throw new TError(o, 'Material is already exists.');
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
      var vendor = RConsole.find(FE3sVendorConsole).find('material');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      resource = RClass.create(FE3sMaterialResource);
      resource.setGuid(guid);
      resource.setVendor(vendor);
      resource.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(resource);
      resources.set(guid, resource);
      return resource;
   }
   MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
      var o = this;
      o._resources = RObject.free(o._resources);
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialRefer = function FE3sMaterialRefer(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sMaterialResource = function FE3sMaterialResource(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._typeName     = 'Material';
      o._dataCompress = true;
      o._material     = null;
      o.material      = FE3sMaterialResource_material;
      o.unserialize   = FE3sMaterialResource_unserialize;
      return o;
   }
   MO.FE3sMaterialResource_material = function FE3sMaterialResource_material(){
      return this._material;
   }
   MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, input);
      o._material = RConsole.find(FE3sMaterialConsole).unserialize(input);
      MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
   }
}
with(MO){
   MO.FE3sMesh = function FE3sMesh(o){
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
   MO.FE3sMesh_construct = function FE3sMesh_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      o.__base.ME3sGeometry.construct.call(o);
      o._display = RClass.create(FE3sMeshDisplay);
   }
   MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
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
   MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, config);
      o._display.saveConfig(config.create('Display'));
   }
   MO.FE3sMesh_dispose = function FE3sMesh_dispose(){
      var o = this;
      o._outline = RObject.dispose(o._outline);
      o._display = RObject.dispose(o._display);
      o.__base.ME3sGeometry.dispose.call(o);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshConsole = function FE3sMeshConsole(o){
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
   MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._meshs = new TDictionary();
   }
   MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
      return this._meshs.get(p);
   }
   MO.FE3sMeshConsole_meshs = function FE3sMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
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
   MO.FE3sMeshConsole_loadByCode = function FE3sMeshConsole_loadByCode(p){
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
   MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
      var o = this;
      o._meshs = RObject.free(o._meshs);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
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
   MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._material = RClass.create(FE3sMaterial);
      o._renderable = RClass.create(FE3sRenderable);
   }
   MO.FE3sMeshDisplay_matrix = function FE3sMeshDisplay_matrix(){
      return this._matrix;
   }
   MO.FE3sMeshDisplay_material = function FE3sMeshDisplay_material(){
      return this._material;
   }
   MO.FE3sMeshDisplay_renderable = function FE3sMeshDisplay_renderable(){
      return this._renderable;
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
}
with(MO){
   MO.FE3sModel = function FE3sModel(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName      = 'Model';
      o._dataCompress  = true;
      o._dataBlock     = true;
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
   MO.FE3sModel_construct = function FE3sModel_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      var display = o._display = RClass.create(FE3sModelDisplay);
      display._model = o;
   }
   MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
      var s = this._meshes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3sModel_meshes = function FE3sModel_meshes(){
      return this._meshes;
   }
   MO.FE3sModel_skeletons = function FE3sModel_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModel_animations = function FE3sModel_animations(){
      return this._animations;
   }
   MO.FE3sModel_display = function FE3sModel_display(){
      return this._display;
   }
   MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
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
      MO.Logger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
   }
   MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, xconfig);
      o._display.saveConfig(xconfig.create('Display'));
   }
}
with(MO){
   MO.FE3sModelConsole = function FE3sModelConsole(o){
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
   MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
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
   MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
      return this._models.get(p);
   }
   MO.FE3sModelConsole_models = function FE3sModelConsole_models(){
      return this._models;
   }
   MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3sModelConsole_meshs = function FE3sModelConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
      return this._skeletons.get(p);
   }
   MO.FE3sModelConsole_skeletons = function FE3sModelConsole_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
      return this._animations.get(p);
   }
   MO.FE3sModelConsole_animations = function FE3sModelConsole_animations(){
      return this._animations;
   }
   MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
      var o = this;
      var r = RClass.create(FE3sModelMesh);
      r.unserialize(p);
      o._meshs.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
      var o = this;
      var r = RClass.create(FE3sSkeleton);
      r.unserialize(p);
      o._skeletons.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
      var o = this;
      var r = RClass.create(FE3sAnimation);
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
   MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sModelDisplay = function FE3sModelDisplay(o){
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
   MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
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
}
with(MO){
   MO.FE3sModelMesh = function FE3sModelMesh(o){
      o = RClass.inherits(this, o, FE3sGeometry);
      return o;
   }
}
with(MO){
   MO.FE3sModelRenderable = function FE3sModelRenderable(o){
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
   MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sModelRenderable_meshGuid = function FE3sModelRenderable_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sModelRenderable_mesh = function FE3sModelRenderable_mesh(){
      return this._mesh;
   }
   MO.FE3sModelRenderable_setMesh = function FE3sModelRenderable_setMesh(mesh){
      this._mesh = mesh;
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
}
with(MO){
   MO.FE3sMovie = function FE3sMovie(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._interval   = null;
      o._rotation   = null;
      o.construct   = FE3sMovie_construct;
      o.interval    = FE3sMovie_interval;
      o.setInterval = FE3sMovie_setInterval;
      o.rotation    = FE3sMovie_rotation;
      o.unserialize = FE3sMovie_unserialize;
      o.saveConfig  = FE3sMovie_saveConfig;
      o.dispose     = FE3sMovie_dispose;
      return o;
   }
   MO.FE3sMovie_construct = function FE3sMovie_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._rotation = new SVector3();
   }
   MO.FE3sMovie_interval = function FE3sMovie_interval(){
      return this._interval;
   }
   MO.FE3sMovie_setInterval = function FE3sMovie_setInterval(interval){
      this._interval = interval;
   }
   MO.FE3sMovie_rotation = function FE3sMovie_rotation(){
      return this._rotation;
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
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FE3sObject.disposet.call(o);
   }
}
with(MO){
   MO.FE3sObject = function FE3sObject(o){
      o = RClass.inherits(this, o, FObject, MParent);
      o._typeName   = null;
      o._guid       = RClass.register(o, new AGetSet('_guid'));
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._label      = RClass.register(o, new AGetSet('_label'));
      o._isClone    = false;
      o.makeLabel   = FE3sObject_makeLabel;
      o.unserialize = FE3sObject_unserialize;
      o.saveConfig  = FE3sObject_saveConfig;
      o.clone       = FE3sObject_clone;
      o.dispose     = FE3sObject_dispose;
      return o;
   }
   MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
      var o = this;
      var result = '';
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
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
      if(!RString.isEmpty(o._typeName)){
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
         result = RClass.create(o.constructor);
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
}
with(MO){
   MO.FE3sProjection = function FE3sProjection(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._angle      = null;
      o._znear      = null;
      o._zfar       = null;
      o.angle       = FE3sProjection_angle;
      o.znear       = FE3sProjection_znear;
      o.zfar        = FE3sProjection_zfar;
      o.unserialize = FE3sProjection_unserialize;
      o.saveConfig  = FE3sProjection_saveConfig;
      return o;
   }
   MO.FE3sProjection_angle = function FE3sProjection_angle(){
      return this._angle;
   }
   MO.FE3sProjection_znear = function FE3sProjection_znear(){
      return this._znear;
   }
   MO.FE3sProjection_zfar = function FE3sProjection_zfar(){
      return this._zfar;
   }
   MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._angle = p.readFloat();
      o._znear = p.readFloat();
      o._zfar = p.readFloat();
   }
   MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.setFloat('angle', o._angle);
      xconfig.setFloat('znear', o._znear);
      xconfig.setFloat('zfar', o._zfar);
   }
}
with(MO){
   MO.FE3sRegion = function FE3sRegion(o){
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
   MO.FE3sRegion_construct = function FE3sRegion_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._backgroundColor = new SColor4();
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
      o._light = RClass.create(FE3sLight);
   }
   MO.FE3sRegion_optionBackground = function FE3sRegion_optionBackground(){
      return this._optionBackground;
   }
   MO.FE3sRegion_setOptionBackground = function FE3sRegion_setOptionBackground(p){
      this._optionBackground = p;
   }
   MO.FE3sRegion_backgroundColor = function FE3sRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3sRegion_moveSpeed = function FE3sRegion_moveSpeed(){
      return this._moveSpeed;
   }
   MO.FE3sRegion_setMoveSpeed = function FE3sRegion_setMoveSpeed(p){
      this._moveSpeed = p;
   }
   MO.FE3sRegion_rotationKeySpeed = function FE3sRegion_rotationKeySpeed(){
      return this._rotationKeySpeed;
   }
   MO.FE3sRegion_setRotationKeySpeed = function FE3sRegion_setRotationKeySpeed(p){
      this._rotationKeySpeed = p;
   }
   MO.FE3sRegion_rotationMouseSpeed = function FE3sRegion_rotationMouseSpeed(){
      return this._rotationMouseSpeed;
   }
   MO.FE3sRegion_setRotationMouseSpeed = function FE3sRegion_setRotationMouseSpeed(p){
      this._rotationMouseSpeed = p;
   }
   MO.FE3sRegion_camera = function FE3sRegion_camera(){
      return this._camera;
   }
   MO.FE3sRegion_light = function FE3sRegion_light(){
      return this._light;
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
}
with(MO){
   MO.FE3sRenderable = function FE3sRenderable(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._materialRefers   = null;
      o.construct         = FE3sRenderable_construct;
      o.materialRefers    = FE3sRenderable_materialRefers;
      o.syncMaterialRefer = FE3sRenderable_syncMaterialRefer;
      o.pushMaterialRefer = FE3sRenderable_pushMaterialRefer;
      o.unserialize       = FE3sRenderable_unserialize;
      o.saveConfig        = FE3sRenderable_saveConfig;
      o.clone             = FE3sRenderable_clone;
      return o;
   }
   MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
   }
   MO.FE3sRenderable_materialRefers = function FE3sRenderable_materialRefers(){
      return this._materialRefers;
   }
   MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      for(var i = materialRefers.count(); i <= index; i++){
         materialRefers.push(RClass.create(FE3sMaterialRefer));
      }
      return materialRefers.at(index);
   }
   MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      materialRefers.push(materialRefer);
   }
   MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
      var o = this;
      o.__base.FE3sDrawable.unserialize.call(o, input);
      var count = input.readUint16();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var materialRefer = RClass.create(FE3sMaterialRefer);
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
}
with(MO){
   MO.FE3sResource = function FE3sResource(o){
      o = RClass.inherits(this, o, FResource, MListenerLoad);
      o._dataLoad   = false;
      o._dataReady  = false;
      o._dataSize   = 0;
      o._blockSize  = 0;
      o._blockCount = 0;
      o._vendor     = RClass.register(o, new AGetSet('_vendor'));
      o.onComplete  = FE3sResource_onComplete;
      o.makeLabel   = FE3sResource_makeLabel;
      o.testReady   = FE3sResource_testReady;
      o.unserialize = FE3sResource_unserialize;
      o.saveConfig  = FE3sResource_saveConfig;
      o.dispose     = FE3sResource_dispose;
      return o;
   }
   MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
      var o = this;
      if(RClass.isClass(input, MDataStream)){
         o.unserialize(input);
      }else{
         var view = RClass.create(FDataView);
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
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
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
      if(!RString.isEmpty(o._typeName)){
         xconfig.setName(o._typeName);
      }
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
   MO.FE3sResource_dispose = function FE3sResource_dispose(){
      var o = this;
      o._vendor = null;
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sResourceConsole = function FE3sResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._factory            = null;
      o.construct           = FE3sResourceConsole_construct;
      o.factory             = FE3sResourceConsole_factory;
      o.create              = FE3sResourceConsole_create;
      o.unserializeResource = FE3sResourceConsole_unserializeResource;
      o.unserialize         = FE3sResourceConsole_unserialize;
      return o;
   }
   MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register('Shape', FE3sShape);
      factory.register('Sprite', FE3sSprite);
      factory.register('ModelMesh', FE3sModelMesh);
      factory.register('ModelRenderable', FE3sModelRenderable);
   }
   MO.FE3sResourceConsole_factory = function FE3sResourceConsole_factory(){
      return this._factory;
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
}
with(MO){
   MO.FE3sScene = function FE3sScene(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Scene';
      o._dataCompress = true;
      o._templates    = null;
      o.construct     = FE3sScene_construct;
      o.unserialize   = FE3sScene_unserialize;
      o.saveConfig    = FE3sScene_saveConfig;
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
         var templateConsole = RConsole.find(FE3sTemplateConsole);
         var templates = o._templates = new TDictionary();
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
}
with(MO){
   MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._playRate   = 1;
      o.construct   = FE3sSceneAnimation_construct;
      o.playRate    = FE3sSceneAnimation_playRate;
      o.setPlayRate = FE3sSceneAnimation_setPlayRate;
      o.unserialize = FE3sSceneAnimation_unserialize;
      o.saveConfig  = FE3sSceneAnimation_saveConfig;
      return o;
   }
   MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
   }
   MO.FE3sSceneAnimation_playRate = function FE3sSceneAnimation_playRate(){
      return this._playRate;
   }
   MO.FE3sSceneAnimation_setPlayRate = function FE3sSceneAnimation_setPlayRate(playRate){
      this._playRate = playRate;
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
}
with(MO){
   MO.FE3sSceneConsole = function FE3sSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._vendorCode = 'scene';
      o._dataUrl    = '/cloud.content.scene.wv'
      o._scenes     = null;
      o.construct   = FE3sSceneConsole_construct;
      o.loadByGuid  = FE3sSceneConsole_loadByGuid;
      o.loadByCode  = FE3sSceneConsole_loadByCode;
      return o;
   }
   MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._scenes = new TDictionary();
   }
   MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
      var o = this;
      var scenes = o._scenes;
      var scene = scenes.get(guid);
      if(scene){
         return scene;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setGuid(guid);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
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
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('code', code);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setCode(code);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
      scenes.set(code, scene);
      return scene;
   }
}
with(MO){
   MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
      o = RClass.inherits(this, o, FE3sSprite);
      o._templateGuid        = null;
      o._animations          = null;
      o._movies              = null;
      o._renderables         = null;
      o.construct            = FE3sSceneDisplay_construct;
      o.templateGuid         = FE3sSceneDisplay_templateGuid;
      o.findAnimation        = FE3sSceneDisplay_findAnimation;
      o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
      o.animations           = FE3sSceneDisplay_animations;
      o.movies               = FE3sSceneDisplay_movies;
      o.renderables          = FE3sSceneDisplay_renderables;
      o.unserialize          = FE3sSceneDisplay_unserialize;
      o.saveConfig           = FE3sSceneDisplay_saveConfig;
      o.clone                = FE3sSceneDisplay_clone;
      return o;
   }
   MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
      var o = this;
      o.__base.FE3sSprite.construct.call(o);
   }
   MO.FE3sSceneDisplay_templateGuid = function FE3sSceneDisplay_templateGuid(){
      return this._templateGuid;
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
         animations = o._animations = new TDictionary();
      }
      var animation = animations.get(guid);
      if(!animation){
         animation = RClass.create(FE3sSceneAnimation);
         animation._guid = guid;
         animations.set(guid, animation);
      }
      return animation;
   }
   MO.FE3sSceneDisplay_animations = function FE3sSceneDisplay_animations(){
      return this._animations;
   }
   MO.FE3sSceneDisplay_movies = function FE3sSceneDisplay_movies(){
      return this._movies;
   }
   MO.FE3sSceneDisplay_renderables = function FE3sSceneDisplay_renderables(){
      return this._renderables;
   }
   MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
      var o = this;
      o.__base.FE3sSprite.unserialize.call(o, input);
      o._templateGuid = input.readString();
      var animationCount = input.readUint16();
      if(animationCount > 0){
         var animations = o._animations = new TDictionary();
         for(var i = 0; i < animationCount; i++){
            var animation = RClass.create(FE3sSceneAnimation);
            animation.unserialize(input);
            animations.set(animation.guid(), animation);
         }
      }
      var movieCount = input.readUint16();
      if(movieCount > 0){
         var movies = o._movies = new TObjects();
         for(var i = 0; i < movieCount; i++){
            var movie = RClass.create(FE3sMovie);
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
}
with(MO){
   MO.FE3sSceneLayer = function FE3sSceneLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayLayer);
      return o;
   }
}
with(MO){
   MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
      o = RClass.inherits(this, o, FE3sObject);
      o.unserialize = FE3sSceneRenderable_unserialize;
      return o;
   }
   MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
   }
}
with(MO){
   MO.FE3sShape = function FE3sShape(o){
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
   MO.FE3sShape_construct = function FE3sShape_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sShape_modelGuid = function FE3sShape_modelGuid(){
      return this._modelGuid;
   }
   MO.FE3sShape_model = function FE3sShape_model(){
      var o = this;
      var model = o._model;
      if(!model){
         model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
      }
      return model;
   }
   MO.FE3sShape_meshGuid = function FE3sShape_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sShape_mesh = function FE3sShape_mesh(){
      var o = this;
      var mesh = o._mesh;
      if(!mesh){
         mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
      }
      return mesh;
   }
   MO.FE3sShape_materialGuid = function FE3sShape_materialGuid(){
      return this._materialGuid;
   }
   MO.FE3sShape_material = function FE3sShape_material(){
      var o = this;
      var material = o._material;
      if(!material){
         material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
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
}
with(MO){
   MO.FE3sSkeleton = function FE3sSkeleton(o){
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
   MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
      return this._bones.get(p);
   }
   MO.FE3sSkeleton_bones = function FE3sSkeleton_bones(){
      return this._bones;
   }
   MO.FE3sSkeleton_roots = function FE3sSkeleton_roots(){
      return this._roots;
   }
   MO.FE3sSkeleton_skins = function FE3sSkeleton_skins(){
      return this._skins;
   }
   MO.FE3sSkeleton_animations = function FE3sSkeleton_animations(){
      return this._animations;
   }
   MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TObjects();
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
}
with(MO){
   MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
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
   MO.FE3sSkeletonSkin_meshGuid = function FE3sSkeletonSkin_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
      return this._streams.get(p);
   }
   MO.FE3sSkeletonSkin_streams = function FE3sSkeletonSkin_streams(){
      return this._streams;
   }
   MO.FE3sSkeletonSkin_boneRefers = function FE3sSkeletonSkin_boneRefers(){
      return this._boneRefers;
   }
   MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._meshGuid = input.readString();
      var streamCount = input.readUint8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input);
            streams.push(stream);
         }
      }
      var boneReferCount = input.readUint8();
      if(boneReferCount > 0){
         var boneRefers = o._boneRefers = new TObjects();
         for(var i = 0; i < boneReferCount; i++){
            var boneRefer = RClass.create(FE3sBoneRefer);
            boneRefer.unserialize(input);
            boneRefers.push(boneRefer);
         }
      }
   }
}
with(MO){
   MO.FE3sSpace = function FE3sSpace(o){
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
   MO.FE3sSpace_construct = function FE3sSpace_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
      o._technique = RClass.create(FE3sTechnique);
      o._region = RClass.create(FE3sRegion);
   }
   MO.FE3sSpace_technique = function FE3sSpace_technique(){
      return this._technique;
   }
   MO.FE3sSpace_region = function FE3sSpace_region(){
      return this._region;
   }
   MO.FE3sSpace_materials = function FE3sSpace_materials(){
      return this._materials;
   }
   MO.FE3sSpace_displays = function FE3sSpace_displays(){
      return this._displays;
   }
   MO.FE3sSpace_layers = function FE3sSpace_layers(){
      return this._layers;
   }
   MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
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
}
with(MO){
   MO.FE3sSprite = function FE3sSprite(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._materials   = null;
      o.construct    = FE3sSprite_construct;
      o.materials    = FE3sSprite_materials;
      o.pushMaterial = FE3sSprite_pushMaterial;
      o.unserialize  = FE3sSprite_unserialize;
      o.saveConfig   = FE3sSprite_saveConfig;
      o.clone        = FE3sSprite_clone;
      return o;
   }
   MO.FE3sSprite_construct = function FE3sSprite_construct(){
      var o = this;
      o.__base.FE3sDisplayContainer.construct.call(o);
   }
   MO.FE3sSprite_materials = function FE3sSprite_materials(){
      return this._materials;
   }
   MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TDictionary();
      }
      materials.set(material.guid(), material);
   }
   MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      var materialCount = input.readUint16();
      if(materialCount > 0){
         var materialConsole = RConsole.find(FE3sMaterialConsole);
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
}
with(MO){
   MO.FE3sStream = function FE3sStream(o){
      o = RClass.inherits(this, o, FObject);
      o._code             = RClass.register(o, new AGetSet('_code'));
      o._elementDataCd    = RClass.register(o, new AGetSet('_elementDataCd'), 0);
      o._elementCount     = RClass.register(o, new AGetSet('_elementCount'), 0);
      o._elementNormalize = RClass.register(o, new AGetSet('_elementNormalize'), false);
      o._dataStride       = RClass.register(o, new AGetSet('_dataStride'), 0);
      o._dataCount        = RClass.register(o, new AGetSet('_dataCount'), 0);
      o._dataLength       = RClass.register(o, new AGetSet('_dataLength'), 0);
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._formatCd         = RClass.register(o, new AGetSet('_formatCd'), EG3dAttributeFormat.Unknown);
      o.unserialize       = FE3sStream_unserialize;
      o.dispose           = FE3sStream_dispose;
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
}
with(MO){
   MO.FE3sTechnique = function FE3sTechnique(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._techniqueCode = null;
      o._passes        = null;
      o.passes         = FE3sTechnique_passes;
      o.unserialize    = FE3sTechnique_unserialize;
      o.saveConfig     = FE3sTechnique_saveConfig;
      return o;
   }
   MO.FE3sTechnique_passes = function FE3sTechnique_passes(){
      return this._passes;
   }
   MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
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
   MO.FE3sTechnique_saveConfig = function FE3sTechnique_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      p.set('technique_code', o._techniqueCode);
   }
}
with(MO){
   MO.FE3sTechniquePass = function FE3sTechniquePass(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._targetWidth  = null;
      o._targetHeight = null;
      o.targetWidth   = FE3sTechniquePass_targetWidth;
      o.targetHeight  = FE3sTechniquePass_targetHeight;
      o.unserialize   = FE3sTechniquePass_unserialize;
      return o;
   }
   MO.FE3sTechniquePass_targetWidth = function FE3sTechniquePass_targetWidth(){
      return this._targetWidth;
   }
   MO.FE3sTechniquePass_targetHeight = function FE3sTechniquePass_targetHeight(){
      return this._targetHeight;
   }
   MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._targetWidth = input.readUint16();
      o._targetHeight = input.readUint16();
   }
}
with(MO){
   MO.FE3sTemplate = function FE3sTemplate(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Template';
      o._dataCompress = true;
      return o;
   }
}
with(MO){
   MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
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
   MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._templates = new TDictionary();
   }
   MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTemplate);
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
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setGuid(guid);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
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
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('code', code);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setCode(code);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
      templates.set(code, template);
      return template;
   }
   MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
      var o = this;
      var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
      RConsole.find(FXmlConsole).send(u, p);
   }
}
with(MO){
   MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._materials   = null;
      o.findMaterial = FE3sTemplateTheme_findMaterial;
      o.materials    = FE3sTemplateTheme_materials;
      o.unserialize  = FE3sTemplateTheme_unserialize;
      return o;
   }
   MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
      return this._materials.get(p);
   }
   MO.FE3sTemplateTheme_materials = function FE3sTemplateTheme_materials(){
      return this._materials;
   }
   MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
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
}
with(MO){
   MO.FE3sTexture = function FE3sTexture(o){
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
   MO.FE3sTexture_construct = function FE3sTexture_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
   }
   MO.FE3sTexture_bitmaps = function FE3sTexture_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sTexture_bitmapPacks = function FE3sTexture_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
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
   MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
      var o = this;
      o._bitmaps = RObject.free(o._bitmaps);
      o._bitmapPacks = RObject.free(o._bitmapPacks);
      o.__base.FE3sResource.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._packCode   = null;
      o.packCode    = FE3sTextureBitmap_packCode;
      o.unserialize = FE3sTextureBitmap_unserialize;
      return o;
   }
   MO.FE3sTextureBitmap_packCode = function FE3sTextureBitmap_packCode(){
      return this._packCode;
   }
   MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._packCode = p.readString();
   }
}
with(MO){
   MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
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
   MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sTextureBitmapPack_optionCompress = function FE3sTextureBitmapPack_optionCompress(){
      return this._optionCompress;
   }
   MO.FE3sTextureBitmapPack_size = function FE3sTextureBitmapPack_size(){
      return this._size;
   }
   MO.FE3sTextureBitmapPack_data = function FE3sTextureBitmapPack_data(){
      return this._data;
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
         throw new TError(o, 'Unserial texture failure ');
      }
   }
   MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
      var o = this;
      o._data = null;
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureConsole = function FE3sTextureConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._textures   = null;
      o.construct   = FE3sTextureConsole_construct;
      o.unserialize = FE3sTextureConsole_unserialize;
      o.load        = FE3sTextureConsole_load;
      o.loadBitmap  = FE3sTextureConsole_loadBitmap;
      o.dispose     = FE3sModelConsole_dispose;
      return o;
   }
   MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._textures = new TDictionary();
   }
   MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTexture);
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
   MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
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
   MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
      var o = this;
      o._textures = RObject.free(o._textures);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTheme = function FE3sTheme(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._materials  = null;
      o.materials   = FE3sTheme_materials;
      o.find        = FE3sTheme_find;
      o.unserialize = FE3sTheme_unserialize;
      return o;
   }
   MO.FE3sTheme_materials = function FE3sTheme_materials(){
      return this._materials;
   }
   MO.FE3sTheme_find = function FE3sTheme_find(p){
      var ms = this._materials;
      return ms ? ms.get(p) : null;
   }
   MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(p){
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
}
with(MO){
   MO.FE3sThemeConsole = function FE3sThemeConsole(o){
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
   MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._themes = new TDictionary();
   }
   MO.FE3sThemeConsole_activeTheme = function FE3sThemeConsole_activeTheme(){
      return this._activeTheme;
   }
   MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(p){
      var t = this._activeTheme;
      if(t == null){
         throw new TError('Active theme is empty.');
      }
      return t.find(p);
   }
   MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(p){
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
}
with(MO){
   MO.FE3sTrack = function FE3sTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._meshCode     = null;
      o._boneIndex    = 0;
      o._frameTick    = 0;
      o._matrix       = null;
      o._matrixInvert = null;
      o._frameCount   = null;
      o._frames       = null;
      o.construct     = FE3sTrack_construct;
      o.boneIndex     = FE3sTrack_boneIndex;
      o.frameTick     = FE3sTrack_frameTick;
      o.matrix        = FE3sTrack_matrix;
      o.matrixInvert  = FE3sTrack_matrixInvert;
      o.frames        = FE3sTrack_frames;
      o.calculate     = FE3sTrack_calculate;
      o.unserialize   = FE3sTrack_unserialize;
      return o;
   }
   MO.FE3sTrack_construct = function FE3sTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._matrixInvert = new SMatrix3d();
   }
   MO.FE3sTrack_boneIndex = function FE3sTrack_boneIndex(){
      return this._boneIndex;
   }
   MO.FE3sTrack_frameTick = function FE3sTrack_frameTick(){
      return this._frameTick;
   }
   MO.FE3sTrack_matrix = function FE3sTrack_matrix(){
      return this._matrix;
   }
   MO.FE3sTrack_matrixInvert = function FE3sTrack_matrixInvert(){
      return this._matrixInvert;
   }
   MO.FE3sTrack_frames = function FE3sTrack_frames(){
      return this._frames;
   }
   MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
      var o = this;
      var frameCount = info.frameCount;
      if(frameCount == 0){
         throw new TError('Frame count is invalid.');
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
      o._frames = new TObjects();
   }
}
with(MO){
   MO.FE3sVendor = function FE3sVendor(o){
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
   MO.FE3sVendor_construct = function FE3sVendor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._parameters = new TAttributes();
   }
   MO.FE3sVendor_contentUrl = function FE3sVendor_contentUrl(p){
      return this._contentUrl;
   }
   MO.FE3sVendor_setContentUrl = function FE3sVendor_setContentUrl(p){
      this._contentUrl = p;
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
         r += 'date=' + RDate.format();
      }
      return r;
   }
   MO.FE3sVendor_reset = function FE3sVendor_reset(){
      this._parameters.clear();
   }
   MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
      var o = this;
      o._parameters = RObject.dispose(o._parameters);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sVendorConsole = function FE3sVendorConsole(o){
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
   MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._vendors = new TDictionary();
   }
   MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
      var v = RClass.create(c);
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
         o._vendors.set('bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
         o._vendors.set('material', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
         o._vendors.set('mesh', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
         o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
         o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
         o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
      }else if(p == 'local'){
         o._vendors.set('bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
         o._vendors.set('material', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/material/{guid}.bin')));
         o._vendors.set('mesh', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
         o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
         o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
         o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
      }else{
         throw new TError(o, 'Unknown setup code. (code={1})', p);
      }
      o._setuped = true;
   }
}
with(MO){
   MO.FE3sVendorLocal = function FE3sVendorLocal(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorLocal_makeSource;
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
         u = RString.replace(u, '{' + n + '}', v);
      }
      return u;
   }
}
with(MO){
   MO.FE3sVendorNet = function FE3sVendorNet(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorNet_makeSource;
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
         if(!RString.isEmpty(value)){
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
}
