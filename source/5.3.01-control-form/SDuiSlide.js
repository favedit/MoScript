//==========================================================
// <T>滑动框。</T>
//
//  hPanel<HtmlTag>
// ┌-----------------------------------------------------------------┐
// │ hSlidePanel<TD>                                                 │
// │┌---------------┬--------------------┬---------------┐       │
// ││hSlideUL<TD>   │hSlideUM<TD>        │hSlideUR<TD>   │hSlideU│
// │├---------------┼--------------------┼---------------┤       │
// ││hSlideML<TD>   │hSlideMM<TD>        │hSlideMR<TD>   │hSlideM│
// │├---------------┼--------------------┼---------------┤       │
// ││hSlideBL<TD>   │hSlideBM<TD>        │hSlideBR<TD>   │hSlideB│
// │└---------------┴--------------------┴---------------┘       │
// └-----------------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.SDuiSlide = function SDuiSlide(){
   var o = this;
   //..........................................................
   // @attribute
   o._draging      = false;
   // @attribute
   o.control       = null;
   // @attribute
   o.stepValue     = 1;
   o.minValue      = 0;
   o.maxValue      = 100;
   o.range         = 100;
   //..........................................................
   // @html
   o.hPanel        = null;
   // @html
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   o.hSlideU       = null;
   o.hSlideUL      = null;
   o.hSlideUM      = null;
   o.hSlideUR      = null;
   o.hSlideM       = null;
   o.hSlideML      = null;
   o.hSlideMM      = null;
   o.hSlideMR      = null;
   o.hSlideB       = null;
   o.hSlideBL      = null;
   o.hSlideBM      = null;
   o.hSlideBR      = null;
   //..........................................................
   // @event
   o.onMouseDown   = MO.SDuiSlide_onMouseDown;
   o.onMouseMove   = MO.SDuiSlide_onMouseMove;
   o.onMouseUp     = MO.SDuiSlide_onMouseUp;
   o.onSlideChange = MO.Method.empty;
   //..........................................................
   // @method
   o.build         = MO.SDuiSlide_build;
   // @method
   o.setRange      = MO.SDuiSlide_setRange;
   o.setSlideValue = MO.SDuiSlide_setSlideValue;
   // @method
   o.get           = MO.SDuiSlide_get;
   o.set           = MO.SDuiSlide_set;
   // @method
   o.changeSlide   = MO.SDuiSlide_changeSlide;
   return o;
}

//==========================================================
// <T>鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.SDuiSlide_onMouseDown = function SDuiSlide_onMouseDown(p){
   var o = this;
   var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   MO.Window.setOptionSelect(false);
   o.changeSlide(x);
}

//==========================================================
// <T>鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.SDuiSlide_onMouseMove = function SDuiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}

//==========================================================
// <T>鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.SDuiSlide_onMouseUp = function SDuiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   MO.Window.setOptionSelect(true);
}

//==========================================================
// <T>构件处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
MO.SDuiSlide_build = function SDuiSlide_build(p){
   var o = this;
   var c = o.control;
   //..........................................................
   // 创建滑动块
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   // 建立上区域
   var hl = o.hSlideU = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = MO.Window.Builder.appendTableCell(hl);
   // 建立中区域
   var hl = o.hSlideM = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   // 建立下区域
   var hl = o.hSlideB = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = MO.Window.Builder.appendTableCell(hl);
}

//==========================================================
// <T>设置范围。</T>
//
// @method
// @param i:min:Number 最小值
// @param a:max:Number 最大值
//==========================================================
MO.SDuiSlide_setRange = function SDuiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = MO.Lang.Float.parse(i);
   }
   if(a != null){
      o.maxValue = MO.Lang.Float.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiSlide_setSlideValue = function SDuiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Number 内容
//==========================================================
MO.SDuiSlide_get = function SDuiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiSlide_set = function SDuiSlide_set(p){
   var o = this;
   // 设置宽度
   o.setSlideValue(p);
}

//==========================================================
// <T>滑动变更处理。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiSlide_changeSlide = function SDuiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   // 设置滑动
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = MO.Lang.Integer.toRange(p, 1, w - 1);
   // 获得数值
   var v = (p / w) * o.range + o.minValue;
   v = MO.Lang.Float.toRange(v, o.minValue, o.maxValue);
   // 设置内容
   o.onSlideChange.call(c, v);
}
