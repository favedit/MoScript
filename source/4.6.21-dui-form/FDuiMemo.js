with(MO){
   //==========================================================
   // <T>文本编辑框。</T>
   //
   //  hValuePanel<TD>
   //  hValueForm<TABLE>
   // ┌-----------------┬----------------------┐
   // │hChangePanel<TD> │ hInputPanel<TD>      │hValueLine<TR>
   // │hChangeIcon<IMG> │┌------------------┐│
   // │                 ││hInput<INPUT>     ││
   // │                 │└------------------┘│
   // └-----------------┴----------------------┘
   //
   // @class
   // @author maocy
   // @version 150318
   //==========================================================
   MO.FDuiMemo = function FDuiMemo(o){
      o = RClass.inherits(this, o, FDuiEditControl, MUiPropertyEdit, MListenerDataChanged);
      //..........................................................
      // @property
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      //..........................................................
      // @style
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      //..........................................................
      // @html
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      //..........................................................
      // @event
      o.onBuildEditValue = FDuiMemo_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiMemo_onInputEdit);
      //..........................................................
      // @method
      o.construct        = FDuiMemo_construct;
      // @method
      o.formatDisplay    = FDuiMemo_formatDisplay;
      o.formatValue      = FDuiMemo_formatValue;
      // @method
      o.get              = FDuiMemo_get;
      o.set              = FDuiMemo_set;
      o.refreshValue     = FDuiMemo_refreshValue;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiMemo_onBuildEditValue = function FDuiMemo_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      //..........................................................
      // 建立改变栏
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      //..........................................................
      // 建立输入栏
      var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl);
      var hInput = o._hInput = RBuilder.append(hInputPanel, 'TEXTAREA', o.styleName('Input'));
      hInput.wrap = 'off';
      o.attachEvent('onInputEdit', hInput, o.onInputEdit);
      // 设置大小
      RHtml.setSize(hInputPanel, o._inputSize);
      // 设置可以输入的最大长度
      if(o._editLength){
         hInput.maxLength = o._editLength;
      }
   }

   //==========================================================
   // <T>编辑控件中数据修改处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FDuiMemo_onInputEdit = function FDuiMemo_onInputEdit(p){
      var o = this;
      // 设置滑动栏
      var v = o._hInput.value;
      // 刷新数据
      o.refreshValue();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiMemo_construct = function FDuiMemo_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }

   //==========================================================
   // <T>格式化显示内容。</T>
   //
   // @method
   // @param value:String 数据
   // @return 内容
   //==========================================================
   MO.FDuiMemo_formatDisplay = function FDuiMemo_formatDisplay(value){
      var o = this;
      var text = RString.nvl(value);
      //if(ECase.Upper == o.editCase){
      //   r = RString.toUpper(r);
      //}else if(ECase.Lower == o.editCase){
      //   r = RString.toLower(r);
      //}
      o._dataDisplay = text;
      return text;
   }

   //==========================================================
   // <T>格式化数据内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return 数据
   //==========================================================
   MO.FDuiMemo_formatValue = function FDuiMemo_formatValue(value){
      return value;
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return String 数据
   //==========================================================
   MO.FDuiMemo_get = function FDuiMemo_get(){
      var o = this;
      o.__base.FDuiEditControl.get.call(o);
      // 获得显示
      var value = o._hInput.value;
      return value;
   }

   //==========================================================
   // <T>设置数据。</T>
   //
   // @method
   // @param value:String 数据
   //==========================================================
   MO.FDuiMemo_set = function FDuiMemo_set(value){
      var o = this;
      o.__base.FDuiEditControl.set.call(o, value);
      // 设置显示
      o._hInput.value = RString.nvl(value);
      //o.finded = v;
      //if(o.hChangeIcon){
      //   o.hChangeIcon.style.display = 'none';
      //}
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   MO.FDuiMemo_refreshValue = function FDuiMemo_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }
}
