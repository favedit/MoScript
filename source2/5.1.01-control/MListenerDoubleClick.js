with(MO){
   //==========================================================
   // <T>双击监听器接口。</T>
   //
   // @console
   // @author maocy
   // @version 150203
   //==========================================================
   MO.MListenerDoubleClick = function MListenerDoubleClick(o){
      o = RClass.inherits(this, o, MListener);
      //..........................................................
      // @method
      o.addDoubleClickListener     = MListenerDoubleClick_addDoubleClickListener;
      o.setDoubleClickListener     = MListenerDoubleClick_setDoubleClickListener;
      o.processDoubleClickListener = MListenerDoubleClick_processDoubleClickListener;
      return o;
   }

   //==========================================================
   // <T>注册一个双击监听器。</T>
   //
   // @method
   // @param owner:String 拥有者
   // @param method:Function 函数
   //==========================================================
   MO.MListenerDoubleClick_addDoubleClickListener = function MListenerDoubleClick_addDoubleClickListener(owner, method){
      return this.addListener(EEvent.DoubleClick, owner, method);
   }

   //==========================================================
   // <T>设置一个双击监听器。</T>
   //
   // @method
   // @param owner:String 拥有者
   // @param method:Function 函数
   //==========================================================
   MO.MListenerDoubleClick_setDoubleClickListener = function MListenerDoubleClick_setDoubleClickListener(owner, method){
      return this.setListener(EEvent.DoubleClick, owner, method);
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
   MO.MListenerDoubleClick_processDoubleClickListener = function MListenerDoubleClick_processDoubleClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
   }
}
