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
function FUiColorPower(o){
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
   // @attribute
   o._barRed           = null;
   o._barGreen         = null;
   o._barBlue          = null;
   o._barPower         = null;
   //..........................................................
   // @event
   o.onBuildEditValue  = FUiColorPower_onBuildEditValue;
   // @event
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColorPower_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColorPower_onInputChanged);
   o.onSlideMouseDown  = RClass.register(o, new AEventMouseDown('onSlideMouseDown'), FUiColorPower_onSlideMouseDown);
   o.onSlideMouseMove  = RClass.register(o, new AEventMouseMove('onSlideMouseMove'), FUiColorPower_onSlideMouseMove);
   o.onSlideMouseUp    = RClass.register(o, new AEventMouseUp('onSlideMouseUp'), FUiColorPower_onSlideMouseUp);
   //..........................................................
   // @method
   o.construct         = FUiColorPower_construct;
   // @method
   o.get               = FUiColorPower_get;
   o.set               = FUiColorPower_set;
   o.setDisplayColor   = FUiColorPower_setDisplayColor;
   o.setDisplay        = FUiColorPower_setDisplay;
   o.refreshValue      = FUiColorPower_refreshValue;

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
   //o.onDataKeyDown = FUiColorPower_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FUiColorPower_formatValue;
   //o.setText       = FUiColorPower_setText;
   //o.validText     = FUiColorPower_validText;
   //o.findEditor    = FUiColorPower_findEditor;
   //o.drop          = FUiColorPower_drop;
   //o.link          = FUiColorPower_link;
   //o.clone         = FUiColorPower_clone;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiColorPower_onBuildEditValue(p){
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
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 65);
   //..........................................................
   var hcp = RBuilder.appendTableCell(hl);
   var hcf = o._hColorForm = RBuilder.appendTable(hcp, null, 0, 1, 0);
   hcf.width = '100%';
   // 建立红色输入栏
   var b = o._barRed = new SUiColorChannel();
   b.control = o;
   b.type = 'red';
   b.hPanel = hcf;
   b.build();
   // 建立绿色输入栏
   var b = o._barGreen = new SUiColorChannel();
   b.control = o;
   b.type = 'green';
   b.hPanel = hcf;
   b.build();
   // 建立蓝色输入栏
   var b = o._barBlue = new SUiColorChannel();
   b.control = o;
   b.type = 'blue';
   b.hPanel = hcf;
   b.build();
   // 建立强度输入栏
   var b = o._barPower = new SUiColorPower();
   b.control = o;
   b.type = 'power';
   b.hPanel = hcf;
   b.build();
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
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
function FUiColorPower_onInputChanged(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInput();
   }
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
function FUiColorPower_onSlideMouseDown(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseDown(p);
}

//==========================================================
// <T>滑动栏鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onSlideMouseMove(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseMove(p);
}

//==========================================================
// <T>滑动栏鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onSlideMouseUp(p){
   var o = this;
   var b = p.hSource.__pbar;
   b.onMouseUp(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiColorPower_construct(){
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
function FUiColorPower_get(p){
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
   var h = o._barPower.hInput;
   if(h){
      v.alpha = RFloat.parse(h.value);
   }
   return v;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiColorPower_set(p){
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
   o._barPower.set(v.alpha);
   // 设置修改状态
   o.changeSet(false);
}

//==========================================================
// <T>设置显示数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiColorPower_setDisplayColor(){
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
function FUiColorPower_setDisplay(){
   var o = this;
   // 设置颜色
   o.setDisplayColor();
   // 设置内容
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
function FUiColorPower_refreshValue(){
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
function FUiColorPower_onDataKeyDown(s, e){
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
function FUiColorPower_formatValue(v){
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
function FUiColorPower_setText(t){
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
function FUiColorPower_validText(t){
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
function FUiColorPower_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColorPowerConsole).focus(o, FUiColorPowerEditor);
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
function FUiColorPower_drop(){
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
function FUiColorPower_clone(){
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
function FUiColorPower_link(){
   var o = this;
   
}
