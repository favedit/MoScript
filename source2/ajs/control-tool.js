with(MO){
   MO.MUiToolButton = function MUiToolButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FUiToolBar = function FUiToolBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
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
   MO.FUiToolBar_onBuildPanel = function FUiToolBar_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiToolBar_appendChild = function FUiToolBar_appendChild(control){
      var o = this;
      o.__base.FUiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MUiToolButton)){
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
         control._hPanelCell = hc;
         control.setPanel(hc);
      }
   }
   MO.FUiToolBar_removeChild = function FUiToolBar_removeChild(p){
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
   MO.FUiToolBar_dispose = function FUiToolBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButton = function FUiToolButton(o){
      o = RClass.inherits(this, o, FUiControl, MUiToolButton, MListenerClick);
      o._icon            = RClass.register(o, new APtyString('_icon'));
      o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
      o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
      o._action          = RClass.register(o, new APtyString('_action'));
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
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
      o.onBuildButton    = FUiToolButton_onBuildButton;
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
      o.doClick          = FUiToolButton_doClick;
      o.dispose          = FUiToolButton_dispose;
      return o;
   }
   MO.FUiToolButton_onBuildPanel = function FUiToolButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FUiToolButton_onBuildButton = function FUiToolButton_onBuildButton(p){
      var o = this;
      var hPanel = o._hPanel;
      o.attachEvent('onMouseDown', hPanel);
      o.attachEvent('onMouseUp', hPanel);
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Normal'));
      var hLine = o._hLine = RBuilder.appendTableRow(hForm);
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      if(o._icon && o._label){
         o.hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
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
   MO.FUiToolButton_onBuild = function FUiToolButton_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      o.onBuildButton(p);
   }
   MO.FUiToolButton_onEnter = function FUiToolButton_onEnter(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FUiToolButton_onLeave = function FUiToolButton_onLeave(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Normal');
      }
   }
   MO.FUiToolButton_onMouseDown = function FUiToolButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FUiToolButton_onMouseUp = function FUiToolButton_onMouseUp(h){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FUiToolButton_icon = function FUiToolButton_icon(){
      return this._icon;
   }
   MO.FUiToolButton_setIcon = function FUiToolButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FUiToolButton_setLabel = function FUiToolButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      var h = o._hLabelPanel;
      if(h){
         RHtml.textSet(h, s);
      }
   }
   MO.FUiToolButton_setHint = function FUiToolButton_setHint(p){
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
   MO.FUiToolButton_setEnable = function FUiToolButton_setEnable(p){
      var o = this;
      o.__base.FUiControl.oeEnable.call(o, e);
      o._disabled = !e.enable;
      if(e.enable && o._icon){
         var is = RResource.iconPath(o._icon);
         if(o._hIcon.src != is){
            o._hIcon.src = is;
         }
      }else if(!e.enable && o._iconDisable){
         var is = RResource.iconPath(o._iconDisable);
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
   MO.FUiToolButton_doClick = function FUiToolButton_doClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         RLogger.debug(o, 'Tool button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FUiToolButton_dispose = function FUiToolButton_dispose(){
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
   MO.FUiToolButtonCheck = function FUiToolButtonCheck(o){
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
      o.isCheck         = FUiToolButtonCheck_isCheck;
      o.check           = FUiToolButtonCheck_check;
      o.dispose         = FUiToolButtonCheck_dispose;
      return o;
   }
   MO.FUiToolButtonCheck_onEnter = function FUiToolButtonCheck_onEnter(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Hover');
      }
   }
   MO.FUiToolButtonCheck_onLeave = function FUiToolButtonCheck_onLeave(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Normal');
      }
   }
   MO.FUiToolButtonCheck_onMouseDown = function FUiToolButtonCheck_onMouseDown(p){
      var o = this;
      o.check(!o._statusChecked);
      var event = new SClickEvent(o);
      event.checked = o._statusChecked;
      o.processClickListener(event, o._statusChecked);
      event.dispose();
   }
   MO.FUiToolButtonCheck_onMouseUp = function FUiToolButtonCheck_onMouseUp(){
      var o = this;
   }
   MO.FUiToolButtonCheck_groupName = function FUiToolButtonCheck_groupName(){
      return this._groupName;
   }
   MO.FUiToolButtonCheck_setGroupName = function FUiToolButtonCheck_setGroupName(p){
      this._groupName = p;
   }
   MO.FUiToolButtonCheck_groupDefault = function FUiToolButtonCheck_groupDefault(){
      return this._groupDefault;
   }
   MO.FUiToolButtonCheck_setGroupDefault = function FUiToolButtonCheck_setGroupDefault(p){
      this._groupDefault = p;
   }
   MO.FUiToolButtonCheck_innerCheck = function FUiToolButtonCheck_innerCheck(p){
      var o = this;
      if(o._statusChecked != p){
         o._statusChecked = p;
         if(p){
            o._hForm.className = o.styleName('Press');
         }else{
            o._hForm.className = o.styleName('Normal');
         }
      }
   }
   MO.FUiToolButtonCheck_isCheck = function FUiToolButtonCheck_isCheck(){
      return this._statusChecked;
   }
   MO.FUiToolButtonCheck_check = function FUiToolButtonCheck_check(p){
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
            var components = o._parent.components();
            var control = components.get(o._groupDefault);
            if(control){
               control.innerCheck(true);
            }else{
               RLogger.error("Can't find group default control. (name={1})", o._groupDefault);
            }
         }
      }
   }
   MO.FUiToolButtonCheck_dispose = function FUiToolButtonCheck_dispose(){
      var o = this;
      o._statusChecked = null;
      o._groupName = null;
      o.__base.FUiToolButton.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButtonEdit = function FUiToolButtonEdit(o){
      o = RClass.inherits(this, o, FUiToolButton, MListenerDataChanged);
      o._editSize      = RClass.register(o, new APtySize2('_editSize'));
      o._hEdit         = null;
      o.onBuildButton  = FUiToolButtonEdit_onBuildButton;
      o.onEnter        = RMethod.empty;
      o.onLeave        = RMethod.empty;
      o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiToolButtonEdit_onInputEdit);
      o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FUiToolButtonEdit_onInputKeyDown);
      o.construct      = FUiToolButtonEdit_construct;
      o.text           = FUiToolButtonEdit_text;
      o.setText        = FUiToolButtonEdit_setText;
      return o;
   }
   MO.FUiToolButtonEdit_onBuildButton = function FUiToolButtonEdit_onBuildButton(p){
      var o = this;
      var hPanel = o._hPanel;
      var hForm = o._hForm = RBuilder.appendTable(hPanel);
      var hLine = o._hLine = RBuilder.appendTableRow(hForm);
      var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hLine);
      var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
      hEdit.style.width = o._editSize.width +  'px';
      o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
      o.attachEvent('onInputKeyDown', hEdit);
      o._hEditSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      if(o._icon && o._label){
         o._hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
         o.attachEvent('onMouseDown', hLabelPanel);
         o.attachEvent('onMouseUp', hLabelPanel);
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
   MO.FUiToolButtonEdit_onInputEdit = function FUiToolButtonEdit_onInputEdit(event){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiToolButtonEdit_onInputKeyDown = function FUiToolButtonEdit_onInputKeyDown(event){
      var o = this;
      if(event.keyCode == EKeyCode.Enter){
         o.doClick();
      }
   }
   MO.FUiToolButtonEdit_construct = function FUiToolButtonEdit_construct(){
      var o = this;
      o.__base.FUiToolButton.construct.call(o);
      o._editSize = new SSize2();
   }
   MO.FUiToolButtonEdit_text = function FUiToolButtonEdit_text(){
      return this._hEdit.value;
   }
   MO.FUiToolButtonEdit_setText = function FUiToolButtonEdit_setText(text){
      this._hEdit.value = text;
   }
}
with(MO){
   MO.FUiToolButtonMenu = function FUiToolButtonMenu(o){
      o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MUiDropable, MUiFocus);
      o._menu           = null;
      o._statusDrop     = false;
      o._hDropPanel     = null;
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
      o.onBuild         = FUiToolButtonMenu_onBuild;
      o.onEnter         = FUiToolButtonMenu_onEnter;
      o.onLeave         = FUiToolButtonMenu_onLeave;
      o.onMouseDown     = FUiToolButtonMenu_onMouseDown;
      o.onBlur          = FUiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      o.construct       = FUiToolButtonMenu_construct;
      o.push            = FUiToolButtonMenu_push;
      o.drop            = FUiToolButtonMenu_drop;
      o.doClick         = FUiToolButtonMenu_doClick;
      o.dispose         = FUiToolButtonMenu_dispose;
      return o;
   }
   MO.FUiToolButtonMenu_onBuild = function FUiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FUiToolButton.onBuild.call(o, event);
      var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
      o.onBuildDrop(hDropPanel);
      o._menu.onBuild(event);
   }
   MO.FUiToolButtonMenu_onEnter = function FUiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onEnter.call(o, event);
      }
   }
   MO.FUiToolButtonMenu_onLeave = function FUiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onLeave.call(o, event);
      }
   }
   MO.FUiToolButtonMenu_onMouseDown = function FUiToolButtonMenu_onMouseDown(){
      var o = this;
      if(!o._statusDrop){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FUiToolButtonMenu_onBlur = function FUiToolButtonMenu_onBlur(e){
      var o = this;
   }
   MO.FUiToolButtonMenu_construct = function FUiToolButtonMenu_construct(){
      var o = this;
      o.__base.FUiToolButton.construct.call(o);
      var menu = o._menu = RClass.create(FUiPopupMenu);
      menu._opener = o;
   }
   MO.FUiToolButtonMenu_push = function FUiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MUiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FUiToolButton.push.call(o, c);
   }
   MO.FUiToolButtonMenu_drop = function FUiToolButtonMenu_drop(flag){
      var o = this;
      if(!o._disabled){
         o._statusDrop = !o._statusDrop;
         if(o._statusDrop){
            o._hForm.className = o.styleName('Press');
            o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
            RConsole.find(FUiPopupConsole).show(o._menu);
         }else{
            o._hForm.className = o.styleName('Normal');
            o._menu.hide();
         }
      }
   }
   MO.FUiToolButtonMenu_doClick = function FUiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FUiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }
   MO.FUiToolButtonMenu_dispose = function FUiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButtonSplit = function FUiToolButtonSplit(o){
      o = RClass.inherits(this, o, FUiToolButton, MUiToolButton);
      o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
      o.onBuild     = FUiToolButtonSplit_onBuild;
      return o;
   }
   MO.FUiToolButtonSplit_onBuild = function FUiToolButtonSplit_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      o._hPanel.className = o.styleName('Panel');
   }
}
with(MO){
   MO.FUiToolButtonText = function FUiToolButtonText(o){
      o = RClass.inherits(this, o, FUiToolButton);
      return o;
   }
}
with(MO){
   MO.RUiToolBar = function RUiToolBar(){
      var o = this;
      o.fromNode = RUiToolBar_fromNode;
      return o;
   }
   MO.RUiToolBar_mergeNode = function RUiToolBar_mergeNode(xtb, xNode, r){
      var ns = xNode.nodes;
      for(var j=0; j<ns.count; j++){
         var n = ns.get(j);
         if('ToolBar' == n.name){
            if(n.nodes){
               for(var i=0; i<n.nodes.count; i++){
                  xtb.push(n.nodes.get(i));
               }
            }
         }
      }
      if(r){
         for(var j=ns.count-1; j>=0; j--){
            var n = ns.get(j);
            if('ToolBar' == n.name){
               ns.removeItem(n);
            }
         }
      }
      return xtb;
   }
   MO.RUiToolBar_fromNode = function RUiToolBar_fromNode(control, config, panel, r){
      if(config && config._nodes){
         var xtb = null;
         var ns = config._nodes;
         var jc = ns.count();
         for(var j = 0; j < jc; j++){
            var n = ns.getAt(j);
            if(n.isName('ToolBar')){
               if(!xtb){
                  xtb = n;
               }else if(n.hasNode()){
                  xtb.nodes().append(n.nodes());
               }
            }
         }
         if(r){
            for(var i = 0; i < ns.count(); i++){
               var n = ns.getAt(i);
               if(n.isName('ToolBar')){
                  ns.erase(i--);
               }
            }
         }
         if(xtb){
            RControl.build(control, xtb, null, panel);
         }
      }
   }
   MO.RUiToolBar = new RUiToolBar();
}
