//==========================================================
// <T>失去热点监听器接口。</T>
//
// @console
// @author maocy
// @version 150201
//==========================================================
MO.MListenerLeave = function MListenerLeave(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addLeaveListener     = MO.MListenerLeave_addLeaveListener;
   o.processLeaveListener = MO.MListenerLeave_processLeaveListener;
   return o;
}

//==========================================================
// <T>注册一个失去热点监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
MO.MListenerLeave_addLeaveListener = function MListenerLeave_addLeaveListener(w, m){
   return this.addListener(MO.EEvent.Leave, w, m);
}

//==========================================================
// <T>失去热点监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerLeave_processLeaveListener = function MListenerLeave_processLeaveListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Leave, p1, p2, p3, p4, p5);
}
