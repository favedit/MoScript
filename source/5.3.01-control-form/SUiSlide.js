with(MO){
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
   MO.SUiSlide = function SUiSlide(){
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
      o.onMouseDown   = SUiSlide_onMouseDown;
      o.onMouseMove   = SUiSlide_onMouseMove;
      o.onMouseUp     = SUiSlide_onMouseUp;
      o.onSlideChange = RMethod.empty;
      //..........................................................
      // @method
      o.build          = SUiSlide_build;
      // @method
      o.setRange       = SUiSlide_setRange;
      o.setSlideValue  = SUiSlide_setSlideValue;
      // @method
      o.get            = SUiSlide_get;
      o.set            = SUiSlide_set;
      // @method
      o.changeSlide    = SUiSlide_changeSlide;
      return o;
   }

   //==========================================================
   // <T>鼠标落下处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.SUiSlide_onMouseDown = function SUiSlide_onMouseDown(p){
      var o = this;
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o._draging = true;
      RWindow.setOptionSelect(false);
      o.changeSlide(x);
   }

   //==========================================================
   // <T>鼠标移动处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.SUiSlide_onMouseMove = function SUiSlide_onMouseMove(p){
      var o = this;
      if(o._draging){
         var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
         o.changeSlide(x);
      }
   }

   //==========================================================
   // <T>鼠标抬起处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.SUiSlide_onMouseUp = function SUiSlide_onMouseUp(p){
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
   MO.SUiSlide_build = function SUiSlide_build(p){
      var o = this;
      var c = o.control;
      //..........................................................
      // 创建滑动块
      var hf = o.hSlideForm = RBuilder.appendTable(o.hPanel);
      hf.__pcapture = o;
      hf.width = '100%';
      hf.style.height = '9px';
      hf.style.cursor = 'pointer';
      // 建立上区域
      var hl = o.hSlideU = RBuilder.appendTableRow(hf);
      hl.style.height = '3px';
      o.hSlideUL = RBuilder.appendTableCell(hl);
      var hc = o.hSlideUM = RBuilder.appendTableCell(hl);
      hc.width = 2;
      hc.bgColor = '#EEEEEE';
      var hc = o.hSlideUR = RBuilder.appendTableCell(hl);
      // 建立中区域
      var hl = o.hSlideM = RBuilder.appendTableRow(hf);
      hl.style.height = '3px';
      var hc = o.hSlideML = RBuilder.appendTableCell(hl);
      hc.bgColor = '#999999';
      var hc = o.hSlideMM = RBuilder.appendTableCell(hl);
      hc.width = 2;
      hc.bgColor = '#EEEEEE';
      var hc = o.hSlideMR = RBuilder.appendTableCell(hl);
      hc.bgColor = '#999999';
      // 建立下区域
      var hl = o.hSlideB = RBuilder.appendTableRow(hf);
      hl.style.height = '3px';
      o.hSlideBL = RBuilder.appendTableCell(hl);
      var hc = o.hSlideBM = RBuilder.appendTableCell(hl);
      hc.width = 2;
      hc.bgColor = '#EEEEEE';
      o.hSlideBR = RBuilder.appendTableCell(hl);
   }

   //==========================================================
   // <T>设置范围。</T>
   //
   // @method
   // @param i:min:Number 最小值
   // @param a:max:Number 最大值
   //==========================================================
   MO.SUiSlide_setRange = function SUiSlide_setRange(i, a){
      var o = this;
      if(i != null){
         o.minValue = RFloat.parse(i);
      }
      if(a != null){
         o.maxValue = RFloat.parse(a);
      }
      o.range = o.maxValue - o.minValue;
   }

   //==========================================================
   // <T>设置滑动内容。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   MO.SUiSlide_setSlideValue = function SUiSlide_setSlideValue(p){
      var o = this;
      var w = o.hSlideForm.offsetWidth;
      if(w > 0){
         var v = (p - o.minValue) / o.range * w;
         o.hSlideML.width = RInteger.toRange(v, 1, w - 1);
      }
   }

   //==========================================================
   // <T>获得内容。</T>
   //
   // @method
   // @return Number 内容
   //==========================================================
   MO.SUiSlide_get = function SUiSlide_get(){
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
   MO.SUiSlide_set = function SUiSlide_set(p){
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
   MO.SUiSlide_changeSlide = function SUiSlide_changeSlide(p){
      var o = this;
      var c = o.control;
      // 设置滑动
      var w = o.hSlideForm.offsetWidth - 3;
      o.hSlideML.width = RInteger.toRange(p, 1, w - 1);
      // 获得数值
      var v = (p / w) * o.range + o.minValue;
      v = RFloat.toRange(v, o.minValue, o.maxValue);
      // 设置内容
      o.onSlideChange.call(c, v);
   }
}
