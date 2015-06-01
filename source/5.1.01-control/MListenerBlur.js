with(MO){
   //==========================================================
   // <T>失去焦点监听器接口。</T>
   //
   // @console
   // @author maocy
   // @version 150201
   //==========================================================
   MO.MListenerBlur = function MListenerBlur(o){
      o = RClass.inherits(this, o, MListener);
      //..........................................................
      // @method
      o.addBlurListener     = MListenerBlur_addBlurListener;
      o.processBlurListener = MListenerBlur_processBlurListener;
      return o;
   }

   //==========================================================
   // <T>注册一个失去焦点监听器。</T>
   //
   // @method
   // @param w:owner:String 拥有者
   // @param m:method:Function 函数
   //==========================================================
   MO.MListenerBlur_addBlurListener = function MListenerBlur_addBlurListener(w, m){
      return this.addListener(EEvent.Blur, w, m);
   }

   //==========================================================
   // <T>失去焦点监听处理。</T>
   //
   // @method
   // @param p1:parameter1:Object 参数1
   // @param p2:parameter2:Object 参数2
   // @param p3:parameter3:Object 参数3
   // @param p4:parameter4:Object 参数4
   // @param p5:parameter5:Object 参数5
   //==========================================================
   MO.MListenerBlur_processBlurListener = function MListenerBlur_processBlurListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Blur, p1, p2, p3, p4, p5);
   }
}
