//==========================================================
// <T>消息弹出框。</T>
//
// @class
// @author maocy
// @version 150409
//==========================================================
MO.FUiMessageDialog = function FUiMessageDialog(o){
   o = MO.Class.inherits(this, o, MO.FUiWindow);
   //..........................................................
   // @style
   o._styleMsgPanel     = MO.Class.register(o, new MO.AStyle('_styleMsgPanel'));
   o._styleButtonPanel  = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._styleItmeForm     = MO.Class.register(o, new MO.AStyle('_styleItmeForm'));
   o._styleItemTitle    = MO.Class.register(o, new MO.AStyle('_styleItemTitle'));
   o._styleItemBodyForm = MO.Class.register(o, new MO.AStyle('_styleItemBodyForm'));
   o._styleRowItem      = MO.Class.register(o, new MO.AStyle('_styleRowItem'));
   o._styleDescForm     = MO.Class.register(o, new MO.AStyle('_styleDescForm'));
   o._styleDescTitle    = MO.Class.register(o, new MO.AStyle('_styleDescTitle'));
   o._styleDescBody     = MO.Class.register(o, new MO.AStyle('_styleDescBody'));
   //..........................................................
   // @attribute
   o._type              = null;
   o._isDialog          = false;
   o._titleBlur         = false;
   o._messageArg        = null;
   //..........................................................
   // @html
   o._hMessagePanel     = null;
   o._hMessages         = null;
   o._hDescription      = null;
   o._hButtonPanel      = null;
   o._hBlank            = null;
   //..........................................................
   // @event
   o.onBuild            = MO.FUiMessageDialog_onBuild;
   // @event
   o.onItemOver         = MO.Class.register(o, new MO.AEventMouseOver('onItemOver'), MO.FUiMessageDialog_onItemOver);
   o.onItemClick        = MO.Class.register(o, new MO.AEventClick('onItemClick'), MO.FUiMessageDialog_onItemClick);
   o.onDescClick        = MO.Class.register(o, new MO.AEventClick('onDescClick'), MO.FUiMessageDialog_onDescClick);
   // @event
   o.onBuildMessages    = MO.FUiMessageDialog_onBuildMessages;
   o.onBuildButtons     = MO.FUiMessageDialog_onBuildButtons;
   o.onOk               = MO.FUiMessageDialog_onOk;
   o.onCancel           = MO.FUiMessageDialog_onCancel;
   o.onClose            = MO.FUiMessageDialog_onClose;
   //..........................................................
   // @method
   o.loadMessages       = MO.FUiMessageDialog_loadMessages;
   o.show               = MO.FUiMessageDialog_show;
   o.hide               = MO.FUiMessageDialog_hide;
   o.dispose            = MO.FUiMessageDialog_dispose;
   return o;
}

