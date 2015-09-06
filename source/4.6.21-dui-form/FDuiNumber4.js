//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiNumber4 = function FDuiNumber4(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hInput               = null;
   //..........................................................
   // @event
   o.onBuildEditInput      = MO.FDuiNumber4_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiNumber4_onBuildEditValue;
   // @event
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber4_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber4_onInputChanged);
   //..........................................................
   // @method
   o.construct             = MO.FDuiNumber4_construct;
   // @method
   o.get                   = MO.FDuiNumber4_get;
   o.set                   = MO.FDuiNumber4_set;
   o.text                  = MO.FDuiNumber4_text;
   // @method
   o.refreshStyle          = MO.FDuiNumber4_refreshStyle;
   // @method
   o.dispose               = MO.FDuiNumber4_dispose;








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
   //o.onDataKeyDown = FDuiNumber4_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiNumber4_formatValue;
   //o.setText       = FDuiNumber4_setText;
   //o.validText     = FDuiNumber4_validText;
   //o.findEditor    = FDuiNumber4_findEditor;
   //o.drop          = FDuiNumber4_drop;
   //o.link          = FDuiNumber4_link;
   //o.clone         = FDuiNumber4_clone;
   return o;
}

//==========================================================
// <T>建立编辑器输入。</T>
//
// @method
// @param event:SEvent 事件信息
// @param hTag:HtmlTag 页面元素
//==========================================================
MO.FDuiNumber4_onBuildEditInput = function FDuiNumber4_onBuildEditInput(event, hTag){
   var o = this;
   o.attachEvent('onInputKeyPress', hTag, o.onInputKeyPress);
   o.attachEvent('onInputChanged', hTag, o.onInputChanged);
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiNumber4_onBuildEditValue = function FDuiNumber4_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   //..........................................................
   // 建立改变栏
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   var hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   //..........................................................
   // 建立输入框1
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   // 建立输入框2
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   // 建立输入框3
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput3 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
   // 建立输入框4
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #EEEEEE';
   var hInput = o._hInput4 = MO.Window.Builder.appendEdit(hCell);
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(event, hInput)
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber4_onInputKeyPress = function FDuiNumber4_onInputKeyPress(p){
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
MO.FDuiNumber4_onInputChanged = function FDuiNumber4_onInputChanged(p){
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
MO.FDuiNumber4_construct = function FDuiNumber4_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(0, 0);
   o._currentValue = new MO.SPoint4();
   o._dataValue = new MO.SPoint4();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @param value:SPoint4 内容
// @return SPoint4 数据
//==========================================================
MO.FDuiNumber4_get = function FDuiNumber4_get(value){
   var o = this;
   var currentValue = MO.Runtime.nvl(value, o._currentValue);
   // 获得数据1
   var text1 = o._hInput1.value;
   currentValue.x = MO.Lang.Float.parse(text1);
   // 获得数据2
   var text2 = o._hInput2.value;
   currentValue.y = MO.Lang.Float.parse(text2);
   // 获得数据3
   var text3 = o._hInput3.value;
   currentValue.y = MO.Lang.Float.parse(text3);
   // 获得数据4
   var text4 = o._hInput4.value;
   currentValue.y = MO.Lang.Float.parse(text4);
   // 返回内容
   return currentValue;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:Object 数据
//==========================================================
MO.FDuiNumber4_set = function FDuiNumber4_set(value){
   var o = this;
   // 获得数据
   var dataValue = o._dataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value == null){
         dataValue.set(0, 0);
      }else if(value.constructor == String){
         dataValue.parse(value);
      }else if(value.constructor == MO.SPoint4){
         dataValue.set(value.x, value.y, value.z, value.w);
      }else if(value.constructor == MO.SVector4){
         dataValue.set(value.x, value.y, value.z, value.w);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 4){
      dataValue.set(arguments[0], arguments[1], arguments[2], arguments[3]);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   // 设置数据
   o._hInput1.value = MO.Lang.Float.format(dataValue.x, 0, null, 2, null);
   o._hInput2.value = MO.Lang.Float.format(dataValue.y, 0, null, 2, null);
   o._hInput3.value = MO.Lang.Float.format(dataValue.z, 0, null, 2, null);
   o._hInput4.value = MO.Lang.Float.format(dataValue.w, 0, null, 2, null);
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
MO.FDuiNumber4_text = function FDuiNumber4_text(){
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
MO.FDuiNumber4_refreshStyle = function FDuiNumber4_refreshStyle(){
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
   o._hInput1.className = o.styleName(inputStyle);
   o._hInput1.readOnly = !o._statusEditable;
   o._hInput2.className = o.styleName(inputStyle);
   o._hInput2.readOnly = !o._statusEditable;
   o._hInput3.className = o.styleName(inputStyle);
   o._hInput3.readOnly = !o._statusEditable;
   o._hInput4.className = o.styleName(inputStyle);
   o._hInput4.readOnly = !o._statusEditable;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber4_dispose = function FDuiNumber4_dispose(){
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
MO.FDuiNumber4_onDataKeyDown = function FDuiNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
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
MO.FDuiNumber4_formatValue = function FDuiNumber4_formatValue(v){
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
MO.FDuiNumber4_setText = function FDuiNumber4_setText(t){
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
MO.FDuiNumber4_validText = function FDuiNumber4_validText(t){
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
MO.FDuiNumber4_findEditor = function FDuiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber4Console).focus(o, FDuiNumber4Editor);
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
MO.FDuiNumber4_drop = function FDuiNumber4_drop(){
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
MO.FDuiNumber4_clone = function FDuiNumber4_clone(){
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
MO.FDuiNumber4_link = function FDuiNumber4_link(){
   var o = this;
   
}
