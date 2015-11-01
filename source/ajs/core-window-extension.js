MO.EConstant = new function EConstant(){
   var o = this;
   o.DeviceType = 'device.type';
   return o;
}
MO.STouchEvent = function STouchEvent(){
   var o = this;
   o.dispose = MO.STouchEvent_dispose;
   return o;
}
MO.STouchEvent_dispose = function STouchEvent_dispose(){
   var o = this;
}
MO.TDumpItem = function TDumpItem(){
   var o = this;
   o.hParent      = null;
   o.hPanel       = null;
   o.hDocument    = null;
   o.hTable       = null;
   o.hText        = null;
   o.hRow         = null;
   o.link         = null;
   o.level        = 0;
   o.caption      = null;
   o.children     = new Array();
   o.items        = new Array();
   o.loaded       = false;
   o.innerDisplay = false;
   o.display      = false;
   o.create       = MO.TDumpItem_create;
   o.push         = MO.TDumpItem_push;
   o.innerShow    = MO.TDumpItem_innerShow;
   o.show         = MO.TDumpItem_show;
   return o;
}
MO.TDumpItem_create = function TDumpItem_create(){
   var o = this;
   var r = o.children[o.children.length] = new MO.TDumpItem();
   return r;
}
MO.TDumpItem_push = function TDumpItem_push(v){
   var o = this;
   o.items[o.items.length] = v;
}
MO.TDumpItem_innerShow = function TDumpItem_innerShow(v){
   var o = this;
   var c = o.items.length;
   for(var n = 0; n < c; n++){
      var tr = o.items[n];
      MO.RHtml.visibleSet(tr, v);
   }
   var c = o.children.length;
   for(var n = 0; n < c; n++){
      var d = o.children[n];
      MO.RHtml.visibleSet(d.hRow, v);
      if(v){
         d.show(d.innerDisplay);
      }else{
         d.innerDisplay = d.display;
         d.show(false);
      }
   }
}
MO.TDumpItem_show = function TDumpItem_show(v){
   var o = this;
   o.display = v;
   var label = MO.Lang.String.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
   o.hText.innerHTML = MO.RHtml.toHtml(label);
   o.innerShow(v);
}
MO.FImage = function FImage(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerLoad);
   o._optionAlpha   = MO.Class.register(o, new MO.AGetter('_optionAlpha'), true);
   o._ready         = false;
   o._size          = MO.Class.register(o, new MO.AGetter('_size'));
   o._url           = MO.Class.register(o, new MO.AGetter('_url'));
   o._hImage        = null;
   o.ohLoad         = MO.FImage_ohLoad;
   o.ohError        = MO.FImage_ohError;
   o.construct      = MO.FImage_construct;
   o.image          = MO.FImage_image;
   o.testReady      = MO.FImage_testReady;
   o.loadUrl        = MO.FImage_loadUrl;
   o.dispose        = MO.FImage_dispose;
   return o;
}
MO.FImage_ohLoad = function FImage_ohLoad(){
   var o = this.__linker;
   var hImage = o._hImage;
   o._size.set(hImage.naturalWidth, hImage.naturalHeight);
   o._ready = true;
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}
MO.FImage_ohError = function FImage_ohError(p){
   var o = this.__linker;
   var url = o._url;
   MO.Logger.error(o, 'Load image failure. (url={1})', url);
}
MO.FImage_construct = function FImage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FImage_image = function FImage_image(){
   return this._hImage;
}
MO.FImage_testReady = function FImage_testReady(){
   return this._ready;
}
MO.FImage_loadUrl = function FImage_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parseUrl(uri);
   var hImage = o._hImage;
   if(!hImage){
      hImage = o._hImage = new Image();
      hImage.__linker = o;
      hImage.onload = o.ohLoad;
      hImage.onerror = o.ohError;
   }
   o._url = url;
   hImage.src = url;
}
MO.FImage_dispose = function FImage_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._hImage = MO.Window.Html.free(o._hImage);
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FTouchTracker = function FTouchTracker(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerTouchZoom);
   o._touchsLength   = null;
   o._touchs         = null;
   o._touchPool      = null;
   o._touchZoomEvent = null;
   o.construct       = MO.FTouchTracker_construct;
   o.calculateLength = MO.FTouchTracker_calculateLength;
   o.eventStart      = MO.FTouchTracker_eventStart;
   o.eventMove       = MO.FTouchTracker_eventMove;
   o.eventStop       = MO.FTouchTracker_eventStop;
   o.dispose         = MO.FTouchTracker_dispose;
   return o;
}
MO.FTouchTracker_construct = function FTouchTracker_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._touchs = new MO.TObjects();
   o._touchPool = MO.Class.create(MO.FObjectPool);
   o._touchZoomEvent = new MO.SEvent(o);
}
MO.FTouchTracker_calculateLength = function FTouchTracker_calculateLength(hEvent){
   var o = this;
   var total = 0;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   if(count > 0){
      for(var i = 0; i < count; i++){
         var hTouche1 = hTouches[i];
         var hTouche2 = (i == count - 1) ? hTouches[0] : hTouches[i + 1];
         var cx = hTouche1.clientX - hTouche2.clientX;
         var cy = hTouche1.clientY - hTouche2.clientY;
         var length = Math.sqrt(cx * cx + cy * cy);
         total += length;
      }
   }
   return total;
}
MO.FTouchTracker_eventStart = function FTouchTracker_eventStart(hEvent){
   var o = this;
   var touchs = o._touchs;
   touchs.clear();
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = new STouchEvent();
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
      touchs.push(touch);
   }
   o._touchsLength = o.calculateLength(hEvent);
}
MO.FTouchTracker_eventMove = function FTouchTracker_eventMove(hEvent){
   var o = this;
   var touchs = o._touchs;
   var hTouches = hEvent.touches;
   var count = hTouches.length;
   for(var i = 0; i < count; i++){
      var hTouche = hTouches[i];
      var touch = touchs.at(i);
      touch.clientX = hTouche.clientX;
      touch.clientY = hTouche.clientY;
   }
   var touchsLength = o.calculateLength(hEvent);
   if(o._touchsLength != touchsLength){
      var event = o._touchZoomEvent;
      event.touchsLength = touchsLength;
      event.delta = touchsLength - o._touchsLength;
      o.processTouchZoomListener(event);
      o._touchsLength = touchsLength;
   }
}
MO.FTouchTracker_eventStop = function FTouchTracker_eventStop(hEvent){
   var o = this;
}
MO.FTouchTracker_dispose = function FTouchTracker_dispose(){
   var o = this;
   o._touchs = MO.Lang.Object.dispose(o._touchs);
   o._touchZoomEvent = MO.Lang.Object.dispose(o._touchZoomEvent);
   o.__base.MListenerTouchZoom.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.RBuilder = function RBuilder(){
   return this;
}
MO.RBuilder.prototype.create = function RBuilder_create(h, t, s){
   var o = this;
   var d = null;
   if(h.ownerDocument){
      d = h.ownerDocument;
   }else if(h.hDocument){
      d = h.hDocument;
   }else{
      d = h;
   }
   var h = d.createElement(t);
   if(s){
      h.className = s;
   }
   return h;
}
MO.RBuilder.prototype.createIcon = function RBuilder_createIcon(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', MO.Lang.String.nvl(style, 'Tag_Icon'));
   hImage.align = 'absmiddle';
   if(uri){
      hImage.src = MO.Window.Resource.iconPath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
}
MO.RBuilder.prototype.createImage = function RBuilder_createImage(hDocument, style, uri, width, height){
   var hImage = this.create(hDocument, 'IMG', style);
   if(uri){
      hImage.src = MO.Window.Resource.imagePath(uri);
   }
   if(width){
      hImage.style.width = width + 'px';
   }
   if(height){
      hImage.style.height = height + 'px';
   }
   return hImage;
}
MO.RBuilder.prototype.createText = function RBuilder_createText(d, s, v){
   var r = this.create(d, 'SPAN', s);
   if(v){
      r.innerHTML = v;
   }
   return r;
}
MO.RBuilder.prototype.createButton = function RBuilder_createButton(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'button';
   return r;
}
MO.RBuilder.prototype.createCheck = function RBuilder_createCheck(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'checkbox';
   return r;
}
MO.RBuilder.prototype.createRadio = function RBuilder_createRadio(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'radio';
   return r;
}
MO.RBuilder.prototype.createEdit = function RBuilder_createEdit(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'text';
   return r;
}
MO.RBuilder.prototype.createFile = function RBuilder_createFile(d, s){
   var r = this.create(d, "INPUT", s);
   r.type = 'file';
   return r;
}
MO.RBuilder.prototype.createSpan = function RBuilder_createSpan(d, s){
   return this.create(d, 'SPAN', s);
}
MO.RBuilder.prototype.createDiv = function RBuilder_createDiv(d, s){
   return this.create(d, 'DIV', s);
}
MO.RBuilder.prototype.createTable = function RBuilder_createTable(d, s, b, cs, cp){
   var h = this.create(d, 'TABLE', s);
   if(b){
      h.border = MO.Lang.Integer.nvl(b);
   }
   h.cellSpacing = MO.Lang.Integer.nvl(cs);
   h.cellPadding = MO.Lang.Integer.nvl(cp);
   return h;
}
MO.RBuilder.prototype.createTableRow = function RBuilder_createTableRow(d, s){
   var h = this.create(d, 'TR', s);
   return h;
}
MO.RBuilder.prototype.createTableCell = function RBuilder_createTableCell(d, s){
   var h = this.create(d, 'TD', s);
   return h;
}
MO.RBuilder.prototype.createFragment = function RBuilder_createFragment(document){
   var hDocument = null;
   if(document.ownerDocument){
      hDocument = document.ownerDocument;
   }else if(document.hDocument){
      hDocument = document.hDocument;
   }else{
      hDocument = document;
   }
   var hElement = hDocument.createDocumentFragment();
   hElement.__fragment = true;
   return hElement;
}
MO.RBuilder.prototype.append = function RBuilder_append(p, t, s){
   var r = this.create(p.ownerDocument, t, s);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
MO.RBuilder.prototype.appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
   var r = this.createIcon(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendImage = function RBuilder_appendImage(p, s, u, w, h){
   var r = this.createImage(p.ownerDocument, s, u, w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendEmpty = function RBuilder_appendEmpty(p, w, h){
   var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendText = function RBuilder_appendText(p, s, v){
   var r = this.createText(p.ownerDocument, s, v);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendButton = function RBuilder_appendButton(p, s){
   var r = this.createButton(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendCheck = function RBuilder_appendCheck(p, s){
   var r = this.createCheck(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendRadio = function RBuilder_appendRadio(p, s){
   var r = this.createRadio(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendEdit = function RBuilder_appendEdit(p, s){
   var r = this.createEdit(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendFile = function RBuilder_appendFile(p, s){
   var r = this.createFile(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendSpan = function RBuilder_appendSpan(p, s){
   var r = this.createSpan(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendDiv = function RBuilder_appendDiv(p, s){
   var r = this.createDiv(p.ownerDocument, s);
   p.appendChild(r);
   return r;
}
MO.RBuilder.prototype.appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
   var r = this.createTable(p.ownerDocument, s, b, cs, cp);
   if(p){
      p.appendChild(r);
   }else{
      this.hDocument.body.appendChild(r);
   }
   return r;
}
MO.RBuilder.prototype.appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
   var r = null;
   if(i == null){
      if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
         r = p.insertRow();
      }else{
         r = p.insertRow(-1);
      }
   }else{
      r = p.insertRow(i);
   }
   if(s){
      r.className = s;
   }
   if(h){
      r.height = h;
   }
   return r;
}
MO.RBuilder.prototype.appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
   var o = this;
   var hr = o.appendTableRow(p, null, null, w);
   var hc = o.appendTableCell(hr, s, null, h);
   return hc;
}
MO.RBuilder.prototype.appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
   var o = this;
   var r = null;
   if(i == null){
      r = o.create(p, 'TD', s);
      p.appendChild(r);
   }else{
      r = p.insertCell(i);
   }
   if(s){
      r.className = s;
   }
   if(w){
      r.width = w;
   }
   return r;
}
MO.RBuilder = new MO.RBuilder();
MO.Window.Builder = MO.RBuilder;
MO.RContext = function RContext(){
   var o = this;
   o._location   = null;
   o._contexts   = new Object();
   o.contextPath = null;
   o.contextTag  = null;
   o.themeId     = null;
   o.languageId  = null;
   return o;
}
MO.RContext.prototype.location = function RContext_location(s){
   var o = this;
   var r = o._location;
   if(r == null){
      var l = window.location;
      var hr = l.href;
      var pn = l.pathname;
      r = hr.substring(0, hr.indexOf(pn))
      if(o.contextPath){
         r += o.contextPath;
      }
      o._location = r;
   }
   if(s){
      r += s;
   }
   return r;
}
MO.RContext.prototype.context = function RContext_context(s){
   var o = this;
   if(s != null){
      if(MO.Lang.String.endsWith(s, '.wv')){
         return o.contextPath + '/' + s;
      }else if(MO.Lang.String.startsWith(s, '#')){
         return o.contextPath + o.contextTag + s.substr(1);
      }
      return o.contextPath + s;
   }
   return o.contextPath;
}
MO.RContext.prototype.initialize = function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new MO.TContext(n, nc, v);
      }
   }
}
MO.RContext.prototype.get = function RContext_get(code, p1, p2, p3, p4, p5){
   var o = this;
   var context = o._contexts[code];
   if(!context){
      return MO.Logger.warn(o, 'Can not find context (code={1})', code);
   }
   return MO.Lang.String.format(context.text, p1, p2, p3, p4, p5)
}
MO.RContext.prototype.find = function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return MO.Logger.warn(o, 'Can not find context (id={1})', id);
   }
   return r.text;
}
MO.RContext = new MO.RContext();
MO.Context = MO.RContext;
MO.RDump = function RDump(){
   var o = this;
   o.LINE_SINGLE = '------------------------------';
   o.LINE_DOUBLE = '==============================';
   o.LINE_DOT    = '..............................';
   o.LINE_STAR   = '******************************';
   return o;
}
MO.RDump.prototype.onclick = function RDump_onclick(){
   var o = this;
   var d = o.link;
   if(o.link){
      if(d.loaded){
         d.show(!d.display);
      }else{
         MO.RDump.dumpInner(o.link);
         d.loaded = true;
         d.show(true);
      }
   }
}
MO.RDump.prototype.nameInfo = function RDump_nameInfo(v){
   var t = MO.Class.typeOf(v);
   switch(t){
      case 'Unknown':
         return '@unknown';
      case 'Function':
         return MO.Method.name(v) + '@Function';
      case 'Array':
         return '@<Array>';
   }
   return v;
}
MO.RDump.prototype.typeInfo = function RDump_typeInfo(v, t){
   if(v == null){
      return 'null';
   }
   switch(t){
      case 'Unknown':
         return 'unknown';
      case 'Undefined':
         return 'undefined';
      case 'Boolean':
      case 'Number':
         return v.toString();
      case 'String':
         return v.length + ':\'' + MO.Lang.String.toLine(v) + '\'';
      case 'Function':
         if(v.__virtual){
            return 'virtual';
         }
         return MO.Method.name(v, true);
      case 'Array':
         return '@<Array@' + MO.Class.code(v) + '> length=' + v.length;
      case 'Html':
         return '@<' + v.tagName + '>';
      default:
         if(v.constructor == MO.TClass){
            return '@<' + v.name + '@' + MO.Class.code(v) + '>';
         }
         if(v.constructor == Function){
            return "@" + v.toString();
         }
         try{
            for(var name in v){
               return '@<Object@' + MO.Class.code(v) + '>';
            }
         }catch(e){}
         return '<Object@' + MO.Class.code(v) + '>';
   }
}
MO.RDump.prototype.dumpInner = function RDump_dumpInner(di){
   var hTable  = di.hTable;
   var hParent = di.hParent;
   var hInsRow = di.hRow;
   var level   = di.level;
   var obj     = di.link;
   var type    = MO.Class.typeOf(obj, true);
   var vcls    = obj.__class;
   var names = new Array();
   for(var name in obj){
      names[names.length] = name;
   }
   if(MO.Lang.String.endsWith(type, 'Array')){
      MO.Lang.Array.reverse(names, 0, names.length - 1);
   }else{
      MO.Lang.Array.sort(names, true);
   }
   var items = new Array();
   var c = names.length;
   if(c > 2000){
      c = 2000;
   }
   for(var n = 0; n < c; n++){
      var name = names[n];
      var value = '{error}';
      try{
         value = obj[name];
      }catch(e){}
      var stype = MO.Class.safeTypeOf(value, true);
      var type = MO.Class.safeTypeOf(value, true);
      var info = null;
      var infoFormat = true;
      if(vcls){
         var ann = vcls.attributeFind(name);
         if(ann){
            type = 'Annotation<' + MO.Method.name(ann.constructor) + '>'
            if(value && value.constructor == Function){
               info = "<FONT color='green'>" + MO.Method.name(value) + "</FONT>";
            }else{
               info = value + "<FONT color='green'> - (" + MO.RHtml.toHtml(ann.toString()) + ")</FONT>";
            }
            infoFormat = false;
         }
      }
      if(info == null){
         info = this.typeInfo(value, type);
      }
      var rdi = null;
      var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
      var hRow = MO.RBuilder.appendTableRow(hTable, null, index);
      hRow.bgColor = '#FFFFFF';
      if(MO.Lang.String.startsWith(info, '@')){
         hRow.style.cursor = 'pointer';
         hRow.onclick = this.onclick;
         hRow.bgColor = '#FFF0E0';
         rdi = hRow.link = di.create();
         rdi.link = value;
         rdi.level = level;
         rdi.caption = name;
         rdi.hTable = hTable;
         rdi.level = level + 1;
         rdi.hRow = hRow;
      }else{
         di.push(hRow);
      }
      if((type == 'Function') && (info == 'virtual')){
         hRow.bgColor = '#E0F0FF';
      }
      var hCell = MO.RBuilder.appendTableCell(hRow);
      var icon = MO.Lang.String.startsWith(info, '@') ? ' +' : '  ';
      var label = MO.Lang.String.repeat('   ', level) + icon + ' ' + name
      hCell.innerHTML = MO.RHtml.toHtml(label);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      hCell.width = '240px'
      if(rdi){
         rdi.hText = hCell;
      }
      var hCell = MO.RBuilder.appendTableCell(hRow);
      hCell.innerHTML = MO.RHtml.toHtml(type);
      hCell.style.borderBottom = '1px solid #F0F0F0';
      if(type == 'Function'){
         hCell.style.color = '#3333FF';
      }else{
         hCell.style.color = '#FF3333';
      }
      hCell.width = '200px'
      var hCell = MO.RBuilder.appendTableCell(hRow);
      if(MO.Lang.String.startsWith(info, '@')){
         info = info.substr(1);
      }
      if(infoFormat){
         hCell.innerHTML = MO.RHtml.toHtml(info);
      }else{
         hCell.innerHTML = info;
      }
      hCell.style.borderBottom = '1px solid #F0F0F0';
   }
   hTable.width = '100%'
}
MO.RDump.prototype.dump = function RDump_dump(value, hPanel){
   if(!hPanel){
      hPanel = MO.RBuilder.append(null, 'DIV')
   }
   var s = new MO.TString();
   s.append('<', MO.Class.safeTypeOf(value));
   if(value && value.tagName){
      s.append(' - ', value.tagName);
   }
   s.appendLine('@' + MO.Class.code(value) + '>');
   var hPanel = MO.RBuilder.append(hPanel, 'DIV');
   hPanel.style.border = '1px solid #BBBBBB';
   hPanel.style.backgroundColor = '#E0E0EB';
   var hTitleTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   var hRow = MO.RBuilder.appendTableRow(hTitleTable);
   var hCell = MO.RBuilder.appendTableCell(hRow);
   hTitleTable.width = '100%'
   hCell.style.padding = 2;
   hCell.style.borderBottom = '1px solid gray';
   hCell.style.backgroundColor = '#E0E0EB';
   MO.RHtml.textSet(hCell, s.toString());
   var hTable = MO.RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
   hTable.style.width = '100%';
   var di = new MO.TDumpItem();
   di.hTable = hTable;
   di.hRow = null;
   di.hParent = hPanel;
   di.link = value;
   di.level = 0;
   this.dumpInner(di);
}
MO.RDump.prototype.appendLevel = function RDump_appendLevel(r, l){
   for(var n = 0; n < l; n++){
      r.append('   ');
   }
}
MO.RDump.prototype.stack = function RDump_stack(){
   var o = RDump_stack.caller;
   var s = new MO.TString();
   while(o){
      s.append(MO.Method.name(o));
      o = o.caller;
      if(o){
         s.appendLine();
      }
   }
}
MO.RDump = new MO.RDump();
MO.RHtml = function RHtml(){
   var o = this;
   o._nextUid        = 1;
   o._links          = new Object();
   o._clientPosition = null;
   return o;
}
MO.RHtml.prototype.uid = function RHtml_uid(value){
   var uuid = value.__puuid;
   if(uuid == null){
      uuid = value.__puuid = this._nextUid++;
   }
   return uuid;
}
MO.RHtml.prototype.displayGet = function RHtml_displayGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'inline');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.displaySet = function RHtml_displaySet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? 'inline' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(hTag){
   var result = null;
   var text = hTag.style.display;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      result = (text == 'block');
   }else{
      result = (text != 'none');
   }
   return result;
}
MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(hTag, visible){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      text = visible ? '' : 'none';
   }else{
      text = visible ? null : 'none';
   }
   hTag.style.display = text;
}
MO.RHtml.prototype.textGet = function RHtml_textGet(hTag, defaultText){
   var text = null;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      text = hTag.textContent;
   }else{
      text = hTag.innerText;
   }
   return text;
}
MO.RHtml.prototype.textSet = function RHtml_textSet(hTag, text){
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      hTag.textContent = text;
   }else{
      hTag.innerText = text;
   }
}
MO.RHtml.prototype.checkGet = function RHtml_checkGet(hTag){
   return MO.Lang.Bool.toString(hTag.checked);
}
MO.RHtml.prototype.checkSet = function RHtml_checkSet(hTag, value){
   hTag.checked = MO.Lang.Bool.isTrue(value);
}
MO.RHtml.prototype.radioGet = function RHtml_radioGet(hs){
   if(hs){
      var count = hs.length;
      for(var n = 0; n < count; n++){
         var hItem = hs[n];
         if(hItem.checked){
            return hItem.value;
         }
      }
   }
   return null;
}
MO.RHtml.prototype.radioSet = function RHtml_radioSet(hTag, value){
   if(hTag){
      var count = hTag.length;
      for(var n = 0; n < count; n++){
         var hItem = hTag[n];
         if(hItem.value == value){
            hItem.checked = true;
            break;
         }
      }
   }
}
MO.RHtml.prototype.cursorSet = function RHtml_cursorSet(hTag, value){
   if(hTag){
      hTag.style.cursor = value;
   }
}
MO.RHtml.prototype.linkGet = function RHtml_linkGet(hTag, name){
   var o = this;
   var uid = o.uid(hTag);
   var item = o._links[uid];
   return item ? item.get(name) : null;
}
MO.RHtml.prototype.linkSet = function RHtml_linkSet(hTag, n, v){
   var o = this;
   var links = o._links;
   var uid = o.uid(hTag);
   var item = links[uid];
   if(!item){
      item = links[uid] = new MO.THtmlItem();
      item._link = hTag;
   }
   item.set(n, v);
}
MO.RHtml.prototype.clientPosition = function RHtml_clientPosition(hTag, hTop){
   var o = this;
   var position = o._clientPosition;
   if(!position){
      position = o._clientPosition = new MO.SPoint2();
   }
   position.set(0, 0);
   while(hTag != hTop){
      position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
      position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
      hTag = hTag.offsetParent;
   }
   return position;
}
MO.RHtml.prototype.clientX = function RHtml_clientX(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetLeft - p.scrollLeft;
      p = p.offsetParent;
   }
   return r;
}
MO.RHtml.prototype.clientY = function RHtml_clientY(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetTop - p.scrollTop;
      p = p.offsetParent;
   }
   return r;
}
MO.RHtml.prototype.setSize = function RHtml_setSize(hTag, size){
   if(size){
      if(size.width){
         hTag.style.width = size.width + 'px';
      }
      if(size.height){
         hTag.style.height = size.height + 'px';
      }
   }
}
MO.RHtml.prototype.toText = function RHtml_toText(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/&lt;/, '<');
      p = p.replace(/&gt;/g, '>');
      p = p.replace(/&nbsp;/g, ' ');
      p = p.replace(/<BR>/g, '\n');
   }
   return p;
}
MO.RHtml.prototype.toHtml = function RHtml_toHtml(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/</g, '&lt;');
      p = p.replace(/>/g, '&gt;');
      p = p.replace(/ /g, '&nbsp;');
      p = p.replace(/\n/g, '<BR>');
      p = p.replace(/\\n/g, '<BR>');
      p = p.replace(/\r/g, '');
      p = p.replace(/\\r/g, '');
   }
   return p;
}
MO.RHtml.prototype.eventSource = function RHtml_eventSource(p){
   return p.srcElement ? p.srcElement : p.target;
}
MO.RHtml.prototype.get = function RHtml_get(name){
   return document.getElementById(name);
}
MO.RHtml.prototype.parent = function RHtml_parent(tag, typeName){
   if(tag && t){
      typeName = typeName.toLowerCase();
      while(tag){
         if(tag.tagName.toLowerCase() == typeName){
            return tag;
         }
         tag = tag.parentElement;
      }
   }
   return null;
}
MO.RHtml.prototype.searchLinker = function RHtml_searchLinker(hTag, clazz){
   while(hTag){
      var linker = hTag.__linker;
      if(linker){
         if(MO.Class.isClass(linker, clazz)){
            return linker;
         }
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.searchObject = function RHtml_searchObject(hTag, name){
   while(hTag){
      var flag = hTag[name];
      if(flag){
         return flag;
      }
      hTag = hTag.parentElement;
   }
   return null;
}
MO.RHtml.prototype.tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
   if(ph.tagName != 'TABLE'){
      throw new MO.TError('Html table is invalid.');
   }
   if(ps == pt){
      return false;
   }
   if(ph.moveRow){
      ph.moveRow(ps, pt);
   }else{
      var hb = ph.getElementsByTagName('tbody')[0];
      var sr = hb.rows[ps];
      var tr = hb.rows[pt];
      if((sr == null) || (tr == null)){
         return false;
      }
      var nr = null;
      if(ps <= pt){
         nr = tr;
         while(nr = nr.nextSibling){
            if(nr.tagName == 'TR'){
               break;
            }
         }
      }
      if(nr == null){
         hb.insertBefore(sr, tr);
      }else{
         if(nr == null){
            hb.appendChild(sr);
         }else{
            hb.insertBefore(sr, nr);
         }
      }
   }
   return true;
}
MO.RHtml.prototype.clear = function RHtml_clear(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            hTag.removeChild(hChild);
         }
      }
   }
}
MO.RHtml.prototype.clearAll = function RHtml_clearAll(hTag){
   var o = this;
   if(hTag){
      var hChildren = hTag.children;
      if(hChildren){
         var count = hChildren.length;
         for(var i = count - 1; i >= 0; i--){
            var hChild = hChildren[i];
            if(hChild.children){
               o.clear(hChild);
            }
            hTag.removeChild(hChild);
         }
      }
   }
}
MO.RHtml.prototype.free = function RHtml_free(p){
   return null;
}
MO.RHtml = new MO.RHtml();
MO.Window.Html = MO.RHtml;
MO.RKeyboard = function RKeyboard(){
   var o = this;
   o._status = new Array();
   return o;
}
MO.RKeyboard.prototype.onKeyDown = function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.onKeyUp = function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Normal;
}
MO.RKeyboard.prototype.construct = function RKeyboard_construct(){
   var o = this;
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = MO.EKeyStatus.Normal;
   }
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   MO.RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}
MO.RKeyboard.prototype.isControlKey = function RKeyboard_isControlKey(p){
   var s = MO.EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}
