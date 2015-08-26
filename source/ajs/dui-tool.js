MO.FDuiToolBar = function FDuiToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._alignCd          = MO.Class.register(o, new MO.APtyEnum('_alignCd', null, MO.EUiAlign, MO.EUiAlign.Left));
   o._directionCd      = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection, MO.EUiDirection.Horizontal));
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiToolBar_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.appendChild       = MO.FDuiToolBar_appendChild;
   o.removeChild       = MO.FDuiToolBar_removeChild;
   o.dispose           = MO.FDuiToolBar_dispose;
   return o;
}
MO.FDuiToolBar_onBuildPanel = function FDuiToolBar_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiToolBar_appendChild = function FDuiToolBar_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.MUiToolButton)){
      var h = o._hPanel;
      var hl = o._hLine;
      if(o._directionCd == MO.EUiDirection.Horizontal){
         if(!hl){
            hl = o._hLine = MO.Window.Builder.appendTableRow(h);
         }
      }
      if(o._directionCd == MO.EUiDirection.Vertical){
         hl = o._hLine = MO.Window.Builder.appendTableRow(h);
      }
      var hc = MO.Window.Builder.appendTableCell(hl, o.styleName('ButtonPanel'));
      control._hPanelCell = hc;
      control.setPanel(hc);
   }
}
MO.FDuiToolBar_removeChild = function FDuiToolBar_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, MO.MUiToolButton)){
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
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiToolButton = function FDuiToolButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiToolButton);
   o._icon            = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetter('_icon')]);
   o._iconDisable     = MO.Class.register(o, [new MO.APtyString('_iconDisable'), new MO.AGetter('_iconDisable')]);
   o._hotkey          = MO.Class.register(o, [new MO.APtyString('_hotkey'), new MO.AGetter('_hotkey')]);
   o._action          = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetter('_action')]);
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
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
   o.onBuildPanel     = MO.FDuiToolButton_onBuildPanel;
   o.onBuildButton    = MO.FDuiToolButton_onBuildButton;
   o.onBuild          = MO.FDuiToolButton_onBuild;
   o.onEnter          = MO.FDuiToolButton_onEnter;
   o.onLeave          = MO.FDuiToolButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiToolButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiToolButton_onMouseUp);
   o.icon             = MO.FDuiToolButton_icon;
   o.setIcon          = MO.FDuiToolButton_setIcon;
   o.setLabel         = MO.FDuiToolButton_setLabel;
   o.setHint          = MO.FDuiToolButton_setHint;
   o.setEnable        = MO.FDuiToolButton_setEnable;
   o.doClick          = MO.FDuiToolButton_doClick;
   o.dispose          = MO.FDuiToolButton_dispose;
   return o;
}
MO.FDuiToolButton_onBuildPanel = function FDuiToolButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
}
MO.FDuiToolButton_onBuildButton = function FDuiToolButton_onBuildButton(event){
   var o = this;
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Normal'));
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o.hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiToolButton_onBuild = function FDuiToolButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   o.onBuildButton(event);
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
MO.FDuiToolButton_setIcon = function FDuiToolButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiToolButton_setLabel = function FDuiToolButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   var hLabelPanel = o._hLabelPanel;
   if(hLabelPanel){
      MO.Window.Html.textSet(hLabelPanel, text);
   }
}
MO.FDuiToolButton_setHint = function FDuiToolButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = o._hint;
}
MO.FDuiToolButton_setEnable = function FDuiToolButton_setEnable(value){
   var o = this;
   o.__base.FDuiControl.oeEnable.call(o, value);
   o._disabled = !e.enable;
   if(e.enable && o._icon){
      var is = MO.Window.Resource.iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = MO.Window.Resource.iconPath(o._iconDisable);
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
      MO.Console.find(MO.FDuiFocusConsole).blur();
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiToolButton_dispose = function FDuiToolButton_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiToolButtonCheck = function FDuiToolButtonCheck(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton);
   o._optionChecked = MO.Class.register(o, [new MO.APtyBoolean('_optionChecked', 'check'), new MO.AGetSet('_optionChecked')]);
   o._groupName     = MO.Class.register(o, [new MO.APtyString('_groupName'), new MO.AGetSet('_groupName')]);
   o._groupDefault  = MO.Class.register(o, [new MO.APtyString('_groupDefault'), new MO.AGetSet('_groupDefault')]);
   o._statusChecked = false;
   o.onEnter        = MO.FDuiToolButtonCheck_onEnter;
   o.onLeave        = MO.FDuiToolButtonCheck_onLeave;
   o.onMouseDown    = MO.FDuiToolButtonCheck_onMouseDown;
   o.onMouseUp      = MO.FDuiToolButtonCheck_onMouseUp;
   o.innerCheck     = MO.FDuiToolButtonCheck_innerCheck;
   o.isCheck        = MO.FDuiToolButtonCheck_isCheck;
   o.check          = MO.FDuiToolButtonCheck_check;
   o.dispose        = MO.FDuiToolButtonCheck_dispose;
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
   var event = new MO.SClickEvent(o);
   event.checked = o._statusChecked;
   o.processClickListener(event, o._statusChecked);
   event.dispose();
}
MO.FDuiToolButtonCheck_onMouseUp = function FDuiToolButtonCheck_onMouseUp(){
   var o = this;
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
      if(!MO.String.isEmpty(o._groupName)){
         var cs = o._parent.components();
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            if(c != o){
               if(MO.Class.isClass(c, FDuiToolButtonCheck)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      if(!MO.String.isEmpty(o._groupDefault)){
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
MO.FDuiToolButtonEdit = function FDuiToolButtonEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton, MO.MListenerDataChanged);
   o._editSize      = MO.Class.register(o, new MO.APtySize2('_editSize'));
   o._hEdit         = null;
   o.onBuildButton  = MO.FDuiToolButtonEdit_onBuildButton;
   o.onEnter        = MO.Method.empty;
   o.onLeave        = MO.Method.empty;
   o.onInputEdit    = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiToolButtonEdit_onInputEdit);
   o.onInputKeyDown = MO.Class.register(o, new MO.AEventKeyDown('onInputKeyDown'), MO.FDuiToolButtonEdit_onInputKeyDown);
   o.construct      = MO.FDuiToolButtonEdit_construct;
   o.text           = MO.FDuiToolButtonEdit_text;
   o.setText        = MO.FDuiToolButtonEdit_setText;
   return o;
}
MO.FDuiToolButtonEdit_onBuildButton = function FDuiToolButtonEdit_onBuildButton(p){
   var o = this;
   var hPanel = o._hPanel;
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   var hEditPanel = o._hEditPanel = MO.Window.Builder.appendTableCell(hLine);
   var hEdit = o._hEdit = MO.Window.Builder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
   o.attachEvent('onInputKeyDown', hEdit);
   o._hEditSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      o.attachEvent('onMouseDown', hLabelPanel);
      o.attachEvent('onMouseUp', hLabelPanel);
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
MO.FDuiToolButtonEdit_onInputEdit = function FDuiToolButtonEdit_onInputEdit(event){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiToolButtonEdit_onInputKeyDown = function FDuiToolButtonEdit_onInputKeyDown(event){
   var o = this;
   if(event.keyCode == MO.EKeyCode.Enter){
      o.doClick();
   }
}
MO.FDuiToolButtonEdit_construct = function FDuiToolButtonEdit_construct(){
   var o = this;
   o.__base.FDuiToolButton.construct.call(o);
   o._editSize = new MO.SSize2();
}
MO.FDuiToolButtonEdit_text = function FDuiToolButtonEdit_text(){
   return this._hEdit.value;
}
MO.FDuiToolButtonEdit_setText = function FDuiToolButtonEdit_setText(text){
   this._hEdit.value = text;
}
MO.FDuiToolButtonMenu = function FDuiToolButtonMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton, MO.MUiContainer, MO.MDuiDropable, MO.MDuiFocus);
   o._menu           = null;
   o._statusDrop     = false;
   o._hDropPanel     = null;
   o._stylePanel     = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleDropHover = MO.Class.register(o, new MO.AStyleIcon('_styleDropHover'));
   o.onBuild         = MO.FDuiToolButtonMenu_onBuild;
   o.onEnter         = MO.FDuiToolButtonMenu_onEnter;
   o.onLeave         = MO.FDuiToolButtonMenu_onLeave;
   o.onMouseDown     = MO.FDuiToolButtonMenu_onMouseDown;
   o.onBlur          = MO.FDuiToolButtonMenu_onBlur;
   o.onMouseUp       = MO.Method.empty;
   o.construct       = MO.FDuiToolButtonMenu_construct;
   o.createChild     = MO.FDuiToolButtonMenu_createChild;
   o.push            = MO.FDuiToolButtonMenu_push;
   o.drop            = MO.FDuiToolButtonMenu_drop;
   o.doClick         = MO.FDuiToolButtonMenu_doClick;
   o.dispose         = MO.FDuiToolButtonMenu_dispose;
   return o;
}
MO.FDuiToolButtonMenu_onBuild = function FDuiToolButtonMenu_onBuild(event){
   var o = this;
   o.__base.FDuiToolButton.onBuild.call(o, event);
   var hDropPanel = o._hDropPanel = MO.Window.Builder.appendTableCell(o._hLine);
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
      o._hForm.className = o.styleName('Press');
      o.doClick();
   }
}
MO.FDuiToolButtonMenu_onBlur = function FDuiToolButtonMenu_onBlur(e){
   var o = this;
}
MO.FDuiToolButtonMenu_construct = function FDuiToolButtonMenu_construct(){
   var o = this;
   o.__base.FDuiToolButton.construct.call(o);
   var menu = o._menu = MO.Class.create(MO.FDuiPopupMenu);
   menu._opener = o;
   o.push(menu);
}
MO.FDuiToolButtonMenu_createChild = function FDuiToolButtonMenu_createChild(xconfig){
   var control = MO.RDuiControl.newInstance(xconfig);
   control._parent = this;
   return control;
}
MO.FDuiToolButtonMenu_push = function FDuiToolButtonMenu_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.MUiMenuButton)){
      o._menu.push(component);
   }else{
      o.__base.FDuiToolButton.push.call(o, component);
   }
}
MO.FDuiToolButtonMenu_drop = function FDuiToolButtonMenu_drop(flag){
   var o = this;
   if(!o._disabled){
      o._statusDrop = !o._statusDrop;
      if(o._statusDrop){
         o._hForm.className = o.styleName('Press');
         o._menu.show(o._hDropPanel, MO.EUiAlign.BottomRight);
         MO.Console.find(MO.FDuiPopupConsole).show(o._menu);
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
   o._hDropIcon = MO.Window.Html.free(o._hDropIcon);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o.__base.FControl.dispose.call(o);
}
MO.FDuiToolButtonSplit = function FDuiToolButtonSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton, MO.MUiToolButton);
   o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o.onBuild     = MO.FDuiToolButtonSplit_onBuild;
   return o;
}
MO.FDuiToolButtonSplit_onBuild = function FDuiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
MO.FDuiToolButtonText = function FDuiToolButtonText(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolButton);
   return o;
}
MO.RDuiToolBar = function RDuiToolBar(){
   var o = this;
   return o;
}
MO.RDuiToolBar.prototype.mergeNode = function RDuiToolBar_mergeNode(xtb, xNode, r){
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
MO.RDuiToolBar.prototype.fromNode = function RDuiToolBar_fromNode(control, config, panel, r){
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
MO.RDuiToolBar = new MO.RDuiToolBar();
MO.Dui.ToolBar = MO.RDuiToolBar;
