with(MO){
   MO.MDuiToolButton = function MDuiToolButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FDuiToolBar = function FDuiToolBar(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiDescribeFrame);
      o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
      o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FDuiToolBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FDuiToolBar_appendChild;
      o.removeChild       = FDuiToolBar_removeChild;
      o.dispose           = FDuiToolBar_dispose;
      return o;
   }
   MO.FDuiToolBar_onBuildPanel = function FDuiToolBar_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FDuiToolBar_appendChild = function FDuiToolBar_appendChild(control){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MDuiToolButton)){
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
   MO.FDuiToolBar_removeChild = function FDuiToolBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, MDuiToolButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParent = null;
         p._hParentLine = null;
      }
      o.__base.FDuiContainer.removeChild.call(o, p);
   }
   MO.FDuiToolBar_dispose = function FDuiToolBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButton = function FDuiToolButton(o){
      o = RClass.inherits(this, o, FDuiControl, MDuiToolButton, MListenerClick);
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
      o.onBuildPanel     = FDuiToolButton_onBuildPanel;
      o.onBuildButton    = FDuiToolButton_onBuildButton;
      o.onBuild          = FDuiToolButton_onBuild;
      o.onEnter          = FDuiToolButton_onEnter;
      o.onLeave          = FDuiToolButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FDuiToolButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FDuiToolButton_onMouseUp);
      o.icon             = FDuiToolButton_icon;
      o.setIcon          = FDuiToolButton_setIcon;
      o.setLabel         = FDuiToolButton_setLabel;
      o.setHint          = FDuiToolButton_setHint;
      o.setEnable        = FDuiToolButton_setEnable;
      o.doClick          = FDuiToolButton_doClick;
      o.dispose          = FDuiToolButton_dispose;
      return o;
   }
   MO.FDuiToolButton_onBuildPanel = function FDuiToolButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FDuiToolButton_onBuildButton = function FDuiToolButton_onBuildButton(p){
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
   MO.FDuiToolButton_onBuild = function FDuiToolButton_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o.onBuildButton(p);
   }
   MO.FDuiToolButton_onEnter = function FDuiToolButton_onEnter(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FDuiToolButton_onLeave = function FDuiToolButton_onLeave(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Normal');
      }
   }
   MO.FDuiToolButton_onMouseDown = function FDuiToolButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FDuiToolButton_onMouseUp = function FDuiToolButton_onMouseUp(h){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FDuiToolButton_icon = function FDuiToolButton_icon(){
      return this._icon;
   }
   MO.FDuiToolButton_setIcon = function FDuiToolButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FDuiToolButton_setLabel = function FDuiToolButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      var h = o._hLabelPanel;
      if(h){
         RHtml.textSet(h, s);
      }
   }
   MO.FDuiToolButton_setHint = function FDuiToolButton_setHint(p){
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
   MO.FDuiToolButton_setEnable = function FDuiToolButton_setEnable(p){
      var o = this;
      o.__base.FDuiControl.oeEnable.call(o, e);
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
   MO.FDuiToolButton_doClick = function FDuiToolButton_doClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FDuiToolButton_dispose = function FDuiToolButton_dispose(){
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
   MO.FDuiToolButtonCheck = function FDuiToolButtonCheck(o){
      o = RClass.inherits(this, o, FDuiToolButton);
      o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
      o._groupName      = RClass.register(o, new APtyString('_groupName'));
      o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
      o._statusChecked  = false;
      o.onEnter         = FDuiToolButtonCheck_onEnter;
      o.onLeave         = FDuiToolButtonCheck_onLeave;
      o.onMouseDown     = FDuiToolButtonCheck_onMouseDown;
      o.onMouseUp       = FDuiToolButtonCheck_onMouseUp;
      o.groupName       = FDuiToolButtonCheck_groupName;
      o.setGroupName    = FDuiToolButtonCheck_setGroupName;
      o.groupDefault    = FDuiToolButtonCheck_groupDefault;
      o.setGroupDefault = FDuiToolButtonCheck_setGroupDefault;
      o.innerCheck      = FDuiToolButtonCheck_innerCheck;
      o.isCheck         = FDuiToolButtonCheck_isCheck;
      o.check           = FDuiToolButtonCheck_check;
      o.dispose         = FDuiToolButtonCheck_dispose;
      return o;
   }
   MO.FDuiToolButtonCheck_onEnter = function FDuiToolButtonCheck_onEnter(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Hover');
      }
   }
   MO.FDuiToolButtonCheck_onLeave = function FDuiToolButtonCheck_onLeave(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Normal');
      }
   }
   MO.FDuiToolButtonCheck_onMouseDown = function FDuiToolButtonCheck_onMouseDown(p){
      var o = this;
      o.check(!o._statusChecked);
      var event = new SClickEvent(o);
      event.checked = o._statusChecked;
      o.processClickListener(event, o._statusChecked);
      event.dispose();
   }
   MO.FDuiToolButtonCheck_onMouseUp = function FDuiToolButtonCheck_onMouseUp(){
      var o = this;
   }
   MO.FDuiToolButtonCheck_groupName = function FDuiToolButtonCheck_groupName(){
      return this._groupName;
   }
   MO.FDuiToolButtonCheck_setGroupName = function FDuiToolButtonCheck_setGroupName(p){
      this._groupName = p;
   }
   MO.FDuiToolButtonCheck_groupDefault = function FDuiToolButtonCheck_groupDefault(){
      return this._groupDefault;
   }
   MO.FDuiToolButtonCheck_setGroupDefault = function FDuiToolButtonCheck_setGroupDefault(p){
      this._groupDefault = p;
   }
   MO.FDuiToolButtonCheck_innerCheck = function FDuiToolButtonCheck_innerCheck(p){
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
   MO.FDuiToolButtonCheck_isCheck = function FDuiToolButtonCheck_isCheck(){
      return this._statusChecked;
   }
   MO.FDuiToolButtonCheck_check = function FDuiToolButtonCheck_check(p){
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
                  if(RClass.isClass(c, FDuiToolButtonCheck)){
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
               MO.Logger.error("Can't find group default control. (name={1})", o._groupDefault);
            }
         }
      }
   }
   MO.FDuiToolButtonCheck_dispose = function FDuiToolButtonCheck_dispose(){
      var o = this;
      o._statusChecked = null;
      o._groupName = null;
      o.__base.FDuiToolButton.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButtonEdit = function FDuiToolButtonEdit(o){
      o = RClass.inherits(this, o, FDuiToolButton, MListenerDataChanged);
      o._editSize      = RClass.register(o, new APtySize2('_editSize'));
      o._hEdit         = null;
      o.onBuildButton  = FDuiToolButtonEdit_onBuildButton;
      o.onEnter        = RMethod.empty;
      o.onLeave        = RMethod.empty;
      o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiToolButtonEdit_onInputEdit);
      o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FDuiToolButtonEdit_onInputKeyDown);
      o.construct      = FDuiToolButtonEdit_construct;
      o.text           = FDuiToolButtonEdit_text;
      o.setText        = FDuiToolButtonEdit_setText;
      return o;
   }
   MO.FDuiToolButtonEdit_onBuildButton = function FDuiToolButtonEdit_onBuildButton(p){
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
   MO.FDuiToolButtonEdit_onInputEdit = function FDuiToolButtonEdit_onInputEdit(event){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FDuiToolButtonEdit_onInputKeyDown = function FDuiToolButtonEdit_onInputKeyDown(event){
      var o = this;
      if(event.keyCode == EKeyCode.Enter){
         o.doClick();
      }
   }
   MO.FDuiToolButtonEdit_construct = function FDuiToolButtonEdit_construct(){
      var o = this;
      o.__base.FDuiToolButton.construct.call(o);
      o._editSize = new SSize2();
   }
   MO.FDuiToolButtonEdit_text = function FDuiToolButtonEdit_text(){
      return this._hEdit.value;
   }
   MO.FDuiToolButtonEdit_setText = function FDuiToolButtonEdit_setText(text){
      this._hEdit.value = text;
   }
}
with(MO){
   MO.FDuiToolButtonMenu = function FDuiToolButtonMenu(o){
      o = RClass.inherits(this, o, FDuiToolButton, MUiContainer, MUiDropable, MUiFocus);
      o._menu           = null;
      o._statusDrop     = false;
      o._hDropPanel     = null;
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
      o.onBuild         = FDuiToolButtonMenu_onBuild;
      o.onEnter         = FDuiToolButtonMenu_onEnter;
      o.onLeave         = FDuiToolButtonMenu_onLeave;
      o.onMouseDown     = FDuiToolButtonMenu_onMouseDown;
      o.onBlur          = FDuiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      o.construct       = FDuiToolButtonMenu_construct;
      o.push            = FDuiToolButtonMenu_push;
      o.drop            = FDuiToolButtonMenu_drop;
      o.doClick         = FDuiToolButtonMenu_doClick;
      o.dispose         = FDuiToolButtonMenu_dispose;
      return o;
   }
   MO.FDuiToolButtonMenu_onBuild = function FDuiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FDuiToolButton.onBuild.call(o, event);
      var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
      o.onBuildDrop(hDropPanel);
      o._menu.onBuild(event);
   }
   MO.FDuiToolButtonMenu_onEnter = function FDuiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onEnter.call(o, event);
      }
   }
   MO.FDuiToolButtonMenu_onLeave = function FDuiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onLeave.call(o, event);
      }
   }
   MO.FDuiToolButtonMenu_onMouseDown = function FDuiToolButtonMenu_onMouseDown(){
      var o = this;
      if(!o._statusDrop){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FDuiToolButtonMenu_onBlur = function FDuiToolButtonMenu_onBlur(e){
      var o = this;
   }
   MO.FDuiToolButtonMenu_construct = function FDuiToolButtonMenu_construct(){
      var o = this;
      o.__base.FDuiToolButton.construct.call(o);
      var menu = o._menu = RClass.create(FDuiPopupMenu);
      menu._opener = o;
   }
   MO.FDuiToolButtonMenu_push = function FDuiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MDuiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FDuiToolButton.push.call(o, c);
   }
   MO.FDuiToolButtonMenu_drop = function FDuiToolButtonMenu_drop(flag){
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
   MO.FDuiToolButtonMenu_doClick = function FDuiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FDuiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }
   MO.FDuiToolButtonMenu_dispose = function FDuiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButtonSplit = function FDuiToolButtonSplit(o){
      o = RClass.inherits(this, o, FDuiToolButton, MDuiToolButton);
      o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
      o.onBuild     = FDuiToolButtonSplit_onBuild;
      return o;
   }
   MO.FDuiToolButtonSplit_onBuild = function FDuiToolButtonSplit_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o._hPanel.className = o.styleName('Panel');
   }
}
with(MO){
   MO.FDuiToolButtonText = function FDuiToolButtonText(o){
      o = RClass.inherits(this, o, FDuiToolButton);
      return o;
   }
}
with(MO){
   MO.RDuiToolBar = function RDuiToolBar(){
      var o = this;
      o.fromNode = RDuiToolBar_fromNode;
      return o;
   }
   MO.RDuiToolBar_mergeNode = function RDuiToolBar_mergeNode(xtb, xNode, r){
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
   MO.RDuiToolBar_fromNode = function RDuiToolBar_fromNode(control, config, panel, r){
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
   MO.RDuiToolBar = new RDuiToolBar();
}
