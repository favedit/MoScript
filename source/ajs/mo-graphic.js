with(MO){
   MO.MCanvasObject = function MCanvasObject(o){
      o = RClass.inherits(this, o);
      o.htmlCanvas = RMethod.virtual(o, 'htmlCanvas');
      return o;
   }
}
with(MO){
   MO.MGraphicObject = function MGraphicObject(o){
      o = RClass.inherits(this, o);
      o._graphicContext    = null;
      o.graphicContext     = MGraphicObject_graphicContext;
      o.linkGraphicContext = MGraphicObject_linkGraphicContext;
      o.dispose            = MGraphicObject_dispose;
      return o;
   }
   MO.MGraphicObject_graphicContext = function MGraphicObject_graphicContext(){
      return this._graphicContext;
   }
   MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
      var o = this;
      if(RClass.isClass(context, FGraphicContext)){
         o._graphicContext = context;
      }else if(RClass.isClass(context, MGraphicObject)){
         o._graphicContext = context._graphicContext;
      }else{
         throw new TError(o, 'Link graphic context failure. (context={1})', context);
      }
   }
   MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
      var o = this;
      o._graphicContext = null;
   }
}
with(MO){
   MO.MGraphicRenderable = function MGraphicRenderable(o){
      o = RClass.inherits(this, o, FObject);
      o.process = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FFloatStream = function FFloatStream(o){
      o = RClass.inherits(this, o, FObject);
      o._length     = 0;
      o._memory     = null;
      o._position   = 0;
      o.construct   = FFloatStream_construct;
      o.length      = FFloatStream_length;
      o.setLength   = FFloatStream_setLength;
      o.memory      = FFloatStream_memory;
      o.writeFloat4 = FFloatStream_writeFloat4;
      o.writeColor4 = FFloatStream_writeColor4;
      o.reset       = FFloatStream_reset;
      o.clear       = FFloatStream_clear;
      o.dispose     = FFloatStream_dispose;
      return o;
   }
   MO.FFloatStream_construct = function FFloatStream_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FFloatStream_length = function FFloatStream_length(){
      return this._length;
   }
   MO.FFloatStream_setLength = function FFloatStream_setLength(p){
      var o = this;
      o._length = p;
      o._memory = new Float32Array(p);
   }
   MO.FFloatStream_memory = function FFloatStream_memory(){
      return this._memory;
   }
   MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(a, b, c, d){
      var o = this;
      o._memory[o._position++] = a;
      o._memory[o._position++] = b;
      o._memory[o._position++] = c;
      o._memory[o._position++] = d;
   }
   MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(p){
      this.writeFloat4(p.red, p.green, p.blue, p.alpha);
   }
   MO.FFloatStream_reset = function FFloatStream_reset(){
      this._position = 0;
   }
   MO.FFloatStream_clear = function FFloatStream_clear(){
      this._position = 0;
   }
   MO.FFloatStream_dispose = function FFloatStream_dispose(){
      var o = this;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FGraphicContext = function FGraphicContext(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._hCanvas   = null;
      o.construct  = FGraphicContext_construct;
      o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
      o.dispose    = FGraphicContext_dispose;
      return o;
   }
   MO.FGraphicContext_construct = function FGraphicContext_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
      var o = this;
      o._hCanvas = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG2dContext = function FG2dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._native       = null;
      o.construct     = FG2dContext_construct;
      o.linkCanvas    = FG2dContext_linkCanvas;
      o.drawLine      = FG2dContext_drawLine;
      o.drawRecrangle = FG2dContext_drawRecrangle;
      o.drawText      = FG2dContext_drawText;
      o.drawImage     = FG2dContext_drawImage;
      o.fillRecrangle = FG2dContext_fillRecrangle;
      o.dispose       = FG2dContext_dispose;
      return o;
   }
   MO.FG2dContext_construct = function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
   }
   MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(h){
      var o = this;
      o._hCanvas = h;
      o._native = h.getContext('2d')
   }
   MO.FG2dContext_drawLine = function FG2dContext_drawLine(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
   }
   MO.FG2dContext_drawRecrangle = function FG2dContext_drawRecrangle(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.moveTo(x1, y1);
      c.lineTo(x2, y1);
      c.lineTo(x2, y2);
      c.lineTo(x1, y2);
      c.lineTo(x1, y1);
      c.stroke();
   }
   MO.FG2dContext_drawText = function FG2dContext_drawText(x, y, t){
      var o = this;
      o._native.fillText(t, x, y);
   }
   MO.FG2dContext_drawImage = function FG2dContext_drawImage(image, x, y){
      var o = this;
      o._native.drawImage(image, 0, 0);
   }
   MO.FG2dContext_fillRecrangle = function FG2dContext_fillRecrangle(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y1);
      c.lineTo(x2, y2);
      c.lineTo(x1, y2);
      c.lineTo(x1, y1);
      c.closePath();
      c.fill();
   }
   MO.FG2dContext_dispose = function FG2dContext_dispose(){
      var o = this;
      o._native = null;
      o.__base.FGraphicContext.dispose.call(o);
   }
}
with(MO){
   MO.FG2dContext = function FG2dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._size      = null;
      o.construct  = FG2dContext_construct;
      o.linkCanvas = FG2dContext_linkCanvas;
      o.size       = FG2dContext_size;
      o.dispose    = FG2dContext_dispose;
      return o;
   }
   MO.FG2dContext_construct = function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG2dContext_size = function FG2dContext_size(){
      return this._size;
   }
   MO.FG2dContext_dispose = function FG2dContext_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FGraphicContext.dispose.call(o);
   }
}
with(MO){
   MO.FG2dCanvasContext = function FG2dCanvasContext(o){
      o = RClass.inherits(this, o, FG2dContext);
      o._native       = null;
      o.construct     = FG2dCanvasContext_construct;
      o.linkCanvas    = FG2dCanvasContext_linkCanvas;
      o.clear         = FG2dCanvasContext_clear;
      o.drawLine      = FG2dCanvasContext_drawLine;
      o.drawRectangle = FG2dCanvasContext_drawRectangle;
      o.drawText      = FG2dCanvasContext_drawText;
      o.drawImage     = FG2dCanvasContext_drawImage;
      o.fillRectangle = FG2dCanvasContext_fillRectangle;
      o.toBytes       = FG2dCanvasContext_toBytes;
      return o;
   }
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct(){
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas){
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      if(hCanvas.getContext){
         var graphic = hCanvas.getContext('2d');
         if(!graphic){
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._native = graphic;
      }
      o._hCanvas = hCanvas;
   }
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(r, g, b, a, d){
      var o = this;
      var g = o._native;
      var size = o._size;
      g.clearRect(0, 0, size.width, size.height);
   }
   MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
      var o = this;
      var g = o._native;
      g.strokeStyle = color;
      g.lineWidth = lineWidth;
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.stroke();
   }
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
      var o = this;
      var g = o._native;
      g.strokeStyle = color;
      g.lineWidth = lineWidth;
      g.strokeRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color){
      var o = this;
      var g = o._native;
      g.fillStyle = color;
      g.fillText(text, x, y);
   }
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(data, x, y){
      var o = this;
      var g = o._native;
      var pixels = null
      if(data.tagName == 'IMG'){
         pixels = data;
      }else if(RClass.isClass(data, FImage)){
         pixels = data.image();
      }else{
         throw new TError(o, 'Unknown data type');
      }
      g.drawImage(pixels, x, y, o._size.width, o._size.height);
   }
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
      var o = this;
      var g = o._native;
      g.fillStyle = color;
      g.fillRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes(){
      var o = this;
      var s = o._size;
      return o._native.getImageData(0, 0, s.width, s.height);
   }
}
MO.EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
MO.EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
MO.EG3dTechniqueMode = new function EG3dTechniqueMode(){
   var o = this;
   o.Color         = 'color';
   o.Ambient       = 'ambient';
   o.DiffuseLevel  = 'diffuse.level';
   o.DiffuseColor  = 'diffuse.color';
   o.SpecularLevel = 'specular.level';
   o.SpecularColor = 'specular.color';
   o.Reflect       = 'reflect';
   o.Emissive      = 'emissive';
   o.Result        = 'result';
   return o;
}
with(MO){
   MO.MG3dRegion = function MG3dRegion(o){
      o = RClass.inherits(this, o);
      o._changed                    = false;
      o._spaceName                  = null;
      o._technique                  = null;
      o._techniquePass              = null;
      o._camera                     = null;
      o._projection                 = null;
      o._directionalLight           = null
      o._lights                     = null
      o._allRenderables             = null;
      o._renderables                = null;
      o._cameraPosition             = null;
      o._cameraDirection            = null;
      o._cameraViewMatrix           = null;
      o._cameraProjectionMatrix     = null;
      o._cameraViewProjectionMatrix = null;
      o._lightPosition              = null;
      o._lightDirection             = null;
      o._lightViewMatrix            = null;
      o._lightProjectionMatrix      = null;
      o._lightViewProjectionMatrix  = null;
      o._lightInfo                  = null;
      o._materialMap                = null;
      o.construct                   = MG3dRegion_construct;
      o.isChanged                   = MG3dRegion_isChanged;
      o.spaceName                   = MG3dRegion_spaceName;
      o.technique                   = MG3dRegion_technique;
      o.setTechnique                = MG3dRegion_setTechnique;
      o.techniquePass               = MG3dRegion_techniquePass;
      o.setTechniquePass            = MG3dRegion_setTechniquePass;
      o.camera                      = MG3dRegion_camera;
      o.directionalLight            = MG3dRegion_directionalLight;
      o.lights                      = MG3dRegion_lights;
      o.materialMap                 = MG3dRegion_materialMap;
      o.allRenderables              = MG3dRegion_allRenderables;
      o.renderables                 = MG3dRegion_renderables;
      o.pushRenderable              = MG3dRegion_pushRenderable;
      o.setup                       = MG3dRegion_setup;
      o.change                      = MG3dRegion_change;
      o.prepare                     = MG3dRegion_prepare;
      o.reset                       = MG3dRegion_reset;
      o.calculate                   = MG3dRegion_calculate;
      o.update                      = MG3dRegion_update;
      o.dispose                     = MG3dRegion_dispose;
      return o;
   }
   MO.MG3dRegion_construct = function MG3dRegion_construct(){
      var o = this;
      o._lights = new TObjects();
      o._renderables = new TObjects();
      o._allRenderables = new TObjects();
      o._cameraPosition = new SPoint3();
      o._cameraDirection = new SVector3();
      o._cameraViewMatrix = new SMatrix3d();
      o._cameraProjectionMatrix = new SMatrix3d();
      o._cameraViewProjectionMatrix = new SMatrix3d();
      o._lightPosition = new SPoint3();
      o._lightDirection = new SVector3();
      o._lightViewMatrix = new SMatrix3d();
      o._lightProjectionMatrix = new SMatrix3d();
      o._lightViewProjectionMatrix = new SMatrix3d();
      o._lightInfo = new SVector4();
   }
   MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
      return this._changed;
   }
   MO.MG3dRegion_spaceName = function MG3dRegion_spaceName(){
      return this._spaceName;
   }
   MO.MG3dRegion_technique = function MG3dRegion_technique(){
      return this._technique;
   }
   MO.MG3dRegion_setTechnique = function MG3dRegion_setTechnique(p){
      this._technique = p;
   }
   MO.MG3dRegion_techniquePass = function MG3dRegion_techniquePass(){
      return this._techniquePass;
   }
   MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
      var o = this;
      o._techniquePass = p;
      o._spaceName = p.fullCode();
      o._finish = f;
   }
   MO.MG3dRegion_camera = function MG3dRegion_camera(){
      return this._camera;
   }
   MO.MG3dRegion_directionalLight = function MG3dRegion_directionalLight(){
      return this._directionalLight;
   }
   MO.MG3dRegion_lights = function MG3dRegion_lights(){
      return this._lights;
   }
   MO.MG3dRegion_materialMap = function MG3dRegion_materialMap(){
      return this._materialMap;
   }
   MO.MG3dRegion_allRenderables = function MG3dRegion_allRenderables(p){
      return this._allRenderables;
   }
   MO.MG3dRegion_renderables = function MG3dRegion_renderables(p){
      return this._renderables;
   }
   MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
      var o = this;
      o._renderables.push(p);
      o._allRenderables.push(p);
   }
   MO.MG3dRegion_setup = function MG3dRegion_setup(){
      var o = this;
   }
   MO.MG3dRegion_change = function MG3dRegion_change(){
      this._changed = true;
   }
   MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
      var o = this;
      o._changed = false;
      var c = o._camera;
      var cp = c.projection();
      c.updateFrustum();
      o._cameraPosition.assign(c.position());
      o._cameraDirection.assign(c.direction());
      o._cameraViewMatrix.assign(c.matrix());
      o._cameraProjectionMatrix.assign(cp.matrix());
      o._cameraViewProjectionMatrix.assign(c.matrix());
      o._cameraViewProjectionMatrix.append(cp.matrix());
      var l = o._directionalLight;
      var lc = l.camera();
      var lcp = lc.position();
      var lp = lc.projection();
      o._lightPosition.assign(lc.position());
      o._lightDirection.assign(lc.direction());
      o._lightViewMatrix.assign(lc.matrix());
      o._lightProjectionMatrix.assign(lp.matrix());
      o._lightViewProjectionMatrix.assign(lc.matrix());
      o._lightViewProjectionMatrix.append(lp.matrix());
      o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
      o._allRenderables.clear();
   }
   MO.MG3dRegion_reset = function MG3dRegion_reset(){
      var o = this;
      o._renderables.clear();
   }
   MO.MG3dRegion_calculate = function MG3dRegion_calculate(p){
      var o = this;
      switch(p){
         case EG3dRegionParameter.CameraPosition:
            return o._cameraPosition;
         case EG3dRegionParameter.CameraDirection:
            return o._cameraDirection;
         case EG3dRegionParameter.CameraViewMatrix:
            return o._cameraViewMatrix;
         case EG3dRegionParameter.CameraProjectionMatrix:
            return o._cameraProjectionMatrix;
         case EG3dRegionParameter.CameraViewProjectionMatrix:
            return o._cameraViewProjectionMatrix;
         case EG3dRegionParameter.LightPosition:
            return o._lightPosition;
         case EG3dRegionParameter.LightDirection:
            return o._lightDirection;
         case EG3dRegionParameter.LightViewMatrix:
            return o._lightViewMatrix;
         case EG3dRegionParameter.LightProjectionMatrix:
            return o._lightProjectionMatrix;
         case EG3dRegionParameter.LightViewProjectionMatrix:
            return o._lightViewProjectionMatrix;
         case EG3dRegionParameter.LightInfo:
            return o._lightInfo;
      }
      throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
   }
   MO.MG3dRegion_update = function MG3dRegion_update(){
      var o = this;
      var rs = o._renderables;
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.getAt(i).update(o);
      }
   }
   MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
      var o = this;
      o._renderables = RObject.free(o._renderables);
      o._allRenderables = RObject.free(o._allRenderables);
   }
}
with(MO){
   MO.MG3dRenderable = function MG3dRenderable(o){
      o = RClass.inherits(this, o, MGraphicRenderable);
      o._optionMerge   = false;
      o._currentMatrix = null;
      o._matrix        = null;
      o._material      = null;
      o._activeInfo    = null;
      o._infos         = null;
      o.construct      = MG3dRenderable_construct;
      o.currentMatrix  = MG3dRenderable_currentMatrix;
      o.matrix         = MG3dRenderable_matrix;
      o.material       = MG3dRenderable_material;
      o.setMaterial    = MG3dRenderable_setMaterial;
      o.activeEffect   = MG3dRenderable_activeEffect;
      o.activeInfo     = MG3dRenderable_activeInfo;
      o.effectFind     = MG3dRenderable_effectFind;
      o.effectSet      = MG3dRenderable_effectSet;
      o.infos          = MG3dRenderable_infos;
      o.selectInfo     = MG3dRenderable_selectInfo;
      o.resetInfos     = MG3dRenderable_resetInfos;
      o.testVisible    = RMethod.emptyTrue;
      o.update         = RMethod.empty;
      o.dispose        = MG3dRenderable_dispose;
      return o;
   }
   MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
      var o = this;
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
   }
   MO.MG3dRenderable_currentMatrix = function MG3dRenderable_currentMatrix(){
      return this._currentMatrix;
   }
   MO.MG3dRenderable_matrix = function MG3dRenderable_matrix(){
      return this._matrix;
   }
   MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
      var info = this._activeInfo;
      return info ? info.effect : null;
   }
   MO.MG3dRenderable_activeInfo = function MG3dRenderable_activeInfo(){
      return this._activeInfo;
   }
   MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
      var o = this;
      var infos = o._infos;
      if(infos){
         var info = infos.get(code);
         if(info){
            return info.effect;
         }
      }
      return null;
   }
   MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
      var o = this;
      var infos = o.infos();
      var info = infos.get(code);
      if(!info){
         info = new SG3dRenderableInfo();
         infos.set(code, info)
      }
      info.effect = effect;
   }
   MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
      var o = this;
      var infos = o._infos;
      if(!infos){
         infos = o._infos = new TDictionary();
      }
      return infos;
   }
   MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(p){
      var o = this;
      var infos = o.infos();
      var info = infos.get(p);
      if(!info){
         info = new SG3dRenderableInfo();
         infos.set(p, info)
      }
      o._activeInfo = info;
      return info;
   }
   MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
      var o = this;
      var infos = o._infos;
      if(infos){
         for(var i = infos.count() - 1; i >= 0; i--){
            infos.at(i).reset();
         }
      }
   }
   MO.MG3dRenderable_material = function MG3dRenderable_material(){
      return this._material;
   }
   MO.MG3dRenderable_setMaterial = function MG3dRenderable_setMaterial(material){
      this._material = material;
   }
   MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
      var o = this;
      o._currentMatrix = RObject.dispose(o._currentMatrix);
      o._matrix = RObject.dispose(o._matrix);
      o._material = RObject.dispose(o._material);
      o._activeInfo = null;
      o._infos = RObject.dispose(o._infos);
   }
}
with(MO){
   MO.SG3dEffectInfo = function SG3dEffectInfo(){
      var o = this;
      o.code                  = null;
      o.techniqueCode         = null;
      o.techniqueModeCode     = null;
      o.optionMerge           = null;
      o.mergeCount            = null;
      o.fillModeCd            = null;
      o.optionCullMode        = null;
      o.cullModeCd            = null;
      o.optionDepthTest       = null;
      o.depthModeCd           = null;
      o.optionDepthWrite      = null;
      o.optionBlendMode       = null;
      o.blendSourceMode       = null;
      o.blendTargetMode       = null;
      o.optionAlphaTest       = null;
      o.optionNormalInvert    = null;
      o.optionNormalCompress  = null;
      o.supportInstance       = null;
      o.vertexCount           = 0;
      o.vertexColor           = null;
      o.vertexCoord           = null;
      o.vertexNormal          = null;
      o.vertexNormalFull      = null;
      o.vertexSkeleton        = null;
      o.vertexBoneCount       = 0;
      o.fragmentAlpha         = null;
      o.fragmentBump          = null;
      o.fragmentAmbient       = null;
      o.fragmentDiffuse       = null;
      o.fragmentDiffuseView   = null;
      o.fragmentSpecularColor = null;
      o.fragmentSpecularLevel = null;
      o.fragmentSpecularView  = null;
      o.fragmentEnvironment   = null;
      o.fragmentLight         = null;
      o.fragmentReflect       = null;
      o.fragmentRefract       = null;
      o.fragmentEmissive      = null;
      o.fragmentHeight        = null;
      o.attributes            = new TArray();
      o.samplers              = new TArray();
      o.attributeContains     = SG3dEffectInfo_attributeContains;
      o.samplerContains       = SG3dEffectInfo_samplerContains;
      o.reset                 = SG3dEffectInfo_reset;
      o.reset();
      return o;
   }
   MO.SG3dEffectInfo_attributeContains = function SG3dEffectInfo_attributeContains(p){
      return this.attributes.contains(p);
   }
   MO.SG3dEffectInfo_samplerContains = function SG3dEffectInfo_samplerContains(p){
      return this.samplers.contains(p);
   }
   MO.SG3dEffectInfo_reset = function SG3dEffectInfo_reset(){
      var o = this;
      o.code = null;
      o.optionMerge = false;
      o.mergeCount = 0;
      o.fillModeCd = EG3dFillMode.Fill;
      o.optionCullMode = true;
      o.cullModeCd = EG3dCullMode.Front;
      o.optionDepthTest = true;
      o.depthModeCd = EG3dDepthMode.Less;
      o.optionDepthWrite = true;
      o.optionBlendMode = false;
      o.blendSourceMode = EG3dBlendMode.SourceAlpha;
      o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
      o.optionAlphaTest = false;
      o.optionNormalInvert = false;
      o.optionNormalCompress = true;
      o.supportInstance = false;
      o.vertexCount = 0;
      o.vertexColor = false;
      o.vertexCoord = false;
      o.vertexNormal = false;
      o.vertexNormalFull = false;
      o.vertexSkeleton = false;
      o.vertexBoneCount = 0;
      o.fragmentAlpha = false;
      o.fragmentBump = false;
      o.fragmentAmbient = false;
      o.fragmentDiffuse = false;
      o.fragmentDiffuseView = false;
      o.fragmentSpecularColor = false;
      o.fragmentSpecularLevel = false;
      o.fragmentSpecularView = false;
      o.fragmentEnvironment = false;
      o.fragmentLight = false;
      o.fragmentReflect = false;
      o.fragmentRefract = false;
      o.fragmentEmissive = false;
      o.fragmentHeight = false;
      o.attributes.clear();
      o.samplers.clear();
   }
}
with(MO){
   MO.SG3dMaterialInfo = function SG3dMaterialInfo(o){
      if(!o){o = this;}
      o.effectCode           = 'automatic';
      o.optionDepth          = null;
      o.optionDouble         = null;
      o.optionNormalInvert   = null;
      o.optionShadow         = null;
      o.optionShadowSelf     = null;
      o.optionAlpha          = null;
      o.alphaBase            = 1.0;
      o.alphaRate            = 1.0;
      o.alphaLevel           = 1.0;
      o.alphaMerge           = 1.0;
      o.optionColor          = null;
      o.colorMin             = 0.0;
      o.colorMax             = 1.0;
      o.colorBalance         = 0.5;
      o.colorRate            = 1.0;
      o.optionVertex         = null;
      o.vertexColor          = new SColor4();
      o.optionAmbient        = null;
      o.ambientColor         = new SColor4();
      o.ambientShadow        = 1.0;
      o.optionDiffuse        = null;
      o.diffuseColor         = new SColor4();
      o.diffuseShadow        = 1.0;
      o.optionDiffuseView    = null;
      o.diffuseViewColor     = new SColor4();
      o.diffuseViewShadow    = 1.0;
      o.optionSpecular       = null;
      o.specularColor        = new SColor4();
      o.specularBase         = 1.0;
      o.specularLevel        = 1.0;
      o.specularAverage      = 1.0;
      o.specularShadow       = 1.0;
      o.specularInfo         = null;
      o.optionSpecularView   = null;
      o.specularViewColor    = new SColor4();
      o.specularViewBase     = 1.0;
      o.specularViewRate     = 1.0;
      o.specularViewAverage  = 1.0;
      o.specularViewShadow   = 1.0;
      o.specularViewShadow   = null;
      o.optionReflect        = null;
      o.reflectColor         = new SColor4();
      o.reflectMerge         = 1.0;
      o.reflectShadow        = 1.0;
      o.optionRefract        = null;
      o.refractFrontColor    = new SColor4();
      o.refractBackColor     = new SColor4();
      o.optionOpacity        = null;
      o.opacityColor         = new SColor4();
      o.opacityRate          = 1.0;
      o.opacityAlpha         = 1.0;
      o.opacityDepth         = 1.0;
      o.opacityTransmittance = 1.0;
      o.optionEmissive       = null;
      o.emissiveColor        = new SColor4();
      o.assign               = SG3dMaterialInfo_assign;
      o.calculate            = SG3dMaterialInfo_calculate;
      o.reset                = SG3dMaterialInfo_reset;
      o.reset();
      return o;
   }
   MO.SG3dMaterialInfo_assign = function SG3dMaterialInfo_assign(info){
      var o = this;
      o.effectCode = info.effectCode;
      o.transformName = info.transformName;
      o.optionDepth = info.optionDepth;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      o.optionVertex = info.optionVertex;
      o.vertexColor.assign(info.vertexColor);
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assign(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assign(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assign(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assign(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assign(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      o.optionReflect = info.optionReflect;
      o.reflectColor.assign(info.reflectColor);
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assign(info.refractFrontColor);
      o.refractFrontMerge = info.refractFrontMerge;
      o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assign(info.refractBackColor);
      o.refractBackMerge = info.refractBackMerge;
      o.refractBackShadow = info.refractBackShadow;
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assign(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.optionDepth;
      o.opacityTransmittance = info.optionTransmittance;
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assign(info.emissiveColor);
   }
   MO.SG3dMaterialInfo_calculate = function SG3dMaterialInfo_calculate(info){
      var o = this;
      o.effectCode = info.effectCode;
      o.transformName = info.transformName;
      o.optionDepth = info.optionDepth;
      o.optionDouble = info.optionDouble;
      o.optionNormalInvert = info.optionNormalInvert;
      o.optionShadow = info.optionShadow;
      o.optionShadowSelf = info.optionShadowSelf;
      o.optionAlpha = info.optionAlpha;
      o.alphaBase = info.alphaBase;
      o.alphaRate = info.alphaRate;
      o.alphaLevel = info.alphaLevel;
      o.alphaMerge = info.alphaMerge;
      o.optionColor = info.optionColor;
      o.colorMin = info.colorMin;
      o.colorMax = info.colorMax;
      o.colorBalance = info.colorBalance;
      o.colorRate = info.colorRate;
      o.optionVertex = info.optionVertex;
      o.vertexColor.assignPower(info.vertexColor);
      o.optionAmbient = info.optionAmbient;
      o.ambientColor.assignPower(info.ambientColor);
      o.ambientShadow = info.ambientShadow;
      o.optionDiffuse = info.optionDiffuse;
      o.diffuseColor.assignPower(info.diffuseColor);
      o.diffuseShadow = info.diffuseShadow;
      o.optionDiffuseView = info.optionDiffuseView;
      o.diffuseViewColor.assignPower(info.diffuseViewColor);
      o.diffuseViewShadow = info.diffuseViewShadow;
      o.optionSpecular = info.optionSpecular;
      o.specularColor.assignPower(info.specularColor);
      o.specularBase = info.specularBase;
      o.specularLevel = info.specularLevel;
      o.specularAverage = info.specularAverage;
      o.specularShadow = info.specularShadow;
      o.optionSpecularView = info.optionSpecularView;
      o.specularViewColor.assignPower(info.specularViewColor);
      o.specularViewBase = info.specularViewBase;
      o.specularViewRate = info.specularViewRate;
      o.specularViewAverage = info.specularViewAverage;
      o.specularViewShadow = info.specularViewShadow;
      o.optionReflect = info.optionReflect;
      o.reflectColor.assignPower(info.reflectColor);
      o.reflectMerge = RFloat.toRange(info.reflectMerge, 0, 2);
      o.reflectShadow = info.reflectShadow;
      o.optionRefract = info.optionRefract;
      o.refractFrontColor.assignPower(info.refractFrontColor);
      o.refractFrontMerge = info.refractFrontMerge;
      o.refractFrontShadow = info.refractFrontShadow;
      o.refractBackColor.assignPower(info.refractBackColor);
      o.refractBackMerge = info.refractBackMerge;
      o.refractBackShadow = info.refractBackShadow;
      o.optionOpacity = info.optionOpacity;
      o.opacityColor.assignPower(info.opacityColor);
      o.opacityRate = info.opacityRate;
      o.opacityAlpha = info.optionAlpha;
      o.opacityDepth = info.optionDepth;
      o.opacityTransmittance = info.optionTransmittance;
      o.optionEmissive = info.optionEmissive;
      o.emissiveColor.assignPower(info.emissiveColor);
   }
   MO.SG3dMaterialInfo_reset = function SG3dMaterialInfo_reset(){
      var o = this;
      o.optionDepth = true;
      o.optionDouble = false;
      o.optionNormalInvert = false;
      o.optionShadow = true;
      o.optionShadowSelf = true;
      o.optionAlpha = false;
      o.alphaBase = 0.2;
      o.alphaRate = 1;
      o.alphaLevel = 1;
      o.alphaMerge = 1;
      o.optionColor = true;
      o.colorMin = 0;
      o.colorMax = 1;
      o.colorBalance = 0.5;
      o.colorRate = 1;
      o.optionVertex = true;
      o.vertexColor.set(1, 1, 1, 1);
      o.optionAmbient = true;
      o.ambientColor.set(0.5, 0.5, 0.5, 1);
      o.ambientShadow = 1;
      o.optionDiffuse = true;
      o.diffuseColor.set(0.5, 0.5, 0.5, 1);
      o.diffuseShadow = 1;
      o.optionDiffuseView = true;
      o.diffuseViewColor.set(1, 1, 1, 1);
      o.diffuseViewShadow = 1;
      o.optionSpecular = true;
      o.specularColor.set(0.5, 0.5, 0.5, 1);
      o.specularBase = 0;
      o.specularLevel = 16;
      o.specularAverage = 1;
      o.specularShadow = 1;
      o.optionSpecularView = true;
      o.specularViewColor.set(1, 1, 1, 1);
      o.specularViewBase = 0;
      o.specularViewRate = 16;
      o.specularViewAverage = 1;
      o.specularViewShadow = 1;
      o.optionReflect = true;
      o.reflectColor.set(1, 1, 1, 1);
      o.reflectMerge = 1;
      o.reflectShadow = 1;
      o.optionRefract = true;
      o.refractFrontColor.set(1, 1, 1, 1);
      o.refractFrontMerge = 1;
      o.refractFrontShadow = 1;
      o.refractBackColor.set(1, 1, 1, 1);
      o.refractBackMerge = 1;
      o.refractBackShadow = 1;
      o.optionOpacity = true;
      o.opacityColor.set(1, 1, 1, 1);
      o.opacityRate = 1;
      o.opacityAlpha = 1;
      o.opacityDepth = 1;
      o.opacityTransmittance = 1;
      o.optionEmissive = true;
      o.emissiveColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
      var o = this;
      o.effect   = null;
      o.layout   = null;
      o.material = null;
      o.reset    = SG3dRenderableInfo_reset;
      return o;
   }
   MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
      var o = this;
      o.effect = null;
      o.layout = RObject.dispose(o.layout);
   }
}
with(MO){
   MO.FG3dAnimation = function FG3dAnimation(o){
      o = RClass.inherits(this, o, FObject);
      o._baseTick    = 0;
      o._currentTick = 0;
      o._lastTick    = 0
      o._bones       = null;
      o.construct    = FG3dAnimation_construct;
      o.findBone     = FG3dAnimation_findBone;
      o.process      = FG3dAnimation_process;
      o.dispose      = FG3dAnimation_dispose;
      return o;
   }
   MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._bones = new TObjects();
   }
   MO.FG3dAnimation_findBone = function FG3dAnimation_findBone(p){
      var o = this;
      var bs = o._bones;
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         if(b.boneId() == p){
            return b;
         }
      }
      return null;
   }
   MO.FG3dAnimation_process = function FG3dAnimation_process(){
      var o = this;
      var t = RTimer.current();
      if(o._lastTick == 0){
         o._lastTick = t;
      }
      o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
      var bs = o._bones;
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         b.update(o._currentTick);
      }
      return true;
   }
   MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
      var o = this;
      o._bones.dispose();
      o._bones = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._info       = null;
      o.construct   = FG3dBaseMaterial_construct;
      o.info        = FG3dBaseMaterial_info;
      o.assignInfo  = FG3dBaseMaterial_assignInfo;
      o.assign      = FG3dBaseMaterial_assign;
      o.calculate   = FG3dBaseMaterial_calculate;
      return o;
   }
   MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._info = new SG3dMaterialInfo();
   }
   MO.FG3dBaseMaterial_info = function FG3dBaseMaterial_info(){
      return this._info;
   }
   MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
      this._info.assign(info);
   }
   MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
      var o = this;
      o._info.assign(material.info());
   }
   MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
      var o = this;
      o._info.calculate(material.info());
   }
}
with(MO){
   MO.FG3dBone = function FG3dBone(o){
      o = RClass.inherits(this, o, FObject);
      o._boneId   = 0;
      o._modeId   = null;
      o.update    = FG3dBone_update;
      return o;
   }
   MO.FG3dBone_update = function FG3dBone_update(p){
   }
}
with(MO){
   MO.FG3dCamera = function FG3dCamera(o){
      o = RClass.inherits(this, o, FObject);
      o._matrix          = null;
      o._position        = null;
      o._target          = null;
      o._direction       = null;
      o._directionTarget = null;
      o._centerFront     = 0.6;
      o._centerBack      = 1.0;
      o._focalNear       = 0.1;
      o._focalFar        = 200.0;
      o._frustum         = null;
      o._planes          = null;
      o._viewport        = null;
      o.__axisUp         = null;
      o.__axisX          = null;
      o.__axisY          = null;
      o.__axisZ          = null;
      o.construct        = FG3dCamera_construct;
      o.matrix           = FG3dCamera_matrix;
      o.position         = FG3dCamera_position;
      o.setPosition      = FG3dCamera_setPosition;
      o.direction        = FG3dCamera_direction;
      o.setDirection     = FG3dCamera_setDirection;
      o.frustum          = FG3dCamera_frustum;
      o.planes           = FG3dCamera_planes;
      o.doWalk           = FG3dCamera_doWalk;
      o.doStrafe         = FG3dCamera_doStrafe;
      o.doFly            = FG3dCamera_doFly;
      o.doPitch          = FG3dCamera_doPitch;
      o.doYaw            = FG3dCamera_doYaw;
      o.doRoll           = FG3dCamera_doRoll;
      o.lookAt           = FG3dCamera_lookAt;
      o.update           = FG3dCamera_update;
      o.updateFrustum    = FG3dCamera_updateFrustum;
      return o;
   }
   MO.FG3dCamera_construct = function FG3dCamera_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._position = new SPoint3();
      o._target = new SPoint3();
      o._direction = new SVector3();
      o._directionTarget = new SVector3();
      o._frustum = new SFrustum();
      o._planes = new SFrustumPlanes();
      o._viewport = RClass.create(FG3dViewport);
      o.__axisUp = new SVector3();
      o.__axisUp.set(0, 1, 0);
      o.__axisX = new SVector3();
      o.__axisY = new SVector3();
      o.__axisZ = new SVector3();
   }
   MO.FG3dCamera_position = function FG3dCamera_position(){
      return this._position;
   }
   MO.FG3dCamera_matrix = function FG3dCamera_matrix(){
      return this._matrix;
   }
   MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
      this._position.set(x, y, z);
   }
   MO.FG3dCamera_direction = function FG3dCamera_direction(){
      return this._direction;
   }
   MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
      var o = this;
      o._direction.set(x, y, z);
      o._directionTarget.set(x, y, z);
   }
   MO.FG3dCamera_frustum = function FG3dCamera_frustum(){
      return this._frustum;
   }
   MO.FG3dCamera_planes = function FG3dCamera_planes(){
      return this._planes;
   }
   MO.FG3dCamera_doWalk = function FG3dCamera_doWalk(p){
      var o = this;
      o._position.x += o._direction.x * p;
      o._position.z += o._direction.z * p;
   }
   MO.FG3dCamera_doStrafe = function FG3dCamera_doStrafe(p){
      var o = this;
      o._position.x += o.__axisY.x * p;
      o._position.z += o.__axisY.z * p;
   }
   MO.FG3dCamera_doFly = function FG3dCamera_doFly(p){
      var o = this;
      o._position.y += p;
   }
   MO.FG3dCamera_doPitch = function FG3dCamera_doPitch(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
      throw new TFatal(o, 'Unsupport.')
   }
   MO.FG3dCamera_lookAt = function FG3dCamera_lookAt(x, y, z){
      var o = this;
      var p = o._position;
      var d = o._direction;
      o._target.set(x, y, z);
      d.set(x - p.x, y - p.y, z - p.z);
      d.normalize();
      o._directionTarget.assign(d);
   }
   MO.FG3dCamera_update = function FG3dCamera_update(){
      var o = this;
      var ax = o.__axisX;
      var ay = o.__axisY;
      var az = o.__axisZ;
      az.assign(o._direction);
      az.normalize();
      o.__axisUp.cross2(ax, az);
      ax.normalize();
      az.cross2(ay, ax);
      ay.normalize();
      var d = o._matrix.data();
      d[ 0] = ax.x;
      d[ 1] = ay.x;
      d[ 2] = az.x;
      d[ 3] = 0.0;
      d[ 4] = ax.y;
      d[ 5] = ay.y;
      d[ 6] = az.y;
      d[ 7] = 0.0;
      d[ 8] = ax.z;
      d[ 9] = ay.z;
      d[10] = az.z;
      d[11] = 0.0;
      d[12] = -ax.dotPoint3(o._position);
      d[13] = -ay.dotPoint3(o._position);
      d[14] = -az.dotPoint3(o._position);
      d[15] = 1.0;
   }
   MO.FG3dCamera_updateFrustum = function FG3dCamera_updateFrustum(){
      var o = this;
      var m = RMath.matrix;
      m.assign(o._matrix);
      m.append(o._projection.matrix());
      o._planes.updateVision(m.data());
   }
}
with(MO){
   MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      o._camera     = null;
      o._viewport   = null;
      o._direction  = null;
      o.construct   = FG3dDirectionalLight_construct;
      o.camera      = FG3dDirectionalLight_camera;
      o.projection  = FG3dDirectionalLight_projection;
      o.viewport    = FG3dDirectionalLight_viewport;
      o.direction   = FG3dDirectionalLight_direction;
      return o;
   }
   MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dLight.construct.call(o);
      o._direction = new SVector3();
      o._camera = RClass.create(FG3dPerspectiveCamera);
   }
   MO.FG3dDirectionalLight_camera = function FG3dDirectionalLight_camera(){
      return this._camera;
   }
   MO.FG3dDirectionalLight_projection = function FG3dDirectionalLight_projection(){
      return this._projection;
   }
   MO.FG3dDirectionalLight_viewport = function FG3dDirectionalLight_viewport(){
      return this._viewport;
   }
   MO.FG3dDirectionalLight_direction = function FG3dDirectionalLight_direction(){
      return this._direction;
   }
}
with(MO){
   MO.FG3dEffect = function FG3dEffect(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._ready              = null;
      o._code               = null;
      o._stateFillCd        = EG3dFillMode.Face;
      o._stateCullCd        = EG3dCullMode.Front;
      o._stateDepth         = true;
      o._stateDepthCd       = EG3dDepthMode.LessEqual;
      o._stateDepthWrite    = true;
      o._stateBlend         = true;
      o._stateBlendSourceCd = EG3dBlendMode.SourceAlpha;
      o._stateBlendTargetCd = EG3dBlendMode.OneMinusSourceAlpha;
      o._stateAlphaTest     = false;
      o._optionShadow       = false;
      o._optionLightMap     = false;
      o._optionFog          = false;
      o._program            = null;
      o._vertexTemplate     = null;
      o._fragmentTemplate   = null;
      o.setup               = RMethod.empty;
      o.testReady           = FG3dEffect_testReady;
      o.code                = FG3dEffect_code;
      o.program             = FG3dEffect_program;
      o.setParameter        = FG3dEffect_setParameter;
      o.setSampler          = FG3dEffect_setSampler;
      o.drawRenderable      = FG3dEffect_drawRenderable;
      o.drawRenderables     = FG3dEffect_drawRenderables;
      o.drawGroup           = FG3dEffect_drawGroup;
      o.drawRegion          = FG3dEffect_drawRegion;
      o.buildInfo           = FG3dEffect_buildInfo;
      o.loadConfig          = FG3dEffect_loadConfig;
      o.load                = FG3dEffect_load;
      o.build               = FG3dEffect_build;
      return o;
   }
   MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
      return this._ready;
   }
   MO.FG3dEffect_code = function FG3dEffect_code(){
      return this._code;
   }
   MO.FG3dEffect_program = function FG3dEffect_program(){
      return this._program;
   }
   MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(pn, pv, pc){
      this._program.setParameter(pn, pv, pc);
   }
   MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(pn, pt){
      this._program.setSampler(pn, pt);
   }
   MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(f, r){
   }
   MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      if(p.hasAttribute()){
         var as = p.attributes();
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            var a = as.value(n);
            if(a._statusUsed){
               var vb = r.findVertexBuffer(a._linker);
               if(!vb){
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
               }
               p.setAttribute(a._name, vb, vb._formatCd);
            }
         }
      }
      var ib = r.indexBuffer();
      c.drawTriangles(ib, 0, ib.count());
   }
   MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(pg, pr, pi, pc){
      var o = this;
      o._graphicContext.setProgram(o._program);
      for(var i = 0; i < pc; i++){
         o.drawRenderable(pg, pr.getAt(pi + i));
      }
   }
   MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, pr, pi, pc){
      this.drawRenderables(region, pr, pi, pc);
   }
   MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
      var o = this;
      var renderabels = region.renderables();
      for(var n = 0; n < count; ){
         var groupBegin = n;
         var groupEnd = count;
         var groupRenderable = renderabels.at(offset + groupBegin);
         var groupMaterial = groupRenderable.materialReference();
         for(var i = n; i < count; i++){
            var renderable = renderabels.at(offset + i);
            var material = renderable.materialReference();
            if(groupMaterial != material){
               groupEnd = i;
               break;
            }
            n++;
         }
         o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
      }
   }
   MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(p){
      var o = this;
      var c = o._graphicContext;
      var g = o._program = c.createProgram();
      var xs = p.nodes();
      var c = xs.count();
      for(var i = 0; i < c; i++){
         var x = xs.get(i);
         if(x.isName('State')){
            var n = x.get('name');
            var v = x.get('value');
            if(n == 'fill_mode'){
               o._stateFillCd = REnum.parse(EG3dFillMode, v);
            }else if(n == 'cull_mode'){
               o._stateCullCd = REnum.parse(EG3dCullMode, v);
            }else if(n == 'depth_mode'){
               o._stateDepth = true;
               o._stateDepthCd = REnum.parse(EG3dDepthMode, v);
            }else if(n == 'depth_write'){
               o._stateDepthWrite = RBoolean.parse(v);
            }else if(n == 'blend_mode'){
               o._stateBlend = RBoolean.parse(v);
               if(o._stateBlend){
                  o._stateBlendSourceCd = REnum.parse(EG3dBlendMode, x.get('source'));
                  o._stateBlendTargetCd = REnum.parse(EG3dBlendMode, x.get('target'));
               }
            }else if(n == 'alpha_test'){
               o._stateAlphaTest = RBoolean.parse(v);
            }
         }else if(x.isName('Option')){
            var n = x.get('name');
            var v = x.get('value');
            if(n == 'shadow'){
               o._optionShadow = RBoolean.parse(v);
            }else if(n == 'lightmap'){
               o._optionLightMap = RBoolean.parse(v);
            }else if(n == 'fog'){
               o._optionFog = RBoolean.parse(v);
            }
         }else if(x.isName('Parameter')){
            var pp = RClass.create(FG3dProgramParameter);
            pp.loadConfig(x);
            g.parameters().set(pp.name(), pp);
         }else if(x.isName('Attribute')){
            var pa = RClass.create(FG3dProgramAttribute);
            pa.loadConfig(x);
            g.attributes().set(pa.name(), pa);
         }else if(x.isName('Sampler')){
            var ps = RClass.create(FG3dProgramSampler);
            ps.loadConfig(x);
            g.samplers().set(ps.name(), ps);
         }else if(x.isName('Source')){
            var st = x.get('name');
            if(st == 'vertex'){
               o._vertexSource = x.value();
            }else if(st == 'fragment'){
               o._fragmentSource = x.value();
            }else{
               throw new TError(o, 'Unknown source type. (name={1})', nt);
            }
         }else{
            throw new TError(o, 'Unknown config type. (name={1})', x.name());
         }
      }
      var vt = o._vertexTemplate = RClass.create(FG3dShaderTemplate);
      vt.load(o._vertexSource);
      var ft = o._fragmentTemplate = RClass.create(FG3dShaderTemplate);
      ft.load(o._fragmentSource);
   }
   MO.FG3dEffect_build = function FG3dEffect_build(p){
      var o = this;
      var g = o._program;
      var ms = g._parameters
      var mc = ms.count();
      var c = RInstance.get(FTagContext);
      o.buildInfo(c, p);
      var vs = o._vertexTemplate.parse(c);
      var vsf = RString.formatLines(vs);
      g.upload(EG3dShader.Vertex, vsf);
      var fs = o._fragmentTemplate.parse(c);
      for(var i = 0; i < mc; i++){
         var m = ms.value(i);
         var mn = m.name();
         var md = m.define();
         if(md){
            fs = fs.replace(new RegExp(mn, 'g'), md);
         }
      }
      var fsf = RString.formatLines(fs);
      g.upload(EG3dShader.Fragment, fsf);
      g.build();
      g.link();
   }
   MO.FG3dEffect_load = function FG3dEffect_load(){
      var o = this;
      var x = RConsole.find(FG3dEffectConsole).loadConfig(o._code);
      o.loadConfig(x);
   }
}
with(MO){
   MO.FG3dEffectConsole = function FG3dEffectConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._configs         = null;
      o._loadEffects     = null;
      o._registerEffects = null;
      o._templateEffects = null;
      o._effects         = null;
      o._path            = "/ars/shader/";
      o._effectInfo      = null;
      o._tagContext      = null;
      o._thread          = null;
      o._interval        = 300;
      o.onProcess        = FG3dEffectConsole_onProcess;
      o.construct        = FG3dEffectConsole_construct;
      o.path             = FG3dEffectConsole_path;
      o.register         = FG3dEffectConsole_register;
      o.unregister       = FG3dEffectConsole_unregister;
      o.create           = FG3dEffectConsole_create;
      o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
      o.findTemplate     = FG3dEffectConsole_findTemplate;
      o.find             = FG3dEffectConsole_find;
      o.loadConfig       = FG3dEffectConsole_loadConfig;
      return o;
   }
   MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
      var o = this;
      var s = o._loadEffects;
      s.record();
      while(s.next()){
         var m = s.current();
         if(m.processLoad()){
            s.removeCurrent();
         }
      }
   }
   MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._configs = new TDictionary();
      o._loadEffects = new TLooper();
      o._registerEffects = new TDictionary();
      o._templateEffects = new TDictionary();
      o._effects = new TDictionary();
      o._effectInfo = new SG3dEffectInfo();
      o._tagContext = RClass.create(FTagContext);
   }
   MO.FG3dEffectConsole_path = function FG3dEffectConsole_path(){
      return this._path;
   }
   MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(n, e){
      this._registerEffects.set(n, e);
   }
   MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(n){
      this._registerEffects.set(n, null);
   }
   MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(c, p){
      var o = this;
      var t = o._registerEffects.get(p);
      if(!t){
         throw new TError(this, 'Unknown effect type name. (type={1})', t);
      }
      var e = RClass.create(t);
      e.linkGraphicContext(c);
      e.setup();
      return e;
   }
   MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
      var o = this;
      var capability = context.capability();
      var technique = region.technique();
      effectInfo.techniqueModeCode = technique.activeMode().code();
      effectInfo.optionMerge = renderable._optionMerge;
      if(effectInfo.optionMerge){
         effectInfo.mergeCount = renderable.mergeMaxCount();
      }
      var mi = renderable.material().info();
      effectInfo.optionNormalInvert = mi.optionNormalInvert;
      effectInfo.optionColor = mi.optionColor;
      effectInfo.optionAmbient = mi.optionAmbient;
      effectInfo.optionDiffuse = mi.optionDiffuse;
      effectInfo.optionSpecular = mi.optionSpecular;
      effectInfo.optionReflect = mi.optionReflect;
      effectInfo.optionRefract = mi.optionRefract;
      effectInfo.vertexCount = renderable.vertexCount();
      var vertexBuffers = renderable.vertexBuffers();
      var count = vertexBuffers.count();
      for(var i = 0; i < count; i++){
         var vertexBuffer = vertexBuffers.at(i);
         var vertexCode = vertexBuffer.code();
         if(vertexCode == 'normal'){
            var stride = vertexBuffer.stride();
            if(stride == 4){
               effectInfo.optionNormalCompress = true;
            }else{
               effectInfo.optionNormalCompress = false;
            }
         }
         if(RString.isEmpty(vertexCode)){
            throw new TError(o, 'Vertex buffer code is empty.');
         }
         effectInfo.attributes.push(vertexCode);
      }
      var textures = renderable.textures();
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var textureCode = textures.name(i);
            if(RString.isEmpty(textureCode)){
               throw new TError(o, 'Texture code is empty.');
            }
            effectInfo.samplers.push(textureCode);
         }
      }
      var bones = renderable.bones();
      if(bones){
         var boneCount = bones.count();
         effectInfo.vertexBoneCount = boneCount;
         var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
         if(boneCount > boneLimit){
            boneCount = boneLimit;
         }
         renderable._boneLimit = boneCount;
         effectInfo.vertexBoneLimit = boneCount;
      }
   }
   MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
      var o = this;
      var effects = o._templateEffects;
      var effect = effects.get(code);
      if(effect == null){
         var effect = o.create(context, code);
         effect.load();
         RLogger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
         effects.set(code, effect);
      }
      return effect;
   }
   MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var effectCode = renderable.material().info().effectCode;
      if(RString.isEmpty(effectCode)){
         effectCode = 'automatic'
      }
      if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
         if(renderable.bones() == null){
            effectCode = 'automatic'
         }
      }
      var effectFlag = region.spaceName() + '.' + effectCode;
      var effectTemplate = o.findTemplate(context, effectFlag);
      if(effectTemplate){
         var effectInfo = o._effectInfo;
         effectInfo.reset();
         o.buildEffectInfo(context, effectInfo, region, renderable);
         effectTemplate.buildInfo(o._tagContext, effectInfo);
         var flag = effectFlag + o._tagContext.code;
         var effects = o._effects;
         var effect = effects.get(flag);
         if(!effect){
            effect = o.create(context, effectFlag);
            effect._flag = flag;
            effect.load();
            effect.build(o._effectInfo);
            RLogger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
         }
         effects.set(flag, effect);
      }
      return effect;
   }
   MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
      var o = this;
      var x = o._configs.get(p);
      if(x){
         return x;
      }
      var u = RBrowser.contentPath(o._path + p + ".xml");
      if(RRuntime.isDebug()){
         u += '?' + RDate.format();
      }
      x = RClass.create(FXmlConnection).send(u);
      o._configs.set(p, x);
      return x;
   }
}
with(MO){
   MO.FG3dLight = function FG3dLight(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
}
with(MO){
   MO.FG3dLightMaterial = function FG3dLightMaterial(o){
      o = RClass.inherits(this, o, FG3dBaseMaterial);
      return o;
   }
}
with(MO){
   MO.FG3dMaterial = function FG3dMaterial(o){
      o = RClass.inherits(this, o, FG3dBaseMaterial);
      o._dirty    = true;
      o._textures = null;
      o.textures  = FG3dMaterial_textures;
      o.update    = FG3dMaterial_update;
      return o;
   }
   MO.FG3dMaterial_textures = function FG3dMaterial_textures(){
      return this._textures;
   }
   MO.FG3dMaterial_update = function FG3dMaterial_update(){
      this._dirty = true;
   }
}
with(MO){
   MO.FG3dMaterialMap = function FG3dMaterialMap(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._size      = null;
      o._data      = null;
      o._texture   = null;
      o._stride    = null;
      o._dirty     = false;
      o.construct  = FG3dMaterialMap_construct;
      o.size       = FG3dMaterialMap_size;
      o.data       = FG3dMaterialMap_data;
      o.texture    = FG3dMaterialMap_texture;
      o.setup      = FG3dMaterialMap_setup;
      o.resize     = FG3dMaterialMap_resize;
      o.setUint8   = FG3dMaterialMap_setUint8;
      o.setUint16  = FG3dMaterialMap_setUint16;
      o.setUint32  = FG3dMaterialMap_setUint32;
      o.setFloat16 = FG3dMaterialMap_setFloat16;
      o.setFloat32 = FG3dMaterialMap_setFloat32;
      o.update     = FG3dMaterialMap_update;
      return o;
   }
   MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dMaterialMap_size = function FG3dMaterialMap_size(){
      return this._size;
   }
   MO.FG3dMaterialMap_data = function FG3dMaterialMap_data(){
      return this._data;
   }
   MO.FG3dMaterialMap_texture = function FG3dMaterialMap_texture(){
      return this._texture;
   }
   MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(w, h){
      var o = this;
      var c = o._graphicContext;
      var t = o._texture = c.createFlatTexture();
      o.resize(w, h);
      t.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      t.uploadData(o._data, w, h);
   }
   MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(w, h){
      var o = this;
      var s = o._size;
      if(h > 2048){
         h = 4096;
      }else if(h > 1024){
         h = 2048;
      }else if(h > 512){
         h = 1024;
      }else if(h > 256){
         h = 512;
      }else if(h > 128){
         h = 256;
      }else if(h > 64){
         h = 128;
      }else if(h > 32){
         h = 64;
      }else if(h > 16){
         h = 32;
      }
      if(h < s.height){
         h = s.height;
      }
      if((s.width == w) && (s.height == h)){
         return;
      }
      s.set(w, h);
      o._stride = 4 * w;
      var t = 4 * w * h;
      o._data = new Uint8Array(t);
   }
   MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      if(v1.constructor == SColor4){
         var v = v1.red * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.green * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.blue * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
         var v = v1.alpha * 255;
         if(d[p] != v){
            o._dirty = true;
         }
         d[p++] = v;
      }else{
         d[p++] = v1;
         d[p++] = v2;
         d[p++] = v3;
         d[p++] = v4;
      }
   }
   MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = (v1 >> 8) & 0xFF;
      d[p++] = v1 & 0xFF;
      d[p++] = (v2 >> 8) & 0xFF;
      d[p++] = v2 & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = (v >> 24) & 0xFF;
      d[p++] = (v >> 16) & 0xFF;
      d[p++] = (v >> 8) & 0xFF;
      d[p++] = v & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      var v = parseInt(v1 * 256);
      d[p++] = parseInt(v1) & 0xFF;
      d[p++] = parseInt(v1 * 256) & 0xFF;
      d[p++] = parseInt(v2) & 0xFF;
      d[p++] = parseInt(v2 * 256) & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
      var o = this;
      var d = o._data;
      var p = (o._stride * n) + (i << 2);
      d[p++] = parseInt(v * 0.00390625) & 0xFF;
      d[p++] = parseInt(v) & 0xFF;
      d[p++] = parseInt(v * 256) & 0xFF;
      d[p++] = parseInt(v * 65536) & 0xFF;
      o._dirty = true;
   }
   MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
      var o = this;
      if(o._dirty){
         var s = o._size;
         o._texture.uploadData(o._data, s.width, s.height);
         o._dirty = false;
      }
   }
}
with(MO){
   MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
      o = RClass.inherits(this, o, FG3dMaterial);
      o._texture  = null;
      o.construct = FG3dMaterialTexture_construct;
      return o;
   }
   MO.FG3dMaterialTexture_construct = function FG3dMaterialTexture_construct(){
      var o = this;
   }
}
with(MO){
   MO.FG3dObject = function FG3dObject(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o.setup   = FG3dObject_setup;
      o.dispose = FG3dObject_dispose;
      return o;
   }
   MO.FG3dObject_setup = function FG3dObject_setup(){
   }
   MO.FG3dObject_dispose = function FG3dObject_dispose(){
      var o = this;
      o.__base.MGraphicObject.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dOrthoCamera = function FG3dOrthoCamera(o){
      o = RClass.inherits(this, o, FG3dCamera);
      o._projection      = null;
      o.construct        = FG3dOrthoCamera_construct;
      o.projection       = FG3dOrthoCamera_projection;
      o.updateFrustum    = FG3dOrthoCamera_updateFrustum;
      o.updateFromCamera = FG3dOrthoCamera_updateFromCamera;
      o.updateFlatCamera = FG3dOrthoCamera_updateFlatCamera;
      return o;
   }
   MO.FG3dOrthoCamera_construct = function FG3dOrthoCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dOrthoProjection);
   }
   MO.FG3dOrthoCamera_projection = function FG3dOrthoCamera_projection(){
      return this._projection;
   }
   MO.FG3dOrthoCamera_updateFrustum = function FG3dOrthoCamera_updateFrustum(){
      var o = this;
      o.__base.FG3dCamera.updateFrustum.call(o);
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dOrthoCamera_updateFromCamera = function FG3dOrthoCamera_updateFromCamera(p){
      var o = this;
      var pf = p.updateFrustum();
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * pf.radius;
      var vy = pf.center.y - d.y * pf.radius;
      var vz = pf.center.z - d.z * pf.radius;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      var f = o._frustum;
      o._matrix.transform(f.coners, pf.coners, 8);
      f.updateCenter();
      o._projection.updateFrustum(f);
   }
   MO.FG3dOrthoCamera_updateFlatCamera = function FG3dOrthoCamera_updateFlatCamera(p){
      var o = this;
      var f = o._frustum
      var pf = p.updateFlatFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance;
      var vy = pf.center.y - d.y * distance;
      var vz = pf.center.z - d.z * distance;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._projection._znear = 0.3;
      o._projection._zfar = distance * 1.5;
      o._projection.update();
   }
}
with(MO){
   MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = null;
      o.construct     = FG3dOrthoProjection_construct;
      o.matrix        = FG3dOrthoProjection_matrix;
      o.update        = FG3dOrthoProjection_update;
      o.updateFrustum = FG3dOrthoProjection_updateFrustum;
      return o;
   }
   MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SOrthoMatrix3d();
   }
   MO.FG3dOrthoProjection_matrix = function FG3dOrthoProjection_matrix(){
      return this._matrix;
   }
   MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
      var o = this;
      var s = o._size;
      o._matrix.identity();
      var d = o._matrix.data();
      d[ 0] = 2.0 / s.width * 8.0;
      d[ 4] = d[ 8] = d[12] = 0.0;
      d[ 5] = 2.0 / s.height * 8.0;
      d[ 1] = d[ 9] = d[13] = 0.0;
      d[10] = 1.0 / (o._znear - o._zfar);
      d[ 2] = d[ 6] = d[14] = 0.0;
      d[ 3] = d[ 7] = 0.0;
      d[11] = o._znear / (o._znear - o._zfar);
      d[15] = 1.0;
   }
   MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(p){
      var o = this;
      o._znear = p.minZ;
      o._zfar = p.maxZ;
      o.update();
   }
}
with(MO){
   MO.FG3dPerspectiveCamera = function FG3dPerspectiveCamera(o){
      o = RClass.inherits(this, o, FG3dCamera);
      o._projection       = null;
      o._centerFront      = 0.4;
      o.construct         = FG3dPerspectiveCamera_construct;
      o.projection        = FG3dPerspectiveCamera_projection;
      o.updateFrustum     = FG3dPerspectiveCamera_updateFrustum;
      o.updateFlatFrustum = FG3dPerspectiveCamera_updateFlatFrustum;
      o.updateFromCamera  = FG3dPerspectiveCamera_updateFromCamera;
      o.updateFlatCamera  = FG3dPerspectiveCamera_updateFlatCamera;
      return o;
   }
   MO.FG3dPerspectiveCamera_construct = function FG3dPerspectiveCamera_construct(){
      var o = this;
      o.__base.FG3dCamera.construct.call(o);
      o._projection = RClass.create(FG3dPerspectiveProjection);
   }
   MO.FG3dPerspectiveCamera_projection = function FG3dPerspectiveCamera_projection(){
      return this._projection;
   }
   MO.FG3dPerspectiveCamera_updateFrustum = function FG3dPerspectiveCamera_updateFrustum(){
      var o = this;
      o.__base.FG3dCamera.updateFrustum.call(o);
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.update(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dPerspectiveCamera_updateFlatFrustum = function FG3dPerspectiveCamera_updateFlatFrustum(){
      var o = this;
      var p = o._projection;
      var s = p._size;
      var f = o._frustum;
      f.updateFlat(p._angle, s.width, s.height, p._znear, p._zfar, o._centerFront, o._centerBack, o._matrix);
      return f;
   }
   MO.FG3dPerspectiveCamera_updateFromCamera = function FG3dPerspectiveCamera_updateFromCamera(p){
      var o = this;
      var f = o._frustum;
      var pf = p.updateFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance;
      var vy = pf.center.y - d.y * distance;
      var vz = pf.center.z - d.z * distance;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._matrix.transform(f.coners, 0, pf.coners, 0, 8);
      f.updateCenter();
      o._projection.updateFrustum(f);
   }
   MO.FG3dPerspectiveCamera_updateFlatCamera = function FG3dPerspectiveCamera_updateFlatCamera(p){
      var o = this;
      var f = o._frustum;
      var pf = p.updateFlatFrustum();
      var angle = RConst.DEGREE_RATE * o._projection.angle();
      var distance = pf.radius / Math.sin(angle * 0.5);
      distance = Math.max(distance, p._projection._zfar);
      var d = o._direction;
      d.normalize();
      var vx = pf.center.x - d.x * distance * o._centerFront;
      var vy = pf.center.y - d.y * distance * o._centerFront;
      var vz = pf.center.z - d.z * distance * o._centerFront;
      o._position.set(vx, vy, vz);
      o.lookAt(pf.center.x, pf.center.y, pf.center.z);
      o.update();
      o._projection._znear = 0.1;
      o._projection._zfar = distance;
      o._projection.update();
   }
}
with(MO){
   MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
      o = RClass.inherits(this, o, FG3dProjection);
      o._matrix       = null;
      o.construct     = FG3dPerspectiveProjection_construct;
      o.matrix        = FG3dPerspectiveProjection_matrix;
      o.update        = FG3dPerspectiveProjection_update;
      o.updateFrustum = FG3dPerspectiveProjection_updateFrustum;
      return o;
   }
   MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
      var o = this;
      o.__base.FG3dProjection.construct.call(o);
      o._matrix = new SPerspectiveMatrix3d();
   }
   MO.FG3dPerspectiveProjection_matrix = function FG3dPerspectiveProjection_matrix(){
      return this._matrix;
   }
   MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
      var o = this;
      var s = o._size;
      o._fieldOfView = RConst.DEGREE_RATE * o._angle;
      o._matrix.perspectiveFieldOfViewLH(o._fieldOfView, s.width / s.height, o._znear, o._zfar);
   }
   MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
      var o = this;
      o._znear = p.minZ;
      o._zfar = p.maxZ;
      o.update();
   }
}
with(MO){
   MO.FG3dPointLight = function FG3dPointLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      return o;
   }
}
with(MO){
   MO.FG3dProjection = function FG3dProjection(o){
      o = RClass.inherits(this, o, FObject);
      o._size        = null;
      o._angle       = 60.0;
      o._fieldOfView = 0;
      o._znear       = 0.1;
      o._zfar        = 200.0;
      o._scale       = 0;
      o.construct   = FG3dProjection_construct;
      o.size        = FG3dProjection_size;
      o.angle       = FG3dProjection_angle;
      o.znear       = FG3dProjection_znear;
      o.zfar        = FG3dProjection_zfar;
      o.distance    = FG3dProjection_distance;
      return o;
   }
   MO.FG3dProjection_construct = function FG3dProjection_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FG3dProjection_size = function FG3dProjection_size(){
      return this._size;
   }
   MO.FG3dProjection_angle = function FG3dProjection_angle(){
      return this._angle;
   }
   MO.FG3dProjection_znear = function FG3dProjection_znear(){
      return this._znear;
   }
   MO.FG3dProjection_zfar = function FG3dProjection_zfar(){
      return this._zfar;
   }
   MO.FG3dProjection_distance = function FG3dProjection_distance(){
      return this._zfar - this._znear;
   }
}
with(MO){
   MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
      o = RClass.inherits(this, o, FTagDocument);
      o._space  = 'shader';
      return o;
   }
}
with(MO){
   MO.FG3dSpotLight = function FG3dSpotLight(o){
      o = RClass.inherits(this, o, FG3dLight);
      return o;
   }
}
with(MO){
   MO.FG3dTechnique = function FG3dTechnique(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._code           = null;
      o._activeMode     = null;
      o._modes          = null;
      o._passes         = null;
      o.construct       = FG3dTechnique_construct;
      o.code            = FG3dTechnique_code;
      o.activeMode      = FG3dTechnique_activeMode;
      o.modes           = FG3dTechnique_modes;
      o.passes          = FG3dTechnique_passes;
      o.registerMode    = FG3dTechnique_registerMode;
      o.selectMode      = FG3dTechnique_selectMode;
      o.updateRegion    = RMethod.empty;
      o.clear           = FG3dTechnique_clear;
      o.sortRenderables = FG3dTechnique_sortRenderables;
      o.drawRegion      = FG3dTechnique_drawRegion;
      o.present         = FG3dTechnique_present;
      return o;
   }
   MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
      o._modes = new TObjects();
      o._passes = new TObjects();
   }
   MO.FG3dTechnique_code = function FG3dTechnique_code(){
      return this._code;
   }
   MO.FG3dTechnique_activeMode = function FG3dTechnique_activeMode(){
      return this._activeMode;
   }
   MO.FG3dTechnique_modes = function FG3dTechnique_modes(){
      return this._modes;
   }
   MO.FG3dTechnique_passes = function FG3dTechnique_passes(){
      return this._passes;
   }
   MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
      var o = this;
      var m = RClass.create(FG3dTechniqueMode);
      m.setCode(p);
      o._modes.push(m);
      o._activeMode = m;
      return m;
   }
   MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
      var o = this;
   }
   MO.FG3dTechnique_clear = function FG3dTechnique_clear(p){
      var o = this;
      var c = o._graphicContext;
      c.setRenderTarget(null);
      c.clear(p.red, p.green, p.blue, p.alpha, 1);
   }
   MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
   }
   MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(p){
      var o = this;
      p.setTechnique(o);
      var s = o._passes;
      var c = s.count();
      for(var n = 0; n < c; n++){
         var v = s.get(n);
         p.setTechniquePass(v, (n == c - 1));
         v.drawRegion(p);
      }
   }
   MO.FG3dTechnique_present = function FG3dTechnique_present(p){
      this._graphicContext.present();
   }
}
with(MO){
   MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._techniques = null;
      o.construct   = FG3dTechniqueConsole_construct;
      o.techniques  = FG3dTechniqueConsole_techniques;
      o.find        = FG3dTechniqueConsole_find;
      return o;
   }
   MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._techniques = new TDictionary();
   }
   MO.FG3dTechniqueConsole_techniques = function FG3dTechniqueConsole_techniques(){
      return this._techniques;
   }
   MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
      var o = this;
      if(!RClass.isClass(context, FGraphicContext)){
         context = context.graphicContext();
      }
      if(!RClass.isClass(context, FGraphicContext)){
         throw new TError(o, 'Unknown context.');
      }
      var code = context.hashCode() + '|' + RClass.name(clazz);
      var techniques = o._techniques;
      var technique = techniques.get(code);
      if(!technique){
         technique = RClass.create(clazz);
         technique.linkGraphicContext(context);
         technique.setup();
         var techniqueCode = technique.code();
         var passes = technique.passes();
         var passCount = passes.count();
         for(var i = 0; i < passCount; i++){
            var pass = passes.at(i);
            var passCode = pass.code();
            pass.setFullCode(techniqueCode + '.' + passCode);
         }
         techniques.set(code, technique);
      }
      return technique;
   }
}
with(MO){
   MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
      o = RClass.inherits(this, o, FObject);
      o._code   = null;
      o.code    = FG3dTechniqueMode_code;
      o.setCode = FG3dTechniqueMode_setCode;
      return o;
   }
   MO.FG3dTechniqueMode_code = function FG3dTechniqueMode_code(){
      return this._code;
   }
   MO.FG3dTechniqueMode_setCode = function FG3dTechniqueMode_setCode(p){
      this._code = p;
   }
}
with(MO){
   MO.FG3dTechniquePass = function FG3dTechniquePass(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._fullCode       = null;
      o._code           = null;
      o._index          = null;
      o._finish         = false;
      o._materialMap    = null;
      o.setup           = FG3dTechniquePass_setup;
      o.fullCode        = FG3dTechniquePass_fullCode;
      o.setFullCode     = FG3dTechniquePass_setFullCode;
      o.code            = FG3dTechniquePass_code;
      o.activeEffects   = FG3dTechniquePass_activeEffects;
      o.sortRenderables = FG3dTechniquePass_sortRenderables;
      o.drawRegion      = FG3dTechniquePass_drawRegion;
      return o;
   }
   MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
      var o = this;
      var m = o._materialMap = RClass.create(FG3dMaterialMap);
      m.linkGraphicContext(o);
      m.setup(EG3dMaterialMap.Count, 32);
   }
   MO.FG3dTechniquePass_fullCode = function FG3dTechniquePass_fullCode(){
      return this._fullCode;
   }
   MO.FG3dTechniquePass_setFullCode = function FG3dTechniquePass_setFullCode(p){
      this._fullCode = p;
   }
   MO.FG3dTechniquePass_code = function FG3dTechniquePass_code(){
      return this._code;
   }
   MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(s, t){
      var ms = s.material().info();
      var mt = t.material().info();
      if(ms.optionAlpha && mt.optionAlpha){
         var se = s.activeEffect();
         var te = t.activeEffect();
         if(se == te){
            sm = s._materialReference;
            tm = t._materialReference;
            if(sm && tm){
               return sm.hashCode() - tm.hashCode();
            }
         }
         return se.hashCode() - te.hashCode();
      }else if(ms.optionAlpha && !mt.optionAlpha){
         return 1;
      }else if(!ms.optionAlpha && mt.optionAlpha){
         return -1;
      }else{
         var se = s.activeEffect();
         var te = t.activeEffect();
         if(se == te){
            sm = s._materialReference;
            tm = t._materialReference;
            if(sm && tm){
               return sm.hashCode() - tm.hashCode();
            }
         }
         return se.hashCode() - te.hashCode();
      }
   }
   MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(p, rs){
      var o = this;
      var sn = p.spaceName();
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.get(i);
         var f = r.selectInfo(sn);
         if(!f.effect){
            f.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, p, r);
         }
      }
   }
   MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(p){
      var o = this;
      var rs = p.renderables();
      var c = rs.count();
      if(c == 0){
         return;
      }
      p._statistics._frameDrawSort.begin();
      o.activeEffects(p, rs);
      rs.sort(o.sortRenderables);
      p._statistics._frameDrawSort.end();
      var cb = o._graphicContext.capability();
      if(cb.optionMaterialMap){
         var mm = o._materialMap;
         mm.resize(EG3dMaterialMap.Count, c);
         for(var i = 0; i < c; i++){
            var r = rs.get(i);
            r._materialId = i;
            var m = r.material();
            var mi = m.info();
            mm.setUint8(i, EG3dMaterialMap.AmbientColor, mi.ambientColor);
            mm.setUint8(i, EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
            mm.setUint8(i, EG3dMaterialMap.SpecularColor, mi.specularColor);
            mm.setUint8(i, EG3dMaterialMap.ReflectColor, mi.reflectColor);
            mm.setUint8(i, EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
         }
         mm.update();
         p._materialMap = mm;
      }
      for(var n = 0; n < c; ){
         var gb = n;
         var ge = c;
         var ga = rs.getAt(gb).activeEffect();
         for(var i = n; i < c; i++){
            var a = rs.getAt(i).activeEffect();
            if(ga != a){
               ge = i;
               break;
            }
            n++;
         }
         ga.drawRegion(p, gb, ge - gb);
      }
   }
}
with(MO){
   MO.FG3dTrack = function FG3dTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._frames = null;
      o.construct = FG3dTrack_construct;
      o.calculate = FG3dTrack_calculate;
      return o;
   }
   MO.FG3dTrack_construct = function FG3dTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FG3dTrack_update = function FG3dTrack_update(p){
      var o = this;
      var info = new SG3dFrameInfo();
      o._trackResource.calculateFrameInfo(info, tick);
      info.update();
      o._matrix.assign(o._trackResource.matrixInvert());
      o._matrix.append(info.matrix);
      return true;
   }
   MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
      var o = this;
      var frameCount = o._frames.count();
      if(frameCount == 0){
         return false;
      }
      if(tick < 0){
         tick = -tick;
      }
      var pCurrentFrame = o._frames.Get(index);
      var pNextFrame = null;
      if(index < frameCount -1){
         pNextFrame = o._frames.Get(index + 1);
      }else{
         pNextFrame = o._frames.Get(0);
      }
      info.tick = tick;
      info.currentFrame = pCurrentFrame;
      info.nextFrame = pNextFrame;
      return true;
   }
}
with(MO){
   MO.FG3dViewport = function FG3dViewport(o){
      o = RClass.inherits(this, o, FObject);
      o.left   = 0;
      o.top    = 0;
      o.width  = 0;
      o.height = 0;
      o.set    = FG3dViewport_set;
      return o;
   }
   MO.FG3dViewport_set = function FG3dViewport_set(l, t, w, h){
      var o = this;
      o.left = l;
      o.top = t;
      o.width = w;
      o.height= h;
   }
}
with(MO){
   MO.REngine3d = function REngine3d(){
      var o = this;
      o._setuped      = false;
      o._contexts     = null;
      o.onUnload      = REngine3d_onUnload;
      o.setup         = REngine3d_setup;
      o.contexts      = REngine3d_contexts;
      o.createContext = REngine3d_createContext;
      o.dispose       = REngine3d_dispose;
      return o;
   }
   MO.REngine3d_onUnload = function REngine3d_onUnload(event){
      this.dispose();
   }
   MO.REngine3d_setup = function REngine3d_setup(){
      var o = this;
      if(!o._setuped){
         o._contexts = new TObjects();
         RWindow.lsnsUnload.register(o, o.onUnload);
         o._setuped = true;
      }
   }
   MO.REngine3d_contexts = function REngine3d_contexts(){
      return this._contexts;
   }
   MO.REngine3d_createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
      var o = this;
      o.setup();
      var context = RClass.create(clazz);
      if(attributes){
         context._optionAlpha = attributes.alpha;
         context._optionAntialias = attributes.antialias;
      }
      context.linkCanvas(hCanvas);
      o._contexts.push(context);
      return context;
   }
   MO.REngine3d_dispose = function REngine3d_dispose(){
      var o = this;
      var contexts = o._contexts;
      if(contexts){
         var count = contexts.count();
         for(var i = 0; i < count; i++){
            var context = contexts.at(i);
            context.dispose();
         }
         o._contexts = RObject.dispose(contexts);
      }
   }
   MO.REngine3d = new REngine3d();
}
MO.EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
MO.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.Zero             = 0;
   o.One              = 1;
   o.SrcColor         = 2;
   o.OneMinusSrcColor = 3;
   o.DstColor         = 4;
   o.OneMinusDstColor = 5;
   o.SrcAlpha         = 6;
   o.OneMinusSrcAlpha = 7;
   o.DstAlpha         = 8;
   o.OneMinusDstAlpha = 9;
   o.SrcAlphaSaturate = 10;
   return o;
}
MO.EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
MO.EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
MO.EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
MO.EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
MO.EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
with(MO){
   MO.SG3dContextCapability = function SG3dContextCapability(){
      var o = this;
      o.vendor                 = null;
      o.version                = null;
      o.shaderVersion          = null;
      o.optionDebug            = false;
      o.optionInstance         = false;
      o.optionLayout           = false;
      o.optionMaterialMap      = false;
      o.optionIndex32          = false;
      o.optionShaderSource     = false;
      o.mergeCount             = 0;
      o.attributeCount         = null;
      o.vertexCount            = 65536;
      o.vertexConst            = null;
      o.fragmentConst          = null;
      o.varyingCount           = null;
      o.samplerCount           = null;
      o.samplerSize            = null;
      o.samplerCompressRgb     = null;
      o.samplerCompressRgba    = null;
      o.calculateBoneCount     = SG3dContextCapability_calculateBoneCount;
      o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
      return o;
   }
   MO.SG3dContextCapability_calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
      var o = this;
      var rb = 0;
      var bi = boneCount % 4;
      if(bi != 0){
         rb = boneCount + 4 - bi;
      }else{
         rb = boneCount;
      }
      var r = 0;
      var ib = (o.vertexConst - 16) / 4;
      if(rb > ib){
         r = ib;
      }else{
         r = rb;
      }
      return r;
   }
   MO.SG3dContextCapability_calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
      var o = this;
      var cr = (4 * boneCount) + 4;
      var ib = (o.vertexConst - 16) / cr;
      var r = cl;
      if(vertexCount > 0){
         var iv = o.vertexCount / vertexCount;
         r = Math.min(ib, iv);
      }
      if(r > 64){
         r = 64;
      }
      return r;
   }
}
with(MO){
   MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
      var o = this;
      o.slot     = null;
      o.buffer   = null;
      o.index    = null;
      o.formatCd = null;
      o.dispose  = SG3dLayoutBuffer_dispose;
      return o;
   }
   MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
      var o = this;
      o.slot = null;
      o.buffer = null;
      o.index = null;
      o.formatCd = null;
   }
}
with(MO){
   MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
      var o = this;
      o.slot    = null;
      o.index   = -1;
      o.texture = null;
      o.dispose = SG3dLayoutSampler_dispose;
      return o;
   }
   MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
      var o = this;
      o.slot = null;
      o.index = -1;
      o.texture = null;
   }
}
with(MO){
   MO.FG3dBuffer = function FG3dBuffer(o){
      o = RClass.inherits(this, o, FG3dObject, MAttributeCode);
      o.isValid = RMethod.virtual(o, 'isValid');
      return o;
   }
}
with(MO){
   MO.FG3dContext = function FG3dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._optionAlpha        = true;
      o._optionAntialias    = false;
      o._size               = null;
      o._capability         = null;
      o._statistics         = null;
      o._fillModeCd         = EG3dFillMode.Face;
      o._optionDepth        = false;
      o._optionCull         = false;
      o._depthModeCd        = 0;
      o._cullModeCd         = 0;
      o._statusBlend        = false;
      o._blendSourceCd      = 0;
      o._blendTargetCd      = 0;
      o._program            = null;
      o._storePrograms      = null;
      o._storeLayouts       = null;
      o._storeBuffers       = null;
      o._storeTextures      = null;
      o._storeTargets       = null;
      o.construct           = FG3dContext_construct;
      o.linkCanvas          = FG3dContext_linkCanvas;
      o.size                = FG3dContext_size;
      o.capability          = FG3dContext_capability;
      o.statistics          = FG3dContext_statistics;
      o.createProgram       = RMethod.virtual(o, 'createProgram');
      o.createLayout        = RMethod.virtual(o, 'createLayout');
      o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
      o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
      o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
      o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
      o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
      o.setViewport         = RMethod.virtual(o, 'setViewport');
      o.setFillMode         = RMethod.virtual(o, 'setFillMode');
      o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
      o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
      o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
      o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
      o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
      o.setProgram          = RMethod.virtual(o, 'setProgram');
      o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
      o.bindTexture         = RMethod.virtual(o, 'bindTexture');
      o.prepare             = FG3dContext_prepare;
      o.clear               = RMethod.virtual(o, 'clear');
      o.clearColor          = RMethod.virtual(o, 'clearColor');
      o.clearDepth          = RMethod.virtual(o, 'clearDepth');
      o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
      o.present             = RMethod.virtual(o, 'present');
      o.dispose             = FG3dContext_dispose;
      return o;
   }
   MO.FG3dContext_construct = function FG3dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2();
      o._statistics = RClass.create(FG3dStatistics);
      RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
      o._storePrograms = new TObjects();
      o._storeLayouts = new TObjects();
      o._storeBuffers = new TObjects();
      o._storeTextures = new TObjects();
      o._storeTargets = new TObjects();
   }
   MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG3dContext_size = function FG3dContext_size(){
      return this._size;
   }
   MO.FG3dContext_capability = function FG3dContext_capability(){
      return this._capability;
   }
   MO.FG3dContext_statistics = function FG3dContext_statistics(){
      return this._statistics;
   }
   MO.FG3dContext_prepare = function FG3dContext_prepare(){
      this._statistics.resetFrame();
   }
   MO.FG3dContext_dispose = function FG3dContext_dispose(){
      var o = this;
      var programs = o._storePrograms;
      if(programs){
         var count = programs.count();
         for(var i = 0; i < count; i++){
            var program = programs.at(i);
            program.dispose();
         }
         o._storePrograms = RObject.dispose(programs);
      }
      var layouts = o._storeLayouts;
      if(layouts){
         var count = layouts.count();
         for(var i = 0; i < count; i++){
            var layout = layouts.at(i);
            layout.dispose();
         }
         o._storeLayouts = RObject.dispose(layouts);
      }
      var buffers = o._storeBuffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         o._storeBuffers = RObject.dispose(buffers);
      }
      var textures = o._storeTextures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            texture.dispose();
         }
         o._storeTextures = RObject.dispose(textures);
      }
      var targets = o._storeTargets;
      if(targets){
         var count = targets.count();
         for(var i = 0; i < count; i++){
            var target = targets.at(i);
            target.dispose();
         }
         o._storeTargets = RObject.dispose(targets);
      }
      o._program = null;
      o.__base.FGraphicContext.dispose.call(o);
   }
}
with(MO){
   MO.FG3dCubeTexture = function FG3dCubeTexture(o){
      o = RClass.inherits(this, o, FG3dTexture);
      o.size = 0;
      o.construct = FG3dTexture_construct;
      o.upload    = RMethod.virtual(o, 'upload');
      o.update    = RMethod.empty;
      return o;
   }
   MO.FG3dTexture_construct = function FG3dTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      o._textureCd = EG3dTexture.Cube;
   }
}
with(MO){
   MO.FG3dFlatTexture = function FG3dFlatTexture(o){
      o = RClass.inherits(this, o, FG3dTexture);
      o._optionFlipY   = false;
      o._size          = null;
      o.construct      = FG3dFlatTexture_construct;
      o.optionFlipY    = FG3dFlatTexture_optionFlipY;
      o.setOptionFlipY = FG3dFlatTexture_setOptionFlipY;
      o.size           = FG3dFlatTexture_size;
      o.uploadData     = RMethod.virtual(o, 'uploadData');
      o.upload         = RMethod.virtual(o, 'upload');
      o.update         = RMethod.empty;
      return o;
   }
   MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      o._textureCd = EG3dTexture.Flat2d;
   }
   MO.FG3dFlatTexture_optionFlipY = function FG3dFlatTexture_optionFlipY(){
      return this._optionFlipY;
   }
   MO.FG3dFlatTexture_setOptionFlipY = function FG3dFlatTexture_setOptionFlipY(flag){
      this._optionFlipY = flag;
   }
   MO.FG3dFlatTexture_size = function FG3dFlatTexture_size(){
      return this._size;
   }
}
with(MO){
   MO.FG3dFragmentShader = function FG3dFragmentShader(o){
      o = RClass.inherits(this, o, FG3dShader);
      return o;
   }
}
with(MO){
   MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      o._strideCd     = EG3dIndexStride.Uint16;
      o._count        = 0;
      o._fillModeCd   = EG3dFillMode.Face;
      o._lineWidth    = 1;
      o.strideCd      = FG3dIndexBuffer_strideCd;
      o.setStrideCd   = FG3dIndexBuffer_setStrideCd;
      o.fillModeCd    = FG3dIndexBuffer_fillModeCd;
      o.setFillModeCd = FG3dIndexBuffer_setFillModeCd;
      o.lineWidth     = FG3dIndexBuffer_lineWidth;
      o.setLineWidth  = FG3dIndexBuffer_setLineWidth;
      o.count         = FG3dIndexBuffer_count;
      o.upload        = RMethod.virtual(o, 'upload');
      return o;
   }
   MO.FG3dIndexBuffer_strideCd = function FG3dIndexBuffer_strideCd(){
      return this._strideCd;
   }
   MO.FG3dIndexBuffer_setStrideCd = function FG3dIndexBuffer_setStrideCd(strideCd){
      this._strideCd = strideCd;
   }
   MO.FG3dIndexBuffer_fillModeCd = function FG3dIndexBuffer_fillModeCd(){
      return this._fillModeCd;
   }
   MO.FG3dIndexBuffer_setFillModeCd = function FG3dIndexBuffer_setFillModeCd(fillModeCd){
      this._fillModeCd = fillModeCd;
   }
   MO.FG3dIndexBuffer_lineWidth = function FG3dIndexBuffer_lineWidth(){
      return this._lineWidth;
   }
   MO.FG3dIndexBuffer_setLineWidth = function FG3dIndexBuffer_setLineWidth(lineWidth){
      this._lineWidth = lineWidth;
   }
   MO.FG3dIndexBuffer_count = function FG3dIndexBuffer_count(){
      return this._count;
   }
}
with(MO){
   MO.FG3dLayout = function FG3dLayout(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._buffers       = null;
      o._samplers      = null;
      o.buffers        = FG3dLayout_buffers;
      o.linkBuffers    = FG3dLayout_linkBuffers;
      o.bindBuffers    = FG3dLayout_bindBuffers;
      o.samplers       = FG3dLayout_samplers;
      o.linkSamplers   = FG3dLayout_linkSamplers;
      o.bindSamplers   = FG3dLayout_bindSamplers;
      o.unbindSamplers = FG3dLayout_unbindSamplers;
      o.dispose        = FG3dLayout_dispose;
      return o;
   }
   MO.FG3dLayout_construct = function FG3dLayout_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
   }
   MO.FG3dLayout_buffers = function FG3dLayout_buffers(){
      return this._buffers;
   }
   MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
      var o = this;
      if(!buffers.isEmpty()){
         var items = o._buffers;
         if(!items){
            items = o._buffers = new TObjects();
         }
         items.assign(buffers);
      }
   }
   MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
      var o = this;
      var context = o._graphicContext;
      var buffers = o._buffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
         }
      }
   }
   MO.FG3dLayout_samplers = function FG3dLayout_samplers(){
      return this._samplers;
   }
   MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
      var o = this;
      if(!samplers.isEmpty()){
         var items = o._samplers;
         if(!items){
            items = o._samplers = new TObjects();
         }
         items.assign(samplers);
      }
   }
   MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, sampler.texture);
         }
      }
   }
   MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, null);
         }
      }
   }
   MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
      var o = this;
      o._buffers = RObject.dispose(o._buffers);
      o._samplers = RObject.dispose(o._samplers);
      o.__base.FG3dObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgram = function FG3dProgram(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._attributes       = null;
      o._parameters       = null;
      o._samplers         = null;
      o._vertexShader     = null;
      o._fragmentShader   = null;
      o.hasAttribute      = FG3dProgram_hasAttribute;
      o.registerAttribute = FG3dProgram_registerAttribute;
      o.findAttribute     = FG3dProgram_findAttribute;
      o.attributes        = FG3dProgram_attributes;
      o.hasParameter      = FG3dProgram_hasParameter;
      o.registerParameter = FG3dProgram_registerParameter;
      o.findParameter     = FG3dProgram_findParameter;
      o.parameters        = FG3dProgram_parameters;
      o.hasSampler        = FG3dProgram_hasSampler;
      o.registerSampler   = FG3dProgram_registerSampler;
      o.findSampler       = FG3dProgram_findSampler;
      o.samplers          = FG3dProgram_samplers;
      o.vertexShader      = RMethod.virtual(o, 'vertexShader');
      o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
      o.setAttribute      = FG3dProgram_setAttribute;
      o.setParameter      = FG3dProgram_setParameter;
      o.setParameter4     = FG3dProgram_setParameter4;
      o.setSampler        = FG3dProgram_setSampler;
      o.upload            = RMethod.virtual(o, 'upload');
      o.dispose           = FG3dProgram_dispose;
      return o;
   }
   MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
      var o = this;
      var r = o._attributes;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
      var o = this;
      var r = RClass.create(FG3dProgramAttribute);
      r._name = n;
      o.attributes().set(n, r);
      return r;
   }
   MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
      return this._attributes ? this._attributes.get(n) : null;
   }
   MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
      var o = this;
      var r = o._attributes;
      if(r == null){
         r = o._attributes = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
      var o = this;
      var r = o._parameters;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
      var o = this;
      var r = RClass.create(FG3dProgramParameter);
      r._name = pn;
      r.formatCd = pf;
      o.parameters().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
      return this._parameters ? this._parameters.get(n) : null;
   }
   MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
      var o = this;
      var r = o._parameters;
      if(r == null){
         r = o._parameters = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
      var o = this;
      var r = o._samplers;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
      var o = this;
      var r = RClass.create(FG3dProgramSampler);
      r._name = pn;
      o.samplers().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
      return this._samplers ? this._samplers.get(n) : null;
   }
   MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
      var o = this;
      var r = o._samplers;
      if(r == null){
         r = o._samplers = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
      var o = this;
      var p = o.findAttribute(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
      }
      o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
   }
   MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
      var o = this;
      var p = o.findParameter(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
      }
      var d = null;
      var t = pv.constructor;
      if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
         d = pv;
      }else if(t == SColor4){
         d = RTypeArray.float4();
         d[0] = pv.red;
         d[1] = pv.green;
         d[2] = pv.blue;
         d[3] = pv.alpha;
      }else if((t == SPoint3) || (t == SVector3)){
         d = RTypeArray.float3();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
      }else if((t == SPoint4) || (t == SVector4)){
         d = RTypeArray.float4();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
         d[3] = pv.w;
      }else{
         throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
      }
      if(p.attachData(d)){
         o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
      }
   }
   MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
      var v = RTypeArray.float4();
      v[0] = px;
      v[1] = py;
      v[2] = pz;
      v[3] = pw;
      this.setParameter(pn, v, 1);
   }
   MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(pn, pt){
      var o = this;
      var p = o.findSampler(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
      }
      o._graphicContext.bindTexture(p._slot, p._index, pt);
   }
   MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
      var o = this;
      o._attributes = RObject.dispose(o._attributes, true);
      o._parameters = RObject.dispose(o._parameters, true);
      o._samplers = RObject.dispose(o._samplers, true);
      o._vertexShader = RObject.dispose(o._vertexShader);
      o._fragmentShader = RObject.dispose(o._fragmentShader);
      o.__base.FG3dObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._linker     = null;
      o._statusUsed = false;
      o._slot       = -1;
      o._index      = -1;
      o._formatCd   = EG3dAttributeFormat.Unknown;
      o.name        = FG3dProgramAttribute_name;
      o.linker      = FG3dProgramAttribute_linker;
      o.loadConfig  = FG3dProgramAttribute_loadConfig;
      return o;
   }
   MO.FG3dProgramAttribute_name = function FG3dProgramAttribute_name(){
      return this._name;
   }
   MO.FG3dProgramAttribute_linker = function FG3dProgramAttribute_linker(){
      return this._linker;
   }
   MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
   }
}
with(MO){
   MO.FG3dProgramParameter = function FG3dProgramParameter(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._linker     = null;
      o._formatCd   = EG3dParameterFormat.Unknown;
      o._define     = null;
      o._statusUsed = false;
      o._slot       = null;
      o._size       = 0;
      o._buffer     = null;
      o._memory     = null;
      o.name        = FG3dProgramParameter_name;
      o.linker      = FG3dProgramParameter_linker;
      o.define      = FG3dProgramParameter_define;
      o.attachData  = FG3dProgramParameter_attachData;
      o.loadConfig  = FG3dProgramParameter_loadConfig;
      return o;
   }
   MO.FG3dProgramParameter_name = function FG3dProgramParameter_name(){
      return this._name;
   }
   MO.FG3dProgramParameter_linker = function FG3dProgramParameter_linker(){
      return this._linker;
   }
   MO.FG3dProgramParameter_define = function FG3dProgramParameter_define(){
      return this._define;
   }
   MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(p){
      var o = this;
      var r = false;
      var c = p.constructor;
      if(c == SMatrix3d){
         var m = o._memory;
         if(!m){
            m = o._memory = new Float32Array(16);
         }
         r = RFloat.attach(m, p._data, 16);
      }else if(c == Float32Array){
         var l = p.length;
         var m = o._memory;
         if(!m){
            m = o._memory = new Float32Array(l);
         }
         r = RFloat.attach(m, p, l);
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      return r;
   }
   MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
      o._define = p.get('define');
   }
}
with(MO){
   MO.FG3dProgramSampler = function FG3dProgramSampler(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = null;
      o._linker     = null;
      o._statusUsed = false;
      o._formatCd   = EG3dTexture.Flat2d;
      o._bind       = true;
      o._slot       = -1;
      o._index      = 0;
      o._source     = null;
      o.name        = FG3dProgramSampler_name;
      o.linker      = FG3dProgramSampler_linker;
      o.formatCd    = FG3dProgramSampler_formatCd;
      o.loadConfig  = FG3dProgramSampler_loadConfig;
      return o;
   }
   MO.FG3dProgramSampler_name = function FG3dProgramSampler_name(){
      return this._name;
   }
   MO.FG3dProgramSampler_linker = function FG3dProgramSampler_linker(){
      return this._linker;
   }
   MO.FG3dProgramSampler_formatCd = function FG3dProgramSampler_formatCd(){
      return this._formatCd;
   }
   MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(p){
      var o = this;
      o._name = p.get('name');
      o._linker = p.get('linker');
      o._bind = RBoolean.parse(p.get('bind', 'Y'));
      o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
   }
}
with(MO){
   MO.FG3dRenderTarget = function FG3dRenderTarget(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._size     = null;
      o._color    = null;
      o._textures = null;
      o.construct = FG3dRenderTarget_construct;
      o.size      = FG3dRenderTarget_size;
      o.color     = FG3dRenderTarget_color;
      o.textures  = FG3dRenderTarget_textures;
      return o;
   }
   MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
      var o = this;
      o.__base.FG3dObject.construct();
      o._size = new SSize2();
      o._color = new SColor4();
      o._color.set(0.0, 0.0, 0.0, 1.0);
   }
   MO.FG3dRenderTarget_size = function FG3dRenderTarget_size(){
      return this._size;
   }
   MO.FG3dRenderTarget_color = function FG3dRenderTarget_color(){
      return this._color;
   }
   MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
      var o = this;
      var r = o._textures;
      if(r == null){
         r = o._textures = new TObjects();
      }
      return r;
   }
}
with(MO){
   MO.FG3dShader = function FG3dShader(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._source = null;
      o.source  = FG3dShader_source;
      o.upload  = RMethod.virtual(o, 'upload');
      return o;
   }
   MO.FG3dShader_source = function FG3dShader_source(){
      return this._source;
   }
}
with(MO){
   MO.FG3dStatistics = function FG3dStatistics(o){
      o = RClass.inherits(this, o, FStatistics);
      o._frameClearCount     = 0;
      o._frameFillModeCount  = 0;
      o._frameDepthModeCount = 0;
      o._frameCullModeCount  = 0;
      o._frameBlendModeCount = 0;
      o._frameProgramCount   = 0;
      o._frameConstCount     = 0;
      o._frameConstLength    = 0;
      o._frameBufferCount    = 0;
      o._frameTextureCount   = 0;
      o._frameTargetCount    = 0;
      o._frameDrawCount      = 0;
      o._frameTriangleCount  = 0;
      o._programTotal        = 0;
      o._layoutTotal         = 0;
      o._vertexBufferTotal   = 0;
      o._indexBufferTotal    = 0;
      o._flatTextureTotal    = 0;
      o._cubeTextureTotal    = 0;
      o._targetTotal         = 0;
      o.reset                = FG3dStatistics_reset;
      o.resetFrame           = FG3dStatistics_resetFrame;
      return o;
   }
   MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
      o._programTotal = 0;
      o._layoutTotal = 0;
      o._vertexBufferTotal = 0;
      o._indexBufferTotal = 0;
      o._flatTextureTotal = 0;
      o._cubeTextureTotal = 0;
      o._targetTotal = 0;
   }
   MO.FG3dStatistics_resetFrame = function FG3dStatistics_resetFrame(){
      var o = this;
      o._frameClearCount = 0;
      o._frameFillModeCount = 0;
      o._frameDepthModeCount = 0;
      o._frameCullModeCount = 0;
      o._frameBlendModeCount = 0;
      o._frameProgramCount = 0;
      o._frameConstCount = 0;
      o._frameConstLength = 0;
      o._frameBufferCount = 0;
      o._frameTextureCount = 0;
      o._frameTargetCount = 0;
      o._frameTriangleCount = 0;
      o._frameDrawCount = 0;
   }
}
with(MO){
   MO.FG3dTexture = function FG3dTexture(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._textureCd   = EG3dTexture.Unknown;
      o._filterMinCd = EG3dSamplerFilter.Linear;
      o._filterMagCd = EG3dSamplerFilter.Linear;
      o._wrapS       = EG3dSamplerFilter.Unknown;
      o._wrapT       = EG3dSamplerFilter.Unknown;
      o._statusLoad  = false;
      o.isValid      = RMethod.virtual(o, 'isValid');
      o.textureCd    = FG3dTexture_textureCd;
      o.filterMinCd  = FG3dTexture_filterMinCd;
      o.filterMagCd  = FG3dTexture_filterMagCd;
      o.setFilterCd  = FG3dTexture_setFilterCd;
      o.wrapS        = FG3dTexture_wrapS;
      o.wrapT        = FG3dTexture_wrapT;
      o.setWrapCd    = FG3dTexture_setWrapCd;
      return o;
   }
   MO.FG3dTexture_textureCd = function FG3dTexture_textureCd(){
      return this._textureCd;
   }
   MO.FG3dTexture_filterMinCd = function FG3dTexture_filterMinCd(){
      return this._filterMinCd;
   }
   MO.FG3dTexture_filterMagCd = function FG3dTexture_filterMagCd(){
      return this._filterMagCd;
   }
   MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
      var o = this;
      o._filterMinCd = minCd;
      o._filterMagCd = magCd;
   }
   MO.FG3dTexture_wrapS = function FG3dTexture_wrapS(){
      return this._wrapS;
   }
   MO.FG3dTexture_wrapT = function FG3dTexture_wrapT(){
      return this._wrapT;
   }
   MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
      var o = this;
      o._wrapS = wrapS;
      o._wrapT = wrapT;
   }
}
with(MO){
   MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      o._formatCd   = EG3dAttributeFormat.Unknown;
      o._stride     = 0;
      o._count      = 0;
      o.formatCd    = FG3dVertexBuffer_formatCd;
      o.setFormatCd = FG3dVertexBuffer_setFormatCd;
      o.stride      = FG3dVertexBuffer_stride;
      o.setStride   = FG3dVertexBuffer_setStride;
      o.count       = FG3dVertexBuffer_count;
      o.setCount    = FG3dVertexBuffer_setCount;
      o.upload      = RMethod.virtual(o, 'upload');
      return o;
   }
   MO.FG3dVertexBuffer_formatCd = function FG3dVertexBuffer_formatCd(){
      return this._formatCd;
   }
   MO.FG3dVertexBuffer_setFormatCd = function FG3dVertexBuffer_setFormatCd(formatCd){
      this._formatCd = formatCd;
   }
   MO.FG3dVertexBuffer_stride = function FG3dVertexBuffer_stride(){
      return this._stride;
   }
   MO.FG3dVertexBuffer_setStride = function FG3dVertexBuffer_setStride(stride){
      this._stride = stride;
   }
   MO.FG3dVertexBuffer_count = function FG3dVertexBuffer_count(){
      return this._count;
   }
   MO.FG3dVertexBuffer_setCount = function FG3dVertexBuffer_setCount(count){
      this._count = count;
   }
}
with(MO){
   MO.FG3dVertexShader = function FG3dVertexShader(o){
      o = RClass.inherits(this, o, FG3dShader);
      return o;
   }
}
with(MO){
   MO.FG3dAutomaticEffect = function FG3dAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dEffect);
      o._optionMerge                 = false;
      o._optionBlendMode             = true;
      o._supportInstance             = false;
      o._supportLayout               = false;
      o._supportMaterialMap          = false;
      o._supportVertexColor          = true;
      o._supportVertexCoord          = true;
      o._supportVertexNormal         = true;
      o._supportVertexNormalFull     = true;
      o._supportVertexNormalCompress = false;
      o._supportSkeleton             = false;
      o._supportAlpha                = true;
      o._supportAmbient              = true;
      o._supportDiffuse              = true;
      o._supportDiffuseView          = true;
      o._supportSpecularColor        = true;
      o._supportSpecularLevel        = true;
      o._supportSpecularView         = true;
      o._supportLight                = true;
      o._supportReflect              = true;
      o._supportRefract              = true;
      o._supportEmissive             = true;
      o._supportHeight               = true;
      o._supportEnvironment          = true;
      o._dynamicSkeleton             = true;
      o.setup                        = FG3dAutomaticEffect_setup;
      o.buildInfo                    = FG3dAutomaticEffect_buildInfo;
      o.bindAttributes               = FG3dAutomaticEffect_bindAttributes;
      o.bindSamplers                 = FG3dAutomaticEffect_bindSamplers;
      o.bindMaterialSamplers         = FG3dAutomaticEffect_bindMaterialSamplers;
      o.bindMaterial                 = FG3dAutomaticEffect_bindMaterial;
      o.drawRenderable               = FG3dAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FG3dAutomaticEffect_setup = function FG3dAutomaticEffect_setup(){
      var o = this;
      var c = o._graphicContext;
      var cp = c.capability();
      o._supportLayout = cp.optionLayout;
   }
   MO.FG3dAutomaticEffect_buildInfo = function FG3dAutomaticEffect_buildInfo(tagContext, pc){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var flag = new TString();
      flag.append(pc.techniqueModeCode)
      tagContext.set("technique.mode", pc.techniqueModeCode);
      var om = o._optionMerge = pc.optionMerge;
      if(om){
         var mc = pc.mergeCount;
         flag.append("|OI" + mc);
         tagContext.setBoolean("option.instance", true);
         tagContext.set("instance.count", mc);
      }
      if(capability.optionMaterialMap){
         flag.append("|OM");
         tagContext.setBoolean("option.material.map", true);
         o._supportMaterialMap = true;
      }
      if(pc.optionNormalInvert){
         flag.append("|ON");
         tagContext.setBoolean("option.normal.invert", true);
         o._supportNormalInvert = true;
      }
      if(pc.optionColor){
         flag.append("|OC");
         tagContext.setBoolean("option.color", true);
         o.optionAmbient = true;
      }
      if(pc.optionAmbient){
         flag.append("|OA");
         tagContext.setBoolean("option.ambient", true);
         o.optionAmbient = true;
      }
      if(pc.optionDiffuse){
         flag.append("|OD");
         tagContext.setBoolean("option.diffuse", true);
         o.optionDiffuse = true;
      }
      if(pc.optionSpecular){
         flag.append("|OS");
         tagContext.setBoolean("option.specular", true);
         o.optionSpecular = true;
      }
      if(pc.optionReflect){
         flag.append("|ORL");
         tagContext.setBoolean("option.reflect", true);
         o.optionReflect = true;
      }
      if(pc.optionRefract){
         flag.append("|ORF");
         tagContext.setBoolean("option.refract", true);
         o.optionRefract = true;
      }
      var ac = pc.attributeContains(EG3dAttribute.Color);
      o._dynamicVertexColor = (o._supportVertexColor && ac);
      if(o._dynamicVertexColor){
         flag.append("|AC");
         tagContext.setBoolean("vertex.attribute.color", true);
      }
      var ad = pc.attributeContains(EG3dAttribute.Coord);
      o._dynamicVertexCoord = (o._supportVertexCoord && ad);
      if(o._dynamicVertexCoord){
         flag.append("|AD");
         tagContext.setBoolean("vertex.attribute.coord", true);
      }
      var an = pc.attributeContains(EG3dAttribute.Normal);
      o._dynamicVertexNormal = (o._supportVertexNormal && an);
      if(o._dynamicVertexNormal){
         flag.append("|AN");
         tagContext.setBoolean("vertex.attribute.normal", true);
      }
      var ab = pc.attributeContains(EG3dAttribute.Binormal);
      var at = pc.attributeContains(EG3dAttribute.Tangent);
      var af = (an && ab && at);
      o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
      if(o._dynamicVertexNormalFull){
         flag.append("|ANF");
         tagContext.setBoolean("vertex.attribute.normal.full", true);
      }
      o._dynamicVertexNormalCompress = pc.optionNormalCompress;
      if(o._dynamicVertexNormalCompress){
         flag.append("|ANC");
         tagContext.setBoolean("vertex.attribute.normal.compress", true);
      }
      o._dynamicInstance = (o._supportInstance && capability.optionInstance);
      if(o._dynamicInstance){
         flag.append("|SI");
         if(pc){
            tagContext.setBoolean("support.instance", true);
         }
      }
      o._dynamicSkeleton = o._supportSkeleton;
      if(o._dynamicSkeleton){
         flag.append("|SS");
         if(pc){
            tagContext.setBoolean("support.skeleton", true);
         }
      }
      var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
      o._dynamicAlpha = o._supportAlpha;
      if(o._dynamicAlpha){
         flag.append("|RA");
         if(pc){
            tagContext.setBoolean("support.alpha", true);
         }
         o._optionBlendMode = true;
      }else{
         o._optionBlendMode = false;
      }
      o._dynamicAmbient = o._supportAmbient;
      if(o._dynamicAmbient){
         flag.append("|TA");
         if(pc){
            tagContext.setBoolean("support.ambient", true);
         }
         if(sdf){
            flag.append("|TAS");
            if(pc){
               tagContext.setBoolean("support.ambient.sampler", true);
            }
         }
      }
      if(pc.samplerContains(EG3dSampler.Alpha)){
         tagContext.setBoolean("support.alpha.sampler", true);
      }
      var snr = pc.samplerContains(EG3dSampler.Normal);
      o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
      if(o._supportDiffuse){
         if(pc){
            tagContext.setBoolean("support.diffuse", true);
         }
         if(snr){
            flag.append("|TDD");
            if(pc){
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.dump", true);
            }
         }else if(o._dynamicVertexNormal){
            flag.append("|TDN");
            if(pc){
               tagContext.setBoolean("support.diffuse.normal", true);
            }
         }
      }
      o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
      if(o._supportDiffuseView){
         if(pc){
            tagContext.setBoolean("support.diffuse.view", true);
         }
         if(snr){
            flag.append("|TDVD");
            if(pc){
               tagContext.setBoolean("support.dump", true);
               tagContext.setBoolean("support.diffuse.view.dump", true);
            }
         }else if(o._dynamicVertexNormal){
            flag.append("|TDVN");
            if(pc){
               tagContext.setBoolean("support.diffuse.view.normal", true);
            }
         }
      }
      var spc = pc.samplerContains(EG3dSampler.SpecularColor);
      var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
      o._dynamicSpecularColor = (o._supportSpecularColor && spc);
      o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
      if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
         flag.append("|TS");
         if(pc){
            tagContext.setBoolean("support.specular", true);
         }
         if(o._dynamicSpecularColor){
            flag.append("|TSC");
            if(pc){
               tagContext.setBoolean("support.specular.color", true);
            }
         }
         if(o._dynamicSpecularLevel){
            flag.append("|TSL");
            if(pc){
               tagContext.setBoolean("support.specular.level", true);
            }
         }else{
            flag.append("|NSL");
            if(pc){
               tagContext.setBoolean("support.specular.normal", true);
            }
         }
      }
      o._dynamicSpecularView = o._supportSpecularView;
      if(o._dynamicSpecularView && o._dynamicVertexNormal){
         flag.append("|TSV");
         if(pc){
            tagContext.setBoolean("support.specular.view", true);
         }
         if(o._dynamicSpecularColor){
            flag.append("|TSVC");
            if(pc){
               tagContext.setBoolean("support.specular.view.color", true);
            }
         }
         if(o._dynamicSpecularLevel){
            flag.append("|TSVL");
            if(pc){
               tagContext.setBoolean("support.specular.view.level", true);
            }
         }else{
            flag.append("|NSVL");
            if(pc){
               tagContext.setBoolean("support.specular.view.normal", true);
            }
         }
      }
      var slg = pc.samplerContains(EG3dSampler.Light);
      o._dynamicLight = (o._supportLight && slg);
      if(o._dynamicLight){
         flag.append("|TL");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.light", true);
         }
      }
      var slr = pc.samplerContains(EG3dSampler.Reflect);
      o._dynamicReflect = (o._supportReflect && slr);
      if(o._dynamicReflect){
         flag.append("|TRL");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.reflect", true);
         }
      }
      var slf = pc.samplerContains(EG3dSampler.Refract);
      o._dynamicRefract = (o._supportRefract && slf);
      if(o._dynamicRefract){
         flag.append("|TRF");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.refract", true);
         }
      }
      var sle = pc.samplerContains(EG3dSampler.Emissive);
      o._dynamicEmissive = (o._supportEmissive && sle);
      if(o._dynamicEmissive){
         flag.append("|TLE");
         if(pc){
            tagContext.setBoolean("support.sampler.light", true);
            tagContext.setBoolean("support.emissive", true);
         }
      }
      var shg = pc.samplerContains(EG3dSampler.Height);
      o._dynamicHeight = (o._supportHeight && shg);
      if(o._dynamicHeight){
         flag.append("|TH");
         if(pc){
            tagContext.setBoolean("support.height", true);
         }
      }
      var sen = pc.samplerContains(EG3dSampler.Environment);
      o._dynamicEnvironment = (o._supportEnvironment && sen);
      if(o._dynamicEnvironment){
         flag.append("|TE");
         if(pc){
            tagContext.setBoolean("support.environment", true);
         }
      }
      if(o._dynamicSkeleton){
         var boneCount = capability.calculateBoneCount(pc.vertexBoneCount, pc.vertexCount);
         flag.append("|B" + boneCount);
         tagContext.set("bone.count", boneCount);
         tagContext.set("bone.array.count", boneCount * 3);
         tagContext.setBoolean("support.bone.weight.1", true);
         tagContext.setBoolean("support.bone.weight.2", true);
         tagContext.setBoolean("support.bone.weight.3", true);
         tagContext.setBoolean("support.bone.weight.4", true);
      }
      tagContext.code = flag.flush();
   }
   MO.FG3dAutomaticEffect_bindAttributes = function FG3dAutomaticEffect_bindAttributes(renderable){
      var o = this;
      var program = o._program;
      if(program.hasAttribute()){
         var attributes = program.attributes();
         var count = attributes.count();
         for(var n = 0; n < count; n++){
            var attribute = attributes.at(n);
            if(attribute._statusUsed){
               var buffer = renderable.findVertexBuffer(attribute._linker);
               program.setAttribute(attribute._name, buffer, buffer._formatCd);
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindSamplers = function FG3dAutomaticEffect_bindSamplers(renderable){
      var o = this;
      var program = o._program;
      if(o._supportMaterialMap){
         program.setSampler('fs_material', region.materialMap().texture());
      }
      if(program.hasSampler()){
         var samplers = program.samplers();
         var count = samplers.count();
         for(var n = 0; n < count; n++){
            var sampler = samplers.at(n);
            if(sampler._bind && sampler._statusUsed){
               var linker = sampler.linker();
               var texture = renderable.findTexture(linker);
               program.setSampler(sampler.name(), texture.texture());
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindMaterialSamplers = function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
      var o = this;
      var program = o._program;
      if(program.hasSampler()){
         var samplers = program.samplers();
         var count = samplers.count();
         for(var n = 0; n < count; n++){
            var sampler = samplers.at(n);
            if(sampler._bind && sampler._statusUsed){
               var linker = sampler.linker();
               var texture = material.findBitmap(linker);
               program.setSampler(sampler.name(), texture.texture());
            }
         }
      }
   }
   MO.FG3dAutomaticEffect_bindMaterial = function FG3dAutomaticEffect_bindMaterial(material){
      var o = this;
      var context = o._graphicContext;
      var info = material.info();
      if(info.optionDepth){
         context.setDepthMode(o._stateDepth, o._stateDepthCd);
      }else{
         context.setDepthMode(false);
      }
      if(info.optionAlpha){
         context.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
      }else{
         context.setBlendFactors(false);
      }
      if(info.optionDouble){
         context.setCullingMode(false);
      }else{
         context.setCullingMode(o._stateDepth, o._stateCullCd);
      }
   }
   MO.FG3dAutomaticEffect_drawRenderable = function FG3dAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var info = renderable.activeInfo();
      var layout = info.layout;
      if(!layout){
         layout = info.layout = context.createLayout();
         if(o._supportLayout){
            layout.bind();
            o.bindAttributes(renderable);
            layout.unbind();
            layout.active();
         }else{
            context.recordBegin();
            o.bindAttributes(renderable);
            context.recordEnd();
            layout.linkBuffers(context.recordBuffers());
         }
         context.recordBegin();
         o.bindSamplers(renderable);
         context.recordEnd();
         layout.linkSamplers(context.recordSamplers());
      }else{
         if(o._supportLayout){
            layout.active();
         }else{
            layout.bindBuffers();
         }
         layout.bindSamplers();
      }
      var indexCount = 0;
      var indexBuffers = renderable.indexBuffers();
      if(indexBuffers){
         indexCount = indexBuffers.count();
      }
      if(indexCount > 1){
         var materials = renderable.materials();
         for(var i = 0; i < indexCount; i++){
            var indexBuffer = indexBuffers.at(i);
            if(materials){
               var material = materials.at(i);
               if(material){
                  o.bindMaterialSamplers(renderable, material);
               }
            }
            context.drawTriangles(indexBuffer);
         }
      }else{
         context.drawTriangles(renderable.indexBuffer());
      }
      if(o._supportLayout){
         layout.deactive();
      }
   }
}
with(MO){
   MO.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'select.automatic';
      o.drawRenderable = FG3dSelectAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FG3dSelectAutomaticEffect_drawRenderable = function FG3dSelectAutomaticEffect_drawRenderable(pg, pr, pi){
      var o = this;
      var c = o._graphicContext;
      var s = c.size();
      var p = o._program;
      var sx = pg._selectX;
      var sy = pg._selectY;
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
      var i = pi + 1;
      var i1 = i  & 0xFF;
      var i2 = (i >> 8) & 0xFF;
      var i3 = (i >> 16) & 0xFF;
      p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FG3dSelectPass = function FG3dSelectPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code         = 'select';
      o._texture      = null;
      o._renderTarget = null;
      o._position     = null;
      o._data         = null;
      o.construct     = FG3dSelectPass_construct;
      o.setup         = FG3dSelectPass_setup;
      o.textureDepth  = FG3dSelectPass_texture;
      o.drawRegion    = FG3dSelectPass_drawRegion;
      return o;
   }
   MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
      var o = this;
      o.__base.FG3dTechniquePass.construct.call(o);
      o._data = new Uint8Array(4);
      o._position = new SPoint2();
   }
   MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
      var o = this;
      o.__base.FG3dTechniquePass.setup.call(o);
      var c = o._graphicContext;
      var T = o._texture = c.createFlatTexture();
      T.setFilterCd(EG3dSamplerFilter.Nearest, EG3dSamplerFilter.Nearest);
      T.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      var t = o._renderTarget = c.createRenderTarget();
      t.size().set(1, 1);
      t.textures().push(T);
      t.build();
   }
   MO.FG3dSelectPass_texture = function FG3dSelectPass_texture(){
      return this._texture;
   }
   MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      c.setRenderTarget(o._renderTarget);
      c.clear(0, 0, 0, 0, 1, 1);
      var rs = p.allRenderables();
      o.activeEffects(p, rs);
      var rc = rs.count();
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         c.setProgram(e.program());
         var d = r.display();
         if(!d){
            e.drawRenderable(p, r, i);
         }else if(!d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      c.clearDepth(1);
      for(var i = 0; i < rc; i++){
         var r = rs.get(i);
         var e = r.activeEffect();
         c.setProgram(e.program());
         var d = r.display();
         if(d && d._optionFace){
            e.drawRenderable(p, r, i);
         }
      }
      g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, o._data);
      var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
      o._selectRenderable = null;
      if(v != 0){
         o._selectRenderable = rs.get(v - 1);
      }
   }
}
with(MO){
   MO.FG3dSelectSkeletonEffect = function FG3dSelectSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'select.automatic';
      o.drawRenderable = FG3dSelectSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FG3dSelectSkeletonEffect_drawRenderable = function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
      var o = this;
      var c = o._graphicContext;
      var s = c.size();
      var p = o._program;
      var sx = pg._selectX;
      var sy = pg._selectY;
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
      var i = pi + 1;
      var i1 = i  & 0xFF;
      var i2 = (i >> 8) & 0xFF;
      var i3 = (i >> 16) & 0xFF;
      p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique);
      o._code       = 'select';
      o._passSelect = null;
      o.setup       = FG3dSelectTechnique_setup;
      o.passSelect  = FG3dSelectTechnique_passSelect;
      o.test        = FG3dSelectTechnique_test;
      return o;
   }
   MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
      var o = this;
      o.__base.FG3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Result);
      var pd = o._passSelect = RClass.create(FG3dSelectPass);
      pd.linkGraphicContext(o);
      pd.setup();
      o._passes.push(pd);
   }
   MO.FG3dSelectTechnique_passSelect = function FG3dSelectTechnique_passSelect(){
      return this._passSelect;
   }
   MO.FG3dSelectTechnique_test = function FG3dSelectTechnique_test(p, x, y){
      var o = this;
      p._selectX = x;
      p._selectY = y;
      p.setTechnique(o);
      o.drawRegion(p);
      return o._passSelect._selectRenderable;
   }
}
with(MO){
   MO.FWglContext = function FWglContext(o){
      o = RClass.inherits(this, o, FG3dContext);
      o._native             = null;
      o._nativeInstance     = null;
      o._nativeLayout       = null;
      o._nativeDebugShader  = null;
      o._activeRenderTarget = null;
      o._activeTextureSlot  = null;
      o._parameters         = null;
      o._extensions         = null;
      o._statusRecord       = false;
      o._recordBuffers      = null;
      o._recordSamplers     = null;
      o._data9              = null;
      o._data16             = null;
      o.construct           = FWglContext_construct;
      o.linkCanvas          = FWglContext_linkCanvas;
      o.parameters          = FWglContext_parameters;
      o.extensions          = FWglContext_extensions;
      o.recordBuffers       = FWglContext_recordBuffers;
      o.recordSamplers      = FWglContext_recordSamplers;
      o.recordBegin         = FWglContext_recordBegin;
      o.recordEnd           = FWglContext_recordEnd;
      o.createProgram       = FWglContext_createProgram;
      o.createLayout        = FWglContext_createLayout;
      o.createVertexBuffer  = FWglContext_createVertexBuffer;
      o.createIndexBuffer   = FWglContext_createIndexBuffer;
      o.createFlatTexture   = FWglContext_createFlatTexture;
      o.createCubeTexture   = FWglContext_createCubeTexture;
      o.createRenderTarget  = FWglContext_createRenderTarget;
      o.setViewport         = FWglContext_setViewport;
      o.setFillMode         = FWglContext_setFillMode;
      o.setDepthMode        = FWglContext_setDepthMode;
      o.setCullingMode      = FWglContext_setCullingMode;
      o.setBlendFactors     = FWglContext_setBlendFactors;
      o.setScissorRectangle = FWglContext_setScissorRectangle;
      o.setRenderTarget     = FWglContext_setRenderTarget;
      o.setProgram          = FWglContext_setProgram;
      o.bindConst           = FWglContext_bindConst;
      o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
      o.bindTexture         = FWglContext_bindTexture;
      o.clear               = FWglContext_clear;
      o.clearColor          = FWglContext_clearColor;
      o.clearDepth          = FWglContext_clearDepth;
      o.readPixels          = FWglContext_readPixels;
      o.drawTriangles       = FWglContext_drawTriangles;
      o.present             = FWglContext_present;
      o.checkError          = FWglContext_checkError;
      return o;
   }
   MO.FWglContext_construct = function FWglContext_construct(){
      var o = this;
      o.__base.FG3dContext.construct.call(o);
      o._capability = new SG3dContextCapability();
      o._data9 = new Float32Array(9);
      o._data16 = new Float32Array(16);
      o._recordBuffers = new TObjects();
      o._recordSamplers = new TObjects();
   }
   MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(h){
      var o = this;
      o.__base.FG3dContext.linkCanvas.call(o, h)
      o._hCanvas = h;
      if(h.getContext){
         var a = new Object();
         a.alpha = o._optionAlpha;
         a.antialias = o._optionAntialias;
         var n = h.getContext('experimental-webgl', a);
         if(n == null){
            n = h.getContext('webgl', a);
         }
         if(n == null){
            throw new TError("Current browser can't support WebGL technique.");
         }
         o._native = n;
         o._contextAttributes = n.getContextAttributes();
      }
      var g = o._native;
      o.setViewport(0, 0, h.width, h.height);
      o.setDepthMode(true, EG3dDepthMode.LessEqual);
      o.setCullingMode(true, EG3dCullMode.Front);
      var c = o._capability;
      c.vendor = g.getParameter(g.VENDOR);
      c.version = g.getParameter(g.VERSION);
      c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
      c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
      c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
      c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
      c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
      c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
      var e = o._nativeInstance = g.getExtension('ANGLE_instanced_arrays');
      if(e){
         c.optionInstance = true;
      }
      c.mergeCount = parseInt((c.vertexConst - 32) / 4);
      var e = o._nativeLayout = g.getExtension('OES_vertex_array_object');
      if(e){
         c.optionLayout = true;
      }
      var e = g.getExtension('OES_element_index_uint');
      if(e){
         c.optionIndex32 = true;
      }
      var e = o._nativeSamplerS3tc = g.getExtension('WEBGL_compressed_texture_s3tc');
      if(e){
         c.samplerCompressRgb = e.COMPRESSED_RGB_S3TC_DXT1_EXT;
         c.samplerCompressRgba = e.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      var s = c.shader = new Object();
      var sv = s.vertexPrecision = new Object();
      if(g.getShaderPrecisionFormat){
         sv.floatLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_FLOAT);
         sv.floatMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_FLOAT);
         sv.floatHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_FLOAT);
         sv.intLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_INT);
         sv.intMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_INT);
         sv.intHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_INT);
      }
      var sf = s.fragmentPrecision = new Object();
      if(g.getShaderPrecisionFormat){
         sf.floatLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_FLOAT);
         sf.floatMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_FLOAT);
         sf.floatHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT);
         sf.intLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_INT);
         sf.intMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_INT);
         sf.intHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_INT);
      }
      var e = o._nativeDebugShader = g.getExtension('WEBGL_debug_shaders');
      if(e){
         c.optionShaderSource = true;
      }
   }
   MO.FWglContext_parameters = function FWglContext_parameters(){
      var o = this;
      var r = o._parameters;
      if(r){
         return r;
      }
      var ns =['ACTIVE_TEXTURE',
         'ALIASED_LINE_WIDTH_RANGE',
         'ALIASED_POINT_SIZE_RANGE',
         'ALPHA_BITS',
         'ARRAY_BUFFER_BINDING',
         'BLEND',
         'BLEND_COLOR',
         'BLEND_DST_ALPHA',
         'BLEND_DST_RGB',
         'BLEND_EQUATION_ALPHA',
         'BLEND_EQUATION_RGB',
         'BLEND_SRC_ALPHA',
         'BLEND_SRC_RGB',
         'BLUE_BITS',
         'COLOR_CLEAR_VALUE',
         'COLOR_WRITEMASK',
         'COMPRESSED_TEXTURE_FORMATS',
         'CULL_FACE',
         'CULL_FACE_MODE',
         'CURRENT_PROGRAM',
         'DEPTH_BITS',
         'DEPTH_CLEAR_VALUE',
         'DEPTH_FUNC',
         'DEPTH_RANGE',
         'DEPTH_TEST',
         'DEPTH_WRITEMASK',
         'DITHER',
         'ELEMENT_ARRAY_BUFFER_BINDING',
         'FRAMEBUFFER_BINDING',
         'FRONT_FACE',
         'GENERATE_MIPMAP_HINT',
         'GREEN_BITS',
         'IMPLEMENTATION_COLOR_READ_FORMAT',
         'IMPLEMENTATION_COLOR_READ_TYPE',
         'LINE_WIDTH',
         'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
         'MAX_CUBE_MAP_TEXTURE_SIZE',
         'MAX_FRAGMENT_UNIFORM_VECTORS',
         'MAX_RENDERBUFFER_SIZE',
         'MAX_TEXTURE_IMAGE_UNITS',
         'MAX_TEXTURE_SIZE',
         'MAX_VARYING_VECTORS',
         'MAX_VERTEX_ATTRIBS',
         'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
         'MAX_VERTEX_UNIFORM_VECTORS',
         'MAX_VIEWPORT_DIMS',
         'PACK_ALIGNMENT',
         'POLYGON_OFFSET_FACTOR',
         'POLYGON_OFFSET_FILL',
         'POLYGON_OFFSET_UNITS',
         'RED_BITS',
         'RENDERBUFFER_BINDING',
         'RENDERER',
         'SAMPLE_BUFFERS',
         'SAMPLE_COVERAGE_INVERT',
         'SAMPLE_COVERAGE_VALUE',
         'SAMPLES',
         'SCISSOR_BOX',
         'SCISSOR_TEST',
         'SHADING_LANGUAGE_VERSION',
         'STENCIL_BACK_FAIL',
         'STENCIL_BACK_FUNC',
         'STENCIL_BACK_PASS_DEPTH_FAIL',
         'STENCIL_BACK_PASS_DEPTH_PASS',
         'STENCIL_BACK_REF',
         'STENCIL_BACK_VALUE_MASK',
         'STENCIL_BACK_WRITEMASK',
         'STENCIL_BITS',
         'STENCIL_CLEAR_VALUE',
         'STENCIL_FAIL',
         'STENCIL_FUNC',
         'STENCIL_PASS_DEPTH_FAIL',
         'STENCIL_PASS_DEPTH_PASS',
         'STENCIL_REF',
         'STENCIL_TEST',
         'STENCIL_VALUE_MASK',
         'STENCIL_WRITEMASK',
         'SUBPIXEL_BITS',
         'TEXTURE_BINDING_2D',
         'TEXTURE_BINDING_CUBE_MAP',
         'UNPACK_ALIGNMENT',
         'UNPACK_COLORSPACE_CONVERSION_WEBGL',
         'UNPACK_FLIP_Y_WEBGL',
         'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
         'VENDOR',
         'VERSION',
         'VIEWPORT'];
      var g = o._native;
      var c = ns.length;
      r = new Object();
      for(var i = 0; i < c; i++){
         var n = ns[i];
         r[n] = g.getParameter(g[n]);
      }
      var e = g.getExtension('WEBGL_debug_renderer_info');
      if(e){
         r['UNMASKED_RENDERER_WEBGL'] = g.getParameter(e.UNMASKED_RENDERER_WEBGL);
         r['UNMASKED_VENDOR_WEBGL'] = g.getParameter(e.UNMASKED_VENDOR_WEBGL);
      }
      o._parameters = r;
      return r;
   }
   MO.FWglContext_extensions = function FWglContext_extensions(){
      var o = this;
      var r = o._extensions;
      if(!r){
         r = o._extensions = new Object();
         var g = o._native;
         var s = g.getSupportedExtensions();
         var c = s.length;
         for(var i = 0; i < c; i++){
            var n = s[i];
            r[n] = g.getExtension(n);
         }
      }
      return r;
   }
   MO.FWglContext_recordBuffers = function FWglContext_recordBuffers(){
      return this._recordBuffers;
   }
   MO.FWglContext_recordSamplers = function FWglContext_recordSamplers(){
      return this._recordSamplers;
   }
   MO.FWglContext_recordBegin = function FWglContext_recordBegin(){
      var o = this;
      o._recordBuffers.clear();
      o._recordSamplers.clear();
      o._statusRecord = true;
   }
   MO.FWglContext_recordEnd = function FWglContext_recordEnd(){
      this._statusRecord = false;
   }
   MO.FWglContext_createProgram = function FWglContext_createProgram(){
      var o = this;
      var program = RClass.create(FWglProgram);
      program.linkGraphicContext(o);
      program.setup();
      o._storePrograms.push(program);
      o._statistics._programTotal++;
      return program;
   }
   MO.FWglContext_createLayout = function FWglContext_createLayout(){
      var o = this;
      var layout = RClass.create(FWglLayout);
      layout.linkGraphicContext(o);
      if(o._capability.optionLayout){
         layout.setup();
      }
      o._storeLayouts.push(layout);
      o._statistics._layoutTotal++;
      return layout;
   }
   MO.FWglContext_createVertexBuffer = function FWglContext_createVertexBuffer(clazz){
      var o = this;
      var buffer = RClass.create(clazz ? clazz : FWglVertexBuffer);
      buffer.linkGraphicContext(o);
      buffer.setup();
      o._storeBuffers.push(buffer);
      o._statistics._vertexBufferTotal++;
      return buffer;
   }
   MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
      var o = this;
      var buffer = RClass.create(clazz ? clazz : FWglIndexBuffer);
      buffer.linkGraphicContext(o);
      buffer.setup();
      o._storeBuffers.push(buffer);
      o._statistics._indexBufferTotal++;
      return buffer;
   }
   MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(){
      var o = this;
      var texture = RClass.create(FWglFlatTexture);
      texture.linkGraphicContext(o);
      texture.setup();
      o._storeTextures.push(texture);
      o._statistics._flatTextureTotal++;
      return texture;
   }
   MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(){
      var o = this;
      var texture = RClass.create(FWglCubeTexture);
      texture.linkGraphicContext(o);
      texture.setup();
      o._storeTextures.push(texture);
      o._statistics._cubeTextureTotal++;
      return texture;
   }
   MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(){
      var o = this;
      var target = RClass.create(FWglRenderTarget);
      target.linkGraphicContext(o);
      target.setup();
      o._storeTargets.push(target);
      o._statistics._targetTotal++;
      return target;
   }
   MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
      var o = this;
      o._size.set(width, height);
      o._native.viewport(left, top, width, height);
   }
   MO.FWglContext_setFillMode = function FWglContext_setFillMode(fillModeCd){
      var o = this;
      var graphic = o._native;
      if(o._fillModeCd == fillModeCd){
         return false;
      }
      o._statistics._frameFillModeCount++;
      switch(fillModeCd){
         case EG3dFillMode.Point:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
            break;
         case EG3dFillMode.Line:
            graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
            break;
         case EG3dFillMode.Face:
            graphic.polygonMode(graphic.FRONT, graphic.FILL);
            break;
         default:
            throw new TError('Invalid parameter. (fill_mode={1})', fillModeCd);
      }
      o._fillModeCd = fillModeCd;
      return true;
   }
   MO.FWglContext_setDepthMode = function FWglContext_setDepthMode(depthFlag, depthCd){
      var o = this;
      var graphic = o._native;
      if((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)){
         return false;
      }
      o._statistics._frameDepthModeCount++;
      if(o._optionDepth != depthFlag){
         if(depthFlag){
            graphic.enable(graphic.DEPTH_TEST);
         }else{
            graphic.disable(graphic.DEPTH_TEST);
         }
         o._optionDepth = depthFlag;
      }
      if(depthFlag && (o._depthModeCd != depthCd)){
         var depthCode = RWglUtility.convertDepthMode(graphic, depthCd);
         graphic.depthFunc(depthCode);
         o._depthModeCd = depthCd;
      }
      return true;
   }
   MO.FWglContext_setCullingMode = function FWglContext_setCullingMode(cullFlag, cullCd){
      var o = this;
      var graphic = o._native;
      if((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)){
         return false;
      }
      o._statistics._frameCullModeCount++;
      if(o._optionCull != cullFlag){
         if(cullFlag){
            graphic.enable(graphic.CULL_FACE);
         }else{
            graphic.disable(graphic.CULL_FACE);
         }
         o._optionCull = cullFlag;
      }
      if(cullFlag && (o._cullModeCd != cullCd)){
         var cullValue = RWglUtility.convertCullMode(graphic, cullCd);
         graphic.cullFace(cullValue);
         o._cullModeCd = cullCd;
      }
      return true;
   }
   MO.FWglContext_setBlendFactors = function FWglContext_setBlendFactors(blendFlag, sourceCd, tagetCd){
      var o = this;
      var graphic = o._native;
      if((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)){
         return false;
      }
      o._statistics._frameBlendModeCount++;
      if(o._statusBlend != blendFlag){
         if(blendFlag){
            graphic.enable(graphic.BLEND);
         }else{
            graphic.disable(graphic.BLEND);
            o._blendSourceCd = 0;
            o._blendTargetCd = 0;
         }
         o._statusBlend = blendFlag;
      }
      if(blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))){
         var sourceValue = RWglUtility.convertBlendFactors(graphic, sourceCd);
         var tagetValue = RWglUtility.convertBlendFactors(graphic, tagetCd);
         graphic.blendFunc(sourceValue, tagetValue);
         o._blendSourceCd = sourceCd;
         o._blendTargetCd = tagetCd;
      }
      return true;
   }
   MO.FWglContext_setScissorRectangle = function FWglContext_setScissorRectangle(left, top, width, height){
      this._native.scissor(left, top, width, height);
   }
   MO.FWglContext_setRenderTarget = function FWglContext_setRenderTarget(renderTarget){
      var o = this;
      var graphic = o._native;
      if(o._activeRenderTarget == renderTarget){
         return;
      }
      o._statistics._frameTargetCount++;
      var result = true;
      if(renderTarget == null){
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
         result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
         if(!result){
            return result;
         }
         graphic.viewport(0, 0, o._size.width, o._size.height);
      }else{
         graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._native);
         result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._native);
         if(!result){
            return result;
         }
         var size = renderTarget.size();
         graphic.viewport(0, 0, size.width, size.height);
      }
      o._activeRenderTarget = renderTarget;
      return result;
   }
   MO.FWglContext_setProgram = function FWglContext_setProgram(program){
      var o = this;
      var graphic = o._native;
      if(o._program == program){
         return;
      }
      o._statistics._frameProgramCount++;
      if(program){
         graphic.useProgram(program._native);
      }else{
         graphic.useProgram(null);
      }
      o._program = program;
      return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._native);
   }
   MO.FWglContext_bindConst = function FWglContext_bindConst(shaderCd, slot, formatCd, data, count){
      var o = this;
      var graphic = o._native;
      var result = true;
      o._statistics._frameConstCount++;
      switch(formatCd){
         case EG3dParameterFormat.Float1:{
            graphic.uniform1fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float2:{
            graphic.uniform2fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3:{
            graphic.uniform3fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4:{
            graphic.uniform4fv(slot, data);
            o._statistics._frameConstLength += data.byteLength;
            result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float3x3:{
            var bytes = o._data9;
            bytes[ 0] = data[ 0];
            bytes[ 1] = data[ 4];
            bytes[ 2] = data[ 8];
            bytes[ 3] = data[ 1];
            bytes[ 4] = data[ 5];
            bytes[ 5] = data[ 9];
            bytes[ 6] = data[ 2];
            bytes[ 7] = data[ 6];
            bytes[ 8] = data[10];
            graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         case EG3dParameterFormat.Float4x4:{
            var bytes = null;
            if(data.constructor == Float32Array){
               bytes = data;
            }else if(data.writeData){
               bytes = o._data16;
               data.writeData(bytes, 0);
            }else{
               throw new TError('Unknown data type.');
            }
            graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
            o._statistics._frameConstLength += bytes.byteLength;
            result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
            break;
         }
         default:{
            throw new TError(o, 'Unknown format type. (format_cd={1})', formatCd);
         }
      }
      return result;
   }
   MO.FWglContext_bindVertexBuffer = function FWglContext_bindVertexBuffer(slot, vertexBuffer, offset, formatCd){
      var o = this;
      var graphic = o._native;
      var result = true;
      o._statistics._frameBufferCount++;
      if(o._statusRecord){
         var layout = new SG3dLayoutBuffer();
         layout.slot = slot;
         layout.buffer = vertexBuffer;
         layout.index = offset;
         layout.formatCd = formatCd;
         o._recordBuffers.push(layout);
      }
      var handle = null;
      if(vertexBuffer != null){
         handle = vertexBuffer._native;
      }
      graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
      result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
      if(!result){
         return result;
      }
      if(vertexBuffer){
         graphic.enableVertexAttribArray(slot);
         result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
         if(!result){
            return result;
         }
      }else{
         graphic.disableVertexAttribArray(slot);
         result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
         return result;
      }
      var stride = vertexBuffer._stride;
      switch(formatCd){
         case EG3dAttributeFormat.Float1:
            graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float2:
            graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float3:
            graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Float4:
            graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
            break;
         case EG3dAttributeFormat.Byte4Normal:
            graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
            break;
         default:
            throw new TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
            break;
      }
      result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
      return result;
   }
   MO.FWglContext_bindTexture = function FWglContext_bindTexture(slot, index, texture){
      var o = this;
      var graphic = o._native;
      var result = true;
      o._statistics._frameTextureCount++;
      if(o._statusRecord){
         var layout = new SG3dLayoutSampler();
         layout.slot = slot;
         layout.index = index;
         layout.texture = texture;
         o._recordSamplers.push(layout);
      }
      if(o._activeTextureSlot != slot){
         graphic.uniform1i(slot, index);
         graphic.activeTexture(graphic.TEXTURE0 + index);
         result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
         if(!result){
            return result;
         }
         o._activeTextureSlot = slot;
      }
      if(texture == null){
         graphic.bindTexture(graphic.TEXTURE_2D, null);
         result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
         return result;
      }
      var handle = texture._native;
      switch(texture.textureCd()){
         case EG3dTexture.Flat2d:{
            graphic.bindTexture(graphic.TEXTURE_2D, handle);
            result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
            if(!result){
               return result;
            }
            break;
         }
         case EG3dTexture.Cube:{
            graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
            result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
            if(!result){
               return result;
            }
            break;
         }
         default:{
            RLogger.fatal(o, null, "Unknown texture type.");
            break;
         }
      }
      return result;
   }
   MO.FWglContext_clear = function FWglContext_clear(red, green, blue, alpha, depth){
      var o = this;
      var graphic = o._native;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clearDepth(depth);
      graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_clearColor = function FWglContext_clearColor(red, green, blue, alpha){
      var o = this;
      var graphic = o._native;
      graphic.clearColor(red, green, blue, alpha);
      graphic.clear(graphic.COLOR_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_clearDepth = function FWglContext_clearDepth(depth){
      var o = this;
      var graphic = o._native;
      graphic.clearDepth(depth);
      graphic.clear(graphic.DEPTH_BUFFER_BIT);
      o._statistics._frameClearCount++;
   }
   MO.FWglContext_readPixels = function FWglContext_readPixels(left, top, width, height){
      var o = this;
      var graphic = o._native;
      var length = 4 * width * height;
      var data = new Uint8Array(length);
      graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
      return data;
   }
   MO.FWglContext_drawTriangles = function FWglContext_drawTriangles(indexBuffer, offset, count){
      var o = this;
      var graphic = o._native;
      var result = true;
      if(offset == null){
         offset = 0;
      }
      if(count == null){
         count = indexBuffer.count();
      }
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._native);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._native);
      if(!result){
          return result;
      }
      var strideCd = RWglUtility.convertIndexStride(graphic, indexBuffer.strideCd());
      if(indexBuffer.fillModeCd() == EG3dFillMode.Line){
         graphic.drawElements(graphic.LINES, count, strideCd, 2 * offset);
      }else{
         graphic.drawElements(graphic.TRIANGLES, count, strideCd, 2 * offset);
      }
      o._statistics._frameTriangleCount += count;
      o._statistics._frameDrawCount++;
      result = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", indexBuffer, offset, count);
      if(!result){
          return result;
      }
      graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
      result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", indexBuffer, offset, count);
      if(!result){
          return result;
      }
      return result;
   }
   MO.FWglContext_present = function FWglContext_present(){
   }
   MO.FWglContext_checkError = function FWglContext_checkError(code, message, parameter1){
      var o = this;
      if(!o._capability.optionDebug){
         return true;
      }
      if(!RRuntime.isDebug()){
         return true;
      }
      var graphic = o._native;
      var result = false;
      var error = null;
      var errorInfo = null;
      while(true){
         error = graphic.getError();
         if(error == graphic.NO_ERROR){
            result = true;
            break;
         }
         switch(error){
            case graphic.INVALID_OPERATION:
               errorInfo = "Invalid operation.";
               break;
            case graphic.INVALID_ENUM:
               errorInfo = "Invalid enum.";
               break;
            case graphic.INVALID_VALUE:
               errorInfo = "Invalid value.";
               break;
            case graphic.INVALID_FRAMEBUFFER_OPERATION:
               errorInfo = "Invalid paramebuffer opeartion.";
               break;
            case graphic.OUT_OF_MEMORY:
               errorInfo = "Out of memory.";
               break;
            default:
               errorInfo = "Unknown";
               break;
         }
      }
      if(!result){
         RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
      }
      return result;
   }
}
with(MO){
   MO.FWglCubeTexture = function FWglCubeTexture(o){
      o = RClass.inherits(this, o, FG3dCubeTexture);
      o._native    = null;
      o.setup      = FWglCubeTexture_setup;
      o.isValid    = FWglCubeTexture_isValid;
      o.makeMipmap = FWglCubeTexture_makeMipmap;
      o.upload     = FWglCubeTexture_upload;
      o.update     = FWglCubeTexture_update;
      o.dispose    = FWglCubeTexture_dispose;
      return o;
   }
   MO.FWglCubeTexture_setup = function FWglCubeTexture_setup(){
      var o = this;
      var g = o._graphicContext._native;
      o.__base.FG3dCubeTexture.setup.call(o);
      o._native = g.createTexture();
   }
   MO.FWglCubeTexture_isValid = function FWglCubeTexture_isValid(){
      var o = this;
      var g = o._graphicContext._native;
      return g.isTexture(o._native);
   }
   MO.FWglCubeTexture_makeMipmap = function FWglCubeTexture_makeMipmap(){
      var o = this;
      var g = o._graphicContext._native;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
      g.generateMipmap(g.TEXTURE_CUBE_MAP);
   }
   MO.FWglCubeTexture_upload = function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
      o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
      o.update();
   }
   MO.FWglCubeTexture_update = function FWglCubeTexture_update(){
      var o = this;
      o.__base.FG3dCubeTexture.update.call(o);
      var g = o._graphicContext._native;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
      var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
      if(c){
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
      }
      var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
      if(c){
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
      }
   }
   MO.FWglCubeTexture_dispose = function FWglCubeTexture_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._native;
      if(n){
         c._native.deleteTexture(n);
         o._native = null;
      }
      o.__base.FG3dCubeTexture.dispose.call(o);
   }
}
with(MO){
   MO.FWglFlatTexture = function FWglFlatTexture(o){
      o = RClass.inherits(this, o, FG3dFlatTexture);
      o._native    = null;
      o.setup      = FWglFlatTexture_setup;
      o.isValid    = FWglFlatTexture_isValid;
      o.texture    = FWglFlatTexture_texture;
      o.makeMipmap = FWglFlatTexture_makeMipmap;
      o.uploadData = FWglFlatTexture_uploadData;
      o.upload     = FWglFlatTexture_upload;
      o.update     = FWglFlatTexture_update;
      o.dispose    = FWglFlatTexture_dispose;
      return o;
   }
   MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
      var o = this;
      var g = o._graphicContext._native;
      o.__base.FG3dFlatTexture.setup.call(o);
      o._native = g.createTexture();
   }
   MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
      var o = this;
      var g = o._graphicContext._native;
      return g.isTexture(o._native);
   }
   MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
      return this;
   }
   MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
      var o = this;
      var g = o._graphicContext._native;
      g.bindTexture(g.TEXTURE_2D, o._native);
      g.generateMipmap(g.TEXTURE_2D);
   }
   MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(d, w, h){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var m = null;
      if(d.constructor == ArrayBuffer){
         m = new Uint8Array(d);
      }else if(d.constructor == Uint8Array){
         m = d;
      }else{
         throw new TError('Invalid data format.');
      }
      o.width = w;
      o.height = h;
      g.bindTexture(g.TEXTURE_2D, o._native);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, m);
      o._statusLoad = c.checkError("texImage2D", "Upload data failure.");
      o.update();
   }
   MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(data){
      var o = this;
      var c = o._graphicContext;
      var cp = c.capability();
      var g = c._native;
      var pixels = null;
      if((data.tagName == 'IMG') || (data.tagName == 'CANVAS')){
         pixels = data;
      }else if(RClass.isClass(data, FImage)){
         pixels = data.image();
      }else if(RClass.isClass(data, MCanvasObject)){
         pixels = data.htmlCanvas();
      }else{
         throw new TError('Invalid image format.');
      }
      g.bindTexture(g.TEXTURE_2D, o._native);
      if(o._optionFlipY){
         g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
      }
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, pixels);
      o.update();
      o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
   }
   MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
      var o = this;
      o.__base.FG3dFlatTexture.update.call(o);
      var g = o._graphicContext._native;
      g.bindTexture(g.TEXTURE_2D, o._native);
      var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
      if(c){
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, c);
      }
      var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
      if(c){
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, c);
      }
   }
   MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._native;
      if(n){
         c._native.deleteTexture(n);
         o._native = null;
      }
      o.__base.FG3dFlatTexture.dispose.call(o);
   }
}
with(MO){
   MO.FWglFragmentShader = function FWglFragmentShader(o){
      o = RClass.inherits(this, o, FG3dFragmentShader);
      o._native      = null;
      o.setup        = FWglFragmentShader_setup;
      o.targetSource = FWglFragmentShader_targetSource;
      o.upload       = FWglFragmentShader_upload;
      o.dispose      = FWglFragmentShader_dispose;
      return o;
   }
   MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
      var o = this;
      o.__base.FG3dFragmentShader.setup.call(o);
      var graphic = o._graphicContext._native;
      o._native = graphic.createShader(graphic.FRAGMENT_SHADER);
   }
   MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
      var o = this;
      var source = null;
      var context = o._graphicContext;
      var capability = context.capability();
      if(capability.optionShaderSource){
         source = context._nativeDebugShader.getTranslatedShaderSource(o._native);
      }else{
         source = o._source;
      }
      return source;
   }
   MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
      var o = this;
      var graphic = o._graphicContext._native;
      var shader = o._native;
      graphic.shaderSource(shader, source);
      graphic.compileShader(shader);
      var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
      if(!result){
         var info = graphic.getShaderInfoLog(shader);
         graphic.deleteShader(shader);
         o._native = null;
         throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
      }
      o._source = source;
      return true;
   }
   MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
      var o = this;
      var context = o._graphicContext;
      var shader = o._native;
      if(shader){
         context._native.deleteShader(shader);
         o._native = null;
      }
      o.__base.FG3dFragmentShader.dispose.call(o);
   }
}
with(MO){
   MO.FWglIndexBuffer = function FWglIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dIndexBuffer);
      o._native = null;
      o.setup   = FWglIndexBuffer_setup;
      o.isValid = FWglIndexBuffer_isValid;
      o.upload  = FWglIndexBuffer_upload;
      o.dispose = FWglIndexBuffer_dispose;
      return o;
   }
   MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
      var o = this;
      o.__base.FG3dIndexBuffer.setup.call(o);
      o._native = o._graphicContext._native.createBuffer();
   }
   MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
      var o = this;
      var g = o._graphicContext._native;
      return g.isBuffer(o._native);
   }
   MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(pd, pc){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      o._count = pc;
      var d = null;
      if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
         if(o._strideCd == EG3dIndexStride.Uint16){
            d = new Uint16Array(pd);
         }else if(o._strideCd == EG3dIndexStride.Uint32){
            d = new Uint32Array(pd);
         }else{
            throw new TError(o, 'Index stride is invalid.');
         }
      }else if(pd.constructor == Uint16Array){
         if(o._strideCd != EG3dIndexStride.Uint16){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else if(pd.constructor == Uint32Array){
         if(o._strideCd != EG3dIndexStride.Uint32){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else{
         throw new TError(o, 'Upload index data type is invalid. (value={1})', pd);
      }
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
      c.checkError('bindBuffer', 'Bind buffer failure.');
      g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
      c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
   }
   MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._native;
      if(n){
         c._native.deleteBuffer(n);
         o._native = null;
      }
      o.__base.FG3dIndexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FWglLayout = function FWglLayout(o){
      o = RClass.inherits(this, o, FG3dLayout);
      o._native  = null;
      o.setup    = FWglLayout_setup;
      o.bind     = FWglLayout_bind;
      o.unbind   = FWglLayout_unbind;
      o.active   = FWglLayout_active;
      o.deactive = FWglLayout_deactive;
      o.dispose  = FWglLayout_dispose;
      return o;
   }
   MO.FWglLayout_setup = function FWglLayout_setup(){
      var o = this;
      o.__base.FG3dLayout.setup.call(o);
      var c = o._graphicContext;
      o._native = c._nativeLayout.createVertexArrayOES();
   }
   MO.FWglLayout_bind = function FWglLayout_bind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }
   MO.FWglLayout_unbind = function FWglLayout_unbind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
   }
   MO.FWglLayout_active = function FWglLayout_active(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }
   MO.FWglLayout_deactive = function FWglLayout_deactive(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
   }
   MO.FWglLayout_dispose = function FWglLayout_dispose(){
      var o = this;
      var c = o._graphicContext;
      var layout = o._native;
      if(layout){
         c._nativeLayout.deleteVertexArrayOES(layout);
         o._native = null;
      }
      o.__base.FG3dLayout.dispose.call(o);
   }
}
with(MO){
   MO.FWglProgram = function FWglProgram(o){
      o = RClass.inherits(this, o, FG3dProgram);
      o._native        = null;
      o.setup          = FWglProgram_setup;
      o.vertexShader   = FWglProgram_vertexShader;
      o.fragmentShader = FWglProgram_fragmentShader;
      o.upload         = FWglProgram_upload;
      o.build          = FWglProgram_build;
      o.link           = FWglProgram_link;
      o.dispose        = FWglProgram_dispose;
      return o;
   }
   MO.FWglProgram_setup = function FWglProgram_setup(){
      var o = this;
      var c = g = o._graphicContext;
      o._native = c._native.createProgram();
   }
   MO.FWglProgram_vertexShader = function FWglProgram_vertexShader(){
      var o = this;
      var s = o._vertexShader;
      if(!s){
         s = o._vertexShader = RClass.create(FWglVertexShader);
         s.linkGraphicContext(o);
         s.setup();
      }
      return s;
   }
   MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
      var o = this;
      var s = o._fragmentShader;
      if(!s){
         s = o._fragmentShader = RClass.create(FWglFragmentShader);
         s.linkGraphicContext(o);
         s.setup();
      }
      return s;
   }
   MO.FWglProgram_upload = function FWglProgram_upload(t, s){
      var o = this;
      if(t == EG3dShader.Vertex){
         o.vertexShader().upload(s);
      }else if(t == EG3dShader.Fragment){
         o.fragmentShader().upload(s);
      }else{
         throw new Error('Unknown type');
      }
   }
   MO.FWglProgram_build = function FWglProgram_build(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var pn = o._native;
      var vs = o.vertexShader();
      g.attachShader(pn, vs._native);
      var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
      if(!r){
         return r;
      }
      var fs = o.fragmentShader();
      g.attachShader(pn, fs._native);
      var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
      if(!r){
         return r;
      }
      if(o.hasAttribute()){
         var as = o.attributes();
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            var a = as.value(n);
            var an = a.name();
            g.bindAttribLocation(pn, n, an);
            r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
            if(!r){
               return r;
            }
         }
      }
   }
   MO.FWglProgram_link = function FWglProgram_link(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var r = false;
      var pn = o._native;
      g.linkProgram(pn);
      var pr = g.getProgramParameter(pn, g.LINK_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
         RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
         g.deleteProgram(o._native);
         o._native = null;
         return false;
      }
      g.validateProgram(pn);
      var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
      }
      g.finish();
      r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
      if(!r){
         return r;
      }
      if(o.hasParameter()){
         var pc = o._parameters.count();
         for(var n = 0; n < pc; n++){
            var p = o._parameters.value(n);
            var i = g.getUniformLocation(pn, p.name());
            r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != null){
               p._statusUsed = true;
            }
         }
      }
      if(o.hasAttribute()){
         var pc = o._attributes.count();
         for(var n = 0; n < pc; n++){
            var p = o._attributes.value(n);
            var i = g.getAttribLocation(pn, p.name());
            r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != -1){
               p._statusUsed = true;
            }
         }
      }
      if(o.hasSampler()){
         var pc = o._samplers.count();
         for(var n = 0; n < pc; n++){
            var p = o._samplers.value(n);
            var i = g.getUniformLocation(pn, p.name());
            r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != null){
               p._statusUsed = true;
            }
         }
         var si = 0;
         for(var n = 0; n < pc; n++){
            var p = o._samplers.value(n);
            if(p._statusUsed){
               p._index = si++;
            }
         }
      }
      return r;
   }
   MO.FWglProgram_dispose = function FWglProgram_dispose(){
      var o = this;
      var context = o._graphicContext;
      var handle = o._native;
      if(handle){
         context._native.deleteProgram(handle);
         o._native = null;
      }
      o.__base.FG3dProgram.dispose.call(o);
   }
}
with(MO){
   MO.FWglRenderTarget = function FWglRenderTarget(o){
      o = RClass.inherits(this, o, FG3dRenderTarget);
      o._optionDepth = true;
      o._native      = null;
      o._nativeDepth = null;
      o.setup        = FWglRenderTarget_setup;
      o.build        = FWglRenderTarget_build;
      o.dispose      = FWglRenderTarget_dispose;
      return o;
   }
   MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
      var o = this;
      o.__base.FG3dRenderTarget.setup.call(o);
      var c = o._graphicContext;
      var g = c._native;
      o._native = g.createFramebuffer();
      return c.checkError('createFramebuffer', 'Create frame buffer failure.');
   }
   MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
      var o = this;
      var s = o._size;
      var c = o._graphicContext;
      var g = c._native;
      g.bindFramebuffer(g.FRAMEBUFFER, o._native);
      var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
      if(!r){
         return r;
      }
      if(o._optionDepth){
         var nd = o._nativeDepth = g.createRenderbuffer();
         var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
         if(!r){
            return r;
         }
         g.bindRenderbuffer(g.RENDERBUFFER, nd);
         var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
         if(!r){
            return r;
         }
         g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, s.width, s.height);
         var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
         if(!r){
            return r;
         }
         g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
         var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
         if(!r){
            return r;
         }
      }
      var ts = o._textures;
      var tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         g.bindTexture(g.TEXTURE_2D, t._native);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
         var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
         if(!r){
            return r;
         }
         g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._native, 0);
         var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
         if(!r){
            return r;
         }
      }
   }
   MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._nativeDepth;
      if(n){
         c._native.deleteRenderbuffer(n);
         o._nativeDepth = null;
      }
      var n = o._native;
      if(n){
         c._native.deleteFramebuffer(n);
         o._native = null;
      }
      o.__base.FG3dRenderTarget.dispose.call(o);
   }
}
with(MO){
   MO.FWglVertexBuffer = function FWglVertexBuffer(o){
      o = RClass.inherits(this, o, FG3dVertexBuffer);
      o._native = null;
      o.setup   = FWglVertexBuffer_setup;
      o.isValid = FWglVertexBuffer_isValid;
      o.upload  = FWglVertexBuffer_upload;
      o.dispose = FWglVertexBuffer_dispose;
      return o;
   }
   MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
      var o = this;
      o.__base.FG3dVertexBuffer.setup.call(o);
      var graphic = o._graphicContext._native;
      o._native = graphic.createBuffer();
   }
   MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
      var o = this;
      var graphic = o._graphicContext._native;
      return graphic.isBuffer(o._native);
   }
   MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count){
      var o = this;
      var context = o._graphicContext;
      var graphics = context._native;
      o._stride = stride;
      o._count = count;
      var arrays = null;
      if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
         switch(o._formatCd){
            case EG3dAttributeFormat.Float1:
            case EG3dAttributeFormat.Float2:
            case EG3dAttributeFormat.Float3:
            case EG3dAttributeFormat.Float4:
               arrays = new Float32Array(data);
               break;
            case EG3dAttributeFormat.Byte4:
            case EG3dAttributeFormat.Byte4Normal:
               arrays = new Uint8Array(data);
               break;
            default:
               throw new TError(o, 'Unknown data type.');
         }
      }else if(data.constructor == Uint8Array){
         arrays = data;
      }else if(data.constructor == Float32Array){
         arrays = data;
      }else{
         throw new TError(o, 'Upload vertex data type is invalid. (data={1})', data);
      }
      graphics.bindBuffer(graphics.ARRAY_BUFFER, o._native);
      context.checkError('bindBuffer', 'Bindbuffer');
      graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
      context.checkError('bufferData', 'bufferData');
   }
   MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
      var o = this;
      var context = o._graphicContext;
      var buffer = o._native;
      if(buffer){
         context._native.deleteBuffer(buffer);
         o._native = null;
      }
      o.__base.FG3dVertexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FWglVertexShader = function FWglVertexShader(o){
      o = RClass.inherits(this, o, FG3dVertexShader);
      o._native      = null;
      o.setup        = FWglVertexShader_setup;
      o.targetSource = FWglVertexShader_targetSource;
      o.upload       = FWglVertexShader_upload;
      o.dispose      = FWglVertexShader_dispose;
      return o;
   }
   MO.FWglVertexShader_setup = function FWglVertexShader_setup(){
      var o = this;
      o.__base.FG3dVertexShader.setup.call(o);
      var graphic = o._graphicContext._native;
      o._native = graphic.createShader(graphic.VERTEX_SHADER);
   }
   MO.FWglVertexShader_targetSource = function FWglVertexShader_targetSource(){
      var o = this;
      var source = null;
      var context = o._graphicContext;
      var capability = context.capability();
      if(capability.optionShaderSource){
         source = context._nativeDebugShader.getTranslatedShaderSource(o._native);
      }else{
         source = o._source;
      }
      return source;
   }
   MO.FWglVertexShader_upload = function FWglVertexShader_upload(source){
      var o = this;
      var graphic = o._graphicContext._native;
      var shader = o._native;
      graphic.shaderSource(shader, source);
      graphic.compileShader(shader);
      var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
      if(!result){
         var info = graphic.getShaderInfoLog(shader);
         graphic.deleteShader(shader);
         o._native = null;
         throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
      }
      o._source = source;
      return true;
   }
   MO.FWglVertexShader_dispose = function FWglVertexShader_dispose(){
      var o = this;
      var context = o._graphicContext;
      var shader = o._native;
      if(shader){
         context._native.deleteShader(shader);
         o._native = null;
      }
      o.__base.FG3dVertexShader.dispose.call(o);
   }
}
with(MO){
   MO.RWglUtility = function RWglUtility(){
      var o = this;
      o.convertFillMode      = RWglUtility_convertFillMode;
      o.convertCullMode      = RWglUtility_convertCullMode;
      o.convertDepthMode     = RWglUtility_convertDepthMode;
      o.convertBlendFactors  = RWglUtility_convertBlendFactors;
      o.convertIndexStride   = RWglUtility_convertIndexStride;
      o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
      return o;
   }
   MO.RWglUtility_convertFillMode = function RWglUtility_convertFillMode(g, v){
      switch(v){
         case EG3dFillMode.Point:
            return g.POINT;
         case EG3dFillMode.Line:
            return g.LINE;
         case EG3dFillMode.Face:
            return g.FILL;
      }
      throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
   }
   MO.RWglUtility_convertCullMode = function RWglUtility_convertCullMode(g, v){
      switch(v){
         case EG3dCullMode.Front:
            return g.FRONT;
         case EG3dCullMode.Back:
            return g.BACK;
         case EG3dCullMode.Both:
            return g.FRONT_AND_BACK;
      }
      throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
   }
   MO.RWglUtility_convertDepthMode = function RWglUtility_convertDepthMode(g, v){
      switch(v){
         case EG3dDepthMode.Equal:
            return g.EQUAL;
         case EG3dDepthMode.NotEqual:
            return g.NOTEQUAL;
         case EG3dDepthMode.Less:
            return g.LESS;
         case EG3dDepthMode.LessEqual:
            return g.LEQUAL;
         case EG3dDepthMode.Greater:
            return g.GREATER;
         case EG3dDepthMode.GreaterEqual:
            return g.GEQUAL;
         case EG3dDepthMode.Always:
            return g.ALWAYS;
      }
      throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
   }
   MO.RWglUtility_convertBlendFactors = function RWglUtility_convertBlendFactors(g, v){
      switch(v){
         case EG3dBlendMode.Zero:
            return g.ZERO;
         case EG3dBlendMode.One:
            return g.ONE;
         case EG3dBlendMode.SrcColor:
            return g.SRC_COLOR;
         case EG3dBlendMode.OneMinusSrcColor:
            return g.ONE_MINUS_SRC_COLOR;
         case EG3dBlendMode.DstColor:
            return g.DST_COLOR;
         case EG3dBlendMode.OneMinusDstColor:
            return g.ONE_MINUS_DST_COLOR;
         case EG3dBlendMode.SrcAlpha:
            return g.SRC_ALPHA;
         case EG3dBlendMode.OneMinusSrcAlpha:
            return g.ONE_MINUS_SRC_ALPHA;
         case EG3dBlendMode.DstAlpha:
            return g.DST_ALPHA;
         case EG3dBlendMode.OneMinusDstAlpha:
            return g.ONE_MINUS_DST_ALPHA;
         case EG3dBlendMode.SrcAlphaSaturate:
            return g.SRC_ALPHA_SATURATE;
      }
      throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
   }
   MO.RWglUtility_convertIndexStride = function RWglUtility_convertIndexStride(g, v){
      switch(v){
         case EG3dIndexStride.Uint16:
            return g.UNSIGNED_SHORT;
         case EG3dIndexStride.Uint32:
            return g.UNSIGNED_INT;
      }
      throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
   }
   MO.RWglUtility_convertSamplerFilter = function RWglUtility_convertSamplerFilter(g, v){
      switch(v){
         case EG3dSamplerFilter.Unknown:
            return 0;
         case EG3dSamplerFilter.Nearest:
            return g.NEAREST;
         case EG3dSamplerFilter.Linear:
            return g.LINEAR;
         case EG3dSamplerFilter.Repeat:
            return g.REPEAT;
         case EG3dSamplerFilter.ClampToEdge:
            return g.CLAMP_TO_EDGE;
         case EG3dSamplerFilter.ClampToBorder:
            return g.CLAMP_TO_BORDER;
      }
      throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
   }
   MO.RWglUtility = new RWglUtility();
}
