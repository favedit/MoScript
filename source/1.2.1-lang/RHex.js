//============================================================
// RHexFace
//============================================================
var RHex = new function(o){
   if(!o){o=this};
   // Define
   o.NUMBER  = '0x123456789ABCDEF';
   o.PAD     = '0';
   // Method
   o.isValid = RHex_isValid;
   o.parse   = RHex_parse;
   o.format  = RHex_format;
   // Construct
   RMemory.register('RHex', o);
   return o;
}

//===========================================================
//
//===========================================================
function RHex_isValid(v){
   return RString.isPattern(v, this.NUMBER);
}

//===========================================================
//
//===========================================================
function RHex_parse(v){
   return v ? parseInt('0x'+v) : '0';
}

//===========================================================
// Value, Length
//
//===========================================================
function RHex_format(v, l){
   v = RString.nvl(v, '0').toString(16);
   return l ? RString.lpad(v, l, this.PAD) : v;
}

