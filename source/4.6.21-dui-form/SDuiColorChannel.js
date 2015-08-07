//==========================================================
// <T>颜色通道编辑框。</T>
//
// @class
// @author maocy
// @version 150213
//==========================================================
MO.SDuiColorChannel = function SDuiColorChannel(){
   var o = this;
   MO.SDuiColorBar.call(o);
   //..........................................................
   // @attribute
   o.minValue      = 0;
   o.maxValue      = 255;
   //..........................................................
   // @method
   o.setInputValue = MO.SDuiColorChannel_setInputValue;
   // @method
   o.convertGet    = MO.SDuiColorChannel_convertGet;
   o.convertSet    = MO.SDuiColorChannel_convertSet;
   return o;
}

//==========================================================
// <T>设置输入内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorChannel_setInputValue = function SDuiColorChannel_setInputValue(p){
   var o = this;
   var v = MO.Integer.toRange(p, o.minValue, o.maxValue);
   var t = MO.Integer.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}

//==========================================================
// <T>获得转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorChannel_convertGet = function SDuiColorChannel_convertGet(p){
   var o = this;
   var v = MO.Lang.Integer.parse(MO.Lang.String.nvl(p, '0'));
   return MO.Lang.Integer.toRange(v, o.minValue, o.maxValue) / 255;
}

//==========================================================
// <T>设置转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorChannel_convertSet = function SDuiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
