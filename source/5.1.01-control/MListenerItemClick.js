//==========================================================
// <T>项目点击监听器接口。</T>
//
// @face
// @author maocy
// @version 150224
//==========================================================
MO.MListenerItemClick = function MListenerItemClick(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addItemClickListener     = MListenerItemClick_addItemClickListener;
   o.processItemClickListener = MListenerItemClick_processItemClickListener;
   return o;
}

//==========================================================
// <T>注册一个点击监听器。</T>
//
// @method
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
MO.MListenerItemClick_addItemClickListener = function MListenerItemClick_addItemClickListener(w, m){
   return this.addListener(MO.EEvent.ItemClick, w, m);
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
MO.MListenerItemClick_processItemClickListener = function MListenerItemClick_processItemClickListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.ItemClick, p1, p2, p3, p4, p5);
}
