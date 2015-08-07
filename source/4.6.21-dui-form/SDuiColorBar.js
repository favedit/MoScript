//==========================================================
// <T>颜色编辑框。</T>
//
//  hPanel<TABLE>
// ┌--------------------┬----------------------------------------------------------------┬-------------------┐
// │ hColorPanel<TD>    │ hSlidePanel<TD>                                                │ hInputPanel<TD>   │
// │┌----------------┐│┌---------------┬---------------┬---------------┐           │┌---------------┐│
// ││                │││hSlideRowUL<TD>│hSlideRowUM<TD>│hSlideRowUR<TD>│hSlideRowUp││               ││
// ││                ││├---------------┼---------------┼---------------┤           ││               ││
// ││hColorImage<IMG>│││hSlideRowML<TD>│hSlideRowMM<TD>│hSlideRowMR<TD>│hSlideRow  ││hInput<INPUT>  ││
// ││                ││├---------------┼---------------┼---------------┤           ││               ││
// ││                │││hSlideRowBL<TD>│hSlideRowBM<TD>│hSlideRowBR<TD>│hSlideDown ││               ││
// │└----------------┘│└---------------┴---------------┴---------------┘           │└---------------┘│
// └--------------------┴----------------------------------------------------------------┴-------------------┘
//
// @class
// @author maocy
// @version 150201
//==========================================================
MO.SDuiColorBar = function SDuiColorBar(){
   var o = this;
   //..........................................................
   // @attribute
   o._draging          = false;
   // @attribute
   o.control           = null;
   o.typeCd            = null;
   // @attribute
   o.minValue          = 0;
   o.maxValue          = 1;
   //..........................................................
   // @html
   o.hPanel            = null;
   // @html
   o.hColorPanel       = null;
   o.hColorImage       = null;
   // @html
   o.hSlidePanel       = null;
   o.hSlideForm        = null;
   o.hSlideRowUL       = null;
   o.hSlideRowUM       = null;
   o.hSlideRowUR       = null;
   o.hSlideRowML       = null;
   o.hSlideRowMM       = null;
   o.hSlideRowMR       = null;
   o.hSlideRowBL       = null;
   o.hSlideRowBM       = null;
   o.hSlideRowBR       = null;
   // @html
   o.hInputPanel       = null;
   o.hInput            = null;
   //..........................................................
   // @event
   o.onMouseDown       = MO.SDuiColorBar_onMouseDown;
   o.onMouseMove       = MO.SDuiColorBar_onMouseMove;
   o.onMouseUp         = MO.SDuiColorBar_onMouseUp;
   //..........................................................
   // @method
   o.build             = MO.SDuiColorBar_build;
   // @method
   o.setRange          = MO.SDuiColorBar_setRange;
   o.setColorValue     = MO.SDuiColorBar_setColorValue;
   o.setSlideValue     = MO.SDuiColorBar_setSlideValue;
   o.setInputValue     = MO.SDuiColorBar_setInputValue;
   // @method
   o.convertSlide      = MO.SDuiColorBar_convertSlide;
   o.convertGet        = MO.SDuiColorBar_convertGet;
   o.convertSet        = MO.SDuiColorBar_convertSet;
   o.get               = MO.SDuiColorBar_get;
   o.set               = MO.SDuiColorBar_set;
   // @method
   o.changeSlide       = MO.SDuiColorBar_changeSlide;
   o.changeInputEdit   = MO.SDuiColorBar_changeInputEdit;
   o.changeInputChange = MO.SDuiColorBar_changeInputChange;
   return o;
}