MO.RKeyboard.prototype.isIntegerKey = function RKeyboard_isIntegerKey(c){
   return MO.EKeyCode.integerCodes[c];
}
MO.RKeyboard.prototype.isFloatKey = function RKeyboard_isFloatKey(c){
   return MO.EKeyCode.floatCodes[c];
}
MO.RKeyboard.prototype.isNumKey = function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}
MO.RKeyboard.prototype.isPress = function RKeyboard_isPress(keyCode){
   var o = this;
   var status = o._status[keyCode];
   return status == MO.EKeyStatus.Press;
}
MO.RKeyboard.prototype.fixCase = function RKeyboard_fixCase(e, c){
   if(e && c){
      var k = e.keyCode;
      if(ECase.Upper == c){
         k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
      }else if(ECase.Lower == c){
         k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
      }
      e.keyCode = k;
   }
}
MO.RKeyboard.prototype.fixPattern = function RKeyboard_fixPattern(e, p){
   if(p){
      var k = e.keyCode;
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.isPattern(String.fromCharCode(k), p)){
            e.keyCode = 0;
            return false;
         }
      }
   }
   return true;
}
MO.RKeyboard.prototype.fixChars = function RKeyboard_fixChars(e, p){
   if(p){
      var k = e.keyCode;
      if(this.isNumKey(k)){
    	  k = e.keyCode = e.keyCode - 48;
      }
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.inChars(String.fromCharCode(k), p)){
            e.keyCode = 0;
            e.returnValue = false;
            return false;
         }
      }
   }
   return true;
}
MO.Window.Keyboard = new MO.RKeyboard();
MO.RResource = function RResource(){
   var o = this;
   o.uriIcon  = '/ars/icon/';
   o.uriImage = '/ars/img/';
   return o;
}
MO.RResource.prototype.iconPath = function RResource_iconPath(code, type){
   var o = this;
   var path = null;
   if(code.indexOf('|') != -1){
      var items = code.split('|');
      path = items[0];
      type = items[1];
   }else{
      path = code;
   }
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.Window.Browser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.iconUrlPath = function RResource_iconUrlPath(path, type){
   var o = this;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   return MO.RBrowser.contentPath('/ars/icon/' + path);
}
MO.RResource.prototype.imagePath = function RResource_imagePath(path, type){
   var o = this;
}
MO.RResource = new MO.RResource();
MO.Window.Resource = MO.RResource;
MO.RValue = function RValue(){
   var o = this;
   o.float1    = null;
   o.float2    = null;
   o.float3    = null;
   o.float4    = null;
   o.float9    = null;
   o.float12   = null;
   o.float16   = null;
   o.double1   = null;
   o.double2   = null;
   o.double3   = null;
   o.double4   = null;
   o.double16  = null;
   o.double16  = null;
   o.double64  = null;
   o.construct();
   return o;
}
MO.RValue.prototype.construct = function RValue_construct(){
   var o = this;
   if(MO.RBrowser.supportHtml5()){
      o.float1 = new Float32Array(1);
      o.float2 = new Float32Array(2);
      o.float3 = new Float32Array(3);
      o.float4 = new Float32Array(4);
      o.float9 = new Float32Array(9);
      o.float12 = new Float32Array(12);
      o.float16 = new Float32Array(16);
      o.double1 = new Float64Array(1);
      o.double2 = new Float64Array(2);
      o.double3 = new Float64Array(3);
      o.double4 = new Float64Array(4);
      o.double9 = new Float64Array(9);
      o.double12 = new Float64Array(12);
      o.double16 = new Float64Array(16);
   }
}
MO.RValue = new MO.RValue();
