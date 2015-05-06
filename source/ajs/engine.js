var EDisplayTransform = new function EDisplayTransform(){
   var o = this;
   o.CameraPosition     = 'camera.position';
   o.CameraDirection    = 'camera.direction';
   o.BilboardedSphere   = 'bilboarded.sphere';
   o.BilboardedCylinder = 'bilboarded.cylinder';
   return o;
}
var EResourceCompress = new function EResourceCompress(){
   var o = this;
   o.None    = 'none';
   o.Deflate = 'deflate';
   o.Lzma    = 'lzma';
   return o;
}
var EStageKey = new function EStageKey(){
   var o = this;
   o.Forward       = EKeyCode.W;
   o.Back          = EKeyCode.S;
   o.Up            = EKeyCode.Q;
   o.Down          = EKeyCode.E;
   o.RotationLeft  = EKeyCode.A;
   o.RotationRight = EKeyCode.D;
   o.RotationUp    = EKeyCode.Z;
   o.RotationDown  = EKeyCode.X;
   o.FocusForward  = EKeyCode.I;
   o.FocusBack     = EKeyCode.K;
   o.FocusLeft     = EKeyCode.J;
   o.FocusRight    = EKeyCode.L;
   return o;
}
function MLinkerResource(o){
   o = RClass.inherits(this, o);
   o._resource    = null;
   o.resource     = MLinkerResource_resource;
   o.setResource  = MLinkerResource_setResource;
   o.loadResource = MLinkerResource_loadResource;
   return o;
}
function MLinkerResource_resource(){
   return this._resource;
}
function MLinkerResource_setResource(resource){
   this._resource = resource;
}
function MLinkerResource_loadResource(resource){
   this._resource = resource;
}
function MListenerEnterFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addEnterFrameListener     = MListenerEnterFrame_addEnterFrameListener;
   o.removeEnterFrameListener  = MListenerEnterFrame_removeEnterFrameListener;
   o.processEnterFrameListener = MListenerEnterFrame_processEnterFrameListener;
   return o;
}
function MListenerEnterFrame_addEnterFrameListener(w, m){
   return this.addListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_removeEnterFrameListener(w, m){
   this.removeListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_processEnterFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.EnterFrame, p1, p2, p3, p4, p5);
}
function MListenerLeaveFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addLeaveFrameListener     = MListenerLeaveFrame_addLeaveFrameListener;
   o.removeLeaveFrameListener  = MListenerLeaveFrame_removeLeaveFrameListener;
   o.processLeaveFrameListener = MListenerLeaveFrame_processLeaveFrameListener;
   return o;
}
function MListenerLeaveFrame_addLeaveFrameListener(w, m){
   return this.addListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_removeLeaveFrameListener(w, m){
   this.removeListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_processLeaveFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.LeaveFrame, p1, p2, p3, p4, p5);
}
function FDisplay(o){
   o = RClass.inherits(this, o, FComponent, MGraphicObject);
   o._currentMatrix    = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.currentMatrix     = FDisplay_currentMatrix;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   o.clearRenderables  = FDisplay_clearRenderables;
   o.filterDisplays    = FDisplay_filterDisplays;
   o.filterRenderables = FDisplay_filterRenderables;
   o.show              = FDisplay_show;
   o.hide              = FDisplay_hide;
   o.setVisible        = FDisplay_setVisible;
   o.update            = FDisplay_update;
   o.updateMatrix      = FDisplay_updateMatrix;
   o.process           = FDisplay_process;
   o.remove            = FDisplay_remove;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_currentMatrix(){
   return this._currentMatrix;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var renderables = this._renderables;
   return renderables ? !renderables.isEmpty() : false;
}
function FDisplay_renderables(){
   var o = this;
   var renderables = o._renderables;
   if(!renderables){
      renderables = o._renderables = new TObjects();
   }
   return renderables;
}
function FDisplay_pushRenderable(renderable){
   var o = this;
   renderable._display = o;
   o.renderables().push(renderable);
}
function FDisplay_removeRenderable(renderable){
   var renderables = this._renderables;
   if(renderables){
      renderables.remove(renderable);
   }
}
function FDisplay_clearRenderables(){
   var renderables = this._renderables;
   if(renderables){
      renderables.clear();
   }
}
function FDisplay_filterDisplays(p){
   var o = this;
   if(o._visible){
      p.push(o);
   }
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterDrawables(p);
      }
   }
   return true;
}
function FDisplay_show(){
   this.setVisible(true);
}
function FDisplay_hide(){
   this.setVisible(false);
}
function FDisplay_setVisible(p){
   this._visible = p;
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_updateMatrix(region){
   var o = this;
   o._currentMatrix.assign(o._matrix);
   var parent = o._parent;
   if(parent){
      o._currentMatrix.append(parent._currentMatrix);
   }
}
function FDisplay_process(region){
   var o = this;
   o.updateMatrix(region);
   var renderables = o._renderables;
   if(renderables){
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.process(region);
      }
   }
}
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}
function FDisplay_dispose(){
   var o = this;
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   RObject.dispose(o._renderables)
   o.__base.FComponent.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   o.filterDisplays    = FDisplayContainer_filterDisplays;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_hasDisplay(){
   var displays = this._displays;
   if(displays){
      return !displays.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(code){
   var o = this;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(display.code() == code){
            return display;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var displays = o._displays;
   if(displays){
      var c = displays.count();
      for(var i = 0; i < c; i++){
         var f = displays.at(i);
         if(f.isName(p)){
            return f;
         }
         var r = f.searchDisplay(p);
         if(r){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_displays(){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new TObjects();
   }
   return displays;
}
function FDisplayContainer_pushDisplay(display){
   var o = this;
   display.setParent(o);
   o.displays().push(display);
}
function FDisplayContainer_removeDisplay(display){
   var o = this;
   o.displays().remove(display);
   display.setParent(null);
}
function FDisplayContainer_filterDisplays(region){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, region);
   if(!o._visible){
      return false;
   }
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterDisplays(region);
      }
   }
}
function FDisplayContainer_filterRenderables(region){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, region);
   if(!o._visible){
      return false;
   }
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterRenderables(region);
      }
   }
   return true;
}
function FDisplayContainer_process(region){
   var o = this;
   o.__base.FDisplay.process.call(o, region);
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.process(region);
      }
   }
}
function FDisplayContainer_dispose(){
   var o = this;
   var displays = o._displays;
   if(displays){
      for(var i = v.count() - 1; i >= 0; i--){
         displays.at(i).dispose();
      }
      o._displays = RObject.dispose(displays);
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive       = false;
   o._technique          = null;
   o._visibleRenderables = null;
   o.construct           = FDisplayLayer_construct;
   o.technique           = FDisplayLayer_technique;
   o.setTechnique        = FDisplayLayer_setTechnique;
   o.selectTechnique     = FDisplayLayer_selectTechnique;
   o.visibleRenderables  = FDisplayLayer_visibleRenderables;
   o.filterRenderables   = FDisplayLayer_filterRenderables;
   o.active              = FDisplayLayer_active;
   o.deactive            = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new TObjects();
}
function FDisplayLayer_technique(){
   return this._technique;
}
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}
function FDisplayLayer_visibleRenderables(){
   return this._visibleRenderables;
}
function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   o._visibleRenderables.assign(p.renderables());
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDisplayUiLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   return o;
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o._visible    = true;
   o.testVisible = FDrawable_testVisible;
   o.visible     = FDrawable_visible;
   o.setVisible  = FDrawable_setVisible;
   o.process     = RMethod.empty;
   return o;
}
function FDrawable_testVisible(){
   return this._visible;
}
function FDrawable_visible(){
   return this._visible;
}
function FDrawable_setVisible(p){
   this._visible = p;
}
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FRenderable(o){
   o = RClass.inherits(this, o, FDrawable);
   o._drawables      = null;
   o.hasDrawable     = FRenderable_hasDrawable;
   o.drawables       = FRenderable_drawables;
   o.pushDrawable    = FRenderable_pushDrawable;
   o.removeDrawable  = FRenderable_removeDrawable;
   o.filterDrawables = FRenderable_filterDrawables;
   o.process         = FRenderable_process;
   return o;
}
function FRenderable_hasDrawable(){
   var drawables = this._drawables;
   return drawables ? !drawables.isEmpty() : false;
}
function FRenderable_drawables(){
   var o = this;
   var drawables = o._drawables;
   if(!drawables){
      drawables = o._drawables = new TObjects();
   }
   return drawables;
}
function FRenderable_pushDrawable(drawable){
   var o = this;
   drawable._drawable = o;
   drawable._parent = o;
   o.drawables().push(drawable);
}
function FRenderable_removeDrawable(drawable){
   this._drawables.remove(drawable);
}
function FRenderable_filterDrawables(region){
   var o = this;
   if(!o.testVisible()){
      return false;
   }
   region.pushRenderable(o);
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         if(drawable.testVisible()){
            region.pushRenderable(drawable);
         }
      }
   }
   return true;
}
function FRenderable_process(region){
   var o = this;
   o.__base.FDrawable.process.call(o, region);
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         drawable.process(region);
      }
   }
}
function FResource(o){
   o = RClass.inherits(this, o, FObject);
   o._typeCode     = null;
   o._type         = null;
   o._dataCompress = false;
   o._dataBlock    = false;
   o._guid         = null;
   o._code         = null;
   o._label        = null;
   o._sourceUrl    = null;
   o.typeCode      = FResource_typeCode;
   o.type          = FResource_type;
   o.guid          = FResource_guid;
   o.setGuid       = FResource_setGuid;
   o.code          = FResource_code;
   o.setCode       = FResource_setCode;
   o.label         = FResource_label;
   o.setLabel      = FResource_setLabel;
   o.sourceUrl     = FResource_sourceUrl;
   o.setSourceUrl  = FResource_setSourceUrl;
   o.testBlockReady = FResource_testBlockReady;
   return o;
}
function FResource_typeCode(){
   return this._typeCode;
}
function FResource_type(){
   return this._type;
}
function FResource_guid(){
   return this._guid;
}
function FResource_setGuid(p){
   this._guid = p;
}
function FResource_code(){
   return this._code;
}
function FResource_setCode(p){
   this._code = p;
}
function FResource_label(){
   return this._label;
}
function FResource_setLabel(p){
   this._label = p;
}
function FResource_sourceUrl(){
   return this._sourceUrl;
}
function FResource_setSourceUrl(p){
   this._sourceUrl = p;
}
function FResource_testBlockReady(){
   var o = this;
   var blocks = o._blocks;
   var count = blocks.count();
   for(var i = 0; i < count; i++){
      var block = blocks.at(i);
      if(!block.testReady()){
         return false;
      }
   }
   return true;
}
function FResourceBlock(o){
   o = RClass.inherits(this, o, FObject);
   o._ready    = false;
   o._data     = null;
   o.testReady = FResourceBlock_testReady;
   o.dispose   = FResourceBlock_dispose;
   return o;
}
function FResourceBlock_testReady(){
   return this._ready;
}
function FResourceBlock_dispose(){
   var o = this;
   o._compressData = null;
   o._data = null;
   o.__base.FObject.dispose.call(o);
}
function FResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd             = EScope.Local;
   o._factory             = null;
   o._types               = null;
   o._resources           = null;
   o._loadResources       = null;
   o._loadingResources    = null;
   o._processBlocks       = null;
   o._processResources    = null;
   o._processingResources = null;
   o._pipeline            = null;
   o._pipelinePool        = null;
   o._thread              = null;
   o._loadLimit           = 8;
   o._processLimit        = 4;
   o._interval            = 200;
   o.onComplete           = FResourceConsole_onComplete;
   o.onPipelineComplete   = FResourceConsole_onPipelineComplete;
   o.onPipelineBlockComplete = FResourceConsole_onPipelineBlockComplete;
   o.onLoad               = FResourceConsole_onLoad;
   o.onBlockLoad          = FResourceConsole_onBlockLoad;
   o.onProcess            = FResourceConsole_onProcess;
   o.construct            = FResourceConsole_construct;
   o.registerType         = FResourceConsole_registerType;
   o.factory              = FResourceConsole_factory;
   o.allocPipeline        = FResourceConsole_allocPipeline;
   o.freePipeline         = FResourceConsole_freePipeline;
   o.load                 = FResourceConsole_load;
   return o;
}
function FResourceConsole_onComplete(resource, data){
   var o = this;
   resource._data = null;
   o._loadingResources.remove(resource);
   resource.onComplete(data);
}
function FResourceConsole_onPipelineComplete(pipeline, resource, data){
   var o = this;
   o.freePipeline(pipeline);
   o._processingResources.remove(resource);
   o.onComplete(resource, data);
}
function FResourceConsole_onPipelineBlockComplete(pipeline, resource, block, data){
   var o = this;
   o.freePipeline(pipeline);
   block._data = data;
   block._ready = true;
   if(resource.testBlockReady()){
      var stream = RClass.create(FDataStream);
      stream.setEndianCd(true);
      stream.setLength(resource._dataLength);
      var blocks = resource._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         var data = block._data;
         stream.writeBytes(data.buffer, 0, data.byteLength);
         block.dispose();
      }
      blocks.clear();
      stream.flip();
      var span = RTimer.current() - resource._compressStartTick;
      RLogger.info(o, 'Process resource decompress. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, resource._compressLength, resource._dataLength, span);
      resource.onComplete(stream);
   }
}
function FResourceConsole_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var resource = connection._resource;
   resource._data = new Uint8Array(data);
   o._loadingResources.remove(resource);
   o._processResources.push(resource);
}
function FResourceConsole_onBlockLoad(connection){
   var o = this;
   var resource = connection._resource;
   var data = connection.outputData();
   var view = RClass.create(FDataView);
   view.setEndianCd(true);
   view.link(data);
   var compressCode = view.readString();
   var length = resource._dataLength = view.readInt32();
   var blockSize = view.readInt32();
   var blockCount = view.readInt32();
   var blocks = resource._blocks = new TObjects();
   for(var i = 0; i < blockCount; i++){
      var size = view.readInt32();
      var blockData = new ArrayBuffer(size);
      view.readBytes(blockData, 0, size);
      var block = RClass.create(FResourceBlock);
      block._index = i;
      block._compressData = new Uint8Array(blockData);
      blocks.push(block);
      var pipeline = o.allocPipeline();
      pipeline.decompressBlock(resource, block);
   }
   view.dispose();
   o._loadingResources.remove(resource);
   resource._compressLength = data.byteLength;
   resource._compressStartTick = RTimer.current();
}
function FResourceConsole_onProcess(){
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
   var processResources = o._processResources;
   var processingResources = o._processingResources;
   var pc = processingResources.count();
   if(!processResources.isEmpty()){
      var pipeline = o._pipeline;
      if(pipeline){
         if(processingResources.isEmpty()){
            var resource = processResources.shift();
            processingResources.push(resource);
            pipeline.decompressSingle(resource);
         }
      }else{
         for(var i = o._processLimit - pc; i > 0; i--){
            var resource = processResources.shift();
            var pipeline = o.allocPipeline();
            processingResources.push(resource);
            pipeline.decompress(resource);
            if(processResources.isEmpty()){
               break;
            }
         }
      }
   }
}
function FResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._factory = RClass.create(FClassFactory);
   o._types = new TDictionary();
   o._resources = new TDictionary();
   o._loadResources  = new TObjects();
   o._loadingResources = new TObjects();
   o._processBlocks = new TLooper();
   o._processResources = new TObjects();
   o._processingResources = new TObjects();
   o._pipelinePool  = RClass.create(FObjectPool);
   var bc = RBrowser.capability();
   if(!bc.optionProcess){
      var p = o._pipeline = RClass.create(FResourceLzmaPipeline);
      p.setConsole(o);
   }
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FResourceConsole_registerType(p){
   var o = this;
   var c = p.code();
   return o._types.set(c, p);;
}
function FResourceConsole_factory(){
   return this._factory;
}
function FResourceConsole_allocPipeline(){
   var o = this;
   var pool = o._pipelinePool;
   if(!pool.hasFree()){
      var pipeline = RClass.create(FResourceLzmaPipeline);
      pipeline.setConsole(o);
      pool.push(pipeline);
   }
   return pool.alloc();
}
function FResourceConsole_freePipeline(pipeline){
   this._pipelinePool.free(pipeline);
}
function FResourceConsole_load(resource){
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
function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = null;
   o._resources = null;
   o.code       = FResourceGroup_code;
   return o;
}
function FResourceGroup_code(){
   return this._code;
}
function FResourceLzmaPipeline(o){
   o = RClass.inherits(this, o, FResourcePipeline);
   o._worker          = null;
   o._dataLength      = 0;
   o._startTime       = 0;
   o.onComplete       = FResourceLzmaPipeline_onComplete;
   o.onBlockComplete  = FResourceLzmaPipeline_onBlockComplete;
   o.construct        = FResourceLzmaPipeline_construct;
   o.worker           = FResourceLzmaPipeline_worker;
   o.decompress       = FResourceLzmaPipeline_decompress;
   o.decompressBlock  = FResourceLzmaPipeline_decompressBlock;
   o.decompressSingle = FResourceLzmaPipeline_decompressSingle;
   o.dispose          = FResourceLzmaPipeline_dispose;
   return o;
}
function FResourceLzmaPipeline_onComplete(data){
   var o = this;
   var resource = o._resource;
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource decompress. (guid={1}, length={2}, total={3}, tick={4})', resource.guid(), o._dataLength, data.byteLength, span);
   o._console.onPipelineComplete(o, resource, data);
   o._startTime = RTimer.current();
}
function FResourceLzmaPipeline_onBlockComplete(data){
   var o = this;
   var resource = o._resource;
   var block = o._block;
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource block decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', resource.guid(), block._index, o._dataLength, data.byteLength, span);
   o._console.onPipelineBlockComplete(o, resource, block, data);
   o._startTime = RTimer.current();
}
function FResourceLzmaPipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}
function FResourceLzmaPipeline_worker(){
   var o = this;
   var worker = o._worker;
   if(!worker){
      var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA(uri);
   }
   return worker;
}
function FResourceLzmaPipeline_decompress(resource){
   var o = this;
   var data = resource._data;
   o._resource = resource;
   var worker = o.worker();
   worker.decompress(data, function(value){o.onComplete(value);}, null);
   o._dataLength = data.byteLength;
   o._startTime = RTimer.current();
}
function FResourceLzmaPipeline_decompressBlock(resource, block){
   var o = this;
   var data = block._compressData;
   o._resource = resource;
   o._block = block;
   var worker = o.worker();
   worker.decompress(data, function(value){o.onBlockComplete(value);}, null);
   o._dataLength = data.byteLength;
   o._startTime = RTimer.current();
}
function FResourceLzmaPipeline_decompressSingle(resource){
   var o = this;
   var d = resource._data;
   o._resource = resource;
   o._dataLength = d.byteLength;
   o._startTime = RTimer.now();
   LZMAD.decompress(d, function(value){o.onComplete(value);}, null);
}
function FResourceLzmaPipeline_dispose(){
   var o = this;
   o._worker = null;
   o.__base.FPipeline.dispose.call(o);
}
function FResourcePipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   o._console    = null;
   o._compressCd = null;
   o._resource   = null;
   o.console     = FResourcePipeline_console;
   o.setConsole  = FResourcePipeline_setConsole;
   o.compressCd  = FResourcePipeline_compressCd;
   o.resource    = FResourcePipeline_resource;
   o.setResource = FResourcePipeline_setResource;
   o.dispose     = FResourcePipeline_dispose;
   return o;
}
function FResourcePipeline_console(){
   return this._console;
}
function FResourcePipeline_setConsole(p){
   this._console = p;
}
function FResourcePipeline_compressCd(){
   return this._compressCd;
}
function FResourcePipeline_resource(){
   return this._resource;
}
function FResourcePipeline_setResource(p){
   this._resource = p;
}
function FResourcePipeline_dispose(){
   var o = this;
   o._console = null;
   o._resource = null;
   o.__base.FPipeline.dispose.call(o);
}
function FResourceType(o){
   o = RClass.inherits(this, o, FObject);
   o._code        = null;
   o._pipeline    = null;
   o._resources   = null;
   o.construct    = FResourceType_construct;
   o.code         = FResourceType_code;
   o.setCode      = FResourceType_setCode;
   o.pipeline     = FResourceType_pipeline;
   o.setPipeline  = FResourceType_setPipeline;
   o.findResource = FResourceType_findResource;
   o.resources    = FResourceType_resources;
   return o;
}
function FResourceType_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._resources = new TDictionary();
}
function FResourceType_code(){
   return this._code;
}
function FResourceType_setCode(p){
   this._code = p;
}
function FResourceType_pipeline(){
   return this._pipeline;
}
function FResourceType_setPipeline(p){
   this._pipeline = p;
}
function FResourceType_findResource(p){
   return this._resources.get(p);
}
function FResourceType_resources(){
   return this._resources;
}
function FStage(o){
   o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
   o._statusActive   = false;
   o._layers         = null;
   o._timer          = null;
   o.onProcess       = FStage_onProcess;
   o.construct       = FStage_construct;
   o.timer           = FStage_timer;
   o.registerLayer   = FStage_registerLayer;
   o.unregisterLayer = FStage_unregisterLayer;
   o.layers          = FStage_layers;
   o.active          = FStage_active;
   o.deactive        = FStage_deactive;
   o.process         = FStage_process;
   o.dispose         = FStage_dispose;
   return o;
}
function FStage_onProcess(){
   var o = this;
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.valueAt(i).process();
   }
}
function FStage_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._timer = RClass.create(FTimer);
   o._layers = new TDictionary();
}
function FStage_timer(){
   return this._timer;
}
function FStage_registerLayer(n, l){
   l.setCode(n);
   this._layers.set(n, l);
}
function FStage_unregisterLayer(n){
   this._layers.set(n, null);
}
function FStage_layers(){
   return this._layers;
}
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).active();
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).deactive();
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   var t = o._timer;
   if(!t){
      t = RClass.create(FTimer);
      t.setup();
   }
   o.processEnterFrameListener(o);
   o.onProcess();
   o.processLeaveFrameListener(o);
   t.update();
}
function FStage_dispose(){
   var o = this;
   o._timer = RObject.dispose(o._timer);
   o._layers = RObject.dispose(o._layers);
   o.__base.MListenerEnterFrame.dispose.call(o);
   o.__base.MListenerLeaveFrame.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
var RStage = new function RStage(){
   var o = this;
   o._started       = false;
   o._active        = true;
   o._interval      = 1000 / 40;
   o._stages        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess      = RStage_onProcess;
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.unregister     = RStage_unregister;
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
   o.process        = RStage_process;
   o.start          = RStage_start;
   o.construct();
   return o;
}
function RStage_onProcess(){
   RStage.process();
}
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_register(name, stage){
   var o = this;
   var stages = o._stages;
   if(!stages){
      stages = o._stages = new TDictionary();
   }
   stages.set(name , stage);
}
function RStage_unregister(stage){
   this._stages.removeValue(stage);
}
function RStage_active(){
   var o = this;
   var stages = o._stages;
   if(stages){
      var count = stages.count();
      for(var i = 0; i < count; i++){
         var stage = stages.at(i);
         stage.active();
      }
   }
}
function RStage_deactive(){
   var o = this;
   var stages = o._stages;
   if(stages){
      var count = stages.count();
      for(var i = 0; i < count; i++){
         var stage = stages.at(i);
         stage.deactive();
      }
   }
}
function RStage_process(){
   var o = this;
   if(!o._active){
      return;
   }
   try{
      o.lsnsEnterFrame.process(o);
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.process();
         }
      }
      o.lsnsLeaveFrame.process(o);
      RTimer.update();
   }catch(e){
      alert(e);
   }
}
function RStage_start(interval){
   var o = this;
   if(o._started){
      return;
   }
   RE3dEngine.setup();
   o.active();
   o.process();
   if(interval == null){
      interval = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(interval));
   o._started = true;
}
