//==========================================================
// <T>单击监听器接口。</T>
//
// @console
// @author maocy
// @version 150203
//==========================================================
MO.MListenerClick = function MListenerClick(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addClickListener     = MO.MListenerClick_addClickListener;
   o.setClickListener     = MO.MListenerClick_setClickListener;
   o.removeClickListener  = MO.MListenerClick_removeClickListener;
   o.processClickListener = MO.MListenerClick_processClickListener;
   return o;
}

//==========================================================
// <T>增加一个单击监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
MO.MListenerClick_addClickListener = function MListenerClick_addClickListener(owner, method){
   return this.addListener(MO.EEvent.Click, owner, method);
}

//==========================================================
// <T>设置一个单击监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
MO.MListenerClick_setClickListener = function MListenerClick_setClickListener(owner, method){
   return this.setListener(MO.EEvent.Click, owner, method);
}

//==========================================================
// <T>移除一个单击监听器。</T>
//
// @method
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
MO.MListenerClick_removeClickListener = function MListenerClick_removeClickListener(owner, method){
   return this.removeListener(MO.EEvent.Click, owner, method);
}

//==========================================================
// <T>单击监听处理。</T>
//
// @method
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.MListenerClick_processClickListener = function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Click, p1, p2, p3, p4, p5);
}
