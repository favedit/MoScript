var EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
function SXmlEvent(){
   var o = this;
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   o.process        = SXmlEvent_process;
   o.dispose        = SXmlEvent_dispose;
   return o;
}
function SXmlEvent_process(p){
   var o = this;
   o.outputDocument = p.document;
   o.outputNode = p.root;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
function SXmlEvent_dispose(){
   var o = this;
   o.owner = null;
   o.url = null;
   o.action = null;
   o.parameter = null;
   o.inputDocument = null;
   o.outputDocument = null;
   o.callback = null;
}
function FContent(o){
   o = RClass.inherits(this, o, FObject);
   o._name = null;
   o.name  = FContent_name;
   return o;
}
function FContent_name(){
   return this._name;
}
function FContentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FContentConsole_onLoad;
   o.construct   = FContentConsole_construct;
   o.alloc       = FContentConsole_alloc;
   o.process     = FContentConsole_process;
   o.send        = FContentConsole_send;
   return o;
}
function FContentConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FContentConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FContentConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FContentConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FContentConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FContentPipeline(o){
   o = RClass.inherits(this, o, FPipeline);
   o._scopeCd = EScope.Global;
   o.scopeCd  = FContentPipeline_scopeCd;
   return o;
}
function FContentPipeline_scopeCd(){
   return this._scopeCd;
}
function FDragConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd        = EScope.Local;
   o._activeDragable = null;
   o._dragables      = null;
   o.onMouseDown     = FDragConsole_onMouseDown;
   o.onMouseMove     = FDragConsole_onMouseMove;
   o.onMouseUp       = FDragConsole_onMouseUp;
   o.construct       = FDragConsole_construct;
   o.register        = FDragConsole_register;
   o.unregister      = FDragConsole_unregister;
   o.clear           = FDragConsole_clear;
   return o;
}
function FDragConsole_onMouseDown(p){
   var o = this;
   var es = p.source;
   if(!es){
      return;
   }
   if(!RClass.isClass(es, MUiDragable)){
      return;
   }
   RWindow.setOptionSelect(false);
   o._activeDragable = es;
   es.onDragStart(p);
}
function FDragConsole_onMouseMove(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   o._activeDragable.onDragMove(p);
}
function FDragConsole_onMouseUp(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new TObjects();
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
function FDragConsole_register(p){
   this._dragables.push(p);
}
function FDragConsole_unregister(po, pc){
   this._dragables.remove(p);
}
function FDragConsole_clear(){
   this._dragables.clear();
}
function FEvent(o){
   o = RClass.inherits(this, o, FObject);
   o._owner      = null;
   o._callback   = null;
   o._valid      = true;
   o.owner       = FEvent_owner;
   o.setOwner    = FEvent_setOwner;
   o.callback    = FEvent_callback;
   o.setCallback = FEvent_setCallback;
   o.valid       = FEvent_valid;
   o.setValid    = FEvent_setValid;
   o.process     = FEvent_process;
   return o;
}
function FEvent_owner(){
   return this._owner;
}
function FEvent_setOwner(p){
   this._owner = p;
}
function FEvent_callback(){
   return this._callback;
}
function FEvent_setCallback(p){
   this._callback = p;
}
function FEvent_valid(){
   return this._valid;
}
function FEvent_setValid(p){
   this._valid = p;
}
function FEvent_process(){
   var o = this;
   if(o._valid){
      var s = o._owner;
      if(s){
         o._callback.call(s, o);
      }else{
         o._callback(o);
      }
   }
}
function FEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._thread        = null;
   o._interval      = 100;
   o._processEvents = null;
   o._events        = null;
   o.onProcess      = FEventConsole_onProcess;
   o.construct      = FEventConsole_construct;
   o.register       = FEventConsole_register;
   o.push           = FEventConsole_push;
   o.clear          = FEventConsole_clear;
   return o;
}
function FEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   if(es.isEmpty()){
      return;
   }
   var ps = o._processEvents;
   ps.assign(es);
   es.clear();
   var c = ps.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         ps.get(i).process();
      }
      ps.clear();
   }
}
function FEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._processEvents = new TObjects();
   o._events = new TObjects();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}