//==========================================================
// <T>建立框架处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FUiMessageDialog_onBuild = function FUiMessageDialog_onBuild(event){
   var o = this;
   o.__base.FUiWindow.oeBuild.call(o, e);
   o.setIcon('Icon');
   // Form (1colx2row)
   //o.hBodyPanel.style.height = 400;
   var hTab = MO.RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
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
   var h0 = o._hButtonPanel = hTab.insertRow().insertCell();
   //h.className = o.style('ButtonPanel');
   //h.style.border='2px solid Blue';
   h0.style.align = 'right';
   o.onBuildButtons();
   h0.height = 20;
   MO.Console.find(FKeyConsole).register(MO.EKey.Esc, new MO.TListener(o, o.onClose));
   return r;
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onItemOver = function FUiMessageDialog_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
   //h.style.backgroundColor = "BLUE";
   //h.style.cousor = "hand";
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onItemClick = function FUiMessageDialog_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
   //o.hDescDiv.innerText = o.msgs.get(idx).description; 
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onDescClick = function FUiMessageDialog_onDescClick(e){
   var o = this;
   //var st = o.hDescBody.style.display;
   //if('none' == st){
   //   o.hDescBody.style.display = 'block';
   //}else{
   //   o.hDescBody.style.display = 'none';
   //}
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onBuildMessages = function FUiMessageDialog_onBuildMessages(){
   var o = this;
   if(!o._type){
      // 消息条目<table>
      var hTab1 = o.hItmeForm = MO.RBuilder.appendTable(o.hTitlePanel);
      hTab1.style.height = "100%";
      hTab1.style.width = "100%";
      hTab1.style.vAlign = "top";
      var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
      hItemTitle.height = 25;
      var h = MO.RBuilder.appendTable(hItemTitle);
      h.height = '100%';
      h.width = '100%';
      h.style.backgroundColor = "#F5F5F5";
      var hr = h.insertRow();
      var hc1 = hr.insertCell();
     // hc1.style.backgroundColor = "RED";
      hc1.width = '20';
      var hTitleIcon = MO.RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ MO.Context.get('FUiMessageDialog:MessageContext');
      var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
      hItemBody.height = 100;
      o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
      hItemBody.style.padding = '5';
      hItemBody.vAlign = "top";
      var hDiv = MO.RBuilder.appendDiv(hItemBody);
      hDiv.style.height = '100px';
      hDiv.style.overflow = "auto";
      var hItemBodyForm = o.hItemBodyForm = MO.RBuilder.appendTable(hDiv);
      hItemBodyForm.style.border = '2px solid #FFFFFF';
      hItemBodyForm.width = "100%";
      //hItemBodyForm.style.tableLayout = "fixed";
      hItemBodyForm.style.vAlign = "top";
      // 消息体<table>
      var hTab2 = o.hDescForm = MO.RBuilder.appendTable(o.hMsgPanel);
      hTab2.style.tableLayout = "fixed";
      hTab2.style.border='2px solid #EEEDED';
      hTab2.style.borderTopWidth = 0;
      //var hDescTitle = o.hDescTitle = hTab2.insertRow().insertCell();
      //hDescTitle.height = 25;
      //var h = MO.Window.Builder.appendTable(hDescTitle);
      //h.height = '100%';
      //h.width = '100%';
      //h.style.backgroundColor = "#F5F5F5";
      //h.style.border = "1px solid red";
      /*var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = 20;
      var hDescIcon = MO.Window.Builder.appendIcon(hc1, null, null, 16, 14);
      hDescIcon.src = o.styleIconPath('DescIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+RContext.get('FUiMessageDialog:MessageDetail');
      hc2.style.cursor = 'hand';
      o.attachEvent('onDescClick', hc2);
      var hDescBody = o.hDescBody = hTab2.insertRow().insertCell();
      hDescBody.style.display = 'none';
      //hDescBody.style.border = '1px solid red';
      hDescBody.height = "200";
      var hDescDiv = o.hDescDiv = MO.Window.Builder.appendDiv(hDescBody);
      hDescDiv.style.overflow = 'auto';
      hDescDiv.style.width = '100%';
      hDescDiv.style.height = '100%';
      hDescDiv.style.border = '2px solid F9F9F9';*/
   }
   o.hItmeForm.style.display = 'none';
   o.hDescForm.style.display = 'none';
   o.hMsgPanel.style.height = '100%';
   if(EMessage.Fatal == o._type || EMessage.Error == o._type){
      o.hItmeForm.style.display = 'block';
      o.hDescForm.style.display = 'block';
   }else{
      o.hItmeForm.style.display = 'block';
     // o.hItmeForm.height = '100%';
   }
   //o.hItemTitle.innerText = '标题列表:' + o._type;
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onBuildButtons = function FUiMessageDialog_onBuildButtons(t){
   var o = this;
   if(!o._type){
      var hBtnTab = MO.Window.Builder.appendTable(o._hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      // blank
      var hc = o._hBlank = hRow.insertCell();
      hc.width='72%';
      // Ok
      var b = o.btnOk = MO.Class.create(MO.FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      // Cancel
      var b = o.btnCancel = MO.Class.create(MO.FButton);
      b.icon = 'tool.cancel';
      b.label = MO.RContext.get('FToolButton:cancel');
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
// ------------------------------------------------------------
MO.FUiMessageDialog_onOk = function FUiMessageDialog_onOk(){
   var o = this;
   var g = o._messageArg;
   var cg = g.argument;
   // 根据类型决定处理过程
   var type = o.msgs.get(0)._type;
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
MO.FUiMessageDialog_onCancel = function FUiMessageDialog_onCancel(){
   this.hide();
}
// ------------------------------------------------------------
MO.FUiMessageDialog_onClose = function FUiMessageDialog_onClose(){
   this.hide();
}
// ------------------------------------------------------------
// g:argument:TMessageArg
MO.FUiMessageDialog_loadMessages = function FUiMessageDialog_loadMessages(g){
   var o = this;
   o._messageArg = g;
   var ms = g.messages;
   //如果sention超时,跳转画面
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
      var hIcon =  MO.Window.Builder.appendIcon(hc1, null, n, 16, 16);
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
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FUiMessageDialog:Fatal'));
   }
}
// ------------------------------------------------------------
MO.FUiMessageDialog_show = function FUiMessageDialog_show(){
   var o = this;
   o.__base.FUiWindow.show.call(o);
   //o.hDescBody.style.display = 'none';
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
// ------------------------------------------------------------
MO.FUiMessageDialog_hide = function FUiMessageDialog_hide(){
   var o = this;
   o.__base.FUiWindow.hide.call(o);
   // 关闭加载状态
   var f = o._messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   // 允许窗口操作
   RWindow.setEnable(true);
}
// ------------------------------------------------------------
MO.FUiMessageDialog_dispose = function FUiMessageDialog_dispose(){
   var o = this;
   o.__base.FUiWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o._hButtonPanel = null;
}
