MO.FE3dFireworksParticle = function FE3dFireworksParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._delay                = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._speed                = MO.Class.register(o, new MO.AGetSet('_speed'), 1);
   o._acceleration         = MO.Class.register(o, new MO.AGetSet('_acceleration'), 0);
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o.construct             = MO.FE3dFireworksParticle_construct;
   o.setup                 = MO.FE3dFireworksParticle_setup;
   o.start                 = MO.FE3dFireworksParticle_start;
   o.process               = MO.FE3dFireworksParticle_process;
   o.dispose               = MO.FE3dFireworksParticle_dispose;
   return o;
}
MO.FE3dFireworksParticle_construct = function FE3dFireworksParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
   o._items = new MO.TObjects();
}
MO.FE3dFireworksParticle_setup = function FE3dFireworksParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}
MO.FE3dFireworksParticle_start = function FE3dFireworksParticle_start(){
   var o = this;
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var angle = angleSingle * i;
      var item = MO.Class.create(MO.FE3dFireworksParticleItem);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.rotation().set(0, 0, -angle + Math.PI / 2);
      item.scale().set(0.4, 0.4, 0.4);
      item.setDelay(o._delay);
      item.setSpeed(o._speed);
      item.setAcceleration(o._acceleration);
      item.start();
      o.pushItem(item);
   }
}
MO.FE3dFireworksParticle_process = function FE3dFireworksParticle_process(){
   var o = this;
   o.__base.FE3dParticle.process.call(o);
   var items = o._items;
   var count = items.count();
   for(var i = 0; i < count; i++){
      var item = items.at(i);
      item.process();
   }
   o.upload();
}
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   o._items = RObject.dispose(o._items);
   o.__base.FE3dParticle.dispose.call(o);
}
MO.FE3dFireworksParticleItem = function FE3dFireworksParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticleItem);
   o._direction    = MO.Class.register(o, new MO.AGetter('_direction'));
   o._speed        = MO.Class.register(o, new MO.AGetSet('_speed'));
   o._acceleration = MO.Class.register(o, new MO.AGetSet('_acceleration'), 1);
   o._startTick    = 0;
   o._currentSpeed = 0;
   o.construct    = MO.FE3dFireworksParticleItem_construct;
   o.start        = MO.FE3dFireworksParticleItem_start;
   o.processFrame = MO.FE3dFireworksParticleItem_processFrame;
   o.dispose      = MO.FE3dFireworksParticleItem_dispose;
   return o;
}
MO.FE3dFireworksParticleItem_construct = function FE3dFireworksParticleItem_construct(){
   var o = this;
   o.__base.FE3dParticleItem.construct.call(o);
   o._direction = new MO.SVector3();
}
MO.FE3dFireworksParticleItem_start = function FE3dFireworksParticleItem_start(){
   var o = this;
   o._currentSpeed = o._speed;
   o._startTick = MO.Timer.current();
}
MO.FE3dFireworksParticleItem_processFrame = function FE3dFireworksParticleItem_processFrame(second){
   var o = this;
   o._currentSpeed += o._acceleration * second;
   var distance = o._currentSpeed * second;
   var position = o._position;
   var direction = o._direction;
   position.x += direction.x * distance;
   position.y += direction.y * distance;
   position.z += direction.z * distance;
   o.dirty();
}
MO.FE3dFireworksParticleItem_dispose = function FE3dFireworksParticleItem_dispose(){
   var o = this;
   o._direction = MO.Lang.Object.dispose(o._direction);
   o.__base.FE3dParticleItem.dispose.call(o);
}
MO.FE3dParticle = function FE3dParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._items                = null;
   o._itemPool             = null;
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
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
   o.upload                = MO.FE3dParticle_upload;
   o.dispose               = MO.FE3dParticle_dispose;
   return o;
}
MO.FE3dParticle_construct = function FE3dParticle_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._items = new MO.TObjects();
   o._itemPool = MO.Class.create(MO.FObjectPool);
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
MO.FE3dParticle_upload = function FE3dParticle_upload(){
   var o = this;
   var context = o._graphicContext;
   var items = o._items;
   var count = items.count();
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPositionIndex = 0;
   var vertexPositionData = MO.RTypeArray.findTemp(MO.EDataType.Float32, 3 * vertexCount);
   var vertexCoordIndex = 0;
   var vertexCoordData = MO.RTypeArray.findTemp(MO.EDataType.Float32, 2 * vertexCount);
   var indexIndex = 0;
   var indexData = MO.RTypeArray.findTemp(MO.EDataType.Uint16, 2 * 6 * count);
   for(var i = 0; i < count; i++){
      var item = items.at(i);
      var matrix = item.matrix();
      matrix.transform(vertexPositionData, 12 * i, MO.Lang.Math.faceCenterPositions, 0, 4);
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      var positionIndex = 4 * i;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 1;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 3;
   }
   o._vertexPositionBuffer.upload(vertexPositionData, 4 * 3, vertexCount);
   o._vertexCoordBuffer.upload(vertexCoordData, 4 * 2, vertexCount);
   o._indexBuffer.upload(indexData, 6 * count);
}
MO.FE3dParticle_dispose = function FE3dParticle_dispose(){
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o._itemPool = MO.Lang.Object.dispose(o._itemPool);
   o.__base.FE3dRenderable.dispose.call(o);
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
   material.info().optionAlpha = true;
   material.info().ambientColor.set(1, 1, 1, 1);
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
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._dirty       = false;
   o._lastTick    = 0;
   o._interval    = 10;
   o._delay       = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._position    = MO.Class.register(o, new MO.AGetter('_position'));
   o._rotation    = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   o._data        = MO.Class.register(o, new MO.AGetSet('_data'));
   o.construct    = MO.FE3dParticleItem_construct;
   o.dirty        = MO.FE3dParticleItem_dirty;
   o.processFrame = MO.FE3dParticleItem_processFrame;
   o.process      = MO.FE3dParticleItem_process;
   o.dispose      = MO.FE3dParticleItem_dispose;
   return o;
}
MO.FE3dParticleItem_construct = function FE3dParticleItem_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3(0, 0, 0);
   o._rotation = new MO.SVector3(0, 0, 0);
   o._scale = new MO.SVector3(1, 1, 1);
}
MO.FE3dParticleItem_dirty = function FE3dParticleItem_dirty(){
   this._dirty = true;
}
MO.FE3dParticleItem_processFrame = function FE3dParticleItem_processFrame(second){
   var o = this;
}
MO.FE3dParticleItem_process = function FE3dParticleItem_process(){
   var o = this;
   var tick = MO.Timer.current();
   if(o._lastTick == 0){
      o._lastTick = tick;
      return false;
   }
   var span = tick - o._lastTick;
   if(span < o._delay){
      return false;
   }
   if(span > o._interval){
      var second = span / 1000;
      o.processFrame(second);
      o._lastTick = tick;
      if(o._dirty){
         var matrix = o._matrix;
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
         o._dirty = false;
      }
   }
}
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FObject.dispose.call(o);
}
