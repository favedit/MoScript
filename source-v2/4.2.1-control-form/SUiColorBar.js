//==========================================================
// <T>颜色3编辑框。</T>
//
// @class
// @author maocy
// @version 150201
//==========================================================
function SUiColorBar(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o._draging      = false;
   // @attribute
   o.control       = null;
   o.type          = null;
   //..........................................................
   // @html
   o.hPanel        = null;
   // @html
   o.hColor        = null;
   o.hColorImage   = null;
   // @html
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   // @html
   o.hInput        = null;
   //..........................................................
   // @event
   o.onMouseDown   = SUiColorBar_onMouseDown;
   o.onMouseMove   = SUiColorBar_onMouseMove;
   o.onMouseUp     = SUiColorBar_onMouseUp;
   //..........................................................
   // @method
   o.build         = SUiColorBar_build;
   // @method
   o.setSlideValue = SUiColorBar_setSlideValue;
   o.setColorValue = SUiColorBar_setColorValue;
   o.set           = SUiColorBar_set;
   return o;
}

//==========================================================
// <T>鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function SUiColorBar_onMouseDown(p){
   var o = this;
   var x = RHtml_clientX(p.hSender, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.setSlideValue(x);
}

//==========================================================
// <T>鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function SUiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml_clientX(p.hSender, o.hSlideForm) + p.offsetX;
      o.setSlideValue(x);
   }
}

//==========================================================
// <T>鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function SUiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}

//==========================================================
// <T>构件处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function SUiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = o.h = RBuilder.appendTableRow(hcf);
   //..........................................................
   // 创建颜色块
   var hc = o.hColor = RBuilder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = RBuilder.appendIcon(hc, null, 'n', 13, 13);
   //..........................................................
   // 创建滑动块
   var hc = o.hSlidePanel = RBuilder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = RBuilder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   // 建立上区域
   var hl = o.hSlideRowUp = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = RBuilder.appendTableCell(hl);
   // 建立中区域
   var hl = o.hSlideRow = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   // 建立下区域
   var hl = o.hSlideRowDown = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = RBuilder.appendTableCell(hl);
   // 关联事件
   c.attachEvent('onSlideMouseDown', hf, c.onSlideMouseDown);
   c.attachEvent('onSlideMouseMove', hf, c.onSlideMouseMove);
   c.attachEvent('onSlideMouseUp', hf, c.onSlideMouseUp);
   //..........................................................
   // 创建输入块
   var hc = RBuilder.appendTableCell(hr);
   hc.width = '36';
   var he = o.hInput = RBuilder.appendEdit(hc, o.control.styleName('Input'));
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputChanged', he, c.onInputChanged);
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorBar_setSlideValue(p){
   var o = this;
   var l = o.hSlideForm.offsetWidth;
   o.hSlideRowML.width = p;
   var r = p / l;
   o.hInput.value = RFloat.format(r, 0, null, 3, null);
   o.setColorValue(r);
   o.control.refreshValue();
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
function SUiColorBar_setColorValue(p){
   var o = this;
   var pv = parseInt(p * 255);
   var v = RHex.format(pv, 2);
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
function SUiColorBar_set(p){
   var o = this;
   var pv = parseInt(p * 255);
   // 设置滑动
   var r = pv / 255;
   var l = o.hSlideForm.offsetWidth;
   var d = parseInt(l * r);
   o.hSlideRowML.width = Math.max(d, 1);
   // 设置颜色
   o.setColorValue(p);
   // 设置数字
   var h = o.hInput;
   if(h){
      h.value = RFloat.format(p, 0, null, 3, null);;
   }
}