//==========================================================
// <T>鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.SDuiColorBar_onMouseDown = function SDuiColorBar_onMouseDown(p){
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
MO.SDuiColorBar_onMouseMove = function SDuiColorBar_onMouseMove(p){
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
MO.SDuiColorBar_onMouseUp = function SDuiColorBar_onMouseUp(p){
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
MO.SDuiColorBar_build = function SDuiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = MO.Window.Builder.appendTableRow(hcf);
   //..........................................................
   // 创建颜色块
   var hc = o.hColorPanel = MO.Window.Builder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = MO.Window.Builder.appendIcon(hc, null, 'n', 11, 11);
   //..........................................................
   // 创建滑动块
   var hc = o.hSlidePanel = MO.Window.Builder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   // 建立上区域
   var hl = o.hSlideRowUp = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = MO.Window.Builder.appendTableCell(hl);
   // 建立中区域
   var hl = o.hSlideRow = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   // 建立下区域
   var hl = o.hSlideRowDown = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = MO.Window.Builder.appendTableCell(hl);
   //..........................................................
   // 创建输入块
   var hc = o.hInputPanel = MO.Window.Builder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = MO.Window.Builder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}

//==========================================================
// <T>设置范围。</T>
//
// @method
// @param i:min:Number 最小值
// @param a:max:Number 最大值
//==========================================================
MO.SDuiColorBar_setRange = function SDuiColorBar_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = i;
   }
   if(a != null){
      o.maxValue = a;
   }
}

//==========================================================
// <T>设置颜色内容。</T>
//
// @method
// @param p:value:Number 内容 (0~255)
//==========================================================
MO.SDuiColorBar_setColorValue = function SDuiColorBar_setColorValue(p){
   var o = this;
   // 计算内容
   var v = MO.Lang.Hex.format(p, 2);
   var c = null;
   switch(o.typeCd){
      case 'red':
         c = v + '0000';
         break;
      case 'green':
         c = '00' + v + '00';
         break;
      case 'blue':
         c = '0000' + v;
         break;
      default:
         throw new MO.TError(o, 'Invalid type.');
   }
   // 设置颜色
   o.hColorImage.style.backgroundColor = '#' + c;
}

//==========================================================
// <T>设置滑动内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_setSlideValue = function SDuiColorBar_setSlideValue(p){
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
MO.SDuiColorBar_setInputValue = function SDuiColorBar_setInputValue(p){
   this.hInput.value = p;
}

//==========================================================
// <T>获得转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_convertGet = function SDuiColorBar_convertGet(p){
   return p;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Number 内容
//==========================================================
MO.SDuiColorBar_get = function SDuiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}

//==========================================================
// <T>设置转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_convertSet = function SDuiColorBar_convertSet(p){
   return p;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_set = function SDuiColorBar_set(p){
   var o = this;
   // 转换内容
   var v = o.convertSet(p);
   // 设置颜色
   o.setColorValue(v);
   // 设置宽度
   o.setSlideValue(v);
   // 设置颜色
   o.setInputValue(v);
}

//==========================================================
// <T>滑动转换。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_convertSlide = function SDuiColorBar_convertSlide(p){
   return p;
}

//==========================================================
// <T>滑动变更处理。</T>
//
// @method
// @param p:value:Number 内容
//==========================================================
MO.SDuiColorBar_changeSlide = function SDuiColorBar_changeSlide(p){
   var o = this;
   // 获得数值
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   // 设置内容
   o.set(v);
   // 刷新内容
   o.control.refreshValue();
}

//==========================================================
// <T>输入变更中处理。</T>
//
// @method
//==========================================================
MO.SDuiColorBar_changeInputEdit = function SDuiColorBar_changeInputEdit(){
   var o = this;
   // 获得数值
   var v = o.convertGet(o.hInput.value);
   // 设置颜色
   o.setColorValue(v);
   // 设置宽度
   o.setSlideValue(v);
   // 刷新内容
   o.control.refreshValue();
}

//==========================================================
// <T>输入变更完成处理。</T>
//
// @method
//==========================================================
MO.SDuiColorBar_changeInputChange = function SDuiColorBar_changeInputChange(){
   var o = this;
   // 获得数值
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   // 刷新内容
   o.control.refreshValue();
}
