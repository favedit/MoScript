with(MO){
   MO.AEvent = function AEvent(n, l, h){
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
   MO.AEvent_linker = function AEvent_linker(){
      return this._linker;
   }
   MO.AEvent_handle = function AEvent_handle(){
      return this._handle;
   }
   MO.AEvent_value = function AEvent_value(){
      return this._process;
   }
   MO.AEvent_create = function AEvent_create(){
      return new SEvent();
   }
   MO.AEvent_bind = function AEvent_bind(h, u){
      var o = this;
      if(u){
         h.addEventListener(o._linker, RUiEvent.ohEvent, true);
      }else{
         h[o._handle] = RUiEvent.ohEvent;
      }
   }
   MO.AEvent_toString = function AEvent_toString(){
      var o = this;
      return 'linker=' + o._linker + ',handle=' + o._handle;
   }
}
with(MO){
   MO.AEventBlur = function AEventBlur(n, m){
      var o = this;
      AEvent.call(o, n, 'blur', 'onblur');
      o.attach = AEventBlur_attach;
      return o;
   }
   MO.AEventBlur_attach = function AEventBlur_attach(e, h){
   }
}
with(MO){
   MO.AEventChange = function AEventChange(n){
      var o = this;
      AEvent.call(o, n, 'change', 'onchange');
      o.attach = AEventChange_attach;
      return o;
   }
   MO.AEventChange_attach = function AEventChange_attach(e, h){
   }
}
with(MO){
   MO.AEventClick = function AEventClick(n){
      var o = this;
      AEvent.call(o, n, 'click', 'onclick');
      o.attach = AEventClick_attach;
      return o;
   }
   MO.AEventClick_attach = function AEventClick_attach(e, h){
      e.altKey = h.altKey;
      e.ctrlKey = h.ctrlKey;
      e.shiftKey = h.shiftKey;
   }
}
with(MO){
   MO.AEventDoubleClick = function AEventDoubleClick(n){
      var o = this;
      AEvent.call(o, n, 'dblclick', 'ondblclick');
      o.attach = AEventDoubleClick_attach;
      return o;
   }
   MO.AEventDoubleClick_attach = function AEventDoubleClick_attach(e, h){
      e.altKey = h.altKey;
      e.ctrlKey = h.ctrlKey;
      e.shiftKey = h.shiftKey;
   }
}
with(MO){
   MO.AEventFocus = function AEventFocus(n){
      var o = this;
      AEvent.call(o, n, 'focus', 'onfocus');
      o.attach = AEventFocus_attach;
      return o;
   }
   MO.AEventFocus_attach = function AEventFocus_attach(e, h){
   }
}
with(MO){
   MO.AEventInputChanged = function AEventInputChanged(n){
      var o = this;
      AEvent.call(o, n, 'input', 'oninput');
      o.attach = AEventInputChanged_attach;
      o.bind   = AEventInputChanged_bind;
      return o;
   }
   MO.AEventInputChanged_attach = function AEventInputChanged_attach(e, h){
   }
   MO.AEventInputChanged_bind = function AEventInputChanged_bind(h, u){
      var o = this;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         h.onpropertychange = RUiEvent.ohEvent;
      }else{
         h.addEventListener('input', RUiEvent.ohEvent);
      }
   }
}
with(MO){
   MO.AEventKeyDown = function AEventKeyDown(n){
      var o = this;
      AEvent.call(o, n, 'keydown', 'onkeydown');
      o.attach = AEventKeyDown_attach;
      return o;
   }
   MO.AEventKeyDown_attach = function AEventKeyDown_attach(e, h){
      e.altKey = h.altKey;
      e.shiftKey = h.shiftKey;
      e.ctrlKey = h.ctrlKey;
      e.keyCode = h.keyCode;
   }
}
with(MO){
   MO.AEventKeyPress = function AEventKeyPress(n){
      var o = this;
      AEvent.call(o, n, 'keypress', 'onkeypress');
      o.create = AEventKeyPress_create;
      o.attach = AEventKeyPress_attach;
      return o;
   }
   MO.AEventKeyPress_create = function AEventKeyPress_create(){
      return new SKeyboardEvent();
   }
   MO.AEventKeyPress_attach = function AEventKeyPress_attach(e, h){
      e.hEvent = h;
      e.attachEvent(h);
   }
}
with(MO){
   MO.AEventKeyUp = function AEventKeyUp(n){
      var o = this;
      AEvent.call(o, n, 'keyup', 'onkeyup');
      o.attach = AEventKeyUp_attach;
      return o;
   }
   MO.AEventKeyUp_attach = function AEventKeyUp_attach(e, h){
      e.altKey = h.altKey;
      e.shiftKey = h.shiftKey;
      e.ctrlKey = h.ctrlKey;
      e.keyCode = h.keyCode;
   }
}
with(MO){
   MO.AEventLoad = function AEventLoad(n){
      var o = this;
      AEvent.call(o, n, 'load', 'onload');
      o.attach = AEventLoad_attach;
      return o;
   }
   MO.AEventLoad_attach = function AEventLoad_attach(e, h){
   }
}
with(MO){
   MO.AEventMouse = function AEventMouse(n, l, h){
      var o = this;
      AEvent.call(o, n, l, h);
      o.attach = AEventMouse_attach;
      return o;
   }
   MO.AEventMouse_attach = function AEventMouse_attach(e, h){
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
}
with(MO){
   MO.AEventMouseDown = function AEventMouseDown(n){
      var o = this;
      AEventMouse.call(o, n, 'mousedown', 'onmousedown');
      return o;
   }
}
with(MO){
   MO.AEventMouseEnter = function AEventMouseEnter(n){
      var o = this;
      AEvent.call(o, n, 'mouseenter', 'onmouseenter');
      o._logger = false;
      o.attach  = AEventMouseEnter_attach;
      return o;
   }
   MO.AEventMouseEnter_attach = function AEventMouseEnter_attach(e, h){
   }
}
with(MO){
   MO.AEventMouseLeave = function AEventMouseLeave(n){
      var o = this;
      AEvent.call(o, n, 'mouseleave', 'onmouseleave');
      o._logger = false;
      o.attach  = AEventMouseLeave_attach;
      return o;
   }
   MO.AEventMouseLeave_attach = function AEventMouseLeave_attach(e, h){
   }
}
with(MO){
   MO.AEventMouseMove = function AEventMouseMove(n){
      var o = this;
      AEventMouse.call(o, n, 'mousemove', 'onmousemove');
      o._logger = false;
      return o;
   }
}
with(MO){
   MO.AEventMouseOut = function AEventMouseOut(n){
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
   MO.AEventMouseOut_attach = function AEventMouseOut_attach(p){
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
}
with(MO){
   MO.AEventMouseOver = function AEventMouseOver(n){
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
   MO.AEventMouseOver_attach = function AEventMouseOver_attach(p){
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
}
with(MO){
   MO.AEventMouseUp = function AEventMouseUp(n){
      var o = this;
      AEventMouse.call(o, n, 'mouseup', 'onmouseup');
      return o;
   }
}
with(MO){
   MO.AEventMouseWheel = function AEventMouseWheel(n){
      var o = this;
      AEvent.call(o, n, 'mousewheel', 'onmousewheel');
      o.attach = AEventMouseWheel_attach;
      return o;
   }
   MO.AEventMouseWheel_attach = function AEventMouseWheel_attach(e, h){
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
}
with(MO){
   MO.AEventReadyStateChange = function AEventReadyStateChange(n){
      var o = this;
      AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
      o.attach = AEventReadyStateChange_attach;
      return o;
   }
   MO.AEventReadyStateChange_attach = function AEventReadyStateChange_attach(e, h){
   }
}
with(MO){
   MO.AEventResize = function AEventResize(n){
      var o = this;
      AEvent.call(o, n, 'resize', 'onresize');
      o.attach = AEventResize_attach;
      return o;
   }
   MO.AEventResize_attach = function AEventResize_attach(e, h){
      e.x = h.x;
      e.y = h.y;
   }
}
with(MO){
   MO.AEventScroll = function AEventScroll(n){
      var o = this;
      AEvent.call(o, n, 'scroll', 'onscroll');
      o.attach = AEventScroll_attach;
      return o;
   }
   MO.AEventScroll_attach = function AEventScroll_attach(e, h){
   }
}
with(MO){
   MO.AEventTouchEnd = function AEventTouchEnd(n){
      var o = this;
      AEvent.call(o, n, 'touchstart', 'ontouchstart');
      o.attach = AEventTouchEnd_attach;
      return o;
   }
   MO.AEventTouchEnd_attach = function AEventTouchEnd_attach(e, h){
   }
}
with(MO){
   MO.AEventTouchMove = function AEventTouchMove(n){
      var o = this;
      AEvent.call(o, n, 'touchstart', 'ontouchstart');
      o.attach = AEventTouchMove_attach;
      return o;
   }
   MO.AEventTouchMove_attach = function AEventTouchMove_attach(e, h){
   }
}
with(MO){
   MO.AEventTouchStart = function AEventTouchStart(n){
      var o = this;
      AEvent.call(o, n, 'touchstart', 'ontouchstart');
      o.attach = AEventTouchStart_attach;
      return o;
   }
   MO.AEventTouchStart_attach = function AEventTouchStart_attach(e, h){
   }
}
with(MO){
   MO.APtyAttributes = function APtyAttributes(n, l, vl, vt, vr, vb){
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
   MO.APtyAttributes_load = function APtyAttributes_load(v, x){
      var o = this;
      var s = v[o._name];
      if(!s){
         s = v[o._name] = new TAttributes();
      }
      s.split(x.get(o._linker), '=', '\n');
   }
   MO.APtyAttributes_save = function APtyAttributes_save(v, x){
      var o = this;
      var s = v[o._name];
      if(s){
         if(!s.isEmpty()){
            x.set(o._linker, s.join('=', '\n'));
         }
      }
   }
   MO.APtyAttributes_toString = function APtyAttributes_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
   }
}
with(MO){
   MO.APtyConfig = function APtyConfig(n, l){
      var o = this;
      AProperty.call(o, n, l);
      o.force = true;
      o.load  = APtyConfig_load;
      o.save  = RMethod.empty;
      return o;
   }
   MO.APtyConfig_load = function APtyConfig_load(v, x){
      v[this.name] = x;
   }
}
with(MO){
   MO.APtyEnum = function APtyEnum(n, l, e, d){
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
   MO.APtyEnum_build = function APtyEnum_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._default;
      }
   }
   MO.APtyEnum_load = function APtyEnum_load(v, x){
      var o = this;
      v[o._name] = x.get(o._linker);
   }
   MO.APtyEnum_save = function APtyEnum_save(v, x){
      var o = this;
      x.set(o._linker, v[o._name]);
   }
   MO.APtyEnum_toString = function APtyEnum_toString(){
      var o = this;
      return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
   }
}
with(MO){
   MO.APtyNumber = function APtyNumber(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      o._value   = RInteger.nvl(v);
      o.build    = APtyNumber_build;
      o.toString = APtyNumber_toString;
      return o;
   }
   MO.APtyNumber_build = function APtyNumber_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }
   MO.APtyNumber_toString = function APtyNumber_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
with(MO){
   MO.APtySet = function APtySet(n, l, s, v){
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
   MO.APtySet_build = function APtySet_build(v){
      var o = this;
      if(v[o.name] == null){
         v[o.name] = o._value;
      }
   }
   MO.APtySet_load = function APtySet_load(v, x){
      var o = this;
      v[o.name] = RSet.containsString(x.get(o.linker), o.search);
   }
   MO.APtySet_save = function APtySet_save(v, x){
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
   MO.APtySet_toString = function APtySet_toString(){
      var o = this;
      return 'linker=' + o.linker + ',value=' + o._value + ',search=' + o._search;
   }
}
MO.EEditConfig = new function EEditConfig(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
MO.EEditStatus = new function EEditStatus(o){
   if(!o){o=this;}
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
MO.EEventType = new function EEventType(){
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
MO.ERowStatus = new function ERowStatusFace(){
   var o = this;
   o.Normal = 'N';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete  = 'D';
   return o;
}
MO.EUiAlign = new function EUiAlign(){
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
MO.EUiBorder = new function EUiBorder(){
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
MO.EUiBorderStyle = new function EUiBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
MO.EUiColor = new function EUiColor(){
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
MO.EUiCursor = new function EUiCursor(){
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
MO.EUiDialog = new function EUiDialog(){
   var o = this;
   o.Confirm = 1;
   o.Info    = 2
   o.Warn    = 3;
   o.Error   = 4;
   return o;
}
MO.EUiDirection = new function EUiDirection(){
   var o = this;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
MO.EUiDock = MO.EGuiDock;
MO.EUiLabelMode = new function EUiLabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
MO.EUiLabelPosition = new function EUiLabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
MO.EUiLayer = new function EUiLayer(){
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
MO.EUiLayout = new function EUiLayout(){
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
MO.EUiMerge = new function EUiMerge(){
   var o = this;
   o.Append   = 'append';
   o.Override = 'override';
   o.Disable  = 'disable';
   return o;
}
MO.EPanel = new function EPanel(){
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
MO.EUiPosition = new function EUiPosition(){
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
MO.EUiScroll = new function EUiScroll(){
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
MO.EUiSize = new function EUiSize(){
   var o = this;
   o.Normal     = 0
   o.Horizontal = 1
   o.Vertical   = 2
   o.Fill       = 3;
   o.Both       = 4;
   return o;
}
MO.EUiWrap = new function EUiWrap(){
   var o = this;
   o.NextLine = 0;
   o.SameLine = 1;
   return o;
}
with(MO){
   MO.MListenerBlur = function MListenerBlur(o){
      o = RClass.inherits(this, o, MListener);
      o.addBlurListener     = MListenerBlur_addBlurListener;
      o.processBlurListener = MListenerBlur_processBlurListener;
      return o;
   }
   MO.MListenerBlur_addBlurListener = function MListenerBlur_addBlurListener(w, m){
      return this.addListener(EEvent.Blur, w, m);
   }
   MO.MListenerBlur_processBlurListener = function MListenerBlur_processBlurListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Blur, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerClick = function MListenerClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addClickListener     = MListenerClick_addClickListener;
      o.setClickListener     = MListenerClick_setClickListener;
      o.removeClickListener  = MListenerClick_removeClickListener;
      o.processClickListener = MListenerClick_processClickListener;
      return o;
   }
   MO.MListenerClick_addClickListener = function MListenerClick_addClickListener(owner, method){
      return this.addListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_setClickListener = function MListenerClick_setClickListener(owner, method){
      return this.setListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_removeClickListener = function MListenerClick_removeClickListener(owner, method){
      return this.removeListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_processClickListener = function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerDataChanged = function MListenerDataChanged(o){
      o = RClass.inherits(this, o, MListener);
      o.addDataChangedListener     = MListenerDataChanged_addDataChangedListener;
      o.processDataChangedListener = MListenerDataChanged_processDataChangedListener;
      return o;
   }
   MO.MListenerDataChanged_addDataChangedListener = function MListenerDataChanged_addDataChangedListener(w, m){
      return this.addListener(EEvent.DataChanged, w, m);
   }
   MO.MListenerDataChanged_processDataChangedListener = function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.DataChanged, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerDoubleClick = function MListenerDoubleClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addDoubleClickListener     = MListenerDoubleClick_addDoubleClickListener;
      o.setDoubleClickListener     = MListenerDoubleClick_setDoubleClickListener;
      o.processDoubleClickListener = MListenerDoubleClick_processDoubleClickListener;
      return o;
   }
   MO.MListenerDoubleClick_addDoubleClickListener = function MListenerDoubleClick_addDoubleClickListener(owner, method){
      return this.addListener(EEvent.DoubleClick, owner, method);
   }
   MO.MListenerDoubleClick_setDoubleClickListener = function MListenerDoubleClick_setDoubleClickListener(owner, method){
      return this.setListener(EEvent.DoubleClick, owner, method);
   }
   MO.MListenerDoubleClick_processDoubleClickListener = function MListenerDoubleClick_processDoubleClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerEnter = function MListenerEnter(o){
      o = RClass.inherits(this, o, MListener);
      o.addEnterListener     = MListenerEnter_addEnterListener;
      o.processEnterListener = MListenerEnter_processEnterListener;
      return o;
   }
   MO.MListenerEnter_addEnterListener = function MListenerEnter_addEnterListener(w, m){
      return this.addListener(EEvent.Enter, w, m);
   }
   MO.MListenerEnter_processEnterListener = function MListenerEnter_processEnterListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Enter, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerFocus = function MListenerFocus(o){
      o = RClass.inherits(this, o, MListener);
      o.addFocusListener     = MListenerFocus_addFocusListener;
      o.processFocusListener = MListenerFocus_processFocusListener;
      return o;
   }
   MO.MListenerFocus_addFocusListener = function MListenerFocus_addFocusListener(w, m){
      return this.addListener(EEvent.Focus, w, m);
   }
   MO.MListenerFocus_processFocusListener = function MListenerFocus_processFocusListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Focus, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerItemClick = function MListenerItemClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addItemClickListener     = MListenerItemClick_addItemClickListener;
      o.processItemClickListener = MListenerItemClick_processItemClickListener;
      return o;
   }
   MO.MListenerItemClick_addItemClickListener = function MListenerItemClick_addItemClickListener(w, m){
      return this.addListener(EEvent.ItemClick, w, m);
   }
   MO.MListenerItemClick_processItemClickListener = function MListenerItemClick_processItemClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.ItemClick, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerLeave = function MListenerLeave(o){
      o = RClass.inherits(this, o, MListener);
      o.addLeaveListener     = MListenerLeave_addLeaveListener;
      o.processLeaveListener = MListenerLeave_processLeaveListener;
      return o;
   }
   MO.MListenerLeave_addLeaveListener = function MListenerLeave_addLeaveListener(w, m){
      return this.addListener(EEvent.Leave, w, m);
   }
   MO.MListenerLeave_processLeaveListener = function MListenerLeave_processLeaveListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Leave, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerResult = function MListenerResult(o){
      o = RClass.inherits(this, o, MListener);
      o.addResultListener     = MListenerResult_addResultListener;
      o.removeResultListener  = MListenerResult_removeResultListener;
      o.processResultListener = MListenerResult_processResultListener;
      o.clearResultListeners  = MListenerResult_clearResultListeners;
      return o;
   }
   MO.MListenerResult_addResultListener = function MListenerResult_addResultListener(owner, method){
      return this.addListener(EEvent.Result, owner, method);
   }
   MO.MListenerResult_removeResultListener = function MListenerResult_removeResultListener(owner, method){
      return this.removeListener(EEvent.Result, owner, method);
   }
   MO.MListenerResult_processResultListener = function MListenerResult_processResultListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Result, p1, p2, p3, p4, p5);
   }
   MO.MListenerResult_clearResultListeners = function MListenerResult_clearResultListeners(){
      return this.clearListeners(EEvent.Result);
   }
}
with(MO){
   MO.MListenerSelected = function MListenerSelected(o){
      o = RClass.inherits(this, o, MListener);
      o.addSelectedListener     = MListenerSelected_addSelectedListener;
      o.processSelectedListener = MListenerSelected_processSelectedListener;
      return o;
   }
   MO.MListenerSelected_addSelectedListener = function MListenerSelected_addSelectedListener(w, m){
      return this.addListener(EEvent.Selected, w, m);
   }
   MO.MListenerSelected_processSelectedListener = function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Selected, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MPropertyCheck = function MPropertyCheck(o){
      o = RClass.inherits(this, o);
      o._valueTrue  = RClass.register(o, new APtyString('_valueTrue'), EBoolean.True);
      o._valueFalse = RClass.register(o, new APtyString('_valueFalse'), EBoolean.False);
      return o;
   }
}
with(MO){
   MO.MPropertyEdit = function MPropertyEdit(o){
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
   MO.MPropertyEdit_oeValid = function MPropertyEdit_oeValid(e){
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
}
with(MO){
   MO.MPropertyNumber = function MPropertyNumber(o){
      o = RClass.inherits(this, o);
      o._valueMin       = RClass.register(o, new APtyNumber('_valueMin'));
      o._valueMax       = RClass.register(o, new APtyNumber('_valueMax'));
      o._valuePrecision = RClass.register(o, new APtyInteger('_valuePrecision'), 3);
      return o;
   }
}
with(MO){
   MO.MPropertySelect = function MPropertySelect(o){
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
   MO.MPropertySelect_oeValid = function MPropertySelect_oeValid(e){
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
}
with(MO){
   MO.MUiContainer = function MUiContainer(o){
      o = RClass.inherits(this, o);
      o.createChild = MUiContainer_createChild;
      o.appendChild = RMethod.empty;
      o.removeChild = RMethod.empty;
      return o;
   }
   MO.MUiContainer_createChild = function MUiContainer_createChild(p){
      var c = RUiControl.newInstance(p);
      c._parent = this;
      return c;
   }
}
with(MO){
   MO.MUiDataProperties = function MUiDataProperties(o){
      o = RClass.inherits(this, o);
      o._dataProperties = null;
      o.dataProperties  = MUiDataProperties_dataProperties;
      o.dataPropertyGet = MUiDataProperties_dataPropertyGet;
      o.dataPropertySet = MUiDataProperties_dataPropertySet;
      return o;
   }
   MO.MUiDataProperties_dataProperties = function MUiDataProperties_dataProperties(n, c){
      var o = this;
      var d = o._dataProperties;
      if(d == null){
         d = o._dataProperties = new TDictionary();
      }
      return d;
   }
   MO.MUiDataProperties_dataPropertyGet = function MUiDataProperties_dataPropertyGet(n){
      var o = this;
      var d = o._dataProperties;
      return d ? d.get(n) : null;
   }
   MO.MUiDataProperties_dataPropertySet = function MUiDataProperties_dataPropertySet(n, v){
      this.dataProperties().set(n, v);
   }
}
with(MO){
   MO.MUiDescribeFrame = function MUiDescribeFrame(o){
      o = RClass.inherits(this, o);
      o._frameName  = null;
      o.buildDefine = MUiDescribeFrame_buildDefine;
      return o;
   }
   MO.MUiDescribeFrame_buildDefine = function MUiDescribeFrame_buildDefine(hDocument, frameName){
      var o = this;
      if(RString.isEmpty(frameName)){
         frameName = o._frameName;
      }
      var frameConsole = RConsole.find(FUiDescribeFrameConsole);
      var xconfig = frameConsole.load(frameName);
      RUiControl.build(o, xconfig, null, hDocument);
   }
}
with(MO){
   MO.MUiDesign = function MUiDesign(o){
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
   MO.MUiDesign_oeDesign = function MUiDesign_oeDesign(e){
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
   MO.MUiDesign_onDesignEnter = function MUiDesign_onDesignEnter(p){
      var o = this;
      o._hPanel.className = o.style('Design');
   }
   MO.MUiDesign_onDesignLeave = function MUiDesign_onDesignLeave(p){
   }
   MO.MUiDesign_onDesignBegin = function MUiDesign_onDesignBegin(p){
      var o = this;
      var g = o._storage = RObject.nvlObj(o._storage);
      g.designStyle = o._hPanel.className;
      g.designLayer = o._hPanel.zIndex;
      o._hPanel.className = o.style('DesignDrag');
      o._statusDesign = true;
   }
   MO.MUiDesign_onDesignEnd = function MUiDesign_onDesignEnd(p){
      var o = this;
      var g = o._storage = RObject.nvlObj(o._storage);
      o._hPanel.className = g.designStyle;
      o._hPanel.zIndex = g.designLayer;
      o._statusDesign = false;
   }
}
with(MO){
   MO.MUiDisplay = function MUiDisplay(o){
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
   MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(e){
      var o = this;
      if(e.isBefore()){
         var v = true;
         if(!o.base.MUiDisplayAble){
            v = o.canVisible(e.mode);
         }
         o.setVisible(v);
      }
   }
   MO.MUiDisplay_canVisible = function MUiDisplay_canVisible(m){
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
}
with(MO){
   MO.MUiDragable = function MUiDragable(o){
      o = RClass.inherits(this, o);
      o.onDragStart = RMethod.virtual(o, 'onDragStart');
      o.onDragMove  = RMethod.virtual(o, 'onDragMove');
      o.onDragStop  = RMethod.virtual(o, 'onDragStop');
      return o;
   }
}
with(MO){
   MO.MUiDropable = function MUiDropable(o){
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
   MO.MUiDropable_onBuildDrop = function MUiDropable_onBuildDrop(hPanel){
      var o = this;
      o._hDropPanel = hPanel;
      hPanel.className = o.styleName('Drop', MUiDropable);
      var hDrop = o.hDrop = RBuilder.appendIcon(hPanel, null, 'control.drop');
      hDrop.style.width =16;
      hDrop.style.borderLeft = '1 solid #CCCCCC';
      hDrop.style.cursor = 'hand';
   }
   MO.MUiDropable_onDropClick = function MUiDropable_onDropClick(){
      var o = this;
      if(o._editable){
         o.drop();
      }
   }
   MO.MUiDropable_onDropDoubleClick = function MUiDropable_onDropDoubleClick(){
      var o = this;
      if(o._editable){
         o.drop();
      }
   }
   MO.MUiDropable_canDrop = function MUiDropable_canDrop(){
      var o = this;
      if(RClass.isClass(o, MUiDesign)){
         return !RConsole.find(FUiDesignConsole).canDesignMove;
      }
      return true;
   }
}
with(MO){
   MO.MUiEditable = function MUiEditable(o){
      o = RClass.inherits(this, o);
      return o;
   }
   MO.MUiEditable_testEdit = function MUiEditable_testEdit(m){
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
}
with(MO){
   MO.MUiEditChange = function MUiEditChange(o){
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
   MO.MUiEditChange_onBuildEditChange = function MUiEditChange_onBuildEditChange(p){
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
   MO.MUiEditChange_onChangeEnter = function MUiEditChange_onChangeEnter(e){
      var o = this;
   }
   MO.MUiEditChange_onChangeLeave = function MUiEditChange_onChangeLeave(e){
      var o = this;
   }
   MO.MUiEditChange_onChangeClick = function MUiEditChange_onChangeClick(e){
   }
   MO.MUiEditChange_construct = function MUiEditChange_construct(){
   }
   MO.MUiEditChange_changeSet = function MUiEditChange_changeSet(p){
   }
   MO.MUiEditChange_dispose = function MUiEditChange_dispose(){
      var o = this;
      RHtml.free(o._hChangeIcon);
      o._hChangeIcon = null;
      RHtml.free(o._hChangePanel);
      o._hChangePanel = null;
   }
}
with(MO){
   MO.MUiEditDescriptor = function MUiEditDescriptor(o){
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
   MO.MUiEditDescriptor_onDataEnter = function MUiEditDescriptor_onDataEnter(s, e){
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
   MO.MUiEditDescriptor_onDataLeave = function MUiEditDescriptor_onDataLeave(s, e){
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
   MO.MUiEditDescriptor_onDataKeyDown = function MUiEditDescriptor_onDataKeyDown(s, e){
      var o = this;
      if(s._editable && !s._disabled){
         s._invalidText = o.validText(s.text());
         s.refreshStyle();
      }
   }
   MO.MUiEditDescriptor_onDataChange = function MUiEditDescriptor_onDataChange(s, e){
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
   MO.MUiEditDescriptor_onDataEditEnd = function MUiEditDescriptor_onDataEditEnd(s, e){
      var o = this;
      var vt = s._invalidText = o.validText(s.text());
      if(vt){
         MO.Logger.debug(this, 'Edit valid failed ({0})', vt);
      }else{
         s.commitValue();
      }
      if(s.isTextChanged()){
   	   o.callEvent('onDataChange', o, o.__changedEvent);
      }
      s.refreshStyle();
   }
   MO.MUiEditDescriptor_oeSaveCode = function MUiEditDescriptor_oeSaveCode(e){
      var o = this;
      if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
         e.values.set(o.dataName, o.dataCode);
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditDescriptor_canValid = function MUiEditDescriptor_canValid(m){
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
   MO.MUiEditDescriptor_formatValue = function MUiEditDescriptor_formatValue(v){
      return RString.nvl(v);
   }
   MO.MUiEditDescriptor_formatText = function MUiEditDescriptor_formatText(t){
      return RString.nvl(t);
   }
   MO.MUiEditDescriptor_validText = function MUiEditDescriptor_validText(t){
      var o = this;
   }
}
with(MO){
   MO.MUiEditDrop = function MUiEditDrop(o){
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
   MO.MUiEditDrop_onBuildEditDrop = function MUiEditDrop_onBuildEditDrop(p){
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
   MO.MUiEditDrop_onDropEnter = function MUiEditDrop_onDropEnter(e){
      var o = this;
   }
   MO.MUiEditDrop_onDropLeave = function MUiEditDrop_onDropLeave(e){
      var o = this;
   }
   MO.MUiEditDrop_onDropClick = function MUiEditDrop_onDropClick(e){
   }
   MO.MUiEditDrop_construct = function MUiEditDrop_construct(){
   }
   MO.MUiEditDrop_dispose = function MUiEditDrop_dispose(){
      var o = this;
      RHtml.free(o._hDropIcon);
      o._hDropIcon = null;
      RHtml.free(o._hDropPanel);
      o._hDropPanel = null;
   }
}
with(MO){
   MO.MUiEditFormator = function MUiEditFormator(o){
      o = RClass.inherits(this, o);
      o.formatText  = MUiEditFormator_formatText;
      o.formatValue = MUiEditFormator_formatValue;
      return o;
   }
   MO.MUiEditFormator_formatText = function MUiEditFormator_formatText(value){
      return value;
   }
   MO.MUiEditFormator_formatValue = function MUiEditFormator_formatValue(text){
      return text;
   }
}
with(MO){
   MO.MUiEditReference = function MUiEditReference(o){
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
   MO.MUiEditReference_onListClick = function MUiEditReference_onListClick(e){
      var o = this;
      if(o.canListView()){
         o.doListView();
      }
   }
   MO.MUiEditReference_canListView = function MUiEditReference_canListView(){
      return !RString.isEmpty(this._lovReference) && this._editable;
   }
   MO.MUiEditReference_setLabelStyle = function MUiEditReference_setLabelStyle(){
      var o = this;
      if(!RString.isEmpty(o.lovRefer)){
         o.hLabel.style.cursor = 'hand';
         o.attachEvent('onListClick', o.hLabel);
         o.hLabel.className = 'RLine_Underline';
      }
   }
   MO.MUiEditReference_doListView = function MUiEditReference_doListView(cvs){
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
}
with(MO){
   MO.MUiEditValidator = function MUiEditValidator(o){
      o = RClass.inherits(this, o);
      o._validable = false;
      o._valid     = true;
      o._validText = null;
      o.oeValid    = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.MUiEditValue = function MUiEditValue(o){
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
   MO.MUiEditValue_isTextChanged = function MUiEditValue_isTextChanged(){
      var o = this;
      var text = o.text();
      return RString.equals(o._recordText, text);
   }
   MO.MUiEditValue_isValueChanged = function MUiEditValue_isValueChanged(){
      var o = this;
      var value = o.get();
      return RString.equals(o._recordValue, value);
   }
   MO.MUiEditValue_formator = function MUiEditValue_formator(){
      return this;
   }
   MO.MUiEditValue_text = function MUiEditValue_text(){
   }
   MO.MUiEditValue_setText = function MUiEditValue_setText(text){
   }
   MO.MUiEditValue_get = function MUiEditValue_get(){
      var o = this;
      var text = o.text();
      var value = o._dataValue = o.formator().formatValue(text)
      return value;
   }
   MO.MUiEditValue_set = function MUiEditValue_set(value){
      var o = this;
      o._dataValue = RString.nvl(value);
      var text = o.formator().formatText(value)
      o.setText(text);
   }
   MO.MUiEditValue_clearValue = function MUiEditValue_clearValue(){
      var o = this;
      o._dataValue = RString.EMPTY;
      o.set(RString.EMPTY);
   }
   MO.MUiEditValue_resetValue = function MUiEditValue_resetValue(){
      var o = this;
      o._dataValue = value;
      o.set(value);
   }
   MO.MUiEditValue_loadValue = function MUiEditValue_loadValue(c, t){
      var o = this;
   }
   MO.MUiEditValue_saveValue = function MUiEditValue_saveValue(c, t){
      var o = this;
   }
   MO.MUiEditValue_recordValue = function MUiEditValue_recordValue(){
      var o = this;
      o._recordText = o.text();
      o._recordValue = o.get();
   }
   MO.MUiEditValue_setEditAble = function MUiEditValue_setEditAble(flag){
      var o = this;
      o._statusEditable = flag;
   }
   MO.MUiEditValue_doFocus = function MUiEditValue_doFocus(){
      var o = this;
      if(o._statusEditable){
         o._statusEditing = true;
      }
   }
   MO.MUiEditValue_doBlur = function MUiEditValue_doBlur(){
      var o = this;
      if(o._statusEditable && o._statusEditing){
         o._statusEditing = false;
      }
   }
   MO.MUiEditValue_oeClearValue = function MUiEditValue_oeClearValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.clearValue();
         o.dataValue = o.reget();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeResetValue = function MUiEditValue_oeResetValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.resetValue();
         o.dataValue = o.reget();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeLoadValue = function MUiEditValue_oeLoadValue(e){
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
   MO.MUiEditValue_oeSaveValue = function MUiEditValue_oeSaveValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.saveValue(e.values);
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeRecordValue = function MUiEditValue_oeRecordValue(){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.recordValue();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_commitValue = function MUiEditValue_commitValue(){
      this.__commitValue = RString.nvl(this.reget());
   }
   MO.MUiEditValue_reget = function MUiEditValue_reget(){
      return this.descriptor().formatValue(this.text());
   }
   MO.MUiEditValue_setInfoPack = function MUiEditValue_setInfoPack(v){
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
   MO.MUiEditValue_setInfo = function MUiEditValue_setInfo(f){
      this.set(f.value);
   }
}
with(MO){
   MO.MUiEditZoom = function MUiEditZoom(o){
      o = RClass.inherits(this, o);
      o._zoomReference = RClass.register(o, new APtyString('_zoomReference'));
      o._zoomField     = RClass.register(o, new APtyString('_zoomField'));
      o.testZoom   = MUiEditZoom_testZoom;
      o.doZoom     = MUiEditZoom_doZoom;
      return o;
   }
   MO.MUiEditZoom_testZoom = function MUiEditZoom_testZoom(){
      return !RString.isEmpty(this._zoomReference);
   }
   MO.MUiEditZoom_doZoom = function MUiEditZoom_doZoom(p){
      RFormSpace.doZoom(this, p);
   }
}
with(MO){
   MO.MUiFocus = function MUiFocus(o){
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
   MO.MUiFocus_onFocus = function MUiFocus_onFocus(e){
      RConsole.find(FUiFocusConsole).focus(this, e);
   }
   MO.MUiFocus_focus = function MUiFocus_focus(){
      RConsole.find(FUiFocusConsole).focus(this);
   }
   MO.MUiFocus_blur = function MUiFocus_blur(){
      RConsole.find(FUiFocusConsole).blur(this);
   }
}
with(MO){
   MO.MUiHorizontal = function MUiHorizontal(o){
      o = RClass.inherits(this, o);
      o.setVisible = MUiHorizontal_setVisible;
      return o;
   }
   MO.MUiHorizontal_setVisible = function MUiHorizontal_setVisible(p){
      var o = this;
      var h = o.hPanelLine;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
}
with(MO){
   MO.MUiMargin = function MUiMargin(o){
      o = RClass.inherits(this, o);
      o._margin       = RClass.register(o, new APtyPadding('_margin'));
      o.construct     = MUiMargin_construct;
      o.margin        = MUiMargin_margin;
      o.setMargin     = MUiMargin_setMargin;
      o.refreshMargin = MUiMargin_refreshMargin;
      o.dispose       = MUiMargin_dispose;
      return o;
   }
   MO.MUiMargin_construct = function MUiMargin_construct(){
      var o = this;
      o._margin = new SPadding();
   }
   MO.MUiMargin_margin = function MUiMargin_margin(){
      return this._margin;
   }
   MO.MUiMargin_setMargin = function MUiMargin_setMargin(left, top, right, bottom){
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
   MO.MUiMargin_refreshMargin = function MUiMargin_refreshMargin(){
      var o = this;
      var p = o._margin;
      o.setMargin(p.left, p.top, p.right, p.bottom);
   }
   MO.MUiMargin_dispose = function MUiMargin_dispose(){
      var o = this;
      o._margin = RObject.dispose(o._margin);
   }
}
with(MO){
   MO.MUiPadding = function MUiPadding(o){
      o = RClass.inherits(this, o);
      o._padding       = RClass.register(o, new APtyPadding('_padding'));
      o.construct      = MUiPadding_construct;
      o.padding        = MUiPadding_padding;
      o.setPadding     = MUiPadding_setPadding;
      o.refreshPadding = MUiPadding_refreshPadding;
      o.dispose        = MUiPadding_dispose;
      return o;
   }
   MO.MUiPadding_construct = function MUiPadding_construct(){
      var o = this;
      o._padding = new SPadding();
   }
   MO.MUiPadding_padding = function MUiPadding_padding(){
      return this._padding;
   }
   MO.MUiPadding_setPadding = function MUiPadding_setPadding(left, top, right, bottom){
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
   MO.MUiPadding_refreshPadding = function MUiPadding_refreshPadding(){
      var o = this;
      var p = o._padding;
      o.setPadding(p.left, p.top, p.right, p.bottom);
   }
   MO.MUiPadding_dispose = function MUiPadding_dispose(){
      var o = this;
      var v = o._padding;
      if(v){
         v.dispose();
         o._padding = null;
      }
   }
}
with(MO){
   MO.MUiPopup = function MUiPopup(o){
      o = RClass.inherits(this, o);
      o._opener = null;
      o.opener  = MUiPopup_opener;
   }
   MO.MUiPopup_opener = function MUiPopup_opener(){
      return this._opener;
   }
}
with(MO){
   MO.MUiProgress = function MUiProgress(o){
      o = RClass.inherits(this, o);
      o.oeProgress = RMethod.virtual(o, 'oeProgress');
      return o;
   }
}
with(MO){
   MO.MUiSize = function MUiSize(o){
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
   MO.MUiSize_construct = function MUiSize_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SUiSize2();
   }
   MO.MUiSize_dockCd = function MUiSize_dockCd(){
      return this._dockCd;
   }
   MO.MUiSize_setDockCd = function MUiSize_setDockCd(dockCd){
      this._dockCd = dockCd;
   }
   MO.MUiSize_left = function MUiSize_left(){
      return this._location.x;
   }
   MO.MUiSize_setLeft = function MUiSize_setLeft(p){
      this.setLocation(p, null);
   }
   MO.MUiSize_top = function MUiSize_top(){
      return this._location.y;
   }
   MO.MUiSize_setTop = function MUiSize_setTop(p){
      this.setLocation(null, p);
   }
   MO.MUiSize_location = function MUiSize_location(){
      return this._location;
   }
   MO.MUiSize_setLocation = function MUiSize_setLocation(x, y){
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
   MO.MUiSize_refreshLocation = function MUiSize_refreshLocation(){
      var o = this;
      o.setLocation(o._location.x, o._location.y);
   }
   MO.MUiSize_width = function MUiSize_width(){
      return this._size.width;
   }
   MO.MUiSize_setWidth = function MUiSize_setWidth(p){
      this.setSize(p, null);
   }
   MO.MUiSize_height = function MUiSize_height(){
      return this._size.width;
   }
   MO.MUiSize_setHeight = function MUiSize_setHeight(p){
      this.setSize(null, p);
   }
   MO.MUiSize_size = function MUiSize_size(){
      return this._size;
   }
   MO.MUiSize_setSize = function MUiSize_setSize(width, height){
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
   MO.MUiSize_refreshSize = function MUiSize_refreshSize(){
      var o = this;
      o.setSize(o._size.width, o._size.height);
   }
   MO.MUiSize_setBounds = function MUiSize_setBounds(l, t, w, h){
      var o = this;
      o.setLocation(l, t);
      o.setSize(w, h);
   }
   MO.MUiSize_refreshBounds = function MUiSize_refreshBounds(){
      var o = this;
      o.refreshLocation();
      o.refreshSize();
   }
   MO.MUiSize_dispose = function MUiSize_dispose(){
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
   MO.MUiSize_innerDump = function MUiSize_innerDump(s, l){
      var o = this;
      s.append('MUiSize:');
      s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
   }
}
with(MO){
   MO.MUiSizeable = function MUiSizeable(o){
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
   MO.MUiSizeable_cursor = function MUiSizeable_cursor(){
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
   MO.MUiSizeable_setCursor = function MUiSizeable_setCursor(cursor){
      if(!cursor){
         cursor = this.cursor();
      }
      var h = this.panel(EPanel.Size);
      if(h){
         h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
      }
   }
   MO.MUiSizeable_resize = function MUiSizeable_resize(width, height){
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
   MO.MUiSizeable_setBounds = function MUiSizeable_setBounds(left, top, right, bottom, force){
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
   MO.MUiSizeable_startDrag = function MUiSizeable_startDrag(){
   }
   MO.MUiSizeable_stopDrag = function MUiSizeable_stopDrag(){
   }
}
with(MO){
   MO.MUiStorage = function MUiStorage(o){
      o = RClass.inherits(this, o);
      o._storageCode      = null;
      o._storageObject    = null;
      o.storageGet        = MUiStorage_storageGet;
      o.storageGetBoolean = MUiStorage_storageGetBoolean;
      o.storageSet        = MUiStorage_storageSet;
      o.storageUpdate     = MUiStorage_storageUpdate;
      o.dispose           = MUiStorage_dispose;
      return o;
   }
   MO.MUiStorage_storageGet = function MUiStorage_storageGet(name, defaultValue){
      var o = this;
      if(name == null){
         throw new TError(o, 'Name is empty.');
      }
      var object = o._storageObject;
      if(!object){
         var storge = RWindow.storage(EScope.Local);
         var value = storge.get(o._storageCode);
         object = o._storageObject = MO.Json.parse(value, Object);
      }
      if(object){
         var value = object[name];
         if(value != null){
            return value;
         }
      }
      return defaultValue;
   }
   MO.MUiStorage_storageGetBoolean = function MUiStorage_storageGetBoolean(name, defaultValue){
      var o = this;
      var value = o.storageGet(name, defaultValue);
      return RBoolean.parse(value);
   }
   MO.MUiStorage_storageSet = function MUiStorage_storageSet(name, value){
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
   MO.MUiStorage_storageUpdate = function MUiStorage_storageUpdate(){
      var o = this;
      var object = o._storageObject;
      if(object){
         var storge = RWindow.storage(EScope.Local);
         var value = MO.Json.toString(object);
         storge.set(o._storageCode, value);
      }
   }
   MO.MUiStorage_dispose = function MUiStorage_dispose(){
      var o = this;
      o._storageCode = null;
      o._storageObject = null;
   }
}
with(MO){
   MO.MUiStyle = function MUiStyle(o){
      o = RClass.inherits(this, o);
      o.construct     = RMethod.empty;
      o.styleName     = MUiStyle_styleName;
      o.styleIcon     = MUiStyle_styleIcon;
      o.styleIconPath = MUiStyle_styleIconPath;
      o.dispose       = RMethod.empty;
      return o;
   }
   MO.MUiStyle_styleName = function MUiStyle_styleName(n, c){
      var o = this;
      var f = c ? c : o;
      var tn = RClass.name(f);
      var t = RClass.forName(tn);
      return t.style(n);
   }
   MO.MUiStyle_styleIcon = function MUiStyle_styleIcon(n, c){
      return RClass.name(c ? c : this, true) + '_' + n;
   }
   MO.MUiStyle_styleIconPath = function MUiStyle_styleIconPath(n, c){
      return RResource.iconPath(RClass.name(c ? c : this, true) + '_' + n);
   }
}
with(MO){
   MO.MUiValue = function MUiValue(o){
      o = RClass.inherits(this, o);
      o.get = RMethod.empty;
      o.set = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.MUiVertical = function MUiVertical(o){
      o = RClass.inherits(this, o);
      o.setVisible = MUiHorizontal_setVisible;
      return o;
   }
   MO.MUiHorizontal_setVisible = function MUiHorizontal_setVisible(p){
      var o = this;
      var h = o.hPanelLine;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
}
with(MO){
   MO.SServiceInfo = function SServiceInfo(){
      var o = this;
      o.service = null;
      o.action  = null;
      o.url     = null;
      return o;
   }
}
with(MO){
   MO.SUiSize2 = function SUiSize2(width, height){
      var o = this;
      SSize2.call(o, width, height);
      o.parse = SUiSize2_parse;
      return o;
   }
   MO.SUiSize2_parse = function SUiSize2_parse(source){
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
}
with(MO){
   MO.TDatasetFetchArg = function TDatasetFetchArg(o){
      if(!o){o = this;}
      o.datasets   = new TDictionary();
      o.saveConfig = TDatasetFetchArg_saveConfig;
      o.process    = TDatasetFetchArg_process;
      return o;
   }
   MO.TDatasetFetchArg_saveConfig = function TDatasetFetchArg_saveConfig(p){
      var o = this;
      p.set('name', o.name);
   }
   MO.TDatasetFetchArg_process = function TDatasetFetchArg_process(){
      var o = this;
      if(o.owner){
         o.callback.call(o.owner, o);
      }else{
         o.callback(o);
      }
   }
   MO.TDatasetFetchArg_push = function TDatasetFetchArg_push(v){
      var o = this;
      if(RClass.isClass(v, TSearchItem)){
         o.searchs.push(v);
      }else if(RClass.isClass(v, TOrderItem)){
         o.orders.push(v);
      }
   }
   MO.TDatasetFetchArg_invoke = function TDatasetFetchArg_invoke(){
      var o = this;
      if(o.callback){
         o.callback.invoke(o);
      }
   }
}
with(MO){
   MO.TEvent = function TEvent(owner, code, proc){
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
   MO.TEvent_isBefore = function TEvent_isBefore(){
      return (EEventType.Before == this.type);
   }
   MO.TEvent_isAfter = function TEvent_isAfter(){
      return (EEventType.After == this.type);
   }
   MO.TEvent_process = function TEvent_process(){
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
   MO.TEvent_dump = function TEvent_dump(){
      return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
   }
}
with(MO){
   MO.TEventProcess = function TEventProcess(po, pm, pc){
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
   MO.TEventProcess_isBefore = function TEventProcess_isBefore(){
      return this.invokeCd == EEventInvoke.Before;
   }
   MO.TEventProcess_isAfter = function TEventProcess_isAfter(){
      return this.invokeCd == EEventInvoke.After;
   }
   MO.TEventProcess_dispose = function TEventProcess_dispose(){
      var o = this;
      o.owner = null;
      o.invoke = null;
      o.clazz = null;
      o.invokeCd = null;
   }
   MO.TEventProcess_dump = function TEventProcess_dump(){
      var o = this;
      return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
   }
}
with(MO){
   MO.THtmlEvent = function THtmlEvent(){
      var o = this;
      o.linker  = null;
      o.events  = new Object();
      o.push    = THtmlEvent_push;
      o.dispose = THtmlEvent_dispose;
      o.dump    = THtmlEvent_dump;
      return o;
   }
   MO.THtmlEvent_push = function THtmlEvent_push(pn, pe){
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
   MO.THtmlEvent_dispose = function THtmlEvent_dispose(){
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
   MO.THtmlEvent_dump = function THtmlEvent_dump(){
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
   MO.THtmlEvent_load = function THtmlEvent_load(e){
      var o = this;
      o.ctrlKey = e.ctrlKey;
      o.keyCode = e.keyCode;
   }
}
with(MO){
   MO.TOrderItem = function TOrderItem(o){
      if(!o){o = this;}
      return o;
   }
   MO.TOrderItem_set = function TOrderItem_set(n, t){
      var o = this;
      o.name = n;
      o.type = t;
   }
   MO.TOrderItem_toNode = function TOrderItem_toNode(){
      var o = this;
      var n = new TNode('OrderItem');
      n.set('name', o.name);
      n.set('type', o.type);
      return n;
   }
   MO.TOrderItem_pack = function TOrderItem_pack(){
      var o = this;
      var as = new TAttributes();
      as.set("name", o.name);
      as.set("type", o.type);
      return as.pack();
   }
   MO.TOrderItem_unpack = function TOrderItem_unpack(s){
      var o = this;
      var as = new TAttributes();
      as.unpack(s);
      o.name = as.get("name");
      o.type = as.get("type");
   }
}
with(MO){
   MO.TOrderItems = function TOrderItems(o){
      if(!o){o = this;}
      TObjects(o);
   }
   MO.TOrderItems_pack = function TOrderItems_pack(){
      var o = this;
      var ts = new TStrings();
      var len = o.count;
      for(var n = 0; n < len; n++){
         var s = o.get(n).pack();
         ts.push(s);
      }
      return ts.pack();
   }
   MO.TOrderItems_unpack = function TOrderItems_unpack(p){
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
}
with(MO){
   MO.TSearchItem = function TSearchItem(o){
      if(!o){o = this;}
      return o;
   }
   MO.TSearchItem_set = function TSearchItem_set(n, v, t, f){
      var o = this;
      o.name  = n;
      o.type  = RString.nvl(t, ESearch.Equals);
      o.value = v;
      o.format = f;
   }
   MO.TSearchItem_toNode = function TSearchItem_toNode(){
      var o = this;
      var n = new TNode('SearchItem');
      n.set('name', o.name);
      n.set('type', o.type);
      n.set('value', o.value);
      n.set('format', o.format);
      return n;
   }
   MO.TSearchItem_equals = function TSearchItem_equals(s){
      var o = this;
      if(o.name == s.name && o.type == s.type && o.value == s.value){
   	   return true;
      }
      return false;
   }
   MO.TSearchItem_pack = function TSearchItem_pack(){
      var o = this;
      var as = new TAttributes();
      as.set("name", o.name);
      as.set("type", o.type);
      as.set("value", o.value);
      as.set("format", o.format);
      return as.pack();
   }
   MO.TSearchItem_unpack = function TSearchItem_unpack(s){
      var o = this;
      var as = new TAttributes();
      as.unpack(s);
      o.name  = as.get("name");
      o.type  = as.get("type");
      o.value = as.get("value");
      o.format = as.get("format");
   }
}
with(MO){
   MO.TSearchItems = function TSearchItems(o){
      if(!o){o = this;}
      TObjects(o);
   }
   MO.TSearchItems_pack = function TSearchItems_pack(){
      var o = this;
      var ts = new TStrings();
      var len = o.count;
      for(var n = 0; n < len; n++){
         var s = o.get(n).pack();
         ts.push(s);
      }
      return ts.pack();
   }
   MO.TSearchItems_removeAll = function TSearchItems_removeAll(v){
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
   MO.TSearchItems_unpack = function TSearchItems_unpack(p){
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
}
with(MO){
   MO.FUiCanvas = function FUiCanvas(o){
      o = RClass.inherits(this, o, FUiControl);
      o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
      o.onBuildPanel = FUiCanvas_onBuildPanel;
      o.construct    = FUiCanvas_construct;
      o.dispose      = FUiCanvas_dispose;
      return o;
   }
   MO.FUiCanvas_onBuildPanel = function FUiCanvas_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.create(event, 'CANVAS', o.styleName('Canvas'));
   }
   MO.FUiCanvas_construct = function FUiCanvas_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
   }
   MO.FUiCanvas_dispose = function FUiCanvas_dispose(){
      var o = this;
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiComponent = function FUiComponent(o){
      o = RClass.inherits(this, o, FComponent, MProperty, MClone);
      o._guid         = RClass.register(o, [new APtyString('_guid'), new AGetSet('_guid')]);
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      o._parent       = null;
      o._components   = null;
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      o.oeInitialize  = FUiComponent_oeInitialize;
      o.oeRelease     = FUiComponent_oeRelease;
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
   MO.FUiComponent_oeInitialize = function FUiComponent_oeInitialize(e){
      return EEventStatus.Continue;
   }
   MO.FUiComponent_oeRelease = function FUiComponent_oeRelease(e){
      return EEventStatus.Continue;
   }
   MO.FUiComponent_topComponent = function FUiComponent_topComponent(c){
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
   MO.FUiComponent_hasComponent = function FUiComponent_hasComponent(){
      var s = this._components;
      return s ? !s.isEmpty() : false;
   }
   MO.FUiComponent_findComponent = function FUiComponent_findComponent(p){
      var s = this._components;
      return s ? s.get(p) : null;
   }
   MO.FUiComponent_components = function FUiComponent_components(){
      var o = this;
      var r = o._components;
      if(r == null){
         r = new TDictionary();
         o._components = r;
      }
      return r;
   }
   MO.FUiComponent_push = function FUiComponent_push(p){
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
   MO.FUiComponent_remove = function FUiComponent_remove(component){
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
   MO.FUiComponent_clear = function FUiComponent_clear(p){
      var o = this;
      var s = o._components;
      if(s){
         s.clear();
      }
   }
   MO.FUiComponent_process = function FUiComponent_process(event){
      var o = this;
      var valid = o.__base[event.clazz];
      if(valid){
         event.invokeCd = EEventInvoke.Before;
         var callback = o[event.invoke];
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      if(RClass.isClass(o, MUiContainer)){
         var components = o._components;
         if(components){
            var count = components.count();
            if(count){
               for(var i = 0; i < count; i++){
                  var component = components.at(i);
                  var result = component.process(event);
                  if(result == EEventStatus.Cancel){
                     return result;
                  }
               }
            }
         }
      }
      if(valid){
         event.invokeCd = EEventInvoke.After;
         var callback = o[event.invoke];
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      return EEventStatus.Continue;
   }
   MO.FUiComponent_psInitialize = function FUiComponent_psInitialize(){
      var o = this;
      var e = new TEventProcess(o, 'oeInitialize', FUiComponent);
      o.process(e);
      e.dispose();
   }
   MO.FUiComponent_psRelease = function FUiComponent_psRelease(){
      var o = this;
      var e = new TEventProcess(o, 'oeRelease', FUiComponent);
      o.process(e);
      e.dispose();
   }
   MO.FUiComponent_toString = function FUiComponent_toString(){
      var o = this;
      return RClass.dump(o) + ':label=' + o._label;
   }
   MO.FUiComponent_dispose = function FUiComponent_dispose(){
      var o = this;
      o._parent = null;
      o._name = null;
      o._label = null;
      o._tag = null;
      o._components = RObject.dispose(o._components, true);
      o.__base.FComponent.dispose.call(o);
   }
   MO.FUiComponent_innerDumpInfo = function FUiComponent_innerDumpInfo(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append(',name=', o._name);
      s.append(',label=', o._label);
   }
   MO.FUiComponent_innerDump = function FUiComponent_innerDump(s, l){
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
}
with(MO){
   MO.FUiContainer = function FUiContainer(o){
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
   MO.FUiContainer_construct = function FUiContainer_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
   }
   MO.FUiContainer_hasControl = function FUiContainer_hasControl(){
      var cs = this._controls;
      return cs ? !cs.isEmpty() : false;
   }
   MO.FUiContainer_findControl = function FUiContainer_findControl(p){
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
   MO.FUiContainer_searchControl = function FUiContainer_searchControl(p){
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
   MO.FUiContainer_controls = function FUiContainer_controls(){
      var o = this;
      var r = o._controls;
      if(r == null){
         r = new TDictionary();
         o._controls = r;
      }
      return r;
   }
   MO.FUiContainer_panel = function FUiContainer_panel(t){
      var o = this;
      if(t == EPanel.Container){
         return o._hPanel;
      }
      return o.__base.FUiControl.panel.call(o, t);
   }
   MO.FUiContainer_focusFirstControl = function FUiContainer_focusFirstControl(){
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
   MO.FUiContainer_setControlsProperty = function FUiContainer_setControlsProperty(p, vs){
      var o = this;
      var cs = o._controls;
      if(cs){
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            c[p] = vs[n];
         }
      }
   }
   MO.FUiContainer_storeConfig = function FUiContainer_storeConfig(x){
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
   MO.FUiContainer_push = function FUiContainer_push(p){
      var o = this;
      o.__base.FUiControl.push.call(o, p);
      if(RClass.isClass(p, FUiControl)){
         o.controls().set(p._name, p);
         o.appendChild(p);
      }
   }
   MO.FUiContainer_remove = function FUiContainer_remove(component){
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
   MO.FUiContainer_clear = function FUiContainer_clear(){
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
   MO.FUiContainer_dispose = function FUiContainer_dispose(){
      var o = this;
      var v = o._controls;
      if(v){
         v.dispose();
         o._controls = null;
      }
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiControl = function FUiControl(o){
      o = RClass.inherits(this, o, FUiComponent, MUiStyle, MUiSize, MUiPadding, MUiMargin);
      o._wrapCd        = RClass.register(o, [new APtyEnum('_wrapCd', null, EUiWrap, EUiWrap.NextLine), new AGetSet('_wrapCd')]);
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
   MO.FUiControl_onEnter = function FUiControl_onEnter(e){
      var o = this;
      RConsole.find(FUiFocusConsole).enter(o);
      if(o._hint){
         RWindow.setStatus(o._hint);
      }
   }
   MO.FUiControl_onLeave = function FUiControl_onLeave(e){
      var o = this;
      RConsole.find(FUiFocusConsole).leave(o);
      if(o._hint){
         RWindow.setStatus();
      }
   }
   MO.FUiControl_onBuildPanel = function FUiControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FUiControl_onBuild = function FUiControl_onBuild(p){
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
   MO.FUiControl_oeMode = function FUiControl_oeMode(e){
      var o = this;
      o._displayCd = e.displayCd;
      return EEventStatus.Continue;
   }
   MO.FUiControl_oeEnable = function FUiControl_oeEnable(e){
      var o = this;
      if(e.isBefore()){
         o.setEnable(e.enable);
      }
      return EEventStatus.Continue;
   }
   MO.FUiControl_oeVisible = function FUiControl_oeVisible(e){
      var o = this;
      if(e.isBefore()){
         o.setVisible(e.visible);
      }
      return EEventStatus.Continue;
   }
   MO.FUiControl_oeResize = function FUiControl_oeResize(p){
      return EEventStatus.Continue;
   }
   MO.FUiControl_oeRefresh = function FUiControl_oeRefresh(e){
      return EEventStatus.Continue;
   }
   MO.FUiControl_construct = function FUiControl_construct(){
      var o = this;
      o.__base.FUiComponent.construct.call(o);
      o.__base.MUiStyle.construct.call(o);
      o.__base.MUiSize.construct.call(o);
      o.__base.MUiPadding.construct.call(o);
      o.__base.MUiMargin.construct.call(o);
   }
   MO.FUiControl_topControl = function FUiControl_topControl(c){
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
   MO.FUiControl_panel = function FUiControl_panel(p){
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
   MO.FUiControl_isVisible = function FUiControl_isVisible(){
      return this._statusVisible;
   }
   MO.FUiControl_setVisible = function FUiControl_setVisible(p){
      var o = this;
      o._statusVisible = p;
      var h = o.panel(EPanel.Container);
      if(h){
         RHtml.visibleSet(h, p);
      }
   }
   MO.FUiControl_show = function FUiControl_show(){
      var o = this;
      if(!o._statusVisible){
         o.setVisible(true);
      }
   }
   MO.FUiControl_hide = function FUiControl_hide(){
      var o = this;
      if(o._statusVisible){
         o.setVisible(false);
      }
   }
   MO.FUiControl_isEnable = function FUiControl_isEnable(){
      return this._statusEnable;
   }
   MO.FUiControl_setEnable = function FUiControl_setEnable(p){
      var o = this;
      o._statusEnable = p;
      var h = o.panel(EPanel.Container);
      if(h){
         h.style.disabled = !p;
      }
   }
   MO.FUiControl_enable = function FUiControl_enable(){
      var o = this;
      if(!o._statusEnable){
         o.setEnable(true);
      }
   }
   MO.FUiControl_disable = function FUiControl_disable(){
      var o = this;
      if(o._statusEnable){
         o.setEnable(false);
      }
   }
   MO.FUiControl_attachEvent = function FUiControl_attachEvent(n, h, m, u){
      return RUiControl.attachEvent(this, n, h, m, u);
   }
   MO.FUiControl_linkEvent = function FUiControl_linkEvent(t, n, h, m){
      return RUiControl.linkEvent(this, t, n, h, m);
   }
   MO.FUiControl_callEvent = function FUiControl_callEvent(n, s, e){
      var o = this;
      var es = o._events;
      if(es){
         var ec = es.get(n);
         if(ec){
            ec.invoke(s, s, e);
         }
      }
   }
   MO.FUiControl_psMode = function FUiControl_psMode(p){
      var o = this;
      var e = new TEventProcess(o, 'oeMode', FUiControl);
      e.displayCd = p;
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_psDesign = function FUiControl_psDesign(m, f){
      var o = this;
      RConsole.find(FDesignConsole).setFlag(m, f, o);
      var e = new TEventProcess(o, 'oeDesign', MDesign)
      e.mode = m;
      e.flag = f;
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_psEnable = function FUiControl_psEnable(v){
      var o = this;
      var e = new TEventProcess(o, 'oeEnable', FUiControl)
      e.enable = v;
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_psVisible = function FUiControl_psVisible(v){
      var o = this;
      var e = new TEventProcess(o, 'oeVisible', FUiControl);
      e.visible = v;
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_psResize = function FUiControl_psResize(){
      var o = this;
      var e = new TEventProcess(o, 'oeResize', FUiControl);
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_psRefresh = function FUiControl_psRefresh(t){
      var o = this;
      var e = new TEventProcess(o, 'oeRefresh', FUiControl);
      o.process(e);
      e.dispose();
   }
   MO.FUiControl_isBuild = function FUiControl_isBuild(){
      return this._statusBuild;
   }
   MO.FUiControl_build = function FUiControl_build(p){
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
   MO.FUiControl_builded = function FUiControl_builded(p){
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
   MO.FUiControl_refresh = function FUiControl_refresh(){
      var o = this;
      if(!o._statusBuild){
         throw new TError(o, 'Current control is not build.');
      }
   }
   MO.FUiControl_setPanel = function FUiControl_setPanel(h){
      var o = this;
      o._hParent = h;
      h.appendChild(o._hPanel);
   }
   MO.FUiControl_dispose = function FUiControl_dispose(){
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
}
with(MO){
   MO.FUiWorkspace = function FUiWorkspace(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
      o._frames      = null;
      o._hContainer  = null;
      o.onBuildPanel = FUiWorkspace_onBuildPanel;
      o.appendChild  = FUiWorkspace_appendChild;
      return o;
   }
   MO.FUiWorkspace_onBuildPanel = function FUiWorkspace_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createDiv(event, o.styleName('Panel'));
   }
   MO.FUiWorkspace_appendChild = function FUiWorkspace_appendChild(control){
      var o = this;
      if(RClass.isClass(control, FUiFrameSet)){
         o._hPanel.appendChild(control._hPanel);
      }else{
         throw new TError(o, 'Unknown child type.');
      }
   }
}
with(MO){
   MO.RUiControl = function RUiControl(){
      var o = this;
      o.PREFIX    = 'FUi';
      o.inMoving  = false;
      o.inSizing  = false;
      o.inDesign  = false;
      o.instances = new TObjects();
      o.events    = new TMap();
      o.controls  = new TMap();
      return o;
   }
   MO.RUiControl.prototype.newInstance = function RUiControl_newInstance(p){
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
   MO.RUiControl.prototype.attachEvent = function RUiControl_attachEvent(c, n, h, m, u){
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
   MO.RUiControl.prototype.innerCreate = function RUiControl_innerCreate(pc, px, pa){
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
   MO.RUiControl.prototype.create = function RUiControl_create(pc, px, pa){
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
   MO.RUiControl.prototype.innerbuild = function RUiControl_innerbuild(pr, pc, px, pa, ph){
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
   MO.RUiControl.prototype.build = function RUiControl_build(c, x, a, h){
      var o = this;
      if(!c){
         c = RUiControl.newInstance(x);
      }
      o.innerbuild(c, c, x, a, h);
      return c;
   }
   MO.RUiControl.prototype.setStyleScroll = function RUiControl_setStyleScroll(h, c){
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
   MO.RUiControl.prototype.linkEvent = function RUiControl_linkEvent(tc, sc, n, h, m){
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
   MO.RUiControl.prototype.find = function RUiControl_find(c){
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
   MO.RUiControl.prototype.fromNode = function RUiControl_fromNode(x, h){
      if(x){
         return this.create(x, h);
      }
   }
   MO.RUiControl.prototype.fromXml = function RUiControl_fromXml(xml, hPanel, mode){
      var c = null;
      var x = RXml.makeNode(xml);
      if(x){
         c = this.create(x, hPanel, mode);
      }
      return c;
   }
   MO.RUiControl.prototype.toNode = function RUiControl_toNode(){
   }
   MO.RUiControl.prototype.toXml = function RUiControl_toXml(){
   }
   MO.RUiControl.prototype.store = function RUiControl_store(o, type){
      var x = new TNode();
      x.name = RClass.name(o).substr(1);
      if(RClass.isClass(o, FContainer)){
         o.storeConfig(x);
      }else{
         o.saveConfig(x);
      }
      return x;
   }
   MO.RUiControl.prototype.htmlControl = function RUiControl_htmlControl(e, c){
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
   MO.RUiControl.prototype.psDesign = function RUiControl_psDesign(action, mode, flag, params){
      var cs = this.instances;
      if(cs && cs.count){
         var l = cs.count;
         for(var n=0; n<l; n++){
            cs.get(n).psDesign(action, mode, flag, params);
         }
      }
   }
   MO.RUiControl.prototype.psMode = function RUiControl_psMode(action, mode, flag, params){
      var cs = this.instances;
      if(cs && cs.count){
         var l = cs.count;
         for(var n=0; n<l; n++){
            cs.get(n).psMode(action, mode, flag, params);
         }
      }
   }
   MO.RUiControl.prototype.isInfo = function RUiControl_isInfo(v){
      return v ? (0 == v.indexOf('C#')) : false;
   }
   MO.RUiControl.prototype.isGroup = function RUiControl_isGroup(v){
      return v ? (0 == v.indexOf('G#')) : false;
   }
   MO.RUiControl = new RUiControl();
}
with(MO){
   MO.RUiEvent = function RUiEvent(){
      var o = this;
      o._objects  = new Array();
      o.current   = 0;
      o.events    = new Array();
      return o;
   }
   MO.RUiEvent.prototype.ohEvent = function RUiEvent_ohEvent(e){
      RUiEvent.process(this, e ? e : window.event);
   }
   MO.RUiEvent.prototype.onProcess = function RUiEvent_onProcess(e){
      var e = this;
      var ea = e.annotation;
      if(ea._logger){
         MO.Logger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
      }
      if(e.sender){
         e.onProcess.call(e.source, e.sender, e);
      }else{
         e.onProcess.call(e.source, e);
      }
   }
   MO.RUiEvent.prototype.find = function RUiEvent_find(p){
      var u = RHtml.uid(p);
      var es = this._objects;
      var e = es[u];
      if(e == null){
         e = es[u] = new THtmlEvent();
         e.linker = p;
      }
      return e;
   }
   MO.RUiEvent.prototype.process = function RUiEvent_process(hs, he){
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
                     MO.Logger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
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
   MO.RUiEvent.prototype.release = function RUiEvent_release(){
      var o = this;
      var v = o._objects;
      if(v){
         RMemory.free(v);
         o._objects = null;
      }
   }
   MO.RUiEvent.prototype.nvl = function RUiEvent_nvl(event, sender, code){
      if(!event){
         event = new TEvent();
      }
      event.sender = sender;
      event.code = code;
      return event;
   }
   MO.RUiEvent.prototype.alloc = function RUiEvent_alloc(s, c){
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
   MO.RUiEvent.prototype.free = function RUiEvent_free(e){
      e.inUsing = false;
   }
   MO.RUiEvent = new RUiEvent();
}
with(MO){
   MO.RUiLayer = function RUiLayer(){
      var o = this;
      o._layers = new Array();
      return o;
   }
   MO.RUiLayer.prototype.next = function RUiLayer_next(p){
      var o = this;
      var n = RInteger.nvl(p, EUiLayer.Default);
      var c = RInteger.nvl(o._layers[n], n);
      o._layers[n] = ++c;
      return c;
   }
   MO.RUiLayer.prototype.free = function RUiLayer_free(p, l){
      var o = this;
      var n = RInteger.nvl(p, EUiLayer.Default);
      var c = RInteger.nvl(o._layers[n], n);
      --c;
      if(c > n){
         o._layers[n] = c;
      }
      return c;
   }
   MO.RUiLayer = new RUiLayer();
}
with(MO){
   MO.RUiService = function RUiService(){
      var o = this;
      o._services = new TDictionary();
      return o;
   }
   MO.RUiService.prototype.url = function RUiService_url(p){
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
   MO.RUiService.prototype.makeUrl = function RUiService_makeUrl(s, a){
      return this.url(s) + '?action=' + a;
   }
   MO.RUiService.prototype.parse = function RUiService_parse(p){
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
   MO.RUiService = new RUiService();
}
