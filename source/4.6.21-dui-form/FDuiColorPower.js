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
MO.FDuiColorPower = function FDuiColorPower(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged, MO.MMouseCapture);
   //..........................................................
   // @property
   o._inputSize          = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._valueMin           = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax           = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   //..........................................................
   // @style
   o._styleValuePanel    = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel    = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput         = MO.Class.register(o, new MO.AStyle('_styleInput'));
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
   o.onBuildEditValue    = MO.FDuiColorPower_onBuildEditValue;
   // @event
   o.onMouseCaptureStart = MO.FDuiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColorPower_onInputKeyPress);
   o.onInputEdit         = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiColorPower_onInputEdit);
   o.onInputChange       = MO.Class.register(o, new MO.AEventChange('onInputChange'), MO.FDuiColorPower_onInputChange);
   //..........................................................
   // @method
   o.construct           = MO.FDuiColorPower_construct;
   // @method
   o.get                 = MO.FDuiColorPower_get;
   o.set                 = MO.FDuiColorPower_set;
   o.setDisplayColor     = MO.FDuiColorPower_setDisplayColor;
   o.setDisplay          = MO.FDuiColorPower_setDisplay;
   o.refreshValue        = MO.FDuiColorPower_refreshValue;
   // @method
   o.dispose             = MO.FDuiColorPower_dispose;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiColorPower_onBuildEditValue = function FDuiColorPower_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立颜色栏
   var hcp = o._hColorPanel = MO.Window.Builder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = MO.Window.Builder.appendIcon(hcp, null, 'n', 14, 65);
   //..........................................................
   var hcp = o._hChannelPanel = MO.Window.Builder.appendTableCell(hl);
   var hcf = o._hChannelForm = MO.Window.Builder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   // 建立红色输入栏
   var b = o._barRed = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   // 建立绿色输入栏
   var b = o._barGreen = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   // 建立蓝色输入栏
   var b = o._barBlue = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   // 建立强度输入栏
   var b = o._barPower = new MO.SDuiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.setRange(o._valueMin, o._valueMax);
   b.hPanel = hcf;
   b.build();
}

//==========================================================
// <T>滑动栏鼠标落下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColorPower_onMouseCaptureStart = function FDuiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}

//==========================================================
// <T>滑动栏鼠标移动处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColorPower_onMouseCapture = function FDuiColorPower_onMouseCapture(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}

//==========================================================
// <T>滑动栏鼠标抬起处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColorPower_onMouseCaptureStop = function FDuiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColorPower_onInputKeyPress = function FDuiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   // 检查输入字符是否控制按键
   if(MO.RKeyboard.isControlKey(c)){
      return;
   }
   // 检查输入字符是否为浮点数，否则给清除输入内容
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}

//==========================================================
// <T>编辑控件中处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColorPower_onInputEdit = function FDuiColorPower_onInputEdit(p){
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
MO.FDuiColorPower_onInputChange = function FDuiColorPower_onInputChange(p){
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
MO.FDuiColorPower_construct = function FDuiColorPower_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SColor4();
   o._innerDataValue = new MO.SColor4();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiColorPower_get = function FDuiColorPower_get(p){
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
MO.FDuiColorPower_set = function FDuiColorPower_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   // 设置显示
   if(p.constructor == MO.SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new MO.TError('Invalid value format.');
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
MO.FDuiColorPower_setDisplayColor = function FDuiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   // 设置颜色
   var va = v.alpha;
   var vr = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}

//==========================================================
// <T>设置显示数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiColorPower_setDisplay = function FDuiColorPower_setDisplay(){
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
MO.FDuiColorPower_refreshValue = function FDuiColorPower_refreshValue(){
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
MO.FDuiColorPower_dispose = function FDuiColorPower_dispose(t){
   var o = this;
   o.__base.FDuiEditControl.dispose.call(o, t);
}
