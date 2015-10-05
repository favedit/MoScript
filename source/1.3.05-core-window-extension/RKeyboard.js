//===========================================================
// <T>键盘管理器。</T>
//
// @enum
// @author maocy
// @version 150203
//===========================================================
MO.RKeyboard = function RKeyboard(){
   var o = this;
   //..........................................................
   // @attribute
   o._status = new Array();
   return o;
}

//===========================================================
// <T>按键落下处理。</T>
//
// @method
// @param p:event:SEvent 事件
//===========================================================
MO.RKeyboard.prototype.onKeyDown = function RKeyboard_onKeyDown(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Press;
}

//===========================================================
// <T>按键抬起处理。</T>
//
// @method
// @param p:event:SEvent 事件
//===========================================================
MO.RKeyboard.prototype.onKeyUp = function RKeyboard_onKeyUp(p){
   var o = this;
   var c = p.keyCode;
   o._status[c] = MO.EKeyStatus.Normal;
}

//===========================================================
// <T>构造处理。</T>
//
// @method
//===========================================================
MO.RKeyboard.prototype.construct = function RKeyboard_construct(){
   var o = this;
   // 设置状态
   var s = o._status;
   for(var i = 0; i < 256; i++){
      s[i] = MO.EKeyStatus.Normal;
   }
   // 增加监听
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   MO.RWindow.lsnsKeyUp.register(o, o.onKeyUp);
}

//===========================================================
// <T>判断按键是否控制键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
MO.RKeyboard.prototype.isControlKey = function RKeyboard_isControlKey(p){
   var s = MO.EKeyCode.ControlKeys;
   for(var i = s.length - 1; i >= 0; i--){
      if(s[i] == p){
         return true;
      }
   }
   return false;
}

//===========================================================
// <T>判断按键是否整数键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
MO.RKeyboard.prototype.isIntegerKey = function RKeyboard_isIntegerKey(c){
   return MO.EKeyCode.integerCodes[c];
}

//===========================================================
// <T>判断按键是否浮点数键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
MO.RKeyboard.prototype.isFloatKey = function RKeyboard_isFloatKey(c){
   return MO.EKeyCode.floatCodes[c];
}

//===========================================================
// <T>判断按键是否数字键。</T>
//
// @method
// @param p:keyCode:Integer 按键代码
// @return Boolean 是否
//===========================================================
MO.RKeyboard.prototype.isNumKey = function RKeyboard_isNumKey(c){
   if(p >= 96 && p <= 105){
      return true;
   }
   return false;
}

//===========================================================
// <T>判断按键是否按下。</T>
//
// @method
// @param keyCode:Integer 按键代码
// @return Boolean 是否按下
//===========================================================
MO.RKeyboard.prototype.isPress = function RKeyboard_isPress(keyCode){
   var o = this;
   var status = o._status[keyCode];
   return status == MO.EKeyStatus.Press;
}

//===========================================================
// <T>修正按键字符大小写。</T>
//
// @method
// @param e:event:SEvent 事件
// @param c:case:ECharCase 大小写类型
// @return String 修正后的字符
//===========================================================
MO.RKeyboard.prototype.fixCase = function RKeyboard_fixCase(e, c){
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
MO.RKeyboard.prototype.fixPattern = function RKeyboard_fixPattern(e, p){
   if(p){
      var k = e.keyCode;
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.isPattern(String.fromCharCode(k), p)){
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
MO.RKeyboard.prototype.fixChars = function RKeyboard_fixChars(e, p){
   if(p){
      var k = e.keyCode;
      if(this.isNumKey(k)){
    	  k = e.keyCode = e.keyCode - 48;
      }
      if(!this.isControlKeyPress(k)){
         if(!MO.Lang.String.inChars(String.fromCharCode(k), p)){
            e.keyCode = 0;
            e.returnValue = false;
            return false;
         }
      }
   }
   return true;
}
//..........................................................
// 实例化内容
MO.Window.Keyboard = new MO.RKeyboard();
