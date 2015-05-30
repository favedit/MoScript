with(MO){
   MO.MUiMenuButton = function MUiMenuButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FUiMenuBar = function FUiMenuBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FUiMenuBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FUiMenuBar_appendChild;
      o.removeChild       = FUiMenuBar_removeChild;
      o.dispose           = FUiMenuBar_dispose;
      return o;
   }
   MO.FUiMenuBar_onBuildPanel = function FUiMenuBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      o._hLine = RBuilder.appendTableRow(h);
   }
   MO.FUiMenuBar_appendChild = function FUiMenuBar_appendChild(control){
      var o = this;
      o.__base.FUiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MUiMenuButton)){
         var hLine = o._hLine;
         var hCell = RBuilder.appendTableCell(hLine, o.styleName('ButtonPanel'));
         hCell._hParentLine = hLine;
         control.setPanel(hCell);
      }
   }
   MO.FUiMenuBar_removeChild = function FUiMenuBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, FUiMenuButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParentLine = null;
         p._hParent = null;
      }
      o.__base.FUiContainer.removeChild.call(o, p);
   }
   MO.FUiMenuBar_dispose = function FUiMenuBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiMenuButton = function FUiMenuButton(o){
      o = RClass.inherits(this, o, FUiControl, MUiMenuButton, MListenerClick);
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
      o.onBuildPanel     = FUiMenuButton_onBuildPanel
      o.onBuild          = FUiMenuButton_onBuild;
      o.onEnter          = FUiMenuButton_onEnter;
      o.onLeave          = FUiMenuButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
      o.icon             = FUiMenuButton_icon;
      o.setIcon          = FUiMenuButton_setIcon;
      o.setLabel         = FUiMenuButton_setLabel;
      o.setHint          = FUiMenuButton_setHint;
      o.setEnable        = FUiMenuButton_setEnable;
      o.click            = FUiMenuButton_click;
      o.dispose          = FUiMenuButton_dispose;
      return o;
   }
   MO.FUiMenuButton_onBuildPanel = function FUiMenuButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
   }
   MO.FUiMenuButton_onBuild = function FUiMenuButton_onBuild(p){
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
         o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
         hLabelPanel.noWrap = true;
         o.setLabel(o._label);
      }
      if(o._hotkey){
         RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
      }
      if(o._hint){
         o.setHint(o._hint);
      }
   }
   MO.FUiMenuButton_onEnter = function FUiMenuButton_onEnter(p){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }
   MO.FUiMenuButton_onLeave = function FUiMenuButton_onLeave(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Normal');
      }
   }
   MO.FUiMenuButton_onMouseDown = function FUiMenuButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Press');
         o.click();
      }
   }
   MO.FUiMenuButton_onMouseUp = function FUiMenuButton_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }
   MO.FUiMenuButton_icon = function FUiMenuButton_icon(){
      return this._icon;
   }
   MO.FUiMenuButton_setIcon = function FUiMenuButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FUiMenuButton_setLabel = function FUiMenuButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      RHtml.textSet(o._hLabelPanel, s);
   }
   MO.FUiMenuButton_setHint = function FUiMenuButton_setHint(p){
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
   MO.FUiMenuButton_setEnable = function FUiMenuButton_setEnable(p){
      var o = this;
      o.__base.FUiControl.setEnable.call(o, p);
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
   MO.FUiMenuButton_click = function FUiMenuButton_click(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         RLogger.debug(o, 'Menu button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FUiMenuButton_dispose = function FUiMenuButton_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiMenuButtonMenu = function FUiMenuButtonMenu(o){
      o = RClass.inherits(this, o, FUiControl);
      o._action       = RClass.register(o, new APtyString('action', null));
      o._target       = RClass.register(o, new APtyString('target', null));
      o._page         = RClass.register(o, new APtyString('page'));
      o._hotkey       = RClass.register(o, new APtyString('hotkey'));
      o._method       = RClass.register(o, new APtyString('method'));
      o._icon         = RClass.register(o, new APtyString('icon', null));
      o._iconDisable  = RClass.register(o, new APtyString('iconDisable', null));
      o._attributes   = RClass.register(o, new APtyString('attributes'));
      o._disabled     = false;
      o.hButton      = null;
      o.hButtonLine  = null;
      o.hButtonPanel = null;
      o.hIcon        = null;
      o.hText        = null;
      o.oeBuild      = FUiMenuButtonMenu_oeBuild;
      o.oeEnable     = FUiMenuButtonMenu_oeEnable;
      o.oeDisable    = FUiMenuButtonMenu_oeDisable;
      o.onBuildPanel = FUiMenuButtonMenu_onBuildPanel;
      o.onEnter      = FUiMenuButtonMenu_onEnter;
      o.onLeave      = FUiMenuButtonMenu_onLeave;
      o.onMouseDown  = FUiMenuButtonMenu_onMouseDown;
      o.onMouseUp    = FUiMenuButtonMenu_onMouseUp;
      o.onClick      = FUiMenuButtonMenu_onClick;
      o.construct    = FUiMenuButtonMenu_construct;
      o.dispose      = FUiMenuButtonMenu_dispose;
      return o;
   }
   MO.FUiMenuButtonMenu_oeBuild = function FUiMenuButtonMenu_oeBuild(event){
      var o = this;
      o.base.FUiControl.oeBuild.call(o, event);
      var h = o.hPanel;
      o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
      o.linkClickEvent(o.hButton);
      var hLine = o.hButtonLine = o.hButton.insertRow();
      var hCel = hLine.insertCell();
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hCel, o._icon);
      }
      if(o.label){
         o.hLabel = RBuilder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
         o.hLabel.className = o.style('Label');
      }
      return EEventStatus.Stop;
   }
   MO.FUiMenuButtonMenu_onBuildPanel = function FUiMenuButtonMenu_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'DIV');
   }
   MO.FUiMenuButtonMenu_oeEnable = function FUiMenuButtonMenu_oeEnable(event){
      var o = this;
      o.base.FUiControl.oeEnable.call(o, event);
      o.hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o.hIcon.src = RRes._iconPath(o._icon);
      }
      return EEventStatus.Stop;
   }
   MO.FUiMenuButtonMenu_oeDisable = function FUiMenuButtonMenu_oeDisable(event){
      var o = this;
      o.base.FUiControl.oeDisable.call(o, event);
      o.hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o.hIcon.src = RRes._iconPath(o._iconDisable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiMenuButtonMenu_onEnter = function FUiMenuButtonMenu_onEnter(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   MO.FUiMenuButtonMenu_onLeave = function FUiMenuButtonMenu_onLeave(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Panel');
      }
   }
   MO.FUiMenuButtonMenu_onMouseDown = function FUiMenuButtonMenu_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Press');
      }
   }
   MO.FUiMenuButtonMenu_onMouseUp = function FUiMenuButtonMenu_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   MO.FUiMenuButtonMenu_onClick = function FUiMenuButtonMenu_onClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FFocusConsole).focus(o);
         if(o._action){
            eval(o._action);
         }
         if(o._page || o._method){
            var form = RHtml.form(o.hButton);
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
   MO.FUiMenuButtonMenu_construct = function FUiMenuButtonMenu_construct(){
      var o = this;
      o.base.FUiControl.construct.call(o);
   }
   MO.FUiMenuButtonMenu_dispose = function FUiMenuButtonMenu_dispose(){
      var o = this;
      o.base.FUiControl.dispose.call(o);
      RMemory.freeHtml(o.hPanel);
      RMemory.freeHtml(o.hButton);
      o.hPanel = null;
      o.hIcon = null;
      o.hButton = null;
      o.hButtonLine = null;
      o.hLabel = null;
   }
}
with(MO){
   MO.FUiMenuButtonSplit = function FUiMenuButtonSplit(o){
      o = RClass.inherits(this, o, FUiControl, MUiMenuButton);
      o._stylePanelHorizontal = RClass.register(o, new AStyle('_stylePanelHorizontal'));
      o._stylePanelVertical   = RClass.register(o, new AStyle('_stylePanelVertical'));
      o.onBuild               = FUiMenuButtonSplit_onBuild;
      return o;
   }
   MO.FUiMenuButtonSplit_onBuild = function FUiMenuButtonSplit_onBuild(event){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, event);
      var hPanel = o._hPanel;
      if(RClass.isClass(o._parent, FUiMenuBar)){
         hPanel.className = o.styleName('PanelVertical');
      }else{
         hPanel.className = o.styleName('PanelHorizontal');
      }
   }
}
with(MO){
   MO.FUiPopupMenu = function FUiPopupMenu(o){
      o = RClass.inherits(this, o, FUiContainer, MUiPopup);
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
      o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      o._styleButton    = RClass.register(o, new AStyle('_styleButton'));
      o._opener         = null;
      o._visible        = false;
      o._statusVisible  = false;
      o._hContainer     = null;
      o._hLabel         = null;
      o._hButtonPanel   = null;
      o._hIcon          = null;
      o._hText          = null;
      o.onBuild         = FUiPopupMenu_onBuild;
      o.appendChild     = FUiPopupMenu_appendChild;
      o.show            = FUiPopupMenu_show;
      o.setVisible      = FUiPopupMenu_setVisible;
      o.testInRange     = FUiPopupMenu_testInRange;
      o.doBlur          = FUiPopupMenu_doBlur;
      o.dispose         = FUiPopupMenu_dispose;
      return o;
   }
   MO.FUiPopupMenu_onBuild = function FUiPopupMenu_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
      var hLineTop = o._hLineTop = RBuilder.appendTableCell(hForm);
      hLineTop.bgColor = '#666666';
      hLineTop.height = '2px';
      var hContainerPanel = o._hContainerPanel = RBuilder.appendTableCell(hForm);
      var hLineBottom = o._hLineBottom = RBuilder.appendTableCell(hForm);
      hLineBottom.bgColor = '#666666';
      hLineBottom.height = '2px';
      var hContainer = o._hContainer = RBuilder.appendTable(hContainerPanel, o.styleName('Container'));
   }
   MO.FUiPopupMenu_doBlur = function FUiPopupMenu_doBlur(){
      var o = this;
   }
   MO.FUiPopupMenu_appendChild = function FUiPopupMenu_appendChild(control){
      var o = this;
      var hButtonPanel = RBuilder.appendTableRowCell(o._hContainer);
      hButtonPanel.className = o.styleName('Button');
      hButtonPanel.appendChild(control._hPanel);
   }
   MO.FUiPopupMenu_show = function FUiPopupMenu_show(h, positionCd, v){
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
         o._hFormPanel.style.overflowY = 'scroll';
         style.height = height + 'px';
      }
      style.left = '3px';
      style.top = (openerHeight + 1) + 'px';
      style.width = width + 'px';
      style.zIndex = RUiLayer.next();
   }
   MO.FUiPopupMenu_setVisible = function FUiPopupMenu_setVisible(visible){
      var o = this;
      var opener = o._opener;
      o._statusVisible = visible;
      var hOpener = opener._hPanelCell;
      var hPanel = o.panel(EPanel.Container);
      if(visible){
         hOpener.appendChild(hPanel);
      }else{
         hOpener.removeChild(hPanel);
      }
   }
   MO.FUiPopupMenu_testInRange = function FUiPopupMenu_testInRange(e){
      return this == RControl.htmlControl(e.srcElement, FUiPopupMenu);
   }
   MO.FUiPopupMenu_dispose = function FUiPopupMenu_dispose(e){
      var o = this;
      o._hContainer = RMemory.free(o._hContainer);
      o._hPanel = RMemory.free(o._hPanel);
      o._hLabel = RMemory.free(o._hLabel);
      o._hLastRow = RMemory.free(o._hLastRow);
      o.__base.FUiContainer.dispose.call(o);
   }
}
