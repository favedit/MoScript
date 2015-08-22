MO.FDuiMenuBar = function FDuiMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiMenuBar_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.appendChild       = MO.FDuiMenuBar_appendChild;
   o.removeChild       = MO.FDuiMenuBar_removeChild;
   o.dispose           = MO.FDuiMenuBar_dispose;
   return o;
}
MO.FDuiMenuBar_onBuildPanel = function FDuiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
   o._hLine = MO.Window.Builder.appendTableRow(h);
}
MO.FDuiMenuBar_appendChild = function FDuiMenuBar_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.MUiMenuButton)){
      var hLine = o._hLine;
      var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ButtonPanel'));
      hCell._hParentLine = hLine;
      control.setPanel(hCell);
   }
}
MO.FDuiMenuBar_removeChild = function FDuiMenuBar_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, FDuiMenuButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiMenuBar_dispose = function FDuiMenuBar_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiMenuButton = function FDuiMenuButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._icon            = MO.Class.register(o, new MO.APtyString('_icon'));
   o._iconDisable     = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   o._hotkey          = MO.Class.register(o, new MO.APtyString('_hotkey'));
   o._action          = MO.Class.register(o, new MO.APtyString('_action'));
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = MO.FDuiMenuButton_onBuildPanel
   o.onBuild          = MO.FDuiMenuButton_onBuild;
   o.onEnter          = MO.FDuiMenuButton_onEnter;
   o.onLeave          = MO.FDuiMenuButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiMenuButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiMenuButton_onMouseUp);
   o.icon             = MO.FDuiMenuButton_icon;
   o.setIcon          = MO.FDuiMenuButton_setIcon;
   o.setLabel         = MO.FDuiMenuButton_setLabel;
   o.setHint          = MO.FDuiMenuButton_setHint;
   o.setEnable        = MO.FDuiMenuButton_setEnable;
   o.click            = MO.FDuiMenuButton_click;
   o.dispose          = MO.FDuiMenuButton_dispose;
   return o;
}
MO.FDuiMenuButton_onBuildPanel = function FDuiMenuButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Normal'));
}
MO.FDuiMenuButton_onBuild = function FDuiMenuButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiMenuButton_onEnter = function FDuiMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiMenuButton_onLeave = function FDuiMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
MO.FDuiMenuButton_onMouseDown = function FDuiMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
MO.FDuiMenuButton_onMouseUp = function FDuiMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiMenuButton_icon = function FDuiMenuButton_icon(){
   return this._icon;
}
MO.FDuiMenuButton_setIcon = function FDuiMenuButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiMenuButton_setLabel = function FDuiMenuButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiMenuButton_setHint = function FDuiMenuButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = text;
}
MO.FDuiMenuButton_setEnable = function FDuiMenuButton_setEnable(p){
   var o = this;
   o.__base.FDuiControl.setEnable.call(o, p);
   if(p){
      o._hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o._hIcon.src = RRes._iconPath(o._icon);
      }
   }else{
      o._hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o._hIcon.src = RRes._iconPath(o._iconDisable);
      }
   }
}
MO.FDuiMenuButton_click = function FDuiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiMenuButton_dispose = function FDuiMenuButton_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiMenuButtonMenu = function FDuiMenuButtonMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._action      = MO.Class.register(o, new MO.APtyString('action', null));
   o._target      = MO.Class.register(o, new MO.APtyString('target', null));
   o._page        = MO.Class.register(o, new MO.APtyString('page'));
   o._hotkey      = MO.Class.register(o, new MO.APtyString('hotkey'));
   o._method      = MO.Class.register(o, new MO.APtyString('method'));
   o._icon        = MO.Class.register(o, new MO.APtyString('icon', null));
   o._iconDisable = MO.Class.register(o, new MO.APtyString('iconDisable', null));
   o._attributes  = MO.Class.register(o, new MO.APtyString('attributes'));
   o._disabled    = false;
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   o.oeBuild      = MO.FDuiMenuButtonMenu_oeBuild;
   o.oeEnable     = MO.FDuiMenuButtonMenu_oeEnable;
   o.oeDisable    = MO.FDuiMenuButtonMenu_oeDisable;
   o.onBuildPanel = MO.FDuiMenuButtonMenu_onBuildPanel;
   o.onEnter      = MO.FDuiMenuButtonMenu_onEnter;
   o.onLeave      = MO.FDuiMenuButtonMenu_onLeave;
   o.onMouseDown  = MO.FDuiMenuButtonMenu_onMouseDown;
   o.onMouseUp    = MO.FDuiMenuButtonMenu_onMouseUp;
   o.onClick      = MO.FDuiMenuButtonMenu_onClick;
   o.construct    = MO.FDuiMenuButtonMenu_construct;
   o.dispose      = MO.FDuiMenuButtonMenu_dispose;
   return o;
}
MO.FDuiMenuButtonMenu_oeBuild = function FDuiMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = MO.Window.Builder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o._icon){
      o.hIcon = MO.Window.Builder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o.hLabel = MO.Window.Builder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_onBuildPanel = function FDuiMenuButtonMenu_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'DIV');
}
MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FDuiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FDuiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_onEnter = function FDuiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
MO.FDuiMenuButtonMenu_onLeave = function FDuiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
MO.FDuiMenuButtonMenu_onMouseDown = function FDuiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
MO.FDuiMenuButtonMenu_onMouseUp = function FDuiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
MO.FDuiMenuButtonMenu_onClick = function FDuiMenuButtonMenu_onClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FFocusConsole).focus(o);
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
         var form = MO.Window.Html.form(o.hButton);
         var p = RPage.parse(o._page);
         if(o._method){
            p._action = o._method;
         }
         p.split(o._attributes);
         p.post(form, o._target);
      }
      o.processClick();
   }
}
MO.FDuiMenuButtonMenu_construct = function FDuiMenuButtonMenu_construct(){
   var o = this;
   o.base.FDuiControl.construct.call(o);
}
MO.FDuiMenuButtonMenu_dispose = function FDuiMenuButtonMenu_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   o.hPanel = MO.Window.Html.free(o.hPanel);
   o.hButton = MO.Window.Html.free(o.hButton);
   o.hIcon = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
