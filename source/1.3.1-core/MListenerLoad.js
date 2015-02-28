//==========================================================
// <T>加载监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
MO.MListenerLoad = function MListenerLoad(o){
   o = RClass.inherits(this, o, MO.MListener);
   //..........................................................
   // @method
   o.addLoadListener     = MListenerLoad_addLoadListener;
   o.processLoadListener = MListenerLoad_processLoadListener;
   return o;

   //==========================================================
   // <T>注册一个加载监听器。</T>
   //
   // @method
   // @param w:owner:String 拥有者
   // @param m:method:Function 函数
   //==========================================================
   function MListenerLoad_addLoadListener(w, m){
      return this.addListener(EEvent.Load, w, m);
   }

   //==========================================================
   // <T>加载监听处理。</T>
   //
   // @method
   // @param p1:parameter1:Object 参数1
   // @param p2:parameter2:Object 参数2
   // @param p3:parameter3:Object 参数3
   // @param p4:parameter4:Object 参数4
   // @param p5:parameter5:Object 参数5
   //==========================================================
   function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
   }
}
