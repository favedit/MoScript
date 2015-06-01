// ============================================================
// FLgMoveLayer
// ============================================================
function FLgMoveLayer(o){
   o = RClass.inherits(this, o, FControl);
   o.x          = 0;
   o.endX       = 0;
   o.step       = 1;
   o.isReturn   = true;
   o.onMoving   = FLgMoveLayer_onMoving;
   // method
   o.reset      = FLgMoveLayer_reset;
   o.link       = FLgMoveLayer_link;
   return o;
}
// ------------------------------------------------------------
function FLgMoveLayer_onMoving(){
   var o = this;
   if(o.isReturn){
      var x = o.hPanel.style.pixelLeft;
      if(x != o.x){
         var absx = Math.abs(x - o.x);
         var step = Math.min(parseInt(o.step*o.step), absx);
         o.hPanel.style.pixelLeft += (x - o.x > 0) ? step : +step;
         o.step += 0.2;
         o.hPanel.filters.Alpha.opacity = 140 - 100/Math.abs(o.endX - o.x)*absx;
      }
   }else{
      var x = o.hPanel.style.pixelLeft;
      if(x != o.endX){
         var absx = Math.abs(x - o.endX);
         var step = Math.min(parseInt(o.step*o.step), absx);
         o.hPanel.style.pixelLeft -= (x - o.endX > 0) ? step : +step;
         o.step += 0.2;
         o.hPanel.filters.Alpha.opacity = 100/Math.abs(o.endX - o.x)*absx + 40;
      }
   }
}
// ------------------------------------------------------------
function FLgMoveLayer_reset(){
   var o = this;
   o.step = 1;
}
// ------------------------------------------------------------
function FLgMoveLayer_link(hp, src){
   var o = this;
   o.hPanel = hp;
   var h = o.hImg = RBuilder.append(hp, 'IMG');
   h.src = src;
}
