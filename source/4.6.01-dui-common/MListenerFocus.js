//==========================================================
// <T>获得焦点监听器接口。</T>
//
// @console
// @author maocy
// @version 150201
//==========================================================
MO.MListenerFocus = function MListenerFocus(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addFocusListener     = MO.MListenerFocus_addFocusListener;
   o.processFocusListener = MO.MListenerFocus_processFocusListener;
   return o;
}

//==========================================================
// <T>注册一个获得焦点监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
MO.MListenerFocus_addFocusListener = function MListenerFocus_addFocusListener(w, m){
   return this.addListener(MO.EEvent.Focus, w, m);
}

//==========================================================
// <T>获得焦点监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerFocus_processFocusListener = function MListenerFocus_processFocusListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Focus, p1, p2, p3, p4, p5);
}
