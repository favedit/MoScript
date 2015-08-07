//==========================================================
// <T>结果监听器接口。</T>
//
// @console
// @author maocy
// @version 150409
//==========================================================
MO.MListenerResult = function MListenerResult(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addResultListener     = MO.MListenerResult_addResultListener;
   o.removeResultListener  = MO.MListenerResult_removeResultListener;
   o.processResultListener = MO.MListenerResult_processResultListener;
   o.clearResultListeners  = MO.MListenerResult_clearResultListeners;
   return o;
}

//==========================================================
// <T>增加一个结果监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
MO.MListenerResult_addResultListener = function MListenerResult_addResultListener(owner, method){
   return this.addListener(MO.EEvent.Result, owner, method);
}

//==========================================================
// <T>移除一个结果监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
MO.MListenerResult_removeResultListener = function MListenerResult_removeResultListener(owner, method){
   return this.removeListener(MO.EEvent.Result, owner, method);
}

//==========================================================
// <T>结果监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerResult_processResultListener = function MListenerResult_processResultListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Result, p1, p2, p3, p4, p5);
}

//==========================================================
// <T>清空结果监听器。</T>
//
// @method
//==========================================================
MO.MListenerResult_clearResultListeners = function MListenerResult_clearResultListeners(){
   return this.clearListeners(MO.EEvent.Result);
}
