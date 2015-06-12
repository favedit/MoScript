//==========================================================
// <T>边框。</T>
//
// @struct
// @author maocy
// @version 150611
//==========================================================
MO.SBorder = function SBorder(){
   var o = this;
   //..........................................................
   // @attribute
   o.valid    = false;
   o.left     = new MO.SBorderLine();
   o.top      = new MO.SBorderLine();
   o.right    = new MO.SBorderLine();
   o.bottom   = new MO.SBorderLine();
   //..........................................................
   // @method
   o.parse    = MO.SBorder_parse;
   o.toString = MO.SBorder_toString;
   // @method
   o.dispose  = MO.SBorder_dispose;
   return o;
}

//============================================================
// <T>解析字符串。</T>
//
// @param source:String 字符串
//============================================================
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

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SBorder_toString = function SBorder_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SBorder_dispose = function SBorder_dispose(){
   var o = this;
   o.left = MO.RObject.dispose(o.left)
   o.top = MO.RObject.dispose(o.top)
   o.right = MO.RObject.dispose(o.right)
   o.bottom = MO.RObject.dispose(o.bottom)
}
