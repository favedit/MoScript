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
MO.AEvent_bind = function AEvent_bind(hTag, capture){
   var o = this;
   if(capture){
      hTag.addEventListener(o._linker, MO.Dui.Event.ohEvent, true);
   }else{
      hTag[o._handle] = MO.Dui.Event.ohEvent;
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
      h.onpropertychange = MO.Dui.Event.ohEvent;
   }else{
      h.addEventListener('input', MO.Dui.Event.ohEvent);
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
MO.APtyBoolean = function APtyBoolean(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._value    = value ? value : false;
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}
MO.APtyBoolean_build = function APtyBoolean_build(instance){
   var o = this;
   if(instance[o._name] == null){
      instance[o._name] = o._value;
   }
}
MO.APtyBoolean_load = function APtyBoolean_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Boolean.parse(value);
}
MO.APtyBoolean_save = function APtyBoolean_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(value){
      xconfig.set(o._linker, MO.Lang.Boolean.toString(value));
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
MO.APtyFont = function APtyFont(name, linker, font, size, bold, color) {
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._font  = MO.Lang.Integer.nvl(font);
   o._size  = MO.Lang.Integer.nvl(size);
   o._bold  = MO.Lang.Integer.nvl(bold);
   o._color = MO.Lang.Integer.nvl(color);
   o.load = MO.APtyFont_load;
   o.save = MO.APtyFont_save;
   o.toString = MO.APtyFont_toString;
   return o;
}
MO.APtyFont_load = function APtyFont_load(instance, xconfig) {
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyFont_save = function APtyFont_save(instance, xconfig) {
   var o = this;
   var value = instance[o._name];
   if (!value.isEmpty()) {
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtyFont_toString = function APtyFont_toString() {
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._font + ',' + o._size + o._bold + ',' + o._color;
}
MO.APtyInteger = function APtyInteger(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._value   = MO.Lang.Integer.nvl(value);
   o.build    = MO.APtyInteger_build;
   o.load     = MO.APtyInteger_load;
   o.save     = MO.APtyInteger_save;
   o.toString = MO.APtyInteger_toString;
   return o;
}
MO.APtyInteger_build = function APtyInteger_build(instance){
   var o = this;
   var name = o._name;
   if(instance[name] == null){
      instance[name] = o._value;
   }
}
MO.APtyInteger_load = function APtyInteger_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Integer.parse(value);
}
MO.APtyInteger_save = function APtyInteger_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   xconfig.set(o._linker, MO.Lang.Integer.toString(value));
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
      var value = padding.toString()
      xconfig.set(o._linker, value);
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
MO.APtySet = function APtySet(name, linker, search, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   var code = null;
   if(MO.Lang.String.startsWith(name, '_')){
      code = name.substring(1);
   }else{
      code = name;
   }
   o._code   = MO.Lang.String.toUnderline(code);
   o._search = search;
   o._value  = value;
   o.code     = MO.APtySet_code;
   o.build    = MO.APtySet_build;
   o.load     = MO.APtySet_load;
   o.save     = MO.APtySet_save;
   o.toString = MO.APtySet_toString;
   return o;
}
MO.APtySet_code = function APtySet_code(){
   return this._code;
}
MO.APtySet_build = function APtySet_build(instance){
   var o = this;
   var name = o._name;
   if(instance[name] == null){
      instance[name] = o._value;
   }
}
MO.APtySet_load = function APtySet_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker)
   instance[o._name] = MO.Lang.Set.containsString(value, o._search);
}
MO.APtySet_save = function APtySet_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var search = o._search;
   var value = instance[name];
   var values = xconfig.get(o._linker);
   var exists = MO.Lang.Set.containsString(xs, search);
   if(value && !exists){
      xconfig.set(name, values + search);
   }else if(!value && exists){
      xconfig.set(name, MO.Lang.String.remove(values, search));
   }
}
MO.APtySet_toString = function APtySet_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value + ',search=' + o._search;
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
   var name = o._name;
   var value = xconfig.get(o._linker);
   var size = instance[name];
   if(!size){
      size = instance[name] = new MO.SSize2();
   }
   size.parse(value);
}
MO.APtySize2_save = function APtySize2_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var size = instance[name];
   if(size){
      var value = size.toString()
      xconfig.set(o._linker, value);
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
   o.Text         = '#0099FF';
   o.TextHover    = '#000000';
   o.TextReadonly = '#000000';
   o.Edit         = '#EBFFFF';
   o.EditHover    = '#EBFFFF';
   o.EditReadonly = '#FEFECB';
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
MO.EUiDataAction = new function EUiDataAction(){
   var o = this;
   MO.TEnum.call(o);
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
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
MO.EUiMode = new function EUiMode(){
   var o = this;
   MO.TEnum.call(o);
   o.View   = 'V';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   o.Search = 'S';
   o.Picker = 'P';
   o.Zoom   = 'Z';
   o.Design = 'G';
   o.Print  = 'R';
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
MO.MUiBorder = function MUiBorder(o){
   o = MO.Class.inherits(this, o);
   o._borderInner = MO.Class.register(o, [new MO.APtyBorder('_borderInner'), new MO.AGetter('_borderInner')]);
   o._borderOuter = MO.Class.register(o, [new MO.APtyBorder('_borderOuter'), new MO.AGetter('_borderOuter')]);
   o.construct    = MO.MUiBorder_construct;
   o.dispose      = MO.MUiBorder_dispose;
   return o;
}
MO.MUiBorder_construct = function MUiBorder_construct(){
   var o = this;
   o._borderInner = new MO.SBorder();
   o._borderOuter = new MO.SBorder();
}
MO.MUiBorder_dispose = function MUiBorder_dispose(){
   var o = this;
   o._borderInner = MO.Lang.Object.dispose(o._borderInner);
   o._borderOuter = MO.Lang.Object.dispose(o._borderOuter);
}
MO.MUiComponent = function MUiComponent(o){
   o = MO.Class.inherits(this, o);
   o._valid           = MO.Class.register(o, [new MO.APtyBoolean('_valid'), new MO.AGetSet('_valid')]);
   o._guid            = MO.Class.register(o, [new MO.APtyString('_guid'), new MO.AGetSet('_guid')]);
   o._code            = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._name            = MO.Class.register(o, [new MO.APtyString('_name'), new MO.AGetSet('_name')]);
   o._label           = MO.Class.register(o, [new MO.APtyString('_label'), new MO.AGetSet('_label')]);
   o._attributes      = MO.Class.register(o, [new MO.APtyAttributes('_attributes'), new MO.AGetter('_attributes')]);
   o._components      = null;
   o._tag             = MO.Class.register(o, new MO.AGetSet('_tag'));
   o.oeInitialize     = MO.MUiComponent_oeInitialize;
   o.oeRelease        = MO.MUiComponent_oeRelease;
   o.attributeGet     = MO.MUiComponent_attributeGet;
   o.attributeSet     = MO.MUiComponent_attributeSet;
   o.topComponent     = MO.MUiComponent_topComponent;
   o.hasComponent     = MO.MUiComponent_hasComponent;
   o.findComponent    = MO.MUiComponent_findComponent;
   o.searchComponent  = MO.MUiComponent_searchComponent;
   o.searchComponents = MO.MUiComponent_searchComponents;
   o.components       = MO.MUiComponent_components;
   o.push             = MO.MUiComponent_push;
   o.remove           = MO.MUiComponent_remove;
   o.clear            = MO.MUiComponent_clear;
   o.process          = MO.MUiComponent_process;
   o.psInitialize     = MO.MUiComponent_psInitialize;
   o.psRelease        = MO.MUiComponent_psRelease;
   o.toString         = MO.MUiComponent_toString;
   o.dispose          = MO.MUiComponent_dispose;
   o.innerDumpInfo    = MO.MUiComponent_innerDumpInfo;
   o.innerDump        = MO.MUiComponent_innerDump;
   return o;
}
MO.MUiComponent_oeInitialize = function MUiComponent_oeInitialize(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_oeRelease = function MUiComponent_oeRelease(e){
   return MO.EEventStatus.Continue;
}
MO.MUiComponent_attributeGet = function MUiComponent_attributeGet(name){
   var value = null;
   var attributes = this._attributes;
   if(attributes){
      value = attributes.get(name);
   }
   return value;
}
MO.MUiComponent_attributeSet = function MUiComponent_attributeSet(name, value){
   var o = this;
   var attributes = o._attributes;
   if(!attributes){
      attributes = o._attributes = new MO.TAttributes();
   }
   attributes.set(name, value);
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
MO.MUiComponent_searchComponent = function MUiComponent_searchComponent(name){
   var findComponent = null;
   var components = this._components;
   if(components){
      findComponent = components.get(name);
   }
   if(!findComponent){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         findComponent = component.findComponent(name);
         if(findComponent){
            return findComponent;
         }
      }
   }
   return findComponent;
}
MO.MUiComponent_searchComponents = function MUiComponent_searchComponents(findComponents, clazz){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, clazz)){
            findComponents.pushUnique(component);
         }
         component.searchComponents(findComponents, clazz);
      }
   }
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
   o._attributes = MO.Lang.Object.dispose(o._attributes);
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
MO.MUiContainer = function MUiContainer(o){
   o = MO.Class.inherits(this, o);
   o._scrollCd   = MO.Class.register(o, new MO.APtyEnum('_scrollCd', null, MO.EUiScroll, MO.EUiScroll.None));
   o.createChild = MO.Method.empty;
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
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
MO.MUiDataContainer = function MUiDataContainer(o){
   o = MO.Class.inherits(this, o);
   o._dataActionCd = MO.Class.register(o, new MO.AGetter('_dataActionCd'));
   o.loadUnit      = MO.MUiDataContainer_loadUnit;
   o.saveUnit      = MO.MUiDataContainer_saveUnit;
   o.dataView      = MO.MUiDataContainer_dataView;
   o.dataPrepare   = MO.MUiDataContainer_dataPrepare;
   o.dataModify    = MO.MUiDataContainer_dataModify;
   o.dataErase     = MO.MUiDataContainer_dataErase;
   o.dataSave      = MO.MUiDataContainer_dataSave;
   return o;
}
MO.MUiDataContainer_loadUnit = function MUiDataContainer_loadUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_saveUnit = function MUiDataContainer_saveUnit(unit){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveUnit', MO.MUiDataField);
   event.unit = unit;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataView = function MUiDataContainer_dataView(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeDataView', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataPrepare = function MUiDataContainer_dataPrepare(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Insert;
   var event = new MO.SUiDispatchEvent(o, 'oeDataPrepare', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataModify = function MUiDataContainer_dataModify(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Update;
   var event = new MO.SUiDispatchEvent(o, 'oeDataEdit', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataErase = function MUiDataContainer_dataErase(){
   var o = this;
   o._dataActionCd = MO.EUiDataAction.Delete;
   var event = new MO.SUiDispatchEvent(o, 'oeDataDelete', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dataSave = function MUiDataContainer_dataSave(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeDataSave', MO.MUiDataField);
   o.process(event);
   event.dispose();
}
MO.MUiDataField = function MUiDataField(o){
   o = MO.Class.inherits(this, o);
   o._dataName     = MO.Class.register(o, [new MO.APtyString('_dataName'), new MO.AGetSet('_dataName')]);
   o._dataTypeCd   = MO.Class.register(o, [new MO.APtyString('_dataTypeCd'), new MO.AGetSet('_dataTypeCd')], MO.EDataType.String);
   o._dataRequire  = MO.Class.register(o, [new MO.APtyBoolean('_dataRequire'), new MO.AGetSet('_dataRequire')]);
   o._dataDefault  = MO.Class.register(o, [new MO.APtyString('_dataDefault'), new MO.AGetSet('_dataDefault')]);
   o.oeDataPrepare = MO.MUiDataField_oeDataPrepare;
   return o;
}
MO.MUiDataField_oeDataPrepare = function MUiDataField_oeDataPrepare(event){
   var o = this;
   if(event.isAfter()){
      o.set(o._dataDefault);
   }
   return MO.EEventStatus.Continue;
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
MO.MUiDataset = function MUiDataset(o){
   o = MO.Class.inherits(this, o);
   o._dsService       = MO.Class.register(o, [new MO.APtyString('_dsService', 'dataset_service'), new MO.AGetSet('_dsService')]);
   o._dsName          = MO.Class.register(o, [new MO.APtyString('_dsName', 'dataset_name'), new MO.AGetSet('_dsName')]);
   o._dsPageSize      = MO.Class.register(o, [new MO.APtyInteger('_dsPageSize', 'page_size'), new MO.AGetSet('_dsPageSize')], 20);
   o._dsPage          = 0;
   o._dsInsertAction  = MO.Class.register(o, [new MO.APtyString('_dsInsertAction', 'insert_action'), new MO.AGetSet('_dsInsertAction')]);
   o._dsUpdateAction  = MO.Class.register(o, [new MO.APtyString('_dsUpdateAction', 'update_action'), new MO.AGetSet('_dsUpdateAction')]);
   o._dsDeleteAction  = MO.Class.register(o, [new MO.APtyString('_dsDeleteAction', 'delete_action'), new MO.AGetSet('_dsDeleteAction')]);
   o._activeDataset   = null;
   o.oeLoadDataSource = MO.MUiDataContainer_oeLoadDataSource;
   o.oeSaveDataSource = MO.MUiDataContainer_oeSaveDataSource;
   o.dsLoadSource     = MO.MUiDataContainer_dsLoadSource;
   o.dsSaveSource     = MO.MUiDataContainer_dsSaveSource;
   return o;
}
MO.MUiDataContainer_oeLoadDataSource = function MUiDataContainer_oeLoadDataSource(event){
   var o = this;
   if(event.isBefore()){
      var source = event.source;
      o._activeDataset = source.selectDataset(o._dsName);
      var row = source.selectRow();
      o.loadUnit(row);
   }
   return MO.EEventStatus.Contine;
}
MO.MUiDataContainer_oeSaveDataSource = function MUiDataContainer_oeSaveDataSource(event){
   var o = this;
   if(event.isBefore()){
      var source = event.source;
      o._activeDataset = source.selectDataset(o._dsName);
      var row = source.selectRow();
      switch(o._dataActionCd){
         case MO.EUiDataAction.Insert:
            row._statusCd = MO.EDataStatus.Insert;
            break;
         case MO.EUiDataAction.Update:
            row._statusCd = MO.EDataStatus.Update;
            break;
         case MO.EUiDataAction.Delete:
            row._statusCd = MO.EDataStatus.Delete;
            break;
         default:
            throw new TError(o, 'Invalid data action.');
      }
      o.saveUnit(row);
   }
   return MO.EEventStatus.Contine;
}
MO.MUiDataContainer_dsLoadSource = function MUiDataContainer_dsLoadSource(source){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadDataSource', MO.MUiDataset);
   event.source = source;
   o.process(event);
   event.dispose();
}
MO.MUiDataContainer_dsSaveSource = function MUiDataContainer_dsSaveSource(source){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveDataSource', MO.MUiDataset);
   event.source = source;
   o.process(event);
   event.dispose();
}
MO.MUiDataset_onDsFetch = function MUiDataset_onDsFetch(g){
   var o = this;
   var ds = g.datasets;
   o.dsDatasetLoad(ds);
}
MO.MUiDataset_onDsCopy = function MUiDataset_onDsCopy(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsPrepare = function MUiDataset_onDsPrepare(g){
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
MO.MUiDataset_onDsUpdate = function MUiDataset_onDsUpdate(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsDoUpdate = function MUiDataset_onDsDoUpdate(g){
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
MO.MUiDataset_onDsDelete = function MUiDataset_onDsDelete(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.doDelete(g.resultRow);
   o.onLoadDatasetEnd();
   o.focus();
}
MO.MUiDataset_onDsProcess = function MUiDataset_onDsProcess(g){
   var o = this;
   var cb = g.resultCallback;
   if(cb){
      cb.invoke(o, g);
   }
}
MO.MUiDataset_oeDataLoad = function MUiDataset_oeDataLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_oeDataSave = function MUiDataset_oeDataSave(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_oeDatasetLoad = function MUiDataset_oeDatasetLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.datasets;
      var d = ds.get(o._name);
      o._dataset = d;
      o.onDatasetLoad(d);
   }
   return EEventStatus.Contine;
}
MO.MUiDataset_construct = function MUiDataset_construct(){
   var o = this;
   o._dataViewer = new TDatasetViewer();
}
MO.MUiDataset_loadDataset = function MUiDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o._dataViewer);
   o.onLoadDataset(d);
}
MO.MUiDataset_loadDatasets = function MUiDataset_loadDatasets(p){
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
MO.MUiDataset_dsDatasetLoad = function MUiDataset_dsDatasetLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDatasetLoad', MUiDataset);
   e.datasets = p;
   o.process(e);
   e.dispose();
}
MO.MUiDataset_toDeepAttributes = function MUiDataset_toDeepAttributes(a, m){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var ts = new TList();
   var p = o;
   while(p){
      if(MO.Class.isClass(p, MUiDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MUiDataset);
   }
   for(var n=ts.count; n>=0; n--){
      var p = ts.get(n);
      if(MO.Class.isClass(p, FForm)){
         p.toAttributes(a, m);
      }else if(MO.Class.isClass(m, FTable)){
         var r = p.getCurrentRow();
         if(r){
            r.toAttributes(a, m);
         }
      }
   }
   return a;
}
MO.MUiDataset_dsFetch = function MUiDataset_dsFetch(){
   var o = this;
   var g = new TDatasetFetchArg();
   g.owner = o;
   g.name = o._name;
   g.callback = o.onDsFetch;
   RConsole.find(FDatasetConsole).fetch(g);
}
MO.MUiDataset_dsInitialize = function MUiDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}
MO.MUiDataset_dsShow = function MUiDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}
MO.MUiDataset_dsLoaded = function MUiDataset_dsLoaded(){
   this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
}
MO.MUiDataset_dsSearch = function MUiDataset_dsSearch(s){
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
MO.MUiDataset_dsCopy = function MUiDataset_dsCopy(r){
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
MO.MUiDataset_dsPrepare = function MUiDataset_dsPrepare(cb){
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
MO.MUiDataset_dsUpdate = function MUiDataset_dsUpdate(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
MO.MUiDataset_dsDoUpdate = function MUiDataset_dsDoUpdate(cb, ck){
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
MO.MUiDataset_dsDelete = function MUiDataset_dsDelete(u, v){
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
MO.MUiDataset_dsMode = function MUiDataset_dsMode(m){
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
MO.MUiDataset_dsProcess = function MUiDataset_dsProcess(da, cb){
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
MO.MUiDataset_dsProcessCustom = function MUiDataset_dsProcessCustom(pm, da, cb, cc){
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
MO.MUiDataset_dsProcessSelected = function MUiDataset_dsProcessSelected(da, cb){
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
MO.MUiDataset_dsProcessChanged = function MUiDataset_dsProcessChanged(da, cb){
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
MO.MUiDataset_dsProcessAll = function MUiDataset_dsProcessAll(da, cb){
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
MO.MUiDataset_psProgress = function MUiDataset_psProgress(v){
   var o = this;
   if(o.__progress == v){
      return;
   }
   o.__progress = v;
   var e = o.__progressProcess;
   e.enable = v;
   o.process(e);
}
MO.MUiDataset_psValid = function MUiDataset_psValid(){
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
MO.MUiDataset_dsIsChanged = function MUiDataset_dsIsChanged(){
   var ds = this.dsStore;
   return ds ? ds.isChanged() : false;
}
MO.MUiDataset_dsCount = function MUiDataset_dsCount(){
   return this.dsStore ? this.dsStore.count : 0;
}
MO.MUiDataset_dsCurrent = function MUiDataset_dsCurrent(){
   var o = this;
   var ds = o.dsStore;
}
MO.MUiDataset_dsMove = function MUiDataset_dsMove(p){
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
   if(MO.Class.isClass(o, MValue)){
      o.loadValue(ds.current());
   }
}
MO.MUiDataset_dsMovePage = function MUiDataset_dsMovePage(p){
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
MO.MUiDataset_dsGet = function MUiDataset_dsGet(n){
   return this.dsStore ? this.dsStore.get(n) : '';
}
MO.MUiDataset_dsSet = function MUiDataset_dsSet(n, v){
   if(this.dsStore){
      this.dsStore.set(n, v);
   }
}
MO.MUiDataset_dsRefresh = function MUiDataset_dsRefresh(){
   if(this._dsService){
      this.dsMove(this.dsPage, true);
   }
}
MO.MUiDataset_doSearch = function MUiDataset_doSearch(){
   var o = this;
   var sw = o.dsSearchWindow;
   if(!sw){
      sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
      sw.linkDsControl(o);
   }
   sw.show();
}
MO.MUiDataValue = function MUiDataValue(o){
   o = MO.Class.inherits(this, o, MO.MUiValue);
   o._dataValue = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   o.oeLoadDataRow = MO.Method.empty;
   o.oeSaveDataRow = MO.Method.empty;
   return o;
}
MO.MUiDisplay = function MUiDisplay(o){
   o = MO.Class.inherits(this, o);
   o._displayView   = MO.Class.register(o, new MO.APtySet('_displayView', 'display_mode', MO.EUiMode.View, true));
   o._displayInsert = MO.Class.register(o, new MO.APtySet('_displayInsert', 'display_mode', MO.EUiMode.Insert, false));
   o._displayUpdate = MO.Class.register(o, new MO.APtySet('_displayUpdate', 'display_mode', MO.EUiMode.Update, true));
   o._displayDelete = MO.Class.register(o, new MO.APtySet('_displayDelete', 'display_mode', MO.EUiMode.Delete, false));
   o._displaySearch = MO.Class.register(o, new MO.APtySet('_displaySearch', 'display_mode', MO.EUiMode.Search, false));
   o._displayPicker = MO.Class.register(o, new MO.APtySet('_displayPicker', 'display_mode', MO.EUiMode.Picker, false));
   o._displayZoom   = MO.Class.register(o, new MO.APtySet('_displayZoom', 'display_mode', MO.EUiMode.Zoom, false));
   o._statusDisplay = MO.Class.register(o, new MO.AGetter('_statusDisplay', 'isDisplay'), true);
   o.oeMode         = MO.MUiDisplay_oeMode;
   o.testVisible    = MO.MUiDisplay_testVisible;
   o.setVisible     = MO.Method.empty;
   return o;
}
MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var visible = o._statusDisplay = o.testVisible(modeCd);
      o.setVisible(visible);
   }
}
MO.MUiDisplay_testVisible = function MUiDisplay_testVisible(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._displayView;
      case MO.EUiMode.Search:
         return o._displaySearch;
      case MO.EUiMode.Insert:
         return o._displayInsert;
      case MO.EUiMode.Update:
         return o._displayUpdate;
      case MO.EUiMode.Delete:
         return o._displayDelete;
      case MO.EUiMode.Zoom:
         return o._displayZoom;
   }
   return false;
}
MO.MUiDisplayContrainer = function MUiDisplayContrainer(o){
   o = MO.Class.inherits(this, o);
   o._modeCd    = MO.Class.register(o, new MO.AGetter('_modeCd'), MO.EUiMode.View);
   o._eventMode = null;
   o.construct  = MO.MUiDisplayContrainer_construct;
   o.psMode     = MO.MUiDisplayContrainer_psMode;
   o.psDesign   = MO.MUiDisplayContrainer_psDesign;
   o.dispose    = MO.MUiDisplayContrainer_dispose;
   return o;
}
MO.MUiDisplayContrainer_construct = function MUiDisplayContrainer_construct(){
   var o = this;
   o._eventMode = new MO.SUiDispatchEvent(o, 'oeMode', MO.MUiDisplay);
}
MO.MUiDisplayContrainer_psMode = function MUiDisplayContrainer_psMode(modeCd){
   var o = this;
   o._modeCd = modeCd;
   var event = o._eventMode;
   event.modeCd = modeCd;
   o.process(event);
}
MO.MUiDisplayContrainer_psDesign = function MUiDisplayContrainer_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   var event = new MO.SUiDispatchEvent(o, 'oeDesign', MO.MUiDesign)
   event.mode = m;
   event.flag = f;
   o.process(event);
   event.dispose();
}
MO.MUiDisplayContrainer_dispose = function MUiDisplayContrainer_dispose(){
   var o = this;
   o._eventMode = MO.Lang.Object.Dispose(o._eventMode);
}
MO.MUiDragable = function MUiDragable(o){
   o = MO.Class.inherits(this, o);
   o.onDragStart = MO.Method.virtual(o, 'onDragStart');
   o.onDragMove  = MO.Method.virtual(o, 'onDragMove');
   o.onDragStop  = MO.Method.virtual(o, 'onDragStop');
   return o;
}
MO.MUiEditable = function MUiEditable(o){
   o = MO.Class.inherits(this, o);
   o._editView       = MO.Class.register(o, new MO.APtySet('_editView', 'edit_mode', MO.EUiMode.View, false));
   o._editInsert     = MO.Class.register(o, new MO.APtySet('_editInsert', 'edit_mode', MO.EUiMode.Insert, false));
   o._editUpdate     = MO.Class.register(o, new MO.APtySet('_editUpdate', 'edit_mode', MO.EUiMode.Update, false));
   o._editDelete     = MO.Class.register(o, new MO.APtySet('_editDelete', 'edit_mode', MO.EUiMode.Delete, false));
   o._statusEditable = MO.Class.register(o, new MO.AGetter('_statusEditable', 'isEditable'), true);
   o.oeMode          = MO.MUiEditable_oeMode;
   o.testEditable    = MO.MUiEditable_testEditable;
   o.setEditable     = MO.Class.register(o, new MO.AVirtual('setEditable'));
   return o;
}
MO.MUiEditable_oeMode = function MUiEditable_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var editable = o._statusEditable = o.testEditable(modeCd);
      o.setEditable(editable);
   }
}
MO.MUiEditable_testEditable = function MUiEditable_testEditable(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._editView;
      case MO.EUiMode.Insert:
         return o._editInsert;
      case MO.EUiMode.Update:
         return o._editUpdate;
      case MO.EUiMode.Delete:
         return o._editDelete;
   }
   return false;
}
MO.MUiEditValue = function MUiEditValue(o){
   o = MO.Class.inherits(this, o, MO.MUiTextFormator);
   o._statusEditable = true;
   o._statusEditing  = false;
   o._statusInvalid  = true;
   o._recordText     = null;
   o._recordValue    = null;
   o._currentValue   = null;
   o.isTextChanged   = MO.MUiEditValue_isTextChanged;
   o.isValueChanged  = MO.MUiEditValue_isValueChanged;
   o.formator        = MO.MUiEditValue_formator;
   o.get             = MO.MUiEditValue_get;
   o.set             = MO.MUiEditValue_set;
   o.text            = MO.MUiEditValue_text;
   o.clearValue      = MO.MUiEditValue_clearValue;
   o.resetValue      = MO.MUiEditValue_resetValue;
   o.loadValue       = MO.MUiEditValue_loadValue;
   o.saveValue       = MO.MUiEditValue_saveValue;
   o.recordValue     = MO.MUiEditValue_recordValue;
   o.validValue      = MO.Method.empty;
   o.setEditAble     = MO.MUiEditValue_setEditAble;
   o.doFocus         = MO.MUiEditValue_doFocus;
   o.doBlur          = MO.MUiEditValue_doBlur;
   return o;
}
MO.MUiEditValue_isTextChanged = function MUiEditValue_isTextChanged(){
   var o = this;
   var text = o.text();
   return MO.Lang.String.equals(o._recordText, text);
}
MO.MUiEditValue_isValueChanged = function MUiEditValue_isValueChanged(){
   var o = this;
   var value = o.get();
   return MO.Lang.String.equals(o._recordValue, value);
}
MO.MUiEditValue_formator = function MUiEditValue_formator(){
   return this;
}
MO.MUiEditValue_get = function MUiEditValue_get(){
   throw new MO.TError('Unsupport method.');
}
MO.MUiEditValue_set = function MUiEditValue_set(value){
   throw new MO.TError('Unsupport method.');
}
MO.MUiEditValue_text = function MUiEditValue_text(){
   return this.get();
}
MO.MUiEditValue_clearValue = function MUiEditValue_clearValue(){
   var o = this;
   o._dataValue = MO.Lang.String.EMPTY;
   o.set(MO.Lang.String.EMPTY);
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
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeResetValue = function MUiEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
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
   if(!MO.Lang.String.isEmpty(dn)){
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
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_oeRecordValue = function MUiEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}
MO.MUiEditValue_commitValue = function MUiEditValue_commitValue(){
   this.__commitValue = MO.Lang.String.nvl(this.reget());
}
MO.MUiEditValue_reget = function MUiEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}
MO.MUiEditValue_setInfoPack = function MUiEditValue_setInfoPack(v){
   var o = this;
   var f = o._info;
   if(!f){
      f = o._info = new MO.TControlInfo();
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
MO.MUiPropertyCheck = function MUiPropertyCheck(o){
   o = MO.Class.inherits(this, o);
   o._valueTrue  = MO.Class.register(o, new MO.APtyString('_valueTrue'), MO.EBoolean.True);
   o._valueFalse = MO.Class.register(o, new MO.APtyString('_valueFalse'), MO.EBoolean.False);
   return o;
}
MO.MUiPropertyEdit = function MUiPropertyEdit(o){
   o = MO.Class.inherits(this, o, MO.MDuiEditValidator, MO.MDuiEditReference, MO.MDuiEditZoom);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MUiPropertyEdit_oeValid;
   return o;
}
MO.MUiPropertyEdit_oeValid = function MUiPropertyEdit_oeValid(e){
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
MO.MUiPropertyNumber = function MUiPropertyNumber(o){
   o = MO.Class.inherits(this, o);
   o._valueMin       = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax       = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._valuePrecision = MO.Class.register(o, new MO.APtyInteger('_valuePrecision'), 3);
   return o;
}
MO.MUiPropertySelect = function MUiPropertySelect(o){
   o = MO.Class.inherits(this, o, MO.MDuiEditValidator, MO.MDuiEditReference, MO.MDuiEditZoom);
   o._editCaseCd     = MO.Class.register(o, new MO.APtyString('_editCaseCd'));
   o._editPattern    = MO.Class.register(o, new MO.APtyString('_editPattern'));
   o._editLength     = MO.Class.register(o, new MO.APtyInteger('_editLength'));
   o._editComplete   = MO.Class.register(o, new MO.APtyBoolean('_editComplete'));
   o._validLengthMin = MO.Class.register(o, new MO.APtyInteger('_validLengthMin'));
   o._validLengthMax = MO.Class.register(o, new MO.APtyInteger('_validLengthMax'));
   o.oeValid         = MO.MUiPropertySelect_oeValid;
   return o;
}
MO.MUiPropertySelect_oeValid = function MUiPropertySelect_oeValid(e){
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
   var boldIndex = source.toLowerCase().indexOf('bold');
   if (boldIndex != -1) {
      o.bold = true;
      source = source.replace(source.substring(boldIndex, boldIndex + 4), '');
   }
   var sharpIndex = source.indexOf('#');
   if (sharpIndex != -1) {
      o.color = source.substring(sharpIndex, sharpIndex + 7);
      source = source.replace(o.color, '');
   }
   var sizeIndex = source.toLowerCase().indexOf('px');
   if (sizeIndex != -1) {
      var sizeString = source.substring(sizeIndex - 2, sizeIndex + 2);
      o.size = parseInt(sizeString);
      source = source.replace(sizeString, '');
   }
   o.font = MO.RString.trim(source);
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
