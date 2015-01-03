// ============================================================
// FScrollContainer
// ============================================================
function FScrollContainer(o){
   o = RClass.inherits(this, o, FControl);
   // Attribute
   o.hParent    = null;
   o.hPanel     = null;
   o.controls   = null;
   o.top        = null;
   o.left       = null;
   o.width      = null;
   o.height     = null;
   o.rect       = new TRect();
   // Event
   o.oeBuild    = null;
   o.oeRefresh  = null;
   o.oeResize   = null;
   o.oeShow     = FScrollContainer_oeShow;
   o.oeHidden   = FScrollContainer_oeHidden;
   o.oeDisable  = FScrollContainer_oeDisable;
   o.oeEnable   = FScrollContainer_oeEnable;
   o.onEvent    = FScrollContainer_onEvent;
   // Method
   o.topControl = FScrollContainer_topControl;
   o.push       = FScrollContainer_push;
   o.build      = FScrollContainer_build;
   o.show       = FScrollContainer_show;
   o.hide       = FScrollContainer_hide;
   o.enable     = FScrollContainer_enable;
   o.disable    = FScrollContainer_disable;
   o.refresh    = FScrollContainer_refresh;
   o.release    = FScrollContainer_release;
   o.style      = FScrollContainer_style;
   o.panel      = FScrollContainer_panel;
   o.setPanel   = FScrollContainer_setPanel;
   o.dispose    = FScrollContainer_dispose;
   return o;
}
// ------------------------------------------------------------
function FScrollContainer_oeShow(event){
   if(event.isBefore()){
      if(this.hPanel){
         this.hPanel.style.display = 'block';
      }
   }
}
// ------------------------------------------------------------
function FScrollContainer_oeHidden(event){
   if(event.isAfter()){
      if(this.hPanel){
         this.hPanel.style.display = 'none';
      }
   }
}
// ------------------------------------------------------------
function FScrollContainer_oeEnable(event){
   if(event.isBefore()){
      var h = this.hPanel;
      if(h){
         h.disabled = false;
         h.style.cursor = 'auto';
      }
   }
}
// ------------------------------------------------------------
function FScrollContainer_oeDisable(event){
   if(event.isAfter()){
      var h = this.hPanel;
      if(h){
         h.disabled = true;
         h.style.cursor = 'wait';
      }
   }
}
// ------------------------------------------------------------
function FScrollContainer_onEvent(event){
   var status = this.base.FComponent.onEvent.call(this, event);
   if(EEventStatus.Continue == status){
      switch(event.code){
         case EEvent.Build:
            if(this.oeBuild){
               status = this.oeBuild(event);
            }
            break;
         case EEvent.Refresh:
            if(this.oeRefresh){
               status = this.oeRefresh(event);
            }
            break;
         case EEvent.Resize:
            if(this.oeResize){
               status = this.oeResize(event);
            }
            break;
         case EEvent.Show:
            status = this.oeShow(event);
            break;
         case EEvent.Hidden:
            status = this.oeHidden(event);
            break;
         case EEvent.Disable:
            status = this.oeDisable(event);
            break;
         case EEvent.Enable:
            status = this.oeEnable(event);
            break;
      }
   }
   return status ? status : EEventStatus.Continue;
}
// ------------------------------------------------------------
function FScrollContainer_topControl(){
   var o = this;
   while(o.parent != null){
      if(o.parent.base && o.parent.base.FScrollContainer){
         o = o.parent;
      }else{
         break;
      }
   }
   return o;
}
// ------------------------------------------------------------
function FScrollContainer_push(ctl){
   this.base.FComponent.push.call(this, ctl);
   if(ctl && ctl.base && ctl.base.FScrollContainer){
      if(!this.controls){
         this.controls = new TList();
      }
      this.controls.push(ctl);
   }
}
// ------------------------------------------------------------
function FScrollContainer_build(builder){
   var event = new TEvent(this, EEvent.Build);
   event.builder = builder;
   this.process(event);
}
// ------------------------------------------------------------
function FScrollContainer_resize(){
   this.process(new TEvent(this, EEvent.Resize));
}
// ------------------------------------------------------------
function FScrollContainer_show(){
   this.process(new TEvent(this, EEvent.Show));
}
// ------------------------------------------------------------
function FScrollContainer_hide(){
   this.process(new TEvent(this, EEvent.Hidden));
}
// ------------------------------------------------------------
function FScrollContainer_enable(){
   this.process(new TEvent(this, EEvent.Enable));
}
// ------------------------------------------------------------
function FScrollContainer_disable(){
   this.process(new TEvent(this, EEvent.Disable));
}
// ------------------------------------------------------------
function FScrollContainer_refresh(){
   this.process(new TEvent(this, EEvent.Refresh));
}
// ------------------------------------------------------------
function FScrollContainer_release(){
   this.hPanel = null;
   this.controls = null;
   this.base.FComponent.release.call(this);
}
// ------------------------------------------------------------
function FScrollContainer_style(name){
   return RClass.name(this) + '_' + name;
}
// ------------------------------------------------------------
function FScrollContainer_panel(){
   return o.hPanel;
}
// ------------------------------------------------------------
function FScrollContainer_setPanel(){
}

// ------------------------------------------------------------
// ------------------------------------------------------------
function FScrollContainer_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
