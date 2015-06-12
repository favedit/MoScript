//==========================================================
// <T>直线样式。</T>
//
// @struct
// @param width:Number 宽度
// @param style:String 样式
// @param color:String 颜色
// @author maocy
// @version 150611
//==========================================================
MO.SBorderLine = function SBorderLine(width, style, color){
   var o = this;
   //..........................................................
   // @attribute
   o.width    = MO.Runtime.nvl(width, 1);
   o.style    = MO.Runtime.nvl(style, 'solid');
   o.color    = MO.Runtime.nvl(color, '#FFFFFF');
   // @method
   o.parse    = MO.SBorderLine_parse;
   o.toString = MO.SBorderLine_toString;
   // @method
   o.dispose  = MO.SBorderLine_dispose;
   return o;
}

//============================================================
// <T>解析字符串。</T>
//
// @param source:String 字符串
//============================================================
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

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
MO.SBorderLine_toString = function SBorderLine_toString(){
   var o = this;
   return o.width + ' ' + o.style + ' ' + o.color;
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.SBorderLine_dispose = function SBorderLine_dispose(){
   var o = this;
   o.width = null;
   o.style = null;
   o.color = null;
}
