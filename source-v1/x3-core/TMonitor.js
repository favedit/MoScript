// ============================================================
// TMonitor
// ============================================================
function TMonitor(){
   var o = this;
   // Private
   o._count   = 0;
   // Property
   o.status   = EMonitor.Active;
   o.interval = 100;
   // Method
   o.run      = null;
   o.process  = TMonitor_process;
   return o;
}
// ------------------------------------------------------------
function TMonitor_process(n){
   this._count -= n;
   if(this._count < 0){
      if(this.run){
         this.run();
      }
      this._count = this.interval;
   }
}
