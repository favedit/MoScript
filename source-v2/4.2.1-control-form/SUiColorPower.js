//==========================================================
// <T>颜色编辑框。</T>
//
// @class
// @author maocy
// @version 150201
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
   o.setSlideValue = SUiColorPower_setSlideValue;
   o.setColorValue = SUiColorPower_setColorValue;
   o.get           = SUiColorPower_get;
   o.set           = SUiColorPower_set;
   // @method
   o.changeInput   = SUiColorPower_changeInput;
   return o;
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_setSlideValue(p){
   var o = this;
   // 设置宽度
   var w = o.hSlideForm.offsetWidth;
   o.hSlideRowML.width = RInteger.toRange(p, 1, w);
   // 设置颜色
   var r = p / w * o.maxValue;
   o.hInput.value = RFloat.format(r, 0, null, 2, null);
   o.setColorValue(r);
   // 刷新内容
   o.control.refreshValue();
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_setColorValue(p){
   var o = this;
   var pv = Math.min(parseInt(p * 255), 255);
   var v = RHex.format(pv, 2);
   // 设置颜色
   o.hColorImage.style.backgroundColor = '#' + v + v + v;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_get(){
   var o = this;
   return RFloat.parse(o.hInput.value);
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_set(p){
   var o = this;
   var pv = parseInt(p * 255);
   // 设置滑动
   var r = pv / 255;
   var l = o.hSlideForm.offsetWidth;
   var d = parseInt(l * r / o.maxValue);
   o.hSlideRowML.width = Math.max(d, 1);
   // 设置颜色
   o.setColorValue(p);
   // 设置数字
   o.hInput.value = RFloat.format(p, 0, null, 2, null);
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorPower_changeInput(){
   var o = this;
   var v = Math.min(RFloat.parse(o.hInput.value), o.maxValue);
   var w = o.hSlideForm.offsetWidth;
   o.setSlideValue(v * w);
   //o.setColorValue(v);
}
