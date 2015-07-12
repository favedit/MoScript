//==========================================================
// <T>鼠标对象控制台。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
MO.FMouseConsole = function FMouseConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Local;
   // @attribute
   o._activeCapture = null;
   //o._captures      = null;
   //..........................................................
   // @event
   o.onMouseDown    = MO.FMouseConsole_onMouseDown;
   o.onMouseMove    = MO.FMouseConsole_onMouseMove;
   o.onMouseUp      = MO.FMouseConsole_onMouseUp;
   //..........................................................
   // @method
   o.construct      = MO.FMouseConsole_construct;
   // method
   o.captureStart   = MO.FMouseConsole_captureStart;
   o.capture        = MO.FMouseConsole_capture;
   o.captureStop    = MO.FMouseConsole_captureStop;
   // method
   o.register       = MO.FMouseConsole_register;
   o.unregister     = MO.FMouseConsole_unregister;
   o.clear          = MO.FMouseConsole_clear;
   // method
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_onMouseDown = function FMouseConsole_onMouseDown(p){
   var o = this;
   // 检查来源
   var s = MO.RHtml.searchLinker(p.hSource, MO.MMouseCapture);
   if(!s){
      return;
   }
   // 检查测试
   if(!s.testMouseCapture()){
      return;
   }
   // 捕捉开始处理
   o._activeCapture = s;
   o.captureStart(p);
}

//==========================================================
// <T>鼠标移动处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_onMouseMove = function FMouseConsole_onMouseMove(p){
   var o = this;
   // 检查拖拽处理
   if(!o._activeCapture){
      return;
   }
   // 拖拽处理
   o.capture(p);
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_onMouseUp = function FMouseConsole_onMouseUp(p){
   var o = this;
   // 检查拖拽处理
   if(!o._activeCapture){
      return;
   }
   // 捕捉结束处理
   o.captureStop(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FMouseConsole_construct = function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   //o._captures = new TObjects();
   // 注册事件
   MO.RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   MO.RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   MO.RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}

//==========================================================
// <T>捕捉开始处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_captureStart = function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      MO.RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}

//==========================================================
// <T>捕捉处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_capture = function FMouseConsole_capture(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      if(c.testMouseCapture()){
         c.onMouseCapture(p);
      }else{
         o.captureStop(p)
      }
   }
}

//==========================================================
// <T>捕捉结束处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
MO.FMouseConsole_captureStop = function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   MO.RWindow.setOptionSelect(true);
}

//==========================================================
// <T>注册一个鼠标捕捉对象。</T>
//
// @method
// @param p:capture:MMouseCapture 鼠标捕捉
//==========================================================
MO.FMouseConsole_register = function FMouseConsole_register(p){
   //this._captures.push(p);
}

//==========================================================
// <T>注销一个鼠标捕捉对象。</T>
//
// @method
// @param p:capture:MMouseCapture 鼠标捕捉
//==========================================================
MO.FMouseConsole_unregister = function FMouseConsole_unregister(p){
   //this._captures.remove(p);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FMouseConsole_clear = function FMouseConsole_clear(){
   //this._captures.clear();
}
