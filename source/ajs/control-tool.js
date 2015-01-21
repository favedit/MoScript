function FToolBar(o){
   o = RClass.inherits(this, o, FContainer);
   o._hLine           = null;
   o.onBuildPanel = FToolBar_onBuildPanel;
   o.appendButton     = FToolBar_appendButton;
   return o;
}
function FToolBar_onBuildPanel(e){
   var o = this;
   var hc = o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(hc);
}
function FToolBar_appendButton(p){
   var o = this;
   var hr = o._hLine;
   var hc = RBuilder.appendTableCell(hr);
   p.setPanel(hc);
}
function FToolBar_addClickListener(name, method){
   var btn = this.component(name);
   if(btn){
      btn.addClickListener(new TListener(this, method));
   }
}
function FToolBar_button(name){
   return this.components.get(name);
}
function FToolBar_setVisibles(vs){
   var o = this;
   for(var n in vs){
      o.button(n).setVisible(vs[n]);
   }
}
function FToolBar_setEnables(vs){
   var o = this;
   for(var n in vs){
      o.button(n).psEnable(vs[n]);
   }
}
function FToolBar_clear(){
   if(this.hTable && this._hLine){
      this._hLine.removeNode(true);
      this._hLine = this.hTable.insertRow();
   }
   this.buttons = new Array();
}
function FToolBar_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o._hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o._hLine = null;
   o.hParent = null;
}
function FToolButton(o){
   o = RClass.inherits(this, o, FControl);
   o._type            = RClass.register(o, new APtyString('_type'));
   o._action          = RClass.register(o, new APtyString('_action'));
   o._dataAction      = RClass.register(o, new APtyString('_dataAction'));
   o._service         = RClass.register(o, new APtyString('_service'));
   o._target          = RClass.register(o, new APtyString('_target'));
   o._page            = RClass.register(o, new APtyString('_page'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._method          = RClass.register(o, new APtyString('_method'));
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._attributes      = RClass.register(o, new APtyString('_attributes'));
   o.onButtonClick   = RClass.register(o, new AEventClick('onButtonClick'), FToolButton_onButtonClick);
   o._styleButton        = RClass.register(o, new AStyle('_styleButton', 'Button'));
   o._styleDisable       = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon          = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIconDisable   = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   o._styleLabel         = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleHover         = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress         = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o.lsnsClick       = new TListeners();
   o._disabled        = false;
   o._hButton         = null;
   o._hButtonLine     = null;
   o._hButtonPanel    = null;
   o._hIcon           = null;
   o._hLabel           = null;
   o.onBuildPanel    = FToolButton_onBuildPanel;
   o.onEnter         = FToolButton_onEnter;
   o.onLeave         = FToolButton_onLeave;
   o.onMouseDown     = FToolButton_onMouseDown;
   o.onMouseUp       = FToolButton_onMouseUp;
   o.onShowHint      = FToolButton_onShowHint;
   o.oeBuild         = FToolButton_oeBuild;
   o.oeEnable        = FToolButton_oeEnable;
   o.setLabel        = FToolButton_setLabel;
   o.dispose         = FToolButton_dispose;
   return o;
}
function FToolButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var t = o.parent;
   var h = o.hPanel;
   var hb = o._hButton = RBuilder.appendTable(o.hPanel, o.style('Panel'));
   hb.background = o.styleIconPath('Button', FToolButton);
   var hLine = o._hButtonLine = o._hButton.insertRow();
   var hCel = o._hButtonPanel = hLine.insertCell();
   o.attachEvent('onButtonClick', o._hButtonPanel);
   hCel.className = t.style('Button');
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o._hLabel = RBuilder.append(hCel, 'SPAN');
      o._hLabel.innerHTML = '&nbsp;' + o.label;
   }
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, new TListener(o, o.onButtonClick));
   }
   return EEventStatus.Stop;
}
function FToolButton_oeEnable(e){
   var o = this;
   o.base.FControl.oeEnable.call(o, e);
   o._disabled = !e.enable;
   if(e.enable && o._icon){
      var is = RRes._iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = RRes._iconPath(o._iconDisable);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }
   var css = o.style(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   var css = o.style(e.enable ? 'Button' : 'Disable');
   if(o.hPanel.className != css){
      o.hPanel.className = css;
   }
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}
function FToolButton_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Button'));
}
function FToolButton_onEnter(e){
   var o = this;
   if(o._hotkey || o.hint){
      if(!o.hintBox){
         o.hintBox = RConsole.find(FHintConsole).find();
      }
      o.hintBox.linkControl(o);
      o.active = new TActive(o, o.onShowHint);
      o.active.count = 300;
      RConsole.find(FActiveConsole).push(o.active);
   }
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
      o._hButton.background = o.styleIconPath('ButtonHover', FToolButton);
   }
}
function FToolButton_onLeave(e){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
      o.hintBox = null;
   }
   if(!o._disabled){
      o.hPanel.className = o.style('Button');
      o._hButton.background = o.styleIconPath('Button', FToolButton);
   }
}
function FToolButton_onMouseDown(){
   var o = this;
   if(o.hintBox){
      o.hintBox.hide();
   }
   if(!o._disabled){
   }
}
function FToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FToolButton_onButtonClick(h){
   var o = this;
   RLogger.debug(o, '[D] onButtonClick = ' + o.name);
   if(o.isVisible() && !o._disabled && (EAction.Design != o.inAction)){
      var fc = RConsole.find(FFocusConsole);
      fc.storeFocus();
      fc.blur();
      o.lsnsClick.process(o);
      if(o._action){
         eval(o._action);
      }
      if(o._service){
         var servs = RString.splitTwo(o._service, '@');
         var f = RConsole.find(FFocusConsole).findClass(MDataset);
         var arg = new TDatasetServiceArg(f.name, o._dataAction);
         arg.callback = new TInvoke(f, f.onDsProcess);
         arg.rows = f.getCurrentRows();
         RConsole.find(FFormConsole).process(arg);
      }
      if(o._page || o._method){
         var form = RHtml.form(o._hButton);
         var p = RPage.parse(o._page);
         if(o._method){
            p._action = o._method;
         }
         p.split(o._attributes);
         var f = RConsole.find(FFocusConsole).findClass(MDataset);
         if(f){
            var as = new TAttributes();
            f.saveValue(as);
            if(form && form.form_pack){
               form.form_pack.value = as.pack();
            }
         }
         p.post(form, o._target);
      }
      o.processClick();
   }
}
function FToolButton_click(){
   this.onClick();
}
function FToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
function FToolButton_setLabel(s){
   this._hLabel.innerText = s;
}
function FToolButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hButtonLine);
   RMemory.freeHtml(o._hButton);
   RMemory.freeHtml(o._hLabel);
   RMemory.freeHtml(o._hButtonPanel);
   RMemory.freeHtml(o._hIcon);
   o._hButton = null;
   o._hButtonLine = null;
   o._hLabel = null;
   o._hIcon = null;
   o._hButtonPanel = null;
}
function FToolButtonCheck(o){
   o = RClass.inherits(this, o, FToolButton);
   o.down         = RClass.register(o, new APtyBoolean('down', false));
   o.onEnter      = FToolButtonCheck_onEnter;
   o.onLeave      = FToolButtonCheck_onLeave;
   o.onMouseDown  = FToolButtonCheck_onMouseDown;
   o.onMouseUp    = FToolButtonCheck_onMouseUp;
   o.setDown      = FToolButtonCheck_setDown;
   o.dispose      = FToolButtonCheck_dispose;
   return o;
}
function FToolButtonCheck_onEnter(){
   if(!this.down){
      this.hPanel.className = this.style('Hover');
   }
}
function FToolButtonCheck_onLeave(){
   if(!this.down){
      this.hPanel.className = this.style('Button');
   }
}
function FToolButtonCheck_onMouseDown(){
   this.hPanel.className = this.style('Press');
}
function FToolButtonCheck_onMouseUp(){
   var o = this;
   o.hPanel.className = o.style('Hover');
   o.setDown(!o.down)
   if(o.action){
      eval(o.action);
   }
   o.processClick(o, o.down);
}
function FToolButtonCheck_setDown(down){
   var o = this;
   if(o.down != down){
      o.down = down;
      if(down){
         o.hPanel.className = o.style('Down');
      }else{
         o.hPanel.className = o.style('Button');
      }
   }
}
function FToolButtonCheck_dispose(){
   var o = this;
   o.base.FToolButton.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function FToolButtonMenu(o){
   o = RClass.inherits(this, o, FToolButton, MContainer, MDropable, MFocus);
   o.popup         = null;
   o.hDropPanel    = null;
   o.siDropHover   = RClass.register(o, new AStyleIcon('DropHover'));
   o.onEnter       = FToolButtonMenu_onEnter;
   o.onLeave       = FToolButtonMenu_onLeave;
   o.onBlur        = FToolButtonMenu_onBlur;
   o.onButtonClick = FToolButtonMenu_onButtonClick;
   o.onDropClick   = FToolButtonMenu_onDropClick;
   o.oeBuild       = FToolButtonMenu_oeBuild;
   o.construct     = FToolButtonMenu_construct;
   o.push          = FToolButtonMenu_push;
   o.drop          = FToolButtonMenu_drop;
   o.dispose       = FToolButtonMenu_dispose;
   return o;
}
function FToolButtonMenu_onEnter(e){
   var o = this;
   o.base.FToolButton.onEnter.call(o, e);
   if(!o.disabled){
      o.hDropIcon.src = o.styleIconPath('DropHover');
   }
}
function FToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.base.FToolButton.onLeave.call(o, e);
      if(!o.disabled){
         o.hDropIcon.src = o.styleIconPath('Drop');
      }
   }
}
function FToolButtonMenu_onBlur(e){
   var o = this;
   if(e){
      if(o.popup.testInRange(e)){
         return false;
      }
   }
   o.hPanel.className = o.style('Button');
   o.popup.hide();
}
function FToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.base.FToolButton.onButtonClick.call(o);
      if(!(o.action || o.page)){
         o.drop();
      }else if(o.action){
         eval(o.action);
      }
   }
}
function FToolButtonMenu_onDropClick(e){
   this.drop();
}
function FToolButtonMenu_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FToolButton.oeBuild.call(o, e);
      var h = o.hDropPanel = o.hButtonLine.insertCell();
      h.className = o.style('Drop')
      o.hDropIcon = RBuilder.appendIcon(h, o.styleIcon('Drop'));
      o.attachEvent('onDropClick', h);
   }
   if(e.isAfter()){
      o.popup.psBuild();
   }
   return EEventStatus.Continue;
}
function FToolButtonMenu_construct(){
   var o = this;
   o.popup = RClass.create(FPopupMenu);
   o.popup.opener = o;
}
function FToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MMenuButton)){
      return o.popup.push(c);
   }
   o.base.FToolButton.push.call(o, c);
}
function FToolButtonMenu_drop(){
   var o = this;
   if(!o.disabled){
      o.popup.show(this.hDropPanel, EAlign.BottomRight);
   }
}
function FToolButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}
function FToolButtonSplit(o){
   o = RClass.inherits(this, o, FControl);
   o.styleButton  = RClass.register(o, new AStyle('Button'));
   o.hButton      = null;
   o.oeBuild      = FToolButtonSplit_oeBuild;
   o.onBuildPanel = FToolButtonSplit_onBuildPanel;
   o.dispose      = FToolButtonSplit_dispose;
   return o;
}
function FToolButtonSplit_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   o.hButton = RBuilder.append(this.hPanel, 'DIV', o.style('Button'));
   return EEventStatus.Stop;
}
function FToolButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Panel'));
}
function FToolButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hButton = null;
}
function FToolButtonText(o){
   o = RClass.inherits(this, o, FToolButton);
   return o;
}
