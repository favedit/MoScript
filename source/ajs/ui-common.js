MO.AEvent = function AEvent(n, l, h){
   var o = this;
   MO.AAnnotation.call(o, n);
   o._annotationCd = MO.EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.linker        = MO.AEvent_linker;
   o.handle        = MO.AEvent_handle;
   o.value         = MO.AEvent_value;
   o.create        = MO.AEvent_create;
   o.attach        = MO.Method.empty;
   o.bind          = MO.AEvent_bind;
   o.toString      = MO.AEvent_toString;
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
   return new MO.SEvent();
}
MO.AEvent_bind = function AEvent_bind(h, u){
   var o = this;
   if(u){
      h.addEventListener(o._linker, MO.RDuiEvent.ohEvent, true);
   }else{
      h[o._handle] = MO.RDuiEvent.ohEvent;
   }
}
MO.AEvent_toString = function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
MO.AEventBlur = function AEventBlur(n, m){
   var o = this;
   MO.AEvent.call(o, n, 'blur', 'onblur');
   o.attach = MO.AEventBlur_attach;
   return o;
}
MO.AEventBlur_attach = function AEventBlur_attach(e, h){
}
MO.AEventChange = function AEventChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'change', 'onchange');
   o.attach = MO.AEventChange_attach;
   return o;
}
MO.AEventChange_attach = function AEventChange_attach(e, h){
}
MO.AEventClick = function AEventClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'click', 'onclick');
   o.attach = MO.AEventClick_attach;
   return o;
}
MO.AEventClick_attach = function AEventClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventDoubleClick = function AEventDoubleClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'dblclick', 'ondblclick');
   o.attach = MO.AEventDoubleClick_attach;
   return o;
}
MO.AEventDoubleClick_attach = function AEventDoubleClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventFocus = function AEventFocus(n){
   var o = this;
   MO.AEvent.call(o, n, 'focus', 'onfocus');
   o.attach = MO.AEventFocus_attach;
   return o;
}
MO.AEventFocus_attach = function AEventFocus_attach(e, h){
}
MO.AEventInputChanged = function AEventInputChanged(n){
   var o = this;
   MO.AEvent.call(o, n, 'input', 'oninput');
   o.attach = MO.AEventInputChanged_attach;
   o.bind   = MO.AEventInputChanged_bind;
   return o;
}
MO.AEventInputChanged_attach = function AEventInputChanged_attach(e, h){
}
MO.AEventInputChanged_bind = function AEventInputChanged_bind(h, u){
   var o = this;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      h.onpropertychange = MO.RDuiEvent.ohEvent;
   }else{
      h.addEventListener('input', MO.RDuiEvent.ohEvent);
   }
}
MO.AEventKeyDown = function AEventKeyDown(n){
   var o = this;
   MO.AEvent.call(o, n, 'keydown', 'onkeydown');
   o.attach = MO.AEventKeyDown_attach;
   return o;
}
MO.AEventKeyDown_attach = function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventKeyPress = function AEventKeyPress(n){
   var o = this;
   MO.AEvent.call(o, n, 'keypress', 'onkeypress');
   o.create = MO.AEventKeyPress_create;
   o.attach = MO.AEventKeyPress_attach;
   return o;
}
MO.AEventKeyPress_create = function AEventKeyPress_create(){
   return new MO.SKeyboardEvent();
}
MO.AEventKeyPress_attach = function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
MO.AEventKeyUp = function AEventKeyUp(n){
   var o = this;
   MO.AEvent.call(o, n, 'keyup', 'onkeyup');
   o.attach = MO.AEventKeyUp_attach;
   return o;
}
MO.AEventKeyUp_attach = function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventLoad = function AEventLoad(n){
   var o = this;
   MO.AEvent.call(o, n, 'load', 'onload');
   o.attach = MO.AEventLoad_attach;
   return o;
}
MO.AEventLoad_attach = function AEventLoad_attach(e, h){
}
MO.AEventMouse = function AEventMouse(n, l, h){
   var o = this;
   MO.AEvent.call(o, n, l, h);
   o.attach = MO.AEventMouse_attach;
   return o;
}
MO.AEventMouse_attach = function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == MO.EMouseButton.Left);
   e.mouseMiddle = (h.button == MO.EMouseButton.Middle);
   e.mouseRight = (h.button == MO.EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
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
MO.AEventMouseDown = function AEventMouseDown(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousedown', 'onmousedown');
   return o;
}
MO.AEventMouseEnter = function AEventMouseEnter(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   o._logger = false;
   o.attach  = MO.AEventMouseEnter_attach;
   return o;
}
MO.AEventMouseEnter_attach = function AEventMouseEnter_attach(e, h){
}
MO.AEventMouseLeave = function AEventMouseLeave(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   o._logger = false;
   o.attach  = MO.AEventMouseLeave_attach;
   return o;
}
MO.AEventMouseLeave_attach = function AEventMouseLeave_attach(e, h){
}
MO.AEventMouseMove = function AEventMouseMove(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousemove', 'onmousemove');
   o._logger = false;
   return o;
}
MO.AEventMouseOut = function AEventMouseOut(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOut_attach;
   return o;
}
MO.AEventMouseOut_attach = function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseOver = function AEventMouseOver(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOver_attach;
   return o;
}
MO.AEventMouseOver_attach = function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseUp = function AEventMouseUp(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
MO.AEventMouseWheel = function AEventMouseWheel(n){
   var o = this;
   MO.AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   o.attach = MO.AEventMouseWheel_attach;
   return o;
}
MO.AEventMouseWheel_attach = function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
MO.AEventReadyStateChange = function AEventReadyStateChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
   o.attach = MO.AEventReadyStateChange_attach;
   return o;
}
MO.AEventReadyStateChange_attach = function AEventReadyStateChange_attach(e, h){
}
MO.AEventResize = function AEventResize(n){
   var o = this;
   MO.AEvent.call(o, n, 'resize', 'onresize');
   o.attach = MO.AEventResize_attach;
   return o;
}
MO.AEventResize_attach = function AEventResize_attach(e, h){
   e.x = h.x;
   e.y = h.y;
}
MO.AEventScroll = function AEventScroll(n){
   var o = this;
   MO.AEvent.call(o, n, 'scroll', 'onscroll');
   o.attach = MO.AEventScroll_attach;
   return o;
}
MO.AEventScroll_attach = function AEventScroll_attach(e, h){
}
MO.AEventTouchEnd = function AEventTouchEnd(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchEnd_attach;
   return o;
}
MO.AEventTouchEnd_attach = function AEventTouchEnd_attach(e, h){
}
MO.AEventTouchMove = function AEventTouchMove(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchMove_attach;
   return o;
}
MO.AEventTouchMove_attach = function AEventTouchMove_attach(e, h){
}
MO.AEventTouchStart = function AEventTouchStart(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchStart_attach;
   return o;
}
MO.AEventTouchStart_attach = function AEventTouchStart_attach(e, h){
}
MO.APtyAttributes = function APtyAttributes(n, l, vl, vt, vr, vb){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._left    = MO.Lang.Integer.nvl(vl);
   o._top     = MO.Lang.Integer.nvl(vt);
   o._right   = MO.Lang.Integer.nvl(vr);
   o._bottom  = MO.Lang.Integer.nvl(vb);
   o.load     = MO.APtyAttributes_load;
   o.save     = MO.APtyAttributes_save;
   o.toString = MO.APtyAttributes_toString;
   return o;
}
MO.APtyAttributes_load = function APtyAttributes_load(v, x){
   var o = this;
   var s = v[o._name];
   if(!s){
      s = v[o._name] = new MO.TAttributes();
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
MO.APtyBoolean = function APtyBoolean(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value    = v ? v : false;
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}
MO.APtyBoolean_build = function APtyBoolean_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyBoolean_load = function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = MO.Lang.Boolean.parse(x.get(o._linker));
}
MO.APtyBoolean_save = function APtyBoolean_save(v, x){
   var o = this;
   var d = v[o._name];
   if(d){
      x.set(o._linker, MO.Lang.Boolean.toString(d));
   }
}
MO.APtyBoolean_toString = function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyBorder = function APtyBorder(name, linker){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o.load     = MO.APtyBorder_load;
   o.save     = MO.APtyBorder_save;
   o.toString = MO.APtyBorder_toString;
   return o;
}
MO.APtyBorder_load = function APtyBorder_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyBorder_save = function APtyBorder_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
}
MO.APtyBorder_toString = function APtyBorder_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtyConfig = function APtyConfig(n, l){
   var o = this;
   MO.AProperty.call(o, n, l);
   o.force = true;
   o.load  = MO.APtyConfig_load;
   o.save  = MO.Method.empty;
   return o;
}
MO.APtyConfig_load = function APtyConfig_load(v, x){
   v[this.name] = x;
}
MO.APtyEnum = function APtyEnum(n, l, e, d){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._enum    = e;
   o._default = d;
   o.build    = MO.APtyEnum_build;
   o.load     = MO.APtyEnum_load;
   o.save     = MO.APtyEnum_save;
   o.toString = MO.APtyEnum_toString;
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
MO.APtyInteger = function APtyInteger(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value   = MO.Lang.Integer.nvl(v);
   o.build    = MO.APtyInteger_build;
   o.load     = MO.APtyInteger_load;
   o.save     = MO.APtyInteger_save;
   o.toString = MO.APtyInteger_toString;
   return o;
}
MO.APtyInteger_build = function APtyInteger_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyInteger_load = function APtyInteger_load(v, x){
   var o = this;
   v[o._name] = MO.Lang.Integer.parse(x.get(o._linker));
}
MO.APtyInteger_save = function APtyInteger_save(v, x){
   var o = this;
   x.set(o._linker, MO.Lang.Integer.toString(v[o._name]));
}
MO.APtyInteger_toString = function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyNumber = function APtyNumber(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value   = MO.Lang.Integer.nvl(v);
   o.build    = MO.APtyNumber_build;
   o.toString = MO.APtyNumber_toString;
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
MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._left    = MO.Lang.Integer.nvl(left);
   o._top     = MO.Lang.Integer.nvl(top);
   o._right   = MO.Lang.Integer.nvl(right);
   o._bottom  = MO.Lang.Integer.nvl(bottom);
   o.load     = MO.APtyPadding_load;
   o.save     = MO.APtyPadding_save;
   o.toString = MO.APtyPadding_toString;
   return o;
}
MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var padding = instance[name];
   if(!padding){
      padding = instance[name] = new MO.SPadding();
   }
   padding.parse(value);
}
MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var padding = instance[name];
   if(padding){
      if(!padding.isEmpty()){
         var value = padding.toString()
         xconfig.set(o._linker, value);
      }
   }
}
MO.APtyPadding_toString = function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
MO.APtyPoint2 = function APtyPoint2(name, linker, x, y){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._x       = MO.Lang.Integer.nvl(x);
   o._y       = MO.Lang.Integer.nvl(y);
   o.load     = MO.APtyPoint2_load;
   o.save     = MO.APtyPoint2_save;
   o.toString = MO.APtyPoint2_toString;
   return o;
}
MO.APtyPoint2_load = function APtyPoint2_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyPoint2_save = function APtyPoint2_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(!value.isEmpty()){
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtyPoint2_toString = function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtySet = function APtySet(n, l, s, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._search = s;
   o._value  = v;
   o.build    = MO.APtySet_build;
   o.load     = MO.APtySet_load;
   o.save     = MO.APtySet_save;
   o.toString = MO.APtySet_toString;
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
   v[o.name] = MO.Lang.Set.containsString(x.get(o.linker), o.search);
}
MO.APtySet_save = function APtySet_save(v, x){
   var o = this;
   var n = o.name;
   var vs = v[n];
   var xs = x.get(o.linker);
   var e = MO.Lang.Set.containsString(xs, o._search);
   if(vs && !e){
      x.set(n, vs + o._search);
   }else if(!v && e){
      x.set(n, MO.Lang.String.remove(vs, o._search));
   }
}
MO.APtySet_toString = function APtySet_toString(){
   var o = this;
   return 'linker=' + o.linker + ',value=' + o._value + ',search=' + o._search;
}
MO.APtySize2 = function APtySize2(name, linker, width, height){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._width   = MO.Lang.Integer.nvl(width);
   o._height  = MO.Lang.Integer.nvl(height);
   o.load     = MO.APtySize2_load;
   o.save     = MO.APtySize2_save;
   o.toString = MO.APtySize2_toString;
   return o;
}
MO.APtySize2_load = function APtySize2_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtySize2_save = function APtySize2_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(!value.isEmpty()){
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtySize2_toString = function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
MO.APtyString = function APtyString(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value    = v ? v : null;
   o.build    = MO.APtyString_build;
   o.toString = MO.APtyString_toString;
   return o;
}
MO.APtyString_build = function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyString_toString = function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
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
MO.EUiAnchor = new function EUiAnchor(){
   var o = this;
   o.None   = 0;
   o.Left   = 1;
   o.Top    = 2;
   o.Right  = 4;
   o.Bottom = 8;
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
MO.EUiDock = new function EUiDock(){
   var o = this;
   o.None        = 'None';
   o.LeftTop     = 'LeftTop';
   o.Left        = 'Left';
   o.LeftBottom  = 'LeftBottom';
   o.Top         = 'Top';
   o.RightTop    = 'RightTop';
   o.Right       = 'Right';
   o.RightBottom = 'RightBottom';
   o.Bottom      = 'Bottom';
   o.Center      = 'Center';
   o.Fill        = 'Fill';
   return o;
}
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
MO.EUiTimeUnit = new function EUiTimeUnit() {
   var o = this;
   o.Second = 'second';
   o.Minute = 'minute';
   o.Hour   = 'hour';
   o.Day    = 'day';
   o.Week   = 'week';
   o.Month  = 'month';
   o.Year   = 'year';
   return o;
}
MO.EUiWrap = new function EUiWrap(){
   var o = this;
   o.NextLine = 0;
   o.SameLine = 1;
   return o;
}
MO.MPropertyCheck = function MPropertyCheck(o){
   o = MO.Class.inherits(this, o);
   o._valueTrue  = MO.Class.register(o, new MO.APtyString('_valueTrue'), MO.EBoolean.True);
   o._valueFalse = MO.Class.register(o, new MO.APtyString('_valueFalse'), MO.EBoolean.False);
   return o;
}
MO.MPropertyEdit = function MPropertyEdit(o){
   o = MO.Class.inherits(this, o, MO.MDuiEditValidator, MO.MDuiEditReference, MO.MDuiEditZoom);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MPropertyEdit_oeValid;
   return o;
}
MO.MPropertyEdit_oeValid = function MPropertyEdit_oeValid(e){
   var o = this;
   var r = MO.EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !MO.RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !MO.RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
MO.MPropertyNumber = function MPropertyNumber(o){
   o = MO.Class.inherits(this, o);
   o._valueMin       = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax       = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._valuePrecision = MO.Class.register(o, new MO.APtyInteger('_valuePrecision'), 3);
   return o;
}
MO.MPropertySelect = function MPropertySelect(o){
   o = MO.Class.inherits(this, o, MO.MDuiEditValidator, MO.MDuiEditReference, MO.MDuiEditZoom);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MPropertySelect_oeValid;
   return o;
}
MO.MPropertySelect_oeValid = function MPropertySelect_oeValid(e){
   var o = this;
   var r = MO.EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !MO.RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !MO.RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
MO.MUiComponent = function MUiComponent(o){
   o = MO.Class.inherits(this, o);
   o._guid         = MO.Class.register(o, [new MO.APtyString('_guid'), new MO.AGetSet('_guid')]);
   o._name         = MO.Class.register(o, [new MO.APtyString('_name'), new MO.AGetSet('_name')]);
   o._label        = MO.Class.register(o, [new MO.APtyString('_label'), new MO.AGetSet('_label')]);
   o._components   = null;
   o._tag          = MO.Class.register(o, new MO.AGetSet('_tag'));
   o.oeInitialize  = MO.MUiComponent_oeInitialize;
   o.oeRelease     = MO.MUiComponent_oeRelease;
   o.topComponent  = MO.MUiComponent_topComponent;
   o.hasComponent  = MO.MUiComponent_hasComponent;
   o.findComponent = MO.MUiComponent_findComponent;
   o.components    = MO.MUiComponent_components;
   o.push          = MO.MUiComponent_push;
   o.remove        = MO.MUiComponent_remove;
   o.clear         = MO.MUiComponent_clear;
   o.process       = MO.MUiComponent_process;
   o.psInitialize  = MO.MUiComponent_psInitialize;
   o.psRelease     = MO.MUiComponent_psRelease;
   o.toString      = MO.MUiComponent_toString;
   o.dispose       = MO.MUiComponent_dispose;
   o.innerDumpInfo = MO.MUiComponent_innerDumpInfo;
   o.innerDump     = MO.MUiComponent_innerDump;
   return o;
}
MO.MUiComponent_oeInitialize = function MUiComponent_oeInitialize(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_oeRelease = function MUiComponent_oeRelease(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_topComponent = function MUiComponent_topComponent(clazz){
   var component = this;
   if(clazz){
      while(MO.Class.isClass(component._parent, clazz)){
         component = component._parent;
      }
   }else{
      while(component._parent){
         component = component._parent;
      }
   }
   return component;
}
MO.MUiComponent_hasComponent = function MUiComponent_hasComponent(){
   var components = this._components;
   return components ? !components.isEmpty() : false;
}
MO.MUiComponent_findComponent = function MUiComponent_findComponent(name){
   var components = this._components;
   return components ? components.get(name) : null;
}
MO.MUiComponent_components = function MUiComponent_components(){
   var o = this;
   var components = o._components;
   if(components == null){
      components = new MO.TDictionary();
      o._components = components;
   }
   return components;
}
MO.MUiComponent_push = function MUiComponent_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.MUiComponent)){
      var components = o.components();
      var name = component.name();
      component.setParent(o);
      if(name == null){
         name = components.count();
         component.setName(name);
      }
      components.set(name, component);
   }
}
MO.MUiComponent_remove = function MUiComponent_remove(component){
   var o = this;
   if(!MO.Class.isClass(component, MO.MUiComponent)){
      throw new MO.TError(o, 'Parameter is not componet. (component={1})', component);
   }
   var components = o._components;
   if(!components.contains(component.name())){
      throw new MO.TError(o, 'Parameter component is not in this component. (name={1})', component.name());
   }
   components.removeValue(component);
}
MO.MUiComponent_clear = function MUiComponent_clear(){
   var o = this;
   var components = o._components;
   if(components){
      components.clear();
   }
}
MO.MUiComponent_process = function MUiComponent_process(event){
   var o = this;
   var valid = o.__base[event.clazz];
   if(valid){
      event.invokeCd = MO.EEventInvoke.Before;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   var components = o._components;
   if(components){
      var count = components.count();
      if(count){
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            var result = component.process(event);
            if(result == MO.EEventStatus.Cancel){
               return result;
            }
         }
      }
   }
   if(valid){
      event.invokeCd = MO.EEventInvoke.After;
      var callback = o[event.invoke];
      if(callback){
         var result = callback.call(o, event);
         if((result == MO.EEventStatus.Stop) || (result == MO.EEventStatus.Cancel)){
            return result;
         }
      }
   }
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_psInitialize = function MUiComponent_psInitialize(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeInitialize', MO.MUiComponent);
   o.process(event);
   event.dispose();
}
MO.MUiComponent_psRelease = function MUiComponent_psRelease(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeRelease', MO.MUiComponent);
   o.process(event);
   event.dispose();
}
MO.MUiComponent_toString = function MUiComponent_toString(){
   var o = this;
   return MO.Class.dump(o) + ':label=' + o._label;
}
MO.MUiComponent_dispose = function MUiComponent_dispose(){
   var o = this;
   o._components = MO.Lang.Object.dispose(o._components, true);
   o._tag = null;
}
MO.MUiComponent_innerDumpInfo = function MUiComponent_innerDumpInfo(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append(',name=', o._name);
   info.append(',label=', o._label);
}
MO.MUiComponent_innerDump = function MUiComponent_innerDump(info, level){
   var o = this;
   o.innerdumpInfo(info);
   var components = o.components;
   if(components){
      info.appendLine();
      var count = components.count();
      for(var n = 0; n < count; n++){
         var component = components.at(n);
         if(component){
            component.innerDump(info, level + 1);
         }
      }
   }
   return info;
}
MO.MUiControl = function MUiControl(o){
   o = MO.Class.inherits(this, o);
   o._visible      = MO.Class.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
   o._disable      = MO.Class.register(o, [new MO.APtyString('_disable'), new MO.AGetter('_disable')], false);
   o._dockCd       = MO.Class.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], MO.EUiDock.LeftTop);
   o._anchorCd     = MO.Class.register(o, [new MO.APtyString('_anchorCd'), new MO.AGetSet('_anchorCd')], MO.EUiAnchor.None);
   o._hint         = MO.Class.register(o, [new MO.APtyString('_hint'), new MO.AGetSet('_hint')]);
   o._eventEnable  = null;
   o._eventVisible = null;
   o._eventResize  = null;
   o._eventRefresh = null;
   o._eventFrame   = null;
   o.oeEnable      = MO.MUiControl_oeEnable;
   o.oeVisible     = MO.MUiControl_oeVisible;
   o.oeResize      = MO.MUiControl_oeResize;
   o.oeRefresh     = MO.MUiControl_oeRefresh;
   o.oeFrame       = MO.MUiControl_oeFrame;
   o.psEnable      = MO.MUiControl_psEnable;
   o.psVisible     = MO.MUiControl_psVisible;
   o.psResize      = MO.MUiControl_psResize;
   o.psRefresh     = MO.MUiControl_psRefresh;
   o.psFrame       = MO.MUiControl_psFrame;
   o.dispose       = MO.MUiControl_dispose;
   return o;
}
MO.MUiControl_oeEnable = function MUiControl_oeEnable(event){
   var o = this;
   if(event.isBefore()){
      o.setEnable(event.enable);
   }
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeVisible = function MUiControl_oeVisible(event){
   var o = this;
   if(event.isBefore()){
      o.setVisible(event.visible);
   }
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeResize = function MUiControl_oeResize(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeRefresh = function MUiControl_oeRefresh(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_oeFrame = function MUiControl_oeFrame(event){
   return MO.EEventStatus.Continue;
}
MO.MUiControl_psEnable = function MUiControl_psEnable(enable){
   var o = this;
   var event = o._eventEnable;
   if(!event){
      event = o._eventEnable = new MO.SUiDispatchEvent(o, 'oeEnable', MO.MUiControl);
   }
   event.enable = enable;
   o.process(event);
}
MO.MUiControl_psVisible = function MUiControl_psVisible(visible){
   var o = this;
   var event = o._eventVisible;
   if(!event){
      event = o._eventVisible = new MO.SUiDispatchEvent(o, 'oeVisible', MO.MUiControl);
   }
   event.visible = visible;
   o.process(event);
}
MO.MUiControl_psResize = function MUiControl_psResize(){
   var o = this;
   var event = o._eventResize;
   if(!event){
      event = o._eventResize = new MO.SUiDispatchEvent(o, 'oeResize', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_psRefresh = function MUiControl_psRefresh(){
   var o = this;
   var event = o._eventRefresh;
   if(!event){
      event = o._eventRefresh = new MO.SUiDispatchEvent(o, 'oeRefresh', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_psFrame = function MUiControl_psFrame(){
   var o = this;
   var event = o._eventFrame;
   if(!event){
      event = o._eventFrame = new MO.SUiDispatchEvent(o, 'oeFrame', MO.MUiControl);
   }
   o.process(event);
}
MO.MUiControl_dispose = function MUiControl_dispose(){
   var o = this;
   o._eventEnable = MO.Lang.Object.dispose(o._eventEnable);
   o._eventVisible = MO.Lang.Object.dispose(o._eventVisible);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventRefresh = MO.Lang.Object.dispose(o._eventRefresh);
   o._eventFrame = MO.Lang.Object.dispose(o._eventFrame);
}
MO.MUiDataProperties = function MUiDataProperties(o){
   o = MO.Class.inherits(this, o);
   o._dataProperties = null;
   o.dataProperties  = MO.MUiDataProperties_dataProperties;
   o.dataPropertyGet = MO.MUiDataProperties_dataPropertyGet;
   o.dataPropertySet = MO.MUiDataProperties_dataPropertySet;
   return o;
}
MO.MUiDataProperties_dataProperties = function MUiDataProperties_dataProperties(n, c){
   var o = this;
   var properties = o._dataProperties;
   if(properties == null){
      properties = o._dataProperties = new MO.TDictionary();
   }
   return properties;
}
MO.MUiDataProperties_dataPropertyGet = function MUiDataProperties_dataPropertyGet(name){
   var o = this;
   var properties = o._dataProperties;
   return properties ? properties.get(n) : null;
}
MO.MUiDataProperties_dataPropertySet = function MUiDataProperties_dataPropertySet(name, value){
   this.dataProperties().set(name, value);
}
MO.MUiDragable = function MUiDragable(o){
   o = MO.Class.inherits(this, o);
   o.onDragStart = MO.Method.virtual(o, 'onDragStart');
   o.onDragMove  = MO.Method.virtual(o, 'onDragMove');
   o.onDragStop  = MO.Method.virtual(o, 'onDragStop');
   return o;
}
MO.MUiMargin = function MUiMargin(o){
   o = MO.RClass.inherits(this, o);
   o._margin   = MO.RClass.register(o, [new MO.APtyPadding('_margin'), new MO.AGetter('_margin')]);
   o.construct = MO.MUiMargin_construct;
   o.setMargin = MO.MUiMargin_setMargin;
   o.dispose   = MO.MUiMargin_dispose;
   return o;
}
MO.MUiMargin_construct = function MUiMargin_construct(){
   var o = this;
   o._margin = new MO.SPadding();
}
MO.MUiMargin_setMargin = function MUiMargin_setMargin(left, top, right, bottom){
   this._margin.set(left, top, right, bottom);
}
MO.MUiMargin_dispose = function MUiMargin_dispose(){
   var o = this;
   o._margin = MO.Lang.Object.dispose(o._margin);
}
MO.MUiPadding = function MUiPadding(o){
   o = MO.RClass.inherits(this, o);
   o._padding   = MO.RClass.register(o, [new MO.APtyPadding('_padding'), new MO.AGetter('_padding')]);
   o.construct  = MO.MUiPadding_construct;
   o.setPadding = MO.MUiPadding_setPadding;
   o.dispose    = MO.MUiPadding_dispose;
   return o;
}
MO.MUiPadding_construct = function MUiPadding_construct(){
   var o = this;
   o._padding = new MO.SPadding();
}
MO.MUiPadding_setPadding = function MUiPadding_setPadding(left, top, right, bottom){
   this._padding.set(left, top, right, bottom);
}
MO.MUiPadding_dispose = function MUiPadding_dispose(){
   var o = this;
   o._padding = MO.Lang.Object.dispose(o._padding);
}
MO.MUiProgress = function MUiProgress(o){
   o = MO.Class.inherits(this, o);
   o.oeProgress = MO.Method.virtual(o, 'oeProgress');
   return o;
}
MO.MUiStorage = function MUiStorage(o){
   o = MO.Class.inherits(this, o);
   o._storageCode      = null;
   o._storageObject    = null;
   o.storageGet        = MO.MUiStorage_storageGet;
   o.storageGetBoolean = MO.MUiStorage_storageGetBoolean;
   o.storageSet        = MO.MUiStorage_storageSet;
   o.storageUpdate     = MO.MUiStorage_storageUpdate;
   o.dispose           = MO.MUiStorage_dispose;
   return o;
}
MO.MUiStorage_storageGet = function MUiStorage_storageGet(name, defaultValue){
   var o = this;
   if(name == null){
      throw new MO.TError(o, 'Name is empty.');
   }
   var object = o._storageObject;
   if(!object){
      var storge = MO.Window.storage(MO.EScope.Local);
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
   return MO.Lang.Boolean.parse(value);
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
      var storge = MO.Window.storage(MO.EScope.Local);
      var value = MO.Json.toString(object);
      storge.set(o._storageCode, value);
   }
}
MO.MUiStorage_dispose = function MUiStorage_dispose(){
   var o = this;
   o._storageCode = null;
   o._storageObject = null;
}
MO.MUiTextFormator = function MUiTextFormator(o){
   o = MO.Class.inherits(this, o);
   o.formatText  = MO.MUiTextFormator_formatText;
   o.formatValue = MO.MUiTextFormator_formatValue;
   return o;
}
MO.MUiTextFormator_formatText = function MUiTextFormator_formatText(value){
   return value;
}
MO.MUiTextFormator_formatValue = function MUiTextFormator_formatValue(text){
   return text;
}
MO.MUiValue = function MUiValue(o){
   o = MO.Class.inherits(this, o);
   o.get = MO.Method.empty;
   o.set = MO.Method.empty;
   return o;
}
MO.Ui = new function MoUiSpace(){return this;}
MO.Gui = new function MoGuiSpace(){return this;}
MO.Dui = new function MoDuiSpace(){return this;}
MO.SUiDispatchEvent = function SUiDispatchEvent(owner, invokeName, clazz){
   var o = this;
   MO.SEvent.call(o);
   o.owner    = owner;
   o.invoke   = invokeName;
   o.clazz    = MO.Class.name(clazz);
   o.invokeCd = MO.EEventInvoke.Unknown;
   o.isBefore = MO.SUiDispatchEvent_isBefore;
   o.isAfter  = MO.SUiDispatchEvent_isAfter;
   o.dispose  = MO.SUiDispatchEvent_dispose;
   o.dump     = MO.SUiDispatchEvent_dump;
   return o;
}
MO.SUiDispatchEvent_isBefore = function SUiDispatchEvent_isBefore(){
   return this.invokeCd == MO.EEventInvoke.Before;
}
MO.SUiDispatchEvent_isAfter = function SUiDispatchEvent_isAfter(){
   return this.invokeCd == MO.EEventInvoke.After;
}
MO.SUiDispatchEvent_dispose = function SUiDispatchEvent_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
MO.SUiDispatchEvent_dump = function SUiDispatchEvent_dump(){
   var o = this;
   return MO.Class.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + MO.Method.name(o.invoke);
}
MO.SUiFont = function SUiFont(){
   var o = this;
   o.font     = null;
   o.size     = 16;
   o.bold     = false;
   o.color    = '#FFFFFF';
   o.assign   = MO.SUiFont_assign;
   o.parse    = MO.SUiFont_parse;
   o.toString = MO.SUiFont_toString;
   o.dispose  = MO.SUiFont_dispose;
   return o;
}
MO.SUiFont_assign = function SUiFont_assign(value){
   var o = this;
   o.font = value.font;
   o.size = value.size;
   o.bold = value.bold;
   o.color = value.color;
}
MO.SUiFont_parse = function SUiFont_parse(source){
   var o = this;
   throw new MO.TError('Unsupport.');
}
MO.SUiFont_toString = function SUiFont_toString(){
   var o = this;
   var result = '';
   if(o.bold){
      result += 'bold';
   }
   if(o.size){
      if(result != ''){
         result += ' ';
      }
      result += o.size + 'px';
   }
   if(o.font){
      if(result != ''){
         result += ' ';
      }
      result += o.font;
   }
   return result;
}
MO.SUiFont_dispose = function SUiFont_dispose(){
   var o = this;
   o.font = null;
   o.size = null;
   o.bold = null;
}
