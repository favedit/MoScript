//==========================================================
// <T>颜色编辑框。</T>
//
// @class
// @author maocy
// @version 150201
//==========================================================
function SUiColorChannel(){
   var o = this;
   SUiColorBar.call(o);
   //..........................................................
   // @attribute
   o.minValue      = 0;
   o.maxValue      = 255;
   //..........................................................
   // @method
   o.setSlideValue = SUiColorChannel_setSlideValue;
   o.setColorValue = SUiColorChannel_setColorValue;
   o.set           = SUiColorChannel_set;
   o.changeInput   = SUiColorChannel_changeInput;
   return o;
}
//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorChannel_setSlideValue(p){
   var o = this;
   var l = o.hSlideForm.offsetWidth;
   var r = parseInt(p / o.maxValue * l);
   o.hSlideRowML.width = Math.min(Math.max(r, 1), l);
   //var r = parseInt((p / l) * 255);
   //o.hInput.value = r;
   //o.setColorValue(r);
   //o.control.refreshValue();
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorChannel_setColorValue(p){
   var o = this;
   var v = RHex.format(p, 2);
   // 设置颜色
   var c = '';
   if(o.type == 'red'){
      c = v + '0000';
   }else if(o.type == 'green'){
      c = '00' + v + '00';
   }else if(o.type == 'blue'){
      c = '0000' + v;
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorChannel_set(p){
   var o = this;
   var r = parseInt(p * 255);
   // 设置滑动
   var l = o.hSlideForm.offsetWidth;
   var d = parseInt(l * r / 255);
   o.hSlideRowML.width = Math.max(d, 1);
   // 设置颜色
   o.setColorValue(r);
   // 设置数字
   o.hInput.value = r;
}


//==========================================================
function SUiColorChannel_changeInput(){
   var o = this;
   var v = Math.min(RInteger.parse(o.hInput.value), o.maxValue);
   o.hInput.value = v;
   o.setColorValue(v);
   o.setSlideValue(v);
}
