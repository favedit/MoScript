//==========================================================
// <T>选中监听器接口。</T>
//
// @console
// @author maocy
// @version 150201
//==========================================================
function MListenerSelected(o){
   o = RClass.inherits(this, o, MListener);
   //..........................................................
   // @method
   o.addSelectedListener     = MListenerSelected_addSelectedListener;
   o.processSelectedListener = MListenerSelected_processSelectedListener;
   return o;
}

//==========================================================
// <T>注册一个选中监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerSelected_addSelectedListener(w, m){
   return this.addListener(EEvent.Selected, w, m);
}

//==========================================================
// <T>选中监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Selected, p1, p2, p3, p4, p5);
}
