//==========================================================
// <T>颜色强度编辑框。</T>
//
// @class
// @author maocy
// @version 150213
//==========================================================
MO.SDuiColorPower = function SDuiColorPower(){
   var o = this;
   MO.SDuiColorBar.call(o);
   //..........................................................
   // @attribute
   o.minValue      = 0;
   o.maxValue      = 4;
   //..........................................................
   // @method
   o.setColorValue = MO.SDuiColorPower_setColorValue;
   o.setSlideValue = MO.SDuiColorPower_setSlideValue;
   o.setInputValue = MO.SDuiColorPower_setInputValue;
   // @method
   o.convertGet    = MO.SDuiColorPower_convertGet;
   o.convertSet    = MO.SDuiColorPower_convertSet;
   o.convertSlide  = MO.SDuiColorPower_convertSlide;
   return o;
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorPower_setColorValue = function SDuiColorPower_setColorValue(p){
   var o = this;
   var v = MO.Lang.Integer.toRange(parseInt(p * 255), 0, 255);
   var s = MO.Lang.Hex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorPower_setSlideValue = function SDuiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}

//==========================================================
// <T>设置输入内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorPower_setInputValue = function SDuiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = MO.Lang.Float.toRange(p, o.minValue, o.maxValue);
   var t = MO.Lang.Float.format(v, 0, null, 2, null);
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
MO.SDuiColorPower_convertGet = function SDuiColorPower_convertGet(p){
   return MO.Lang.Float.parse(p);
}

//==========================================================
// <T>设置转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorPower_convertSet = function SDuiColorPower_convertSet(p){
   return p;
}

//==========================================================
// <T>滑动转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorPower_convertSlide = function SDuiColorPower_convertSlide(p){
   return p * this.maxValue;
}
