//==========================================================
// <T>进入帧监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
function MListenerEnterFrame(o){
   o = RClass.inherits(this, o, MListener);
   //..........................................................
   // @method
   o.addEnterFrameListener     = MListenerEnterFrame_addEnterFrameListener;
   o.removeEnterFrameListener  = MListenerEnterFrame_removeEnterFrameListener;
   // @method
   o.processEnterFrameListener = MListenerEnterFrame_processEnterFrameListener;
   return o;
}

//==========================================================
// <T>注册一个进入帧监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerEnterFrame_addEnterFrameListener(w, m){
   return this.addListener(EEvent.EnterFrame, w, m);
}

//==========================================================
// <T>注销一个进入帧监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerEnterFrame_removeEnterFrameListener(w, m){
   this.removeListener(EEvent.EnterFrame, w, m);
}

//==========================================================
// <T>进入帧监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function MListenerEnterFrame_processEnterFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.EnterFrame, p1, p2, p3, p4, p5);
}
