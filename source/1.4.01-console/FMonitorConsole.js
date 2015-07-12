//==========================================================
// <T>监视控制台。</T>
//
// @console
// @author maocy
// @version 150125
//==========================================================
MO.FMonitorConsole = function FMonitorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o.scope      = MO.EScope.Global;
   o.working    = false;
   o.interval   = 10;
   o.intervalId = null;
   o.monitors   = new MO.TList();
   //..........................................................
   // @html
   o.hWindow    = null;
   //..........................................................
   // @event
   o.doInterval = MO.FMonitorConsole_doInterval;
   //..........................................................
   // @method
   o.push       = MO.FMonitorConsole_push;
   o.process    = MO.FMonitorConsole_process;
   o.processAll = MO.FMonitorConsole_processAll;
   o.startup    = MO.FMonitorConsole_startup;
   o.wait       = MO.FMonitorConsole_wait;
   o.release    = MO.FMonitorConsole_release;
   return o;
}
// ------------------------------------------------------------
MO.FMonitorConsole_push = function FMonitorConsole_push(monitor){
   this.startup();
   monitor.id = this.monitors.sync(monitor);
   monitor.name = 'T:' + MO.Lang.String.lpad(monitor.id, 4, '0');
   monitor.status = EMonitor.Active;
}
// ------------------------------------------------------------
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
// ------------------------------------------------------------
MO.FMonitorConsole_processAll = function FMonitorConsole_processAll(){
   this.working = true;
   var monitors = this.monitors;
   for(var n = 0; n < monitors.count; n++){
      this.process(monitors.get(n));
   }
   this.working = false;
}
// ------------------------------------------------------------
MO.FMonitorConsole_doInterval = function FMonitorConsole_doInterval(){
   var con = MO.RGlobal.get(FMonitorConsole);
   if(con && !con.working){
      con.processAll();
   }
}
// ------------------------------------------------------------
MO.FMonitorConsole_startup = function FMonitorConsole_startup(){
   if(!this.hWindow){
      this.hWindow = window;
      debugger;
      this.intervalId = this.hWindow.setInterval(this.doInterval, this.interval);
   }
}
// ------------------------------------------------------------
MO.FMonitorConsole_wait = function FMonitorConsole_wait(request){
   // while(request.status != EMonitor.Finish){}
}
// ------------------------------------------------------------
MO.FMonitorConsole_release = function FMonitorConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
