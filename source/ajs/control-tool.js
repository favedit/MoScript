function FToolBar(o){
   o = RClass.inherits(this, o, FContainer);
   o._hLine       = null;
   o.onBuildPanel = FToolBar_onBuildPanel;
   o.appendButton = FToolBar_appendButton;
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
   o._icon         = RClass.register(o, new APtyString('_icon'));
   o._iconDisable  = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('_hotkey'));
   o._action       = RClass.register(o, new APtyString('_action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hLabel       = null;
   o.lsnsClick     = new TListeners();
   o.onBuildPanel  = FToolButton_onBuildPanel;
   o.onBuild       = FToolButton_onBuild;
   o.onEnter       = FToolButton_onEnter;
   o.onLeave       = FToolButton_onLeave;
   o.onMouseDown   = FToolButton_onMouseDown;
   o.onMouseUp     = FToolButton_onMouseUp;
   o.icon          = FToolButton_icon;
   o.setIcon       = FToolButton_setIcon;
   o.setLabel      = FToolButton_setLabel;
   o.setEnable     = FToolButton_setEnable;
   o.click         = FToolButton_click;
   o.dispose       = FToolButton_dispose;
   return o;
}
function FToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FToolButton_onBuild(p){
   var o = this;
   o.__base.FControl.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      var s = o._label;
      if(o._hIcon){
      }
      o.hLabel = RBuilder.appendText(h, o.styleName('Label'), s);
   }
}
function FToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}
function FToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FToolButton_icon(){
   return this._icon;
}
function FToolButton_setIcon(p){
   this._icon = p;
}
function FToolButton_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hLabel){
      o._hLabel.innerText = p;
   }
}
function FToolButton_setEnable(p){
   var o = this;
   o.__base.FControl.oeEnable.call(o, e);
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
   var css = o.styleName(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   var css = o.styleName(e.enable ? 'Button' : 'Disable');
   if(o._hPanel.className != css){
      o._hPanel.className = css;
   }
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}
function FToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.lsnsClick.process(o);
}
function FToolButton_dispose(){
   var o = this;
   o._hButton = null;
   o._hButtonLine = null;
   o._hButtonPanel = null;
   o._hIcon = null;
   o._hText = null;
   o.__base.FControl.dispose.call(o);
}
function FToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
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
   o._styleDropHover = RClass.register(o, new AStyleIcon('DropHover'));
   o.onBuild       = FToolButtonMenu_onBuild;
   o.onEnter       = FToolButtonMenu_onEnter;
   o.onLeave       = FToolButtonMenu_onLeave;
   o.onBlur        = FToolButtonMenu_onBlur;
   o.onButtonClick = FToolButtonMenu_onButtonClick;
   o.onDropClick   = FToolButtonMenu_onDropClick;
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
function FToolButtonMenu_onBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FToolButton.onBuild.call(o, e);
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
   return o;
}
function FToolButtonSplit_onBuild(event){
   var o = this;
   o.base.FControl.onBuild.call(o, event);
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
