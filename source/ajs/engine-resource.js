MO.MAudio = function MAudio(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o._ready         = MO.Class.register(o, new MO.AGetterSource('_ready', 'testReady'), false);
   o._loaded        = MO.Class.register(o, new MO.AGetterSource('_loaded', 'testLoaded'), false);
   o._finish        = MO.Class.register(o, new MO.AGetterSource('_finish', 'testFinish'), false);
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o.construct      = MO.MAudio_construct;
   o.volume         = MO.MAudio_volume;
   o.setVolume      = MO.MAudio_setVolume;
   o.loop           = MO.MAudio_loop;
   o.setLoop        = MO.MAudio_setLoop;
   o.play           = MO.MAudio_play;
   o.pause          = MO.MAudio_pause;
   o.dispose        = MO.MAudio_dispose;
   return o;
}
MO.MAudio_construct = function MAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.MAudio_volume = function MAudio_volume(){
   return 0;
}
MO.MAudio_setVolume = function MAudio_setVolume(value){
}
MO.MAudio_loop = function MAudio_loop(){
   return false;
}
MO.MAudio_setLoop = function MAudio_setLoop(value){
}
MO.MAudio_play = function MAudio_play(position){
}
MO.MAudio_pause = function MAudio_pause(){
}
MO.MAudio_dispose = function MAudio_dispose(){
   var o = this;
   o.__base.MListener.dispose.call(o);
}
MO.MLinkerResource = function MLinkerResource(o){
   o = MO.Class.inherits(this, o);
   o._resource      = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.loadResource   = MO.MLinkerResource_loadResource;
   o.reloadResource = MO.MLinkerResource_reloadResource;
   o.dispose        = MO.MLinkerResource_dispose;
   return o;
}
MO.MLinkerResource_loadResource = function MLinkerResource_loadResource(resource){
   this._resource = resource;
}
MO.MLinkerResource_reloadResource = function MLinkerResource_reloadResource(){
   var o = this;
   o.loadResource(o._resource);
}
MO.MLinkerResource_dispose = function MLinkerResource_dispose(){
   var o = this;
   o._resource = null;
}
MO.FAudio = function FAudio(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   o._url      = MO.Class.register(o, new MO.AGetter('_url'));
   o._hAudio   = null;
   o.onLoad    = MO.FAudio_onLoad;
   o.onLoaded  = MO.FAudio_onLoaded;
   o.onError   = MO.FAudio_onError;
   o.construct = MO.FAudio_construct;
   o.volume    = MO.FAudio_volume;
   o.setVolume = MO.FAudio_setVolume;
   o.loop      = MO.FAudio_loop;
   o.setLoop   = MO.FAudio_setLoop;
   o.play      = MO.FAudio_play;
   o.pause     = MO.FAudio_pause;
   o.loadUrl   = MO.FAudio_loadUrl;
   o.dispose   = MO.FAudio_dispose;
   return o;
}
MO.FAudio_onLoad = function FAudio_onLoad(){
   var o = this;
   o._ready = true;
   MO.Logger.info(o, 'Audio load success. (url={1})', o._url);
}
MO.FAudio_onLoaded = function FAudio_onLoaded(event){
   var o = this;
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   MO.Logger.info(o, 'Audio loaded success. (url={1})', o._url);
}
MO.FAudio_onError = function FAudio_onError(event){
   var o = this;
   o._finish = true;
   MO.Logger.error(o, 'Load image failure. (url={1})', o._url);
}
MO.FAudio_construct = function FAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}
MO.FAudio_volume = function FAudio_volume(){
   return this._hAudio.volume;
}
MO.FAudio_setVolume = function FAudio_setVolume(value){
   this._hAudio.volume = value;
}
MO.FAudio_loop = function FAudio_loop(){
   return this._hAudio.loop;
}
MO.FAudio_setLoop = function FAudio_setLoop(value){
   this._hAudio.loop = value;
}
MO.FAudio_play = function FAudio_play(position){
   var hAudio = this._hAudio;
   if(position != null){
      if(hAudio.currentTime != position){
         hAudio.currentTime = position;
      }
   }
   hAudio.play();
}
MO.FAudio_pause = function FAudio_pause(){
   this._hAudio.pause();
}
MO.FAudio_loadUrl = function FAudio_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var hAudio = o._hAudio;
   if(!hAudio){
      hAudio = o._hAudio = new Audio();
      hAudio.loop = false;
      hAudio.oncanplay = o.onLoad.bind(o);
      hAudio.oncanplaythrough = o.onLoaded.bind(o);
      hAudio.onerror = o.onError.bind(o);
   }
   if(!MO.Window.Browser.capability.soundFinish){
      o._ready = true;
      o._loaded = true;
      o._finish = true;
   }
   o._url = url;
   hAudio.src = url;
}
MO.FAudio_dispose = function FAudio_dispose(){
   var o = this;
   o._hAudio = MO.Window.Html.free(o._hAudio);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioBuffer = function FAudioBuffer(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   o._context        = MO.Class.register(o, new MO.AGetSet('_context'));
   o._url            = MO.Class.register(o, new MO.AGetSet('_url'));
   o._handle         = MO.Class.register(o, new MO.AGetter('_handle'));
   o._buffer         = MO.Class.register(o, new MO.AGetter('_buffer'));
   o.onDecodeSuccess = MO.FAudioBuffer_onDecodeSuccess;
   o.onDecodeFailure = MO.FAudioBuffer_onDecodeFailure;
   o.onLoad          = MO.FAudioBuffer_onLoad;
   o.construct       = MO.FAudioBuffer_construct;
   o.testReady       = MO.FAudioBuffer_testReady;
   o.loadUrl         = MO.FAudioBuffer_loadUrl;
   o.play            = MO.FAudioBuffer_play;
   o.dispose         = MO.FAudioBuffer_dispose;
   return o;
}
MO.FAudioBuffer_onDecodeSuccess = function FAudioBuffer_onDecodeSuccess(buffer){
   var o = this;
   var contextHandle = o._context.handle();
   var bufferSource = o._buffer = contextHandle.createBufferSource();
   bufferSource.buffer = buffer;
   bufferSource.connect(contextHandle.destination)
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FAudioBuffer_onDecodeFailure = function FAudioBuffer_onDecodeFailure(buffer){
   var o = this;
   o._finish = true;
   MO.Logger.error(o, 'Decode audio buffer failure. (url={1})', o._url);
}
MO.FAudioBuffer_onLoad = function FAudioBuffer_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var contextHandle = o._context.handle();
   contextHandle.decodeAudioData(data, o.onDecodeSuccess.bind(o), o.onDecodeFailure.bind(o));
}
MO.FAudioBuffer_construct = function FAudioBuffer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}
MO.FAudioBuffer_testReady = function FAudioBuffer_testReady(){
   return this._ready;
}
MO.FAudioBuffer_loadUrl = function FAudioBuffer_loadUrl(uri){
   var o = this;
   var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(o._url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FAudioBuffer_play = function FAudioBuffer_play(position){
   this._buffer.start(MO.Lang.Integer.nvl(position));
}
MO.FAudioBuffer_dispose = function FAudioBuffer_dispose(){
   var o = this;
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioConsole = function FAudioConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._audios   = null;
   o.construct = MO.FAudioConsole_construct;
   o.create    = MO.FAudioConsole_create;
   o.load      = MO.FAudioConsole_load;
   o.dispose   = MO.FAudioConsole_dispose;
   return o;
}
MO.FAudioConsole_construct = function FAudioConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._audios = new MO.TDictionary();
}
MO.FAudioConsole_create = function FAudioConsole_create(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var audio = MO.Class.create(MO.FAudioResource);
   audio.loadUrl(url);
   return audio;
}
MO.FAudioConsole_load = function FAudioConsole_load(uri){
   var o = this;
   var audios = o._audios;
   var audio = audios.get(uri);
   if(!audio){
      audio = o.create(uri);
      audios.set(uri, audio);
   }
   return audio;
}
MO.FAudioConsole_dispose = function FAudioConsole_dispose(){
   var o = this;
   o._audios = MO.Lang.Object.dispose(o._audios);
   o.__base.FConsole.dispose.call(o);
}
MO.FAudioContext = function FAudioContext(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   o._handle      = MO.Class.register(o, new MO.AGetter('_handle'));
   o._buffers     = MO.Class.register(o, new MO.AGetter('_buffers'));
   o.construct    = MO.FAudioContext_construct;
   o.setup        = MO.FAudioContext_setup;
   o.createBuffer = MO.FAudioContext_createBuffer;
   o.dispose      = MO.FAudioContext_dispose;
   return o;
}
MO.FAudioContext_construct = function FAudioContext_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._buffers = new MO.TDictionary();
}
MO.FAudioContext_setup = function FAudioContext_setup(uri) {
   var o = this;
   o._audioBuffers = new MO.TDictionary();
   var context = null;
   if(window.AudioContext){
      context = new AudioContext();
   }else if(window.webkitAudioContext){
      context = new webkitAudioContext();
   }
   if(!context){
      return MO.Logger.error(o, 'Invalid audio context.');
   }
   o._handle = context;
}
MO.FAudioContext_createBuffer = function FAudioContext_createBuffer(uri) {
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var buffer = null;
   o._handle = null;
   if(o._handle){
      buffer = MO.Class.create(MO.FAudioBuffer);
      buffer.setContext(o);
   }else{
      buffer = MO.Class.create(MO.FAudio);
   }
   buffer.loadUrl(url);
   return buffer;
}
MO.FAudioContext_dispose = function FAudioContext_dispose() {
   var o = this;
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o.__base.FObject.dispose.call(o);
}
MO.FAudioContextConsole = function FAudioContextConsole(o) {
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._contexts = null;
   o.construct = MO.FAudioContextConsole_construct;
   o.create    = MO.FAudioContextConsole_create;
   o.dispose   = MO.FAudioContextConsole_dispose;
   return o;
}
MO.FAudioContextConsole_construct = function FAudioContextConsole_construct() {
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._contexts = new MO.TObjects();
}
MO.FAudioContextConsole_create = function FAudioContextConsole_create(uri) {
   var o = this;
   var context = MO.Class.create(MO.FAudioContext);
   context.setup();
   o._contexts.push(context);
   return context;
}
MO.FAudioContextConsole_dispose = function FAudioContextConsole_dispose(){
   var o = this;
   o._contexts = MO.Lang.Object.dispose(o._contexts);
   o.__base.FConsole.dispose.call(o);
}
MO.FAudioResource = function FAudioResource(o){
   o = MO.Class.inherits(this, o, MO.FAudio);
   return o;
}
MO.FImageConsole = function FImageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._images   = null;
   o.construct = MO.FImageConsole_construct;
   o.create    = MO.FImageConsole_create;
   o.load      = MO.FImageConsole_load;
   o.dispose   = MO.FImageConsole_dispose;
   return o;
}
MO.FImageConsole_construct = function FImageConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._images = new MO.TDictionary();
}
MO.FImageConsole_create = function FImageConsole_create(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var image = MO.Class.create(MO.FImageResource);
   image.loadUrl(url);
   return image;
}
MO.FImageConsole_load = function FImageConsole_load(uri){
   var o = this;
   var images = o._images;
   var image = images.get(uri);
   if(!image){
      image = o.create(uri);
      images.set(uri, image);
   }
   return image;
}
MO.FImageConsole_dispose = function FImageConsole_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FConsole.dispose.call(o);
}
MO.FImageResource = function FImageResource(o){
   o = MO.Class.inherits(this, o, MO.FImage);
   return o;
}
MO.FResource = function FResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._typeCode     = MO.Class.register(o, new MO.AGetter('_typeCode'));
   o._type         = MO.Class.register(o, new MO.AGetter('_type'));
   o._guid         = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code         = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label        = MO.Class.register(o, new MO.AGetSet('_label'));
   o._sourceUrl    = MO.Class.register(o, new MO.AGetSet('_sourceUrl'));
   o._dataCompress = false;
   o._dataBlock    = false;
   return o;
}
MO.FResourceBlockStorage = function FResourceBlockStorage(o){
   o = MO.Class.inherits(this, o, MO.FResourceStorage);
   o._ready      = false;
   o._dataLength = 0;
   o._blockSize  = 0;
   o._blockCount = 0;
   o._blocks     = MO.Class.register(o, new MO.AGetter('_blocks'));
   o._resource   = null;
   o.construct   = MO.FResourceBlockStorage_construct;
   o.testReady   = MO.FResourceBlockStorage_testReady;
   o.load        = MO.FResourceBlockStorage_load;
   o.complete    = MO.FResourceBlockStorage_complete;
   o.dispose     = MO.FResourceBlockStorage_dispose;
   return o;
}
MO.FResourceBlockStorage_construct = function FResourceBlockStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
   o._blocks = new MO.TObjects();
}
MO.FResourceBlockStorage_testReady = function FResourceBlockStorage_testReady(){
   var o = this;
   if(!o._ready){
      var blocks = o._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         if(!block.testReady()){
            return false;
         }
      }
      o._ready = true;
   }
   return o._ready;
}
MO.FResourceBlockStorage_load = function FResourceBlockStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(buffer);
   var compressCode = view.readString();
   var length = o._dataLength = view.readInt32();
   var blockSize = o._blockSize = view.readInt32();
   var blockCount = o._blockCount = view.readInt32();
   var blocks = o._blocks;
   for(var i = 0; i < blockCount; i++){
      var size = view.readInt32();
      var blockData = new ArrayBuffer(size);
      view.readBytes(blockData, 0, size);
      var block = MO.Class.create(MO.FResourceBlockStorageData);
      block._guid = resource.guid();
      block._index = i;
      block.setCompressData(blockData);
      blocks.push(block)
   }
   view.dispose();
}
MO.FResourceBlockStorage_complete = function FResourceBlockStorage_complete(){
   var o = this;
   var resource = o._resource;
   var stream = MO.Class.create(MO.FDataStream);
   stream.setEndianCd(true);
   stream.setLength(o._dataLength);
   var blocks = o._blocks;
   var count = blocks.count();
   for(var i = 0; i < count; i++){
      var block = blocks.at(i);
      var data = block._data;
      stream.writeBytes(data.buffer, 0, data.byteLength);
   }
   stream.flip();
   var span = MO.Timer.current() - resource._compressStartTick;
   MO.Logger.info(o, 'Process resource storage. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, o._compressLength, o._dataLength, span);
   resource.onComplete(stream);
   stream.dispose();
}
MO.FResourceBlockStorage_dispose = function FResourceBlockStorage_dispose(){
   var o = this;
   o._resource = null;
   var blocks = o._blocks;
   if(blocks){
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         block.dispose();
      }
      o._blocks = MO.Lang.Object.dispose(blocks);
   }
   o.__base.FResourceStorage.dispose.call(o);
}
MO.FResourceBlockStorageData = function FResourceBlockStorageData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MResourceData);
   o.dispose = MO.FResourceBlockStorageData_dispose;
   return o;
}
MO.FResourceBlockStorageData_dispose = function FResourceBlockStorageData_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FResourceConsole = function FResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd          = MO.EScope.Global;
   o._factory          = null;
   o._types            = null;
   o._resources        = null;
   o._loadResources    = null;
   o._loadingResources = null;
   o._processStorages  = null;
   o._thread           = null;
   o._loadLimit        = 8;
   o._interval         = 150;
   o.onComplete        = MO.FResourceConsole_onComplete;
   o.onLoad            = MO.FResourceConsole_onLoad;
   o.onBlockLoad       = MO.FResourceConsole_onBlockLoad;
   o.onProcess         = MO.FResourceConsole_onProcess;
   o.construct         = MO.FResourceConsole_construct;
   o.registerType      = MO.FResourceConsole_registerType;
   o.factory           = MO.FResourceConsole_factory;
   o.load              = MO.FResourceConsole_load;
   return o;
}
MO.FResourceConsole_onComplete = function FResourceConsole_onComplete(resource, data){
   var o = this;
   resource._data = null;
   o._loadingResources.remove(resource);
   resource.onComplete(data);
}
MO.FResourceConsole_onLoad = function FResourceConsole_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   var storage = MO.Class.create(MO.FResourceSingleStorage);
   storage.setResource(resource);
   storage.load(data);
   MO.Console.find(MO.FResourceDataConsole).load(storage);
   o._loadingResources.remove(resource);
   o._processStorages.push(storage);
}
MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
   var storage = MO.Class.create(MO.FResourceBlockStorage);
   storage.setResource(resource);
   storage.load(data);
   var dataConsole = MO.Console.find(MO.FResourceDataConsole);
   var blocks = storage.blocks();
   var count = blocks.count();
   for(var i = 0; i < count; i++){
      var block = blocks.at(i);
      dataConsole.load(block);
   }
   o._loadingResources.remove(resource);
   o._processStorages.push(storage);
}
MO.FResourceConsole_onProcess = function FResourceConsole_onProcess(){
   var o = this;
   var httpConsole = MO.Console.find(MO.FHttpConsole);
   var loadResources = o._loadResources;
   var loadingResources = o._loadingResources;
   var pc = loadingResources.count();
   if(!loadResources.isEmpty()){
      for(var i = o._loadLimit - pc; i > 0; i--){
         var resource = loadResources.shift();
         var sourceUrl = resource.sourceUrl();
         var connection = httpConsole.send(sourceUrl);
         connection._resource = resource;
         if(resource._dataCompress){
            if(resource._dataBlock){
               connection.addLoadListener(o, o.onBlockLoad);
            }else{
               connection.addLoadListener(o, o.onLoad);
            }
         }else{
            connection.addLoadListener(o, o.onComplete);
         }
         resource._dataLoad = true;
         loadingResources.push(resource);
         if(loadResources.isEmpty()){
            break;
         }
      }
   }
   var storages = o._processStorages;
   storages.record();
   while(storages.next()){
      var storage = storages.current();
      if(storage.testReady()){
         storages.removeCurrent();
         storage.complete();
         storage.dispose();
      }
   }
}
MO.FResourceConsole_construct = function FResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._factory = MO.Class.create(MO.FClassFactory);
   o._types = new MO.TDictionary();
   o._resources = new MO.TDictionary();
   o._loadResources  = new MO.TObjects();
   o._loadingResources = new MO.TObjects();
   o._processStorages = new MO.TLooper();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FResourceConsole_registerType = function FResourceConsole_registerType(type){
   var o = this;
   var code = type.code();
   return o._types.set(code, type);
}
MO.FResourceConsole_factory = function FResourceConsole_factory(){
   return this._factory;
}
MO.FResourceConsole_load = function FResourceConsole_load(resource){
   var o = this;
   var guid = resource.guid();
   var resources = o._resources;
   if(resources.contains(guid)){
      throw new MO.TError(o, 'Resource is already loaded. (guid={1})', guid);
   }
   resources.set(guid, resource);
   o._loadResources.push(resource);
   resource._dataLoad = true;
}
MO.FResourceDataConsole = function FResourceDataConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd           = MO.EScope.Global;
   o._loadDatas         = null;
   o._processDatas      = null;
   o._pipeline          = null;
   o._pipelinePool      = null;
   o._thread            = null;
   o._processLimit      = 4;
   o._interval          = 200;
   o.onPipelineComplete = MO.FResourceDataConsole_onPipelineComplete;
   o.onProcess          = MO.FResourceDataConsole_onProcess;
   o.construct          = MO.FResourceDataConsole_construct;
   o.allocPipeline      = MO.FResourceDataConsole_allocPipeline;
   o.freePipeline       = MO.FResourceDataConsole_freePipeline;
   o.load               = MO.FResourceDataConsole_load;
   return o;
}
MO.FResourceDataConsole_onPipelineComplete = function FResourceDataConsole_onPipelineComplete(pipeline, data){
   var o = this;
   if(pipeline){
      o.freePipeline(pipeline);
   }
   o._processDatas.remove(data);
}
MO.FResourceDataConsole_onProcess = function FResourceDataConsole_onProcess(){
   var o = this;
   var loadDatas = o._loadDatas;
   var loadCount = loadDatas.count();
   if(loadCount == 0){
      return;
   }
   var pipeline = o._pipeline;
   if(pipeline){
      if(!pipeline.testBusy()){
         var data = loadDatas.shift();
         pipeline.decompress(data);
      }
   }else{
      var processDatas = o._processDatas;
      var processCount = processDatas.count();
      var idleCount = o._processLimit - processCount;
      if(idleCount <= 0){
         return;
      }
      var freeCount = Math.min(loadCount, idleCount);
      for(var i = 0; i < freeCount; i++){
         var data = loadDatas.shift();
         var pipeline = o.allocPipeline();
         pipeline.decompress(data);
         processDatas.push(data);
      }
   }
}
MO.FResourceDataConsole_construct = function FResourceDataConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadDatas  = new MO.TObjects();
   o._processDatas = new MO.TObjects();
   o._pipelinePool  = MO.Class.create(MO.FObjectPool);
   var capability = MO.Window.Browser.capability();
   if(!capability.optionProcess){
      var pipeline = o._pipeline = MO.Class.create(FResourceSinglePipeline);
      pipeline.setConsole(o);
   }
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FResourceDataConsole_allocPipeline = function FResourceDataConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = MO.Class.create(MO.FResourceThreadPipeline);
      pipeline.setConsole(o);
      pool.push(pipeline);
   }
   return pool.alloc();
}
MO.FResourceDataConsole_freePipeline = function FResourceDataConsole_freePipeline(pipeline){
   this._pipelinePool.free(pipeline);
}
MO.FResourceDataConsole_load = function FResourceDataConsole_load(data){
   this._loadDatas.push(data);
}
MO.FResourceGroup = function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = MO.Class.register(o, new MO.AGetter('_code'));
   o._resources = null;
   return o;
}
MO.FResourceObject = function FResourceObject(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._typeCode = MO.Class.register(o, new MO.AGetter('_typeCode'));
   o._guid     = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code     = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label    = MO.Class.register(o, new MO.AGetSet('_label'));
   return o;
}
MO.FResourcePipeline = function FResourcePipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._console    = MO.Class.register(o, new MO.AGetSet('_console'));
   o._compressCd = MO.Class.register(o, new MO.AGetter('_compressCd'));
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.dispose     = MO.FResourcePipeline_dispose;
   return o;
}
MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
   var o = this;
   o._console = null;
   o._resource = null;
   o.__base.FPipeline.dispose.call(o);
}
MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
   o = MO.Class.inherits(this, o, MO.FResourcePipeline);
   o._startTime  = 0;
   o._statusBusy = false;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = MO.FResourceSinglePipeline_onComplete;
   o.construct   = MO.FResourceSinglePipeline_construct;
   o.testBusy    = MO.FResourceSinglePipeline_testBusy;
   o.decompress  = MO.FResourceSinglePipeline_decompress;
   o.dispose     = MO.FResourceSinglePipeline_dispose;
   return o;
}
MO.FResourceSinglePipeline_onComplete = function FResourceSinglePipeline_onComplete(buffer){
   var o = this;
   var data = o._data;
   var bufferData = null;
   if(buffer.constructor == Array){
      bufferData = new Uint8Array(buffer);
   }else if(buffer.constructor == ArrayBuffer){
      bufferData = buffer;
   }else{
      throw new MO.TError(o, 'Unknown buffer type.');
   }
   data.completeData(bufferData);
   var span = MO.Timer.now() - o._startTime;
   MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, bufferData.byteLength, span);
   o._console.onPipelineComplete(null, data);
   o._data = null;
   o._statusBusy = false;
}
MO.FResourceSinglePipeline_construct = function FResourceSinglePipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}
MO.FResourceSinglePipeline_testBusy = function FResourceSinglePipeline_testBusy(){
   return this._statusBusy;
}
MO.FResourceSinglePipeline_decompress = function FResourceSinglePipeline_decompress(data){
   var o = this;
   o._statusBusy = true;
   o._startTime = MO.Timer.current();
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   var processData = null;
   if(compressData.constructor == ArrayBuffer){
      processData = new Uint8Array(compressData);
   }else if(compressData.constructor == Uint8Array){
      processData = compressData;
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
}
MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
}
MO.FResourceSingleStorage = function FResourceSingleStorage(o){
   o = MO.Class.inherits(this, o, MO.FResourceStorage, MO.MResourceData);
   o.construct   = MO.FResourceSingleStorage_construct;
   o.load        = MO.FResourceSingleStorage_load;
   o.complete    = MO.FResourceSingleStorage_complete;
   o.dispose     = MO.FResourceSingleStorage_dispose;
   return o;
}
MO.FResourceSingleStorage_construct = function FResourceSingleStorage_construct(){
   var o = this;
   o.__base.FResourceStorage.construct.call(o);
}
MO.FResourceSingleStorage_load = function FResourceSingleStorage_load(buffer){
   var o = this;
   var resource = o._resource;
   o._compressLength = buffer.byteLength;
   o._compressData = new Uint8Array(buffer);
}
MO.FResourceSingleStorage_complete = function FResourceSingleStorage_complete(){
   var o = this;
   var resource = o._resource;
   resource.onComplete(o._data);
}
MO.FResourceSingleStorage_dispose = function FResourceSingleStorage_dispose(){
   var o = this;
   o.__base.MResourceData.dispose.call(o);
   o.__base.FResourceStorage.dispose.call(o);
}
MO.FResourceStorage = function FResourceStorage(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._ready      = false;
   o._dataLength = 0;
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   o.construct   = MO.FResourceStorage_construct;
   o.testReady   = MO.FResourceStorage_testReady;
   o.load        = MO.FResourceStorage_load;
   o.complete    = MO.FResourceStorage_complete;
   o.dispose     = MO.FResourceStorage_dispose;
   return o;
}
MO.FResourceStorage_construct = function FResourceStorage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FResourceStorage_testReady = function FResourceStorage_testReady(){
   return this._ready;
}
MO.FResourceStorage_load = function FResourceStorage_load(buffer){
}
MO.FResourceStorage_complete = function FResourceStorage_complete(){
}
MO.FResourceStorage_dispose = function FResourceStorage_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
   o = MO.Class.inherits(this, o, MO.FResourcePipeline);
   o._startTime  = 0;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   o.onComplete  = MO.FResourceThreadPipeline_onComplete;
   o.construct   = MO.FResourceThreadPipeline_construct;
   o.worker      = MO.FResourceThreadPipeline_worker;
   o.decompress  = MO.FResourceThreadPipeline_decompress;
   o.dispose     = MO.FResourceThreadPipeline_dispose;
   return o;
}
MO.FResourceThreadPipeline_onComplete = function FResourceThreadPipeline_onComplete(buffer){
   var o = this;
   var bufferData = null;
   if(buffer.constructor == Array){
      bufferData = new Uint8Array(buffer);
   }else if(buffer.constructor == Uint8Array){
      bufferData = buffer;
   }else{
      throw new MO.TError(o, 'Unknown buffer type.');
   }
   var data = o._data;
   data.completeData(bufferData);
   var span = MO.Timer.now() - o._startTime;
   MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, buffer.byteLength, span);
   o._console.onPipelineComplete(o, data);
   o._data = null;
}
MO.FResourceThreadPipeline_construct = function FResourceThreadPipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}
MO.FResourceThreadPipeline_worker = function FResourceThreadPipeline_worker(){
   var o = this;
   var worker = o._worker;
   if(!worker){
      var uri = MO.RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA_WORKER(uri);
   }
   return worker;
}
MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
   var o = this;
   o._startTime = MO.Timer.current();
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   var worker = o.worker();
   worker.decompress(compressData, function(buffer){o.onComplete(buffer);}, null);
}
MO.FResourceThreadPipeline_dispose = function FResourceThreadPipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
}
MO.FResourceType = function FResourceType(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
   o._resources   = MO.Class.register(o, new MO.AGetter('_resources'));
   o.construct    = MO.FResourceType_construct;
   o.findResource = MO.FResourceType_findResource;
   o.dispose      = MO.FResourceType_dispose;
   return o;
}
MO.FResourceType_construct = function FResourceType_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._resources = new MO.TDictionary();
}
MO.FResourceType_findResource = function FResourceType_findResource(p){
   return this._resources.get(p);
}
MO.FResourceType_dispose = function FResourceType_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.dispose(o._resources);
   o.__base.FObject.dispose.call(o);
}
