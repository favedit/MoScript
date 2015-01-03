// ============================================================
// TControlInfo
// ============================================================
function TControlInfo(){
   var o = this;
   // @attribute
   o.visible         = null;
   o.enable          = null;
   o.icon            = null;
   o.iconHint        = null;
   o.color           = null;
   o.backgroundColor = null;
   o.ouid            = null;
   o.code            = null;
   o.value           = null;
   o.hint            = null;
   // @method
   o.unpack          = TControlInfo_unpack;
   return o;
}
// ------------------------------------------------------------
function TControlInfo_unpack(v){
   var o = this;
   var as = new TAttributes();
   as.unpack(v.substring(2));
   o.visible = as.nvl('V');
   o.enable = as.nvl('E');
   o.icon = as.nvl('I');
   o.iconHint = as.nvl('T');
   o.color = as.nvl('C');
   o.backgroundColor = as.nvl('B');
   o.ouid = as.nvl('U');
   o.code = as.nvl('S');
   o.value = as.nvl('D');
   o.hint = as.nvl('H');
}
