//==========================================================
// <T>颜色强度编辑框。</T>
//
// @class
// @author maocy
// @version 150213
//==========================================================
function SUiColorPower(){
   var o = this;
   SUiColorBar.call(o);
   //..........................................................
   // @attribute
   o.minValue      = 0;
   o.maxValue      = 4;
   //..........................................................
   // @method
   o.setColorValue = SUiColorPower_setColorValue;
   o.setSlideValue = SUiColorPower_setSlideValue;
   o.setInputValue = SUiColorPower_setInputValue;
   // @method
   o.convertGet    = SUiColorPower_convertGet;
   o.convertSet    = SUiColorPower_convertSet;
   o.convertSlide  = SUiColorPower_convertSlide;
   return o;
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_setColorValue(p){
   var o = this;
   var v = RInteger.toRange(parseInt(p * 255), 0, 255);
   var s = RHex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}

//==========================================================
// <T>设置输入内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = RFloat.toRange(p, o.minValue, o.maxValue);
   var t = RFloat.format(v, 0, null, 2, null);
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
function SUiColorPower_convertGet(p){
   return RFloat.parse(p);
}

//==========================================================
// <T>设置转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_convertSet(p){
   return p;
}

//==========================================================
// <T>滑动转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_convertSlide(p){
   return p * this.maxValue;
}
