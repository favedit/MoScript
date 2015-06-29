with(MO){
   MO.FEaiStatisticsInvement = function FEaiStatisticsInvement(o){
      o = RClass.inherits(this, o, FObject);
      o._beginDate    = RClass.register(o, new AGetter('_beginDate'));
      o._endDate      = RClass.register(o, new AGetter('_endDate'));
      o._entities     = RClass.register(o, new AGetter('_entities'));
      o._showEntities = RClass.register(o, new AGetter('_showEntities'));
      o._dataTicker   = null;
      o.onInvestment  = FEaiStatisticsInvement_onInvestment;
      o.construct     = FEaiStatisticsInvement_construct;
      o.process       = FEaiStatisticsInvement_process;
      o.dispose       = FEaiStatisticsInvement_dispose;
      return o;
   }
   MO.FEaiStatisticsInvement_onInvestment = function FEaiStatisticsInvement_onInvestment(event){
      var o = this;
      var content = event.content;
      var dataset = content.collection;
      var count = dataset.length;
      for(var i = 0; i < count; i++){
         var row = dataset[i];
         var entity = RClass.create(FEaiStatisticsInvementEntity);
         entity.loadData(row);
         o._entities.push(entity);
      }
   }
   MO.FEaiStatisticsInvement_construct = function FEaiStatisticsInvement_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._beginDate = new TDate();
      o._endDate = new TDate();
      o._entities = new TObjects();
      o._dataTicker = new TTicker(1000 * 60 * 1);
   }
   MO.FEaiStatisticsInvement_process = function FEaiStatisticsInvement_process(){
      var o = this;
      if(o._dataTicker.process()){
         debugger
         var statistics = RConsole.find(FEaiLogicConsole).statistics();
         var beginDate = o._beginDate;
         var endDate = o._endDate;
         endDate.assign(beginDate);
         endDate.addMinute();
         statistics.doInvestment(o, o.onInvestment, beginDate.format(), endDate.format());
         beginDate.assign(o._endDate);
      }
      o._lastDataTick = 0;
   }
   MO.FEaiStatisticsInvement_dispose = function FEaiStatisticsInvement_dispose(){
      var o = this;
      o._entities = RObject.dispose(o._entities);
      o._dataTicker = RObject.dispose(o._dataTicker);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvementEntity = function FEaiStatisticsInvementEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._date       = RClass.register(o, new AGetter('_date'));
      o._customer   = RClass.register(o, new AGetter('_customer'));
      o._phone      = RClass.register(o, new AGetter('_phone'));
      o._card       = RClass.register(o, new AGetter('_card'));
      o._investment = RClass.register(o, new AGetter('_investment'));
      o._renderable = RClass.register(o, new AGetter('_renderable'));
      o.construct   = FEaiStatisticsInvementEntity_construct;
      o.loadData    = FEaiStatisticsInvementEntity_loadData;
      o.update      = FEaiStatisticsInvementEntity_update;
      o.dispose     = FEaiStatisticsInvementEntity_dispose;
      return o;
   }
   MO.FEaiStatisticsInvementEntity_construct = function FEaiStatisticsInvementEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiStatisticsInvementEntity_loadData = function FEaiStatisticsInvementEntity_loadData(data){
      var o = this;
      o._date = data.date;
      o._customer = data.customer;
      o._phone = data.phone;
      o._card = data.card;
      o._investment = data.investment;
   }
   MO.FEaiStatisticsInvementEntity_build = function FEaiStatisticsInvementEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }
   MO.FEaiStatisticsInvementEntity_update = function FEaiStatisticsInvementEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 5;
         var color = rateInfo.findRate(rate);
         range = rate * 10;
         rate = RFloat.toRange(rate, 0, 1);
         o._color.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 4);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = o._range = RFloat.toRange(Math.sqrt(range), 1, 4);
      o._size.set(range, range);
   }
   MO.FEaiStatisticsInvementEntity_dispose = function FEaiStatisticsInvementEntity_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiStatisticsInvementShape = function FEaiStatisticsInvementShape(o){
      o = RClass.inherits(this, o, FE3dShape);
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
      o.onImageLoad           = FEaiStatisticsInvementShape_onImageLoad;
      o.construct             = FEaiStatisticsInvementShape_construct;
      o.testReady             = FEaiStatisticsInvementShape_testReady;
      o.setup                 = FEaiStatisticsInvementShape_setup;
      o.upload                = FEaiStatisticsInvementShape_upload;
      o.loadUrl               = FEaiStatisticsInvementShape_loadUrl;
      o.dispose               = FEaiStatisticsInvementShape_dispose;
      return o;
   }
   MO.FEaiStatisticsInvementShape_onImageLoad = function FEaiStatisticsInvementShape_onImageLoad(event){
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
   MO.FEaiStatisticsInvementShape_construct = function FEaiStatisticsInvementShape_construct(){
      var o = this;
      o.__base.FE3dShape.construct.call(o);
      o._citys = new TObjects();
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FEaiStatisticsInvementShape_testReady = function FEaiStatisticsInvementShape_testReady(){
      return this._ready;
   }
   MO.FEaiStatisticsInvementShape_setup = function FEaiStatisticsInvementShape_setup(){
      var o = this;
      var context = o._graphicContext;
      var citys = o._citys;
      var count = citys.count();
      var vertexCount = o._vertexCount = 4 * count;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
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
      var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(data, 1 * 4, 4);
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
   MO.FEaiStatisticsInvementShape_upload = function FEaiStatisticsInvementShape_upload(){
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
      o._vertexColorBuffer.upload(colorData, 1 * 4, vertexCount);
      o._indexBuffer.setCount(3 * 2 * count);
   }
   MO.FEaiStatisticsInvementShape_loadUrl = function FEaiStatisticsInvementShape_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FEaiStatisticsInvementShape_dispose = function FEaiStatisticsInvementShape_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dShape.dispose.call(o);
   }
}
