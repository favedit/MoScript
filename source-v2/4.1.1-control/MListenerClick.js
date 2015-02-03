//==========================================================
// <T>点击监听器接口。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
function MListenerClick(o){
   o = RClass.inherits(this, o, MListener);
   //..........................................................
   // @method
   o.addClickListener     = MListenerClick_addClickListener;
   o.processClickListener = MListenerClick_processClickListener;
   return o;
}

//==========================================================
// <T>注册一个点击监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerClick_addClickListener(w, m){
   return this.addListener(EEvent.Click, w, m);
}

//==========================================================
// <T>点击监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
}
