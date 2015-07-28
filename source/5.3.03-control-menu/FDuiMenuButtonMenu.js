with(MO){
   //==========================================================
   // <T>菜单展开按键。</T>
   //
   // @face
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDuiMenuButtonMenu = function FDuiMenuButtonMenu(o){
      o = RClass.inherits(this, o, FDuiControl);
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
      o.oeBuild      = FDuiMenuButtonMenu_oeBuild;
      o.oeEnable     = FDuiMenuButtonMenu_oeEnable;
      o.oeDisable    = FDuiMenuButtonMenu_oeDisable;
      // Event
      o.onBuildPanel = FDuiMenuButtonMenu_onBuildPanel;
      o.onEnter      = FDuiMenuButtonMenu_onEnter;
      o.onLeave      = FDuiMenuButtonMenu_onLeave;
      o.onMouseDown  = FDuiMenuButtonMenu_onMouseDown;
      o.onMouseUp    = FDuiMenuButtonMenu_onMouseUp;
      o.onClick      = FDuiMenuButtonMenu_onClick;
      // Method
      o.construct    = FDuiMenuButtonMenu_construct;
      o.dispose      = FDuiMenuButtonMenu_dispose;
      return o;
   }
   // ------------------------------------------------------------
   MO.FDuiMenuButtonMenu_oeBuild = function FDuiMenuButtonMenu_oeBuild(event){
      var o = this;
      o.base.FDuiControl.oeBuild.call(o, event);
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
   MO.FDuiMenuButtonMenu_onBuildPanel = function FDuiMenuButtonMenu_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'DIV');
   }
   // ------------------------------------------------------------
   MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event){
      var o = this;
      o.base.FDuiControl.oeEnable.call(o, event);
      o.hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o.hIcon.src = RRes._iconPath(o._icon);
      }
      return EEventStatus.Stop;
   }
   // ------------------------------------------------------------
   MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event){
      var o = this;
      o.base.FDuiControl.oeDisable.call(o, event);
      o.hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o.hIcon.src = RRes._iconPath(o._iconDisable);
      }
      return EEventStatus.Stop;
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
   MO.FDuiMenuButtonMenu_construct = function FDuiMenuButtonMenu_construct(){
      var o = this;
      o.base.FDuiControl.construct.call(o);
   }
   // ------------------------------------------------------------
   MO.FDuiMenuButtonMenu_dispose = function FDuiMenuButtonMenu_dispose(){
      var o = this;
      o.base.FDuiControl.dispose.call(o);
      RMemory.freeHtml(o.hPanel);
      RMemory.freeHtml(o.hButton);
      o.hPanel = null;
      o.hIcon = null;
      o.hButton = null;
      o.hButtonLine = null;
      o.hLabel = null;
   }
}
