with(MO){
   //==========================================================
   // <T>触摸缩放监听器接口。</T>
   //
   // @console
   // @author maocy
   // @version 150508
   //==========================================================
   MO.MListenerTouchZoom = function MListenerTouchZoom(o){
      o = RClass.inherits(this, o, MListener);
      //..........................................................
      // @method
      o.addTouchZoomListener     = MListenerTouchZoom_addTouchZoomListener;
      o.removeTouchZoomListener  = MListenerTouchZoom_removeTouchZoomListener;
      o.clearTouchZoomListeners  = MListenerTouchZoom_clearTouchZoomListeners;
      // @method
      o.processTouchZoomListener = MListenerTouchZoom_processTouchZoomListener;
      return o;
   }

   //==========================================================
   // <T>注册一个加载监听器。</T>
   //
   // @method
   // @param w:owner:String 拥有者
   // @param m:method:Function 函数
   //==========================================================
   MO.MListenerTouchZoom_addTouchZoomListener = function MListenerTouchZoom_addTouchZoomListener(w, m){
      return this.addListener(EEvent.TouchZoom, w, m);
   }

   //==========================================================
   // <T>注销一个加载监听器。</T>
   //
   // @method
   // @param w:owner:String 拥有者
   // @param m:method:Function 函数
   //==========================================================
   MO.MListenerTouchZoom_removeTouchZoomListener = function MListenerTouchZoom_removeTouchZoomListener(w, m){
      this.removeListener(EEvent.TouchZoom, w, m);
   }

   //==========================================================
   // <T>清空加载监听器。</T>
   //
   // @method
   //==========================================================
   MO.MListenerTouchZoom_clearTouchZoomListeners = function MListenerTouchZoom_clearTouchZoomListeners(){
      this.clearListeners(EEvent.TouchZoom);
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
   MO.MListenerTouchZoom_processTouchZoomListener = function MListenerTouchZoom_processTouchZoomListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.TouchZoom, p1, p2, p3, p4, p5);
   }
}
