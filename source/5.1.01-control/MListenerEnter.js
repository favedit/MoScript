//==========================================================
// <T>获得热点监听器接口。</T>
//
// @console
// @author maocy
// @version 150201
//==========================================================
MO.MListenerEnter = function MListenerEnter(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addEnterListener     = MO.MListenerEnter_addEnterListener;
   o.processEnterListener = MO.MListenerEnter_processEnterListener;
   return o;
}

//==========================================================
// <T>注册一个获得热点监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
MO.MListenerEnter_addEnterListener = function MListenerEnter_addEnterListener(w, m){
   return this.addListener(MO.EEvent.Enter, w, m);
}

//==========================================================
// <T>获得热点监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerEnter_processEnterListener = function MListenerEnter_processEnterListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Enter, p1, p2, p3, p4, p5);
}
