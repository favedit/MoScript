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
with(MO){
   MO.FResource = function FResource(o){
      o = RClass.inherits(this, o, FObject);
      o._typeCode     = RClass.register(o, new AGetter('_typeCode'));
      o._type         = RClass.register(o, new AGetter('_type'));
      o._guid         = RClass.register(o, new AGetSet('_guid'));
      o._code         = RClass.register(o, new AGetSet('_code'));
      o._label        = RClass.register(o, new AGetSet('_label'));
      o._sourceUrl    = RClass.register(o, new AGetSet('_sourceUrl'));
      o._dataCompress = false;
      o._dataBlock    = false;
      return o;
   }
}
with(MO){
   MO.FResourceBlockStorage = function FResourceBlockStorage(o){
      o = RClass.inherits(this, o, FResourceStorage);
      o._ready      = false;
      o._dataLength = 0;
      o._blockSize  = 0;
      o._blockCount = 0;
      o._blocks     = MO.Class.register(o, new MO.AGetter('_blocks'));
      o._resource   = null;
      o.construct   = FResourceBlockStorage_construct;
      o.testReady   = FResourceBlockStorage_testReady;
      o.load        = FResourceBlockStorage_load;
      o.complete    = FResourceBlockStorage_complete;
      o.dispose     = FResourceBlockStorage_dispose;
      return o;
   }
   MO.FResourceBlockStorage_construct = function FResourceBlockStorage_construct(){
      var o = this;
      o.__base.FResourceStorage.construct.call(o);
      o._blocks = new TObjects();
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
      var view = RClass.create(FDataView);
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
         var block = RClass.create(FResourceBlockStorageData);
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
      var stream = RClass.create(FDataStream);
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
      var span = RTimer.current() - resource._compressStartTick;
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
         o._blocks = RObject.dispose(blocks);
      }
      o.__base.FResourceStorage.dispose.call(o);
   }
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
with(MO){
   MO.FResourceConsole = function FResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd          = EScope.Global;
      o._factory          = null;
      o._types            = null;
      o._resources        = null;
      o._loadResources    = null;
      o._loadingResources = null;
      o._processStorages  = null;
      o._thread           = null;
      o._loadLimit        = 8;
      o._interval         = 150;
      o.onComplete        = FResourceConsole_onComplete;
      o.onLoad            = FResourceConsole_onLoad;
      o.onBlockLoad       = FResourceConsole_onBlockLoad;
      o.onProcess         = FResourceConsole_onProcess;
      o.construct         = FResourceConsole_construct;
      o.registerType      = FResourceConsole_registerType;
      o.factory           = FResourceConsole_factory;
      o.load              = FResourceConsole_load;
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
      var storage = RClass.create(FResourceSingleStorage);
      storage.setResource(resource);
      storage.load(data);
      RConsole.find(FResourceDataConsole).load(storage);
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }
   MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
      var o = this;
      var data = connection.outputData();
      var resource = connection._resource;
      resource._compressLength = data.byteLength;
      resource._compressStartTick = RTimer.current();
      var storage = RClass.create(FResourceBlockStorage);
      storage.setResource(resource);
      storage.load(data);
      var dataConsole = RConsole.find(FResourceDataConsole);
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
      var httpConsole = RConsole.find(FHttpConsole);
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
      o._factory = RClass.create(FClassFactory);
      o._types = new TDictionary();
      o._resources = new TDictionary();
      o._loadResources  = new TObjects();
      o._loadingResources = new TObjects();
      o._processStorages = new TLooper();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
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
         throw new TError(o, 'Resource is already loaded. (guid={1})', guid);
      }
      resources.set(guid, resource);
      o._loadResources.push(resource);
      resource._dataLoad = true;
   }
}
with(MO){
   MO.FResourceDataConsole = function FResourceDataConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd           = EScope.Global;
      o._loadDatas         = null;
      o._processDatas      = null;
      o._pipeline          = null;
      o._pipelinePool      = null;
      o._thread            = null;
      o._processLimit      = 4;
      o._interval          = 200;
      o.onPipelineComplete = FResourceDataConsole_onPipelineComplete;
      o.onProcess          = FResourceDataConsole_onProcess;
      o.construct          = FResourceDataConsole_construct;
      o.allocPipeline      = FResourceDataConsole_allocPipeline;
      o.freePipeline       = FResourceDataConsole_freePipeline;
      o.load               = FResourceDataConsole_load;
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
      o._loadDatas  = new TObjects();
      o._processDatas = new TObjects();
      o._pipelinePool  = RClass.create(FObjectPool);
      var capability = RBrowser.capability();
      if(!capability.optionProcess){
         var pipeline = o._pipeline = RClass.create(FResourceSinglePipeline);
         pipeline.setConsole(o);
      }
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FResourceDataConsole_allocPipeline = function FResourceDataConsole_allocPipeline(){
      var o = this;
      var pool = o._pipelinePool;
      if(!pool.hasFree()){
         var pipeline = RClass.create(FResourceThreadPipeline);
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
}
MO.FResourceGroup = function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = MO.Class.register(o, new MO.AGetter('_code'));
   o._resources = null;
   return o;
}
with(MO){
   MO.FResourcePipeline = function FResourcePipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._console    = MO.Class.register(o, new MO.AGetSet('_console'));
      o._compressCd = MO.Class.register(o, new MO.AGetter('_compressCd'));
      o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
      o.dispose     = FResourcePipeline_dispose;
      return o;
   }
   MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
      var o = this;
      o._console = null;
      o._resource = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._statusBusy = false;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceSinglePipeline_onComplete;
      o.construct   = FResourceSinglePipeline_construct;
      o.testBusy    = FResourceSinglePipeline_testBusy;
      o.decompress  = FResourceSinglePipeline_decompress;
      o.dispose     = FResourceSinglePipeline_dispose;
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
         throw new TError(o, 'Unknown buffer type.');
      }
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
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
      o._startTime = RTimer.current();
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      var processData = null;
      if(compressData.constructor == ArrayBuffer){
         processData = new Uint8Array(compressData);
      }else if(compressData.constructor == Uint8Array){
         processData = compressData;
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
   }
   MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      o.__base.FPipeline.dispose.call(o);
   }
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
with(MO){
   MO.FResourceStorage = function FResourceStorage(o){
      o = RClass.inherits(this, o, FObject);
      o._ready      = false;
      o._dataLength = 0;
      o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
      o.construct   = FResourceStorage_construct;
      o.testReady   = FResourceStorage_testReady;
      o.load        = FResourceStorage_load;
      o.complete    = FResourceStorage_complete;
      o.dispose     = FResourceStorage_dispose;
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
}
with(MO){
   MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceThreadPipeline_onComplete;
      o.construct   = FResourceThreadPipeline_construct;
      o.worker      = FResourceThreadPipeline_worker;
      o.decompress  = FResourceThreadPipeline_decompress;
      o.dispose     = FResourceThreadPipeline_dispose;
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
         throw new TError(o, 'Unknown buffer type.');
      }
      var data = o._data;
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
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
         var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
         worker = o._worker = new LZMA_WORKER(uri);
      }
      return worker;
   }
   MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
      var o = this;
      o._startTime = RTimer.current();
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
}
with(MO){
   MO.FResourceType = function FResourceType(o){
      o = RClass.inherits(this, o, FObject);
      o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
      o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
      o._resources   = null;
      o.construct    = FResourceType_construct;
      o.findResource = FResourceType_findResource;
      o.resources    = FResourceType_resources;
      return o;
   }
   MO.FResourceType_construct = function FResourceType_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FResourceType_findResource = function FResourceType_findResource(p){
      return this._resources.get(p);
   }
   MO.FResourceType_resources = function FResourceType_resources(){
      return this._resources;
   }
}
