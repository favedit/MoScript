// ============================================================
// TUploadArg
// ============================================================
function TUploadArg(){
   var o = this;
   // Attribute
   o.type          = null;
   o.url           = null;
   o.fileName      = null;
   // Listener
   o.lsnsStart     = new TListeners();
   o.lsnsUploading = new TListeners();
   o.lsnsFinish    = new TListeners();
   return o;
}
// ------------------------------------------------------------
