//==========================================================
// <T>菜单展开按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
function FMenuButtonMenu(o){
   //o = RClass.inherits(this, o, FControl, MEventFocus, MEventClick, MLsnClick);
   o = RClass.inherits(this, o, FControl);
   // Property
   o._action       = RClass.register(o, new APtyString('action', null));
   o._target       = RClass.register(o, new APtyString('target', null));
   o._page         = RClass.register(o, new APtyString('page'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._method       = RClass.register(o, new APtyString('method'));
   o._icon         = RClass.register(o, new APtyString('icon', null));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable', null));
   o._attributes   = RClass.register(o, new APtyString('attributes'));
   // Attribute
   o._disabled     = false;
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
   if(o._icon){
      o.hIcon = RBuilder.appendIcon(hCel, o._icon);
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
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
// ------------------------------------------------------------
function FMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
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
