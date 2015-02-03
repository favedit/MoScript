//==========================================================
// <T>鼠标对象控制台。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
function FMouseConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = EScope.Local;
   // @attribute
   o._activeCapture = null;
   o._captures      = null;
   //..........................................................
   // @event
   o.onMouseDown    = FMouseConsole_onMouseDown;
   o.onMouseMove    = FMouseConsole_onMouseMove;
   o.onMouseUp      = FMouseConsole_onMouseUp;
   //..........................................................
   // @method
   o.construct      = FMouseConsole_construct;
   // method
   o.captureStart   = FMouseConsole_captureStart;
   o.capture        = FMouseConsole_capture;
   o.captureStop    = FMouseConsole_captureStop;
   // method
   o.register       = FMouseConsole_register;
   o.unregister     = FMouseConsole_unregister;
   o.clear          = FMouseConsole_clear;
   // method
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function FMouseConsole_onMouseDown(p){
   var o = this;
   // 检查来源
   var s = p.source;
   if(!s){
      return;
   }
   // 检查类型
   if(!RClass.isClass(s, MMouseCapture)){
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
function FMouseConsole_onMouseMove(p){
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
function FMouseConsole_onMouseUp(p){
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
function FMouseConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   o._captures = new TObjects();
   // 注册事件
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseMove.register(o, o.onMouseMove);
   RWindow.lsnsMouseUp.register(o, o.onMouseUp);
}

//==========================================================
// <T>捕捉开始处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function FMouseConsole_captureStart(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      RWindow.setOptionSelect(false);
      c.onMouseCaptureStart(p);
   }
}

//==========================================================
// <T>捕捉处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function FMouseConsole_capture(p){
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
function FMouseConsole_captureStop(p){
   var o = this;
   var c = o._activeCapture;
   if(c){
      c.onMouseCaptureStop(p);
      o._activeCapture = null;
   }
   RWindow.setOptionSelect(true);
}

//==========================================================
// <T>注册一个鼠标捕捉对象。</T>
//
// @method
// @param p:capture:MMouseCapture 鼠标捕捉
//==========================================================
function FMouseConsole_register(p){
   this._captures.push(p);
}

//==========================================================
// <T>注销一个鼠标捕捉对象。</T>
//
// @method
// @param p:capture:MMouseCapture 鼠标捕捉
//==========================================================
function FMouseConsole_unregister(p){
   this._captures.remove(p);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FMouseConsole_clear(){
   this._captures.clear();
}
