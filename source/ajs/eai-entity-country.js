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
MO.FEaiCityEntity = function FEaiCityEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._provinceEntity         = MO.Class.register(o, new MO.AGetSet('_provinceEntity'));
   o._visible                = MO.Class.register(o, new MO.AGetter('_visible'), false);
   o._location               = MO.Class.register(o, new MO.AGetter('_location'));
   o._size                   = MO.Class.register(o, new MO.AGetter('_size'));
   o._alpha                  = MO.Class.register(o, new MO.AGetSet('_alpha'), 1);
   o._color                  = MO.Class.register(o, new MO.AGetter('_color'));
   o._range                  = MO.Class.register(o, new MO.AGetter('_range'), 1);
   o._rangeColor             = MO.Class.register(o, new MO.AGetter('_rangeColor'));
   o._cityTotal              = 0;
   o._investmentCount        = 0;
   o._investmentTotal        = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   o._investmentLevelTotal   = 20000;
   o._investmentLevel        = 0;
   o._investmentRange        = 1;
   o._investmentRate         = 100;
   o._investmentDirection    = 1;
   o._stage                  = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._renderable             = MO.Class.register(o, new MO.AGetSet('_renderable'));
   o._data                   = MO.Class.register(o, new MO.AGetSet('_data'));
   o._inputPoint             = null;
   o._outputPoint            = null;
   o.construct               = MO.FEaiCityEntity_construct;
   o.calculateScreenPosition = MO.FEaiCityEntity_calculateScreenPosition;
   o.build                   = MO.FEaiCityEntity_build;
   o.addInvestmentTotal      = MO.FEaiCityEntity_addInvestmentTotal;
   o.reset                   = MO.FEaiCityEntity_reset;
   o.update                  = MO.FEaiCityEntity_update;
   o.process                 = MO.FEaiCityEntity_process;
   o.dispose                 = MO.FEaiCityEntity_dispose;
   return o;
}
MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._location = new MO.SPoint2();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4(0, 0, 0, 0);
   o._rangeColor = new MO.SColor4(0, 0, 0, 0);
   o._inputPoint = new MO.SPoint3();
   o._outputPoint = new MO.SPoint3();
}
MO.FEaiCityEntity_calculateScreenPosition = function FEaiCityEntity_calculateScreenPosition(){
   var o = this;
   var region = o._stage.region();
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
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
MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(level, investmentTotal){
   var o = this;
   o._investmentCount++;
   o._investmentTotal += investmentTotal;
   o._investmentLevel = o._investmentLevelTotal;
   var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
   var color = rateConsole.find(MO.EEaiRate.Line).findRate(o._investmentTotal / 200000);
   o._color.set(1, 1, 1, 1);
   o._range = MO.Lang.Float.toRange(Math.log(investmentTotal) / 5, 0, 6);
   o._rangeColor.setInteger(color);
   o._rangeColor.alpha = 1;
   o._investmentRange = o._range;
   o._investmentRate = 100;
   o._visible = true;
}
MO.FEaiCityEntity_reset = function FEaiCityEntity_reset(){
   var o = this;
   o._visible = false;
   o._alpha = 0;
   o._cityTotal = 0;
   o._color.set(0, 0, 0, 0);
   o._rangeColor.set(0, 0, 0, 0);
}
MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
   var o = this;
   var range = 1;
   o._color.set(1, 1, 1, 1);
   o._rangeColor.set(1, 1, 1, 1);
   if(data){
      o._cityTotal = data.investmentTotal();
   }
   var total = o._cityTotal;
   if(total > 0){
      o._visible = true;
   }
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var investmentCityTotal = historyConsole.investmentCityTotal();
   var rateInfo = MO.Console.find(MO.FEaiResourceConsole).rateConsole().find(MO.EEaiRate.Map);
   var rate = Math.sqrt(total / investmentCityTotal) * 4;
   var color = rateInfo.findRate(rate);
   range = rate * 6;
   rate = MO.Lang.Float.toRange(rate, 0, 1);
   o._alpha = MO.Lang.Float.toRange(rate * 1.5, 0, 1);
   o._rangeColor.setIntAlpha(color, rate * 0.6);
   o._range = MO.Lang.Float.toRange(Math.sqrt(range), 1, 6);
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
   o._location = MO.Lang.Object.dispose(o._location);
   o._size = MO.Lang.Object.dispose(o._size);
   o._color = MO.Lang.Object.dispose(o._color);
   o._rangeColor = MO.Lang.Object.dispose(o._rangeColor);
   o._inputPoint = MO.Lang.Object.dispose(o._inputPoint);
   o._outputPoint = MO.Lang.Object.dispose(o._outputPoint);
   o.__base.FEaiEntity.dispose.call(o);
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
   o._citys = new MO.TDictionary();
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
      materialInfo.optionDepth = false;
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
      materialInfo.optionDepth = false;
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
         if(city.visible()){
            var range = city.range() * 255;
            var alpha = city.alpha();
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
            var alpha = parseInt(color.alpha * alpha * 255);
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
MO.FEaiCountryData = function FEaiCountryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o.onLoaded       = MO.FEaiCountryData_onLoaded;
   o.construct      = MO.FEaiCountryData_construct;
   o.unserialize    = MO.FEaiCountryData_unserialize;
   o.load           = MO.FEaiCountryData_load;
   o.dispose        = MO.FEaiCountryData_dispose;
   return o;
}
MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._provinces = new MO.TDictionary();
}
MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
   var o = this;
   var data = event.outputData();
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
}
MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
   var o = this;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceData);
      province.unserialize(input);
      o._provinces.set(province.code(), province);
   }
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiCountryData_load = function FEaiCountryData_load(){
   var o = this;
   var url = '/script/ars/eai/country.dat';
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoaded);
}
MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
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
      o._blockInterval           = RClass.register(o, new AGetSet('_blockInterval'), 200);
      o._mouseOverRiseHeight     = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 3);
      o._mouseMoveCheckInterval  = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration      = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
      o._provinceArray           = null;
      o._playing                 = false;
      o._lastTick                = 0;
      o._interval                = 10;
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o._mapEnterSEArray         = null;
      o._mapDownSEArray          = null;
      o._lastEnterSEIndex        = -1;
      o._lastDownSEIndex         = -1;
      o.setup                    = FEaiCountryEntity_setup;
      o.start                    = FEaiCountryEntity_start;
      o.process                  = FEaiCountryEntity_process;
      o.introAnime               = FEaiCountryEntity_introAnime;
      o.onMouseMove              = FEaiCountryEntity_onMouseMove;
      o.onMouseDown              = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime       = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch      = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime          = FEaiCountryEntity_cameraMoveAnime;
      o.provinceShowOrderSort    = FEaiCountryEntity_provinceShowOrderSort;
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
      var provinceArray = o._provinceArray = new Array(provinceEntities.count());
      for (var i = 0; i < provinceEntities.count() ; i++) {
         provinceArray[i] = provinceEntities.at(i);
      }
      provinceArray.sort(o.provinceShowOrderSort);
      var audioConsole = MO.Console.find(MO.FAudioConsole);
      var peCount = o._provinceEntities.count();
      var enterSEArray = o._mapEnterSEArray = new Array(peCount);
      var downSEArray = o._mapDownSEArray = new Array(peCount);
      for (var i = 0; i < peCount; i++) {
         enterSEArray[i] = audioConsole.create('{eai.resource}/map_entry/enter.wav');
      }
      for (var i = 0; i < peCount; i++) {
         downSEArray[i] = audioConsole.create('{eai.resource}/map_entry/down.wav');
      }
      o._startTime = MO.Timer.current();
   }
   MO.FEaiCountryEntity_provinceShowOrderSort = function FEaiCountryEntity_provinceShowOrderSort(p1, p2) {
      var pResConsole = MO.RConsole.find(FEaiResourceConsole).provinceConsole();
      var p1Res = pResConsole.findByCode(p1.data().code());
      var p2Res = pResConsole.findByCode(p2.data().code())
      if (p1Res.displayOrder() > p2Res.displayOrder()) {
         return 1;
      }
      return -1;
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
      for (var i = 0; i < o._provinceArray.length && i < idxCap; i++) {
         var fr = o._provinceArray[i].faceRenderable();
         var br = o._provinceArray[i].borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
            risePercentage = 1;
            if (i == o._lastDownSEIndex + 1) {
               o._mapDownSEArray[i].play(0);
               o._lastDownSEIndex++;
            }
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
      idxCap = idxCap > o._provinceArray.length - 1 ? o._provinceArray.length - 1 : parseInt(idxCap);
      if (o._lastEnterSEIndex != idxCap) {
         o._mapEnterSEArray[idxCap].play(0);
         o._lastEnterSEIndex = idxCap;
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
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   o._scopeCd              = MO.EScope.Local;
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   o._countryData          = null;
   o._countryReady         = false;
   o._provinceConsole      = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole          = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._listenersLoadCountry = MO.Class.register(o, new MO.AListener('_listenersLoadCountry', 'LoadCountry'));
   o.onSetup               = MO.FEaiEntityConsole_onSetup;
   o.onLoadCountry         = MO.FEaiEntityConsole_onLoadCountry;
   o.construct             = MO.FEaiEntityConsole_construct;
   o.testCountryReady      = MO.FEaiEntityConsole_testCountryReady;
   o.loadCountryData       = MO.FEaiEntityConsole_loadCountryData;
   o.dispose               = MO.FEaiEntityConsole_dispose;
   return o;
}
MO.FEaiEntityConsole_onSetup = function FEaiEntityConsole_onSetup(){
   var o = this;
   o.__base.FConsole.onSetup.call(o);
   var mapEntity = o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
   mapEntity.linkGraphicContext(o);
   mapEntity.setup();
}
MO.FEaiEntityConsole_onLoadCountry = function FEaiEntityConsole_onLoadCountry(event){
   var o = this;
   var countryData = event.sender;
   var mapEntity = o._mapEntity;
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   var citysRangeRenderable = mapEntity.citysRangeRenderable();
   var citysRenderable = mapEntity.citysRenderable();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntityConsole = MO.Console.find(MO.FEaiEntityConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var province = provinceConsole.findByCode(provinceCode);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setMapEntity(mapEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      mapEntity.pushProvince(provinceEntity);
      provinceEntityConsole.push(provinceEntity);
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntities = mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setRenderable(citysRenderable);
      cityEntity.setData(city);
      cityEntity.build(o);
      cityEntities.set(city.code(), cityEntity);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
      cityEntityConsole.push(cityEntity);
   }
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   mapEntity.setupCityEntities();
   o._countryReady = true;
   var event = new MO.SEvent();
   o.processLoadCountryListener(event);
}
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceEntityConsole);
   o._cityConsole = MO.Class.create(MO.FEaiCityEntityConsole);
}
MO.FEaiEntityConsole_testCountryReady = function FEaiEntityConsole_testCountryReady(){
   return this._countryReady;
}
MO.FEaiEntityConsole_loadCountryData = function FEaiEntityConsole_loadCountryData(){
   var o = this;
   var country = o._countryData;
   if(!country){
      country = o._countryData = MO.Class.create(MO.FEaiCountryData);
      country.addLoadListener(o, o.onLoadCountry);
      country.load();
   }
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._mapEntity = RObject.dispose(o._mapEntity);
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   o.__base.FConsole.dispose.call(o);
}
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._countryEntity        = MO.Class.register(o, new MO.AGetter('_countryEntity'));
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   o._countryDisplay       = MO.Class.register(o, new MO.AGetter('_countryDisplay'));
   o._countryBorderDisplay = MO.Class.register(o, new MO.AGetter('_countryBorderDisplay'));
   o.construct             = MO.FEaiMapEntity_construct;
   o.setup                 = MO.FEaiMapEntity_setup;
   o.setupCityEntities     = MO.FEaiMapEntity_setupCityEntities;
   o.findProvinceByCode    = MO.FEaiMapEntity_findProvinceByCode;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.pushProvince          = MO.FEaiMapEntity_pushProvince;
   o.upload                = MO.FEaiMapEntity_upload;
   o.process               = MO.FEaiMapEntity_process;
   o.reset                 = MO.FEaiMapEntity_reset;
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
MO.FEaiMapEntity_setup = function FEaiMapEntity_setup(){
   var o = this;
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiMapEntity_setupCityEntities = function FEaiMapEntity_setupCityEntities(){
   var o = this;
   var provinceEntities = o._provinceEntities;
   var cityEntities = o._cityEntities;
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = provinceEntities.get(provinceCode);
      cityEntity.setProvinceEntity(provinceEntity);
   }
   o._countryEntity.setup(provinceEntities);
}
MO.FEaiMapEntity_findProvinceByCode = function FEaiMapEntity_findProvinceByCode(code){
   var o = this;
   var provinceEntity = o._provinceEntities.get(code);
   return provinceEntity;
}
MO.FEaiMapEntity_pushProvince = function FEaiMapEntity_pushProvince(province){
   var o = this;
   var code = province.data().code();
   o._provinceEntities.set(code, province);
}
MO.FEaiMapEntity_findCityByCard = function FEaiMapEntity_findCityByCard(card){
   var o = this;
   var cityEntity = null;
   var cardConsole = MO.Console.find(MO.FEaiResourceConsole).cardConsole();
   var cityCode = cardConsole.findCityCode(card);
   if(cityCode){
      cityEntity = o._cityEntities.get(cityCode);
   }
   return cityEntity;
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
MO.FEaiMapEntity_reset = function FEaiMapEntity_reset(){
   var o = this;
   var provinceEntities = o._provinceEntities;
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      provinceEntity.reset();
   }
   var cityEntities = o._cityEntities;
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._countryEntity = MO.Lang.Object.dispose(o._countryEntity);
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   o._citysRenderable = MO.Lang.Object.dispose(o._citysRenderable);
   o._citysRangeRenderable = MO.Lang.Object.dispose(o._citysRangeRenderable);
   o._countryDisplay = MO.Lang.Object.dispose(o._countryDisplay);
   o._countryBorderDisplay = MO.Lang.Object.dispose(o._countryBorderDisplay);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiProvinceData = function FEaiProvinceData(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._boundaries = MO.Class.register(o, new MO.AGetter('_boundaries'));
   o.construct   = MO.FEaiProvinceData_construct;
   o.unserialize = MO.FEaiProvinceData_unserialize;
   o.dispose     = MO.FEaiProvinceData_dispose;
   return o;
}
MO.FEaiProvinceData_construct = function FEaiProvinceData_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._boundaries = new MO.TObjects();
}
MO.FEaiProvinceData_unserialize = function FEaiProvinceData_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var boundary = MO.Class.create(MO.FEaiBoundaryData);
      boundary.unserialize(input);
      o._boundaries.push(boundary);
   }
}
MO.FEaiProvinceData_dispose = function FEaiProvinceData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiProvinceEntity = function FEaiProvinceEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._mapEntity        = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   o._layerDepth       = 3;
   o._currentZ         = MO.Class.register(o, new MO.AGetter('_currentZ'), 0);
   o._focusTick        = 0;
   o._focusInterval    = 10;
   o._focusCurrent     = 0;
   o._focusColor       = null;
   o._focusCount       = 200;
   o.construct         = MO.FEaiProvinceEntity_construct;
   o.buildFace         = MO.FEaiProvinceEntity_buildFace;
   o.buildBorder       = MO.FEaiProvinceEntity_buildBorder;
   o.build             = MO.FEaiProvinceEntity_build;
   o.doInvestment      = MO.FEaiProvinceEntity_doInvestment;
   o.updateColor       = MO.FEaiProvinceEntity_updateColor;
   o.update            = MO.FEaiProvinceEntity_update;
   o.process           = MO.FEaiProvinceEntity_process;
   o.reset             = MO.FEaiProvinceEntity_reset;
   o.dispose           = MO.FEaiProvinceEntity_dispose;
   return o;
}
MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   var colors = o._focusColors = new Array();
   colors[0] = [0x28, 0x42, 0xB4];
   colors[1] = [0x28, 0x42, 0xB4];
   colors[2] = [0x1B, 0xA2, 0xBC];
   colors[3] = [0xFF, 0xDF, 0x6F];
   colors[4] = [0xFF, 0x6B, 0x49];
   colors[5] = [0xFF, 0x6B, 0x49];
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
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
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
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
   renderable.indexBuffer().upload(faceData, faceIndex);
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
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
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
MO.FEaiProvinceEntity_doInvestment = function FEaiProvinceEntity_doInvestment(level, investment){
   var o = this;
   o._focusTick = 0;
   o._focusCurrent = o._focusCount;
   o._focusColor = o._focusColors[level];
}
MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
   var o = this;
   var investmentTotal = data.investmentTotal();
   var rate = Math.sqrt(investmentTotal) / 100;
}
MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
   var o = this;
   var rate = o._focusCurrent / o._focusCount;
   var vertexTotal = o._vertexTotal;
   var colorIndex = 0;
   var colors = MO.TypeArray.findTemp(MO.EDataType.Uint8, 4 * vertexTotal * 2);
   var color = o._focusColor;
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = 0x08 + ((color[0] - 0x08)* rate);
      colors[colorIndex++] = 0x0D + ((color[1] - 0x0D)* rate);
      colors[colorIndex++] = 0x19 + ((color[2] - 0x19)* rate);
      colors[colorIndex++] = 0xFF;
   }
   o._faceRenderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2);
}
MO.FEaiProvinceEntity_process = function FEaiProvinceEntity_process(){
   var o = this;
   if(o._focusCurrent > 0){
      var tick = MO.Timer.current();
      if(tick - o._focusTick > o._focusInterval){
         var z = o._currentZ = -o._focusCurrent / 60;
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
MO.FEaiProvinceEntity_reset = function FEaiProvinceEntity_reset(){
   var o = this;
   o._currentZ = 0;
   o._focusTick = 0;
   o._focusCurrent = 0;
}
MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
   var o = this;
   o.__base.FEaiEntity.dispose.call(o);
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
   var code = entity.data().code();
   this._provinces.set(code, entity);
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
      o._ready            = false;
      o._investmentTotal  = 0;
      o._baseHeight = 5;
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      o.oeUpdate          = FGui24HTimeline_oeUpdate;
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
      if (!o._ready) {
         return;
      }
      var startTime = o._startTime;
      var endTime = o._endTime;
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      var nowTick = systemLogic.currentDate();
      startTime.assign(nowTick);
      startTime.setSecond(0);
      startTime.setMinute(0);
      startTime.addDay(-1);
      endTime.assign(nowTick);
      endTime.setSecond(0);
      endTime.setMinute(parseInt(endTime.date.getMinutes() / 15) * 15);
      endTime.refresh();
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, o._startTime.format('YYYYMMDDHH24MISS'), o._endTime.format('YYYYMMDDHH24MISS'), 60 * 15);
   }
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
      var o = this;
      o._investmentTotal  = 0;
      var data = o._data = event.content.collection;
      if(data){
         var count = data.length;
         for(var i = 0; i < count; i++){
            var row = data[i];
            o._investmentTotal += parseFloat(row.investment);
         }
      }
      o.dirty();
   }
   MO.FGui24HTimeline_oeUpdate = function FGui24HTimeline_oeUpdate(event) {
      var o = this;
      o.__base.FGuiControl.oeUpdate.call(o, event);
      if (o._ready) {
         return;
      }
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      if (systemLogic.testReady()) {
         o._ready = true;
         o.sync();
      }
      return MO.EEventStatus.Stop;
   }
   MO.FGui24HTimeline_onPaintBegin = function FGui24HTimeline_onPaintBegin(event) {
      var o = this;
      if (!o._ready) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
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
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
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
      var ctx = graphic._handle;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         y -= o._baseHeight;
         ctx.lineTo(x, y);
      }
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
      var bottomColor = '#' + hexColor.substring(2);
      var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
      var topColor = '#' + hexColor.substring(2);
      var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
      var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
      gradient.addColorStop('0', bottomColor);
      gradient.addColorStop('1', topColor);
      var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
      opGradient.addColorStop('0', opBottomColor);
      opGradient.addColorStop('1', opTopColor);
      ctx.strokeStyle = gradient;
      ctx.fillStyle = opGradient;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.lineTo(x, dataBottom);
      ctx.lineTo(dataLeft, dataBottom);
      ctx.lineTo(dataLeft, lastY);
      ctx.fill();
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
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
               hourInves = 0;
            }
            lastHour = hour;
         }
      }
      graphic.setFont('bold 24px Microsoft YaHei');
      graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
      graphic.setFont('22px Microsoft YaHei');
      var rowStart = top + 30;
      var rowHeight = 22;
      var textWidth = graphic.textWidth('小时峰值：');
      var textHourPeakValue = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
      var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
      var textDayTotalValue = MO.Lang.Float.unitFormat(o._investmentTotal, 0, 0, 2, 0, 10000, '万');
      var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
      var textHourAvrgValue = MO.Lang.Float.unitFormat(o._investmentTotal / 24, 0, 0, 2, 0, 10000, '万');
      var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
      var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
      graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
      graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
      graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
      graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
      graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
      graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
}
with (MO) {
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage              = null;
      o._numImages            = null;
      o._wanImage             = null;
      o._yiImage              = null;
      o._data                 = RClass.register(o, new AGetSet('_data'));
      o._startTick            = 0;
      o._popDuration          = 400;
      o._showDuration         = 0;
      o._closeDuration        = 400;
      o._fullWidth            = 953;
      o._fullHeight           = 896;
      o._popupSE              = null;
      o._listenersDataChanged = RClass.register(o, new AListener('_listenersDataChanged', MO.EEvent.DataChanged));
      o.setup                 = FGuiHistoryMilestoneFrame_setup;
      o.onPaintBegin          = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad           = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show                  = FGuiHistoryMilestoneFrame_show;
      o.dispose               = FGuiHistoryMilestoneFrame_dispose;
      return o;
   }
   MO.FGuiHistoryMilestoneFrame_setup = function FGuiHistoryMilestoneFrame_setup() {
      var o = this;
      o.setWidth(o._fullWidth);
      o.setHeight(o._fullHeight);
      o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 2);
      o.setTop((MO.Eai.Canvas.logicSize().height));
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/milestone/bg.png');
      o._wanImage = MO.Class.create(MO.FImage);
      o._wanImage.addLoadListener(o, o.onImageLoad);
      o._wanImage.loadUrl('../ars/eai/number/wan.png');
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
      var audioConsole = MO.Console.find(MO.FAudioConsole);
      o._popupSE = audioConsole.load('{eai.resource}/milestone/popup.mp3');
   }
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;
      var textLeft = hCenter - 135;
      var textTop = rectangle.top + 520;
      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var slideDistance = (MO.Eai.Canvas.logicSize().height + o._fullHeight) / 2 + 100 - o._fullHeight;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         p = 1 - (1 - p) * (1 - p);
         graphic._handle.globalAlpha = p;
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight - slideDistance * p);
      }
      else if (showTick < o._showDuration) {
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         p = p * p;
         graphic._handle.globalAlpha = 1 - p;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - 100 - slideDistance * p);
      }
      else {
         o._data = null;
         o.setVisible(false);
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight)
         o.dirty();
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         o.processDataChangedListener(dsEvent);
         return;
      }
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top, bgSize.width, bgSize.height);
      graphic.setFont('bold 28px Microsoft YaHei');
      graphic.drawText('达成日数：', textLeft, textTop + 100, '#FFE849');
      graphic.drawText('分公司数：', textLeft, textTop + 150, '#FFE849');
      graphic.drawText('理财师数：', textLeft, textTop + 200, '#FFE849');
      if (o.data()) {
         var invesText = o.data().investmentTotal().toString();
         if (invesText.length > 4) {
            invesText = invesText.substring(0, invesText.length - 4);
            var unitImage = o._yiImage;
         }
         else {
            var unitImage = o._wanImage;
         }
         var numImgSize = o._numImages[0]._size;
         var unitImgSize = o._yiImage._size;
         var numWidth = invesText.length * numImgSize.width + unitImgSize.width;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
         }
         graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
         var dataText = o.data().code();
         var textWidth = graphic.textWidth(dataText);
         dataText = dataText.substring(0, 4) + "年" + dataText.substring(4, 6) + "月" + dataText.substring(6, 8) + "日";;
         graphic.drawText(dataText, hCenter - textWidth + 20, textTop + 50, '#FFE849');
         dataText = o.data().dayCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 100, '#FFA800');
         dataText = o.data().companyCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 150, '#FFA800');
         dataText = o.data().staffCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 200, '#FFA800');
      }
      graphic._handle.globalAlpha = 1;
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
      o._popupSE.play(0);
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose() {
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with (MO) {
   MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      o._startHeight = 30;
      o._lineWidth = 5;
      o._circleRadius = 5;
      o.onPaintBegin = FGuiHistoryTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.bottom();
      var dataTop = top + 30 + o._startHeight;
      var dataBottom = bottom - 50;
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
      var investmentTotal = historyConsole.investmentTotal();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var degreeData = historyConsole.dates().get(degreeDate.format('YYYYMMDD'));
      if (degreeData.investmentTotal() * 3 < investmentTotal) {
         maxInves *= (degreeData.investmentTotal() / investmentTotal) * 3;
      }
      var pixPer10k = dataHeight * 10000 / maxInves;
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      lastY -= o._startHeight;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var dayInvestmentTotal = dateData.investmentTotal();
            var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
            y -= o._startHeight;
            var hexColor = RHex.format(rateResource.findRate(dayInvestmentTotal / investmentTotal));
            var color = '#' + hexColor.substring(2);
            var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
            graphic.drawLine(lastX, lastY, x, y, color, o._lineWidth);
            var opGradient = graphic.createLinearGradient(0, dataBottom, 0, y);
            var bottomHexColor = RHex.format(rateResource.find(0));
            var bottomOpColor = 'rgba(' + RHex.parse(bottomHexColor.substring(2, 4)) + ',' + RHex.parse(bottomHexColor.substring(4, 6)) + ',' + RHex.parse(bottomHexColor.substring(6, 8)) + ',' + '0.3)';
            opGradient.addColorStop('0', bottomOpColor);
            opGradient.addColorStop('1', opColor);
            graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, o._circleRadius, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }else{
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
            y -= o._startHeight;
            if (startDate.date.getDate() == 1) {
               graphic.setFont('bold 22px Microsoft YaHei');
               if(inves > 100000000){
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
                  var textWidth = graphic.textWidth(text);
                  graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
               }else{
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
                  var textWidth = graphic.textWidth(text);
                  graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
               }
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
         y -= o._startHeight;
         var hexColor = RHex.format(rateResource.findRate(inves / investmentTotal));
         var color = '#' + hexColor.substring(2);
         var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, o._lineWidth);
         var opGradient = graphic.createLinearGradient(0, dataBottom, 0, y);
         var bottomHexColor = RHex.format(rateResource.find(0));
         var bottomOpColor = 'rgba(' + RHex.parse(bottomHexColor.substring(2, 4)) + ',' + RHex.parse(bottomHexColor.substring(4, 6)) + ',' + RHex.parse(bottomHexColor.substring(6, 8)) + ',' + '0.3)';
         opGradient.addColorStop('0', bottomOpColor);
         opGradient.addColorStop('1', opColor);
         graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), o._circleRadius, 0, color, color);
         graphic.setFont('bold 22px Microsoft YaHei');
         if(inves > 100000000){
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
            var textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
         }else{
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
            var textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }
}
MO.FGuiLivePop = function FGuiLivePop(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._bgImage       = null;
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));
   o._startTick     = 0;
   o._popDuration   = 500;
   o._showDuration  = 2000;
   o._closeDuration = 500;
   o._fullWidth     = 910;
   o._fullHeight    = 140;
   o._riseHeight    = 50;
   o._date          = null;
   o.construct      = MO.FGuiLivePop_construct;
   o.setup          = MO.FGuiLivePop_setup;
   o.onPaintBegin   = MO.FGuiLivePop_onPaintBegin;
   o.onImageLoad    = MO.FGuiLivePop_onImageLoad;
   o.show           = MO.FGuiLivePop_show;
   o.dispose        = MO.FGuiLivePop_dispose;
   return o;
}
MO.FGuiLivePop_construct = function FGuiLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._date = new MO.TDate();
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
   o._date.parse(entity.date());
   popText += o._date.format('HH24:MI:SS');
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
      graphic._handle.globalAlpha = p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
   }
   else if (showTick < o._showDuration) {
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
   }
   else if (closeTick < o._closeDuration) {
      p = closeTick / o._closeDuration;
      graphic._handle.globalAlpha = 1 - p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
   }
   else {
      o._data = null;
      o.setVisible(false);
      o.dirty();
      return;
   }
}
MO.FGuiLivePop_show = function FGuiLivePop_show() {
   o = this;
   o.setVisible(true);
   o._startTick = MO.Timer.current();
   o.dirty();
}
MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiLiveTable = function FGuiLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._data                 = MO.Class.register(o, new MO.AGetSet('_data'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
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
   o._tableCount           = 0;
   o._entities             = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   o.oeUpdate              = MO.FGuiLiveTable_oeUpdate;
   o.construct             = MO.FGuiLiveTable_construct;
   o.setup                 = MO.FGuiLiveTable_setup;
   o.pushEntity            = MO.FGuiLiveTable_pushEntity;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}
MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var calculateRate = event.calculateRate;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   var widthDefine = 0;
   for(var i = 0; i < 4; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 7;
   }
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '钰诚控股 - e租宝';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (right - left) / 2 - (titleWidth / 2);
   if(o._logoImage.testReady()){
      graphic.drawImage(o._logoImage, textLeft - 77, top + 32, 62, 62);
   }
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, o._rankStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop - 6, 167, 40);
   var rankEntity = o._rank;
   if(rankEntity){
      var tableText = '';
      var tableTextWidth = 0;
      var dataEntities = o._data;
      var count = rankEntity.count();
      tableTop += 80;
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < 4; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i] - 4, o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + (o._columnWidths[i] - headTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i];
   }
   var dataEntities = o._data;
   if(dataEntities){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      var entities = o._entities;
      graphic.clip(drawLeft, tableTop, drawWidth - 38, o._rowHeight * (o._tableCount - 1));
      tableTop += 24;
      var count = entities.count();
      for(var i = 0; i < count; i++) {
         var entity = entities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + o._rowHeight * i + o._lineScroll, drawWidth);
      }
   }
}
MO.FGuiLiveTable_oeUpdate = function FGuiLiveTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._lineScroll < 0){
         o._lineScroll++;
         if(o._lineScroll == 0){
            var entities = o._entities;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
         }
         o.dirty();
      }
   }
}
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._entities = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
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
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   o._headFontStyle = 'bold 38px Microsoft YaHei';
   if(MO.Runtime.isPlatformMobile()){
      o._tableCount = 12;
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
      o._tableCount = 19;
      o._rankStart = 120;
      o._rankHeight = 219;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '24px Microsoft YaHei';
      o._rowStart = 382;
      o._rowHeight = 36;
   }
}
MO.FGuiLiveTable_pushEntity = function FGuiLiveTable_pushEntity(entity){
   var o = this;
   if(!entity){
      return null;
   }
   var entities = o._entities;
   entities.unshift(entity);
   o._lineScroll -= o._rowHeight;
   if(entities.count() >= o._tableCount){
      entities.pop();
   }
}
MO.FGuiLiveTable_drawRow = function FGuiLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#E5BD1D';
   }else{
      fontColor = '#59FDE9';
   }
   if(flag){
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX - 6, imageY - 28, 58, 65);
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
      graphic.drawText(text, x + widths[0] * 0.5 - textWidth * 0.5, y, fontColor);
   }
   x += widths[0];
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityResource = cityConsole.findByCard(entity.card());
   text = '';
   if(cityResource){
      text = cityResource.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[1];
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[2];
   var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   var investmentRight = x + widths[3] - 15;
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
      graphic.drawText(high, investmentRight - lowWidth - highWidth, y, highColor);
      graphic.drawText(low, investmentRight - lowWidth, y, '#59FDE9');
   } else {
      text = investment;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, investmentRight - textWidth, y, fontColor);
   }
}
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
