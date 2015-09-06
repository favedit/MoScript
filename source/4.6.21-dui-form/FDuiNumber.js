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
MO.FDuiNumber = function FDuiNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiDescriptorPicker, MO.MUiDescriptorZoom, MO.MUiPropertyNumber);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   //..........................................................
   // @style
   o._styleAdjustPanel     = MO.Class.register(o, new MO.AStyle('_styleAdjustPanel'));
   o._styleAdjustForm      = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel         = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel       = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   //..........................................................
   // @attribute
   o._innerOriginValue     = null;
   o._innerDataValue       = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged'));
   //..........................................................
   // @html
   o._hInput               = null;
   o._iconUp               = null;
   o._iconDown             = null;
   //..........................................................
   // @event
   o.onBuildEditValue      = MO.FDuiNumber_onBuildEditValue;
   // @event
   o.onLabelPickerClick    = MO.Class.register(o, new MO.AEventClick('onLabelPickerClick'));
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber_onInputChanged);
   o.onInputPickerClick    = MO.Class.register(o, new MO.AEventDoubleClick('onInputPickerClick'));
   //..........................................................
   // @method
   o.construct             = MO.FDuiNumber_construct;
   // @method
   o.formatDisplay         = MO.FDuiNumber_formatDisplay;
   o.formatValue           = MO.FDuiNumber_formatValue;
   // @method
   o.get                   = MO.FDuiNumber_get;
   o.set                   = MO.FDuiNumber_set;
   // @method
   o.doPicker              = MO.FDuiNumber_doPicker;
   o.refreshStyle          = MO.FDuiNumber_refreshStyle;
   // @method
   o.dispose               = MO.FDuiNumber_dispose;



   //o.onKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = MO.Class.register(o, new MO.AEventKeyUp('onKeyUp'));
   //o.stUnit        = MO.Class.register(o, new MO.AStyle('Unit'));
   //..........................................................
   // @event
   //o.onDataKeyDown = FDuiNumber_onDataKeyDown;
   //..........................................................
   // @method
   //o.setText       = FDuiNumber_setText;
   //o.validText     = FDuiNumber_validText;
   //o.findEditor    = FDuiNumber_findEditor;
   //o.drop          = FDuiNumber_drop;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiNumber_onBuildEditValue = function FDuiNumber_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel);
   hInput.style.textAlign = 'right';
   //o.attachEvent('onEditFocus', hInput, o.onEditFocus);
   o.attachEvent('onInputKeyPress', hInput, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hInput, o.onInputChanged);
   o.attachEvent('onInputPickerClick', hInput, o.onPickerClick);
   //o.attachEvent('onEditBlur', hInput, o.onEditBlur);
   //o.attachEvent('onDataKeyUp', hInput, o.ohEditKeyUp); 
   // 设置可以输入的最大长度
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
   //..........................................................
   // 设置标签
   if(!MO.Lang.String.isEmpty(o._pickerFrame)){
      var hText = o._hText;
      hText.style.cursor = 'pointer';
      hText.style.textDecoration = 'underline';
      o.attachEvent('onLabelPickerClick', hText, o.onPickerClick);
   }
   //..........................................................
   // 建立调整栏
   var hAdjustPanel = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('AdjustForm'));
   var hAdjustForm = o.hAdjustForm = MO.Window.Builder.appendTable(hAdjustPanel, o.styleName('AdjustForm'));
   // 建立上按键
   var hCell = MO.Window.Builder.appendTableRowCell(hAdjustForm, o.styleName('UpPanel'));
   var hIcon = o._hUpIcon = MO.Window.Builder.appendIcon(hCell, null, 'control.number.up');
   hIcon.align = 'center';
   //o.attachEvent('onUpMouseDown', hi);
   // 建立下按键
   var hCell = MO.Window.Builder.appendTableRowCell(hAdjustForm, o.styleName('DownPanel'));
   var hIcon = o._hDownIcon = MO.Window.Builder.appendIcon(hCell, null, 'control.number.down');
   hIcon.align = 'center';
   //o.attachEvent('onDownMouseDown', hIcon);
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiNumber_onInputKeyPress = function FDuiNumber_onInputKeyPress(event){
   var o = this;
   var code = event.keyCode;
   // 检查输入字符是否为浮点数，否则给清除输入内容
   //if(!MO.RKeyboard.isFloatKey(c)){
   //   p.cancel();
   //}
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber_onInputChanged = function FDuiNumber_onInputChanged(p){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
   // 检查内容是否变更
   //var v = o._hInput.value;
   //if(o._dataDisplay != v){
   //   o.processDataChangedListener(o);
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber_construct = function FDuiNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._editSize.set(100, 20);
   o._inputSize = new MO.SSize2(80, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param value:String 数据
// @return 内容
//==========================================================
MO.FDuiNumber_formatDisplay = function FDuiNumber_formatDisplay(value){
   var o = this;
   var text = o._dataDisplay = MO.Lang.Float.format(value, 0, null, o._valuePrecision, null);
   return text;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param p:value:String 内容
// @return 数据
//==========================================================
MO.FDuiNumber_formatValue = function FDuiNumber_formatValue(value){
   return value;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Number 数据
//==========================================================
MO.FDuiNumber_get = function FDuiNumber_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.FDuiNumber_set = function FDuiNumber_set(value){
   var o = this;
   // 设置数据
   o._dataValue = value;
   // 设置文本
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>弹出关联的数据选取窗口。</T>
//
// @method
//==========================================================
MO.FDuiNumber_doPicker = function FDuiNumber_doPicker(){
   var o = this;
   var pickerFrame = o._pickerFrame;
   if(!MO.Lang.String.isEmpty(pickerFrame)){
      var frame = MO.Console.find(MO.FDuiFrameConsole).get(o, pickerFrame);
      frame.showPosition(MO.EUiPosition.Center)
      frame.setDataSelectListener(o, o.onPickerSelect);
      frame.doFetch();
   }
}

//==========================================================
// <T>根据当前状态刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiNumber_refreshStyle = function FDuiNumber_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   // 计算格式
   var hInput = o._hInput;
   var inputStyle = null;
   if(o._statusEditable){
      if(o._statusValueHover){
         inputStyle = 'InputHover';
      }else{
         inputStyle = 'InputNormal';
      }
   }else{
      inputStyle = 'InputReadonly';
   }
   // 设置样式
   hInput.className = o.styleName(inputStyle);
   hInput.readOnly = !o._statusEditable;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber_dispose = function FDuiNumber_dispose(){
   var o = this
   // 释放属性
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   // 父处理
   o.__base.FDuiEditControl.dispose.call(o);
}















//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiNumber_onDataKeyDown = function FDuiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   //if(o._editable){
   //   if(o.editComplete){
   //      if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
   //         var ed = o.findEditor();
   //         if(ed){
   //            ed.onEditKeyDown(s, e);
   //         }
   //      }
   //   }
   //}
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
MO.FDuiNumber_setText = function FDuiNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}

//==========================================================
// <T>校验内容。</T>
//
// @method
// @param t:text:String 内容
// @return 校验结果
//==========================================================
MO.FDuiNumber_validText = function FDuiNumber_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      // 最小长度的校验
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      // 最大长度的校验
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}

//==========================================================
// <T>查找编辑器。</T>
//
// @method
// @return 编辑器
//==========================================================
MO.FDuiNumber_findEditor = function FDuiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumberConsole).focus(o, FDuiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}

//==========================================================
// <T>下拉处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber_drop = function FDuiNumber_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}
