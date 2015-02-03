//===========================================================
// <T>键盘管理器。</T>
//
// @enum
// @author maocy
// @version 150203
//===========================================================
var RKeyboard = new function RKeyboard(){
   var o = this;
   //..........................................................
   // @attribute
   o._status       = new Array();
   //..........................................................
   // @event
   o.onKeyDown     = RKeyboard_onKeyDown;
   o.onKeyUp       = RKeyboard_onKeyUp;
   //..........................................................
   // @method
   o.construct     = RKeyboard_construct;
   // @method
   o.isCtlKey      = RKeyboard_isCtlKey;
   o.isNumKey      = RKeyboard_isNumKey;
   o.isPress       = RKeyboard_isPress;
   o.isCtlKeyPress = RKeyboard_isCtlKeyPress;
   // @method
   o.fixCase       = RKeyboard_fixCase;
   o.fixPattern    = RKeyboard_fixPattern;
   o.fixChars      = RKeyboard_fixChars;
   return o;
}

//===========================================================
// <T>按键落下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//===========================================================
function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = EKeyStatus.Press;
}

//===========================================================
// <T>按键抬起处理。</T>
//
// @method
// @param p:event:SEvent 事件
//===========================================================
function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = EKeyStatus.Normal;
}

//===========================================================
// <T>构造处理。</T>
//
// @method
//===========================================================
function RKeyboard_construct(){
   var o = this;
   // 设置状态
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = EKeyStatus.Normal;
   }
   // 增加监听
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}

//===========================================================
// <T>判断按键是否控制键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
function RKeyboard_isCtlKey(p){
   var s = EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}

//===========================================================
// <T>判断按键是否数字键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}

//===========================================================
// <T>判断按键是否按下。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否按下
//===========================================================
function RKeyboard_isPress(p){
   var o = this;
   // 设置状态
   var v = o._status[p];
   return v == EKeyStatus.Press;
}

//===========================================================
// <T>判断控制键是否按下。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否按下
//===========================================================
function RKeyboard_isCtlKeyPress(p){
   for(var n in EKeyCode.ControlKeys){
      if(EKey.ControlKeys[n] == p){
         return true;
      }
   }
   return false;
}

//===========================================================
// <T>修正按键字符大小写。</T>
//
// @method
// @param e:event:SEvent 事件
// @param c:case:ECharCase 大小写类型
// @return String 修正后的字符
//===========================================================
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

//===========================================================
// <T>修正按键字符在样式内。</T>
//
// @method
// @param e:event:SEvent 事件
// @param c:case:ECharCase 大小写类型
// @return String 修正后的字符
//===========================================================
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

//===========================================================
// <T>修正按键字符在样式内。</T>
//
// @method
// @param e:event:SEvent 事件
// @param c:case:ECharCase 大小写类型
// @return String 修正后的字符
//===========================================================
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
