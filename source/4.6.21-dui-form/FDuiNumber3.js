//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiNumber3 = function FDuiNumber3(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   //..........................................................
   // @property
   o._inputSize            = MO.Class.register(o, [new MO.APtySize2('_inputSize'), new MO.AGetter('_inputSize')]);
   //..........................................................
   // @style
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel      = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @attribute
   o._innerOriginValue     = null;
   o._innerDataValue       = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hInput               = null;
   //..........................................................
   // @event
   o.onBuildEditInput      = MO.FDuiNumber3_onBuildEditInput;
   o.onBuildEditValue      = MO.FDuiNumber3_onBuildEditValue;
   // @event
   o.onInputKeyPress       = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), FDuiNumber3_onInputKeyPress);
   o.onInputChanged        = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), FDuiNumber3_onInputChanged);
   //..........................................................
   // @method
   o.construct             = MO.FDuiNumber3_construct;
   // @method
   o.get                   = MO.FDuiNumber3_get;
   o.set                   = MO.FDuiNumber3_set;
   // @method
   o.refreshStyle          = MO.FDuiNumber3_refreshStyle;
   // @method
   o.dispose               = MO.FDuiNumber3_dispose;



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
   //o.onDataKeyDown = FDuiNumber3_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiNumber3_formatValue;
   //o.setText       = FDuiNumber3_setText;
   //o.validText     = FDuiNumber3_validText;
   //o.findEditor    = FDuiNumber3_findEditor;
   //o.drop          = FDuiNumber3_drop;
   //o.link          = FDuiNumber3_link;
   //o.clone         = FDuiNumber3_clone;
   return o;
}

//==========================================================
// <T>建立编辑器输入。</T>
//
// @method
// @param p:argements:SArgements 参数集合
// @param h:html:HtmlTag 页面元素
//==========================================================
MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiNumber3_onBuildEditValue = function FDuiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(h);
   var hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   MO.Window.Html.setSize(hValueForm, o._inputSize);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入框1
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
   // 建立输入框2
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
   // 建立输入框3
   var hCell = MO.Window.Builder.appendTableCell(hValueLine, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   var hInput = o._hInput3 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   hInput.style.textAlign = 'right';
   o.onBuildEditInput(p, hInput)
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber3_onInputKeyPress = function FDuiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   // 允许输入百分号(%)
   //if(he.shiftKey && 53 == kc){
   //   return;
   //}
   // 检查输入字符是否为数字，否则给清除输入内容
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiNumber3_onInputChanged = function FDuiNumber3_onInputChanged(p){
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
MO.FDuiNumber3_construct = function FDuiNumber3_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SPoint3();
   o._innerDataValue = new MO.SPoint3();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiNumber3_get = function FDuiNumber3_get(p){
   var o = this;
   o.__base.FDuiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   // 获得数据1
   var h = o._hInput1;
   if(h){
      v.x = MO.Lang.Float.parse(h.value);
   }
   // 获得数据2
   var h = o._hInput2;
   if(h){
      v.y = MO.Lang.Float.parse(h.value);
   }
   // 获得数据3
   var h = o._hInput3;
   if(h){
      v.z = MO.Lang.Float.parse(h.value);
   }
   return v;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiNumber3_set = function FDuiNumber3_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var a = arguments;
   // 设置数据
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == MO.SPoint3) || (p.constructor == MO.SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   // 设置数据1
   var h = o._hInput1;
   if(h){
      h.value = MO.Lang.Float.format(vd.x, 0, null, 3, null);
   }
   // 设置数据2
   var h = o._hInput2;
   if(h){
      h.value = MO.Lang.Float.format(vd.y, 0, null, 3, null);
   }
   // 设置数据3
   var h = o._hInput3;
   if(h){
      h.value = MO.Lang.Float.format(vd.z, 0, null, 3, null);
   }
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>根据当前状态刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiNumber3_refreshStyle = function FDuiNumber3_refreshStyle(){
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
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber3_dispose = function FDuiNumber3_dispose(){
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
MO.FDuiNumber3_onDataKeyDown = function FDuiNumber3_onDataKeyDown(s, e){
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
MO.FDuiNumber3_formatValue = function FDuiNumber3_formatValue(v){
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
MO.FDuiNumber3_setText = function FDuiNumber3_setText(t){
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
MO.FDuiNumber3_validText = function FDuiNumber3_validText(t){
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
MO.FDuiNumber3_findEditor = function FDuiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber3Console).focus(o, FDuiNumber3Editor);
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
MO.FDuiNumber3_drop = function FDuiNumber3_drop(){
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
MO.FDuiNumber3_clone = function FDuiNumber3_clone(){
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
MO.FDuiNumber3_link = function FDuiNumber3_link(){
   var o = this;
   
}
