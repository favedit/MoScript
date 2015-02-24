//==========================================================
// <T>颜色强度编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┬--------------------------------┐
// │hChangePanel<TD> │ hColorPanel<TD>      │ hChannelPanel<TD>              │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│┌----------------------------┐│
// │                 ││hColorImage<IMG>  │││hChannelForm<TABLE>         ││
// │                 │└------------------┘│└----------------------------┘│
// └-----------------┴----------------------┴--------------------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FUiColorPower(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MMouseCapture);
   //..........................................................
   // @property
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel    = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   //..........................................................
   // @attribute
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   // @attribute
   o._barRed             = null;
   o._barGreen           = null;
   o._barBlue            = null;
   o._barPower           = null;
   //..........................................................
   // @html
   o._hColorPanel        = null;
   o._hColorImage        = null;
   // @html
   o._hChannelPanel      = null;
   o._hChannelForm       = null;
   //..........................................................
   // @event
   o.onBuildEditValue    = FUiColorPower_onBuildEditValue;
   // @event
   o.onMouseCaptureStart = FUiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = FUiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = FUiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColorPower_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiColorPower_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiColorPower_onInputChange);
   //..........................................................
   // @method
   o.construct           = FUiColorPower_construct;
   // @method
   o.get                 = FUiColorPower_get;
   o.set                 = FUiColorPower_set;
   o.setDisplayColor     = FUiColorPower_setDisplayColor;
   o.setDisplay          = FUiColorPower_setDisplay;
   o.refreshValue        = FUiColorPower_refreshValue;
   // @method
   o.dispose             = FUiColorPower_dispose;
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
   var hcp = o._hChannelPanel = RBuilder.appendTableCell(hl);
   var hcf = o._hChannelForm = RBuilder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   // 建立红色输入栏
   var b = o._barRed = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   // 建立绿色输入栏
   var b = o._barGreen = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   // 建立蓝色输入栏
   var b = o._barBlue = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   // 建立强度输入栏
   var b = o._barPower = new SUiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.hPanel = hcf;
   b.build();
}

//==========================================================
// <T>滑动栏鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}

//==========================================================
// <T>滑动栏鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onMouseCapture(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}

//==========================================================
// <T>滑动栏鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   // 检查输入字符是否控制按键
   if(RKeyboard.isControlKey(c)){
      return;
   }
   // 检查输入字符是否为浮点数，否则给清除输入内容
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}

//==========================================================
// <T>编辑控件中处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   // 内容改变通知
   o.processDataChangedListener(o);
}

//==========================================================
// <T>编辑控件完成处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
function FUiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   // 内容改变通知
   o.processDataChangedListener(o);
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
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
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
   var va = v.alpha;
   var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
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
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiColorPower_dispose(t){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o, t);
}
