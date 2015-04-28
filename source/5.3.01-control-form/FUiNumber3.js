//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FUiNumber3(o){
   //o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit);
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel  = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   //..........................................................
   // @attribute
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   //..........................................................
   // @html
   o._hInput           = null;
   //..........................................................
   // @event
   o.onBuildEditInput  = FUiNumber3_onBuildEditInput;
   o.onBuildEditValue  = FUiNumber3_onBuildEditValue;
   // @event
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber3_onInputChanged);
   //..........................................................
   // @method
   o.construct         = FUiNumber3_construct;
   // @method
   o.get               = FUiNumber3_get;
   o.set               = FUiNumber3_set;



   //o.onKeyDown    = RClass.register(o, new AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = RClass.register(o, new AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = RClass.register(o, new AEventKeyUp('onKeyUp'));
   //o.stUnit        = RClass.register(o, new AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EUiBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FUiNumber3_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FUiNumber3_formatValue;
   //o.setText       = FUiNumber3_setText;
   //o.validText     = FUiNumber3_validText;
   //o.findEditor    = FUiNumber3_findEditor;
   //o.drop          = FUiNumber3_drop;
   //o.link          = FUiNumber3_link;
   //o.clone         = FUiNumber3_clone;
   return o;
}

//==========================================================
// <T>建立编辑器输入。</T>
//
// @method
// @param p:argements:SArgements 参数集合
// @param h:html:HtmlTag 页面元素
//==========================================================
function FUiNumber3_onBuildEditInput(p, h){
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
function FUiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入框1
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput1 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   // 建立输入框2
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput2 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   // 建立输入框3
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInput3 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiNumber3_onInputKeyPress(p){
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
function FUiNumber3_onInputChanged(p){
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
function FUiNumber3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SPoint3();
   o._innerDataValue = new SPoint3();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FUiNumber3_get(p){
   var o = this;
   o.__base.FUiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   // 获得数据1
   var h = o._hInput1;
   if(h){
      v.x = RFloat.parse(h.value);
   }
   // 获得数据2
   var h = o._hInput2;
   if(h){
      v.y = RFloat.parse(h.value);
   }
   // 获得数据3
   var h = o._hInput3;
   if(h){
      v.z = RFloat.parse(h.value);
   }
   return v;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiNumber3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var a = arguments;
   // 设置数据
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == SPoint3) || (p.constructor == SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new TError('Invalid value format.');
   }
   // 设置数据1
   var h = o._hInput1;
   if(h){
      h.value = RFloat.format(vd.x, 0, null, 3, null);
   }
   // 设置数据2
   var h = o._hInput2;
   if(h){
      h.value = RFloat.format(vd.y, 0, null, 3, null);
   }
   // 设置数据3
   var h = o._hInput3;
   if(h){
      h.value = RFloat.format(vd.z, 0, null, 3, null);
   }
   // 设置修改状态
   o.changeSet(false);
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
function FUiNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
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
function FUiNumber3_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
function FUiNumber3_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
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
function FUiNumber3_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
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
function FUiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber3Console).focus(o, FUiNumber3Editor);
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
function FUiNumber3_drop(){
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
function FUiNumber3_clone(){
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
function FUiNumber3_link(){
   var o = this;
   
}
