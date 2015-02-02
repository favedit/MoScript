//==========================================================
// <T>工具栏复选按键。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FUiToolButtonCheck(o){
   o = RClass.inherits(this, o, FUiToolButton);
   // Property
   o.down         = RClass.register(o, new APtyBoolean('down', false));
   // Event
   o.onEnter      = FUiToolButtonCheck_onEnter;
   o.onLeave      = FUiToolButtonCheck_onLeave;
   o.onMouseDown  = FUiToolButtonCheck_onMouseDown;
   o.onMouseUp    = FUiToolButtonCheck_onMouseUp;
   // Method
   o.setDown      = FUiToolButtonCheck_setDown;
   o.dispose      = FUiToolButtonCheck_dispose;
   return o;
}
// ------------------------------------------------------------
function FUiToolButtonCheck_onEnter(){
   if(!this.down){
      this.hPanel.className = this.style('Hover');
   }
}
// ------------------------------------------------------------
function FUiToolButtonCheck_onLeave(){
   if(!this.down){
      this.hPanel.className = this.style('Button');
   }
}
// ------------------------------------------------------------
function FUiToolButtonCheck_onMouseDown(){
   this.hPanel.className = this.style('Press');
}
// ------------------------------------------------------------
function FUiToolButtonCheck_onMouseUp(){
   var o = this;
   o.hPanel.className = o.style('Hover');
   o.setDown(!o.down)
   if(o.action){
      eval(o.action);
   }
   o.processClick(o, o.down);
}
// ------------------------------------------------------------
function FUiToolButtonCheck_setDown(down){
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
function FUiToolButtonCheck_dispose(){
   var o = this;
   o.base.FUiToolButton.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
// ------------------------------------------------------------
