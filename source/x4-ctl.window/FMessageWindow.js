/**************************************************************
 * 消息弹出框
 * 
 * @class
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FMessageWindow(o){
   //alert(FMessageWindow);
   o = RClass.inherits(this, o, FWindow);
   // Attribute
   o.type            = null;
   o.isDialog        = false;
   o.titleBlur       = false;
   o.messageArg      = null;
   // css
   o.stMsgPanel      = RClass.register(o, new TStyle('MsgPanel'));
   o.stButtonPanel   = RClass.register(o, new TStyle('ButtonPanel'));
   o.stItmeForm      = RClass.register(o, new TStyle('ItmeForm'));
   o.stItemTitle     = RClass.register(o, new TStyle('ItemTitle'));
   o.stItemBodyForm  = RClass.register(o, new TStyle('ItemBodyForm'));
   o.stRowItem       = RClass.register(o, new TStyle('RowItem'));
   o.stDescForm      = RClass.register(o, new TStyle('DescForm'));
   o.stDescTitle     = RClass.register(o, new TStyle('DescTitle'));
   o.stDescBody      = RClass.register(o, new TStyle('DescBody'));
   // Event
   o.onItemOver      = RClass.register(o, new HMouseOver('onItemOver'), FMessageWindow_onItemOver);
   o.onItemClick     = RClass.register(o, new HClick('onItemClick'), FMessageWindow_onItemClick);
   o.onDescClick     = RClass.register(o, new HClick('onDescClick'), FMessageWindow_onDescClick);
   // Html
   o.hMessagePanel   = null;
   o.hMessages       = null;
   o.hDescription    = null;
   o.hButtonPanel    = null;
   o.hBlank          = null;
   // Process
   o.oeBuild         = FMessageWindow_oeBuild;
   // Event
   o.onBuildMessages = FMessageWindow_onBuildMessages;
   o.onBuildButtons  = FMessageWindow_onBuildButtons;
   o.onOk            = FMessageWindow_onOk;
   o.onCancel        = FMessageWindow_onCancel;
   o.onClose         = FMessageWindow_onClose;
   // Method
   o.loadMessages    = FMessageWindow_loadMessages;
   o.show            = FMessageWindow_show;
   o.hide            = FMessageWindow_hide;
   o.dispose         = FMessageWindow_dispose;
   return o;
}
// ------------------------------------------------------------
function FMessageWindow_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
   return;
   h.style.backgroundColor = "BLUE";
   h.style.cousor = "hand";
}
// ------------------------------------------------------------
function FMessageWindow_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
   //o.hDescDiv.innerText = o.msgs.get(idx).description; 
}
// ------------------------------------------------------------
function FMessageWindow_onDescClick(e){
   var o = this;
   return;
   var st = o.hDescBody.style.display;
   if('none' == st){
      o.hDescBody.style.display = 'block';
   }else{
      o.hDescBody.style.display = 'none';
   }
}
// ------------------------------------------------------------
function FMessageWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Icon');
      // Form (1colx2row)
      //o.hBodyPanel.style.height = 400;
      var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
      hTab.style.vAlign = "top";
      hTab.width = '100%';
      hTab.height = '100%';
      //h0.style.backgroundColor = "#CCCCCC";
      // Message Panel
      var h1 = o.hTitlePanel = hTab.insertRow().insertCell();
      //h1.style.border = "2px solid Red";
      h1.style.height = "100%";
      h1.style.vAlign = "top";
      var h2 = o.hMsgPanel = hTab.insertRow().insertCell();
      //h2.style.border = "2px solid Black";
      h2.style.height = "100%";
      //h.className = o.style('MsgPanel');
      //h.style.border='2px solid Blue';
      //h.style.tableLayout="fixed";
      o.onBuildMessages();
      // Button Panel
      var h0 = o.hButtonPanel = hTab.insertRow().insertCell();
      //h.className = o.style('ButtonPanel');
      //h.style.border='2px solid Blue';
      h0.style.align = 'right';
      o.onBuildButtons();
      h0.height = 20;
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}
// ------------------------------------------------------------
function FMessageWindow_onBuildMessages(){
   var o = this;
   if(!o.type){
      // 消息条目<table>
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
     // hc1.style.backgroundColor = "RED";
      hc1.width = '20';
      var hTitleIcon = RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ RContext.get('FMessageWindow:MessageContext');
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
      //hItemBodyForm.style.tableLayout = "fixed";
      hItemBodyForm.style.vAlign = "top";
      // 消息体<table>
      var hTab2 = o.hDescForm = RBuilder.appendTable(o.hMsgPanel);
      hTab2.style.tableLayout = "fixed";
      hTab2.style.border='2px solid #EEEDED';
      hTab2.style.borderTopWidth = 0;
      //var hDescTitle = o.hDescTitle = hTab2.insertRow().insertCell();
      //hDescTitle.height = 25;
      //var h = RBuilder.appendTable(hDescTitle);
      //h.height = '100%';
      //h.width = '100%';
      //h.style.backgroundColor = "#F5F5F5";
      //h.style.border = "1px solid red";
      /*var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = 20;
      var hDescIcon = RBuilder.appendIcon(hc1, null, null, 16, 14);
      hDescIcon.src = o.styleIconPath('DescIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+RContext.get('FMessageWindow:MessageDetail');
      hc2.style.cursor = 'hand';
      o.attachEvent('onDescClick', hc2);
      var hDescBody = o.hDescBody = hTab2.insertRow().insertCell();
      hDescBody.style.display = 'none';
      //hDescBody.style.border = '1px solid red';
      hDescBody.height = "200";
      var hDescDiv = o.hDescDiv = RBuilder.appendDiv(hDescBody);
      hDescDiv.style.overflow = 'auto';
      hDescDiv.style.width = '100%';
      hDescDiv.style.height = '100%';
      hDescDiv.style.border = '2px solid F9F9F9';*/
   }
   o.hItmeForm.style.display = 'none';
   o.hDescForm.style.display = 'none';
   o.hMsgPanel.style.height = '100%';
   if(EMessage.Fatal == o.type || EMessage.Error == o.type){
      o.hItmeForm.style.display = 'block';
      o.hDescForm.style.display = 'block';
   }else{
      o.hItmeForm.style.display = 'block';
     // o.hItmeForm.height = '100%';
   }
   //o.hItemTitle.innerText = '标题列表:' + o.type;
}
// ------------------------------------------------------------
function FMessageWindow_onBuildButtons(t){
   var o = this;
   if(!o.type){
      var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      // blank
      var hc = o.hBlank = hRow.insertCell();
      hc.width='72%';
      // Ok
      var b = o.btnOk = RClass.create(FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      // Cancel
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
   if(EMessage.Warn == o.type){
      o.btnOk.hPanel.style.display = "block";
      o.btnCancel.hPanel.style.display = "block";
      o.hBlank.width = '72%';
   }else{
      o.btnOk.hPanel.style.display = "block";
      o.hBlank.width = '87%';
   }
}
// ------------------------------------------------------------
function FMessageWindow_onOk(){
   var o = this;
   var g = o.messageArg;
   var cg = g.argument;
   // 根据类型决定处理过程
   var type = o.msgs.get(0).type;
   if(EMessage.Warn == type){
      if(cg){
         // 警告模式下如果点击确定选项，重新执行操作
         cg.checked = EBoolean.True;
         if('process' == cg.actionType){
            RConsole.find(FFormConsole).process(cg);
         }else if('update' == cg.actionType){
            RConsole.find(FDatasetConsole).update(cg);
         }
      }
   }
   if(type == EMessage.Info){
      // 消息模式下如果点击确定选项，继续执行后续操作
      if(g.invokeCaller){
         g.invokeParam.messageChecked = true;
         g.invokeCaller.invoke(g.invokeParam);
      }
   }
   // 隐藏当前窗口
   o.hide();
}
// ------------------------------------------------------------
function FMessageWindow_onCancel(){
   this.hide();
}
// ------------------------------------------------------------
function FMessageWindow_onClose(){
   this.hide();
}
// ------------------------------------------------------------
// g:argument:TMessageArg
function FMessageWindow_loadMessages(g){
   var o = this;
   o.messageArg = g;
   var ms = g.messages;
   //如果sention超时,跳转画面
   o.type = ms.type();
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
      var t = msg.type;
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
         //var d = msg.description;
         //o.hDescDiv.innerText = d;
         //o.hDescDiv.style.whiteSpace = "nowrap";
      }
   }
   // 设置标题
   if(EMessage.Error == msgType){
      o.setCaption(' ' + RContext.get('FMessageWindow:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FMessageWindow:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FMessageWindow:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FMessageWindow:Fatal'));
   }
}
// ------------------------------------------------------------
function FMessageWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   //o.hDescBody.style.display = 'none';
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
// ------------------------------------------------------------
function FMessageWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   // 关闭加载状态
   var f = o.messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   // 允许窗口操作
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
function FMessageWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o.hButtonPanel = null;
}