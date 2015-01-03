// ============================================================
// FSizeConsole
// ============================================================
function FSizeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.activeControl = null;
   o.cursor        = null;
   o.movePos       = new TPoint();
   o.priorRect     = new TRect();
   o.moveRect      = new TRect();
   o.scope         = EScope.Page;
   // Event
   o.ohStartDrag   = FSizeConsole_ohStartDrag;
   o.ohDrag        = FSizeConsole_ohDrag;
   o.ohStopDrag    = FSizeConsole_ohStopDrag;
   o.onInterval    = FSizeConsole_onInterval;
   // Method
   o.construct     = FSizeConsole_construct;
   o.registerDrag  = FSizeConsole_registerDrag;
   o.startDrag     = FSizeConsole_startDrag;
   o.drag          = FSizeConsole_drag;
   o.stopDrag      = FSizeConsole_stopDrag;
   return o;
}
// ------------------------------------------------------------
function FSizeConsole_ohStartDrag(){
   var o = this.link;
   var sc = this.linkSc;
   if(sc && RClass.isClass(o, MSizeable)){
      if(!o.isDraging){
         if(sc.startDrag(o)){
            o.startDrag(EDrag.Size);
         }
      }
   }
}
// ------------------------------------------------------------
function FSizeConsole_ohDrag(){
   var o = this.link;
   var sc = this.linkSc;
   if(sc && RClass.isClass(o, MSizeable)){
      sc.drag(o);
   }
}
// ------------------------------------------------------------
function FSizeConsole_ohStopDrag(){
   var o = this.link;
   var sc = this.linkSc;
   if(sc && sc.activeControl==o){
      o.stopDrag(EDrag.Size);
      sc.stopDrag(o);
   }
}
// ------------------------------------------------------------
function FSizeConsole_onInterval(){
   if(this.activeControl){
      var mr = this.moveRect;
      this.activeControl.setBounds(mr.left, mr.top, mr.right, mr.bottom);
   }
}
// ------------------------------------------------------------
function FSizeConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   // Active
   o.active = new TActive(o, o.onInterval);
   RLog.debug(o.active, 'Push active object');
   o.active.interval = 10;
   o.active.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(o.active);
}
// ------------------------------------------------------------
function FSizeConsole_registerDrag(ctl, h){
   var o = this;
   h.onmousedown = o.ohStartDrag;
   h.onmousemove = o.ohDrag;
   h.onmouseup = o.ohStopDrag;
   h.linkSc = o;
}
// ------------------------------------------------------------
function FSizeConsole_startDrag(ctl){
   var cur = ctl.cursor();
   if(cur == ECursor.Default){
      //ctl.bringToFront();
      return false;
   }
   var o = this;
   var cp = RWindow.clientPos();
   this.activeControl = ctl;
   this.activePanel = ctl.panel(EPanel.Size);
   var mr = RHtml.rect(this.activePanel);
   this.moveRect.assign(mr);
   this.priorRect.set(mr.left-cp.x, mr.top-cp.y, mr.right-cp.x, mr.bottom-cp.y);
   this.cursor = cur;
   this.activePanel.setCapture();
   o.active.status = EActive.Active;
   return true;
}
// ------------------------------------------------------------
function FSizeConsole_drag(ctl){
   if(this.activeControl){
      var pr = this.priorRect;
      var mr = this.moveRect;
      var cp = RWindow.clientPos();
      switch(this.cursor){
         case ECursor.NorthWest:
            mr.top = pr.top + cp.y;
            mr.left = pr.left + cp.x;
            break;
         case ECursor.SouthWest:
            mr.bottom = pr.bottom + cp.y;
            mr.left = pr.left + cp.x;
            break;
         case ECursor.SouthEast:
            mr.bottom = pr.bottom + cp.y;
            mr.right = pr.right + cp.x;
            break;
         case ECursor.NorthEast:
            mr.top = pr.top + cp.y;
            mr.right = pr.right + cp.x;
            break;
         case ECursor.West:
            mr.left = pr.left + cp.x;
            break;
         case ECursor.South:
            mr.bottom = pr.bottom + cp.y;
            break;
         case ECursor.East:
            mr.right = pr.right + cp.x;
            break;
         case ECursor.North:
            mr.top = pr.top + cp.y;
            break;
      }
   }else{
      ctl.setCursor();
   }
}
// ------------------------------------------------------------
function FSizeConsole_stopDrag(ctl){
   var o = this;
   o.active.status = EActive.Sleep;
   this.activePanel.releaseCapture();
   this.activeControl = null;
   this.cursor = null;
}
// ------------------------------------------------------------
