MO.FE3dFireworksParticle = function FE3dFireworksParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._itemDelay            = MO.Class.register(o, new MO.AGetSet('_itemDelay'), 0);
   o._itemColor            = MO.Class.register(o, new MO.AGetter('_itemColor'));
   o._itemPosition         = MO.Class.register(o, new MO.AGetter('_itemPosition'));
   o._itemRotation         = MO.Class.register(o, new MO.AGetter('_itemRotation'));
   o._itemScale            = MO.Class.register(o, new MO.AGetter('_itemScale'));
   o._itemSpeed            = MO.Class.register(o, new MO.AGetSet('_itemSpeed'), 0);
   o._itemAcceleration     = MO.Class.register(o, new MO.AGetSet('_itemAcceleration'));
   o._itemAttenuation      = MO.Class.register(o, new MO.AGetSet('_itemAttenuation'), 0);
   o._itemSplittingNumber  = MO.Class.register(o, new MO.AGetSet('_itemSplittingNumber'), 0);
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dFireworksParticle_construct;
   o.setup                 = MO.FE3dFireworksParticle_setup;
   o.testInRange           = MO.FE3dFireworksParticle_testInRange;
   o.start                 = MO.FE3dFireworksParticle_start;
   o.dispose               = MO.FE3dFireworksParticle_dispose;
   return o;
}
MO.FE3dFireworksParticle_construct = function FE3dFireworksParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
   o._itemColor = new MO.SColor4(1, 1, 1, 1);
   o._itemPosition = new MO.SPoint3(0, 0, 0);
   o._itemRotation = new MO.SVector3(0, 0, 0);
   o._itemScale = new MO.SVector3(1, 1, 1);
   o._itemAcceleration = new MO.SVector3(0, 0, 0);
}
MO.FE3dFireworksParticle_setup = function FE3dFireworksParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}
MO.FE3dFireworksParticle_testInRange = function FE3dFireworksParticle_testInRange(x, y){
   var o = this;
   var position = o._position;
   var idx = parseInt((x + 17) / 20 * 220);
   var idy = parseInt((y + 3) * 6);
   var index = (360 * (60 - idy) + idx) * 4;
   var data = o._data.data;
   if(index >= 0 && index < data.length){
      var r = data[index    ];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
   }
   return r > 0;
}
MO.FE3dFireworksParticle_start = function FE3dFireworksParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var angle = o._angle + angleSingle * i;
      var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
      item.setParticle(o);
      item.setDelay(o._itemDelay);
      item.position().assign(o._itemPosition);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.scale().assign(o._itemScale);
      item.color().assign(o._itemColor);
      item.setSpeed(o._itemSpeed);
      item.acceleration().assign(o._itemAcceleration);
      item.setAttenuation(o._itemAttenuation);
      item.setSplittingDistance(3 + Math.random());
      item.setSplittingNumber(o._itemSplittingNumber);
      item.start();
      o.pushItem(item);
   }
}
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   o._itemColor = MO.Lang.Object.dispose(o._itemColor);
   o._itemPosition = MO.Lang.Object.dispose(o._itemPosition);
   o._itemRotation = MO.Lang.Object.dispose(o._itemRotation);
   o._itemScale = MO.Lang.Object.dispose(o._itemScale);
   o._itemAcceleration = MO.Lang.Object.dispose(o._itemAcceleration);
   o.__base.FE3dParticle.dispose.call(o);
}
MO.FE3dFireworksParticleItem = function FE3dFireworksParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   o._priorPosition     = MO.Class.register(o, new MO.AGetter('_priorPosition'));
   o._direction         = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed             = MO.Class.register(o, new MO.AGetSet('_speed'), 0);
   o._acceleration      = MO.Class.register(o, new MO.AGetter('_acceleration'));
   o._attenuation       = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._splittingDistance = MO.Class.register(o, new MO.AGetSet('_splittingDistance'), 1);
   o._splittingNumber   = MO.Class.register(o, new MO.AGetSet('_splittingNumber'), 0);
   o._currentDistance   = null;
   o._currentSpeed      = null;
   o._currentDirection  = null;
   o._statusInRange = false;
   o._storeSpeed      = null;
   o.construct          = MO.FE3dFireworksParticleItem_construct;
   o.start              = MO.FE3dFireworksParticleItem_start;
   o.processSplit       = MO.FE3dFireworksParticleItem_processSplit;
   o.processFrame       = MO.FE3dFireworksParticleItem_processFrame;
   o.dispose            = MO.FE3dFireworksParticleItem_dispose;
   return o;
}
MO.FE3dFireworksParticleItem_construct = function FE3dFireworksParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   o._priorPosition = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._acceleration = new MO.SVector3();
   o._currentSpeed = new MO.SVector3();
   o._currentDirection = new MO.SVector3();
   o._storeSpeed = new MO.SVector3();
}
MO.FE3dFireworksParticleItem_start = function FE3dFireworksParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   o._priorPosition.assign(o._position);
   o._currentDistance = 0;
   o._currentAlpha = 1;
   var direction = o._direction;
   var speed = o._speed;
   o._currentSpeed.x = direction.x * speed;
   o._currentSpeed.y = direction.y * speed;
   o._currentSpeed.z = direction.z * speed;
}
MO.FE3dFireworksParticleItem_processSplit = function FE3dFireworksParticleItem_processSplit(){
   var o = this;
   var particle = o._particle;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   for(var j = 0; j < 4; j++){
      var count = 16;
      var angleSingle = Math.PI * 2 / count;
      for(var i = 0; i < count; i++){
         var angle = angleSingle * i;
         var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
         item.setSplittingNumber(0);
         item.setParticle(particle);
         item.direction().set(Math.sin(angle), Math.cos(angle), 0);
         item.position().assign(position);
         item.color().assign(o._color);
         item.scale().setAll(0.2);
         item.setDelay(0.02 * j);
         item.setSpeed(o._speed);
         item.acceleration().assign(o._acceleration);
         item.setAttenuation(1);
         item.start();
         particle.pushItem(item);
      }
   }
}
MO.FE3dFireworksParticleItem_processFrame = function FE3dFireworksParticleItem_processFrame(second){
   var o = this;
   var priorPosition = o._priorPosition;
   priorPosition.assign(o._position);
   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed.assign(o._currentSpeed);
         o._currentSpeed.setAll(0.01);
         o._color.set(1, 0, 0, 1);
      }else{
         o._color.set(1, 1, 1, 1);
         o._currentSpeed.assign(o._storeSpeed);
      }
      o._statusInRange = inRange;
   }
   if(inRange){
   }
   var speed = o._currentSpeed;
   var distanceX = speed.x * second;
   var distanceY = speed.y * second;
   var distanceZ = speed.z * second;
   var position = o._position;
   position.x += distanceX;
   position.y += distanceY;
   position.z += distanceZ;
   var direction = o._direction;
   direction.x = position.x - priorPosition.x;
   direction.y = position.y - priorPosition.y;
   direction.z = position.z - priorPosition.z;
   o._currentDistance += direction.length();
   direction.normalize();
   var angle = Math.acos(direction.x);
   if(direction.y > 0){
      o._rotation.z = angle;
   }else{
      o._rotation.z = Math.PI * 2 - angle;
   }
   var acceleration = o._acceleration;
   speed.x += acceleration.x * second;
   speed.y += acceleration.y * second;
   speed.z += acceleration.z * second;
   var attenuation = o._attenuation * second;
   if(attenuation > o._currentAlpha){
      o._currentAlpha = 0;
      o._currentFinish = true;
   }else{
      o._currentAlpha -= attenuation;
   }
   if((o._splittingNumber > 0) && (o._currentDistance > o._splittingDistance)){
      o.processSplit();
      o._splittingNumber--;
      if(o._splittingNumber == 0){
         o._currentFinish = true;
      }
   }
   o.dirty();
}
MO.FE3dFireworksParticleItem_dispose = function FE3dFireworksParticleItem_dispose(){
   var o = this;
   o._priorPosition = MO.Lang.Object.dispose(o._priorPosition);
   o._direction = MO.Lang.Object.dispose(o._direction);
   o.__base.FE3dParticleItem.dispose.call(o);
}
MO.FE3dParticle = function FE3dParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._items                = MO.Class.register(o, new MO.AGetter('_items'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dParticle_construct;
   o.setup                 = MO.FE3dParticle_setup;
   o.testReady             = MO.FE3dParticle_testReady;
   o.findTexture           = MO.FE3dParticle_findTexture;
   o.textures              = MO.FE3dParticle_textures;
   o.material              = MO.FE3dParticle_material;
   o.setSize               = MO.FE3dParticle_setSize;
   o.setData               = MO.FE3dParticle_setData;
   o.loadUrl               = MO.FE3dParticle_loadUrl;
   o.createItem            = MO.FE3dParticle_createItem;
   o.pushItem              = MO.FE3dParticle_pushItem;
   o.process               = MO.FE3dParticle_process;
   o.upload                = MO.FE3dParticle_upload;
   o.dispose               = MO.FE3dParticle_dispose;
   return o;
}
MO.FE3dParticle_construct = function FE3dParticle_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._items = new MO.TLooper();
}
MO.FE3dParticle_setup = function FE3dParticle_setup(){
   var o = this;
   var context = o._graphicContext;
   o._vertexCount = 0;
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
   var buffer = o._indexBuffer = context.createIndexBuffer();
   o.pushIndexBuffer(buffer);
}
MO.FE3dParticle_testReady = function FE3dParticle_testReady(){
   var o = this;
   if(!o._ready){
      o._ready = o._renderable.testReady();
   }
   return o._ready;
}
MO.FE3dParticle_findTexture = function FE3dParticle_findTexture(p){
   return this._renderable.findTexture(p);
}
MO.FE3dParticle_textures = function FE3dParticle_textures(){
   return this._renderable.textures();
}
MO.FE3dParticle_material = function FE3dParticle_material(){
   return this._renderable.material();
}
MO.FE3dParticle_setSize = function FE3dParticle_setSize(width, height){
   var o = this;
}
MO.FE3dParticle_setData = function FE3dParticle_setData(data){
   this._renderable = data;
}
MO.FE3dParticle_loadUrl = function FE3dParticle_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3dParticleConsole).loadUrl(context, url);
   o._ready = false;
}
MO.FE3dParticle_createItem = function FE3dParticle_createItem(){
   var o = this;
   var item = MO.Class.create(MO.FE3dParticleItem);
   o.pushItem(item);
   return o;
}
MO.FE3dParticle_pushItem = function FE3dParticle_pushItem(item){
   this._items.push(item);
}
MO.FE3dParticle_process = function FE3dParticle_process(){
   var o = this;
   o.__base.FE3dRenderable.process.call(o);
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var items = o._items;
   items.record();
   while(items.next()){
      var item = items.current();
      if(item.currentFinish()){
         items.removeCurrent();
         particleConsole.itemFree(item);
      }
      item.process();
   }
   if(!items.isEmpty()){
      o.upload();
   }
}
MO.FE3dParticle_upload = function FE3dParticle_upload(){
   var o = this;
   var context = o._graphicContext;
   var items = o._items;
   var count = items.count();
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPositionIndex = 0;
   var vertexPositionData = new Float32Array(3 * vertexCount);
   var vertexCoordIndex = 0;
   var vertexCoordData = new Float32Array(2 * vertexCount);
   var vertexColorIndex = 0;
   var vertexColorData = new Uint8Array(4 * vertexCount);
   var indexIndex = 0;
   var indexData = new Uint16Array(2 * 6 * count);
   var visibleCount = 0;
   items.record();
   var index = 0;
   while(items.next()){
      var item = items.current();
      if(!item.visible()){
         continue;
      }
      var matrix = item.currentMatrix();
      var color = item.color();
      var red = parseInt(255 * MO.Lang.Float.toRange(color.red, 0, 1));
      var green = parseInt(255 * color.green);
      var blue = parseInt(255 * color.blue);
      var alpha = parseInt(255 * item.currentAlpha());
      matrix.transform(vertexPositionData, 12 * index, MO.Lang.Math.faceCenterPositions, 0, 4);
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      for(var i = 0; i < 4; i++){
         vertexColorData[vertexColorIndex++] = red;
         vertexColorData[vertexColorIndex++] = green;
         vertexColorData[vertexColorIndex++] = blue;
         vertexColorData[vertexColorIndex++] = alpha;
      }
      var positionIndex = 4 * index;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 1;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 3;
      index++;
   }
   o._vertexPositionBuffer.upload(vertexPositionData, 4 * 3, index);
   o._vertexCoordBuffer.upload(vertexCoordData, 4 * 2, index);
   o._vertexColorBuffer.upload(vertexColorData, 4 * 1, index);
   o._indexBuffer.upload(indexData, 6 * index);
}
MO.FE3dParticle_dispose = function FE3dParticle_dispose(){
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dParticleConsole = function FE3dParticleConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._pools    = MO.Class.register(o, new MO.AGetter('_pools'))
   o.onLoad    = MO.FE3dParticleConsole_onLoad;
   o.construct = MO.FE3dParticleConsole_construct;
   o.itemAlloc = MO.FE3dParticleConsole_itemAlloc;
   o.itemFree  = MO.FE3dParticleConsole_itemFree;
   o.dispose   = MO.FE3dParticleConsole_dispose;
   return o;
}
MO.FE3dParticleConsole_construct = function FE3dParticleConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o)
   o._pools = MO.Class.create(MO.FObjectPools);
}
MO.FE3dParticleConsole_itemAlloc = function FE3dParticleConsole_itemAlloc(clazz){
   var o = this;
   var code = MO.Class.name(clazz);
   var instance = o._pools.alloc(code);
   if(!instance){
      instance = MO.Class.create(clazz);
   }
   return instance;
}
MO.FE3dParticleConsole_itemFree = function FE3dParticleConsole_itemFree(item){
   var o = this;
   var code = MO.Class.name(item);
   o._pools.free(code, item);
}
MO.FE3dParticleConsole_dispose = function FE3dParticleConsole_dispose(){
   var o = this;
   o._pools = MO.Lang.Object.dispose(o._pools);
   o.__base.FConsole.dispose.call(o)
}
MO.FE3dParticleData = function FE3dParticleData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o.onImageLoad = MO.FE3dParticleData_onImageLoad;
   o.construct   = MO.FE3dParticleData_construct;
   o.loadUrl     = MO.FE3dParticleData_loadUrl;
   o.dispose     = MO.FE3dParticleData_dispose;
   return o;
}
MO.FE3dParticleData_onImageLoad = function FE3dParticleData_onImageLoad(event){
   var o = this;
   var image = event.sender;
   o._size.assign(image.size());
   o._texture.upload(image);
   image.dispose();
   o._ready = true;
}
MO.FE3dParticleData_construct = function FE3dParticleData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
   var material = o._material;
   var info = material.info();
   info.effectCode = 'control';
   info.optionAlpha = true;
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dParticleData_loadUrl = function FE3dParticleData_loadUrl(url){
   var o = this;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   o._ready = false;
}
MO.FE3dParticleData_dispose = function FE3dParticleData_dispose(){
   var o = this;
   o._hVideo = null;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.FE3dParticleItem = function FE3dParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._particle      = MO.Class.register(o, new MO.AGetSet('_particle'));
   o._visible       = MO.Class.register(o, new MO.AGetSet('_visible'), false);
   o._delay         = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._interval      = MO.Class.register(o, new MO.AGetter('_interval'), 1);
   o._position      = MO.Class.register(o, new MO.AGetter('_position'));
   o._rotation      = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale         = MO.Class.register(o, new MO.AGetter('_scale'));
   o._color         = MO.Class.register(o, new MO.AGetter('_color'));
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._currentAlpha  = MO.Class.register(o, new MO.AGetSet('_currentAlpha'), 0);
   o._currentFinish = MO.Class.register(o, new MO.AGetSet('_currentFinish'), false);
   o._startTick     = 0;
   o._lastTick      = 0;
   o._statusDirty   = false;
   o.construct      = MO.FE3dParticleItem_construct;
   o.start          = MO.FE3dParticleItem_start;
   o.processFrame   = MO.FE3dParticleItem_processFrame;
   o.process        = MO.FE3dParticleItem_process;
   o.dirty          = MO.FE3dParticleItem_dirty;
   o.dispose        = MO.FE3dParticleItem_dispose;
   return o;
}
MO.FE3dParticleItem_construct = function FE3dParticleItem_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._currentMatrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3(0, 0, 0);
   o._rotation = new MO.SVector3(0, 0, 0);
   o._scale = new MO.SVector3(1, 1, 1);
   o._color = new MO.SColor4(1, 1, 1, 1);
}
MO.FE3dParticleItem_start = function FE3dParticleItem_start(){
   var o = this;
   o._visible = false;
   o._currentAlpha = 1;
   o._currentFinish = false;
   o._startTick = MO.Timer.current();
   o._lastTick = 0;
}
MO.FE3dParticleItem_processFrame = function FE3dParticleItem_processFrame(second){
   var o = this;
}
MO.FE3dParticleItem_process = function FE3dParticleItem_process(){
   var o = this;
   var tick = MO.Timer.current();
   if(!o._visible){
      if(tick - o._startTick < o._delay){
         return;
      }
   }
   if(o._lastTick == 0){
      o._lastTick = tick;
      return false;
   }
   var span = tick - o._lastTick;
   if(span <= o._interval){
      return false;
   }
   var second = span / 1000;
   o.processFrame(second);
   o._lastTick = tick;
   if(o._statusDirty){
      var matrix = o._currentMatrix;
      matrix.tx = o._position.x;
      matrix.ty = o._position.y;
      matrix.tz = o._position.z;
      matrix.rx = o._rotation.x;
      matrix.ry = o._rotation.y;
      matrix.rz = o._rotation.z;
      matrix.sx = o._scale.x;
      matrix.sy = o._scale.y;
      matrix.sz = o._scale.z;
      matrix.updateForce();
      o._visible = true;
      o._statusDirty = false;
   }
}
MO.FE3dParticleItem_dirty = function FE3dParticleItem_dirty(){
   this._statusDirty = true;
}
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dRainFontParticle = function FE3dRainFontParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._delay                = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._speed                = MO.Class.register(o, new MO.AGetSet('_speed'), 1);
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   o._acceleration         = MO.Class.register(o, new MO.AGetSet('_acceleration'), 0);
   o._attenuation          = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dRainFontParticle_construct;
   o.setup                 = MO.FE3dRainFontParticle_setup;
   o.testInRange           = MO.FE3dRainFontParticle_testInRange;
   o.start                 = MO.FE3dRainFontParticle_start;
   o.dispose               = MO.FE3dRainFontParticle_dispose;
   return o;
}
MO.FE3dRainFontParticle_construct = function FE3dRainFontParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
}
MO.FE3dRainFontParticle_setup = function FE3dRainFontParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}
MO.FE3dRainFontParticle_testInRange = function FE3dRainFontParticle_testInRange(x, y){
   var o = this;
   var position = o._position;
   var idx = parseInt((x + 17) / 20 * 220);
   var idy = parseInt((y + 3) * 6);
   var index = (360 * (60 - idy) + idx) * 4;
   var data = o._data.data;
   if(index >= 0 && index < data.length){
      var r = data[index    ];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
   }
   return r > 0;
}
MO.FE3dRainFontParticle_start = function FE3dRainFontParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var value = parseInt(MO.Random.get() * 360) % 360;
      var item = particleConsole.itemAlloc(MO.FE3dRainFontParticleItem);
      item.setParticle(o);
      item.direction().set(0, -1, 0);
      item.position().set(0.1 * value - 12, 5, 0);
      item.rotation().set(0, 0, -Math.PI / 2);
      item.scale().set(0.1, 0.1, 0.1);
      item.setDelay(o._delay);
      item.setSpeed(o._speed);
      item.setAcceleration(o._acceleration);
      item.setAttenuation(o._attenuation);
      item.start();
      o.pushItem(item);
   }
}
MO.FE3dRainFontParticle_dispose = function FE3dRainFontParticle_dispose(){
   var o = this;
   o.__base.FE3dParticle.dispose.call(o);
}
MO.FE3dRainFontParticleItem = function FE3dRainFontParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   o._direction    = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed        = MO.Class.register(o, new MO.AGetSet('_speed'));
   o._acceleration = MO.Class.register(o, new MO.AGetSet('_acceleration'), 1);
   o._attenuation  = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   o._statusInRange = false;
   o._currentSpeed = 0;
   o._storeSpeed   = 0;
   o.construct    = MO.FE3dRainFontParticleItem_construct;
   o.start        = MO.FE3dRainFontParticleItem_start;
   o.processFrame = MO.FE3dRainFontParticleItem_processFrame;
   o.dispose      = MO.FE3dRainFontParticleItem_dispose;
   return o;
}
MO.FE3dRainFontParticleItem_construct = function FE3dRainFontParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   o._direction = new MO.SVector3();
}
MO.FE3dRainFontParticleItem_start = function FE3dRainFontParticleItem_start(){
   var o = this;
   o.__base.FE3dParticleItem.start.call(o);
   o._statusInRange = false;
   o._currentSpeed = o._speed;
   o._storeSpeed = 0;
   o._currentAlpha = 0.2;
   o._color.set(0.5, 0.5, 0.5, 1);
}
MO.FE3dRainFontParticleItem_processFrame = function FE3dRainFontParticleItem_processFrame(second){
   var o = this;
   var size = o._particle._graphicContext.size();
   var position = o._position;
   var inRange = o._particle.testInRange(position.x, position.y);
   var attenuation = o._attenuation * second;
   if(o._statusInRange != inRange){
      if(inRange){
         o._storeSpeed = o._currentSpeed;
         o._currentSpeed = 0.2;
         o._color.set(1, 0, 0, 1);
         o._currentAlpha = 1;
      }else{
         o._color.set(1, 1, 1, 1);
         o._currentAlpha = 0.2;
         o._currentSpeed = o._storeSpeed;
      }
      o._statusInRange = inRange;
   }
   var distance = o._currentSpeed * second;
   var direction = o._direction;
   position.x += direction.x * distance;
   position.y += direction.y * distance;
   position.z += direction.z * distance;
   o.dirty();
}
MO.FE3dRainFontParticleItem_dispose = function FE3dRainFontParticleItem_dispose(){
   var o = this;
   o._direction = MO.Lang.Object.dispose(o._direction);
   o.__base.FE3dParticleItem.dispose.call(o);
}
