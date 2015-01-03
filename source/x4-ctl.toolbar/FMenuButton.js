// ============================================================
// FMenuButton
// ============================================================
function FMenuButton(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   // Property
   o.action        = RClass.register(o, new TPtyStr('action', null));
   o.target        = RClass.register(o, new TPtyStr('target', null));
   o.page          = RClass.register(o, new TPtyStr('page'));
   o.hotkey        = RClass.register(o, new TPtyStr('hotkey'));
   o.method        = RClass.register(o, new TPtyStr('method'));
   o.icon          = RClass.register(o, new TPtyStr('icon', null));
   o.iconDisable   = RClass.register(o, new TPtyStr('iconDisable', null));
   o.attributes    = RClass.register(o, new TPtyStr('attributes'));
   /// @style
   o.styleButton   = RClass.register(o, new TStyle('Button'));
   o.styleLabel    = RClass.register(o, new TStyle('Label'));
   o.styleDisable  = RClass.register(o, new TStyle('Disable'));
   o.styleHover    = RClass.register(o, new TStyle('Hover'));
   o.stylePress    = RClass.register(o, new TStyle('Press'));
   // Attribute
   o.disabled      = false;
   // Html
   o.hButton       = null;
   o.hButtonLine   = null;
   o.hButtonPanel  = null;
   o.hIcon         = null;
   o.hText         = null;
   // Process Event
   o.oeBuild       = FMenuButton_oeBuild;
   o.oeEnable      = FMenuButton_oeEnable;
   o.oeDisable     = FMenuButton_oeDisable;
   // Event
   o.onBuildPanel  = FMenuButton_onBuildPanel;
   o.onEnter       = FMenuButton_onEnter;
   o.onLeave       = FMenuButton_onLeave;
   o.onMouseDown   = FMenuButton_onMouseDown;
   o.onMouseUp     = FMenuButton_onMouseUp;
   // Method
   o.click         = FMenuButton_click;
   o.dispose       = FMenuButton_dispose;
   return o;
}
// ------------------------------------------------------------
function FMenuButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var h = o.hPanel;
   o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
   //o.attachEvent('onButtonMouseDown', o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   hCel.noWrap = 'true';
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
function FMenuButton_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
// ------------------------------------------------------------
function FMenuButton_oeEnable(e){
   var o = this;
   o.base.FControl.oeEnable.call(o, e);
   o.hPanel.className = o.style('Button');
   if(o.iconDisable && o.icon){
      o.hIcon.src = RRes.iconPath(o.icon);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButton_oeDisable(e){
   var o = this;
   o.base.FControl.oeDisable.call(o, e);
   o.hPanel.className = o.style('Disable');
   if(o.iconDisable){
      o.hIcon.src = RRes.iconPath(o.iconDisable);
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FMenuButton_onEnter(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
function FMenuButton_onLeave(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Panel');
   }
}
// ------------------------------------------------------------
function FMenuButton_onMouseDown(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Press');
      o.click();
   }
}
// ------------------------------------------------------------
function FMenuButton_onMouseUp(){
   var o = this;
   if(!o.disabled){
      o.hPanel.className = o.style('Hover');
   }
}
// ------------------------------------------------------------
function FMenuButton_click(){
   var o = this;
   if(!o.disabled){
      RConsole.find(FFocusConsole).blur();
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
   }
}
// ------------------------------------------------------------
function FMenuButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hIcon);
   RMemory.freeHtml(o.hLabel);
   o.hPanel = null;
   o.hIcon = null;
   o.hLabel = null;
}
// ------------------------------------------------------------
