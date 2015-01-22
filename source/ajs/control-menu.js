function FMenuBar(o){
   o = RClass.inherits(this, o, FContainer);
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._hLine            = null;
   o.onBuildPanel = FMenuBar_onBuildPanel
   o.onBuild          = FMenuBar_onBuild;
   o.appendButton     = FMenuBar_appendButton;
   return this;
}
function FMenuBar_onBuildPanel(e){
   var o = this;
   var hc = o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(hc);
}
function FMenuBar_appendButton(p){
   var o = this;
   var hr = o._hLine;
   var hc = RBuilder.appendTableCell(hr);
   p.setPanel(hc);
}
function FMenuBar_onBuild(builder){
   var doc = builder.document;
   this.hBody = doc.createDiv();
   this.hBody.className = 'menu_panel';
   this.hParent.insertBefore(this.hBody);
   builder.hParent = this.hBody;
}
function FMenuBar_onLoaded(cnn){
   var doc = cnn.document;
   if(doc && doc.node){
      IControl.load(this, doc.node);
      this.build();
   }
}
function FMenuBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hBody);
   RMemory.freeHtml(o.hParent);
   o.hBody = null;
   o.hParent = null;
}
function FMenuBar_connect(type, action, attrs){
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
function FMenuBar_release(){
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
function FMenuButton(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   o._icon         = RClass.register(o, new APtyString('icon'));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._action       = RClass.register(o, new APtyString('action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleLabel', 'Icon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hText        = null;
   o.onBuildPanel  = FMenuButton_onBuildPanel
   o.onEnter       = FMenuButton_onEnter;
   o.onLeave       = FMenuButton_onLeave;
   o.onMouseDown   = FMenuButton_onMouseDown;
   o.onMouseUp     = FMenuButton_onMouseUp;
   o.oeBuild       = FMenuButton_oeBuild;
   o.icon          = FMenuButton_icon;
   o.setIcon       = FMenuButton_setIcon;
   o.setEnable     = FMenuButton_setEnable;
   o.click         = FMenuButton_click;
   o.dispose       = FMenuButton_dispose;
   return o;
}
function FMenuButton_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Normal'));
}
function FMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
function FMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FMenuButton_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hPanel;
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(hc, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      var s = o._label;
      if(o._hIcon){
      }
      o.hLabel = RBuilder.appendText(hc, o.styleName('Label'), s);
   }
   return EEventStatus.Stop;
}
function FMenuButton_icon(){
   return this._icon;
}
function FMenuButton_setIcon(p){
   this._icon = p;
}
function FMenuButton_setEnable(p){
   var o = this;
   o.__base.FControl.setEnable.call(o, p);
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
function FMenuButton_click(){
   var o = this;
   if(!o._disabled){
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
      }
   }
}
function FMenuButton_dispose(){
   var o = this;
   o._hIcon = null;
   o._hText = null;
   o.__base.FControl.dispose.call(o);
}
function FMenuButtonMenu(o){
   o = RClass.inherits(this, o, FControl);
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
   o.oeBuild      = FMenuButtonMenu_oeBuild;
   o.oeEnable     = FMenuButtonMenu_oeEnable;
   o.oeDisable    = FMenuButtonMenu_oeDisable;
   o.onBuildPanel = FMenuButtonMenu_onBuildPanel;
   o.onEnter      = FMenuButtonMenu_onEnter;
   o.onLeave      = FMenuButtonMenu_onLeave;
   o.onMouseDown  = FMenuButtonMenu_onMouseDown;
   o.onMouseUp    = FMenuButtonMenu_onMouseUp;
   o.onClick      = FMenuButtonMenu_onClick;
   o.construct    = FMenuButtonMenu_construct;
   o.dispose      = FMenuButtonMenu_dispose;
   return o;
}
function FMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
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
function FMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
function FMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
function FMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
function FMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
function FMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FMenuButtonMenu_onClick(){
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
function FMenuButtonMenu_construct(){
   var o = this;
   o.base.FControl.construct.call(o);
}
function FMenuButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hIcon = null;
   o.hButton = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
function FMenuButtonSplit(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   o.styleUp      = RClass.register(o, new AStyle('Up'));
   o.styleDown    = RClass.register(o, new AStyle('Down'));
   o.disabled     = false;
   o.oeBuild      = FMenuButtonSplit_oeBuild;
   o.onBuildPanel = FMenuButtonSplit_onBuildPanel;
   o.dispose      = FMenuButtonSplit_dispose;
   return o;
}
function FMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
function FMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
function FMenuButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function MMenuButton(o){
   o = RClass.inherits(this, o);
   return o;
}
