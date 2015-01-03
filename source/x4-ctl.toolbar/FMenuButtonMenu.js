// ============================================================
// FMenuButtonMenu
// ============================================================
function FMenuButtonMenu(o){
   o = RClass.inherits(this, o, FControl, MEventFocus, MEventClick, MLsnClick);
   // Property
   o.action       = RClass.register(o, new TPtyStr('action', null));
   o.target       = RClass.register(o, new TPtyStr('target', null));
   o.page         = RClass.register(o, new TPtyStr('page'));
   o.hotkey       = RClass.register(o, new TPtyStr('hotkey'));
   o.method       = RClass.register(o, new TPtyStr('method'));
   o.icon         = RClass.register(o, new TPtyStr('icon', null));
   o.iconDisable  = RClass.register(o, new TPtyStr('iconDisable', null));
   o.attributes   = RClass.register(o, new TPtyStr('attributes'));
   // Attribute
   o.disabled     = false;
   // Html
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   // Process Event
   o.oeBuild      = FMenuButtonMenu_oeBuild;
   o.oeEnable     = FMenuButtonMenu_oeEnable;
   o.oeDisable    = FMenuButtonMenu_oeDisable;
   // Event
   o.onBuildPanel = FMenuButtonMenu_onBuildPanel;
   o.onEnter      = FMenuButtonMenu_onEnter;
   o.onLeave      = FMenuButtonMenu_onLeave;
   o.onMouseDown  = FMenuButtonMenu_onMouseDown;
   o.onMouseUp    = FMenuButtonMenu_onMouseUp;
   o.onClick      = FMenuButtonMenu_onClick;
   // Method
   o.construct    = FMenuButtonMenu_construct;
   o.dispose      = FMenuButtonMenu_dispose;
   return o;
}
// ------------------------------------------------------------
function FMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(hCel, o.icon);
   }
   if(o.label){
      o.hLabel = RBuilder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
// ------------------------------------------------------------
function FMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o.iconDisable && o.icon){
      o.hIcon.src = RRes.iconPath(o.icon);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o.iconDisable){
      o.hIcon.src = RRes.iconPath(o.iconDisable);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonMenu_onEnter(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onLeave(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Panel');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Press');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onClick(){
   var o = this;
   if(!o.disabled){
      RConsole.find(FFocusConsole).focus(o);
      if(o.action){
         eval(o.action);
      }
      if(o.page || o.method){
         var form = RHtml.form(o.hButton);
         var p = RPage.parse(o.page);
         if(o.method){
            p.action = o.method;
         }
         p.split(o.attributes);
         p.post(form, o.target);
      }
      o.processClick();
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_construct(){
   var o = this;
   o.base.FControl.construct.call(o);
}
// ------------------------------------------------------------
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
// ------------------------------------------------------------
