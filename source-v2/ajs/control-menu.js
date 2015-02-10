function FUiMenuBar(o){
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = FUiMenuBar_onBuildPanel;
   o.appendChild = FUiMenuBar_appendChild;
   return this;
}
function FUiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}
function FUiMenuBar_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FUiMenuButton)){
      var hr = o._hLine;
      var hc = RBuilder.appendTableCell(hr);
      p.setPanel(hc);
   }
}
function FUiMenuBar_onBuild(builder){
   var doc = builder.document;
   this.hBody = doc.createDiv();
   this.hBody.className = 'menu_panel';
   this.hParent.insertBefore(this.hBody);
   builder.hParent = this.hBody;
}
function FUiMenuBar_onLoaded(cnn){
   var doc = cnn.document;
   if(doc && doc.node){
      IControl.load(this, doc.node);
      this.build();
   }
}
function FUiMenuBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hBody);
   RMemory.freeHtml(o.hParent);
   o.hBody = null;
   o.hParent = null;
}
function FUiMenuBar_connect(type, action, attrs){
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   var self = this;
   var cnn = new TXmlCnn();
   cnn.onLoad = function(){self.onLoaded(cnn)};
   cnn.send(this.service, doc);
}
function FUiMenuBar_release(){
   var nodes = this.allNodes;
   for(var n=0; n<nodes.length; n++){
      var node = nodes[n];
      node.release();
   }
   this.allNodes = null;
   this.allNodesUuid = null;
   this.allNodesProperty = null;
   this.allNodesPropertyExtend = null;
   this.nodes = null;
   return true;
}
function FUiMenuButton(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton, MListenerClick);
   o._icon         = RClass.register(o, new APtyString('_icon'));
   o._iconDisable  = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('_hotkey'));
   o._action       = RClass.register(o, new APtyString('_action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hLabel       = null;
   o.onBuildPanel  = FUiMenuButton_onBuildPanel
   o.onBuild       = FUiMenuButton_onBuild;
   o.onEnter       = FUiMenuButton_onEnter;
   o.onLeave       = FUiMenuButton_onLeave;
   o.onMouseDown   = FUiMenuButton_onMouseDown;
   o.onMouseUp     = FUiMenuButton_onMouseUp;
   o.icon          = FUiMenuButton_icon;
   o.setIcon       = FUiMenuButton_setIcon;
   o.setLabel      = FUiMenuButton_setLabel;
   o.setEnable     = FUiMenuButton_setEnable;
   o.click         = FUiMenuButton_click;
   o.dispose       = FUiMenuButton_dispose;
   return o;
}
function FUiMenuButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiMenuButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   var h = o._hPanel;
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      o._hLabel = RBuilder.appendText(h, o.styleName('Label'));
      o.setLabel(o._label);
   }
}
function FUiMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
function FUiMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_icon(){
   return this._icon;
}
function FUiMenuButton_setIcon(p){
   this._icon = p;
}
function FUiMenuButton_setLabel(p){
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
function FUiMenuButton_setEnable(p){
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
function FUiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      o.processClickListener(o);
   }
}
function FUiMenuButton_dispose(){
   var o = this;
   o._hIcon = null;
   o._hLabel = null;
   o.__base.FUiControl.dispose.call(o);
}
function FUiMenuButtonMenu(o){
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
function FUiMenuButtonMenu_oeBuild(event){
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
function FUiMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FUiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FUiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FUiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
function FUiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
function FUiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onClick(){
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
function FUiMenuButtonMenu_construct(){
   var o = this;
   o.base.FUiControl.construct.call(o);
}
function FUiMenuButtonMenu_dispose(){
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
function FUiMenuButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton);
   o.styleUp      = RClass.register(o, new AStyle('Up'));
   o.styleDown    = RClass.register(o, new AStyle('Down'));
   o.disabled     = false;
   o.oeBuild      = FUiMenuButtonSplit_oeBuild;
   o.onBuildPanel = FUiMenuButtonSplit_onBuildPanel;
   o.dispose      = FUiMenuButtonSplit_dispose;
   return o;
}
function FUiMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
function FUiMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
function FUiMenuButtonSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function MMenuButton(o){
   o = RClass.inherits(this, o);
   return o;
}
