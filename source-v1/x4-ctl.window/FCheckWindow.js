//==========================================================
// <T>检查错误窗口。</T>
//
// @class FWindow
// @history 091105 MAOCY 创建
//==========================================================
function FCheckWindow(o){
   o = RClass.inherits(this, o, FWindow);
   //..........................................................
   // @style
   o.stTablePanel   = RClass.register(o, new TStyle('TablePanel'));
   o.stButtonPanel  = RClass.register(o, new TStyle('ButtonPanel'));
   //..........................................................
   // @event
   o.onSelect       = RClass.register(o, new HClick('onSelect'), FCheckWindow_onSelect);
   o.onClose        = FCheckWindow_onClose;
   o.onBuildButtons = FCheckWindow_onBuildButtons;
   //..........................................................
   // @process
   o.oeBuild        = FCheckWindow_oeBuild;
   //..........................................................
   // @method
   o.set            = FCheckWindow_set;
   o.show           = FCheckWindow_show;
   o.hide           = FCheckWindow_hide;
   o.dispose        = FCheckWindow_dispose;
   return o;
}

//==========================================================
// <T>响应选取事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCheckWindow_onSelect(e){
   var o = this;
   var n = e.hSource.parentNode.parentNode.rowIndex;
   var c = o.ctrs.get(n);
   o.hide();
   //c.focus();
}

//==========================================================
// <T>响应关闭事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCheckWindow_onClose(){
   this.hide();
}

//==========================================================
// <T>建立按键。</T>
//
// @method
//==========================================================
function FCheckWindow_onBuildButtons(){
   var o = this;
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   var b = o.btnClose = RClass.create( FButton );
   b.icon = 'tool.exit';
   b.label = RContext.get('FToolButton:close');
   b.width = '100%';
   b.lsnsClick.register(o, o.onClose);
   b.psBuild(hRow.insertCell());
}

//==========================================================
// <T>建立底板。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCheckWindow_oeBuild(e){
   var o = this;
   var r = o.base.FWindow.oeBuild.call(o, e);
   if(e.isAfter()){
      o.setIcon('Picker');
      o.setCaption(' 检查错误');
      // Form (2colx1row)
      var hb = o.hBodyPanel;
      //hb.style.border = '1px solid red';
      hb.vAlign = 'top';
      var hTab = RBuilder.appendTable(o.hBodyPanel);
      o.hBodyPanel.style.height = '400';
      hTab.width = '100%';
      //hTab.height = '100%';
      // Button Panel
      var h = o.hButtonPanel = hTab.insertRow().insertCell();
      h.height = 1;
      //h.className = o.style('ButtonPanel');
      h.style.borderBottomStyle = 'solid';
      h.style.borderBottomWidth  = 'thin';
      // Message Panel
      var h = o.hTablePanel = hTab.insertRow().insertCell();
      h.style.border = '1px solid #A9C9E2';
      var hdv = o.hDivForm = RBuilder.appendDiv(h);
      var hHeadForm = RBuilder.appendTable(hdv);
      hHeadForm.style.width = '100%';
      var hc = hHeadForm.insertRow().insertCell();
      hc.style.height = '30';
      hc.style.backgroundColor = '#DBE5FA';
      hc.innerText =  RContext.get('FCheckWindow:Title');
      hc.style.padding = 10;
      hdv.scroll = 'auto';
      var hf = o.hCtrForm = RBuilder.appendTable(h);
      hf.style.padding = 10;
      //hf.border = '1px'
      hf.style.width = '100%';
      //h.className = o.style('TablePanel');
      //o.onBuildButtons();
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
//==========================================================
function FCheckWindow_set(tl){
   var o = this;
   var h = o.hCtrForm;
   h.innerText = '';
   o.ctrs = tl;
   for(var n = 0; n < tl.count; n++){
      var c = tl.get(n);
      var hr = h.insertRow();
      if(n % 2 == 0){
         hr.style.backgroundColor = '#EEFAFF';
      }else{
         hr.style.backgroundColor = '#FAFCFD';
      }
      var hc1 = hr.insertCell();
      hc1.style.height = '10px';
      hc1.innerText = n + 1;
      hc1.width = '20';
      var hc2 = hr.insertCell();
      hc2.innerHTML = '<span>' + RString.trim(c.label) + '</span>';
      var htx = hc2.childNodes[0];
      htx.style.textDecoration = "underline";
      htx.style.cursor = 'hand';
      o.attachEvent('onSelect', htx);
      var hc3 = hr.insertCell();
      hc3.innerText = c._validText;
   }
}

//==========================================================
// <T>显示窗口。</T>
//
// @method
//==========================================================
function FCheckWindow_show(){
   var o = this;
   o.base.FWindow.show.call(o);
   RWindow.setEnable(false, true);
   RWindow.moveCenter(o.hPanel);
   o.psVisible(true);
   o.focus();
}

//==========================================================
// <T>关闭窗口。</T>
//
// @method
//==========================================================
function FCheckWindow_hide(){
   var o = this;
   o.base.FWindow.hide.call(o);
   RWindow.setEnable(true);
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FCheckWindow_dispose(){
   var o = this;
   o.base.FWindow.dispose.call(o);
   o.hBodyPanel = null;
   o.hTablePanel = null;
   o.hCtrForm = null;
   o.hPanel = null;
}
