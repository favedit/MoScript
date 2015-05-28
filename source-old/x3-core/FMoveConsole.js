/**************************************************************
 * 监视移动事件的服务组件类
 *
 * @console
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FMoveConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Constant
   o.ResizeRange   = 4;
   o.ResizeBorder  = 3;
   o.WidthMin      = 200;
   o.HeightMin     = 100;
   o.LayerMax      = 20000;
   o.LayerEdit     = 30000;
   o.scope         = EScope.Page;
   // Attribute
   o.active        = null;
   o.activeControl = null;
   o.activePanel   = null;
   o.origin        = new TPoint3(0, 0, 10000);
   o.clickPos      = new TPoint();
   o.movePos       = new TPoint();
   // Event
   o.ohStartDrag   = FMoveConsole_ohStartDrag;
   o.ohDrag        = FMoveConsole_ohDrag;
   o.ohStopDrag    = FMoveConsole_ohStopDrag;
   o.onInterval    = FMoveConsole_onInterval;
   // Method
   o.construct     = FMoveConsole_construct;
   o.nextPoint     = FMoveConsole_nextPoint;
   o.nextLayer     = FMoveConsole_nextLayer;
   o.registerDrag  = FMoveConsole_registerDrag;
   o.startDrag     = FMoveConsole_startDrag;
   o.drag          = FMoveConsole_drag;
   o.stopDrag      = FMoveConsole_stopDrag;
   return o;
}

/**************************************************************
 * 开始拖动控件时的触发函数
 *
 * @method
 **************************************************************/
function FMoveConsole_ohStartDrag(){
   var o = this.link;
   var mc = this.linkMc;
   if(mc && RClass.isClass(o, MMoveable)){
      if(o.canMove && !o.inMoving){
         o.startDrag(EDrag.Move);
         mc.startDrag(o);
         o.inMoving = true;
      }
   }
}

/**************************************************************
 * 拖动中的触发函数
 *
 * @method
 **************************************************************/
function FMoveConsole_ohDrag(){
   var o = this.link;
   var mc = this.linkMc;
   if(mc && mc.activeControl==o){
      mc.drag(o);
   }
}

/**************************************************************
 * 停止拖动时的触发函数
 *
 * @method
 * @return String 对象类名称字符串
 **************************************************************/
function FMoveConsole_ohStopDrag(){
   var o = this.link;
   var mc = this.linkMc;
   if(mc && mc.activeControl==o){
      o.inMoving = false;
      o.stopDrag(EDrag.Move);
      mc.stopDrag(o);
   }
}
// ------------------------------------------------------------
function FMoveConsole_onInterval(){
   var c = this.activeControl;
   if(c){
      c.setBounds(Math.max(this.movePos.x - this.clickPos.x, 0), Math.max(this.movePos.y - this.clickPos.y, 0));
   }
}
// ------------------------------------------------------------
function FMoveConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   // Active
   o.active = new TActive(o, o.onInterval);
   RLog.debug(o.active, 'Push active object');
   o.active.interval = 0;
   o.active.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(o.active);
}
// ------------------------------------------------------------
function FMoveConsole_nextPoint(){
   var p3 = new TPoint3(this.origin.x, this.origin.y, this.origin.z);
   this.origin.resize(40, 40, 1);
   if(this.origin.x > 200 || this.origin.y > 200){
      this.origin.x = 0;
      this.origin.y = 0;
   }
   return p3;
}
// ------------------------------------------------------------
function FMoveConsole_nextLayer(){
   return ++this.origin.z;
}
// ------------------------------------------------------------
function FMoveConsole_registerDrag(ctl, h){
   var o = this;
   h.onmousedown = o.ohStartDrag;
   h.onmousemove = o.ohDrag;
   h.onmouseup = o.ohStopDrag;
   h.linkMc = o;
}
// ------------------------------------------------------------
function FMoveConsole_startDrag(ctl){
   var o = this;
   var cp = RWindow.clientPos();
   o.activeControl = ctl;
   o.activePanel = ctl.panel(EPanel.Move);
   o.activeSize = ctl.panel(EPanel.Size);
   var mr = RHtml.rect(o.activeSize);
   o.clickPos.set(cp.x - mr.left, cp.y - mr.top);
   o.movePos.assign(cp);
   o.activePanel.setCapture();
   o.active.status = EActive.Active;
   RLog.debug(o, 'Start drag {1}', ctl);
}
// ------------------------------------------------------------
function FMoveConsole_drag(ctl){
   RWindow.clientPos(this.movePos);
}
// ------------------------------------------------------------
function FMoveConsole_stopDrag(ctl){
   var o = this;
   RLog.debug(o, 'Stop drag {1}', ctl);
   o.active.status = EActive.Sleep;
   o.activePanel.releaseCapture();
   o.activeControl = null;
}

// ------------------------------------------------------------
