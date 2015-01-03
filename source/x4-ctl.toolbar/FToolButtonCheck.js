// ============================================================
// FToolButtonCheck
// ============================================================
function FToolButtonCheck(o){
   o = RClass.inherits(this, o, FToolButton);
   // Property
   o.down         = RClass.register(o, new TPtyBool('down', false));
   // Event
   o.onEnter      = FToolButtonCheck_onEnter;
   o.onLeave      = FToolButtonCheck_onLeave;
   o.onMouseDown  = FToolButtonCheck_onMouseDown;
   o.onMouseUp    = FToolButtonCheck_onMouseUp;
   // Method
   o.setDown      = FToolButtonCheck_setDown;
   o.dispose      = FToolButtonCheck_dispose;
   return o;
}
// ------------------------------------------------------------
function FToolButtonCheck_onEnter(){
   if(!this.down){
      this.hPanel.className = this.style('Hover');
   }
}
// ------------------------------------------------------------
function FToolButtonCheck_onLeave(){
   if(!this.down){
      this.hPanel.className = this.style('Button');
   }
}
// ------------------------------------------------------------
function FToolButtonCheck_onMouseDown(){
   this.hPanel.className = this.style('Press');
}
// ------------------------------------------------------------
function FToolButtonCheck_onMouseUp(){
   var o = this;
   o.hPanel.className = o.style('Hover');
   o.setDown(!o.down)
   if(o.action){
      eval(o.action);
   }
   o.processClick(o, o.down);
}
// ------------------------------------------------------------
function FToolButtonCheck_setDown(down){
   var o = this;
   if(o.down != down){
      o.down = down;
      if(down){
         o.hPanel.className = o.style('Down');
      }else{
         o.hPanel.className = o.style('Button');
      }
   }
}
// ------------------------------------------------------------
function FToolButtonCheck_dispose(){
   var o = this;
   o.base.FToolButton.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
// ------------------------------------------------------------
