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
function MUiMargin_setMargin(l, t, r, b){
   var o = this;
   var p = o._margin;
   var h = o.panel(EPanel.Container);
   if(l != null){
      p.left = l;
      if(h){
         h.style.marginLeft = (l == 0) ? null : l + 'px';
      }
   }
   if(t != null){
      p.top = t;
      if(h){
         h.style.marginTop = (t == 0) ? null : t + 'px';
      }
   }
   if(r != null){
      p.right= r;
      if(h){
         h.style.marginRight = (r == 0) ? null : r + 'px';
      }
   }
   if(b != null){
      p.bottom = b;
      if(h){
         h.style.marginBottom = (b == 0) ? null : b + 'px';
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
function MUiPadding_setPadding(l, t, r, b){
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   if(l != null){
      p.left = l;
      if(h){
         h.style.paddingLeft = (l == 0) ? null : l + 'px';
      }
   }
   if(t != null){
      p.top = t;
      if(h){
         h.style.paddingTop = (t == 0) ? null : t + 'px';
      }
   }
   if(r != null){
      p.right= r;
      if(h){
         h.style.paddingRight = (r == 0) ? null : r + 'px';
      }
   }
   if(b != null){
      p.bottom = b;
      if(h){
         h.style.paddingBottom = (b == 0) ? null : b + 'px';
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
   var t = o.panel(EPanel.Size);
   if(x != null){
      o._location.x = x;
      if(t){
         t.style.left = (x == 0) ? null : x + 'px';
      }
   }
   if(y != null){
      o._location.y = y;
      if(t){
         t.style.top = (y == 0) ? null : y + 'px';
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
      if(hPanel){
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
      if(hPanel){
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
function FUiWorkspace_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiWorkspace_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiFrameSet)){
      o._hPanel.appendChild(p._hPanel);
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
function FUiConfirmDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   o._frameName            = 'system.dialog.ConfirmDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FUiConfirmDialog_onBuilded;
   o.onConfirmClick        = FUiConfirmDialog_onConfirmClick;
   o.onCancelClick         = FUiConfirmDialog_onCancelClick;
   o.construct             = FUiConfirmDialog_construct;
   o.setText               = FUiConfirmDialog_setText;
   o.dispose               = FUiConfirmDialog_dispose;
   return o;
}
function FUiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FUiConfirmDialog_onConfirmClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiConfirmDialog_onCancelClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Cancel;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiConfirmDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FUiConfirmDialog_setText(value){
   this._controlText.set(value);
}
function FUiConfirmDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FUiDescribeFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = FUiDescribeFrameConsole_construct;
   o.load           = FUiDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = FUiDescribeFrameConsole_createFromName;
   o.loadNode       = FUiDescribeFrameConsole_loadNode;
   o.loadService    = FUiDescribeFrameConsole_loadService;
   o.nextFormId     = FUiDescribeFrameConsole_nextFormId;
   o.get            = FUiDescribeFrameConsole_get;
   o.find           = FUiDescribeFrameConsole_find;
   o.getLov         = FUiDescribeFrameConsole_getLov;
   o.findLov        = FUiDescribeFrameConsole_findLov;
   o.getEvents      = FUiDescribeFrameConsole_getEvents;
   return o;
}
function FUiDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new TDictionary();
   o.lsnsLoaded = new TListeners();
}
function FUiDescribeFrameConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = RUiService.url(o._service);
   var xresult = RConsole.find(FXmlConsole).send(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
function FUiDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
function FUiDescribeFrameConsole_loadNode(x){
   var o = this;
   var nns = x.root();
   if(nns.hasNode()){
      var nodes = nns.nodes;
      var ct = nodes.count;
      for(var n = 0; n < ct; n++){
         var node = nodes.get(n);
         var fn = node.get('name');
         var tp = node.get('type');
         if(node.hasNode()){
            var nfds = node.nodes;
            for(var k = 0; k < nfds.count; k++){
               var dd = nfds.get(k);
               if(dd.isName('Define')){
                  if(dd.hasNode()){
                     var fds = dd.nodes;
                     for(var m = 0; m < fds.count; m++){
                        var nd = fds.get(m);
                        var mp = o._defines.get(tp);
                        mp.set(fn, nd);
                     }
                  }
               }else if(dd.isName('Events')){
                  o.events.set(fn, dd);
               }
            }
         }
      }
   }
}
function FUiDescribeFrameConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = EForm.Form;
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = RUiService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
function FUiDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
function FUiDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
function FUiDescribeFrameConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(RClass.isMode(ERun.Debug)){
      RMemory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
function FUiDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
function FUiDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
function FUiDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
function FUiDesktopConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._maskVisible     = false;
   o._statusEnable    = true;
   o._loadingVisible  = false;
   o._progressVisible = false;
   o._progressBar     = null;
   o._hMaskPanel      = null;
   o._hLoadingPanel   = null;
   o._hLoadingLabel   = null;
   o.construct        = FUiDesktopConsole_construct;
   o.getMaskPanel     = FUiDesktopConsole_getMaskPanel;
   o.getProgressBar   = FUiDesktopConsole_getProgressBar;
   o.getLoadingPanel  = FUiDesktopConsole_getLoadingPanel;
   o.setMaskVisible   = FUiDesktopConsole_setMaskVisible;
   o.isEnable         = FUiDesktopConsole_isEnable;
   o.enable           = FUiDesktopConsole_enable;
   o.disable          = FUiDesktopConsole_disable;
   o.showLoading      = FUiDesktopConsole_showLoading;
   o.showUploading    = FUiDesktopConsole_showUploading;
   o.showProgress     = FUiDesktopConsole_showProgress;
   o.hide             = FUiDesktopConsole_hide;
   return o;
}
function FUiDesktopConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
function FUiDesktopConsole_getMaskPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   var hPanel = o._hMaskPanel;
   if(!hPanel){
      hPanel = o._hMaskPanel = RBuilder.createTable(hDocument, 'FUiDesktopConsole_MaskPanel');
      hPanel.style.zIndex = 5000;
      var hInnerPanel = o._hMaskInnerPanel = RBuilder.appendTableRowCell(hPanel);
      hInnerPanel.align = 'center';
      hInnerPanel.vAlign = 'middle';
   }
   return hPanel;
}
function FUiDesktopConsole_getLoadingPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   var hPanel = o._hLoadingPanel;
   if(!hPanel){
      hPanel = o._hLoadingPanel = RBuilder.createTable(hDocument);
      var hCell = RBuilder.appendTableRowCell(hPanel);
      var hIcon = o._hLoadingIcon = RBuilder.appendIcon(hCell);
      hIcon.src = RResource.iconPath('control.RWindow_Loading');
      var hCell = o._hLoadingLabel = RBuilder.appendTableRowCell(hPanel);
      hCell.align = 'center';
      hCell.style.color = '#FFFFFF';
   }
   return hPanel;
}
function FUiDesktopConsole_getProgressBar(){
   var o = this;
   var progressBar = o._progressBar;
   if(!progressBar){
      progressBar = o._progressBar = RClass.create(FUiProgressBar);
      progressBar.build(top.RWindow._hDocument);
   }
   return progressBar;
}
function FUiDesktopConsole_setMaskVisible(visible){
   var o = this;
   if(o._maskVisible != visible){
      var hDocument = top.RWindow._hDocument;
      var hBody = hDocument.body;
      var hMaskPanel = o.getMaskPanel();
      if(visible){
         var hStyle = hMaskPanel.style;
         hStyle.left = '0px';
         hStyle.top = '0px';
         hBody.appendChild(hMaskPanel);
      }else{
         hBody.removeChild(hMaskPanel);
      }
   }
   o._maskVisible = visible;
}
function FUiDesktopConsole_isEnable(){
   return this._statusEnable;
}
function FUiDesktopConsole_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
function FUiDesktopConsole_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
function FUiDesktopConsole_showLoading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
function FUiDesktopConsole_showUploading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
function FUiDesktopConsole_showProgress(rate){
   var o = this;
   o.setMaskVisible(true);
   if(!o._progressVisible){
      var hMaskPanel = o.getMaskPanel();
      var progressBar = o.getProgressBar();
      hMaskPanel.appendChild(progressBar._hPanel);
      o._progressVisible = true;
   }
}
function FUiDesktopConsole_hide(){
   var o = this;
   if(o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      o._hMaskInnerPanel.removeChild(hLoadingPanel);
      o._loadingVisible  = false;
   }
   o.setMaskVisible(false);
}
function FUiEditorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = FUiEditorConsole_construct;
   o.makeName     = FUiEditorConsole_makeName;
   o.enter        = FUiEditorConsole_enter;
   o.leave        = FUiEditorConsole_leave;
   o.focus        = FUiEditorConsole_focus;
   o.blur         = FUiEditorConsole_blur;
   o.lost         = FUiEditorConsole_lost;
   return o;
}
function FUiEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new TDictionary();
}
function FUiEditorConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}
function FUiEditorConsole_enter(editable, cls){
   var name = RClass.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = RClass.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
function FUiEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = RObject.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {1}', RClass.dump(editor));
   }
}
function FUiEditorConsole_focus(c, n, l){
   var o = this;
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = RClass.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   RLogger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
   e.reset();
   if(RClass.isClass(e, FUiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}
function FUiEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      RLogger.debug(o, 'Blur editor {1}', RClass.dump(editor));
      editor = RObject.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}
function FUiEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
function FUiEnvironmentConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope       = EScope.Local;
   o.environment = null;
   o.connect     = FUiEnvironmentConsole_connect;
   o.build       = FUiEnvironmentConsole_build;
   o.buildValue  = FUiEnvironmentConsole_buildValue;
   o.load        = FUiEnvironmentConsole_load;
   o.xml         = FUiEnvironmentConsole_xml;
   return o;
}
function FUiEnvironmentConsole_connect(){
}
function FUiEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
function FUiEnvironmentConsole_buildValue(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var env = RHtml.get('_environment');
      if(env){
         env.value = this.environment.xml();
      }
   }
}
function FUiEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}
function FUiEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
function FUiFocusConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope              = EScope.Page;
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   o._hoverContainer    = null;
   o._hoverControl      = null;
   o._focusControl      = null;
   o._blurControl       = null;
   o._activeControl     = null;
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   o.onMouseDown        = FUiFocusConsole_onMouseDown;
   o.onMouseWheel       = FUiFocusConsole_onMouseWheel;
   o.construct          = FUiFocusConsole_construct;
   o.enter              = FUiFocusConsole_enter;
   o.leave              = FUiFocusConsole_leave;
   o.isFocus            = FUiFocusConsole_isFocus;
   o.focus              = FUiFocusConsole_focus;
   o.blur               = FUiFocusConsole_blur;
   o.findClass          = FUiFocusConsole_findClass;
   o.focusClass         = FUiFocusConsole_focusClass;
   o.focusHtml          = FUiFocusConsole_focusHtml;
   o.lockBlur           = FUiFocusConsole_lockBlur;
   o.unlockBlur         = FUiFocusConsole_unlockBlur;
   o.storeFocus         = FUiFocusConsole_storeFocus;
   o.restoreFocus       = FUiFocusConsole_restoreFocus;
   o.dispose            = FUiFocusConsole_dispose;
   return o;
}
function FUiFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
function FUiFocusConsole_onMouseWheel(s, e){
   var o = this;
}
function FUiFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new TListeners();
   o.lsnsBlur = new TListeners();
   o.lsnsFocusClass = new TListeners();
   RLogger.info(o, 'Add listener for window mouse down and wheel.');
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FUiFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MUiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
function FUiFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
function FUiFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
function FUiFocusConsole_focus(c, e){
   var o = this;
   if(!RClass.isClass(c, MUiFocus)){
      return;
   }
   var f = o._focusControl;
   if(f == c){
      return;
   }
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         o.lsnsBlur.process(f);
      }
   }
   if(o._focusAble){
      RLogger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      o.lsnsFocus.process(c);
   }
}
function FUiFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   if(bc != c && RClass.isClass(c, MUiFocus)){
      RLogger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   if(fc){
      RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}
function FUiFocusConsole_findClass(c){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   var p = o._activeControl;
   if(RClass.isClass(p, FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}
function FUiFocusConsole_focusClass(c, p){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      RLogger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
function FUiFocusConsole_focusHtml(p){
   var o = this;
   var c = RHtml.searchLinker(p, FUiControl);
   RLogger.debug(o, 'Focus html control. (control={1}, element={2})', RClass.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}
function FUiFocusConsole_lockBlur(){
   this._blurAble = false;
}
function FUiFocusConsole_unlockBlur(){
   this._blurAble = true;
}
function FUiFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
function FUiFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
function FUiFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
function FUiFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._frames          = null;
   o.construct        = FUiFrameConsole_construct;
   o.create           = FUiFrameConsole_create;
   o.find             = FUiFrameConsole_find;
   o.findByClass      = FUiFrameConsole_findByClass;
   o.get              = FUiFrameConsole_get;
   return o;
}
function FUiFrameConsole_construct(){
   var o = this;
   o._frames = new TMap();
}
function FUiFrameConsole_create(c, n){
   var o = this;
   var dc = RConsole.find(FUiDescribeFrameConsole);
   var x = dc.load(n);
   var f = RUiControl.build(null, x, null, c._hPanel);
   return f;
}
function FUiFrameConsole_find(n){
   return this._frames.get(n);
}
function FUiFrameConsole_findByClass(control, clazz){
   var o = this;
   var className = RClass.name(clazz);
   var frames = o._frames;
   var instance = frames.get(className);
   if(!instance){
      instance = RClass.create(clazz);
      instance.buildDefine(control._hPanel);
      frames.set(className, instance);
   }
   return instance;
}
function FUiFrameConsole_get(c, n, h){
   var o = this;
   var fs = o._frames;
   var f = fs.get(n);
   if(!f){
      f = o.create(c, n);
      if(h){
         f.setPanel(h);
      }
      fs.set(n, f);
   }
   return f;
}
function FUiFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
function FUiFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!RConsole.find(FMessageConsole).checkResult(m)){
         return;
      }
   }
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   g.invoke();
}
function FUiFrameConsole_process(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = RService.url(RString.nvl(g.url, 'logic.webform'));
   e.action = EDataAction.Process;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FUiFrameConsole_loadEvents(cfg){
}
function FUiFrameConsole_processEvent(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(RClass.isClass(se, FControl)){
      var p = se.topControl();
      if(p){
         var s = RString.nvl(e.name, e.handle) + '@' + se.name + '@' + p.name;
         var c = es.get(s);
         var eo = e.caller ? e.caller : se;
         if(c && c.code){
            if(c.event){
               c.event.call(eo, eo, e);
            }else{
               c.event = new Function('o', 'e', c.code);
                  c.event.call(eo, eo, e);
            }
         }
      }
   }
}
function FUiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
function FUiFrameConsole_dispose(){
   var o = this;
   RMemory.free(o._frames);
   RMemory.free(o._formIds);
   RMemory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
function FUiFrameEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new TAttributes();
   o._events    = new TObjects();
   o._listeners = new TAttributes();
   o.onProcess  = FUiFrameEventConsole_onProcess;
   o.construct  = FUiFrameEventConsole_construct;
   o.register   = FUiFrameEventConsole_register;
   o.push       = FUiFrameEventConsole_push;
   o.clear      = FUiFrameEventConsole_clear;
   return o;
}
function FUiFrameEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   var ec = es.count();
   if(ec > 0){
      while(true){
         var has = false;
         for(var n = 0; n < ec; n++){
            var e = es.get(n);
            if(e){
               has = true;
               e.process();
               var ls = o._listeners.get(RMethod.name(e));
               if(ls){
                  ls.process(e);
               }
               es.set(n, null)
            }
         }
         if(!has){
            break;
         }
      }
      es.clear();
   }
}
function FUiFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}
function FUiFrameEventConsole_register(po, pc){
   this._events.push(new TEvent(po, null, pc));
}
function FUiFrameEventConsole_push(e){
   var o = this;
   var n = RClass.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = RBoolean.isTrue(o._allows.get(n));
      }
      if(a){
         var es = o._events;
         var c = es.count();
         for(var i = 0; i < c; i++){
            if(es.get(n) == e){
               es.set(n, null);
            }
         }
         es.push(e);
      }
   }
}
function FUiFrameEventConsole_clear(){
   this._events.clear();
}
function FUiFrameEventConsole_add(owner, proc){
   this._events.push(new TEvent(owner, null, proc));
}
function FUiFrameEventConsole_allowEvent(c){
   this._allows.set(RMethod.name(c), EBool.True);
}
function FUiFrameEventConsole_skipEvent(c){
   this._allows.set(RMethod.name(c), EBool.False);
}
function FUiFrameEventConsole_allowAll(){
   this._allow = true;
}
function FUiFrameEventConsole_skipAll(){
   this._allow = false;
}
function FUiFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
function FUiInfoDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   o._frameName            = 'system.dialog.InfoDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FUiInfoDialog_onBuilded;
   o.onConfirmClick        = FUiInfoDialog_onConfirmClick;
   o.construct             = FUiInfoDialog_construct;
   o.setText               = FUiInfoDialog_setText;
   o.dispose               = FUiInfoDialog_dispose;
   return o;
}
function FUiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
}
function FUiInfoDialog_onConfirmClick(event){
   var o = this;
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
function FUiInfoDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FUiInfoDialog_setText(value){
   this._controlText.set(value);
}
function FUiInfoDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FUiKeyConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd        = EScope.Local;
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   o.onKeyDown       = FUiKeyConsole_onKeyDown;
   o.construct       = FUiKeyConsole_construct;
   o.enable          = FUiKeyConsole_enable;
   o.disable         = FUiKeyConsole_disable;
   o.enableRegister  = FUiKeyConsole_enableRegister;
   o.disableRegister = FUiKeyConsole_disableRegister;
   o.register        = FUiKeyConsole_register;
   return o;
}
function FUiKeyConsole_onKeyDown(e){
   var o = this;
   var k = REnum.tryDecode(EKeyCode, e.keyCode);
   if(k && o._enable){
      var ls = o._listeners[k];
      if(ls){
         ls.process(o, e);
         e.keyCode = null;
         e.returnValue = false;
      }
   }
   if(k && o._disableKeys[k]){
      e.keyCode = null;
      e.returnValue = false;
   }
}
function FUiKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
function FUiKeyConsole_enable(){
   this._enable = true;
}
function FUiKeyConsole_disable(){
   this._enable = false;
}
function FUiKeyConsole_enableRegister(){
   this._enableRegister = true;
}
function FUiKeyConsole_disableRegister(){
   this._enableRegister = false;
}
function FUiKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      if(RInteger.isInteger(k)){
         k = REnum.decode(EKeyCode, k);
      }
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new TListeners();
      }
      s.clear();
      s.register(w, p);
   }
}
function FUiMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MUiStyle);
   o._scopeCd       = EScope.Global;
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   o.showInfo       = FUiMessageConsole_showInfo;
   o.showConfirm    = FUiMessageConsole_showConfirm;
   o.popup          = FUiMessageConsole_popup;
   o.close          = FUiMessageConsole_close;
   o.parse          = FUiMessageConsole_parse;
   o.check          = FUiMessageConsole_check;
   return o;
}
function FUiMessageConsole_showInfo(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}
function FUiMessageConsole_showConfirm(text){
   var dialog = RConsole.find(FUiWindowConsole).find(FUiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(EUiPosition.Center);
   return dialog;
}
function FUiMessageConsole_popup(g){
   var o = this;
   var w = o._messageWindow;
   if(!w){
      w = o._messageWindow = RControl.create(FUiMessageWindow);
   }
   w.loadMessages(g);
   w.show();
}
function FUiMessageConsole_close(){
   RWindow.setEnable(true);
}
function FUiMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}
function FUiMessageConsole_check(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(EMessage.Fatal);
      if(m && m.attrType == "session.timeout"){
         var ss = RString.splitTwo(m.redirect, '@');
         var s = RContext.context(ss[1] + '?do='+ss[0]);
         fmMain.action = s;
         fmMain.target = '_self';
         fmMain.submit();
      }else{
         o.popupMessage(g);
      }
      return false;
   }
   return true;
}
function FUiMessageDialog(o){
   o = RClass.inherits(this, o, FUiWindow);
   o._styleMsgPanel     = RClass.register(o, new AStyle('_styleMsgPanel'));
   o._styleButtonPanel  = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._styleItmeForm     = RClass.register(o, new AStyle('_styleItmeForm'));
   o._styleItemTitle    = RClass.register(o, new AStyle('_styleItemTitle'));
   o._styleItemBodyForm = RClass.register(o, new AStyle('_styleItemBodyForm'));
   o._styleRowItem      = RClass.register(o, new AStyle('_styleRowItem'));
   o._styleDescForm     = RClass.register(o, new AStyle('_styleDescForm'));
   o._styleDescTitle    = RClass.register(o, new AStyle('_styleDescTitle'));
   o._styleDescBody     = RClass.register(o, new AStyle('_styleDescBody'));
   o._type              = null;
   o._isDialog          = false;
   o._titleBlur         = false;
   o._messageArg        = null;
   o._hMessagePanel     = null;
   o._hMessages         = null;
   o._hDescription      = null;
   o._hButtonPanel      = null;
   o._hBlank            = null;
   o.onBuild            = FUiMessageDialog_onBuild;
   o.onItemOver         = RClass.register(o, new AEventMouseOver('onItemOver'), FUiMessageDialog_onItemOver);
   o.onItemClick        = RClass.register(o, new AEventClick('onItemClick'), FUiMessageDialog_onItemClick);
   o.onDescClick        = RClass.register(o, new AEventClick('onDescClick'), FUiMessageDialog_onDescClick);
   o.onBuildMessages    = FUiMessageDialog_onBuildMessages;
   o.onBuildButtons     = FUiMessageDialog_onBuildButtons;
   o.onOk               = FUiMessageDialog_onOk;
   o.onCancel           = FUiMessageDialog_onCancel;
   o.onClose            = FUiMessageDialog_onClose;
   o.loadMessages       = FUiMessageDialog_loadMessages;
   o.show               = FUiMessageDialog_show;
   o.hide               = FUiMessageDialog_hide;
   o.dispose            = FUiMessageDialog_dispose;
   return o;
}
function FUiMessageDialog_onBuild(event){
   var o = this;
   o.__base.FUiWindow.oeBuild.call(o, e);
   o.setIcon('Icon');
   var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.vAlign = "top";
   hTab.width = '100%';
   hTab.height = '100%';
   var h1 = o.hTitlePanel = hTab.insertRow().insertCell();
   h1.style.height = "100%";
   h1.style.vAlign = "top";
   var h2 = o.hMsgPanel = hTab.insertRow().insertCell();
   h2.style.height = "100%";
   o.onBuildMessages();
   var h0 = o._hButtonPanel = hTab.insertRow().insertCell();
   h0.style.align = 'right';
   o.onBuildButtons();
   h0.height = 20;
   RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   return r;
}
function FUiMessageDialog_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
}
function FUiMessageDialog_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
}
function FUiMessageDialog_onDescClick(e){
   var o = this;
}
function FUiMessageDialog_onBuildMessages(){
   var o = this;
   if(!o._type){
      var hTab1 = o.hItmeForm = RBuilder.appendTable(o.hTitlePanel);
      hTab1.style.height = "100%";
      hTab1.style.width = "100%";
      hTab1.style.vAlign = "top";
      var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
      hItemTitle.height = 25;
      var h = RBuilder.appendTable(hItemTitle);
      h.height = '100%';
      h.width = '100%';
      h.style.backgroundColor = "#F5F5F5";
      var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = '20';
      var hTitleIcon = RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ RContext.get('FUiMessageDialog:MessageContext');
      var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
      hItemBody.height = 100;
      o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
      hItemBody.style.padding = '5';
      hItemBody.vAlign = "top";
      var hDiv = RBuilder.appendDiv(hItemBody);
      hDiv.style.height = '100px';
      hDiv.style.overflow = "auto";
      var hItemBodyForm = o.hItemBodyForm = RBuilder.appendTable(hDiv);
      hItemBodyForm.style.border = '2px solid #FFFFFF';
      hItemBodyForm.width = "100%";
      hItemBodyForm.style.vAlign = "top";
      var hTab2 = o.hDescForm = RBuilder.appendTable(o.hMsgPanel);
      hTab2.style.tableLayout = "fixed";
      hTab2.style.border='2px solid #EEEDED';
      hTab2.style.borderTopWidth = 0;
   }
   o.hItmeForm.style.display = 'none';
   o.hDescForm.style.display = 'none';
   o.hMsgPanel.style.height = '100%';
   if(EMessage.Fatal == o._type || EMessage.Error == o._type){
      o.hItmeForm.style.display = 'block';
      o.hDescForm.style.display = 'block';
   }else{
      o.hItmeForm.style.display = 'block';
   }
}
function FUiMessageDialog_onBuildButtons(t){
   var o = this;
   if(!o._type){
      var hBtnTab = RBuilder.appendTable(o._hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      var hc = o._hBlank = hRow.insertCell();
      hc.width='72%';
      var b = o.btnOk = RClass.create(FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      var b = o.btnCancel = RClass.create(FButton);
      b.icon = 'tool.cancel';
      b.label = RContext.get('FToolButton:cancel');
      b.width = '100%';
      b.lsnsClick.register(o, o.onCancel);
      var hcc = hRow.insertCell();
      hcc.width='15%';
      b.psBuild(hcc);
   }
   o.btnOk.hPanel.style.display = "none";
   o.btnCancel.hPanel.style.display = "none";
   if(EMessage.Warn == o._type){
      o.btnOk.hPanel.style.display = "block";
      o.btnCancel.hPanel.style.display = "block";
      o._hBlank.width = '72%';
   }else{
      o.btnOk.hPanel.style.display = "block";
      o._hBlank.width = '87%';
   }
}
function FUiMessageDialog_onOk(){
   var o = this;
   var g = o._messageArg;
   var cg = g.argument;
   var type = o.msgs.get(0)._type;
   if(EMessage.Warn == type){
      if(cg){
         cg.checked = EBoolean.True;
         if('process' == cg.actionType){
            RConsole.find(FFormConsole).process(cg);
         }else if('update' == cg.actionType){
            RConsole.find(FDatasetConsole).update(cg);
         }
      }
   }
   if(type == EMessage.Info){
      if(g.invokeCaller){
         g.invokeParam.messageChecked = true;
         g.invokeCaller.invoke(g.invokeParam);
      }
   }
   o.hide();
}
function FUiMessageDialog_onCancel(){
   this.hide();
}
function FUiMessageDialog_onClose(){
   this.hide();
}
function FUiMessageDialog_loadMessages(g){
   var o = this;
   o._messageArg = g;
   var ms = g.messages;
   o._type = ms._type();
   o.onBuildButtons();
   o.onBuildMessages();
   RHtml.clear(o.hItemBodyForm);
   RHtml.clear(o.hDescDiv);
   var first = true;
   var msgs = o.msgs = ms.items;
   var msgType = EMessage.Info;
   for(var n=0; n<msgs.count; n++){
      var msg = msgs.get(n);
      var m = msg.message;
      var d = msg.description;
      var t = msg._type;
      var hr = o.hItemBodyForm.insertRow();
      hr.height = 12;
      var hc1 = hr.insertCell();
      hc1.width = 20;
      var hIcon =  RBuilder.appendIcon(hc1, null, n, 16, 16);
      if(EMessage.Error == t){
    	 o.setIcon('TitleError');
         hIcon.src = o.styleIconPath('ItemError');
         msgType = EMessage.Error;
      }else if(EMessage.Warn == t){
    	 o.setIcon('TitleWarn');
         hIcon.src = o.styleIconPath('ItemWarn');
         msgType = EMessage.Warn;
      }else if(EMessage.Info == t){
    	 o.setIcon('TitleInfo');
         msgType = EMessage.Info;
         hIcon.src = o.styleIconPath('ItemInfo');
      }else if(EMessage.Fatal == t){
         msgType = EMessage.Fatal;
         hIcon.src = o.styleIconPath('ItemError');
      }
      var hc2 = hr.insertCell();
      hc2.style.textOverflow = 'ellipsis';
      hc2.style.overflow = 'hidden';
      hc2.innerText = ' ' + m;
      hc2.style.cursor = "hand";
      o.attachEvent('onItemClick', hr);
      o.attachEvent('onItemOver', hr);
      if(first){
         first = false;
      }
   }
   if(EMessage.Error == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Fatal'));
   }
}
function FUiMessageDialog_show(){
   var o = this;
   o.__base.FUiWindow.show.call(o);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
function FUiMessageDialog_hide(){
   var o = this;
   o.__base.FUiWindow.hide.call(o);
   var f = o._messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   RWindow.setEnable(true);
}
function FUiMessageDialog_dispose(){
   var o = this;
   o.__base.FUiWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o._hButtonPanel = null;
}
function FUiPopupConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._activeControl = null;
   o.onMouseDown    = FUiPopupConsole_onMouseDown;
   o.onMouseWheel   = FUiPopupConsole_onMouseWheel;
   o.construct      = FUiPopupConsole_construct;
   o.show           = FUiPopupConsole_show;
   o.hide           = FUiPopupConsole_hide;
   o.dispose        = FUiPopupConsole_dispose;
   return o;
}
function FUiPopupConsole_onMouseDown(p){
   this.hide();
}
function FUiPopupConsole_onMouseWheel(s, e){
   this.hide();
}
function FUiPopupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   RLogger.info(o, 'Add listener for control popup.');
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FUiPopupConsole_show(control){
   var o = this;
   o.hide();
   if(RClass.isClass(control, MUiPopup)){
      o._activeControl = control;
   }
}
function FUiPopupConsole_hide(control){
   var o = this;
   if(o._activeControl){
      var opener = o._activeControl.opener();
      opener.drop(false);
   }
   o._activeControl = null;
}
function FUiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}
function FUiResultConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope          = EScope.Page;
   o.executeCommand = FUiResultConsole_executeCommand;
   o.checkService   = FUiResultConsole_checkService;
   return o;
}
function FUiResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var uuid = command.get('uuid');
         if(uuid){
            var fn = tv.findByUuid(uuid);
            if(fn){
               tv.reloadNode(fn);
            }else{
               return alert("Can't find tree node. (uuid="+uuid+")");
            }
         }else{
            tv.reloadNode();
         }
      }
   }else if(EResultCommand.TreeParentRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
function FUiResultConsole_checkService(config){
   var o = this;
   if(config){
      if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(config))){
         return false;
      }
      var cmdsNode = config.find('Commands');
      if(cmdsNode && cmdsNode.nodes && cmdsNode.nodes.count){
         for(var n=0; n<cmdsNode.nodes.count; n++){
            var node = cmdsNode.node(n);
            if(node.isName('Command')){
               o.executeCommand(node);
            }
         }
      }
      RConsole.find(FFocusConsole).restoreFocus();
   }
   return true;
}
function FUiWindowConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._activeWindow = null;
   o._windows      = null;
   o.construct    = FUiWindowConsole_construct;
   o.create       = FUiWindowConsole_create;
   o.find         = FUiWindowConsole_find;
   return this;
}
function FUiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._windows = new TDictionary();
}
function FUiWindowConsole_create(clazz){
   var o = this;
   var instance = RClass.create(clazz);
   instance.buildDefine(RWindow._hDocument);
   return instance;
}
function FUiWindowConsole_find(clazz){
   var o = this;
   var name = RClass.name(clazz);
   var find = o._windows.get(name);
   if(find){
      return find;
   }
   var instance = o.create(clazz);
   o._windows.set(name, instance);
   return instance;
}
function FUiWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);
      var cnn = new TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);
      doc.root();
   }
   if(!config){
      return ILogger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}
function FUiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
function FUiWindowConsole_clear(){
   this.focusWinCtl = null;
   this._activeWindow = null;
   this.activeForm = null;
   this.activeControl = null;
   this.m_oDefinePool = new FList();
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      this.windowList.value(n).release();
   }
   this.windowList = new FList();
   IEngine.process(this, this.EVENT_CLOSEALL);
}
function FUiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
function FUiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
function FUiWindowConsole_restore(){
   var nSize = this.windowList.size();
   this.hideAll(null, true);
   for(var n=0; n<nSize; n++){
      var oWin = this.windowList.value(n);
      if(oWin.maxFlag){
         this.windowList.value(n).restore();
      }
   }
   this.maxFlag = false;
}
function FUiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
function FUiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
function FUiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
function FUiWindowConsole_saveDefine(oWinNode, oClientWindow){
   if(oClientWindow){this.clientWindow.document.body.disabled = true;}
   if(!oWinNode){
      return LoggerUtil.fatal(this, 'saveDefine', 'Window node is null.');
   }
   var sFullName = oWinNode.attribute('full_name');
   if(!sFullName){
      return ILogger.fatal(this, 'saveDefine', 'Window full name is null.');
   }
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode('Action');
   oActNode.setAttribute('name', 'define.save');
   oDoc.rootNode.push(oWinNode);
   var oConnect = new FXMLConnect(SystemManager.serviceURL('window'), oDoc);
   oConnect.clientWindow = oClientWindow;
   oConnect.onload = this.onSaveDefineAfter;
   oConnect.send();
}
function FUiWindowConsole_onEventMousedown(oCWin){
}
function FUiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
function FUiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
function FUiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
function FUiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
function FUiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
function FUiWindowConsole_onEventRelease(oCWin){
   if(oCWin){
      var oSubWin = null;
      var oRemoves = new Array();
      var nSize = this.windowList.size();
      for(var n=0; n<nSize; n++){
         oSubWin = this.windowList.value(n);
         if(oSubWin.clientWindow == oCWin){
            if(oSubWin == MoveManager.focusBorder){
               MoveManager.focus(null);
            }
            oRemoves.push(oSubWin);
         }
      }
      for(var n=0; n<oRemoves.length; n++){
         this.windowList.removeValue(oRemoves[n]);
      }
   }else{
      this.windowList.clear();
      MoveManager.focus(null);
   }
}
function FUiWorkspaceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o.onResize         = FUiWorkspaceConsole_onResize;
   o.construct        = FUiWorkspaceConsole_construct;
   o.active           = FUiWorkspaceConsole_active;
   o.resize           = FUiWorkspaceConsole_resize;
   o.dispose          = FUiWorkspaceConsole_dispose;
   return o;
}
function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var w = o._activeWorkspace;
   if(w){
      w.psResize();
   }
}
function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new TDictionary();
   RWindow.lsnsResize.register(o, o.onResize);
}
function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
function FUiWorkspaceConsole_resize(){
   this.onResize();
}
function FUiWorkspaceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
var EUiSplitStyle = new function EUiSplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
function MUiShadow(o){
   o = RClass.inherits(this, o);
   o._hShadow   = null;
   o.show       = MUiShadow_show;
   o.hide       = MUiShadow_hide;
   o.setVisible = MUiShadow_setVisible;
   return o;
}
function MUiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = RUiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }
}
function MUiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
function MUiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RUiLayer.next();
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var r = RHtml.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
function SUiColorBar(){
   var o = this;
   o._draging          = false;
   o.control           = null;
   o.typeCd            = null;
   o.minValue          = 0;
   o.maxValue          = 1;
   o.hPanel            = null;
   o.hColorPanel       = null;
   o.hColorImage       = null;
   o.hSlidePanel       = null;
   o.hSlideForm        = null;
   o.hSlideRowUL       = null;
   o.hSlideRowUM       = null;
   o.hSlideRowUR       = null;
   o.hSlideRowML       = null;
   o.hSlideRowMM       = null;
   o.hSlideRowMR       = null;
   o.hSlideRowBL       = null;
   o.hSlideRowBM       = null;
   o.hSlideRowBR       = null;
   o.hInputPanel       = null;
   o.hInput            = null;
   o.onMouseDown       = SUiColorBar_onMouseDown;
   o.onMouseMove       = SUiColorBar_onMouseMove;
   o.onMouseUp         = SUiColorBar_onMouseUp;
   o.build             = SUiColorBar_build;
   o.setRange          = SUiColorBar_setRange;
   o.setColorValue     = SUiColorBar_setColorValue;
   o.setSlideValue     = SUiColorBar_setSlideValue;
   o.setInputValue     = SUiColorBar_setInputValue;
   o.convertSlide      = SUiColorBar_convertSlide;
   o.convertGet        = SUiColorBar_convertGet;
   o.convertSet        = SUiColorBar_convertSet;
   o.get               = SUiColorBar_get;
   o.set               = SUiColorBar_set;
   o.changeSlide       = SUiColorBar_changeSlide;
   o.changeInputEdit   = SUiColorBar_changeInputEdit;
   o.changeInputChange = SUiColorBar_changeInputChange;
   return o;
}
function SUiColorBar_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
function SUiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = RBuilder.appendTableRow(hcf);
   var hc = o.hColorPanel = RBuilder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = RBuilder.appendIcon(hc, null, 'n', 11, 11);
   var hc = o.hSlidePanel = RBuilder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = RBuilder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideRowUp = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideRow = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideRowDown = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = RBuilder.appendTableCell(hl);
   var hc = o.hInputPanel = RBuilder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = RBuilder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}
function SUiColorBar_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = i;
   }
   if(a != null){
      o.maxValue = a;
   }
}
function SUiColorBar_setColorValue(p){
   var o = this;
   var v = RHex.format(p, 2);
   var c = null;
   switch(o.typeCd){
      case 'red':
         c = v + '0000';
         break;
      case 'green':
         c = '00' + v + '00';
         break;
      case 'blue':
         c = '0000' + v;
         break;
      default:
         throw new TError(o, 'Invalid type.');
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
function SUiColorBar_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorBar_setInputValue(p){
   this.hInput.value = p;
}
function SUiColorBar_convertGet(p){
   return p;
}
function SUiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}
function SUiColorBar_convertSet(p){
   return p;
}
function SUiColorBar_set(p){
   var o = this;
   var v = o.convertSet(p);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.setInputValue(v);
}
function SUiColorBar_convertSlide(p){
   return p;
}
function SUiColorBar_changeSlide(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputEdit(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputChange(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorChannel(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 255;
   o.setInputValue = SUiColorChannel_setInputValue;
   o.convertGet    = SUiColorChannel_convertGet;
   o.convertSet    = SUiColorChannel_convertSet;
   return o;
}
function SUiColorChannel_setInputValue(p){
   var o = this;
   var v = RInteger.toRange(p, o.minValue, o.maxValue);
   var t = RInteger.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorChannel_convertGet(p){
   var o = this;
   var v = RInteger.parse(RString.nvl(p, '0'));
   return RInteger.toRange(v, o.minValue, o.maxValue) / 255;
}
function SUiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
function SUiColorPower(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 4;
   o.setColorValue = SUiColorPower_setColorValue;
   o.setSlideValue = SUiColorPower_setSlideValue;
   o.setInputValue = SUiColorPower_setInputValue;
   o.convertGet    = SUiColorPower_convertGet;
   o.convertSet    = SUiColorPower_convertSet;
   o.convertSlide  = SUiColorPower_convertSlide;
   return o;
}
function SUiColorPower_setColorValue(p){
   var o = this;
   var v = RInteger.toRange(parseInt(p * 255), 0, 255);
   var s = RHex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}
function SUiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = RFloat.toRange(p, o.minValue, o.maxValue);
   var t = RFloat.format(v, 0, null, 2, null);
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorPower_convertGet(p){
   return RFloat.parse(p);
}
function SUiColorPower_convertSet(p){
   return p;
}
function SUiColorPower_convertSlide(p){
   return p * this.maxValue;
}
function SUiSlide(){
   var o = this;
   o._draging      = false;
   o.control       = null;
   o.stepValue     = 1;
   o.minValue      = 0;
   o.maxValue      = 100;
   o.range         = 100;
   o.hPanel        = null;
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   o.hSlideU       = null;
   o.hSlideUL      = null;
   o.hSlideUM      = null;
   o.hSlideUR      = null;
   o.hSlideM       = null;
   o.hSlideML      = null;
   o.hSlideMM      = null;
   o.hSlideMR      = null;
   o.hSlideB       = null;
   o.hSlideBL      = null;
   o.hSlideBM      = null;
   o.hSlideBR      = null;
   o.onMouseDown   = SUiSlide_onMouseDown;
   o.onMouseMove   = SUiSlide_onMouseMove;
   o.onMouseUp     = SUiSlide_onMouseUp;
   o.onSlideChange = RMethod.empty;
   o.build          = SUiSlide_build;
   o.setRange       = SUiSlide_setRange;
   o.setSlideValue  = SUiSlide_setSlideValue;
   o.get            = SUiSlide_get;
   o.set            = SUiSlide_set;
   o.changeSlide    = SUiSlide_changeSlide;
   return o;
}
function SUiSlide_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
function SUiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiSlide_build(p){
   var o = this;
   var c = o.control;
   var hf = o.hSlideForm = RBuilder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideU = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideM = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideB = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = RBuilder.appendTableCell(hl);
}
function SUiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = RFloat.parse(i);
   }
   if(a != null){
      o.maxValue = RFloat.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}
function SUiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}
function SUiSlide_set(p){
   var o = this;
   o.setSlideValue(p);
}
function SUiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = RInteger.toRange(p, 1, w - 1);
   var v = (p / w) * o.range + o.minValue;
   v = RFloat.toRange(v, o.minValue, o.maxValue);
   o.onSlideChange.call(c, v);
}
function FUiButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._labelPositionCd   = RClass.register(o, new APtyString('_labelPositionCd'), EUiPosition.Left);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._action            = RClass.register(o, new APtyString('_action'));
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
   o._styleForm         = RClass.register(o, new AStyle('_styleForm'));
   o._styleIcon         = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleIconPanel    = RClass.register(o, new AStyleIcon('_styleIconPanel'));
   o._hForm             = null;
   o._hLeftButton       = null;
   o._hMiddleButton     = null;
   o._hRightButton      = null;
   o._hLabelPanel       = null;
   o._hLabel            = null;
   o.onBuild            = FUiButton_onBuild;
   o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiButton_onClick);
   o.doClick            = FUiButton_doClick;
   return o;
}
function FUiButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = RBuilder.appendTableRow(hForm);
   if(o._icon){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = RBuilder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   if(o.label){
      var hCell = RBuilder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = RBuilder.appendText(hCell, o.styleName('Label'), o._label);
   }
}
function FUiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('HoverLeft');
	  o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o._hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FUiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('PressLeft');
	  o._hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o._hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FUiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o._hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o._hMiddleButton.background = o.styleIconPath('Button');
	  o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FUiButton_onClick(e){
   this.doClick();
}
function FUiButton_onButtonClick(e){
   this.doClick();
}
function FUiButton_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FUiButton_setLabel(v){
   var o = this;
   o.label = v;
   o._hLabel.innerText = v;
   o._hLabel.noWrap = true;
}
function FUiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}
function FUiButton_setLabelStyle(c, w, s){
   var o = this;
   o._hLabel.style.color = '#FF0000';
   o._hLabel.style.fontWeight = 'bold';
   o._hLabel.style.fontSize = '12';
}
function FUiButton_doClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FUiFocusConsole).blur();
      RLogger.debug(o, 'Tool button click. (label={1})', o._label);
      var event = new SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
function FUiButton_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
}
function FUiCalendar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
   o.editFormat  = RDate.DisplayFormat;
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   o.borderStyle = EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = FUiCalendar_onKeyPress;
   o.onDataClick   = FUiCalendar_onDataClick;
   o.refreshStyle  = FUiCalendar_refreshStyle;
   o.onEditEnd   = FUiCalendar_onEditEnd;
   o.onBuildEdit = FUiCalendar_onBuildEdit;
   o.construct   = FUiCalendar_construct;
   o.formatValue = FUiCalendar_formatValue;
   o.formatText  = FUiCalendar_formatText;
   o.drop        = FUiCalendar_drop;
   o.doBlur      = FUiCalendar_doBlur;
   return o;
}
function FUiCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
function FUiCalendar_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = hr.insertCell();
   var h = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FUiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiCalendar_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FUiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
function FUiCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return RDate.formatDate(o.date);
      }else{
         RDate.autoParse(o.date, t);
         return RDate.formatDate(o.date);
      }
   }
   return RString.nvl(t);
}
function FUiCalendar_formatText(value){
   if(value){
      var o = this;
      RDate.autoParse(o.date, value);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(value);
}
function FUiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FUiCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FUiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
function FUiCalendarEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MUiFocusLooper);
   o.editFormat       = null;
   o.dataValue        = null;
   o.date             = new TDate();
   o.hTitlePanel      = null;
   o.hYearPrior       = null;
   o.hYear            = null;
   o.hYearNext        = null;
   o.hMonthPrior      = null;
   o.hMonth           = null;
   o.hMonthNext       = null;
   o.hDaysPanel       = null;
   o.hTimePanel       = null;
   o.hTime            = null;
   o.hNow             = null;
   o.hOk              = null;
   o.hCancel          = null;
   o.hHour            = null;
   o.hMinute          = null;
   o.hSecond          = null;
   o.hSelect          = null;
   o.editFormat       = RDate.DisplayFormat;
   o.dateOrg          = new TDate();
   o.dateOrgValue     = null;
   o.dayCells         = new TList();
   o.focusObject      = null;
   o.skipBlur         = false;
   o.styleYearMonth   = RClass.register(o, new TStyle('YearMonth'));
   o.styleButton      = RClass.register(o, new TStyle('Button'));
   o.styleButtonHover = RClass.register(o, new TStyle('ButtonHover'));
   o.styleDay         = RClass.register(o, new TStyle('Day'));
   o.styleDaySel      = RClass.register(o, new TStyle('DaySel'));
   o.styleDayHover    = RClass.register(o, new TStyle('DayHover'));
   o.styleDayFree     = RClass.register(o, new TStyle('DayFree'));
   o.styleDayNone     = RClass.register(o, new TStyle('DayNone'));
   o.styleTitlePanel  = RClass.register(o, new TStyle('TitlePanel'));
   o.styleDaysPanel   = RClass.register(o, new TStyle('DaysPanel'));
   o.styleTimePanel   = RClass.register(o, new TStyle('TimePanel'));
   o.styleMonth       = RClass.register(o, new TStyle('Year'));
   o.styleMonth       = RClass.register(o, new TStyle('Month'));
   o.styleWeek        = RClass.register(o, new TStyle('Week'));
   o.styleTime        = RClass.register(o, new TStyle('Time'));
   o.styleHour        = RClass.register(o, new TStyle('Hour'));
   o.styleSplit       = RClass.register(o, new TStyle('Split'));
   o.styleMinute      = RClass.register(o, new TStyle('Minute'));
   o.styleSecond      = RClass.register(o, new TStyle('Second'));
   o.styleNow         = RClass.register(o, new TStyle('Now'));
   o.styleOk          = RClass.register(o, new TStyle('Ok'));
   o.onDaySelect      = RClass.register(o, new HMouseDown('onDaySelect'), FUiCalendarEditor_onDaySelect);
   o.onButtonNow      = RClass.register(o, new HMouseDown('onButtonNow'), FUiCalendarEditor_onButtonNow);
   o.onDateKeyDown    = RClass.register(o, new HKeyDown('onDateKeyDown'), FUiCalendarEditor_onDateKeyDown);
   o.onDateBlur       = RClass.register(o, new HBlur('onDateBlur'), FUiCalendarEditor_onDateBlur);
   o.onTimeBlur       = RClass.register(o, new HBlur('onTimeBlur'), FUiCalendarEditor_onTimeBlur);
   o.onTimeClick      = RClass.register(o, new HClick('onTimeClick'), FUiCalendarEditor_onTimeClick);
   o.onDayDbClick     = RClass.register(o, new HDoubleClick('onDayDbClick'), FUiCalendarEditor_onDayDbClick);
   o.onDayEnter       = RClass.register(o, new HMouseEnter('onDayEnter'),    FUiCalendarEditor_onDayEnter);
   o.onDayOut         = RClass.register(o, new HMouseOut('onDayOut'),        FUiCalendarEditor_onDayOut);
   o.onButtonOk       = RClass.register(o, new HMouseDown('onButtonOk'),     FUiCalendarEditor_onButtonOk);
   o.onButtonCancel   = RClass.register(o, new HMouseDown('onButtonCancel'), FUiCalendarEditor_onButtonCancel);
   o.onButtonOver     = RClass.register(o, new HMouseEnter('onButtonOver'),  FUiCalendarEditor_onButtonOver);
   o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'),     FUiCalendarEditor_onButtonOut);
   o.onMdown          = RClass.register(o, new HMouseDown('onMdown'),        FUiCalendarEditor_onMdown);
   o.onMup            = RClass.register(o, new HMouseUp('onMup'),            FUiCalendarEditor_onMup);
   o.onBuildDrop      = FUiCalendarEditor_onBuildDrop;
   o.show             = FUiCalendarEditor_show;
   o.setMinuteEditable = FUiCalendarEditor_setMinuteEditable;
   o.setHourEditable   = FUiCalendarEditor_setHourEditable;
   o.setSecondEditable = FUiCalendarEditor_setSecondEditable;
   o.buildTitle       = FUiCalendarEditor_buildTitle;
   o.buildDays        = FUiCalendarEditor_buildDays;
   o.buildTime        = FUiCalendarEditor_buildTime;
   o.testBlur         = FUiCalendarEditor_testBlur;
   o.get              = FUiCalendarEditor_get;
   o.set              = FUiCalendarEditor_set;
   o.setDate          = FUiCalendarEditor_setDate;
   o.storeChange      = FUiCalendarEditor_storeChange;
   o.daySelectLsns    = new TListeners();
   o.onBuildButton    = FUiCalendarEditor_onBuildButton;
   o.ohKdown          = FUiCalendarEditor_ohKdown;
   o.ohDaysChange     = FUiCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = FUiCalendarEditor_ohKeyCheck;
   o.onDateAction     = FUiCalendarEditor_onDateAction;
   o.panel            = FUiCalendarEditor_panel;
   o.dispose          = FUiCalendarEditor_dispose;
   return o;
}
function FUiCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
function FUiCalendarEditor_onTimeBlur(e){
	var o = this;
    var h = e.hSource;
    if(h == o.hHour){
       h.value = Math.min(RInteger.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
function FUiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onDaySelect(e){
   var o = this;
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
	  var h = e.hSource;
	  if(o.hSelect){
		  o.hSelect.style.border = '1 solid #FFFFFF';
	  };
	  o.hSelect = h;
	  h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
function FUiCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.dataValue = RDate.format();
      o.editEnd();
   }
}
function FUiCalendarEditor_onDateKeyDown(e, he){
   var o = this;
   var h = e.hSource;
   var v = h.value;
   if(EKey.Enter == e.keyCode){
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Up == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) + 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) + 1;
      }else if(h == o.hHour){
    	  if(o.hHour.editAble){
		     if(v < 23){
			    h.value = RInteger.parse(h.value) + 1;
			 }
    	  }
	  }else if(h == o.hMinute){
		 if(o.hMinute.editAble){
		    if(v < 59){
			   h.value = RInteger.parse(h.value) + 1;
			}
	     }
	  }else{
		  if(o.hSecond.editAble){
		     if(v < 59){
			    h.value = RInteger.parse(h.value) + 1;
		     }
	      }
	  }
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Down == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) - 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) - 1;
      }else if(h == o.hHour){
    	 if(o.hHour.editAble){
            if(v > 0){
	           h.value = RInteger.parse(h.value) - 1;
	        }
    	 }
	  }else if(h == o.hMinute){
		  if(o.hMinute.editAble){
		     if(v > 0){
	            h.value = RInteger.parse(h.value) - 1;
	         }
		  }
	  }else{
		  if(o.hSecond.editAble){
		     if(v > 0){
		        h.value = RInteger.parse(h.value) - 1;
		     }
		  }
	  }
      o.storeChange();
      o.setDate(o.date);
      h.select();
   }else{
	  if(h == o.hHour || h == o.hMinute || h == o.hSecond){
	     if(h.editAble){
	        RKey.fixChars(he, RDate.Chars);
	     }else{
	        he.keyCode = 0;
	        he.returnValue = false;
	     }
	  }else{
		  RKey.fixChars(he, RDate.Chars);
	  }
   }
}
function FUiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
function FUiCalendarEditor_onBuildDrop(){
   var o = this;
   o.hDatePanel = RBuilder.appendTable(o.hDropPanel);
   o.hDropPanel.align = 'center';
   o.hDatePanel.width = '100%';
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTitlePanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('TitlePanel');
   o.buildTitle();
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hDaysPanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('DaysPanel');
   o.buildDays();
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTimePanel = hRow.insertCell();
   o.buildTime();
   o.pushFocus(o.hYear);
   o.pushFocus(o.hMonth);
}
function FUiCalendarEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 273;
   o.base.MShadow.show.call(o);
}
function FUiCalendarEditor_buildTitle(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTitlePanel, null, 0, 5, 1);
   hTab.align = 'center';
   hTab.width = '100%';
   hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   var h = o.hYearPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hYear = RBuilder.append(hCel, 'INPUT', o.style('Year'));
   h.maxLength = '4';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FUiCalendarEditor:year');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hYearNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCell = hRow.insertCell();
   hCell.width='10';
   var hCel = hRow.insertCell();
   var h = o.hMonthPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hMonth = RBuilder.append(hCel, 'INPUT', o.style('Month'));
   h.maxLength = '2';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FUiCalendarEditor:month');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hMonthNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown", h);
   o.attachEvent("onMup", h);
}
function FUiCalendarEditor_buildDays(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FUiCalendarEditor:weekdays').split(',');
   var count = weekDays.length;
   var hWeekRow = hTab.insertRow();
   for(var n=0; n<count; n++){
      var h = hWeekRow.insertCell();
      h.className = o.style('Week');
      h.align = 'center';
      h.innerText = weekDays[n];
   }
   for(var n=0; n<6; n++){
      var hRow = hTab.insertRow();
      for(var i=0; i<count; i++){
         var h = hRow.insertCell();
         h.link = o;
         h.className = o.style('DayNone');
         o.attachEvent("onDayEnter", h);
         o.attachEvent("onDayOut", h);
         o.attachEvent("onDaySelect", h);
         o.attachEvent("onDayDbClick", h);
         h.innerText = '.';
         o.dayCells.push(h);
      }
   }
}
function FUiCalendarEditor_buildTime(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTimePanel, null, 0, 1, 1);
   var ht = o.hTimePanel;
   ht.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   var hRow = hTab.insertRow();
   var hb1 = hRow.insertCell();
   hb1.width = 5;
   var hl = hRow.insertCell();
   hl.width = 50;
   hl.style.color = '#1F8FB7';
   hl.style.fontWeight = 'BOLD';
   hl.innerText='时间:';
   var hc = hRow.insertCell();
   var hb = RBuilder.appendTable(hc, null, 0, 0, 0);
   hc.style.border = '1 solid #2BD6F0';
   hc.style.backgroundColor = '#FFFFFF';
   var hr = hb.insertRow();
   var hh =hr.insertCell();
   var hHour = o.hHour = RBuilder.appendEdit(hh, o.style('Hour'));
   hHour.maxLength = 2;
   o.attachEvent("onTimeClick", hHour);
   o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
   var hs1 = hr.insertCell();
   hs1.innerText = ':';
   var hm = hr.insertCell();
   var hMinute = o.hMinute = RBuilder.appendEdit(hm, o.style('Minute'));
   hMinute.maxLength = 2;
   o.attachEvent("onTimeClick", hMinute);
   o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
   var hs2 = hr.insertCell();
   hs2.innerText = ':';
   var hs = hr.insertCell();
   var hSecond = o.hSecond = RBuilder.appendEdit(hs, o.style('Second'));
   hSecond.maxLength = 2;
   o.attachEvent("onTimeClick", hSecond);
   o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
   var hb2 = hRow.insertCell();
   hb2.width = 50;
   var hn = hRow.insertCell();
   hn.style.display = 'none';
   var hNow = o.hNow = RBuilder.append(hn, 'SPAN', o.style('Now'));
   hNow.style.width = 50;
   hn.style.border='1 solid #2BD6F0';
   hNow.innerText = RContext.get('FUiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FUiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FUiCalendarEditor:ok');
}
function FUiCalendarEditor_testBlur(c){
   return this.source != c;
}
function FUiCalendarEditor_get(){
   return this.dataValue;
}
function FUiCalendarEditor_set(value, format){
   var o = this;
   o.changed = false;
   o.skipBlur = 0;
   o.dataValue = value;
   o.dateOrgValue = value;
   o.editFormat = format;
   RDate.parse(o.date, value);
   RDate.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      RDate.parse(o.date, value);
      RDate.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
function FUiCalendarEditor_setDate(date){
   var o = this;
   o.hYear.value = date.year;
   o.hMonth.value = date.month;
   o.hHour.value = RString.lpad(date.hour, 2, '0');
   o.hMinute.value = RString.lpad(date.minute, 2, '0');
   o.hSecond.value = RString.lpad(date.second, 2,'0');
   var selDay = date.day;
   if(!(o.dateOrg.year == date.year && o.dateOrg.month == date.month)){
      selDay = -1;
   }
   if(o.hSelect){
	   o.hSelect.style.border='1 solid #FFFFFF';
   }
   var monthWeekDay = this.date.monthWeekDay();
   var monthDays = this.date.monthDays();
   var weekDay = monthWeekDay;
   for(var n=0; n<o.dayCells.count; n++){
      var h = o.dayCells.get(n);
      if(n<monthWeekDay){
         h.className = o.style('DayNone');
         h.innerText = '.'
      }else if(n < monthDays+monthWeekDay){
         if(weekDay == 7){
            weekDay = 0;
         }
         var day = n-monthWeekDay+1;
         if(day == selDay){
            h.className = o.style('DaySel');
            h.isCurrent = true;
            o.hSelect = h;
            h.style.border = '1 solid #2BD6F0';
         }else{
            h.isFree = (weekDay==0 || weekDay==6);
            h.className = h.isFree ? o.style('DayFree') : o.style('Day');
            h.isCurrent = false;
         }
         h.innerText = day;
         weekDay++;
      }else{
         h.className = o.style('DayNone');
         h.innerText = '.'
      }
   }
}
function FUiCalendarEditor_setHourEditable(v){
   var o = this;
   if(!v){
	   o.hHour.value = '00';
	   o.hHour.style.cursor='default';
	   o.hHour.style.color='gray';
	   o.hHour.editAble = false;
   }else{
	   o.hHour.editAble = true;
   }
}
function FUiCalendarEditor_setMinuteEditable(v){
   var o = this;
   if(!v){
	   o.hMinute.value = '00';
	   o.hMinute.style.cursor='default';
	   o.hMinute.style.color='gray';
	   o.hMinute.editAble = false;
   }else{
	   o.hMinute.editAble = true;
   }
}
function FUiCalendarEditor_setSecondEditable(v){
   var o = this;
   if(!v){
	   o.hSecond.value = '00';
	   o.hSecond.style.cursor='default';
	   o.hSecond.style.color='gray';
	   o.hSecond.editAble = false;
   }else{
	   o.hSecond.editAble = true;
   }
}
function FUiCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
}
function FUiCalendarEditor_onBuildButton(){
   var o = this;
}
function FUiCalendarEditor_onMdown(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
function FUiCalendarEditor_onMup(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
function FUiCalendarEditor_ohKdown(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
      var e = RWindow.event(this);
      if(EKey.Esc == e.keyCode){
         o.dataValue = o.dateOrgValue;
         o.editStatus = EEditStatus.Cancel;
         o.endEdit();
      }else if(event.ctrlKey && EKey.Enter == e.keyCode){
         o.storeChange();
         o.editStatus = EEditStatus.Ok;
         o.endEdit();
      }else if(EKey.Enter == e.keyCode){
         o.storeChange();
         o.setDate(o.date);
      }else if(EKey.Tab == e.keyCode){
         o.isSkipBlur = true;
         if(e.shiftKey){
            o.focusPrior();
         }else{
            o.focusNext();
         }
         e.returnValue = 0;
      }
   }
}
function FUiCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
function FUiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
function FUiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
	 o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
function FUiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
function FUiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      e.keyCode = 0;
   }
}
function FUiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
function FUiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
function FUiCalendarEditor_onDateAction(h){
   var o = this;
   if(o.hYearPrior == h){
      o.date.addYear(-1);
      o.setDate(o.date);
      if(o.focusObject != this.hYear){
         o.focusObject = this.hYear;
         o.hYear.focus();
         o.hYear.select();
      }
   }else if(o.hYearNext == h){
      o.date.addYear(1);
      o.setDate(o.date);
      if(o.focusObject != this.hYear){
         o.focusObject = this.hYear;
         o.hYear.focus();
         o.hYear.select();
      }
   }else if(o.hMonthPrior == h){
      this.date.addMonth(-1);
      o.setDate(o.date);
      if(o.focusObject != this.hMonth){
         o.focusObject = this.hMonth;
         o.hMonth.focus();
      }
   }else if(o.hMonthNext == h){
      this.date.addMonth(1);
      o.setDate(o.date);
      if(o.focusObject != this.hMonth){
         o.focusObject = this.hMonth;
         o.hMonth.focus();
      }
   }
}
function FUiCalendarEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
function FUiCalendarEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hDatePanel = null;
   o.hDropPanel = null;
   o.hTitlePanel = null;
   o.hOk = null;
   o.hNow = null;
   o.hButtonPanel = null;
   o.hMonthNext = null;
   o.hYear = null;
   o.hMonth = null;
   o.hTime = null;
   o.hTimePanel = null;
}
function FUiCheck(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiCheck_onBuildEditValue;
   o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
   o.oeSaveValue      = FUiCheck_oeSaveValue;
   o.construct        = FUiCheck_construct;
   o.formatLoad       = FUiCheck_formatLoad;
   o.formatSave       = FUiCheck_formatSave;
   o.get              = FUiCheck_get;
   o.set              = FUiCheck_set;
   o.refreshValue     = FUiCheck_refreshValue;
   o.refreshStyle     = FUiCheck_refreshStyle;
   return o;
}
function FUiCheck_onBuildEditValue(p){
   var o = this;
   var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}
function FUiCheck_onInputClick(p){
   this.refreshValue();
}
function FUiCheck_oeSaveValue(e){
   var o = this;
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FUiEditControl.oeSaveValue.call(o, e);
}
function FUiCheck_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._editSize.set(60, 20);
}
function FUiCheck_formatLoad(value){
   var o = this;
   return (value == o._valueTrue);
}
function FUiCheck_formatSave(value){
   var o = this;
   return RBoolean.toString(value, o._valueTrue, o._valueFalse);
}
function FUiCheck_get(){
   return this._hInput.checked;
}
function FUiCheck_set(value){
   this._hInput.checked = value;
}
function FUiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
function FCheckPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.items            = new TItems();
   o.borderStyle      = EUiBorder.RoundDrop;
   o.onBuildEdit      = FCheckPicker_onBuildEdit;
   o.onEditEnd        = FCheckPicker_onEditEnd;
   o.onDataKeyDown    = FCheckPicker_onDataKeyDown;
   o.loadConfig       = FCheckPicker_loadConfig;
   o.formatValue      = FCheckPicker_formatValue;
   o.validText        = FCheckPicker_validText;
   o.formatText       = FCheckPicker_formatText;
   o.refreshStyle     = FCheckPicker_refreshStyle;
   o.drop             = FCheckPicker_drop;
   o.dispose          = FCheckPicker_dispose;
   return o;
}
function FCheckPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FCheckPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
function FCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return EStatus.Stop;
}
function FCheckPicker_text(){
   return this.hEdit.value;
}
function FCheckPicker_setText(text){
   this.hEdit.value = text;
}
function FCheckPicker_formatValue(text){
   var o = this;
   if(!RString.isEmpty(text)){
      ta = RString.split(text, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < ta.length; n++){
         for(var m = 0; m < item.count; m++){
            var c = item.value(m);
            if(c.label == ta[n]){
               vs.push(c.value);
            }
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_validText(text){
   var o = this;
   if(RString.isEmpty(text)){
      return true;
   }
   return !RString.isEmpty(o.formatValue(text));
}
function FCheckPicker_formatText(v){
   var o = this;
   if(!RString.isEmpty(v)){
      va = RString.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
function FCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
function FCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
function FCheckPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth         = 120;
   o.onEditFocus      = RClass.register(o, new HFocus('onEditFocus'));
   o.onEditBlur       = RClass.register(o, new HBlur('onEditBlur'));
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.stFlag           = RClass.register(o, new TStyle('Flag'));
   o.stEditForm       = RClass.register(o, new TStyle('EditForm'));
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = new Array();
   o.hBtnTextSpan     = null;
   o.onBuildDrop      = FCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = FCheckPickerEditor_onBuildButton;
   o.onItemClick      = FCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = FCheckPickerEditor_onEditKeyDown;
   o.construct        = FCheckPickerEditor_construct;
   o.set              = FCheckPickerEditor_set;
   o.setItems         = FCheckPickerEditor_setItems;
   o.select           = FCheckPickerEditor_select;
   o.linkControl      = FCheckPickerEditor_linkControl;
   o.show             = FCheckPickerEditor_show;
   o.hide             = FCheckPickerEditor_hide;
   o.dispose          = FCheckPickerEditor_dispose;
   return o;
}
function FCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
function FCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
function FCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = RBuilder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
function FCheckPickerEditor_onItemClick(s){
   var o = this;
   s.setChecked(!s.checked);
   var ts = o.items.items;
   var cs = o.components;
   var vs = new Array();
   for(var n = 0; n < ts.count; n++){
      var c = cs.value(n);
      if(c.checked){
         vs.push(c.value);
      }
   }
   var e = o.source;
   e.set(vs.join());
}
function FCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
function FCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
function FCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!RString.isEmpty(v)){
      o.values = v;
      va = RString.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
function FCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         RBuilder.appendEmpty(hd);
      }
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.itemClickListener);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      o.push(c);
   }
   o.position = 0;
}
function FCheckPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FCheckPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hItemsForm);
   RMemory.freeHtml(o.hItemsPanel);
   RMemory.freeHtml(o.hBtnTextSpan);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hPanel = null;
   o.hItemsForm = null;
   o.hItemsPanel = null;
   o.hBtnTextSpan = null;
   o.hDropPanel = null;
   o.hButtonPanel = null;
}
function FUiColor(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor_onBuildEditValue;
   o.construct        = FUiColor_construct;
   o.get              = FUiColor_get;
   o.set              = FUiColor_set;
   return o;
}
function FUiColor_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiColor_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiColor_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor_setText(t){
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
function FUiColor_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColorConsole).focus(o, FUiColorEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor_drop(){
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
function FUiColor_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor_link(){
   var o = this;
}
function FUiColor3Tpl(o){
   o = RClass.inherits(this, o, FEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   o.onBuildEditValue  = FUiColor3Tpl_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColor3Tpl_onInputChanged);
   o.construct         = FUiColor3Tpl_construct;
   o.get               = FUiColor3Tpl_get;
   o.set               = FUiColor3Tpl_set;
   return o;
}
function FUiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
function FUiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiColor3Tpl_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColor3Tpl_get(p){
   var o = this;
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._hInputGreen;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._hInputBlue;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}
function FUiColor3Tpl_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      h.value = RFloat.format(v.red, 0, null, 2, null);
   }
   var h = o._hInputGreen;
   if(h){
      h.value = RFloat.format(v.green, 0, null, 2, null);
   }
   var h = o._hInputBlue;
   if(h){
      h.value = RFloat.format(v.blue, 0, null, 2, null);
   }
   o.changeSet(false);
}
function FUiColor3Tpl_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiColor3Tpl_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor3Tpl_setText(t){
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
function FUiColor3Tpl_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3TplConsole).focus(o, FUiColor3TplEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor3Tpl_drop(){
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
function FUiColor3Tpl_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor3Tpl_link(){
   var o = this;
}
function FUiColor4(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor4_onBuildEditValue;
   o.construct        = FUiColor4_construct;
   o.get              = FUiColor4_get;
   o.set              = FUiColor4_set;
   return o;
}
function FUiColor4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor4_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var v = null;
   if(p.constructor == SColor4){
      var r = RFloat.format(p.red, 0, null, 3, null);
      var g = RFloat.format(p.green, 0, null, 3, null);
      var b = RFloat.format(p.blue, 0, null, 3, null);
      v = r + ',' + g + ',' + b;
   }
   var h = o._hInput;
   if(h){
      h.value = v;
   }
}
function FUiColor4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiColor4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor4_setText(t){
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
function FUiColor4_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiColor4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor4Console).focus(o, FUiColor4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor4_drop(){
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
function FUiColor4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor4_link(){
   var o = this;
}
function FUiColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   o.borderStyle = EUiBorder.RoundDrop;
   o.onBuildEdit = FUiColorPicker_onBuildEdit;
   o.onEditEnd   = FUiColorPicker_onEditEnd;
   o.onDataKeyDown   = FUiColorPicker_onDataKeyDown;
   o.checkColor = FUiColorPicker_checkColor;
   o.setText     = FUiColorPicker_setText;
   o.drop        = FUiColorPicker_drop;
   o.dispose     = FUiColorPicker_dispose;
   return o;
}
function FUiColorPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
function FUiColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
function FUiColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, RString.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
function FUiColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
}
function FUiColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
function FUiColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FUiColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FUiColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FColorPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = RClass.register(o, new HMouseOver('onCellEnter'),  FColorPickerEditor_onCellEnter);
   o.onCellSelect = RClass.register(o, new HMouseDown('onCellSelect'), FColorPickerEditor_onCellSelect);
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
   o.onBuildDrop  = FColorPickerEditor_onBuildDrop;
   o.onKeyDown    = FColorPickerEditor_onKeyDown;
   o.onCellSelect = FColorPickerEditor_onCellSelect;
    o.onEditEnd = FColorPickerEditor_onEditEnd;
   o.makeCell     = FColorPickerEditor_makeCell;
   o.set          = FColorPickerEditor_set;
   o.show         = FColorPickerEditor_show;
   o.hide         = FColorPickerEditor_hide;
   o.linkControl  = FColorPickerEditor_linkControl;
   o.dispose      = FColorPickerEditor_dispose;
   return o;
}
function FColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = RBuilder.appendTable(o.hDropPanel);
   for(var i = 0; i < 2; i++){
      for(var j = 0; j < 6; j++){
         var hRow = o.hTable.insertRow();
         o.makeCell(hRow, "#000000");
         if (i == 0){
            o.makeCell(hRow, '#'+o.ColorHex[j] + o.ColorHex[j] + o.ColorHex[j]);
         }else {
            o.makeCell(hRow, '#'+o.SpColorHex[j]);
         }
         o.makeCell(hRow, "#000000");
         for (k = 0; k < 3; k++) {
            for (l = 0; l < 6; l++) {
               o.makeCell(hRow, '#'+o.ColorHex[k + i * 3] + o.ColorHex[l] + o.ColorHex[j]);
            }
         }
      }
   }
}
function FColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FColorPickerEditor_onCellEnter(e){
   var o = this;
   o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
function FColorPickerEditor_onCellSelect(e){
   var o = this;
   o.color = e.srcElement.style.backgroundColor;
   o.editStatus = EEditStatus.Ok
   o.blur();
}
function FColorPickerEditor_makeCell(hRow, color) {
   var o = this;
   var h = hRow.insertCell();
   h.link = o;
   h.width = o.cellWidth;
   h.height = o.cellHeight;
   h.style.backgroundColor = color;
   o.attachEvent('onCellEnter', h);
   o.attachEvent('onCellSelect', h);
   return h;
}
function FColorPickerEditor_onKeyDown(e){
   alert(FColorPickerEditor_onKeyDown);
   var o = this;
   var kc = e.keyCode;
   if(EKey.Up == kc){
      o.select(o.selectIndex-1);
   }else if(EKey.Down == kc){
      o.select(o.selectIndex+1);
   }else if(EKey.Esc == kc){
      o.editStatus = EEditStatus.Cancel;
      o.selectIndex = o.originIndex;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }else if(EKey.Enter == kc){
      o.editStatus = EEditStatus.Ok;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }
}
function FColorPickerEditor_set(v){
   var o = this;
   o.color = v;
}
function FColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', RClass.dump(t), REnum.decode(EEditStatus, o.editStatus));
   if(t){
      t.hDrop.style.backgroundColor = o.color;
      var ec = RConsole.find(FEventConsole);
      if(EEditStatus.Cancel == o.editStatus){
         ec.add(t, t.focus);
      }else if(EEditStatus.Ok == o.editStatus){
         t.onEditEnd(o);
         ec.add(t, t.focus);
      }
   }
   o.editable = null;
   o.inEdit = false;
}
function FColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
function FUiColorPower(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._valueMin           = RClass.register(o, new APtyNumber('_valueMin'));
   o._valueMax           = RClass.register(o, new APtyNumber('_valueMax'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel    = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._barRed             = null;
   o._barGreen           = null;
   o._barBlue            = null;
   o._barPower           = null;
   o._hColorPanel        = null;
   o._hColorImage        = null;
   o._hChannelPanel      = null;
   o._hChannelForm       = null;
   o.onBuildEditValue    = FUiColorPower_onBuildEditValue;
   o.onMouseCaptureStart = FUiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = FUiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = FUiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColorPower_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiColorPower_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiColorPower_onInputChange);
   o.construct           = FUiColorPower_construct;
   o.get                 = FUiColorPower_get;
   o.set                 = FUiColorPower_set;
   o.setDisplayColor     = FUiColorPower_setDisplayColor;
   o.setDisplay          = FUiColorPower_setDisplay;
   o.refreshValue        = FUiColorPower_refreshValue;
   o.dispose             = FUiColorPower_dispose;
   return o;
}
function FUiColorPower_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hcp = o._hColorPanel = RBuilder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 65);
   var hcp = o._hChannelPanel = RBuilder.appendTableCell(hl);
   var hcf = o._hChannelForm = RBuilder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   var b = o._barRed = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   var b = o._barGreen = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   var b = o._barBlue = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   var b = o._barPower = new SUiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.setRange(o._valueMin, o._valueMax);
   b.hPanel = hcf;
   b.build();
}
function FUiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}
function FUiColorPower_onMouseCapture(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}
function FUiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}
function FUiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(RKeyboard.isControlKey(c)){
      return;
   }
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColorPower_get(p){
   var o = this;
   var v = o._innerDataValue;
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
   return v;
}
function FUiColorPower_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
   o.changeSet(false);
}
function FUiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var va = v.alpha;
   var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
function FUiColorPower_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}
function FUiColorPower_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
function FUiColorPower_dispose(t){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o, t);
}
function FUiDateTime(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiDropable);
   o.editDispMode = RClass.register(o, new APtySet('editDisplay', 'editDate', EDateTimeMode.Display));
   o.editYear     = RClass.register(o, new APtySet('editYear', 'editDate', EDateTimeMode.Year));
   o.editMonth    = RClass.register(o, new APtySet('editMonth', 'editDate', EDateTimeMode.Month));
   o.editDay      = RClass.register(o, new APtySet('editDay', 'editDate', EDateTimeMode.Day));
   o._date        = null;
   o.borderStyle  = EUiBorder.RoundDrop;
   o.lsnEditEnd   = null;
   o.hYearPanel   = null;
   o.hYear        = null;
   o.hMonthPanel  = null;
   o.hMonth       = null;
   o.hDayPanel    = null;
   o.hDay         = null;
   o.onKeyPress   = FUiDateTime_onKeyPress;
   o.onEditEnd    = FUiDateTime_onEditEnd;
   o.onBuildEdit  = FUiDateTime_onBuildEdit;
   o.oeSaveValue  = FUiDateTime_oeSaveValue;
   o.construct    = FUiDateTime_construct;
   o.formatValue  = FUiDateTime_formatValue;
   o.text         = FUiDateTime_text;
   o.setText      = FUiDateTime_setText;
   o.validText    = FUiDateTime_validText;
   o.setEditable  = FUiDateTime_setEditable;
   o.refreshStyle = FUiDateTime_refreshStyle;
   o.drop         = FUiDateTime_drop;
   o.dispose      = FUiDateTime_dispose;
   return o;
}
function FUiDateTime_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FUiDateTime_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
   }
   o.onDataEditEnd(o);
}
function FUiDateTime_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = RBuilder.appendEdit(hc);
   he.maxLength = 4;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hYearSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hYear.style.display = o.editYear?'block':'none'
   o.hYearSplit.style.display = o.editYear?'block':'none'
   var hc = o.hMonthPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1';
   var he = o.hMonth = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hMonthSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hMonth.style.display = o.editMonth?'block':'none';
   o.hMonthSplit.style.display = o.editDay?'block':'none';
   var hc = o.hDayPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1'
   var he = o.hDay = RBuilder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   o.hDay.style.display = o.editDay?'block':'none';
}
function FUiDateTime_oeSaveValue(e){
   var o = this;
   var dn = RString.nvl(o.dataCode, o.dataName);
   if(!RString.isEmpty(dn)){
      var vs = e.values;
      var v = vs.get(dn);
      if(v){
         vs.set(dn, o.reget().substring(0, 8) + v.substring(8));
      }else{
         vs.set(dn, o.reget());
      }
   }
   return EEventStatus.Stop;
}
function FUiDateTime_construct(){
   var o = this;
   o.base.FUiEditControl.construct.call(o);
   o._date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
function FUiDateTime_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o._date.now();
         return RDate.formatDate(o._date);
      }else{
         RDate.autoParse(o._date, t);
         return RDate.formatDate(o._date);
      }
   }
   return RString.nvl(t);
}
function FUiDateTime_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return RDate.formatDate(o._date);
}
function FUiDateTime_setText(t){
   var o = this;
   if(t){
      RDate.autoParse(o._date, t);
      o.hYear.value = RInteger.format(o._date.year, 4);
      o.hMonth.value = RInteger.format(o._date.month, 2);
      o.hDay.value = RInteger.format(o._date.day, 2);
   }else{
      o.hYear.value = '';
      o.hMonth.value = '';
      o.hDay.value = '';
   }
}
function FUiDateTime_validText(t){
   return null;
}
function FUiDateTime_setEditable(v){
   var o = this;
   o.base.FUiEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}
function FUiDateTime_refreshStyle(){
   var o = this;
   o.base.FUiEditControl.refreshStyle.call(o);
   o.hYear.style.color = o._textColor;
   o.hYear.style.backgroundColor = o._backColor;
   o.hMonth.style.color = o._textColor;
   o.hMonth.style.backgroundColor = o._backColor;
   o.hDay.style.color = o._textColor;
   o.hDay.style.backgroundColor = o._backColor;
}
function FUiDateTime_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiDateTimeEditor, o.editRefer);
      e.set(RDate.formatDate(o._date));
      e.setYearVisible(o.editYear);
      e.setMonthVisible(o.editMonth);
      e.setDayVisible(o.editDay);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FUiDateTime_dispose(){
   var o = this;
   o.base.FUiEditControl.dispose.call(o);
   o._date = null;
}
function FUiDateTimeEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor);
   o.date              = null;
   o.years             = null;
   o.months            = null;
   o.days              = null;
   o.hPanelDay         = null;
   o.hPanelMonth       = null;
   o.hPanelYear        = null;
   o.hTitleDay         = null;
   o.hTitleMonth       = null;
   o.hTitleYear        = null;
   o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiDateTimeEditor_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiDateTimeEditor_onButtonLeave);
   o.onYearClick       = RClass.register(o, new AEventMouseDown('onYearClick'), FUiDateTimeEditor_onYearClick);
   o.onMonthClick      = RClass.register(o, new AEventMouseDown('onMonthClick'), FUiDateTimeEditor_onMonthClick);
   o.onDayClick        = RClass.register(o, new AEventMouseDown('onDayClick'), FUiDateTimeEditor_onDayClick);
   o.onDateDoubleClick = RClass.register(o, new AEventDoubleClick('onDateDoubleClick'), FUiDateTimeEditor_onDateDoubleClick);
   o.onNowClick        = RClass.register(o, new AEventMouseDown('onNowClick'), FUiDateTimeEditor_onNowClick);
   o.onConfirmClick    = RClass.register(o, new AEventMouseDown('onConfirmClick'), FUiDateTimeEditor_onConfirmClick);
   o.onBuildDrop       = FUiDateTimeEditor_onBuildDrop;
   o.onBuildButton     = FUiDateTimeEditor_onBuildButton;
   o.construct         = FUiDateTimeEditor_construct;
   o.buildTitle        = FUiDateTimeEditor_buildTitle;
   o.get               = FUiDateTimeEditor_get;
   o.set               = FUiDateTimeEditor_set;
   o.resetDay          = FUiDateTimeEditor_resetDay;
   o.setYearVisible    = FUiDateTimeEditor_setYearVisible;
   o.setMonthVisible   = FUiDateTimeEditor_setMonthVisible;
   o.setDayVisible     = FUiDateTimeEditor_setDayVisible;
   o.selectCell        = FUiDateTimeEditor_selectCell;
   o.restore           = FUiDateTimeEditor_restore;
   o.show              = FUiDateTimeEditor_show;
   o.dispose           = FUiDateTimeEditor_dispose;
   return o;
}
function FUiDateTimeEditor_onButtonEnter(e){
   if(!e.hSource.isSelect){
	  if(RString.isEmpty(e.hSource.innerText)){
         e.hSource.style.backgroundColor = '#CCCCFF';
	  }
   }
}
function FUiDateTimeEditor_onButtonLeave(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#FFFFFF';
   }
}
function FUiDateTimeEditor_onYearClick(e){
   var o = this;
   o.date.setYear(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
function FUiDateTimeEditor_onMonthClick(e){
   var o = this;
   o.date.setMonth(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
function FUiDateTimeEditor_onDayClick(e){
   var o = this;
   if(!RString.equals(e.hSource.innerText, '.')){
      o.date.setDay(e.hSource.innerText);
      o.restore();
   }
}
function FUiDateTimeEditor_onDateDoubleClick(){
   this.onConfirmClick();
}
function FUiDateTimeEditor_onNowClick(){
   var o = this;
   o.date = new TDate();
   o.editEnd();
}
function FUiDateTimeEditor_onConfirmClick(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setDay(o.hDay.value);
   o.editEnd();
}
function FUiDateTimeEditor_onBuildDrop(){
   var o = this;
   var hdp = o.hDropPanel;
   hdp.width = 220;
   o.attachEvent('onDateDoubleClick', hdp);
   o.hTitleYear = o.buildTitle('Year', 4);
   var hp = o.hPanelYear = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<4; m++){
      var hr = hp.insertRow();
      for(var n=0; n<4; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(2000 + 4*m+n, 2);
         hc.align = 'center';
         hc.style.padding = '1 6';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onYearClick', hc);
         o.years.push(hc);
      }
   }
   o.hTitleMonth = o.buildTitle('Month', 2);
   var hp = o.hPanelMonth = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<2; m++){
      hr = hp.insertRow();
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(6*m+n+1, 2);
         hc.align = 'center';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onMonthClick', hc);
         o.months.push(hc);
      }
   }
   o.hTitleDay = o.buildTitle('Day', 2);
   var hp = o.hPanelDay = o.hSelectPanel = RBuilder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<5; m++){
      hr = hp.insertRow();
      for(var n=0; n<7; n++){
         var day = 7*m+n+1;
         if(day > 31){
            continue;
         }
         var hc = hr.insertCell();
         hc.innerText = RInteger.format(day, 2);
         hc.align = 'center';
         hc.style.borderBottom = '1 solid #EEEEEE';
         hc.style.cursor = 'hand';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onDayClick', hc);
         o.days.push(hc);
      }
   }
}
function FUiDateTimeEditor_onBuildButton(){
   var o = this;
   o.base.FUiDropEditor.onBuildButton.call(o);
   var hf = RBuilder.appendTable(o.hButtonPanel);
   hf.width = '100%';
   hf.height = 20;
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onNowClick', h);
   h.innerText = RContext.get('FDate:Now');
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   hc.align = 'right';
   var h = o.hNow = RBuilder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onConfirmClick', h);
   h.innerText = RContext.get('FDate:Confirm');
}
function FUiDateTimeEditor_construct(){
   var o = this;
   o.base.FUiDropEditor.construct.call(o);
   o.date = new TDate();
   o.years = new TList();
   o.months = new TList();
   o.days = new TList();
}
function FUiDateTimeEditor_buildTitle(n, ml){
   var o = this;
   var hf = RBuilder.appendTable(o.hDropPanel);
   hf.width = '100%';
   hf.style.borderBottom = '1 solid #999999';
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hf.style.backgroundColor = '#F8F8F8';
   hf.style.padding = '2 6';
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.width = 60;
   var he = o['h' + n] = RBuilder.appendEdit(hc);
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '1 solid #CCCCCC';
   he.maxLength = ml;
   var hc = hr.insertCell();
   hc.innerText = RContext.get('FDate:' + n);
   return hf;
}
function FUiDateTimeEditor_get(){
   return RDate.formatDate(this.date);
}
function FUiDateTimeEditor_set(v){
   var o = this;
   RDate.autoParse(o.date, v);
   o.restore();
}
function FUiDateTimeEditor_setYearVisible(v){
   var o = this;
   o.hPanelYear.style.display = v? 'block':'none';
   o.hTitleYear.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_setMonthVisible(v){
   var o = this;
   o.hPanelMonth.style.display = v? 'block':'none';
   o.hTitleMonth.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_setDayVisible(v){
   var o = this;
   o.hPanelDay.style.display = v? 'block':'none';
   o.hTitleDay.style.display = v? 'block':'none';
}
function FUiDateTimeEditor_show(v){
   var o = this;
   o.base.FUiDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 220;
   o.base.MShadow.show.call(o);
}
function FUiDateTimeEditor_resetDay(){
   var o = this;
   var monthDays = this.date.monthDays();
   for(var n=0; n<o.days.count; n++){
      var hd = o.days.get(n);
      if(n >= monthDays){
         hd.innerText = '.';
      }else{
    	 hd.innerText = RInteger.format(n+1, 2);
      }
   }
}
function FUiDateTimeEditor_selectCell(ls, v){
   var c = ls.count;
   for(var n=0; n<c; n++){
      var h = ls.get(n);
      if(h.innerText == v){
         h.style.color = '#FFFFFF';
         h.style.backgroundColor = '#9999EE';
         h.isSelect = true;
      }else{
         h.style.color = '#000000';
         h.style.backgroundColor = '#FFFFFF';
         h.isSelect = false;
      }
   }
}
function FUiDateTimeEditor_restore(){
   var o = this;
   o.hYear.value = o.date.year;
   o.hMonth.value = o.date.month;
   o.hDay.value = o.date.day;
   o.selectCell(o.years, o.date.year);
   o.selectCell(o.months, o.date.month);
   o.selectCell(o.days, o.date.day);
}
function FUiDateTimeEditor_dispose(){
   var o = this;
   o.base.FUiDropEditor.dispose.call(o);
   o.hPanel = null;
}
function FUiDropEditor(o){
   o = RClass.inherits(this, o, FUiEditor, MUiShadow);
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleDropForm    = RClass.register(o, new AStyle('_styleDropForm'));
   o._styleDropPanel   = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._minWidth         = 160;
   o._minHeight        = 300;
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   o.onBuildDrop       = RMethod.virtual(o, 'onBuildDrop');
   o.onBuildButton     = RMethod.empty;
   o.onBuild           = FUiDropEditor_onBuild;
   o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
   o.panel             = FUiDropEditor_panel;
   o.setVisible        = FUiDropEditor_setVisible;
   o.dispose           = FUiDropEditor_dispose;
   return o;
}
function FUiDropEditor_onBuild(p){
   var o = this;
   o.__base.FUiEditor.onBuild.call(o, p);
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   var hf = o._hDropForm = RBuilder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = RBuilder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = RBuilder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   o.onBuildDrop();
   o.onBuildButton();
}
function FUiDropEditor_panel(p){
   var o = this;
   if(p == EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FUiEditor.panel.call(o, p);
}
function FUiDropEditor_setVisible(p){
   var o = this;
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FUiEditor.setVisible.call(o, p);
}
function FUiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = RHtml.free(o._hButtonPanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o._hDropForm = RHtml.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
function FUiEdit(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiEdit_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiEdit_onInputEdit);
   o.construct        = FUiEdit_construct;
   o.formatText       = FUiEdit_formatText;
   o.formatValue      = FUiEdit_formatValue;
   o.text             = FUiEdit_text;
   o.setText          = FUiEdit_setText;
   o.setEditAble      = FUiEdit_setEditAble;
   o.refreshValue     = FUiEdit_refreshValue;
   return o;
}
function FUiEdit_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiEdit_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiEdit_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiEdit_formatText(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiEdit_formatValue(value){
   return value;
}
function FUiEdit_text(){
   return this._hInput.value;
}
function FUiEdit_setText(text){
   this._hInput.value = text;
}
function FUiEdit_setEditAble(flag){
   var o = this;
   o.__base.FUiEditControl.setEditAble.call(o, flag);
   o._hInput.readOnly = !flag;
}
function FUiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiEditControl(o){
   o = RClass.inherits(this, o, FUiControl, MUiEditValue, MUiEditChange, MUiEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
   o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._editColor        = RClass.register(o, new APtyString('_editColor'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._progressing      = false;
   o._hLabelPanel      = null;
   o._hLabelForm       = null;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hTextPanel       = null;
   o._hText            = null;
   o._hEditPanel       = null;
   o._hEditForm        = null;
   o._hValuePanel      = null;
   o.onBuildLabelIcon  = FUiEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiEditControl_onBuildEdit;
   o.onBuildPanel      = FUiEditControl_onBuildPanel;
   o.onBuild           = FUiEditControl_onBuild;
   o.oeMode            = FUiEditControl_oeMode;
   o.oeProgress        = FUiEditControl_oeProgress;
   o.construct         = FUiEditControl_construct;
   o.panel             = FUiEditControl_panel;
   o.label             = FUiEditControl_label;
   o.setLabel          = FUiEditControl_setLabel;
   o.getValueRectangle = FUiEditControl_getValueRectangle;
   o.dispose           = FUiEditControl_dispose;
   return o;
}
function FUiEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
   }
}
function FUiEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}
function FUiEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = '20px';
   o.onBuildLabelIcon(p);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   RHtml.setSize(h, o._labelSize);
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FUiEditControl_onBuildEdit(p){
   var o = this;
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   RHtml.setSize(h, o._editSize);
}
function FUiEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiEditControl_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var hc = o._hPanel;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == EUiLabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == EUiLabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == EUiLabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == EUiLabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == EUiLabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEdit(p);
   }
}
function FUiEditControl_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progressing){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_oeProgress(e){
   var o = this;
   if(o._progressing && e.enable){
      return EEventStatus.Stop;
   }
   o._progressing = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o.__base.MUiEditChange.construct.call(o);
   o.__base.MUiEditDrop.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FUiEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiControl.panel.call(o, t);
}
function FUiEditControl_label(p){
   return this._label;
}
function FUiEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}
function FUiEditControl_getValueRectangle(r){
   var o = this;
   if(!r){
      r = new SRectangle();
   }
   var h = o._hValuePanel;
   var p = RHtml.clientPosition(h);
   r.position.assign(p);
   r.setSize(h.offsetWidth, h.offsetHeight);
   return r;
}
function FUiEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   o._labelSize = RObject.dispose(o._labelSize);
   o._editSize = RObject.dispose(o._editSize);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hLabelForm = RHtml.free(o._hLabelForm);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hTextPanel = RHtml.free(o._hTextPanel);
   o._hText = RHtml.free(o._hText);
   o._hEditPanel = RHtml.free(o._hEditPanel);
   o._hEditForm = RHtml.free(o._hEditForm);
   o._hValuePanel = RHtml.free(o._hValuePanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o.__base.MUiEditDrop.dispose.call(o);
   o.__base.MUiEditChange.dispose.call(o);
   o.__base.FUiControl.dispose.call(o);
}
function FUiEditor(o){
   o = RClass.inherits(this, o, FUiControl, MUiFocus);
   o._visible       = false;
   o._statusVisible = false;
   o._styleEdit     = RClass.register(o, new AStyle('_styleEdit'));
   o._statusEditing = false;
   o._source        = null;
   o._hEdit         = null;
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   o.onEditKeyDown  = RClass.register(o, new AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = RClass.register(o, new AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = RClass.register(o, new AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = RClass.register(o, new AEventChange('onEditChange'));
   o.onEditBegin    = FUiEditor_onEditBegin;
   o.onEditChanged  = FUiEditor_onEditChanged;
   o.onEditEnd      = FUiEditor_onEditEnd;
   o.onBuildPanel   = FUiEditor_onBuildPanel;
   o.onBuild        = FUiEditor_onBuild;
   o.get            = RMethod.virtual(o, 'get');
   o.set            = RMethod.virtual(o, 'set');
   o.doBlur         = FUiEditor_doBlur;
   o.panel          = FUiEditor_panel;
   o.linkControl    = FUiEditor_linkControl;
   o.editBegin      = FUiEditor_editBegin;
   o.editCancel     = FUiEditor_editCancel;
   o.editEnd        = FUiEditor_editEnd;
   o.reset          = FUiEditor_reset;
   o.setVisible     = FUiEditor_setVisible;
   o.dispose        = FUiEditor_dispose;
   return o;
}
function FUiEditor_onEditBegin(){
   this.editBegin();
}
function FUiEditor_onEditChanged(){
   var o = this;
   RLogger.debug(o, 'Edit changed');
   var g = o.storage = RObject.nvlObj(o.storage);
   if(g.value == o.value()){
      if(o.changed){
         o.changed = false;
      }
   }else{
      if(!o.changed){
         o.changed = true;
      }
   }
}
function FUiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createSpan(p);
   h.__linker = o;
}
function FUiEditor_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = EUiLayer.Editor;
}
function FUiEditor_get(name){
}
function FUiEditor_set(name, value){
}
function FUiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(RClass.isClass(s, MUiFocus)){
         s.doBlur();
      }
   }
}
function FUiEditor_panel(p){
   var o = this;
   if(p == EPanel.Edit){
      return o._hEdit;
   }else if(p == EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FUiControl.panel.call(o, p);
}
function FUiEditor_linkControl(c){
   var o = this;
   o._source = c;
}
function FUiEditor_editBegin(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = o;
   o._statusEditing = true;
}
function FUiEditor_editCancel(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_editEnd(){
   this.onEditEnd();
}
function FUiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}
function FUiEditor_setVisible(p){
   var o = this;
   o.__base.FUiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}
function FUiEditor_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hEdit = null;
}
function FUiFile(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._styleFile       = RClass.register(o, new AStyle('_styleFile'));
   o._styleBrowser    = RClass.register(o, new AStyle('_styleBrowser'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiFile_onBuildEditValue;
   o.onFileChange     = RClass.register(o, new AEventChange('onFileChange'), FUiFile_onFileChange);
   o.construct        = FUiFile_construct;
   o.formatDisplay    = FUiFile_formatDisplay;
   o.formatValue      = FUiFile_formatValue;
   o.get              = FUiFile_get;
   o.set              = FUiFile_set;
   o.refreshValue     = FUiFile_refreshValue;
   return o;
}
function FUiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl,  o.styleName('InputPanel'));
   var he = o._hInputEdit = RBuilder.appendEdit(hInputPanel, o.styleName('Input'));
   var hFile = o._hInput = RBuilder.appendFile(hInputPanel, o.styleName('File'));
   o.attachEvent('onFileChange', hFile);
   var hBrowserPanel = o._hBrowserPanel = RBuilder.appendTableCell(o._hEditLine);
   hBrowserPanel.style.paddingLeft = '4px';
   var hBrowser = o._hBrowser = RBuilder.appendButton(hBrowserPanel, o.styleName('Browser'));
   hBrowser.value = '浏览...';
   RHtml.setSize(hInputPanel, o._inputSize);
   RHtml.setSize(hFile, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiFile_onFileChange(event){
   var o = this;
   var hFile = o._hInput;
   if(hFile.files){
      if(hFile.files.length){
         var file = hFile.files[0];
         var name = file.name;
         o._hInputEdit.value = name + ' (' + file.size + 'byte)';
         o.processDataChangedListener(event);
      }
   }
}
function FUiFile_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiFile_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiFile_formatValue(p){
   return p;
}
function FUiFile_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiFile_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiFile_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiForm(o){
   o = RClass.inherits(this, o, FUiLayout, MUiDescribeFrame);
   o.onMouseDown        = FUiForm_onMouseDown;
   o.construct          = FUiForm_construct;
   o._dataStatusCd      = ERowStatus.Update;
   o._dataComponents    = null;
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   o.onLoadDataset      = FUiForm_onLoadDataset;
   o.onLoadDatasetEnd   = FUiForm_onLoadDatasetEnd;
   o.isDataChanged      = FUiForm_isDataChanged;
   o.getFormLink        = FUiForm_getFormLink;
   o.allDataComponents  = FUiForm_allDataComponents;
   o.get                = FUiForm_get;
   o.reget              = FUiForm_reget;
   o.set                = FUiForm_set;
   o.getDataCodes       = FUiForm_getDataCodes;
   o.getCurrentRow      = FUiForm_getCurrentRow;
   o.getSelectedRows    = FUiForm_getSelectedRows;
   o.getCurrentRows     = FUiForm_getCurrentRows;
   o.getChangedRows     = FUiForm_getChangedRows;
   o.getRows            = FUiForm_getRows;
   o.clearValue         = FUiForm_clearValue;
   o.resetValue         = FUiForm_resetValue;
   o.loadValue          = FUiForm_loadValue;
   o.saveValue          = FUiForm_saveValue;
   o.recordValue        = FUiForm_recordValue;
   o.toAttributes       = FUiForm_toAttributes;
   o.focus              = FUiForm_focus;
   o.dsUpdate           = FUiForm_dsUpdate;
   o.doPrepare          = FUiForm_doPrepare;
   o.doUpdate           = FUiForm_doUpdate;
   o.doDelete           = FUiForm_doDelete;
   o.dispose            = FUiForm_dispose;
   return o;
}
function FUiForm_onMouseDown(p){
   var o = this;
}
function FUiForm_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
}
function FUiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
function FUiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
function FUiForm_isDataChanged(){
   var o = this;
   var ps = o.allDataComponents();
   if(!ps.isEmpty()){
      var pc = ps.count;
      for(var n=0; n<pc; n++){
         var p = ps.value(n);
         if(p.isDataChanged()){
            return true;
         }
      }
   }
}
function FUiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FUiForm_allDataComponents(p, m){
   var o = this;
   if(!p){
      p = o;
   }
   if(!m){
      m = o._dataComponents;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
function FUiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
function FUiForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
function FUiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
function FUiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
function FUiForm_getCurrentRow(){
   return this.saveValue();
}
function FUiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
function FUiForm_getChangedRows(){
   var o = this;
   var ls = new TList();
   if(o.isDataChanged()){
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
   }
   return ls;
}
function FUiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_clearValue(){
   this.process(this._clearEvent);
}
function FUiForm_resetValue(){
   this.process(this._resetEvent);
}
function FUiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
function FUiForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = o._saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o._dataStatusCd);
   return r;
}
function FUiForm_recordValue(){
   this.process(this._recordEvent);
}
function FUiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
function FUiForm_focus(){
   var o = this;
   o.__base.MUiFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FUiForm_dsUpdate(u, v){
   var o = this;
   if(u){
      o.psProgress(true);
      o.psMode(EMode.Update);
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0);
      g.form = o;
      g.reset = true;
      o.dsSearchs.clear();
      if(u){
         o.dsSearchs.push(new TSearchItem('OUID', u));
      }
      if(v){
         o.dsSearchs.push(new TSearchItem('OVER', v));
      }
      g.searchs = o.dsSearchs;
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsUpdate);
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }
   return o.__base.MDataset.dsUpdate.call(o, u, v)
}
function FUiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}
function FUiForm_doPrepare(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doUpdate(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doDelete(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FUiForm_allNameComponents(f, p, m){
   var o = this;
   var vs = o._nameComponents;
   if(!f && vs){
      return vs;
   }
   if(!vs){
      vs = o._nameComponents = new TMap();
   }
   if(f){
      vs.clear();
   }
   if(!p){
      p = this;
   }
   if(!m){
      m = vs;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
function FUiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
function FUiForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
function FUiForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_connect(service, type, action, attrs){
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('name', this.name);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   var event = new TEvent(this, EXmlEvent.Send);
   event.url = service;
   event.document = doc;
   event.form = this;
   event.onLoad = this.onLoaded;
   RConsole.find(FXmlConsole).process(event);
}
function FUiForm_loadDocument(doc){
   if(doc){
      var root = doc.root();
      if(root.isName('Table')){
         var o = this;
         o.loadConfig(root);
         o.buildColumns(root);
         o.buildRows(root);
      }
   }
}
function FUiForm_testStatus(t){
   var o = this;
   var r = o.__base.MDataset.testStatus.call(o, t);
   if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Search== t){
      return true;
   }else if(EDataAction.First == t){
      return false;
   }else if(EDataAction.Prior == t){
      return false;
   }else if(EDataAction.Next == t){
      return false;
   }else if(EDataAction.Last == t){
      return false;
   }else if(EDataAction.Action == t){
      return true;
   }
   return r;
}
function FUiForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
function FUiFrame(o){
   o = RClass.inherits(this, o, FUiLayout);
   return o;
}
function FUiIconPicker(o){
   o = RClass.inherits(this, o, FUiEdit);
   return o;
}
function FUiIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FUiEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FUiIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FUiEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiIconPicker_onBuildEdit(b){
   var o = this;
   var h = b.hPanel;
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = RString.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = RBuilder.appendIcon(h, hi);
   var h = o.hEdit = RBuilder.appendEdit(h, o.style('Edit'));
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FUiIconPicker_setText(t){
   var o = this;
   o.base.FUiEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FUiIconPicker_dispose(){
   var o = this;
   o.base.FUiEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
function FUiLabel(o){
   o = RClass.inherits(this, o, FUiControl);
   o.onBuild = FUiLabel_onBuild;
   o.get     = FUiLabel_get;
   o.set     = FUiLabel_set;
   return o;
}
function FUiLabel_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
}
function FUiLabel_get(){
   return this._hPanel.innerHTML;
}
function FUiLabel_set(value){
   this._hPanel.innerHTML = value;
}
function FUiLayout(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._styleForm      = RClass.register(o, new AStyle('_styleForm', 'Form'));
   o._lastSplit      = null;
   o._hPanelForm     = null;
   o._hContainer     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   o.onBuildPanel    = FUiLayout_onBuildPanel;
   o.onDesignBegin   = FUiLayout_onDesignBegin;
   o.onDesignEnd     = FUiLayout_onDesignEnd;
   o.oeDesign        = FUiLayout_oeDesign;
   o.oeResize        = FUiLayout_oeResize;
   o.oeRefresh       = FUiLayout_oeRefresh;
   o.insertPosition  = FUiLayout_insertPosition;
   o.moveChild       = FUiLayout_moveChild;
   o.innerAppendLine = FUiLayout_innerAppendLine;
   o.appendChild     = FUiLayout_appendChild;
   o.resize          = FUiLayout_resize;
   o.dispose         = FUiLayout_dispose;
   return o;
}
function FUiLayout_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
   if(o._layoutCd == EUiLayout.Design){
      var hr = RBuilder.appendTableRow(h);
      var hc = RBuilder.appendTableCell(hr);
      o._hContainer = hc;
   }
}
function FUiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}
function FUiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}
function FUiLayout_oeDesign(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o._hPanel.border = 1;
               o._hPanel.style.border = '1 solid red';
            }else{
               o._hPanel.border = 0;
               o._hPanel.style.border = null;
            }
            break;
      }
   }
}
function FUiLayout_oeResize(p){
   var o = this;
   o.__base.FUiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_oeRefresh(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o._components;
   var cs = o.controls;
   ms.removeValue(cf);
   cs.removeValue(cf);
   if(ct){
      var index = ms.indexOfValue(ct);
      ms.insert(index+idx, cf.name, cf);
      var index = cs.indexOfValue(ct);
      cs.insert(index+idx, cf.name, cf);
   }else{
      ms.set(cf.name, cf);
      cs.set(cf.name, cf);
   }
}
function FUiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MUiHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MUiHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf._hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf._hPanel, 'TD');
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex + 1);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf._hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o._hContainer.insertBefore(cf._hPanel, ct._hPanel);
            }else{
               var hNewTab = o.innerAppendLine();
               o._hContainer.insertBefore(hNewTab, ct._hPanel);
               var hCell = RBuilder.appendTableCell(o._hPanelLine);
               hCell.appendChild(cf._hPanel);
               cf._hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o._hContainer.children.length;
            for(var n = 0; n < count; n++){
               if(o._hContainer.children[n] == hTable){
                  if(cfh){
                     o._hContainer.insertBefore(cf._hPanel, hTable);
                  }else{
                     var hNewTab = o.innerAppendLine();
                     o._hContainer.insertBefore(hNewTab, hTable);
                     var hCell = RBuilder.appendTableCell(o._hPanelLine);
                     hCell.appendChild(cf._hPanel);
                     cf._hPanelLine = hNewTab;
                     moved = true;
                  }
                  o.insertPosition(cf, ct, 0, copy);
                  cf.nowrap = false;
                  break;
               }
            }
         }
         break;
      case EPosition.LineAfter:
         if(cfh){
            o._hContainer.appendChild(cf._hPanel);
         }else{
            var hNewTab = o.innerAppendLine();
            var hCell = RBuilder.appendTableCell(o._hPanelLine);
            hCell.appendChild(cf._hPanel);
            hCell.appendChild(cf._hPanel);
            moved = true;
         }
         o.insertPosition(cf, null, 0, copy);
         ct.nowrap = false;
         cf.nowrap = false;
         break;
   }
   if(moved){
      hCfTd.removeNode(true);
      if(hCfTab.rows[0].cells.length == 0){
         hCfTab.removeNode(true);
      }
   }
}
function FUiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == EUiLayout.Design){
      h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = RBuilder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}
function FUiLayout_appendChild(control){
   var o = this;
   if(o._layoutCd == EUiLayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(RClass.isClass(control, MUiHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(control._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      var hCell = RBuilder.appendTableCell(o._hPanelLine);
      if(!RClass.isClass(control, FUiLayout)){
         control._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(control._hPanel);
      control._hLayoutCell = hCell;
      if((control.wrapCd() == EUiWrap.NextLine) && (o.controls.last() != control)){
         o.innerAppendLine();
      }
   }else{
      control._hPanel.style.paddingTop = 2;
      control._hPanel.style.paddingBottom = 2;
      if(control.dockCd() == EUiDock.Fill){
         var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(control._sizeCd == EUiSize.Fill){
         var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(RSet.contains(control._sizeCd, EUiSize.Horizontal) || '100%' == control.width){
         if(RClass.isClass(control, FUiSplit)){
            o._lastSplit = control;
         }
         var hr = RBuilder.appendTableRow(o._hPanelForm);
         var hc = RBuilder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(control._hPanel);
         control._hLayoutRow = hr;
         o._hPanelLast = hc;
         if(!RSet.contains(control._sizeCd, EUiSize.Vertical)){
            hc.height = 1;
         }else if(control.height){
            hc.height = control.height;
         }
         o._hPanelLine = null;
      }else{
         if(!o._hPanelLine){
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            var ht = o._hPanelTable = RBuilder.appendTable(hc);
            o._hPanelLine = RBuilder.appendTableRow(ht);
         }
         var hc = RBuilder.appendTableCell(o._hPanelLine)
         control._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(control._hPanel);
         control._hLayoutCell = hc;
         if(control.wrapCd() == EUiWrap.NextLine){
            o._hPanelLine = null;
         }
      }
   }
}
function FUiLayout_resize(){
   var o = this;
   var cs = o._components;
   if(cs){
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.at(n);
         if(RClass.isClass(p, FUiTable) || RClass.isClass(p, FUiPageControl)){
            ha = true;
            break;
         }
      }
   }
}
function FUiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiLayoutHorizontal(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = FUiLayoutHorizontal_onBuildPanel;
   o.onBuild      = FUiLayoutHorizontal_onBuild;
   o.appendChild  = FUiLayoutHorizontal_appendChild;
   o.dispose      = FUiLayoutHorizontal_dispose;
   return o;
}
function FUiLayoutHorizontal_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}
function FUiLayoutHorizontal_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event)
   o._hLine = RBuilder.appendTableRow(o._hPanel);
}
function FUiLayoutHorizontal_appendChild(control){
   var o = this;
   var hCell = RBuilder.appendTableCell(o._hLine);
   hCell.appendChild(control._hPanel);
}
function FUiLayoutHorizontal_dispose(){
   var o = this;
   o._hLine = RHtml.free(o._hLine);
   o.__base.FUiContainer.dispose.call(o);
}
function FUiLayoutVertical(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = FUiLayoutVertical_onBuildPanel;
   o.appendChild  = FUiLayoutVertical_appendChild;
   o.dispose      = FUiLayoutVertical_dispose;
   return o;
}
function FUiLayoutVertical_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}
function FUiLayoutVertical_appendChild(control){
   var o = this;
   var hCell = RBuilder.appendTableRowCell(o._hPanel);
   hCell.appendChild(control._hPanel);
   var height = control.size().height;
   if(height){
      hCell.style.height = height + 'px';
   }
}
function FUiLayoutVertical_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiListBox(o){
   o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick);
   o._sizeCd      = EUiSize.Horizontal
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hForm       = null;
   o.onBuildPanel = FUiListBox_onBuildPanel;
   o.createItem   = FUiListBox_createItem;
   o.appendChild  = FUiListBox_appendChild;
   o.clickItem    = FUiListBox_clickItem;
   o.clear        = FUiListBox_clear;
   o.dispose      = FUiListBox_dispose;
   return o;
}
function FUiListBox_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiListBox_createItem(pi, pl){
   var o = this;
   var c = RClass.create(FUiListItem);
   c.build(o._hPanel);
   c.setLabel(pl);
   return c;
}
function FUiListBox_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiListBox_clickItem(p){
   var o = this;
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListItem)){
            m.setChecked(m == p);
         }
      }
   }
   o.processClickListener(o, p);
}
function FUiListBox_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListItem)){
            o._hPanel.removeChild(m._hPanel);
         }
         m.dispose();
      }
      cs.clear();
      o._controls.clear();
   }
}
function FUiListBox_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FUiListItem(o){
   o = RClass.inherits(this, o, FUiControl);
   o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   o._checked        = false;
   o._hPanel         = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = FUiListItem_onBuildPanel;
   o.onBuild         = FUiListItem_onBuild;
   o.onEnter         = FUiListItem_onEnter;
   o.onLeave         = FUiListItem_onLeave;
   o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListItem_onClick);
   o.label           = FUiListItem_label;
   o.setLabel        = FUiListItem_setLabel;
   o.setChecked      = FUiListItem_setChecked;
   o.dispose         = FUiListItem_dispose;
   return o;
}
function FUiListItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
}
function FUiListItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o._hIconPanel = RBuilder.appendTableCell(h, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
}
function FUiListItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiListItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}
function FUiListItem_label(p){
   return this._label;
}
function FUiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}
function FUiListItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiListItem_dispose(){
   var o = this;
   o._hPanel = RHtml.free(o._hPanel);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hLabel = RHtml.free(o._hLabel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiListView(o){
   o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick, MListenerDoubleClick);
   o._sizeCd           = EUiSize.Horizontal
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._focusItem        = null;
   o._itemPool         = null;
   o._hForm            = null;
   o.onBuildPanel      = FUiListView_onBuildPanel;
   o.onBuild           = FUiListView_onBuild;
   o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiListView_onClick);
   o.construct         = FUiListView_construct;
   o.focusItem         = FUiListView_focusItem;
   o.createItem        = FUiListView_createItem;
   o.appendChild       = FUiListView_appendChild;
   o.selectItem        = FUiListView_selectItem;
   o.doClickItem       = FUiListView_doClickItem;
   o.doDoubleClickItem = FUiListView_doDoubleClickItem;
   o.clear             = FUiListView_clear;
   o.dispose           = FUiListView_dispose;
   return o;
}
function FUiListView_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiListView_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
}
function FUiListView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
function FUiListView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._itemPool = RClass.create(FObjectPool);
}
function FUiListView_focusItem(){
   return this._focusItem;
}
function FUiListView_createItem(clazz, pi, pl){
   var o = this;
   var item = o._itemPool.alloc();
   if(!item){
      if(clazz){
         item = RClass.create(clazz);
      }else{
         item = RClass.create(FUiListViewItem);
      }
      item.build(o._hPanel);
   }
   return item;
}
function FUiListView_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiListView_selectItem(item){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.valueAt(i);
         if(RClass.isClass(component, FUiListViewItem)){
            component.setChecked(component == item);
         }
      }
   }
   o._focusItem = item;
}
function FUiListView_doClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new SClickEvent(o);
   event.item = item;
   o.processClickListener(event);
   event.dispose();
}
function FUiListView_doDoubleClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new SClickEvent(o);
   event.item = item;
   o.processDoubleClickListener(event);
   event.dispose();
}
function FUiListView_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListViewItem)){
            o._hPanel.removeChild(m._hPanel);
            o._itemPool.free(m)
         }else{
            m.dispose();
         }
      }
      cs.clear();
      o._controls.clear();
   }
}
function FUiListView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FUiListViewItem(o){
   o = RClass.inherits(this, o, FUiControl);
   o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
   o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
   o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
   o._styleContent   = RClass.register(o, new AStyle('_styleContent'));
   o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   o._checked        = false;
   o._contentHeight  = 28;
   o._hPanel         = null;
   o._hBorder        = null;
   o._hForm          = null;
   o._hContentForm   = null;
   o._hContentLine   = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = FUiListViewItem_onBuildPanel;
   o.onBuild         = FUiListViewItem_onBuild;
   o.onEnter         = FUiListViewItem_onEnter;
   o.onLeave         = FUiListViewItem_onLeave;
   o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListViewItem_onClick);
   o.onDoubleClick   = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiListViewItem_onDoubleClick);
   o.label           = FUiListViewItem_label;
   o.setLabel        = FUiListViewItem_setLabel;
   o.setChecked      = FUiListViewItem_setChecked;
   o.dispose         = FUiListViewItem_dispose;
   return o;
}
function FUiListViewItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiListViewItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   var hBorder = o._hBorder = RBuilder.appendDiv(h, o.styleName('Normal'));
   var hTable = o._hForm = RBuilder.appendTable(hBorder, o.styleName('Form'));
   var hLine1 = o._hLine1 = RBuilder.appendTableRowCell(hTable)
   var hLine2 = o._hLine2 = RBuilder.appendTableRowCell(hTable)
   hLine2.height = o._contentHeight;
   var hContentForm = o._hContentForm = RBuilder.appendTable(hLine2, o.styleName('Content'));
   var hContentLine = o._hContentLine = RBuilder.appendTableRow(hContentForm);
   o._hIconPanel = RBuilder.appendTableCell(hContentLine, o.styleName('IconPanel'))
   o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), RString.nvl(o._icon, 'tools.select'));
   RHtml.displaySet(o._hIcon, false);
   o._hLabel = RBuilder.appendTableCell(hContentLine, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
function FUiListViewItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiListViewItem_onLeave(){
   var o = this;
   o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiListViewItem_onClick(p){
   var o = this;
   o._parent.doClickItem(o);
}
function FUiListViewItem_onDoubleClick(p){
   var o = this;
   o._parent.doDoubleClickItem(o);
}
function FUiListViewItem_label(p){
   return this._label;
}
function FUiListViewItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}
function FUiListViewItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hBorder.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiListViewItem_dispose(){
   var o = this;
   o._hPanel = RHtml.free(o._hPanel);
   o._hBorder = RHtml.free(o._hBorder);
   o._hForm = RHtml.free(o._hForm);
   o._hLine1 = RHtml.free(o._hLine1);
   o._hLine2 = RHtml.free(o._hLine2);
   o._hContentForm = RHtml.free(o._hContentForm);
   o._hContentLine = RHtml.free(o._hContentLine);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hLabel = RHtml.free(o._hLabel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiMemo(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiMemo_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiMemo_onInputEdit);
   o.construct        = FUiMemo_construct;
   o.formatDisplay    = FUiMemo_formatDisplay;
   o.formatValue      = FUiMemo_formatValue;
   o.get              = FUiMemo_get;
   o.set              = FUiMemo_set;
   o.refreshValue     = FUiMemo_refreshValue;
   return o;
}
function FUiMemo_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.append(hep, 'TEXTAREA', o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiMemo_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiMemo_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiMemo_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiMemo_formatValue(p){
   return p;
}
function FUiMemo_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiMemo_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiMemo_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MPropertyNumber);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm  = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel     = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel   = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o._iconUp           = null;
   o._iconDown         = null;
   o.onBuildEditValue  = FUiNumber_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber_onInputChanged);
   o.construct         = FUiNumber_construct;
   o.formatDisplay     = FUiNumber_formatDisplay;
   o.formatValue       = FUiNumber_formatValue;
   o.get               = FUiNumber_get;
   o.set               = FUiNumber_set;
   return o;
}
function FUiNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hip = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hip, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
}
function FUiNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiNumber_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._editSize.set(100, 20);
   o._inputSize = new SSize2(80, 0);
}
function FUiNumber_formatDisplay(p){
   var o = this;
   var r = o._dataDisplay = RFloat.format(p, 0, null, o._valuePrecision, null);
   return r;
}
function FUiNumber_formatValue(p){
   return p;
}
function FUiNumber_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = o.formatValue(h.value);
   }
   return r;
}
function FUiNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   var h = o._hInput;
   if(h){
      h.value = o.formatDisplay(p);
   }
   o.changeSet(false);
}
function FUiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiNumber_setText(t){
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
function FUiNumber_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumberConsole).focus(o, FUiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber_drop(){
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
function FUiNumber2(o){
   o = RClass.inherits(this, o, FUiEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber2_onBuildEditValue;
   o.construct        = FUiNumber2_construct;
   o.get              = FUiNumber2_get;
   o.set              = FUiNumber2_set;
   return o;
}
function FUiNumber2_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber2_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber2_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
}
function FUiNumber2_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber2_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber2_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber2_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiNumber2_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber2_setText(t){
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
function FUiNumber2_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber2Console).focus(o, FUiNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber2_drop(){
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
function FUiNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber2_link(){
   var o = this;
}
function FUiNumber3(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel  = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o.onBuildEditInput  = FUiNumber3_onBuildEditInput;
   o.onBuildEditValue  = FUiNumber3_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber3_onInputChanged);
   o.construct         = FUiNumber3_construct;
   o.get               = FUiNumber3_get;
   o.set               = FUiNumber3_set;
   return o;
}
function FUiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
function FUiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput1 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput2 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInput3 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
}
function FUiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiNumber3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SPoint3();
   o._innerDataValue = new SPoint3();
}
function FUiNumber3_get(p){
   var o = this;
   o.__base.FUiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   var h = o._hInput1;
   if(h){
      v.x = RFloat.parse(h.value);
   }
   var h = o._hInput2;
   if(h){
      v.y = RFloat.parse(h.value);
   }
   var h = o._hInput3;
   if(h){
      v.z = RFloat.parse(h.value);
   }
   return v;
}
function FUiNumber3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var a = arguments;
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
   var h = o._hInput1;
   if(h){
      h.value = RFloat.format(vd.x, 0, null, 3, null);
   }
   var h = o._hInput2;
   if(h){
      h.value = RFloat.format(vd.y, 0, null, 3, null);
   }
   var h = o._hInput3;
   if(h){
      h.value = RFloat.format(vd.z, 0, null, 3, null);
   }
   o.changeSet(false);
}
function FUiNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
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
function FUiNumber3_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
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
function FUiNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber3_link(){
   var o = this;
}
function FUiNumber4(o){
   o = RClass.inherits(this, o, FUiEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber4_onBuildEditValue;
   o.construct        = FUiNumber4_construct;
   o.get              = FUiNumber4_get;
   o.set              = FUiNumber4_set;
   return o;
}
function FUiNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderRight = '1px solid #666666';
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
   var hc3 = RBuilder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   hc3.style.borderRight = '1px solid #666666';
   var he3 = o._hInput3 = RBuilder.appendEdit(hc3, o.styleName('Input'));
   var hc4 = RBuilder.appendTableCell(hr);
   hc4.style.borderLeft = '1px solid #999999';
   var he4 = o._hInput4 = RBuilder.appendEdit(hc4, o.styleName('Input'));
}
function FUiNumber4_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber4_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber4_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiNumber4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber4_setText(t){
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
function FUiNumber4_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber4Console).focus(o, FUiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber4_drop(){
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
function FUiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber4_link(){
   var o = this;
}
function FUiPanel(o){
   o = RClass.inherits(this, o, FUiLayout, MUiDesign, MUiFocus);
   o._sizeCd      = EUiSize.Horizontal;
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleBody   = RClass.register(o, new AStyle('_styleBody', 'Body'));
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   o.onBuildPanel = FUiPanel_onBuildPanel;
   o.onTitleClick = RClass.register(o, new AEventClick('onTitleClick'), FUiPanel_onTitleClick);
   return o;
}
function FUiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   var hl = RBuilder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = RBuilder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = RBuilder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = RBuilder.appendIcon(hri, null, o._imageMinus);
   var hrt = RBuilder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   var hb = o._hBody = RBuilder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = RBuilder.appendTable(hb, o.styleName('Form'));
}
function FUiPanel_onTitleClick(p){
   var o = this;
   var s = !o._statusBody;
   o._statusBody = s;
   o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
   RHtml.displaySet(o._hBody, s);
}
function FUiPanelHorizontal(o){
   o = RClass.inherits(this, o, FUiLayoutHorizontal);
   return o;
}
function FUiPanelVertical(o){
   o = RClass.inherits(this, o, FUiLayoutVertical);
   return o;
}
function FUiPicture(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescEdit);
   o.storeType         = RClass.register(o, new TPtyStr('storeType'));
   o.storeCode         = RClass.register(o, new TPtyStr('storeCode'));
   o.storeName         = RClass.register(o, new TPtyStr('storeName'));
   o.editAdjust        = RClass.register(o, new TPtyInt('editAdjust'));
   o.editMaxWidth      = RClass.register(o, new TPtyInt('editMaxWidth'));
   o.editMaxHeight     = RClass.register(o, new TPtyInt('editMaxHeight'));
   o.__seed            = 0;
   o.attributes        = null;
   o.border            = null;
   o.borderStyle       = EUiBorder.Round;
   o.onUploadMouseDown = RClass.register(o, new HMouseDown('onUploadMouseDown'), FUiPicture_onUploadMouseDown);
   o.onFileUploaded    = FUiPicture_onFileUploaded;
   o.onBuildEdit       = FUiPicture_onBuildEdit;
   o.construct         = FUiPicture_construct;
   o.makeIconPath      = FUiPicture_makeIconPath;
   o.setText           = FUiPicture_setText;
   o.setEditable       = FUiPicture_setEditable;
   o.dispose           = FUiPicture_dispose;
   return o;
}
function FUiPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      var uw = RConsole.find(FUploadConsole).findWindow();
      uw.lsnsUploaded.register(o, o.onFileUploaded);
      uw.typeCode = 'P';
      uw.fileEdit = false;
      uw.recordCode = o.recordCode;
      uw.recordGuid = o.recordGuid;
      uw.recordName = o.recordName;
      uw.guid = o.guid;
      uw.adjustWidth = o.editWidth;
      uw.adjustHeight = o.editHeight;
      uw.show();
   }
}
function FUiPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}
function FUiPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = RBuilder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   var h = o.hImage = RBuilder.append(hc, 'IMAGE');
   h.style.border = '1 solid #CCCCCC';
   h.style.display = 'none';
   if(o.left>0 && o.top>0){
      o.hPanel.style.position = 'absolute';
   }
}
function FUiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new TAttributes();
}
function FUiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
}
function FUiPicture_setText(t){
   var o = this;
   var as = o.attributes;
   as.clear();
   var v = false;
   if(!RString.isEmpty(t)){
      as.unpack(t);
      o.networkCode = as.get('nc');
      o.recordCode = as.get('code');
      o.recordGuid = as.get('guid');
      o.recordName = as.get('name');
      o.guid = as.get('ogid');
      o.mime = as.get('mime');
      if(o.guid && o.mime){
         v = true;
         o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
      }
   }
   o.hImage.style.display = v ? 'block' : 'none';
}
function FUiPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
function FUiPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
function FUiProgressBar(o){
   o = RClass.inherits(this, o, FUiControl);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._rate        = 0;
   o._hForm       = null;
   o.onBuildPanel = FUiProgressBar_onBuildPanel;
   o.onBuild      = FUiProgressBar_onBuild;
   o.get          = FUiProgressBar_get;
   o.set          = FUiProgressBar_set;
   o.dispose      = FUiProgressBar_dispose;
   return o;
}
function FUiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}
function FUiProgressBar_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
   var hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
   o.hProgress = RBuilder.appendTableCell(hLine);
   o.hEmpty = RBuilder.appendTableCell(hLine);
}
function FUiProgressBar_get(){
   return this._rate;
}
function FUiProgressBar_set(value){
   var o = this;
   o._rate = value;
}
function FUiProgressBar_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   o.__base.FUiControl.dispose.call(o);
}
function FUiRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   o._groupName       = RClass.register(o, new APtyString('_groupName'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = FUiRadio_onBuildEditValue;
   return o;
}
function FUiRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
function FUiRadio_clearValue(){
   this.hEdit.checked = false;
}
function FUiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
function FUiRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
function FUiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
function FUiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
function FUiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
function FUiSelect(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiContainer, MPropertySelect, MListenerDataChanged);
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiSelect_onBuildEditValue;
   o.onDoubleClick    = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiSelect_onDropClick);
   o.onDropClick      = FUiSelect_onDropClick;
   o.onKeyDown        = RClass.register(o, new AEventKeyDown('onKeyDown'), FUiSelect_onKeyDown);
   o.construct        = FUiSelect_construct;
   o.findItemByLabel  = FUiSelect_findItemByLabel;
   o.findItemByData   = FUiSelect_findItemByData;
   o.formatValue      = FUiSelect_formatValue;
   o.formatDisplay    = FUiSelect_formatDisplay;
   o.get              = FUiSelect_get;
   o.set              = FUiSelect_set;
   o.selectItem       = FUiSelect_selectItem;
   o.refreshValue     = FUiSelect_refreshValue;
   o.drop             = FUiSelect_drop;
   o.dispose          = FUiSelect_dispose;
   return o;
}
function FUiSelect_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   var c = o._emptyItem = RClass.create(FUiSelectItem);
   c.build(p);
   o.push(c);
}
function FUiSelect_onDropClick(p){
   this.drop();
}
function FUiSelect_onKeyDown(p){
   var o = this;
   var e = o._editor;
   if(e && e._statusEditing && (e._source == o)){
      e.onEditKeyDown(p);
      return;
   }
   if(p.keyCode == EKeyCode.Down){
      o.drop();
   }
}
function FUiSelect_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
}
function FUiSelect_findItemByLabel(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._label, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_findItemByData(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._dataValue, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_formatValue(p){
   var o = this;
   var c = o.findItemByLabel(p);
   if(c){
      return RString.nvl(c._dataValue);
   }
   return p;
}
function FUiSelect_formatDisplay(p){
   var o = this;
   var c = o.findItemByData(p);
   if(c){
      return RString.nvl(c._label);
   }
   return p;
}
function FUiSelect_get(){
   var o = this;
   var s = o._hInput.value;
   var v = o.formatValue(s);
   return v;
}
function FUiSelect_set(p){
   var o = this;
   var t = o.formatDisplay(p);
   o._hInput.value = RString.nvl(t);
}
function FUiSelect_selectItem(p){
   var o = this;
   o._hInput.value = RString.nvl(p.label());
   o.refreshValue();
}
function FUiSelect_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var e = o._editor = RConsole.find(FUiEditorConsole).focus(o, FUiSelectEditor, o._name);
      e.buildItems(o);
      e.set(o.get());
      e.show();
   }
}
function FUiSelect_dispose(){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o);
}
function FUiSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiSelect_loadConfig(c){
   var o = this;
   o.__base.FUiEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   if(!o.editCheck){
      o.items.create('', '');
   }
   o.items.loadConfig(c);
   var ns = c.nodes;
   if(ns){
   var nc = ns.count;
      for(var n = 0; n < nc; n++){
        var p = ns.get(n);
         if(p.isName('Event')){
            var e = RClass.create(FEvent);
             e.loadConfig(p);
             o.push(e);
         }
      }
   }
   return EStatus.Stop;
}
function FUiSelect_refreshStyle(){
   var o = this;
   o.__base.FUiEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FUiSelect_doBlur(){
   var o = this;
   o.__base.FUiEditControl.doBlur.call(o);
   if(o._editor){
      o._editor.hide();
   }
}
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor, MListenerItemClick);
   o._items         = null;
   o._position      = null;
   o._hDropLayout   = null;
   o._hItemsForm    = null;
   o.onBuildDrop   = FUiSelectEditor_onBuildDrop;
   o.onItemClick   = FUiSelectEditor_onItemClick;
   o.onEditKeyDown = FUiSelectEditor_onEditKeyDown;
   o.onEditEnd     = FUiSelectEditor_onEditEnd;
   o.construct     = FUiSelectEditor_construct;
   o.testBlur      = FUiSelectEditor_testBlur;
   o.buildItems    = FUiSelectEditor_buildItems;
   o.clearItems    = FUiSelectEditor_clearItems;
   o.get           = FUiSelectEditor_get;
   o.set           = FUiSelectEditor_set;
   o.select        = FUiSelectEditor_select;
   o.fetch         = FUiSelectEditor_fetch;
   o.setVisible    = FUiSelectEditor_setVisible;
   o.dispose       = FUiSelectEditor_dispose;
   return o;
}
function FUiSelectEditor_onBuildDrop(){
   var o = this;
   var hl = o._hDropLayout = RBuilder.appendDiv(o._hDropPanel)
   var hf = o._hItemsForm = RBuilder.appendTable(hl);
   o._hItemsBody = RBuilder.append(hf, 'TBODY');
}
function FUiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}
function FUiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case EKeyCode.Enter:
         o.editEnd();
         break;
      case EKeyCode.Esc:
         o.editCancel();
         break;
   }
}
function FUiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FUiDropEditor.onEditEnd.call(o);
}
function FUiSelectEditor_construct(){
   var o = this;
   o.__base.FUiDropEditor.construct.call(o);
}
function FUiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}
function FUiSelectEditor_clearItems(){
   var o = this;
   var hb = o._hItemsBody;
   var cs = o._items;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var ci = cs.value(i);
         ci.removeClickListener(o, o.onItemClick);
         hb.removeChild(ci._hPanel);
      }
   }
   o._position = 0;
}
function FUiSelectEditor_buildItems(p){
   var o = this;
   var hb = o._hItemsBody;
   var cs = p.components();
   if(cs == o._items){
      return;
   }else{
      o.clearItems();
   }
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var ci = cs.value(i);
      ci.addClickListener(o, o.onItemClick);
      ci.setPanel(hb);
   }
   o._position = 0;
   o._items = cs;
}
function FUiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}
function FUiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(RString.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
function FUiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   var n = RInteger.toRange(p, 0, c - 1);
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}
function FUiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
function FUiSelectEditor_setVisible(p){
   var o = this;
   o.__base.FUiDropEditor.setVisible.call(o, p);
   var hp = o._hPanel;
   var hif = o._hItemsForm;
   if(p){
      var s = o._source;
      var r = s.getValueRectangle(RValue.rectangle);
      hif.width = '';
      var iw = hif.offsetWidth;
      hp.style.left = r.left() + 'px';
      hp.style.top = r.bottom() + 'px';
      hp.style.width = Math.max(iw, r.width()) + 'px';
      hif.width = '100%';
      if(hif.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}
function FUiSelectEditor_dispose(){
   var o = this;
   o._hDropLayout = RHtml.free(o._hDropLayout);
   o._hItemsForm = RHtml.free(o._hItemsForm);
   o.__base.FUiDropEditor.dispose.call(o);
}
function FUiSelectItem(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._note             = RClass.register(o, new APtyString('_note'));
   o._dataValue        = RClass.register(o, new APtyString('_dataValue'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconChecked = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleNote        = RClass.register(o, new AStyle('_styleNote'));
   o._checked          = false;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   o.onBuildPanel      = FUiSelectItem_onBuildPanel;
   o.onBuild           = FUiSelectItem_onBuild;
   o.onEnter           = FUiSelectItem_onEnter;
   o.onLeave           = FUiSelectItem_onLeave;
   o.onMouseDown       = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiSelectItem_onMouseDown);
   o.setChecked        = FUiSelectItem_setChecked;
   o.set               = FUiSelectItem_set;
   o.dispose           = FUiSelectItem_dispose;
   return o;
}
function FUiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName("Normal"));
}
function FUiSelectItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   var hp = o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
   hp.width = 18;
   hp.align = 'center';
   var hp = o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
   if(o._label){
      hp.innerHTML = o._label;
   }else{
      hp.innerHTML = '&nbsp;';
   }
   o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
}
function FUiSelectItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
}
function FUiSelectItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
function FUiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = RString.nvl(icon);
   if(!RString.isEmpty(o._icon)){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = RString.nvl(label);
   o._value = RString.nvl(value);
   o._note = RString.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}
function FUiSelectItem_dispose(){
   var o = this;
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hNotePanel = RHtml.free(o._hNotePanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiSlideNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyNumber, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._styleSlidePanel    = RClass.register(o, new AStyle('_styleSlidePanel'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm    = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel       = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel     = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._slide              = null;
   o._hInput             = null;
   o._iconUp             = null;
   o._iconDown           = null;
   o.onBuildEditValue    = FUiSlideNumber_onBuildEditValue;
   o.onMouseCaptureStart = FUiSlideNumber_onMouseCaptureStart;
   o.onMouseCapture      = FUiSlideNumber_onMouseCapture;
   o.onMouseCaptureStop  = FUiSlideNumber_onMouseCaptureStop;
   o.onSlideChange       = FUiSlideNumber_onSlideChange;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiSlideNumber_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiSlideNumber_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiSlideNumber_onInputChange);
   o.construct           = FUiSlideNumber_construct;
   o.get                 = FUiSlideNumber_get;
   o.set                 = FUiSlideNumber_set;
   o.setInputValue       = FUiSlideNumber_setInputValue;
   o.refreshValue        = FUiSlideNumber_refreshValue;
   return o;
}
function FUiSlideNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.__linker = o;
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hsp = o._hSlidePanel = RBuilder.appendTableCell(hl, o.styleName('SlidePanel'));
   var b = o._slide = new SUiSlide();
   b.control = o;
   b.hPanel = hsp;
   b.setRange(o._valueMin, o._valueMax);
   b.onSlideChange = o.onSlideChange;
   b.build();
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   o.attachEvent('onInputChange', he, o.onInputChange);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
}
function FUiSlideNumber_onMouseCaptureStart(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseDown(p);
   }
}
function FUiSlideNumber_onMouseCapture(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseMove(p);
   }
}
function FUiSlideNumber_onMouseCaptureStop(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseUp(p);
   }
}
function FUiSlideNumber_onSlideChange(p){
   var o = this;
   o.setInputValue(p);
   o.refreshValue();
}
function FUiSlideNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiSlideNumber_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.refreshValue();
}
function FUiSlideNumber_onInputChange(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.setInputValue(v);
   o.refreshValue();
}
function FUiSlideNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiSlideNumber_get(p){
   var o = this;
   var v = o._hInput.value;
   var r = RFloat.parse(v);
   return RFloat.toRange(r, o._valueMin, o._valueMax);
}
function FUiSlideNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._slide.set(v);
   o.setInputValue(v);
   o.changeSet(false);
}
function FUiSlideNumber_setInputValue(p){
   var o = this;
   var v = RFloat.parse(p);
   if(isNaN(v)){
      return;
   }
   v = RFloat.toRange(v, o._valueMin, o._valueMax);
   o._dataDisplay = RFloat.format(v, 0, null, 2, null);
   o._hInput.value = o._dataDisplay;
}
function FUiSlideNumber_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSplit(o){
   o = RClass.inherits(this, o, FUiControl);
   return o;
}
function FUiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
function FUiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
function FUiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
function FUiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
function FUiSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
   o.height = 2;
   if(RString.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FUiSplit_Panel') + ')';
      RBuilder.appendEmpty(hc, 4);
      o.hImage = RBuilder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hc, o._icon);
      }
      o.hText = RBuilder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(RString.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(RString.equals(o._dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   return EEventStatus.Stop;
}
function FUiSplit_oeMode(e){
   var o = this;
   var r = o.base.FUiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
function FUiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
function FUiSplit_extend(v){
   var o = this;
   if(EMode.Design == o._emode){
      return;
   }
   if(o.extended == v){
      return;
   }
   o.extended = v;
   if(o.hImage){
      o.hImage.src = v ? RResource._iconPath(o._iconMinus) : RRes._iconPath(o._iconPlus);
   }
   var c = o.__lines.count;
   for(var n=0; n<c; n++){
      o.__lines.get(n).style.display = v ? 'block' : 'none';
   }
   o.topControl().topResize(o);
}
function FUiSplit_pushLine(hr){
   this.__lines.push(hr);
}
function FUiSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
function FUiTemplate(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiTemplate_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiTemplate_onInputEdit);
   o.construct        = FUiTemplate_construct;
   o.formatDisplay    = FUiTemplate_formatDisplay;
   o.formatValue      = FUiTemplate_formatValue;
   o.get              = FUiTemplate_get;
   o.set              = FUiTemplate_set;
   o.refreshValue     = FUiTemplate_refreshValue;
   return o;
}
function FUiTemplate_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiTemplate_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiTemplate_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiTemplate_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiTemplate_formatValue(p){
   return p;
}
function FUiTemplate_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiTemplate_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiTemplate_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiText(o){
   o = RClass.inherits(this, o, FUiTextControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiText_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiText_onInputEdit);
   o.construct        = FUiText_construct;
   o.formatDisplay    = FUiText_formatDisplay;
   o.formatValue      = FUiText_formatValue;
   o.get              = FUiText_get;
   o.set              = FUiText_set;
   o.refreshValue     = FUiText_refreshValue;
   return o;
}
function FUiText_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiText_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiText_construct(){
   var o = this;
   o.__base.FUiTextControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiText_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   o._dataDisplay = r;
   return r;
}
function FUiText_formatValue(p){
   return p;
}
function FUiText_get(){
   var o = this;
   var r = o.__base.FUiTextControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiText_set(p){
   var o = this;
   o.__base.FUiTextControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiText_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
var EGridColumn = new function EGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
var EGridDisplay = new function EGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
   o._table       = null;
   o._column      = null;
   o._row         = null;
   o.onBuildPanel = FCell_onBuildPanel;
   o.onBuild      = FCell_onBuild;
   o.oeDataLoad   = FCell_oeDataLoad;
   o.oeDataSave   = FCell_oeDataSave;
   return o;
}
function FCell_onBuildPanel(p) {
   var o = this;
   o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
}
function FCell_onBuild(p){
   var o = this;
   o.__base.FControl.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   RHtml.linkSet(h, 'control', o);
}
function FCell_oeDataLoad(p){
   var o = this;
   var c = o._column;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(c._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FCell_oeDataSave(p){
   var o = this;
   var c = o._column;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(c._dataName, v);
   return EEventStatus.Stop;
}
function FCell_doFocus(){
   var o = this;
   o._table.__focusCell = o;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}
function FCell_doBlur(){
   var o = this;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
function FCell_descriptor(){
   return this._column;
}
function FCell_text(){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      return o._hPanel.innerHTML;
   }else if(c._absEdit && o._hEdit){
      return o._hEdit.value;
   }else if(o._hEditPanel){
      return o._hEditPanel.innerText;
   }
   return '';
}
function FCell_setText(t){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      o._hPanel.innerHTML = t;
   }else if(c._absEdit && o._hEdit){
      o._hEdit.value = t;
   }else if(o._hEditPanel){
      o._hEditPanel.innerText = t;
   }
}
function FCell_focus(s){
   var o = this;
   var h = o._hEdit;
   if(h){
      o._column._table.selectRow(o._row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}
function FCell_setVisible(v){
   this._hPanel.style.display = v ? 'block' : 'none';
}
function FCell_refreshStyle(){
   var o = this;
   var t = o._table;
   var r = o._row;
   var s = r.isSelect;
   var he = o._hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   var bc = null;
   if(s){
      bc = EColor._rowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor._rowHover;
      }else{
         bc = EColor._rows[r.index % EColor._rows.length];
      }
   }
   if(o.__focus){
      bc = EColor._rowEditHover;
   }
   o._hPanel.style.backgroundColor = bc;
}
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hPanel);
   o._hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o._hEditPanel = null;
   o._hEdit = null;
   o.hDropPanel = null;
   o.hDrop = null;
}
function FCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
function FCellButton(o){
   o = RClass.inherits(this, o, FCell);
   o.buttons           = null;
   o.attributes        = null;
   o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FCellButton_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FCellButton_onButtonLeave);
   o.onCellLeave       = RClass.register(o, new AEventMouseLeave('onCellLeave'), FCellButton_onCellLeave);
   o.onHintEnter       = RClass.register(o, new AEventMouseEnter('onHintEnter'), FCellButton_onHintEnter);
   o.onHintLeave       = RClass.register(o, new AEventMouseLeave('onHintLeave'), FCellButton_onHintLeave);
   o.onButtonClick     = RClass.register(o, new AEventClick('onButtonClick'), FCellButton_onButtonClick);
   o.construct         = FCellButton_construct;
   o.isDataChanged     = RMethod.emptyFalse;
   o.findButtonByPanel = FCellButton_findButtonByPanel;
   o.buildForm         = FCellButton_buildForm;
   o.set               = FCellButton_set;
   o.modifyButton      = FCellButton_modifyButton;
   o.refreshStyle      = FCellButton_refreshStyle;
   return o;
}
function FCellButton_onButtonEnter(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = 'black';
      hs.cursor = 'hand';
      if(b.hintBox){
        b.hintBox.style.display = "block";
       }
   }
   if (o.hHintPanel) {
      o.hHintPanel.style.display = '';
   }
}
function FCellButton_onButtonLeave(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = '#0661B0';
      hs.cursor = 'normal';
   }
}
function FCellButton_onHintEnter(e){
   var o = this;
   e.hSource.style.backgroundColor = "#eeeeee";
}
function FCellButton_onCellLeave(e){
   var bs = this.buttons;
   var c = bs.count;
   for(var n = 0; n<c; n++){
      var b = bs.value(n);
      if(b.hintBox){
         b.hintBox.style.display='none';
      }
   }
}
function FCellButton_onHintLeave(e){
   e.hSource.style.backgroundColor = "#ffffff";
    e.hSource.style.display = "none";
}
function FCellButton_onButtonClick(e){
   var o = this;
   var t = o.table;
   t.clickCell(o);
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      b.button.callEvent('onClick', o, e);
   }
}
function FCellButton_construct(){
   var o = this;
   o.base.FCell.construct.call(o);
   o.attributes = new TAttributes();
}
function FCellButton_findButtonByPanel(h){
   var o = this;
   var bs = o.buttons;
   for(var n=0; n<bs.count; n++){
      var b = bs.value(n);
      if(b.hPanel == h){
         return b;
      }
   }
}
function FCellButton_buildForm(){
   var o = this;
   var c = o.column;
   var hp = o.hPanel;
   RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
   hp.align = 'left';
   hp.padding = 1;
   var hf = o.hForm = RBuilder.appendTable(o.hPanel);
   var hr = o.hFormLine = hf.insertRow();
   var bs = c.components;
   if(bs){
      o.buttons = new TMap();
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         var hc = hr.insertCell();
         hc.align = 'center';
         hc.style.padding = '0 3';
         var hbp = RBuilder.append(hc, 'DIV');
         var hi = null;
         if(b.icon){
            hi = RBuilder.appendIcon(hbp, b.icon);
         }else{
            hbp.style.padding = '2 6';
            hbp.style.color = '#0661B0';
            hbp.style.textDecoration = 'underline';
         }
         o.attachEvent('onButtonEnter', hbp, o.onButtonEnter);
         o.attachEvent('onButtonLeave', hbp, o.onButtonLeave);
         o.attachEvent('onButtonClick', hbp, o.onButtonClick);
         var ht = null;
         if(b.label){
            if(b.icon){
               hi.title = b.label;
            }else{
               ht = RBuilder.appendText(hbp, b.label);
            }
         }
         var cb = new TCellButton();
         cb.button = b;
         cb.hLayout = hc;
         cb.hPanel = hbp;
         cb.hIcon = hi;
         cb.hText = ht;
         o.buttons.set(b.name, cb);
      }
      var hfp = o.hHintPanel = o.hForm.insertRow().insertCell();
      hfp.height = 1;
      hfp.style.position = 'relative';
   }
}
function FCellButton_set(v){
   var o = this;
   if(!RString.isEmpty(v)){
      var pbs = new TAttributes();
      pbs.unpack(v);
      for(var n=0; n<pbs.count; n++){
         var b = o.buttons.get(pbs.name(n));
         var pk = pbs.value(n);
         if(b && !RString.isEmpty(pk)){
            var as = o.attributes;
            as.clear();
            as.unpack(pk);
            o.modifyButton(b, as);
         }
      }
   }
}
function FCellButton_modifyButton(b, as){
   var o = this;
   var bv = true;
   if(as.contains('visible')){
      bv = RBoolean.isTrue(as.get('visible'));
   }
   b.hLayout.style.display = bv ? 'block' : 'none';
   var pd = as.get('disabled');
   if(pd){
      if(RBoolean.isTrue(pd)){
         hc.style.padding = 3;
         hc.style.border = 0;
      }else{
         hc.style.padding = 2;
         hc.style.borderLeft = '1 solid #DDDDDD';
         hc.style.borderTop = '1 solid #DDDDDD';
         hc.style.borderRight = '1 solid #999999';
         hc.style.borderBottom = '1 solid #999999';
         hc.style.backgroundColor = '#FFFFFF';
      }
   }
   var pl = as.get('label');
   if(pl){
      if(b.icon){
         b.hIcon.title = pl;
      }else{
         b.hText.innerText = pl;
      }
   }
   if(as.contains('hint')){
      hfd = o.hFloatDrop = RBuilder.append(o.hHintPanel, 'DIV');
      hfd.style.borderLeft = '1 solid #CCCCCC';
      hfd.style.borderTop = '1 solid #CCCCCC';
      hfd.style.borderRight = '1 solid #666666';
      hfd.style.borderBottom = '1 solid #666666';
      hfd.style.zIndex = 40000;
      hfd.style.backgroundColor = '#FFFFFF';
      hfd.style.display = 'none';
      hfd.style.position = 'absolute'
      hfd.style.padding = '4 8';
      hfd.style.width = '300px';
      hfd.style.pixelTop = b.offsetHeight + 1;
      hfd.style.pixelLeft = b.hPanel.offsetWidth + 20;
      hfd.innerHTML = as.get('hint');
      o.attachEvent('onHintEnter', hfd, o.onHintEnter);
      o.attachEvent('onHintLeave', hfd, o.onHintLeave);
      b.hintBox = hfd;
   }
}
function FCellButton_refreshStyle(){
   var o = this;
   var r = o.row;
   var bc = null;
   if(r.isSelect){
      bc = EColor.RowSelect;
   }else{
      var ih = (o.column.table.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCellEdit(o){
   o = RClass.inherits(this, o, FCellEditControl);
   o._styleInput = RClass.register(o, new AStyle('_styleInput'));
   o._hInput     = null;
   o.onBuildEdit = FCellEdit_onBuildEdit;
   o.get         = FCellEdit_get;
   o.set         = FCellEdit_set;
   return o;
}
function FCellEdit_onBuildEdit(p){
   var o = this;
   var c = o._column;
   o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
}
function FCellEdit_get(){
   var r = o.__base.FCellEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FCellEdit_set(p){
   var o = this;
   o.__base.FCellEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FCellEdit_buildDrop(){
   var o = this;
   var c = o.column;
   if(!RString.isEmpty(c.lovRefer)){
      var hdp = o.hDropPanel;
      hdp.align = 'right';
      hdp.style.paddingRight = 2;
      var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FCellEdit_Lov', null, 16, 16);
      hli.style.borderLeft='1 solid #CCCCCC';
      hli.style.cursor = 'hand';
      c.linkEvent(o, 'onListClick', hli);
   }
}
function FCellEdit_setInfo(f){
   var o = this;
   o.base.FCellEditControl.setInfo.call(o, f);
   var d = o.column;
   var m = d.iconMap;
   var hi = o.hIcon;
   if(m && m.get(f.icon)){
      hi.style.display = 'block';
      hi.title = f.iconHint;
      hi.src = RResource.iconPath(m.get(f.icon));
   }else{
      if(hi){
         hi.style.display = 'none';
      }
   }
}
function FCellEdit_text(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      return o.hEdit.innerText;
   }
   if(c._absEdit){
      return o.hEdit.value;
   }
   return o.hEditPanel.innerText;
}
function FCellEdit_setText(t){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      o.hEdit.innerText = t;
   }else{
      if(c._absEdit){
         o.hEdit.value = t;
      }else{
         o.hEditPanel.innerText = t;
      }
   }
}
function FCellEditControl(o){
   o = RClass.inherits(this, o, FCell);
   o.onBuildIcon  = FCellEditControl_onBuildIcon;
   o.onBuildEdit  = FCellEditControl_onBuildEdit;
   o.onBuildDrop  = RMethod.empty;
   o.onBuildForm  = FCellEditControl_onBuildForm;
   o.onBuild      = FCellEditControl_onBuild;
   return o;
}
function FCellEditControl_onBuildIcon(p){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}
function FCellEditControl_onBuildEdit(p){
   var o = this;
   var c = o._column;
}
function FCellEditControl_onBuildForm(p){
   var o = this;
   var c = o._column;
   if(c._hasIconArea || c._hasDropArea){
      var hf = o.hForm = RBuilder.appendTable(o._hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.onBuildIcon(p);
      }
      o._hEditPanel = hr.insertCell();
      o.onBuildEdit(p);
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.onBuildDrop(p);
      }
   }else{
      var hep = o._hEditPanel = o._hPanel;
      o.onBuildEdit(p);
   }
}
function FCellEditControl_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   o.onBuildForm(p);
}
function FCellEditControl_getEditRange(){
   var o = this;
   var hc = o.hPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FCellEditControl_select(v){
   var o = this;
   var a = o.descriptor().isEditAble(o.row);
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
      }else{
         o.setEditStyle(EStyle.ReadonlySelect);
         o.column.disable();
      }
   }else{
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
      }else{
         o.setEditStyle(EStyle.Readonly);
         o.column.disable();
      }
   }
}
function FCellEditControl_setVisible(v){
   var o = this;
   o.hPanel.style.display = v ? 'block' : 'none';
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         var a = o.descriptor().isEditAble(o.row);
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
     }else{
       o.setEditStyle(EStyle.Readonly);
       o.column.disable();
     }
   }
}
function FCellEditControl_refreshStyle(){
   var o = this;
   var t = o.table;
   var c = o.column;
   var r = o.row;
   var hep = o.hEditPanel;
   var he = o.hEdit;
   var hd = o.hDrop;
   var e = c.isEditAble(r);
   var s = r.isSelect;
   var ce = e ? EColor.TextEdit : EColor.TextReadonly;
   if(he){
      he.readOnly = !e;
      if(!c.zoomRefer){
         he.style.color = ce;
      }
      if(hd){
         he.style.cursor = e? 'hand':'normal';
         hd.style.cursor = e? 'hand':'normal';
      }
   }
   if(hep){
      hep.style.color = ce;
   }
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   if(he){
      he.style.backgroundColor = bc;
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCellSelected(o){
   o = RClass.inherits(this, o, FCell);
   o._dataName  = '_select';
   o._styleEdit = RClass.register(o, new AStyle('_styleEdit'));
   o._hSelected = null;
   o.onBuild    = FCellSelected_onBuild;
   o.onSelected = FCellSelected_onSelected;
   return o;
}
function FCellSelected_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   var hs = o._hSelected = RBuilder.appendCheck(h, o.styleName('Edit'));
   hs.parent = o;
   hs.onclick = o.onSelected;
}
function FCellSelected_onSelected(p){
   var o = this;
}
function FCellSelected_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(t.dispSelected){
      o.hPanel.style.display = 'block';
      if(r.isSelect){
         o._hSelected.checked = true;
         o.hPanel.style.backgroundColor = '#CEE7FF';
      }else{
         o._hSelected.checked = false;
         o.hPanel.style.backgroundColor = '#FFFFFF';
      }
   }else{
      o.hPanel.style.display = 'none';
   }
}
function FCellSelected_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o._hSelected = null;
}
function FCellStatus(o){
   o = RClass.inherits(this, o, FCell);
   o._dataName = '_status';
   o._hStatus  = null;
   o.onBuild   = FCellStatus_onBuild;
   return o;
}
function FCellStatus_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   h.style.paddingTop = 2;
   h.style.paddingBottom = 2;
   h.style.cursor = 'normal';
   o._hStatus = RBuilder.appendIcon(h, null, 'n');
}
function FCellStatus_onStatusEnter(){
   this.row.table.getRowBar().linkCell(this);
}
function FCellStatus_setIcon(s){
   this._hStatus.src = s;
}
function FCellStatus_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(r.isDataChanged()){
      p = 'Changed';
   }else{
      p = t.isFormLinked() ? 'Normal' : 'Normal';
   }
   o.setIcon(o.column.styleIconPath(p));
}
function FCellStatus_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o._hStatus = null;
}
function FColumn(o){
   o = RClass.inherits(this, o, FControl, MDataField);
   o._displayList       = true;
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
   o._cellClass         = FCell;
   o._hForm             = null;
   o._hFormLine         = null;
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o.onBuildLabel       = FColumn_onBuildLabel;
   o.onBuildSearchIcon  = RMethod.empty;
   o.onBuildSearchEdit  = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop  = RMethod.empty;
   o.onBuildSearchForm  = FColumn_onBuildSearchForm;
   o.onBuildSearch      = FColumn_onBuildSearch;
   o.onBuildTotal       = FColumn_onBuildTotal;
   o.onBuildPanel       = FColumn_onBuildPanel;
   o.onBuild            = FColumn_onBuild;
   o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
   o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
   o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
   o.createCell         = FColumn_createCell;
   return o;
}
function FColumn_onBuildLabel(p){
   var o = this;
   var hr = o._hFormLine;
   if (o._icon) {
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      o._hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   var hl = o._hLabel = RBuilder.appendTableCell(hr);
   hl.innerHTML = RString.nvl(o.label());
   var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
   var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
}
function FColumn_onBuildSearchEdit(p){
   var o = this;
   var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
   var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
}
function FColumn_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o._hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
      o._hSearchPanel.style.backgroundColor = '#EEEFF1';
      o._hSearchPanel.style.borderLeft='1 solid #808080';
      o._hSearchPanel.style.borderTop='1 solid #808080';
      o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
      return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FColumn_onBuildSearch(p){
   var o = this;
   var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.linkSet(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm(p);
}
function FColumn_onBuildTotal(p){
   var o = this;
   var h = o._hTotalPanel = RBuilder.create(p, 'TD');
   RHtml.linkSet(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FColumn_onBuildPanel(p) {
   var o = this;
   o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
}
function FColumn_onBuild(p) {
   var o = this;
   var t = o.table;
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!RString.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   if (!RString.isEmpty(o._viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.__base.FControl.onBuild.call(o, p);
   var hp = o._hPanel;
   hp.style.padding = 4;
   var hf = o._hForm = RBuilder.appendTable(hp);
   if (!o._orderAble) {
     hf.style.cursor = 'hand';
   }
   var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
   o.onBuildLabel(p);
   o.onBuildSearch(p);
   o.onBuildTotal(p);
   var h = o._hFixPanel = RBuilder.create(p, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(o._size.width < 40){
      o._size.width = 40;
   }
   RHtml.setSize(h, o._size);
   o._hPanel.style.pixelWidth = o.width;
   o._hFixPanel.style.pixelWidth = o.width;
}
function FColumn_createCell(p) {
   var o = this;
   var c = RClass.create(o._cellClass);
   var t = c._table = o._table;
   c._name = o._name;
   c._column = o;
   c.build(t._hPanel);
   c.setVisible(o._displayList);
   return c;
}
function FColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}
function FColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}
function FColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
function FColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
function FColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
function FColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o._displayList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._displayList);
   }
}
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
function FColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
function FColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
function FColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}
function FColumn_onEditChanged(cell) {
   cell.row.refresh();
}
function FColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FColumnButton)){
	   var l = o._hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c._hSortUp.style.display = 'none';
	            c._hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o._hSortUp.style.display = 'none';
	            o._hSortDown.style.display = 'block';
	         } else {
	            o._hSortUp.style.display = 'block';
	            o._hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         tbl.dsSearch();
	      }
   }
   }
}
function FColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.styleName('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FColumn_searchValue() {
   var o = this;
   if(o._hSearchEdit){
      return o._hSearchEdit.value;
   }
}
function FColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}
function FColumn_cell(r){
   return r.cell(this.index);
}
function FColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function FColumn_setWidth(w){
   var o = this;
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
}
function FColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
function FColumn_getEditRange(){
   var o = this;
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FColumn_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hSearchPanel);
   RMemory.freeHtml(o._hFixPanel);
   o._hForm = null;
   o._hFormLine = null;
   o._hIconPanel = null;
   o._hIcon = null;
   o._hHeadPanel = null;
   o._hLabel = null;
   o._hSortPanel = null;
   o._hSortUp = null;
   o._hSortDown = null;
   o._hSearchPanel = null;
   o._hSearchForm = null;
   o._hSearchFormLine = null;
   o._hSearchIconPanel = null;
   o._hSearchIcon = null;
   o._hSearchEditPanel = null;
   o._hSearchEdit = null;
   o._hSearchDropPanel = null;
   o._hSearchDrop = null;
   o._hFixPanel = null;
}
function FColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
function FColumnButton(o){
   o = RClass.inherits(this, o, FColumn);
   o.__cellClass = FCellButton;
   return o;
}
function FColumnEdit(o){
   o = RClass.inherits(this, o, FColumnEditControl, MPropertyEdit);
   o._cellClass     = FCellEdit;
   return o;
}
function FColumnEdit_onCellMouseEnter(s, e){
}
function FColumnEdit_onCellMouseLeave(s, e){
}
function FColumnEdit_onListClick(s, e){
   var o = this;
   o.table.__focusCell = s;
   var cvs = s.row.saveRow().toAttributes();
   o.doListView(cvs);
}
function FColumnEdit_onZoomHover(s, e){
   s.hEdit.style.color='black';
}
function FColumnEdit_onZoomLeave(s, e){
   s.hEdit.style.color='blue';
}
function FColumnEdit_onZoomClick(s, e){
   var o = this;
   o.table.clickRow(s.row);
   var r = s.row.saveRow();
   var v = r.get(o.zoomField)
   if(!RString.isEmpty(v)){
      o.doZoom(v);
   }
}
function FColumnEditControl(o){
   o = RClass.inherits(this, o, FColumn);
   o.isEditAble = FColumnEditControl_isEditAble;
   return o;
}
function FColumnEditControl_isEditAble(r){
   var o = this;
   if(r){
      return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
   }
}
function FColumnEmpty(o){
   o = RClass.inherits(this, o, FColumn);
   o._dispList         = true;
   o.onBuildSearchForm = RMethod.empty;
   return o;
}
function FColumnSelected(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   o._dataName         = '_select';
   o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
   o._optionFixed      = true;
   o._cellClass        = FCellSelected;
   o.onBuildSearchForm = FColumnSelected_onBuildSearchForm;
   o.onBuild           = FColumnSelected_onBuild;
   o.createCell        = FColumnSelected_createCell;
   o.dispose           = FColumnSelected_dispose;
   return o;
}
function FColumnSelected_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
   var hc = RBuilder.appendTableCell(hfl);
   hc.align = 'center';
   o._hSelected = RBuilder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}
function FColumnSelected_onBuild(e){
   var o = this;
   var r = o.__base.FColumnEditControl.onBuild.call(o, e);
   var h = o._hPanel;
   h.align = 'center';
   h.style.width = '30px';
   h.style.height = '22px';
   RBuilder.appendEmpty(o._hPanel, 12, 12);
   return r;
}
function FColumnSelected_createCell(p){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, p);
   if(p){
      p.cellSelect = c;
   }
   return c;
}
function FColumnSelected_dispose(){
   var o = this;
   o._hSelect = null;
   o.__base.FColumnEditControl.dispose.call(o);
}
function FColumnSelected_setVisible(){
   var o = this;
   var v = o._table._displayColumnSelect ? 'block' : 'none';
   o._hPanel.style.display = v
   o._hSelected.style.display = v;
   o._hSearchPanel.style.display = v;
   o._hTotalPanel.style.display = v;
   o._hFixPanel.style.display = v;
}
function FColumnSelected_onCellClick(s, e){
   return;
}
function FColumnSelected_onSelectedClick(s, e){
   var o = this;
   var c = o.column;
   var rs = c.table.rows;
    var rc = rs.count;
    for(var n = 0; n<rc; n++){
       var r = rs.get(n);
       if(r.selectAble){
          if(o.checked){
             c.table.selectRow(r, false, true);
          }else{
             c.table.clearSelectRow(r);
          }
       }
    }
}
function FColumnStatus(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   o._dataName         = '_status';
   o._optionFixed      = true;
   o._cellClass        = FCellStatus;
   o.onBuildSearchForm = FColumnStatus_onBuildSearchForm;
   o.onBuild           = FColumnStatus_onBuild;
   o.createCell        = FColumnStatus_createCell;
   return o;
}
function FColumnStatus_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.height = 18;
   hf.width = '100%';
   var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
   var hc = RBuilder.appendTableCell(hfl);
   hc.align = 'center';
}
function FColumnStatus_onBuild(p){
   var o = this;
   var r = o.__base.FColumnEditControl.onBuild.call(o, p);
   var h = o._hPanel;
   h.align = 'center';
   h.style.width = '30px';
   h.style.height = '22px';
   RBuilder.appendEmpty(h, 12, 12);
}
function FColumnStatus_createCell(p){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, p);
   if(p){
      p._statusCell = c;
   }
   return c;
}
function FColumnStatus_onCellClick(s, e){
   if(this.table.callEvent('onTableRowDoubleClick', s.row)){
      return;
   }
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumnStatus_setDataStatus(r, s){
   var o = this;
   var t = o.table;
   var c = r.getStatus();
   var p = null;
   switch(s){
      case EDataStatus.Insert:
         p = 'Insert';
         break;
      case EDataStatus.Delete:
         p = 'Delete';
         break;
      default:
         if(r.isDataChanged()){
            p = 'Changed';
         }else{
            p = t.isFormLinked() ? 'NormalEnter' : 'Normal';
         }
         break;
   }
   c.setIcon(o.styleIconPath(p));
}
function FColumnStatus_ohCellMdclk(){
   var tab = this.lnkCol.table;
   tab.insertRow(this.lnkRow.rowIndex());
}
function FColumnStatus_dispose(){
   var o = this;
   o.__base.FColumnEditControl.dispose.call(o);
   o._hSelect = null;
}
function FGrid(o) {
   o = RClass.inherits(this, o, FGridControl);
   o.onResizeAfter = FGrid_onResizeAfter;
   o.onBuildData   = FGrid_onBuildData;
   o.oeResize      = FGrid_oeResize;
   o.oeRefresh     = FGrid_oeRefresh;
   o.pushColumn    = FGrid_pushColumn;
   return o;
}
function FGrid_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FGrid_onBuildData(){
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#29BAD5';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead = RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#29BAD5';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
}
function FGrid_oeResize(e){
   var o = this;
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hfp = o.hFixPanel;
   var hhp = o.hHeadPanel;
   var hcp = o.hColumnPanel;
   var hdp = o.hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function FGrid_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hcf = o.hTitleForm;
      var hfp = o.hFixPanel;
      var hhp = o.hHeadPanel;
      var hcp = o.hColumnPanel;
      var hdp = o.hDataPanel;
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.pixelTop = hcfh;
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = hfpw;
      hhp.style.pixelWidth = ow - hfpw;
      hhp.style.pixelHeight = hfph;
      o.hHead.style.pixelHeight = o.hFixHead.offsetHeight;
      o.hSearch.style.pixelHeight = o.hFixSearch.offsetHeight;
      hcp.style.pixelTop = hcfh + hfph;
      hcp.style.pixelHeight = oh - hcfh - hfph;
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      hdp.style.pixelWidth = ow;
      hdp.style.pixelHeight = oh - hcfh;
      var ca = null;
      var aw = ow;
      var cs = o.columns;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={0},name2={1})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c.hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 2, ca.width ? ca.width : 120));
      }
   }
}
function FGrid_pushColumn(c){
   var o = this;
   if(c.dispFixed){
      o.hFixHead.appendChild(c.hPanel);
      o.hFixSearch.appendChild(c.hSearchPanel);
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      o.hHead.appendChild(c.hPanel);
      o.hSearch.appendChild(c.hSearchPanel);
      o.hRowLine.appendChild(c.hFixPanel);
   }
   o.push(c);
}
function FGridRow(o){
   o = RClass.inherits(this, o, FGridRowControl);
   o._hFixPanel   = null;
   o.onBuildPanel = FGridRow_onBuildPanel;
   o.setVisible   = FGridRow_setVisible;
   o.appendChild  = FGridRow_appendChild;
   o.dispose      = FGridRow_dispose;
   return o;
}
function FGridRow_onBuildPanel(p){
   var o = this;
   o.__base.FGridRowControl.onBuildPanel.call(o, p);
   o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FGridRow_setVisible(p){
   var o = this;
   o._visible = p;
   var h = o._hFixPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
   var h = o._hPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function FGridRow_appendChild(p){
   var o = this;
   o.__base.FGridRowControl.appendChild.call(o, p);
   var c = p._column;
   if(c._optionFixed){
      o._hFixPanel.appendChild(p._hPanel);
   }
}
function FGridRow_dispose(){
   var o = this;
   var h = o._hFixPanel;
   if(h){
      RMemory.free(h);
      o._hFixPanel = null;
   }
   o.__base.FGridRowControl.dispose.call(o);
}
function FGridRow_select(v){
   var o = this;
   o.isSelect = v;
   var c = v ? EColor.RowSelect : EColor.Row;
   o._hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   o.refreshStyle();
}
function FGridRow_refreshSize(){
   this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
}
function FGridRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
      o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
   }
   if(o.table.isLov){
      o._hFixPanel.style.cursor = 'hand';
   }
   o.__base.FGridRowControl.refreshStyle.call(o);
}
function FGridRowControl(o){
   o = RClass.inherits(this, o, FContainer, MDataContainer);
   o._cells         = null;
   o._rows          = null;
   o._clearProcess  = null;
   o._resetProcess  = null;
   o._loadProcess   = null;
   o._saveProcess   = null;
   o._recordProcess = null;
   o._statusCell    = null;
   o.onBuildPanel   = FGridRowControl_onBuildPanel;
   o.onBuild        = FGridRowControl_onBuild;
   o.construct      = FGridRowControl_construct;
   o.loadRow        = FGridRowControl_loadRow;
   o.saveRow        = FGridRowControl_saveRow;
   o.setVisible     = FGridRowControl_setVisible;
   o.appendChild    = FGridRowControl_appendChild;
   o.push           = FGridRowControl_push;
   return o;
}
function FGridRowControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FGridRowControl_onBuild(p){
   var o = this;
   o.__base.FContainer.onBuild.call(o, p)
   var t = o._table;
   var h = o._hPanel;
   var cs = t._columns;
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var rl = cs.value(i);
      var rc = rl.createCell();
      o.push(rc);
   }
}
function FGridRowControl_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._cells = new TDictionary();
   o._rows = new TObjects();
   o._clearProcess = new TEventProcess(null, o, 'oeClearValue', MEditValue);
   o._resetProcess = new TEventProcess(null, o, 'oeResetValue', MEditValue);
   o._loadProcess = new TEventProcess(null, o, 'oeLoadValue', MEditValue);
   o._saveProcess = new TEventProcess(null, o, 'oeSaveValue', MEditValue);
   o._recordProcess = new TEventProcess(null, o, 'oeRecordValue', MEditValue);
}
function FGridRowControl_loadRow(p){
   var o = this;
   var ds = RClass.create(FDataSource);
   ds.selectRow(p);
   o.dsDataLoad(ds);
}
function FGridRowControl_saveRow(p){
   var o = this;
   return r;
}
function FGridRowControl_setVisible(p){
   var o = this;
   o._visible = p;
   var h = o._hPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function FGridRowControl_appendChild(p){
   var o = this;
   o.__base.FContainer.appendChild.call(o, p);
   var c = p._column;
   if(!c._optionFixed){
      o._hPanel.appendChild(p._hPanel);
   }
}
function FGridRowControl_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   p._row = o;
   o._cells.set(p._column._dataName, p);
   if(RClass.isClass(p, FCellStatus)){
      o._statusCell = p;
   }
}
function FGridRowControl_buildChildren(){
   var o = this;
   var t = o.table;
   var hfr = o.hFixPanel = hfp.insertRow(idx);
   hfr.className = o.style('Panel');
   var hr = o._hPanel = hp.insertRow(idx);
   hr.className = o.style('Panel');
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      var c = cs.value(n);
      var cl = c.createCell(o);
      if(c.dispFixed){
         hfr.appendChild(cl._hPanel);
      }else{
         hr.appendChild(cl._hPanel);
      }
      o._cells.set(c.dataName, cl);
   }
   o.doRefresh()
}
function FGridRowControl_isDataChanged(){
   var o = this;
   var cs = o._cells;
   for(var n=cs.count-1; n>=0; n--){
      if(cs.value(n).isDataChanged()){
         return true;
      }
   }
   return false;
}
function FGridRowControl_isVisible(){
	var o = this;
	return o._visible;
}
function FGridRowControl_getIndex(){
   return this._hPanel.rowIndex;
}
function FGridRowControl_getId(){
   var c = this._cells.get('ouid');
   return c ? c.reget() : '';
}
function FGridRowControl_getVersion(){
   var c = this._cells.get('over');
   return c ? c.reget() : '';
}
function FGridRowControl_getStatus(){
   return this._statusCell;
}
function FGridRowControl_cell(n){
   return this._cells.value(n);
}
function FGridRowControl_get(n){
   return this._cells.get(n).get();
}
function FGridRowControl_reget(n){
   return this._cells.get(n).reget();
}
function FGridRowControl_set(n, v){
   this._cells.get(n).set(v);
}
function FGridRowControl_loadValue(v){
   this.loadRow(v);
}
function FGridRowControl_saveValue(v){
   this.saveRow(v);
}
function FGridRowControl_recordValue(){
   this.process(this._recordProcess);
}
function FGridRowControl_toAttributes(v){
   this.saveRow(v);
}
function FGridRowControl_toDeepAttributes(r){
   var o = this;
   var ts = new TList();
   var p = o.table;
   while(p){
      if(p != o.table && RClass.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
   }
   for(var n=ts.count-1; n>=0; n--){
      var m = ts.get(n);
      if(RClass.isClass(m, FForm)){
         m.toAttributes(r);
      }else if(RClass.isClass(m, FTable)){
         var rs = m.getSelectRows();
         if(1 != rs.count){
            return RMessage.fatal(o, 'Invalid selected rows. (count={0})', rs.count);
         }
         rs.get(0).toAttributes(r);
      }
   }
   o.toAttributes(r);
}
function FGridRowControl_select(v){
   var o = this;
   o.isSelect = v;
   o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
   o.refreshStyle();
}
function FGridRowControl_extend(v){
   var o = this;
   var rs = o._rows;
   if(rs && rs.count){
      var rc = rs.count;
      for(var n=0; n<rc; n++){
         var r = rs.get(n);
         if(v){
            r.setVisible(true);
            r.extend(r.extended);
         }else{
            r.setVisible(false);
         }
         r.refresh();
      }
   }
   o.extended = v;
}
function FGridRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
function FGridRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}
function FGridRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}
function FGridRowControl_refreshStyle(){
   var o = this;
   var cs = o._cells;
   if(cs){
      for(var n=cs.count-1; n>=0; n--){
         cs.value(n).refreshStyle();
      }
   }
}
function FGridRowControl_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.isSelect ? 'S' : '_');
   s.append(']');
   s.append(o.saveRow().dump());
   return s;
}
function FUiGridControl(o) {
   o = RClass.inherits(this, o, FUiContainer);
   o._displayCount        = RClass.register(o, new APtyInteger('_displayCount'), 20);
   o._displayTitle        = RClass.register(o, new APtySet('_displayTitle', 'display_title', EGridDisplay.Title), true);
   o._displayColumnStatus = true;
   o._displayColumnSelect = true;
   o._rowHeight           = RClass.register(o, new APtyInteger('rowHeight'), 0);
   o._stylePanel          = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel     = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm      = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleCaption        = RClass.register(o, new AStyle('_styleCaption'));
   o._styleContentPanel   = RClass.register(o, new AStyle('_styleContentPanel'));
   o._styleContentForm    = RClass.register(o, new AStyle('_styleContentForm'));
   o._styleHintPanel      = RClass.register(o, new AStyle('_styleHintPanel'));
   o._styleHintForm       = RClass.register(o, new AStyle('_styleHintForm'));
   o._styleHint           = RClass.register(o, new AStyle('_styleHint'));
   o._styleButton         = RClass.register(o, new AStyle('_styleButton'));
   o._minHeight           = 80;
   o._buttons             = null;
   o._columns             = null;
   o._rowClass            = FGridRow;
   o._rows                = null;
   o._focusCell           = null;
   o._focusRow            = null;
   o._loadEvent           = null;
   o._hTitlePanel         = null;
   o._hTitleForm          = null;
   o._hTitleLine          = null;
   o._hCaption            = null;
   o._hContentPanel       = null;
   o._hHintPanel          = null;
   o._hHintForm           = null;
   o.lsnsRowClick         = null;
   o.lsnsRowDblClick      = null;
   o.onBuildTitle         = FUiGridControl_onBuildTitle;
   o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
   o.onBuildHint          = FUiGridControl_onBuildHint;
   o.onBuildPanel         = FUiGridControl_onBuildPanel;
   o.onBuild              = FUiGridControl_onBuild;
   o.onDatasetLoadDelay   = FUiGridControl_onDatasetLoadDelay;
   o.onDatasetLoad        = FUiGridControl_onDatasetLoad;
   o.construct            = FUiGridControl_construct;
   o.buildNavigatorButton = FUiGridControl_buildNavigatorButton;
   o.appendColumn         = RMethod.virtual(o, 'appendColumn');
   o.appendChild          = FUiGridControl_appendChild;
   o.push                 = FUiGridControl_push;
   o.createRow            = FUiGridControl_createRow;
   o.insertRow            = FUiGridControl_insertRow;
   o.syncRow              = FUiGridControl_syncRow;
   o.hideRows             = FUiGridControl_hideRows;
   o.clickCell            = FUiGridControl_clickCell;
   o.clickRow             = FUiGridControl_clickRow;
   o.doubleClickRow       = FUiGridControl_doubleClickRow;
   return o;
}
function FUiGridControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiGridControl_onBuildTitle(e){
   var o = this;
   var hf = o._hTitleForm = RBuilder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
   var hr = o._hTitleLine = RBuilder.appendTableRow(hf);
   var hc = o._hCaption = RBuilder.appendTableCell(hr, o.styleName('Caption'));
   hc.innerText = o.label();
   RHtml.displaySet(hf, o._displayTitle);
}
function FUiGridControl_onBuildHint(e) {
   var o = this;
   var hr = RBuilder.appendTableRow(o._hHintForm);
   var hc = RBuilder.appendTableCell(hr);
   hc.width = 60;
   o.hExtendButton = o.buildNavigatorButton(hc, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
      var hc = RBuilder.appendTableCell(hr);
      hc.width = 60;
      o.hInsertButton = o.buildNavigatorButton(hc, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
   var hc = RBuilder.appendTableCell(hr);
   hc.width = 10;
   var hc = RBuilder.appendTableCell(hr);
   hc.noWrap = true;
   o._hHint = RBuilder.appendText(hc, o.styleName('Hint'))
   var hc = RBuilder.appendTableCell(hr);
   hc.noWrap = true;
   hc.align = 'right';
   o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FUiGridControl:First'));
   o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FUiGridControl:Prior'));
   o.hNavPrior.style.paddingRight = '20';
   o.hPage = RBuilder.appendEdit(hc)
   o.hPage.style.width = 40;
   o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Next')+'&nbsp;', 'control.grid.next');
   o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Last')+'&nbsp;', 'control.grid.last');
}
function FUiGridControl_onBuild(p){
   var o = this;
   if(!o._size.height || o._size.height < 160){
      o.height = '100%';
   }
   o.__base.FUiContainer.onBuild.call(o, p);
   var hc = o._hTitlePanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
   o.onBuildTitle(p);
   var hbp = o._hContentPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
   o.onBuildContent(p);
   o._hHintPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
   o._hHintForm = RBuilder.appendTable(o._hHintPanel, o.styleName('HintForm'));
   o.onBuildHint(p);
   var c = o._statusColumn = RClass.create(FColumnStatus);
   c._table = this;
   c._name = '_s';
   c.build(p);
   o.push(c);
   var c = o._selectColumn = RClass.create(FColumnSelected);
   c._table = this;
   c._name = '_select';
   c.build(p);
   o.push(c);
}
function FUiGridControl_onDatasetLoadDelay(p){
   var o = this;
   var c = o._displayCount;
   var h = o._rowHeight;
   var d = p.dataset;
   var rc = d.count();
   var rb = p.index;
   var re = rb + p.acceleration;
   if(re > rc - 1){
      re = rc - 1;
   }
   if(o._hHeadPanel){
      o._hHeadPanel.scrollLeft = 0;
   }
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
   }
   for(var i = rb; i <= re; i++){
      var r = o.syncRow(i);
      if(h > 0) {
         r._hFixPanel.height = h + 'px';
      }
      var dr = d.row(i);
      r.loadRow(dr);
      r.setVisible(true);
   }
   if(re == rc - 1){
      p.setValid(false);
      o.psRefresh();
      return;
   }
   p.index += a.acceleration;
}
function FUiGridControl_onDatasetLoad(p){
   var o = this;
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
      o._hColumnPanel.scrollLeft = 0;
   }
   if(o._hDataPanel){
     o._hDataPanel.scrollTop = 0;
     o._hDataPanel.scrollLeft = 0;
   }
   if(p.isEmpty()){
      return;
   }
   var e = o._loadEvent;
   e.index = 0;
   e.acceleration = 5;
   e.dataset = o._dataset;
   e.setValid(true);
   RConsole.find(FEventConsole).push(o._loadEvent);
}
function FUiGridControl_construct() {
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._buttons = new TDictionary();
   o._columns = new TDictionary();
   o._rows = new TObjects();
   o.lsnsRowClick = new TListeners();
   o.lsnsRowDblClick = new TListeners();
   var e = o._loadEvent = RClass.create(FEvent);
   e.setOwner(o);
   e.setCallback(o.onDatasetLoadDelay);
   e.setValid(false);
}
function FUiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
   var o = this;
   var h = RBuilder.append(hParent, 'SPAN', o.styleName('Button'));
   h.style.cursor = 'hand';
   h.style.paddingLeft = '10';
   if (iconBf) {
      RBuilder.appendIcon(h, null, iconBf);
   }
   if(text){
      if(name){
         o[name + 'Text'] = RBuilder.appendText(h, null, text);
      }else{
         RBuilder.appendText(h, null, text);
      }
   }
   if(iconAf){
      RBuilder.appendIcon(h, null, iconAf);
   }
   return h;
}
function FUiGridControl_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FColumn)){
      o.appendColumn(p);
   }
}
function FUiGridControl_push(p){
   var o = this;
   if(RClass.isClass(p, FColumn)){
      p._table = o;
      o._columns.set(p.name(), p);
   }else if(RClass.isClass(p, FTableButton)){
      p._table = o;
      o._buttons.set(p.name(), p);
   }
   o.__base.FUiContainer.push.call(o, p);
}
function FUiGridControl_createRow() {
   var o = this;
   var r = RClass.create(o._rowClass);
   r._table = r._parent = o;
   return r;
}
function FUiGridControl_insertRow(i, r){
   var o = this;
   r.index = i;
   r.build();
   if(r._hFixPanel){
      o._hFixRows.appendChild(r._hFixPanel);
      RHtml.tableMoveRow(o._hColumnForm, r._hFixPanel.rowIndex, i + 2);
   }
   o._hRows.appendChild(r._hPanel);
   RHtml.tableMoveRow(o._hContentForm, r._hPanel.rowIndex, i + 2);
   r.refreshStyle();
   o._rows.insert(i, r);
}
function FUiGridControl_syncRow(p){
   var o = this;
   var rs = o._rows;
   var r = rs.get(p);
   if(!r){
      for(var i = rs.count(); i <= p; i++){
         r = o.createRow();
         r._index = i;
         r.build(o._hPanel);
         if(r._hFixPanel){
            o._hFixRows.appendChild(r._hFixPanel);
         }
         o._hRows.appendChild(r._hPanel);
         r._hPanel.style.height = r._hFixPanel.offsetHeight + 'px';
         rs.push(r);
      }
   }
   r._extended = false;
   if(r._childRows){
      r.hideChild();
      r._childRows.clear();
   }
   return r;
}
function FUiGridControl_hideRows(){
   var o = this;
   var rs = o._rows;
   var c = rs.count();
   for(var i = c - 1; i >= 0 ; i--){
      rs.get(i).setVisible(false);
   }
}
function FUiGridControl_clickCell(p){
   this._focusCell = p;
}
function FUiGridControl_clickRow(p){
   var o = this;
   o.lsnsRowClick.process(p);
   o._focusRow = p;
}
function FUiGridControl_doubleClickRow(p){
   var o = this;
   o.lsnsRowDblClick.process(p);
   o._focusRow = p;
}
function FUiGridControl_pushButton(b){
   var o = this;
   var hc  = o._hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b._hPanel);
   o.push(b);
}
function FUiGridControl_onMouseDown(e, he){
   var o = this;
}
function FUiGridControl_onHeadMouseDown(e){
   var o = this;
   var m = o.getHeadMode(e);
   if(EGridColumn.Size == m){
      o.hoverMode = EGridColumn.Size;
      e.srcElement.status = EGridColumn.Size;
      o.hoverX = e.srcElement.offsetLeft + e.x;
      o.hoverDataCell = null;
      if(o._hContentForm._rows.length){
         o.hoverDataCell = o._hContentForm._rows[0].cells[o.hoverHead.index];
      }
      o._hHeadForm.setCapture();
   }
}
function FUiGridControl_onHeadMouseMove(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      var bl = o.hoverCellLength;
      var mx = e.srcElement.offsetLeft + e.x;
      var w =  mx - o.hoverX + bl;
      if(w > 0){
         o.hoverHead._hPanel.style.pixelWidth = w;
         o.hoverHead._hFixPanel.style.pixelWidth = w;
      }
   }else if(EGridColumn.None == o.hoverMode){
      var m = o.getHeadMode(e);
      var c = 'default';
      if(EGridColumn.Size == m){
         c = 'e-resize';
      }else if(EGridColumn.Drag == m){
         c = 'hand';
      }
      o._hHeadForm.style.cursor = c;
   }
}
function FUiGridControl_onHeadMouseUp(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      o._hHeadForm.releaseCapture();
   }
   o.hoverMode = EGridColumn.None;
}
function FUiGridControl_onDataScroll(){
   var o = this;
   o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
   o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
}
function FUiGridControl_onCellKeyDown(c, e, he){
   var o = this;
   var k = e.keyCode;
   var l = c.column;
   var r = c.row;
   if(EKey.Up == k) {
      l.moveCellFocus(r, EPosition.Top);
      RKey.eventClear(he);
   }else if(EKey.Down == k) {
      l.moveCellFocus(r, EPosition.Bottom);
      RKey.eventClear(he);
   }else if(EKey.Tab == k && e.shiftKey){
      l.moveCellFocus(r, EPosition.Before);
      RKey.eventClear(he);
   }else if(EKey.Tab == k){
      l.moveCellFocus(r, EPosition.After);
      RKey.eventClear(he);
   }
}
function FUiGridControl_onRowMouseEnter(s, e){
   this.hoverRow(s, true);
}
function FUiGridControl_onRowMouseLeave(s, e){
   this.hoverRow(s, false);
}
function FUiGridControl_onRowClick(s, e){
   var o = this;
   o.selectRow(s, !e.ctrlKey, true);
   o.lsnsRowClick.process(s);
   var e = o._eventRowClick;
   if(!e){
      e = o._eventRowClick = new TEvent();
      e.source = o;
   }
   e.caller = s;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
}
function FUiGridControl_onColumnSearchKeyDown(s, e){
   var o = this;
   if(EKey.Enter == e.keyCode){
      if(!o._isSearching || !o.table._isSearching){
         o._isSearching = true;
         if(o.table){
            o.table.doSearch();
             o.table.dpScrollLeft = o.table._hContentPanel.scrollLeft;
             o.table.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
         }else{
            o.doSearch();
            o.dpScrollLeft = o._hContentPanel.scrollLeft;
            o.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
         }
      }
   }
}
function FUiGridControl_onButtonMouseDown(e){
   var o = this;
   var ds = o.dsViewer;
   if(!ds || 0 == ds.dataset.pageCount){
      return;
   }
   var h = e.hSource;
   if(o.hInsertButton == h){
      o.onInsertButtonClick();
   }else if(o.hExtendButton == h){
      o.onExtendButtonClick();
   }else if (o.hNavFirst == h && ds.pageIndex != 0){
      o.dsMovePage(EDataAction.First);
   } else if (o.hNavPrior == h && ds.pageIndex != 0){
      o.dsMovePage(EDataAction.Prior);
   } else if (o.hNavNext == h && ds.pageIndex != ds.pageCount - 1){
      o.dsMovePage(EDataAction.Next);
   } else if (o.hNavLast == h && ds.pageIndex != ds.pageCount - 1){
      o.dsMovePage(EDataAction.Last);
   }
}
function FUiGridControl_onPageCountDown(e){
   var o = this;
   var ds = o.dsViewer;
   if(RString.isEmpty(o.hPage.value) || !ds || 0 == ds.dataset.pageCount){
      return;
   }
   var n = RInt.parse(o.hPage.value);
   if(EKey.Enter == e.keyCode && n != ds.pageIndex + 1){
      if(n < 1){
         n = 1;
      }
      if(n > ds.pageCount){
         n = ds.pageCount;
      }
      o.dsMovePage(n - 1);
   }
}
function FUiGridControl_onInsertButtonClick(){
   RFormSpace.doPrepare(this);
}
function FUiGridControl_onExtendButtonClick(){
   var o = this;
   if(400 == o.dsPageSize){
      o.dsPageSize = o.dsPageSizeStore;
      o.hExtendText.innerText = ' 展开';
   }else{
      o.dsPageSizeStore = o.dsPageSize;
      o.dsPageSize = 400;
      o.hExtendText.innerText = ' 收缩';
   }
   o.dsSearch();
}
function FUiGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.__base.FUiContainer.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   return EEventStatus.Stop;
}
function FUiGridControl_oeProgress(e){
   var o = this;
   if('none' == o._hPanel.currentStyle.display){
      return;
   }
   var hdp = o._hDelayPanel;
   if(!hdp){
      hdp = o._hDelayPanel = RBuilder.appendDiv(o.hBorderPanel);
      var st = hdp.style;
      st.position = 'absolute';
      st.zIndex = RLayer.next();
      st.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
      st.backgroundColor = '#FFFFFF';
      st.top = 0;
      st.width = '100%';
      st.height = '100%';
      st.display = 'none';
      var hdf = o._hDelayForm = RBuilder.appendTable(hdp);
      hdf.style.width = '100%';
      hdf.style.height = '100%';
      var hc = hdf.insertRow().insertCell();
      hc.align = 'center';
      hc.vAlign = 'middle';
      RBuilder.appendIcon(hc, 'ctl.FUiGridControl_Loading')
      var t = o._hDelayText = RBuilder.append(hc, 'SPAN');
      t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FUiGridControl:Loading') + "</B></FONT>";
   }
   if(e.enable){
      RHtml.setRect(hdp, o.calculateDataSize());
      hdp.filters[0].opacity = 100;
      hdp.style.display = 'block';
   }else{
      if(o._loadFinish){
         hdp.style.display = 'none';
      }
   }
   o.refreshHint();
   return EEventStatus.Stop;
}
function FUiGridControl_isFormLinked(){
   return this._formLinked || this._formName;
}
function FUiGridControl_isDataSelected(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isSelect){
         return true;
      }
   }
}
function FUiGridControl_isDataChanged(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isDataChanged()){
         return true;
      }
   }
}
function FUiGridControl_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return o.isDataSelected();
      }
   }
}
function FUiGridControl_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return this._formName;
   }else if(EFormLink.Table == t){
      return this.name;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FUiGridControl_getHeadMode(e){
   var o = this;
   var p = RHtml.point(o._hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o._columns;
   for(var n = 0; n<cs.count; n++){
      var c = cs.value(n);
      if(c.dispSize){
         var l = c._hPanel.offsetLeft + c._hPanel.offsetWidth - p.x;
         o.hoverCellLength = c._hPanel.offsetWidth;
         if(l - 6 <= x && x<=l){
            o.hoverHead = c;
            return EGridColumn.Size;
         }
      }
   }
   return EGridColumn.None;
}
function FUiGridControl_getRowBar(){
   var o = this;
   var rb = o._rowBar;
   if(!rb){
      rb = o._rowBar = RClass.create(FGridRowBar);
      rb.table = o;
      rb.psBuild(o.hBorderPanel);
   }
   return rb;
}
function FUiGridControl_calculateDataSize(){
   var o = this;
   var r = o._dataRect;
   if(!r){
      r = o._dataRect = new TRect();
   }
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o._hFixPanel ? o._hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}
function FUiGridControl_hasVisibleRow() {
   var o = this;
   var rs = o._rows;
   for(var n = 0; n<rs.count; n++){
      var rt = rs.get(n);
      if(rt._visible){
         return true;
      }
   }
   return false;
}
function FUiGridControl_getCurrentRow(){
   var c = this._focusCell;
   if(c){
      return c.row.saveRow();
   }
}
function FUiGridControl_getSelectedRow(){
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect){
         return r;
      }
   }
}
function FUiGridControl_getSelectedRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect && r.isVisible()){
         ls.push(r.saveRow());
      }
   }
   return ls;
}
function FUiGridControl_getChangedRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isVisible()){
         if(r.isDataChanged()){
            ls.push(r.saveRow());
         }
      }
   }
   return ls;
}
function FUiGridControl_getRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
     var r = rs.get(n);
     if(r.isVisible()){
         ls.push(r.saveRow());
     }
   }
   return ls;
}
function FUiGridControl_refreshHint(){
   var o = this;
   var h = o._hHint;
   var ds = o._dataset;
   if(ds && h){
      var ci = 0;
      var r = o.getSelectedRow();
      if(r){
         ci = o._rows.indexOf(r)+1;
      }
      h.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>"+ds.pageCount +"</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>"+ds.total +"</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(ds.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
      o.hPage.value = ds.pageIndex + 1;
   }
}
function FUiGridControl_refreshSelected(){
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
   var rs = o._rows;
   var rc = rs.count;
   for(var n = 0; n < rc; n++){
      var r = rs.get(n);
      r.isSelect = false;
   }
}
function FUiGridControl_hoverRow(r, f){
   var o = this;
   if(f){
      o._hoverRow = r;
      r.refreshStyle();
   }else{
      if(o._hoverRow == r){
         o._hoverRow = null;
      }
      r.refreshStyle();
   }
}
function FUiGridControl_selectRow(row, reset, force) {
   var o = this;
   var has = false;
   if(reset){
      var rs = o._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r != row && r.isSelect){
            r.select(false);
            has = true;
         }
      }
   }
   row.select(has || !row.isSelect || force);
   o.refreshHint();
}
function FUiGridControl_clearSelectRow(row) {
   var o = this;
   row.select(false);
   o.refreshHint();
}
function FUiGridControl_clearSelectRows() {
    var o = this;
    var rs = o._rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
}
function FUiGridControl_setDataStatus(r, s) {
   var o = this;
   r.dataStatus = s;
   o._statusColumn.setDataStatus(r, s);
}
function FUiGridControl_dsInsert() {
}
function FUiGridControl_dsUpdate(r){
   var o = this;
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
function FUiGridControl_dsDelete() {
}
function FUiGridControl_doSearch(){
   var o = this;
   o.dsSearchs.clear();
   var cs = o._columns;
   for(var n=0; n<cs.count; n++){
      var c = cs.value(n);
      var v = c.searchValue();
      if(RClass.isClass(c, FColumnCalendar)){
         if(v){
            var si = new TSearchItem();
            si.set(c.dataName, v.value, ESearch.Date, v.format);
            o.dsSearchs.push(si);
         }
      }else{
         if(!RString.isEmpty(v)){
            var si = new TSearchItem();
            si.set(c.dataName, v, ESearch.Like);
            o.dsSearchs.push(si);
         }
      }
   }
   o.dsValues = o.toDeepAttributes();
   o.dsSearch();
}
function FUiGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FUiGridControl_pack(){
   var o = this;
   var rfs = o._rows;
   var ct = rfs.count;
   var root = new TNode('Dataset');
   for(var n = 0; n < ct; n++){
      var r = rfs.get(n);
      if(r.isDataChanged()){
         var atts = r.toAttrs();
         var nd = new TNode('Row', atts)
         root.push(nd);
      }
   }
   return root;
}
function FUiGridControl_setVisible(v){
   var o = this;
   o.__base.FUiContainer.setVisible.call(o, v);
   o.__base.MUiHorizontal.setVisible.call(o, v);
}
function FUiGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o._buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}
function FUiGridControl_refreshStyle(){
   var o = this;
   var rs = o._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      rs.get(n).refreshStyle();
   }
}
function FUiGridControl_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   o.hBorderPanel = null;
   o._hDelayPanel = null;
   o._hDelayForm = null;
   o._hFixPanel = null;
   o._hFixForm = null;
   o._hFixHead = null;
   o._hFixSearch = null;
   o._hHeadPanel = null;
   o._hHeadForm = null;
   o._hHead = null;
   o._hSearch = null;
   o._hColumnPanel = null;
   o._hColumnForm = null;
   o._hFixRows = null;
   o._hFixRowLine = null;
   o._hContentPanel = null;
   o._hContentForm = null;
   o._hRows = null;
   o._hRowLine = null;
   o._hHintForm = null;
   o._hInsertButton = null;
   o._hExtendButton = null;
   o._hExtendText = null;
}
function FUiGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   var rs = o._rows;
   for(var n = 0; n < rs.count; n++) {
      s.appendLine(rs.get(n).dump());
   }
   return s;
}
function FUiGridControl_storeValues(a){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var s = o.getSelectRows();
   if(s.count){
      if(1 != s.count){
         RMessage.fatal(o, 'Invalid selected rows. (count={0})', s.count);
      }
      s.get(0).toAttributes(a);
   }
   return a;
}
function FUiGridControl_buildRows(){
   var o = this;
   var rs = o._rows;
   if(!rs.count){
      var c = o._displayCount;
      for(var n = 0; n < c; n++){
         var r = RClass.create(FGridRow);
         r.table = this;
         r.build();
         o._hRows.appendChild(r._hPanel);
         rs.push(r);
      }
   }
}
function FUiGridControl_createChild(config) {
   var o = this;
   var c = o.__base.FUiContainer.createChild.call(o, config);
   if(RClass.isClass(c, FGridRow)){
      c.table = o;
      c.row = o.dsLoadRowNode(config);
      o._rows.push(c);
      return null;
   }else if(RClass.isClass(c, FColumnEditControl)){
      c.table = o;
   }
   return c;
}
function FUiGridControl_setStyleStatus(row, status) {
   var hRow = row._hPanel;
   if (hRow) {
      switch (status) {
         case EStyle.Normal:
            row.select(false);
            break;
         case EStyle.Select:
            row.select(true);
            break;
      }
   }
}
function FUiGridControl_buildRow(row) {
   var o = this;
   var cs = o._columns;
   for ( var n = 0; n < cs.count; n++) {
      var c = cs.value(n);
      var cell = c.createCell(row);
      if(c.dataName){
         cell.set(RString.nvl(row.get(c.dataName), c.dataDefault));
      }
      row.push(cell);
   }
   return row;
}
function FUiGridControl_clearSelectAll() {
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
}
function FUiGridControl_appendRow(row) {
   this._hRows.appendChild(row._hRow);
   this._rows.push(row);
}
function FUiGridControl_deleteRow(r) {
   var o = this;
   r = RObject.nvl(r, o.selectedRow);
   if (!r) {
      return alert('Please select row.');
   }
   if (r.isExist()) {
      if (r.isDelete()) {
         r.doNormal();
         o.setDataStatus(r, EDataStatus.Unknown);
         o.setStyleStatus(r, EStyle.Select);
      } else {
         r.doDelete();
         o.setDataStatus(r, EDataStatus.Delete);
         o.setStyleStatus(r, EStyle.Delete);
      }
   } else {
      r.release();
   }
}
function FUiGridControl_clearRows() {
   var o = this;
   var c = o._rows.count;
   for(var n=0; n<c; n++){
      var r = o._rows.get(n);
      if(r){
         r.dispose();
      }
   }
   o._rows.clear();
   RHtml.clear(o._hRows);
}
function FUiGridControl_onColumnTreeService(g){
   var o = this;
   var d = g.resultDatasets.get(g.path);
   var rs = d._rows;
   if(rs && rs.count > 0){
      var pr = o.focusRow;
      pr.extdStatus = true;
      pr.psResize();
      var idx = pr._hPanel.rowIndex + 1;
      for(var n = 0; n < rs.count; n++){
         var r = RClass.create(FGridRow);
         r.table = o;
         pr.childRows.push(r);
         r.parentRow = pr;
         r.buildChild(o._hFixRows, o._hRows, idx + n);
         r.loadRow(rs.get(n));
      }
   }
}
function FUiGridControl_getRowType(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FGridRowType)){
         return c;
      }
   }
}
function FUiGridControl_onColumnTreeClick(s, e){
   var o = this;
   var c = o.getRowType();
   if(!c){
      return;
   }
   var r = s.row;
   if(r.childRows && r.childRows.count > 0){
      if(r.extended){
         r.hideChild();
      }else{
         r.showChild();
      }
      r.extended = !r.extended;
      if(r.extended){
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
      }else{
         s.hImg.src = s.styleIconPath('Expend', FColumnTree);
      }
   }else{
      o.focusRow = s.row;
      if(o.focusRow.row.get('ochd') == 'Y'){
         s.row.extended = true;
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
         var name = s.row.get('otyp');
         var tb = s.row.table;
         var rt = tb.component(name);
         var ds = o.topControl(MDataset);
         var g = new TDatasetFetchArg(ds.name, ds.formId, ds.dsPageSize, ds.dsPageIndex, null, null, o.fullPath(), rt.formResearch);
         ds.dsSearchs.clear();
         if(rt && rt.formWhere){
            var si = new TSearchItem();
            si.set(rt.dataName, rt.formWhere, ESearch.Source);
            ds.dsSearchs.push(si);
         }
         g.force = true;
         g.reset = true;
         g.searchs = ds.dsSearchs;
         var ats = new TAttributes();
         s.row.toDeepAttributes(ats);
         g.values = ats;
         g.callback = new TInvoke(o, o.onColumnTreeService);
         RConsole.find(FDatasetConsole).fetch(g);
      }
   }
}
function FUiTable(o) {
   o = RClass.inherits(this, o, FGridControl, MDataset);
   o._detailFrameName  = RClass.register(o, new APtyString('_detailFrameName'));
   o._styleFixPanel    = RClass.register(o, new AStyle('_styleFixPanel'));
   o._styleFixForm     = RClass.register(o, new AStyle('_styleFixForm'));
   o._styleHeadPanel   = RClass.register(o, new AStyle('_styleHeadPanel'));
   o._styleHeadForm    = RClass.register(o, new AStyle('_styleHeadForm'));
   o._styleColumnPanel = RClass.register(o, new AStyle('_styleColumnPanel'));
   o._styleColumnForm  = RClass.register(o, new AStyle('_styleColumnForm'));
   o._styleDataPanel   = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm    = RClass.register(o, new AStyle('_styleDataForm'));
   o._hFixPanel        = null;
   o._hFixForm         = null;
   o._hHeadPanel       = null;
   o._hHeadForm        = null;
   o._hColumnPanel     = null;
   o._hColumnForm      = null;
   o._hDataPanel       = null;
   o._hDataForm        = null;
   o.onBuildContent       = FUiTable_onBuildContent;
   o.oeRefresh         = FUiTable_oeRefresh;
   o.appendColumn      = FUiTable_appendColumn;
   return o;
}
function FUiTable_onBuildContent(p){
   var o = this;
   var hbp = o._hContentPanel;
   var hfp = o._hFixPanel = RBuilder.appendDiv(hbp, o.styleName('FixPanel'));
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o._hFixForm = RBuilder.appendTable(hfp, o.styleName('FixForm'), 0, 0, 1);
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o._hFixHead =  RBuilder.appendTableRow(hff);
   o._hFixSearch = RBuilder.appendTableRow(hff);
   o._hFixTotal = RBuilder.appendTableRow(hff);
   o._hFixTotal.style.display = 'none';
   var hhp = o._hHeadPanel = RBuilder.appendDiv(hbp, o.styleName('HeadPanel'));
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o._hHeadForm = RBuilder.appendTable(hhp, o.styleName('HeadForm'), 0, 0, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o._hHead = hhf.insertRow();
   o._hSearch = hhf.insertRow();
   o._hTotal = hhf.insertRow();
   o._hTotal.style.display = 'none';
   var hcp = o._hColumnPanel = RBuilder.appendDiv(hbp, o.styleName('ColumnPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o._hColumnForm = RBuilder.appendTable(hcp, o.styleName('ColumnForm'), 0, 0, 1);
   o._hFixRows = RBuilder.append(hcf, 'TBODY');
   o._hFixRowLine = RBuilder.append(o._hFixRows, 'TR');
   var hdp = o._hDataPanel = RBuilder.appendDiv(hbp, o.styleName('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o._hDataForm = RBuilder.appendTable(hdp, o.styleName('DataForm'), 0, 0, 1);
   o._hRows = RBuilder.append(hdf, 'TBODY');
   o._hRowLine = RBuilder.append(o._hRows, 'TR');
   o.panelNavigator = true;
}
function FUiTable_oeRefresh(e){
   var o = this;
   o.__base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hfp = o._hFixPanel;
      var hhp = o._hHeadPanel;
      var hcp = o._hColumnPanel;
      var hdp = o._hDataPanel;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o._hContentPanel.offsetWidth;
      var oh = o._hContentPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.left = '0px';
      hfp.style.top = '0px';
      hhp.style.left = hfpw + 'px';
      hhp.style.top = '0px';
      hhp.style.width = (ow - hfpw) + 'px';
      o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
      o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
      hcp.style.top = hfph + 'px';
      hcp.style.width = hfpw + 'px';
      hcp.style.height = (oh - hfph) + 'px';
      hdp.style.left = '0px';
      hdp.style.top = '0px';
      hdp.style.width = (ow - hfpw) + 'px';
      hdp.style.height = (oh - hfph) + 'px';
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
   }
}
function FUiTable_appendColumn(p){
   var o = this;
   if(p._optionFixed){
      o._hFixHead.appendChild(p._hPanel);
      o._hFixSearch.appendChild(p._hSearchPanel);
      o._hFixTotal.appendChild(p._hTotalPanel);
      o._hFixRowLine.appendChild(p._hFixPanel);
   }else{
      o._hHead.appendChild(p._hPanel);
      o._hSearch.appendChild(p._hSearchPanel);
      o._hTotal.appendChild(p._hTotalPanel);
      o._hRowLine.appendChild(p._hFixPanel);
   }
}
function FUiTable_onResizeAfter(){
   var o = this;
   var hdp = o._hDataPanel;
   var hfp = o._hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FUiTable_oeResize(e){
   var o = this;
   var h = o._hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o._hTitleForm;
   var hfp = o._hFixPanel;
   var hhp = o._hHeadPanel;
   var hcp = o._hColumnPanel;
   var hdp = o._hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o._hBorderPanel.offsetWidth;
   var oh = o._hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      o.rows.get(n).refreshSize();
   }
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function MUiMenuButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FUiMenuBar(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = FUiMenuBar_onBuildPanel;
   o.onEnter           = RMethod.empty;
   o.onLeave           = RMethod.empty;
   o.appendChild       = FUiMenuBar_appendChild;
   o.removeChild       = FUiMenuBar_removeChild;
   o.dispose           = FUiMenuBar_dispose;
   return o;
}
function FUiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}
function FUiMenuBar_appendChild(control){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, control);
   if(RClass.isClass(control, MUiMenuButton)){
      var hLine = o._hLine;
      var hCell = RBuilder.appendTableCell(hLine, o.styleName('ButtonPanel'));
      hCell._hParentLine = hLine;
      control.setPanel(hCell);
   }
}
function FUiMenuBar_removeChild(p){
   var o = this;
   if(RClass.isClass(p, FUiMenuButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   o.__base.FUiContainer.removeChild.call(o, p);
}
function FUiMenuBar_dispose(){
   var o = this;
   o._hLine = RHtml.free(o._hLine);
   o.__base.FUiContainer.dispose.call(o);
}
function FUiMenuButton(o){
   o = RClass.inherits(this, o, FUiControl, MUiMenuButton, MListenerClick);
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._action          = RClass.register(o, new APtyString('_action'));
   o._styleNormal     = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover      = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress      = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable    = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIconPanel  = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleSpacePanel = RClass.register(o, new AStyle('_styleSpacePanel'));
   o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = FUiMenuButton_onBuildPanel
   o.onBuild          = FUiMenuButton_onBuild;
   o.onEnter          = FUiMenuButton_onEnter;
   o.onLeave          = FUiMenuButton_onLeave;
   o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
   o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
   o.icon             = FUiMenuButton_icon;
   o.setIcon          = FUiMenuButton_setIcon;
   o.setLabel         = FUiMenuButton_setLabel;
   o.setHint          = FUiMenuButton_setHint;
   o.setEnable        = FUiMenuButton_setEnable;
   o.click            = FUiMenuButton_click;
   o.dispose          = FUiMenuButton_dispose;
   return o;
}
function FUiMenuButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiMenuButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   var hf = o._hForm = RBuilder.appendTable(h);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
function FUiMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
function FUiMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_icon(){
   return this._icon;
}
function FUiMenuButton_setIcon(p){
   var o = this;
   o._icon = p;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(o._icon);
   }
}
function FUiMenuButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   RHtml.textSet(o._hLabelPanel, s);
}
function FUiMenuButton_setHint(p){
   var o = this;
   o._hint = p;
   var s = RString.nvl(p);
   if(o._hint){
      if(o._hotkey){
         s += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = o._hint;
}
function FUiMenuButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.setEnable.call(o, p);
   if(p){
      o._hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o._hIcon.src = RRes._iconPath(o._icon);
      }
   }else{
      o._hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o._hIcon.src = RRes._iconPath(o._iconDisable);
      }
   }
}
function FUiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FUiFocusConsole).blur();
      RLogger.debug(o, 'Menu button click. (label={1})', o._label);
      var event = new SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
function FUiMenuButton_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   o._hLine = RHtml.free(o._hLine);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hSpacePanel = RHtml.free(o._hSpacePanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiMenuButtonMenu(o){
   o = RClass.inherits(this, o, FUiControl);
   o._action       = RClass.register(o, new APtyString('action', null));
   o._target       = RClass.register(o, new APtyString('target', null));
   o._page         = RClass.register(o, new APtyString('page'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._method       = RClass.register(o, new APtyString('method'));
   o._icon         = RClass.register(o, new APtyString('icon', null));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable', null));
   o._attributes   = RClass.register(o, new APtyString('attributes'));
   o._disabled     = false;
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   o.oeBuild      = FUiMenuButtonMenu_oeBuild;
   o.oeEnable     = FUiMenuButtonMenu_oeEnable;
   o.oeDisable    = FUiMenuButtonMenu_oeDisable;
   o.onBuildPanel = FUiMenuButtonMenu_onBuildPanel;
   o.onEnter      = FUiMenuButtonMenu_onEnter;
   o.onLeave      = FUiMenuButtonMenu_onLeave;
   o.onMouseDown  = FUiMenuButtonMenu_onMouseDown;
   o.onMouseUp    = FUiMenuButtonMenu_onMouseUp;
   o.onClick      = FUiMenuButtonMenu_onClick;
   o.construct    = FUiMenuButtonMenu_construct;
   o.dispose      = FUiMenuButtonMenu_dispose;
   return o;
}
function FUiMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o._icon){
      o.hIcon = RBuilder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o.hLabel = RBuilder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FUiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FUiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FUiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
function FUiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
function FUiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FFocusConsole).focus(o);
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
         var form = RHtml.form(o.hButton);
         var p = RPage.parse(o._page);
         if(o._method){
            p._action = o._method;
         }
         p.split(o._attributes);
         p.post(form, o._target);
      }
      o.processClick();
   }
}
function FUiMenuButtonMenu_construct(){
   var o = this;
   o.base.FUiControl.construct.call(o);
}
function FUiMenuButtonMenu_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hIcon = null;
   o.hButton = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
function FUiMenuButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl, MUiMenuButton);
   o._stylePanelHorizontal = RClass.register(o, new AStyle('_stylePanelHorizontal'));
   o._stylePanelVertical   = RClass.register(o, new AStyle('_stylePanelVertical'));
   o.onBuild               = FUiMenuButtonSplit_onBuild;
   return o;
}
function FUiMenuButtonSplit_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   if(RClass.isClass(o._parent, FUiMenuBar)){
      hPanel.className = o.styleName('PanelVertical');
   }else{
      hPanel.className = o.styleName('PanelHorizontal');
   }
}
function FUiPopupMenu(o){
   o = RClass.inherits(this, o, FUiContainer, MUiPopup);
   o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
   o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
   o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   o._styleButton    = RClass.register(o, new AStyle('_styleButton'));
   o._opener         = null;
   o._visible        = false;
   o._statusVisible  = false;
   o._hContainer     = null;
   o._hLabel         = null;
   o._hButtonPanel   = null;
   o._hIcon          = null;
   o._hText          = null;
   o.onBuild         = FUiPopupMenu_onBuild;
   o.appendChild     = FUiPopupMenu_appendChild;
   o.show            = FUiPopupMenu_show;
   o.setVisible      = FUiPopupMenu_setVisible;
   o.testInRange     = FUiPopupMenu_testInRange;
   o.doBlur          = FUiPopupMenu_doBlur;
   o.dispose         = FUiPopupMenu_dispose;
   return o;
}
function FUiPopupMenu_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
   var hLineTop = o._hLineTop = RBuilder.appendTableCell(hForm);
   hLineTop.bgColor = '#666666';
   hLineTop.height = '2px';
   var hContainerPanel = o._hContainerPanel = RBuilder.appendTableCell(hForm);
   var hLineBottom = o._hLineBottom = RBuilder.appendTableCell(hForm);
   hLineBottom.bgColor = '#666666';
   hLineBottom.height = '2px';
   var hContainer = o._hContainer = RBuilder.appendTable(hContainerPanel, o.styleName('Container'));
}
function FUiPopupMenu_doBlur(){
   var o = this;
}
function FUiPopupMenu_appendChild(control){
   var o = this;
   var hButtonPanel = RBuilder.appendTableRowCell(o._hContainer);
   hButtonPanel.className = o.styleName('Button');
   hButtonPanel.appendChild(control._hPanel);
}
function FUiPopupMenu_show(h, positionCd, v){
   var o = this;
   var hPanel = o._hPanel;
   var opener = o._opener;
   o.setVisible(true);
   var hOpener = opener._hPanel;
   var openerWidth = hOpener.offsetWidth;
   var openerHeight = hOpener.offsetHeight;
   var width = hPanel.offsetWidth;
   var height = hPanel.offsetHeight;
   var style = hPanel.style;
   if(width < openerWidth){
      width = openerWidth;
   }
   if(height > 300){
      o._hFormPanel.style.overflowY = 'scroll';
      style.height = height + 'px';
   }
   style.left = '3px';
   style.top = (openerHeight + 1) + 'px';
   style.width = width + 'px';
   style.zIndex = RUiLayer.next();
}
function FUiPopupMenu_setVisible(visible){
   var o = this;
   var opener = o._opener;
   o._statusVisible = visible;
   var hOpener = opener._hPanelCell;
   var hPanel = o.panel(EPanel.Container);
   if(visible){
      hOpener.appendChild(hPanel);
   }else{
      hOpener.removeChild(hPanel);
   }
}
function FUiPopupMenu_testInRange(e){
   return this == RControl.htmlControl(e.srcElement, FUiPopupMenu);
}
function FUiPopupMenu_dispose(e){
   var o = this;
   o._hContainer = RMemory.free(o._hContainer);
   o._hPanel = RMemory.free(o._hPanel);
   o._hLabel = RMemory.free(o._hLabel);
   o._hLastRow = RMemory.free(o._hLastRow);
   o.__base.FUiContainer.dispose.call(o);
}
function MUiToolButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FUiToolBar(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
   o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
   o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = FUiToolBar_onBuildPanel;
   o.onEnter           = RMethod.empty;
   o.onLeave           = RMethod.empty;
   o.appendChild       = FUiToolBar_appendChild;
   o.removeChild       = FUiToolBar_removeChild;
   o.dispose           = FUiToolBar_dispose;
   return o;
}
function FUiToolBar_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiToolBar_appendChild(control){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, control);
   if(RClass.isClass(control, MUiToolButton)){
      var h = o._hPanel;
      var hl = o._hLine;
      if(o._directionCd == EUiDirection.Horizontal){
         if(!hl){
            hl = o._hLine = RBuilder.appendTableRow(h);
         }
      }
      if(o._directionCd == EUiDirection.Vertical){
         hl = o._hLine = RBuilder.appendTableRow(h);
      }
      var hc = RBuilder.appendTableCell(hl, o.styleName('ButtonPanel'));
      control._hPanelCell = hc;
      control.setPanel(hc);
   }
}
function FUiToolBar_removeChild(p){
   var o = this;
   if(RClass.isClass(p, MUiToolButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParent = null;
      p._hParentLine = null;
   }
   o.__base.FUiContainer.removeChild.call(o, p);
}
function FUiToolBar_dispose(){
   var o = this;
   o._hLine = RHtml.free(o._hLine);
   o.__base.FUiContainer.dispose.call(o);
}
function FUiToolButton(o){
   o = RClass.inherits(this, o, FUiControl, MUiToolButton, MListenerClick);
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._action          = RClass.register(o, new APtyString('_action'));
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleNormal     = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover      = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress      = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable    = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIconPanel  = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleSpacePanel = RClass.register(o, new AStyle('_styleSpacePanel'));
   o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = FUiToolButton_onBuildPanel;
   o.onBuildButton    = FUiToolButton_onBuildButton;
   o.onBuild          = FUiToolButton_onBuild;
   o.onEnter          = FUiToolButton_onEnter;
   o.onLeave          = FUiToolButton_onLeave;
   o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiToolButton_onMouseDown);
   o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiToolButton_onMouseUp);
   o.icon             = FUiToolButton_icon;
   o.setIcon          = FUiToolButton_setIcon;
   o.setLabel         = FUiToolButton_setLabel;
   o.setHint          = FUiToolButton_setHint;
   o.setEnable        = FUiToolButton_setEnable;
   o.doClick          = FUiToolButton_doClick;
   o.dispose          = FUiToolButton_dispose;
   return o;
}
function FUiToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiToolButton_onBuildButton(p){
   var o = this;
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Normal'));
   var hLine = o._hLine = RBuilder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o.hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
function FUiToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o.onBuildButton(p);
}
function FUiToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hForm.className = o.styleName('Hover');
   }
}
function FUiToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hForm.className = o.styleName('Normal');
   }
}
function FUiToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hForm.className = this.styleName('Press');
      o.doClick();
   }
}
function FUiToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hForm.className = o.styleName('Hover');
   }
}
function FUiToolButton_icon(){
   return this._icon;
}
function FUiToolButton_setIcon(p){
   var o = this;
   o._icon = p;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(o._icon);
   }
}
function FUiToolButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   var h = o._hLabelPanel;
   if(h){
      RHtml.textSet(h, s);
   }
}
function FUiToolButton_setHint(p){
   var o = this;
   o._hint = p;
   var s = RString.nvl(p);
   if(o._hint){
      if(o._hotkey){
         s += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = o._hint;
}
function FUiToolButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.oeEnable.call(o, e);
   o._disabled = !e.enable;
   if(e.enable && o._icon){
      var is = RResource.iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = RResource.iconPath(o._iconDisable);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }
   var css = o.styleName(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   var css = o.styleName(e.enable ? 'Button' : 'Disable');
   if(o._hPanel.className != css){
      o._hPanel.className = css;
   }
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}
function FUiToolButton_doClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FUiFocusConsole).blur();
      RLogger.debug(o, 'Tool button click. (label={1})', o._label);
      var event = new SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
function FUiToolButton_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   o._hLine = RHtml.free(o._hLine);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hSpacePanel = RHtml.free(o._hSpacePanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiToolButtonCheck(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
   o._groupName      = RClass.register(o, new APtyString('_groupName'));
   o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
   o._statusChecked  = false;
   o.onEnter         = FUiToolButtonCheck_onEnter;
   o.onLeave         = FUiToolButtonCheck_onLeave;
   o.onMouseDown     = FUiToolButtonCheck_onMouseDown;
   o.onMouseUp       = FUiToolButtonCheck_onMouseUp;
   o.groupName       = FUiToolButtonCheck_groupName;
   o.setGroupName    = FUiToolButtonCheck_setGroupName;
   o.groupDefault    = FUiToolButtonCheck_groupDefault;
   o.setGroupDefault = FUiToolButtonCheck_setGroupDefault;
   o.innerCheck      = FUiToolButtonCheck_innerCheck;
   o.isCheck         = FUiToolButtonCheck_isCheck;
   o.check           = FUiToolButtonCheck_check;
   o.dispose         = FUiToolButtonCheck_dispose;
   return o;
}
function FUiToolButtonCheck_onEnter(p){
   var o = this;
   if(!o._statusChecked){
      o._hForm.className = this.styleName('Hover');
   }
}
function FUiToolButtonCheck_onLeave(p){
   var o = this;
   if(!o._statusChecked){
      o._hForm.className = this.styleName('Normal');
   }
}
function FUiToolButtonCheck_onMouseDown(p){
   var o = this;
   o.check(!o._statusChecked);
   var event = new SClickEvent(o);
   event.checked = o._statusChecked;
   o.processClickListener(event, o._statusChecked);
   event.dispose();
}
function FUiToolButtonCheck_onMouseUp(){
   var o = this;
}
function FUiToolButtonCheck_groupName(){
   return this._groupName;
}
function FUiToolButtonCheck_setGroupName(p){
   this._groupName = p;
}
function FUiToolButtonCheck_groupDefault(){
   return this._groupDefault;
}
function FUiToolButtonCheck_setGroupDefault(p){
   this._groupDefault = p;
}
function FUiToolButtonCheck_innerCheck(p){
   var o = this;
   if(o._statusChecked != p){
      o._statusChecked = p;
      if(p){
         o._hForm.className = o.styleName('Press');
      }else{
         o._hForm.className = o.styleName('Normal');
      }
   }
}
function FUiToolButtonCheck_isCheck(){
   return this._statusChecked;
}
function FUiToolButtonCheck_check(p){
   var o = this;
   if(!p){
      if(o._groupDefault == o){
         return;
      }
   }
   o.innerCheck(p);
   if(!o._parent){
      return;
   }
   if(p){
      if(!RString.isEmpty(o._groupName)){
         var cs = o._parent.components();
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            if(c != o){
               if(RClass.isClass(c, FUiToolButtonCheck)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      if(!RString.isEmpty(o._groupDefault)){
         var components = o._parent.components();
         var control = components.get(o._groupDefault);
         if(control){
            control.innerCheck(true);
         }else{
            RLogger.error("Can't find group default control. (name={1})", o._groupDefault);
         }
      }
   }
}
function FUiToolButtonCheck_dispose(){
   var o = this;
   o._statusChecked = null;
   o._groupName = null;
   o.__base.FUiToolButton.dispose.call(o);
}
function FUiToolButtonEdit(o){
   o = RClass.inherits(this, o, FUiToolButton, MListenerDataChanged);
   o._editSize      = RClass.register(o, new APtySize2('_editSize'));
   o._hEdit         = null;
   o.onBuildButton  = FUiToolButtonEdit_onBuildButton;
   o.onEnter        = RMethod.empty;
   o.onLeave        = RMethod.empty;
   o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiToolButtonEdit_onInputEdit);
   o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FUiToolButtonEdit_onInputKeyDown);
   o.construct      = FUiToolButtonEdit_construct;
   o.text           = FUiToolButtonEdit_text;
   o.setText        = FUiToolButtonEdit_setText;
   return o;
}
function FUiToolButtonEdit_onBuildButton(p){
   var o = this;
   var hPanel = o._hPanel;
   var hForm = o._hForm = RBuilder.appendTable(hPanel);
   var hLine = o._hLine = RBuilder.appendTableRow(hForm);
   var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hLine);
   var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
   o.attachEvent('onInputKeyDown', hEdit);
   o._hEditSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
      o.attachEvent('onMouseDown', hLabelPanel);
      o.attachEvent('onMouseUp', hLabelPanel);
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
function FUiToolButtonEdit_onInputEdit(event){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiToolButtonEdit_onInputKeyDown(event){
   var o = this;
   if(event.keyCode == EKeyCode.Enter){
      o.doClick();
   }
}
function FUiToolButtonEdit_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   o._editSize = new SSize2();
}
function FUiToolButtonEdit_text(){
   return this._hEdit.value;
}
function FUiToolButtonEdit_setText(text){
   this._hEdit.value = text;
}
function FUiToolButtonMenu(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MUiDropable, MUiFocus);
   o._menu           = null;
   o._statusDrop     = false;
   o._hDropPanel     = null;
   o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
   o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
   o.onBuild         = FUiToolButtonMenu_onBuild;
   o.onEnter         = FUiToolButtonMenu_onEnter;
   o.onLeave         = FUiToolButtonMenu_onLeave;
   o.onMouseDown     = FUiToolButtonMenu_onMouseDown;
   o.onBlur          = FUiToolButtonMenu_onBlur;
   o.onMouseUp       = RMethod.empty;
   o.construct       = FUiToolButtonMenu_construct;
   o.push            = FUiToolButtonMenu_push;
   o.drop            = FUiToolButtonMenu_drop;
   o.doClick         = FUiToolButtonMenu_doClick;
   o.dispose         = FUiToolButtonMenu_dispose;
   return o;
}
function FUiToolButtonMenu_onBuild(event){
   var o = this;
   o.__base.FUiToolButton.onBuild.call(o, event);
   var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
   o.onBuildDrop(hDropPanel);
   o._menu.onBuild(event);
}
function FUiToolButtonMenu_onEnter(event){
   var o = this;
   if(!o._statusDrop){
      o.__base.FUiToolButton.onEnter.call(o, event);
   }
}
function FUiToolButtonMenu_onLeave(event){
   var o = this;
   if(!o._statusDrop){
      o.__base.FUiToolButton.onLeave.call(o, event);
   }
}
function FUiToolButtonMenu_onMouseDown(){
   var o = this;
   if(!o._statusDrop){
      o._hForm.className = this.styleName('Press');
      o.doClick();
   }
}
function FUiToolButtonMenu_onBlur(e){
   var o = this;
}
function FUiToolButtonMenu_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   var menu = o._menu = RClass.create(FUiPopupMenu);
   menu._opener = o;
}
function FUiToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MUiMenuButton)){
      return o._menu.push(c);
   }
   o.__base.FUiToolButton.push.call(o, c);
}
function FUiToolButtonMenu_drop(flag){
   var o = this;
   if(!o._disabled){
      o._statusDrop = !o._statusDrop;
      if(o._statusDrop){
         o._hForm.className = o.styleName('Press');
         o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
         RConsole.find(FUiPopupConsole).show(o._menu);
      }else{
         o._hForm.className = o.styleName('Normal');
         o._menu.hide();
      }
   }
}
function FUiToolButtonMenu_doClick(){
   var o = this;
   o.__base.FUiToolButton.doClick.call(o);
   o.drop(!o._statusDrop);
}
function FUiToolButtonMenu_dispose(){
   var o = this;
   o._hDropIcon = RHtml.free(o._hDropIcon);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o.__base.FControl.dispose.call(o);
}
function FUiToolButtonSplit(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiToolButton);
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
   o.onBuild     = FUiToolButtonSplit_onBuild;
   return o;
}
function FUiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
function FUiToolButtonText(o){
   o = RClass.inherits(this, o, FUiToolButton);
   return o;
}
var RUiToolBar = new function RUiToolBar(){
   var o = this;
   o.fromNode = RUiToolBar_fromNode;
   return o;
}
function RUiToolBar_mergeNode(xtb, xNode, r){
   var ns = xNode.nodes;
   for(var j=0; j<ns.count; j++){
      var n = ns.get(j);
      if('ToolBar' == n.name){
         if(n.nodes){
            for(var i=0; i<n.nodes.count; i++){
               xtb.push(n.nodes.get(i));
            }
         }
      }
   }
   if(r){
      for(var j=ns.count-1; j>=0; j--){
         var n = ns.get(j);
         if('ToolBar' == n.name){
            ns.removeItem(n);
         }
      }
   }
   return xtb;
}
function RUiToolBar_fromNode(control, config, panel, r){
   if(config && config._nodes){
      var xtb = null;
      var ns = config._nodes;
      var jc = ns.count();
      for(var j = 0; j < jc; j++){
         var n = ns.getAt(j);
         if(n.isName('ToolBar')){
            if(!xtb){
               xtb = n;
            }else if(n.hasNode()){
               xtb.nodes().append(n.nodes());
            }
         }
      }
      if(r){
         for(var i = 0; i < ns.count(); i++){
            var n = ns.getAt(i);
            if(n.isName('ToolBar')){
               ns.erase(i--);
            }
         }
      }
      if(xtb){
         RControl.build(control, xtb, null, panel);
      }
   }
}
function FUiPageControl(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._sizeCd          = EUiSize.Horizontal;
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
   o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
   o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
   o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = EUiSize.Both;
   o._hTop            = null;
   o._hLine           = null;
   o._hBottom         = null;
   o._hSheets         = null;
   o.onBuildPanel     = FUiPageControl_onBuildPanel;
   o.onBuild          = FUiPageControl_onBuild;
   o.oeRefresh        = FUiPageControl_oeRefresh;
   o.construct        = FUiPageControl_construct;
   o.appendChild      = FUiPageControl_appendChild;
   o.select           = FUiPageControl_select;
   o.selectByIndex    = FUiPageControl_selectByIndex;
   o.sheet            = FUiPageControl_sheet;
   o.push             = FUiPageControl_push;
   o.dispose          = FUiPageControl_dispose;
   return o;
}
function FUiPageControl_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   h.width = '100%';
}
function FUiPageControl_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
   var h = o._hPanel;
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
   var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = RBuilder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = RBuilder.appendTableRow(hf);
   var hr = o._hBottom = RBuilder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
   hc.width = 12;
   o._hFirst = RBuilder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FUiPageSheet);
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiPageSheet);
}
function FUiPageControl_oeRefresh(event){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, event);
   if(event.isBefore()){
      if(o._sheets.count()){
         if(o._activeSheet){
            o._activeSheet.oeRefresh(e);
         }else{
            var s = o._activeSheet = o._sheets.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
function FUiPageControl_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._sheets = new TDictionary();
}
function FUiPageControl_appendChild(control){
   var o = this;
   if(RClass.isClass(control, FUiPageSheet)){
      var ci = o._hLast.cellIndex;
      var hc = control._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = control.styleName('Top');
      var hc = control._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Left');
      var hc = control._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
      control.attachEvent('onButtonEnter', hc);
      control.attachEvent('onButtonLeave', hc);
      control.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = control._hButton = RBuilder.appendDiv(hc, control.styleName('Button'));
      if(control.icon){
         control._hIcon = RBuilder.appendIcon(hb, null, control.icon);
      }
      if(control.label){
         control._hText = RBuilder.appendSpan(hb, control.styleName('ButtonText'));
         control._hText.innerText = ' ' + control.label();
      }
      var hc = control._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Right')
      var hc = control._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hc = control._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = control.styleName('Bottom');
      var hc = control._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hr = RBuilder.appendTableRow(o._hPanel);
      if(control.index){
         hr.style.display = 'none';
      }
      var hc = RBuilder.appendTableCell(hr);
      control._hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(control._hPanel);
      o.selectByIndex(0);
   }
}
function FUiPageControl_sheet(name){
   return this._sheets.get(name);
}
function FUiPageControl_select(sheet){
   var o = this;
   o._activeSheet = sheet;
   var sheets = o._sheets;
   var count = sheets.count();
   for(var i = 0; i < count; i++){
      var findSheet = sheets.at(i);
      if(findSheet != sheet){
         findSheet.select(false);
      }
   }
   sheet.select(true);
}
function FUiPageControl_selectByIndex(n){
   var o = this;
   var sheet = o._sheets.value(n);
   if(sheet){
      o.select(sheet);
   }
}
function FUiPageControl_push(component){
   var o = this;
   if(RClass.isClass(component, FUiPageSheet)){
      var sheets = o._sheets;
      component._pageControl = o;
      component._index = sheets.count();
      sheets.set(component.name(), component);
   }
   o.__base.FUiContainer.push.call(o, component);
}
function FUiPageControl_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiPageSheet(o){
   o = RClass.inherits(this, o, FUiLayout);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._formName          = RClass.register(o, new APtyString('_formName'));
   o._formLink          = RClass.register(o, new APtyString('_formLink'));
   o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
   o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
   o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
   o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
   o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
   o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
   o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
   o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
   o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
   o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
   o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
   o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
   o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
   o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
   o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
   o._top               = 0;
   o._pages             = null;
   o._index             = null;
   o._selected          = false;
   o._hasBuilded        = false;
   o.lsnsSelect         = null;
   o._hTopL             = null;
   o._hTop              = null;
   o._hTopR             = null;
   o._hLeft             = null;
   o._hButton           = null;
   o._hIcon             = null;
   o._hText             = null;
   o._hBottomL          = null;
   o._hBottom           = null;
   o._hBottomR          = null;
   o._hRight            = null;
   o.onBuildPanel       = FUiPageSheet_onBuildPanel;
   o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiPageSheet_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FUiPageSheet_onHeadMouseDown);
   o.construct          = FUiPageSheet_construct;
   o.innerSelect        = FUiPageSheet_innerSelect;
   o.select             = FUiPageSheet_select;
   o.setVisible         = FUiPageSheet_setVisible;
   o.dispose            = FUiPageSheet_dispose
   o.innerDump          = FUiPageSheet_innerDump;
   return o;
}
function FUiPageSheet_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = o._hContainer = RBuilder.createDiv(event, o.styleName('Panel'));
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   var hForm = o._hPanelForm = RBuilder.appendTable(hPanel);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
function FUiPageSheet_onButtonEnter(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
function FUiPageSheet_onButtonLeave(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
function FUiPageSheet_onHeadMouseDown(event){
   var o = this;
   o._parent.select(o);
}
function FUiPageSheet_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   o.lsnsSelect = new TListeners();
}
function FUiPageSheet_innerSelect(flag){
   var o = this;
   var b = o._parent;
   if(flag && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeSheet._index - 1 == o._index);
   if(o._selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o._selected = flag;
   }
   o._hButton.className = flag ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = flag ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = flag ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = flag ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   RHtml.visibleSet(o._hForm, flag);
}
function FUiPageSheet_select(flag){
   var o = this;
   o.innerSelect(flag);
   if(flag){
      o.psRefresh();
      o.psResize();
   }
}
function FUiPageSheet_setVisible(flag){
   var o = this;
   RHtml.displaySet(o._hPanel, flag);
}
function FUiPageSheet_dispose(){
   var o = this;
   o._hButton = RMemory.free(o._hButton);
   o._hTop = RMemory.free(o._hTop);
   o._hLeft = RMemory.free(o._hLeft);
   o._hBottomL = RMemory.free(o._hBottomL);
   o._hBottom = RMemory.free(o._hBottom);
   o._hBottomR = RMemory.free(o._hBottomR);
   o._hRight = RMemory.free(o._hRight);
   o.__base.FUiLayout.dispose.call(o);
}
function FUiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, RClass.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
function FUiTabBar(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   o._sizeCd          = EUiSize.Horizontal;
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
   o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
   o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
   o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
   o._buttons          = null;
   o._activeButton     = null;
   o._esize           = EUiSize.Both;
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   o.onBuildPanel     = FUiTabBar_onBuildPanel;
   o.onBuild          = FUiTabBar_onBuild;
   o.oeRefresh        = FUiTabBar_oeRefresh;
   o.construct        = FUiTabBar_construct;
   o.activeButton      = FUiTabBar_activeButton;
   o.appendChild      = FUiTabBar_appendChild;
   o.select           = FUiTabBar_select;
   o.selectByIndex    = FUiTabBar_selectByIndex;
   o.selectByName     = FUiTabBar_selectByName;
   o.sheet            = FUiTabBar_sheet;
   o.push             = FUiTabBar_push;
   o.dispose          = FUiTabBar_dispose;
   return o;
}
function FUiTabBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}
function FUiTabBar_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
   hc.vAlign = 'bottom';
   var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = RBuilder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = RBuilder.appendTableRow(hf);
   var hr = o._hBottom = RBuilder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
   hc.width = 20;
   o._hFirst = RBuilder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FUiTabButton);
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiTabButton);
}
function FUiTabBar_oeRefresh(p){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      if(o._buttons.count()){
         if(o._activeButton){
            o._activeButton.oeRefresh(e);
         }else{
            var s = o._activeButton = o._buttons.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
function FUiTabBar_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._buttons = new TDictionary();
}
function FUiTabBar_activeButton(){
   return this._activeButton;
}
function FUiTabBar_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiTabButton)){
      var ci = o._hLast.cellIndex;
      var hc = p._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      var hc = p._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onButtonClick', hc);
      hc.width = 1;
      var hb = p._hButton = RBuilder.append(hc, 'DIV', p.styleName('Button'));
      if(p.icon){
         p._hIcon = RBuilder.appendIcon(hb, null, p.icon);
      }
      if(p.label){
         p._hText = RBuilder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      var hc = p._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      var hc = p._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      o.selectByIndex(0);
   }
}
function FUiTabBar_sheet(p){
   return this._buttons.get(p);
}
function FUiTabBar_select(p){
   var o = this;
   var ss = o._buttons;
   var c = ss.count();
   o._activeButton = p;
   for(var i = 0; i < c; i++){
      var s = o._buttons.value(i);
      if(s != p){
         s.select(false);
      }
   }
   p.select(true);
}
function FUiTabBar_selectByIndex(index){
   var o = this;
   var sheet = o._buttons.value(index);
   if(sheet){
      o.select(sheet);
   }
}
function FUiTabBar_selectByName(name){
   var o = this;
   var sheet = o.findControl(name);
   if(sheet){
      o.select(sheet);
   }
}
function FUiTabBar_push(component){
   var o = this;
   if(RClass.isClass(component, FUiTabButton)){
      var buttons = o._buttons;
      component._index = buttons.count();
      buttons.set(component.name(), component);
   }
   o.__base.FUiContainer.push.call(o, component);
}
function FUiTabBar_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiTabButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._formName          = RClass.register(o, new APtyString('_formName'));
   o._formLink          = RClass.register(o, new APtyString('_formLink'));
   o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
   o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
   o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
   o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
   o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
   o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
   o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
   o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
   o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
   o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
   o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
   o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
   o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
   o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
   o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
   o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
   o._top               = 0;
   o._pages             = null;
   o._index             = null;
   o._selected          = false;
   o._hasBuilded        = false;
   o.lsnsSelect         = null;
   o._hTopL             = null;
   o._hTop              = null;
   o._hTopR             = null;
   o._hLeft             = null;
   o._hButton           = null;
   o._hIcon             = null;
   o._hText             = null;
   o._hBottomL          = null;
   o._hBottom           = null;
   o._hBottomR          = null;
   o._hRight            = null;
   o.onBuildPanel       = FUiTabButton_onBuildPanel;
   o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiTabButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiTabButton_onButtonLeave);
   o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FUiTabButton_onButtonClick);
   o.construct          = FUiTabButton_construct;
   o.innerSelect        = FUiTabButton_innerSelect;
   o.select             = FUiTabButton_select;
   o.setVisible         = FUiTabButton_setVisible;
   o.doClick            = FUiTabButton_doClick;
   o.dispose            = FUiTabButton_dispose
   o.innerDump          = FUiTabButton_innerDump;
   return o;
}
function FUiTabButton_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
   hp.width = '100%';
   hp.height = '100%';
}
function FUiTabButton_onButtonEnter(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
function FUiTabButton_onButtonLeave(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
function FUiTabButton_onButtonClick(p){
   this.doClick();
}
function FUiTabButton_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o.lsnsSelect = new TListeners();
}
function FUiTabButton_innerSelect(p){
   var o = this;
   var b = o._parent;
   if(p && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeButton._index - 1 == o._index);
   if(o._selected != p){
      if(p){
         o.lsnsSelect.process();
      }
      o._selected = p;
   }
   o._hButton.className = p ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = p ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = p ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = p ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
}
function FUiTabButton_select(p){
   var o = this;
   o.innerSelect(p);
   if(p){
      o.psRefresh();
      o.psResize();
   }
}
function FUiTabButton_setVisible(p){
   var o = this;
   RHtml.displaySet(o._hPanel, p);
}
function FUiTabButton_doClick(){
   var o = this;
   o._parent.select(o);
   var e = new SClickEvent(o);
   o.processClickListener(e);
   e.dispose();
}
function FUiTabButton_dispose(){
   var o = this;
   o._hButton = RMemory.free(o._hButton);
   o._hTop = RMemory.free(o._hTop);
   o._hLeft = RMemory.free(o._hLeft);
   o._hBottomL = RMemory.free(o._hBottomL);
   o._hBottom = RMemory.free(o._hBottom);
   o._hBottomR = RMemory.free(o._hBottomR);
   o._hRight = RMemory.free(o._hRight);
   o.__base.FUiControl.dispose.call(o);
}
function FUiTabButton_innerDump(s, l){
   var o = this;
   s.append(l, RClass.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
function FUiTreeColumn(o){
   o = RClass.inherits(this, o, FUiControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FUiTreeColumn_oeBuild;
   o.onBuildPanel = FUiTreeColumn_onBuildPanel;
   return o;
}
function FUiTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FUiControl.oeBuild.call(o, event);
   var h = o.hPanel;
   h.innerText = RString.nvl(o.label);
   h.noWrap = true;
   if(!o.display){
      h.style.display = 'block';
   }
   if(o.width){
      h.width = o.width;
   }
   return EEventStatus.Stop;
}
function FUiTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FUiTreeLevel(o){
   o = RClass.inherits(this, o, FUiControl);
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FUiTreeNode(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDataProperties);
   o._valid            = RClass.register(o, new APtyBoolean('_valid', 'is_valid'), true);
   o._child            = RClass.register(o, new APtyBoolean('_child', 'has_child'), false);
   o._typeCode         = RClass.register(o, new APtyString('_typeCode'));
   o._guid             = RClass.register(o, new APtyString('_guid'));
   o._code             = RClass.register(o, new APtyString('_code'));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
   o._note             = RClass.register(o, new APtyString('_note'));
   o._attributes       = RClass.register(o, new APtyAttributes('_attributes'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleImage       = RClass.register(o, new AStyle('_styleImage'));
   o._styleIcon        = RClass.register(o, new AStyle('_styleIcon'));
   o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell'));
   o._tree             = null;
   o._level            = 0;
   o._nodes            = null;
   o._cells            = null;
   o._statusLinked     = false;
   o._statusDisplay    = true;
   o._statusSelected   = false;
   o._statusLoaded     = false;
   o._statusHover      = false;
   o._hNodePanel       = null;
   o._hCheck           = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onBuildPanel      = FUiTreeNode_onBuildPanel;
   o.onBuild           = FUiTreeNode_onBuild;
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FUiTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FUiTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FUiTreeNode_onNodeClick);
   o.construct         = FUiTreeNode_construct;
   o.code              = FUiTreeNode_code;
   o.setCode           = FUiTreeNode_setCode;
   o.guid              = FUiTreeNode_guid;
   o.setGuid           = FUiTreeNode_setGuid;
   o.type              = FUiTreeNode_type;
   o.typeCode          = FUiTreeNode_typeCode;
   o.setTypeCode       = FUiTreeNode_setTypeCode;
   o.setLabel          = FUiTreeNode_setLabel;
   o.setNote           = FUiTreeNode_setNote;
   o.level             = FUiTreeNode_level;
   o.setLevel          = FUiTreeNode_setLevel;
   o.cell              = FUiTreeNode_cell;
   o.cells             = FUiTreeNode_cells;
   o.check             = FUiTreeNode_check;
   o.setCheck          = FUiTreeNode_setCheck;
   o.setImage          = FUiTreeNode_setImage;
   o.calculateImage    = FUiTreeNode_calculateImage;
   o.setIcon           = FUiTreeNode_setIcon;
   o.get               = FUiTreeNode_get;
   o.set               = FUiTreeNode_set;
   o.isFolder          = FUiTreeNode_isFolder;
   o.hasChild          = FUiTreeNode_hasChild;
   o.topNode           = FUiTreeNode_topNode;
   o.topNodeByType     = FUiTreeNode_topNodeByType;
   o.nodeCount         = FUiTreeNode_nodeCount;
   o.show              = FUiTreeNode_show;
   o.hide              = FUiTreeNode_hide;
   o.select            = FUiTreeNode_select;
   o.extend            = FUiTreeNode_extend;
   o.extendAll         = FUiTreeNode_extendAll;
   o.searchLast        = FUiTreeNode_searchLast;
   o.createChild       = FUiTreeNode_createChild;
   o.appendChild       = FUiTreeNode_appendChild;
   o.appendNode        = FUiTreeNode_appendNode;
   o.push              = FUiTreeNode_push;
   o.remove            = FUiTreeNode_remove;
   o.removeSelf        = FUiTreeNode_removeSelf;
   o.removeChildren    = FUiTreeNode_removeChildren;
   o.reset             = FUiTreeNode_reset;
   o.click             = FUiTreeNode_click;
   o.refreshStyle      = FUiTreeNode_refreshStyle;
   o.propertyLoad      = FUiTreeNode_propertyLoad;
   o.propertySave      = FUiTreeNode_propertySave;
   o.loadConfig        = FUiTreeNode_loadConfig;
   o.dispose           = FUiTreeNode_dispose;
   o.innerDump         = FUiTreeNode_innerDump;
   return o;
}
function FUiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FUiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiContainer.onBuild.call(o, p);
   var hp = o._hPanel;
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   var hi = o._hIcon = RBuilder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
   if(t.dispChecked){
      var hc = o._hCheck = RBuilder.appendCheck(hnp);
      hc.width = 13;
      hc.height = 13;
      hc.style.borderWidth = 0;
      o.setCheck(o._checked);
      t.linkEvent(o, 'onNodeCheckClick', hc);
   }
   o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
   o.setLabel(o._label);
   var cs = t._nodeColumns;
   if(cs){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.value(n);
         var nc = RClass.create(FUiTreeNodeCell);
         nc._column = c;
         nc.build(p);
         o.push(nc);
      }
   }
}
function FUiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
function FUiTreeNode_onNodeLeave(event){
   var o = this;
   var tree = o._tree;
   if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      tree.lsnsLeave.process(tree, o);
   }
}
function FUiTreeNode_onNodeClick(event){
   var o = this;
   var tree = o._tree;
   var esn = event.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == event.hSender._linkType);
   }
   var isParent = false;
   var find = tree._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      tree.selectNode(o, true);
   }
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         tree.lsnsClick.process(tree, o);
      }
   }else{
      if(o._child){
        if(o.isFolder()){
           o.extend(!o._extended);
        }else{
            if(isImg){
               o.extend(!o._extended);
            }else{
               o.extend(true);
            }
        }
      }
      if((isImg && isParent) || (isImg && !o._child) || !isImg){
         tree.lsnsClick.process(tree, o);
      }
   }
}
function FUiTreeNode_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
}
function FUiTreeNode_code(){
   return this._code;
}
function FUiTreeNode_setCode(p){
   this._code = p;
}
function FUiTreeNode_guid(){
   return this._guid;
}
function FUiTreeNode_setGuid(p){
   this._guid = p;
}
function FUiTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeCode)){
      return null;
   }
   return t.findType(o._typeCode);
}
function FUiTreeNode_typeCode(){
   return this._typeCode;
}
function FUiTreeNode_setTypeCode(p){
   var o = this;
   o._typeCode = p;
   o.setIcon();
}
function FUiTreeNode_setLabel(p){
   var o = this;
   o.__base.FUiContainer.setLabel.call(o, p)
   var h = o._hLabel;
   if(h){
      var s = '';
      if(!RString.isEmpty(o._label)){
         s = '&nbsp;' + o._label;
      }
      if(!RString.isEmpty(o._tag)){
         s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(!RString.isEmpty(o._note)){
         s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
      h.innerHTML = s;
   }
}
function FUiTreeNode_setNote(p){
   var o = this;
   o._note = RString.empty(p);
   o.setLabel(o._label);
}
function FUiTreeNode_level(){
   return this._level;
}
function FUiTreeNode_setLevel(p){
   var o = this;
   o._level = p;
   var h = o._hNodePanel;
   if(h){
      h.style.paddingLeft = (o._tree._indent * p) + 'px';
   }
}
function FUiTreeNode_cell(p){
   return this._cells.get(p);
}
function FUiTreeNode_cells(){
   return this._cells;
}
function FUiTreeNode_check(){
   return this._checked;
}
function FUiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   var attributes = o._attributes;
   if(attributes){
      var value = attributes.get('checked');
      if(!RString.isEmpty(value)){
        o._checked = RBoolean.isTrue(value);
        if(o._hCheck){
            o._hCheck._checked = o._checked;
        }
      }
   }
}
function FUiTreeNode_setImage(){
   var o = this;
   var tree = o._tree;
   var hImage = o._hImage;
   var icon = o._child ? tree._iconPlus : tree._iconNode;
   hImage.src = RResource.iconPath(icon);
}
function FUiTreeNode_calculateImage(){
   var o = this;
   var tree = o._tree;
   var hImage = o._hImage;
   var icon = null;
   var count = o.nodeCount();
   if(count){
      icon = o._extended ? tree._iconMinus : tree._iconPlus;
   }else{
      icon = tree._iconNode;
   }
   hImage.src = RResource.iconPath(icon);
}
function FUiTreeNode_setIcon(p){
   var o = this;
   o._icon = p;
   var h = o._hIcon;
   if(h){
      var ni = null;
      if(o._icon){
         ni = p;
      }else{
         var t = o.type();
         if(t){
            ni = t.icon();
         }
      }
      if(ni){
         RHtml.displaySet(h, true);
         h.style.width = 16;
         h.style.height = 16;
         h.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         h.src = RResource.iconPath(ni);
      }else{
         RHtml.displaySet(h, false);
      }
   }
}
function FUiTreeNode_get(n){
   return this._attributes.get(n);
}
function FUiTreeNode_set(n, v){
   this._attributes.set(n, v);
}
function FUiTreeNode_isFolder(){
   var o = this;
   var t = o.type();
   return t.storage() == 'collections';
}
function FUiTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
function FUiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      if(RClass.isClass(r._parent, FUiTreeNode)){
         r = r._parent;
      }else{
         break;
      }
   }
   return r;
}
function FUiTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeCode == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
function FUiTreeNode_nodeCount(){
   var o = this;
   var nodes = o._nodes
   if(nodes){
      return nodes.count();
   }
   return 0;
}
function FUiTreeNode_show(){
   var o = this;
   var tree = o._tree;
   RHtml.visibleSet(o._hPanel, true);
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = 0; i < count; i++){
         var node = nodes.at(i);
         if(!node._statusLinked){
            tree.appendNode(node, o);
         }
         if(node._statusDisplay){
            RHtml.visibleSet(node._hPanel, true);
            if(node._extended){
               node.show();
            }
         }
      }
   }
}
function FUiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.visibleSet(o._hPanel, false);
   }
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var cv = cs.value(i);
         if(cv){
            cv.hide();
         }
      }
   }
}
function FUiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
function FUiTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o._hImage && !o.hasChild()){
         o._hImage.src = RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = RResource.iconPath(p ? t._iconMinus : t._iconPlus);
      }
      var ns = o._nodes;
      if(p){
         o.show();
      }else if(ns){
         var nc = ns.count();
         for(var i = nc - 1; i >= 0; i--){
            ns.get(i).hide();
         }
      }
   }
   t.refresh();
}
function FUiTreeNode_extendAll(p){
   var o = this;
   o.extend(p);
   var cs = o._components;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         c.extendAll(p);
      }
   }
}
function FUiTreeNode_searchLast(){
   var o = this;
   var s = o._nodes;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i)
         if(n._statusLinked){
            return n.searchLast();
         }
      }
   }
   return o;
}
function FUiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FUiTreeNode);
      r._tree = this._tree;
   }
   return r;
}
function FUiTreeNode_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiTreeNodeCell)){
      o._hPanel.appendChild(p._hPanel);
   }
}
function FUiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
function FUiTreeNode_push(component){
   var o = this;
   var tree = o._tree;
   o.__base.FUiContainer.push.call(o, component);
   if(RClass.isClass(component, FUiTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      var nodes = o._nodes;
      if(!nodes){
         nodes = o._nodes = new TObjects();
      }
      component._tree = tree;
      component._parent = o;
      nodes.push(component);
      tree._allNodes.pushUnique(component);
   }
   if(RClass.isClass(component, FUiTreeNodeCell)){
      var cells = o._cells;
      if(!cells){
         cells = o._cells = new TDictionary();
      }
      component._parent = o;
      component._tree = tree;
      component._node = o;
      cells.set(component._column._name, component);
   }
}
function FUiTreeNode_remove(component){
   var o = this;
   if(RClass.isClass(component, FUiTreeNode)){
      o._nodes.remove(component);
   }
   o.__base.FUiContainer.remove.call(o, component);
}
function FUiTreeNode_removeSelf(){
   var o = this;
   var tree = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      var parent = o._parent;
      if(RClass.isClass(parent, FUiTreeNode)){
         parent.remove(o);
         parent.calculateImage();
      }
      tree.freeNode(o);
   }
}
function FUiTreeNode_removeChildren(){
   var nodes = this._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         var node = nodes.get(i);
         if(node){
            node.removeSelf();
         }
      }
      nodes.clear();
   }
}
function FUiTreeNode_reset(){
   var o = this;
   o._typeCode = null;
   o._guid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
}
function FUiTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FUiTreeNode_refreshStyle(){
   var o = this;
   var cs = o._hPanel.cells;
   var c = cs.length;
   if(o._statusSelected){
      for(var i = 0; i < c; i++){
         cs[i].className = o.styleName('Select');
      }
   }else{
      if(o._statusHover){
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Hover');
         }
      }else{
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Normal');
         }
      }
   }
}
function FUiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.propertyLoad.call(o, x);
   var attributes = o._attributes;
   if(attributes){
      attributes.append(x.attrs);
   }
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
function FUiTreeNode_propertySave(x){
   var o = this;
   o.__base.FUiContainer.propertySave.call(o, x);
   var t = o.type();
   x.set('type_code', t._code);
   x.set('storage', t._storage);
}
function FUiTreeNode_loadConfig(x){
   var o = this;
   o.reset();
   o.propertyLoad(x);
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}
function FUiTreeNode_dispose(){
   var o = this;
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiTreeNode_innerDump(s){
   var o = this;
   s.append(RClass.name(o));
   s.append('[level=',  o._level);
   if(o._typeCode){
      s.append(' type=',  o._typeCode.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o._label);
   s.append(', child=', o._child);
   s.append(']');
}
function FUiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
function FUiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
function FUiTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o._label);
   var sn = RString.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o._hLabel.innerHTML = text;
   if(x.contains('visible')){
      o._statusDisplay = RBool.isTrue(x.get('visible'));
      o.setVisible(o._statusDisplay);
   }
}
function FUiTreeNode_findByName(n){
   var o = this;
   if(o.name == n){
      return o;
   }
   var cs = o.components;
   if(cs){
      var cc = cs.count;
      for(var i=0; i<cc; i++){
         var c = cs.value(i);
         if(c){
            if(c.name == n){
               return c;
            }
            if(c.components){
               var f = c.findByName(n);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FUiTreeNode_findByUuid(u){
   var o = this;
   if(o._guid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._guid == u){
               return c;
            }
            if(c.components){
               var f = c.findByUuid(u);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FUiTreeNode_pushChanged(trd){
   var o = this;
    var d = new TNode();
    d.attrs = o._attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FUiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FUiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FUiTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
function FUiTreeNodeCell(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick, MListenerDoubleClick);
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
   o._tree             = null;
   o._column           = null;
   o._level            = 0;
   o._node             = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onBuildPanel      = FUiTreeNodeCell_onBuildPanel;
   o.onBuild           = FUiTreeNodeCell_onBuild;
   o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiTreeNodeCell_onClick);
   o.onDoubleClick     = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiTreeNodeCell_onDoubleClick);
   o.construct         = FUiTreeNodeCell_construct;
   o.icon              = FUiTreeNodeCell_icon;
   o.setIcon           = FUiTreeNodeCell_setIcon;
   o.get               = FUiTreeNodeCell_get;
   o.set               = FUiTreeNodeCell_set;
   return o;
}
function FUiTreeNodeCell_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
}
function FUiTreeNodeCell_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
function FUiTreeNodeCell_onClick(p){
   var o = this;
   p.treeNode = o._node;
   p.treeColumn = o._column;
   p.treeNodeCell = o;
   o.processClickListener(p);
}
function FUiTreeNodeCell_onDoubleClick(p){
   var o = this;
   p.treeNode = o._node;
   p.treeColumn = o._column;
   p.treeNodeCell = o;
   o.processDoubleClickListener(p);
}
function FUiTreeNodeCell_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o._attributes = new TAttributes();
}
function FUiTreeNodeCell_icon(){
   return o._icon;
}
function FUiTreeNodeCell_setIcon(p){
   var o = this;
   var h = o._hIcon;
   if(!h){
      h = o._hIcon = RBuilder.appendIcon(o._hPanel, null, null, 16, 16)
   }
   h.src = RResource.iconPath(p);
}
function FUiTreeNodeCell_get(){
}
function FUiTreeNodeCell_set(p){
}
function FUiTreeNodeType(o){
   o = RClass.inherits(this, o, FUiComponent);
   o._code       = RClass.register(o, new APtyString('_code'));
   o._storage    = RClass.register(o, new APtyString('_storage'));
   o._icon       = RClass.register(o, new APtyString('_icon'));
   o._service    = RClass.register(o, new APtyString('_service'));
   o._action     = RClass.register(o, new APtyString('_action'));
   o._attributes = RClass.register(o, new APtyAttributes('_attributes'));
   o.construct   = FUiTreeNodeType_construct;
   o.code        = FUiTreeNodeType_code;
   o.storage     = FUiTreeNodeType_storage;
   o.icon        = FUiTreeNodeType_icon;
   o.service     = FUiTreeNodeType_service;
   o.action      = FUiTreeNodeType_action;
   o.get         = FUiTreeNodeType_get;
   o.set         = FUiTreeNodeType_set;
   o.innerDump   = FUiTreeNodeType_innerDump;
   return o;
}
function FUiTreeNodeType_construct(){
   var o = this;
   o.__base.FUiComponent.construct.call(o);
}
function FUiTreeNodeType_code(){
   return this._code;
}
function FUiTreeNodeType_storage(){
   return this._storage;
}
function FUiTreeNodeType_icon(){
   return this._icon;
}
function FUiTreeNodeType_service(){
   return this._service;
}
function FUiTreeNodeType_action(){
   return this._action;
}
function FUiTreeNodeType_get(n){
   var s = this._attributes;
   return s ? s.get(n) : null;
}
function FUiTreeNodeType_set(n, v){
   var s = this._attributes;
   if(s){
      s.set(n, v)
   }
}
function FUiTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append('[code=',  o._code);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
function FUiTreeView(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._optionCheck       = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent            = RClass.register(o, new APtyInteger('_indent'), 16);
   o._stylePanel        = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel    = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm     = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   o._attributes        = null;
   o._nodeTypes         = null;
   o._nodeColumns       = null;
   o._nodeLevels        = null;
   o._nodes             = null;
   o._allNodes          = null;
   o._defaultNodeType   = null;
   o._focusNode         = null;
   o._loadingNode       = null;
   o._freeNodes         = null;
   o._iconPlus          = 'control.treeview.plus';
   o._iconMinus         = 'control.treeview.minus';
   o._iconNode          = 'control.treeview.node';
   o._iconLoading       = 'control.treeview.loading';
   o._hNodePanel        = null;
   o._hNodeForm         = null;
   o._hHeadLine         = null;
   o._hNodeRows         = null;
   o.lsnsEnter          = new TListeners();
   o.lsnsLeave          = new TListeners();
   o.lsnsClick          = new TListeners();
   o.onBuildPanel       = FUiTreeView_onBuildPanel;
   o.onBuild            = FUiTreeView_onBuild;
   o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiTreeView_onClick);
   o.onNodeCheckClick   = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
   o.construct          = FUiTreeView_construct;
   o.attributes         = FUiTreeView_attributes;
   o.nodeTypes          = FUiTreeView_nodeTypes;
   o.nodeColumns        = FUiTreeView_nodeColumns;
   o.nodeLevels         = FUiTreeView_nodeLevels;
   o.hasNode            = FUiTreeView_hasNode;
   o.focusNode          = FUiTreeView_focusNode;
   o.nodes              = FUiTreeView_nodes;
   o.findType           = FUiTreeView_findType;
   o.findByName         = FUiTreeView_findByName;
   o.findByGuid         = FUiTreeView_findByGuid;
   o.createChild        = FUiTreeView_createChild;
   o.createNode         = FUiTreeView_createNode;
   o.appendChild        = FUiTreeView_appendChild;
   o.appendNode         = FUiTreeView_appendNode;
   o.appendNodes        = FUiTreeView_appendNodes;
   o.selectNode         = FUiTreeView_selectNode;
   o.push               = FUiTreeView_push;
   o.removeNode         = FUiTreeView_removeNode;
   o.removeNodes        = FUiTreeView_removeNodes;
   o.freeNode           = FUiTreeView_freeNode;
   o.clearNodes         = FUiTreeView_clearNodes;
   o.calculateHeight    = FUiTreeView_calculateHeight;
   o.fetchChangedChecks = FUiTreeView_fetchChangedChecks;
   o.extendAuto         = FUiTreeView_extendAuto;
   o.extendAll          = FUiTreeView_extendAll;
   o.loadNode           = RMethod.empty;
   o.refresh            = FUiTreeView_refresh;
   o.filterNode         = FUiTreeView_filterNode;
   o.clearAllNodes      = FUiTreeView_clearAllNodes;
   o.clear              = FUiTreeView_clear;
   o.dispose            = FUiTreeView_dispose;
   return o;
}
function FUiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}
function FUiTreeView_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hr = RBuilder.appendTableRow(o._hPanel);
   var hc = RBuilder.appendTableCell(hr);
   var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
   var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   o._hHeadLine = RBuilder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   var node = o._loadingNode = RClass.create(FUiTreeNode);
   node._tree = o;
   node._label = RContext.get('FUiTreeView:loading');
   node._icon = o._iconLoading;
   node.build(event);
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
}
function FUiTreeView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
function FUiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FUiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FUiTreeNode)){
               nd.setCheck(f);
            }
         }
      }
      var p = s.parentNode;
      while(p){
         if(f){
            p.setCheck(f);
            p = p.parentNode;
         }else{
            var pcs = p.controls;
            var pcc = pcs.count;
            for(var n = 0; n < pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && RClass.isClass(pnd, FUiTreeNode)){
                  if(pnd.check()){
                     return;
                  }
               }
            }
            p.setCheck(false);
            p = p.parentNode;
         }
      }
   }
}
function FUiTreeView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._defaultNodeType = RClass.create(FUiTreeNodeType);
}
function FUiTreeView_attributes(){
   return this._attributes;
}
function FUiTreeView_nodeTypes(){
   return this._nodeTypes;
}
function FUiTreeView_nodeColumns(){
   return this._nodeColumns;
}
function FUiTreeView_nodeLevels(){
   return this._nodeLevels;
}
function FUiTreeView_hasNode(){
   return this._rootNode.hasChild();
}
function FUiTreeView_focusNode(){
   return this._focusNode;
}
function FUiTreeView_nodes(){
   return this._nodes;
}
function FUiTreeView_findType(p){
   return this._nodeTypes.get(p);
}
function FUiTreeView_findByName(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._name == p){
            return n;
         }
      }
   }
}
function FUiTreeView_findByGuid(guid){
   var o = this;
   var nodes = o._allNodes;
   var count = nodes.count();
   if(count){
      for(var i = 0; i < count; i++){
         var node = nodes.getAt(i);
         if(node._guid == guid){
            return node;
         }
      }
   }
}
function FUiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = RClass.create(FUiTreeColumn);
         break;
      case 'TreeLevel':
         r = RClass.create(FUiTreeLevel);
         break;
      case 'TreeNodeType':
         r = RClass.create(FUiTreeNodeType);
         break;
      case 'TreeNode':
         r = RClass.create(FUiTreeNode);
         break;
      default:
         throw new TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}
function FUiTreeView_appendChild(child){
   var o = this;
}
function FUiTreeView_createNode(){
   var o = this;
   var node = o._freeNodes.pop();
   if(!node){
      node = RClass.create(FUiTreeNode);
      node._tree = o;
      node.build(o._hPanel);
   }
   RHtml.visibleSet(node._hPanel, true);
   o._allNodes.push(node);
   return node;
}
function FUiTreeView_appendNode(node, parent){
   var o = this;
   if(node._statusLinked){
      return;
   }
   var hPanel = node._hPanel;
   if(parent){
      var nl = parent.searchLast();
      var nr = nl._hPanel.rowIndex;
      if(hPanel.parentElement){
         if(hPanel.rowIndex > nr){
            nr++;
         }
         RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
      }else{
         o._hNodeRows.appendChild(hPanel);
         RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
      }
      node.setLevel(parent._level + 1);
   }else{
      o._hNodeRows.appendChild(hPanel);
      node.setLevel(0);
   }
   node._statusLinked = true;
}
function FUiTreeView_appendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FUiTreeNode);
               tn.parent = parent;
               tn._tree = this;
               tn.loadConfig(nc);
               if(nc._nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc._nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this._allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
function FUiTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
   if(s){
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
         if(!n.isFolder()){
            n.select(true);
            o._focusNode = n;
         }
      }
   }else{
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}
function FUiTreeView_push(control){
   var o = this;
   o.__base.FUiContainer.push.call(o, control);
   control._tree = o;
   if(RClass.isClass(control, FUiTreeColumn)){
      o._nodeColumns.set(control.name(), control);
   }else if(RClass.isClass(control, FUiTreeLevel)){
      o._nodeLevels.set(control.id(), control);
   }else if(RClass.isClass(control, FUiTreeNodeType)){
      o._nodeTypes.set(control.code(), control);
   }else if(RClass.isClass(control, FUiTreeNode)){
      o._nodes.push(control);
      o._allNodes.push(control);
      o.appendNode(control);
   }
}
function FUiTreeView_removeNode(oNode){
   var o = this;
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      o._allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent._nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent._nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent._nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent._nodes.length == 0){
         oParent.imageHTML.src = o.imgEmpty;
      }
      return true;
   }
   return false;
}
function FUiTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FUiTreeView_freeNode(node){
   var o = this;
   if(node._statusLinked){
      node._statusLinked = false;
      o._hNodeRows.removeChild(node._hPanel);
      var cells = node.cells();
      if(cells){
         var cellCount = cells.count();
         for(var i = 0; i < cellCount; i++){
            var cell = cells.at(i);
            cell.clearAllListeners();
         }
      }
      o._allNodes.remove(node);
      o._freeNodes.push(node);
   }
}
function FUiTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this._allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this._allNodes = nodes;
   return true;
}
function FUiTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(RHtml.displayGet(n._hPanel)){
         c++;
      }
   }
   return c * 29;
}
function FUiTreeView_fetchChangedChecks(){
   var o = this;
   var treeView = new TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
function FUiTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(fn._extended);
            if(fn._extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
function FUiTreeView_extendAll(n, f){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count();
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(f);
            o.extendAll(fn, f);
         }
      }
   }
}
function FUiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
function FUiTreeView_filterNode(pl, pa){
   var o = this;
   var nc = o._allNodes.count();
   var nl = null;
   var na = null;
   if(!pl){
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            n.show(true);
         }
      }
   }else{
      label = label.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(pa){
         pa = pa.toLowerCase();
         arAttr = pa.split("|");
         nAttrCount = arAttr.length;
      }
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            nl = n.label.toLowerCase();
            if(arAttr){
               na = n.linkAttr.toLowerCase();
               for(var s = 0; s < nAttrCount; s++){
                  if(na.indexOf(arAttr[s]) != -1){
                     n.show((nl.indexOf(label) != -1));
                     break;
                  }
               }
            }else{
               n.show((nl.indexOf(label) != -1));
            }
         }
      }
   }
}
function FUiTreeView_clearAllNodes(){
   var o = this;
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         nodes.get(i).removeSelf();
      }
      nodes.clear();
   }
   o._allNodes.clear();
}
function FUiTreeView_clear(){
   var o = this;
   o.clearAllNodes();
}
function FUiTreeView_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   var ns = o._nodes;
   if(ns){
      ns.dispose();
      o._nodes = null;
   }
   var ns = o._allNodes;
   if(ns){
      ns.dispose();
      o._allNodes = null;
   }
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   return true;
}
function FUiDialog(o){
   o = RClass.inherits(this, o, FUiWindow, MUiDescribeFrame);
   o.construct          = FUiDialog_construct;
   return o;
}
function FUiDialog_construct(){
   var o = this;
   o.__base.FUiWindow.construct.call(o);
}
function FUiFramePage(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
   o._hContainer     = null;
   o.onBuildPanel    = FUiFramePage_onBuildPanel;
   o.onBuild         = FUiFramePage_onBuild;
   o.oeResize        = FUiFramePage_oeResize;
   o.appendChild     = FUiFramePage_appendChild;
   o.removeChild     = FUiFramePage_removeChild;
   return o;
}
function FUiFramePage_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
   h.vAlign = 'top';
}
function FUiFramePage_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != EUiScroll.None){
      var hc = o._hContainer = RBuilder.appendDiv(h, o.styleName('Container'));
      RUiControl.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}
function FUiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == EUiDirection.Horizontal){
   }else if(p._directionCd == EUiDirection.Vertical){
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return EEventStatus.Continue;
}
function FUiFramePage_appendChild(control){
   var o = this;
   o._hContainer.appendChild(control._hPanel);
}
function FUiFramePage_removeChild(control){
   var o = this;
   o._hContainer.removeChild(control._hPanel);
}
function FUiFrameSet(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   o._sizeCd       = EUiSize.Fill;
   o._directionCd  = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection), EUiDirection.Vertical);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = FUiFrameSet_onBuildPanel;
   o.construct     = FUiFrameSet_construct;
   o.appendFrame   = FUiFrameSet_appendFrame;
   o.appendSpliter = FUiFrameSet_appendSpliter;
   o.appendChild   = FUiFrameSet_appendChild;
   o.dispose       = FUiFrameSet_dispose;
   return o;
}
function FUiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiFrameSet_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._frames = new TObjects();
}
function FUiFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EUiDirection.Horizontal){
      var hr = o._hLine;
      if(!hr){
         hr = o._hLine = RBuilder.appendTableRow(o._hPanel);
      }
      p.setPanel(hr);
      var sw = p._size.width;
      if(sw){
         p._hPanel.width = sw;
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      p.setPanel(hr);
      var sh = p._size.height;
      if(sh){
         p._hPanel.height = sh;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}
function FUiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = RClass.create(FUiFrameSpliter);
      sp.build(o._hPanel);
   }
   if(o._directionCd == EUiDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == EUiDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
function FUiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(RClass.isClass(p, FUiFramePage)){
      o.appendFrame(p);
      return;
   }else if(RClass.isClass(p, FUiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FUiContainer.appendChild.call(o, p);
}
function FUiFrameSet_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiFrameSpliter(o){
   o = RClass.inherits(this, o, FUiControl, MUiDragable);
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
   o._directionCd  = EUiDirection.Horizontal;
   o._alignCd      = EUiAlign.Left;
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._sizeMin      = 40;
   o._hDrag        = null;
   o._hSize        = null;
   o._hIcon        = null;
   o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
   o.onBuild       = FUiFrameSpliter_onBuild;
   o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
   o.onDoubleClick = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiFrameSpliter_onDoubleClick);
   o.onDragStart   = FUiFrameSpliter_onDragStart;
   o.onDragMove    = FUiFrameSpliter_onDragMove;
   o.onDragStop    = FUiFrameSpliter_onDragStop;
   o.construct     = FUiFrameSpliter_construct;
   o.alignCd       = FUiFrameSpliter_alignCd;
   o.setAlignCd    = FUiFrameSpliter_setAlignCd;
   o.sizeHtml      = FUiFrameSpliter_sizeHtml;
   o.setSizeHtml   = FUiFrameSpliter_setSizeHtml;
   o.changeVisible = FUiFrameSpliter_changeVisible;
   o.dispose       = FUiFrameSpliter_dispose;
   return o;
}
function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
}
function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.style.zIndex = EUiLayer.Drap;
   h.__linker = o;
   var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   RHtml.displaySet(hd, false);
   h.appendChild(hd);
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   o.attachEvent('onDoubleClick', h);
   o._hIcon = RBuilder.appendIcon(h, null, 'control.FSpliter_Left');
   RConsole.find(FDragConsole).register(o);
}
function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
function FUiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}
function FUiFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == EUiDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = RHtml.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = EMouseCursor.HSize;
   }else if(o._directionCd == EUiDirection.Vertical){
      o._dragClientY = e.clientY;
      o._dragPanelY = RHtml.clientY(hc);
      o._sizeY = o._hSize.offsetHeight;
      hds.cursor = EMouseCursor.VSize;
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   hds.left = RHtml.clientX(hc) + 'px';
   hds.top = RHtml.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   RHtml.visibleSet(hd, true);
   RWindow.setOptionSelect(false);
   RWindow.disable();
}
function FUiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > o._sizeMin){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > o._sizeMin){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
function FUiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === EUiAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === EUiAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > o._sizeMin){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === EUiAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === EUiAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > o._sizeMin){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   RHtml.visibleSet(hd, false);
   RWindow.enable();
   RWindow.setOptionSelect(true);
}
function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiFrameSpliter_alignCd(){
   return this._alignCd;
}
function FUiFrameSpliter_setAlignCd(alignCd){
   var o = this;
   if(alignCd == EUiAlign.Left){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
   }else if(alignCd == EUiAlign.Right){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
   }else{
      throw new TError(o, 'Align type is invalid.');
   }
   o._alignCd = alignCd;
}
function FUiFrameSpliter_sizeHtml(){
   return this._hSize;
}
function FUiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}
function FUiFrameSpliter_changeVisible(){
   var o = this;
   var hs = o._hSize;
   if(!hs){
      return;
   }
   var c = null;
   var v = RHtml.visibleGet(hs);
   if(v){
      RHtml.visibleSet(hs, false);
      if(o._alignCd == EUiAlign.Left){
         c = EUiAlign.Right;
      }else if(o._alignCd == EUiAlign.Right){
         c = EUiAlign.Left;
      }
   }else{
      RHtml.visibleSet(hs, true);
      if(o._alignCd == EUiAlign.Left){
         c = EUiAlign.Left;
      }else if(o._alignCd == EUiAlign.Right){
         c = EUiAlign.Right;
      }
   }
   if(c == EUiAlign.Left){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
   }else if(c == EUiAlign.Right){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
   }
   RConsole.find(FUiWorkspaceConsole).resize();
}
function FUiFrameSpliter_dispose(){
   var o = this;
   var h = o._hDrag;
   if(h){
      RHtml.free(h);
      o._hDrag = null;
   }
   var h = o._hSize;
   if(h){
      RHtml.free(h);
      o._hSize = null;
   }
   o.__base.FUiControl.dispose.call(o);
}
function FUiWindow(o){
   o = RClass.inherits(this, o, FUiLayout, MMouseCapture);
   o._statusVisible      = false;
   o._stylePanel         = RClass.register(o, new AStyle('_stylePanel'));
   o._styleBodyForm      = RClass.register(o, new AStyle('_styleBodyForm'));
   o._styleTitleForm     = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleTitlePanel    = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = RClass.register(o, new AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = RClass.register(o, new AStyle('_styleStatusPanel'));
   o._mousePosition      = null;
   o._mouseControl       = null;
   o.onBuildPanel        = FUiWindow_onBuildPanel;
   o.onBuild             = FUiWindow_onBuild;
   o.onMouseCaptureStart = FUiWindow_onMouseCaptureStart;
   o.onMouseCapture      = FUiWindow_onMouseCapture;
   o.onMouseCaptureStop  = FUiWindow_onMouseCaptureStop;
   o.construct      = FUiWindow_construct;
   o.setVisible     = FUiWindow_setVisible;
   o.setLabel       = FUiWindow_setLabel;
   o.showPosition   = FUiWindow_showPosition;
   return o;
}
function FUiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createDiv(event, o.styleName('Panel'));
   var hForm = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
function FUiWindow_onBuild(event){
   var o = this;
   o.__base.FUiLayout.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hBodyForm = o._hBodyForm = RBuilder.appendTable(hPanel, o.styleName('BodyForm'));
   var hTitlePanel = o._hTitlePanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
   hTitlePanel.__linker = o;
   var hBodyPanel = o._hBodyPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
   hBodyPanel.vAlign = 'top'
   o._hStatusPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
   var hTitleForm = o._hTitleForm = RBuilder.appendTable(hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = RBuilder.appendTableRow(hTitleForm);
   var hTitle = o._hTitle = RBuilder.appendTableCell(hTitleLine);
   hTitle.align = 'center';
   RHtml.textSet(hTitle, o._label);
   var hTitleButton = RBuilder.appendTableCell(hTitleLine);
   hTitleButton.width = 20;
   hBodyPanel.appendChild(o._hPanelForm);
   o.refreshSize();
}
function FUiWindow_onMouseCaptureStart(event){
   var o = this;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
   RHtml.cursorSet(o._hPanel, EUiCursor.Move);
}
function FUiWindow_onMouseCapture(event){
   var o = this;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}
function FUiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FUiWindow_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   o._mousePosition = new SPoint2();
   o._mouseControl = new SPoint2();
   RConsole.find(FMouseConsole).register(o);
}
function FUiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   var hPanel = o.panel(EPanel.Container);
   if(visible){
      RWindow._hContainer.appendChild(hPanel);
   }else{
      RWindow._hContainer.removeChild(hPanel);
   }
}
function FUiWindow_setLabel(label){
   var o = this;
   o.__base.FUiLayout.setLabel.call(o, label)
   RHtml.textSet(o._hTitle, o._label);
}
function FUiWindow_showPosition(positionCd){
   var o = this;
   o.show();
   if(positionCd == EUiPosition.Center){
      var width = o._hPanel.offsetWidth;
      var height = o._hPanel.offsetHeight;
      var left = (window.document.body.offsetWidth - width) / 2;
      var top = (window.document.body.offsetHeight - height) / 2;
      o._hPanel.style.left = left + 'px';
      o._hPanel.style.top = top + 'px';
   }
}
function FUiWindow_doFocus(){
   var o = this;
   if(o.searchControls && o.searchControls.count > 0){
      var cs = o.searchControls;
      for(var n = 0; n < cs.count; n++){
         var c = o.searchControls.get(0)
         if(RClass.isClass(c, MEditValue)){
            c.focus();
         }
      }
   }
}
function FUiWindow_oeVisible(e){
   var o = this;
   o.__base.FUiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}
function FUiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FUiLayout.panel.call(o, t);
}
function FUiWindow_dump(oCtl, sLeft){
   var sDump = '';
   if(!oCtl){
      oCtl = this;
   }
   if(!sLeft){
      sLeft = '   ';
   }
   sDump += oCtl.className + '\n';
   if(oCtl.children){
      var arChildren = oCtl.children;
      for(var n=0; n<arChildren.length; n++){
         sDump += sLeft + this.dump(arChildren[n], sLeft + '   ');
      }
   }
   return sDump;
}
function FUiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}
function FUiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}
function FUiWindow_restore(){
   this.max(true);
}
function FUiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}
function FUiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}
function FUiWindow_refresh(bConfig){
   if(this.loadConfig){this.loadConfig();}
   this.setCaption(this.label);
   this.setWidth(this.width);
   this.setHeight(this.height);
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.refresh){
            if(bConfig && oCtl.reloadConfig){
               oCtl.reloadConfig();
            }
            oCtl.refresh();
         }
      }
   }
}
function FUiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}
function FUiWindow_release(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.releaseControl){oCtl.releaseControl();}
         if(oCtl.release){oCtl.release();}
      }
   }
   this.htmlBorder.removeNode(true);
   DatasetManager.focus(null, true);
   WindowManager.releaseWindow(this);
}
function FUiWindow_stopDropExecute(oSource){
   if(oSource.config && oSource.rect){
      var oRect = oSource.rect();
      oSource.config.setAttribute('left', oRect.left);
      oSource.config.setAttribute('top', oRect.top);
      oSource.config.setAttribute('width', oRect.width());
      oSource.config.setAttribute('height', oRect.height());
   }
   if(this.owner.onStopDrop){
      this.owner.onStopDrop(oSource);
   }
}
function FUiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
function FUiWindow_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
var EUiDataAction = new function EUiDataAction(){
   var o = this;
   o.Fetch     = 'fetch';
   o.Search    = 'search';
   o.Lov       = 'lov';
   o.Zoom      = 'zoom';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Action    = 'action';
   o.FetchLov  = 'fetchLov';
   o.EndFetch  = 'endfetch';
   o.EndUpdate = 'endupdate';
   o.DsChanged = 'dschanged';
   o.Scalar    = 'scalar';
   o.Complete  = 'complete';
   o.Process   = 'process';
   return o;
}
var EUiDataMode = new function EUiDataMode(){
   var o = this;
   o.Insert = 'insert';
   o.Update = 'update';
   o.Delete = 'delete';
   return o;
}
var EUiDataService = new function EUiDataService(){
   var o = this;
   o.Dataset    = 'database.dataset';
   o.List       = 'design.list';
   o.WebForm    = 'design.webform';
   o.Translate  = 'design.translate';
   o.WebDataset = 'logic.dataset';
   return o;
}
var EUiDataStore = new function EUiDataStore(){
   var o = this;
   o.Full     = 0;
   o.Sort     = 1;
   o.Config   = 2;
   o.Value    = 3;
   o.Name     = 4;
   o.DataName = 5;
   o.DataNvl  = 6;
   o.Reset    = 7;
   o.Prepare  = 8;
   return o;
}
function MUiDataAction(o){
   o = RClass.inherits(this, o);
   o.doAction = MUiDataAction_doAction
   return o;
}
function MUiDataAction_doAction(n){
   var o = this;
   var c = o.findComponent(n);
   if(RClass.isClass(c, MInvoke)){
      c.invoke(this);
   }else{
      throw new TError(o, 'Component is invalid.');
   }
}
function MUiDataContainer(o){
   o = RClass.inherits(this, o, MUiContainer);
   o.dsDataLoad = MUiDataContainer_dsDataLoad;
   o.dsDataSave = MUiDataContainer_dsDataSave;
   o.dsLoadValue = MUiDataContainer_dsLoadValue;
   o.dsSaveValue = MUiDataContainer_dsSaveValue;
   return o;
}
function MUiDataContainer_dsDataLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataLoad', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}
function MUiDataContainer_dsDataSave(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataSave', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}
function MUiDataContainer_dsLoadValue(r, m){
   var o = this;
   var e = new TEventProcess(o, 'oeDataLoadValue', MUiDataValue);
   e.viewer = o._dataViewer;
   e.store = m;
   e.values = r;
   o.process(e);
}
function MUiDataContainer_dsSaveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = new TEventProcess(o, 'oeDataSaveValue', MUiDataValue);
   e.viewer = o._dataViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o._dataStatusCd);
   return r;
}
function MUiDataField(o){
   o = RClass.inherits(this, o, MUiValue, MUiDataValue);
   o._dataTypeCd     = RClass.register(o, new APtyString('_dataTypeCd'));
   o._dataRequire    = RClass.register(o, new APtyBoolean('_dataRequire'));
   o._dataName       = RClass.register(o, new APtyString('_dataName'));
   o.oeDataLoadValue = MUiDataField_oeDataLoadValue;
   o.oeDataSaveValue = MUiDataField_oeDataSaveValue;
   o.formatLoad      = MUiDataField_formatLoad;
   o.formatSave      = MUiDataField_formatSave;
   return o;
}
function MUiDataField_oeDataLoadValue(dataSource){
   var o = this;
   var values = dataSource.values;
   var value = values.get(o._dataName);
   o.set(o.formatLoad(value));
   return EEventStatus.Stop;
}
function MUiDataField_oeDataSaveValue(p){
   var o = this;
   var value = o.get();
   var values = dataSource.values;
   values.set(o._dataName, o.formatSave(value));
   return EEventStatus.Stop;
}
function MUiDataField_formatLoad(value){
   return value;
}
function MUiDataField_formatSave(value){
   return value;
}
function MUiDataset(o){
   o = RClass.inherits(this, o);
   o._dsDataset         = RClass.register(o, new APtyString('_dsDataset', 'dataset'));
   o._dsPageSize        = RClass.register(o, new APtyInteger('_dsPageSize', 'page_size'), 20);
   o._dsPageIndex       = 0;
   o._dsInsertAction    = RClass.register(o, new APtyString('_dsInsertAction', 'insert_action'));
   o._dsUpdateAction    = RClass.register(o, new APtyString('_dsUpdateAction', 'update_action'));
   o._dsDeleteAction    = RClass.register(o, new APtyString('_dsDeleteAction', 'delete_action'));
   o._dataSource        = null;
   o._dataViewer        = null;
   o._dataValues        = null;
   o._dataGlobalSearchs = null;
   o._dataSearchs       = null;
   o._dataGlobalOrders  = null;
   o._dataOrders        = null;
   o.__progress           = false;
   o.lsnsUpdateBegin    = null;
   o.lsnsUpdateEnd      = null;
   o.onDatasetLoadBegin = RMethod.empty;
   o.onDatasetLoad      = RMethod.empty;
   o.onDatasetLoadEnd   = RMethod.empty;
   o.onStoreChanged     = RMethod.empty;
   o.onDsFetchBegin     = RMethod.empty;
   o.onDsFetchEnd       = RMethod.empty;
   o.onDsUpdateBegin    = RMethod.empty;
   o.onDsUpdateEnd      = RMethod.empty;
   o.onDsFetch          = MUiDataset_onDsFetch;
   o.onDsPrepareCheck   = RMethod.emptyTrue;
   o.onDsCopy           = MUiDataset_onDsCopy;
   o.onDsPrepare        = MUiDataset_onDsPrepare;
   o.onDsUpdateCheck    = RMethod.emptyTrue;
   o.onDsUpdate         = MUiDataset_onDsUpdate;
   o.onDsDoUpdate       = MUiDataset_onDsDoUpdate;
   o.onDsDeleteCheck    = RMethod.emptyTrue;
   o.onDsDelete         = MUiDataset_onDsDelete;
   o.onDsProcess        = MUiDataset_onDsProcess;
   o.oeDataLoad         = MUiDataset_oeDataLoad;
   o.oeDataSave         = MUiDataset_oeDataSave;
   o.oeDatasetLoad      = MUiDataset_oeDatasetLoad;
   o.construct          = MUiDataset_construct;
   o.loadDataset        = MUiDataset_loadDataset;
   o.loadDatasets       = MUiDataset_loadDatasets;
   o.toDeepAttributes   = MUiDataset_toDeepAttributes;
   o.dsDatasetLoad      = MUiDataset_dsDatasetLoad;
   o.dsFetch            = MUiDataset_dsFetch;
   o.dsInitialize        = MUiDataset_dsInitialize;
   o.dsShow              = MUiDataset_dsShow;
   o.dsLoaded            = MUiDataset_dsLoaded;
   o.dsSearch            = MUiDataset_dsSearch;
   o.dsCopy              = MUiDataset_dsCopy;
   o.dsPrepare           = MUiDataset_dsPrepare;
   o.dsUpdate            = MUiDataset_dsUpdate;
   o.dsDelete            = MUiDataset_dsDelete;
   o.dsMode              = MUiDataset_dsMode;
   o.dsDoUpdate          = MUiDataset_dsDoUpdate;
   o.dsProcess           = MUiDataset_dsProcess;
   o.dsProcessCustom     = MUiDataset_dsProcessCustom;
   o.dsProcessChanged    = MUiDataset_dsProcessChanged;
   o.dsProcessSelected   = MUiDataset_dsProcessSelected;
   o.dsProcessAll        = MUiDataset_dsProcessAll;
   o.psProgress          = MUiDataset_psProgress;
   o.psValid             = MUiDataset_psValid;
   o.dsIsChanged         = MUiDataset_dsIsChanged;
   o.dsCount             = MUiDataset_dsCount;
   o.dsCurrent           = MUiDataset_dsCurrent;
   o.dsMove              = MUiDataset_dsMove;
   o.dsMovePage          = MUiDataset_dsMovePage;
   o.dsGet               = MUiDataset_dsGet;
   o.dsSet               = MUiDataset_dsSet;
   o.dsRefresh           = MUiDataset_dsRefresh;
   o.doSearch            = MUiDataset_doSearch;
   return o;
}
function MUiDataset_onDsFetch(g){
   var o = this;
   var ds = g.datasets;
   o.dsDatasetLoad(ds);
}
function MUiDataset_onDsCopy(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
function MUiDataset_onDsPrepare(g){
   var o = this;
   g.resultDatasets.set('/', null);
   o.loadDatasets(g.resultDatasets);
   o.doPrepare(g.resultRow);
   if(g.invokeSuccess()){
	   return;
   }
   o.onLoadDatasetEnd();
   o.focus();
}
function MUiDataset_onDsUpdate(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
function MUiDataset_onDsDoUpdate(g){
   var o = this;
   if(!g.invokeSuccess()){
      o.psRefresh();
   }
   if(!g.processFinish){
      o.focus();
      o.lsnsUpdateEnd.process(g);
   }
   o.onLoadDatasetEnd();
}
function MUiDataset_onDsDelete(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.doDelete(g.resultRow);
   o.onLoadDatasetEnd();
   o.focus();
}
function MUiDataset_onDsProcess(g){
   var o = this;
   var cb = g.resultCallback;
   if(cb){
      cb.invoke(o, g);
   }
}
function MUiDataset_oeDataLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
function MUiDataset_oeDataSave(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
function MUiDataset_oeDatasetLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.datasets;
      var d = ds.get(o._name);
      o._dataset = d;
      o.onDatasetLoad(d);
   }
   return EEventStatus.Contine;
}
function MUiDataset_construct(){
   var o = this;
   o._dataViewer = new TDatasetViewer();
}
function MUiDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o._dataViewer);
   o.onLoadDataset(d);
}
function MUiDataset_loadDatasets(p){
   var o = this;
   var c = p.count();
   for(var i = 0; i < c; i++){
      var d = p.value(n);
      var dc = o.findByPath(d.name)
      if(!dc){
         return RMessage.fatal(o, null, 'Load dataset failed. (dataset={1}', d.name);
      }
      dc.loadDataset(d);
   }
}
function MUiDataset_dsDatasetLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDatasetLoad', MUiDataset);
   e.datasets = p;
   o.process(e);
   e.dispose();
}
function MUiDataset_toDeepAttributes(a, m){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var ts = new TList();
   var p = o;
   while(p){
      if(RClass.isClass(p, MUiDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MUiDataset);
   }
   for(var n=ts.count; n>=0; n--){
      var p = ts.get(n);
      if(RClass.isClass(p, FForm)){
         p.toAttributes(a, m);
      }else if(RClass.isClass(m, FTable)){
         var r = p.getCurrentRow();
         if(r){
            r.toAttributes(a, m);
         }
      }
   }
   return a;
}
function MUiDataset_dsFetch(){
   var o = this;
   var g = new TDatasetFetchArg();
   g.owner = o;
   g.name = o._name;
   g.callback = o.onDsFetch;
   RConsole.find(FDatasetConsole).fetch(g);
}
function MUiDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}
function MUiDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}
function MUiDataset_dsLoaded(){
   this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
}
function MUiDataset_dsSearch(s){
   var o = this;
   o.psProgress(true);
   var tc = o.topControl();
   var pth = o.fullPath();
   if(s){
      pth = s.fullPath();
   }
   var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, 0, true, false, pth);
   g.mode = tc._emode;
   g.searchs.append(o._dataGlobalSearchs);
   g.searchs.append(o._dataSearchs);
   g.orders.append(o._dataGlobalOrders);
   g.orders.append(o._dataOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o._dataValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
}
function MUiDataset_dsCopy(r){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.form = o;
   g.mode = EMode.Insert;
   o._dataSearchs.clear();
   o._dataSearchs.push(new TSearchItem('OUID', r.get("OUID")));
   g.searchs = o._dataSearchs;
   g.callback = new TInvoke(o, o.onDsCopy);
   if(o.onDsUpdateCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
function MUiDataset_dsPrepare(cb){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetPrepareArg(o.name, o.formId);
   g.form = o;
   g.values.append(o._dataValues);
   g.callbackSuccess = cb;
   if(o.onDsPrepareCheck(g)){
      g.callback = new TInvoke(o, o.onDsPrepare);
      RConsole.find(FDatasetConsole).prepare(g);
   }
}
function MUiDataset_dsUpdate(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
function MUiDataset_dsDoUpdate(cb, ck){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var t = o.topControl();
   var g = new TDatasetUpdateArg(t.name, o.formId, o.dsName);
   g.form = o;
   g.path = o.fullPath();
   g.mode = o._emode;
   g.codes = o.getDataCodes();
   g.callback = new TInvoke(o, o.onDsDoUpdate);
   g.callbackSuccess = cb;
   if(EMode.Insert == o._emode || EMode.Delete == o._emode){
      g.dataset.rows.append(o.getCurrentRows());
   }else{
      g.dataset.rows.append(o.getChangedRows());
      if(!ck){
         if(!g.hasData()){
            return RMessage.warn(o, RContext.get('MUiDataset:nochange'));
         }
      }
   }
   o.psProgress(true);
   RConsole.find(FDatasetConsole).update(g);
}
function MUiDataset_dsDelete(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Delete);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.callback = new TInvoke(o, o.onDsDelete);
   g.form = o;
   g.mode = EMode.Delete;
   if(u){
      g.searchs.push(new TSearchItem('OUID', u));
   }
   if(v){
       g.searchs.push(new TSearchItem('OVER', v));
   }
   g.values = o._dataValues;
   if(o.onDsDeleteCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
function MUiDataset_dsMode(m){
   var o = this;
   switch(m){
      case EMode.Insert:
         o.dsPrepare();
         break;
      case EMode.Update:
         o.dsUpdate();
         break;
      case EMode.Delete:
         o.dsDelete();
         break;
   }
}
function MUiDataset_dsProcess(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.push(o.getCurrentRow());
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MUiDataset_dsProcessCustom(pm, da, cb, cc){
	var o = this;
	if(!cc){
	if(!o.psValid()){
	   return;
	}
	}
	var g = new TDatasetServiceArg(o.topControl().name, da);
	g.form = o;
	g.controlName = o.name;
	g.attributes = pm;
	g.codes = o.getDataCodes();
	g.push(o.getCurrentRow());
	g.resultCallback = cb;
	if(!cc){
	   if(!g.hasData()){
	      return RMessage.warn(o, RContext.get('MUiDataset:nodata'));
	   }
	}
	o.psProgress(true);
	g.callback = new TInvoke(o, o.onDsProcess);
	RConsole.find(FFormConsole).process(g);
}
function MUiDataset_dsProcessSelected(da, cb){
	var o = this;
	if(!o.psValid()){
	   return;
	}
	   var g = new TDatasetServiceArg(o.topControl().name, da);
	   g.form = o;
	   g.controlName = o.name;
	   o.toDeepAttributes(g.attributes);
	   g.codes = o.getDataCodes();
	   g.rows = o.getSelectedRows();
	   if(g.rows.count > 0){
		  g.resultCallback = cb;
		  o.psProgress(true);
		  g.callback = new TInvoke(o, o.onDsProcess);
		  RConsole.find(FFormConsole).process(g);
		  o.clearSelectRows();
	   }else{
	      return RMessage.warn(o, RContext.get('MUiDataset:norows'));
	   }
}
function MUiDataset_dsProcessChanged(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getChangedRows();
   g.resultCallback = cb;
   if(!g.hasData()){
      return RMessage.warn(o, RContext.get('MUiDataset:nochange'));
   }
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MUiDataset_dsProcessAll(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getRows();
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MUiDataset_psProgress(v){
   var o = this;
   if(o.__progress == v){
      return;
   }
   o.__progress = v;
   var e = o.__progressProcess;
   e.enable = v;
   o.process(e);
}
function MUiDataset_psValid(){
   var o = this;
   var e = o.__validProcess;
   var cs = e.controls;
   cs.clear();
   o.process(e);
   if(!cs.isEmpty()){
      var cw = RConsole.find(FCheckWindowConsole).find();
      cw.set(cs);
      cw.show();
      return false;
   }
   return true;
}
function MUiDataset_dsIsChanged(){
   var ds = this.dsStore;
   return ds ? ds.isChanged() : false;
}
function MUiDataset_dsCount(){
   return this.dsStore ? this.dsStore.count : 0;
}
function MUiDataset_dsCurrent(){
   var o = this;
   var ds = o.dsStore;
}
function MUiDataset_dsMove(p){
   var o = this;
   var ds = o.dsStore;
   if(null == p && !ds){
      return;
   }
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         ds.moveFirst();
      }else if(EDataAction.Prior == p){
         ds.movePrior();
      }else if(EDataAction.Next == p){
         ds.moveNext();
      }else if(EDataAction.Last == p){
         ds.moveLast();
      }else{
         RMessage.fatal(o, null, 'Unknown position (postion={0})', p);
      }
   }else{
      ds.move(p);
   }
   if(RClass.isClass(o, MValue)){
      o.loadValue(ds.current());
   }
}
function MUiDataset_dsMovePage(p){
   var o = this;
   var ds = o.dsStore;
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         p = 0;
      }else if(EDataAction.Prior == p){
         p = ds.pageIndex;
         if(p > 0){
            p--;
         }
      }else if(EDataAction.Next == p){
         p = ds.pageIndex;
         if(p < ds.pageCount - 1){
            p++;
         }
      }else if(EDataAction.Last == p){
         p = ds.pageCount - 1;
      }else{
         RMessage.fatal(o, null, 'Unknown page (page={0})', p);
      }
   }
   if(p != ds.pageIndex){
      o.psProgress(true);
      var t = o.topControl(MUiDataset);
      var g = new TDatasetFetchArg(t.name, t.formId, o.dsPageSize, p, true);
      g.path =  o.fullPath();
      g.mode = t._emode;
      g.searchs.append(o._dataGlobalSearchs);
      g.searchs.append(o._dataSearchs);
      g.orders.append(o._dataGlobalOrders);
      g.orders.append(o._dataOrders);
      g.values = o.toDeepAttributes();
      g.values.append(o._dataValues);
      g.callback = new TInvoke(o, o.onDsFetch);
      RConsole.find(FDatasetConsole).fetch(g);
   }
}
function MUiDataset_dsGet(n){
   return this.dsStore ? this.dsStore.get(n) : '';
}
function MUiDataset_dsSet(n, v){
   if(this.dsStore){
      this.dsStore.set(n, v);
   }
}
function MUiDataset_dsRefresh(){
   if(this._dsService){
      this.dsMove(this.dsPage, true);
   }
}
function MUiDataset_doSearch(){
   var o = this;
   var sw = o.dsSearchWindow;
   if(!sw){
      sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
      sw.linkDsControl(o);
   }
   sw.show();
}
function MUiDataValue(o){
   o = RClass.inherits(this, o);
   o.oeDataLoadValue = RMethod.empty;
   o.oeDataSaveValue = RMethod.empty;
   return o;
}
var RUiDataEvent = new function RUiDataEvent(){
   var o = this;
   o.clearEvent  = null;
   o.resetEvent  = null;
   o.loadEvent   = null;
   o.saveEvent   = null;
   o.recordEvent = null;
   o.codeEvent   = null;
   o.construct   = RUiDataEvent_construct;
   o.construct();
   return o;
}
function RUiDataEvent_construct(p){
   var o = this;
   o.clearEvent = new TEventProcess(o, 'oeClearValue', MUiDataValue);
   o.resetEvent = new TEventProcess(o, 'oeResetValue', MUiDataValue);
   o.loadEvent = new TEventProcess(o, 'oeLoadValue', MUiDataValue);
   o.saveEvent = new TEventProcess(o, 'oeSaveValue', MUiDataValue);
   o.recordEvent = new TEventProcess(o, 'oeRecordValue', MUiDataValue);
   o.codeEvent = new TEventProcess(o, 'oeSaveCode', MUiDataValue);
}
function FDatasetConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd = EScope.Local;
   o._service = 'cloud.data.frame';
   o._datasets        = null;
   o.onFetch  = FDatasetConsole_onFetch;
   o.construct        = FDatasetConsole_construct;
   o.loadDataset      = FDatasetConsole_loadDataset;
   o.loadDatasets     = FDatasetConsole_loadDatasets;
   o.fetch    = FDatasetConsole_fetch;
   return o;
}
function FDatasetConsole_onFetch(p){
   var o = this;
   var g = p.parameter;
   var x = p.outputNode;
   if(x.hasNode()){
      o.loadDatasets(x);
      var dss = g.datasets;
      var xns = x.nodes();
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         var n = xn.get('name');
         var d = o._datasets.get(n);
         dss.set(n, d);
      }
   }
   g.process();
}
function FDatasetConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._datasets = new TDictionary();
}
function FDatasetConsole_loadDataset(x){
   var o = this;
   var n = x.get('name');
   if(RString.isEmpty(n)){
      throw new TError('Unknown dataset name.');
   }
   var d = o._datasets.get(n);
   if(!d){
      d = new TDataset();
      d.name = n;
      o._datasets.set(n, d);
   }
   d.clear();
   d.loadConfig(x);
   return d;
}
function FDatasetConsole_loadDatasets(p){
   var o = this;
   if(p.hasNode()){
      var xs = p.nodes();
      var c = xs.count();
      for(var i = 0; i < c; i++){
         var x = xs.get(i);
         if(x.isName('Dataset')){
            o.loadDataset(x);
         }
      }
   }
}
function FDatasetConsole_fetch(p){
   var o = this;
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', 'fetch');
   p.saveConfig(xr.create('Frame'));
   var e = new SXmlEvent();
   e.owner = o;
   e.url = RService.url(o._service);
   e.action = EDataAction.Fetch;
   e.parameter = p;
   e.inputDocument = xd;
   e.callback = o.onFetch;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_onScalarLoaded(g, r){
   var o = this;
   if(r.hasNode()){
      var rc = g.resultConfig = r.find('Control');
      if(rc){
         g.result = rc.get('result');
      }
   }
   g.invoke();
}
function FDatasetConsole_scalar(g){
   var o = this;
   var doc = new TXmlDocument();
   var r = doc.root();
   r.set('action', EDataAction.Scalar);
   r.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Scalar;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_onCompleteLoaded(g, root){
   var o = this;
   if(root.hasNode()){
      var nc = root.find('Control');
      if(nc){
         g.resultConfig = nc;
      }
   }
   g.invoke();
}
function FDatasetConsole_onLovLoadeded(arg, root){
   var o = this;
   arg.lovNode = root;
   arg.invoke();
}
function FDatasetConsole_onPrepareLoaded(g, x){
   var o = this;
   var rds = g.resultDatasets;
   if(x.hasNode()){
      var xfs = x.nodes;
      var xfc = xfs.count;
      for(var n = 0; n < xfc; n ++){
         var xf = xfs.get(n);
         var fd = xf.get('id');
         if(!RString.isEmpty(fd)){
            o.loadDatasets(rds, fd, xf);
         }
      }
   }
   if(!rds.isEmpty()){
      var c = rds.count;
      for(var n=0; n<c; n++){
         var rd = rds.value(n);
         if('/' == rd.name){
            g.resultRow = rd.row(0);
            break;
         }
      }
   }
   g.invoke();
}
function FDatasetConsole_onUpdateLoaded(g, x){
   var o = this;
   var xf = x.find('Form');
   if(!xf){
      return;
   }
   var fd = xf.get('id');
   var xd = xf.find('Dataset');
   if(!xd){
      return;
   }
   var ds = g.resultDataset = o.loadDataset(fd, xd);
   g.resultRow = ds.row(0);
   g.invoke();
   RWindow.setEnable(true);
}
function FDatasetConsole_onLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!RConsole.find(FMessageConsole).checkResult(m)){
         return;
      }
   }
   g.configResult = r;
   switch(e.action){
      case EDataAction.Fetch:
         o.onFetchLoaded(g, r);
         break;
      case EDataAction.Prepare:
         o.onPrepareLoaded(g, r);
         break;
      case EDataAction.Update:
         o.onUpdateLoaded(g, r);
         break;
      case EDataAction.Lov:
         o.onLovLoaded(g, r);
         break;
      case EDataAction.Scalar:
         o.onScalarLoaded(g, r);
         break;
      case EDataAction.Complete:
         o.onCompleteLoaded(g, r);
         break;
   }
   RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, e, e)
}
function FDatasetConsole_complete(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'complete');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Complete;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_lov(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'lov');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Lov;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_prepare(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'prepare');
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Prepare;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_update(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'update');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.action = EDataAction.Update;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_get(id){
   var o = this;
   var ds = o.forms.get(id);
   return ds;
}
function FDatasetConsole_getById(id){
   var o = this;
   var d = o._datasets.get(id);
   return d;
}
function FDatasetConsole_getByPath(formId, path){
   var o = this;
   var ds = o.get(formId);
   return ds ? ds.get(path) : null;
}
function FDatasetConsole_onTreeLoaded(g){
   var o = this;
   alert(1);
}
function FDatasetConsole_onColumnFetch(e){
   var o = this;
   var root = e.document.root();
   var mc = RConsole.find(FMessageConsole);
   var r = mc.checkResult(root);
   if(r){
      var g = e.arg;
      if(root.hasNode()){
         var fs = root.nodes;
         var ct = fs.count;
         for(var k = 0; k < ct; k++){
            var f = fs.get(k);
            if(f.hasNode()){
               var ns = f.nodes;
               var nt = ns.count;
               for( n = 0; n < nt; n++){
                  var d = ns.get(n);
                  if(d.name == 'Data'){
                     g.resultConfig = d;
                     break;
                  }
               }
            }
         }
      }
      g.invoke();
   }
}
function FDatasetConsole_columnNodeFetch(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', g.action);
   var nd = g.toNode();
   root.push(nd);
   var url = RService.url(g.service);
   var e = new TEvent(o, EXmlEvent.Send, o.onColumnFetch);
   e.url = url;
   e.document = doc;
   e.arg = g;
   e.action = EDataAction.Fetch;
   RConsole.find(FXmlConsole).process(e);
}
function FDatasetConsole_treeUpdate(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', g.action);
   var nd = g.toNode();
   root.push(nd);
   var url = RService.url(g.service);
   var e = new TEvent(o, EXmlEvent.Send, o.onTreeLoaded);
   e.url = url;
   e.document = doc;
   e.arg = g;
   e.action = EDataAction.TreeUpdate;
   RConsole.find(FXmlConsole).process(e);
}
function FDataSource(o){
   o = RClass.inherits(this, o, FObject);
   o._currentRow     = null;
   o._currentDataset = null;
   o._datasets       = null;
   o.construct       = FDataSource_construct;
   o.selectDataset   = FDataSource_selectDataset;
   o.currentDataset  = FDataSource_currentDataset;
   o.selectRow       = FDataSource_selectRow;
   o.currentRow      = FDataSource_currentRow;
   return o;
}
function FDataSource_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._datasets = new TDictionary();
}
function FDataSource_selectDataset(p){
   var o = this;
   var dn = RString.nvl(p, 'default');
   var d = o._datasets.get(dn);
   if(d == null){
      d = new TDataset();
      d._name = dn;
      o._datasets.set(dn, d);
   }
   o._currentDataset = d;
}
function FDataSource_currentDataset(){
   return this._currentDataset;
}
function FDataSource_selectRow(p){
   var o = this;
   if(p){
      o._currentRow = p;
      return;
   }
   var d = o._currentDataset;
   var r = d.rows().first();
   if(r == null){
      r = d.createRow();
   }
   o._currentRow = r;
   return r;
}
function FDataSource_currentRow(){
   return this._currentRow;
}
function FDataSource_create(c){
   return this.dataset.create(c);
}
function FDataSource_count(){
   return this.dataset.count;
}
function FDataSource_row(n){
   return this.dataset.get(n);
}
function FDataSource_current(){
   return this.row(this._position);
}
function FDataSource_isChanged(){
   var o = this;
   var d = o.dataset;
   for(var n=0; n<d.count; n++){
      var r = d.get(n);
      if(r && r.isSave()){
         return true;
      }
   }
   return false;
}
function FDataSource_get(n){
   var r = this.current();
   return r ? r.get(n) : '';
}
function FDataSource_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}
function FDataSource_move(p){
   this._position = p;
}
function FDataSource_moveToRow(row){
   var p = this.dataset.indexOf(row);
   if(-1 != p){
      this._position = p;
   }
}
function FDataSource_find(){
   return this.dataset.findByArgs(arguments);
}
function FDataSource_loadNode(config){
   if(config && config.nodes){
      var nodes = config.nodes;
      for(var n=0; n<nodes.count; n++){
         var node = nodes.get(n);
         if(node && node.isName('Row')){
            var row = this.dataset.create();
            row.loadNode(node);
            row.store();
         }
      }
   }
}
function FDataSource_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.dump(o));
   o.dataset.dump(s);
   return s;
}
function FUiDataAction(o){
   o = RClass.inherits(this, o, FUiComponent, MInvoke);
   o._action        = RClass.register(o, new APtyString('_action'));
   o._service       = RClass.register(o, new APtyString('_service'));
   o._execute       = RClass.register(o, new APtyString('_execute'));
   o._loading       = false;
   o._dataContainer = null;
   o.onLoaded       = FUiDataAction_onLoaded;
   o.invoke         = FUiDataAction_invoke;
   return o;
}
function FUiDataAction_onLoaded(p){
   var o = this;
   RWindow.setEnable(true);
   o._loading = false;
}
function FUiDataAction_invoke(p){
   var o = this;
   RAssert.debugTrue(RClass.isClass(p, MUiDataContainer));
   var svc = RService.parse(o._service);
   if(!svc){
      throw new TError(o, 'Unknown service.');
   }
   RWindow.setEnable(false);
   var xdocument = new TXmlDocument();
   var root = xdocument.root();
   root.set('action', svc.action);
   RConsole.find(FEnvironmentConsole).build(root);
   p.dsSaveValue(root.create('Data'));
   RLogger.debug(this, xdocument.dump());
   o._loading = true;
   o._dataContainer = p;
   var connection = RConsole.find(FXmlConsole).sendAsync(svc.url, xdocument);
   connection.addLoadListener(o, o.onLoaded);
}
function FUiDataCheck(o){
   o = RClass.inherits(this, o, FUiCheck, MUiDataField);
   return o;
}
function FUiDataColorPicker(o){
   o = RClass.inherits(this, o, FUiEdit, MUiDataField);
   return o;
}
function FUiDataColorPicker_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
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
function FUiDataColorPicker_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiDataColorPicker_setText(t){
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
   if('right' == o.editAlign){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiDataColorPicker_validText(t){
   var o = this;
   var r = o.__base.FUiEdit.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiDataColorPicker_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiDataColorPickerConsole).focus(o, FUiDataColorPickerEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiDataColorPicker_drop(){
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
function FUiDataEdit(o){
   o = RClass.inherits(this, o, FUiEdit, MUiDataField);
   return o;
}
function FUiDataEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiDataEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiDataEdit_setText(t){
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
   if('right' == o.editAlign){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiDataEdit_validText(t){
   var o = this;
   var r = o.__base.FUiEdit.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiDataEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiDataEditConsole).focus(o, FUiDataEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiDataEdit_drop(){
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
function FUiDataEditControl(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiEditValue, MUiEditChange, MUiEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
   o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._editColor        = RClass.register(o, new APtyString('_editColor'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._progressing      = false;
   o._hLabelPanel      = null;
   o._hLabelForm       = null;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hTextPanel       = null;
   o._hText            = null;
   o._hEditPanel       = null;
   o._hEditForm        = null;
   o._hValuePanel      = null;
   o.onBuildLabelIcon  = FUiDataEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiDataEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiDataEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiDataEditControl_onBuildEdit;
   o.onBuildPanel      = FUiDataEditControl_onBuildPanel;
   o.onBuild           = FUiDataEditControl_onBuild;
   o.oeMode            = FUiDataEditControl_oeMode;
   o.oeProgress        = FUiDataEditControl_oeProgress;
   o.construct         = FUiDataEditControl_construct;
   o.panel             = FUiDataEditControl_panel;
   o.label             = FUiDataEditControl_label;
   o.setLabel          = FUiDataEditControl_setLabel;
   o.text              = FUiDataEditControl_text;
   o.setText           = FUiDataEditControl_setText;
   o.getValueRectangle = FUiDataEditControl_getValueRectangle;
   o.dispose           = FUiDataEditControl_dispose;
   return o;
}
function FUiDataEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
   }
}
function FUiDataEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}
function FUiDataEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = '20px';
   o.onBuildLabelIcon(p);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   RHtml.setSize(h, o._labelSize);
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FUiDataEditControl_onBuildEdit(p){
   var o = this;
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   RHtml.setSize(h, o._editSize);
}
function FUiDataEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiDataEditControl_onBuild(p){
   var o = this;
   o.__base.FUiEditControl.onBuild.call(o, p);
   var hc = o._hPanel;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == EUiLabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == EUiLabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == EUiLabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == EUiLabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == EUiLabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEdit(p);
   }
}
function FUiDataEditControl_oeMode(e){
   var o = this;
   o.__base.FUiEditControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progressing){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeProgress(e){
   var o = this;
   if(o._progressing && e.enable){
      return EEventStatus.Stop;
   }
   o._progressing = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o.__base.MUiEditChange.construct.call(o);
   o.__base.MUiEditDrop.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FUiDataEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiEditControl.panel.call(o, t);
}
function FUiDataEditControl_label(p){
   return this._label;
}
function FUiDataEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}
function FUiDataEditControl_text(){
   throw new TUnsupportError(o, 'text');
}
function FUiDataEditControl_setText(value){
   throw new TUnsupportError(o, 'setText');
}
function FUiDataEditControl_getValueRectangle(r){
   var o = this;
   if(!r){
      r = new SRectangle();
   }
   var h = o._hValuePanel;
   var p = RHtml.clientPosition(h);
   r.position.assign(p);
   r.setSize(h.offsetWidth, h.offsetHeight);
   return r;
}
function FUiDataEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   o._labelSize = RObject.dispose(o._labelSize);
   o._editSize = RObject.dispose(o._editSize);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hLabelForm = RHtml.free(o._hLabelForm);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hTextPanel = RHtml.free(o._hTextPanel);
   o._hText = RHtml.free(o._hText);
   o._hEditPanel = RHtml.free(o._hEditPanel);
   o._hEditForm = RHtml.free(o._hEditForm);
   o._hValuePanel = RHtml.free(o._hValuePanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o.__base.MUiEditDrop.dispose.call(o);
   o.__base.MUiEditChange.dispose.call(o);
   o.__base.FUiEditControl.dispose.call(o);
}
function FUiDataEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FUiDataEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FUiDataEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FUiDataEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.drop();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}
function FUiDataEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FUiDataEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FUiDataEditControl_oeDataLoad(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeDataSave(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeDesign(p){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            if(hlf){
               hlf.cellPadding = 1;
            }
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MUiEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FUiDataEditControl_doFocus(e){
   var o = this;
   o.__base.MUiFocus.doFocus.call(o, e);
   o.__base.MUiEditValue.doFocus.call(o, e);
}
function FUiDataEditControl_doBlur(e){
   var o = this;
   o.__base.MUiFocus.doBlur.call(o, e);
   o.__base.MUiEditValue.doBlur.call(o, e);
}
function FUiDataEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FUiDataEditControl_setEditable(v){
   var o = this;
   o.__base.MUiEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   var hl = o.hLabel;
   if(hl){
      if(o.validRequire){
         o.hLabel.style.color = v ? EUiColor.Require : EUiColor.Text;
      }
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}
function FUiDataEditControl_setVisible(v){
   var o = this;
   o.__base.FUiEditControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FUiDataEditControl_focus(){
   var o = this;
   o.__base.MUiFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FUiDataEditControl_refreshStyle(){
   var o = this;
   if(!o._visible){
      return;
   }
   var tc = EUiColor.TextReadonly;
   var bc = EUiColor.Readonly;
   var cr = 'normal';
   if(o._editable){
      tc = EUiColor.TextEdit;
      bc = EUiColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EUiColor.TextInvalid;
         bc = EUiColor.Invalid;
      }
   }
   o._textColor = tc;
   o._backColor = bc;
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   if(hd){
      if(he){
         he.style.cursor = cr;
      }
      hd.style.cursor = cr;
   }
   if(o.editBorder){
      var bs = EUiBorderStyle.Readonly;
      if(o._editable){
         bs = EUiBorderStyle.Edit;
      }
      if(o._hover){
         bs = EUiBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FUiDataFrame(o){
   o = RClass.inherits(this, o, FUiFrame, MUiDataset, MUiDataContainer, MUiDataAction);
   return o;
}
function FUiDataIconPicker(o){
   o = RClass.inherits(this, o, FUiEdit, MUiDataField);
   return o;
}
function FUiDataIconPicker_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FUiDataIconPicker_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiDataIconPicker_setText(t){
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
   if('right' == o.editAlign){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiDataIconPicker_validText(t){
   var o = this;
   var r = o.__base.FUiEdit.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiDataIconPicker_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiDataIconPickerConsole).focus(o, FUiDataIconPickerEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiDataIconPicker_drop(){
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
function FUiDataMemo(o){
   o = RClass.inherits(this, o, FUiMemo, MUiDataField);
   return o;
}
function FUiDataNumber(o){
   o = RClass.inherits(this, o, FUiNumber);
   return o;
}
function FUiDataNumber_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FUiNumber.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber_refreshStyle(){
   var o = this;
   o.base.FUiNumber.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber_dispose(){
   var o = this;
   o.base.FUiNumber.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
function FUiDataNumber2(o){
   o = RClass.inherits(this, o, FUiNumber2);
   return o;
}
function FUiDataNumber2_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber2_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber2_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber2_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber2_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FUiNumber2.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber2_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber2_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber2_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber2_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber2_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber2_refreshStyle(){
   var o = this;
   o.base.FUiNumber2.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber2_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber2_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber2_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber2_dispose(){
   var o = this;
   o.base.FUiNumber2.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
function FUiDataNumber3(o){
   o = RClass.inherits(this, o, FUiNumber3);
   return o;
}
function FUiDataNumber3_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber3_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber3_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber3_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber3_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FUiNumber3.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber3_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber3_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber3_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber3_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber3_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber3_refreshStyle(){
   var o = this;
   o.base.FUiNumber3.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber3_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber3_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber3_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber3_dispose(){
   var o = this;
   o.base.FUiNumber3.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
function FUiDataNumber4(o){
   o = RClass.inherits(this, o, FUiNumber4);
   return o;
}
function FUiDataNumber4_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber4_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber4_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber4_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber4_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FUiNumber4.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber4_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber4_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber4_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber4_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber4_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber4_refreshStyle(){
   var o = this;
   o.base.FUiNumber4.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber4_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber4_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber4_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber4_dispose(){
   var o = this;
   o.base.FUiNumber4.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
function FUiDataSelect(o){
   o = RClass.inherits(this, o, FUiSelect, MUiDataField);
   return o;
}
function FUiDataColumn(o){
   o = RClass.inherits(this, o, FControl, MDataField);
   o._displayList       = true;
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
   o._cellClass         = FCell;
   o._hForm             = null;
   o._hFormLine         = null;
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o.onBuildLabel       = FUiDataColumn_onBuildLabel;
   o.onBuildSearchIcon  = RMethod.empty;
   o.onBuildSearchEdit  = FUiDataColumn_onBuildSearchEdit;
   o.onBuildSearchDrop  = RMethod.empty;
   o.onBuildSearchForm  = FUiDataColumn_onBuildSearchForm;
   o.onBuildSearch      = FUiDataColumn_onBuildSearch;
   o.onBuildTotal       = FUiDataColumn_onBuildTotal;
   o.onBuildPanel       = FUiDataColumn_onBuildPanel;
   o.onBuild            = FUiDataColumn_onBuild;
   o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
   o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
   o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
   o.createCell         = FUiDataColumn_createCell;
   return o;
}
function FUiDataColumn_onBuildLabel(p){
   var o = this;
   var hr = o._hFormLine;
   if (o._icon) {
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      o._hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   var hl = o._hLabel = RBuilder.appendTableCell(hr);
   hl.innerHTML = RString.nvl(o.label());
   var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
   var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FUiDataColumn));
   hsu.style.display = 'none';
   var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FUiDataColumn));
   hsu.style.display = 'none';
}
function FUiDataColumn_onBuildSearchEdit(p){
   var o = this;
   var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
   var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
}
function FUiDataColumn_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o._hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FUiDataColumnButton)){
      o._hSearchPanel.style.backgroundColor = '#EEEFF1';
      o._hSearchPanel.style.borderLeft='1 solid #808080';
      o._hSearchPanel.style.borderTop='1 solid #808080';
      o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
      return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FUiDataColumn_onBuildSearch(p){
   var o = this;
   var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.linkSet(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm(p);
}
function FUiDataColumn_onBuildTotal(p){
   var o = this;
   var h = o._hTotalPanel = RBuilder.create(p, 'TD');
   RHtml.linkSet(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FUiDataColumn_onBuildPanel(p) {
   var o = this;
   o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
}
function FUiDataColumn_onBuild(p) {
   var o = this;
   var t = o.table;
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!RString.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   if (!RString.isEmpty(o._viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.__base.FControl.onBuild.call(o, p);
   var hp = o._hPanel;
   hp.style.padding = 4;
   var hf = o._hForm = RBuilder.appendTable(hp);
   if (!o._orderAble) {
     hf.style.cursor = 'hand';
   }
   var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
   o.onBuildLabel(p);
   o.onBuildSearch(p);
   o.onBuildTotal(p);
   var h = o._hFixPanel = RBuilder.create(p, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(o._size.width < 40){
      o._size.width = 40;
   }
   RHtml.setSize(h, o._size);
   o._hPanel.style.pixelWidth = o.width;
   o._hFixPanel.style.pixelWidth = o.width;
}
function FUiDataColumn_createCell(p) {
   var o = this;
   var c = RClass.create(o._cellClass);
   var t = c._table = o._table;
   c._name = o._name;
   c._column = o;
   c.build(t._hPanel);
   c.setVisible(o._displayList);
   return c;
}
function FUiDataColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}
function FUiDataColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}
function FUiDataColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
function FUiDataColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
function FUiDataColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
function FUiDataColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
function FUiDataColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o._displayList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FUiDataColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._displayList);
   }
}
function FUiDataColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
function FUiDataColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
function FUiDataColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
function FUiDataColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}
function FUiDataColumn_onEditChanged(cell) {
   cell.row.refresh();
}
function FUiDataColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FUiDataColumnButton)){
	   var l = o._hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FUiDataColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c._hSortUp.style.display = 'none';
	            c._hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o._hSortUp.style.display = 'none';
	            o._hSortDown.style.display = 'block';
	         } else {
	            o._hSortUp.style.display = 'block';
	            o._hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         tbl.dsSearch();
	      }
   }
   }
}
function FUiDataColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FUiDataColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.styleName('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FUiDataColumn_searchValue() {
   var o = this;
   if(o._hSearchEdit){
      return o._hSearchEdit.value;
   }
}
function FUiDataColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}
function FUiDataColumn_cell(r){
   return r.cell(this.index);
}
function FUiDataColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function FUiDataColumn_setWidth(w){
   var o = this;
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}
function FUiDataColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
}
function FUiDataColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FUiDataColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FUiDataColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
function FUiDataColumn_getEditRange(){
   var o = this;
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FUiDataColumn_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hSearchPanel);
   RMemory.freeHtml(o._hFixPanel);
   o._hForm = null;
   o._hFormLine = null;
   o._hIconPanel = null;
   o._hIcon = null;
   o._hHeadPanel = null;
   o._hLabel = null;
   o._hSortPanel = null;
   o._hSortUp = null;
   o._hSortDown = null;
   o._hSearchPanel = null;
   o._hSearchForm = null;
   o._hSearchFormLine = null;
   o._hSearchIconPanel = null;
   o._hSearchIcon = null;
   o._hSearchEditPanel = null;
   o._hSearchEdit = null;
   o._hSearchDropPanel = null;
   o._hSearchDrop = null;
   o._hFixPanel = null;
}
function FUiDataColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
function FUiDataToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   return o;
}
function FUiDataToolButton(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName'));
   return o;
}
function FUiDataToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.processClickListener(o);
}
function FUiDataToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
function FUiDataTreeView(o){
   o = RClass.inherits(this, o, FUiTreeView);
   o._serviceCode     = RClass.register(o, new APtyString('_serviceCode', 'service'));
   o._statusLoading   = false;
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoad     = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   o.onLoaded         = FUiDataTreeView_onLoaded;
   o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
   o.construct        = FUiDataTreeView_construct;
   o.innerBuildNode   = FUiDataTreeView_innerBuildNode;
   o.loadNode         = FUiDataTreeView_loadNode;
   o.loadUrl          = FUiDataTreeView_loadUrl;
   o.loadService      = FUiDataTreeView_loadService;
   o.dispose          = FUiDataTreeView_dispose;
   return o;
}
function FUiDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   RUiControl.build(o, xt, null, o._hPanel);
   o.lsnsLoaded.process(p);
   var serviceCode = xt.get('service');
   if(serviceCode){
      o.loadService(serviceCode);
   }
}
function FUiDataTreeView_onNodeLoaded(event){
   var o = this;
   var xroot = event.root;
   if(!xroot){
      throw new TError(o, 'Load tree data failure.');
   }
   var parentNode = event.connection.parentNode;
   var ln = o._loadingNode;
   if(ln._hPanel.parentElement){
      o._hNodeRows.removeChild(ln._hPanel);
   }
   o._statusLoading = false;
   o.innerBuildNode(parentNode, xroot);
   o.lsnsNodeLoaded.process(event);
}
function FUiDataTreeView_construct(){
   var o = this;
   o.__base.FUiTreeView.construct.call(o);
}
function FUiDataTreeView_innerBuildNode(parent, xconfig){
   var o = this;
   var xnodes = xconfig._nodes;
   if(xnodes){
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.get(i);
         if(xnode.isName('TreeNode')){
            var node = o.createNode();
            node.loadConfig(xnode);
            if(parent){
               parent.push(node);
            }else{
               o.push(node);
            }
            o.appendNode(node, parent);
            if(xnode.hasNode()){
               o.innerBuildNode(node, xnode);
               node.extend(false);
            }
         }
      }
   }
   if(parent){
      parent.calculateImage();
   }
}
function FUiDataTreeView_loadNode(node, refresh){
   var o = this;
   o._statusLoading = true;
   node.removeChildren();
   var type = null;
   var findNode = node;
   var serviceCode = o._serviceCode;
   while(RClass.isClass(findNode, FUiTreeNode)){
      type = findNode.type();
      if(type && type._service){
         serviceCode = type._service;
         break;
      }
      findNode = findNode._parent;
   }
   if(!serviceCode){
      throw new TError(o, 'Unknown service code.');
   }
   var service = RUiService.parse(serviceCode);
   if(!service){
      throw new TError(o, 'Unknown service.');
   }
   var findNode = node;
   while(RClass.isClass(fn, FUiTreeNode)){
      type = findNode.type();
      if(type && type._action){
         break;
      }
      findNode = findNode._parent;
   }
   var action = RString.nvl(type._action, service.action);
   if(!action){
      throw new TError(o, 'Unknown service action.');
   }
   o.lsnsNodeLoad.process(o, node);
   var xd = new TXmlDocument();
   var x = xd.root();
   x.set('action', action);
   x.set('type', type._linker);
   x.create('Attributes', o._attributes);
   var fn = node;
   while(RClass.isClass(fn, FUiTreeNode)){
      x = x.create('TreeNode');
      fn.propertySave(x);
      fn = fn._parent;
   }
   node._extended = true;
   if(node._child && node._hImage){
      node._hImage.src = RResource.iconPath(o._iconMinus);
   }
   var ln = o._loadingNode;
   var lastNode = node.searchLast();
   var nr = lastNode._hPanel.rowIndex;
   o._hNodeRows.appendChild(ln._hPanel);
   RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr + 1);
   ln.setLevel(node.level() + 1);
   var url = RUiService.makeUrl(service.service, action);
   var connection = RConsole.find(FXmlConsole).sendAsync(url, xd);
   connection.parentNode = node;
   connection.addLoadListener(o, o.onNodeLoaded);
}
function FUiDataTreeView_loadUrl(url, node){
   var o = this;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onLoaded);
}
function FUiDataTreeView_loadService(serviceCode, attributes){
   var o = this;
   o.clear();
   if(!serviceCode){
      serviceCode = o._serviceCode;
   }
   var service = RUiService.parse(serviceCode);
   if(!service){
      return alert('Unknown service');
   }
   attributes = RObject.nvl(attributes, o._attributes);
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', service.action);
   RConsole.find(FUiEnvironmentConsole).build(xroot);
   if(!attributes.isEmpty()){
      if(RClass.isClass(attributes, TNode)){
         xr.push(attributes);
      }if(RClass.isClass(attributes, TAttributes)){
         xr.create('Tree').attributes = attributes;
         xr.create('Attributes').attributes = attributes;
      }else{
         xr.create('Tree').value = attributes;
         xr.create('Attributes').value = attributes;
      }
   }
   o._focusNode = null;
   var connection = RConsole.find(FXmlConsole).sendAsync(service.url, xdocument);
   connection.addLoadListener(o, o.onNodeLoaded);
}
function FUiDataTreeView_dispose(){
   var o = this;
   o.__base.FUiTreeView.dispose.call(o);
}
function FUiDataTreeView_load(p){
   var o = this;
   o.loadService(o._serviceCode);
}
function FUiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FUiDataTreeView_loadNodeUrl(p, n){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.addLoadListener(o, o.onNodeLoaded);
}
function FUiDataTreeView_reloadService(serviceCode, attributes){
   var o = this;
   o.clear();
   return o.loadService(serviceCode, attributes)
}
function FUiDataTreeView_loadNodeService(ps, pa){
   var o = this;
   var svc = RUiService.parse(RString.nvl(ps, o._service));
   if(!svc){
      throw new TError(o, 'Unknown service.');
   }
   var as = RObject.nvl(pa, o._attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   if(!as.isEmpty()){
      if(RClass.isClass(as, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(as, TAttributes)){
      }else{
      }
   }
   var ln = o._loadingNode;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc.url, xr);
   c.parentNode = o._focusNode;
   c.addLoadListener(o, o.onNodeLoaded);
}
function FUiDataTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FUiDataTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn._nodes){
         var nc = tvn._nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn._nodes.get(n);
            if(nd.isName('TreeNode')){
               var nm = nd.get('name');
               var fd = o.findByName(nm);
               if(fd){
                  fd.loadQuery(nd);
               }
            }
         }
      }
   }
}
function FUiDataTreeView_doQuery(){
   var o = this;
   var svc = RUiService.parse(o._queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o._attributes;
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FUiDataTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FUiTreeNode)){
      fmMain.target = 'frmMain';
      fmMain.form_search.value = '';
      fmMain.form_order.value = '';
      fmMain.form_values.value = '';
      var type = node.type.typeName;
      if('table' == type || 'form' == type){
         fmMain.form_name.value = node.get('form');
         fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
         fmMain.submit();
      }else if('frameTree' == type){
         fmMain.action = top.RContext.context(node.get('redirect'));
         fmMain.submit();
      }
   }else{
   }
}
