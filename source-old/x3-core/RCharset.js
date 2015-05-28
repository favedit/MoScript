// ============================================================
// RCharsetFace
// ============================================================
var RCharset = new function(o){
   o = moNvl(o, this);
   // Attribute
   // Event
   // Member
   o.ansiMinCode = RCharset_ansiMinCode;
   o.ansiMaxCode = RCharset_ansiMaxCode;
   o.dump        = RCharset_dump;
   // Construct
   RMemory.register('RCharset', o);
   return this;
}
// ------------------------------------------------------------
function RCharset_ansiMinCode(){
   if(SystemManager.language == "ja"){return 65383;}
   return -1;
}
// ------------------------------------------------------------
function RCharset_ansiMaxCode(){
   if(SystemManager.language == "ja"){return 65439;}
   return -1;
}
// ------------------------------------------------------------
function RCharset_dump(){
   return this.className + ' ' + SystemManager.language + " [" + this.ansiMinCode() + " - " + this.ansiMaxCode() + "]";
}
// ------------------------------------------------------------
