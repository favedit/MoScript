with(MO){
   MO.MEaiCityRenderable = function MEaiCityRenderable(o){
      o = RClass.inherits(this, o);
      o._visible  = RClass.register(o, new AGetter('_visible'), true);
      o._location = RClass.register(o, new AGetter('_location'));
      o._size     = RClass.register(o, new AGetter('_size'));
      o._color    = RClass.register(o, new AGetter('_color'));
      o.construct = MEaiCityRenderable_construct;
      o.dispose   = MEaiCityRenderable_dispose;
      return o;
   }
   MO.MEaiCityRenderable_construct = function MEaiCityRenderable_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(1, 1, 1, 1);
   }
   MO.MEaiCityRenderable_dispose = function MEaiCityRenderable_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
   }
}
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
      o._positions = new Float32Array(3 * vertexCount);
      for(var i = 0; i < vertexCount; i++){
         o._positions[index++] = input.readFloat();
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
      o._positions = RObject.dispose(o._positions);
      o._indexes = null;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity, MEaiCityRenderable);
      o._data     = RClass.register(o, new AGetSet('_data'));
      o.construct = FEaiCityEntity_construct;
      o.build     = FEaiCityEntity_build;
      o.update    = FEaiCityEntity_update;
      o.dispose   = FEaiCityEntity_dispose;
      return o;
   }
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o.__base.MEaiCityRenderable.construct.call(o);
   }
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var total = Math.sqrt(data.investmentTotal()) / 100;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         o._color.set(total, 0, total, total);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = Math.sqrt(range);
      if(range < 1){
         range = 1;
      }
      if(range > 3){
         range = 3;
      }
      o._size.set(range, range);
   }
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      o.__base.MEaiCityRenderable.dispose.call(o);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCitysRangeRenderable = function FEaiCitysRangeRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._image                = null;
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._citySize             = RClass.register(o, new AGetter('_citySize'));
      o._vertexPositionBuffer = null;
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
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0, width, height);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRangeRenderable_construct = function FEaiCitysRangeRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FEaiCitysRangeRenderable_testReady = function FEaiCitysRangeRenderable_testReady(){
      return this._ready;
   }
   MO.FEaiCitysRangeRenderable_setup = function FEaiCitysRangeRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'control';
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
      var vertexTotal = o._vertexCount = 4 * count;
      var vertexCount = 4 * count;
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var coordPosition = 0;
      var coordData = new Float32Array(2 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var size = city.size();
            var width = size.width / 2;
            var height = size.height / 2;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            var color = city.color();
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = color.red * 255;
               colorData[colorPosition++] = color.green * 255;
               colorData[colorPosition++] = color.blue * 255;
               colorData[colorPosition++] = color.alpha * 255;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      var n = 0;
      var indexCount = 3 * 2 * count;
      var indexData = new Uint16Array(indexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         var index = 4 * i;
         if(city.visible()){
            indexData[n++] = index + 0;
            indexData[n++] = index + 1;
            indexData[n++] = index + 2;
            indexData[n++] = index + 0;
            indexData[n++] = index + 2;
            indexData[n++] = index + 3;
         }
      }
      o._indexBuffer.upload(indexData, indexCount);
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
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
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
      o._citys                = RClass.register(o, new AGetter('_citys'));
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
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
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0, width, height);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FEaiCitysRenderable_construct = function FEaiCitysRenderable_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FEaiCitysRenderable_testReady = function FEaiCitysRenderable_testReady(){
      return this._ready;
   }
   MO.FEaiCitysRenderable_setup = function FEaiCitysRenderable_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      o.pushVertexBuffer(buffer);
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'control';
      materialInfo.optionAlpha = true;
      o._material._textures = o._textures;
      o.loadUrl('/script/ars/eai/dot.png');
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
      var vertexTotal = o._vertexCount = 4 * count;
      var vertexCount = 4 * count;
      var vertexPosition = 0;
      var vertexData = new Float32Array(3 * vertexCount);
      var coordPosition = 0;
      var coordData = new Float32Array(2 * vertexCount);
      var colorPosition = 0;
      var colorData = new Uint8Array(4 * vertexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         if(city.visible()){
            var location = city.location();
            var size = city.size();
            var width = 0.4;
            var height = 0.4;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y + height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x + width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            vertexData[vertexPosition++] = location.x - width;
            vertexData[vertexPosition++] = location.y - height;
            vertexData[vertexPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 1;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            coordData[coordPosition++] = 0;
            var color = city.color();
            for(var v = 0; v < 4; v++){
               colorData[colorPosition++] = color.red * 255;
               colorData[colorPosition++] = color.green * 255;
               colorData[colorPosition++] = color.blue * 255;
               colorData[colorPosition++] = color.alpha * 255;
            }
         }
      }
      o._vertexPositionBuffer.upload(vertexData, 4 * 3, vertexCount);
      o._vertexCoordBuffer.upload(coordData, 4 * 2, vertexCount);
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      var n = 0;
      var indexCount = 3 * 2 * count;
      var indexData = new Uint16Array(indexCount);
      for(var i = 0; i < total; i++){
         var city = citys.at(i);
         var index = 4 * i;
         if(city.visible()){
            indexData[n++] = index + 0;
            indexData[n++] = index + 1;
            indexData[n++] = index + 2;
            indexData[n++] = index + 0;
            indexData[n++] = index + 2;
            indexData[n++] = index + 3;
         }
      }
      o._indexBuffer.upload(indexData, indexCount);
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
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
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
      o._cameraDirection     = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration  = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.onMouseDown = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setCameraDirection(new SVector3(0.02, -0.9, 0.5));
      o.setCameraFrom(new SPoint3());
      o.setCameraTo(new SPoint3());
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(o.cameraDirection().x, o.cameraDirection().y, o.cameraDirection().z);
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         renderable.material().info().optionAlpha = true;
      }
      o.setStartTime(new Date());
   }
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else if(o.cameraMoving()) {
         o.cameraMoveAnime();
      }
      else{
         o.mouseOverFallAnime();
      }
   }
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime(){
      var o = this;
      var sprite = o.template().sprite();
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      if (timePassed < o.startDelay()) {
         return;
      }
      else{
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * sprite.renderables().count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
         var matrix = renderable.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
			risePercentage = 1;
			fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
			if (fallPercentage > 1) {
				fallPercentage = 1;
			}
         }
         matrix.ty = o.riseDistance() * risePercentage - o.fallDistance() * fallPercentage;
         matrix.updateForce();
      }
   }
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      var now = new Date();
      if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
         return;
      }
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (o.mouseOverRiseRenderable() != renderable) {
         if (o.mouseOverRiseRenderable()) {
            o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
         }
         o.setMouseOverRiseRenderable(renderable);
         if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
         	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
         }
      }
   }
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
         var renderable = o.mouseOverFallArray().at(i);
         var matrix = renderable.matrix();
         if (matrix.ty > o.riseDistance() - o.fallDistance()) {
         	matrix.ty -= 1;
         }
         else {
         	matrix.ty = o.riseDistance() - o.fallDistance();
         	o.mouseOverFallArray().erase(i);
         }
         matrix.updateForce();
      }
      if (o.mouseOverRiseRenderable()) {
         var riseMatrix = o.mouseOverRiseRenderable().matrix();
         if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
         	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
         	riseMatrix.updateForce();
         }
      }
   }
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      var content = event.content;
      var branchCount = new Object();
      for (var i = 0; i < content.collection.length; i++) {
         if(!branchCount[content.collection[i].province_id]){
            if(content.collection[i].province_id == null)
            {
            }
            branchCount[content.collection[i].province_id] = 1;
         }
         else{
            branchCount[content.collection[i].province_id]++;
            if (content.collection[i].province_id == null) {
               content.collection[i].label;
            }
         }
      }
      var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      var dict = logicConsole.organization().dict();
      var colors = logicConsole.organization().provinceColors();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         if (!bc) {
            bc = 0;
         }
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
         var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		 ambientColor.assign(colors.at(colorLv));
         renderable.material().update();
      }
   }
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
      var region = o.template().region();
      var camera = region.camera();
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (!renderable) {
         camera.setPosition(3, 24, -0.5);
         camera.update();
         return;
      }
      var outline = renderable.calculateOutline();
      var relativeOutline = new SOutline3d();
      relativeOutline.calculateFrom(outline, camera.matrix());
      var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
      var currentCenter = outline.center;
      var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
      var cameraPosition = camera.position();
      o.setStartTime(new Date());
      o.cameraFrom().assign(cameraPosition);
      o.cameraTo().assign(cameraTo);
      o.setCameraMoving(true);
   }
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      var p = timePassed / o.cameraMoveDuration();
      if (p >= 1) {
         p = 1;
         o.setCameraMoving(false);
      }
      p = 1-(1-p)*(1-p);
      var movingPosition = new SPoint3();
      movingPosition.slerp(o.cameraFrom(), o.cameraTo(), p);
      var camera = o.template().region().camera();
      camera.position().assign(movingPosition);
      camera.update();
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         if (renderable != o.mouseOverRiseRenderable()) {
            renderable.material().info().alphaRate = 1.5 - p;
            renderable.material().update();
         }
      }
   }
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
      o._data             = RClass.register(o, new AGetSet('_data'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o.construct         = FEaiProvinceEntity_construct;
      o.build             = FEaiProvinceEntity_build;
      o.update            = FEaiProvinceEntity_update;
      o.dispose           = FEaiProvinceEntity_dispose;
      return o;
   }
   MO.FEaiProvinceEntity_construct = function FEaiProvinceEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiProvinceEntity_build = function FEaiProvinceEntity_build(context){
      var o = this;
      var color = o._color;
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
      var vertexStart = 0;
      var vertexIndex = 0;
      var faceIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal);
      var faceData = new Uint16Array(indexTotal);
      var borderIndex = 0;
      var borderData = new Uint16Array(2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positionTotal = 3 * positionCount;
         var positions = boundary.positions();
         for(var i = 0; i < positionTotal; i++){
            vertexData[vertexIndex++] = positions[i];
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
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
      var colorIndex = 0;
      var colors = o.colorsData = new Uint8Array(4 * vertexTotal);
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0;
         colors[colorIndex++] = 0
         colors[colorIndex++] = 0;
         colors[colorIndex++] = 255;
      }
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
      var colorIndex = 0;
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x4B;
         colors[colorIndex++] = 0x59;
         colors[colorIndex++] = 0x64;
         colors[colorIndex++] = 255;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable._indexBuffer.setLineWidth(1);
      renderable._indexBuffer.upload(borderData, borderIndex);
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.24, 0.2);
      matrix.update();
   }
   MO.FEaiProvinceEntity_update = function FEaiProvinceEntity_update(data){
      var o = this;
      var investmentTotal = data.investmentTotal();
      var rate = Math.sqrt(investmentTotal) / 100;
      if(rate > 255){
         rate = 255;
      }
      var colorIndex = 0;
      var colors = o.colorsData;
      for(var i = 0; i < o._vertexTotal; i++){
         colors[colorIndex++] = rate;
         colors[colorIndex++] = 0;
         colors[colorIndex++] = 0;
         colors[colorIndex++] = 255;
      }
      var renderable = o._faceRenderable;
      renderable.vertexColorBuffer().upload(colors, 1 * 4, o._vertexTotal);
   }
   MO.FEaiProvinceEntity_dispose = function FEaiProvinceEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