function FEventConsole_register(po, pc){
   var o = this;
   var e = RClass.create(FEvent);
   e.owner = po;
   e.callback = pc;
   o._events.push(e);
}
function FEventConsole_push(p){
   var o = this;
   var es = o._events;
   if(!es.contains(p)){
      es.push(p);
   }
}
function FEventConsole_clear(){
   this._events.clear();
}
function FHttpConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._pool     = null;
   o.onLoad    = FHttpConsole_onLoad;
   o.construct = FHttpConsole_construct;
   o.alloc     = FHttpConsole_alloc;
   o.send      = FHttpConsole_send;
   o.dispose   = FHttpConsole_dispose;
   return o;
}
function FHttpConsole_onLoad(p){
   var o = this;
   o._pool.free(p);
}
function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = RClass.create(FObjectPool);
}
function FHttpConsole_alloc(){
   var o = this;
   var p = o._pool;
   if(!p.hasFree()){
      var c = RClass.create(FHttpConnection);
      c._asynchronous = true;
      o._pool.push(c);
   }
   var c = p.alloc();
   c.clearLoadListeners();
   c.addLoadListener(o, o.onLoad);
   return c;
}
function FHttpConsole_send(u){
   var o = this;
   var c = o.alloc();
   c.send(u);
   return c;
}
function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope            = EScope.Page;
   o.register         = FIdleConsole_register;
   return o;
}
function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}
function FIdleConsole_construct(){
   var o = this;
}
function FLoggerConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope      = EScope.Page;
   o.iLogger    = null;
   o.onKeyDown  = FLoggerConsole_onKeyDown;
   o.construct  = FLoggerConsole_construct;
   o.connect    = FLoggerConsole_connect;
   o.disconnect = FLoggerConsole_disconnect;
   o.output     = FLoggerConsole_output;
   return o;
}
function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FLoggerConsole_connect(){
}
function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
function FLoggerConsole_output(level, obj, method, ms, msg, stack){
   var o = this;
   if(o.iLogger){
      var m = RClass.dump(obj);
      if(ms){
         m += ' (' + ms + 'ms)';
      }
      var s = level + ' [' + RString.rpad(m, 36) + '] ';
      if(stack){
         s += RString.rpad(msg, 120) + ' [' + stack + ']';
      }else{
         s += msg;
      }
      o.iLogger.Output(s);
   }
}
function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FMonitorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope      = EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new TList();
   o.hWindow    = null;
   o.doInterval = FMonitorConsole_doInterval;
   o.push       = FMonitorConsole_push;
   o.process    = FMonitorConsole_process;
   o.processAll = FMonitorConsole_processAll;
   o.startup    = FMonitorConsole_startup;
   o.wait       = FMonitorConsole_wait;
   o.release    = FMonitorConsole_release;
   return o;
}
function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case EMonitor.Sleep:
            break;
         case EMonitor.Active:
            monitor.process(this.interval);
            break;
         case EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n=0; n<monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
