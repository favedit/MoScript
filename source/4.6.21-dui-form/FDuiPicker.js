//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiPicker = function FDuiPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hInput1              = null;
   o._hInput2              = null;
   //..........................................................
   // @event
   o.onBuildEditInput      = MO.FDuiPicker_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiPicker_onBuildEditValue;
   // @event
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiPicker_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiPicker_onInputChanged);
   //..........................................................
   // @method
   o.construct             = MO.FDuiPicker_construct;
   // @method
   o.get                   = MO.FDuiPicker_get;
   o.set                   = MO.FDuiPicker_set;
   o.text                  = MO.FDuiPicker_text;
   // @method
   o.refreshStyle          = MO.FDuiPicker_refreshStyle;
   // @method
   o.dispose               = MO.FDuiPicker_dispose;



   //o.onKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = MO.Class.register(o, new MO.AEventKeyUp('onKeyUp'));
   //o.stUnit        = MO.Class.register(o, new MO.AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EUiBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FDuiPicker_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiPicker_formatValue;
   //o.setText       = FDuiPicker_setText;
   //o.validText     = FDuiPicker_validText;
   //o.findEditor    = FDuiPicker_findEditor;
   //o.drop          = FDuiPicker_drop;
   //o.link          = FDuiPicker_link;
   //o.clone         = FDuiPicker_clone;
   return o;
}

//==========================================================
// <T>建立编辑器输入。</T>
//
// @method
// @param event:SEvent 事件信息
// @param hTag:HtmlTag 页面元素
//==========================================================
MO.FDuiPicker_onBuildEditInput = function FDuiPicker_onBuildEditInput(event, hTag){
   var o = this;
   o.attachEvent('onInputKeyPress', hTag, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hTag, o.onInputChanged);
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiPicker_onBuildEditValue = function FDuiPicker_onBuildEditValue(event){
   var o = this;
   var hValuePanel = o._hValuePanel;
   //..........................................................
   // 建立改变栏
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   //..........................................................
   // 建立输入框1
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell);
   o.onBuildEditInput(event, hInput)
   //..........................................................
   // 建立输入框2
   var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell);
   o.onBuildEditInput(event, hInput)

   //htb.style.tableLayout = 'fixed';
   //var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   //o.onBuildChange(hr.insertCell());
   // 建立编辑控件
   //var hep = hr.insertCell();
   //var he = o._hInput = MO.Window.Builder.appendEdit(hValuePanel, o.styleName('Input'));
   // 设置大小
   //MO.Window.Html.setSize(he, o._inputSize);
   // 设置可以输入的最大长度
   //if(o._editLength){
      //he.maxLength = o._editLength;
   //}
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiPicker_onInputKeyPress = function FDuiPicker_onInputKeyPress(p){
   var o = this;
   //var c = p.keyCode;
   // 允许输入百分号(%)
   //if(he.shiftKey && 53 == kc){
   //   return;
   //}
   // 检查输入字符是否为数字，否则给清除输入内容
   //if(!MO.EKeyCode.floatCodes[c]){
   //   p.cancel();
   //}
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiPicker_onInputChanged = function FDuiPicker_onInputChanged(p){
   var o = this;
   // 内容改变通知
   //o.processDataChangedListener(o);
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
MO.FDuiPicker_construct = function FDuiPicker_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2();
   o._currentValue = new MO.SPoint2();
   o._dataValue = new MO.SPoint2();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @param value:SPoint2 内容
// @return SPoint2 数据
//==========================================================
MO.FDuiPicker_get = function FDuiPicker_get(value){
   var o = this;
   var currentValue = MO.Runtime.nvl(value, o._currentValue);
   // 获得数据1
   var text1 = o._hInput1.value;
   currentValue.x = MO.Lang.Float.parse(text1);
   // 获得数据2
   var text2 = o._hInput2.value;
   currentValue.y = MO.Lang.Float.parse(text2);
   // 返回内容
   return currentValue;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:Object 数据
//==========================================================
MO.FDuiPicker_set = function FDuiPicker_set(value){
   var o = this;
   // 获得数据
   var dataValue = o._dataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value == null){
         dataValue.set(0, 0);
      }else if(value.constructor == String){
         dataValue.parse(value);
      }else if(value.constructor == MO.SPoint2){
         dataValue.set(value.x, value.y);
      }else if(value.constructor == MO.SSize2){
         dataValue.set(value.width, value.height);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 2){
      dataValue.set(arguments[0], arguments[1]);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   // 设置数据
   o._hInput1.value = MO.Lang.Float.format(dataValue.x, 0, null, 2, null);
   o._hInput2.value = MO.Lang.Float.format(dataValue.y, 0, null, 2, null);
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
MO.FDuiPicker_text = function FDuiPicker_text(){
   var o = this;
   var value = o.get();
   var text = value.toString();
   return text;
}

//==========================================================
// <T>根据当前状态刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiPicker_refreshStyle = function FDuiPicker_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   // 计算格式
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
   var hInput1 = o._hInput1;
   hInput1.className = o.styleName(inputStyle);
   hInput1.readOnly = !o._statusEditable;
   var hInput2 = o._hInput2;
   hInput2.className = o.styleName(inputStyle);
   hInput2.readOnly = !o._statusEditable;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiPicker_dispose = function FDuiPicker_dispose(){
   var o = this
   // 释放属性
   o._inputSize = MO.Lang.Object.dispose(o._inputSize);
   o._dataValue = MO.Lang.Object.dispose(o._dataValue);
   o._currentValue = MO.Lang.Object.dispose(o._currentValue);
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
MO.FDuiPicker_onDataKeyDown = function FDuiPicker_onDataKeyDown(s, e){
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
// <T>格式化数据。</T>
//
// @method
// @param v:value:String 显示内容
//==========================================================
MO.FDuiPicker_formatValue = function FDuiPicker_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
MO.FDuiPicker_setText = function FDuiPicker_setText(t){
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
MO.FDuiPicker_validText = function FDuiPicker_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      // 最小长度的校验
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return MO.RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      // 最大长度的校验
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return MO.RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
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
MO.FDuiPicker_findEditor = function FDuiPicker_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = MO.Console.find(MO.FDuiPickerConsole).focus(o, MO.FDuiPickerEditor);
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
MO.FDuiPicker_drop = function FDuiPicker_drop(){
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

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
MO.FDuiPicker_clone = function FDuiPicker_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
MO.FDuiPicker_link = function FDuiPicker_link(){
   var o = this;
}
