// ============================================================
// FMonitorConsole
// ============================================================
function FMonitorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope      = EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new TList();
   // Html
   o.hWindow    = null;
   // Event
   o.doInterval = FMonitorConsole_doInterval;
   // Method
   o.push       = FMonitorConsole_push;
   o.process    = FMonitorConsole_process;
   o.processAll = FMonitorConsole_processAll;
   o.startup    = FMonitorConsole_startup;
   o.wait       = FMonitorConsole_wait;
   o.release    = FMonitorConsole_release;
   return o;
}
// ------------------------------------------------------------
function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + RString.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
// ------------------------------------------------------------
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
// ------------------------------------------------------------
function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n=0; n<monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
// ------------------------------------------------------------
function FMonitorConsole_doInterval(){
   var con = RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
// ------------------------------------------------------------
function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
// ------------------------------------------------------------
function FMonitorConsole_wait(request){
   // while(request.status != EMonitor.Finish){}
}
// ------------------------------------------------------------
function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
// ------------------------------------------------------------
