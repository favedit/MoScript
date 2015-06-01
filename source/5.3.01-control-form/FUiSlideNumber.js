with(MO){
   //==========================================================
   // <T>数字编辑框。</T>
   //
   //  hValuePanel<TD>
   //  hValueForm<TABLE>
   // ┌-----------------┬---------------------------------┬--------------------┐
   // │hChangePanel<TD> │ hInputPanel<TD>                 │ hAdjustPanel<TD>   │hValueLine<TR>
   // │                 │                                 │ hAdjustForm<TABLE> │
   // │hChangeIcon<IMG> │┌-----------------------------┐│┌----------------┐│
   // │                 ││                             │││hUpPanel<TD>    ││
   // │                 ││                             │││hUpIcon<IMG>    ││
   // │                 ││hInput<INPUT>                ││├----------------┤│
   // │                 ││                             │││hDownPanel<TD>  ││
   // │                 ││                             │││hDownIcon<IMG>  ││
   // │                 │└-----------------------------┘│└----------------┘│
   // └-----------------┴---------------------------------┴--------------------┘
   //
   // @class
   // @author maocy
   // @version 150131
   //==========================================================
   MO.FUiSlideNumber = function FUiSlideNumber(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyNumber, MListenerDataChanged, MMouseCapture);
      //..........................................................
      // @property
      o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
      //..........................................................
      // @style
      o._styleSlidePanel    = RClass.register(o, new AStyle('_styleSlidePanel'));
      o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
      o._styleAdjustForm    = RClass.register(o, new AStyle('_styleAdjustForm'));
      o._styleUpPanel       = RClass.register(o, new AStyle('_styleUpPanel'));
      o._styleDownPanel     = RClass.register(o, new AStyle('_styleDownPanel'));
      //..........................................................
      // @attribute
      o._innerOriginValue   = null;
      o._innerDataValue     = null;
      // @attribute
      o._slide              = null;
      //..........................................................
      // @html
      o._hInput             = null;
      o._iconUp             = null;
      o._iconDown           = null;
      //..........................................................
      // @event
      o.onBuildEditValue    = FUiSlideNumber_onBuildEditValue;
      // @event
      o.onMouseCaptureStart = FUiSlideNumber_onMouseCaptureStart;
      o.onMouseCapture      = FUiSlideNumber_onMouseCapture;
      o.onMouseCaptureStop  = FUiSlideNumber_onMouseCaptureStop;
      o.onSlideChange       = FUiSlideNumber_onSlideChange;
      o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiSlideNumber_onInputKeyPress);
      o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiSlideNumber_onInputEdit);
      o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiSlideNumber_onInputChange);
      //..........................................................
      // @method
      o.construct           = FUiSlideNumber_construct;
      // @method
      o.get                 = FUiSlideNumber_get;
      o.set                 = FUiSlideNumber_set;
      o.setInputValue       = FUiSlideNumber_setInputValue;
      o.refreshValue        = FUiSlideNumber_refreshValue;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiSlideNumber_onBuildEditValue = function FUiSlideNumber_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.__linker = o;
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      //..........................................................
      // 建立改变栏
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      //..........................................................
      // 建立滑动栏
      var hsp = o._hSlidePanel = RBuilder.appendTableCell(hl, o.styleName('SlidePanel'));
      var b = o._slide = new SUiSlide();
      b.control = o;
      b.hPanel = hsp;
      b.setRange(o._valueMin, o._valueMax);
      b.onSlideChange = o.onSlideChange;
      b.build();
      //..........................................................
      // 建立输入栏
      var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
      var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
      o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
      o.attachEvent('onInputEdit', he, o.onInputEdit);
      o.attachEvent('onInputChange', he, o.onInputChange);
      // 设置大小
      RHtml.setSize(hep, o._inputSize);
      // 设置可以输入的最大长度
      if(o._editLength){
         he.maxLength = o._editLength;
      }
      //..........................................................
      // 建立调整栏
      var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
      hap.style.borderLeft = '1px solid #666666';
      hap.width = 12;
      var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
      // 建立上按键
      var hc = RBuilder.appendTableRowCell(haf);
      hc.className = o.styleName('UpPanel');
      var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
      hi.align = 'center';
      //o.attachEvent('onUpMouseDown', hi);
      // 建立下按键
      var hc = RBuilder.appendTableRowCell(haf);
      hc.className = o.styleName('DownPanel');
      var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
      //o.attachEvent('onDownMouseDown', hi);
   }

   //==========================================================
   // <T>滑动栏鼠标落下处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onMouseCaptureStart = function FUiSlideNumber_onMouseCaptureStart(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseDown(p);
      }
   }

   //==========================================================
   // <T>滑动栏鼠标移动处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onMouseCapture = function FUiSlideNumber_onMouseCapture(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseMove(p);
      }
   }

   //==========================================================
   // <T>滑动栏鼠标抬起处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onMouseCaptureStop = function FUiSlideNumber_onMouseCaptureStop(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseUp(p);
      }
   }

   //==========================================================
   // <T>滑动栏数据变动处理。 </T>
   //
   // @param p:value:Number 内容
   //==========================================================
   MO.FUiSlideNumber_onSlideChange = function FUiSlideNumber_onSlideChange(p){
      var o = this;
      // 设置输入内容
      o.setInputValue(p);
      // 刷新数据
      o.refreshValue();
   }

   //==========================================================
   // <T>编辑控件中键盘按下处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onInputKeyPress = function FUiSlideNumber_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      // 检查输入字符是否为浮点数，否则给清除输入内容
      if(!RKeyboard.isFloatKey(c)){
         p.cancel();
      }
   }

   //==========================================================
   // <T>编辑控件中数据修改处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onInputEdit = function FUiSlideNumber_onInputEdit(p){
      var o = this;
      // 设置滑动栏
      var v = o._hInput.value;
      o._slide.set(v);
      // 刷新数据
      o.refreshValue();
   }

   //==========================================================
   // <T>编辑控件完成处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiSlideNumber_onInputChange = function FUiSlideNumber_onInputChange(p){
      var o = this;
      // 设置数据内容
      var v = o._hInput.value;
      o._slide.set(v);
      o.setInputValue(v);
      // 刷新数据
      o.refreshValue();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiSlideNumber_construct = function FUiSlideNumber_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   MO.FUiSlideNumber_get = function FUiSlideNumber_get(p){
      var o = this;
      // 获得显示
      var v = o._hInput.value;
      var r = RFloat.parse(v);
      return RFloat.toRange(r, o._valueMin, o._valueMax);
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.FUiSlideNumber_set = function FUiSlideNumber_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      // 获得内容
      var v = RString.nvl(p, '0');
      o._innerOriginValue = v;
      o._innerDataValue = v;
      // 设置显示
      o._slide.set(v);
      o.setInputValue(v);
      // 设置修改状态
      o.changeSet(false);
   }

   //==========================================================
   // <T>设置输入数据。</T>
   //
   // @method
   // @param p:value:String 数据
   //==========================================================
   MO.FUiSlideNumber_setInputValue = function FUiSlideNumber_setInputValue(p){
      var o = this;
      // 设置显示
      var v = RFloat.parse(p);
      if(isNaN(v)){
         return;
      }
      v = RFloat.toRange(v, o._valueMin, o._valueMax);
      o._dataDisplay = RFloat.format(v, 0, null, 2, null);
      o._hInput.value = o._dataDisplay;
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   MO.FUiSlideNumber_refreshValue = function FUiSlideNumber_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }
}
