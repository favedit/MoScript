function MUiToolButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FUiToolBar(o){
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
   o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
   o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = FUiToolBar_onBuildPanel;
   o.onEnter           = RMethod.empty;
   o.onLeave           = RMethod.empty;
   o.appendChild       = FUiToolBar_appendChild;
   o.removeChild       = FUiToolBar_removeChild;
   o.dispose           = FUiToolBar_dispose;
   return o;
}
function FUiToolBar_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiToolBar_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, MUiToolButton)){
      var h = o._hPanel;
      var hl = o._hLine;
      if(o._directionCd == EUiDirection.Horizontal){
         if(!hl){
            hl = o._hLine = RBuilder.appendTableRow(h);
         }
      }
      if(o._directionCd == EUiDirection.Vertical){
         hl = o._hLine = RBuilder.appendTableRow(h);
      }
      var hc = RBuilder.appendTableCell(hl, o.styleName('ButtonPanel'));
      hc._hParentLine = hl;
      p.setPanel(hc);
   }
}
function FUiToolBar_removeChild(p){
   var o = this;
   if(RClass.isClass(p, MUiToolButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParent = null;
      p._hParentLine = null;
   }
   o.__base.FUiContainer.removeChild.call(o, p);
}
function FUiToolBar_dispose(){
   var o = this;
   o._hLine = RHtml.free(o._hLine);
   o.__base.FUiContainer.dispose.call(o);
}
function FUiToolButton(o){
   o = RClass.inherits(this, o, FUiControl, MUiToolButton, MListenerClick);
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._action          = RClass.register(o, new APtyString('_action'));
   o._styleNormal     = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover      = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress      = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable    = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIconPanel  = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleSpacePanel = RClass.register(o, new AStyle('_styleSpacePanel'));
   o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = FUiToolButton_onBuildPanel;
   o.onBuild          = FUiToolButton_onBuild;
   o.onEnter          = FUiToolButton_onEnter;
   o.onLeave          = FUiToolButton_onLeave;
   o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiToolButton_onMouseDown);
   o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiToolButton_onMouseUp);
   o.icon             = FUiToolButton_icon;
   o.setIcon          = FUiToolButton_setIcon;
   o.setLabel         = FUiToolButton_setLabel;
   o.setHint          = FUiToolButton_setHint;
   o.setEnable        = FUiToolButton_setEnable;
   o.click            = FUiToolButton_click;
   o.dispose          = FUiToolButton_dispose;
   return o;
}
function FUiToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   var hf = o._hForm = RBuilder.appendTable(h);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o.hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hlp = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
      hlp.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
function FUiToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}
function FUiToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiToolButton_icon(){
   return this._icon;
}
function FUiToolButton_setIcon(p){
   var o = this;
   o._icon = p;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(o._icon);
   }
}
function FUiToolButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   var h = o._hLabelPanel;
   if(h){
      RHtml.textSet(h, s);
   }
}
function FUiToolButton_setHint(p){
   var o = this;
   o._hint = p;
   var s = RString.nvl(p);
   if(o._hint){
      if(o._hotkey){
         s += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = o._hint;
}
function FUiToolButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.oeEnable.call(o, e);
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
function FUiToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.processClickListener(o);
}
function FUiToolButton_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   o._hLine = RHtml.free(o._hLine);
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hIcon = RHtml.free(o._hIcon);
   o._hSpacePanel = RHtml.free(o._hSpacePanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiToolButtonCheck(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
   o._groupName      = RClass.register(o, new APtyString('_groupName'));
   o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
   o._statusChecked  = false;
   o.onEnter         = FUiToolButtonCheck_onEnter;
   o.onLeave         = FUiToolButtonCheck_onLeave;
   o.onMouseDown     = FUiToolButtonCheck_onMouseDown;
   o.onMouseUp       = FUiToolButtonCheck_onMouseUp;
   o.groupName       = FUiToolButtonCheck_groupName;
   o.setGroupName    = FUiToolButtonCheck_setGroupName;
   o.groupDefault    = FUiToolButtonCheck_groupDefault;
   o.setGroupDefault = FUiToolButtonCheck_setGroupDefault;
   o.innerCheck      = FUiToolButtonCheck_innerCheck;
   o.check           = FUiToolButtonCheck_check;
   o.dispose         = FUiToolButtonCheck_dispose;
   return o;
}
function FUiToolButtonCheck_onEnter(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Hover');
   }
}
function FUiToolButtonCheck_onLeave(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Normal');
   }
}
function FUiToolButtonCheck_onMouseDown(p){
   var o = this;
   o.check(!o._statusChecked);
   o.processClickListener(o, o._statusChecked);
}
function FUiToolButtonCheck_onMouseUp(){
   var o = this;
}
function FUiToolButtonCheck_groupName(){
   return this._groupName;
}
function FUiToolButtonCheck_setGroupName(p){
   this._groupName = p;
}
function FUiToolButtonCheck_groupDefault(){
   return this._groupDefault;
}
function FUiToolButtonCheck_setGroupDefault(p){
   this._groupDefault = p;
}
function FUiToolButtonCheck_innerCheck(p){
   var o = this;
   if(o._statusChecked != p){
      o._statusChecked = p;
      if(p){
         o._hPanel.className = o.styleName('Press');
      }else{
         o._hPanel.className = o.styleName('Normal');
      }
   }
}
function FUiToolButtonCheck_check(p){
   var o = this;
   if(!p){
      if(o._groupDefault == o){
         return;
      }
   }
   o.innerCheck(p);
   if(!o._parent){
      return;
   }
   if(p){
      if(!RString.isEmpty(o._groupName)){
         var cs = o._parent.components();
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            if(c != o){
               if(RClass.isClass(c, FUiToolButtonCheck)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      if(!RString.isEmpty(o._groupDefault)){
         var cs = o._parent.components();
         var c = cs.get(o._groupDefault);
         c.innerCheck(true);
      }
   }
}
function FUiToolButtonCheck_dispose(){
   var o = this;
   o._statusChecked = null;
   o._groupName = null;
   o.__base.FUiToolButton.dispose.call(o);
}
function FUiToolButtonMenu(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MDropable, MUiFocus);
   o.popup         = null;
   o.hDropPanel    = null;
   o._styleDropHover = RClass.register(o, new AStyleIcon('DropHover'));
   o.onBuild       = FUiToolButtonMenu_onBuild;
   o.onEnter       = FUiToolButtonMenu_onEnter;
   o.onLeave       = FUiToolButtonMenu_onLeave;
   o.onBlur        = FUiToolButtonMenu_onBlur;
   o.onButtonClick = FUiToolButtonMenu_onButtonClick;
   o.onDropClick   = FUiToolButtonMenu_onDropClick;
   o.construct     = FUiToolButtonMenu_construct;
   o.push          = FUiToolButtonMenu_push;
   o.drop          = FUiToolButtonMenu_drop;
   o.dispose       = FUiToolButtonMenu_dispose;
   return o;
}
function FUiToolButtonMenu_onEnter(e){
   var o = this;
   o.base.FUiToolButton.onEnter.call(o, e);
   if(!o.disabled){
      o.hDropIcon.src = o.styleIconPath('DropHover');
   }
}
function FUiToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.base.FUiToolButton.onLeave.call(o, e);
      if(!o.disabled){
         o.hDropIcon.src = o.styleIconPath('Drop');
      }
   }
}
function FUiToolButtonMenu_onBlur(e){
   var o = this;
   if(e){
      if(o.popup.testInRange(e)){
         return false;
      }
   }
   o.hPanel.className = o.style('Button');
   o.popup.hide();
}
function FUiToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.base.FUiToolButton.onButtonClick.call(o);
      if(!(o.action || o.page)){
         o.drop();
      }else if(o.action){
         eval(o.action);
      }
   }
}
function FUiToolButtonMenu_onDropClick(e){
   this.drop();
}
function FUiToolButtonMenu_onBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FUiToolButton.onBuild.call(o, e);
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
function FUiToolButtonMenu_construct(){
   var o = this;
   o.popup = RClass.create(FPopupMenu);
   o.popup.opener = o;
}
function FUiToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MMenuButton)){
      return o.popup.push(c);
   }
   o.base.FUiToolButton.push.call(o, c);
}
function FUiToolButtonMenu_drop(){
   var o = this;
   if(!o.disabled){
      o.popup.show(this.hDropPanel, EAlign.BottomRight);
   }
}
function FUiToolButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}
function FUiToolButtonSplit(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiToolButton);
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
   o.onBuild     = FUiToolButtonSplit_onBuild;
   return o;
}
function FUiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
function FUiToolButtonText(o){
   o = RClass.inherits(this, o, FUiToolButton);
   return o;
}
