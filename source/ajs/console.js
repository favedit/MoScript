MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   o.Sleep  = 0;
   o.Active = 1;
   o.Finish = 2;
   return o;
}
with(MO){
   MO.SProcessEvent = function SProcessEvent(){
      var o = this;
      o.index = null;
      o.code  = null;
      o.data  = null;
      return o;
   }
}
with(MO){
   MO.SXmlEvent = function SXmlEvent(){
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
}
with(MO){
   MO.FContent = function FContent(o){
      o = RClass.inherits(this, o, FObject);
      o._name = null;
      o.name  = FContent_name;
      return o;
   }
   MO.FContent_name = function FContent_name(){
      return this._name;
   }
}
with(MO){
   MO.FContentConsole = function FContentConsole(o){
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
   MO.FContentConsole_construct = function FContentConsole_construct(){
      var o = this;
      o.connections = new TObjects();
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
   MO.FContentConsole_process = function FContentConsole_process(e){
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
   MO.FContentConsole_send = function FContentConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FContentPipeline = function FContentPipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._scopeCd = EScope.Global;
      o.scopeCd  = FContentPipeline_scopeCd;
      return o;
   }
   MO.FContentPipeline_scopeCd = function FContentPipeline_scopeCd(){
      return this._scopeCd;
   }
}
with(MO){
   MO.FDragConsole = function FDragConsole(o){
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
   MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
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
      RWindow.setOptionSelect(true);
      o._activeDragable.onDragStop(p);
      o._activeDragable = null;
   }
   MO.FDragConsole_construct = function FDragConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._dragables = new TObjects();
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
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
}
with(MO){
   MO.FEnvironment = function FEnvironment(o){
      o = RClass.inherits(this, o, FObject);
      o._name  = RClass.register(o, new AGetSet('_name'));
      o._value = RClass.register(o, new AGetSet('_value'));
      o.set    = FEnvironment_set;
      return o;
   }
   MO.FEnvironment_set = function FEnvironment_set(name, value){
      var o = this;
      o._name = name;
      o._value = value;
   }
}
with(MO){
   MO.FEnvironmentConsole = function FEnvironmentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._environments = null;
      o.construct     = FEnvironmentConsole_construct;
      o.register      = FEnvironmentConsole_register;
      o.registerValue = FEnvironmentConsole_registerValue;
      o.find          = FEnvironmentConsole_find;
      o.findValue     = FEnvironmentConsole_findValue;
      return o;
   }
   MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._environments = new TDictionary();
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
}
with(MO){
   MO.FEvent = function FEvent(o){
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
   MO.FEvent_owner = function FEvent_owner(){
      return this._owner;
   }
   MO.FEvent_setOwner = function FEvent_setOwner(p){
      this._owner = p;
   }
   MO.FEvent_callback = function FEvent_callback(){
      return this._callback;
   }
   MO.FEvent_setCallback = function FEvent_setCallback(p){
      this._callback = p;
   }
   MO.FEvent_valid = function FEvent_valid(){
      return this._valid;
   }
   MO.FEvent_setValid = function FEvent_setValid(p){
      this._valid = p;
   }
   MO.FEvent_process = function FEvent_process(){
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
}
with(MO){
   MO.FEventConsole = function FEventConsole(o){
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
      o._processEvents = new TObjects();
      o._events = new TObjects();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.lsnsProcess.register(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }
   MO.FEventConsole_register = function FEventConsole_register(po, pc){
      var o = this;
      var e = RClass.create(FEvent);
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
}
with(MO){
   MO.FHttpConsole = function FHttpConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._pool     = null;
      o.onLoad    = FHttpConsole_onLoad;
      o.construct = FHttpConsole_construct;
      o.alloc     = FHttpConsole_alloc;
      o.free      = FHttpConsole_free;
      o.send      = FHttpConsole_send;
      o.sendAsync = FHttpConsole_sendAsync;
      o.fetch     = FHttpConsole_fetch;
      o.dispose   = FHttpConsole_dispose;
      return o;
   }
   MO.FHttpConsole_onLoad = function FHttpConsole_onLoad(connection){
      var o = this;
      o._pool.free(connection);
   }
   MO.FHttpConsole_construct = function FHttpConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pool = RClass.create(FObjectPool);
   }
   MO.FHttpConsole_alloc = function FHttpConsole_alloc(){
      var o = this;
      var pool = o._pool;
      if(!pool.hasFree()){
         var connection = RClass.create(FHttpConnection);
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
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }
   MO.FHttpConsole_dispose = function FHttpConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FIdleConsole = function FIdleConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope            = EScope.Page;
      o.register         = FIdleConsole_register;
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
}
with(MO){
   MO.FJsonConsole = function FJsonConsole(o){
      o = RClass.inherits(this, o, FHttpConsole);
      o._scopeCd  = EScope.Local;
      o.onLoad    = FJsonConsole_onLoad;
      o.send      = FJsonConsole_send;
      o.sendAsync = FJsonConsole_sendAsync;
      return o;
   }
   MO.FJsonConsole_onLoad = function FJsonConsole_onLoad(connection){
      var o = this;
      o.__base.FHttpConsole.onLoad.call(o, connection)
      var source = connection.outputData();
      var content = JSON.parse(source);
      var event = MO.Memory.alloc(SEvent);
      event.connection = connection;
      event.content = content;
      connection.processProcessListener(event);
      MO.Memory.free(event);
   }
   MO.FJsonConsole_send = function FJsonConsole_send(u, d){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = false;
      connection._contentCd = EHttpContent.Text;
      var result = connection.send(url, data);
      console.free(connection);
      return result;
   }
   MO.FJsonConsole_sendAsync = function FJsonConsole_sendAsync(url, data){
      var o = this;
      var connection = o.alloc();
      connection._asynchronous = true;
      connection._contentCd = EHttpContent.Text;
      connection.send(url, data);
      return connection;
   }
}
with(MO){
   MO.FLoggerConsole = function FLoggerConsole(o){
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
   MO.FLoggerConsole_onKeyDown = function FLoggerConsole_onKeyDown(e){
      if(e.shiftKey && e.ctrlKey && EKey.L == e.keyCode){
         this.connect();
      }
   }
   MO.FLoggerConsole_construct = function FLoggerConsole_construct(){
      var o = this;
      o.base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FLoggerConsole_connect = function FLoggerConsole_connect(){
   }
   MO.FLoggerConsole_disconnect = function FLoggerConsole_disconnect(){
      this.iLogger = null;
   }
   MO.FLoggerConsole_output = function FLoggerConsole_output(level, obj, method, ms, msg, stack){
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
   MO.FLoggerConsole_xml = function FLoggerConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FMonitorConsole = function FMonitorConsole(o){
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
   MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
      this.startup();
      monitor.id = this.monitors.sync(monitor);
      monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
      monitor.status = EMonitor.Active;
   }
   MO.FMonitorConsole_process = function FMonitorConsole_process(monitor){
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
   MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
      this.working = true;
      var monitors = this.monitors;
      for(var n=0; n<monitors.count; n++){
         this.process(monitors.get(n));
      }
      this.working = false;
   }
   MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
      var con = RGlobal.get(FMonitorConsole);
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
}
with(MO){
   MO.FMouseConsole = function FMouseConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._activeCapture = null;
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
   MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
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
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }
   MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
      var o = this;
      var c = o._activeCapture;
      if(c){
         RWindow.setOptionSelect(false);
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
      RWindow.setOptionSelect(true);
   }
   MO.FMouseConsole_register = function FMouseConsole_register(p){
   }
   MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
   }
   MO.FMouseConsole_clear = function FMouseConsole_clear(){
   }
}
with(MO){
   MO.FPipeline = function FPipeline(o){
      o = RClass.inherits(this, o, FObject);
      o._code = null;
      o.code  = FPipeline_code;
      return o;
   }
   MO.FPipeline_code = function FPipeline_code(){
      return this._code;
   }
}
with(MO){
   MO.FProcess = function FProcess(o){
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
   MO.FProcess_ohMessage = function FProcess_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcess_onMessage = function FProcess_onMessage(p){
   }
   MO.FProcess_name = function FProcess_name(){
      return this._name;
   }
   MO.FProcess_construct = function FProcess_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcess_start = function FProcess_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
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
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessConsole = function FProcessConsole(o){
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
   MO.FProcessConsole_construct = function FProcessConsole_construct(){
      var o = this;
      o.connections = new TObjects();
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
   MO.FProcessConsole_process = function FProcessConsole_process(e){
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
   MO.FProcessConsole_send = function FProcessConsole_send(u, d){
      var o = this;
      var c = o.alloc();
      var r = c.syncSend(u, d);
      c._statusFree = true;
      return r;
   }
}
with(MO){
   MO.FProcessEvent = function FProcessEvent(o){
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
   MO.FProcessEvent_name = function FProcessEvent_name(){
      return this._name;
   }
   MO.FProcessEvent_code = function FProcessEvent_code(){
      return this._code;
   }
   MO.FProcessEvent_setCode = function FProcessEvent_setCode(p){
      this._code = p;
   }
   MO.FProcessEvent_data = function FProcessEvent_data(){
      return this._data;
   }
   MO.FProcessEvent_setData = function FProcessEvent_setData(p){
      this._data = p;
   }
   MO.FProcessEvent_register = function FProcessEvent_register(po, pf){
      var o = this;
      if(!o._listeners){
         o._listeners = new TListeners();
      }
      o._listeners.register(po, pf);
   }
}
with(MO){
   MO.FProcessor = function FProcessor(o){
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
   MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
      var o = this.__linker;
      o.onMessage(this);
   }
   MO.FProcessor_onMessage = function FProcessor_onMessage(p){
   }
   MO.FProcessor_name = function FProcessor_name(){
      return this._name;
   }
   MO.FProcessor_construct = function FProcessor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._events = new TObjects();
   }
   MO.FProcessor_start = function FProcessor_start(p){
      var o = this;
      if(o._worker){
         throw new TError(o, 'Process is already start.');
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
      var e = new SProcessEvent();
      e.index = c;
      e.code = p.code();
      e.data = p.data();
      o._worker.postMessage(e);
   }
}
with(MO){
   MO.FProcessServer = function FProcessServer(o){
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
   MO.FProcessServer_ohInterval = function FProcessServer_ohInterval(){
      FProcessServer.__linker.onInterval();
   }
   MO.FProcessServer_onInterval = function FProcessServer_onInterval(){
      var o = this;
   }
   MO.FProcessServer_ohMessage = function FProcessServer_ohMessage(p){
      FProcessServer.__linker.onMessage(p.data);
   }
   MO.FProcessServer_onMessage = function FProcessServer_onMessage(p){
      var o = this;
      console.log('messgae', this, p);
   }
   MO.FProcessServer_construct = function FProcessServer_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._processors = new TDictionary();
   }
   MO.FProcessServer_name = function FProcessServer_name(){
      return this._name;
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
}
with(MO){
   MO.FStatistics = function FStatistics(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o.reset      = FStatistics_reset;
      o.resetFrame = FStatistics_resetFrame;
      return o;
   }
   MO.FStatistics_reset = function FStatistics_reset(){
   }
   MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
   }
}
with(MO){
   MO.FStatisticsConsole = function FStatisticsConsole(o){
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
   MO.FStatisticsConsole_construct = function FStatisticsConsole_construct(){
      var o = this;
      o._statisticses = new TDictionary();
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
   MO.FStatisticsConsole_statisticses = function FStatisticsConsole_statisticses(){
      return this._statisticses;
   }
   MO.FStatisticsConsole_reset = function FStatisticsConsole_reset(e){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).reset();
      }
   }
   MO.FStatisticsConsole_resetFrame = function FStatisticsConsole_resetFrame(u, d){
      var s = this._statisticses;
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).resetFrame();
      }
   }
}
with(MO){
   MO.FThread = function FThread(o){
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
   MO.FThread_construct = function FThread_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FThread_name = function FThread_name(){
      return this._name;
   }
   MO.FThread_statusCd = function FThread_statusCd(){
      return this._statusCd;
   }
   MO.FThread_interval = function FThread_interval(){
      return this._interval;
   }
   MO.FThread_setInterval = function FThread_setInterval(p){
      this._interval = p;
   }
   MO.FThread_start = function FThread_start(){
      this._statusCd = EThreadStatus.Active;
   }
   MO.FThread_stop = function FThread_stop(){
      this._statusCd = EThreadStatus.Finish;
   }
   MO.FThread_process = function FThread_process(p){
      var o = this;
      if(o._delay <= 0){
         o.processProcessListener(o);
         o._delay = o._interval;
      }else{
         o._delay -= p;
      }
   }
}
with(MO){
   MO.FThreadConsole = function FThreadConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._active      = true;
      o._interval    = 10;
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
   MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
      var threadConsole = RConsole.get(FThreadConsole);
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
      o._threads = new TObjects();
      o._hWindow = window;
      o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
   }
   MO.FThreadConsole_process = function FThreadConsole_process(thread){
      var o = this;
      if(thread){
         switch(thread.statusCd()){
            case EThreadStatus.Sleep:
               break;
            case EThreadStatus.Active:
               thread.process(o._interval);
               break;
            case EThreadStatus.Finish:
               thread.dispose();
               o._threads.remove(thread);
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
   }
}
with(MO){
   MO.FXmlConsole = function FXmlConsole(o){
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
   MO.FXmlConsole_construct = function FXmlConsole_construct(){
      var o = this;
      o._connections = new TObjects();
      o._caches = new TDictionary();
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
         alloc = RClass.create(FXmlConnection);
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
      v = connection._cache = RClass.create(FXmlData);
      connection.send(u, d);
      o._caches.set(u, v);
      return v;
   }
   MO.FXmlConsole_process = function FXmlConsole_process(p){
      var o = this;
      if(p.constructor != SXmlEvent){
         throw new TError('Parameter type is invalid.');
      }
      var connection = o.alloc();
      connection._asynchronous = true;
      connection.send(p.url, p.inputDocument);
      connection.addLoadListener(p, p.process);
      return connection;
   }
}
