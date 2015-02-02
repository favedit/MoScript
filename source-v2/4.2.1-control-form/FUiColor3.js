//==========================================================
// <T>颜色3编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┬----------------------┬---------------------┬------------------┐
// │hChangePanel<TD> │ hRedPanel<TD>        │ hGreenPanel<TD>      │ hBluePanel<TD>      │ hDropPanel<TD>   │
// │hChangeIcon<IMG> │┌------------------┐│┌------------------┐│┌-----------------┐│┌--------------┐│
// │                 ││hInputRed<INPUT>  │││hInputGreen<INPUT>│││hInputBlue<INPUT>│││hDropIcon<IMG>││
// │                 │└------------------┘│└------------------┘│└-----------------┘│└--------------┘│
// └-----------------┴----------------------┴----------------------┴---------------------┴------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FUiColor3(o){
   //o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit);
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   //..........................................................
   // @attribute
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   // @attribute
   o._barRed           = null;
   o._barGreen         = null;
   o._barBlue          = null;
   //..........................................................
   // @event
   o.onBuildEditValue  = FUiColor3_onBuildEditValue;
   // @event
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColor3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColor3_onInputChanged);
   o.onSlideMouseDown  = RClass.register(o, new AEventMouseDown('onSlideMouseDown'), FUiColor3_onSlideMouseDown);
   o.onSlideMouseMove  = RClass.register(o, new AEventMouseMove('onSlideMouseMove'), FUiColor3_onSlideMouseMove);
   o.onSlideMouseUp    = RClass.register(o, new AEventMouseUp('onSlideMouseUp'), FUiColor3_onSlideMouseUp);
   //..........................................................
   // @method
   o.construct         = FUiColor3_construct;
   // @method
   o.get               = FUiColor3_get;
   o.set               = FUiColor3_set;
   o.setDisplayColor   = FUiColor3_setDisplayColor;
   o.setDisplay        = FUiColor3_setDisplay;
   o.refreshValue      = FUiColor3_refreshValue;

   //o.onKeyDown    = RClass.register(o, new AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = RClass.register(o, new AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = RClass.register(o, new AEventKeyUp('onKeyUp'));
   //o.stUnit        = RClass.register(o, new AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FUiColor3_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FUiColor3_formatValue;
   //o.setText       = FUiColor3_setText;
   //o.validText     = FUiColor3_validText;
   //o.findEditor    = FUiColor3_findEditor;
   //o.drop          = FUiColor3_drop;
   //o.link          = FUiColor3_link;
   //o.clone         = FUiColor3_clone;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiColor3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立颜色栏
   var hcp = o._hColorPanel = RBuilder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 47);
   //..........................................................
   var hcp = RBuilder.appendTableCell(hl);
   var hcf = o._hColorForm = RBuilder.appendTable(hcp);
   hcf.width = '100%';
   // 建立红色输入栏
   var b = o._barRed = new SUiColorBar();
   b.control = o;
   b.type = 'red';
   b.hPanel = o._hColorForm;
   b.build();
   // 建立绿色输入栏
   var b = o._barGreen = new SUiColorBar();
   b.control = o;
   b.type = 'green';
   b.hPanel = o._hColorForm;
   b.build();
   // 建立蓝色输入栏
   var b = o._barBlue = new SUiColorBar();
   b.control = o;
   b.type = 'blue';
   b.hPanel = o._hColorForm;
   b.build();

   //o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   //o.attachEvent('onInputChanged', he, o.onInputChanged);

   //var hc = RBuilder.appendTableCell(hl);
   //hc.style.borderRight = '1px solid #666666';
   //var he = o._hInputRed = RBuilder.appendEdit(hc, o.styleName('Input'));
   //o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   //o.attachEvent('onInputChanged', he, o.onInputChanged);
   // 建立绿输入栏
   //var hc = RBuilder.appendTableCell(hl);
   //hc.style.borderLeft = '1px solid #999999';
   //hc.style.borderRight = '1px solid #666666';
   //var he = o._hInputGreen = RBuilder.appendEdit(hc, o.styleName('Input'));
   //o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   //o.attachEvent('onInputChanged', he, o.onInputChanged);
   // 建立蓝色输入栏
   //var hc = RBuilder.appendTableCell(hl);
   //hc.style.borderLeft = '1px solid #999999';
   //var he = o._hInputBlue = RBuilder.appendEdit(hc, o.styleName('Input'));
   //o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   //o.attachEvent('onInputChanged', he, o.onInputChanged);
   //..........................................................
   // 建立下拉栏
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColor3_onInputKeyPress(p){
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
function FUiColor3_onInputChanged(p){
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
// <T>滑动栏鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColor3_onSlideMouseDown(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseDown(p);
}

//==========================================================
// <T>滑动栏鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColor3_onSlideMouseMove(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseMove(p);
}

//==========================================================
// <T>滑动栏鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColor3_onSlideMouseUp(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseUp(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiColor3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FUiColor3_get(p){
   var o = this;
   var v = o._innerDataValue;
   // 获得数据
   var h = o._barRed.hInput;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._barGreen.hInput;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._barBlue.hInput;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiColor3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   // 设置显示
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   // 设置颜色
   o.setDisplayColor();
   // 设置数据
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>设置显示数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiColor3_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   // 设置颜色
   var vr = RHex.format(parseInt(v.red * 255), 2);
   var vg = RHex.format(parseInt(v.green * 255), 2);
   var vb = RHex.format(parseInt(v.blue * 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}

//==========================================================
// <T>设置显示数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiColor3_setDisplay(){
   var o = this;
   // 设置颜色
   o.setDisplayColor();
   // 设置内容
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
function FUiColor3_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   // 内容改变通知
   o.processDataChangedListener(o);
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
function FUiColor3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}


//==========================================================
// <T>格式化数据。</T>
//
// @method
// @param v:value:String 显示内容
//==========================================================
function FUiColor3_formatValue(v){
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
function FUiColor3_setText(t){
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
function FUiColor3_validText(t){
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
function FUiColor3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3Console).focus(o, FUiColor3Editor);
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
function FUiColor3_drop(){
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
function FUiColor3_clone(){
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
function FUiColor3_link(){
   var o = this;
   
}