MO.FDuiMenuButtonSplit = function FDuiMenuButtonSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._stylePanelHorizontal = MO.Class.register(o, new MO.AStyle('_stylePanelHorizontal'));
   o._stylePanelVertical   = MO.Class.register(o, new MO.AStyle('_stylePanelVertical'));
   o.onBuild               = MO.FDuiMenuButtonSplit_onBuild;
   return o;
}
MO.FDuiMenuButtonSplit_onBuild = function FDuiMenuButtonSplit_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   if(MO.Class.isClass(o._parent, MO.FDuiMenuBar)){
      hPanel.className = o.styleName('PanelVertical');
   }else{
      hPanel.className = o.styleName('PanelHorizontal');
   }
}
MO.FDuiPopupMenu = function FDuiPopupMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiPopup);
   o._stylePanel     = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleForm      = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleButton    = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._opener         = null;
   o._visible        = false;
   o._statusVisible  = false;
   o._hContainer     = null;
   o._hLabel         = null;
   o._hButtonPanel   = null;
   o._hIcon          = null;
   o._hText          = null;
   o.onBuild         = MO.FDuiPopupMenu_onBuild;
   o.appendChild     = MO.FDuiPopupMenu_appendChild;
   o.show            = MO.FDuiPopupMenu_show;
   o.setVisible      = MO.FDuiPopupMenu_setVisible;
   o.testInRange     = MO.FDuiPopupMenu_testInRange;
   o.doBlur          = MO.FDuiPopupMenu_doBlur;
   o.dispose         = MO.FDuiPopupMenu_dispose;
   return o;
}
MO.FDuiPopupMenu_onBuild = function FDuiPopupMenu_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Form'));
   var hLineTop = o._hLineTop = MO.Window.Builder.appendTableCell(hForm);
   hLineTop.bgColor = '#666666';
   hLineTop.height = '2px';
   var hContainerPanel = o._hContainerPanel = MO.Window.Builder.appendTableCell(hForm);
   var hLineBottom = o._hLineBottom = MO.Window.Builder.appendTableCell(hForm);
   hLineBottom.bgColor = '#666666';
   hLineBottom.height = '2px';
   var hContainer = o._hContainer = MO.Window.Builder.appendTable(hContainerPanel, o.styleName('Container'));
}
MO.FDuiPopupMenu_doBlur = function FDuiPopupMenu_doBlur(){
   var o = this;
}
MO.FDuiPopupMenu_appendChild = function FDuiPopupMenu_appendChild(control){
   var o = this;
   var hButtonPanel = MO.Window.Builder.appendTableRowCell(o._hContainer);
   hButtonPanel.className = o.styleName('Button');
   hButtonPanel.appendChild(control._hPanel);
}
MO.FDuiPopupMenu_show = function FDuiPopupMenu_show(h, positionCd, v){
   var o = this;
   var hPanel = o._hPanel;
   var opener = o._opener;
   o.setVisible(true);
   var hOpener = opener._hPanel;
   var openerWidth = hOpener.offsetWidth;
   var openerHeight = hOpener.offsetHeight;
   var width = hPanel.offsetWidth;
   var height = hPanel.offsetHeight;
   var style = hPanel.style;
   if(width < openerWidth){
      width = openerWidth;
   }
   if(height > 300){
      o._hContainerPanel.style.overflowY = 'scroll';
      style.height = height + 'px';
   }
   style.left = '3px';
   style.top = (openerHeight + 1) + 'px';
   style.width = width + 'px';
   style.zIndex = MO.RDuiLayer.next();
}
MO.FDuiPopupMenu_setVisible = function FDuiPopupMenu_setVisible(visible){
   var o = this;
   var opener = o._opener;
   o._statusVisible = visible;
   var hOpener = opener._hPanelCell;
   var hPanel = o.panel(MO.EPanel.Container);
   if(visible){
      hOpener.appendChild(hPanel);
   }else{
      hOpener.removeChild(hPanel);
   }
}
MO.FDuiPopupMenu_testInRange = function FDuiPopupMenu_testInRange(e){
   return this == RControl.htmlControl(e.srcElement, FDuiPopupMenu);
}
MO.FDuiPopupMenu_dispose = function FDuiPopupMenu_dispose(e){
   var o = this;
   o._hContainer = MO.Window.Html.free(o._hContainer);
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o._hLastRow = MO.Window.Html.free(o._hLastRow);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiSliderButton = function FDuiSliderButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._icon            = MO.Class.register(o, new MO.APtyString('_icon'));
   o._iconDisable     = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   o._hotkey          = MO.Class.register(o, new MO.APtyString('_hotkey'));
   o._action          = MO.Class.register(o, new MO.APtyString('_action'));
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = MO.FDuiSliderButton_onBuildPanel
   o.onBuild          = MO.FDuiSliderButton_onBuild;
   o.onEnter          = MO.FDuiSliderButton_onEnter;
   o.onLeave          = MO.FDuiSliderButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSliderButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiSliderButton_onMouseUp);
   o.icon             = MO.FDuiSliderButton_icon;
   o.setIcon          = MO.FDuiSliderButton_setIcon;
   o.setLabel         = MO.FDuiSliderButton_setLabel;
   o.setHint          = MO.FDuiSliderButton_setHint;
   o.setEnable        = MO.FDuiSliderButton_setEnable;
   o.click            = MO.FDuiSliderButton_click;
   o.dispose          = MO.FDuiSliderButton_dispose;
   return o;
}
MO.FDuiSliderButton_onBuildPanel = function FDuiSliderButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Normal'));
}
MO.FDuiSliderButton_onBuild = function FDuiSliderButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiSliderButton_onEnter = function FDuiSliderButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiSliderButton_onLeave = function FDuiSliderButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
MO.FDuiSliderButton_onMouseDown = function FDuiSliderButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
MO.FDuiSliderButton_onMouseUp = function FDuiSliderButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiSliderButton_icon = function FDuiSliderButton_icon(){
   return this._icon;
}
MO.FDuiSliderButton_setIcon = function FDuiSliderButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiSliderButton_setLabel = function FDuiSliderButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiSliderButton_setHint = function FDuiSliderButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = text;
}
MO.FDuiSliderButton_setEnable = function FDuiSliderButton_setEnable(p){
   var o = this;
   o.__base.FDuiControl.setEnable.call(o, p);
   if(p){
      o._hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o._hIcon.src = RRes._iconPath(o._icon);
      }
   }else{
      o._hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o._hIcon.src = RRes._iconPath(o._iconDisable);
      }
   }
}
MO.FDuiSliderButton_click = function FDuiSliderButton_click(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiSliderButton_dispose = function FDuiSliderButton_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiSliderGroup = function FDuiSliderGroup(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._styleIconPanel   = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel  = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel  = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiSliderGroup_onBuildPanel;
   o.onBuild           = MO.FDuiSliderGroup_onBuild;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.setIcon           = MO.FDuiSliderGroup_setIcon;
   o.setLabel          = MO.FDuiSliderGroup_setLabel;
   o.appendChild       = MO.FDuiSliderGroup_appendChild;
   o.removeChild       = MO.FDuiSliderGroup_removeChild;
   o.dispose           = MO.FDuiSliderGroup_dispose;
   return o;
}
MO.FDuiSliderGroup_onBuildPanel = function FDuiSliderGroup_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiSliderGroup_onBuild = function FDuiSliderGroup_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
   var hForm = o._hForm = MO.Window.Builder.appendTable(hCell);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiSliderGroup_setIcon = function FDuiSliderGroup_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiSliderGroup_setLabel = function FDuiSliderGroup_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiSliderGroup_appendChild = function FDuiSliderGroup_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.FDuiSliderButton)){
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
      control.setPanel(hCell);
   }
}
MO.FDuiSliderGroup_removeChild = function FDuiSliderGroup_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, FDuiSliderButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiSliderGroup_dispose = function FDuiSliderGroup_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiSliderMenu = function FDuiSliderMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleMenuPanel   = MO.Class.register(o, new MO.AStyle('_styleMenuPanel'));
   o._styleGroupPanel  = MO.Class.register(o, new MO.AStyle('_styleGroupPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiSliderMenu_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.appendChild       = MO.FDuiSliderMenu_appendChild;
   o.removeChild       = MO.FDuiSliderMenu_removeChild;
   o.dispose           = MO.FDuiSliderMenu_dispose;
   return o;
}
MO.FDuiSliderMenu_onBuildPanel = function FDuiSliderMenu_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   var hMenuPanel = o._hMenuPanel = MO.Window.Builder.appendTableRowCell(hPanel, o.styleName('MenuPanel'));
   hMenuPanel.align = 'center';
   MO.Window.Builder.appendIcon(hMenuPanel, null, 'editor.design.menuv|png');
}
MO.FDuiSliderMenu_appendChild = function FDuiSliderMenu_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.FDuiSliderGroup)){
      var hLine = o._hLine;
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('GroupPanel'));
      control.setPanel(hCell);
   }
}
MO.FDuiSliderMenu_removeChild = function FDuiSliderMenu_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, MO.FDuiSliderGroup)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiSliderMenu_dispose = function FDuiSliderMenu_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
