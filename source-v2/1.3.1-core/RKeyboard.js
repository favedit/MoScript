//===========================================================
// <T>键盘管理器。</T>
//
// @enum
// @author maocy
// @version 141230
//===========================================================
var RKeyboard = new function RKeyboard(){
   var o = this;
   //..........................................................
   // @method
   o.isCtlKey      = RKeyboard_isCtlKey;
   o.isNumKey      = RKeyboard_isNumKey;
   o.isCtlKeyPress = RKeyboard_isCtlKeyPress;
   o.fixCase       = RKeyboard_fixCase;
   o.fixPattern    = RKeyboard_fixPattern;
   o.fixChars      = RKeyboard_fixChars;
   return o;
}
// ------------------------------------------------------------
// Code
function RKeyboard_isCtlKey(c){
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
function RKeyboard_isNumKey(c){
   var ks = EKey.ControlKeys;
   if(c >= 96 && c <= 105){
      return true;
   }
   return false;
}

// ------------------------------------------------------------
// Code
function RKeyboard_isCtlKeyPress(c){
   for(var n in EKey.ControlKeys){
      if(EKey.ControlKeys[n] == c){
         return true;
      }
   }
   return false;
}
// ------------------------------------------------------------
// event, case
function RKeyboard_fixCase(e, c){
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
function RKeyboard_fixPattern(e, p){
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
function RKeyboard_fixChars(e, p){
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