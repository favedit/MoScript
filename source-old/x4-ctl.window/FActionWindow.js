// ============================================================
// FListWindow
// ============================================================
function FActionWindow(o){
   o = RClass.inherits(this, o, FWindow);
   /// @style
   o.styleTablePanel      = RClass.register(o, new TStyle('TablePanel'));
   o.styleButtonPanel     = RClass.register(o, new TStyle('ButtonPanel'));
   // 
   o.buttons              = new TList();
   // Method
   o.oeBuild              = FActionWindow_oeBuild;
   o.linkForm             = FActionWindow_linkForm;
   o.show                 = FActionWindow_show;
   o.hide                 = FActionWindow_hide;
   o.onClose              = FActionWindow_onClose;
   o.onProcessButtonClick = FActionWindow_onProcessButtonClick;
   o.onBuildButtons       = FActionWindow_onBuildButtons;
   o.processArg           = FActionWindow_processArg;
   o.onLoaded             = FActionWindow_onLoaded;
   o.dispose              = FActionWindow_dispose;
}
// ------------------------------------------------------------
function FActionWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Icon');
      o.setCaption(' Action Window');
      // Form (2col x 1row)
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hBodyPanel.style.height = '400px';
      hTab.width = '100%';
      hTab.height = '100%';
      // Button Panel
      var h = o.hButtonPanel = hTab.insertRow().insertCell();
      h.height = 1;
      h.className = o.style('ButtonPanel');
      h.style.borderBottomStyle = 'solid';
      h.style.borderBottomWidth  = 'thin';
      // Message Panel
      var h  = hTab.insertRow().insertCell();
      h.height = "200";
      var hDiv = RBuilder.appendDiv(h);
      hDiv.style.width = '100%';
      hDiv.style.height = '100%';
      hDiv.style.overflow = 'auto'; 
      o.hTablePanel = RBuilder.appendTable(hDiv);
      h.style.height = "100%";
      o.hTablePanel.style.width = '100%';
      //h.style.border = '1px solid red';
      h.vAlign = 'top';
      h.style.width = '100%';
      h.cellSpacing = 10;
      //h.className = o.style('TablePanel');
      o.onBuildButtons();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FActionWindow_onBuildButtons(){
   var o = this;
   // Button Panel
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   var b = o.btnClose = RClass.create(FButton);
   b.icon = 'tool.exit';
   b.label = RContext.get('FToolButton:close');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClose);
   b.psBuild(hRow.insertCell());
}
// ------------------------------------------------------------
function FActionWindow_linkForm(ds){
   var o = this;
   var h = o.hTablePanel;
   o.linkDs = ds;
   h.innerText = '';
   if(RClass.isClass(ds, MDataset)){
      var cs = ds.components;
      var ct = cs.count;
      for(var n = 0; n < ct; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FDataAction)){
            var htc = h.insertRow().insertCell();
            htc.style.width = '100%';
            // table
            var htb = RBuilder.appendTable(htc);
            htb.style.width = '100%';
            htb.style.border = '1px solid gray';
            var hr = htb.insertRow();
            // c1
            var hc0 = hr.insertCell();
            hc0.width = 50;
            hc0.align = 'center';
            hc0.vAlign = 'middle';
            var hic = RBuilder.appendIcon(hc0);
            hic.src = RString.nvl(o.styleIcon(c.iconPath), o.styleIcon('Default'));
            RRes.iconPath(o.styleIcon(c.iconPath));
            // c2
            var hc2 = hr.insertCell();
            hc2.innerText = c.label;
            var ht = RBuilder.appendTable(hc2);
            ht.style.width = '100%';
            // c3
            var hr1 = ht.insertRow();
            var hr2 = ht.insertRow();
            var hrc1 = hr1.insertCell();
            var hrc2 = hr2.insertCell();
            // c4
            hrc1.innerText = '   '+c.note;
            hrc1.style.cellPadding = 3;
            hrc2.align = 'right';
            // c5
            var b = RClass.create(FButton);
            b.width = 1;
            b.icon = 'tool.exit';
            b.label = '操作';
            b.psBuild(hrc2);
            b.userService = c.service;
            b.actName = c.name;
            b.dsName = ds.name;
            b.invokeFun = c.invokeFunction;
            b.lsnsClick.register(o, o.onProcessButtonClick);
            var htc2 = h.insertRow().insertCell();
            htc2.innerHTML = '<br>';
         }
      }
   }
}
// ------------------------------------------------------------
function FActionWindow_show(){
   var o = this;
   //RWindow.disable();
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   o.focus();
}
//------------------------------------------------------------
function FActionWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}
//------------------------------------------------------------
function FActionWindow_onClose(){
   var o = this;
   o.hide();
}
//------------------------------------------------------------
function FActionWindow_onProcessButtonClick(btn){
   var o = this;
   var ds = o.linkDs;
   var g = new TActionServiceArg();
   var t = new TAttributes();
   if(RClass.isClass(ds, FTable)){
      ds.findSelectRows();
      var sr = ds._selectRows.get(0);
      sr.toAttributes(t);
   }else if(RClass.isClass(ds, FForm)){
      ds.toAttributes(t);
   }
   g.values = t;
   var sv = RString.splitTwo(btn.userService, '@');
   g.sev = sv;
   g.actName = btn.actName;
   g.dsName = btn.dsName;
   g.invokeFun = btn.invokeFun;
   g.callback = new TInvoke(o, o.onLoaded);
   o.processArg(g);
}
//------------------------------------------------------------
function FActionWindow_processArg(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root(); 
   root.set('action', g.sev[0]);
   var nd = g.toNode();
   root.push(nd);
   // 获取返回节点
   var url = RService.url(g.sev[1]);
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = url;
   e.document = doc;
   e.arg = g;
   e.action = g.action;
   RConsole.find(FXmlConsole).process(e);
}
/***********************************************************
 * <T>服务器服务异步执行的回调函数。</T>
 *
 * @method
 **********************************************************/
function FActionWindow_onLoaded(e){
   var o = this;
   var root = e.document.root();
   var mc = RConsole.find(FMessageConsole);
   var r = mc.checkResult(root, e.arg);
   if(r){
      o.hide();
      if(e.arg.invokeFun){
         eval(e.arg.invokeFun);
      }
   }
}
/***********************************************************
 * <T>清空多余的释放内存。</T>
 *
 * @method
 **********************************************************/
function FActionWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   RMemory.freeHtml(o.hBodyPanel);
   RMemory.freeHtml(o.hTablePanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hBodyPanel = null;
   o.hTablePanel = null;
   o.hButtonPanel = null;
}

