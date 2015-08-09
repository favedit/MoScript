//==========================================================
// <T>处理监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
MO.MListenerProcess = function MListenerProcess(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addProcessListener     = MO.MListenerProcess_addProcessListener;
   o.removeProcessListener  = MO.MListenerProcess_removeProcessListener;
   o.clearProcessListeners  = MO.MListenerProcess_clearProcessListeners;
   // @method
   o.processProcessListener = MO.MListenerProcess_processProcessListener;
   return o;
}

//==========================================================
// <T>注册一个处理监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param process:Function 处理函数
//==========================================================
MO.MListenerProcess_addProcessListener = function MListenerProcess_addProcessListener(owner, process){
   return this.addListener(MO.EEvent.Process, owner, process);
}

//==========================================================
// <T>注销一个处理监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param process:Function 处理函数
//==========================================================
MO.MListenerProcess_removeProcessListener = function MListenerProcess_removeProcessListener(owner, process){
   this.removeListener(MO.EEvent.Process, owner, process);
}

//==========================================================
// <T>清空处理监听器。</T>
//
// @method
//==========================================================
MO.MListenerProcess_clearProcessListeners = function MListenerProcess_clearProcessListeners(){
   this.clearListeners(MO.EEvent.Process);
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
MO.MListenerProcess_processProcessListener = function MListenerProcess_processProcessListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Process, p1, p2, p3, p4, p5);
}
