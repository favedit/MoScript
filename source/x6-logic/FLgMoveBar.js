// ============================================================
// FLgMoveBar
// ============================================================
function FLgMoveBar(o){
   o = RClass.inherits(this, o, FControl);
   o.active          = null;
   o.layers          = null;
   o.activeLayer     = null;
   // event
   o.onActiveProcess = FLgMoveBar_onActiveProcess;
   o.onMouseOver     = FLgMoveBar_onMouseOver;
   // method
   o.construct       = FLgMoveBar_construct;
   o.push            = FLgMoveBar_push;
   o.update          = FLgMoveBar_update;
   return o;
}
// ------------------------------------------------------------
function FLgMoveBar_onActiveProcess(){
   var o = this;
   var al = o.activeLayer;
   if(al){
      var c = o.layers.count;
      for(var n=0; n<c; n++){
         o.layers.get(n).onMoving();
      }
   }
}
// ------------------------------------------------------------
function FLgMoveBar_onMouseOver(s, e){
   var o = this;
   var al = o.activeLayer;
   if(al != s){
      o.activeLayer = s;
      // 设置每一层的状态
      var idx = o.layers.indexOf(s);
      var c = o.layers.count;
      for(var n=0; n<c; n++){
         var l = o.layers.get(n);
         l.isReturn = (n >= idx);
         l.reset();
      }
      o.active.status = EActive.Active;
   }
}
// ------------------------------------------------------------
function FLgMoveBar_construct(){
   var o = this;
   var a = o.active = new TActive(o, o.onActiveProcess);
   a.interval = 1;
   a.status = EActive.Sleep;
   o.layers = new TList();
   RConsole.find(FActiveConsole).push(a);
}
// ------------------------------------------------------------
function FLgMoveBar_push(c){
   var o = this;
   o.layers.push(c);
   c.x = c.hPanel.style.pixelLeft;
   o.linkEvent(c, 'onMouseOver', c.hPanel);
}
// ------------------------------------------------------------
function FLgMoveBar_update(){
   var o = this;
   var c = o.layers.count;
   var w = o.hPanel.offsetWidth;
   var lw = (w - o.layerWidth) / (c - 1)
   for(var n=0; n<c; n++){
      var l = o.layers.get(n);
      l.endX = parseInt(lw + lw*n -o.layerWidth + 2 - n - n);
   }
}
