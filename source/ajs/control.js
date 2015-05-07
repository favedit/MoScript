function AEvent(n, l, h){
   var o = this;
   AAnnotation.call(o, n);
   o._annotationCd = EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.linker        = AEvent_linker;
   o.handle        = AEvent_handle;
   o.value         = AEvent_value;
   o.create        = AEvent_create;
   o.attach        = RMethod.empty;
   o.bind          = AEvent_bind;
   o.toString      = AEvent_toString;
   return o;
}
function AEvent_linker(){
   return this._linker;
}
function AEvent_handle(){
   return this._handle;
}
function AEvent_value(){
   return this._process;
}
function AEvent_create(){
   return new SEvent();
}
function AEvent_bind(h, u){
   var o = this;
   if(u){
      h.addEventListener(o._linker, RUiEvent.ohEvent, true);
   }else{
      h[o._handle] = RUiEvent.ohEvent;
   }
}
function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
function AEventBlur(n, m){
   var o = this;
   AEvent.call(o, n, 'blur', 'onblur');
   o.attach = AEventBlur_attach;
   return o;
}
function AEventBlur_attach(e, h){
}
function AEventChange(n){
   var o = this;
   AEvent.call(o, n, 'change', 'onchange');
   o.attach = AEventChange_attach;
   return o;
}
function AEventChange_attach(e, h){
}
function AEventClick(n){
   var o = this;
   AEvent.call(o, n, 'click', 'onclick');
   o.attach = AEventClick_attach;
   return o;
}
function AEventClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
function AEventDoubleClick(n){
   var o = this;
   AEvent.call(o, n, 'dblclick', 'ondblclick');
   o.attach = AEventDoubleClick_attach;
   return o;
}
function AEventDoubleClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
function AEventFocus(n){
   var o = this;
   AEvent.call(o, n, 'focus', 'onfocus');
   o.attach = AEventFocus_attach;
   return o;
}
function AEventFocus_attach(e, h){
}
function AEventInputChanged(n){
   var o = this;
   AEvent.call(o, n, 'input', 'oninput');
   o.attach = AEventInputChanged_attach;
   o.bind   = AEventInputChanged_bind;
   return o;
}
function AEventInputChanged_attach(e, h){
}
function AEventInputChanged_bind(h, u){
   var o = this;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      h.onpropertychange = RUiEvent.ohEvent;
   }else{
      h.addEventListener('input', RUiEvent.ohEvent);
   }
}
function AEventKeyDown(n){
   var o = this;
   AEvent.call(o, n, 'keydown', 'onkeydown');
   o.attach = AEventKeyDown_attach;
   return o;
}
function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
function AEventKeyPress(n){
   var o = this;
   AEvent.call(o, n, 'keypress', 'onkeypress');
   o.create = AEventKeyPress_create;
   o.attach = AEventKeyPress_attach;
   return o;
}
function AEventKeyPress_create(){
   return new SKeyboardEvent();
}
function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
function AEventKeyUp(n){
   var o = this;
   AEvent.call(o, n, 'keyup', 'onkeyup');
   o.attach = AEventKeyUp_attach;
   return o;
}
function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
function AEventLoad(n){
   var o = this;
   AEvent.call(o, n, 'load', 'onload');
   o.attach = AEventLoad_attach;
   return o;
}
function AEventLoad_attach(e, h){
}
function AEventMouse(n, l, h){
   var o = this;
   AEvent.call(o, n, l, h);
   o.attach = AEventMouse_attach;
   return o;
}
function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == EMouseButton.Left);
   e.mouseMiddle = (h.button == EMouseButton.Middle);
   e.mouseRight = (h.button == EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
      e.offsetX = h.layerX;
      e.offsetY = h.layerY;
   }else{
      e.x = h.x;
      e.y = h.y;
      e.offsetX = h.offsetX;
      e.offsetY = h.offsetY;
   }
   e.clientX = h.clientX;
   e.clientY = h.clientY;
}
function AEventMouseDown(n){
   var o = this;
   AEventMouse.call(o, n, 'mousedown', 'onmousedown');
   return o;
}
function AEventMouseEnter(n){
   var o = this;
   AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   o._logger = false;
   o.attach  = AEventMouseEnter_attach;
   return o;
}
function AEventMouseEnter_attach(e, h){
}
function AEventMouseLeave(n){
   var o = this;
   AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   o._logger = false;
   o.attach  = AEventMouseLeave_attach;
   return o;
}
function AEventMouseLeave_attach(e, h){
}
function AEventMouseMove(n){
   var o = this;
   AEventMouse.call(o, n, 'mousemove', 'onmousemove');
   o._logger = false;
   return o;
}
function AEventMouseOut(n){
   var o = this;
   AEvent.call(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOut_attach;
   return o;
}
function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseOver(n){
   var o = this;
   AEvent.call(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = AEventMouseOver_attach;
   return o;
}
function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
function AEventMouseUp(n){
   var o = this;
   AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
function AEventMouseWheel(n){
   var o = this;
   AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   o.attach = AEventMouseWheel_attach;
   return o;
}
function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
function AEventReadyStateChange(n){
   var o = this;
   AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
   o.attach = AEventReadyStateChange_attach;
   return o;
}
function AEventReadyStateChange_attach(e, h){
}
function AEventResize(n){
   var o = this;
   AEvent.call(o, n, 'resize', 'onresize');
   o.attach = AEventResize_attach;
   return o;
}
function AEventResize_attach(e, h){
   e.x = h.x;
   e.y = h.y;
}
function AEventScroll(n){
   var o = this;
   AEvent.call(o, n, 'scroll', 'onscroll');
   o.attach = AEventScroll_attach;
   return o;
}
function AEventScroll_attach(e, h){
}
function AEventTouchEnd(n){
   var o = this;
   AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = AEventTouchEnd_attach;
   return o;
}
function AEventTouchEnd_attach(e, h){
}
function AEventTouchMove(n){
   var o = this;
   AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = AEventTouchMove_attach;
   return o;
}
function AEventTouchMove_attach(e, h){
}
function AEventTouchStart(n){
   var o = this;
   AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = AEventTouchStart_attach;
   return o;
}
function AEventTouchStart_attach(e, h){
}
function APtyAttributes(n, l, vl, vt, vr, vb){
   var o = this;
   AProperty.call(o, n, l);
   o._left    = RInteger.nvl(vl);
   o._top     = RInteger.nvl(vt);
   o._right   = RInteger.nvl(vr);
   o._bottom  = RInteger.nvl(vb);
   o.load     = APtyAttributes_load;
   o.save     = APtyAttributes_save;
   o.toString = APtyAttributes_toString;
   return o;
}
function APtyAttributes_load(v, x){
   var o = this;
   var s = v[o._name];
   if(!s){
      s = v[o._name] = new TAttributes();
   }
   s.split(x.get(o._linker), '=', '\n');
}
function APtyAttributes_save(v, x){
   var o = this;
   var s = v[o._name];
   if(s){
      if(!s.isEmpty()){
         x.set(o._linker, s.join('=', '\n'));
      }
   }
}
function APtyAttributes_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
function APtyBoolean(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value    = v ? v : false;
   o.build    = APtyBoolean_build;
   o.load     = APtyBoolean_load;
   o.save     = APtyBoolean_save;
   o.toString = APtyBoolean_toString;
   return o;
}
function APtyBoolean_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = RBoolean.parse(x.get(o._linker));
}
function APtyBoolean_save(v, x){
   var o = this;
   var d = v[o._name];
   if(d){
      x.set(o._linker, RBoolean.toString(d));
   }
}
function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyConfig(n, l){
   var o = this;
   AProperty.call(o, n, l);
   o.force = true;
   o.load  = APtyConfig_load;
   o.save  = RMethod.empty;
   return o;
}
function APtyConfig_load(v, x){
   v[this.name] = x;
}
function APtyEnum(n, l, e, d){
   var o = this;
   AProperty.call(o, n, l);
   o._enum    = e;
   o._default = d;
   o.build    = APtyEnum_build;
   o.load     = APtyEnum_load;
   o.save     = APtyEnum_save;
   o.toString = APtyEnum_toString;
   return o;
}
function APtyEnum_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._default;
   }
}
function APtyEnum_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
function APtyEnum_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
function APtyEnum_toString(){
   var o = this;
   return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
}
function APtyInteger(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value   = RInteger.nvl(v);
   o.build    = APtyInteger_build;
   o.load     = APtyInteger_load;
   o.save     = APtyInteger_save;
   o.toString = APtyInteger_toString;
   return o;
}
function APtyInteger_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyInteger_load(v, x){
   var o = this;
   v[o._name] = RInteger.parse(x.get(o._linker));
}
function APtyInteger_save(v, x){
   var o = this;
   x.set(o._linker, RInteger.toString(v[o._name]));
}
function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyNumber(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value   = RInteger.nvl(v);
   o.build    = APtyNumber_build;
   o.toString = APtyNumber_toString;
   return o;
}
function APtyNumber_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyNumber_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
function APtyPadding(n, l, vl, vt, vr, vb){
   var o = this;
   AProperty.call(o, n, l);
   o._left    = RInteger.nvl(vl);
   o._top     = RInteger.nvl(vt);
   o._right   = RInteger.nvl(vr);
   o._bottom  = RInteger.nvl(vb);
   o.load     = APtyPadding_load;
   o.save     = APtyPadding_save;
   o.toString = APtyPadding_toString;
   return o;
}
function APtyPadding_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPadding_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
function APtyPoint2(n, l, x, y){
   var o = this;
   AProperty.call(o, n, l);
   o._x       = RInteger.nvl(x);
   o._y       = RInteger.nvl(y);
   o.load     = APtyPoint2_load;
   o.save     = APtyPoint2_save;
   o.toString = APtyPoint2_toString;
   return o;
}
function APtyPoint2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtyPoint2_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
function APtySet(n, l, s, v){
   var o = this;
   AProperty.call(o, n, l);
   o._search = s;
   o._value  = v;
   o.build    = APtySet_build;
   o.load     = APtySet_load;
   o.save     = APtySet_save;
   o.toString = APtySet_toString;
   return o;
}
function APtySet_build(v){
   var o = this;
   if(v[o.name] == null){
      v[o.name] = o._value;
   }
}
function APtySet_load(v, x){
   var o = this;
   v[o.name] = RSet.containsString(x.get(o.linker), o.search);
}
function APtySet_save(v, x){
   var o = this;
   var n = o.name;
   var vs = v[n];
   var xs = x.get(o.linker);
   var e = RSet.containsString(xs, o._search);
   if(vs && !e){
      x.set(n, vs + o._search);
   }else if(!v && e){
      x.set(n, RString.remove(vs, o._search));
   }
}
function APtySet_toString(){
   var o = this;
   return 'linker=' + o.linker + ',value=' + o._value + ',search=' + o._search;
}
function APtySize2(n, l, w, h){
   var o = this;
   AProperty.call(o, n, l);
   o._width   = RInteger.nvl(w);
   o._height  = RInteger.nvl(h);
   o.load     = APtySize2_load;
   o.save     = APtySize2_save;
   o.toString = APtySize2_toString;
   return o;
}
function APtySize2_load(v, x){
   var o = this;
   v[o._name].parse(x.get(o._linker));
}
function APtySize2_save(v, x){
   var o = this;
   var d = v[o._name];
   if(!d.isEmpty()){
      x.set(o._linker, d.toString());
   }
}
function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
function APtyString(n, l, v){
   var o = this;
   AProperty.call(o, n, l);
   o._value    = v ? v : null;
   o.build    = APtyString_build;
   o.toString = APtyString_toString;
   return o;
}
function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
var EEditConfig = new function EEditConfig(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
function EEditStatusFace(o){
   if(!o){o=this;}
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
var EEditStatus = new EEditStatusFace();
var EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
var EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
var EEventType = new function EEventType(){
   var o = this;
   o.Unknown    = 0;
   o.Construct  = 1;
   o.Initialize = 2;
   o.Build      = 3;
   o.Refresh    = 4;
   o.Resize     = 5;
   o.Visible    = 6;
   o.Show       = 7;
   o.Hidden     = 8;
   o.Enable     = 9;
   o.Disable    = 10;
   o.Release    = 11;
   o.Design     = 12;
   o.Action     = 13;
   o.Valid      = 14;
   o.Mode       = 15;
   return o;
}
var ERowStatus = new function ERowStatusFace(){
   var o = this;
   o.Normal = 'N';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete  = 'D';
   return o;
}
var EUiAlign = new function EUiAlign(){
   var o = this;
   o.Left        = 'left';
   o.Center      = 'center';
   o.Right       = 'right';
   o.Top         = 'up';
   o.Middle      = 'middle';
   o.Bottom      = 'down';
   o.BottomLeft  = 'bl';
   o.BottomRight = 'br';
   return o;
}
var EUiBorder = new function EUiBorder(){
   var o = this;
   o.None          = 0;
   o.Square        = 1;
   o.Round         = 2;
   o.RoundIcon     = 3;
   o.RoundDrop     = 4;
   o.RoundTitle    = 5;
   o.RoundIconDrop = 6;
   return o;
}
var EUiBorderStyle = new function EUiBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
var EUiColor = new function EUiColor(){
   var o = this;
   o.ReadonlyBackgroundColor = '#FEFECB';
   o.Normal        = '#FFFFFF';
   o.Select        = '#F8C59A';
   o.Valid         = '#FFCCCC';
   o.Invalid       = '#FFCCCC';
   o.Edit          = '#FFFFFF';
   o.EditHover     = '#EBFFFF';
   o.Require       = '#FF0000';
   o.Text          = '#000000';
   o.TextEdit      = '#0066FF';
   o.TextReadonly  = '#333333';
   o.TextInvalid   = 'red';
   o.Delete        = '#DDDDDD';
   o.ColumnReadonly = '#FFFFFF';
   o.Rows          = new Array('#FFFFFF', '#FAFAFA');
   o.RowSelect     = '#cde5ff';
   o.RowHover      = '#E8E8FF';
   o.RowEdit       = '#FFFFFF';
   o.RowEditSelect = '#FDEBDB';
   o.RowEditHover  = '#F8F8E0';
   return o;
}
var EUiCursor = new function EUiCursor(){
   var o = this;
   o.Default   = 'default';
   o.Auto      = 'auto';
   o.NorthWest = 'NW';
   o.SouthWest = 'SW';
   o.SouthEast = 'SE';
   o.NorthEast = 'NE';
   o.West      = 'W';
   o.South     = 'S';
   o.East      = 'E';
   o.North     = 'N';
   o.Pointer   = 'pointer';
   o.Cross     = 'crosshair';
   o.Move      = 'move';
   return o;
}
var EUiDialog = new function EUiDialog(){
   var o = this;
   o.Confirm = 1;
   o.Info    = 2
   o.Warn    = 3;
   o.Error   = 4;
   return o;
}
var EUiDirection = new function EUiDirection(){
   var o = this;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
var EUiDock = new function EUiDock(){
   var o = this;
   o.None = 'none';
   o.Fill = 'fill';
   return o;
}
var EUiLabelMode = new function EUiLabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
var EUiLabelPosition = new function EUiLabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
var EUiLayer = new function EUiLayer(){
   var o = this;
   o.Default = 20000;
   o.Shadow  =  6000;
   o.Disable =  5000;
   o.Drap    = 10000;
   o.Window  = 20000;
   o.Drop    = 40000;
   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
var EUiLayout = new function EUiLayout(){
   var o = this;
   o.Display = 'P';
   o.Search  = 'S';
   o.Design  = 'G';
   o.Insert  = 'I';
   o.Update  = 'U';
   o.Delete  = 'D';
   o.Zoom    = 'Z';
   return o;
}
var EUiMerge = new function EUiMerge(){
   var o = this;
   o.Append   = 'append';
   o.Override = 'override';
   o.Disable  = 'disable';
   return o;
}
var EPanel = new function EPanel(){
   var o = this;
   o.Container = 0;
   o.Parent    = 1;
   o.Size      = 8;
   o.Border    = 2;
   o.Edit      = 3;
   o.Focus     = 4;
   o.Design    = 5;
   o.Scroll    = 6;
   o.Shadow    = 7;
   o.Move      = 9;
   o.Disable   = 10;
   o.Drop      = 11;
   return o;
}
var EUiPosition = new function EUiPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   o.Center = 'center';
   o.Before     = 1;
   o.After      = 2;
   o.LineBefore = 3;
   o.LineAfter  = 4;
   return o;
}
var EUiScroll = new function EUiScroll(){
   var o = this;
   o.None           = 'N';
   o.Horizontal     = 'H';
   o.HorizontalAuto = 'HA';
   o.Vertical       = 'V';
   o.VerticalAuto   = 'VA';
   o.Both           = 'B';
   o.BothAuto       = 'BA';
   return o;
}
var EUiSize = new function EUiSize(){
   var o = this;
   o.Normal     = 0
   o.Horizontal = 1
   o.Vertical   = 2
   o.Fill       = 3;
   o.Both       = 4;
   return o;
}
var EUiWrap = new function EUiWrap(){
   var o = this;
   o.NextLine = 0;
   o.SameLine = 1;
   return o;
}
function MListenerBlur(o){
   o = RClass.inherits(this, o, MListener);
   o.addBlurListener     = MListenerBlur_addBlurListener;
   o.processBlurListener = MListenerBlur_processBlurListener;
   return o;
}
function MListenerBlur_addBlurListener(w, m){
   return this.addListener(EEvent.Blur, w, m);
}
function MListenerBlur_processBlurListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Blur, p1, p2, p3, p4, p5);
}
function MListenerClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addClickListener     = MListenerClick_addClickListener;
   o.setClickListener     = MListenerClick_setClickListener;
   o.removeClickListener  = MListenerClick_removeClickListener;
   o.processClickListener = MListenerClick_processClickListener;
   return o;
}
function MListenerClick_addClickListener(owner, method){
   return this.addListener(EEvent.Click, owner, method);
}
function MListenerClick_setClickListener(owner, method){
   return this.setListener(EEvent.Click, owner, method);
}
function MListenerClick_removeClickListener(owner, method){
   return this.removeListener(EEvent.Click, owner, method);
}
function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
}
function MListenerDataChanged(o){
   o = RClass.inherits(this, o, MListener);
   o.addDataChangedListener     = MListenerDataChanged_addDataChangedListener;
   o.processDataChangedListener = MListenerDataChanged_processDataChangedListener;
   return o;
}
function MListenerDataChanged_addDataChangedListener(w, m){
   return this.addListener(EEvent.DataChanged, w, m);
}
function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.DataChanged, p1, p2, p3, p4, p5);
}
function MListenerDoubleClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addDoubleClickListener     = MListenerDoubleClick_addDoubleClickListener;
   o.setDoubleClickListener     = MListenerDoubleClick_setDoubleClickListener;
   o.processDoubleClickListener = MListenerDoubleClick_processDoubleClickListener;
   return o;
}
function MListenerDoubleClick_addDoubleClickListener(owner, method){
   return this.addListener(EEvent.DoubleClick, owner, method);
}
function MListenerDoubleClick_setDoubleClickListener(owner, method){
   return this.setListener(EEvent.DoubleClick, owner, method);
}
function MListenerDoubleClick_processDoubleClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
}
function MListenerEnter(o){
   o = RClass.inherits(this, o, MListener);
   o.addEnterListener     = MListenerEnter_addEnterListener;
   o.processEnterListener = MListenerEnter_processEnterListener;
   return o;
}
function MListenerEnter_addEnterListener(w, m){
   return this.addListener(EEvent.Enter, w, m);
}
function MListenerEnter_processEnterListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Enter, p1, p2, p3, p4, p5);
}
function MListenerFocus(o){
   o = RClass.inherits(this, o, MListener);
   o.addFocusListener     = MListenerFocus_addFocusListener;
   o.processFocusListener = MListenerFocus_processFocusListener;
   return o;
}
function MListenerFocus_addFocusListener(w, m){
   return this.addListener(EEvent.Focus, w, m);
}
function MListenerFocus_processFocusListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Focus, p1, p2, p3, p4, p5);
}
function MListenerItemClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addItemClickListener     = MListenerItemClick_addItemClickListener;
   o.processItemClickListener = MListenerItemClick_processItemClickListener;
   return o;
}
function MListenerItemClick_addItemClickListener(w, m){
   return this.addListener(EEvent.ItemClick, w, m);
}
function MListenerItemClick_processItemClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.ItemClick, p1, p2, p3, p4, p5);
}
function MListenerLeave(o){
   o = RClass.inherits(this, o, MListener);
   o.addLeaveListener     = MListenerLeave_addLeaveListener;
   o.processLeaveListener = MListenerLeave_processLeaveListener;
   return o;
}
function MListenerLeave_addLeaveListener(w, m){
   return this.addListener(EEvent.Leave, w, m);
}
function MListenerLeave_processLeaveListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Leave, p1, p2, p3, p4, p5);
}
function MListenerResult(o){
   o = RClass.inherits(this, o, MListener);
   o.addResultListener     = MListenerResult_addResultListener;
   o.removeResultListener  = MListenerResult_removeResultListener;
   o.processResultListener = MListenerResult_processResultListener;
   o.clearResultListeners  = MListenerResult_clearResultListeners;
   return o;
}
function MListenerResult_addResultListener(owner, method){
   return this.addListener(EEvent.Result, owner, method);
}
function MListenerResult_removeResultListener(owner, method){
   return this.removeListener(EEvent.Result, owner, method);
}
function MListenerResult_processResultListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Result, p1, p2, p3, p4, p5);
}
function MListenerResult_clearResultListeners(){
   return this.clearListeners(EEvent.Result);
}
function MListenerSelected(o){
   o = RClass.inherits(this, o, MListener);
   o.addSelectedListener     = MListenerSelected_addSelectedListener;
   o.processSelectedListener = MListenerSelected_processSelectedListener;
   return o;
}
function MListenerSelected_addSelectedListener(w, m){
   return this.addListener(EEvent.Selected, w, m);
}
function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Selected, p1, p2, p3, p4, p5);
}
function MPropertyCheck(o){
   o = RClass.inherits(this, o);
   o._valueTrue  = RClass.register(o, new APtyString('_valueTrue'), EBoolean.True);
   o._valueFalse = RClass.register(o, new APtyString('_valueFalse'), EBoolean.False);
   return o;
}
function MPropertyEdit(o){
   o = RClass.inherits(this, o, MUiEditValidator, MUiEditReference, MUiEditZoom);
   o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   o.oeValid         = MPropertyEdit_oeValid;
   return o;
}
function MPropertyEdit_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
function MPropertyNumber(o){
   o = RClass.inherits(this, o);
   o._valueMin       = RClass.register(o, new APtyNumber('_valueMin'));
   o._valueMax       = RClass.register(o, new APtyNumber('_valueMax'));
   o._valuePrecision = RClass.register(o, new APtyInteger('_valuePrecision'), 3);
   return o;
}
function MPropertySelect(o){
   o = RClass.inherits(this, o, MUiEditValidator, MUiEditReference, MUiEditZoom);
   o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   o.oeValid         = MPropertySelect_oeValid;
   return o;
}
function MPropertySelect_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
function MUiContainer(o){
   o = RClass.inherits(this, o);
   o.createChild = MUiContainer_createChild;
   o.appendChild = RMethod.empty;
   o.removeChild = RMethod.empty;
   return o;
}
function MUiContainer_createChild(p){
   var c = RUiControl.newInstance(p);
   c._parent = this;
   return c;
}
function MUiDataProperties(o){
   o = RClass.inherits(this, o);
   o._dataProperties = null;
   o.dataProperties  = MUiDataProperties_dataProperties;
   o.dataPropertyGet = MUiDataProperties_dataPropertyGet;
   o.dataPropertySet = MUiDataProperties_dataPropertySet;
   return o;
}
function MUiDataProperties_dataProperties(n, c){
   var o = this;
   var d = o._dataProperties;
   if(d == null){
      d = o._dataProperties = new TDictionary();
   }
   return d;
}
function MUiDataProperties_dataPropertyGet(n){
   var o = this;
   var d = o._dataProperties;
   return d ? d.get(n) : null;
}
function MUiDataProperties_dataPropertySet(n, v){
   this.dataProperties().set(n, v);
}
function MUiDescribeFrame(o){
   o = RClass.inherits(this, o);
   o._frameName  = null;
   o.buildDefine = MUiDescribeFrame_buildDefine;
   return o;
}
function MUiDescribeFrame_buildDefine(hDocument, frameName){
   var o = this;
   if(RString.isEmpty(frameName)){
      frameName = o._frameName;
   }
   var frameConsole = RConsole.find(FUiDescribeFrameConsole);
   var xconfig = frameConsole.load(frameName);
   RUiControl.build(o, xconfig, null, hDocument);
}
function MUiDesign(o){
   o = RClass.inherits(this, o);
   o._statusDesign      = false;
   o._storage       = null;
   o.oeDesign      = MUiDesign_oeDesign;
   o.onDesignEnter = RClass.register(o, new AEventMouseEnter('onDesignEnter'), MUiDesign_onDesignEnter);
   o.onDesignLeave = RClass.register(o, new AEventMouseEnter('onDesignLeave'), MUiDesign_onDesignLeave);
   o.onDesignBegin = RClass.register(o, new AEventMouseEnter('onDesignBegin'), MUiDesign_onDesignBegin);
   o.onDesignEnd   = RClass.register(o, new AEventMouseEnter('onDesignEnd'), MUiDesign_onDesignEnd);
   return o;
}
function MUiDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               o.isDesign = true;
               RHtml.link(h, 'className', h.className);
               RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = RHtml.findLink(h, 'className');
               var omd = RHtml.findLink(h, 'onmousedown');
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case EDesign.Border:
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = RHtml.findLink(h, 'styleBorder');
            }
            break;
      }
   }
}
function MUiDesign_onDesignEnter(p){
   var o = this;
   o._hPanel.className = o.style('Design');
}
function MUiDesign_onDesignLeave(p){
}
function MUiDesign_onDesignBegin(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   g.designStyle = o._hPanel.className;
   g.designLayer = o._hPanel.zIndex;
   o._hPanel.className = o.style('DesignDrag');
   o._statusDesign = true;
}
function MUiDesign_onDesignEnd(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   o._hPanel.className = g.designStyle;
   o._hPanel.zIndex = g.designLayer;
   o._statusDesign = false;
}
function MUiDisplay(o){
   o = RClass.inherits(this, o);
   o._dispDisplay = RClass.register(o, new APtySet(null, '_dispDisplay', 'disp_mode', EDisplayMode.Display, false));
   o._dispSearch  = RClass.register(o, new APtySet(null, '_dispSearch', 'disp_mode', EDisplayMode.Search, false));
   o._dispInsert  = RClass.register(o, new APtySet(null, '_dispInsert', 'disp_mode', EDisplayMode.Insert, false));
   o._dispUpdate  = RClass.register(o, new APtySet(null, '_dispUpdate', 'disp_mode', EDisplayMode.Update, false));
   o._dispDelete  = RClass.register(o, new APtySet(null, '_dispDelete', 'disp_mode', EDisplayMode.Delete, false));
   o._dispZoom    = RClass.register(o, new APtySet(null, '_dispZoom', 'disp_mode', EDisplayMode.Zoom, false));
   o._dispAlign   = RClass.register(o, new APtyString(null, '_dispAlign', null, EAlign.Left));
   o._visible    = true;
   o.oeMode      = MUiDisplay_oeMode;
   o.canVisible  = MUiDisplay_canVisible;
   return o;
}
function MUiDisplay_oeMode(e){
   var o = this;
   if(e.isBefore()){
      var v = true;
      if(!o.base.MUiDisplayAble){
         v = o.canVisible(e.mode);
      }
      o.setVisible(v);
   }
}
function MUiDisplay_canVisible(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Display:
         return o.dispList;
      case EMode.Search:
         return o.dispSearch;
      case EMode.Insert:
         return o.dispInsert;
      case EMode.Update:
         return o.dispUpdate;
      case EMode.Delete:
         return o.dispDelete;
      case EMode.Zoom:
         return o.dispZoom;
   }
}
function MUiDragable(o){
   o = RClass.inherits(this, o);
   o.onDragStart = RMethod.virtual(o, 'onDragStart');
   o.onDragMove  = RMethod.virtual(o, 'onDragMove');
   o.onDragStop  = RMethod.virtual(o, 'onDragStop');
   return o;
}
function MUiDropable(o){
   o = RClass.inherits(this, o);
   o._styleDrop         = RClass.register(o, new AStyle('_styleDrop'));
   o._styleIconDrop     = RClass.register(o, new AStyleIcon('_styleIconDrop'));
   o._hDropPanel        = null;
   o._hDrop             = null;
   o.onBuildDrop       = MUiDropable_onBuildDrop;
   o.onDropEnter       = RClass.register(o, new AEventMouseEnter('onDropEnter'));
   o.onDropLeave       = RClass.register(o, new AEventMouseLeave('onDropLeave'));
   o.onDropClick       = RClass.register(o, new AEventClick('onDropClick'), MUiDropable_onDropClick);
   o.onDropDoubleClick = RClass.register(o, new AEventDoubleClick('onDropDoubleClick'), MUiDropable_onDropDoubleClick);
   o.canDrop           = MUiDropable_canDrop;
   return o;
}
function MUiDropable_onBuildDrop(hPanel){
   var o = this;
   o._hDropPanel = hPanel;
   hPanel.className = o.styleName('Drop', MUiDropable);
   var hDrop = o.hDrop = RBuilder.appendIcon(hPanel, null, 'control.drop');
   hDrop.style.width =16;
   hDrop.style.borderLeft = '1 solid #CCCCCC';
   hDrop.style.cursor = 'hand';
}
function MUiDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MUiDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MUiDropable_canDrop(){
   var o = this;
   if(RClass.isClass(o, MUiDesign)){
      return !RConsole.find(FUiDesignConsole).canDesignMove;
   }
   return true;
}
function MUiEditable(o){
   o = RClass.inherits(this, o);
   return o;
}
function MUiEditable_testEdit(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.editInsert;
      case EMode.Update:
         return o.editUpdate;
      case EMode.Delete:
         return o.editDelete;
      case EMode.Zoom:
         return o.editZoom;
   }
}
function MUiEditChange(o){
   o = RClass.inherits(this, o);
   o._styleChangePanel = RClass.register(o, new AStyle('_styleChangePanel'));
   o._styleChangeIcon  = RClass.register(o, new AStyle('_styleChangeIcon'));
   o._hChangePanel     = null;
   o._hChangeIcon      = null;
   o.onBuildEditChange = MUiEditChange_onBuildEditChange;
   o.onChangeEnter     = RClass.register(o, new AEventMouseEnter('onChangeEnter'), MUiEditChange_onChangeEnter);
   o.onChangeLeave     = RClass.register(o, new AEventMouseLeave('onChangeLeave'), MUiEditChange_onChangeLeave);
   o.onChangeClick     = RClass.register(o, new AEventClick('onChangeClick'), MUiEditChange_onChangeClick);
   o.construct         = MUiEditChange_construct;
   o.changeSet         = MUiEditChange_changeSet;
   o.dispose           = MUiEditChange_dispose;
   return o;
}
function MUiEditChange_onBuildEditChange(p){
   var o = this;
   var h = o._hChangePanel;
   h.className = o.styleName('ChangePanel', MUiEditChange);
   h.style.verticalAlign = 'top';
   h.width = 5;
   o.attachEvent('onChangeEnter', h, o.onChangeEnter);
   o.attachEvent('onChangeLeave', h, o.onChangeLeave);
   o.attachEvent('onChangeClick', h, o.onChangeClick);
   var hi = o._hChangeIcon = RBuilder.appendIcon(h, o.styleName('ChangeIcon', MUiEditChange), 'control.change');
   hi._pname = 'change.icon';
}
function MUiEditChange_onChangeEnter(e){
   var o = this;
}
function MUiEditChange_onChangeLeave(e){
   var o = this;
}
function MUiEditChange_onChangeClick(e){
}
function MUiEditChange_construct(){
}
function MUiEditChange_changeSet(p){
}
function MUiEditChange_dispose(){
   var o = this;
   RHtml.free(o._hChangeIcon);
   o._hChangeIcon = null;
   RHtml.free(o._hChangePanel);
   o._hChangePanel = null;
}
function MUiEditDescriptor(o){
   o = RClass.inherits(this, o, MEditable);
   o._dataName          = RClass.register(o, new APtyString(null, '_dataName'));
   o._dataCode          = RClass.register(o, new APtyString(null, '_dataCode'));
   o._dataDefault       = RClass.register(o, new APtyString(null, '_dataDefault'));
   o._labelIcon         = RClass.register(o, new APtyString(null, '_labelIcon'));
   o._labelIconDisable  = RClass.register(o, new APtyString(null, '_labelIconDisable'));
   o._labelColor        = RClass.register(o, new APtyString(null, '_labelColor'));
   o._labelAlign        = RClass.register(o, new APtyString(null, '_labelAlign', null, EAlign.Left));
   o._labelValign       = RClass.register(o, new APtyString(null, '_labelValign', null, EAlign.Middle));
   o._editSearch        = RClass.register(o, new APtySet(null, '_editSearch', 'editAccess', EEditConfig.Search, false));
   o._editCopy          = RClass.register(o, new APtySet(null, '_editCopy', 'editAccess', EEditConfig.Copy, false));
   o._editAlign         = RClass.register(o, new APtyString(null, '_editAlign', null, EAlign.Left));
   o._editValign        = RClass.register(o, new APtyString(null, '_editValign', null, EAlign.Middle));
   o._editFormat        = RClass.register(o, new APtyString(null, '_editFormat'));
   o._editUnit          = RClass.register(o, new APtyString(null, '_editUnit'));
   o._editTip           = RClass.register(o, new APtyString(null, '_editTip'));
   o._validInsert       = RClass.register(o, new APtySet(null, '_validInsert', 'validAccess', EDisplayMode.Insert, false));
   o._validUpdate       = RClass.register(o, new APtySet(null, '_validUpdate', 'validAccess', EDisplayMode.Update, false));
   o._validDelete       = RClass.register(o, new APtySet(null, '_validDelete', 'validAccess', EDisplayMode.Delete, false));
   o._validRequire      = RClass.register(o, new APtyBoolean(null, '_validRequire', null, false));
   return o;
}
function MUiEditDescriptor_onDataEnter(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      s._hover = true;
      s.refreshStyle();
   }
   if(o.editTip){
      o.__tip = window.status;
   }
}
function MUiEditDescriptor_onDataLeave(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      o._hover = false;
      o.refreshStyle();
   }
   if(o.editTip){
      window.status = o.__tip;
   }
}
function MUiEditDescriptor_onDataKeyDown(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      s._invalidText = o.validText(s.text());
      s.refreshStyle();
   }
}
function MUiEditDescriptor_onDataChange(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      if(s.isTextChanged()){
         var t = s.text();
         var vt = s._invalidText = o.validText(t);
         if(vt){
            s.refreshStyle();
         }else{
         }
         o.callEvent('onDataChange', o, o.__changedEvent);
      }
   }
}
function MUiEditDescriptor_onDataEditEnd(s, e){
   var o = this;
   var vt = s._invalidText = o.validText(s.text());
   if(vt){
      RLogger.debug(this, 'Edit valid failed ({0})', vt);
   }else{
      s.commitValue();
   }
   if(s.isTextChanged()){
	   o.callEvent('onDataChange', o, o.__changedEvent);
   }
   s.refreshStyle();
}
function MUiEditDescriptor_oeSaveCode(e){
   var o = this;
   if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
      e.values.set(o.dataName, o.dataCode);
   }
   return EEventStatus.Stop;
}
function MUiEditDescriptor_canValid(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.validInsert;
      case EMode.Update:
         return o.validUpdate;
      case EMode.Delete:
         return o.validDelete;
   }
}
function MUiEditDescriptor_formatValue(v){
   return RString.nvl(v);
}
function MUiEditDescriptor_formatText(t){
   return RString.nvl(t);
}
function MUiEditDescriptor_validText(t){
   var o = this;
}
function MUiEditDrop(o){
   o = RClass.inherits(this, o);
   o._styleDropPanel = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleDropIcon  = RClass.register(o, new AStyle('_styleDropIcon'));
   o._hDropPanel     = null;
   o._hDropIcon      = null;
   o.onBuildEditDrop = MUiEditDrop_onBuildEditDrop;
   o.onDropEnter     = RClass.register(o, new AEventMouseEnter('onDropEnter'), MUiEditDrop_onDropEnter);
   o.onDropLeave     = RClass.register(o, new AEventMouseLeave('onDropLeave'), MUiEditDrop_onDropLeave);
   o.onDropClick     = RClass.register(o, new AEventClick('onDropClick'), MUiEditDrop_onDropClick);
   o.construct       = MUiEditDrop_construct;
   o.dispose         = MUiEditDrop_dispose;
   return o;
}
function MUiEditDrop_onBuildEditDrop(p){
   var o = this;
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MUiEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   var hi = o._hDropIcon = RBuilder.appendIcon(h, o.styleName('DropIcon', MUiEditDrop), 'control.drop');
   hi.align = 'center';
}
function MUiEditDrop_onDropEnter(e){
   var o = this;
}
function MUiEditDrop_onDropLeave(e){
   var o = this;
}
function MUiEditDrop_onDropClick(e){
}
function MUiEditDrop_construct(){
}
function MUiEditDrop_dispose(){
   var o = this;
   RHtml.free(o._hDropIcon);
   o._hDropIcon = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
}
function MUiEditFormator(o){
   o = RClass.inherits(this, o);
   o.formatText  = MUiEditFormator_formatText;
   o.formatValue = MUiEditFormator_formatValue;
   return o;
}
function MUiEditFormator_formatText(value){
   return value;
}
function MUiEditFormator_formatValue(text){
   return text;
}
function MUiEditReference(o){
   o = RClass.inherits(this, o);
   o._lovService    = RClass.register(o, new APtyString('_lovService'));
   o._lovReference  = RClass.register(o, new APtyString('_lovReference'));
   o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
   o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
   o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
   o._listView     = null;
   o.onListSelected = RMethod.empty;
   o.canListView    = MUiEditReference_canListView;
   o.setLabelStyle  = MUiEditReference_setLabelStyle;
   o.doListView     = MUiEditReference_doListView;
   return o;
}
function MUiEditReference_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}
function MUiEditReference_canListView(){
   return !RString.isEmpty(this._lovReference) && this._editable;
}
function MUiEditReference_setLabelStyle(){
   var o = this;
   if(!RString.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}
function MUiEditReference_doListView(cvs){
   var o = this;
   var v = o._listView;
   if(!v){
      v = o._listView = top.RControl.create(top.FListWindow);
   }
   v.linkConsole = RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
function MUiEditValidator(o){
   o = RClass.inherits(this, o);
   o._validable = false;
   o._valid     = true;
   o._validText = null;
   o.oeValid    = RMethod.empty;
   return o;
}
function MUiEditValue(o){
   o = RClass.inherits(this, o, MUiEditFormator);
   o._dataValue      = RClass.register(o, new APtyString('_dataValue'));
   o._statusEditable = true;
   o._statusEditing  = false;
   o._statusInvalid  = true;
   o._recordText     = null;
   o._recordValue    = null;
   o.isTextChanged   = MUiEditValue_isTextChanged;
   o.isValueChanged  = MUiEditValue_isValueChanged;
   o.formator        = MUiEditValue_formator;
   o.text            = MUiEditValue_text;
   o.setText         = MUiEditValue_setText;
   o.get             = MUiEditValue_get;
   o.set             = MUiEditValue_set;
   o.clearValue      = MUiEditValue_clearValue;
   o.resetValue      = MUiEditValue_resetValue;
   o.loadValue       = MUiEditValue_loadValue;
   o.saveValue       = MUiEditValue_saveValue;
   o.recordValue     = MUiEditValue_recordValue;
   o.validValue      = RMethod.empty;
   o.setEditAble     = MUiEditValue_setEditAble;
   o.doFocus         = MUiEditValue_doFocus;
   o.doBlur          = MUiEditValue_doBlur;
   return o;
}
function MUiEditValue_isTextChanged(){
   var o = this;
   var text = o.text();
   return RString.equals(o._recordText, text);
}
function MUiEditValue_isValueChanged(){
   var o = this;
   var value = o.get();
   return RString.equals(o._recordValue, value);
}
function MUiEditValue_formator(){
   return this;
}
function MUiEditValue_text(){
}
function MUiEditValue_setText(text){
}
function MUiEditValue_get(){
   var o = this;
   var text = o.text();
   var value = o._dataValue = o.formator().formatValue(text)
   return value;
}
function MUiEditValue_set(value){
   var o = this;
   o._dataValue = RString.nvl(value);
   var text = o.formator().formatText(value)
   o.setText(text);
}
function MUiEditValue_clearValue(){
   var o = this;
   o._dataValue = RString.EMPTY;
   o.set(RString.EMPTY);
}
function MUiEditValue_resetValue(){
   var o = this;
   o._dataValue = value;
   o.set(value);
}
function MUiEditValue_loadValue(c, t){
   var o = this;
}
function MUiEditValue_saveValue(c, t){
   var o = this;
}
function MUiEditValue_recordValue(){
   var o = this;
   o._recordText = o.text();
   o._recordValue = o.get();
}
function MUiEditValue_setEditAble(flag){
   var o = this;
   o._statusEditable = flag;
}
function MUiEditValue_doFocus(){
   var o = this;
   if(o._statusEditable){
      o._statusEditing = true;
   }
}
function MUiEditValue_doBlur(){
   var o = this;
   if(o._statusEditable && o._statusEditing){
      o._statusEditing = false;
   }
}
function MUiEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MUiEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.resetValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MUiEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   var vs = e.values;
   var dn = d.dataName;
   if(!RString.isEmpty(dn)){
      if(vs.contains(dn)){
         var v = vs.nvl(dn);
         if(RControl.isInfo(v)){
            o.setInfoPack(v);
         }else{
        	 if(RControl.isGroup(v)){
        		 o.setGroupPack(v);
        	 }else{
                 o.loadValue(vs);
        	 }
         }
         o.recordValue();
         o.dataValue = o.reget();
      }
   }
   return EEventStatus.Stop;
}
function MUiEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}
function MUiEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}
function MUiEditValue_commitValue(){
   this.__commitValue = RString.nvl(this.reget());
}
function MUiEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}
function MUiEditValue_setInfoPack(v){
   var o = this;
   var f = o._info;
   if(!f){
      f = o._info = new TControlInfo();
   }
   f.unpack(v);
   var d = o.descriptor();
   d.setInfo(f);
   if(d != o){
      o.setInfo(f);
   }
}
function MUiEditValue_setInfo(f){
   this.set(f.value);
}
function MUiEditZoom(o){
   o = RClass.inherits(this, o);
   o._zoomReference = RClass.register(o, new APtyString('_zoomReference'));
   o._zoomField     = RClass.register(o, new APtyString('_zoomField'));
   o.testZoom   = MUiEditZoom_testZoom;
   o.doZoom     = MUiEditZoom_doZoom;
   return o;
}
function MUiEditZoom_testZoom(){
   return !RString.isEmpty(this._zoomReference);
}
function MUiEditZoom_doZoom(p){
   RFormSpace.doZoom(this, p);
}
function MUiFocus(o){
   o = RClass.inherits(this, o);
   o.onFocus   = RClass.register(o, new AEventFocus('onFocus'), MUiFocus_onFocus);
   o.onBlur    = RClass.register(o, new AEventBlur('onBlur'));
   o.testFocus = RMethod.emptyTrue;
   o.testBlur  = RMethod.emptyTrue;
   o.doFocus   = RMethod.empty;
   o.doBlur    = RMethod.empty;
   o.focus     = MUiFocus_focus;
   o.blur      = MUiFocus_blur;
   return o;
}
function MUiFocus_onFocus(e){
   RConsole.find(FUiFocusConsole).focus(this, e);
}
function MUiFocus_focus(){
   RConsole.find(FUiFocusConsole).focus(this);
}
function MUiFocus_blur(){
   RConsole.find(FUiFocusConsole).blur(this);
}
function MUiHorizontal(o){
   o = RClass.inherits(this, o);
   o.setVisible = MUiHorizontal_setVisible;
   return o;
}
function MUiHorizontal_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function MUiMargin(o){
   o = RClass.inherits(this, o);
   o._margin       = RClass.register(o, new APtyPadding('_margin'));
   o.construct     = MUiMargin_construct;
   o.margin        = MUiMargin_margin;
   o.setMargin     = MUiMargin_setMargin;
   o.refreshMargin = MUiMargin_refreshMargin;
   o.dispose       = MUiMargin_dispose;
   return o;
}
function MUiMargin_construct(){
   var o = this;
   o._margin = new SPadding();
}
function MUiMargin_margin(){
   return this._margin;
}
function MUiMargin_setMargin(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(EPanel.Container);
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.marginLeft = (left == 0) ? null : left + 'px';
      }
   }
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.marginTop = (top == 0) ? null : top + 'px';
      }
   }
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.marginRight = (right == 0) ? null : right + 'px';
      }
   }
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}
function MUiMargin_refreshMargin(){
   var o = this;
   var p = o._margin;
   o.setMargin(p.left, p.top, p.right, p.bottom);
}
function MUiMargin_dispose(){
   var o = this;
   o._margin = RObject.dispose(o._margin);
}
function MUiPadding(o){
   o = RClass.inherits(this, o);
   o._padding       = RClass.register(o, new APtyPadding('_padding'));
   o.construct      = MUiPadding_construct;
   o.padding        = MUiPadding_padding;
   o.setPadding     = MUiPadding_setPadding;
   o.refreshPadding = MUiPadding_refreshPadding;
   o.dispose        = MUiPadding_dispose;
   return o;
}
function MUiPadding_construct(){
   var o = this;
   o._padding = new SPadding();
}
function MUiPadding_padding(){
   return this._padding;
}
function MUiPadding_setPadding(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(EPanel.Container);
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.paddingLeft = (left == 0) ? null : left + 'px';
      }
   }
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.paddingTop = (top == 0) ? null : top + 'px';
      }
   }
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.paddingRight = (right == 0) ? null : right + 'px';
      }
   }
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}
function MUiPadding_refreshPadding(){
   var o = this;
   var p = o._padding;
   o.setPadding(p.left, p.top, p.right, p.bottom);
}
function MUiPadding_dispose(){
   var o = this;
   var v = o._padding;
   if(v){
      v.dispose();
      o._padding = null;
   }
}
function MUiPopup(o){
   o = RClass.inherits(this, o);
   o._opener = null;
   o.opener  = MUiPopup_opener;
}
function MUiPopup_opener(){
   return this._opener;
}
function MUiProgress(o){
   o = RClass.inherits(this, o);
   o.oeProgress = RMethod.virtual(o, 'oeProgress');
   return o;
}
function MUiSize(o){
   o = RClass.inherits(this, o);
   o._dockCd         = RClass.register(o, new APtyString('_dockCd'));
   o._location       = RClass.register(o, new APtyPoint2('_location'));
   o._size           = RClass.register(o, new APtySize2('_size'));
   o.construct       = MUiSize_construct;
   o.dockCd          = MUiSize_dockCd;
   o.setDockCd       = MUiSize_setDockCd;
   o.left            = MUiSize_left;
   o.setLeft         = MUiSize_setLeft;
   o.top             = MUiSize_top;
   o.setTop          = MUiSize_setTop;
   o.location        = MUiSize_location;
   o.setLocation     = MUiSize_setLocation;
   o.refreshLocation = MUiSize_refreshLocation;
   o.width           = MUiSize_width;
   o.setWidth        = MUiSize_setWidth;
   o.height          = MUiSize_height;
   o.setHeight       = MUiSize_setHeight;
   o.size            = MUiSize_size;
   o.setSize         = MUiSize_setSize;
   o.refreshSize     = MUiSize_refreshSize;
   o.setBounds       = MUiSize_setBounds;
   o.refreshBounds   = MUiSize_refreshBounds;
   o.dispose         = MUiSize_dispose;
   o.innerDump       = MUiSize_innerDump;
   return o;
}
function MUiSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SUiSize2();
}
function MUiSize_dockCd(){
   return this._dockCd;
}
function MUiSize_setDockCd(dockCd){
   this._dockCd = dockCd;
}
function MUiSize_left(){
   return this._location.x;
}
function MUiSize_setLeft(p){
   this.setLocation(p, null);
}
function MUiSize_top(){
   return this._location.y;
}
function MUiSize_setTop(p){
   this.setLocation(null, p);
}
function MUiSize_location(){
   return this._location;
}
function MUiSize_setLocation(x, y){
   var o = this;
   var hPanel = o.panel(EPanel.Size);
   if(x != null){
      o._location.x = x;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.left = (x == 0) ? null : x + 'px';
      }
   }
   if(y != null){
      o._location.y = y;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.top = (y == 0) ? null : y + 'px';
      }
   }
}
function MUiSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
}
function MUiSize_width(){
   return this._size.width;
}
function MUiSize_setWidth(p){
   this.setSize(p, null);
}
function MUiSize_height(){
   return this._size.width;
}
function MUiSize_setHeight(p){
   this.setSize(null, p);
}
function MUiSize_size(){
   return this._size;
}
function MUiSize_setSize(width, height){
   var o = this;
   var hPanel = o.panel(EPanel.Size);
   if(width != null){
      o._size.width = width;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(width != 0){
               hPanel.width = width;
            }
         }else{
            if(RString.contains(width, '%')){
               hPanel.style.width = width;
            }else{
               hPanel.style.width = (width == 0) ? null : width + 'px';
            }
         }
      }
   }
   if(height != null){
      o._size.height = height;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(height != 0){
               hPanel.height = height;
            }
         }else{
            if(RString.contains(height, '%')){
               hPanel.style.height = height;
            }else{
               hPanel.style.height = (height == 0) ? null : height + 'px';
            }
         }
      }
   }
}
function MUiSize_refreshSize(){
   var o = this;
   o.setSize(o._size.width, o._size.height);
}
function MUiSize_setBounds(l, t, w, h){
   var o = this;
   o.setLocation(l, t);
   o.setSize(w, h);
}
function MUiSize_refreshBounds(){
   var o = this;
   o.refreshLocation();
   o.refreshSize();
}
function MUiSize_dispose(){
   var o = this;
   var v = o._location;
   if(v){
      v.dispose();
      o._location = null;
   }
   var v = o._size;
   if(v){
      v.dispose();
      o._size = null;
   }
}
function MUiSize_innerDump(s, l){
   var o = this;
   s.append('MUiSize:');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
function MUiSizeable(o){
   o = RClass.inherits(this, o);
   o.isSizeable  = true;
   o.onSize      = null;
   o.inSizeRange = RMethod.virtual(o, 'inSizeRange');
   o.cursor      = MUiSizeable_cursor;
   o.setCursor   = MUiSizeable_setCursor;
   o.resize      = MUiSizeable_resize;
   o.setBounds   = MUiSizeable_setBounds;
   o.startDrag   = MUiSizeable_startDrag;
   o.stopDrag    = MUiSizeable_stopDrag;
   return o;
}
function MUiSizeable_cursor(){
   var o = this;
   var src = RWindow.source();
   if(!o.inSizeRange(src)){
      return ECursor.Default;
   }
   var hObj = this.panel(EPanel.Border);
   var r = RHtml.rect(hObj);
   var pos = RWindow.offsetPos();
   var p = new TPoint(pos.x-r.left, pos.y-r.top);
   while(src){
      p.x += src.offsetLeft + src.clientLeft;
      p.y += src.offsetTop + src.clientTop;
      if(src == hObj){
         break;
      }
      src = src.offsetParent;
   }
   var border = EMoveSize.Border;
   var range = EMoveSize.Range;
   x = p.x;
   y = p.y;
   var right = r.width();
   var bottom = r.height();
   if(x>=0 && x<=range && y>=0 && y<=range){
      return ECursor.NorthWest;
   }else if(x>=0 && x<=range && y>=bottom-range && y<=bottom){
      return ECursor.SouthWest;
   }else if(x>=right-range && x<=right && y>=bottom-range && y<=bottom){
      return ECursor.SouthEast;
   }else if(x>=right-range && x<=right && y>=0 && y<=range){
      return ECursor.NorthEast;
   }else if(x>=0 && x<border && y>range && y<bottom-range){
      return ECursor.West;
   }else if(x>range && x<right-range && y>=bottom-border && y<=bottom){
      return ECursor.South;
   }else if(x>=right-border && x<=right && y>range && y<bottom-range){
      return ECursor.East;
   }else if(x>range && x<right-range && y>=0 && y<border){
      return ECursor.North;
   }
   return ECursor.Default;
}
function MUiSizeable_setCursor(cursor){
   if(!cursor){
      cursor = this.cursor();
   }
   var h = this.panel(EPanel.Size);
   if(h){
      h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
   }
}
function MUiSizeable_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(width != null){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MUiSizeable_setBounds(left, top, right, bottom, force){
   var sizeable = false;
   var st = this.htmlPanel(EPanel.Border).style;
   if(left != null){
      if(right == null || (right != null && right-left > EMoveSize.MinWidth)){
         left = Math.max(left, 0);
      }else{
         left = this.left;
      }
      if(force || this.left != left){
         this.left = left;
         st.pixelLeft = left;
         sizeable = true;
      }
   }
   if(top != null){
      if(bottom == null || (bottom != null && bottom-top > EMoveSize.MinHeight)){
         top = Math.max(top, 0);
      }else{
         top = this.top;
      }
      if(force || this.top != top){
         this.top = top;
         st.pixelTop = top;
         sizeable = true;
      }
   }
   if(right != null){
      var width = Math.max(right-this.left+1, EMoveSize.MinWidth);
      if(force || this.width != width){
         this.width = width;
         st.pixelWidth = this.width;
         sizeable = true;
      }
   }
   if(bottom != null){
      var height = Math.max(bottom-this.top+1, EMoveSize.MinHeight);
      if(force || this.height != height){
         this.height = height;
         st.pixelHeight = this.height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MUiSizeable_startDrag(){
}
function MUiSizeable_stopDrag(){
}
function MUiStorage(o){
   o = RClass.inherits(this, o);
   o._storageCode      = null;
   o._storageObject    = null;
   o.storageGet        = MUiHorizontal_storageGet;
   o.storageGetBoolean = MUiHorizontal_storageGetBoolean;
   o.storageSet        = MUiHorizontal_storageSet;
   o.storageUpdate     = MUiHorizontal_storageUpdate;
   o.dispose           = MUiHorizontal_dispose;
   return o;
}
function MUiHorizontal_storageGet(name, defaultValue){
   var o = this;
   if(name == null){
      throw new TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      var storge = RWindow.storage(EScope.Local);
      var value = storge.get(o._storageCode);
      object = o._storageObject = RJson.parse(value, Object);
   }
   if(object){
      var value = object[name];
      if(value != null){
         return value;
      }
   }
   return defaultValue;
}
function MUiHorizontal_storageGetBoolean(name, defaultValue){
   var o = this;
   var value = o.storageGet(name, defaultValue);
   return RBoolean.parse(value);
}
function MUiHorizontal_storageSet(name, value){
   var o = this;
   if(name == null){
      throw new TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      object = o._storageObject = new Object();
   }
   object[name] = value;
}
function MUiHorizontal_storageUpdate(){
   var o = this;
   var object = o._storageObject;
   if(object){
      var storge = RWindow.storage(EScope.Local);
      var value = RJson.toString(object);
      storge.set(o._storageCode, value);
   }
}
function MUiHorizontal_dispose(){
   var o = this;
   o._storageCode = null;
   o._storageObject = null;
}
function MUiStyle(o){
   o = RClass.inherits(this, o);
   o.construct     = RMethod.empty;
   o.styleName     = MUiStyle_styleName;
   o.styleIcon     = MUiStyle_styleIcon;
   o.styleIconPath = MUiStyle_styleIconPath;
   o.dispose       = RMethod.empty;
   return o;
}
function MUiStyle_styleName(n, c){
   var o = this;
   var f = c ? c : o;
   var tn = RClass.name(f);
   var t = RClass.forName(tn);
   return t.style(n);
}
function MUiStyle_styleIcon(n, c){
   return RClass.name(c ? c : this, true) + '_' + n;
}
function MUiStyle_styleIconPath(n, c){
   return RResource.iconPath(RClass.name(c ? c : this, true) + '_' + n);
}
function MUiValue(o){
   o = RClass.inherits(this, o);
   o.get = RMethod.empty;
   o.set = RMethod.empty;
   return o;
}
function MUiVertical(o){
   o = RClass.inherits(this, o);
   o.setVisible = MUiHorizontal_setVisible;
   return o;
}
function MUiHorizontal_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function SServiceInfo(){
   var o = this;
   o.service = null;
   o.action  = null;
   o.url     = null;
   return o;
}
function SUiSize2(width, height){
   var o = this;
   SSize2.call(o, width, height);
   o.parse = SUiSize2_parse;
   return o;
}
function SUiSize2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      var width = items[0];
      if(RString.contains(width, '%')){
         o.width = width;
      }else{
         o.width = parseInt(width);
      }
      var height = items[1];
      if(RString.contains(height, '%')){
         o.height = height;
      }else{
         o.height = parseInt(height);
      }
   }else{
      throw new TError(o, "Parse value failure. (value={1})", items);
   }
}
function TDatasetFetchArg(o){
   if(!o){o = this;}
   o.datasets   = new TDictionary();
   o.saveConfig = TDatasetFetchArg_saveConfig;
   o.process    = TDatasetFetchArg_process;
   return o;
}
function TDatasetFetchArg_saveConfig(p){
   var o = this;
   p.set('name', o.name);
}
function TDatasetFetchArg_process(){
   var o = this;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
function TDatasetFetchArg_push(v){
   var o = this;
   if(RClass.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(RClass.isClass(v, TOrderItem)){
      o.orders.push(v);
   }
}
function TDatasetFetchArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
function TEvent(owner, code, proc){
   var o = this;
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   o.onProcess = proc;
   o.isBefore  = TEvent_isBefore;
   o.isAfter   = TEvent_isAfter;
   o.process   = TEvent_process;
   o.dump      = TEvent_dump;
   return o;
}
function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}
function TEvent_isAfter(){
   return (EEventType.After == this.type);
}
function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={1})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}
function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
function TEventProcess(po, pm, pc){
   var o = this;
   o.owner    = po;
   o.invoke   = pm;
   o.clazz    = RClass.name(pc);
   o.invokeCd = EEventInvoke.Unknown;
   o.isBefore = TEventProcess_isBefore;
   o.isAfter  = TEventProcess_isAfter;
   o.dispose  = TEventProcess_dispose;
   o.dump     = TEventProcess_dump;
   return o;
}
function TEventProcess_isBefore(){
   return this.invokeCd == EEventInvoke.Before;
}
function TEventProcess_isAfter(){
   return this.invokeCd == EEventInvoke.After;
}
function TEventProcess_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
function TEventProcess_dump(){
   var o = this;
   return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
}
function THtmlEvent(){
   var o = this;
   o.linker  = null;
   o.events  = new Object();
   o.push    = THtmlEvent_push;
   o.dispose = THtmlEvent_dispose;
   o.dump    = THtmlEvent_dump;
   return o;
}
function THtmlEvent_push(pn, pe){
   var o = this;
   var ess = o.events;
   var es = ess[pn];
   if(!es){
      es = new Array();
      es.handle = pe.handle;
      ess[pn] = es;
   }
   var c = es.length;
   if(c > 0){
      var fn = pe.annotation.name();
      for(var i = 0; i < c; i++){
         var e = es[i];
         var en = e.annotation.name();
         if(en == fn){
            throw new TError(o, 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', en, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
         }
      }
   }
   es[es.length] = pe;
}
function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.linker[e.handle] = null;
      }
   }
   if(o.linker.linker){
      o.linker.removeAttribute('link');
   }
}
function THtmlEvent_dump(){
   var o = this;
   var ess = o.events;
   var r = new TString();
   for(var en in ess){
      var es = ess[en];
      var ec = es.length;
      r.append('event=' + en + ' (count=' + ec + ')\n');
      for(var n = 0; n < ec; n++){
         var e = es[n];
         r.append('   ' + n + ' source=' + RClass.dump(e.source) + ', event=' + RClass.dump(e) + '\n');
      }
   }
   return r.flush();
}
function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function TOrderItem(o){
   if(!o){o = this;}
   return o;
}
function TOrderItem_set(n, t){
   var o = this;
   o.name = n;
   o.type = t;
}
function TOrderItem_toNode(){
   var o = this;
   var n = new TNode('OrderItem');
   n.set('name', o.name);
   n.set('type', o.type);
   return n;
}
function TOrderItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   return as.pack();
}
function TOrderItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name = as.get("name");
   o.type = as.get("type");
}
function TOrderItems(o){
   if(!o){o = this;}
   TObjects(o);
}
function TOrderItems_pack(){
   var o = this;
   var ts = new TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
function TOrderItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TOrderItem();
      ti.unpack(t);
      o.push(ti);
   }
}
function TSearchItem(o){
   if(!o){o = this;}
   return o;
}
function TSearchItem_set(n, v, t, f){
   var o = this;
   o.name  = n;
   o.type  = RString.nvl(t, ESearch.Equals);
   o.value = v;
   o.format = f;
}
function TSearchItem_toNode(){
   var o = this;
   var n = new TNode('SearchItem');
   n.set('name', o.name);
   n.set('type', o.type);
   n.set('value', o.value);
   n.set('format', o.format);
   return n;
}
function TSearchItem_equals(s){
   var o = this;
   if(o.name == s.name && o.type == s.type && o.value == s.value){
	   return true;
   }
   return false;
}
function TSearchItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   as.set("value", o.value);
   as.set("format", o.format);
   return as.pack();
}
function TSearchItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name  = as.get("name");
   o.type  = as.get("type");
   o.value = as.get("value");
   o.format = as.get("format");
}
function TSearchItems(o){
   if(!o){o = this;}
   TObjects(o);
}
function TSearchItems_pack(){
   var o = this;
   var ts = new TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
function TSearchItems_removeAll(v){
   if(null != v){
      var o = this;
      var n = 0;
      var c = o.count;
      for(var i=n; i<c; i++){
         if(!o.memory[i].equals(v)){
            o.memory[n++] = o.memory[i];
         }
      }
      o.count = n;
   }
}
function TSearchItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TSearchItem();
      ti.unpack(t);
      if(!RString.isEmpty(ti.name)){
         o.push(ti);
      }
      else{
         o.clear();
         RMessage.fatal(this, 'unpack', 'Invalid value (value={1})', p);
      }
   }
}
function FUiCanvas(o){
   o = RClass.inherits(this, o, FUiControl);
   o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
   o.onBuildPanel = FUiCanvas_onBuildPanel;
   o.construct    = FUiCanvas_construct;
   o.dispose      = FUiCanvas_dispose;
   return o;
}
function FUiCanvas_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.create(event, 'CANVAS', o.styleName('Canvas'));
}
function FUiCanvas_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiCanvas_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
}
function FUiComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   o._name         = RClass.register(o, new APtyString('_name'));
   o._label        = RClass.register(o, new APtyString('_label'));
   o._parent       = null;
   o._components   = null;
   o._tag          = null;
   o.oeInitialize  = FUiComponent_oeInitialize;
   o.oeRelease     = FUiComponent_oeRelease;
   o.name          = FUiComponent_name;
   o.setName       = FUiComponent_setName;
   o.label         = FUiComponent_label;
   o.setLabel      = FUiComponent_setLabel;
   o.tag           = FUiComponent_tag;
   o.setTag        = FUiComponent_setTag;
   o.isParent      = FUiComponent_isParent;
   o.topComponent  = FUiComponent_topComponent;
   o.hasComponent  = FUiComponent_hasComponent;
   o.findComponent = FUiComponent_findComponent;
   o.components    = FUiComponent_components;
   o.push          = FUiComponent_push;
   o.remove        = FUiComponent_remove;
   o.clear         = FUiComponent_clear;
   o.process       = FUiComponent_process;
   o.psInitialize  = FUiComponent_psInitialize;
   o.psRelease     = FUiComponent_psRelease;
   o.toString      = FUiComponent_toString;
   o.dispose       = FUiComponent_dispose;
   o.innerDumpInfo = FUiComponent_innerDumpInfo;
   o.innerDump     = FUiComponent_innerDump;
   return o;
}
function FUiComponent_oeInitialize(e){
   return EEventStatus.Continue;
}
function FUiComponent_oeRelease(e){
   return EEventStatus.Continue;
}
function FUiComponent_name(){
   return this._name;
}
function FUiComponent_setName(p){
   this._name = p;
}
function FUiComponent_label(){
   return this._label;
}
function FUiComponent_setLabel(p){
   this._label = p;
}
function FUiComponent_tag(){
   return this._tag;
}
function FUiComponent_setTag(p){
   this._tag = p;
}
function FUiComponent_isParent(p){
   while(p){
      if(p == this){
         return true;
      }
      p = p._parent;
   }
}
function FUiComponent_topComponent(c){
   var p = this;
   if(c){
      while(RClass.isClass(p._parent, c)){
         p = p._parent;
      }
   }else{
      while(p._parent){
         p = p._parent;
      }
   }
   return p;
}
function FUiComponent_hasComponent(){
   var s = this._components;
   return s ? !s.isEmpty() : false;
}
function FUiComponent_findComponent(p){
   var s = this._components;
   return s ? s.get(p) : null;
}
function FUiComponent_components(){
   var o = this;
   var r = o._components;
   if(r == null){
      r = new TDictionary();
      o._components = r;
   }
   return r;
}
function FUiComponent_push(p){
   var o = this;
   if(RClass.isClass(p, FUiComponent)){
      var s = o.components();
      p._parent = o;
      if(p._name == null){
         p._name = s.count();
      }
      s.set(p._name, p);
   }
}
function FUiComponent_remove(component){
   var o = this;
   if(!RClass.isClass(component, FUiComponent)){
      throw new TError(o, 'Parameter is not componet. (component={1})', component);
   }
   var components = o._components;
   if(!components.contains(component.name())){
      throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
   }
   components.removeValue(component);
}
function FUiComponent_clear(p){
   var o = this;
   var s = o._components;
   if(s){
      s.clear();
   }
}
function FUiComponent_process(e){
   var o = this;
   var v = o.__base[e.clazz];
   if(v){
      e.invokeCd = EEventInvoke.Before;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   if(RClass.isClass(o, MUiContainer)){
      var ps = o._components;
      if(ps){
         var pc = ps.count();
         if(pc){
            for(var i = 0; i < pc; i++){
               var p = ps.valueAt(i);
               var r = p.process(e);
               if(r == EEventStatus.Cancel){
                  return r;
               }
            }
         }
      }
   }
   if(v){
      e.invokeCd = EEventInvoke.After;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   return EEventStatus.Continue;
}
function FUiComponent_psInitialize(){
   var o = this;
   var e = new TEventProcess(o, 'oeInitialize', FUiComponent);
   o.process(e);
   e.dispose();
}
function FUiComponent_psRelease(){
   var o = this;
   var e = new TEventProcess(o, 'oeRelease', FUiComponent);
   o.process(e);
   e.dispose();
}
function FUiComponent_toString(){
   var o = this;
   return RClass.dump(o) + ':label=' + o._label;
}
function FUiComponent_dispose(){
   var o = this;
   o._parent = null;
   o._name = null;
   o._label = null;
   o._tag = null;
   var cs = o._components
   if(cs){
      cs.dispose();
      o._components = null;
   }
   o.__base.FObject.dispose.call(o);
}
function FUiComponent_innerDumpInfo(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append(',name=', o._name);
   s.append(',label=', o._label);
}
function FUiComponent_innerDump(s, l){
   var o = this;
   o.innerdumpInfo(s);
   var ps = o.components;
   if(ps){
      s.appendLine();
      var c = ps.count;
      for(var n = 0; n < c; n++){
         var p = ps.value(n);
         if(p){
            p.innerDump(s, l + 1);
         }
      }
   }
   return s;
}
function FUiContainer(o){
   o = RClass.inherits(this, o, FUiControl, MUiContainer);
   o._scrollCd           = RClass.register(o, new APtyEnum('_scrollCd', null, EUiScroll, EUiScroll.None));
   o._controls           = null;
   o.oeDesign            = RMethod.empty;
   o.construct           = FUiContainer_construct;
   o.hasControl          = FUiContainer_hasControl;
   o.findControl         = FUiContainer_findControl;
   o.searchControl       = FUiContainer_searchControl;
   o.controls            = FUiContainer_controls;
   o.panel               = FUiContainer_panel;
   o.focusFirstControl   = FUiContainer_focusFirstControl;
   o.setControlsProperty = FUiContainer_setControlsProperty;
   o.storeConfig         = FUiContainer_storeConfig;
   o.push                = FUiContainer_push;
   o.remove              = FUiContainer_remove;
   o.clear               = FUiContainer_clear;
   o.dispose             = FUiContainer_dispose;
   return o;
}
function FUiContainer_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiContainer_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}
function FUiContainer_findControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
      }
   }
   return null;
}
function FUiContainer_searchControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
         if(RClass.isClass(c, FUiContainer)){
            var f = c.searchControl(p);
            if(f){
               return f;
            }
         }
      }
   }
   return null;
}
function FUiContainer_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
      o._controls = r;
   }
   return r;
}
function FUiContainer_panel(t){
   var o = this;
   if(t == EPanel.Container){
      return o._hPanel;
   }
   return o.__base.FUiControl.panel.call(o, t);
}
function FUiContainer_focusFirstControl(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var p = cs.valueAt(i);
         if(RClass.isClass(c, MUiFocus) && c.testFocus()){
            if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                return c.focus();
            }
         }
      }
      RConsole.find(FFocusConsole).focus(o);
   }
}
function FUiContainer_setControlsProperty(p, vs){
   var o = this;
   var cs = o._controls;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var c = cs.value(i);
         c[p] = vs[n];
      }
   }
}
function FUiContainer_storeConfig(x){
   var o = this;
   x.name = RClass.name(o);
   o.saveConfig(x);
   var ps = o._components;
   if(ps){
      var c = ps.count();
      for(var i = 0; i < c; i++){
         var p = ps.value(i);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FUiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
function FUiContainer_push(p){
   var o = this;
   o.__base.FUiControl.push.call(o, p);
   if(RClass.isClass(p, FUiControl)){
      o.controls().set(p._name, p);
      o.appendChild(p);
   }
}
function FUiContainer_remove(component){
   var o = this;
   if(RClass.isClass(component, FUiControl)){
      var controls = o._controls;
      if(!controls.contains(component.name())){
         throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      controls.removeValue(component);
      o.removeChild(component);
   }
   o.__base.FUiControl.remove.call(o, component);
}
function FUiContainer_clear(){
   var o = this;
   var s = o._controls;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         o.removeChild(s.valueAt(i));
      }
      s.clear();
   }
   o.__base.FUiControl.clear.call(o);
}
function FUiContainer_dispose(){
   var o = this;
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   o.__base.FUiControl.dispose.call(o);
}
function FUiControl(o){
   o = RClass.inherits(this, o, FUiComponent, MUiStyle, MUiSize, MUiPadding, MUiMargin);
   o._wrapCd        = RClass.register(o, new APtyEnum('_wrapCd', null, EUiWrap, EUiWrap.NextLine));
   o._visible       = RClass.register(o, new APtyBoolean('_visible'), true);
   o._disable       = RClass.register(o, new APtyBoolean('_disable'), false);
   o._hint          = RClass.register(o, new APtyString('_hint'));
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
   o._layoutCd      = EUiLayout.Display;
   o._sizeCd        = EUiSize.Normal;
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   o._statusBuilded = false;
   o._storage       = null;
   o._hParent       = null;
   o._hPanel        = null;
   o.onEnter        = RClass.register(o, new AEventMouseEnter('onEnter'), FUiControl_onEnter);
   o.onLeave        = RClass.register(o, new AEventMouseLeave('onLeave'), FUiControl_onLeave);
   o.onBuildPanel   = FUiControl_onBuildPanel;
   o.onBuild        = FUiControl_onBuild;
   o.onBuilded      = RMethod.empty;
   o.oeMode         = FUiControl_oeMode;
   o.oeEnable       = FUiControl_oeEnable;
   o.oeVisible      = FUiControl_oeVisible;
   o.oeResize       = FUiControl_oeResize;
   o.oeRefresh      = FUiControl_oeRefresh;
   o.construct      = FUiControl_construct;
   o.topControl     = FUiControl_topControl;
   o.panel          = FUiControl_panel;
   o.wrapCd         = FUiControl_wrapCd;
   o.setWrapCd      = FUiControl_setWrapCd;
   o.isVisible      = FUiControl_isVisible;
   o.setVisible     = FUiControl_setVisible;
   o.show           = FUiControl_show;
   o.hide           = FUiControl_hide;
   o.isEnable       = FUiControl_isEnable;
   o.setEnable      = FUiControl_setEnable;
   o.enable         = FUiControl_enable;
   o.disable        = FUiControl_disable;
   o.attachEvent    = FUiControl_attachEvent;
   o.linkEvent      = FUiControl_linkEvent;
   o.callEvent      = FUiControl_callEvent;
   o.psMode         = FUiControl_psMode;
   o.psDesign       = FUiControl_psDesign;
   o.psEnable       = FUiControl_psEnable;
   o.psVisible      = FUiControl_psVisible;
   o.psResize       = FUiControl_psResize;
   o.psRefresh      = FUiControl_psRefresh;
   o.isBuild        = FUiControl_isBuild;
   o.build          = FUiControl_build;
   o.builded        = FUiControl_builded;
   o.refresh        = FUiControl_refresh;
   o.setPanel       = FUiControl_setPanel;
   o.dispose        = FUiControl_dispose;
   return o;
}
function FUiControl_onEnter(e){
   var o = this;
   RConsole.find(FUiFocusConsole).enter(o);
   if(o._hint){
      RWindow.setStatus(o._hint);
   }
}
function FUiControl_onLeave(e){
   var o = this;
   RConsole.find(FUiFocusConsole).leave(o);
   if(o._hint){
      RWindow.setStatus();
   }
}
function FUiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiControl_onBuild(p){
   var o = this;
   o.onBuildPanel(p);
   if(o._statusVisible != o._visible){
      o.setVisible(o._visible);
   }
   var h = o._hPanel;
   RHtml.linkSet(h, 'control', o);
   o.attachEvent('onEnter', h);
   o.attachEvent('onLeave', h);
   o.refreshBounds();
   o.refreshPadding();
   o.refreshMargin();
}
function FUiControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return EEventStatus.Continue;
}
function FUiControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return EEventStatus.Continue;
}
function FUiControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return EEventStatus.Continue;
}
function FUiControl_oeResize(p){
   return EEventStatus.Continue;
}
function FUiControl_oeRefresh(e){
   return EEventStatus.Continue;
}
function FUiControl_construct(){
   var o = this;
   o.__base.FUiComponent.construct.call(o);
   o.__base.MUiStyle.construct.call(o);
   o.__base.MUiSize.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
}
function FUiControl_topControl(c){
   var r = this;
   if(c){
      while(r._parent){
         if(RClass.isClass(r._parent, c)){
            return r._parent;
         }
         r = r._parent;
      }
      if(!RClass.isClass(r, c)){
         return null;
      }
   }else{
      while(r._parent){
         if(!RClass.isClass(r._parent, FUiControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
function FUiControl_panel(p){
   var o = this;
   switch(p){
      case EPanel.Parent:
         return o._hParent;
      case EPanel.Container:
      case EPanel.Size:
         return o._hPanel;
   }
   return null;
}
function FUiControl_wrapCd(){
   return this._wrapCd;
}
function FUiControl_setWrapCd(wrapCd){
   this._wrapCd = wrapCd;
}
function FUiControl_isVisible(){
   return this._statusVisible;
}
function FUiControl_setVisible(p){
   var o = this;
   o._statusVisible = p;
   var h = o.panel(EPanel.Container);
   if(h){
      RHtml.visibleSet(h, p);
   }
}
function FUiControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
function FUiControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
function FUiControl_isEnable(){
   return this._statusEnable;
}
function FUiControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
function FUiControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
function FUiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
function FUiControl_attachEvent(n, h, m, u){
   return RUiControl.attachEvent(this, n, h, m, u);
}
function FUiControl_linkEvent(t, n, h, m){
   return RUiControl.linkEvent(this, t, n, h, m);
}
function FUiControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
function FUiControl_psMode(p){
   var o = this;
   var e = new TEventProcess(o, 'oeMode', FUiControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
function FUiControl_psDesign(m, f){
   var o = this;
   RConsole.find(FDesignConsole).setFlag(m, f, o);
   var e = new TEventProcess(o, 'oeDesign', MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
function FUiControl_psEnable(v){
   var o = this;
   var e = new TEventProcess(o, 'oeEnable', FUiControl)
   e.enable = v;
   o.process(e);
   e.dispose();
}
function FUiControl_psVisible(v){
   var o = this;
   var e = new TEventProcess(o, 'oeVisible', FUiControl);
   e.visible = v;
   o.process(e);
   e.dispose();
}
function FUiControl_psResize(){
   var o = this;
   var e = new TEventProcess(o, 'oeResize', FUiControl);
   o.process(e);
   e.dispose();
}
function FUiControl_psRefresh(t){
   var o = this;
   var e = new TEventProcess(o, 'oeRefresh', FUiControl);
   o.process(e);
   e.dispose();
}
function FUiControl_isBuild(){
   return this._statusBuild;
}
function FUiControl_build(p){
   var o = this;
   if(o._statusBuild){
      throw new TError(o, 'Current control is already builded.');
   }
   var d = null;
   if(p.createElement){
      d = p;
   }else if(p.ownerDocument && p.ownerDocument.createElement){
      d = p.ownerDocument;
   }else if(p.hDocument){
      d = p.hDocument;
   }else{
      throw new TError("Build document is invalid. (document={1})", p);
   }
   var a = new SArguments();
   a.owner = o;
   a.hDocument = d;
   o.onBuild(a);
   a.owner = null;
   a.hDocument = null;
   RObject.free(a);
   o._statusBuild = true;
}
function FUiControl_builded(p){
   var o = this;
   if(!o._statusBuild){
      throw new TError(o, 'Current control is not build.');
   }
   if(o._statusBuilded){
      throw new TError(o, 'Current control is already builded.');
   }
   o.onBuilded(p);
   o._statusBuilded = true;
}
function FUiControl_refresh(){
   var o = this;
   if(!o._statusBuild){
      throw new TError(o, 'Current control is not build.');
   }
}
function FUiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}
function FUiControl_dispose(){
   var o = this;
   o._disable = null;
   o._wrapCd = null;
   o._hint = null;
   o._styleContainer = null;
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   o._hParent = null;
   o._hPanel = RHtml.free(o._hPanel);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiSize.dispose.call(o);
   o.__base.MUiStyle.dispose.call(o);
   o.__base.FUiComponent.dispose.call(o);
}
function FUiWorkspace(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
   o._frames      = null;
   o._hContainer  = null;
   o.onBuildPanel = FUiWorkspace_onBuildPanel;
   o.appendChild  = FUiWorkspace_appendChild;
   return o;
}
function FUiWorkspace_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createFragment(event);
}
function FUiWorkspace_appendChild(control){
   var o = this;
   if(RClass.isClass(control, FUiFrameSet)){
      o._hPanel.appendChild(control._hPanel);
   }else{
      throw new TError(o, 'Unknown child type.');
   }
}
var RUiControl = new function RUiControl(){
   var o = this;
   o.PREFIX             = 'FUi';
   o.newInstance        = RUiControl_newInstance;
   o.attachEvent        = RUiControl_attachEvent;
   o.innerCreate        = RUiControl_innerCreate;
   o.create             = RUiControl_create;
   o.innerbuild         = RUiControl_innerbuild;
   o.build              = RUiControl_build;
   o.setStyleScroll     = RUiControl_setStyleScroll;
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
   o.linkEvent          = RUiControl_linkEvent;
   o.find               = RUiControl_find;
   o.fromNode           = RUiControl_fromNode;
   o.fromXml            = RUiControl_fromXml;
   o.toNode             = RUiControl_toNode;
   o.toXml              = RUiControl_toXml;
   o.store              = RUiControl_store;
   o.htmlControl        = RUiControl_htmlControl;
   o.psDesign           = RUiControl_psDesign;
   o.psMode             = RUiControl_psMode;
   o.isInfo             = RUiControl_isInfo;
   o.isGroup            = RUiControl_isGroup;
   return o;
}
function RUiControl_newInstance(p){
   var o = this;
   var r = null;
   if(p){
      var n = null
      var tn = null;
      if(p.constructor == String){
         if(!RString.startsWith(p, o.PREFIX)){
            n = o.PREFIX + p;
         }
      }else if(p.constructor == TXmlNode){
         n = p.get('type');
         if(RString.isEmpty(n)){
            n = p.name();
            if(!RString.startsWith(n, o.PREFIX)){
               n = o.PREFIX + n;
            }
         }else{
            tn = n;
         }
      }else{
         throw new TError(o, 'Unknown parameter. (name={p})', p);
      }
      r = RClass.create(n);
      if(tn){
         r.__typed = true;
      }
   }
   if(r == null){
      throw new TError(o, 'Create instance failure. (name={p})', p);
   }
   return r;
}
function RUiControl_attachEvent(c, n, h, m, u){
   var o = this;
   var e = null;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      e = a.create();
      e.annotation = a;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = RUiEvent.onProcess;
      RUiEvent.find(h).push(a.linker(), e);
      RHtml.linkSet(h, '_plink', c);
      a.bind(h, u);
   }
   return e;
}
function RUiControl_innerCreate(pc, px, pa){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px)
   }
   if(RClass.isClass(pc, MUiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n, pa);
         if(c){
            o.innerCreate(c, n, pa);
            pc.push(c);
         }
      }
   }
}
function RUiControl_create(pc, px, pa){
   var o = this;
   var c = null;
   if(pc){
      c = pc;
   }else{
      c = RUiControl.newInstance(px.name());
   }
   o.innerCreate(c, px, pa);
   return c;
}
function RUiControl_innerbuild(pr, pc, px, pa, ph){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px);
   }
   var l = px.get('linker');
   if(l && pr){
      pr[l] = pc;
   }
   if(RClass.isClass(pc, FUiControl)){
      if(!pc.isBuild()){
         pc.build(ph);
      }else{
         pc.refresh();
      }
   }
   if(pc.__typed){
      pr = pc;
   }
   if(RClass.isClass(pc, MUiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n);
         if(!c){
            throw new TError('Invalid create child.');
         }
         o.innerbuild(pr, c, n, pa, ph);
         pc.push(c);
      }
   }
   if(RClass.isClass(pc, FUiControl)){
      pc.builded(ph);
   }
}
function RUiControl_build(c, x, a, h){
   var o = this;
   if(!c){
      c = RUiControl.newInstance(x);
   }
   o.innerbuild(c, c, x, a, h);
   return c;
}
function RUiControl_setStyleScroll(h, c){
   var s = h.style;
   switch(c){
      case EUiScroll.None:
         s.overflowX = '';
         s.overflowY = '';
         break;
      case EUiScroll.Horizontal:
         s.overflowX = 'scroll';
         break;
      case EUiScroll.HorizontalAuto:
         s.overflowX = 'auto';
         break;
      case EUiScroll.Vertical:
         s.overflowY = 'scroll';
         break;
      case EUiScroll.VerticalAuto:
         s.overflowY = 'auto';
         break;
      case EUiScroll.Both:
         s.overflow = 'scroll';
         break;
      case EUiScroll.BothAuto:
         s.overflow = 'auto';
         break;
      default:
         throw new TError(o, 'Unknown scroll type. (scroll_cd={1})', c);
   }
}
function RUiControl_linkEvent(tc, sc, n, h, m){
   var o = this;
   var p = tc[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = tc;
      e.sender = sc;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = RUiEvent.onProcess;
      RUiEvent.find(h).push(e.type, e);
      h[e.handle] = RUiEvent.ohEvent;
      RHtml.linkSet(h, '_plink', tc);
      return e;
   }
}
function RUiControl_find(c){
   var o = this;
   var r = null;
   if(c){
      if(c.constructor == Function){
         c = RMethod.name(c);
      }else if(c.constructor != String){
         RMsg.fatal(o, null, 'Param invlid (class={0})', c);
      }
      var cs = o.controls;
      var r = cs.get(c);
      if(!r){
         r = new TControl(c);
         cs.set(c, r);
      }
   }
   return r;
}
function RUiControl_fromNode(x, h){
   if(x){
      return this.create(x, h);
   }
}
function RUiControl_fromXml(xml, hPanel, mode){
   var c = null;
   var x = RXml.makeNode(xml);
   if(x){
      c = this.create(x, hPanel, mode);
   }
   return c;
}
function RUiControl_toNode(){
}
function RUiControl_toXml(){
}
function RUiControl_store(o, type){
   var x = new TNode();
   x.name = RClass.name(o).substr(1);
   if(RClass.isClass(o, FContainer)){
      o.storeConfig(x);
   }else{
      o.saveConfig(x);
   }
   return x;
}
function RUiControl_htmlControl(e, c){
   if(c){
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o && RClass.isClass(o, c)){
            return o;
         }
         e = e.parentElement;
      }
   }else{
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o){
            return o;
         }
         e = e.parentElement;
      }
   }
   return null;
}
function RUiControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
function RUiControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}
function RUiControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}
function RUiControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
var RUiEvent = new function(){
   var o = this;
   o._objects  = new Array();
   o.ohEvent   = RUiEvent_ohEvent;
   o.onProcess = RUiEvent_onProcess;
   o.find      = RUiEvent_find;
   o.process   = RUiEvent_process;
   o.release   = RUiEvent_release;
   o.current   = 0;
   o.events    = new Array();
   o.nvl       = RUiEvent_nvl;
   o.alloc     = RUiEvent_alloc;
   o.free      = RUiEvent_free;
   return o;
}
function RUiEvent_ohEvent(e){
   RUiEvent.process(this, e ? e : window.event);
}
function RUiEvent_onProcess(e){
   var e = this;
   var ea = e.annotation;
   if(ea._logger){
      RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   }
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
}
function RUiEvent_find(p){
   var u = RHtml.uid(p);
   var es = this._objects;
   var e = es[u];
   if(e == null){
      e = es[u] = new THtmlEvent();
      e.linker = p;
   }
   return e;
}
function RUiEvent_process(hs, he){
   var o = this;
   if(!hs || !he){
      return;
   }
   var eo = o.find(hs);
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var ec = es.length;
         for(var i = 0; i < ec; i++){
            var e = es[i];
            var ea = e.annotation;
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = RHtml.eventSource(he);
            e.sender = e.hSender._plinker;
            e.hSource = hs;
            ea.attach(e, he);
            if(e.ohProcess){
               if(ea._logger){
                  RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
               e.ohProcess.call(e.source, e);
            }else if(e.onProcess){
               RConsole.find(FUiFrameEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
function RUiEvent_release(){
   var o = this;
   var v = o._objects;
   if(v){
      RMemory.free(v);
      o._objects = null;
   }
}
function RUiEvent_nvl(event, sender, code){
   if(!event){
      event = new TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
function RUiEvent_alloc(s, c){
   var e = null;
   var es = this.events;
   for(var n=0; n<es.length; n++){
      if(!es[n].inUsing){
         e = es[n];
         break;
      }
   }
   if(!e){
      e = es[es.length] = new TEvent();
   }
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
function RUiEvent_free(e){
   e.inUsing = false;
}
var RUiLayer = new function RUiLayer(){
   var o = this;
   o._layers = new Array();
   o.next    = RUiLayer_next;
   o.free    = RUiLayer_free;
   return o;
}
function RUiLayer_next(p){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   o._layers[n] = ++c;
   return c;
}
function RUiLayer_free(p, l){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   --c;
   if(c > n){
      o._layers[n] = c;
   }
   return c;
}
var RUiService = new function RUiService(){
   var o = this;
   o._services = new TDictionary();
   o.url       = RUiService_url;
   o.makeUrl   = RUiService_makeUrl;
   o.parse     = RUiService_parse;
   return o;
}
function RUiService_url(p){
   if(RString.startsWith(p, 'http://')){
      return p;
   }
   if(RString.startsWith(p, '#')){
      return p.substr(1);
   }
   if(!RString.startsWith(p, '/')){
      p = '/' + p;
   }
   return p + '.ws';
}
function RUiService_makeUrl(s, a){
   return this.url(s) + '?action=' + a;
}
function RUiService_parse(p){
   var o = this;
   var s = null;
   var ss = o._services;
   if(p){
      s = ss.get(p);
      if(s == null){
         var ps = p.split('@');
         if(ps.length == 1){
            if(ps[0]){
               s = new SServiceInfo();
               s.service = ps[0];
               s.action = null;
               s.url = o.url(ps[0]);
            }
         }else if(ps.length == 2){
            if(ps[0] && ps[1]){
               s = new SServiceInfo();
               s.service = ps[1];
               s.action = ps[0];
               s.url = o.url(ps[1]) + '?action=' + ps[0];
            }
         }
      }
      if(s == null){
         throw new TError(o, 'Unknown service format. (source={1})', p);
      }
      ss.set(p, s);
   }
   return s;
}
