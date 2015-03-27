function MUiToolButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FUiToolBar(o){
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
   o.click            = FUiToolButton_click;
   o.dispose          = FUiToolButton_dispose;
   return o;
}
function FUiToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiToolButton_onBuildButton(p){
   var o = this;
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
function FUiToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o.onBuildButton(p);
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
function FUiToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Tool button Mouse click. (label={1})' + o._label);
   var event = new SClickEvent(o);
   o.processClickListener(event);
   event.dispose();
   if(o._action){
      eval(o._action);
   }
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
function FUiToolButtonEdit(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._editSize       = RClass.register(o, new APtySize2('_editSize'));
   o._statusChecked  = false;
   o._hEdit          = null;
   o.onBuildButton   = FUiToolButtonEdit_onBuildButton;
   o.onEnter         = FUiToolButtonEdit_onEnter;
   o.onLeave         = FUiToolButtonEdit_onLeave;
   o.construct       = FUiToolButtonEdit_construct;
   o.text            = FUiToolButtonEdit_text;
   o.setText         = FUiToolButtonEdit_setText;
   return o;
}
function FUiToolButtonEdit_onBuildButton(p){
   var o = this;
   var h = o._hPanel;
   var hf = o._hForm = RBuilder.appendTable(h);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hl);
   var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
   hEdit.style.width = o._editSize.width +  'px';
   o._hEditSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
   if(o._icon){
      var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
      o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
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
function FUiToolButtonEdit_onEnter(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Hover');
   }
}
function FUiToolButtonEdit_onLeave(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Normal');
   }
}
function FUiToolButtonEdit_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
   o._editSize = new SSize2();
}
function FUiToolButtonEdit_text(){
   return this._hEdit.value;
}
function FUiToolButtonEdit_setText(text){
   this._hEdit.value = text;
}
function FUiToolButtonMenu(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MUiDropable, MUiFocus);
   o._popup          = null;
   o._hDropPanel     = null;
   o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
   o.onBuild         = FUiToolButtonMenu_onBuild;
   o.onEnter         = FUiToolButtonMenu_onEnter;
   o.onLeave         = FUiToolButtonMenu_onLeave;
   o.onBlur          = FUiToolButtonMenu_onBlur;
   o.onButtonClick   = FUiToolButtonMenu_onButtonClick;
   o.onDropClick     = FUiToolButtonMenu_onDropClick;
   o.construct       = FUiToolButtonMenu_construct;
   o.push            = FUiToolButtonMenu_push;
   o.drop            = FUiToolButtonMenu_drop;
   o.dispose         = FUiToolButtonMenu_dispose;
   return o;
}
function FUiToolButtonMenu_onEnter(e){
   var o = this;
}
function FUiToolButtonMenu_onLeave(e){
   var o = this;
}
function FUiToolButtonMenu_onBlur(e){
   var o = this;
}
function FUiToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o._disabled){
      o.__base.FUiToolButton.onButtonClick.call(o);
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
   return o.__base.FUiToolButton.onBuild.call(o, e);
   if(e.isBefore()){
      var h = o._hDropPanel = o.hButtonLine.insertCell();
      h.className = o.style('Drop')
      o._hDropIcon = RBuilder.appendIcon(h, o.styleIcon('Drop'));
      o.attachEvent('onDropClick', h);
   }
   if(e.isAfter()){
      o._popup.psBuild();
   }
   return EEventStatus.Continue;
}
function FUiToolButtonMenu_construct(){
   var o = this;
   o.__base.FUiToolButton.construct.call(o);
}
function FUiToolButtonMenu_push(c){
   var o = this;
}
function FUiToolButtonMenu_drop(){
   var o = this;
   if(!o._disabled){
      o._popup.show(this._hDropPanel, EAlign.BottomRight);
   }
}
function FUiToolButtonMenu_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o._hDropIcon = null;
   o._hDropPanel = null;
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
var RUiToolBar = new function RUiToolBar(){
   var o = this;
   o.fromNode = RUiToolBar_fromNode;
   return o;
}
function RUiToolBar_mergeNode(xtb, xNode, r){
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
function RUiToolBar_fromNode(control, config, panel, r){
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
