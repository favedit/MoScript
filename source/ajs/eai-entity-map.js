MO.FEaiBoundaryData = function FEaiBoundaryData(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity, MO.ME3dBoundaryPolygon);
   o.construct   = MO.FEaiBoundaryData_construct;
   o.unserialize = MO.FEaiBoundaryData_unserialize;
   o.dispose     = MO.FEaiBoundaryData_dispose;
   return o;
}
MO.FEaiBoundaryData_construct = function FEaiBoundaryData_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o.__base.ME3dBoundaryPolygon.construct.call(o);
}
MO.FEaiBoundaryData_unserialize = function FEaiBoundaryData_unserialize(input){
   var o = this;
   var index = 0;
   var vertexCount = o._positionCount = input.readInt32();
   var positions = o._positions = new Float32Array(2 * vertexCount);
   for(var i = 0; i < vertexCount; i++){
      positions[index++] = input.readFloat();
      positions[index++] = input.readFloat();
   }
   var indexCount = o._indexCount = input.readInt32();
   var indexes = o._indexes = new Uint16Array(indexCount);
   for(var i = 0; i < indexCount; i++){
      indexes[i] = input.readUint16();
   }
   if(vertexCount > 10000){
      console.log('Boundary: vertex=' + vertexCount + ' index=' + indexCount);
   }
}
MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
   var o = this;
   o.__base.ME3dBoundaryPolygon.dispose.call(o);
   o.__base.FEaiEntity.dispose.call(o);
}
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
MO.FEaiCityEntity = function FEaiCityEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._provinceEntity         = MO.Class.register(o, new MO.AGetSet('_provinceEntity'));
   o._visible                = MO.Class.register(o, new MO.AGetter('_visible'), false);
   o._location               = MO.Class.register(o, new MO.AGetter('_location'));
   o._size                   = MO.Class.register(o, new MO.AGetter('_size'));
   o._color                  = MO.Class.register(o, new MO.AGetter('_color'));
   o._range                  = MO.Class.register(o, new MO.AGetter('_range'), 1);
   o._rangeColor             = MO.Class.register(o, new MO.AGetter('_rangeColor'));
   o._cityTotal              = 0;
   o._investmentCount        = 0;
   o._investmentTotal        = MO.Class.register(o, new MO.AGetSet('_investmentTotal'), 0);
   o._investmentLevel        = 0;
   o._investmentLast         = 0;
   o._investmentRateTotal    = 0;
   o._investmentRate         = 0;
   o._investmentAlpha        = 0;
   o._investmentRange        = 0;
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
   var matrix = MO.Lang.Math.matrix;
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
MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(level, investment){
   var o = this;
   o._investmentCount++;
   o._investmentTotal += investment;
   if(investment < o._investmentLast){
      return;
   }
   var range = 200000;
   var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
   var rateResource = rateConsole.find(MO.EEaiRate.InvestmentRange);
   var color = rateResource.findRate(investment / range);
   o._color.set(1, 1, 1, 1);
   o._rangeColor.setInteger(color);
   o._rangeColor.alpha = 1;
   o._investmentLast = investment;
   o._investmentRateTotal = (level + 1) * 100000;
   o._investmentRate = o._investmentRateTotal;
   o._investmentRange = Math.log(investment * investment) / 10;
   o._investmentAlpha = 8;
   o._visible = true;
}
MO.FEaiCityEntity_reset = function FEaiCityEntity_reset(){
   var o = this;
   o._visible = false;
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
   o._rangeColor.setIntAlpha(color, rate * 0.6);
   o._range = MO.Lang.Float.toRange(Math.sqrt(range), 1, 6);
}
MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
   var o = this;
   if(o._investmentRate > 0){
      var rate = o._investmentRate / o._investmentRateTotal;
      o._range = o._investmentRange * rate;
      var alpha = Math.min(o._investmentAlpha * rate, 1);
      o._color.alpha = alpha;
      o._rangeColor.alpha = alpha;
      o._investmentRate--;
      return true;
   }else{
      o._investmentLast = 0;
      o._investmentRate = 0;
      o._investmentRange = 0;
      o._investmentAlpha = 0;
      o._visible = false;
      return false;
   }
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
MO.FEaiCountryData = function FEaiCountryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._code          = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label         = MO.Class.register(o, new MO.AGetSet('_label'));
   o._boundaries    = MO.Class.register(o, new MO.AGetter('_boundaries'));
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
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
   o._boundaries = new MO.TObjects();
   o._provinces = new MO.TDictionary();
}
MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
   var o = this;
   var data = event.content;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
}
MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
   var o = this;
   o._code = input.readString();
   o._label = input.readString();
   var boundaries = o._boundaries;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var boundary = MO.Class.create(MO.FEaiBoundaryData);
      boundary.unserialize(input);
      boundaries.push(boundary);
   }
   var provinces = o._provinces;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceData);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiCountryData_load = function FEaiCountryData_load(){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{eai.resource}/country.dat');
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoaded);
}
MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiCountryEntity = function FEaiCountryEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._enterSELoaded           = false;
   o._enterSEPlaying          = false;
   o._cameraDirection         = MO.Class.register(o, new MO.AGetSet('_cameraDirection'));
   o._startDelay              = MO.Class.register(o, new MO.AGetSet('_startDelay'), 0);
   o._riseDuration            = MO.Class.register(o, new MO.AGetSet('_riseDuration'), 5000);
   o._riseDistance            = MO.Class.register(o, new MO.AGetSet('_riseDistance'), 600);
   o._fallDuration            = MO.Class.register(o, new MO.AGetSet('_fallDuration'), 200);
   o._fallDistance            = MO.Class.register(o, new MO.AGetSet('_fallDistance'), 3);
   o._blockInterval           = MO.Class.register(o, new MO.AGetSet('_blockInterval'), 200);
   o._mouseOverRiseHeight     = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseHeight'), 3);
   o._mouseMoveCheckInterval  = MO.Class.register(o, new MO.AGetSet('_mouseMoveCheckInterval'), 100);
   o._cameraMoveDuration      = MO.Class.register(o, new MO.AGetSet('_cameraMoveDuration'), 500);
   o._worldEntity             = MO.Class.register(o, new MO.AGetSet('_worldEntity'));
   o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities            = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._boundaryShape           = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._faceShape               = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape             = MO.Class.register(o, new MO.AGetter('_borderShape'));
   o._provinceArray           = null;
   o._playing                 = false;
   o._lastTick                = 0;
   o._interval                = 10;
   o._template                = MO.Class.register(o, new MO.AGetSet('_template'));
   o._introAnimeDone          = MO.Class.register(o, new MO.AGetSet('_introAnimeDone'), false);
   o._startTime               = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._mouseOverRiseRenderable = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseRenderable'));
   o._mouseOverFallArray      = MO.Class.register(o, new MO.AGetSet('_mouseOverFallArray'));
   o._mouseMoveLastCheck      = MO.Class.register(o, new MO.AGetSet('_mouseMoveLastCheck'));
   o._cameraMoving            = MO.Class.register(o, new MO.AGetSet('_cameraMoving'), false);
   o._cameraFrom              = MO.Class.register(o, new MO.AGetSet('_cameraFrom'));
   o._cameraTo                = MO.Class.register(o, new MO.AGetSet('_cameraTo'));
   o._audioContext            = null;
   o._audioMapEnter           = null;
   o.construct                = MO.FEaiCountryEntity_construct;
   o.setup                    = MO.FEaiCountryEntity_setup;
   o.setupProvinces           = MO.FEaiCountryEntity_setupProvinces;
   o.loadData                 = MO.FEaiCountryEntity_loadData;
   o.loadProvinceData         = MO.FEaiCountryEntity_loadProvinceData;
   o.start                    = MO.FEaiCountryEntity_start;
   o.process                  = MO.FEaiCountryEntity_process;
   o.introAnime               = MO.FEaiCountryEntity_introAnime;
   o.onMouseMove              = MO.FEaiCountryEntity_onMouseMove;
   o.onMouseDown              = MO.FEaiCountryEntity_onMouseDown;
   o.mouseOverFallAnime       = MO.FEaiCountryEntity_mouseOverFallAnime;
   o.onOrganizationFetch      = MO.FEaiCountryEntity_onOrganizationFetch;
   o.cameraMoveAnime          = MO.FEaiCountryEntity_cameraMoveAnime;
   o.provinceShowOrderSort    = MO.FEaiCountryEntity_provinceShowOrderSort;
   o.isReady                  = MO.FEaiCountryEntity_isReady;
   return o;
}
MO.FEaiCountryEntity_construct = function FEaiCountryEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup() {
   var o = this;
   var shape = o._boundaryShape = MO.Class.create(MO.EE3dBoundaryShape);
   shape.linkGraphicContext(o);
   var shape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   shape.linkGraphicContext(o);
   var shape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   shape.linkGraphicContext(o);
}
MO.FEaiCountryEntity_setupProvinces = function FEaiCountryEntity_setupProvinces(provinceEntities) {
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
   var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
   var audioContext = o._audioContext = audioContextConsole.create();
   o._audioMapEnter = audioContext.createBuffer('{eai.resource}/map_entry/enter.mp3');
}
MO.FEaiCountryEntity_loadData = function FEaiCountryEntity_loadData(data){
   var o = this;
   var shape = o._boundaryShape;
   var boundaries = data.boundaries();
   var count = boundaries.count()
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      shape.pushPolygon(boundary);
   }
   shape.build();
}
MO.FEaiCountryEntity_loadProvinceData = function FEaiCountryEntity_loadProvinceData(data){
   var o = this;
   var provinceEntities = o._provinceEntities;
   var faceShape = o._faceShape;
   var borderShape = o._borderShape;
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntityConsole = MO.Console.find(MO.FEaiEntityConsole).provinceConsole();
   var provincesData = data.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var provinceResource = provinceConsole.findByCode(provinceCode);
      MO.Assert.debugNotNull(provinceResource);
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setResource(provinceResource);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      provinceEntities.set(provinceCode, provinceEntity);
      provinceEntityConsole.push(provinceEntity);
      var faceRenderable = provinceEntity.faceRenderable();
      faceShape.pushMergeRenderable(faceRenderable);
      var borderRenderable = provinceEntity.borderRenderable();
      borderShape.pushMergeRenderable(borderRenderable);
   }
   faceShape.build();
   borderShape.build();
   return;
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
}
MO.FEaiCountryEntity_isReady = function FEaiCountryEntity_isReady() {
   var o = this;
   if(o._audioMapEnter.testFinish()){
      o._startTime = MO.Timer.current();
      return true;
   }
   return false;
}
MO.FEaiCountryEntity_provinceShowOrderSort = function FEaiCountryEntity_provinceShowOrderSort(p1, p2) {
   var pResConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
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
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseMove;
         MO.Window.lsnsMouseMove.push(listener);
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseDown;
         MO.Window.lsnsMouseDown.push(listener);
      }
   }
   if (!o._enterSEPlaying) {
      o._audioMapEnter.play(0);
      o._enterSEPlaying = true;
   }
   var idxCap = timePassed / o.blockInterval();
   for (var i = 0; i < o._provinceArray.length && i < idxCap; i++) {
      var fr = o._provinceArray[i].faceRenderable();
      var br = o._provinceArray[i].borderRenderable();
      var frm = fr.matrix();
      var brm = br.matrix();
      var risePercentage = (timePassed - o.blockInterval() * i) / (o.riseDuration() - i * i);
      var fallPercentage = 0;
      if (risePercentage > 1) {
         risePercentage = 1;
         fallPercentage = (timePassed - o.blockInterval() * i - (o.riseDuration() - i * i)) / o.fallDuration();
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
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
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
   o.showCountry           = MO.FEaiMapEntity_showCountry;
   o.showWorld             = MO.FEaiMapEntity_showWorld;
   o.process               = MO.FEaiMapEntity_process;
   o.reset                 = MO.FEaiMapEntity_reset;
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}
MO.FEaiMapEntity_setup = function FEaiMapEntity_setup(){
   var o = this;
   var countryEntity = o._countryEntity = MO.Class.create(MO.FEaiCountryEntity);
   countryEntity.linkGraphicContext(o);
   countryEntity.setup();
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplayContainer);
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
   o._countryEntity.setupProvinces(provinceEntities);
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
MO.FEaiMapEntity_showCountry = function FEaiMapEntity_showCountry(){
   var o = this;
   var countryEntity = o._countryEntity;
   o._countryDisplay.push(countryEntity.faceShape());
   o._countryBorderDisplay.push(countryEntity.borderShape());
}
MO.FEaiMapEntity_showWorld = function FEaiMapEntity_showWorld(){
   var o = this;
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapConsole().worldEntity();
   o._countryDisplay.push(worldEntity.sphere());
   o._countryDisplay.push(worldEntity._sphere2);
   o._countryDisplay.push(worldEntity._sphere3);
   o._countryDisplay.push(worldEntity.faceShape());
   o._countryBorderDisplay.push(worldEntity.borderShape());
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
MO.FEaiMapEntityConsole = function FEaiMapEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener, MO.MGraphicObject);
   o._worldEntity     = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   o._countryEntities = MO.Class.register(o, new MO.AGetter('_countryEntities'));
   o.construct        = MO.FEaiMapEntityConsole_construct;
   o.loadCountry      = MO.FEaiMapEntityConsole_loadCountry;
   o.loadWorld        = MO.FEaiMapEntityConsole_loadWorld;
   o.dispose          = MO.FEaiMapEntityConsole_dispose;
   return o;
}
MO.FEaiMapEntityConsole_construct = function FEaiMapEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._countryEntities = new MO.TDictionary();
}
MO.FEaiMapEntityConsole_loadCountry = function FEaiMapEntityConsole_loadCountry(context, code){
   var o = this;
  var entities = o._countryEntities;
   var entity = entities.find(code);
   if(entity){
      return entity;
   }
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadCountry(code);
   entity = MO.Class.create(MO.FEaiCountryEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEaiEntityConsole).loadEntity(entity);
   entities.set(code, entity);
   return entity;
}
MO.FEaiMapEntityConsole_loadWorld = function FEaiMapEntityConsole_loadWorld(context){
   var o = this;
   var entity = o._worldEntity;
   if(entity){
      return entity;
   }
   var resource = MO.Console.find(MO.FEaiResourceConsole).mapConsole().loadWorld();
   entity = o._worldEntity = MO.Class.create(MO.FEaiWorldEntity);
   entity.linkGraphicContext(context);
   entity.setResource(resource);
   entity.setup();
   MO.Console.find(MO.FEaiEntityConsole).loadEntity(entity);
   return entity;
}
MO.FEaiMapEntityConsole_dispose = function FEaiMapEntityConsole_dispose(){
   var o = this;
   o._countryEntities = MO.Lang.Object.dispose(o._countryEntities);
   o.__base.FConsole.dispose.call(o);
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
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._resource         = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._boundaryShape    = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
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
   o.setup             = MO.FEaiProvinceEntity_setup;
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
MO.FEaiProvinceEntity_setup = function FEaiProvinceEntity_setup() {
   var o = this;
   var shape = o._boundaryShape = MO.Class.create(MO.FE3dBoundary);
   shape.linkGraphicContext(o);
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
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
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
      continue;
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
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.color().setHex('#080D19');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
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
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
   renderable.indexBuffer().setLineWidth(1);
   renderable.indexBuffer().upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
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
      indexTotal += boundary.indexCount();
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
   if(rate > 255){
      rate = 255;
   }
}
MO.FEaiProvinceEntity_updateColor = function FEaiProvinceEntity_updateColor(rate){
   var o = this;
   var color = o._focusColor;
   var rate = o._focusCurrent / o._focusCount;
   var red = 0x08 + ((color[0] - 0x08)* rate);
   var green = 0x0D + ((color[1] - 0x0D)* rate);
   var blue = 0x19 + ((color[2] - 0x19)* rate);
   var alpha = 0xFF;
   o._faceRenderable.color().set(red / 255, green / 255, blue / 255, alpha / 255);
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
MO.FEaiWorldEntity = function FEaiWorldEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity, MO.MListener);
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._material         = MO.Class.register(o, new MO.AGetter('_material'));
   o._countries        = MO.Class.register(o, new MO.AGetter('_countries'));
   o._sphere           = MO.Class.register(o, new MO.AGetter('_sphere'));
   o._faceShape        = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape      = MO.Class.register(o, new MO.AGetter('_borderShape'));
   o._statusImageReady = false;
   o.onImageLoad       = MO.FEaiWorldEntity_onImageLoad;
   o.construct         = MO.FEaiWorldEntity_construct;
   o.setup             = MO.FEaiWorldEntity_setup;
   o.loadResource      = MO.FEaiWorldEntity_loadResource;
   o.processLoad       = MO.FEaiWorldEntity_processLoad;
   o.dispose           = MO.FEaiWorldEntity_dispose;
   return o;
}
MO.FEaiWorldEntity_onImageLoad = function FEaiWorldEntity_onImageLoad(event){
   var o = this;
   var context = o._graphicContext;
   var image = event.sender;
   o._texture.upload(image);
   image.dispose();
   o._statusImageReady = true;
}
MO.FEaiWorldEntity_construct = function FEaiWorldEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   o._countries = new MO.TObjects();
   var material = o._material = MO.Class.create(MO.FE3dMaterial);
   material.info().effectCode = 'eai.world.face';
}
MO.FEaiWorldEntity_setup = function FEaiWorldEntity_setup(){
   var o = this;
   var context = o._graphicContext;
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(context);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(context);
   var sphere = o._sphere = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.98);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = true;
   info.alphaRate = 0.6;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var sphere = o._sphere2 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(16);
   sphere.setup();
   sphere.matrix().setScaleAll(0.97);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = false;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var sphere = o._sphere3 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(1.2);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = false;
   info.alphaRate = 0.05;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   var texture = o._texture = context.createFlatTexture();
   o._material.setTexture('diffuse', texture);
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('{eai.resource}/world/color.jpg');
}
MO.FEaiWorldEntity_loadResource = function FEaiWorldEntity_loadResource(resource){
   var o = this;
   var data = resource.data();
   var countries = o._countries
   var countriesData = data.countries();
   var count = countriesData.count();
   for(var i = 0; i < count; i++){
      var countryData = countriesData.at(i);
      var country = MO.Class.create(MO.FEaiCountryEntity);
      country.linkGraphicContext(o);
      country.setWorldEntity(o);
      country.setup();
      country.loadData(countryData);
      var faceRenderable = country.boundaryShape().faceRenderable();
      faceRenderable._material = o._material;
      faceRenderable._texture = o._material.textures();
      countries.push(country);
   }
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(o);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(o);
   for(var i = 0; i < count; i++){
      var countryEntity = countries.at(i);
      var boundaryShape = countryEntity.boundaryShape();
      faceShape.pushMergeRenderable(boundaryShape.faceRenderable());
      borderShape.pushMergeRenderable(boundaryShape.borderRenderable());
   }
   faceShape.build();
   borderShape.build();
}
MO.FEaiWorldEntity_processLoad = function FEaiWorldEntity_processLoad(){
   var o = this;
   if(!o._statusImageReady){
      return false;
   }
   var resource = o._resource;
   if(resource.testReady()){
      o.loadResource(resource);
      o._statusReady = true;
      return true;
   }
   return false;
}
MO.FEaiWorldEntity_dispose = function FEaiWorldEntity_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   o.__base.FEaiEntity.dispose.call(o);
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
