// ============================================================
// MUiFocusLooper
// ============================================================
function MUiFocusLooper(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.focusIndex   = 0;
   o.focusObjects = new TList();
   // Method
   o.focusNext    = MUiFocusLooper_focusNext;
   o.focusPrior   = MUiFocusLooper_focusPrior;
   o.pushFocus    = MUiFocusLooper_pushFocus;
   return o;
}
// ------------------------------------------------------------
function MUiFocusLooper_focusPrior(){
   var o = this;
   o.focusIndex--;
   if(o.focusIndex < 0){
      o.focusIndex = o.focusObjects.count-1;
   }
   var h = o.focusObjects.get(o.focusIndex);
   if(h){
      h.focus();
   }
}
// ------------------------------------------------------------
function MUiFocusLooper_focusNext(){
   var o = this;
   o.focusIndex++;
   if(o.focusIndex >= o.focusObjects.count){
      o.focusIndex = 0;
   }
   var h = o.focusObjects.get(o.focusIndex);
   if(h){
      h.focus();
   }
}
// ------------------------------------------------------------
function MUiFocusLooper_pushFocus(h){
   this.focusObjects.push(h);
}
// ------------------------------------------------------------
