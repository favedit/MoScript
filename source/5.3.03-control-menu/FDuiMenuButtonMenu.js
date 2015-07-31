//==========================================================
// <T>菜单展开按键。</T>
//
// @face
// @author maocy
// @history 150121
//==========================================================
MO.FDuiMenuButtonMenu = function FDuiMenuButtonMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   // Property
   o._action      = MO.Class.register(o, new MO.APtyString('action', null));
   o._target      = MO.Class.register(o, new MO.APtyString('target', null));
   o._page        = MO.Class.register(o, new MO.APtyString('page'));
   o._hotkey      = MO.Class.register(o, new MO.APtyString('hotkey'));
   o._method      = MO.Class.register(o, new MO.APtyString('method'));
   o._icon        = MO.Class.register(o, new MO.APtyString('icon', null));
   o._iconDisable = MO.Class.register(o, new MO.APtyString('iconDisable', null));
   o._attributes  = MO.Class.register(o, new MO.APtyString('attributes'));
   // Attribute
   o._disabled    = false;
   // Html
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   // Process Event
   o.oeBuild      = MO.FDuiMenuButtonMenu_oeBuild;
   o.oeEnable     = MO.FDuiMenuButtonMenu_oeEnable;
   o.oeDisable    = MO.FDuiMenuButtonMenu_oeDisable;
   // Event
   o.onBuildPanel = MO.FDuiMenuButtonMenu_onBuildPanel;
   o.onEnter      = MO.FDuiMenuButtonMenu_onEnter;
   o.onLeave      = MO.FDuiMenuButtonMenu_onLeave;
   o.onMouseDown  = MO.FDuiMenuButtonMenu_onMouseDown;
   o.onMouseUp    = MO.FDuiMenuButtonMenu_onMouseUp;
   o.onClick      = MO.FDuiMenuButtonMenu_onClick;
   // Method
   o.construct    = MO.FDuiMenuButtonMenu_construct;
   o.dispose      = MO.FDuiMenuButtonMenu_dispose;
   return o;
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_oeBuild = function FDuiMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = MO.Window.Builder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o._icon){
      o.hIcon = MO.Window.Builder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o.hLabel = MO.Window.Builder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return MO.EEventStatus.Stop;
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onBuildPanel = function FDuiMenuButtonMenu_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'DIV');
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FDuiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return MO.EEventStatus.Stop;
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FDuiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return MO.EEventStatus.Stop;
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onEnter = function FDuiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onLeave = function FDuiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onMouseDown = function FDuiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onMouseUp = function FDuiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_onClick = function FDuiMenuButtonMenu_onClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FFocusConsole).focus(o);
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
         var form = MO.Window.Html.form(o.hButton);
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
MO.FDuiMenuButtonMenu_construct = function FDuiMenuButtonMenu_construct(){
   var o = this;
   o.base.FDuiControl.construct.call(o);
}
// ------------------------------------------------------------
MO.FDuiMenuButtonMenu_dispose = function FDuiMenuButtonMenu_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   o.hPanel = MO.Window.Html.free(o.hPanel);
   o.hButton = MO.Window.Html.free(o.hButton);
   o.hIcon = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
