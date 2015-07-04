with(MO){
   MO.FEaiBoundaryData = function FEaiBoundaryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._positionCount = RClass.register(o, new AGetter('_positionCount'));
      o._positions     = RClass.register(o, new AGetter('_positions'));
      o._indexes       = RClass.register(o, new AGetter('_indexes'));
      o.construct      = FEaiBoundaryData_construct;
      o.unserialize    = FEaiBoundaryData_unserialize;
      o.dispose        = FEaiBoundaryData_dispose;
      return o;
   }
   MO.FEaiBoundaryData_construct = function FEaiBoundaryData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiBoundaryData_unserialize = function FEaiBoundaryData_unserialize(input){
      var o = this;
      var index = 0;
      var vertexCount = o._positionCount = input.readInt32();
      o._positions = new Float32Array(2 * vertexCount);
      for(var i = 0; i < vertexCount; i++){
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
      }
      var indexCount = input.readInt32();
      o._indexes = new Uint16Array(indexCount);
      for(var i = 0; i < indexCount; i++){
         o._indexes[i] = input.readUint16();
      }
   }
   MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
      var o = this;
      o._positions = null;
      o._indexes = null;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityEffect = function FEaiCityEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'eai.city';
      o.drawRenderable = FEaiCityEffect_drawRenderable;
      return o;
   }
   MO.FEaiCityEffect_drawRenderable = function FEaiCityEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
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
}
with(MO){
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._visible                = RClass.register(o, new AGetter('_visible'), false);
      o._location               = RClass.register(o, new AGetter('_location'));
      o._size                   = RClass.register(o, new AGetter('_size'));
      o._color                  = RClass.register(o, new AGetter('_color'));
      o._range                  = RClass.register(o, new AGetter('_range'), 1);
      o._rangeColor             = RClass.register(o, new AGetter('_rangeColor'));
      o._investmentCount        = 0;
      o._investmentTotal        = RClass.register(o, new AGetSet('_investmentTotal'));
      o._investmentLevelTotal   = 20000;
      o._investmentLevel        = 0;
      o._investmentRange        = 1;
      o._investmentRate         = 100;
      o._investmentDirection    = 1;
      o._stage                  = RClass.register(o, new AGetSet('_stage'));
      o._renderable             = RClass.register(o, new AGetSet('_renderable'));
      o._data                   = RClass.register(o, new AGetSet('_data'));
      o._inputPoint             = null;
      o._outputPoint            = null;
      o.construct               = FEaiCityEntity_construct;
      o.calculateScreenPosition = FEaiCityEntity_calculateScreenPosition;
      o.build                   = FEaiCityEntity_build;
      o.addInvestmentTotal      = FEaiCityEntity_addInvestmentTotal;
      o.update                  = FEaiCityEntity_update;
      o.process                 = FEaiCityEntity_process;
      o.dispose                 = FEaiCityEntity_dispose;
      return o;
   }
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(0, 0, 0, 0);
      o._rangeColor = new SColor4(0, 0, 0, 0);
      o._inputPoint = new SPoint3();
      o._outputPoint = new SPoint3();
   }
   MO.FEaiCityEntity_calculateScreenPosition = function FEaiCityEntity_calculateScreenPosition(){
      var o = this;
      var region = o._stage.region();
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var mMatrix = o._renderable.matrix();
      var matrix = MO.RMath.matrix;
      matrix.identity();
      matrix.append(mMatrix);
      matrix.append(vpMatrix);
      o._inputPoint.set(o._location.x, o._location.y, 0);
      matrix.transformPoint3(o._inputPoint, o._outputPoint);
      return o._outputPoint;
   }
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(investmentTotal){
      var o = this;
      o._investmentCount++;
      o._investmentTotal += investmentTotal;
      o._investmentLevel = o._investmentLevelTotal;
      var rateConsole = RConsole.find(FEaiResourceConsole).rateConsole();
      var color = rateConsole.find(EEaiRate.Line).findRate(o._investmentTotal / 200000);
      o._color.set(1, 1, 1, 1);
      o._range = RFloat.toRange(Math.log(investmentTotal) / 5, 0, 6);
      o._rangeColor.setInteger(color);
      o._rangeColor.alpha = 1;
      o._investmentRange = o._range;
      o._investmentRate = 100;
      o._visible = true;
   }
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var range = 1;
      o._visible = true;
      o._color.set(1, 1, 1, 1);
      o._rangeColor.set(1, 1, 1, 1);
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 4;
         var color = rateInfo.findRate(rate);
         range = rate * 6;
         rate = RFloat.toRange(rate, 0, 1);
         o._rangeColor.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 1);
      }else{
         o._rangeColor.set(0, 0, 0, 0);
      }
      o._range = RFloat.toRange(Math.sqrt(range), 1, 6);
   }
   MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
      var o = this;
      if(o._investmentLevel > 0){
         var rate = o._investmentLevel / o._investmentLevelTotal;
         if(o._investmentRate < 0){
            o._investmentRate = 0;
            o._investmentDirection = 4;
         }else if(o._investmentRate > 100){
            o._investmentRate = 100;
            o._investmentDirection = -2;
         }
         o._color.alpha = rate;
         o._rangeColor.alpha = rate;
         o._investmentLevel--;
         if(o._investmentLevel == 0){
            o._visible = false;
         }
         return true;
      }
      return false;
   }
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
      o._rangeColor = RObject.dispose(o._rangeColor);
      o._inputPoint = RObject.dispose(o._inputPoint);
      o._outputPoint = RObject.dispose(o._outputPoint);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiCityEntityConsole = function FEaiCityEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   o._citys     = MO.Class.register(o, new MO.AGetter('_citys'));
   o.construct  = MO.FEaiCityEntityConsole_construct;
   o.findByCode = MO.FEaiCityEntityConsole_findByCode;
   o.findByCard = MO.FEaiCityEntityConsole_findByCard;
   o.push       = MO.FEaiCityEntityConsole_push;
   o.dispose    = MO.FEaiCityEntityConsole_dispose;
   return o;
}
MO.FEaiCityEntityConsole_construct = function FEaiCityEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._citys = MO.TDictionary();
}
MO.FEaiCityEntityConsole_findByCode = function FEaiCityEntityConsole_findByCode(code){
   return this._citys.get(code);
}
MO.FEaiCityEntityConsole_findByCard = function FEaiCityEntityConsole_findByCard(card){
   var o = this;
   if (card.length != 4) {
      return null;
   }
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card);
   if (cityEntity) {
      return cityEntity;
   }
   var cityEntities = o._citys;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if (cityEntity) {
      return cityEntity;
   }
   return null;
}
MO.FEaiCityEntityConsole_push = function FEaiCityEntityConsole_push(entity){
   this._citys.set(entity.data().code(), entity);
}
MO.FEaiCityEntityConsole_dispose = function FEaiCityEntityConsole_dispose(monitor){
   var o = this;
   o._citys = RObject.dispose(o._citys);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FEaiCityRangeEffect = function FEaiCityRangeEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'eai.city.range';
      o.drawRenderable = FEaiCityRangeEffect_drawRenderable;
      return o;
   }
   MO.FEaiCityRangeEffect_drawRenderable = function FEaiCityRangeEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
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
}
with(MO){
   MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.onImageLoad           = FEaiCitysRangeRenderable_onImageLoad;
      o.construct             = FEaiCitysRangeRenderable_construct;
      o.testReady             = FEaiCitysRangeRenderable_testReady;
      o.setup                 = FEaiCitysRangeRenderable_setup;
      o.upload                = FEaiCitysRangeRenderable_upload;
      o.loadUrl               = FEaiCitysRangeRenderable_loadUrl;
      o.dispose               = FEaiCitysRangeRenderable_dispose;
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
      o._citys = new TObjects();
      o._material = RClass.create(FE3dMaterial);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, vertexCount);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
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
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'eai.citys.range';
      materialInfo.optionAlpha = true;
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/dot.png');
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
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y + range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - range;
            vertexData[vertexPosition++] = location.y - range;
            vertexData[vertexPosition++] = 0;
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
   MO.FEaiCitysRangeRenderable_loadUrl = function FEaiCitysRangeRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRangeRenderable_dispose = function FEaiCitysRangeRenderable_dispose(){
      var o = this;
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCitysRenderable = function FEaiCitysRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._levelCoordLeft       = null;
      o._levelCoordRight      = null;
      o._levelScale           = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._level                = RClass.register(o, new AGetSet('_level'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.onImageLoad           = FEaiCitysRenderable_onImageLoad;
      o.construct             = FEaiCitysRenderable_construct;
      o.testReady             = FEaiCitysRenderable_testReady;
      o.setup                 = FEaiCitysRenderable_setup;
      o.upload                = FEaiCitysRenderable_upload;
      o.loadUrl               = FEaiCitysRenderable_loadUrl;
      o.dispose               = FEaiCitysRenderable_dispose;
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
      o._citys = new TObjects();
      o._material = RClass.create(FE3dMaterial);
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
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
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
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'eai.citys';
      materialInfo.optionAlpha = true;
      materialInfo.ambientColor.setHex('#FFFFFF');
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/citys.png');
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
         var range = city._range * 255;
         if(city.visible()){
            var location = city.location();
            var level = city.data().level();
            if((level != 1) && (level != 2) && (level != 3) && (level != 4)){
               throw new TError('Invalid level.');
            }
            var coordLeft = o._levelCoordLeft[level];
            var coordRight = o._levelCoordRight[level];
            var scale = o._levelScale[level];
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y + scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - scale;
            vertexData[vertexPosition++] = location.y - scale;
            vertexData[vertexPosition++] = 0;
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
   MO.FEaiCitysRenderable_loadUrl = function FEaiCitysRenderable_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiCitysRenderable_dispose = function FEaiCitysRenderable_dispose(){
      var o = this;
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._vertexColorBuffer = RObject.dispose(o._vertexColorBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryData = function FEaiCountryData(o){
      o = RClass.inherits(this, o, FObject, MListener);
      o._listenersLoad = RClass.register(o, new AListener('_listenersLoad', EEvent.Load));
      o._provinces     = RClass.register(o, new AGetter('_provinces'));
      o.onLoaded       = FEaiCountryData_onLoaded;
      o.construct      = FEaiCountryData_construct;
      o.unserialize    = FEaiCountryData_unserialize;
      o.load           = FEaiCountryData_load;
      o.dispose        = FEaiCountryData_dispose;
      return o;
   }
   MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._provinces = new TDictionary();
   }
   MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
      var o = this;
      var data = event.outputData();
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(data);
      o.unserialize(view);
      view.dispose();
   }
   MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
      var o = this;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceData);
         province.unserialize(input);
         o._provinces.set(province.name(), province);
      }
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FEaiCountryData_load = function FEaiCountryData_load(){
      var o = this;
      var url = '/script/ars/eai/country.dat';
      var connection = RConsole.find(FHttpConsole).send(url);
      connection.addLoadListener(o, o.onLoaded);
   }
   MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._cameraDirection         = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay              = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration            = RClass.register(o, new AGetSet('_riseDuration'), 5000);
      o._riseDistance            = RClass.register(o, new AGetSet('_riseDistance'), 1000);
      o._fallDuration            = RClass.register(o, new AGetSet('_fallDuration'), 200);
      o._fallDistance            = RClass.register(o, new AGetSet('_fallDistance'), 3);
      o._blockInterval           = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight     = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 3);
      o._mouseMoveCheckInterval  = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration      = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
      o._playing = false;
      o._lastTick = 0;
      o._interval = 10;
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o.setup                    = FEaiCountryEntity_setup;
      o.start                    = FEaiCountryEntity_start;
      o.process                  = FEaiCountryEntity_process;
      o.introAnime               = FEaiCountryEntity_introAnime;
      o.onMouseMove              = FEaiCountryEntity_onMouseMove;
      o.onMouseDown              = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime       = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch      = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime          = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup(provinceEntities) {
      var o = this;
      o._provinceEntities = provinceEntities;
      for (var i = 0; i < o._provinceEntities.count(); i++) {
         var fr = o._provinceEntities.at(i).faceRenderable();
         var br = o._provinceEntities.at(i).borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         frm.tz = o.riseDistance();
         frm.updateForce();
         brm.tz = o.riseDistance();
         brm.updateForce();
      }
      o._startTime = MO.Timer.current();
   }
   MO.FEaiCountryEntity_start = function FEaiCountryEntity_start(){
      this._startTime = MO.Timer.current();
   }
   MO.FEaiCountryEntity_process = function FEaiCountryEntity_process() {
      var o = this;
      if (!o._provinceEntities) {
         return;
      }
      o.introAnime();
   }
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime() {
      var o = this;
      var now = MO.Timer.current();
      var timePassed = now - o._startTime;
      if (timePassed < o.startDelay()) {
         return;
      }
      else {
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * o._provinceEntities.count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < o._provinceEntities.count() && i < idxCap; i++) {
         var fr = o._provinceEntities.at(i).faceRenderable();
         var br = o._provinceEntities.at(i).borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
            risePercentage = 1;
            fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
            if (fallPercentage > 1) {
               fallPercentage = 1;
            }
         }
         frm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         frm.updateForce();
         brm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         brm.updateForce();
      }
   }
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
   }
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
   }
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
   }
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
   }
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
   }
}
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o.construct        = MO.FEaiEntityConsole_construct;
   o.dispose          = MO.FEaiEntityConsole_dispose;
   return o;
}
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._cityConsole = MO.RClass.create(MO.FEaiCityEntityConsole);
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceEntityConsole);
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._countryEntity        = MO.Class.register(o, new MO.AGetter('_countryEntity'));
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   o.construct             = MO.FEaiMapEntity_construct;
   o.findProvinceByCard    = MO.FEaiMapEntity_findProvinceByCard;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.upload                = MO.FEaiMapEntity_upload;
   o.process               = MO.FEaiMapEntity_process;
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._countryEntity = MO.Class.create(MO.FEaiCountryEntity);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiMapEntity_findProvinceByCard = function FEaiMapEntity_findProvinceByCard(code){
   var o = this;
   var provinceEntity = o._provinceEntities.get(code);
   return provinceEntity;
}
MO.FEaiMapEntity_findCityByCard = function FEaiMapEntity_findCityByCard(card){
   var o = this;
   if(card.length != 4){
      return null;
   }
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card);
   if(cityEntity){
      return cityEntity;
   }
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if(cityEntity){
      return cityEntity;
   }
   return null;
}
MO.FEaiMapEntity_upload = function FEaiMapEntity_upload(){
   var o = this;
   o._citysRenderable.upload();
   o._citysRangeRenderable.upload();
}
MO.FEaiMapEntity_process = function FEaiMapEntity_process(card){
   var o = this;
   var changed = false;
   var provinceEntities = o._provinceEntities;
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      if(provinceEntity.process()){
         changed = true;
      }
   }
   var changed = false;
   var cityEntities = o._cityEntities;
   var count = cityEntities.count();
   for (var i = 0; i < count; i++) {
      var cityEntity = cityEntities.at(i);
      if(cityEntity.process()){
         changed = true;
      }
   }
   if(changed){
      o.upload();
   }
}
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._countryEntity = MO.RObject.dispose(o._countryEntity);
   o._provinceEntities = MO.RObject.dispose(o._provinceEntities);
   o._cityEntities = MO.RObject.dispose(o._cityEntities);
   o.__base.FEaiEntity.dispose.call(o);
}
with(MO){
   MO.FEaiProvinceData = function FEaiProvinceData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._name             = RClass.register(o, new AGetSet('_name'));
      o._color            = RClass.register(o, new AGetSet('_color'));
      o._boundaries       = RClass.register(o, new AGetter('_boundaries'));
      o.construct         = FEaiProvinceData_construct;
      o.unserialize       = FEaiProvinceData_unserialize;
      o.dispose           = FEaiProvinceData_dispose;
      return o;
   }
   MO.FEaiProvinceData_construct = function FEaiProvinceData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._boundaries = new TObjects();
   }
   MO.FEaiProvinceData_unserialize = function FEaiProvinceData_unserialize(input){
      var o = this;
      o._name = input.readString();
      o._color = input.readUint32();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var boundary = RClass.create(FEaiBoundaryData);
         boundary.unserialize(input);
         o._boundaries.push(boundary);
      }
   }
   MO.FEaiProvinceData_dispose = function FEaiProvinceData_dispose(){
      var o = this;
      o._boundaries = RObject.dispose(o._boundaries);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._mapEntity        = RClass.register(o, new AGetSet('_mapEntity'));
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o._layerDepth       = 3;
      o._focusTick        = 0;
      o._focusInterval    = 10;
      o._focusCurrent     = 0;
      o._focusCount       = 100;
      o.construct         = FEaiProvinceEntity_construct;
      o.buildFace         = FEaiProvinceEntity_buildFace;
      o.buildBorder       = FEaiProvinceEntity_buildBorder;
      o.build             = FEaiProvinceEntity_build;
      o.doInvestment      = FEaiProvinceEntity_doInvestment;
      o.updateColor       = FEaiProvinceEntity_updateColor;
      o.update            = FEaiProvinceEntity_update;
      o.process           = FEaiProvinceEntity_process;
      o.dispose           = FEaiProvinceEntity_dispose;
      return o;
   }
   MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiProvinceEntity_buildFace = function FEaiProvinceEntity_buildFace(context){
      var o = this;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var color = o._color;
      var vertexStart = 0;
      var vertexIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal * 2);
      var faceIndex = 0;
      var faceData = new Uint16Array(indexTotal * 2 + 3 * 2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = 0;
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
         }
         vertexStart += positionCount;
      }
      var layerStart = vertexStart;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = o._layerDepth;
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
         }
         vertexStart += positionCount;
      }
      var vertexStart = 0;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         for(var i = 0; i < positionCount; i++){
            if(i == positionCount - 1){
               faceData[faceIndex++] = vertexStart + i;
               faceData[faceIndex++] = vertexStart + 0;
               faceData[faceIndex++] = vertexStart + i + layerStart;
               faceData[faceIndex++] = vertexStart + 0;
               faceData[faceIndex++] = vertexStart + layerStart;
               faceData[faceIndex++] = vertexStart + i + layerStart;
            }else{
               faceData[faceIndex++] = vertexStart + i;
               faceData[faceIndex++] = vertexStart + i + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart;
               faceData[faceIndex++] = vertexStart + i + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart + 1;
               faceData[faceIndex++] = vertexStart + i + layerStart;
            }
         }
         vertexStart += positionCount;
      }
      var colorIndex = 0;
      var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
      var positionTotal = vertexTotal * 2;
      for(var i = 0; i < positionTotal; i++){
         colors[colorIndex++] = 0x08;
         colors[colorIndex++] = 0x0D;
         colors[colorIndex++] = 0x19;
         colors[colorIndex++] = 0xFF;
      }
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
   }
   MO.FEaiProvinceEntity_buildBorder = function FEaiProvinceEntity_buildBorder(context){
      var o = this;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var color = o._color;
      var vertexStart = 0;
      var vertexIndex = 0;
      var faceIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal * 2);
      var borderIndex = 0;
      var borderData = new Uint16Array(2 * vertexTotal + 2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = 0;
         }
         for(var i = 0; i < positionCount; i++){
            borderData[borderIndex++] = vertexStart + i;
            if(i == positionCount - 1){
               borderData[borderIndex++] = vertexStart;
            }else{
               borderData[borderIndex++] = vertexStart + i + 1;
            }
         }
         vertexStart += positionCount;
      }
      var layerStart = vertexStart;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positions = boundary.positions();
         var positionIndex = 0;
         for(var i = 0; i < positionCount; i++){
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = positions[positionIndex++];
            vertexData[vertexIndex++] = o._layerDepth;
         }
         vertexStart += positionCount;
      }
      var vertexStart = 0;
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         for(var i = 0; i < positionCount; i++){
            borderData[borderIndex++] = vertexStart + i;
            borderData[borderIndex++] = vertexStart + i + layerStart;
         }
         vertexStart += positionCount;
      }
      var colorIndex = 0;
      var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0xB5;
         colors[colorIndex++] = 0xF6;
         colors[colorIndex++] = 0xFF;
      }
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x0B;
         colors[colorIndex++] = 0x11;
         colors[colorIndex++] = 0x23;
         colors[colorIndex++] = 0xFF;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
      renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable.indexBuffer().setLineWidth(1);
      renderable.indexBuffer().upload(borderData, borderIndex);
   }
   MO.FEaiProvinceEntity_build = function FEaiProvinceEntity_build(context){
      var o = this;
      var vertexTotal = 0;
      var indexTotal = 0;
      var boundaries = o._data.boundaries();
      var count = boundaries.count();
      for(var i = 0; i < count; i++){
         var boundary = boundaries.at(i);
         vertexTotal += boundary.positionCount();
         indexTotal += boundary.indexes().length;
      }
      o._vertexTotal = vertexTotal;
      o._indexTotal = indexTotal;
      o.buildFace(context);
      o.buildBorder(context);
   }
   MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(){
      var o = this;
      o._focusTick = 0;
      o._focusCurrent = o._focusCount;
   }
   MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
      var o = this;
      var investmentTotal = data.investmentTotal();
      var rate = Math.sqrt(investmentTotal) / 100;
   }
   MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
      var o = this;
      var rate = o._focusCurrent / 100;
      var vertexTotal = o._vertexTotal;
      var colorIndex = 0;
      var colors = MO.TypeArray.findTemp(EDataType.Uint8, 4 * vertexTotal * 2);
      var positionTotal = vertexTotal * 2;
      for(var i = 0; i < positionTotal; i++){
         colors[colorIndex++] = 0x08 + ((0x08 - 0x08)* rate);
         colors[colorIndex++] = 0x0D + ((0xB5 - 0x0D)* rate);
         colors[colorIndex++] = 0x19 + ((0xF6 - 0x19)* rate);
         colors[colorIndex++] = 0xFF;
      }
      o._faceRenderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
   }
   MO.FEaiProvinceEntity_process = function FEaiProvinceEntity_process(){
      var o = this;
      if(o._focusCurrent > 0){
         var tick = RTimer.current();
         if(tick - o._focusTick > o._focusInterval){
            var z = -o._focusCurrent / 20;
            faceRenderable = o._faceRenderable;
            matrix = faceRenderable.matrix();
            matrix.tz = z;
            matrix.updateForce();
            borderRenderable = o._borderRenderable;
            matrix = borderRenderable.matrix();
            matrix.tz = z;
            matrix.updateForce();
            o.updateColor(o._focusCurrent);
            o._focusCurrent--;
            o._focusTick = tick;
         }
      }
   }
   MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiProvinceEntityConsole = function FEaiProvinceEntityConsole(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.construct  = MO.FEaiProvinceEntityConsole_construct;
   o.findByCode = MO.FEaiProvinceEntityConsole_findByCode;
   o.push       = MO.FEaiProvinceEntityConsole_push;
   o.dispose    = MO.FEaiProvinceEntityConsole_dispose;
   return o;
}
MO.FEaiProvinceEntityConsole_construct = function FEaiProvinceEntityConsole_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._provinces = MO.TDictionary();
}
MO.FEaiProvinceEntityConsole_findByCode = function FEaiProvinceEntityConsole_findByCode(code){
   return this._provinces.get(code);
}
MO.FEaiProvinceEntityConsole_push = function FEaiProvinceEntityConsole_push(entity){
   this._provinces.set(entity.data().name(), entity);
}
MO.FEaiProvinceEntityConsole_dispose = function FEaiProvinceEntityConsole_dispose(monitor){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
}
with (MO) {
   MO.FGui24HTimeline = function FGui24HTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._startTime        = RClass.register(o, new AGetSet('_startTime'));
      o._endTime          = RClass.register(o, new AGetSet('_endTime'));
      o._data             = null;
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      o.construct         = FGui24HTimeline_construct;
      o.sync              = FGui24HTimeline_sync;
      o.onPaintBegin      = FGui24HTimeline_onPaintBegin;
      o.on24HDataFetch    = FGui24HTimeline_on24HDataFetch;
      return o;
   }
   MO.FGui24HTimeline_construct = function FGui24HTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }
   MO.FGui24HTimeline_sync = function FGui24HTimeline_sync() {
      var o = this;
      var startTime = o._startTime;
      var endTime = o._endTime;
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      var nowTick = systemLogic.currentDate();
      startTime.date.setTime(nowTick);
      startTime.refresh();
      startTime.setSecond(0);
      startTime.setMinute(0);
      startTime.addDay(-1);
      endTime.date.setTime(nowTick);
      endTime.setSecond(0);
      endTime.setMinute(parseInt(endTime.date.getMinutes() / 15) * 15);
      endTime.refresh();
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, o._startTime.format('YYYYMMDDHH24MISS'), o._endTime.format('YYYYMMDDHH24MISS'), 60 * 15);
   }
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
      var o = this;
      o._data = event.content.collection;
      o.dirty();
   }
   MO.FGui24HTimeline_onPaintBegin = function FGui24HTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#FFFFFF', 1);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#FFFFFF', 1);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#FFFFFF', 3);
      var startTime = o.startTime();
      var endTime = o.endTime();
      var timeSpan = endTime.date.getTime() - startTime.date.getTime();
      var bakTime = startTime.date.getTime();
      var text;
      var drawText = false;
      var textWidth = 0;
      while (!startTime.isAfter(endTime)) {
         var span = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
         graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
         text = startTime.format('HH24:00');
         startTime.addMseconds(1000 * 60 * 60);
         drawText = !drawText;
         if (drawText) {
            graphic.setFont('bold 20px Microsoft YaHei');
            textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#FFFFFF');
         }
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var data = o._data;
      if (!data) {
         return;
      }
      var maxInves = 0;
      for (var i = 0; i < data.length; i++) {
         var inves = parseInt(data[i].investment);
         if (inves > maxInves) {
            maxInves = inves;
         }
      }
      var pixPer10k = dataHeight * 10000 / maxInves;
      var inves = parseInt(data[0].investment);
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         var rate = data[i].investment / maxInves;
         var colorIdx = parseInt((rateResource.count() - 1) * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
         var lastRate = data[i - 1].investment / maxInves;
         var lastColorIdx = parseInt((rateResource.count() - 1) * lastRate);
         var lastHexColor = RHex.format(rateResource.find(lastColorIdx));
         var lastColor = '#' + lastHexColor.substring(2);
         var lastOpColor = 'rgba(' + RHex.parse(lastHexColor.substring(2, 4)) + ',' + RHex.parse(lastHexColor.substring(4, 6)) + ',' + RHex.parse(lastHexColor.substring(6, 8)) + ',' + '0.3)';
         var gradient = graphic.createLinearGradient(lastX, lastY, x, y);
         gradient.addColorStop('0', lastColor);
         gradient.addColorStop('1', color);
         var opGradient = graphic.createLinearGradient(lastX, 0, x, 0);
         opGradient.addColorStop('0', lastOpColor);
         opGradient.addColorStop('1', opColor);
         graphic.drawLine(lastX, lastY, x, y, gradient, 3);
         graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
         lastX = x;
         lastY = y;
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
      var dayTotal = 0;
      startTime.parseAuto(data[0].date);
      startTime.refresh();
      lastHour = startTime.date.getHours();
      for (var i = 0; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var hour = startTime.date.getHours();
         if (lastHour == hour) {
            hourInves += parseInt(data[i].investment);
         }else{
            if(hourInves > maxHourInves){
               maxHourInves = hourInves;
               dayTotal += hourInves;
               hourInves = 0;
            }
            lastHour = hour;
         }
      }
      graphic.setFont('bold 22px Microsoft YaHei');
      graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
      graphic.setFont('bold 20px Microsoft YaHei');
      var textWidth = graphic.textWidth('峰值：');
      var textHourPeakValue = MO.RFloat.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
      var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
      var textDayTotalValue = MO.RFloat.unitFormat(dayTotal, 0, 0, 2, 0, 10000, '万');
      var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
      var textHourAvrgValue = MO.RFloat.unitFormat(dayTotal / 24, 0, 0, 2, 0, 10000, '万');
      var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
      var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
      graphic.drawText('峰值：', decoLeft, top + 30, '#00CFFF');
      graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, top + 30, '#00B5F6');
      graphic.drawText('总额：', decoLeft, top + 55, '#00CFFF');
      graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, top + 55, '#00B5F6');
      graphic.drawText('均值：', decoLeft, top + 80, '#00CFFF');
      graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, top + 80, '#00B5F6');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
}
with(MO){
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._shiningImage = null;
      o._numImages = null;
      o._yiImage = null;
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      o.construct = FGuiHistoryMilestoneFrame_construct;
      o.onPaintBegin = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show = FGuiHistoryMilestoneFrame_show;
      o.dispose = FGuiHistoryMilestoneFrame_dispose;
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
      return o;
   }
   MO.FGuiHistoryMilestoneFrame_construct = function FGuiHistoryMilestoneFrame_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/milestone/bg.png');
      o._shiningImage = MO.Class.create(MO.FImage);
      o._shiningImage.addLoadListener(o, o.onImageLoad);
      o._shiningImage.loadUrl('../ars/eai/milestone/shining.png');
      o._yiImage = MO.Class.create(MO.FImage);
      o._yiImage.addLoadListener(o, o.onImageLoad);
      o._yiImage.loadUrl('../ars/eai/number/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         var img = MO.Class.create(MO.FImage);
         img.addLoadListener(o, o.onImageLoad);
         img.loadUrl('../ars/eai/number/' + i + '.png');
         o._numImages[i] = img;
      }
   }
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var shiningSize = o._shiningImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;
      var textLeft = hCenter - 120;
      var textTop = rectangle.top + 450;
      graphic.drawImage(o._shiningImage, hCenter - shiningSize.width / 2, rectangle.top, shiningSize.width, shiningSize.height);
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top + shiningSize.height / 2, bgSize.width, bgSize.height);
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText('达成日数：', textLeft, textTop + 50, '#FFE849');
      graphic.drawText('分公司数：', textLeft, textTop + 100, '#FFE849');
      graphic.drawText('理财师数：', textLeft, textTop + 150, '#FFE849');
      if (o.data()) {
         var invesText = o.data().investmentTotal().toString();
         var numWidth = invesText.length * 60 + 80;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * 60, rectangle.top + shiningSize.height / 2 - 80, o._numImages[0]._size.width, o._numImages[0]._size.height);
         }
         graphic.drawImage(o._yiImage, numLeft + invesText.length * 60, rectangle.top + shiningSize.height / 2 - 80, o._yiImage._size.width, o._yiImage._size.height);
         graphic.drawText(o.data().dayCount(), textLeft + 120, textTop + 50, '#FFA800');
         graphic.drawText(o.data().companyCount(), textLeft + 120, textTop + 100, '#FFA800');
         graphic.drawText(o.data().staffCount(), textLeft + 120, textTop + 150, '#FFA800');
         var passedTick = MO.Timer.current() - o._startTick;
         var showTick = passedTick - o._popDuration;
         var closeTick = passedTick - o._showDuration - o._popDuration;
         var slideDistance = (MO.Eai.Canvas.logicSize().width + rectangle.width) / 2;
         var p = 0;
         if (passedTick < o._popDuration) {
            p = passedTick / o._popDuration;
            p = 1 - (1 - p) * (1 - p);
            o.setLeft(-rectangle.width + slideDistance * p);
         }
         else if (showTick < o._showDuration) {
         }
         else if (closeTick < o._closeDuration) {
            p = closeTick / o._closeDuration;
            p = p * p;
            o.setLeft((MO.Eai.Canvas.logicSize().width - rectangle.width) / 2 + slideDistance * p);
         }
         else {
            o._data = null;
            o.setVisible(false);
            var dsEvent = MO.Memory.alloc(SEvent);
            dsEvent.sender = o;
            o.processDataChangedListener(dsEvent);
         }
      }
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with (MO) {
   MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      o.onPaintBegin = FGuiHistoryTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
      var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();
      var startDate = o.startTime();
      var endDate = o.endTime();
      var degreeDate = o.degreeTime();
      var bakTime = startDate.date.getTime();
      var timeSpan = endDate.date.getTime() - startDate.date.getTime();
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var pixPer10k = dataHeight * 10000 / maxInves;
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            var rate = 1 - (y / dataHeight);
            var colorIdx = parseInt(rateResource.count() * rate);
            var hexColor = RHex.format(rateResource.find(colorIdx));
            var color = '#' + hexColor.substring(2);
            graphic.drawLine(lastX, lastY, x, y, color, 3);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, 3, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.setFont('bold 16px Microsoft YaHei');
               graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
            }
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var inves = dateData.investmentTotal();
         var y = dataBottom - inves / 10000 * pixPer10k;
         var rate = 1 - (y / dataHeight);
         var colorIdx = parseInt(rateResource.count() * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, 3);
         var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), 3, 0, color, color);
         graphic.setFont('bold 16px Microsoft YaHei');
         graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }
}
with(MO){
   MO.FGuiLivePop = function FGuiLivePop(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      o._fullWidth = 910;
      o._fullHeight = 140;
      o._riseHeight = 50;
      o.setup = FGuiLivePop_setup;
      o.onPaintBegin = FGuiLivePop_onPaintBegin;
      o.onImageLoad = FGuiLivePop_onImageLoad;
      o.show = FGuiLivePop_show;
      o.dispose = FGuiLivePop_dispose;
      return o;
   }
   MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
      var o = this;
      o.setWidth(o._fullWidth);
      o.setHeight(o._fullHeight);
      o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/invespop.png');
   }
   MO.FGuiLivePop_onImageLoad = function FGuiLivePop_onImageLoad() {
      this.dirty();
   }
   MO.FGuiLivePop_onPaintBegin = function FGuiLivePop_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      if (!o._data) {
         return;
      }
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var entity = o._data;
      var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
      var cityEntity = cityConsole.findByCard(entity.card());
      var popText = '';
      var date = MO.Memory.alloc(TDate);
      date.parse(entity.date());
      popText += date.format('HH24:MI:SS');
      popText += '    ';
      if (cityEntity) {
         popText += cityEntity.data().label();
      }
      popText += '    ';
      popText += entity.customer() + ' - ' + entity.phone();
      popText += '    ';
      popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
      graphic.setFont('36px Microsoft YaHei');
      popTextWidth = graphic.textWidth(popText);
      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         graphic.globalAlpha = p;
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.globalAlpha = 1;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
      }
      else if (showTick < o._showDuration) {
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         graphic.globalAlpha = p;
         graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
         graphic.globalAlpha = 1;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
         graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
      }
      else {
         o._data = null;
         o.setVisible(false);
         return;
      }
   }
   MO.FGuiLivePop_show = function FGuiLivePop_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }
   MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FGuiLiveTable = function FGuiLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._data                 = MO.Class.register(o, new MO.AGetSet('_data'));
   o._rankLogoImage        = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   o.construct             = MO.FGuiLiveTable_construct;
   o.setup                 = MO.FGuiLiveTable_setup;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._currentDate = MO.TDate();
   o._rankLinePadding = new MO.SPadding(80, 0, 80, 0);
   o._backgroundPadding = new MO.SPadding(80, 80, 80, 80);
   o._columnLabels = new Array('时间', '城市', '用户-手机', '投资额(元)');
   if(MO.Runtime.isPlatformMobile()){
      o._columnDefines = new Array(130, 130, 180, 186);
   }else{
      o._columnDefines = new Array(110, 110, 160, 166);
   }
   o._columnWidths = new Array();
}
MO.FGuiLiveTable_setup = function FGuiLiveTable_setup() {
   var o = this;
   var image = o._logoImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/logo.png');
   var image = o._backgroundImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/grid.png');
   var image = o._rankLineImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/line.png');
   var image = o._rank1Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/1.png');
   var image = o._rank2Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/2.png');
   var image = o._rank3Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/3.png');
   if(MO.Runtime.isPlatformMobile()){
      o._headFontStyle = 'bold 42px Microsoft YaHei';
      o._headStart = 120;
      o._headTextTop = 38;
      o._headHeight = 54;
      o._rankStart = 220;
      o._rankHeight = 60;
      o._rankIconStart = 30;
      o._rankRowUp = 46;
      o._rankRowDown = 68;
      o._rowStart = 400;
      o._rowFontStyle = '36px Microsoft YaHei';
      o._rowHeight = 46;
   }else{
      o._headFontStyle = 'bold 36px Microsoft YaHei';
      o._headStart = 116;
      o._headTextTop = 26;
      o._headHeight = 40;
      o._rankStart = 190;
      o._rankHeight = 44;
      o._rankIconStart = 25;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._rowStart = 320;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowHeight = 32;
   }
}
MO.FGuiLiveTable_drawRow = function FGuiLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#59FDE9';
   }else{
      fontColor = '#1DACE5';
   }
   if(flag){
      if(o._rankLineImage.testReady()){
         graphic.drawGridImage(o._rankLineImage, x - 5, y - o._rankRowUp, width - 14, o._rankRowDown, o._rankLinePadding);
      }
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX, imageY, 46, 37);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   if(!flag){
      o._currentDate.parse(entity.date());
      var text = o._currentDate.format('HH24:MI:SS');
      var textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] / 2 - textWidth / 2, y, fontColor);
   }
   x += widths[0] + 1;
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = cityConsole.findCityByCard(entity.card());
   text = '';
   if (cityEntity) {
      text = cityEntity.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] / 2 - textWidth / 2, y, fontColor);
   x += widths[1] + 1;
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] / 2 - textWidth / 2, y, fontColor);
   x += widths[2] + 1;
   var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   if (investment.length > 7) {
      var highColor = null;
      if(investment.length > 9){
         highColor = '#FDEF01';
      }else{
         highColor = '#EB6C03';
      }
      var high = investment.substring(0, investment.length - 7);
      var low = investment.substring(investment.length - 7, investment.length);
      var highWidth = graphic.textWidth(high);
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high, x + widths[3] - 5 - lowWidth - highWidth, y, highColor);
      graphic.drawText(low, x + widths[3] - 5 - lowWidth, y, fontColor);
   } else {
      text = investment;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[3] - 5 - textWidth, y, fontColor);
   }
}
MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var widthRate = width / o._size.width;
   var heightRate = height / o._size.height;
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = o._columnDefines[i] * widthRate;
   }
   var drawLeft = left + 8;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '钰诚控股 - e租宝';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (right - left) / 2 - (titleWidth / 2);
   if(o._logoImage.testReady()){
      graphic.drawImage(o._logoImage, textLeft - 77, top + 35, 62, 62);
   }
   graphic.drawText(titleText, textLeft, top + 76, '#00B2F2');
   drawPosition += 70
   graphic.setFont(o._rowFontStyle);
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < 4; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i], o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + o._columnWidths[i] / 2 - headTextWidth / 2, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i] + 2;
   }
   var rankEntity = o._rank;
   if(rankEntity){
      var tableTop = top + o._rankStart;
      var tableText = '';
      var tableTextWidth = 0;
      var dataEntities = o._data;
      var count = rankEntity.count();
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + o._rankHeight * i, width);
      }
   }
   var dataEntities = o._data;
   if(dataEntities){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      var count = dataEntities.count();
      for(var i = 0; i < count; i++) {
         var entity = dataEntities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + o._rowHeight * i, width);
      }
   }
}
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._backgroundPadding = RObject.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
