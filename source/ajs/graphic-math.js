MO.SBorder = function SBorder(){
   var o = this;
   o.valid    = false;
   o.left     = new MO.SBorderLine();
   o.top      = new MO.SBorderLine();
   o.right    = new MO.SBorderLine();
   o.bottom   = new MO.SBorderLine();
   o.parse    = MO.SBorder_parse;
   o.toString = MO.SBorder_toString;
   o.dispose  = MO.SBorder_dispose;
   return o;
}
MO.SBorder_parse = function SBorder_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 4){
      o.left.parse(items[0]);
      o.top.parse(items[1]);
      o.right.parse(items[2]);
      o.bottom.parse(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorder_toString = function SBorder_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SBorder_dispose = function SBorder_dispose(){
   var o = this;
   o.left = MO.RObject.dispose(o.left)
   o.top = MO.RObject.dispose(o.top)
   o.right = MO.RObject.dispose(o.right)
   o.bottom = MO.RObject.dispose(o.bottom)
}
MO.SBorderLine = function SBorderLine(width, style, color){
   var o = this;
   o.width    = MO.Runtime.nvl(width, 1);
   o.style    = MO.Runtime.nvl(style, 'solid');
   o.color    = MO.Runtime.nvl(color, '#FFFFFF');
   o.parse    = MO.SBorderLine_parse;
   o.toString = MO.SBorderLine_toString;
   o.dispose  = MO.SBorderLine_dispose;
   return o;
}
MO.SBorderLine_parse = function SBorderLine_parse(source){
   var o = this;
   var items = source.split(' ')
   if(items.length == 3){
      o.width = parseInt(items[0]);
      o.style = items[1];
      o.color = items[2];
   }else{
      throw new TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorderLine_toString = function SBorderLine_toString(){
   var o = this;
   return o.width + ' ' + o.style + ' ' + o.color;
}
MO.SBorderLine_dispose = function SBorderLine_dispose(){
   var o = this;
   o.width = null;
   o.style = null;
   o.color = null;
}
