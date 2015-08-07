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
   MO.FDuiEdit = function FDuiEdit(o){
      o = RClass.inherits(this, o, FDuiEditControl, MPropertyEdit, MListenerDataChanged);
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
      o.onBuildEditValue = FDuiEdit_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiEdit_onInputEdit);
      //..........................................................
      // @method
      o.construct        = FDuiEdit_construct;
      // @method
      o.formatText       = FDuiEdit_formatText;
      o.formatValue      = FDuiEdit_formatValue;
      // @method
      o.text             = FDuiEdit_text;
      o.setText          = FDuiEdit_setText;
      o.setEditAble      = FDuiEdit_setEditAble;
      o.refreshValue     = FDuiEdit_refreshValue;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiEdit_onBuildEditValue = function FDuiEdit_onBuildEditValue(p){
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
   MO.FDuiEdit_onInputEdit = function FDuiEdit_onInputEdit(p){
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
   MO.FDuiEdit_construct = function FDuiEdit_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }

   //==========================================================
   // <T>格式化显示内容。</T>
   //
   // @method
   // @param p:value:String 数据
   // @return 内容
   //==========================================================
   MO.FDuiEdit_formatText = function FDuiEdit_formatText(p){
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
   MO.FDuiEdit_formatValue = function FDuiEdit_formatValue(value){
      return value;
   }

   //==========================================================
   // <T>获得文本内容。</T>
   //
   // @method
   // @return String 显示内容
   //==========================================================
   MO.FDuiEdit_text = function FDuiEdit_text(){
      return this._hInput.value;
   }

   //==========================================================
   // <T>设置文本内容。</T>
   //
   // @method
   // @param text:String 文本内容
   //==========================================================
   MO.FDuiEdit_setText = function FDuiEdit_setText(text){
      this._hInput.value = text;
   }

   //==========================================================
   // <T>设置编辑对象的可编辑性。</T>
   //
   // @method
   // @param flag:Boolean 可编辑性
   //==========================================================
   MO.FDuiEdit_setEditAble = function FDuiEdit_setEditAble(flag){
      var o = this;
      o.__base.FDuiEditControl.setEditAble.call(o, flag);
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
   MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue(){
      var o = this;
      // 内容改变通知
      o.processDataChangedListener(o);
   }
}
