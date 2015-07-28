MO.FEaiCityEffect = function FEaiCityEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.city';
   o.drawRenderable = MO.FEaiCityEffect_drawRenderable;
   return o;
}
MO.FEaiCityEffect_drawRenderable = function FEaiCityEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
   program.setParameter('fc_ambient_color', info.ambientColor);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiCityRangeEffect = function FEaiCityRangeEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.city.range';
   o.drawRenderable = MO.FEaiCityRangeEffect_drawRenderable;
   return o;
}
MO.FEaiCityRangeEffect_drawRenderable = function FEaiCityRangeEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._image                = null;
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.onImageLoad           = MO.FEaiCitysRangeRenderable_onImageLoad;
   o.construct             = MO.FEaiCitysRangeRenderable_construct;
   o.testReady             = MO.FEaiCitysRangeRenderable_testReady;
   o.setup                 = MO.FEaiCitysRangeRenderable_setup;
   o.upload                = MO.FEaiCitysRangeRenderable_upload;
   o.dispose               = MO.FEaiCitysRangeRenderable_dispose;
   return o;
}
MO.FEaiCitysRangeRenderable_onImageLoad = function FEaiCitysRangeRenderable_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FEaiCitysRangeRenderable_testReady = function FEaiCitysRangeRenderable_testReady(){
   return this._ready;
}
MO.FEaiCitysRangeRenderable_setup = function FEaiCitysRangeRenderable_setup(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var position = 0;
   var data = new Float32Array(2 * vertexCount);
   for(var i = 0; i < count; i++){
      data[position++] = 0;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 1;
      data[position++] = 0;
      data[position++] = 0;
      data[position++] = 0;
   }
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexCount = 3 * 2 * count;
   var position = 0;
   var data = new Uint16Array(indexCount);
   for(var i = 0; i < count; i++){
      var index = 4 * i;
      data[position++] = index + 0;
      data[position++] = index + 1;
      data[position++] = index + 2;
      data[position++] = index + 0;
      data[position++] = index + 2;
      data[position++] = index + 3;
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, indexCount);
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'eai.citys.range';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   o._material._textures = o._textures;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/dot.png');
   o._ready = false;
}
MO.FEaiCitysRangeRenderable_upload = function FEaiCitysRangeRenderable_upload(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var total = citys.count();
   var count = 0;
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         count++;
      }
   }
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPosition = 0;
   var vertexData = new Float32Array(3 * vertexCount);
   var colorPosition = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         var location = city.location();
         var range = city.range();
         var size = city.size();
         var width = size.width / 2;
         var height = size.height / 2;
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         vertexData[vertexPosition++] = location.x - range;
         vertexData[vertexPosition++] = location.y + range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + range;
         vertexData[vertexPosition++] = location.y + range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + range;
         vertexData[vertexPosition++] = location.y - range;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x - range;
         vertexData[vertexPosition++] = location.y - range;
         vertexData[vertexPosition++] = z;
         var color = city.rangeColor();
         var red = parseInt(color.red * 255);
         var green = parseInt(color.green * 255);
         var blue = parseInt(color.blue * 255);
         var alpha = parseInt(color.alpha * 255);
         for(var v = 0; v < 4; v++){
            colorData[colorPosition++] = red;
            colorData[colorPosition++] = green;
            colorData[colorPosition++] = blue;
            colorData[colorPosition++] = alpha;
         }
      }
   }
   o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
   o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
   o._indexBuffer.setCount(3 * 2 * count);
}
MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
   var o = this;
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._image                = null;
   o._levelCoordLeft       = null;
   o._levelCoordRight      = null;
   o._levelScale           = null;
   o._citys                = MO.Class.register(o, new MO.AGetter('_citys'));
   o._level                = MO.Class.register(o, new MO.AGetSet('_level'));
   o._citySize             = MO.Class.register(o, new MO.AGetter('_citySize'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.onImageLoad           = MO.FEaiCitysRenderable_onImageLoad;
   o.construct             = MO.FEaiCitysRenderable_construct;
   o.testReady             = MO.FEaiCitysRenderable_testReady;
   o.setup                 = MO.FEaiCitysRenderable_setup;
   o.upload                = MO.FEaiCitysRenderable_upload;
   o.dispose               = MO.FEaiCitysRenderable_dispose;
   return o;
}
MO.FEaiCitysRenderable_onImageLoad = function FEaiCitysRenderable_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._citys = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
   var data = o._levelCoordLeft = new Object();
   data[1] = 0.0;
   data[2] = 0.25;
   data[3] = 0.5;
   data[4] = 0.75;
   var data = o._levelCoordRight = new Object();
   data[1] = 0.25;
   data[2] = 0.5;
   data[3] = 0.75;
   data[4] = 1.0;
   var data = o._levelScale = new Object();
   data[1] = 0.7;
   data[2] = 0.5;
   data[3] = 0.4;
   data[4] = 0.2;
}
MO.FEaiCitysRenderable_testReady = function FEaiCitysRenderable_testReady(){
   return this._ready;
}
MO.FEaiCitysRenderable_setup = function FEaiCitysRenderable_setup(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var count = citys.count();
   var vertexCount = o._vertexCount = 4 * count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexCount = 3 * 2 * count;
   var position = 0;
   var data = new Uint16Array(indexCount);
   for(var i = 0; i < count; i++){
      var index = 4 * i;
      data[position++] = index + 0;
      data[position++] = index + 1;
      data[position++] = index + 2;
      data[position++] = index + 0;
      data[position++] = index + 2;
      data[position++] = index + 3;
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, indexCount);
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'eai.citys';
   materialInfo.optionAlpha = true;
   materialInfo.optionDepth = false;
   materialInfo.ambientColor.setHex('#FFFFFF');
   o._material._textures = o._textures;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/citys.png');
   o._ready = false;
}
MO.FEaiCitysRenderable_upload = function FEaiCitysRenderable_upload(){
   var o = this;
   var context = o._graphicContext;
   var citys = o._citys;
   var total = citys.count();
   var count = 0;
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         count++;
      }
   }
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPosition = 0;
   var vertexData = new Float32Array(3 * vertexCount);
   var coordPosition = 0;
   var coordData = new Float32Array(2 * vertexCount);
   var colorPosition = 0;
   var colorData = new Uint8Array(4 * vertexCount);
   for(var i = 0; i < total; i++){
      var city = citys.at(i);
      if(city.visible()){
         var range = city.range() * 255;
         var location = city.location();
         var level = city.data().level();
         if((level != 1) && (level != 2) && (level != 3) && (level != 4)){
            throw new TError('Invalid level.');
         }
         var provinceEntity = city.provinceEntity();
         var z = 0;
         if(provinceEntity){
            z = provinceEntity.currentZ();
         }
         var coordLeft = o._levelCoordLeft[level];
         var coordRight = o._levelCoordRight[level];
         var scale = o._levelScale[level];
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y + scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x + scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         vertexData[vertexPosition++] = location.x - scale;
         vertexData[vertexPosition++] = location.y - scale;
         vertexData[vertexPosition++] = z;
         coordData[coordPosition++] = coordLeft;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 1;
         coordData[coordPosition++] = coordRight;
         coordData[coordPosition++] = 0;
         coordData[coordPosition++] = coordLeft;
         coordData[coordPosition++] = 0;
         var color = city.color();
         var red = parseInt(color.red * 255);
         var green = parseInt(color.green * 255);
         var blue = parseInt(color.blue * 255);
         var alpha = parseInt(color.alpha * 255);
         for(var v = 0; v < 4; v++){
            colorData[colorPosition++] = red;
            colorData[colorPosition++] = green;
            colorData[colorPosition++] = blue;
            colorData[colorPosition++] = alpha;
         }
      }
   }
   o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
   o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
   o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
   o._indexBuffer.setCount(3 * 2 * count);
}
MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
   var o = this;
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._vertexColorBuffer = MO.Lang.Object.dispose(o._vertexColorBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FEaiMapFaceEffect = function FEaiMapFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.map.face';
   o.drawRenderable = MO.FEaiMapFaceEffect_drawRenderable;
   return o;
}
MO.FEaiMapFaceEffect_drawRenderable = function FEaiMapFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = 16 * i;
      var mergeRenderable = mergeRenderables.at(i);
      var matrix = mergeRenderable.matrix();
      var color = mergeRenderable.color();
      matrix.writeData(data, index);
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      data[index + 15] = color.alpha;
   }
   program.setParameter('vc_data', data);
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
MO.FEaiWorldFaceEffect = function FEaiWorldFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'eai.world.face';
   o.drawRenderable = MO.FEaiWorldFaceEffect_drawRenderable;
   return o;
}
MO.FEaiWorldFaceEffect_drawRenderable = function FEaiWorldFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = 16 * i;
      var mergeRenderable = mergeRenderables.at(i);
      var matrix = mergeRenderable.matrix();
      var color = mergeRenderable.color();
      matrix.writeData(data, index);
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      data[index + 15] = color.alpha;
   }
   program.setParameter('vc_data', data);
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   o.bindAttributes(renderable);
   program.setSampler('fs_diffuse', renderable.material().textures().get('diffuse'));
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
