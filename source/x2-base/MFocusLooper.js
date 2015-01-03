// ============================================================
// MFocusLooper
// ============================================================
function MFocusLooper(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.focusIndex   = 0;
   o.focusObjects = new TList();
   // Method
   o.focusNext    = MFocusLooper_focusNext;
   o.focusPrior   = MFocusLooper_focusPrior;
   o.pushFocus    = MFocusLooper_pushFocus;
   return o;
}
// ------------------------------------------------------------
function MFocusLooper_focusPrior(){
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
function MFocusLooper_focusNext(){
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
function MFocusLooper_pushFocus(h){
   this.focusObjects.push(h);
}
// ------------------------------------------------------------
