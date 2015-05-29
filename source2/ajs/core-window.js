MO.EBrowser = new function EBrowser(){
   var o = this;
   o.Unknown = 0;
   o.Explorer = 1;
   o.FireFox = 2;
   o.Chrome = 3;
   o.Safari = 4;
   return o;
}
MO.EDevice = new function EDevice(){
   var o = this;
   o.Unknown = 0;
   o.Pc = 1;
   o.Mobile = 2;
   return o;
}
MO.ESoftware = new function ESoftware(){
   var o = this;
   o.Unknown = 0;
   o.Window = 1;
   o.Linux = 2;
   o.Android = 3;
   o.Apple = 4;
   return o;
}
MO.SBrowserCapability = function SBrowserCapability(){
   var o = this;
   o.optionProcess = false;
   o.optionStorage = false;
   o.blobCreate    = false;
   return o;
}
with(MO){
   MO.STouchEvent = function STouchEvent(){
      var o = this;
      o.dispose = STouchEvent_dispose;
      return o;
   }
   MO.STouchEvent_dispose = function STouchEvent_dispose(){
      var o = this;
   }
}
with(MO){
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
      o.create       = TDumpItem_create;
      o.push         = TDumpItem_push;
      o.innerShow    = TDumpItem_innerShow;
      o.show         = TDumpItem_show;
      return o;
   }
   MO.TDumpItem_create = function TDumpItem_create(){
      var o = this;
      var r = o.children[o.children.length] = new TDumpItem();
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
         RHtml.visibleSet(tr, v);
      }
      var c = o.children.length;
      for(var n = 0; n < c; n++){
         var d = o.children[n];
         RHtml.visibleSet(d.hRow, v);
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
      var label = RString.repeat('   ', o.level-1) + (v ? ' -' : ' +') + ' ' + o.caption;
      o.hText.innerHTML = RHtml.toHtml(label);
      o.innerShow(v);
   }
}
with(MO){
   MO.RBrowser = function RBrowser(){
      var o = this;
      o._capability    = null;
      o._deviceCd      = MO.EDevice.Unknown;
      o._softwareCd    = MO.ESoftware.Unknown;
      o._typeCd        = MO.EBrowser.Unknown;
      o._supportHtml5  = false;
      o._hostPath      = '';
      o._contentPath   = '';
      o.onLog          = RBrowser_onLog;
      o.construct      = RBrowser_construct;
      o.capability     = RBrowser_capability;
      o.supportHtml5   = RBrowser_supportHtml5;
      o.hostPath       = RBrowser_hostPath;
      o.setHostPath    = RBrowser_setHostPath;
      o.contentPath    = RBrowser_contentPath;
      o.setContentPath = RBrowser_setContentPath;
      o.isBrowser      = RBrowser_isBrowser;
      o.encode         = RBrowser_encode;
      o.decode         = RBrowser_decode;
      o.urlEncode      = RBrowser_urlEncode;
      o.urlDecode      = RBrowser_urlDecode;
      return o;
   }
   MO.RBrowser_onLog = function RBrowser_onLog(s, p){
      console.log(p);
   }
   MO.RBrowser_construct = function RBrowser_construct(){
      var o = this;
      var s = window.navigator.userAgent.toLowerCase();
      if(s.indexOf("android") != -1){
         o._typeCd = EDevice.Mobile;
         o._softwareCd = ESoftware.Android;
      }
      if(s.indexOf("chrome") != -1){
         o._typeCd = EBrowser.Chrome;
      }else if(s.indexOf("firefox") != -1){
         o._typeCd = EBrowser.FireFox;
      }else if((s.indexOf("msie") != -1) || (s.indexOf("windows") != -1)){
         o._typeCd = EBrowser.Explorer;
      }else if((s.indexOf("safari") != -1) || (s.indexOf("applewebkit") != -1)){
         o._typeCd = EBrowser.Safari;
      }else{
         alert('Unknown browser.\n' + s);
         return;
      }
      if(o._typeCd == EBrowser.Chrome){
         RLogger.lsnsOutput.register(o, o.onLog);
      }
      RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
      if(window.applicationCache){
         o._supportHtml5 = true;
      }
      var capability = o._capability = new SBrowserCapability();
      if(window.Worker){
         capability.optionProcess = true;
      }
      if(window.localStorage){
         capability.optionStorage = true;
      }
      try{
         new Blob(["Test"], {'type':'text/plain'});
         capability.blobCreate = true;
      }catch(e){
         RLogger.warn(o, 'Browser blob not support.');
      }
   }
   MO.RBrowser_capability = function RBrowser_capability(){
      return this._capability;
   }
   MO.RBrowser_supportHtml5 = function RBrowser_supportHtml5(){
      return this._supportHtml5;
   }
   MO.RBrowser_hostPath = function RBrowser_hostPath(p){
      var o = this;
      if(p){
         return o._hostPath + p;
      }
      return o._hostPath;
   }
   MO.RBrowser_setHostPath = function RBrowser_setHostPath(p){
      this._hostPath = p;
   }
   MO.RBrowser_contentPath = function RBrowser_contentPath(p){
      var o = this;
      if(p){
         return o._contentPath + p;
      }
      return o._contentPath;
   }
   MO.RBrowser_setContentPath = function RBrowser_setContentPath(p){
      this._contentPath = p;
   }
   MO.RBrowser_isBrowser = function RBrowser_isBrowser(p){
      return this._typeCd == p;
   }
   MO.RBrowser_encode = function RBrowser_encode(value){
      return escape(value);
   }
   MO.RBrowser_decode = function RBrowser_decode(value){
      return unescape(value);
   }
   MO.RBrowser_urlEncode = function RBrowser_urlEncode(url, flag){
      if(flag){
         return encodeURIComponent(url);
      }
      return encodeURI(url);
   }
   MO.RBrowser_urlDecode = function RBrowser_urlDecode(url, flag){
      if(flag){
         return decodeURIComponent(url);
      }
      return decodeURI(url);
   }
   MO.RBrowser = new RBrowser();
}
with(MO){
   MO.RBuilder = function RBuilder(){
      var o = this;
      o.create             = RBuilder_create;
      o.createIcon         = RBuilder_createIcon;
      o.createImage        = RBuilder_createImage;
      o.createText         = RBuilder_createText;
      o.createButton       = RBuilder_createButton;
      o.createCheck        = RBuilder_createCheck;
      o.createRadio        = RBuilder_createRadio;
      o.createEdit         = RBuilder_createEdit;
      o.createFile         = RBuilder_createFile;
      o.createSpan         = RBuilder_createSpan;
      o.createDiv          = RBuilder_createDiv;
      o.createTable        = RBuilder_createTable;
      o.createTableRow     = RBuilder_createTableRow;
      o.createTableCell    = RBuilder_createTableCell;
      o.createFragment     = RBuilder_createFragment;
      o.append             = RBuilder_append;
      o.appendIcon         = RBuilder_appendIcon;
      o.appendImage        = RBuilder_appendImage;
      o.appendEmpty        = RBuilder_appendEmpty;
      o.appendText         = RBuilder_appendText;
      o.appendButton       = RBuilder_appendButton;
      o.appendCheck        = RBuilder_appendCheck;
      o.appendRadio        = RBuilder_appendRadio;
      o.appendEdit         = RBuilder_appendEdit;
      o.appendFile         = RBuilder_appendFile;
      o.appendSpan         = RBuilder_appendSpan;
      o.appendDiv          = RBuilder_appendDiv;
      o.appendTable        = RBuilder_appendTable;
      o.appendTableRow     = RBuilder_appendTableRow;
      o.appendTableRowCell = RBuilder_appendTableRowCell;
      o.appendTableCell    = RBuilder_appendTableCell;
      return o;
   }
   MO.RBuilder_create = function RBuilder_create(h, t, s){
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
   MO.RBuilder_createIcon = function RBuilder_createIcon(d, s, u, w, h){
      var r = this.create(d, 'IMG', RString.nvl(s, 'Tag_Icon'));
      r.align = 'absmiddle';
      if(u){
         r.src = RResource.iconPath(u);
      }
      if(w){
         r.style.width = w + 'px';
      }
      if(h){
         r.style.height = h + 'px';
      }
      return r;
   }
   MO.RBuilder_createImage = function RBuilder_createImage(d, s, u, w, h){
      var r = this.create(d, 'IMG', u);
      if(u){
         r.src = RResource.imagePath(u);
      }
      if(w){
         r.style.width = w;
      }
      if(h){
         r.style.height = h;
      }
      return r;
   }
   MO.RBuilder_createText = function RBuilder_createText(d, s, v){
      var r = this.create(d, 'SPAN', s);
      if(v){
         r.innerHTML = v;
      }
      return r;
   }
   MO.RBuilder_createButton = function RBuilder_createButton(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'button';
      return r;
   }
   MO.RBuilder_createCheck = function RBuilder_createCheck(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'checkbox';
      return r;
   }
   MO.RBuilder_createRadio = function RBuilder_createRadio(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'radio';
      return r;
   }
   MO.RBuilder_createEdit = function RBuilder_createEdit(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'text';
      return r;
   }
   MO.RBuilder_createFile = function RBuilder_createFile(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'file';
      return r;
   }
   MO.RBuilder_createSpan = function RBuilder_createSpan(d, s){
      return this.create(d, 'SPAN', s);
   }
   MO.RBuilder_createDiv = function RBuilder_createDiv(d, s){
      return this.create(d, 'DIV', s);
   }
   MO.RBuilder_createTable = function RBuilder_createTable(d, s, b, cs, cp){
      var h = this.create(d, 'TABLE', s);
      if(b){
         h.border = RInteger.nvl(b);
      }
      h.cellSpacing = RInteger.nvl(cs);
      h.cellPadding = RInteger.nvl(cp);
      return h;
   }
   MO.RBuilder_createTableRow = function RBuilder_createTableRow(d, s){
      var h = this.create(d, 'TR', s);
      return h;
   }
   MO.RBuilder_createTableCell = function RBuilder_createTableCell(d, s){
      var h = this.create(d, 'TD', s);
      return h;
   }
   MO.RBuilder_createFragment = function RBuilder_createFragment(document){
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
   MO.RBuilder_append = function RBuilder_append(p, t, s){
      var r = RBuilder.create(p.ownerDocument, t, s);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder_appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
      var r = this.createIcon(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendImage = function RBuilder_appendImage(p, s, u, w, h){
      var r = this.createImage(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendEmpty = function RBuilder_appendEmpty(p, w, h){
      var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendText = function RBuilder_appendText(p, s, v){
      var r = this.createText(p.ownerDocument, s, v);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendButton = function RBuilder_appendButton(p, s){
      var r = this.createButton(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendCheck = function RBuilder_appendCheck(p, s){
      var r = this.createCheck(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendRadio = function RBuilder_appendRadio(p, s){
      var r = this.createRadio(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendEdit = function RBuilder_appendEdit(p, s){
      var r = this.createEdit(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendFile = function RBuilder_appendFile(p, s){
      var r = this.createFile(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendSpan = function RBuilder_appendSpan(p, s){
      var r = this.createSpan(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendDiv = function RBuilder_appendDiv(p, s){
      var r = this.createDiv(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }
   MO.RBuilder_appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
      var r = this.createTable(p.ownerDocument, s, b, cs, cp);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }
   MO.RBuilder_appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
      var r = null;
      if(i == null){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
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
   MO.RBuilder_appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
      var o = this;
      var hr = o.appendTableRow(p, null, null, w);
      var hc = o.appendTableCell(hr, s, null, h);
      return hc;
   }
   MO.RBuilder_appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
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
   MO.RBuilder = new RBuilder();
}
with(MO){
   MO.RDump = function RDump(){
      var o = this;
      o.LINE_SINGLE = '------------------------------';
      o.LINE_DOUBLE = '==============================';
      o.LINE_DOT    = '..............................';
      o.LINE_STAR   = '******************************';
      o.onclick     = RDump_onclick;
      o.nameInfo    = RDump_nameInfo;
      o.typeInfo    = RDump_typeInfo;
      o.dumpInner   = RDump_dumpInner;
      o.dump        = RDump_dump;
      o.appendLevel = RDump_appendLevel;
      o.stack       = RDump_stack;
      return o;
   }
   MO.RDump_onclick = function RDump_onclick(){
      var o = this;
      var d = o.link;
      if(o.link){
         if(d.loaded){
            d.show(!d.display);
         }else{
            RDump.dumpInner(o.link);
            d.loaded = true;
            d.show(true);
         }
      }
   }
   MO.RDump_nameInfo = function RDump_nameInfo(v){
      var t = RClass.typeOf(v);
      switch(t){
         case 'Unknown':
            return '@unknown';
         case 'Function':
            return RMethod.name(v) + '@Function';
         case 'Array':
            return '@<Array>';
      }
      return v;
   }
   MO.RDump_typeInfo = function RDump_typeInfo(v, t){
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
            return v.length + ':\'' + RString.toLine(v) + '\'';
         case 'Function':
            if(v.__virtual){
               return 'virtual';
            }
            return RMethod.name(v, true);
         case 'Array':
            return '@<Array@' + RClass.code(v) + '> length=' + v.length;
         case 'Html':
            return '@<' + v.tagName + '>';
         default:
            if(v.constructor == TClass){
               return '@<' + v.name + '@' + RClass.code(v) + '>';
            }
            if(v.constructor == Function){
               return "@" + v.toString();
            }
            try{
               for(var name in v){
                  return '@<Object@' + RClass.code(v) + '>';
               }
            }catch(e){}
            return '<Object@' + RClass.code(v) + '>';
      }
   }
   MO.RDump_dumpInner = function RDump_dumpInner(di){
      var hTable  = di.hTable;
      var hParent = di.hParent;
      var hInsRow = di.hRow;
      var level   = di.level;
      var obj     = di.link;
      var type    = RClass.typeOf(obj, true);
      var vcls    = obj.__class;
      var names = new Array();
      for(var name in obj){
         names[names.length] = name;
      }
      if(RString.endsWith(type, 'Array')){
         RArray.reverse(names, 0, names.length - 1);
      }else{
         RArray.sort(names, true);
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
         var stype = RClass.safeTypeOf(value, true);
         var type = RClass.safeTypeOf(value, true);
         var info = null;
         var infoFormat = true;
         if(vcls){
            var ann = vcls.attributeFind(name);
            if(ann){
               type = 'Annotation<' + RMethod.name(ann.constructor) + '>'
               if(value && value.constructor == Function){
                  info = "<FONT color='green'>" + RMethod.name(value) + "</FONT>";
               }else{
                  info = value + "<FONT color='green'> - (" + RHtml.toHtml(ann.toString()) + ")</FONT>";
               }
               infoFormat = false;
            }
         }
         if(info == null){
            info = this.typeInfo(value, type);
         }
         var rdi = null;
         var index = hInsRow ? hInsRow.rowIndex + 1 : 0;
         var hRow = RBuilder.appendTableRow(hTable, null, index);
         hRow.bgColor = '#FFFFFF';
         if(RString.startsWith(info, '@')){
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
         var hCell = RBuilder.appendTableCell(hRow);
         var icon = RString.startsWith(info, '@') ? ' +' : '  ';
         var label = RString.repeat('   ', level) + icon + ' ' + name
         hCell.innerHTML = RHtml.toHtml(label);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         hCell.width = '240px'
         if(rdi){
            rdi.hText = hCell;
         }
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.innerHTML = RHtml.toHtml(type);
         hCell.style.borderBottom = '1px solid #F0F0F0';
         if(type == 'Function'){
            hCell.style.color = '#3333FF';
         }else{
            hCell.style.color = '#FF3333';
         }
         hCell.width = '200px'
         var hCell = RBuilder.appendTableCell(hRow);
         if(RString.startsWith(info, '@')){
            info = info.substr(1);
         }
         if(infoFormat){
            hCell.innerHTML = RHtml.toHtml(info);
         }else{
            hCell.innerHTML = info;
         }
         hCell.style.borderBottom = '1px solid #F0F0F0';
      }
      hTable.width = '100%'
   }
   MO.RDump_dump = function RDump_dump(value, hPanel){
      if(!hPanel){
         hPanel = RBuilder.append(null, 'DIV')
      }
      var s = new TString();
      s.append('<', RClass.safeTypeOf(value));
      if(value && value.tagName){
         s.append(' - ', value.tagName);
      }
      s.appendLine('@' + RClass.code(value) + '>');
      var hPanel = RBuilder.append(hPanel, 'DIV');
      hPanel.style.border = '1px solid #BBBBBB';
      hPanel.style.backgroundColor = '#E0E0EB';
      var hTitleTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      var hRow = RBuilder.appendTableRow(hTitleTable);
      var hCell = RBuilder.appendTableCell(hRow);
      hTitleTable.width = '100%'
      hCell.style.padding = 2;
      hCell.style.borderBottom = '1px solid gray';
      hCell.style.backgroundColor = '#E0E0EB';
      RHtml.textSet(hCell, s.toString());
      var hTable = RBuilder.appendTable(hPanel, null, null, 0, 1, 0);
      hTable.style.width = '100%';
      var di = new TDumpItem();
      di.hTable = hTable;
      di.hRow = null;
      di.hParent = hPanel;
      di.link = value;
      di.level = 0;
      this.dumpInner(di);
   }
   MO.RDump_appendLevel = function RDump_appendLevel(r, l){
      for(var n = 0; n < l; n++){
         r.append('   ');
      }
   }
   MO.RDump_stack = function RDump_stack(){
      var o = RDump_stack.caller;
      var s = new TString();
      while(o){
         s.append(RMethod.name(o));
         o = o.caller;
         if(o){
            s.appendLine();
         }
      }
      RLogger.debug(this, s);
   }
   MO.RDump = new RDump();
}
with(MO){
   MO.RHtml = function RHtml(){
      var o = this;
      o._nextUid        = 1;
      o._links          = new Object();
      o._clientPosition = new MO.SPoint2();
      o.uid             = RHtml_uid;
      o.fullscreen      = RHtml_fullscreen;
      o.displayGet      = RHtml_displayGet;
      o.displaySet      = RHtml_displaySet;
      o.visibleGet      = RHtml_visibleGet;
      o.visibleSet      = RHtml_visibleSet;
      o.textGet         = RHtml_textGet;
      o.textSet         = RHtml_textSet;
      o.checkGet        = RHtml_checkGet;
      o.checkSet        = RHtml_checkSet;
      o.radioGet        = RHtml_radioGet;
      o.radioSet        = RHtml_radioSet;
      o.cursorSet       = RHtml_cursorSet;
      o.linkGet         = RHtml_linkGet;
      o.linkSet         = RHtml_linkSet;
      o.clientPosition  = RHtml_clientPosition;
      o.clientX         = RHtml_clientX;
      o.clientY         = RHtml_clientY;
      o.setSize         = RHtml_setSize;
      o.toText          = RHtml_toText;
      o.toHtml          = RHtml_toHtml;
      o.eventSource     = RHtml_eventSource;
      o.get             = RHtml_get;
      o.parent          = RHtml_parent;
      o.searchLinker    = RHtml_searchLinker;
      o.searchObject    = RHtml_searchObject;
      o.tableMoveRow    = RHtml_tableMoveRow;
      o.free            = RHtml_free;
      return o;
   }
   MO.RHtml_uid = function RHtml_uid(v){
      var r = v.__puuid;
      if(r == null){
         r = v.__puuid = RHtml._nextUid++;
      }
      return r;
   }
   MO.RHtml_fullscreen = function RHtml_fullscreen(h, f){
      if(f){
         if (h.requestFullscreen){
            h.requestFullscreen();
         }else if(h.mozRequestFullScreen){
            h.mozRequestFullScreen();
         }else if(h.webkitRequestFullScreen){
            h.webkitRequestFullScreen();
         }
      }else{
         if (h.exitFullscreen){
            h.exitFullscreen();
         }else if(h.mozCancelFullScreen){
            h.mozCancelFullScreen();
         }else if(h.webkitCancelFullScreen){
            h.webkitCancelFullScreen();
         }
      }
   }
   MO.RHtml_displayGet = function RHtml_displayGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'inline');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml_displaySet = function RHtml_displaySet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? 'inline' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml_visibleGet = function RHtml_visibleGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         r = (s == 'block');
      }else{
         r = (s != 'none');
      }
      return r;
   }
   MO.RHtml_visibleSet = function RHtml_visibleSet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
         s = v ? '' : 'none';
      }else{
         s = v ? null : 'none';
      }
      h.style.display = s;
   }
   MO.RHtml_textGet = function RHtml_textGet(h, v){
      var r = null;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         r = h.textContent;
      }else{
         r = h.innerText;
      }
      return r;
   }
   MO.RHtml_textSet = function RHtml_textSet(h, v){
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         h.textContent = v;
      }else{
         h.innerText = v;
      }
   }
   MO.RHtml_checkGet = function RHtml_checkGet(h){
      return RBool.toString(h.checked);
   }
   MO.RHtml_checkSet = function RHtml_checkSet(h, v){
      h.checked = RBool.isTrue(v);
   }
   MO.RHtml_radioGet = function RHtml_radioGet(hs){
      if(hs){
         var c = hs.length;
         for(var n = 0; n < c; n++){
            var h = hs[n];
            if(h.checked){
               return h.value;
            }
         }
      }
      return null;
   }
   MO.RHtml_radioSet = function RHtml_radioSet(hs, v){
      if(hs){
         var c = hs.length;
         for(var n=0; n < c; n++){
            var h = hs[n];
            if(h.value == v){
               h.checked = true;
               break;
            }
         }
      }
   }
   MO.RHtml_cursorSet = function RHtml_cursorSet(h, v){
      if(h){
         h.style.cursor = v;
      }
   }
   MO.RHtml_linkGet = function RHtml_linkGet(h, n){
      var o = this;
      var u = o.uid(h);
      var i = o._links[u];
      return i ? i.get(n) : null;
   }
   MO.RHtml_linkSet = function RHtml_linkSet(h, n, v){
      var o = this;
      var ls = o._links;
      var u = o.uid(h);
      var i = ls[u];
      if(!i){
         i = ls[u] = new THtmlItem();
         i._link = h;
      }
      i.set(n, v);
   }
   MO.RHtml_clientPosition = function RHtml_clientPosition(hTag, hTop){
      var o = this;
      var position = o._clientPosition;
      position.set(0, 0);
      while(hTag != hTop){
         position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
         position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
         hTag = hTag.offsetParent;
      }
      return position;
   }
   MO.RHtml_clientX = function RHtml_clientX(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetLeft - p.scrollLeft;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml_clientY = function RHtml_clientY(p, t){
      var r = 0;
      while(p != t){
         r += p.offsetTop - p.scrollTop;
         p = p.offsetParent;
      }
      return r;
   }
   MO.RHtml_setSize = function RHtml_setSize(h, s){
      if(s.width){
         h.style.width = s.width + 'px';
      }
      if(s.height){
         h.style.height = s.height + 'px';
      }
   }
   MO.RHtml_toText = function RHtml_toText(p){
      if(p != null){
         p = p.toString();
         p = p.replace(/&lt;/, '<');
         p = p.replace(/&gt;/g, '>');
         p = p.replace(/&nbsp;/g, ' ');
         p = p.replace(/<BR>/g, '\n');
      }
      return p;
   }
   MO.RHtml_toHtml = function RHtml_toHtml(p){
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
   MO.RHtml_eventSource = function RHtml_eventSource(p){
      return p.srcElement ? p.srcElement : p.target;
   }
   MO.RHtml_get = function RHtml_get(name){
      return document.getElementById(name);
   }
   MO.RHtml_parent = function RHtml_parent(tag, typeName){
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
   MO.RHtml_searchLinker = function RHtml_searchLinker(h, c){
      while(h){
         var f = h.__linker;
         if(f){
            if(RClass.isClass(f, c)){
               return f;
            }
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml_searchObject = function RHtml_searchObject(h, n){
      while(h){
         var f = h[n];
         if(f){
            return f;
         }
         h = h.parentElement;
      }
      return null;
   }
   MO.RHtml_tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
      if(ph.tagName != 'TABLE'){
         throw new TError('Html table is invalid.');
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
   MO.RHtml_free = function RHtml_free(p){
      return null;
   }
   MO.RHtml_clone = function RHtml_clone(o, s, t){
      if(!t){
         t = s.cloneNode(true);
      }
      if(s._pname){
         o[s._pname] = t;
      }
      if(s._ptyName){
   	  o[s._ptyName] = t;
      }
      var e = REvent.find(s).events;
      t._psource = s;
      for(var n in e){
         t[e[n].handle] = s[e[n].handle];
         if(t[e[n].handle]){
             RHtml.link(t, '_plink', o);
         }
      }
      var p = s.children;
      var n = p.length;
      while(--n >= 0){
         RHtml_clone(o, p[n], t.children[n]);
      }
      return t;
   }
   MO.RHtml_offsetPosition = function RHtml_offsetPosition(h, t){
      var p = new TPoint();
      while(h != t){
         p.x += h.offsetLeft - h.scrollLeft;
         p.y += h.offsetTop - h.scrollTop;
         if('absolute' != RHtml.currentStyle(h).position){
         }
         p.x += h.clientLeft;
         p.y += h.clientTop;
         h = h.offsetParent;
      }
      return p;
   }
   MO.RHtml_offsetX = function RHtml_offsetX(h){
      var x = 0;
      while(h){
         x += h.offsetLeft;
         h = h.offsetParent;
      }
      return x;
   }
   MO.RHtml_offsetY = function RHtml_offsetY(h){
      var y = 0;
      while(h){
         y += h.offsetTop;
         h = h.offsetParent;
      }
      return y;
   }
   MO.RHtml_bodyWidth = function RHtml_bodyWidth(doc){
      return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
   }
   MO.RHtml_bodyHeight = function RHtml_bodyHeight(doc){
      return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
   }
   MO.RHtml_frameHeight = function RHtml_frameHeight(f){
      var hd = f.contentWindow.document;
      var oh = hd.body.scrollHeight;
      var sh = hd.documentElement.scrollHeight;
      return Math.max(oh, sh);
   }
   MO.RHtml_scrollWidth = function RHtml_scrollWidth(h){
      var r = 0;
      if(h.offsetWidth){
         r += h.offsetWidth;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderLeftWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderRightWidth);
      }
      if(h.clientWidth){
         r -= h.clientWidth;
      }
      return r;
   }
   MO.RHtml_scrollHeight = function RHtml_scrollHeight(h){
      var r = 0;
      if(h.offsetHeight){
         r += h.offsetHeight;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderTopWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderBottomWidth);
      }
      if(h.clientHeight){
         r -= h.clientHeight;
      }
      return r;
   }
   MO.RHtml_currentStyle = function RHtml_currentStyle(p){
      if(p.currentStyle){
         return p.currentStyle;
      }
      return window.getComputedStyle(p, null);
   }
   MO.RHtml_point = function RHtml_point(o, p){
      return this.toPoint(new TPoint(), o, p);
   }
   MO.RHtml_toPoint = function RHtml_toPoint(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.x = -RInt.parse(cs.borderLeftWidth);
         r.y = -RInt.parse(cs.borderTopWidth);
         while(o && o != p){
            r.x += o.offsetLeft - o.scrollLeft;
            r.y += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.x += o.clientLeft;
               r.y += o.clientTop;
            }
            o = o.offsetParent;
         }
      }
      return r;
   }
   MO.RHtml_rect = function RHtml_rect(o, p){
      return this.toRect(new TRect(), o, p);
   }
   MO.RHtml_toRect = function RHtml_toRect(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.left = -RInt.parse(cs.borderLeftWidth);
         r.top = -RInt.parse(cs.borderTopWidth);
         var w = o.offsetWidth; w = o.offsetWidth-1;
         var h = o.offsetHeight; h = o.offsetHeight-1;
         while(o && o != p){
            r.left += o.offsetLeft - o.scrollLeft;
            r.top += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.left += o.clientLeft;
               r.top += o.clientTop;
            }
            o = o.offsetParent;
         }
         r.right = r.left + w;
         r.bottom = r.top + h;
      }
      return r;
   }
   MO.RHtml_top = function RHtml_top(h){
      var r = 0;
      if(h){
         var cs = RHtml.currentStyle(o);
         r = -RInteger.parse(cs.borderTopWidth);
         while(h){
            r += h.offsetTop - h.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r += h.clientTop;
            }
            h = h.offsetParent;
         }
      }
      return r;
   }
   MO.RHtml_clientRect = function RHtml_clientRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft;
            y += o.offsetTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }
   MO.RHtml_offsetRect = function RHtml_offsetRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft + o.clientLeft;
            y += o.offsetTop + o.clientTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }
   MO.RHtml_clear = function RHtml_clear(h){
      if(h){
         var cns = h.children;
         if(cns && cns.length){
            for(var n=cns.length-1; n>=0; n--){
               var cn = cns[n];
               if(cn.children && cn.children.length){
                  this.clear(cn);
               }
               h.removeChild(cn);
            }
         }
      }
   }
   MO.RHtml_setRect = function RHtml_setRect(h, r){
      if(h && h.style){
         var s = h.style;
         s.left = r.left;
         s.top = r.top;
         s.width = r.width();
         s.height = r.height();
      }
   }
   MO.RHtml_setBounds = function RHtml_setBounds(r, l, t, w, h){
      if(r && r.style){
         var s = r.style;
         if(null != l){
            s.left = l;
         }
         if(null != t){
            s.top = t;
         }
         if(null != w){
            s.width = w;
         }
         if(null != h){
            s.height = h;
         }
      }
   }
   MO.RHtml_setPixelRect = function RHtml_setPixelRect(o, r){
      if(o && o.style){
         var s = o.style;
         s.pixelLeft = r.left;
         s.pixelTop = r.top;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
      }
   }
   MO.RHtml_setPixelBounds = function RHtml_setPixelBounds(o, l, t, w, h){
      if(o && o.style){
         var s = o.style;
         if(null != l){
            s.pixelLeft = l;
         }
         if(null != t){
            s.pixelTop = t;
         }
         if(null != w){
            s.pixelWidth = w;
         }
         if(null != h){
            s.pixelHeight = h;
         }
      }
   }
   MO.RHtml_changeWidth = function RHtml_changeWidth(s, t){
      if(s && t){
         var ts = RHtml.currentStyle(t);
         var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
         t.style.pixelWidth = s.offsetWidth - tw;
      }
   }
   MO.RHtml_showNodes = function RHtml_showNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }else if(c.nodeName == '#text'){
               c.nodeValue = o[n];
            }
         }
      }
   }
   MO.RHtml_hideNodes = function RHtml_hideNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }else if(c.nodeName == '#text'){
               o[n] = c.nodeValue;
               c.nodeValue = '';
            }
         }
      }
   }
   MO.RHtml_showChildren = function RHtml_showChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }
         }
      }
   }
   MO.RHtml_hideChildren = function RHtml_hideChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }
         }
      }
   }
   MO.RHtml_posParent = function RHtml_posParent(h){
      while(h){
         if('visible' != h.currentStyle.overflow){
            return h;
         }
         h = h.offsetParent;
      }
      return null;
   }
   MO.RHtml_form = function RHtml_form(h){
      if(h){
         var f = this.parent(h, 'FORM');
         return f ? f : h.ownerDocument.forms[0];
      }
      return window.document.forms[0];
   }
   MO.RHtml_popup = function RHtml_popup(u, w, h){
      var l = (screen.width - w)/2;
      var t = (screen.height - h)/2 - 20;
      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
      window.open(u, '_blank', s);
   }
   MO.RHtml_selectText = function RHtml_selectText(){
      var ip = document.getElementById(id);
      ip.select();
      return document.selection.createRange().text;
   }
   MO.getTRNode = function getTRNode(nowTR, sibling) {
      while(nowTR = nowTR[sibling]){
         if(nowTR.tagName == 'TR'){
            break;
         }
      }
      return nowTR;
   }
   MO.RHtml = new RHtml();
}
with(MO){
   MO.RXml = function RXml(){
      var o = this;
      o.httpActiveX      = false;
      o.httpVendor       = null;
      o.domActiveX       = false;
      o.domVendor        = null;
      o.construct        = RXml_construct;
      o.isNode           = RXml_isNode;
      o.createConnection = RXml_createConnection;
      o.createDocument   = RXml_createDocument;
      o.formatText       = RXml_formatText;
      o.buildText        = RXml_buildText;
      o.buildNode        = RXml_buildNode;
      o.makeString       = RXml_makeString;
      o.makeNode         = RXml_makeNode;
      o.makeDocument     = RXml_makeDocument;
      o.unpack           = RXml_unpack;
      o.construct();
      return o;
   }
   MO.RXml_construct = function RXml_construct(){
      var o = this;
      var d = window.document;
      if(window.ActiveXObject && !window.XMLHttpRequest){
         var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
         var c = vs.length;
         for(var n = 0; n < c; n++){
            var v = vs[n];
            try{
               r = new ActiveXObject(v);
               o.httpActiveX = true;
               o.httpVendor = v;
               break;
            }catch(e){
               m = e;
            }
         }
      }else if(window.XMLHttpRequest){
         try{
            var r = new XMLHttpRequest();
            o.httpActiveX = false;
         }catch(e){
            m = e;
         }
      }else{
         alert('Unknown http vendor.');
      }
      if(window.ActiveXObject || !window.DOMParser){
         var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
         var c = vs.length;
         for(var n = 0; n < c; n++){
            var v = vs[n];
            try{
               var r = new ActiveXObject(v);
               o.domActiveX = true;
               o.domVendor = v;
               break;
            }catch(e){
               m = e;
            }
         }
      }else if(window.DOMParser && d && d.implementation && d.implementation.createDocument){
         try{
            var r = document.implementation.createDocument('', '', null);
            o.domActiveX = false;
         }catch(e){
            m = e;
         }
      }else{
         alert('Unknown dom vendor.');
      }
   }
   MO.RXml_isNode = function RXml_isNode(n){
      return RClass.isName(n, 'TNode');
   }
   MO.RXml_createConnection = function RXml_createConnection(){
      var o = this;
      var r = null;
      if(o.httpActiveX){
         r = new ActiveXObject(o.httpVendor);
      }else{
         r = new XMLHttpRequest();
      }
      if(!r){
         alert('Create xml connection failure. (message=' + m + ')');
      }
      return r;
   }
   MO.RXml_createDocument = function RXml_createDocument(){
      var o = this;
      var r = null;
      if(o.domActiveX){
         r = new ActiveXObject(o.domVendor);
      }else{
         r = document.implementation.createDocument('', '', null);
      }
      if(!r){
         alert('Create xml document failure. (message=' + m + ')');
      }
      return r;
   }
   MO.RXml_formatText = function RXml_formatText(s){
      if(s != null){
         s = s.replace(/\\n/g, '\n');
      }
      return s;
   }
   MO.RXml_buildText = function RXml_buildText(s, v){
      if(v != null){
         v = v.toString();
         var c = v.length;
         for(var i = 0; i < c; i++){
            var ch = v.charAt(i);
            switch(ch){
               case '<':
                  s.append('&lt;');
                  break;
               case '>':
                  s.append('&gt;');
                  break;
               case '"':
                  s.append('&quot;');
                  break;
               case '&':
                  s.append('&amp;');
                  break;
               case '\r':
                  continue;
               case '\n':
                  s.append('\\n');
                  break;
               default:
                  s.append(ch);
            }
         }
      }
      return s;
   }
   MO.RXml_buildNode = function RXml_buildNode(pd, pn, pe){
      var xas = null;
      var eas = pe.attributes;
      if(eas){
         var eac = eas.length;
         if(eac > 0){
            xas = new TAttributes();
            for(var n = 0; n < eac; n++){
               var ea = eas[n];
               if(ea.nodeName){
                  xas.set(ea.nodeName, RXml.formatText(ea.value));
               }
            }
         }
      }
      var xt = new TString();
      xt.append(pe.value);
      var ecs = pe.childNodes
      if(ecs){
         var ecc = ecs.length;
         for(var n = 0; n < ecc; n++){
            var en = ecs[n];
            var ect = en.nodeType;
            if(ect == ENodeType.Text){
               xt.append(en.nodeValue);
            }else if(ect == ENodeType.Data){
               xt.append(en.data);
            }
         }
      }
      var xc = pd.create(pe.nodeName, xas, RString.trim(xt.toString()));
      if(pn){
         pn.push(xc);
      }else{
         pd._root = xc;
      }
      if(ecs){
         var cc = ecs.length;
         for(var n = 0; n < cc; n++){
            if(ecs[n].nodeType == ENodeType.Node){
               this.buildNode(pd, xc, ecs[n]);
            }
         }
      }
   }
   MO.RXml_makeString = function RXml_makeString(s){
      var o = this;
      var x = null;
      if(o.domActiveX){
         x = new ActiveXObject(o.domVendor);
         x.async = false;
         x.loadXML(s);
      }else{
         var p = new DOMParser();
         x = p.parseFromString(s, 'text/xml');
      }
      return x;
   }
   MO.RXml_makeNode = function RXml_makeNode(p){
      var o = this;
      if(p.documentElement){
         var d = new TXmlDocument();
         o.buildNode(d, null, p.documentElement);
         return d.root();
      }else if(p.tagName == 'SCRIPT'){
         var s = p.textContent;
         if(!s){
            s = p.text;
         }
         if(s){
            var d = new TXmlDocument();
            var xd = o.makeString(s)
            o.buildNode(d, null, xd.documentElement);
            return d.root();
         }
      }
      return null;
   }
   MO.RXml_makeDocument = function RXml_makeDocument(p){
      var d = new TXmlDocument();
      if(p.documentElement){
         RXml.buildNode(d, null, p.documentElement);
      }
      return d;
   }
   MO.RXml_unpack = function RXml_unpack(s, n){
      var o = this;
      if(RString.isEmpty(s)){
         return null;
      }
      if(!n){
         n = new TNode();
      }
      var np = new TAttributes();
      np.unpack(s);
      n.name = np.get('name');
      n.value = np.get('value');
      if(np.contains('attributes')){
         n.attributes().unpack(np.get('attributes'));
      }
      if(np.contains('nodes')){
         var ns = new TStrings();
         ns.unpack(np.get('nodes'));
         for(var i=0; i<ns.count; i++){
            o.unpack(ns.get(i), n.create());
         }
      }
      return n;
   }
   MO.RXml = new RXml();
}
