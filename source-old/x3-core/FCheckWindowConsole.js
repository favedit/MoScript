// ============================================================
// FCheckWindowConsole
// ============================================================
function FCheckWindowConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope         = EScope.Global;
   o.find          = FCheckWindowConsole_find;
   o.window        = null;
   // Method
   return o;
}
// ------------------------------------------------------------
function FCheckWindowConsole_find(){
   var o = this;
   var w = o.window;
   if(!w){
      w = o.window = RControl.create( FCheckWindow );
   }
   return w;
}