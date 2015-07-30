MO.MDuiMenuButton = function MDuiMenuButton(o){
   o = MO.Class.inherits(this, o);
   return o;
}
with(MO){
   MO.FDuiMenuBar = function FDuiMenuBar(o){
      o = RClass.inherits(this, o, FDuiContainer, MDuiDescribeFrame);
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FDuiMenuBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FDuiMenuBar_appendChild;
      o.removeChild       = FDuiMenuBar_removeChild;
      o.dispose           = FDuiMenuBar_dispose;
      return o;
   }
   MO.FDuiMenuBar_onBuildPanel = function FDuiMenuBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      o._hLine = RBuilder.appendTableRow(h);
   }
   MO.FDuiMenuBar_appendChild = function FDuiMenuBar_appendChild(control){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MDuiMenuButton)){
         var hLine = o._hLine;
         var hCell = RBuilder.appendTableCell(hLine, o.styleName('ButtonPanel'));
         hCell._hParentLine = hLine;
         control.setPanel(hCell);
      }
   }
   MO.FDuiMenuBar_removeChild = function FDuiMenuBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, FDuiMenuButton)){
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
      o._hLine = RHtml.free(o._hLine);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiMenuButton = function FDuiMenuButton(o){
      o = RClass.inherits(this, o, FDuiControl, MDuiMenuButton, MListenerClick);
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
      o.onBuildPanel     = FDuiMenuButton_onBuildPanel
      o.onBuild          = FDuiMenuButton_onBuild;
      o.onEnter          = FDuiMenuButton_onEnter;
      o.onLeave          = FDuiMenuButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FDuiMenuButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FDuiMenuButton_onMouseUp);
      o.icon             = FDuiMenuButton_icon;
      o.setIcon          = FDuiMenuButton_setIcon;
      o.setLabel         = FDuiMenuButton_setLabel;
      o.setHint          = FDuiMenuButton_setHint;
      o.setEnable        = FDuiMenuButton_setEnable;
      o.click            = FDuiMenuButton_click;
      o.dispose          = FDuiMenuButton_dispose;
      return o;
   }
   MO.FDuiMenuButton_onBuildPanel = function FDuiMenuButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
   }
   MO.FDuiMenuButton_onBuild = function FDuiMenuButton_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
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
   MO.FDuiMenuButton_setIcon = function FDuiMenuButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FDuiMenuButton_setLabel = function FDuiMenuButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      RHtml.textSet(o._hLabelPanel, s);
   }
   MO.FDuiMenuButton_setHint = function FDuiMenuButton_setHint(p){
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
         RConsole.find(FDuiFocusConsole).blur();
         MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FDuiMenuButton_dispose = function FDuiMenuButton_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiMenuButtonMenu = function FDuiMenuButtonMenu(o){
      o = RClass.inherits(this, o, FDuiControl);
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
      o.oeBuild      = FDuiMenuButtonMenu_oeBuild;
      o.oeEnable     = FDuiMenuButtonMenu_oeEnable;
      o.oeDisable    = FDuiMenuButtonMenu_oeDisable;
      o.onBuildPanel = FDuiMenuButtonMenu_onBuildPanel;
      o.onEnter      = FDuiMenuButtonMenu_onEnter;
      o.onLeave      = FDuiMenuButtonMenu_onLeave;
      o.onMouseDown  = FDuiMenuButtonMenu_onMouseDown;
      o.onMouseUp    = FDuiMenuButtonMenu_onMouseUp;
      o.onClick      = FDuiMenuButtonMenu_onClick;
      o.construct    = FDuiMenuButtonMenu_construct;
      o.dispose      = FDuiMenuButtonMenu_dispose;
      return o;
   }
   MO.FDuiMenuButtonMenu_oeBuild = function FDuiMenuButtonMenu_oeBuild(event){
      var o = this;
      o.base.FDuiControl.oeBuild.call(o, event);
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
   MO.FDuiMenuButtonMenu_onBuildPanel = function FDuiMenuButtonMenu_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'DIV');
   }
   MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event){
      var o = this;
      o.base.FDuiControl.oeEnable.call(o, event);
      o.hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o.hIcon.src = RRes._iconPath(o._icon);
      }
      return EEventStatus.Stop;
   }
   MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event){
      var o = this;
      o.base.FDuiControl.oeDisable.call(o, event);
      o.hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o.hIcon.src = RRes._iconPath(o._iconDisable);
      }
      return EEventStatus.Stop;
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
   MO.FDuiMenuButtonMenu_construct = function FDuiMenuButtonMenu_construct(){
      var o = this;
      o.base.FDuiControl.construct.call(o);
   }
   MO.FDuiMenuButtonMenu_dispose = function FDuiMenuButtonMenu_dispose(){
      var o = this;
      o.base.FDuiControl.dispose.call(o);
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
   MO.FDuiMenuButtonSplit = function FDuiMenuButtonSplit(o){
      o = RClass.inherits(this, o, FDuiControl, MDuiMenuButton);
      o._stylePanelHorizontal = RClass.register(o, new AStyle('_stylePanelHorizontal'));
      o._stylePanelVertical   = RClass.register(o, new AStyle('_stylePanelVertical'));
      o.onBuild               = FDuiMenuButtonSplit_onBuild;
      return o;
   }
   MO.FDuiMenuButtonSplit_onBuild = function FDuiMenuButtonSplit_onBuild(event){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, event);
      var hPanel = o._hPanel;
      if(RClass.isClass(o._parent, FDuiMenuBar)){
         hPanel.className = o.styleName('PanelVertical');
      }else{
         hPanel.className = o.styleName('PanelHorizontal');
      }
   }
}
with(MO){
   MO.FDuiPopupMenu = function FDuiPopupMenu(o){
      o = RClass.inherits(this, o, FDuiContainer, MDuiPopup);
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
      o.onBuild         = FDuiPopupMenu_onBuild;
      o.appendChild     = FDuiPopupMenu_appendChild;
      o.show            = FDuiPopupMenu_show;
      o.setVisible      = FDuiPopupMenu_setVisible;
      o.testInRange     = FDuiPopupMenu_testInRange;
      o.doBlur          = FDuiPopupMenu_doBlur;
      o.dispose         = FDuiPopupMenu_dispose;
      return o;
   }
   MO.FDuiPopupMenu_onBuild = function FDuiPopupMenu_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
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
   MO.FDuiPopupMenu_doBlur = function FDuiPopupMenu_doBlur(){
      var o = this;
   }
   MO.FDuiPopupMenu_appendChild = function FDuiPopupMenu_appendChild(control){
      var o = this;
      var hButtonPanel = RBuilder.appendTableRowCell(o._hContainer);
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
         o._hFormPanel.style.overflowY = 'scroll';
         style.height = height + 'px';
      }
      style.left = '3px';
      style.top = (openerHeight + 1) + 'px';
      style.width = width + 'px';
      style.zIndex = RDuiLayer.next();
   }
   MO.FDuiPopupMenu_setVisible = function FDuiPopupMenu_setVisible(visible){
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
   MO.FDuiPopupMenu_testInRange = function FDuiPopupMenu_testInRange(e){
      return this == RControl.htmlControl(e.srcElement, FDuiPopupMenu);
   }
   MO.FDuiPopupMenu_dispose = function FDuiPopupMenu_dispose(e){
      var o = this;
      o._hContainer = RMemory.free(o._hContainer);
      o._hPanel = RMemory.free(o._hPanel);
      o._hLabel = RMemory.free(o._hLabel);
      o._hLastRow = RMemory.free(o._hLastRow);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
