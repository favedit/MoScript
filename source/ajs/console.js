MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
MO.SProcessEvent = function SProcessEvent(){
   var o = this;
   o.index = null;
   o.code  = null;
   o.data  = null;
   return o;
}
MO.SXmlEvent = function SXmlEvent(){
   var o = this;
   o.owner          = null;
   o.url            = null;
   o.action         = null;
   o.parameter      = null;
   o.inputDocument  = null;
   o.outputDocument = null;
   o.callback       = null;
   o.process        = MO.SXmlEvent_process;
   o.dispose        = MO.SXmlEvent_dispose;
   return o;
}
MO.SXmlEvent_process = function SXmlEvent_process(p){
   var o = this;
   o.outputDocument = p.document;
   o.outputNode = p.root;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
MO.SXmlEvent_dispose = function SXmlEvent_dispose(){
   var o = this;
   o.owner = null;
   o.url = null;
   o.action = null;
   o.parameter = null;
   o.inputDocument = null;
   o.outputDocument = null;
   o.callback = null;
}
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
MO.FContentConsole = function FContentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FContentConsole_onLoad;
   o.construct    = MO.FContentConsole_construct;
   o.alloc        = MO.FContentConsole_alloc;
   o.process      = MO.FContentConsole_process;
   o.send         = MO.FContentConsole_send;
   return o;
}
MO.FContentConsole_construct = function FContentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._connections = new MO.TObjects();
}
MO.FContentConsole_onLoad = function FContentConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
MO.FContentConsole_alloc = function FContentConsole_alloc(){
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
      a = MO.Class.create(MO.FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
MO.FContentConsole_process = function FContentConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
MO.FContentConsole_send = function FContentConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
MO.FDragConsole = function FDragConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = MO.EScope.Local;
   o._activeDragable = null;
   o._dragables      = null;
   o.onMouseDown     = MO.FDragConsole_onMouseDown;
   o.onMouseMove     = MO.FDragConsole_onMouseMove;
   o.onMouseUp       = MO.FDragConsole_onMouseUp;
   o.construct       = MO.FDragConsole_construct;
   o.register        = MO.FDragConsole_register;
   o.unregister      = MO.FDragConsole_unregister;
   o.clear           = MO.FDragConsole_clear;
   return o;
}
MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
   var o = this;
   var es = p.source;
   if(!es){
      return;
   }
   if(!MO.Class.isClass(es, MO.MUiDragable)){
      return;
   }
   MO.RWindow.setOptionSelect(false);
   o._activeDragable = es;
   es.onDragStart(p);
}
MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   o._activeDragable.onDragMove(p);
}
MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
   var o = this;
   if(!o._activeDragable){
      return;
   }
   MO.RWindow.setOptionSelect(true);
   o._activeDragable.onDragStop(p);
   o._activeDragable = null;
}
MO.FDragConsole_construct = function FDragConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._dragables = new MO.TObjects();
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FDragConsole_register = function FDragConsole_register(p){
   this._dragables.push(p);
}
MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
   this._dragables.remove(p);
}
MO.FDragConsole_clear = function FDragConsole_clear(){
   this._dragables.clear();
}
MO.FEnvironment = function FEnvironment(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name  = MO.Class.register(o, new MO.AGetSet('_name'));
   o._value = MO.Class.register(o, new MO.AGetSet('_value'));
   o.set    = MO.FEnvironment_set;
   return o;
}
MO.FEnvironment_set = function FEnvironment_set(name, value){
   var o = this;
   o._name = name;
   o._value = value;
}
MO.FEnvironmentConsole = function FEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
   o.construct     = MO.FEnvironmentConsole_construct;
   o.register      = MO.FEnvironmentConsole_register;
   o.registerValue = MO.FEnvironmentConsole_registerValue;
   o.find          = MO.FEnvironmentConsole_find;
   o.findValue     = MO.FEnvironmentConsole_findValue;
   o.parse         = MO.FEnvironmentConsole_parse;
   o.dispose       = MO.FEnvironmentConsole_dispose;
   return o;
}
MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._environments = new MO.TDictionary();
}
MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
   var o = this;
   var name = environment.name();
   o._environments.set(name, environment);
}
MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
   var o = this;
   var environment = MO.RClass.create(MO.FEnvironment);
   environment.set(name, value);
   o._environments.set(name, environment);
   return environment;
}
MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
   return this._environments.get(name);
}
MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
   var o = this;
   var value = null;
   var environment = o._environments.get(name);
   if(environment){
      value = environment.value();
   }
   return value;
}
MO.FEnvironmentConsole_parse = function FEnvironmentConsole_parse(value){
   var o = this;
   var result = value;
   var environments = o._environments;
   var count = environments.count();
   for(var i = 0; i < count; i++){
      var environment = environments.at(i);
      result = MO.Lang.String.replace(result, '{' + environment.name() + '}', environment.value());
   }
   return result;
}
MO.FEnvironmentConsole_dispose = function FEnvironmentConsole_dispose(){
   var o = this;
   o._environments = new TDictionary();
   o.__base.FConsole.dispose.call(o);
}
MO.FEvent = function FEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._owner      = MO.Class.register(o, new MO.AGetSet('_owner'));
   o._callback   = MO.Class.register(o, new MO.AGetSet('_callback'));
   o._valid      = MO.Class.register(o, new MO.AGetSet('_valid'), true);
   o.process     = MO.FEvent_process;
   return o;
}
MO.FEvent_process = function FEvent_process(){
   var o = this;
   if(o._valid){
      var owner = o._owner;
      if(owner){
         o._callback.call(owner, o);
      }else{
         o._callback(o);
      }
   }
}
MO.FEventConsole = function FEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._thread        = null;
   o._interval      = 100;
   o._processEvents = null;
   o._events        = null;
   o.onProcess      = MO.FEventConsole_onProcess;
   o.construct      = MO.FEventConsole_construct;
   o.register       = MO.FEventConsole_register;
   o.push           = MO.FEventConsole_push;
   o.clear          = MO.FEventConsole_clear;
   return o;
}
MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
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
MO.FEventConsole_construct = function FEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._processEvents = new MO.TObjects();
   o._events = new MO.TObjects();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.lsnsProcess.register(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(thread));
}
MO.FEventConsole_register = function FEventConsole_register(po, pc){
   var o = this;
   var e = MO.Class.create(FEvent);
   e.owner = po;
   e.callback = pc;
   o._events.push(e);
}
MO.FEventConsole_push = function FEventConsole_push(p){
   var o = this;
   var es = o._events;
   if(!es.contains(p)){
      es.push(p);
   }
}
MO.FEventConsole_clear = function FEventConsole_clear(){
   this._events.clear();
}
MO.FHttpConsole = function FHttpConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._pool     = null;
   o.onLoad    = MO.FHttpConsole_onLoad;
   o.construct = MO.FHttpConsole_construct;
   o.alloc     = MO.FHttpConsole_alloc;
   o.free      = MO.FHttpConsole_free;
   o.send      = MO.FHttpConsole_send;
   o.sendAsync = MO.FHttpConsole_sendAsync;
   o.fetch     = MO.FHttpConsole_fetch;
   o.dispose   = MO.FHttpConsole_dispose;
   return o;
}
MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(connection){
   var o = this;
   o._pool.free(connection);
}
MO.FHttpConsole_construct = function FHttpConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._pool = MO.Class.create(MO.FObjectPool);
}
MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
   var o = this;
   var pool = o._pool;
   if(!pool.hasFree()){
      var connection = MO.Class.create(MO.FHttpConnection);
      connection._asynchronous = true;
      o._pool.push(connection);
   }
   var connection = pool.alloc();
   connection.clearLoadListeners();
   connection.clearProcessListeners();
   connection.addLoadListener(o, o.onLoad);
   return connection;
}
MO.FHttpConsole_free = function FHttpConsole_free(connection){
   this._pool.free(connection);
}
MO.FHttpConsole_send = function FHttpConsole_send(url, data){
   var o = this;
   var connection = o.alloc();
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_sendAsync = function FHttpConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_fetch = function FHttpConsole_fetch(url, data){
   var o = this;
   var connection = o.alloc();
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FIdleConsole = function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope    = MO.EScope.Page;
   o.register = MO.FIdleConsole_register;
   return o;
}
MO.FIdleConsole_register = function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}
MO.FIdleConsole_construct = function FIdleConsole_construct(){
   var o = this;
}
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   o._scopeCd  = MO.EScope.Local;
   o.onLoad    = MO.FJsonConsole_onLoad;
   o.send      = MO.FJsonConsole_send;
   o.sendAsync = MO.FJsonConsole_sendAsync;
   return o;
}
MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
   var o = this;
   o.__base.FHttpConsole.onLoad.call(o, connection)
   var source = connection.outputData();
   var content = JSON.parse(source);
   var event = MO.Memory.alloc(MO.SEvent);
   event.connection = connection;
   event.content = content;
   connection.processProcessListener(event);
   MO.Memory.free(event);
}
MO.FJsonConsole_send = function FJsonConsole_send(u, d){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   connection._contentCd = MO.EHttpContent.Text;
   var result = connection.send(url, data);
   console.free(connection);
   return result;
}
MO.FJsonConsole_sendAsync = function FJsonConsole_sendAsync(url, data){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._contentCd = MO.EHttpContent.Text;
   connection.send(url, data);
   return connection;
}
MO.FLoggerConsole = function FLoggerConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Page;
   o.iLogger    = null;
   o.onKeyDown  = MO.FLoggerConsole_onKeyDown;
   o.construct  = MO.FLoggerConsole_construct;
   o.connect    = MO.FLoggerConsole_connect;
   o.disconnect = MO.FLoggerConsole_disconnect;
   o.output     = MO.FLoggerConsole_output;
   return o;
}
MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
   if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
      this.connect();
   }
}
MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
}
MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
   this.iLogger = null;
}
MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
   var o = this;
   if(o.iLogger){
      var m = MO.Class.dump(obj);
      if(ms){
         m += ' (' + ms + 'ms)';
      }
      var s = level + ' [' + MO.Lang.String.rpad(m, 36) + '] ';
      if(stack){
         s += MO.Lang.String.rpad(msg, 120) + ' [' + stack + ']';
      }else{
         s += msg;
      }
      o.iLogger.Output(s);
   }
}
MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
MO.FMonitorConsole = function FMonitorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope      = MO.EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new MO.TList();
   o.hWindow    = null;
   o.doInterval = MO.FMonitorConsole_doInterval;
   o.push       = MO.FMonitorConsole_push;
   o.process    = MO.FMonitorConsole_process;
   o.processAll = MO.FMonitorConsole_processAll;
   o.startup    = MO.FMonitorConsole_startup;
   o.wait       = MO.FMonitorConsole_wait;
   o.release    = MO.FMonitorConsole_release;
   return o;
}
MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + MO.Lang.String.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
   if(monitor){
      switch(monitor.status){
         case MO.EMonitor.Sleep:
            break;
         case MO.EMonitor.Active:
            monitor.process(this.interval);
            break;
         case MO.EMonitor.Cancel:
            this.monitors.removeItem(monitor);
            break;
      }
   }
}
MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n = 0; n < monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
   var con = MO.RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      debugger;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
}
MO.FMonitorConsole_release = function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
MO.FMouseConsole = function FMouseConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeCapture = null;
   o.onMouseDown    = MO.FMouseConsole_onMouseDown;
   o.onMouseMove    = MO.FMouseConsole_onMouseMove;
   o.onMouseUp      = MO.FMouseConsole_onMouseUp;
   o.construct      = MO.FMouseConsole_construct;
   o.captureStart   = MO.FMouseConsole_captureStart;
   o.capture        = MO.FMouseConsole_capture;
   o.captureStop    = MO.FMouseConsole_captureStop;
   o.register       = MO.FMouseConsole_register;
   o.unregister     = MO.FMouseConsole_unregister;
   o.clear          = MO.FMouseConsole_clear;
   return o;
}
MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
   var o = this;
   var s = MO.RHtml.searchLinker(p.hSource, MO.MMouseCapture);
   if(!s){
      return;
   }
   if(!s.testMouseCapture()){
      return;
   }
   o._activeCapture = s;
   o.captureStart(p);
}
MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.capture(p);
}
MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
   var o = this;
   if(!o._activeCapture){
      return;
   }
   o.captureStop(p);
}
MO.FMouseConsole_construct = function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}
MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      MO.RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}
MO.FMouseConsole_capture = function FMouseConsole_capture(p){
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
MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   MO.RWindow.setOptionSelect(true);
}
MO.FMouseConsole_register = function FMouseConsole_register(p){
}
MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
}
MO.FMouseConsole_clear = function FMouseConsole_clear(){
}
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
MO.FProcess = function FProcess(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcess_ohMessage;
   o.onMessage = MO.FProcess_onMessage;
   o.construct = MO.FProcess_construct;
   o.name      = MO.FProcess_name;
   o.start     = MO.FProcess_start;
   o.process   = MO.FProcess_process;
   return o;
}
MO.FProcess_ohMessage = function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcess_onMessage = function FProcess_onMessage(p){
}
MO.FProcess_construct = function FProcess_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcess_start = function FProcess_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
MO.FProcess_process = function FProcess_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var e = new MO.SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
MO.FProcessConsole = function FProcessConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o.onLoad       = MO.FProcessConsole_onLoad;
   o.construct    = MO.FProcessConsole_construct;
   o.alloc        = MO.FProcessConsole_alloc;
   o.process      = MO.FProcessConsole_process;
   o.send         = MO.FProcessConsole_send;
   return o;
}
MO.FProcessConsole_construct = function FProcessConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
}
MO.FProcessConsole_onLoad = function FProcessConsole_onLoad(){
   var o = this;
   var e = o.event;
   e.document = o.document;
   e.process();
   o.event = null;
   o.document = null;
   o._statusFree = true;
}
MO.FProcessConsole_alloc = function FProcessConsole_alloc(){
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
      a = MO.Class.create(MO.FXmlConnection);
      cs.push(a);
      a.onLoad = o.onLoad;
   }
   a._statusFree = false;
   return a;
}
MO.FProcessConsole_process = function FProcessConsole_process(e){
   var o = this;
   var c = o.alloc();
   c.event = e;
   switch(e.code){
      case MO.EXmlEvent.Send:
         c.send(e.url, e.document);
         break;
      case MO.EXmlEvent.Receive:
         c.receive(e.url, e.document);
         break;
      case MO.EXmlEvent.SyncSend:
         return c.syncSend(e.url, e.document);
      case MO.EXmlEvent.SyncReceive:
         return c.syncReceive(e.url, e.document);
   }
}
MO.FProcessConsole_send = function FProcessConsole_send(u, d){
   var o = this;
   var c = o.alloc();
   var r = c.syncSend(u, d);
   c._statusFree = true;
   return r;
}
MO.FProcessEvent = function FProcessEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
   o._listeners = null;
   o.register   = MO.FProcessEvent_register;
   return o;
}
MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
   var o = this;
   if(!o._listeners){
      o._listeners = new MO.TListeners();
   }
   o._listeners.register(owner, callback);
}
MO.FProcessor = function FProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   o.ohMessage = MO.FProcessor_ohMessage;
   o.onMessage = MO.FProcessor_onMessage;
   o.construct = MO.FProcessor_construct;
   o.start     = MO.FProcessor_start;
   o.process   = MO.FProcessor_process;
   return o;
}
MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}
MO.FProcessor_onMessage = function FProcessor_onMessage(p){
}
MO.FProcessor_construct = function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._events = new MO.TObjects();
}
MO.FProcessor_start = function FProcessor_start(p){
   var o = this;
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
   }
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}
MO.FProcessor_process = function FProcessor_process(p){
   var o = this;
   var es = o._events;
   var c = es.count();
   es.push(p);
   var event = new MO.SProcessEvent();
   event.index = c;
   event.code = p.code();
   event.data = p.data();
   o._worker.postMessage(event);
}
MO.FProcessServer = function FProcessServer(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name               = MO.Class.register(o, new MO.AGetSet('_name'));
   o._handle             = null;
   o._processors         = null;
   o.ohInterval          = MO.FProcessServer_ohInterval;
   o.onInterval          = MO.FProcessServer_onInterval;
   o.ohMessage           = MO.FProcessServer_ohMessage;
   o.onMessage           = MO.FProcessServer_onMessage;
   o.construct           = MO.FProcessServer_construct;
   o.registerProcessor   = MO.FProcessServer_registerProcessor;
   o.unregisterProcessor = MO.FProcessServer_unregisterProcessor;
   o.send                = MO.FProcessServer_send;
   o.process             = MO.FProcessServer_process;
   return o;
}
MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
   MO.FProcessServer.__linker.onInterval();
}
MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
   var o = this;
}
MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
   MO.FProcessServer.__linker.onMessage(p.data);
}
MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
   var o = this;
   console.log('messgae', this, p);
}
MO.FProcessServer_construct = function FProcessServer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._processors = new MO.TDictionary();
}
MO.FProcessServer_registerProcessor = function FProcessServer_registerProcessor(c, p){
   this._processors.set(c, p);
}
MO.FProcessServer_unregisterProcessor = function FProcessServer_unregisterProcessor(c){
   this._processors.set(c, null);
}
MO.FProcessServer_send = function FProcessServer_send(p){
   var o = this;
   postMessage(p);
}
MO.FProcessServer_process = function FProcessServer_process(){
   var o = this;
   onmessage = o.ohMessage;
   FProcessServer.__linker = o;
}
MO.FStatistics = function FStatistics(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code      = null;
   o.reset      = MO.FStatistics_reset;
   o.resetFrame = MO.FStatistics_resetFrame;
   return o;
}
MO.FStatistics_reset = function FStatistics_reset(){
}
MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
}
MO.FStatisticsConsole = function FStatisticsConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._statisticses = MO.Class.register(o, new MO.AGetter('_statisticses'));
   o.construct     = MO.FStatisticsConsole_construct;
   o.register      = MO.FStatisticsConsole_register;
   o.unregister    = MO.FStatisticsConsole_unregister;
   o.find          = MO.FStatisticsConsole_find;
   o.reset         = MO.FStatisticsConsole_reset;
   o.resetFrame    = MO.FStatisticsConsole_resetFrame;
   return o;
}
MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
   var o = this;
   o._statisticses = new MO.TDictionary();
}
MO.FStatisticsConsole_register = function FStatisticsConsole_register(n, s){
   this._statisticses.set(n, s);
}
MO.FStatisticsConsole_unregister = function FStatisticsConsole_unregister(n){
   return this._statisticses.remove(n);
}
MO.FStatisticsConsole_find = function FStatisticsConsole_find(n){
   return this._statisticses.get(n);
}
MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).reset();
   }
}
MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
   var statisticses = this._statisticses;
   for(var i = statisticses.count() - 1; i >= 0; i--){
      statisticses.at(i).resetFrame();
   }
}
MO.FThread = function FThread(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerProcess);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   o._delay      = 0;
   o.construct   = MO.FThread_construct;
   o.start       = MO.FThread_start;
   o.stop        = MO.FThread_stop;
   o.process     = MO.FThread_process;
   return o;
}
MO.FThread_construct = function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FThread_start = function FThread_start(){
   this._statusCd = MO.EThreadStatus.Active;
}
MO.FThread_stop = function FThread_stop(){
   this._statusCd = MO.EThreadStatus.Finish;
}
MO.FThread_process = function FThread_process(interval){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= interval;
   }
}
MO.FThreadConsole = function FThreadConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._active      = true;
   o._interval    = 5;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   o._hWindow     = null;
   o._hIntervalId = null;
   o.ohInterval   = MO.FThreadConsole_ohInterval;
   o.construct    = MO.FThreadConsole_construct;
   o.push         = MO.FThreadConsole_push;
   o.start        = MO.FThreadConsole_start;
   o.process      = MO.FThreadConsole_process;
   o.processAll   = MO.FThreadConsole_processAll;
   o.dispose      = MO.FThreadConsole_dispose;
   return o;
}
MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
   var threadConsole = MO.Console.get(MO.FThreadConsole);
   threadConsole.processAll();
}
MO.FThreadConsole_push = function FThreadConsole_push(thread){
   this._threads.push(thread);
}
MO.FThreadConsole_start = function FThreadConsole_start(thread){
   thread.start();
   this._threads.push(thread);
}
MO.FThreadConsole_construct = function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new MO.TObjects();
   o._hWindow = window;
   o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
}
MO.FThreadConsole_process = function FThreadConsole_process(thread){
   var o = this;
   if(thread){
      var statusCd = thread.statusCd();
      switch(statusCd){
         case MO.EThreadStatus.Sleep:
            break;
         case MO.EThreadStatus.Active:
            thread.process(o._interval);
            break;
         case MO.EThreadStatus.Finish:
            o._threads.remove(thread);
            thread.dispose();
            break;
      }
   }
}
MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var threads = o._threads;
      var count = threads.count();
      for(var n = 0; n < count; n++){
         var thread = threads.at(n);
         o.process(thread);
      }
   }
}
MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
   var o = this;
   var hWindow = o._hWindow;
   if(hWindow){
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         hWindow.clearInterval(hIntervalId);
         o._hIntervalId = null;
      }
      o._hWindow = null;
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   o.__base.FConsole.dispose.call(o);
}
MO.FTimeConsole = function FTimeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Global;
   o._date     = null;
   o.construct = MO.FTimeConsole_construct;
   o.dispose   = MO.FTimeConsole_dispose;
   return o;
}
MO.FTimeConsole_construct = function FTimeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FTimeConsole_dispose = function FTimeConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._connections = null;
   o._caches      = null;
   o.onLoad       = MO.FXmlConsole_onLoad;
   o.construct    = MO.FXmlConsole_construct;
   o.alloc        = MO.FXmlConsole_alloc;
   o.send         = MO.FXmlConsole_send;
   o.sendAsync    = MO.FXmlConsole_sendAsync;
   o.load         = MO.FXmlConsole_load;
   o.process      = MO.FXmlConsole_process;
   return o;
}
MO.FXmlConsole_construct = function FXmlConsole_construct(){
   var o = this;
   o._connections = new MO.TObjects();
   o._caches = new MO.TDictionary();
}
MO.FXmlConsole_onLoad = function FXmlConsole_onLoad(p){
   var o = this;
   debugger
}
MO.FXmlConsole_alloc = function FXmlConsole_alloc(){
   var o = this;
   var alloc = null;
   var connections = o._connections;
   for(var n = connections.count - 1; n >= 0; n--){
      var connection = connections.get(n);
      if(connection._statusFree){
         alloc = connection;
         break;
      }
   }
   if(!alloc){
      alloc = MO.Class.create(MO.FXmlConnection);
      connections.push(alloc);
      alloc.onLoad = o.onLoad;
   }
   alloc._statusFree = false;
   alloc.clearLoadListeners();
   return alloc;
}
MO.FXmlConsole_send = function FXmlConsole_send(u, d){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = false;
   var r = connection.send(u, d);
   connection._statusFree = true;
   return r;
}
MO.FXmlConsole_sendAsync = function FXmlConsole_sendAsync(u, d, p){
   var o = this;
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._parameters = p;
   connection.send(u, d);
   return connection;
}
MO.FXmlConsole_load = function FXmlConsole_load(u, d, p){
   var o = this;
   var v = o._caches.get(u);
   if(v){
      return v;
   }
   var connection = o.alloc();
   connection._asynchronous = true;
   connection._parameters = p;
   v = connection._cache = MO.Class.create(FXmlData);
   connection.send(u, d);
   o._caches.set(u, v);
   return v;
}
MO.FXmlConsole_process = function FXmlConsole_process(p){
   var o = this;
   if(p.constructor != MO.SXmlEvent){
      throw new MO.TError('Parameter type is invalid.');
   }
   var connection = o.alloc();
   connection._asynchronous = true;
   connection.send(p.url, p.inputDocument);
   connection.addLoadListener(p, p.process);
   return connection;
}
