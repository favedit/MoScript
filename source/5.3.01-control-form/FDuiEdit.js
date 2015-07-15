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
   // @version 150102
   //==========================================================
   MO.FUiEdit = function FUiEdit(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
      //..........................................................
      // @property
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
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
      o.onBuildEditValue = FUiEdit_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiEdit_onInputEdit);
      //..........................................................
      // @method
      o.construct        = FUiEdit_construct;
      // @method
      o.formatText       = FUiEdit_formatText;
      o.formatValue      = FUiEdit_formatValue;
      // @method
      o.text             = FUiEdit_text;
      o.setText          = FUiEdit_setText;
      o.setEditAble      = FUiEdit_setEditAble;
      o.refreshValue     = FUiEdit_refreshValue;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiEdit_onBuildEditValue = function FUiEdit_onBuildEditValue(p){
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
      var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
      var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
      o.attachEvent('onInputEdit', he, o.onInputEdit);
      // 设置大小
      RHtml.setSize(hep, o._inputSize);
      // 设置可以输入的最大长度
      if(o._editLength){
         he.maxLength = o._editLength;
      }
   }

   //==========================================================
   // <T>编辑控件中数据修改处理。 </T>
   //
   // @param p:event:SEvent 事件对象
   //==========================================================
   MO.FUiEdit_onInputEdit = function FUiEdit_onInputEdit(p){
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
   MO.FUiEdit_construct = function FUiEdit_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }

   //==========================================================
   // <T>格式化显示内容。</T>
   //
   // @method
   // @param p:value:String 数据
   // @return 内容
   //==========================================================
   MO.FUiEdit_formatText = function FUiEdit_formatText(p){
      var o = this;
      var r = RString.nvl(p);
      //if(ECase.Upper == o.editCase){
      //   r = RString.toUpper(r);
      //}else if(ECase.Lower == o.editCase){
      //   r = RString.toLower(r);
      //}
      o._dataDisplay = r;
      return r;
   }

   //==========================================================
   // <T>格式化数据内容。</T>
   //
   // @method
   // @param value:String 内容
   // @return 数据
   //==========================================================
   MO.FUiEdit_formatValue = function FUiEdit_formatValue(value){
      return value;
   }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @method
   // @return String 显示内容
   //==========================================================
   MO.FUiEdit_text = function FUiEdit_text(){
      return this._hInput.value;
   }

   //==========================================================
   // <T>设置文本内容。</T>
   //
   // @method
   // @param text:String 文本内容
   //==========================================================
   MO.FUiEdit_setText = function FUiEdit_setText(text){
      this._hInput.value = text;
   }

   //==========================================================
   // <T>设置编辑对象的可编辑性。</T>
   //
   // @method
   // @param flag:Boolean 可编辑性
   //==========================================================
   MO.FUiEdit_setEditAble = function FUiEdit_setEditAble(flag){
      var o = this;
      o.__base.FUiEditControl.setEditAble.call(o, flag);
      o._hInput.readOnly = !flag;
      //if(flag){
      //}else{
      //   o._hInput.style.backgroundColor = EUiColor.ReadonlyBackgroundColor;
      //   o._hValuePanel.style.backgroundColor = EUiColor.ReadonlyBackgroundColor;
      //}
   }

   //==========================================================
   // <T>刷新数据。</T>
   //
   // @method
   //==========================================================
   MO.FUiEdit_refreshValue = function FUiEdit_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }
}
