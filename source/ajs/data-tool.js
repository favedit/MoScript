function FUiDataToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   return o;
}
function FUiDataToolButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._icon            = RClass.register(o, new APtyString('_icon'));
   o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
   o._action          = RClass.register(o, new APtyString('_action'));
   o._styleNormal     = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover      = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress      = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable    = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIconPanel  = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIcon       = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._disabled        = false;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = FUiDataToolButton_onBuildPanel;
   o.onBuild          = FUiDataToolButton_onBuild;
   o.onEnter          = FUiDataToolButton_onEnter;
   o.onLeave          = FUiDataToolButton_onLeave;
   o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiDataToolButton_onMouseDown);
   o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiDataToolButton_onMouseUp);
   o.icon             = FUiDataToolButton_icon;
   o.setIcon          = FUiDataToolButton_setIcon;
   o.setLabel         = FUiDataToolButton_setLabel;
   o.setEnable        = FUiDataToolButton_setEnable;
   o.click            = FUiDataToolButton_click;
   o.dispose          = FUiDataToolButton_dispose;
   return o;
}
function FUiDataToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiDataToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   var hf = o._hForm = RBuilder.appendTable(p);
   var hl = o._hLine = RBuilder.appendTableRow(hf);
   if(o._icon){
      var hl = o._hIconPanel = RBuilder.appendTableCell(hl);
      o._hIcon = RBuilder.appendIcon(hl, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      var hl = o._hLabelPanel = RBuilder.appendTableCell(hl);
      o.setLabel(o._label);
   }
}
function FUiDataToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiDataToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiDataToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}
function FUiDataToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiDataToolButton_icon(){
   return this._icon;
}
function FUiDataToolButton_setIcon(p){
   this._icon = p;
}
function FUiDataToolButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   if(o._hIcon){
      s = ' ' + o._label;
   }
   if(o._hLabel){
      o._hLabel.innerText = s;
   }
}
function FUiDataToolButton_setEnable(p){
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
function FUiDataToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.processClickListener(o);
}
function FUiDataToolButton_dispose(){
   var o = this;
   o._hButton = null;
   o._hButtonLine = null;
   o._hButtonPanel = null;
   o._hIcon = null;
   o._hText = null;
   o.__base.FUiControl.dispose.call(o);
}
function FUiDataToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
