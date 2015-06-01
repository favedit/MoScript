//-------------------------------------------------------------------------
function FDateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope       = EScope.Page;
   o.dateDiffer  = 0;
   o.serverDate  = null;
   // Method
   o.currentDate = FDateConsole_currentDate;
   o.setDate     = FDateConsole_setDate;
   return o;
}
//-------------------------------------------------------------------------
function FDateConsole_currentDate(){
   var o = this;
   var t = new TDate();
   t.addMseconds(o.dateDiffer);
   return t;
}
//-------------------------------------------------------------------------
function FDateConsole_setDate(d){
   var o = this;
   o.serverDate = d;
}
