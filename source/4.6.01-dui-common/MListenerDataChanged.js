//==========================================================
// <T>数据改变监听器接口。</T>
//
// @console
// @author maocy
// @version 150201
//==========================================================
MO.MListenerDataChanged = function MListenerDataChanged(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addDataChangedListener     = MO.MListenerDataChanged_addDataChangedListener;
   o.processDataChangedListener = MO.MListenerDataChanged_processDataChangedListener;
   return o;
}

//==========================================================
// <T>注册一个数据改变监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
MO.MListenerDataChanged_addDataChangedListener = function MListenerDataChanged_addDataChangedListener(w, m){
   return this.addListener(MO.EEvent.DataChanged, w, m);
}

//==========================================================
// <T>数据改变监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerDataChanged_processDataChangedListener = function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.DataChanged, p1, p2, p3, p4, p5);
}