function FMonitorConsole_doInterval(){
   var con = RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
function FMonitorConsole_wait(request){
}
function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
function FMouseConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._activeCapture = null;
   o._captures      = null;
   o.onMouseDown    = FMouseConsole_onMouseDown;
   o.onMouseMove    = FMouseConsole_onMouseMove;
   o.onMouseUp      = FMouseConsole_onMouseUp;
   o.construct      = FMouseConsole_construct;
   o.captureStart   = FMouseConsole_captureStart;
   o.capture        = FMouseConsole_capture;
   o.captureStop    = FMouseConsole_captureStop;
   o.register       = FMouseConsole_register;
   o.unregister     = FMouseConsole_unregister;
   o.clear          = FMouseConsole_clear;
   return o;
}
function FMouseConsole_onMouseDown(p){
   var o = this;
   var s = RHtml.searchLinker(p.hSource, MMouseCapture);
   if(!s){
      return;
   }
   if(!s.testMouseCapture()){
      return;
   }
   o._activeCapture = s;
   o.captureStart(p);
}
function FMouseConsole_onMouseMove(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.capture(p);
}
function FMouseConsole_onMouseUp(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.captureStop(p);
}
function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._captures = new TObjects();
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}
function FMouseConsole_capture(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      if(c.testMouseCapture()){
         c.onMouseCapture(p);
      }else{
         o.captureStop(p)
      }
   }
}
function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   RWindow.setOptionSelect(true);
}
function FMouseConsole_register(p){
   this._captures.push(p);
}
function FMouseConsole_unregister(p){
   this._captures.remove(p);
}
function FMouseConsole_clear(){
   this._captures.clear();
}
function FPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._code = null;
   o.code  = FPipeline_code;
   return o;
}
function FPipeline_code(){
   return this._code;
}
function FProcess(o){
   o = RClass.inherits(this, o, FObject);
   o._name     = null;
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = FProcess_ohMessage;
   o.onMessage = FProcess_onMessage;
   o.construct = FProcess_construct;
   o.name      = FProcess_name;
   o.start     = FProcess_start;
   o.process   = FProcess_process;
   return o;
}
function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
function FProcess_onMessage(p){
}
function FProcess_name(){
   return this._name;
}
function FProcess_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new TObjects();
}
function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
function FProcess_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var e = new SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
function FProcessConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o.connections = null;
   o.onLoad      = FProcessConsole_onLoad;
   o.construct   = FProcessConsole_construct;
   o.alloc       = FProcessConsole_alloc;
   o.process     = FProcessConsole_process;
   o.send        = FProcessConsole_send;
   return o;
}
function FProcessConsole_construct(){
   var o = this;
   o.connections = new TObjects();
}
function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
function FProcessConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o.connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
function FProcessConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
function FProcessEvent(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = null;
   o._data      = null;
   o._listeners = null;
   o.code       = FProcessEvent_code;
   o.setCode    = FProcessEvent_setCode;
   o.data       = FProcessEvent_data;
   o.setData    = FProcessEvent_setData;
   o.register   = FProcessEvent_register;
   return o;
}
function FProcessEvent_name(){
   return this._name;
}
function FProcessEvent_code(){
   return this._code;
}
function FProcessEvent_setCode(p){
   this._code = p;
}
function FProcessEvent_data(){
   return this._data;
}
function FProcessEvent_setData(p){
   this._data = p;
}
function FProcessEvent_register(po, pf){
   var o = this;
   if(!o._listeners){
      o._listeners = new TListeners();
   }
   o._listeners.register(po, pf);
}
function FProcessor(o){
   o = RClass.inherits(this, o, FObject);
   o._name     = null;
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = FProcessor_ohMessage;
   o.onMessage = FProcessor_onMessage;
   o.construct = FProcessor_construct;
   o.name      = FProcessor_name;
   o.start     = FProcessor_start;
   o.process   = FProcessor_process;
   return o;
}
function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
function FProcessor_onMessage(p){
}
function FProcessor_name(){
   return this._name;
}
function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new TObjects();
}
function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
function FProcessor_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var e = new SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
function FProcessServer(o){
   o = RClass.inherits(this, o, FObject);
   o._name               = null;
   o._handle             = null;
   o._processors         = null;
   o.ohInterval          = FProcessServer_ohInterval;
   o.onInterval          = FProcessServer_onInterval;
   o.ohMessage           = FProcessServer_ohMessage;
   o.onMessage           = FProcessServer_onMessage;
   o.construct           = FProcessServer_construct;
   o.name                = FProcessServer_name;
   o.registerProcessor   = FProcessServer_registerProcessor;
   o.unregisterProcessor = FProcessServer_unregisterProcessor;
   o.send                = FProcessServer_send;
   o.process             = FProcessServer_process;
   return o;
}
function FProcessServer_ohInterval(){
   FProcessServer.__linker.onInterval();
}
function FProcessServer_onInterval(){
   var o = this;
}
function FProcessServer_ohMessage(p){
   FProcessServer.__linker.onMessage(p.data);
}
function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new TDictionary();
}
function FProcessServer_name(){
   return this._name;
}
function FProcessServer_registerProcessor(c, p){
   this._processors.set(c, p);
}
function FProcessServer_unregisterProcessor(c){
   this._processors.set(c, null);
}
function FProcessServer_send(p){
   var o = this;
   postMessage(p);
}
function FProcessServer_process(){
   var o = this;
   onmessage = o.ohMessage;
   FProcessServer.__linker = o;
}
function FStatistics(o){
   o = RClass.inherits(this, o, FObject);
   o._code      = null;
   o.reset      = FStatistics_reset;
   o.resetFrame = FStatistics_resetFrame;
   return o;
}
function FStatistics_reset(){
}
function FStatistics_resetFrame(){
}
function FStatisticsConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._statisticses = null;
   o.construct     = FStatisticsConsole_construct;
   o.register      = FStatisticsConsole_register;
   o.unregister    = FStatisticsConsole_unregister;
   o.find          = FStatisticsConsole_find;
   o.statisticses  = FStatisticsConsole_statisticses;
   o.reset         = FStatisticsConsole_reset;
   o.resetFrame    = FStatisticsConsole_resetFrame;
   return o;
}
function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new TDictionary();
}
function FStatisticsConsole_register(n, s){
   this._statisticses.set(n, s);
}
function FStatisticsConsole_unregister(n){
   return this._statisticses.remove(n);
}
function FStatisticsConsole_find(n){
   return this._statisticses.get(n);
}
function FStatisticsConsole_statisticses(){
   return this._statisticses;
}
function FStatisticsConsole_reset(e){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).reset();
   }
}
function FStatisticsConsole_resetFrame(u, d){
   var s = this._statisticses;
   for(var i = s.count() - 1; i >= 0; i--){
      s.getAt(i).resetFrame();
   }
}
function FThread(o){
   o = RClass.inherits(this, o, FObject, MListenerProcess);
   o._name       = null;
   o._statusCd   = EThreadStatus.Sleep;
   o._interval   = 100;
   o._delay      = 0;
   o.construct   = FThread_construct;
   o.name        = FThread_name;
   o.statusCd    = FThread_statusCd;
   o.interval    = FThread_interval;
   o.setInterval = FThread_setInterval;
   o.start       = FThread_start;
   o.stop        = FThread_stop;
   o.process     = FThread_process;
   return o;
}
function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FThread_name(){
   return this._name;
}
function FThread_statusCd(){
   return this._statusCd;
}
function FThread_interval(){
   return this._interval;
}
function FThread_setInterval(p){
   this._interval = p;
}
function FThread_start(){
   this._statusCd = EThreadStatus.Active;
}
function FThread_stop(){
   this._statusCd = EThreadStatus.Finish;
}
function FThread_process(p){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= p;
   }
}
function FThreadConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._active      = true;
   o._interval    = 20;
   o._threads     = null;
   o._hWindow     = null;
   o._hIntervalId = null;
   o.ohInterval   = FThreadConsole_ohInterval;
   o.construct    = FThreadConsole_construct;
   o.push         = FThreadConsole_push;
   o.start        = FThreadConsole_start;
   o.process      = FThreadConsole_process;
   o.processAll   = FThreadConsole_processAll;
   o.dispose      = FThreadConsole_dispose;
   return o;
}
function FThreadConsole_ohInterval(){
   var c = RConsole.get(FThreadConsole);
   c.processAll();
}
function FThreadConsole_push(p){
   this._threads.push(p);
}
function FThreadConsole_start(p){
   p.start();
   this._threads.push(p);
}
function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new TObjects();
   o._hWindow = window;
   o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
}
function FThreadConsole_process(p){
   var o = this;
   if(p){
      switch(p.statusCd()){
         case EThreadStatus.Sleep:
            break;
         case EThreadStatus.Active:
            p.process(o._interval);
            break;
         case EThreadStatus.Finish:
            p.dispose();
            o._threads.remove(p);
            break;
      }
   }
}
function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var ts = o._threads;
      var c = ts.count();
      for(var n = 0; n < c; n++){
         var t = ts.get(n);
         o.process(t);
      }
   }
}
function FThreadConsole_dispose(){
   var o = this;
   var hw = o._hWindow;
   if(hw){
      var hi = o._hIntervalId;
      if(hi){
         hw.clearInterval(hi);
         o._hIntervalId = null;
      }
      o._hWindow = null;
   }
}
function FXmlConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._connections = null;
   o._caches      = null;
   o.onLoad       = FXmlConsole_onLoad;
   o.construct    = FXmlConsole_construct;
   o.alloc        = FXmlConsole_alloc;
   o.send         = FXmlConsole_send;
   o.sendAsync    = FXmlConsole_sendAsync;
   o.load         = FXmlConsole_load;
   o.process      = FXmlConsole_process;
   return o;
}
function FXmlConsole_construct(){
   var o = this;
   o._connections = new TObjects();
   o._caches = new TDictionary();
}
function FXmlConsole_onLoad(p){
   var o = this;
   debugger
}
function FXmlConsole_alloc(){
   var o = this;
   var a = null;
   var cs = o._connections;
   for(var n = cs.count - 1; n >= 0; n--){
      var c = cs.get(n);
      if(c._statusFree){
         a = c;
         break;
      }
   }
   if(!a){
      a = RClass.create(FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   a.clearLoadListeners();
   return a;
}
function FXmlConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   c._asynchronous = false;
   var r = c.send(u, d);
   c._statusFree = true;
   return r;
}
function FXmlConsole_sendAsync(u, d, p){
   var o = this;
   var c = o.alloc();
   c._asynchronous = true;
   c._parameters = p;
   c.send(u, d);
   return c;
}
function FXmlConsole_load(u, d, p){
   var o = this;
   var v = o._caches.get(u);
   if(v){
      return v;
   }
   var c = o.alloc();
   c._asynchronous = true;
   c._parameters = p;
   v = c._cache = RClass.create(FXmlData);
   c.send(u, d);
   o._caches.set(u, v);
   return v;
}
function FXmlConsole_process(p){
   var o = this;
   if(p.constructor != SXmlEvent){
      throw new TError('Parameter type is invalid.');
   }
   var c = o.alloc();
   c._asynchronous = true;
   c.send(p.url, p.inputDocument);
   c.addLoadListener(p, p.process);
   return c;
}
