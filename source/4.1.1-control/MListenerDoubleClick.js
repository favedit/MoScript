//==========================================================
// <T>双击监听器接口。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
function MListenerDoubleClick(o){
   o = RClass.inherits(this, o, MListener);
   //..........................................................
   // @method
   o.addClickListener     = MListenerDoubleClick_addClickListener;
   o.processClickListener = MListenerDoubleClick_processClickListener;
   return o;
}

//==========================================================
// <T>注册一个双击监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListenerDoubleClick_addClickListener(w, m){
   return this.addListener(EEvent.DoubleClick, w, m);
}

//==========================================================
// <T>双击监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function MListenerDoubleClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
}
