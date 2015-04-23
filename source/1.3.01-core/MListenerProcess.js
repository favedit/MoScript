//==========================================================
// <T>处理监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
function MListenerProcess(o){
   o = RClass.inherits(this, o, MListener);
   //..........................................................
   // @method
   o.addProcessListener     = MListenerProcess_addProcessListener;
   o.removeProcessListener  = MListenerProcess_removeProcessListener;
   // @method
   o.processProcessListener = MListenerProcess_processProcessListener;
   return o;
}

//==========================================================
// <T>注册一个处理监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerProcess_addProcessListener(w, m){
   return this.addListener(EEvent.Process, w, m);
}

//==========================================================
// <T>注销一个处理监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerProcess_removeProcessListener(w, m){
   this.removeListener(EEvent.Process, w, m);
}

//==========================================================
// <T>处理监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Process, p1, p2, p3, p4, p5);
}
