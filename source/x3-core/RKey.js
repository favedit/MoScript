// ============================================================
// RKeyFace
// ============================================================
var RKey = new function(){
   var o = this;
   // Method
   o.isCtlKey      = RKey_isCtlKey;
   o.isNumKey      = RKey_isNumKey;
   o.isCtlKeyPress = RKey_isCtlKeyPress;
   o.eventClear    = RKey_eventClear;
   o.fixCase       = RKey_fixCase;
   o.fixPattern    = RKey_fixPattern;
   o.fixChars      = RKey_fixChars;
   // Construct
   RMemory.register('RKey', o);
   return o;
}
// ------------------------------------------------------------
// Code
function RKey_isCtlKey(c){
   var ks = EKey.ControlKeys;
   for(var n=0; n<ks.length; n++){
      if(ks[n] == c){
         return true;
      }
   }
   return false;
}

//------------------------------------------------------------
//Code 是否是小键盘数值
function RKey_isNumKey(c){
   var ks = EKey.ControlKeys;
   if(c >= 96 && c <= 105){
      return true;
   }
   return false;
}

// ------------------------------------------------------------
// Code
function RKey_isCtlKeyPress(c){
   for(var n in EKey.ControlKeys){
      if(EKey.ControlKeys[n] == c){
         return true;
      }
   }
   return false;
}
// ------------------------------------------------------------
// Event
function RKey_eventClear(e){
   e.returnValue = false;
}
// ------------------------------------------------------------
// event, case
function RKey_fixCase(e, c){
   if(e && c){
      var k = e.keyCode;
      if(ECase.Upper == c){
         k = String.fromCharCode(k).toUpperCase().charCodeAt(0)
      }else if(ECase.Lower == c){
         k = String.fromCharCode(k).toLowerCase().charCodeAt(0)
      }
      e.keyCode = k;
   }
}
// ------------------------------------------------------------
// event, pattern
function RKey_fixPattern(e, p){
   if(p){
      var k = e.keyCode;
      if(!this.isCtlKeyPress(k)){
         if(!RString.isPattern(String.fromCharCode(k), p)){
            e.keyCode = 0;
            return false;
         }
      }
   }
   return true;
}
// ------------------------------------------------------------
// event, pattern
function RKey_fixChars(e, p){
   if(p){
      var k = e.keyCode;
      if(this.isNumKey(k)){
    	  k = e.keyCode = e.keyCode - 48;
      }
      if(!this.isCtlKeyPress(k)){
         if(!RString.inChars(String.fromCharCode(k), p)){
            e.keyCode = 0;
            e.returnValue = false;
            return false;
         }
      }
   }
   return true;
}